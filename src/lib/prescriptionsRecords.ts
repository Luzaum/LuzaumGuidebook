import { supabase } from './supabaseClient'
import { getStoredClinicId } from './clinic'
import type { PrescriptionState } from '../modules/receituario-vet/rxTypes'

export type PrescriptionStatus = 'draft' | 'signed' | 'void'

export interface PrescriptionRecord {
  id: string
  clinic_id: string
  patient_id: string
  tutor_id: string
  content: PrescriptionState
  status: PrescriptionStatus
  version: number
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface CreatePrescriptionInput {
  patient_id: string
  tutor_id: string
  content: PrescriptionState
  clinic_id?: string
}

export interface UpdatePrescriptionInput {
  content?: PrescriptionState
  status?: PrescriptionStatus
}

function resolveClinicId(clinicId?: string) {
  const target = (clinicId || getStoredClinicId() || '').trim()
  if (!target) {
    throw new Error('clinic_id ausente. Garanta clinic setup antes de gravar dados.')
  }
  return target
}

/**
 * Criar um novo draft de receita no Supabase
 */
export async function createPrescriptionDraft(
  input: CreatePrescriptionInput,
  clinicId?: string
): Promise<PrescriptionRecord> {
  const targetClinicId = resolveClinicId(clinicId)

  const { data, error } = await supabase
    .from('prescriptions')
    .insert([
      {
        clinic_id: targetClinicId,
        patient_id: input.patient_id,
        tutor_id: input.tutor_id,
        content: input.content,
        status: 'draft',
        version: 1,
      },
    ])
    .select()

  if (error) throw error
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Receita não foi criada no banco.')
  }

  return data[0] as PrescriptionRecord
}

/**
 * Atualizar um draft existente (mantém version e status)
 */
export async function updatePrescriptionDraft(
  prescriptionId: string,
  input: UpdatePrescriptionInput,
  clinicId?: string
): Promise<PrescriptionRecord> {
  const targetClinicId = resolveClinicId(clinicId)

  const { data, error } = await supabase
    .from('prescriptions')
    .update({
      ...(input.content && { content: input.content }),
      ...(input.status && { status: input.status }),
    })
    .eq('id', prescriptionId)
    .eq('clinic_id', targetClinicId)
    .select()

  if (error) throw error
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Receita não encontrada ou não atualizada.')
  }

  return data[0] as PrescriptionRecord
}

/**
 * Buscar receita por ID (com validação de clinic)
 */
export async function getPrescriptionById(
  prescriptionId: string,
  clinicId?: string
): Promise<PrescriptionRecord | null> {
  const targetClinicId = resolveClinicId(clinicId)

  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('id', prescriptionId)
    .eq('clinic_id', targetClinicId)
    .single()

  if (error?.code === 'PGRST116') {
    // Not found
    return null
  }
  if (error) throw error

  return data as PrescriptionRecord
}

/**
 * Listar receitas de um paciente
 */
export async function listPrescriptionsByPatient(
  patientId: string,
  clinicId?: string,
  options?: { limit?: number; offset?: number }
): Promise<PrescriptionRecord[]> {
  const targetClinicId = resolveClinicId(clinicId)
  const limit = options?.limit ?? 50
  const offset = options?.offset ?? 0

  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('clinic_id', targetClinicId)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error

  return (data || []) as PrescriptionRecord[]
}

/**
 * Listar receitas recentes da clínica (últimas X)
 */
export async function listRecentPrescriptions(
  clinicId?: string,
  options?: { limit?: number; offset?: number }
): Promise<PrescriptionRecord[]> {
  const targetClinicId = resolveClinicId(clinicId)
  const limit = options?.limit ?? 50
  const offset = options?.offset ?? 0

  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('clinic_id', targetClinicId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error

  return (data || []) as PrescriptionRecord[]
}

/**
 * Mudar status de receita (draft → signed, etc.)
 */
export async function setPrescriptionStatus(
  prescriptionId: string,
  status: PrescriptionStatus,
  clinicId?: string
): Promise<PrescriptionRecord> {
  const targetClinicId = resolveClinicId(clinicId)

  const { data, error } = await supabase
    .from('prescriptions')
    .update({ status })
    .eq('id', prescriptionId)
    .eq('clinic_id', targetClinicId)
    .select()

  if (error) throw error
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Receita não encontrada.')
  }

  return data[0] as PrescriptionRecord
}

/**
 * Deletar receita (soft delete via void status, ou hard delete)
 */
export async function voidPrescription(
  prescriptionId: string,
  clinicId?: string
): Promise<PrescriptionRecord> {
  return setPrescriptionStatus(prescriptionId, 'void', clinicId)
}

/**
 * Buscar drafts não salvos de um paciente (status = draft)
 */
export async function listDraftPrescriptionsByPatient(
  patientId: string,
  clinicId?: string
): Promise<PrescriptionRecord[]> {
  const targetClinicId = resolveClinicId(clinicId)

  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('clinic_id', targetClinicId)
    .eq('patient_id', patientId)
    .eq('status', 'draft')
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || []) as PrescriptionRecord[]
}
