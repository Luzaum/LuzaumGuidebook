export type FavoriteEntityType = 'disease' | 'medication' | 'consensus';

export interface FavoriteRecord {
  entityType: FavoriteEntityType;
  entityId: string;
  savedAt: string;
}
