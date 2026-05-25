import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useClinic } from '../components/ClinicProvider'
import { signOut } from '../lib/auth'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, LogOut, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import Logo from '@/components/Logo'

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
      await bootstrapClinic(clinicName.trim())
      const state = (location.state || {}) as LocationState
      nav(state.from || '/app', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível criar a clínica.'
      setLocalError(message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSignOut() {
    try {
      await signOut()
      nav('/login', { replace: true })
    } catch (err) {
      setLocalError('Erro ao sair da conta. Tente recarregar a página.')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#060818] via-[#0b1024] to-[#0d1a2e] text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
          <p className="text-sm font-medium text-slate-400">Verificando credenciais...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#060818] via-[#0b1024] to-[#0d1a2e] p-4 md:p-8 overflow-hidden select-none">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-[#090b13]/85 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl p-6 sm:p-10"
      >
        
        {/* Header section with Logo and title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.15)]">
            <Logo className="h-10 w-10 object-contain" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400"
          >
            <Sparkles className="h-3 w-3" />
            Primeiro Acesso
          </motion.div>

          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Seu Espaço Clínico
          </h1>
          <p className="mt-3 text-sm text-slate-400 max-w-sm leading-relaxed">
            Seja bem-vindo ao Vetius! Configure o seu consultório, clínica ou espaço de atendimento individual para organizar suas receitas e prontuários de forma integrada e segura.
          </p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="clinic-name" className="block text-sm font-medium text-slate-300">
              Nome do seu Consultório ou Espaço de Atendimento <span className="text-emerald-400">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                <Building2 className="h-5 w-5" />
              </div>
              <input
                id="clinic-name"
                className="h-12 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-emerald-500/30 transition-all duration-200 focus:border-emerald-500/80 focus:ring-4 focus:bg-slate-950"
                placeholder="Ex.: Consultório Particular ou Clínica Vet"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                required
                disabled={submitting}
                autoFocus
              />
            </div>
          </div>

          <button
            className="relative flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-sm font-bold text-white shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all duration-300 hover:shadow-[0_6px_24px_rgba(16,185,129,0.45)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 overflow-hidden"
            disabled={submitting || !clinicName.trim()}
            type="submit"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Configurando seu espaço...</span>
              </div>
            ) : (
              <span className="tracking-wide">Confirmar e Acessar</span>
            )}
          </button>
        </form>

        {/* Error Handling with beautiful slide-down animation */}
        <AnimatePresence>
          {(localError || error) && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mt-5 overflow-hidden rounded-xl border border-red-500/25 bg-red-500/10 p-3.5"
            >
              <div className="flex gap-2.5">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-200 leading-relaxed">
                  {localError || error}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sign Out / Exit options */}
        <div className="mt-8 flex items-center justify-center border-t border-slate-800/60 pt-6">
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-300"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sair desta conta</span>
          </button>
        </div>

      </motion.div>
    </div>
  )
}
