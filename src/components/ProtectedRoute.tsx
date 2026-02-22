import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getSession } from '../lib/auth'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const session = await getSession()
        if (!alive) {
          return
        }
        setOk(Boolean(session))
      } catch {
        if (!alive) {
          return
        }
        setOk(false)
      } finally {
        if (alive) {
          setLoading(false)
        }
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (!ok) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
