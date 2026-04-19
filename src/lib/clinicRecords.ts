import { supabase } from './supabaseClient'
import { insertWithClinicId, selectByClinicId, softDeleteWithClinicId, logSbError } from './clinicScopedDb'
import {
  buildConcentrationLabel,
  type CanonicalMedication,
  findGlobalMedicationById,
  getGlobalCatalogMedications,
  mergeCatalogSearchResults,
  getPresentationMetadata,
  isGlobalMedicationId,
  makeGlobalMedicationId,
  parseGlobalMedicationId,
  normalizeCatalogKey,
  type CatalogSource,
} from './medicationCatalog'

// ==================== WHITELIST MAPPERS (CATÁLOGO 3.0) ====================
// Purpose: Prevent PGRST204 errors by only sending fields that exist in Supabase schema

/**
 * Whitelist de campos permitidos em medications
 * ATUALIZAR esta lista quando adicionar colunas no Supabase
 * ⚠️ IMPORTANTE: Use os nomes EXATOS das colunas do Supabase
 */
const MEDICATION_ALLOWED_FIELDS = [
  'id',
  'clinic_id',
  'created_by',
  'owner_user_id',
  'is_private',
  'name',
  'notes',
  'is_controlled',
  'species', // ✅ CORRETO: text[] no banco (não species_targets!)
  'routes', // ✅ CORRETO: text[] no banco (não route_group!)
  'is_active', // boolean
  'metadata', // jsonb: { active_ingredient, tags, therapeutic_class, etc }
  'created_at',
  'updated_at',
] as const

/**
 * Whitelist de campos permitidos em medication_presentations
 * ATUALIZAR esta lista quando adicionar colunas no Supabase
 */
const PRESENTATION_ALLOWED_FIELDS = [
  'id',
  'clinic_id',
  'medication_id',
  'pharmaceutical_form',
  'concentration_text',
  'additional_component',
  'presentation_unit',
  'commercial_name',
  'value',
  'value_unit',
  'per_value',
  'per_unit',
  'avg_price_brl',
  'pharmacy_veterinary',
  'pharmacy_human',
  'pharmacy_compounding',
  'metadata', // jsonb: { manufacturer, administration_routes, palatable, obs, etc }
  'package_quantity',
  'package_unit',
  'created_at',
  'updated_at',
] as const

/**
 * Filtra um objeto mantendo apenas campos da whitelist de medications
 * @param draft - Objeto com campos de medication (pode ter campos extras da UI)
 * @returns Objeto limpo com apenas campos permitidos
 */
export function pickMedicationFields(draft: any): any {
  const allowed = new Set(MEDICATION_ALLOWED_FIELDS)
  const result: any = {}
  const extraFields: string[] = []

  for (const key in draft) {
    if (allowed.has(key as any)) {
      result[key] = draft[key]
    } else {
      extraFields.push(key)
    }
  }

  if (extraFields.length > 0) {
    console.warn(
      `[pickMedicationFields] ⚠️ Campos ignorados (não existem no schema):`,
      extraFields,
      '\n📋 Campos permitidos:',
      Array.from(allowed)
    )
  }

  return result
}

/**
 * Filtra um objeto mantendo apenas campos da whitelist de medication_presentations
 * @param draft - Objeto com campos de presentation (pode ter campos extras da UI)
 * @returns Objeto limpo com apenas campos permitidos
 */
export function pickPresentationFields(draft: any): any {
  const allowed = new Set(PRESENTATION_ALLOWED_FIELDS)
  const result: any = {}
  const extraFields: string[] = []

  for (const key in draft) {
    if (allowed.has(key as any)) {
      result[key] = draft[key]
    } else {
      extraFields.push(key)
    }
  }

  if (extraFields.length > 0) {
    console.warn(
      `[pickPresentationFields] ⚠️ Campos ignorados (não existem no schema):`,
      extraFields,
      '\n📋 Campos permitidos:',
      Array.from(allowed)
    )
  }

  return result
}

// ==================== EXISTING TYPES ====================

export type TutorInsertInput = {
  full_name: string
  phone?: string
  email?: string
  document_id?: string
  cpf?: string
  rg?: string
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  zipcode?: string
  address_complement?: string
  notes?: string
}

export type PatientInsertInput = {
  tutor_id: string
  name: string
  species?: string
  breed?: string
  sex?: string
  neutered?: boolean | string | null
  age_text?: string
  weight_kg?: string
  coat?: string
  microchipped?: boolean
  anamnesis?: string
  notes?: string
}

export async function insertTutor(input: TutorInsertInput, clinicId?: string) {
  return insertWithClinicId('tutors', input, clinicId)
}

export async function insertPatient(input: PatientInsertInput, clinicId?: string) {
  return insertWithClinicId('patients', input, clinicId)
}

export async function listTutors(clinicId?: string) {
  return selectByClinicId('tutors', clinicId)
}

export async function listPatients(clinicId?: string) {
  return selectByClinicId('patients', clinicId)
}

export async function deleteTutorSoft(tutorId: string, clinicId?: string) {
  return softDeleteWithClinicId('tutors', tutorId, clinicId)
}

export async function deleteTutorsSoft(tutorIds: string[], clinicId?: string) {
  return softDeleteWithClinicId('tutors', tutorIds, clinicId)
}

export async function deletePatientSoft(patientId: string, clinicId?: string) {
  return softDeleteWithClinicId('patients', patientId, clinicId)
}

export type WeightInsertInput = {
  patient_id: string
  weight_kg: string
  measured_at: string
  notes?: string
}

export async function insertWeight(input: WeightInsertInput, clinicId?: string) {
  return insertWithClinicId('patient_weights', input, clinicId)
}

export type WeightRecord = {
  id: string
  patient_id: string
  weight_kg: number
  measured_at: string
  notes: string | null
}

