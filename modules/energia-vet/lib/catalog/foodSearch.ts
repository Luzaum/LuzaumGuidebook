import type { FoodSearchInput } from './types'
import { resolveCatalogRepository } from './catalogResolver'

export async function searchFoodCatalog(input: FoodSearchInput) {
  const repo = resolveCatalogRepository()
  return repo.search(input)
}

export async function getFoodCatalogEntry(id: string) {
  const repo = resolveCatalogRepository()
  return repo.getById(id)
}
