import type {
  AppliedPriority,
  CanonicalNutritionInput,
  ClinicianDecisionRequest,
  ConflictResolutionResult,
  ResolvedNutrientTarget,
  TherapeuticConflict,
} from './types'
import { THERAPEUTIC_PROFILE_REGISTRY_VERSION } from './schemaVersion'
import {
  getTherapeuticProfileV3ById,
  resolveTherapeuticProfilesV3,
  type NutrientTargetRule,
  type TherapeuticNutritionProfileV3,
} from './therapeuticProfilesV3'
import { applyGoalCalibratedTargets } from './nutrientTargetCalibration'
import { computeBodyTargetPlan } from './bodyTargetPlan'

const PRIORITY_RULES: AppliedPriority[] = [
  { rank: 1, ruleId: 'safety_immediate', labelPt: 'Segurança imediata' },
  { rank: 2, ruleId: 'acute_decompensation', labelPt: 'Prevenção de descompensação aguda' },
  { rank: 3, ruleId: 'absolute_contraindication', labelPt: 'Contraindicação absoluta' },
  { rank: 4, ruleId: 'lab_proven_imbalance', labelPt: 'Desequilíbrio laboratorial comprovado' },
  { rank: 5, ruleId: 'preserve_lean_mass', labelPt: 'Preservação de ingestão e massa magra' },
  { rank: 6, ruleId: 'primary_disease', labelPt: 'Tratamento nutricional da doença prioritária' },
]

const HARD_CONFLICTS: Array<{
  profiles: [string, string]
  nutrientKey?: string
  messagePt: string
}> = [
  {
    profiles: ['urolith_struvite_dissolution', 'urolith_calcium_oxalate_prevention'],
    messagePt: 'Dissolução de estruvita e prevenção de oxalato são objetivos incompatíveis — decisão clínica necessária.',
  },
  {
    profiles: ['diabetes_dog', 'ckd_dog_iris_3'],
    nutrientKey: 'crudeProteinPct',
    messagePt: 'Diabetes (alta densidade proteica) versus DRC estágio 3 (proteína moderada) — conciliar com UPC, glicemia e palatabilidade.',
  },
  {
    profiles: ['diabetes_cat_insulin', 'ckd_cat_iris_2'],
    nutrientKey: 'crudeProteinPct',
    messagePt: 'Diabetes felina (alta proteína) versus DRC (ajuste proteico) exige conciliação clínica.',
  },
  {
    profiles: ['obesity_dog', 'pancreatitis_dog'],
    messagePt: 'Fase aguda de pancreatite versus emagrecimento ambulatorial — priorizar tolerância antes de restrição.',
  },
  {
    profiles: ['diabetes_cat_sglt2', 'obesity_dog'],
    messagePt: 'SGLT2 felino: evitar restrição calórica agressiva com hiporexia.',
  },
]

function muscleLossBlocksWeightLoss(input: CanonicalNutritionInput): TherapeuticConflict | null {
  const emc = input.patient.muscleConditionScore
  const bcs = input.patient.bodyConditionScore?.value ?? 5
  if ((emc === 'moderate_loss' || emc === 'severe_loss') && bcs >= 6) {
    return {
      id: 'emc_vs_weight_loss',
      severity: 'hard',
      profileIds: ['obesity_dog'],
      messagePt:
        'ECC elevado com EMC reduzida — não aplicar restrição energética agressiva automaticamente; priorizar preservação de massa magra.',
      requiresClinicianDecision: true,
    }
  }
  return null
}

function detectHardConflicts(profileIds: string[]): TherapeuticConflict[] {
  const active = new Set(profileIds)
  const conflicts: TherapeuticConflict[] = []

  for (const rule of HARD_CONFLICTS) {
    const [a, b] = rule.profiles
    if (active.has(a) && active.has(b)) {
      conflicts.push({
        id: `${a}__${b}`,
        severity: 'hard',
        profileIds: [a, b],
        nutrientKey: rule.nutrientKey,
        messagePt: rule.messagePt,
        requiresClinicianDecision: true,
      })
    }
  }

  for (const id of profileIds) {
    const profile = getTherapeuticProfileV3ById(id)
    if (!profile) continue
    for (const conflictId of profile.conflictProfileIds) {
      if (active.has(conflictId)) {
        conflicts.push({
          id: `${id}__${conflictId}`,
          severity: 'negotiable',
          profileIds: [id, conflictId],
          messagePt: `Perfis ${profile.displayNamePtBr} e ${getTherapeuticProfileV3ById(conflictId)?.displayNamePtBr ?? conflictId} requerem conciliação.`,
          requiresClinicianDecision: false,
        })
      }
    }
  }

  return conflicts
}

