import { DOG_METABOLIC_EXPONENT, CAT_METABOLIC_EXPONENT, coefficientBetween } from './units'
import type { EnergyCalculationResult, NutritionPatientAssessment, Species } from './types'
import { getSourceLabel } from './sourceRegistry'
import { calculateRerAllometric } from './energyRer'
import { estimateTargetWeight } from './bodyComposition'

export type WeightLossMethod = 'observed_history' | 'aaha2021' | 'rer_ideal_fallback'

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

export function calculateWeightLossEnergy(
  assessment: NutritionPatientAssessment,
  idealWeightKg: number,
): EnergyCalculationResult & { method: WeightLossMethod } {
  const rerCurrent = calculateRerAllometric(assessment.currentWeightKg)
  const h = assessment.currentDietHistory

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
      methodSummary: '80% da ingestão estável documentada.',
      sourceLabel: getSourceLabel('aaha2021'),
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
        ? '52 kcal/kg^0,711 no peso ideal (faixa AAHA).'
        : '63 kcal/kg^0,75 no peso ideal (faixa AAHA).',
    sourceLabel: getSourceLabel('aaha2021'),
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
    summary = `${(factor * 100).toFixed(0)}% da ingestão atual documentada.`
    confidence = 'high'
  } else {
    const factor = coefficientBetween(1.2, 1.4, 'low')
    target = calculateRerAllometric(targetWeightKg) * factor
    summary = `${factor.toFixed(2)} × RER no peso-alvo.`
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
  const ideal = estimateTargetWeight({
    species: assessment.species,
    currentWeightKg: assessment.currentWeightKg,
    bcs: assessment.bodyConditionScore9,
    goal: assessment.nutritionalGoal === 'weight_gain' ? 'weight_gain' : 'weight_loss',
    clinicianTargetWeightKg: assessment.clinicianTargetWeightKg,
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
