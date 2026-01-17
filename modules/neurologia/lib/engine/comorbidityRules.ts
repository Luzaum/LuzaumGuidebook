/**
 * Motor de regras de comorbidades para análise neurológica
 * Define como comorbidades impactam diagnóstico, tratamento e scores de DDx
 */

import type { CaseReport, Differential } from '../../types/analysis'
import type { ComorbidityItem, ComorbidityKey } from '../../stores/caseStore'

export type ComorbidityEffect = {
  key: ComorbidityKey
  alerts: string[] // alertas clínicos objetivos
  cautions: string[] // cautelas de fármacos/procedimentos
  diagnosticAdds: string[] // exames recomendados adicionais
  diagnosticAvoids: string[] // coisas a evitar/ajustar (ex.: contraste)
  ddxBoost: Record<string, number> // map ddxId -> boost (+ ou -)
}

type ComorbidityRuleFunction = (severity?: 'leve' | 'moderada' | 'grave') => ComorbidityEffect

/**
 * Base de regras clínicas (PT-BR, objetivas)
 */
const COMORBIDITY_RULES: Record<ComorbidityKey, ComorbidityRuleFunction> = {
  renal: (severity) => ({
    key: 'renal',
    alerts: [
      'Risco de acidose/uremia contribuindo para alteração neurológica.',
      severity === 'grave' ? 'Risco aumentado de encefalopatia urêmica.' : '',
    ].filter(Boolean),
    cautions: [
      'Evitar AINEs; preferir analgesia multimodal.',
      'Ajustar doses de fármacos renais e evitar nefrotóxicos.',
      severity === 'grave' ? 'Evitar agentes nefrotóxicos completamente (ex.: aminoglicosídeos, contrastes iodados).' : '',
    ].filter(Boolean),
    diagnosticAdds: ['Ureia/creatinina/SDMA, eletrólitos, urinálise e densidade urinária.'],
    diagnosticAvoids: [
      'Evitar contraste iodado quando possível; se indispensável, hidratar e monitorar creatinina/diurese.',
    ],
    ddxBoost: {
      encefalopatia_metabolica: severity === 'grave' ? 0.3 : 0.2,
      disturbio_eletrolitico: 0.2,
      uremia: severity === 'grave' ? 0.25 : 0.15,
    },
  }),
  hepatica: (severity) => ({
    key: 'hepatica',
    alerts: ['Alteração de mentação pode ser exacerbada por encefalopatia hepática.'],
    cautions: [
      'Cautela com fármacos metabolizados no fígado; ajustar dose.',
      'Risco de encefalopatia hepática; evitar sedação excessiva.',
      severity === 'grave' ? 'Evitar benzodiazepínicos de longa duração; preferir de curta duração se necessário.' : '',
    ].filter(Boolean),
    diagnosticAdds: ['Ácidos biliares, amônia (quando indicado), perfil hepático, US abdominal.'],
    diagnosticAvoids: [],
    ddxBoost: {
      encefalopatia_metabolica: 0.2,
      encefalopatia_hepatica: severity === 'grave' ? 0.3 : 0.2,
    },
  }),
  cardiaca: (severity) => ({
    key: 'cardiaca',
    alerts: ['Eventos vasculares/hipoperfusão podem mimetizar doença neurológica primária.'],
    cautions: [
      'Evitar sobrecarga volêmica; monitorar PA/perfusão.',
      'Cautela com sedação/anestesia; avaliar risco.',
      severity === 'grave' ? 'Evitar agentes que deprimem miocárdio; monitorar continuamente.' : '',
    ].filter(Boolean),
    diagnosticAdds: ['Pressão arterial, ECG quando indicado, avaliação cardiológica pré-sedação.'],
    diagnosticAvoids: [],
    ddxBoost: {
      vascular: 0.15,
      hipoxemia: 0.1,
      tromboembolismo: severity === 'grave' ? 0.2 : 0.15,
    },
  }),
  respiratoria: (severity) => ({
    key: 'respiratoria',
    alerts: ['Hipoxemia/hipercapnia podem causar depressão de SNC.'],
    cautions: [
      'Evitar sedação excessiva; risco de hipoventilação.',
      'Se disfagia: risco alto de aspiração.',
      severity === 'grave' ? 'Considerar proteção de via aérea se disfagia presente.' : '',
    ].filter(Boolean),
    diagnosticAdds: [
      'Oximetria/gasometria quando indicado; RX tórax se suspeita de aspiração.',
    ],
    diagnosticAvoids: [],
    ddxBoost: {
      encefalopatia_hipoxica: 0.2,
      aspiração: severity === 'grave' ? 0.25 : 0.15,
    },
  }),
  endocrina: (severity) => ({
    key: 'endocrina',
    alerts: [
      'Distúrbios metabólicos (hipoglicemia/eletrólitos) podem causar crises/ataxia/alteração mental.',
    ],
    cautions: [
      'Checar glicemia e eletrólitos antes de concluir neurológico primário.',
      severity === 'grave' ? 'Ajustar doses de fármacos conforme função endócrina específica.' : '',
    ].filter(Boolean),
    diagnosticAdds: ['Glicemia, Na/K/Ca, pressão arterial, urina (glicosúria/cetonúria).'],
    diagnosticAvoids: [],
    ddxBoost: {
      disturbio_eletrolitico: 0.2,
      vascular: 0.1,
    },
  }),
  neuromuscular: () => ({
    key: 'neuromuscular',
    alerts: ['Fraqueza pode ser exacerbada por fármacos depressores neuromusculares.'],
    cautions: ['Cautela com bloqueadores neuromusculares e sedativos que deprimem respiração.'],
    diagnosticAdds: ['Creatina quinase (CK), eletroneuromiografia quando indicado.'],
    diagnosticAvoids: [],
    ddxBoost: {},
  }),
  neoplasica: () => ({
    key: 'neoplasica',
    alerts: ['Considerar metástases neurológicas ou síndromes paraneoplásicas.'],
    cautions: ['Ajustar tratamento conforme tipo e estágio da neoplasia.'],
    diagnosticAdds: ['Avaliação de metástases (radiografia/ultrassom tórax/abdome).'],
    diagnosticAvoids: [],
    ddxBoost: {
      metastase_neurologica: 0.25,
      paraneoplasico: 0.15,
    },
  }),
  imunomediada: () => ({
    key: 'imunomediada',
    alerts: ['Maior risco de infecções oportunistas e complicações infecciosas.'],
    cautions: ['Evitar imunossupressão adicional se possível até identificar etiologia.'],
    diagnosticAdds: ['Exames mais extensivos para identificar agentes infecciosos.'],
    diagnosticAvoids: [],
    ddxBoost: {
      infeccioso: 0.2,
      oportunista: 0.15,
    },
  }),
  hipertensao: () => ({
    key: 'hipertensao',
    alerts: ['Cegueira aguda pode ser por lesão de retina secundária à hipertensão.'],
    cautions: ['Controlar pressão arterial antes de procedimentos que possam aumentar PA.'],
    diagnosticAdds: ['Aferir PA repetida; fundo de olho se cegueira aguda.'],
    diagnosticAvoids: ['Evitar contraste iodado se insuficiência renal associada.'],
    ddxBoost: {
      vascular: 0.25,
      retinopatia: 0.2,
    },
  }),
  coagulopatia: (severity) => ({
    key: 'coagulopatia',
    alerts: ['Risco aumentado de hemorragia intracraniana/medular.'],
    cautions: [
      'Evitar punções (líquor) sem corrigir coagulopatia.',
      severity === 'grave' ? 'Priorizar correção de coagulopatia antes de procedimentos invasivos.' : '',
    ].filter(Boolean),
    diagnosticAdds: ['PT/aPTT, plaquetas; revisar uso de anticoagulantes/toxinas.'],
    diagnosticAvoids: ['Evitar procedimentos invasivos (puncção lombar, biópsias) sem correção prévia.'],
    ddxBoost: {
      vascular: 0.2,
      hemorragia: severity === 'grave' ? 0.3 : 0.2,
    },
  }),
}

