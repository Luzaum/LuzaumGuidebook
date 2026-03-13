import type { DiseaseRepository } from './repositories/disease.repository';
import { localDiseaseRepository } from './adapters/local/localDiseaseRepository';
import { supabaseDiseaseRepository } from './adapters/supabase/supabaseDiseaseRepository';
import { hasSupabaseEnv } from './adapters/supabase/editorialSupabaseUtils';

export function getDiseaseRepository(): DiseaseRepository {
  return hasSupabaseEnv() ? supabaseDiseaseRepository : localDiseaseRepository;
}
