/**
 * Ponte store legado ↔ motor v3.
 * Relatórios v4 e calc v1 permanecem intactos quando a flag interna está desligada.
 */

import { isNutritionFeatureEnabled } from './featureFlags'
import type { BCS, Species } from '../types'
import {
  calculatePatientEnergy,
  type EnergyCalculationResult,
  type NutritionPatientAssessment,
  type NutritionalGoal,
} from './nutrition-calculations'

export const CALC_STORAGE_KEY_V2 = 'vetius-energia-vet-calc-v2'
export const REPORT_STORAGE_KEY_V5 = 'vetius-energia-vet-reports-v5'

export function isCalculationEngineV3Enabled(): boolean {
  return isNutritionFeatureEnabled('nutrition_calculation_engine_v3')
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
  nutritionalGoal: NutritionalGoal
  litterSize?: number
  lactationWeek?: number
  expectedAdultWeightKg?: number
  gestationWeek?: number
  clinicianTargetWeightKg?: number
  clinicianEnergyOverrideKcalDay?: number
  clinicianOverrideReason?: string
}): NutritionPatientAssessment {
  const lifeStage = resolveLifeStage(options.ageMonths, options.gestationWeek, options.litterSize)
  return {
    species: options.species,
    currentWeightKg: options.weightKg,
    bodyConditionScore9: options.bcs,
    idealBodyConditionScore9: 5,
    muscleCondition: 'normal',
    ageMonths: options.ageMonths,
    sex: options.sex,
    neuterStatus: options.isNeutered ? 'neutered' : 'intact',
    lifeStage,
    activity: {
      environment: options.isIndoor ? 'indoor' : 'mixed',
      lowImpactHoursPerDay: options.activityHoursPerDay ?? 1,
      highImpactHoursPerDay: 0,
      workload: 'none',
    },
    reproduction: {
      litterSize: options.litterSize,
      lactationWeek: options.lactationWeek,
      expectedAdultWeightKg: options.expectedAdultWeightKg,
      gestationWeek: options.gestationWeek,
    },
    clinicianTargetWeightKg: options.clinicianTargetWeightKg,
    clinicianEnergyOverrideKcalDay: options.clinicianEnergyOverrideKcalDay,
    clinicianOverrideReason: options.clinicianOverrideReason,
    nutritionalGoal: options.nutritionalGoal,
  }
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
