import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addDays, subDays } from 'date-fns';
import { useClinicAuth } from './ClinicAuthContext';

// TODO: substituir mocks por Supabase via clinicScopedDb (tutors, patients, appointments, financial, services, procedures, exams, weights).
// TODO: respeitar multiclínica (clinic_id) em todas queries.
// TODO: conectar anexos e relatórios com Storage (attachments).

export interface Patient {
  id: string;
  clinicId?: string;
  name: string;
  species: 'Canino' | 'Felino' | 'Cão' | 'Gato';
  breed: string;
  age: string;
  weight: string;
  gender?: 'Macho' | 'Fêmea';
  sex?: 'Macho' | 'Fêmea';
  status?: 'Vivo' | 'Óbito';
  tutorId: string;
  image?: string;
  imageUrl?: string;
  castrated?: boolean;
  microchipped?: boolean;
  coatColor?: string;
  vaccines?: Vaccine[];
  weightHistory?: WeightRecord[];
  anamnesis?: Anamnesis[];
  exams?: Exam[];
  procedures?: Procedure[];
}

export interface Tutor {
  id: string;
  clinicId?: string;
  name: string;
  cpf?: string;
  phone: string;
  email: string;
  address: string;
  cep?: string;
  rg?: string;
  referralSource?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  observations?: string;
  communicationPreferences?: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
  pets: string[];
}

export interface Appointment {
  id: string;
  clinicId?: string;
  title: string;
  date: Date;
  patientId: string;
  tutorId: string;
  veterinarianName?: string;
  type: 'Consulta Geral' | 'Especialidade' | 'Retorno' | 'Exame' | 'Imagem' | 'Procedimento' | 'Reunião' | 'Internamento';
  status: 'Agendado' | 'Confirmado' | 'Concluído' | 'Cancelado';
  notes?: string;
}

export interface FinancialRecord {
  id: string;
  clinicId?: string;
  description: string;
  amount: number;
  type: 'Receita' | 'Despesa';
  category: string;
  date: Date;
  status: 'Pago' | 'Pendente';
  patientId?: string;
  paymentMethod?: 'Dinheiro' | 'PIX' | 'Cartão de Crédito' | 'Cartão de Débito';
  transactionId?: string;
  paymentProofUrl?: string;
  paymentProofName?: string;
  paidAt?: Date;
}

