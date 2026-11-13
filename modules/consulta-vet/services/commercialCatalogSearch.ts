import type { CommercialMedicationProduct } from '../types/commercialMedication';
import { fuzzyTokenScore } from '../utils/fuzzySearch';
import { normalizeMedicationSearch } from '../utils/medicationSearch';

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

function fieldMatchScore(queryPhrase: string, fields: unknown[]): number {
  const normalizedFields = fields.map(normalizedTokenPhrase).filter(Boolean);
  const exactIndex = normalizedFields.findIndex((field) => field === queryPhrase);
  if (exactIndex >= 0) return exactIndex;
  const startsIndex = normalizedFields.findIndex((field) => field.startsWith(`${queryPhrase} `));
  if (startsIndex >= 0) return 20 + startsIndex;

  // Prefixos digitados ainda não terminam com espaço ("benza" ->
  // "benzafibrato"). A comparação anterior só reconhecia palavras completas e
  // acabava empatando um prefixo no nome do produto com o mesmo prefixo perdido
  // em sua composição (por exemplo, "benzatina" no Ganadol).
  const fieldPrefixIndex = normalizedFields.findIndex((field) => field.startsWith(queryPhrase));
  if (fieldPrefixIndex >= 0) return 30 + fieldPrefixIndex;

  const boundaryIndex = normalizedFields.findIndex((field) => (` ${field} `).includes(` ${queryPhrase} `));
  if (boundaryIndex >= 0) return 40 + boundaryIndex;

  const queryTokens = searchTokens(queryPhrase);
  let bestTokenPrefixScore = Number.POSITIVE_INFINITY;
  normalizedFields.forEach((field, fieldIndex) => {
    const fieldTokens = searchTokens(field);
    const tokenPositions = queryTokens.map((queryToken) =>
      fieldTokens.findIndex((fieldToken) => fieldToken.startsWith(queryToken)),
    );
    if (tokenPositions.every((position) => position >= 0)) {
      bestTokenPrefixScore = Math.min(
        bestTokenPrefixScore,
        60 + fieldIndex * 10 + tokenPositions.reduce((sum, position) => sum + position, 0),
      );
    }
  });
  if (Number.isFinite(bestTokenPrefixScore)) return bestTokenPrefixScore;

  const fragmentIndex = normalizedFields.findIndex((field) => field.includes(queryPhrase));
  return fragmentIndex >= 0 ? 200 + fragmentIndex : 400;
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
