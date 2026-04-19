import { MedicationRecord } from '../../../types/medication';
import { MedicationUpsertInput } from '../../../types/editorial';
import { MedicationRepository } from '../../repositories/medication.repository';
import { PUBLIC_CATALOG_MEDICATION_CARD_STUBS } from '../../../data/publicCatalogCardStubs';
import { loadMedicationsEditorialSeed } from '../../../data/seed/editorialSeedLazy';
import { filterPublicMedications, isPublicMedicationSlug } from '../../../constants/publicCatalog';

export class LocalMedicationRepository implements MedicationRepository {
  async list(options?: { includeDrafts?: boolean }): Promise<MedicationRecord[]> {
    if (!options?.includeDrafts) {
      return [...PUBLIC_CATALOG_MEDICATION_CARD_STUBS];
    }
    const medicationsSeed = await loadMedicationsEditorialSeed();
    return [...medicationsSeed];
  }

  async getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<MedicationRecord | null> {
    const medicationsSeed = await loadMedicationsEditorialSeed();
    if (!options?.includeDrafts) {
      if (!isPublicMedicationSlug(slug)) return null;
      return filterPublicMedications(medicationsSeed, false).find((m) => m.slug === slug) || null;
    }
    return medicationsSeed.find((m) => m.slug === slug) || null;
  }

  async search(query: string): Promise<MedicationRecord[]> {
    const q = query.toLowerCase();
    const base = await this.list();
    return base.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.activeIngredient.toLowerCase().includes(q) ||
        m.tradeNames.some((t) => t.toLowerCase().includes(q)) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  async listByCategory(categorySlug: string): Promise<MedicationRecord[]> {
    const base = await this.list();
    return base.filter((m) => m.category === categorySlug);
  }

  async upsert(_input: MedicationUpsertInput): Promise<MedicationRecord> {
    throw new Error('Edicao editorial disponivel apenas com Supabase configurado.');
  }
}

export const localMedicationRepository = new LocalMedicationRepository();
export const medicationRepository = localMedicationRepository;
