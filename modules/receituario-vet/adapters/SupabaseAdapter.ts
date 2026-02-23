import type { SupabaseClient } from '@supabase/supabase-js'
import { insertWithClinicId } from '../../../src/lib/clinicScopedDb'
import type { PatientInfo, TutorInfo } from '../rxTypes'
import type {
  DataAdapter,
  DataAdapterPatientCreateInput,
  DataAdapterPatientMatch,
  DataAdapterTutorCreateInput,
} from './DataAdapter'

type SupabaseTutorRow = {
  id: string
  full_name?: string
  name?: string
  phone?: string
  email?: string
  cpf?: string
  rg?: string
  address_street?: string
  address_number?: string
  address_complement?: string
  address_district?: string
  address_city?: string
  address_state?: string
  address_zip?: string
  notes?: string
}

type SupabasePatientRow = {
  id: string
  tutor_id?: string
  name?: string
  species?: string
  breed?: string
  sex?: string
  reproductive_status?: string
  age_text?: string
  birth_date?: string
  coat?: string
  weight_kg?: string
  weight_date?: string
  notes?: string
}

function normalizeLooseText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function normalizeSpecies(value: string): PatientInfo['species'] {
  return normalizeLooseText(value).startsWith('fel') ? 'Felina' : 'Canina'
}

function normalizeSex(value: string): PatientInfo['sex'] {
  const sex = normalizeLooseText(value)
  if (sex === 'f' || sex === 'fn' || sex === 'femea') return 'F\u00eamea'
  if (sex === 'm' || sex === 'mn' || sex === 'macho') return 'Macho'
  return 'Sem dados'
}

function normalizeReproductiveStatus(value: string): PatientInfo['reproductiveStatus'] {
  const status = normalizeLooseText(value)
  if (status === 'castrado') return 'Castrado'
  if (status === 'fertil') return 'F\u00e9rtil'
  return 'Sem dados'
}

function mapTutorRow(row: SupabaseTutorRow): TutorInfo {
  return {
    tutorRecordId: String(row.id || ''),
    name: String(row.full_name || row.name || ''),
    phone: String(row.phone || ''),
    cpf: String(row.cpf || ''),
    rg: String(row.rg || ''),
    email: String(row.email || ''),
    addressStreet: String(row.address_street || ''),
    addressNumber: String(row.address_number || ''),
    addressComplement: String(row.address_complement || ''),
    addressDistrict: String(row.address_district || ''),
    addressCity: String(row.address_city || ''),
    addressState: String(row.address_state || ''),
    addressZip: String(row.address_zip || ''),
    notes: String(row.notes || ''),
  }
}

function mapPatientRow(row: SupabasePatientRow): PatientInfo {
  return {
    patientRecordId: String(row.id || ''),
    name: String(row.name || ''),
    species: normalizeSpecies(String(row.species || '')),
    breed: String(row.breed || ''),
    sex: normalizeSex(String(row.sex || '')),
    reproductiveStatus: normalizeReproductiveStatus(String(row.reproductive_status || '')),
    ageText: String(row.age_text || ''),
    birthDate: String(row.birth_date || ''),
    coat: String(row.coat || ''),
    weightKg: String(row.weight_kg || ''),
    weightDate: String(row.weight_date || ''),
    notes: String(row.notes || ''),
    showNotesInPrint: false,
  }
}

interface SupabaseAdapterOptions {
  supabase: SupabaseClient
  getClinicId: () => string | null | undefined
}

export class SupabaseAdapter implements DataAdapter {
  source: 'supabase' = 'supabase'
  private supabase: SupabaseClient
  private getClinicId: () => string | null | undefined

  constructor(options: SupabaseAdapterOptions) {
    this.supabase = options.supabase
    this.getClinicId = options.getClinicId
  }

  private resolveClinicId(): string {
    const clinicId = String(this.getClinicId() || '').trim()
    if (!clinicId) {
      throw new Error('Clínica ativa não encontrada.')
    }
    return clinicId
  }

  private async readCurrentUserId(): Promise<string | null> {
    const { data, error } = await this.supabase.auth.getUser()
    if (error) return null
    return data.user?.id || null
  }

