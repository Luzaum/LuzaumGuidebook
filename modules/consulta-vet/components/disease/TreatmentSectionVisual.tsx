import React from 'react';
import { ClipboardCheck, Clock, ListOrdered, Pill, RefreshCw } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { EditorialTreatmentPriorityStep } from '../../types/common';
import { composeTreatmentPrioritySummary } from '../../utils/clinicalFlowText';
import type { DiseaseSectionVisual } from '../../utils/diseaseSectionVisual';
import { EditorialRichText } from '../shared/EditorialRichText';

function extractStepNumber(raw: string): number {
  const m = raw.match(/^\s*(\d+)\)\s*/);
  return m ? parseInt(m[1], 10) : 0;
}

function stripStepNumber(raw: string): string {
  return raw.replace(/^\s*\d+\)\s*/, '').trim();
}

/** Separa título curto e detalhe quando há traço editorial (—). */
function parsePriorityLine(raw: string): { step: number; title: string; detail: string } {
  const step = extractStepNumber(raw);
  const body = stripStepNumber(raw);
  const em = body.indexOf('—');
  if (em === -1) {
    return { step, title: body, detail: '' };
  }
  return {
    step,
    title: body.slice(0, em).trim(),
    detail: body.slice(em + 1).trim(),
  };
}

/** Tenta dividir monitoramento em “foco” e “o que observar”. */
function parseMonitorLine(raw: string): { left: string; right: string } {
  const s = raw.trim();
  const splitters = [' — ', ' – ', ': '];
  for (const sep of splitters) {
    const i = s.indexOf(sep);
    if (i > 0) {
      return { left: s.slice(0, i).trim(), right: s.slice(i + sep.length).trim() };
    }
  }
  return { left: 'Monitorar', right: s };
}

