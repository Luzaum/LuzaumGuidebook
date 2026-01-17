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
    note: '🔴 FISIOLOGIA: Propofol é anestésico hipnótico que atua via modulação GABA. Em CRI (6-30 mg/kg/h = 0.1-0.5 mg/kg/min), mantém anestesia estável. Metabolismo hepático rápido permite despertar rápido. Em associações (fentanil/cetamina), doses menores (6-18 mg/kg/h) são suficientes. 🟢 PROTOCOLO: Sempre associar analgesia (opioide). Monitorar PA, FC, EtCO2. Titular conforme profundidade anestésica. Evitar infusões prolongadas sem monitoramento.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mg/kg/h',
    range: { min: 12, max: 60 },
    purpose: 'Manutenção de anestesia (TIVA)',
    note: '🔴 FISIOLOGIA: Gatos podem precisar de doses maiores (12-60 mg/kg/h = 0.2-1.0 mg/kg/min) devido a diferenças farmacocinéticas. Meia-vida pode ser mais longa em infusões prolongadas. Gatos anêmicos têm risco aumentado de toxicidade (oxidação de hemoglobina). 🟢 PROTOCOLO: Iniciar em 12-18 mg/kg/h e titular. Evitar repetição/prolongamento em gatos anêmicos. Monitorar cor da mucosa e hemoglobina. Sempre associar analgesia.',
  },
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 1, max: 6 },
    purpose: 'Indução de anestesia',
    note: '🔴 FISIOLOGIA: Propofol causa depressão cardiovascular e respiratória dose-dependente. Administração lenta reduz apneia e hipotensão. 🟢 PROTOCOLO: Titrar em bolus incrementais lentos (0.5-1 mg/kg por vez) até intubação. Administrar lentamente (~60-90 s). Ter suporte ventilatório disponível. Monitorar PA e SpO2.',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 1, max: 10 },
    purpose: 'Indução de anestesia',
    note: '🔴 FISIOLOGIA: Gatos têm faixa ampla (1-10 mg/kg) dependendo de estado clínico e premedicação. Doentes/premedicados precisam de menos. Risco de toxicidade em anêmicos. 🟢 PROTOCOLO: Titrar lentamente ao efeito. Em doente/premedicado, frequentemente 2-5 mg/kg é suficiente. Evitar repetição em gatos anêmicos. Monitorar cor da mucosa.',
  },
]
