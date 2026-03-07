import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvButton,
  RxvToggle,
} from '../../../src/components/receituario/RxvComponents'
import {
  searchMedications,
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  type RecommendedDose,
} from '../../../src/lib/clinicRecords'
import type { PrescriptionItem, PatientInfo } from '../NovaReceita2Page'
import { calculateMedicationQuantity, formatPerDoseQuantity } from '../rxRenderer'
import type { PrescriptionState } from '../rxTypes'

<<<<<<< Updated upstream
=======
// ===================== OPTIONS =====================
const FORM_OPTIONS = [
  { value: 'Comprimido', label: 'Comprimido' },
  { value: 'Cápsula', label: 'Cápsula' },
  { value: 'Suspensão Oral', label: 'Suspensão Oral' },
  { value: 'Solução Oral', label: 'Solução Oral' },
  { value: 'Xarope', label: 'Xarope' },
  { value: 'Gotas', label: 'Gotas' },
  { value: 'Injetável', label: 'Injetável' },
  { value: 'Pomada', label: 'Pomada' },
  { value: 'Creme', label: 'Creme' },
  { value: 'Gel', label: 'Gel' },
  { value: 'Colírio', label: 'Colírio' },
  { value: 'Otológico', label: 'Otológico' },
  { value: 'Transdérmico', label: 'Transdérmico' },
  { value: 'Shampoo', label: 'Shampoo' },
  { value: 'Loção', label: 'Loção' },
  { value: 'Spray', label: 'Spray' },
  { value: 'Pó', label: 'Pó' },
  { value: 'Outro', label: 'Outro' },
]

const CONC_UNIT_OPTIONS = [
  'mg', 'g', 'mcg', 'mL', 'mg/mL', 'g/mL', 'mg/comprimido', 'mg/cápsula', 'mg/g', '%', 'UI/mL', 'UI', 'UI/comprimido', 'mEq/mL', 'mEq'
].map(u => ({ value: u, label: u }))

const DOSE_UNIT_OPTIONS = [
  'mg/kg', 'mg', 'mL/kg', 'mL', 'gotas/kg', 'gotas', 'UI/kg', 'UI', 'UI/comprimido', 'mcg/kg', 'mcg', 'comprimido(s)', 'cápsula(s)'
].map(u => ({ value: u, label: u }))

const FREQ_OPTIONS = [
  { value: 'q1h', label: 'q1h (a cada 1h)' },
  { value: 'q2h', label: 'q2h (a cada 2h)' },
  { value: 'q4h', label: 'q4h (a cada 4h)' },
  { value: 'q6h', label: 'q6h (a cada 6h)' },
  { value: 'q8h', label: 'q8h (a cada 8h)' },
  { value: 'q12h', label: 'q12h (a cada 12h)' },
  { value: 'q24h', label: 'q24h (a cada 24h)' },
  { value: '1x ao dia', label: '1x ao dia' },
  { value: '2x ao dia', label: '2x ao dia' },
  { value: '3x ao dia', label: '3x ao dia' },
  { value: '4x ao dia', label: '4x ao dia' },
  { value: '6x ao dia', label: '6x ao dia' },
  { value: '8x ao dia', label: '8x ao dia' },
  { value: '12x ao dia', label: '12x ao dia' },
  { value: '24x ao dia', label: '24x ao dia' },
  { value: 'Uso contínuo', label: 'Uso contínuo' },
  { value: 'Dose única', label: 'Dose única' },
]

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const t = `${String(i).padStart(2, '0')}:00`
  return { value: t, label: t }
})

>>>>>>> Stashed changes
const ROUTE_OPTIONS = [
  { value: 'VO', label: 'Oral (VO)' },
  { value: 'SC', label: 'Subcutaneo (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenoso (IV)' },
<<<<<<< Updated upstream
  { value: 'Topico', label: 'Topica' },
  { value: 'Oftalmico', label: 'Oftalmica' },
  { value: 'Otologico', label: 'Otologica' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Retal', label: 'Retal' },
  { value: 'Inalatorio', label: 'Inalatoria' },
  { value: 'Transdermico', label: 'Transdermica' },
]

const FREQUENCY_OPTIONS = [
  { value: '1x ao dia', label: '1 vez ao dia (a cada 24 horas)', timesPerDay: 1 },
  { value: '2x ao dia', label: '2 vezes ao dia (a cada 12 horas)', timesPerDay: 2 },
  { value: '4x ao dia', label: '4 vezes ao dia (a cada 6 horas)', timesPerDay: 4 },
  { value: '6x ao dia', label: '6 vezes ao dia (a cada 4 horas)', timesPerDay: 6 },
  { value: '8x ao dia', label: '8 vezes ao dia (a cada 3 horas)', timesPerDay: 8 },
  { value: '12x ao dia', label: '12 vezes ao dia (a cada 2 horas)', timesPerDay: 12 },
  { value: '24x ao dia', label: '24 vezes ao dia (a cada 1 hora)', timesPerDay: 24 },
]

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
  const hh = String(hour).padStart(2, '0')
  return { value: `${hh}:00`, label: `${hh}:00` }
})

const DOSE_UNIT_OPTIONS = [
  'mg/kg',
  'mcg/kg',
  'g/kg',
  'UI/kg',
  'mL/kg',
  'mg',
  'mcg',
  'g',
  'UI',
  'mL',
  'mg/mL',
  'mcg/mL',
  '%',
  'comprimido(s)',
  'capsula(s)',
  'gota(s)',
  'ampola(s)',
  'sache(s)',
]

