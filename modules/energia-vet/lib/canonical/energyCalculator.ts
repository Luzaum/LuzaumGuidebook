import {
  calculateBookProfileEnergy,
  calculateBookRER,
  getBookEnergyProfileById,
  type BookEnergyProfile,
} from '../bookEnergy'
import { EVIDENCE_CATALOG } from './evidenceCatalog'
import type { CanonicalNutritionInput } from './types'

export const CANONICAL_ENGINE_VERSION = 'canonical-nutrition-engine-v1.2026.08'

const DOG_EXP = 0.75
const CAT_EXP = 0.67

export interface CanonicalEnergyResult {
  rerKcalDay: number
  selectedTargetKcalDay: number
  estimatedRangeKcalDay: { minimum: number; maximum: number }
  weightUsedKg: number
  weightBasis: 'current_weight' | 'ideal_weight' | 'target_weight'
  clinicalProfileLabel: string
  methodSummary: string
  confidence: 'high' | 'moderate' | 'low' | 'patient_calibrated'
  multiplierEquivalent?: number
  sourceId: keyof typeof EVIDENCE_CATALOG
}

/** Perfis do livro que usam coeficiente FEDIAF direto (kcal/kg^exp), não fator × RER do livro. */
const DOG_FEDIAF_PROFILES: Record<
  string,
  { coefficient: number; min?: number; max?: number; label: string; resolve?: (input: CanonicalNutritionInput) => number }
> = {
  dog_adult_inactive: { coefficient: 95, label: 'Baixa atividade (FEDIAF)' },
  dog_work_light: { coefficient: 110, label: 'Trabalho leve (FEDIAF)' },
  dog_work_moderate: {
    coefficient: 110,
    label: 'Trabalho moderado — baixo impacto (FEDIAF)',
    resolve: (input) => (input.patient.activityImpact === 'high' ? 125 : 110),
  },
  dog_work_heavy: { coefficient: 150, min: 150, max: 175, label: 'Trabalho intenso (FEDIAF)' },
  dog_senior: { coefficient: 100, min: 80, max: 120, label: 'Sênior (FEDIAF)' },
  dog_nrc_inactive: { coefficient: 95, label: 'Inativo NRC → FEDIAF baixa atividade' },
  dog_nrc_active_pet: { coefficient: 110, label: 'Pet ativo NRC → FEDIAF moderado' },
  dog_nrc_young_active: { coefficient: 132, min: 125, max: 140, label: 'Adulto jovem (FEDIAF)' },
  dog_nrc_senior_active: { coefficient: 100, min: 80, max: 120, label: 'Idoso ativo (FEDIAF)' },
}

function observedMaintenanceKcal(input: CanonicalNutritionInput): number | null {
  const intake = input.nutrition.actualDailyIntake
  if (!intake?.reliable || !intake.weightStable || intake.kcalPerDay == null || intake.kcalPerDay <= 0) {
    return null
  }
  const bcs = input.patient.bodyConditionScore?.value ?? 5
  if (bcs < 4 || bcs > 6) return null
  return (
    intake.kcalPerDay +
    (intake.treatsKcalPerDay ?? 0) +
    (intake.chewsKcalPerDay ?? 0) +
    (intake.medicationVehicleKcalPerDay ?? 0) +
    (intake.supplementsKcalPerDay ?? 0)
  )
}

function fediafDogMer(weightKg: number, coefficient: number, min?: number, max?: number) {
  const kcal = coefficient * Math.pow(weightKg, DOG_EXP)
  const minimum = (min ?? coefficient) * Math.pow(weightKg, DOG_EXP)
  const maximum = (max ?? coefficient) * Math.pow(weightKg, DOG_EXP)
  return { kcal, minimum, maximum, coefficient }
}

function fediafCatMer(input: CanonicalNutritionInput, weightKg: number, profileId?: string) {
  const highActivity =
    profileId === 'cat_adult_intact' ||
    (input.patient.activityImpact === 'high') ||
    (input.patient.activityHoursPerDay ?? 0) >= 3
  if (highActivity) {
    const coefficient = 100
    const kcal = coefficient * Math.pow(weightKg, CAT_EXP)
    return { kcal, minimum: kcal, maximum: kcal, coefficient, label: 'Gato ativo (FEDIAF)' }
  }
  const min = 52
  const max = 75
  const coefficient = max
  const kcal = coefficient * Math.pow(weightKg, CAT_EXP)
  return {
    kcal,
    minimum: min * Math.pow(weightKg, CAT_EXP),
    maximum: max * Math.pow(weightKg, CAT_EXP),
    coefficient,
    label: 'Gato indoor/castrado (FEDIAF)',
  }
}

