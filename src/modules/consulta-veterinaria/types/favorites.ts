export type FavoriteEntityType = 'disease' | 'consensus' | 'medication'

export type FavoriteRecord = {
  entityType: FavoriteEntityType
  entityId: string
  savedAt: string
}

