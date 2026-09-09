import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  FileCheck,
  FileDown,
  FileText,
  Layers,
  MapPin,
  Pill,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import { Card } from '../UI/Card'
import { InlineBanner } from '../UI/InlineBanner'
import { SaveToHistoryButton } from '../SaveToHistoryButton'
import { useCaseStore } from '../../stores/caseStore'
import { buildCaseReport } from '../../lib/analysis/report'
import { buildLocalClinicalCompanionReport } from '../../lib/report/localClinicalCompanion'
import { exportToPDF, exportExamOnlyPDF } from '../../lib/report/pdfExporter'
import { parseAiClinicalReport } from '../../lib/report/aiClinicalReportParser'
import { buildQuickExamReportText } from '../../lib/quickExamReportText'
import type { CaseReport } from '../../types/analysis'
import {
  DISTRIBUTION_LABELS_PT,
  NEURO_AXIS_LABELS_PT,
} from '../../data/axisLabelsPt'
import { buildAlteredExamSections, buildFullExamSections } from '../../lib/exam/examDefaults'
import { MgcsSummaryBanner } from '../MgcsSummaryBanner'
import { NeuralScanAnimation } from '../Step5/NeuralScanAnimation'
import { NeuroLocalizationMatrixCard } from '../Step5/NeuroLocalizationMatrixCard'

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
    cyan: 'border-cyan-500/30 bg-cyan-500/10 text-foreground dark:bg-cyan-950/20',
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-foreground dark:bg-emerald-950/20',
    gold: 'border-gold/35 bg-gold/10 text-foreground dark:bg-gold/10',
  }
  const labelStyles = {
    cyan: 'text-cyan-700 dark:text-cyan-300',
    emerald: 'text-emerald-700 dark:text-emerald-300',
    gold: 'text-gold font-bold',
  }

  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition-all ${styles[variant]}`}>
      <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${labelStyles[variant]}`}>{label}</p>
      <p className="mt-2 text-base font-semibold leading-snug text-foreground">{value || 'Não informado'}</p>
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
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted/60"
          />
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className="text-emerald-500"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-foreground">{pct}%</span>
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
        Concordância
      </span>
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
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{value}</p>
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
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:border-gold/50 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-xs font-bold text-gold">
          #{rank}
        </span>
        <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/80">
          {category}
        </span>
      </div>
      <p className="text-sm font-bold leading-snug text-foreground">{name}</p>
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Probabilidade relativa</span>
          <span className="font-bold text-gold">~{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-gold"
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/15 text-gold shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}

