#!/usr/bin/env tsx
/** Mapeamento USDA nutrient IDs → nutrition_nutrient_definitions canônicos. */

export const USDA_TO_CANONICAL: Record<number, string> = {
  1008: 'energy_kcal',
  1051: 'moisture',
  1003: 'crude_protein',
  1004: 'crude_fat',
  1079: 'crude_fiber',
  1007: 'ash',
  1087: 'calcium',
  1091: 'phosphorus',
  1093: 'sodium',
  1092: 'potassium',
}

export function mapUsdaNutrient(fdcNutrientId: number): string | null {
  return USDA_TO_CANONICAL[fdcNutrientId] ?? null
}

export function listUnmappedUsdaNutrients(ids: number[]): number[] {
  return ids.filter((id) => !(id in USDA_TO_CANONICAL))
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  console.log('USDA nutrient map entries:', Object.keys(USDA_TO_CANONICAL).length)
}
