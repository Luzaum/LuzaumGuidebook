import type { IndicatedDose } from '../../types/drug'

export const methadoneRecommendedUnit = 'mg/kg'
export const methadoneRecommendedUnitWhy = [
  'Unidade padrão para metadona em bolus (IM/IV).',
  'Facilita cálculo e monitoramento da dose de analgesia.',
  'Permite ajuste fino conforme resposta à dor e monitorização respiratória.',
  'Para CRI, usar mg/kg/h conforme protocolo.',
]

export const methadoneIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 0.05, max: 0.2 },
    purpose: 'Analgesia estável perioperatória (poupador de anestésico)',
    note: '🔴 FISIOLOGIA: Metadona é agonista μ-opioide com meia-vida longa (~3-5 h). Em CRI (0.05-0.2 mg/kg/h), mantém concentração plasmática estável, reduzindo necessidade de anestésicos inalatórios (MAC-sparing). Metabolismo hepático extenso. 🟢 PROTOCOLO: Usar como centro 0.1 mg/kg/h e titular conforme dor, sedação e ventilação. Monitorar SpO2 e EtCO2. Redosar se necessário.',
  },
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 0.5, max: 1.0 },
    purpose: 'Analgesia perioperatória (IM/IV)',
    note: '🔴 FISIOLOGIA: Metadona em bolus (0.5-1.0 mg/kg) proporciona analgesia de longa duração (4-6 h). Pico em 30-60 min (IM) ou 5-15 min (IV). 🟢 PROTOCOLO: Faixa recomendada q3-4h. IV: titular lentamente ao efeito. IM: absorção mais lenta mas previsível. Monitorar ventilação e sedação.',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 0.3, max: 0.5 },
    purpose: 'Analgesia perioperatória (IM/IV)',
    note: '🔴 FISIOLOGIA: Gatos podem precisar de doses ligeiramente menores (0.3-0.5 mg/kg). Duração similar (4-6 h). Via SC tem absorção mais variável. 🟢 PROTOCOLO: Faixa recomendada q4h. Guia prático: 0.1-0.5 mg/kg IM/IV/SC. Preferir IV/IM quando possível (SC mais variável). Monitorar ventilação.',
  },
]