const PHARMACEUTICAL_FORM_OPTIONS = [
  'Comprimido',
  'Capsula',
  'Solucao oral',
  'Suspensao oral',
  'Injetavel',
  'Pomada',
  'Creme',
  'Gel',
  'Colirio',
  'Otologico',
  'Spray',
  'Shampoo',
  'Transdermico',
  'Inalatorio',
=======
  { value: 'Tópico', label: 'Tópica' },
  { value: 'Oftálmico', label: 'Oftálmica' },
  { value: 'Otológico', label: 'Otológica' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Retal', label: 'Retal' },
  { value: 'Inalatório', label: 'Inalatória' },
  { value: 'Transdérmico', label: 'Transdérmica' },
>>>>>>> Stashed changes
]

interface AddMedicationModal2Props {
  open: boolean
  onClose: () => void
  onAdd: (item: PrescriptionItem) => void
  clinicId: string
  patient: PatientInfo | null
  manualMode?: boolean
  editingItem?: PrescriptionItem | null
}

interface MedicationSearchResult {
  id: string
  name: string
  is_controlled: boolean
  pharmacy_origin?: string
  default_route?: string
}

interface PresentationRecord {
  id: string
  medication_id: string
  pharmaceutical_form: string | null
  concentration_text: string | null
  additional_component: string | null
  presentation_unit: string | null
  commercial_name: string | null
  is_default?: boolean
  value?: string | null
  value_unit?: string | null
  per_value?: string | null
  per_unit?: string | null
  avg_price_brl?: number | null
  package_quantity?: string | null
  package_unit?: string | null
  metadata?: Record<string, unknown> | null
}

<<<<<<< Updated upstream
function normalizeLooseText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function todayDateInput(): string {
  return new Date().toISOString().slice(0, 10)
}

=======
>>>>>>> Stashed changes
function extractPresentationField(pres: PresentationRecord, field: string): string | undefined {
  const direct = (pres as unknown as Record<string, unknown>)[field]
  if (direct != null && direct !== '') return String(direct)
  const fromMeta = pres.metadata?.[field]
  if (fromMeta != null && fromMeta !== '') return String(fromMeta)
  return undefined
}

<<<<<<< Updated upstream
function mapFrequencyToOption(rawFrequency: string): string {
  const value = normalizeLooseText(rawFrequency)
  if (!value) return '2x ao dia'

  const startsWithTimes = value.match(/^(\d+)x/)
  if (startsWithTimes) {
    const times = Number(startsWithTimes[1])
    const hit = FREQUENCY_OPTIONS.find((entry) => entry.timesPerDay === times)
    if (hit) return hit.value
  }

  if (value.includes('sid') || value.includes('q24') || value.includes('24/24') || value.includes('uma vez') || value.includes('1 vez')) return '1x ao dia'
  if (value.includes('bid') || value.includes('q12') || value.includes('12/12') || value.includes('2 vezes')) return '2x ao dia'
  if (value.includes('qid') || value.includes('q6') || value.includes('6/6') || value.includes('4 vezes')) return '4x ao dia'
  if (value.includes('q4') || value.includes('4/4') || value.includes('6 vezes')) return '6x ao dia'
  if (value.includes('q3') || value.includes('3/3') || value.includes('8 vezes')) return '8x ao dia'
  if (value.includes('q2') || value.includes('2/2') || value.includes('12 vezes')) return '12x ao dia'
  if (value.includes('q1') || value.includes('1/1') || value.includes('24 vezes')) return '24x ao dia'

  return '2x ao dia'
}

function parseDuration(rawDuration: string): { continuousUse: boolean; durationDays: string } {
  const value = normalizeLooseText(rawDuration)
  if (!value) return { continuousUse: false, durationDays: '' }
  if (value.includes('cont')) return { continuousUse: true, durationDays: '' }

  const match = value.match(/(\d+)/)
  if (match) return { continuousUse: false, durationDays: match[1] }

  return { continuousUse: false, durationDays: '' }
}

function buildDurationLabel(continuousUse: boolean, durationDays: string): string {
  if (continuousUse) return 'uso continuo'
  if (durationDays.trim()) return `${durationDays.trim()} dias`
  return ''
}

function parseStartDateTime(rawValue?: string): { date: string; hour: string } {
  const raw = String(rawValue || '').trim()
  if (!raw) return { date: todayDateInput(), hour: '08:00' }

  const isoLike = raw.match(/^(\d{4}-\d{2}-\d{2})(?:[T\s](\d{2}:\d{2}))?/)
  if (isoLike) {
    return {
      date: isoLike[1],
      hour: isoLike[2] || '08:00',
    }
  }

  const brLike = raw.match(/(\d{2})\/(\d{2})\/(\d{4})(?:.*?(\d{2}:\d{2}))?/)
  if (brLike) {
    return {
      date: `${brLike[3]}-${brLike[2]}-${brLike[1]}`,
      hour: brLike[4] || '08:00',
    }
  }

  return { date: todayDateInput(), hour: '08:00' }
}

function toIsoStartDate(date: string, hour: string): string {
  const safeDate = date || todayDateInput()
  const safeHour = /^\d{2}:\d{2}$/.test(hour) ? hour : '08:00'
  return `${safeDate}T${safeHour}:00`
}

function parseDoseParts(rawDose?: string): { value: string; unit: string } {
  const raw = String(rawDose || '').trim()
  if (!raw) return { value: '', unit: 'mg/kg' }

  const match = raw.match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/)
  if (!match) return { value: raw, unit: 'mg/kg' }

  const value = match[1]
  const unitRaw = String(match[2] || '').trim()
  const unit = DOSE_UNIT_OPTIONS.find((entry) => normalizeLooseText(entry) === normalizeLooseText(unitRaw)) || 'mg/kg'

  return { value, unit }
}

