import { STORAGE_KEYS } from '../../utils/constants'

export type DiseaseProgressRecord = {
  diseaseId: string
  sectionId: string
  updatedAt: string
}

function readProgress(): DiseaseProgressRecord[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.diseaseProgress) || '[]') as DiseaseProgressRecord[]
  } catch {
    return []
  }
}

function writeProgress(next: DiseaseProgressRecord[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.diseaseProgress, JSON.stringify(next))
}

export const diseaseProgressStorage = {
  list: readProgress,
  get(diseaseId: string) {
    return readProgress().find((item) => item.diseaseId === diseaseId) || null
  },
  save(record: DiseaseProgressRecord) {
    const next = [record, ...readProgress().filter((item) => item.diseaseId !== record.diseaseId)]
    writeProgress(next)
    return record
  },
}

