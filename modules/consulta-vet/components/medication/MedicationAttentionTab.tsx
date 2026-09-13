import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  HeartCrack,
  Activity,
  FlaskConical,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import type { MedicationRecord } from '../../types/medication';

const FREQUENCY_ORDER: Record<string, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  very_rare: 4,
  overdose: 5,
};

const FREQUENCY_META: Record<string, { label: string; badgeClass: string }> = {
  common: {
    label: 'Comum',
    badgeClass: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30',
  },
  uncommon: {
    label: 'Incomum',
    badgeClass: 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30',
  },
  rare: {
    label: 'Raro',
    badgeClass: 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30',
  },
  very_rare: {
    label: 'Extremamente Raro',
    badgeClass: 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30',
  },
  overdose: {
    label: 'Superdosagem',
    badgeClass: 'bg-red-600/15 text-red-800 dark:text-red-300 border border-red-600/30',
  },
};

const HIGHLIGHT_PHRASES = [
  'cada 12 a 24 horas em cães',
  'cada 24 horas em gatos',
  'assegurando hidratação contínua',
  'Reduzir a dose habitual em 30% a 50%',
  'q12h em cães, q24h em gatos',
  'Evitar doses repetidas superiores a 48h',
  '20 mg/kg em cães e 10 mg/kg em gatos',
  'intervalo estendido de 12 horas',
  '10–12,5 mg/kg a cada 12 horas',
  '25 mg/kg a cada 24 horas',
  'não ultrapassando 48 a 72 horas consecutivas',
  '15–20 mg/kg em cães e 10 mg/kg em gatos',
  'intervalo de 12 horas',
  'apenas se estritamente necessário',
];

const ESCAPED_HIGHLIGHTS = HIGHLIGHT_PHRASES.map((h) =>
  h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
);
const HIGHLIGHT_REGEX = new RegExp(`(${ESCAPED_HIGHLIGHTS.join('|')})`, 'gi');

