import type { IndicatedDose } from '../../types/drug'

export const methadoneRecommendedUnit = 'mg/kg'
export const methadoneRecommendedUnitWhy = [
  'Unidade padrão para metadona em bolus (IM/IV).',
  'Facilita cálculo e monitoramento da dose de analgesia.',
  'Permite ajuste fino conforme resposta à dor e monitorização respiratória.',
  'Para CRI, usar mg/kg/h conforme protocolo.',
]

export const methadoneIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão (única espécie com CRI padronizada)
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 0.05, max: 0.2 },
    purpose: 'Analgesia estável perioperatória (poupador de anestésico)',
    note: 'CRI em cães: 0,05–0,2 mg/kg/h. Usar como centro 0,1 mg/kg/h e titular conforme dor/sedação/ventilação.',
  },
  // Bolus - Cão
  {
    mode: 'bolus',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 0.5, max: 1.0 },
    purpose: 'Analgesia perioperatória (IM/IV)',
    note: 'Faixa recomendada q3–4 h. IV: titular lentamente ao efeito. Duração clínica típica: 4–6 h.',
  },
  // Bolus - Gato
  {
    mode: 'bolus',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 0.3, max: 0.5 },
    purpose: 'Analgesia perioperatória (IM/IV)',
    note: 'Faixa recomendada q4 h. Guia prático: 0,1–0,5 mg/kg IM/IV/SC com duração 4–6 h. Preferir IV/IM quando possível (SC mais variável).',
  },
]
