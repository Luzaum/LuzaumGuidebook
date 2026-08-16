import type { MedicationSearchResult } from '../../../src/lib/clinicRecords';

export function normalizeMedicationSearch(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function editDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = previous[rightIndex];
      previous[rightIndex] = left[leftIndex - 1] === right[rightIndex - 1]
        ? diagonal
        : Math.min(diagonal, previous[rightIndex - 1], above) + 1;
      diagonal = above;
    }
  }

  return previous[right.length];
}

/**
 * Retorna uma pontuação menor para correspondências melhores.
 * Aceita pequenos erros apenas em termos com quatro ou mais caracteres,
 * evitando sugestões imprecisas em buscas curtas.
 */
export function medicationSearchScore(query: unknown, searchableText: unknown): number | null {
  const needle = normalizeMedicationSearch(query);
  const haystack = normalizeMedicationSearch(searchableText);
  if (!needle || !haystack) return null;

  const exactIndex = haystack.indexOf(needle);
  if (exactIndex >= 0) return exactIndex === 0 ? 0 : 10 + exactIndex;
  const compactNeedle = needle.replace(/[^a-z0-9]+/g, '');
  const compactHaystack = haystack.replace(/[^a-z0-9]+/g, '');
  if (compactNeedle.length >= 3 && compactHaystack.includes(compactNeedle)) return 20;

  const queryTerms = needle.split(/[^a-z0-9]+/).filter((term) => term.length >= 2);
  const haystackTerms = haystack.split(/[^a-z0-9]+/).filter(Boolean);
  if (!queryTerms.length) return null;

  let totalScore = 0;
  for (const queryTerm of queryTerms) {
    const containedAt = haystack.indexOf(queryTerm);
    if (containedAt >= 0) {
      totalScore += 10 + containedAt;
      continue;
    }
    if (queryTerm.length < 4) return null;
    const allowedDistance = queryTerm.length <= 5 ? 1 : queryTerm.length <= 9 ? 2 : 3;
    const closestDistance = haystackTerms.reduce(
      (closest, token) => Math.min(closest, editDistance(queryTerm, token)),
      Number.POSITIVE_INFINITY,
    );
    if (closestDistance > allowedDistance) return null;
    totalScore += 100 + closestDistance;
  }

  return totalScore;
}

export function matchesMedicationSearch(query: unknown, searchableText: unknown): boolean {
  return medicationSearchScore(query, searchableText) !== null;
}

function metadataString(entry: MedicationSearchResult, ...keys: string[]): string {
  for (const key of keys) {
    const value = entry.metadata?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function metadataStrings(entry: MedicationSearchResult, ...keys: string[]): string[] {
  for (const key of keys) {
    const value = entry.metadata?.[key];
    if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

/** Liga um princípio ativo do catálogo aos produtos comerciais que o contêm. */
export function medicationMatchesCommercialProducts(
  medication: MedicationSearchResult,
  products: MedicationSearchResult[],
): boolean {
  const medicationTerms = [
    metadataString(medication, 'active_ingredient', 'activeIngredient') || medication.name,
    ...metadataStrings(medication, 'synonyms', 'active_ingredient_synonyms'),
  ]
    .map(normalizeMedicationSearch)
    .filter((term) => term.length >= 4);

  if (!medicationTerms.length) return false;

  return products.some((product) => {
    const productIngredients = normalizeMedicationSearch([
      metadataString(product, 'active_ingredient', 'activeIngredient'),
      ...metadataStrings(product, 'active_components'),
    ].join(' '));
    return medicationTerms.some((term) => productIngredients.includes(term));
  });
}
