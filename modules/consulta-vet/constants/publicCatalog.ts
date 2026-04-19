/**
 * Catálogo visível no app (listagens e fichas públicas). Editorial com `includeDrafts: true` ignora este filtro.
 *
 * Ao adicionar/remover slugs públicos, atualizar também `data/publicCatalogCardStubs.ts` (cartões de lista sem carregar seed completo).
 */
export const CONSULTA_VET_PUBLIC_DISEASE_SLUGS = [
  'fistula-perianal-furunculose-anal',
  'hiperadrenocorticismo-sindrome-cushing',
  'leishmaniose-visceral-canina',
  'erliquiose-monocitica-canina',
  'colapso-traqueal-canino',
  'micoplasmoses-hemotropicas',
  'doenca-renal-cronica-caes-gatos',
  'hipertensao-arterial-sistemica-caes-gatos',
  'doenca-valvar-mitral-degenerativa-caes',
] as const;

/** Mesma regra de sincronização com `data/publicCatalogCardStubs.ts`. */
export const CONSULTA_VET_PUBLIC_MEDICATION_SLUGS = [
  'prednisolona',
  'sulfametoxazol-trimetoprima',
  'amoxicilina-clavulanato',
  'pregabalina',
  'maropitant',
  'benazepril',
  'pimobendan',
  'benzafibrato',
] as const;

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
