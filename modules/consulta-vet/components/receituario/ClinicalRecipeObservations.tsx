import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  notes: string[];
}

export function ClinicalRecipeObservations({ notes }: Props) {
  if (!notes.length) return null;

  return (
    <aside
      className="rounded-xl border border-amber-300/70 bg-amber-50/70 p-3 text-amber-950 dark:border-amber-900 dark:bg-amber-950/25 dark:text-amber-100"
      aria-label="Observações da receita"
    >
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <h4 className="text-xs font-bold">Observações da receita</h4>
          <p className="mt-0.5 text-[11px] leading-4 opacity-85">
            Informações de apoio clínico para o veterinário. Não aparecem na receita impressa nem no PDF.
          </p>
        </div>
      </div>
      <ul className="mt-2 space-y-1 pl-5 text-xs leading-5 marker:text-amber-700 dark:marker:text-amber-300">
        {notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
    </aside>
  );
}
