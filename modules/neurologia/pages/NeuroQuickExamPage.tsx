import React from 'react'
import { Link } from 'react-router-dom'
import { UserRound, Stethoscope, ChevronRight } from 'lucide-react'
import { NEURO_EXAM_SECTIONS } from '../data/neuroExamSections'
import { NeuroQuickReportButton } from '../components/NeuroQuickReportButton'

export function NeuroQuickExamPage() {
  return (
    <div className="relative z-10 w-full space-y-8 pb-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-foreground">Exame rápido</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha um bloco. O mesmo formulário do exame completo é reutilizado; os demais blocos ficam
            ocultos.
          </p>
        </div>
        <NeuroQuickReportButton />
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Pré-exame
        </h2>
        <Link
          to="/neurologia/exame-rapido/paciente"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-gold/40"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <UserRound className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <div className="font-semibold text-foreground">Paciente</div>
            <div className="text-sm text-muted-foreground">Espécie, idade, peso, comorbidades…</div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        <Link
          to="/neurologia/exame-rapido/queixa"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-gold/40"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <Stethoscope className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <div className="font-semibold text-foreground">Queixa e história</div>
            <div className="text-sm text-muted-foreground">Queixas, temporalidade, contexto, red flags…</div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Seções do exame físico (6)
        </h2>
        <div className="grid gap-2">
          {NEURO_EXAM_SECTIONS.map((s) => (
            <Link
              key={s.id}
              to={`/neurologia/exame-rapido/secao/${s.id}`}
              className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-left transition hover:border-gold/40"
            >
              <span className="font-medium text-foreground">{s.title}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
