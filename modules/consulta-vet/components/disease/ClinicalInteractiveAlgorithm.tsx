import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Cat,
  CheckCircle2,
  ChevronDown,
  Dog,
  FlaskConical,
  GitBranch,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { EditorialAlgorithmDetailBlock, EditorialInteractiveAlgorithm } from '../../types/common';
import type { DiseaseSectionVisual } from '../../utils/diseaseSectionVisual';
import { EditorialRichText } from '../shared/EditorialRichText';

function SpeciesPill({ tag }: { tag?: 'dog' | 'cat' | 'both' }) {
  if (!tag) return null;
  if (tag === 'dog') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-bold text-sky-800 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-200">
        <Dog className="h-3.5 w-3.5" aria-hidden />
        Cães
      </span>
    );
  }
  if (tag === 'cat') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-bold text-violet-800 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-200">
        <Cat className="h-3.5 w-3.5" aria-hidden />
        Gatos
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-200">
      Cães e Gatos
    </span>
  );
}

function DetailBlockCard({
  detail,
  visual,
}: {
  detail: EditorialAlgorithmDetailBlock;
  visual: DiseaseSectionVisual;
}) {
  const tone = detail.tone ?? 'default';

  const config =
    tone === 'danger'
      ? {
          shell: 'border-rose-500/30 border-l-4 border-l-rose-600 bg-rose-500/[0.07] dark:bg-rose-500/[0.11]',
          title: 'text-rose-900 dark:text-rose-100',
          iconWrap: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
          Icon: ShieldAlert,
        }
      : tone === 'warning'
        ? {
            shell: 'border-amber-500/30 border-l-4 border-l-amber-500 bg-amber-500/[0.07] dark:bg-amber-500/[0.11]',
            title: 'text-amber-950 dark:text-amber-100',
            iconWrap: 'bg-amber-500/15 text-amber-800 dark:text-amber-200',
            Icon: AlertTriangle,
          }
        : tone === 'evidence'
          ? {
              shell: 'border-cyan-600/25 border-l-4 border-l-cyan-600 bg-cyan-500/[0.06] dark:bg-cyan-400/[0.09]',
              title: 'text-cyan-950 dark:text-cyan-100',
              iconWrap: 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-200',
              Icon: FlaskConical,
            }
          : tone === 'tip'
            ? {
                shell: 'border-emerald-500/25 border-l-4 border-l-emerald-600 bg-emerald-500/[0.06] dark:bg-emerald-400/[0.09]',
                title: 'text-emerald-950 dark:text-emerald-100',
                iconWrap: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
                Icon: CheckCircle2,
              }
            : {
                shell: 'border-border/70 border-l-4 border-l-primary/60 bg-background/70',
                title: 'text-foreground',
                iconWrap: 'bg-primary/10 text-primary',
                Icon: BookOpen,
              };

  const Icon = config.Icon;

  return (
    <div className={cn('rounded-xl border p-3.5 md:p-4', config.shell)}>
      <div className="flex items-start gap-2.5">
        <span className={cn('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg', config.iconWrap)} aria-hidden>
          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <p className={cn('text-xs font-extrabold uppercase tracking-wider', config.title)}>{detail.label}</p>
          <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-foreground/90 md:text-[14.5px]">
            <EditorialRichText value={detail.content} visual={visual} />
          </p>
        </div>
      </div>
    </div>
  );
}

