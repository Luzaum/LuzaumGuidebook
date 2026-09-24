import React, { useMemo } from 'react';
import { BookOpen, FlaskConical } from 'lucide-react';
import type { MedicationRecord } from '../../types/medication';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';

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

function NarrativeHighlightedText({ text, highlights }: { text: string; highlights: string[] }) {
  const segments = useMemo(() => {
    let segs: Seg[] = [{ mark: false, value: text }];
    const sorted = [...highlights].sort((a, b) => b.length - a.length);
    for (const term of sorted) {
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
            className="rounded bg-amber-200/90 dark:bg-amber-400/25 px-1 py-0.5 font-bold text-slate-900 dark:text-amber-200 shadow-2xs"
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

interface EvidenceBlockProps {
  citation: string;
  referenceId: string;
  sourceType?: string;
  summaryText: string;
  summaryHighlights: string[];
  metrics: string[];
  clinicalConclusion: string;
}

function EvidenceFindingBlock({
  citation,
  referenceId,
  refIndex,
  sourceType,
  summaryText,
  summaryHighlights,
  metrics,
  clinicalConclusion,
}: EvidenceBlockProps & { refIndex?: number }) {
  return (
    <div
      data-clinical-visual="evidence"
      className="my-4 rounded-2xl border border-cyan-600/25 border-l-4 border-l-cyan-600 bg-cyan-500/[0.06] p-4.5 sm:p-5 dark:border-cyan-400/25 dark:border-l-cyan-400 dark:bg-cyan-400/[0.08]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-600/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-200">
            <FlaskConical className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-800/80 dark:text-cyan-200/80">
              Evidência publicada
            </p>
            <p className="text-xs sm:text-sm font-bold text-cyan-950 dark:text-cyan-100">
              {citation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {sourceType && (
            <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-800 dark:text-cyan-200">
              {sourceType}
            </span>
          )}
          <a
            href={`#${referenceId}`}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(referenceId);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('ring-2', 'ring-primary', 'transition-all');
                setTimeout(() => target.classList.remove('ring-2', 'ring-primary'), 2000);
              }
            }}
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-1 text-[10px] font-bold text-primary transition-all hover:scale-110 hover:bg-primary/20 active:scale-95 sm:h-7 sm:min-w-7 sm:px-2 sm:text-xs"
            title={citation || `Ver referência ${(refIndex ?? 0) + 1}`}
          >
            {(refIndex ?? 0) + 1}
          </a>
        </div>
      </div>

      <div className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/90">
        <NarrativeHighlightedText text={summaryText} highlights={summaryHighlights} />
      </div>

      <div className="mt-3 rounded-xl bg-background/80 p-3 border border-cyan-600/20">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 block mb-0.5">
          Impacto Clínico Direto
        </span>
        <p className="text-xs font-semibold leading-relaxed text-foreground">
          {clinicalConclusion}
        </p>
      </div>

      {metrics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Métricas principais do estudo">
          {metrics.map((metric) => (
            <span
              key={metric}
              className="inline-flex min-h-6 items-center rounded-md border border-cyan-600/30 bg-background/90 px-2.5 py-0.5 text-[11px] font-bold text-cyan-950 dark:text-cyan-100 shadow-2xs"
            >
              {metric}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function MedicationClinicalFoundationsSection({
  medication,
}: {
  medication?: MedicationRecord;
}) {
  const customFoundations = medication?.clinicalFoundationsData;
  const allRefs = medication?.references ?? [];
  const getRefIndex = (refId: string): number => {
    const idx = allRefs.findIndex((r) => r.id === refId);
    return idx >= 0 ? idx : 0;
  };
  return (
    <section
      id="fundamentos-clinicos"
      className="consulta-vet-readable-highlights scroll-mt-24 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-xs space-y-8"
    >
      <div className="flex items-center gap-3 border-b border-border/70 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg sm:text-xl font-black text-foreground">
            Fundamentos Clínicos & Evidências Farmacológicas
          </h3>
          <p className="text-xs text-muted-foreground">
            Mecanismos, aplicação clínica e referências específicas deste medicamento
          </p>
        </div>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/90">
        {customFoundations && customFoundations.length > 0 ? (
          customFoundations.map((topic, topicIdx) => (
            <article key={topic.id || topicIdx} className={`space-y-3 ${topicIdx > 0 ? 'border-t border-border/60 pt-6' : ''}`}>
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  {topicIdx + 1}
                </span>
                {topic.title}
              </h4>
              <div className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                <NarrativeHighlightedText text={topic.narrative} highlights={topic.narrativeHighlights || []} />
                {(() => {
                  // Filtrar apenas referências a artigos, diretrizes e ensaios (exclui livros para não poluir o texto)
                  const articleRefIds = (topic.referenceIds || []).filter((id) => {
                    const ref = allRefs.find((r) => r.id === id);
                    if (!ref) return false;
                    const isBook =
                      ref.id?.startsWith('ref-book-foundations-') ||
                      ref.sourceType === 'Formulário farmacológico' ||
                      ref.sourceType === 'Tratado de Medicina Interna';
                    return !isBook;
                  });
                  if (articleRefIds.length === 0) return null;
                  return (
                    <span className="inline-flex items-center gap-1 ml-1.5 align-baseline" aria-label="Citações do tópico">
                      {articleRefIds.map((id) => {
                        const refIdx = getRefIndex(id);
                        const reference = allRefs.find((item) => item.id === id);
                        return (
                          <a
                            key={id}
                            href={`#${id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const target = document.getElementById(id);
                              if (target) {
                                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                target.classList.add('ring-2', 'ring-primary', 'transition-all');
                                setTimeout(() => target.classList.remove('ring-2', 'ring-primary'), 2000);
                              }
                            }}
                            className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-1 text-[10px] font-bold text-primary transition-all hover:scale-110 hover:bg-primary/20 active:scale-95"
                            title={reference?.citationText || reference?.title || `Ver referência ${refIdx + 1} no final da página`}
                          >
                            {refIdx + 1}
                          </a>
                        );
                      })}
                    </span>
                  );
                })()}
              </div>
              {topic.studies?.map((study, studyIdx) => (
                <EvidenceFindingBlock
                  key={study.referenceId || studyIdx}
                  citation={study.citation}
                  referenceId={study.referenceId}
                  refIndex={getRefIndex(study.referenceId)}
                  sourceType={study.sourceType}
                  summaryText={study.summaryText}
                  summaryHighlights={study.summaryHighlights || []}
                  metrics={study.metrics || []}
                  clinicalConclusion={study.clinicalConclusion}
                />
              ))}
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Fundamentos específicos ainda não cadastrados para este medicamento.</p>
        )}
      </div>
    </section>
  );
}
