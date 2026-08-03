import type { FoodDetails } from '../catalog/types'
import type { Species } from '../../types'
import { canParticipateInDetailedAdequacy, isConsultationOnly } from '../catalog/qualityEvaluator'
import type { ClinicalReason } from '../catalog/types'

export interface ContraindicationInput {
  food: FoodDetails
  species: Species
  profileHardContraindications: string[]
}

export function evaluateContraindications(input: ContraindicationInput): ClinicalReason[] {
  const exclusions: ClinicalReason[] = []
  const { food, species } = input

  if (food.completenessClass === 'ingredient_only') {
    exclusions.push({
      code: 'ingredient_only',
      messagePt: 'INGREDIENTE — NÃO CONSTITUI DIETA COMPLETA ISOLADAMENTE.',
      severity: 'exclusion',
    })
  }

  if (food.completenessClass === 'supplement_only') {
    exclusions.push({
      code: 'supplement_only',
      messagePt: 'Suplemento isolado não substitui dieta completa.',
      severity: 'exclusion',
    })
  }

  if (isConsultationOnly(food.qualityGrade)) {
    exclusions.push({
      code: 'quality_grade_de',
      messagePt: `Grau de qualidade ${food.qualityGrade} — dados insuficientes para recomendação clínica automática.`,
      severity: 'exclusion',
    })
  }

  if (food.speciesScope !== 'both' && food.speciesScope !== 'unknown' && food.speciesScope !== species) {
    exclusions.push({
      code: 'species_mismatch',
      messagePt: `Alimento cadastrado para outra espécie (${food.speciesScope}).`,
      severity: 'exclusion',
    })
  }

  if (food.foodType === 'natural' && food.completenessClass !== 'complete') {
    exclusions.push({
      code: 'natural_incomplete',
      messagePt: 'Alimento natural/ingrediente não classificado como dieta completa.',
      severity: 'caution',
    })
  }

  for (const text of input.profileHardContraindications) {
    exclusions.push({
      code: 'profile_contraindication',
      messagePt: text,
      severity: 'caution',
    })
  }

  return exclusions
}

export function hasHardExclusion(reasons: ClinicalReason[]): boolean {
  return reasons.some((reason) => reason.severity === 'exclusion')
}

export function canProceedWithDetailedAssessment(food: FoodDetails): boolean {
  return canParticipateInDetailedAdequacy(food.qualityGrade) && food.completenessClass !== 'ingredient_only'
}
