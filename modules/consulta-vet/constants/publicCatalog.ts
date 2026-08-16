/**
 * Catálogo visível no app (listagens e fichas públicas). Editorial com `includeDrafts: true` ignora este filtro.
 *
 * Ao adicionar/remover slugs públicos, atualizar também `data/publicCatalogCardStubs.ts` (cartões de lista sem carregar seed completo).
 */
export const CONSULTA_VET_PUBLIC_DISEASE_SLUGS = [
  'babesiose-canina',
  'doencas-trato-urinario-inferior-felino-dtuif',
  'fistula-perianal-furunculose-anal',
  'sindrome-cushing-caes',
  'sindrome-cushing-gatos',
  'leishmaniose-visceral-canina',
  'erliquiose-monocitica-canina',
  'colapso-traqueal-canino',
  'asma-felina',
  'bronquite-cronica-caes-gatos',
  'granuloma-eosinofilico-felino',
  'micoplasmoses-hemotropicas',
  'doenca-renal-cronica-caes-gatos',
  'hipertensao-arterial-sistemica-caes-gatos',
  'doenca-valvar-mitral-degenerativa-caes',
  'cardiomiopatia-hipertrofica-caes-gatos',
  'cardiomiopatia-dilatada-caes-gatos',
  'arritmias-cardiacas-caes-gatos',
  'cardiomiopatia-restritiva-felina',
  'hipoadrenocorticismo-addison',
  'diabetes-mellitus-canina',
  'diabetes-mellitus-felina',
  'hipertireoidismo-felino',
  'hipotireoidismo-adquirido-caes-gatos',
  'hipotireoidismo-congenito-caes-gatos',
  'tumores-mamarios-caes-gatos',
  'mastite-caes-gatos',
  'miastenia-gravis-caes-gatos',
  'sindromes-miastenicas-congenitas-caes-gatos',
  'leucemia-viral-felina',
  'peritonite-infecciosa-felina',
  'imunodeficiencia-felina-fiv',
  'insuficiencia-pancreatica-exocrina-caes-gatos',
  'giardiase-caes-gatos',
  'coccidiose-caes-gatos',
  'hiperparatireoidismo-caes-gatos',
  'insulinoma-caes-gatos',
  'cetoacidose-diabetica-caes-gatos',
  'prostatite-caes-gatos',
  'gengivoestomatite-cronica-felina',
  'doenca-periodontal-caes',
  'doenca-periodontal-gatos',
  'dermatite-atopica-canina',
  'sindrome-cutanea-atopica-felina',
  'doenca-do-disco-intervertebral-caes',
  'doenca-do-disco-intervertebral-gatos',
] as const;


/** Mesma regra de sincronização com `data/publicCatalogCardStubs.ts`. */
export const CONSULTA_VET_PUBLIC_MEDICATION_SLUGS = [
  'prednisolona',
  'sulfametoxazol-trimetoprima',
  'amoxicilina-clavulanato',
  'ondansetron',
  'dipirona',
  'ampicilina-sulbactam',
  'ampicilina',
  'pregabalina',
  'maropitant',
  'same-sadenosilmetionina',
  'suplementos-hepaticos-silimarina',
  'acido-ursodesoxicolico',
  'n-acetilcisteina',
  'benazepril',
  'pimobendan',
  'benzafibrato',
  'budesonida',
  'clorambucil',
  'desoxicorticosterona-pivalato',
  'metimazol',
  'levotiroxina-sodica',
  'diltiazem',
  'digoxina',
  'atenolol',
  'propranolol',
  'esmolol',
  'sotalol',
  'atropina',
  'lidocaina',
  'clindamicina',
  'metronidazol',
  'fenbendazol',
  'praziquantel',
  'enrofloxacina',
  'marbofloxacina',
  'ciprofloxacina',
  'selegilina',
  'fluoxetina',
  'amitriptilina',
  'amantadina',
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
