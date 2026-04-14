import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { StoredCalculationReport } from '../types'
import {
  buildPrintableReportViewModel,
  buildSharedFeedingSheetMetaFields,
  type PrintableReportViewModel,
} from './reportPresentation'

/** Segmento seguro para nome de ficheiro (ASCII, maiúsculas, underscores). */
function slugifyFilenameSegment(value: string | null | undefined, fallback: string) {
  const base = value && value.trim() ? value.trim() : fallback
  const ascii = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toUpperCase()
  return ascii || fallback.toUpperCase().replace(/[^A-Z0-9]+/g, '_')
}

function formatFilenameDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Nome do ficheiro PDF: VETIUS_NUTRICAO_PACIENTE_TUTOR_YYYY-MM-DD.pdf
 * ("NUTRICAO" = forma ASCII de NUTRIÇÃO, compatível com mais sistemas e anexos.)
 */
export function buildVetiusNutritionPdfFilename(report: StoredCalculationReport): string {
  const patient = slugifyFilenameSegment(report.patient.name, 'PACIENTE')
  const tutor = slugifyFilenameSegment(report.patient.ownerName, 'TUTOR')
  const date = formatFilenameDate(report.createdAt)
  return `VETIUS_NUTRICAO_${patient}_${tutor}_${date}.pdf`
}

function truncateFooterText(value: string, max: number) {
  if (value.length <= max) return value
  return `${value.slice(0, Math.max(0, max - 1))}…`
}

function addNutritionPdfPageFooters(doc: jsPDF, report: StoredCalculationReport) {
  const total = doc.getNumberOfPages()
  const patient = truncateFooterText(report.patient.name?.trim() || 'Paciente', 36)
  const tutor = truncateFooterText(report.patient.ownerName?.trim() || 'Tutor', 32)
  const dateStr = new Date(report.createdAt).toLocaleDateString('pt-BR')
  const leftLine = `Vetius · NutriçãoVET · ${patient} · ${tutor} · ${dateStr}`
  const left = leftLine.length > 118 ? `NutriçãoVET · ${patient} · ${dateStr}` : leftLine
  const pageW = doc.internal.pageSize.getWidth()

  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(118, 110, 100)
    doc.text(left, 14, 287, { maxWidth: pageW - 60 })
    doc.text(`Página ${i} de ${total}`, pageW - 14, 287, { align: 'right' })
  }
}

function drawSectionTitle(doc: jsPDF, title: string, startY: number, compact = false, micro = false) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(micro ? 8 : compact ? 10 : 12)
  doc.text(title, 14, startY)
  doc.setDrawColor(229, 99, 10)
  doc.setLineWidth(compact ? 0.35 : 0.5)
  doc.line(14, startY + 2, 196, startY + 2)
}

function renderKeyValueTable(doc: jsPDF, title: string, rows: string[][], startY: number, compact = false) {
  drawSectionTitle(doc, title, startY, compact)
  autoTable(doc, {
    startY: startY + (compact ? 5 : 6),
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: compact ? 8 : 10,
      cellPadding: compact ? 1.5 : 2.4,
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [251, 250, 248],
    },
    columnStyles: {
      0: { cellWidth: compact ? 48 : 54, fontStyle: 'bold' },
      1: { cellWidth: compact ? 134 : 128 },
    },
    margin: { left: 14, right: 14 },
  })
}

function renderDataTable(
  doc: jsPDF,
  title: string,
  headers: string[],
  rows: string[][],
  startY: number,
  compact = false,
  micro = false,
) {
  drawSectionTitle(doc, title, startY, compact, micro)
  const fontSize = micro ? 6.5 : compact ? 7.5 : 9.5
  const cellPad = micro ? 1.05 : compact ? 1.4 : 2.3
  autoTable(doc, {
    startY: startY + (micro ? 4 : compact ? 5 : 6),
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize,
      cellPadding: cellPad,
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize,
    },
    alternateRowStyles: {
      fillColor: [251, 250, 248],
    },
    margin: { left: 14, right: 14 },
    tableWidth: compact || micro ? 182 : undefined,
  })
}

function getLastTableFinalY(doc: jsPDF): number {
  return (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 0
}

/** Títulos de secção na ficha compacta (3 dias / folha). */
function drawTripleSheetSectionTitle(doc: jsPDF, title: string, startY: number) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(229, 99, 10)
  doc.text(title, 14, startY)
  doc.setDrawColor(229, 99, 10)
  doc.setLineWidth(0.45)
  doc.line(14, startY + 2.5, 196, startY + 2.5)
}

