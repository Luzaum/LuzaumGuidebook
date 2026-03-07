import { STORAGE_KEYS } from '../../utils/constants'

export type PdfProgressRecord = {
  consensusId: string
  page: number
  zoom?: number
  updatedAt: string
}

function readProgress(): PdfProgressRecord[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.pdfProgress) || '[]') as PdfProgressRecord[]
  } catch {
    return []
  }
}

function writeProgress(next: PdfProgressRecord[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.pdfProgress, JSON.stringify(next))
}

export const pdfProgressStorage = {
  list: readProgress,
  get(consensusId: string) {
    return readProgress().find((item) => item.consensusId === consensusId) || null
  },
  save(record: PdfProgressRecord) {
    const next = [record, ...readProgress().filter((item) => item.consensusId !== record.consensusId)]
    writeProgress(next)
    return record
  },
}

