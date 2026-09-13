import React, { useMemo } from 'react';
import { Activity, Clock, ShieldCheck, Brain } from 'lucide-react';
import type { MedicationPharmacokinetics } from '../../types/medication';

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

function PKHighlightedText({ text, highlights }: { text: string; highlights: string[] }) {
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
          <span key={i}>{n.value}</span>
        )
      )}
    </>
  );
}

const PK_HIGHLIGHTS_ABSORPTION = [
  'pró-fármaco',
  '4-metilaminoantipirina (4-MAA)',
  '85%',
  '1,5 e 2 horas',
  '35 a 40 minutos',
  '5 a 6 horas após a dosagem oral',
];

const PK_HIGHLIGHTS_DISTRIBUTION = [
  '5,0 a 7,5 L/kg em cães',
  '1,0 a 1,4 L/kg em gatos',
  '50% a 58%',
  '>99% à albumina',
  'barreira hematoencefálica',
  'livre penetração',
];

const PK_HIGHLIGHTS_METABOLISM = [
  'citocromo P450',
  '4-aminoantipirina (4-AA)',
  'glicuronidação limitada',
  'desmetilação e acetilação enzimática',
  'não restringe a eliminação da dipirona',
];

const PK_HIGHLIGHTS_ELIMINATION = [
  '4,5 a 6 horas em cães saudáveis',
  'clearance) de 552 a 921 mL/kg/h',
  '6,0 a 7,5 horas',
  '92 a 131 mL/kg/h',
  'intervalos de 12 a 24 horas',
  '90% da dose eliminada na urina',
];

export function MedicationPharmacokineticsSection({
  data,
}: {
  data?: MedicationPharmacokinetics;
}) {
  if (!data) return null;

  return (
    <section id="farmacocinetica" className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-3 border-b border-border/70 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Activity className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Farmacocinética Aplicada & Metabolismo Comparado
          </h3>
          <p className="text-xs text-muted-foreground">
            Comportamento de pró-fármaco, biotransformação microssomal e clearance renal
          </p>
        </div>
      </div>

      {/* Métricas Clínicas de Referência */}
      <div className="grid gap-3.5 sm:grid-cols-3">
        {data.halfLife && (
          <div className="flex items-center gap-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4">
            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 block">
                Meia-vida Plasmática (t1/2)
              </span>
              <span className="text-sm font-black text-purple-950 dark:text-purple-100">
                {data.halfLife}
              </span>
            </div>
          </div>
        )}

        {data.plasmaBinding && (
          <div className="flex items-center gap-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 p-4">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block">
                Ligação a Proteínas Plasmáticas
              </span>
              <span className="text-sm font-black text-blue-950 dark:text-blue-100">
                {data.plasmaBinding}
              </span>
            </div>
          </div>
        )}

        {data.cnsPenetration && (
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
            <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                Penetração Liquórica / SNC
              </span>
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-100 line-clamp-1">
                Alta difusão na barreira hematoencefálica
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 4 Etapas ADME — Sem emojis, com numeração elegante e texto grifado */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* 1. Absorção */}
        <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-3 transition hover:bg-muted/30">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-500/15 text-xs font-black text-amber-700 dark:text-amber-300">
              1
            </span>
            <h4 className="text-sm font-bold text-foreground tracking-wide">
              Absorção & Biodisponibilidade
            </h4>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
            <PKHighlightedText text={data.absorption} highlights={PK_HIGHLIGHTS_ABSORPTION} />
          </p>
        </div>

        {/* 2. Distribuição */}
        <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-3 transition hover:bg-muted/30">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/15 text-xs font-black text-blue-700 dark:text-blue-300">
              2
            </span>
            <h4 className="text-sm font-bold text-foreground tracking-wide">
              Distribuição Tecidual & Barreiras
            </h4>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
            <PKHighlightedText text={data.distribution} highlights={PK_HIGHLIGHTS_DISTRIBUTION} />
          </p>
        </div>

        {/* 3. Biotransformação */}
        <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-3 transition hover:bg-muted/30">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple-500/15 text-xs font-black text-purple-700 dark:text-purple-300">
              3
            </span>
            <h4 className="text-sm font-bold text-foreground tracking-wide">
              Biotransformação & Metabolismo Hepático
            </h4>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
            <PKHighlightedText text={data.metabolism} highlights={PK_HIGHLIGHTS_METABOLISM} />
          </p>
        </div>

        {/* 4. Eliminação */}
        <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-3 transition hover:bg-muted/30">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-black text-emerald-700 dark:text-emerald-300">
              4
            </span>
            <h4 className="text-sm font-bold text-foreground tracking-wide">
              Eliminação & Clearance Sistêmico
            </h4>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
            <PKHighlightedText text={data.elimination} highlights={PK_HIGHLIGHTS_ELIMINATION} />
          </p>
        </div>
      </div>
    </section>
  );
}
