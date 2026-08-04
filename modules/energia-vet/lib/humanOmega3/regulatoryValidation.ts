import type { HumanOmega3Product } from './types'

const BLOCKED_SUITABILITIES = new Set<HumanOmega3Product['veterinarySuitability']>([
  'blocked',
  'blocked_multiple_micronutrients',
  'blocked_chewable_human_product',
  'blocked_as_epa_dha_substitute',
])

const BLOCKED_SWEETENERS = ['xilitol', 'xylitol', 'maltitol', 'sorbitol', 'sucralose']

export function hasBlockedSweetener(product: HumanOmega3Product): boolean {
  return product.sweeteners.some((s) =>
    BLOCKED_SWEETENERS.some((b) => s.toLowerCase().includes(b)),
  )
}

export function isProductBlocked(product: HumanOmega3Product): boolean {
  if (BLOCKED_SUITABILITIES.has(product.veterinarySuitability)) return true
  if (product.marketStatus === 'blocked') return true
  if (hasBlockedSweetener(product)) return true
  if (product.sourceType === 'cod_liver_oil') return true
  if (product.sourceType === 'plant_ala' && product.veterinarySuitability === 'blocked_as_epa_dha_substitute') {
    return true
  }
  return false
}

export function canCalculateDose(product: HumanOmega3Product): boolean {
  if (!product.clinicalCalculationEnabled) return false
  if (isProductBlocked(product)) return false
  if (product.epaMgPerUnit == null || product.dhaMgPerUnit == null) return false
  if (product.epaDhaMgPerUnit == null || product.epaDhaMgPerUnit <= 0) return false
  if (product.marketStatus === 'conflicting_data') return false
  return true
}

export function missingEpaDhaToNull(value: number | null | undefined): number | null {
  if (value === undefined || value === null || Number.isNaN(value)) return null
  return value
}

export function inferEpaDhaPerUnit(product: HumanOmega3Product): {
  epaMgPerUnit: number | null
  dhaMgPerUnit: number | null
  epaDhaMgPerUnit: number | null
} {
  let epa = missingEpaDhaToNull(product.epaMgPerUnit)
  let dha = missingEpaDhaToNull(product.dhaMgPerUnit)
  let combined = missingEpaDhaToNull(product.epaDhaMgPerUnit)

  if (epa != null && dha != null && combined == null) {
    combined = epa + dha
  }
  if (epa == null && dha == null && combined != null && product.unitsPerHumanServing) {
    return { epaMgPerUnit: null, dhaMgPerUnit: null, epaDhaMgPerUnit: null }
  }
  if (epa != null && dha != null) {
    combined = epa + dha
  }
  return { epaMgPerUnit: epa, dhaMgPerUnit: dha, epaDhaMgPerUnit: combined }
}

/** Nunca interpretar título comercial "1000 mg" como EPA+DHA. */
export function isMisleadingCommercialTitle(name: string): boolean {
  return /\b(1000|1400|1500|500)\s*mg\b/i.test(name) && !/\bepa\b/i.test(name)
}

export function isDhaPredominant(product: HumanOmega3Product): boolean {
  const { epaMgPerUnit, dhaMgPerUnit } = inferEpaDhaPerUnit(product)
  if (epaMgPerUnit == null || dhaMgPerUnit == null) return false
  return dhaMgPerUnit > epaMgPerUnit * 1.5
}

export function shouldWarnSubstituteBalanced(product: HumanOmega3Product): boolean {
  return product.cannotSubstituteBalancedEpaDha === true || isDhaPredominant(product)
}
