import { supabase } from '../supabaseClient'
import { logSbError } from '../clinicScopedDb'

// ============================================================
// TYPE DEFINITIONS — aligned to REAL Supabase schema
// ============================================================

export type ProtocolFolderRecord = {
  id: string
  clinic_id: string
  owner_user_id: string
  name: string
  icon_key: string | null
  color: string | null
  sort_order: number
  created_at: string
  updated_at?: string
}

/** Matches `protocols` table exactly. No is_active. */
export type ProtocolRecord = {
  id: string
  clinic_id: string
  owner_user_id: string
  folder_id: string | null
  name: string
  description: string | null
  species: string | null
  duration_summary: string | null
  tags: string[] | null
  is_control_special: boolean
  exams_justification: string | null
  metadata?: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

/**
 * In-memory shape for a protocol medication item.
 * NOTE: There is NO `instructions` column in the DB. Do NOT add it.
 * Canonical DB columns for protocol_medications:
 *   clinic_id, protocol_id, sort_order,
 *   medication_id, presentation_id,
 *   concentration_value, concentration_unit,
 *   dose_value, dose_unit,
 *   route, duration_days,
 *   frequency_type, times_per_day, interval_hours,
 *   is_controlled,
 *   manual_medication_name, manual_presentation_label
 */
export type ProtocolMedicationItem = {
  id?: string
  // Catalog mode
  medication_id: string | null
  global_medication_id?: string | null
  /** UI-only display name — NOT sent to DB */
  medication_name?: string
  presentation_id: string | null
  presentation_slug?: string | null
  /** UI-only display text — NOT sent to DB */
  presentation_text?: string
  // Manual mode (when catalog IDs missing)
  manual_medication_name: string | null
  manual_presentation_label: string | null
  // Dosing
  concentration_value?: number | null
  concentration_unit?: string | null
  dose_value?: number | null
  dose_unit?: string | null
  route: string | null
  frequency_type: 'times_per_day' | 'interval_hours' | 'once_daily' | 'as_needed'
  times_per_day: number | null
  interval_hours: number | null
  duration_days: number | null
  is_controlled?: boolean
  sort_order: number
  metadata?: Record<string, unknown> | null
}

/** `protocol_recommendations` uses column `text` (not `recommendation_text`). */
export type ProtocolRecommendation = {
  id?: string
  text: string
  sort_order: number
  metadata?: Record<string, unknown> | null
}

export type ProtocolExamItem = {
  id?: string
  exam_key: string
  label: string
  is_custom: boolean
  sort_order: number
  metadata?: Record<string, unknown> | null
}

export type GlobalProtocolRecord = {
  id: string
  slug: string
  name: string
  description: string | null
  species: string | null
  tags: string[] | null
  is_control_special: boolean
  exams_justification: string | null
  metadata: Record<string, unknown> | null
  sort_order: number
  is_active: boolean
  source_protocol_id: string | null
  source_clinic_id: string | null
  published_by_user_id: string | null
  version: number
  status: string
  created_at: string
  updated_at: string
  scope?: 'global'
}

export type ProtocolListEntry =
  | (ProtocolRecord & { scope: 'clinic' })
  | (GlobalProtocolRecord & { scope: 'global' })

export type PublishGlobalProtocolInput = {
  protocolId: string
  mode: 'new' | 'update'
  globalProtocolId?: string | null
  name: string
  description?: string | null
  species?: string | null
  tags?: string[] | null
  slug: string
}

export type DuplicateGlobalProtocolResult = {
  ok: true
  protocolId: string
  name: string
  medicationsCount: number
  recommendationsCount: number
  examItemsCount: number
}

export type PublishGlobalProtocolResult = {
  ok: true
  globalProtocolId: string
  slug: string
  version: number
  mode: 'new' | 'update'
}

/** Current editor bundle: protocol + medications + recommendations. Exam items remain outside the editor state for now. */
export type ProtocolBundle = {
  scope?: 'clinic'
  protocol: ProtocolRecord
  medications: ProtocolMedicationItem[]
  recommendations: ProtocolRecommendation[]
  examItems?: ProtocolExamItem[]
}

export type GlobalProtocolBundle = {
  scope: 'global'
  protocol: GlobalProtocolRecord
  medications: ProtocolMedicationItem[]
  recommendations: ProtocolRecommendation[]
  examItems: ProtocolExamItem[]
}

type DefaultProtocolSeed = {
  folderName: string
  iconKey: string
  color: string
  protocolName: string
  description: string
  recommendations: string[]
}

const DEFAULT_SPECIALTY_PROTOCOLS: DefaultProtocolSeed[] = [
  {
    folderName: 'Gastro',
    iconKey: 'gastroenterology',
    color: '#f97316',
    protocolName: 'Protocolo Exemplo - Gastro',
    description: 'Esqueleto para gastroenterologia. Selecione os fármacos no Catálogo 3.0.',
    recommendations: ['Dieta gastrointestinal fracionada por 5-7 dias.', 'Solicitar hemograma, bioquímica e ultrassonografia abdominal conforme evolução.'],
  },
  {
    folderName: 'Nefro/Uro',
    iconKey: 'water_drop',
    color: '#0ea5e9',
    protocolName: 'Protocolo Exemplo - Nefro/Uro',
    description: 'Esqueleto para nefrologia/urologia. Ajustar condutas ao caso clínico.',
    recommendations: ['Garantir hidratação e monitorar débito urinário.', 'Solicitar ureia, creatinina, SDMA, urinálise e relação proteína/creatinina urinária.'],
  },
  {
    folderName: 'Pneumo',
    iconKey: 'air',
    color: '#06b6d4',
    protocolName: 'Protocolo Exemplo - Pneumo',
    description: 'Esqueleto para pneumologia com recomendações iniciais.',
    recommendations: ['Manter ambiente arejado e reduzir estresse respiratório.', 'Solicitar radiografia torácica e hemograma; considerar gasometria em casos graves.'],
  },
  {
    folderName: 'Cardio',
    iconKey: 'cardiology',
    color: '#ef4444',
    protocolName: 'Protocolo Exemplo - Cardio',
    description: 'Esqueleto para cardiologia com exames de triagem.',
    recommendations: ['Restringir exercício até estabilização clínica.', 'Solicitar ecocardiograma, ECG, pressão arterial e radiografia torácica.'],
  },
  {
    folderName: 'Ortopedia',
    iconKey: 'orthopedics',
    color: '#f59e0b',
    protocolName: 'Protocolo Exemplo - Ortopedia',
    description: 'Esqueleto para ortopedia com orientações iniciais.',
    recommendations: ['Repouso controlado e analgesia conforme avaliação.', 'Solicitar radiografias ortogonais e exames pré-operatórios quando indicado.'],
  },
  {
    folderName: 'Neuro',
    iconKey: 'neurology',
    color: '#8b5cf6',
    protocolName: 'Protocolo Exemplo - Neuro',
    description: 'Esqueleto para neurologia. Completar medicações no catálogo.',
    recommendations: ['Monitorar nível de consciência e sinais neurológicos seriados.', 'Solicitar imagem avançada (TC/RM) e líquor quando pertinente.'],
  },
  {
    folderName: 'Onco',
    iconKey: 'biotech',
    color: '#ec4899',
    protocolName: 'Protocolo Exemplo - Onco',
    description: 'Esqueleto para oncologia com foco em estadiamento.',
    recommendations: ['Planejar estadiamento completo antes do protocolo definitivo.', 'Solicitar hemograma, bioquímica, imagem de tórax/abdômen e citologia/biópsia.'],
  },
  {
    folderName: 'Nutrição',
    iconKey: 'nutrition',
    color: '#22c55e',
    protocolName: 'Protocolo Exemplo - Nutrição',
    description: 'Esqueleto para nutrição clínica e suporte dietético.',
    recommendations: ['Definir meta calórica diária e plano alimentar individual.', 'Reavaliar escore corporal e exames metabólicos em retorno programado.'],
  },
  {
    folderName: 'Cirurgia',
    iconKey: 'surgical',
    color: '#64748b',
    protocolName: 'Protocolo Exemplo - Cirurgia',
    description: 'Esqueleto perioperatório com exames e recomendações.',
    recommendations: ['Jejum e protocolo anestésico conforme espécie e risco ASA.', 'Solicitar hemograma, bioquímica, coagulograma e imagem pré-operatória quando necessário.'],
  },
]

// ============================================================
// WHITELIST BUILDERS
// ============================================================

export function buildProtocolInsert(draft: Partial<ProtocolRecord>, clinicId: string, userId: string) {
  // WHITELIST: only valid columns for protocols table
  return {
    clinic_id: clinicId,
    owner_user_id: userId,
    folder_id: draft.folder_id ?? null,
    name: String(draft.name || '').trim(),
    description: draft.description ?? null,
    species: draft.species || null,
    duration_summary: draft.duration_summary || null,
    tags: draft.tags || null,
    is_control_special: !!draft.is_control_special,
    exams_justification: draft.exams_justification || null,
    metadata: draft.metadata || {},
    // NOTE: no is_active - column does not exist
  }
}

export function buildProtocolUpdate(draft: Partial<ProtocolRecord>) {
  // WHITELIST: only valid columns for protocols table
  return {
    folder_id: draft.folder_id ?? null,
    name: String(draft.name || '').trim(),
    description: draft.description ?? null,
    species: draft.species || null,
    duration_summary: draft.duration_summary || null,
    tags: draft.tags || null,
    is_control_special: !!draft.is_control_special,
    exams_justification: draft.exams_justification || null,
    metadata: draft.metadata || {},
    updated_at: new Date().toISOString(),
    // NOTE: no is_active - column does not exist
  }
}

/**
 * WHITELIST builder for protocol_medications.
 * Only includes columns that actually exist in the DB.
 * Does NOT include: instructions, medication_name, presentation_text.
 */
function buildProtocolMedicationInsert(
  input: ProtocolMedicationItem,
  index: number,
  clinicId: string,
  protocolId: string
) {
  const medicationId = String(input.medication_id || '').trim() || null
  const presentationId = String(input.presentation_id || '').trim() || null
  const manualName = String(input.manual_medication_name || '').trim() || null
  const manualPresentation = String(input.manual_presentation_label || '').trim() || null

  const isCatalog = !!medicationId && !!presentationId

  if (!isCatalog && !manualName) {
    throw new Error(
      `Item de protocolo na posição ${index + 1}: é necessário medication_id+presentation_id (catálogo) ou manual_medication_name (manual).`
    )
  }

  // STRICT WHITELIST — only columns that exist in protocol_medications
  return {
    clinic_id: clinicId,
    protocol_id: protocolId,
    sort_order: index,
    medication_id: isCatalog ? medicationId : null,
    presentation_id: isCatalog ? presentationId : null,
    concentration_value: input.concentration_value ?? null,
    concentration_unit: input.concentration_unit || null,
    dose_value: input.dose_value ?? null,
    dose_unit: input.dose_unit || null,
    route: input.route || null,
    duration_days: input.duration_days ?? null,
    frequency_type: input.frequency_type || null,
    times_per_day: input.times_per_day ?? null,
    interval_hours: input.interval_hours ?? null,
    is_controlled: !!input.is_controlled,
    manual_medication_name: isCatalog ? null : manualName,
    manual_presentation_label: isCatalog ? null : manualPresentation,
    // NOTE: no `instructions` — column does not exist in protocol_medications
  }
}

// ============================================================
// FOLDERS CRUD
// ============================================================

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
  data: { name: string; icon_key?: string | null; color?: string | null; sort_order?: number }
): Promise<ProtocolFolderRecord> {
  const name = String(data.name || '').trim()
  if (!name) throw new Error('Nome da pasta é obrigatório.')

  const { data: created, error } = await supabase
    .from('protocol_folders')
    .insert({
      clinic_id: clinicId,
      owner_user_id: userId,
      name,
      icon_key: data.icon_key ?? null,
      color: data.color ?? null,
      sort_order: typeof data.sort_order === 'number' ? data.sort_order : 0,
    })
    .select('*')
    .single()

  logSbError('[ProtocolsRepo] createFolder error', error)
  if (error) throw error
  return created as ProtocolFolderRecord
}

