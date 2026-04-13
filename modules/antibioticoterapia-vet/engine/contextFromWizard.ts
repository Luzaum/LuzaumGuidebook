import type { Species, LifeStageKey, ComorbidityState } from '../types'
import type { AgeBand, PatientContextV2, SeverityTier } from '../model/types'

export function patientContextFromWizard(
  species: Species | null,
  life: LifeStageKey | null,
  co: ComorbidityState,
  severity: SeverityTier,
): PatientContextV2 | null {
  if (!species || !life) return null

  let ageBand: AgeBand = 'adult'
  let isGestante = false
  let isLactante = false

  switch (life) {
    case 'filhote':
      ageBand = 'juvenile'
      break
    case 'idoso':
      ageBand = 'senior'
      break
    case 'gestante':
      ageBand = 'adult'
      isGestante = true
      break
    case 'lactante':
      ageBand = 'adult'
      isLactante = true
      break
    case 'adulto':
    default:
      ageBand = 'adult'
  }

  return {
    species: species === 'Cão' ? 'dog' : 'cat',
    ageBand,
    isGestante,
    isLactante,
    severity,
    comorbidities: {
      renal: co.renal,
      hepatic: co.hepatic,
      cardiac: co.cardiac,
      neurological: co.neurological,
      septic: co.septic,
    },
  }
}
