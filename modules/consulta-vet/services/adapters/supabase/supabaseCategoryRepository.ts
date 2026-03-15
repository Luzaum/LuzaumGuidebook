import { Category } from '../../../types/category';
import { CategoryUpsertInput } from '../../../types/editorial';
import { categoriesSeed } from '../../../data/seed/categories.seed';
import { CategoryRepository } from '../../repositories/category.repository';
import { localCategoryRepository } from '../local/localCategoryRepository';
import {
  CONSULTA_VET_CATEGORY_TABLE,
  ensureOwnerUserId,
  hasSupabaseEnv,
  mergeBySlug,
  parseError,
  slugify,
  withTimeout,
} from './editorialSupabaseUtils';
import { supabase } from '@/src/lib/supabaseClient';
import { CategoryRow, mapCategoryRow } from './editorialRecordMappers';

export class SupabaseCategoryRepository implements CategoryRepository {
  async list(options?: { includeDrafts?: boolean }): Promise<Category[]> {
    if (!hasSupabaseEnv()) {
      return localCategoryRepository.list();
    }

    try {
      let query = supabase
        .from(CONSULTA_VET_CATEGORY_TABLE)
        .select('*')
        .order('sort_order', { ascending: true })
        .order('title', { ascending: true });

      if (!options?.includeDrafts) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await withTimeout(query, 'carregar categorias editoriais');

      if (error) {
        console.warn('[ConsultaVet] category fallback', error);
        return localCategoryRepository.list();
      }

      const supabaseItems = ((data || []) as CategoryRow[]).map(mapCategoryRow);
      return mergeBySlug(categoriesSeed, supabaseItems).sort((a, b) => a.sortOrder - b.sortOrder);
    } catch (error) {
      console.warn('[ConsultaVet] category fallback', error);
      return localCategoryRepository.list();
    }
  }

  async getBySlug(slug: string): Promise<Category | null> {
    const items = await this.list();
    return items.find((item) => item.slug === slug) || null;
  }

  async upsert(input: CategoryUpsertInput): Promise<Category> {
    if (!hasSupabaseEnv()) {
      throw new Error('Supabase nao configurado para edicao editorial.');
    }

    const userId = await ensureOwnerUserId();
    const slug = slugify(input.slug || input.title, 'categoria');

    const { data: existing, error: existingError } = await supabase
      .from(CONSULTA_VET_CATEGORY_TABLE)
      .select('id, created_by')
      .eq('slug', slug)
      .maybeSingle();

    if (existingError) {
      throw new Error(`Falha ao validar categoria: ${parseError(existingError)}`);
    }

    const payload = {
      id: input.id && /^[0-9a-f-]{36}$/i.test(input.id) ? input.id : existing?.id,
      slug,
      title: input.title.trim(),
      description: String(input.description || '').trim() || null,
      sort_order: Number.isFinite(input.sortOrder) ? input.sortOrder : 0,
      is_published: input.isPublished ?? true,
      created_by: existing?.created_by || userId,
      updated_by: userId,
    };

    const { data, error } = await supabase
      .from(CONSULTA_VET_CATEGORY_TABLE)
      .upsert(payload, { onConflict: 'slug' })
      .select('*')
      .single();

    if (error) {
      throw new Error(`Falha ao salvar categoria: ${parseError(error)}`);
    }

    return mapCategoryRow(data as CategoryRow);
  }
}

export const supabaseCategoryRepository = new SupabaseCategoryRepository();
