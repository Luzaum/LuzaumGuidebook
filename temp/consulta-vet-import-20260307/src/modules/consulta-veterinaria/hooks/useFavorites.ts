import { useState, useEffect } from 'react';
import { FavoriteRecord, FavoriteEntityType } from '../types/favorites';

const FAVORITES_KEY = 'vetius:consulta-veterinaria:favorites:v1';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const toggleFavorite = (entityType: FavoriteEntityType, entityId: string) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.entityType === entityType && f.entityId === entityId);
      let newFavorites;
      if (exists) {
        newFavorites = prev.filter((f) => !(f.entityType === entityType && f.entityId === entityId));
      } else {
        newFavorites = [...prev, { entityType, entityId, savedAt: new Date().toISOString() }];
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (entityType: FavoriteEntityType, entityId: string) => {
    return favorites.some((f) => f.entityType === entityType && f.entityId === entityId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
