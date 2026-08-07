import type { Species } from './types'
import { CAT_METABOLIC_EXPONENT, DOG_METABOLIC_EXPONENT, safeDivide } from './units'

export function dryMatterPercent(moisturePct: number): number {
  return 100 - moisturePct
}

export function convertPercentMnToMs(mnPercent: number, dryMatterPercentValue: number): number | null {
  if (dryMatterPercentValue <= 0) return null
  return (mnPercent / dryMatterPercentValue) * 100
}

export function convertPercentMsToMn(msPercent: number, dryMatterPercentValue: number): number | null {
  return (msPercent * dryMatterPercentValue) / 100
}

export function nutrientPer1000KcalFromMnPercent(
  nutrientMnPercent: number,
  kcalPerKg: number,
): number | null {
  if (kcalPerKg <= 0) return null
  const gramsPerKg = nutrientMnPercent * 10
  return (gramsPerKg / kcalPerKg) * 1000
}

export function nutrientPer100Kcal(per1000: number): number {
  return per1000 / 10
}

export function nutrientPerKgBodyWeight(totalDailyNutrient: number, weightKg: number): number | null {
  return safeDivide(totalDailyNutrient, weightKg)
}

export function nutrientPerMetabolicWeight(
  totalDailyNutrient: number,
  weightKg: number,
  species: Species,
): number | null {
  const exp = species === 'cat' ? CAT_METABOLIC_EXPONENT : DOG_METABOLIC_EXPONENT
  return safeDivide(totalDailyNutrient, Math.pow(weightKg, exp))
}

export function calciumPhosphorusRatio(calcium: number | null, phosphorus: number | null): number | null {
  if (calcium == null || phosphorus == null || phosphorus === 0) return null
  return calcium / phosphorus
}

export function omega6Omega3Ratio(omega6: number | null, omega3: number | null): number | null {
  if (omega6 == null || omega3 == null || omega3 === 0) return null
  return omega6 / omega3
}

export function dailyRequirementFromPer1000Kcal(
  minimumPer1000Kcal: number,
  prescribedKcalDay: number,
): number {
  return (minimumPer1000Kcal * prescribedKcalDay) / 1000
}

export function adequacyPercent(delivered: number, minimum: number): number | null {
  if (minimum <= 0) return null
  return (delivered / minimum) * 100
}
