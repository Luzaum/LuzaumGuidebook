import { useEffect, useMemo, useState } from 'react'
import { notesStorage } from '../services/persistence/notes.storage'
import type { LocalNote } from '../types/notes'

export function useLocalNotes(entityType: LocalNote['entityType'], entityId: string) {
  const initial = useMemo(
    () => notesStorage.get(entityType, entityId)?.content || '',
    [entityId, entityType]
  )
  const [content, setContent] = useState(initial)
  const [savedAt, setSavedAt] = useState(notesStorage.get(entityType, entityId)?.updatedAt || '')

  useEffect(() => {
    setContent(initial)
  }, [initial])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const note = {
        entityType,
        entityId,
        content,
        updatedAt: new Date().toISOString(),
      }
      notesStorage.save(note)
      setSavedAt(note.updatedAt)
    }, 350)

    return () => window.clearTimeout(timer)
  }, [content, entityId, entityType])

  return {
    content,
    setContent,
    savedAt,
    clear: () => {
      notesStorage.clear(entityType, entityId)
      setContent('')
      setSavedAt('')
    },
  }
}

