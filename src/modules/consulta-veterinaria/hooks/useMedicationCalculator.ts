import { useEffect, useMemo, useState } from 'react'
import type { MedicationRecord, MedicationSpecies } from '../types/medication'
import { calculateDose } from '../utils/dose'

export function useMedicationCalculator(medication: MedicationRecord) {
  const [weightKg, setWeightKg] = useState<number | null>(null)
  const [species, setSpecies] = useState<MedicationSpecies>(
    medication.species.includes('dog') ? 'dog' : medication.species[0]
  )
  const [indication, setIndication] = useState('')
  const [presentationId, setPresentationId] = useState(medication.presentations[0]?.id || '')

  const availableDoses = useMemo(
    () => medication.doses.filter((dose) => dose.calculatorEnabled && (dose.species === species || dose.species === 'both')),
    [medication.doses, species]
  )

  const indications = useMemo(
    () => [...new Set(availableDoses.map((dose) => dose.indication).filter(Boolean) as string[])],
    [availableDoses]
  )

  useEffect(() => {
    if (!indication && indications[0]) setIndication(indications[0])
  }, [indication, indications])

  const selectedDose = useMemo(
    () => availableDoses.find((dose) => dose.indication === indication) || availableDoses[0] || null,
    [availableDoses, indication]
  )

  const selectedPresentation = useMemo(
    () => medication.presentations.find((item) => item.id === presentationId) || medication.presentations[0],
    [medication.presentations, presentationId]
  )

  const result = useMemo(() => {
    if (!selectedDose || !weightKg || weightKg <= 0) return null
    return calculateDose({
      weightKg,
      dose: selectedDose,
      presentation: selectedPresentation,
    })
  }, [selectedDose, selectedPresentation, weightKg])

  return {
    weightKg,
    setWeightKg,
    species,
    setSpecies,
    indication,
    setIndication,
    indications,
    presentationId,
    setPresentationId,
    selectedDose,
    selectedPresentation,
    result,
    hasCalculatorDose: availableDoses.length > 0,
  }
}

