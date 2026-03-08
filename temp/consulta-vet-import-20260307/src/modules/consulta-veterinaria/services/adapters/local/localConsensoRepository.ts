import { ConsensusRecord } from '../../../types/consenso';
import { ConsensoRepository } from '../../repositories/consenso.repository';
import { consensosSeed } from '../../../data/seed/consensos.seed';

export class LocalConsensoRepository implements ConsensoRepository {
  async list(): Promise<ConsensusRecord[]> {
    return consensosSeed;
  }

  async getBySlug(slug: string): Promise<ConsensusRecord | null> {
    return consensosSeed.find((c) => c.slug === slug) || null;
  }

  async search(query: string): Promise<ConsensusRecord[]> {
    const q = query.toLowerCase();
    return consensosSeed.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortTitle.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  async listByCategory(categorySlug: string): Promise<ConsensusRecord[]> {
    return consensosSeed.filter((c) => c.category === categorySlug);
  }
}

export const consensoRepository = new LocalConsensoRepository();
