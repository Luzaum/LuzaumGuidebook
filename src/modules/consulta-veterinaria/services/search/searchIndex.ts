import type { ConsensusRecord } from '../../types/consenso'
import type { DiseaseRecord } from '../../types/disease'
import type { MedicationRecord } from '../../types/medication'
import type { GlobalSearchResults, SearchResult } from '../../types/search'
import { stripHtml, truncateText } from '../../utils/text'
import { rankTextMatch, type RankedField } from './ranking'

function buildExcerpt(fields: RankedField[], matchedFields: string[]): string {
  const field = fields.find((item) => matchedFields.includes(item.name)) || fields[0]
  return truncateText(field.value, 160)
}

function sortByScore<T>(results: Array<SearchResult<T>>): Array<SearchResult<T>> {
  return [...results].sort((a, b) => b.score - a.score)
}

export function searchGlobalContent({
  query,
  diseases,
  consensuses,
  medications,
}: {
  query: string
  diseases: DiseaseRecord[]
  consensuses: ConsensusRecord[]
  medications: MedicationRecord[]
}): GlobalSearchResults {
  const diseaseResults = diseases
    .map((record) => {
      const fields: RankedField[] = [
        { name: 'title', value: record.title, weight: 5 },
        { name: 'synonyms', value: record.synonyms.join(' '), weight: 4 },
        { name: 'category', value: `${record.category} ${record.subcategory || ''}`, weight: 2 },
        { name: 'tags', value: record.tags.join(' '), weight: 3 },
        { name: 'summary', value: `${record.quickSummary} ${record.thirtySecondView.join(' ')}`, weight: 4 },
        { name: 'references', value: record.references.map((item) => item.citationText).join(' '), weight: 1 },
        { name: 'content', value: `${record.introduction.description} ${record.diagnosticApproach.overview || ''} ${record.treatment.overview || ''}`, weight: 2 },
      ]
      const { score, matchedFields } = rankTextMatch(query, fields)
      return score > 0
        ? {
            entityType: 'disease' as const,
            entity: record,
            score,
            matches: [{ field: matchedFields[0] || 'title', excerpt: buildExcerpt(fields, matchedFields) }],
          }
        : null
    })
    .filter(Boolean) as Array<SearchResult<DiseaseRecord>>

  const consensusResults = consensuses
    .map((record) => {
      const fields: RankedField[] = [
        { name: 'title', value: record.title, weight: 5 },
        { name: 'shortTitle', value: record.shortTitle, weight: 4 },
        { name: 'category', value: `${record.category} ${record.subcategory || ''}`, weight: 2 },
        { name: 'source', value: record.sourceOrganization, weight: 2 },
        { name: 'tags', value: record.tags.join(' '), weight: 3 },
        { name: 'summary', value: `${record.summary} ${stripHtml(record.articleSummaryRichText)}`, weight: 3 },
      ]
      const { score, matchedFields } = rankTextMatch(query, fields)
      return score > 0
        ? {
            entityType: 'consensus' as const,
            entity: record,
            score,
            matches: [{ field: matchedFields[0] || 'title', excerpt: buildExcerpt(fields, matchedFields) }],
          }
        : null
    })
    .filter(Boolean) as Array<SearchResult<ConsensusRecord>>

  const medicationResults = medications
    .map((record) => {
      const fields: RankedField[] = [
        { name: 'title', value: record.title, weight: 5 },
        { name: 'activeIngredient', value: record.activeIngredient, weight: 5 },
        { name: 'tradeNames', value: record.tradeNames.join(' '), weight: 4 },
        { name: 'class', value: record.pharmacologicClass, weight: 2 },
        { name: 'tags', value: record.tags.join(' '), weight: 3 },
        { name: 'indications', value: record.indications.join(' '), weight: 2 },
      ]
      const { score, matchedFields } = rankTextMatch(query, fields)
      return score > 0
        ? {
            entityType: 'medication' as const,
            entity: record,
            score,
            matches: [{ field: matchedFields[0] || 'title', excerpt: buildExcerpt(fields, matchedFields) }],
          }
        : null
    })
    .filter(Boolean) as Array<SearchResult<MedicationRecord>>

  return {
    diseases: sortByScore(diseaseResults),
    consensuses: sortByScore(consensusResults),
    medications: sortByScore(medicationResults),
  }
}

