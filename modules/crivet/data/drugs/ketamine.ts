export type KetaminePresentation = {
  label: string
  mgPerMl: number // 50 ou 100
}

export const ketaminePresentations: KetaminePresentation[] = [
  { label: 'Cetamina 100 mg/mL (10%)', mgPerMl: 100 },
  { label: 'Cetamina 50 mg/mL (5%)', mgPerMl: 50 },
]

// Doses base (para o app mostrar e usar como defaults)
export const ketamineDoses = {
  criAnalgesia: {
    // microdose analgésica
    dog: { mcgKgMin: { min: 2, max: 10 }, mgKgH: { min: 0.12, max: 0.6 } },
    cat: { mcgKgMin: { min: 2, max: 10 }, mgKgH: { min: 0.12, max: 0.6 } },
    bolusLoadingMgKgIV: { min: 0.25, max: 0.5, note: 'IV lento antes de iniciar a bomba' },
  },
  bolusInductionRestraint: {
    dog: {
      ivMgKg: { min: 2, max: 5, note: 'Preferir associar benzodiazepínico' },
    },
    cat: {
      ivMgKg: { min: 2, max: 5, note: 'Com benzodiazepínico' },
      imMgKg: { min: 5, max: 10, note: 'Contenção química' },
    },
  },
}

// Regras de alerta por dose (para o motor do app)
export const ketamineSafetyThresholds = {
  criAnalgesiaUpperMcgKgMin: 10, // acima disso: psicomimético/disforia em acordado
  criHighRiskMcgKgMin: 20, // acima disso: sobredose provável em acordado
}

import type { IndicatedDose } from '../../types/drug'

export const ketamineIndicatedDoses: IndicatedDose[] = [
  // CRI - Analgesia (microdose)
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 2, max: 10 },
    purpose: 'Analgesia (microdose)',
  },
  // Bolus - Ataque CRI
  {
    mode: 'BOLUS',
    species: 'ambos',
    unit: 'mg/kg/min', // será convertido para mg/kg
    range: { min: 0.25, max: 0.5 },
    purpose: 'Bolus ataque CRI',
    note: 'Bolus em mg/kg IV lento (não por minuto)',
  },
  // Bolus - Indução/Contenção
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg/min', // será convertido para mg/kg
    range: { min: 2, max: 5 },
    purpose: 'Indução/Contenção',
    note: 'Bolus em mg/kg IV (preferir associar benzodiazepínico)',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg/min', // será convertido para mg/kg
    range: { min: 2, max: 5 },
    purpose: 'Indução/Contenção',
    note: 'Bolus em mg/kg IV (com benzodiazepínico) ou 5-10 mg/kg IM',
  },
]
