import type { Patient, StoredCalculationReport } from '../types'

const REPORTS_STORAGE_KEY = 'vetius-energia-vet-reports-v4'

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

export function getPatientStorageKey(patient: Partial<Patient>) {
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

export function getSavedReports(): StoredCalculationReport[] {
  if (!canUseStorage()) return []

  try {
    const raw = window.localStorage.getItem(REPORTS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredCalculationReport[]
    return Array.isArray(parsed) ? parsed.map(normalizeReport) : []
  } catch {
    return []
  }
}

function writeReports(reports: StoredCalculationReport[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports.map(normalizeReport)))
}

export function saveReport(report: StoredCalculationReport) {
  if (!canUseStorage()) return
  const normalized = normalizeReport(report)
  const reports = getSavedReports()
  const next = [normalized, ...reports.filter((item) => item.id !== normalized.id)].slice(0, 300)
  writeReports(next)
}

export function getSavedReportById(reportId: string) {
  return getSavedReports().find((report) => report.id === reportId)
}

export function getReportsByPatientKey(patientKey: string) {
  return getSavedReports()
    .filter((report) => report.patientKey === patientKey)
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
}

export function getSavedPatients(): Array<Partial<Patient> & { patientKey: string; reportCount: number; lastReportAt: string; latestReportId: string }> {
  const reports = getSavedReports()
  const patientMap = new Map<string, Partial<Patient> & { patientKey: string; reportCount: number; lastReportAt: string; latestReportId: string }>()

  for (const report of reports) {
    const patient = report.patient
    const patientKey = report.patientKey ?? getPatientStorageKey(patient)
    const current = patientMap.get(patientKey)

    if (!current) {
      patientMap.set(patientKey, {
        ...patient,
        patientKey,
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
