import type { CaseReport } from '../../types/analysis'
import type { ComorbidityItem, ComorbidityKey } from '../../stores/caseStore'

export type ComorbidityEffect = {
  key: ComorbidityKey
  alerts: string[]
  cautions: string[]
  diagnosticAdds: string[]
  diagnosticAvoids: string[]
  ddxBoost: Record<string, number>
}

type ComorbidityRuleFunction = (severity?: 'leve' | 'moderada' | 'grave') => ComorbidityEffect

const COMORBIDITY_RULES: Record<ComorbidityKey, ComorbidityRuleFunction> = {
  renal: (severity) => ({
    key: 'renal',
    alerts: ['Risco de encefalopatia metabólica associada à uremia.'],
    cautions: [
      'Evitar nefrotóxicos e ajustar doses renais.',
      ...(severity === 'grave' ? ['Evitar contraste iodado sempre que possível.'] : []),
    ],
    diagnosticAdds: ['Ureia, creatinina, SDMA, eletrólitos e urinálise.'],
    diagnosticAvoids: ['Evitar procedimentos com risco de piora renal sem estabilização prévia.'],
    ddxBoost: { encefalopatia_metabolica: 0.2, disturbio_eletrolitico: 0.2 },
  }),
  hepática: (severity) => ({
    key: 'hepática',
    alerts: ['Alteração de mentação pode ser agravada por encefalopatia hepática.'],
    cautions: [
      'Ajustar fármacos de metabolismo hepático.',
      ...(severity === 'grave' ? ['Evitar sedação prolongada.'] : []),
    ],
    diagnosticAdds: ['Perfil hepático, ácidos biliares e ultrassom abdominal.'],
    diagnosticAvoids: [],
    ddxBoost: { encefalopatia_hepatica: 0.25, encefalopatia_metabolica: 0.2 },
  }),
  cardíaca: (severity) => ({
    key: 'cardíaca',
    alerts: ['Hipoperfusão pode mimetizar ou agravar sinais neurológicos.'],
    cautions: [
      'Cautela com fluidoterapia e anestesia.',
      ...(severity === 'grave' ? ['Monitorização hemodinâmica contínua.'] : []),
    ],
    diagnosticAdds: ['Pressão arterial, ECG e avaliação cardiológica.'],
    diagnosticAvoids: [],
    ddxBoost: { vascular: 0.15 },
  }),
  respiratória: (severity) => ({
    key: 'respiratória',
    alerts: ['Hipoxemia e hipercapnia podem causar depressão de SNC.'],
    cautions: [
      'Evitar sedação excessiva em paciente hipoventilando.',
      ...(severity === 'grave' ? ['Considerar proteção de via aérea.'] : []),
    ],
    diagnosticAdds: ['Oximetria, gasometria e radiografia torácica quando indicado.'],
    diagnosticAvoids: [],
    ddxBoost: { encefalopatia_hipoxica: 0.2 },
  }),
  endocrina: () => ({
    key: 'endocrina',
    alerts: ['Distúrbios metabólicos/endócrinos podem causar crises e ataxia.'],
    cautions: ['Checar glicemia e eletrólitos antes de fechar diagnóstico neurológico primário.'],
    diagnosticAdds: ['Glicemia, Na/K/Ca e pressão arterial.'],
    diagnosticAvoids: [],
    ddxBoost: { disturbio_eletrolitico: 0.2 },
  }),
  neuromuscular: () => ({
    key: 'neuromuscular',
    alerts: ['Fraqueza pode ser exacerbada por sedativos e bloqueadores neuromusculares.'],
    cautions: ['Evitar depressores neuromusculares sem monitorização.'],
    diagnosticAdds: ['CK e eletroneuromiografia quando indicado.'],
    diagnosticAvoids: [],
    ddxBoost: { neuromuscular: 0.2 },
  }),
  neoplasica: () => ({
    key: 'neoplasica',
    alerts: ['Considerar metástase ou síndrome paraneoplásica.'],
    cautions: ['Ajustar conduta conforme estadiamento oncológico.'],
    diagnosticAdds: ['Pesquisa de metástases torácicas/abdominais.'],
    diagnosticAvoids: [],
    ddxBoost: { metastase_neurologica: 0.25, paraneoplasico: 0.15 },
  }),
  imunomediada: () => ({
    key: 'imunomediada',
    alerts: ['Maior risco de infecções oportunistas.'],
    cautions: ['Evitar imunossupressão empírica sem investigação mínima.'],
    diagnosticAdds: ['Ampliar investigação infecciosa.'],
    diagnosticAvoids: [],
    ddxBoost: { infeccioso: 0.2 },
  }),
  hipertensão: () => ({
    key: 'hipertensão',
    alerts: ['Hipertensão pode causar sinais neurológicos e retinopatia aguda.'],
    cautions: ['Controlar PA antes de procedimentos de risco.'],
    diagnosticAdds: ['Aferições seriadas de PA e fundo de olho.'],
    diagnosticAvoids: [],
    ddxBoost: { vascular: 0.25, retinopatia: 0.2 },
  }),
  coagulopatia: (severity) => ({
    key: 'coagulopatia',
    alerts: ['Risco aumentado de hemorragia intracraniana/medular.'],
    cautions: [
      'Evitar punções invasivas sem correção da coagulação.',
      ...(severity === 'grave' ? ['Priorizar estabilização hematológica imediata.'] : []),
    ],
    diagnosticAdds: ['PT/aPTT, contagem de plaquetas e revisão de anticoagulantes/toxinas.'],
    diagnosticAvoids: ['Evitar líquor e biópsias sem correção prévia.'],
    ddxBoost: { hemorragia: 0.25, vascular: 0.2 },
  }),
}

