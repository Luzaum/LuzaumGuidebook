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
    <section className={`rounded-[30px] border border-border bg-card/92 p-7 shadow-sm md:p-8 ${className || ''}`.trim()}>
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Referências de apoio organizadas de forma mais compacta e discreta.
        </p>
      </div>

      <div className="divide-y divide-border/70">
        {references.map((reference, index) => (
          <article
            key={reference.id || `${reference.citationText}-${index}`}
            className="py-5 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {reference.sourceType ? (
                    <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      {reference.sourceType}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-[15px] leading-7 text-foreground/92">{reference.citationText}</p>
                {reference.notes ? (
                  <p className="mt-2 max-w-[82ch] text-sm leading-7 text-muted-foreground">{reference.notes}</p>
                ) : null}
              </div>

              {reference.url ? (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Link2 className="h-4 w-4" />
                  Abrir fonte
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
