import { Category } from '../../../types/category';
import { DiseaseRecord } from '../../../types/disease';
import {
  MedicationDose,
  MedicationPresentation,
  MedicationRecord,
  MedicationStructuredBlock,
  MedicationSupplyChannel,
} from '../../../types/medication';
import {
  normalizeReferences,
  normalizeSectionValue,
  normalizeSpeciesArray,
  normalizeStringArray,
} from './editorialSupabaseUtils';
import type { DiseaseRow } from './diseaseRow.types';
import { mapLegacyDiseaseRowToRecord } from '../../../utils/diseaseSchemaMap';

export type { DiseaseRow } from './diseaseRow.types';

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

export type MedicationRow = {
  id: string;
  category_id: string | null;
  slug: string;
  title: string;
  active_ingredient: string;
  trade_names: string[] | null;
  official_site_url?: string | null;
  leaflet_url?: string | null;
  image_url?: string | null;
  price_reference_amount_brl?: number | string | null;
  price_reference_label?: string | null;
  price_reference_presentation?: string | null;
  price_reference_source_name?: string | null;
  price_reference_source_url?: string | null;
  price_reference_checked_at?: string | null;
  price_reference_notes?: string | null;
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
  /** JSON opcional — tabelas e callouts; pode estar ausente em bases antigas. */
  clinical_structured_blocks?: unknown;
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
  return mapLegacyDiseaseRowToRecord(row, categorySlug, relatedMedicationSlugs, relatedConsensusSlugs);
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
    officialSiteUrl: row.official_site_url || null,
    leafletUrl: row.leaflet_url || null,
    imageUrl: row.image_url || null,
    priceReference: mapMedicationPriceReference(row),
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
      ? (row.presentations as MedicationPresentation[]).map((p) => ({
          ...p,
          channel: (p.channel || 'veterinary') as MedicationSupplyChannel,
        }))
      : [],
    clinicalNotesRichText: row.clinical_notes_rich_text,
    clinicalStructuredBlocks: parseMedicationStructuredBlocks(row.clinical_structured_blocks),
    adminNotesText: row.admin_notes_text,
    relatedDiseaseSlugs,
    references: normalizeReferences(row.references),
    isPublished: row.is_published,
    source: 'supabase',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapMedicationPriceReference(row: MedicationRow): MedicationRecord['priceReference'] {
  const amount = Number(row.price_reference_amount_brl);
  if (
    !Number.isFinite(amount) ||
    amount < 0 ||
    !row.price_reference_label ||
    !row.price_reference_presentation ||
    !row.price_reference_source_name ||
    !row.price_reference_source_url ||
    !row.price_reference_checked_at
  ) {
    return null;
  }

  return {
    amountBrl: amount,
    label: row.price_reference_label,
    presentation: row.price_reference_presentation,
    sourceName: row.price_reference_source_name,
    sourceUrl: row.price_reference_source_url,
    checkedAt: row.price_reference_checked_at,
    notes: row.price_reference_notes || null,
  };
}

function parseMedicationStructuredBlocks(raw: unknown): MedicationStructuredBlock[] | undefined {
  if (!raw || !Array.isArray(raw)) return undefined;
  const out: MedicationStructuredBlock[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    if (o.kind === 'clinicalTable' && Array.isArray(o.headers) && Array.isArray(o.rows)) {
      out.push({
        kind: 'clinicalTable',
        headers: o.headers.map((h) => String(h)),
        rows: (o.rows as unknown[]).map((row) =>
          Array.isArray(row) ? row.map((c) => String(c)) : []
        ),
      });
      continue;
    }
    if (
      o.kind === 'clinicalCallout' &&
      (o.variant === 'info' || o.variant === 'caution' || o.variant === 'brazil') &&
      typeof o.title === 'string' &&
      typeof o.body === 'string'
    ) {
      out.push({
        kind: 'clinicalCallout',
        variant: o.variant,
        title: o.title,
        body: o.body,
      });
    }
  }
  return out.length ? out : undefined;
}
