import { CatalogCache } from '../../catalogCache';
import { supabase } from '@/src/lib/supabaseClient';
import { loadMedicationsEditorialSeed } from '../../../data/seed/editorialSeedLazy';
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

  parseError,
  slugify,
  withTimeout,
} from './editorialSupabaseUtils';
import {
  CategoryRow,
  DiseaseMedicationRow,
  DiseaseRow,
  MedicationRow,
  mapCategoryRow,
  mapMedicationRow,
} from './editorialRecordMappers';
import { filterPublicMedications } from '../../../constants/publicCatalog';
import { applyMedicationBookFoundations } from '../../../data/medicationBookFoundations';

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

function mergeMedicationSeedWithRemote(
  localItems: MedicationRecord[],
  supabaseItems: MedicationRecord[]
): MedicationRecord[] {
  const localBySlug = new Map<string, MedicationRecord>();
  localItems.forEach((item) => {
    localBySlug.set(item.slug, item);
  });

  const remoteSlugs = new Set<string>();
  const mergedRemotes = supabaseItems.map((remote) => {
    remoteSlugs.add(remote.slug);
    const local = localBySlug.get(remote.slug);
    if (!local) return remote;

    return {
      ...local,
      ...remote,
      quickIndications: remote.quickIndications && remote.quickIndications.length > 0 ? remote.quickIndications : local.quickIndications,
      detailedIndications: remote.detailedIndications && remote.detailedIndications.length > 0 ? remote.detailedIndications : local.detailedIndications,
      pharmacokineticsData: remote.pharmacokineticsData || local.pharmacokineticsData,
      attentionData: remote.attentionData || local.attentionData,
      generalInfoData: remote.generalInfoData || local.generalInfoData,
      clinicalStudiesCommented: remote.clinicalStudiesCommented && remote.clinicalStudiesCommented.length > 0 ? remote.clinicalStudiesCommented : local.clinicalStudiesCommented,
      monitoringParameters: remote.monitoringParameters && remote.monitoringParameters.length > 0 ? remote.monitoringParameters : local.monitoringParameters,
      clientInformation: remote.clientInformation && remote.clientInformation.length > 0 ? remote.clientInformation : local.clientInformation,
      samplePrescriptionText: remote.samplePrescriptionText || local.samplePrescriptionText,
      practicalWeightTable: remote.practicalWeightTable || local.practicalWeightTable,
      pillars: remote.pillars && remote.pillars.length > 0 ? remote.pillars : local.pillars,
      quickSummaryHighlights: remote.quickSummaryHighlights && remote.quickSummaryHighlights.length > 0 ? remote.quickSummaryHighlights : local.quickSummaryHighlights,
      clinicalFoundationsData: remote.clinicalFoundationsData && remote.clinicalFoundationsData.length > 0 ? remote.clinicalFoundationsData : local.clinicalFoundationsData,
      clinicalWarningItems: remote.clinicalWarningItems && remote.clinicalWarningItems.length > 0 ? remote.clinicalWarningItems : local.clinicalWarningItems,
      doses: (local.doses?.length || 0) >= (remote.doses?.length || 0) ? local.doses : remote.doses,
      presentations: (local.presentations?.length || 0) >= (remote.presentations?.length || 0) ? local.presentations : remote.presentations,
      references: mergeUniqueReferences(local.references, remote.references),
      source: 'supabase' as const,
    };
  });

  const remainingLocals = localItems.filter((local) => !remoteSlugs.has(local.slug));
  return [...remainingLocals, ...mergedRemotes];
}

function mergeUniqueReferences(
  localRefs?: MedicationRecord['references'],
  remoteRefs?: MedicationRecord['references']
): MedicationRecord['references'] {
  if (!localRefs && !remoteRefs) return undefined;
  const list = [...(localRefs || [])];
  const seenIds = new Set(list.map((r) => r.id).filter(Boolean));
  const seenCitations = new Set(list.map((r) => r.citationText).filter(Boolean));

  (remoteRefs || []).forEach((r) => {
    if ((r.id && seenIds.has(r.id)) || (r.citationText && seenCitations.has(r.citationText))) {
      return;
    }
    list.push(r);
  });
  return list;
}

export class SupabaseMedicationRepository implements MedicationRepository {
  private readonly listCache = new CatalogCache<MedicationRecord[]>();

  async list(options?: { includeDrafts?: boolean }): Promise<MedicationRecord[]> {
    if (!hasSupabaseEnv()) {
      return localMedicationRepository.list(options);
    }

    const includeDrafts = Boolean(options?.includeDrafts);
    return this.listCache.load(includeDrafts, async () => {
      try {
        const [remote, medicationsSeed] = await Promise.all([
          withTimeout(fetchSupabaseMedications(includeDrafts), 'carregar medicamentos editoriais'),
          loadMedicationsEditorialSeed(),
        ]);
        const merged = mergeMedicationSeedWithRemote(medicationsSeed, remote).map(applyMedicationBookFoundations).sort((left, right) =>
          left.title.localeCompare(right.title, 'pt-BR')
        );
        const result = filterPublicMedications(merged, includeDrafts);

        return result;
      } catch {
        return filterPublicMedications(await loadMedicationsEditorialSeed(), includeDrafts);
      }
    });
  }

  async getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<MedicationRecord | null> {
    const items = await this.list(options);
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
      official_site_url: String(input.officialSiteUrl || '').trim() || null,
      leaflet_url: String(input.leafletUrl || '').trim() || null,
      image_url: String(input.imageUrl || '').trim() || null,
      price_reference_amount_brl: input.priceReference?.amountBrl ?? null,
      price_reference_label: input.priceReference?.label?.trim() || null,
      price_reference_presentation: input.priceReference?.presentation?.trim() || null,
      price_reference_source_name: input.priceReference?.sourceName?.trim() || null,
      price_reference_source_url: input.priceReference?.sourceUrl?.trim() || null,
      price_reference_checked_at: input.priceReference?.checkedAt || null,
      price_reference_notes: input.priceReference?.notes?.trim() || null,
      pharmacologic_class: input.pharmacologicClass,
      species: cleanTextArray(input.species),
      tags: cleanTextArray(input.tags),
      mechanism_of_action: input.mechanismOfAction,
      plain_language_summary: String(input.plainLanguageSummary || '').trim() || null,
      indications: cleanTextArray(input.indications),
      contraindications: cleanTextArray(input.contraindications),
      cautions: cleanTextArray(input.cautions),
      adverse_effects: cleanTextArray(input.adverseEffects),
      interactions: cleanTextArray(input.interactions || []),
      routes: cleanTextArray(input.routes || []),
      doses: input.doses,
      presentations: input.presentations,
      clinical_notes_rich_text: input.clinicalNotesRichText,
      clinical_structured_blocks: input.clinicalStructuredBlocks ?? null,
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

    this.listCache.clear();
    const result = await this.getBySlug(normalizedSlug, { includeDrafts: true });
    if (!result) {
      throw new Error('Medicamento salvo, mas não foi possível reler o registro editorial.');
    }

    return result;
  }
}

export const supabaseMedicationRepository = new SupabaseMedicationRepository();
