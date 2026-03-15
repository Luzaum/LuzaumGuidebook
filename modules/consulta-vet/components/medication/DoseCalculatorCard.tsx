import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Calculator, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { useDoseCalculator } from '../../hooks/useDoseCalculator';
import { MedicationDose, MedicationPresentation } from '../../types/medication';
import {
  buildDoseSummaryLabel,
  formatDoseSpeciesLabel,
  MedicationDoseSpecies,
} from '../../utils/medicationRules';

interface DoseCalculatorCardProps {
  doses: MedicationDose[];
  presentations: MedicationPresentation[];
  className?: string;
}

const UI_TEXT = {
  title: 'Calculadora de dose',
  subtitle: 'Peso, espécie, regime e apresentação em um cálculo só',
  species: 'Espécie',
  weight: 'Peso (kg)',
  doseBase: 'Regime clínico',
  presentation: 'Apresentação',
  mgOnly: 'Apenas em mg',
  referenceDose: 'Regime selecionado',
  safeConversion: 'Conversão pela apresentação',
  results: 'Resultado do cálculo',
  totalDose: 'Dose total',
  explicitSpecies: 'Cada dose precisa ter espécie explícita e representar um único regime clínico.',
  mgFallback: 'Dose calculada em mg',
} as const;

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{children}</label>;
}

