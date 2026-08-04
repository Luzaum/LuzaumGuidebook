import type { NutritionClinicalRecord, StoredCalculationReport } from '../../types'
import { computeSnapshotChecksum } from './checksum'
import type { NutritionCalculationSnapshotRecord, SyncState } from './types'

const LOCAL_SNAPSHOTS_KEY = 'vetius-energia-vet-clinical-snapshots-v1'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function readLocalSnapshotRecords(): NutritionCalculationSnapshotRecord[] {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(LOCAL_SNAPSHOTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as NutritionCalculationSnapshotRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeLocalSnapshotRecords(records: NutritionCalculationSnapshotRecord[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(LOCAL_SNAPSHOTS_KEY, JSON.stringify(records.slice(0, 200)))
}

export function saveLocalClinicalSnapshot(options: {
  report: StoredCalculationReport
  clinicalRecord: NutritionClinicalRecord
  clinicId: string
  userId: string
  syncState?: SyncState
}): NutritionCalculationSnapshotRecord {
  const checksum = computeSnapshotChecksum(options.clinicalRecord)
  const existing = readLocalSnapshotRecords()
  const prior = existing.find((item) => item.id === options.report.id)

  const record: NutritionCalculationSnapshotRecord = {
    id: options.report.id,
    clinicId: options.clinicId,
    createdBy: options.userId,
    reportId: options.report.id,
    species: options.report.patient.species ?? 'dog',
    patientName: options.report.patient.name,
    patientExternalId: options.report.patient.id,
    calculationType: options.report.patient.isHospitalized ? 'hospital' : 'outpatient',
    status: 'finalized',
    prescribedKcalDay: options.clinicalRecord.energy?.prescribedKcalDay ?? options.clinicalRecord.prescribedKcalDay,
    currentWeightKg: options.report.patient.currentWeight,
    targetWeightKg: options.report.target.targetWeight,
    bcs9: options.report.patient.bcs,
    muscleCondition: options.report.patient.muscleCondition,
    snapshot: options.clinicalRecord,
    snapshotChecksum: checksum,
    parentCalculationId: prior?.parentCalculationId,
    revisionNumber: prior ? prior.revisionNumber + 1 : 1,
    createdAt: options.report.createdAt,
    finalizedAt: options.report.createdAt,
    syncState: options.syncState ?? 'local_only',
  }

  const next = [record, ...existing.filter((item) => item.id !== record.id)].slice(0, 200)
  writeLocalSnapshotRecords(next)
  return record
}

export function getLocalSnapshotByReportId(reportId: string): NutritionCalculationSnapshotRecord | undefined {
  return readLocalSnapshotRecords().find((item) => item.reportId === reportId)
}

export function updateLocalSyncState(reportId: string, syncState: SyncState, lastSyncError?: string) {
  const records = readLocalSnapshotRecords().map((item) =>
    item.reportId === reportId ? { ...item, syncState, lastSyncError } : item,
  )
  writeLocalSnapshotRecords(records)
}
