// src/lib/drug-sources/reference.ts
import { SOURCE_CATALOG, type SourceId } from './catalog'

export type DrugReference = {
    source_id: SourceId
    drug?: string
    section?: string
    chapter?: string
    pages: string // "p. 123-127" ou "p. 88"
    quote_hint?: string // <= 1 linha, sem copiar texto longo
}

export function ref(input: DrugReference): DrugReference {
    return input
}

export function expandSourceMeta(r: DrugReference) {
    const meta = SOURCE_CATALOG[r.source_id]
    return {
        ...r,
        source: meta.title,
        edition: meta.edition,
        year: meta.year,
    }
}
