import type { MacroEnergyMethod, Species, ValidationIssue } from './types'
import { rejectIfInvalidMoisture } from './units'

export interface FoodCompositionInput {
  proteinPct: number | null
  fatPct: number | null
  crudeFiberPct: number | null
  moisturePct: number | null
  ashPct: number | null
  measuredEnergyKcalPer100g?: number | null
}

export function calculateNfePercent(input: FoodCompositionInput): {
  nfePct: number | null
  estimatedAsh: boolean
  issues: ValidationIssue[]
} {
  const issues: ValidationIssue[] = []
  const moisture = input.moisturePct ?? null
  if (moisture != null) {
    const mIssue = rejectIfInvalidMoisture(moisture)
    if (mIssue) issues.push(mIssue)
  }

  let ash = input.ashPct
  let estimatedAsh = false
  if (ash == null && input.moisturePct != null) {
    ash = input.moisturePct < 20 ? 8 : 2.5
    estimatedAsh = true
    issues.push({
      code: 'ash_estimated',
      message: 'Cinzas estimadas — composição incompleta.',
      severity: 'warning',
    })
  }

  const protein = input.proteinPct ?? 0
  const fat = input.fatPct ?? 0
  const fiber = input.crudeFiberPct ?? 0
  const moistureVal = input.moisturePct ?? 0
  const ashVal = ash ?? 0

  const nfe = 100 - protein - fat - fiber - moistureVal - ashVal
  if (nfe < 0) {
    issues.push({
      code: 'negative_nfe',
      message: 'NFE negativo — verificar qualidade dos dados.',
      severity: 'warning',
    })
    return { nfePct: nfe, estimatedAsh, issues }
  }
  return { nfePct: nfe, estimatedAsh, issues }
}

export function calculateGrossEnergyFediaf(
  proteinPct: number,
  fatPct: number,
  nfePct: number,
  fiberPct: number,
): number {
  return 5.7 * proteinPct + 9.4 * fatPct + 4.1 * (nfePct + fiberPct)
}

export function calculateEnergyDigestibility(species: Species, crudeFiberPctDryMatter: number): number {
  if (species === 'dog') return 91.2 - 1.43 * crudeFiberPctDryMatter
  return 87.9 - 0.88 * crudeFiberPctDryMatter
}

export function calculateMetabolizableEnergyFediaf(
  species: Species,
  input: FoodCompositionInput,
): { kcalPer100g: number | null; method: string; issues: ValidationIssue[] } {
  if (input.measuredEnergyKcalPer100g != null && input.measuredEnergyKcalPer100g > 0) {
    return {
      kcalPer100g: input.measuredEnergyKcalPer100g,
      method: 'Energia metabolizável medida',
      issues: [],
    }
  }

  const { nfePct, issues } = calculateNfePercent(input)
  if (nfePct == null) return { kcalPer100g: null, method: 'Dados insuficientes', issues }

  const protein = input.proteinPct ?? 0
  const fat = input.fatPct ?? 0
  const fiber = input.crudeFiberPct ?? 0
  const ge = calculateGrossEnergyFediaf(protein, fat, nfePct, fiber)
  const dmPct = 100 - (input.moisturePct ?? 0)
  const fiberDm = dmPct > 0 ? (fiber / dmPct) * 100 : fiber
  const digestibility = calculateEnergyDigestibility(species, fiberDm)
  const de = (ge * digestibility) / 100
  const me =
    species === 'dog' ? de - 1.04 * protein : de - 0.77 * protein

  return { kcalPer100g: me, method: 'Equação FEDIAF/NRC (4 etapas)', issues }
}

export function calculateModifiedAtwaterKcalPer100g(
  proteinPct: number,
  fatPct: number,
  nfePct: number,
): number {
  return 3.5 * proteinPct + 8.5 * fatPct + 3.5 * nfePct
}

export function calculateNaturalIngredientMe(
  species: Species,
  proteinPct: number,
  fatPct: number,
  nfePct: number,
): number {
  if (species === 'cat') return 4 * proteinPct + 8.5 * fatPct + 4 * nfePct
  return 4 * proteinPct + 9 * fatPct + 4 * nfePct
}

export function calculateMacroEnergySplit(options: {
  proteinGrams: number
  fatGrams: number
  carbohydrateGrams: number
  method: MacroEnergyMethod
}): {
  proteinKcal: number
  fatKcal: number
  carbKcal: number
  proteinPct: number
  fatPct: number
  carbPct: number
} {
  let proteinKcal: number
  let fatKcal: number
  let carbKcal: number

  if (options.method === 'modified_atwater') {
    proteinKcal = options.proteinGrams * 3.5
    fatKcal = options.fatGrams * 8.5
    carbKcal = options.carbohydrateGrams * 3.5
  } else {
    const fatMultiplier = options.method === 'natural_ingredient' ? 9 : 9
    proteinKcal = options.proteinGrams * 4
    fatKcal = options.fatGrams * fatMultiplier
    carbKcal = options.carbohydrateGrams * 4
  }

  const total = proteinKcal + fatKcal + carbKcal
  if (total <= 0) {
    return { proteinKcal: 0, fatKcal: 0, carbKcal: 0, proteinPct: 0, fatPct: 0, carbPct: 0 }
  }
  return {
    proteinKcal,
    fatKcal,
    carbKcal,
    proteinPct: (proteinKcal / total) * 100,
    fatPct: (fatKcal / total) * 100,
    carbPct: (carbKcal / total) * 100,
  }
}
