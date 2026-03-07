import type { EntityType } from './common'

export type SearchResultMatch = {
  field: string
  excerpt: string
}

export type SearchResult<T> = {
  entityType: EntityType
  entity: T
  score: number
  matches: SearchResultMatch[]
}

export type GlobalSearchResults = {
  diseases: Array<SearchResult<any>>
  consensuses: Array<SearchResult<any>>
  medications: Array<SearchResult<any>>
}
