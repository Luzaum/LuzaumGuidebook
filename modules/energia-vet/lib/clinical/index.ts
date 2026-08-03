export {
  evaluateClinicalSuitability,
  evaluateTherapeuticFoodAssessment,
} from './clinicalRuleEngine'
export {
  assessFoodAgainstProfile,
  evaluateNutrientGoal,
  inferManufacturerClaims,
  snapshotCriticalNutrients,
} from './therapeuticAssessment'
export {
  detectTherapeuticProfileConflicts,
  mapComorbiditySelectionsToTherapeuticProfiles,
  resolveActiveTherapeuticProfiles,
} from './comorbidityResolver'
export {
  canProceedWithDetailedAssessment,
  evaluateContraindications,
  hasHardExclusion,
} from './contraindicationEngine'
export { buildMonitoringPlanForProfiles } from './monitoringPlan'
export { resolveEvidenceReferences, CLINICAL_EVIDENCE_SOURCES } from './evidenceResolver'
export {
  CLINICAL_RULE_SET_V2,
  THERAPEUTIC_PROFILES,
  getTherapeuticProfileById,
  getTherapeuticProfilesForSpecies,
} from './therapeuticProfiles'
export type { TherapeuticProfile, TherapeuticProfileId, NutrientGoal } from './therapeuticProfiles'
