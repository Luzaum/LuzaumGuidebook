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
  { to: '/app', label: 'Area logada', icon: ShieldCheck },
  { to: '/conta/perfil', label: 'Alterar perfil', icon: UserRound },
  { to: '/conta/configuracoes', label: 'Configuracoes', icon: Settings },
  { to: '/conta/clinica', label: 'Minha clinica', icon: Building2 },
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

  const displayName = profile?.name || 'Usuario'
  const displayEmail = profile?.email || '-'
  const initials = buildInitials(displayName)
  const activeClinic = clinicName || 'Nao definida'
  const activeRole = role || 'member'

  return (
    <div className="mx-auto w-full max-w-6xl py-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-5 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{title}</h1>
              <p className="mt-1 text-sm text-slate-200">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={`Avatar de ${displayName}`}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-700 text-sm font-bold">
                  {initials}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{displayName}</p>
                <p className="truncate text-xs text-slate-200">{displayEmail}</p>
                <p className="truncate text-xs text-emerald-300">
                  Clinica: {activeClinic} ({activeRole})
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70">
          <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {accountLinks.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="space-y-6 px-4 py-5 md:px-6">{children}</div>
      </section>
    </div>
  )
}
