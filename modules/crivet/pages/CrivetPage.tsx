import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PatientBlock from '../components/PatientBlock'
import DrugSelector from '../components/DrugSelector'
import InfusionCalculator from '../components/InfusionCalculator'
import { Comorbidity, PhysiologyState, Species } from '../types/patient'
import { Drug, drugs } from '../data/drugs'
import { useClinic } from '../../../src/components/ClinicProvider'
import { createRxDataAdapter, resolveRxDataSource } from '../../receituario-vet/adapters'
import { PatientQuickSelect } from '../../receituario-vet/components/PatientQuickSelect'
import { PatientCreateModal } from '../../receituario-vet/components/PatientCreateModal'
import type { DataAdapterPatientMatch } from '../../receituario-vet/adapters'
import type { PatientInfo, TutorInfo } from '../../receituario-vet/rxTypes'
import { TutorQuickSelect } from '../components/TutorQuickSelect'

const CRIVET_HEADER_SELECTION_SESSION_KEY = 'vetius:crivet:header-selection'

type CrivetHeaderSelectionSession = {
  source: 'local' | 'supabase'
  clinicId: string | null
  patientRecordId: string
  patientName: string
  tutorRecordId: string
  tutorName: string
}

function writeCrivetHeaderSelectionSession(snapshot: CrivetHeaderSelectionSession | null) {
  try {
    if (!snapshot) {
      sessionStorage.removeItem(CRIVET_HEADER_SELECTION_SESSION_KEY)
      return
    }
    sessionStorage.setItem(CRIVET_HEADER_SELECTION_SESSION_KEY, JSON.stringify(snapshot))
  } catch {
    // noop
  }
}

