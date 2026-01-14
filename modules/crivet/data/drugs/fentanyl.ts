export const fentanylPresentations = [
  { label: 'Fentanil 50 mcg/mL (0,05 mg/mL) — padrão', mcgPerMl: 50, mgPerMl: 0.05 },
]

export const fentanylDoses = {
  dog: {
    bolusLoading: { min: 3, max: 5, unit: 'mcg/kg' as const },
    criAnalgesia: { min: 3, max: 7, unit: 'mcg/kg/h' as const },
    criAnesthesia: { min: 10, max: 20, unit: 'mcg/kg/h' as const },
    criPrimaryAgent: { min: 5, max: 40, unit: 'mcg/kg/h' as const }, // Agente primário em cães graves
  },
  cat: {
    bolusLoading: { min: 2, max: 5, unit: 'mcg/kg' as const },
    criAnalgesia: { min: 3, max: 7, unit: 'mcg/kg/h' as const },
    criAnesthesia: { min: 5, max: 10, unit: 'mcg/kg/h' as const },
  },
}

// Sistema de unidade recomendada (sem bloqueios)
export const fentanylRecommendedUnit = 'mcg/kg/h'
export const fentanylRecommendedUnitWhy = [
  'É a forma mais usada para CRI de fentanil em UTI e pós-operatório (padrão em hora).',
  'Reduz erro de 60× (quando alguém confunde min vs h).',
  'Reduz erro de 1000× (mcg vs mg), porque o fentanil comercial é 50 mcg/mL.',
]

import type { IndicatedDose } from '../../types/drug'

export const fentanylIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 2, max: 5 },
    purpose: 'Analgesia/UTI',
  },
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 10, max: 20 },
    purpose: 'Anestesia (ventilado)',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 1, max: 4 },
    purpose: 'Analgesia',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 5, max: 10 },
    purpose: 'Anestesia',
  },
  // Bolus - Cão (usando mcg/kg/h como base, mas será tratado como mcg/kg)
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 2, max: 5 },
    purpose: 'Bolus ataque',
    note: 'Bolus em mcg/kg IV',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 1, max: 2 },
    purpose: 'Bolus ataque',
    note: 'Bolus em mcg/kg IV',
  },
]
