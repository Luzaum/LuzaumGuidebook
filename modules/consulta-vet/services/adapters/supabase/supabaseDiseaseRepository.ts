import { supabase } from '@/src/lib/supabaseClient';
import { diseasesSeed } from '../../../data/seed/diseases.seed';
import { DiseaseRecord } from '../../../types/disease';
import { DiseaseUpsertInput } from '../../../types/editorial';
import { DiseaseRepository } from '../../repositories/disease.repository';
import { localDiseaseRepository } from '../local/localDiseaseRepository';
import {
  CONSULTA_VET_CATEGORY_TABLE,
  CONSULTA_VET_DISEASE_CONSENSO_TABLE,
  CONSULTA_VET_DISEASE_MEDICATION_TABLE,
  CONSULTA_VET_DISEASE_TABLE,
  CONSULTA_VET_MEDICATION_TABLE,
  ensureOwnerUserId,
  hasSupabaseEnv,
  mergeBySlug,
  parseError,
  slugify,
  withTimeout,
} from './editorialSupabaseUtils';
import {
  CategoryRow,
  DiseaseConsensoRow,
  DiseaseMedicationRow,
  DiseaseRow,
  MedicationRow,
  mapCategoryRow,
  mapDiseaseRow,
} from './editorialRecordMappers';
import { buildSupabaseDiseasePayload, cleanTextArrayForDb } from '../../../utils/diseaseSchemaMap';
import { filterPublicDiseases } from '../../../constants/publicCatalog';

type ConsensusSlugRow = {
  id: string;
  slug: string;
};

function matchesDiseaseQuery(record: DiseaseRecord, query: string): boolean {
  const normalized = query.toLowerCase();
  return (
    record.title.toLowerCase().includes(normalized) ||
    record.synonyms.some((item) => item.toLowerCase().includes(normalized)) ||
    record.tags.some((item) => item.toLowerCase().includes(normalized))
  );
}

async function fetchSupabaseDiseases(includeDrafts = false): Promise<DiseaseRecord[]> {
  const categoryQuery = supabase.from(CONSULTA_VET_CATEGORY_TABLE).select('*');
  const diseaseQuery = supabase.from(CONSULTA_VET_DISEASE_TABLE).select('*').order('title');

  const [{ data: categoryData, error: categoryError }, { data: diseaseData, error: diseaseError }] = await Promise.all([
    includeDrafts ? categoryQuery : categoryQuery.eq('is_published', true),
    includeDrafts ? diseaseQuery : diseaseQuery.eq('is_published', true),
  ]);

  if (categoryError) {
    throw new Error(`Falha ao carregar categorias editoriais: ${parseError(categoryError)}`);
  }
  if (diseaseError) {
    throw new Error(`Falha ao carregar doenças editoriais: ${parseError(diseaseError)}`);
  }

  const diseaseRows = (diseaseData || []) as DiseaseRow[];
  if (diseaseRows.length === 0) {
    return [];
  }

  const diseaseIds = diseaseRows.map((row) => row.id);
  const [
    { data: medicationData, error: medicationError },
    { data: diseaseMedicationData, error: diseaseMedicationError },
    { data: diseaseConsensoData, error: diseaseConsensoError },
    { data: consensoData, error: consensoError },
  ] = await Promise.all([
    includeDrafts
      ? supabase.from(CONSULTA_VET_MEDICATION_TABLE).select('id, slug')
      : supabase.from(CONSULTA_VET_MEDICATION_TABLE).select('id, slug').eq('is_published', true),
    supabase.from(CONSULTA_VET_DISEASE_MEDICATION_TABLE).select('disease_id, medication_id').in('disease_id', diseaseIds),
    supabase.from(CONSULTA_VET_DISEASE_CONSENSO_TABLE).select('disease_id, consensus_document_id').in('disease_id', diseaseIds),
    includeDrafts
      ? supabase.from('consensus_documents').select('id, slug')
      : supabase.from('consensus_documents').select('id, slug').eq('is_published', true),
  ]);

  if (medicationError) {
    throw new Error(`Falha ao carregar relações doença-medicamento: ${parseError(medicationError)}`);
  }
  if (diseaseMedicationError) {
    throw new Error(`Falha ao carregar vínculos de medicamentos: ${parseError(diseaseMedicationError)}`);
  }
  if (diseaseConsensoError) {
    throw new Error(`Falha ao carregar vínculos de consensos: ${parseError(diseaseConsensoError)}`);
  }
  if (consensoError) {
    throw new Error(`Falha ao carregar consensos relacionados: ${parseError(consensoError)}`);
  }

  const categoryById = new Map(
    ((categoryData || []) as CategoryRow[]).map((row) => [row.id, mapCategoryRow(row)])
  );
  const medicationSlugById = new Map(
    ((medicationData || []) as Pick<MedicationRow, 'id' | 'slug'>[]).map((row) => [row.id, row.slug])
  );
  const consensoSlugById = new Map(
    ((consensoData || []) as ConsensusSlugRow[]).map((row) => [row.id, row.slug])
  );

  const medicationLinks = new Map<string, string[]>();
  ((diseaseMedicationData || []) as DiseaseMedicationRow[]).forEach((row) => {
    const slug = medicationSlugById.get(row.medication_id);
    if (!slug) return;
    const current = medicationLinks.get(row.disease_id) || [];
    current.push(slug);
    medicationLinks.set(row.disease_id, current);
  });

  const consensoLinks = new Map<string, string[]>();
  ((diseaseConsensoData || []) as DiseaseConsensoRow[]).forEach((row) => {
    const slug = consensoSlugById.get(row.consensus_document_id);
    if (!slug) return;
    const current = consensoLinks.get(row.disease_id) || [];
    current.push(slug);
    consensoLinks.set(row.disease_id, current);
  });

  return diseaseRows.map((row) =>
    mapDiseaseRow(
      row,
      categoryById.get(row.category_id || '')?.slug || 'sem-categoria',
      medicationLinks.get(row.id) || [],
      consensoLinks.get(row.id) || []
    )
  );
}

