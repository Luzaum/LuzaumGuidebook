/**
 * Persistência local v2 — snapshots com entrada canônica.
 */

import type { EnergyCalculation, Patient, WeightTargetPlan } from '../types'
import {
  calculateMaintenanceEnergy,
  CANONICAL_ENGINE_VERSION,
  mapLegacySnapshotToCanonical,
  mapStoreToCanonicalInput,
  type CanonicalNutritionInput,
  CANONICAL_NUTRITION_SCHEMA_VERSION,
  type NutritionalGoal,
} from './canonical'

export const CALC_STORAGE_KEY_V2 = 'vetius-energia-vet-calc-v2'

export interface PrescribedEnergySnapshotV2 {
  rerKcalDay: number
  maintenanceEstimateKcalDay: number
  maintenanceRangeKcalDay: { minimum: number; maximum: number }
  finalPrescribedKcalDay: number
  weightBasis: 'current_weight' | 'ideal_weight' | 'target_weight'
  weightUsedKg: number
  clinicalProfileLabel: string
  confidence: string
  methodSummary: string
}

export interface CalculationSnapshotV2 {
  id: string
  savedAt: string
  calculationEngineVersion: string
  schemaVersion: string
  patient: Partial<Patient>
  energy: Partial<EnergyCalculation>
  target: Partial<WeightTargetPlan>
  canonicalInput: CanonicalNutritionInput
  prescribedEnergy: PrescribedEnergySnapshotV2
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
  reportId?: string
  canonicalInput?: CanonicalNutritionInput
}): CalculationSnapshotV2 | null {
  const canonicalInput =
    options.canonicalInput ??
    mapStoreToCanonicalInput({
      patient: options.patient,
      energy: options.energy,
      target: options.target,
      nutritionalGoal: options.nutritionalGoal,
    })

  const result = calculateMaintenanceEnergy(canonicalInput)
  if (!result) return null

  return {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    calculationEngineVersion: CANONICAL_ENGINE_VERSION,
    schemaVersion: CANONICAL_NUTRITION_SCHEMA_VERSION,
    patient: options.patient,
    energy: options.energy,
    target: options.target,
    canonicalInput,
    prescribedEnergy: {
      rerKcalDay: result.rerKcalDay,
      maintenanceEstimateKcalDay: result.selectedTargetKcalDay,
      maintenanceRangeKcalDay: result.estimatedRangeKcalDay,
      finalPrescribedKcalDay: result.selectedTargetKcalDay,
      weightBasis: result.weightBasis,
      weightUsedKg: result.weightUsedKg,
      clinicalProfileLabel: result.clinicalProfileLabel,
      confidence: result.confidence,
      methodSummary: result.methodSummary,
    },
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

export function migrateLegacySnapshotV2(raw: Record<string, unknown>): CalculationSnapshotV2 | null {
  if (raw.canonicalInput) return raw as CalculationSnapshotV2
  return buildCalculationSnapshotV2({
    patient: (raw.patient as Partial<Patient>) ?? {},
    energy: (raw.energy as Partial<EnergyCalculation>) ?? {},
    target: (raw.target as Partial<WeightTargetPlan>) ?? {},
    canonicalInput: mapLegacySnapshotToCanonical({
      patient: (raw.patient as Partial<Patient>) ?? {},
      energy: (raw.energy as Partial<EnergyCalculation>) ?? {},
      target: (raw.target as Partial<WeightTargetPlan>) ?? {},
    }),
  })
}
