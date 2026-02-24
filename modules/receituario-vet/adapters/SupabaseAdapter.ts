import type { SupabaseClient } from '@supabase/supabase-js'
import { insertWithClinicId } from '../../../src/lib/clinicScopedDb'
import { normalizeNeutered } from '../rxUtils'
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
  phone?: string
  email?: string
  document_id?: string
  cpf?: string
  rg?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  zipcode?: string
  notes?: string
}

type SupabasePatientRow = {
  id: string
  tutor_id?: string
  name?: string
  species?: string
  breed?: string
  sex?: string
  neutered?: string
  age_text?: string
  weight_kg?: string
  coat?: string
  microchip?: string
  anamnesis?: string
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
    name: String(row.full_name || ''),
    fullName: String(row.full_name || ''),
    full_name: String(row.full_name || ''),
    phone: String(row.phone || ''),
    email: String(row.email || ''),
    documentId: String(row.document_id || ''),
    document_id: String(row.document_id || ''),
    cpf: String(row.cpf || ''),
    rg: String(row.rg || ''),
    street: String(row.street || ''),
    number: String(row.number || ''),
    complement: String(row.complement || ''),
    neighborhood: String(row.neighborhood || ''),
    city: String(row.city || ''),
    state: String(row.state || ''),
    zipcode: String(row.zipcode || ''),
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
    reproductiveStatus: normalizeReproductiveStatus(String(row.neutered || '')),
    ageText: String(row.age_text || ''),
    coat: String(row.coat || ''),
    microchip: String(row.microchip || ''),
    microchipped: !!row.microchip,
    weightKg: String(row.weight_kg || ''),
    weightDate: '',
    anamnesis: String(row.anamnesis || ''),
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
      const data = Array.isArray(inserted) ? inserted[0] : null
      if (!data || !data.id) {
        throw new Error(`Não foi possível inserir registro em ${table}.`)
      }
      return { ...payload, id: data.id } as Record<string, unknown>
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : ''
      const createdByColumnMissing =
        message.includes('created_by') &&
        (message.includes('does not exist') || message.includes('column') || message.includes('schema cache'))

      if (createdByColumnMissing && Object.prototype.hasOwnProperty.call(payload, 'created_by')) {
        const fallbackPayload = { ...payload }
        delete fallbackPayload.created_by
        const inserted = await insertWithClinicId(table, fallbackPayload, clinicId)
        const data = Array.isArray(inserted) ? inserted[0] : null
        if (!data || !data.id) {
          throw new Error(`Não foi possível inserir registro em ${table}.`)
        }
        return { ...fallbackPayload, id: data.id } as Record<string, unknown>
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
        'id,tutor_id,name,species,breed,sex,neutered,age_text,weight_kg,coat,microchip,notes'
      )
      .eq('clinic_id', clinicId)
      .is('deleted_at', null)
      .ilike('name', `%${needle}%`)
      .order('updated_at', { ascending: false })
      .limit(Math.max(1, limit))

    let patientRows = (patients || []) as SupabasePatientRow[]

    if (patientsError) {
      const { data: fallbackPatients, error: fallbackError } = await this.supabase
        .from('patients')
        .select(
          'id,tutor_id,name,species,breed,sex,neutered,age_text,weight_kg,coat,microchip,notes'
        )
        .eq('clinic_id', clinicId)
        .is('deleted_at', null)
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
        'id,full_name,phone,email,document_id,cpf,rg,street,number,complement,neighborhood,city,state,zipcode,notes'
      )
      .eq('clinic_id', clinicId)
      .is('deleted_at', null)
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
      'id,full_name,phone,email,document_id,cpf,rg,street,number,complement,neighborhood,city,state,zipcode,notes'

    let request = this.supabase
      .from('tutors')
      .select(selectFields)
      .eq('clinic_id', clinicId)
      .is('deleted_at', null)
      .order('full_name', { ascending: true })
      .limit(safeLimit)

    if (needle) request = request.ilike('full_name', `%${needle}%`)

    let { data, error } = await request

    if (error) {
      // No fallback needed or fallback to same field if schema issues, 
      // but 'name' is definitely gone.
      if (error) throw error
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
        'id,full_name,phone,email,document_id,cpf,rg,street,number,complement,neighborhood,city,state,zipcode,notes'
      )
      .eq('clinic_id', clinicId)
      .is('deleted_at', null)
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
      document_id: input.documentId || null,
      cpf: input.cpf || null,
      rg: input.rg || null,
      street: input.street || null,
      number: input.number || null,
      complement: input.complement || null,
      neighborhood: input.neighborhood || null,
      city: input.city || null,
      state: input.state || null,
      zipcode: input.zipcode || null,
      notes: input.notes || null,
    }
    if (createdBy) payload.created_by = createdBy

    if (import.meta.env.DEV) {
      console.log('[DEBUG] [SupabaseAdapter] createTutor payload', payload)
    }

    try {
      const row = await this.insertClinicScopedRow('tutors', payload, clinicId)
      if (import.meta.env.DEV) {
        console.log('[DEBUG] [SupabaseAdapter] createTutor result', { data: row, error: null })
      }
      return mapTutorRow(row as SupabaseTutorRow)
    } catch (err) {
      if (import.meta.env.DEV) {
        console.log('[DEBUG] [SupabaseAdapter] createTutor result', { data: null, error: err })
      }
      throw err
    }
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
      neutered: normalizeNeutered(input.reproductiveStatus),
      age_text: input.ageText || null,
      weight_kg: input.weightKg || null,
      coat: input.coat || null,
      microchip: input.microchip || null,
      anamnesis: input.anamnesis || null,
      notes: input.notes || null,
    }
    if (createdBy) payload.created_by = createdBy

    if (import.meta.env.DEV) {
      console.log('[DEBUG] [SupabaseAdapter] createPatient payload', payload)
    }

    try {
      const row = await this.insertClinicScopedRow('patients', payload, clinicId)
      if (import.meta.env.DEV) {
        console.log('[DEBUG] [SupabaseAdapter] createPatient result', { data: row, error: null })
      }
      return mapPatientRow(row as SupabasePatientRow)
    } catch (err) {
      if (import.meta.env.DEV) {
        console.log('[DEBUG] [SupabaseAdapter] createPatient result', { data: null, error: err })
      }
      throw err
    }
  }

  async listPatientsByTutorId(tutorId: string): Promise<PatientInfo[]> {
    const clinicId = this.resolveClinicId()
    const targetTutorId = String(tutorId || '').trim()
    if (!targetTutorId) return []

    const { data, error } = await this.supabase
      .from('patients')
      .select(
        'id,tutor_id,name,species,breed,sex,neutered,age_text,weight_kg,coat,microchip,anamnesis,notes'
      )
      .eq('clinic_id', clinicId)
      .is('deleted_at', null)
      .eq('tutor_id', targetTutorId)
      .order('name', { ascending: true })

    if (error) throw error
    return ((data || []) as SupabasePatientRow[]).map(mapPatientRow)
  }
}
