/**
 * Persistência local v2 — snapshots separados do calc v1 legado.
 * MER, meta corporal e hospital permanecem em campos distintos.
 */

import type { EnergyCalculation, Patient, WeightTargetPlan } from '../types'
import {
  CALC_STORAGE_KEY_V2,
  mapPatientFromStore,
  toPrescribedEnergySnapshot,
  type PrescribedEnergySnapshotV2,
} from './nutritionCalculationBridge'
import { calculatePatientEnergy, CALCULATION_ENGINE_VERSION } from './nutrition-calculations'
import type { NutritionPatientAssessment, NutritionalGoal } from './nutrition-calculations'
import type { TherapeuticDietReview } from './nutritionTherapeuticBridge'

export interface CalculationSnapshotV2 {
  id: string
  savedAt: string
  calculationEngineVersion: string
  patient: Partial<Patient>
  energy: Partial<EnergyCalculation>
  target: Partial<WeightTargetPlan>
  assessment: NutritionPatientAssessment
  prescribedEnergy: PrescribedEnergySnapshotV2
  therapeuticReview?: TherapeuticDietReview
  reportId?: string
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function readCalculationSnapshotsV2(): CalculationSnapshotV2[] {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(CALC_STORAGE_KEY_V2)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CalculationSnapshotV2[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeCalculationSnapshotsV2(snapshots: CalculationSnapshotV2[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(CALC_STORAGE_KEY_V2, JSON.stringify(snapshots.slice(0, 200)))
}

export function buildCalculationSnapshotV2(options: {
  patient: Partial<Patient>
  energy: Partial<EnergyCalculation>
  target: Partial<WeightTargetPlan>
  nutritionalGoal?: NutritionalGoal
  therapeuticReview?: TherapeuticDietReview
  reportId?: string
}): CalculationSnapshotV2 | null {
  const goal: NutritionalGoal =
    options.nutritionalGoal ??
    (options.target.goal === 'weight_loss'
      ? 'weight_loss'
      : options.target.goal === 'weight_gain'
        ? 'weight_gain'
        : 'maintenance')

  const assessment = mapPatientFromStore(options.patient, options.energy, goal)
  const { result } = calculatePatientEnergy(assessment)
  if (!result) return null

  return {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    calculationEngineVersion: CALCULATION_ENGINE_VERSION,
    patient: options.patient,
    energy: options.energy,
    target: options.target,
    assessment,
    prescribedEnergy: toPrescribedEnergySnapshot(result),
    therapeuticReview: options.therapeuticReview,
    reportId: options.reportId,
  }
}

export function saveCalculationSnapshotV2(snapshot: CalculationSnapshotV2) {
  const existing = readCalculationSnapshotsV2()
  const next = [snapshot, ...existing.filter((item) => item.id !== snapshot.id)].slice(0, 200)
  writeCalculationSnapshotsV2(next)
}

export function getCalculationSnapshotByReportId(reportId: string): CalculationSnapshotV2 | undefined {
  return readCalculationSnapshotsV2().find((item) => item.reportId === reportId)
}
