import {
  ConsensusDocumentDetails,
  ConsensusRecord,
  CreateConsensusInput,
  ListConsensusFilters,
  UpsertConsensusDocumentDetailsInput,
} from '../../types/consenso';
import { ConsensusUpsertInput } from '../../types/editorial';

export interface ConsensoRepository {
  list(filters?: ListConsensusFilters, options?: { includeDrafts?: boolean }): Promise<ConsensusRecord[]>;
  getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<ConsensusRecord | null>;
  search(query: string): Promise<ConsensusRecord[]>;
  listByCategory(categorySlug: string): Promise<ConsensusRecord[]>;
  create(input: CreateConsensusInput): Promise<ConsensusRecord>;
  /** CRUD editorial: criar ou editar um consenso completo */
  upsert(input: ConsensusUpsertInput): Promise<ConsensusRecord>;
  /** Substitui o PDF de um consenso existente */
  replacePdf(consensusId: string, file: File): Promise<ConsensusRecord>;
  getSharedDetailsByConsensusId(consensusDocumentId: string): Promise<ConsensusDocumentDetails | null>;
  upsertSharedDetails(
    consensusDocumentId: string,
    input: UpsertConsensusDocumentDetailsInput
  ): Promise<ConsensusDocumentDetails>;
}