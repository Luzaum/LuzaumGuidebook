import type { CalculationSnapshotV2 } from '../lib/calculationPersistenceV2'
import type { NutritionClinicalRecord, StoredCalculationReport } from '../types'
import {
  confidenceLabel,
  muscleConditionLabel,
  weightBasisLabel,
} from './clinicalLabels'

export function buildClinicalRecordFromSnapshot(snapshot: CalculationSnapshotV2): NutritionClinicalRecord {
  const pe = snapshot.prescribedEnergy
  const assessment = snapshot.assessment
  const observed =
    assessment.currentDietHistory?.reliable && assessment.currentDietHistory.weightStable
      ? assessment.currentDietHistory.foods.reduce((s, f) => s + f.kcalPerDay, 0) +
        assessment.currentDietHistory.treatsKcalPerDay +
        assessment.currentDietHistory.chewsKcalPerDay +
        assessment.currentDietHistory.medicationVehicleKcalPerDay +
        assessment.currentDietHistory.supplementsKcalPerDay
      : undefined

  return {
    rerKcalDay: pe.rerKcalDay,
    maintenanceRangeMin: pe.maintenanceRangeKcalDay.minimum,
    maintenanceRangeMax: pe.maintenanceRangeKcalDay.maximum,
    prescribedKcalDay: pe.finalPrescribedKcalDay,
    weightBasisLabel: weightBasisLabel(pe.weightBasis),
    energyProfileLabel: pe.clinicalProfileLabel,
    confidenceLabel: confidenceLabel(pe.confidence),
    methodSummary: pe.methodSummary,
    muscleConditionLabel: muscleConditionLabel(assessment.muscleCondition),
    activitySummary: formatActivitySummary(assessment.activity.lowImpactHoursPerDay, assessment.activity.highImpactHoursPerDay),
    observedIntakeKcal: observed,
  }
}

export function buildClinicalRecordFromReport(report: StoredCalculationReport): NutritionClinicalRecord {
  const rer = report.energy.rer ?? 0
  const prescribed = report.target.targetEnergy ?? report.diet.targetEnergy ?? report.energy.mer ?? 0
  return {
    rerKcalDay: rer,
    prescribedKcalDay: prescribed,
    maintenanceRangeMin: report.energy.merFromProfile ?? undefined,
    maintenanceRangeMax: report.energy.mer ?? undefined,
    weightBasisLabel: report.target.weightToUseForEnergy === 'target' ? 'Peso ideal' : 'Peso atual',
    energyProfileLabel: report.energy.resolvedProfileLabel ?? 'Perfil energético selecionado',
    confidenceLabel: 'Moderada',
    methodSummary: report.energy.merFormula?.[1] ?? 'Estimativa baseada no perfil energético registrado.',
    muscleConditionLabel: muscleConditionLabel(report.patient.muscleCondition),
    targetWeightMethod: report.target.targetWeight != null ? 'Peso-alvo estimado pela condição corporal' : undefined,
  }
}

function formatActivitySummary(low?: number, high?: number): string {
  const parts: string[] = []
  if (low != null && low > 0) parts.push(`${low} h/dia de atividade de baixo impacto`)
  if (high != null && high > 0) parts.push(`${high} h/dia de atividade de alto impacto`)
  return parts.length ? parts.join('; ') : 'Não informado'
}

export function resolveClinicalRecord(
  report: StoredCalculationReport,
  snapshot?: CalculationSnapshotV2 | null,
): NutritionClinicalRecord {
  if (report.clinicalRecord) return report.clinicalRecord
  if (snapshot) return buildClinicalRecordFromSnapshot(snapshot)
  return buildClinicalRecordFromReport(report)
}
