import {
  ConsensusDocumentDetails,
  ConsensusRecord,
  CreateConsensusInput,
  ListConsensusFilters,
  UpsertConsensusDocumentDetailsInput,
} from '../../types/consenso';

export interface ConsensoRepository {
  list(filters?: ListConsensusFilters): Promise<ConsensusRecord[]>;
  getBySlug(slug: string): Promise<ConsensusRecord | null>;
  search(query: string): Promise<ConsensusRecord[]>;
  listByCategory(categorySlug: string): Promise<ConsensusRecord[]>;
  create(input: CreateConsensusInput): Promise<ConsensusRecord>;
  getSharedDetailsByConsensusId(consensusDocumentId: string): Promise<ConsensusDocumentDetails | null>;
  upsertSharedDetails(
    consensusDocumentId: string,
    input: UpsertConsensusDocumentDetailsInput
  ): Promise<ConsensusDocumentDetails>;
}