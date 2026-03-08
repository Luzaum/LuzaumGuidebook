import React from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, CheckCircle2, FileText } from 'lucide-react'
import { Card } from '../UI/Card'
import { InlineBanner } from '../UI/InlineBanner'
import { useCaseStore } from '../../stores/caseStore'
import { buildCaseReport } from '../../lib/analysis/report'
import { generateDeepSeekClinicalOpinion } from '../../lib/analysis/deepseek'
import { exportToPDF } from '../../lib/report/pdfExporter'
import type { CaseReport } from '../../types/analysis'

export function Step5Analysis() {
  const analysis = useCaseStore((s) => s.analysis)
  const setAnalysis = useCaseStore((s) => s.setAnalysis)
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)

  const runAnalysis = async () => {
    setAnalysis({ status: 'running' })
    const caseState = { patient, complaint, neuroExam }
    const report = buildCaseReport(caseState)

    if (report.neuroLocalization.status !== 'ok') {
      setAnalysis({
        status: 'insufficient_data',
        report,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    let aiOpinion: string | null = null
    let aiModelUsed: string | null = null
    let aiCoverage: any = null
    let aiUsedFallback = false
    let aiError: string | null = null

    try {
      const deepSeekResult = await generateDeepSeekClinicalOpinion(caseState, report)
      if (!deepSeekResult) {
        aiError = 'DeepSeek não inicializou. Verifique a configuração da API key no frontend.'
      } else {
        aiOpinion = deepSeekResult.content ?? null
        aiModelUsed = deepSeekResult.modelUsed ?? null
        aiCoverage = deepSeekResult.coverage ?? null
        aiUsedFallback = deepSeekResult.fallbackUsed ?? false
        if (!aiOpinion) {
          aiError = 'DeepSeek respondeu sem conteúdo para este caso. Tente novamente.'
        }
      }
    } catch (error) {
      console.error('Erro ao gerar parecer DeepSeek:', error)
      const message = error instanceof Error ? error.message : 'Erro desconhecido ao consultar DeepSeek.'
      aiError = `Falha ao gerar parecer DeepSeek: ${message}`
    }

    setAnalysis({
      status: 'done',
      report,
      aiOpinion,
      aiModelUsed,
      aiCoverage,
      aiUsedFallback,
      aiError,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExportPDF = () => {
    if (!report) return
    const caseState = { patient, complaint, neuroExam }
    try {
      exportToPDF(report, caseState)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Verifique o console para mais detalhes.')
    }
  }

  const status = analysis?.status || 'idle'
  const report: CaseReport | undefined = analysis?.report
  const aiOpinion = analysis?.aiOpinion || null
  const aiModelUsed = analysis?.aiModelUsed || null
  const aiCoverage = analysis?.aiCoverage || null
  const aiUsedFallback = analysis?.aiUsedFallback || false
  const aiError = analysis?.aiError || null

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

  const getCoverageBadgeClass = (covered: boolean): string =>
    covered
      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
      : 'border-red-500/40 bg-red-500/10 text-red-300'

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
          disabled={false}
          className={`
            px-8 py-4 text-lg font-bold rounded-xl
            bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
            hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700
            text-black shadow-lg shadow-yellow-500/50
            transition-all duration-300
            animate-pulse
          `}
          whileTap={{ scale: 0.95 }}
        >
          <Brain className="w-5 h-5 mr-2 inline-block" />
          Analisar Caso
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
          disabled={false}
          className={`
            w-full px-8 py-4 text-lg font-bold rounded-xl
            bg-gradient-to-r from-yellow-500 to-yellow-600
            hover:from-yellow-600 hover:to-yellow-700
            text-white shadow-lg
            transition-all duration-300
          `}
        >
          <Brain className="w-5 h-5 mr-2 inline-block" />
          Tentar Reanalisar Caso
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
        {/* Botoes Superiores */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={handleExportPDF}
            className="flex-1 px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-5 h-5" />
            Exportar em PDF
          </motion.button>

          {(aiError || !aiOpinion) && (
            <motion.button
              onClick={runAnalysis}
              className="flex-1 px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Brain className="w-5 h-5" />
              Tentar Analisar Novamente
            </motion.button>
          )}
        </div>

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

        {aiOpinion && (
          <Card className="p-6 border-cyan-500/30 bg-cyan-950/10">
            <h3 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Parecer IA DeepSeek
            </h3>

            <p className="text-xs text-cyan-100/80 mb-3">
              Modelo utilizado: <span className="font-semibold">{aiModelUsed || 'DeepSeek'}</span>
              {aiUsedFallback ? ' (fallback automatico por custo/disponibilidade)' : ''}
            </p>

            {aiCoverage && (
              <div className="mb-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                    Cobertura global: {aiCoverage.score}%
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded border ${getCoverageBadgeClass(aiCoverage.identification.covered)}`}
                  >
                    Identificacao: {aiCoverage.identification.covered ? 'ok' : 'incompleta'}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded border ${getCoverageBadgeClass(aiCoverage.historyContext.covered)}`}
                  >
                    Historico/contexto: {aiCoverage.historyContext.covered ? 'ok' : 'incompleto'}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded border ${getCoverageBadgeClass(aiCoverage.neuroExam.covered)}`}
                  >
                    Exame neurologico: {aiCoverage.neuroExam.covered ? 'ok' : 'incompleto'}
                  </span>
                </div>

                {((aiCoverage.identification.missing && aiCoverage.identification.missing.length > 0) ||
                  (aiCoverage.historyContext.missing && aiCoverage.historyContext.missing.length > 0) ||
                  (aiCoverage.neuroExam.missing && aiCoverage.neuroExam.missing.length > 0)) && (
                    <div className="rounded-lg border border-amber-500/35 bg-amber-950/20 p-3">
                      <p className="text-xs font-semibold text-amber-300 mb-2">
                        Pontos possivelmente nao cobertos integralmente na resposta da IA:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-amber-200/90">
                        {aiCoverage.identification.missing?.slice(0, 4).map((item: string, idx: number) => (
                          <li key={`id-miss-${idx}`}>Identificacao: {item}</li>
                        ))}
                        {aiCoverage.historyContext.missing?.slice(0, 4).map((item: string, idx: number) => (
                          <li key={`hx-miss-${idx}`}>Historico/contexto: {item}</li>
                        ))}
                        {aiCoverage.neuroExam.missing?.slice(0, 4).map((item: string, idx: number) => (
                          <li key={`exam-miss-${idx}`}>Exame neurologico: {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}

            <div className="rounded-xl border border-cyan-500/30 bg-black/30 p-4">
              <p className="text-sm text-cyan-50 whitespace-pre-wrap leading-relaxed">{aiOpinion}</p>
            </div>
          </Card>
        )}

        {aiError && (
          <InlineBanner
            variant="warning"
            title="Parecer IA indisponivel"
            message={aiError}
          />
        )}

        {!aiOpinion && !aiError && (
          <InlineBanner
            variant="warning"
            title="Sem resposta da IA"
            message="A chamada ao DeepSeek não retornou conteúdo útil. Abra o console (F12) para ver o diagnóstico detalhado da integração."
          />
        )}

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

        {/* Impacto das Comorbidades */}
        {report.comorbidityImpact &&
          (report.comorbidityImpact.alerts.length > 0 ||
            report.comorbidityImpact.cautions.length > 0 ||
            report.comorbidityImpact.diagnosticAdds.length > 0 ||
            report.comorbidityImpact.diagnosticAvoids.length > 0) && (
            <Card className="p-6 border-indigo-500/30 bg-indigo-900/10">
              <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Impacto das Comorbidades
              </h3>

              {/* Alertas */}
              {report.comorbidityImpact.alerts.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⚠️</span>
                    <h4 className="text-base font-semibold text-orange-400">Alertas Clínicos</h4>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {report.comorbidityImpact.alerts.map((alert, idx) => (
                      <li key={idx} className="text-sm text-neutral-200 flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>{alert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cautelas Terapêuticas */}
              {report.comorbidityImpact.cautions.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💊</span>
                    <h4 className="text-base font-semibold text-yellow-400">Cautelas Terapêuticas</h4>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {report.comorbidityImpact.cautions.map((caution, idx) => (
                      <li key={idx} className="text-sm text-neutral-200 flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{caution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exames a Adicionar */}
              {report.comorbidityImpact.diagnosticAdds.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🧪</span>
                    <h4 className="text-base font-semibold text-blue-400">Exames Recomendados</h4>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {report.comorbidityImpact.diagnosticAdds.map((add, idx) => (
                      <li key={idx} className="text-sm text-neutral-200 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{add}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* O que Evitar/Ajustar */}
              {report.comorbidityImpact.diagnosticAvoids.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🚫</span>
                    <h4 className="text-base font-semibold text-red-400">Evitar/Ajustar</h4>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {report.comorbidityImpact.diagnosticAvoids.map((avoid, idx) => (
                      <li key={idx} className="text-sm text-neutral-200 flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}

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
                            className={`text-xs px-2 py-1 rounded ${diag.priority === 'ALTA'
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
