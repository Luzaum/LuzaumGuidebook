import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  FileText,
  Download,
  Copy,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react'
import { Button } from '../UI/Button'
import { Card } from '../UI/Card'
import { AppState, AnalysisResult } from '../../types'
import { normalizeFindings } from '../../lib/analysis/normalizeSelections'
import {
  analyzeNeuroLocalization,
  getLocationDisplayName,
  LocalizationResult,
} from '../../lib/analysis/neuroLocalization'
import {
  generateDifferentials,
  DifferentialDiagnosis,
} from '../../lib/analysis/differentials'
import { exportToPDF } from '../../lib/report/pdfExporter'
import {
  CaseBundle,
  PatientProfile as NewPatientProfile,
  ClinicalHistory,
  NeuroExamFindings,
} from '../../types/case'

interface Step5Props {
  result: AnalysisResult | null
  onRestart: () => void
}

export function Step5Analysis({ result, onRestart }: Step5Props) {
  const [analyzed, setAnalyzed] = useState(false)
  const [localization, setLocalization] = useState<LocalizationResult | null>(
    null,
  )
  const [differentials, setDifferentials] = useState<DifferentialDiagnosis[]>(
    [],
  )
  const [copied, setCopied] = useState(false)

  // Get state from localStorage to build caseBundle
  const getAppState = (): AppState | null => {
    try {
      const stored = localStorage.getItem('vetneuro-app-state')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }

  const buildCaseBundle = (state: AppState): CaseBundle => {
    // Convert old PatientProfile to new format
    const patient: NewPatientProfile = {
      species: state.patient.species === 'Dog' ? 'dog' : 'cat',
      breed: undefined,
      ageRange: state.patient.physiologicState.includes('Pediátrico' as any)
        ? 'pediatric'
        : state.patient.physiologicState.includes('Geriátrico' as any)
          ? 'geriatric'
          : 'adult',
      ageYears: state.patient.age.years,
      sex: state.patient.sex === 'M' ? 'male' : 'female',
      neutered: state.patient.physiologicState.includes('Castrado' as any),
      weight: state.patient.weight,
      comorbidities: state.patient.comorbidities,
      medications: state.patient.medications.map((m) => m.name),
    }

    // Convert temporal pattern to course
    const courseMap: Record<string, any> = {
      'Peragudo (<24h)': 'peracute',
      'Agudo (24-48h)': 'acute',
      'Subagudo (dias)': 'subacute',
      'Crônico (semanas/meses)': 'chronic',
      Episódico: 'episodic',
    }
    const progressionMap: Record<string, any> = {
      Progressivo: 'progressive',
      Estático: 'static',
      Melhorando: 'improving',
      Flutuante: 'fluctuating',
    }
    const history: ClinicalHistory = {
      chiefComplaint: state.chiefComplaints.join(', '),
      course: courseMap[state.patient.temporalPattern || ''] || 'acute',
      progression:
        progressionMap[state.patient.course || ''] || 'progressive',
      trauma: state.patient.redFlags.some((f) =>
        f.toLowerCase().includes('trauma'),
      ),
      toxin: state.patient.redFlags.some((f) =>
        f.toLowerCase().includes('tox'),
      ),
      fever: state.patient.redFlags.some((f) =>
        f.toLowerCase().includes('febr'),
      ),
      onset: state.patient.temporalPattern || '',
      duration: state.patient.temporalPattern || '',
    }
    const neuroExam: NeuroExamFindings = {
      mentation: state.exam.findings.mentation || '',
      behavior: state.exam.findings.behavior || '',
      head_posture: state.exam.findings.head_posture || '',
      ambulation: state.exam.findings.ambulation || '',
      gait_thoracic: state.exam.findings.gait_thoracic || '',
      gait_pelvic: state.exam.findings.gait_pelvic || '',
      ataxia_type: state.exam.findings.ataxia_type || '',
      proprioception_thoracic_left:
        state.exam.findings.proprioception_thoracic_left || '',
      proprioception_thoracic_right:
        state.exam.findings.proprioception_thoracic_right || '',
      proprioception_pelvic_left:
        state.exam.findings.proprioception_pelvic_left || '',
      proprioception_pelvic_right:
        state.exam.findings.proprioception_pelvic_right || '',
      menace_left: state.exam.findings.menace_left || '',
      menace_right: state.exam.findings.menace_right || '',
      plr_left: state.exam.findings.plr_left || '',
      plr_right: state.exam.findings.plr_right || '',
      nystagmus: state.exam.findings.nystagmus || '',
      strabismus: state.exam.findings.strabismus || '',
      cn_facial_sensation: state.exam.findings.cn_facial_sensation || '',
      cn_swallowing: state.exam.findings.cn_swallowing || '',
      reflex_patellar_left: state.exam.findings.reflex_patellar_left || '',
      reflex_patellar_right: state.exam.findings.reflex_patellar_right || '',
      reflex_withdrawal_left_thoracic:
        state.exam.findings.reflex_withdrawal_left_thoracic || '',
      reflex_withdrawal_right_thoracic:
        state.exam.findings.reflex_withdrawal_right_thoracic || '',
      reflex_panniculus: state.exam.findings.reflex_panniculus || '',
      deep_pain: state.exam.findings.deep_pain || '',
      pain_cervical: state.exam.findings.pain_cervical || '',
      pain_thoracolumbar: state.exam.findings.pain_thoracolumbar || '',
      pain_lumbosacral: state.exam.findings.pain_lumbosacral || '',
    }
    return {
      patient,
      history,
      neuroExam,
      meta: {
        createdAt: state.exam.timestamp,
        version: '1.0',
      },
    }
  }

  const handleAnalyze = () => {
    const appState = getAppState()
    if (!appState) {
      alert('Erro ao carregar dados do exame')
      return
    }
    const caseBundle = buildCaseBundle(appState)
    // Normalize findings
    const normalized = normalizeFindings(caseBundle.neuroExam)
    // Run neurolocalization
    const locResults = analyzeNeuroLocalization(normalized)
    const primaryLoc = locResults[0]
    if (!primaryLoc) {
      alert(
        'Não foi possível determinar a neurolocalização com os dados fornecidos',
      )
      return
    }
    // Generate differentials
    const diffs = generateDifferentials(
      primaryLoc.location,
      caseBundle.patient,
      caseBundle.history,
      normalized,
    )
    setLocalization(primaryLoc)
    setDifferentials(diffs)
    setAnalyzed(true)
  }

  const handleExportPDF = () => {
    const appState = getAppState()
    if (!localization || !appState) return
    const caseBundle = buildCaseBundle(appState)
    exportToPDF({
      caseBundle,
      localization,
      differentials,
    })
  }

  const handleCopySummary = () => {
    if (!localization) return
    const summary = `
NEUROLOCALIZAÇÃO: ${getLocationDisplayName(localization.location)}
Padrão Motor: ${localization.motorNeuronPattern}
Confiança: ${Math.round(localization.confidence * 100)}%

TOP 5 DIAGNÓSTICOS DIFERENCIAIS:
${differentials.map((dx, i) => `${i + 1}. ${dx.name}`).join('\n')}
    `.trim()
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!analyzed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 pb-24">
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Análise do Caso
          </h2>
          <p className="text-muted-foreground max-w-md">
            Clique no botão abaixo para analisar os achados neurológicos e gerar
            o relatório completo com neurolocalização e diagnósticos
            diferenciais.
          </p>
        </motion.div>

        <Button
          onClick={handleAnalyze}
          size="lg"
          className="bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-600 hover:to-gold text-black font-bold px-8 py-4 text-lg"
        >
          <Brain className="w-5 h-5 mr-2" />
          Analisar Caso
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Header with actions */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Análise Completa
          </h2>
          <p className="text-sm text-muted-foreground">
            Resultados baseados nos achados neurológicos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCopySummary} variant="secondary" size="sm">
            {copied ? (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copiado!' : 'Copiar Resumo'}
          </Button>
          <Button onClick={handleExportPDF} variant="primary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </motion.div>

      {/* Neurolocalization Card */}
      {localization && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
        >
          <Card className="p-6 border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/20 rounded-lg">
                <Brain className="w-6 h-6 text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Neurolocalização Provável
                </h3>
                <p className="text-2xl font-bold text-gold mb-3">
                  {getLocationDisplayName(localization.location)}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Padrão Motor
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {localization.motorNeuronPattern}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Confiança</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${localization.confidence * 100}%`,
                          }}
                          transition={{
                            duration: 1,
                            ease: 'easeOut',
                          }}
                          className="h-full bg-gradient-to-r from-gold to-green-500"
                        />
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {Math.round(localization.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Achados que Suportam:
                    </p>
                    <ul className="space-y-1">
                      {localization.reasons.map(
                        (reason, idx) =>
                          reason && (
                            <li
                              key={idx}
                              className="text-sm text-foreground/90 flex gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ),
                      )}
                    </ul>
                  </div>

                  {localization.redFlags.length > 0 && (
                    <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-lg">
                      <p className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Alertas Importantes
                      </p>
                      <ul className="space-y-1">
                        {localization.redFlags.map((flag, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-red-200 flex gap-2"
                          >
                            <span>•</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Differentials Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold" />
            Top 5 Diagnósticos Diferenciais
          </h3>
          <div className="space-y-4">
            {differentials.map((dx, index) => (
              <div
                key={index}
                className="p-4 bg-card border border-border rounded-lg hover:border-gold/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">
                      {dx.name}
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          Justificativas:
                        </p>
                        <ul className="space-y-1">
                          {dx.justifications.slice(0, 4).map((just, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-foreground/80 flex gap-2"
                            >
                              <span className="text-gold">•</span>
                              <span>{just}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          Exames Principais:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {dx.diagnostics.slice(0, 3).map((diag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-blue-900/20 text-blue-400 rounded"
                            >
                              {diag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Treatment Summary */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Tratamento Imediato (0-6h)
          </h3>
          <div className="space-y-2">
            {Array.from(new Set(differentials.flatMap((dx) => dx.treatment)))
              .slice(0, 6)
              .map((treatment, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 text-sm text-foreground/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{treatment}</span>
                </div>
              ))}
          </div>
        </Card>
      </motion.div>

      {/* Restart Button */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="flex justify-center pt-6"
      >
        <Button onClick={onRestart} variant="secondary" size="lg">
          <RefreshCw className="w-5 h-5 mr-2" />
          Iniciar Novo Exame
        </Button>
      </motion.div>
    </div>
  )
}
