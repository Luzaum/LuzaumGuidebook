import { supabase } from './supabaseClient'
import { logSbError } from './clinicScopedDb'

export type CompoundedIngredientRole =
  | 'active'
  | 'vehicle'
  | 'excipient'
  | 'flavor'
  | 'adjuvant'
  | 'preservative'
  | 'other'

export type CompoundedDosingMode = 'fixed_per_patient' | 'calculated'

export interface CompoundedMedicationRecord {
  id: string
  clinic_id: string
  name: string
  slug: string | null
  description: string | null
  pharmaceutical_form: string
  default_route: string | null
  species: string[]
  routes: string[]
  is_controlled: boolean
  control_type: string | null
  is_active: boolean
  notes: string | null
  manipulation_instructions: string | null
  default_quantity_text: string | null
  default_qsp_text: string | null
  default_flavor: string | null
  default_vehicle: string | null
  default_excipient: string | null
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
  created_by: string | null
}

export interface CompoundedMedicationIngredientRecord {
  id: string
  clinic_id: string
  compounded_medication_id: string
  sort_order: number
  ingredient_name: string
  ingredient_role: CompoundedIngredientRole
  quantity_value: number | null
  quantity_unit: string | null
  concentration_value: number | null
  concentration_unit: string | null
  per_value: number | null
  per_unit: string | null
  free_text: string | null
  is_controlled_ingredient: boolean
  notes: string | null
  created_at?: string
  updated_at?: string
}

export interface CompoundedMedicationRegimenRecord {
  id: string
  clinic_id: string
  compounded_medication_id: string
  sort_order: number
  regimen_name: string | null
  indication: string | null
  dosing_mode: CompoundedDosingMode
  species: string
  route: string | null
  dose_min: number | null
  dose_max: number | null
  dose_unit: string | null
  per_weight_unit: string | null
  fixed_administration_value: number | null
  fixed_administration_unit: string | null
  concentration_value: number | null
  concentration_unit: string | null
  concentration_per_value: number | null
  concentration_per_unit: string | null
  frequency_value_min: number | null
  frequency_value_max: number | null
  frequency_unit: string | null
  frequency_label: string | null
  duration_mode: string | null
  duration_value: number | null
  duration_unit: string | null
  inherit_default_start: boolean
  notes: string | null
  allow_edit: boolean
  default_prepared_quantity_text: string | null
  default_administration_sig: string | null
  created_at?: string
  updated_at?: string
}

export interface CompoundedMedicationBundle {
  medication: CompoundedMedicationRecord
  ingredients: CompoundedMedicationIngredientRecord[]
  regimens: CompoundedMedicationRegimenRecord[]
}

export interface CompoundedMedicationListItem extends CompoundedMedicationRecord {
  ingredients_count?: number
  regimens_count?: number
}

export interface PrescriptionDocumentRecord {
  id: string
  clinic_id: string
  prescription_id: string
  document_type: 'standard' | 'controlled'
  pdf_path: string | null
  pdf_bucket: string | null
  snapshot_json: Record<string, unknown> | null
  created_at: string
  updated_at?: string
}

const LOCAL_STORAGE_PREFIX = 'rxv:compounded-medications:v1'

function slugify(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function localKey(clinicId: string) {
  return `${LOCAL_STORAGE_PREFIX}:${clinicId}`
}

function safeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function toNullableString(value: unknown): string | null {
  const normalized = String(value ?? '').trim()
  return normalized || null
}

function toNumberOrNull(value: unknown): number | null {
  if (value == null || value === '') return null
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const parsed = Number(String(value).replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : null
}

function isUuid(value: unknown): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || '').trim())
}

function ensureUuid(value: unknown): string {
  const text = String(value || '').trim()
  if (isUuid(text)) {
    return text
  }
  return crypto.randomUUID()
}

function buildSlugCandidate(base: string, index: number): string {
  return index <= 1 ? base : `${base}-${index}`
}

function escapeOrSearchTerm(value: string): string {
  return value.replace(/[,%()]/g, ' ').replace(/\s+/g, ' ').trim()
}

