import { jsPDF } from 'jspdf'
import type { CalculationSnapshotV2 } from '../lib/calculationPersistenceV2'
import { addPdfFooters, formatPdfDate, slugifyPdfSegment } from '../lib/pdf/pdfLayout'
import type { StoredCalculationReport } from '../types'
import { buildNutritionPdfDocumentModel } from './reportModelBuilder'
import { buildTechnicalReportPdf } from './technicalReportBuilder'
import { buildTutorPlanPdf } from './tutorPlanBuilder'
import type { NutritionPdfMode } from './types'

export interface BuildNutritionPdfV5Options {
  snapshot?: CalculationSnapshotV2 | null
  clinicName?: string
  veterinarianName?: string
}

export function buildNutritionPdfV5Doc(
  report: StoredCalculationReport,
  mode: NutritionPdfMode,
  options: BuildNutritionPdfV5Options = {},
): jsPDF {
  const model = buildNutritionPdfDocumentModel(
    {
      report,
      mode,
      clinicName: options.clinicName,
      veterinarianName: options.veterinarianName,
    },
    options.snapshot,
  )

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const patientName = report.patient.name?.trim() || 'Paciente'

  doc.setProperties({
    title: mode === 'tutor_plan' ? `Plano nutricional — ${patientName}` : `Relatório técnico — ${patientName}`,
    subject: mode === 'tutor_plan' ? 'Plano nutricional para o tutor' : 'Relatório técnico veterinário',
    author: options.veterinarianName ?? 'Védico(a) responsável',
    creator: 'Vetius NutriçãoVET',
    keywords: 'nutrição veterinária, prescrição, dieta',
  })

  if (mode === 'tutor_plan') {
    buildTutorPlanPdf(doc, model)
  } else {
    buildTechnicalReportPdf(doc, model)
  }

  const footerLabel =
    mode === 'tutor_plan'
      ? `Plano nutricional · ${patientName} · ${formatPdfDate(report.createdAt)}`
      : `Relatório técnico · ${patientName} · ${formatPdfDate(report.createdAt)}`
  addPdfFooters(doc, footerLabel)

  return doc
}

export function buildNutritionPdfV5Filename(report: StoredCalculationReport, mode: NutritionPdfMode): string {
  const patient = slugifyPdfSegment(report.patient.name, 'PACIENTE')
  const date = formatPdfDate(report.createdAt).split('/').reverse().join('-')
  const suffix = mode === 'tutor_plan' ? 'PLANO_TUTOR' : 'RELATORIO_TECNICO'
  return `VETIUS_NUTRICAO_${patient}_${suffix}_${date}.pdf`
}

export function exportNutritionPdfV5(report: StoredCalculationReport, mode: NutritionPdfMode, options?: BuildNutritionPdfV5Options) {
  const doc = buildNutritionPdfV5Doc(report, mode, options)
  doc.save(buildNutritionPdfV5Filename(report, mode))
}

export function printNutritionPdfV5(report: StoredCalculationReport, mode: NutritionPdfMode, options?: BuildNutritionPdfV5Options) {
  const doc = buildNutritionPdfV5Doc(report, mode, options)
  const blob = doc.output('blob')
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (!win) {
    URL.revokeObjectURL(url)
    exportNutritionPdfV5(report, mode, options)
    return
  }
  const tryPrint = () => {
    try {
      win.focus()
      win.print()
    } catch {
      /* utilizador pode imprimir manualmente */
    }
  }
  win.addEventListener('load', () => window.setTimeout(tryPrint, 400))
  window.setTimeout(tryPrint, 1200)
}
