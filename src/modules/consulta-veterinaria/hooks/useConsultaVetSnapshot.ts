import { useEffect, useState } from 'react'
import { loadConsultaVetSnapshot } from '../services/repositories'

export function useConsultaVetSnapshot() {
  const [snapshot, setSnapshot] = useState<Awaited<ReturnType<typeof loadConsultaVetSnapshot>> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    loadConsultaVetSnapshot()
      .then((data) => {
        if (!active) return
        setSnapshot(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { snapshot, loading }
}

