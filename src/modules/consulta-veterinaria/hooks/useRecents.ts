import { useCallback, useEffect, useState } from 'react'
import { recentsStorage } from '../services/persistence/recents.storage'
import type { RecentRecord } from '../types/recents'

const RECENTS_EVENT = 'consulta-vet:recents'

export function useRecents() {
  const [recents, setRecents] = useState<RecentRecord[]>(() => recentsStorage.list())

  useEffect(() => {
    const sync = () => setRecents(recentsStorage.list())
    window.addEventListener(RECENTS_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(RECENTS_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const saveRecent = useCallback((record: RecentRecord) => {
    const next = recentsStorage.save(record)
    setRecents(next)
    window.dispatchEvent(new Event(RECENTS_EVENT))
  }, [])

  return { recents, saveRecent }
}

