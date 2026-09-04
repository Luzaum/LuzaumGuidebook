import React from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  MapPin,
  RefreshCw,
  Stethoscope,
} from 'lucide-react'
import { Card } from '../UI/Card'
import { InlineBanner } from '../UI/InlineBanner'
import { SaveToHistoryButton } from '../SaveToHistoryButton'
import { useCaseStore } from '../../stores/caseStore'
import { buildCaseReport } from '../../lib/analysis/report'
import { buildLocalClinicalCompanionReport } from '../../lib/report/localClinicalCompanion'
import { exportToPDF } from '../../lib/report/pdfExporter'
import { parseAiClinicalReport } from '../../lib/report/aiClinicalReportParser'
import type { CaseReport } from '../../types/analysis'
import {
  DISTRIBUTION_LABELS_PT,
  NEURO_AXIS_LABELS_PT,
} from '../../data/axisLabelsPt'
import { buildAlteredExamSections, buildFullExamSections } from '../../lib/exam/examDefaults'
import { MgcsSummaryBanner } from '../MgcsSummaryBanner'

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function MetricCard({
  label,
  value,
  variant = 'cyan',
}: {
  label: string
  value: string
  variant?: 'cyan' | 'emerald' | 'gold'
}) {
  const styles = {
    cyan: 'border-cyan-500/20 bg-cyan-950/20 text-cyan-50',
    emerald: 'border-emerald-500/25 bg-emerald-950/25 text-emerald-50',
    gold: 'border-gold/25 bg-gold/5 text-gold',
  }
  const labelStyles = {
    cyan: 'text-cyan-200/55',
    emerald: 'text-emerald-200/55',
    gold: 'text-gold/55',
  }

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className={`text-[11px] font-medium uppercase tracking-[0.16em] ${labelStyles[variant]}`}>{label}</p>
      <p className="mt-2 text-base font-semibold leading-snug">{value || 'Não informado'}</p>
    </div>
  )
}

function ConfidenceRing({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)))
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <div className="relative h-[84px] w-[84px]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 84 84" aria-hidden>
          <circle cx="42" cy="42" r={radius} fill="none" stroke="currentColor" strokeWidth="5" className="text-emerald-950/80" />
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            className="text-emerald-400"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-emerald-50">{pct}%</span>
        </div>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200/65">Confiança</span>
    </div>
  )
}

function HighlightStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-200/55">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-emerald-50">{value}</p>
      </div>
    </div>
  )
}

