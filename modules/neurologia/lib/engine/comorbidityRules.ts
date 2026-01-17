/**
 * Regras de comorbidades para análise neurológica
 * Define como comorbidades impactam diagnóstico, tratamento e scores de DDx
 */

export type ComorbidityType =
  | 'renal'
  | 'hepatic'
  | 'cardiac'
  | 'endocrine'
  | 'respiratory'
  | 'neoplasia'
  | 'immunosuppressed'
  | 'coagulopathy'
  | 'hypertension'

export type ComorbidityRule = {
  ddxBoost: string[] // IDs de DDx que devem ter score aumentado
  cautelasDiagnosticas: string[] // Avisos sobre exames/contraste
  cautelasTerapeuticas: string[] // Avisos sobre fármacos/tratamentos
  impactoScore?: number // Boost adicional no score (0-20)
}

export const COMORBIDITY_RULES: Record<ComorbidityType, ComorbidityRule> = {
  renal: {
    ddxBoost: ['encefalopatia_metabolica', 'hipocalemia', 'uremia', 'hipertensao_sistemica'],
    cautelasDiagnosticas: [
      'Ajustar fármacos eliminados por via renal e evitar nefrotóxicos.',
      'Preferir exames que não exijam contraste iodado quando possível; se necessário, hidratar adequadamente antes e monitorar função renal.',
      'Considerar risco de sobrecarga volêmica em pacientes oligúricos/anúricos.',
    ],
    cautelasTerapeuticas: [
      'Ajustar doses de fármacos eliminados por via renal (ex.: levetiracetam, fenobarbital em casos específicos).',
      'Evitar uso de AINEs em pacientes com insuficiência renal aguda ou crônica descompensada.',
      'Monitorar eletrólitos (especialmente potássio, fósforo) e equilíbrio ácido-base.',
      'Cautela com agentes de contraste para exames de imagem; garantir hidratação adequada.',
    ],
    impactoScore: 15,
  },
  hepatic: {
    ddxBoost: ['encefalopatia_hepatica', 'coagulopatia_secundaria', 'hipoglicemia'],
    cautelasDiagnosticas: [
      'Avaliar função hepática (enzimas, bilirrubinas, albumina, tempo de protrombina) antes de sedação/anestesia.',
      'Considerar risco aumentado de sangramento em procedimentos invasivos se coagulopatia presente.',
    ],
    cautelasTerapeuticas: [
      'Evitar sedativos/hepatotóxicos quando possível (ex.: fenobarbital em altas doses pode ser hepatotóxico).',
      'Ajustar doses de fármacos metabolizados no fígado (ex.: fenobarbital, levetiracetam em alguns casos).',
      'Risco de encefalopatia hepática com sedação excessiva; preferir benzodiazepínicos de curta duração se necessário.',
      'Monitorar glicemia (risco de hipoglicemia).',
    ],
    impactoScore: 15,
  },
  cardiac: {
    ddxBoost: ['vascular', 'hipoxemia', 'tromboembolismo', 'sincope_cardio'],
    cautelasDiagnosticas: [
      'Evitar sobrecarga volêmica; monitorar perfusão e pressão arterial durante procedimentos.',
      'Considerar risco de eventos tromboembólicos (especialmente em cardiomiopatia dilatada felina).',
      'Avaliar função cardíaca antes de sedação/anestesia (ausculta, radiografia torácica se indicado).',
    ],
    cautelasTerapeuticas: [
      'Cautela com sedação/anestesia e agentes que deprimem miocárdio ou causam hipotensão.',
      'Evitar fluidoterapia agressiva sem monitoramento; considerar restrição volêmica se necessário.',
      'Monitorar pressão arterial e perfusão continuamente; ajustar fármacos se hipotensão.',
      'Cautela com fármacos que podem causar arritmias ou interagir com medicamentos cardíacos.',
    ],
    impactoScore: 12,
  },
  respiratory: {
    ddxBoost: ['hipoxemia', 'encefalopatia_hipoxica', 'aspiração'],
    cautelasDiagnosticas: [
      'Alto risco de aspiração se disfagia presente; considerar oxigenoterapia e monitorar ventilação.',
      'Evitar sedação excessiva que possa deprimir respiração.',
      'Avaliar função respiratória antes de anestesia/ressonância magnética que exija contenção prolongada.',
    ],
    cautelasTerapeuticas: [
      'Evitar sedação excessiva; preferir agentes que preservem drive respiratório.',
      'Monitorar saturação de oxigênio e ventilação; considerar oxigenoterapia se necessário.',
      'Cautela com fluidoterapia agressiva se edema pulmonar ou derrame pleural.',
      'Se disfagia/aspiração: considerar jejum, posicionamento, sucção quando necessário.',
    ],
    impactoScore: 12,
  },
  endocrine: {
    ddxBoost: ['vascular', 'metabolica', 'hipertensao_secundaria'],
    cautelasDiagnosticas: [
      'Hipertensão e eventos vasculares podem ser mais prováveis; medir pressão arterial e avaliar órgãos-alvo (retina, rim, coração).',
      'Checar glicemia e eletrólitos como triagem (especialmente se diabetes, hipoadrenocorticismo, hipertiroidismo).',
    ],
    cautelasTerapeuticas: [
      'Ajustar doses de fármacos conforme função metabólica/endócrina.',
      'Se diabetes: monitorar glicemia durante tratamento; ajustar insulina se necessário.',
      'Se hipoadrenocorticismo: pode precisar de glicocorticoides/mineralocorticoides durante estresse.',
      'Se hipertiroidismo: considerar interações medicamentosas e estado cardiovascular.',
    ],
    impactoScore: 10,
  },
  neoplasia: {
    ddxBoost: ['metastase_neurologica', 'paraneoplasico', 'coagulopatia_secundaria'],
    cautelasDiagnosticas: [
      'Considerar metástases neurológicas ou síndromes paraneoplásicas.',
      'Avaliar estado de coagulação antes de procedimentos invasivos.',
      'Considerar estado nutricional e imunológico.',
    ],
    cautelasTerapeuticas: [
      'Ajustar tratamento conforme tipo e estágio da neoplasia.',
      'Considerar interações com quimioterapia se em andamento.',
      'Monitorar estado geral, função orgânica e sinais de toxicidade.',
    ],
    impactoScore: 10,
  },
  immunosuppressed: {
    ddxBoost: ['infeccioso', 'oportunista', 'fungico'],
    cautelasDiagnosticas: [
      'Maior risco de infecções oportunistas (bacterianas, fúngicas, protozoárias).',
      'Considerar exames mais extensivos para identificar agentes infecciosos.',
    ],
    cautelasTerapeuticas: [
      'Evitar imunossupressão adicional se possível até identificar etiologia.',
      'Se tratar como infeccioso: considerar cobertura antibiótica/antifúngica ampla até confirmação.',
      'Monitorar sinais de infecção secundária durante tratamento.',
    ],
    impactoScore: 12,
  },
  coagulopathy: {
    ddxBoost: ['vascular', 'hemorragia', 'coagulopatia_consumptiva'],
    cautelasDiagnosticas: [
      'Alto risco de sangramento em procedimentos invasivos (puncção lombar, biópsias).',
      'Avaliar perfil de coagulação completo antes de qualquer procedimento invasivo.',
      'Considerar necessidade de transfusão de plasma/plaquetas antes de procedimentos.',
    ],
    cautelasTerapeuticas: [
      'Evitar AINEs e outros fármacos que podem agravar coagulopatia.',
      'Considerar profilaxia de sangramento se necessário.',
      'Monitorar sinais de hemorragia ativa durante tratamento.',
    ],
    impactoScore: 15,
  },
  hypertension: {
    ddxBoost: ['vascular', 'hipertensao_secundaria', 'retinopatia'],
    cautelasDiagnosticas: [
      'Medir pressão arterial seriada; avaliar órgãos-alvo (retina, rim, coração).',
      'Considerar retinoscopia para avaliar retinopatia hipertensiva (especialmente em cegueira aguda).',
      'Evitar contraste iodado se insuficiência renal associada.',
    ],
    cautelasTerapeuticas: [
      'Controlar pressão arterial antes de procedimentos que possam aumentar PA (sedação/anestesia).',
      'Ajustar doses de fármacos que podem aumentar ou diminuir PA.',
      'Evitar sobrecarga volêmica.',
      'Considerar anti-hipertensivos se PA muito elevada e risco de eventos vasculares.',
    ],
    impactoScore: 12,
  },
}

