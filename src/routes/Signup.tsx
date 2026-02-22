import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signUp } from '../lib/auth'

export default function Signup() {
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const nextPath = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const next = params.get('next') || '/app'
    return next.startsWith('/') ? next : '/app'
  }, [location.search])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErr('')
    setMsg('')

    try {
      await signUp(email, password)
      setMsg('Conta criada! Verifique seu email para confirmar.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao criar conta.'
      setErr(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Criar Conta</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full rounded border p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded border p-3"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full rounded bg-emerald-600 p-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar conta'}
        </button>
      </form>

      {msg && <div className="mt-3 text-emerald-600">{msg}</div>}
      {err && <div className="mt-3 text-red-600">{err}</div>}

      <div className="mt-4">
        Ja tem conta?{' '}
        <Link to={`/login?next=${encodeURIComponent(nextPath)}`} className="underline">
          Entrar
        </Link>
      </div>
    </div>
  )
}
