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
  'Droga ultracurta; titulação por minuto é o padrão mais seguro e comum em CRI.',
]

import type { IndicatedDose } from '../../types/drug'

export const remifentanilIndicatedDoses: IndicatedDose[] = [
  // Bolus - Evitar
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mcg/kg',
    range: { min: 1, max: 1 },
    purpose: 'Adjunto analgésico à anestesia geral',
    routine_default: 'EVITAR bolus como regra',
    note: 'O próprio monógrafo reforça que bolus antes do CRI geralmente é evitado por bradicardia severa.',
  },
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.1, max: 0.3 },
    purpose: 'Adjunto analgésico à anestesia geral',
    routine_default: '0.15 mcg/kg/min',
    note: 'Planejar analgesia alternativa ao desligar (dor rebote).',
  },
  // Bolus - Gato - Evitar
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mcg/kg',
    range: { min: 2.5, max: 2.5 },
    purpose: 'Adjunto analgésico à anestesia geral',
    routine_default: 'EVITAR bolus como regra',
    note: 'Mesma lógica: bolus antes do CRI geralmente é evitado por bradicardia severa.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 0.2, max: 0.4 },
    purpose: 'Adjunto analgésico à anestesia geral',
    routine_default: '0.25 mcg/kg/min',
  },
  // CRI - Indução/Co-indução (Manter como opção secundária/alerta)
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 2.5, max: 5.0 },
    purpose: 'Indução/Co-indução (Apenas Ventilado)',
    note: '⛔ ALERTA CRÍTICO: Doses de indução causam apneia imediata. Apenas em pacientes intubados/ventilados.',
  },
]
