export type PatientStatus = 'CRÍTICO' | 'ESTÁVEL' | 'OBSERVAÇÃO' | 'ALTA HOJE';
export type Species = 'Canina' | 'Felina';
export type ShiftType = 'diurno' | 'noturno';

export interface Problem {
  id: string;
  name: string;
  status: 'ativo' | 'melhorando' | 'resolvido';
  priority: 'alta' | 'média' | 'baixa';
  notes: string;
}

export interface Task {
  id: string;
  shiftPatientId: string;
  title: string;
  time: string;
  category: 'exame' | 'procedimento' | 'medicação' | 'monitoramento' | 'tutor' | 'alimentação';
  completed: boolean;
  priority: 'alta' | 'média' | 'baixa';
}

export interface Bulletin {
  id: string;
  shiftPatientId: string;
  type: 'vet' | 'tutor';
  content: string;
  createdAt: string;
}

export interface PatientMaster {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: string;
  weight: string;
  tutor: string;
}

export interface ShiftPatient {
  id: string;
  shiftId: string;
  patientMasterId: string;
  
  // Denormalized master data for easy access
  name: string;
  species: Species;
  breed: string;
  age: string;
  weight: string;
  tutor: string;

  mainDiagnosis: string;
  status: PatientStatus;
  badges: string[];
  problems: Problem[];
  tasks: Task[];
  summary: string;
  definingPhrase: string;
  
  importedFromShiftId?: string;
  importedFromDate?: string;
  importedFromShiftType?: ShiftType;
}

export interface Shift {
  id: string;
  dateISO: string; // YYYY-MM-DD
  shiftType: ShiftType;
  status: 'open' | 'closed';
}

// For backward compatibility with existing components during transition
export type Patient = ShiftPatient;