/**
 * Aplica regras de comorbidades ao CaseReport
 * Retorna report atualizado com boosts em DDx e summary de impacto
 */
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

  // Se não há comorbidades, retornar report sem alterações
  if (!comorbidities || comorbidities.length === 0) {
    return {
      updatedReport: report,
      comorbiditySummary: {
        alerts: [],
        cautions: [],
        diagnosticAdds: [],
        diagnosticAvoids: [],
      },
    }
  }

  // Consolidar efeitos de todas as comorbidades
  const allAlerts: string[] = []
  const allCautions: string[] = []
  const allDiagnosticAdds: string[] = []
  const allDiagnosticAvoids: string[] = []
  const ddxBoosts: Record<string, number> = {}

  comorbidities.forEach((comorb) => {
    const ruleFn = COMORBIDITY_RULES[comorb.key]
    if (!ruleFn) return

    const effect = ruleFn(comorb.severity)
    allAlerts.push(...effect.alerts)
    allCautions.push(...effect.cautions)
    allDiagnosticAdds.push(...effect.diagnosticAdds)
    allDiagnosticAvoids.push(...effect.diagnosticAvoids)

    // Acumular boosts por DDx ID
    Object.entries(effect.ddxBoost).forEach(([ddxId, boost]) => {
      ddxBoosts[ddxId] = (ddxBoosts[ddxId] || 0) + boost
    })
  })

  // Remover duplicatas mantendo ordem
  const uniqueAlerts = Array.from(new Set(allAlerts))
  const uniqueCautions = Array.from(new Set(allCautions))
  const uniqueDiagnosticAdds = Array.from(new Set(allDiagnosticAdds))
  const uniqueDiagnosticAvoids = Array.from(new Set(allDiagnosticAvoids))

  // Aplicar boosts nos diferenciais
  const updatedDifferentials = report.differentials.map((dx) => {
    // Gerar ID baseado no nome se não existir
    const ddxId = dx.id || dx.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/\s+/g, '_')

    // Encontrar boost correspondente
    // Tentar match exato primeiro, depois parcial
    let boost = ddxBoosts[ddxId] || 0
    
    // Se não encontrou match exato, tentar match parcial
    if (boost === 0) {
      Object.entries(ddxBoosts).forEach(([boostId, boostValue]) => {
        // Match parcial: se o ID do DDx contém o boostId ou vice-versa
        if (ddxId.includes(boostId) || boostId.includes(ddxId) || ddxId.replace(/_/g, '').includes(boostId.replace(/_/g, ''))) {
          boost += boostValue
        }
      })
    }

    // Aplicar boost (convertendo likelihood 0-100 para 0-1, aplicar boost, converter de volta)
    let newLikelihood = dx.likelihood / 100 // 0-1
    newLikelihood = Math.min(1, Math.max(0, newLikelihood + boost)) // aplicar boost e clamp
    const finalLikelihood = Math.round(newLikelihood * 100) // converter de volta para 0-100

    return {
      ...dx,
      id: ddxId,
      likelihood: finalLikelihood,
    }
  })

  // Reordenar por likelihood (descendente)
  const sorted = [...updatedDifferentials].sort((a, b) => b.likelihood - a.likelihood)

  // Renormalizar para somar 100% (manter proporções relativas)
  const totalLikelihood = sorted.reduce((sum, dx) => sum + dx.likelihood, 0)
  const normalized =
    totalLikelihood > 0
      ? sorted.map((dx) => ({
          ...dx,
          likelihood: Math.round((dx.likelihood / totalLikelihood) * 100),
        }))
      : sorted

  // Garantir top 5
  const top5 = normalized.slice(0, 5)

  // Construir report atualizado
  const updatedReport: CaseReport = {
    ...report,
    differentials: top5,
    comorbidityImpact: {
      alerts: uniqueAlerts,
      cautions: uniqueCautions,
      diagnosticAdds: uniqueDiagnosticAdds,
      diagnosticAvoids: uniqueDiagnosticAvoids,
    },
  }

  return {
    updatedReport,
    comorbiditySummary: {
      alerts: uniqueAlerts,
      cautions: uniqueCautions,
      diagnosticAdds: uniqueDiagnosticAdds,
      diagnosticAvoids: uniqueDiagnosticAvoids,
    },
  }
}

