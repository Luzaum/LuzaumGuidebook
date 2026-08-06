import type { DiseaseRecord } from '../types/disease';

function preferNonEmptyArray<T>(primary: T[] | undefined, fallback: T[]): T[] {
  return primary && primary.length > 0 ? primary : fallback;
}

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
    const seed = seedBySlug.get(remote.slug);
    if (!seed) {
      merged.set(remote.slug, { ...remote, source: 'supabase' });
      return;
    }

    merged.set(remote.slug, {
      ...remote,
      ...seed,
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

  return Array.from(merged.values());
}
