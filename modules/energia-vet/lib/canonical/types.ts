import type { EvidenceReference } from './evidenceCatalog'
import { CANONICAL_NUTRITION_SCHEMA_VERSION } from './schemaVersion'

export type CanonicalSpecies = 'dog' | 'cat'
export type CanonicalSex = 'male' | 'female' | 'unknown'
export type CanonicalNeuterStatus = 'intact' | 'neutered' | 'unknown'
export type CanonicalLifeStage = 'growth' | 'adult' | 'senior' | 'gestation' | 'lactation'
export type CanonicalFeedingRoute = 'voluntary' | 'assisted_oral' | 'enteral' | 'parenteral' | 'mixed'
export type CanonicalMuscleCondition = 'normal' | 'mild_loss' | 'moderate_loss' | 'severe_loss'
export type CanonicalSafetyMode = 'strict' | 'standard'

export interface CanonicalDiagnosis {
  diagnosisId: string
  code?: string
  displayNamePtBr: string
  species: CanonicalSpecies | 'both'
  stage?: string | number
  subtype?: string
  active: boolean
  onsetDate?: string
  source: 'comorbidity_selection' | 'manual' | 'import'
  metadata?: Record<string, string | number | boolean | undefined>
}

export interface CanonicalLaboratoryValue {
  analyte: string
  value: number
  unit: string
  collectedAt?: string
  referenceRange?: { min?: number; max?: number; label?: string }
  source: 'manual' | 'import' | 'sync'
}

export interface CanonicalLaboratoryData {
  values: CanonicalLaboratoryValue[]
  notes?: string
}

export interface CanonicalMedication {
  medicationId: string
  name: string
  route?: string
  isCaloricVehicle?: boolean
}

export interface CanonicalDailyIntake {
  kcalPerDay?: number
  reliable?: boolean
  weightStable?: boolean
  daysRecorded?: number
  treatsKcalPerDay?: number
  chewsKcalPerDay?: number
  medicationVehicleKcalPerDay?: number
  supplementsKcalPerDay?: number
}

export interface CanonicalDietEntry {
  foodId: string
  inclusionPct?: number
  gramsPerDay?: number
}

export interface CanonicalDiet {
  entries: CanonicalDietEntry[]
  dietType?: 'commercial' | 'homemade' | 'mixed'
}

export interface CanonicalFluidIntake {
  mlPerDay?: number
  source?: 'estimated' | 'measured'
}

export interface CanonicalCalculationPreferences {
  energyEquationId?: string
  selectedBookEnergyProfileId?: string
  nutritionalGoal?: 'maintenance' | 'weight_loss' | 'weight_gain' | 'hospital' | 'refeeding'
  weightLossEnergyMethod?: 'aaha2021' | 'observed_history' | 'rer_ideal_fallback'
  useIdealWeightForRer?: boolean
  roundingPolicy?: string
  safetyMode: CanonicalSafetyMode
  clinicianEnergyOverrideKcalDay?: number
  clinicianOverrideReason?: string
}

export interface CanonicalProvenance {
  createdAt: string
  updatedAt: string
  source: 'manual' | 'snapshot' | 'import' | 'sync'
  migratedFromSchemaVersion?: string
}

/** Entrada canônica única — sem resultados calculados embutidos como observados. */
export interface CanonicalNutritionInput {
  schemaVersion: typeof CANONICAL_NUTRITION_SCHEMA_VERSION

  patient: {
    species: CanonicalSpecies
    breed?: string
    ageYears?: number
    ageMonths?: number
    sex: CanonicalSex
    neuterStatus: CanonicalNeuterStatus
    currentWeightKg: number
    idealWeightKg?: number
    targetWeightKg?: number
    bodyConditionScore?: { value: number; scale: 5 | 9 }
    muscleConditionScore?: CanonicalMuscleCondition
    isIndoor?: boolean
    expectedAdultWeightKg?: number
    previousHealthyWeightKg?: number
    activityHoursPerDay?: number
    activityImpact?: 'low' | 'high'
    highImpactHoursPerDay?: number
  }

  physiology: {
    lifeStage: CanonicalLifeStage
    activityLevel?: string
    workingStatus?: string
    gestationWeek?: number
    lactationWeek?: number
    litterSize?: number
    growthExpectedAdultWeightKg?: number
  }

  clinical: {
    hospitalized: boolean
    criticallyIll: boolean
    fastingHours?: number
    reducedIntakeDays?: number
    recentWeightLossPercent?: number
    feedingRoute: CanonicalFeedingRoute
    diagnoses: CanonicalDiagnosis[]
    medications: CanonicalMedication[]
    laboratoryData: CanonicalLaboratoryData
    comorbidityIds: string[]
  }

  nutrition: {
    currentDiet?: CanonicalDiet
    proposedDiet?: CanonicalDiet
    actualDailyIntake?: CanonicalDailyIntake
    fluidIntake?: CanonicalFluidIntake
  }

  calculationPreferences: CanonicalCalculationPreferences
  provenance: CanonicalProvenance
}

