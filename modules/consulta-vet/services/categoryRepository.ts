import type { CategoryRepository } from './repositories/category.repository';
import { localCategoryRepository } from './adapters/local/localCategoryRepository';
import { supabaseCategoryRepository } from './adapters/supabase/supabaseCategoryRepository';
import { hasSupabaseEnv } from './adapters/supabase/editorialSupabaseUtils';

export function getCategoryRepository(): CategoryRepository {
  return hasSupabaseEnv() ? supabaseCategoryRepository : localCategoryRepository;
}
