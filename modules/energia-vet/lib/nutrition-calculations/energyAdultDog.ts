import { DOG_METABOLIC_EXPONENT, coefficientBetween, metabolicWeight } from './units'
import type { EnergyCalculationResult, NutritionPatientAssessment } from './types'
import { getSourceLabel } from './sourceRegistry'
import { calculateRerAllometric } from './energyRer'

export type DogAdultEnergyProfile =
  | 'low_activity'
  | 'moderate_low_impact'
  | 'moderate_high_impact'
  | 'high_activity'
  | 'obesity_prone'
  | 'age_1_2'
  | 'age_3_7'
  | 'senior'

const DOG_COEFFICIENTS: Record<DogAdultEnergyProfile, { min: number; max: number; label: string }> = {
  low_activity: { min: 95, max: 95, label: 'Baixa atividade' },
  moderate_low_impact: { min: 110, max: 110, label: 'Atividade moderada (baixo impacto)' },
  moderate_high_impact: { min: 125, max: 125, label: 'Atividade moderada (alto impacto)' },
  high_activity: { min: 150, max: 175, label: 'Alta atividade' },
  obesity_prone: { min: 90, max: 90, label: 'Predisposto à obesidade' },
  age_1_2: { min: 125, max: 140, label: 'Adulto jovem (1–2 anos)' },
  age_3_7: { min: 95, max: 130, label: 'Adulto maduro (3–7 anos)' },
  senior: { min: 80, max: 120, label: 'Sênior' },
}

export function resolveDogAdultProfile(assessment: NutritionPatientAssessment): DogAdultEnergyProfile {
  const low = assessment.activity.lowImpactHoursPerDay ?? 0
  const high = assessment.activity.highImpactHoursPerDay ?? 0
  const workload = assessment.activity.workload ?? 'none'

  if (workload === 'high' || workload === 'extreme' || high >= 3) return 'high_activity'
  if (high >= 1 || (low >= 1 && low <= 3)) return high >= 1 ? 'moderate_high_impact' : 'moderate_low_impact'
  if (low < 1) return 'low_activity'
  if (assessment.ageMonths >= 84) return 'senior'
  if (assessment.ageMonths >= 12 && assessment.ageMonths <= 24) return 'age_1_2'
  if (assessment.ageMonths > 24 && assessment.ageMonths < 84) return 'age_3_7'
  return 'moderate_low_impact'
}

export function calculateDogAdultMerDirect(
  weightKg: number,
  profile: DogAdultEnergyProfile,
  rangePosition: 'low' | 'mid' | 'high' = 'mid',
): { kcal: number; min: number; max: number; coefficient: number; label: string } {
  const spec = DOG_COEFFICIENTS[profile]
  const coefficient = coefficientBetween(spec.min, spec.max, rangePosition)
  const kcal = coefficient * Math.pow(weightKg, DOG_METABOLIC_EXPONENT)
  const min = spec.min * Math.pow(weightKg, DOG_METABOLIC_EXPONENT)
  const max = spec.max * Math.pow(weightKg, DOG_METABOLIC_EXPONENT)
  return { kcal, min, max, coefficient, label: spec.label }
}

export function calculateObservedMaintenanceKcal(assessment: NutritionPatientAssessment): number | null {
  const h = assessment.currentDietHistory
  if (!h?.reliable || !h.weightStable) return null
  const bcs = assessment.bodyConditionScore9
  const ideal = assessment.idealBodyConditionScore9 ?? 5
  if (bcs < ideal - 1 || bcs > ideal + 1) return null

  const foodKcal = h.foods.reduce((s, f) => s + f.kcalPerDay, 0)
  return (
    foodKcal +
    h.treatsKcalPerDay +
    h.chewsKcalPerDay +
    h.medicationVehicleKcalPerDay +
    h.supplementsKcalPerDay
  )
}

export function calculateDogAdultEnergy(assessment: NutritionPatientAssessment): EnergyCalculationResult {
  const weightKg = assessment.currentWeightKg
  const rer = calculateRerAllometric(weightKg)
  const observed = calculateObservedMaintenanceKcal(assessment)

  if (observed != null && observed > 0) {
    return {
      rerKcalDay: rer,
      estimatedRangeKcalDay: { minimum: observed * 0.95, maximum: observed * 1.05 },
      selectedTargetKcalDay: observed,
      weightBasis: 'current_weight',
      weightUsedKg: weightKg,
      clinicalProfileLabel: 'Ingestão observada estável',
      confidence: 'patient_calibrated',
      requiresMonitoring: true,
      methodSummary: 'Manutenção baseada na ingestão real documentada com peso estável e ECC adequado.',
      sourceLabel: getSourceLabel('pna'),
    }
  }

  const profile = resolveDogAdultProfile(assessment)
  const mer = calculateDogAdultMerDirect(weightKg, profile)

  return {
    rerKcalDay: rer,
    estimatedRangeKcalDay: { minimum: mer.min, maximum: mer.max },
    selectedTargetKcalDay: mer.kcal,
    weightBasis: 'current_weight',
    weightUsedKg: weightKg,
    clinicalProfileLabel: mer.label,
    confidence: 'moderate',
    requiresMonitoring: true,
    methodSummary: `${mer.coefficient} kcal/kg^0,75 (FEDIAF 2025)`,
    sourceLabel: getSourceLabel('fediaf2025'),
  }
}
