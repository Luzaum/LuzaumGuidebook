import type { CalculationSnapshotV2 } from '../lib/calculationPersistenceV2'
import { buildFullClinicalSnapshot, isFullClinicalRecord } from '../lib/clinicalSnapshotBuilder'
import type { NutritionClinicalRecord, StoredCalculationReport } from '../types'
import {
  confidenceLabel,
  muscleConditionLabel,
  weightBasisLabel,
} from './clinicalLabels'

export interface LegacyClinicalFields {
  rerKcalDay: number
  maintenanceRangeMin?: number
  maintenanceRangeMax?: number
  prescribedKcalDay: number
  weightBasisLabel: string
  energyProfileLabel: string
  confidenceLabel: string
  methodSummary: string
  targetWeightMethod?: string
  muscleConditionLabel?: string
  activitySummary?: string
  observedIntakeKcal?: number
  roundingErrorPercent?: number
}

export function resolveClinicalRecordLegacyFields(
  report: StoredCalculationReport,
  snapshot?: CalculationSnapshotV2 | null,
): LegacyClinicalFields {
  if (report.clinicalRecord && isFullClinicalRecord(report.clinicalRecord)) {
    const e = report.clinicalRecord.energy
    return {
      rerKcalDay: e.rerKcalDay,
      maintenanceRangeMin: e.maintenanceRangeMin,
      maintenanceRangeMax: e.maintenanceRangeMax,
      prescribedKcalDay: e.prescribedKcalDay,
      weightBasisLabel: e.weightBasisLabel,
      energyProfileLabel: e.energyProfileLabel,
      confidenceLabel: e.confidenceLabel,
      methodSummary: e.methodSummary,
      targetWeightMethod: report.clinicalRecord.bodyComposition.targetWeightMethodLabel,
      muscleConditionLabel: report.clinicalRecord.patient.muscleConditionLabel,
      activitySummary: report.clinicalRecord.patient.activitySummary,
      observedIntakeKcal: e.observedIntakeKcalDay,
      roundingErrorPercent: e.roundingErrorPercent,
    }
  }

  if (report.clinicalRecord?.rerKcalDay != null) {
    return {
      rerKcalDay: report.clinicalRecord.rerKcalDay,
      maintenanceRangeMin: report.clinicalRecord.maintenanceRangeMin,
      maintenanceRangeMax: report.clinicalRecord.maintenanceRangeMax,
      prescribedKcalDay: report.clinicalRecord.prescribedKcalDay ?? 0,
      weightBasisLabel: report.clinicalRecord.weightBasisLabel ?? 'Peso atual',
      energyProfileLabel: report.clinicalRecord.energyProfileLabel ?? 'Perfil energético selecionado',
      confidenceLabel: report.clinicalRecord.confidenceLabel ?? 'Moderada',
      methodSummary: report.clinicalRecord.methodSummary ?? 'Estimativa baseada no perfil energético registrado.',
      targetWeightMethod: report.clinicalRecord.targetWeightMethod,
      muscleConditionLabel: report.clinicalRecord.muscleConditionLabel,
      activitySummary: report.clinicalRecord.activitySummary,
      observedIntakeKcal: report.clinicalRecord.observedIntakeKcal,
      roundingErrorPercent: report.clinicalRecord.roundingErrorPercent,
    }
  }

  if (snapshot) return buildLegacyFromSnapshot(snapshot)
  return buildLegacyFromReport(report)
}

function buildLegacyFromSnapshot(snapshot: CalculationSnapshotV2): LegacyClinicalFields {
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

function buildLegacyFromReport(report: StoredCalculationReport): LegacyClinicalFields {
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

/** @deprecated Preferir buildFullClinicalSnapshot */
export function buildClinicalRecordFromSnapshot(snapshot: CalculationSnapshotV2): NutritionClinicalRecord {
  return buildFullClinicalSnapshot({
    report: {
      id: snapshot.reportId ?? snapshot.id,
      createdAt: snapshot.savedAt,
      patient: snapshot.patient,
      energy: snapshot.energy,
      target: snapshot.target,
      diet: { dietType: 'commercial', targetEnergy: snapshot.prescribedEnergy.finalPrescribedKcalDay, mealsPerDay: 2, entries: [] },
      formula: {
        contributions: [],
        evaluation: { totalDelivered: {}, deliveredAsPercentDm: {}, deliveredPer1000Kcal: {}, deliveredPer100Kcal: {}, deliveredPerMetabolicBw: {}, deliveredPerKgBw: {}, macroSplit: [], adequacy: [], missingDataFlags: [], alerts: [] },
        feedingPlan: { patientName: '', mealsPerDay: 2, totalAsFedGrams: 0, totalDryMatterGrams: 0, instructions: [], meals: [], mode: 'automatic' },
      },
      therapeuticReview: snapshot.therapeuticReview,
    },
    snapshot,
    therapeuticReview: snapshot.therapeuticReview,
  })
}

export function buildClinicalRecordFromReport(report: StoredCalculationReport): NutritionClinicalRecord {
  return buildFullClinicalSnapshot({ report })
}

export function resolveClinicalRecord(
  report: StoredCalculationReport,
  snapshot?: CalculationSnapshotV2 | null,
): NutritionClinicalRecord {
  if (report.clinicalRecord && isFullClinicalRecord(report.clinicalRecord)) {
    return report.clinicalRecord
  }
  return buildFullClinicalSnapshot({
    report,
    snapshot,
    therapeuticReview: report.therapeuticReview ?? snapshot?.therapeuticReview,
    hydration: report.diet.hydrationPlan,
    transition: report.diet.dietTransition,
  })
}

export function buildClinicalRecordForSave(
  report: StoredCalculationReport,
  snapshot?: CalculationSnapshotV2 | null,
): NutritionClinicalRecord {
  return buildFullClinicalSnapshot({
    report,
    snapshot,
    therapeuticReview: report.therapeuticReview ?? snapshot?.therapeuticReview,
    hydration: report.diet.hydrationPlan,
    transition: report.diet.dietTransition,
  })
}
