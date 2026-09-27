import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthSession } from './AuthSessionProvider'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const { loading, isAuthenticated } = useAuthSession()

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center p-6" role="status" aria-live="polite">
        <div className="flex max-w-sm flex-col items-center gap-3 text-center text-slate-600 dark:text-slate-300">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-emerald-500" aria-hidden="true" />
          <p className="text-sm font-medium">Validando sua sessão…</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Se a conexão falhar, você será direcionado para entrar novamente.</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    const nextPath = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={`/login?next=${encodeURIComponent(nextPath)}`} replace />
  }

  return <>{children}</>
}