function readCrivetHeaderSelectionSession(): CrivetHeaderSelectionSession | null {
  try {
    const raw = sessionStorage.getItem(CRIVET_HEADER_SELECTION_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CrivetHeaderSelectionSession>
    const source = parsed.source === 'supabase' ? 'supabase' : 'local'
    return {
      source,
      clinicId: parsed.clinicId ? String(parsed.clinicId) : null,
      patientRecordId: String(parsed.patientRecordId || '').trim(),
      patientName: String(parsed.patientName || '').trim(),
      tutorRecordId: String(parsed.tutorRecordId || '').trim(),
      tutorName: String(parsed.tutorName || '').trim(),
    }
  } catch {
    return null
  }
}

export default function CrivetPage() {
  const { clinicId } = useClinic()
  const crivetDataSource = useMemo(
    () => resolveRxDataSource(import.meta.env.VITE_RX_DATA_SOURCE),
    []
  )
  const crivetAdapter = useMemo(
    () =>
      createRxDataAdapter({
        source: crivetDataSource,
        clinicId,
      }),
    [clinicId, crivetDataSource]
  )
  const supabaseModeWithoutClinic = crivetDataSource === 'supabase' && !clinicId

  const [patient, setPatient] = useState<PatientInfo | null>(null)
  const [tutor, setTutor] = useState<TutorInfo | null>(null)
  const [patientCreateModalOpen, setPatientCreateModalOpen] = useState(false)
  const headerSelectionHydratedRef = useRef(false)

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

  const handlePatientPick = useCallback((match: DataAdapterPatientMatch) => {
    setPatient(match.patient)
    setTutor(match.tutor)
  }, [])

  const handleTutorPick = useCallback((tutor: TutorInfo) => {
    setTutor(tutor)
  }, [])

  const handlePatientCreate = useCallback((match: DataAdapterPatientMatch) => {
    setPatient(match.patient)
    setTutor(match.tutor)
    setPatientCreateModalOpen(false)
  }, [])

  // Session persistence
  useEffect(() => {
    if (!headerSelectionHydratedRef.current) return
    headerSelectionHydratedRef.current = true

    const sessionSelection = readCrivetHeaderSelectionSession()
    if (!sessionSelection) return
    if (sessionSelection.source !== crivetDataSource) return

    if (
      sessionSelection.source === 'supabase' &&
      sessionSelection.clinicId &&
      clinicId &&
      sessionSelection.clinicId !== clinicId
    ) {
      return
    }

    if (patient?.patientRecordId || tutor?.tutorRecordId) {
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const resolvedTutor = sessionSelection.tutorRecordId
          ? await crivetAdapter.getTutorById(sessionSelection.tutorRecordId)
          : null

        let resolvedPatient = null
        if (
          sessionSelection.patientRecordId &&
          sessionSelection.tutorRecordId &&
          crivetAdapter.listPatientsByTutorId
        ) {
          const patients = await crivetAdapter.listPatientsByTutorId(sessionSelection.tutorRecordId)
          resolvedPatient =
            patients.find((entry) => entry.patientRecordId === sessionSelection.patientRecordId) || null
        }

        if (cancelled) return

        if (resolvedTutor && resolvedPatient) {
          setPatient(resolvedPatient)
          setTutor(resolvedTutor)
          return
        }

        setPatient({
          patientRecordId: sessionSelection.patientRecordId,
          name: sessionSelection.patientName,
          species: 'Canina',
          breed: '',
          sex: 'Sem dados',
          reproductiveStatus: 'Sem dados',
          ageText: '',
          birthDate: '',
          coat: '',
          weightKg: null,
          weightDate: '',
          notes: '',
        })
        setTutor({
          tutorRecordId: sessionSelection.tutorRecordId,
          name: sessionSelection.tutorName,
          phone: '',
          email: '',
          cpf: '',
          rg: '',
          addressStreet: '',
          addressNumber: '',
          addressComplement: '',
          addressDistrict: '',
          addressCity: '',
          addressState: '',
          addressZip: '',
          notes: '',
        })
      } catch (error) {
        if (cancelled) return
        if (import.meta.env.DEV) {
          console.error('[CRIVET B1.1.1] Falha ao reidratar cabecalho do plantao', error)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [clinicId, crivetAdapter, crivetDataSource, patient?.patientRecordId, tutor?.tutorRecordId])

  useEffect(() => {
    if (!headerSelectionHydratedRef.current) return

    const patientRecordId = String(patient?.patientRecordId || '').trim()
    const tutorRecordId = String(tutor?.tutorRecordId || '').trim()

    if (!patientRecordId && !tutorRecordId) {
      writeCrivetHeaderSelectionSession(null)
      return
    }

    writeCrivetHeaderSelectionSession({
      source: crivetDataSource,
      clinicId: clinicId || null,
      patientRecordId,
      patientName: String(patient?.name || '').trim(),
      tutorRecordId,
      tutorName: String(tutor?.name || '').trim(),
    })
  }, [
    clinicId,
    crivetDataSource,
    patient?.name,
    patient?.patientRecordId,
    tutor?.name,
    tutor?.tutorRecordId,
  ])

  // Sync patient data to form
  useEffect(() => {
    if (patient) {
      setSpecies(patient.species === 'Felina' ? 'cat' : 'dog')
      if (patient.weightKg) setWeight(String(patient.weightKg))
    }
  }, [patient])

  return (
    <div className="crivet-page-root min-h-screen">
      {/* Ambient background */}
      <div className="crivet-ambient-bg" aria-hidden="true">
        <div className="crivet-ambient-orb crivet-ambient-orb-1" />
        <div className="crivet-ambient-orb crivet-ambient-orb-2" />
        <div className="crivet-ambient-orb crivet-ambient-orb-3" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-6 space-y-5">
        {/* Patient/Tutor Header */}
        <div className="bg-[#0f1e0d] border border-[#2f5b25] rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Paciente e Tutor</h2>
            <button
              type="button"
              className="px-3 py-1.5 text-sm bg-[#2b5a21] text-[#b9ffae] rounded-lg hover:bg-[#336c27] disabled:opacity-50"
              disabled={supabaseModeWithoutClinic}
              onClick={() => setPatientCreateModalOpen(true)}
            >
              Novo Paciente
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TutorQuickSelect
              adapter={crivetAdapter}
              value={tutor}
              onPick={handleTutorPick}
              disabled={supabaseModeWithoutClinic}
              placeholder="Selecionar tutor existente"
            />
            <PatientQuickSelect
              adapter={crivetAdapter}
              onPick={handlePatientPick}
              disabled={supabaseModeWithoutClinic}
            />
          </div>
          {tutor && patient && (
            <div className="text-sm text-slate-300">
              <p><strong>Tutor:</strong> {tutor.name}</p>
              <p><strong>Paciente:</strong> {patient.name} ({patient.species})</p>
            </div>
          )}
        </div>

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

      <PatientCreateModal
        open={patientCreateModalOpen}
        onOpenChange={setPatientCreateModalOpen}
        adapter={crivetAdapter}
        onCreatedAndPicked={handlePatientCreate}
      />
    </div>
  )
}
