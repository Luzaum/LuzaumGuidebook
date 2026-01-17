import type { IndicatedDose } from '../../types/drug'

// Sistema de unidade recomendada
export const maropitantRecommendedUnit = 'mg/kg/h'
export const maropitantRecommendedUnitWhy = [
  'Unidade padrão para CRI de maropitant em uso prolongado.',
  'Facilita cálculo de infusão contínua (0.05-0.1 mg/kg/h).',
  'Evita confusão entre bolus (mg/kg) e CRI (mg/kg/h).',
  'Padrão para antieméticos em infusão contínua.',
]

export const maropitantIndicatedDoses: IndicatedDose[] = [
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 1, max: 1 },
    purpose: 'Antiemético padrão',
    note: '🔴 FISIOLOGIA: Maropitant bloqueia o receptor NK-1 (substância P) no centro do vômito (área postrema e NTS), inibindo tanto o estímulo central quanto periférico. 🟢 PROTOCOLO: Administrar 1 mg/kg por via SC (preferível) ou IV lento. Duração de efeito ~24h. Evitar IM em gatos (dor local significativa).',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 1, max: 1 },
    purpose: 'Antiemético padrão',
    note: '🔴 FISIOLOGIA: Gatos apresentam meia-vida mais curta e maior sensibilidade local à injeção. Via IV lenta é preferível para evitar dor. 🟢 PROTOCOLO: Administrar 1 mg/kg por via IV lenta. NUNCA usar IM/SC em gatos devido à dor local intensa. Duração ~24h.',
  },
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 0.05, max: 0.1 },
    purpose: 'Antiemético contínuo',
    note: '🔴 FISIOLOGIA: CRI de maropitant mantém concentração plasmática estável, útil em casos de vômitos persistentes ou prevenção perioperatória prolongada. Metabolismo hepático requer monitoramento em uso prolongado. 🟢 PROTOCOLO: Iniciar em 0.05 mg/kg/h e ajustar conforme resposta clínica. Máximo 0.1 mg/kg/h. Monitorar função hepática em uso >48h.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mg/kg/h',
    range: { min: 0.05, max: 0.1 },
    purpose: 'Antiemético contínuo',
    note: '🔴 FISIOLOGIA: CRI em gatos mantém efeito antiemético sem necessidade de redosagem frequente. Cautela em hepatopatas devido ao metabolismo hepático. 🟢 PROTOCOLO: Iniciar em 0.05 mg/kg/h. Manter dose mínima eficaz. Evitar uso prolongado (>48h) sem monitoramento hepático.',
  },
]
