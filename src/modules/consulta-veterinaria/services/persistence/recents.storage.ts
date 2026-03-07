import type { RecentRecord } from '../../types/recents'
import { STORAGE_KEYS } from '../../utils/constants'

function readRecents(): RecentRecord[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.recents) || '[]') as RecentRecord[]
  } catch {
    return []
  }
}

function writeRecents(next: RecentRecord[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.recents, JSON.stringify(next))
}

export const recentsStorage = {
  list: readRecents,
  save(record: RecentRecord) {
    const next = [
      record,
      ...readRecents().filter((item) => !(item.entityType === record.entityType && item.entityId === record.entityId)),
    ].slice(0, 24)
    writeRecents(next)
    return next
  },
}
