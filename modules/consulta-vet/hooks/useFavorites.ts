import { useCallback, useEffect, useState } from 'react';
import { FavoriteEntityType, FavoriteRecord } from '../types/favorites';

const FAVORITES_KEY = 'vetius:consulta-vet:favorites:v1';
const FAVORITES_EVENT = 'consulta-vet:favorites-updated';

function readFavorites(): FavoriteRecord[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse favorites', error);
    return [];
  }
}

function writeFavorites(nextFavorites: FavoriteRecord[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(readFavorites());
    };

    syncFavorites();
    window.addEventListener(FAVORITES_EVENT, syncFavorites);
    window.addEventListener('storage', syncFavorites);

    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
      window.removeEventListener('storage', syncFavorites);
    };
  }, []);

  const toggleFavorite = useCallback((entityType: FavoriteEntityType, entityId: string) => {
    const current = readFavorites();
    const exists = current.find((item) => item.entityType === entityType && item.entityId === entityId);

    const nextFavorites = exists
      ? current.filter((item) => !(item.entityType === entityType && item.entityId === entityId))
      : [...current, { entityType, entityId, savedAt: new Date().toISOString() }];

    setFavorites(nextFavorites);
    writeFavorites(nextFavorites);
  }, []);

  const isFavorite = useCallback((entityType: FavoriteEntityType, entityId: string) => {
    return favorites.some((item) => item.entityType === entityType && item.entityId === entityId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
