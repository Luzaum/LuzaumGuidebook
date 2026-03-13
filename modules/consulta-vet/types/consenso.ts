import { EditorialReference } from './common';

export type ConsensusSpecies = 'dog' | 'cat' | 'both';

export interface ConsensusRecord {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  organization: string | null;
  year: number | null;
  category: string | null;
  species: ConsensusSpecies;
  filePath: string;
  fileUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;

  // Campos legados opcionais para compatibilidade gradual com seed local.
  shortTitle?: string;
  sourceOrganization?: string;
  tags?: string[];
  pdfUrl?: string;
  pdfFileName?: string;
  summary?: string;
  articleSummaryRichText?: string;
  adminNotesRichText?: string;
  relatedDiseaseSlugs?: string[];
  isDemonstrative?: boolean;
  warningLabel?: string;
  source?: 'seed' | 'supabase';
  storagePath?: string;
}

export interface ListConsensusFilters {
  query?: string;
  category?: string;
  species?: ConsensusSpecies | '';
}

export interface CreateConsensusInput {
  title: string;
  description?: string;
  organization?: string;
  year?: number | null;
  category?: string;
  species: ConsensusSpecies;
  file: File;
  isPublished?: boolean;
}

export interface ConsensusDocumentDetails {
  id: string;
  consensusDocumentId: string;
  summaryText: string | null;
  keyPointsText: string | null;
  practicalApplicationText: string | null;
  appNotesText: string | null;
  references?: EditorialReference[];
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertConsensusDocumentDetailsInput {
  summaryText?: string | null;
  keyPointsText?: string | null;
  practicalApplicationText?: string | null;
  appNotesText?: string | null;
  references?: EditorialReference[];
}
