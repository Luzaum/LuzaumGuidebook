export const remifentanilVials = [
  { label: 'Remifentanil 1 mg (pó)', mg: 1 },
  { label: 'Remifentanil 2 mg (pó)', mg: 2 },
  { label: 'Remifentanil 5 mg (pó)', mg: 5 },
]

// Reconstituição: 1 mL por 1 mg -> solução mãe 1 mg/mL (1000 mcg/mL)
export const remiReconstitution = {
  motherSolution: { mgPerMl: 1, mcgPerMl: 1000 },
  warning: 'NUNCA administrar solução mãe diretamente (concentração altíssima).',
  step: 'Adicionar 1 mL de diluente para cada 1 mg de pó → 1 mg/mL.',
}

export const remiTargets = {
  finalConcentrationMcgMlOptions: [50, 20], // 50 padrão; 20 para pequenos/gatos
}

export const remiDoses = {
  unitStandard: 'mcg/kg/min' as const,
  inductionCoInduction: { min: 2.5, max: 5.0 },
  maintenance: { min: 0.1, max: 0.5 },
  veryPainful: { max: 1.0 },
  icuSedation: { min: 0.05, max: 0.1 },
}

// Sistema de unidade recomendada
export const remifentanilRecommendedUnit = 'mcg/kg/min'
export const remifentanilRecommendedUnitWhy = [
  'Unidade padrão para CRI de remifentanil em anestesia e UTI.',
  'Permite titulação fina e precisa (0.05-1.0 mcg/kg/min).',
  'Evita confusão com conversões e reduz erros de cálculo.',
  'Padrão internacional para opioides de ação ultracurta.',
]

import type { IndicatedDose } from '../../types/drug'

export const remifentanilIndicatedDoses: IndicatedDose[] = [
  // CRI - Manutenção (cão)
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.1, max: 0.2 },
    purpose: 'Manutenção analgesia',
    note: '🔴 FISIOLOGIA: Remifentanil é metabolizado por esterases plasmáticas, independente de função hepática/renal. Meia-vida ultracurta (~3-5 min) permite despertar rápido e previsível. 🟢 PROTOCOLO: Iniciar em 0.1 mcg/kg/min e titular conforme necessidade anestésica e resposta ventilatória. Monitorar EtCO2 rigorosamente.',
  },
  // CRI - Cirurgia muito dolorosa (cão)
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.5, max: 1.0 },
    purpose: 'Cirurgia muito dolorosa',
    note: '🔴 FISIOLOGIA: Doses altas (0.5-1.0 mcg/kg/min) proporcionam analgesia intensa mas com risco significativo de apneia e depressão respiratória. 🟢 PROTOCOLO: Usar apenas em pacientes ventilados. Monitorar PA, FC e EtCO2 continuamente.',
  },
  // CRI - UTI sedação (cão)
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.05, max: 0.1 },
    purpose: 'UTI sedação',
    note: '🔴 FISIOLOGIA: Doses baixas mantêm sedação leve com menor risco de acúmulo. Clearance rápido permite ajuste rápido. 🟢 PROTOCOLO: Ideal para pacientes críticos que precisam de avaliação neurológica frequente.',
  },
  // CRI - Manutenção (gato)
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 0.067, max: 0.1 },
    purpose: 'Manutenção analgesia',
    note: '🔴 FISIOLOGIA: Gatos podem ser mais sensíveis a opioides. Doses ligeiramente menores (0.067-0.1 mcg/kg/min) são geralmente suficientes. 🟢 PROTOCOLO: Iniciar em 0.067 mcg/kg/min e titular conforme resposta. Monitorar ventilação e profundidade anestésica.',
  },
  // CRI - Indução/Co-indução (ambos) - ALERTA
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 2.5, max: 5.0 },
    purpose: 'Indução/Co-indução',
    note: '🔴 FISIOLOGIA: Doses muito altas (2.5-5.0 mcg/kg/min) causam apneia imediata e bradicardia severa. ⛔ ALERTA CRÍTICO: NUNCA usar bolus IV. Iniciar CRI diretamente. 🟢 PROTOCOLO: Apenas em pacientes intubados e ventilados. Monitoramento invasivo obrigatório.',
  },
]
