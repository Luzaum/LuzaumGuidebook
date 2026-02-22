import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import {
  ActiveClinicMembership,
  bootstrapClinic as bootstrapClinicRpc,
  clearClinicContextOnSignOut,
  getMyMembership,
  getStoredClinicId,
  storeClinicId,
} from '../lib/clinic'

type ClinicContextValue = {
  loading: boolean
  clinicId: string | null
  clinicName: string | null
  role: 'owner' | 'member' | null
  membership: ActiveClinicMembership | null
  error: string
  refreshMembership: () => Promise<void>
  bootstrapClinic: (clinicName: string) => Promise<void>
}

const ClinicContext = createContext<ClinicContextValue | undefined>(undefined)

export function ClinicProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [membership, setMembership] = useState<ActiveClinicMembership | null>(null)
  const [error, setError] = useState('')

  const refreshMembership = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError

      if (!data.session) {
        setMembership(null)
        storeClinicId(null)
        setLoading(false)
        return
      }

      const nextMembership = await getMyMembership()
      setMembership(nextMembership)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar clinica ativa.'
      setError(message)
      setMembership(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const bootstrapClinic = useCallback(
    async (clinicName: string) => {
      setLoading(true)
      setError('')
      try {
        await bootstrapClinicRpc(clinicName)
        const nextMembership = await getMyMembership()
        setMembership(nextMembership)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Falha ao criar clinica.'
        setError(message)
        throw new Error(message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    const preloadedClinicId = getStoredClinicId()
    if (!preloadedClinicId) {
      storeClinicId(null)
    }

    void refreshMembership()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        void clearClinicContextOnSignOut()
        setMembership(null)
        setLoading(false)
        return
      }
      void refreshMembership()
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [refreshMembership])

  const value = useMemo<ClinicContextValue>(
    () => ({
      loading,
      clinicId: membership?.clinicId || null,
      clinicName: membership?.clinicName || null,
      role: membership?.role || null,
      membership,
      error,
      refreshMembership,
      bootstrapClinic,
    }),
    [loading, membership, error, refreshMembership, bootstrapClinic]
  )

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>
}

export function useClinic() {
  const context = useContext(ClinicContext)
  if (!context) {
    throw new Error('useClinic deve ser usado dentro de ClinicProvider')
  }
  return context
}
