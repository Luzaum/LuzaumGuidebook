import assert from 'node:assert/strict'
import { beforeEach } from 'node:test'
import test from 'node:test'
import { buildFullClinicalSnapshot } from '../../modules/energia-vet/lib/clinicalSnapshotBuilder'
import { computeSnapshotChecksum } from '../../modules/energia-vet/lib/sync/checksum'
import { saveLocalClinicalSnapshot, getLocalSnapshotByReportId } from '../../modules/energia-vet/lib/sync/localNutritionCalculationRepository'
import { resolveChecksumConflict, buildRevisionRecord } from '../../modules/energia-vet/lib/sync/syncConflictResolver'
import { enqueueSyncItem, readSyncQueue, dequeueSyncItem } from '../../modules/energia-vet/lib/sync/syncQueue'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

const memoryStore = new Map<string, string>()

beforeEach(() => {
  memoryStore.clear()
  ;(globalThis as { window?: Window }).window = {
    localStorage: {
      getItem: (key: string) => memoryStore.get(key) ?? null,
      setItem: (key: string, value: string) => memoryStore.set(key, value),
      removeItem: (key: string) => memoryStore.delete(key),
      clear: () => memoryStore.clear(),
      key: () => null,
      length: memoryStore.size,
    },
  } as unknown as Window
})

test('fluxo offline — salvamento local sem bloquear', () => {
  const clinical = buildFullClinicalSnapshot({
    report: {
      ...REPORT_V4_SAMPLE,
      diet: {
        ...REPORT_V4_SAMPLE.diet,
        hydrationPlan: { selectedMethod: 'energy_based' },
      },
    },
  })
  const record = saveLocalClinicalSnapshot({
    report: { ...REPORT_V4_SAMPLE, id: 'offline-test-1' },
    clinicalRecord: clinical,
    clinicId: '00000000-0000-4000-8000-000000000001',
    userId: '00000000-0000-4000-8000-000000000002',
    syncState: 'local_only',
  })
  assert.equal(record.syncState, 'local_only')
  const loaded = getLocalSnapshotByReportId('offline-test-1')
  assert.ok(loaded)
  assert.equal(loaded!.snapshotChecksum, computeSnapshotChecksum(clinical))
})

test('idempotência — mesmo checksum sugere manter local', () => {
  const clinical = buildFullClinicalSnapshot({ report: REPORT_V4_SAMPLE })
  const checksum = computeSnapshotChecksum(clinical)
  const resolution = resolveChecksumConflict({
    local: {
      id: REPORT_V4_SAMPLE.id,
      clinicId: 'clinic',
      createdBy: 'user',
      reportId: REPORT_V4_SAMPLE.id,
      species: 'dog',
      calculationType: 'outpatient',
      status: 'finalized',
      snapshot: clinical,
      snapshotChecksum: checksum,
      revisionNumber: 1,
      createdAt: REPORT_V4_SAMPLE.createdAt,
      syncState: 'local_only',
    },
    remoteChecksum: checksum,
  })
  assert.equal(resolution, 'keep_local')
})

test('conflito — checksum diferente exige revisão', () => {
  const clinical = buildFullClinicalSnapshot({ report: REPORT_V4_SAMPLE })
  const local = {
    id: REPORT_V4_SAMPLE.id,
    clinicId: 'clinic',
    createdBy: 'user',
    reportId: REPORT_V4_SAMPLE.id,
    species: 'dog' as const,
    calculationType: 'outpatient' as const,
    status: 'finalized' as const,
    snapshot: clinical,
    snapshotChecksum: computeSnapshotChecksum(clinical),
    revisionNumber: 1,
    createdAt: REPORT_V4_SAMPLE.createdAt,
    syncState: 'local_only' as const,
  }
  assert.equal(resolveChecksumConflict({ local, remoteChecksum: 'outro' }), 'create_revision')
  const revision = buildRevisionRecord(local, 'Ajuste clínico')
  assert.notEqual(revision.id, local.id)
  assert.equal(revision.parentCalculationId, local.id)
})

test('fila offline — enfileira sem exigir conexão remota', () => {
  const clinical = buildFullClinicalSnapshot({ report: REPORT_V4_SAMPLE })
  enqueueSyncItem({
    localId: 'queue-offline-1',
    report: { ...REPORT_V4_SAMPLE, id: 'queue-offline-1' },
    clinicalRecord: clinical,
    enqueuedAt: new Date().toISOString(),
    attempts: 0,
  })
  const queue = readSyncQueue()
  assert.ok(queue.some((item) => item.localId === 'queue-offline-1'))
  dequeueSyncItem('queue-offline-1')
  assert.ok(!readSyncQueue().some((item) => item.localId === 'queue-offline-1'))
})

test('PDF após recuperação — snapshot clínico idêntico', () => {
  const report = {
    ...REPORT_V4_SAMPLE,
    diet: {
      ...REPORT_V4_SAMPLE.diet,
      dietTransition: { enabled: true, previousKcalPerGram: 3.5, durationDays: 7 },
      hydrationPlan: { selectedMethod: 'species_based' as const },
    },
  }
  const original = buildFullClinicalSnapshot({ report })
  const recovered = buildFullClinicalSnapshot({ report })
  assert.equal(computeSnapshotChecksum(original), computeSnapshotChecksum(recovered))
  assert.ok(original.transitionPlan?.rows.length)
  assert.ok(original.hydrationPlan)
})
