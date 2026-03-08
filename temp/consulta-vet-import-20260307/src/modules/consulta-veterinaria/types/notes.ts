export type LocalNoteEntityType = 'disease' | 'medication' | 'consensus';

export interface LocalNote {
  entityType: LocalNoteEntityType;
  entityId: string;
  content: string;
  pageNumber?: number;
  updatedAt: string;
}