export interface Service {
  id: string;
  clinicId?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface Vaccine {
  id: string;
  name: string;
  date: Date;
  nextDueDate?: Date;
  batch?: string;
  veterinarian?: string;
}

export interface WeightRecord {
  id: string;
  date: Date;
  weight: number;
  notes?: string;
}

export interface Anamnesis {
  id: string;
  date: Date;
  complaint: string;
  history: string;
  systemsReview?: string;
  diagnosis?: string;
  treatment?: string;
}

export interface Exam {
  id: string;
  date: Date;
  name: string;
  type: string;
  result?: string;
  fileUrl?: string;
  price?: number;
}

export interface Procedure {
  id: string;
  date: Date;
  name: string;
  description?: string;
  price?: number;
  veterinarian?: string;
  type?: 'Exame' | 'Procedimento' | 'Cirurgia';
  notes?: string;
  fileUrl?: string;
  fileName?: string;
}

export interface InternmentEntry {
  id: string;
  date: Date;
  type: 'procedimento' | 'parametros' | 'isobares' | 'evolucao' | 'admissao' | 'exame';
  title: string;
  notes: string;
  createdBy: string;
}

export interface Internment {
  id: string;
  clinicId?: string;
  patientId: string;
  tutorId: string;
  bed: string;
  sector: 'UTI' | 'Semi-Intensivo' | 'Internamento';
  chiefComplaint?: string;
  presumptiveDiagnosis?: string;
  prognosis?: string;
  status: 'Internado' | 'Alta' | 'Transferido';
  admittedAt: Date;
  updatedAt: Date;
  entries: InternmentEntry[];
}

export interface ExecutionTask {
  id: string;
  clinicId?: string;
  internmentId: string;
  patientId: string;
  tutorId: string;
  scheduledAt: Date;
  medication: string;
  dosage?: string;
  route?: string;
  notes?: string;
  done: boolean;
  doneAt?: Date;
  doneBy?: string;
  completionNotes?: string;
}

interface DataContextType {
  patients: Patient[];
  tutors: Tutor[];
  appointments: Appointment[];
  financialRecords: FinancialRecord[];
  services: Service[];
  internments: Internment[];
  executionTasks: ExecutionTask[];
  addPatient: (patient: Patient) => string;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  addTutor: (tutor: Tutor) => string;
  updateTutor: (id: string, tutor: Partial<Tutor>) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  addFinancialRecord: (record: FinancialRecord) => void;
  updateFinancialRecord: (id: string, record: Partial<FinancialRecord>) => void;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addInternment: (internment: Omit<Internment, 'id' | 'updatedAt'>) => string;
  updateInternmentStatus: (internmentId: string, status: Internment['status']) => void;
  addInternmentEntry: (internmentId: string, entry: Omit<InternmentEntry, 'id' | 'date'>) => void;
  addExecutionTask: (task: Omit<ExecutionTask, 'id' | 'done' | 'doneAt'>) => void;
  updateExecutionTask: (taskId: string, task: Partial<ExecutionTask>) => void;
  getPatientName: (id: string) => string;
  getTutorName: (id: string) => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DATA_STORAGE_KEY = 'dv:data:v1';
const FIXED_ID_LENGTH = 5;
const NUMERIC_ID = /^\d+$/;

const parseNumericId = (id: string | undefined): number | null => {
  if (!id || !NUMERIC_ID.test(id)) return null;
  return Number(id);
};

const nextSequentialId = (items: Array<{ id: string }>) => {
  const max = items.reduce((currentMax, item) => {
    const parsed = parseNumericId(item.id);
    if (parsed === null || Number.isNaN(parsed)) return currentMax;
    return Math.max(currentMax, parsed);
  }, 0);
  return String(max + 1).padStart(FIXED_ID_LENGTH, '0');
};

const sanitizeSequentialId = (id: string | undefined, items: Array<{ id: string }>) => {
  const parsed = parseNumericId(id);
  if (parsed === null) return nextSequentialId(items);
  return String(parsed).padStart(FIXED_ID_LENGTH, '0');
};

const toDate = (value: unknown, fallback = new Date()) => {
  const parsed = value ? new Date(value as string | number | Date) : fallback;
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
};

const MOJIBAKE_HINT = /[\u00C3\u00C2\u00E2]|\u0413|\u0432\u0402|\u0432\u201D/;

const FALLBACK_MOJIBAKE_MAP: Array<[RegExp, string]> = [
  [/\u00C3\u00A3/g, '\u00E3'],
  [/\u00C3\u00A1/g, '\u00E1'],
  [/\u00C3\u00A0/g, '\u00E0'],
  [/\u00C3\u00A2/g, '\u00E2'],
  [/\u00C3\u00A9/g, '\u00E9'],
  [/\u00C3\u00AA/g, '\u00EA'],
  [/\u00C3\u00AD/g, '\u00ED'],
  [/\u00C3\u00B3/g, '\u00F3'],
  [/\u00C3\u00B4/g, '\u00F4'],
  [/\u00C3\u00B5/g, '\u00F5'],
  [/\u00C3\u00BA/g, '\u00FA'],
  [/\u00C3\u00A7/g, '\u00E7'],
  [/\u00C3\u201C/g, '\u00D3'],
  [/\u00C3\u2030/g, '\u00C9'],
  [/\u00C2\u00B7/g, '\u00B7'],
  [/\u00E2\u20AC\u201D/g, '\u2014'],
  [/\u00E2\u20AC\u201C/g, '\u2013'],
  [/\u00E2\u20AC\u0153/g, '\u201C'],
  [/\u00E2\u20AC\u009D/g, '\u201D'],
  [/\u00E2\u20AC\u02DC/g, '\u2018'],
  [/\u00E2\u20AC\u2122/g, '\u2019'],
];

const repairMojibakeString = (value: string): string => {
  if (!MOJIBAKE_HINT.test(value)) return value;

  try {
    const bytes = Uint8Array.from(Array.from(value).map((char) => char.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder('utf-8').decode(bytes);
    if (decoded && decoded !== value && decoded.replace(/\uFFFD/g, '').length >= Math.floor(value.length * 0.7)) {
      return decoded;
    }
  } catch {
    // no-op: fallback map below
  }

  let repaired = value;
  for (const [pattern, replacement] of FALLBACK_MOJIBAKE_MAP) {
    repaired = repaired.replace(pattern, replacement);
  }
  return repaired;
};
const normalizeMojibake = <T,>(input: T): T => {
  if (typeof input === 'string') {
    return repairMojibakeString(input) as T;
  }
  if (Array.isArray(input)) {
    return input.map((item) => normalizeMojibake(item)) as T;
  }
  if (input && typeof input === 'object') {
    const entries = Object.entries(input as Record<string, unknown>).map(([key, value]) => [key, normalizeMojibake(value)]);
    return Object.fromEntries(entries) as T;
  }
  return input;
};
const revivePatients = (list: Patient[]): Patient[] =>
  list.map((patient) => ({
    ...patient,
    vaccines: (patient.vaccines || []).map((vaccine) => ({
      ...vaccine,
      date: toDate(vaccine.date),
      nextDueDate: vaccine.nextDueDate ? toDate(vaccine.nextDueDate) : undefined,
    })),
    weightHistory: (patient.weightHistory || []).map((record) => ({
      ...record,
      date: toDate(record.date),
    })),
    anamnesis: (patient.anamnesis || []).map((entry) => ({
      ...entry,
      date: toDate(entry.date),
    })),
    exams: (patient.exams || []).map((exam) => ({
      ...exam,
      date: toDate(exam.date),
    })),
    procedures: (patient.procedures || []).map((procedure) => ({
      ...procedure,
      date: toDate(procedure.date),
    })),
  }));
const reviveAppointments = (list: Appointment[]): Appointment[] =>
  list.map((appointment) => ({ ...appointment, date: toDate(appointment.date) }));
const reviveFinancialRecords = (list: FinancialRecord[]): FinancialRecord[] =>
  list.map((record) => ({ ...record, date: toDate(record.date), paidAt: record.paidAt ? toDate(record.paidAt) : undefined }));
const reviveInternments = (list: Internment[]): Internment[] =>
  list.map((internment) => ({
    ...internment,
    admittedAt: toDate(internment.admittedAt),
    updatedAt: toDate(internment.updatedAt),
    entries: (internment.entries || []).map((entry) => ({
      ...entry,
      date: toDate(entry.date),
    })),
  }));
const reviveExecutionTasks = (list: ExecutionTask[]): ExecutionTask[] =>
  list.map((task) => ({
    ...task,
    scheduledAt: toDate(task.scheduledAt),
    doneAt: task.doneAt ? toDate(task.doneAt) : undefined,
  }));

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { visibleClinicIds, currentUser } = useClinicAuth();
  const [isReadyToPersist, setIsReadyToPersist] = useState(false);

  const [rawPatients, setRawPatients] = useState<Patient[]>([
    {
      id: '1',
      clinicId: 'copa',
      name: 'Thor',
      species: 'Canino',
      breed: 'Golden Retriever',
      age: '3 anos',
      weight: '32kg',
      gender: 'Macho',
      sex: 'Macho',
      status: 'Vivo',
      tutorId: '1',
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150',
      castrated: true,
      microchipped: true,
      coatColor: 'Dourado',
      vaccines: [],
      weightHistory: [{ id: '1', date: subDays(new Date(), 30), weight: 31 }, { id: '2', date: new Date(), weight: 32 }],
      anamnesis: [],
      exams: [],
      procedures: [],
    },
    {
      id: '2',
      clinicId: 'fla',
      name: 'Luna',
      species: 'Felino',
      breed: 'Siamês',
      age: '2 anos',
      weight: '4kg',
      gender: 'Fêmea',
      sex: 'Fêmea',
      status: 'Vivo',
      tutorId: '2',
      imageUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=150&h=150',
      castrated: true,
      microchipped: false,
      coatColor: 'Cream point',
      vaccines: [],
      weightHistory: [],
      anamnesis: [],
      exams: [],
      procedures: [],
    },
    {
      id: '3',
      clinicId: 'tij',
      name: 'Mel',
      species: 'Canino',
      breed: 'Poodle',
      age: '5 anos',
      weight: '6kg',
      gender: 'Fêmea',
      sex: 'Fêmea',
      status: 'Vivo',
      tutorId: '3',
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&h=150',
      castrated: false,
      microchipped: true,
      coatColor: 'Branco',
      vaccines: [],
      weightHistory: [],
      anamnesis: [],
      exams: [],
      procedures: [],
    },
  ]);

  const [rawTutors, setRawTutors] = useState<Tutor[]>([
    {
      id: '1',
      clinicId: 'copa',
      name: 'Carlos Silva',
      cpf: '123.456.789-10',
      phone: '(21) 99800-1111',
      email: 'carlos@email.com',
      address: 'Rua Djalma Ulrich, 194 - Copacabana, Rio de Janeiro - RJ',
      city: 'Rio de Janeiro',
      state: 'RJ',
      pets: ['1'],
      communicationPreferences: { whatsapp: true, email: true, sms: false },
    },
    {
      id: '2',
      clinicId: 'fla',
      name: 'Ana Santos',
      cpf: '987.654.321-00',
      phone: '(21) 99700-2222',
      email: 'ana@email.com',
      address: 'R. Paissandu, 230 - Laranjeiras, Rio de Janeiro - RJ',
      city: 'Rio de Janeiro',
      state: 'RJ',
      pets: ['2'],
      communicationPreferences: { whatsapp: true, email: false, sms: true },
    },
    {
      id: '3',
      clinicId: 'tij',
      name: 'Roberto Oliveira',
      cpf: '456.789.123-55',
      phone: '(21) 99600-3333',
      email: 'roberto@email.com',
      address: 'Rua Dr. Satamini, 193 - Tijuca - Rio de Janeiro - RJ',
      city: 'Rio de Janeiro',
      state: 'RJ',
      pets: ['3'],
      communicationPreferences: { whatsapp: false, email: true, sms: false },
    },
  ]);

  const [rawAppointments, setRawAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clinicId: 'copa',
      title: 'Vacinação Anual',
      date: new Date(),
      patientId: '1',
      tutorId: '1',
      veterinarianName: 'Dra. Ana Ribeiro',
      type: 'Procedimento',
      status: 'Agendado',
    },
    {
      id: '2',
      clinicId: 'fla',
      title: 'Consulta Dermatológica',
      date: addDays(new Date(), 1),
      patientId: '2',
      tutorId: '2',
      veterinarianName: 'Dr. Carlos Mendes',
      type: 'Especialidade',
      status: 'Agendado',
    },
    {
      id: '3',
      clinicId: 'tij',
      title: 'Retorno Cirúrgico',
      date: subDays(new Date(), 2),
      patientId: '3',
      tutorId: '3',
      veterinarianName: 'Dra. Julia Costa',
      type: 'Retorno',
      status: 'Concluído',
    },
  ]);

