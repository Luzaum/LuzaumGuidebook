import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { ClinicalQuickGuide } from '../../types/clinicalQuickGuide';
import { formatSpeciesList } from '../../utils/navigation';

interface ClinicalQuickGuideCardProps {
  guide: ClinicalQuickGuide;
  categoryLabel: string;
}

export function ClinicalQuickGuideCard({ guide, categoryLabel }: ClinicalQuickGuideCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/consulta-vet/guias-rapidos/${guide.slug}`}
        className={cn(
          'group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-[1.35rem] border border-border/80 bg-card/85 shadow-sm ring-1 ring-transparent transition-all duration-200 ease-out',
          'hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 hover:ring-teal-500/15',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-teal-500/[0.07] blur-2xl transition-opacity duration-200 group-hover:opacity-100"
        />
        <div className="relative flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-700 dark:text-teal-300">
              <BookOpen className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </div>
            <span className="max-w-[10rem] truncate rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {categoryLabel}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-teal-800 dark:group-hover:text-teal-200 md:text-lg">
              {guide.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {formatSpeciesList(guide.species)}
            </span>
          </div>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-300">
            Abrir guia
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
