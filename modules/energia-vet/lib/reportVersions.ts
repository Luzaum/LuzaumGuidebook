import type { ReportProvenance } from '../types'
import { BOOK_ENERGY_RULE_SET_VERSION } from './bookEnergy'
import { CLINICAL_RULE_SET_V2 } from './clinical/therapeuticProfiles'
import { isCalculationEngineV3Enabled } from './nutritionCalculationBridge'
import { CALCULATION_ENGINE_VERSION as CALC_ENGINE_V3_VERSION } from './nutrition-calculations'
import { PDF_TEMPLATE_VERSION } from './pdf/pdfTheme'

/** Versões dos motores e datasets — registradas em relatórios V5. */

export const NUTRITION_SCHEMA_VERSION = 5 as const
export const NUTRITION_SCHEMA_VERSION_V4 = 4 as const

export const CALCULATION_ENGINE_VERSION = 'vetius-energia-vet-calc-v1'
export const ENERGY_RULE_SET_VERSION = BOOK_ENERGY_RULE_SET_VERSION
export const LEGACY_ENERGY_RULE_SET_VERSION = 'fediaf-2025-v1'
export const CLINICAL_RULE_SET_VERSION = CLINICAL_RULE_SET_V2
export const CATALOG_RELEASE_ID_LEGACY = 'genutri-bundle-v1'
export const PDF_TEMPLATE_VERSION_V4 = 'reportDocument-v4'
export const PDF_TEMPLATE_VERSION_V5 = PDF_TEMPLATE_VERSION

export const REPORTS_STORAGE_KEY_V4 = 'vetius-energia-vet-reports-v4'
export const REPORTS_STORAGE_KEY_V5 = 'vetius-energia-vet-reports-v5'

export function buildReportProvenanceForCurrentEngine(sourceReportId?: string): ReportProvenance {
  const v3Enabled = isCalculationEngineV3Enabled()
  return {
    schemaVersion: NUTRITION_SCHEMA_VERSION,
    calculationEngineVersion: v3Enabled ? CALC_ENGINE_V3_VERSION : CALCULATION_ENGINE_VERSION,
    energyRuleSetVersion: v3Enabled ? CALC_ENGINE_V3_VERSION : ENERGY_RULE_SET_VERSION,
    clinicalRuleSetVersion: CLINICAL_RULE_SET_VERSION,
    catalogReleaseId: CATALOG_RELEASE_ID_LEGACY,
    pdfTemplateVersion: PDF_TEMPLATE_VERSION_V5,
    createdAt: new Date().toISOString(),
    sourceReportId,
  }
}

export function buildDefaultReportProvenance(sourceReportId?: string): ReportProvenance {
  return buildReportProvenanceForCurrentEngine(sourceReportId)
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
    energyRuleSetVersion: LEGACY_ENERGY_RULE_SET_VERSION,
    clinicalRuleSetVersion: CLINICAL_RULE_SET_VERSION,
    catalogReleaseId: CATALOG_RELEASE_ID_LEGACY,
    pdfTemplateVersion: PDF_TEMPLATE_VERSION_V4,
    createdAt: report.createdAt,
    sourceReportId: report.id,
  }
}