  private async insertClinicScopedRow(
    table: 'tutors' | 'patients',
    payload: Record<string, unknown>,
    clinicId: string
  ): Promise<Record<string, unknown>> {
    try {
      const inserted = await insertWithClinicId(table, payload, clinicId)
      const row = Array.isArray(inserted) ? inserted[0] : null
      if (!row) {
        throw new Error(`Não foi possível inserir registro em ${table}.`)
      }
      return row as Record<string, unknown>
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : ''
      const createdByColumnMissing =
        message.includes('created_by') &&
        (message.includes('does not exist') || message.includes('column') || message.includes('schema cache'))

      if (createdByColumnMissing && Object.prototype.hasOwnProperty.call(payload, 'created_by')) {
        const fallbackPayload = { ...payload }
        delete fallbackPayload.created_by
        const inserted = await insertWithClinicId(table, fallbackPayload, clinicId)
        const row = Array.isArray(inserted) ? inserted[0] : null
        if (!row) {
          throw new Error(`Não foi possível inserir registro em ${table}.`)
        }
        return row as Record<string, unknown>
      }

      throw error
    }
  }

  async searchPatientsByName(query: string, limit = 10): Promise<DataAdapterPatientMatch[]> {
    const clinicId = this.resolveClinicId()
    const needle = String(query || '').trim()
    if (needle.length < 2) return []

    const { data: patients, error: patientsError } = await this.supabase
      .from('patients')
      .select(
        'id,tutor_id,name,species,breed,sex,reproductive_status,age_text,birth_date,coat,weight_kg,weight_date,notes'
      )
      .eq('clinic_id', clinicId)
      .ilike('name', `%${needle}%`)
      .order('updated_at', { ascending: false })
      .limit(Math.max(1, limit))

    let patientRows = (patients || []) as SupabasePatientRow[]

    if (patientsError) {
      const { data: fallbackPatients, error: fallbackError } = await this.supabase
        .from('patients')
        .select(
          'id,tutor_id,name,species,breed,sex,reproductive_status,age_text,birth_date,coat,weight_kg,weight_date,notes'
        )
        .eq('clinic_id', clinicId)
        .ilike('name', `%${needle}%`)
        .order('name', { ascending: true })
        .limit(Math.max(1, limit))

      if (fallbackError) throw fallbackError
      patientRows = (fallbackPatients || []) as SupabasePatientRow[]
    }
    const tutorIds = Array.from(
      new Set(patientRows.map((entry) => String(entry.tutor_id || '').trim()).filter(Boolean))
    )

    if (tutorIds.length === 0) return []

    const { data: tutors, error: tutorsError } = await this.supabase
      .from('tutors')
      .select(
        'id,full_name,name,phone,email,cpf,rg,address_street,address_number,address_complement,address_district,address_city,address_state,address_zip,notes'
      )
      .eq('clinic_id', clinicId)
      .in('id', tutorIds)

    if (tutorsError) throw tutorsError

    const tutorMap = new Map(
      ((tutors || []) as SupabaseTutorRow[]).map((entry) => [String(entry.id || '').trim(), mapTutorRow(entry)])
    )

    return patientRows
      .map((patientRow) => {
        const tutorId = String(patientRow.tutor_id || '').trim()
        const tutor = tutorMap.get(tutorId)
        if (!tutor) return null
        return {
          patient: mapPatientRow(patientRow),
          tutor,
        } as DataAdapterPatientMatch
      })
      .filter((entry): entry is DataAdapterPatientMatch => !!entry)
  }

