import { Category } from '../../../types/category';
import { CategoryRepository } from '../../repositories/category.repository';
import { categoriesSeed } from '../../../data/seed/categories.seed';

export class LocalCategoryRepository implements CategoryRepository {
  async list(): Promise<Category[]> {
    return categoriesSeed.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getBySlug(slug: string): Promise<Category | null> {
    return categoriesSeed.find((c) => c.slug === slug) || null;
  }
}

export const categoryRepository = new LocalCategoryRepository();
