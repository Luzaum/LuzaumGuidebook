import type { Disease, DiseaseSystem } from '../types'
import { canonicalDrugName } from './textUtils'
import { safeList } from './dataUtils'

/** Extrai nomes de ATB a partir de uma linha do catálogo de doenças (combinações comuns). */
export function tokenizeDrugLine(line: string): string[] {
  return line
    .split(/\s*\+\s*|\s*\/\s*|\s*,\s*|\s+e\s+|\s+ou\s+|\s+seguido de\s+/i)
    .map((p) => p.trim())
    .filter(Boolean)
}

export type DiseaseRef = { system: string; name: string }

function dedupeRefs(refs: DiseaseRef[]): DiseaseRef[] {
  const seen = new Set<string>()
  const out: DiseaseRef[] = []
  for (const r of refs) {
    const k = `${r.system}::${r.name}`
    if (seen.has(k)) continue
    seen.add(k)
    out.push(r)
  }
  return out
}

/**
 * Índice canônico (nome de ATB do catálogo) → doenças que citam o fármaco em 1ª linha ou alternativas.
 */
export function buildDrugToDiseasesIndex(dzDict: DiseaseSystem): Map<string, DiseaseRef[]> {
  const map = new Map<string, DiseaseRef[]>()
  for (const [system, diseases] of Object.entries(dzDict)) {
    for (const d of safeList(diseases) as Disease[]) {
      const fields = [...safeList(d.first_line), ...safeList(d.alternatives)]
      for (const raw of fields) {
        for (const token of tokenizeDrugLine(String(raw))) {
          const key = canonicalDrugName(token)
          if (!key) continue
          const list = map.get(key) ?? []
          list.push({ system, name: d.name })
          map.set(key, list)
        }
      }
    }
  }
  for (const [k, v] of map.entries()) {
    map.set(k, dedupeRefs(v))
  }
  return map
}

export function lookupDiseasesForDrug(drugName: string, index: Map<string, DiseaseRef[]>): DiseaseRef[] {
  const key = canonicalDrugName(drugName)
  return index.get(key) ?? []
}
