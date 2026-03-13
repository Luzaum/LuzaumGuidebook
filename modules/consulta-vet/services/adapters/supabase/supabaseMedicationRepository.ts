import { supabase } from '@/src/lib/supabaseClient';
import { medicationsSeed } from '../../../data/seed/medications.seed';
import { MedicationRecord } from '../../../types/medication';
import { MedicationUpsertInput } from '../../../types/editorial';
import { MedicationRepository } from '../../repositories/medication.repository';
import { localMedicationRepository } from '../local/localMedicationRepository';
import {
  CONSULTA_VET_CATEGORY_TABLE,
  CONSULTA_VET_DISEASE_MEDICATION_TABLE,
  CONSULTA_VET_DISEASE_TABLE,
  CONSULTA_VET_MEDICATION_TABLE,
  ensureOwnerUserId,
  hasSupabaseEnv,
  mergeBySlug,
  parseError,
  slugify,
} from './editorialSupabaseUtils';
import {
  CategoryRow,
  DiseaseMedicationRow,
  DiseaseRow,
  MedicationRow,
  mapCategoryRow,
  mapMedicationRow,
} from './editorialRecordMappers';

function matchesMedicationQuery(record: MedicationRecord, query: string): boolean {
  const normalized = query.toLowerCase();
  return (
    record.title.toLowerCase().includes(normalized) ||
    record.activeIngredient.toLowerCase().includes(normalized) ||
    record.tradeNames.some((item) => item.toLowerCase().includes(normalized)) ||
    record.tags.some((item) => item.toLowerCase().includes(normalized))
  );
}

function cleanTextArray(values: string[]): string[] {
  return values.map((value) => String(value || '').trim()).filter(Boolean);
}

async function fetchSupabaseMedications(includeDrafts = false): Promise<MedicationRecord[]> {
  const categoryQuery = supabase.from(CONSULTA_VET_CATEGORY_TABLE).select('*');
  const medicationQuery = supabase.from(CONSULTA_VET_MEDICATION_TABLE).select('*').order('title');

  const [{ data: categoryData, error: categoryError }, { data: medicationData, error: medicationError }] = await Promise.all([
    includeDrafts ? categoryQuery : categoryQuery.eq('is_published', true),
    includeDrafts ? medicationQuery : medicationQuery.eq('is_published', true),
  ]);

  if (categoryError) {
    throw new Error(`Falha ao carregar categorias editoriais: ${parseError(categoryError)}`);
  }
  if (medicationError) {
    throw new Error(`Falha ao carregar medicamentos editoriais: ${parseError(medicationError)}`);
  }

  const medicationRows = (medicationData || []) as MedicationRow[];
  if (medicationRows.length === 0) {
    return [];
  }

  const medicationIds = medicationRows.map((row) => row.id);
  const [
    { data: diseaseData, error: diseaseError },
    { data: linkData, error: linkError },
  ] = await Promise.all([
    includeDrafts
      ? supabase.from(CONSULTA_VET_DISEASE_TABLE).select('id, slug')
      : supabase.from(CONSULTA_VET_DISEASE_TABLE).select('id, slug').eq('is_published', true),
    supabase.from(CONSULTA_VET_DISEASE_MEDICATION_TABLE).select('disease_id, medication_id').in('medication_id', medicationIds),
  ]);

  if (diseaseError) {
    throw new Error(`Falha ao carregar doenças relacionadas: ${parseError(diseaseError)}`);
  }
  if (linkError) {
    throw new Error(`Falha ao carregar vínculos de doenças: ${parseError(linkError)}`);
  }

  const categoryById = new Map(
    ((categoryData || []) as CategoryRow[]).map((row) => [row.id, mapCategoryRow(row)])
  );
  const diseaseSlugById = new Map(
    ((diseaseData || []) as Pick<DiseaseRow, 'id' | 'slug'>[]).map((row) => [row.id, row.slug])
  );
  const diseaseLinks = new Map<string, string[]>();

  ((linkData || []) as DiseaseMedicationRow[]).forEach((row) => {
    const slug = diseaseSlugById.get(row.disease_id);
    if (!slug) return;
    const current = diseaseLinks.get(row.medication_id) || [];
    current.push(slug);
    diseaseLinks.set(row.medication_id, current);
  });

  return medicationRows.map((row) =>
    mapMedicationRow(row, categoryById.get(row.category_id || '')?.slug || 'sem-categoria', diseaseLinks.get(row.id) || [])
  );
}