function normalizeStringArray(value: unknown): string[] {
  return safeArray<string>(value).map((entry) => String(entry || '').trim()).filter(Boolean)
}

function normalizeMedicationRecord(raw: Partial<CompoundedMedicationRecord>): CompoundedMedicationRecord {
  return {
    id: String(raw.id || ''),
    clinic_id: String(raw.clinic_id || ''),
    name: String(raw.name || '').trim(),
    slug: toNullableString(raw.slug),
    description: toNullableString(raw.description),
    pharmaceutical_form: String(raw.pharmaceutical_form || '').trim(),
    default_route: toNullableString(raw.default_route),
    species: normalizeStringArray(raw.species),
    routes: normalizeStringArray(raw.routes),
    is_controlled: !!raw.is_controlled,
    control_type: toNullableString(raw.control_type),
    is_active: raw.is_active !== false,
    notes: toNullableString(raw.notes),
    manipulation_instructions: toNullableString(raw.manipulation_instructions),
    default_quantity_text: toNullableString(raw.default_quantity_text),
    default_qsp_text: toNullableString(raw.default_qsp_text),
    default_flavor: toNullableString(raw.default_flavor),
    default_vehicle: toNullableString(raw.default_vehicle),
    default_excipient: toNullableString(raw.default_excipient),
    metadata: (raw.metadata as Record<string, unknown> | null) || {},
    created_at: String(raw.created_at || new Date().toISOString()),
    updated_at: String(raw.updated_at || new Date().toISOString()),
    created_by: toNullableString(raw.created_by),
  }
}

function normalizeIngredientRecord(
  raw: Partial<CompoundedMedicationIngredientRecord>,
  clinicId: string,
  compoundedMedicationId: string,
  sortOrder: number
): CompoundedMedicationIngredientRecord {
  return {
    id: ensureUuid(raw.id),
    clinic_id: clinicId,
    compounded_medication_id: compoundedMedicationId,
    sort_order: typeof raw.sort_order === 'number' ? raw.sort_order : sortOrder,
    ingredient_name: String(raw.ingredient_name || '').trim(),
    ingredient_role: (raw.ingredient_role || 'active') as CompoundedIngredientRole,
    quantity_value: toNumberOrNull(raw.quantity_value),
    quantity_unit: toNullableString(raw.quantity_unit),
    concentration_value: toNumberOrNull(raw.concentration_value),
    concentration_unit: toNullableString(raw.concentration_unit),
    per_value: toNumberOrNull(raw.per_value),
    per_unit: toNullableString(raw.per_unit),
    free_text: toNullableString(raw.free_text),
    is_controlled_ingredient: !!raw.is_controlled_ingredient,
    notes: toNullableString(raw.notes),
  }
}

function normalizeRegimenRecord(
  raw: Partial<CompoundedMedicationRegimenRecord>,
  clinicId: string,
  compoundedMedicationId: string,
  sortOrder: number
): CompoundedMedicationRegimenRecord {
  return {
    id: ensureUuid(raw.id),
    clinic_id: clinicId,
    compounded_medication_id: compoundedMedicationId,
    sort_order: typeof raw.sort_order === 'number' ? raw.sort_order : sortOrder,
    regimen_name: toNullableString(raw.regimen_name),
    indication: toNullableString(raw.indication),
    dosing_mode: (raw.dosing_mode || 'fixed_per_patient') as CompoundedDosingMode,
    species: String(raw.species || '').trim(),
    route: toNullableString(raw.route),
    dose_min: toNumberOrNull(raw.dose_min),
    dose_max: toNumberOrNull(raw.dose_max),
    dose_unit: toNullableString(raw.dose_unit),
    per_weight_unit: toNullableString(raw.per_weight_unit),
    fixed_administration_value: toNumberOrNull(raw.fixed_administration_value),
    fixed_administration_unit: toNullableString(raw.fixed_administration_unit),
    concentration_value: toNumberOrNull(raw.concentration_value),
    concentration_unit: toNullableString(raw.concentration_unit),
    concentration_per_value: toNumberOrNull(raw.concentration_per_value),
    concentration_per_unit: toNullableString(raw.concentration_per_unit),
    frequency_value_min: toNumberOrNull(raw.frequency_value_min),
    frequency_value_max: toNumberOrNull(raw.frequency_value_max),
    frequency_unit: toNullableString(raw.frequency_unit),
    frequency_label: toNullableString(raw.frequency_label),
    duration_mode: toNullableString(raw.duration_mode),
    duration_value: toNumberOrNull(raw.duration_value),
    duration_unit: toNullableString(raw.duration_unit),
    inherit_default_start: raw.inherit_default_start !== false,
    notes: toNullableString(raw.notes),
    allow_edit: raw.allow_edit !== false,
    default_prepared_quantity_text: toNullableString(raw.default_prepared_quantity_text),
    default_administration_sig: toNullableString(raw.default_administration_sig),
  }
}

