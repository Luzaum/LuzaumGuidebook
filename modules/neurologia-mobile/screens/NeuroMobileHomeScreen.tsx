import React from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope, Database, Zap, History, Activity, Sparkles } from 'lucide-react'
import { useCaseStore } from '../../neurologia/stores/caseStore'

export function NeuroMobileHomeScreen() {
  const currentStep = useCaseStore((s) => s.currentStep)
  const patient = useCaseStore((s) => s.patient)

  const hasActiveExam = patient.species !== null

  return (
    <div className="space-y-6">
      {/* Brand Hero */}
      <div className="text-center py-4">
        <img
          src="/apps/NEURO.png"
          alt="NeuroVet"
          className="h-28 mx-auto object-contain drop-shadow-[0_0_12px_rgba(245,197,66,0.35)]"
        />
        <h2 className="text-2xl font-black text-foreground mt-2">Neuro Mobile</h2>
        <p className="text-xs text-muted-foreground mt-1 px-4">
          Neurologia veterinária clínica na palma da sua mão.
        </p>
      </div>

      {/* Active Exam Banner */}
      {hasActiveExam && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3.5 flex items-center justify-between text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-gold" /> Exame em andamento
            </p>
            <p className="text-muted-foreground text-[11px]">
              Etapa {currentStep}/5 · {patient.species === 'dog' ? 'Cão' : 'Gato'}
            </p>
          </div>
          <Link
            to="/neuro-mobile/exame"
            className="px-3 py-1.5 rounded-lg bg-gold text-black font-bold hover:opacity-95 active:scale-95 transition-all"
          >
            Continuar
          </Link>
        </div>
      )}

      {/* Main Grid Navigation */}
      <div className="grid gap-3.5">
        <Link
          to="/neuro-mobile/exame"
          className="flex items-center gap-4 nm-card bg-gradient-to-br from-gold/15 to-transparent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold ring-1 ring-gold/40">
            <Stethoscope className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-sm">Exame Completo</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Paciente, Queixa, Exame, Revisão e IA.
            </p>
          </div>
        </Link>

        <Link
          to="/neuro-mobile/exame-rapido"
          className="flex items-center gap-4 nm-card bg-gradient-to-br from-violet-500/15 to-transparent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/40">
            <Zap className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-sm">Exame Rápido</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Apenas paciente, queixa ou seções físicas.
            </p>
          </div>
        </Link>

        <Link
          to="/neuro-mobile/base-dados"
          className="flex items-center gap-4 nm-card bg-gradient-to-br from-sky-500/15 to-transparent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/40">
            <Database className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-sm">Base Neurológica</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Dicionário rápido de achados e patologias.
            </p>
          </div>
        </Link>

        <Link
          to="/neuro-mobile/glasgow"
          className="flex items-center gap-4 nm-card bg-gradient-to-br from-rose-500/15 to-transparent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40">
            <Activity className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-sm">Escala de Glasgow</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              MGCS interativo para traumas e emergências.
            </p>
          </div>
        </Link>

        <Link
          to="/neuro-mobile/historico"
          className="flex items-center gap-4 nm-card bg-gradient-to-br from-emerald-500/15 to-transparent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
            <History className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-sm">Histórico Local</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Retomar exames salvos no seu dispositivo.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