function DifferentialRankCard({
  rank,
  name,
  likelihood,
  category,
}: {
  rank: number
  name: string
  likelihood: number
  category: string
}) {
  const pct = Math.min(100, Math.max(0, Math.round(likelihood)))

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-emerald-500/25">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-xs font-bold text-emerald-200">
          {rank}
        </span>
        <span className="rounded-full border border-emerald-500/25 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-medium text-emerald-200/80">
          {category}
        </span>
      </div>
      <p className="text-sm font-semibold leading-snug text-slate-100">{name}</p>
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Probabilidade relativa</span>
          <span className="font-semibold text-emerald-200/90">~{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
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

function SummaryGrid({ items, compact }: { items: Array<{ label: string; value: string }>; compact?: boolean }) {
  return (
    <div className={`grid gap-2.5 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="rounded-xl border border-white/8 bg-slate-950/30 px-3.5 py-3"
        >
          {item.label ? (
            <>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-100/90">{item.value || 'Não informado'}</p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-slate-100/90">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  )
}

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

function formatCategoryLabel(category: string) {
  return CATEGORY_LABELS[category] || category
}

export function Step5Analysis() {
  const [compactAi, setCompactAi] = React.useState(true)
  const [examTab, setExamTab] = React.useState<'altered' | 'full'>('altered')
  const analysis = useCaseStore((s) => s.analysis)
  const setAnalysis = useCaseStore((s) => s.setAnalysis)
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)
  const mgcs = useCaseStore((s) => s.mgcs)

  const report: CaseReport | undefined = analysis?.report
  const clinicalReportText = analysis?.aiOpinion || null
  const reportError = analysis?.aiError || null
  const progress = analysis?.aiProgress || null
  const parsedClinicalReport = clinicalReportText ? parseAiClinicalReport(clinicalReportText) : null
  const status = analysis?.status || 'idle'
  const fullExamSections = buildFullExamSections(neuroExam as Record<string, unknown>)
  const alteredExamSections = buildAlteredExamSections(neuroExam as Record<string, unknown>)
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
        'Consolidando identificacao, histórico e exame neurologico em uma única leitura clínica.',
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
        'Ordenando os diferenciais mais provaveis e cruzando exames, monitorização e cautelas terapeuticas.',
        nextReport,
      )

      const nextClinicalReport = buildLocalClinicalCompanionReport(caseState, nextReport)

      await updateRunningState(
        78,
        'Montando relatorio clínico',
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
        aiError: parsed ? null : 'Não foi possível estruturar o relatorio clínico final. Gere novamente o caso.',
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Erro ao montar relatorio clínico local:', error)
      setAnalysis({
        status: 'done',
        report,
        aiOpinion: null,
        aiModelUsed: null,
        aiUsedFallback: false,
        aiCoverage: null,
        aiProgress: null,
        aiError: 'Não foi possível montar o relatório clínico.',
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
      alert('Não foi possível gerar o PDF. Tente novamente.')
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
          <h2 className="text-2xl font-bold text-foreground">Análise do caso</h2>
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

        <div className="flex justify-center">
          <SaveToHistoryButton />
        </div>
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
              <h3 className="text-xl font-semibold text-foreground">Preparando relatório clínico</h3>
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
            'Não foi possível firmar uma neurolocalizacao segura com os dados registrados.',
            ...(report.neuroLocalization.missing || []).map((item) => `- ${item}`),
          ]}
        />
      </div>
    )
  }

  if (status === 'done' && report) {
    return (
      <div className="space-y-5 pb-24">
        {/* Barra de ações */}
        <Card className="sticky top-2 z-10 border-white/10 bg-slate-950/85 p-3 shadow-lg backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                onClick={handleExportPDF}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-500/35 bg-blue-600/15 px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-blue-600/25"
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-4 w-4" />
                Exportar PDF
              </motion.button>
              <motion.button
                type="button"
                onClick={runAnalysis}
                className="inline-flex items-center gap-2 rounded-lg border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold/15"
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </motion.button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SaveToHistoryButton />
              <button
                type="button"
                onClick={() => setCompactAi((v) => !v)}
                className="rounded-lg border border-cyan-500/30 bg-cyan-950/25 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:border-cyan-400/45"
              >
                {compactAi ? 'Análise detalhada' : 'Modo resumo'}
              </button>
            </div>
          </div>
        </Card>

        <MgcsSummaryBanner mgcs={mgcs} />

        {report.neuroLocalization.status === 'ok' && (
          <Card className="overflow-hidden border-emerald-500/25 p-0 shadow-[0_16px_48px_rgba(16,185,129,0.08)]">
            <div className="border-b border-emerald-500/15 bg-gradient-to-br from-emerald-950/45 via-slate-950/90 to-slate-950 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/70">
                    Síntese do caso
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-emerald-50 sm:text-2xl">Resumo clínico</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-100/65">
                    Neurolocalização e diferenciais prioritários para apoio à conduta no plantão.
                  </p>
                </div>
                <ConfidenceRing value={report.neuroLocalization.confidence} />
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="space-y-2.5">
                <HighlightStat
                  icon={MapPin}
                  label="Localização principal"
                  value={NEURO_AXIS_LABELS_PT[report.neuroLocalization.primary]}
                />
                <HighlightStat
                  icon={Layers}
                  label="Distribuição"
                  value={DISTRIBUTION_LABELS_PT[report.neuroLocalization.distribution]}
                />
                {report.neuroLocalization.secondary && report.neuroLocalization.secondary.length > 0 && (
                  <div className="rounded-xl border border-emerald-500/15 bg-emerald-950/15 px-4 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-emerald-200/55">
                      Sobreposições
                    </p>
                    <p className="mt-1.5 text-sm text-emerald-50/90">
                      {report.neuroLocalization.secondary.map((a) => NEURO_AXIS_LABELS_PT[a]).join(' · ')}
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-white/8 bg-slate-950/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Interpretação
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-100/90">
                  {report.neuroLocalization.narrative}
                </p>
              </div>
            </div>

            {report.differentials.length > 0 && (
              <div className="border-t border-emerald-500/10 bg-slate-950/30 px-5 py-5 sm:px-6">
                <div className="mb-4 flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-emerald-300/80" />
                  <p className="text-sm font-semibold text-emerald-100">Três diferenciais mais prováveis</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {report.differentials.slice(0, 3).map((d, index) => (
                    <DifferentialRankCard
                      key={d.id}
                      rank={index + 1}
                      name={d.name}
                      likelihood={d.likelihood}
                      category={formatCategoryLabel(d.category)}
                    />
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Dados do caso — duas colunas */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="p-5 sm:p-6">
            <SectionHeader icon={FileText} title="Identificação" subtitle="Perfil do paciente" />
            <SummaryGrid items={patientSummaryItems} compact />
          </Card>

          <Card className="p-5 sm:p-6">
            <SectionHeader icon={Brain} title="História e sinais" subtitle="Queixa, curso temporal e observações" />
            <SummaryGrid items={historySummaryItems} compact />
          </Card>
        </div>

        {/* Exame neurológico — abas */}
        <Card className="p-5 sm:p-6">
          <SectionHeader
            icon={Activity}
            title="Exame neurológico"
            subtitle="Alterações registradas e registro completo por secção"
          />

          <div className="mb-4 inline-flex rounded-xl border border-border bg-background/50 p-1">
            <button
              type="button"
              onClick={() => setExamTab('altered')}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                examTab === 'altered'
                  ? 'bg-gold/15 text-gold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Alterações
              {alteredExamSections.length > 0 && (
                <span className="ml-1.5 rounded-full bg-gold/20 px-1.5 py-0.5 text-[10px]">{alteredExamSections.length}</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setExamTab('full')}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                examTab === 'full'
                  ? 'bg-slate-700/50 text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Exame completo
            </button>
          </div>

          {examTab === 'altered' ? (
            alteredExamSections.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {alteredExamSections.map((section) => (
                  <div key={section.title} className="rounded-xl border border-gold/20 bg-gold/5 p-4">
                    <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gold/90">{section.title}</p>
                    <BulletList items={section.items} dotClassName="bg-gold" textClassName="text-gold/90" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/15 px-4 py-3 text-sm text-emerald-200/90">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Nenhuma alteração registrada — exame presumido normal.
              </div>
            )
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {fullExamSections.map((section) => (
                <div key={section.title} className="rounded-xl border border-white/8 bg-slate-950/35 p-4">
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-300">{section.title}</p>
                  <BulletList items={section.items} dotClassName="bg-slate-500" />
                </div>
              ))}
            </div>
          )}
        </Card>

        {reportError && (
          <InlineBanner variant="warning" title="Relatório clínico indisponível" message={reportError} />
        )}

        {parsedClinicalReport ? (
          <div className="space-y-5">
            <Card className="border-cyan-500/30 bg-[linear-gradient(135deg,rgba(8,47,73,0.42),rgba(17,24,39,0.9))] p-6 shadow-[0_24px_60px_rgba(6,182,212,0.12)]">
              <div>
                <h3 className="text-xl font-bold text-cyan-100">Relatório clínico</h3>
                <p className="mt-2 max-w-4xl text-sm leading-relaxed text-cyan-50/80">
                  {compactAi
                    ? 'Síntese: localização provável, DDx priorizados e conduta — expanda para listas completas de achados e exames.'
                    : 'Leitura integrada do caso para plantao: neurolocalizacao, prioridades imediatas e diferenciais do mais provável ao menos provável, sempre cruzando exame, comorbidades, exames prioritarios e conduta inicial.'}
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
                  label="Localizacao provável"
                  value={parsedClinicalReport.neurolocalization.probableLocation}
                />
                <MetricCard label="Distribuicao" value={parsedClinicalReport.neurolocalization.distribution} />
                <MetricCard label="Padrão motor" value={parsedClinicalReport.neurolocalization.motorPattern} />
                <MetricCard label="Confiança" value={parsedClinicalReport.neurolocalization.confidence} />
              </div>

              {compactAi ? (
                <details className="mt-5 rounded-2xl border border-cyan-500/20 bg-black/20 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-cyan-200">
                    Raciocínio e achados (expandir)
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-cyan-50/90">
                    {parsedClinicalReport.neurolocalization.reasoning || 'Não informado'}
                  </p>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
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
                </details>
              ) : (
                <>
                  <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-black/20 p-5">
                    <p className="mb-2 text-sm font-semibold text-cyan-200">Raciocinio de neurolocalizacao</p>
                    <p className="text-sm leading-relaxed text-cyan-50/90">
                      {parsedClinicalReport.neurolocalization.reasoning || 'Não informado'}
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
                </>
              )}
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
                        <p className="mt-1 text-sm text-muted-foreground">Categoria: {dx.category || 'Não informada'}</p>
                      </div>
                      <div className="rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3 text-right">
                        <p className="text-xs uppercase tracking-[0.18em] text-gold/60">Probabilidade</p>
                        <p className="mt-1 text-2xl font-bold text-gold">{dx.probability ?? 0}%</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-cyan-500/10 bg-cyan-950/10 p-4">
                      <p className="mb-2 text-sm font-semibold text-cyan-200">Sintese clinica</p>
                      <p
                        className={`text-sm leading-relaxed text-slate-100/90 ${compactAi ? 'line-clamp-4' : ''}`}
                      >
                        {dx.clinicalFit || 'Não informado'}
                      </p>
                    </div>

                    {compactAi ? null : (
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
                        title="Monitorização e reavaliação"
                        items={dx.monitoringPlan}
                        dotClassName="bg-violet-400"
                      />
                      <DifferentialSection
                        title="Tratamento e conduta"
                        items={dx.treatmentPlan}
                        dotClassName="bg-green-400"
                      />
                      <DifferentialSection
                        title="Fármacos que posso considerar"
                        items={dx.allowedDrugs}
                        dotClassName="bg-emerald-300"
                      />
                      <DifferentialSection
                        title="Fármacos a evitar ou ajustar"
                        items={dx.avoidDrugs}
                        dotClassName="bg-rose-400"
                      />
                    </div>
                    )}

                    {!compactAi && dx.comorbidityIntegration.length > 0 && (
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
            <h3 className="mb-3 text-lg font-semibold text-amber-200">Relatório bruto</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-amber-50/90">
              {clinicalReportText || 'Não foi possível gerar o relatorio clínico.'}
            </p>
          </Card>
        )}
      </div>
    )
  }

  return null
}
