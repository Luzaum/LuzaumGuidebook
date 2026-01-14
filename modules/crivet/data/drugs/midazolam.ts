export const midazolamPresentations = [
  { label: 'Midazolam 5 mg/mL (padrão)', mgPerMl: 5 },
  { label: 'Midazolam 1 mg/mL (raro) ⚠️', mgPerMl: 1 },
]

export const midazolamDoses = {
  bolusIV: {
    dog: { min: 0.1, max: 0.5, unit: 'mg/kg' as const },
    cat: { min: 0.1, max: 0.3, unit: 'mg/kg' as const },
  },
  cri: {
    standard: { min: 0.1, max: 0.5, unit: 'mg/kg/h' as const },
    refractorySE: { max: 1.0, unit: 'mg/kg/h' as const },
    inCocktails: { min: 0.1, max: 0.2, unit: 'mg/kg/h' as const },
  },
}

export const midazolamSafetyThresholds = {
  criHighRiskMgKgH: 1.0,
}

import type { IndicatedDose } from '../../types/drug'

export const midazolamIndicatedDoses: IndicatedDose[] = [
  // CRI - Padrão
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mg/kg/h',
    range: { min: 0.1, max: 0.5 },
    purpose: 'Sedação/Anticonvulsivante',
  },
  // CRI - Refratário
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mg/kg/h',
    range: { min: 0.5, max: 1.0 },
    purpose: 'Status epilepticus refratário',
  },
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg/h', // será convertido para mg/kg
    range: { min: 0.1, max: 0.5 },
    purpose: 'Bolus IV',
    note: 'Bolus em mg/kg (não por hora)',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg/h', // será convertido para mg/kg
    range: { min: 0.1, max: 0.3 },
    purpose: 'Bolus IV',
    note: 'Bolus em mg/kg (não por hora)',
  },
]
