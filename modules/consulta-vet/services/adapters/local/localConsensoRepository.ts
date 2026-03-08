import { ConsensusRecord } from '../../../types/consenso';
import { ConsensoRepository } from '../../repositories/consenso.repository';
import { consensosSeed } from '../../../data/seed/consensos.seed';

function withSource(record: ConsensusRecord): ConsensusRecord {
  return { ...record, source: 'seed' };
}

export class LocalConsensoRepository implements ConsensoRepository {
  async list(): Promise<ConsensusRecord[]> {
    return consensosSeed.map(withSource);
  }

  async getBySlug(slug: string): Promise<ConsensusRecord | null> {
    const found = consensosSeed.find((c) => c.slug === slug);
    return found ? withSource(found) : null;
  }

  async search(query: string): Promise<ConsensusRecord[]> {
    const q = query.toLowerCase();
    return consensosSeed.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortTitle.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    ).map(withSource);
  }

  async listByCategory(categorySlug: string): Promise<ConsensusRecord[]> {
    return consensosSeed.filter((c) => c.category === categorySlug).map(withSource);
  }
}

export const consensoRepository = new LocalConsensoRepository();
