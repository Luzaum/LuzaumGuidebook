import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, ShieldCheck, UserRound, ArrowRight } from 'lucide-react'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { useAuthSession } from '@/src/components/AuthSessionProvider'
import { useClinic } from '@/src/components/ClinicProvider'
import { supabase } from '@/src/lib/supabaseClient'

type RlsSummary = {
  clinicsCount: number
  membershipsCount: number
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleString('pt-BR')
}

export default function AccountHome() {
  const { user, profile } = useAuthSession()
  const { clinicName, clinicId, role } = useClinic()
  const showRlsDebug = import.meta.env.DEV
  const [testingRls, setTestingRls] = useState(false)
  const [rlsError, setRlsError] = useState('')
  const [rlsSummary, setRlsSummary] = useState<RlsSummary | null>(null)

  const emailConfirmed = Boolean(user?.email_confirmed_at)
  const lastSignIn = formatDateTime(user?.last_sign_in_at)
  const createdAt = formatDateTime(user?.created_at)

  async function testRls() {
    setTestingRls(true)
    setRlsError('')
    setRlsSummary(null)

    try {
      const clinics = await supabase.from('clinics').select('*')
      const memberships = await supabase.from('memberships').select('*')

      console.log('clinics', clinics)
      console.log('memberships', memberships)

      if (clinics.error) throw clinics.error
      if (memberships.error) throw memberships.error

      setRlsSummary({
        clinicsCount: clinics.data?.length || 0,
        membershipsCount: memberships.data?.length || 0,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao executar teste RLS.'
      setRlsError(message)
    } finally {
      setTestingRls(false)
    }
  }

  return (
    <AccountPageShell
      title="Área logada"
      subtitle="Resumo completo da conta, sessão ativa e status da clínica."
    >
      {/* Metrics Cards Grid */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        
        <article className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-inner backdrop-blur-md flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-slate-400">
            <UserRound className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Usuário</h2>
          </div>
          <div className="mt-3">
            <p className="text-lg font-extrabold text-slate-100 truncate">{profile?.name || '-'}</p>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{profile?.email || '-'}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-inner backdrop-blur-md flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-slate-400">
            <Building2 className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Espaço Clínico</h2>
          </div>
          <div className="mt-3">
            <p className="text-lg font-extrabold text-slate-100 truncate">{clinicName || '-'}</p>
            <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wide">Ambiente de Atendimento</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-inner backdrop-blur-md flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Segurança</h2>
          </div>
          <div className="mt-3">
            <p className="text-lg font-extrabold text-slate-100 truncate">
              {emailConfirmed ? 'Email confirmado' : 'Email pendente'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 truncate">Último login: {lastSignIn}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-inner backdrop-blur-md flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-slate-400">
            <UserRound className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Conta criada</h2>
          </div>
          <div className="mt-3">
            <p className="text-lg font-extrabold text-slate-100 truncate">{createdAt}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 truncate font-mono">ID: {user?.id || '-'}</p>
          </div>
        </article>
      </section>

      {/* Quick Actions Panel */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 backdrop-blur-md">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Atalhos rápidos</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/conta/perfil"
            className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-700"
          >
            <span>Alterar perfil</span>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </Link>
          <Link
            to="/conta/configurações"
            className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-700"
          >
            <span>Configurações da conta</span>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </Link>
          <Link
            to="/conta/clínica"
            className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-700"
          >
            <span>Minha clínica</span>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </Link>
        </div>
      </section>

    </AccountPageShell>
  )
}
