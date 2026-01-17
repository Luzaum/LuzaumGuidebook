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
    note: '🔴 FISIOLOGIA: Dexmedetomidina é agonista α2-adrenérgico seletivo. Em CRI (0.25-2 mcg/kg/h), proporciona sedação, analgesia e redução de MAC. Efeitos: bradicardia, vasoconstrição periférica, redução de secreções. Metabolismo hepático. 🟢 PROTOCOLO: Iniciar baixo (0.25-0.5 mcg/kg/h) e titular. Monitorar PA, FC, perfusão periférica. Evitar em cardiopatas graves ou hipotensão não corrigida.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 0.25, max: 2.0 },
    purpose: 'Sedação/analgesia e MAC-sparing',
    note: '🔴 FISIOLOGIA: Gatos podem ser mais sensíveis, especialmente cardiopatas e hipotérmicos. Efeitos similares: sedação, analgesia, bradicardia, vasoconstrição. 🟢 PROTOCOLO: Iniciar muito baixo (0.25 mcg/kg/h), sobretudo em cardiopatas/hipotérmicos. Titular com cautela. Monitorar PA, FC, perfusão. Atenção à bradicardia severa.',
  },
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mcg/kg/h', // Será tratado como mcg/kg para bolus
    range: { min: 1, max: 10 },
    purpose: 'Sedação/analgesia para procedimentos',
    note: '🔴 FISIOLOGIA: Bolus IM/IV/SC (1-10 mcg/kg) proporciona sedação e analgesia de curta duração. Via IV tem início mais rápido. Efeitos: sedação, analgesia, bradicardia, vasoconstrição. 🟢 PROTOCOLO: IM/IV/SC. Em IV, aplicar lentamente e titular ao efeito. Monitorar PA, FC, perfusão. Ter atipamezol disponível se necessário.',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mcg/kg/h', // Será tratado como mcg/kg para bolus
    range: { min: 1, max: 10 },
    purpose: 'Sedação/analgesia para procedimentos',
    note: '🔴 FISIOLOGIA: Gatos podem ter resposta mais variável. Efeitos similares: sedação, analgesia, bradicardia, vasoconstrição, hipotermia. Risco de vômito. 🟢 PROTOCOLO: IM/IV/SC. Em IV, aplicar muito lentamente e titular ao efeito. Atenção à bradicardia, hipotermia e vômito. Monitorar PA, FC, perfusão. Ter atipamezol disponível.',
  },
]
