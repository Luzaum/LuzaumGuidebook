import type { NutritionClinicalRecord } from '../../types'

const TRANSIENT_KEYS = new Set(['lastSyncError', 'syncState'])

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys)
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const sorted: Record<string, unknown> = {}
    for (const key of Object.keys(record).sort()) {
      if (TRANSIENT_KEYS.has(key)) continue
      sorted[key] = sortKeys(record[key])
    }
    return sorted
  }
  return value
}

export function toCanonicalSnapshotJson(snapshot: NutritionClinicalRecord): string {
  return JSON.stringify(sortKeys(snapshot))
}

export function parseCanonicalSnapshot(json: string): NutritionClinicalRecord {
  return JSON.parse(json) as NutritionClinicalRecord
}