function composeDose(value: string, unit: string): string {
  const v = String(value || '').trim()
  if (!v) return ''
  return `${v} ${unit}`.trim()
}

export function AddMedicationModal2({
  open,
  onClose,
  onAdd,
  clinicId,
  patient,
  manualMode = false,
  editingItem,
}: AddMedicationModal2Props) {
=======
// ===================== COMPONENT =====================
export function AddMedicationModal2({ open, onClose, onAdd, clinicId, patient, manualMode = false, editingItem }: AddMedicationModal2Props) {
>>>>>>> Stashed changes
  const [searchQuery, setSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<MedicationSearchResult | null>(null)
  const [presentations, setPresentations] = useState<PresentationRecord[]>([])
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null)
  const [rxTheme, setRxTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('receituario-vet:theme:v1') === 'light' ? 'light' : 'dark'
<<<<<<< Updated upstream
    } catch {
      return 'dark'
    }
=======
    } catch { return 'dark' }
>>>>>>> Stashed changes
  })
  const isDark = rxTheme === 'dark'
  const [recommendedDoses, setRecommendedDoses] = useState<RecommendedDose[]>([])

<<<<<<< Updated upstream
  const [doseValue, setDoseValue] = useState('')
  const [doseUnit, setDoseUnit] = useState('mg/kg')
  const [pharmaceuticalForm, setPharmaceuticalForm] = useState('Comprimido')
  const [frequency, setFrequency] = useState('2x ao dia')
=======
  const [doseValueInput, setDoseValueInput] = useState('')
  const [doseUnitInput, setDoseUnitInput] = useState('mg/kg')
  const [frequency, setFrequency] = useState('')
>>>>>>> Stashed changes
  const [route, setRoute] = useState('VO')
  const [durationDays, setDurationDays] = useState('')
  const [continuousUse, setContinuousUse] = useState(false)
  const [startDate, setStartDate] = useState(todayDateInput())
  const [startHour, setStartHour] = useState('08:00')
  const [instructions, setInstructions] = useState('')
  const [cautions, setCautions] = useState('')

  const [manualName, setManualName] = useState('')
  const [manualConcentration, setManualConcentration] = useState('')
  const [manualCommercialName, setManualCommercialName] = useState('')
<<<<<<< Updated upstream

  const resetForm = useCallback(() => {
    setSelectedMedication(null)
    setPresentations([])
    setSelectedPresentationId(null)
    setRecommendedDoses([])
    setSearchQuery('')
    setDoseValue('')
    setDoseUnit('mg/kg')
    setPharmaceuticalForm('Comprimido')
    setFrequency('2x ao dia')
    setRoute('VO')
    setDurationDays('')
    setContinuousUse(false)
    setStartDate(todayDateInput())
    setStartHour('08:00')
    setInstructions('')
    setCautions('')
    setManualName('')
    setManualConcentration('')
    setManualCommercialName('')
  }, [])

  const loadMedicationDetails = useCallback(
    async (
      med: MedicationSearchResult,
      applySuggestedDose: boolean,
      preferredPresentationId?: string | null,
      preferredForm?: string
    ) => {
      if (!clinicId) return
=======
  const [manualIsControlled, setManualIsControlled] = useState(false)

  const [isContinuous, setIsContinuous] = useState(false)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [startTime, setStartTime] = useState('')

  const isoStartDate = useMemo(() => {
    if (!startDate) return ''
    const [day, month] = startDate.split('/')
    if (!day || !month) return ''
    const year = new Date().getFullYear()
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }, [startDate])
>>>>>>> Stashed changes

      const presentationsData = await getMedicationPresentations(clinicId, med.id) as unknown as PresentationRecord[]
      setPresentations(presentationsData)

<<<<<<< Updated upstream
      const preferred = preferredPresentationId
        ? presentationsData.find((entry) => entry.id === preferredPresentationId)
        : null
      const defaultPresentation = preferred || presentationsData.find((entry) => entry.is_default) || presentationsData[0] || null
      setSelectedPresentationId(defaultPresentation?.id || null)
      setPharmaceuticalForm(preferredForm || defaultPresentation?.pharmaceutical_form || 'Comprimido')

      const dosesData = await getMedicationRecommendedDoses(clinicId, med.id)
      setRecommendedDoses(dosesData)

      if (!applySuggestedDose) return

      const patientSpecies = (patient?.species || '').toLowerCase().includes('felin') ? 'gato' : 'cao'
      const bestDose =
        dosesData.find((entry) => normalizeLooseText(entry.species || '') === patientSpecies) ||
        dosesData.find((entry) => normalizeLooseText(entry.species || '') === 'ambos')

      if (!bestDose) return

      setDoseValue(String(bestDose.dose_value ?? ''))
      setDoseUnit(bestDose.dose_unit || 'mg/kg')
      setRoute(bestDose.route || med.default_route || 'VO')
      setFrequency(mapFrequencyToOption(bestDose.frequency || ''))
    },
    [clinicId, patient?.species]
  )

