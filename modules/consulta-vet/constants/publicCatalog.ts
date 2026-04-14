/**
 * Catálogo visível no app (listagens e fichas públicas). Editorial com `includeDrafts: true` ignora este filtro.
 */
export const CONSULTA_VET_PUBLIC_DISEASE_SLUGS = [
  'fistula-perianal-furunculose-anal',
  'hiperadrenocorticismo-sindrome-cushing',
  'leishmaniose-visceral-canina',
] as const;

export const CONSULTA_VET_PUBLIC_MEDICATION_SLUGS = ['prednisolona'] as const;

export function isPublicDiseaseSlug(slug: string): boolean {
  return (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(slug);
}

export function isPublicMedicationSlug(slug: string): boolean {
  return (CONSULTA_VET_PUBLIC_MEDICATION_SLUGS as readonly string[]).includes(slug);
}

export function filterPublicDiseases<T extends { slug: string }>(
  items: T[],
  includeDrafts?: boolean
): T[] {
  if (includeDrafts) return items;
  return items.filter((item) => isPublicDiseaseSlug(item.slug));
}

export function filterPublicMedications<T extends { slug: string }>(
  items: T[],
  includeDrafts?: boolean
): T[] {
  if (includeDrafts) return items;
  return items.filter((item) => isPublicMedicationSlug(item.slug));
}
