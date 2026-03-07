import type { LocalNote } from '../../types/notes'
import { STORAGE_KEYS } from '../../utils/constants'

function readNotes(): LocalNote[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]') as LocalNote[]
  } catch {
    return []
  }
}

function writeNotes(next: LocalNote[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(next))
}

export const notesStorage = {
  list: readNotes,
  get(entityType: LocalNote['entityType'], entityId: string) {
    return readNotes().find((item) => item.entityType === entityType && item.entityId === entityId) || null
  },
  save(note: LocalNote) {
    const next = [
      note,
      ...readNotes().filter((item) => !(item.entityType === note.entityType && item.entityId === note.entityId)),
    ]
    writeNotes(next)
    return note
  },
  clear(entityType: LocalNote['entityType'], entityId: string) {
    const next = readNotes().filter((item) => !(item.entityType === entityType && item.entityId === entityId))
    writeNotes(next)
    return next
  },
}

