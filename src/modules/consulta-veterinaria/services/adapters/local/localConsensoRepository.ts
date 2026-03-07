import { consensosSeed } from '../../../data/seed/consensos.seed'
import type { ConsensoRepository } from '../../repositories/consenso.repository'

export class LocalConsensoRepository implements ConsensoRepository {
  async list() { return consensosSeed }
  async getBySlug(slug: string) { return consensosSeed.find((item) => item.slug === slug) || null }
  async search(query: string) {
    if (!query.trim()) return consensosSeed
    return consensosSeed.filter((item) => [item.title, item.shortTitle, item.tags.join(' '), item.summary].join(' ').toLowerCase().includes(query.toLowerCase()))
  }
  async listByCategory(categorySlug: string) { return consensosSeed.filter((item) => item.category === categorySlug) }
}

