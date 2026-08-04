import { createHash } from 'node:crypto'
import { toCanonicalSnapshotJson } from './canonicalSnapshot'
import type { NutritionClinicalRecord } from '../../types'

export function computeSnapshotChecksum(snapshot: NutritionClinicalRecord): string {
  const canonical = toCanonicalSnapshotJson(snapshot)
  return createHash('sha256').update(canonical, 'utf8').digest('hex')
}

export function verifySnapshotChecksum(snapshot: NutritionClinicalRecord, checksum: string): boolean {
  return computeSnapshotChecksum(snapshot) === checksum
}
