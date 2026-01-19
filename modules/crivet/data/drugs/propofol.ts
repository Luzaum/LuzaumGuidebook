import type { IndicatedDose } from '../../types/drug'

export const propofolRecommendedUnit = 'mg/kg/h'
export const propofolRecommendedUnitWhy = [
  'Mais intuitivo para TIVA/manutenção; o livro também traz em mcg/kg/min e o app pode mostrar equivalência.',
]

export const propofolIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 6, max: 24 },
    purpose: 'TIVA/manutenção (CRI)',
    routine_default: '12 mg/kg/h',
    note: '0.1–0.4 mg/kg/min. Titular ao efeito. Reduzir se associado a opioides/adjuvantes.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mg/kg/h',
    range: { min: 6, max: 18 },
    purpose: 'TIVA (curta duração)',
    routine_default: '9 mg/kg/h',
    note: '0.1–0.3 mg/kg/min. Evitar infusões >60 min (recuperação lenta/risco oxidativo).',
  },
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 2, max: 6 },
    purpose: 'Indução anestésica',
    routine_default: '4 mg/kg',
    note: 'Titular até efeito. Pode ser menor com pré-medicação.',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 2, max: 8 },
    purpose: 'Indução anestésica',
    routine_default: '4 mg/kg',
  },
]
