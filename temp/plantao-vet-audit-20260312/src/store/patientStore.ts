import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Patient, Task, Problem, Shift, PatientMaster, ShiftType } from '@/types';
import { format } from 'date-fns';

interface AppState {
  shifts: Shift[];
  patientMasters: PatientMaster[];
  shiftPatients: Patient[];
  activeShiftId: string | null;
  
  // Actions
  setActiveShift: (id: string | null) => void;
  createShift: (dateISO: string, shiftType: ShiftType) => Shift;
  addPatient: (patient: Omit<Patient, 'shiftId'>) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  toggleTask: (patientId: string, taskId: string) => void;
  importPatientsFromShift: (sourceShiftId: string, targetShiftId: string, patientIds: string[], options: { includeTasks: boolean }) => void;
}

const todayISO = format(new Date(), 'yyyy-MM-dd');
const initialShiftId = 'shift-1';

const initialShifts: Shift[] = [
  { id: initialShiftId, dateISO: todayISO, shiftType: 'diurno', status: 'open' }
];

const initialPatientMasters: PatientMaster[] = [
  { id: 'pm-1', name: 'Thor', species: 'Canina', breed: 'Golden Retriever', age: '8 anos', weight: '32 kg', tutor: 'Mariana Silva' },
  { id: 'pm-2', name: 'Luna', species: 'Felina', breed: 'SRD', age: '12 anos', weight: '3.5 kg', tutor: 'Carlos Mendes' }
];

const initialShiftPatients: Patient[] = [
  {
    id: 'sp-1',
    shiftId: initialShiftId,
    patientMasterId: 'pm-1',
    name: 'Thor',
    species: 'Canina',
    breed: 'Golden Retriever',
    age: '8 anos',
    weight: '32 kg',
    tutor: 'Mariana Silva',
    mainDiagnosis: 'Gastroenterite Hemorrágica',
    status: 'OBSERVAÇÃO',
    badges: ['JEJUM', 'SEM DEFECAR'],
    summary: 'Paciente admitido com histórico de vômitos e diarreia com sangue há 2 dias. Desidratação 8%. Iniciada fluidoterapia e antieméticos. Mantido em jejum.',
    definingPhrase: 'Desidratado, necessita controle de êmese rigoroso.',
    problems: [
      { id: 'p1', name: 'Desidratação', status: 'melhorando', priority: 'alta', notes: 'Fluidoterapia em curso' },
      { id: 'p2', name: 'Êmese', status: 'ativo', priority: 'alta', notes: 'Maropitant BID' }
    ],
    tasks: [
      { id: 't1', shiftPatientId: 'sp-1', title: 'Hemograma controle', time: '14:00', category: 'exame', priority: 'alta', completed: false },
      { id: 't2', shiftPatientId: 'sp-1', title: 'Ondansetrona 0.5mg/kg', time: '16:00', category: 'medicação', priority: 'média', completed: false }
    ]
  },
  {
    id: 'sp-2',
    shiftId: initialShiftId,
    patientMasterId: 'pm-2',
    name: 'Luna',
    species: 'Felina',
    breed: 'SRD',
    age: '12 anos',
    weight: '3.5 kg',
    tutor: 'Carlos Mendes',
    mainDiagnosis: 'Doença Renal Crônica Agudizada',
    status: 'CRÍTICO',
    badges: ['DRC', 'SONDA', 'EXAME PENDENTE'],
    summary: 'Felina idosa com DRC estágio 3, agudizada. Creatinina 6.5 na admissão. Anorética, com sonda esofágica. Fluidoterapia IV contínua.',
    definingPhrase: 'DRC descompensada, monitorar débito urinário.',
    problems: [
      { id: 'p3', name: 'Azotemia', status: 'ativo', priority: 'alta', notes: 'Aguardando novo perfil renal' },
      { id: 'p4', name: 'Anorexia', status: 'ativo', priority: 'média', notes: 'Alimentação via sonda' }
    ],
    tasks: [
      { id: 't3', shiftPatientId: 'sp-2', title: 'Aferir PA', time: '15:00', category: 'monitoramento', priority: 'alta', completed: false },
      { id: 't4', shiftPatientId: 'sp-2', title: 'Alimentação Sonda (30ml)', time: '18:00', category: 'alimentação', priority: 'média', completed: false }
    ]
  }
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      shifts: initialShifts,
      patientMasters: initialPatientMasters,
      shiftPatients: initialShiftPatients,
      activeShiftId: initialShiftId,

      setActiveShift: (id) => set({ activeShiftId: id }),

      createShift: (dateISO, shiftType) => {
        const newShift: Shift = {
          id: `shift-${Date.now()}`,
          dateISO,
          shiftType,
          status: 'open'
        };
        set((state) => ({
          shifts: [...state.shifts, newShift],
          activeShiftId: newShift.id
        }));
        return newShift;
      },

      addPatient: (patientData) => set((state) => {
        if (!state.activeShiftId) return state;
        
        // Check if master exists or create one
        let masterId = patientData.patientMasterId;
        let newMasters = [...state.patientMasters];
        
        if (!masterId) {
          masterId = `pm-${Date.now()}`;
          newMasters.push({
            id: masterId,
            name: patientData.name,
            species: patientData.species,
            breed: patientData.breed,
            age: patientData.age,
            weight: patientData.weight,
            tutor: patientData.tutor
          });
        }

        const newPatient: Patient = {
          ...patientData,
          shiftId: state.activeShiftId,
          patientMasterId: masterId,
        };

        return {
          patientMasters: newMasters,
          shiftPatients: [...state.shiftPatients, newPatient]
        };
      }),

      updatePatient: (id, data) => set((state) => ({
        shiftPatients: state.shiftPatients.map(p => p.id === id ? { ...p, ...data } : p)
      })),

      toggleTask: (patientId, taskId) => set((state) => ({
        shiftPatients: state.shiftPatients.map(p => {
          if (p.id === patientId) {
            return {
              ...p,
              tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
            };
          }
          return p;
        })
      })),

      importPatientsFromShift: (sourceShiftId, targetShiftId, patientIds, options) => set((state) => {
        const sourceShift = state.shifts.find(s => s.id === sourceShiftId);
        if (!sourceShift) return state;

        const patientsToImport = state.shiftPatients.filter(p => p.shiftId === sourceShiftId && patientIds.includes(p.id));
        
        const newPatients = patientsToImport.map(p => {
          const newPatientId = `sp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          
          return {
            ...p,
            id: newPatientId,
            shiftId: targetShiftId,
            importedFromShiftId: sourceShiftId,
            importedFromDate: sourceShift.dateISO,
            importedFromShiftType: sourceShift.shiftType,
            // Only keep incomplete tasks if options.includeTasks is true
            tasks: options.includeTasks 
              ? p.tasks.filter(t => !t.completed).map(t => ({ ...t, id: `t-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, shiftPatientId: newPatientId }))
              : []
          };
        });

        return {
          shiftPatients: [...state.shiftPatients, ...newPatients]
        };
      })
    }),
    {
      name: 'plantaovet-storage',
    }
  )
);

// For backward compatibility during refactoring
export const usePatientStore = useAppStore;

