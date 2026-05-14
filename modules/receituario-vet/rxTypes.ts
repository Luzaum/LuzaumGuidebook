export type Species = 'Canina' | 'Felina'
export type Sex = 'Macho' | 'Fêmea' | 'Sem dados' | 'M' | 'F' | 'MN' | 'FN' | 'Desconhecido'
export type ReproductiveStatus = 'Castrado' | 'Fértil' | 'Sem dados'
export type ItemCategory = 'medication' | 'hygiene' | 'other'
export type PharmacyType = 'humana' | 'veterinária' | 'manipulacao'
export type PackageType = 'frasco' | 'caixa' | 'bisnaga' | 'ampola' | 'outro' | string
export type FrequencyType = 'timesPerDay' | 'everyHours' | 'singleDose' | 'repeatInterval'
export type SpecialControlPharmacy = 'veterinária' | 'humana' | 'manipulacao'
export type DurationMode = 'fixed_days' | 'until_recheck' | 'continuous_use' | 'until_finished' | 'continuous_until_recheck'

export type RouteGroup =
  | 'ORAL'
  | 'OTOLOGICO'
  | 'OFTALMICO'
  | 'TOPICO'
  | 'INTRANASAL'
  | 'RETAL'
  | 'SC'
  | 'IM'
  | 'IV'
  | 'INALATORIO'
  | 'TRANSDERMICO'
  | 'OUTROS'

export interface PatientInfo {
  patientRecordId: string
  id?: string
  name: string
  species: Species
  breed: string
  sex: Sex
  reproductiveStatus: ReproductiveStatus
  ageText: string
  birthDate?: string
  color?: string
  coat: string
  microchip?: string
  microchipped?: boolean
  weightKg: string
  weightDate: string
  anamnesis: string
  notes: string
  showNotesInPrint: boolean
}

export interface TutorInfo {
  tutorRecordId: string
  id?: string
  name: string
  fullName?: string
  full_name?: string
  phone: string
  email?: string
  documentId?: string
  document_id?: string
  cpf?: string
  rg?: string
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  zipcode?: string
  complement?: string
  addressStreet?: string
  addressNumber?: string
  addressComplement?: string
  addressDistrict?: string
  addressCity?: string
  addressState?: string
  addressZip?: string
  addressLine?: string
  notes: string
}

export interface PrescriberInfo {
  profileId: string
  adminId: string
  name: string
  crmv: string
  clinicName: string
}

export interface PrescriptionItem {
  id: string
  category: ItemCategory
  catalogDrugId?: string
  medication_id?: string // Alias for catalogDrugId
  presentation_id?: string
  controlled?: boolean
  is_controlled?: boolean // Alias for controlled
  name: string
  presentation: string
  concentration: string
  commercialName?: string
  pharmaceuticalForm?: string
  presentationValue?: string
  presentationValueUnit?: string
  presentationPerValue?: string
  presentationPerUnit?: string
  presentationMetadata?: Record<string, unknown> | null
  pharmacyType: PharmacyType
  packageType: PackageType
  packageUnit?: string
  pharmacyName: string
  observations: string
  routeGroup: RouteGroup
  doseValue: string
  doseUnit: string
  autoInstruction: boolean
  frequencyType: FrequencyType
  frequencyToken: '' | 'SID' | 'BID' | 'TID' | 'QID'
  timesPerDay: string
  everyHours: string
  repeatEveryValue?: string
  repeatEveryUnit?: string
  durationDays: string
  durationMode?: DurationMode
  untilFinished: boolean
  continuousUse: boolean
  instruction: string
  manualEdited: boolean
  titleBold?: boolean
  titleUnderline?: boolean
  cautions: string[]
  manualQuantity?: string
  start_date?: string
  startDate?: string
  startHour?: string
  inheritStartFromPrescription?: boolean
  createdAt: string
  updatedAt: string
}

export interface RecommendationsState {
  bullets: string[]
  waterMlPerDay: string
  exams: string[]
  customExams: string[]
  examReasons: string[]
  specialControlPharmacy: SpecialControlPharmacy
  standardTemplateId: string
  specialControlTemplateId: string
}

export interface PrescriptionState {
  id: string
  prescriber: PrescriberInfo
  patient: PatientInfo
  tutor: TutorInfo
  items: PrescriptionItem[]
  recommendations: RecommendationsState
  updatedAt: string
}

export interface PrintDocItem {
  id: string
  index: number
  title: string
  subtitle: string
  instruction: string
  start_date?: string
  titleBold?: boolean
  titleUnderline?: boolean
  cautions: string[]
  status: 'ok' | 'incomplete'
}

export interface PrintDocSection {
  key: RouteGroup
  title: string
  items: PrintDocItem[]
}

export interface PrintDoc {
  documentKind?: 'standard' | 'special-control'
  documentId: string
  dateLabel: string
  clinicName: string
  prescriberName: string
  prescriberCrmv: string
  patientLine: string
  tutorLine: string
  addressLine: string
  sections: PrintDocSection[]
  recommendations: string[]
  exams: string[]
}
