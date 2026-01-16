import jsPDF from 'jspdf'
import { CaseBundle } from '../../types/case'
import { LocalizationResult } from '../analysis/neuroLocalization'
import { DifferentialDiagnosis } from '../analysis/differentials'

export interface ReportData {
  caseBundle: CaseBundle
  localization: LocalizationResult
  differentials: DifferentialDiagnosis[]
}

export function exportToPDF(data: ReportData): void {
  const doc = new jsPDF()
  let yPos = 20

  // Helper function to add text with wrapping
  const addText = (
    text: string,
    fontSize: number = 10,
    isBold: boolean = false,
  ) => {
    doc.setFontSize(fontSize)
    if (isBold) {
      doc.setFont('helvetica', 'bold')
    } else {
      doc.setFont('helvetica', 'normal')
    }

    const lines = doc.splitTextToSize(text, 170)
    doc.text(lines, 20, yPos)
    yPos += lines.length * fontSize * 0.5 + 3

    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }
  }

  const addSection = (title: string) => {
    yPos += 5
    doc.setFillColor(245, 197, 66) // Gold
    doc.rect(15, yPos - 5, 180, 8, 'F')
    doc.setTextColor(0, 0, 0)
    addText(title, 12, true)
    doc.setTextColor(0, 0, 0)
    yPos += 2
  }

  // Title
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('RELATÓRIO DE EXAME NEUROLÓGICO', 105, yPos, { align: 'center' })
  yPos += 15

  // Patient Info
  addSection('IDENTIFICAÇÃO DO PACIENTE')
  addText(
    `Espécie: ${data.caseBundle.patient.species === 'dog' ? 'Cão' : 'Gato'}`,
  )
  if (data.caseBundle.patient.breed) {
    addText(`Raça: ${data.caseBundle.patient.breed}`)
  }
  addText(
    `Idade: ${data.caseBundle.patient.ageRange} ${data.caseBundle.patient.ageYears ? `(${data.caseBundle.patient.ageYears} anos)` : ''}`,
  )
  addText(
    `Sexo: ${data.caseBundle.patient.sex === 'male' ? 'Macho' : 'Fêmea'} ${data.caseBundle.patient.neutered ? '(castrado)' : ''}`,
  )
  if (data.caseBundle.patient.weight) {
    addText(`Peso: ${data.caseBundle.patient.weight} kg`)
  }

  // History
  addSection('QUEIXA PRINCIPAL E HISTÓRICO')
  addText(`Queixa: ${data.caseBundle.history.chiefComplaint}`)
  addText(
    `Curso: ${data.caseBundle.history.course} | Progressão: ${data.caseBundle.history.progression}`,
  )
  if (data.caseBundle.history.trauma) addText('• Histórico de trauma')
  if (data.caseBundle.history.toxin) addText('• Possível exposição a toxinas')

  // Neuro Exam Summary
  addSection('EXAME NEUROLÓGICO - RESUMO')
  addText(`Mentação: ${data.caseBundle.neuroExam.mentation}`)
  addText(
    `Marcha: Torácicos ${data.caseBundle.neuroExam.gait_thoracic} | Pélvicos ${data.caseBundle.neuroExam.gait_pelvic}`,
  )
  if (data.caseBundle.neuroExam.deep_pain) {
    addText(
      `Dor Profunda: ${data.caseBundle.neuroExam.deep_pain}`,
      10,
      data.caseBundle.neuroExam.deep_pain === 'Ausente',
    )
  }

  // Neurolocalization
  addSection('NEUROLOCALIZAÇÃO')
  addText(`Localização Provável: ${data.localization.location}`, 11, true)
  addText(`Padrão Motor: ${data.localization.motorNeuronPattern}`)
  addText(`Confiança: ${Math.round(data.localization.confidence * 100)}%`)

  addText('Achados que Suportam:', 10, true)
  data.localization.reasons.forEach((reason) => {
    if (reason) addText(`• ${reason}`, 9)
  })

  if (data.localization.redFlags.length > 0) {
    addText('⚠️ Alertas Importantes:', 10, true)
    data.localization.redFlags.forEach((flag) => {
      addText(`• ${flag}`, 9)
    })
  }

  // Differentials
  addSection('DIAGNÓSTICOS DIFERENCIAIS (TOP 5)')
  data.differentials.forEach((dx, index) => {
    addText(`${index + 1}. ${dx.name}`, 11, true)
    addText('Justificativas:')
    dx.justifications.slice(0, 4).forEach((just) => {
      addText(`  • ${just}`, 9)
    })
    yPos += 3
  })

  // Diagnostic Plan
  addSection('PLANO DIAGNÓSTICO PRIORITÁRIO')
  const allDiagnostics = new Set<string>()
  data.differentials.forEach((dx) => {
    dx.diagnostics.forEach((d) => allDiagnostics.add(d))
  })
  Array.from(allDiagnostics)
    .slice(0, 6)
    .forEach((diagnostic, index) => {
      addText(`${index + 1}. ${diagnostic}`, 9)
    })

  // Treatment
  addSection('TRATAMENTO')
  addText('Imediato (0-6h):', 10, true)
  const allTreatments = new Set<string>()
  data.differentials.forEach((dx) => {
    dx.treatment.forEach((t) => allTreatments.add(t))
  })
  Array.from(allTreatments)
    .slice(0, 6)
    .forEach((treatment) => {
      addText(`• ${treatment}`, 9)
    })

  // Footer
  yPos = 280
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 105, yPos, {
    align: 'center',
  })
  doc.text('VetNeuro - Exame Neurológico Veterinário', 105, yPos + 5, {
    align: 'center',
  })

  // Save
  const fileName = `Relatorio_Neuro_${data.caseBundle.patient.species}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
