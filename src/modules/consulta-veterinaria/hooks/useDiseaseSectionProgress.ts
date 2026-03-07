import { useEffect, useState } from 'react'
import { diseaseProgressStorage } from '../services/persistence/diseaseProgress.storage'

export function useDiseaseSectionProgress(diseaseId: string) {
  const [activeSectionId, setActiveSectionId] = useState(
    diseaseProgressStorage.get(diseaseId)?.sectionId || 'introducao'
  )

  useEffect(() => {
    const record = diseaseProgressStorage.get(diseaseId)
    setActiveSectionId(record?.sectionId || 'introducao')
  }, [diseaseId])

  useEffect(() => {
    diseaseProgressStorage.save({
      diseaseId,
      sectionId: activeSectionId,
      updatedAt: new Date().toISOString(),
    })
  }, [activeSectionId, diseaseId])

  return { activeSectionId, setActiveSectionId }
}

