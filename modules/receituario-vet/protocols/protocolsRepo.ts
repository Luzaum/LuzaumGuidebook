import { supabase } from '@/src/lib/supabaseClient'
import { logSbError } from '@/src/lib/clinicScopedDb'

export type ProtocolFolder = {
  id: string
  name: string
  icon_key: string | null
  color: string | null
  sort_order: number
}

export type Protocol = {
  id: string
  name: string
  description: string | null
  folder_id: string | null
  species: string | null
  duration_summary: string | null
  tags: string[]
  is_control_special: boolean
  exams_justification: string | null
}

export type ProtocolMedicationItem = {
  id: string
  sort_order: number

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

  frequency_type: 'times_per_day' | 'every_x_hours' | null
  times_per_day: number | null
  interval_hours: number | null

  is_controlled: boolean
}

export type ProtocolRecommendation = { id: string; sort_order: number; text: string }
export type ProtocolExamItem = { id: string; exam_key: string; label: string; is_custom: boolean }

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((v) => String(v || '').trim()).filter(Boolean)
}

function requireNonEmpty(value: string, label: string) {
  const normalized = String(value || '').trim()
  if (!normalized) throw new Error(`${label} obrigatorio.`)
  return normalized
}

function validateProtocolItem(item: Omit<ProtocolMedicationItem, 'id'>) {
  const manualName = String(item.manual_medication_name || '').trim()
  const isManual = !!manualName

  if (item.duration_days !== null && item.duration_days !== undefined && item.duration_days < 0) {
    throw new Error('duration_days nao pode ser negativo.')
  }

  if (item.frequency_type === 'times_per_day' && !item.times_per_day) {
    throw new Error('times_per_day obrigatorio quando frequency_type = times_per_day.')
  }
  if (item.frequency_type === 'every_x_hours' && !item.interval_hours) {
    throw new Error('interval_hours obrigatorio quando frequency_type = every_x_hours.')
  }

  if (isManual) {
    // Manual
    return {
      ...item,
      manual_medication_name: manualName,
      manual_presentation_label: String(item.manual_presentation_label || '').trim() || null,
      medication_id: null,
      presentation_id: null,
    }
  }

  // Catalogo
  requireNonEmpty(String(item.medication_id || ''), 'medication_id')
  requireNonEmpty(String(item.presentation_id || ''), 'presentation_id')

  return {
    ...item,
    manual_medication_name: null,
    manual_presentation_label: null,
  }
}

export async function listProtocolFolders(clinicId: string, userId: string): Promise<ProtocolFolder[]> {
  const { data, error } = await supabase
    .from('protocol_folders')
    .select('id,name,icon_key,color,sort_order')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  logSbError('[ProtocolFolders] ERROR', error)
  if (error) throw error

  return (data || []) as ProtocolFolder[]
}

export async function createProtocolFolder(
  clinicId: string,
  userId: string,
  folder: Omit<ProtocolFolder, 'id'>
): Promise<ProtocolFolder> {
  const { data, error } = await supabase
    .from('protocol_folders')
    .insert({
      clinic_id: clinicId,
      owner_user_id: userId,
      name: folder.name.trim(),
      icon_key: folder.icon_key ?? null,
      color: folder.color ?? null,
      sort_order: folder.sort_order ?? 0,
    })
    .select('id,name,icon_key,color,sort_order')
    .single()

  logSbError('[ProtocolFolderCreate] ERROR', error)
  if (error) throw error

  return data as ProtocolFolder
}

export async function listProtocols(
  clinicId: string,
  userId: string,
  folderId?: string,
  search?: string
): Promise<Protocol[]> {
  let query = supabase
    .from('protocols')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)

  if (folderId) {
    query = query.eq('folder_id', folderId)
  }
  if (search && search.trim()) {
    query = query.ilike('name', `%${search.trim()}%`)
  }

  const { data, error } = await query.order('name', { ascending: true })
  logSbError('[ProtocolsList] ERROR', error)
  if (error) throw error

  return (data || []).map((row: any) => ({
    id: String(row.id),
    name: String(row.name || ''),
    description: row.description ?? null,
    folder_id: row.folder_id ?? null,
    species: row.species ?? row.target_species ?? null,
    duration_summary: row.duration_summary ?? null,
    tags: normalizeTags(row.tags),
    is_control_special: !!(row.is_control_special ?? row.requires_special_control ?? false),
    exams_justification: row.exams_justification ?? null,
  }))
}

