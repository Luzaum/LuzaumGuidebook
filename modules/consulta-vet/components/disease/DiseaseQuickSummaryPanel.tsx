import React, { useMemo, useState } from 'react';
import { ArrowRight, HelpCircle, Activity, Heart, ShieldAlert } from 'lucide-react';
import { DiseaseQuickSummaryRich } from '../../types/disease';
import { getSimplifiedDiseaseDefinition } from '../../utils/simplifiedDefinitions';
import { cn } from '../../../../lib/utils';

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
            className="rounded bg-amber-200/95 px-1 font-bold text-slate-900 shadow-xs dark:bg-amber-300 dark:text-slate-950"
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

export function DiseaseQuickSummaryPanel({ data, slug }: { data: DiseaseQuickSummaryRich; slug: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'diagnosis' | 'treatment'>('overview');
  const simpleDef = getSimplifiedDiseaseDefinition(slug);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: HelpCircle },
    { id: 'diagnosis', label: 'Jornada Diagnóstica', icon: Activity },
    { id: 'treatment', label: 'Plano Terapêutico', icon: Heart },
  ] as const;

  return (
    <div className="relative z-10 space-y-6">
      {/* Sistema de Abas Clínicas premium com glassmorphism */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300',
                isActive
                  ? 'bg-white text-slate-950 shadow-md scale-[1.02]'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Renderização do conteúdo da Aba */}
      <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* O que é em palavras simples - Callout moderno */}
            {simpleDef && (
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xs backdrop-blur-md">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  O que é isso em palavras simples?
                </h4>
                <p className="mt-2.5 text-base font-semibold leading-relaxed text-white/95 md:text-lg">
                  {simpleDef.whatIsIt}
                </p>
                <div className="mt-4 grid gap-2.5 text-xs leading-relaxed text-white/80 sm:grid-cols-3">
                  {simpleDef.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex gap-2 rounded-lg bg-black/15 px-3 py-2">
                      <span className="text-amber-200">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Texto de liderança clínica e pilares */}
            <div className="space-y-6">
              <div className="max-w-[108ch]">
                <p className="text-base leading-relaxed text-white/90 drop-shadow-sm md:text-lg md:leading-8">
                  <HighlightedText text={data.lead} highlights={data.leadHighlights} />
                </p>
              </div>

              {data.pillars && data.pillars.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.pillars.map((p) => (
                    <div
                      key={p.title}
                      className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-xs backdrop-blur-md"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">{p.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/95">
                        <HighlightedText text={p.body} highlights={p.highlights} />
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'diagnosis' && (
          <div className="rounded-2xl border border-white/10 bg-black/10 p-5 backdrop-blur-sm dark:bg-black/20">
            {data.diagnosticFlow ? (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/60">{data.diagnosticFlow.title}</p>
                <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {data.diagnosticFlow.steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col gap-3 rounded-xl bg-white/8 p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-extrabold text-white">
                          {idx + 1}
                        </span>
                        {idx < data.diagnosticFlow!.steps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-white/30 hidden sm:block" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white">{step.label}</p>
                        {step.detail && (
                          <p className="mt-2 text-xs leading-relaxed text-white/80">{step.detail}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-white/60">Fluxo diagnóstico indisponível.</p>
            )}
          </div>
        )}

        {activeTab === 'treatment' && (
          <div className="rounded-2xl border border-white/10 bg-black/10 p-5 backdrop-blur-sm dark:bg-black/20">
            {data.treatmentFlow ? (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/60">{data.treatmentFlow.title}</p>
                <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {data.treatmentFlow.steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col gap-3 rounded-xl bg-white/8 p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-extrabold text-white">
                          {idx + 1}
                        </span>
                        {idx < data.treatmentFlow!.steps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-white/30 hidden sm:block" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white">{step.label}</p>
                        {step.detail && (
                          <p className="mt-2 text-xs leading-relaxed text-white/80">{step.detail}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-white/60">Fluxo terapêutico indisponível.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
