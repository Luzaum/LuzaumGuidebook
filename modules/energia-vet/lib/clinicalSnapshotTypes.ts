import type { MuscleCondition, Species, TargetGoal } from '../types'
import type { TherapeuticDietReview } from './nutritionTherapeuticBridge'

export interface PrescriberSnapshot {
  name?: string
  license?: string
}

export interface ClinicSnapshot {
  name?: string
  id?: string
}

export interface NutritionPatientSnapshot {
  name: string
  species: Species
  breed?: string
  sex?: string
  neuterLabel?: string
  ageLabel?: string
  currentWeightKg?: number
  bcs9?: number
  muscleConditionLabel?: string
  activitySummary?: string
  comorbidityLabels?: string[]
  isHospitalized?: boolean
}

export interface BodyCompositionSnapshot {
  currentWeightKg?: number
  bcs9?: number
  targetBcs9?: number
  muscleConditionLabel?: string
  targetWeightKg?: number
  targetWeightMethodLabel?: string
  previousHealthyWeightKg?: number
  weightChangeLabel?: string
}

export interface EnergyPrescriptionSnapshot {
  rerKcalDay: number
  maintenanceRangeMin?: number
  maintenanceRangeMax?: number
  prescribedKcalDay: number
  weightBasisLabel: string
  energyProfileLabel: string
  confidenceLabel: string
  methodSummary: string
  observedIntakeKcalDay?: number
  treatReserveKcalDay?: number
  mainDietKcalDay?: number
  roundingErrorPercent?: number
}

export interface FeedingFoodSnapshot {
  name: string
  dailyGrams: number
  dailyGramsPractical: number
  perMealGrams: number
  perMealGramsPractical: number
  dailyKcal: number
  energyPercent: number
  moisturePercent?: number
}

export interface FeedingPrescriptionSnapshot {
  dietType: string
  mealsPerDay: number
  foods: FeedingFoodSnapshot[]
  totalDailyGrams: number
  totalDailyKcal: number
}

export interface NutrientAssessmentSnapshot {
  macroRows: Array<{ label: string; gramsDay: number; energyPercent: number; basisLabel: string }>
  adequacyRows: Array<{
    nutrient: string
    delivered: string
    target: string
    statusLabel: string
    interpretation: string
    basisLabel: string
  }>
  dataQualityRows: Array<{ item: string; qualityLabel: string }>
}

export interface TherapeuticReviewSnapshot {
  profiles: Array<{ profileName: string; statusLabel: string; goalLines: string[] }>
  conflicts: string[]
  monitoringRecommendations: string[]
}

export interface NutritionTransitionSnapshot {
  enabled: boolean
  previousDiet: { name: string; kcalPerGram: number; currentGramsPerDay?: number }
  newDiet: { name: string; kcalPerGram: number; prescribedGramsPerDay: number }
  durationDays: number
  rows: Array<{
    day: number
    previousDietPercent: number
    newDietPercent: number
    previousDietKcal: number
    newDietKcal: number
    previousDietGrams: number
    newDietGrams: number
    previousDietGramsPractical: number
    newDietGramsPractical: number
    totalKcal: number
  }>
  instructions: string[]
}

export interface NutritionHydrationSnapshot {
  prescribedEnergyKcalDay: number
  estimates: {
    energyBasedMlDay?: number
    speciesBasedMlDay?: number
    selectedTargetMlDay?: number
    selectedMethodLabel?: string
  }
  foodWaterMlDay?: number
  metabolicWaterMlDay?: number
  voluntarilyConsumedWaterMlDay?: number
  enteralFlushWaterMlDay?: number
  estimatedOralWaterGapMlDay?: number
  methodLabel: string
  clinicalNotes: string[]
  notFluidTherapy: true
  disclaimer: string
}

export type EnteralRouteSnapshot =
  | 'oral'
  | 'nasoesophageal'
  | 'nasogastric'
  | 'esophagostomy'
  | 'gastrostomy'
  | 'jejunostomy'

export interface NutritionEnteralSnapshot {
  dietName: string
  route: EnteralRouteSnapshot
  kcalPerMl?: number
  kcalPerGram?: number
  prescribedKcalDay: number
  prescribedPercentRer: number
  prescribedMlDay?: number
  prescribedGramsDay?: number
  administrationMode: 'bolus' | 'intermittent' | 'continuous'
  administrationsPerDay?: number
  mlPerAdministration?: number
  gramsPerAdministration?: number
  infusionHoursPerDay?: number
  mlPerHour?: number
  kcalPerHour?: number
  flushMlPerAdministration?: number
  totalFlushMlDay?: number
  deliveredKcalDay?: number
  deliveredPercent?: number
  dailyDeficitKcal?: number
  cumulativeDeficitKcal?: number
  schedule?: string[]
  tolerance?: {
    vomiting?: boolean
    regurgitation?: boolean
    diarrhea?: boolean
    abdominalDistension?: boolean
    tubeComplication?: boolean
  }
  tutorInstructions?: string[]
}

