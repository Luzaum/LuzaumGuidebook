import type { MedicationPresentationRecord, MedicationSearchResult } from '../../../src/lib/clinicRecords';
import { RECEITUARIO_SUBCLASSES_BY_CLASS } from '../data/receituarioCommercialTaxonomy';
import type { CommercialMedicationClass, CommercialMedicationProduct, CommercialMedicationSubclass } from '../types/commercialMedication';
import type { VetSpecies } from '../types/common';
import { medicationSearchScore, normalizeMedicationSearch } from '../utils/medicationSearch';

function normalizeSearchTerm(value: unknown): string {
  return normalizeMedicationSearch(value);
}

export function commercialProductSearchText(product: CommercialMedicationProduct): string {
  const plumbsEntries = [
    ...(product.dosageGuidance?.plumbs?.dog || []),
    ...(product.dosageGuidance?.plumbs?.cat || []),
  ];
  return [
    product.name,
    product.manufacturer,
    ...product.activeComponents,
    ...product.presentations,
    product.labelCompositionSummary,
    product.clinicalUse,
    product.labelDirections,
    product.dosageGuidance?.labelDose,
    ...plumbsEntries.flatMap((entry) => [entry.title, entry.dose, entry.note]),
    product.plumbsContext,
    product.prescriptionExample,
    product.commercialClass,
    product.commercialSubclass,
    ...(product.commercialSubclasses || []),
  ].filter(Boolean).join(' ');
}

function mapCommercialProduct(product: CommercialMedicationProduct): MedicationSearchResult {
  const subclasses = Array.from(new Set([product.commercialSubclass, ...(product.commercialSubclasses || [])]));
  return {
    id: `commercial:${product.slug}`,
    name: product.name,
    is_controlled: false,
    is_private: false,
    source: 'global' as const,
    scope: 'global' as const,
    metadata: {
      search_result_type: 'commercial',
      active_ingredient: product.activeComponents.join(' + '),
      active_components: product.activeComponents,
      manufacturer: product.manufacturer,
      species: product.species,
      commercial_class: product.commercialClass,
      commercial_subclasses: subclasses,
      presentation_labels: product.presentations,
      label_directions: product.labelDirections,
      dosage_guidance: product.dosageGuidance || null,
      plumbs_context: product.plumbsContext || null,
      prescription_example: product.prescriptionExample || null,
      product_page_url: product.productPageUrl || null,
      label_url: product.labelUrl || null,
    },
  };
}

function catalogPresentationLabel(presentation: MedicationPresentationRecord): string {
  return [presentation.commercial_name, presentation.pharmaceutical_form, presentation.concentration_text]
    .filter(Boolean)
    .join(' — ');
}

/**
 * Algumas bases antigas salvaram a concentração junto do nome comercial
 * (ex.: "Cardisure 1,25 mg"). Para a busca, todas essas apresentações devem
 * continuar pertencendo a uma única marca: "Cardisure".
 */
export function commercialBrandName(value: unknown): string {
  const name = String(value || '').trim();
  if (!name) return '';

  return name
    .replace(
      /\s+(?:[-–—]\s*)?\d+(?:[.,]\d+)?\s*(?:mcg|µg|ug|mg|g|ml|l|ui|u|%)\b(?:\s*\/\s*[a-zà-ÿ]+)?(?:\s+.*)?$/iu,
      '',
    )
    .trim() || name;
}

/**
 * Transforma as marcas que já existem nas apresentações do catálogo clínico em
 * resultados comerciais. Assim, uma marca não fica escondida na etapa seguinte.
 */
