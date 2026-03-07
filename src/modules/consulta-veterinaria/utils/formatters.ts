import type { Category } from '../types/category'
import type { ClinicalSpecies } from '../types/common'
import { SPECIES_LABELS } from './constants'

export function formatSpecies(species: ClinicalSpecies | ClinicalSpecies[]): string {
  const normalized = Array.isArray(species) ? species : [species]
  return normalized.map((item) => SPECIES_LABELS[item]).join(' • ')
}

export function formatCategoryTitle(slug: string, categories: Category[]): string {
  return categories.find((item) => item.slug === slug)?.title || slug
}
