import React from 'react'
import type { DosePreset, Species, DoseMode } from '../types/presets'

type Props = {
  presets: DosePreset[]
  species: Species
  mode: DoseMode // modo atual selecionado no UI (CRI/BOLUS)
  route?: 'IV' | 'IM' | 'IO' | 'PO' | 'IN'
  onApply: (preset: DosePreset) => void
}

export function DosePresetsRow({ presets, species, mode, route, onApply }: Props) {
  const filtered = presets.filter((p) => {
    const speciesOk = !p.species || p.species === 'both' || p.species === species
    const modeOk = p.mode === mode
    const routeOk = !p.route || !route || p.route === route
    return speciesOk && modeOk && routeOk
  })

  if (filtered.length === 0) return null

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        {filtered.map((p) => (
          <button
            key={p.id}
            type="button"
            className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-400 dark:hover:border-sky-600 transition-colors"
            title={p.note || ''}
            onClick={() => onApply(p)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
