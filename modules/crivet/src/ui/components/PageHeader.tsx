import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon: Icon,
  title,
  description,
  className,
}) => (
  <header className={cn('mb-6 md:mb-8', className)}>
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-400">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
    </div>
  </header>
);
