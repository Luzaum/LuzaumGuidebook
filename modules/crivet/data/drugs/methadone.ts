import type { IndicatedDose } from '../../types/drug'

export const methadoneRecommendedUnit = 'mg/kg/h'
export const methadoneRecommendedUnitWhy = [
  'Monógrafo traz CRI em mg/kg/h com receita prática (mg em 500 mL).',
  'Combina com preparo de rotina e evita erros de conversão.',
]

export const methadoneIndicatedDoses: IndicatedDose[] = [
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 0.1, max: 1.0 },
    purpose: 'Analgesia/intermitente',
    routine_default: '0.2 mg/kg',
    note: 'IV/IM/SC a cada 4–8 h. Início rápido IV.',
  },
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 0.1, max: 0.12 }, // Faixa estreita baseada na referência
    purpose: 'Analgesia (CRI)',
    routine_default: '0.12 mg/kg/h',
    note: 'LD 0.1–0.2 mg/kg IV antes. Pode ser combinado com cetamina e/ou lidocaína.',
  },
]
