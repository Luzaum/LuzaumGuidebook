import { cn } from '../../../../lib/utils';

/** Mesma paleta dos cards de atalhos da home (`ConsultaVetShortcutGrid`). */
export type ConsultaVetNavAccent = 'sky' | 'emerald' | 'amber' | 'violet' | 'orange' | 'rose' | 'cyan' | 'slate';

/** Spring único para o pill compartilhado (`layoutId`) — mesma curva em todos os itens. */
export const consultaVetNavPillTransition = {
  type: 'spring' as const,
  stiffness: 440,
  damping: 36,
  mass: 0.82,
};

export function navLinkClass(active: boolean, accent: ConsultaVetNavAccent): string {
  const map: Record<ConsultaVetNavAccent, { on: string; off: string }> = {
    sky: {
      on: 'border-sky-500 text-sky-950 dark:text-sky-50',
      off: 'border-transparent text-muted-foreground hover:border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-950 dark:hover:text-sky-50',
    },
    emerald: {
      on: 'border-emerald-500 text-emerald-950 dark:text-emerald-50',
      off: 'border-transparent text-muted-foreground hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-950 dark:hover:text-emerald-50',
    },
    amber: {
      on: 'border-amber-500 text-amber-950 dark:text-amber-50',
      off: 'border-transparent text-muted-foreground hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-950 dark:hover:text-amber-50',
    },
    violet: {
      on: 'border-violet-500 text-violet-950 dark:text-violet-50',
      off: 'border-transparent text-muted-foreground hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-950 dark:hover:text-violet-50',
    },
    orange: {
      on: 'border-orange-500 text-orange-950 dark:text-orange-50',
      off: 'border-transparent text-muted-foreground hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-950 dark:hover:text-orange-50',
    },
    rose: {
      on: 'border-rose-500 text-rose-950 dark:text-rose-50',
      off: 'border-transparent text-muted-foreground hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-950 dark:hover:text-rose-50',
    },
    cyan: {
      on: 'border-cyan-500 text-cyan-950 dark:text-cyan-50',
      off: 'border-transparent text-muted-foreground hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-950 dark:hover:text-cyan-50',
    },
    slate: {
      on: 'border-slate-500 text-slate-900 dark:text-slate-50',
      off: 'border-transparent text-muted-foreground hover:border-slate-400/50 hover:bg-slate-500/10 hover:text-slate-900 dark:hover:text-slate-50',
    },
  };

  const s = map[accent];
  return cn(
    'border-l-[3px] pl-[10px] transition duration-200 ease-out',
    active ? s.on : s.off,
    active && 'shadow-sm',
    !active && 'motion-safe:hover:translate-x-[2px]'
  );
}

/** Fundo do pill — mesma opacidade em todos os accents (só muda a tonalidade). */
export const navAccentPillBg: Record<ConsultaVetNavAccent, string> = {
  sky: 'bg-sky-500/[0.16] dark:bg-sky-500/20',
  emerald: 'bg-emerald-500/[0.16] dark:bg-emerald-500/20',
  amber: 'bg-amber-500/[0.16] dark:bg-amber-500/20',
  violet: 'bg-violet-500/[0.16] dark:bg-violet-500/20',
  orange: 'bg-orange-500/[0.16] dark:bg-orange-500/20',
  rose: 'bg-rose-500/[0.16] dark:bg-rose-500/20',
  cyan: 'bg-cyan-500/[0.16] dark:bg-cyan-500/20',
  slate: 'bg-slate-500/[0.16] dark:bg-slate-500/20',
};

export function navIconClass(active: boolean, accent: ConsultaVetNavAccent): string {
  const map: Record<ConsultaVetNavAccent, { on: string; off: string }> = {
    sky: { on: 'text-sky-600 dark:text-sky-400', off: 'text-muted-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400' },
    emerald: { on: 'text-emerald-600 dark:text-emerald-400', off: 'text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400' },
    amber: { on: 'text-amber-700 dark:text-amber-400', off: 'text-muted-foreground group-hover:text-amber-700 dark:group-hover:text-amber-400' },
    violet: { on: 'text-violet-600 dark:text-violet-400', off: 'text-muted-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400' },
    orange: { on: 'text-orange-600 dark:text-orange-400', off: 'text-muted-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400' },
    rose: { on: 'text-rose-600 dark:text-rose-400', off: 'text-muted-foreground group-hover:text-rose-600 dark:group-hover:text-rose-400' },
    cyan: { on: 'text-cyan-600 dark:text-cyan-400', off: 'text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400' },
    slate: { on: 'text-slate-600 dark:text-slate-400', off: 'text-muted-foreground group-hover:text-slate-600 dark:group-hover:text-slate-400' },
  };
  const s = map[accent];
  return cn(
    'h-5 w-5 shrink-0 transition duration-200 ease-out',
    active && 'motion-safe:scale-[1.05]',
    active ? s.on : s.off
  );
}
