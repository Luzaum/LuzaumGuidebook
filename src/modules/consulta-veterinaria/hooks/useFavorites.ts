import { useCallback, useEffect, useState } from 'react'
import { favoritesStorage } from '../services/persistence/favorites.storage'
import type { FavoriteRecord } from '../types/favorites'

const FAVORITES_EVENT = 'consulta-vet:favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecord[]>(() => favoritesStorage.list())

  useEffect(() => {
    const sync = () => setFavorites(favoritesStorage.list())
    window.addEventListener(FAVORITES_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(FAVORITES_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggleFavorite = useCallback((entityType: FavoriteRecord['entityType'], entityId: string) => {
    const next = favoritesStorage.toggle(entityType, entityId)
    setFavorites(next)
    window.dispatchEvent(new Event(FAVORITES_EVENT))
  }, [])

  return { favorites, toggleFavorite }
}

