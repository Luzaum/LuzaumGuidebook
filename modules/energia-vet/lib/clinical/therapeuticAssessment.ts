import type { NutrientAmountMap } from '../../types'
import type {
  ClinicalReason,
  ClinicalSuitability,
  FoodDetails,
  MissingCriticalDatum,
} from '../catalog/types'
import type { NutrientGoal, TherapeuticProfile } from './therapeuticProfiles'

function getNutrientValueOnDryMatter(food: FoodDetails, key: string): number | null {
  const dm = food.nutrientsDryMatter[key]
  if (dm != null) return dm

  const asFed = food.nutrientsAsFed[key]
  const dryMatterPct = food.nutrientsAsFed.dryMatterPct
  if (asFed == null || dryMatterPct == null || dryMatterPct <= 0) return null
  return (asFed * 100) / dryMatterPct
}

function getCopperMgPerKgDm(food: FoodDetails): number | null {
  const copperMg = getNutrientValueOnDryMatter(food, 'copperMg')
  if (copperMg != null) return copperMg
  const asFedCopper = food.nutrientsAsFed.copperMg
  if (asFedCopper == null) return null
  const dmPct = food.nutrientsDryMatter.dryMatterPct ?? food.nutrientsAsFed.dryMatterPct
  if (dmPct == null || dmPct <= 0) return null
  return (asFedCopper * 100) / dmPct
}

function resolveGoalValue(food: FoodDetails, goal: NutrientGoal): number | null {
  if (goal.nutrientKey === 'copperMg' && goal.basis === 'mg_per_kg_dm') {
    return getCopperMgPerKgDm(food)
  }
  if (goal.nutrientKey === 'epaDhaPct') {
    const epa = getNutrientValueOnDryMatter(food, 'epaPct')
    const dha = getNutrientValueOnDryMatter(food, 'dhaPct')
    const combined = getNutrientValueOnDryMatter(food, 'epaDhaPct')
    if (combined != null) return combined
    if (epa == null && dha == null) return null
    return (epa ?? 0) + (dha ?? 0)
  }
  return getNutrientValueOnDryMatter(food, goal.nutrientKey)
}

export interface GoalEvaluation {
  goal: NutrientGoal
  value: number | null
  status: 'match' | 'below' | 'above' | 'missing'
  messagePt: string
}

export function evaluateNutrientGoal(food: FoodDetails, goal: NutrientGoal): GoalEvaluation {
  const value = resolveGoalValue(food, goal)

  if (goal.operator === 'present') {
    if (value == null || food.missingNutrients.includes(goal.nutrientKey)) {
      return {
        goal,
        value: null,
        status: 'missing',
        messagePt: `${goal.labelPt} ausente — impossível avaliar adequação completa.`,
      }
    }
    return {
      goal,
      value,
      status: 'match',
      messagePt: `${goal.labelPt} disponível (${value.toFixed(2)} ${goal.unit}).`,
    }
  }

  if (value == null) {
    return {
      goal,
      value: null,
      status: 'missing',
      messagePt: goal.critical
        ? `${goal.labelPt} ausente — dado crítico para este perfil.`
        : `${goal.labelPt} ausente — comparação limitada.`,
    }
  }

  if (goal.operator === 'lte' && goal.max != null) {
    if (value <= goal.max) {
      return { goal, value, status: 'match', messagePt: `${goal.labelPt} dentro do limite (${value.toFixed(2)} ≤ ${goal.max} ${goal.unit}).` }
    }
    return { goal, value, status: 'above', messagePt: `${goal.labelPt} acima do limite (${value.toFixed(2)} > ${goal.max} ${goal.unit}).` }
  }

  if (goal.operator === 'gte' && goal.min != null) {
    if (value >= goal.min) {
      return { goal, value, status: 'match', messagePt: `${goal.labelPt} atende mínimo (${value.toFixed(2)} ≥ ${goal.min} ${goal.unit}).` }
    }
    return { goal, value, status: 'below', messagePt: `${goal.labelPt} abaixo do mínimo (${value.toFixed(2)} < ${goal.min} ${goal.unit}).` }
  }

  if (goal.operator === 'between' && goal.min != null && goal.max != null) {
    if (value >= goal.min && value <= goal.max) {
      return { goal, value, status: 'match', messagePt: `${goal.labelPt} na faixa (${value.toFixed(2)} ${goal.unit}).` }
    }
    if (value < goal.min) {
      return { goal, value, status: 'below', messagePt: `${goal.labelPt} abaixo da faixa (${value.toFixed(2)} < ${goal.min} ${goal.unit}).` }
    }
    return { goal, value, status: 'above', messagePt: `${goal.labelPt} acima da faixa (${value.toFixed(2)} > ${goal.max} ${goal.unit}).` }
  }

  return { goal, value, status: 'missing', messagePt: `${goal.labelPt} — regra não avaliada.` }
}

