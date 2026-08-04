import { getStoredClinicId } from '../../../../src/lib/clinic'
import { supabase } from '../../../../src/lib/supabaseClient'
import type { NutritionClinicalRecord, StoredCalculationReport } from '../../types'
import { computeSnapshotChecksum } from './checksum'
import {
  getLocalSnapshotByReportId,
  saveLocalClinicalSnapshot,
  updateLocalSyncState,
} from './localNutritionCalculationRepository'
import { findSnapshotByChecksum, upsertSnapshotToSupabase } from './supabaseNutritionCalculationRepository'
import { buildRevisionRecord, resolveChecksumConflict } from './syncConflictResolver'
import { dequeueSyncItem, enqueueSyncItem, markSyncAttempt, readSyncQueue } from './syncQueue'
import type { SyncResult } from './types'

async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser()
  return data.user?.id ?? null
}

export function queueReportForSync(report: StoredCalculationReport, clinicalRecord: NutritionClinicalRecord) {
  enqueueSyncItem({
    localId: report.id,
    report,
    clinicalRecord,
    enqueuedAt: new Date().toISOString(),
    attempts: 0,
  })
  updateLocalSyncState(report.id, 'queued')
}

export async function syncClinicalSnapshot(options: {
  report: StoredCalculationReport
  clinicalRecord: NutritionClinicalRecord
}): Promise<SyncResult> {
  const clinicId = String(getStoredClinicId() || '').trim()
  const userId = await getCurrentUserId()
  if (!clinicId || !userId) {
    queueReportForSync(options.report, options.clinicalRecord)
    return { ok: false, state: 'local_only', error: 'Clínica ou usuário não disponível.' }
  }

  const localRecord = saveLocalClinicalSnapshot({
    report: options.report,
    clinicalRecord: options.clinicalRecord,
    clinicId,
    userId,
    syncState: 'syncing',
  })

  try {
    const checksum = computeSnapshotChecksum(options.clinicalRecord)
    const existing = await findSnapshotByChecksum(clinicId, checksum)
    if (existing && existing.id !== localRecord.id) {
      updateLocalSyncState(options.report.id, 'synced')
      dequeueSyncItem(options.report.id)
      return { ok: true, state: 'synced', remoteId: existing.id }
    }

    const remote = await upsertSnapshotToSupabase(localRecord)
    updateLocalSyncState(options.report.id, 'synced')
    dequeueSyncItem(options.report.id)
    return { ok: true, state: 'synced', remoteId: remote.id }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha ao salvar online.'
    updateLocalSyncState(options.report.id, 'failed', message)
    queueReportForSync(options.report, options.clinicalRecord)
    return { ok: false, state: 'failed', error: message }
  }
}

export async function flushSyncQueue(): Promise<SyncResult[]> {
  const queue = readSyncQueue()
  const results: SyncResult[] = []
  for (const item of queue) {
    markSyncAttempt(item.localId)
    results.push(await syncClinicalSnapshot({ report: item.report, clinicalRecord: item.clinicalRecord }))
  }
  return results
}

export function getSyncStatusLabel(state: string): string {
  if (state === 'synced') return 'Salvo com segurança'
  if (state === 'failed') return 'Não foi possível salvar online'
  if (state === 'conflict') return 'Revisão necessária'
  if (state === 'queued') return 'Tentaremos novamente'
  return 'Salvo neste dispositivo'
}

export function detectLocalConflict(reportId: string, clinicalRecord: NutritionClinicalRecord) {
  const local = getLocalSnapshotByReportId(reportId)
  if (!local) return null
  const checksum = computeSnapshotChecksum(clinicalRecord)
  if (local.snapshotChecksum === checksum) return null
  return resolveChecksumConflict({ local, remoteChecksum: checksum })
}

export function createConflictRevision(reportId: string, reason: string) {
  const local = getLocalSnapshotByReportId(reportId)
  if (!local) return null
  return buildRevisionRecord(local, reason)
}
