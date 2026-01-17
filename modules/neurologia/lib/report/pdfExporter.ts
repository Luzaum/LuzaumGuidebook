/**
 * Exportador de PDF robusto 100% PT-BR
 * Gera relatório clínico veterinário completo baseado em CaseReport
 */

import jsPDF from 'jspdf'
import type { CaseReport } from '../../types/analysis'

export function exportToPDF(report: CaseReport, caseState: any): void {
  const doc = new jsPDF()
  let yPos = 20

  // Helper function to add text with wrapping
  const addText = (
    text: string,
    fontSize: number = 10,
    isBold: boolean = false,
    color: [number, number, number] | null = null,
  ) => {
    doc.setFontSize(fontSize)
    if (isBold) {
      doc.setFont('helvetica', 'bold')
    } else {
      doc.setFont('helvetica', 'normal')
    }

    if (color) {
      doc.setTextColor(color[0], color[1], color[2])
    } else {
      doc.setTextColor(0, 0, 0)
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

  // Título
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('RELATÓRIO DE EXAME NEUROLÓGICO', 105, yPos, { align: 'center' })
  yPos += 15

  // 1. IDENTIFICAÇÃO DO PACIENTE
  addSection('1. IDENTIFICAÇÃO DO PACIENTE')
  const patientLines = report.patientSummary.split('|').map((s) => s.trim())
  patientLines.forEach((line) => {
    if (line) addText(line, 10, false)
  })

  // 2. QUEIXA E HISTÓRICO
  addSection('2. QUEIXA PRINCIPAL E HISTÓRICO')
  const historyLines = report.historySummary.split('|').map((s) => s.trim())
  historyLines.forEach((line) => {
    if (line) addText(line, 10, false)
  })

  // 3. RESUMO DO EXAME NEUROLÓGICO
  addSection('3. RESUMO DO EXAME NEUROLÓGICO')
  const examLines = report.examSummary.split('|').map((s) => s.trim())
  examLines.forEach((line) => {
    if (line) addText(line, 10, false)
  })

  // 4. INTERPRETAÇÃO NEUROLÓGICA INTEGRADA (TEXTÃO CLÍNICO)
  addSection('4. INTERPRETAÇÃO NEUROLÓGICA INTEGRADA')
  addText(report.neuroLocalization.narrative, 10, false)

  // 5. NEUROLOCALIZAÇÃO + CONFIANÇA
  addSection('5. NEUROLOCALIZAÇÃO')
  
  const axisLabels: Record<string, string> = {
    PROSENCEFALO: 'Prosencéfalo',
    TRONCO_ENCEFALICO: 'Tronco Encefálico',
    CEREBELO: 'Cerebelo',
    VESTIBULAR_PERIFERICO: 'Vestibular Periférico',
    VESTIBULAR_CENTRAL: 'Vestibular Central',
    MEDULA_C1_C5: 'Medula Espinhal Cervical (C1-C5)',
    MEDULA_C6_T2: 'Medula Espinhal Cervicotorácica (C6-T2)',
    MEDULA_T3_L3: 'Medula Espinhal Toracolombar (T3-L3)',
    MEDULA_L4_S3: 'Medula Espinhal Lombossacra (L4-S3)',
    CAUDA_EQUINA: 'Cauda Equina',
    NEUROMUSCULAR: 'Neuromuscular',
    MULTIFOCAL_OU_DIFUSA: 'Multifocal ou Difusa',
    INDETERMINADO: 'Indeterminado',
  }

  const motorLabels: Record<string, string> = {
    UMN: 'Neurônio Motor Superior',
    LMN: 'Neurônio Motor Inferior',
    VESTIBULAR: 'Vestibular',
    CEREBELAR: 'Cerebelar',
    NEUROMUSCULAR: 'Neuromuscular',
    INDEFINIDO: 'Indefinido',
  }

  const distLabels: Record<string, string> = {
    FOCAL: 'Focal',
    MULTIFOCAL: 'Multifocal',
    DIFUSA: 'Difusa',
    INDETERMINADA: 'Indeterminada',
  }

  addText(`Localização Primária: ${axisLabels[report.neuroLocalization.primary] || report.neuroLocalization.primary}`, 11, true)
  
  if (report.neuroLocalization.secondary && report.neuroLocalization.secondary.length > 0) {
    addText(`Localizações Secundárias: ${report.neuroLocalization.secondary.map((a) => axisLabels[a] || a).join(', ')}`, 10, false)
  }
  
  addText(`Distribuição: ${distLabels[report.neuroLocalization.distribution] || report.neuroLocalization.distribution}`, 10, false)
  addText(`Padrão Motor: ${motorLabels[report.neuroLocalization.motorPattern] || report.neuroLocalization.motorPattern}`, 10, false)
  
  const confidenceLabel =
    report.neuroLocalization.confidence >= 75
      ? 'Alta'
      : report.neuroLocalization.confidence >= 50
      ? 'Moderada'
      : 'Baixa'
  addText(`Confiança: ${report.neuroLocalization.confidence}% (${confidenceLabel})`, 10, false)

  if (report.neuroLocalization.supportiveFindings.length > 0) {
    addText('Achados que Suportam:', 10, true)
    report.neuroLocalization.supportiveFindings.forEach((finding) => {
      addText(`  • ${finding}`, 9, false)
    })
  }

  if (report.neuroLocalization.contradictoryFindings.length > 0) {
    addText('Achados Contraditórios:', 10, true)
    report.neuroLocalization.contradictoryFindings.forEach((finding) => {
      addText(`  • ${finding}`, 9, false, [200, 50, 50])
    })
  }

  // 6. DIAGNÓSTICOS DIFERENCIAIS (TOP 5)
  addSection('6. DIAGNÓSTICOS DIFERENCIAIS (TOP 5)')
  report.differentials.forEach((dx, index) => {
    addText(`${index + 1}. ${dx.name}`, 11, true)
    addText(`   Categoria: ${dx.category} | Probabilidade: ${dx.likelihood}%`, 9, false)
    
    if (dx.why.length > 0) {
      addText('   Justificativas:', 9, true)
      dx.why.forEach((just) => {
        addText(`     • ${just}`, 9, false)
      })
    }
    yPos += 2
  })

  // 7. PLANO DIAGNÓSTICO EXPLICADO
  addSection('7. PLANO DIAGNÓSTICO PRIORITÁRIO')
  
  // Agrupar diagnósticos por prioridade
  const diagnosticsByPriority: { ALTA: string[]; MEDIA: string[]; BAIXA: string[] } = {
    ALTA: [],
    MEDIA: [],
    BAIXA: [],
  }

  const seenTests = new Set<string>()
  report.differentials.forEach((dx) => {
    dx.diagnostics.forEach((diag) => {
      const testKey = `${diag.test}|${diag.priority}`
      if (!seenTests.has(testKey)) {
        seenTests.add(testKey)
        diagnosticsByPriority[diag.priority].push(
          `${diag.test} → ${diag.whatItAdds} (Achados esperados: ${diag.expectedFindings})${diag.limitations ? ` [Limitações: ${diag.limitations}]` : ''}`,
        )
      }
    })
  })

  if (diagnosticsByPriority.ALTA.length > 0) {
    addText('Prioridade ALTA:', 10, true)
    diagnosticsByPriority.ALTA.slice(0, 5).forEach((diag) => {
      addText(`  • ${diag}`, 9, false)
    })
  }

  if (diagnosticsByPriority.MEDIA.length > 0) {
    addText('Prioridade MÉDIA:', 10, true)
    diagnosticsByPriority.MEDIA.slice(0, 3).forEach((diag) => {
      addText(`  • ${diag}`, 9, false)
    })
  }

  // 8. TRATAMENTO INICIAL RACIONAL
  addSection('8. TRATAMENTO INICIAL RACIONAL')
  
  report.differentials.forEach((dx, dxIndex) => {
    const initialTreatment = dx.treatment.find((t) => t.phase === '0-6H')
    if (initialTreatment) {
      addText(`${dxIndex + 1}. ${dx.name}:`, 10, true)
      initialTreatment.plan.forEach((planItem) => {
        addText(`   • ${planItem}`, 9, false)
      })
      if (initialTreatment.cautions.length > 0) {
        addText('   Cautelas:', 9, true)
        initialTreatment.cautions.forEach((caution) => {
          addText(`     ⚠ ${caution}`, 9, false, [200, 150, 0])
        })
      }
      yPos += 2
    }
  })

  // 9. TRATAMENTO DEFINITIVO
  addSection('9. TRATAMENTO DEFINITIVO (POR DIFERENCIAL)')
  
  report.differentials.forEach((dx, dxIndex) => {
    const definitiveTreatment = dx.treatment.find((t) => t.phase === 'DEFINITIVO')
    if (definitiveTreatment) {
      addText(`${dxIndex + 1}. ${dx.name}:`, 10, true)
      definitiveTreatment.plan.forEach((planItem) => {
        addText(`   • ${planItem}`, 9, false)
      })
      if (definitiveTreatment.cautions.length > 0) {
        addText('   Cautelas:', 9, true)
        definitiveTreatment.cautions.forEach((caution) => {
          addText(`     ⚠ ${caution}`, 9, false, [200, 150, 0])
        })
      }
      yPos += 2
    }
  })

  // 10. OBSERVAÇÕES E ALERTAS
  if (report.neuroLocalization.contradictoryFindings.length > 0 || report.neuroLocalization.confidence < 50) {
    addSection('10. OBSERVAÇÕES E ALERTAS')
    
    if (report.neuroLocalization.confidence < 50) {
      addText('⚠ Confiança na neurolocalização é baixa. Recomenda-se completar exame neurológico.', 9, false, [200, 100, 0])
    }
    
    if (report.neuroLocalization.contradictoryFindings.length > 0) {
      addText('⚠ Achados contraditórios presentes. Considerar lesões multifocais ou evolução da doença.', 9, false, [200, 100, 0])
    }
  }

  // 10. IMPACTO DAS COMORBIDADES
  if (
    report.comorbidityImpact &&
    (report.comorbidityImpact.alerts.length > 0 ||
      report.comorbidityImpact.cautions.length > 0 ||
      report.comorbidityImpact.diagnosticAdds.length > 0 ||
      report.comorbidityImpact.diagnosticAvoids.length > 0)
  ) {
    addSection('10. IMPACTO DAS COMORBIDADES')

    // Alertas
    if (report.comorbidityImpact.alerts.length > 0) {
      addText('⚠️ Alertas Clínicos:', 10, true)
      report.comorbidityImpact.alerts.forEach((alert) => {
        addText(`• ${alert}`, 9, false)
      })
      yPos += 2
    }

    // Cautelas Terapêuticas
    if (report.comorbidityImpact.cautions.length > 0) {
      addText('💊 Cautelas Terapêuticas:', 10, true)
      report.comorbidityImpact.cautions.forEach((caution) => {
        addText(`• ${caution}`, 9, false)
      })
      yPos += 2
    }

    // Exames a Adicionar
    if (report.comorbidityImpact.diagnosticAdds.length > 0) {
      addText('🧪 Exames Recomendados Adicionais:', 10, true)
      report.comorbidityImpact.diagnosticAdds.forEach((add) => {
        addText(`• ${add}`, 9, false)
      })
      yPos += 2
    }

    // Evitar/Ajustar (em destaque)
    if (report.comorbidityImpact.diagnosticAvoids.length > 0) {
      addText('🚫 Evitar/Ajustar (Em Destaque):', 10, true, [200, 0, 0])
      report.comorbidityImpact.diagnosticAvoids.forEach((avoid) => {
        addText(`• ${avoid}`, 9, false, [200, 50, 0])
      })
    }
  }

  // 11. REFERÊNCIAS BIBLIOGRÁFICAS
  addSection('11. REFERÊNCIAS BIBLIOGRÁFICAS')
  addText('• Practical Guide to Canine and Feline Neurology (Dewey & Costa, 5th ed.)', 9, false)
  addText('• BSAVA Manual of Canine and Feline Neurology (4th ed.)', 9, false)
  addText('• Small Animal Neurological Emergencies (Platt & Garosi, 1st ed.)', 9, false)
  addText('• Nelson & Couto - Small Animal Internal Medicine (5th ed.)', 9, false)
  addText('• Veterinary Neuroanatomy and Clinical Neurology (de Lahunta & Glass, 5th ed.)', 9, false)

  // Footer
  yPos = 280
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  const generatedDate = new Date(report.generatedAtISO).toLocaleString('pt-BR')
  doc.text(`Gerado em: ${generatedDate}`, 105, yPos, { align: 'center' })
  doc.text('NeuroVet - Sistema de Exame Neurológico Veterinário', 105, yPos + 5, {
    align: 'center',
  })

  // Save
  const patientSpecies = caseState?.patient?.species || 'paciente'
  const fileName = `Relatorio_Neurologico_${patientSpecies}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
