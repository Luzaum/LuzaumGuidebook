console.log("[DEBUG] NovaReceitaPage.tsx evaluation started")
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RxPrintView } from './RxPrintView'
import ReceituarioChrome from './ReceituarioChrome'
import { buildAutoInstruction, calculateMedicationQuantity, itemStatus, renderRxToPrintDoc, resolveFrequency, splitPrescriptionByControl } from './rxRenderer'
import { createDefaultItem, createDefaultPrescriptionState } from './rxDefaults'
import { loadRxDraft, loadRxDraftById, saveRxDraft } from './rxStorage'
import HelpConceptButton from './HelpConceptButton'
import { BRAZIL_STATE_SUGGESTIONS, citySuggestionsForState, lookupAddressByCep, normalizeStateInput } from './rxBrazilData'
import { digitsOnly, maskCep, maskCpf, maskPhoneBr, maskRg } from './rxInputMasks'
import {
  CatalogDrug,
  ClientRecord,
  findSpecialControlTemplate,
  PrescriberProfile,
  ProfileSettings,
  RxProtocol,
  loadRxDb,
  saveRxDb,
  upsertClientFromPrescription,
  upsertHistoryFromPrescription,
  upsertPatientFromPrescription,
} from './rxDb'
import { breedOptionsForSpecies, coatOptionsForSpecies } from './rxReferenceData'
import {
  CONCENTRATION_PER_UNIT_OPTIONS,
  CONCENTRATION_VALUE_UNIT_OPTIONS,
  formatStructuredConcentration,
  parseStructuredConcentration,
  StructuredConcentration,
} from './rxConcentration'
import {
  FrequencyType,
  ItemCategory,
  PackageType,
  PharmacyType,
  PrescriptionItem,
  PrescriptionState,
  RouteGroup,
  SpecialControlPharmacy,
} from './rxTypes'
import { useClinic } from '../../src/components/ClinicProvider'
import type { AdapterDataSource, DataAdapterPatientMatch } from './adapters'
import { createRxDataAdapter, resolveRxDataSource } from './adapters'
import { PatientQuickSelect } from './components/PatientQuickSelect'
import { PatientCreateModal } from './components/PatientCreateModal'
import { TutorQuickSelect } from './components/TutorQuickSelect'
import { createPrescriptionDraft, updatePrescriptionDraft, listPrescriptionsByPatient, getPrescriptionById } from '@/src/lib/prescriptionsRecords'
import { isUuid } from '@/src/lib/isUuid'
import { SupabaseImportBlock } from './components/SupabaseImportBlock'
import type { PatientInfo, TutorInfo } from './rxTypes'

type SaveStatus = 'saved' | 'editing' | 'saving' | 'error'
type ToastType = 'success' | 'error' | 'info'
type EditorTab = 'editor' | 'preview'

const COMMON_EXAMS = [
  'Hemograma completo',
  'Bioquímica sérica',
  'Urinálise',
  'Urocultura',
  'Citologia',
  'Ultrassonografia abdominal',
  'Biópsia lesional',
  'Biópsia tumoral',
  'Tomografia',
  'Ressonância magnética',
  'Ecocardiograma',
  'Eletrocardiograma',
  'Rinoscopia',
  'Endoscopia',
  'Otoscopia',
]

const ROUTE_OPTIONS: Array<{ value: RouteGroup; label: string }> = [
  { value: 'ORAL', label: 'Oral' },
  { value: 'OTOLOGICO', label: 'Otológico' },
  { value: 'OFTALMICO', label: 'Oftálmico' },
  { value: 'TOPICO', label: 'Tópico' },
  { value: 'INTRANASAL', label: 'Intranasal' },
  { value: 'RETAL', label: 'Retal' },
  { value: 'SC', label: 'Subcutâneo (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenoso (IV)' },
  { value: 'INALATORIO', label: 'Inalatório' },
  { value: 'TRANSDERMICO', label: 'Transdérmico' },
  { value: 'OUTROS', label: 'Outros' },
]

const DOSE_UNIT_OPTIONS = ['mg/kg', 'mcg/kg', 'g/kg', 'mL/kg', 'UI/kg', 'comprimido/kg', 'gota/kg', 'mg', 'mL', 'comprimido', 'gota', 'cápsula']
const PRESENTATION_OPTIONS = ['Comprimido', 'Cápsula', 'Gotas', 'Suspensão oral', 'Solução oral', 'Pomada', 'Injetável', 'Intravenoso']
const PHARMACY_OPTIONS: Array<{ value: PharmacyType; label: string }> = [
  { value: 'veterinária', label: 'Veterinária' },
  { value: 'humana', label: 'Humana' },
  { value: 'manipulacao', label: 'Manipulação' },
]

interface CatalogModalEntry {
  id: string
  drugId: string
  presentationId: string
  controlled: boolean
  name: string
  commercialName: string
  concentration: string
  presentation: string
  routeGroup: RouteGroup
  doseUnit: string
  pharmacyTypes: PharmacyType[]
}

interface ToastState {
  type: ToastType
  message: string
}

interface ModalState {
  open: boolean
  mode: 'create' | 'edit'
  autosave: boolean
  useCatalog: boolean
  draft: PrescriptionItem | null
  originalItem: PrescriptionItem | null
}

const EMPTY_MODAL_STATE: ModalState = {
  open: false,
  mode: 'create',
  autosave: true,
  useCatalog: true,
  draft: null,
  originalItem: null,
}

const RX_HEADER_SELECTION_SESSION_KEY = 'vetius:rx:nova-receita:header-selection'

type RxHeaderSelectionSession = {
  source: AdapterDataSource
  clinicId: string | null
  patientRecordId: string
  patientName: string
  tutorRecordId: string
  tutorName: string
}

function writeHeaderSelectionSession(snapshot: RxHeaderSelectionSession | null) {
  try {
    if (!snapshot) {
      sessionStorage.removeItem(RX_HEADER_SELECTION_SESSION_KEY)
      return
    }
    sessionStorage.setItem(RX_HEADER_SELECTION_SESSION_KEY, JSON.stringify(snapshot))
  } catch {
    // noop
  }
}

