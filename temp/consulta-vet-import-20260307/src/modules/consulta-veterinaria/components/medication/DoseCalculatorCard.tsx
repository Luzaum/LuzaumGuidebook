import React, { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MedicationDose, MedicationPresentation } from '../../types/medication';
import { useDoseCalculator } from '../../hooks/useDoseCalculator';
import { cn } from '../../../../lib/utils';

interface DoseCalculatorCardProps {
  doses: MedicationDose[];
  presentations: MedicationPresentation[];
  className?: string;
}

export function DoseCalculatorCard({ doses, presentations, className }: DoseCalculatorCardProps) {
  const [selectedDoseId, setSelectedDoseId] = useState<string>(doses[0]?.id || '');
  const [selectedPresId, setSelectedPresId] = useState<string>(presentations[0]?.id || '');

  const selectedDose = doses.find((d) => d.id === selectedDoseId);
  const selectedPres = presentations.find((p) => p.id === selectedPresId);

  const { weight, setWeight, result } = useDoseCalculator(selectedDose!, selectedPres);

  if (!doses.length) return null;

  return (
    <div className={cn('bg-card rounded-2xl border border-border shadow-sm overflow-hidden', className)}>
      <div className="bg-muted/30 p-4 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-foreground tracking-tight">Calculadora de Dose</h3>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cálculo rápido e seguro</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Peso (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
              placeholder="Ex: 15"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Indicação / Dose Base</label>
            <select
              value={selectedDoseId}
              onChange={(e) => setSelectedDoseId(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none text-foreground"
            >
              {doses.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.indication || 'Dose Padrão'} ({d.species === 'dog' ? 'Cão' : d.species === 'cat' ? 'Gato' : 'Ambos'})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Apresentação</label>
            <select
              value={selectedPresId}
              onChange={(e) => setSelectedPresId(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none text-foreground"
            >
              <option value="">Apenas em mg</option>
              {presentations.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedDose && (
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/90">
              <p className="font-medium mb-1">Dose de referência:</p>
              <p>
                {selectedDose.doseMin}
                {selectedDose.doseMax ? ` a ${selectedDose.doseMax}` : ''} {selectedDose.doseUnit}/{selectedDose.perWeightUnit}
                {selectedDose.route ? ` via ${selectedDose.route}` : ''}
                {selectedDose.frequency ? ` ${selectedDose.frequency}` : ''}
              </p>
            </div>
          </div>
        )}

        {result && (
          <div className="pt-6 border-t border-border">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Resultado do Cálculo</h4>
            
            {result.warning && (
              <div className="mb-4 bg-amber-500/10 text-amber-600 dark:text-amber-500 p-3 rounded-lg text-sm flex items-start gap-2 border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{result.warning}</p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Dose Total (mg)</p>
                <p className="text-2xl font-bold text-foreground">
                  {result.doseMinMg && result.doseMaxMg
                    ? `${result.doseMinMg.toFixed(1)} - ${result.doseMaxMg.toFixed(1)}`
                    : result.doseCalculatedMg?.toFixed(1)}
                  <span className="text-base font-medium text-muted-foreground ml-1">mg</span>
                </p>
              </div>

              {(result.volumeMinMl || result.volumeCalculatedMl) && (
                <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Volume a Administrar</p>
                  <p className="text-2xl font-bold text-primary">
                    {result.volumeMinMl && result.volumeMaxMl
                      ? `${result.volumeMinMl.toFixed(2)} - ${result.volumeMaxMl.toFixed(2)}`
                      : result.volumeCalculatedMl?.toFixed(2)}
                    <span className="text-base font-medium text-primary/70 ml-1">mL</span>
                  </p>
                </div>
              )}

              {(result.tabletsMin || result.tabletsCalculated) && (
                <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Comprimidos</p>
                  <p className="text-2xl font-bold text-primary">
                    {result.tabletsMin && result.tabletsMax
                      ? `${result.tabletsMin.toFixed(1)} - ${result.tabletsMax.toFixed(1)}`
                      : result.tabletsCalculated?.toFixed(1)}
                    <span className="text-base font-medium text-primary/70 ml-1">comp.</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
