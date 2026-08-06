/**
 * Ponte store legado ↔ motor v3.
 * Relatórios v4 e calc v1 permanecem intactos quando a flag interna está desligada.
 */

import { isNutritionFeatureEnabled } from './featureFlags'
import type { BCS, EnergyCalculation, Patient, PatientDietHistory, Species, TargetGoal } from '../types'
import {
  calculatePatientEnergy,
  estimateTargetWeight,
  idealWeightMethodLabel,
  inferClinicalRiskFlags,
  validateMinimumAssessment,
  WEEKLY_WEIGHT_LOSS_TARGET,
  buildWeightLossEnergyOptions,
  selectWeightLossEnergy,
  type EnergyCalculationResult,
  type IdealWeightEstimate,
  type MuscleCondition,
  type NutritionPatientAssessment,
  type NutritionalGoal,
  type ValidationIssue,
  type WeightLossEnergyMethod,
} from './nutrition-calculations'

export const CALC_STORAGE_KEY_V2 = 'vetius-energia-vet-calc-v2'
export const REPORT_STORAGE_KEY_V5 = 'vetius-energia-vet-reports-v5'

export function isCalculationEngineV3Enabled(): boolean {
  return isNutritionFeatureEnabled('nutrition_calculation_engine_v3')
}

function buildDietHistoryFromStore(
  history?: PatientDietHistory,
): NutritionPatientAssessment['currentDietHistory'] | undefined {
  if (!history?.documented) return undefined
  const mainFoodKcalPerDay = history.mainFoodKcalPerDay ?? 0
  return {
    reliable: !!history.reliable,
    weightStable: !!history.weightStable,
    daysRecorded: history.daysRecorded ?? 0,
    foods: mainFoodKcalPerDay > 0 ? [{ foodId: 'documented_main_diet', kcalPerDay: mainFoodKcalPerDay }] : [],
    treatsKcalPerDay: history.treatsKcalPerDay ?? 0,
    chewsKcalPerDay: history.chewsKcalPerDay ?? 0,
    medicationVehicleKcalPerDay: history.medicationVehicleKcalPerDay ?? 0,
    supplementsKcalPerDay: history.supplementsKcalPerDay ?? 0,
  }
}

export function mapStorePatientToAssessment(options: {
  species: Species
  weightKg: number
  ageMonths: number
  sex: 'male' | 'female'
  isNeutered: boolean
  bcs: BCS
  isIndoor?: boolean
  activityHoursPerDay?: number
  activityImpact?: 'low' | 'high'
  highImpactHoursPerDay?: number
  muscleCondition?: MuscleCondition
  nutritionalGoal: NutritionalGoal
  litterSize?: number
  lactationWeek?: number
  expectedAdultWeightKg?: number
  gestationWeek?: number
  clinicianTargetWeightKg?: number
  clinicianEnergyOverrideKcalDay?: number
  clinicianOverrideReason?: string
  previousHealthyWeightKg?: number
  dietHistory?: PatientDietHistory
}): NutritionPatientAssessment {
  const lifeStage = resolveLifeStage(options.ageMonths, options.gestationWeek, options.litterSize)
  const lowImpactHours = options.activityHoursPerDay ?? 1
  const highImpactHours =
    options.activityImpact === 'high'
      ? Math.max(options.highImpactHoursPerDay ?? 1, 0)
      : Math.max(options.highImpactHoursPerDay ?? 0, 0)

  return {
    species: options.species,
    currentWeightKg: options.weightKg,
    previousWeights:
      options.previousHealthyWeightKg != null && options.previousHealthyWeightKg > 0
        ? [{ weightKg: options.previousHealthyWeightKg, measuredAt: new Date().toISOString().slice(0, 10) }]
        : undefined,
    bodyConditionScore9: options.bcs,
    idealBodyConditionScore9: 5,
    muscleCondition: options.muscleCondition ?? 'normal',
    ageMonths: options.ageMonths,
    sex: options.sex,
    neuterStatus: options.isNeutered ? 'neutered' : 'intact',
    lifeStage,
    activity: {
      environment: options.isIndoor ? 'indoor' : options.species === 'cat' ? 'outdoor' : 'mixed',
      lowImpactHoursPerDay: lowImpactHours,
      highImpactHoursPerDay: highImpactHours,
      workload: 'none',
    },
    reproduction: {
      litterSize: options.litterSize,
      lactationWeek: options.lactationWeek,
      expectedAdultWeightKg: options.expectedAdultWeightKg,
      gestationWeek: options.gestationWeek,
    },
    currentDietHistory: buildDietHistoryFromStore(options.dietHistory),
    clinicianTargetWeightKg: options.clinicianTargetWeightKg,
    clinicianEnergyOverrideKcalDay: options.clinicianEnergyOverrideKcalDay,
    clinicianOverrideReason: options.clinicianOverrideReason,
    nutritionalGoal: options.nutritionalGoal,
  }
}

