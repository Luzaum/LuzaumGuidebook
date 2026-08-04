import {
  CANINE_METABOLIC_EXPONENT,
  FELINE_EPA_DHA_CAUTION_MG_PER_METABOLIC,
  FELINE_METABOLIC_EXPONENT,
  type HumanOmega3Product,
  type Omega3DoseCalculationInput,
  type Omega3DoseCalculationResult,
  type Omega3EffectiveDose,
} from './types'
import { canCalculateDose, inferEpaDhaPerUnit } from './regulatoryValidation'

function metabolicWeight(weightKg: number, exponent: number): number {
  return Math.pow(weightKg, exponent)
}

function effectiveFromCapsules(capsules: number, product: HumanOmega3Product): Omega3EffectiveDose {
  const { epaMgPerUnit, dhaMgPerUnit, epaDhaMgPerUnit } = inferEpaDhaPerUnit(product)
  const epa = (epaMgPerUnit ?? 0) * capsules
  const dha = (dhaMgPerUnit ?? 0) * capsules
  return {
    epaMg: epa,
    dhaMg: dha,
    epaDhaMg: epaDhaMgPerUnit != null ? epaDhaMgPerUnit * capsules : epa + dha,
  }
}

function percentDiff(actual: number, target: number): number {
  if (target <= 0) return 0
  return ((actual - target) / target) * 100
}

export function calculateOmega3Dose(input: Omega3DoseCalculationInput): Omega3DoseCalculationResult | null {
  const { product, prescription, weightKg, species } = input
  if (!canCalculateDose(product)) return null

  const { epaMgPerUnit, dhaMgPerUnit, epaDhaMgPerUnit } = inferEpaDhaPerUnit(product)
  if (epaDhaMgPerUnit == null || epaDhaMgPerUnit <= 0) return null

  const exponent =
    input.metabolicExponent ??
    (species === 'cat' ? FELINE_METABOLIC_EXPONENT : CANINE_METABOLIC_EXPONENT)
  const mw = metabolicWeight(weightKg, exponent)

  let targetEpaMg = 0
  let targetDhaMg = 0
  let targetCombinedMg = 0

  if (prescription.combinedMgPerMetabolicKg != null) {
    targetCombinedMg = prescription.combinedMgPerMetabolicKg * mw
  }
  if (prescription.epaMgPerKg != null) {
    targetEpaMg = prescription.epaMgPerKg * weightKg
  }
  if (prescription.dhaMgPerKg != null) {
    targetDhaMg = prescription.dhaMgPerKg * weightKg
  }

  if (prescription.epaMgPerKg != null || prescription.dhaMgPerKg != null) {
    const unitsEpa = epaMgPerUnit! > 0 ? targetEpaMg / epaMgPerUnit! : 0
    const unitsDha = dhaMgPerUnit! > 0 ? targetDhaMg / dhaMgPerUnit! : 0
    const exactCapsules = Math.max(unitsEpa, unitsDha)
    targetCombinedMg = Math.max(targetCombinedMg, exactCapsules * epaDhaMgPerUnit)
  }

  const dietOffset = input.dietEpaDhaMgPerDay ?? 0
  const adjustedCombinedTargetMg = Math.max(0, targetCombinedMg - dietOffset)

  let exactCapsules = adjustedCombinedTargetMg / epaDhaMgPerUnit
  if (prescription.epaMgPerKg != null || prescription.dhaMgPerKg != null) {
    const unitsEpa = epaMgPerUnit! > 0 ? Math.max(0, targetEpaMg - dietOffset * (epaMgPerUnit! / epaDhaMgPerUnit)) / epaMgPerUnit! : 0
    const unitsDha = dhaMgPerUnit! > 0 ? Math.max(0, targetDhaMg - dietOffset * (dhaMgPerUnit! / epaDhaMgPerUnit)) / dhaMgPerUnit! : 0
    exactCapsules = Math.max(unitsEpa, unitsDha)
  }

  const lowerOption = Math.max(0, Math.floor(exactCapsules))
  const upperOption = Math.ceil(exactCapsules)
  const lowerEffective = effectiveFromCapsules(lowerOption, product)
  const upperEffective = effectiveFromCapsules(upperOption, product)

  const warnings: string[] = []
  let felineLimitAlert: string | undefined

  if (species === 'cat') {
    const catLimit = FELINE_EPA_DHA_CAUTION_MG_PER_METABOLIC * mw
    if (upperEffective.epaDhaMg > catLimit) {
      felineLimitAlert = `Dose superior a ${FELINE_EPA_DHA_CAUTION_MG_PER_METABOLIC} mg/kg^0,67 de EPA+DHA — exige supervisão veterinária explícita (Plumb's).`
      warnings.push(felineLimitAlert)
    }
  }

  if (prescription.maxCombinedGramsPerDay != null) {
    const maxMg = prescription.maxCombinedGramsPerDay * 1000
    if (upperEffective.epaDhaMg > maxMg) {
      warnings.push(`Dose efetiva superior ao limite diário sugerido (${prescription.maxCombinedGramsPerDay} g EPA+DHA).`)
    }
  }

  return {
    targetEpaMg,
    targetDhaMg,
    targetCombinedMg,
    adjustedCombinedTargetMg,
    exactCapsules,
    lowerOption,
    upperOption,
    lowerEffective,
    upperEffective,
    percentDifferenceLower: percentDiff(lowerEffective.epaDhaMg, adjustedCombinedTargetMg || targetCombinedMg),
    percentDifferenceUpper: percentDiff(upperEffective.epaDhaMg, adjustedCombinedTargetMg || targetCombinedMg),
    requiresVeterinarianChoice: true,
    fractionalCapsuleEnabled: false,
    felineLimitAlert,
    warnings,
  }
}

export function costPer1000MgEpaDha(packagePrice: number, packageUnits: number, epaDhaMgPerUnit: number): number | null {
  if (packagePrice <= 0 || packageUnits <= 0 || epaDhaMgPerUnit <= 0) return null
  const costPerMg = packagePrice / (packageUnits * epaDhaMgPerUnit)
  return costPerMg * 1000
}

export function monthlyCost(unitsPerDay: number, pricePerUnit: number): number {
  return unitsPerDay * 30 * pricePerUnit
}

/** Nunca usar peso comercial da cápsula como EPA+DHA. */
export function rejectFishOilTitleAsEpaDha(commercialTitleMg: number, epaDhaMgPerUnit: number): boolean {
  return commercialTitleMg !== epaDhaMgPerUnit
}
