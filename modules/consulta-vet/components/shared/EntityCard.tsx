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
  key?: React.Key;
}

export function EntityCard({
  to,
  title,
  subtitle,
  description,
  icon,
  entityType,
  entityId,
  linkState,
  className,
}: EntityCardProps) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-sm',
        className
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            {icon && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </span>
            )}
            <h3 className="line-clamp-2 text-base font-semibold leading-tight text-foreground group-hover:text-primary">
              <Link to={to} state={linkState} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {title}
              </Link>
            </h3>
          </div>
          {subtitle && (
            <p className="line-clamp-1 text-xs font-medium text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="relative z-10 shrink-0">
          <FavoriteButton entityType={entityType} entityId={entityId} className="h-8 w-8 p-1.5" />
        </div>
      </div>

      {description && (
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{description}</p>
      )}

      <div className="mt-auto flex items-center justify-end border-t border-border/60 pt-3">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary">
          Abrir
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
