import { supabase } from '../supabaseClient'
import { logSbError } from '../clinicScopedDb'

export type ProtocolFolderRecord = {
  id: string
  clinic_id: string
  owner_user_id: string
  name: string
  icon_key: string | null
  sort_order: number
  created_at: string
}

export type ProtocolRecord = {
  id: string
  clinic_id: string
  owner_user_id: string
  folder_id: string | null
  name: string
  description: string | null
  target_species: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ProtocolMedicationItem = {
  id?: string

  medication_id: string | null
  medication_name: string
  presentation_id: string | null
  presentation_text: string

  manual_medication_name: string | null
  manual_presentation_text: string | null

  concentration_text?: string | null
  value?: number | null
  value_unit?: string | null
  per_value?: number | null
  per_unit?: string | null

  route: string | null
  frequency_type: 'times_per_day' | 'interval_hours' | 'once_daily' | 'as_needed'
  times_per_day: number | null
  interval_hours: number | null
  duration_days: number | null
  instructions: string | null
  sort_order: number
}

export type ProtocolRecommendation = {
  id?: string
  recommendation_text: string
  sort_order: number
}

export type ProtocolExamItem = {
  id?: string
  exam_key: string
  exam_label: string
  is_custom: boolean
  justification: string | null
}

export type ProtocolBundle = {
  protocol: ProtocolRecord
  medications: ProtocolMedicationItem[]
  recommendations: ProtocolRecommendation[]
  exam_items: ProtocolExamItem[]
}

export async function listFolders(clinicId: string, userId: string): Promise<ProtocolFolderRecord[]> {
  const { data, error } = await supabase
    .from('protocol_folders')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  logSbError('[ProtocolsRepo] listFolders error', error)
  if (error) throw error
  return (data ?? []) as ProtocolFolderRecord[]
}

export async function createFolder(
  clinicId: string,
  userId: string,
  data: { name: string; icon_key?: string | null; sort_order?: number }
): Promise<ProtocolFolderRecord> {
  const name = String(data.name || '').trim()
  if (!name) {
    throw new Error('Nome da pasta e obrigatorio.')
  }

  const { data: created, error } = await supabase
    .from('protocol_folders')
    .insert({
      clinic_id: clinicId,
      owner_user_id: userId,
      name,
      icon_key: data.icon_key ?? null,
      sort_order: typeof data.sort_order === 'number' ? data.sort_order : 0,
    })
    .select('*')
    .single()

  logSbError('[ProtocolsRepo] createFolder error', error)
  if (error) throw error
  return created as ProtocolFolderRecord
}

export async function listProtocols(
  clinicId: string,
  userId: string,
  folderId?: string | null,
  search?: string
): Promise<ProtocolRecord[]> {
  let query = supabase
    .from('protocols')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)

  if (folderId === null) {
    query = query.is('folder_id', null)
  } else if (typeof folderId === 'string' && folderId.trim()) {
    query = query.eq('folder_id', folderId.trim())
  }

  const needle = String(search || '').trim()
  if (needle) {
    query = query.ilike('name', `%${needle}%`)
  }

  const { data, error } = await query.order('name', { ascending: true })
  logSbError('[ProtocolsRepo] listProtocols error', error)
  if (error) throw error
  return (data ?? []) as ProtocolRecord[]
}

export async function loadProtocolBundle(
  clinicId: string,
  userId: string,
  protocolId: string
): Promise<ProtocolBundle | null> {
  const { data: protocol, error: protocolError } = await supabase
    .from('protocols')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', protocolId)
    .single()

  if (protocolError || !protocol) {
    logSbError('[ProtocolsRepo] loadProtocolBundle parent error', protocolError)
    return null
  }

  const { data: medications, error: medError } = await supabase
    .from('protocol_medications')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('protocol_id', protocolId)
    .order('sort_order', { ascending: true })

  const { data: recommendations, error: recError } = await supabase
    .from('protocol_recommendations')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('protocol_id', protocolId)
    .order('sort_order', { ascending: true })

  const { data: examItems, error: examError } = await supabase
    .from('protocol_exam_items')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('protocol_id', protocolId)

  if (medError) logSbError('[ProtocolsRepo] loadProtocolBundle medications error', medError)
  if (recError) logSbError('[ProtocolsRepo] loadProtocolBundle recommendations error', recError)
  if (examError) logSbError('[ProtocolsRepo] loadProtocolBundle exam_items error', examError)

  return {
    protocol: protocol as ProtocolRecord,
    medications: (medications ?? []) as ProtocolMedicationItem[],
    recommendations: (recommendations ?? []) as ProtocolRecommendation[],
    exam_items: (examItems ?? []) as ProtocolExamItem[],
  }
}