  const [rawFinancialRecords, setRawFinancialRecords] = useState<FinancialRecord[]>([
    { id: '1', clinicId: 'copa', description: 'Consulta Thor', amount: 150, type: 'Receita', category: 'Consultas', date: new Date(), status: 'Pago', patientId: '1' },
    { id: '2', clinicId: 'fla', description: 'Vacina Luna', amount: 80, type: 'Receita', category: 'Vacinas', date: subDays(new Date(), 1), status: 'Pago', patientId: '2' },
    { id: '3', clinicId: 'tij', description: 'Compra de Medicamentos', amount: 450, type: 'Despesa', category: 'Insumos', date: subDays(new Date(), 2), status: 'Pago' },
    { id: '4', clinicId: 'copa', description: 'Aluguel Unidade Copacabana', amount: 2500, type: 'Despesa', category: 'Infraestrutura', date: subDays(new Date(), 5), status: 'Pago' },
    { id: '5', clinicId: 'tij', description: 'Exame de Sangue Mel', amount: 120, type: 'Receita', category: 'Exames', date: subDays(new Date(), 3), status: 'Pendente', patientId: '3' },
  ]);

  const [rawServices, setRawServices] = useState<Service[]>([
    { id: '1', clinicId: 'all', name: 'Consulta Clínica', description: 'Avaliação clínica completa do animal.', price: 150, category: 'Consultas' },
    { id: '2', clinicId: 'all', name: 'Pronto Socorro 24h', description: 'Atendimento de urgência e emergência.', price: 280, category: 'Urgência e Emergência' },
    { id: '3', clinicId: 'all', name: 'Vacina V10', description: 'Vacina múltipla para cães.', price: 90, category: 'Vacinas' },
    { id: '4', clinicId: 'all', name: 'Vacina Antirrábica', description: 'Imunização contra raiva.', price: 70, category: 'Vacinas' },
    { id: '5', clinicId: 'all', name: 'Vacina V4 Felina', description: 'Vacina múltipla felina.', price: 120, category: 'Vacinas' },
    { id: '6', clinicId: 'all', name: 'Raio-X', description: 'Exame radiológico veterinário.', price: 180, category: 'Imagem' },
    { id: '7', clinicId: 'all', name: 'Ultrassonografia', description: 'Exame de imagem abdominal e gestacional.', price: 220, category: 'Imagem' },
    { id: '8', clinicId: 'all', name: 'Hemograma Completo', description: 'Exame laboratorial de sangue.', price: 95, category: 'Exames Laboratoriais' },
    { id: '9', clinicId: 'all', name: 'Internamento Diário', description: 'Diária de internamento com monitorização.', price: 450, category: 'Internamento' },
    { id: '10', clinicId: 'all', name: 'Castração', description: 'Procedimento cirúrgico eletivo.', price: 750, category: 'Cirurgias' },
  ]);

