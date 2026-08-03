import type { ReportProvenance } from '../types'

/** Versões dos motores e datasets — registradas em relatórios V5. */

export const NUTRITION_SCHEMA_VERSION = 5 as const
export const NUTRITION_SCHEMA_VERSION_V4 = 4 as const

export const CALCULATION_ENGINE_VERSION = 'vetius-energia-vet-calc-v1'
export const ENERGY_RULE_SET_VERSION = 'fediaf-2025-v1'
export const CLINICAL_RULE_SET_VERSION = 'nutrition-clinical-v2.0.0'
export const CATALOG_RELEASE_ID_LEGACY = 'genutri-bundle-v1'
export const PDF_TEMPLATE_VERSION_V4 = 'reportDocument-v4'
export const PDF_TEMPLATE_VERSION_V5 = 'nutrition-pdf-v5-draft'

export const REPORTS_STORAGE_KEY_V4 = 'vetius-energia-vet-reports-v4'
export const REPORTS_STORAGE_KEY_V5 = 'vetius-energia-vet-reports-v5'

export function buildDefaultReportProvenance(sourceReportId?: string): ReportProvenance {
  return {
    schemaVersion: NUTRITION_SCHEMA_VERSION,
    calculationEngineVersion: CALCULATION_ENGINE_VERSION,
    energyRuleSetVersion: ENERGY_RULE_SET_VERSION,
    clinicalRuleSetVersion: CLINICAL_RULE_SET_VERSION,
    catalogReleaseId: CATALOG_RELEASE_ID_LEGACY,
    pdfTemplateVersion: PDF_TEMPLATE_VERSION_V5,
    createdAt: new Date().toISOString(),
    sourceReportId,
  }
}

export function inferProvenanceFromReport(report: {
  provenance?: ReportProvenance
  createdAt: string
  id: string
}): ReportProvenance {
  if (report.provenance?.schemaVersion) {
    return report.provenance
  }
  return {
    schemaVersion: NUTRITION_SCHEMA_VERSION_V4,
    calculationEngineVersion: CALCULATION_ENGINE_VERSION,
    energyRuleSetVersion: ENERGY_RULE_SET_VERSION,
    clinicalRuleSetVersion: CLINICAL_RULE_SET_VERSION,
    catalogReleaseId: CATALOG_RELEASE_ID_LEGACY,
    pdfTemplateVersion: PDF_TEMPLATE_VERSION_V4,
    createdAt: report.createdAt,
    sourceReportId: report.id,
  }
}
