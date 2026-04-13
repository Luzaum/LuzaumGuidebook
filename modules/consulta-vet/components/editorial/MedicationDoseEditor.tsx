import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { MedicationDose } from '../../types/medication';
import { buildDoseSummaryLabel, formatDoseSpeciesLabel } from '../../utils/medicationRules';

interface MedicationDoseEditorProps {
  value: MedicationDose[];
  onChange: (nextValue: MedicationDose[]) => void;
  presentationOptions?: { id: string; label: string }[];
}

function createEmptyDose(): MedicationDose {
  return {
    id: `dose-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    species: 'dog',
    indication: '',
    doseMin: 0,
    doseMax: undefined,
    doseUnit: 'mg',
    perWeightUnit: 'kg',
    route: '',
    frequency: '',
    duration: '',
    notes: '',
    calculatorEnabled: true,
  };
}

export function MedicationDoseEditor({ value, onChange, presentationOptions }: MedicationDoseEditorProps) {
  const doses = value || [];

  const updateField = <K extends keyof MedicationDose>(
    index: number,
    field: K,
    nextFieldValue: MedicationDose[K]
  ) => {
    const next = [...doses];
    next[index] = { ...next[index], [field]: nextFieldValue };
    onChange(next);
  };

  const removeDose = (index: number) => {
    if (!window.confirm(`Excluir a dose ${index + 1}?`)) return;
    onChange(doses.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
        Cada dose deve representar um único protocolo clínico. Separe por espécie quando necessário e nunca misture dose única, pré-operatório e manutenção na mesma entrada.
      </div>

      {doses.map((dose, index) => (
        <div key={dose.id} className="rounded-2xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Dose {index + 1}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {dose.indication ? buildDoseSummaryLabel(dose) : 'Regime ainda não configurado.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeDose(index)}
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              Remover
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input
              value={dose.indication}
              onChange={(e) => updateField(index, 'indication', e.target.value)}
              placeholder="Indicação / regime clínico"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 xl:col-span-2"
            />
            <select
              value={dose.species}
              onChange={(e) => updateField(index, 'species', e.target.value as MedicationDose['species'])}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="dog">Canino</option>
              <option value="cat">Felino</option>
              <option value="both">Ambos</option>
            </select>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5 text-sm text-muted-foreground">
              Espécie: <span className="font-medium text-foreground">{formatDoseSpeciesLabel(dose.species)}</span>
            </div>

            <label className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm text-foreground xl:col-span-2">
              <input
                type="checkbox"
                checked={dose.calculatorEnabled}
                onChange={(e) => updateField(index, 'calculatorEnabled', e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              Calculadora ativa para este regime
            </label>

            {presentationOptions && presentationOptions.length > 0 ? (
              <div className="xl:col-span-2">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Apresentação preferida no cálculo (opcional)
                </label>
                <select
                  value={dose.presentationId || ''}
                  onChange={(e) =>
                    updateField(index, 'presentationId', e.target.value.trim() || undefined)
                  }
                  className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Qualquer (usuário escolhe)</option>
                  {presentationOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <input
              type="number"
              value={dose.doseMin}
              onChange={(e) => updateField(index, 'doseMin', Number(e.target.value) || 0)}
              placeholder="Dose mínima"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="number"
              value={dose.doseMax ?? ''}
              onChange={(e) => updateField(index, 'doseMax', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Dose máxima"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={dose.doseUnit}
              onChange={(e) => updateField(index, 'doseUnit', e.target.value)}
              placeholder="Unidade da dose (ex.: mg)"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={dose.perWeightUnit}
              onChange={(e) => updateField(index, 'perWeightUnit', e.target.value)}
              placeholder="Por unidade de peso (ex.: kg)"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={dose.route}
              onChange={(e) => updateField(index, 'route', e.target.value)}
              placeholder="Via"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={dose.frequency}
              onChange={(e) => updateField(index, 'frequency', e.target.value)}
              placeholder="Frequência"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={dose.duration || ''}
              onChange={(e) => updateField(index, 'duration', e.target.value)}
              placeholder="Duração"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <textarea
              value={dose.notes || ''}
              onChange={(e) => updateField(index, 'notes', e.target.value)}
              placeholder="Notas clínicas. Se houver dose única ou pré-operatório, mantenha isso só nesta entrada."
              rows={3}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 xl:col-span-4"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...doses, createEmptyDose()])}
        className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        <Plus className="h-4 w-4" />
        Adicionar dose
      </button>
    </div>
  );
}
