import { isNutritionFeatureEnabled } from '../featureFlags'
import { getLegacyCatalogStats, legacyGenutriCatalogAdapter } from './legacyGenutriAdapter'
import { supabaseCatalogAdapter } from './supabaseCatalogAdapter'
import type { CatalogDatasetStats, FoodCatalogRepository } from './types'

let activeRepository: FoodCatalogRepository = legacyGenutriCatalogAdapter

export function resolveCatalogRepository(): FoodCatalogRepository {
  if (isNutritionFeatureEnabled('nutrition_catalog_v2')) {
    activeRepository = supabaseCatalogAdapter
  } else {
    activeRepository = legacyGenutriCatalogAdapter
  }
  return activeRepository
}

export function getActiveCatalogRepository(): FoodCatalogRepository {
  return activeRepository
}

/** Estatísticas centralizadas — substitui contadores estáticos na UI. */
export function getCatalogDatasetStats(): CatalogDatasetStats {
  if (isNutritionFeatureEnabled('nutrition_catalog_v2')) {
    return getLegacyCatalogStats()
  }
  return getLegacyCatalogStats()
}

export async function getFoodDetailsWithFallback(id: string) {
  const repo = resolveCatalogRepository()
  const fromPrimary = await repo.getById(id)
  if (fromPrimary) return fromPrimary
  return legacyGenutriCatalogAdapter.getById(id)
}