=======
>>>>>>> Stashed changes
  useEffect(() => {
    if (!open) return

    const onEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEscape)

<<<<<<< Updated upstream
=======
    // Sync theme
>>>>>>> Stashed changes
    const theme = localStorage.getItem('receituario-vet:theme:v1') === 'light' ? 'light' : 'dark'
    setRxTheme(theme)

    return () => window.removeEventListener('keydown', onEscape)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !clinicId || manualMode) {
      setMedications([])
      return
    }
    const q = searchQuery.trim()
    const timer = setTimeout(async () => {
      try {
        setIsSearching(true)
        const results = await searchMedications(clinicId, q || '', q ? 50 : 20)
        setMedications(results)
      } catch (err) {
        console.error('[AddMedicationModal2] Search failed', err)
        setMedications([])
      } finally {
        setIsSearching(false)
      }
<<<<<<< Updated upstream
    }, q ? 350 : 0)

=======
    }, q ? 400 : 0)
>>>>>>> Stashed changes
    return () => clearTimeout(timer)
  }, [searchQuery, clinicId, open, manualMode])

  useEffect(() => {
<<<<<<< Updated upstream
    if (open) return
    resetForm()
  }, [open, resetForm])

  useEffect(() => {
    if (!open) return

    if (!editingItem) {
      if (!manualMode) {
        setFrequency('2x ao dia')
        setStartDate(todayDateInput())
        setStartHour('08:00')
      }
      return
    }

    const parsedDose = parseDoseParts(editingItem.dose)
    setDoseValue(parsedDose.value)
    setDoseUnit(parsedDose.unit)
    setPharmaceuticalForm(editingItem.pharmaceutical_form || 'Comprimido')
    setFrequency(mapFrequencyToOption(editingItem.frequency || ''))
    setRoute(editingItem.route || 'VO')
    const parsedDuration = parseDuration(editingItem.duration || '')
    setContinuousUse(parsedDuration.continuousUse)
    setDurationDays(parsedDuration.durationDays)
    const parsedStart = parseStartDateTime(editingItem.start_date)
    setStartDate(parsedStart.date)
    setStartHour(parsedStart.hour)
    setInstructions(editingItem.instructions || '')
    setCautions((editingItem.cautions || []).join('\n'))

    if (manualMode) {
      setManualName(editingItem.name || '')
      setManualConcentration(editingItem.concentration_text || '')
      setManualCommercialName(editingItem.commercial_name || '')
      return
    }

    const medicationId = String(editingItem.medication_id || '').trim()
    if (!medicationId) {
      setSelectedMedication(null)
      setPresentations([])
      setSelectedPresentationId(null)
      setRecommendedDoses([])
      return
    }

    const medicationStub: MedicationSearchResult = {
      id: medicationId,
      name: editingItem.name || 'Medicamento',
      is_controlled: !!editingItem.is_controlled,
      default_route: editingItem.route || 'VO',
      pharmacy_origin: 'veterinaria',
    }
    setSelectedMedication(medicationStub)

    loadMedicationDetails(medicationStub, false, editingItem.presentation_id, editingItem.pharmaceutical_form).catch((err) => {
      console.error('[AddMedicationModal2] Failed to preload editing medication', err)
    })
  }, [open, editingItem, manualMode, loadMedicationDetails])

  const handleMedicationSelect = useCallback(
    async (med: MedicationSearchResult) => {
      if (!clinicId) return
      setSelectedMedication(med)

      try {
        await loadMedicationDetails(med, true, null)
        setSearchQuery('')
      } catch (err) {
        console.error('[AddMedicationModal2] Failed to load medication details', err)
      }
    },
    [clinicId, loadMedicationDetails]
  )

  const handleAdd = useCallback(() => {
    if (!continuousUse && !durationDays.trim()) return

    const duration = buildDurationLabel(continuousUse, durationDays)
    const start_date = toIsoStartDate(startDate, startHour)
    const dose = composeDose(doseValue, doseUnit)
=======
    if (open) {
      if (editingItem) {
        setDoseValueInput(editingItem.doseValue || '')
        setDoseUnitInput(editingItem.doseUnit || 'mg/kg')
        setFrequency(editingItem.frequency || '')
        setRoute(editingItem.route || 'VO')
        const dur = editingItem.duration || ''
        if (dur.toLowerCase() === 'uso contínuo') {
          setIsContinuous(true)
          setDuration('')
        } else {
          setIsContinuous(false)
          setDuration(dur)
        }
        setInstructions(editingItem.instructions || '')
        setCautions((editingItem.cautions || []).join('\n'))
        setManualQuantity(editingItem.manualQuantity || '')

        if (editingItem.start_date) {
          const parts = editingItem.start_date.split(' às ')
          setStartDate(parts[0] || '')
          setStartTime(parts[1] || '')
        }

        if (manualMode) {
          setManualName(editingItem.name || '')
          const [conc, concUnit] = (editingItem.concentration_text || '').split(' ')
          setManualConcentration(conc || '')
          setManualConcentrationUnit(concUnit || 'mg')
          setManualForm(editingItem.pharmaceutical_form || 'Comprimido')
          setManualCommercialName(editingItem.commercial_name || '')
          setManualIsControlled(editingItem.is_controlled || false)
        } else if (editingItem.medication_id) {
          setSelectedMedication({
            id: editingItem.medication_id,
            name: editingItem.name,
            is_controlled: editingItem.is_controlled || false
          })
          getMedicationPresentations(clinicId, editingItem.medication_id).then((p: any) => {
            setPresentations(p)
            setSelectedPresentationId(editingItem.presentation_id || null)
          }).catch(console.error)
        }
      } else {
        setSelectedMedication(null)
        setPresentations([])
        setSelectedPresentationId(null)
        setRecommendedDoses([])
        setDoseValueInput('')
        setDoseUnitInput('mg/kg')
        setFrequency('')
        setRoute('VO')
        setDuration('')
        setInstructions('')
        setCautions('')
        setManualQuantity('')
        setManualName('')
        setManualConcentration('')
        setManualIsControlled(false)
        setIsContinuous(false)
        setSearchQuery('')
      }
    }
  }, [open, editingItem, manualMode, clinicId])

  const handleMedicationSelect = useCallback(async (med: MedicationSearchResult) => {
    if (!clinicId) return
    setSelectedMedication(med)
    try {
      const presentationsData = await getMedicationPresentations(clinicId, med.id) as PresentationRecord[]
      setPresentations(presentationsData)
      const defaultPresentation = presentationsData.find((p) => p.is_default) || presentationsData[0]
      setSelectedPresentationId(defaultPresentation?.id || null)
      const dosesData = await getMedicationRecommendedDoses(clinicId, med.id)
      setRecommendedDoses(dosesData)
      if (patient) {
        const species = (patient.species || '').toLowerCase().includes('felin') ? 'gato' : 'cão'
        const best = dosesData.find((d) => d.species === species) || dosesData.find((d) => d.species === 'ambos')
        if (best) {
          setDoseValueInput(String(best.dose_value || ''))
          setDoseUnitInput(best.dose_unit || 'mg/kg')
          setRoute(best.route || 'VO')
          setFrequency(best.frequency || '')
        }
      }
      setSearchQuery('')
    } catch (err) {
      console.error(err)
    }
  }, [clinicId, patient])

  const calculatedQty = useMemo(() => {
    if (!open || !doseValueInput) return null
    const weight = patient?.weight_kg ? String(patient.weight_kg) : ''
    const mockState = { patient: { weightKg: weight } } as any
    let concText = ''
    let form = ''
    if (manualMode) {
      concText = manualConcentration ? `${manualConcentration} ${manualConcentrationUnit}` : ''
      form = manualForm
    } else {
      const pres = presentations.find((p) => p.id === selectedPresentationId)
      concText = pres?.concentration_text || ''
      form = pres?.pharmaceutical_form || ''
    }
    const mockItem = { doseValue: doseValueInput, doseUnit: doseUnitInput, concentration: concText, presentation: form } as any
    try {
      return calculateMedicationQuantity(mockItem, mockState)
    } catch {
      return null
    }
  }, [open, patient, doseValueInput, doseUnitInput, manualMode, manualConcentration, manualConcentrationUnit, manualForm, presentations, selectedPresentationId])

  const calcFailed = useMemo(() => {
    if (!doseValueInput.trim()) return true
    if (!calculatedQty) return true
    return calculatedQty.perDose === null || !calculatedQty.unit
  }, [doseValueInput, calculatedQty])

  const handleAdd = useCallback(() => {
    const effectiveDuration = isContinuous ? 'uso contínuo' : duration
    const startDateStr = startDate ? `${startDate}${startTime ? ` às ${startTime}` : ' às __:__'}` : undefined
>>>>>>> Stashed changes

    if (manualMode) {
      if (!manualName.trim()) return
      if (calcFailed && !manualQuantity.trim()) return // Block if no override
      const newItem: PrescriptionItem = {
        ...editingItem,
        id: editingItem?.id || `item-${Date.now()}`,
        type: 'medication',
        isManual: true,
        is_controlled: editingItem?.is_controlled || false,
        name: manualName.trim(),
<<<<<<< Updated upstream
        pharmaceutical_form: pharmaceuticalForm || undefined,
        concentration_text: manualConcentration || undefined,
        commercial_name: manualCommercialName.trim() || undefined,
        dose,
=======
        pharmaceutical_form: manualForm,
        concentration_text: manualConcentration ? `${manualConcentration} ${manualConcentrationUnit}` : undefined,
        commercial_name: manualCommercialName.trim() || undefined,
        doseValue: doseValueInput,
        doseUnit: doseUnitInput,
>>>>>>> Stashed changes
        frequency,
        route,
        duration,
        start_date,
        instructions,
<<<<<<< Updated upstream
        cautions: cautions.split('\n').map((s) => s.trim()).filter(Boolean),
=======
        cautions: cautions.split('\n').filter(Boolean),
        is_controlled: manualIsControlled,
        start_date: startDateStr,
        manualQuantity: manualQuantity.trim() || undefined,
>>>>>>> Stashed changes
      }
      onAdd(newItem)
      onClose()
      return
    }

    if (!selectedMedication) return
    if (calcFailed && !manualQuantity.trim()) return // Block if no override

    const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)
    const newItem: PrescriptionItem = {
      ...editingItem,
      id: editingItem?.id || `item-${Date.now()}`,
      type: 'medication',
<<<<<<< Updated upstream
      isManual: false,
      is_controlled: !!selectedMedication.is_controlled,
      medication_id: selectedMedication.id,
      presentation_id: selectedPresentationId || undefined,
      name: selectedMedication.name,
      pharmaceutical_form: pharmaceuticalForm || selectedPresentation?.pharmaceutical_form || undefined,
      concentration_text: selectedPresentation?.concentration_text || undefined,
      commercial_name: selectedPresentation?.commercial_name || undefined,
      additional_component: selectedPresentation?.additional_component || undefined,
      value: selectedPresentation?.value || undefined,
      value_unit: selectedPresentation?.value_unit || undefined,
      per_value: selectedPresentation?.per_value || undefined,
      per_unit: selectedPresentation?.per_unit || undefined,
      avg_price_brl: selectedPresentation?.avg_price_brl ?? undefined,
      package_quantity: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_quantity') : undefined,
      package_unit: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_unit') : undefined,
      dose,
=======
      medication_id: selectedMedication.id,
      presentation_id: selectedPresentationId || undefined,
      name: selectedMedication.name,
      pharmaceutical_form: selectedPresentation?.pharmaceutical_form || undefined,
      concentration_text: selectedPresentation?.concentration_text || undefined,
      commercial_name: selectedPresentation?.commercial_name || undefined,
      doseValue: doseValueInput,
      doseUnit: doseUnitInput,
>>>>>>> Stashed changes
      frequency,
      route,
      duration,
      start_date,
      instructions,
<<<<<<< Updated upstream
      cautions: cautions.split('\n').map((s) => s.trim()).filter(Boolean),
    }
    onAdd(newItem)
    onClose()
  }, [
    continuousUse,
    durationDays,
    startDate,
    startHour,
    doseValue,
    doseUnit,
    manualMode,
    manualName,
    manualConcentration,
    manualCommercialName,
    pharmaceuticalForm,
    editingItem,
    frequency,
    route,
    instructions,
    cautions,
    onAdd,
    onClose,
    selectedMedication,
    presentations,
    selectedPresentationId,
  ])
