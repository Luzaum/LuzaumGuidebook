export const fentanylPresentations = [
  { label: 'Fentanil 50 mcg/mL (0,05 mg/mL) — padrão', mcgPerMl: 50, mgPerMl: 0.05 },
]

export const fentanylDoses = {
  dog: {
    bolusLoading: { min: 3, max: 5, unit: 'mcg/kg' as const },
    criAnalgesia: { min: 3, max: 7, unit: 'mcg/kg/h' as const },
    criAnesthesia: { min: 10, max: 20, unit: 'mcg/kg/h' as const },
    criPrimaryAgent: { min: 5, max: 40, unit: 'mcg/kg/h' as const }, // Agente primário em cães graves
  },
  cat: {
    bolusLoading: { min: 2, max: 5, unit: 'mcg/kg' as const },
    criAnalgesia: { min: 3, max: 7, unit: 'mcg/kg/h' as const },
    criAnesthesia: { min: 5, max: 10, unit: 'mcg/kg/h' as const },
  },
}

// Sistema de unidade recomendada (sem bloqueios)
export const fentanylRecommendedUnit = 'mcg/kg/h'
export const fentanylRecommendedUnitWhy = [
  'É a forma mais usada para CRI de fentanil em UTI e pós-operatório (padrão em hora).',
  'Reduz erro de 60× (quando alguém confunde min vs h).',
  'Reduz erro de 1000× (mcg vs mg), porque o fentanil comercial é 50 mcg/mL.',
]

import type { IndicatedDose } from '../../types/drug'

export const fentanylIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão - Analgesia/UTI
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 2, max: 5 },
    purpose: 'Analgesia/UTI',
    note: '🔴 FISIOLOGIA: Fentanil é agonista μ-opioide puro, 100x mais potente que morfina. Em doses baixas (2-5 mcg/kg/h), proporciona analgesia eficaz com menor risco de depressão respiratória. Meia-vida curta (~30-60 min) permite ajuste rápido. 🟢 PROTOCOLO: Iniciar em 2-3 mcg/kg/h e titular conforme escala de dor. Monitorar SpO2 e EtCO2. Redosar se necessário.',
  },
  // CRI - Cão - Anestesia
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/h',
    range: { min: 10, max: 20 },
    purpose: 'Anestesia (ventilado)',
    note: '🔴 FISIOLOGIA: Doses altas (10-20 mcg/kg/h) proporcionam analgesia intensa e redução significativa de MAC (anestesia-sparing). Depressão respiratória é dose-dependente e esperada. 🟢 PROTOCOLO: Apenas em pacientes intubados e ventilados. Monitorar PA, FC, EtCO2 e profundidade anestésica. Associar com anestésicos inalatórios ou propofol.',
  },
  // CRI - Gato - Analgesia
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 1, max: 4 },
    purpose: 'Analgesia',
    note: '🔴 FISIOLOGIA: Gatos podem ser mais sensíveis a opioides. Doses menores (1-4 mcg/kg/h) são geralmente suficientes para analgesia. Meia-vida pode ser mais longa em gatos. 🟢 PROTOCOLO: Iniciar em 1-2 mcg/kg/h e titular conforme resposta. Monitorar ventilação e sedação. Evitar doses altas sem necessidade.',
  },
  // CRI - Gato - Anestesia
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/h',
    range: { min: 5, max: 10 },
    purpose: 'Anestesia',
    note: '🔴 FISIOLOGIA: Doses anestésicas em gatos (5-10 mcg/kg/h) proporcionam redução de MAC e analgesia. Cautela com depressão respiratória e bradicardia. 🟢 PROTOCOLO: Apenas em pacientes intubados e ventilados. Monitorar PA, FC, EtCO2. Associar com anestésicos inalatórios ou propofol.',
  },
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mcg/kg/h', // Será tratado como mcg/kg para bolus
    range: { min: 2, max: 5 },
    purpose: 'Bolus ataque',
    note: '🔴 FISIOLOGIA: Bolus IV de fentanil (2-5 mcg/kg) proporciona início rápido de analgesia. Pico em 2-5 min. Duração ~30-60 min. 🟢 PROTOCOLO: Administrar IV lento (1-2 min) para reduzir risco de apneia. Monitorar ventilação. Pode ser seguido de CRI para manutenção.',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mcg/kg/h', // Será tratado como mcg/kg para bolus
    range: { min: 1, max: 2 },
    purpose: 'Bolus ataque',
    note: '🔴 FISIOLOGIA: Gatos são mais sensíveis. Bolus menores (1-2 mcg/kg) são suficientes. Risco de apneia e sedação profunda. 🟢 PROTOCOLO: Administrar IV muito lento (2-3 min). Monitorar ventilação rigorosamente. Ter suporte ventilatório disponível.',
  },
]
