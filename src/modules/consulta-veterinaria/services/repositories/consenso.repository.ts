import type { ConsensusRecord } from '../../types/consenso'

export interface ConsensoRepository {
  list(): Promise<ConsensusRecord[]>
  getBySlug(slug: string): Promise<ConsensusRecord | null>
  search(query: string): Promise<ConsensusRecord[]>
  listByCategory(categorySlug: string): Promise<ConsensusRecord[]>
}

