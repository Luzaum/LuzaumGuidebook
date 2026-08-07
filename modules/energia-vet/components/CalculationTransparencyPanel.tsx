import { Calculator, ChevronRight, HelpCircle, Info } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import type { BodyTargetPlan, CanonicalNutritionResult, EnergyCalculationExplanation } from '../lib/canonical'
import { getEvidenceReference } from '../lib/canonical/evidenceCatalog'
import { getTherapeuticProfileV3ById } from '../lib/canonical/therapeuticProfilesV3'
import { idealWeightMethodLabel } from '../lib/canonical/bodyTargetPlan'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { cn } from '../lib/utils'

interface CalculationDialogProps {
  result: CanonicalNutritionResult | null
  energyExplanation?: EnergyCalculationExplanation | null
  bodyTargetPlan?: BodyTargetPlan | null
  calibrationSummary?: string
  title?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CalculationTransparencyPanelProps {
  result: CanonicalNutritionResult | null
  energyExplanation?: EnergyCalculationExplanation | null
  bodyTargetPlan?: BodyTargetPlan | null
  calibrationSummary?: string
  title?: string
  className?: string
}

interface EnergyFinalEstimateCardProps {
  finalEnergyKcal: number
  rerKcal: number
  profileLabel: string
  energyRange?: { minimum: number; maximum: number }
  result: CanonicalNutritionResult | null
  energyExplanation?: EnergyCalculationExplanation | null
  calibrationSummary?: string
  className?: string
}

function formatTargetRange(minimum?: number, maximum?: number, unit?: string): string {
  if (minimum != null && maximum != null) return `${minimum}–${maximum} ${unit ?? ''}`.trim()
  if (minimum != null) return `mín. ${minimum} ${unit ?? ''}`.trim()
  if (maximum != null) return `máx. ${maximum} ${unit ?? ''}`.trim()
  return 'Meta qualitativa'
}

export function CalculationDetailsDialog({
  result,
  energyExplanation,
  bodyTargetPlan,
  calibrationSummary,
  title = 'Como foi calculado',
  open,
  onOpenChange,
}: CalculationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(88vh,820px)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Detalhamento clínico da energia, metas corporais e nutrientes — ajustados ao objetivo ponderal do paciente.
          </DialogDescription>
          {calibrationSummary && (
            <p className="text-xs leading-5 text-primary/90">{calibrationSummary}</p>
          )}
        </DialogHeader>
        <CalculationDetailsContent
          result={result}
          energyExplanation={energyExplanation}
          bodyTargetPlan={bodyTargetPlan}
        />
      </DialogContent>
    </Dialog>
  )
}

