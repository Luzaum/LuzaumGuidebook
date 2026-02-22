import { supabase } from './supabaseClient'
import { getStoredClinicId } from './clinic'

function resolveClinicId(clinicId?: string) {
  const target = (clinicId || getStoredClinicId() || '').trim()
  if (!target) {
    throw new Error('clinic_id ausente. Garanta clinic setup antes de gravar dados.')
  }
  return target
}

export async function insertWithClinicId(
  table: string,
  payload: Record<string, unknown>,
  clinicId?: string
) {
  const targetClinicId = resolveClinicId(clinicId)
  const { data, error } = await supabase
    .from(table)
    .insert([{ ...payload, clinic_id: targetClinicId }])
    .select()

  if (error) throw error
  return data
}

export async function selectByClinicId(table: string, clinicId?: string) {
  const targetClinicId = resolveClinicId(clinicId)
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('clinic_id', targetClinicId)

  if (error) throw error
  return data
}