export function mapPatientFromStore(
  patient: Partial<Patient>,
  energy: Partial<EnergyCalculation> = {},
  nutritionalGoal: NutritionalGoal,
): NutritionPatientAssessment {
  const assessment = mapStorePatientToAssessment({
    species: patient.species ?? 'dog',
    weightKg: patient.currentWeight ?? 0,
    ageMonths: patient.ageMonths ?? 0,
    sex: patient.sex ?? 'male',
    isNeutered: !!patient.isNeutered,
    bcs: (patient.bcs ?? 5) as BCS,
    isIndoor: patient.isIndoor,
    activityHoursPerDay: patient.activityHoursPerDay ?? energy.activityHoursPerDay ?? 1,
    activityImpact: patient.activityImpact ?? energy.activityImpact ?? 'low',
    highImpactHoursPerDay: patient.highImpactHoursPerDay ?? 0,
    muscleCondition: patient.muscleCondition ?? 'normal',
    expectedAdultWeightKg: patient.expectedAdultWeightKg ?? energy.expectedAdultWeightKg,
    litterSize: energy.litterSize,
    lactationWeek: energy.lactationWeek,
    previousHealthyWeightKg: patient.previousHealthyWeightKg,
    dietHistory: patient.dietHistory,
    nutritionalGoal,
  })
  if (patient.comorbidityIds?.length) {
    assessment.diseases = patient.comorbidityIds
  }
  return assessment
}

export function validatePatientStepForV3(patient: Partial<Patient>): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!patient.currentWeight || patient.currentWeight <= 0) {
    issues.push({ code: 'weight', message: 'Informe o peso atual do paciente.', severity: 'error' })
  }
  if (patient.ageMonths == null || patient.ageMonths < 0) {
    issues.push({ code: 'age', message: 'Informe a idade do paciente.', severity: 'error' })
  }
  if (!patient.sex) {
    issues.push({ code: 'sex', message: 'Selecione o sexo do paciente.', severity: 'error' })
  }
  if (patient.isNeutered == null) {
    issues.push({ code: 'neuter', message: 'Informe o estado reprodutivo (castrado ou não).', severity: 'error' })
  }
  if (!patient.muscleCondition) {
    issues.push({ code: 'emc', message: 'Selecione a condição de massa muscular (EMC).', severity: 'error' })
  }
  if (patient.activityHoursPerDay == null || patient.activityHoursPerDay < 0) {
    issues.push({ code: 'activity', message: 'Informe as horas de atividade diária.', severity: 'error' })
  }

  const ageMonths = patient.ageMonths ?? 0
  if (ageMonths < 12 && (!patient.expectedAdultWeightKg || patient.expectedAdultWeightKg <= 0)) {
    issues.push({
      code: 'expected_adult_weight',
      message: 'Para filhotes, informe o peso adulto esperado.',
      severity: 'error',
    })
  }

  const history = patient.dietHistory
  if (history?.documented) {
    if (history.daysRecorded == null || history.daysRecorded < 1) {
      issues.push({
        code: 'diet_days',
        message: 'Informe por quantos dias a ingestão foi registrada.',
        severity: 'error',
      })
    }
    const mainKcal = history.mainFoodKcalPerDay ?? 0
    const extras =
      (history.treatsKcalPerDay ?? 0) +
      (history.chewsKcalPerDay ?? 0) +
      (history.medicationVehicleKcalPerDay ?? 0) +
      (history.supplementsKcalPerDay ?? 0)
    if (mainKcal <= 0 && extras <= 0) {
      issues.push({
        code: 'diet_kcal',
        message: 'Documente pelo menos a energia da dieta principal ou dos extras.',
        severity: 'error',
      })
    }
  }

  return issues
}