export class SupabaseDiseaseRepository implements DiseaseRepository {
  async list(options?: { includeDrafts?: boolean }): Promise<DiseaseRecord[]> {
    if (!hasSupabaseEnv()) {
      return localDiseaseRepository.list(options);
    }

    try {
      const remote = await withTimeout(
        fetchSupabaseDiseases(Boolean(options?.includeDrafts)),
        'carregar doenças editoriais'
      );
      const merged = mergeBySlug(diseasesSeed, remote).sort((left, right) =>
        left.title.localeCompare(right.title, 'pt-BR')
      );
      return filterPublicDiseases(merged, Boolean(options?.includeDrafts));
    } catch {
      return localDiseaseRepository.list(options);
    }
  }

  async getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<DiseaseRecord | null> {
    const items = await this.list(options);
    return items.find((item) => item.slug === slug) || null;
  }

  async search(query: string): Promise<DiseaseRecord[]> {
    const normalized = String(query || '').trim();
    if (!normalized) return this.list();
    const items = await this.list();
    return items.filter((item) => matchesDiseaseQuery(item, normalized));
  }

  async listByCategory(categorySlug: string): Promise<DiseaseRecord[]> {
    const items = await this.list();
    return items.filter((item) => item.category === categorySlug);
  }

  async upsert(input: DiseaseUpsertInput): Promise<DiseaseRecord> {
    if (!hasSupabaseEnv()) {
      return localDiseaseRepository.upsert(input);
    }

    const userId = await ensureOwnerUserId();
    const normalizedSlug = slugify(input.slug || input.title, 'doenca');
    const categorySlug = String(input.category || '').trim();

    const { data: categoryRow, error: categoryError } = await supabase
      .from(CONSULTA_VET_CATEGORY_TABLE)
      .select('id, slug')
      .eq('slug', categorySlug)
      .maybeSingle();

    if (categoryError) {
      throw new Error(`Falha ao validar categoria: ${parseError(categoryError)}`);
    }

    const { data: existingRow, error: existingError } = await supabase
      .from(CONSULTA_VET_DISEASE_TABLE)
      .select('id, created_by')
      .eq('slug', normalizedSlug)
      .maybeSingle();

    if (existingError) {
      throw new Error(`Falha ao validar doença existente: ${parseError(existingError)}`);
    }

    const payload = buildSupabaseDiseasePayload(input, {
      categoryId: categoryRow?.id || null,
      normalizedSlug,
      userId,
      existingCreatedBy: existingRow?.created_by,
    });

    const { data: savedRow, error: upsertError } = await supabase
      .from(CONSULTA_VET_DISEASE_TABLE)
      .upsert(payload, { onConflict: 'slug' })
      .select('*')
      .single();

    if (upsertError) {
      throw new Error(`Falha ao salvar doença editorial: ${parseError(upsertError)}`);
    }

    const diseaseId = (savedRow as DiseaseRow).id;
    const medicationSlugs = cleanTextArrayForDb(input.relatedMedicationSlugs);
    const consensoSlugs = cleanTextArrayForDb(input.relatedConsensusSlugs);

    const { error: deleteMedicationLinksError } = await supabase
      .from(CONSULTA_VET_DISEASE_MEDICATION_TABLE)
      .delete()
      .eq('disease_id', diseaseId);

    if (deleteMedicationLinksError) {
      throw new Error(`Falha ao atualizar vínculos de medicamentos: ${parseError(deleteMedicationLinksError)}`);
    }

    if (medicationSlugs.length > 0) {
      const { data: medicationRows, error: medicationRowsError } = await supabase
        .from(CONSULTA_VET_MEDICATION_TABLE)
        .select('id, slug')
        .in('slug', medicationSlugs);

      if (medicationRowsError) {
        throw new Error(`Falha ao resolver medicamentos relacionados: ${parseError(medicationRowsError)}`);
      }

      const medicationLinks = ((medicationRows || []) as Pick<MedicationRow, 'id' | 'slug'>[]).map((row) => ({
        disease_id: diseaseId,
        medication_id: row.id,
      }));

      if (medicationLinks.length > 0) {
        const { error: insertMedicationLinksError } = await supabase
          .from(CONSULTA_VET_DISEASE_MEDICATION_TABLE)
          .insert(medicationLinks);

        if (insertMedicationLinksError) {
          throw new Error(`Falha ao salvar vínculos de medicamentos: ${parseError(insertMedicationLinksError)}`);
        }
      }
    }

    const { error: deleteConsensoLinksError } = await supabase
      .from(CONSULTA_VET_DISEASE_CONSENSO_TABLE)
      .delete()
      .eq('disease_id', diseaseId);

    if (deleteConsensoLinksError) {
      throw new Error(`Falha ao atualizar vínculos de consensos: ${parseError(deleteConsensoLinksError)}`);
    }

    if (consensoSlugs.length > 0) {
      const { data: consensoRows, error: consensoRowsError } = await supabase
        .from('consensus_documents')
        .select('id, slug')
        .in('slug', consensoSlugs);

      if (consensoRowsError) {
        throw new Error(`Falha ao resolver consensos relacionados: ${parseError(consensoRowsError)}`);
      }

      const consensoLinks = ((consensoRows || []) as ConsensusSlugRow[]).map((row) => ({
        disease_id: diseaseId,
        consensus_document_id: row.id,
      }));

      if (consensoLinks.length > 0) {
        const { error: insertConsensoLinksError } = await supabase
          .from(CONSULTA_VET_DISEASE_CONSENSO_TABLE)
          .insert(consensoLinks);

        if (insertConsensoLinksError) {
          throw new Error(`Falha ao salvar vínculos de consensos: ${parseError(insertConsensoLinksError)}`);
        }
      }
    }

    const result = await this.getBySlug(normalizedSlug, { includeDrafts: true });
    if (!result) {
      throw new Error('Doença salva, mas não foi possível reler o registro editorial.');
    }

    return result;
  }
}

export const supabaseDiseaseRepository = new SupabaseDiseaseRepository();
