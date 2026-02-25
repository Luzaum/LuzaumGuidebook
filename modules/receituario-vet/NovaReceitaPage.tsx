// ✅ OBJ 4: Debug log removido (DEV only)
if (import.meta.env.DEV) console.log("[DEBUG] NovaReceitaPage.tsx evaluation started")
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvToggle,
  RxvChipsMultiSelect,
  RxvButton,
} from '../../src/components/receituario/RxvComponents'
import { RxPrintView } from './RxPrintView'
import ReceituarioChrome from './ReceituarioChrome'
import { buildAutoInstruction, calculateMedicationQuantity, itemStatus, renderRxToPrintDoc, resolveFrequency, splitPrescriptionByControl } from './rxRenderer'
import { createDefaultItem, createDefaultPrescriptionState } from './rxDefaults'
import { loadRxDraft, loadRxDraftById, saveRxDraft } from './rxStorage'
import HelpConceptButton from './HelpConceptButton'
import { BRAZIL_STATE_OPTIONS, citySuggestionsForState, lookupAddressByCep, normalizeStateInput } from './rxBrazilData'
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
import { MedicationModalV3 } from './components/MedicationModalV3'
import { savePrescription, listPrescriptionsByPatient, getPrescriptionById } from '@/src/lib/prescriptionsRecords'
import { isUuid } from '@/src/lib/isUuid'
import { SupabaseImportBlock } from './components/SupabaseImportBlock'
import type { PatientInfo, TutorInfo } from './rxTypes'
import {
  searchMedications,
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  loadPatientWeights,
  type RecommendedDose,
} from '../../src/lib/clinicRecords'

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

// ❌ REMOVIDO P0.1: CatalogModalEntry (catálogo legado)
// interface CatalogModalEntry {
//   id: string
//   drugId: string
//   presentationId: string
//   controlled: boolean
//   name: string
//   commercialName: string
//   concentration: string
//   presentation: string
//   routeGroup: RouteGroup
//   doseUnit: string
//   pharmacyTypes: PharmacyType[]
// }

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