  const [rawInternments, setRawInternments] = useState<Internment[]>([
    {
      id: 'int-1',
      clinicId: 'copa',
      patientId: '1',
      tutorId: '1',
      bed: 'A-03',
      sector: 'UTI',
      chiefComplaint: 'Prostração e vômitos',
      presumptiveDiagnosis: 'Gastroenterite aguda',
      prognosis: 'Reservado',
      status: 'Internado',
      admittedAt: subDays(new Date(), 1),
      updatedAt: new Date(),
      entries: [
        {
          id: 'int-e-1',
          date: new Date(),
          type: 'parametros',
          title: 'Parâmetros clínicos',
          notes: 'FC 110 bpm, FR 22 irpm, T 38.6°C, PA 120/80.',
          createdBy: 'Dra. Ana (Copacabana)',
        },
      ],
    },
  ]);

  const [rawExecutionTasks, setRawExecutionTasks] = useState<ExecutionTask[]>([
    {
      id: 'task-1',
      clinicId: 'copa',
      internmentId: 'int-1',
      patientId: '1',
      tutorId: '1',
      scheduledAt: new Date(),
      medication: 'Maropitant',
      dosage: '1 mg/kg',
      route: 'SC',
      notes: 'Controle de vômito',
      done: false,
    },
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(DATA_STORAGE_KEY);
      if (!raw) {
        setIsReadyToPersist(true);
        return;
      }

      const parsedRaw = JSON.parse(raw) as Partial<{
        patients: Patient[];
        tutors: Tutor[];
        appointments: Appointment[];
        financialRecords: FinancialRecord[];
        services: Service[];
        internments: Internment[];
        executionTasks: ExecutionTask[];
      }>;
      const parsed = normalizeMojibake(parsedRaw);

      if (Array.isArray(parsed.patients)) setRawPatients(revivePatients(parsed.patients));
      if (Array.isArray(parsed.tutors)) setRawTutors(parsed.tutors);
      if (Array.isArray(parsed.appointments)) setRawAppointments(reviveAppointments(parsed.appointments));
      if (Array.isArray(parsed.financialRecords)) setRawFinancialRecords(reviveFinancialRecords(parsed.financialRecords));
      if (Array.isArray(parsed.services)) setRawServices(parsed.services);
      if (Array.isArray(parsed.internments)) setRawInternments(reviveInternments(parsed.internments));
      if (Array.isArray(parsed.executionTasks)) setRawExecutionTasks(reviveExecutionTasks(parsed.executionTasks));
    } catch (error) {
      console.warn('[DataContext] Failed to hydrate local data:', error);
    } finally {
      setIsReadyToPersist(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isReadyToPersist) return;
    try {
      window.localStorage.setItem(
        DATA_STORAGE_KEY,
        JSON.stringify({
          patients: rawPatients,
          tutors: rawTutors,
          appointments: rawAppointments,
          financialRecords: rawFinancialRecords,
          services: rawServices,
          internments: rawInternments,
          executionTasks: rawExecutionTasks,
        }),
      );
    } catch (error) {
      console.warn('[DataContext] Failed to persist local data:', error);
    }
  }, [isReadyToPersist, rawPatients, rawTutors, rawAppointments, rawFinancialRecords, rawServices, rawInternments, rawExecutionTasks]);

