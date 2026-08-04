import { DOG_METABOLIC_EXPONENT, CAT_METABOLIC_EXPONENT } from './units'

export const DOG_LACTATION_WEEK_FACTOR: Record<number, number> = {
  1: 0.75,
  2: 0.95,
  3: 1.1,
  4: 1.2,
}

export function calculateDogGestationFirst4Weeks(weightKg: number): number {
  return 132 * Math.pow(weightKg, DOG_METABOLIC_EXPONENT)
}

export function calculateDogGestationLast5Weeks(weightKg: number): number {
  return 132 * Math.pow(weightKg, DOG_METABOLIC_EXPONENT) + 26 * weightKg
}

export function calculateDogLactation(
  weightKg: number,
  litterSize: number,
  lactationWeek: number,
): { kcal: number; extrapolated: boolean } {
  const L = DOG_LACTATION_WEEK_FACTOR[lactationWeek] ?? DOG_LACTATION_WEEK_FACTOR[4]
  const base = 145 * Math.pow(weightKg, DOG_METABOLIC_EXPONENT)
  const n = Math.max(1, litterSize)
  const litterComponent =
    n <= 4
      ? 24 * n * weightKg * L
      : (96 + 12 * (n - 4)) * weightKg * L
  return { kcal: base + litterComponent, extrapolated: n > 8 }
}

export function calculateCatGestation(weightKg: number): number {
  return 140 * Math.pow(weightKg, CAT_METABOLIC_EXPONENT)
}

export const CAT_LACTATION_WEEK_FACTOR: Record<number, number> = {
  1: 0.9,
  2: 0.9,
  3: 1.2,
  4: 1.2,
  5: 1.1,
  6: 1.0,
  7: 0.8,
}

export function calculateCatLactation(
  weightKg: number,
  litterSize: number,
  lactationWeek: number,
): number {
  const L = CAT_LACTATION_WEEK_FACTOR[lactationWeek] ?? CAT_LACTATION_WEEK_FACTOR[7]
  const base = 100 * Math.pow(weightKg, CAT_METABOLIC_EXPONENT)
  const n = Math.max(1, litterSize)
  const mult = n < 3 ? 18 : n <= 4 ? 60 : 70
  return base + mult * weightKg * L
}
