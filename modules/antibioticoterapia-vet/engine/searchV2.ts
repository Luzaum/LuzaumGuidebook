import type { AntibioticClass, DiseaseSystem } from '../types'
import { PATHOGEN_PROFILES_V2 } from '../data-v2/pathogens'
import { RESISTANCE_CONCEPTS_V2 } from '../data-v2/resistance'
import { SOURCE_REGISTRY, getSourceEntry } from '../data-v2/references'
import { listVersionedSources } from '../data-v2/sourceRegistry'
import { safeList } from '../utils/dataUtils'
import { diseaseSearchBlob } from '../utils/diseaseTreatment'

export type UnifiedSearchHit =
  | { tier: 'v2'; kind: 'pathogen'; id: string; label: string; slug: string; score: number; hint: string }
  | { tier: 'v2'; kind: 'resistance'; id: string; label: string; slug: string; score: number; hint: string }
  | { tier: 'v2'; kind: 'reference'; key: string; label: string; score: number; hint: string }
  | { tier: 'legacy'; kind: 'drug'; name: string; className: string; score: number }
  | { tier: 'legacy'; kind: 'disease'; system: string; name: string; score: number; hint: string }

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
}

function scoreTokenMatch(haystack: string, needle: string): number {
  const h = norm(haystack)
  const n = norm(needle)
  if (!n) return 0
  if (h === n) return 100
  if (h.startsWith(n)) return 75
  if (h.includes(n)) return 45
  const words = n.split(/\s+/).filter(Boolean)
  if (words.length > 1 && words.every((w) => h.includes(w))) return 55
  return 0
}

function maxScoreForFields(needle: string, fields: string[]): number {
  let m = 0
  for (const f of fields) {
    m = Math.max(m, scoreTokenMatch(f, needle))
  }
  return m
}

export function searchPathogensV2(query: string): Extract<UnifiedSearchHit, { kind: 'pathogen' }>[] {
  const q = query.trim()
  if (!q) return []
  const out: Extract<UnifiedSearchHit, { kind: 'pathogen' }>[] = []
  for (const p of Object.values(PATHOGEN_PROFILES_V2)) {
    const fields = [
      p.id,
      p.slug,
      p.label,
      p.habitatSummary,
      p.clinicalRoleSummary,
      ...p.resistanceHighlights,
      ...p.synonyms,
    ]
    const score = maxScoreForFields(q, fields)
    if (score > 0) {
      out.push({
        tier: 'v2',
        kind: 'pathogen',
        id: p.id,
        label: p.label,
        slug: p.slug,
        score,
        hint: p.clinicalRoleSummary.slice(0, 110) + (p.clinicalRoleSummary.length > 110 ? '…' : ''),
      })
    }
  }
  return out.sort((a, b) => b.score - a.score)
}

export function searchResistanceConceptsV2(query: string): Extract<UnifiedSearchHit, { kind: 'resistance' }>[] {
  const q = query.trim()
  if (!q) return []
  const out: Extract<UnifiedSearchHit, { kind: 'resistance' }>[] = []
  for (const c of Object.values(RESISTANCE_CONCEPTS_V2)) {
    const fields = [
      c.id,
      c.slug,
      c.label,
      c.definitionShort,
      ...c.synonyms,
      ...c.clinicalImplication,
    ]
    const score = maxScoreForFields(q, fields)
    if (score > 0) {
      out.push({
        tier: 'v2',
        kind: 'resistance',
        id: c.id,
        label: c.label,
        slug: c.slug,
        score,
        hint: c.definitionShort.slice(0, 120) + (c.definitionShort.length > 120 ? '…' : ''),
      })
    }
  }
  return out.sort((a, b) => b.score - a.score)
}