// ❌ REMOVIDO P0.1: MedicationModal antigo (usava catálogo legado)
// Substituído por MedicationModalV3 (100% Catálogo 3.0 Supabase)
// O código antigo foi DELETADO COMPLETAMENTE (linhas 386-1343)
// Motivo: Continha JSX que não pode ser comentado + dependências do catálogo legado


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
  const [patientWeights, setPatientWeights] = useState<any[]>([])
  const [loadingWeights, setLoadingWeights] = useState(false)
  const saveTimeoutRef = useRef<number | null>(null)
  const pendingProtocolImportRef = useRef(false)
  const lastAutoWaterValueRef = useRef('')
  const loadedRequestedDraftIdRef = useRef('')
  const headerSelectionHydratedRef = useRef(false)

  // ❌ REMOVIDO P0.1: catalogEntries (catálogo legado)
  // Não é mais necessário - MedicationModalV3 busca direto do Supabase
  /*
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
      return drug.presentations.map((presentation: any) => ({
        id: `${drug.id}-${presentation.id}`,
        drugId: drug.id,
        presentationId: presentation.id,
        controlled: !!drug.controlled,
        name: drug.name,
        commercialName: presentation.commercial_name || presentation.commercialName || '',
        concentration: presentation.concentration_text || presentation.concentration || defaultPresentation?.concentration || '',
        presentation: presentation.pharmaceutical_form || presentation.name || defaultPresentation?.name || 'Comprimido',
        routeGroup: drug.routeGroup,
        doseUnit: drug.doseUnit,
        pharmacyTypes: presentation.pharmacyTags?.length ? presentation.pharmacyTags : [drug.pharmacyType || 'veterinária']
      }))
    })
  }, [db.catalog])
  */

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
        // Update existing (savePrescription faz upsert quando id é fornecido)
        const result = await savePrescription({
          id: supabasePrescriptionId,
          patient_id: patientId!,
          tutor_id: tutorId!,
          content: prescription as any,
          clinic_id: clinicId || undefined,
        })
        pushToast('success', `Receita atualizada no Supabase (ID: ${result.id})`)
      } else {
        // Create new
        const result = await savePrescription({
          patient_id: prescription.patient.patientRecordId,
          tutor_id: prescription.tutor.tutorRecordId,
          content: prescription as any,
          clinic_id: clinicId || undefined,
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
      const results = await listPrescriptionsByPatient(prescription.patient.patientRecordId, clinicId || undefined)
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

    const snapshotKey = 'receituario-vet:protocol-snapshot-to-import'
    const sessionSnapshot = sessionStorage.getItem(snapshotKey)
    if (sessionSnapshot) {
      sessionStorage.removeItem(snapshotKey)
      try {
        const parsed = JSON.parse(sessionSnapshot) as RxProtocol
        pendingProtocolImportRef.current = true
        importProtocol(parsed)
        return
      } catch {
        // fallback below
      }
    }

    const snapshot = localStorage.getItem('receituario-vet:protocol-snapshot')
    if (snapshot) {
      localStorage.removeItem('receituario-vet:protocol-snapshot')
      try {
        const parsed = JSON.parse(snapshot) as RxProtocol
        pendingProtocolImportRef.current = true
        importProtocol(parsed)
        return
      } catch {
        // fallback to id-based import
      }
    }

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
        complement: address.complement || prev.tutor.complement || '',
      },
    }))
    setCepLookupMessage('Endereço preenchido pelo CEP.')
  }

  const loadWeightsForPatient = useCallback(async (patientId: string) => {
    if (!patientId || !clinicId) return
    if (!isUuid(patientId)) return // Only for supabase
    try {
      setLoadingWeights(true)
      const freshWeights = await loadPatientWeights(patientId, clinicId)
      setPatientWeights(freshWeights)
    } catch (err) {
      console.error('[RX] Failed to load patient weights', err)
    } finally {
      setLoadingWeights(false)
    }
  }, [clinicId])

  useEffect(() => {
    const pId = prescription.patient.patientRecordId
    if (pId && isUuid(pId)) {
      void loadWeightsForPatient(pId)
    } else {
      setPatientWeights([])
    }
  }, [prescription.patient.patientRecordId, loadWeightsForPatient])

  function sparklinePath(pointsArr: any[], width = 240, height = 40): string {
    const points = [...pointsArr]
      .filter((entry) => !!entry.weight_kg)
      .sort((a, b) => new Date(a.measured_at || a.date).getTime() - new Date(b.measured_at || b.date).getTime())
      .map((entry) => ({
        xLabel: entry.measured_at || entry.date,
        value: parseFloat(String(entry.weight_kg || entry.weightKg).replace(',', '.')) || 0,
      }))
    if (points.length < 2) return ''

    const minY = Math.min(...points.map((entry) => entry.value))
    const maxY = Math.max(...points.map((entry) => entry.value))
    const spanY = Math.max(maxY - minY, 0.01)
    const left = 5
    const right = width - 5
    const top = 5
    const bottom = height - 5
    const chartWidth = right - left
    const chartHeight = bottom - top

    return points
      .map((entry, index) => {
        const x = left + (index / (points.length - 1)) * chartWidth
        const y = top + (1 - (entry.value - minY) / spanY) * chartHeight
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  const startNewTutor = () => {
    const base = createDefaultPrescriptionState()
    setPrescription((prev) => ({
      ...prev,
      tutor: base.tutor,
      patient: base.patient,
    }))
    setSelectedSupabaseTutor(null)
    setSupabasePatientsForTutor([])
    setPatientWeights([])
    setCustomExamDraft('')
    setExamReasonDraft('')
    pushToast('info', 'Dados de tutor e paciente resetados.')
  }

  const startNewPatient = () => {
    const base = createDefaultPrescriptionState()
    setPrescription((prev) => ({
      ...prev,
      patient: base.patient,
    }))
    setPatientWeights([])
    setCustomExamDraft('')
    setExamReasonDraft('')
    pushToast('info', 'Dados do paciente resetados.')
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
          <label className="hidden items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-bold text-slate-300 sm:flex cursor-pointer transition-colors hover:border-slate-500">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-[#39ff14] focus:ring-offset-slate-900" checked={autosaveEnabled} onChange={(e) => setAutosaveEnabled(e.target.checked)} />
            Autosave
          </label>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button" className="rxv-btn-secondary h-[38px] px-3 py-2 text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">apps</span>
                Ferramentas
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="z-[9999] min-w-[220px] overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100" align="end" sideOffset={8}>
                <DropdownMenu.Item asChild>
                  <Link to="/receituario-vet/configuração" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 outline-none transition-colors hover:bg-slate-800 hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined text-[20px] text-slate-400">badge</span>
                    Configurar médico
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link to="/receituario-vet/clientes" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 outline-none transition-colors hover:bg-slate-800 hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined text-[20px] text-slate-400">group</span>
                    Tutores e pacientes
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link to="/receituario-vet/catalogo3" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 outline-none transition-colors hover:bg-slate-800 hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined text-[20px] text-slate-400">medication</span>
                    Catálogo
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <button type="button" onClick={() => setProtocolModalOpen(true)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 outline-none transition-colors hover:bg-slate-800 hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined text-[20px] text-slate-400">inventory_2</span>
                    Protocolos
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link to="/receituario-vet/controle-especial" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 outline-none transition-colors hover:bg-slate-800 hover:text-white cursor-pointer">
                    <span className="material-symbols-outlined text-[20px] text-slate-400">gpp_maybe</span>
                    Controle especial
                  </Link>
                </DropdownMenu.Item>

                {import.meta.env.DEV && rxDataSource === 'supabase' && (
                  <>
                    <DropdownMenu.Separator className="my-1 h-px bg-slate-800" />
                    <DropdownMenu.Item asChild>
                      <button onClick={saveToSupabase} disabled={supabaseLoading} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-amber-400 outline-none transition-colors hover:bg-amber-900/20 cursor-pointer disabled:opacity-50">
                        <span className="material-symbols-outlined text-[20px]">{supabasePrescriptionId ? 'sync' : 'cloud_upload'}</span>
                        {supabasePrescriptionId ? 'Atualizar' : 'Salvar'} Supabase
                      </button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <button onClick={listSupabasePrescriptions} disabled={supabaseLoading} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-cyan-400 outline-none transition-colors hover:bg-cyan-900/20 cursor-pointer disabled:opacity-50">
                        <span className="material-symbols-outlined text-[20px]">list_alt</span>
                        Listar Supabase
                      </button>
                    </DropdownMenu.Item>
                  </>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <RxvButton variant="secondary" className="h-[38px] px-3 py-2 text-sm" onClick={saveNow}>
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar
          </RxvButton>
          <RxvButton variant="secondary" className="h-[38px] px-3 py-2 text-sm" onClick={() => { saveNow(); navigate(`/receituario-vet/rx/${prescription.id}/print?mode=review`) }}>
            <span className="material-symbols-outlined text-[18px]">preview</span>
            Revisar
          </RxvButton>
          <RxvButton variant="primary" className="h-[38px] px-3 py-2 text-sm" onClick={() => { saveNow(); navigate(`/receituario-vet/rx/${prescription.id}/print`) }}>
            <span className="material-symbols-outlined text-[18px]">print</span>
            Imprimir
          </RxvButton>
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
              <h2 className="text-lg font-bold text-[color:var(--rxv-text)]">Identificação de tutor + paciente</h2>
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
                    <RxvButton
                      variant="primary"
                      className="h-[42px] px-3 py-2 text-sm"
                      onClick={() => setPatientCreateModalOpen(true)}
                      disabled={supabaseModeWithoutClinic}
                    >
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                      Novo paciente
                    </RxvButton>
                  </div>
                </>
              ) : (
                <div className="col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Importar Tutor do Banco
                    </label>
                    <RxvButton
                      variant="danger"
                      className="h-auto px-2 py-1 text-[10px] font-black uppercase tracking-tight"
                      onClick={startNewTutor}
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                      Limpar / Novo
                    </RxvButton>
                  </div>
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
                    <RxvButton
                      variant="secondary"
                      className="px-3 py-2 text-xs"
                      onClick={() => navigate('/receituario-vet/clientes')}
                    >
                      <span className="material-symbols-outlined text-[16px]">group_add</span>
                      Ir para gestão de clientes
                    </RxvButton>
                  </div>
                </div>
              )}
            </div>
            {supabaseModeWithoutClinic ? (
              <p className="mt-2 text-xs text-amber-300">
                Clínica ativa não encontrada. Selecione uma clínica para habilitar o Catálogo.
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
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.adminId ?? 'ADMIN'} readOnly />
              </label>
              <label className="text-xs text-slate-400">
                Nome do prescritor
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.name ?? ''} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, name: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                CRMV
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.crmv ?? ''} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, crmv: e.target.value } }))} />
              </label>
              <label className="text-xs text-slate-400">
                Clínica
                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.clinicName ?? ''} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, clinicName: e.target.value } }))} />
              </label>
            </div>

            {/* ── BLOCO A: TUTOR / RESPONSÁVEL ── */}
            <div className="mb-3 mt-5 flex items-center gap-2 rounded-xl border border-[#2f5a25] bg-[#142712] px-4 py-2.5">
              <span className="material-symbols-outlined text-[18px] text-[#39ff14]">person</span>
              <span className="text-xs font-black uppercase tracking-widest text-[color:var(--rxv-text)]">
                Tutor / Responsável {hasSpecialControlItems ? '(controle especial)' : ''}
              </span>
            </div>
            {hasSpecialControlItems ? (
              <div className="mb-3 rounded-xl border px-4 py-3 text-xs font-semibold" style={{ borderColor: 'var(--rxv-warning-border)', background: 'var(--rxv-warning-bg)', color: 'var(--rxv-warning-text)' }}>
                ⚠️ Receita com item controlado detectada. Preencha os dados completos do tutor para rastreabilidade sanitária.
              </div>
            ) : null}
            {rxDataSource === 'local' && (
              <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <RxvField label="Importar do banco de tutores/pacientes" className="md:col-span-2">
                  <select
                    className="w-full rounded-xl border border-slate-800 bg-black/60 px-4 py-3.5 text-sm font-bold text-white outline-none transition-all focus:border-[#39ff14]/50 focus:ring-1 focus:ring-[#39ff14]/20"
                    value={selectedClient?.id ?? ''}
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
                </RxvField>
                {selectedClient && selectedClientAnimals.length > 0 ? (
                  <RxvField label="Paciente do tutor selecionado" className="md:col-span-2">
                    <select
                      className="w-full rounded-xl border border-slate-800 bg-black/60 px-4 py-3.5 text-sm font-bold text-white outline-none transition-all focus:border-[#39ff14]/50 focus:ring-1 focus:ring-[#39ff14]/20"
                      value={prescription.patient.patientRecordId ?? ''}
                      onChange={(e) => applyClientFromBank(selectedClient.id, e.target.value)}
                    >
                      {selectedClientAnimals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                          #{animal.id} - {animal.name} ({animal.species || 'Canina'})
                        </option>
                      ))}
                    </select>
                  </RxvField>
                ) : null}
                {selectedClient && selectedClientAnimals.length === 0 ? (
                  <p className="rounded-xl border border-[#3b6c2f]/60 bg-[#12270f] px-4 py-3 text-xs font-semibold text-[#a8e79b] md:col-span-2">
                    Este tutor ainda não possui paciente cadastrado. Você pode preencher os dados do paciente manualmente abaixo.
                  </p>
                ) : null}
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <RxvField label="ID/Registro tutor">
                <RxvInput
                  value={prescription.tutor.tutorRecordId ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, tutorRecordId: e.target.value } }))}
                />
              </RxvField>

              <RxvField label="CEP * (Preenche automático)" className="md:col-span-2">
                <div className="flex gap-2">
                  <RxvInput
                    className="flex-1"
                    value={prescription.tutor.zipcode ?? ''}
                    onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, zipcode: maskCep(e.target.value) } }))}
                    placeholder="00000-000"
                  />
                  <RxvButton
                    variant="secondary"
                    loading={cepLookupLoading}
                    onClick={() => fetchCepForTutor(prescription.tutor.zipcode || '')}
                  >
                    Buscar
                  </RxvButton>
                </div>
                {cepLookupMessage && (
                  <p className="mt-1 text-[10px] font-bold text-[#38ff14] uppercase tracking-tighter">
                    {cepLookupMessage}
                  </p>
                )}
              </RxvField>
              <RxvField label="Nome *">
                <RxvInput
                  value={prescription.tutor.name ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, name: e.target.value } }))}
                />
              </RxvField>
              <RxvField label="Telefone">
                <RxvInput
                  inputMode="tel"
                  maxLength={15}
                  placeholder="(00) 00000-0000"
                  value={prescription.tutor.phone ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, phone: maskPhoneBr(e.target.value) } }))}
                />
              </RxvField>
              {hasSpecialControlItems ? (
                <>
                  <RxvField label="CPF" className="md:col-span-1">
                    <RxvInput
                      value={prescription.tutor.cpf ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, cpf: maskCpf(e.target.value) } }))}
                      placeholder="000.000.000-00"
                    />
                  </RxvField>
                  <RxvField label="RG" className="md:col-span-1">
                    <RxvInput
                      value={prescription.tutor.rg ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, rg: maskRg(e.target.value) } }))}
                    />
                  </RxvField>


                  <RxvField label="Rua *" className="md:col-span-2">
                    <RxvInput
                      value={prescription.tutor.street ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, street: e.target.value } }))}
                      required
                    />
                  </RxvField>
                  <RxvField label="Número *" className="md:col-span-1">
                    <RxvInput
                      value={prescription.tutor.number ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, number: e.target.value } }))}
                      required
                    />
                  </RxvField>
                  <RxvField label="Complemento" className="md:col-span-1">
                    <RxvInput
                      value={prescription.tutor.complement ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, complement: e.target.value } }))}
                    />
                  </RxvField>
                  <RxvField label="Bairro *" className="md:col-span-2">
                    <RxvInput
                      value={prescription.tutor.neighborhood ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, neighborhood: e.target.value } }))}
                      required
                    />
                  </RxvField>
                  <RxvField label="Cidade *" className="md:col-span-1">
                    <RxvInput
                      value={prescription.tutor.city ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, city: e.target.value } }))}
                      list="tutor-cities"
                      required
                    />
                    <datalist id="tutor-cities">
                      {tutorCitySuggestions.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </RxvField>
                  <RxvField label="Estado *" className="md:col-span-1">
                    <RxvSelect
                      value={prescription.tutor.state ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, state: e.target.value } }))}
                      options={BRAZIL_STATE_OPTIONS}
                      required
                    />
                  </RxvField>
                </>
              ) : null}
              <RxvField label="Observações do tutor" className="md:col-span-2">
                <RxvTextarea
                  rows={2}
                  value={prescription.tutor.notes ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, notes: e.target.value } }))}
                />
              </RxvField>
            </div>

            {/* ── BLOCO B: PACIENTE ── */}
            <div className="mb-3 mt-5 flex items-center gap-2 rounded-xl border border-[#2f5a25] bg-[#142712] px-4 py-2.5">
              <span className="material-symbols-outlined text-[18px] text-[#39ff14]">pets</span>
              <span className="text-xs font-black uppercase tracking-widest text-[color:var(--rxv-text)]">Paciente</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <RxvField label="ID/Registro do paciente">
                <RxvInput
                  value={prescription.patient.patientRecordId ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, patientRecordId: e.target.value } }))}
                />
              </RxvField>
              {selectedClient && selectedClientAnimals.length > 0 ? (
                <RxvField label="Selecionar paciente deste tutor">
                  <select
                    className="w-full rounded-xl border border-slate-800 bg-black/60 px-4 py-3.5 text-sm font-bold text-white outline-none transition-all focus:border-[#39ff14]/50 focus:ring-1 focus:ring-[#39ff14]/20"
                    value={prescription.patient.patientRecordId ?? ''}
                    onChange={(e) => applyClientFromBank(selectedClient.id, e.target.value)}
                  >
                    {selectedClientAnimals.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        #{animal.id} - {animal.name} ({animal.species || 'Canina'})
                      </option>
                    ))}
                  </select>
                </RxvField>
              ) : (
                <RxvField label="Nome do animal *">
                  <div className="flex gap-2">
                    <RxvInput
                      list="rx-patient-bank"
                      value={prescription.patient.name ?? ''}
                      onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, name: e.target.value } }))}
                      className="flex-1"
                    />
                    <RxvButton
                      variant="secondary"
                      onClick={() => applyPatientFromBank(prescription.patient.name)}
                    >
                      Carregar
                    </RxvButton>
                  </div>
                </RxvField>
              )}
              <datalist id="rx-patient-bank">
                {patientSuggestions.map((patient) => (
                  <option key={patient.id} value={patient.name} />
                ))}
              </datalist>
              {selectedClient && selectedClientAnimals.length > 0 ? (
                <RxvField label="Nome do animal *" className="md:col-span-2">
                  <RxvInput
                    value={prescription.patient.name ?? ''}
                    onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, name: e.target.value } }))}
                  />
                </RxvField>
              ) : null}
              <RxvField label="Espécie *">
                <RxvSelect
                  value={prescription.patient.species ?? 'Canina'}
                  options={[
                    { value: 'Canina', label: 'Canina' },
                    { value: 'Felina', label: 'Felina' },
                  ]}
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
                />
              </RxvField>
              <RxvField label="Raça">
                <RxvInput
                  list="rx-breed-options"
                  value={prescription.patient.breed ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, breed: e.target.value } }))}
                  placeholder={prescription.patient.species === 'Canina' ? 'Ex.: Labrador Retriever' : 'Ex.: Siamês'}
                />
              </RxvField>
              <datalist id="rx-breed-options">
                {breedOptions.map((breed) => (
                  <option key={breed} value={breed} />
                ))}
              </datalist>
              <RxvField label="Sexo">
                <RxvSelect
                  value={prescription.patient.sex ?? 'Sem dados'}
                  options={[
                    { value: 'Macho', label: 'Macho' },
                    { value: 'Fêmea', label: 'Fêmea' },
                    { value: 'Sem dados', label: 'Sem dados' },
                  ]}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, sex: e.target.value as PrescriptionState['patient']['sex'] } }))}
                />
              </RxvField>
              <RxvField label="Condição reprodutiva">
                <RxvSelect
                  value={prescription.patient.reproductiveStatus ?? 'Sem dados'}
                  options={[
                    { value: 'Castrado', label: 'Castrado' },
                    { value: 'Fértil', label: 'Fértil' },
                    { value: 'Sem dados', label: 'Sem dados' },
                  ]}
                  onChange={(e) =>
                    updatePrescription((prev) => ({
                      ...prev,
                      patient: { ...prev.patient, reproductiveStatus: e.target.value as PrescriptionState['patient']['reproductiveStatus'] },
                    }))
                  }
                />
              </RxvField>
              <RxvField label="Idade">
                <RxvInput
                  value={prescription.patient.ageText ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, ageText: e.target.value } }))}
                />
              </RxvField>
              <RxvField label="Pelagem">
                <RxvInput
                  list="rx-coat-options"
                  value={prescription.patient.coat ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, coat: e.target.value } }))}
                  placeholder={prescription.patient.species === 'Canina' ? 'Ex.: Caramelo' : 'Ex.: Rajado clássico'}
                />
              </RxvField>
              <datalist id="rx-coat-options">
                {coatOptions.map((coat) => (
                  <option key={coat} value={coat} />
                ))}
              </datalist>
              <RxvField label="Peso (kg) *">
                <div className="flex items-center gap-3">
                  <RxvInput
                    className="w-24"
                    value={prescription.patient.weightKg ?? ''}
                    onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, weightKg: e.target.value } }))}
                  />
                  {patientWeights.length > 1 && (
                    <div className="relative h-12 flex-1 rounded-lg border border-[#315d28] bg-black/40 overflow-hidden">
                      <svg className="absolute inset-0 h-full w-full">
                        <path
                          d={sparklinePath(patientWeights, 240, 48)}
                          fill="none"
                          stroke="#39ff14"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-70"
                        />
                      </svg>
                      <div className="absolute bottom-1 right-2 text-[8px] font-bold uppercase text-slate-500">
                        Evolução de peso
                      </div>
                    </div>
                  )}
                  {loadingWeights && <span className="material-symbols-outlined animate-spin text-[#39ff14] text-sm">sync</span>}
                </div>
              </RxvField>

              <RxvField label="Anamnese / Histórico" className="md:col-span-2">
                <RxvTextarea
                  rows={2}
                  value={prescription.patient.anamnesis ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, anamnesis: e.target.value } }))}
                />
              </RxvField>
              <RxvField label="Observações do paciente" className="md:col-span-2">
                <RxvTextarea
                  rows={2}
                  value={prescription.patient.notes ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, notes: e.target.value } }))}
                />
              </RxvField>
              <div className="md:col-span-2">
                <RxvToggle
                  checked={prescription.patient.showNotesInPrint ?? false}
                  onChange={(val) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, showNotesInPrint: val } }))}
                  label="Exibir observações do paciente na impressão"
                />
              </div>
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
              <RxvField label="Meta de água (mL/dia)">
                <RxvInput
                  value={prescription.recommendations.waterMlPerDay ?? ''}
                  onChange={(e) => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, waterMlPerDay: e.target.value } }))}
                />
                <span className="mt-1 block text-[11px] text-[color:var(--rxv-muted)]">Padrão automático: 60 mL/kg/dia (editável).</span>
              </RxvField>
            </div>

            <div className="mt-5">
              <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-[color:var(--rxv-text)]">Exames sugeridos</h3>
              <RxvChipsMultiSelect
                options={COMMON_EXAMS}
                selected={prescription.recommendations.exams}
                onToggle={(exam) => {
                  const isSelected = prescription.recommendations.exams.some((entry) => normalizeLooseText(entry) === normalizeLooseText(exam))
                  toggleExam(exam, !isSelected)
                }}
              />
              <div className="mt-3 flex gap-2">
                <RxvInput
                  className="flex-1"
                  value={customExamDraft ?? ''}
                  onChange={(e) => setCustomExamDraft(e.target.value)}
                  placeholder="Adicionar exame personalizado"
                />
                <RxvButton
                  variant="secondary"
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
                </RxvButton>
              </div>
              {prescription.recommendations.customExams.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {prescription.recommendations.customExams.map((exam, idx) => (
                    <button type="button" key={`custom-exam-${exam}-${idx}`} className="rounded-full border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-2 py-1 text-xs text-[color:var(--rxv-text)]" onClick={() => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, customExams: prev.recommendations.customExams.filter((_, i) => i !== idx) } }))}>
                      {exam} ×
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
                    value={prescription.recommendations.specialControlPharmacy ?? 'veterinária'}
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
      </div >

      {protocolModalOpen && (
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
      )}

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

      {/* ✅ P0.1: MedicationModalV3 - 100% Catálogo 3.0 - ZERO legado */}
      {modalState.open && modalState.draft && clinicId && (
        <MedicationModalV3
          open={modalState.open}
          draft={modalState.draft}
          patientState={prescription}
          clinicId={clinicId}
          mode={modalState.mode}
          onClose={closeModal}
          onSave={saveModal}
          onDraftChange={updateModalDraft}
        />
      )}

      {toast ? (
        <div className="fixed bottom-6 right-6 z-[85] rounded-lg border border-[#3b6f31] bg-[#1a2e16] px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <p className={`text-sm font-semibold ${toast.type === 'error' ? 'text-red-300' : toast.type === 'success' ? 'text-emerald-300' : 'text-slate-100'}`}>{toast.message}</p>
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}
// ✅ OBJ 4: Debug log removido (DEV only)
if (import.meta.env.DEV) console.log("[DEBUG] NovaReceitaPage.tsx evaluation finished")








