import type { StoredCalculationReport } from '../types'
import {
  ensureReportProvenance,
  mergeReportsPreferV5,
  migrateReportV4ToV5,
} from './reportMigration'
import {
  REPORTS_STORAGE_KEY_V4,
  REPORTS_STORAGE_KEY_V5,
} from './reportVersions'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getPatientStorageKey(patient: Partial<StoredCalculationReport['patient']>) {
  return [
    slugify(patient.name ?? 'sem-nome'),
    slugify(patient.ownerName ?? 'sem-tutor'),
    patient.species ?? 'sem-especie',
  ].join('__')
}

function normalizeReport(report: StoredCalculationReport): StoredCalculationReport {
  return {
    ...report,
    patientKey: report.patientKey ?? getPatientStorageKey(report.patient),
  }
}

function readReportsFromKey(key: string): StoredCalculationReport[] {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredCalculationReport[]
    return Array.isArray(parsed) ? parsed.map(normalizeReport) : []
  } catch {
    return []
  }
}

function writeReportsToKey(key: string, reports: StoredCalculationReport[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(key, JSON.stringify(reports.map(normalizeReport)))
}

/** Relatórios V4 legados — nunca sobrescrever chave. */
export function getSavedReportsV4(): StoredCalculationReport[] {
  return readReportsFromKey(REPORTS_STORAGE_KEY_V4)
}

/** Relatórios V5 com proveniência versionada. */
export function getSavedReportsV5(): StoredCalculationReport[] {
  return readReportsFromKey(REPORTS_STORAGE_KEY_V5)
}

/** Leitura dupla: V5 tem precedência por id; V4 preenche lacunas. */
export function getSavedReports(): StoredCalculationReport[] {
  return mergeReportsPreferV5(getSavedReportsV4(), getSavedReportsV5())
}

export function saveReport(report: StoredCalculationReport, options?: { preferV5?: boolean }) {
  if (!canUseStorage()) return

  const normalized = normalizeReport(report)
  const useV5 = options?.preferV5 ?? Boolean(normalized.provenance?.schemaVersion === 5)

  if (useV5) {
    const withProvenance = ensureReportProvenance(normalized)
    const reports = getSavedReportsV5()
    const next = [withProvenance, ...reports.filter((item) => item.id !== withProvenance.id)].slice(0, 300)
    writeReportsToKey(REPORTS_STORAGE_KEY_V5, next)
    return
  }

  const reports = getSavedReportsV4()
  const next = [normalized, ...reports.filter((item) => item.id !== normalized.id)].slice(0, 300)
  writeReportsToKey(REPORTS_STORAGE_KEY_V4, next)
}

/** Copia idempotente V4 → V5 sem remover o original. */
export function migrateSavedReportToV5(reportId: string): StoredCalculationReport | null {
  const v4 = getSavedReportsV4().find((report) => report.id === reportId)
  if (!v4) return null

  const migrated = migrateReportV4ToV5(v4)
  const existing = getSavedReportsV5().find((report) => report.id === reportId)
  if (existing?.provenance?.schemaVersion === 5) {
    return existing
  }

  saveReport(migrated, { preferV5: true })
  return migrated
}

export function getSavedReportById(reportId: string) {
  return getSavedReports().find((report) => report.id === reportId)
}

export function getReportsByPatientKey(patientKey: string) {
  return getSavedReports()
    .filter((report) => report.patientKey === patientKey)
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
}

export function getSavedPatients(): Array<
  Partial<StoredCalculationReport['patient']> & {
    patientKey: string
    reportCount: number
    lastReportAt: string
    latestReportId: string
  }
> {
  const reports = getSavedReports()
  const patientMap = new Map<
    string,
    Partial<StoredCalculationReport['patient']> & {
      patientKey: string
      reportCount: number
      lastReportAt: string
      latestReportId: string
    }
  >()

  for (const report of reports) {
    const patient = report.patient
    const key = report.patientKey ?? getPatientStorageKey(patient)
    const current = patientMap.get(key)

    if (!current) {
      patientMap.set(key, {
        ...patient,
        patientKey: key,
        reportCount: 1,
        lastReportAt: report.createdAt,
        latestReportId: report.id,
      })
      continue
    }

    current.reportCount += 1
    if (new Date(report.createdAt).getTime() > new Date(current.lastReportAt).getTime()) {
      current.lastReportAt = report.createdAt
      current.latestReportId = report.id
      Object.assign(current, patient)
    }
  }

  return Array.from(patientMap.values()).sort(
    (left, right) => new Date(right.lastReportAt).getTime() - new Date(left.lastReportAt).getTime(),
  )
}

/** Compatibilidade: exportar chave V4 para código legado. */
export const REPORTS_STORAGE_KEY = REPORTS_STORAGE_KEY_V4
