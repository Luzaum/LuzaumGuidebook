import { supabase } from './supabaseClient'
import { getStoredClinicId } from './clinic'
import type { PrescriptionRecord } from './prescriptionsRecords'

const DEFAULT_BUCKET = 'receituario-media'
const UUID_V4_LIKE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function sanitizePathSegment(value: string): string {
    return String(value || '')
        .trim()
        .replace(/[^a-zA-Z0-9_-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

/**
 * Upload a prescription PDF to Supabase Storage and update the prescription record.
 * @param prescriptionId UUID of the prescription record
 * @param pdfFile File object (PDF)
 * @param documentKind 'standard' or 'special-control'
 * @returns public URL of the uploaded PDF
 */
export async function uploadPrescriptionPDF(
    prescriptionId: string,
    pdfFile: File,
    documentKind: 'standard' | 'special-control' = 'standard'
): Promise<{ path: string; publicUrl: string; bucket: string }> {
    const fallbackClinicId = getStoredClinicId()

    // Fetch prescription to get patient_id and clinic_id (extra validation)
    const { data: prescription, error: fetchError } = await supabase
        .from('prescriptions')
        .select('patient_id, clinic_id')
        .eq('id', prescriptionId)
        .single()

    if (fetchError) {
        logSbDevError('[PrescriptionPDF] fetch prescription error', fetchError)
        throw new Error(`Prescription not found: ${fetchError.message}`)
    }

    const patientId = prescription.patient_id
    const clinicId = String(prescription.clinic_id || fallbackClinicId || '').trim()
    if (!UUID_V4_LIKE.test(clinicId)) {
        throw new Error('clinicId inválido para upload de PDF. O path deve iniciar com UUID da clínica.')
    }
    const safeClinicId = sanitizePathSegment(clinicId)
    const safePatientId = sanitizePathSegment(patientId)
    const safePrescriptionId = sanitizePathSegment(prescriptionId)
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 10)
    const fileName = `${timestamp}-${randomId}.pdf`

    const path = `${safeClinicId}/${safePatientId}/${safePrescriptionId}/${fileName}`

    const { error: uploadError } = await supabase.storage
        .from(DEFAULT_BUCKET)
        .upload(path, pdfFile, {
            upsert: false,
            cacheControl: '31536000',
            contentType: 'application/pdf',
        })

    if (uploadError) {
        logSbDevError('[PrescriptionPDF] upload error', uploadError)
        throw new Error(`Failed to upload PDF: ${uploadError.message}`)
    }

    const { data: urlData } = supabase.storage.from(DEFAULT_BUCKET).getPublicUrl(path)
    const publicUrl = urlData?.publicUrl || ''

    // Update prescription record with PDF metadata
    const { error: updateError } = await supabase
        .from('prescriptions')
        .update({
            pdf_path: path,
            pdf_url: publicUrl,
            document_kind: documentKind,
            storage_bucket: DEFAULT_BUCKET,
            updated_at: new Date().toISOString(),
        })
        .eq('id', prescriptionId)

    if (updateError) {
        logSbDevError('[PrescriptionPDF] update prescription pdf metadata error', updateError)
        // Try to delete the uploaded file? For now just log.
        console.warn('Failed to update prescription with PDF metadata:', updateError.message)
        throw new Error(`PDF uploaded but failed to update record: ${updateError.message}`)
    }

    return { path, publicUrl, bucket: DEFAULT_BUCKET }
}

/**
 * Delete a prescription PDF from storage (optional).
 */
export async function deletePrescriptionPDF(prescriptionId: string): Promise<void> {
    const { data: prescription } = await supabase
        .from('prescriptions')
        .select('pdf_path, storage_bucket')
        .eq('id', prescriptionId)
        .single()

    if (!prescription?.pdf_path || !prescription.storage_bucket) {
        return
    }

    const { error } = await supabase.storage
        .from(prescription.storage_bucket)
        .remove([prescription.pdf_path])

    if (error) {
        logSbDevError('[PrescriptionPDF] delete file error', error)
        console.warn('Failed to delete PDF from storage:', error.message)
    }
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
