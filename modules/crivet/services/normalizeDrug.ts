/**
 * Normalizador de Dados de Fármacos
 * Aceita formatos "antigo" e "novo" e converte para NormalizedDrug
 */

import type { NormalizedDrug, NormalizedHelpDrawer, NormalizedCompatibility, NormalizedDoses, NormalizedIndications } from '../models/normalizedDrug'
import type { DrugProfile } from '../types/drugProfile'

/**
 * Função auxiliar para coletar conteúdo de uma seção de forma segura
 */
function collectSectionContent(...sources: (string | string[] | undefined | null)[]): string[] {
  const result: string[] = []
  for (const source of sources) {
    if (typeof source === 'string' && source.trim()) {
      result.push(source.trim())
    } else if (Array.isArray(source) && source.length > 0) {
      result.push(...source.filter((s) => typeof s === 'string' && s.trim()))
    }
  }
  return result
}

/**
 * Normaliza taglines para summary
 */
function normalizeTaglines(raw: any): string[] {
  // Tentar várias fontes possíveis
  if (Array.isArray(raw.core_concepts?.taglines)) {
    return raw.core_concepts.taglines.filter((t: any) => typeof t === 'string' && t.trim())
  }
  if (Array.isArray(raw.taglines)) {
    return raw.taglines.filter((t: any) => typeof t === 'string' && t.trim())
  }
  if (typeof raw.ui_copy?.critical_warning_banner === 'string') {
    return [raw.ui_copy.critical_warning_banner]
  }
  if (typeof raw.core_concepts?.mechanism_big_picture_ptbr === 'string') {
    return [raw.core_concepts.mechanism_big_picture_ptbr]
  }
  return []
}

/**
 * Normaliza help drawer com seções
 */
