import { getRequirementById } from './genutriData'
import { formatClinicalLabelPtBr } from './clinicalLabelUtils'
import { getComorbidityBadges } from './canonical/comorbidityCatalog'
import type { Species } from '../types'

export function getHumanRequirementLabel(profileId: string | undefined): string {
  if (!profileId) return 'Perfil não definido'
  const profile = getRequirementById(profileId)
  if (!profile?.label) return profileId
  return formatClinicalLabelPtBr(profile.label)
}

/** Rótulos legíveis para comorbidades selecionadas na etapa Paciente. */
export function getClinicalProfileBadges(
  speciesOrIds: Species | string[] | undefined,
  selections?: string[],
): string[] {
  if (Array.isArray(speciesOrIds)) {
    return getComorbidityBadges(speciesOrIds)
  }
  return getComorbidityBadges(selections)
}
