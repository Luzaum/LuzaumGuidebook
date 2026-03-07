import React, { useCallback } from 'react'
import { Cat, Dog, Droplets, HeartPulse, ShieldCheck, Sparkles, Stethoscope, Syringe, Weight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
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
const comorbidityOptions: Array<{ value: Comorbidity; icon: LucideIcon }> = [
  { value: 'Cardiopata', icon: HeartPulse },
  { value: 'Endocrinopata', icon: Sparkles },
  { value: 'Hepatopata', icon: Syringe },
  { value: 'Renopata', icon: Droplets },
]

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
  const handleWeight = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onWeightChange(event.target.value)
    },
    [onWeightChange],
  )

  const summary = `${species === 'dog' ? 'Cão' : 'Gato'} | ${weight || '--'} kg | ${physiology}${
    comorbidities.length > 0 ? ' | ' + comorbidities.join(', ') : ''
  }`

  return (
    <section className="crivet-card" aria-labelledby="patient-block-title">
      <div className="crivet-card-header">
        <div className="crivet-step-badge">1</div>
        <h2 id="patient-block-title" className="crivet-card-title">
          Paciente
        </h2>
        {weight && <span className="crivet-status-pill crivet-status-pill--active ml-auto">{summary}</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SpeciesSelector species={species} onChange={onSpeciesChange} />

        <div className="crivet-field-group">
          <label className="crivet-field-label" htmlFor="patient-weight">
            <Weight className="w-3.5 h-3.5" aria-hidden="true" />
            Peso (kg)
          </label>
          <div className="crivet-weight-input-wrapper">
            <input
              id="patient-weight"
              type="number"
              value={weight}
              onChange={handleWeight}
              placeholder="0.0"
              min="0"
              step="0.1"
              className="crivet-weight-input"
              aria-label="Peso do paciente em quilogramas"
            />
            <span className="crivet-weight-unit">kg</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="crivet-field-group">
          <FieldLabel text="Estado fisiológico" tooltipId={'physiology_age_help' as TooltipId} className="crivet-field-label" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {physiologyOptions.map((option) => {
              const selected = physiology === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onPhysiologyChange(option)}
                  aria-pressed={selected}
                  className={`crivet-toggle-btn crivet-toggle-btn--physiology ${selected ? 'crivet-toggle-btn--active-teal' : ''}`}
                >
                  <span className="crivet-toggle-main">{option}</span>
                  <ShieldCheck
                    className={`crivet-toggle-check ${selected ? 'crivet-toggle-check--visible' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="crivet-field-group">
          <FieldLabel text="Comorbidades" tooltipId={'comorbidities_help' as TooltipId} className="crivet-field-label" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {comorbidityOptions.map((option) => {
              const selected = comorbidities.includes(option.value)
              const Icon = option.icon
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onComorbidityToggle(option.value)}
                  aria-pressed={selected}
                  className={`crivet-toggle-btn crivet-toggle-btn--comorbidity ${selected ? 'crivet-toggle-btn--active-rose' : ''}`}
                >
                  <span className="crivet-comorbidity-icon" aria-hidden="true">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="crivet-toggle-main">{option.value}</span>
                  <ShieldCheck
                    className={`crivet-toggle-check ${selected ? 'crivet-toggle-check--visible' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
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
    <div className="crivet-field-group">
      <label className="crivet-field-label">
        <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
        Espécie
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleDog}
          aria-pressed={species === 'dog'}
          className={`crivet-species-btn ${species === 'dog' ? 'crivet-species-btn--active' : ''}`}
          id="species-dog"
        >
          <div className={`crivet-species-icon-wrap ${species === 'dog' ? 'crivet-species-icon-wrap--active' : ''}`}>
            <Dog className="w-9 h-9" aria-hidden="true" />
          </div>
          <span className="crivet-species-label">Cão</span>
          <span className="crivet-species-subtitle">Canino</span>
          {species === 'dog' && <div className="crivet-species-ring" aria-hidden="true" />}
        </button>

        <button
          type="button"
          onClick={handleCat}
          aria-pressed={species === 'cat'}
          className={`crivet-species-btn ${species === 'cat' ? 'crivet-species-btn--active' : ''}`}
          id="species-cat"
        >
          <div className={`crivet-species-icon-wrap ${species === 'cat' ? 'crivet-species-icon-wrap--active' : ''}`}>
            <Cat className="w-9 h-9" aria-hidden="true" />
          </div>
          <span className="crivet-species-label">Gato</span>
          <span className="crivet-species-subtitle">Felino</span>
          {species === 'cat' && <div className="crivet-species-ring" aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
