import type { DietFormulationInput, DietFormulationResult, ValidationIssue } from './types'
import { roundTo } from './units'

const PROPORTION_TOLERANCE = 0.01

export function sumEnergyAllocations(entries: DietFormulationInput['entries']): number {
  return entries.reduce((s, e) => s + (e.fixedKcalPerDay != null ? 0 : e.energyAllocationPct), 0)
}

export function validateFormulationProportions(entries: DietFormulationInput['entries']): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const sum = sumEnergyAllocations(entries)
  if (entries.length === 0) {
    issues.push({ code: 'no_foods', message: 'Nenhum alimento na formulação.', severity: 'error' })
    return issues
  }
  if (Math.abs(sum - 100) > PROPORTION_TOLERANCE) {
    issues.push({
      code: 'proportion_not_100',
      message: `Soma das proporções calóricas: ${sum.toFixed(1)}% (deve ser 100%).`,
      severity: 'error',
    })
  }
  return issues
}

export function normalizeEnergyAllocations(
  entries: DietFormulationInput['entries'],
): DietFormulationInput['entries'] {
  const fixedKcal = entries.reduce((s, e) => s + (e.fixedKcalPerDay ?? 0), 0)
  const variable = entries.filter((e) => e.fixedKcalPerDay == null)
  const sum = variable.reduce((s, e) => s + e.energyAllocationPct, 0)
  if (sum <= 0) return entries
  return entries.map((e) =>
    e.fixedKcalPerDay != null
      ? e
      : { ...e, energyAllocationPct: (e.energyAllocationPct / sum) * 100 },
  )
}

export function distributeEqually(count: number): number[] {
  if (count <= 0) return []
  const each = 100 / count
  return Array.from({ length: count }, () => each)
}

export function formulateDiet(input: DietFormulationInput): DietFormulationResult {
  let entries = input.entries
  let normalized = false
  const proportionIssues = validateFormulationProportions(entries)

  if (input.normalizeProportions && proportionIssues.some((i) => i.code === 'proportion_not_100')) {
    entries = normalizeEnergyAllocations(entries)
    normalized = true
  }

  const issues = validateFormulationProportions(entries)
  if (issues.some((i) => i.severity === 'error') && !input.normalizeProportions) {
    return {
      foods: [],
      totalExactKcal: 0,
      totalExactGrams: 0,
      proportionSumPct: sumEnergyAllocations(entries),
      normalized: false,
      issues,
    }
  }

  const fixedKcalTotal = entries.reduce((s, e) => s + (e.fixedKcalPerDay ?? 0), 0)
  const remainingKcal = input.targetKcalDay - fixedKcalTotal

  if (remainingKcal < 0) {
    issues.push({
      code: 'fixed_exceeds_target',
      message: 'Porções fixas excedem a meta calórica.',
      severity: 'error',
    })
    return {
      foods: [],
      totalExactKcal: 0,
      totalExactGrams: 0,
      proportionSumPct: sumEnergyAllocations(entries),
      normalized,
      issues,
    }
  }

  const foods = entries.map((entry) => {
    const kcalPerGram = input.foodKcalPerGram[entry.foodId] ?? 0
    let kcal: number
    if (entry.fixedKcalPerDay != null) {
      kcal = entry.fixedKcalPerDay
    } else if (entry.fixedGramsPerDay != null) {
      kcal = entry.fixedGramsPerDay * kcalPerGram
    } else {
      kcal = (remainingKcal * entry.energyAllocationPct) / 100
    }
    const grams = kcalPerGram > 0 ? kcal / kcalPerGram : entry.fixedGramsPerDay ?? 0
    return {
      foodId: entry.foodId,
      exactGramsPerDay: roundTo(grams, 4),
      exactKcalPerDay: roundTo(kcal, 4),
      energyAllocationPct: entry.energyAllocationPct,
    }
  })

  const totalExactKcal = foods.reduce((s, f) => s + f.exactKcalPerDay, 0)
  const totalExactGrams = foods.reduce((s, f) => s + f.exactGramsPerDay, 0)

  return {
    foods,
    totalExactKcal: roundTo(totalExactKcal, 2),
    totalExactGrams: roundTo(totalExactGrams, 2),
    proportionSumPct: sumEnergyAllocations(entries),
    normalized,
    issues,
  }
}

export function calculateCommercialSingleFoodGrams(targetKcalDay: number, kcalPerGram: number): number | null {
  if (kcalPerGram <= 0) return null
  return targetKcalDay / kcalPerGram
}

export function calculateExtrasPercent(extrasKcal: number, totalDailyKcal: number): number | null {
  if (totalDailyKcal <= 0) return null
  return (extrasKcal / totalDailyKcal) * 100
}

export function mainDietKcalAfterExtras(totalKcal: number, extrasKcal: number): number {
  return Math.max(0, totalKcal - extrasKcal)
}

export function extrasAlert(extrasPercent: number): boolean {
  return extrasPercent > 10
}
