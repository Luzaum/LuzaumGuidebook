import React, { useCallback } from 'react'
import { Cat, Dog, Weight } from 'lucide-react'
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

const comorbidityIcons: Record<Comorbidity, string> = {
  Cardiopata: '♥',
  Endocrinopata: '⚡',
  Hepatopata: '◈',
  Renopata: '◉',
}

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

  const summary = `${species === 'dog' ? 'Cão' : 'Gato'} • ${weight || '—'} kg • ${physiology}${comorbidities.length > 0 ? ' • ' + comorbidities.join(', ') : ''
    }`

  return (
    <section className="crivet-card" aria-labelledby="patient-block-title">
      {/* Card header */}
      <div className="crivet-card-header">
        <div className="crivet-step-badge">1</div>
        <h2 id="patient-block-title" className="crivet-card-title">Paciente</h2>
        {weight && (
          <span className="crivet-status-pill crivet-status-pill--active ml-auto">
            {summary}
          </span>
        )}
      </div>

      {/* Species + Weight */}
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

      {/* Physiology + Comorbidities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="crivet-field-group">
          <FieldLabel text="Estado fisiológico" tooltipId={'physiology_age_help' as TooltipId} className="crivet-field-label" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {physiologyOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onPhysiologyChange(option)}
                aria-pressed={physiology === option}
                className={`crivet-toggle-btn ${physiology === option ? 'crivet-toggle-btn--active-teal' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="crivet-field-group">
          <FieldLabel text="Comorbidades" tooltipId={'comorbidities_help' as TooltipId} className="crivet-field-label" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {comorbidityOptions.map((option) => {
              const selected = comorbidities.includes(option)
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onComorbidityToggle(option)}
                  aria-pressed={selected}
                  className={`crivet-toggle-btn ${selected ? 'crivet-toggle-btn--active-rose' : ''}`}
                >
                  <span className="crivet-comorbidity-icon" aria-hidden="true">{comorbidityIcons[option]}</span>
                  {option}
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
        </svg>
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
            <Dog className="w-8 h-8" aria-hidden="true" />
          </div>
          <span className="crivet-species-label">Cão</span>
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
            <Cat className="w-8 h-8" aria-hidden="true" />
          </div>
          <span className="crivet-species-label">Gato</span>
          {species === 'cat' && <div className="crivet-species-ring" aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
