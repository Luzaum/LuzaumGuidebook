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

import type { IndicatedDose } from '../../types/drug'

export const remifentanilIndicatedDoses: IndicatedDose[] = [
  // CRI - Manutenção
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 0.1, max: 0.5 },
    purpose: 'Manutenção',
  },
  // CRI - Cirurgia muito dolorosa
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 0.5, max: 1.0 },
    purpose: 'Cirurgia muito dolorosa',
  },
  // CRI - UTI sedação
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 0.05, max: 0.1 },
    purpose: 'UTI sedação',
  },
  // CRI - Indução/Co-indução
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 2.5, max: 5.0 },
    purpose: 'Indução/Co-indução',
    note: 'Alerta: risco de apneia',
  },
]