/**
 * Gera lista consolidada de cautelas para todas as comorbidades presentes
 */
export function getCombinedComorbidityCautions(comorbidities: string[]): string[] {
  const cautelas: string[] = []

  comorbidities.forEach((comorb) => {
    const rule = COMORBIDITY_RULES[comorb as ComorbidityType]
    if (rule) {
      cautelas.push(...rule.cautelasDiagnosticas)
      cautelas.push(...rule.cautelasTerapeuticas)
    }
  })

  // Remover duplicatas mantendo ordem
  return Array.from(new Set(cautelas))
}

/**
 * Retorna lista de IDs de DDx que devem ter score aumentado baseado em comorbidades
 */
export function getBoostedDdxIds(comorbidities: string[]): string[] {
  const boosted: string[] = []

  comorbidities.forEach((comorb) => {
    const rule = COMORBIDITY_RULES[comorb as ComorbidityType]
    if (rule) {
      boosted.push(...rule.ddxBoost)
    }
  })

  return Array.from(new Set(boosted))
}

/**
 * Calcula boost adicional no score de um DDx baseado em comorbidades
 */
export function getComorbidityScoreBoost(comorbidities: string[], ddxId: string): number {
  const boosted = getBoostedDdxIds(comorbidities)
  if (!boosted.includes(ddxId)) return 0

  let boost = 0
  comorbidities.forEach((comorb) => {
    const rule = COMORBIDITY_RULES[comorb as ComorbidityType]
    if (rule && rule.ddxBoost.includes(ddxId)) {
      boost += rule.impactoScore || 10
    }
  })

  return Math.min(boost, 25) // Limitar boost máximo a 25 pontos
}
