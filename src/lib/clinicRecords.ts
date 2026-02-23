import { insertWithClinicId, selectByClinicId, softDeleteWithClinicId } from './clinicScopedDb'

export type TutorInsertInput = {
  full_name: string
  phone?: string
  email?: string
  document_id?: string
  cpf?: string
  rg?: string
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  zipcode?: string
  address_complement?: string
  notes?: string
}

export type PatientInsertInput = {
  tutor_id: string
  name: string
  species?: string
  breed?: string
  sex?: string
  neutered?: boolean | string | null
  age_text?: string
  weight_kg?: string
  coat?: string
  color?: string
  microchipped?: boolean
  anamnesis?: string
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

export async function deleteTutorSoft(tutorId: string, clinicId?: string) {
  return softDeleteWithClinicId('tutors', tutorId, clinicId)
}

export async function deleteTutorsSoft(tutorIds: string[], clinicId?: string) {
  return softDeleteWithClinicId('tutors', tutorIds, clinicId)
}

export async function deletePatientSoft(patientId: string, clinicId?: string) {
  return softDeleteWithClinicId('patients', patientId, clinicId)
}

export type WeightInsertInput = {
  patient_id: string
  weight_kg: string
  measured_at: string
  notes?: string
}

export async function insertWeight(input: WeightInsertInput, clinicId?: string) {
  return insertWithClinicId('patient_weights', input, clinicId)
}