function normalizeBundle(raw: Partial<CompoundedMedicationBundle>, clinicId?: string): CompoundedMedicationBundle {
  const medication = normalizeMedicationRecord(raw.medication || {})
  const resolvedClinicId = clinicId || medication.clinic_id
  const resolvedMedicationId = medication.id
  return {
    medication: { ...medication, clinic_id: resolvedClinicId },
    ingredients: safeArray<Partial<CompoundedMedicationIngredientRecord>>(raw.ingredients).map((item, index) =>
      normalizeIngredientRecord(item, resolvedClinicId, resolvedMedicationId, index)
    ),
    regimens: safeArray<Partial<CompoundedMedicationRegimenRecord>>(raw.regimens).map((item, index) =>
      normalizeRegimenRecord(item, resolvedClinicId, resolvedMedicationId, index)
    ),
  }
}

function readLocalBundles(clinicId: string): CompoundedMedicationBundle[] {
  try {
    const raw = localStorage.getItem(localKey(clinicId))
    if (!raw) return []
    return safeArray<Partial<CompoundedMedicationBundle>>(JSON.parse(raw)).map((entry) => normalizeBundle(entry, clinicId))
  } catch {
    return []
  }
}

function writeLocalBundles(clinicId: string, bundles: CompoundedMedicationBundle[]) {
  try {
    localStorage.setItem(localKey(clinicId), JSON.stringify(bundles))
  } catch {
    // noop
  }
}

function upsertLocalBundle(clinicId: string, bundle: CompoundedMedicationBundle) {
  const current = readLocalBundles(clinicId)
  const next = current.filter((entry) => entry.medication.id !== bundle.medication.id)
  next.push(bundle)
  next.sort((a, b) => a.medication.name.localeCompare(b.medication.name, 'pt-BR'))
  writeLocalBundles(clinicId, next)
}

function removeLocalBundle(clinicId: string, compoundedMedicationId: string) {
  const current = readLocalBundles(clinicId)
  writeLocalBundles(
    clinicId,
    current.filter((entry) => entry.medication.id !== compoundedMedicationId)
  )
}

function matchesSearch(haystack: string[], query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return haystack.join(' ').toLowerCase().includes(needle)
}

