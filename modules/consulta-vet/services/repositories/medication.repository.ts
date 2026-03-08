import { MedicationRecord } from '../../types/medication';

export interface MedicationRepository {
  list(): Promise<MedicationRecord[]>;
  getBySlug(slug: string): Promise<MedicationRecord | null>;
  search(query: string): Promise<MedicationRecord[]>;
  listByCategory(categorySlug: string): Promise<MedicationRecord[]>;
}