  const canSeeClinic = (clinicId?: string) => !clinicId || clinicId === 'all' || visibleClinicIds.includes(clinicId);

  const patients = useMemo(() => rawPatients.filter((x) => canSeeClinic(x.clinicId)), [rawPatients, visibleClinicIds]);
  const tutors = useMemo(() => rawTutors.filter((x) => canSeeClinic(x.clinicId)), [rawTutors, visibleClinicIds]);
  const appointments = useMemo(() => rawAppointments.filter((x) => canSeeClinic(x.clinicId)), [rawAppointments, visibleClinicIds]);
  const financialRecords = useMemo(() => rawFinancialRecords.filter((x) => canSeeClinic(x.clinicId)), [rawFinancialRecords, visibleClinicIds]);
  const services = useMemo(() => rawServices.filter((x) => canSeeClinic(x.clinicId)), [rawServices, visibleClinicIds]);
  const internments = useMemo(() => rawInternments.filter((x) => canSeeClinic(x.clinicId)), [rawInternments, visibleClinicIds]);
  const executionTasks = useMemo(() => rawExecutionTasks.filter((x) => canSeeClinic(x.clinicId)), [rawExecutionTasks, visibleClinicIds]);

  const createClinicScopedValue = (clinicId?: string) => {
    if (clinicId) return clinicId;
    return currentUser.defaultClinicId === 'all' ? visibleClinicIds[0] : currentUser.defaultClinicId;
  };

