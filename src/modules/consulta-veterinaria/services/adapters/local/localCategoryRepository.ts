import { categoriesSeed } from '../../../data/seed/categories.seed'
import type { CategoryRepository } from '../../repositories/category.repository'

export class LocalCategoryRepository implements CategoryRepository {
  async list() { return categoriesSeed }
  async getBySlug(slug: string) { return categoriesSeed.find((item) => item.slug === slug) || null }
}