export async function listCompoundedMedications(
  clinicId: string,
  options?: {
    search?: string
    includeInactive?: boolean
    controlledOnly?: boolean
  }
): Promise<CompoundedMedicationListItem[]> {
  const includeInactive = !!options?.includeInactive
  const controlledOnly = !!options?.controlledOnly
  const search = String(options?.search || '').trim()
  const remoteSearch = escapeOrSearchTerm(search)

  try {
    let query = supabase
      .from('compounded_medications')
      .select('*')
      .eq('clinic_id', clinicId)
      .order('name', { ascending: true })

    if (!includeInactive) query = query.eq('is_active', true)
    if (controlledOnly) query = query.eq('is_controlled', true)
    if (remoteSearch) {
      const pattern = `%${remoteSearch}%`
      query = query.or([
        `name.ilike.${pattern}`,
        `description.ilike.${pattern}`,
        `pharmaceutical_form.ilike.${pattern}`,
        `default_route.ilike.${pattern}`,
        `default_vehicle.ilike.${pattern}`,
        `default_flavor.ilike.${pattern}`,
        `default_qsp_text.ilike.${pattern}`,
        `default_quantity_text.ilike.${pattern}`,
      ].join(','))
    }

    const { data, error } = await query
    logSbError('[CompoundedRecords] listCompoundedMedications error', error)
    if (error) throw error

    const rows = safeArray<Partial<CompoundedMedicationRecord>>(data).map((entry) => normalizeMedicationRecord(entry))
    return rows
      .filter((entry) => (includeInactive ? true : entry.is_active))
      .filter((entry) => (controlledOnly ? entry.is_controlled : true))
      .filter((entry) =>
        matchesSearch(
          [entry.name, entry.description || '', entry.default_route || '', ...(entry.species || [])],
          search
        )
      )
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  } catch {
    return readLocalBundles(clinicId)
      .map((bundle) => bundle.medication)
      .filter((entry) => (includeInactive ? true : entry.is_active))
      .filter((entry) => (controlledOnly ? entry.is_controlled : true))
      .filter((entry) => matchesSearch([entry.name, entry.description || '', ...(entry.species || [])], search))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  }
}

export async function getCompoundedMedicationBundle(
  clinicId: string,
  compoundedMedicationId: string
): Promise<CompoundedMedicationBundle | null> {
  try {
    const [{ data: medication, error: medicationError }, { data: ingredients, error: ingredientsError }, { data: regimens, error: regimensError }] = await Promise.all([
      supabase
        .from('compounded_medications')
        .select('*')
        .eq('clinic_id', clinicId)
        .eq('id', compoundedMedicationId)
        .single(),
      supabase
        .from('compounded_medication_ingredients')
        .select('*')
        .eq('clinic_id', clinicId)
        .eq('compounded_medication_id', compoundedMedicationId)
        .order('sort_order', { ascending: true }),
      supabase
        .from('compounded_medication_regimens')
        .select('*')
        .eq('clinic_id', clinicId)
        .eq('compounded_medication_id', compoundedMedicationId)
        .order('sort_order', { ascending: true }),
    ])

    logSbError('[CompoundedRecords] get bundle medication error', medicationError)
    logSbError('[CompoundedRecords] get bundle ingredients error', ingredientsError)
    logSbError('[CompoundedRecords] get bundle regimens error', regimensError)

    if (medicationError) throw medicationError
    if (!medication) return null

    const bundle = normalizeBundle(
      {
        medication,
        ingredients: safeArray<Partial<CompoundedMedicationIngredientRecord>>(ingredients),
        regimens: safeArray<Partial<CompoundedMedicationRegimenRecord>>(regimens),
      },
      clinicId
    )
    upsertLocalBundle(clinicId, bundle)
    return bundle
  } catch {
    return readLocalBundles(clinicId).find((entry) => entry.medication.id === compoundedMedicationId) || null
  }
}

async function getExistingCompoundedMedicationSlug(clinicId: string, compoundedMedicationId: string): Promise<string | null> {
  const localMatch = readLocalBundles(clinicId).find((entry) => entry.medication.id === compoundedMedicationId)?.medication.slug || null
  try {
    const { data, error } = await supabase
      .from('compounded_medications')
      .select('id, slug')
      .eq('clinic_id', clinicId)
      .eq('id', compoundedMedicationId)
      .maybeSingle()
    logSbError('[CompoundedRecords] get existing slug error', error)
    if (error) throw error
    return toNullableString((data as { slug?: string | null } | null)?.slug) || localMatch
  } catch {
    return localMatch
  }
}

