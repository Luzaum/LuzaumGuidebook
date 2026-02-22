import { Building2, ChevronDown, LogOut, Settings, ShieldCheck, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useClinic } from './ClinicProvider'
import { useAuthSession } from './AuthSessionProvider'

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

export function TopRightAuthMenu() {
  const location = useLocation()
  const navigate = useNavigate()
  const { loading, isAuthenticated, profile, logout } = useAuthSession()
  const { clinicName } = useClinic()

  const currentPath = `${location.pathname}${location.search}${location.hash}`
  const loginHref = `/login?next=${encodeURIComponent(currentPath || '/')}`

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
  }

  if (!isAuthenticated || !profile) {
    return (
      <Link
        to={loginHref}
        className="inline-flex h-10 items-center justify-center rounded-full border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Entrar
      </Link>
    )
  }

  const initials = buildInitials(profile.name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-2 pl-1.5 text-sm text-slate-800 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          aria-label="Abrir menu do usuário"
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={`Avatar de ${profile.name}`}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white dark:bg-slate-100 dark:text-slate-900">
              {initials}
            </span>
          )}
          <span className="hidden max-w-[140px] truncate sm:inline">{profile.name}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={`Avatar de ${profile.name}`}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                {initials}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{profile.name}</p>
              <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
              {clinicName ? (
                <p className="truncate text-xs text-emerald-600 dark:text-emerald-400">Clínica: {clinicName}</p>
              ) : null}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => navigate('/app')}>
          <ShieldCheck className="mr-2 h-4 w-4" />
          Área logada
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => navigate('/conta/perfil')}>
          <UserRound className="mr-2 h-4 w-4" />
          Alterar perfil
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => navigate('/conta/configuracoes')}>
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => navigate('/conta/clinica')}>
          <Building2 className="mr-2 h-4 w-4" />
          Minha clínica
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
          onSelect={async () => {
            await logout()
            navigate('/login', { replace: true })
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
