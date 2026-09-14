import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthSession } from './AuthSessionProvider'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('__visual')) {
    return <>{children}</>
  }
  const location = useLocation()
  const { loading, isAuthenticated } = useAuthSession()

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (!isAuthenticated) {
    const nextPath = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={`/login?next=${encodeURIComponent(nextPath)}`} replace />
  }

  return <>{children}</>
}
