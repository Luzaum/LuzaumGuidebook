import { useCallback, useEffect, useState } from 'react';
import { RecentEntityType, RecentRecord } from '../types/recents';

const RECENTS_KEY = 'vetius:consulta-vet:recents:v1';
const RECENTS_EVENT = 'consulta-vet:recents-updated';
const MAX_RECENTS = 20;

function readRecents(): RecentRecord[] {
  const stored = localStorage.getItem(RECENTS_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse recents', error);
    return [];
  }
}

function writeRecents(nextRecents: RecentRecord[]) {
  localStorage.setItem(RECENTS_KEY, JSON.stringify(nextRecents));
  window.dispatchEvent(new Event(RECENTS_EVENT));
}

export function useRecents() {
  const [recents, setRecents] = useState<RecentRecord[]>([]);

  useEffect(() => {
    const syncRecents = () => {
      setRecents(readRecents());
    };

    syncRecents();
    window.addEventListener(RECENTS_EVENT, syncRecents);
    window.addEventListener('storage', syncRecents);

    return () => {
      window.removeEventListener(RECENTS_EVENT, syncRecents);
      window.removeEventListener('storage', syncRecents);
    };
  }, []);

  const addRecent = useCallback((
    entityType: RecentEntityType,
    entityId: string,
    pageNumber?: number,
    sectionId?: string
  ) => {
    const current = readRecents();
    const filtered = current.filter((item) => !(item.entityType === entityType && item.entityId === entityId));
    const nextRecent: RecentRecord = {
      entityType,
      entityId,
      visitedAt: new Date().toISOString(),
      pageNumber,
      sectionId,
    };
    const nextRecents = [nextRecent, ...filtered].slice(0, MAX_RECENTS);

    setRecents(nextRecents);
    writeRecents(nextRecents);
  }, []);

  return { recents, addRecent };
}
