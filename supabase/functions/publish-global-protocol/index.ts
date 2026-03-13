import { createClient } from 'npm:@supabase/supabase-js@2'

type PublishMode = 'new' | 'update'

type PublishRequestBody = {
  protocolId?: string
  mode?: PublishMode
  globalProtocolId?: string | null
  name?: string
  description?: string | null
  species?: string | null
  tags?: string[] | null
  slug?: string
}

type ProtocolRow = {
  id: string
  clinic_id: string
  owner_user_id: string
  name: string
  description: string | null
  species: string | null
  tags: string[] | null
  is_control_special: boolean
  exams_justification: string | null
}

type ProtocolMedicationRow = {
  sort_order: number | null
  medication_id: string | null
  presentation_id: string | null
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

type ProtocolRecommendationRow = {
  sort_order: number | null
  text: string
}

type ProtocolExamItemRow = {
  exam_key: string
  label: string
  is_custom: boolean
  created_at: string
}

type GlobalProtocolRow = {
  id: string
  slug: string
  metadata: Record<string, unknown> | null
  version: number
  sort_order: number
  status: string
  source_protocol_id?: string | null
  source_clinic_id?: string | null
}

type GlobalMedicationRow = {
  id: string
  slug: string
  name: string
}

type GlobalMedicationPresentationRow = {
  id: string
  global_medication_id: string
  slug: string
  pharmaceutical_form: string | null
  commercial_name: string | null
  concentration_text: string | null
  value: number | null
  value_unit: string | null
  per_value: number | null
  per_unit: string | null
}

type LocalMedicationRow = {
  id: string
  name: string
}

type LocalPresentationRow = {
  id: string
  pharmaceutical_form: string | null
  commercial_name: string | null
  concentration_text: string | null
  value: number | null
  value_unit: string | null
  per_value: number | null
  per_unit: string | null
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

function readOptionalText(value: unknown): string | null {
  const text = readText(value)
  return text || null
}

function readTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((entry) => readText(entry)).filter(Boolean)
    : []
}

function slugify(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseCsvEnv(value: string | undefined): string[] {
  return String(value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function isTruthyFlag(value: unknown): boolean {
  if (value === true) return true
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    return normalized === 'true' || normalized === '1' || normalized === 'yes'
  }
  return false
}

function readMetadataFlag(record: Record<string, unknown> | null | undefined, keys: string[]): boolean {
  for (const key of keys) {
    if (isTruthyFlag(record?.[key])) return true
  }
  return false
}

function isGlobalMedicationReference(value: string | null | undefined): boolean {
  return String(value || '').startsWith('global:')
}

function parseGlobalMedicationSlug(value: string | null | undefined): string {
  return String(value || '').replace(/^global:/, '').trim()
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) return String(value)
  return String(value).replace('.', ',')
}

function buildConcentrationLabel(input: {
  concentration_text?: string | null
  value?: number | null
  value_unit?: string | null
  per_value?: number | null
  per_unit?: string | null
}): string {
  const fallback = readText(input.concentration_text)
  const value = typeof input.value === 'number' ? input.value : null
  const valueUnit = readText(input.value_unit)
  const perValue = typeof input.per_value === 'number' ? input.per_value : null
  const perUnit = readText(input.per_unit)

  if (value !== null && value > 0 && valueUnit) {
    const left = `${formatNumber(value)} ${valueUnit}`
    if (perUnit) {
      const right = perValue !== null && perValue > 0 && perValue !== 1
        ? `${formatNumber(perValue)} ${perUnit}`
        : perUnit
      return `${left}/${right}`
    }
    return left
  }

  return fallback
}

function buildPresentationLabel(input: {
  pharmaceutical_form?: string | null
  commercial_name?: string | null
  concentration_text?: string | null
  value?: number | null
  value_unit?: string | null
  per_value?: number | null
  per_unit?: string | null
}): string | null {
  const form = readText(input.pharmaceutical_form)
  const commercialName = readText(input.commercial_name)
  const concentration = buildConcentrationLabel(input)
  const head = commercialName || form
  const parts = [head, concentration].filter(Boolean)
  return parts.length ? parts.join(' ') : null
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Método não suportado.' })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('VITE_SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Configuração Supabase incompleta para publish-global-protocol.')
    }

    const authHeader = request.headers.get('Authorization') || ''
    const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    })

    const accessToken = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (!accessToken) {
      return json(401, { error: 'Token de autenticação ausente.' })
    }

    const {
      data: { user },
      error: userError,
    } = await adminClient.auth.getUser(accessToken)

    if (userError || !user) {
      return json(401, { error: 'Usuário não autenticado.' })
    }

    const body = await request.json() as PublishRequestBody
    const protocolId = readText(body.protocolId)
    const publishMode: PublishMode = body.mode === 'update' ? 'update' : 'new'
    const globalProtocolId = readText(body.globalProtocolId)
    const name = readText(body.name)
    const description = readOptionalText(body.description)
    const species = readOptionalText(body.species)
    const tags = readTags(body.tags)
    const slug = slugify(readText(body.slug) || name)

    if (!protocolId) return json(400, { error: 'protocolId é obrigatório.' })
    if (!name) return json(400, { error: 'Nome global do protocolo é obrigatório.' })
    if (!slug) return json(400, { error: 'Slug global inválido.' })

    const { data: protocol, error: protocolError } = await adminClient
      .from('protocols')
      .select('*')
      .eq('id', protocolId)
      .single()

    if (protocolError || !protocol) {
      return json(404, { error: 'Protocolo local não encontrado.' })
    }

    const protocolRow = protocol as ProtocolRow

    const { data: membership } = await adminClient
      .from('memberships')
      .select('role')
      .eq('clinic_id', protocolRow.clinic_id)
      .eq('user_id', user.id)
      .maybeSingle()

    const userMetadata = (user.user_metadata || {}) as Record<string, unknown>
    const appMetadata = (user.app_metadata || {}) as Record<string, unknown>
    const allowlistedIds = parseCsvEnv(Deno.env.get('GLOBAL_PROTOCOL_PUBLISHER_IDS'))
    const allowlistedEmails = parseCsvEnv(Deno.env.get('GLOBAL_PROTOCOL_PUBLISHER_EMAILS')).map((entry) => entry.toLowerCase())
    const userEmail = readText(user.email).toLowerCase()

    const canPublish =
      membership?.role === 'owner' ||
      readMetadataFlag(userMetadata, ['is_admin', 'global_protocol_publisher', 'global_content_admin']) ||
      readMetadataFlag(appMetadata, ['is_admin', 'global_protocol_publisher', 'global_content_admin']) ||
      readText(appMetadata.role) === 'admin' ||
      allowlistedIds.includes(user.id) ||
      (!!userEmail && allowlistedEmails.includes(userEmail))

    if (!canPublish) {
      return json(403, { error: 'Sem permissão para publicar protocolo global.' })
    }

    const [medicationsResponse, recommendationsResponse, examsResponse] = await Promise.all([
      adminClient
        .from('protocol_medications')
        .select('*')
        .eq('clinic_id', protocolRow.clinic_id)
        .eq('protocol_id', protocolId)
        .order('sort_order', { ascending: true }),
      adminClient
        .from('protocol_recommendations')
        .select('*')
        .eq('clinic_id', protocolRow.clinic_id)
        .eq('protocol_id', protocolId)
        .order('sort_order', { ascending: true }),
      adminClient
        .from('protocol_exam_items')
        .select('*')
        .eq('clinic_id', protocolRow.clinic_id)
        .eq('protocol_id', protocolId)
        .order('created_at', { ascending: true }),
    ])

    if (medicationsResponse.error) throw medicationsResponse.error
    if (recommendationsResponse.error) throw recommendationsResponse.error
    if (examsResponse.error) throw examsResponse.error

    const protocolMedications = (medicationsResponse.data || []) as ProtocolMedicationRow[]
    const protocolRecommendations = (recommendationsResponse.data || []) as ProtocolRecommendationRow[]
    const protocolExamItems = (examsResponse.data || []) as ProtocolExamItemRow[]

    const localMedicationIds = protocolMedications
      .map((entry) => readText(entry.medication_id))
      .filter((entry) => entry && !isGlobalMedicationReference(entry))
    const localPresentationIds = protocolMedications
      .filter((entry) => !isGlobalMedicationReference(entry.medication_id))
      .map((entry) => readText(entry.presentation_id))
      .filter(Boolean)
    const globalMedicationSlugs = protocolMedications
      .map((entry) => parseGlobalMedicationSlug(entry.medication_id))
      .filter(Boolean)
    const globalPresentationIds = protocolMedications
      .filter((entry) => isGlobalMedicationReference(entry.medication_id))
      .map((entry) => readText(entry.presentation_id))
      .filter(Boolean)

    const [localMedicationsResponse, localPresentationsResponse, globalMedicationsResponse, globalPresentationsResponse] = await Promise.all([
      localMedicationIds.length
        ? adminClient
          .from('medications')
          .select('id,name')
          .in('id', localMedicationIds)
        : Promise.resolve({ data: [], error: null }),
      localPresentationIds.length
        ? adminClient
          .from('medication_presentations')
          .select('id,pharmaceutical_form,commercial_name,concentration_text,value,value_unit,per_value,per_unit')
          .in('id', localPresentationIds)
        : Promise.resolve({ data: [], error: null }),
      globalMedicationSlugs.length
        ? adminClient
          .from('global_medications')
          .select('id,slug,name')
          .in('slug', globalMedicationSlugs)
        : Promise.resolve({ data: [], error: null }),
      globalPresentationIds.length
        ? adminClient
          .from('global_medication_presentations')
          .select('id,global_medication_id,slug,pharmaceutical_form,commercial_name,concentration_text,value,value_unit,per_value,per_unit')
          .in('id', globalPresentationIds)
        : Promise.resolve({ data: [], error: null }),
    ])

    if (localMedicationsResponse.error) throw localMedicationsResponse.error
    if (localPresentationsResponse.error) throw localPresentationsResponse.error
    if (globalMedicationsResponse.error) throw globalMedicationsResponse.error
    if (globalPresentationsResponse.error) throw globalPresentationsResponse.error

    const localMedicationMap = new Map(
      ((localMedicationsResponse.data || []) as LocalMedicationRow[]).map((entry) => [entry.id, entry])
    )
    const localPresentationMap = new Map(
      ((localPresentationsResponse.data || []) as LocalPresentationRow[]).map((entry) => [entry.id, entry])
    )
    const globalMedicationMap = new Map(
      ((globalMedicationsResponse.data || []) as GlobalMedicationRow[]).map((entry) => [entry.slug, entry])
    )
    const globalPresentationMap = new Map(
      ((globalPresentationsResponse.data || []) as GlobalMedicationPresentationRow[]).map((entry) => [entry.id, entry])
    )

    let linkedGlobalProtocol: GlobalProtocolRow | null = null

    if (publishMode === 'update') {
      const requestedGlobalId = globalProtocolId || ''
      if (requestedGlobalId) {
        const { data, error } = await adminClient
          .from('global_protocols')
          .select('id,slug,metadata,version,sort_order,status,source_protocol_id,source_clinic_id')
          .eq('id', requestedGlobalId)
          .single()
        if (error || !data) {
          return json(404, { error: 'Protocolo global vinculado não encontrado para atualização.' })
        }
        linkedGlobalProtocol = data as GlobalProtocolRow
        if (linkedGlobalProtocol.source_protocol_id !== protocolId) {
          return json(409, { error: 'O protocolo global selecionado pertence a outra origem.' })
        }
        if (linkedGlobalProtocol.source_clinic_id !== protocolRow.clinic_id) {
          return json(409, { error: 'O protocolo global selecionado pertence a outra clínica de origem.' })
        }
      } else {
        const { data } = await adminClient
          .from('global_protocols')
          .select('id,slug,metadata,version,sort_order,status,source_protocol_id,source_clinic_id')
          .eq('source_protocol_id', protocolId)
          .eq('source_clinic_id', protocolRow.clinic_id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle()
        linkedGlobalProtocol = (data || null) as GlobalProtocolRow | null
      }

      if (!linkedGlobalProtocol) {
        return json(404, { error: 'Nenhum protocolo global vinculado foi encontrado para atualização.' })
      }
    }

    const { data: slugConflict } = await adminClient
      .from('global_protocols')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (slugConflict && (!linkedGlobalProtocol || slugConflict.id !== linkedGlobalProtocol.id)) {
      return json(409, { error: 'Já existe um protocolo global com este slug.' })
    }

    const globalProtocolPayload = {
      slug,
      name,
      description: description ?? protocolRow.description,
      species,
      tags,
      is_control_special: !!protocolRow.is_control_special,
      exams_justification: protocolRow.exams_justification || null,
      metadata: linkedGlobalProtocol?.metadata || {},
      sort_order: linkedGlobalProtocol?.sort_order ?? 0,
      is_active: true,
      source_protocol_id: protocolRow.id,
      source_clinic_id: protocolRow.clinic_id,
      published_by_user_id: user.id,
      version: linkedGlobalProtocol ? (linkedGlobalProtocol.version || 1) + 1 : 1,
      status: linkedGlobalProtocol?.status || 'published',
    }

    let savedGlobalProtocolId = linkedGlobalProtocol?.id || ''

    if (linkedGlobalProtocol) {
      const { error } = await adminClient
        .from('global_protocols')
        .update(globalProtocolPayload)
        .eq('id', linkedGlobalProtocol.id)
      if (error) throw error
      savedGlobalProtocolId = linkedGlobalProtocol.id
    } else {
      const { data, error } = await adminClient
        .from('global_protocols')
        .insert(globalProtocolPayload)
        .select('id')
        .single()
      if (error || !data) throw error || new Error('Falha ao criar protocolo global.')
      savedGlobalProtocolId = data.id as string
    }

    const globalMedicationRows = protocolMedications.map((entry, index) => {
      const medicationId = readText(entry.medication_id)
      const presentationId = readText(entry.presentation_id)
      const localMedication = localMedicationMap.get(medicationId)
      const localPresentation = localPresentationMap.get(presentationId)
      const globalMedication = isGlobalMedicationReference(medicationId)
        ? globalMedicationMap.get(parseGlobalMedicationSlug(medicationId))
        : null
      const globalPresentation = isGlobalMedicationReference(medicationId)
        ? globalPresentationMap.get(presentationId)
        : null

      return {
        global_protocol_id: savedGlobalProtocolId,
        sort_order: entry.sort_order ?? index,
        global_medication_id: globalMedication?.id || null,
        presentation_slug: globalPresentation?.slug || null,
        medication_id: globalMedication ? null : (medicationId || null),
        manual_medication_name:
          readOptionalText(entry.manual_medication_name) ||
          globalMedication?.name ||
          localMedication?.name ||
          null,
        manual_presentation_label:
          readOptionalText(entry.manual_presentation_label) ||
          buildPresentationLabel(globalPresentation || localPresentation || {}) ||
          null,
        concentration_value: entry.concentration_value ?? null,
        concentration_unit: readOptionalText(entry.concentration_unit),
        dose_value: entry.dose_value ?? null,
        dose_unit: readOptionalText(entry.dose_unit),
        route: readOptionalText(entry.route),
        duration_days: entry.duration_days ?? null,
        duration_mode: null,
        frequency_type: readOptionalText(entry.frequency_type),
        times_per_day: entry.times_per_day ?? null,
        interval_hours: entry.interval_hours ?? null,
        is_controlled: !!entry.is_controlled,
        metadata: {},
      }
    })

    const globalRecommendationRows = protocolRecommendations
      .filter((entry) => readText(entry.text))
      .map((entry, index) => ({
        global_protocol_id: savedGlobalProtocolId,
        sort_order: entry.sort_order ?? index,
        text: readText(entry.text),
        metadata: {},
      }))

    const globalExamRows = protocolExamItems.map((entry, index) => ({
      global_protocol_id: savedGlobalProtocolId,
      sort_order: index,
      exam_key: readText(entry.exam_key),
      label: readText(entry.label),
      is_custom: !!entry.is_custom,
      metadata: {},
    }))

    const deleteChildrenTasks = [
      adminClient.from('global_protocol_medications').delete().eq('global_protocol_id', savedGlobalProtocolId),
      adminClient.from('global_protocol_recommendations').delete().eq('global_protocol_id', savedGlobalProtocolId),
      adminClient.from('global_protocol_exam_items').delete().eq('global_protocol_id', savedGlobalProtocolId),
    ]

    const [deleteMedications, deleteRecommendations, deleteExams] = await Promise.all(deleteChildrenTasks)
    if (deleteMedications.error) throw deleteMedications.error
    if (deleteRecommendations.error) throw deleteRecommendations.error
    if (deleteExams.error) throw deleteExams.error

    if (globalMedicationRows.length) {
      const { error } = await adminClient.from('global_protocol_medications').insert(globalMedicationRows)
      if (error) throw error
    }
    if (globalRecommendationRows.length) {
      const { error } = await adminClient.from('global_protocol_recommendations').insert(globalRecommendationRows)
      if (error) throw error
    }
    if (globalExamRows.length) {
      const { error } = await adminClient.from('global_protocol_exam_items').insert(globalExamRows)
      if (error) throw error
    }

    return json(200, {
      ok: true,
      globalProtocolId: savedGlobalProtocolId,
      slug,
      version: globalProtocolPayload.version,
      mode: publishMode,
    })
  } catch (error) {
    console.error('[publish-global-protocol] fail', error)
    const message = error instanceof Error ? error.message : 'Falha ao publicar protocolo global.'
    return json(500, { error: message })
  }
})
