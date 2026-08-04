import { supabase } from '../../../../src/lib/supabaseClient'
import type { NutritionCalculationSnapshotRecord } from './types'

const TABLE = 'nutrition_calculation_snapshots'

export async function upsertSnapshotToSupabase(record: NutritionCalculationSnapshotRecord): Promise<{ id: string }> {
  const row = {
    id: record.id,
    clinic_id: record.clinicId,
    created_by: record.createdBy,
    patient_external_id: record.patientExternalId ?? null,
    species: record.species,
    patient_name: record.patientName ?? null,
    calculation_type: record.calculationType,
    status: record.status,
    prescribed_kcal_day: record.prescribedKcalDay ?? null,
    current_weight_kg: record.currentWeightKg ?? null,
    target_weight_kg: record.targetWeightKg ?? null,
    bcs_9: record.bcs9 ?? null,
    muscle_condition: record.muscleCondition ?? null,
    snapshot_json: record.snapshot,
    snapshot_checksum: record.snapshotChecksum,
    parent_calculation_id: record.parentCalculationId ?? null,
    revision_number: record.revisionNumber,
    revision_reason: record.revisionReason ?? null,
    report_id: record.reportId,
    created_at: record.createdAt,
    finalized_at: record.finalizedAt ?? record.createdAt,
  }

  const { data, error } = await supabase.from(TABLE).upsert(row, { onConflict: 'id' }).select('id').single()
  if (error) throw error
  return { id: String(data.id) }
}

export async function findSnapshotByChecksum(clinicId: string, checksum: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, snapshot_checksum')
    .eq('clinic_id', clinicId)
    .eq('snapshot_checksum', checksum)
    .is('deleted_at', null)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getSnapshotFromSupabase(id: string) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}
