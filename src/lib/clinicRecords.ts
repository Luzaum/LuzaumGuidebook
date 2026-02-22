import { insertWithClinicId, selectByClinicId } from './clinicScopedDb'

export type TutorInsertInput = {
  full_name: string
  phone?: string
  email?: string
  notes?: string
}

export type PatientInsertInput = {
  tutor_id: string
  name: string
  species?: string
  breed?: string
  sex?: string
  age_text?: string
  weight_kg?: string
  notes?: string
}

export async function insertTutor(input: TutorInsertInput, clinicId?: string) {
  return insertWithClinicId('tutors', input, clinicId)
}

export async function insertPatient(input: PatientInsertInput, clinicId?: string) {
  return insertWithClinicId('patients', input, clinicId)
}

export async function listTutors(clinicId?: string) {
  return selectByClinicId('tutors', clinicId)
}

export async function listPatients(clinicId?: string) {
  return selectByClinicId('patients', clinicId)
}