function normalizeProtocolMedicationForPersist(input: ProtocolMedicationItem, index: number, clinicId: string, protocolId: string) {
  const medicationId = String(input.medication_id || '').trim()
  const presentationId = String(input.presentation_id || '').trim()
  const manualName = String(input.manual_medication_name || '').trim()
  const manualPresentation = String(input.manual_presentation_text || '').trim()

  const isCatalog = !!medicationId || !!presentationId

  if (isCatalog) {
    if (!medicationId || !presentationId) {
      throw new Error('Item do protocolo em modo catalogo exige medication_id e presentation_id.')
    }

    return {
      clinic_id: clinicId,
      protocol_id: protocolId,
      medication_id: medicationId,
      medication_name: String(input.medication_name || ''),
      presentation_id: presentationId,
      presentation_text: String(input.presentation_text || ''),

      manual_medication_name: null,
      manual_presentation_label: null,

      concentration_text: input.concentration_text || null,
      value: input.value ?? null,
      value_unit: input.value_unit || null,
      per_value: input.per_value ?? null,
      per_unit: input.per_unit || null,
      route: input.route,
      frequency_type: input.frequency_type,
      times_per_day: input.times_per_day,
      interval_hours: input.interval_hours,
      duration_days: input.duration_days,
      instructions: input.instructions,
      sort_order: index,
    }
  }

  if (!manualName) {
    throw new Error('Item do protocolo em modo manual exige manual_medication_name.')
  }

  return {
    clinic_id: clinicId,
    protocol_id: protocolId,
    medication_id: null,
    medication_name: '',
    presentation_id: null,
    presentation_text: '',

    manual_medication_name: manualName,
    manual_presentation_text: manualPresentation || null,

    dose_value: input.dose_value,
    dose_unit: input.dose_unit,
    route: input.route,
    frequency_type: input.frequency_type,
    times_per_day: input.times_per_day,
    interval_hours: input.interval_hours,
    duration_days: input.duration_days,
    instructions: input.instructions,
    sort_order: index,
  }
}

export async function saveProtocolBundle(
  clinicId: string,
  userId: string,
  draft: {
    protocol: {
      id?: string
      folder_id?: string | null
      name: string
      description?: string | null
      target_species?: string | null
      is_active?: boolean
    }
    medications: ProtocolMedicationItem[]
    recommendations: ProtocolRecommendation[]
    exam_items: ProtocolExamItem[]
  }
): Promise<ProtocolRecord> {
  const name = String(draft.protocol.name || '').trim()
  if (!name) {
    throw new Error('Nome do protocolo e obrigatorio.')
  }

  let protocolId = String(draft.protocol.id || '').trim() || null
  let savedProtocol: ProtocolRecord

  if (protocolId) {
    const { data, error } = await supabase
      .from('protocols')
      .update({
        folder_id: draft.protocol.folder_id ?? null,
        name,
        description: draft.protocol.description ?? null,
        target_species: draft.protocol.target_species ?? null,
        is_active: draft.protocol.is_active ?? true,
        updated_at: new Date().toISOString(),
      })
      .eq('clinic_id', clinicId)
      .eq('owner_user_id', userId)
      .eq('id', protocolId)
      .select('*')
      .single()

    logSbError('[ProtocolsRepo] saveProtocolBundle update error', error)
    if (error) throw error
    savedProtocol = data as ProtocolRecord
  } else {
    const { data, error } = await supabase
      .from('protocols')
      .insert({
        clinic_id: clinicId,
        owner_user_id: userId,
        folder_id: draft.protocol.folder_id ?? null,
        name,
        description: draft.protocol.description ?? null,
        target_species: draft.protocol.target_species ?? null,
        is_active: draft.protocol.is_active ?? true,
      })
      .select('*')
      .single()

    logSbError('[ProtocolsRepo] saveProtocolBundle insert error', error)
    if (error) throw error
    savedProtocol = data as ProtocolRecord
    protocolId = savedProtocol.id
  }

  if (!protocolId) {
    throw new Error('Falha ao resolver protocolId apos salvar protocolo.')
  }

  {
    const { error } = await supabase
      .from('protocol_medications')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolsRepo] saveProtocolBundle delete protocol_medications error', error)
    if (error) throw error
  }
  {
    const { error } = await supabase
      .from('protocol_recommendations')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolsRepo] saveProtocolBundle delete protocol_recommendations error', error)
    if (error) throw error
  }
  {
    const { error } = await supabase
      .from('protocol_exam_items')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolsRepo] saveProtocolBundle delete protocol_exam_items error', error)
    if (error) throw error
  }

  if (draft.medications.length > 0) {
    const payload = draft.medications.map((m, idx) =>
      normalizeProtocolMedicationForPersist(m, idx, clinicId, protocolId)
    )
    const { error } = await supabase.from('protocol_medications').insert(payload)
    logSbError('[ProtocolsRepo] saveProtocolBundle insert protocol_medications error', error)
    if (error) throw error
  }

  if (draft.recommendations.length > 0) {
    const payload = draft.recommendations
      .map((r, idx) => ({
        clinic_id: clinicId,
        protocol_id: protocolId,
        recommendation_text: String(r.recommendation_text || '').trim(),
        sort_order: idx,
      }))
      .filter((r) => !!r.recommendation_text)

    if (payload.length > 0) {
      const { error } = await supabase.from('protocol_recommendations').insert(payload)
      logSbError('[ProtocolsRepo] saveProtocolBundle insert protocol_recommendations error', error)
      if (error) throw error
    }
  }

  if (draft.exam_items.length > 0) {
    const payload = draft.exam_items
      .map((e) => ({
        clinic_id: clinicId,
        protocol_id: protocolId,
        exam_key: String(e.exam_key || '').trim(),
        exam_label: String(e.exam_label || '').trim(),
        is_custom: !!e.is_custom,
        justification: e.justification ?? null,
      }))
      .filter((e) => !!e.exam_key && !!e.exam_label)

    if (payload.length > 0) {
      const { error } = await supabase.from('protocol_exam_items').insert(payload)
      logSbError('[ProtocolsRepo] saveProtocolBundle insert protocol_exam_items error', error)
      if (error) throw error
    }
  }

  return savedProtocol
}

export async function deleteProtocol(clinicId: string, userId: string, protocolId: string): Promise<void> {
  const { error } = await supabase
    .from('protocols')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', protocolId)

  logSbError('[ProtocolsRepo] deleteProtocol error', error)
  if (error) throw error
}
