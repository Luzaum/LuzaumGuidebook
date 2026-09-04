/**
 * Avaliação terapêutica via perfis canônicos V3 (sem motor clínico legado V2).
 */

import type { DietEvaluation, Species, TherapeuticDietReview } from '../types'
import { mapStoreToCanonicalInput, resolveTherapeuticConflicts } from './canonical'
import { THERAPEUTIC_PROFILE_REGISTRY_VERSION } from './canonical/schemaVersion'
import { getTherapeuticProfileV3ById } from './canonical/therapeuticProfilesV3'

export type { TherapeuticDietReview } from '../types'

export function evaluateDietAgainstTherapeuticProfiles(options: {
  species: Species
  comorbidityIds?: string[]
  evaluation: DietEvaluation
}): TherapeuticDietReview {
  const input = mapStoreToCanonicalInput({
    patient: { species: options.species, comorbidityIds: options.comorbidityIds ?? [] },
  })
  const resolution = resolveTherapeuticConflicts(input)

  if (!resolution.activeProfileIds.length) {
    return {
      activeProfileIds: [],
      ruleSetVersion: THERAPEUTIC_PROFILE_REGISTRY_VERSION,
      profiles: [],
      conflicts: resolution.unresolvedConflicts.map((c) => ({
        profileA: c.profileIds[0] ?? '',
        profileB: c.profileIds[1] ?? '',
        messagePt: c.messagePt,
      })),
      monitoringRecommendations: [],
      overallStatus: 'none',
    }
  }

  const profiles = resolution.activeProfileIds
    .map((profileId) => {
      const profile = getTherapeuticProfileV3ById(profileId)
      if (!profile) return null
      return {
        profileId,
        profileName: profile.displayNamePtBr,
        ruleSetVersion: profile.version,
        goals: resolution.resolvedTargets
          .filter((t) => t.profileId === profileId)
          .map((t) => ({
            label: t.labelPt,
            status: 'match' as const,
            messagePt: t.rationale,
          })),
        status: 'adequate' as const,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const hasHardConflict = resolution.unresolvedConflicts.some((c) => c.severity === 'hard')

  return {
    activeProfileIds: resolution.activeProfileIds,
    ruleSetVersion: THERAPEUTIC_PROFILE_REGISTRY_VERSION,
    profiles,
    conflicts: resolution.unresolvedConflicts.map((c) => ({
      profileA: c.profileIds[0] ?? '',
      profileB: c.profileIds[1] ?? '',
      messagePt: c.messagePt,
    })),
    monitoringRecommendations: resolution.activeProfileIds.flatMap((id) => {
      const p = getTherapeuticProfileV3ById(id)
      if (!p?.monitoring) return []
      return Array.isArray(p.monitoring) ? p.monitoring : [p.monitoring]
    }),
    overallStatus: hasHardConflict ? 'caution' : 'adequate',
  }
}

export const THERAPEUTIC_PROFILE_COUNT = 34
