import type {
  CatalogEligibility,
  MedicineStatus,
  NutritionalProductClass,
  SourceTier,
  SupplementProduct,
} from './types'
import { CLINICAL_SOURCE_TIERS } from './types'

/** Termos que indicam medicamento ou produto proibido no catálogo de suplementos. */
export const PROHIBITED_PRODUCT_PATTERNS = [
  /\bantibi[oó]tic/i,
  /\banti[- ]?inflamat/i,
  /\banalg[eé]sic/i,
  /\banticonvulsiv/i,
  /\bsedativ/i,
  /\bansiol[ií]tic/i,
  /\bhorm[oô]nio/i,
  /\bdiur[eé]tic/i,
  /\banti[- ]?hipertens/i,
  /\bantiem[eé]tic/i,
  /\bpr[oó][- ]?cin[eé]tic/i,
  /\bantiparasit/i,
  /\bantif[uú]ng/i,
  /\bantiviral/i,
  /\bhomeopat/i,
  /\bferom[oô]nio/i,
  /\bshampoo/i,
  /\bcol[ií]rio/i,
  /\botol[oó]gic/i,
  /\binjet[aá]vel/i,
  /\bintravenos/i,
  /\bcanabidiol/i,
  /\bbenzodiazep/i,
  /\bgabapentin/i,
  /\bcorticoide/i,
  /\bmedicament/i,
  /\bespecialidade farmac[eê]utica/i,
] as const

export const EXCLUDED_PRODUCT_SLUGS = new Set([
  'orozyme-gel',
  'calmindog',
  'calminvet',
  'silimavet',
  'previn-atx',
])

export const STAGING_ONLY_SLUGS = new Set([
  'calmindog',
  'calminvet',
  'silimavet',
  'previn-atx',
  'fortiflora-canine',
  'fortiflora-feline',
  'happy-bones',
  'happy-days',
  'happy-zen',
  'happy-glow',
  'happy-flora-comprimidos',
  'happy-flora-pasta',
  'happy-flora-gatos',
  'happy-days-renalis',
  'florentero-act',
  'nuxcell-plus',
  'nuxcell-fel-biosyn',
  'glutamax',
  'hemocare',
  'targimax10',
  'captor',
  'angels-eyes',
  'pet-zentrum-a-z',
  'omegaderm',
  'eoff',
  'plaqueoff',
  'micro-lac',
])

export const VETERINARY_REVIEW_INGREDIENTS = new Set([
  'vitamin_d',
  'vitamin_d3',
  'potassium',
  'ferro',
  'iron',
  'selenium',
  'calcium',
  'copper',
  'iodine',
  'premix',
  'phosphorus',
])

export function slugifyProductName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function inferMedicineStatusFromName(name: string): MedicineStatus {
  if (PROHIBITED_PRODUCT_PATTERNS.some((pattern) => pattern.test(name))) {
    return 'possible_medicine'
  }
  return 'unknown'
}

export function resolveCatalogEligibility(input: {
  medicineStatus: MedicineStatus
  slug: string
  labelStatus?: SupplementProduct['labelStatus']
  formulaStatus?: SupplementProduct['formulaStatus']
  bestSourceTier?: SourceTier
}): CatalogEligibility {
  if (EXCLUDED_PRODUCT_SLUGS.has(input.slug)) return 'excluded'
  if (input.medicineStatus === 'medicine_confirmed') return 'excluded'
  if (input.medicineStatus === 'possible_medicine') return 'staging_only'
  if (STAGING_ONLY_SLUGS.has(input.slug)) return 'staging_only'
  if (input.medicineStatus === 'unknown') return 'staging_only'
  if (input.labelStatus === 'pending' || input.formulaStatus === 'pending') return 'staging_only'
  if (input.bestSourceTier && !CLINICAL_SOURCE_TIERS.includes(input.bestSourceTier)) {
    return 'staging_only'
  }
  if (input.medicineStatus === 'not_medicine_confirmed') return 'eligible'
  return 'staging_only'
}

export function isClinicalRecommendationAllowed(product: SupplementProduct): boolean {
  return (
    product.catalogEligibility === 'eligible' &&
    product.medicineStatus === 'not_medicine_confirmed' &&
    product.clinicalRecommendationEnabled === true &&
    product.labelStatus !== 'pending' &&
    product.formulaStatus !== 'pending'
  )
}

export function isPrescriptionAllowed(product: SupplementProduct): boolean {
  if (!isClinicalRecommendationAllowed(product)) return false
  if (product.medicineStatus === 'unknown' || product.medicineStatus === 'possible_medicine') {
    return false
  }
  return true
}

export function canActivateFromSourceTier(tier: SourceTier): boolean {
  return CLINICAL_SOURCE_TIERS.includes(tier)
}

export function isPremixProduct(productClass: NutritionalProductClass): boolean {
  return productClass === 'premix_balanceador'
}

export function isMilkReplacer(productClass: NutritionalProductClass): boolean {
  return productClass === 'substituto_do_leite'
}

export function isInjectableDosageForm(form: string): boolean {
  return /injet|intraven|infus/i.test(form)
}

export function isTopicalProduct(name: string, productClass?: NutritionalProductClass): boolean {
  if (/shampoo|col[ií]rio|solu[cç][aã]o otol|dermatol[oó]gic t[oó]pic/i.test(name)) return true
  return false
}

export function missingNutrientToNull<T extends number | null | undefined>(value: T): number | null {
  if (value === undefined || value === null || Number.isNaN(value)) return null
  return value
}

export function requiresVeterinaryReview(product: SupplementProduct): boolean {
  if (isPremixProduct(product.productClass)) return true
  if (product.primaryCategory === 'vitaminas_e_minerais') return true
  if (product.primaryCategory === 'suporte_renal_nutricional') return true
  if (product.primaryCategory === 'suporte_urinario_nutricional') return true
  return false
}
