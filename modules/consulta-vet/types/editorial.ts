import { Category } from './category';
import { DiseaseRecord } from './disease';
import { MedicationRecord } from './medication';

export type CategoryUpsertInput = Pick<Category, 'slug' | 'title' | 'sortOrder'> & {
  id?: string;
  description?: string | null;
  isPublished?: boolean;
};

export type DiseaseUpsertInput = Omit<
  DiseaseRecord,
  'id' | 'source' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
  isPublished?: boolean;
};

export type MedicationUpsertInput = Omit<
  MedicationRecord,
  'id' | 'source' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
  isPublished?: boolean;
};
