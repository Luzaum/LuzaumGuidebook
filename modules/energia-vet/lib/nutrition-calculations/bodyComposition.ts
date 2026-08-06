import type { IdealWeightEstimate, IdealWeightMethod, LifeStage, MuscleCondition, Species } from './types'
import { getSourceLabel } from './sourceRegistry'

/** AAHA 2021 — percentual de excesso por ECC 6–9. */
export const PERCENT_OVERWEIGHT_BY_BCS: Record<number, number> = {
  6: 0.1,
  7: 0.2,
  8: 0.3,
  9: 0.4,
}

export const PERCENT_UNDERWEIGHT_BY_BCS: Record<number, number> = {
  4: 0.15,
  3: 0.2,
  2: 0.3,
  1: 0.4,
}

function muscleLossRequiresReview(muscleCondition?: MuscleCondition): boolean {
  return muscleCondition != null && muscleCondition !== 'normal'
}

function buildProvisionalFlags(options: {
  bcs: number
  muscleCondition?: MuscleCondition
  previousHealthyWeightKg?: number
  estimatedTargetKg: number
  lifeStage?: LifeStage
  gestationOrLactation?: boolean
  clinicalRiskFlags?: string[]
}): Pick<IdealWeightEstimate, 'requiresClinicianReview' | 'isProvisionalEstimate' | 'confidence'> {
  const muscleReview = muscleLossRequiresReview(options.muscleCondition)
  const extremeBcs = options.bcs >= 8
  const growthReview = options.lifeStage === 'growth'
  const reproReview = options.gestationOrLactation === true
  const riskReview = (options.clinicalRiskFlags?.length ?? 0) > 0

  let discrepancyReview = false
  if (options.previousHealthyWeightKg != null && options.previousHealthyWeightKg > 0) {
    const diffPct =
      (Math.abs(options.estimatedTargetKg - options.previousHealthyWeightKg) / options.previousHealthyWeightKg) * 100
    discrepancyReview = diffPct > 15
  }

  const requiresClinicianReview =
    extremeBcs || muscleReview || growthReview || reproReview || riskReview || discrepancyReview
  const isProvisionalEstimate = requiresClinicianReview

  let confidence: IdealWeightEstimate['confidence'] = 'moderate'
  if (extremeBcs || riskReview) confidence = 'low'
  if (options.bcs === 6 && !requiresClinicianReview) confidence = 'moderate'

  return { requiresClinicianReview, isProvisionalEstimate, confidence }
}

export function estimateIdealWeightFromOverweight(
  currentWeightKg: number,
  bcs: number,
  options: {
    muscleCondition?: MuscleCondition
    lifeStage?: LifeStage
    gestationOrLactation?: boolean
    clinicalRiskFlags?: string[]
    previousHealthyWeightKg?: number
  } = {},
): IdealWeightEstimate {
  const pct = PERCENT_OVERWEIGHT_BY_BCS[bcs]
  if (pct == null || currentWeightKg <= 0) {
    return {
      targetWeightKg: currentWeightKg,
      confidence: 'low',
      method: 'insufficient_data',
      methodSummary: 'ECC não indica excesso de peso estimável por AAHA.',
      requiresClinicianReview: true,
      isProvisionalEstimate: true,
    }
  }
  const target = currentWeightKg / (1 + pct)
  const flags = buildProvisionalFlags({
    bcs,
    muscleCondition: options.muscleCondition,
    previousHealthyWeightKg: options.previousHealthyWeightKg,
    estimatedTargetKg: target,
    lifeStage: options.lifeStage,
    gestationOrLactation: options.gestationOrLactation,
    clinicalRiskFlags: options.clinicalRiskFlags,
  })

  return {
    targetWeightKg: target,
    percentOverweight: pct * 100,
    method: 'aaha_ecc_estimate',
    confidence: flags.confidence,
    methodSummary: `O ECC ${bcs}/9 corresponde a aproximadamente ${(pct * 100).toFixed(0)}% acima do peso ideal. Peso-alvo estimado: ${currentWeightKg.toFixed(2)} kg ÷ ${(1 + pct).toFixed(2)} = ${target.toFixed(2)} kg.`,
    requiresClinicianReview: flags.requiresClinicianReview,
    isProvisionalEstimate: flags.isProvisionalEstimate,
  }
}

