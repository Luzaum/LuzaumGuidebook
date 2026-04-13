import type { AntibioticRegimen } from '../model/types'
import type { PatientContextV2 } from '../model/types'
import type { ClinicalAlert } from '../model/types'
import { ANTIBIOTIC_MOLECULES } from '../data-v2/molecules'

const FQ = new Set(['mol_enrofloxacin', 'mol_marbo'])
const AMINO = new Set(['mol_gentamicin'])
const TETRA = new Set(['mol_doxycycline'])

function regimenHasMolecule(reg: AntibioticRegimen, pred: (mid: string) => boolean): boolean {
  return reg.moleculeIds.some(pred)
}

export function collectPatientAlerts(
  ctx: PatientContextV2,
  firstLine: AntibioticRegimen[],
  alternatives: AntibioticRegimen[],
): ClinicalAlert[] {
  const alerts: ClinicalAlert[] = []
  const all = [...firstLine, ...alternatives]

  if (ctx.ageBand === 'juvenile') {
    alerts.push({
      id: 'age_juvenile',
      severity: 'caution',
      title: 'Paciente jovem',
      detail: 'Ajustes de dose e formulário; revisar segurança por faixa etária.',
      because: 'Regra etária: filhotes exigem cautela com várias classes.',
    })
  }

  if (ctx.ageBand === 'neonate') {
    alerts.push({
      id: 'age_neonate',
      severity: 'warning',
      title: 'Neonato',
      detail: 'Evitar extrapolação de doses adultas; preferir protocolo neonatal.',
      because: 'Regra etária: neonatos têm farmacocinética distinta.',
    })
  }

  if (ctx.ageBand === 'senior') {
    alerts.push({
      id: 'age_senior',
      severity: 'caution',
      title: 'Idoso',
      detail: 'Monitorização reforçada (função orgânica, interações, desidratação).',
      because: 'Regra etária: maior risco de efeitos adversos e comorbidades ocultas.',
    })
  }

  if (ctx.isGestante) {
    alerts.push({
      id: 'preg',
      severity: 'warning',
      title: 'Gestação',
      detail: 'Priorizar opções com maior histórico de uso em gestação apenas quando apropriado; evitar tetraciclinas e revisar aminoglicosídeos/ FQ conforme risco-benefício.',
      because: 'Regra explícita: gestação altera a hierarquia de risco de classes.',
    })
  }

  if (ctx.isLactante) {
    alerts.push({
      id: 'lact',
      severity: 'caution',
      title: 'Lactação',
      detail: 'Verificar excreção no leite e segurança dos filhotes.',
      because: 'Regra explícita: lactação exige cautela de exposição neonatal.',
    })
  }

  if (ctx.comorbidities.renal) {
    alerts.push({
      id: 'renal',
      severity: 'warning',
      title: 'Função renal reduzida',
      detail: 'Revisar aminoglicosídeos, dose e intervalo; monitorizar.',
      because: 'Comorbidade renal: maior risco de toxicidade com drogas renotóxicas.',
    })
    if (all.some((r) => regimenHasMolecule(r, (id) => AMINO.has(id)))) {
      alerts.push({
        id: 'renal_aminoglycoside',
        severity: 'warning',
        title: 'Aminoglicosídeo com comorbidade renal',
        detail: 'Ajuste obrigatório ou evitar conforme gravidade da insuficiência.',
        because: 'Regime selecionado inclui aminoglicosídeo + comorbidade renal.',
      })
    }
  }

  if (ctx.comorbidities.hepatic) {
    alerts.push({
      id: 'hepatic',
      severity: 'caution',
      title: 'Função hepática reduzida',
      detail: 'Revisar drogas metabolizadas pelo fígado e acúmulo.',
      because: 'Comorbidade hepática: altera clearance e toxicidade.',
    })
  }

  if (ctx.comorbidities.neurological) {
    alerts.push({
      id: 'neuro',
      severity: 'caution',
      title: 'Comorbidade neurológica',
      detail: 'Cautela com neuroexcitação (ex.: quinolonas), especialmente em gatos.',
      because: 'Comorbidade neurológica: reforço de alertas de neurotoxicidade.',
    })
    if (ctx.species === 'cat' && all.some((r) => regimenHasMolecule(r, (id) => FQ.has(id)))) {
      alerts.push({
        id: 'neuro_fq_cat',
        severity: 'warning',
        title: 'Fluoroquinolona em gato com comorbidade neurológica',
        detail: 'Avaliar risco-benefício; considerar alternativas conforme protocolo.',
        because: 'Gato + FQ: maior atenção a efeitos neuro excitantes em contexto de base neurológica.',
      })
    }
  }

  if (ctx.comorbidities.septic && ctx.severity === 'ambulatory_stable') {
    alerts.push({
      id: 'septic_mismatch',
      severity: 'warning',
      title: 'Sepse marcada com cenário “ambulatorial estável”',
      detail: 'Reconciliar: sepse costuma exigir internação e suporte.',
      because: 'Inconsistência entre comorbidade séptica e gravidade assistencial escolhida.',
    })
  }

  return alerts
}

