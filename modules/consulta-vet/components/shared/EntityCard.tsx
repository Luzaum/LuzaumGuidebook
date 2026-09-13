import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { FavoriteButton } from './FavoriteButton';
import { FavoriteEntityType } from '../../types/favorites';
import { normalizeCategorySlug } from '../../utils/diseaseCategories';
import { getSpecialtyVisual } from '../../utils/specialtyVisuals';

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
  compact?: boolean;
  minimal?: boolean;
  key?: React.Key;
}

export interface EntityCategoryTheme {
  borderHover: string;
  glow: string;
  badge: string;
  line: string;
  glowBg: string;
}

export const SPECIALTY_THEMES: Record<string, EntityCategoryTheme> = {
  intensivismo: {
    borderHover: 'hover:border-red-500/50 dark:hover:border-red-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.25)]',
    badge: 'bg-red-100/80 text-red-700 dark:bg-red-950/45 dark:text-red-300 border-red-200/50 dark:border-red-800/40',
    line: 'border-red-500/20 dark:border-red-400/15',
    glowBg: 'rgba(239,68,68,0.015)',
  },
  'emergencia-intensivismo': {
    borderHover: 'hover:border-red-500/50 dark:hover:border-red-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.25)]',
    badge: 'bg-red-100/80 text-red-700 dark:bg-red-950/45 dark:text-red-300 border-red-200/50 dark:border-red-800/40',
    line: 'border-red-500/20 dark:border-red-400/15',
    glowBg: 'rgba(239,68,68,0.015)',
  },
  'emergencia-uti': {
    borderHover: 'hover:border-red-500/50 dark:hover:border-red-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.25)]',
    badge: 'bg-red-100/80 text-red-700 dark:bg-red-950/45 dark:text-red-300 border-red-200/50 dark:border-red-800/40',
    line: 'border-red-500/20 dark:border-red-400/15',
    glowBg: 'rgba(239,68,68,0.015)',
  },
  hematologia: {
    borderHover: 'hover:border-rose-600/50 dark:hover:border-rose-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(225,29,72,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(225,29,72,0.25)]',
    badge: 'bg-rose-100/80 text-rose-700 dark:bg-rose-950/45 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/40',
    line: 'border-rose-500/20 dark:border-rose-400/15',
    glowBg: 'rgba(225,29,72,0.015)',
  },
  imunologia: {
    borderHover: 'hover:border-rose-600/50 dark:hover:border-rose-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(225,29,72,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(225,29,72,0.25)]',
    badge: 'bg-rose-100/80 text-rose-700 dark:bg-rose-950/45 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/40',
    line: 'border-rose-500/20 dark:border-rose-400/15',
    glowBg: 'rgba(225,29,72,0.015)',
  },
  'clinica-medica': {
    borderHover: 'hover:border-rose-600/50 dark:hover:border-rose-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(225,29,72,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(225,29,72,0.25)]',
    badge: 'bg-rose-100/80 text-rose-700 dark:bg-rose-950/45 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/40',
    line: 'border-rose-500/20 dark:border-rose-400/15',
    glowBg: 'rgba(225,29,72,0.015)',
  },
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
  pneumologia: {
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
  infectologia: {
    borderHover: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]',
    badge: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40',
    line: 'border-emerald-500/20 dark:border-emerald-400/15',
    glowBg: 'rgba(16,185,129,0.015)',
  },
  infecciosas: {
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
  'reproducao-obstetricia': {
    borderHover: 'hover:border-fuchsia-500/50 dark:hover:border-fuchsia-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(217,70,239,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(217,70,239,0.25)]',
    badge: 'bg-fuchsia-100/80 text-fuchsia-700 dark:bg-fuchsia-950/45 dark:text-fuchsia-300 border-fuchsia-200/50 dark:border-fuchsia-800/40',
    line: 'border-fuchsia-500/20 dark:border-fuchsia-400/15',
    glowBg: 'rgba(217,70,239,0.015)',
  },
  'reproducao-neonatologia': {
    borderHover: 'hover:border-fuchsia-500/50 dark:hover:border-fuchsia-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(217,70,239,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(217,70,239,0.25)]',
    badge: 'bg-fuchsia-100/80 text-fuchsia-700 dark:bg-fuchsia-950/45 dark:text-fuchsia-300 border-fuchsia-200/50 dark:border-fuchsia-800/40',
    line: 'border-fuchsia-500/20 dark:border-fuchsia-400/15',
    glowBg: 'rgba(217,70,239,0.015)',
  },
  neonatologia: {
    borderHover: 'hover:border-pink-400/50 dark:hover:border-pink-300/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(244,114,182,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(244,114,182,0.25)]',
    badge: 'bg-pink-100/80 text-pink-700 dark:bg-pink-950/45 dark:text-pink-300 border-pink-200/50 dark:border-pink-800/40',
    line: 'border-pink-400/20 dark:border-pink-300/15',
    glowBg: 'rgba(244,114,182,0.015)',
  },
  ortopedia: {
    borderHover: 'hover:border-teal-500/50 dark:hover:border-teal-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(20,184,166,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(20,184,166,0.25)]',
    badge: 'bg-teal-100/80 text-teal-700 dark:bg-teal-950/45 dark:text-teal-300 border-teal-200/50 dark:border-teal-800/40',
    line: 'border-teal-500/20 dark:border-teal-400/15',
    glowBg: 'rgba(20,184,166,0.015)',
  },
  oftalmologia: {
    borderHover: 'hover:border-blue-500/50 dark:hover:border-blue-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.25)]',
    badge: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/45 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/40',
    line: 'border-blue-500/20 dark:border-blue-400/15',
    glowBg: 'rgba(59,130,246,0.015)',
  },
  gastroenterologia: {
    borderHover: 'hover:border-orange-500/50 dark:hover:border-orange-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(249,115,22,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.25)]',
    badge: 'bg-orange-100/80 text-orange-700 dark:bg-orange-950/45 dark:text-orange-300 border-orange-200/50 dark:border-orange-800/40',
    line: 'border-orange-500/20 dark:border-orange-400/15',
    glowBg: 'rgba(249,115,22,0.015)',
  },
  'anestesia-dor': {
    borderHover: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/50',
    glow: 'hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    badge: 'bg-cyan-100/80 text-cyan-700 dark:bg-cyan-950/45 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/40',
    line: 'border-cyan-500/20 dark:border-cyan-400/15',
    glowBg: 'rgba(6,182,212,0.015)',
  },
};

const DEFAULT_THEME: EntityCategoryTheme = {
  borderHover: 'hover:border-border-hover',
  glow: 'hover:shadow-[0_0_15px_-3px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)]',
  badge: 'bg-muted/70 text-muted-foreground border-border/60',
  line: 'border-border/60',
  glowBg: 'transparent',
};

export function getEntityCategoryTheme(category?: string | null): EntityCategoryTheme {
  if (!category) return DEFAULT_THEME;

  const normalized = normalizeCategorySlug(
    category
      .trim()
      .toLowerCase()
      .replace(/[_\s]+/g, '-')
  );

  return SPECIALTY_THEMES[normalized] || DEFAULT_THEME;
}

export function getBriefDiseaseSummary(text?: string | null): string {
  if (!text) return '';
  const clean = text.replace(/\*\*/g, '').trim();
  const safeText = clean.replace(/(\b(?:ex|etc|vs|dr|dra|sp|spp|fig|tab)\.)/gi, '$1___TMP_DOT___');
  const matches = safeText.match(/[^.!?]+[.!?]+/g);
  if (!matches || matches.length === 0) return clean;

  const s1 = matches[0].trim();
  // Se a primeira frase for muito longa (>220 caracteres), retorna apenas ela tratada
  if (s1.length > 220) {
    return s1.replace(/___TMP_DOT___/g, '.');
  }

  // Se a primeira for curta, podemos anexar a segunda caso o total não ultrapasse ~240 caracteres (~3-4 linhas)
  if (matches.length > 1) {
    const s2 = matches[1].trim();
    if (s1.length + s2.length <= 240) {
      return (s1 + ' ' + s2).replace(/___TMP_DOT___/g, '.');
    }
  }
  return s1.replace(/___TMP_DOT___/g, '.');
}

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
  const theme = getEntityCategoryTheme(category);

  // Single primary specialty label - no multiple loose tags
  const primaryCategorySlug = category ? normalizeCategorySlug(category) : null;
  const specialtyLabel = primaryCategorySlug
    ? getSpecialtyVisual(primaryCategorySlug).label
    : subtitle
      ? subtitle.split(/\s*[\u2022•]\s*/)[0]
      : null;

  const displayDescription =
    entityType === 'disease' && description
      ? getBriefDiseaseSummary(description)
      : description;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col justify-between rounded-xl border border-border/70 bg-card p-3.5 transition-all duration-300',
        theme.borderHover,
        theme.glow,
        className
      )}
      style={{
        background: `linear-gradient(135deg, var(--card) 0%, ${theme.glowBg || 'var(--card)'} 100%)`,
      }}
    >
      <div>
        {/* Top: Title + Bookmark */}
        <div className="mb-2 flex items-start justify-between gap-2.5">
          <div className="flex min-w-0 items-baseline gap-2">
            {icon && (
              <span className="shrink-0 translate-y-0.5 text-muted-foreground/70 transition-colors group-hover:text-primary">
                {icon}
              </span>
            )}
            <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              <Link to={to} state={linkState} className="focus:outline-hidden">
                {title}
              </Link>
            </h3>
          </div>
          <div className="relative z-10 shrink-0">
            <FavoriteButton
              entityType={entityType}
              entityId={entityId}
              className="h-7 w-7 border border-border/60 bg-background/50 p-1 backdrop-blur-xs transition-colors hover:bg-background"
            />
          </div>
        </div>

        {/* Resumo com teto estrito de no máximo 5 linhas */}
        {displayDescription && (
          <p className="line-clamp-5 text-xs leading-relaxed text-muted-foreground/90">
            {displayDescription}
          </p>
        )}
      </div>

      {/* Footer com tag de especialidade no lugar de 'Clique para consultar' */}
      <div className={cn('mt-3 flex items-center justify-between gap-2 border-t pt-2', theme.line)}>
        {specialtyLabel ? (
          <span
            className={cn(
              'inline-flex max-w-[200px] truncate items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold leading-tight tracking-wide',
              theme.badge
            )}
          >
            {specialtyLabel}
          </span>
        ) : (
          <span className="text-[10px] font-medium text-muted-foreground/75">
            Clique para consultar
          </span>
        )}
        <span className="inline-flex shrink-0 items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-primary transition-all duration-300">
          Abrir
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
});
