import { CAT_METABOLIC_EXPONENT, coefficientBetween } from './units'
import type { EnergyCalculationResult, NutritionPatientAssessment } from './types'
import { getSourceLabel } from './sourceRegistry'
import { calculateRerAllometric } from './energyRer'
import { calculateObservedMaintenanceKcal } from './energyAdultDog'

export type CatAdultEnergyProfile = 'indoor_neutered' | 'active'

export function calculateCatAdultMerDirect(
  weightKg: number,
  profile: CatAdultEnergyProfile,
  rangePosition: 'low' | 'mid' | 'high' = 'mid',
): { kcal: number; min: number; max: number; coefficient: number; label: string } {
  if (profile === 'active') {
    const coefficient = 100
    const kcal = coefficient * Math.pow(weightKg, CAT_METABOLIC_EXPONENT)
    return { kcal, min: kcal, max: kcal, coefficient, label: 'Gato ativo' }
  }
  const min = 52
  const max = 75
  const coefficient = coefficientBetween(min, max, rangePosition)
  const kcal = coefficient * Math.pow(weightKg, CAT_METABOLIC_EXPONENT)
  return {
    kcal,
    min: min * Math.pow(weightKg, CAT_METABOLIC_EXPONENT),
    max: max * Math.pow(weightKg, CAT_METABOLIC_EXPONENT),
    coefficient,
    label: 'Gato indoor e/ou castrado',
  }
}

export function resolveCatAdultProfile(assessment: NutritionPatientAssessment): CatAdultEnergyProfile {
  const low = assessment.activity.lowImpactHoursPerDay ?? 0
  const high = assessment.activity.highImpactHoursPerDay ?? 0
  if (high >= 2 || low >= 3) return 'active'
  if (assessment.activity.environment === 'outdoor') return 'active'
  return 'indoor_neutered'
}

export function calculateCatAdultEnergy(assessment: NutritionPatientAssessment): EnergyCalculationResult {
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
      methodSummary: 'Manutenção baseada na ingestão real documentada.',
      sourceLabel: getSourceLabel('pna'),
    }
  }

  const profile = resolveCatAdultProfile(assessment)
  const rangePos = profile === 'indoor_neutered' ? 'high' : 'mid'
  const mer = calculateCatAdultMerDirect(weightKg, profile, rangePos)

  return {
    rerKcalDay: rer,
    estimatedRangeKcalDay: { minimum: mer.min, maximum: mer.max },
    selectedTargetKcalDay: mer.kcal,
    weightBasis: 'current_weight',
    weightUsedKg: weightKg,
    clinicalProfileLabel: mer.label,
    confidence: 'moderate',
    requiresMonitoring: true,
    methodSummary: `${mer.coefficient} kcal/kg^0,67 (FEDIAF 2025)`,
    sourceLabel: getSourceLabel('fediaf2025'),
  }
}