export function applyComorbidityRules(args: {
  report: CaseReport
  comorbidities: ComorbidityItem[]
}): {
  updatedReport: CaseReport
  comorbiditySummary: {
    alerts: string[]
    cautions: string[]
    diagnosticAdds: string[]
    diagnosticAvoids: string[]
  }
} {
  const { report, comorbidities } = args
  if (!comorbidities?.length) {
    return {
      updatedReport: report,
      comorbiditySummary: { alerts: [], cautions: [], diagnosticAdds: [], diagnosticAvoids: [] },
    }
  }

  const allAlerts: string[] = []
  const allCautions: string[] = []
  const allDiagnosticAdds: string[] = []
  const allDiagnosticAvoids: string[] = []
  const ddxBoosts: Record<string, number> = {}

  for (const comorb of comorbidities) {
    const ruleFn = COMORBIDITY_RULES[comorb.key]
    if (!ruleFn) continue
    const effect = ruleFn(comorb.severity)
    allAlerts.push(...effect.alerts)
    allCautions.push(...effect.cautions)
    allDiagnosticAdds.push(...effect.diagnosticAdds)
    allDiagnosticAvoids.push(...effect.diagnosticAvoids)
    for (const [id, value] of Object.entries(effect.ddxBoost)) {
      ddxBoosts[id] = (ddxBoosts[id] || 0) + value
    }
  }

  const sorted = report.differentials
    .map((dx) => {
      const id = dx.id || dx.name.toLowerCase().replace(/[^a-z0-9]/g, '_')
      const boost = ddxBoosts[id] || 0
      const likelihood = Math.max(0, Math.min(100, Math.round(dx.likelihood + boost * 100)))
      return { ...dx, id, likelihood }
    })
    .sort((a, b) => b.likelihood - a.likelihood)
    .slice(0, 12)

  return {
    updatedReport: {
      ...report,
      differentials: sorted,
      comorbidityImpact: {
        alerts: Array.from(new Set(allAlerts)),
        cautions: Array.from(new Set(allCautions)),
        diagnosticAdds: Array.from(new Set(allDiagnosticAdds)),
        diagnosticAvoids: Array.from(new Set(allDiagnosticAvoids)),
      },
    },
    comorbiditySummary: {
      alerts: Array.from(new Set(allAlerts)),
      cautions: Array.from(new Set(allCautions)),
      diagnosticAdds: Array.from(new Set(allDiagnosticAdds)),
      diagnosticAvoids: Array.from(new Set(allDiagnosticAvoids)),
    },
  }
}

export type ComorbidityType = ComorbidityKey

export function getCombinedComorbidityCautions(comorbidities: ComorbidityItem[] | string[]): string[] {
  const items: ComorbidityItem[] = Array.isArray(comorbidities) && comorbidities.length > 0
    ? (typeof comorbidities[0] === 'string'
      ? comorbidities.map((c) => ({ key: c as ComorbidityKey, label: c }))
      : (comorbidities as ComorbidityItem[]))
    : []

  const cautions: string[] = []
  for (const item of items) {
    const rule = COMORBIDITY_RULES[item.key]
    if (!rule) continue
    const effect = rule(item.severity)
    cautions.push(...effect.diagnosticAvoids, ...effect.cautions)
  }
  return Array.from(new Set(cautions))
}

export function getBoostedDdxIds(comorbidities: ComorbidityItem[] | string[]): string[] {
  const items: ComorbidityItem[] = Array.isArray(comorbidities) && comorbidities.length > 0
    ? (typeof comorbidities[0] === 'string'
      ? comorbidities.map((c) => ({ key: c as ComorbidityKey, label: c }))
      : (comorbidities as ComorbidityItem[]))
    : []

  const boosted = new Set<string>()
  for (const item of items) {
    const rule = COMORBIDITY_RULES[item.key]
    if (!rule) continue
    Object.keys(rule(item.severity).ddxBoost).forEach((id) => boosted.add(id))
  }
  return Array.from(boosted)
}

export function getComorbidityScoreBoost(comorbidities: ComorbidityItem[] | string[], ddxId: string): number {
  const items: ComorbidityItem[] = Array.isArray(comorbidities) && comorbidities.length > 0
    ? (typeof comorbidities[0] === 'string'
      ? comorbidities.map((c) => ({ key: c as ComorbidityKey, label: c }))
      : (comorbidities as ComorbidityItem[]))
    : []

  let boost = 0
  for (const item of items) {
    const rule = COMORBIDITY_RULES[item.key]
    if (!rule) continue
    boost += rule(item.severity).ddxBoost[ddxId] || 0
  }
  return Math.min(boost, 0.3)
}
