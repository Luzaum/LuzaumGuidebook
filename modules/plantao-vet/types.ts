export type ShiftType = 'diurno' | 'noturno';
export type ShiftStatus = 'open' | 'closed';
export type Species = 'canina' | 'felina' | 'outra';
export type PatientStatus = 'critical' | 'watch' | 'stable' | 'discharge_today';
export type ProblemStatus = 'active' | 'resolved' | 'historical' | 'suspected';
export type ProblemPriority = 'high' | 'medium' | 'low';
export type TaskCategory =
  | 'exam'
  | 'procedure'
  | 'feeding'
  | 'medication'
  | 'monitoring'
  | 'tutor'
  | 'discharge'
  | 'documents'
  | 'communication'
  | 'hydration'
  | 'nutrition'
  | 'hygiene'
  | 'other';
export type TaskPriority = 'high' | 'medium' | 'low';
export type BulletinType = 'clinical' | 'tutor' | 'handover';
export type ExamCategory =
  | 'hemogram'
  | 'biochemical'
  | 'electrolytes'
  | 'urinalysis'
  | 'blood_gas'
  | 'imaging'
  | 'rapid'
  | 'other';
export type MedicationStatus = 'active' | 'suspended' | 'concluded';
export type AppetiteLevel = 'good' | 'partial' | 'poor' | 'none' | 'unknown';
export type TubeType = 'none' | 'nasoesophageal' | 'nasogastric' | 'esophagostomy' | 'gastrostomy' | 'other';
export type RecordOrigin = 'imported' | 'manual';
export type DailySummaryEntryType =
  | 'clinical'
  | 'task_completed'
  | 'task_reopened'
  | 'task_created'
  | 'medication_added'
  | 'medication_changed'
  | 'medication_suspended'
  | 'medication_reactivated'
  | 'parameter'
  | 'exam'
  | 'weight'
  | 'nutrition'
  | 'support'
  | 'procedure'
  | 'problem_opened'
  | 'problem_resolved'
  | 'problem_reopened'
  | 'bulletin'
  | 'observation'
  | 'manual';

export type DailySummaryRelatedEntityType =
  | 'task'
  | 'exam'
  | 'medication'
  | 'vitals'
  | 'problem'
  | 'weight'
  | 'bulletin'
  | 'import'
  | 'manual'
  | 'patient';

export interface TimestampedEntity {
  createdAt: string;
  updatedAt: string;
}

export interface Problem {
  id: string;
  title: string;
  status: ProblemStatus;
  priority: ProblemPriority;
  notes: string;
  startedAt: string | null;
  resolvedAt: string | null;
  origin: RecordOrigin;
  sourceLabel: string;
  reviewRequired: boolean;
  deletedAt?: string | null;
}

export interface PatientVitalsRecord {
  id: string;
  recordedAt: string;
  authorLabel: string;
  heartRate: string;
  respiratoryRate: string;
  temperature: string;
  systolicPressure: string;
  glucose: string;
  mucousMembranes: string;
  capillaryRefillTime: string;
  cardiacAuscultation: string;
  pulmonaryAuscultation: string;
  pain: string;
  mentalState: string;
  hydration: string;
  vomiting: boolean;
  vomitingDescription: string;
  diarrhea: boolean;
  diarrheaDescription: string;
  urinated: boolean | null;
  defecated: boolean | null;
  fed: boolean | null;
  feedingDetails: string;
  appetite: boolean | null;
  observations: string;
}

export interface PatientExamRecord {
  id: string;
  category: ExamCategory;
  recordedAt: string;
  title: string;
  summary: string;
  findings: string;
  observations: string;
  mainFinding: string;
  originalText: string;
  deletedAt?: string | null;
}

export interface WeightRecord {
  id: string;
  label: string;
  recordedAt: string;
  sourceLabel: string;
  isBaseWeight: boolean;
}

export interface NutritionSupport {
  appetiteSpontaneous: AppetiteLevel;
  foodAcceptance: string;
  dietType: string;
  feedingRoute: string;
  tubeInUse: boolean;
  tubeType: TubeType;
  offeredAmount: string;
  ingestedPercentage: string;
  currentWeight: string;
  bodyConditionScore: string;
  muscleMassScore: string;
  nutritionNotes: string;
  fluidTherapy: string;
  supplements: string;
  devices: string;
  supportNotes: string;
  eliminations: string;
  updatedAt: string | null;
}

