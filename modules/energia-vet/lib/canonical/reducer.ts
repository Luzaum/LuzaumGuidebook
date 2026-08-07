import { CANONICAL_NUTRITION_SCHEMA_VERSION } from './schemaVersion'
import type {
  CanonicalCalculationPreferences,
  CanonicalMuscleCondition,
  CanonicalNutritionInput,
  CanonicalValidationIssue,
  NutritionAction,
} from './types'

const nowIso = () => new Date().toISOString()

export function createEmptyCanonicalInput(
  partial?: Partial<CanonicalNutritionInput>,
): CanonicalNutritionInput {
  const timestamp = nowIso()
  return {
    schemaVersion: CANONICAL_NUTRITION_SCHEMA_VERSION,
    patient: {
      species: 'dog',
      sex: 'male',
      neuterStatus: 'unknown',
      currentWeightKg: 0,
      muscleConditionScore: 'normal',
      activityHoursPerDay: 1,
      activityImpact: 'low',
      ...partial?.patient,
    },
    physiology: {
      lifeStage: 'adult',
      ...partial?.physiology,
    },
    clinical: {
      hospitalized: false,
      criticallyIll: false,
      feedingRoute: 'voluntary',
      diagnoses: [],
      medications: [],
      laboratoryData: { values: [] },
      comorbidityIds: [],
      ...partial?.clinical,
    },
    nutrition: {
      ...partial?.nutrition,
    },
    calculationPreferences: {
      safetyMode: 'standard',
      nutritionalGoal: 'maintenance',
      ...partial?.calculationPreferences,
    },
    provenance: {
      createdAt: partial?.provenance?.createdAt ?? timestamp,
      updatedAt: timestamp,
      source: partial?.provenance?.source ?? 'manual',
    },
  }
}

function touch(state: CanonicalNutritionInput): CanonicalNutritionInput {
  return {
    ...state,
    provenance: {
      ...state.provenance,
      updatedAt: nowIso(),
    },
  }
}

export function canonicalNutritionReducer(
  state: CanonicalNutritionInput,
  action: NutritionAction,
): CanonicalNutritionInput {
  switch (action.type) {
    case 'patient/currentWeightChanged':
      return touch({
        ...state,
        patient: { ...state.patient, currentWeightKg: action.payload.kg },
      })

    case 'patient/idealWeightChanged':
      return touch({
        ...state,
        patient: { ...state.patient, idealWeightKg: action.payload.kg },
      })

    case 'patient/targetWeightChanged':
      return touch({
        ...state,
        patient: { ...state.patient, targetWeightKg: action.payload.kg },
      })

    case 'patient/bodyConditionScoreChanged':
      return touch({
        ...state,
        patient: {
          ...state.patient,
          bodyConditionScore: {
            value: action.payload.value,
            scale: action.payload.scale,
          },
        },
      })

    case 'patient/muscleConditionChanged':
      return touch({
        ...state,
        patient: { ...state.patient, muscleConditionScore: action.payload },
      })

    case 'patient/speciesChanged':
      return touch({
        ...state,
        patient: { ...state.patient, species: action.payload.species },
      })

    case 'physiology/lifeStageChanged':
      return touch({
        ...state,
        physiology: { ...state.physiology, lifeStage: action.payload },
      })

    case 'physiology/activityChanged':
      return touch({
        ...state,
        patient: {
          ...state.patient,
          activityHoursPerDay:
            action.payload.hoursPerDay ?? state.patient.activityHoursPerDay,
          activityImpact: action.payload.impact ?? state.patient.activityImpact,
        },
      })

    case 'clinical/diagnosisAdded': {
      const exists = state.clinical.diagnoses.some(
        (item) => item.diagnosisId === action.payload.diagnosisId,
      )
      if (exists) return state
      return touch({
        ...state,
        clinical: {
          ...state.clinical,
          diagnoses: [...state.clinical.diagnoses, action.payload],
        },
      })
    }

    case 'clinical/diagnosisUpdated':
      return touch({
        ...state,
        clinical: {
          ...state.clinical,
          diagnoses: state.clinical.diagnoses.map((item) =>
            item.diagnosisId === action.payload.diagnosisId ? action.payload : item,
          ),
        },
      })

    case 'clinical/diagnosisRemoved':
      return touch({
        ...state,
        clinical: {
          ...state.clinical,
          diagnoses: state.clinical.diagnoses.filter(
            (item) => item.diagnosisId !== action.payload.diagnosisId,
          ),
        },
      })

    case 'clinical/comorbidityIdsChanged':
      return touch({
        ...state,
        clinical: { ...state.clinical, comorbidityIds: [...action.payload.ids] },
      })

    case 'clinical/laboratoryDataUpdated':
      return touch({
        ...state,
        clinical: { ...state.clinical, laboratoryData: action.payload },
      })

    case 'clinical/hospitalizationChanged':
      return touch({
        ...state,
        clinical: {
          ...state.clinical,
          hospitalized: action.payload.hospitalized,
          criticallyIll: action.payload.criticallyIll ?? state.clinical.criticallyIll,
        },
      })

    case 'nutrition/currentDietChanged':
      return touch({
        ...state,
        nutrition: { ...state.nutrition, currentDiet: action.payload },
      })

    case 'nutrition/proposedDietChanged':
      return touch({
        ...state,
        nutrition: { ...state.nutrition, proposedDiet: action.payload },
      })

    case 'nutrition/dailyIntakeChanged':
      return touch({
        ...state,
        nutrition: { ...state.nutrition, actualDailyIntake: action.payload },
      })

    case 'calculation/preferenceChanged':
      return touch({
        ...state,
        calculationPreferences: mergePreferences(state.calculationPreferences, action.payload),
      })

    case 'case/snapshotLoaded':
      return {
        ...action.payload,
        schemaVersion: CANONICAL_NUTRITION_SCHEMA_VERSION,
        provenance: {
          ...action.payload.provenance,
          updatedAt: nowIso(),
          migratedFromSchemaVersion:
            action.payload.schemaVersion !== CANONICAL_NUTRITION_SCHEMA_VERSION
              ? action.payload.schemaVersion
              : action.payload.provenance.migratedFromSchemaVersion,
        },
      }

    case 'case/reset':
      return createEmptyCanonicalInput()

    default:
      return assertNeverAction(action)
  }
}