export interface NutritionCalculationMetadata {
  calculatedAt: string
  engineVersion: string
  schemaVersion: string
  therapeuticProfileVersions: Record<string, string>
}

export interface EnergyAlternative {
  id: string
  label: string
  kcalDay: number
  rejectedReason: string
}

export interface EnergyDecision {
  rerKcalDay: number
  equation: {
    id: string
    formula: string
    coefficient?: number
    exponent?: number
    weightKg: number
    weightBasis: 'current_weight' | 'ideal_weight' | 'expected_adult_weight' | 'clinician_defined' | 'target_weight'
    source: EvidenceReference
  }
  selectedEnergyTarget: {
    kcalDay: number
    multiplierEquivalent?: number
    rationale: string
    selectedBy: 'validated_rule' | 'conflict_resolver' | 'manual_clinician_override'
    confidence: EvidenceReference['confidence']
  }
  rejectedAlternatives: EnergyAlternative[]
  clinicalProfileLabel: string
  methodSummary: string
}

export interface ResolvedNutrientTarget {
  nutrientKey: string
  labelPt: string
  basis: 'dry_matter_pct' | 'mg_per_kg_dm' | 'per_1000_kcal' | 'percent_me' | 'g_day'
  minimum?: number
  maximum?: number
  unit: string
  profileId: string
  profileVersion: string
  evidenceIds: string[]
  confidence: EvidenceReference['confidence']
  rationale: string
  /** Objetivo ponderal usado na calibração (manutenção, emagrecimento, ganho, hospitalar, realimentação). */
  calibratedForGoal?: 'maintenance' | 'weight_loss' | 'weight_gain' | 'hospital' | 'refeeding'
  /** Equivalente em g/1000 kcal ME quando aplicável. */
  equivalentPer1000Kcal?: { minimum?: number; maximum?: number }
  /** Nota sobre energia de referência na calibração. */
  calibrationNote?: string
}

export type ConflictSeverity = 'hard' | 'negotiable' | 'evidence_quality'

export interface TherapeuticConflict {
  id: string
  severity: ConflictSeverity
  profileIds: string[]
  nutrientKey?: string
  messagePt: string
  requiresClinicianDecision: boolean
}

export interface ClinicianDecisionRequest {
  id: string
  promptPt: string
  options: string[]
  relatedConflictIds: string[]
}

export interface AppliedPriority {
  rank: number
  ruleId: string
  labelPt: string
}

export interface ConflictResolutionResult {
  resolvedTargets: ResolvedNutrientTarget[]
  unresolvedConflicts: TherapeuticConflict[]
  appliedPriorities: AppliedPriority[]
  clinicianDecisionsRequired: ClinicianDecisionRequest[]
  activeProfileIds: string[]
}

export interface CanonicalNutritionResult {
  metadata: NutritionCalculationMetadata
  energy: EnergyDecision
  therapeutic: ConflictResolutionResult
  assessmentFingerprint: string
}

export type NutritionAction =
  | { type: 'patient/currentWeightChanged'; payload: { kg: number } }
  | { type: 'patient/idealWeightChanged'; payload: { kg?: number } }
  | { type: 'patient/targetWeightChanged'; payload: { kg?: number } }
  | { type: 'patient/bodyConditionScoreChanged'; payload: { value: number; scale: 5 | 9 } }
  | { type: 'patient/muscleConditionChanged'; payload: CanonicalMuscleCondition }
  | { type: 'patient/speciesChanged'; payload: { species: CanonicalSpecies } }
  | { type: 'physiology/lifeStageChanged'; payload: CanonicalLifeStage }
  | { type: 'physiology/activityChanged'; payload: { hoursPerDay?: number; impact?: 'low' | 'high' } }
  | { type: 'clinical/diagnosisAdded'; payload: CanonicalDiagnosis }
  | { type: 'clinical/diagnosisUpdated'; payload: CanonicalDiagnosis }
  | { type: 'clinical/diagnosisRemoved'; payload: { diagnosisId: string } }
  | { type: 'clinical/comorbidityIdsChanged'; payload: { ids: string[] } }
  | { type: 'clinical/laboratoryDataUpdated'; payload: CanonicalLaboratoryData }
  | { type: 'clinical/hospitalizationChanged'; payload: { hospitalized: boolean; criticallyIll?: boolean } }
  | { type: 'nutrition/currentDietChanged'; payload: CanonicalDiet }
  | { type: 'nutrition/proposedDietChanged'; payload: CanonicalDiet }
  | { type: 'nutrition/dailyIntakeChanged'; payload: CanonicalDailyIntake }
  | { type: 'calculation/preferenceChanged'; payload: Partial<CanonicalCalculationPreferences> }
  | { type: 'case/snapshotLoaded'; payload: CanonicalNutritionInput }
  | { type: 'case/reset'; payload?: never }

export interface CanonicalValidationIssue {
  path: string
  message: string
  severity: 'error' | 'warning'
}
