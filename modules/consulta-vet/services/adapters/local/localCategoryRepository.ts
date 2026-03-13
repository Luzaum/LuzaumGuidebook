import { Category } from '../../../types/category';
import { CategoryUpsertInput } from '../../../types/editorial';
import { CategoryRepository } from '../../repositories/category.repository';
import { categoriesSeed } from '../../../data/seed/categories.seed';

export class LocalCategoryRepository implements CategoryRepository {
  async list(): Promise<Category[]> {
    return categoriesSeed.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getBySlug(slug: string): Promise<Category | null> {
    return categoriesSeed.find((c) => c.slug === slug) || null;
  }

  async upsert(_input: CategoryUpsertInput): Promise<Category> {
    throw new Error('Edicao editorial disponivel apenas com Supabase configurado.');
  }
}

export const localCategoryRepository = new LocalCategoryRepository();
export const categoryRepository = localCategoryRepository;
