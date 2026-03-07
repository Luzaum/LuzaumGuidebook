import type { FavoriteRecord } from '../../types/favorites'
import { STORAGE_KEYS } from '../../utils/constants'

function readFavorites(): FavoriteRecord[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || '[]') as FavoriteRecord[]
  } catch {
    return []
  }
}

function writeFavorites(next: FavoriteRecord[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next))
}

export const favoritesStorage = {
  list: readFavorites,
  toggle(entityType: FavoriteRecord['entityType'], entityId: string) {
    const current = readFavorites()
    const exists = current.some((item) => item.entityType === entityType && item.entityId === entityId)
    const next = exists
      ? current.filter((item) => !(item.entityType === entityType && item.entityId === entityId))
      : [{ entityType, entityId, savedAt: new Date().toISOString() }, ...current]
    writeFavorites(next)
    return next
  },
}

