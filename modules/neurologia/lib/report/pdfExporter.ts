/**
 * Exportador de PDF robusto 100% PT-BR - Versão Clínica/Enxuta v2 (Fix)
 */

import jsPDF from 'jspdf'
import type { CaseReport } from '../../types/analysis'

// Helper de sanitização robusta
function cleanText(input: string | undefined | null): string {
  if (!input) return ''
  return input
    .replace(/\u0000/g, '') // NUL
    .replace(/[\u200B-\u200F\uFEFF]/g, '') // zero-width chars
    .replace(/\r/g, '')
    .normalize('NFC') // normalização Unicode
}

export function exportToPDF(report: CaseReport, caseState: any): void {
  const doc = new jsPDF()
  let yPos = 20

  // Reset de estado gráfico crítico para evitar bugs de espaçamento
  const resetStyle = () => {
    doc.setCharSpace(0) // CRÍTICO: reseta kerning
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'normal')
  }

  // Wrapper seguro para adicionar texto
  const addText = (
    text: string,
    fontSize: number = 10,
    isBold: boolean = false,
    color: [number, number, number] | null = null,
    indent: number = 20,
  ) => {
    // Reset preventivo
    doc.setCharSpace(0)

    doc.setFontSize(fontSize)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')

    if (color) {
      doc.setTextColor(color[0], color[1], color[2])
    } else {
      doc.setTextColor(0, 0, 0)
    }

    const cleaned = cleanText(text)
    const maxWidth = 170 - (indent - 20)

    const lines = doc.splitTextToSize(cleaned, maxWidth)
    doc.text(lines, indent, yPos)

    // Altura de linha ajustada (fator 0.5 do tamanho da fonte)
    yPos += lines.length * fontSize * 0.5 + 2

    // Paginação
    if (yPos > 280) {
      doc.addPage()
      resetStyle() // Garante estado limpo na nova página
      yPos = 20
    }
  }

  // Wrapper para bullet points seguros
  const addBullet = (text: string, fontSize: number = 9, color: [number, number, number] | null = null, indent: number = 20) => {
    // Usando hífen para garantir compatibilidade 100% sem fonte externa, ou string limpa
    const bulletChar = '-'
    addText(`${bulletChar} ${text}`, fontSize, false, color, indent)
  }

  const addSectionTitle = (title: string) => {
    yPos += 4
    if (yPos > 270) {
      doc.addPage()
      resetStyle()
      yPos = 20
    }

    // Background Dourado Suave
    doc.setFillColor(245, 197, 66)
    doc.rect(15, yPos - 5, 180, 7, 'F')

    // Reset explícito para desenhar texto sobre o rect
    resetStyle()
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(title.toUpperCase(), 20, yPos)
    yPos += 6
  }

  // --- INÍCIO DO DOCUMENTO ---
  resetStyle()

  // CABEÇALHO
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('RELATÓRIO NEUROLÓGICO', 105, yPos, { align: 'center' })

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('NeuroVet - Apoio à Decisão Clínica', 105, yPos + 6, { align: 'center' })
  yPos += 15

  // 1. IDENTIFICAÇÃO DO PACIENTE
  addSectionTitle('1. Identificação do Paciente')
  const patient = caseState?.patient || {}
  const species =
    patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Não informado'
  const sex = patient.sex === 'male' ? 'Macho' : 'Fêmea'
  const age = patient.ageYears ? `${patient.ageYears} anos` : 'Idade não inf.'

  addText(
    `Espécie: ${species} | Sexo: ${sex} | Idade: ${age} | Peso: ${patient.weightKg || '?'} kg`,
    10,
  )

  if (patient.comorbidities && patient.comorbidities.length > 0) {
    const comorbList = patient.comorbidities.map((c: any) => c.label).join(', ')
    addText(`Comorbidades: ${comorbList}`, 9, false, [80, 80, 80])
  } else {
    addText('Comorbidades: Nenhuma relatada', 9, false, [80, 80, 80])
  }

  // 2. QUEIXA E CURSO
  addSectionTitle('2. Queixa Principal e Curso')
  const complaint = caseState?.complaint || {}
  const course = complaint.temporalPattern
    ? complaint.temporalPattern.charAt(0).toUpperCase() + complaint.temporalPattern.slice(1)
    : 'Não informado'
  const evolution = complaint.evolutionPattern
    ? complaint.evolutionPattern.charAt(0).toUpperCase() + complaint.evolutionPattern.slice(1)
    : 'Não informado'

  addText(
    `Queixa: ${Array.isArray(complaint.chiefComplaintIds)
      ? complaint.chiefComplaintIds.join(', ')
      : 'Não informada'
    }`,
    10,
    true,
  )
  addText(`Curso: ${course} | Evolução: ${evolution}`, 10)

  if (complaint.redFlags && complaint.redFlags.length > 0) {
    addText(`RED FLAGS: ${complaint.redFlags.join(', ')}`, 9, true, [200, 0, 0])
  }

  // 3. ACHADOS NEUROLÓGICOS
  addSectionTitle('3. Achados Neurológicos Relevantes')
  if (report.examSummary) {
    // Limpeza extra para evitar pipes ou caracteres estranhos
    const findings = report.examSummary.split('|').filter((s) => cleanText(s).trim().length > 0)
    findings.forEach((f) => addBullet(f.trim(), 9))
  } else {
    addText('Nenhum achado relevante registrado.', 9, false, [128, 128, 128])
  }

  // 4. NEUROLOCALIZAÇÃO
  addSectionTitle('4. Neurolocalização (Síntese)')

  const neuro = report.neuroLocalization
  const primary = neuro.primary.replace(/_/g, ' ')
  const secondary = neuro.secondary
    ? neuro.secondary.map((s) => s.replace(/_/g, ' ')).join(', ')
    : null

  addText(`Localização Principal: ${primary}`, 10, true)
  if (secondary) addText(`Localização Associada: ${secondary}`, 10)

  addText(`Distribuição: ${neuro.distribution} | Padrão: ${neuro.motorPattern}`, 10)

  const confidenceTxt =
    neuro.confidence >= 80 ? 'Alta' : neuro.confidence >= 50 ? 'Moderada' : 'Baixa'
  addText(`Confiança: ${confidenceTxt}`, 10)

  if (neuro.supportiveFindings.length > 0) {
    addText('Suporte:', 9, true, null, 20)
    neuro.supportiveFindings.forEach((f) => addBullet(f, 9, [60, 60, 60], 25))
  }

  // 5. DIFERENCIAIS
  addSectionTitle('5. Diagnósticos Diferenciais Prioritários')
  report.differentials.slice(0, 5).forEach((dx, i) => {
    addText(`${i + 1}. ${dx.name} (${dx.category})`, 10, true)
    if (dx.why.length > 0) {
      addText(`   ↳ ${cleanText(dx.why[0])}`, 8, false, [100, 100, 100])
    }
  })

  // 6. PLANO DIAGNÓSTICO
  addSectionTitle('6. Plano Diagnóstico Prioritário')

  const highPriorityTests = new Set<string>()
  const moderatePriorityTests = new Set<string>()

  report.differentials.forEach((dx) => {
    dx.diagnostics.forEach((diag) => {
      if (diag.priority === 'ALTA') highPriorityTests.add(diag.test)
      else if (diag.priority === 'MEDIA') moderatePriorityTests.add(diag.test)
    })
  })

  if (report.comorbidityImpact?.diagnosticAdds) {
    report.comorbidityImpact.diagnosticAdds.forEach((t) =>
      highPriorityTests.add(`${t} (Comorbidade)`),
    )
  }

  if (highPriorityTests.size > 0) {
    addText('PRIORIDADE ALTA:', 9, true)
    Array.from(highPriorityTests).forEach((t) => addBullet(t, 9, null, 25))
  } else {
    addText('Nenhum exame de alta prioridade sugerido imediatamente.', 9)
  }

  if (moderatePriorityTests.size > 0) {
    yPos += 2
    addText('PRIORIDADE MODERADA:', 9, true)
    Array.from(moderatePriorityTests)
      .slice(0, 4)
      .forEach((t) => addBullet(t, 9, null, 25))
  }

  // 7. CONDUTAS INICIAIS
  addSectionTitle('7. Condutas Iniciais Recomendadas')
  const initialTreatments = new Set<string>()
  report.differentials.forEach((dx) => {
    const initTx = dx.treatment.find((t) => t.phase === '0-6H')
    if (initTx) {
      initTx.plan.forEach((p) => initialTreatments.add(p))
    }
  })

  if (initialTreatments.size > 0) {
    Array.from(initialTreatments)
      .slice(0, 6)
      .forEach((t) => addBullet(t, 9))
  } else {
    addText('Suporte clínico conforme necessidade.', 9)
  }

  // 8. ALERTAS E COMORBIDADES
  if (
    report.comorbidityImpact &&
    (report.comorbidityImpact.alerts.length > 0 ||
      report.comorbidityImpact.cautions.length > 0)
  ) {
    addSectionTitle('8. Alertas e Precauções (Comorbidades)')

    report.comorbidityImpact.alerts.forEach((a) => addBullet(`ALERTA: ${a}`, 9, [200, 0, 0]))
    report.comorbidityImpact.cautions.forEach((c) =>
      addBullet(`Cuidado: ${c}`, 9, [180, 100, 0]),
    )
  }

  // FOOTER
  const pageHeight = doc.internal.pageSize.height

  resetStyle()
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)

  const dateStr = new Date().toLocaleDateString('pt-BR')
  doc.text(`Gerado em: ${dateStr} via NeuroVet`, 10, pageHeight - 10)
  doc.text(
    'Este documento é um auxílio à decisão e não substitui o julgamento clínico.',
    100,
    pageHeight - 10,
    { align: 'center' },
  )

  // SAVE
  const speciesLabel = caseState?.patient?.species || 'paciente'
  const fileName = `Relatorio_NeuroVet_${speciesLabel}_${new Date().toISOString().split('T')[0]
    }.pdf`
  doc.save(fileName)
}