export async function updateFolder(
  clinicId: string,
  userId: string,
  folderId: string,
  payload: { name?: string; icon_key?: string | null; color?: string | null; sort_order?: number }
): Promise<void> {
  const { error } = await supabase
    .from('protocol_folders')
    .update(payload)
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', folderId)

  logSbError('[ProtocolsRepo] updateFolder error', error)
  if (error) throw error
}

export async function deleteFolder(
  clinicId: string,
  userId: string,
  folderId: string
): Promise<void> {
  const { error } = await supabase
    .from('protocol_folders')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', folderId)

  logSbError('[ProtocolsRepo] deleteFolder error', error)
  if (error) throw error
}

// ============================================================
// PROTOCOLS CRUD
// ============================================================

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

function buildPresentationText(presentation: {
  pharmaceutical_form?: string | null
  commercial_name?: string | null
  concentration_text?: string | null
}): string {
  const bits = [
    String(presentation.pharmaceutical_form || '').trim(),
    String(presentation.commercial_name || '').trim(),
    String(presentation.concentration_text || '').trim(),
  ].filter(Boolean)
  return bits.join(' — ')
}

async function hydrateClinicProtocolMedications(
  items: ProtocolMedicationItem[]
): Promise<ProtocolMedicationItem[]> {
  const medicationIds = Array.from(
    new Set(
      items
        .map((item) => String(item.medication_id || '').trim())
        .filter(Boolean)
    )
  )
  const presentationIds = Array.from(
    new Set(
      items
        .map((item) => String(item.presentation_id || '').trim())
        .filter(Boolean)
    )
  )

  const [medicationsResult, presentationsResult] = await Promise.all([
    medicationIds.length
      ? supabase.from('medications').select('id,name').in('id', medicationIds)
      : Promise.resolve({ data: [], error: null }),
    presentationIds.length
      ? supabase
          .from('medication_presentations')
          .select('id,pharmaceutical_form,commercial_name,concentration_text')
          .in('id', presentationIds)
      : Promise.resolve({ data: [], error: null }),
  ])

  logSbError('[ProtocolsRepo] hydrateClinicProtocolMedications medications error', medicationsResult.error)
  logSbError('[ProtocolsRepo] hydrateClinicProtocolMedications presentations error', presentationsResult.error)

  const medicationMap = new Map<string, string>(
    ((medicationsResult.data ?? []) as Array<{ id: string; name: string }>).map((row) => [row.id, row.name])
  )
  const presentationMap = new Map<string, string>(
    ((presentationsResult.data ?? []) as Array<{
      id: string
      pharmaceutical_form: string | null
      commercial_name: string | null
      concentration_text: string | null
    }>).map((row) => [row.id, buildPresentationText(row)])
  )

  return items.map((item) => ({
    ...item,
    medication_name: item.medication_name || (item.medication_id ? medicationMap.get(item.medication_id) || undefined : undefined),
    presentation_text:
      item.presentation_text || (item.presentation_id ? presentationMap.get(item.presentation_id) || undefined : undefined),
  }))
}

