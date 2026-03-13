import { Category } from '../../types/category';
import { CategoryUpsertInput } from '../../types/editorial';

export interface CategoryRepository {
  list(options?: { includeDrafts?: boolean }): Promise<Category[]>;
  getBySlug(slug: string): Promise<Category | null>;
  upsert(input: CategoryUpsertInput): Promise<Category>;
}
