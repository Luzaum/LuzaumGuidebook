import type { IndicatedDose } from '../../types/drug'

export const dobutaminePresentations = [
  { label: 'Dobutamina 12,5 mg/mL (padrão)', mgPerMl: 12.5 },
]

export const dobutamineDoses = {
  dog: {
    criStart: { min: 1, max: 1, unit: 'mcg/kg/min' as const },
    criUsual: { min: 5, max: 20, unit: 'mcg/kg/min' as const },
    criMax: { max: 20, unit: 'mcg/kg/min' as const },
  },
  cat: {
    criStart: { min: 1, max: 1, unit: 'mcg/kg/min' as const },
    criUsual: { min: 1, max: 10, unit: 'mcg/kg/min' as const },
    criMax: { max: 10, unit: 'mcg/kg/min' as const },
    alert: 'Em doses altas pode causar tremores/convulsões; titular com cautela e ECG contínuo.',
  },
}

export const dobutamineRecommendedUnit = 'mcg/kg/min'
export const dobutamineRecommendedUnitWhy = [
  'Unidade padrão para inotrópicos em CRI.',
  'Facilita titulação e monitoramento da resposta hemodinâmica.',
]

export const dobutamineIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 1, max: 20 },
    purpose: 'Suporte inotrópico',
    note: 'Iniciar em 1 µg/kg/min e titular conforme resposta a cada 15–30 min',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 1, max: 10 },
    purpose: 'Suporte inotrópico',
    note: 'Teto de referência: 10 µg/kg/min. Em doses altas pode causar tremores/convulsões.',
  },
]

