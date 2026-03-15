import { Category } from './category';
import { ConsensusRecord } from './consenso';
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

export type ConsensusUpsertInput = {
  id?: string;
  slug?: string;
  title: string;
  shortTitle?: string;
  description?: string | null;
  organization?: string | null;
  year?: number | null;
  category?: string | null;
  subcategory?: string | null;
  species: ConsensusRecord['species'];
  authors?: string | null;
  tags?: string[];
  /** PDF file para upload (omitir = manter PDF existente) */
  file?: File | null;
  isPublished?: boolean;
  // Detalhes editoriais (consensus_document_details)
  summaryText?: string | null;
  keyPointsText?: string | null;
  practicalApplicationText?: string | null;
  appNotesText?: string | null;
  references?: import('./common').EditorialReference[];
  // Relacionamentos
  relatedDiseaseSlugs?: string[];
  relatedMedicationSlugs?: string[];
};
