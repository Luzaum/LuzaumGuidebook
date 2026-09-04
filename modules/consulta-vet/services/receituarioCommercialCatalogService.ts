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
    ...(product.searchAliases || []),
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

/** Campos que identificam o produto, sem misturar indicações e orientações clínicas. */
export function commercialProductIdentitySearchText(product: CommercialMedicationProduct): string {
  return [
    product.name,
    product.manufacturer,
    ...product.activeComponents,
    ...(product.searchAliases || []),
    ...product.presentations,
  ].filter(Boolean).join(' ');
}

interface RankedCommercialProduct {
  product: CommercialMedicationProduct;
  tier: number;
  score: number;
}

function searchTokens(value: unknown): string[] {
  return normalizeSearchTerm(value).match(/[a-z0-9]+/g) || [];
}

function normalizedTokenPhrase(value: unknown): string {
  return searchTokens(value).join(' ');
}

function includesAllExactTokens(queryTokens: string[], candidateTokens: string[]): boolean {
  const candidateSet = new Set(candidateTokens);
  return queryTokens.every((token) => candidateSet.has(token));
}

function includesAllTokenPrefixes(queryTokens: string[], candidateTokens: string[]): boolean {
  return queryTokens.every((queryToken) => candidateTokens.some((token) => token.startsWith(queryToken)));
}

function includesAllTokenFragments(queryTokens: string[], candidateTokens: string[]): boolean {
  return queryTokens.every((queryToken) => queryToken.length >= 4 && candidateTokens.some((token) => token.includes(queryToken)));
}

function phraseOccursAtWordBoundary(query: unknown, candidate: unknown): boolean {
  const queryPhrase = normalizedTokenPhrase(query);
  const candidatePhrase = normalizedTokenPhrase(candidate);
  return !!queryPhrase && (` ${candidatePhrase} `).includes(` ${queryPhrase} `);
}

function tokenEditDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function maximumTypoDistance(token: string): number {
  if (token.length >= 9) return 2;
  if (token.length >= 4) return 1;
  return 0;
}

function fuzzyTokenScore(queryTokens: string[], candidateTokens: string[]): number | null {
  if (!queryTokens.length || !candidateTokens.length) return null;
  let total = 0;
  for (const queryToken of queryTokens) {
    const bestDistance = candidateTokens.reduce(
      (best, candidateToken) => Math.min(best, tokenEditDistance(queryToken, candidateToken)),
      Number.POSITIVE_INFINITY,
    );
    if (bestDistance > maximumTypoDistance(queryToken)) return null;
    total += bestDistance;
  }
  return total;
}

function fieldMatchScore(queryPhrase: string, fields: unknown[]): number {
  const normalizedFields = fields.map(normalizedTokenPhrase).filter(Boolean);
  const exactIndex = normalizedFields.findIndex((field) => field === queryPhrase);
  if (exactIndex >= 0) return exactIndex;
  const startsIndex = normalizedFields.findIndex((field) => field.startsWith(`${queryPhrase} `));
  if (startsIndex >= 0) return 20 + startsIndex;
  const boundaryIndex = normalizedFields.findIndex((field) => (` ${field} `).includes(` ${queryPhrase} `));
  return boundaryIndex >= 0 ? 40 + boundaryIndex : 80;
}

function rankCommercialProduct(
  product: CommercialMedicationProduct,
  query: string,
  extraSearchText = '',
): RankedCommercialProduct | null {
  const queryTokens = searchTokens(query);
  if (!queryTokens.length) return { product, tier: 0, score: 0 };

  const queryPhrase = queryTokens.join(' ');
  const primaryFields = [product.name, ...(product.searchAliases || []), ...product.activeComponents];
  const secondaryFields = [product.manufacturer, ...product.presentations];
  const primaryTokens = searchTokens(primaryFields.join(' '));
  const secondaryTokens = searchTokens(secondaryFields.join(' '));

  if (includesAllExactTokens(queryTokens, primaryTokens)) {
    return { product, tier: 0, score: fieldMatchScore(queryPhrase, primaryFields) };
  }
  if (includesAllTokenPrefixes(queryTokens, primaryTokens)) {
    return { product, tier: 1, score: fieldMatchScore(queryPhrase, primaryFields) };
  }
  if (includesAllTokenFragments(queryTokens, primaryTokens)) {
    return { product, tier: 2, score: fieldMatchScore(queryPhrase, primaryFields) };
  }
  if (includesAllExactTokens(queryTokens, secondaryTokens)) {
    return { product, tier: 3, score: fieldMatchScore(queryPhrase, secondaryFields) };
  }
  if (includesAllTokenPrefixes(queryTokens, secondaryTokens)) {
    return { product, tier: 4, score: fieldMatchScore(queryPhrase, secondaryFields) };
  }

  const fullSearchText = `${commercialProductSearchText(product)} ${extraSearchText}`;
  if (phraseOccursAtWordBoundary(query, fullSearchText)) {
    return { product, tier: 5, score: normalizedTokenPhrase(fullSearchText).indexOf(queryPhrase) };
  }

  const primaryFuzzyScore = fuzzyTokenScore(queryTokens, primaryTokens);
  if (primaryFuzzyScore !== null) return { product, tier: 6, score: primaryFuzzyScore };
  const secondaryFuzzyScore = fuzzyTokenScore(queryTokens, secondaryTokens);
  if (secondaryFuzzyScore !== null) return { product, tier: 7, score: secondaryFuzzyScore };
  return null;
}

/**
 * Busca comercial por relevância. Só resultados da melhor camada encontrada são
 * exibidos, evitando que uma coincidência fraca ("sulfa" em "polissulfato")
 * apareça junto de um nome, princípio ativo ou alias realmente correspondente.
 */
export function filterAndRankCommercialProducts(
  products: CommercialMedicationProduct[],
  query: string,
  getExtraSearchText?: (product: CommercialMedicationProduct) => string,
): CommercialMedicationProduct[] {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return [...products].sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'));

  const ranked = products
    .map((product) => rankCommercialProduct(product, normalizedQuery, getExtraSearchText?.(product) || ''))
    .filter((match): match is RankedCommercialProduct => match !== null);
  if (!ranked.length) return [];

  const bestTier = Math.min(...ranked.map((match) => match.tier));
  return ranked
    .filter((match) => match.tier === bestTier)
    .sort((left, right) => left.score - right.score)
    .map((match) => match.product);
}

function mapCommercialProduct(product: CommercialMedicationProduct): MedicationSearchResult {
  const subclasses = Array.from(new Set([product.commercialSubclass, ...(product.commercialSubclasses || [])]));
  return {
    id: `commercial:${product.slug}`,
    name: product.name,
    is_controlled: !!product.isControlled,
    is_private: false,
    source: 'global' as const,
    scope: 'global' as const,
    metadata: {
      search_result_type: 'commercial',
      active_ingredient: product.activeComponents.join(' + '),
      active_components: product.activeComponents,
      search_aliases: product.searchAliases || [],
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
      catalog_medication_id: product.catalogMedicationId || null,
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
    const name = presentation.metadata?.source === 'editorial_catalog'
      ? String(presentation.commercial_name || '').trim()
      : commercialBrandName(presentation.commercial_name);
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
      const name = items[0]?.metadata?.source === 'editorial_catalog'
        ? String(items[0]?.commercial_name || '').trim()
        : commercialBrandName(items[0]?.commercial_name);
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
  return filterAndRankCommercialProducts(eligibleProducts, needle)
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
