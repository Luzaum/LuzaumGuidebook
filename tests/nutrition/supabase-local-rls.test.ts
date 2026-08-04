import assert from 'node:assert/strict'
import test from 'node:test'

const url = process.env.SUPABASE_TEST_URL
const anonKey = process.env.SUPABASE_TEST_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_TEST_SERVICE_ROLE_KEY
const canRun = Boolean(url && anonKey && serviceRoleKey)

test('RLS nutrition_calculation_runs — skip se Supabase local indisponível', { skip: !canRun }, async () => {
  const { createClient } = await import('@supabase/supabase-js')
  const { randomUUID } = await import('node:crypto')

  const admin = createClient(url!, serviceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const run = randomUUID().slice(0, 8)
  const password = `Vetius!${randomUUID()}aA1`
  const emailA = `nutri-a-${run}@example.invalid`
  const emailB = `nutri-b-${run}@example.invalid`
  const emailC = `nutri-c-${run}@example.invalid`

  const userA = await admin.auth.admin.createUser({ email: emailA, password, email_confirm: true })
  const userB = await admin.auth.admin.createUser({ email: emailB, password, email_confirm: true })
  const userC = await admin.auth.admin.createUser({ email: emailC, password, email_confirm: true })
  assert.equal(userA.error, null)
  assert.equal(userB.error, null)
  assert.equal(userC.error, null)

  const clientA = createClient(url!, anonKey!, { auth: { persistSession: false } })
  const clientB = createClient(url!, anonKey!, { auth: { persistSession: false } })
  const clientC = createClient(url!, anonKey!, { auth: { persistSession: false } })

  await clientA.auth.signInWithPassword({ email: emailA, password })
  await clientB.auth.signInWithPassword({ email: emailB, password })
  await clientC.auth.signInWithPassword({ email: emailC, password })

  const clinicA = await clientA.rpc('bootstrap_clinic', { clinic_name: `Clínica A ${run}` })
  const clinicB = await clientB.rpc('bootstrap_clinic', { clinic_name: `Clínica B ${run}` })
  assert.equal(clinicA.error, null)
  assert.equal(clinicB.error, null)

  const clinicAId = String(clinicA.data.clinic_id)
  const clinicBId = String(clinicB.data.clinic_id)

  const insertA = await clientA.from('nutrition_calculation_runs').insert({
    clinic_id: clinicAId,
    user_id: userA.data.user!.id,
    patient_label: 'Paciente teste',
    calculation_engine_version: 'v3',
    formula_key: 'test',
    inputs: {},
    raw_result: {},
    rounded_result: {},
  }).select().single()

  assert.equal(insertA.error, null, insertA.error?.message)
  const runId = insertA.data!.id

  const readA = await clientA.from('nutrition_calculation_runs').select('id').eq('id', runId)
  assert.equal(readA.error, null)
  assert.equal(readA.data?.length, 1)

  const readB = await clientB.from('nutrition_calculation_runs').select('id').eq('id', runId)
  assert.ok(readB.error || !readB.data?.length)

  const readC = await clientC.from('nutrition_calculation_runs').select('id').eq('id', runId)
  assert.ok(readC.error || !readC.data?.length)

  const badInsert = await clientA.from('nutrition_calculation_runs').insert({
    clinic_id: clinicAId,
    user_id: userB.data.user!.id,
    patient_label: 'Spoof',
    calculation_engine_version: 'v3',
    formula_key: 'test',
    inputs: {},
    raw_result: {},
    rounded_result: {},
  })
  assert.ok(badInsert.error)

  const deleteAttempt = await clientA.from('nutrition_calculation_runs').delete().eq('id', runId)
  assert.ok(deleteAttempt.error || deleteAttempt.count === 0)

  const formulaWrite = await clientA.from('nutrition_formula_versions').insert({
    id: `hack-${run}`,
    label: 'Hack',
    source_reference: 'test',
  })
  assert.ok(formulaWrite.error)
})
