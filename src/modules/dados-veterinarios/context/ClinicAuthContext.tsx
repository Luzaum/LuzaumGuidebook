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

interface ClinicAuthContextType {
  clinics: ClinicUnit[];
  users: ClinicUser[];
  currentUser: ClinicUser;
  setCurrentUserById: (userId: string) => void;
  selectedClinicId: string;
  setSelectedClinicId: (clinicId: string) => void;
  addClinic: (clinic: Omit<ClinicUnit, 'id'>) => void;
  removeClinic: (clinicId: string) => void;
  isAdmin: boolean;
  visibleClinicIds: string[];
}

const UPAPET_LOGO_URL = '/apps/uapepet.png';

const DEFAULT_CLINICS: ClinicUnit[] = [
  {
    id: 'copa',
    name: 'Upa Pet Copacabana',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'Rua Djalma Ulrich, 194 - Copacabana, Rio de Janeiro - RJ, 22071-020',
    services: ['Pronto Socorro', 'Consulta Clinica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'fla',
    name: 'Upa Pet Flamengo',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'R. Paissandu, 230 - Laranjeiras, Rio de Janeiro - RJ, 22210-080',
    services: ['Pronto Socorro', 'Consulta Clinica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'taq',
    name: 'Upa Pet Taquara',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'R. Bacairis, 141 - Taquara, Rio de Janeiro - RJ, 22730-120',
    services: ['Pronto Socorro', 'Consulta Clinica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'ica',
    name: 'Upa Pet Icarai',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'Av. Roberto Silveira, 144 - Icarai, Niteroi - RJ, 24230-165',
    services: ['Pronto Socorro', 'Consulta Clinica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
  {
    id: 'tij',
    name: 'Upa Pet Tijuca',
    phone: '(21) 3500-6664',
    schedule: '24h por dia, 7 dias por semana',
    address: 'Rua Dr. Satamini, 193 - Tijuca - Rio de Janeiro - RJ - CEP: 20270-233',
    services: ['Pronto Socorro', 'Consulta Clinica', 'Especialidades', 'Exames Laboratoriais', 'Raio X', 'Ultrassonografia'],
    imageUrl: UPAPET_LOGO_URL,
  },
];

const DEFAULT_USERS: ClinicUser[] = [
  {
    id: 'owner-upapet',
    name: 'Administrador UPA PET',
    role: 'admin',
    clinicIds: DEFAULT_CLINICS.map((c) => c.id),
    defaultClinicId: 'all',
  },
  {
    id: 'vet-copa-ana',
    name: 'Dra. Ana (Copacabana)',
    role: 'veterinarian',
    clinicIds: ['copa'],
    defaultClinicId: 'copa',
  },
  {
    id: 'vet-fla-carlos',
    name: 'Dr. Carlos (Flamengo)',
    role: 'veterinarian',
    clinicIds: ['fla'],
    defaultClinicId: 'fla',
  },
  {
    id: 'vet-tij-luiza',
    name: 'Dra. Luiza (Tijuca)',
    role: 'veterinarian',
    clinicIds: ['tij'],
    defaultClinicId: 'tij',
  },
];

const ClinicAuthContext = createContext<ClinicAuthContextType | undefined>(undefined);

export const ClinicAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<ClinicUser[]>(DEFAULT_USERS);
  const [clinics, setClinics] = useState<ClinicUnit[]>(DEFAULT_CLINICS);
  const [currentUserId, setCurrentUserId] = useState<string>(DEFAULT_USERS[0].id);
  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) ?? users[0],
    [currentUserId, users],
  );

  const [selectedClinicId, setSelectedClinicIdState] = useState<string>('all');

  const setSelectedClinicId = (clinicId: string) => {
    if (currentUser.role !== 'admin') {
      setSelectedClinicIdState(currentUser.defaultClinicId);
      return;
    }

    if (clinicId === 'all' || currentUser.clinicIds.includes(clinicId)) {
      setSelectedClinicIdState(clinicId);
    }
  };

  const setCurrentUserById = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setCurrentUserId(userId);
    setSelectedClinicIdState(user.role === 'admin' ? 'all' : user.defaultClinicId);
  };

  const isAdmin = currentUser.role === 'admin';

  const addClinic = (clinic: Omit<ClinicUnit, 'id'>) => {
    if (!isAdmin) return;
    const id = `clinic-${Math.random().toString(36).slice(2, 8)}`;
    setClinics((prev) => [...prev, { ...clinic, id }]);
  };

  const removeClinic = (clinicId: string) => {
    if (!isAdmin) return;
    setClinics((prev) => prev.filter((clinic) => clinic.id !== clinicId));
    setSelectedClinicIdState((prev) => (prev === clinicId ? 'all' : prev));
  };

  const visibleClinicIds = useMemo(() => {
    if (!isAdmin) return [currentUser.defaultClinicId];
    if (selectedClinicId === 'all') return clinics.map((clinic) => clinic.id);
    return [selectedClinicId];
  }, [isAdmin, currentUser.defaultClinicId, selectedClinicId, clinics]);

  return (
    <ClinicAuthContext.Provider
      value={{
        clinics,
        users,
        currentUser,
        setCurrentUserById,
        selectedClinicId,
        setSelectedClinicId,
        addClinic,
        removeClinic,
        isAdmin,
        visibleClinicIds,
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