async function buildUniqueCompoundedSlug(params: {
  clinicId: string
  name: string
  requestedSlug?: string | null
  currentMedicationId?: string | null
}): Promise<string> {
  const currentMedicationId = String(params.currentMedicationId || '').trim()
  if (isUuid(currentMedicationId)) {
    const existingSlug = await getExistingCompoundedMedicationSlug(params.clinicId, currentMedicationId)
    if (existingSlug) return existingSlug
  }

  const baseSlug = slugify(params.requestedSlug || params.name) || 'formula-magistral'
  const used = new Set<string>()

  readLocalBundles(params.clinicId).forEach((entry) => {
    if (entry.medication.id === currentMedicationId) return
    const slug = String(entry.medication.slug || '').trim()
    if (slug) used.add(slug)
  })

  try {
    const { data, error } = await supabase
      .from('compounded_medications')
      .select('id, slug')
      .eq('clinic_id', params.clinicId)
      .ilike('slug', `${baseSlug}%`)
    logSbError('[CompoundedRecords] list slug conflicts error', error)
    if (error) throw error
    safeArray<{ id?: string; slug?: string | null }>(data).forEach((entry) => {
      if (String(entry.id || '').trim() === currentMedicationId) return
      const slug = String(entry.slug || '').trim()
      if (slug) used.add(slug)
    })
  } catch {
    // local set above is enough as contingency
  }

  let attempt = 1
  let candidate = buildSlugCandidate(baseSlug, attempt)
  while (used.has(candidate)) {
    attempt += 1
    candidate = buildSlugCandidate(baseSlug, attempt)
  }
  return candidate
}

