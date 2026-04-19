import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ComplaintContext, Patient } from './caseStore'

export type SavedNeuroCase = {
  id: string
  savedAt: string
  label?: string
  patient: Patient
  complaint: ComplaintContext
  neuroExam: Record<string, unknown>
  currentStep: number
}

type HistoryState = {
  entries: SavedNeuroCase[]
  addEntry: (entry: Omit<SavedNeuroCase, 'id' | 'savedAt'> & { id?: string; savedAt?: string }) => string
  removeEntry: (id: string) => void
  clear: () => void
}

function randomId() {
  return `neuro-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (payload) => {
        const id = payload.id ?? randomId()
        const savedAt = payload.savedAt ?? new Date().toISOString()
        const row: SavedNeuroCase = {
          id,
          savedAt,
          label: payload.label,
          patient: payload.patient,
          complaint: payload.complaint,
          neuroExam: payload.neuroExam,
          currentStep: payload.currentStep,
        }
        set({ entries: [row, ...get().entries.filter((e) => e.id !== id)] })
        return id
      },
      removeEntry: (id) => set({ entries: get().entries.filter((e) => e.id !== id) }),
      clear: () => set({ entries: [] }),
    }),
    { name: 'vetneuro.history.v1' },
  ),
)
