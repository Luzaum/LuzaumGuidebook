import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TravelConnectSignIn from '@/components/ui/travel-connect-signin'
import { getSession, requestPasswordReset, signIn, signInWithGoogle } from '../lib/auth'

function normalizeTargetPath(value: string | null | undefined) {
  const target = String(value || '').trim()
  if (!target) return null
  if (!target.startsWith('/')) return '/app'
  return target
}

export default function Login() {
  const nav = useNavigate()
  const location = useLocation()
  const [checkingSession, setCheckingSession] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
    const params = new URLSearchParams(location.search)
    const rawError = params.get('error_description') || params.get('error')
    if (rawError) {
      setError(decodeURIComponent(rawError))
    }
  }, [location.search])

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
    setError('')

    try {
      await signIn(payload.email, payload.password)
      nav(nextPath, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao entrar.'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    await signInWithGoogle(nextPath)
  }

  async function handleForgotPassword(email: string) {
    await requestPasswordReset(email, nextPath)
  }

  if (checkingSession) {
    return <div className="p-6">Carregando autenticação...</div>
  }

  return (
    <TravelConnectSignIn
      loading={loading}
      errorMessage={error}
      onSubmit={handleSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      onForgotPassword={handleForgotPassword}
      onGoToSignup={() => nav(`/signup?next=${encodeURIComponent(nextPath)}`)}
    />
  )
}
