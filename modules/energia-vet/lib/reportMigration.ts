import type { ReportProvenance, StoredCalculationReport } from '../types'
import {
  buildDefaultReportProvenance,
  NUTRITION_SCHEMA_VERSION,
  NUTRITION_SCHEMA_VERSION_V4,
} from './reportVersions'

export function isV4Report(report: StoredCalculationReport): boolean {
  return !report.provenance || report.provenance.schemaVersion === NUTRITION_SCHEMA_VERSION_V4
}

export function isV5Report(report: StoredCalculationReport): boolean {
  return report.provenance?.schemaVersion === NUTRITION_SCHEMA_VERSION
}

/**
 * Copia não destrutiva de relatório v4 → v5.
 * O original v4 permanece intacto no storage legado.
 */
export function migrateReportV4ToV5(
  report: StoredCalculationReport,
  options?: { catalogReleaseId?: string; pdfTemplateVersion?: string },
): StoredCalculationReport {
  const alreadyV5 = isV5Report(report)
  if (alreadyV5) {
    return report
  }

  const provenance: ReportProvenance = {
    ...buildDefaultReportProvenance(report.id),
    sourceReportId: report.id,
    migratedAt: new Date().toISOString(),
    ...(options?.catalogReleaseId ? { catalogReleaseId: options.catalogReleaseId } : {}),
    ...(options?.pdfTemplateVersion ? { pdfTemplateVersion: options.pdfTemplateVersion } : {}),
  }

  return {
    ...report,
    provenance,
  }
}

/** Idempotente: executar múltiplas vezes não duplica metadados. */
export function ensureReportProvenance(report: StoredCalculationReport): StoredCalculationReport {
  if (report.provenance?.schemaVersion === NUTRITION_SCHEMA_VERSION) {
    return report
  }
  return migrateReportV4ToV5(report)
}

export function mergeReportsPreferV5(
  v4Reports: StoredCalculationReport[],
  v5Reports: StoredCalculationReport[],
): StoredCalculationReport[] {
  const byId = new Map<string, StoredCalculationReport>()

  for (const report of v4Reports) {
    byId.set(report.id, report)
  }

  for (const report of v5Reports) {
    byId.set(report.id, report)
  }

  return Array.from(byId.values()).sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  )
}