function normalizeHelpDrawer(raw: any): NormalizedHelpDrawer {
  const sections: Array<{ title: string; content: string[] }> = []

  // Seção "Resumo"
  const summaryContent = collectSectionContent(
    raw.ui_copy?.critical_warning_banner,
    ...(Array.isArray(raw.core_concepts?.taglines) ? raw.core_concepts.taglines : []),
    raw.core_concepts?.mechanism_big_picture_ptbr,
  )
  if (summaryContent.length > 0) {
    sections.push({
      title: 'Resumo',
      content: summaryContent,
    })
  }

  // Seção "Mecanismo de Ação"
  const mechanismContent: string[] = []
  if (raw.core_concepts?.mechanism) {
    const mech = raw.core_concepts.mechanism
    if (mech.receptors_targets && Array.isArray(mech.receptors_targets)) {
      mechanismContent.push(`Receptores/Alvos: ${mech.receptors_targets.join(', ')}`)
    }
    if (mech.clinical_metaphor) {
      mechanismContent.push(mech.clinical_metaphor)
    }
    if (mech.primary_effects) {
      const effects = mech.primary_effects
      if (effects.cardiovascular) mechanismContent.push(`Cardiovascular: ${effects.cardiovascular}`)
      if (effects.respiratory) mechanismContent.push(`Respiratório: ${effects.respiratory}`)
      if (effects.cns) mechanismContent.push(`Sistema Nervoso Central: ${effects.cns}`)
      if (effects.renal_hepatic) mechanismContent.push(`Renal/Hepático: ${effects.renal_hepatic}`)
      if (effects.gi) mechanismContent.push(`Gastrointestinal: ${effects.gi}`)
    }
  } else if (raw.core_concepts?.mechanism_big_picture_ptbr) {
    const mechBig = raw.core_concepts.mechanism_big_picture_ptbr
    if (typeof mechBig === 'string') {
      mechanismContent.push(mechBig)
    } else if (Array.isArray(mechBig)) {
      mechanismContent.push(...mechBig.filter((s) => typeof s === 'string'))
    }
  }
  if (mechanismContent.length > 0) {
    sections.push({
      title: 'Mecanismo de Ação',
      content: mechanismContent,
    })
  }

  // Seção "Farmacodinâmica"
  const pharmacodynamicsContent: string[] = []
  if (raw.core_concepts?.pharmacodynamics) {
    const pd = raw.core_concepts.pharmacodynamics
    if (pd.onset_iv) pharmacodynamicsContent.push(`Início IV: ${pd.onset_iv}`)
    if (pd.onset_im) pharmacodynamicsContent.push(`Início IM: ${pd.onset_im}`)
    if (pd.peak) pharmacodynamicsContent.push(`Pico: ${pd.peak}`)
    if (pd.duration) pharmacodynamicsContent.push(`Duração: ${pd.duration}`)
    if (pd.dependencies && Array.isArray(pd.dependencies)) {
      pharmacodynamicsContent.push(`Dependências: ${pd.dependencies.join(', ')}`)
    }
  } else if (raw.pharmacodynamics) {
    // Fallback para formato legado
    const pd = raw.pharmacodynamics
    if (typeof pd === 'string') pharmacodynamicsContent.push(pd)
    else if (typeof pd === 'object') {
      Object.entries(pd).forEach(([key, value]) => {
        if (value) pharmacodynamicsContent.push(`${key}: ${value}`)
      })
    }
  }
  if (pharmacodynamicsContent.length > 0) {
    sections.push({
      title: 'Farmacodinâmica',
      content: pharmacodynamicsContent,
    })
  }

  // Seção "Farmacocinética"
  const pharmacokineticsContent: string[] = []
  if (raw.core_concepts?.pharmacokinetics) {
    const pk = raw.core_concepts.pharmacokinetics
    if (pk.metabolism) pharmacokineticsContent.push(`Metabolismo: ${pk.metabolism}`)
    if (pk.excretion) pharmacokineticsContent.push(`Excreção: ${pk.excretion}`)
    if (pk.dog_vs_cat) pharmacokineticsContent.push(`Diferenças cão/gato: ${pk.dog_vs_cat}`)
    if (pk.active_metabolites) pharmacokineticsContent.push(`Metabólitos ativos: ${pk.active_metabolites}`)
    if (pk.accumulation) pharmacokineticsContent.push(`Acúmulo: ${pk.accumulation}`)
  } else if (raw.pharmacokinetics) {
    // Fallback para formato legado
    const pk = raw.pharmacokinetics
    if (typeof pk === 'string') pharmacokineticsContent.push(pk)
    else if (typeof pk === 'object') {
      Object.entries(pk).forEach(([key, value]) => {
        if (value) pharmacokineticsContent.push(`${key}: ${value}`)
      })
    }
  }
  if (pharmacokineticsContent.length > 0) {
    sections.push({
      title: 'Farmacocinética',
      content: pharmacokineticsContent,
    })
  }

  // Seção "Indicações"
  const indicationsContent: string[] = []
  if (Array.isArray(raw.indications)) {
    // Formato legado: array direto
    indicationsContent.push(...raw.indications.filter((s) => typeof s === 'string'))
  } else if (raw.indications) {
    if (Array.isArray(raw.indications.primary)) {
      indicationsContent.push(...raw.indications.primary.filter((s: any) => typeof s === 'string'))
    }
    if (Array.isArray(raw.indications.secondary)) {
      indicationsContent.push(...raw.indications.secondary.filter((s: any) => typeof s === 'string'))
    }
    if (raw.indications.when_to_use) {
      const when = raw.indications.when_to_use
      if (typeof when === 'string') indicationsContent.push(when)
      else if (Array.isArray(when)) indicationsContent.push(...when.filter((s: any) => typeof s === 'string'))
    }
  }
  if (indicationsContent.length > 0) {
    sections.push({
      title: 'Indicações',
      content: indicationsContent,
    })
  }

  // Seção "Doses"
  const dosesContent: string[] = []
  if (raw.doses) {
    if (raw.doses.dog) {
      const dogDoses: string[] = []
      if (raw.doses.dog.cri) {
        const cri = raw.doses.dog.cri
        if (cri.mcgkgmin) dogDoses.push(`CRI: ${cri.mcgkgmin.min}-${cri.mcgkgmin.max} mcg/kg/min${cri.mcgkgmin.note ? ` (${cri.mcgkgmin.note})` : ''}`)
        if (cri.mgkgh) dogDoses.push(`CRI: ${cri.mgkgh.min}-${cri.mgkgh.max} mg/kg/h${cri.mgkgh.note ? ` (${cri.mgkgh.note})` : ''}`)
      }
      if (raw.doses.dog.bolus) {
        const bolus = raw.doses.dog.bolus
        if (bolus.mgkg) dogDoses.push(`Bolus: ${bolus.mgkg.min}-${bolus.mgkg.max} mg/kg${bolus.mgkg.note ? ` (${bolus.mgkg.note})` : ''}`)
        if (bolus.mcgkg) dogDoses.push(`Bolus: ${bolus.mcgkg.min}-${bolus.mcgkg.max} mcg/kg${bolus.mcgkg.note ? ` (${bolus.mcgkg.note})` : ''}`)
      }
      if (dogDoses.length > 0) dosesContent.push(`Cão: ${dogDoses.join('; ')}`)
    }
    if (raw.doses.cat) {
      const catDoses: string[] = []
      if (raw.doses.cat.cri) {
        const cri = raw.doses.cat.cri
        if (cri.mcgkgmin) catDoses.push(`CRI: ${cri.mcgkgmin.min}-${cri.mcgkgmin.max} mcg/kg/min${cri.mcgkgmin.note ? ` (${cri.mcgkgmin.note})` : ''}`)
        if (cri.mgkgh) catDoses.push(`CRI: ${cri.mgkgh.min}-${cri.mgkgh.max} mg/kg/h${cri.mgkgh.note ? ` (${cri.mgkgh.note})` : ''}`)
      }
      if (raw.doses.cat.bolus) {
        const bolus = raw.doses.cat.bolus
        if (bolus.mgkg) catDoses.push(`Bolus: ${bolus.mgkg.min}-${bolus.mgkg.max} mg/kg${bolus.mgkg.note ? ` (${bolus.mgkg.note})` : ''}`)
        if (bolus.mcgkg) catDoses.push(`Bolus: ${bolus.mcgkg.min}-${bolus.mcgkg.max} mcg/kg${bolus.mcgkg.note ? ` (${bolus.mcgkg.note})` : ''}`)
      }
      if (catDoses.length > 0) dosesContent.push(`Gato: ${catDoses.join('; ')}`)
    }
  }
  if (dosesContent.length > 0) {
    sections.push({
      title: 'Doses',
      content: dosesContent,
    })
  }

  return { sections }
}

