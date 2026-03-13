import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { MedicationPresentation } from '../../types/medication';

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

  return (
    <div className="space-y-4">
      {items.map((presentation, index) => (
        <div key={presentation.id} className="rounded-2xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Apresentação {index + 1}</p>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, currentIndex) => currentIndex !== index))}
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              Remover
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input value={presentation.label} onChange={(e) => updateField(index, 'label', e.target.value)} placeholder="Label" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 xl:col-span-2" />
            <input value={presentation.form} onChange={(e) => updateField(index, 'form', e.target.value)} placeholder="Forma" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input value={presentation.route || ''} onChange={(e) => updateField(index, 'route', e.target.value)} placeholder="Via" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input type="number" value={presentation.concentrationValue ?? ''} onChange={(e) => updateField(index, 'concentrationValue', e.target.value ? Number(e.target.value) : undefined)} placeholder="Concentração" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input value={presentation.concentrationUnit || ''} onChange={(e) => updateField(index, 'concentrationUnit', e.target.value)} placeholder="Unidade" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input value={presentation.packInfo || ''} onChange={(e) => updateField(index, 'packInfo', e.target.value)} placeholder="Pack info" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <input value={presentation.scoringInfo || ''} onChange={(e) => updateField(index, 'scoringInfo', e.target.value)} placeholder="Sulco / fracionamento" className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
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
