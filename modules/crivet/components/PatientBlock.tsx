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

const physiologyOptions: Array<{
  value: PhysiologyState
  icon: LucideIcon
  subtitle: string
}> = [
  { value: 'Neonato', icon: Sparkles, subtitle: 'Recém-nascido / muito jovem' },
  { value: 'Filhote', icon: HeartPulse, subtitle: 'Paciente jovem em crescimento' },
  { value: 'Adulto', icon: ShieldCheck, subtitle: 'Faixa fisiológica padrão' },
  { value: 'Idoso', icon: Syringe, subtitle: 'Sênior com maior vigilância' },
]

const comorbidityOptions: Array<{
  value: Comorbidity
  icon: LucideIcon
  subtitle: string
}> = [
  { value: 'Cardiopata', icon: HeartPulse, subtitle: 'Doença cardíaca / hemodinâmica' },
  { value: 'Endocrinopata', icon: Sparkles, subtitle: 'Alteração hormonal / metabólica' },
  { value: 'Hepatopata', icon: Syringe, subtitle: 'Comprometimento hepático' },
  { value: 'Renopata', icon: Droplets, subtitle: 'Comprometimento renal' },
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
      onWeightChange(event.target.value.replace(',', '.'))
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
          <div className="crivet-choice-grid">
            {physiologyOptions.map((option) => {
              const selected = physiology === option.value
              const Icon = option.icon
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onPhysiologyChange(option.value)}
                  aria-pressed={selected}
                  className={`crivet-choice-btn ${selected ? 'crivet-choice-btn--physio-active' : ''}`}
                >
                  <div className="crivet-choice-head">
                    <Icon className="crivet-choice-icon" aria-hidden="true" />
                    <span className="crivet-choice-title">{option.value}</span>
                  </div>
                  <p className="crivet-choice-subtitle">{option.subtitle}</p>
                  <ShieldCheck
                    className={`crivet-choice-check ${selected ? 'crivet-choice-check--active' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="crivet-field-group">
          <FieldLabel text="Comorbidades" tooltipId={'comorbidities_help' as TooltipId} className="crivet-field-label" />
          <div className="crivet-choice-grid">
            {comorbidityOptions.map((option) => {
              const selected = comorbidities.includes(option.value)
              const Icon = option.icon
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onComorbidityToggle(option.value)}
                  aria-pressed={selected}
                  className={`crivet-choice-btn ${selected ? 'crivet-choice-btn--comorb-active' : ''}`}
                >
                  <div className="crivet-choice-head">
                    <Icon className="crivet-choice-icon" aria-hidden="true" />
                    <span className="crivet-choice-title">{option.value}</span>
                  </div>
                  <p className="crivet-choice-subtitle">{option.subtitle}</p>
                  <ShieldCheck
                    className={`crivet-choice-check ${selected ? 'crivet-choice-check--active' : ''}`}
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
