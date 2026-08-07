import { AlertTriangle } from 'lucide-react'
import { buildNutrientGapAdvice } from '../lib/nutrientGapAdvice'
import type { EvaluatedNutrient, FoodContribution } from '../types'

interface NutrientGapSectionProps {
  belowRows: EvaluatedNutrient[]
  contributions: FoodContribution[]
  title?: string
}

export function NutrientGapSection({
  belowRows,
  contributions,
  title = 'Impactos de nutrientes abaixo da referência',
}: NutrientGapSectionProps) {
  if (!belowRows.length) return null

  return (
    <section className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-5">
      <h2 className="flex items-center gap-2 font-semibold">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        {title}
      </h2>
      <div className="mt-4 space-y-4">
        {belowRows.map((row) => {
          const advice = buildNutrientGapAdvice(row, contributions)
          return (
            <article
              key={`${row.profileId ?? 'profile'}-${row.key}-${row.basisType}`}
              className="rounded-xl border border-amber-500/20 bg-card/80 p-4"
            >
              <p className="font-semibold text-foreground">{advice.nutrientTitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">{advice.profileContext}</p>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Referência</dt>
                  <dd className="mt-1 font-medium tabular-nums">{advice.referenceLabel}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Entregue</dt>
                  <dd className="mt-1 font-medium tabular-nums">{advice.deliveredLabel}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Déficit</dt>
                  <dd className="mt-1 font-medium text-amber-800 dark:text-amber-200">{advice.gapLabel}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{advice.clinicalImpact}</p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ideias de suplementação</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {advice.supplementIdeas.map((idea) => (
                      <li key={idea}>• {idea}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ajuste pela fórmula atual</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {advice.formulationIdeas.map((idea) => (
                      <li key={idea}>• {idea}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Orientações resumidas para apoio à decisão clínica. Confirmar composição analítica, perfil do paciente e energia total antes de suplementar ou alterar proporções.
      </p>
    </section>
  )
}
