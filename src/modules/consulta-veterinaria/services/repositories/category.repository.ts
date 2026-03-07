import type { Category } from '../../types/category'

export interface CategoryRepository {
  list(): Promise<Category[]>
  getBySlug(slug: string): Promise<Category | null>
}

