import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function ResetPassword() {
  const nav = useNavigate()
  const location = useLocation()
  const [checking, setChecking] = useState(true)
  const [canReset, setCanReset] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const nextPath = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const next = params.get('next') || '/app'
    return next.startsWith('/') ? next : '/app'
  }, [location.search])

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError
        if (!alive) return
        setCanReset(Boolean(data.session))
      } catch {
        if (!alive) return
        setCanReset(false)
      } finally {
        if (alive) setChecking(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setMessage('')

    const trimmedPassword = password.trim()
    if (trimmedPassword.length < 8) {
      setError('A nova senha deve ter pelo menos 8 caracteres.')
      return
    }

    if (trimmedPassword !== confirmPassword.trim()) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: trimmedPassword,
      })
      if (updateError) throw updateError

      setMessage('Senha atualizada com sucesso. Redirecionando...')
      window.setTimeout(() => nav(nextPath, { replace: true }), 900)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha ao atualizar senha.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return <div className="p-6">Validando token de recuperação...</div>
  }

  if (!canReset) {
    return (
      <div className="mx-auto max-w-md p-6">
        <h1 className="mb-2 text-2xl font-semibold">Link inválido ou expirado</h1>
        <p className="mb-4 text-sm text-slate-600">
          Solicite uma nova recuperação de senha para continuar.
        </p>
        <Link to="/login" className="underline">
          Voltar para login
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-2 text-2xl font-semibold">Definir nova senha</h1>
      <p className="mb-4 text-sm text-slate-600">
        Escolha uma senha forte para proteger sua conta.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full rounded border p-3"
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
        <input
          className="w-full rounded border p-3"
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
        <button
          className="w-full rounded bg-blue-600 p-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Atualizando...' : 'Atualizar senha'}
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="mt-3 text-sm text-emerald-600">{message}</p> : null}
    </div>
  )
}