=======
      cautions: cautions.split('\n').filter(Boolean),
      is_controlled: selectedMedication.is_controlled,
      start_date: startDateStr,
      manualQuantity: manualQuantity.trim() || undefined,
    }
    onAdd(newItem)
    onClose()
  }, [manualMode, manualName, calcFailed, manualQuantity, isContinuous, duration, startDate, startTime, editingItem, manualForm, manualConcentration, manualConcentrationUnit, manualCommercialName, doseValueInput, doseUnitInput, frequency, route, instructions, cautions, manualIsControlled, selectedMedication, presentations, selectedPresentationId, onAdd, onClose])
>>>>>>> Stashed changes

  const selectedPresentation = useMemo(
    () => presentations.find((p) => p.id === selectedPresentationId),
    [presentations, selectedPresentationId]
  )

  const canAdd =
    (manualMode ? !!manualName.trim() : !!selectedMedication) &&
    (continuousUse || !!durationDays.trim())

  if (!open) return null
<<<<<<< Updated upstream

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)]">
        <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">{manualMode ? 'Medicamento Manual' : 'Medicamento Catalogo'}</h2>
          </div>
          <div className="flex items-center gap-2">
            <RxvButton variant="secondary" onClick={onClose}>Cancelar</RxvButton>
            <RxvButton variant="primary" onClick={handleAdd} disabled={!canAdd}>{editingItem ? 'Salvar' : 'Adicionar'}</RxvButton>
