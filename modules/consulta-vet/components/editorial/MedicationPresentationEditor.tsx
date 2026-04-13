import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { MedicationPresentation, MedicationSupplyChannel } from '../../types/medication';

const CHANNEL_OPTIONS: Array<{ value: MedicationSupplyChannel; label: string }> = [
  { value: 'veterinary', label: 'Medicina veterinária' },
  { value: 'human_pharmacy', label: 'Farmácia humana' },
  { value: 'compounded', label: 'Manipulado' },
];

interface MedicationPresentationEditorProps {
  value: MedicationPresentation[];
  onChange: (nextValue: MedicationPresentation[]) => void;
}

function createEmptyPresentation(): MedicationPresentation {
  return {
    id: `presentation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label: '',
    form: '',
    concentrationValue: undefined,
    concentrationUnit: '',
    packInfo: '',
    route: '',
    scoringInfo: '',
    channel: 'veterinary',
  };
}

export function MedicationPresentationEditor({
  value,
  onChange,
}: MedicationPresentationEditorProps) {
  const items = value || [];

  const updateField = <K extends keyof MedicationPresentation>(
    index: number,
    field: K,
    nextFieldValue: MedicationPresentation[K]
  ) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: nextFieldValue };
    onChange(next);
  };

  const removePresentation = (index: number) => {
    if (!window.confirm(`Excluir a apresentação ${index + 1}?`)) return;
    onChange(items.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
        Registre cada apresentação calculável em uma entrada própria. Evite listas agregadas de vários mg no mesmo label.
      </div>

      {items.map((presentation, index) => (
        <div key={presentation.id} className="rounded-2xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Apresentação {index + 1}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {presentation.label || 'Apresentação ainda sem denominação'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removePresentation(index)}
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Canal / origem</label>
              <select
                value={presentation.channel || 'veterinary'}
                onChange={(e) =>
                  updateField(index, 'channel', e.target.value as MedicationSupplyChannel)
                }
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {CHANNEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              value={presentation.label}
              onChange={(e) => updateField(index, 'label', e.target.value)}
              placeholder="Denominação (rótulo)"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 xl:col-span-2"
            />
            <input
              value={presentation.form}
              onChange={(e) => updateField(index, 'form', e.target.value)}
              placeholder="Forma"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={presentation.route || ''}
              onChange={(e) => updateField(index, 'route', e.target.value)}
              placeholder="Via"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="number"
              value={presentation.concentrationValue ?? ''}
              onChange={(e) => updateField(index, 'concentrationValue', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Concentração"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={presentation.concentrationUnit || ''}
              onChange={(e) => updateField(index, 'concentrationUnit', e.target.value)}
              placeholder="Unidade"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={presentation.packInfo || ''}
              onChange={(e) => updateField(index, 'packInfo', e.target.value)}
              placeholder="Embalagem / quantidade"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={presentation.scoringInfo || ''}
              onChange={(e) => updateField(index, 'scoringInfo', e.target.value)}
              placeholder="Sulco / fracionamento"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items, createEmptyPresentation()])}
        className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        <Plus className="h-4 w-4" />
        Adicionar apresentação
      </button>
    </div>
  );
}
