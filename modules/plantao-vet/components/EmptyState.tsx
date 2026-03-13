import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from './ui/Button';

type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

interface EmptyStateProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  children?: React.ReactNode;
}

function ActionButton({ action, variant }: { action: EmptyStateAction; variant: 'default' | 'outline' }) {
  if (action.href) {
    return (
      <Link to={action.href}>
        <Button variant={variant}>{action.label}</Button>
      </Link>
    );
  }

  return (
    <Button variant={variant} onClick={action.onClick}>
      {action.label}
    </Button>
  );
}

export function EmptyState({
  icon: Icon,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
}: EmptyStateProps) {
  return (
    <section className="rounded-2xl border border-dashed border-[var(--pv-border)] bg-[var(--pv-surface)] px-6 py-10 text-center shadow-sm">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--pv-surface-hover)] text-[var(--pv-primary)]">
          <Icon className="h-7 w-7" />
        </div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--pv-primary)]">
          {eyebrow}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--pv-text-main)] sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--pv-text-muted)] sm:text-base">{description}</p>
        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
              {primaryAction ? <ActionButton action={primaryAction} variant="default" /> : null}
            {secondaryAction ? <ActionButton action={secondaryAction} variant="outline" /> : null}
          </div>
        )}
        {children ? (
          <div className="mt-8 grid w-full gap-3 text-left text-sm leading-6 text-[var(--pv-text-muted)] md:grid-cols-3">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