  async searchTutorsByName(query: string, limit = 10): Promise<TutorInfo[]> {
    const clinicId = this.resolveClinicId()
    const needle = String(query || '').trim()
    const safeLimit = Math.max(1, limit)

    const selectFields =
      'id,full_name,name,phone,email,cpf,rg,address_street,address_number,address_complement,address_district,address_city,address_state,address_zip,notes'

    let request = this.supabase
      .from('tutors')
      .select(selectFields)
      .eq('clinic_id', clinicId)
      .order('full_name', { ascending: true })
      .limit(safeLimit)

    if (needle) request = request.ilike('full_name', `%${needle}%`)

    let { data, error } = await request

    if (error) {
      let fallback = this.supabase
        .from('tutors')
        .select(selectFields)
        .eq('clinic_id', clinicId)
        .order('name', { ascending: true })
        .limit(safeLimit)

      if (needle) fallback = fallback.ilike('name', `%${needle}%`)
      const fallbackResult = await fallback
      data = fallbackResult.data
      error = fallbackResult.error
    }

    if (error) throw error
    return ((data || []) as SupabaseTutorRow[]).map(mapTutorRow)
  }

  async getTutorById(id: string): Promise<TutorInfo | null> {
    const clinicId = this.resolveClinicId()
    const targetId = String(id || '').trim()
    if (!targetId) return null

    const { data, error } = await this.supabase
      .from('tutors')
      .select(
        'id,full_name,name,phone,email,cpf,rg,address_street,address_number,address_complement,address_district,address_city,address_state,address_zip,notes'
      )
      .eq('clinic_id', clinicId)
      .eq('id', targetId)
      .maybeSingle()

    if (error) throw error
    if (!data) return null
    return mapTutorRow(data as SupabaseTutorRow)
  }

  async createTutor(input: DataAdapterTutorCreateInput): Promise<TutorInfo> {
    const clinicId = this.resolveClinicId()
    const name = String(input.name || '').trim()
    if (!name) throw new Error('Nome do tutor e obrigatório.')

    const createdBy = await this.readCurrentUserId()
    const payload: Record<string, unknown> = {
      full_name: name,
      phone: input.phone || null,
      email: input.email || null,
      cpf: input.cpf || null,
      rg: input.rg || null,
      address_street: input.addressStreet || null,
      address_number: input.addressNumber || null,
      address_complement: input.addressComplement || null,
      address_district: input.addressDistrict || null,
      address_city: input.addressCity || null,
      address_state: input.addressState || null,
      address_zip: input.addressZip || null,
      notes: input.notes || null,
    }
    if (createdBy) payload.created_by = createdBy

    const row = await this.insertClinicScopedRow('tutors', payload, clinicId)
    return mapTutorRow(row as SupabaseTutorRow)
  }

  async createPatient(input: DataAdapterPatientCreateInput): Promise<PatientInfo> {
    const clinicId = this.resolveClinicId()
    const tutorRecordId = String(input.tutorRecordId || '').trim()
    const name = String(input.name || '').trim()

    if (!tutorRecordId) throw new Error('Tutor obrigatório.')
    if (!name) throw new Error('Nome do paciente e obrigatório.')

    const createdBy = await this.readCurrentUserId()
    const payload: Record<string, unknown> = {
      tutor_id: tutorRecordId,
      name,
      species: input.species || null,
      breed: input.breed || null,
      sex: input.sex || null,
      reproductive_status: input.reproductiveStatus || null,
      age_text: input.ageText || null,
      birth_date: input.birthDate || null,
      coat: input.coat || null,
      weight_kg: input.weightKg || null,
      weight_date: input.weightDate || null,
      notes: input.notes || null,
    }
    if (createdBy) payload.created_by = createdBy

    const row = await this.insertClinicScopedRow('patients', payload, clinicId)
    return mapPatientRow(row as SupabasePatientRow)
  }

  async listPatientsByTutorId(tutorId: string): Promise<PatientInfo[]> {
    const clinicId = this.resolveClinicId()
    const targetTutorId = String(tutorId || '').trim()
    if (!targetTutorId) return []

    const { data, error } = await this.supabase
      .from('patients')
      .select(
        'id,tutor_id,name,species,breed,sex,reproductive_status,age_text,birth_date,coat,weight_kg,weight_date,notes'
      )
      .eq('clinic_id', clinicId)
      .eq('tutor_id', targetTutorId)
      .order('name', { ascending: true })

    if (error) throw error
    return ((data || []) as SupabasePatientRow[]).map(mapPatientRow)
  }
}