export class SupabaseMedicationRepository implements MedicationRepository {
  async list(options?: { includeDrafts?: boolean }): Promise<MedicationRecord[]> {
    if (!hasSupabaseEnv()) {
      return localMedicationRepository.list();
    }

    try {
      const remote = await fetchSupabaseMedications(Boolean(options?.includeDrafts));
      return mergeBySlug(medicationsSeed, remote).sort((left, right) =>
        left.title.localeCompare(right.title, 'pt-BR')
      );
    } catch {
      return localMedicationRepository.list();
    }
  }

  async getBySlug(slug: string): Promise<MedicationRecord | null> {
    const items = await this.list();
    return items.find((item) => item.slug === slug) || null;
  }

  async search(query: string): Promise<MedicationRecord[]> {
    const normalized = String(query || '').trim();
    if (!normalized) return this.list();
    const items = await this.list();
    return items.filter((item) => matchesMedicationQuery(item, normalized));
  }

  async listByCategory(categorySlug: string): Promise<MedicationRecord[]> {
    const items = await this.list();
    return items.filter((item) => item.category === categorySlug);
  }

  async upsert(input: MedicationUpsertInput): Promise<MedicationRecord> {
    if (!hasSupabaseEnv()) {
      return localMedicationRepository.upsert(input);
    }

    const userId = await ensureOwnerUserId();
    const normalizedSlug = slugify(input.slug || input.title, 'medicamento');
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
      .from(CONSULTA_VET_MEDICATION_TABLE)
      .select('id, created_by')
      .eq('slug', normalizedSlug)
      .maybeSingle();

    if (existingError) {
      throw new Error(`Falha ao validar medicamento existente: ${parseError(existingError)}`);
    }

    const payload = {
      category_id: categoryRow?.id || null,
      slug: normalizedSlug,
      title: input.title,
      active_ingredient: input.activeIngredient,
      trade_names: cleanTextArray(input.tradeNames),
      pharmacologic_class: input.pharmacologicClass,
      species: cleanTextArray(input.species),
      tags: cleanTextArray(input.tags),
      mechanism_of_action: input.mechanismOfAction,
      indications: cleanTextArray(input.indications),
      contraindications: cleanTextArray(input.contraindications),
      cautions: cleanTextArray(input.cautions),
      adverse_effects: cleanTextArray(input.adverseEffects),
      interactions: cleanTextArray(input.interactions || []),
      routes: cleanTextArray(input.routes || []),
      doses: input.doses,
      presentations: input.presentations,
      clinical_notes_rich_text: input.clinicalNotesRichText,
      admin_notes_text: String(input.adminNotesText || '').trim(),
      references: input.references || [],
      is_published: input.isPublished ?? true,
      created_by: existingRow?.created_by || userId,
      updated_by: userId,
    };

    const { data: savedRow, error: upsertError } = await supabase
      .from(CONSULTA_VET_MEDICATION_TABLE)
      .upsert(payload, { onConflict: 'slug' })
      .select('*')
      .single();

    if (upsertError) {
      throw new Error(`Falha ao salvar medicamento editorial: ${parseError(upsertError)}`);
    }

    const medicationId = (savedRow as MedicationRow).id;
    const diseaseSlugs = cleanTextArray(input.relatedDiseaseSlugs);

    const { error: deleteLinksError } = await supabase
      .from(CONSULTA_VET_DISEASE_MEDICATION_TABLE)
      .delete()
      .eq('medication_id', medicationId);

    if (deleteLinksError) {
      throw new Error(`Falha ao atualizar vínculos de doenças: ${parseError(deleteLinksError)}`);
    }

    if (diseaseSlugs.length > 0) {
      const { data: diseaseRows, error: diseaseRowsError } = await supabase
        .from(CONSULTA_VET_DISEASE_TABLE)
        .select('id, slug')
        .in('slug', diseaseSlugs);

      if (diseaseRowsError) {
        throw new Error(`Falha ao resolver doenças relacionadas: ${parseError(diseaseRowsError)}`);
      }

      const links = ((diseaseRows || []) as Pick<DiseaseRow, 'id' | 'slug'>[]).map((row) => ({
        disease_id: row.id,
        medication_id: medicationId,
      }));

      if (links.length > 0) {
        const { error: insertLinksError } = await supabase
          .from(CONSULTA_VET_DISEASE_MEDICATION_TABLE)
          .insert(links);

        if (insertLinksError) {
          throw new Error(`Falha ao salvar vínculos de doenças: ${parseError(insertLinksError)}`);
        }
      }
    }

    const result = await this.getBySlug(normalizedSlug);
    if (!result) {
      throw new Error('Medicamento salvo, mas não foi possível reler o registro editorial.');
    }

    return result;
  }
}

export const supabaseMedicationRepository = new SupabaseMedicationRepository();
