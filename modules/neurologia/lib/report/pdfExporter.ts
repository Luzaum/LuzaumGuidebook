/**
 * Exportador de PDF robusto 100% PT-BR - Versão Clínica/Enxuta
 */

import jsPDF from 'jspdf'
import type { CaseReport } from '../../types/analysis'

export function exportToPDF(report: CaseReport, caseState: any): void {
  const doc = new jsPDF()
  let yPos = 20

  // Configuração de fonte padrão para evitar problemas de encoding
  // Usaremos Helvetica padrão que suporta a maioria dos acentos latinos nativamente em jsPDF moderno

  // Helper para adicionar texto com controle de página
  const addText = (
    text: string,
    fontSize: number = 10,
    isBold: boolean = false,
    color: [number, number, number] | null = null,
    indent: number = 20
  ) => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')

    if (color) {
      doc.setTextColor(color[0], color[1], color[2])
    } else {
      doc.setTextColor(0, 0, 0)
    }

    // Limpar texto de caracteres problemáticos se necessário (embora jsPDF atual lide bem)
    // const safeText = text.replace(/[^\x00-\xFF]/g, "") 

    const lines = doc.splitTextToSize(text, 170 - (indent - 20))
    doc.text(lines, indent, yPos)
    yPos += lines.length * fontSize * 0.4 + 2 // Espaçamento entrelinhas ajustado

    if (yPos > 280) {
      doc.addPage()
      yPos = 20
    }
  }

  const addSectionTitle = (title: string) => {
    yPos += 4
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    // Fundo dourado suave para título
    doc.setFillColor(245, 197, 66)
    doc.rect(15, yPos - 5, 180, 7, 'F')

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(title.toUpperCase(), 20, yPos)
    yPos += 4
  }

  // CABEÇALHO
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('RELATÓRIO NEUROLÓGICO', 105, yPos, { align: 'center' })
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('NeuroVet - Apoio à Decisão Clínica', 105, yPos + 6, { align: 'center' })
  yPos += 15

  // 1. IDENTIFICAÇÃO DO PACIENTE (Conciso)
  addSectionTitle('1. Identificação do Paciente')
  const patient = caseState?.patient || {}
  const species = patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Não informado'
  const sex = patient.sex === 'male' ? 'Macho' : 'Fêmea'
  const age = patient.ageYears ? `${patient.ageYears} anos` : 'Idade não inf.'

  addText(`Espécie: ${species} | Sexo: ${sex} | Idade: ${age} | Peso: ${patient.weightKg || '?'} kg`, 10)

  if (patient.comorbidities && patient.comorbidities.length > 0) {
    const comorbList = patient.comorbidities.map((c: any) => c.label).join(', ')
    addText(`Comorbidades: ${comorbList}`, 9, false, [80, 80, 80])
  } else {
    addText('Comorbidades: Nenhuma relatada', 9, false, [80, 80, 80])
  }

  // 2. QUEIXA E CURSO
  addSectionTitle('2. Queixa Principal e Curso')
  const complaint = caseState?.complaint || {}

  // Extrair texto limpo
  const course = complaint.temporalPattern ? complaint.temporalPattern.charAt(0).toUpperCase() + complaint.temporalPattern.slice(1) : 'Não informado'
  const evolution = complaint.evolutionPattern ? complaint.evolutionPattern.charAt(0).toUpperCase() + complaint.evolutionPattern.slice(1) : 'Não informado'

  addText(`Queixa: ${Array.isArray(complaint.chiefComplaintIds) ? complaint.chiefComplaintIds.join(', ') : 'Não informada'}`, 10, true)
  addText(`Curso: ${course} | Evolução: ${evolution}`, 10)

  if (complaint.redFlags && complaint.redFlags.length > 0) {
    addText(`RED FLAGS: ${complaint.redFlags.join(', ')}`, 9, true, [200, 0, 0])
  }

  // 3. ACHADOS NEUROLÓGICOS RELEVANTES (Bullet points)
  addSectionTitle('3. Achados Neurológicos Relevantes')

  // Aqui idealmente iteraríamos sobre findings positivos, mas como report.examSummary já resume, vamos usá-lo ou processar o texto
  // Vamos tentar extrair itens chave do summary se ele estiver formatado com pipes, senão imprimimos direto
  if (report.examSummary) {
    const findings = report.examSummary.split('|').filter(s => s.trim().length > 0)
    findings.forEach(f => addText(`• ${f.trim()}`, 9))
  } else {
    addText('Nenhum achado relevante registrado.', 9, false, [128, 128, 128])
  }

  // 4. NEUROLOCALIZAÇÃO (Síntese)
  addSectionTitle('4. Neurolocalização (Síntese)')

  const neuro = report.neuroLocalization
  const primary = neuro.primary.replace(/_/g, ' ')
  const secondary = neuro.secondary ? neuro.secondary.map(s => s.replace(/_/g, ' ')).join(', ') : null

  addText(`Localização Principal: ${primary}`, 10, true)
  if (secondary) addText(`Localização Associada: ${secondary}`, 10)

  addText(`Distribuição: ${neuro.distribution} | Padrão: ${neuro.motorPattern}`, 10)
  addText(`Confiança: ${neuro.confidence >= 80 ? 'Alta' : neuro.confidence >= 50 ? 'Moderada' : 'Baixa'}`, 10)

  if (neuro.supportiveFindings.length > 0) {
    addText('Suporte:', 9, true, null, 20)
    neuro.supportiveFindings.forEach(f => addText(`• ${f}`, 9, false, [60, 60, 60], 25))
  }

  // 5. DIAGNÓSTICOS DIFERENCIAIS (Lista Priorizada)
  addSectionTitle('5. Diagnósticos Diferenciais Prioritários')

  report.differentials.slice(0, 5).forEach((dx, i) => {
    addText(`${i + 1}. ${dx.name} (${dx.category})`, 10, true)
    // Não imprimir justificativas longas, apenas manter conciso
    // Se houver uma justificativa chave ("Why"), pegar a primeira
    if (dx.why.length > 0) {
      addText(`   ↳ ${dx.why[0]}`, 8, false, [100, 100, 100])
    }
  })

  // 6. PLANO DIAGNÓSTICO (Agrupado)
  addSectionTitle('6. Plano Diagnóstico Prioritário')

  const highPriorityTests = new Set<string>()
  const moderatePriorityTests = new Set<string>()

  report.differentials.forEach(dx => {
    dx.diagnostics.forEach(diag => {
      if (diag.priority === 'ALTA') highPriorityTests.add(diag.test)
      else if (diag.priority === 'MEDIA') moderatePriorityTests.add(diag.test)
    })
  })

  // Impacto de comorbidades no plano
  if (report.comorbidityImpact?.diagnosticAdds) {
    report.comorbidityImpact.diagnosticAdds.forEach(t => highPriorityTests.add(`${t} (Comorbidade)`))
  }

  if (highPriorityTests.size > 0) {
    addText('PRIORIDADE ALTA:', 9, true)
    Array.from(highPriorityTests).forEach(t => addText(`• ${t}`, 9, false, null, 25))
  } else {
    addText('Nenhum exame de alta prioridade sugerido imediatamente.', 9)
  }

  if (moderatePriorityTests.size > 0) {
    yPos += 2
    addText('PRIORIDADE MODERADA:', 9, true)
    Array.from(moderatePriorityTests).slice(0, 4).forEach(t => addText(`• ${t}`, 9, false, null, 25))
  }

  // 7. CONDUTAS INICIAIS
  addSectionTitle('7. Condutas Iniciais Recomendadas')

  // Coletar tratamentos iniciais únicos (0-6h)
  const initialTreatments = new Set<string>()
  report.differentials.forEach(dx => {
    const initTx = dx.treatment.find(t => t.phase === '0-6H')
    if (initTx) {
      initTx.plan.forEach(p => initialTreatments.add(p))
    }
  })

  if (initialTreatments.size > 0) {
    Array.from(initialTreatments).slice(0, 6).forEach(t => addText(`• ${t}`, 9))
  } else {
    addText('Suporte clínico conforme necessidade.', 9)
  }

  // 8. IMPACTO DAS COMORBIDADES (Alertas)
  if (report.comorbidityImpact &&
    (report.comorbidityImpact.alerts.length > 0 || report.comorbidityImpact.cautions.length > 0)) {

    addSectionTitle('8. Alertas e Precauções (Comorbidades)')

    report.comorbidityImpact.alerts.forEach(a => addText(`⚠ ${a}`, 9, false, [200, 0, 0]))
    report.comorbidityImpact.cautions.forEach(c => addText(`⚠ Cuidado: ${c}`, 9, false, [180, 100, 0]))
  }

  // FOOTER
  const pageHeight = doc.internal.pageSize.height
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  const dateStr = new Date().toLocaleDateString('pt-BR')
  doc.text(`Gerado em: ${dateStr} via NeuroVet`, 10, pageHeight - 10)
  doc.text('Este documento é um auxílio à decisão e não substitui o julgamento clínico.', 100, pageHeight - 10, { align: 'center' })

  // SAVE
  const speciesLabel = caseState?.patient?.species || 'paciente'
  const fileName = `Relatorio_NeuroVet_${speciesLabel}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
