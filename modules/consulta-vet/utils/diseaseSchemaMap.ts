import { DiseaseUpsertInput } from '../types/editorial';
import { DiseaseRecord } from '../types/disease';
import { EditorialSectionValue } from '../types/common';
import { mergeDiseaseDiagnosticSections } from './diseaseDiagnosticMerge';
import {
  normalizeReferences,
  normalizeSectionValue,
  normalizeSpeciesArray,
  normalizeStringArray,
} from '../services/adapters/supabase/editorialSupabaseUtils';
import type { DiseaseRow } from '../services/adapters/supabase/diseaseRow.types';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return Boolean(v && typeof v === 'object' && !Array.isArray(v));
}

function isSectionEmpty(value: EditorialSectionValue | undefined): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return !String(value).trim();
  if (Array.isArray(value)) return value.length === 0;
  if (isPlainObject(value)) return Object.keys(value).length === 0;
  return false;
}

export function cleanTextArrayForDb(values: string[]): string[] {
  return values.map((v) => String(v || '').trim()).filter(Boolean);
}

function mergeIntroductionIntoEtiology(
  introduction: EditorialSectionValue,
  etiology: EditorialSectionValue
): EditorialSectionValue {
  if (isSectionEmpty(introduction)) return etiology;
  if (isSectionEmpty(etiology)) return introduction;
  if (isPlainObject(etiology)) {
    return { introducaoOuContexto: introduction, ...etiology } as EditorialSectionValue;
  }
  return {
    introducaoOuContexto: introduction,
    etiologia: etiology,
  } as EditorialSectionValue;
}

function mergeClinicalLegacy(
  clinical: EditorialSectionValue,
  physical: EditorialSectionValue
): EditorialSectionValue {
  if (isSectionEmpty(physical)) return clinical;
  if (isSectionEmpty(clinical)) return physical;
  if (isPlainObject(clinical) && isPlainObject(physical)) {
    return { ...clinical, exameFisico: physical } as EditorialSectionValue;
  }
  return {
    sinaisClinicosCorrelacaoFisiopatologica: clinical,
    exameFisico: physical,
  } as EditorialSectionValue;
}

function mergeTreatmentLegacy(
  treatment: EditorialSectionValue,
  prognosis: EditorialSectionValue,
  complications: EditorialSectionValue
): EditorialSectionValue {
  const hasP = !isSectionEmpty(prognosis);
  const hasC = !isSectionEmpty(complications);
  if (!hasP && !hasC) return treatment;
  if (isPlainObject(treatment)) {
    return {
      ...treatment,
      ...(hasP ? { prognostico: prognosis } : {}),
      ...(hasC ? { complicacoes: complications } : {}),
    } as EditorialSectionValue;
  }
  return {
    tratamentoEPrioridades: treatment,
    ...(hasP ? { prognostico: prognosis } : {}),
    ...(hasC ? { complicacoes: complications } : {}),
  } as EditorialSectionValue;
}

function buildQuickDecisionStrip(row: DiseaseRow): string[] {
  const lines = [
    ...normalizeStringArray(row.thirty_second_view),
    ...normalizeStringArray(row.when_to_suspect),
  ]
    .map((s) => s.trim())
    .filter(Boolean);
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const line of lines) {
    if (seen.has(line)) continue;
    seen.add(line);
    unique.push(line);
    if (unique.length >= 5) break;
  }
  return unique;
}

/**
 * Converte linha Supabase (colunas legadas) para o modelo editorial atual (9 blocos).
 */
export function mapLegacyDiseaseRowToRecord(
  row: DiseaseRow,
  categorySlug: string,
  relatedMedicationSlugs: string[],
  relatedConsensusSlugs: string[]
): DiseaseRecord {
  const intro = normalizeSectionValue(row.introduction);
  const etio = normalizeSectionValue(row.etiology);
  const diagnosisMerged = mergeDiseaseDiagnosticSections(
    normalizeSectionValue(row.diagnostics),
    normalizeSectionValue(row.diagnostic_approach)
  );

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    synonyms: normalizeStringArray(row.synonyms),
    species: normalizeSpeciesArray(row.species),
    category: categorySlug,
    tags: normalizeStringArray(row.tags),
    quickSummary: String(row.quick_summary || '').trim(),
    quickDecisionStrip: buildQuickDecisionStrip(row),
    etiology: mergeIntroductionIntoEtiology(intro, etio),
    epidemiology: normalizeSectionValue(row.epidemiology),
    pathogenesisTransmission: normalizeSectionValue(row.transmission),
    pathophysiology: normalizeSectionValue(row.pathophysiology),
    clinicalSignsPathophysiology: mergeClinicalLegacy(
      normalizeSectionValue(row.clinical_presentation),
      normalizeSectionValue(row.physical_exam)
    ),
    diagnosis: (diagnosisMerged ?? '') as EditorialSectionValue,
    treatment: mergeTreatmentLegacy(
      normalizeSectionValue(row.treatment),
      normalizeSectionValue(row.prognosis),
      normalizeSectionValue(row.complications)
    ),
    prevention: normalizeSectionValue(row.prevention),
    relatedMedicationSlugs,
    relatedConsensusSlugs,
    references: normalizeReferences(row.references),
    isPublished: row.is_published,
    source: 'supabase',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function buildSupabaseDiseasePayload(
  input: DiseaseUpsertInput,
  options: {
    categoryId: string | null;
    normalizedSlug: string;
    userId: string;
    existingCreatedBy?: string | null;
  }
) {
  const strip = cleanTextArrayForDb(input.quickDecisionStrip || []).slice(0, 5);

  return {
    category_id: options.categoryId,
    slug: options.normalizedSlug,
    title: input.title,
    synonyms: cleanTextArrayForDb(input.synonyms),
    species: cleanTextArrayForDb(input.species),
    tags: cleanTextArrayForDb(input.tags),
    quick_summary: String(input.quickSummary || '').trim(),
    thirty_second_view: strip,
    do_not_forget: [] as string[],
    when_to_suspect: [] as string[],
    initial_conduct: [] as string[],
    high_yield_tests: [] as string[],
    dog_vs_cat_differences: [] as string[],
    common_mistakes: [] as string[],
    red_flags: [] as string[],
    clinical_pearls: [] as string[],
    introduction: '',
    etiology: input.etiology,
    transmission: input.pathogenesisTransmission,
    pathophysiology: input.pathophysiology,
    epidemiology: input.epidemiology,
    clinical_presentation: input.clinicalSignsPathophysiology,
    physical_exam: null,
    differential_diagnoses: null,
    diagnostics: input.diagnosis,
    diagnostic_approach: null,
    treatment: input.treatment,
    prognosis: null,
    complications: null,
    prevention: input.prevention,
    references: input.references || [],
    is_published: input.isPublished ?? true,
    created_by: options.existingCreatedBy || options.userId,
    updated_by: options.userId,
  };
}