async function hydrateGlobalProtocolMedications(
  items: ProtocolMedicationItem[]
): Promise<ProtocolMedicationItem[]> {
  const globalMedicationIds = Array.from(
    new Set(
      items
        .map((item) => String(item.global_medication_id || '').trim())
        .filter(Boolean)
    )
  )

  const [medicationsResult, presentationsResult] = await Promise.all([
    globalMedicationIds.length
      ? supabase.from('global_medications').select('id,name').in('id', globalMedicationIds)
      : Promise.resolve({ data: [], error: null }),
    globalMedicationIds.length
      ? supabase
          .from('global_medication_presentations')
          .select('global_medication_id,slug,pharmaceutical_form,commercial_name,concentration_text')
          .in('global_medication_id', globalMedicationIds)
      : Promise.resolve({ data: [], error: null }),
  ])

  logSbError('[ProtocolsRepo] hydrateGlobalProtocolMedications medications error', medicationsResult.error)
  logSbError('[ProtocolsRepo] hydrateGlobalProtocolMedications presentations error', presentationsResult.error)

  const medicationMap = new Map<string, string>(
    ((medicationsResult.data ?? []) as Array<{ id: string; name: string }>).map((row) => [row.id, row.name])
  )
  const presentationMap = new Map<string, string>(
    ((presentationsResult.data ?? []) as Array<{
      global_medication_id: string
      slug: string
      pharmaceutical_form: string | null
      commercial_name: string | null
      concentration_text: string | null
    }>).map((row) => [`${row.global_medication_id}:${row.slug}`, buildPresentationText(row)])
  )

  return items.map((item) => ({
    ...item,
    medication_name:
      item.medication_name ||
      item.manual_medication_name ||
      (item.global_medication_id ? medicationMap.get(item.global_medication_id) || undefined : undefined),
    presentation_text:
      item.presentation_text ||
      item.manual_presentation_label ||
      (item.global_medication_id && item.presentation_slug
        ? presentationMap.get(`${item.global_medication_id}:${item.presentation_slug}`) || undefined
        : undefined),
  }))
}

