import { supabase } from './supabaseClient'

export type Clinic = {
  id: string
  name: string
  created_at: string
}

export type MembershipRole = 'owner' | 'member'

export type Membership = {
  id: string
  user_id: string
  clinic_id: string
  role: MembershipRole
  created_at: string
  clinics: Clinic | Clinic[] | null
}

export type ActiveClinicMembership = {
  membershipId: string
  userId: string
  clinicId: string
  clinicName: string
  role: MembershipRole
}

const ACTIVE_CLINIC_STORAGE_KEY = 'vetius:active-clinic-id'

function normalizeClinicFromJoin(value: Membership['clinics']): Clinic | null {
  if (!value) return null
  if (Array.isArray(value)) return value[0] || null
  return value
}

function normalizeMembership(row: Membership | null): ActiveClinicMembership | null {
  if (!row) return null
  const clinic = normalizeClinicFromJoin(row.clinics)
  if (!clinic) return null

  return {
    membershipId: row.id,
    userId: row.user_id,
    clinicId: row.clinic_id,
    clinicName: clinic.name,
    role: row.role,
  }
}

export function getStoredClinicId(): string | null {
  try {
    const value = localStorage.getItem(ACTIVE_CLINIC_STORAGE_KEY)
    return value ? value.trim() || null : null
  } catch {
    return null
  }
}

export function storeClinicId(clinicId: string | null) {
  try {
    if (clinicId && clinicId.trim()) {
      localStorage.setItem(ACTIVE_CLINIC_STORAGE_KEY, clinicId.trim())
    } else {
      localStorage.removeItem(ACTIVE_CLINIC_STORAGE_KEY)
    }
  } catch {
    // noop
  }
}

export async function getMyMemberships(): Promise<ActiveClinicMembership[]> {
  const { data, error } = await supabase
    .from('memberships')
    .select('id,user_id,clinic_id,role,created_at,clinics:clinics(id,name,created_at)')
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  const rows = (data || []) as Membership[]
  const validRows = rows.filter((row) => {
    const clinicId = String(row.clinic_id || '').trim()
    if (!clinicId) return false
    const clinic = normalizeClinicFromJoin(row.clinics)
    return !!clinic
  })

  const memberships = validRows.map((row) => normalizeMembership(row)).filter((m): m is ActiveClinicMembership => m !== null)
  return memberships
}

export async function getMyMembership(): Promise<ActiveClinicMembership | null> {
  const { data, error } = await supabase
    .from('memberships')
    .select('id,user_id,clinic_id,role,created_at,clinics:clinics(id,name,created_at)')
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  const rows = (data || []) as Membership[]
  if (rows.length === 0) {
    storeClinicId(null)
    return null
  }

  // Active clinic must be valid:
  // - clinic_id exists
  // - join with clinics returns a row (clinic exists / visible to user)
  const validRows = rows.filter((row) => {
    const clinicId = String(row.clinic_id || '').trim()
    if (!clinicId) return false
    const clinic = normalizeClinicFromJoin(row.clinics)
    return !!clinic
  })

  if (validRows.length === 0) {
    storeClinicId(null)
    return null
  }

  const storedId = getStoredClinicId()
  const matching = storedId ? validRows.find((r) => r.clinic_id === storedId) : null
  const bestRow = matching || validRows[0]

  const membership = normalizeMembership(bestRow)
  storeClinicId(membership?.clinicId || null)
  return membership
}

type BootstrapClinicRpcResponse = {
  clinic_id: string
  clinic_name: string
  role: MembershipRole
}

function normalizeBootstrapResponse(payload: unknown): BootstrapClinicRpcResponse {
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    const obj = payload as Partial<BootstrapClinicRpcResponse>
    return {
      clinic_id: String(obj.clinic_id || ''),
      clinic_name: String(obj.clinic_name || ''),
      role: (obj.role === 'member' ? 'member' : 'owner') as MembershipRole,
    }
  }

  throw new Error('Resposta invalida ao criar clínica.')
}

export async function bootstrapClinic(clinicName: string) {
  const normalizedName = clinicName.trim()
  const { data, error } = await supabase.rpc('bootstrap_clinic', {
    clinic_name: normalizedName || null,
  })

  if (error) {
    throw error
  }

  const normalized = normalizeBootstrapResponse(data)
  storeClinicId(normalized.clinic_id)
  return normalized
}

export async function clearClinicContextOnSignOut() {
  storeClinicId(null)
}
