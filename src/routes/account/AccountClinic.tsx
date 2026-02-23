import { Link, useNavigate } from 'react-router-dom'
import { Building2, ShieldCheck } from 'lucide-react'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { useClinic } from '@/src/components/ClinicProvider'
import { useAuthSession } from '@/src/components/AuthSessionProvider'

function formatDateTime(value: string | null | undefined) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleString('pt-BR')
}

export default function AccountClinic() {
  const nav = useNavigate()
  const { loading, clinicId, clinicName, role, membership } = useClinic()
  const { user } = useAuthSession()

  if (loading) {
    return <div className="p-6">Carregando clínica...</div>
  }

  return (
    <AccountPageShell
      title="Minha clínica"
      subtitle="Dados da clínica vinculada a sua conta e status de acesso multitenancy."
    >
      {clinicId ? (
        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Building2 className="h-4 w-4" />
              <h2 className="text-sm font-semibold">Dados da clínica</h2>
            </div>
            <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <p>
                <strong>Nome:</strong> {clinicName || '-'}
              </p>
              <p>
                <strong>clinic_id:</strong> {clinicId}
              </p>
              <p>
                <strong>Papel:</strong> {role || '-'}
              </p>
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <ShieldCheck className="h-4 w-4" />
              <h2 className="text-sm font-semibold">Vinculo de segurança</h2>
            </div>
            <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <p>
                <strong>membership_id:</strong> {membership?.membershipId || '-'}
              </p>
              <p>
                <strong>user_id:</strong> {user?.id || '-'}
              </p>
              <p>
                <strong>Criado em:</strong> {formatDateTime(membership?.membershipId ? user?.created_at : '')}
              </p>
            </div>
          </article>
        </section>
      ) : (
        <section className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
          <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-200">Nenhuma clínica ativa</h2>
          <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
            Esta conta ainda não possui clínica configurada. Para continuar com o fluxo SaaS, finalize o setup.
          </p>
          <button
            type="button"
            onClick={() => nav('/clinic/setup')}
            className="mt-3 rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-500"
          >
            Ir para setup de clínica
          </button>
        </section>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Navegacao relacionada</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Link
            to="/app"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Voltar para area logada
          </Link>
          <Link
            to="/conta/perfil"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Atualizar perfil da conta
          </Link>
        </div>
      </section>
    </AccountPageShell>
  )
}
