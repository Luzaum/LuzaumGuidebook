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
  complete?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  step,
  icon: Icon,
  title,
  subtitle,
  children,
  className,
  complete = false,
}) => (
  <section
    className={cn(
      'rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] dark:border-slate-800 dark:bg-slate-900 md:p-6',
      className,
    )}
  >
    <div className="mb-5 flex items-center gap-3">
      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold', complete ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950')}>
        {step != null ? (
          <span className="text-sm font-bold">{step}</span>
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>
      <div className="min-w-0">
        <h2 className="text-base font-bold tracking-tight text-slate-950 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
    {children}
  </section>
);
