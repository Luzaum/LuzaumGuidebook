import { calculateBookRER } from '../bookEnergy'
import type { CanonicalMuscleCondition, CanonicalNutritionInput } from './types'
import { calculateMaintenanceEnergy, type CanonicalEnergyResult } from './energyCalculator'

export const PERCENT_OVERWEIGHT_BY_BCS: Record<number, number> = {
  6: 0.1,
  7: 0.2,
  8: 0.3,
  9: 0.4,
}

export const WEEKLY_WEIGHT_LOSS_TARGET = {
  dog: { min: 0.5, max: 2, preferredMax: 1 },
  cat: { min: 0.5, max: 1, preferredMax: 0.75 },
} as const

export type IdealWeightMethod =
  | 'maintenance'
  | 'aaha_ecc_estimate'
  | 'previous_healthy_weight'
  | 'expected_adult_weight'
  | 'clinician_defined'
  | 'insufficient_data'

export interface IdealWeightEstimate {
  targetWeightKg: number
  percentOverweight?: number
  method: IdealWeightMethod
  methodSummary: string
  requiresClinicianReview: boolean
  isProvisionalEstimate: boolean
  confidence: 'high' | 'moderate' | 'low'
}

export interface BodyTargetPlan {
  targetWeightKg: number
  idealWeightEstimate: IdealWeightEstimate
  maintenanceEnergyKcal: number
  targetEnergyKcal: number
  maintenanceResult: CanonicalEnergyResult
  targetResult: CanonicalEnergyResult
  energyFormula: string
  weeklyLossTargetPct?: { min: number; max: number; preferredMax: number }
  reassessmentHint: string
  uncertaintyNotice: string
  muscleLossEnergyDeferral?: { message: string; aahaReferenceKcal: number }
}

function muscleLossBlocksRestriction(mcs?: CanonicalMuscleCondition): boolean {
  return mcs === 'moderate_loss' || mcs === 'severe_loss'
}

export function estimateTargetWeightFromInput(input: CanonicalNutritionInput): IdealWeightEstimate {
  const goal = input.calculationPreferences.nutritionalGoal ?? 'maintenance'
  const current = input.patient.currentWeightKg
  const bcs = input.patient.bodyConditionScore?.value ?? 5

  if (goal === 'maintenance') {
    return {
      targetWeightKg: current,
      confidence: 'high',
      method: 'maintenance',
      methodSummary: 'Manutenção no peso atual.',
      requiresClinicianReview: false,
      isProvisionalEstimate: false,
    }
  }

  if (goal === 'weight_loss') {
    if (input.patient.previousHealthyWeightKg != null && input.patient.previousHealthyWeightKg > 0) {
      return {
        targetWeightKg: input.patient.previousHealthyWeightKg,
        confidence: 'high',
        method: 'previous_healthy_weight',
        methodSummary: 'Peso saudável anterior documentado.',
        requiresClinicianReview: false,
        isProvisionalEstimate: false,
      }
    }
    if (input.patient.targetWeightKg != null && input.patient.targetWeightKg > 0) {
      return {
        targetWeightKg: input.patient.targetWeightKg,
        confidence: 'high',
        method: 'clinician_defined',
        methodSummary: 'Peso-alvo definido pelo médico-veterinário.',
        requiresClinicianReview: false,
        isProvisionalEstimate: false,
      }
    }
    const pct = PERCENT_OVERWEIGHT_BY_BCS[bcs]
    if (pct != null && current > 0) {
      const target = current / (1 + pct)
      return {
        targetWeightKg: target,
        percentOverweight: pct * 100,
        method: 'aaha_ecc_estimate',
        confidence: bcs >= 8 ? 'low' : 'moderate',
        methodSummary: `ECC ${bcs}/9 ≈ ${(pct * 100).toFixed(0)}% acima do ideal. Peso-alvo: ${target.toFixed(2)} kg.`,
        requiresClinicianReview: bcs >= 8 || muscleLossBlocksRestriction(input.patient.muscleConditionScore),
        isProvisionalEstimate: bcs >= 8,
      }
    }
  }

  return {
    targetWeightKg: current,
    confidence: 'moderate',
    method: 'insufficient_data',
    methodSummary: 'Peso atual mantido — dados insuficientes para estimativa automática.',
    requiresClinicianReview: true,
    isProvisionalEstimate: true,
  }
}

function calculateAahaWeightLossKcal(species: 'dog' | 'cat', idealWeightKg: number): number {
  if (species === 'cat') {
    return 52 * Math.pow(idealWeightKg, 0.711)
  }
  return 63 * Math.pow(idealWeightKg, 0.75)
}

function buildWeightLossEnergy(
  input: CanonicalNutritionInput,
  idealWeightKg: number,
  maintenance: CanonicalEnergyResult,
): CanonicalEnergyResult {
  const aaha = calculateAahaWeightLossKcal(input.patient.species, idealWeightKg)
  return {
    ...maintenance,
    selectedTargetKcalDay: aaha,
    estimatedRangeKcalDay: { minimum: aaha * 0.9, maximum: aaha * 1.1 },
    weightUsedKg: idealWeightKg,
    weightBasis: 'ideal_weight',
    clinicalProfileLabel: 'Método padrão AAHA',
    methodSummary: `AAHA 2021 sobre peso-alvo ${idealWeightKg.toFixed(2)} kg = ${aaha.toFixed(0)} kcal/dia`,
    confidence: 'moderate',
    sourceId: 'aaha-2021',
  }
}

