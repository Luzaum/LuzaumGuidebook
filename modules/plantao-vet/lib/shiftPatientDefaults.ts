import { DailySummaryEntry, MedicationEntry, NutritionSupport, PatientVitalsRecord, ShiftPatient, WeightRecord } from '../types';

function nowISO() {
  return new Date().toISOString();
}

export function createEmptyNutritionSupport(): NutritionSupport {
  return {
    appetiteSpontaneous: 'unknown',
    foodAcceptance: '',
    dietType: '',
    feedingRoute: '',
    tubeInUse: false,
    tubeType: 'none',
    offeredAmount: '',
    ingestedPercentage: '',
    currentWeight: '',
    bodyConditionScore: '',
    muscleMassScore: '',
    nutritionNotes: '',
    fluidTherapy: '',
    supplements: '',
    devices: '',
    supportNotes: '',
    eliminations: '',
    updatedAt: null,
  };
}

export function createMedicationEntryFromName(name: string, timestamp = nowISO()): MedicationEntry {
  return {
    id: `medication-${Math.random().toString(36).slice(2, 10)}`,
    name,
    concentration: '',
    dose: '',
    frequency: '',
    route: '',
    observations: '',
    status: 'active',
    startedAt: timestamp,
    suspendedAt: null,
    inPrescription: true,
    newBadgeDate: timestamp.slice(0, 10),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createWeightRecord(label = '', sourceLabel = 'manual', timestamp = nowISO(), isBaseWeight = false): WeightRecord {
  return {
    id: `weight-${Math.random().toString(36).slice(2, 10)}`,
    label,
    recordedAt: timestamp,
    sourceLabel,
    isBaseWeight,
  };
}

export function createEmptyVitalsRecord(timestamp = nowISO()): PatientVitalsRecord {
  return {
    id: `vitals-${Math.random().toString(36).slice(2, 10)}`,
    recordedAt: timestamp,
    authorLabel: '',
    heartRate: '',
    respiratoryRate: '',
    temperature: '',
    systolicPressure: '',
    glucose: '',
    mucousMembranes: '',
    capillaryRefillTime: '',
    cardiacAuscultation: '',
    pulmonaryAuscultation: '',
    pain: '',
    mentalState: '',
    hydration: '',
    vomiting: false,
    vomitingDescription: '',
    diarrhea: false,
    diarrheaDescription: '',
    urinated: null,
    defecated: null,
    fed: null,
    feedingDetails: '',
    appetite: null,
    observations: '',
  };
}

export function createDailySummaryEntry(input: Partial<DailySummaryEntry> & Pick<DailySummaryEntry, 'shiftId' | 'shiftPatientId' | 'type' | 'title' | 'content' | 'occurredAt'>): DailySummaryEntry {
  const timestamp = nowISO();
  return {
    id: input.id || `daily-${Math.random().toString(36).slice(2, 10)}`,
    shiftId: input.shiftId,
    shiftPatientId: input.shiftPatientId,
    type: input.type,
    title: input.title,
    content: input.content,
    details: input.details || '',
    occurredAt: input.occurredAt,
    sourceId: input.sourceId || null,
    sourceType: input.sourceType || (input.manual ? 'manual' : 'system'),
    relatedEntityType: input.relatedEntityType || null,
    manual: input.manual ?? false,
    doctorVetReported: input.doctorVetReported ?? false,
    doctorVetReportedAt: input.doctorVetReportedAt || null,
    doctorVetReportNote: input.doctorVetReportNote || '',
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
    deletedAt: input.deletedAt || null,
  };
}

export function createEmptyShiftPatientFields(): Pick<
  ShiftPatient,
  | 'weightLabel'
  | 'baseWeightLabel'
  | 'weightHistory'
  | 'medicalRecordNumber'
  | 'admissionDateLabel'
  | 'responsibleVet'
  | 'belongings'
  | 'patientObservations'
  | 'mainDiagnosis'
  | 'summary'
  | 'clinicalHistory'
  | 'currentComplaint'
  | 'currentAdmissionReason'
  | 'definingPhrase'
  | 'importantNotes'
  | 'nextShiftPlan'
  | 'alertBadges'
  | 'tags'
  | 'medicationsInUse'
  | 'medicationEntries'
  | 'vitalsRecords'
  | 'examRecords'
  | 'nutritionSupport'
  | 'problems'
  | 'dailySummaryEntries'
  | 'importedFromShiftId'
  | 'importedFromDate'
  | 'importedFromShiftType'
  | 'sourceRecordText'
  | 'importWarnings'
  | 'lastBulletinAt'
> {
  return {
    weightLabel: '',
    baseWeightLabel: '',
    weightHistory: [],
    medicalRecordNumber: '',
    admissionDateLabel: '',
    responsibleVet: '',
    belongings: '',
    patientObservations: '',
    mainDiagnosis: '',
    summary: '',
    clinicalHistory: '',
    currentComplaint: '',
    currentAdmissionReason: '',
    definingPhrase: '',
    importantNotes: '',
    nextShiftPlan: '',
    alertBadges: [],
    tags: [],
    medicationsInUse: [],
    medicationEntries: [],
    vitalsRecords: [],
    examRecords: [],
    nutritionSupport: createEmptyNutritionSupport(),
    problems: [],
    dailySummaryEntries: [],
    importedFromShiftId: null,
    importedFromDate: null,
    importedFromShiftType: null,
    sourceRecordText: null,
    importWarnings: [],
    lastBulletinAt: null,
  };
}
