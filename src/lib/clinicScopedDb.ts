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
    .select('id')

  if (error) throw error
  return data
}

export async function selectByClinicId(table: string, clinicId?: string, columns = '*') {
  const targetClinicId = resolveClinicId(clinicId)
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .eq('clinic_id', targetClinicId)
    .is('deleted_at', null)

  if (error) throw error
  return data
}

export async function softDeleteWithClinicId(
  table: string,
  id: string | string[],
  clinicId?: string
) {
  const targetClinicId = resolveClinicId(clinicId)
  const isMultiple = Array.isArray(id)

  let query = supabase
    .from(table)
    .update({ deleted_at: new Date().toISOString() })
    .eq('clinic_id', targetClinicId)

  if (isMultiple) {
    query = query.in('id', id)
  } else {
    query = query.eq('id', id)
  }

  const { data, error } = await query.select('id')
  if (error) throw error
  return data
}