function ResultMetric({
  label,
  value,
  tone = 'default',
  description,
}: {
  label: string;
  value: React.ReactNode;
  tone?: 'default' | 'primary';
  description?: string;
}) {
  const toneClasses = {
    default: 'border-border/80 bg-background/70 text-foreground',
    primary: 'border-primary/20 bg-primary/[0.08] text-primary',
  } as const;

  return (
    <div className={`rounded-[24px] border p-5 ${toneClasses[tone]}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <div className="mt-3 text-3xl font-bold tracking-tight">{value}</div>
      {description ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export const DoseCalculatorCard = React.memo(function DoseCalculatorCard({
  doses,
  presentations,
  className,
}: DoseCalculatorCardProps) {
  const availableSpecies = useMemo(() => {
    const set = new Set<MedicationDoseSpecies>();
    doses.forEach((dose) => {
      if (dose.species === 'both') {
        set.add('dog');
        set.add('cat');
      } else {
        set.add(dose.species);
      }
    });
    return Array.from(set);
  }, [doses]);

  const [selectedSpecies, setSelectedSpecies] = useState<MedicationDoseSpecies>(availableSpecies[0] || 'dog');
  const filteredDoses = useMemo(
    () => doses.filter((dose) => dose.species === 'both' || dose.species === selectedSpecies),
    [doses, selectedSpecies]
  );
  const [selectedDoseId, setSelectedDoseId] = useState<string>(filteredDoses[0]?.id || doses[0]?.id || '');
  const [selectedPresentationId, setSelectedPresentationId] = useState<string>('');

  const selectedDose = useMemo(
    () => filteredDoses.find((item) => item.id === selectedDoseId) || filteredDoses[0],
    [filteredDoses, selectedDoseId]
  );
  const selectedPresentation = useMemo(
    () => presentations.find((item) => item.id === selectedPresentationId),
    [presentations, selectedPresentationId]
  );

  const { weight, setWeight, result } = useDoseCalculator(selectedDose, selectedPresentation);

  useEffect(() => {
    if (!filteredDoses.length) return;
    if (filteredDoses.some((dose) => dose.id === selectedDoseId)) return;
    setSelectedDoseId(filteredDoses[0].id);
  }, [filteredDoses, selectedDoseId]);

  if (!doses.length || !selectedDose) return null;

  const conversionLabel =
    result?.conversionSafeMin !== undefined || result?.conversionSafeSingle !== undefined
      ? {
          min: result.conversionSafeMin,
          max: result.conversionSafeMax,
          single: result.conversionSafeSingle,
        }
      : {
          min: result?.conversionExactMin,
          max: result?.conversionExactMax,
          single: result?.conversionExactSingle,
        };

  return (
    <section className={cn('overflow-hidden rounded-[32px] border border-border bg-card/95 shadow-sm', className)}>
      <div className="border-b border-border/70 px-6 py-5 md:px-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[28px] font-bold tracking-tight text-foreground">{UI_TEXT.title}</h2>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">{UI_TEXT.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-8 px-6 py-6 md:px-8 md:py-8">
        <div className="rounded-[24px] border border-primary/15 bg-primary/[0.05] px-5 py-4 text-sm leading-7 text-foreground/85">
          {UI_TEXT.explicitSpecies}
        </div>

        <div className="grid gap-5 xl:grid-cols-12">
          <div className="space-y-2 xl:col-span-2">
            <Label>{UI_TEXT.species}</Label>
            <select
              value={selectedSpecies}
              onChange={(event) => setSelectedSpecies(event.target.value as MedicationDoseSpecies)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {availableSpecies.map((species) => (
                <option key={species} value={species}>
                  {formatDoseSpeciesLabel(species)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 xl:col-span-2">
            <Label>{UI_TEXT.weight}</Label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value) || '')}
              placeholder="Ex.: 12,4"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2 xl:col-span-5">
            <Label>{UI_TEXT.doseBase}</Label>
            <select
              value={selectedDoseId}
              onChange={(event) => setSelectedDoseId(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {filteredDoses.map((dose) => (
                <option key={dose.id} value={dose.id}>
                  {buildDoseSummaryLabel(dose)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 xl:col-span-3">
            <Label>{UI_TEXT.presentation}</Label>
            <select
              value={selectedPresentationId}
              onChange={(event) => setSelectedPresentationId(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">{UI_TEXT.mgOnly}</option>
              {presentations.map((presentation) => (
                <option key={presentation.id} value={presentation.id}>
                  {presentation.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[28px] border border-border/80 bg-muted/[0.12] p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{UI_TEXT.referenceDose}</p>
                <p className="mt-3 text-[15px] leading-7 text-foreground">{buildDoseSummaryLabel(selectedDose)}</p>
                {selectedDose.duration ? (
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    <span className="font-medium text-foreground">Duração:</span> {selectedDose.duration}
                  </p>
                ) : null}
                {selectedDose.notes ? (
                  <p className="mt-4 border-t border-border/70 pt-4 text-sm leading-7 text-muted-foreground">{selectedDose.notes}</p>
                ) : null}
              </div>
            </div>
          </div>

          {result ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {result.warning ? (
                <div className="flex items-start gap-3 rounded-[24px] border border-amber-500/20 bg-amber-500/[0.06] px-5 py-4 text-sm leading-7 text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="mt-1 h-4 w-4 shrink-0" />
                  <p>{result.warning}</p>
                </div>
              ) : null}

              <ResultMetric
                label={UI_TEXT.totalDose}
                value={
                  <>
                    {result.doseMinMg && result.doseMaxMg && result.doseMaxMg !== result.doseMinMg
                      ? `${result.doseMinMg.toFixed(1)} - ${result.doseMaxMg.toFixed(1)}`
                      : result.doseCalculatedMg?.toFixed(1) || result.doseMinMg?.toFixed(1) || '-'}
                    <span className="ml-1 text-base font-medium text-muted-foreground">mg</span>
                  </>
                }
              />

              {result.conversionKind && result.conversionKind !== 'mg-only' ? (
                <ResultMetric
                  label={UI_TEXT.safeConversion}
                  tone="primary"
                  value={
                    <>
                      {conversionLabel.min !== undefined && conversionLabel.max !== undefined && conversionLabel.max !== conversionLabel.min
                        ? `${conversionLabel.min.toFixed(2)} - ${conversionLabel.max.toFixed(2)}`
                        : conversionLabel.single !== undefined
                          ? conversionLabel.single.toFixed(2)
                          : conversionLabel.min?.toFixed(2) || '-'}
                      <span className="ml-1 text-base font-medium text-primary/70">{result.conversionUnitLabel}</span>
                    </>
                  }
                  description={result.conversionNote}
                />
              ) : selectedPresentation ? (
                <ResultMetric
                  label={UI_TEXT.mgFallback}
                  value={<span className="text-xl font-semibold">Sem conversão segura</span>}
                  description="Não foi possível converter com segurança para a apresentação selecionada."
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
});
