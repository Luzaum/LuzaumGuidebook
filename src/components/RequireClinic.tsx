import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useClinic } from './ClinicProvider'

export function RequireClinic({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { loading, clinicId } = useClinic()

  if (loading) {
    return <div className="p-6">Carregando clinica...</div>
  }

  if (!clinicId) {
    return <Navigate to="/clinic/setup" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