export async function listCombinedProtocols(
  clinicId: string,
  userId: string,
  folderId?: string | null,
  search?: string
): Promise<ProtocolListEntry[]> {
  const clinicProtocols = await listProtocols(clinicId, userId, folderId, search)
  const scopedClinicProtocols = clinicProtocols.map((protocol) => ({
    ...protocol,
    scope: 'clinic' as const,
  }))

  if (folderId) return scopedClinicProtocols

  let query = supabase
    .from('global_protocols')
    .select('*')
    .eq('is_active', true)

  const needle = String(search || '').trim()
  if (needle) {
    query = query.ilike('name', `%${needle}%`)
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    logSbError('[ProtocolsRepo] listCombinedProtocols global error', error)
    return scopedClinicProtocols
  }

  const scopedGlobalProtocols = ((data ?? []) as GlobalProtocolRecord[]).map((protocol) => ({
    ...protocol,
    scope: 'global' as const,
  }))

  return [...scopedClinicProtocols, ...scopedGlobalProtocols]
}

export async function findLinkedGlobalProtocols(
  protocolId: string,
  clinicId: string
): Promise<GlobalProtocolRecord[]> {
  const { data, error } = await supabase
    .from('global_protocols')
    .select('*')
    .eq('source_protocol_id', protocolId)
    .eq('source_clinic_id', clinicId)
    .order('updated_at', { ascending: false })

  if (error) {
    logSbError('[ProtocolsRepo] findLinkedGlobalProtocols error', error)
    return []
  }

  return ((data ?? []) as GlobalProtocolRecord[]).map((protocol) => ({
    ...protocol,
    scope: 'global' as const,
  }))
}

