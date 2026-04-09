import {
  filterFoods,
  getFoodById,
  getFoodCategories,
  GENUTRI_NUTRIENT_CATALOG,
} from '../../lib/genutriData'
import type { DietType, FoodItem } from '../../types'

export const FOOD_STEP_REQUIRED_NUTRIENT_KEYS = new Set([
  'moisturePct',
  'dryMatterPct',
  'energyKcalPer100g',
  'crudeProteinPct',
  'etherExtractPct',
  'ashPct',
  'crudeFiberPct',
  'nitrogenFreeExtractPct',
  'calciumPct',
  'phosphorusPct',
])

export function resolveFoodTypeFilter(dietType: DietType): string[] | undefined {
  if (dietType === 'commercial') return ['commercial']
  if (dietType === 'natural') return ['natural', 'suplemento', 'enteral']
  return undefined
}

export function formatNutrient(value: number | null | undefined, unit?: string | null, decimals = 2) {
  if (value == null) return 'Dado não cadastrado'
  return `${value.toFixed(decimals)} ${unit ?? ''}`.trim()
}

export function formatKcal(food: FoodItem) {
  const kcal = food.nutrientsAsFed.energyKcalPer100g
  if (kcal == null) return '—'
  return `${kcal.toFixed(0)} kcal/100g`
}

export function getDetailNutrientsForBasis(basis: Record<string, number | null>) {
  return GENUTRI_NUTRIENT_CATALOG.filter((nutrient) => {
    if (FOOD_STEP_REQUIRED_NUTRIENT_KEYS.has(nutrient.key)) return true
    return basis[nutrient.key] != null
  })
}

export { filterFoods, getFoodById, getFoodCategories }
