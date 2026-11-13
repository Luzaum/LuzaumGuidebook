import React, { useId, useMemo, useState } from 'react';
import {
  Clock,
  AlertTriangle,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Thermometer,
  Syringe,
  Info,
  Scale,
  Calculator,
  X,
} from 'lucide-react';
import type { MedicationRecord } from '../../types/medication';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';
import {
  calculateQuickIndicationDose,
  formatPatientDoseNumber,
  type QuickIndicationWithSource,
} from '../../utils/quickIndicationDoseCalculator';

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
  patientWeightInput: controlledWeightInput,
  onPatientWeightInputChange,
}: {
  medication: MedicationRecord;
  patientWeightInput?: string;
  onPatientWeightInputChange?: (value: string) => void;
}) {
  const weightInputId = useId();
  const [internalWeightInput, setInternalWeightInput] = useState('');
  const patientWeightInput = controlledWeightInput ?? internalWeightInput;
  const setPatientWeightInput = onPatientWeightInputChange ?? setInternalWeightInput;

  const trimmedWeight = patientWeightInput.trim();
  const parsedWeight = trimmedWeight === '' ? NaN : Number(trimmedWeight.replace(',', '.'));
  const isValidWeight = Number.isFinite(parsedWeight) && parsedWeight > 0 && parsedWeight <= 200;
  const weightValidationError =
    trimmedWeight !== '' && !isValidWeight
      ? Number.isFinite(parsedWeight) && parsedWeight > 200
        ? 'Informe um peso de até 200 kg.'
        : 'Informe um peso válido maior que 0 kg.'
      : null;

  const quickIndications: QuickIndicationWithSource[] = useMemo(() => {
    if (medication.quickIndications && medication.quickIndications.length > 0) {
      return medication.quickIndications;
    }
    if (medication.doses && medication.doses.length > 0) {
      return medication.doses.map((d) => {
        const rawUnit = String(d.doseUnit || '').trim();
        const rawPer = String(d.perWeightUnit || '').trim();
        const unitLabel =
          !rawPer || rawUnit.includes('/') || /dose fixa/i.test(rawPer)
            ? rawUnit
            : `${rawUnit}/${rawPer}`;
        return {
          condition: d.indication,
          species: d.species,
          doseSummary: `${d.doseMin}${d.doseMax && d.doseMax !== d.doseMin ? ` a ${d.doseMax}` : ''} ${unitLabel} ${d.frequency}`.trim(),
          route: d.route,
          duration: d.duration || 'Conforme indicação e resposta clínica',
          clinicalContext: d.clinicalContext || d.notes,
          sourceDose: d,
        };
      });
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

  const warningItems = useMemo(() => {
    if (medication.clinicalWarningItems && medication.clinicalWarningItems.length > 0) {
      return medication.clinicalWarningItems;
    }
    if (medication.cautions && medication.cautions.length > 0) {
      return medication.cautions.map((caution) => {
        const colonIdx = caution.indexOf(':');
        if (colonIdx > 0 && colonIdx < 65) {
          return {
            label: `${caution.slice(0, colonIdx).trim()}:`,
            text: caution.slice(colonIdx + 1).trim(),
          };
        }
        return { label: 'Atenção clínica:', text: caution };
      });
    }
    return [];
  }, [medication.clinicalWarningItems, medication.cautions]);

  const highlights = medication.quickSummaryHighlights ?? [];
  const plainSummaryText =
    medication.plainLanguageSummary || `${medication.title}: ${medication.mechanismOfAction}`;
  const plainSummaryParagraphs = useMemo(
    () => plainSummaryText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    [plainSummaryText]
  );

  const plainLanguageBlock = (
    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md md:rounded-2xl md:p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-2 mb-3">
        <Info className="h-4 w-4" />
        Em palavras simples
      </p>
      <div className="space-y-2.5 text-sm font-medium leading-6 text-white/95">
        {plainSummaryParagraphs.map((paragraph, idx) => (
          <p key={idx}>
            <HighlightedText text={paragraph} highlights={highlights} />
          </p>
        ))}
      </div>
    </div>
  );

  const pillarsBlock = (
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
              <div className="text-xs leading-relaxed text-slate-300">
                <p>{pillar.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const quickIndicationsBlock = (
    <div className="space-y-4">
      <h3 className="text-center text-lg sm:text-xl font-bold text-white">
        Indicações de Uso
      </h3>

      {/* Caixa de número para o peso do paciente em kg */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-black/30 px-3.5 py-2 backdrop-blur-sm shadow-xs transition focus-within:border-amber-400/50 focus-within:bg-black/40">
          <label
            htmlFor={weightInputId}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 cursor-pointer"
          >
            <Scale className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Peso do paciente:</span>
          </label>
          <div className="flex items-center gap-1.5">
            <input
              id={weightInputId}
              type="number"
              inputMode="decimal"
              min="0.05"
              max="200"
              step="0.1"
              value={patientWeightInput}
              onChange={(event) => setPatientWeightInput(event.target.value)}
              placeholder="Ex: 10"
              aria-label="Peso do paciente em kg"
              className="w-24 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-sm font-bold text-white placeholder:font-normal placeholder:text-slate-400 outline-none transition focus:border-amber-400 focus:bg-white/15"
            />
            <span className="text-xs font-bold text-amber-300">kg</span>
          </div>
          {trimmedWeight !== '' && (
            <button
              type="button"
              onClick={() => setPatientWeightInput('')}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-white/10 hover:text-white"
              title="Limpar peso"
              aria-label="Limpar peso"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {weightValidationError && (
          <p className="text-[11px] font-medium text-amber-300" role="alert">
            {weightValidationError}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickIndications.map((item, idx) => {
          const isDog = item.species === 'dog' || item.species === 'both';
          const isCat = item.species === 'cat' || item.species === 'both';
          const isCenteredOddLast =
            quickIndications.length > 1 &&
            quickIndications.length % 2 === 1 &&
            idx === quickIndications.length - 1;
          const calculatedDose = isValidWeight
            ? calculateQuickIndicationDose(item, parsedWeight)
            : null;

          return (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-xl border border-white/15 bg-black/25 p-4 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-black/35 md:rounded-2xl md:p-5 ${
                isCenteredOddLast ? 'sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.5rem)]' : ''
              }`.trim()}
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

              {/* Detalhes de dose, via e duração + cálculo para o paciente ancorados no final do card */}
              <div className="mt-4 space-y-3">
                <div className="pt-3.5 border-t border-white/10 space-y-2.5 rounded-xl bg-white/5 p-3.5">
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

                {/* Dose calculada para o paciente no final do card */}
                {calculatedDose && (
                  <div
                    aria-live="polite"
                    className={
                      calculatedDose.status === 'contraindicated'
                        ? 'rounded-xl border border-rose-400/35 bg-rose-500/15 p-3'
                        : calculatedDose.status === 'unavailable'
                        ? 'rounded-xl border border-white/10 bg-white/5 p-3'
                        : 'rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3'
                    }
                  >
                    <div
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                        calculatedDose.status === 'contraindicated'
                          ? 'text-rose-300'
                          : calculatedDose.status === 'unavailable'
                          ? 'text-slate-400'
                          : 'text-emerald-300'
                      }`}
                    >
                      <Calculator className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        Dose para este paciente ({formatPatientDoseNumber(parsedWeight)} kg)
                      </span>
                    </div>

                    {calculatedDose.status === 'unavailable' ? (
                      <p className="text-xs text-slate-300">
                        Sem cálculo automático por peso para esta indicação (consultar posologia acima).
                      </p>
                    ) : (
                      <div className="space-y-1">
                        {calculatedDose.items.map((doseItem, dIdx) => (
                          <div key={dIdx} className="text-xs sm:text-sm leading-snug">
                            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                              {doseItem.label && (
                                <span className="text-xs font-semibold text-slate-200">
                                  {doseItem.label}:
                                </span>
                              )}
                              <span
                                className={`font-extrabold ${
                                  calculatedDose.status === 'contraindicated'
                                    ? 'text-rose-200'
                                    : 'text-emerald-200'
                                }`}
                              >
                                {doseItem.doseText}
                              </span>
                            </div>
                            {doseItem.note && (
                              <p
                                className={`mt-0.5 text-[11px] ${
                                  doseItem.isWarning ? 'font-medium text-amber-300' : 'text-slate-300/90'
                                }`}
                              >
                                {doseItem.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const warningsBlock =
    warningItems.length > 0 ? (
      <div className="space-y-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100 md:rounded-2xl md:p-5">
        <div className="flex items-center gap-2 text-amber-300">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
          <span className="font-bold uppercase tracking-wide text-xs sm:text-sm">
            Aviso Clínico Importante
          </span>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm pl-1">
          {warningItems.map((item, idx) => (
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
      </div>
    ) : null;

  return (
    <section
      id="resumo-rapido"
      className="scroll-mt-24 overflow-hidden rounded-[20px] border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/80 text-white shadow-xl md:rounded-3xl"
    >
      <div className="space-y-5 p-4 md:space-y-8 md:p-8 lg:p-10">
        {/* Cabeçalho do Resumo Rápido */}
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-lg font-black tracking-tight text-white md:text-2xl">
            Resumo Clínico Executivo
          </h2>
        </div>

        {plainLanguageBlock}
        {quickIndicationsBlock}
        {pillarsBlock}
        {warningsBlock}
      </div>
    </section>
  );
}