export async function loadProtocolBundle(
  clinicId: string,
  userId: string,
  protocolId: string
): Promise<{
  protocol: Protocol
  medications: ProtocolMedicationItem[]
  recommendations: ProtocolRecommendation[]
  exams: ProtocolExamItem[]
}> {
  const [protocolRes, medsRes, recRes, examsRes] = await Promise.all([
    supabase
      .from('protocols')
      .select('*')
      .eq('clinic_id', clinicId)
      .eq('owner_user_id', userId)
      .eq('id', protocolId)
      .single(),
    supabase
      .from('protocol_medications')
      .select('*')
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
      .order('sort_order', { ascending: true }),
    supabase
      .from('protocol_recommendations')
      .select('*')
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
      .order('sort_order', { ascending: true }),
    supabase
      .from('protocol_exam_items')
      .select('*')
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
      .order('created_at', { ascending: true }),
  ])

  logSbError('[ProtocolLoad] protocol ERROR', protocolRes.error)
  logSbError('[ProtocolLoad] medications ERROR', medsRes.error)
  logSbError('[ProtocolLoad] recommendations ERROR', recRes.error)
  logSbError('[ProtocolLoad] exams ERROR', examsRes.error)

  if (protocolRes.error) throw protocolRes.error
  if (medsRes.error) throw medsRes.error
  if (recRes.error) throw recRes.error
  if (examsRes.error) throw examsRes.error

  const p = protocolRes.data as any
  const protocol: Protocol = {
    id: String(p.id),
    name: String(p.name || ''),
    description: p.description ?? null,
    folder_id: p.folder_id ?? null,
    species: p.species ?? p.target_species ?? null,
    duration_summary: p.duration_summary ?? null,
    tags: normalizeTags(p.tags),
    is_control_special: !!(p.is_control_special ?? p.requires_special_control ?? false),
    exams_justification: p.exams_justification ?? null,
  }

  const medications: ProtocolMedicationItem[] = (medsRes.data || []).map((row: any) => ({
    id: String(row.id),
    sort_order: Number(row.sort_order || 0),
    medication_id: row.medication_id ?? null,
    presentation_id: row.presentation_id ?? null,
    manual_medication_name: row.manual_medication_name ?? null,
    manual_presentation_label: row.manual_presentation_label ?? null,
    concentration_value: row.concentration_value ?? null,
    concentration_unit: row.concentration_unit ?? null,
    dose_value: row.dose_value ?? null,
    dose_unit: row.dose_unit ?? null,
    route: row.route ?? null,
    duration_days: row.duration_days ?? null,
    frequency_type: row.frequency_type ?? null,
    times_per_day: row.times_per_day ?? null,
    interval_hours: row.interval_hours ?? null,
    is_controlled: !!row.is_controlled,
  }))

  const recommendations: ProtocolRecommendation[] = (recRes.data || []).map((row: any) => ({
    id: String(row.id),
    sort_order: Number(row.sort_order || 0),
    text: String(row.text ?? row.recommendation_text ?? ''),
  }))

  const exams: ProtocolExamItem[] = (examsRes.data || []).map((row: any) => ({
    id: String(row.id),
    exam_key: String(row.exam_key || ''),
    label: String(row.label ?? row.exam_label ?? ''),
    is_custom: !!row.is_custom,
  }))

  return { protocol, medications, recommendations, exams }
}

