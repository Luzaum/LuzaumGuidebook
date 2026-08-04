import {
  RER_ALLOMETRIC_K,
  RER_LINEAR_A,
  RER_LINEAR_B,
  RER_LINEAR_MAX_KG,
  RER_LINEAR_MIN_KG,
  DOG_METABOLIC_EXPONENT,
  rejectIfInvalidWeight,
} from './units'
import type { ValidationIssue } from './types'

export function calculateRerAllometric(weightKg: number): number {
  if (weightKg <= 0) return 0
  return RER_ALLOMETRIC_K * Math.pow(weightKg, DOG_METABOLIC_EXPONENT)
}

/** Alternativa linear — somente 2–30 kg, nunca padrão. */
export function calculateRerLinear(weightKg: number): number | null {
  if (weightKg < RER_LINEAR_MIN_KG || weightKg > RER_LINEAR_MAX_KG) return null
  return RER_LINEAR_A * weightKg + RER_LINEAR_B
}

export function validateRerInputs(weightKg: number): ValidationIssue[] {
  const issue = rejectIfInvalidWeight(weightKg)
  return issue ? [issue] : []
}

export function rerClinicalSummary(weightKg: number): {
  allometricKcal: number
  linearKcal: number | null
  linearApplicable: boolean
} {
  return {
    allometricKcal: calculateRerAllometric(weightKg),
    linearKcal: calculateRerLinear(weightKg),
    linearApplicable: weightKg >= RER_LINEAR_MIN_KG && weightKg <= RER_LINEAR_MAX_KG,
  }
}
