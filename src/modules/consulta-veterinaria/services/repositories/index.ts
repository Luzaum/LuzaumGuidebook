import { LocalCategoryRepository } from '../adapters/local/localCategoryRepository'
import { LocalConsensoRepository } from '../adapters/local/localConsensoRepository'
import { LocalDiseaseRepository } from '../adapters/local/localDiseaseRepository'
import { LocalMedicationRepository } from '../adapters/local/localMedicationRepository'

export const diseaseRepository = new LocalDiseaseRepository()
export const consensoRepository = new LocalConsensoRepository()
export const medicationRepository = new LocalMedicationRepository()
export const categoryRepository = new LocalCategoryRepository()

export async function loadConsultaVetSnapshot() {
  const [categories, diseases, consensuses, medications] = await Promise.all([
    categoryRepository.list(),
    diseaseRepository.list(),
    consensoRepository.list(),
    medicationRepository.list(),
  ])

  return { categories, diseases, consensuses, medications }
}

