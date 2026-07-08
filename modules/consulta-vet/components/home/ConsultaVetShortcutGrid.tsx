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
  sky: 'hover:border-sky-500/35 hover:shadow-sky-500/10 dark:hover:shadow-sky-500/5',
  emerald: 'hover:border-emerald-500/35 hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5',
  amber: 'hover:border-amber-500/35 hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5',
  violet: 'hover:border-violet-500/35 hover:shadow-violet-500/10 dark:hover:shadow-violet-500/5',
  rose: 'hover:border-rose-500/35 hover:shadow-rose-500/10 dark:hover:shadow-rose-500/5',
  orange: 'hover:border-orange-500/35 hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5',
  cyan: 'hover:border-cyan-500/35 hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/5',
  slate: 'hover:border-slate-400/35 hover:shadow-slate-500/10 dark:hover:shadow-slate-500/5',
};

const ACCENT_HOVER_BG: Record<ShortcutAccent, string> = {
  sky: 'hover:bg-gradient-to-br hover:from-card hover:to-sky-500/[0.04] dark:hover:to-sky-500/[0.06]',
  emerald: 'hover:bg-gradient-to-br hover:from-card hover:to-emerald-500/[0.04] dark:hover:to-emerald-500/[0.06]',
  amber: 'hover:bg-gradient-to-br hover:from-card hover:to-amber-500/[0.04] dark:hover:to-amber-500/[0.06]',
  violet: 'hover:bg-gradient-to-br hover:from-card hover:to-violet-500/[0.04] dark:hover:to-violet-500/[0.06]',
  rose: 'hover:bg-gradient-to-br hover:from-card hover:to-rose-500/[0.04] dark:hover:to-rose-500/[0.06]',
  orange: 'hover:bg-gradient-to-br hover:from-card hover:to-orange-500/[0.04] dark:hover:to-orange-500/[0.06]',
  cyan: 'hover:bg-gradient-to-br hover:from-card hover:to-cyan-500/[0.04] dark:hover:to-cyan-500/[0.06]',
  slate: 'hover:bg-gradient-to-br hover:from-card hover:to-slate-500/[0.04] dark:hover:to-slate-500/[0.06]',
};

const ACCENT_ICON_ANIM: Record<ShortcutAccent, string> = {
  sky: 'group-hover:rotate-[15deg] group-hover:scale-110',
  emerald: 'group-hover:scale-115 group-hover:rotate-[8deg]',
  amber: 'group-hover:rotate-[45deg] group-hover:scale-110',
  violet: 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110',
  rose: 'group-hover:-rotate-[12deg] group-hover:scale-110',
  orange: 'group-hover:scale-115 group-hover:translate-y-[-2px] group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.4)]',
  cyan: 'group-hover:rotate-[180deg] group-hover:scale-110',
  slate: 'group-hover:-translate-y-0.5 group-hover:scale-110',
};

interface ConsultaVetShortcutGridProps {
  title: string;
  shortcuts: ShortcutItem[];
}

export function ConsultaVetShortcutGrid({ title, shortcuts }: ConsultaVetShortcutGridProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between px-1">
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground/80 font-medium">Toque no fluxo para abrir direto</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1">
        {shortcuts.map((s, index) => {
          const Icon = s.icon;
          const accent = s.accent ?? 'sky';
          return (
            <Link
              key={s.to}
              to={s.to}
              style={{
                animationDelay: `${index * 70}ms`,
                animationFillMode: 'both',
              }}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-5 text-left shadow-sm backdrop-blur-[2px]',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-lg active:scale-[0.985]',
                'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out',
                ACCENT_BORDER[accent],
                ACCENT_HOVER_BG[accent],
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}
            >
              {/* Animated Accent glow spot on hover */}
              <div
                className={cn(
                  'absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none',
                  accent === 'sky' && 'bg-sky-500',
                  accent === 'emerald' && 'bg-emerald-500',
                  accent === 'amber' && 'bg-amber-500',
                  accent === 'violet' && 'bg-violet-500',
                  accent === 'rose' && 'bg-rose-500',
                  accent === 'orange' && 'bg-orange-500',
                  accent === 'cyan' && 'bg-cyan-500',
                  accent === 'slate' && 'bg-slate-400'
                )}
              />

              <div
                className={cn(
                  'mb-3.5 inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset transition-all duration-300 ease-out',
                  ACCENT_RING[accent]
                )}
              >
                <Icon
                  className={cn(
                    'h-5.5 w-5.5 transition-transform duration-300 ease-out',
                    ACCENT_ICON_ANIM[accent]
                  )}
                  aria-hidden
                />
              </div>
              <h3 className="text-sm font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-base">
                {s.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90 transition-colors group-hover:text-foreground/80">
                {s.body}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
