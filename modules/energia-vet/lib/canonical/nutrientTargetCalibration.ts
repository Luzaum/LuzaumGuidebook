import { calculateMaintenanceEnergy } from './energyCalculator'
import type { CanonicalNutritionInput, CanonicalSpecies, ResolvedNutrientTarget } from './types'
import { getTherapeuticProfileV3ById } from './therapeuticProfilesV3'

export type NutritionalGoalMode = 'maintenance' | 'weight_loss' | 'weight_gain' | 'hospital' | 'refeeding'

/** Referências NRC 2006 / AAHA 2021 — proteína mínima em g/1000 kcal ME. */
const PROTEIN_G_PER_1000_KCAL: Record<CanonicalSpecies, Record<NutritionalGoalMode, number>> = {
  dog: { maintenance: 45, weight_loss: 52, weight_gain: 45, hospital: 45, refeeding: 45 },
  cat: { maintenance: 40, weight_loss: 48, weight_gain: 42, hospital: 40, refeeding: 40 },
}

/** Densidade energética típica de alimento seco (kcal/kg MS) para converter g/Mcal ↔ %MS. */
const TYPICAL_DM_KCAL_PER_KG = 3800

export interface NutrientCalibrationContext {
  species: CanonicalSpecies
  goal: NutritionalGoalMode
  targetEnergyKcal: number
  maintenanceEnergyKcal: number
  referenceWeightKg: number
  currentWeightKg: number
  energyRestrictionRatio: number
}

export function buildNutrientCalibrationContext(
  input: CanonicalNutritionInput,
  options?: { targetEnergyKcal?: number; maintenanceEnergyKcal?: number },
): NutrientCalibrationContext {
  const maintenanceResult = calculateMaintenanceEnergy(input)
  const maintenanceEnergyKcal =
    options?.maintenanceEnergyKcal ?? maintenanceResult?.selectedTargetKcalDay ?? input.patient.currentWeightKg * 30
  const targetEnergyKcal =
    options?.targetEnergyKcal ??
    input.calculationPreferences.clinicianEnergyOverrideKcalDay ??
    maintenanceEnergyKcal

  const referenceWeightKg =
    input.patient.targetWeightKg ??
    input.patient.idealWeightKg ??
    input.patient.currentWeightKg

  const goal = input.calculationPreferences.nutritionalGoal ?? 'maintenance'

  return {
    species: input.patient.species,
    goal,
    targetEnergyKcal,
    maintenanceEnergyKcal,
    referenceWeightKg: Math.max(0.1, referenceWeightKg),
    currentWeightKg: Math.max(0.1, input.patient.currentWeightKg),
    energyRestrictionRatio:
      maintenanceEnergyKcal > 0 ? targetEnergyKcal / maintenanceEnergyKcal : 1,
  }
}

export function buildCalibrationSummaryLabel(ctx: NutrientCalibrationContext): string {
  return `[Calibração — ${goalLabel(ctx.goal)}] Energia-alvo ${Math.round(ctx.targetEnergyKcal)} kcal/dia (manutenção ~${Math.round(ctx.maintenanceEnergyKcal)} kcal/dia).`
}

function goalLabel(goal: NutritionalGoalMode): string {
  if (goal === 'weight_loss') return 'emagrecimento'
  if (goal === 'weight_gain') return 'recuperação de peso'
  if (goal === 'hospital') return 'hospitalar'
  if (goal === 'refeeding') return 'realimentação gradual'
  return 'manutenção'
}

function dmPctFromGPer1000(gPer1000: number): number {
  return (gPer1000 * TYPICAL_DM_KCAL_PER_KG) / 10000
}

function gPer1000FromDmPct(pct: number): number {
  return (pct * 10000) / TYPICAL_DM_KCAL_PER_KG
}

function round1(value: number): number {
  return Math.round(value * 10) / 10
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}

function appendNote(existing: string, note: string): string {
  return existing.includes(note) ? existing : `${existing} ${note}`.trim()
}

