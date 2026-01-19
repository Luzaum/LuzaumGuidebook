import type { IndicatedDose } from '../../types/drug'

// Sistema de unidade recomendada
export const ephedrineRecommendedUnit = 'mg/kg'
export const ephedrineRecommendedUnitWhy = [
  'Na rotina anestésica, é usada predominantemente em bolus IV incremental para hipotensão; CRI existe, mas é menos comum.',
]

export const ephedrineIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 0.1, max: 0.25 },
    purpose: 'Hipotensão associada à anestesia',
    routine_default: '0.1 mg/kg',
    note: 'IV incremental, titulando PA. Duração ~15–60 min.',
  },
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 5, max: 10 },
    purpose: 'Hipotensão associada à anestesia',
    routine_default: '5 mcg/kg/min',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 0.15, max: 0.25 },
    purpose: 'Hipotensão associada à anestesia',
    routine_default: '0.15 mg/kg',
    note: 'Diluído e em bolus incremental IV.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 5, max: 10 },
    purpose: 'Hipotensão associada à anestesia',
    routine_default: '5 mcg/kg/min',
  },
]
