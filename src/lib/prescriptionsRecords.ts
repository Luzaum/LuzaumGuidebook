import { supabase } from './supabaseClient'
import { getStoredClinicId } from './clinic'
import type { PrintDoc } from '../../modules/receituario-vet/rxTypes'
const UUID_V4_LIKE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Use any for snapshot to avoid circular dependency if needed, 
// but we'll try to keep it flexible
export type PrescriptionStatus = 'draft' | 'signed' | 'void'

export interface PrescriptionContent {
  kind: 'standard' | 'special-control'
  templateId: string | null
  printDoc: PrintDoc
  stateSnapshot?: any // NovaReceita2State
  createdAtLocal: string
  appVersion: string
}

export interface PrescriptionRecord {
  id: string
  clinic_id: string
  patient_id: string
  tutor_id: string
  content: PrescriptionContent
  status: PrescriptionStatus
  version: number
  created_by: string | null
  created_at: string
  updated_at: string
  // Colunas adicionadas na migration 20260225150000_add_pdf_columns_to_prescriptions
  pdf_path?: string | null
  storage_bucket?: string | null
  document_kind?: string | null
}

export interface SavePrescriptionInput {
  id?: string
  patient_id: string
  tutor_id: string
  content: PrescriptionContent
  status?: PrescriptionStatus
  clinic_id?: string
}

function resolveClinicId(clinicId?: string) {
  const target = (clinicId || getStoredClinicId() || '').trim()
  if (!target) {
    throw new Error('clinic_id ausente. Garanta clinic setup antes de gravar dados.')
  }
  return target
}

/**
 * Salva uma receita (Insert ou Update com versionamento)
 */
export async function savePrescription(input: SavePrescriptionInput): Promise<PrescriptionRecord> {
  const targetClinicId = resolveClinicId(input.clinic_id)

  console.log('[Prescriptions] save attempt', { id: input.id, patient: input.patient_id })

  const { data: { user } } = await supabase.auth.getUser()

  if (input.id) {
    // UPDATE - Increment version
    // First get current version
    const { data: current, error: fetchError } = await supabase
      .from('prescriptions')
      .select('version')
      .eq('id', input.id)
      .eq('clinic_id', targetClinicId)
      .single()

    if (fetchError) {
      console.error('[Prescriptions] fetch before update error', fetchError)
      throw fetchError
    }

    const nextVersion = (current?.version || 1) + 1

    const { data, error } = await supabase
      .from('prescriptions')
      .update({
        content: input.content,
        status: input.status || 'draft',
        version: nextVersion,
        updated_at: new Date().toISOString()
      })
      .eq('id', input.id)
      .eq('clinic_id', targetClinicId)
      .select()
      .single()

    if (error) {
      console.error('[Prescriptions] update error', error)
      throw error
    }

    console.log('[Prescriptions] update success', { id: data.id, version: data.version })
    return data as PrescriptionRecord
  } else {
    // INSERT
    const { data, error } = await supabase
      .from('prescriptions')
      .insert([
        {
          clinic_id: targetClinicId,
          patient_id: input.patient_id,
          tutor_id: input.tutor_id,
          content: input.content,
          status: input.status || 'draft',
          version: 1,
          created_by: user?.id || null,
          updated_at: new Date().toISOString()
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('[Prescriptions] insert error', error)
      throw error
    }

    console.log('[Prescriptions] insert success', { id: data.id })
    return data as PrescriptionRecord
  }
}

/**
 * Buscar receita por ID (com validação de clinic)
 */
export async function getPrescriptionById(
  prescriptionId: string,
  clinicId?: string
): Promise<PrescriptionRecord | null> {
  const targetClinicId = resolveClinicId(clinicId)

  console.log('[Prescriptions] getting by id', prescriptionId)

  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('id', prescriptionId)
    .eq('clinic_id', targetClinicId)
    .single()

  if (error?.code === 'PGRST116') return null
  if (error) {
    console.error('[Prescriptions] get error', error)
    throw error
  }

  return data as PrescriptionRecord
}

/**
 * Listar receitas de um paciente ordenadas por data desc
 */
export async function listPrescriptionsByPatient(
  patientId: string,
  clinicId?: string
): Promise<PrescriptionRecord[]> {
  const targetClinicId = resolveClinicId(clinicId)

  console.log('[Prescriptions] listing for patient', patientId)

  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('clinic_id', targetClinicId)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Prescriptions] list error', error)
    throw error
  }

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
    .single()

  if (error) throw error
  return data as PrescriptionRecord
}

/**
 * Deletar receita (soft delete via void status)
 */
export async function voidPrescription(
  prescriptionId: string,
  clinicId?: string
): Promise<PrescriptionRecord> {
  console.log('[Prescriptions] voiding', prescriptionId)
  return setPrescriptionStatus(prescriptionId, 'void', clinicId)
}

