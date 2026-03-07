import { medicationsSeed } from '../../../data/seed/medications.seed'
import type { MedicationRepository } from '../../repositories/medication.repository'

export class LocalMedicationRepository implements MedicationRepository {
  async list() { return medicationsSeed }
  async getBySlug(slug: string) { return medicationsSeed.find((item) => item.slug === slug) || null }
  async search(query: string) {
    if (!query.trim()) return medicationsSeed
    return medicationsSeed.filter((item) => [item.title, item.activeIngredient, item.tradeNames.join(' '), item.tags.join(' ')].join(' ').toLowerCase().includes(query.toLowerCase()))
  }
  async listByCategory(categorySlug: string) { return medicationsSeed.filter((item) => item.category === categorySlug) }
}

