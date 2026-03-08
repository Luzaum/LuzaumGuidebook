import { useState, useEffect } from 'react';
import { LocalNote, LocalNoteEntityType } from '../types/notes';

const NOTES_KEY = 'vetius:consulta-vet:notes:v1';

export function useLocalNotes(entityType: LocalNoteEntityType, entityId: string) {
  const [note, setNote] = useState<LocalNote | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(NOTES_KEY);
    if (stored) {
      try {
        const allNotes: LocalNote[] = JSON.parse(stored);
        const found = allNotes.find((n) => n.entityType === entityType && n.entityId === entityId);
        if (found) {
          setNote(found);
        }
      } catch (e) {
        console.error('Failed to parse notes', e);
      }
    }
  }, [entityType, entityId]);

  const saveNote = (content: string, pageNumber?: number) => {
    const stored = localStorage.getItem(NOTES_KEY);
    let allNotes: LocalNote[] = [];
    if (stored) {
      try {
        allNotes = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse notes', e);
      }
    }

    const newNote: LocalNote = {
      entityType,
      entityId,
      content,
      pageNumber,
      updatedAt: new Date().toISOString(),
    };

    const filtered = allNotes.filter((n) => !(n.entityType === entityType && n.entityId === entityId));
    filtered.push(newNote);

    localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    setNote(newNote);
  };

  return { note, saveNote };
}

