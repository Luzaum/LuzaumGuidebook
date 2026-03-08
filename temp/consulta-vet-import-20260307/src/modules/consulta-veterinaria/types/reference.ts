export type ReferenceSourceType = 'book' | 'consensus' | 'article' | 'website';

export type ReferenceItem = {
  id: string;
  citationText: string;
  sourceType: ReferenceSourceType;
  url?: string;
  notes?: string;
};
