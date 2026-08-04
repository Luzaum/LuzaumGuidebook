import type { Species } from '../../types'
import { mapComorbiditySelectionsToTherapeuticProfilesBridge } from '../profileBridge'
import type { TherapeuticProfileId } from './therapeuticProfiles'
import { getTherapeuticProfileById } from './therapeuticProfiles'

/** Pares de perfis com objetivos frequentemente opostos. */
export const THERAPEUTIC_PROFILE_CONFLICTS: Array<[TherapeuticProfileId, TherapeuticProfileId, string]> = [
  ['urinary_struvite_dissolution', 'urinary_calcium_oxalate_prevention', 'Dissolução de estruvita e prevenção de oxalato têm objetivos distintos — não assumir equivalência.'],
  ['hepatic_encephalopathy', 'renal_ckd_dog', 'Restrição proteica para encefalopatia pode conflitar com suporte muscular em DRC.'],
  ['hepatic_encephalopathy', 'renal_ckd_cat', 'Ajuste proteico divergente entre encefalopatia e DRC felina.'],
  ['cardiac_sodium_modified', 'hepatic_ascites', 'Ambos restringem sódio — alinhar meta clínica dominante.'],
  ['weight_loss_cat', 'critical_care_recovery', 'Restrição calórica contraindicada em recuperação crítica.'],
]

export function mapComorbiditySelectionsToTherapeuticProfiles(
  species: Species,
  comorbidityIds: string[],
): TherapeuticProfileId[] {
  return mapComorbiditySelectionsToTherapeuticProfilesBridge(species, comorbidityIds)
}

export function resolveActiveTherapeuticProfiles(
  species: Species,
  options: { comorbidityIds?: string[]; therapeuticProfileIds?: string[] },
): TherapeuticProfileId[] {
  const fromExplicit = (options.therapeuticProfileIds ?? []).filter((id) => {
    const profile = getTherapeuticProfileById(id)
    return profile && (profile.species === species || profile.species === 'both')
  }) as TherapeuticProfileId[]

  const fromComorbidities = mapComorbiditySelectionsToTherapeuticProfiles(species, options.comorbidityIds ?? [])

  return Array.from(new Set([...fromExplicit, ...fromComorbidities]))
}

export interface ComorbidityConflict {
  profileA: TherapeuticProfileId
  profileB: TherapeuticProfileId
  messagePt: string
}

export function detectTherapeuticProfileConflicts(profileIds: TherapeuticProfileId[]): ComorbidityConflict[] {
  const active = new Set(profileIds)
  const conflicts: ComorbidityConflict[] = []

  for (const [a, b, messagePt] of THERAPEUTIC_PROFILE_CONFLICTS) {
    if (active.has(a) && active.has(b)) {
      conflicts.push({ profileA: a, profileB: b, messagePt })
    }
  }

  return conflicts
}
