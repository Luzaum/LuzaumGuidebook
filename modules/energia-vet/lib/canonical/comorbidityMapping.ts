import type { CanonicalSpecies } from './types'
import { COMORBIDITY_OPTIONS } from './comorbidityCatalog'
import { resolveProfileIdsFromComorbidities } from './therapeuticProfilesV3'

export { resolveProfileIdsFromComorbidities }

export function listComorbidityGroups(species: CanonicalSpecies): string[] {
  return Array.from(
    new Set(COMORBIDITY_OPTIONS.filter((option) => option.species.includes(species)).map((option) => option.group)),
  )
}