/** Dados da ficha + alimentos com tipografia maior (aproveita altura da folha). */
function renderTripleSheetKeyValueTable(doc: jsPDF, title: string, rows: string[][], startY: number) {
  drawTripleSheetSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 7,
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 9.5,
      cellPadding: { top: 2.4, bottom: 2.4, left: 2.2, right: 2.2 },
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize: 9.5,
    },
    alternateRowStyles: { fillColor: [251, 250, 248] },
    columnStyles: {
      0: { cellWidth: 52, fontStyle: 'bold' },
      1: { cellWidth: 128 },
    },
    margin: { left: 14, right: 14 },
  })
}

function renderTripleSheetFoodTable(doc: jsPDF, title: string, headers: string[], rows: string[][], startY: number) {
  drawTripleSheetSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 7,
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 9,
      cellPadding: { top: 2.2, bottom: 2.2, left: 2, right: 2 },
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
      overflow: 'linebreak',
      minCellHeight: 8,
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize: 9,
    },
    alternateRowStyles: { fillColor: [251, 250, 248] },
    margin: { left: 14, right: 14 },
    tableWidth: 182,
  })
}

/** Controle diário: linhas mais altas; `minCellHeight` reparte o espaço vertical da folha. */
function renderTripleSheetControlTable(
  doc: jsPDF,
  title: string,
  headers: string[],
  rows: string[][],
  startY: number,
  minCellHeight = 10,
) {
  drawTripleSheetSectionTitle(doc, title, startY)
  autoTable(doc, {
    startY: startY + 7,
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8.8,
      cellPadding: { top: 2.6, bottom: 2.6, left: 1.8, right: 1.8 },
      lineColor: [222, 217, 208],
      lineWidth: 0.2,
      textColor: [29, 26, 23],
      overflow: 'linebreak',
      minCellHeight,
    },
    headStyles: {
      fillColor: [246, 244, 241],
      textColor: [29, 26, 23],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    alternateRowStyles: { fillColor: [251, 250, 248] },
    margin: { left: 14, right: 14 },
    tableWidth: 182,
  })
}

/** Uma ficha completa (dados + alimentos + controle); `compact` para caber 2 dias na mesma folha A4. */
function renderFeedingSheetBlock(
  doc: jsPDF,
  sheet: PrintableReportViewModel['feedingSheets'][0],
  startY: number,
  compact: boolean,
): number {
  const gap = compact ? 5 : 8
  renderKeyValueTable(doc, 'Dados da ficha', sheet.meta.map((field) => [field.label, field.value]), startY, compact)
  let y = getLastTableFinalY(doc)
  renderDataTable(doc, 'Alimentos utilizados', ['Alimento', 'Oferta diária total', 'Por refeição'], sheet.foodRows, y + gap, compact)
  y = getLastTableFinalY(doc)
  renderDataTable(
    doc,
    'Controle diário',
    ['Horário', 'Quantidade/refeição', 'Alimentos', 'Comeu? Sim/não (pesar sobra)', 'Assinatura'],
    sheet.rows,
    y + gap,
    compact,
    false,
  )
  return getLastTableFinalY(doc)
}