export async function saveCompoundedMedicationBundle(params: {
  clinicId: string
  userId: string
  medication: Partial<CompoundedMedicationRecord> & { name: string; pharmaceutical_form: string }
  ingredients: Array<Partial<CompoundedMedicationIngredientRecord>>
  regimens: Array<Partial<CompoundedMedicationRegimenRecord>>
  allowLocalFallback?: boolean
}): Promise<CompoundedMedicationBundle> {
  const now = new Date().toISOString()
  const originalMedicationId = String(params.medication.id || '').trim()
  const medicationId = isUuid(params.medication.id) ? String(params.medication.id).trim() : ensureUuid(params.medication.id)
  const slugSeed = toNullableString(params.medication.slug) || String(params.medication.name || '').trim()
  let resolvedSlug = await buildUniqueCompoundedSlug({
    clinicId: params.clinicId,
    name: params.medication.name,
    requestedSlug: slugSeed,
    currentMedicationId: originalMedicationId,
  })

  const medicationPayload = {
    id: medicationId,
    clinic_id: params.clinicId,
    name: String(params.medication.name || '').trim(),
    slug: resolvedSlug,
    description: toNullableString(params.medication.description),
    pharmaceutical_form: String(params.medication.pharmaceutical_form || '').trim(),
    default_route: toNullableString(params.medication.default_route),
    species: normalizeStringArray(params.medication.species),
    routes: normalizeStringArray(params.medication.routes),
    is_controlled: !!params.medication.is_controlled,
    control_type: toNullableString(params.medication.control_type),
    is_active: params.medication.is_active !== false,
    notes: toNullableString(params.medication.notes),
    manipulation_instructions: toNullableString(params.medication.manipulation_instructions),
    default_quantity_text: toNullableString(params.medication.default_quantity_text),
    default_qsp_text: toNullableString(params.medication.default_qsp_text),
    default_flavor: toNullableString(params.medication.default_flavor),
    default_vehicle: toNullableString(params.medication.default_vehicle),
    default_excipient: toNullableString(params.medication.default_excipient),
    metadata: params.medication.metadata || {},
    created_by: params.userId,
    updated_at: now,
  }

  const ingredientPayload = params.ingredients
    .filter((entry) => String(entry.ingredient_name || '').trim())
    .map((entry, index) => ({
      ...normalizeIngredientRecord(entry, params.clinicId, medicationId, index),
      id: ensureUuid(entry.id),
    }))

  const regimenPayload = params.regimens
    .filter((entry) => String(entry.species || '').trim())
    .map((entry, index) => ({
      ...normalizeRegimenRecord(entry, params.clinicId, medicationId, index),
      id: ensureUuid(entry.id),
    }))

  try {
    let medicationData: Partial<CompoundedMedicationRecord> | null = null
    let medicationError: { code?: string; message?: string } | null = null
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await supabase
        .from('compounded_medications')
        .upsert({ ...medicationPayload, slug: resolvedSlug }, { onConflict: 'id' })
        .select('*')
        .single()
      medicationData = response.data as Partial<CompoundedMedicationRecord> | null
      medicationError = response.error
      logSbError('[CompoundedRecords] save medication error', medicationError)
      if (!medicationError) break
      const isSlugConflict = String(medicationError.code || '') === '23505' && String(medicationError.message || '').includes('compounded_medications_clinic_slug_key')
      if (!isSlugConflict) break
      resolvedSlug = await buildUniqueCompoundedSlug({
        clinicId: params.clinicId,
        name: params.medication.name,
        requestedSlug: slugSeed,
        currentMedicationId: originalMedicationId,
      })
    }

    if (medicationError) throw medicationError

    const { error: deleteIngredientsError } = await supabase
      .from('compounded_medication_ingredients')
      .delete()
      .eq('clinic_id', params.clinicId)
      .eq('compounded_medication_id', medicationId)
    logSbError('[CompoundedRecords] delete ingredients error', deleteIngredientsError)
    if (deleteIngredientsError) throw deleteIngredientsError

    const { error: deleteRegimensError } = await supabase
      .from('compounded_medication_regimens')
      .delete()
      .eq('clinic_id', params.clinicId)
      .eq('compounded_medication_id', medicationId)
    logSbError('[CompoundedRecords] delete regimens error', deleteRegimensError)
    if (deleteRegimensError) throw deleteRegimensError

    let savedIngredients: CompoundedMedicationIngredientRecord[] = []
    let savedRegimens: CompoundedMedicationRegimenRecord[] = []

    if (ingredientPayload.length) {
      const { data, error } = await supabase
        .from('compounded_medication_ingredients')
        .insert(ingredientPayload)
        .select('*')
      logSbError('[CompoundedRecords] insert ingredients error', error)
      if (error) throw error
      savedIngredients = safeArray<Partial<CompoundedMedicationIngredientRecord>>(data).map((entry, index) =>
        normalizeIngredientRecord(entry, params.clinicId, medicationId, index)
      )
    }

    if (regimenPayload.length) {
      const { data, error } = await supabase
        .from('compounded_medication_regimens')
        .insert(regimenPayload)
        .select('*')
      logSbError('[CompoundedRecords] insert regimens error', error)
      if (error) throw error
      savedRegimens = safeArray<Partial<CompoundedMedicationRegimenRecord>>(data).map((entry, index) =>
        normalizeRegimenRecord(entry, params.clinicId, medicationId, index)
      )
    }

    const bundle = normalizeBundle(
      {
        medication: {
          ...(medicationData as Partial<CompoundedMedicationRecord>),
          metadata: {
            ...((medicationData as Partial<CompoundedMedicationRecord>)?.metadata as Record<string, unknown> | null || {}),
            persistence_source: 'supabase',
          },
        },
        ingredients: savedIngredients,
        regimens: savedRegimens,
      },
      params.clinicId
    )
    if (originalMedicationId && originalMedicationId !== medicationId) {
      removeLocalBundle(params.clinicId, originalMedicationId)
    }
    upsertLocalBundle(params.clinicId, bundle)
    return bundle
  } catch (error) {
    if (!params.allowLocalFallback) {
      throw error
    }
    const bundle = normalizeBundle(
      {
        medication: {
          ...(medicationPayload as Partial<CompoundedMedicationRecord>),
          metadata: {
            ...((medicationPayload.metadata as Record<string, unknown> | null) || {}),
            persistence_source: 'local_fallback',
            sync_error: error instanceof Error ? error.message : String(error || ''),
          },
        },
        ingredients: ingredientPayload,
        regimens: regimenPayload,
      },
      params.clinicId
    )
    upsertLocalBundle(params.clinicId, bundle)
    if (import.meta.env.DEV) {
      console.warn('[CompoundedRecords] save fallback to local storage', error)
    }
    return bundle
  }
}