export function assessFoodAgainstProfile(
  food: FoodDetails,
  profile: TherapeuticProfile,
): {
  positiveMatches: ClinicalReason[]
  cautions: ClinicalReason[]
  hardExclusions: ClinicalReason[]
  missingCriticalData: MissingCriticalDatum[]
  suitability: ClinicalSuitability
} {
  const positiveMatches: ClinicalReason[] = []
  const cautions: ClinicalReason[] = []
  const hardExclusions: ClinicalReason[] = []
  const missingCriticalData: MissingCriticalDatum[] = []

  let hasMismatch = false
  let hasCriticalMissing = false

  for (const goal of profile.nutritionalGoals) {
    const evaluation = evaluateNutrientGoal(food, goal)

    if (evaluation.status === 'missing') {
      if (goal.critical) {
        hasCriticalMissing = true
        missingCriticalData.push({
          nutrientDefinitionId: goal.nutrientKey,
          labelPt: goal.labelPt,
          reason: evaluation.messagePt,
        })
      } else {
        cautions.push({
          code: `missing_${goal.nutrientKey}`,
          messagePt: evaluation.messagePt,
          severity: 'caution',
        })
      }
      continue
    }

    if (evaluation.status === 'match') {
      positiveMatches.push({
        code: `match_${profile.id}_${goal.nutrientKey}`,
        messagePt: evaluation.messagePt,
        severity: 'info',
      })
      continue
    }

    hasMismatch = true
    cautions.push({
      code: `mismatch_${profile.id}_${goal.nutrientKey}`,
      messagePt: evaluation.messagePt,
      severity: 'caution',
    })
  }

  for (const caution of profile.relativeCautions) {
    cautions.push({ code: `profile_caution_${profile.id}`, messagePt: caution, severity: 'caution' })
  }

  let suitability: ClinicalSuitability = 'consider'
  if (hasCriticalMissing) {
    suitability = 'insufficient_data'
  } else if (hardExclusions.length > 0) {
    suitability = 'avoid'
  } else if (hasMismatch) {
    suitability = 'consider'
  } else if (positiveMatches.length > 0) {
    suitability = 'suitable'
  } else {
    suitability = 'insufficient_data'
  }

  return { positiveMatches, cautions, hardExclusions, missingCriticalData, suitability }
}

export function inferManufacturerClaims(food: FoodDetails): { claimType: string; text: string }[] {
  const name = food.canonicalNamePt.toLowerCase()
  const claims: { claimType: string; text: string }[] = []

  if (/renal/i.test(name)) claims.push({ claimType: 'manufacturer_indication', text: 'Alegação comercial: linha renal.' })
  if (/urin|urinary|urolit|s\/o|c\/d/i.test(name)) claims.push({ claimType: 'manufacturer_indication', text: 'Alegação comercial: linha urinária.' })
  if (/hepat|hepatic/i.test(name)) claims.push({ claimType: 'manufacturer_indication', text: 'Alegação comercial: linha hepática.' })
  if (/hydro|hypo|ultra/i.test(name)) claims.push({ claimType: 'manufacturer_indication', text: 'Alegação comercial: proteína modificada/hidrolisada.' })

  return claims
}

/** Extrai snapshot de nutrientes críticos para relatório. */
export function snapshotCriticalNutrients(food: FoodDetails): NutrientAmountMap {
  const keys = ['phosphorusPct', 'crudeProteinPct', 'sodiumPct', 'potassiumPct', 'etherExtractPct', 'copperMg', 'taurinePct']
  return Object.fromEntries(keys.map((key) => [key, getNutrientValueOnDryMatter(food, key)]))
}