function calibrateSingleTarget(
  target: ResolvedNutrientTarget,
  ctx: NutrientCalibrationContext,
): ResolvedNutrientTarget {
  const goal = ctx.goal
  const notePrefix = `[Calibração — ${goalLabel(goal)}]`
  let { minimum, maximum, rationale, unit, basis } = target
  let equivalentPer1000Kcal: { minimum?: number; maximum?: number } | undefined

  if (target.nutrientKey === 'crudeProteinPct') {
    const gPer1000 = PROTEIN_G_PER_1000_KCAL[ctx.species][goal]

    if (basis === 'g_day') {
      const baseMin = minimum ?? gPer1000 * (ctx.referenceWeightKg / 1000) * (ctx.targetEnergyKcal / Math.max(ctx.referenceWeightKg * 30, 1))
      if (goal === 'weight_loss') {
        minimum = round1(Math.max(minimum ?? 0, (minimum ?? gPer1000 * 0.05) * 1.08))
        rationale = appendNote(
          rationale,
          `${notePrefix} Proteína mínima elevada para preservar massa magra durante restrição calórica.`,
        )
      } else if (goal === 'weight_gain') {
        minimum = round1(Math.max(minimum ?? 0, (minimum ?? 2) * 1.05))
        rationale = appendNote(rationale, `${notePrefix} Suporte proteico para recuperação ponderal.`)
      }
      equivalentPer1000Kcal = {
        minimum: gPer1000,
      }
      void baseMin
    } else if (basis === 'dry_matter_pct' || basis === 'percent_me') {
      let impliedDmMin = dmPctFromGPer1000(gPer1000)
      if (goal === 'weight_loss' && ctx.energyRestrictionRatio < 0.98) {
        impliedDmMin = impliedDmMin / Math.max(ctx.energyRestrictionRatio, 0.7)
      }
      if (minimum != null) minimum = round1(Math.max(minimum, impliedDmMin))
      else minimum = round1(impliedDmMin)

      if (goal === 'weight_loss') {
        rationale = appendNote(
          rationale,
          `${notePrefix} % proteína ajustada porque a energia está ${Math.round((1 - ctx.energyRestrictionRatio) * 100)}% abaixo da manutenção — densidade proteica deve subir.`,
        )
      }
      equivalentPer1000Kcal = { minimum: gPer1000 }
    } else if (basis === 'per_1000_kcal') {
      minimum = round1(Math.max(minimum ?? 0, gPer1000))
      rationale = appendNote(rationale, `${notePrefix} Mínimo NRC/AAHA para ${goalLabel(goal)}.`)
    }
  }

  if (target.nutrientKey === 'etherExtractPct' && basis === 'percent_me') {
    if (goal === 'weight_loss') {
      const cap = ctx.species === 'cat' ? 22 : 25
      maximum = maximum != null ? round1(Math.min(maximum, cap)) : cap
      rationale = appendNote(
        rationale,
        `${notePrefix} Teto de gordura moderado para favorecer densidade proteica.`,
      )
    } else if (goal === 'weight_gain') {
      const floor = ctx.species === 'cat' ? 15 : 12
      minimum = minimum != null ? round1(Math.max(minimum, floor)) : undefined
      if (maximum != null) maximum = round1(Math.max(maximum, 35))
      rationale = appendNote(rationale, `${notePrefix} Gordura moderada-alta para densidade energética na recuperação.`)
    }
  }

  if (target.nutrientKey === 'phosphorusPct') {
    rationale = appendNote(
      rationale,
      `${notePrefix} Meta de fósforo independe do objetivo ponderal; monitorar sérico.`,
    )
  }

  if (target.nutrientKey === 'crudeFiberPct' && goal === 'weight_loss' && ctx.species === 'dog') {
    minimum = minimum != null ? round1(Math.max(minimum, 5)) : 5
    maximum = maximum != null ? round1(Math.min(maximum, 12)) : 12
    rationale = appendNote(rationale, `${notePrefix} Fibra moderada para saciedade no emagrecimento.`)
  }

  if (target.nutrientKey === 'carbohydrateMePct' && goal === 'weight_loss') {
    maximum = maximum != null ? round1(Math.min(maximum, 10)) : 10
    rationale = appendNote(rationale, `${notePrefix} Carboidrato reduzido para estabilidade glicêmica.`)
  }

  if (minimum != null && maximum != null && minimum > maximum) {
    minimum = round2(maximum * 0.9)
    rationale = appendNote(rationale, `${notePrefix} Faixa reconciliada após calibração.`)
  }

  if (basis === 'dry_matter_pct' && target.nutrientKey === 'crudeProteinPct' && minimum != null) {
    equivalentPer1000Kcal = { minimum: round1(gPer1000FromDmPct(minimum)) }
  }

  return {
    ...target,
    minimum,
    maximum,
    rationale,
    calibratedForGoal: goal,
    equivalentPer1000Kcal,
  }
}