export function computeBodyTargetPlan(
  input: CanonicalNutritionInput,
  maintenanceEnergyKcalOverride?: number,
): BodyTargetPlan | null {
  if (input.patient.currentWeightKg <= 0) return null

  const maintenanceResult = calculateMaintenanceEnergy(input)
  if (!maintenanceResult) return null

  const maintenanceEnergyKcal = maintenanceEnergyKcalOverride ?? maintenanceResult.selectedTargetKcalDay
  const goal = input.calculationPreferences.nutritionalGoal ?? 'maintenance'
  const idealWeightEstimate = estimateTargetWeightFromInput(input)
  const uncertaintyNotice =
    'Esta é uma estimativa inicial. A necessidade energética individual deve ser calibrada pelo acompanhamento do paciente.'
  const reassessmentHint = 'Reavaliar peso, ECC, EMC e adesão em 2–4 semanas.'

  if (goal === 'maintenance') {
    return {
      targetWeightKg: input.patient.currentWeightKg,
      idealWeightEstimate,
      maintenanceEnergyKcal,
      targetEnergyKcal: maintenanceEnergyKcal,
      maintenanceResult,
      targetResult: maintenanceResult,
      energyFormula: `Manutenção: ${maintenanceResult.methodSummary}`,
      reassessmentHint,
      uncertaintyNotice,
    }
  }

  if (goal === 'weight_loss') {
    const targetWeightKg = idealWeightEstimate.targetWeightKg
    let targetResult = buildWeightLossEnergy(input, targetWeightKg, maintenanceResult)
    let muscleLossEnergyDeferral: BodyTargetPlan['muscleLossEnergyDeferral']

    if (muscleLossBlocksRestriction(input.patient.muscleConditionScore)) {
      muscleLossEnergyDeferral = {
        message:
          'EMC reduzida — restrição AAHA não aplicada automaticamente. Priorize preservação de massa magra.',
        aahaReferenceKcal: targetResult.selectedTargetKcalDay,
      }
      targetResult = {
        ...maintenanceResult,
        selectedTargetKcalDay: maintenanceEnergyKcal,
        clinicalProfileLabel: 'Manutenção provisória (EMC reduzida)',
        methodSummary: `Manutenção ${maintenanceEnergyKcal.toFixed(0)} kcal/dia até revisão clínica. Referência AAHA: ${muscleLossEnergyDeferral.aahaReferenceKcal.toFixed(0)} kcal/dia.`,
        confidence: 'low',
      }
    }

    return {
      targetWeightKg,
      idealWeightEstimate,
      maintenanceEnergyKcal,
      targetEnergyKcal: targetResult.selectedTargetKcalDay,
      maintenanceResult,
      targetResult,
      energyFormula: `${idealWeightEstimate.methodSummary} ${targetResult.methodSummary}`,
      weeklyLossTargetPct: WEEKLY_WEIGHT_LOSS_TARGET[input.patient.species],
      muscleLossEnergyDeferral,
      reassessmentHint,
      uncertaintyNotice,
    }
  }

  const targetWeightKg = idealWeightEstimate.targetWeightKg
  const rerTarget = calculateBookRER(Math.max(0.1, targetWeightKg))
  const factor = input.patient.species === 'cat' ? 1.2 : 1.2
  const kcal = rerTarget * factor
  const targetResult: CanonicalEnergyResult = {
    ...maintenanceResult,
    selectedTargetKcalDay: kcal,
    weightUsedKg: targetWeightKg,
    weightBasis: 'target_weight',
    clinicalProfileLabel: 'Recuperação ponderal',
    methodSummary: `RER no peso-alvo × ${factor} = ${kcal.toFixed(0)} kcal/dia`,
    confidence: 'moderate',
    sourceId: 'avcn-2024',
  }

  return {
    targetWeightKg,
    idealWeightEstimate,
    maintenanceEnergyKcal,
    targetEnergyKcal: kcal,
    maintenanceResult,
    targetResult,
    energyFormula: targetResult.methodSummary,
    reassessmentHint,
    uncertaintyNotice,
  }
}

export function idealWeightMethodLabel(method: IdealWeightMethod): string {
  if (method === 'clinician_defined') return 'Prescrição clínica'
  if (method === 'previous_healthy_weight') return 'Peso saudável anterior'
  if (method === 'expected_adult_weight') return 'Peso adulto esperado'
  if (method === 'aaha_ecc_estimate') return 'Estimativa AAHA por ECC'
  if (method === 'maintenance') return 'Manutenção'
  return 'Dados insuficientes'
}

export function estimateWeeksToTarget(options: {
  currentWeightKg: number
  targetWeightKg: number
  weeklyTargetLossPercent: number
}): number | null {
  if (options.currentWeightKg <= options.targetWeightKg) return 0
  if (options.weeklyTargetLossPercent <= 0) return null
  const weeklyLossKg = options.currentWeightKg * (options.weeklyTargetLossPercent / 100)
  if (weeklyLossKg <= 0) return null
  return (options.currentWeightKg - options.targetWeightKg) / weeklyLossKg
}

export function validatePatientInput(input: CanonicalNutritionInput): Array<{ path: string; message: string }> {
  const issues: Array<{ path: string; message: string }> = []
  if (input.patient.currentWeightKg <= 0) issues.push({ path: 'weight', message: 'Informe o peso atual.' })
  if (input.patient.ageMonths == null || input.patient.ageMonths < 0) issues.push({ path: 'age', message: 'Informe a idade.' })
  if (!input.patient.muscleConditionScore) {
    issues.push({ path: 'emc', message: 'Selecione a EMC.' })
  }
  return issues
}
