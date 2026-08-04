import type { RoundingResult } from './types'
import { roundTo, safeDivide } from './units'

/** Valor prático — não zera porções pequenas; preserva exato. */
export function roundPracticalGrams(exactGrams: number): RoundingResult {
  let practical: number
  if (exactGrams < 0.05) {
    practical = 0
  } else if (exactGrams < 1) {
    practical = roundTo(exactGrams, 1)
  } else {
    practical = Math.round(exactGrams)
  }
  const difference = practical - exactGrams
  const percentError = safeDivide(difference, exactGrams) ?? 0
  return {
    exactValue: exactGrams,
    practicalValue: practical,
    difference: roundTo(difference, 4),
    percentError: roundTo(percentError * 100, 2),
  }
}

export function splitMealPortion(dailyGrams: number, mealsPerDay: number): RoundingResult {
  const exact = mealsPerDay > 0 ? dailyGrams / mealsPerDay : dailyGrams
  return roundPracticalGrams(exact)
}

export function reconcileRoundingError(options: {
  targetKcal: number
  roundedFoods: Array<{ foodId: string; practicalGrams: number; kcalPerGram: number; isPrimary?: boolean }>
}): {
  foods: Array<{ foodId: string; adjustedGrams: number; kcal: number }>
  totalKcal: number
  errorPercent: number
} {
  const items = options.roundedFoods.map((f) => ({
    foodId: f.foodId,
    adjustedGrams: f.practicalGrams,
    kcal: f.practicalGrams * f.kcalPerGram,
  }))
  let totalKcal = items.reduce((s, i) => s + i.kcal, 0)
  const errorPercent = options.targetKcal > 0 ? ((totalKcal - options.targetKcal) / options.targetKcal) * 100 : 0

  const primaryIdx = options.roundedFoods.findIndex((f) => f.isPrimary) ?? 0
  if (primaryIdx >= 0 && items[primaryIdx] && Math.abs(errorPercent) > 2) {
    const deficit = options.targetKcal - totalKcal
    const kcalPerGram = options.roundedFoods[primaryIdx].kcalPerGram
    if (kcalPerGram > 0) {
      items[primaryIdx].adjustedGrams += deficit / kcalPerGram
      items[primaryIdx].kcal = items[primaryIdx].adjustedGrams * kcalPerGram
      totalKcal = items.reduce((s, i) => s + i.kcal, 0)
    }
  }

  return {
    foods: items,
    totalKcal: roundTo(totalKcal, 2),
    errorPercent: roundTo(
      options.targetKcal > 0 ? ((totalKcal - options.targetKcal) / options.targetKcal) * 100 : 0,
      2,
    ),
  }
}
