import { useState, useEffect, useCallback } from 'react';
import { RecentRecord, RecentEntityType } from '../types/recents';

const RECENTS_KEY = 'vetius:consulta-vet:recents:v1';
const MAX_RECENTS = 20;

export function useRecents() {
  const [recents, setRecents] = useState<RecentRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENTS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecents(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Failed to parse recents', e);
      }
    }
  }, []);

  const addRecent = useCallback((entityType: RecentEntityType, entityId: string, pageNumber?: number, sectionId?: string) => {
    setRecents((prev) => {
      const filtered = prev.filter((r) => !(r.entityType === entityType && r.entityId === entityId));
      const newRecent: RecentRecord = {
        entityType,
        entityId,
        visitedAt: new Date().toISOString(),
        pageNumber,
        sectionId,
      };
      const newRecents = [newRecent, ...filtered].slice(0, MAX_RECENTS);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(newRecents));
      return newRecents;
    });
  }, []);

  return { recents, addRecent };
}

