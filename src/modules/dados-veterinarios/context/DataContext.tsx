import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDays, subDays, format } from 'date-fns';

// TODO: substituir mocks por Supabase via clinicScopedDb (tutors, patients, appointments, financial, services, procedures, exams, weights).
// TODO: respeitar multiclínica (clinic_id) em todas queries.
// TODO: conectar anexos e relatórios com Storage (attachments).

// Types
export interface Patient {
  id: string;
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
  name: string;
  cpf?: string;
  phone: string;
  email: string;
  address: string; // Full address string for display
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
  pets: string[]; // Array of Patient IDs
}

export interface Appointment {
  id: string;
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
  description: string;
  amount: number;
  type: 'Receita' | 'Despesa';
  category: string;
  date: Date;
  status: 'Pago' | 'Pendente';
}

export interface Service {
  id: string;
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

interface DataContextType {
  patients: Patient[];
  tutors: Tutor[];
  appointments: Appointment[];
  financialRecords: FinancialRecord[];
  services: Service[];
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
  getPatientName: (id: string) => string;
  getTutorName: (id: string) => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock Data Initialization
  const [patients, setPatients] = useState<Patient[]>([
    { 
      id: '1', 
      name: 'Thor', 
      species: 'Canino', 
      breed: 'Golden Retriever', 
      age: '3 anos', 
      weight: '32kg', 
      gender: 'Macho', 
      sex: 'Macho',
      status: 'Vivo',
      tutorId: '1',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150',
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&h=150',
      castrated: true,
      microchipped: true,
      coatColor: 'Dourado',
      vaccines: [],
      weightHistory: [{ id: '1', date: subDays(new Date(), 30), weight: 31 }, { id: '2', date: new Date(), weight: 32 }],
      anamnesis: [],
      exams: [],
      procedures: []
    },
    { 
      id: '2', 
      name: 'Luna', 
      species: 'Felino', 
      breed: 'Siamês', 
      age: '2 anos', 
      weight: '4kg', 
      gender: 'Fêmea', 
      sex: 'Fêmea',
      status: 'Vivo',
      tutorId: '2',
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=150&h=150',
      imageUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=150&h=150',
      castrated: true,
      microchipped: false,
      coatColor: 'Cream point',
      vaccines: [],
      weightHistory: [],
      anamnesis: [],
      exams: [],
      procedures: []
    },
    { 
      id: '3', 
      name: 'Mel', 
      species: 'Canino', 
      breed: 'Poodle', 
      age: '5 anos', 
      weight: '6kg', 
      gender: 'Fêmea', 
      sex: 'Fêmea',
      status: 'Vivo',
      tutorId: '3',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&h=150',
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&h=150',
      castrated: false,
      microchipped: true,
      coatColor: 'Branco',
      vaccines: [],
      weightHistory: [],
      anamnesis: [],
      exams: [],
      procedures: []
    },
  ]);

  const [tutors, setTutors] = useState<Tutor[]>([
    { 
      id: '1', 
      name: 'Carlos Silva', 
      cpf: '123.456.789-10',
      phone: '(11) 98765-4321', 
      email: 'carlos@email.com', 
      address: 'Rua das Flores, 123',
      cep: '01234-567',
      rg: '12.345.678-9',
      referralSource: 'Instagram',
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      pets: ['1'],
      communicationPreferences: { whatsapp: true, email: true, sms: false }
    },
    { 
      id: '2', 
      name: 'Ana Santos', 
      cpf: '987.654.321-00',
      phone: '(11) 91234-5678', 
      email: 'ana@email.com', 
      address: 'Av. Paulista, 1000',
      cep: '01310-100',
      rg: '98.765.432-1',
      referralSource: 'Amigos',
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      pets: ['2'],
      communicationPreferences: { whatsapp: true, email: false, sms: true }
    },
    { 
      id: '3', 
      name: 'Roberto Oliveira', 
      cpf: '456.789.123-55',
      phone: '(11) 99999-8888', 
      email: 'roberto@email.com', 
      address: 'Rua Augusta, 500',
      cep: '01305-000',
      rg: '11.222.333-4',
      referralSource: 'Google',
      street: 'Rua Augusta',
      number: '500',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      pets: ['3'],
      communicationPreferences: { whatsapp: false, email: true, sms: false }
    },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { 
      id: '1', 
      title: 'Vacinação Anual', 
      date: new Date(), // Today
      patientId: '1', 
      tutorId: '1', 
      type: 'Procedimento', 
      status: 'Agendado' 
    },
    { 
      id: '2', 
      title: 'Consulta Dermatológica', 
      date: addDays(new Date(), 1), // Tomorrow
      patientId: '2', 
      tutorId: '2', 
      type: 'Especialidade', 
      status: 'Agendado' 
    },
    { 
      id: '3', 
      title: 'Retorno Cirúrgico', 
      date: subDays(new Date(), 2), // 2 days ago
      patientId: '3', 
      tutorId: '3', 
      type: 'Retorno', 
      status: 'Concluído' 
    },
  ]);

  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([
    { id: '1', description: 'Consulta Thor', amount: 150, type: 'Receita', category: 'Consultas', date: new Date(), status: 'Pago' },
    { id: '2', description: 'Vacina Luna', amount: 80, type: 'Receita', category: 'Vacinas', date: subDays(new Date(), 1), status: 'Pago' },
    { id: '3', description: 'Compra de Medicamentos', amount: 450, type: 'Despesa', category: 'Insumos', date: subDays(new Date(), 2), status: 'Pago' },
    { id: '4', description: 'Aluguel', amount: 2500, type: 'Despesa', category: 'Infraestrutura', date: subDays(new Date(), 5), status: 'Pago' },
    { id: '5', description: 'Exame de Sangue Mel', amount: 120, type: 'Receita', category: 'Exames', date: subDays(new Date(), 3), status: 'Pendente' },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Consulta Geral', description: 'Avaliação clínica completa do animal.', price: 150, category: 'Consultas' },
    { id: '2', name: 'Vacina V10', description: 'Vacina múltipla para cães.', price: 80, category: 'Vacinas' },
    { id: '3', name: 'Castração (Cão < 10kg)', description: 'Cirurgia de castração para cães de pequeno porte.', price: 450, category: 'Cirurgias' },
    { id: '4', name: 'Hemograma Completo', description: 'Exame de sangue completo.', price: 60, category: 'Exames' },
    { id: '5', name: 'Ultrassom Abdominal', description: 'Exame de imagem abdominal.', price: 180, category: 'Exames' },
  ]);

  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
  };

  const updatePatient = (id: string, updatedData: Partial<Patient>) => {
    setPatients(patients.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const addTutor = (tutor: Tutor) => {
    setTutors([...tutors, tutor]);
  };

  const updateTutor = (id: string, updatedData: Partial<Tutor>) => {
    setTutors(tutors.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (id: string, updatedData: Partial<Appointment>) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const addFinancialRecord = (record: FinancialRecord) => {
    setFinancialRecords([...financialRecords, record]);
  };

  const addService = (service: Service) => {
    setServices([...services, service]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const getPatientName = (id: string) => {
    const patient = patients.find(p => p.id === id);
    return patient ? patient.name : 'Desconhecido';
  };

  const getTutorName = (id: string) => {
    const tutor = tutors.find(t => t.id === id);
    return tutor ? tutor.name : 'Desconhecido';
  };

  return (
    <DataContext.Provider value={{ 
      patients, 
      tutors, 
      appointments, 
      financialRecords,
      services,
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
      getPatientName,
      getTutorName
    }}>
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
