import type { CategoryStats } from '../types/category'
import type { ConsensusRecord } from '../types/consenso'
import type { DiseaseRecord } from '../types/disease'
import type { MedicationRecord } from '../types/medication'

export function buildCategoryStats({
  categorySlug,
  diseases,
  consensuses,
  medications,
}: {
  categorySlug: string
  diseases: DiseaseRecord[]
  consensuses: ConsensusRecord[]
  medications: MedicationRecord[]
}): CategoryStats {
  return {
    diseases: diseases.filter((item) => item.category === categorySlug).length,
    consensuses: consensuses.filter((item) => item.category === categorySlug).length,
    medications: medications.filter((item) => item.category === categorySlug).length,
  }
}

export function buildFavoriteIdSet<T extends string>(records: Array<{ entityId: T }>): Set<T> {
  return new Set(records.map((item) => item.entityId))
}

