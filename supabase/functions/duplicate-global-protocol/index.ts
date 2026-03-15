import { createClient } from 'npm:@supabase/supabase-js@2'

type DuplicateRequestBody = {
  clinicId?: string
  globalProtocolId?: string
}

type MembershipRow = {
  role: string
}

type GlobalProtocolRow = {
  id: string
  slug: string
  name: string
  description: string | null
  species: string | null
  tags: string[] | null
  is_control_special: boolean
  exams_justification: string | null
  metadata: Record<string, unknown> | null
}

type GlobalProtocolMedicationRow = {
  sort_order: number | null
  manual_medication_name: string | null
  manual_presentation_label: string | null
  concentration_value: number | null
  concentration_unit: string | null
  dose_value: number | null
  dose_unit: string | null
  route: string | null
  duration_days: number | null
  frequency_type: string | null
  times_per_day: number | null
  interval_hours: number | null
  is_controlled: boolean
}

type GlobalProtocolRecommendationRow = {
  sort_order: number | null
  text: string
}

type GlobalProtocolExamItemRow = {
  sort_order: number | null
  exam_key: string
  label: string
  is_custom: boolean
}

type LocalProtocolRow = {
  id: string
  clinic_id: string
  owner_user_id: string
  name: string
  description: string | null
  species: string | null
  tags: string[] | null
  is_control_special: boolean
  exams_justification: string | null
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

function readText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'MÃ©todo nÃ£o suportado.' })
  }

  let createdProtocolId: string | null = null

  try {
    console.log('[duplicate-global-protocol] INICIANDO DUPLICACAO')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('[duplicate-global-protocol] Faltam secrets: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY')
      throw new Error('Configuração Supabase incompleta para duplicate-global-protocol. Verifique secrets de produção.')
    }

    const authHeader = request.headers.get('Authorization') || ''
    const accessToken = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (!accessToken) {
      console.warn('[duplicate-global-protocol] Token ausente')
      return json(401, { error: 'Token de autenticação ausente.' })
    }

    const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    })

    const {
      data: { user },
      error: userError,
    } = await adminClient.auth.getUser(accessToken)

    if (userError || !user) {
      console.error('[duplicate-global-protocol] Falha Auth User:', userError)
      return json(401, { error: 'Usuário não autenticado.' })
    }

    const body = await request.json() as DuplicateRequestBody
    const clinicId = readText(body.clinicId)
    const globalProtocolId = readText(body.globalProtocolId)

    console.log(`[duplicate-global-protocol] Recebido - clinicId: ${clinicId}, globalProtocolId: ${globalProtocolId}, userId: ${user.id}`)

    if (!clinicId) {
      return json(400, { error: 'clinicId é obrigatório.' })
    }
    if (!globalProtocolId) {
      return json(400, { error: 'globalProtocolId é obrigatório.' })
    }

    const { data: membership, error: membershipError } = await adminClient
      .from('memberships')
      .select('role')
      .eq('clinic_id', clinicId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (membershipError) {
      throw membershipError
    }

    if (!membership) {
      return json(403, { error: 'Sem permissÃ£o para duplicar protocolos para esta clÃ­nica.' })
    }

    const { data: globalProtocol, error: protocolError } = await adminClient
      .from('global_protocols')
      .select('*')
      .eq('id', globalProtocolId)
      .eq('is_active', true)
      .single()

    if (protocolError || !globalProtocol) {
      return json(404, { error: 'Protocolo global nÃ£o encontrado.' })
    }

    const [medicationsResponse, recommendationsResponse, examsResponse] = await Promise.all([
      adminClient
        .from('global_protocol_medications')
        .select('*')
        .eq('global_protocol_id', globalProtocolId)
        .order('sort_order', { ascending: true }),
      adminClient
        .from('global_protocol_recommendations')
        .select('*')
        .eq('global_protocol_id', globalProtocolId)
        .order('sort_order', { ascending: true }),
      adminClient
        .from('global_protocol_exam_items')
        .select('*')
        .eq('global_protocol_id', globalProtocolId)
        .order('sort_order', { ascending: true }),
    ])

    if (medicationsResponse.error) throw medicationsResponse.error
    if (recommendationsResponse.error) throw recommendationsResponse.error
    if (examsResponse.error) throw examsResponse.error

    const bundleProtocol = globalProtocol as GlobalProtocolRow
    const medications = (medicationsResponse.data || []) as GlobalProtocolMedicationRow[]
    const recommendations = (recommendationsResponse.data || []) as GlobalProtocolRecommendationRow[]
    const examItems = (examsResponse.data || []) as GlobalProtocolExamItemRow[]

    const { data: createdProtocol, error: createProtocolError } = await adminClient
      .from('protocols')
      .insert({
        clinic_id: clinicId,
        owner_user_id: user.id,
        folder_id: null,
        name: `${bundleProtocol.name} (cÃ³pia)`,
        description: bundleProtocol.description ?? null,
        species: bundleProtocol.species ?? null,
        duration_summary: null,
        tags: bundleProtocol.tags ?? null,
        is_control_special: !!bundleProtocol.is_control_special,
        exams_justification: bundleProtocol.exams_justification ?? null,
        metadata: {
          ...(bundleProtocol.metadata || {}),
          source_global_protocol_id: bundleProtocol.id,
          source_global_protocol_slug: bundleProtocol.slug,
          source_type: 'global_protocol',
        },
      })
      .select('*')
      .single()

    if (createProtocolError || !createdProtocol) {
      throw createProtocolError || new Error('Falha ao criar protocolo local.')
    }

    createdProtocolId = createdProtocol.id

    const medicationPayload = medications.map((item, index) => ({
      clinic_id: clinicId,
      protocol_id: createdProtocolId,
      sort_order: item.sort_order ?? index,
      medication_id: null,
      presentation_id: null,
      manual_medication_name: readText(item.manual_medication_name) || 'Medicamento',
      manual_presentation_label: readText(item.manual_presentation_label) || null,
      concentration_value: item.concentration_value ?? null,
      concentration_unit: readText(item.concentration_unit) || null,
      dose_value: item.dose_value ?? null,
      dose_unit: readText(item.dose_unit) || null,
      route: readText(item.route) || null,
      duration_days: item.duration_days ?? null,
      frequency_type: readText(item.frequency_type) || null,
      times_per_day: item.times_per_day ?? null,
      interval_hours: item.interval_hours ?? null,
      is_controlled: !!item.is_controlled,
    }))

    if (medicationPayload.length > 0) {
      const { error: medicationInsertError } = await adminClient
        .from('protocol_medications')
        .insert(medicationPayload)
      if (medicationInsertError) throw medicationInsertError
    }

    const recommendationPayload = recommendations
      .filter((item) => readText(item.text))
      .map((item, index) => ({
        clinic_id: clinicId,
        protocol_id: createdProtocolId,
        text: readText(item.text),
        sort_order: item.sort_order ?? index,
      }))

    if (recommendationPayload.length > 0) {
      const { error: recommendationInsertError } = await adminClient
        .from('protocol_recommendations')
        .insert(recommendationPayload)
      if (recommendationInsertError) throw recommendationInsertError
    }

    const examPayload = examItems
      .filter((item) => readText(item.label))
      .map((item) => ({
        clinic_id: clinicId,
        protocol_id: createdProtocolId,
        exam_key: readText(item.exam_key) || 'custom',
        label: readText(item.label),
        is_custom: !!item.is_custom,
      }))

    if (examPayload.length > 0) {
      const { error: examInsertError } = await adminClient
        .from('protocol_exam_items')
        .insert(examPayload)
      if (examInsertError) {
        console.error('[duplicate-global-protocol] Erro Inserindo Extras/Exames:', examInsertError)
        throw examInsertError
      }
    }

    const finalResult = {
      ok: true,
      protocolId: createdProtocolId,
      name: (createdProtocol as LocalProtocolRow).name,
      medicationsCount: medicationPayload.length,
      recommendationsCount: recommendationPayload.length,
      examItemsCount: examPayload.length,
      duplicatedByUserId: user.id,
      membershipRole: (membership as MembershipRow).role,
    }

    console.log('[duplicate-global-protocol] SUCESSO:', finalResult)

    return json(200, finalResult)
  } catch (error) {
    if (createdProtocolId) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('VITE_SUPABASE_URL')
        const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
        if (supabaseUrl && supabaseServiceRoleKey) {
          const cleanupClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: { persistSession: false },
          })
          await cleanupClient.from('protocols').delete().eq('id', createdProtocolId)
        }
      } catch (cleanupError) {
        console.error('[duplicate-global-protocol] cleanup error', cleanupError)
      }
    }

    console.error('[duplicate-global-protocol] unexpected error', error)
    const message = error instanceof Error ? error.message : String(error)
    return json(500, {
      error: `NÃ£o foi possÃ­vel duplicar o protocolo completo. Nenhuma cÃ³pia vÃ¡lida foi mantida. Motivo: ${message}`,
    })
  }
})
