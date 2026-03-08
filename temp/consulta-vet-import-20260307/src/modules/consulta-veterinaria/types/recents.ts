export type RecentEntityType = 'disease' | 'medication' | 'consensus';

export interface RecentRecord {
  entityType: RecentEntityType;
  entityId: string;
  visitedAt: string;
  pageNumber?: number;
  sectionId?: string;
}
