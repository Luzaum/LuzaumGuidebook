import type { MedicationRepository } from './repositories/medication.repository';
import { localMedicationRepository } from './adapters/local/localMedicationRepository';
import { supabaseMedicationRepository } from './adapters/supabase/supabaseMedicationRepository';
import { hasSupabaseEnv } from './adapters/supabase/editorialSupabaseUtils';

export function getMedicationRepository(): MedicationRepository {
  return hasSupabaseEnv() ? supabaseMedicationRepository : localMedicationRepository;
}
