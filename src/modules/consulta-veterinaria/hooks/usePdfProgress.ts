import { useEffect, useState } from 'react'
import { pdfProgressStorage } from '../services/persistence/pdfProgress.storage'

export function usePdfProgress(consensusId: string) {
  const [page, setPage] = useState(pdfProgressStorage.get(consensusId)?.page || 1)
  const [zoom, setZoom] = useState(pdfProgressStorage.get(consensusId)?.zoom || 1)

  useEffect(() => {
    const record = pdfProgressStorage.get(consensusId)
    setPage(record?.page || 1)
    setZoom(record?.zoom || 1)
  }, [consensusId])

  useEffect(() => {
    pdfProgressStorage.save({
      consensusId,
      page,
      zoom,
      updatedAt: new Date().toISOString(),
    })
  }, [consensusId, page, zoom])

  return { page, setPage, zoom, setZoom }
}
