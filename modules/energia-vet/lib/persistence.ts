import type { Patient, StoredCalculationReport } from '../types'

const REPORTS_STORAGE_KEY = 'vetius-energia-vet-reports-v2'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getSavedReports(): StoredCalculationReport[] {
  if (!canUseStorage()) {
    return []
  }

  try {
    const raw = window.localStorage.getItem(REPORTS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredCalculationReport[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveReport(report: StoredCalculationReport) {
  if (!canUseStorage()) {
    return
  }

  const reports = getSavedReports()
  const next = [report, ...reports.filter((item) => item.id !== report.id)].slice(0, 100)
  window.localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(next))
}

export function getSavedPatients(): Array<Partial<Patient> & { reportCount: number; lastReportAt: string }> {
  const reports = getSavedReports()
  const patientMap = new Map<string, Partial<Patient> & { reportCount: number; lastReportAt: string }>()

  for (const report of reports) {
    const patient = report.patient
    const key = [patient.name ?? 'sem-nome', patient.ownerName ?? 'sem-tutor', patient.species ?? 'sem-especie'].join('|')
    const current = patientMap.get(key)
    if (!current) {
      patientMap.set(key, {
        ...patient,
        reportCount: 1,
        lastReportAt: report.createdAt,
      })
      continue
    }

    current.reportCount += 1
    if (new Date(report.createdAt).getTime() > new Date(current.lastReportAt).getTime()) {
      current.lastReportAt = report.createdAt
      Object.assign(current, patient)
    }
  }

  return Array.from(patientMap.values()).sort(
    (left, right) => new Date(right.lastReportAt).getTime() - new Date(left.lastReportAt).getTime(),
  )
}
