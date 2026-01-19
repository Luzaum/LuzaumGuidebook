import type { IndicatedDose } from '../../types/drug'

export const dexmedetomidineRecommendedUnit = 'mcg/kg/h'
export const dexmedetomidineRecommendedUnitWhy = [
  'Padrão em CRI para alfa-2; titulação suave com menor risco de erro.',
]

export const dexmedetomidineIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 0.25, max: 1.0 },
    purpose: 'Sedação/analgesia (CRI comum)',
    routine_default: '0.5 mcg/kg/h',
    note: 'Doses acima disso: deixar como preset avançado se houver suporte. Monitorar PA/FC.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 0.25, max: 1.0 },
    purpose: 'Sedação/analgesia',
    routine_default: '0.5 mcg/kg/h',
    note: 'Gatos podem ser mais sensíveis, especialmente cardiopatas. Monitorar bradicardia.',
  },
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mcg/kg',
    range: { min: 1, max: 10 },
    purpose: 'Sedação/analgesia procedimento',
    routine_default: '1 mcg/kg',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mcg/kg',
    range: { min: 1, max: 10 },
    purpose: 'Sedação/analgesia procedimento',
    routine_default: '1 mcg/kg',
  },
]