function mergeNutrientTargets(profiles: TherapeuticNutritionProfileV3[]): {
  resolved: ResolvedNutrientTarget[]
  conflicts: TherapeuticConflict[]
} {
  const byKey = new Map<string, ResolvedNutrientTarget[]>()
  const conflicts: TherapeuticConflict[] = []

  for (const profile of profiles) {
    for (const rule of profile.nutrientTargets) {
      const resolved = ruleToTarget(rule, profile)
      const list = byKey.get(rule.nutrientKey) ?? []
      list.push(resolved)
      byKey.set(rule.nutrientKey, list)
    }
  }

  const resolved: ResolvedNutrientTarget[] = []

  for (const [nutrientKey, targets] of byKey.entries()) {
    if (targets.length === 1) {
      resolved.push(targets[0])
      continue
    }

    const mins = targets.map((t) => t.minimum).filter((v): v is number => v != null)
    const maxs = targets.map((t) => t.maximum).filter((v): v is number => v != null)
    const mergedMin = mins.length ? Math.max(...mins) : undefined
    const mergedMax = maxs.length ? Math.min(...maxs) : undefined

    if (mergedMin != null && mergedMax != null && mergedMin > mergedMax) {
      conflicts.push({
        id: `nutrient_${nutrientKey}`,
        severity: 'hard',
        profileIds: targets.map((t) => t.profileId),
        nutrientKey,
        messagePt: `Metas incompatíveis para ${targets[0].labelPt}: mínimo ${mergedMin} vs máximo ${mergedMax}. Decisão clínica necessária — não usar média.`,
        requiresClinicianDecision: true,
      })
      resolved.push(...targets)
      continue
    }

    resolved.push({
      ...targets[0],
      minimum: mergedMin,
      maximum: mergedMax,
      rationale: `Conciliação entre ${targets.length} perfis ativos.`,
    })
  }

  return { resolved, conflicts }
}

function ruleToTarget(rule: NutrientTargetRule, profile: TherapeuticNutritionProfileV3): ResolvedNutrientTarget {
  return {
    nutrientKey: rule.nutrientKey,
    labelPt: rule.labelPt,
    basis: rule.basis,
    minimum: rule.minimum,
    maximum: rule.maximum,
    unit: rule.unit,
    profileId: profile.id,
    profileVersion: profile.version,
    evidenceIds: rule.evidenceIds,
    confidence: rule.confidence,
    rationale: rule.descriptionPtBr,
  }
}

export function resolveTherapeuticConflicts(input: CanonicalNutritionInput): ConflictResolutionResult {
  const profiles = resolveTherapeuticProfilesV3(input)
  const profileIds = profiles.map((p) => p.id)

  const hardFromPairs = detectHardConflicts(profileIds)
  const emcConflict = muscleLossBlocksWeightLoss(input)
  const { resolved, conflicts: nutrientConflicts } = mergeNutrientTargets(profiles)
  const bodyPlan = computeBodyTargetPlan(input)
  const calibratedTargets = applyGoalCalibratedTargets(input, resolved, {
    activeProfileIds: profileIds,
    maintenanceEnergyKcal: bodyPlan?.maintenanceEnergyKcal,
    targetEnergyKcal: bodyPlan?.targetEnergyKcal,
  })

  const unresolvedConflicts = [
    ...hardFromPairs,
    ...(emcConflict ? [emcConflict] : []),
    ...nutrientConflicts,
  ]

  const clinicianDecisionsRequired: ClinicianDecisionRequest[] = unresolvedConflicts
    .filter((c) => c.requiresClinicianDecision)
    .map((c) => ({
      id: `decision_${c.id}`,
      promptPt: c.messagePt,
      options: ['Priorizar perfil A', 'Priorizar perfil B', 'Ajuste manual documentado'],
      relatedConflictIds: [c.id],
    }))

  return {
    resolvedTargets: calibratedTargets,
    unresolvedConflicts,
    appliedPriorities: PRIORITY_RULES,
    clinicianDecisionsRequired,
    activeProfileIds: profileIds,
  }
}

export function getTherapeuticRegistryVersion(): string {
  return THERAPEUTIC_PROFILE_REGISTRY_VERSION
}
