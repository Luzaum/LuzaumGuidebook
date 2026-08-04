import { supplementManufacturersSeed } from '../../data/supplementCatalog/manufacturers.seed'
import { supplementProductsSeed, supplementSkusSeed } from '../../data/supplementCatalog/products.seed'
import {
  isClinicalRecommendationAllowed,
  isPrescriptionAllowed,
  isPremixProduct,
} from './regulatoryValidation'
import type {
  SupplementCatalogFilters,
  SupplementCatalogSearchResult,
  SupplementCatalogStats,
  SupplementManufacturer,
  SupplementProduct,
  SupplementSku,
} from './types'

function normalizeQuery(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function matchesFilters(product: SupplementProduct, filters: SupplementCatalogFilters): boolean {
  if (filters.manufacturerSlug && product.manufacturerSlug !== filters.manufacturerSlug) return false
  if (filters.species && !product.species.includes(filters.species)) return false
  if (filters.primaryCategory && product.primaryCategory !== filters.primaryCategory) return false
  if (filters.productClass && product.productClass !== filters.productClass) return false
  if (filters.catalogEligibility && product.catalogEligibility !== filters.catalogEligibility) return false
  if (filters.clinicalOnly && !isClinicalRecommendationAllowed(product)) return false

  if (filters.query) {
    const q = normalizeQuery(filters.query)
    const haystack = normalizeQuery(
      [product.commercialName, product.canonicalName, product.brand, product.manufacturerSlug].join(' '),
    )
    if (!haystack.includes(q)) return false
  }

  if (filters.dosageForm) {
    const skus = getSkusForProduct(product.id)
    if (!skus.some((sku) => sku.dosageForm === filters.dosageForm)) return false
  }

  return true
}

export function getSupplementManufacturers(): SupplementManufacturer[] {
  return supplementManufacturersSeed
}

export function getSupplementProducts(): SupplementProduct[] {
  return supplementProductsSeed
}

export function getSupplementProductBySlug(slug: string): SupplementProduct | undefined {
  return supplementProductsSeed.find((p) => p.slug === slug)
}

export function getSkusForProduct(productId: string): SupplementSku[] {
  return supplementSkusSeed.filter((sku) => sku.productId === productId)
}

export function searchSupplementCatalog(filters: SupplementCatalogFilters = {}): SupplementCatalogSearchResult {
  const items = supplementProductsSeed.filter((product) => matchesFilters(product, filters))
  return {
    items,
    total: items.length,
    manufacturers: supplementManufacturersSeed,
  }
}

export function getSupplementCatalogStats(): SupplementCatalogStats {
  const products = supplementProductsSeed
  return {
    manufacturers: supplementManufacturersSeed.length,
    productsTotal: products.length,
    productsEligible: products.filter((p) => p.catalogEligibility === 'eligible').length,
    productsStaging: products.filter((p) => p.catalogEligibility === 'staging_only').length,
    productsExcluded: products.filter((p) => p.catalogEligibility === 'excluded').length,
    skus: supplementSkusSeed.length,
    formulasComplete: products.filter((p) => p.formulaStatus === 'complete').length,
    formulasIncomplete: products.filter((p) => p.formulaStatus !== 'complete').length,
    dosesConfirmed: products.filter((p) => p.doseStatus === 'confirmed').length,
    dosesPending: products.filter((p) => p.doseStatus !== 'confirmed').length,
  }
}

export function getPrescriptionEligibleProducts(): SupplementProduct[] {
  return supplementProductsSeed.filter((product) => isPrescriptionAllowed(product))
}

export function assertPremixPrescriptionAllowed(product: SupplementProduct): string | null {
  if (!isPremixProduct(product.productClass)) return null
  if (!product.premixRules?.requiresExactRecipeAssociation) {
    return 'Premix exige receita alimentar associada.'
  }
  return 'Premix não pode ser prescrito isoladamente — associe à receita alimentar completa.'
}

export function compareProductsByName(a: SupplementProduct, b: SupplementProduct): number {
  return a.commercialName.localeCompare(b.commercialName, 'pt')
}