export async function saveProtocolBundle(
  clinicId: string,
  userId: string,
  bundle: {
    protocol: Partial<Protocol> & { id?: string }
    medications: Omit<ProtocolMedicationItem, 'id'>[]
    recommendations: Omit<ProtocolRecommendation, 'id'>[]
    exams: Omit<ProtocolExamItem, 'id'>[]
  }
): Promise<string> {
  const protocolName = requireNonEmpty(String(bundle.protocol.name || ''), 'name')

  // Upsert parent
  let protocolId = String(bundle.protocol.id || '').trim() || ''

  if (protocolId) {
    const { error } = await supabase
      .from('protocols')
      .update({
        name: protocolName,
        description: bundle.protocol.description ?? null,
        folder_id: bundle.protocol.folder_id ?? null,
        species: bundle.protocol.species ?? null,
        duration_summary: bundle.protocol.duration_summary ?? null,
        tags: bundle.protocol.tags ?? [],
        is_control_special: bundle.protocol.is_control_special ?? false,
        exams_justification: bundle.protocol.exams_justification ?? null,
      })
      .eq('clinic_id', clinicId)
      .eq('owner_user_id', userId)
      .eq('id', protocolId)

    logSbError('[ProtocolSave] update ERROR', error)
    if (error) throw error
  } else {
    const { data, error } = await supabase
      .from('protocols')
      .insert({
        clinic_id: clinicId,
        owner_user_id: userId,
        name: protocolName,
        description: bundle.protocol.description ?? null,
        folder_id: bundle.protocol.folder_id ?? null,
        species: bundle.protocol.species ?? null,
        duration_summary: bundle.protocol.duration_summary ?? null,
        tags: bundle.protocol.tags ?? [],
        is_control_special: bundle.protocol.is_control_special ?? false,
        exams_justification: bundle.protocol.exams_justification ?? null,
      })
      .select('id')
      .single()

    logSbError('[ProtocolSave] insert ERROR', error)
    if (error) throw error
    protocolId = String((data as any).id)
  }

  // Delete children
  {
    const { error } = await supabase
      .from('protocol_medications')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolSave] delete protocol_medications ERROR', error)
    if (error) throw error
  }
  {
    const { error } = await supabase
      .from('protocol_recommendations')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolSave] delete protocol_recommendations ERROR', error)
    if (error) throw error
  }
  {
    const { error } = await supabase
      .from('protocol_exam_items')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolSave] delete protocol_exam_items ERROR', error)
    if (error) throw error
  }

  // Insert children
  if (bundle.medications.length) {
    const rows = bundle.medications
      .map((m, idx) => validateProtocolItem({ ...m, sort_order: idx }))
      .map((m) => ({
        clinic_id: clinicId,
        protocol_id: protocolId,
        sort_order: m.sort_order,
        medication_id: m.medication_id,
        presentation_id: m.presentation_id,
        manual_medication_name: m.manual_medication_name,
        manual_presentation_label: m.manual_presentation_label,
        concentration_value: m.concentration_value,
        concentration_unit: m.concentration_unit,
        dose_value: m.dose_value,
        dose_unit: m.dose_unit,
        route: m.route,
        duration_days: m.duration_days,
        frequency_type: m.frequency_type,
        times_per_day: m.times_per_day,
        interval_hours: m.interval_hours,
        is_controlled: !!m.is_controlled,
      }))

    const { error } = await supabase.from('protocol_medications').insert(rows)
    logSbError('[ProtocolSave] insert protocol_medications ERROR', error)
    if (error) throw error
  }

  if (bundle.recommendations.length) {
    const rows = bundle.recommendations.map((r, idx) => ({
      clinic_id: clinicId,
      protocol_id: protocolId,
      sort_order: idx,
      text: String(r.text || '').trim(),
    }))

    const { error } = await supabase.from('protocol_recommendations').insert(rows)
    logSbError('[ProtocolSave] insert protocol_recommendations ERROR', error)
    if (error) throw error
  }

  if (bundle.exams.length) {
    const rows = bundle.exams.map((e) => ({
      clinic_id: clinicId,
      protocol_id: protocolId,
      exam_key: String(e.exam_key || '').trim(),
      label: String(e.label || '').trim(),
      is_custom: !!e.is_custom,
    }))

    const { error } = await supabase.from('protocol_exam_items').insert(rows)
    logSbError('[ProtocolSave] insert protocol_exam_items ERROR', error)
    if (error) throw error
  }

  return protocolId
}

export async function deleteProtocol(clinicId: string, userId: string, protocolId: string): Promise<void> {
  const { error } = await supabase
    .from('protocols')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', protocolId)

  logSbError('[ProtocolDelete] ERROR', error)
  if (error) throw error
}
