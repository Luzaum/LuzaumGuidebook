import { humanOmega3ProductsSeed } from '../../data/humanOmega3/products.seed'
import type { HumanOmega3Product } from './types'
import { canCalculateDose, isProductBlocked } from './regulatoryValidation'

export interface HumanOmega3CatalogFilters {
  query?: string
  suitability?: HumanOmega3Product['veterinarySuitability'] | 'preferred_group' | 'acceptable_group'
  clinicalOnly?: boolean
  includeBlocked?: boolean
}

export function getHumanOmega3Products(): HumanOmega3Product[] {
  return humanOmega3ProductsSeed
}

export function getHumanOmega3ProductById(id: string): HumanOmega3Product | undefined {
  return humanOmega3ProductsSeed.find((p) => p.id === id || p.slug === id)
}

export function searchHumanOmega3Catalog(filters: HumanOmega3CatalogFilters = {}): HumanOmega3Product[] {
  const q = filters.query?.trim().toLowerCase()
  return humanOmega3ProductsSeed.filter((product) => {
    if (!filters.includeBlocked && isProductBlocked(product)) return false
    if (filters.clinicalOnly && !canCalculateDose(product)) return false
    if (filters.suitability === 'preferred_group') {
      if (!['preferred', 'preferred_high_concentration'].includes(product.veterinarySuitability)) return false
    }
    if (filters.suitability === 'acceptable_group') {
      if (!['acceptable', 'acceptable_with_flavoring_review', 'label_required'].includes(product.veterinarySuitability)) {
        return false
      }
    }
    if (filters.suitability && !['preferred_group', 'acceptable_group'].includes(filters.suitability)) {
      if (product.veterinarySuitability !== filters.suitability) return false
    }
    if (q) {
      const hay = `${product.commercialName} ${product.manufacturer}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
}

export function getHumanOmega3Stats() {
  const all = humanOmega3ProductsSeed
  return {
    total: all.length,
    preferred: all.filter((p) => ['preferred', 'preferred_high_concentration'].includes(p.veterinarySuitability)).length,
    acceptable: all.filter((p) => ['acceptable', 'acceptable_with_flavoring_review'].includes(p.veterinarySuitability)).length,
    specificUse: all.filter((p) => p.veterinarySuitability === 'specific_use').length,
    blocked: all.filter((p) => isProductBlocked(p)).length,
    conflicting: all.filter((p) => p.marketStatus === 'conflicting_data').length,
    clinicalEnabled: all.filter((p) => canCalculateDose(p)).length,
    epaDhaConfirmed: all.filter((p) => p.epaMgPerUnit != null && p.dhaMgPerUnit != null).length,
    pendingPhoto: all.filter((p) => p.requiresCurrentLabelPhoto).length,
    presentations: all.reduce((acc, p) => acc + p.skus.length, 0),
  }
}

export const DRUG_INTERACTION_ALERTS = [
  'Ácido acetilsalicílico',
  'Clopidogrel',
  'Heparina',
  'Varfarina',
  'Rivaroxabana',
  'Apixabana',
  'Anti-inflamatórios não esteroidais',
  'Outros antiagregantes',
] as const

export const MONITORING_ADVERSE_EFFECTS = [
  'Vômito',
  'Náusea',
  'Diarreia',
  'Fezes amolecidas',
  'Flatulência',
  'Recusa alimentar',
  'Odor de peixe',
  'Ganho calórico',
  'Equimoses',
  'Sangramento',
  'Alterações de coagulação',
] as const
