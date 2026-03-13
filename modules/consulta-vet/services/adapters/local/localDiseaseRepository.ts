import { DiseaseRecord } from '../../../types/disease';
import { DiseaseUpsertInput } from '../../../types/editorial';
import { DiseaseRepository } from '../../repositories/disease.repository';
import { diseasesSeed } from '../../../data/seed/diseases.seed';

export class LocalDiseaseRepository implements DiseaseRepository {
  async list(): Promise<DiseaseRecord[]> {
    return diseasesSeed;
  }

  async getBySlug(slug: string): Promise<DiseaseRecord | null> {
    return diseasesSeed.find((d) => d.slug === slug) || null;
  }

  async search(query: string): Promise<DiseaseRecord[]> {
    const q = query.toLowerCase();
    return diseasesSeed.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.synonyms.some((s) => s.toLowerCase().includes(q)) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  async listByCategory(categorySlug: string): Promise<DiseaseRecord[]> {
    return diseasesSeed.filter((d) => d.category === categorySlug);
  }

  async upsert(_input: DiseaseUpsertInput): Promise<DiseaseRecord> {
    throw new Error('Edicao editorial disponivel apenas com Supabase configurado.');
  }
}

export const localDiseaseRepository = new LocalDiseaseRepository();
export const diseaseRepository = localDiseaseRepository;
