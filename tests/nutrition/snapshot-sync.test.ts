import assert from 'node:assert/strict'
import test from 'node:test'
import { computeSnapshotChecksum } from '../../modules/energia-vet/lib/sync/checksum'
import { toCanonicalSnapshotJson } from '../../modules/energia-vet/lib/sync/canonicalSnapshot'
import { buildRevisionRecord, resolveChecksumConflict } from '../../modules/energia-vet/lib/sync/syncConflictResolver'
import type { NutritionCalculationSnapshotRecord } from '../../modules/energia-vet/lib/sync/types'
import { buildFullClinicalSnapshot } from '../../modules/energia-vet/lib/clinicalSnapshotBuilder'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

function sampleRecord(): NutritionCalculationSnapshotRecord {
  const clinical = buildFullClinicalSnapshot({ report: REPORT_V4_SAMPLE })
  const checksum = computeSnapshotChecksum(clinical)
  return {
    id: REPORT_V4_SAMPLE.id,
    clinicId: '00000000-0000-4000-8000-000000000099',
    createdBy: '00000000-0000-4000-8000-000000000098',
    reportId: REPORT_V4_SAMPLE.id,
    species: 'dog',
    calculationType: 'outpatient',
    status: 'finalized',
    snapshot: clinical,
    snapshotChecksum: checksum,
    revisionNumber: 1,
    createdAt: REPORT_V4_SAMPLE.createdAt,
    syncState: 'local_only',
  }
}

test('checksum idempotente para mesmo conteúdo', () => {
  const record = sampleRecord()
  const again = computeSnapshotChecksum(record.snapshot)
  assert.equal(record.snapshotChecksum, again)
})

test('JSON canônico ordena chaves de forma estável', () => {
  const record = sampleRecord()
  const json = toCanonicalSnapshotJson(record.snapshot)
  assert.ok(json.indexOf('"bodyComposition"') < json.indexOf('"createdAt"'))
})

test('conflito de checksum sugere revisão', () => {
  const local = sampleRecord()
  const resolution = resolveChecksumConflict({ local, remoteChecksum: 'outro-checksum' })
  assert.equal(resolution, 'create_revision')
})

test('checksum igual mantém registro local', () => {
  const local = sampleRecord()
  const resolution = resolveChecksumConflict({ local, remoteChecksum: local.snapshotChecksum })
  assert.equal(resolution, 'keep_local')
})

test('revisão cria novo id e incrementa número', () => {
  const local = sampleRecord()
  const revision = buildRevisionRecord(local, 'Correção clínica')
  assert.notEqual(revision.id, local.id)
  assert.equal(revision.revisionNumber, local.revisionNumber + 1)
  assert.equal(revision.parentCalculationId, local.id)
})