/**
 * Normaliza compatibilidade com diluentes
 */
function normalizeCompatibility(raw: any): NormalizedCompatibility {
  const diluentsAllowed: string[] = []
  const incompatible: Array<{ agent: string; why: string; risk?: string }> = []

  // Coletar diluentes permitidos de várias fontes possíveis
  if (Array.isArray(raw.compatibility?.diluents_allowed)) {
    diluentsAllowed.push(...raw.compatibility.diluents_allowed)
  }
  if (Array.isArray(raw.compatibility?.diluents_ok)) {
    diluentsAllowed.push(...raw.compatibility.diluents_ok)
  }
  if (Array.isArray(raw.compatibility?.diluentsAllowed)) {
    diluentsAllowed.push(...raw.compatibility.diluentsAllowed)
  }
  if (Array.isArray(raw.dilution_and_preparation?.diluents_allowed)) {
    diluentsAllowed.push(...raw.dilution_and_preparation.diluents_allowed)
  }
  if (Array.isArray(raw.compatibility?.diluents)) {
    diluentsAllowed.push(...raw.compatibility.diluents)
  }
  // Remover duplicatas
  const uniqueDiluents = Array.from(new Set(diluentsAllowed.map((d) => d.trim()))).filter((d) => d.length > 0)

  // Coletar incompatibilidades
  if (Array.isArray(raw.compatibility?.incompatible)) {
    raw.compatibility.incompatible.forEach((inc: any) => {
      if (typeof inc === 'string') {
        incompatible.push({ agent: inc, why: 'Incompatibilidade conhecida' })
      } else if (inc && typeof inc === 'object') {
        incompatible.push({
          agent: inc.agent || inc.drug || inc.name || 'Desconhecido',
          why: inc.why || inc.message || 'Incompatibilidade conhecida',
          risk: inc.risk || inc.severity || undefined,
        })
      }
    })
  }
  if (Array.isArray(raw.compatibility?.avoid_same_syringe_or_precipitation_risk)) {
    raw.compatibility.avoid_same_syringe_or_precipitation_risk.forEach((inc: any) => {
      if (typeof inc === 'string') {
        incompatible.push({ agent: inc, why: 'Risco de precipitação', risk: 'precipitação' })
      }
    })
  }
  if (Array.isArray(raw.alert_engine?.hard_stops)) {
    raw.alert_engine.hard_stops.forEach((alert: any) => {
      if (typeof alert === 'string' && (alert.toLowerCase().includes('diluente') || alert.toLowerCase().includes('linha'))) {
        incompatible.push({ agent: 'Diluente/linha', why: alert, risk: 'critical' })
      }
    })
  }
  if (Array.isArray(raw.compatibility?.physicalIncompatibilities)) {
    raw.compatibility.physicalIncompatibilities.forEach((inc: any) => {
      incompatible.push({
        agent: inc.drug || inc.agent || 'Desconhecido',
        why: inc.why || inc.message || 'Incompatibilidade física',
        risk: inc.severity || inc.risk || 'critical',
      })
    })
  }

  return {
    diluentsAllowed: uniqueDiluents,
    incompatible,
  }
}

