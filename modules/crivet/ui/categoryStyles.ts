import type { DrugCategory as LegacyDrugCategory } from '../data/drugs'

export type DrugCategoryTone =
  | 'analgesic_anesthetic'
  | 'cardiovascular'
  | 'antimicrobial'
  | 'combined_infusion'
  | 'endocrine'
  | 'antiemetic_prokinetic'

export type CategoryStyle = {
  label: string
  bannerClassName: string
  headerClassName: string
  countClassName: string
  cardClassName: string
  selectedCardClassName: string
}

export const CATEGORY_STYLES: Record<DrugCategoryTone, CategoryStyle> = {
  analgesic_anesthetic: {
    label: 'Analgésicos e Anestésicos',
    bannerClassName: 'border-green-400/40 bg-green-500/20 text-green-100',
    headerClassName: 'crivet-category-header--green',
    countClassName: 'crivet-category-count--green',
    cardClassName: 'crivet-drug-btn--tone-green',
    selectedCardClassName: 'crivet-drug-btn--selected-green',
  },
  cardiovascular: {
    label: 'Agentes Cardiovasculares',
    bannerClassName: 'border-red-400/40 bg-red-500/20 text-red-100',
    headerClassName: 'crivet-category-header--red',
    countClassName: 'crivet-category-count--red',
    cardClassName: 'crivet-drug-btn--tone-red',
    selectedCardClassName: 'crivet-drug-btn--selected-red',
  },
  antimicrobial: {
    label: 'Antimicrobianos',
    bannerClassName: 'border-purple-400/40 bg-purple-500/20 text-purple-100',
    headerClassName: 'crivet-category-header--purple',
    countClassName: 'crivet-category-count--purple',
    cardClassName: 'crivet-drug-btn--tone-purple',
    selectedCardClassName: 'crivet-drug-btn--selected-purple',
  },
  combined_infusion: {
    label: 'Infusões Combinadas',
    bannerClassName: 'border-slate-400/50 bg-slate-500/20 text-slate-100',
    headerClassName: 'crivet-category-header--gray',
    countClassName: 'crivet-category-count--gray',
    cardClassName: 'crivet-drug-btn--tone-gray',
    selectedCardClassName: 'crivet-drug-btn--selected-gray',
  },
  endocrine: {
    label: 'Endócrino',
    bannerClassName: 'border-orange-400/40 bg-orange-500/20 text-orange-100',
    headerClassName: 'crivet-category-header--orange',
    countClassName: 'crivet-category-count--orange',
    cardClassName: 'crivet-drug-btn--tone-orange',
    selectedCardClassName: 'crivet-drug-btn--selected-orange',
  },
  antiemetic_prokinetic: {
    label: 'Antieméticos e Pró-cinéticos',
    bannerClassName: 'border-blue-400/40 bg-blue-500/20 text-blue-100',
    headerClassName: 'crivet-category-header--blue',
    countClassName: 'crivet-category-count--blue',
    cardClassName: 'crivet-drug-btn--tone-blue',
    selectedCardClassName: 'crivet-drug-btn--selected-blue',
  },
}

export function mapCategoryToStyle(category: LegacyDrugCategory): DrugCategoryTone {
  const normalized = String(category).toLowerCase()

  if (normalized.includes('analg') || normalized.includes('anest')) return 'analgesic_anesthetic'
  if (normalized.includes('cardio')) return 'cardiovascular'
  if (normalized.includes('microbian')) return 'antimicrobial'
  if (normalized.includes('combin')) return 'combined_infusion'
  if (normalized.includes('endocr')) return 'endocrine'
  if (normalized.includes('antiem') || normalized.includes('pro-cin') || normalized.includes('procin')) {
    return 'antiemetic_prokinetic'
  }

  return 'analgesic_anesthetic'
}
