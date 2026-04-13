import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers, Zap } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { EmergencyGuide } from '../../types/emergencyGuide';
import { formatSpeciesList } from '../../utils/navigation';

interface EmergencyGuideListCardProps {
  guide: EmergencyGuide;
  className?: string;
}

export function EmergencyGuideListCard({ guide, className }: EmergencyGuideListCardProps) {
  const n = guide.pages.length;

  return (
    <Link
      to={`/consulta-vet/manejo-emergencial/${guide.slug}`}
      className={cn(
        'group block rounded-[1.35rem] border border-border/80 bg-card/80 shadow-sm transition-all',
        'hover:border-amber-500/35 hover:shadow-lg hover:shadow-amber-500/10',
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[1.35rem] p-6 md:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/[0.09] blur-2xl transition-opacity group-hover:opacity-100"
        />
        <div className="relative flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-300">
              <Zap className="h-6 w-6" strokeWidth={2.25} />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              {n} {n === 1 ? 'página' : 'páginas'}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-amber-800 dark:group-hover:text-amber-200 md:text-xl">
              {guide.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              {formatSpeciesList(guide.species)}
            </span>
            {guide.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {t}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 dark:text-amber-300">
            Abrir cartilha
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