export function ClinicalInteractiveAlgorithm({
  algorithm,
  visual,
}: {
  algorithm: EditorialInteractiveAlgorithm;
  visual: DiseaseSectionVisual;
}) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const allExpanded =
    algorithm.steps.length > 0 && expandedSteps.length === algorithm.steps.length;

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((n) => n !== stepNumber) : [...prev, stepNumber]
    );
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSteps([]);
    } else {
      setExpandedSteps(algorithm.steps.map((s) => s.stepNumber));
    }
  };

  const actionLabelClosed =
    algorithm.mode === 'diagnosis'
      ? 'Entender o porquê, confiabilidade, fase e evidências'
      : 'Expandir mecanismo, doses detalhadas, eficácia e alertas';

  return (
    <section className="space-y-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-card/85 to-card p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
              visual.iconWrapClass
            )}
            aria-hidden
          >
            <GitBranch className={cn('h-4 w-4', visual.iconClass)} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {algorithm.mode === 'diagnosis' ? 'Algoritmo Diagnóstico Interativo' : 'Algoritmo Terapêutico Interativo'}
            </p>
            <h4 className="mt-0.5 text-base font-bold tracking-tight text-foreground md:text-lg">
              {algorithm.title}
            </h4>
            {algorithm.subtitle ? (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                {algorithm.subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-border bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs transition-colors hover:border-primary/40 hover:text-primary"
        >
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          {allExpanded ? 'Recolher todas as etapas' : 'Expandir todas as etapas'}
        </button>
      </div>

      <ol className="space-y-0">
        {algorithm.steps.map((step, index) => {
          const isLast = index === algorithm.steps.length - 1;
          const isOpen = expandedSteps.includes(step.stepNumber);

          return (
            <li key={step.stepNumber} className="flex items-stretch gap-2.5 sm:gap-4">
              <div className="flex w-7 shrink-0 flex-col items-center sm:w-9">
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.08] sm:h-9 sm:w-9 sm:text-sm',
                    visual.diagnosticNumBgClass,
                    visual.diagnosticNumTextClass
                  )}
                >
                  {step.stepNumber}
                </span>
                {!isLast ? (
                  <div
                    className="my-1.5 min-h-[1rem] w-0.5 flex-1 bg-gradient-to-b from-primary/35 via-border to-border/30"
                    aria-hidden
                  />
                ) : null}
              </div>

              <div className={cn('min-w-0 flex-1', !isLast && 'pb-4')}>
                <div
                  className={cn(
                    'rounded-2xl border bg-card/90 p-3.5 shadow-2xs transition-all sm:p-4',
                    isOpen ? 'border-primary/40 ring-1 ring-primary/15' : 'border-border/75 hover:border-primary/30'
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h5 className="text-[15px] font-bold leading-snug text-foreground">{step.title}</h5>
                    {step.phaseBadge ? (
                      <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                        {step.phaseBadge}
                      </span>
                    ) : null}
                    <SpeciesPill tag={step.speciesTag} />
                  </div>

                  <p className="mt-2 text-[14px] leading-relaxed text-foreground/90">
                    <EditorialRichText value={step.quickSummary} visual={visual} />
                  </p>

                  {step.quickFacts && step.quickFacts.length > 0 ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {step.quickFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="rounded-lg border border-border/60 bg-muted/[0.18] px-2.5 py-2"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {fact.label}
                          </p>
                          <p className="mt-0.5 text-xs font-medium leading-snug text-foreground">
                            <EditorialRichText value={fact.value} visual={visual} />
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-3 flex items-center justify-between border-t border-border/45 pt-2.5">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleStep(step.stepNumber)}
                      className={cn(
                        'inline-flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors cursor-pointer',
                        isOpen
                          ? 'bg-primary/10 text-primary hover:bg-primary/15'
                          : 'bg-muted/40 text-foreground/80 hover:bg-muted/70 hover:text-foreground'
                      )}
                    >
                      <span>{isOpen ? 'Recolher explicação completa' : actionLabelClosed}</span>
                      <ChevronDown
                        className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
                        aria-hidden
                      />
                    </button>
                  </div>

                  {isOpen ? (
                    <div className="mt-3 space-y-2.5 border-t border-border/50 pt-3 animate-in fade-in-50 duration-200">
                      {step.details.map((detail, dIdx) => (
                        <DetailBlockCard key={`${detail.label}-${dIdx}`} detail={detail} visual={visual} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
