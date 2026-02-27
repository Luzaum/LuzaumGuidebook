// ✅ AddMedicationModal2 — Modal para adicionar medicamentos (100% Catálogo 3.0)
// Versão completa com todos os campos de apresentação do schema Supabase

import React, { useState, useEffect, useCallback } from 'react'
import {
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvButton,
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
// ===================== ROUTE OPTIONS =====================
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
  { value: 'SC', label: 'Subcutâneo (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenoso (IV)' },
  { value: 'Tópico', label: 'Tópica' },
  { value: 'Oftálmico', label: 'Oftálmica' },
  { value: 'Otológico', label: 'Otológica' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Retal', label: 'Retal' },
  { value: 'Inalatório', label: 'Inalatória' },
  { value: 'Transdérmico', label: 'Transdérmica' },
]

// ===================== TYPES =====================
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

function extractPresentationField(pres: PresentationRecord, field: string): string | undefined {
  const direct = (pres as Record<string, unknown>)[field]
  if (direct != null && direct !== '') return String(direct)
  const fromMeta = pres.metadata?.[field]
  if (fromMeta != null && fromMeta !== '') return String(fromMeta)
  return undefined
}

// ===================== COMPONENT =====================
export function AddMedicationModal2({ open, onClose, onAdd, clinicId, patient, manualMode = false, editingItem }: AddMedicationModal2Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<MedicationSearchResult | null>(null)
  const [presentations, setPresentations] = useState<PresentationRecord[]>([])
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null)
  const [rxTheme, setRxTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('receituario-vet:theme:v1') === 'light' ? 'light' : 'dark'
    } catch { return 'dark' }
  })
  const isDark = rxTheme === 'dark'
  const [recommendedDoses, setRecommendedDoses] = useState<RecommendedDose[]>([])

<<<<<<< Updated upstream
  // Form state
  const [dose, setDose] = useState('')
=======
  const [doseValueInput, setDoseValueInput] = useState('')
  const [doseUnitInput, setDoseUnitInput] = useState('mg/kg')
>>>>>>> Stashed changes
  const [frequency, setFrequency] = useState('')
  const [route, setRoute] = useState('VO')
  const [duration, setDuration] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cautions, setCautions] = useState('')

  const [manualName, setManualName] = useState('')
  const [manualConcentration, setManualConcentration] = useState('')
  const [manualForm, setManualForm] = useState('')
  const [manualCommercialName, setManualCommercialName] = useState('')
<<<<<<< Updated upstream
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iso = e.target.value
    if (!iso) {
      setStartDate('')
      return
    }
    const [year, month, day] = iso.split('-')
    setStartDate(`${day.padStart(2, '0')}/${month.padStart(2, '0')}`)
  }
