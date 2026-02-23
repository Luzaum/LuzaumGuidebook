import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { sanitizePatient, sanitizeHistory } from '../lib/state/sanitizers'

export type Species = 'dog' | 'cat'
export type Sex = 'male' | 'female'
export type ReproStatus = 'intact' | 'neutered'
export type LifeStage = 'neonate' | 'pediatric' | 'adult' | 'geriatric'
export type TemporalPattern =
  | 'peragudo'
  | 'agudo'
  | 'subagudo'
  | 'cronico'
  | 'episodico'
export type EvolutionPattern =
  | 'melhorando'
  | 'estático'
  | 'flutuante'
  | 'progressivo'

export type RedFlagId =
  | 'coma_estupor'
  | 'status_epilepticus'
  | 'severe_progression_24h'
  | 'acute_nonambulatory'
  | 'respiratory_compromise'
  | 'deep_pain_loss'
  | 'severe_cervical_pain'
  | 'anisocoria_acute'
  | 'dysphagia_aspiration_risk'

export type ComorbidityKey =
  | 'renal'
  | 'hepática'
  | 'cardíaca'
  | 'endocrina'
  | 'respiratória'
  | 'neuromuscular'
  | 'neoplasica'
  | 'imunomediada'
  | 'hipertensão'
  | 'coagulopatia'

export type ComorbidityItem = {
  key: ComorbidityKey
  label: string // ex.: "Renopata (DRC/IRA)"
  severity?: 'leve' | 'moderada' | 'grave'
  notes?: string // opcional (ex.: "DRC IRIS 3", "HCM", etc)
}

export type Patient = {
  species: Species | null
  ageYears: number | null
  ageMonths: number | null
  weightKg: number | null
  sex: Sex | null
  reproStatus: ReproStatus | null
  lifeStage: LifeStage | null
  pregnant: boolean
  lactating: boolean
  comorbidities: ComorbidityItem[]
}

export type ComplaintContext = {
  chiefComplaintIds: string[] // ids dos cards de queixa
  temporalPattern: TemporalPattern | null
  evolutionPattern: EvolutionPattern | null
  contextNotes: string
  redFlags: RedFlagId[]
  // Contexto clínico (toggles)
  trauma: boolean
  toxin: boolean
  fever: boolean
  ectoparasiticideExposure: boolean
  systemicDisease: boolean
  recentSurgeryAnesthesia: boolean
}

type NeuroExam = Record<string, any> // mantém compatível com seu modelo atual
type Review = Record<string, any>
type Analysis = {
  status: 'idle' | 'running' | 'done' | 'insufficient_data'
  report?: any // CaseReport será tipado depois
} | null

type CaseState = {
  currentStep: number
  patient: Patient
  complaint: ComplaintContext
  neuroExam: NeuroExam
  review: Review
  analysis: Analysis | null

  setCurrentStep: (step: number) => void
  setPatient: (patch: Partial<Patient>) => void
  setComplaint: (patch: Partial<ComplaintContext>) => void
  setNeuroExam: (patch: NeuroExam) => void
  setAnalysis: (analysis: Analysis | null) => void
  resetCase: () => void
}

const emptyPatient: Patient = {
  species: null,
  ageYears: null,
  ageMonths: null,
  weightKg: null,
  sex: null,
  reproStatus: null,
  lifeStage: null,
  pregnant: false,
  lactating: false,
  comorbidities: [], // Array de ComorbidityItem
}

const emptyComplaint: ComplaintContext = {
  chiefComplaintIds: [],
  temporalPattern: null,
  evolutionPattern: null,
  contextNotes: '',
  redFlags: [],
  trauma: false,
  toxin: false,
  fever: false,
  ectoparasiticideExposure: false,
  systemicDisease: false,
  recentSurgeryAnesthesia: false,
}

const emptyCase: Omit<
  CaseState,
  | 'setCurrentStep'
  | 'setPatient'
  | 'setComplaint'
  | 'setNeuroExam'
  | 'setAnalysis'
  | 'resetCase'
> = {
  currentStep: 1,
  patient: emptyPatient,
  complaint: emptyComplaint,
  neuroExam: {},
  review: {},
  analysis: null,
}

export const useCaseStore = create<CaseState>()(
  persist(
    (set) => ({
      ...emptyCase,
      setCurrentStep: (step) => set({ currentStep: step }),
      setPatient: (patch) =>
        set((s) => {
          const sanitized = sanitizePatient({ ...s.patient, ...patch })
          return {
            patient: { ...s.patient, ...sanitized },
          }
        }),
      setComplaint: (patch) =>
        set((s) => {
          const sanitized = sanitizeHistory({ ...s.complaint, ...patch })
          return {
            complaint: { ...s.complaint, ...sanitized },
          }
        }),
      setNeuroExam: (patch) => set({ neuroExam: patch }),
      setAnalysis: (analysis) => set({ analysis }),
      resetCase: () => set({ ...emptyCase }),
    }),
    { name: 'vetneuro.case.v1' },
  ),
)
