import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface SectionCardProps {
  step?: number;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  step,
  icon: Icon,
  title,
  subtitle,
  children,
  className,
}) => (
  <section
    className={cn(
      'rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-5',
      className,
    )}
  >
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {step != null ? (
          <span className="text-sm font-bold">{step}</span>
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
    {children}
  </section>
);
