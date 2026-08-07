import { DOG_METABOLIC_EXPONENT, RER_ALLOMETRIC_K } from './units'

export function calculateRerAllometric(weightKg: number): number {
  if (weightKg <= 0) return 0
  return RER_ALLOMETRIC_K * Math.pow(weightKg, DOG_METABOLIC_EXPONENT)
}
