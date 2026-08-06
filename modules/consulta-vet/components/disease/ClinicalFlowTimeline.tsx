import React from 'react';
import { Clock, Pill, RefreshCw } from 'lucide-react';
import type { DiseaseQuickSummaryFlow, DiseaseQuickSummaryFlowStep } from '../../types/disease';
import { composeFlowStepDetail } from '../../utils/clinicalFlowText';
import { cn } from '../../../../lib/utils';

type ClinicalFlowTimelineProps = {
  flow: DiseaseQuickSummaryFlow;
  /** Resumo rápido usa fundo escuro; seção clínica usa tema claro. */
  variant?: 'dark' | 'light';
};

function MetaRow({
  icon: Icon,
  label,
  value,
  variant,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  variant: 'dark' | 'light';
}) {
  return (
    <div className="min-w-0">
      <p
        className={cn(
          'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]',
          variant === 'dark' ? 'text-white/45' : 'text-muted-foreground'
        )}
      >
        <Icon className="h-3 w-3 shrink-0" aria-hidden />
        {label}
      </p>
      <p
        className={cn(
          'mt-1 text-xs leading-relaxed md:text-[13px] md:leading-6',
          variant === 'dark' ? 'text-white/88' : 'text-foreground/90'
        )}
      >
        {value}
      </p>
    </div>
  );
}

function StepMeta({ step, variant }: { step: DiseaseQuickSummaryFlowStep; variant: 'dark' | 'light' }) {
  const rows: Array<{ icon: React.ComponentType<{ className?: string }>; label: string; value: string | undefined }> = [
    { icon: Pill, label: 'Dose', value: step.dose },
    { icon: Clock, label: 'Duração', value: step.duration },
    { icon: RefreshCw, label: 'Reavaliar', value: step.reassess },
  ].filter((row) => Boolean(row.value?.trim()));

  if (rows.length === 0) return null;

  return (
    <div
      className={cn(
        'mt-3 grid gap-3 border-t pt-3 sm:grid-cols-2',
        variant === 'dark' ? 'border-white/10' : 'border-border/55'
      )}
    >
      {rows.map((row) => (
        <MetaRow key={row.label} icon={row.icon} label={row.label} value={row.value!} variant={variant} />
      ))}
    </div>
  );
}

function FlowStepCard({
  step,
  index,
  total,
  variant,
}: {
  step: DiseaseQuickSummaryFlowStep;
  index: number;
  total: number;
  variant: 'dark' | 'light';
}) {
  const isLast = index === total - 1;
  const detail = composeFlowStepDetail(step);

  return (
    <li className="flex gap-3 md:gap-4">
      <div className="flex w-8 shrink-0 flex-col items-center md:w-9">
        <span
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold md:h-9 md:w-9',
            variant === 'dark'
              ? 'bg-white/15 text-white ring-1 ring-white/20'
              : 'bg-primary/10 text-primary ring-1 ring-primary/15'
          )}
        >
          {index + 1}
        </span>
        {!isLast ? (
          <div
            className={cn(
              'mt-2 w-px flex-1 min-h-[1.25rem]',
              variant === 'dark' ? 'bg-white/15' : 'bg-border'
            )}
            aria-hidden
          />
        ) : null}
      </div>

      <div className={cn('min-w-0 flex-1', !isLast && 'pb-4 md:pb-5')}>
        <div
          className={cn(
            'rounded-xl border p-4 md:p-4',
            variant === 'dark'
              ? 'border-white/10 bg-white/[0.06] backdrop-blur-[1px]'
              : 'border-border/55 bg-card/60 shadow-sm'
          )}
        >
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h5
              className={cn(
                'text-sm font-semibold leading-snug',
                variant === 'dark' ? 'text-white' : 'text-foreground'
              )}
            >
              {step.label.replace(/^\d+\.\s*/, '')}
            </h5>
            {step.timing ? (
              <span
                className={cn(
                  'rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  variant === 'dark' ? 'bg-amber-400/15 text-amber-100' : 'bg-amber-500/10 text-amber-800 dark:text-amber-200'
                )}
              >
                {step.timing}
              </span>
            ) : null}
          </div>
          {detail ? (
            <p
              className={cn(
                'mt-2 text-xs leading-relaxed md:text-[13px] md:leading-6',
                variant === 'dark' ? 'text-white/78' : 'text-foreground/85'
              )}
            >
              {detail}
            </p>
          ) : null}
          <StepMeta step={step} variant={variant} />
        </div>
      </div>
    </li>
  );
}

export function ClinicalFlowTimeline({ flow, variant = 'dark' }: ClinicalFlowTimelineProps) {
  return (
    <div className="space-y-4">
      <p
        className={cn(
          'text-xs font-bold uppercase tracking-wider',
          variant === 'dark' ? 'text-white/55' : 'text-muted-foreground'
        )}
      >
        {flow.title}
      </p>
      <ol className="space-y-0" aria-label={flow.title}>
        {flow.steps.map((step, index) => (
          <FlowStepCard key={`${step.label}-${index}`} step={step} index={index} total={flow.steps.length} variant={variant} />
        ))}
      </ol>
    </div>
  );
}
