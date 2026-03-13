import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import { EditorialReference } from '../../types/common';

interface ReferencesListProps {
  references?: EditorialReference[];
  title?: string;
  className?: string;
}

export function ReferencesList({
  references,
  title = 'Referências',
  className,
}: ReferencesListProps) {
  if (!references || references.length === 0) return null;

  return (
    <section className={`rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8 ${className || ''}`.trim()}>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      <div className="space-y-4">
        {references.map((reference, index) => (
          <article
            key={reference.id || `${reference.citationText}-${index}`}
            className="rounded-2xl border border-border bg-muted/20 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              {reference.sourceType ? (
                <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {reference.sourceType}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{reference.citationText}</p>
            {reference.notes ? (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{reference.notes}</p>
            ) : null}
            {reference.url ? (
              <a
                href={reference.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
              >
                <Link2 className="h-4 w-4" />
                Abrir fonte
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
