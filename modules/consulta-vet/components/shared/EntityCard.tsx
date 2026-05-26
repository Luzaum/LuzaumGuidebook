import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { FavoriteButton } from './FavoriteButton';
import { FavoriteEntityType } from '../../types/favorites';

interface EntityCardProps {
  to: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  icon?: React.ReactNode;
  entityType: FavoriteEntityType;
  entityId: string;
  linkState?: unknown;
  className?: string;
  category?: string;
  key?: React.Key;
}

const SPECIALTY_THEMES: Record<string, {
  borderHover: string;
  glow: string;
  badge: string;
  line: string;
  glowBg: string;
}> = {
  endocrinologia: {
    borderHover: 'hover:border-purple-500/50 dark:hover:border-purple-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.25)]',
    badge: 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/45 dark:text-purple-300 border-purple-200/50 dark:border-purple-800/40',
    line: 'bg-purple-500/30 dark:bg-purple-400/20',
    glowBg: 'rgba(168,85,247,0.015)',
  },
  respiratorio: {
    borderHover: 'hover:border-sky-500/50 dark:hover:border-sky-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(14,165,233,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(14,165,233,0.25)]',
    badge: 'bg-sky-100/80 text-sky-700 dark:bg-sky-950/45 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/40',
    line: 'bg-sky-500/30 dark:bg-sky-400/20',
    glowBg: 'rgba(14,165,233,0.015)',
  },
  cardiologia: {
    borderHover: 'hover:border-rose-500/50 dark:hover:border-rose-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(244,63,94,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.25)]',
    badge: 'bg-rose-100/80 text-rose-700 dark:bg-rose-950/45 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/40',
    line: 'bg-rose-500/30 dark:bg-rose-400/20',
    glowBg: 'rgba(244,63,94,0.015)',
  },
  infecciosas: {
    borderHover: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]',
    badge: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40',
    line: 'bg-emerald-500/30 dark:bg-emerald-400/20',
    glowBg: 'rgba(16,185,129,0.015)',
  },
  infectologia: {
    borderHover: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]',
    badge: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40',
    line: 'bg-emerald-500/30 dark:bg-emerald-400/20',
    glowBg: 'rgba(16,185,129,0.015)',
  },
  'nefrologia-urologia': {
    borderHover: 'hover:border-amber-500/50 dark:hover:border-amber-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]',
    badge: 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/45 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/40',
    line: 'bg-amber-500/30 dark:bg-amber-400/20',
    glowBg: 'rgba(245,158,11,0.015)',
  },
  dermatologia: {
    borderHover: 'hover:border-pink-500/50 dark:hover:border-pink-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(236,72,153,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.25)]',
    badge: 'bg-pink-100/80 text-pink-700 dark:bg-pink-950/45 dark:text-pink-300 border-pink-200/50 dark:border-pink-800/40',
    line: 'bg-pink-500/30 dark:bg-pink-400/20',
    glowBg: 'rgba(236,72,153,0.015)',
  },
  neurologia: {
    borderHover: 'hover:border-indigo-500/50 dark:hover:border-indigo-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(99,102,241,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.25)]',
    badge: 'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-950/45 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/40',
    line: 'bg-indigo-500/30 dark:bg-indigo-400/20',
    glowBg: 'rgba(99,102,241,0.015)',
  },
  oncologia: {
    borderHover: 'hover:border-yellow-500/50 dark:hover:border-yellow-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(234,179,8,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(234,179,8,0.25)]',
    badge: 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-950/45 dark:text-yellow-300 border-yellow-200/50 dark:border-yellow-800/40',
    line: 'bg-yellow-500/30 dark:bg-yellow-400/20',
    glowBg: 'rgba(234,179,8,0.015)',
  },
  ortopedia: {
    borderHover: 'hover:border-teal-500/50 dark:hover:border-teal-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(20,184,166,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(20,184,166,0.25)]',
    badge: 'bg-teal-100/80 text-teal-700 dark:bg-teal-950/45 dark:text-teal-300 border-teal-200/50 dark:border-teal-800/40',
    line: 'bg-teal-500/30 dark:bg-teal-400/20',
    glowBg: 'rgba(20,184,166,0.015)',
  },
  imunologia: {
    borderHover: 'hover:border-violet-500/50 dark:hover:border-violet-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(139,92,246,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)]',
    badge: 'bg-violet-100/80 text-violet-700 dark:bg-violet-950/45 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/40',
    line: 'bg-violet-500/30 dark:bg-violet-400/20',
    glowBg: 'rgba(139,92,246,0.015)',
  },
  odontologia: {
    borderHover: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    badge: 'bg-cyan-100/80 text-cyan-700 dark:bg-cyan-950/45 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/40',
    line: 'bg-cyan-500/30 dark:bg-cyan-400/20',
    glowBg: 'rgba(6,182,212,0.015)',
  },
  'anestesia-dor': {
    borderHover: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    badge: 'bg-cyan-100/80 text-cyan-700 dark:bg-cyan-950/45 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/40',
    line: 'bg-cyan-500/30 dark:bg-cyan-400/20',
    glowBg: 'rgba(6,182,212,0.015)',
  },
  gastroenterologia: {
    borderHover: 'hover:border-pink-500/50 dark:hover:border-pink-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(236,72,153,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.25)]',
    badge: 'bg-pink-100/80 text-pink-700 dark:bg-pink-950/45 dark:text-pink-300 border-pink-200/50 dark:border-pink-800/40',
    line: 'bg-pink-500/30 dark:bg-pink-400/20',
    glowBg: 'rgba(236,72,153,0.015)',
  },
  'hepatologia-pancreas': {
    borderHover: 'hover:border-yellow-500/50 dark:hover:border-yellow-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(234,179,8,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(234,179,8,0.25)]',
    badge: 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-950/45 dark:text-yellow-300 border-yellow-200/50 dark:border-yellow-800/40',
    line: 'bg-yellow-500/30 dark:bg-yellow-400/20',
    glowBg: 'rgba(234,179,8,0.015)',
  },
};

const DEFAULT_THEME = {
  borderHover: 'hover:border-primary/40',
  glow: 'hover:shadow-sm',
  badge: 'bg-muted text-muted-foreground border-border',
  line: 'bg-border/60',
  glowBg: 'transparent',
};

export const EntityCard = React.memo(function EntityCard({
  to,
  title,
  subtitle,
  description,
  icon,
  entityType,
  entityId,
  linkState,
  className,
  category,
}: EntityCardProps) {
  const theme = category ? (SPECIALTY_THEMES[category] || DEFAULT_THEME) : DEFAULT_THEME;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300',
        theme.borderHover,
        theme.glow,
        className
      )}
      style={{
        background: `linear-gradient(135deg, var(--card) 0%, ${theme.glowBg || 'var(--card)'} 100%)`,
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            {icon && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                {icon}
              </span>
            )}
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              <Link to={to} state={linkState} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {title}
              </Link>
            </h3>
          </div>
          {subtitle && (
            <p className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
              theme.badge
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="relative z-10 shrink-0">
          <FavoriteButton entityType={entityType} entityId={entityId} className="h-9 w-9 border border-border/60 bg-background/50 p-2 backdrop-blur-xs transition-colors hover:bg-background" />
        </div>
      </div>

      {description && (
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">{description}</p>
      )}

      <div className={cn('mt-auto flex items-center justify-end border-t pt-3.5', theme.line)}>
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
          Abrir
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
});

