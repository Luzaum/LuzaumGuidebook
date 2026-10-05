import type { DiseaseRecord } from '../types/disease';

function preferNonEmptyArray<T>(primary: T[] | undefined, fallback: T[]): T[] {
  return primary && primary.length > 0 ? primary : fallback;
}

/**
 * Mapeamento de slugs legados/obsoletos para os slugs canônicos oficiais.
 * Evita duplicação de fichas antigas salvas no banco com as novas fichas canônicas.
 */
export const DISEASE_SLUG_ALIASES: Record<string, string> = {
  'colapso-traqueal': 'colapso-traqueal-canino',
};

/**
 * Mescla catálogo seed + Supabase para doenças.
 * O seed local prevalece no conteúdo editorial quando o slug existe nos dois lados,
 * evitando que registros remotos desatualizados apaguem alterações em desenvolvimento.
 */
export function mergeDiseaseRecordsBySlug(
  seedItems: DiseaseRecord[],
  remoteItems: DiseaseRecord[]
): DiseaseRecord[] {
  const seedBySlug = new Map(seedItems.map((item) => [item.slug, item]));
  const merged = new Map<string, DiseaseRecord>();

  remoteItems.forEach((remote) => {
    const canonicalSlug = DISEASE_SLUG_ALIASES[remote.slug] || remote.slug;
    const seed = seedBySlug.get(canonicalSlug);
    if (!seed) {
      merged.set(canonicalSlug, { ...remote, slug: canonicalSlug, source: 'supabase' });
      return;
    }

    merged.set(canonicalSlug, {
      ...remote,
      ...seed,
      slug: canonicalSlug,
      title: seed.title,
      quickSummary: seed.quickSummary,
      relatedMedicationSlugs: preferNonEmptyArray(seed.relatedMedicationSlugs, remote.relatedMedicationSlugs),
      relatedConsensusSlugs: preferNonEmptyArray(seed.relatedConsensusSlugs, remote.relatedConsensusSlugs),
      relatedDiseaseSlugs: preferNonEmptyArray(seed.relatedDiseaseSlugs, remote.relatedDiseaseSlugs),
      source: 'seed',
    });
  });

  seedItems.forEach((seed) => {
    if (!merged.has(seed.slug)) {
      merged.set(seed.slug, { ...seed, source: 'seed' });
    }
  });

  // Garante que nenhum slug legado seja mantido no mapa final
  Object.keys(DISEASE_SLUG_ALIASES).forEach((legacySlug) => {
    merged.delete(legacySlug);
  });

  return Array.from(merged.values());
}