>>>>>>> Stashed changes

  useEffect(() => {
    if (!open) return
    const onEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEscape)

    // Sync theme
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
    }, q ? 400 : 0)
    return () => clearTimeout(timer)
  }, [searchQuery, clinicId, open, manualMode])

  useEffect(() => {
<<<<<<< Updated upstream
    if (!open) {
      setSelectedMedication(null)
      setPresentations([])
      setSelectedPresentationId(null)
      setRecommendedDoses([])
      setSearchQuery('')
      setDose('')
      setFrequency('')
      setRoute('VO')
      setDuration('')
      setInstructions('')
      setCautions('')
      setManualName('')
      setManualConcentration('')
      setManualForm('')
      setManualCommercialName('')
    }
  }, [open])

  // ==================== HANDLERS ====================

  const handleMedicationSelect = useCallback(
    async (med: MedicationSearchResult) => {
      if (!clinicId) return

      setSelectedMedication(med)

      try {
        const presentationsData = await getMedicationPresentations(clinicId, med.id) as PresentationRecord[]
        setPresentations(presentationsData)

        const defaultPresentation = presentationsData.find((p) => p.is_default) || presentationsData[0]
        setSelectedPresentationId(defaultPresentation?.id || null)

        const dosesData = await getMedicationRecommendedDoses(clinicId, med.id)
        setRecommendedDoses(dosesData)

        // Sugerir dose para a espécie do paciente
        if (patient) {
          const patientSpecies = (patient.species || '').toLowerCase().includes('felin') ? 'gato' : 'cão'
          const bestDose =
            dosesData.find((d) => d.species === patientSpecies) ||
            dosesData.find((d) => d.species === 'ambos')

          if (bestDose) {
            setDose(`${bestDose.dose_value} ${bestDose.dose_unit}`)
            setRoute(bestDose.route || 'VO')
            setFrequency(bestDose.frequency || '')
          }
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
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
        name: manualName.trim(),
<<<<<<< Updated upstream
        pharmaceutical_form: manualForm || undefined,
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
        instructions,
<<<<<<< Updated upstream
        cautions: cautions.split('\n').map(s => s.trim()).filter(Boolean),
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
      medication_id: selectedMedication.id,
      presentation_id: selectedPresentationId || undefined,
      name: selectedMedication.name,
      pharmaceutical_form: selectedPresentation?.pharmaceutical_form || undefined,
      concentration_text: selectedPresentation?.concentration_text || undefined,
      commercial_name: selectedPresentation?.commercial_name || undefined,
<<<<<<< Updated upstream
      additional_component: selectedPresentation?.additional_component || undefined,
      value: selectedPresentation?.value || undefined,
      value_unit: selectedPresentation?.value_unit || undefined,
      per_value: selectedPresentation?.per_value || undefined,
      per_unit: selectedPresentation?.per_unit || undefined,
      avg_price_brl: selectedPresentation?.avg_price_brl ?? undefined,
      package_quantity: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_quantity') : undefined,
      package_unit: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_unit') : undefined,

      // Campos de dosagem
      dose,
=======
      doseValue: doseValueInput,
      doseUnit: doseUnitInput,
>>>>>>> Stashed changes
      frequency,
      route,
      duration,
      instructions,
<<<<<<< Updated upstream
      cautions: cautions.split('\n').map(s => s.trim()).filter(Boolean),
=======
      cautions: cautions.split('\n').filter(Boolean),
      is_controlled: selectedMedication.is_controlled,
      start_date: startDateStr,
      manualQuantity: manualQuantity.trim() || undefined,
>>>>>>> Stashed changes
    }
    onAdd(newItem)
    onClose()
<<<<<<< Updated upstream
  }, [
    manualMode,
    manualName,
    manualForm,
    manualConcentration,
    manualCommercialName,
    selectedMedication,
    presentations,
    selectedPresentationId,
    dose,
    frequency,
    route,
    duration,
    instructions,
    cautions,
    onAdd,
    onClose,
  ])
=======
  }, [manualMode, manualName, calcFailed, manualQuantity, isContinuous, duration, startDate, startTime, editingItem, manualForm, manualConcentration, manualConcentrationUnit, manualCommercialName, doseValueInput, doseUnitInput, frequency, route, instructions, cautions, manualIsControlled, selectedMedication, presentations, selectedPresentationId, onAdd, onClose])
>>>>>>> Stashed changes

  if (!open) return null
  const canAdd = manualMode ? (!!manualName.trim() && (!calcFailed || !!manualQuantity.trim())) : (!!selectedMedication && (!calcFailed || !!manualQuantity.trim()))

