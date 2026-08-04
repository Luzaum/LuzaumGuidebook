import type { NutritionClinicalRecord, StoredCalculationReport } from '../../types'

export type SyncState = 'local_only' | 'queued' | 'syncing' | 'synced' | 'failed' | 'conflict'

export interface NutritionCalculationSnapshotRecord {
  id: string
  clinicId: string
  createdBy: string
  reportId: string
  species: 'dog' | 'cat'
  patientName?: string
  patientExternalId?: string
  calculationType: string
  status: 'draft' | 'finalized' | 'superseded'
  prescribedKcalDay?: number
  currentWeightKg?: number
  targetWeightKg?: number
  bcs9?: number
  muscleCondition?: string
  snapshot: NutritionClinicalRecord
  snapshotChecksum: string
  parentCalculationId?: string
  revisionNumber: number
  revisionReason?: string
  createdAt: string
  finalizedAt?: string
  syncState: SyncState
  lastSyncError?: string
}

export interface SyncQueueItem {
  localId: string
  report: StoredCalculationReport
  clinicalRecord: NutritionClinicalRecord
  enqueuedAt: string
  attempts: number
}

export interface SyncResult {
  ok: boolean
  state: SyncState
  remoteId?: string
  error?: string
}