/** Metas basais por condição quando o perfil não define nutrientes numéricos. */
function baselineTargetsForProfile(profileId: string, ctx: NutrientCalibrationContext): ResolvedNutrientTarget[] {
  const profile = getTherapeuticProfileV3ById(profileId)
  if (!profile) return []

  const base = {
    profileId,
    profileVersion: profile.version,
    evidenceIds: profile.evidenceIds,
    confidence: profile.confidence,
  } as const

  const extras: ResolvedNutrientTarget[] = []

  if (profileId.startsWith('cardiac_')) {
    extras.push({
      ...base,
      nutrientKey: 'sodiumPct',
      labelPt: 'Sódio',
      basis: 'dry_matter_pct',
      maximum: profileId.includes('stage_c') ? 0.08 : 0.15,
      unit: '% MS',
      rationale: 'Moderação de sódio conforme estágio cardíaco (AVCN cap. 18).',
    })
  }

  if (profileId === 'oncology_support') {
    const gPer1000 = PROTEIN_G_PER_1000_KCAL[ctx.species].weight_gain
    extras.push({
      ...base,
      nutrientKey: 'crudeProteinPct',
      labelPt: 'Proteína',
      basis: 'per_1000_kcal',
      minimum: gPer1000,
      unit: 'g/1000 kcal',
      rationale: 'Suporte proteico em neoplasia / caquexia (AVCN cap. 19).',
    })
  }

  if (profileId === 'hyperthyroid_cat') {
    extras.push({
      ...base,
      nutrientKey: 'crudeProteinPct',
      labelPt: 'Proteína',
      basis: 'per_1000_kcal',
      minimum: 45,
      unit: 'g/1000 kcal',
      rationale: 'Hipertireoidismo: evitar perda de massa magra (AVCN cap. 17).',
    })
  }

  if (profileId === 'gi_chronic_enteropathy') {
    extras.push({
      ...base,
      nutrientKey: 'crudeProteinPct',
      labelPt: 'Proteína digestível',
      basis: 'dry_matter_pct',
      minimum: ctx.species === 'cat' ? 30 : 18,
      maximum: ctx.species === 'cat' ? 45 : 25,
      unit: '% MS',
      rationale: 'Enteropatia crônica: proteína altamente digestível (AVCN cap. 11).',
    })
  }

  if (profileId === 'exocrine_pancreatic_insufficiency') {
    extras.push({
      ...base,
      nutrientKey: 'crudeProteinPct',
      labelPt: 'Proteína',
      basis: 'dry_matter_pct',
      minimum: ctx.species === 'cat' ? 30 : 18,
      unit: '% MS',
      rationale: 'IPE: dieta digestível com proteína adequada (AVCN cap. 12).',
    })
    extras.push({
      ...base,
      nutrientKey: 'etherExtractPct',
      labelPt: 'Gordura',
      basis: 'percent_me',
      maximum: 20,
      unit: '% ME',
      rationale: 'IPE: moderar gordura até estabilizar digestão.',
    })
  }

  return extras
}

export function calibrateNutrientTargets(
  targets: ResolvedNutrientTarget[],
  ctx: NutrientCalibrationContext,
  activeProfileIds: string[] = [],
): ResolvedNutrientTarget[] {
  const existingKeys = new Set(targets.map((t) => `${t.profileId}:${t.nutrientKey}`))
  const supplemented = [...targets]

  for (const profileId of activeProfileIds) {
    for (const baseline of baselineTargetsForProfile(profileId, ctx)) {
      const key = `${baseline.profileId}:${baseline.nutrientKey}`
      if (!existingKeys.has(key)) {
        supplemented.push(baseline)
        existingKeys.add(key)
      }
    }
  }

  return supplemented.map((target) => calibrateSingleTarget(target, ctx))
}

export function applyGoalCalibratedTargets(
  input: CanonicalNutritionInput,
  targets: ResolvedNutrientTarget[],
  options?: { targetEnergyKcal?: number; maintenanceEnergyKcal?: number; activeProfileIds?: string[] },
): ResolvedNutrientTarget[] {
  const ctx = buildNutrientCalibrationContext(input, options)
  return calibrateNutrientTargets(targets, ctx, options?.activeProfileIds ?? [])
}
