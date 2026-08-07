import type { EnergyCalculation, Patient, WeightTargetPlan } from '../../types'
import { createEmptyCanonicalInput } from './reducer'
import type { CanonicalNutritionInput, CanonicalSpecies } from './types'
import { CANONICAL_NUTRITION_SCHEMA_VERSION } from './schemaVersion'

export type NutritionalGoal = 'maintenance' | 'weight_loss' | 'weight_gain' | 'hospital' | 'refeeding'

function resolveLifeStage(ageMonths: number, gestationWeek?: number, litterSize?: number) {
  if (gestationWeek != null && gestationWeek > 0) return 'gestation' as const
  if (litterSize != null && litterSize > 0) return 'lactation' as const
  if (ageMonths < 12) return 'growth' as const
  if (ageMonths >= 96) return 'senior' as const
  return 'adult' as const
}

function mapNutritionalGoal(target?: WeightTargetPlan['goal'], override?: NutritionalGoal): NutritionalGoal {
  if (override) return override
  if (target === 'weight_loss') return 'weight_loss'
  if (target === 'weight_gain') return 'weight_gain'
  return 'maintenance'
}

export function mapStoreToCanonicalInput(options: {
  patient: Partial<Patient>
  energy?: Partial<EnergyCalculation>
  target?: Partial<WeightTargetPlan>
  nutritionalGoal?: NutritionalGoal
}): CanonicalNutritionInput {
  const patient = options.patient
  const energy = options.energy ?? {}
  const target = options.target ?? {}
  const ageMonths = patient.ageMonths ?? 0

  return createEmptyCanonicalInput({
    patient: {
      species: (patient.species ?? 'dog') as CanonicalSpecies,
      breed: patient.breed,
      ageMonths,
      ageYears: ageMonths > 0 ? ageMonths / 12 : undefined,
      sex: patient.sex ?? 'unknown',
      neuterStatus: patient.isNeutered == null ? 'unknown' : patient.isNeutered ? 'neutered' : 'intact',
      currentWeightKg: patient.currentWeight ?? 0,
      idealWeightKg: target.targetWeight,
      targetWeightKg: target.targetWeight,
      bodyConditionScore: patient.bcs != null ? { value: patient.bcs, scale: 9 } : undefined,
      muscleConditionScore: patient.muscleCondition,
      isIndoor: patient.isIndoor,
      expectedAdultWeightKg: patient.expectedAdultWeightKg ?? energy.expectedAdultWeightKg,
      previousHealthyWeightKg: patient.previousHealthyWeightKg,
      activityHoursPerDay: patient.activityHoursPerDay ?? 1,
      activityImpact: patient.activityImpact ?? 'low',
      highImpactHoursPerDay: patient.highImpactHoursPerDay ?? 0,
    },
    physiology: {
      lifeStage: resolveLifeStage(ageMonths, energy.gestationWeek, energy.litterSize),
      gestationWeek: energy.gestationWeek,
      lactationWeek: energy.lactationWeek,
      litterSize: energy.litterSize,
      growthExpectedAdultWeightKg: patient.expectedAdultWeightKg ?? energy.expectedAdultWeightKg,
      activityLevel: energy.resolvedProfileLabel,
      workingStatus: energy.resolvedEnergyProfileId,
    },
    clinical: {
      hospitalized: !!patient.isHospitalized,
      criticallyIll: false,
      feedingRoute: patient.isHospitalized ? 'enteral' : 'voluntary',
      diagnoses: [],
      medications: [],
      laboratoryData: { values: [] },
      comorbidityIds: [...(patient.comorbidityIds ?? [])],
    },
    nutrition: {
      actualDailyIntake: patient.dietHistory?.documented
        ? {
            kcalPerDay: patient.dietHistory.mainFoodKcalPerDay,
            reliable: patient.dietHistory.reliable,
            weightStable: patient.dietHistory.weightStable,
            daysRecorded: patient.dietHistory.daysRecorded,
            treatsKcalPerDay: patient.dietHistory.treatsKcalPerDay,
            chewsKcalPerDay: patient.dietHistory.chewsKcalPerDay,
            medicationVehicleKcalPerDay: patient.dietHistory.medicationVehicleKcalPerDay,
            supplementsKcalPerDay: patient.dietHistory.supplementsKcalPerDay,
          }
        : undefined,
    },
    calculationPreferences: {
      selectedBookEnergyProfileId: energy.resolvedEnergyProfileId ?? energy.stateId,
      nutritionalGoal: mapNutritionalGoal(target.goal, options.nutritionalGoal),
      weightLossEnergyMethod: target.weightLossEnergyMethod,
      clinicianEnergyOverrideKcalDay:
        energy.clinicalMerAdjustmentEnabled && energy.mer != null ? energy.mer : undefined,
      clinicianOverrideReason: energy.clinicalMerAdjustmentEnabled
        ? 'Ajuste clínico manual registrado na etapa Energia.'
        : undefined,
      safetyMode: 'standard',
    },
    provenance: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'manual',
    },
  })
}

export function mapLegacySnapshotToCanonical(options: {
  patient: Partial<Patient>
  energy?: Partial<EnergyCalculation>
  target?: Partial<WeightTargetPlan>
}): CanonicalNutritionInput {
  const canonical = mapStoreToCanonicalInput(options)
  return {
    ...canonical,
    provenance: {
      ...canonical.provenance,
      migratedFromSchemaVersion: 'store-v1',
      source: 'snapshot',
    },
  }
}

export function isCanonicalSchemaVersion(version: string | undefined): boolean {
  return version === CANONICAL_NUTRITION_SCHEMA_VERSION
}