export function searchReferencesV2(query: string): Extract<UnifiedSearchHit, { kind: 'reference' }>[] {
  const q = query.trim()
  if (!q) return []
  const byKey = new Map<string, Extract<UnifiedSearchHit, { kind: 'reference' }>>()

  function upsertRef(key: string, label: string, score: number, hint: string) {
    const prev = byKey.get(key)
    if (!prev || score > prev.score) {
      byKey.set(key, { tier: 'v2', kind: 'reference', key, label, score, hint })
    }
  }

  for (const entry of Object.values(SOURCE_REGISTRY)) {
    const fields = [
      entry.key,
      entry.title,
      entry.description,
      entry.note ?? '',
      entry.versionedSourceId ?? '',
    ]
    const score = maxScoreForFields(q, fields)
    if (score > 0) {
      upsertRef(
        entry.key,
        entry.title,
        score,
        entry.description.slice(0, 120) + (entry.description.length > 120 ? '…' : ''),
      )
    }
  }

  const CC_REF = 'ref_registry.institutional_ccih_2024'
  for (const vs of listVersionedSources()) {
    const fields = [
      vs.sourceId,
      vs.title,
      vs.provenance,
      vs.notes,
      vs.internalStorageDesignation ?? '',
      vs.mappingsModulePath,
      vs.versionLabel,
      vs.accessPolicy,
      vs.distributionMode,
      vs.verificationMode,
    ]
    const score = maxScoreForFields(q, fields)
    if (score > 0) {
      const reg = getSourceEntry(CC_REF)
      upsertRef(
        CC_REF,
        reg?.title ?? vs.title,
        score,
        (reg?.description ?? vs.notes).slice(0, 120) + ((reg?.description ?? vs.notes).length > 120 ? '…' : ''),
      )
    }
  }

  return [...byKey.values()].sort((a, b) => b.score - a.score)
}

export function searchLegacyDrugs(query: string, abDict: AntibioticClass): Extract<UnifiedSearchHit, { kind: 'drug' }>[] {
  const q = query.trim()
  if (!q) return []
  const lower = norm(q)
  const out: Extract<UnifiedSearchHit, { kind: 'drug' }>[] = []
  for (const className of Object.keys(abDict)) {
    for (const d of safeList(abDict[className])) {
      const blob = norm(`${d.name} ${d.spectrum || ''} ${d.indications || ''}`)
      if (blob === lower) out.push({ tier: 'legacy', kind: 'drug', name: d.name, className, score: 30 })
      else if (blob.includes(lower)) out.push({ tier: 'legacy', kind: 'drug', name: d.name, className, score: 15 })
    }
  }
  const seen = new Set<string>()
  const dedup: typeof out = []
  for (const h of out.sort((a, b) => b.score - a.score)) {
    const k = `${h.name}|${h.className}`
    if (seen.has(k)) continue
    seen.add(k)
    dedup.push(h)
  }
  return dedup
}

export function searchLegacyDiseases(
  query: string,
  dzDict: DiseaseSystem,
): Extract<UnifiedSearchHit, { kind: 'disease' }>[] {
  const q = query.trim()
  if (!q) return []
  const out: Extract<UnifiedSearchHit, { kind: 'disease' }>[] = []
  for (const system of Object.keys(dzDict)) {
    for (const d of safeList(dzDict[system])) {
      const fields = [d.name, diseaseSearchBlob(d), d.pathogens, d.notes, d.duration, system]
      const score = maxScoreForFields(q, fields)
      if (score > 0) {
        const hint = (d.notes || d.pathogens).slice(0, 110) + ((d.notes || d.pathogens).length > 110 ? '…' : '')
        out.push({ tier: 'legacy', kind: 'disease', system, name: d.name, score, hint })
      }
    }
  }
  return out.sort((a, b) => b.score - a.score)
}

/** Busca unificada: conteúdos v2 (patógenos, resistência, fontes) + legado (fármacos e doenças). Sem síndromes v2. */
export function searchUnifiedClinical(query: string, abDict: AntibioticClass, dzDict: DiseaseSystem): UnifiedSearchHit[] {
  const path = searchPathogensV2(query)
  const res = searchResistanceConceptsV2(query)
  const ref = searchReferencesV2(query)
  const legDrugs = searchLegacyDrugs(query, abDict)
  const legDiseases = searchLegacyDiseases(query, dzDict)
  const leg = [...legDrugs, ...legDiseases].sort((a, b) => b.score - a.score)
  const v2 = [...path, ...res, ...ref].sort((a, b) => b.score - a.score)
  return [...v2, ...leg]
}
