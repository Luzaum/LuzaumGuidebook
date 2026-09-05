import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import { EditorialReference } from '../../types/common';

interface ReferencesListProps {
  references?: EditorialReference[];
  title?: string;
  className?: string;
  /** Dentro de DiseaseSectionFrame: sem card externo nem título duplicado */
  variant?: 'standalone' | 'embedded';
}

export function ReferencesList({
  references,
  title = 'Referências',
  className,
  variant = 'standalone',
}: ReferencesListProps) {
  if (!references || references.length === 0) return null;

  const list = (
    <div className="divide-y divide-border/70">
        {references.map((reference, index) => (
          <article
            key={reference.id || `${reference.citationText}-${index}`}
            id={reference.id || `reference-${index + 1}`}
            className="scroll-mt-24 py-5 transition-colors duration-500 first:pt-0 last:pb-0 target:rounded-2xl target:bg-primary/[0.05] target:ring-2 target:ring-primary/25 target:ring-offset-2 target:ring-offset-background"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-border bg-muted/45 px-2 text-xs font-bold text-foreground">
                    {index + 1}
                  </span>
                  {reference.sourceType ? (
                    <span className="max-w-full break-words rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                      {reference.sourceType}
                    </span>
                  ) : null}
                  {reference.evidenceLevel ? (
                    <span className="max-w-full break-words rounded-full border border-amber-500/25 bg-amber-500/[0.08] px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-200">
                      Evidência: {reference.evidenceLevel}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 break-words text-[15px] leading-7 text-foreground/92 [overflow-wrap:anywhere]">{reference.citationText}</p>
                {reference.notes ? (
                  <p className="mt-2 max-w-[82ch] break-words text-sm leading-7 text-muted-foreground [overflow-wrap:anywhere]">{reference.notes}</p>
                ) : null}
              </div>

              {reference.url ? (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
  );

  if (variant === 'embedded') {
    return (
      <div className={className}>
        <p className="mb-5 max-w-[90ch] text-sm leading-7 text-muted-foreground">
          Fontes com tipo, nível de evidência quando informado e links para aprofundamento.
        </p>
        {list}
      </div>
    );
  }

  return (
    <section className={`rounded-[30px] border border-border bg-card/92 p-7 shadow-sm md:p-8 ${className || ''}`.trim()}>
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Referências de apoio organizadas de forma mais compacta e discreta.
        </p>
      </div>
      {list}
    </section>
  );
}
