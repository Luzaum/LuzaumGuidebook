import React, { useCallback, useMemo, useState } from 'react'
import PatientBlock from '../components/PatientBlock'
import DrugSelector from '../components/DrugSelector'
import InfusionCalculator from '../components/InfusionCalculator'
import { Comorbidity, PhysiologyState, Species } from '../types/patient'
import { Drug, drugs } from '../data/drugs'

export default function CrivetPage() {
  const [species, setSpecies] = useState<Species>('dog')
  const [weight, setWeight] = useState('')
  const [physiology, setPhysiology] = useState<PhysiologyState>('Adulto')
  const [comorbidities, setComorbidities] = useState<Comorbidity[]>([])
  const [selectedDrugId, setSelectedDrugId] = useState<string>('lidocaina')

  const selectedDrug = useMemo<Drug | null>(() => drugs.find((drug) => drug.id === selectedDrugId) || null, [selectedDrugId])

  const handleComorbidityToggle = useCallback(
    (value: Comorbidity) => {
      setComorbidities((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
    },
    [],
  )

  const handleDrugSelect = useCallback((drug: Drug) => setSelectedDrugId(drug.id), [])

  return (
    <div className="crivet-page-root min-h-screen">
      {/* Ambient background */}
      <div className="crivet-ambient-bg" aria-hidden="true">
        <div className="crivet-ambient-orb crivet-ambient-orb-1" />
        <div className="crivet-ambient-orb crivet-ambient-orb-2" />
        <div className="crivet-ambient-orb crivet-ambient-orb-3" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-6 space-y-5">
        {/* Header */}
        <header className="crivet-header">
          <div className="crivet-header-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            CriVET
          </div>
          <h1 className="crivet-header-title">Calculadora de Infusão Veterinária</h1>
          <p className="crivet-header-subtitle">Cálculo preciso de CRI para cães e gatos</p>
        </header>

        {/* Steps */}
        <PatientBlock
          species={species}
          physiology={physiology}
          comorbidities={comorbidities}
          weight={weight}
          onSpeciesChange={setSpecies}
          onPhysiologyChange={setPhysiology}
          onComorbidityToggle={handleComorbidityToggle}
          onWeightChange={setWeight}
        />

        <DrugSelector selectedDrug={selectedDrug} onSelectDrug={handleDrugSelect} />

        <InfusionCalculator
          patientWeight={weight}
          selectedDrug={selectedDrug}
          species={species}
          physiology={physiology}
          comorbidities={comorbidities}
        />
      </div>
    </div>
  )
}
