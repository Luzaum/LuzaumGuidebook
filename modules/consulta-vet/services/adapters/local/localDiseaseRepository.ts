import { DiseaseRecord } from '../../../types/disease';
import { DiseaseUpsertInput } from '../../../types/editorial';
import { DiseaseRepository } from '../../repositories/disease.repository';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../../data/publicCatalogCardStubs';
import { loadDiseasesEditorialSeed } from '../../../data/seed/editorialSeedLazy';
import { filterPublicDiseases, isPublicDiseaseSlug } from '../../../constants/publicCatalog';

export class LocalDiseaseRepository implements DiseaseRepository {
  async list(options?: { includeDrafts?: boolean }): Promise<DiseaseRecord[]> {
    if (!options?.includeDrafts) {
      return [...PUBLIC_CATALOG_DISEASE_CARD_STUBS];
    }
    const diseasesSeed = await loadDiseasesEditorialSeed();
    return [...diseasesSeed];
  }

  async getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<DiseaseRecord | null> {
    const diseasesSeed = await loadDiseasesEditorialSeed();
    if (!options?.includeDrafts) {
      if (!isPublicDiseaseSlug(slug)) return null;
      return filterPublicDiseases(diseasesSeed, false).find((d) => d.slug === slug) || null;
    }
    return diseasesSeed.find((d) => d.slug === slug) || null;
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
