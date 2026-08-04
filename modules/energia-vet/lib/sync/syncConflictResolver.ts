import type { NutritionCalculationSnapshotRecord } from './types'

export type SyncConflictResolution = 'keep_local' | 'keep_remote' | 'create_revision'

export function resolveChecksumConflict(options: {
  local: NutritionCalculationSnapshotRecord
  remoteChecksum: string
}): SyncConflictResolution {
  if (options.local.snapshotChecksum === options.remoteChecksum) return 'keep_local'
  return 'create_revision'
}

export function buildRevisionRecord(
  local: NutritionCalculationSnapshotRecord,
  reason: string,
): NutritionCalculationSnapshotRecord {
  return {
    ...local,
    id: crypto.randomUUID(),
    parentCalculationId: local.id,
    revisionNumber: local.revisionNumber + 1,
    revisionReason: reason,
    syncState: 'local_only',
    createdAt: new Date().toISOString(),
    finalizedAt: new Date().toISOString(),
  }
}
