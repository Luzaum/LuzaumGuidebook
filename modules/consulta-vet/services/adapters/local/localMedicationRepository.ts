import { MedicationRecord } from '../../../types/medication';
import { MedicationUpsertInput } from '../../../types/editorial';
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

  async upsert(_input: MedicationUpsertInput): Promise<MedicationRecord> {
    throw new Error('Edicao editorial disponivel apenas com Supabase configurado.');
  }
}

export const localMedicationRepository = new LocalMedicationRepository();
export const medicationRepository = localMedicationRepository;
