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
    <div className="mx-auto max-w-5xl p-4 space-y-6">
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
  )
}
