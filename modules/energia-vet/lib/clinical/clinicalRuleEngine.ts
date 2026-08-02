import type { ClinicalPatientContext, ClinicalSuitability, TherapeuticFoodAssessment } from '../catalog/types'
import { isNutritionFeatureEnabled } from '../featureFlags'

export function evaluateClinicalSuitability(
  _foodId: string,
  _context: ClinicalPatientContext,
): TherapeuticFoodAssessment {
  const disabled = !isNutritionFeatureEnabled('nutrition_clinical_rules_v2')
  return {
    suitability: disabled ? 'insufficient_data' : 'insufficient_data',
    positiveMatches: [],
    cautions: disabled
      ? [{ code: 'rules_v2_disabled', messagePt: 'Motor clínico V2 desativado.', severity: 'info' }]
      : [],
    hardExclusions: [],
    missingCriticalData: [],
    manufacturerClaims: [],
    independentAssessment: {
      summaryPt: 'Avaliação independente pendente de implementação completa.',
      suitability: 'insufficient_data' as ClinicalSuitability,
    },
    monitoringRecommendations: [],
    evidence: [],
  }
}
