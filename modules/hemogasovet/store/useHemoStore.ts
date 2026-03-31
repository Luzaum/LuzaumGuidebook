import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SavedBloodGasRecord } from '../types';

interface HemoStoreState {
  history: SavedBloodGasRecord[];
  addRecord: (record: SavedBloodGasRecord) => void;
  removeRecord: (id: string) => void;
  clearHistory: () => void;
}

export const useHemoStore = create<HemoStoreState>()(
  persist(
    (set) => ({
      history: [],
      addRecord: (record) => set((state) => ({ history: [record, ...state.history] })),
      removeRecord: (id) => set((state) => ({ history: state.history.filter((r) => r.id !== id) })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'hemogasovet-storage',
    }
  )
);
