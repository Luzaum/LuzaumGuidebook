import { PROGRESSIVE_SUMMARY_PREVIEWS } from '../../data/progressiveSummaryPreviews';
import { CONCISE_DISEASE_SUMMARIES } from '../../data/conciseClinicalSummaries';
import { SummaryPreview } from '../shared/SummaryPreview';
import React, { useMemo, useState } from 'react';
import { HelpCircle, Activity, Heart, ShieldAlert, Zap } from 'lucide-react';
import { DiseaseQuickSummaryRich } from '../../types/disease';
import { getSimplifiedDiseaseDefinition } from '../../utils/simplifiedDefinitions';
import { cn } from '../../../../lib/utils';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';
import { ClinicalFlowTimeline } from './ClinicalFlowTimeline';
import { StructuredSummaryText } from '../shared/StructuredSummaryText';

function sortHighlightsLongestFirst(terms: string[]): string[] {
  return [...new Set(terms.map((t) => t.trim()).filter(Boolean))].sort((a, b) => b.length - a.length);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type Seg = { mark: boolean; value: string };

function splitExplicitMarks(text: string): Seg[] {
  if (!text.includes('==')) return [{ mark: false, value: text }];
  const out: Seg[] = [];
  for (const part of text.split(/(==[^=\n]+==)/g)) {
    if (!part) continue;
    if (part.startsWith('==') && part.endsWith('==') && part.length >= 5) {
      out.push({ mark: true, value: part.slice(2, -2) });
    } else {
      out.push({ mark: false, value: part });
    }
  }
  return out;
}

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
 * Destaca substrings (`highlights`) e marcadores `==...==` com `<mark>`.
 */
export function HighlightedText({ text, highlights }: { text: string; highlights?: string[] }) {
  const segments = useMemo(() => {
    let segs: Seg[] = splitExplicitMarks(text);
    if (highlights?.length) {
      for (const term of sortHighlightsLongestFirst(highlights)) {
        segs = applyHighlightTerms(segs, term);
      }
    }
    return segs;
  }, [text, highlights]);

  return (
    <>
      {segments.map((n, i) =>
        n.mark ? (
          <mark
            key={i}
            className="bg-transparent font-semibold text-foreground underline decoration-primary/40 decoration-2 underline-offset-4"
          >
            {n.value}
          </mark>
        ) : (
          <ClinicalAbbreviationText key={i} text={n.value} />
        )
      )}
    </>
  );
}

export function DiseaseQuickSummaryPanel({
  data,
  slug,
  plainLanguage,
  quickDecisionItems,
}: {
  data: DiseaseQuickSummaryRich;
  slug: string;
  plainLanguage?: { whatIsIt: string; keyPoints: string[] } | null;
  quickDecisionItems?: string[];
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'diagnosis' | 'treatment'>('overview');
  const simpleDef = plainLanguage ?? getSimplifiedDiseaseDefinition(slug);
  const preview = PROGRESSIVE_SUMMARY_PREVIEWS[slug];
  const clinicalPreview = CONCISE_DISEASE_SUMMARIES[slug];
  const integrated = Boolean(data.integratedOverview);
  const decisionList = useMemo(
    () => (quickDecisionItems ?? []).map((item) => item.trim()).filter(Boolean),
    [quickDecisionItems]
  );

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: HelpCircle },
    { id: 'diagnosis', label: 'Plano diagnóstico', icon: Activity },
    { id: 'treatment', label: 'Plano de tratamento', icon: Heart },
  ] as const;

  return (
    <div className="relative z-10 space-y-4 md:space-y-6">
      <div className="grid grid-cols-3 gap-1.5 border-b border-border pb-3 md:flex md:flex-wrap md:gap-2 md:pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1 text-center text-[9px] font-bold uppercase leading-tight tracking-normal transition-all duration-300 md:flex-row md:gap-2 md:rounded-xl md:px-4 md:py-2.5 md:text-xs md:tracking-wider',
                isActive
                  ? 'border border-foreground/40 bg-muted/40 text-foreground'
                  : 'border border-border bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {integrated ? (
              <>
                <div className="rounded-xl border border-border bg-transparent p-4 md:rounded-2xl md:p-5">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    O que é e visão inicial
                  </h4>

                  {simpleDef ? (
                    <StructuredSummaryText
                      text={simpleDef.whatIsIt}
                      renderInline={(chunk) => <HighlightedText text={chunk} highlights={data.leadHighlights} />}
                      className="mt-2.5 text-sm leading-6 text-foreground/90 md:text-base md:leading-relaxed"
                      paragraphClassName="font-semibold"
                    />
                  ) : null}

                  {data.lead?.trim() ? (
                    <StructuredSummaryText
                      text={data.lead}
                      renderInline={(chunk) => <HighlightedText text={chunk} highlights={data.leadHighlights} />}
                      className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-foreground/90 md:text-[15px]"
                    />
                  ) : null}

                  {simpleDef?.keyPoints?.length ? (
                    <div className="mt-4 grid gap-2.5 text-xs leading-relaxed text-foreground/90 sm:grid-cols-3">
                      {simpleDef.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex gap-2 rounded-lg border border-border bg-transparent px-3 py-2.5">
                          <span className="font-bold text-foreground">•</span>
                          <span>
                            <HighlightedText text={point} highlights={data.leadHighlights} />
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                {decisionList.length > 0 ? (
                  <div
                    id="quick-strip"
                    className="scroll-mt-24 rounded-xl border border-border bg-transparent p-4 md:rounded-2xl md:p-5"
                  >
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                      <Zap className="h-4 w-4 shrink-0" aria-hidden />
                      Decisão rápida à beira do leito
                    </h4>
                    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                      {decisionList.map((item, idx) => (
                        <div
                          key={`${idx}-${item.slice(0, 20)}`}
                          className="flex items-start gap-2.5 rounded-xl border border-border bg-transparent px-3.5 py-2.5 text-xs leading-relaxed text-foreground/90 md:text-[13px]"
                        >
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-300/20 text-[11px] font-extrabold text-foreground">
                            {idx + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <HighlightedText text={item} highlights={data.leadHighlights} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {simpleDef && (
                  <div className="rounded-xl border border-border bg-transparent p-4 md:rounded-2xl md:p-5">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      O que é isso em palavras simples?
                    </h4>
                    <div className="mt-3 text-sm leading-6">
                      <SummaryPreview dark={false} preview={preview?.simple}>
                        <StructuredSummaryText
                          text={simpleDef.whatIsIt}
                          renderInline={(chunk) => <HighlightedText text={chunk} highlights={data.leadHighlights} />}
                          className="mt-2.5 text-sm leading-6 text-foreground/90 md:text-lg md:leading-relaxed"
                          paragraphClassName="font-semibold"
                        />
                        <div className="mt-4 grid gap-2.5 text-xs leading-relaxed text-foreground/90 sm:grid-cols-3">
                          {simpleDef.keyPoints.map((point, idx) => (
                            <div key={idx} className="flex gap-2 rounded-lg border border-border bg-transparent px-3 py-2">
                              <span className="text-foreground">•</span>
                              <span>
                                <HighlightedText text={point} highlights={data.leadHighlights} />
                              </span>
                            </div>
                          ))}
                        </div>
                      </SummaryPreview>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="rounded-2xl border border-border bg-transparent p-4 md:p-5">
                    <div className="text-sm leading-6 text-foreground/90">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground">Visão clínica</h4>
                      <SummaryPreview dark={false} preview={preview?.clinical ?? clinicalPreview?.definition}>
                        <StructuredSummaryText
                          text={data.lead}
                          renderInline={(chunk) => <HighlightedText text={chunk} highlights={data.leadHighlights} />}
                        />
                      </SummaryPreview>
                    </div>
                  </div>

                  {data.pillars && data.pillars.length > 0 && (
                    <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {data.pillars.map((p) => (
                        <div
                          key={p.title}
                          className="rounded-xl border border-border bg-transparent p-4 md:rounded-2xl md:p-5"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{p.title}</p>
                          <div className="mt-2 text-sm leading-relaxed text-foreground/90">
                            <SummaryPreview dark={false} preview={preview?.pillars[p.title]}>
                              <StructuredSummaryText
                                text={p.body}
                                renderInline={(chunk) => <HighlightedText text={chunk} highlights={p.highlights} />}
                              />
                            </SummaryPreview>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'diagnosis' && (
          <div className="rounded-xl border border-border bg-transparent p-4 md:rounded-2xl md:p-5">
            {data.diagnosticFlow ? (
              <ClinicalFlowTimeline flow={data.diagnosticFlow} variant="light" />
            ) : (
              <p className="text-sm text-muted-foreground">Fluxo diagnóstico indisponível.</p>
            )}
          </div>
        )}

        {activeTab === 'treatment' && (
          <div className="rounded-xl border border-border bg-transparent p-4 md:rounded-2xl md:p-5">
            {data.treatmentFlow ? (
              <ClinicalFlowTimeline flow={data.treatmentFlow} variant="light" />
            ) : (
              <p className="text-sm text-muted-foreground">Fluxo terapêutico indisponível.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
