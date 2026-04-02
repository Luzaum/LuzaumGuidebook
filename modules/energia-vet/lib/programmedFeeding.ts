import type { FoodContribution, ProgrammedFeedingMeal, ProgrammedFeedingPlan } from '../types'

function getDefaultTimes(mealsPerDay: number) {
  const presets: Record<number, string[]> = {
    1: ['08:00'],
    2: ['08:00', '20:00'],
    3: ['08:00', '14:00', '20:00'],
    4: ['08:00', '12:00', '16:00', '20:00'],
    5: ['07:00', '10:00', '13:00', '16:00', '20:00'],
    6: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  }

  if (presets[mealsPerDay]) return presets[mealsPerDay]

  return Array.from({ length: mealsPerDay }, (_, index) => `${String(8 + index * 2).padStart(2, '0')}:00`)
}

export function roundProgrammedAmount(value: number) {
  if (value < 0.4) return 0
  if (value >= 0.5) return Math.round(value)
  return 0
}

export function buildProgrammedFeedingPlan(options: {
  contributions: FoodContribution[]
  mealsPerDay: number
  times?: string[]
  enabled?: boolean
}): ProgrammedFeedingPlan {
  const mealsPerDay = Math.max(1, options.mealsPerDay)
  const times = options.times && options.times.length === mealsPerDay ? options.times : getDefaultTimes(mealsPerDay)

  const meals: ProgrammedFeedingMeal[] = Array.from({ length: mealsPerDay }, (_, mealIndex) => {
    const items = options.contributions.map((food) => {
      const portion = roundProgrammedAmount(food.gramsAsFed / mealsPerDay)
      return {
        foodId: food.foodId,
        foodName: food.foodName,
        gramsAsFed: portion,
      }
    })

    return {
      id: `meal-${mealIndex + 1}`,
      label: `${mealIndex + 1}a alimentacao`,
      time: times[mealIndex] ?? '08:00',
      totalGrams: items.reduce((sum, item) => sum + item.gramsAsFed, 0),
      items,
    }
  })

  return {
    enabled: options.enabled ?? true,
    mealsPerDay,
    roundingRule: 'Abaixo de 0,4 g arredonda para 0; 0,4 a 0,5 g arredonda para 0; a partir de 0,5 g arredonda para 1 g ou inteiro mais proximo.',
    meals,
  }
}
