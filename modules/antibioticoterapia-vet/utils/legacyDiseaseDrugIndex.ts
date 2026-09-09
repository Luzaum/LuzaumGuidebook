import type { Disease, DiseaseSystem } from '../types'
import { canonicalDrugName } from './textUtils'
import { safeList } from './dataUtils'
import { collectDrugNamesFromDisease } from './diseaseTreatment'

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
      for (const raw of collectDrugNamesFromDisease(d)) {
        const rawStr = String(raw).trim()
        if (!rawStr) continue

        // 1) Sempre indexa o nome completo canônico (ex.: "Amoxicilina + Clavulanato", "Piperacilina + Tazobactam (IV)")
        const fullKey = canonicalDrugName(rawStr)
        if (fullKey) {
          const list = map.get(fullKey) ?? []
          list.push({ system, name: d.name })
          map.set(fullKey, list)
        }

        // 2) Se for uma combinação de drogas distintas em texto legado, indexa também os tokens
        for (const token of tokenizeDrugLine(rawStr)) {
          const key = canonicalDrugName(token)
          if (!key || key === fullKey) continue
          // Não fragmenta compostos fixos conhecidos em componentes isolados que descaracterizam o espectro
          if (fullKey.includes(' + ') && !token.includes(' + ')) {
            continue
          }
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
