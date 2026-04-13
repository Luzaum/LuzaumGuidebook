import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { EditorialReference } from '../../types/common';
import { EditorialField } from './EditorialField';

interface ReferencesEditorProps {
  value: EditorialReference[];
  onChange: (nextValue: EditorialReference[]) => void;
}

function createEmptyReference(): EditorialReference {
  return {
    id: `ref-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    citationText: '',
    sourceType: '',
    url: '',
    notes: '',
    evidenceLevel: '',
  };
}

export function ReferencesEditor({ value, onChange }: ReferencesEditorProps) {
  const handleAdd = () => onChange([...(value || []), createEmptyReference()]);

  const handleRemove = (index: number) => {
    onChange((value || []).filter((_, currentIndex) => currentIndex !== index));
  };

  const handleFieldChange = <K extends keyof EditorialReference>(
    index: number,
    field: K,
    nextFieldValue: EditorialReference[K]
  ) => {
    const next = [...(value || [])];
    next[index] = { ...next[index], [field]: nextFieldValue };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {(value || []).map((reference, index) => (
        <div key={reference.id || index} className="rounded-2xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Referência {index + 1}</p>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              Remover
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <EditorialField label="Citação">
              <textarea
                rows={3}
                value={reference.citationText}
                onChange={(event) => handleFieldChange(index, 'citationText', event.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </EditorialField>

            <EditorialField label="Tipo de fonte">
              <input
                value={reference.sourceType || ''}
                onChange={(event) => handleFieldChange(index, 'sourceType', event.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Guideline, manual, bula, artigo..."
              />
            </EditorialField>

            <EditorialField label="URL">
              <input
                value={reference.url || ''}
                onChange={(event) => handleFieldChange(index, 'url', event.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="https://..."
              />
            </EditorialField>

            <EditorialField label="Nível de evidência" hint="Ex.: A, B, meta-análise, consenso.">
              <input
                value={reference.evidenceLevel || ''}
                onChange={(event) => handleFieldChange(index, 'evidenceLevel', event.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Ex.: nível A"
              />
            </EditorialField>

            <EditorialField label="Notas">
              <textarea
                rows={3}
                value={reference.notes || ''}
                onChange={(event) => handleFieldChange(index, 'notes', event.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </EditorialField>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        <Plus className="h-4 w-4" />
        Adicionar referência
      </button>
    </div>
  );
}
