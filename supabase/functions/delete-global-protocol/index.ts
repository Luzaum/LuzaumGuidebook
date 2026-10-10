import { createClient } from 'npm:@supabase/supabase-js@2'
import { canDeleteGlobalProtocol } from '../_shared/globalProtocolAuthorization.ts'

type DeleteRequestBody = {
  globalProtocolId?: string
  clinicId?: string
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

function parseCsvEnv(value: string | undefined): string[] {
  return String(value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Metodo nao suportado.' })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('VITE_SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Configuracao Supabase incompleta para delete-global-protocol.')
    }

    const authHeader = request.headers.get('Authorization') || ''
    const accessToken = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (!accessToken) {
      return json(401, { error: 'Token de autenticacao ausente.' })
    }

    const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    })

    const {
      data: { user },
      error: userError,
    } = await adminClient.auth.getUser(accessToken)

    if (userError || !user) {
      return json(401, { error: 'Usuario nao autenticado.' })
    }

    const body = await request.json() as DeleteRequestBody
    const globalProtocolId = readText(body.globalProtocolId)
    if (!globalProtocolId) {
      return json(400, { error: 'globalProtocolId e obrigatorio.' })
    }

    const { data: globalProtocol, error: protocolError } = await adminClient
      .from('global_protocols')
      .select('id,published_by_user_id,source_clinic_id')
      .eq('id', globalProtocolId)
      .single()

    if (protocolError || !globalProtocol) {
      return json(404, { error: 'Protocolo global nao encontrado.' })
    }

    let membershipRole = ''
    const sourceClinicId = readText(globalProtocol.source_clinic_id)
    if (sourceClinicId) {
      const { data: membership } = await adminClient
        .from('memberships')
        .select('role')
        .eq('clinic_id', sourceClinicId)
        .eq('user_id', user.id)
        .maybeSingle()

      membershipRole = readText(membership?.role)
    }

    const allowlistedIds = parseCsvEnv(Deno.env.get('GLOBAL_PROTOCOL_PUBLISHER_IDS'))
    const allowlistedEmails = parseCsvEnv(Deno.env.get('GLOBAL_PROTOCOL_PUBLISHER_EMAILS')).map((entry) => entry.toLowerCase())

    const canDelete = canDeleteGlobalProtocol({
      user,
      sourceClinicRole: membershipRole,
      publishedByUserId: readText(globalProtocol.published_by_user_id),
      allowedIds: allowlistedIds,
      allowedEmails: allowlistedEmails,
    })

    if (!canDelete) {
      return json(403, {
        error: 'Sem permissao para excluir protocolo global.',
      })
    }

    const { error: deleteError } = await adminClient
      .from('global_protocols')
      .delete()
      .eq('id', globalProtocolId)

    if (deleteError) throw deleteError

    return json(200, {
      ok: true,
      globalProtocolId,
    })
  } catch (error) {
    console.error('[delete-global-protocol] unexpected error', error)
    const message = error instanceof Error ? error.message : String(error)
    return json(500, { error: `Nao foi possivel excluir o protocolo global. Motivo: ${message}` })
  }
})