function readHeaderSelectionSession(): RxHeaderSelectionSession | null {
  try {
    const raw = sessionStorage.getItem(RX_HEADER_SELECTION_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<RxHeaderSelectionSession>
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

function withTimestamp<T extends { updatedAt: string }>(obj: T): T {
  return { ...obj, updatedAt: new Date().toISOString() }
}

function replaceItem(items: PrescriptionItem[], item: PrescriptionItem) {
  const exists = items.some((entry) => entry.id === item.id)
  if (!exists) return [...items, item]
  return items.map((entry) => (entry.id === item.id ? item : entry))
}

function removeItem(items: PrescriptionItem[], itemId: string) {
  return items.filter((item) => item.id !== itemId)
}

function cloneItem(item: PrescriptionItem): PrescriptionItem {
  const now = new Date().toISOString()
  return {
    ...item,
    id: `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
    updatedAt: now,
  }
}

function moveItem(items: PrescriptionItem[], index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= items.length) return items
  const next = [...items]
  const [item] = next.splice(index, 1)
  next.splice(target, 0, item)
  return next
}

function normalizeLooseText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function canonicalExamName(exam: string): string {
  const normalized = normalizeLooseText(exam)
  const found = COMMON_EXAMS.find((common) => normalizeLooseText(common) === normalized)
  return found || exam.trim()
}

function uniqueNormalizedLines(lines: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const line of lines) {
    const trimmed = (line || '').trim()
    if (!trimmed) continue
    const key = normalizeLooseText(trimmed)
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push(trimmed)
  }
  return result
}

function normalizeExamState(
  commonRaw: string[] | undefined,
  customRaw: string[] | undefined
): { common: string[]; custom: string[] } {
  const merged = uniqueNormalizedLines([...(commonRaw || []), ...(customRaw || [])].map(canonicalExamName))
  const common = merged.filter((exam) =>
    COMMON_EXAMS.some((commonExam) => normalizeLooseText(commonExam) === normalizeLooseText(exam))
  )
  const custom = merged.filter(
    (exam) => !COMMON_EXAMS.some((commonExam) => normalizeLooseText(commonExam) === normalizeLooseText(exam))
  )
  return { common, custom }
}

function calculateDefaultWaterMlPerDay(weightKgText: string): string {
  const numericWeight = Number((weightKgText || '').replace(',', '.'))
  if (!Number.isFinite(numericWeight) || numericWeight <= 0) return ''
  return String(Math.round(numericWeight * 60))
}

function defaultStructuredConcentration(): StructuredConcentration {
  return {
    value: '',
    unit: 'mg',
    perValue: '1',
    perUnit: 'comprimido',
  }
}

function toPrescriber(profile: ProfileSettings, profileId = 'default') {
  return {
    profileId,
    adminId: 'ADMIN',
    name: profile.fullName || 'Dr. Silva',
    crmv: `CRMV-${profile.uf || 'SP'} ${profile.crmv || ''}`.trim(),
    clinicName: profile.clinicName || 'CLÍNICA VETERINÁRIA VETIUS',
  }
}

function applyProfileToPrescription(rx: PrescriptionState, profile: ProfileSettings, profileId = 'default'): PrescriptionState {
  return {
    ...rx,
    prescriber: toPrescriber(profile, profileId),
  }
}

function findProfileSettings(dbState: ReturnType<typeof loadRxDb>, profileId?: string): { id: string; profile: ProfileSettings } {
  const selected = dbState.prescriberProfiles.find((entry) => entry.id === profileId)
  if (selected) return { id: selected.id, profile: selected }
  const first = dbState.prescriberProfiles[0]
  if (first) return { id: first.id, profile: first }
  return { id: 'default', profile: dbState.profile }
}

function hydratePrescription(raw: PrescriptionState | null | undefined): PrescriptionState {
  const base = createDefaultPrescriptionState()
  if (!raw) return base
  const normalizedExams = normalizeExamState(raw.recommendations?.exams, raw.recommendations?.customExams)
  return {
    ...base,
    ...raw,
    prescriber: { ...base.prescriber, ...(raw.prescriber || {}) },
    patient: { ...base.patient, ...(raw.patient || {}) },
    tutor: { ...base.tutor, ...(raw.tutor || {}) },
    recommendations: {
      ...base.recommendations,
      ...(raw.recommendations || {}),
      bullets: raw.recommendations?.bullets?.length ? raw.recommendations.bullets : base.recommendations.bullets,
      exams: normalizedExams.common,
      customExams: normalizedExams.custom,
      examReasons: uniqueNormalizedLines(raw.recommendations?.examReasons || []),
      specialControlPharmacy:
        raw.recommendations?.specialControlPharmacy === 'humana' ||
          raw.recommendations?.specialControlPharmacy === 'manipulacao' ||
          raw.recommendations?.specialControlPharmacy === 'veterinária'
          ? raw.recommendations.specialControlPharmacy
          : base.recommendations.specialControlPharmacy,
      standardTemplateId: raw.recommendations?.standardTemplateId || base.recommendations.standardTemplateId,
      specialControlTemplateId:
        raw.recommendations?.specialControlTemplateId || base.recommendations.specialControlTemplateId,
    },
    items: Array.isArray(raw.items) ? raw.items : [],
  }
}

function normalizePatientSex(value: string): PrescriptionState['patient']['sex'] {
  if (value === 'F' || value === 'FN' || value === 'Fêmea') return 'Fêmea'
  if (value === 'M' || value === 'MN' || value === 'Macho') return 'Macho'
  return 'Sem dados'
}

function normalizeSpecies(value: string): PrescriptionState['patient']['species'] {
  return value === 'Felina' ? 'Felina' : 'Canina'
}

function StatusChip({ status }: { status: SaveStatus }) {
  if (status === 'saving') {
    return (
      <span className="rxv-status-chip border-amber-600/60 bg-amber-500/10 text-amber-300">
        <span className="material-symbols-outlined text-[14px]">sync</span>
        Salvando...
      </span>
    )
  }
  if (status === 'error') {
    return (
      <span className="rxv-status-chip border-red-700/60 bg-red-600/10 text-red-300">
        <span className="material-symbols-outlined text-[14px]">error</span>
        Erro ao salvar
      </span>
    )
  }
  if (status === 'editing') {
    return (
      <span className="rxv-status-chip border-slate-600/60 bg-slate-700/30 text-slate-300">
        <span className="material-symbols-outlined text-[14px]">edit</span>
        Alterações pendentes
      </span>
    )
  }
  return (
    <span className="rxv-status-chip border-emerald-700/60 bg-emerald-500/10 text-emerald-300">
      <span className="material-symbols-outlined text-[14px]">check_circle</span>
      Salvo
    </span>
  )
}

interface MedicationModalProps {
  state: ModalState
  catalogDrugs: CatalogDrug[]
  catalogEntries: CatalogModalEntry[]
  patientState: PrescriptionState
  onClose: (discard: boolean) => void
  onSave: () => void
  onToggleAutosave: (next: boolean) => void
  onToggleCatalogMode: (next: boolean) => void
  onDraftChange: (updater: (prev: PrescriptionItem) => PrescriptionItem) => void
}

function MedicationModal({
  state,
  catalogDrugs,
  catalogEntries,
  patientState,
  onClose,
  onSave,
  onToggleAutosave,
  onToggleCatalogMode,
  onDraftChange,
}: MedicationModalProps) {
  const onCloseRef = useRef(onClose)
  const [catalogSearch, setCatalogSearch] = useState('')
  const [usePresetPresentation, setUsePresetPresentation] = useState(true)
  const [selectedPresentationId, setSelectedPresentationId] = useState('')
  const [structuredConcentration, setStructuredConcentration] = useState<StructuredConcentration>(defaultStructuredConcentration())

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!state.open) return
    const onEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onCloseRef.current(true)
    }
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [state.open])

  useEffect(() => {
    if (!state.open || !state.draft) return
    const drug = catalogDrugs.find((entry) => entry.id === state.draft?.catalogDrugId)
    const firstPresentation = drug?.presentations[0]
    if (!selectedPresentationId && firstPresentation) {
      setSelectedPresentationId(firstPresentation.id)
    }
  }, [catalogDrugs, selectedPresentationId, state.draft, state.open])

  useEffect(() => {
    if (!state.open || !state.draft) return
    const parsed = parseStructuredConcentration(state.draft.concentration || '')
    if (parsed) {
      setStructuredConcentration({
        value: parsed.value || '',
        unit: parsed.unit || 'mg',
        perValue: parsed.perValue || '1',
        perUnit: parsed.perUnit || 'comprimido',
      })
      return
    }
    setStructuredConcentration(defaultStructuredConcentration())
  }, [state.draft?.concentration, state.open])

  const selectedCatalogDrug = catalogDrugs.find((entry) => entry.id === state.draft?.catalogDrugId)
  const selectedCatalogPresentation = selectedCatalogDrug?.presentations.find((entry) => entry.id === selectedPresentationId)
  const concentrationValueUnitOptions = useMemo(() => {
    const options = new Set(CONCENTRATION_VALUE_UNIT_OPTIONS)
    catalogDrugs.forEach((drug) => {
      drug.presentations.forEach((presentation) => {
        const explicit = (presentation as unknown as { concentrationUnit?: string }).concentrationUnit
        if (explicit?.trim()) options.add(explicit.trim())
        const parsed = parseStructuredConcentration(presentation.concentration || '')
        if (parsed?.unit) options.add(parsed.unit)
      })
    })
    return Array.from(options)
  }, [catalogDrugs])
  const concentrationPerUnitOptions = useMemo(() => {
    const options = new Set(CONCENTRATION_PER_UNIT_OPTIONS)
    catalogDrugs.forEach((drug) => {
      drug.presentations.forEach((presentation) => {
        const explicit = (presentation as unknown as { concentrationPerUnit?: string }).concentrationPerUnit
        if (explicit?.trim()) options.add(explicit.trim())
        if (presentation.unitLabel?.trim()) options.add(presentation.unitLabel.trim())
        const parsed = parseStructuredConcentration(presentation.concentration || '')
        if (parsed?.perUnit) options.add(parsed.perUnit)
      })
    })
    return Array.from(options)
  }, [catalogDrugs])
  const availablePharmacyTypes = (() => {
    if (selectedCatalogPresentation?.pharmacyTags?.length) return selectedCatalogPresentation.pharmacyTags
    if (selectedCatalogDrug?.presentations?.length) {
      const unique = Array.from(
        new Set(
          selectedCatalogDrug.presentations.flatMap((entry) =>
            entry.pharmacyTags?.length ? entry.pharmacyTags : [selectedCatalogDrug.pharmacyType || 'veterinária']
          )
        )
      )
      if (unique.length) return unique as PharmacyType[]
    }
    if (selectedCatalogDrug?.pharmacyType) return [selectedCatalogDrug.pharmacyType]
    return PHARMACY_OPTIONS.map((option) => option.value)
  })()

  useEffect(() => {
    if (!state.open || !state.draft || !selectedCatalogDrug) return
    if (availablePharmacyTypes.includes(state.draft.pharmacyType)) return
    onDraftChange((prev) => ({
      ...prev,
      pharmacyType: availablePharmacyTypes[0] || 'veterinária',
    }))
  }, [availablePharmacyTypes, onDraftChange, selectedCatalogDrug, state.draft?.pharmacyType, state.open])

  if (!state.open || !state.draft) return null

  const filteredCatalog = catalogEntries.filter((entry) =>
    `${entry.name} ${entry.commercialName} ${entry.concentration} ${entry.presentation}`
      .toLowerCase()
      .includes(catalogSearch.toLowerCase())
  )

  const updateStructuredConcentration = (patch: Partial<StructuredConcentration>) => {
    const next = { ...structuredConcentration, ...patch }
    setStructuredConcentration(next)
    const formatted = formatStructuredConcentration(next)
    if (!formatted) return
    onDraftChange((prev) => ({ ...prev, concentration: formatted }))
  }

  const handleCatalogSelect = (entry: CatalogModalEntry) => {
    onDraftChange((prev) => {
      const nextPharmacyType = entry.pharmacyTypes.includes(prev.pharmacyType)
        ? prev.pharmacyType
        : (entry.pharmacyTypes[0] || prev.pharmacyType)
      return {
        ...prev,
        catalogDrugId: entry.drugId,
        controlled: entry.controlled,
        name: entry.name,
        commercialName: entry.commercialName,
        concentration: entry.concentration,
        presentation: entry.presentation,
        routeGroup: entry.routeGroup,
        doseUnit: entry.doseUnit,
        pharmacyType: nextPharmacyType,
        manualEdited: false,
      }
    })
    setSelectedPresentationId(entry.presentationId)
    setUsePresetPresentation(true)
  }

  const applySelectedPresentation = (presentationId: string) => {
    setSelectedPresentationId(presentationId)
    if (!selectedCatalogDrug) return
    const presentation = selectedCatalogDrug.presentations.find((entry) => entry.id === presentationId)
    if (!presentation) return
    const presentationPharmacyTypes = presentation.pharmacyTags?.length ? presentation.pharmacyTags : [selectedCatalogDrug.pharmacyType || 'veterinária']
    onDraftChange((prev) => ({
      ...prev,
      catalogDrugId: selectedCatalogDrug.id,
      name: selectedCatalogDrug.name,
      presentation: presentation.name || prev.presentation,
      concentration: presentation.concentration || prev.concentration,
      commercialName: presentation.commercialName || prev.commercialName || '',
      doseUnit: selectedCatalogDrug.doseUnit || prev.doseUnit,
      routeGroup: selectedCatalogDrug.routeGroup || prev.routeGroup,
      pharmacyType: presentationPharmacyTypes.includes(prev.pharmacyType) ? prev.pharmacyType : presentationPharmacyTypes[0] || prev.pharmacyType,
      controlled: !!selectedCatalogDrug.controlled,
      manualEdited: false,
    }))
  }

  const quantity = calculateMedicationQuantity(state.draft, patientState)
  const frequency = resolveFrequency(state.draft)
  const weightKg = Number((patientState.patient.weightKg || '').replace(',', '.'))
  const doseValue = Number((state.draft.doseValue || '').replace(',', '.'))
  const doseUnit = state.draft.doseUnit || 'mg/kg'
  const baseDoseUnit = doseUnit.includes('/kg') ? doseUnit.replace('/kg', '') : doseUnit
  const targetPerDose = Number.isFinite(doseValue)
    ? (doseUnit.includes('/kg') && Number.isFinite(weightKg) ? doseValue * weightKg : doseValue)
    : null

  const concentrationMatch = (state.draft.concentration || '').match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Z%]+)\s*\/\s*(\d+(?:[.,]\d+)?)?\s*([a-zA-Z]+)/)
  const concentrationAmount = concentrationMatch ? Number(concentrationMatch[1].replace(',', '.')) : null
  const concentrationUnit = concentrationMatch ? concentrationMatch[2] : ''
  const concentrationPerValue = concentrationMatch ? Number((concentrationMatch[3] || '1').replace(',', '.')) : null
  const concentrationPerUnit = concentrationMatch ? concentrationMatch[4] : ''
  const volumePerDose =
    targetPerDose !== null &&
      Number.isFinite(targetPerDose) &&
      concentrationAmount &&
      concentrationPerValue &&
      concentrationAmount > 0 &&
      concentrationUnit.toLowerCase() === baseDoseUnit.toLowerCase()
      ? targetPerDose / (concentrationAmount / concentrationPerValue)
      : null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#13220f] text-slate-100 shadow-[0_0_40px_rgba(56,255,20,0.18)]">
        <div className="flex items-center justify-between border-b border-[#274b20] bg-[#11200e] px-5 py-4">
          <div>
            <h2 className="text-lg font-bold">Adicionar Medicamento</h2>
            <p className="text-xs text-slate-400">Preencha o item e veja a receita atualizar em tempo real.</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-300">
              <input type="checkbox" className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]" checked={state.autosave} onChange={(e) => onToggleAutosave(e.target.checked)} />
              Salvar automaticamente
            </label>
            <button type="button" className="rounded-lg border border-[#3f6f31] px-3 py-1.5 text-sm hover:bg-[#1e3818]" onClick={() => onClose(true)}>
              Cancelar
            </button>
            <button type="button" className="rounded-lg bg-[#38ff14] px-3 py-1.5 text-sm font-bold text-[#0c1908] hover:bg-[#2cd20f]" onClick={onSave}>
              Salvar
            </button>
          </div>
        </div>
        <div className="grid max-h-[calc(92vh-72px)] grid-cols-1 overflow-y-auto lg:grid-cols-3">
          <div className="space-y-4 border-r border-[#274b20] p-5 lg:col-span-2">
            <div className="flex items-center gap-3 rounded-xl border border-[#315d28] bg-[#173116] p-3">
              <label className="text-sm font-semibold">Modo:</label>
              <button type="button" className={`rounded-md px-3 py-1.5 text-sm ${state.useCatalog ? 'bg-[#38ff14] text-[#0f1d0b]' : 'bg-[#1f3319] text-slate-300'}`} onClick={() => onToggleCatalogMode(true)}>
                Usar pré-definições
              </button>
              <button type="button" className={`rounded-md px-3 py-1.5 text-sm ${!state.useCatalog ? 'bg-[#38ff14] text-[#0f1d0b]' : 'bg-[#1f3319] text-slate-300'}`} onClick={() => onToggleCatalogMode(false)}>
                Escrever manualmente
              </button>
            </div>
            {state.useCatalog ? (
              <section className="space-y-2 rounded-xl border border-[#2e5525] bg-[#152913] p-4">
                <h3 className="text-sm font-bold text-slate-200">Catálogo rápido</h3>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Buscar no catálogo..."
                />
                <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                  {filteredCatalog.map((entry) => (
                    <button type="button" key={`${entry.name}-${entry.concentration}`} className="flex w-full items-start justify-between rounded-lg border border-[#335c29] bg-[#12230f] px-3 py-2 text-left hover:border-[#48a534]" onClick={() => handleCatalogSelect(entry)}>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {entry.name}
                          {entry.commercialName ? <span className="text-[#9ff394]"> ({entry.commercialName})</span> : null}
                        </p>
                        <p className="text-xs text-slate-400">{entry.concentration} - {entry.presentation}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="rounded bg-[#1f3a18] px-2 py-0.5 text-[10px] text-[#8cff78]">{entry.routeGroup}</span>
                        {entry.controlled ? <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">CONTROLADO</span> : null}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {selectedCatalogDrug && selectedCatalogDrug.presentations.length > 0 ? (
              <section className="rounded-xl border border-[#2e5525] bg-[#12250f] p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-200">Apresentação / Concentração</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={`rounded-md px-2 py-1 text-xs ${usePresetPresentation ? 'bg-[#38ff14] text-[#10200d]' : 'bg-[#1f3319] text-slate-300'}`}
                      onClick={() => setUsePresetPresentation(true)}
                    >
                      Seleção pronta
                    </button>
                    <button
                      type="button"
                      className={`rounded-md px-2 py-1 text-xs ${!usePresetPresentation ? 'bg-[#38ff14] text-[#10200d]' : 'bg-[#1f3319] text-slate-300'}`}
                      onClick={() => setUsePresetPresentation(false)}
                    >
                      Manual
                    </button>
                  </div>
                </div>
                {usePresetPresentation ? (
                  <select
                    className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={selectedPresentationId}
                    onChange={(e) => applySelectedPresentation(e.target.value)}
                  >
                    {selectedCatalogDrug.presentations.map((presentation) => (
                      <option key={presentation.id} value={presentation.id}>
                        {(presentation.commercialName || presentation.name)} - {presentation.concentration || 'Sem concentração'}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      <input
                        className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                        value={state.draft.presentation}
                        onChange={(e) => onDraftChange((prev) => ({ ...prev, presentation: e.target.value }))}
                        placeholder="Apresentação manual"
                      />
                      <input
                        className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                        value={state.draft.concentration}
                        onChange={(e) => {
                          const nextValue = e.target.value
                          onDraftChange((prev) => ({ ...prev, concentration: nextValue }))
                          const parsed = parseStructuredConcentration(nextValue)
                          if (parsed) {
                            setStructuredConcentration({
                              value: parsed.value || '',
                              unit: parsed.unit || 'mg',
                              perValue: parsed.perValue || '1',
                              perUnit: parsed.perUnit || 'comprimido',
                            })
                          }
                        }}
                        placeholder="Concentração manual"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                      <input
                        type="number"
                        step="0.01"
                        className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                        value={structuredConcentration.value}
                        onChange={(e) => updateStructuredConcentration({ value: e.target.value })}
                        placeholder="Valor"
                      />
                      <select
                        className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                        value={structuredConcentration.unit}
                        onChange={(e) => updateStructuredConcentration({ unit: e.target.value })}
                      >
                        {concentrationValueUnitOptions.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                        value={structuredConcentration.perValue}
                        onChange={(e) => updateStructuredConcentration({ perValue: e.target.value || '1' })}
                        placeholder="Por valor"
                      />
                      <select
                        className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                        value={structuredConcentration.perUnit}
                        onChange={(e) => updateStructuredConcentration({ perUnit: e.target.value })}
                      >
                        {concentrationPerUnitOptions.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {selectedCatalogPresentation?.averagePrice ? (
                  <p className="mt-2 text-xs text-[#97ce8d]">Preço médio de referência: {selectedCatalogPresentation.averagePrice}</p>
                ) : null}
              </section>
            ) : null}
            <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Nome do medicamento</label>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.name}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Apresentação</label>
                <input
                  list="rx-presentations"
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.presentation}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, presentation: e.target.value }))}
                />
                <datalist id="rx-presentations">
                  {PRESENTATION_OPTIONS.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Concentração / força</label>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.concentration}
                  onChange={(e) => {
                    const nextValue = e.target.value
                    onDraftChange((prev) => ({ ...prev, concentration: nextValue }))
                    const parsed = parseStructuredConcentration(nextValue)
                    if (parsed) {
                      setStructuredConcentration({
                        value: parsed.value || '',
                        unit: parsed.unit || 'mg',
                        perValue: parsed.perValue || '1',
                        perUnit: parsed.perUnit || 'comprimido',
                      })
                    }
                  }}
                  placeholder="500 mg/mL, 62.5 mg, 2%..."
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Nome comercial (opcional)</label>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.commercialName || ''}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, commercialName: e.target.value }))}
                  placeholder="Ex.: Agemoxi®"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Concentração estruturada (opcional)</label>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                  <input
                    type="number"
                    step="0.01"
                    className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={structuredConcentration.value}
                    onChange={(e) => updateStructuredConcentration({ value: e.target.value })}
                    placeholder="Valor"
                  />
                  <select
                    className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={structuredConcentration.unit}
                    onChange={(e) => updateStructuredConcentration({ unit: e.target.value })}
                  >
                    {concentrationValueUnitOptions.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={structuredConcentration.perValue}
                    onChange={(e) => updateStructuredConcentration({ perValue: e.target.value || '1' })}
                    placeholder="Por valor"
                  />
                  <select
                    className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={structuredConcentration.perUnit}
                    onChange={(e) => updateStructuredConcentration({ perUnit: e.target.value })}
                  >
                    {concentrationPerUnitOptions.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Tipo de farmácia</label>
                <select
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.pharmacyType}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, pharmacyType: e.target.value as PharmacyType }))}
                >
                  {(selectedCatalogDrug ? availablePharmacyTypes : PHARMACY_OPTIONS.map((option) => option.value)).map((option) => {
                    const label = PHARMACY_OPTIONS.find((entry) => entry.value === option)?.label || option
                    return (
                      <option key={option} value={option}>
                        {label}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Embalagem</label>
                <select
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.packageType}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, packageType: e.target.value as PackageType }))}
                >
                  <option value="frasco">Frasco</option>
                  <option value="caixa">Caixa</option>
                  <option value="bisnaga">Bisnaga</option>
                  <option value="ampola">Ampola</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Via de administração</label>
                <select
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.routeGroup}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, routeGroup: e.target.value as RouteGroup }))}
                >
                  {ROUTE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Nome da farmácia (opcional)</label>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.pharmacyName}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, pharmacyName: e.target.value }))}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-300 md:col-span-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]"
                  checked={!!state.draft.controlled}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, controlled: e.target.checked }))}
                />
                Medicamento controlado (receituário de controle especial)
              </label>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Observações</label>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.observations}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, observations: e.target.value }))}
                />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Dose</label>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.doseValue}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, doseValue: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Unidade</label>
                <select
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.doseUnit}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, doseUnit: e.target.value }))}
                >
                  {DOSE_UNIT_OPTIONS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Duração (dias)</label>
                <input
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.durationDays}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, durationDays: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Modelo de frequência</label>
                <select
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.frequencyType}
                  onChange={(e) => onDraftChange((prev) => ({ ...prev, frequencyType: e.target.value as FrequencyType }))}
                >
                  <option value="timesPerDay">x vezes ao dia</option>
                  <option value="everyHours">a cada X horas</option>
                </select>
              </div>
              {state.draft.frequencyType === 'timesPerDay' ? (
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Vezes ao dia (1-24)</label>
                  <input
                    className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={state.draft.timesPerDay}
                    onChange={(e) => onDraftChange((prev) => ({ ...prev, timesPerDay: e.target.value, frequencyToken: '' }))}
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Intervalo em horas (1-24)</label>
                  <input
                    className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={state.draft.everyHours}
                    onChange={(e) => onDraftChange((prev) => ({ ...prev, everyHours: e.target.value, frequencyToken: '' }))}
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Quantidade estimada</label>
                <div className="rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm text-[#9af58a]">
                  {quantity.label}
                </div>
              </div>
            </section>

            <section className="space-y-3 rounded-xl border border-[#2e5525] bg-[#142812] p-4">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]"
                    checked={state.draft.autoInstruction}
                    onChange={(e) =>
                      onDraftChange((prev) => ({
                        ...prev,
                        autoInstruction: e.target.checked,
                        manualEdited: !e.target.checked ? prev.manualEdited : false,
                      }))
                    }
                  />
                  Gerar instrução automaticamente
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]"
                    checked={state.draft.untilFinished}
                    onChange={(e) => onDraftChange((prev) => ({ ...prev, untilFinished: e.target.checked, continuousUse: e.target.checked ? false : prev.continuousUse }))}
                  />
                  Até acabar
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]"
                    checked={state.draft.continuousUse}
                    onChange={(e) => onDraftChange((prev) => ({ ...prev, continuousUse: e.target.checked, untilFinished: e.target.checked ? false : prev.untilFinished }))}
                  />
                  Uso contínuo
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]"
                    checked={!!state.draft.titleBold}
                    onChange={(e) => onDraftChange((prev) => ({ ...prev, titleBold: e.target.checked }))}
                  />
                  Nome em negrito
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]"
                    checked={!!state.draft.titleUnderline}
                    onChange={(e) => onDraftChange((prev) => ({ ...prev, titleUnderline: e.target.checked }))}
                  />
                  Nome sublinhado
                </label>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Instrução final</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                  value={state.draft.instruction}
                  onChange={(e) =>
                    onDraftChange((prev) => ({
                      ...prev,
                      instruction: e.target.value,
                      manualEdited: true,
                    }))
                  }
                />
              </div>
            </section>

            <section className="space-y-2 rounded-xl border border-[#2e5525] bg-[#142812] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">Cautelas</h3>
                <button type="button" className="rounded border border-[#3d6f31] px-2 py-1 text-xs hover:bg-[#1e3818]" onClick={() => onDraftChange((prev) => ({ ...prev, cautions: [...prev.cautions, ''] }))}>
                  + adicionar cautela
                </button>
              </div>
              {(state.draft.cautions.length ? state.draft.cautions : ['']).map((line, idx) => (
                <div key={`caution-${idx}`} className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                    value={line}
                    onChange={(e) =>
                      onDraftChange((prev) => {
                        const cautions = [...prev.cautions]
                        if (!cautions.length) cautions.push('')
                        cautions[idx] = e.target.value
                        return { ...prev, cautions }
                      })
                    }
                    placeholder="Ex.: Não administrar com o paciente em jejum."
                  />
                  <button type="button"
                    className="rounded-lg border border-red-800/70 px-2 text-xs text-red-300 hover:bg-red-950/40"
                    onClick={() =>
                      onDraftChange((prev) => ({
                        ...prev,
                        cautions: prev.cautions.filter((_, cautionIndex) => cautionIndex !== idx),
                      }))
                    }
                  >
                    Remover
                  </button>
                </div>
              ))}
            </section>
          </div>
          <aside className="border-t border-[#274b20] bg-[#10200d] p-5 lg:border-l lg:border-t-0">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-300">Preview do item</h3>
              <HelpConceptButton
                title="Memória de Cálculo"
                subtitle={`Detalhamento lógico para ${state.draft.name || 'medicamento selecionado'}`}
                buttonLabel="Como este cálculo foi feito?"
              >
                <div className="space-y-6 text-sm">
                  <div className="rounded-xl border border-[#376b2e] bg-[#10200d] p-4">
                    <p className="text-xs uppercase tracking-wide text-[#97ce8d]">Peso considerado</p>
                    <p className="text-2xl font-black text-white">{Number.isFinite(weightKg) ? `${weightKg} kg` : 'Não informado'}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-xl border border-[#315d28] bg-[#132510] p-4">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#97ce8d]">01 - Dose alvo por aplicação</p>
                      <p className="font-mono text-sm text-slate-200">
                        {doseUnit.includes('/kg')
                          ? `${state.draft.doseValue || '?'} ${doseUnit} × ${Number.isFinite(weightKg) ? weightKg : '?'} kg = ${targetPerDose !== null && Number.isFinite(targetPerDose) ? targetPerDose.toFixed(2) : '?'} ${baseDoseUnit}`
                          : `${state.draft.doseValue || '?'} ${doseUnit}`}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#315d28] bg-[#132510] p-4">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#97ce8d]">02 - Conversão por concentração</p>
                      <p className="font-mono text-sm text-slate-200">
                        {volumePerDose !== null
                          ? `${targetPerDose?.toFixed(2)} ${baseDoseUnit} ÷ (${concentrationAmount}/${concentrationPerValue} ${concentrationUnit}/${concentrationPerUnit}) = ${volumePerDose.toFixed(2)} ${concentrationPerUnit}`
                          : 'Sem concentração compatível para conversão automática.'}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#315d28] bg-[#132510] p-4">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#97ce8d]">03 - Posologia</p>
                      <p className="font-mono text-sm text-slate-200">{frequency.label}</p>
                    </div>

                    <div className="rounded-xl border border-[#315d28] bg-[#132510] p-4">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#97ce8d]">04 - Quantidade total estimada</p>
                      <p className="font-mono text-sm text-slate-200">{quantity.label}</p>
                    </div>
                  </div>
                </div>
              </HelpConceptButton>
            </div>
            <div className="space-y-3 rounded-xl border border-[#315d28] bg-[#152913] p-4 text-sm">
              <p className="font-semibold text-white">
                {state.draft.name || 'Medicamento sem nome'}
                {state.draft.commercialName ? <span className="text-[#9af58a]"> ({state.draft.commercialName})</span> : null}
              </p>
              <p className="text-slate-300">{state.draft.concentration || 'Concentração não informada'} - {state.draft.presentation || 'Apresentação'}</p>
              <p className="text-slate-400">Via: {state.draft.routeGroup}</p>
              <p className="font-semibold text-[#9af58a]">{quantity.label}</p>
              <p className="whitespace-pre-line text-slate-200">{state.draft.instruction || 'Instrução será exibida aqui.'}</p>
              {state.draft.cautions.filter(Boolean).length > 0 ? (
                <div className="space-y-1">
                  {state.draft.cautions.filter(Boolean).map((line, idx) => (
                    <p key={`preview-caution-${idx}`} className="font-semibold text-amber-300">
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default function NovaReceitaPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { clinicId } = useClinic()
  const rxDataSource = useMemo(
    () => resolveRxDataSource(import.meta.env.VITE_RX_DATA_SOURCE),
    []
  )
  const rxAdapter = useMemo(
    () =>
      createRxDataAdapter({
        source: rxDataSource,
        clinicId,
      }),
    [clinicId, rxDataSource]
  )

  // Debug: Log data source and adapter being used
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[NovaReceitaPage] DATA SOURCE:', rxDataSource)
      console.log('[NovaReceitaPage] Using adapter:', rxAdapter.constructor.name)
    }
  }, [rxDataSource, rxAdapter])

  const supabaseModeWithoutClinic = rxDataSource === 'supabase' && !clinicId
  const requestedDraftId = useMemo(() => new URLSearchParams(location.search).get('draft')?.trim() || '', [location.search])
  const [db, setDb] = useState(() => loadRxDb())
  const [prescription, setPrescription] = useState<PrescriptionState>(() => {
    const localDb = loadRxDb()
    const base = hydratePrescription(loadRxDraft())
    const selectedProfile = findProfileSettings(localDb, base.prescriber.profileId)
    return applyProfileToPrescription(base, selectedProfile.profile, selectedProfile.id)
  })
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const [autosaveEnabled, setAutosaveEnabled] = useState(true)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [mobileTab, setMobileTab] = useState<EditorTab>('editor')
  const [customExamDraft, setCustomExamDraft] = useState('')
  const [examReasonDraft, setExamReasonDraft] = useState('')
  const [protocolModalOpen, setProtocolModalOpen] = useState(false)
  const [patientCreateModalOpen, setPatientCreateModalOpen] = useState(false)
  const [protocolSearch, setProtocolSearch] = useState('')
  const [cepLookupLoading, setCepLookupLoading] = useState(false)
  const [cepLookupMessage, setCepLookupMessage] = useState<string | null>(null)
  const [modalState, setModalState] = useState<ModalState>(EMPTY_MODAL_STATE)
  const [supabaseLoading, setSupabaseLoading] = useState(false)
  const [supabasePrescriptionId, setSupabasePrescriptionId] = useState<string | null>(null)
  // Supabase tutor+patient import state
  const [selectedSupabaseTutor, setSelectedSupabaseTutor] = useState<TutorInfo | null>(null)
  const [supabasePatientsForTutor, setSupabasePatientsForTutor] = useState<PatientInfo[]>([])
  const [supabasePatientsLoading, setSupabasePatientsLoading] = useState(false)
  const saveTimeoutRef = useRef<number | null>(null)
  const pendingProtocolImportRef = useRef(false)
  const lastAutoWaterValueRef = useRef('')
  const loadedRequestedDraftIdRef = useRef('')
  const headerSelectionHydratedRef = useRef(false)

  const catalogEntries = useMemo<CatalogModalEntry[]>(() => {
    return db.catalog.flatMap((drug: CatalogDrug) => {
      const defaultPresentation = drug.presentations[0]
      if (!drug.presentations.length) {
        return [
          {
            id: `${drug.id}-default`,
            drugId: drug.id,
            presentationId: 'default',
            controlled: !!drug.controlled,
            name: drug.name,
            commercialName: '',
            concentration: '',
            presentation: 'Comprimido',
            routeGroup: drug.routeGroup,
            doseUnit: drug.doseUnit,
            pharmacyTypes: [drug.pharmacyType || 'veterinária'],
          },
        ]
      }
      return drug.presentations.map((presentation) => ({
        id: `${drug.id}-${presentation.id}`,
        drugId: drug.id,
        presentationId: presentation.id,
        controlled: !!drug.controlled,
        name: drug.name,
        commercialName: presentation.commercialName || '',
        concentration: presentation.concentration || defaultPresentation?.concentration || '',
        presentation: presentation.name || defaultPresentation?.name || 'Comprimido',
        routeGroup: drug.routeGroup,
        doseUnit: drug.doseUnit,
        pharmacyTypes: presentation.pharmacyTags?.length ? presentation.pharmacyTags : [drug.pharmacyType || 'veterinária']
      }))
    })
  }, [db.catalog])

  const protocolFolderMap = useMemo(() => {
    return new Map(db.protocolFolders.map((folder) => [folder.id, folder]))
  }, [db.protocolFolders])

  const filteredProtocols = useMemo(() => {
    return [...db.protocols]
      .filter((protocol) => protocol.active !== false)
      .filter((protocol) => `${protocol.name} ${protocol.summary}`.toLowerCase().includes(protocolSearch.toLowerCase()))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }, [db.protocols, protocolSearch])

  const prescriberProfiles = useMemo<PrescriberProfile[]>(() => {
    if (db.prescriberProfiles.length > 0) return db.prescriberProfiles
    return [
      {
        ...db.profile,
        id: 'default',
        profileName: 'Perfil padrão',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }, [db.profile, db.prescriberProfiles])

  const breedOptions = useMemo(() => breedOptionsForSpecies(prescription.patient.species), [prescription.patient.species])
  const coatOptions = useMemo(() => coatOptionsForSpecies(prescription.patient.species), [prescription.patient.species])

  const pushToast = (type: ToastType, message: string) => {
    setToast({ type, message })
    window.setTimeout(() => setToast(null), 2600)
  }

  const updatePrescription = (updater: (prev: PrescriptionState) => PrescriptionState) => {
    setPrescription((prev) => withTimestamp(updater(prev)))
    setSaveStatus('editing')
  }

  const handleDataAdapterError = (action: 'search' | 'save', error: unknown) => {
    if (import.meta.env.DEV) {
      console.error(`[RX B1.1] ${action} failed`, error)
    }
    pushToast('error', action === 'search'
      ? 'Não foi possível buscar. Verifique conexao/permissao.'
      : 'Não foi possível salvar. Verifique conexao/permissao.')
  }

  const applyPatientTutorToPrescription = (payload: DataAdapterPatientMatch) => {
    updatePrescription((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        ...payload.patient,
        patientRecordId: payload.patient.patientRecordId || prev.patient.patientRecordId,
      },
      tutor: {
        ...prev.tutor,
        ...payload.tutor,
        tutorRecordId: payload.tutor.tutorRecordId || prev.tutor.tutorRecordId,
      },
    }))
  }

  // Clean up selection when switching data sources
  useEffect(() => {
    const patientId = prescription.patient?.patientRecordId
    const tutorId = prescription.tutor?.tutorRecordId

    if (rxDataSource === 'supabase') {
      // In Supabase mode, clear non-UUID IDs
      if (patientId && !isUuid(patientId)) {
        updatePrescription((prev) => ({
          ...prev,
          patient: { ...prev.patient, patientRecordId: '' },
        }))
      }
      if (tutorId && !isUuid(tutorId)) {
        updatePrescription((prev) => ({
          ...prev,
          tutor: { ...prev.tutor, tutorRecordId: '' },
        }))
      }
    }
  }, [rxDataSource])

  useEffect(() => {
    if (!headerSelectionHydratedRef.current && !requestedDraftId) return

    const patientRecordId = String(prescription.patient.patientRecordId || '').trim()
    const tutorRecordId = String(prescription.tutor.tutorRecordId || '').trim()

    if (!patientRecordId && !tutorRecordId) {
      writeHeaderSelectionSession(null)
      return
    }

    writeHeaderSelectionSession({
      source: rxDataSource,
      clinicId: clinicId || null,
      patientRecordId,
      patientName: String(prescription.patient.name || '').trim(),
      tutorRecordId,
      tutorName: String(prescription.tutor.name || '').trim(),
    })
  }, [
    clinicId,
    prescription.patient.name,
    prescription.patient.patientRecordId,
    prescription.tutor.name,
    prescription.tutor.tutorRecordId,
    requestedDraftId,
    rxDataSource,
  ])

  useEffect(() => {
    if (headerSelectionHydratedRef.current) return
    headerSelectionHydratedRef.current = true

    if (requestedDraftId) return

    const sessionSelection = readHeaderSelectionSession()
    if (!sessionSelection) return
    if (sessionSelection.source !== rxDataSource) return

    // PATCH 2: Clean legacy non-UUID IDs when in Supabase mode
    if (sessionSelection.source === 'supabase') {
      const hasInvalidId =
        (sessionSelection.patientRecordId && !isUuid(sessionSelection.patientRecordId)) ||
        (sessionSelection.tutorRecordId && !isUuid(sessionSelection.tutorRecordId))
      if (hasInvalidId) {
        writeHeaderSelectionSession(null)
        return
      }
    }

    if (
      sessionSelection.source === 'supabase' &&
      sessionSelection.clinicId &&
      clinicId &&
      sessionSelection.clinicId !== clinicId
    ) {
      return
    }

    if (prescription.patient.patientRecordId || prescription.tutor.tutorRecordId) {
      return
    }

    let cancelled = false
      ; (async () => {
        try {
          const resolvedTutor = sessionSelection.tutorRecordId
            ? await rxAdapter.getTutorById(sessionSelection.tutorRecordId)
            : null

          let resolvedPatient = null
          if (
            sessionSelection.patientRecordId &&
            sessionSelection.tutorRecordId &&
            rxAdapter.listPatientsByTutorId
          ) {
            const patients = await rxAdapter.listPatientsByTutorId(sessionSelection.tutorRecordId)
            resolvedPatient =
              patients.find((entry) => entry.patientRecordId === sessionSelection.patientRecordId) || null
          }

          if (cancelled) return

          if (resolvedTutor && resolvedPatient) {
            applyPatientTutorToPrescription({
              patient: resolvedPatient,
              tutor: resolvedTutor,
            })
            return
          }

          updatePrescription((prev) => ({
            ...prev,
            patient: {
              ...prev.patient,
              patientRecordId: sessionSelection.patientRecordId || prev.patient.patientRecordId,
              name: resolvedPatient?.name || sessionSelection.patientName || prev.patient.name,
            },
            tutor: {
              ...prev.tutor,
              tutorRecordId: sessionSelection.tutorRecordId || prev.tutor.tutorRecordId,
              name: resolvedTutor?.name || sessionSelection.tutorName || prev.tutor.name,
            },
          }))
        } catch (error) {
          if (cancelled) return
          if (import.meta.env.DEV) {
            console.error('[RX B1.1.1] Falha ao reidratar cabecalho do plantao', error)
          }
        }
      })()

    return () => {
      cancelled = true
    }
  }, [
    applyPatientTutorToPrescription,
    clinicId,
    prescription.patient.patientRecordId,
    prescription.tutor.tutorRecordId,
    requestedDraftId,
    rxAdapter,
    rxDataSource,
  ])

  useEffect(() => {
    if (!requestedDraftId) {
      loadedRequestedDraftIdRef.current = ''
      return
    }
    if (loadedRequestedDraftIdRef.current === requestedDraftId) return

    const loaded = loadRxDraftById(requestedDraftId)
    if (!loaded) {
      pushToast('error', 'Rascunho não encontrado.')
      loadedRequestedDraftIdRef.current = requestedDraftId
      return
    }

    const hydrated = hydratePrescription(loaded)
    const selectedProfile = findProfileSettings(loadRxDb(), hydrated.prescriber.profileId)
    setPrescription(applyProfileToPrescription(hydrated, selectedProfile.profile, selectedProfile.id))
    setSaveStatus('saved')
    loadedRequestedDraftIdRef.current = requestedDraftId
    pushToast('success', 'Rascunho carregado com sucesso.')
  }, [requestedDraftId])

  useEffect(() => {
    if (!autosaveEnabled) return
    if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current)
    setSaveStatus('saving')
    saveTimeoutRef.current = window.setTimeout(() => {
      try {
        saveRxDraft(withTimestamp(prescription))
        setSaveStatus('saved')
      } catch {
        setSaveStatus('error')
      }
    }, 700)
    return () => {
      if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current)
    }
  }, [prescription, autosaveEnabled])

  useEffect(() => {
    const autoWater = calculateDefaultWaterMlPerDay(prescription.patient.weightKg)
    if (!autoWater) return
    const currentWater = (prescription.recommendations.waterMlPerDay || '').trim()
    const shouldApply = !currentWater || currentWater === lastAutoWaterValueRef.current
    if (!shouldApply || currentWater === autoWater) return
    lastAutoWaterValueRef.current = autoWater
    setPrescription((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      recommendations: {
        ...prev.recommendations,
        waterMlPerDay: autoWater,
      },
    }))
  }, [prescription.patient.weightKg, prescription.recommendations.waterMlPerDay])

  const saveNow = () => {
    try {
      const nextRx = withTimestamp({
        ...prescription,
        prescriber: {
          ...prescription.prescriber,
          adminId: 'ADMIN',
        },
        patient: {
          ...prescription.patient,
          patientRecordId: prescription.patient.patientRecordId || '',
        },
        tutor: {
          ...prescription.tutor,
          tutorRecordId: prescription.tutor.tutorRecordId || '',
        },
      })
      saveRxDraft(nextRx)
      const currentDb = loadRxDb()
      let nextDb = upsertPatientFromPrescription(currentDb, nextRx)
      nextDb = upsertClientFromPrescription(nextDb, nextRx)
      nextDb = upsertHistoryFromPrescription(nextDb, nextRx)
      saveRxDb(nextDb)
      setDb(nextDb)
      const tutorCpfDigits = digitsOnly(nextRx.tutor.cpf || '')
      const matchedClient =
        nextDb.clients.find((entry) => entry.id === nextRx.tutor.tutorRecordId) ||
        (tutorCpfDigits
          ? nextDb.clients.find((entry) => digitsOnly(entry.cpf || '') === tutorCpfDigits)
          : null) ||
        nextDb.clients.find((entry) => normalizeLooseText(entry.fullName) === normalizeLooseText(nextRx.tutor.name))
      const matchedAnimal =
        (matchedClient &&
          (matchedClient.animals.find((entry) => entry.id === nextRx.patient.patientRecordId) ||
            matchedClient.animals.find(
              (entry) => normalizeLooseText(entry.name) === normalizeLooseText(nextRx.patient.name)
            ))) ||
        null
      if (matchedClient || matchedAnimal) {
        setPrescription((prev) => ({
          ...prev,
          tutor: {
            ...prev.tutor,
            tutorRecordId: matchedClient?.id || prev.tutor.tutorRecordId,
          },
          patient: {
            ...prev.patient,
            patientRecordId: matchedAnimal?.id || prev.patient.patientRecordId,
          },
        }))
      }
      setSaveStatus('saved')
      pushToast('success', 'Rascunho salvo com sucesso.')
    } catch {
      setSaveStatus('error')
      pushToast('error', 'Falha ao salvar o rascunho.')
    }
  }

  // DEV: Save prescription to Supabase (draft mode)
  const saveToSupabase = async () => {
    if (rxDataSource !== 'supabase') {
      pushToast('error', 'Modo Supabase não ativado. Configure via VITE_RX_DATA_SOURCE.')
      return
    }

    const patientId = prescription.patient?.patientRecordId
    const tutorId = prescription.tutor?.tutorRecordId

    if (!isUuid(patientId) || !isUuid(tutorId)) {
      pushToast('error', 'Para salvar no Supabase, selecione um paciente/tutor do Supabase (não do legado/local).')
      console.warn('[saveToSupabase] IDs inválidos para Supabase', { patientId, tutorId })
      return
    }

    setSupabaseLoading(true)
    try {
      if (supabasePrescriptionId) {
        // Update existing
        const result = await updatePrescriptionDraft(supabasePrescriptionId, { content: prescription })
        pushToast('success', `Receita atualizada no Supabase (ID: ${result.id})`)
      } else {
        // Create new
        const result = await createPrescriptionDraft({
          patient_id: prescription.patient.patientRecordId,
          tutor_id: prescription.tutor.tutorRecordId,
          content: prescription,
        })
        setSupabasePrescriptionId(result.id)
        pushToast('success', `Receita criada no Supabase (ID: ${result.id})`)
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao salvar'
      pushToast('error', `Falha: ${msg}`)
      if (import.meta.env.DEV) console.error(error)
    } finally {
      setSupabaseLoading(false)
    }
  }

  // DEV: List prescriptions from Supabase
  const listSupabasePrescriptions = async () => {
    if (rxDataSource !== 'supabase') {
      pushToast('error', 'Modo Supabase não ativado.')
      return
    }

    if (!prescription.patient.patientRecordId) {
      pushToast('error', 'Paciente obrigatório para listar receitas.')
      return
    }

    setSupabaseLoading(true)
    try {
      const results = await listPrescriptionsByPatient(prescription.patient.patientRecordId)
      pushToast('info', `${results.length} receita(s) encontrada(s) no Supabase`)
      if (import.meta.env.DEV) {
        console.log('[Supabase Prescriptions]', results)
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao listar'
      pushToast('error', `Falha: ${msg}`)
      if (import.meta.env.DEV) console.error(error)
    } finally {
      setSupabaseLoading(false)
    }
  }

  const applyAutoInstructionIfNeeded = (item: PrescriptionItem, sourceState: PrescriptionState) => {
    if (!item.autoInstruction || item.manualEdited) return item
    return {
      ...item,
      instruction: buildAutoInstruction(item, sourceState),
    }
  }

  const openCreateModal = (category: ItemCategory = 'medication') => {
    const draft = createDefaultItem(category)
    setModalState({
      open: true,
      mode: 'create',
      autosave: true,
      useCatalog: true,
      draft: applyAutoInstructionIfNeeded(draft, prescription),
      originalItem: null,
    })
  }

  const openEditModal = (item: PrescriptionItem) => {
    setModalState({
      open: true,
      mode: 'edit',
      autosave: true,
      useCatalog: false,
      draft: { ...item },
      originalItem: { ...item },
    })
  }

  const commitModalDraft = (draft: PrescriptionItem) => {
    updatePrescription((prev) => ({
      ...prev,
      items: replaceItem(prev.items, draft),
    }))
  }

  const closeModal = (discard: boolean) => {
    if (discard && modalState.autosave && modalState.originalItem && modalState.draft) {
      updatePrescription((prev) => ({
        ...prev,
        items: replaceItem(prev.items, modalState.originalItem as PrescriptionItem),
      }))
    }

    if (discard && modalState.autosave && modalState.mode === 'create' && modalState.draft) {
      updatePrescription((prev) => ({
        ...prev,
        items: removeItem(prev.items, modalState.draft!.id),
      }))
    }

    setModalState(EMPTY_MODAL_STATE)
  }

  const saveModal = () => {
    if (!modalState.draft) return
    commitModalDraft(modalState.draft)
    setModalState(EMPTY_MODAL_STATE)
  }

  const updateModalDraft = (updater: (prev: PrescriptionItem) => PrescriptionItem) => {
    if (!modalState.draft) return
    const next = withTimestamp(applyAutoInstructionIfNeeded(updater(modalState.draft), prescription))
    setModalState((prev) => ({ ...prev, draft: next }))
    if (modalState.autosave) commitModalDraft(next)
  }

  const previewState = useMemo(() => {
    if (!modalState.open || modalState.autosave || !modalState.draft) return prescription
    return {
      ...prescription,
      items: replaceItem(prescription.items, modalState.draft),
    }
  }, [modalState, prescription])

  const previewSplitDocs = useMemo(() => splitPrescriptionByControl(previewState), [previewState])
  const previewPrintDocs = useMemo(() => {
    const docs: Array<ReturnType<typeof renderRxToPrintDoc>> = []
    if (previewSplitDocs.standard) docs.push(renderRxToPrintDoc(previewSplitDocs.standard, { documentKind: 'standard' }))
    if (previewSplitDocs.specialControl) docs.push(renderRxToPrintDoc(previewSplitDocs.specialControl, { documentKind: 'special-control' }))
    if (!docs.length) docs.push(renderRxToPrintDoc(previewState, { documentKind: 'standard' }))
    return docs
  }, [previewSplitDocs.specialControl, previewSplitDocs.standard, previewState])

  const selectedPreviewProfile = useMemo(
    () => prescriberProfiles.find((entry) => entry.id === previewState.prescriber.profileId) || db.profile,
    [db.profile, prescriberProfiles, previewState.prescriber.profileId]
  )
  const activeTemplate = useMemo(() => {
    const preferredStandardId = previewState.recommendations.standardTemplateId
    const preferred = preferredStandardId
      ? db.templates.find((entry) => entry.id === preferredStandardId && entry.documentKindTarget !== 'special-control')
      : null
    return preferred || db.templates.find((entry) => entry.id === db.activeTemplateId) || db.templates[0]
  }, [db.activeTemplateId, db.templates, previewState.recommendations.standardTemplateId])
  const standardTemplate = useMemo(() => {
    if (activeTemplate?.documentKindTarget !== 'special-control') return activeTemplate
    return db.templates.find((entry) => entry.documentKindTarget !== 'special-control') || activeTemplate
  }, [activeTemplate, db.templates])
  const specialControlTemplate = useMemo(() => {
    const preferredSpecialId = previewState.recommendations.specialControlTemplateId
    const preferred = preferredSpecialId
      ? db.templates.find((entry) => entry.id === preferredSpecialId && entry.documentKindTarget === 'special-control')
      : null
    return preferred || findSpecialControlTemplate(db.templates) || db.templates.find((entry) => entry.id === 'rx_br_control_special') || activeTemplate
  }, [activeTemplate, db.templates, previewState.recommendations.specialControlTemplateId])
  const previewSpecialControlTargetPharmacy = useMemo<SpecialControlPharmacy>(() => {
    const selected = previewState.recommendations.specialControlPharmacy
    if (selected === 'humana' || selected === 'manipulacao' || selected === 'veterinária') return selected
    return 'veterinária'
  }, [previewState.recommendations.specialControlPharmacy])

  const removePrescriptionItem = (itemId: string) => {
    updatePrescription((prev) => ({ ...prev, items: removeItem(prev.items, itemId) }))
  }

  const duplicatePrescriptionItem = (item: PrescriptionItem) => {
    updatePrescription((prev) => ({ ...prev, items: [...prev.items, cloneItem(item)] }))
    pushToast('success', 'Item duplicado.')
  }

  const movePrescriptionItem = (index: number, direction: -1 | 1) => {
    updatePrescription((prev) => ({ ...prev, items: moveItem(prev.items, index, direction) }))
  }

  const toggleExam = (exam: string, checked: boolean) => {
    const canonical = canonicalExamName(exam)
    const key = normalizeLooseText(canonical)
    updatePrescription((prev) => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        exams: checked
          ? uniqueNormalizedLines([...prev.recommendations.exams, canonical].map(canonicalExamName))
          : prev.recommendations.exams.filter((item) => normalizeLooseText(item) !== key),
        customExams: prev.recommendations.customExams.filter((item) => normalizeLooseText(item) !== key),
      },
    }))
  }

  const importProtocol = (protocol: RxProtocol) => {
    const now = new Date().toISOString()
    updatePrescription((prev) => {
      const importedItems = protocol.items.map((item) => ({
        ...item,
        controlled: protocol.requiresSpecialControl || !!item.controlled,
        id: `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        createdAt: now,
        updatedAt: now,
      }))
      const protocolExams = protocol.exams.filter(Boolean)
      const commonExamImports = protocolExams.filter((exam) =>
        COMMON_EXAMS.some((common) => normalizeLooseText(common) === normalizeLooseText(exam))
      )
      const customExamImports = protocolExams.filter(
        (exam) => !COMMON_EXAMS.some((common) => normalizeLooseText(common) === normalizeLooseText(exam))
      )
      return {
        ...prev,
        items: [...prev.items, ...importedItems],
        recommendations: {
          ...prev.recommendations,
          bullets: Array.from(new Set([...prev.recommendations.bullets, ...protocol.recommendations.filter(Boolean)])),
          exams: uniqueNormalizedLines([...prev.recommendations.exams, ...commonExamImports].map(canonicalExamName)),
          customExams: uniqueNormalizedLines([...prev.recommendations.customExams, ...customExamImports].map(canonicalExamName)),
          examReasons: uniqueNormalizedLines([...(prev.recommendations.examReasons || []), ...(protocol.examReasons || [])]),
        },
      }
    })
    setProtocolModalOpen(false)
    setProtocolSearch('')
    pushToast('success', `Protocolo \"${protocol.name}\" importado.`)
  }

  useEffect(() => {
    if (pendingProtocolImportRef.current) return
    const protocolId = localStorage.getItem('receituario-vet:protocol-to-import')
    if (!protocolId) return
    const protocol = db.protocols.find((entry) => entry.id === protocolId)
    localStorage.removeItem('receituario-vet:protocol-to-import')
    if (!protocol) return
    pendingProtocolImportRef.current = true
    importProtocol(protocol)
  }, [db.protocols])

  const hasSpecialControlItems = (previewSplitDocs.specialControl?.items.length || 0) > 0
  const patientSuggestions = db.patients
  const clientSuggestions: ClientRecord[] = db.clients || []
  const selectedClient = useMemo(
    () => clientSuggestions.find((entry) => entry.id === prescription.tutor.tutorRecordId) || null,
    [clientSuggestions, prescription.tutor.tutorRecordId]
  )
  const selectedClientAnimals = selectedClient?.animals || []
  const tutorCitySuggestions = useMemo(
    () => citySuggestionsForState(prescription.tutor.state || ''),
    [prescription.tutor.state]
  )

  const applyPatientFromBank = (name: string) => {
    const found = patientSuggestions.find((entry) => entry.name.toLowerCase() === name.trim().toLowerCase())
    if (!found) return
    updatePrescription((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        patientRecordId: found.id || '',
        name: found.name,
        species: normalizeSpecies(found.species),
        breed: found.breed,
        sex: normalizePatientSex(found.sex),
        ageText: found.ageText,
        weightKg: found.weightKg,
        color: (found as any).color || '',
        microchip: (found as any).microchip || '',
        anamnesis: (found as any).anamnesis || '',
      },
      tutor: {
        ...prev.tutor,
        tutorRecordId: prev.tutor.tutorRecordId || '',
        name: found.tutorName || prev.tutor.name,
        phone: found.tutorPhone || prev.tutor.phone,
        street: found.tutorAddress || prev.tutor.street || '',
      },
    }))
  }

  const applyClientFromBank = (clientId: string, animalId?: string) => {
    const client = clientSuggestions.find((entry) => entry.id === clientId)
    if (!client) return
    const animal = client.animals.find((entry) => entry.id === animalId) || client.animals[0]
    updatePrescription((prev) => ({
      ...prev,
      tutor: {
        ...prev.tutor,
        tutorRecordId: client.id,
        name: client.fullName || prev.tutor.name,
        phone: maskPhoneBr(client.phone || prev.tutor.phone || ''),
        cpf: maskCpf(client.cpf || ''),
        rg: maskRg(client.rg || ''),
        email: client.email || '',
        street: client.street || '',
        number: client.number || '',
        complement: client.complement || '',
        neighborhood: client.neighborhood || '',
        city: client.city || '',
        state: normalizeStateInput(client.state || ''),
        zipcode: maskCep(client.zipcode || ''),
        notes: client.notes || prev.tutor.notes,
      },
      patient: animal
        ? {
          ...prev.patient,
          patientRecordId: animal.id || prev.patient.patientRecordId,
          name: animal.name || prev.patient.name,
          species: normalizeSpecies(animal.species),
          breed: animal.breed || prev.patient.breed,
          coat: animal.coat || prev.patient.coat,
          color: (animal as any).color || '',
          microchip: (animal as any).microchip || '',
          sex: normalizePatientSex(animal.sex),
          reproductiveStatus: (animal.reproductiveStatus || prev.patient.reproductiveStatus) as PrescriptionState['patient']['reproductiveStatus'],
          ageText: animal.ageText || prev.patient.ageText,
          weightKg: animal.weightKg || prev.patient.weightKg,
          weightDate: animal.weightDate || prev.patient.weightDate,
          anamnesis: (animal as any).anamnesis || '',
        }
        : prev.patient,
    }))
    pushToast('success', `Cliente "${client.fullName || 'selecionado'}" importado.`)
  }

  const fetchCepForTutor = async (rawCep: string) => {
    const cepDigits = digitsOnly(rawCep).slice(0, 8)
    if (cepDigits.length !== 8) {
      setCepLookupMessage(null)
      return
    }

    setCepLookupLoading(true)
    setCepLookupMessage(null)
    const address = await lookupAddressByCep(cepDigits)
    setCepLookupLoading(false)

    if (!address) {
      setCepLookupMessage('CEP não encontrado.')
      return
    }

    updatePrescription((prev) => ({
      ...prev,
      tutor: {
        ...prev.tutor,
        zipcode: maskCep(address.cep || cepDigits),
        street: address.street || prev.tutor.street || '',
        neighborhood: address.district || prev.tutor.neighborhood || '',
        city: address.city || prev.tutor.city || '',
        state: normalizeStateInput(address.state || prev.tutor.state || ''),
        complement: prev.tutor.complement || address.complement || '',
      },
    }))
    setCepLookupMessage('Endereço preenchido pelo CEP.')
  }

  const applyPrescriberProfile = (profileId: string) => {
    const selected = prescriberProfiles.find((entry) => entry.id === profileId)
    if (!selected) return
    updatePrescription((prev) => ({
      ...prev,
      prescriber: toPrescriber(selected, selected.id),
    }))
    pushToast('success', `Perfil "${selected.profileName}" aplicado.`)
  }

  return (
    <ReceituarioChrome
      section="nova"
      title="Nova Receita"
      subtitle="Editor completo com visualização rápida em tempo real."
      actions={
        <>
          <StatusChip status={saveStatus} />
          <label className="rxv-btn-secondary rxv-top-action hidden items-center gap-2 px-3 py-2 text-xs sm:flex">
            <input type="checkbox" className="h-4 w-4 rounded" checked={autosaveEnabled} onChange={(e) => setAutosaveEnabled(e.target.checked)} />
            Autosave
          </label>
          <Link className="rxv-btn-secondary rxv-top-action inline-flex items-center gap-2 px-3 py-2 text-sm" to="/receituario-vet/configuração">
            <span className="material-symbols-outlined text-[18px]">badge</span>
            Configurar médico
          </Link>
          <Link className="rxv-btn-secondary rxv-top-action inline-flex items-center gap-2 px-3 py-2 text-sm" to="/receituario-vet/clientes">
            <span className="material-symbols-outlined text-[18px]">group</span>
            Tutores e pacientes
          </Link>
          <Link className="rxv-btn-secondary rxv-top-action inline-flex items-center gap-2 px-3 py-2 text-sm" to="/receituario-vet/catalogo">
            <span className="material-symbols-outlined text-[18px]">medication</span>
            Catálogo de fármacos
          </Link>
          <button type="button" className="rxv-btn-secondary rxv-top-action inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={() => setProtocolModalOpen(true)}>
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            Visualizar lista de protocolos prontos
          </button>
          <Link className="rxv-btn-secondary rxv-top-action inline-flex items-center gap-2 px-3 py-2 text-sm" to="/receituario-vet/controle-especial">
            <span className="material-symbols-outlined text-[18px]">gpp_maybe</span>
            Receituário de controle especial
          </Link>
          {import.meta.env.DEV && rxDataSource === 'supabase' && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-amber-700/60 bg-amber-900/20 px-3 py-2 text-xs text-amber-300 hover:bg-amber-900/40 disabled:opacity-50"
                onClick={saveToSupabase}
                disabled={supabaseLoading}
              >
                {supabaseLoading ? '⏳' : '💾'} {supabasePrescriptionId ? 'Atualizar' : 'Salvar'} Supabase
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-700/60 bg-cyan-900/20 px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-900/40 disabled:opacity-50"
                onClick={listSupabasePrescriptions}
                disabled={supabaseLoading}
              >
                {supabaseLoading ? '⏳' : '📋'} Listar Supabase
              </button>
            </>
          )}
          <button type="button" className="rxv-btn-secondary rxv-top-action px-3 py-2 text-sm" onClick={saveNow}>
            Salvar rascunho
          </button>
          <button type="button" className="rxv-btn-secondary rxv-top-action px-3 py-2 text-sm" onClick={() => { saveNow(); navigate(`/receituario-vet/rx/${prescription.id}/print?mode=review`) }}>
            Revisar
          </button>
          <button type="button" className="rxv-btn-primary rxv-top-action px-3 py-2 text-sm" onClick={() => { saveNow(); navigate(`/receituario-vet/rx/${prescription.id}/print`) }}>
            Imprimir / Exportar
          </button>
        </>
      }
    >
      <div className="flex items-center gap-2 rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-3 text-sm lg:hidden">
        <button type="button" className={`flex-1 rounded-lg px-3 py-1.5 ${mobileTab === 'editor' ? 'bg-[#38ff14] font-semibold text-[#10200d]' : 'bg-[#22381d]'}`} onClick={() => setMobileTab('editor')}>
          Editor
        </button>
        <button type="button" className={`flex-1 rounded-lg px-3 py-1.5 ${mobileTab === 'preview' ? 'bg-[#38ff14] font-semibold text-[#10200d]' : 'bg-[#22381d]'}`} onClick={() => setMobileTab('preview')}>
          Prévia
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className={`space-y-6 lg:col-span-5 ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
          <section className="rxv-card p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-[color:var(--rxv-text)]">Fluxo Plantao</h2>
              <span className="rounded-full border border-[#3d6f31] bg-[#233c1d] px-2 py-0.5 text-xs text-[#8cff78]">
                Fonte: {rxDataSource === 'supabase' ? 'Supabase' : 'Local'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
              {rxDataSource === 'local' ? (
                <>
                  <PatientQuickSelect
                    adapter={rxAdapter}
                    disabled={supabaseModeWithoutClinic}
                    onPick={(payload) => {
                      applyPatientTutorToPrescription(payload)
                      pushToast('success', `Paciente "${payload.patient.name}" aplicado na receita.`)
                    }}
                    onError={(error) => handleDataAdapterError('search', error)}
                  />
                  <div className="flex items-end">
                    <button
                      type="button"
                      className="rxv-btn-primary h-[42px] px-3 py-2 text-sm"
                      onClick={() => setPatientCreateModalOpen(true)}
                      disabled={supabaseModeWithoutClinic}
                    >
                      + Novo paciente
                    </button>
                  </div>
                </>
              ) : (
                <div className="col-span-2 space-y-3">
                  {/* IMPORTAÇÃO SUPABASE: Busca de tutor + pacientes */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Importar Tutor do Banco
                    </label>
                    <TutorQuickSelect
                      adapter={rxAdapter}
                      value={selectedSupabaseTutor}
                      disabled={supabaseModeWithoutClinic}
                      placeholder="Buscar tutor por nome..."
                      onPick={(tutor) => {
                        setSelectedSupabaseTutor(tutor)
                        // Apply tutor to prescription
                        updatePrescription((prev) => ({
                          ...prev,
                          tutor: {
                            ...prev.tutor,
                            tutorRecordId: tutor.tutorRecordId,
                            name: tutor.name,
                            phone: tutor.phone || prev.tutor.phone,
                            cpf: tutor.cpf || prev.tutor.cpf,
                            rg: tutor.rg || prev.tutor.rg,
                            email: tutor.email || prev.tutor.email,
                            street: tutor.street || prev.tutor.street,
                            number: tutor.number || prev.tutor.number,
                            complement: tutor.complement || prev.tutor.complement,
                            neighborhood: tutor.neighborhood || prev.tutor.neighborhood,
                            city: tutor.city || prev.tutor.city,
                            state: tutor.state || prev.tutor.state,
                            zipcode: tutor.zipcode || prev.tutor.zipcode,
                            notes: tutor.notes || prev.tutor.notes,
                          },
                        }))
                        // Load patients for this tutor
                        if (rxAdapter.listPatientsByTutorId) {
                          setSupabasePatientsLoading(true)
                          setSupabasePatientsForTutor([])
                          void rxAdapter.listPatientsByTutorId(tutor.tutorRecordId)
                            .then((patients) => {
                              setSupabasePatientsForTutor(patients)
                              // Auto-select first patient if only one
                              if (patients.length === 1) {
                                const p = patients[0]
                                updatePrescription((prev) => ({
                                  ...prev,
                                  patient: {
                                    ...prev.patient,
                                    patientRecordId: p.patientRecordId,
                                    name: p.name,
                                    species: p.species,
                                    breed: p.breed || prev.patient.breed,
                                    sex: p.sex || prev.patient.sex,
                                    reproductiveStatus: p.reproductiveStatus || prev.patient.reproductiveStatus,
                                    ageText: p.ageText || prev.patient.ageText,
                                    coat: p.coat || prev.patient.coat,
                                    weightKg: p.weightKg || prev.patient.weightKg,
                                    weightDate: p.weightDate || prev.patient.weightDate,
                                  },
                                }))
                                pushToast('success', `Tutor "${tutor.name}" e paciente "${p.name}" importados.`)
                              } else {
                                pushToast('success', `Tutor "${tutor.name}" importado. Selecione o paciente.`)
                              }
                            })
                            .catch(() => pushToast('error', 'Erro ao buscar pacientes do tutor.'))
                            .finally(() => setSupabasePatientsLoading(false))
                        } else {
                          pushToast('success', `Tutor "${tutor.name}" importado.`)
                        }
                      }}
                      onError={(error) => handleDataAdapterError('search', error)}
                    />
                  </div>

                  {/* Lista de pacientes do tutor selecionado */}
                  {selectedSupabaseTutor && (
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Paciente do tutor
                        {supabasePatientsLoading && <span className="ml-2 text-slate-500">carregando...</span>}
                      </label>
                      {!supabasePatientsLoading && supabasePatientsForTutor.length === 0 && (
                        <p className="rounded-lg border border-[#3b6c2f]/60 bg-[#12270f] px-3 py-2 text-xs text-[#a8e79b]">
                          Nenhum paciente cadastrado para este tutor. Cadastre um na aba Tutores e Pacientes.
                        </p>
                      )}
                      {supabasePatientsForTutor.length > 0 && (
                        <select
                          className="w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white outline-none ring-[#3cff1a] focus:ring-1"
                          value={prescription.patient.patientRecordId || ''}
                          onChange={(e) => {
                            const pid = e.target.value
                            const p = supabasePatientsForTutor.find((entry) => entry.patientRecordId === pid)
                            if (!p) return
                            updatePrescription((prev) => ({
                              ...prev,
                              patient: {
                                ...prev.patient,
                                patientRecordId: p.patientRecordId,
                                name: p.name,
                                species: p.species,
                                breed: p.breed || prev.patient.breed,
                                sex: p.sex || prev.patient.sex,
                                reproductiveStatus: p.reproductiveStatus || prev.patient.reproductiveStatus,
                                ageText: p.ageText || prev.patient.ageText,
                                coat: p.coat || prev.patient.coat,
                                weightKg: p.weightKg || prev.patient.weightKg,
                                weightDate: p.weightDate || prev.patient.weightDate,
                              },
                            }))
                            pushToast('success', `Paciente "${p.name}" aplicado na receita.`)
                          }}
                        >
                          <option value="">Selecione o paciente</option>
                          {supabasePatientsForTutor.map((p) => (
                            <option key={p.patientRecordId} value={p.patientRecordId}>
                              {p.name} ({p.species || 'Canina'}{p.weightKg ? ` - ${p.weightKg} kg` : ''})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}

                  {/* Botão para cadastrar novo tutor/paciente */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="rxv-btn-secondary px-3 py-2 text-xs"
                      onClick={() => navigate('/receituario-vet/clientes')}
                    >
                      + Cadastrar novo tutor/paciente
                    </button>
                  </div>
                </div>
              )}
            </div>
            {supabaseModeWithoutClinic ? (
              <p className="mt-2 text-xs text-amber-300">
                Clínica ativa não encontrada. Selecione uma clínica para usar modo Supabase.
              </p>
            ) : null}
          </section>

          <section className="rxv-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[color:var(--rxv-text)]">Identificação</h2>
              <span className="rounded-full border border-[#3d6f31] bg-[#233c1d] px-2 py-0.5 text-xs text-[#8cff78]">Editável</span>
            </div>
            <div className="mb-3 rounded-lg border border-[#2f5a25] bg-[#142712] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--rxv-text)]">
              Prescritor
            </div>
            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-4">
              <label className="text-xs text-slate-400 md:col-span-2">
                Perfil de médico veterinário / clínica
                <select
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={prescription.prescriber.profileId || 'default'}
                  onChange={(e) => applyPrescriberProfile(e.target.value)}
                >
                  {prescriberProfiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.profileName} - {profile.clinicName}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs text-slate-400">
                ID
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.adminId || 'ADMIN'} readOnly />
              </label>
              <label className="text-xs text-slate-400">
                Nome do prescritor
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, name: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                CRMV
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.crmv} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, crmv: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Clínica
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.clinicName} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, clinicName: e.target.value } }))} />
              </label>
            </div>

            <div className="mb-3 mt-5 rounded-lg border border-[#2f5a25] bg-[#142712] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--rxv-text)]">
              Tutor / Responsável {hasSpecialControlItems ? '(controle especial)' : ''}
            </div>
            {hasSpecialControlItems ? (
              <div className="mb-3 rounded-lg border px-3 py-2 text-xs" style={{ borderColor: 'var(--rxv-warning-border)', background: 'var(--rxv-warning-bg)', color: 'var(--rxv-warning-text)' }}>
                Receita com item controlado detectada. Preencha os dados completos do tutor para rastreabilidade sanitária.
              </div>
            ) : null}
            {rxDataSource === 'local' && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="text-xs text-slate-400 md:col-span-2">
                  Importar do banco de tutores/pacientes
                  <select
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={selectedClient?.id || ''}
                    onChange={(e) => {
                      const clientId = e.target.value
                      if (!clientId) return
                      applyClientFromBank(clientId)
                    }}
                  >
                    <option value="">Selecione um tutor cadastrado</option>
                    {clientSuggestions.map((client) => (
                      <option key={client.id} value={client.id}>
                        #{client.id} - {client.fullName} {client.cpf ? `- CPF ${client.cpf}` : ''}
                      </option>
                    ))}
                  </select>
                </label>
                {selectedClient && selectedClientAnimals.length > 0 ? (
                  <label className="text-xs text-slate-400 md:col-span-2">
                    Paciente do tutor selecionado
                    <select
                      className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                      value={prescription.patient.patientRecordId}
                      onChange={(e) => applyClientFromBank(selectedClient.id, e.target.value)}
                    >
                      {selectedClientAnimals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                          #{animal.id} - {animal.name} ({animal.species || 'Canina'})
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
                {selectedClient && selectedClientAnimals.length === 0 ? (
                  <p className="rounded-lg border border-[#3b6c2f] bg-[#12270f] px-3 py-2 text-xs text-[#a8e79b] md:col-span-2">
                    Este tutor ainda não possui paciente cadastrado. Você pode preencher os dados do paciente manualmente abaixo.
                  </p>
                ) : null}
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="text-xs text-slate-400">
                ID/Registro tutor
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.tutorRecordId} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, tutorRecordId: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Nome *
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, name: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Telefone
                <input
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  inputMode="tel"
                  maxLength={15}
                  placeholder="(00) 00000-0000"
                  value={prescription.tutor.phone || ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, phone: maskPhoneBr(e.target.value) } }))}
                />
              </label>
              {hasSpecialControlItems ? (
                <>
                  <label className="text-xs text-slate-400">
                    CPF *
                    <input
                      className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                      inputMode="numeric"
                      maxLength={14}
                      placeholder="000.000.000-00"
                      value={prescription.tutor.cpf || ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, cpf: maskCpf(e.target.value) } }))}
                    />
                  </label>
                  <label className="text-xs text-slate-400">
                    RG
                    <input
                      className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                      maxLength={12}
                      placeholder="00.000.000-0"
                      value={prescription.tutor.rg || ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, rg: maskRg(e.target.value) } }))}
                    />
                  </label>
                  <label className="text-xs text-slate-400 md:col-span-2">
                    Rua *
                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.street || ''} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, street: e.target.value } }))} />
                  </label>
                  <label className="text-xs text-slate-400">
                    Número *
                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.number || ''} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, number: e.target.value } }))} />
                  </label>
                  <label className="text-xs text-slate-400">
                    Complemento
                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.complement || ''} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, complement: e.target.value } }))} />
                  </label>
                  <label className="text-xs text-slate-400">
                    Bairro *
                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.neighborhood || ''} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, neighborhood: e.target.value } }))} />
                  </label>
                  <label className="text-xs text-slate-400">
                    Cidade *
                    <input
                      className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                      list="rx-tutor-city-options"
                      placeholder="Digite ou selecione a cidade"
                      value={prescription.tutor.city || ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, city: e.target.value } }))}
                    />
                  </label>
                  <label className="text-xs text-slate-400">
                    Estado *
                    <input
                      className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                      list="rx-tutor-state-options"
                      placeholder="UF ou nome do estado"
                      value={prescription.tutor.state || ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, state: e.target.value } }))}
                      onBlur={(e) =>
                        updatePrescription((prev) => ({
                          ...prev,
                          tutor: { ...prev.tutor, state: normalizeStateInput(e.target.value || prev.tutor.state || '') },
                        }))
                      }
                    />
                  </label>
                  <label className="text-xs text-slate-400">
                    CEP *
                    <div className="mt-1 flex gap-2">
                      <input
                        className="w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                        inputMode="numeric"
                        maxLength={9}
                        placeholder="00000-000"
                        value={prescription.tutor.zipcode || ''}
                        onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, zipcode: maskCep(e.target.value) } }))}
                        onBlur={(e) => void fetchCepForTutor(e.target.value)}
                      />
                      <button
                        type="button"
                        className="rounded-lg border border-[#3f6f31] px-2 text-xs font-semibold text-slate-200 hover:bg-[#1f3619]"
                        disabled={cepLookupLoading}
                        onClick={() => void fetchCepForTutor(prescription.tutor.zipcode || '')}
                      >
                        {cepLookupLoading ? '...' : 'Buscar'}
                      </button>
                    </div>
                  </label>
                  <datalist id="rx-tutor-state-options">
                    {BRAZIL_STATE_SUGGESTIONS.map((entry) => (
                      <option key={entry} value={entry} />
                    ))}
                  </datalist>
                  <datalist id="rx-tutor-city-options">
                    {tutorCitySuggestions.map((entry) => (
                      <option key={entry} value={entry} />
                    ))}
                  </datalist>
                  {cepLookupMessage ? <p className="text-[11px] font-semibold text-[#9be78c] md:col-span-2">{cepLookupMessage}</p> : null}
                </>
              ) : null}
              <label className="text-xs text-slate-400 md:col-span-2">
                Observações do tutor
                <textarea className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" rows={2} value={prescription.tutor.notes} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, notes: e.target.value } }))} />
              </label>
            </div>

            <div className="mb-3 mt-5 rounded-lg border border-[#2f5a25] bg-[#142712] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--rxv-text)]">
              Paciente
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="text-xs text-slate-400">
                ID/Registro do paciente
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.patientRecordId} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, patientRecordId: e.target.value } }))} />
              </label>
              {selectedClient && selectedClientAnimals.length > 0 ? (
                <label className="text-xs text-slate-400">
                  Selecionar paciente deste tutor
                  <select
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={prescription.patient.patientRecordId}
                    onChange={(e) => applyClientFromBank(selectedClient.id, e.target.value)}
                  >
                    {selectedClientAnimals.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        #{animal.id} - {animal.name} ({animal.species || 'Canina'})
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <label className="text-xs text-slate-400">
                  Nome do animal *
                  <div className="mt-1 flex gap-2">
                    <input
                      list="rx-patient-bank"
                      className="w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                      value={prescription.patient.name}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, name: e.target.value } }))}
                    />
                    <button
                      type="button"
                      className="rounded-lg border border-[#3f6f31] bg-[#1f3319] px-3 py-2 text-xs font-semibold text-[#9cff8c] hover:bg-[#26431f]"
                      onClick={() => applyPatientFromBank(prescription.patient.name)}
                    >
                      Carregar
                    </button>
                  </div>
                </label>
              )}
              <datalist id="rx-patient-bank">
                {patientSuggestions.map((patient) => (
                  <option key={patient.id} value={patient.name} />
                ))}
              </datalist>
              {selectedClient && selectedClientAnimals.length > 0 ? (
                <label className="text-xs text-slate-400 md:col-span-2">
                  Nome do animal *
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={prescription.patient.name}
                    onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, name: e.target.value } }))}
                  />
                </label>
              ) : null}
              <label className="text-xs text-slate-400">
                Espécie *
                <select
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={prescription.patient.species}
                  onChange={(e) =>
                    updatePrescription((prev) => ({
                      ...prev,
                      patient: {
                        ...prev.patient,
                        species: e.target.value as PrescriptionState['patient']['species'],
                        breed: '',
                        coat: '',
                      },
                    }))
                  }
                >
                  <option value="Canina">Canina</option>
                  <option value="Felina">Felina</option>
                </select>
              </label>
              <label className="text-xs text-slate-400">
                Raça
                <input
                  list="rx-breed-options"
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={prescription.patient.breed}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, breed: e.target.value } }))}
                  placeholder={prescription.patient.species === 'Canina' ? 'Ex.: Labrador Retriever' : 'Ex.: Siamês'}
                />
              </label>
              <datalist id="rx-breed-options">
                {breedOptions.map((breed) => (
                  <option key={breed} value={breed} />
                ))}
              </datalist>
              <label className="text-xs text-slate-400">
                Sexo
                <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.sex} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, sex: e.target.value as PrescriptionState['patient']['sex'] } }))}>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                  <option value="Sem dados">Sem dados</option>
                </select>
              </label>
              <label className="text-xs text-slate-400">
                Condição reprodutiva
                <select
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={prescription.patient.reproductiveStatus}
                  onChange={(e) =>
                    updatePrescription((prev) => ({
                      ...prev,
                      patient: { ...prev.patient, reproductiveStatus: e.target.value as PrescriptionState['patient']['reproductiveStatus'] },
                    }))
                  }
                >
                  <option value="Castrado">Castrado</option>
                  <option value="Fértil">Fértil</option>
                  <option value="Sem dados">Sem dados</option>
                </select>
              </label>
              <label className="text-xs text-slate-400">
                Idade
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.ageText} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, ageText: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Nascimento
                <input type="date" className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.birthDate} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, birthDate: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Pelagem
                <input
                  list="rx-coat-options"
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={prescription.patient.coat}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, coat: e.target.value } }))}
                  placeholder={prescription.patient.species === 'Canina' ? 'Ex.: Caramelo' : 'Ex.: Rajado clássico'}
                />
              </label>
              <datalist id="rx-coat-options">
                {coatOptions.map((coat) => (
                  <option key={coat} value={coat} />
                ))}
              </datalist>
              <label className="text-xs text-slate-400">
                Peso (kg) *
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.weightKg} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, weightKg: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Cor
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.color} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, color: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Microchip
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.microchip} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, microchip: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400 md:col-span-2">
                Anamnese / Histórico
                <textarea className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" rows={2} value={prescription.patient.anamnesis} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, anamnesis: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400 md:col-span-2">
                Observações do paciente
                <textarea className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" rows={2} value={prescription.patient.notes} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, notes: e.target.value } }))} />
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300 md:col-span-2">
                <input type="checkbox" className="h-4 w-4 rounded border-[#3f6f31] bg-[#12230f]" checked={prescription.patient.showNotesInPrint} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, showNotesInPrint: e.target.checked } }))} />
                Exibir observações do paciente na impressão
              </label>
            </div>
          </section>

          <section className="rxv-card p-5">
            <h2 className="mb-4 text-lg font-bold text-white">Template da Receita Padrão</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
              <label className="text-xs text-slate-400">
                Modelo da receita normal
                <select
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={prescription.recommendations.standardTemplateId || activeTemplate?.id || ''}
                  onChange={(e) =>
                    updatePrescription((prev) => ({
                      ...prev,
                      recommendations: {
                        ...prev.recommendations,
                        standardTemplateId: e.target.value,
                      },
                    }))
                  }
                >
                  {db.templates
                    .filter((entry) => entry.documentKindTarget !== 'special-control')
                    .map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                </select>
              </label>
              <div className="flex items-end">
                <Link
                  to={`/receituario-vet/templates?template=${encodeURIComponent(prescription.recommendations.standardTemplateId || activeTemplate?.id || '')}`}
                  state={{ from: '/receituario-vet/nova-receita' }}
                  className="rxv-btn-secondary inline-flex h-[38px] items-center gap-2 px-3 py-2 text-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">palette</span>
                  Editar template
                </Link>
              </div>
            </div>
          </section>

          <section className="rxv-card p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-white">Itens da Prescrição</h2>
              <div className="flex gap-2">
                <button type="button" className="rxv-btn-secondary px-3 py-1.5 text-sm" onClick={() => setProtocolModalOpen(true)}>
                  Visualizar lista de protocolos prontos
                </button>
                <button type="button" className="rxv-btn-primary px-3 py-1.5 text-sm" onClick={() => openCreateModal('medication')}>
                  + Adicionar medicamento
                </button>
                <button type="button" className="rxv-btn-secondary px-3 py-1.5 text-sm" onClick={() => openCreateModal('hygiene')}>
                  + Produto higiene
                </button>
                <button type="button" className="rxv-btn-secondary px-3 py-1.5 text-sm" onClick={() => openCreateModal('other')}>
                  + Item livre
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {prescription.items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#345f2a] bg-[#142712] px-4 py-6 text-center text-sm text-slate-400">
                  Nenhum item adicionado.
                </div>
              ) : (
                prescription.items.map((item, index) => {
                  const status = itemStatus(item, prescription)
                  const qty = calculateMedicationQuantity(item, prescription)
                  return (
                    <article key={item.id} className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-[color:var(--rxv-text)]">
                            {item.name || 'Item sem nome'} {item.concentration ? <span className="text-[color:var(--rxv-muted)]">({item.concentration})</span> : null}
                            {item.commercialName ? <span className="text-[color:var(--rxv-primary)]"> ({item.commercialName})</span> : null}
                          </h3>
                          <p className="text-sm text-[color:var(--rxv-muted)]">
                            Via {item.routeGroup} - {item.frequencyType === 'everyHours' ? `a cada ${item.everyHours || '?'} h` : `${item.timesPerDay || '?'}x/dia`} {item.durationDays ? `- ${item.durationDays} dia(s)` : ''}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-[color:var(--rxv-primary)]">{qty.label}</p>
                          {item.controlled ? <p className="mt-1 text-xs font-bold text-amber-400">Receita controlada</p> : null}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {status !== 'ok' ? (
                            <span className="rounded-full border border-amber-700/60 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-300">
                              incompleto
                            </span>
                          ) : null}
                          <button type="button" className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs hover:bg-[color:var(--rxv-surface)]" onClick={() => movePrescriptionItem(index, -1)}>↑</button>
                          <button type="button" className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs hover:bg-[color:var(--rxv-surface)]" onClick={() => movePrescriptionItem(index, 1)}>↓</button>
                          <button type="button" className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs hover:bg-[color:var(--rxv-surface)]" onClick={() => openEditModal(item)}>Editar</button>
                          <button type="button" className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs hover:bg-[color:var(--rxv-surface)]" onClick={() => duplicatePrescriptionItem(item)}>Duplicar</button>
                          <button type="button" className="rounded border border-red-800/70 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40" onClick={() => removePrescriptionItem(item.id)}>Remover</button>
                        </div>
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </section>

          <section className="rxv-card p-5">
            <h2 className="mb-4 text-lg font-bold text-[color:var(--rxv-text)]">Recomendações</h2>
            <div className="space-y-2">
              {prescription.recommendations.bullets.map((bullet, idx) => (
                <div key={`bullet-${idx}`} className="flex gap-2">
                  <textarea
                    className="flex-1 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-3 py-2 text-sm text-[color:var(--rxv-text)]"
                    rows={2}
                    value={bullet}
                    onChange={(e) =>
                      updatePrescription((prev) => ({
                        ...prev,
                        recommendations: {
                          ...prev.recommendations,
                          bullets: prev.recommendations.bullets.filter((_, i) => i !== idx),
                        },
                      }))
                    }
                  />
                  <button type="button" className="rounded border border-red-800/70 px-2 text-xs text-red-300 hover:bg-red-950/40" onClick={() => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, bullets: prev.recommendations.bullets.filter((_, i) => i !== idx) } }))}>
                    Remover
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <button type="button" className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-xs hover:bg-[color:var(--rxv-surface)]" onClick={() => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, bullets: [...prev.recommendations.bullets, ''] } }))}>
                + adicionar recomendação
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="text-xs text-[color:var(--rxv-muted)]">
                Meta de água (mL/dia)
                <input className="mt-1 w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-3 py-2 text-sm text-[color:var(--rxv-text)]" value={prescription.recommendations.waterMlPerDay} onChange={(e) => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, waterMlPerDay: e.target.value } }))} />
                <span className="mt-1 block text-[11px] text-[color:var(--rxv-muted)]">Padrão automático: 60 mL/kg/dia (editável).</span>
              </label>
            </div>

            <div className="mt-5">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[color:var(--rxv-text)]">Exames sugeridos</h3>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {COMMON_EXAMS.map((exam) => (
                  <label key={exam} className="flex items-center gap-2 text-sm text-[color:var(--rxv-text)]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)]"
                      checked={prescription.recommendations.exams.some((entry) => normalizeLooseText(entry) === normalizeLooseText(exam))}
                      onChange={(e) => toggleExam(exam, e.target.checked)}
                    />
                    {exam}
                  </label>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input className="flex-1 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-3 py-2 text-sm text-[color:var(--rxv-text)]" value={customExamDraft} onChange={(e) => setCustomExamDraft(e.target.value)} placeholder="Adicionar exame personalizado" />
                <button type="button"
                  className="rounded border border-[color:var(--rxv-border)] px-3 py-1.5 text-sm hover:bg-[color:var(--rxv-surface)]"
                  onClick={() => {
                    if (!customExamDraft.trim()) return
                    const canonical = canonicalExamName(customExamDraft.trim())
                    const isCommon = COMMON_EXAMS.some((entry) => normalizeLooseText(entry) === normalizeLooseText(canonical))
                    updatePrescription((prev) => ({
                      ...prev,
                      recommendations: {
                        ...prev.recommendations,
                        exams: isCommon ? uniqueNormalizedLines([...prev.recommendations.exams, canonical]) : prev.recommendations.exams,
                        customExams: isCommon
                          ? prev.recommendations.customExams
                          : uniqueNormalizedLines([...prev.recommendations.customExams, canonical]),
                      },
                    }))
                    setCustomExamDraft('')
                  }}
                >
                  Adicionar
                </button>
              </div>
              {prescription.recommendations.customExams.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {prescription.recommendations.customExams.map((exam, idx) => (
                    <button type="button" key={`${exam}-${idx}`} className="rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-2 py-1 text-xs text-[color:var(--rxv-text)]" onClick={() => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, customExams: prev.recommendations.customExams.filter((_, i) => i !== idx) } }))}>
                      {exam} x
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[color:var(--rxv-text)]">Justificativas dos exames (opcional)</p>
                {prescription.recommendations.examReasons.length > 0 ? (
                  <div className="space-y-2">
                    {prescription.recommendations.examReasons.map((reason, idx) => (
                      <div key={`exam-reason-${idx}`} className="flex gap-2">
                        <textarea
                          className="flex-1 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-3 py-2 text-sm text-[color:var(--rxv-text)]"
                          rows={2}
                          value={reason}
                          onChange={(e) =>
                            updatePrescription((prev) => ({
                              ...prev,
                              recommendations: {
                                ...prev.recommendations,
                                examReasons: prev.recommendations.examReasons.filter((_, i) => i !== idx),
                              },
                            }))
                          }
                        />
                        <button
                          type="button"
                          className="rounded border border-red-800/70 px-2 text-xs text-red-300 hover:bg-red-950/40"
                          onClick={() =>
                            updatePrescription((prev) => ({
                              ...prev,
                              recommendations: {
                                ...prev.recommendations,
                                examReasons: prev.recommendations.examReasons.filter((_, i) => i !== idx),
                              },
                            }))
                          }
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[color:var(--rxv-muted)]">Nenhuma justificativa adicionada.</p>
                )}
                <div className="mt-2 flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] px-3 py-2 text-sm text-[color:var(--rxv-text)]"
                    value={examReasonDraft}
                    onChange={(e) => setExamReasonDraft(e.target.value)}
                    placeholder="Ex.: Tomografia indicada por suspeita de massa intracraniana."
                  />
                  <button
                    type="button"
                    className="rounded border border-[color:var(--rxv-border)] px-3 py-1.5 text-sm hover:bg-[color:var(--rxv-surface)]"
                    onClick={() => {
                      if (!examReasonDraft.trim()) return
                      updatePrescription((prev) => ({
                        ...prev,
                        recommendations: {
                          ...prev.recommendations,
                          examReasons: [...prev.recommendations.examReasons, examReasonDraft.trim()],
                        },
                      }))
                      setExamReasonDraft('')
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {hasSpecialControlItems ? (
            <section className="rxv-card p-5">
              <h2 className="mb-2 text-lg font-bold text-white">Receita de Controle Especial</h2>
              <p className="mb-3 text-xs text-slate-400">
                Selecione o tipo de farmácia para marcar automaticamente no modelo da receita controlada.
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="text-xs text-slate-400">
                  Tipo de farmácia da receita controlada
                  <select
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={prescription.recommendations.specialControlPharmacy}
                    onChange={(e) =>
                      updatePrescription((prev) => ({
                        ...prev,
                        recommendations: {
                          ...prev.recommendations,
                          specialControlPharmacy: e.target.value as SpecialControlPharmacy,
                        },
                      }))
                    }
                  >
                    <option value="veterinária">Farmácia veterinária</option>
                    <option value="manipulacao">Farmácia de manipulação</option>
                    <option value="humana">Farmácia humana</option>
                  </select>
                </label>
                <label className="text-xs text-slate-400">
                  Template da receita controlada
                  <select
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={prescription.recommendations.specialControlTemplateId || specialControlTemplate?.id || ''}
                    onChange={(e) =>
                      updatePrescription((prev) => ({
                        ...prev,
                        recommendations: {
                          ...prev.recommendations,
                          specialControlTemplateId: e.target.value,
                        },
                      }))
                    }
                  >
                    {db.templates
                      .filter((entry) => entry.documentKindTarget === 'special-control')
                      .map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                  </select>
                </label>
                <div className="md:col-span-2">
                  <Link
                    to={`/receituario-vet/templates?template=${encodeURIComponent(
                      prescription.recommendations.specialControlTemplateId || specialControlTemplate?.id || 'rx_br_control_special'
                    )}&kind=special-control`}
                    state={{ from: '/receituario-vet/nova-receita' }}
                    className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">palette</span>
                    Editar template controlado
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          <section className="grid grid-cols-1 gap-2 md:hidden">
            <Link className="rxv-btn-secondary px-3 py-2 text-center text-sm" to="/receituario-vet/configuração">Configurar médico</Link>
            <Link className="rxv-btn-secondary px-3 py-2 text-center text-sm" to="/receituario-vet/clientes">Tutores e pacientes</Link>
            <Link className="rxv-btn-secondary px-3 py-2 text-center text-sm" to="/receituario-vet/catalogo">Catálogo de fármacos</Link>
            <button type="button" className="rxv-btn-secondary px-3 py-2 text-sm" onClick={() => setProtocolModalOpen(true)}>
              Visualizar lista de protocolos prontos
            </button>
            <button type="button" className="rxv-btn-secondary px-3 py-2 text-sm" onClick={saveNow}>
              Salvar rascunho
            </button>
            <button type="button" className="rxv-btn-secondary px-3 py-2 text-sm" onClick={() => { saveNow(); navigate(`/receituario-vet/rx/${prescription.id}/print?mode=review`) }}>
              Revisar
            </button>
            <button type="button" className="rxv-btn-primary px-3 py-2 text-sm" onClick={() => { saveNow(); navigate(`/receituario-vet/rx/${prescription.id}/print`) }}>
              Imprimir / Exportar
            </button>
          </section>
        </div>

        <aside className={`lg:col-span-7 ${mobileTab === 'editor' ? 'hidden lg:block' : ''}`}>
          <div className="sticky top-24">
            <div className="max-h-[calc(100vh-7.5rem)] space-y-4 overflow-y-auto pr-1 overscroll-contain">
              {previewPrintDocs.map((doc, idx) => (
                <div key={`preview-doc-${doc.documentKind || 'standard'}-${idx}`} className="space-y-2">
                  <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">
                    {doc.documentKind === 'special-control' ? 'Prévia: Receita de controle especial' : 'Prévia: Receita padrão'}
                  </div>
                  <RxPrintView
                    doc={doc}
                    template={doc.documentKind === 'special-control' ? specialControlTemplate : standardTemplate}
                    signatureDataUrl={selectedPreviewProfile.signatureDataUrl}
                    mapaSignatureDataUrl={selectedPreviewProfile.mapaSignatureDataUrl}
                    logoDataUrl={selectedPreviewProfile.clinicLogoDataUrl}
                    prescriberPhone={selectedPreviewProfile.clinicPhone}
                    prescriberAddressLine={selectedPreviewProfile.clinicAddress}
                    tutorCpf={previewState.tutor.cpf || ''}
                    targetPharmacy={doc.documentKind === 'special-control' ? previewSpecialControlTargetPharmacy : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {protocolModalOpen ? (
        <div className="fixed inset-0 z-[82] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm" onClick={() => setProtocolModalOpen(false)}>
          <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#13220f] text-slate-100 shadow-[0_0_40px_rgba(56,255,20,0.18)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#274b20] bg-[#11200e] px-5 py-4">
              <div>
                <h2 className="text-lg font-bold">Visualizar lista de protocolos prontos</h2>
                <p className="text-xs text-slate-400">Importe fármacos, recomendações e exames pré-definidos em um clique.</p>
              </div>
              <button type="button" className="rounded-lg border border-[#3f6f31] px-3 py-1.5 text-sm hover:bg-[#1e3818]" onClick={() => setProtocolModalOpen(false)}>
                Fechar
              </button>
            </div>
            <div className="max-h-[calc(92vh-72px)] overflow-y-auto p-5">
              <input
                className="mb-4 w-full rounded-lg border border-[#3b6c2f] bg-[#12230f] px-3 py-2 text-sm outline-none ring-[#38ff14] focus:ring-1"
                value={protocolSearch}
                onChange={(e) => setProtocolSearch(e.target.value)}
                placeholder="Buscar protocolo..."
              />
              <div className="space-y-3">
                {filteredProtocols.map((protocol) => {
                  const folder = protocolFolderMap.get(protocol.folderId)
                  return (
                    <article key={protocol.id} className="rounded-xl border border-[#315d28] bg-[#132510] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-white">{protocol.name}</h3>
                          <p className="text-sm text-slate-400">{protocol.summary || 'Sem descrição.'}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            {folder ? (
                              <span
                                className="rounded px-2 py-0.5 text-[10px] font-bold"
                                style={{ color: folder.color, border: `1px solid ${folder.color}66`, background: `${folder.color}1a` }}
                              >
                                {folder.name}
                              </span>
                            ) : null}
                            {protocol.requiresSpecialControl ? (
                              <span className="rounded border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                                CONTROLE ESPECIAL
                              </span>
                            ) : null}
                            <span className="rounded border border-[#3f6f31] bg-[#22381d] px-2 py-0.5 text-[10px] text-[#8cff78]">{protocol.items.length} fármacos</span>
                            <span className="rounded border border-[#3f6f31] bg-[#22381d] px-2 py-0.5 text-[10px] text-[#8cff78]">{protocol.recommendations.length} recomendações</span>
                          </div>
                        </div>
                        <button type="button" className="rxv-btn-primary px-3 py-1.5 text-xs" onClick={() => importProtocol(protocol)}>
                          Importar
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="rounded-lg border border-[#315d28] bg-[#10210d] p-3">
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Fármacos</p>
                          <ul className="space-y-1 text-sm text-slate-200">
                            {protocol.items.slice(0, 6).map((item) => (
                              <li key={item.id}>
                                - {item.name || 'Item sem nome'} {item.concentration ? `(${item.concentration})` : ''}
                              </li>
                            ))}
                            {protocol.items.length > 6 ? <li className="text-xs text-slate-400">+ {protocol.items.length - 6} itens</li> : null}
                          </ul>
                        </div>
                        <div className="rounded-lg border border-[#315d28] bg-[#10210d] p-3">
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Recomendações</p>
                          <ul className="space-y-1 text-sm text-slate-200">
                            {protocol.recommendations.slice(0, 4).map((line, idx) => (
                              <li key={`${protocol.id}-rec-${idx}`}>- {line}</li>
                            ))}
                            {protocol.exams.slice(0, 4).map((exam, idx) => (
                              <li key={`${protocol.id}-exam-${idx}`} className="font-semibold text-[#f2f6f1]">
                                - Exame: {exam}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  )
                })}
                {filteredProtocols.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#345f2a] bg-[#142712] px-4 py-6 text-center text-sm text-slate-400">
                    Nenhum protocolo encontrado.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {rxDataSource === 'local' && (
        <PatientCreateModal
          open={patientCreateModalOpen}
          onOpenChange={setPatientCreateModalOpen}
          adapter={rxAdapter}
          onCreatedAndPicked={(payload) => {
            applyPatientTutorToPrescription(payload)
            setDb(loadRxDb())
            pushToast('success', `Paciente "${payload.patient.name}" criado e aplicado.`)
          }}
          onError={(error) => handleDataAdapterError('save', error)}
        />
      )}

      <MedicationModal
        state={modalState}
        catalogDrugs={db.catalog}
        catalogEntries={catalogEntries}
        patientState={prescription}
        onClose={closeModal}
        onSave={saveModal}
        onToggleAutosave={(next) => setModalState((prev) => ({ ...prev, autosave: next }))}
        onToggleCatalogMode={(next) => setModalState((prev) => ({ ...prev, useCatalog: next }))}
        onDraftChange={updateModalDraft}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-[85] rounded-lg border border-[#3b6f31] bg-[#1a2e16] px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <p className={`text-sm font-semibold ${toast.type === 'error' ? 'text-red-300' : toast.type === 'success' ? 'text-emerald-300' : 'text-slate-100'}`}>{toast.message}</p>
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}
console.log("[DEBUG] NovaReceitaPage.tsx evaluation finished")








