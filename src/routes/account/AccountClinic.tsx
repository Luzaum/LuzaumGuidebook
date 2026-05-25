import { useNavigate } from 'react-router-dom'
import { useClinic } from '@/src/components/ClinicProvider'
import { useAuthSession } from '@/src/components/AuthSessionProvider'
import { AccountPageShell } from '@/src/components/account/AccountPageShell'
import { Building2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function formatDateTime(value: string | null | undefined) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleString('pt-BR')
}

export default function AccountClinic() {
  const navigate = useNavigate()
  const { loading, clinicId, clinicName, role, membership } = useClinic()
  const { user } = useAuthSession()

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-slate-400">
        <span>Carregando clínica...</span>
      </div>
    )
  }

  return (
    <AccountPageShell
      title="Espaço Clínico"
      subtitle="Informações sobre o seu espaço de atendimento clínico ativo."
    >
      {clinicId ? (
        <section className="grid gap-5 md:grid-cols-2">
          
          <article className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 shadow-inner backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-slate-300 mb-5">
              <Building2 className="h-5 w-5 text-emerald-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Seu Espaço Clínico</h2>
            </div>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Identificação</span>
                <span className="text-slate-100 font-extrabold text-lg mt-1 block">{clinicName || '-'}</span>
              </div>
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Sua Atribuição</span>
                <span className="inline-flex items-center gap-1.5 mt-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {role === 'owner' ? 'Veterinário Responsável' : 'Veterinário Colaborador'}
                </span>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 shadow-inner backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-slate-300 mb-5">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Status do Ambiente</h2>
            </div>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Conexão na Nuvem</span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-200 font-bold">Ativo & Sincronizado</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Configurado em</span>
                <span className="text-slate-200 font-semibold mt-1 block">
                  {formatDateTime(membership?.membershipId ? user?.created_at : '')}
                </span>
              </div>
            </div>
          </article>
          
        </section>
      ) : (
        <section className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-400">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Nenhum Espaço Configurado</h2>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Esta conta ainda não possui um consultório ou clínica ativa. Para emitir receitas, gerenciar prontuários e acessar as ferramentas do Vetius, você precisa configurar seu espaço.
          </p>
          <button
            type="button"
            onClick={() => navigate('/clinic/setup')}
            className="mt-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-2.5 transition-all shadow-md active:scale-[0.98]"
          >
            Configurar Espaço de Trabalho
          </button>
        </section>
      )}

      {/* Navigation section */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 backdrop-blur-md">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Navegação relacionada</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            to="/app"
            className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-700"
          >
            <span>Voltar para área logada</span>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </Link>
          <Link
            to="/conta/perfil"
            className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-700"
          >
            <span>Atualizar perfil da conta</span>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </Link>
        </div>
      </section>
    </AccountPageShell>
  )
}
