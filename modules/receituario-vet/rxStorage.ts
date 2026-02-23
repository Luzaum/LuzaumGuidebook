import { createDefaultPrescriptionState } from './rxDefaults'
import { PrescriptionState } from './rxTypes'

const DRAFT_KEY = 'receituario-vet:draft:v1'
const SAVED_DRAFTS_KEY = 'receituario-vet:drafts:v1'
const ACCOUNT_KEY = 'vetius:account:id'
export const MAX_SAVED_RX_DRAFTS = 20

interface StoredDraftEntry {
  id: string
  ownerKey: string
  patientName: string
  tutorName: string
  createdAt: string
  updatedAt: string
  state: PrescriptionState
}

export interface SavedRxDraftSummary {
  id: string
  patientName: string
  tutorName: string
  createdAt: string
  savedAt: string
}

function nowIso() {
  return new Date().toISOString()
}

function readOwnerKey(): string {
  try {
    const raw = (localStorage.getItem(ACCOUNT_KEY) || '').trim()
    if (raw) return raw
  } catch {
    // no-op
  }
  return 'local-account'
}

export function getSavedRxDraftOwnerKey() {
  return readOwnerKey()
}

function normalizeState(raw: Partial<PrescriptionState> | null | undefined): PrescriptionState {
  const base = createDefaultPrescriptionState()
  if (!raw) return base

  const normalizeLoose = (value: string) =>
    (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

  const parsedSex = normalizeLoose(String(raw.patient?.sex || ''))
  const normalizedSex =
    parsedSex === 'f' || parsedSex === 'fn' || parsedSex === 'femea'
      ? 'Fêmea'
      : parsedSex === 'm' || parsedSex === 'mn' || parsedSex === 'macho'
        ? 'Macho'
        : 'Sem dados'

  const parsedReproductive = normalizeLoose(String(raw.patient?.reproductiveStatus || ''))
  const normalizedReproductive =
    parsedReproductive === 'fertil'
      ? 'Fértil'
      : parsedReproductive === 'castrado'
        ? 'Castrado'
        : 'Sem dados'
  return {
    ...base,
    ...raw,
    prescriber: {
      ...base.prescriber,
      ...(raw.prescriber || {}),
    },
    patient: {
      ...base.patient,
      ...(raw.patient || {}),
      sex: normalizedSex,
      reproductiveStatus: normalizedReproductive,
    },
    tutor: {
      ...base.tutor,
      ...(raw.tutor || {}),
    },
    items: Array.isArray(raw.items) ? raw.items : base.items,
    recommendations: {
      ...base.recommendations,
      ...(raw.recommendations || {}),
      bullets: Array.isArray(raw.recommendations?.bullets) ? raw.recommendations.bullets : base.recommendations.bullets,
      exams: Array.isArray(raw.recommendations?.exams) ? raw.recommendations.exams : base.recommendations.exams,
      customExams: Array.isArray(raw.recommendations?.customExams)
        ? raw.recommendations.customExams
        : base.recommendations.customExams,
      examReasons: Array.isArray(raw.recommendations?.examReasons)
        ? raw.recommendations.examReasons
        : base.recommendations.examReasons,
      specialControlPharmacy:
        raw.recommendations?.specialControlPharmacy === 'humana' ||
        raw.recommendations?.specialControlPharmacy === 'manipulacao' ||
        raw.recommendations?.specialControlPharmacy === 'veterinária'
          ? raw.recommendations.specialControlPharmacy
          : base.recommendations.specialControlPharmacy,
      standardTemplateId: raw.recommendations?.standardTemplateId || base.recommendations.standardTemplateId,
      specialControlTemplateId:
        raw.recommendations?.specialControlTemplateId || base.recommendations.specialControlTemplateId,
    },
  }
}

function loadSavedDraftEntries(): StoredDraftEntry[] {
  try {
    const raw = localStorage.getItem(SAVED_DRAFTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((entry) => {
        if (!entry || typeof entry !== 'object') return null
        const candidate = entry as Partial<StoredDraftEntry>
        if (!candidate.id || typeof candidate.id !== 'string') return null
        const normalizedState = normalizeState(candidate.state as Partial<PrescriptionState>)
        return {
          id: candidate.id,
          ownerKey: (candidate.ownerKey || '').trim() || 'local-account',
          patientName: (candidate.patientName || normalizedState.patient.name || '').trim(),
          tutorName: (candidate.tutorName || normalizedState.tutor.name || '').trim(),
          createdAt: candidate.createdAt || normalizedState.updatedAt || nowIso(),
          updatedAt: candidate.updatedAt || normalizedState.updatedAt || nowIso(),
          state: normalizedState,
        } as StoredDraftEntry
      })
      .filter((entry): entry is StoredDraftEntry => !!entry)
  } catch {
    return []
  }
}

function saveSavedDraftEntries(entries: StoredDraftEntry[]) {
  localStorage.setItem(SAVED_DRAFTS_KEY, JSON.stringify(entries))
}

function upsertSavedDraft(state: PrescriptionState, ownerKey = readOwnerKey()) {
  const safeState = normalizeState(state)
  const all = loadSavedDraftEntries()
  const existing = all.find((entry) => entry.ownerKey === ownerKey && entry.id === safeState.id)
  const updatedAt = nowIso()

  const nextEntry: StoredDraftEntry = {
    id: safeState.id,
    ownerKey,
    patientName: (safeState.patient.name || '').trim(),
    tutorName: (safeState.tutor.name || '').trim(),
    createdAt: existing?.createdAt || safeState.updatedAt || updatedAt,
    updatedAt,
    state: {
      ...safeState,
      updatedAt,
    },
  }

  const withoutCurrent = all.filter((entry) => !(entry.ownerKey === ownerKey && entry.id === safeState.id))
  const merged = [nextEntry, ...withoutCurrent]

  const ownerDrafts = merged
    .filter((entry) => entry.ownerKey === ownerKey)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, MAX_SAVED_RX_DRAFTS)

  const keepOwnerIdSet = new Set(ownerDrafts.map((entry) => `${entry.ownerKey}:${entry.id}`))
  const finalList = [...merged.filter((entry) => entry.ownerKey !== ownerKey), ...ownerDrafts].filter((entry) => {
    if (entry.ownerKey !== ownerKey) return true
    return keepOwnerIdSet.has(`${entry.ownerKey}:${entry.id}`)
  })

  finalList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  saveSavedDraftEntries(finalList)
}

export function loadRxDraft(): PrescriptionState | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PrescriptionState>
    return normalizeState(parsed)
  } catch {
    return null
  }
}

