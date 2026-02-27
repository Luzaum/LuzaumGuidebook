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
  /** UI-only display name — NOT sent to DB */
  medication_name?: string
  presentation_id: string | null
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
}

/** `protocol_recommendations` uses column `text` (not `recommendation_text`). */
export type ProtocolRecommendation = {
  id?: string
  text: string
  sort_order: number
}

/** Bundle without exam_items (table does not exist in this schema). */
export type ProtocolBundle = {
  protocol: ProtocolRecord
  medications: ProtocolMedicationItem[]
  recommendations: ProtocolRecommendation[]
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

  if (medError) logSbError('[ProtocolsRepo] loadProtocolBundle medications error', medError)
  if (recError) logSbError('[ProtocolsRepo] loadProtocolBundle recommendations error', recError)

  return {
    protocol: protocol as ProtocolRecord,
    medications: (medications ?? []).map((m) => ({
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
    })) as ProtocolMedicationItem[],
    recommendations: (recommendations ?? []).map((r) => ({
      id: r.id,
      text: r.text ?? '',    // column is `text` in DB
      sort_order: r.sort_order ?? 0,
    })) as ProtocolRecommendation[],
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
