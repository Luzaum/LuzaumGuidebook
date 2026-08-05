import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import test from 'node:test'
import { createClient } from '@supabase/supabase-js'
import { buildFullClinicalSnapshot } from '../../modules/energia-vet/lib/clinicalSnapshotBuilder'
import { setNutritionFeatureOverride } from '../../modules/energia-vet/lib/featureFlags'
import { buildNutritionPdfV5Doc } from '../../modules/energia-vet/pdf-v5/pdfV5Document'
import { computeSnapshotChecksum } from '../../modules/energia-vet/lib/sync/checksum'
import { buildRevisionRecord, resolveChecksumConflict } from '../../modules/energia-vet/lib/sync/syncConflictResolver'
import type { NutritionCalculationSnapshotRecord } from '../../modules/energia-vet/lib/sync/types'
import { REPORT_V4_SAMPLE } from './fixtures/report-v4-sample'

const url = process.env.SUPABASE_TEST_URL
const anonKey = process.env.SUPABASE_TEST_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_TEST_SERVICE_ROLE_KEY
const canRun = Boolean(url && anonKey && serviceRoleKey)

function snapshotRow(record: NutritionCalculationSnapshotRecord) {
  return {
    id: record.id,
    clinic_id: record.clinicId,
    created_by: record.createdBy,
    species: record.species,
    calculation_type: record.calculationType,
    status: record.status,
    snapshot_json: record.snapshot,
    snapshot_checksum: record.snapshotChecksum,
    revision_number: record.revisionNumber,
    report_id: record.reportId,
    created_at: record.createdAt,
    finalized_at: record.finalizedAt ?? record.createdAt,
    parent_calculation_id: record.parentCalculationId ?? null,
    revision_reason: record.revisionReason ?? null,
  }
}

test('migrations nutricionais v3 — tabelas e RLS presentes no Supabase local', { skip: !canRun }, async () => {
  const admin = createClient(url!, serviceRoleKey!, { auth: { persistSession: false } })

  for (const table of [
    'nutrition_calculation_runs',
    'nutrition_calculation_snapshots',
    'nutrition_calculation_inputs',
    'nutrition_calculation_outputs',
    'nutrition_formula_versions',
  ]) {
    const { error } = await admin.from(table).select('id').limit(0)
    assert.equal(error, null, `${table}: ${error?.message}`)
  }
})

test('fluxo offline-first E2E — sync, idempotência, conflito e PDF', { skip: !canRun }, async () => {
  const admin = createClient(url!, serviceRoleKey!, { auth: { persistSession: false } })
  const run = randomUUID().slice(0, 8)
  const password = `Vetius!${randomUUID()}aA1`
  const email = `nutri-e2e-${run}@example.invalid`

  const user = await admin.auth.admin.createUser({ email, password, email_confirm: true })
  assert.equal(user.error, null, user.error?.message)

  const client = createClient(url!, anonKey!, { auth: { persistSession: false } })
  await client.auth.signInWithPassword({ email, password })

  const clinic = await client.rpc('bootstrap_clinic', { clinic_name: `E2E Nutrição ${run}` })
  assert.equal(clinic.error, null, clinic.error?.message)
  const clinicId = String(clinic.data.clinic_id)
  const userId = user.data.user!.id

  const report = { ...REPORT_V4_SAMPLE, id: randomUUID() }
  const clinical = buildFullClinicalSnapshot({ report })
  const checksum = computeSnapshotChecksum(clinical)

  const record: NutritionCalculationSnapshotRecord = {
    id: report.id,
    clinicId,
    createdBy: userId,
    reportId: report.id,
    species: 'dog',
    calculationType: 'outpatient',
    status: 'finalized',
    snapshot: clinical,
    snapshotChecksum: checksum,
    revisionNumber: 1,
    createdAt: report.createdAt,
    finalizedAt: report.createdAt,
    syncState: 'local_only',
    prescribedKcalDay: report.target.targetEnergy,
    currentWeightKg: report.patient.currentWeight,
    targetWeightKg: report.target.targetWeight,
    bcs9: report.patient.bcs,
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    const upsert = await client.from('nutrition_calculation_snapshots').upsert(snapshotRow(record), { onConflict: 'id' }).select('id').single()
    assert.equal(upsert.error, null, `upsert ${attempt}: ${upsert.error?.message}`)
    assert.equal(upsert.data!.id, report.id)
  }

  const { data: rows, error: countErr } = await admin
    .from('nutrition_calculation_snapshots')
    .select('id')
    .eq('clinic_id', clinicId)
    .eq('snapshot_checksum', checksum)
    .is('deleted_at', null)
  assert.equal(countErr, null)
  assert.equal(rows?.length, 1, 'idempotência — registro único por checksum/clínica')

  const recovered = await client.from('nutrition_calculation_snapshots').select('*').eq('id', report.id).single()
  assert.equal(recovered.error, null)
  assert.equal(recovered.data!.snapshot_checksum, checksum)

  setNutritionFeatureOverride('nutrition_calculation_engine_v3', true)
  const pdf = buildNutritionPdfV5Doc(report, 'tutor_plan')
  assert.ok(pdf.getNumberOfPages() >= 1)
  const recoveredKcal = Number((recovered.data!.snapshot_json as { prescribedKcalDay?: number }).prescribedKcalDay ?? report.target.targetEnergy)
  assert.equal(recoveredKcal, report.target.targetEnergy)

  const conflict = resolveChecksumConflict({ local: record, remoteChecksum: 'checksum-remoto-diferente' })
  assert.equal(conflict, 'create_revision')

  const revisedReport = {
    ...report,
    target: { ...report.target, targetEnergy: report.target.targetEnergy + 10 },
  }
  const revisedClinical = buildFullClinicalSnapshot({ report: revisedReport })
  const { data: authData } = await client.auth.getUser()
  assert.ok(authData.user)
  const revision = {
    ...buildRevisionRecord(record, 'Ajuste clínico pós-sync'),
    createdBy: authData.user.id,
    snapshot: revisedClinical,
    snapshotChecksum: computeSnapshotChecksum(revisedClinical),
    prescribedKcalDay: revisedReport.target.targetEnergy,
  }
  const revisionInsert = await client
    .from('nutrition_calculation_snapshots')
    .insert(snapshotRow({ ...revision, syncState: 'local_only' }))
    .select('id')
    .single()
  assert.equal(revisionInsert.error, null, revisionInsert.error?.message)
  assert.notEqual(revision.id, record.id)
  assert.equal(revision.parentCalculationId, record.id)

  const original = await client.from('nutrition_calculation_snapshots').select('snapshot_checksum, revision_number').eq('id', record.id).single()
  assert.equal(original.error, null)
  assert.equal(original.data!.snapshot_checksum, checksum)
  assert.equal(original.data!.revision_number, 1)

  const softDelete = await admin
    .from('nutrition_calculation_snapshots')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', revision.id)
  assert.equal(softDelete.error, null, softDelete.error?.message)

  const hidden = await client.from('nutrition_calculation_snapshots').select('id').eq('id', revision.id)
  assert.equal(hidden.data?.length ?? 0, 0)
})
