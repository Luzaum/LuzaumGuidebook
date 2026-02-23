import type { PatientInfo, TutorInfo } from '../rxTypes'

export type AdapterDataSource = 'local' | 'supabase'

export type DataAdapterPatientMatch = {
  patient: PatientInfo
  tutor: TutorInfo
}

export type DataAdapterTutorCreateInput = {
  name: string
  phone?: string
  email?: string
  cpf?: string
  rg?: string
  addressStreet?: string
  addressNumber?: string
  addressComplement?: string
  addressDistrict?: string
  addressCity?: string
  addressState?: string
  addressZip?: string
  notes?: string
}

export type DataAdapterPatientCreateInput = {
  tutorRecordId: string
  name: string
  species?: PatientInfo['species']
  breed?: string
  sex?: PatientInfo['sex']
  reproductiveStatus?: PatientInfo['reproductiveStatus']
  ageText?: string
  birthDate?: string
  coat?: string
  weightKg?: string
  weightDate?: string
  notes?: string
  showNotesInPrint?: boolean
}

export interface DataAdapter {
  source: AdapterDataSource
  searchPatientsByName(query: string, limit?: number): Promise<DataAdapterPatientMatch[]>
  searchTutorsByName(query: string, limit?: number): Promise<TutorInfo[]>
  getTutorById(id: string): Promise<TutorInfo | null>
  createTutor(input: DataAdapterTutorCreateInput): Promise<TutorInfo>
  createPatient(input: DataAdapterPatientCreateInput): Promise<PatientInfo>
  listPatientsByTutorId?(tutorId: string): Promise<PatientInfo[]>
}