export interface NutritionParenteralSnapshot {
  currentWeightKg: number
  targetKcalDay: number
  proteinTargetGPer100Kcal: number
  proteinGramsDay: number
  proteinKcalDay: number
  aminoAcidSolutionPercent: number
  aminoAcidVolumeMlDay: number
  nonProteinKcalDay: number
  dextroseFraction: number
  lipidFraction: number
  dextroseKcalDay: number
  dextroseConcentrationPercent: number
  dextroseVolumeMlDay: number
  dextroseGramsDay: number
  lipidKcalDay: number
  lipidConcentrationPercent: number
  lipidVolumeMlDay: number
  lipidGramsDay: number
  lipidGramsKgDay: number
  additionalFluidMlDay?: number
  totalVolumeMlDay: number
  infusionHours: number
  infusionRateMlHour: number
  glucoseInfusionRateMgKgMin: number
  estimatedOsmolarityMosmL?: number
  vascularAccess: 'peripheral' | 'central' | 'not_defined'
  warnings: string[]
  monitoring: string[]
  professionalOnly: true
}

export interface NutritionRefeedingSnapshot {
  riskLevel: 'low' | 'moderate' | 'high'
  riskFactors: string[]
  rerKcalDay: number
  selectedPlan: '50_75_100' | '33_66_100' | 'high_risk_gradual' | 'custom'
  days: Array<{
    day: number
    targetPercentRer: number
    targetKcalDay: number
    authorizedToAdvance?: boolean
    authorizationReason?: string
  }>
  monitoring: {
    phosphorus?: boolean
    potassium?: boolean
    magnesium?: boolean
    glucose?: boolean
    fluidBalance?: boolean
    cardiacSigns?: boolean
    neurologicSigns?: boolean
  }
  advancementCriteria: string[]
  holdCriteria: string[]
}

export interface ClinicalWarningSnapshot {
  level: 'info' | 'caution' | 'critical'
  message: string
}

export interface NutritionMonitoringSnapshot {
  reevaluationLabel?: string
  weightMonitoring?: string
  items: string[]
}

/** Registro clínico imutável — fonte única para PDF e reabertura sem recálculo. */
export interface NutritionClinicalRecord {
  patient: NutritionPatientSnapshot
  bodyComposition: BodyCompositionSnapshot
  energy: EnergyPrescriptionSnapshot
  feeding: FeedingPrescriptionSnapshot
  nutrientAssessment?: NutrientAssessmentSnapshot
  therapeuticReview?: TherapeuticReviewSnapshot
  transitionPlan?: NutritionTransitionSnapshot
  hydrationPlan?: NutritionHydrationSnapshot
  enteralPlan?: NutritionEnteralSnapshot
  parenteralPlan?: NutritionParenteralSnapshot
  refeedingPlan?: NutritionRefeedingSnapshot
  monitoringPlan?: NutritionMonitoringSnapshot
  warnings: ClinicalWarningSnapshot[]
  createdAt: string
  prescribedBy?: PrescriberSnapshot
  clinic?: ClinicSnapshot
  /** @deprecated Campos legados — preferir `energy.*` */
  rerKcalDay?: number
  prescribedKcalDay?: number
  maintenanceRangeMin?: number
  maintenanceRangeMax?: number
  weightBasisLabel?: string
  energyProfileLabel?: string
  confidenceLabel?: string
  methodSummary?: string
  muscleConditionLabel?: string
  activitySummary?: string
  observedIntakeKcal?: number
  roundingErrorPercent?: number
  targetWeightMethod?: string
}

export type DietTransitionSpecialSituation =
  | 'none'
  | 'immediate'
  | 'prolonged'
  | 'suspended_intolerance'

export interface DietTransitionConfig {
  enabled: boolean
  previousDietName?: string
  previousKcalPerGram?: number
  previousGramsPerDay?: number
  newDietName?: string
  newKcalPerGram?: number
  durationDays?: number
  planMode?: 'standard' | 'custom'
  customRows?: Array<{ day: number; previousDietPercent: number; newDietPercent: number }>
  specialSituation?: DietTransitionSpecialSituation
  immediateJustification?: string
}

export interface HydrationPlanConfig {
  selectedMethod?: 'energy_based' | 'species_based' | 'manual' | 'none'
  manualTargetMlDay?: number
  manualReason?: string
  voluntarilyConsumedWaterKnown?: boolean
  voluntarilyConsumedWaterMlDay?: number
  enteralFlushWaterMlDay?: number
}

export interface BuildClinicalSnapshotInput {
  report: import('../types').StoredCalculationReport
  snapshot?: import('./calculationPersistenceV2').CalculationSnapshotV2
  transition?: DietTransitionConfig
  hydration?: HydrationPlanConfig
  clinic?: ClinicSnapshot
  prescriber?: PrescriberSnapshot
  therapeuticReview?: TherapeuticDietReview
}
