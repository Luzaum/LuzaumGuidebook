import { DiseaseRecord } from '../../../types/disease';
import { DiseaseUpsertInput } from '../../../types/editorial';
import { DiseaseRepository } from '../../repositories/disease.repository';
import { diseasesSeed } from '../../../data/seed/diseases.seed';
import { filterPublicDiseases } from '../../../constants/publicCatalog';

export class LocalDiseaseRepository implements DiseaseRepository {
  async list(options?: { includeDrafts?: boolean }): Promise<DiseaseRecord[]> {
    return filterPublicDiseases(diseasesSeed, Boolean(options?.includeDrafts));
  }

  async getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<DiseaseRecord | null> {
    const items = await this.list(options);
    return items.find((d) => d.slug === slug) || null;
  }

  async search(query: string): Promise<DiseaseRecord[]> {
    const q = query.toLowerCase();
    const base = await this.list();
    return base.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.synonyms.some((s) => s.toLowerCase().includes(q)) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  async listByCategory(categorySlug: string): Promise<DiseaseRecord[]> {
    const base = await this.list();
    return base.filter((d) => d.category === categorySlug);
  }

  async upsert(_input: DiseaseUpsertInput): Promise<DiseaseRecord> {
    throw new Error('Edicao editorial disponivel apenas com Supabase configurado.');
  }
}

export const localDiseaseRepository = new LocalDiseaseRepository();
export const diseaseRepository = localDiseaseRepository;
