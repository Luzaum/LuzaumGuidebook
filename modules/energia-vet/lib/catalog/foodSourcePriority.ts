/**
 * Prioridade de fontes para composição de alimentos — NutriçãoVET.
 * TBCA permanece bloqueada por licença CC BY-NC-ND até autorização comercial.
 */

export type FoodSourceDatabase =
  | 'taco_nepa'
  | 'usda_fdc'
  | 'manufacturer'
  | 'genutri_secondary'
  | 'manual_curation'
  | 'blocked_by_license'

export type FoodSourcePriorityTier = 1 | 2 | 3 | 4 | 5

export interface FoodSourceProvenance {
  sourceDatabase: FoodSourceDatabase
  sourceRecordId?: string
  sourceVersion?: string
  sourceDate?: string
  importedAt: string
  dataQuality: 'verified' | 'typical_analysis' | 'estimated' | 'unknown'
  nutrientBasis: 'as_fed' | 'dry_matter' | 'mixed'
  preparationState: 'raw' | 'cooked' | 'commercial' | 'unknown'
  confidence: 'high' | 'moderate' | 'low'
}

/** Ordem canônica para ingredientes naturais brasileiros. */
export const NATURAL_FOOD_SOURCE_PRIORITY: FoodSourceDatabase[] = [
  'taco_nepa',
  'usda_fdc',
  'manufacturer',
  'genutri_secondary',
  'manual_curation',
]

/** Ordem canônica para alimentos comerciais. */
export const COMMERCIAL_FOOD_SOURCE_PRIORITY: FoodSourceDatabase[] = [
  'manufacturer',
  'genutri_secondary',
  'manual_curation',
]

export const BLOCKED_FOOD_SOURCES: FoodSourceDatabase[] = ['blocked_by_license']

export const TBCA_LICENSE_STATUS = 'blocked_by_license' as const

export function isBlockedFoodSource(source: FoodSourceDatabase): boolean {
  return BLOCKED_FOOD_SOURCES.includes(source)
}

export function resolveImportTier(source: FoodSourceDatabase): FoodSourcePriorityTier {
  const order = NATURAL_FOOD_SOURCE_PRIORITY
  const index = order.indexOf(source)
  return (index >= 0 ? index + 1 : 5) as FoodSourcePriorityTier
}

export function emptyFoodProvenance(source: FoodSourceDatabase): FoodSourceProvenance {
  return {
    sourceDatabase: source,
    importedAt: new Date().toISOString(),
    dataQuality: 'unknown',
    nutrientBasis: 'as_fed',
    preparationState: 'unknown',
    confidence: 'low',
  }
}
