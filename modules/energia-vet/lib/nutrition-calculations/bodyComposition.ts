import type { IdealWeightEstimate, Species } from './types'
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

export function estimateIdealWeightFromOverweight(
  currentWeightKg: number,
  bcs: number,
): IdealWeightEstimate {
  const pct = PERCENT_OVERWEIGHT_BY_BCS[bcs]
  if (pct == null || currentWeightKg <= 0) {
    return {
      targetWeightKg: currentWeightKg,
      confidence: 'low',
      methodSummary: 'ECC não indica excesso de peso estimável por AAHA.',
      requiresClinicianReview: true,
    }
  }
  const target = currentWeightKg / (1 + pct)
  return {
    targetWeightKg: target,
    percentOverweight: pct * 100,
    confidence: bcs <= 7 ? 'moderate' : 'low',
    methodSummary: `Peso-alvo estimado pela relação AAHA (ECC ${bcs}/9 ≈ ${(pct * 100).toFixed(0)}% acima do ideal).`,
    requiresClinicianReview: bcs >= 8,
  }
}

export function estimateTargetWeight(options: {
  species: Species
  currentWeightKg: number
  bcs: number
  goal: 'maintenance' | 'weight_loss' | 'weight_gain'
  clinicianTargetWeightKg?: number
  previousHealthyWeightKg?: number
  expectedAdultWeightKg?: number
}): IdealWeightEstimate {
  if (options.clinicianTargetWeightKg != null && options.clinicianTargetWeightKg > 0) {
    return {
      targetWeightKg: options.clinicianTargetWeightKg,
      confidence: 'high',
      methodSummary: 'Peso-alvo definido pelo médico-veterinário.',
      requiresClinicianReview: false,
    }
  }

  if (options.goal === 'maintenance') {
    return {
      targetWeightKg: options.currentWeightKg,
      confidence: 'high',
      methodSummary: 'Manutenção no peso atual.',
      requiresClinicianReview: false,
    }
  }

  if (options.goal === 'weight_loss' && options.bcs >= 6) {
    return estimateIdealWeightFromOverweight(options.currentWeightKg, options.bcs)
  }

  if (options.goal === 'weight_gain') {
    if (options.previousHealthyWeightKg != null && options.previousHealthyWeightKg > 0) {
      return {
        targetWeightKg: options.previousHealthyWeightKg,
        confidence: 'high',
        methodSummary: 'Peso saudável anterior documentado.',
        requiresClinicianReview: false,
      }
    }
    if (options.bcs <= 4) {
      return {
        targetWeightKg: options.currentWeightKg,
        confidence: 'low',
        methodSummary: 'Defina manualmente o peso-alvo — estimativa automática de ganho não é confiável.',
        requiresClinicianReview: true,
      }
    }
  }

  return {
    targetWeightKg: options.currentWeightKg,
    confidence: 'moderate',
    methodSummary: 'Peso atual mantido por falta de dados para estimativa.',
    requiresClinicianReview: false,
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
