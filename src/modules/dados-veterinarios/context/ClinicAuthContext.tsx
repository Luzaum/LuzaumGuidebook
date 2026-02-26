import React, { createContext, useContext, useMemo, useState } from 'react';

export type UserRole = 'admin' | 'veterinarian';

export interface ClinicUnit {
  id: string;
  name: string;
  phone: string;
  schedule: string;
  address: string;
  services: string[];
  imageUrl?: string;
}

export interface ClinicUser {
  id: string;
  name: string;
  role: UserRole;
  clinicIds: string[];
  defaultClinicId: string;
}

export interface ClinicVeterinarian {
  id: string;
  clinicId: string;
  name: string;
  crmv?: string;
}

interface ClinicAuthContextType {
  clinics: ClinicUnit[];
  users: ClinicUser[];
  currentUser: ClinicUser;
  selectedClinicId: string;
  setSelectedClinicId: (clinicId: string) => void;
  addClinic: (clinic: Omit<ClinicUnit, 'id'>) => void;
  removeClinic: (clinicId: string) => void;
  isAdmin: boolean;
  visibleClinicIds: string[];
  veterinarians: ClinicVeterinarian[];
  getVeterinariansForSelection: () => ClinicVeterinarian[];
}

const UPAPET_LOGO_URL = '/apps/uapepet.png';

const DEFAULT_CLINICS: ClinicUnit[] = [
  {
    id: 'copa',
    name: 'Upa Pet Copacabana',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'Rua Djalma Ulrich, 194 - Copacabana, Rio de Janeiro - RJ, 22071-020',
    services: ['Pronto Socorro', 'Consulta Clínica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'fla',
    name: 'Upa Pet Flamengo',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'R. Paissandu, 230 - Laranjeiras, Rio de Janeiro - RJ, 22210-080',
    services: ['Pronto Socorro', 'Consulta Clínica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'taq',
    name: 'Upa Pet Taquara',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'R. Bacairis, 141 - Taquara, Rio de Janeiro - RJ, 22730-120',
    services: ['Pronto Socorro', 'Consulta Clínica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'ica',
    name: 'Upa Pet Icaraí',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'Av. Roberto Silveira, 144 - Icaraí, Niterói - RJ, 24230-165',
    services: ['Pronto Socorro', 'Consulta Clínica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'tij',
    name: 'Upa Pet Tijuca',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'Rua Dr. Satamini, 193 - Tijuca - Rio de Janeiro - RJ - CEP: 20270-233',
    services: ['Pronto Socorro', 'Consulta Clínica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
];

const ADMIN_USER: ClinicUser = {
  id: 'owner-upapet',
  name: 'Administrador UPA PET',
  role: 'admin',
  clinicIds: DEFAULT_CLINICS.map((c) => c.id),
  defaultClinicId: 'all',
};

const DEFAULT_VETERINARIANS: ClinicVeterinarian[] = [
  { id: 'vet-copa-01', clinicId: 'copa', name: 'Dra. Ana Ribeiro', crmv: 'CRMV-RJ 1001' },
  { id: 'vet-copa-02', clinicId: 'copa', name: 'Dr. Pedro Nogueira', crmv: 'CRMV-RJ 1002' },
  { id: 'vet-fla-01', clinicId: 'fla', name: 'Dr. Carlos Mendes', crmv: 'CRMV-RJ 2001' },
  { id: 'vet-fla-02', clinicId: 'fla', name: 'Dra. Luiza Prado', crmv: 'CRMV-RJ 2002' },
  { id: 'vet-taq-01', clinicId: 'taq', name: 'Dra. Bia Moraes', crmv: 'CRMV-RJ 3001' },
  { id: 'vet-ica-01', clinicId: 'ica', name: 'Dr. Rafael Lima', crmv: 'CRMV-RJ 4001' },
  { id: 'vet-tij-01', clinicId: 'tij', name: 'Dra. Julia Costa', crmv: 'CRMV-RJ 5001' },
];

const ClinicAuthContext = createContext<ClinicAuthContextType | undefined>(undefined);

export const ClinicAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinics, setClinics] = useState<ClinicUnit[]>(DEFAULT_CLINICS);
  const [users] = useState<ClinicUser[]>([ADMIN_USER]);
  const [selectedClinicId, setSelectedClinicIdState] = useState<string>('all');
  const [veterinarians] = useState<ClinicVeterinarian[]>(DEFAULT_VETERINARIANS);

  const currentUser = users[0];
  const isAdmin = true;

  const setSelectedClinicId = (clinicId: string) => {
    if (clinicId === 'all' || currentUser.clinicIds.includes(clinicId)) {
      setSelectedClinicIdState(clinicId);
    }
  };

  const addClinic = (clinic: Omit<ClinicUnit, 'id'>) => {
    const id = `clinic-${Math.random().toString(36).slice(2, 8)}`;
    setClinics((prev) => [...prev, { ...clinic, id }]);
  };

  const removeClinic = (clinicId: string) => {
    setClinics((prev) => prev.filter((clinic) => clinic.id !== clinicId));
    setSelectedClinicIdState((prev) => (prev === clinicId ? 'all' : prev));
  };

  const visibleClinicIds = useMemo(() => {
    if (selectedClinicId === 'all') return clinics.map((clinic) => clinic.id);
    return [selectedClinicId];
  }, [selectedClinicId, clinics]);

  const getVeterinariansForSelection = () => {
    if (selectedClinicId === 'all') return veterinarians;
    return veterinarians.filter((vet) => vet.clinicId === selectedClinicId);
  };

  return (
    <ClinicAuthContext.Provider
      value={{
        clinics,
        users,
        currentUser,
        selectedClinicId,
        setSelectedClinicId,
        addClinic,
        removeClinic,
        isAdmin,
        visibleClinicIds,
        veterinarians,
        getVeterinariansForSelection,
      }}
    >
      {children}
    </ClinicAuthContext.Provider>
  );
};

export function useClinicAuth() {
  const context = useContext(ClinicAuthContext);
  if (!context) {
    throw new Error('useClinicAuth must be used within ClinicAuthProvider');
  }
  return context;
}