<<<<<<< Updated upstream
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-6 py-4">
=======
  return createPortal(
    <div className={`fixed inset-0 z-[90] flex items-center justify-center backdrop-blur-sm px-4 py-8 ${isDark ? 'bg-black/80' : 'bg-slate-500/30'}`}>
      <div className={`max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border shadow-2xl ${isDark
        ? 'border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)]'
        : 'border-slate-200 bg-white text-slate-800 shadow-xl'
        }`}>
        <div className={`flex items-center justify-between border-b px-6 py-4 ${isDark ? 'border-slate-800 bg-black/60' : 'border-slate-100 bg-slate-50/50'
          }`}>
>>>>>>> Stashed changes
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{manualMode ? 'Medicamento Manual' : 'Medicamento Catálogo'}</h2>
          </div>
          <div className="flex items-center gap-2">
            <RxvButton variant="secondary" onClick={onClose}>Cancelar</RxvButton>
            <RxvButton variant="primary" onClick={handleAdd} disabled={!canAdd}>Adicionar</RxvButton>
          </div>
        </div>

        <div className="max-h-[calc(92vh-80px)] overflow-y-auto p-6 space-y-6">
          {!manualMode ? (
            <div className="space-y-4">
              <RxvField label="Buscar medicamento">
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
                    </button>
                  ))}
                </div>
              )}
              {selectedMedication && (
                <div className="space-y-4">
<<<<<<< Updated upstream
                  <div className="flex items-center justify-between rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 px-4 py-3">
                    <div>
                      <p className="text-base font-bold text-white">{selectedMedication.name}</p>
                      <p className="text-xs text-slate-500">{selectedMedication.pharmacy_origin || 'Veterinária'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedMedication(null)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  {/* Apresentação */}
                  {presentations.length > 0 && (
                    <div className="space-y-2">
                      <RxvField label="Apresentação">
                        <RxvSelect
                          value={selectedPresentationId || ''}
                          onChange={(e) => setSelectedPresentationId(e.target.value)}
                          options={presentations.map((p) => ({
                            value: p.id,
                            label: [
                              p.commercial_name || p.pharmaceutical_form || 'Sem nome',
                              p.concentration_text,
                              p.is_default ? '(Padrão)' : undefined,
                            ].filter(Boolean).join(' - '),
                          }))}
                        />
                      </RxvField>

                      {/* Preview da apresentação selecionada */}
                      {selectedPresentation && (
                        <div className="rounded-xl border border-slate-800 bg-black/30 px-4 py-3 space-y-1 text-xs text-slate-400">
                          {selectedPresentation.concentration_text && (
                            <p>Concentração: <span className="text-white">{selectedPresentation.concentration_text}</span></p>
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
                            <p>Preço médio: <span className="text-emerald-400">R$ {selectedPresentation.avg_price_brl.toFixed(2)}</span></p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Doses recomendadas */}
                  {recommendedDoses.length > 0 && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                        Doses indicadas no catálogo
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {recommendedDoses.map((rd, idx) => (
                          <button
                            key={rd.id || idx}
                            type="button"
                            className="flex w-full items-center justify-between rounded-lg bg-black/40 px-3 py-2 text-left border border-transparent hover:border-amber-500/50 transition-all"
                            onClick={() => {
                              setDose(`${rd.dose_value} ${rd.dose_unit}`)
                              setRoute(rd.route || 'VO')
                              setFrequency(rd.frequency || '')
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
                            <span className="text-[10px] text-amber-500 font-bold">APLICAR</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ==================== MODO MANUAL ==================== */}
          {manualMode && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RxvField label="Nome do medicamento *">
                  <RxvInput
                    placeholder="Ex: Amoxicilina"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Concentração">
                  <RxvInput
                    placeholder="Ex: 500 mg"
                    value={manualConcentration}
                    onChange={(e) => setManualConcentration(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Nome comercial">
                  <RxvInput
                    placeholder="Ex: Amoxivet, Claritin Vet"
                    value={manualCommercialName}
                    onChange={(e) => setManualCommercialName(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Forma farmacêutica">
                  <RxvInput
                    placeholder="Ex: Comprimido, Suspensão oral"
                    value={manualForm}
                    onChange={(e) => setManualForm(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Via de administração">
                  <RxvSelect
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    options={ROUTE_OPTIONS}
                  />
                </RxvField>
              </div>
            </div>
          )}

          {/* ==================== CAMPOS COMUNS (dose/freq/duração) ==================== */}
          {(selectedMedication || manualMode) && (
            <div className="space-y-4">
              <div className="h-px bg-slate-800/60" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RxvField label="Dose">
                  <RxvInput
                    placeholder="Ex: 10 mg/kg"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                  />
                </RxvField>

                {!manualMode && (
                  <RxvField label="Via de administração">
                    <RxvSelect
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      options={ROUTE_OPTIONS}
                    />
                  </RxvField>
                )}

                <RxvField label="Frequência">
                  <RxvInput
                    placeholder="Ex: BID, TID, 12/12h"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Duração">
                  <RxvInput
                    placeholder="Ex: 7 dias"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </RxvField>
              </div>

              <RxvField label="Instruções de uso">
                <RxvTextarea
                  placeholder="Ex: Dar com alimento, evitar sol..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                />
=======
                  <RxvField label="Apresentação">
                    <RxvSelect
                      value={selectedPresentationId || ''}
                      onChange={(e) => setSelectedPresentationId(e.target.value)}
                      options={presentations.map(p => ({ value: p.id, label: `${p.commercial_name || p.pharmaceutical_form} - ${p.concentration_text}` }))}
                    />
                  </RxvField>
                </div>
              )}
            </div>
          ) : (
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
>>>>>>> Stashed changes
              </RxvField>
            ) : (
              <RxvField label="Quantidade calculada">
                <div className="h-10 flex items-center px-3 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-lg text-[#39ff14] font-bold">
                  {formatPerDoseQuantity(calculatedQty?.perDose || 0, calculatedQty?.unit || '')}
                </div>
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