function bookProfileEnergy(
  input: CanonicalNutritionInput,
  profile: BookEnergyProfile,
  weightKg: number,
  rer: number,
): CanonicalEnergyResult {
  const result = calculateBookProfileEnergy({
    weightKg,
    profile,
    rer,
    litterSize: input.physiology.litterSize,
    lactationWeek: input.physiology.lactationWeek,
  })
  return {
    rerKcalDay: rer,
    selectedTargetKcalDay: result.kcal,
    estimatedRangeKcalDay: {
      minimum: result.kcal * 0.95,
      maximum: result.kcal * 1.05,
    },
    weightUsedKg: weightKg,
    weightBasis: 'current_weight',
    clinicalProfileLabel: profile.label,
    methodSummary: result.formula,
    confidence: 'moderate',
    multiplierEquivalent: result.factor,
    sourceId: 'avcn-2024',
  }
}

/** Um único coeficiente energético efetivo — sem empilhamento por comorbidade. */
export function calculateMaintenanceEnergy(input: CanonicalNutritionInput): CanonicalEnergyResult | null {
  const weightKg = input.patient.currentWeightKg
  if (weightKg <= 0) return null

  const override = input.calculationPreferences.clinicianEnergyOverrideKcalDay
  if (override != null && override > 0 && input.calculationPreferences.clinicianOverrideReason) {
    const rer = calculateBookRER(weightKg)
    return {
      rerKcalDay: rer,
      selectedTargetKcalDay: override,
      estimatedRangeKcalDay: { minimum: override * 0.95, maximum: override * 1.05 },
      weightUsedKg: weightKg,
      weightBasis: 'current_weight',
      clinicalProfileLabel: 'Override clínico documentado',
      methodSummary: input.calculationPreferences.clinicianOverrideReason,
      confidence: 'high',
      multiplierEquivalent: rer > 0 ? override / rer : undefined,
      sourceId: 'avcn-2024',
    }
  }

  const observed = observedMaintenanceKcal(input)
  if (observed != null) {
    const rer = calculateBookRER(weightKg)
    return {
      rerKcalDay: rer,
      selectedTargetKcalDay: observed,
      estimatedRangeKcalDay: { minimum: observed * 0.95, maximum: observed * 1.05 },
      weightUsedKg: weightKg,
      weightBasis: 'current_weight',
      clinicalProfileLabel: 'Ingestão observada estável',
      methodSummary: 'Manutenção baseada na ingestão real documentada com peso estável.',
      confidence: 'patient_calibrated',
      sourceId: 'avcn-2024',
    }
  }

  const profileId = input.calculationPreferences.selectedBookEnergyProfileId
  const rer = calculateBookRER(weightKg)
  const species = input.patient.species

  if (species === 'dog' && profileId && profileId in DOG_FEDIAF_PROFILES) {
    const spec = DOG_FEDIAF_PROFILES[profileId]
    const coefficient = spec.resolve ? spec.resolve(input) : spec.coefficient
    const mer = fediafDogMer(weightKg, coefficient, spec.min, spec.max)
    return {
      rerKcalDay: rer,
      selectedTargetKcalDay: mer.kcal,
      estimatedRangeKcalDay: { minimum: mer.minimum, maximum: mer.maximum },
      weightUsedKg: weightKg,
      weightBasis: 'current_weight',
      clinicalProfileLabel: spec.label,
      methodSummary: `${coefficient} kcal/kg^0,75 (FEDIAF 2025)`,
      confidence: 'moderate',
      multiplierEquivalent: rer > 0 ? mer.kcal / rer : undefined,
      sourceId: 'fediaf-2025',
    }
  }

  if (species === 'cat') {
    const profile = profileId ? getBookEnergyProfileById(profileId) : undefined
    if (profile && (profile.group === 'Crescimento' || profile.group === 'Reprodução')) {
      return bookProfileEnergy(input, profile, weightKg, rer)
    }
    const catMer = fediafCatMer(input, weightKg, profileId)
    return {
      rerKcalDay: rer,
      selectedTargetKcalDay: catMer.kcal,
      estimatedRangeKcalDay: { minimum: catMer.minimum, maximum: catMer.maximum },
      weightUsedKg: weightKg,
      weightBasis: 'current_weight',
      clinicalProfileLabel: catMer.label,
      methodSummary: `${catMer.coefficient} kcal/kg^0,67 (FEDIAF 2025)`,
      confidence: 'moderate',
      multiplierEquivalent: rer > 0 ? catMer.kcal / rer : undefined,
      sourceId: 'fediaf-2025',
    }
  }

  const profile = profileId ? getBookEnergyProfileById(profileId) : undefined
  if (profile) {
    return bookProfileEnergy(input, profile, weightKg, rer)
  }

  const fallback = getBookEnergyProfileById(
    species === 'dog'
      ? input.patient.neuterStatus === 'neutered'
        ? 'dog_adult_neutered'
        : 'dog_adult_intact'
      : 'cat_adult_neutered',
  )
  if (!fallback) return null
  return bookProfileEnergy(input, fallback, weightKg, rer)
}