export async function publishProtocolAsGlobal(
  input: PublishGlobalProtocolInput
): Promise<PublishGlobalProtocolResult> {
  const { data, error } = await supabase.functions.invoke('publish-global-protocol', {
    body: input,
  })

  if (error) {
    logSbError('[ProtocolsRepo] publishProtocolAsGlobal error', error)
    throw error
  }

  if (!data || data.ok !== true || !data.globalProtocolId) {
    throw new Error('Resposta inválida da publicação global.')
  }

  return data as PublishGlobalProtocolResult
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
    logSbError('[ProtocolsRepo] loadProtocolBundle protocol error', protocolError)
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
  if (examError) logSbError('[ProtocolsRepo] loadProtocolBundle exam items error', examError)

  const hydratedMedications = await hydrateClinicProtocolMedications(
    ((medications ?? []).map((m) => ({
      id: m.id,
      medication_id: m.medication_id ?? null,
      presentation_id: m.presentation_id ?? null,
      manual_medication_name: m.manual_medication_name ?? null,
      manual_presentation_label: m.manual_presentation_label ?? null,
      concentration_value: m.concentration_value ?? null,
      concentration_unit: m.concentration_unit ?? null,
      dose_value: m.dose_value ?? null,
      dose_unit: m.dose_unit ?? null,
      route: m.route ?? null,
      frequency_type: m.frequency_type ?? 'times_per_day',
      times_per_day: m.times_per_day ?? null,
      interval_hours: m.interval_hours ?? null,
      duration_days: m.duration_days ?? null,
      is_controlled: !!m.is_controlled,
      sort_order: m.sort_order ?? 0,
    })) as ProtocolMedicationItem[])
  )

  return {
    scope: 'clinic',
    protocol: protocol as ProtocolRecord,
    medications: hydratedMedications,
    recommendations: (recommendations ?? []).map((r) => ({
      id: r.id,
      text: r.text ?? '',    // column is `text` in DB
      sort_order: r.sort_order ?? 0,
      metadata: (r as any).metadata ?? null,
    })) as ProtocolRecommendation[],
    examItems: (examItems ?? []).map((exam, idx) => ({
      id: exam.id,
      exam_key: exam.exam_key ?? '',
      label: exam.label ?? '',
      is_custom: !!exam.is_custom,
      sort_order: idx,
      metadata: (exam as any).metadata ?? null,
    })) as ProtocolExamItem[],
  }
}

