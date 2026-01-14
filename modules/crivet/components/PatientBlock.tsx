import React, { useCallback } from 'react'
import { Cat, Dog } from 'lucide-react'
import { Comorbidity, PhysiologyState, Species } from '../types/patient'
import { FieldLabel } from './FieldLabel'
import type { TooltipId } from '../data/help.registry'

type PatientBlockProps = {
  species: Species
  physiology: PhysiologyState
  comorbidities: Comorbidity[]
  weight: string
  onSpeciesChange: (value: Species) => void
  onPhysiologyChange: (value: PhysiologyState) => void
  onComorbidityToggle: (value: Comorbidity) => void
  onWeightChange: (value: string) => void
}

const physiologyOptions: PhysiologyState[] = ['Neonato', 'Filhote', 'Adulto', 'Idoso']
const comorbidityOptions: Comorbidity[] = ['Cardiopata', 'Endocrinopata', 'Hepatopata', 'Renopata']

export default function PatientBlock({
  species,
  physiology,
  comorbidities,
  weight,
  onSpeciesChange,
  onPhysiologyChange,
  onComorbidityToggle,
  onWeightChange,
}: PatientBlockProps) {
  const handleWeight = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onWeightChange(event.target.value)
  }, [onWeightChange])

  const summary = `Paciente: ${species === 'dog' ? 'Cão' : 'Gato'} • ${weight || '0'} kg • ${physiology} • ${
    comorbidities.length > 0 ? comorbidities.join(', ') : 'Sem comorbidades'
  }`

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-black">
            1
          </span>
          Paciente
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpeciesSelector species={species} onChange={onSpeciesChange} />

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            Peso (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={handleWeight}
            placeholder="0.0"
            min="0"
            step="0.1"
            className="w-full h-[72px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center text-2xl font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FieldLabel text="Estado fisiológico" tooltipId={'physiology_age_help' as TooltipId} className="uppercase tracking-wide" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {physiologyOptions.map((option) => (
              <button
                key={option}
                onClick={() => onPhysiologyChange(option)}
                className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                  physiology === option
                    ? 'bg-gradient-to-br from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700 border-sky-500 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-md'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FieldLabel text="Comorbidades" tooltipId={'comorbidities_help' as TooltipId} className="uppercase tracking-wide" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {comorbidityOptions.map((option) => {
              const selected = comorbidities.includes(option)
              return (
                <button
                  key={option}
                  onClick={() => onComorbidityToggle(option)}
                  className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                    selected
                      ? 'bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700 border-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300 dark:hover:border-rose-600 hover:shadow-md'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-mono text-slate-700 dark:text-slate-300 text-center">{summary}</p>
      </div>
    </div>
  )
}

type SpeciesSelectorProps = {
  species: Species
  onChange: (value: Species) => void
}

function SpeciesSelector({ species, onChange }: SpeciesSelectorProps) {
  const handleDog = useCallback(() => onChange('dog'), [onChange])
  const handleCat = useCallback(() => onChange('cat'), [onChange])

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
        Espécie
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDog}
          className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
            species === 'dog'
              ? 'border-sky-500 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 shadow-lg shadow-sky-500/20'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md'
          }`}
        >
          <Dog
            className={`w-10 h-10 mb-2 transition-colors ${
              species === 'dog' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-sky-500'
            }`}
          />
          <span className={`text-lg font-bold ${species === 'dog' ? 'text-sky-900 dark:text-sky-100' : 'text-slate-600 dark:text-slate-400'}`}>
            🐶 Cão
          </span>
          {species === 'dog' && (
            <div className="absolute inset-0 rounded-xl ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-800" />
          )}
        </button>

        <button
          onClick={handleCat}
          className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
            species === 'cat'
              ? 'border-sky-500 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 shadow-lg shadow-sky-500/20'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md'
          }`}
        >
          <Cat
            className={`w-10 h-10 mb-2 transition-colors ${
              species === 'cat' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-sky-500'
            }`}
          />
          <span className={`text-lg font-bold ${species === 'cat' ? 'text-sky-900 dark:text-sky-100' : 'text-slate-600 dark:text-slate-400'}`}>
            🐱 Gato
          </span>
          {species === 'cat' && (
            <div className="absolute inset-0 rounded-xl ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-800" />
          )}
        </button>
      </div>
    </div>
  )
}
