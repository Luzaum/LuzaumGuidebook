import type {
  CatalogEligibility,
  DosageForm,
  MarketStatus,
  MedicineStatus,
  NutritionalCategory,
  NutritionalProductClass,
  PremixPrescriptionRules,
  RegulatoryClass,
  SupplementProduct,
  SupplementSku,
  SupplementSpecies,
} from '../../lib/supplementCatalog/types'
import { DEFAULT_PREMIX_RULES } from '../../lib/supplementCatalog/types'
import {
  inferMedicineStatusFromName,
  resolveCatalogEligibility,
  slugifyProductName,
} from '../../lib/supplementCatalog/regulatoryValidation'
import { supplementManufacturerBySlug } from './manufacturers.seed'

let productCounter = 0

export interface ProductSeedInput {
  manufacturerSlug: string
  commercialName: string
  productClass: NutritionalProductClass
  primaryCategory: NutritionalCategory
  secondaryCategories?: NutritionalCategory[]
  species?: SupplementSpecies[]
  lifeStages?: string[]
  brand?: string
  family?: string
  regulatoryClass?: RegulatoryClass
  medicineStatus?: MedicineStatus
  marketStatus?: MarketStatus
  labelStatus?: SupplementProduct['labelStatus']
  formulaStatus?: SupplementProduct['formulaStatus']
  doseStatus?: SupplementProduct['doseStatus']
  clinicalRecommendationEnabled?: boolean
  requiresSixMonthReaudit?: boolean
  bundleIsNotAProduct?: boolean
  duplicateActivesCheckRequired?: boolean
  premixRules?: PremixPrescriptionRules
  notes?: string
  dosageForm?: DosageForm
  packageSize?: string
}

export function buildProduct(input: ProductSeedInput): { product: SupplementProduct; sku: SupplementSku } {
  const manufacturer = supplementManufacturerBySlug[input.manufacturerSlug]
  if (!manufacturer) {
    throw new Error(`Fabricante desconhecido: ${input.manufacturerSlug}`)
  }

  productCounter += 1
  const slug = slugifyProductName(`${input.manufacturerSlug}-${input.commercialName}`)
  const medicineStatus = input.medicineStatus ?? inferMedicineStatusFromName(input.commercialName)
  const labelStatus = input.labelStatus ?? 'pending'
  const formulaStatus = input.formulaStatus ?? 'pending'
  const catalogEligibility = resolveCatalogEligibility({
    medicineStatus,
    slug,
    labelStatus,
    formulaStatus,
  }) as CatalogEligibility

  const clinicalRecommendationEnabled =
    input.clinicalRecommendationEnabled ??
    (catalogEligibility === 'eligible' && medicineStatus === 'not_medicine_confirmed')

  const product: SupplementProduct = {
    id: `sup-${String(productCounter).padStart(4, '0')}-${slug}`,
    slug,
    manufacturerId: manufacturer.id,
    manufacturerSlug: manufacturer.slug,
    brand: input.brand ?? manufacturer.name,
    family: input.family,
    commercialName: input.commercialName,
    canonicalName: input.commercialName,
    productClass: input.productClass,
    primaryCategory: input.primaryCategory,
    secondaryCategories: input.secondaryCategories ?? [],
    species: input.species ?? ['dog', 'cat'],
    lifeStages: input.lifeStages ?? [],
    regulatoryClass: input.regulatoryClass ?? 'classificacao_pendente',
    medicineStatus,
    catalogEligibility,
    marketStatus: input.marketStatus ?? 'pending_confirmation',
    clinicalRecommendationEnabled,
    labelStatus,
    formulaStatus,
    doseStatus: input.doseStatus ?? 'pending',
    requiresSixMonthReaudit: input.requiresSixMonthReaudit,
    bundleIsNotAProduct: input.bundleIsNotAProduct,
    duplicateActivesCheckRequired: input.duplicateActivesCheckRequired,
    premixRules: input.productClass === 'premix_balanceador' ? (input.premixRules ?? DEFAULT_PREMIX_RULES) : input.premixRules,
    notes: input.notes,
  }

  const sku: SupplementSku = {
    id: `sku-${product.id}`,
    productId: product.id,
    productSlug: product.slug,
    dosageForm: input.dosageForm ?? 'outro',
    packageSize: input.packageSize ?? 'rótulo pendente',
  }

  return { product, sku }
}

export function buildProducts(inputs: ProductSeedInput[]): { products: SupplementProduct[]; skus: SupplementSku[] } {
  const products: SupplementProduct[] = []
  const skus: SupplementSku[] = []
  for (const input of inputs) {
    const built = buildProduct(input)
    products.push(built.product)
    skus.push(built.sku)
  }
  return { products, skus }
}

/** Helper para listas simples de nomes comerciais. */
export function mapNames(
  manufacturerSlug: string,
  names: string[],
  defaults: Omit<ProductSeedInput, 'manufacturerSlug' | 'commercialName'>,
): ProductSeedInput[] {
  return names.map((commercialName) => ({ manufacturerSlug, commercialName, ...defaults }))
}
