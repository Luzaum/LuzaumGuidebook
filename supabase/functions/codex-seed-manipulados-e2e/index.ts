import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: 'Missing service role env' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const admin = createClient(supabaseUrl, serviceRoleKey)
    const stamp = Date.now()
    const email = `codexmanipulados${stamp}@gmail.com`
    const password = 'Codex123456!'
    const clinicId = crypto.randomUUID()
    const tutorId = crypto.randomUUID()
    const patientId = crypto.randomUUID()
    const clinicName = `Clinica E2E ${stamp}`

    const { data: createdUser, error: createUserError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        source: 'codex-manipulados-e2e',
      },
    })

    if (createUserError || !createdUser.user) {
      throw createUserError || new Error('Failed to create user')
    }

    const userId = createdUser.user.id

    const { error: clinicError } = await admin.from('clinics').insert({
      id: clinicId,
      name: clinicName,
      created_by: userId,
    })
    if (clinicError) throw clinicError

    const { error: membershipError } = await admin.from('memberships').insert({
      user_id: userId,
      clinic_id: clinicId,
      role: 'owner',
    })
    if (membershipError) throw membershipError

    const { error: tutorError } = await admin.from('tutors').insert({
      id: tutorId,
      clinic_id: clinicId,
      created_by: userId,
      full_name: 'Tutor E2E Manipulados',
      cpf: '12345678909',
      street: 'Rua do Teste',
      number: '123',
      neighborhood: 'Centro',
      city: 'Sao Paulo',
      state: 'SP',
      zipcode: '01001000',
      phone: '11999999999',
      email,
    })
    if (tutorError) throw tutorError

    const { error: patientError } = await admin.from('patients').insert({
      id: patientId,
      clinic_id: clinicId,
      created_by: userId,
      tutor_id: tutorId,
      name: 'Paciente E2E',
      species: 'Canina',
      breed: 'SRD',
      sex: 'Macho',
      age_text: '6 anos',
      weight_kg: 8.5,
    })
    if (patientError) throw patientError

    return new Response(JSON.stringify({
      ok: true,
      email,
      password,
      userId,
      clinicId,
      clinicName,
      tutorId,
      patientId,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : JSON.stringify(error, Object.getOwnPropertyNames(error as object))
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