export async function loadGlobalProtocolBundle(
  globalProtocolId: string
): Promise<GlobalProtocolBundle | null> {
  const { data: protocol, error: protocolError } = await supabase
    .from('global_protocols')
    .select('*')
    .eq('id', globalProtocolId)
    .single()

  if (protocolError || !protocol) {
    logSbError('[ProtocolsRepo] loadGlobalProtocolBundle protocol error', protocolError)
    return null
  }

  const { data: medications, error: medError } = await supabase
    .from('global_protocol_medications')
    .select('*')
    .eq('global_protocol_id', globalProtocolId)
    .order('sort_order', { ascending: true })

  const { data: recommendations, error: recError } = await supabase
    .from('global_protocol_recommendations')
    .select('*')
    .eq('global_protocol_id', globalProtocolId)
    .order('sort_order', { ascending: true })

  const { data: examItems, error: examError } = await supabase
    .from('global_protocol_exam_items')
    .select('*')
    .eq('global_protocol_id', globalProtocolId)
    .order('sort_order', { ascending: true })

  if (medError) logSbError('[ProtocolsRepo] loadGlobalProtocolBundle medications error', medError)
  if (recError) logSbError('[ProtocolsRepo] loadGlobalProtocolBundle recommendations error', recError)
  if (examError) logSbError('[ProtocolsRepo] loadGlobalProtocolBundle exam items error', examError)

  const hydratedMedications = await hydrateGlobalProtocolMedications(
    ((medications ?? []).map((m) => ({
      id: m.id,
      medication_id: m.medication_id ?? null,
      global_medication_id: (m as any).global_medication_id ?? null,
      presentation_id: null,
      presentation_slug: (m as any).presentation_slug ?? null,
      manual_medication_name: m.manual_medication_name ?? null,
      manual_presentation_label: m.manual_presentation_label ?? null,
      concentration_value: m.concentration_value ?? null,
      concentration_unit: m.concentration_unit ?? null,
      dose_value: m.dose_value ?? null,
      dose_unit: m.dose_unit ?? null,
      route: m.route ?? null,
      frequency_type: m.frequency_type ?? 'times_per_day',
      times_per_day: m.times_per_day ?? null,
      interval_hours: m.interval_hours ?? null,
      duration_days: m.duration_days ?? null,
      is_controlled: !!m.is_controlled,
      sort_order: m.sort_order ?? 0,
      metadata: (m as any).metadata ?? null,
    })) as ProtocolMedicationItem[])
  )

  return {
    scope: 'global',
    protocol: {
      ...(protocol as GlobalProtocolRecord),
      scope: 'global',
    },
    medications: hydratedMedications,
    recommendations: (recommendations ?? []).map((rec) => ({
      id: rec.id,
      text: rec.text ?? '',
      sort_order: rec.sort_order ?? 0,
      metadata: (rec as any).metadata ?? null,
    })) as ProtocolRecommendation[],
    examItems: (examItems ?? []).map((exam) => ({
      id: exam.id,
      exam_key: exam.exam_key ?? '',
      label: exam.label ?? '',
      is_custom: !!exam.is_custom,
      sort_order: exam.sort_order ?? 0,
      metadata: (exam as any).metadata ?? null,
    })) as ProtocolExamItem[],
  }
}

// ============================================================
// SAVE BUNDLE (logical transaction: upsert → delete → insert)
// ============================================================