function renderHighlightedDose(text: string) {
  const parts = text.split(HIGHLIGHT_REGEX);

  return (
    <span>
      {parts.map((part, i) => {
        const isMatch = HIGHLIGHT_PHRASES.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        );
        if (isMatch) {
          return (
            <mark
              key={i}
              className="mx-0.5 inline-block rounded bg-purple-200/90 px-1.5 py-0.5 text-xs sm:text-sm font-bold text-purple-950 shadow-xs dark:bg-purple-900/60 dark:text-purple-100"
            >
              {part}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export function MedicationAttentionTab({
  medication,
}: {
  medication: MedicationRecord;
}) {
  const attention = medication.attentionData;

  // Ordenar efeitos adversos rigorosamente: Comum -> Incomum -> Raro -> Extremamente Raro
  const sortedAdverseEffects = React.useMemo(() => {
    if (!attention?.adverseEffectsDetailed) return [];
    return [...attention.adverseEffectsDetailed].sort((a, b) => {
      const orderA = FREQUENCY_ORDER[a.frequency] ?? 99;
      const orderB = FREQUENCY_ORDER[b.frequency] ?? 99;
      return orderA - orderB;
    });
  }, [attention?.adverseEffectsDetailed]);

  // Ordenar contraindicações: Absolutas (vermelhas) primeiro, depois Precauções Críticas, depois Alertas Gerais
  const sortedPrecautions = React.useMemo(() => {
    if (!attention?.precautions) return [];
    const rank: Record<string, number> = {
      contraindicated: 1,
      warning: 2,
      caution: 3,
    };
    return [...attention.precautions].sort((a, b) => {
      return (rank[a.alertLevel] ?? 99) - (rank[b.alertLevel] ?? 99);
    });
  }, [attention?.precautions]);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Placa de Alerta Principal / Warning Board */}
      <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-950/20 to-background p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-md ring-4 ring-amber-500/20">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-500/20 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Quadro de Segurança & Atenção Clínica
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Efeitos Adversos, Contraindicações & Comorbidades
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              A dipirona possui excelente perfil terapêutico e gastrointestinal em carnívoros, mas seu uso
              requer vigilância rigorosa quanto à velocidade de infusão intravenosa, volemia prévia e limites
              posológicos e temporais em felinos e hepatopatas.
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÃO 1: Efeitos Adversos com Frequência, Conduta Imediata e Mecanismo Fisiopatológico no Clique */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <HeartCrack className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Efeitos Adversos & Conduta Clínica Imediata
            </h3>
            <p className="text-xs text-muted-foreground">
              Estratificação por frequência clínica, conduta prática recomendada e mecanismo patológico detalhado sob demanda
            </p>
          </div>
        </div>

        {sortedAdverseEffects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 items-start">
            {sortedAdverseEffects.map((adv, idx) => {
              const meta = FREQUENCY_META[adv.frequency] || {
                label: adv.frequency,
                badgeClass: 'bg-muted text-muted-foreground',
              };

              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border/80 bg-muted/20 p-5 sm:p-6 space-y-3.5 transition hover:border-amber-500/30 hover:bg-muted/30 shadow-xs h-fit"
                >
                  <div className="space-y-3.5">
                    {/* Badge de frequência sem numeração */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${meta.badgeClass}`}>
                        {meta.label}
                      </span>
                    </div>

                    {/* Título do Efeito Adverso */}
                    <h4 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                      {adv.effect}
                    </h4>

                    {/* Conduta Clínica Imediata Visível em Destaque */}
                    <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-3.5 dark:bg-emerald-500/15">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                        Conduta Clínica Imediata
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                        {adv.clinicalManagement}
                      </p>
                    </div>

                    {/* Mecanismo Fisiopatológico embaixo da Conduta Clínica - No clique do usuário */}
                    {adv.mechanism && (
                      <details className="group/mech rounded-2xl border border-border/70 bg-background/70 transition hover:bg-muted/30">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-3 text-xs font-semibold text-muted-foreground transition hover:text-foreground focus-visible:outline-none">
                          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                            <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                            Ver Mecanismo Fisiopatológico
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open/mech:rotate-180 text-muted-foreground" />
                        </summary>
                        <div className="border-t border-border/60 p-3.5 bg-muted/20 text-xs sm:text-sm leading-relaxed text-foreground/90">
                          <p>{adv.mechanism}</p>
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </section>

      {/* SEÇÃO 2: Contraindicações em Formato de Tabela (Estilo Doenças / Sinais Clínicos) */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6 border-l-4 border-l-rose-500 dark:border-l-rose-400">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-700 dark:text-rose-400">
            <ShieldAlert className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Contraindicações & Cuidados com Fisiopatologia
            </h3>
            <p className="text-xs text-muted-foreground">
              Classificação por criticidade clínica, conduta imediata e mecanismo fisiopatológico detalhado
            </p>
          </div>
        </div>

        {sortedPrecautions.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-border/65 bg-background/50 divide-y divide-border/55">
            {sortedPrecautions.map((prec, idx) => {
              const isContra = prec.alertLevel === 'contraindicated';
              const isWarning = prec.alertLevel === 'warning';

              return (
                <details
                  key={idx}
                  className="group px-4 py-3.5 transition-colors hover:bg-muted/15"
                >
                  <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block text-[11px] font-bold uppercase tracking-wider ${
                          isContra
                            ? 'text-rose-600 dark:text-rose-400'
                            : isWarning
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-sky-600 dark:text-sky-400'
                        }`}
                      >
                        {isContra
                          ? 'Contraindicação Absoluta'
                          : isWarning
                          ? 'Precaução Crítica'
                          : 'Alerta Clínico'}
                      </span>

                      <span className="mt-1 block text-[14px] font-semibold leading-6 text-foreground">
                        {prec.condition}
                      </span>

                      <span className="mt-1 block text-[12px] sm:text-[13px] leading-5 text-muted-foreground">
                        <strong className="font-semibold text-foreground/85">Conduta Clínica: </strong>
                        {prec.clinicalAction}
                      </span>
                    </div>

                    <span className="mt-1 flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-muted-foreground transition group-hover:text-foreground">
                      <span className="hidden sm:inline">Mecanismo</span>
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                        aria-hidden
                      />
                    </span>
                  </summary>

                  <div className="mt-3 border-t border-border/50 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Entender o mecanismo
                    </p>
                    <p className="mt-1 text-[13px] sm:text-[14px] leading-6 text-foreground/85">
                      {prec.physiologicalExplanation}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {medication.contraindications.map((c, i) => (
              <p key={i} className="text-xs text-rose-600 font-semibold">• {c}</p>
            ))}
          </div>
        )}
      </section>

      {/* SEÇÃO 3: Ajuste de Dose nas Principais Comorbidades (Tabela Estilo Foto 2 com Tema Roxo/Lilás e Grifa Texto) */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6 border-l-4 border-l-purple-500 dark:border-l-purple-400">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-700 dark:text-purple-300">
            <Activity className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Ajuste de Dose nas Principais Comorbidades
            </h3>
            <p className="text-xs text-muted-foreground">
              Diretrizes posológicas por comorbidade e função orgânica, com mecanismo farmacocinético expansível
            </p>
          </div>
        </div>

        {attention?.doseReductionGuidelines && attention.doseReductionGuidelines.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-purple-500/25 bg-background/50 divide-y divide-border/55">
            {attention.doseReductionGuidelines.map((guideline, idx) => (
              <details
                key={idx}
                className="group px-4 py-3.5 transition-colors hover:bg-purple-500/5"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                      {guideline.clinicalCondition}
                    </span>

                    <div className="mt-1 text-[13px] sm:text-[14px] leading-relaxed text-foreground">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mr-1.5">
                        Ajuste Recomendado:
                      </span>
                      {renderHighlightedDose(guideline.recommendedAdjustment)}
                    </div>
                  </div>

                  <span className="mt-1 flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-muted-foreground transition group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    <span className="hidden sm:inline">Mecanismo</span>
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 text-muted-foreground"
                      aria-hidden
                    />
                  </span>
                </summary>

                <div className="mt-3 border-t border-purple-500/20 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    Entender o mecanismo
                  </p>
                  <p className="mt-1 text-[13px] sm:text-[14px] leading-6 text-foreground/85">
                    {guideline.physiologicalRationale}
                  </p>
                </div>
              </details>
            ))}
          </div>
        ) : null}
      </section>

      {/* SEÇÃO 4: Interações Medicamentosas (Tabela estilo Doenças com mecanismo expansível) */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6 border-l-4 border-l-amber-500 dark:border-l-amber-400">
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400">
            <FlaskConical className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Interações Medicamentosas
            </h3>
            <p className="text-xs text-muted-foreground">
              Sinergismos de risco, efeito clínico manifesto e mecanismos moleculares detalhados sob demanda
            </p>
          </div>
        </div>

        {attention?.drugInteractionsDetailed && attention.drugInteractionsDetailed.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-border/65 bg-background/50 divide-y divide-border/55">
            {attention.drugInteractionsDetailed.map((inter, idx) => {
              const isContra = inter.severity === 'contraindicated';
              const isMajor = inter.severity === 'major';

              return (
                <details
                  key={idx}
                  className="group px-4 py-3.5 transition-colors hover:bg-muted/15"
                >
                  <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block text-[11px] font-bold uppercase tracking-wider ${
                          isContra
                            ? 'text-rose-600 dark:text-rose-400'
                            : isMajor
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {isContra ? 'Contraindicado' : isMajor ? 'Risco Alto' : 'Moderado'}
                      </span>

                      <span className="mt-1 block text-[14px] font-semibold leading-6 text-foreground">
                        {inter.drugOrClass}
                      </span>

                      <span className="mt-1 block text-[12px] sm:text-[13px] leading-5 text-rose-600 dark:text-rose-400">
                        <strong className="font-semibold text-foreground/85">Efeito Clínico: </strong>
                        {inter.clinicalEffect}
                      </span>
                    </div>

                    <span className="mt-1 flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-muted-foreground transition group-hover:text-foreground">
                      <span className="hidden sm:inline">Mecanismo</span>
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                        aria-hidden
                      />
                    </span>
                  </summary>

                  <div className="mt-3 border-t border-border/50 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Entender o mecanismo
                    </p>
                    <p className="mt-1 text-[13px] sm:text-[14px] leading-6 text-foreground/85">
                      {inter.pharmacologicalMechanism}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
