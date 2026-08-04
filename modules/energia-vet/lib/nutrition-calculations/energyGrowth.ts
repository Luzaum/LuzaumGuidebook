import { DOG_METABOLIC_EXPONENT, CAT_METABOLIC_EXPONENT } from './units'
import type { Species } from './types'
import { getSourceLabel } from './sourceRegistry'

export function calculateDogGrowthNrc(
  currentWeightKg: number,
  expectedAdultWeightKg: number,
): number | null {
  if (expectedAdultWeightKg <= 0 || currentWeightKg <= 0) return null
  const p = currentWeightKg / expectedAdultWeightKg
  if (p <= 0 || p > 1.2) return null
  return (
    130 *
    Math.pow(currentWeightKg, DOG_METABOLIC_EXPONENT) *
    3.2 *
    (Math.exp(-0.87 * p) - 0.1)
  )
}

export function calculateDogGrowthFediaf(
  currentWeightKg: number,
  expectedAdultWeightKg: number,
): number | null {
  if (expectedAdultWeightKg <= 0 || currentWeightKg <= 0) return null
  return (
    (254.1 - 135 * (currentWeightKg / expectedAdultWeightKg)) *
    Math.pow(currentWeightKg, DOG_METABOLIC_EXPONENT)
  )
}

export function calculateDogGrowthSimplified(rerKcal: number, ageMonths: number): number {
  return rerKcal * (ageMonths <= 4 ? 3 : 2)
}

export function calculateCatGrowthNrc(
  currentWeightKg: number,
  expectedAdultWeightKg: number,
): number | null {
  if (expectedAdultWeightKg <= 0 || currentWeightKg <= 0) return null
  const p = currentWeightKg / expectedAdultWeightKg
  if (p <= 0 || p > 1.2) return null
  return (
    100 *
    Math.pow(currentWeightKg, CAT_METABOLIC_EXPONENT) *
    6.7 *
    (Math.exp(-0.189 * p) - 0.66)
  )
}

export function calculateCatGrowthFediafFactor(ageMonths: number): { min: number; max: number } {
  if (ageMonths <= 4) return { min: 2.0, max: 2.5 }
  if (ageMonths <= 9) return { min: 1.75, max: 2.0 }
  if (ageMonths <= 12) return { min: 1.5, max: 1.5 }
  return { min: 1, max: 1 }
}

export function growthSourceLabel(species: Species, method: 'nrc' | 'fediaf'): string {
  return method === 'nrc' ? getSourceLabel('nrc2006') : getSourceLabel('fediaf2025')
}
