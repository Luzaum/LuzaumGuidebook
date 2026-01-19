export type KetaminePresentation = {
  label: string
  mgPerMl: number // 50 ou 100
}

export const ketaminePresentations: KetaminePresentation[] = [
  { label: 'Cetamina 100 mg/mL (10%) — Dopalen/Vetaset/Cetamin', mgPerMl: 100 },
  { label: 'Cetamina 50 mg/mL (5%)', mgPerMl: 50 },
]

// Doses base (para o app mostrar e usar como defaults)
export const ketamineDoses = {
  criAnalgesia: {
    // microdose analgésica
    dog: { mcgKgMin: { min: 2, max: 10 }, mgKgH: { min: 0.12, max: 0.6 } },
    cat: { mcgKgMin: { min: 2, max: 10 }, mgKgH: { min: 0.12, max: 0.6 } },
    bolusLoadingMgKgIV: {
      min: 0.25,
      max: 0.5,
      note: 'IV lento (2–3 min) antes de iniciar a bomba',
    },
  },
  criTiva: {
    // TIVA (sempre associado)
    dog: { mcgKgMin: { min: 10, max: 50 } },
    cat: { mcgKgMin: { min: 10, max: 50 } },
    note: 'Nunca isolado: exigir benzo + opioide e via aérea protegida',
  },
  bolusInductionRestraint: {
    dog: {
      ivMgKg: { min: 2, max: 5, note: 'Preferir associar benzodiazepínico' },
    },
    cat: {
      ivMgKg: { min: 2, max: 5, note: 'Sempre associado a benzodiazepínico' },
      imMgKg: { min: 5, max: 10, note: 'Contenção química; monitorar recuperação' },
    },
  },
}

// Regras de alerta por dose (para o motor do app)
export const ketamineSafetyThresholds = {
  criAnalgesiaUpperMcgKgMin: 10, // acima disso: psicomimético/disforia em acordado
  criHighRiskMcgKgMin: 20, // acima disso: sobredose provável em acordado
}

// Sistema de unidade recomendada (sem bloqueios)
export const ketamineRecommendedUnit = 'mg/kg/h'
export const ketamineRecommendedUnitWhy = [
  'Em tabelas de CRI e na prática, mg/kg/h é menos propenso a erro do que mcg/kg/min; o app pode exibir equivalência.',
]

import type { IndicatedDose } from '../../types/drug'

export const ketamineIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 0.1, max: 1.0 },
    purpose: 'Analgesia/anti-hiperalgesia (CRI comum)',
    routine_default: '0.3 mg/kg/h',
    note: 'Equivalente: ~1.7–16.7 mcg/kg/min.',
  },
  // Mantendo versões em mcg/kg/min para suporte legado/TIVA alta se necessário, mas convertendo para mg/kg/h onde possível
  {
    mode: 'CRI',
    species: 'ambos', // Mantendo para compatibilidade
    unit: 'mg/kg/h',
    range: { min: 0.1, max: 1.0 },
    purpose: 'Analgesia (microdose)',
    routine_default: '0.3 mg/kg/h',
  },
  {
    mode: 'CRI',
    species: 'ambos',
    unit: 'mcg/kg/min',
    range: { min: 10, max: 50 }, // TIVA alta mantida
    purpose: 'TIVA (associado)',
    note: 'Doses anestésicas. Nunca usar isolado; associar benzo + opioide e monitorar via aérea',
  },
  // Bolus - Ataque
  {
    mode: 'BOLUS',
    species: 'ambos',
    unit: 'mg/kg',
    range: { min: 0.25, max: 0.5 },
    purpose: 'Bolus ataque CRI',
    routine_default: '0.5 mg/kg',
    note: 'IV lento (2–3 min)',
  },
  // Bolus - Indução/Contenção
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 2, max: 5 },
    purpose: 'Indução/Contenção',
    note: 'IV (preferir associar benzodiazepínico)',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 2, max: 5 }, // IV
    purpose: 'Indução/Contenção',
    note: 'IV (sempre com benzo) ou 5–10 mg/kg IM',
  },
]