function logSbDevError(scope: string, error: unknown) {
  if (!import.meta.env.DEV) return
  const err = error as any
  console.error(scope, {
    code: err?.code ?? err?.statusCode ?? null,
    message: err?.message ?? String(error || ''),
    details: err?.details ?? null,
    hint: err?.hint ?? null,
  })
}

/**
 * Exclui receita definitivamente e remove PDF do Storage quando existir.
 */
export async function deletePrescriptionPermanent(params: {
  prescriptionId: string
  clinicId?: string
  pdfPath?: string | null
  storageBucket?: string | null
}): Promise<void> {
  const targetClinicId = resolveClinicId(params.clinicId)
  const bucket = params.storageBucket || PDF_BUCKET

  if (params.pdfPath) {
    const { error: storageError } = await supabase.storage
      .from(bucket)
      .remove([params.pdfPath])

    if (storageError) {
      console.error('[Prescriptions] storage delete error', storageError)
      throw storageError
    }
  }

  const { error } = await supabase
    .from('prescriptions')
    .delete()
    .eq('id', params.prescriptionId)
    .eq('clinic_id', targetClinicId)

  if (error) {
    console.error('[Prescriptions] delete error', error)
    throw error
  }
}

// ==================== PDF STORAGE ====================
// Bucket: receituario-media (privado, authenticated only)
// Path pattern: ${clinicId}/patients/${patientId}/prescriptions/${prescriptionId}.pdf

const PDF_BUCKET = 'receituario-media'

/**
 * Faz upload do blob PDF para o bucket receituario-media.
 * Retorna o path armazenado (relativo ao bucket).
 */
export async function uploadPrescriptionPdf(params: {
  clinicId: string
  patientId: string
  prescriptionId: string
  blob: Blob
}): Promise<string> {
  if (!UUID_V4_LIKE.test(String(params.clinicId || '').trim())) {
    throw new Error('clinicId inválido para upload de PDF. O primeiro segmento do path deve ser UUID da clínica.')
  }
  const path = `${params.clinicId}/patients/${params.patientId}/prescriptions/${params.prescriptionId}.pdf`

  if (import.meta.env.DEV) {
    console.log('[Storage] upload start', { bucket: PDF_BUCKET, path, size: params.blob.size })
  }

  const { error } = await supabase.storage
    .from(PDF_BUCKET)
    .upload(path, params.blob, {
      upsert: true,
      contentType: 'application/pdf',
    })

  if (error) {
    logSbDevError('[Storage] upload fail', error)
    console.error('[Storage] upload fail', {
      message: error.message,
      details: (error as any).details ?? null,
      hint: (error as any).hint ?? null,
      code: (error as any).statusCode ?? (error as any).error ?? null,
    })
    throw error
  }

  if (import.meta.env.DEV) {
    console.log('[Storage] upload ok', { path })
  }

  return path
}

/**
 * Grava pdf_path e storage_bucket como colunas diretas em prescriptions.
 * (colunas adicionadas em 20260225150000_add_pdf_columns_to_prescriptions)
 */
export async function attachPdfToPresc(params: {
  prescriptionId: string
  pdfPath: string
  clinicId: string
}): Promise<void> {
  const targetClinicId = resolveClinicId(params.clinicId)

  const { error } = await supabase
    .from('prescriptions')
    .update({
      pdf_path: params.pdfPath,
      storage_bucket: PDF_BUCKET,
    })
    .eq('id', params.prescriptionId)
    .eq('clinic_id', targetClinicId)

  if (error) {
    logSbDevError('[Storage] attachPdfToPresc error', error)
    console.error('[Storage] attachPdfToPresc error', {
      message: error.message,
      details: (error as any).details ?? null,
      hint: (error as any).hint ?? null,
      code: (error as any).code ?? null,
    })
    throw error
  }

  if (import.meta.env.DEV) {
    console.log('[Storage] pdf_path salvo', { id: params.prescriptionId, path: params.pdfPath })
  }
}

/**
 * Gera uma signed URL temporária (bucket privado) para baixar o PDF.
 * @param pdfPath   Path relativo ao bucket (sem o nome do bucket)
 * @param expiresIn Duração em segundos — padrão 60 (1 min)
 */
export async function getPdfSignedUrl(pdfPath: string, expiresIn = 60): Promise<string> {
  if (import.meta.env.DEV) {
    console.log('[Storage] createSignedUrl', { path: pdfPath, expiresIn })
  }

  const { data, error } = await supabase.storage
    .from(PDF_BUCKET)
    .createSignedUrl(pdfPath, expiresIn)

  if (error) {
    logSbDevError('[Storage] signed url error', error)
    console.error('[Storage] signed url error', {
      message: error.message,
      details: (error as any).details ?? null,
      hint: (error as any).hint ?? null,
      code: (error as any).statusCode ?? (error as any).error ?? null,
    })
    throw error
  }

  return data.signedUrl
}
