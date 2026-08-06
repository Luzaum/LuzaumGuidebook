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
import { estimateTargetWeight, inferClinicalRiskFlags } from './bodyComposition'

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
        ? `Referência alternativa: RER no peso-alvo × 0,8 = ${kcal.toFixed(0)} kcal/dia (Applied Veterinary Clinical Nutrition).`
        : `Referência alternativa: RER no peso-alvo × 1,0 = ${kcal.toFixed(0)} kcal/dia (Applied Veterinary Clinical Nutrition).`,
    sourceLabel: getSourceLabel('avcn2024'),
  }
}

function buildAahaWeightLossResult(
  assessment: NutritionPatientAssessment,
  idealWeightKg: number,
  rerCurrent: number,
): EnergyCalculationResult {
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
    clinicalProfileLabel: 'Método padrão AAHA',
    confidence: 'moderate',
    requiresMonitoring: true,
    methodSummary: `Meta energética inicial calculada sobre o peso-alvo conforme AAHA 2021 (${aaha.kcal.toFixed(0)} kcal/dia). O valor deverá ser ajustado conforme ingestão real, adesão e evolução do peso.`,
    sourceLabel: getSourceLabel('aaha2021'),
    energyMethod: 'aaha2021',
    verificationReference: buildWeightLossVerificationReference(assessment.species, idealWeightKg),
  }
}

function buildObservedWeightLossResult(
  assessment: NutritionPatientAssessment,
  idealWeightKg: number,
  rerCurrent: number,
): EnergyCalculationResult | null {
  const h = assessment.currentDietHistory
  if (!h?.reliable || !h.weightStable || assessment.bodyConditionScore9 < 6) return null

  const observed =
    h.foods.reduce((s, f) => s + f.kcalPerDay, 0) +
    h.treatsKcalPerDay +
    h.chewsKcalPerDay +
    h.medicationVehicleKcalPerDay +
    h.supplementsKcalPerDay
  if (observed <= 0) return null

  const target = observed * 0.8
  return {
    rerKcalDay: rerCurrent,
    estimatedRangeKcalDay: { minimum: target * 0.9, maximum: target * 1.1 },
    selectedTargetKcalDay: target,
    weightBasis: 'ideal_weight',
    weightUsedKg: idealWeightKg,
    clinicalProfileLabel: 'Método individualizado pelo histórico alimentar',
    confidence: 'high',
    requiresMonitoring: true,
    methodSummary: `80% da ingestão estável documentada (${observed.toFixed(0)} kcal/dia → ${target.toFixed(0)} kcal/dia). Reavaliar em 2–4 semanas.`,
    sourceLabel: getSourceLabel('aaha2021'),
    energyMethod: 'observed_history',
    verificationReference: buildWeightLossVerificationReference(assessment.species, idealWeightKg),
  }
}

export interface WeightLossEnergyOptions {
  aaha: EnergyCalculationResult
  observed: EnergyCalculationResult | null
  selectedMethod: WeightLossEnergyMethod
}

export function buildWeightLossEnergyOptions(
  assessment: NutritionPatientAssessment,
  idealWeightKg: number,
): WeightLossEnergyOptions {
  const rerCurrent = calculateRerAllometric(assessment.currentWeightKg)
  const aaha = buildAahaWeightLossResult(assessment, idealWeightKg, rerCurrent)
  const observed = buildObservedWeightLossResult(assessment, idealWeightKg, rerCurrent)
  return { aaha, observed, selectedMethod: 'aaha2021' }
}

export function selectWeightLossEnergy(
  options: WeightLossEnergyOptions,
  selectedMethod?: WeightLossEnergyMethod,
): EnergyCalculationResult {
  if (selectedMethod === 'observed_history' && options.observed) return options.observed
  return options.aaha
}

export function calculateWeightLossEnergy(
  assessment: NutritionPatientAssessment,
  idealWeightKg: number,
  selectedMethod?: WeightLossEnergyMethod,
): EnergyCalculationResult & { method: WeightLossEnergyMethod } {
  const built = buildWeightLossEnergyOptions(assessment, idealWeightKg)
  const result = selectWeightLossEnergy(built, selectedMethod)
  return { ...result, method: result.energyMethod ?? 'aaha2021' }
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
  intakeAuditCompleted?: boolean
  noUntreatedMedicalCause?: boolean
}): { newCalories: number; adjustment: string } | null {
  if (options.weightLossTooFast) {
    return {
      newCalories: options.currentCalories * 1.1,
      adjustment: 'Sugestão: aumento de 10% — perda ponderal acelerada demais.',
    }
  }
  if (
    options.weightLossTooSlow &&
    options.adherenceConfirmed &&
    (options.intakeAuditCompleted ?? true) &&
    (options.noUntreatedMedicalCause ?? true)
  ) {
    return {
      newCalories: options.currentCalories * 0.9,
      adjustment: 'Sugestão: redução de 10% — perda insuficiente com adesão confirmada.',
    }
  }
  return null
}

export function resolveWeightManagementEnergy(
  assessment: NutritionPatientAssessment,
  selectedWeightLossMethod?: WeightLossEnergyMethod,
): EnergyCalculationResult {
  const previousHealthy = assessment.previousWeights?.[0]?.weightKg ?? undefined
  const clinicalRiskFlags = inferClinicalRiskFlags(assessment.diseases)

  const ideal = estimateTargetWeight({
    species: assessment.species,
    currentWeightKg: assessment.currentWeightKg,
    bcs: assessment.bodyConditionScore9,
    goal: assessment.nutritionalGoal === 'weight_gain' ? 'weight_gain' : 'weight_loss',
    muscleCondition: assessment.muscleCondition,
    lifeStage: assessment.lifeStage,
    gestationOrLactation: assessment.lifeStage === 'gestation' || assessment.lifeStage === 'lactation',
    clinicalRiskFlags,
    clinicianTargetWeightKg: assessment.clinicianTargetWeightKg,
    previousHealthyWeightKg: previousHealthy,
    expectedAdultWeightKg: assessment.reproduction?.expectedAdultWeightKg,
  })

  if (assessment.nutritionalGoal === 'weight_gain') {
    return calculateWeightGainEnergy(assessment, ideal.targetWeightKg)
  }
  return calculateWeightLossEnergy(assessment, ideal.targetWeightKg, selectedWeightLossMethod)
}

export const WEEKLY_WEIGHT_LOSS_TARGET = {
  dog: { min: 1, max: 2, preferredMax: 2 },
  cat: { min: 0.5, max: 2, preferredMax: 1 },
} as const satisfies Record<Species, { min: number; max: number; preferredMax: number }>