  const addPatient = (patient: Patient): string => {
    const nextId = sanitizeSequentialId(patient.id, rawPatients);
    const nextPatient = { ...patient, id: nextId, clinicId: createClinicScopedValue(patient.clinicId) };
    setRawPatients((prev) => [...prev, nextPatient]);
    if (nextPatient.tutorId) {
      setRawTutors((prev) =>
        prev.map((tutor) =>
          tutor.id === nextPatient.tutorId
            ? { ...tutor, pets: Array.from(new Set([...(tutor.pets || []), nextPatient.id])) }
            : tutor,
        ),
      );
    }
    return nextId;
  };

  const updatePatient = (id: string, updatedData: Partial<Patient>) => {
    setRawPatients((prev) =>
      prev.map((patient) => {
        if (patient.id !== id) return patient;

        if (updatedData.tutorId && updatedData.tutorId !== patient.tutorId) {
          setRawTutors((currentTutors) =>
            currentTutors.map((tutor) => {
              if (tutor.id === patient.tutorId) {
                return { ...tutor, pets: (tutor.pets || []).filter((petId) => petId !== patient.id) };
              }
              if (tutor.id === updatedData.tutorId) {
                return { ...tutor, pets: Array.from(new Set([...(tutor.pets || []), patient.id])) };
              }
              return tutor;
            }),
          );
        }

        return { ...patient, ...updatedData };
      }),
    );
  };

