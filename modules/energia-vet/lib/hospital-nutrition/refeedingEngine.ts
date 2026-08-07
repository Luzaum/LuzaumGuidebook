export type RefeedingRiskLevel = 'low' | 'moderate' | 'high'

export interface RefeedingRiskInput {
  currentWeightKg: number
  previousWeightKg?: number
  bcs: number
  muscleCondition: string
  daysAnorexia: number
  daysHyporexia: number
  recentIntakePercent: number
  phosphorusLow: boolean
  potassiumLow: boolean
  magnesiumLow: boolean
  glucoseLow?: boolean
  onParenteralNutrition?: boolean
  hepaticLipidosisRisk?: boolean
  criticalIllness?: boolean
}

export interface RefeedingProgressionStep {
  day: number
  percentRer: number
  kcalTarget: number
  requiresClinicalReview: boolean
}

export function classifyRefeedingRisk(input: RefeedingRiskInput): RefeedingRiskLevel {
  let risk: RefeedingRiskLevel = 'low'

  const weightLossPct =
    input.previousWeightKg != null && input.previousWeightKg > 0
      ? ((input.previousWeightKg - input.currentWeightKg) / input.previousWeightKg) * 100
      : 0

  if (
    input.phosphorusLow ||
    input.potassiumLow ||
    input.magnesiumLow ||
    weightLossPct >= 10 ||
    (input.daysAnorexia >= 3 && input.bcs <= 3) ||
    input.hepaticLipidosisRisk
  ) {
    risk = 'high'
  } else if (
    input.daysAnorexia >= 3 ||
    input.daysHyporexia >= 5 ||
    input.recentIntakePercent <= 25 ||
    weightLossPct >= 5
  ) {
    risk = 'moderate'
  }

  if (input.onParenteralNutrition && input.daysAnorexia >= 3) risk = 'high'
  if (input.criticalIllness && risk === 'low') risk = 'moderate'

  return risk
}

export function buildRefeedingProgression(
  rerKcal: number,
  risk: RefeedingRiskLevel,
  model: '50-75-100' | '33-66-100' | 'high_risk_gradual',
): RefeedingProgressionStep[] {
  if (risk === 'high' || model === 'high_risk_gradual') {
    return [
      { day: 1, percentRer: 20, kcalTarget: rerKcal * 0.2, requiresClinicalReview: true },
      { day: 2, percentRer: 30, kcalTarget: rerKcal * 0.3, requiresClinicalReview: true },
      { day: 3, percentRer: 40, kcalTarget: rerKcal * 0.4, requiresClinicalReview: true },
      { day: 4, percentRer: 50, kcalTarget: rerKcal * 0.5, requiresClinicalReview: true },
      { day: 5, percentRer: 65, kcalTarget: rerKcal * 0.65, requiresClinicalReview: true },
      { day: 6, percentRer: 80, kcalTarget: rerKcal * 0.8, requiresClinicalReview: true },
      { day: 7, percentRer: 100, kcalTarget: rerKcal, requiresClinicalReview: true },
    ]
  }
  if (model === '50-75-100') {
    return [
      { day: 1, percentRer: 50, kcalTarget: rerKcal * 0.5, requiresClinicalReview: false },
      { day: 2, percentRer: 75, kcalTarget: rerKcal * 0.75, requiresClinicalReview: true },
      { day: 3, percentRer: 100, kcalTarget: rerKcal, requiresClinicalReview: true },
    ]
  }
  return [
    { day: 1, percentRer: 33, kcalTarget: rerKcal * 0.33, requiresClinicalReview: false },
    { day: 2, percentRer: 66, kcalTarget: rerKcal * 0.66, requiresClinicalReview: true },
    { day: 3, percentRer: 100, kcalTarget: rerKcal, requiresClinicalReview: true },
  ]
}

export function canAdvanceRefeeding(options: {
  electrolytesAcceptable: boolean
  glucoseAcceptable: boolean
  noFluidOverload: boolean
  noNewCardiorespiratorySigns: boolean
  feedingTolerated: boolean
}): boolean {
  return (
    options.electrolytesAcceptable &&
    options.glucoseAcceptable &&
    options.noFluidOverload &&
    options.noNewCardiorespiratorySigns &&
    options.feedingTolerated
  )
}

export const REFEEDING_CLINICIAN_ALERTS = [
  'Corrigir distúrbios hidroeletrolíticos antes ou durante o início do suporte.',
  'Considerar tiamina antes da alimentação em paciente de alto risco.',
  'Monitorar fósforo, potássio, magnésio e glicose diariamente.',
  'Não avançar a meta calórica se houver piora clínica ou metabólica.',
] as const
