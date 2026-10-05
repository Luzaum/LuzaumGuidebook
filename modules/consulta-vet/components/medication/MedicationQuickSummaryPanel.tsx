import { PROGRESSIVE_SUMMARY_PREVIEWS } from '../../data/progressiveSummaryPreviews';
import { CONCISE_MEDICATION_SUMMARIES } from '../../data/conciseClinicalSummaries';
import { SummaryPreview } from '../shared/SummaryPreview';
import React, { useMemo } from 'react';
import {
  Clock,
  AlertTriangle,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Thermometer,
  Syringe,
  Info,
  FileText,
} from 'lucide-react';
import type { MedicationRecord, MedicationQuickIndication } from '../../types/medication';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';

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
            className="rounded bg-amber-200/90 px-1 font-semibold text-slate-900 shadow-xs dark:bg-amber-300/95 dark:text-slate-950"
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

export function MedicationQuickSummaryPanel({
  medication,
}: {
  medication: MedicationRecord;
}) {
  const quickIndications: MedicationQuickIndication[] = useMemo(() => {
    if (medication.quickIndications && medication.quickIndications.length > 0) {
      return medication.quickIndications;
    }
    if (medication.doses && medication.doses.length > 0) {
      return medication.doses.map((d) => ({
        condition: d.indication,
        species: d.species,
        doseSummary: `${d.doseMin}${d.doseMax && d.doseMax !== d.doseMin ? ` a ${d.doseMax}` : ''} ${d.doseUnit}/${d.perWeightUnit} ${d.frequency}`,
        route: d.route,
        duration: d.duration || 'Conforme indicação e resposta clínica',
        clinicalContext: d.clinicalContext || d.notes,
      }));
    }
    return medication.indications.map((ind) => ({
      condition: ind,
      species: 'both' as const,
      doseSummary: 'Consultar monografia e doses completas',
      route: medication.routes?.join(' / ') || 'Consultar posologia',
      duration: 'Conforme indicação e regime posológico',
    }));
  }, [medication.quickIndications, medication.doses, medication.indications, medication.routes]);

  const pillars = useMemo(() => {
    if (medication.pillars && medication.pillars.length > 0) {
      return medication.pillars.map((p) => ({
        title: p.title,
        icon:
          p.icon === 'Brain'
            ? Stethoscope
            : p.icon === 'Zap'
            ? HeartPulse
            : p.icon === 'Thermometer'
            ? Thermometer
            : p.icon === 'Clock'
            ? Clock
            : p.icon === 'Syringe'
            ? Syringe
            : ShieldCheck,
        desc: p.desc,
      }));
    }

    return [
      { title: 'Como atua', icon: Stethoscope, desc: medication.mechanismOfAction },
      ...medication.cautions.slice(0, 2).map((desc) => ({ title: 'Cuidados clínicos', icon: ShieldCheck, desc })),
    ];
  }, [medication]);

  const highlights = medication.quickSummaryHighlights ?? [];
  const preview = PROGRESSIVE_SUMMARY_PREVIEWS[medication.slug];
  const clinicalPreview = CONCISE_MEDICATION_SUMMARIES[medication.slug];

  return (
    <section
      id="resumo-rapido"
      className="scroll-mt-24 overflow-hidden rounded-[20px] border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/80 text-white shadow-xl md:rounded-3xl"
    >
      <div className="space-y-5 p-4 md:space-y-8 md:p-8 lg:p-10">
        {/* Cabeçalho do Resumo Rápido - Limpo, sem estrelas nem tags repetitivas */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30">
              <FileText className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-black tracking-tight text-white md:text-2xl">
              Resumo Clínico Executivo
            </h2>
          </div>
        </div>

        {/* Lead / Em Palavras Simples mas Aprofundado */}
        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md md:rounded-2xl md:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-2 mb-3">
            <Info className="h-4 w-4" />
            Em palavras simples
          </p>
          <div className="text-sm font-medium leading-6 text-white/95">
            <SummaryPreview preview={preview?.simple}>
            <HighlightedText
              text={
                medication.plainLanguageSummary ||
                `${medication.title}: ${medication.mechanismOfAction}`
              }
              highlights={highlights}
            />
            </SummaryPreview>
          </div>
        </div>

        {/* 4 Pilares de Ação Farmacológica */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3.5">
            Pilares Terapêuticos Essenciais
          </h3>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs transition hover:border-white/20 hover:bg-white/10 md:rounded-2xl md:p-4"
                >
                  <div className="flex items-center gap-2.5 text-amber-300 mb-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wide">{pillar.title}</span>
                  </div>
                  <div className="text-xs leading-relaxed text-slate-300"><SummaryPreview preview={preview?.pillars[pillar.title]}><p>{pillar.desc}</p></SummaryPreview></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEÇÃO: Indicações de Uso Resumidas */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Indicações de Uso Resumidas
          </h3>

          <SummaryPreview preview={preview?.indications ?? clinicalPreview?.points[0]}>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickIndications.map((item, idx) => {
              const isDog = item.species === 'dog' || item.species === 'both';
              const isCat = item.species === 'cat' || item.species === 'both';

              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-xl border border-white/15 bg-black/25 p-4 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-black/35 md:rounded-2xl md:p-5"
                >
                  <div className="space-y-3">
                    {/* Top row: Title + Species badges */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {item.condition}
                      </h4>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isDog && (
                          <span className="inline-flex items-center rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-500/30">
                            Cães
                          </span>
                        )}
                        {isCat && (
                          <span className="inline-flex items-center rounded-md bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30">
                            Gatos
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contexto clínico completo sem corte */}
                    {item.clinicalContext && (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.clinicalContext}
                      </p>
                    )}
                  </div>

                  {/* Detalhes de dose, via e duração em bloco destacado */}
                  <div className="mt-4 pt-3.5 border-t border-white/10 space-y-2.5 rounded-xl bg-white/5 p-3.5">
                    <div className="flex items-start gap-2.5">
                      <Syringe className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Dose de Ataque / Manutenção
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-amber-200">
                          {item.doseSummary}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1 text-xs border-t border-white/10">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          Via
                        </span>
                        <span className="text-slate-200 font-medium">
                          {item.route}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          Duração
                        </span>
                        <span className="text-emerald-300 font-medium">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </SummaryPreview>
        </div>

        {/* Banner de Segurança: Aviso Clínico Importante - dinâmico por medicamento */}
        {medication.clinicalWarningItems && medication.clinicalWarningItems.length > 0 && (
          <div className="space-y-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100 md:rounded-2xl md:p-5">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
              <span className="font-bold uppercase tracking-wide text-xs sm:text-sm">
                Aviso Clínico Importante
              </span>
            </div>

            <SummaryPreview preview={preview?.attention ?? (clinicalPreview ? clinicalPreview.points.slice(1).join(" ") : undefined)}>
            <div className="space-y-2.5 text-xs sm:text-sm pl-1">
              {medication.clinicalWarningItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[11px] font-bold text-amber-300">
                    {idx + 1}
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong className="text-white font-semibold">{item.label}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>
            </SummaryPreview>
          </div>
        )}
      </div>
    </section>
  );
}
