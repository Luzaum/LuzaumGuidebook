import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, LucideIcon } from 'lucide-react';
import { cn } from '../../../../lib/utils';

export type ShortcutAccent = 'sky' | 'emerald' | 'amber' | 'violet' | 'rose' | 'orange' | 'cyan' | 'slate';

export type ShortcutItem = {
  to: string;
  label: string;
  body: string;
  icon: LucideIcon;
  accent?: ShortcutAccent;
};

const ACCENT_ICON: Record<ShortcutAccent, string> = {
  sky: 'bg-sky-500/[0.1] text-sky-600 ring-sky-500/20 dark:text-sky-400',
  emerald: 'bg-emerald-500/[0.1] text-emerald-600 ring-emerald-500/20 dark:text-emerald-400',
  amber: 'bg-amber-500/[0.1] text-amber-700 ring-amber-500/20 dark:text-amber-400',
  violet: 'bg-violet-500/[0.1] text-violet-600 ring-violet-500/20 dark:text-violet-400',
  rose: 'bg-rose-500/[0.1] text-rose-600 ring-rose-500/20 dark:text-rose-400',
  orange: 'bg-orange-500/[0.1] text-orange-600 ring-orange-500/20 dark:text-orange-400',
  cyan: 'bg-cyan-500/[0.1] text-cyan-600 ring-cyan-500/20 dark:text-cyan-400',
  slate: 'bg-slate-500/[0.08] text-slate-600 ring-slate-400/20 dark:text-slate-400',
};

const ACCENT_DOT: Record<ShortcutAccent, string> = {
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  violet: 'bg-violet-500',
  rose: 'bg-rose-500',
  orange: 'bg-orange-500',
  cyan: 'bg-cyan-500',
  slate: 'bg-slate-400',
};

interface ConsultaVetShortcutGridProps {
  title: string;
  shortcuts: ShortcutItem[];
}

export function ConsultaVetShortcutGrid({ title, shortcuts }: ConsultaVetShortcutGridProps) {
  return (
    <section className="space-y-4" aria-labelledby="consulta-vet-shortcuts-title">
      <div className="flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.1)]" aria-hidden />
          <h2 id="consulta-vet-shortcuts-title" className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            {title}
          </h2>
        </div>
        <p className="text-xs font-medium text-muted-foreground/75">Escolha um fluxo para começar</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {shortcuts.map((s, index) => {
          const Icon = s.icon;
          const accent = s.accent ?? 'sky';
          return (
            <Link
              key={s.to}
              to={s.to}
              style={{
                animationDelay: `${index * 55}ms`,
                animationFillMode: 'both',
              }}
              className={cn(
                'consultavet-shortcut-card group relative flex min-h-[96px] items-center gap-3.5 overflow-hidden rounded-2xl border border-border/75 bg-card/80 px-4 py-3.5 text-left backdrop-blur-sm',
                'shadow-[0_12px_30px_-24px_hsl(var(--foreground)/0.45)] transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out',
                'hover:-translate-y-1 hover:border-primary/25 hover:bg-card hover:shadow-[0_18px_38px_-24px_hsl(var(--primary)/0.4)] active:translate-y-0 active:scale-[0.99]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}
            >
              <span
                className={cn(
                  'absolute inset-y-5 left-0 w-0.5 rounded-r-full opacity-60 transition-all duration-300 group-hover:inset-y-3 group-hover:opacity-100',
                  ACCENT_DOT[accent]
                )}
                aria-hidden
              />
              <div
                className={cn(
                  'relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] ring-1 ring-inset transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-105',
                  ACCENT_ICON[accent]
                )}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110" aria-hidden />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-[15px]">
                  {s.label}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground/90 transition-colors group-hover:text-foreground/70">
                  {s.body}
                </p>
              </div>

              <ArrowUpRight
                className="h-4 w-4 shrink-0 -translate-x-1 translate-y-1 text-muted-foreground/35 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary/70 group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
