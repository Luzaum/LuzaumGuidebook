import type { AbvInstitutionalFocus, AbvTab, ComorbidityState, LifeStageKey, Species } from '../types'

/** Prefixo único para não colidir com outras partes do site. */
export const ABV_SESSION_KEYS = {
  app: 'vetius.abv.app.v1',
  syndromeUi: 'vetius.abv.syndromeUi.v1',
  diseasesUi: 'vetius.abv.diseasesUi.v1',
  antibioticsUi: 'vetius.abv.antibioticsUi.v1',
  perioperativeUi: 'vetius.abv.perioperativeUi.v1',
} as const

export type AbvAppPersistV1 = {
  v: 1
  activeTab: AbvTab
  step: number
  species: Species | null
  life: LifeStageKey | null
  co: ComorbidityState
  chosenDiseaseName: string | null
  focusDrug: string | null
  sourcePage: AbvTab | null
  institutionalFocus: AbvInstitutionalFocus | null
}

export function readSessionJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function writeSessionJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota / private mode */
  }
}

export function removeSessionKey(key: string): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

export function loadAbvAppPersist(): Partial<AbvAppPersistV1> {
  const data = readSessionJson<AbvAppPersistV1>(ABV_SESSION_KEYS.app)
  if (!data || data.v !== 1) return {}
  return data
}

export function saveAbvAppPersist(p: AbvAppPersistV1): void {
  writeSessionJson(ABV_SESSION_KEYS.app, p)
}

/** Limpa toda a sessão do módulo ABV (nova consulta / reset explícito). */
export function clearAllAbvSessionStorage(): void {
  for (const key of Object.values(ABV_SESSION_KEYS)) {
    removeSessionKey(key)
  }
}
