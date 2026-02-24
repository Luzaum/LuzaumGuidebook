import { supabase } from './supabaseClient'
import { insertWithClinicId, selectByClinicId, softDeleteWithClinicId, logSbError } from './clinicScopedDb'

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
  species_targets: string[] | null
  is_active: boolean
  metadata: any
  created_at: string
  updated_at?: string
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
    species_targets: params.medication.species_targets || null,
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
}

export async function searchMedications(
  clinicId: string,
  query: string,
  limit = 50 // ✅ OBJ 3: limit opcional (default 50)
): Promise<MedicationSearchResult[]> {
  console.log('[MedicationSearch] START', { clinicId, query, limit })

  const q = query.trim()

  let request = supabase
    .from('medications')
    .select('id,name,is_controlled,is_private,metadata')
    .eq('clinic_id', clinicId)

  // ✅ OBJ 3: Se tem query, filtra por nome; senão, lista inicial
  if (q) {
    request = request.ilike('name', `%${q}%`)
  }

  request = request
    .order('name', { ascending: true })
    .limit(limit)

  const { data, error } = await request

  console.log('[MedicationSearch] RESULT', { count: data?.length, error })
  logSbError('[MedicationSearch] ERROR', error)

  if (error) throw error
  return data ?? []
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
  created_at: string
  updated_at?: string
}

export async function getMedicationPresentations(
  clinicId: string,
  medicationId: string
): Promise<MedicationPresentationRecord[]> {
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
  dose_value: number
  dose_unit: string // 'mg/kg', 'mL/kg', 'UI/kg', etc
  frequency: string | null
  notes: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Lista doses recomendadas de um medicamento
 */
export async function getMedicationRecommendedDoses(
  clinicId: string,
  medicationId: string
): Promise<RecommendedDose[]> {
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
  return data ?? []
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
    const payload = {
      species: dose.species!,
      route: dose.route!,
      dose_value: dose.dose_value!,
      dose_unit: dose.dose_unit!,
      frequency: dose.frequency || null,
      notes: dose.notes || null,
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
    const insertPayload = toInsert.map(d => ({
      clinic_id: clinicId,
      medication_id: medicationId,
      species: d.species!,
      route: d.route!,
      dose_value: d.dose_value!,
      dose_unit: d.dose_unit!,
      frequency: d.frequency || null,
      notes: d.notes || null
    }))

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
  // Modo Catálogo
  medication_id: string | null
  medication_name: string
  presentation_id: string | null
  presentation_text: string
  // Modo Manual
  manual_medication_name: string | null
  manual_presentation_label: string | null
  // Dose e frequência
  dose_value: number | null
  dose_unit: string | null
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

export type ProtocolFull = {
  protocol: ProtocolRecord
  medications: ProtocolMedicationItem[]
  recommendations: ProtocolRecommendation[]
  exam_items: ProtocolExamItem[]
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

  const { data: examItems, error: examError } = await supabase
    .from('protocol_exam_items')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('protocol_id', protocolId)

  console.log('[ProtocolLoad] RESULT', {
    protocol: !!protocol,
    medications: medications?.length,
    recommendations: recommendations?.length,
    exam_items: examItems?.length
  })

  if (medError) logSbError('[ProtocolLoad] medications ERROR', medError)
  if (recError) logSbError('[ProtocolLoad] recommendations ERROR', recError)
  if (examError) logSbError('[ProtocolLoad] exam_items ERROR', examError)

  return {
    protocol,
    medications: (medications || []).map(m => ({
      id: m.id,
      medication_id: m.medication_id,
      medication_name: m.medication_name || '',
      presentation_id: m.presentation_id,
      presentation_text: m.presentation_text || '',
      manual_medication_name: m.manual_medication_name || null,
      manual_presentation_label: m.manual_presentation_label || null,
      dose_value: m.dose_value,
      dose_unit: m.dose_unit,
      route: m.route,
      frequency_type: m.frequency_type,
      times_per_day: m.times_per_day,
      interval_hours: m.interval_hours,
      duration_days: m.duration_days,
      instructions: m.instructions,
      sort_order: m.sort_order,
    })),
    recommendations: (recommendations || []).map(r => ({
      id: r.id,
      recommendation_text: r.recommendation_text,
      sort_order: r.sort_order,
    })),
    exam_items: (examItems || []).map(e => ({
      id: e.id,
      exam_key: e.exam_key,
      exam_label: e.exam_label,
      is_custom: e.is_custom,
      justification: e.justification,
    })),
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
    target_species?: string | null
    is_active?: boolean
  },
  medications: ProtocolMedicationItem[],
  recommendations: ProtocolRecommendation[],
  exam_items: ProtocolExamItem[]
): Promise<ProtocolRecord> {
  console.log('[ProtocolSave] START', { clinicId, protocolId: protocol.id, name: protocol.name })

  let protocolId = protocol.id
  let savedProtocol: ProtocolRecord

  // Upsert parent
  if (protocolId) {
    const { data, error } = await supabase
      .from('protocols')
      .update({
        folder_id: protocol.folder_id ?? null,
        name: protocol.name.trim(),
        description: protocol.description ?? null,
        target_species: protocol.target_species ?? null,
        is_active: protocol.is_active ?? true,
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
        target_species: protocol.target_species ?? null,
        is_active: protocol.is_active ?? true,
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

  // Delete old children
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
  {
    const { error: delExamError } = await supabase
      .from('protocol_exam_items')
      .delete()
      .eq('clinic_id', clinicId)
      .eq('protocol_id', protocolId)
    if (delExamError) {
      logSbError('[ProtocolSave] protocol_exam_items delete error', delExamError)
      throw delExamError
    }
  }

  // Insert medications
  if (medications.length > 0) {
    const medPayload = medications.map((m, idx) => {
      const manualName = String(m.manual_medication_name || '').trim()
      const manualPresentation = String(m.manual_presentation_label || '').trim()
      const isManual = !!manualName

      const medication_id = isManual ? null : (m.medication_id || null)
      const presentation_id = isManual ? null : (m.presentation_id || null)
      const manual_medication_name = isManual ? manualName : null
      const manual_presentation_label = isManual ? (manualPresentation || null) : null

      const medication_name = isManual ? '' : String(m.medication_name || '')
      const presentation_text = isManual ? '' : String(m.presentation_text || '')

      return {
        clinic_id: clinicId,
        protocol_id: protocolId,
        medication_id,
        medication_name,
        presentation_id,
        presentation_text,
        manual_medication_name,
        manual_presentation_label,
        dose_value: m.dose_value,
        dose_unit: m.dose_unit,
        route: m.route,
        frequency_type: m.frequency_type,
        times_per_day: m.times_per_day,
        interval_hours: m.interval_hours,
        duration_days: m.duration_days,
        instructions: m.instructions,
        sort_order: idx,
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

  // Insert recommendations
  if (recommendations.length > 0) {
    const recPayload = recommendations.map((r, idx) => ({
      clinic_id: clinicId,
      protocol_id: protocolId,
      recommendation_text: r.recommendation_text,
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

  // Insert exam items
  if (exam_items.length > 0) {
    const examPayload = exam_items.map(e => ({
      clinic_id: clinicId,
      protocol_id: protocolId,
      exam_key: e.exam_key,
      exam_label: e.exam_label,
      is_custom: e.is_custom,
      justification: e.justification,
    }))

    const { error: examInsertError } = await supabase
      .from('protocol_exam_items')
      .insert(examPayload)

    if (examInsertError) {
      logSbError('[ProtocolSave] exam_items insert error', examInsertError)
      throw examInsertError
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
