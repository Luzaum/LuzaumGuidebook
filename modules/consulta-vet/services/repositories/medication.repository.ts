import { MedicationRecord } from '../../types/medication';
import { MedicationUpsertInput } from '../../types/editorial';

export interface MedicationRepository {
  list(options?: { includeDrafts?: boolean }): Promise<MedicationRecord[]>;
  getBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<MedicationRecord | null>;
  search(query: string): Promise<MedicationRecord[]>;
  listByCategory(categorySlug: string): Promise<MedicationRecord[]>;
  upsert(input: MedicationUpsertInput): Promise<MedicationRecord>;
}