export function validatePatientAssessmentFromStore(
  patient: Partial<Patient>,
  energy: Partial<EnergyCalculation> = {},
  nutritionalGoal: NutritionalGoal = 'maintenance',
): ValidationIssue[] {
  const stepIssues = validatePatientStepForV3(patient)
  const assessment = mapPatientFromStore(patient, energy, nutritionalGoal)
  const engineIssues = validateMinimumAssessment(assessment)
  return [...stepIssues, ...engineIssues.filter((issue) => issue.severity === 'error')]
}

function resolveLifeStage(
  ageMonths: number,
  gestationWeek?: number,
  litterSize?: number,
): NutritionPatientAssessment['lifeStage'] {
  if (gestationWeek != null && gestationWeek > 0) return 'gestation'
  if (litterSize != null && litterSize > 0) return 'lactation'
  if (ageMonths < 12) return 'growth'
  if (ageMonths >= 96) return 'senior'
  return 'adult'
}

export function computeEnergyWithEngineV3(
  assessment: NutritionPatientAssessment,
): EnergyCalculationResult | null {
  if (!isCalculationEngineV3Enabled()) return null
  return calculatePatientEnergy(assessment).result
}

/** Campos separados para persistência v2 — não sobrescrever MER/meta/hospital no mesmo campo. */
export interface PrescribedEnergySnapshotV2 {
  rerKcalDay: number
  maintenanceEstimateKcalDay: number
  maintenanceRangeKcalDay: { minimum: number; maximum: number }
  bodyWeightGoalKcalDay?: number
  hospitalGoalKcalDay?: number
  finalPrescribedKcalDay: number
  weightBasis: EnergyCalculationResult['weightBasis']
  weightUsedKg: number
  clinicalProfileLabel: string
  confidence: EnergyCalculationResult['confidence']
  methodSummary: string
  sourceLabel: string
}

export function toPrescribedEnergySnapshot(result: EnergyCalculationResult): PrescribedEnergySnapshotV2 {
  return {
    rerKcalDay: result.rerKcalDay,
    maintenanceEstimateKcalDay: result.selectedTargetKcalDay,
    maintenanceRangeKcalDay: result.estimatedRangeKcalDay,
    finalPrescribedKcalDay: result.selectedTargetKcalDay,
    weightBasis: result.weightBasis,
    weightUsedKg: result.weightUsedKg,
    clinicalProfileLabel: result.clinicalProfileLabel,
    confidence: result.confidence,
    methodSummary: result.methodSummary,
    sourceLabel: result.sourceLabel,
  }
}

export interface BodyTargetPlanV3 {
  targetWeightKg: number
  idealWeightEstimate: IdealWeightEstimate
  maintenanceEnergyKcal: number
  targetEnergyKcal: number
  maintenanceResult: EnergyCalculationResult
  targetResult: EnergyCalculationResult
  energyFormula: string
  weeklyLossTargetPct?: { min: number; max: number; preferredMax: number }
  weightLossEnergyOptions?: {
    aahaKcal: number
    observedKcal: number | null
    selectedMethod: WeightLossEnergyMethod
  }
  reassessmentHint: string
  uncertaintyNotice: string
}

