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

const DEFAULT_HIGHLIGHTS = [
  'pró-fármaco',
  '4-metilaminoantipirina',
  '4-MAA',
  'COX-3',
  'endocanabinoide',
  'CB1',
  'antiespasmódica',
  'antipirético',
  'infusão lenta',
  'gatos',
  '10 a 12,5 mg/kg',
  '25 mg/kg',
  '2 a 5 minutos',
];

export function MedicationQuickSummaryPanel({
  medication,
}: {
  medication: MedicationRecord;
}) {
  const quickIndications: MedicationQuickIndication[] = useMemo(() => {
    if (medication.quickIndications && medication.quickIndications.length > 0) {
      return medication.quickIndications;
    }
    return medication.indications.map((ind) => ({
      condition: ind,
      species: 'both' as const,
      doseSummary: 'Conforme tabela de posologia clínica',
      route: medication.routes[0] || 'Oral / IV',
      duration: 'Uso agudo monitorado',
    }));
  }, [medication.quickIndications, medication.indications, medication.routes]);

  const pillars = [
    {
      title: 'Analgesia Multimodal',
      icon: HeartPulse,
      desc: 'Inibição seletiva de COX central (COX-3/COX-1b) e ativação de receptores canabinoides CB1 medulares. Excelente poupador de opioides.',
    },
    {
      title: 'Ação Antiespasmódica',
      icon: Stethoscope,
      desc: 'Bloqueio do influxo de cálcio sensível a voltagem na musculatura lisa gastrintestinal e urogenital, sem paralisar o peristaltismo espontâneo.',
    },
    {
      title: 'Antipirese Central Rápida',
      icon: Thermometer,
      desc: 'Bloqueio de PGE2 no órgão vascular da lâmina terminal (OVLT) hipotalâmico, reajustando rapidamente a temperatura corporal para a normotermia.',
    },
    {
      title: 'Alta Segurança Digestiva',
      icon: ShieldCheck,
      desc: 'Mínima inibição da COX-1 constitutiva da mucosa gástrica e da perfusão renal basal quando comparada aos AINEs carboxílicos tradicionais.',
    },
  ];

  return (
    <section
      id="resumo-rapido"
      className="overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/80 text-white shadow-xl"
    >
      <div className="p-6 sm:p-8 lg:p-10 space-y-8">
        {/* Cabeçalho do Resumo Rápido - Limpo, sem estrelas nem tags repetitivas */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30">
              <FileText className="h-5 w-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Resumo Clínico Executivo
            </h2>
          </div>
        </div>

        {/* Lead / Em Palavras Simples mas Aprofundado */}
        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-2 mb-3">
            <Info className="h-4 w-4" />
            Visão Geral em Linguagem Direta & Fisiologia
          </p>
          <p className="text-base sm:text-lg font-medium leading-relaxed text-white/95">
            <HighlightedText
              text={
                medication.plainLanguageSummary ||
                `${medication.title} é um potente analgésico e antipirético atípico que atua como pró-fármaco, gerando metabólitos ativos que controlam a dor visceral e a pirexia.`
              }
              highlights={DEFAULT_HIGHLIGHTS}
            />
          </p>
        </div>

        {/* 4 Pilares de Ação Farmacológica (com ícones clínicos: HeartPulse, Stethoscope, Thermometer, ShieldCheck) */}
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
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs transition hover:bg-white/10 hover:border-white/20"
                >
                  <div className="flex items-center gap-2.5 text-amber-300 mb-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wide">{pillar.title}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">{pillar.desc}</p>
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

          <div className="grid gap-4 sm:grid-cols-2">
            {quickIndications.map((item, idx) => {
              const isDog = item.species === 'dog' || item.species === 'both';
              const isCat = item.species === 'cat' || item.species === 'both';

              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-black/35"
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
        </div>

        {/* Banner de Segurança: Aviso Clínico Importante - formatado em linhas separadas */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-100 space-y-3">
          <div className="flex items-center gap-2 text-amber-300">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
            <span className="font-bold uppercase tracking-wide text-xs sm:text-sm">
              Aviso Clínico Importante
            </span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm pl-1">
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[11px] font-bold text-amber-300">
                1
              </span>
              <p className="text-slate-200 leading-relaxed">
                <strong className="text-white font-semibold">Via Intravenosa:</strong> Administrar SEMPRE por infusão lenta (2 a 5 minutos) diluída em SF 0,9% para prevenir vasodilatação abrupta e hipotensão transitória.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[11px] font-bold text-amber-300">
                2
              </span>
              <p className="text-slate-200 leading-relaxed">
                <strong className="text-white font-semibold">Felinos:</strong> Utilizar doses de 10 a 12,5 mg/kg com intervalos q12h a q24h (máx. 3 dias). Evitar gotejamento oral direto sem veículo palatável ou cápsula para evitar ptialismo espumoso severo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