export function loadRxDraftById(draftId: string, ownerKey = readOwnerKey()): PrescriptionState | null {
  const id = (draftId || '').trim()
  if (!id) return null
  const all = loadSavedDraftEntries()
  const scoped = all.find((entry) => entry.ownerKey === ownerKey && entry.id === id)
  if (scoped) return normalizeState(scoped.state)
  const fallback = all.find((entry) => entry.id === id)
  return fallback ? normalizeState(fallback.state) : null
}

export function listSavedRxDrafts(ownerKey = readOwnerKey()): SavedRxDraftSummary[] {
  return loadSavedDraftEntries()
    .filter((entry) => entry.ownerKey === ownerKey)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .map((entry) => ({
      id: entry.id,
      patientName: entry.patientName || '-',
      tutorName: entry.tutorName || '-',
      createdAt: entry.createdAt,
      savedAt: entry.updatedAt,
    }))
}

export function removeSavedRxDraft(draftId: string, ownerKey = readOwnerKey()) {
  const id = (draftId || '').trim()
  if (!id) return
  const all = loadSavedDraftEntries()
  const next = all.filter((entry) => !(entry.ownerKey === ownerKey && entry.id === id))
  saveSavedDraftEntries(next)
}

export function saveRxDraft(
  state: PrescriptionState,
  options?: { persistInSavedList?: boolean; ownerKey?: string }
) {
  const safeState = normalizeState(state)
  localStorage.setItem(DRAFT_KEY, JSON.stringify(safeState))
  if (options?.persistInSavedList === false) return
  upsertSavedDraft(safeState, options?.ownerKey)
}

export function clearRxDraft() {
  localStorage.removeItem(DRAFT_KEY)
}