export function estimateTargetWeight(options: {
  species: Species
  currentWeightKg: number
  bcs: number
  goal: 'maintenance' | 'weight_loss' | 'weight_gain'
  muscleCondition?: MuscleCondition
  lifeStage?: LifeStage
  gestationOrLactation?: boolean
  clinicalRiskFlags?: string[]
  clinicianTargetWeightKg?: number
  previousHealthyWeightKg?: number
  expectedAdultWeightKg?: number
}): IdealWeightEstimate {
  if (options.goal === 'maintenance') {
    return {
      targetWeightKg: options.currentWeightKg,
      confidence: 'high',
      method: 'maintenance',
      methodSummary: 'Manutenção no peso atual.',
      requiresClinicianReview: false,
      isProvisionalEstimate: false,
    }
  }

  const sharedFlags = {
    bcs: options.bcs,
    muscleCondition: options.muscleCondition,
    lifeStage: options.lifeStage,
    gestationOrLactation: options.gestationOrLactation,
    clinicalRiskFlags: options.clinicalRiskFlags,
    previousHealthyWeightKg: options.previousHealthyWeightKg,
  }

  if (options.goal === 'weight_loss') {
    if (options.previousHealthyWeightKg != null && options.previousHealthyWeightKg > 0) {
      const flags = buildProvisionalFlags({
        ...sharedFlags,
        estimatedTargetKg: options.previousHealthyWeightKg,
      })
      return {
        targetWeightKg: options.previousHealthyWeightKg,
        confidence: 'high',
        method: 'previous_healthy_weight',
        methodSummary: 'Peso saudável anterior documentado.',
        requiresClinicianReview: flags.requiresClinicianReview,
        isProvisionalEstimate: flags.isProvisionalEstimate,
      }
    }

    if (options.clinicianTargetWeightKg != null && options.clinicianTargetWeightKg > 0) {
      return {
        targetWeightKg: options.clinicianTargetWeightKg,
        confidence: 'high',
        method: 'clinician_defined',
        methodSummary: 'Peso-alvo definido pelo médico-veterinário.',
        requiresClinicianReview: false,
        isProvisionalEstimate: false,
      }
    }

    if (
      options.lifeStage === 'growth' &&
      options.expectedAdultWeightKg != null &&
      options.expectedAdultWeightKg > 0
    ) {
      const flags = buildProvisionalFlags({
        ...sharedFlags,
        estimatedTargetKg: options.expectedAdultWeightKg,
      })
      return {
        targetWeightKg: options.expectedAdultWeightKg,
        confidence: 'moderate',
        method: 'expected_adult_weight',
        methodSummary: 'Peso adulto esperado documentado para paciente em crescimento.',
        requiresClinicianReview: true,
        isProvisionalEstimate: flags.isProvisionalEstimate,
      }
    }

    if (options.bcs >= 6) {
      return estimateIdealWeightFromOverweight(options.currentWeightKg, options.bcs, {
        muscleCondition: options.muscleCondition,
        lifeStage: options.lifeStage,
        gestationOrLactation: options.gestationOrLactation,
        clinicalRiskFlags: options.clinicalRiskFlags,
        previousHealthyWeightKg: options.previousHealthyWeightKg,
      })
    }
  }

  if (options.goal === 'weight_gain') {
    if (options.previousHealthyWeightKg != null && options.previousHealthyWeightKg > 0) {
      return {
        targetWeightKg: options.previousHealthyWeightKg,
        confidence: 'high',
        method: 'previous_healthy_weight',
        methodSummary: 'Peso saudável anterior documentado.',
        requiresClinicianReview: false,
        isProvisionalEstimate: false,
      }
    }
    if (options.bcs <= 4) {
      return {
        targetWeightKg: options.currentWeightKg,
        confidence: 'low',
        method: 'insufficient_data',
        methodSummary: 'Defina manualmente o peso-alvo — estimativa automática de ganho não é confiável.',
        requiresClinicianReview: true,
        isProvisionalEstimate: true,
      }
    }
  }

  return {
    targetWeightKg: options.currentWeightKg,
    confidence: 'moderate',
    method: 'insufficient_data',
    methodSummary: 'Peso atual mantido por falta de dados para estimativa.',
    requiresClinicianReview: false,
    isProvisionalEstimate: false,
  }
}

export function calculateWeightChangePercent(currentKg: number, previousKg: number): number | null {
  if (previousKg <= 0) return null
  return ((currentKg - previousKg) / previousKg) * 100
}

export function calculateWeeklyWeightLossPercent(
  currentKg: number,
  previousKg: number,
  elapsedWeeks: number,
): number | null {
  if (previousKg <= 0 || elapsedWeeks <= 0) return null
  const totalLossPct = ((previousKg - currentKg) / previousKg) * 100
  return totalLossPct / elapsedWeeks
}

export function involuntaryWeightLossAlert(lossPercent: number): boolean {
  return lossPercent > 5
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

export function bodyCompositionSourceLabel(): string {
  return getSourceLabel('aaha2021')
}

export function idealWeightMethodLabel(method: IdealWeightMethod): string {
  if (method === 'clinician_defined') return 'Prescrição clínica'
  if (method === 'previous_healthy_weight') return 'Peso saudável anterior'
  if (method === 'expected_adult_weight') return 'Peso adulto esperado'
  if (method === 'aaha_ecc_estimate') return 'Estimativa AAHA por ECC'
  if (method === 'maintenance') return 'Manutenção'
  return 'Dados insuficientes'
}

export function inferClinicalRiskFlags(comorbidityIds: string[] | undefined): string[] {
  if (!comorbidityIds?.length) return []
  const riskPatterns = [
    /edema/i,
    /ascite/i,
    /tumor/i,
    /neoplas/i,
    /cancer|câncer/i,
    /amput/i,
  ]
  return comorbidityIds.filter((id) => riskPatterns.some((p) => p.test(id)))
}
