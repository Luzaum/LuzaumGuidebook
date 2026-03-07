import { useMemo } from 'react'
import { useConsultaVetSnapshot } from './useConsultaVetSnapshot'
import { searchGlobalContent } from '../services/search/searchIndex'

export function useConsultaVetSearch(query: string) {
  const { snapshot, loading } = useConsultaVetSnapshot()

  const results = useMemo(() => {
    if (!snapshot || !query.trim()) {
      return {
        diseases: [],
        consensuses: [],
        medications: [],
      }
    }

    return searchGlobalContent({
      query,
      diseases: snapshot.diseases,
      consensuses: snapshot.consensuses,
      medications: snapshot.medications,
    })
  }, [query, snapshot])

  return { snapshot, loading, results }
}
