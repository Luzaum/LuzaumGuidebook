import React, { useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import { DiseaseQuickSummaryRich } from '../../types/disease';

function sortHighlightsLongestFirst(terms: string[]): string[] {
  return [...new Set(terms.map((t) => t.trim()).filter(Boolean))].sort((a, b) => b.length - a.length);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type Seg = { mark: boolean; value: string };

function applyHighlightTerms(segments: Seg[], term: string): Seg[] {
  const out: Seg[] = [];
  for (const seg of segments) {
    if (seg.mark) {
      out.push(seg);
      continue;
    }
    let last = 0;
    let m: RegExpExecArray | null;
    const r = new RegExp(escapeRegExp(term), 'gi');
    while ((m = r.exec(seg.value)) !== null) {
      if (m.index > last) out.push({ mark: false, value: seg.value.slice(last, m.index) });
      out.push({ mark: true, value: m[0] });
      last = m.index + m[0].length;
    }
    if (last < seg.value.length) out.push({ mark: false, value: seg.value.slice(last) });
  }
  return out;
}

/**
 * Destaca substrings em `text` com <mark> (termos mais longos primeiro).
 */
export function HighlightedText({ text, highlights }: { text: string; highlights?: string[] }) {
  const segments = useMemo(() => {
    if (!highlights?.length) return [{ mark: false, value: text }];
    let segs: Seg[] = [{ mark: false, value: text }];
    for (const term of sortHighlightsLongestFirst(highlights)) {
      segs = applyHighlightTerms(segs, term);
    }
    return segs;
  }, [text, highlights]);

  return (
    <>
      {segments.map((n, i) =>
        n.mark ? (
          <mark
            key={i}
            className="rounded-sm bg-amber-200/95 px-0.5 font-medium text-slate-900 dark:bg-amber-300/40 dark:text-amber-50"
          >
            {n.value}
          </mark>
        ) : (
          <span key={i}>{n.value}</span>
        )
      )}
    </>
  );
}

export function DiseaseQuickSummaryPanel({ data }: { data: DiseaseQuickSummaryRich }) {
  return (
    <div className="relative z-10 space-y-8">
      <div className="max-w-[108ch] space-y-4">
        <p className="text-lg leading-relaxed text-white/95 drop-shadow-sm md:text-xl md:leading-8">
          <HighlightedText text={data.lead} highlights={data.leadHighlights} />
        </p>
      </div>

      {data.pillars && data.pillars.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/25 bg-white/12 p-4 shadow-md backdrop-blur-md md:p-5 dark:bg-white/10"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/95 md:text-[15px] md:leading-7">
                <HighlightedText text={p.body} highlights={p.highlights} />
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {data.diagnosticFlow ? (
          <div className="rounded-2xl border border-white/20 bg-black/15 p-4 backdrop-blur-sm md:p-5 dark:bg-black/25">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">{data.diagnosticFlow.title}</p>
            <ol className="mt-4 space-y-0">
              {data.diagnosticFlow.steps.map((step, idx) => (
                <li key={idx}>
                  {idx > 0 ? (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="h-4 w-4 text-white/50" aria-hidden />
                    </div>
                  ) : null}
                  <div className="flex items-start gap-3 rounded-xl bg-white/12 px-3 py-2.5 md:px-4">
                    <span className="flex h-8 min-w-8 shrink-0 items-center justify-center self-start rounded-full bg-white/25 text-xs font-bold text-white shadow-inner">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-semibold leading-snug text-white">{step.label}</p>
                      {step.detail ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-white/88">{step.detail}</p>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {data.treatmentFlow ? (
          <div className="rounded-2xl border border-white/20 bg-black/15 p-4 backdrop-blur-sm md:p-5 dark:bg-black/25">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">{data.treatmentFlow.title}</p>
            <ol className="mt-4 space-y-0">
              {data.treatmentFlow.steps.map((step, idx) => (
                <li key={idx}>
                  {idx > 0 ? (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="h-4 w-4 text-white/50" aria-hidden />
                    </div>
                  ) : null}
                  <div className="flex items-start gap-3 rounded-xl bg-white/12 px-3 py-2.5 md:px-4">
                    <span className="flex h-8 min-w-8 shrink-0 items-center justify-center self-start rounded-full bg-white/25 text-xs font-bold text-white shadow-inner">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-semibold leading-snug text-white">{step.label}</p>
                      {step.detail ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-white/88">{step.detail}</p>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </div>
  );
}
