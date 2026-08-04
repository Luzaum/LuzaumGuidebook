import type { EnergyCalculationResult, NutritionPatientAssessment, ValidationIssue } from './types'
import { calculateDogAdultEnergy } from './energyAdultDog'
import { calculateCatAdultEnergy } from './energyAdultCat'
import {
  calculateDogGestationFirst4Weeks,
  calculateDogGestationLast5Weeks,
  calculateDogLactation,
  calculateCatGestation,
  calculateCatLactation,
} from './energyReproduction'
import {
  calculateDogGrowthFediaf,
  calculateDogGrowthNrc,
  calculateDogGrowthSimplified,
  calculateCatGrowthNrc,
  calculateCatGrowthFediafFactor,
} from './energyGrowth'
import { calculateHospitalEnergy } from './energyHospital'
import { resolveWeightManagementEnergy } from './energyWeightManagement'
import { calculateRerAllometric } from './energyRer'
import { getSourceLabel } from './sourceRegistry'
import { createCalculationAudit } from './calculationAudit'

export function validateMinimumAssessment(assessment: NutritionPatientAssessment): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!assessment.species) issues.push({ code: 'species', message: 'Espécie obrigatória.', severity: 'error' })
  if (assessment.currentWeightKg <= 0) issues.push({ code: 'weight', message: 'Peso atual obrigatório.', severity: 'error' })
  if (assessment.bodyConditionScore9 < 1 || assessment.bodyConditionScore9 > 9) {
    issues.push({ code: 'bcs', message: 'ECC deve estar entre 1 e 9.', severity: 'error' })
  }
  if (assessment.ageMonths < 0) issues.push({ code: 'age', message: 'Idade inválida.', severity: 'error' })
  if (!assessment.neuterStatus) {
    issues.push({ code: 'neuter', message: 'Estado de castração obrigatório.', severity: 'error' })
  }
  if (assessment.lifeStage === 'growth' && !assessment.reproduction?.expectedAdultWeightKg) {
    issues.push({
      code: 'expected_adult_weight',
      message: 'Peso adulto esperado obrigatório para filhotes.',
      severity: 'error',
    })
  }
  if (assessment.lifeStage === 'lactation') {
    if (!assessment.reproduction?.litterSize) {
      issues.push({ code: 'litter', message: 'Número de filhotes obrigatório na lactação.', severity: 'error' })
    }
    if (!assessment.reproduction?.lactationWeek) {
      issues.push({ code: 'lactation_week', message: 'Semana de lactação obrigatória.', severity: 'error' })
    }
  }
  return issues
}

function buildGrowthEnergy(assessment: NutritionPatientAssessment): EnergyCalculationResult {
  const weightKg = assessment.currentWeightKg
  const rer = calculateRerAllometric(weightKg)
  const expected = assessment.reproduction?.expectedAdultWeightKg

  if (assessment.species === 'dog') {
    const nrc = expected ? calculateDogGrowthNrc(weightKg, expected) : null
    const fediaf = expected ? calculateDogGrowthFediaf(weightKg, expected) : null
    const kcal = nrc ?? fediaf ?? calculateDogGrowthSimplified(rer, assessment.ageMonths)
    return {
      rerKcalDay: rer,
      estimatedRangeKcalDay: {
        minimum: kcal * 0.9,
        maximum: kcal * 1.1,
      },
      selectedTargetKcalDay: kcal,
      weightBasis: 'current_weight',
      weightUsedKg: weightKg,
      clinicalProfileLabel: 'Crescimento canino',
      confidence: expected ? 'high' : 'moderate',
      requiresMonitoring: true,
      methodSummary: nrc != null ? 'Equação NRC/Applied' : 'Estimativa por estágio',
      sourceLabel: getSourceLabel('nrc2006'),
    }
  }

  const nrc = expected ? calculateCatGrowthNrc(weightKg, expected) : null
  const adultRef = calculateCatAdultEnergy(assessment).selectedTargetKcalDay
  const factor = calculateCatGrowthFediafFactor(assessment.ageMonths)
  const fediafEstimate = adultRef * ((factor.min + factor.max) / 2)
  const kcal = nrc ?? fediafEstimate

  return {
    rerKcalDay: rer,
    estimatedRangeKcalDay: { minimum: kcal * 0.85, maximum: kcal * 1.15 },
    selectedTargetKcalDay: kcal,
    weightBasis: 'current_weight',
    weightUsedKg: weightKg,
    clinicalProfileLabel: 'Crescimento felino',
    confidence: expected ? 'high' : 'moderate',
    requiresMonitoring: true,
    methodSummary: nrc != null ? 'Equação NRC/Applied' : 'Fator sobre MER adulto (FEDIAF)',
    sourceLabel: getSourceLabel('fediaf2025'),
  }
}