// Funções auxiliares mantidas para compatibilidade
export type ComorbidityType = ComorbidityKey

export function getCombinedComorbidityCautions(comorbidities: ComorbidityItem[] | string[]): string[] {
  const items: ComorbidityItem[] = Array.isArray(comorbidities) && comorbidities.length > 0
    ? (typeof comorbidities[0] === 'string' 
        ? comorbidities.map(c => ({ key: c as ComorbidityKey, label: c }))
        : comorbidities as ComorbidityItem[])
    : []

  const cautelas: string[] = []
  items.forEach((comorb) => {
    const ruleFn = COMORBIDITY_RULES[comorb.key]
    if (ruleFn) {
      const effect = ruleFn(comorb.severity)
      cautelas.push(...effect.diagnosticAvoids)
      cautelas.push(...effect.cautions)
    }
  })
  return Array.from(new Set(cautelas))
}

export function getBoostedDdxIds(comorbidities: ComorbidityItem[] | string[]): string[] {
  const items: ComorbidityItem[] = Array.isArray(comorbidities) && comorbidities.length > 0
    ? (typeof comorbidities[0] === 'string' 
        ? comorbidities.map(c => ({ key: c as ComorbidityKey, label: c }))
        : comorbidities as ComorbidityItem[])
    : []

  const boosted: string[] = []
  items.forEach((comorb) => {
    const ruleFn = COMORBIDITY_RULES[comorb.key]
    if (ruleFn) {
      const effect = ruleFn(comorb.severity)
      boosted.push(...Object.keys(effect.ddxBoost))
    }
  })
  return Array.from(new Set(boosted))
}

export function getComorbidityScoreBoost(comorbidities: ComorbidityItem[] | string[], ddxId: string): number {
  const items: ComorbidityItem[] = Array.isArray(comorbidities) && comorbidities.length > 0
    ? (typeof comorbidities[0] === 'string' 
        ? comorbidities.map(c => ({ key: c as ComorbidityKey, label: c }))
        : comorbidities as ComorbidityItem[])
    : []

  let boost = 0
  items.forEach((comorb) => {
    const ruleFn = COMORBIDITY_RULES[comorb.key]
    if (ruleFn) {
      const effect = ruleFn(comorb.severity)
      const effectBoost = effect.ddxBoost[ddxId] || 0
      boost += effectBoost
    }
  })
  return Math.min(boost, 0.3) // Limitar boost máximo a 30%
}
