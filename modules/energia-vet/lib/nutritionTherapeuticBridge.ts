/**
 * Ponte motor v3 ↔ perfis terapêuticos versionados (28 perfis).
 */

import type {
  DietEvaluation,
  Species,
  TherapeuticDietReview,
  TherapeuticProfileDietReview,
} from '../types'
import {
  CLINICAL_RULE_SET_V2,
  detectTherapeuticProfileConflicts,
  evaluateDeliveredNutrientGoal,
  getTherapeuticProfileById,
  resolveActiveTherapeuticProfiles,
  type GoalEvaluation,
  type TherapeuticProfileId,
} from './clinical'
import { buildMonitoringPlanForProfiles } from './clinical/monitoringPlan'

export type { TherapeuticDietReview, TherapeuticProfileDietReview } from '../types'

function getDeliveredValueForGoal(
  goal: GoalEvaluation['goal'],
  evaluation: DietEvaluation,
  totalDryMatterGrams: number,
): number | null {
  if (goal.nutrientKey === 'copperMg' && goal.basis === 'mg_per_kg_dm') {
    const copperMg = evaluation.totalDelivered.copperMg
    if (copperMg == null || totalDryMatterGrams <= 0) return null
    return (copperMg * 1000) / totalDryMatterGrams
  }

  if (goal.nutrientKey === 'epaDhaPct') {
    const epa = evaluation.deliveredAsPercentDm.epaPct
    const dha = evaluation.deliveredAsPercentDm.dhaPct
    const combined = evaluation.deliveredAsPercentDm.epaDhaPct
    if (combined != null) return combined
    if (epa == null && dha == null) return null
    return (epa ?? 0) + (dha ?? 0)
  }

  return evaluation.deliveredAsPercentDm[goal.nutrientKey] ?? null
}

function profileStatusFromGoals(goals: GoalEvaluation[]): TherapeuticProfileDietReview['status'] {
  if (goals.some((goal) => goal.goal.critical && goal.status === 'missing')) return 'insufficient_data'
  if (goals.some((goal) => goal.status === 'above' || goal.status === 'below')) return 'caution'
  if (goals.some((goal) => goal.status === 'match')) return 'adequate'
  return 'insufficient_data'
}

export function resolveTherapeuticProfilesForPatient(options: {
  species: Species
  comorbidityIds?: string[]
  therapeuticProfileIds?: TherapeuticProfileId[]
}): TherapeuticProfileId[] {
  return resolveActiveTherapeuticProfiles(options.species, {
    comorbidityIds: options.comorbidityIds,
    therapeuticProfileIds: options.therapeuticProfileIds,
  })
}

export function evaluateDietAgainstTherapeuticProfiles(options: {
  species: Species
  comorbidityIds?: string[]
  therapeuticProfileIds?: TherapeuticProfileId[]
  evaluation: DietEvaluation
  totalDryMatterGrams: number
}): TherapeuticDietReview {
  const activeProfileIds = resolveTherapeuticProfilesForPatient({
    species: options.species,
    comorbidityIds: options.comorbidityIds,
    therapeuticProfileIds: options.therapeuticProfileIds,
  })

  if (!activeProfileIds.length) {
    return {
      activeProfileIds: [],
      ruleSetVersion: CLINICAL_RULE_SET_V2,
      profiles: [],
      conflicts: [],
      monitoringRecommendations: [],
      overallStatus: 'none',
    }
  }

  const profiles: TherapeuticProfileDietReview[] = activeProfileIds
    .map((profileId) => {
      const profile = getTherapeuticProfileById(profileId)
      if (!profile) return null
      const goals = profile.nutritionalGoals.map((goal) =>
        evaluateDeliveredNutrientGoal(goal, getDeliveredValueForGoal(goal, options.evaluation, options.totalDryMatterGrams)),
      )
      return {
        profileId,
        profileName: profile.namePt,
        ruleSetVersion: profile.ruleSetVersion,
        goals: goals.map((goal) => ({
          label: goal.goal.labelPt,
          status: goal.status,
          messagePt: goal.messagePt,
        })),
        status: profileStatusFromGoals(goals),
      }
    })
    .filter((item): item is TherapeuticProfileDietReview => Boolean(item))

  const conflicts = detectTherapeuticProfileConflicts(activeProfileIds)
  const monitoringRecommendations = buildMonitoringPlanForProfiles(
    activeProfileIds.map((id) => getTherapeuticProfileById(id)).filter((profile): profile is NonNullable<typeof profile> => Boolean(profile)),
  )

  let overallStatus: TherapeuticDietReview['overallStatus'] = 'adequate'
  if (profiles.some((profile) => profile.status === 'insufficient_data')) overallStatus = 'insufficient_data'
  else if (conflicts.length > 0 || profiles.some((profile) => profile.status === 'caution')) overallStatus = 'caution'

  return {
    activeProfileIds,
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    profiles,
    conflicts,
    monitoringRecommendations,
    overallStatus,
  }
}

export const THERAPEUTIC_PROFILE_COUNT = 28
