import React from 'react';
import { cn } from '../../../../lib/utils';

export type ConsultaVetHeroAccent =
  | 'primary'
  | 'emerald'
  | 'amber'
  | 'violet'
  | 'orange'
  | 'cyan'
  | 'rose';

type AccentDef = {
  border: string;
  ring: string;
  orb: string;
  gradient: string;
};

const ACCENT: Record<ConsultaVetHeroAccent, AccentDef> = {
  primary: {
    border: 'border-primary/15',
    ring: 'ring-primary/10',
    orb: 'bg-primary/[0.11]',
    gradient: 'bg-gradient-to-br from-card via-card to-primary/[0.04]',
  },
  emerald: {
    border: 'border-emerald-500/20',
    ring: 'ring-emerald-500/10',
    orb: 'bg-emerald-500/[0.13]',
    gradient: 'bg-gradient-to-br from-card via-card to-emerald-500/[0.05]',
  },
  amber: {
    border: 'border-amber-500/22',
    ring: 'ring-amber-500/10',
    orb: 'bg-amber-500/[0.12]',
    gradient: 'bg-gradient-to-br from-card via-card to-amber-500/[0.05]',
  },
  violet: {
    border: 'border-violet-500/20',
    ring: 'ring-violet-500/10',
    orb: 'bg-violet-500/[0.12]',
    gradient: 'bg-gradient-to-br from-card via-card to-violet-500/[0.05]',
  },
  orange: {
    border: 'border-orange-500/22',
    ring: 'ring-orange-500/10',
    orb: 'bg-orange-500/[0.12]',
    gradient: 'bg-gradient-to-br from-card via-card to-orange-500/[0.05]',
  },
  cyan: {
    border: 'border-cyan-500/20',
    ring: 'ring-cyan-500/10',
    orb: 'bg-cyan-500/[0.12]',
    gradient: 'bg-gradient-to-br from-card via-card to-cyan-500/[0.05]',
  },
  rose: {
    border: 'border-rose-500/20',
    ring: 'ring-rose-500/10',
    orb: 'bg-rose-500/[0.12]',
    gradient: 'bg-gradient-to-br from-card via-card to-rose-500/[0.05]',
  },
};

const EYEBROW: Record<ConsultaVetHeroAccent, string> = {
  primary: 'border-primary/25 bg-primary/10 text-primary',
  emerald: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300',
  violet: 'border-violet-500/25 bg-violet-500/10 text-violet-800 dark:text-violet-300',
  orange: 'border-orange-500/30 bg-orange-500/10 text-orange-800 dark:text-orange-300',
  cyan: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-800 dark:text-cyan-300',
  rose: 'border-rose-500/25 bg-rose-500/10 text-rose-800 dark:text-rose-300',
};

export function consultaVetEyebrowClass(accent: ConsultaVetHeroAccent): string {
  return cn(
    'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]',
    EYEBROW[accent]
  );
}

type ConsultaVetSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  accent?: ConsultaVetHeroAccent;
};

/**
 * Cartão de superfície com gradiente leve + orbes (mesmo vocabulário visual da home).
 */
export function ConsultaVetSurface({ children, className, accent = 'primary' }: ConsultaVetSurfaceProps) {
  const a = ACCENT[accent];
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border shadow-lg shadow-primary/[0.05]',
        a.border,
        a.ring,
        'ring-1',
        a.gradient,
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_0%_-30%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,hsl(199_89%_48%/0.08),transparent_50%)]"
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl',
          a.orb
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