/**
 * Normaliza doses
 */
function normalizeDoses(raw: any): NormalizedDoses {
  const dog: NormalizedDoses['dog'] = {}
  const cat: NormalizedDoses['cat'] = {}

  if (raw.doses?.dog) {
    if (raw.doses.dog.cri) {
      dog.cri = {
        mcgkgmin: raw.doses.dog.cri.mcgkgmin,
        mgkgh: raw.doses.dog.cri.mgkgh,
      }
    }
    if (raw.doses.dog.bolus) {
      dog.bolus = {
        mgkg: raw.doses.dog.bolus.mgkg,
        mcgkg: raw.doses.dog.bolus.mcgkg,
        ukg: raw.doses.dog.bolus.ukg,
      }
    }
  }

  if (raw.doses?.cat) {
    if (raw.doses.cat.cri) {
      cat.cri = {
        mcgkgmin: raw.doses.cat.cri.mcgkgmin,
        mgkgh: raw.doses.cat.cri.mgkgh,
      }
    }
    if (raw.doses.cat.bolus) {
      cat.bolus = {
        mgkg: raw.doses.cat.bolus.mgkg,
        mcgkg: raw.doses.cat.bolus.mcgkg,
        ukg: raw.doses.cat.bolus.ukg,
      }
    }
  }

  return { dog, cat }
}

/**
 * Normaliza indicações
 */
function normalizeIndications(raw: any): NormalizedIndications {
  const primary: string[] = []
  const secondary: string[] = []

  if (Array.isArray(raw.indications)) {
    // Formato legado: array direto - tudo vira primary
    primary.push(...raw.indications.filter((s) => typeof s === 'string' && s.trim()))
  } else if (raw.indications) {
    if (Array.isArray(raw.indications.primary)) {
      primary.push(...raw.indications.primary.filter((s: any) => typeof s === 'string' && s.trim()))
    }
    if (Array.isArray(raw.indications.secondary)) {
      secondary.push(...raw.indications.secondary.filter((s: any) => typeof s === 'string' && s.trim()))
    }
    if (raw.indications.when_to_use) {
      const when = raw.indications.when_to_use
      if (typeof when === 'string') {
        primary.push(when.trim())
      } else if (Array.isArray(when)) {
        primary.push(...when.filter((s: any) => typeof s === 'string' && s.trim()))
      }
    }
  }

  return {
    primary,
    secondary,
    all: [...primary, ...secondary],
  }
}

/**
 * Normaliza um fármaco de qualquer formato para NormalizedDrug
 */
export function normalizeDrug(raw: any): NormalizedDrug {
  // Extrair ID
  const id = raw.drug_id || raw.id || raw.drugId || 'unknown'

  // Extrair nomes
  const namePt = raw.name_pt || raw.namePt || raw.name || 'Fármaco sem nome'
  const nameEn = raw.name_en || raw.nameEn || raw.nameEn || ''

  // Normalizar todas as seções
  const taglines = normalizeTaglines(raw)
  const helpDrawer = normalizeHelpDrawer(raw)
  const compatibility = normalizeCompatibility(raw)
  const doses = normalizeDoses(raw)
  const indications = normalizeIndications(raw)

  return {
    id,
    namePt,
    nameEn,
    summary: {
      taglines: taglines.length > 0 ? taglines : ['Informações básicas disponíveis.'],
    },
    helpDrawer,
    compatibility,
    doses,
    indications,
  }
}
