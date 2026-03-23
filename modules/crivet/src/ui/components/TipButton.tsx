import React from 'react';
import { BadgeCheck, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

interface TipButtonProps {
  label?: string;
  onClick: () => void;
  variant?: 'tip' | 'book';
  compact?: boolean;
  className?: string;
}

export const TipButton: React.FC<TipButtonProps> = ({
  label,
  onClick,
  variant = 'tip',
  compact = false,
  className,
}) => {
  const Icon = variant === 'book' ? BookOpen : BadgeCheck;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm font-bold transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10',
        variant === 'book'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/15'
          : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/15',
        compact && 'min-h-9 rounded-xl px-2.5 py-1.5 text-[11px]',
        className,
      )}
    >
      <Icon className={compact ? 'h-4 w-4' : 'h-4 w-4'} />
      {label && <span>{label}</span>}
    </button>
  );
};
