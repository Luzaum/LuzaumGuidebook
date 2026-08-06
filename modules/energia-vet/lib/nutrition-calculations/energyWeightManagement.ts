import { DOG_METABOLIC_EXPONENT, CAT_METABOLIC_EXPONENT, coefficientBetween } from './units'
import type {
  EnergyCalculationResult,
  EnergyVerificationReference,
  NutritionPatientAssessment,
  Species,
  WeightLossEnergyMethod,
} from './types'
import { getSourceLabel } from './sourceRegistry'
import { calculateRerAllometric } from './energyRer'
import { estimateTargetWeight } from './bodyComposition'

export type { WeightLossEnergyMethod }

export function calculateDogWeightLossAaha(idealWeightKg: number): { kcal: number; min: number; max: number } {
  const mean = 63 * Math.pow(idealWeightKg, DOG_METABOLIC_EXPONENT)
  const sd = 10.2 * Math.pow(idealWeightKg, DOG_METABOLIC_EXPONENT * 0.1)
  return { kcal: mean, min: mean - sd, max: mean + sd }
}

export function calculateCatWeightLossAaha(idealWeightKg: number): { kcal: number; min: number; max: number } {
  const mean = 52 * Math.pow(idealWeightKg, 0.711)
  const sd = 4.9 * Math.pow(idealWeightKg, 0.05)
  return { kcal: mean, min: mean - sd, max: mean + sd }
}

/** Referência de conferência (Applied Vet Clinical Nutrition) — não substitui a meta prescrita. */
export function buildWeightLossVerificationReference(
  species: Species,
  idealWeightKg: number,
): EnergyVerificationReference {
  const rerIdeal = calculateRerAllometric(idealWeightKg)
  const factor = species === 'cat' ? 0.8 : 1
  const kcal = rerIdeal * factor
  return {
    kcalDay: kcal,
    methodSummary:
      species === 'cat'
        ? `Conferência: RER no peso ideal × 0,8 = ${kcal.toFixed(0)} kcal/dia (Applied Vet Clinical Nutrition).`
        : `Conferência: RER no peso ideal × 1,0 = ${kcal.toFixed(0)} kcal/dia (Applied Vet Clinical Nutrition).`,
    sourceLabel: getSourceLabel('avcn2024'),
  }
}

export function calculateWeightLossEnergy(
  assessment: NutritionPatientAssessment,
  idealWeightKg: number,
): EnergyCalculationResult & { method: WeightLossEnergyMethod } {
  const rerCurrent = calculateRerAllometric(assessment.currentWeightKg)
  const h = assessment.currentDietHistory
  const verificationReference = buildWeightLossVerificationReference(assessment.species, idealWeightKg)

  if (h?.reliable && h.weightStable && assessment.bodyConditionScore9 >= 6) {
    const observed =
      h.foods.reduce((s, f) => s + f.kcalPerDay, 0) +
      h.treatsKcalPerDay +
      h.chewsKcalPerDay +
      h.medicationVehicleKcalPerDay +
      h.supplementsKcalPerDay
    const target = observed * 0.8
    return {
      rerKcalDay: rerCurrent,
      estimatedRangeKcalDay: { minimum: target * 0.9, maximum: target * 1.1 },
      selectedTargetKcalDay: target,
      weightBasis: 'ideal_weight',
      weightUsedKg: idealWeightKg,
      clinicalProfileLabel: 'Perda de peso — histórico alimentar',
      confidence: 'high',
      requiresMonitoring: true,
      methodSummary: `80% da ingestão estável documentada (${observed.toFixed(0)} kcal/dia → ${target.toFixed(0)} kcal/dia). Reavaliar em 2–4 semanas.`,
      sourceLabel: getSourceLabel('aaha2021'),
      energyMethod: 'observed_history',
      verificationReference,
      method: 'observed_history',
    }
  }

  const aaha =
    assessment.species === 'cat'
      ? calculateCatWeightLossAaha(idealWeightKg)
      : calculateDogWeightLossAaha(idealWeightKg)

  return {
    rerKcalDay: rerCurrent,
    estimatedRangeKcalDay: { minimum: aaha.min, maximum: aaha.max },
    selectedTargetKcalDay: aaha.kcal,
    weightBasis: 'ideal_weight',
    weightUsedKg: idealWeightKg,
    clinicalProfileLabel: 'Perda de peso — AAHA 2021',
    confidence: 'moderate',
    requiresMonitoring: true,
    methodSummary:
      assessment.species === 'cat'
        ? `Fallback AAHA: 52 kcal/kg^0,711 no peso ideal (${idealWeightKg.toFixed(2)} kg). Reavaliar em 2–4 semanas.`
        : `Fallback AAHA: 63 kcal/kg^0,75 no peso ideal (${idealWeightKg.toFixed(2)} kg). Reavaliar em 2–4 semanas.`,
    sourceLabel: getSourceLabel('aaha2021'),
    energyMethod: 'aaha2021',
    verificationReference,
    method: 'aaha2021',
  }
}

