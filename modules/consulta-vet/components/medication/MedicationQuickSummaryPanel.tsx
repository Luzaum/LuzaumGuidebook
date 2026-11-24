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
import { getPrimaryMedicationTherapeuticClass } from '../../utils/medicationTherapeuticClasses';
import type { MedicationRecord } from '../../types/medication';
import { ClinicalAbbreviationText } from '../../utils/clinicalAbbreviationInline';
import { StructuredSummaryText } from '../shared/StructuredSummaryText';
import {
  calculateQuickIndicationDose,
  formatPatientDoseNumber,
  type QuickIndicationWithSource,
} from '../../utils/quickIndicationDoseCalculator';

const SUMMARY_BORDER_COLORS = {
  blue: 'border-blue-500/60 dark:border-blue-400/55',
  red: 'border-red-500/60 dark:border-red-400/55',
  purple: 'border-purple-500/60 dark:border-purple-400/55',
  orange: 'border-orange-500/60 dark:border-orange-400/55',
  green: 'border-emerald-500/60 dark:border-emerald-400/55',
  teal: 'border-teal-500/60 dark:border-teal-400/55',
  indigo: 'border-indigo-500/60 dark:border-indigo-400/55',
  pink: 'border-pink-500/60 dark:border-pink-400/55',
  cyan: 'border-cyan-500/60 dark:border-cyan-400/55',
  lime: 'border-lime-500/60 dark:border-lime-400/55',
  amber: 'border-amber-500/60 dark:border-amber-400/55',
  slate: 'border-slate-500/60 dark:border-slate-400/55',
};
const CLASS_BORDER_GROUP: Record<string, keyof typeof SUMMARY_BORDER_COLORS> = {
  'aines': 'red', 'glicocorticoides': 'red', 'analgesicos-anestesicos': 'blue',
  'antineoplasicos-imunossupressores': 'purple', 'endocrinologicos-hormonais': 'orange',
  'metabolicos-hipolipemiantes': 'orange', 'antiemeticos': 'green', 'hepatobiliares': 'green',
  'antibacterianos': 'teal', 'anti-helminticos-antiparasitarios': 'lime',
  'neurologicos-anticonvulsivantes': 'indigo', 'cardiovasculares': 'pink', 'antiarritmicos': 'pink',
  'diureticos-hiperosmolares': 'cyan', 'quelantes-antiacidos': 'cyan',
  'oftalmologicos-autonomicos': 'cyan', 'antifibrinoliticos': 'pink', 'antidotos-toxicologia': 'amber',
};
const CATEGORY_BORDER_GROUP: Record<string, keyof typeof SUMMARY_BORDER_COLORS> = {
  'anestesia-dor': 'blue', 'gastroenterologia': 'green', 'endocrinologia': 'orange',
  'oncologia': 'purple', 'cardiologia': 'pink', 'nefrologia': 'cyan', 'neurologia': 'indigo',
  'infectologia': 'teal', 'dermatologia': 'amber', 'respiratorio': 'cyan',
};

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

