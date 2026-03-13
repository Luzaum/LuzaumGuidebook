import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--pv-primary)] text-white',
        secondary: 'border-transparent bg-[var(--pv-surface-hover)] text-[var(--pv-text-main)]',
        destructive: 'border-transparent bg-[var(--pv-accent-red)] text-white',
        warning: 'border-transparent bg-[var(--pv-accent-yellow)]/15 text-[var(--pv-accent-yellow-strong)]',
        success: 'border-transparent bg-[var(--pv-accent-green)]/15 text-[var(--pv-accent-green-strong)]',
        outline: 'border-[var(--pv-border)] text-[var(--pv-text-main)] bg-[var(--pv-surface)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