export interface MedicationEntry {
  id: string;
  name: string;
  concentration: string;
  dose: string;
  frequency: string;
  route: string;
  observations: string;
  status: MedicationStatus;
  startedAt: string | null;
  suspendedAt: string | null;
  inPrescription: boolean;
  newBadgeDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DailySummaryEntry extends TimestampedEntity {
  id: string;
  shiftId: string;
  shiftPatientId: string;
  type: DailySummaryEntryType;
  title: string;
  content: string;
  details: string;
  occurredAt: string;
  sourceId: string | null;
  sourceType: RecordOrigin | 'system';
  relatedEntityType: DailySummaryRelatedEntityType | null;
  manual: boolean;
  doctorVetReported: boolean;
  doctorVetReportedAt: string | null;
  doctorVetReportNote: string;
  deletedAt?: string | null;
}

export interface Shift extends TimestampedEntity {
  id: string;
  clinicId: string | null;
  dateISO: string;
  shiftType: ShiftType;
  status: ShiftStatus;
  label: string;
  startedAt: string | null;
  endsAt: string | null;
  archivedAt: string | null;
}

export interface PatientMaster extends TimestampedEntity {
  id: string;
  clinicId: string | null;
  name: string;
  species: Species;
  breed: string;
  sex: 'male' | 'female' | 'unknown';
  ageLabel: string;
  weightLabel: string;
  tutorName: string;
}

export interface ShiftPatient extends TimestampedEntity {
  id: string;
  shiftId: string;
  patientMasterId: string;
  displayName: string;
  species: Species;
  breed: string;
  ageLabel: string;
  weightLabel: string;
  baseWeightLabel: string;
  weightHistory: WeightRecord[];
  tutorName: string;
  medicalRecordNumber: string;
  admissionDateLabel: string;
  responsibleVet: string;
  belongings: string;
  patientObservations: string;
  mainDiagnosis: string;
  status: PatientStatus;
  summary: string;
  clinicalHistory: string;
  currentComplaint: string;
  currentAdmissionReason: string;
  definingPhrase: string;
  importantNotes: string;
  nextShiftPlan: string;
  alertBadges: string[];
  tags: string[];
  medicationsInUse: string[];
  medicationEntries: MedicationEntry[];
  vitalsRecords: PatientVitalsRecord[];
  examRecords: PatientExamRecord[];
  nutritionSupport: NutritionSupport;
  problems: Problem[];
  dailySummaryEntries: DailySummaryEntry[];
  importedFromShiftId: string | null;
  importedFromDate: string | null;
  importedFromShiftType: ShiftType | null;
  sourceRecordText: string | null;
  importWarnings: string[];
  lastBulletinAt: string | null;
}

export interface Task extends TimestampedEntity {
  id: string;
  shiftId: string;
  shiftPatientId: string | null;
  title: string;
  description: string;
  scheduledTime: string | null;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  completedAt: string | null;
  reviewRequired: boolean;
  origin: RecordOrigin;
  deletedAt?: string | null;
}

export interface Bulletin extends TimestampedEntity {
  id: string;
  shiftId: string;
  shiftPatientId: string | null;
  type: BulletinType;
  title: string;
  content: string;
  authorLabel: string;
  generated: boolean;
  manualEdited?: boolean;
  deletedAt?: string | null;
}

export interface DashboardSummary {
  totalShifts: number;
  activePatients: number;
  activeTasks: number;
  criticalPatients: number;
  bulletins: number;
}

export interface ShiftImportCopyOptions {
  copyIdentification: boolean;
  copySummary: boolean;
  copyDefiningPhrase: boolean;
  copyProblems: boolean;
  copyMedications: boolean;
  copyAlerts: boolean;
  copyOpenTasks: boolean;
}

export interface ImportPatientsFromShiftInput {
  sourceShiftId: string;
  targetShiftId?: string | null;
  shiftPatientIds: string[];
  copyOptions?: Partial<ShiftImportCopyOptions>;
}

export interface ImportPatientsFromShiftResult {
  importedShiftPatientIds: string[];
  updatedShiftPatientIds: string[];
}

export interface PlantaoVetPersistedState {
  scopeClinicId: string | null;
  activeShiftId: string | null;
  shiftsById: Record<string, Shift>;
  shiftOrder: string[];
  patientMastersById: Record<string, PatientMaster>;
  patientMasterOrder: string[];
  shiftPatientsById: Record<string, ShiftPatient>;
  shiftPatientOrder: string[];
  tasksById: Record<string, Task>;
  taskOrder: string[];
  bulletinsById: Record<string, Bulletin>;
  bulletinOrder: string[];
}

export interface PlantaoVetState extends PlantaoVetPersistedState {
  isHydrated: boolean;
  ensureClinicScope: (clinicId: string | null) => void;
  setHydrated: (isHydrated: boolean) => void;
  setActiveShift: (shiftId: string | null) => void;
  appendDailySummaryEntry: (shiftPatientId: string, entry: Partial<DailySummaryEntry> & Pick<DailySummaryEntry, 'type' | 'title' | 'content' | 'occurredAt'>) => void;
  updateDailySummaryEntry: (shiftPatientId: string, entryId: string, patch: Partial<DailySummaryEntry>) => void;
  deleteDailySummaryEntry: (shiftPatientId: string, entryId: string) => void;
  toggleTaskCompleted: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  deleteBulletin: (bulletinId: string) => void;
  createShift: (input: {
    dateISO: string;
    shiftType: ShiftType;
    label?: string;
    startedAt?: string | null;
    endsAt?: string | null;
  }) => Shift;
  upsertPatientMaster: (patientMaster: Partial<Omit<PatientMaster, keyof TimestampedEntity>> & Partial<TimestampedEntity>) => void;
  upsertShiftPatient: (shiftPatient: Partial<Omit<ShiftPatient, keyof TimestampedEntity>> & Partial<TimestampedEntity>) => void;
  upsertTask: (task: Partial<Omit<Task, keyof TimestampedEntity>> & Partial<TimestampedEntity>) => Task;
  upsertBulletin: (bulletin: Partial<Omit<Bulletin, keyof TimestampedEntity>> & Partial<TimestampedEntity>) => Bulletin;
  importPatientsFromShift: (
    input: ImportPatientsFromShiftInput
  ) => ImportPatientsFromShiftResult;
  resetClinicState: () => void;
}
