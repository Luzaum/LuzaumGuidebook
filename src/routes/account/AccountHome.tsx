import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, ShieldCheck, UserRound } from 'lucide-react'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { useAuthSession } from '@/src/components/AuthSessionProvider'
import { useClinic } from '@/src/components/ClinicProvider'
import { supabase } from '@/src/lib/supabaseClient'

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
  const [rlsSummary, setRlsSummary] = useState<{
    clinicsCount: number
    membershipsCount: number
  } | null>(null)

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
      title="Area logada"
      subtitle="Resumo completo da conta, sessao ativa e status da clinica."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <UserRound className="h-4 w-4" />
            <h2 className="text-sm font-semibold">Usuario</h2>
          </div>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{profile?.name || '-'}</p>
          <p className="text-sm text-slate-500">{profile?.email || '-'}</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Building2 className="h-4 w-4" />
            <h2 className="text-sm font-semibold">Clinica ativa</h2>
          </div>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{clinicName || '-'}</p>
          <p className="text-sm text-slate-500">Perfil: {role || '-'}</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4" />
            <h2 className="text-sm font-semibold">Seguranca</h2>
          </div>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
            {emailConfirmed ? 'Email confirmado' : 'Email pendente'}
          </p>
          <p className="text-sm text-slate-500">Ultimo login: {lastSignIn}</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <UserRound className="h-4 w-4" />
            <h2 className="text-sm font-semibold">Conta criada</h2>
          </div>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{createdAt}</p>
          <p className="truncate text-xs text-slate-500">ID: {user?.id || '-'}</p>
        </article>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Atalhos rapidos</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/conta/perfil"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Alterar perfil
          </Link>
          <Link
            to="/conta/configuracoes"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Configuracoes da conta
          </Link>
          <Link
            to="/conta/clinica"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Minha clinica
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Dados tecnicos</h2>
        <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
          <p>
            <strong>clinic_id:</strong> {clinicId || '-'}
          </p>
          <p>
            <strong>role:</strong> {role || '-'}
          </p>
        </div>

        {showRlsDebug ? (
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            <button
              type="button"
              className="rounded bg-slate-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
              onClick={testRls}
              disabled={testingRls}
            >
              {testingRls ? 'Testando RLS...' : 'Testar RLS (clinics/memberships)'}
            </button>

            {rlsSummary ? (
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                clinics: <strong>{rlsSummary.clinicsCount}</strong> | memberships:{' '}
                <strong>{rlsSummary.membershipsCount}</strong>
              </p>
            ) : null}
            {rlsError ? <p className="mt-2 text-sm text-red-600">{rlsError}</p> : null}
          </div>
        ) : null}
      </section>
    </AccountPageShell>
  )
}
