import React, { useMemo, useState } from 'react';
import { AlertTriangle, Calculator, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { useDoseCalculator } from '../../hooks/useDoseCalculator';
import { MedicationDose, MedicationPresentation } from '../../types/medication';

interface DoseCalculatorCardProps {
  doses: MedicationDose[];
  presentations: MedicationPresentation[];
  className?: string;
}

const UI_TEXT = {
  title: 'Calculadora de dose',
  subtitle: 'C\u00e1lculo r\u00e1pido com base em peso e apresenta\u00e7\u00e3o',
  weight: 'Peso (kg)',
  doseBase: 'Dose base',
  presentation: 'Apresenta\u00e7\u00e3o',
  mgOnly: 'Apenas em mg',
  referenceDose: 'Dose de refer\u00eancia',
  results: 'Resultado do c\u00e1lculo',
  totalDose: 'Dose total',
  volume: 'Volume',
  tablets: 'Comprimidos',
  tabletUnit: 'comp.',
} as const;

export function DoseCalculatorCard({ doses, presentations, className }: DoseCalculatorCardProps) {
  const [selectedDoseId, setSelectedDoseId] = useState<string>(doses[0]?.id || '');
  const [selectedPresentationId, setSelectedPresentationId] = useState<string>('');

  const selectedDose = useMemo(
    () => doses.find((item) => item.id === selectedDoseId) || doses[0],
    [doses, selectedDoseId]
  );
  const selectedPresentation = useMemo(
    () => presentations.find((item) => item.id === selectedPresentationId),
    [presentations, selectedPresentationId]
  );

  const { weight, setWeight, result } = useDoseCalculator(selectedDose, selectedPresentation);

  if (!doses.length || !selectedDose) return null;

  return (
    <section className={cn('overflow-hidden rounded-[28px] border border-border bg-card shadow-sm', className)}>
      <header className="flex items-center gap-3 border-b border-border bg-muted/30 p-4 md:p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold tracking-tight text-foreground">{UI_TEXT.title}</h3>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {UI_TEXT.subtitle}
          </p>
        </div>
      </header>

      <div className="space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">{UI_TEXT.weight}</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value) || '')}
              placeholder="Ex.: 12,4"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">{UI_TEXT.doseBase}</label>
            <select
              value={selectedDoseId}
              onChange={(event) => setSelectedDoseId(event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {doses.map((dose) => (
                <option key={dose.id} value={dose.id}>
                  {dose.indication}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">{UI_TEXT.presentation}</label>
            <select
              value={selectedPresentationId}
              onChange={(event) => setSelectedPresentationId(event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
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

        <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="text-sm text-foreground/90">
              <p className="mb-1 font-medium">{UI_TEXT.referenceDose}</p>
              <p>
                {selectedDose.doseMin}
                {selectedDose.doseMax ? ` a ${selectedDose.doseMax}` : ''} {selectedDose.doseUnit}/{selectedDose.perWeightUnit}
                {selectedDose.route ? ` \u2022 ${selectedDose.route}` : ''}
                {selectedDose.frequency ? ` \u2022 ${selectedDose.frequency}` : ''}
              </p>
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-4 border-t border-border pt-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{UI_TEXT.results}</h4>

            {result.warning && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{result.warning}</p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{UI_TEXT.totalDose}</p>
                <p className="text-2xl font-bold text-foreground">
                  {result.doseMinMg && result.doseMaxMg
                    ? `${result.doseMinMg.toFixed(1)} - ${result.doseMaxMg.toFixed(1)}`
                    : result.doseCalculatedMg?.toFixed(1) || '-'}
                  <span className="ml-1 text-base font-medium text-muted-foreground">mg</span>
                </p>
              </div>

              {(result.volumeMinMl || result.volumeCalculatedMl) && (
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">{UI_TEXT.volume}</p>
                  <p className="text-2xl font-bold text-primary">
                    {result.volumeMinMl && result.volumeMaxMl
                      ? `${result.volumeMinMl.toFixed(2)} - ${result.volumeMaxMl.toFixed(2)}`
                      : result.volumeCalculatedMl?.toFixed(2)}
                    <span className="ml-1 text-base font-medium text-primary/70">mL</span>
                  </p>
                </div>
              )}

              {(result.tabletsMin || result.tabletsCalculated) && (
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">{UI_TEXT.tablets}</p>
                  <p className="text-2xl font-bold text-primary">
                    {result.tabletsMin && result.tabletsMax
                      ? `${result.tabletsMin.toFixed(1)} - ${result.tabletsMax.toFixed(1)}`
                      : result.tabletsCalculated?.toFixed(1)}
                    <span className="ml-1 text-base font-medium text-primary/70">{UI_TEXT.tabletUnit}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