export async function saveProtocolBundle(
  clinicId: string,
  userId: string,
  draft: {
    protocol: {
      id?: string
      folder_id?: string | null
      name: string
      description?: string | null
      species?: string | null
      duration_summary?: string | null
      tags?: string[] | null
      is_control_special?: boolean
      exams_justification?: string | null
      metadata?: Record<string, unknown> | null
    }
    medications: ProtocolMedicationItem[]
    recommendations: ProtocolRecommendation[]
  }
): Promise<ProtocolRecord> {
  const name = String(draft.protocol.name || '').trim()
  if (!name) throw new Error('Nome do protocolo é obrigatório.')

  let protocolId = String(draft.protocol.id || '').trim() || null
  let savedProtocol: ProtocolRecord

  // ── STEP 1: upsert protocol (no is_active) ──────────────────────────
  if (protocolId) {
    const { data, error } = await supabase
      .from('protocols')
      .update(buildProtocolUpdate(draft.protocol))
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
      .insert(buildProtocolInsert(draft.protocol, clinicId, userId))
      .select('*')
      .single()

    logSbError('[ProtocolsRepo] saveProtocolBundle insert error', error)
    if (error) throw error
    savedProtocol = data as ProtocolRecord
    protocolId = savedProtocol.id
  }

  if (!protocolId) throw new Error('Falha ao resolver protocolId após salvar protocolo.')

  // ── STEP 2: delete + re-insert protocol_medications ─────────────────
  {
    const { error } = await supabase
      .from('protocol_medications')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolsRepo] saveProtocolBundle delete medications error', error)
    if (error) throw error
  }

  if (draft.medications.length > 0) {
    const payload = draft.medications.map((m, idx) =>
      buildProtocolMedicationInsert(m, idx, clinicId, protocolId!)
    )
    const { error } = await supabase.from('protocol_medications').insert(payload)
    logSbError('[ProtocolsRepo] saveProtocolBundle insert medications error', error)
    if (error) throw error
  }

  // ── STEP 3: delete + re-insert protocol_recommendations ─────────────
  {
    const { error } = await supabase
      .from('protocol_recommendations')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    logSbError('[ProtocolsRepo] saveProtocolBundle delete recommendations error', error)
    if (error) throw error
  }

  const validRecs = draft.recommendations.filter((r) => String(r.text || '').trim())
  if (validRecs.length > 0) {
    const payload = validRecs.map((r, idx) => ({
      clinic_id: clinicId,
      protocol_id: protocolId,
      text: String(r.text).trim(), // column is `text` in DB (not recommendation_text)
      sort_order: idx,
    }))
    const { error } = await supabase.from('protocol_recommendations').insert(payload)
    logSbError('[ProtocolsRepo] saveProtocolBundle insert recommendations error', error)
    if (error) throw error
  }

  return savedProtocol
}

export async function duplicateGlobalProtocolToClinic(
  clinicId: string,
  userId: string,
  globalProtocolId: string
): Promise<ProtocolRecord> {
  const { data, error } = await supabase.functions.invoke('duplicate-global-protocol', {
    body: { clinicId, userId, globalProtocolId },
  })

  if (error) {
    logSbError('[ProtocolsRepo] duplicateGlobalProtocolToClinic invoke error', error)
    let message = 'NÃ£o foi possÃ­vel duplicar o protocolo completo. Nenhuma cÃ³pia vÃ¡lida foi mantida.'
    const response = (error as any)?.context
    if (response && typeof response.json === 'function') {
      try {
        const payload = await response.json()
        if (payload?.error) {
          message = String(payload.error)
        }
      } catch {}
    }
    throw new Error(message)
  }

  if (!data || data.ok !== true || !data.protocolId) {
    throw new Error('Resposta invÃ¡lida da duplicaÃ§Ã£o de protocolo global.')
  }

  const result = data as DuplicateGlobalProtocolResult

  const { data: duplicatedProtocol, error: protocolError } = await supabase
    .from('protocols')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', result.protocolId)
    .single()

  logSbError('[ProtocolsRepo] duplicateGlobalProtocolToClinic load protocol error', protocolError)
  if (protocolError || !duplicatedProtocol) {
    throw new Error('A cÃ³pia foi criada, mas a recarga do protocolo local falhou.')
  }

  return duplicatedProtocol as ProtocolRecord
}

