import { Category } from '../../../types/category';
import { DiseaseRecord } from '../../../types/disease';
import { MedicationDose, MedicationPresentation, MedicationRecord } from '../../../types/medication';
import {
  normalizeReferences,
  normalizeSectionValue,
  normalizeSpeciesArray,
  normalizeStringArray,
} from './editorialSupabaseUtils';

export type CategoryRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type DiseaseRow = {
  id: string;
  category_id: string | null;
  slug: string;
  title: string;
  synonyms: string[] | null;
  species: string[] | null;
  tags: string[] | null;
  quick_summary: string;
  thirty_second_view: string[] | null;
  do_not_forget: string[] | null;
  when_to_suspect: string[] | null;
  initial_conduct: string[] | null;
  high_yield_tests: string[] | null;
  dog_vs_cat_differences: string[] | null;
  common_mistakes: string[] | null;
  red_flags: string[] | null;
  clinical_pearls: string[] | null;
  introduction: unknown;
  etiology: unknown;
  transmission: unknown;
  pathophysiology: unknown;
  epidemiology: unknown;
  clinical_presentation: unknown;
  physical_exam: unknown;
  differential_diagnoses: unknown;
  diagnostics: unknown;
  diagnostic_approach: unknown;
  treatment: unknown;
  prognosis: unknown;
  complications: unknown;
  prevention: unknown;
  references: unknown;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type MedicationRow = {
  id: string;
  category_id: string | null;
  slug: string;
  title: string;
  active_ingredient: string;
  trade_names: string[] | null;
  pharmacologic_class: string;
  species: string[] | null;
  tags: string[] | null;
  mechanism_of_action: string;
  indications: string[] | null;
  contraindications: string[] | null;
  cautions: string[] | null;
  adverse_effects: string[] | null;
  interactions: string[] | null;
  routes: string[] | null;
  doses: unknown;
  presentations: unknown;
  clinical_notes_rich_text: string;
  admin_notes_text: string;
  references: unknown;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type DiseaseMedicationRow = {
  disease_id: string;
  medication_id: string;
};

export type DiseaseConsensoRow = {
  disease_id: string;
  consensus_document_id: string;
};

export function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    sortOrder: row.sort_order,
    isPublished: row.is_published,
    source: 'supabase',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapDiseaseRow(
  row: DiseaseRow,
  categorySlug: string,
  relatedMedicationSlugs: string[],
  relatedConsensusSlugs: string[]
): DiseaseRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    synonyms: normalizeStringArray(row.synonyms),
    species: normalizeSpeciesArray(row.species),
    category: categorySlug,
    tags: normalizeStringArray(row.tags),
    quickSummary: String(row.quick_summary || '').trim(),
    thirtySecondView: normalizeStringArray(row.thirty_second_view),
    doNotForget: normalizeStringArray(row.do_not_forget),
    whenToSuspect: normalizeStringArray(row.when_to_suspect),
    initialConduct: normalizeStringArray(row.initial_conduct),
    highYieldTests: normalizeStringArray(row.high_yield_tests),
    dogVsCatDifferences: normalizeStringArray(row.dog_vs_cat_differences),
    commonMistakes: normalizeStringArray(row.common_mistakes),
    redFlags: normalizeStringArray(row.red_flags),
    clinicalPearls: normalizeStringArray(row.clinical_pearls),
    introduction: normalizeSectionValue(row.introduction),
    etiology: normalizeSectionValue(row.etiology),
    transmission: normalizeSectionValue(row.transmission),
    pathophysiology: normalizeSectionValue(row.pathophysiology),
    epidemiology: normalizeSectionValue(row.epidemiology),
    clinicalPresentation: normalizeSectionValue(row.clinical_presentation),
    physicalExam: normalizeSectionValue(row.physical_exam),
    differentialDiagnoses: normalizeSectionValue(row.differential_diagnoses),
    diagnostics: normalizeSectionValue(row.diagnostics),
    diagnosticApproach: normalizeSectionValue(row.diagnostic_approach),
    treatment: normalizeSectionValue(row.treatment),
    prognosis: normalizeSectionValue(row.prognosis),
    complications: normalizeSectionValue(row.complications),
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

export function mapMedicationRow(
  row: MedicationRow,
  categorySlug: string,
  relatedDiseaseSlugs: string[]
): MedicationRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    activeIngredient: row.active_ingredient,
    tradeNames: normalizeStringArray(row.trade_names),
    pharmacologicClass: row.pharmacologic_class,
    species: normalizeSpeciesArray(row.species),
    category: categorySlug,
    tags: normalizeStringArray(row.tags),
    mechanismOfAction: row.mechanism_of_action,
    indications: normalizeStringArray(row.indications),
    contraindications: normalizeStringArray(row.contraindications),
    cautions: normalizeStringArray(row.cautions),
    adverseEffects: normalizeStringArray(row.adverse_effects),
    interactions: normalizeStringArray(row.interactions),
    routes: normalizeStringArray(row.routes),
    doses: Array.isArray(row.doses) ? (row.doses as MedicationDose[]) : [],
    presentations: Array.isArray(row.presentations)
      ? (row.presentations as MedicationPresentation[])
      : [],
    clinicalNotesRichText: row.clinical_notes_rich_text,
    adminNotesText: row.admin_notes_text,
    relatedDiseaseSlugs,
    references: normalizeReferences(row.references),
    isPublished: row.is_published,
    source: 'supabase',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
