import React from 'react';
import { Zap } from 'lucide-react';

interface QuickDecisionStripProps {
  items: string[];
  className?: string;
}

/**
 * Faixa horizontal com frases curtas — só o essencial para decisão rápida.
 */
export function QuickDecisionStrip({ items, className = '' }: QuickDecisionStripProps) {
  const trimmed = items.map((s) => s.trim()).filter(Boolean).slice(0, 5);
  if (!trimmed.length) return null;

  return (
    <section
      id="quick-strip"
      className={`scroll-mt-24 overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card/80 to-card shadow-sm ${className}`.trim()}
    >
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-primary to-emerald-500 opacity-90" aria-hidden />
      <div className="p-5 md:p-6">
        <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
          <Zap className="h-4 w-4" aria-hidden />
          Decisão rápida
        </p>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
          {trimmed.map((text, index) => (
            <div
              key={`${index}-${text.slice(0, 24)}`}
              className="min-w-[min(100%,220px)] max-w-[300px] shrink-0 rounded-2xl border border-primary/15 bg-background/90 px-4 py-3 text-[13px] leading-snug text-foreground/90 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.05]"
            >
              <span className="mb-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-lg bg-primary/15 px-2 text-[11px] font-bold text-primary">
                {index + 1}
              </span>
              <p className="mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