export function stewardshipAlertsFromProfile(notes: string[]): ClinicalAlert[] {
  return notes.map((detail, i) => ({
    id: `stew_${i}`,
    severity: 'info' as const,
    title: 'Stewardship',
    detail,
    because: 'Nota do perfil clínico v2 (educacional).',
  }))
}

/** Reordena regimes por gestação sem parse de dose: apenas IDs de molécula. */
export function applyGestationAdjustments(
  ctx: PatientContextV2,
  firstLineIds: string[],
  altIds: string[],
  getReg: (id: string) => AntibioticRegimen | undefined,
): { firstLineIds: string[]; altIds: string[]; modifiers: Map<string, string[]> } {
  const modifiers = new Map<string, string[]>()
  if (!ctx.isGestante) return { firstLineIds, altIds, modifiers }

  const demoteIf = (ids: string[], pred: (reg: AntibioticRegimen) => boolean) => {
    const stay: string[] = []
    const move: string[] = []
    for (const id of ids) {
      const r = getReg(id)
      if (!r) {
        stay.push(id)
        continue
      }
      if (pred(r)) {
        move.push(id)
        const m = modifiers.get(id) ?? []
        m.push('Gestação: evitar como primeira linha (quino/tetraciclinas/ajuste aminoglicosídeo conforme caso).')
        modifiers.set(id, m)
      } else stay.push(id)
    }
    return { stay, move }
  }

  const fqOrTetra = (r: AntibioticRegimen) =>
    r.moleculeIds.some((id) => FQ.has(id) || TETRA.has(id))

  let fl = [...firstLineIds]
  let al = [...altIds]

  const d1 = demoteIf(fl, fqOrTetra)
  fl = d1.stay
  al = [...new Set([...al, ...d1.move])]

  const d2 = demoteIf(fl, (r) => r.moleculeIds.some((id) => AMINO.has(id)))
  fl = d2.stay
  al = [...new Set([...al, ...d2.move])]

  for (const id of [...fl, ...al]) {
    const r = getReg(id)
    if (!r) continue
    if (ctx.isGestante && r.moleculeIds.some((mid) => TETRA.has(mid))) {
      const m = modifiers.get(id) ?? []
      m.push('Tetraciclinas: contraindicadas/altamente desaconselhadas na gestação.')
      modifiers.set(id, m)
    }
    if (ctx.isGestante && r.moleculeIds.some((mid) => AMINO.has(mid))) {
      const m = modifiers.get(id) ?? []
      m.push('Aminoglicosídeo: risco fetal/placentário — usar só com critério e monitorização.')
      modifiers.set(id, m)
    }
  }

  return { firstLineIds: fl, altIds: al, modifiers }
}

export function avoidEntriesForContext(ctx: PatientContextV2): { moleculeId: string; reason: string }[] {
  const out: { moleculeId: string; reason: string }[] = []
  if (ctx.isGestante) {
    out.push({
      moleculeId: 'mol_doxycycline',
      reason: 'Gestação: tetraciclinas classicamente contraindicadas.',
    })
  }
  return out
}
