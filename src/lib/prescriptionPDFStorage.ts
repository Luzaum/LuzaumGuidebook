import { supabase } from './supabaseClient'
import { getStoredClinicId } from './clinic'
import type { PrescriptionRecord } from './prescriptionsRecords'

const DEFAULT_BUCKET = 'receituario-media'

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
    const clinicId = getStoredClinicId()
    if (!clinicId) {
        throw new Error('Clinic ID not found. Ensure clinic is selected.')
    }

    // Fetch prescription to get patient_id and clinic_id (extra validation)
    const { data: prescription, error: fetchError } = await supabase
        .from('prescriptions')
        .select('patient_id, clinic_id')
        .eq('id', prescriptionId)
        .single()

    if (fetchError) {
        throw new Error(`Prescription not found: ${fetchError.message}`)
    }

    const patientId = prescription.patient_id
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
        console.warn('Failed to delete PDF from storage:', error.message)
    }
}