export function HighlightedText({ text, highlights, subtle = false }: { text: string; highlights?: string[]; subtle?: boolean }) {
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
            className={subtle ? 'bg-transparent font-semibold text-foreground underline decoration-primary/40 decoration-2 underline-offset-4' : 'rounded bg-amber-200/90 px-1 font-semibold text-slate-900 shadow-xs dark:bg-amber-300/95 dark:text-slate-950'}
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
  const therapeuticClass = getPrimaryMedicationTherapeuticClass(medication);
  const borderGroup = (therapeuticClass && CLASS_BORDER_GROUP[therapeuticClass.slug])
    || CATEGORY_BORDER_GROUP[medication.category] || 'slate';
  const cardBorder = SUMMARY_BORDER_COLORS[borderGroup];
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

  const plainLanguageBlock = (
    <div className={`rounded-2xl border-2 ${cardBorder} bg-transparent p-4 sm:p-6`}>
      <p className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2 mb-3">
        <Info className="h-4 w-4" />
        Em palavras simples
      </p>
      <StructuredSummaryText
        text={plainSummaryText}
        renderInline={(chunk) => <HighlightedText text={chunk} highlights={highlights} subtle />}
        className="space-y-4 max-w-4xl text-sm leading-7 text-foreground/90 sm:text-base sm:leading-8"
      />
    </div>
  );

  const pillarsBlock = (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3.5">
        Pilares Terapêuticos Essenciais
      </h3>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className={`rounded-2xl border-2 ${cardBorder} bg-transparent p-4`}
            >
              <div className="flex items-center gap-2.5 text-foreground mb-2">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wide">{pillar.title}</span>
              </div>
              <div className="text-xs leading-relaxed text-muted-foreground">
                <StructuredSummaryText
                  text={pillar.desc}
                  renderInline={(chunk) => <HighlightedText text={chunk} highlights={highlights} subtle />}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const quickIndicationsBlock = (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-foreground">
        Indicações de Uso
      </h3>

      {/* Caixa de número para o peso do paciente em kg */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-2 shadow-xs transition focus-within:border-ring focus-within:bg-background">
          <label
            htmlFor={weightInputId}
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground cursor-pointer"
          >
            <Scale className="h-3.5 w-3.5 text-foreground shrink-0" />
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
              className="w-24 rounded-lg border border-input bg-muted/40 px-2.5 py-1 text-sm font-bold text-foreground placeholder:font-normal placeholder:text-muted-foreground outline-none transition focus:border-ring focus:bg-background"
            />
            <span className="text-xs font-bold text-foreground">kg</span>
          </div>
          {trimmedWeight !== '' && (
            <button
              type="button"
              onClick={() => setPatientWeightInput('')}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
              title="Limpar peso"
              aria-label="Limpar peso"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {weightValidationError && (
          <p className="text-[11px] font-medium text-foreground" role="alert">
            {weightValidationError}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
              className={`flex min-w-0 flex-col justify-between rounded-2xl border-2 ${cardBorder} bg-transparent p-4 sm:p-5 ${
                isCenteredOddLast ? 'sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.75rem)]' : ''
              }`.trim()}
            >
              <div className="space-y-3">
                {/* Top row: Title + Species badges */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {item.condition}
                  </h4>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isDog && (
                      <span className="inline-flex items-center rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 border border-blue-500/30">
                        Cães
                      </span>
                    )}
                    {isCat && (
                      <span className="inline-flex items-center rounded-md bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300 border border-purple-500/30">
                        Gatos
                      </span>
                    )}
                  </div>
                </div>

                {/* Contexto clínico completo sem corte */}
                {item.clinicalContext && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.clinicalContext}
                  </p>
                )}
              </div>

              {/* Detalhes de dose, via e duração + cálculo para o paciente ancorados no final do card */}
              <div className="mt-4 space-y-3">
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Syringe className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Dose de Ataque / Manutenção
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {item.doseSummary}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 text-xs border-t border-border">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                        Via
                      </span>
                      <span className="text-foreground font-medium">
                        {item.route}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                        Duração
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">
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
                        ? 'rounded-xl border border-rose-400/35 bg-transparent p-3'
                        : calculatedDose.status === 'unavailable'
                        ? 'rounded-xl border border-border bg-transparent p-3'
                        : 'rounded-xl border border-emerald-400/30 bg-transparent p-3'
                    }
                  >
                    <div
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                        calculatedDose.status === 'contraindicated'
                          ? 'text-rose-700 dark:text-rose-300'
                          : calculatedDose.status === 'unavailable'
                          ? 'text-muted-foreground'
                          : 'text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      <Calculator className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        Dose para este paciente ({formatPatientDoseNumber(parsedWeight)} kg)
                      </span>
                    </div>

                    {calculatedDose.status === 'unavailable' ? (
                      <p className="text-xs text-muted-foreground">
                        Sem cálculo automático por peso para esta indicação (consultar posologia acima).
                      </p>
                    ) : (
                      <div className="space-y-1">
                        {calculatedDose.items.map((doseItem, dIdx) => (
                          <div key={dIdx} className="text-xs sm:text-sm leading-snug">
                            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                              {doseItem.label && (
                                <span className="text-xs font-semibold text-foreground">
                                  {doseItem.label}:
                                </span>
                              )}
                              <span
                                className={`font-extrabold ${
                                  calculatedDose.status === 'contraindicated'
                                    ? 'text-rose-800 dark:text-rose-200'
                                    : 'text-emerald-800 dark:text-emerald-200'
                                }`}
                              >
                                {doseItem.doseText}
                              </span>
                            </div>
                            {doseItem.note && (
                              <p
                                className={`mt-0.5 text-[11px] ${
                                  doseItem.isWarning ? 'font-medium text-foreground' : 'text-muted-foreground'
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
      <div className="space-y-4 rounded-2xl border border-amber-500/50 bg-transparent p-4 text-foreground sm:p-5">
        <div className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 shrink-0 text-foreground" />
          <span className="font-bold uppercase tracking-wide text-xs sm:text-sm">
            Aviso Clínico Importante
          </span>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm pl-1">
          {warningItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[11px] font-bold text-foreground">
                {idx + 1}
              </span>
              <p className="text-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">{item.label}</strong> {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <section
      id="resumo-rapido"
      className="scroll-mt-24 text-foreground"
    >
      <div className="space-y-8 px-1 py-5 sm:px-2 md:space-y-10 md:py-8">
        {/* Cabeçalho do Resumo Rápido */}
        <div className="border-b border-border pb-4">
          <h2 className="text-lg font-black tracking-tight text-foreground md:text-2xl">
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
