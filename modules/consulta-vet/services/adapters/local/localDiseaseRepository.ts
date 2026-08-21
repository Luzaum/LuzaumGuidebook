import { DiseaseRecord } from '../../../types/disease';
import { DiseaseUpsertInput } from '../../../types/editorial';
import { DiseaseRepository } from '../../repositories/disease.repository';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../../data/publicCatalogCardStubs';
import { loadDiseasesEditorialSeed } from '../../../data/seed/editorialSeedLazy';
import { applyDiseaseOverviewOverride } from '../../../data/seed/diseaseOverviewOverrides';
import { diseaseMatchesCategoryFilter } from '../../../utils/diseaseCategories';

export class LocalDiseaseRepository implements DiseaseRepository {
  async list(options?: { includeDrafts?: boolean }): Promise<DiseaseRecord[]> {
    return PUBLIC_CATALOG_DISEASE_CARD_STUBS.map(applyDiseaseOverviewOverride);
  }

  async getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<DiseaseRecord | null> {
    const diseasesSeed = await loadDiseasesEditorialSeed();
    return diseasesSeed.find((d) => d.slug === slug) || null;
  }

  async search(query: string): Promise<DiseaseRecord[]> {
    const q = query.toLowerCase();
    const base = await this.list();
    return base.filter(
      (d) =>
        String(d.title || '').toLowerCase().includes(q) ||
        (Array.isArray(d.synonyms) ? d.synonyms : []).some((s) => String(s).toLowerCase().includes(q)) ||
        (Array.isArray(d.tags) ? d.tags : []).some((t) => String(t).toLowerCase().includes(q))
    );
  }

  async listByCategory(categorySlug: string): Promise<DiseaseRecord[]> {
    const base = await this.list();
    return base.filter((d) => diseaseMatchesCategoryFilter(d, categorySlug));
  }

  async upsert(_input: DiseaseUpsertInput): Promise<DiseaseRecord> {
    throw new Error('A edição de doenças está indisponível no momento.');
  }
}

export const localDiseaseRepository = new LocalDiseaseRepository();
export const diseaseRepository = localDiseaseRepository;
