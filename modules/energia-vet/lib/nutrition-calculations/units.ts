import type { Species, ValidationIssue } from './types'

export const DOG_METABOLIC_EXPONENT = 0.75
export const CAT_METABOLIC_EXPONENT = 0.67

export const RER_ALLOMETRIC_K = 70
export const RER_LINEAR_A = 30
export const RER_LINEAR_B = 70
export const RER_LINEAR_MIN_KG = 2
export const RER_LINEAR_MAX_KG = 30

export function metabolicWeight(weightKg: number, species: Species): number {
  const exp = species === 'cat' ? CAT_METABOLIC_EXPONENT : DOG_METABOLIC_EXPONENT
  return Math.pow(weightKg, exp)
}

export function roundTo(value: number, decimals: number): number {
  const f = 10 ** decimals
  return Math.round(value * f) / f
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function isFinitePositive(value: number): boolean {
  return Number.isFinite(value) && value > 0
}

export function rejectIfInvalidWeight(weightKg: number): ValidationIssue | null {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return { code: 'invalid_weight', message: 'Peso deve ser maior que zero.', severity: 'error' }
  }
  return null
}

export function rejectIfInvalidMoisture(moisturePct: number): ValidationIssue | null {
  if (!Number.isFinite(moisturePct) || moisturePct < 0 || moisturePct > 100) {
    return { code: 'invalid_moisture', message: 'Umidade deve estar entre 0 e 100%.', severity: 'error' }
  }
  return null
}

export function coefficientBetween(min: number, max: number, position: 'low' | 'mid' | 'high' = 'mid'): number {
  if (position === 'low') return min
  if (position === 'high') return max
  return (min + max) / 2
}

export function safeDivide(numerator: number, denominator: number): number | null {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null
  return numerator / denominator
}
