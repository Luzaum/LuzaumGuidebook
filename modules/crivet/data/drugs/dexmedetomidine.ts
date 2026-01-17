import type { IndicatedDose } from '../../types/drug'

export const dexmedetomidineRecommendedUnit = 'mcg/kg/h'
export const dexmedetomidineRecommendedUnitWhy = [
  'Unidade padrão para dexmedetomidina em CRI.',
  'Facilita titulação fina da sedação/analgesia.',
  'Permite ajuste conforme resposta hemodinâmica e necessidade de sedação.',
  'Faixa típica: 0,25–2 mcg/kg/h.',
]

export const dexmedetomidineIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 0.25, max: 2.0 },
    purpose: 'Sedação/analgesia e MAC-sparing',
    note: 'Faixa típica: 0,25–2 mcg/kg/h. Iniciar baixo e titular. Monitorar PA/FC/perfusão.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 0.25, max: 2.0 },
    purpose: 'Sedação/analgesia e MAC-sparing',
    note: 'Faixa típica: 0,25–2 mcg/kg/h. Iniciar baixo, sobretudo em cardiopatas/hipotérmicos. Monitorar PA/FC/perfusão.',
  },
  // Bolus - Cão
  {
    mode: 'bolus',
    species: 'cao',
    unit: 'mcg/kg',
    range: { min: 1, max: 10 },
    purpose: 'Sedação/analgesia para procedimentos',
    note: 'IM/IV/SC. Em IV, aplicar lentamente e titular ao efeito.',
  },
  // Bolus - Gato
  {
    mode: 'bolus',
    species: 'gato',
    unit: 'mcg/kg',
    range: { min: 1, max: 10 },
    purpose: 'Sedação/analgesia para procedimentos',
    note: 'IM/IV/SC. Em IV, aplicar lentamente e titular ao efeito. Atenção à bradicardia/hipotermia/vômito.',
  },
]
