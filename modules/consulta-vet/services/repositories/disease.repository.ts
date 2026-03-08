import { DiseaseRecord } from '../../types/disease';

export interface DiseaseRepository {
  list(): Promise<DiseaseRecord[]>;
  getBySlug(slug: string): Promise<DiseaseRecord | null>;
  search(query: string): Promise<DiseaseRecord[]>;
  listByCategory(categorySlug: string): Promise<DiseaseRecord[]>;
}
