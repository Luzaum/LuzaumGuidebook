import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Brain, CheckCircle2, FileText } from 'lucide-react'
import { Card } from '../UI/Card'
import { InlineBanner } from '../UI/InlineBanner'
import { useCaseStore } from '../../stores/caseStore'
import { buildCaseReport } from '../../lib/analysis/report'
import { buildLocalClinicalCompanionReport } from '../../lib/report/localClinicalCompanion'
import { exportToPDF } from '../../lib/report/pdfExporter'
import { parseAiClinicalReport } from '../../lib/report/aiClinicalReportParser'
import type { CaseReport } from '../../types/analysis'

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-cyan-500/20 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/60">{label}</p>
      <p className="mt-2 text-base font-semibold text-cyan-50">{value || 'Nao informado'}</p>
    </div>
  )
}

function BulletList({
  items,
  dotClassName,
  textClassName = 'text-slate-100/90',
}: {
  items: string[]
  dotClassName: string
  textClassName?: string
}) {
  return (
    <ul className={`space-y-2 text-sm ${textClassName}`}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-start gap-2">
          <span className={`mt-1 h-2 w-2 rounded-full ${dotClassName}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function DifferentialSection({
  title,
  items,
  dotClassName,
  textClassName,
}: {
  title: string
  items: string[]
  dotClassName: string
  textClassName?: string
}) {
  if (items.length === 0) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-100">{title}</p>
      <BulletList items={items} dotClassName={dotClassName} textClassName={textClassName} />
    </div>
  )
}

function parseSummaryLines(summary: string | undefined) {
  return String(summary || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf(':')
      if (separator < 0) {
        return { label: '', value: line }
      }

      return {
        label: line.slice(0, separator).trim(),
        value: line.slice(separator + 1).trim(),
      }
    })
}

function SummaryGrid({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
          {item.label ? (
            <>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-100/90">{item.value || 'Nao informado'}</p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-slate-100/90">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  )
}

const EXAM_FIELD_LABELS: Record<string, string> = {
  mentation: 'Mentacao',
  behavior: 'Comportamento',
  head_posture: 'Postura da cabeca',
  ambulation: 'Deambulacao',
  gait_thoracic: 'Marcha dos membros toracicos',
  gait_pelvic: 'Marcha dos membros pelvicos',
  ataxia_type: 'Tipo de ataxia',
  proprioception_thoracic_left: 'Propriocepcao toracico esquerdo',
  proprioception_thoracic_right: 'Propriocepcao toracico direito',
  proprioception_pelvic_left: 'Propriocepcao pelvico esquerdo',
  proprioception_pelvic_right: 'Propriocepcao pelvico direito',
  menace_left: 'Resposta a ameaca esquerda',
  menace_right: 'Resposta a ameaca direita',
  plr_left: 'PLR esquerdo',
  plr_right: 'PLR direito',
  nystagmus: 'Nistagmo',
  strabismus: 'Estrabismo',
  cn_facial_sensation: 'Sensibilidade facial',
  cn_swallowing: 'Reflexo de degluticao',
  reflex_patellar_left: 'Patelar esquerdo',
  reflex_patellar_right: 'Patelar direito',
  reflex_withdrawal_left_thoracic: 'Retirada toracico esquerdo',
  reflex_withdrawal_right_thoracic: 'Retirada toracico direito',
  reflex_panniculus: 'Panniculus',
  deep_pain: 'Dor profunda',
  pain_cervical: 'Dor cervical',
  pain_thoracolumbar: 'Dor toracolombar',
  pain_lumbosacral: 'Dor lombossacra',
}

const EXAM_SECTIONS: Array<{ title: string; keys: string[] }> = [
  { title: 'Mentacao e comportamento', keys: ['mentation', 'behavior', 'head_posture'] },
  { title: 'Marcha e postura', keys: ['ambulation', 'gait_thoracic', 'gait_pelvic', 'ataxia_type'] },
  {
    title: 'Reacoes posturais',
    keys: [
      'proprioception_thoracic_left',
      'proprioception_thoracic_right',
      'proprioception_pelvic_left',
      'proprioception_pelvic_right',
    ],
  },
  {
    title: 'Nervos cranianos',
    keys: [
      'menace_left',
      'menace_right',
      'plr_left',
      'plr_right',
      'nystagmus',
      'strabismus',
      'cn_facial_sensation',
      'cn_swallowing',
    ],
  },
  {
    title: 'Reflexos espinhais',
    keys: [
      'reflex_patellar_left',
      'reflex_patellar_right',
      'reflex_withdrawal_left_thoracic',
      'reflex_withdrawal_right_thoracic',
      'reflex_panniculus',
    ],
  },
  {
    title: 'Dor e nocicepcao',
    keys: ['deep_pain', 'pain_cervical', 'pain_thoracolumbar', 'pain_lumbosacral'],
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  INFLAMATORIA: 'Inflamatoria',
  INFECCIOSA: 'Infecciosa',
  NEOPLASICA: 'Neoplasica',
  VASCULAR: 'Vascular',
  DEGENERATIVA: 'Degenerativa',
  TRAUMATICA: 'Traumatica',
  TOXICO_METABOLICA: 'Toxico-metabolica',
  COMPRESSIVA: 'Compressiva',
  IDIOPATICA: 'Idiopatica',
  ENDOCRINA: 'Endocrina',
}

function buildExamSections(exam: Record<string, any> | undefined) {
  const source = exam || {}

  return EXAM_SECTIONS.map((section) => ({
    title: section.title,
    items: section.keys
      .filter((key) => source[key] !== null && source[key] !== undefined && String(source[key]).trim() !== '')
      .map((key) => `${EXAM_FIELD_LABELS[key] || key}: ${String(source[key]).trim()}`),
  })).filter((section) => section.items.length > 0)
}

function formatCategoryLabel(category: string) {
  return CATEGORY_LABELS[category] || category
}

export function Step5Analysis() {
  const analysis = useCaseStore((s) => s.analysis)
  const setAnalysis = useCaseStore((s) => s.setAnalysis)
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)

  const report: CaseReport | undefined = analysis?.report
  const clinicalReportText = analysis?.aiOpinion || null
  const reportError = analysis?.aiError || null
  const progress = analysis?.aiProgress || null
  const parsedClinicalReport = clinicalReportText ? parseAiClinicalReport(clinicalReportText) : null
  const status = analysis?.status || 'idle'
  const examSections = buildExamSections(neuroExam as Record<string, any>)
  const patientSummaryItems = parseSummaryLines(report?.patientSummary)
  const historySummaryItems = parseSummaryLines(report?.historySummary)

  const updateRunningState = async (
    value: number,
    stage: string,
    detail: string,
    currentReport?: CaseReport,
  ) => {
    setAnalysis({
      status: 'running',
      report: currentReport,
      aiOpinion: null,
      aiModelUsed: null,
      aiUsedFallback: false,
      aiCoverage: null,
      aiError: null,
      aiProgress: {
        value,
        stage,
        detail,
      },
    })
    await sleep(45)
  }

  const runAnalysis = async () => {
    const caseState = { patient, complaint, neuroExam }

    try {
      await updateRunningState(
        8,
        'Organizando caso',
        'Consolidando identificacao, historico e exame neurologico em uma unica leitura clinica.',
      )

      const nextReport = buildCaseReport(caseState)

      await updateRunningState(
        28,
        'Consolidando neurolocalizacao',
        'Revisando topografia, distribuicao e coerencia entre queixa, exame e comorbidades.',
        nextReport,
      )

      if (nextReport.neuroLocalization.status !== 'ok') {
        setAnalysis({
          status: 'insufficient_data',
          report: nextReport,
          aiOpinion: null,
          aiModelUsed: null,
          aiUsedFallback: false,
          aiCoverage: null,
          aiProgress: null,
          aiError: null,
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      await updateRunningState(
        52,
        'Hierarquizando diagnosticos',
        'Ordenando os diferenciais mais provaveis e cruzando exames, monitorizacao e cautelas terapeuticas.',
        nextReport,
      )

      const nextClinicalReport = buildLocalClinicalCompanionReport(caseState, nextReport)

      await updateRunningState(
        78,
        'Montando relatorio clinico',
        'Transformando o caso em um relatorio estruturado para plantao e exportacao em PDF.',
        nextReport,
      )

      const parsed = parseAiClinicalReport(nextClinicalReport)

      await updateRunningState(
        96,
        'Finalizando',
        'Validando a estrutura final do relatorio e preparando a exibicao.',
        nextReport,
      )

      setAnalysis({
        status: 'done',
        report: nextReport,
        aiOpinion: nextClinicalReport,
        aiModelUsed: null,
        aiUsedFallback: false,
        aiCoverage: null,
        aiProgress: null,
        aiError: parsed ? null : 'Nao foi possivel estruturar o relatorio clinico final. Gere novamente o caso.',
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Erro ao montar relatorio clinico local:', error)
      setAnalysis({
        status: 'done',
        report,
        aiOpinion: null,
        aiModelUsed: null,
        aiUsedFallback: false,
        aiCoverage: null,
        aiProgress: null,
        aiError:
          error instanceof Error
            ? `Falha ao montar o relatorio clinico local: ${error.message}`
            : 'Falha ao montar o relatorio clinico local.',
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleExportPDF = () => {
    if (!report) return
    const caseState = { patient, complaint, neuroExam }

    try {
      exportToPDF(report, caseState, clinicalReportText)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Verifique o console para mais detalhes.')
    }
  }

  if (status === 'idle') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 pb-24">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4 text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Analise do Caso</h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Clique abaixo para gerar uma leitura clinica estruturada do caso com neurolocalizacao,
            prioridades do plantao e diagnosticos diferenciais organizados por probabilidade.
          </p>
        </motion.div>

        <motion.button
          onClick={runAnalysis}
          className="animate-pulse rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-8 py-4 text-lg font-bold text-black shadow-lg shadow-yellow-500/50 transition-all duration-300 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700"
          whileTap={{ scale: 0.95 }}
        >
          <Brain className="mr-2 inline-block h-5 w-5" />
          Analisar Caso
        </motion.button>
      </div>
    )
  }

  if (status === 'running') {
    const progressValue = Math.min(100, Math.max(8, progress?.value || 10))
    const progressStages = [
      { label: 'Organizar caso', threshold: 10 },
      { label: 'Neurolocalizar', threshold: 30 },
      { label: 'Hierarquizar DDx', threshold: 55 },
      { label: 'Montar relatorio', threshold: 80 },
      { label: 'Finalizar', threshold: 96 },
    ]

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 pb-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-16 w-16 rounded-full border-4 border-yellow-500 border-t-transparent"
        />

        <Card className="w-full max-w-2xl border-yellow-500/20 bg-slate-950/60 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Montando relatorio clinico</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {progress?.stage || 'Processando os achados do caso.'}
              </p>
              {progress?.detail && (
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{progress.detail}</p>
              )}
            </div>
            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-yellow-200/70">Progresso</p>
              <p className="mt-1 text-2xl font-bold text-yellow-300">{progressValue}%</p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#facc15,#f59e0b)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressValue}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {progressStages.map((item, index) => {
              const reached = progressValue >= item.threshold
              return (
                <div
                  key={`progress-stage-${index}`}
                  className={`rounded-xl border px-3 py-3 text-center text-xs ${
                    reached
                      ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-100'
                      : 'border-white/10 bg-white/5 text-slate-400'
                  }`}
                >
                  {item.label}
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    )
  }

  if (status === 'insufficient_data' && report) {
    return (
      <div className="space-y-6 pb-24">
        <motion.button
          onClick={runAnalysis}
          className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700"
        >
          <Brain className="mr-2 inline-block h-5 w-5" />
          Tentar Reanalisar Caso
        </motion.button>

        <InlineBanner
          variant="error"
          title="Dados insuficientes"
          message={[
            'Nao foi possivel firmar uma neurolocalizacao segura com os dados registrados.',
            ...(report.neuroLocalization.missing || []).map((item) => `- ${item}`),
          ]}
        />
      </div>
    )
  }

  if (status === 'done' && report) {
    return (
      <div className="space-y-6 pb-24">
        <div className="flex flex-col gap-4 sm:flex-row">
          <motion.button
            onClick={handleExportPDF}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="h-5 w-5" />
            Exportar em PDF
          </motion.button>

          <motion.button
            onClick={runAnalysis}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Brain className="h-5 w-5" />
            Atualizar relatorio
          </motion.button>
        </div>

        <Card className="p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gold">
            <FileText className="h-5 w-5" />
            Identificacao
          </h3>
          <SummaryGrid items={patientSummaryItems} />
        </Card>

        <Card className="p-6">
          <h3 className="mb-3 text-lg font-semibold text-gold">Historia e sinais</h3>
          <SummaryGrid items={historySummaryItems} />
        </Card>

        <Card className="p-6">
          <h3 className="mb-3 text-lg font-semibold text-gold">Resumo do exame neurologico</h3>
          {examSections.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {examSections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-100">{section.title}</p>
                  <BulletList items={section.items} dotClassName="bg-cyan-400" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/90">{report.examSummary}</p>
          )}
        </Card>

        {reportError && (
          <InlineBanner variant="warning" title="Relatorio clinico indisponivel" message={reportError} />
        )}

        {parsedClinicalReport ? (
          <div className="space-y-5">
            <Card className="border-cyan-500/30 bg-[linear-gradient(135deg,rgba(8,47,73,0.42),rgba(17,24,39,0.9))] p-6 shadow-[0_24px_60px_rgba(6,182,212,0.12)]">
              <div>
                <h3 className="text-xl font-bold text-cyan-100">Relatorio Clinico</h3>
                <p className="mt-2 max-w-4xl text-sm leading-relaxed text-cyan-50/80">
                  Leitura integrada do caso para plantao: neurolocalizacao, prioridades imediatas e
                  diferenciais do mais provavel ao menos provavel, sempre cruzando exame, comorbidades,
                  exames prioritarios e conduta inicial.
                </p>
              </div>
            </Card>

            <Card className="border-cyan-500/30 bg-cyan-950/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-cyan-200">
                <Brain className="h-6 w-6" />
                Neurolocalizacao
              </h3>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Localizacao provavel"
                  value={parsedClinicalReport.neurolocalization.probableLocation}
                />
                <MetricCard label="Distribuicao" value={parsedClinicalReport.neurolocalization.distribution} />
                <MetricCard label="Padrao motor" value={parsedClinicalReport.neurolocalization.motorPattern} />
                <MetricCard label="Confianca" value={parsedClinicalReport.neurolocalization.confidence} />
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-black/20 p-5">
                <p className="mb-2 text-sm font-semibold text-cyan-200">Raciocinio de neurolocalizacao</p>
                <p className="text-sm leading-relaxed text-cyan-50/90">
                  {parsedClinicalReport.neurolocalization.reasoning || 'Nao informado'}
                </p>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <DifferentialSection
                  title="Achados que sustentam"
                  items={parsedClinicalReport.neurolocalization.supportiveFindings}
                  dotClassName="bg-emerald-400"
                  textClassName="text-emerald-50/90"
                />
                <DifferentialSection
                  title="Achados contraditorios"
                  items={parsedClinicalReport.neurolocalization.contradictoryFindings}
                  dotClassName="bg-orange-400"
                  textClassName="text-orange-50/90"
                />
              </div>
            </Card>

            {(parsedClinicalReport.priorities.length > 0 || parsedClinicalReport.criticalAlerts.length > 0) && (
              <div className="grid gap-4 xl:grid-cols-2">
                {parsedClinicalReport.priorities.length > 0 && (
                  <Card className="border-blue-500/20 bg-blue-950/10 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-blue-300">Condutas imediatas do plantao</h3>
                    <BulletList items={parsedClinicalReport.priorities} dotClassName="bg-blue-400" />
                  </Card>
                )}

                {parsedClinicalReport.criticalAlerts.length > 0 && (
                  <Card className="border-orange-500/20 bg-orange-950/10 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-orange-300">
                      <AlertTriangle className="h-5 w-5" />
                      Alertas clinicos criticos
                    </h3>
                    <BulletList items={parsedClinicalReport.criticalAlerts} dotClassName="bg-orange-400" />
                  </Card>
                )}
              </div>
            )}

            {parsedClinicalReport.differentials.length > 0 && (
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gold">
                  <CheckCircle2 className="h-6 w-6" />
                  Top 5 diagnosticos diferenciais
                </h3>

                {parsedClinicalReport.differentials.map((dx, index) => (
                  <Card key={`${dx.title}-${index}`} className="border-white/10 bg-slate-950/60 p-6">
                    <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {index + 1}. {dx.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">Categoria: {dx.category || 'Nao informada'}</p>
                      </div>
                      <div className="rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3 text-right">
                        <p className="text-xs uppercase tracking-[0.18em] text-gold/60">Probabilidade</p>
                        <p className="mt-1 text-2xl font-bold text-gold">{dx.probability ?? 0}%</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-cyan-500/10 bg-cyan-950/10 p-4">
                      <p className="mb-2 text-sm font-semibold text-cyan-200">Sintese clinica</p>
                      <p className="text-sm leading-relaxed text-slate-100/90">{dx.clinicalFit || 'Nao informado'}</p>
                    </div>

                    <div className="mt-5 grid gap-4 xl:grid-cols-2">
                      <DifferentialSection
                        title="Achados a favor"
                        items={dx.supportingFindings}
                        dotClassName="bg-emerald-400"
                        textClassName="text-emerald-50/90"
                      />
                      <DifferentialSection
                        title="Achados contra"
                        items={dx.opposingFindings}
                        dotClassName="bg-orange-400"
                        textClassName="text-orange-50/90"
                      />
                      <DifferentialSection
                        title="Exames priorizados"
                        items={dx.prioritizedDiagnostics}
                        dotClassName="bg-blue-400"
                      />
                      <DifferentialSection
                        title="Como avaliar este paciente no plantao"
                        items={dx.patientAssessment}
                        dotClassName="bg-sky-400"
                      />
                      <DifferentialSection
                        title="Monitorizacao e reavaliacao"
                        items={dx.monitoringPlan}
                        dotClassName="bg-violet-400"
                      />
                      <DifferentialSection
                        title="Tratamento e conduta"
                        items={dx.treatmentPlan}
                        dotClassName="bg-green-400"
                      />
                      <DifferentialSection
                        title="Farmacos que posso considerar"
                        items={dx.allowedDrugs}
                        dotClassName="bg-emerald-300"
                      />
                      <DifferentialSection
                        title="Farmacos a evitar ou ajustar"
                        items={dx.avoidDrugs}
                        dotClassName="bg-rose-400"
                      />
                    </div>

                    {dx.comorbidityIntegration.length > 0 && (
                      <div className="mt-5 rounded-2xl border border-indigo-500/20 bg-indigo-950/10 p-4">
                        <p className="mb-3 text-sm font-semibold text-indigo-200">
                          Como as comorbidades mudam a conduta
                        </p>
                        <BulletList items={dx.comorbidityIntegration} dotClassName="bg-indigo-400" />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {report.differentials.length > 5 && (
              <Card className="border-slate-500/20 bg-slate-950/40 p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-100">Outras hipoteses que ainda merecem radar</h3>
                <div className="grid gap-4 xl:grid-cols-2">
                  {report.differentials.slice(5, 12).map((dx, index) => (
                    <div key={`${dx.id}-${index}`} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{dx.name}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">
                            {formatCategoryLabel(dx.category)}
                          </p>
                        </div>
                        <span className="rounded-full border border-slate-400/20 bg-slate-400/10 px-3 py-1 text-xs font-semibold text-slate-200">
                          {dx.likelihood}%
                        </span>
                      </div>
                      {dx.why.length > 0 && (
                        <div className="mt-3">
                          <BulletList
                            items={dx.why.slice(0, 3)}
                            dotClassName="bg-slate-400"
                            textClassName="text-slate-200/85"
                          />
                        </div>
                      )}
                      {dx.diagnostics[0] && (
                        <div className="mt-4 rounded-xl border border-blue-500/15 bg-blue-950/10 p-3">
                          <p className="text-xs uppercase tracking-[0.14em] text-blue-300/80">Primeiro exame a priorizar</p>
                          <p className="mt-2 text-sm text-slate-100/90">
                            {dx.diagnostics[0].test}
                          </p>
                        </div>
                      )}
                      {dx.treatment[0]?.plan?.[0] && (
                        <div className="mt-3 rounded-xl border border-emerald-500/15 bg-emerald-950/10 p-3">
                          <p className="text-xs uppercase tracking-[0.14em] text-emerald-300/80">Primeira conduta</p>
                          <p className="mt-2 text-sm text-slate-100/90">
                            {dx.treatment[0].plan[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {(parsedClinicalReport.comorbidityImpact.alerts.length > 0 ||
              parsedClinicalReport.comorbidityImpact.cautions.length > 0 ||
              parsedClinicalReport.comorbidityImpact.recommendedTests.length > 0 ||
              parsedClinicalReport.comorbidityImpact.avoidOrAdjust.length > 0) && (
              <Card className="border-indigo-500/30 bg-indigo-900/10 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-300">
                  <AlertTriangle className="h-6 w-6" />
                  Pontos transversais de seguranca
                </h3>

                <div className="grid gap-4 xl:grid-cols-2">
                  <DifferentialSection
                    title="Alertas clinicos"
                    items={parsedClinicalReport.comorbidityImpact.alerts}
                    dotClassName="bg-orange-400"
                  />
                  <DifferentialSection
                    title="Cautelas terapeuticas"
                    items={parsedClinicalReport.comorbidityImpact.cautions}
                    dotClassName="bg-yellow-400"
                  />
                  <DifferentialSection
                    title="Exames recomendados"
                    items={parsedClinicalReport.comorbidityImpact.recommendedTests}
                    dotClassName="bg-blue-400"
                  />
                  <DifferentialSection
                    title="Evitar ou ajustar"
                    items={parsedClinicalReport.comorbidityImpact.avoidOrAdjust}
                    dotClassName="bg-rose-400"
                  />
                </div>
              </Card>
            )}

            {(parsedClinicalReport.limitations.length > 0 || parsedClinicalReport.references.length > 0) && (
              <div className="grid gap-4 xl:grid-cols-2">
                {parsedClinicalReport.limitations.length > 0 && (
                  <Card className="border-slate-500/20 bg-slate-900/40 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-slate-200">Limitacoes e dados faltantes</h3>
                    <BulletList
                      items={parsedClinicalReport.limitations}
                      dotClassName="bg-slate-400"
                      textClassName="text-slate-100/85"
                    />
                  </Card>
                )}

                {parsedClinicalReport.references.length > 0 && (
                  <Card className="border-fuchsia-500/20 bg-fuchsia-950/10 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-fuchsia-200">Base bibliografica considerada</h3>
                    <BulletList
                      items={parsedClinicalReport.references}
                      dotClassName="bg-fuchsia-400"
                      textClassName="text-slate-100/85"
                    />
                  </Card>
                )}
              </div>
            )}
          </div>
        ) : (
          <Card className="border-amber-500/20 bg-amber-950/10 p-6">
            <h3 className="mb-3 text-lg font-semibold text-amber-200">Relatorio bruto</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-amber-50/90">
              {clinicalReportText || 'Nao foi possivel gerar o relatorio clinico.'}
            </p>
          </Card>
        )}
      </div>
    )
  }

  return null
}