function buildNutritionReportPdfDoc(report: StoredCalculationReport): jsPDF {
  const vm = buildPrintableReportViewModel(report)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  const metaTitle = `Vetius NutriçãoVET — ${report.patient.name?.trim() || 'Paciente'}`
  doc.setProperties({
    title: metaTitle,
    subject: 'Relatório nutricional veterinário',
    author: 'Vetius',
    keywords: 'nutrição veterinária, prescrição, energia, dieta',
    creator: 'Vetius NutriçãoVET',
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(229, 99, 10)
  doc.text('NutriçãoVET — Relatório nutricional', 14, 18)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(98, 89, 79)
  doc.text(`Emitido em ${vm.generatedAt}`, 14, 24)
  doc.text(vm.patientTitle, 196, 18, { align: 'right' })
  doc.text(vm.patientSubtitle, 196, 24, { align: 'right' })

  let nextY = 32

  renderKeyValueTable(doc, '1. Identificação do paciente', vm.patientFields.map((field) => [field.label, field.value]), nextY)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '2. Dados clínicos', vm.clinicalFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '3. Cálculo energético', vm.energyFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '4. Meta nutricional', vm.targetFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderKeyValueTable(doc, '5. Fórmula geral', vm.formulaMetaFields.map((field) => [field.label, field.value]), nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '6. Fórmula alimentar', ['Alimento', 'Inclusão', 'Oferta diária', 'Energia'], vm.formulaRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '7. Resumo nutricional', ['Nutriente', 'Valor'], vm.nutrientRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(doc, '8. Partição energética', ['Macro', '%', 'Gramas', 'Kcal'], vm.macroRows, nextY + 8)
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  renderDataTable(
    doc,
    '9. Contribuição por alimento',
    ['Alimento', 'Categoria', 'Oferta diária', 'Energia', 'Por refeição'],
    vm.contributionRows,
    nextY + 8,
  )
  nextY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY

  if (vm.alertNotes.length > 0) {
    renderDataTable(doc, '10. Observações finais', ['Observação'], vm.alertNotes.map((note) => [note]), nextY + 8)
  }

  if (vm.feedingSheetTripleDayLayout && vm.feedingSheets.length > 0) {
    const sheets = vm.feedingSheets
    const perPage = 3
    const folhas = Math.ceil(sheets.length / perPage)
    for (let f = 0; f < folhas; f++) {
      doc.addPage()
      let y = 12
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(18)
      doc.setTextColor(229, 99, 10)
      doc.text(vm.feedingSheetTitle, 14, y)
      y += 7
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(98, 89, 79)
      doc.text('Página operacional para rotina diária', 14, y)
      y += 4.5
      if (vm.feedingSheetPrintBanner) {
        doc.setFontSize(8)
        doc.setTextColor(120, 110, 100)
        const lines = doc.splitTextToSize(vm.feedingSheetPrintBanner, 132)
        doc.text(lines, 14, y)
        y += lines.length * 3.6
      }
      doc.setFontSize(8.5)
      doc.setTextColor(98, 89, 79)
      doc.text(`Folha de ficha ${f + 1} de ${folhas} — 3 dias por folha`, 196, 17, { align: 'right' })
      doc.text(vm.patientTitle, 196, 24, { align: 'right' })

      const slice = sheets.slice(f * perPage, f * perPage + perPage)
      y = Math.max(y + 3, 30)

      const sharedRows = buildSharedFeedingSheetMetaFields(report, slice).map((field) => [field.label, field.value])
      renderTripleSheetKeyValueTable(doc, 'Dados da ficha', sharedRows, y)
      y = getLastTableFinalY(doc)
      renderTripleSheetFoodTable(
        doc,
        'Alimentos utilizados',
        ['Alimento', 'Oferta diária total', 'Por refeição'],
        slice[0].foodRows,
        y + 6,
      )
      y = getLastTableFinalY(doc)

      /** Distribui altura das linhas de controle para preencher até ~8 mm acima do rodapé. */
      const PAGE_MAX_CONTENT_Y = 278
      const gapBetweenControlBlocks = 8
      const yFirstControl = y + 5
      const roughFixedOverheadMm = 46
      const bodyRowsTotal = slice.length * 5
      const budgetForBodyRows =
        PAGE_MAX_CONTENT_Y - yFirstControl - gapBetweenControlBlocks * (slice.length - 1) - roughFixedOverheadMm
      const controlMinRow = Math.max(9, Math.min(13.5, budgetForBodyRows / Math.max(bodyRowsTotal, 1)))

      y = yFirstControl
      for (let di = 0; di < slice.length; di++) {
        const daySheet = slice[di]
        if (di > 0) y += gapBetweenControlBlocks
        renderTripleSheetControlTable(
          doc,
          `Controle diário — Dia ${daySheet.dateLabel}`,
          ['Horário', 'Quantidade/refeição', 'Alimentos', 'Comeu? Sim/não (pesar sobra)', 'Assinatura'],
          daySheet.rows,
          y,
          controlMinRow,
        )
        y = getLastTableFinalY(doc)
      }
    }
  } else {
    vm.feedingSheets.forEach((sheet) => {
      doc.addPage()
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(18)
      doc.setTextColor(229, 99, 10)
      doc.text(vm.feedingSheetTitle, 14, 18)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(98, 89, 79)
      doc.text('Página operacional para rotina diária', 14, 24)
      doc.text(vm.patientTitle, 196, 18, { align: 'right' })

      renderFeedingSheetBlock(doc, sheet, 32, false)
    })
  }

  addNutritionPdfPageFooters(doc, report)

  return doc
}

/** Gera o mesmo PDF que “Exportar PDF” e descarrega o ficheiro. */
export function exportReportPdf(report: StoredCalculationReport) {
  const doc = buildNutritionReportPdfDoc(report)
  doc.save(buildVetiusNutritionPdfFilename(report))
}

export function printReportPdf(report: StoredCalculationReport) {
  const doc = buildNutritionReportPdfDoc(report)
  const blob = doc.output('blob')
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (!win) {
    URL.revokeObjectURL(url)
    exportReportPdf(report)
    return
  }
  const tryPrint = () => {
    try {
      win.focus()
      win.print()
    } catch {
      /* ignorar — utilizador pode imprimir manualmente no leitor PDF */
    }
  }
  win.addEventListener('load', () => window.setTimeout(tryPrint, 400))
  window.setTimeout(tryPrint, 1200)
}
