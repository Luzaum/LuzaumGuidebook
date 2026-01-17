import React from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, CheckCircle2, FileText } from 'lucide-react'
import { Button } from '../UI/Button'
import { Card } from '../UI/Card'
import { InlineBanner } from '../UI/InlineBanner'
import { useCaseStore } from '../../stores/caseStore'
import { buildCaseReport } from '../../lib/analysis/report'
import type { CaseReport } from '../../types/analysis'

export function Step5Analysis() {
  const analysis = useCaseStore((s) => s.analysis)
  const setAnalysis = useCaseStore((s) => s.setAnalysis)
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)

  const runAnalysis = () => {
    setAnalysis({ status: 'running' })
    const caseState = { patient, complaint, neuroExam }
    const report = buildCaseReport(caseState)
    setAnalysis({
      status: report.neuroLocalization.status === 'ok' ? 'done' : 'insufficient_data',
      report,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const status = analysis?.status || 'idle'
  const report: CaseReport | undefined = analysis?.report

  const getAxisLabel = (axis: string): string => {
    const labels: Record<string, string> = {
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
    return labels[axis] || axis
  }

  const getMotorPatternLabel = (pattern: string): string => {
    const labels: Record<string, string> = {
      UMN: 'Neurônio Motor Superior (UMN)',
      LMN: 'Neurônio Motor Inferior (LMN)',
      VESTIBULAR: 'Vestibular',
      CEREBELAR: 'Cerebelar',
      NEUROMUSCULAR: 'Neuromuscular',
      INDEFINIDO: 'Indefinido',
    }
    return labels[pattern] || pattern
  }

  const getCategoryLabel = (cat: string): string => {
    const labels: Record<string, string> = {
      INFLAMATORIA: 'Inflamatória',
      INFECCIOSA: 'Infecciosa',
      NEOPLASICA: 'Neoplásica',
      VASCULAR: 'Vascular',
      DEGENERATIVA: 'Degenerativa',
      TRAUMATICA: 'Traumática',
      TOXICO_METABOLICA: 'Tóxico-Metabólica',
      COMPRESSIVA: 'Compressiva',
      IDIOPATICA: 'Idiopática',
    }
    return labels[cat] || cat
  }

  if (status === 'idle') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 pb-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Análise do Caso</h2>
          <p className="text-muted-foreground max-w-md">
            Clique no botão abaixo para analisar os achados neurológicos e gerar o relatório completo com
            neurolocalização e diagnósticos diferenciais.
          </p>
        </motion.div>

        <motion.button
          onClick={runAnalysis}
          disabled={status === 'running'}
          className={`
            px-8 py-4 text-lg font-bold rounded-xl
            bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
            hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700
            text-black shadow-lg shadow-yellow-500/50
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${status === 'running' ? '' : 'animate-pulse'}
          `}
          whileTap={{ scale: 0.95 }}
        >
          <Brain className="w-5 h-5 mr-2 inline-block" />
          {status === 'running' ? 'Analisando…' : 'Analisar Caso'}
        </motion.button>
      </div>
    )
  }

  if (status === 'running') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 pb-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
        />
        <p className="text-muted-foreground">Analisando caso…</p>
      </div>
    )
  }

  if (status === 'insufficient_data' && report) {
    return (
      <div className="space-y-6 pb-24">
        <motion.button
          onClick={runAnalysis}
          disabled={true}
          className={`
            w-full px-8 py-4 text-lg font-bold rounded-xl
            bg-gradient-to-r from-red-500 to-red-600
            text-white shadow-lg
            transition-all duration-300
            opacity-50 cursor-not-allowed
          `}
        >
          <AlertTriangle className="w-5 h-5 mr-2 inline-block" />
          Analisar Caso (Dados Insuficientes)
        </motion.button>

        <InlineBanner
          variant="error"
          title="Dados Insuficientes"
          message={[
            'Não foi possível achar a neurolocalização com os dados fornecidos.',
            ...(report.neuroLocalization.missing || []).map((m) => `• ${m}`),
          ]}
        />
      </div>
    )
  }

  if (status === 'done' && report) {
    return (
      <div className="space-y-6 pb-24">
        {/* Identificação */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Identificação
          </h3>
          <p className="text-foreground/90 text-sm whitespace-pre-line">{report.patientSummary}</p>
        </Card>

        {/* História/Queixa */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gold mb-3">História/Queixa Principal</h3>
          <p className="text-foreground/90 text-sm whitespace-pre-line">{report.historySummary}</p>
        </Card>

        {/* Exame */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gold mb-3">Resumo do Exame Neurológico</h3>
          <p className="text-foreground/90 text-sm whitespace-pre-line">{report.examSummary}</p>
        </Card>

        {/* Neurolocalização */}
        <Card className="p-6 border-gold/30">
          <h3 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Neurolocalização
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Localização Provável</p>
                <p className="text-lg font-semibold text-foreground">{getAxisLabel(report.neuroLocalization.primary)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Distribuição</p>
                <p className="text-lg font-semibold text-foreground capitalize">{report.neuroLocalization.distribution.toLowerCase()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Padrão Motor</p>
                <p className="text-lg font-semibold text-foreground">{getMotorPatternLabel(report.neuroLocalization.motorPattern)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Confiança</p>
                <p className="text-lg font-semibold text-foreground">{report.neuroLocalization.confidence}%</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Raciocínio de Neurolocalização (Síntese)</p>
              <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
                {report.neuroLocalization.narrative}
              </p>
            </div>

            {report.neuroLocalization.supportiveFindings.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-green-400 mb-2">Achados que Suportam</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                  {report.neuroLocalization.supportiveFindings.map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}

            {report.neuroLocalization.contradictoryFindings.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-orange-400 mb-2">Achados Contraditórios</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                  {report.neuroLocalization.contradictoryFindings.map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        {/* TOP 5 DDx */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gold flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Top 5 Diagnósticos Diferenciais
          </h3>

          {report.differentials.map((dx, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {idx + 1}. {dx.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">Categoria: {getCategoryLabel(dx.category)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Probabilidade</p>
                  <p className="text-xl font-bold text-gold">{dx.likelihood}%</p>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-sm font-semibold text-blue-400 mb-2">Justificativas</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                    {dx.why.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-purple-400 mb-2">Como Diagnosticar</p>
                  <div className="space-y-2">
                    {dx.diagnostics.map((diag, i) => (
                      <div key={i} className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">{diag.test}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              diag.priority === 'ALTA'
                                ? 'bg-red-900/50 text-red-300'
                                : diag.priority === 'MEDIA'
                                  ? 'bg-yellow-900/50 text-yellow-300'
                                  : 'bg-blue-900/50 text-blue-300'
                            }`}
                          >
                            {diag.priority}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          <span className="font-semibold">O que adiciona:</span> {diag.whatItAdds}
                        </p>
                        <p className="text-xs text-muted-foreground mb-1">
                          <span className="font-semibold">Achados esperados:</span> {diag.expectedFindings}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">Limitações:</span> {diag.limitations}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-green-400 mb-2">Como Tratar</p>
                  {dx.treatment.map((tx, i) => (
                    <div key={i} className="mb-3 p-3 bg-neutral-800/50 rounded-lg border border-neutral-700">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {tx.phase === '0-6H' ? 'Fase Inicial (0-6h)' : 'Tratamento Definitivo'}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 mb-2">
                        {tx.plan.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                      {tx.cautions.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-neutral-700">
                          <p className="text-xs font-semibold text-orange-400 mb-1">Cautelas:</p>
                          <ul className="list-disc list-inside space-y-1 text-xs text-orange-300/80">
                            {tx.cautions.map((caution, j) => (
                              <li key={j}>{caution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return null
}
