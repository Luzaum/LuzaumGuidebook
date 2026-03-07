import type { ContentFlag } from './common'
import type { ReferenceItem } from './reference'

export type ConsensusSpecies = 'dog' | 'cat' | 'both'

export type ConsensusRecord = ContentFlag & {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: string
  subcategory?: string
  species: ConsensusSpecies
  sourceOrganization: string
  year: number
  authors: string[]
  tags: string[]
  summary: string
  articleSummaryRichText: string
  adminNotesRichText: string
  pdfUrl: string
  pdfFileName: string
  thumbnailUrl?: string
  relatedDiseaseSlugs: string[]
  relatedMedicationSlugs: string[]
  references: ReferenceItem[]
  isDraft: boolean
  createdAt: string
  updatedAt: string
}

