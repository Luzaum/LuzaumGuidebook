/** Motor de cálculos NutriçãoVET v3 — tipos canônicos (uso interno). */

export const CALCULATION_ENGINE_VERSION = 'nutrition-calc-v3.2026.08'

export type Species = 'dog' | 'cat'

export type MuscleCondition = 'normal' | 'mild_loss' | 'moderate_loss' | 'severe_loss'

export type LifeStage = 'neonate' | 'growth' | 'adult' | 'senior' | 'gestation' | 'lactation'

export type NutritionalGoal = 'maintenance' | 'weight_loss' | 'weight_gain' | 'hospital' | 'refeeding'

export type EnergyConfidence = 'patient_calibrated' | 'high' | 'moderate' | 'low'

export type WeightBasis = 'current_weight' | 'ideal_weight' | 'expected_adult_weight' | 'clinician_defined'

export type NutrientValueKind =
  | 'measured_mean'
  | 'typical_analysis'
  | 'guaranteed_minimum'
  | 'guaranteed_maximum'
  | 'calculated'
  | 'estimated'
  | 'trace'
  | 'not_analyzed'
  | 'unknown'

export type RequirementType =
  | 'MR'
  | 'AI'
  | 'RA'
  | 'recommended_minimum'
  | 'nutritional_maximum'
  | 'legal_maximum'
  | 'therapeutic_target'
  | 'therapeutic_range'

export type MacroEnergyMethod = 'modified_atwater' | 'natural_ingredient' | 'measured'

export interface NutritionPatientAssessment {
  species: Species
  currentWeightKg: number
  previousWeights?: Array<{ weightKg: number; measuredAt: string }>
  bodyConditionScore9: number
  idealBodyConditionScore9?: 4 | 5
  muscleCondition: MuscleCondition
  ageMonths: number
  sex: 'male' | 'female'
  neuterStatus: 'intact' | 'neutered'
  lifeStage: LifeStage
  activity: {
    environment: 'indoor' | 'outdoor' | 'mixed'
    lowImpactHoursPerDay?: number
    highImpactHoursPerDay?: number
    workingDog?: boolean
    workload?: 'none' | 'light' | 'moderate' | 'high' | 'extreme'
    distanceKmPerDay?: number
    exerciseLimitations?: string[]
  }
  reproduction?: {
    gestationWeek?: number
    litterSize?: number
    lactationWeek?: number
    expectedAdultWeightKg?: number
  }
  currentDietHistory?: {
    reliable: boolean
    weightStable: boolean
    daysRecorded: number
    foods: Array<{ foodId: string; gramsPerDay?: number; unitsPerDay?: number; kcalPerDay: number }>
    treatsKcalPerDay: number
    chewsKcalPerDay: number
    medicationVehicleKcalPerDay: number
    supplementsKcalPerDay: number
  }
  appetite?: 'normal' | 'increased' | 'reduced' | 'severe_hyporexia' | 'anorexia'
  reducedIntakeDays?: number
  estimatedIntakePercent?: number
  diseases?: string[]
  medications?: string[]
  environment?: {
    ambientTemperatureC?: number
    thermoneutralDeviationC?: number
    multiPetCompetition?: boolean
    foodAccessRestricted?: boolean
    stressFactors?: string[]
  }
  clinicianTargetWeightKg?: number
  clinicianEnergyOverrideKcalDay?: number
  clinicianOverrideReason?: string
  nutritionalGoal: NutritionalGoal
}

export type IdealWeightMethod =
  | 'clinician_defined'
  | 'previous_healthy_weight'
  | 'aaha_ecc_estimate'
  | 'maintenance'
  | 'insufficient_data'

export type WeightLossEnergyMethod = 'observed_history' | 'aaha2021' | 'rer_ideal_fallback'

export interface EnergyVerificationReference {
  kcalDay: number
  methodSummary: string
  sourceLabel: string
}

export interface EnergyCalculationResult {
  rerKcalDay: number
  estimatedRangeKcalDay: { minimum: number; maximum: number }
  selectedTargetKcalDay: number
  weightBasis: WeightBasis
  weightUsedKg: number
  clinicalProfileLabel: string
  confidence: EnergyConfidence
  requiresMonitoring: true
  methodSummary: string
  sourceLabel: string
  /** Método energético aplicado (perda/ganho). */
  energyMethod?: WeightLossEnergyMethod
  /** Referência de conferência — não entra na média nem substitui a meta prescrita. */
  verificationReference?: EnergyVerificationReference
}

export interface IdealWeightEstimate {
  targetWeightKg: number
  confidence: EnergyConfidence
  methodSummary: string
  method: IdealWeightMethod
  percentOverweight?: number
  requiresClinicianReview: boolean
  /** Estimativa provisória — ECC elevado, EMC reduzida ou discrepância clínica. */
  isProvisionalEstimate?: boolean
}

export interface CalculationAudit {
  calculationId: string
  calculationEngineVersion: string
  sourceVersions: string[]
  formulaKey: string
  inputs: Record<string, unknown>
  rawResult: Record<string, number>
  roundedResult: Record<string, number>
  clinicianOverride?: { value: number; reason: string }
  createdAt: string
}

export interface ValidationIssue {
  code: string
  message: string
  severity: 'error' | 'warning'
}

export interface NutrientDeliveryInterval {
  lowerBound?: number
  upperBound?: number
  pointEstimate?: number
  valueKind?: NutrientValueKind
}

export interface FormulationFoodEntry {
  foodId: string
  /** Percentual da energia total alocada (não MS). */
  energyAllocationPct: number
  fixedGramsPerDay?: number
  fixedKcalPerDay?: number
}

export interface DietFormulationInput {
  targetKcalDay: number
  entries: FormulationFoodEntry[]
  /** kcal por grama MN por foodId */
  foodKcalPerGram: Record<string, number>
  normalizeProportions?: boolean
}

export interface DietFormulationFoodResult {
  foodId: string
  exactGramsPerDay: number
  exactKcalPerDay: number
  energyAllocationPct: number
}

export interface DietFormulationResult {
  foods: DietFormulationFoodResult[]
  totalExactKcal: number
  totalExactGrams: number
  proportionSumPct: number
  normalized: boolean
  issues: ValidationIssue[]
}

export interface RoundingResult {
  exactValue: number
  practicalValue: number
  difference: number
  percentError: number
}

export interface NutritionMonitoringEvent {
  measuredAt: string
  weightKg: number
  bcs9: number
  muscleCondition: MuscleCondition
  prescribedKcalDay: number
  actualConsumedKcalDay?: number
  appetite?: string
  adherencePercent?: number
  vomiting?: boolean
  diarrhea?: boolean
  stoolScore?: number
  clinicalNotes?: string
}
