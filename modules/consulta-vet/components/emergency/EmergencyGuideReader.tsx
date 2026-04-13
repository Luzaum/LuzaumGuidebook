import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { EmergencyGuide, EmergencyGuidePage } from '../../types/emergencyGuide';
import { EMERGENCY_PHASE_LABEL, EMERGENCY_PHASE_ORDER } from './emergencyGuidePhaseLabels';
import { EmergencyGuideBlockRenderer } from './EmergencyGuideBlockRenderer';

function sortPages(pages: EmergencyGuidePage[]): EmergencyGuidePage[] {
  return [...pages].sort((a, b) => a.stepOrder - b.stepOrder);
}

interface EmergencyGuideReaderProps {
  guide: EmergencyGuide;
  initialPageIndex?: number;
  className?: string;
}

export function EmergencyGuideReader({ guide, initialPageIndex = 0, className }: EmergencyGuideReaderProps) {
  const pages = useMemo(() => sortPages(guide.pages), [guide.pages]);
  const [index, setIndex] = useState(() => Math.min(Math.max(0, initialPageIndex), Math.max(0, pages.length - 1)));

  useEffect(() => {
    setIndex((prev) => Math.min(prev, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  const current = pages[index];
  const total = pages.length;
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(Math.max(0, i + delta), total - 1));
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const phasesInGuide = useMemo(() => {
    const set = new Set(pages.map((p) => p.phase));
    return EMERGENCY_PHASE_ORDER.filter((ph) => set.has(ph));
  }, [pages]);

  if (!current) return null;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Barra de progresso + fase */}
      <div className="space-y-4 rounded-2xl border border-border/70 bg-card/50 px-4 py-4 md:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Zap className="h-4 w-4 text-amber-500" aria-hidden />
            <span>
              Passo {index + 1} de {total}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
              {EMERGENCY_PHASE_LABEL[current.phase]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Teclado: ← →</p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-primary to-emerald-500 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Linha do tempo das fases (quais existem neste guia) */}
        <div className="flex flex-wrap gap-2">
          {phasesInGuide.map((ph) => {
            const active = ph === current.phase;
            return (
              <span
                key={ph}
                className={cn(
                  'rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors',
                  active
                    ? 'border-primary/40 bg-primary/15 text-primary'
                    : 'border-border/80 bg-background/60 text-muted-foreground'
                )}
              >
                {EMERGENCY_PHASE_LABEL[ph]}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)]">
        {/* Índice de passos — desktop */}
        <nav className="hidden xl:block">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Fluxo</p>
          <ol className="space-y-1 border-l-2 border-border/80 pl-3">
            {pages.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    'w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    i === index
                      ? 'bg-primary/12 font-semibold text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <span className="mr-2 font-mono text-xs opacity-70">{p.stepOrder}.</span>
                  {p.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Conteúdo da página */}
        <article className="min-w-0">
          <header className="mb-6 border-b border-border/70 pb-5">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-[28px]">{current.title}</h2>
            {current.intro ? <p className="mt-3 max-w-[95ch] text-[15px] leading-7 text-muted-foreground">{current.intro}</p> : null}
          </header>
          <EmergencyGuideBlockRenderer blocks={current.blocks} />
        </article>
      </div>

      {/* Dots mobile */}
      <div className="flex justify-center gap-2 xl:hidden">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para passo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn('h-2.5 w-2.5 rounded-full transition-all', i === index ? 'w-8 bg-primary' : 'bg-muted-foreground/30')}
          />
        ))}
      </div>

      {/* Navegação inferior */}
      <div className="sticky bottom-0 z-10 -mx-1 flex items-center justify-between gap-3 border-t border-border/80 bg-background/95 px-1 py-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 md:static md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        <button
          type="button"
          disabled={index <= 0}
          onClick={() => go(-1)}
          className={cn(
            'inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors',
            index <= 0
              ? 'cursor-not-allowed border-border/50 text-muted-foreground/50'
              : 'border-border bg-card hover:border-primary/35 hover:text-primary'
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>
        <button
          type="button"
          disabled={index >= total - 1}
          onClick={() => go(1)}
          className={cn(
            'inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors',
            index >= total - 1
              ? 'cursor-not-allowed border-border/50 text-muted-foreground/50'
              : 'border-primary/30 bg-primary/10 text-primary hover:bg-primary/15'
          )}
        >
          Próximo
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
