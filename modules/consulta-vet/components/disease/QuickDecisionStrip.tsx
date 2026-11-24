import { PROGRESSIVE_SUMMARY_PREVIEWS } from '../../data/progressiveSummaryPreviews';
import { CONCISE_DISEASE_SUMMARIES } from '../../data/conciseClinicalSummaries';
import { SummaryPreview } from '../shared/SummaryPreview';
import React from 'react';
import { Zap } from 'lucide-react';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';

interface QuickDecisionStripProps {
  items: string[];
  slug?: string;
  className?: string;
}

/**
 * Faixa horizontal com frases curtas — só o essencial para decisão rápida.
 */
export function QuickDecisionStrip({ items, slug, className = '' }: QuickDecisionStripProps) {
  const trimmed = items.map((s) => s.trim()).filter(Boolean);
  const preview = slug ? (PROGRESSIVE_SUMMARY_PREVIEWS[slug]?.attention ?? CONCISE_DISEASE_SUMMARIES[slug]?.points.join(' ')) : undefined;
  if (!trimmed.length) return null;

  return (
    <section
      id="quick-strip"
      className={`scroll-mt-24 overflow-hidden rounded-[20px] border border-border bg-transparent md:rounded-[28px] ${className}`.trim()}
    >
      <div className="p-4 md:p-6">
        <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
          <Zap className="h-4 w-4" aria-hidden />
          Decisão rápida
        </p>
        <SummaryPreview preview={preview} dark={false}>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
          {trimmed.map((text, index) => (
            <div
              key={`${index}-${text.slice(0, 24)}`}
              className="min-w-[min(100%,220px)] max-w-[300px] shrink-0 rounded-2xl border border-border bg-transparent px-4 py-3 text-[13px] leading-snug text-foreground/90"
            >
              <span className="mb-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-lg bg-primary/15 px-2 text-[11px] font-bold text-primary">
                {index + 1}
              </span>
              <p className="mt-1">
                <ClinicalAbbreviationText text={text} />
              </p>
            </div>
          ))}
        </div>
        </SummaryPreview>
      </div>
    </section>
  );
}
