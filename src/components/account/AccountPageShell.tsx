import { Building2, Settings, ShieldCheck, UserRound } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthSession } from '../AuthSessionProvider'
import { useClinic } from '../ClinicProvider'

type AccountPageShellProps = {
  title: string
  subtitle: string
  children: React.ReactNode
}

const accountLinks = [
  { to: '/app', label: 'Área logada', icon: ShieldCheck },
  { to: '/conta/perfil', label: 'Alterar perfil', icon: UserRound },
  { to: '/conta/configurações', label: 'Configurações', icon: Settings },
  { to: '/conta/clínica', label: 'Espaço Clínico', icon: Building2 },
]

function buildInitials(name: string): string {
  const parts = name
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)

  if (parts.length === 0) return 'US'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase()
}

export function AccountPageShell({ title, subtitle, children }: AccountPageShellProps) {
  const location = useLocation()
  const { profile } = useAuthSession()
  const { clinicName, role } = useClinic()

  const displayName = profile?.name || 'Usuário'
  const displayEmail = profile?.email || '-'
  const initials = buildInitials(displayName)
  const activeClinic = clinicName || 'Não definida'
  const activeRole = role || 'member'

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#060818] via-[#0b1024] to-[#0d1a2e] text-white py-8 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Gentle background animated blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />

      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-[#090b13]/80 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        
        {/* Banner Section */}
        <div className="border-b border-slate-800/80 bg-slate-950/40 px-6 py-6 text-white sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-lg">
                {subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 backdrop-blur-md shadow-inner">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={`Avatar de ${displayName}`}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
              ) : (
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-slate-300 ring-2 ring-slate-700/55">
                  {initials}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-200">{displayName}</p>
                <p className="truncate text-xs text-slate-400">{displayEmail}</p>
                <p className="truncate text-xs font-semibold text-emerald-400 mt-0.5">
                  Espaço Clínico: {activeClinic}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="border-b border-slate-800/80 bg-slate-950/20 px-6 py-4 sm:px-8">
          <nav className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {accountLinks.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-500/30 shadow-[0_4px_15px_rgba(16,185,129,0.2)] scale-[1.02]'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Inner Content wrapper */}
        <div className="px-6 py-8 sm:px-8 space-y-8 bg-slate-950/10">
          {children}
        </div>
      </section>
    </div>
  )
}