export function buildCatalogPresentationCommercialResults(
  medication: MedicationSearchResult,
  presentations: MedicationPresentationRecord[],
): MedicationSearchResult[] {
  const grouped = new Map<string, MedicationPresentationRecord[]>();
  presentations.forEach((presentation) => {
    const name = commercialBrandName(presentation.commercial_name);
    if (!name) return;
    const key = normalizeSearchTerm(name);
    if (!key) return;
    grouped.set(key, [...(grouped.get(key) || []), presentation]);
  });

  const activeIngredient = String(medication.metadata?.active_ingredient || medication.name).trim();
  const species = Array.isArray(medication.metadata?.species) ? medication.metadata.species : [];
  const routes = Array.isArray(medication.metadata?.routes) ? medication.metadata.routes : [];

  return Array.from(grouped.entries())
    .map(([key, items]): MedicationSearchResult => {
      const name = commercialBrandName(items[0]?.commercial_name);
      const presentationLabels = Array.from(new Set(items.map(catalogPresentationLabel).filter(Boolean)));
      return {
        id: `commercial-presentation:${medication.id}:${key.replace(/\s+/g, '-')}`,
        name,
        is_controlled: medication.is_controlled,
        is_private: medication.is_private,
        source: medication.source,
        scope: medication.scope,
        metadata: {
          search_result_type: 'commercial',
          search_origin: 'catalog_presentation',
          catalog_medication_id: medication.id,
          catalog_presentation_ids: items.map((item) => item.id),
          active_ingredient: activeIngredient,
          active_components: [activeIngredient],
          species,
          routes,
          presentation_labels: presentationLabels,
        },
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'));
}

export interface PrescriptionCommercialSearchOptions {
  query?: string;
  commercialClass?: CommercialMedicationClass | '';
  commercialSubclass?: CommercialMedicationSubclass | '';
  species?: VetSpecies | null;
  limit?: number;
}

/** Catálogo comercial consultado exclusivamente pelo compositor do Receituário. */
export async function searchPrescriptionCommercialProducts({
  query = '', commercialClass = '', commercialSubclass = '', limit = Number.POSITIVE_INFINITY,
}: PrescriptionCommercialSearchOptions): Promise<MedicationSearchResult[]> {
  const needle = normalizeSearchTerm(query);
  if (needle.length < 2 && !commercialClass) return [];

  const { commercialOticProductsSeed } = await import('../data/commercialOticProducts.seed');
  const eligibleProducts = commercialOticProductsSeed
    .filter((product) => {
      const subclasses = Array.from(new Set([product.commercialSubclass, ...(product.commercialSubclasses || [])]));
      const classSubclasses = commercialClass ? RECEITUARIO_SUBCLASSES_BY_CLASS[commercialClass] : [];
      const matchesClass = !commercialClass || product.commercialClass === commercialClass || subclasses.some((item) => classSubclasses.includes(item));
      const matchesSubclass = !commercialSubclass || subclasses.includes(commercialSubclass);
      return matchesClass && matchesSubclass;
    });
  const exactNameMatches = needle
    ? eligibleProducts.filter((product) => normalizeSearchTerm(product.name).includes(needle))
    : [];
  const searchPool = exactNameMatches.length ? exactNameMatches : eligibleProducts;

  return searchPool
    .filter((product) => !needle || medicationSearchScore(needle, normalizeSearchTerm(commercialProductSearchText(product))) !== null)
    .sort((left, right) => {
      const leftName = normalizeSearchTerm(left.name);
      const rightName = normalizeSearchTerm(right.name);
      const leftSearchText = commercialProductSearchText(left);
      const rightSearchText = commercialProductSearchText(right);
      const leftScore = needle ? medicationSearchScore(needle, leftSearchText) ?? Number.POSITIVE_INFINITY : 0;
      const rightScore = needle ? medicationSearchScore(needle, rightSearchText) ?? Number.POSITIVE_INFINITY : 0;
      if (leftScore !== rightScore) return leftScore - rightScore;
      if (needle && leftName.startsWith(needle) !== rightName.startsWith(needle)) return leftName.startsWith(needle) ? -1 : 1;
      return left.name.localeCompare(right.name, 'pt-BR');
    })
    .slice(0, Number.isFinite(limit) && limit > 0 ? limit : commercialOticProductsSeed.length)
    .map(mapCommercialProduct);
}

/** Mantém o fallback de busca por nome usado no fluxo já existente. */
export async function searchPrescriptionCommercialProductsByName(query: string): Promise<MedicationSearchResult[]> {
  const results = await searchPrescriptionCommercialProducts({ query });
  const needle = normalizeSearchTerm(query);
  const nameMatches = results.filter((item) => medicationSearchScore(needle, normalizeSearchTerm(item.name)) !== null);
  return nameMatches.length ? nameMatches : results;
}