/** Plano corporal + energia meta — motor v3 canônico. */
export function computeBodyTargetPlan(options: {
  patient: Partial<Patient>
  energy?: Partial<EnergyCalculation>
  goal: TargetGoal
  energyStepMerKcal?: number
  weightLossEnergyMethod?: WeightLossEnergyMethod
}): BodyTargetPlanV3 | null {
  const weightKg = options.patient.currentWeight ?? 0
  if (weightKg <= 0) return null

  const nutritionalGoal: NutritionalGoal =
    options.goal === 'weight_gain' ? 'weight_gain' : options.goal === 'weight_loss' ? 'weight_loss' : 'maintenance'

  const maintenanceAssessment = mapPatientFromStore(options.patient, options.energy, 'maintenance')
  const maintenanceResult = calculatePatientEnergy(maintenanceAssessment).result
  if (!maintenanceResult) return null

  const maintenanceEnergyKcal = options.energyStepMerKcal ?? maintenanceResult.selectedTargetKcalDay
  const bcs = (options.patient.bcs ?? 5) as BCS
  const species = options.patient.species ?? 'dog'
  const ageMonths = options.patient.ageMonths ?? 0
  const lifeStage =
    ageMonths < 12 ? 'growth' : ageMonths >= 96 ? 'senior' : ('adult' as const)

  const idealWeightEstimate = estimateTargetWeight({
    species,
    currentWeightKg: weightKg,
    bcs,
    goal: options.goal,
    muscleCondition: options.patient.muscleCondition,
    lifeStage,
    gestationOrLactation: false,
    clinicalRiskFlags: inferClinicalRiskFlags(options.patient.comorbidityIds),
    previousHealthyWeightKg: options.patient.previousHealthyWeightKg,
    expectedAdultWeightKg: options.patient.expectedAdultWeightKg ?? options.energy?.expectedAdultWeightKg,
  })

  const uncertaintyNotice =
    'Esta é uma estimativa inicial. A necessidade energética individual deve ser calibrada pelo acompanhamento do paciente.'
  const reassessmentHint = 'Reavaliar peso, ECC, EMC e adesão em 2–4 semanas.'

  if (options.goal === 'maintenance') {
    return {
      targetWeightKg: weightKg,
      idealWeightEstimate,
      maintenanceEnergyKcal,
      targetEnergyKcal: maintenanceEnergyKcal,
      maintenanceResult,
      targetResult: maintenanceResult,
      energyFormula: `Manutenção no peso atual (${weightKg.toFixed(2)} kg). ${maintenanceResult.methodSummary}`,
      reassessmentHint,
      uncertaintyNotice,
    }
  }

  const targetAssessment = mapPatientFromStore(options.patient, options.energy, nutritionalGoal)
  targetAssessment.selectedWeightLossEnergyMethod = options.weightLossEnergyMethod

  let targetResult: EnergyCalculationResult | null = null
  let weightLossEnergyOptions: BodyTargetPlanV3['weightLossEnergyOptions']

  if (options.goal === 'weight_loss') {
    const built = buildWeightLossEnergyOptions(targetAssessment, idealWeightEstimate.targetWeightKg)
    targetResult = selectWeightLossEnergy(built, options.weightLossEnergyMethod)
    weightLossEnergyOptions = {
      aahaKcal: built.aaha.selectedTargetKcalDay,
      observedKcal: built.observed?.selectedTargetKcalDay ?? null,
      selectedMethod: options.weightLossEnergyMethod ?? 'aaha2021',
    }
  } else {
    targetResult = calculatePatientEnergy(targetAssessment).result
  }

  if (!targetResult) return null

  const targetWeightKg = idealWeightEstimate.targetWeightKg
  const weightMethod = idealWeightMethodLabel(idealWeightEstimate.method)

  const energyFormulaParts = [
    idealWeightEstimate.methodSummary,
    `${targetResult.clinicalProfileLabel}: ${targetResult.methodSummary}`,
  ]

  const weeklyLossTargetPct =
    options.goal === 'weight_loss' ? WEEKLY_WEIGHT_LOSS_TARGET[species] : undefined

  return {
    targetWeightKg,
    idealWeightEstimate,
    maintenanceEnergyKcal,
    targetEnergyKcal: targetResult.selectedTargetKcalDay,
    maintenanceResult,
    targetResult,
    energyFormula: energyFormulaParts.join(' '),
    weeklyLossTargetPct,
    weightLossEnergyOptions,
    reassessmentHint,
    uncertaintyNotice,
  }
}