function mergePreferences(
  current: CanonicalCalculationPreferences,
  patch: Partial<CanonicalCalculationPreferences>,
): CanonicalCalculationPreferences {
  return { ...current, ...patch }
}

function assertNeverAction(action: never): never {
  throw new Error(`Ação nutricional não implementada: ${String((action as NutritionAction).type)}`)
}

export function validateCanonicalInput(input: CanonicalNutritionInput): CanonicalValidationIssue[] {
  const issues: CanonicalValidationIssue[] = []

  if (input.patient.currentWeightKg <= 0) {
    issues.push({
      path: 'patient.currentWeightKg',
      message: 'Peso atual deve ser maior que zero.',
      severity: 'error',
    })
  }

  const bcs = input.patient.bodyConditionScore
  if (bcs && (bcs.value < 1 || bcs.value > bcs.scale)) {
    issues.push({
      path: 'patient.bodyConditionScore',
      message: `ECC fora da escala 1–${bcs.scale}.`,
      severity: 'error',
    })
  }

  if (input.physiology.lifeStage === 'growth' && !input.physiology.growthExpectedAdultWeightKg) {
    issues.push({
      path: 'physiology.growthExpectedAdultWeightKg',
      message: 'Peso adulto esperado obrigatório em crescimento.',
      severity: 'error',
    })
  }

  if (input.physiology.lifeStage === 'lactation') {
    if (!input.physiology.litterSize) {
      issues.push({
        path: 'physiology.litterSize',
        message: 'Número de filhotes obrigatório na lactação.',
        severity: 'error',
      })
    }
    if (!input.physiology.lactationWeek) {
      issues.push({
        path: 'physiology.lactationWeek',
        message: 'Semana de lactação obrigatória.',
        severity: 'error',
      })
    }
  }

  for (const lab of input.clinical.laboratoryData.values) {
    if (!Number.isFinite(lab.value)) {
      issues.push({
        path: `clinical.laboratoryData.${lab.analyte}`,
        message: 'Valor laboratorial inválido.',
        severity: 'error',
      })
    }
  }

  const muscle = input.patient.muscleConditionScore
  if (muscle && !isValidMuscleCondition(muscle)) {
    issues.push({
      path: 'patient.muscleConditionScore',
      message: 'EMC inválida.',
      severity: 'error',
    })
  }

  return issues
}

function isValidMuscleCondition(value: CanonicalMuscleCondition): boolean {
  return ['normal', 'mild_loss', 'moderate_loss', 'severe_loss'].includes(value)
}

export function buildAssessmentFingerprint(input: CanonicalNutritionInput): string {
  const payload = {
    species: input.patient.species,
    weight: input.patient.currentWeightKg,
    bcs: input.patient.bodyConditionScore,
    emc: input.patient.muscleConditionScore,
    lifeStage: input.physiology.lifeStage,
    activity: {
      h: input.patient.activityHoursPerDay,
      impact: input.patient.activityImpact,
    },
    profile: input.calculationPreferences.selectedBookEnergyProfileId,
    goal: input.calculationPreferences.nutritionalGoal,
    comorbidities: [...input.clinical.comorbidityIds].sort(),
    diagnoses: input.clinical.diagnoses.map((d) => `${d.diagnosisId}:${d.stage ?? ''}`).sort(),
  }
  return JSON.stringify(payload)
}
