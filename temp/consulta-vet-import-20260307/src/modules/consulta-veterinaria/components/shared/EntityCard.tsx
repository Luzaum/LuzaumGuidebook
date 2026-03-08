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
  className?: string;
  key?: React.Key;
}

export function EntityCard({
  to,
  title,
  subtitle,
  description,
  tags,
  icon,
  entityType,
  entityId,
  className,
}: EntityCardProps) {
  return (
    <div
      className={cn(
        'group relative bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/50 transition-all duration-200 flex flex-col',
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              <Link to={to} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {title}
              </Link>
            </h3>
            {subtitle && <p className="text-xs font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">{subtitle}</p>}
          </div>
        </div>
        <div className="relative z-10">
          <FavoriteButton entityType={entityType} entityId={entityId} className="w-8 h-8 p-1.5" />
        </div>
      </div>

      {description && <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{description}</p>}

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-medium rounded uppercase tracking-wider truncate max-w-[100px]">
              {tag}
            </span>
          ))}
          {tags && tags.length > 3 && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-medium rounded uppercase tracking-wider">
              +{tags.length - 3}
            </span>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>
    </div>
  );
}
