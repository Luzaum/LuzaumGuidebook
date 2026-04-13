import type { AntibioticClass } from '../types'
import { ANTIBIOTIC_SHEETS_V2 } from '../data-v2/antibiotics'
import { SYNDROME_PROFILES_V2 } from '../data-v2/syndromes'
import type { SyndromeId } from '../model/ids'
import { SYNDROME_IDS } from '../model/ids'
import { PATHOGEN_PROFILES_V2 } from '../data-v2/pathogens'
import { RESISTANCE_CONCEPTS_V2 } from '../data-v2/resistance'
import { HOSPITAL_STEWARDSHIP_CARDS_V2 } from '../data-v2/hospitalAlerts'
import { SOURCE_REGISTRY, getSourceEntry } from '../data-v2/references'
import { listVersionedSources } from '../data-v2/sourceRegistry'
import { safeList } from '../utils/dataUtils'

export type UnifiedSearchHit =
  | { tier: 'v2'; kind: 'syndrome'; id: SyndromeId; label: string; slug: string; score: number; hint: string }
  | { tier: 'v2'; kind: 'molecule'; id: string; label: string; slug: string; score: number; hint: string }
  | { tier: 'v2'; kind: 'pathogen'; id: string; label: string; slug: string; score: number; hint: string }
  | { tier: 'v2'; kind: 'resistance'; id: string; label: string; slug: string; score: number; hint: string }
  | { tier: 'v2'; kind: 'hospital'; id: string; label: string; slug: string; score: number; hint: string }
  | { tier: 'v2'; kind: 'reference'; key: string; label: string; score: number; hint: string }
  | { tier: 'legacy'; kind: 'drug'; name: string; className: string; score: number }

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

export function searchSyndromesV2(query: string): Extract<UnifiedSearchHit, { kind: 'syndrome' }>[] {
  const q = query.trim()
  if (!q) return []
  const out: Extract<UnifiedSearchHit, { kind: 'syndrome' }>[] = []
  for (const id of SYNDROME_IDS) {
    const p = SYNDROME_PROFILES_V2[id]
    if (!p) continue
    const fields = [
      id,
      p.slug,
      p.label,
      p.summary,
      p.likelyMicrobiologySummary,
      ...p.synonyms,
    ]
    const score = maxScoreForFields(q, fields)
    if (score > 0) {
      out.push({
        tier: 'v2',
        kind: 'syndrome',
        id,
        label: p.label,
        slug: p.slug,
        score,
        hint: p.summary.slice(0, 120) + (p.summary.length > 120 ? '…' : ''),
      })
    }
  }
  return out.sort((a, b) => b.score - a.score)
}

export function searchMoleculesV2(query: string): Extract<UnifiedSearchHit, { kind: 'molecule' }>[] {
  const q = query.trim()
  if (!q) return []
  const out: Extract<UnifiedSearchHit, { kind: 'molecule' }>[] = []
  for (const sheet of Object.values(ANTIBIOTIC_SHEETS_V2)) {
    const fields = [
      sheet.id,
      sheet.slug,
      sheet.displayName,
      sheet.classLabel,
      sheet.subclassLabel,
      sheet.spectrumSummary,
      sheet.mechanismSummary,
      ...sheet.synonyms,
      ...sheet.usesInApp,
    ]
    const score = maxScoreForFields(q, fields)
    if (score > 0) {
      out.push({
        tier: 'v2',
        kind: 'molecule',
        id: sheet.id,
        label: sheet.displayName,
        slug: sheet.slug,
        score,
        hint: sheet.spectrumSummary.slice(0, 100) + (sheet.spectrumSummary.length > 100 ? '…' : ''),
      })
    }
  }
  return out.sort((a, b) => b.score - a.score)
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

export function searchHospitalCardsV2(query: string): Extract<UnifiedSearchHit, { kind: 'hospital' }>[] {
  const q = query.trim()
  if (!q) return []
  const out: Extract<UnifiedSearchHit, { kind: 'hospital' }>[] = []
  for (const c of Object.values(HOSPITAL_STEWARDSHIP_CARDS_V2)) {
    const fields = [
      c.id,
      c.slug,
      c.title,
      c.lead,
      ...c.bullets,
      ...c.whenToThink,
      c.sourceKey,
    ]
    const score = maxScoreForFields(q, fields)
    if (score > 0) {
      out.push({
        tier: 'v2',
        kind: 'hospital',
        id: c.id,
        label: c.title,
        slug: c.slug,
        score,
        hint: c.lead.slice(0, 120) + (c.lead.length > 120 ? '…' : ''),
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

/** Busca unificada: todos os hits v2 ordenados por score; depois legado. */
export function searchUnifiedClinical(query: string, abDict: AntibioticClass): UnifiedSearchHit[] {
  const syn = searchSyndromesV2(query)
  const mol = searchMoleculesV2(query)
  const path = searchPathogensV2(query)
  const res = searchResistanceConceptsV2(query)
  const hosp = searchHospitalCardsV2(query)
  const ref = searchReferencesV2(query)
  const leg = searchLegacyDrugs(query, abDict)
  const v2 = [...syn, ...mol, ...path, ...res, ...hosp, ...ref].sort((a, b) => b.score - a.score)
  return [...v2, ...leg]
}