function buildReproductionEnergy(assessment: NutritionPatientAssessment): EnergyCalculationResult {
  const weightKg = assessment.currentWeightKg
  const rer = calculateRerAllometric(weightKg)
  const repro = assessment.reproduction

  if (assessment.lifeStage === 'gestation') {
    if (assessment.species === 'dog') {
      const week = repro?.gestationWeek ?? 1
      const kcal = week <= 4 ? calculateDogGestationFirst4Weeks(weightKg) : calculateDogGestationLast5Weeks(weightKg)
      return {
        rerKcalDay: rer,
        estimatedRangeKcalDay: { minimum: kcal * 0.95, maximum: kcal * 1.05 },
        selectedTargetKcalDay: kcal,
        weightBasis: 'current_weight',
        weightUsedKg: weightKg,
        clinicalProfileLabel: week <= 4 ? 'Gestação — primeiras 4 semanas' : 'Gestação — últimas 5 semanas',
        confidence: 'moderate',
        requiresMonitoring: true,
        methodSummary: 'FEDIAF 2025',
        sourceLabel: getSourceLabel('fediaf2025'),
      }
    }
    const kcal = calculateCatGestation(weightKg)
    return {
      rerKcalDay: rer,
      estimatedRangeKcalDay: { minimum: kcal * 0.9, maximum: kcal * 1.1 },
      selectedTargetKcalDay: kcal,
      weightBasis: 'current_weight',
      weightUsedKg: weightKg,
      clinicalProfileLabel: 'Gestação felina',
      confidence: 'moderate',
      requiresMonitoring: true,
      methodSummary: '140 × kg^0,67',
      sourceLabel: getSourceLabel('fediaf2025'),
    }
  }

  const litter = repro?.litterSize ?? 1
  const week = repro?.lactationWeek ?? 1
  if (assessment.species === 'dog') {
    const { kcal, extrapolated } = calculateDogLactation(weightKg, litter, week)
    return {
      rerKcalDay: rer,
      estimatedRangeKcalDay: { minimum: kcal * 0.85, maximum: kcal * 1.15 },
      selectedTargetKcalDay: kcal,
      weightBasis: 'current_weight',
      weightUsedKg: weightKg,
      clinicalProfileLabel: extrapolated ? 'Lactação canina (n>8 — revisar)' : 'Lactação canina',
      confidence: extrapolated ? 'low' : 'moderate',
      requiresMonitoring: true,
      methodSummary: 'FEDIAF 2025 + fator semanal',
      sourceLabel: getSourceLabel('fediaf2025'),
    }
  }
  const kcal = calculateCatLactation(weightKg, litter, week)
  return {
    rerKcalDay: rer,
    estimatedRangeKcalDay: { minimum: kcal * 0.85, maximum: kcal * 1.15 },
    selectedTargetKcalDay: kcal,
    weightBasis: 'current_weight',
    weightUsedKg: weightKg,
    clinicalProfileLabel: 'Lactação felina',
    confidence: 'moderate',
    requiresMonitoring: true,
    methodSummary: 'FEDIAF 2025 + fator semanal',
    sourceLabel: getSourceLabel('fediaf2025'),
  }
}

/** Motor canônico v3 — seleção de energia por avaliação do paciente. */
export function calculatePatientEnergy(
  assessment: NutritionPatientAssessment,
): { result: EnergyCalculationResult | null; validationIssues: ValidationIssue[] } {
  const validationIssues = validateMinimumAssessment(assessment)
  if (validationIssues.some((i) => i.severity === 'error')) {
    return { result: null, validationIssues }
  }

  let result: EnergyCalculationResult

  if (assessment.nutritionalGoal === 'hospital') {
    result = calculateHospitalEnergy(assessment.currentWeightKg)
  } else if (assessment.nutritionalGoal === 'weight_loss' || assessment.nutritionalGoal === 'weight_gain') {
    result = resolveWeightManagementEnergy(assessment)
  } else if (assessment.lifeStage === 'growth') {
    result = buildGrowthEnergy(assessment)
  } else if (assessment.lifeStage === 'gestation' || assessment.lifeStage === 'lactation') {
    result = buildReproductionEnergy(assessment)
  } else if (assessment.species === 'cat') {
    result = calculateCatAdultEnergy(assessment)
  } else {
    result = calculateDogAdultEnergy(assessment)
  }

  if (assessment.clinicianEnergyOverrideKcalDay != null && assessment.clinicianEnergyOverrideKcalDay > 0) {
    result = {
      ...result,
      selectedTargetKcalDay: assessment.clinicianEnergyOverrideKcalDay,
      confidence: 'high',
      methodSummary: assessment.clinicianOverrideReason ?? 'Ajuste clínico registrado pelo médico-veterinário.',
      clinicalProfileLabel: 'Meta prescrita pelo clínico',
    }
  }

  createCalculationAudit({
    formulaKey: 'calculatePatientEnergy',
    sourceVersions: [result.sourceLabel],
    inputs: {
      species: assessment.species,
      weightKg: assessment.currentWeightKg,
      goal: assessment.nutritionalGoal,
      lifeStage: assessment.lifeStage,
    },
    rawResult: {
      rerKcalDay: result.rerKcalDay,
      selectedTargetKcalDay: result.selectedTargetKcalDay,
      rangeMin: result.estimatedRangeKcalDay.minimum,
      rangeMax: result.estimatedRangeKcalDay.maximum,
    },
    clinicianOverride:
      assessment.clinicianEnergyOverrideKcalDay != null
        ? {
            value: assessment.clinicianEnergyOverrideKcalDay,
            reason: assessment.clinicianOverrideReason ?? '',
          }
        : undefined,
  })

  return { result, validationIssues }
}
