import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import { EditorialReference } from '../../types/common';
import { sanitizeReferenceText } from '../../utils/referenceSanitizer';

interface ReferencesListProps {
  references?: EditorialReference[];
  title?: string;
  className?: string;
  /** Dentro de DiseaseSectionFrame: sem card externo nem título duplicado */
  variant?: 'standalone' | 'embedded';
}

function resolveReferenceUrl(reference: EditorialReference, citation: string): string {
  if (reference.url) return reference.url;
  if (reference.doi) return `https://doi.org/${reference.doi}`;
  if (reference.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`;

  const doiMatch = citation.match(/\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i)?.[0];
  if (doiMatch) {
    return `https://doi.org/${doiMatch.replace(/[.,;]+$/, '')}`;
  }

  const pmidMatch = citation.match(/\bPMID:\s*(\d{5,9})/i)?.[1];
  if (pmidMatch) {
    return `https://pubmed.ncbi.nlm.nih.gov/${pmidMatch}/`;
  }

  const query = encodeURIComponent(
    (reference.title || citation).replace(/\s+/g, ' ').trim().slice(0, 180)
  );
  if (/formulário|tratado|livro|manual/i.test(reference.sourceType || '')) {
    return `https://scholar.google.com/scholar?q=${query}`;
  }
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${query}`;
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
      {references.map((reference, index) => {
        const rawCitation =
          reference.citationText ||
          reference.citation ||
          [
            reference.authors,
            reference.title,
            reference.journal,
            reference.year,
            reference.volume,
          ]
            .filter(Boolean)
            .join('. ');
        const citation = sanitizeReferenceText(rawCitation);
        const notes = sanitizeReferenceText(reference.notes);
        const sourceType = sanitizeReferenceText(reference.sourceType);
        const evidenceLevel = sanitizeReferenceText(reference.evidenceLevel);
        const href = resolveReferenceUrl(reference, citation);

        return (
          <article
            key={reference.id || `${reference.citationText}-${index}`}
            id={reference.id || `reference-${index + 1}`}
            className="scroll-mt-24 py-4 transition-colors duration-500 first:pt-0 last:pb-0 target:rounded-2xl target:bg-primary/[0.05] target:ring-2 target:ring-primary/25 target:ring-offset-2 target:ring-offset-background"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/70 px-1.5 text-xs font-bold text-foreground mt-0.5">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  {sourceType || evidenceLevel ? (
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {sourceType ? (
                        <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                          {sourceType}
                        </span>
                      ) : null}
                      {evidenceLevel ? (
                        <span className="rounded-full border border-amber-500/25 bg-amber-500/[0.08] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-200">
                          Evidência: {evidenceLevel}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <p className="break-words text-[14px] leading-relaxed text-foreground/90 [overflow-wrap:anywhere]">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline hover:text-primary transition-colors cursor-pointer"
                      title="Abrir referência em nova aba"
                    >
                      <span className="group-hover:underline">{citation}</span>
                      <ExternalLink className="inline-block ml-1.5 h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors align-baseline" />
                    </a>
                  </p>
                  {notes ? (
                    <p className="mt-1.5 max-w-[82ch] break-words text-xs leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                      {notes}
                    </p>
                  ) : null}
                </div>
              </div>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary hover:bg-primary/[0.04] self-start sm:ml-2"
              >
                <Link2 className="h-3.5 w-3.5" />
                {reference.url ? 'Abrir fonte' : 'Buscar fonte'}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        );
      })}
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
    <section className={`rounded-[22px] border border-border bg-card/92 p-4 shadow-sm md:rounded-[30px] md:p-8 ${className || ''}`.trim()}>
      <div className="mb-5 md:mb-6">
        <h2 className="text-[22px] font-bold tracking-tight text-foreground md:text-[28px]">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Referências de apoio organizadas de forma mais compacta e discreta.
        </p>
      </div>
      {list}
    </section>
  );
}
