import React, { createContext, useContext, useMemo, useState } from 'react';
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
  sector: string;
  status: 'Internado' | 'Alta' | 'Transferido';
  admittedAt: Date;
  updatedAt: Date;
  entries: InternmentEntry[];
}

interface DataContextType {
  patients: Patient[];
  tutors: Tutor[];
  appointments: Appointment[];
  financialRecords: FinancialRecord[];
  services: Service[];
  internments: Internment[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  addTutor: (tutor: Tutor) => void;
  updateTutor: (id: string, tutor: Partial<Tutor>) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  addFinancialRecord: (record: FinancialRecord) => void;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addInternment: (internment: Omit<Internment, 'id' | 'updatedAt'>) => void;
  updateInternmentStatus: (internmentId: string, status: Internment['status']) => void;
  addInternmentEntry: (internmentId: string, entry: Omit<InternmentEntry, 'id' | 'date'>) => void;
  getPatientName: (id: string) => string;
  getTutorName: (id: string) => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { visibleClinicIds, currentUser } = useClinicAuth();

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
      sector: 'Emergência',
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

  const canSeeClinic = (clinicId?: string) => !clinicId || clinicId === 'all' || visibleClinicIds.includes(clinicId);

  const patients = useMemo(() => rawPatients.filter((x) => canSeeClinic(x.clinicId)), [rawPatients, visibleClinicIds]);
  const tutors = useMemo(() => rawTutors.filter((x) => canSeeClinic(x.clinicId)), [rawTutors, visibleClinicIds]);
  const appointments = useMemo(() => rawAppointments.filter((x) => canSeeClinic(x.clinicId)), [rawAppointments, visibleClinicIds]);
  const financialRecords = useMemo(() => rawFinancialRecords.filter((x) => canSeeClinic(x.clinicId)), [rawFinancialRecords, visibleClinicIds]);
  const services = useMemo(() => rawServices.filter((x) => canSeeClinic(x.clinicId)), [rawServices, visibleClinicIds]);
  const internments = useMemo(() => rawInternments.filter((x) => canSeeClinic(x.clinicId)), [rawInternments, visibleClinicIds]);

  const createClinicScopedValue = (clinicId?: string) => {
    if (clinicId) return clinicId;
    return currentUser.defaultClinicId === 'all' ? visibleClinicIds[0] : currentUser.defaultClinicId;
  };

  const addPatient = (patient: Patient) => {
    setRawPatients((prev) => [...prev, { ...patient, clinicId: createClinicScopedValue(patient.clinicId) }]);
  };

  const updatePatient = (id: string, updatedData: Partial<Patient>) => {
    setRawPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const addTutor = (tutor: Tutor) => {
    setRawTutors((prev) => [...prev, { ...tutor, clinicId: createClinicScopedValue(tutor.clinicId) }]);
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

  const addService = (service: Service) => {
    setRawServices((prev) => [...prev, { ...service, clinicId: createClinicScopedValue(service.clinicId || 'all') }]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setRawServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
  };

  const deleteService = (id: string) => {
    setRawServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addInternment = (internment: Omit<Internment, 'id' | 'updatedAt'>) => {
    const next: Internment = {
      ...internment,
      id: `int-${Math.random().toString(36).slice(2, 9)}`,
      updatedAt: new Date(),
      clinicId: createClinicScopedValue(internment.clinicId),
    };
    setRawInternments((prev) => [next, ...prev]);
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

  const getPatientName = (id: string) => {
    const patient = rawPatients.find((p) => p.id === id);
    return patient ? patient.name : 'Desconhecido';
  };

  const getTutorName = (id: string) => {
    const tutor = rawTutors.find((t) => t.id === id);
    return tutor ? tutor.name : 'Desconhecido';
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
        addPatient,
        updatePatient,
        addTutor,
        updateTutor,
        addAppointment,
        updateAppointment,
        addFinancialRecord,
        addService,
        updateService,
        deleteService,
        addInternment,
        updateInternmentStatus,
        addInternmentEntry,
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