function normalizeMeasuredAt(input?: string): string {
  if (!input) {
    const today = new Date()
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return input
  }

  const date = new Date(input)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export async function insertPatientWeight({
  patientId,
  clinicId,
  weightKg,
  notes,
  measuredAt,
}: {
  patientId: string
  clinicId: string
  weightKg: number
  notes?: string
  measuredAt?: string
}) {
  console.log('[WeightInsert] START', { patientId, clinicId, weightKg, measuredAt })

  if (!patientId || !clinicId || !weightKg) {
    console.warn('[WeightInsert] invalid params')
    return
  }

  const normalizedMeasuredAt = normalizeMeasuredAt(measuredAt)
  console.log('[WeightInsert] normalized measured_at', { normalizedMeasuredAt })

  const { data: weightData, error: weightError } = await supabase
    .from('patient_weights')
    .upsert(
      {
        clinic_id: clinicId,
        patient_id: patientId,
        weight_kg: weightKg,
        measured_at: normalizedMeasuredAt,
        notes: notes ?? null,
      },
      {
        onConflict: 'patient_id,measured_at',
        ignoreDuplicates: false,
      }
    )
    .select('id, patient_id, weight_kg, measured_at, notes')

  console.log('[WeightInsert] RESULT history', { weightData, weightError })
  logSbError('[WeightInsert] HISTORY ERROR', weightError)

  if (weightError) {
    return { error: weightError }
  }

  const { data: updateData, error: updateError } = await supabase
    .from('patients')
    .update({
      weight_kg: weightKg,
    })
    .eq('id', patientId)
    .eq('clinic_id', clinicId)
    .select('id, weight_kg')

  console.log('[WeightInsert] RESULT patient update', { updateData, updateError })
  logSbError('[WeightInsert] PATIENT UPDATE ERROR', updateError)

  if (updateError) {
    return { error: updateError }
  }

  console.log('[WeightInsert] SUCCESS')
  return { error: null }
}

export async function loadPatientWeights(patientId: string, clinicId: string): Promise<WeightRecord[]> {
  console.log('[WeightLoad] START', { patientId, clinicId })

  const { data, error } = await supabase
    .from('patient_weights')
    .select(`
      id,
      patient_id,
      weight_kg,
      measured_at,
      notes
    `)
    .eq('patient_id', patientId)
    .eq('clinic_id', clinicId)
    .order('measured_at', { ascending: true })

  console.log('[WeightLoad] RESULT', { count: data?.length, error })
  logSbError('[WeightLoad] ERROR', error)

  if (error) return []

  return data ?? []
}

export type MedicationInsertInput = {
  name: string
  active_ingredient?: string
  concentration?: string
  pharmaceutical_form?: string
  routes?: string[]
  species?: string[]
  is_controlled?: boolean
  notes?: string
  tags?: string[]
  is_private?: boolean
}

export type MedicationRecord = {
  id: string
  clinic_id: string
  created_by: string
  name: string
  notes: string | null
  is_controlled: boolean
  is_private: boolean
  owner_user_id: string | null
  species: string[] | null
  routes: string[] | null
  species_targets?: string[] | null
  is_active: boolean
  metadata: any
  created_at: string
  updated_at?: string
  source?: CatalogSource
}

export async function insertMedication(
  input: MedicationInsertInput,
  clinicId: string,
  userId: string
): Promise<MedicationRecord> {
  console.log('[MedicationInsert] START', { input, clinicId })

  const payload = {
    clinic_id: clinicId,
    created_by: userId,
    is_private: input.is_private ?? false,
    owner_user_id: input.is_private ? userId : null,
    name: input.name.trim(),
    active_ingredient: input.active_ingredient?.trim() || null,
    concentration: input.concentration?.trim() || null,
    pharmaceutical_form: input.pharmaceutical_form?.trim() || null,
    routes: input.routes?.length ? input.routes : null,
    species: input.species?.length ? input.species : null,
    is_controlled: input.is_controlled ?? false,
    notes: input.notes?.trim() || null,
    tags: input.tags?.length ? input.tags : null,
  }

  const { data, error } = await supabase
    .from('medications')
    .insert(payload)
    .select('*')
    .single()

  console.log('[MedicationInsert] RESULT', { data, error })
  logSbError('[MedicationInsert] ERROR', error)

  if (error) throw error
  return data
}

export async function saveMedication(params: {
  clinicId: string;
  userId: string;
  medication: {
    id?: string;
    name: string;
    notes?: string | null;
    is_controlled?: boolean;
    species?: string[] | null;
    routes?: string[] | null;
    species_targets?: string[] | null;
    is_active?: boolean;
    metadata?: any;
  };
  medicationId?: string;
  presentations: Array<
    Partial<MedicationPresentationRecord> & {
      medication_id?: string;
      metadata?: any;
    }
  >;
}): Promise<{ medication: MedicationRecord; presentations: MedicationPresentationRecord[] }> {
  const clinicId = String(params.clinicId || '').trim()
  const userId = String(params.userId || '').trim()
  if (!clinicId) throw new Error('clinic_id ausente. RLS bloqueia insert sem clinic_id.')
  if (!userId) throw new Error('user_id ausente ao salvar medicamento.')

  const name = String(params.medication.name || '').trim()
  if (!name) throw new Error('Nome do medicamento é obrigatório.')

  const medPayload: any = pickMedicationFields({
    clinic_id: clinicId,
    created_by: userId,
    owner_user_id: userId,
    is_private: true,
    name,
    notes: params.medication.notes ? String(params.medication.notes).trim() : null,
    is_controlled: !!params.medication.is_controlled,
    species: params.medication.species || params.medication.species_targets || null,
    routes: params.medication.routes || null,
    is_active: params.medication.is_active ?? true,
    metadata: params.medication.metadata || {},
  });

  let medication: any;
  let medicationId = params.medicationId || params.medication.id;

  if (medicationId) {
    const { data, error } = await supabase
      .from('medications')
      .update(medPayload)
      .eq('clinic_id', clinicId)
      .eq('id', medicationId)
      .select('*')
      .single();
    if (error) throw error;
    medication = data;
  } else {
    const { data, error } = await supabase
      .from('medications')
      .insert(medPayload)
      .select('*')
      .single();
    if (error) throw error;
    medication = data;
    medicationId = medication?.id;
  }

  if (!medicationId) {
    throw new Error('Falha ao obter id do medicamento inserido/atualizado.');
  }

  // Replace all presentations
  await supabase
    .from('medication_presentations')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('medication_id', medicationId);

  const rows = (params.presentations || []).map((p, idx) => {
    return pickPresentationFields({
      clinic_id: clinicId,
      medication_id: medicationId,
      pharmaceutical_form: p.pharmaceutical_form || null,
      concentration_text: p.concentration_text || null,
      additional_component: p.additional_component || null,
      presentation_unit: p.presentation_unit || null,
      commercial_name: p.commercial_name || null,
      value: typeof p.value === 'number' ? p.value : p.value ? Number(p.value) : null,
      value_unit: p.value_unit || null,
      per_value: typeof p.per_value === 'number' ? p.per_value : p.per_value ? Number(p.per_value) : null,
      per_unit: p.per_unit || null,
      avg_price_brl: typeof p.avg_price_brl === 'number' ? p.avg_price_brl : p.avg_price_brl ? Number(p.avg_price_brl) : null,
      pharmacy_veterinary: !!p.pharmacy_veterinary,
      pharmacy_human: !!p.pharmacy_human,
      pharmacy_compounding: !!p.pharmacy_compounding,
      metadata: p.metadata || {},
      package_quantity: typeof p.package_quantity === 'number' ? p.package_quantity : p.package_quantity ? Number(p.package_quantity) : null,
      package_unit: p.package_unit || null,
    });
  });

  // DEV log para garantir que não há campos antigos
  console.log('[saveMedication] rows ->', rows);
  rows.forEach((row) => {
    if ('concentration_unit' in row || 'concentration_value' in row || 'pharmacyTags' in row || 'label' in row) {
      console.warn('[saveMedication] row contém campo inválido:', row);
    }
  });

  let presentations: any[] = [];
  if (rows.length > 0) {
    const { data: presData, error: presError } = await supabase
      .from('medication_presentations')
      .insert(rows)
      .select('*');
    if (presError) {
      console.error('[saveMedication] insert presentations error', presError);
      throw presError;
    }
    presentations = presData || [];
  }

  return {
    medication: medication as MedicationRecord,
    presentations: presentations as MedicationPresentationRecord[],
  };
}

export async function listMedications(clinicId: string): Promise<MedicationRecord[]> {
  console.log('[MedicationList] START', { clinicId })

  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('clinic_id', clinicId)
    .order('name', { ascending: true })

  console.log('[MedicationList] RESULT', { count: data?.length, error })
  logSbError('[MedicationList] ERROR', error)

  if (error) throw error
  return data ?? []
}

export type MedicationSearchResult = {
  id: string
  name: string
  is_controlled: boolean
  is_private: boolean
  metadata: any
  source?: CatalogSource
  scope?: CatalogSource
  /** Contagem de linhas em medication_recommended_doses (só preenchida na busca da clínica). */
  recommended_dose_count?: number
  pharmacy_origin?: string
  default_route?: string
}

type GlobalMedicationRow = {
  id: string
  slug: string
  name: string
  active_ingredient: string | null
  is_controlled: boolean
  is_active: boolean
  notes: string | null
  tags: string[] | null
  species: string[] | null
  routes: string[] | null
  metadata: Record<string, unknown> | null
}

type GlobalMedicationPresentationRow = {
  id: string
  global_medication_id: string
  slug: string
  pharmaceutical_form: string | null
  concentration_text: string | null
  additional_component: string | null
  presentation_unit: string | null
  commercial_name: string | null
  value: number | null
  value_unit: string | null
  per_value: number | null
  per_unit: string | null
  package_quantity: number | null
  package_unit: string | null
  avg_price_brl: number | null
  pharmacy_veterinary: boolean
  pharmacy_human: boolean
  pharmacy_compounding: boolean
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

type GlobalMedicationRecommendedDoseRow = {
  id: string
  global_medication_id: string
  slug: string
  species: string
  route: string
  dose_value: number
  dose_unit: string
  frequency: string | null
  notes: string | null
  metadata: Record<string, unknown> | null
  is_active: boolean
  sort_order: number | null
  created_at: string
  updated_at: string
}

function mapGlobalMedicationToSearchResult(input: Pick<CanonicalMedication, 'slug' | 'name' | 'active_ingredient' | 'is_controlled' | 'metadata'>): MedicationSearchResult {
  const slug = normalizeCatalogKey(input.slug || input.name)
  return {
    id: makeGlobalMedicationId(slug),
    name: input.name,
    is_controlled: !!input.is_controlled,
    is_private: false,
    metadata: {
      ...(input.metadata || {}),
      active_ingredient: input.active_ingredient || null,
      source: 'global',
      global_slug: slug,
    },
    source: 'global',
    scope: 'global',
  }
}

function mapGlobalMedicationRowToSearchResult(input: GlobalMedicationRow): MedicationSearchResult {
  return mapGlobalMedicationToSearchResult({
    slug: input.slug,
    name: input.name,
    active_ingredient: input.active_ingredient,
    is_controlled: input.is_controlled,
    metadata: input.metadata,
  })
}

async function fetchGlobalMedicationRows(query: string, limit: number): Promise<GlobalMedicationRow[]> {
  const q = query.trim()
  let request = supabase
    .from('global_medications')
    .select('id,slug,name,active_ingredient,is_controlled,is_active,notes,tags,species,routes,metadata')
    .eq('is_active', true)
    .order('name', { ascending: true })
    .limit(limit)

  if (q) {
    request = request.or(`name.ilike.%${q}%,active_ingredient.ilike.%${q}%`)
  }

  const { data, error } = await request
  if (!error) return (data ?? []) as GlobalMedicationRow[]

  console.warn('[GlobalMedicationSearch] fallback to bundled JSON', error)
  const loweredQuery = q.toLowerCase()
  return getGlobalCatalogMedications()
    .filter((entry) => {
      if (!q) return true
      const haystack = [
        entry.name,
        entry.active_ingredient || '',
        ...(entry.routes || []),
        ...(entry.species || []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(loweredQuery)
    })
    .slice(0, limit)
    .map((entry, index) => ({
      id: entry.id || `json-global-${index + 1}`,
      slug: entry.slug,
      name: entry.name,
      active_ingredient: entry.active_ingredient || null,
      is_controlled: !!entry.is_controlled,
      is_active: entry.is_active !== false,
      notes: entry.notes || null,
      tags: entry.tags || null,
      species: entry.species || null,
      routes: entry.routes || null,
      metadata: entry.metadata || {},
    }))
}

async function resolveGlobalMedicationBySlug(slug: string): Promise<GlobalMedicationRow | null> {
  const normalizedSlug = normalizeCatalogKey(slug)
  const { data, error } = await supabase
    .from('global_medications')
    .select('id,slug,name,active_ingredient,is_controlled,is_active,notes,tags,species,routes,metadata')
    .eq('slug', normalizedSlug)
    .single()

  if (!error && data) return data as GlobalMedicationRow

  const fallback = findGlobalMedicationById(makeGlobalMedicationId(normalizedSlug))
  if (!fallback) return null
  return {
    id: fallback.id || normalizedSlug,
    slug: fallback.slug,
    name: fallback.name,
    active_ingredient: fallback.active_ingredient || null,
    is_controlled: !!fallback.is_controlled,
    is_active: fallback.is_active !== false,
    notes: fallback.notes || null,
    tags: fallback.tags || null,
    species: fallback.species || null,
    routes: fallback.routes || null,
    metadata: fallback.metadata || {},
  }
}

/**
 * Medicamentos de homologação / QA (ex.: "QA FLOW A 12H") não entram na busca para prescrição.
 */
export function isQaFlowHomologMedicationName(name: string | null | undefined): boolean {
  const n = String(name || '').trim().toLowerCase()
  if (!n) return false
  return /\bqa[\s_-]*flow\b/.test(n) || n.startsWith('qa flow')
}

function filterPrescriptionCatalogSearch<T extends { name?: string | null }>(rows: T[]): T[] {
  return rows.filter((row) => !isQaFlowHomologMedicationName(row.name))
}

function parseRecommendedDoseCountFromMedicationRow(row: Record<string, unknown>): number {
  const nested = row.medication_recommended_doses
  if (!Array.isArray(nested) || nested.length === 0) return 0
  const c = (nested[0] as { count?: number })?.count
  const n = typeof c === 'number' ? c : Number(c)
  return Number.isFinite(n) && n > 0 ? n : 0
}

/** Limite de linhas ao listar catálogo da clínica sem filtro (alinha ao Catálogo 3 / listMedications). */
const SEARCH_CLINIC_BROWSE_MAX = 20000
/** Limite de globais quando não há query (browse). */
const SEARCH_GLOBAL_BROWSE_MAX = 4000

export async function searchMedications(
  clinicId: string,
  query: string,
  limit = 50 // máximo de resultados devolvidos após mesclar + ordenar
): Promise<MedicationSearchResult[]> {
  console.log('[MedicationSearch] START', { clinicId, query, limit })

  const q = query.trim()
  const browseMode = !q
  /** Quantas linhas buscar em cada fonte antes de mesclar (não confundir com `limit` final). */
  const clinicFetchLimit = browseMode
    ? SEARCH_CLINIC_BROWSE_MAX
    : Math.min(Math.max(limit, 1), 600)
  const globalFetchLimit = browseMode ? SEARCH_GLOBAL_BROWSE_MAX : Math.min(Math.max(limit, 1), 600)

  const mapClinicRows = (rows: Record<string, unknown>[]): MedicationSearchResult[] =>
    rows.map((raw) => {
      const { medication_recommended_doses: _nested, ...entry } = raw
      return {
        ...(entry as Omit<MedicationSearchResult, 'source' | 'scope' | 'recommended_dose_count'>),
        recommended_dose_count: parseRecommendedDoseCountFromMedicationRow(raw),
        source: 'clinic' as const,
        scope: 'clinic' as const,
      }
    })

  let request = supabase
    .from('medications')
    .select('id,name,is_controlled,is_private,metadata,medication_recommended_doses(count)')
    .eq('clinic_id', clinicId)

  // ✅ OBJ 3: Se tem query, filtra por nome; senão, lista inicial
  if (q) {
    request = request.ilike('name', `%${q}%`)
  }

  request = request.order('name', { ascending: true }).limit(clinicFetchLimit)

  let { data, error } = await request

  if (error) {
    console.warn('[MedicationSearch] embed count failed, falling back without doses count', error)
    let fb = supabase
      .from('medications')
      .select('id,name,is_controlled,is_private,metadata')
      .eq('clinic_id', clinicId)
    if (q) {
      fb = fb.ilike('name', `%${q}%`)
    }
    fb = fb.order('name', { ascending: true }).limit(clinicFetchLimit)
    const retry = await fb
    data = retry.data
    error = retry.error
    if (error) throw error
    const clinicResults = (data ?? []).map((entry) => ({
      ...entry,
      recommended_dose_count: 0,
      source: 'clinic' as const,
      scope: 'clinic' as const,
    }))
    const globalRows = await fetchGlobalMedicationRows(q, globalFetchLimit)
    const globalResults = globalRows.map(mapGlobalMedicationRowToSearchResult)
    return filterPrescriptionCatalogSearch(
      mergeCatalogSearchResults([...clinicResults, ...globalResults], limit)
    )
  }

  console.log('[MedicationSearch] RESULT', { count: data?.length, error: null })
  const clinicResults = mapClinicRows((data ?? []) as Record<string, unknown>[])

  const globalRows = await fetchGlobalMedicationRows(q, globalFetchLimit)
  const globalResults = globalRows.map(mapGlobalMedicationRowToSearchResult)

  return filterPrescriptionCatalogSearch(
    mergeCatalogSearchResults([...clinicResults, ...globalResults], limit)
  )
}

export async function loadMedicationsList(clinicId: string): Promise<{ id: string; name: string }[]> {
  console.log('[MedicationListSimple] START', { clinicId })

  const { data, error } = await supabase
    .from('medications')
    .select('id,name')
    .eq('clinic_id', clinicId)
    .order('name', { ascending: true })

  console.log('[MedicationListSimple] RESULT', { count: data?.length, error })
  logSbError('[MedicationListSimple] ERROR', error)

  if (error) throw error
  return data ?? []
}

export async function getMedicationDetails(clinicId: string, medicationId: string): Promise<MedicationRecord | null> {
  console.log('[MedicationDetails] START', { clinicId, medicationId })

  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('id', medicationId)
    .single()

  console.log('[MedicationDetails] RESULT', { data: !!data, error })
  logSbError('[MedicationDetails] ERROR', error)

  if (error) return null
  return data
}

export type MedicationPresentationRecord = {
  id: string
  clinic_id: string
  medication_id: string
  pharmaceutical_form: string | null
  concentration_text: string | null
  additional_component: string | null
  presentation_unit: string | null
  commercial_name: string | null
  value: number | null
  value_unit: string | null
  per_value: number | null
  per_unit: string | null
  avg_price_brl: number | null
  pharmacy_veterinary: boolean
  pharmacy_human: boolean
  pharmacy_compounding: boolean
  metadata: any,
  package_quantity?: number | null
  package_unit?: string | null
  created_at: string
  updated_at?: string
  source?: CatalogSource
}

export async function getMedicationPresentations(
  clinicId: string,
  medicationId: string
): Promise<MedicationPresentationRecord[]> {
  if (isGlobalMedicationId(medicationId)) {
    const medication = await resolveGlobalMedicationBySlug(parseGlobalMedicationId(medicationId))
    if (!medication) return []

    const { data, error } = await supabase
      .from('global_medication_presentations')
      .select('*')
      .eq('global_medication_id', medication.id)
      .order('slug', { ascending: true })

    if (!error) {
      return ((data ?? []) as GlobalMedicationPresentationRow[]).map((presentation) => ({
        id: presentation.id,
        clinic_id: '',
        medication_id: medicationId,
        pharmaceutical_form: presentation.pharmaceutical_form || null,
        concentration_text: buildConcentrationLabel(presentation) || presentation.concentration_text || null,
        additional_component: presentation.additional_component || null,
        presentation_unit: presentation.presentation_unit || null,
        commercial_name: presentation.commercial_name || null,
        value: presentation.value ?? null,
        value_unit: presentation.value_unit || null,
        per_value: presentation.per_value ?? null,
        per_unit: presentation.per_unit || null,
        avg_price_brl: presentation.avg_price_brl ?? null,
        pharmacy_veterinary: presentation.pharmacy_veterinary !== false,
        pharmacy_human: !!presentation.pharmacy_human,
        pharmacy_compounding: !!presentation.pharmacy_compounding,
        metadata: getPresentationMetadata(presentation),
        package_quantity: presentation.package_quantity ?? null,
        package_unit: presentation.package_unit || null,
        created_at: presentation.created_at,
        updated_at: presentation.updated_at,
        source: 'global',
      }))
    }

    console.warn('[GlobalMedicationPresentations] fallback to bundled JSON', error)
    const fallback = findGlobalMedicationById(medicationId)
    if (!fallback) return []
    return (fallback.presentations || []).map((presentation, index) => ({
      id: presentation.id || `${medicationId}-presentation-${index + 1}`,
      clinic_id: '',
      medication_id: medicationId,
      pharmaceutical_form: presentation.pharmaceutical_form || null,
      concentration_text: buildConcentrationLabel(presentation) || presentation.concentration_text || null,
      additional_component: presentation.additional_component || null,
      presentation_unit: presentation.presentation_unit || null,
      commercial_name: presentation.commercial_name || null,
      value: presentation.value ?? null,
      value_unit: presentation.value_unit || null,
      per_value: presentation.per_value ?? null,
      per_unit: presentation.per_unit || null,
      avg_price_brl: presentation.avg_price_brl ?? null,
      pharmacy_veterinary: presentation.pharmacy_veterinary !== false,
      pharmacy_human: !!presentation.pharmacy_human,
      pharmacy_compounding: !!presentation.pharmacy_compounding,
      metadata: getPresentationMetadata(presentation),
      package_quantity: presentation.package_quantity ?? null,
      package_unit: presentation.package_unit || null,
      created_at: '',
      updated_at: '',
      source: 'global',
    }))
  }

  console.log('[MedicationPresentations] START', { clinicId, medicationId })

  const { data, error } = await supabase
    .from('medication_presentations')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('medication_id', medicationId)
    .order('created_at', { ascending: true })

  console.log('[MedicationPresentations] RESULT', { count: data?.length, error })
  logSbError('[MedicationPresentations] ERROR', error)

  if (error) throw error
  return data ?? []
}

// ==================== DOSES RECOMENDADAS ====================

export interface RecommendedDose {
  id?: string
  clinic_id?: string
  medication_id?: string
  species: string // 'cão', 'gato', 'ambos', etc
  route: string // 'VO', 'IV', 'IM', 'SC', etc
  dose_value: number // dose mínima (ou fixa se dose_max é null)
  dose_max?: number | null // dose máxima da faixa
  dose_unit: string // 'mg/kg', 'mL/kg', 'UI/kg', etc
  per_weight_unit?: string | null // 'kg', null se não é por peso
  indication?: string | null // indicação clínica
  frequency: string | null // texto legível
  frequency_min?: number | null // freq mínima (vezes/dia)
  frequency_max?: number | null // freq máxima (vezes/dia)
  /** Modo semântico (metadata + pick); pode ser single_dose/repeat_interval; coluna no DB pode ser `custom` por compat. */
  frequency_mode?: string | null
  /** Legado/import: intervalo em horas quando o catálogo não usa só frequency_min */
  interval_hours?: number | null
  frequency_text?: string | null // texto livre
  recurrence_value?: number | null
  recurrence_unit?: string | null
  duration?: string | null // duração recomendada
  administration_basis?: string | null
  administration_amount?: number | null
  administration_unit?: string | null
  administration_target?: string | null
  is_single_dose?: boolean | null
  repeat_periodically?: boolean | null
  calculator_default_dose?: number | null
  calculator_default_frequency?: number | null
  notes: string | null
  metadata?: Record<string, unknown> | null
  is_active?: boolean
  sort_order?: number | null
  created_at?: string
  updated_at?: string
  source?: CatalogSource
}

function normalizeRecommendedDoseMetadata(input: any): Record<string, unknown> {
  return (input && typeof input === 'object' && !Array.isArray(input)) ? { ...input } : {}
}

/** Modos semânticos suportados pela UI / catálogo (metadata é fonte de verdade). */
const MRD_SEMANTIC_FREQUENCY_MODES = new Set([
  'times_per_day',
  'every_x_hours',
  'custom',
  'single_dose',
  'repeat_interval',
])

/**
 * Normaliza o modo vindo da UI ou importações antigas.
 * Valores desconhecidos viram `custom` para não quebrar o CHECK do Postgres.
 */
function normalizeSemanticMrdFrequencyMode(raw: unknown): string {
  const s = typeof raw === 'string' ? raw.trim().toLowerCase() : String(raw ?? '').trim().toLowerCase()
  if (MRD_SEMANTIC_FREQUENCY_MODES.has(s)) return s
  return 'custom'
}

/**
 * Valor gravado na coluna `frequency_mode` do Supabase.
 * Constraints antigas (migration 20260319) só aceitam times_per_day | every_x_hours | custom.
 * Modos `single_dose` e `repeat_interval` (migration 20260405) ficam em metadata; na coluna usamos `custom`.
 * Assim o save funciona com ou sem a migration 20260405193000 aplicada no remoto.
 */
function coerceMrdFrequencyModeForDbColumn(semantic: string): string | null {
  if (!semantic) return null
  if (semantic === 'single_dose' || semantic === 'repeat_interval') return 'custom'
  return semantic
}

/**
 * INSERT omitia frequency_mode e o Postgres aplicava DEFAULT 'times_per_day';
 * o modo real ficava só em metadata — preferir metadata nesse caso legado.
 * Quando a coluna foi persistida como `custom` por compatibilidade, o modo semântico está em metadata.
 */
function pickFrequencyMode(row: any, metadata: Record<string, unknown>): string | null {
  const rv = row?.frequency_mode
  const mv = metadata.frequency_mode
  const r =
    rv !== undefined && rv !== null && rv !== '' ? String(rv).trim().toLowerCase() : ''
  const m =
    mv !== undefined && mv !== null && mv !== '' ? String(mv).trim().toLowerCase() : ''

  if (m && MRD_SEMANTIC_FREQUENCY_MODES.has(m)) {
    return String(metadata.frequency_mode).trim()
  }

  if (m && r === 'times_per_day' && m !== 'times_per_day') return String(mv).trim()
  if (r) return String(rv).trim()
  if (m) return String(mv).trim()
  return null
}

/** Backward compat: nomes legados → nomes canônicos */
function normalizeAdministrationBasisValue(raw: unknown): string | null {
  const s = typeof raw === 'string' ? raw.trim().toLowerCase() : ''
  if (!s) return null
  if (s === 'unit_per_animal' || s === 'per_animal') return 'per_animal'
  if (s === 'application_per_site' || s === 'per_application_site') return 'per_application_site'
  if (s === 'weight_band') return 'weight_band'
  if (s === 'weight_based') return 'weight_based'
  return null
}

function mapDoseRowToRecommendedDose(row: any, source: CatalogSource = 'clinic'): RecommendedDose {
  const metadata = normalizeRecommendedDoseMetadata(row?.metadata)
  const pick = (field: string, fallback: any = null) => {
    const rv = row?.[field]
    if (rv !== undefined && rv !== null && rv !== '') return rv
    const mv = metadata[field]
    if (mv !== undefined && mv !== null && mv !== '') return mv
    return fallback
  }

  return {
    id: row?.id,
    clinic_id: row?.clinic_id,
    medication_id: row?.medication_id,
    species: String(pick('species', 'ambos')),
    route: String(pick('route', 'VO')),
    dose_value: Number(pick('dose_value', 0)),
    dose_max: pick('dose_max', null) as number | null,
    dose_unit: String(pick('dose_unit', 'mg/kg')),
    per_weight_unit: pick('per_weight_unit', null) as string | null,
    indication: pick('indication', null) as string | null,
    frequency: pick('frequency', null) as string | null,
    frequency_min: pick('frequency_min', null) as number | null,
    frequency_max: pick('frequency_max', null) as number | null,
    frequency_mode: pickFrequencyMode(row, metadata) as string | null,
    interval_hours: pick('interval_hours', null) as number | null,
    frequency_text: pick('frequency_text', null) as string | null,
    recurrence_value: pick('recurrence_value', null) as number | null,
    recurrence_unit: pick('recurrence_unit', null) as string | null,
    duration: pick('duration', null) as string | null,
    administration_basis: normalizeAdministrationBasisValue(pick('administration_basis', null)),
    administration_amount: pick('administration_amount', null) as number | null,
    administration_unit: pick('administration_unit', null) as string | null,
    administration_target: pick('administration_target', null) as string | null,
    is_single_dose: pick('is_single_dose', null) as boolean | null,
    repeat_periodically: pick('repeat_periodically', null) as boolean | null,
    calculator_default_dose: pick('calculator_default_dose', null) as number | null,
    calculator_default_frequency: pick('calculator_default_frequency', null) as number | null,
    notes: pick('notes', null) as string | null,
    metadata,
    is_active: row?.is_active ?? true,
    sort_order: row?.sort_order ?? null,
    created_at: row?.created_at,
    updated_at: row?.updated_at,
    source,
  }
}

/**
 * Lista doses recomendadas de um medicamento
 */
export async function getMedicationRecommendedDoses(
  clinicId: string,
  medicationId: string
): Promise<RecommendedDose[]> {
  if (isGlobalMedicationId(medicationId)) {
    const medication = await resolveGlobalMedicationBySlug(parseGlobalMedicationId(medicationId))
    if (!medication) return []

    const { data, error } = await supabase
      .from('global_medication_recommended_doses')
      .select('*')
      .eq('global_medication_id', medication.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (!error) {
      return ((data ?? []) as GlobalMedicationRecommendedDoseRow[]).map((dose) =>
        mapDoseRowToRecommendedDose(
          {
            ...dose,
            clinic_id: null,
            medication_id: medicationId,
          },
          'global'
        )
      )
    }

    console.warn('[GlobalRecommendedDoses] fallback to bundled JSON', error)
    const fallback = findGlobalMedicationById(medicationId)
    if (!fallback) return []
    return (fallback.recommended_doses || []).map((dose, index) =>
      mapDoseRowToRecommendedDose(
        {
          ...dose,
          id: dose.id || `${medicationId}-dose-${index + 1}`,
          clinic_id: null,
          medication_id: medicationId,
          created_at: '',
          updated_at: '',
        },
        'global'
      )
    )
  }

  console.log('[RecommendedDoses] GET', { clinicId, medicationId })

  const { data, error } = await supabase
    .from('medication_recommended_doses')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('medication_id', medicationId)
    .order('created_at', { ascending: true })

  console.log('[RecommendedDoses] RESULT', { count: data?.length, error })
  logSbError('[RecommendedDoses] ERROR', error)

  if (error) throw error
  return (data ?? []).map((row: any) => mapDoseRowToRecommendedDose(row, 'clinic'))
}

/**
 * Salva doses recomendadas (upsert por id + delete das removidas)
 * @param clinicId - ID da clínica
 * @param medicationId - ID do medicamento
 * @param doses - Array de doses (com ou sem id)
 * @returns Doses salvas
 */
export async function saveMedicationRecommendedDoses(
  clinicId: string,
  medicationId: string,
  doses: Partial<RecommendedDose>[]
): Promise<RecommendedDose[]> {
  console.log('[RecommendedDoses] SAVE START', { clinicId, medicationId, count: doses.length })

  // STEP 1: Buscar doses existentes
  const existing = await getMedicationRecommendedDoses(clinicId, medicationId)
  const existingIds = new Set(existing.map(d => d.id))

  // STEP 2: Separar em: update (tem id) e insert (não tem id)
  const toUpdate = doses.filter(d => d.id && existingIds.has(d.id))
  const toInsert = doses.filter(d => !d.id)

  // STEP 3: IDs para deletar (existentes que não estão no novo array)
  const newIds = new Set(doses.filter(d => d.id).map(d => d.id))
  const toDelete = existing.filter(d => d.id && !newIds.has(d.id)).map(d => d.id!)

  console.log('[RecommendedDoses] Diff:', { toUpdate: toUpdate.length, toInsert: toInsert.length, toDelete: toDelete.length })

  // STEP 4: DELETE removidas
  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from('medication_recommended_doses')
      .delete()
      .in('id', toDelete)

    if (deleteError) {
      console.error('[RecommendedDoses] DELETE error:', deleteError)
      throw deleteError
    }
    console.log('[RecommendedDoses] Deleted', toDelete.length, 'doses')
  }

  // STEP 5: UPDATE existentes
  for (const dose of toUpdate) {
    const metadata = normalizeRecommendedDoseMetadata(dose.metadata)
    metadata.dose_max = dose.dose_max ?? metadata.dose_max ?? null
    metadata.per_weight_unit = dose.per_weight_unit ?? metadata.per_weight_unit ?? null
    metadata.indication = dose.indication ?? metadata.indication ?? null
    metadata.frequency_min = dose.frequency_min ?? metadata.frequency_min ?? null
    metadata.frequency_max = dose.frequency_max ?? metadata.frequency_max ?? null
    const semanticFm = normalizeSemanticMrdFrequencyMode(
      dose.frequency_mode ?? metadata.frequency_mode ?? 'times_per_day',
    )
    metadata.frequency_mode = semanticFm
    const frequencyModeColumn = coerceMrdFrequencyModeForDbColumn(semanticFm)
    metadata.frequency_text = dose.frequency_text ?? metadata.frequency_text ?? null
    metadata.recurrence_value = dose.recurrence_value ?? metadata.recurrence_value ?? null
    metadata.recurrence_unit = dose.recurrence_unit ?? metadata.recurrence_unit ?? null
    metadata.duration = dose.duration ?? metadata.duration ?? null
    metadata.administration_basis = dose.administration_basis ?? metadata.administration_basis ?? null
    metadata.administration_amount = dose.administration_amount ?? metadata.administration_amount ?? null
    metadata.administration_unit = dose.administration_unit ?? metadata.administration_unit ?? null
    metadata.administration_target = dose.administration_target ?? metadata.administration_target ?? null
    metadata.calculator_default_dose = dose.calculator_default_dose ?? metadata.calculator_default_dose ?? null
    metadata.calculator_default_frequency =
      dose.calculator_default_frequency ?? metadata.calculator_default_frequency ?? null

    const fm = semanticFm
    const isSingleDose =
      dose.is_single_dose ?? (fm === 'single_dose' || fm === 'repeat_interval') ?? false
    const isRepeatPeriodically = dose.repeat_periodically ?? (fm === 'repeat_interval') ?? false
    const canonicalBasis = normalizeAdministrationBasisValue(dose.administration_basis)
    const payload = {
      species: dose.species!,
      route: dose.route!,
      dose_value: dose.dose_value!,
      dose_unit: dose.dose_unit!,
      frequency: dose.frequency != null && String(dose.frequency).trim() !== '' ? dose.frequency : '',
      notes: dose.notes || null,
      metadata,
      dose_max: metadata.dose_max != null ? Number(metadata.dose_max) : null,
      per_weight_unit: (metadata.per_weight_unit as string | null) ?? null,
      indication: (metadata.indication as string | null) ?? null,
      frequency_min: metadata.frequency_min != null ? Number(metadata.frequency_min) : null,
      frequency_max: metadata.frequency_max != null ? Number(metadata.frequency_max) : null,
      frequency_mode: frequencyModeColumn,
      frequency_text: (metadata.frequency_text as string | null) ?? null,
      duration: (metadata.duration as string | null) ?? null,
      calculator_default_dose:
        metadata.calculator_default_dose != null ? Number(metadata.calculator_default_dose) : null,
      calculator_default_frequency:
        metadata.calculator_default_frequency != null
          ? Number(metadata.calculator_default_frequency)
          : null,
      // ── Fase 3A: canonical columns ──────────────────────────
      administration_basis: canonicalBasis,
      administration_amount: dose.administration_amount ?? null,
      administration_unit: dose.administration_unit ?? null,
      administration_target: dose.administration_target ?? null,
      is_single_dose: isSingleDose,
      repeat_periodically: isRepeatPeriodically,
      recurrence_value: dose.recurrence_value ?? null,
      recurrence_unit: dose.recurrence_unit ?? null,
      // ────────────────────────────────────────────────────────
      is_active: dose.is_active ?? true,
      sort_order: dose.sort_order ?? null,
      updated_at: new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('medication_recommended_doses')
      .update(payload)
      .eq('id', dose.id!)
      .eq('clinic_id', clinicId)

    if (updateError) {
      console.error('[RecommendedDoses] UPDATE error:', updateError)
      throw updateError
    }
  }

  if (toUpdate.length > 0) {
    console.log('[RecommendedDoses] Updated', toUpdate.length, 'doses')
  }

  // STEP 6: INSERT novas
  if (toInsert.length > 0) {
    const insertPayload = toInsert.map(d => {
      const metadata = normalizeRecommendedDoseMetadata(d.metadata)
      metadata.dose_max = d.dose_max ?? metadata.dose_max ?? null
      metadata.per_weight_unit = d.per_weight_unit ?? metadata.per_weight_unit ?? null
      metadata.indication = d.indication ?? metadata.indication ?? null
      metadata.frequency_min = d.frequency_min ?? metadata.frequency_min ?? null
      metadata.frequency_max = d.frequency_max ?? metadata.frequency_max ?? null
      const semanticFm = normalizeSemanticMrdFrequencyMode(
        d.frequency_mode ?? metadata.frequency_mode ?? 'times_per_day',
      )
      metadata.frequency_mode = semanticFm
      const frequencyModeColumn = coerceMrdFrequencyModeForDbColumn(semanticFm)
      metadata.frequency_text = d.frequency_text ?? metadata.frequency_text ?? null
      metadata.recurrence_value = d.recurrence_value ?? metadata.recurrence_value ?? null
      metadata.recurrence_unit = d.recurrence_unit ?? metadata.recurrence_unit ?? null
      metadata.duration = d.duration ?? metadata.duration ?? null
      metadata.administration_basis = d.administration_basis ?? metadata.administration_basis ?? null
      metadata.administration_amount = d.administration_amount ?? metadata.administration_amount ?? null
      metadata.administration_unit = d.administration_unit ?? metadata.administration_unit ?? null
      metadata.administration_target = d.administration_target ?? metadata.administration_target ?? null
      metadata.calculator_default_dose = d.calculator_default_dose ?? metadata.calculator_default_dose ?? null
      metadata.calculator_default_frequency =
        d.calculator_default_frequency ?? metadata.calculator_default_frequency ?? null

      const fm = semanticFm
      const isSingleDose =
        d.is_single_dose ?? (fm === 'single_dose' || fm === 'repeat_interval') ?? false
      const isRepeatPeriodically = d.repeat_periodically ?? (fm === 'repeat_interval') ?? false

      return {
        clinic_id: clinicId,
        medication_id: medicationId,
        species: d.species!,
        route: d.route!,
        dose_value: d.dose_value!,
        dose_unit: d.dose_unit!,
        frequency: d.frequency != null && String(d.frequency).trim() !== '' ? d.frequency : '',
        notes: d.notes || null,
        metadata,
        dose_max: metadata.dose_max != null ? Number(metadata.dose_max) : null,
        per_weight_unit: (metadata.per_weight_unit as string | null) ?? null,
        indication: (metadata.indication as string | null) ?? null,
        frequency_min: metadata.frequency_min != null ? Number(metadata.frequency_min) : null,
        frequency_max: metadata.frequency_max != null ? Number(metadata.frequency_max) : null,
        frequency_mode: frequencyModeColumn,
        frequency_text: (metadata.frequency_text as string | null) ?? null,
        duration: (metadata.duration as string | null) ?? null,
        calculator_default_dose:
          metadata.calculator_default_dose != null ? Number(metadata.calculator_default_dose) : null,
        calculator_default_frequency:
          metadata.calculator_default_frequency != null
            ? Number(metadata.calculator_default_frequency)
            : null,
        // ── Fase 3A: canonical columns ──────────────────────────
        administration_basis: normalizeAdministrationBasisValue(d.administration_basis),
        administration_amount: d.administration_amount ?? null,
        administration_unit: d.administration_unit ?? null,
        administration_target: d.administration_target ?? null,
        is_single_dose: isSingleDose,
        repeat_periodically: isRepeatPeriodically,
        recurrence_value: d.recurrence_value ?? null,
        recurrence_unit: d.recurrence_unit ?? null,
        // ────────────────────────────────────────────────────────
        is_active: d.is_active ?? true,
        sort_order: d.sort_order ?? null,
      }
    })

    const { error: insertError } = await supabase
      .from('medication_recommended_doses')
      .insert(insertPayload)

    if (insertError) {
      console.error('[RecommendedDoses] INSERT error:', insertError)
      throw insertError
    }
    console.log('[RecommendedDoses] Inserted', toInsert.length, 'doses')
  }

  // STEP 7: Retornar doses atualizadas
  const result = await getMedicationRecommendedDoses(clinicId, medicationId)
  console.log('[RecommendedDoses] SAVE SUCCESS', { count: result.length })
  return result
}

export async function updateMedication(
  clinicId: string,
  medicationId: string,
  payload: {
    name?: string
    primary_route?: string | null
    default_dose_unit?: string | null
    target_species?: string | null
    is_controlled?: boolean
    internal_notes?: string | null
  }
): Promise<void> {
  console.log('[MedicationUpdate] START', { clinicId, medicationId, payload })

  const { error } = await supabase
    .from('medications')
    .update(payload)
    .eq('clinic_id', clinicId)
    .eq('id', medicationId)

  console.log('[MedicationUpdate] RESULT', { error })
  logSbError('[MedicationUpdate] ERROR', error)

  if (error) throw error
}

export type PresentationInsertInput = {
  medication_id: string;
  pharmaceutical_form?: string;
  concentration_text?: string;
  additional_component?: string;
  presentation_unit?: string;
  commercial_name?: string;
  value?: number | null;
  value_unit?: string | null;
  per_value?: number | null;
  per_unit?: string | null;
  avg_price_brl?: number | null;
  pharmacy_veterinary: boolean;
  pharmacy_human: boolean;
  pharmacy_compounding: boolean;
  package_quantity?: number | null;
  package_unit?: string | null;
}

export async function insertMedicationPresentation(
  clinicId: string,
  input: PresentationInsertInput
): Promise<MedicationPresentationRecord> {
  console.log('[PresentationInsert] START', { clinicId, input })

  const payload = {
    clinic_id: clinicId,
    medication_id: input.medication_id,
    pharmaceutical_form: input.pharmaceutical_form || null,
    concentration_text: input.concentration_text || null,
    additional_component: input.additional_component || null,
    presentation_unit: input.presentation_unit || null,
    commercial_name: input.commercial_name || null,
    value: input.value ?? null,
    value_unit: input.value_unit || null,
    per_value: input.per_value ?? null,
    per_unit: input.per_unit || null,
    avg_price_brl: input.avg_price_brl ?? null,
    pharmacy_veterinary: input.pharmacy_veterinary ?? false,
    pharmacy_human: input.pharmacy_human ?? false,
    pharmacy_compounding: input.pharmacy_compounding ?? false,
    package_quantity: input.package_quantity ?? null,
    package_unit: input.package_unit || null,
  }

  const { data, error } = await supabase
    .from('medication_presentations')
    .insert(payload)
    .select('*')
    .single()

  console.log('[PresentationInsert] RESULT', { data: !!data, error })
  logSbError('[PresentationInsert] ERROR', error)

  if (error) throw error
  return data
}

export async function deleteMedicationPresentation(
  clinicId: string,
  presentationId: string
): Promise<void> {
  console.log('[PresentationDelete] START', { clinicId, presentationId })

  const { error } = await supabase
    .from('medication_presentations')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('id', presentationId)

  console.log('[PresentationDelete] RESULT', { error })
  logSbError('[PresentationDelete] ERROR', error)

  if (error) throw error
}

export async function deleteMedication(clinicId: string, medicationId: string): Promise<void> {
  console.log('[MedicationDelete] START', { clinicId, medicationId })

  // STEP 1: Apagar doses recomendadas
  const { error: dosesError } = await supabase
    .from('medication_recommended_doses')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('medication_id', medicationId)

  if (dosesError) {
    console.error('[MedicationDelete] Error deleting doses:', dosesError)
    throw dosesError
  }
  console.log('[MedicationDelete] Deleted recommended doses')

  // STEP 2: Apagar apresentações
  const { error: presError } = await supabase
    .from('medication_presentations')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('medication_id', medicationId)

  if (presError) {
    console.error('[MedicationDelete] Error deleting presentations:', presError)
    throw presError
  }
  console.log('[MedicationDelete] Deleted presentations')

  // STEP 3: Apagar medicamento
  const { error } = await supabase
    .from('medications')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('id', medicationId)

  console.log('[MedicationDelete] RESULT', { error });
  logSbError('[MedicationDelete] ERROR', error);
  if (error) throw error;
}

// ========== PROTOCOLS ==========

export type ProtocolFolderRecord = {
  id: string
  clinic_id: string
  owner_user_id: string
  name: string
  icon_key: string | null
  color?: string | null
  sort_order: number
  created_at: string
  updated_at?: string
}

/** Matches real `protocols` table. No `is_active`, no `target_species`. */
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
 * In-memory shape for medication items.
 * NOTE: No `instructions` column in DB. Do NOT add it.
 */
export type ProtocolMedicationItem = {
  id?: string
  medication_id: string | null
  /** UI-only — NOT sent to DB */
  medication_name?: string
  presentation_id: string | null
  /** UI-only — NOT sent to DB */
  presentation_text?: string
  manual_medication_name: string | null
  manual_presentation_label: string | null
  concentration_value?: number | null
  concentration_unit?: string | null
  dose_value: number | null
  dose_unit: string | null
  route: string | null
  frequency_type: 'times_per_day' | 'interval_hours' | 'once_daily' | 'as_needed'
  times_per_day: number | null
  interval_hours: number | null
  duration_days: number | null
  is_controlled?: boolean
  sort_order: number
  // NOTE: `instructions` column does NOT exist — removed
  /** Snapshot canônico do regime (is_single_dose, repeat_periodically, administration_basis, etc.) */
  metadata?: Record<string, unknown> | null
}

/** Uses `text` column (not `recommendation_text`). */
export type ProtocolRecommendation = {
  id?: string
  text: string
  sort_order: number
}

export type ProtocolFull = {
  protocol: ProtocolRecord
  medications: ProtocolMedicationItem[]
  recommendations: ProtocolRecommendation[]
}

export async function listProtocolFolders(clinicId: string, userId: string): Promise<ProtocolFolderRecord[]> {
  console.log('[ProtocolFoldersList] START', { clinicId, userId })

  const { data, error } = await supabase
    .from('protocol_folders')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  console.log('[ProtocolFoldersList] RESULT', { count: data?.length, error })
  logSbError('[ProtocolFoldersList] ERROR', error)

  if (error) throw error
  return data ?? []
}

export async function createProtocolFolder(
  clinicId: string,
  userId: string,
  name: string,
  iconKey?: string,
  color?: string
): Promise<ProtocolFolderRecord> {
  console.log('[ProtocolFolderCreate] START', { clinicId, name, iconKey })

  const { data, error } = await supabase
    .from('protocol_folders')
    .insert({
      clinic_id: clinicId,
      owner_user_id: userId,
      name: name.trim(),
      icon_key: iconKey || null,
      color: color || null,
      sort_order: 0,
    })
    .select('*')
    .single()

  console.log('[ProtocolFolderCreate] RESULT', { data: !!data, error })
  logSbError('[ProtocolFolderCreate] ERROR', error)

  if (error) throw error
  return data
}

export async function updateProtocolFolder(
  clinicId: string,
  userId: string,
  folderId: string,
  payload: { name?: string; icon_key?: string | null; sort_order?: number }
): Promise<void> {
  console.log('[ProtocolFolderUpdate] START', { clinicId, userId, folderId, payload })

  const { error } = await supabase
    .from('protocol_folders')
    .update(payload)
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', folderId)

  console.log('[ProtocolFolderUpdate] RESULT', { error })
  logSbError('[ProtocolFolderUpdate] ERROR', error)

  if (error) throw error
}

export async function deleteProtocolFolder(
  clinicId: string,
  userId: string,
  folderId: string
): Promise<void> {
  console.log('[ProtocolFolderDelete] START', { clinicId, userId, folderId })

  const { error } = await supabase
    .from('protocol_folders')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', folderId)

  console.log('[ProtocolFolderDelete] RESULT', { error })
  logSbError('[ProtocolFolderDelete] ERROR', error)

  if (error) throw error
}

export async function listProtocols(
  clinicId: string,
  userId: string,
  folderId?: string | null,
  search?: string
): Promise<ProtocolRecord[]> {
  console.log('[ProtocolsList] START', { clinicId, userId, folderId, search })

  let query = supabase
    .from('protocols')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)

  // folderId behavior:
  // - undefined: no folder filter (list all)
  // - null: only protocols without folder
  // - string: only protocols inside that folder
  if (folderId === null) {
    query = query.is('folder_id', null)
  } else if (typeof folderId === 'string' && folderId.trim()) {
    query = query.eq('folder_id', folderId.trim())
  }

  if (search) {
    query = query.ilike('name', `%${search.trim()}%`)
  }

  const { data, error } = await query
    .order('name', { ascending: true })

  console.log('[ProtocolsList] RESULT', { count: data?.length, error })
  logSbError('[ProtocolsList] ERROR', error)

  if (error) throw error
  return data ?? []
}

export async function loadProtocol(clinicId: string, userId: string, protocolId: string): Promise<ProtocolFull | null> {
  console.log('[ProtocolLoad] START', { clinicId, userId, protocolId })

  const { data: protocol, error: protocolError } = await supabase
    .from('protocols')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', protocolId)
    .single()

  if (protocolError || !protocol) {
    console.log('[ProtocolLoad] protocol not found', { protocolError })
    logSbError('[ProtocolLoad] protocol ERROR', protocolError)
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

  console.log('[ProtocolLoad] RESULT', {
    protocol: !!protocol,
    medications: medications?.length,
    recommendations: recommendations?.length,
  })

  if (medError) logSbError('[ProtocolLoad] medications ERROR', medError)
  if (recError) logSbError('[ProtocolLoad] recommendations ERROR', recError)

  return {
    protocol,
    medications: (medications || []).map(m => ({
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
      // NOTE: `instructions` does NOT exist in DB - omitted
      metadata: (m.metadata && typeof m.metadata === 'object' && !Array.isArray(m.metadata))
        ? m.metadata as Record<string, unknown>
        : null,
    })) as ProtocolMedicationItem[],
    recommendations: (recommendations || []).map(r => ({
      id: r.id,
      text: r.text ?? '',  // column is `text` in DB
      sort_order: r.sort_order ?? 0,
    })) as ProtocolRecommendation[],
  }
}

export async function saveProtocol(
  clinicId: string,
  userId: string,
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
    // NOTE: no is_active, no target_species
  },
  medications: ProtocolMedicationItem[],
  recommendations: ProtocolRecommendation[]
): Promise<ProtocolRecord> {
  console.log('[ProtocolSave] START', { clinicId, protocolId: protocol.id, name: protocol.name })

  let protocolId = protocol.id
  let savedProtocol: ProtocolRecord

  // ── STEP 1: upsert protocols (whitelist — no is_active/target_species) ──
  if (protocolId) {
    const { data, error } = await supabase
      .from('protocols')
      .update({
        folder_id: protocol.folder_id ?? null,
        name: protocol.name.trim(),
        description: protocol.description ?? null,
        species: protocol.species ?? null,
        duration_summary: protocol.duration_summary ?? null,
        tags: protocol.tags ?? null,
        is_control_special: !!protocol.is_control_special,
        exams_justification: protocol.exams_justification ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('clinic_id', clinicId)
      .eq('owner_user_id', userId)
      .eq('id', protocolId)
      .select('*')
      .single()

    if (error) {
      logSbError('[ProtocolSave] update error', error)
      throw error
    }
    savedProtocol = data
  } else {
    const { data, error } = await supabase
      .from('protocols')
      .insert({
        clinic_id: clinicId,
        owner_user_id: userId,
        folder_id: protocol.folder_id ?? null,
        name: protocol.name.trim(),
        description: protocol.description ?? null,
        species: protocol.species ?? null,
        duration_summary: protocol.duration_summary ?? null,
        tags: protocol.tags ?? null,
        is_control_special: !!protocol.is_control_special,
        exams_justification: protocol.exams_justification ?? null,
      })
      .select('*')
      .single()

    if (error) {
      logSbError('[ProtocolSave] insert error', error)
      throw error
    }
    savedProtocol = data
    protocolId = data.id
  }

  console.log('[ProtocolSave] protocol saved', { protocolId })

  // ── STEP 2: delete + re-insert protocol_medications ──────────────────
  {
    const { error: delMedError } = await supabase
      .from('protocol_medications')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    if (delMedError) {
      logSbError('[ProtocolSave] protocol_medications delete error', delMedError)
      throw delMedError
    }
  }

  if (medications.length > 0) {
    const medPayload = medications.map((m, idx) => {
      const medicationId = String(m.medication_id || '').trim() || null
      const presentationId = String(m.presentation_id || '').trim() || null
      const manualName = String(m.manual_medication_name || '').trim() || null
      const manualPresentation = String(m.manual_presentation_label || '').trim() || null
      const isCatalog = !!medicationId && !!presentationId

      // STRICT WHITELIST — only DB columns (no instructions, medication_name, presentation_text)
      return {
        clinic_id: clinicId,
        protocol_id: protocolId,
        sort_order: idx,
        medication_id: isCatalog ? medicationId : null,
        presentation_id: isCatalog ? presentationId : null,
        concentration_value: m.concentration_value ?? null,
        concentration_unit: m.concentration_unit ?? null,
        dose_value: m.dose_value ?? null,
        dose_unit: m.dose_unit ?? null,
        route: m.route ?? null,
        duration_days: m.duration_days ?? null,
        frequency_type: m.frequency_type ?? null,
        times_per_day: m.times_per_day ?? null,
        interval_hours: m.interval_hours ?? null,
        is_controlled: !!m.is_controlled,
        manual_medication_name: isCatalog ? null : manualName,
        manual_presentation_label: isCatalog ? null : manualPresentation,
        // NOTE: no `instructions` — column does not exist
        // Fase 3B: snapshot canônico do regime
        metadata: (m.metadata && typeof m.metadata === 'object' && !Array.isArray(m.metadata))
          ? m.metadata
          : {},
      }
    })

    const { error: medInsertError } = await supabase
      .from('protocol_medications')
      .insert(medPayload)

    if (medInsertError) {
      logSbError('[ProtocolSave] medications insert error', medInsertError)
      throw medInsertError
    }
  }

  // ── STEP 3: delete + re-insert protocol_recommendations ─────────────
  {
    const { error: delRecError } = await supabase
      .from('protocol_recommendations')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    if (delRecError) {
      logSbError('[ProtocolSave] protocol_recommendations delete error', delRecError)
      throw delRecError
    }
  }

  const validRecs = recommendations.filter(r => String(r.text || '').trim())
  if (validRecs.length > 0) {
    // Uses `text` column (not `recommendation_text`)
    const recPayload = validRecs.map((r, idx) => ({
      clinic_id: clinicId,
      protocol_id: protocolId,
      text: String(r.text).trim(),
      sort_order: idx,
    }))

    const { error: recInsertError } = await supabase
      .from('protocol_recommendations')
      .insert(recPayload)

    if (recInsertError) {
      logSbError('[ProtocolSave] recommendations insert error', recInsertError)
      throw recInsertError
    }
  }

  console.log('[ProtocolSave] SUCCESS', { protocolId })
  return savedProtocol
}

export async function deleteProtocol(clinicId: string, userId: string, protocolId: string): Promise<void> {
  console.log('[ProtocolDelete] START', { clinicId, protocolId })

  // Cascade will delete children
  const { error } = await supabase
    .from('protocols')
    .delete()
    .eq('clinic_id', clinicId)
    .eq('owner_user_id', userId)
    .eq('id', protocolId)

  console.log('[ProtocolDelete] RESULT', { error })
  logSbError('[ProtocolDelete] ERROR', error)

  if (error) throw error
}
