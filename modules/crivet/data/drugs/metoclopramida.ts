import type { IndicatedDose } from '../../types/drug'

export const metoclopramidaRecommendedUnit = 'mg/kg/day'
export const metoclopramidaRecommendedUnitWhy = [
  'Prescrição de CRI de metoclopramida é tradicionalmente em mg/kg/Dia (1-2 mg/kg/dia).',
  'O app converte internamente para mg/kg/h se necessário para bomba.',
]

export const metoclopramidaIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 0.04, max: 0.08 },
    purpose: 'Pró-cinético/antiemético (CRI)',
    routine_default: '0.04 mg/kg/h',
    note: 'Equivale a 1–2 mg/kg/dia. Preferir esta modalidade para vômito persistente/parvo.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mg/kg/h',
    range: { min: 0.03, max: 0.06 },
    purpose: 'CRI conservadora (Gatos)',
    routine_default: '0.04 mg/kg/h',
    note: 'Maior risco de efeitos extrapiramidais. Monitorar tremores.',
  },
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 0.2, max: 0.5 },
    purpose: 'Antiemético (Bolus)',
    routine_default: '0.3 mg/kg',
    note: 'q8h. Bloquear se obstrução.',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 0.2, max: 0.4 },
    purpose: 'Antiemético (Bolus)',
    routine_default: '0.2 mg/kg',
    note: 'q8h. Bloquear se obstrução.',
  },
]
