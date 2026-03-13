import { useEffect, useState } from 'react';
import { LocalNote, LocalNoteEntityType } from '../types/notes';

const NOTES_KEY = 'vetius:consulta-vet:notes:v1';
const NOTES_EVENT = 'consulta-vet:notes-updated';

function readNotes(): LocalNote[] {
  const stored = localStorage.getItem(NOTES_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse notes', error);
    return [];
  }
}

function writeNotes(nextNotes: LocalNote[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(nextNotes));
  window.dispatchEvent(new Event(NOTES_EVENT));
}

export function useLocalNotes(entityType: LocalNoteEntityType, entityId: string) {
  const [note, setNote] = useState<LocalNote | null>(null);

  useEffect(() => {
    const syncNote = () => {
      const found = readNotes().find((item) => item.entityType === entityType && item.entityId === entityId) || null;
      setNote(found);
    };

    syncNote();
    window.addEventListener(NOTES_EVENT, syncNote);
    window.addEventListener('storage', syncNote);

    return () => {
      window.removeEventListener(NOTES_EVENT, syncNote);
      window.removeEventListener('storage', syncNote);
    };
  }, [entityId, entityType]);

  const saveNote = (content: string, pageNumber?: number) => {
    const current = readNotes();
    const nextNote: LocalNote = {
      entityType,
      entityId,
      content,
      pageNumber,
      updatedAt: new Date().toISOString(),
    };

    const nextNotes = [
      ...current.filter((item) => !(item.entityType === entityType && item.entityId === entityId)),
      nextNote,
    ];

    setNote(nextNote);
    writeNotes(nextNotes);
  };

  return { note, saveNote };
}
