import type { IndicatedDose } from '../../types/drug'

export const norepinephrinePresentations = [
  { label: 'Norepinefrina 1 mg/mL (padrão)', mgPerMl: 1 },
  { label: 'Norepinefrina 2 mg/mL', mgPerMl: 2 },
]

export const norepinephrineDoses = {
  dog: {
    criStart: { min: 0.05, max: 0.05, unit: 'mcg/kg/min' as const },
    criUsual: { min: 0.05, max: 0.5, unit: 'mcg/kg/min' as const },
    criMax: { max: 0.5, unit: 'mcg/kg/min' as const },
  },
  cat: {
    criStart: { min: 0.05, max: 0.05, unit: 'mcg/kg/min' as const },
    criUsual: { min: 0.05, max: 0.5, unit: 'mcg/kg/min' as const },
    criMax: { max: 0.5, unit: 'mcg/kg/min' as const },
  },
}

export const norepinephrineRecommendedUnit = 'mcg/kg/min'
export const norepinephrineRecommendedUnitWhy = [
  'Unidade padrão para vasopressores em CRI.',
  'Facilita titulação por MAP e perfusão.',
]

export const norepinephrineIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.05, max: 0.5 },
    purpose: 'Choque distributivo/vasoplegia',
    note: 'Após otimização volêmica. Monitorar MAP invasiva e perfusão (lactato, diurese).',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 0.05, max: 0.5 },
    purpose: 'Choque distributivo/vasoplegia',
    note: 'Após otimização volêmica. Monitorar MAP invasiva e perfusão (lactato, diurese).',
  },
]

