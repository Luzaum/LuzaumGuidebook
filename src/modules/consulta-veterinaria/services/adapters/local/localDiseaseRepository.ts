import { diseasesSeed } from '../../../data/seed/diseases.seed'
import type { DiseaseRepository } from '../../repositories/disease.repository'

export class LocalDiseaseRepository implements DiseaseRepository {
  async list() { return diseasesSeed }
  async getBySlug(slug: string) { return diseasesSeed.find((item) => item.slug === slug) || null }
  async search(query: string) {
    if (!query.trim()) return diseasesSeed
    return diseasesSeed.filter((item) => [item.title, item.synonyms.join(' '), item.tags.join(' '), item.quickSummary].join(' ').toLowerCase().includes(query.toLowerCase()))
  }
  async listByCategory(categorySlug: string) { return diseasesSeed.filter((item) => item.category === categorySlug) }
}