export async function deleteCompoundedMedication(
  clinicId: string,
  compoundedMedicationId: string,
  options?: { hardDelete?: boolean }
): Promise<void> {
  const localBundles = readLocalBundles(clinicId)
  try {
    if (options?.hardDelete) {
      const { error } = await supabase
        .from('compounded_medications')
        .delete()
        .eq('clinic_id', clinicId)
        .eq('id', compoundedMedicationId)
      logSbError('[CompoundedRecords] hard delete error', error)
      if (error) throw error
      writeLocalBundles(clinicId, localBundles.filter((entry) => entry.medication.id !== compoundedMedicationId))
      return
    }

    const { error } = await supabase
      .from('compounded_medications')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('clinic_id', clinicId)
      .eq('id', compoundedMedicationId)
    logSbError('[CompoundedRecords] soft delete error', error)
    if (error) throw error
  } catch {
    // noop, fallback below
  }

  const next = localBundles.map((entry) =>
    entry.medication.id === compoundedMedicationId
      ? {
          ...entry,
          medication: {
            ...entry.medication,
            is_active: options?.hardDelete ? false : false,
          },
        }
      : entry
  )
  writeLocalBundles(
    clinicId,
    options?.hardDelete ? next.filter((entry) => entry.medication.id !== compoundedMedicationId) : next
  )
}

export async function listPrescriptionDocuments(
  prescriptionId: string,
  clinicId: string
): Promise<PrescriptionDocumentRecord[]> {
  const { data, error } = await supabase
    .from('prescription_documents')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('prescription_id', prescriptionId)
    .order('created_at', { ascending: true })
  logSbError('[CompoundedRecords] listPrescriptionDocuments error', error)
  if (error) throw error
  return (data || []) as PrescriptionDocumentRecord[]
}

export async function upsertPrescriptionDocuments(params: {
  clinicId: string
  prescriptionId: string
  documents: Array<{
    document_type: 'standard' | 'controlled'
    pdf_path?: string | null
    pdf_bucket?: string | null
    snapshot_json?: Record<string, unknown> | null
  }>
}): Promise<PrescriptionDocumentRecord[]> {
  const payload = params.documents.map((entry) => ({
    clinic_id: params.clinicId,
    prescription_id: params.prescriptionId,
    document_type: entry.document_type,
    pdf_path: entry.pdf_path || null,
    pdf_bucket: entry.pdf_bucket || null,
    snapshot_json: entry.snapshot_json || null,
  }))

  const { error: deleteError } = await supabase
    .from('prescription_documents')
    .delete()
    .eq('clinic_id', params.clinicId)
    .eq('prescription_id', params.prescriptionId)
  logSbError('[CompoundedRecords] delete prescription documents error', deleteError)
  if (deleteError) throw deleteError

  if (!payload.length) return []

  const { data, error } = await supabase
    .from('prescription_documents')
    .insert(payload)
    .select('*')
    .order('created_at', { ascending: true })
  logSbError('[CompoundedRecords] insert prescription documents error', error)
  if (error) throw error
  return (data || []) as PrescriptionDocumentRecord[]
}

export function summarizeCompoundedIngredient(ingredient: Partial<CompoundedMedicationIngredientRecord>): string {
  const primary = String(ingredient.ingredient_name || '').trim()
  const qty = [ingredient.quantity_value, ingredient.quantity_unit].filter(Boolean).join(' ')
  const concentration = [
    ingredient.concentration_value,
    ingredient.concentration_unit,
    ingredient.per_value ? '/' : '',
    ingredient.per_value,
    ingredient.per_unit,
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+\/\s+/g, '/')
  return [primary, concentration || qty, ingredient.free_text || ''].filter(Boolean).join(' ')
}

export function summarizeCompoundedMedication(bundle: Partial<CompoundedMedicationBundle> | null | undefined): string {
  if (!bundle?.medication) return ''
  const medication = normalizeMedicationRecord(bundle.medication)
  return [
    medication.name,
    medication.pharmaceutical_form,
    medication.default_qsp_text || medication.default_quantity_text || '',
    medication.default_flavor || '',
  ]
    .filter(Boolean)
    .join(' • ')
}
