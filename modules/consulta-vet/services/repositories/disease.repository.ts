import { DiseaseRecord } from '../../types/disease';
import { DiseaseUpsertInput } from '../../types/editorial';

export interface DiseaseRepository {
  list(options?: { includeDrafts?: boolean }): Promise<DiseaseRecord[]>;
  getBySlug(slug: string): Promise<DiseaseRecord | null>;
  search(query: string): Promise<DiseaseRecord[]>;
  listByCategory(categorySlug: string): Promise<DiseaseRecord[]>;
  upsert(input: DiseaseUpsertInput): Promise<DiseaseRecord>;
}