export function TreatmentPriorityPanel({ items, visual }: { items: string[]; visual: DiseaseSectionVisual }) {
  return (
    <section className="space-y-4" aria-labelledby="tx-priority-heading">
      <div className="flex items-center gap-2">
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-lg', visual.iconWrapClass)}>
          <ListOrdered className={cn('h-4 w-4', visual.iconClass)} aria-hidden />
        </span>
        <h4 id="tx-priority-heading" className="text-base font-semibold tracking-tight text-foreground">
          Ordem de prioridade
        </h4>
      </div>
      <ol className="space-y-0">
        {items.map((raw, index) => {
          const { step, title, detail } = parsePriorityLine(raw);
          const n = step || index + 1;
          const isLast = index === items.length - 1;
          return (
            <li key={`${n}-${index}`} className="flex items-stretch gap-4 md:gap-5">
              <div className="flex w-11 shrink-0 flex-col items-center md:w-12">
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.08] md:h-10 md:w-10 md:text-sm',
                    visual.diagnosticNumBgClass,
                    visual.diagnosticNumTextClass
                  )}
                >
                  {n}
                </span>
                {!isLast ? (
                  <div
                    className="mt-2 min-h-[1.5rem] w-px flex-1 bg-gradient-to-b from-border via-border/70 to-border/25"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className={cn('min-w-0 flex-1', !isLast && 'pb-6')}>
                <div
                  className={cn(
                    'rounded-xl border border-border/50 bg-card/60 p-4 shadow-sm backdrop-blur-[2px] md:p-5',
                    visual.contentTintClass
                  )}
                >
                  <h5 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground">{title}</h5>
                  {detail ? (
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground/88 md:leading-7">
                      <EditorialRichText value={detail} />
                    </p>
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

export function TreatmentMonitoringPanel({ items, visual }: { items: string[]; visual: DiseaseSectionVisual }) {
  const rows = items.map(parseMonitorLine);
  return (
    <section className="space-y-4" aria-labelledby="tx-monitor-heading">
      <div className="flex items-center gap-2">
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-lg', visual.iconWrapClass)}>
          <ClipboardCheck className={cn('h-4 w-4', visual.iconClass)} aria-hidden />
        </span>
        <h4 id="tx-monitor-heading" className="text-base font-semibold tracking-tight text-foreground">
          Monitoramento
        </h4>
      </div>
      <div className={cn('grid gap-3 md:grid-cols-2', visual.contentTintClass)}>
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/55 bg-card/55 p-4 shadow-sm backdrop-blur-[1px] md:p-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{row.left}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">
              <EditorialRichText value={row.right} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PriorityMetaContent({
  value,
  visual,
}: {
  value: string;
  visual?: DiseaseSectionVisual;
}) {
  const rawLines = value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  if (rawLines.length > 1) {
    return (
      <div className="space-y-1.5">
        {rawLines.map((line, idx) => {
          const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
          const isHeader =
            line.endsWith(':') ||
            (!isBullet &&
              rawLines[idx + 1] &&
              (rawLines[idx + 1].startsWith('•') || rawLines[idx + 1].startsWith('-') || rawLines[idx + 1].startsWith('*')));

          if (isHeader) {
            return (
              <p key={idx} className="pt-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/90 first:pt-0">
                <EditorialRichText value={line} visual={visual} />
              </p>
            );
          }

          if (isBullet) {
            const cleanText = line.replace(/^[•\-*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-0.5 text-xs sm:text-[13px] leading-relaxed text-foreground/88">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75" aria-hidden />
                <span className="min-w-0 flex-1">
                  <EditorialRichText value={cleanText} visual={visual} />
                </span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-xs sm:text-[13px] leading-relaxed text-foreground/88">
              <EditorialRichText value={line} visual={visual} />
            </p>
          );
        })}
      </div>
    );
  }

  // Automatic smart split if text has semicolons separating medication options
  if (value.includes(';') && (value.includes('mg/kg') || value.includes('mg/') || value.includes(' — ') || value.includes(':'))) {
    const colonIdx = value.indexOf(':');
    if (colonIdx > 0 && colonIdx < 60) {
      const header = value.slice(0, colonIdx + 1).trim();
      const rest = value.slice(colonIdx + 1).trim();

      const subHeaderMatch = rest.match(/^(.*?)\.\s+([A-ZÀ-Ú][^:]{3,40}:)\s*(.*)$/s);
      if (subHeaderMatch) {
        const [, part1, subHeader, part2] = subHeaderMatch;
        const items1 = part1.split(';').map((s) => s.replace(/^\s*(?:ou|e)\s+/i, '').trim()).filter(Boolean);
        const items2 = part2.split(/(?:;|\s+ou\s+)/i).map((s) => s.trim()).filter(Boolean);

        return (
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/90">
              <EditorialRichText value={header} visual={visual} />
            </p>
            <div className="space-y-1">
              {items1.map((item, i) => (
                <div key={i} className="flex items-start gap-2 pl-0.5 text-xs sm:text-[13px] leading-relaxed text-foreground/88">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <EditorialRichText value={item} visual={visual} />
                  </span>
                </div>
              ))}
            </div>
            <p className="pt-1 text-[11px] font-bold uppercase tracking-wider text-foreground/90">
              <EditorialRichText value={subHeader} visual={visual} />
            </p>
            <div className="space-y-1">
              {items2.map((item, i) => (
                <div key={i} className="flex items-start gap-2 pl-0.5 text-xs sm:text-[13px] leading-relaxed text-foreground/88">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <EditorialRichText value={item} visual={visual} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      const items = rest.split(';').map((s) => s.replace(/^\s*(?:ou|e)\s+/i, '').trim()).filter(Boolean);
      if (items.length > 1) {
        return (
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/90">
              <EditorialRichText value={header} visual={visual} />
            </p>
            <div className="space-y-1">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 pl-0.5 text-xs sm:text-[13px] leading-relaxed text-foreground/88">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <EditorialRichText value={item} visual={visual} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  }

  return <EditorialRichText value={value} visual={visual} />;
}

function PriorityMeta({
  icon: Icon,
  label,
  value,
  visual,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  visual?: DiseaseSectionVisual;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-border/45 bg-muted/[0.08] px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="h-3 w-3 shrink-0" aria-hidden />
        {label}
      </p>
      <div className="mt-1.5">
        <PriorityMetaContent value={value} visual={visual} />
      </div>
    </div>
  );
}

export function TreatmentPriorityRichPanel({
  steps,
  visual,
}: {
  steps: EditorialTreatmentPriorityStep[];
  visual: DiseaseSectionVisual;
}) {
  return (
    <section className="space-y-4" aria-labelledby="tx-priority-rich-heading">
      <div className="flex items-center gap-2">
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-lg', visual.iconWrapClass)}>
          <ListOrdered className={cn('h-4 w-4', visual.iconClass)} aria-hidden />
        </span>
        <h4 id="tx-priority-rich-heading" className="text-base font-semibold tracking-tight text-foreground">
          Ordem de prioridade
        </h4>
      </div>
      <ol className="space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={`${step.title}-${index}`} className="flex gap-4 md:gap-5">
              <div className="flex w-11 shrink-0 flex-col items-center md:w-12">
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.08] md:h-10 md:w-10 md:text-sm',
                    visual.diagnosticNumBgClass,
                    visual.diagnosticNumTextClass
                  )}
                >
                  {index + 1}
                </span>
                {!isLast ? (
                  <div
                    className="mt-2 min-h-[1.5rem] w-px flex-1 bg-gradient-to-b from-border via-border/70 to-border/25"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className={cn('min-w-0 flex-1', !isLast && 'pb-6')}>
                <div
                  className={cn(
                    'rounded-xl border border-border/50 bg-card/60 p-4 shadow-sm backdrop-blur-[2px] md:p-5',
                    visual.contentTintClass
                  )}
                >
                  <h5 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground">{step.title}</h5>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/88 md:leading-7">
                    <EditorialRichText value={composeTreatmentPrioritySummary(step)} />
                  </p>
                  {(step.options || step.dose || step.duration || step.reassess) && (
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]">
                      {step.options ? <PriorityMeta icon={Pill} label="Opções e doses" value={step.options} visual={visual} /> : null}
                      {step.dose ? <PriorityMeta icon={Pill} label="Dose" value={step.dose} visual={visual} /> : null}
                      {step.duration ? <PriorityMeta icon={Clock} label="Duração" value={step.duration} visual={visual} /> : null}
                      {step.reassess ? <PriorityMeta icon={RefreshCw} label="Reavaliar" value={step.reassess} visual={visual} /> : null}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