=======
  const canAdd = manualMode ? (!!manualName.trim() && (!calcFailed || !!manualQuantity.trim())) : (!!selectedMedication && (!calcFailed || !!manualQuantity.trim()))

  return createPortal(
    <div className={`fixed inset-0 z-[90] flex items-center justify-center backdrop-blur-sm px-4 py-8 ${isDark ? 'bg-black/80' : 'bg-slate-500/30'}`}>
      <div className={`max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border shadow-2xl ${isDark
        ? 'border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)]'
        : 'border-slate-200 bg-white text-slate-800 shadow-xl'
        }`}>
        <div className={`flex items-center justify-between border-b px-6 py-4 ${isDark ? 'border-slate-800 bg-black/60' : 'border-slate-100 bg-slate-50/50'
          }`}>
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{manualMode ? 'Medicamento Manual' : 'Medicamento Catálogo'}</h2>
          </div>
          <div className="flex items-center gap-2">
            <RxvButton variant="secondary" onClick={onClose}>Cancelar</RxvButton>
            <RxvButton variant="primary" onClick={handleAdd} disabled={!canAdd}>Adicionar</RxvButton>
>>>>>>> Stashed changes
          </div>
        </div>

        <div className="max-h-[calc(92vh-80px)] overflow-y-auto p-6 space-y-6">
          {!manualMode ? (
            <div className="space-y-4">
              <RxvField label="Buscar medicamento">
<<<<<<< Updated upstream
                <RxvInput
                  placeholder="Digite para buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </RxvField>
              {medications.length > 0 && (
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {medications.map((medication) => (
                    <button
                      key={medication.id}
                      className={`w-full rounded-xl border p-3 text-left transition-all ${isDark
                        ? 'bg-black/40 border-slate-800 hover:border-[#39ff14]'
                        : 'bg-white border-slate-200 hover:border-[#39ff14] hover:bg-slate-50'
                        }`}
                      onClick={() => handleMedicationSelect(medication)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold">{medication.name}</p>
                        {medication.is_controlled ? (
                          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
                            Controlado
                          </span>
                        ) : null}
                      </div>
=======
                <RxvInput placeholder="Digite para buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </RxvField>
              {medications.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {medications.map(m => (
                    <button key={m.id} className={`w-full p-3 border rounded-xl text-left transition-all ${isDark
                      ? 'bg-black/40 border-slate-800 hover:border-[#39ff14]'
                      : 'bg-white border-slate-200 hover:border-[#39ff14] hover:bg-slate-50'
                      }`} onClick={() => handleMedicationSelect(m)}>
                      <p className="font-bold">{m.name}</p>
>>>>>>> Stashed changes
                    </button>
                  ))}
                </div>
              )}
<<<<<<< Updated upstream

              {selectedMedication && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 px-4 py-3">
                    <div>
                      <p className="text-base font-bold text-white">{selectedMedication.name}</p>
                      <p className="text-xs text-slate-500">{selectedMedication.pharmacy_origin || 'Veterinaria'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedMedication.is_controlled ? (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
                          Controlado
                        </span>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setSelectedMedication(null)}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>
                  </div>

                  {presentations.length > 0 && (
                    <div className="space-y-2">
                      <RxvField label="Apresentacao">
                        <RxvSelect
                          value={selectedPresentationId || ''}
                          onChange={(e) => {
                            const nextId = e.target.value
                            setSelectedPresentationId(nextId)
                            const next = presentations.find((presentation) => presentation.id === nextId)
                            if (next?.pharmaceutical_form) setPharmaceuticalForm(next.pharmaceutical_form)
                          }}
                          options={presentations.map((presentation) => ({
                            value: presentation.id,
                            label: [
                              presentation.commercial_name || presentation.pharmaceutical_form || 'Sem nome',
                              presentation.concentration_text,
                              presentation.is_default ? '(Padrao)' : undefined,
                            ].filter(Boolean).join(' - '),
                          }))}
                        />
                      </RxvField>

                      {selectedPresentation && (
                        <div className="space-y-1 rounded-xl border border-slate-800 bg-black/30 px-4 py-3 text-xs text-slate-400">
                          {selectedPresentation.concentration_text && (
                            <p>Concentracao: <span className="text-white">{selectedPresentation.concentration_text}</span></p>
                          )}
                          {selectedPresentation.pharmaceutical_form && (
                            <p>Forma: <span className="text-white">{selectedPresentation.pharmaceutical_form}</span></p>
                          )}
                          {selectedPresentation.commercial_name && (
                            <p>Nome comercial: <span className="text-amber-300">{selectedPresentation.commercial_name}</span></p>
                          )}
                          {selectedPresentation.package_quantity && selectedPresentation.package_unit && (
                            <p>Embalagem: <span className="text-white">{selectedPresentation.package_quantity} {selectedPresentation.package_unit}</span></p>
                          )}
                          {selectedPresentation.avg_price_brl && selectedPresentation.avg_price_brl > 0 && (
                            <p>Preco medio: <span className="text-emerald-400">R$ {selectedPresentation.avg_price_brl.toFixed(2)}</span></p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {recommendedDoses.length > 0 && (
                    <div className="space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                        Doses indicadas no catalogo
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {recommendedDoses.map((rd, idx) => (
                          <button
                            key={rd.id || idx}
                            type="button"
                            className="flex w-full items-center justify-between rounded-lg border border-transparent bg-black/40 px-3 py-2 text-left transition-all hover:border-amber-500/50"
                            onClick={() => {
                              setDoseValue(String(rd.dose_value ?? ''))
                              setDoseUnit(rd.dose_unit || 'mg/kg')
                              setRoute(rd.route || 'VO')
                              setFrequency(mapFrequencyToOption(rd.frequency || ''))
                            }}
                          >
                            <div>
                              <p className="text-xs font-bold text-amber-200">
                                {rd.species} • {rd.route || 'VO'}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {rd.dose_value} {rd.dose_unit}
                                {rd.frequency && ` • ${rd.frequency}`}
                              </p>
                            </div>
                            <span className="text-[10px] font-bold text-amber-500">APLICAR</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
=======
              {selectedMedication && (
                <div className="space-y-4">
                  <RxvField label="Apresentação">
                    <RxvSelect
                      value={selectedPresentationId || ''}
                      onChange={(e) => setSelectedPresentationId(e.target.value)}
                      options={presentations.map(p => ({ value: p.id, label: `${p.commercial_name || p.pharmaceutical_form} - ${p.concentration_text}` }))}
                    />
                  </RxvField>
>>>>>>> Stashed changes
                </div>
              )}
            </div>
          ) : (
<<<<<<< Updated upstream
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RxvField label="Nome do medicamento *">
                  <RxvInput
                    placeholder="Ex: Amoxicilina"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Concentracao">
                  <RxvInput
                    placeholder="Ex: 500 mg"
                    value={manualConcentration}
                    onChange={(e) => setManualConcentration(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Nome comercial">
                  <RxvInput
                    placeholder="Ex: Amoxivet"
                    value={manualCommercialName}
                    onChange={(e) => setManualCommercialName(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Via de administracao">
                  <RxvSelect
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    options={ROUTE_OPTIONS}
                  />
                </RxvField>
              </div>
            </div>
          )}

          {(selectedMedication || manualMode) && (
            <div className="space-y-4">
              <div className="h-px bg-slate-800/60" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <RxvField label="Dose">
                  <div className="grid grid-cols-[1fr_160px] gap-2">
                    <RxvInput
                      type="number"
                      step="0.01"
                      placeholder="Ex: 10"
                      value={doseValue}
                      onChange={(e) => setDoseValue(e.target.value)}
                    />
                    <RxvSelect
                      value={doseUnit}
                      onChange={(e) => setDoseUnit(e.target.value)}
                      options={DOSE_UNIT_OPTIONS}
                    />
                  </div>
                </RxvField>

                <RxvField label="Forma farmaceutica">
                  <RxvSelect
                    value={pharmaceuticalForm}
                    onChange={(e) => setPharmaceuticalForm(e.target.value)}
                    options={PHARMACEUTICAL_FORM_OPTIONS}
                  />
                </RxvField>

                {!manualMode && (
                  <RxvField label="Via de administracao">
                    <RxvSelect
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      options={ROUTE_OPTIONS}
                    />
                  </RxvField>
                )}

                <RxvField label="Frequencia">
                  <RxvSelect
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    options={FREQUENCY_OPTIONS.map((entry) => ({ value: entry.value, label: entry.label }))}
                  />
                </RxvField>

                <RxvField label="Inicio (data)">
                  <RxvInput
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Inicio (hora)">
                  <RxvSelect
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    options={HOUR_OPTIONS}
                  />
                </RxvField>

                <RxvField label="Duracao (dias)">
                  <RxvInput
                    type="number"
                    min="1"
                    placeholder="Ex: 7"
                    value={durationDays}
                    disabled={continuousUse}
                    onChange={(e) => setDurationDays(e.target.value)}
                  />
                </RxvField>
              </div>

              <div className="rounded-xl border border-slate-800/70 bg-black/20 px-4 py-3">
                <RxvToggle checked={continuousUse} onChange={setContinuousUse} label="Uso continuo" />
              </div>

              <RxvField label="Instrucoes de uso">
                <RxvTextarea
                  placeholder="Ex: Dar com alimento, evitar sol..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                />
              </RxvField>

              <RxvField label="Cautelas / Observacoes">
                <RxvTextarea
                  placeholder="Uma cautela por linha..."
                  value={cautions}
                  onChange={(e) => setCautions(e.target.value)}
                  rows={2}
                />
=======
            <div className="grid grid-cols-2 gap-4">
              <RxvField label="Nome"><RxvInput value={manualName} onChange={(e) => setManualName(e.target.value)} /></RxvField>
              <RxvField label="Comercial"><RxvInput value={manualCommercialName} onChange={(e) => setManualCommercialName(e.target.value)} /></RxvField>
              <RxvField label="Forma"><RxvSelect value={manualForm} onChange={(e) => setManualForm(e.target.value)} options={FORM_OPTIONS} /></RxvField>
              <RxvField label="Concentração"><RxvInput value={manualConcentration} onChange={(e) => setManualConcentration(e.target.value)} /></RxvField>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <RxvField label="Dose">
              <div className="flex gap-1">
                <RxvInput value={doseValueInput} onChange={(e) => setDoseValueInput(e.target.value)} />
                <RxvSelect value={doseUnitInput} onChange={(e) => setDoseUnitInput(e.target.value)} options={DOSE_UNIT_OPTIONS} />
              </div>
            </RxvField>

            {calcFailed ? (
              <RxvField label="Quantidade por vez (Override Manual)">
                <div className="space-y-2">
                  <div className="text-[10px] text-red-500 font-bold">⚠️ Cálculo indisponível. Informe manualmente.</div>
                  <RxvInput placeholder="Ex: 1/2 comp, 2 mL" value={manualQuantity} onChange={(e) => setManualQuantity(e.target.value)} />
                </div>
              </RxvField>
            ) : (
              <RxvField label="Quantidade calculada">
                <div className="h-10 flex items-center px-3 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-lg text-[#39ff14] font-bold">
                  {formatPerDoseQuantity(calculatedQty?.perDose || 0, calculatedQty?.unit || '')}
                </div>
>>>>>>> Stashed changes
              </RxvField>
            )}

            <RxvField label="Via"><RxvSelect value={route} onChange={(e) => setRoute(e.target.value)} options={ROUTE_OPTIONS} /></RxvField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <RxvField label="Frequência"><RxvSelect value={frequency} onChange={(e) => setFrequency(e.target.value)} options={FREQ_OPTIONS} /></RxvField>
            <RxvField label="Duração">
              <div className="flex flex-col gap-2">
                {!isContinuous && <RxvInput value={duration} onChange={(e) => setDuration(e.target.value)} />}
                <label className="flex items-center gap-2 text-xs text-[#39ff14] font-bold">
                  <input type="checkbox" checked={isContinuous} onChange={(e) => setIsContinuous(e.target.checked)} /> Uso Contínuo
                </label>
              </div>
            </RxvField>
          </div>

          <RxvField label="Instruções"><RxvTextarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={3} /></RxvField>
          <RxvField label="Cautelas"><RxvTextarea value={cautions} onChange={(e) => setCautions(e.target.value)} rows={2} /></RxvField>
        </div>
      </div>
    </div>
  )
}