function CalculationDetailsContent({
  result,
  energyExplanation,
  bodyTargetPlan,
}: {
  result: CanonicalNutritionResult | null
  energyExplanation?: EnergyCalculationExplanation | null
  bodyTargetPlan?: BodyTargetPlan | null
}) {
  const { energy, therapeutic } = result ?? {
    energy: null,
    therapeutic: { activeProfileIds: [], resolvedTargets: [], unresolvedConflicts: [] },
  }

  return (
    <div className="space-y-5 text-sm">
      {energyExplanation && (
        <div className="space-y-3">
          {energyExplanation.steps.map((step) => (
            <article key={step.step} className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {step.step}. {step.title}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/90">
                {step.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
          <p className="text-xs text-muted-foreground">Fonte: {energyExplanation.sourceCitation}</p>
        </div>
      )}

      {bodyTargetPlan && (
        <article className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Meta corporal</p>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/90">
            <li>Peso-alvo: {bodyTargetPlan.targetWeightKg.toFixed(2)} kg</li>
            <li>
              Método: {idealWeightMethodLabel(bodyTargetPlan.idealWeightEstimate.method)} —{' '}
              {bodyTargetPlan.idealWeightEstimate.methodSummary}
            </li>
            <li>Energia de manutenção: {bodyTargetPlan.maintenanceEnergyKcal.toFixed(0)} kcal/dia</li>
            <li>Energia-alvo inicial: {bodyTargetPlan.targetEnergyKcal.toFixed(0)} kcal/dia</li>
            {bodyTargetPlan.muscleLossEnergyDeferral && (
              <li className="text-amber-800 dark:text-amber-200">{bodyTargetPlan.muscleLossEnergyDeferral.message}</li>
            )}
          </ul>
        </article>
      )}

      {energy && !energyExplanation && (
        <article className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Energia</p>
          <p className="mt-2 text-sm leading-6 text-foreground/90">{energy.methodSummary}</p>
        </article>
      )}

      {therapeutic.activeProfileIds.length > 0 && (
        <article className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Condicionantes clínicos
          </p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/90">
            {therapeutic.activeProfileIds.map((id) => {
              const profile = getTherapeuticProfileV3ById(id)
              return <li key={id}>• {profile?.displayNamePtBr ?? id}</li>
            })}
          </ul>
        </article>
      )}

      {therapeutic.resolvedTargets.length > 0 && (
        <article className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Metas nutricionais calibradas
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {therapeutic.resolvedTargets.map((target) => {
              const profile = getTherapeuticProfileV3ById(target.profileId)
              return (
              <div
                key={`${target.profileId}-${target.nutrientKey}`}
                className="rounded-xl border border-border bg-card p-3 text-sm"
              >
                <p className="font-semibold">{target.labelPt}</p>
                {profile && (
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {profile.displayNamePtBr}
                  </p>
                )}
                <p className="mt-1 text-base font-bold text-primary">
                  {formatTargetRange(target.minimum, target.maximum, target.unit)}
                </p>
                {target.equivalentPer1000Kcal?.minimum != null && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    ≈ {target.equivalentPer1000Kcal.minimum} g/1000 kcal ME
                    {target.equivalentPer1000Kcal.maximum != null &&
                      ` · até ${target.equivalentPer1000Kcal.maximum} g/1000 kcal`}
                  </p>
                )}
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{target.rationale}</p>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  {target.evidenceIds.map((id) => getEvidenceReference(id)?.title ?? id).join('; ')}
                </p>
              </div>
              )
            })}
          </div>
        </article>
      )}

      {therapeutic.unresolvedConflicts.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">Atenção clínica</p>
          <ul className="mt-2 space-y-1 text-sm text-amber-900/90 dark:text-amber-100/90">
            {therapeutic.unresolvedConflicts.map((conflict) => (
              <li key={conflict.id}>• {conflict.messagePt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** Card de energia final — clicável; abre popup com detalhamento. */
export function EnergyFinalEstimateCard({
  finalEnergyKcal,
  rerKcal,
  profileLabel,
  energyRange,
  result,
  energyExplanation,
  calibrationSummary,
  className,
}: EnergyFinalEstimateCardProps) {
  const [open, setOpen] = useState(false)
  const canOpen = Boolean(result || energyExplanation)

  return (
    <>
      <div
        className={cn(
          'rounded-2xl border border-primary/20 bg-primary/[0.055] p-4',
          canOpen && 'transition-colors hover:border-primary/40',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            disabled={!canOpen}
            onClick={() => canOpen && setOpen(true)}
            className={cn(
              'min-w-0 flex-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg -m-1 p-1',
              canOpen && 'cursor-pointer',
            )}
          >
            <p className="text-xs font-medium text-muted-foreground">Energia final estimada</p>
            <p id="energy-preview-kcal" className="mt-1 text-3xl font-black tracking-tight text-primary">
              {finalEnergyKcal.toFixed(0)} <span className="text-sm font-semibold">kcal/dia</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Perfil: <strong className="text-foreground">{profileLabel}</strong>
              {energyRange && (
                <>
                  {' '}
                  · Faixa {energyRange.minimum.toFixed(0)}–{energyRange.maximum.toFixed(0)} kcal/dia
                </>
              )}
            </p>
            {canOpen && (
              <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-primary">
                <Info className="h-3.5 w-3.5" />
                Toque para ver como foi calculado
              </p>
            )}
          </button>
          {canOpen && (
            <button
              type="button"
              aria-label="Como a energia é calculada"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <CalculationDetailsDialog
        open={open}
        onOpenChange={setOpen}
        result={result}
        energyExplanation={energyExplanation}
        calibrationSummary={calibrationSummary}
      />
    </>
  )
}

export function CalculationTransparencyPanel({
  result,
  energyExplanation,
  bodyTargetPlan,
  calibrationSummary,
  title = 'Como foi calculado',
  className,
}: CalculationTransparencyPanelProps) {
  const [open, setOpen] = useState(false)

  const summary = useMemo(() => {
    if (bodyTargetPlan && bodyTargetPlan.targetEnergyKcal !== bodyTargetPlan.maintenanceEnergyKcal) {
      return `${bodyTargetPlan.targetEnergyKcal.toFixed(0)} kcal/dia · meta de emagrecimento (manutenção atual ${bodyTargetPlan.maintenanceEnergyKcal.toFixed(0)} kcal/dia)`
    }
    if (energyExplanation) {
      return `${energyExplanation.summaryKcalDay.toFixed(0)} kcal/dia · ${energyExplanation.physiologicalProfileLabel}`
    }
    if (bodyTargetPlan) {
      return `${bodyTargetPlan.targetEnergyKcal.toFixed(0)} kcal/dia · meta corporal`
    }
    if (result?.energy) {
      return `${result.energy.selectedEnergyTarget.kcalDay.toFixed(0)} kcal/dia`
    }
    return 'Toque para ver o detalhamento clínico'
  }, [bodyTargetPlan, energyExplanation, result])

  if (!result && !energyExplanation) return null

  const stepCount = energyExplanation?.steps.length ?? 0
  const targetCount = result?.therapeutic.resolvedTargets.length ?? 0

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group flex w-full items-center gap-4 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] to-transparent p-4 text-left outline-none transition-all hover:border-primary/45 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <Calculator className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Info className="h-4 w-4 text-primary" />
            {title}
          </span>
          <span className="mt-1 block truncate text-sm text-muted-foreground">{summary}</span>
          <span className="mt-1 block text-[11px] text-muted-foreground/80">
            {stepCount > 0 && `${stepCount} etapas`}
            {stepCount > 0 && targetCount > 0 && ' · '}
            {targetCount > 0 && `${targetCount} metas nutricionais`}
          </span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </button>

      <CalculationDetailsDialog
        open={open}
        onOpenChange={setOpen}
        result={result}
        energyExplanation={energyExplanation}
        bodyTargetPlan={bodyTargetPlan}
        calibrationSummary={calibrationSummary}
        title={title}
      />
    </>
  )
}
