import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type DraftKeyParts = {
  moduleKey: string
  clinicId: string | null
  userId: string | null
}

type DraftOptions<T> = {
  debounceMs?: number
  enabled?: boolean
  skipHydration?: boolean
  onHydrated?: (value: T) => void
}

function buildDraftKey({ moduleKey, clinicId, userId }: DraftKeyParts): string | null {
  if (!moduleKey) return null
  const parts = [moduleKey]
  if (clinicId) parts.push(clinicId)
  if (userId) parts.push(userId)
  return `draft:${parts.join(':')}`
}

function logDraftDevError(scope: string, error: unknown) {
  if (!import.meta.env.DEV) return
  const err = error as any
  console.error(scope, {
    code: err?.code ?? null,
    message: err?.message ?? String(error || ''),
    details: err?.details ?? null,
    hint: err?.hint ?? null,
  })
}

export function useLocalDraft<T>(
  moduleKey: string,
  clinicId: string | null,
  userId: string | null,
  initialState: T,
  options?: DraftOptions<T>
): [T, (updater: T | ((prev: T) => T)) => void, () => void, boolean] {
  const debounceMs = options?.debounceMs ?? 750
  const enabled = options?.enabled ?? true
  const skipHydration = options?.skipHydration ?? false

  const key = useMemo(
    () => buildDraftKey({ moduleKey, clinicId, userId }),
    [moduleKey, clinicId, userId]
  )

  const [state, setState] = useState<T>(initialState)
  const [hasDraft, setHasDraft] = useState(false)
  const hydratedKeyRef = useRef<string | null>(null)
  const saveTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled || !key) return
    if (skipHydration) return
    if (hydratedKeyRef.current === key) return

    hydratedKeyRef.current = key
    try {
      const raw = localStorage.getItem(key)
      if (!raw) {
        setHasDraft(false)
        return
      }
      const parsed = JSON.parse(raw) as T
      setState(parsed)
      setHasDraft(true)
      options?.onHydrated?.(parsed)
    } catch (error) {
      logDraftDevError('[useLocalDraft] hydrate error', error)
    }
  }, [enabled, key, skipHydration, options])

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current)
      }
    }
  }, [])

  const persist = useCallback(
    (value: T) => {
      if (!enabled || !key) return
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current)
      }
      saveTimerRef.current = window.setTimeout(() => {
        try {
          localStorage.setItem(key, JSON.stringify(value))
          setHasDraft(true)
        } catch (error) {
          logDraftDevError('[useLocalDraft] persist error', error)
        }
      }, debounceMs)
    },
    [debounceMs, enabled, key]
  )

  const setStateAndSave = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof updater === 'function'
          ? (updater as (prev: T) => T)(prev)
          : updater
        persist(next)
        return next
      })
    },
    [persist]
  )

  const clearDraft = useCallback(() => {
    if (!key) {
      setHasDraft(false)
      return
    }
    try {
      localStorage.removeItem(key)
      setHasDraft(false)
    } catch (error) {
      logDraftDevError('[useLocalDraft] clear error', error)
    }
  }, [key])

  return [state, setStateAndSave, clearDraft, hasDraft]
}
