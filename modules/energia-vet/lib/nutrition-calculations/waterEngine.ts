import type { Species } from './types'
import { calculateRerAllometric } from './energyRer'

export function estimateWaterFromEnergy(prescribedKcalDay: number): number {
  return prescribedKcalDay * 1
}

export function estimateWaterMicrobiomeMethod(species: Species, rerKcal: number): number {
  return species === 'cat' ? rerKcal * 1.2 : rerKcal * 1.6
}

export function calculateFoodWaterMl(foodGrams: number, moisturePct: number): number {
  return (foodGrams * moisturePct) / 100
}

export function calculateMetabolicWaterMl(
  fatGrams: number,
  carbohydrateGrams: number,
  proteinGrams: number,
): number {
  return fatGrams * 1.071 + carbohydrateGrams * 0.556 + proteinGrams * 0.396
}

export function calculateOralWaterGap(options: {
  targetWaterMl: number
  foodWaterMl: number
  metabolicWaterMl: number
  voluntarilyDrunkWaterMl?: number
  enteralFlushWaterMl?: number
}): number {
  const drunk = options.voluntarilyDrunkWaterMl ?? 0
  const flush = options.enteralFlushWaterMl ?? 0
  return Math.max(0, options.targetWaterMl - options.foodWaterMl - options.metabolicWaterMl - drunk - flush)
}

export function waterEstimateRange(species: Species, prescribedKcalDay: number): { min: number; max: number } {
  const rer = calculateRerAllometric(prescribedKcalDay / (species === 'cat' ? 52 : 95))
  const energyBased = estimateWaterFromEnergy(prescribedKcalDay)
  const microbiome = estimateWaterMicrobiomeMethod(species, rer)
  return { min: Math.min(energyBased, microbiome), max: Math.max(energyBased, microbiome) }
}

export const WATER_DISCLAIMER =
  'Estimativa nutricional de água. Não substitui fluidoterapia, correção de desidratação ou cálculo de perdas contínuas.'
