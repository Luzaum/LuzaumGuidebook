/**
 * Adaptador Supabase para catálogo V2.
 * Fallback automático para GENUTRI legado quando indisponível ou flag desligada.
 */

import type {
  ClinicalPatientContext,
  FoodCatalogRepository,
  FoodDetails,
  FoodSearchInput,
  FoodSearchResult,
  FoodVersion,
  TherapeuticFoodAssessment,
} from './types'
import { legacyGenutriCatalogAdapter } from './legacyGenutriAdapter'

export class SupabaseCatalogAdapter implements FoodCatalogRepository {
  constructor(private readonly fallback: FoodCatalogRepository = legacyGenutriCatalogAdapter) {}

  async search(input: FoodSearchInput): Promise<FoodSearchResult> {
    // Tabelas nutrition_foods ainda não populadas — delega ao legado.
    return this.fallback.search(input)
  }

  async getById(id: string): Promise<FoodDetails | null> {
    return this.fallback.getById(id)
  }

  async getVersions(id: string): Promise<FoodVersion[]> {
    return this.fallback.getVersions(id)
  }

  async getTherapeuticAssessment(
    foodId: string,
    patientContext: ClinicalPatientContext,
  ): Promise<TherapeuticFoodAssessment> {
    return this.fallback.getTherapeuticAssessment(foodId, patientContext)
  }
}

export const supabaseCatalogAdapter = new SupabaseCatalogAdapter()
