import type { DataQualityGrade, FoodDetails } from './types'

const GRADE_ORDER: DataQualityGrade[] = ['A', 'B', 'C', 'D', 'E']

export function compareQualityGrades(a: DataQualityGrade, b: DataQualityGrade): number {
  return GRADE_ORDER.indexOf(a) - GRADE_ORDER.indexOf(b)
}

export function canParticipateInDetailedAdequacy(grade: DataQualityGrade): boolean {
  return grade === 'A' || grade === 'B'
}

export function canParticipateInLimitedComparison(grade: DataQualityGrade): boolean {
  return grade === 'A' || grade === 'B' || grade === 'C'
}

export function isConsultationOnly(grade: DataQualityGrade): boolean {
  return grade === 'D' || grade === 'E'
}

export function evaluateFoodDataQuality(food: FoodDetails): {
  grade: DataQualityGrade
  canAssessAdequacy: boolean
  warnings: string[]
} {
  const warnings: string[] = []
  const grade = food.qualityGrade

  if (food.missingNutrients.length > 0) {
    warnings.push(`${food.missingNutrients.length} nutriente(s) essencial(is) ausente(s) no cadastro.`)
  }
  if (food.completenessClass === 'ingredient_only') {
    warnings.push('INGREDIENTE — NÃO CONSTITUI DIETA COMPLETA ISOLADAMENTE.')
  }
  if (isConsultationOnly(grade)) {
    warnings.push('Dados não verificados ou incompletos — somente consulta até revisão.')
  }

  return {
    grade,
    canAssessAdequacy: canParticipateInDetailedAdequacy(grade) && food.missingNutrients.length === 0,
    warnings,
  }
}