async function duplicateGlobalProtocolToClinicLegacy(
  clinicId: string,
  userId: string,
  globalProtocolId: string
): Promise<ProtocolRecord> {
  const bundle = await loadGlobalProtocolBundle(globalProtocolId)
  if (!bundle) {
    throw new Error('Protocolo global não encontrado.')
  }

  const duplicatedProtocol = await saveProtocolBundle(clinicId, userId, {
    protocol: {
      name: `${bundle.protocol.name} (cópia)`,
      description: bundle.protocol.description,
      species: bundle.protocol.species,
      duration_summary: null,
      tags: bundle.protocol.tags,
      is_control_special: bundle.protocol.is_control_special,
      exams_justification: bundle.protocol.exams_justification,
      metadata: {
        ...(bundle.protocol.metadata || {}),
        source_global_protocol_id: bundle.protocol.id,
        source_global_protocol_slug: bundle.protocol.slug,
        source_type: 'global_protocol',
      },
    },
    medications: bundle.medications.map((medication, index) => ({
      medication_id: null,
      presentation_id: null,
      manual_medication_name:
        medication.manual_medication_name ||
        medication.medication_name ||
        'Medicamento',
      manual_presentation_label:
        medication.manual_presentation_label ||
        medication.presentation_text ||
        null,
      concentration_value: medication.concentration_value ?? null,
      concentration_unit: medication.concentration_unit ?? null,
      dose_value: medication.dose_value ?? null,
      dose_unit: medication.dose_unit ?? null,
      route: medication.route ?? null,
      frequency_type: medication.frequency_type,
      times_per_day: medication.times_per_day ?? null,
      interval_hours: medication.interval_hours ?? null,
      duration_days: medication.duration_days ?? null,
      is_controlled: !!medication.is_controlled,
      sort_order: index,
    })),
    recommendations: bundle.recommendations.map((recommendation, index) => ({
      text: recommendation.text,
      sort_order: index,
    })),
  })

  const examPayload = (bundle.examItems || [])
    .filter((exam) => String(exam.label || '').trim())
    .map((exam) => ({
      clinic_id: clinicId,
      protocol_id: duplicatedProtocol.id,
      exam_key: exam.exam_key || 'custom',
      label: String(exam.label || '').trim(),
      is_custom: !!exam.is_custom,
    }))

  if (examPayload.length) {
    const { error } = await supabase.from('protocol_exam_items').insert(examPayload)
    logSbError('[ProtocolsRepo] duplicateGlobalProtocolToClinic exam items insert error', error)
    if (error) throw error
  }

  return duplicatedProtocol
}

// ============================================================
// DELETE PROTOCOL
// ============================================================

export async function deleteProtocol(clinicId: string, userId: string, protocolId: string): Promise<void> {
  // Delete children first (in case no DB cascade is configured)
  await supabase
    .from('protocol_medications')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('protocol_id', protocolId)

  await supabase
    .from('protocol_recommendations')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('protocol_id', protocolId)

  const { error } = await supabase
    .from('protocols')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', protocolId)

  logSbError('[ProtocolsRepo] deleteProtocol error', error)
  if (error) throw error
}

function normalizeName(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

export async function ensureDefaultSpecialtyProtocolSeed(clinicId: string, userId: string): Promise<void> {
  const existingFolders = await listFolders(clinicId, userId)
  const folderByName = new Map(existingFolders.map((f) => [normalizeName(f.name), f]))

  for (let i = 0; i < DEFAULT_SPECIALTY_PROTOCOLS.length; i += 1) {
    const seed = DEFAULT_SPECIALTY_PROTOCOLS[i]
    const key = normalizeName(seed.folderName)
    if (folderByName.has(key)) continue

    const { data: created, error } = await supabase
      .from('protocol_folders')
      .upsert(
        {
          clinic_id: clinicId,
          owner_user_id: userId,
          name: seed.folderName,
          icon_key: seed.iconKey,
          color: seed.color,
          sort_order: i,
        },
        { onConflict: 'clinic_id,owner_user_id,name' } // Hypothetical robust key
      )
      .select('*')
      .single()

    if (!error && created) {
      folderByName.set(key, created as ProtocolFolderRecord)
    } else {
      // Fallback if upsert constraint doesn't exist – manual check already done
      const fallback = await createFolder(clinicId, userId, {
        name: seed.folderName,
        icon_key: seed.iconKey,
        color: seed.color,
        sort_order: i,
      })
      folderByName.set(key, fallback)
    }
  }

  const allProtocols = await listProtocols(clinicId, userId)
  const protocolKeySet = new Set(
    allProtocols.map((p) => `${p.folder_id || 'root'}::${normalizeName(p.name)}`)
  )

  for (const seed of DEFAULT_SPECIALTY_PROTOCOLS) {
    const folder = folderByName.get(normalizeName(seed.folderName))
    if (!folder) continue
    const key = `${folder.id}::${normalizeName(seed.protocolName)}`
    if (protocolKeySet.has(key)) continue

    // Use saveProtocolBundle which already handles logic, but we ensure idempotency via name check above
    await saveProtocolBundle(clinicId, userId, {
      protocol: {
        folder_id: folder.id,
        name: seed.protocolName,
        description: seed.description,
        species: null,
        duration_summary: null,
        tags: ['exemplo', 'editável'],
        is_control_special: false,
        exams_justification: null,
      },
      medications: [],
      recommendations: seed.recommendations.map((text, idx) => ({ text, sort_order: idx })),
    })
  }
}
