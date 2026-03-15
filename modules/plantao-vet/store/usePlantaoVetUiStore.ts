import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { getStoredClinicId } from '@/src/lib/clinic';
import { normalizeClinicScopeId, resolvePlantaoVetStorageKey } from '../lib/storage';

type DraftMap = Record<string, string>;
type ValueMap = Record<string, string>;
type BoolMap = Record<string, boolean>;
type JsonMap = Record<string, unknown>;

interface PlantaoVetUiState {
  drafts: DraftMap;
  values: ValueMap;
  booleans: BoolMap;
  json: JsonMap;
  setDraft: (key: string, value: string) => void;
  clearDraft: (key: string) => void;
  setValue: (key: string, value: string) => void;
  clearValue: (key: string) => void;
  setBoolean: (key: string, value: boolean) => void;
  clearBoolean: (key: string) => void;
  setJson: (key: string, value: unknown) => void;
  clearJson: (key: string) => void;
}

function areJsonValuesEqual(current: unknown, next: unknown) {
  if (Object.is(current, next)) {
    return true;
  }

  try {
    return JSON.stringify(current) === JSON.stringify(next);
  } catch {
    return false;
  }
}

function getStorageKey() {
  return resolvePlantaoVetStorageKey('vetius:plantao-vet-ui', normalizeClinicScopeId(getStoredClinicId()));
}

export const usePlantaoVetUiStore = create<PlantaoVetUiState>()(
  persist(
    (set) => ({
      drafts: {},
      values: {},
      booleans: {},
      json: {},
      setDraft: (key, value) =>
        set((state) => {
          if (state.drafts[key] === value) {
            return state;
          }

          return { drafts: { ...state.drafts, [key]: value } };
        }),
      clearDraft: (key) =>
        set((state) => {
          if (!(key in state.drafts)) {
            return state;
          }

          const next = { ...state.drafts };
          delete next[key];
          return { drafts: next };
        }),
      setValue: (key, value) =>
        set((state) => {
          if (state.values[key] === value) {
            return state;
          }

          return { values: { ...state.values, [key]: value } };
        }),
      clearValue: (key) =>
        set((state) => {
          if (!(key in state.values)) {
            return state;
          }

          const next = { ...state.values };
          delete next[key];
          return { values: next };
        }),
      setBoolean: (key, value) =>
        set((state) => {
          if (state.booleans[key] === value) {
            return state;
          }

          return { booleans: { ...state.booleans, [key]: value } };
        }),
      clearBoolean: (key) =>
        set((state) => {
          if (!(key in state.booleans)) {
            return state;
          }

          const next = { ...state.booleans };
          delete next[key];
          return { booleans: next };
        }),
      setJson: (key, value) =>
        set((state) => {
          if (areJsonValuesEqual(state.json[key], value)) {
            return state;
          }

          return { json: { ...state.json, [key]: value } };
        }),
      clearJson: (key) =>
        set((state) => {
          if (!(key in state.json)) {
            return state;
          }

          const next = { ...state.json };
          delete next[key];
          return { json: next };
        }),
    }),
    {
      name: 'vetius:plantao-vet-ui',
      storage: createJSONStorage(() => ({
        getItem: () => window.localStorage.getItem(getStorageKey()),
        setItem: (_, value) => window.localStorage.setItem(getStorageKey(), value),
        removeItem: () => window.localStorage.removeItem(getStorageKey()),
      })),
    }
  )
);
