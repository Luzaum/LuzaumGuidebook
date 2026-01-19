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
  'É a forma mais usada para CRI de opioide potente na rotina, com menor risco de erro que mcg/kg/min para a equipe.',
]

import type { IndicatedDose } from '../../types/drug'

export const fentanylIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 2, max: 5 },
    purpose: 'Analgesia (CRI comum)',
    routine_default: '3 mcg/kg/h',
    note: 'Faixas maiores (anestesia/TIVA) mantenha em preset avançado se ventilado.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 1, max: 4 },
    purpose: 'Analgesia',
    routine_default: '2 mcg/kg/h',
  },
  // Mantendo faixas de anestesia como secundárias/avançadas
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 10, max: 20 },
    purpose: 'Anestesia (ventilado)',
    note: 'Apenas ventilado. Depressão respiratória dose-dependente.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 5, max: 10 },
    purpose: 'Anestesia',
    note: 'Apenas ventilado.',
  },
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mcg/kg',
    range: { min: 2, max: 5 },
    purpose: 'Bolus ataque',
    routine_default: '2 mcg/kg',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mcg/kg',
    range: { min: 1, max: 2 },
    purpose: 'Bolus ataque',
    routine_default: '1 mcg/kg',
  },
]
