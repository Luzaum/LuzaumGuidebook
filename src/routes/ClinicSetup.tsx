import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useClinic } from '../components/ClinicProvider'

type LocationState = {
  from?: string
}

export default function ClinicSetup() {
  const nav = useNavigate()
  const location = useLocation()
  const { clinicId, loading, bootstrapClinic, error } = useClinic()
  const [clinicName, setClinicName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState('')

  useEffect(() => {
    if (!loading && clinicId) {
      const state = (location.state || {}) as LocationState
      nav(state.from || '/app', { replace: true })
    }
  }, [loading, clinicId, location.state, nav])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setLocalError('')
    try {
      await bootstrapClinic(clinicName)
      const state = (location.state || {}) as LocationState
      nav(state.from || '/app', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nao foi possivel criar a clinica.'
      setLocalError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-2 text-2xl font-semibold">Criar Clinica</h1>
      <p className="mb-4 text-sm text-slate-600">
        Este e o primeiro acesso desta conta. Crie sua clinica para ativar o ambiente.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full rounded border p-3"
          placeholder="Nome da clinica"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          required
        />
        <button
          className="w-full rounded bg-emerald-600 p-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting}
          type="submit"
        >
          {submitting ? 'Criando clinica...' : 'Criar clinica'}
        </button>
      </form>

      {localError ? <div className="mt-3 text-red-600">{localError}</div> : null}
      {!localError && error ? <div className="mt-3 text-red-600">{error}</div> : null}
    </div>
  )
}
