import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, CheckCircle2, Cpu, Dna, Eye, ShieldAlert, Sparkles, Stethoscope } from 'lucide-react'

interface NeuralScanAnimationProps {
  progressValue: number
  stageText?: string
  detailText?: string
}

const NEURO_SCAN_STEPS = [
  {
    id: 'signalment',
    label: 'Resenha & Temporalidade',
    icon: Dna,
    desc: 'Cruzando idade, espécie e curso clínico (peragudo/agudo/crônico)',
    threshold: 15,
  },
  {
    id: 'neuroaxis',
    label: 'Mapeamento de Neuroeixo',
    icon: Brain,
    desc: 'Diferenciação NMS vs NMI (C1-C5, C6-T2, T3-L3, L4-S3 ou Encéfalo)',
    threshold: 35,
  },
  {
    id: 'cranial_reflexes',
    label: 'Reflexos & Pares Cranianos',
    icon: Eye,
    desc: 'Análise de tronco encefálico, reflexos miotáticos e propriocepção',
    threshold: 60,
  },
  {
    id: 'damnitv',
    label: 'Hierarquização DAMN-IT-V',
    icon: Stethoscope,
    desc: 'Etiologias mais prováveis segundo Dewey & de Lahunta',
    threshold: 82,
  },
  {
    id: 'action_plan',
    label: 'Conduta de Plantão & Alertas',
    icon: ShieldAlert,
    desc: 'Estruturação de exames prioritários e cautelas terapêuticas',
    threshold: 96,
  },
]

export function NeuralScanAnimation({
  progressValue,
  stageText,
  detailText,
}: NeuralScanAnimationProps) {
  const [synapsePulse, setSynapsePulse] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSynapsePulse((p) => (p + 1) % 6)
    }, 450)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Scanner Visual Interativo */}
      <div className="relative overflow-hidden rounded-3xl border border-gold/35 bg-gradient-to-b from-card/95 via-card/85 to-card/95 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        {/* Glow ambient effects */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Neural Node Scanner Centerpiece */}
          <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
            {/* Outer pulsating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            {/* Second reversed ring */}
            <motion.div
              className="absolute inset-2 rounded-full border border-cyan-400/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Pulse Wave */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gold/10"
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Neural Synapse Center Icon */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-gold/30 via-amber-500/20 to-cyan-500/20 shadow-[0_0_30px_rgba(245,197,66,0.35)] border border-gold/50 backdrop-blur-md">
              <Brain className="h-10 w-10 text-gold animate-pulse" />
            </div>

            {/* Synaptic nodes */}
            {[0, 60, 120, 180, 240, 300].map((deg, idx) => {
              const rad = (deg * Math.PI) / 180
              const x = Math.cos(rad) * 58
              const y = Math.sin(rad) * 58
              const isFired = synapsePulse === idx
              return (
                <motion.div
                  key={deg}
                  className={`absolute h-3 w-3 rounded-full transition-all duration-300 ${
                    isFired
                      ? 'bg-gold ring-4 ring-gold/40 scale-125 shadow-[0_0_12px_rgba(245,197,66,0.9)]'
                      : 'bg-muted-foreground/30'
                  }`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                />
              )
            })}
          </div>

          {/* Heading and Stage Info */}
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              <Cpu className="h-3.5 w-3.5 animate-spin" />
              SÍNTESE CLÍNICA NEUROLÓGICA EM CURSO
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {stageText || 'Processando achados semiológicos...'}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {detailText || 'Correlacionando queixa, neuroanatomia e reflexos com a literatura de referência.'}
            </p>
          </div>

          {/* Main Progress Bar with percentage */}
          <div className="mt-6 w-full max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
              <span className="flex items-center gap-1.5 text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Matriz de Neurolocalização
              </span>
              <span className="font-mono text-base font-bold text-gold">{Math.round(progressValue)}%</span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted border border-border/80">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-gold to-cyan-400 shadow-[0_0_16px_rgba(245,197,66,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(5, progressValue))}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Telemetry Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {NEURO_SCAN_STEPS.map((step) => {
          const isDone = progressValue >= step.threshold
          const isCurrent =
            progressValue < step.threshold &&
            (step === NEURO_SCAN_STEPS[0] ||
              progressValue >= NEURO_SCAN_STEPS[NEURO_SCAN_STEPS.indexOf(step) - 1]?.threshold)
          const Icon = step.icon

          return (
            <div
              key={step.id}
              className={`rounded-2xl border p-4 transition-all duration-300 ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/20 shadow-sm'
                  : isCurrent
                    ? 'border-gold/50 bg-gold/10 ring-1 ring-gold/30 shadow-[0_0_16px_rgba(245,197,66,0.12)]'
                    : 'border-border bg-card/60 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : isCurrent
                        ? 'bg-gold/20 text-gold animate-bounce'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs font-bold leading-snug ${isDone ? 'text-foreground' : isCurrent ? 'text-gold' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    {isDone && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        OK
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
