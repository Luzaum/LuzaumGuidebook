export type LocalNoteEntityType = 'disease' | 'consensus' | 'medication'

export type LocalNote = {
  entityType: LocalNoteEntityType
  entityId: string
  pageNumber?: number
  content: string
  updatedAt: string
}

