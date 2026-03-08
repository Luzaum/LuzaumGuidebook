import { MedicationRecord } from '../../../types/medication';
import { MedicationRepository } from '../../repositories/medication.repository';
import { medicationsSeed } from '../../../data/seed/medications.seed';

export class LocalMedicationRepository implements MedicationRepository {
  async list(): Promise<MedicationRecord[]> {
    return medicationsSeed;
  }

  async getBySlug(slug: string): Promise<MedicationRecord | null> {
    return medicationsSeed.find((m) => m.slug === slug) || null;
  }

  async search(query: string): Promise<MedicationRecord[]> {
    const q = query.toLowerCase();
    return medicationsSeed.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.activeIngredient.toLowerCase().includes(q) ||
        m.tradeNames.some((t) => t.toLowerCase().includes(q)) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  async listByCategory(categorySlug: string): Promise<MedicationRecord[]> {
    return medicationsSeed.filter((m) => m.category === categorySlug);
  }
}

export const medicationRepository = new LocalMedicationRepository();
