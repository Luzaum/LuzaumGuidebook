export type RecentEntityType = 'disease' | 'consensus' | 'medication'

export type RecentRecord = {
  entityType: RecentEntityType
  entityId: string
  visitedAt: string
  pageNumber?: number
  sectionId?: string
}

