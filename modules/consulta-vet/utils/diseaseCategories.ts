import type { DiseaseRecord } from '../types/disease';

const CATEGORY_ALIASES: Record<string, string> = {
  infecciosas: 'infectologia',
  infecciosa: 'infectologia',
  gastrointestinal: 'gastroenterologia',
  nefrologia: 'nefrologia-urologia',
  urologia: 'nefrologia-urologia',
  odontologia: 'odontologia-odontostomatologia',
};

export function normalizeCategorySlug(slug: string): string {
  const key = slug.trim().toLowerCase();
  return CATEGORY_ALIASES[key] ?? key;
}

/** Todas as especialidades associadas à doença (primária + secundárias), sem duplicatas. */
export function getDiseaseCategorySlugs(
  disease: Pick<DiseaseRecord, 'category' | 'categories'>
): string[] {
  const primary = normalizeCategorySlug(disease.category);
  const extra = (disease.categories ?? []).map(normalizeCategorySlug);
  return [...new Set([primary, ...extra])];
}

export function diseaseMatchesCategoryFilter(
  disease: Pick<DiseaseRecord, 'category' | 'categories'>,
  selectedCategory: string
): boolean {
  const selected = normalizeCategorySlug(selectedCategory);
  return getDiseaseCategorySlugs(disease).some((slug) => {
    if (slug === selected) return true;
    if (selected === 'infectologia' && slug === 'infecciosas') return true;
    if (selected === 'infecciosas' && slug === 'infectologia') return true;
    return false;
  });
}
