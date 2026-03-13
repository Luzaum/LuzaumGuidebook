import { createJSONStorage, StateStorage } from 'zustand/middleware';

import { getStoredClinicId } from '@/src/lib/clinic';

export const PLANTAO_VET_STORAGE_NAME = 'vetius:plantao-vet';
export const PLANTAO_VET_STORAGE_VERSION = 4;

const NO_CLINIC_SCOPE = 'no-clinic';

function getSafeLocalStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

export function normalizeClinicScopeId(clinicId?: string | null) {
  const normalized = String(clinicId || '').trim();
  return normalized || NO_CLINIC_SCOPE;
}

export function resolvePlantaoVetStorageKey(name = PLANTAO_VET_STORAGE_NAME, clinicId?: string | null) {
  return `${name}:${normalizeClinicScopeId(clinicId)}`;
}

const clinicScopedStateStorage: StateStorage = {
  getItem: (name) => {
    const storage = getSafeLocalStorage();
    if (!storage) return null;
    return storage.getItem(resolvePlantaoVetStorageKey(name, getStoredClinicId()));
  },
  setItem: (name, value) => {
    const storage = getSafeLocalStorage();
    if (!storage) return;
    storage.setItem(resolvePlantaoVetStorageKey(name, getStoredClinicId()), value);
  },
  removeItem: (name) => {
    const storage = getSafeLocalStorage();
    if (!storage) return;
    storage.removeItem(resolvePlantaoVetStorageKey(name, getStoredClinicId()));
  },
};

export function createPlantaoVetStorage<T>() {
  return createJSONStorage<T>(() => clinicScopedStateStorage);
}
