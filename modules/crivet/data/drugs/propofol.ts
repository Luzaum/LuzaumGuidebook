import type { IndicatedDose } from '../../types/drug'

export const propofolRecommendedUnit = 'mg/kg/h'
export const propofolRecommendedUnitWhy = [
  'Unidade padrão para propofol em CRI/TIVA.',
  'Facilita cálculo e monitoramento da taxa de infusão.',
  'Permite ajuste fino conforme profundidade anestésica e resposta hemodinâmica.',
  'Faixa típica: 6–30 mg/kg/h (cães) e 12–60 mg/kg/h (gatos).',
]

export const propofolIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 6, max: 30 },
    purpose: 'Manutenção de anestesia (TIVA)',
    note: 'Expresso como 0,1–0,5 mg/kg/min. Para TIVA com associações (ex.: fentanyl/ketamina), pode ser suficiente 6–18 mg/kg/h. Sempre associar analgesia.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mg/kg/h',
    range: { min: 12, max: 60 },
    purpose: 'Manutenção de anestesia (TIVA)',
    note: 'Expresso como 0,2–1,0 mg/kg/min. Gatos podem ter meia-vida mais longa (especialmente em infusões prolongadas). Evitar repetição/prolongamento em gatos anêmicos.',
  },
  // Bolus - Cão
  {
    mode: 'bolus',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 1, max: 6 },
    purpose: 'Indução de anestesia',
    note: 'Titrar em bolus incrementais lentos (0,5–1 mg/kg por vez) até intubação. Administrar lentamente (~60–90 s) para reduzir apneia/hipotensão.',
  },
  // Bolus - Gato
  {
    mode: 'bolus',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 1, max: 10 },
    purpose: 'Indução de anestesia',
    note: 'Titrar lentamente ao efeito. Faixa ampla: 5–10 mg/kg IV; em doente/premedicado frequentemente menos. Evitar repetição em gatos anêmicos.',
  },
]