function BulletList({
  items,
  dotClassName,
  textClassName = 'text-foreground/90',
}: {
  items: string[]
  dotClassName: string
  textClassName?: string
}) {
  return (
    <ul className={`space-y-2 text-xs sm:text-sm leading-relaxed ${textClassName}`}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-start gap-2">
          <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${dotClassName}`} />
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
    <div className="rounded-2xl border border-border bg-muted/30 p-4 shadow-sm">
      <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-wide text-foreground">{title}</p>
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
          className="rounded-xl border border-border bg-card/80 p-3.5 shadow-sm"
        >
          {item.label ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{item.label}</p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-foreground">{item.value || 'Não informado'}</p>
            </>
          ) : (
            <p className="text-sm font-medium leading-relaxed text-foreground">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  )
}

const CATEGORY_LABELS: Record<string, string> = {
  INFLAMATORIA: 'Inflamatória',
  INFECCIOSA: 'Infecciosa',
  NEOPLASICA: 'Neoplásica',
  VASCULAR: 'Vascular',
  DEGENERATIVA: 'Degenerativa',
  TRAUMATICA: 'Traumática',
  TOXICO_METABOLICA: 'Tóxico-metabólica',
  COMPRESSIVA: 'Compressiva',
  IDIOPATICA: 'Idiopática',
  ENDOCRINA: 'Endócrina',
  ANOMALIA: 'Anomalia Congênita',
}

function formatCategoryLabel(category: string) {
  return CATEGORY_LABELS[category] || category
}

export function Step5Analysis() {
  const [copied, setCopied] = React.useState(false)
  const [compactAi, setCompactAi] = React.useState(false)
  const [examTab, setExamTab] = React.useState<'altered' | 'full'>('altered')
  const [activeTab, setActiveTab] = React.useState<'exam_report' | 'matrix' | 'differentials' | 'management'>('exam_report')

  const analysis = useCaseStore((s) => s.analysis)
  const setAnalysis = useCaseStore((s) => s.setAnalysis)
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)
  const mgcs = useCaseStore((s) => s.mgcs)

  const report: CaseReport | undefined = analysis?.report
  const clinicalReportText = analysis?.aiOpinion || null
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
    await sleep(220)
  }

  const runAnalysis = async () => {
    const caseState = { patient, complaint, neuroExam }

    try {
      await updateRunningState(
        15,
        'Organizando dados semiológicos',
        'Consolidando resenha, queixa temporal e exame neurológico sistemático.',
      )

      const nextReport = buildCaseReport(caseState)

      await updateRunningState(
        40,
        'Cruzando matriz de neurolocalização',
        'Avaliando NMS vs NMI, reações posturais e pares cranianos conforme de Lahunta & Dewey.',
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
        68,
        'Estruturando hipóteses conceituais DAMN-IT-V',
        'Ponderando diagnósticos diferenciais conforme literatura neurológica veterinária.',
        nextReport,
      )

      const nextClinicalReport = buildLocalClinicalCompanionReport(caseState, nextReport)

      await updateRunningState(
        90,
        'Compilando laudo e condutas',
        'Organizando exame físico, neurolocalização e plano terapêutico conceitual.',
        nextReport,
      )

      const parsed = parseAiClinicalReport(nextClinicalReport)

      await updateRunningState(
        100,
        'Laudo pronto',
        'Validação concluída.',
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
        aiError: parsed ? null : 'Não foi possível estruturar o relatório clínico final.',
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Erro ao montar relatório clínico:', error)
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

  const handleCopyExamReport = async () => {
    const text = buildQuickExamReportText(patient, complaint, neuroExam as Record<string, unknown>, { kind: 'full' })
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (err) {
      console.error('Falha ao copiar:', err)
    }
  }

  const handleExportExamOnlyPDF = () => {
    const caseState = { patient, complaint, neuroExam }
    try {
      exportExamOnlyPDF(caseState, report)
    } catch (error) {
      console.error('Erro ao gerar PDF do Exame:', error)
      alert('Não foi possível gerar o PDF do Exame. Tente novamente.')
    }
  }

  const handleExportFullPDF = () => {
    if (!report) return
    const caseState = { patient, complaint, neuroExam }
    try {
      exportToPDF(report, caseState, clinicalReportText)
    } catch (error) {
      console.error('Erro ao gerar PDF Completo:', error)
      alert('Não foi possível gerar o PDF. Tente novamente.')
    }
  }

  // IDLE STATE
  if (status === 'idle') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 pb-24 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <div className="mx-auto relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-gold via-amber-500 to-amber-600 shadow-[0_0_40px_rgba(245,197,66,0.45)]">
            <Brain className="h-12 w-12 text-slate-950" />
            <motion.div
              className="absolute -inset-2 rounded-3xl border border-gold/50"
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Neurolocalização & Laudo do Exame
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Consolide a identificação do paciente, queixa clínica e o exame neurológico sistemático.
            O NeuroVet auxilia na <strong>neurolocalização anatômica (NMS vs NMI)</strong> segundo os tratados
            de <em>de Lahunta</em> e <em>Dewey &amp; da Costa</em>, permitindo copiar o laudo formatado e exportar o PDF clínico.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <motion.button
            onClick={runAnalysis}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-gold via-amber-400 to-amber-500 px-8 py-4 text-base sm:text-lg font-bold text-slate-950 shadow-[0_12px_32px_rgba(245,197,66,0.35)] transition-all hover:brightness-105"
          >
            <Sparkles className="h-5 w-5 text-slate-950" />
            <span>Gerar Neurolocalização & Laudo</span>
          </motion.button>
        </div>

        <div className="flex justify-center pt-2">
          <SaveToHistoryButton />
        </div>
      </div>
    )
  }

  // RUNNING STATE WITH SCAN ANIMATION
  if (status === 'running') {
    const progressValue = Math.min(100, Math.max(8, progress?.value || 10))
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pb-24">
        <NeuralScanAnimation
          progressValue={progressValue}
          stageText={progress?.stage}
          detailText={progress?.detail}
        />
      </div>
    )
  }

  // INSUFFICIENT DATA
  if (status === 'insufficient_data' && report) {
    return (
      <div className="space-y-6 pb-24 max-w-2xl mx-auto">
        <motion.button
          onClick={runAnalysis}
          className="w-full rounded-2xl bg-gradient-to-r from-gold to-amber-500 px-8 py-4 text-base font-bold text-slate-950 shadow-lg transition-all hover:brightness-105"
        >
          <Brain className="mr-2 inline-block h-5 w-5" />
          Tentar Reanalisar Caso
        </motion.button>

        <InlineBanner
          variant="error"
          title="Dados insuficientes para neurolocalização"
          message={[
            'Não foi possível estabelecer uma neurolocalização consistente com os dados preenchidos.',
            ...(report.neuroLocalization.missing || []).map((item) => `- ${item}`),
          ]}
        />
      </div>
    )
  }

  // DONE STATE: FOCUSED DASHBOARD
  if (status === 'done' && report) {
    return (
      <div className="space-y-6 pb-24">
        {/* Barra de Controle Superior Sticky com Ações Primárias */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl pt-2 pb-3 border-b border-border/80 -mx-4 px-4 sm:-mx-6 sm:px-6 shadow-sm space-y-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Ações Rápidas em Destaque */}
            <div className="flex flex-wrap items-center gap-2">
              <motion.button
                type="button"
                onClick={handleCopyExamReport}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold shadow-sm transition-all ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copiado para a Área de Transferência!' : 'Copiar Ficha & Exame'}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleExportExamOnlyPDF}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-blue-800 dark:text-blue-300 transition hover:bg-blue-500/20 shadow-sm"
                whileTap={{ scale: 0.97 }}
                title="Exporta PDF direto com identificação do paciente e exame neurológico completo para prontuário"
              >
                <FileDown className="h-4 w-4" />
                Exportar PDF (Exame & Paciente)
              </motion.button>

              <motion.button
                type="button"
                onClick={handleExportFullPDF}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-muted/50 transition"
                whileTap={{ scale: 0.97 }}
                title="Exporta PDF estendido contendo também a análise de diferenciais DAMN-IT-V e condutas"
              >
                <Download className="h-4 w-4 text-gold" />
                PDF Completo (+ Diferenciais)
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <motion.button
                type="button"
                onClick={runAnalysis}
                className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-gold transition hover:bg-gold/20"
                whileTap={{ scale: 0.97 }}
              >
                <RefreshCw className="h-4 w-4" />
                Reanalisar
              </motion.button>
              <SaveToHistoryButton />
            </div>
          </div>

          {/* Abas de Navegação */}
          <div className="flex overflow-x-auto gap-2 pt-1 no-scrollbar border-t border-border/40">
            {[
              { id: 'exam_report', label: 'Neurolocalização & Exame', icon: FileCheck },
              { id: 'matrix', label: 'Guia Anatômico (Matriz NMS/NMI)', icon: BookOpen },
              { id: 'differentials', label: 'Opinião Conceitual (DAMN-IT-V)', icon: Stethoscope },
              { id: 'management', label: 'Conduta de Plantão & Alertas', icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gold text-slate-950 shadow-md ring-2 ring-gold/40'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <MgcsSummaryBanner mgcs={mgcs} />

        {/* TAB 1: NEUROLOCALIZAÇÃO & RELATÓRIO DO EXAME (FOCO PRINCIPAL DO APP) */}
        {activeTab === 'exam_report' && (
          <div className="space-y-6">
            {/* Cartão Principal de Neurolocalização Topográfica */}
            {report.neuroLocalization.status === 'ok' && (
              <Card className="overflow-hidden p-0 border-border bg-card shadow-lg">
                <div className="border-b border-border/80 bg-gradient-to-r from-emerald-500/15 via-gold/10 to-transparent p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        SÍNTESE TOPOGRÁFICA DETERMINÍSTICA
                      </div>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold text-foreground">
                        {NEURO_AXIS_LABELS_PT[report.neuroLocalization.primary]}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                        Classificação fundamentada nos tratados veterinários (<em>de Lahunta</em> e <em>Dewey &amp; da Costa</em>) a partir dos reflexos espinhais e respostas posturais.
                      </p>
                    </div>
                    <ConfidenceRing value={report.neuroLocalization.confidence} />
                  </div>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                  <div className="space-y-3">
                    <HighlightStat
                      icon={MapPin}
                      label="Localização Anatômica Sugerida"
                      value={NEURO_AXIS_LABELS_PT[report.neuroLocalization.primary]}
                    />
                    <HighlightStat
                      icon={Layers}
                      label="Distribuição Anatômica"
                      value={DISTRIBUTION_LABELS_PT[report.neuroLocalization.distribution]}
                    />
                    {report.neuroLocalization.secondary && report.neuroLocalization.secondary.length > 0 && (
                      <div className="rounded-2xl border border-border bg-muted/30 p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          Sobreposições Possíveis
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-foreground">
                          {report.neuroLocalization.secondary.map((a) => NEURO_AXIS_LABELS_PT[a]).join(' · ')}
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('matrix')}
                        className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:underline"
                      >
                        <BookOpen className="h-4 w-4" />
                        Ver tabela comparativa NMS/NMI para todos os 8 eixos &rarr;
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                      Raciocínio Clínico Semiologia
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 pt-1">
                      {report.neuroLocalization.narrative}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Identificação e Queixa */}
            <div className="grid gap-5 lg:grid-cols-2">
              <Card className="p-5 sm:p-6">
                <SectionHeader icon={FileText} title="Identificação do Paciente" subtitle="Resenha e estágio de vida" />
                <SummaryGrid items={patientSummaryItems} compact />
              </Card>

              <Card className="p-5 sm:p-6">
                <SectionHeader icon={Brain} title="História e Sinais Clínicos" subtitle="Queixa e padrão temporal" />
                <SummaryGrid items={historySummaryItems} compact />
              </Card>
            </div>

            {/* Exame Neurológico - Alterações vs Completo */}
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <SectionHeader
                  icon={Activity}
                  title="Registro do Exame Neurológico"
                  subtitle="Achados semiológicos organizados por etapa"
                />

                <div className="inline-flex rounded-2xl border border-border bg-muted/50 p-1 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setExamTab('altered')}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                      examTab === 'altered'
                        ? 'bg-gold text-slate-950 shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Alterações Registradas
                    {alteredExamSections.length > 0 && (
                      <span className="ml-1.5 rounded-full bg-slate-950/20 px-1.5 py-0.5 text-[10px] font-extrabold">
                        {alteredExamSections.length}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExamTab('full')}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                      examTab === 'full'
                        ? 'bg-gold text-slate-950 shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Exame Completo
                  </button>
                </div>
              </div>

              {examTab === 'altered' ? (
                alteredExamSections.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {alteredExamSections.map((section) => (
                      <div key={section.title} className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gold">{section.title}</p>
                        <BulletList items={section.items} dotClassName="bg-gold" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    Nenhuma alteração registrada — exame físico presumido sem déficits focais evidentes.
                  </div>
                )
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {fullExamSections.map((section) => (
                    <div key={section.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{section.title}</p>
                      <BulletList items={section.items} dotClassName="bg-muted-foreground" />
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Banner de Chamada para Opinião Conceitual se o clínico quiser aprofundar */}
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">Deseja consultar hipóteses DAMN-IT-V e condutas de plantão?</p>
                <p className="text-xs text-muted-foreground">
                  Consulte os diagnósticos diferenciais, exames sugeridos e guia farmacológico baseados na literatura médica (sem IA).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('differentials')}
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-105 whitespace-nowrap shadow-sm"
              >
                <Stethoscope className="h-4 w-4" />
                Ver Diferenciais &amp; Conduta
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: GUIA DIDÁTICO DE NEUROLOCALIZAÇÃO */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <NeuroLocalizationMatrixCard
              detectedAxis={report.neuroLocalization.primary}
              confidence={report.neuroLocalization.confidence}
            />
          </div>
        )}

        {/* TAB 3: DIFERENCIAIS DAMN-IT-V CONCEITUAIS (LITERATURA MÉDICA / SEM IA) */}
        {activeTab === 'differentials' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                💡 <strong>Opinião Conceitual Baseada em Literatura:</strong> As hipóteses abaixo são derivadas deterministicamente dos tratados de <em>de Lahunta (Veterinary Neuroanatomy and Clinical Neurology)</em> e <em>Dewey &amp; da Costa (Practical Guide to Canine and Feline Neurology)</em> cruzando espécie, faixa etária, curso temporal e topografia. <strong>Nenhuma Inteligência Artificial generativa é utilizada.</strong>
              </p>
            </div>

            {parsedClinicalReport?.differentials && parsedClinicalReport.differentials.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-gold" />
                    Diagnósticos Diferenciais DAMN-IT-V
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCompactAi((v) => !v)}
                    className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-gold/50"
                  >
                    {compactAi ? 'Expandir Todos os Detalhes' : 'Modo Resumido'}
                  </button>
                </div>

                {parsedClinicalReport.differentials.map((dx, index) => (
                  <Card key={`${dx.title}-${index}`} className="border-border bg-card p-5 sm:p-6 shadow-md space-y-4">
                    <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold/20 text-xs font-bold text-gold">
                            {index + 1}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-foreground">{dx.title}</h4>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Categoria Etiológica: <strong className="text-foreground">{dx.category || 'Geral'}</strong>
                        </p>
                      </div>
                      <div className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-2 text-left sm:text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Probabilidade Relativa</p>
                        <p className="text-xl font-extrabold text-gold">{dx.probability ?? 0}%</p>
                      </div>
                    </div>

                    {/* Síntese Clínica */}
                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 dark:bg-cyan-950/20 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                        Síntese Semiologia & Encaixe
                      </p>
                      <p className="mt-1.5 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {dx.clinicalFit || 'Não informado'}
                      </p>
                    </div>

                    {/* Detalhes Clínicos */}
                    {!compactAi && (
                      <div className="grid gap-4 md:grid-cols-2">
                        <DifferentialSection
                          title="Achados a Favor"
                          items={dx.supportingFindings}
                          dotClassName="bg-emerald-500"
                        />
                        <DifferentialSection
                          title="Achados Contra / Incomuns"
                          items={dx.opposingFindings}
                          dotClassName="bg-orange-500"
                        />
                        <DifferentialSection
                          title="Exames Priorizados"
                          items={dx.prioritizedDiagnostics}
                          dotClassName="bg-blue-500"
                        />
                        <DifferentialSection
                          title="Tratamento & Conduta de Plantão"
                          items={dx.treatmentPlan}
                          dotClassName="bg-gold"
                        />
                        <DifferentialSection
                          title="Fármacos a Considerar"
                          items={dx.allowedDrugs}
                          dotClassName="bg-emerald-500"
                        />
                        <DifferentialSection
                          title="Fármacos a Evitar / Cautela"
                          items={dx.avoidDrugs}
                          dotClassName="bg-red-500"
                        />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                Diferenciais estruturados disponíveis após gerar a análise.
              </Card>
            )}
          </div>
        )}

        {/* TAB 4: CONDUTA DE PLANTÃO & ALERTAS */}
        {activeTab === 'management' && (
          <div className="space-y-6">
            {parsedClinicalReport && (
              <>
                {/* Condutas Imediatas e Alertas */}
                <div className="grid gap-5 md:grid-cols-2">
                  {parsedClinicalReport.priorities.length > 0 && (
                    <Card className="border-blue-500/30 bg-card p-5 sm:p-6 shadow-md">
                      <SectionHeader
                        icon={Activity}
                        title="Prioridades Imediatas de Plantão"
                        subtitle="Manejo agudo e estabilização clínica"
                      />
                      <BulletList items={parsedClinicalReport.priorities} dotClassName="bg-blue-500" />
                    </Card>
                  )}

                  {parsedClinicalReport.criticalAlerts.length > 0 && (
                    <Card className="border-red-500/30 bg-card p-5 sm:p-6 shadow-md">
                      <SectionHeader
                        icon={AlertTriangle}
                        title="Alertas Críticos de Segurança"
                        subtitle="Sinais de gravidade e contraindicações"
                      />
                      <BulletList items={parsedClinicalReport.criticalAlerts} dotClassName="bg-red-500" />
                    </Card>
                  )}
                </div>

                {/* Comorbidades & Segurança Terapêutica */}
                {(parsedClinicalReport.comorbidityImpact.alerts.length > 0 ||
                  parsedClinicalReport.comorbidityImpact.cautions.length > 0 ||
                  parsedClinicalReport.comorbidityImpact.recommendedTests.length > 0 ||
                  parsedClinicalReport.comorbidityImpact.avoidOrAdjust.length > 0) && (
                  <Card className="border-border bg-card p-5 sm:p-6 shadow-md space-y-4">
                    <SectionHeader
                      icon={ShieldAlert}
                      title="Segurança Terapêutica & Comorbidades"
                      subtitle="Ajustes de dose e precauções clínicas"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <DifferentialSection
                        title="Alertas de Comorbidade"
                        items={parsedClinicalReport.comorbidityImpact.alerts}
                        dotClassName="bg-orange-500"
                      />
                      <DifferentialSection
                        title="Cautelas Terapêuticas"
                        items={parsedClinicalReport.comorbidityImpact.cautions}
                        dotClassName="bg-yellow-500"
                      />
                      <DifferentialSection
                        title="Exames Complementares"
                        items={parsedClinicalReport.comorbidityImpact.recommendedTests}
                        dotClassName="bg-blue-500"
                      />
                      <DifferentialSection
                        title="Fármacos a Evitar / Ajustar"
                        items={parsedClinicalReport.comorbidityImpact.avoidOrAdjust}
                        dotClassName="bg-red-500"
                      />
                    </div>
                  </Card>
                )}

                {/* Referências Bibliográficas dos Tratados */}
                {parsedClinicalReport.references.length > 0 && (
                  <Card className="border-border bg-card p-5 sm:p-6 shadow-md">
                    <SectionHeader
                      icon={BookOpen}
                      title="Base Bibliográfica de Referência"
                      subtitle="Tratados de Neurologia Veterinária"
                    />
                    <BulletList items={parsedClinicalReport.references} dotClassName="bg-gold" />
                  </Card>
                )}
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  return null
}
