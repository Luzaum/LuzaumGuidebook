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
    line: 'border-purple-500/20 dark:border-purple-400/15',
    glowBg: 'rgba(168,85,247,0.015)',
  },
  respiratorio: {
    borderHover: 'hover:border-sky-500/50 dark:hover:border-sky-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(14,165,233,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(14,165,233,0.25)]',
    badge: 'bg-sky-100/80 text-sky-700 dark:bg-sky-950/45 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/40',
    line: 'border-sky-500/20 dark:border-sky-400/15',
    glowBg: 'rgba(14,165,233,0.015)',
  },
  cardiologia: {
    borderHover: 'hover:border-rose-500/50 dark:hover:border-rose-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(244,63,94,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.25)]',
    badge: 'bg-rose-100/80 text-rose-700 dark:bg-rose-950/45 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/40',
    line: 'border-rose-500/20 dark:border-rose-400/15',
    glowBg: 'rgba(244,63,94,0.015)',
  },
  infecciosas: {
    borderHover: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]',
    badge: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40',
    line: 'border-emerald-500/20 dark:border-emerald-400/15',
    glowBg: 'rgba(16,185,129,0.015)',
  },
  infectologia: {
    borderHover: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]',
    badge: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40',
    line: 'border-emerald-500/20 dark:border-emerald-400/15',
    glowBg: 'rgba(16,185,129,0.015)',
  },
  'nefrologia-urologia': {
    borderHover: 'hover:border-amber-500/50 dark:hover:border-amber-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]',
    badge: 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/45 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/40',
    line: 'border-amber-500/20 dark:border-amber-400/15',
    glowBg: 'rgba(245,158,11,0.015)',
  },
  dermatologia: {
    borderHover: 'hover:border-pink-500/50 dark:hover:border-pink-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(236,72,153,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.25)]',
    badge: 'bg-pink-100/80 text-pink-700 dark:bg-pink-950/45 dark:text-pink-300 border-pink-200/50 dark:border-pink-800/40',
    line: 'border-pink-500/20 dark:border-pink-400/15',
    glowBg: 'rgba(236,72,153,0.015)',
  },
  neurologia: {
    borderHover: 'hover:border-indigo-500/50 dark:hover:border-indigo-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(99,102,241,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.25)]',
    badge: 'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-950/45 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/40',
    line: 'border-indigo-500/20 dark:border-indigo-400/15',
    glowBg: 'rgba(99,102,241,0.015)',
  },
  oncologia: {
    borderHover: 'hover:border-yellow-500/50 dark:hover:border-yellow-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(234,179,8,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(234,179,8,0.25)]',
    badge: 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-950/45 dark:text-yellow-300 border-yellow-200/50 dark:border-yellow-800/40',
    line: 'border-yellow-500/20 dark:border-yellow-400/15',
    glowBg: 'rgba(234,179,8,0.015)',
  },
  ortopedia: {
    borderHover: 'hover:border-teal-500/50 dark:hover:border-teal-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(20,184,166,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(20,184,166,0.25)]',
    badge: 'bg-teal-100/80 text-teal-700 dark:bg-teal-950/45 dark:text-teal-300 border-teal-200/50 dark:border-teal-800/40',
    line: 'border-teal-500/20 dark:border-teal-400/15',
    glowBg: 'rgba(20,184,166,0.015)',
  },
  imunologia: {
    borderHover: 'hover:border-violet-500/50 dark:hover:border-violet-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(139,92,246,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)]',
    badge: 'bg-violet-100/80 text-violet-700 dark:bg-violet-950/45 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/40',
    line: 'border-violet-500/20 dark:border-violet-400/15',
    glowBg: 'rgba(139,92,246,0.015)',
  },
  odontologia: {
    borderHover: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    badge: 'bg-cyan-100/80 text-cyan-700 dark:bg-cyan-950/45 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/40',
    line: 'border-cyan-500/20 dark:border-cyan-400/15',
    glowBg: 'rgba(6,182,212,0.015)',
  },
  'anestesia-dor': {
    borderHover: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    badge: 'bg-cyan-100/80 text-cyan-700 dark:bg-cyan-950/45 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/40',
    line: 'border-cyan-500/20 dark:border-cyan-400/15',
    glowBg: 'rgba(6,182,212,0.015)',
  },
  gastroenterologia: {
    borderHover: 'hover:border-pink-500/50 dark:hover:border-pink-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(236,72,153,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.25)]',
    badge: 'bg-pink-100/80 text-pink-700 dark:bg-pink-950/45 dark:text-pink-300 border-pink-200/50 dark:border-pink-800/40',
    line: 'border-pink-500/20 dark:border-pink-400/15',
    glowBg: 'rgba(236,72,153,0.015)',
  },
  'hepatologia-pancreas': {
    borderHover: 'hover:border-yellow-500/50 dark:hover:border-yellow-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(234,179,8,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(234,179,8,0.25)]',
    badge: 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-950/45 dark:text-yellow-300 border-yellow-200/50 dark:border-yellow-800/40',
    line: 'border-yellow-500/20 dark:border-yellow-400/15',
    glowBg: 'rgba(234,179,8,0.015)',
  },
};

const DEFAULT_THEME = {
  borderHover: 'hover:border-primary/40',
  glow: 'hover:shadow-sm',
  badge: 'bg-muted text-muted-foreground border-border',
  line: 'border-border/60',
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

  // Split subtitles using bullet delimiter to show separate clean tags
  const subtitleParts = subtitle ? subtitle.split(/\s*[\u2022•]\s*/) : [];

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
          {subtitleParts.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {subtitleParts.map((part, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-semibold leading-normal tracking-wide',
                    idx === 0
                      ? theme.badge
                      : 'border-border/50 bg-muted/40 text-muted-foreground/80'
                  )}
                >
                  {part}
                </span>
              ))}
            </div>
          ) : subtitle ? (
            <span className={cn(
              'mt-2 inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-semibold leading-normal tracking-wide',
              theme.badge
            )}>
              {subtitle}
            </span>
          ) : null}
        </div>
        <div className="relative z-10 shrink-0">
          <FavoriteButton entityType={entityType} entityId={entityId} className="h-9 w-9 border border-border/60 bg-background/50 p-2 backdrop-blur-xs transition-colors hover:bg-background" />
        </div>
      </div>

      {description && (
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">{description}</p>
      )}

      <div className={cn('mt-auto flex items-center justify-between border-t pt-3.5', theme.line)}>
        <span className="text-[11px] font-medium text-muted-foreground/75">Clique para consultar</span>
        <span className="inline-flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-primary transition-all duration-300">
          Abrir
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
});