  const addTutor = (tutor: Tutor): string => {
    const nextId = sanitizeSequentialId(tutor.id, rawTutors);
    setRawTutors((prev) => [...prev, { ...tutor, id: nextId, clinicId: createClinicScopedValue(tutor.clinicId) }]);
    return nextId;
  };

  const updateTutor = (id: string, updatedData: Partial<Tutor>) => {
    setRawTutors((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t)));
  };

  const addAppointment = (appointment: Appointment) => {
    setRawAppointments((prev) => [...prev, { ...appointment, clinicId: createClinicScopedValue(appointment.clinicId) }]);
  };

  const updateAppointment = (id: string, updatedData: Partial<Appointment>) => {
    setRawAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updatedData } : a)));
  };

  const addFinancialRecord = (record: FinancialRecord) => {
    setRawFinancialRecords((prev) => [...prev, { ...record, clinicId: createClinicScopedValue(record.clinicId) }]);
  };

  const updateFinancialRecord = (id: string, updatedData: Partial<FinancialRecord>) => {
    setRawFinancialRecords((prev) => prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r)));
  };

  const addService = (service: Service) => {
    setRawServices((prev) => [...prev, { ...service, clinicId: createClinicScopedValue(service.clinicId || 'all') }]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setRawServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
  };

  const deleteService = (id: string) => {
    setRawServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addInternment = (internment: Omit<Internment, 'id' | 'updatedAt'>): string => {
    const next: Internment = {
      ...internment,
      id: `int-${Math.random().toString(36).slice(2, 9)}`,
      updatedAt: new Date(),
      clinicId: createClinicScopedValue(internment.clinicId),
    };
    setRawInternments((prev) => [next, ...prev]);
    return next.id;
  };

  const updateInternmentStatus = (internmentId: string, status: Internment['status']) => {
    setRawInternments((prev) =>
      prev.map((item) =>
        item.id === internmentId ? { ...item, status, updatedAt: new Date() } : item,
      ),
    );
  };

  const addInternmentEntry = (internmentId: string, entry: Omit<InternmentEntry, 'id' | 'date'>) => {
    setRawInternments((prev) =>
      prev.map((item) => {
        if (item.id !== internmentId) return item;
        const nextEntry: InternmentEntry = {
          ...entry,
          id: `entry-${Math.random().toString(36).slice(2, 9)}`,
          date: new Date(),
        };
        return {
          ...item,
          updatedAt: new Date(),
          entries: [nextEntry, ...item.entries],
        };
      }),
    );
  };

  const addExecutionTask = (task: Omit<ExecutionTask, 'id' | 'done' | 'doneAt'>) => {
    setRawExecutionTasks((prev) => [
      {
        ...task,
        id: `task-${Math.random().toString(36).slice(2, 9)}`,
        clinicId: createClinicScopedValue(task.clinicId),
        done: false,
      },
      ...prev,
    ]);
  };

  const updateExecutionTask = (taskId: string, updatedData: Partial<ExecutionTask>) => {
    setRawExecutionTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task)));
  };

  const getPatientName = (id: string) => {
    const patient = rawPatients.find((p) => p.id === id);
    return patient ? `${patient.name} [${patient.id.padStart(FIXED_ID_LENGTH, '0')}]` : 'Desconhecido';
  };

  const getTutorName = (id: string) => {
    const tutor = rawTutors.find((t) => t.id === id);
    return tutor ? `${tutor.name} [${tutor.id.padStart(FIXED_ID_LENGTH, '0')}]` : 'Desconhecido';
  };

  return (
    <DataContext.Provider
      value={{
        patients,
        tutors,
        appointments,
        financialRecords,
        services,
        internments,
        executionTasks,
        addPatient,
        updatePatient,
        addTutor,
        updateTutor,
        addAppointment,
        updateAppointment,
        addFinancialRecord,
        updateFinancialRecord,
        addService,
        updateService,
        deleteService,
        addInternment,
        updateInternmentStatus,
        addInternmentEntry,
        addExecutionTask,
        updateExecutionTask,
        getPatientName,
        getTutorName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};



