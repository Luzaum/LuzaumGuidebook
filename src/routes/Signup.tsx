import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TravelConnectSignIn from '@/components/ui/travel-connect-signin'
import { getSession, signInWithGoogle, signUp } from '../lib/auth'

function normalizeTargetPath(value: string | null | undefined) {
  const target = String(value || '').trim()
  if (!target) return null
  if (!target.startsWith('/')) return '/app'
  return target
}

export default function Signup() {
  const nav = useNavigate()
  const location = useLocation()
  const [checkingSession, setCheckingSession] = useState(true)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  const nextPath = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const queryTarget = normalizeTargetPath(params.get('next'))
    const stateTarget =
      typeof (location.state as { from?: string } | null)?.from === 'string'
        ? normalizeTargetPath((location.state as { from?: string }).from)
        : null
    return queryTarget ?? stateTarget ?? '/app'
  }, [location.search, location.state])

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const session = await getSession()
        if (!alive) return
        if (session) {
          nav(nextPath, { replace: true })
          return
        }
      } catch {
        // no-op
      } finally {
        if (alive) {
          setCheckingSession(false)
        }
      }
    })()

    return () => {
      alive = false
    }
  }, [nav, nextPath])

  async function handleSubmit(payload: { email: string; password: string }) {
    setLoading(true)
    setErr('')
    setMsg('')

    try {
      await signUp(payload.email, payload.password)
      setMsg('Conta criada! Verifique seu email para confirmar.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao criar conta.'
      setErr(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setErr('')
    setMsg('')
    await signInWithGoogle(nextPath)
  }

  if (checkingSession) {
    return <div className="p-6">Carregando autenticacao...</div>
  }

  return (
    <TravelConnectSignIn
      mode="signup"
      loading={loading}
      errorMessage={err}
      successMessage={msg}
      onSubmit={handleSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      onGoToLogin={() => nav(`/login?next=${encodeURIComponent(nextPath)}`)}
      onBackToVetius={() => nav('/hub')}
    />
  )
}