export function calculateWeightGainEnergy(
  assessment: NutritionPatientAssessment,
  targetWeightKg: number,
): EnergyCalculationResult {
  const rer = calculateRerAllometric(assessment.currentWeightKg)
  const h = assessment.currentDietHistory
  let target: number
  let summary: string
  let confidence: EnergyCalculationResult['confidence'] = 'moderate'

  if (h?.reliable && h.daysRecorded >= 3) {
    const observed =
      h.foods.reduce((s, f) => s + f.kcalPerDay, 0) +
      h.treatsKcalPerDay +
      h.chewsKcalPerDay +
      h.medicationVehicleKcalPerDay +
      h.supplementsKcalPerDay
    const factor = coefficientBetween(1.1, 1.2, 'low')
    target = observed * factor
    summary = `${(factor * 100).toFixed(0)}% da ingestão atual documentada. Reavaliar em 2–4 semanas.`
    confidence = 'high'
  } else {
    const factor = coefficientBetween(1.2, 1.4, 'low')
    target = calculateRerAllometric(targetWeightKg) * factor
    summary = `${factor.toFixed(2)} × RER no peso-alvo. Reavaliar em 2–4 semanas.`
  }

  return {
    rerKcalDay: rer,
    estimatedRangeKcalDay: { minimum: target * 0.9, maximum: target * 1.15 },
    selectedTargetKcalDay: target,
    weightBasis: 'ideal_weight',
    weightUsedKg: targetWeightKg,
    clinicalProfileLabel: 'Recuperação de peso',
    confidence,
    requiresMonitoring: true,
    methodSummary: summary,
    sourceLabel: getSourceLabel('avcn2024'),
  }
}

export function adjustWeightLossCalories(options: {
  currentCalories: number
  weightLossTooFast: boolean
  weightLossTooSlow: boolean
  adherenceConfirmed: boolean
}): { newCalories: number; adjustment: string } | null {
  if (options.weightLossTooFast) {
    return {
      newCalories: options.currentCalories * 1.1,
      adjustment: 'Aumento de 10% — perda ponderal acelerada demais.',
    }
  }
  if (options.weightLossTooSlow && options.adherenceConfirmed) {
    return {
      newCalories: options.currentCalories * 0.85,
      adjustment: 'Redução de 15% — perda insuficiente com adesão confirmada.',
    }
  }
  return null
}

export function resolveWeightManagementEnergy(
  assessment: NutritionPatientAssessment,
): EnergyCalculationResult {
  const previousHealthy =
    assessment.previousWeights?.[0]?.weightKg ?? undefined

  const ideal = estimateTargetWeight({
    species: assessment.species,
    currentWeightKg: assessment.currentWeightKg,
    bcs: assessment.bodyConditionScore9,
    goal: assessment.nutritionalGoal === 'weight_gain' ? 'weight_gain' : 'weight_loss',
    muscleCondition: assessment.muscleCondition,
    clinicianTargetWeightKg: assessment.clinicianTargetWeightKg,
    previousHealthyWeightKg: previousHealthy,
  })

  if (assessment.nutritionalGoal === 'weight_gain') {
    return calculateWeightGainEnergy(assessment, ideal.targetWeightKg)
  }
  return calculateWeightLossEnergy(assessment, ideal.targetWeightKg)
}

export const WEEKLY_WEIGHT_LOSS_TARGET = {
  dog: { min: 1, max: 2 },
  cat: { min: 0.5, max: 1 },
} as const satisfies Record<Species, { min: number; max: number }>
