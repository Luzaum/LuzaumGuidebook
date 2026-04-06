import { supabase } from '../../../src/lib/supabaseClient'
import { getStoredClinicId } from '../../../src/lib/clinic'
import type { StoredCalculationReport } from '../types'

const NUTRITION_REPORTS_TABLE = 'nutrition_reports'

type NutritionReportRow = {
  id: string
  clinic_id: string
  created_by_user_id: string
  patient_id: string | null
  patient_key: string
  source_report_id: string | null
  patient_snapshot_json: unknown
  report_payload_json: unknown
  energy_payload_json: unknown
  formulation_payload_json: unknown
  programmed_feeding_payload_json: unknown
  created_at: string
  updated_at: string
}

function getClinicIdOrThrow() {
  const clinicId = String(getStoredClinicId() || '').trim()
  if (!clinicId) {
    throw new Error('Clinica ativa nao encontrada. Abra o app com uma clinica selecionada.')
  }
  return clinicId
}

async function getCurrentUserIdOrThrow() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  const userId = String(data.user?.id || '').trim()
  if (!userId) {
    throw new Error('Usuario autenticado nao encontrado.')
  }
  return userId
}

function toStoredReport(row: NutritionReportRow): StoredCalculationReport {
  return row.report_payload_json as StoredCalculationReport
}

function toDbRow(report: StoredCalculationReport, clinicId: string, userId: string) {
  return {
    id: report.id,
    clinic_id: clinicId,
    created_by_user_id: userId,
    patient_id: report.patient.id ?? null,
    patient_key: report.patientKey ?? 'sem-patient-key',
    source_report_id: report.id,
    patient_snapshot_json: report.patient ?? {},
    report_payload_json: report,
    energy_payload_json: report.energy ?? {},
    formulation_payload_json: {
      diet: report.diet ?? {},
      formula: report.formula ?? {},
      target: report.target ?? {},
    },
    programmed_feeding_payload_json:
      report.formula?.programmedFeeding ?? report.diet?.programmedFeeding ?? null,
    created_at: report.createdAt,
  }
}

export async function listNutritionReportsFromSupabase(): Promise<StoredCalculationReport[]> {
  const clinicId = getClinicIdOrThrow()
  const { data, error } = await supabase
    .from(NUTRITION_REPORTS_TABLE)
    .select('*')
    .eq('clinic_id', clinicId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return ((data ?? []) as NutritionReportRow[]).map(toStoredReport)
}

export async function getNutritionReportByIdFromSupabase(reportId: string): Promise<StoredCalculationReport | null> {
  const clinicId = getClinicIdOrThrow()
  const { data, error } = await supabase
    .from(NUTRITION_REPORTS_TABLE)
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('id', reportId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return toStoredReport(data as NutritionReportRow)
}

export async function listNutritionReportsByPatientKeyFromSupabase(patientKey: string): Promise<StoredCalculationReport[]> {
  const clinicId = getClinicIdOrThrow()
  const { data, error } = await supabase
    .from(NUTRITION_REPORTS_TABLE)
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('patient_key', patientKey)
    .order('created_at', { ascending: false })

  if (error) throw error
  return ((data ?? []) as NutritionReportRow[]).map(toStoredReport)
}

export async function saveNutritionReportToSupabase(report: StoredCalculationReport): Promise<void> {
  const clinicId = getClinicIdOrThrow()
  const userId = await getCurrentUserIdOrThrow()
  const row = toDbRow(report, clinicId, userId)

  const { error } = await supabase
    .from(NUTRITION_REPORTS_TABLE)
    .upsert(row, { onConflict: 'source_report_id' })

  if (error) throw error
}

export async function migrateLocalReportsToSupabase(localReports: StoredCalculationReport[]) {
  if (!localReports.length) return { migrated: 0, skipped: 0 }
  const clinicId = getClinicIdOrThrow()
  const userId = await getCurrentUserIdOrThrow()

  let migrated = 0
  let skipped = 0

  for (const report of localReports) {
    const row = toDbRow(report, clinicId, userId)
    const { error } = await supabase
      .from(NUTRITION_REPORTS_TABLE)
      .upsert(row, { onConflict: 'source_report_id' })
    if (error) {
      skipped += 1
      continue
    }
    migrated += 1
  }

  return { migrated, skipped }
}
