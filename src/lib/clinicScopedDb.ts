import { supabase } from './supabaseClient'
import { getStoredClinicId } from './clinic'

/**
 * Safe stringify that handles circular references and Supabase error objects
 */
export function safeStringify(obj: any, indent = 2): string {
  try {
    if (obj === null || obj === undefined) return String(obj)
    if (typeof obj === 'string') return obj
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)

    // Handle Error objects specially
    if (obj instanceof Error) {
      return JSON.stringify({
        name: obj.name,
        message: obj.message,
        stack: obj.stack,
        ...(obj as any).code && { code: (obj as any).code },
        ...(obj as any).details && { details: (obj as any).details },
        ...(obj as any).hint && { hint: (obj as any).hint },
      }, null, indent)
    }

    // Handle Supabase PostgREST error format
    if (obj && typeof obj === 'object' && 'code' in obj && 'message' in obj) {
      return JSON.stringify({
        code: obj.code,
        message: obj.message,
        details: obj.details || null,
        hint: obj.hint || null,
      }, null, indent)
    }

    // Generic object - use JSON.stringify with replacer to handle circular refs
    const seen = new WeakSet()
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) return '[Circular Reference]'
        seen.add(value)
      }
      return value
    }, indent)
  } catch (err) {
    return `[Stringify failed: ${err instanceof Error ? err.message : String(err)}]`
  }
}

function logSbError(tag: string, error: any) {
  if (!error) return
  console.error(tag, safeStringify({
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  }))
}
export { logSbError }

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
  console.log('[Insert] START', { table, payload })

  const { data, error } = await supabase
    .from(table)
    .insert([{ ...payload, clinic_id: targetClinicId }])
    .select('id')

  console.log('[Insert] RESULT', { data, error })
  logSbError('[Insert] ERROR', error)

  if (error) throw error
  return data
}

export async function selectByClinicId(table: string, clinicId?: string, columns = '*') {
  const targetClinicId = resolveClinicId(clinicId)
  console.log('[SelectByClinic] START', { table, columns, clinicId: targetClinicId })

  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .eq('clinic_id', targetClinicId)
    .is('deleted_at', null)

  console.log('[SelectByClinic] RESULT', { count: data?.length, error })
  logSbError('[SelectByClinic] ERROR', error)

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

  console.log('[SoftDelete] START', { table, id: isMultiple ? `${id.length} items` : id, clinicId: targetClinicId })

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
  console.log('[SoftDelete] RESULT', { data, error })
  logSbError('[SoftDelete] ERROR', error)

  if (error) throw error
  return data
}
