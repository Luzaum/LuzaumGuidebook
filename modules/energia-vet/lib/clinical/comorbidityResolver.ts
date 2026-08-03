import type { Species } from '../../types'
import { getClinicalProfileOptionById } from '../clinicalProfiles'
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

/** Mapeamento heurístico de rótulos legados (comorbidades) → perfis V2. */
const LABEL_HINTS: Array<{ pattern: RegExp; profileIds: TherapeuticProfileId[]; species?: Species }> = [
  { pattern: /renal|drc|doença renal/i, profileIds: ['renal_ckd_dog'], species: 'dog' },
  { pattern: /renal|drc|doença renal/i, profileIds: ['renal_ckd_cat'], species: 'cat' },
  { pattern: /est\.?\s*2.*c[ãa]o|renal.*est.*2/i, profileIds: ['renal_ckd_dog'], species: 'dog' },
  { pattern: /est\.?\s*3|est\.?\s*4/i, profileIds: ['renal_ckd_dog', 'renal_ckd_cat'] },
  { pattern: /estruvita.*dissol|dissolução.*estruv/i, profileIds: ['urinary_struvite_dissolution'] },
  { pattern: /prevenção.*estruv|estruvita.*prev/i, profileIds: ['urinary_struvite_prevention'] },
  { pattern: /oxalato|c[áa]lcio.*oxalato/i, profileIds: ['urinary_calcium_oxalate_prevention'] },
  { pattern: /urolit|urin[áa]ri|urinary/i, profileIds: ['urinary_struvite_prevention', 'urinary_calcium_oxalate_prevention'] },
  { pattern: /hepat|hepato/i, profileIds: ['hepatic_copper_restriction', 'hepatic_encephalopathy'] },
  { pattern: /alergia|hidrolis|allergy/i, profileIds: ['hydrolyzed_protein', 'novel_protein'] },
  { pattern: /cardio|cardiovascular/i, profileIds: ['cardiac_sodium_modified'] },
  { pattern: /c[âa]ncer|neoplas/i, profileIds: ['critical_care_recovery'] },
  { pattern: /pancreat/i, profileIds: ['pancreatitis_dog', 'gastrointestinal_low_fat'] },
  { pattern: /diabetes|diab[ée]t/i, profileIds: ['diabetes_dog', 'diabetes_cat'] },
  { pattern: /perda de peso|weight loss|obes/i, profileIds: ['weight_loss_dog', 'weight_loss_cat'] },
]

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function mapComorbiditySelectionsToTherapeuticProfiles(
  species: Species,
  comorbidityIds: string[],
): TherapeuticProfileId[] {
  const resolved = new Set<TherapeuticProfileId>()

  for (const selectionId of comorbidityIds) {
    const option = getClinicalProfileOptionById(species, selectionId)
    const haystack = normalizeText([option?.label, option?.description, selectionId].filter(Boolean).join(' '))

    for (const hint of LABEL_HINTS) {
      if (hint.species && hint.species !== species) continue
      if (hint.pattern.test(haystack)) {
        for (const profileId of hint.profileIds) {
          if (hint.species && hint.species !== species) continue
          const profile = getTherapeuticProfileById(profileId)
          if (profile && (profile.species === species || profile.species === 'both')) {
            resolved.add(profileId)
          }
        }
      }
    }
  }

  return Array.from(resolved)
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
