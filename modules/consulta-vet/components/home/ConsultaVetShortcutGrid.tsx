import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../../lib/utils';

export type ShortcutAccent = 'sky' | 'emerald' | 'amber' | 'violet' | 'rose' | 'orange' | 'cyan' | 'slate';

export type ShortcutItem = {
  to: string;
  label: string;
  body: string;
  icon: LucideIcon;
  accent?: ShortcutAccent;
};

const ACCENT_RING: Record<ShortcutAccent, string> = {
  sky: 'ring-sky-500/25 bg-sky-500/[0.12] text-sky-600 dark:text-sky-400',
  emerald: 'ring-emerald-500/25 bg-emerald-500/[0.12] text-emerald-600 dark:text-emerald-400',
  amber: 'ring-amber-500/25 bg-amber-500/[0.12] text-amber-700 dark:text-amber-400',
  violet: 'ring-violet-500/25 bg-violet-500/[0.12] text-violet-600 dark:text-violet-400',
  rose: 'ring-rose-500/25 bg-rose-500/[0.12] text-rose-600 dark:text-rose-400',
  orange: 'ring-orange-500/25 bg-orange-500/[0.12] text-orange-600 dark:text-orange-400',
  cyan: 'ring-cyan-500/25 bg-cyan-500/[0.12] text-cyan-600 dark:text-cyan-400',
  slate: 'ring-slate-400/25 bg-slate-500/[0.1] text-slate-600 dark:text-slate-400',
};

const ACCENT_BORDER: Record<ShortcutAccent, string> = {
  sky: 'hover:border-sky-500/35 hover:shadow-sky-500/10',
  emerald: 'hover:border-emerald-500/35 hover:shadow-emerald-500/10',
  amber: 'hover:border-amber-500/35 hover:shadow-amber-500/10',
  violet: 'hover:border-violet-500/35 hover:shadow-violet-500/10',
  rose: 'hover:border-rose-500/35 hover:shadow-rose-500/10',
  orange: 'hover:border-orange-500/35 hover:shadow-orange-500/10',
  cyan: 'hover:border-cyan-500/35 hover:shadow-cyan-500/10',
  slate: 'hover:border-slate-400/35 hover:shadow-slate-500/10',
};

interface ConsultaVetShortcutGridProps {
  title: string;
  shortcuts: ShortcutItem[];
}

export function ConsultaVetShortcutGrid({ title, shortcuts }: ConsultaVetShortcutGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground/90">Toque no fluxo para abrir direto</p>
      </div>
      <div className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto pb-1 pt-0.5 md:mx-0 md:overflow-visible">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          const accent = s.accent ?? 'sky';
          return (
            <Link
              key={s.to}
              to={s.to}
              className={cn(
                'group relative flex min-h-0 min-w-[7.5rem] flex-1 shrink-0 flex-col overflow-hidden rounded-xl border border-border/90 bg-card/90 px-2.5 py-3 text-left shadow-sm md:min-w-0',
                'transition-all duration-200 ease-out',
                'hover:-translate-y-0.5 hover:shadow-md',
                ACCENT_BORDER[accent],
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}
            >
              <div
                className={cn(
                  'mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-inset transition-transform duration-200 group-hover:scale-105',
                  ACCENT_RING[accent]
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <h3 className="text-[12px] font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-[13px]">
                {s.label}
              </h3>
              <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-muted-foreground sm:text-[11px]">{s.body}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
