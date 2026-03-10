// ✅ Nova Receita 2.0 — Paridade Total com Nova Receita Antiga
// 100% Catálogo 3.0 Supabase + todas as features da versão original

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useClinic } from '../../src/components/ClinicProvider'
import ReceituarioChrome from './ReceituarioChrome'
import {
    RxvCard,
    RxvSectionHeader,
    RxvField,
    RxvInput,
    RxvSelect,
    RxvTextarea,
    RxvButton,
    RxvToggle,
} from '../../src/components/receituario/RxvComponents'
import { TutorLookup } from './components/TutorLookup'
import { PatientLookup } from './components/PatientLookup'
import { AddMedicationModal2 } from './components/AddMedicationModal2'
import { RxPrintView } from './RxPrintView'
import { buildPrescriptionStateFromNovaReceita2, buildPrintDocsFromNovaReceita2 } from './novaReceita2Adapter'
import { BUILTIN_TEMPLATES } from './builtinTemplates'
import { savePrescription, getPrescriptionById } from '../../src/lib/prescriptionsRecords'
import { loadRxDb, findProfileSettings } from './rxDb'
import { loadRxDraftById } from './rxStorage'
import type { RxTemplateStyle } from './rxDb'
import { calculateMedicationQuantity } from './rxRenderer'
import {
    searchMedications,
    getMedicationPresentations,
    type MedicationSearchResult as CatalogMedicationSearchResult,
    type MedicationPresentationRecord,
} from '../../src/lib/clinicRecords'
import { buildPresentationConcentrationText } from '../../src/lib/medicationCatalog'

// ==================== DRAFT LOCAL (D) ====================
// Chave: rx_draft_v2:<clinicId> — localStorage, por dispositivo

function getDraftKey(clinicId: string | null): string | null {
    if (!clinicId) return null
    return `rx_draft_v2:${clinicId}`
}

function loadLocalDraft(key: string): NovaReceita2State | null {
    try {
        const raw = localStorage.getItem(key)
        if (!raw) return null
        const parsed = normalizeNovaReceita2State(JSON.parse(raw) as NovaReceita2State)
        // Validação básica: precisa ter id e items
        if (!parsed?.id || !Array.isArray(parsed?.items)) return null
        return parsed
    } catch {
        return null
    }
}

function saveLocalDraft(key: string, state: NovaReceita2State): void {
    try {
        localStorage.setItem(key, JSON.stringify(state))
    } catch (e) {
        if (import.meta.env.DEV) console.warn('[RxDraft] save failed', e)
    }
}

function clearLocalDraft(key: string): void {
    try {
        localStorage.removeItem(key)
    } catch {
        // noop
    }
}

// ==================== TYPES ====================

export interface NovaReceita2State {
    prescriber: PrescriberProfile | null
    tutor: TutorInfo | null
    patient: PatientInfo | null
    quickMode?: boolean
    templateId: string | null
    printTemplateId: string | null
    defaultStartDate: string
    defaultStartHour: string
    recommendations: string
    exams: string[]
    items: PrescriptionItem[]
    id: string
    supabaseId?: string // Link com o banco
    createdAt: string
    updatedAt: string
}

export interface PrescriberProfile {
    id: string
    name: string
    crmv: string
    cpf?: string
    phone?: string
    address?: string
    signatureDataUrl?: string
}

export interface TutorInfo {
    id: string
    name: string
    phone?: string
    email?: string
    cpf?: string
    rg?: string
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    zipcode?: string
    notes?: string
}

export interface PatientInfo {
    id: string
    name: string
    species?: string
    breed?: string
    sex?: string
    age_text?: string
    weight_kg?: string
    coat?: string
    reproductive_condition?: string
    microchipped?: boolean
    microchip_number?: string
    anamnesis?: string
    notes?: string
}

export interface PrescriptionItem {
    id: string
    type: 'medication' | 'hygiene' | 'other'
    isManual?: boolean
    is_controlled?: boolean
    catalog_source?: 'clinic' | 'global'

    // IDs Supabase
    medication_id?: string
    presentation_id?: string

    // Campos básicos
    name: string
    presentation_label?: string
    dose?: string
    frequency?: string
    route?: string
    duration?: string
    start_date?: string
    startDate?: string
    startHour?: string
    inheritStartFromPrescription?: boolean
    durationMode?: 'fixed_days' | 'until_recheck' | 'continuous_use' | 'until_finished'
    instructions?: string
    cautions?: string[]

    // Campos completos da apresentação (medication_presentations)
    pharmaceutical_form?: string
    concentration_text?: string
    commercial_name?: string
    additional_component?: string
    value?: string | number
    value_unit?: string
    per_value?: string | number
    per_unit?: string
    avg_price_brl?: number
    package_quantity?: string
    package_unit?: string
    presentation_metadata?: Record<string, unknown> | null
}

// ==================== COMMON EXAMS (como na receita antiga) ====================

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

const QUICK_FREQUENCY_OPTIONS = [
    { value: '1', label: '1 vez ao dia (a cada 24 horas)' },
    { value: '2', label: '2 vezes ao dia (a cada 12 horas)' },
    { value: '4', label: '4 vezes ao dia (a cada 6 horas)' },
    { value: '6', label: '6 vezes ao dia (a cada 4 horas)' },
    { value: '8', label: '8 vezes ao dia (a cada 3 horas)' },
    { value: '12', label: '12 vezes ao dia (a cada 2 horas)' },
    { value: '24', label: '24 vezes ao dia (a cada 1 hora)' },
]

const QUICK_DOSE_UNIT_OPTIONS = [
    'mg/kg', 'mcg/kg', 'g/kg', 'UI/kg', 'mL/kg', 'mg', 'mcg', 'g', 'UI', 'mL', 'mg/mL', 'mcg/mL', '%',
    'comprimido(s)', 'capsula(s)', 'gota(s)', 'ampola(s)', 'sache(s)',
]

const QUICK_CONCENTRATION_UNIT_OPTIONS = ['mg/mL', 'mcg/mL', 'g/mL', 'mg', 'mcg', 'g', 'UI/mL', 'UI', '%']
const QUICK_PHARMACEUTICAL_FORM_OPTIONS = ['Comprimido', 'Capsula', 'Solucao oral', 'Suspensao oral', 'Injetavel', 'Pomada', 'Creme', 'Gel', 'Colirio', 'Otologico', 'Spray', 'Shampoo', 'Transdermico', 'Inalatorio']
const QUICK_ROUTE_OPTIONS = [
    { value: 'VO', label: 'Oral (VO)' },
    { value: 'SC', label: 'Subcutaneo (SC)' },
    { value: 'IM', label: 'Intramuscular (IM)' },
    { value: 'IV', label: 'Intravenoso (IV)' },
    { value: 'Topico', label: 'Topica' },
    { value: 'Oftalmico', label: 'Oftalmica' },
    { value: 'Otologico', label: 'Otologica' },
    { value: 'Intranasal', label: 'Intranasal' },
    { value: 'Retal', label: 'Retal' },
    { value: 'Inalatorio', label: 'Inalatoria' },
    { value: 'Transdermico', label: 'Transdermica' },
]
const START_HOUR_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
    const label = `${String(hour).padStart(2, '0')}:00`
    return { value: label, label }
})
const DURATION_MODE_OPTIONS = [
    { value: 'fixed_days', label: 'Duração fechada' },
    { value: 'until_recheck', label: 'Até reavaliação clínica' },
    { value: 'continuous_use', label: 'Uso contínuo' },
    { value: 'until_finished', label: 'Até terminar o medicamento' },
]

function buildLegacyStartDate(startDate?: string, startHour?: string): string | undefined {
    const safeDate = String(startDate || '').trim()
    const safeHour = String(startHour || '').trim()
    if (!safeDate && !safeHour) return undefined
    if (safeDate && safeHour) return `${safeDate}T${safeHour}:00`
    if (safeDate) return safeDate
    return safeHour
}

function parseLegacyStart(startDateTime?: string): { startDate: string; startHour: string } {
    const raw = String(startDateTime || '').trim()
    if (!raw) return { startDate: '', startHour: '' }
    const isoMatch = raw.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/)
    if (isoMatch) return { startDate: isoMatch[1], startHour: isoMatch[2] }
    const dateOnlyMatch = raw.match(/^(\d{4}-\d{2}-\d{2})$/)
    if (dateOnlyMatch) return { startDate: dateOnlyMatch[1], startHour: '' }
    const hourOnlyMatch = raw.match(/(\d{2}:\d{2})/)
    if (hourOnlyMatch) return { startDate: '', startHour: hourOnlyMatch[1] }
    return { startDate: '', startHour: '' }
}

function parseConcentrationParts(rawValue?: string): { value: string; unit: string } {
    const raw = String(rawValue || '').trim()
    if (!raw) return { value: '', unit: 'mg/mL' }
    const match = raw.match(/^(\d+(?:[.,]\d+)?)\s*(.+)$/)
    if (!match) return { value: raw, unit: 'mg/mL' }
    const value = match[1]
    const unitRaw = String(match[2] || '').trim()
    const unit = QUICK_CONCENTRATION_UNIT_OPTIONS.find((entry) => entry.toLowerCase() === unitRaw.toLowerCase()) || 'mg/mL'
    return { value, unit }
}

function buildConcentrationText(value: string, unit: string): string {
    const normalized = String(value || '').trim()
    if (!normalized) return ''
    return `${normalized} ${unit}`.trim()
}

function normalizePrescriptionItem(item: PrescriptionItem, defaultStartDate: string, defaultStartHour: string): PrescriptionItem {
    const parsedStart = parseLegacyStart(item.start_date)
    const startDate = item.startDate ?? parsedStart.startDate
    const startHour = item.startHour ?? parsedStart.startHour

    let durationMode = item.durationMode
    if (!durationMode) {
        const normalized = String(item.duration || '').trim().toLowerCase()
        if (normalized.includes('uso continuo')) durationMode = 'continuous_use'
        else if (normalized.includes('ate terminar') || normalized.includes('até terminar')) durationMode = 'until_finished'
        else if (normalized.includes('reavali')) durationMode = 'until_recheck'
        else durationMode = 'fixed_days'
    }

    return {
        ...item,
        inheritStartFromPrescription: item.inheritStartFromPrescription ?? true,
        startDate,
        startHour,
        start_date: buildLegacyStartDate(startDate, startHour) || item.start_date,
        durationMode,
        cautions: Array.isArray(item.cautions) ? item.cautions : [],
    }
}

export function normalizeNovaReceita2State(raw?: Partial<NovaReceita2State> | null): NovaReceita2State {
    const baseDate = ''
    const baseHour = ''
    const base = createDefaultState()
    const defaultStartDate = String(raw?.defaultStartDate || '').trim() || baseDate
    const defaultStartHour = String(raw?.defaultStartHour || '').trim() || baseHour

    return {
        ...base,
        ...(raw || {}),
        quickMode: !!raw?.quickMode,
        templateId: raw?.templateId || base.templateId,
        printTemplateId: raw?.printTemplateId || raw?.templateId || base.printTemplateId,
        defaultStartDate,
        defaultStartHour,
        recommendations: String(raw?.recommendations || ''),
        exams: Array.isArray(raw?.exams) ? raw!.exams.filter(Boolean) : [],
        items: Array.isArray(raw?.items)
            ? raw!.items.map((item) => normalizePrescriptionItem(item, defaultStartDate, defaultStartHour))
            : [],
    }
}

function resolveItemStart(item: PrescriptionItem, state: NovaReceita2State): { startDate: string; startHour: string } {
    if (item.inheritStartFromPrescription !== false) {
        return {
            startDate: state.defaultStartDate,
            startHour: state.defaultStartHour,
        }
    }
    return {
        startDate: item.startDate || '',
        startHour: item.startHour || '',
    }
}

function formatDurationSummary(item: PrescriptionItem): string {
    if (item.durationMode === 'until_recheck') return 'Até reavaliação clínica'
    if (item.durationMode === 'continuous_use') return 'Uso contínuo'
    if (item.durationMode === 'until_finished') return 'Até terminar o medicamento'
    return item.duration || 'Sem duração definida'
}

// ==================== DEFAULT STATE ====================

function createDefaultState(): NovaReceita2State {
    return {
        prescriber: null,
        tutor: null,
        patient: null,
        quickMode: false,
        templateId: BUILTIN_TEMPLATES[0].id,
        printTemplateId: BUILTIN_TEMPLATES[0].id,
        defaultStartDate: '',
        defaultStartHour: '',
        recommendations: '',
        exams: [],
        items: [],
        id: `rx2-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}

// ==================== SESSION STORAGE FOR REVIEW ====================

const RX2_SESSION_KEY = 'vetius:rx2:review-draft'

function saveReviewSession(state: NovaReceita2State) {
    try {
        sessionStorage.setItem(RX2_SESSION_KEY, JSON.stringify(state))
    } catch {
        // noop
    }
}

// ==================== COMPONENT ====================

export default function NovaReceita2Page() {
    const navigate = useNavigate()
    const location = useLocation()
    const { clinicId } = useClinic()

    const [state, setState] = useState<NovaReceita2State>(createDefaultState)
    const [autosave, setAutosave] = useState(true)
    const [medicationModalOpen, setMedicationModalOpen] = useState(false)
    const [manualModalOpen, setManualModalOpen] = useState(false)
    const [customExamDraft, setCustomExamDraft] = useState('')
    const [showPreview, setShowPreview] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [hasDraft, setHasDraft] = useState(false)
    const [quickAddExpanded, setQuickAddExpanded] = useState(false)
    const [quickEntryMode, setQuickEntryMode] = useState<'catalog' | 'manual'>('catalog')
    const [quickCatalogQuery, setQuickCatalogQuery] = useState('')
    const [quickCatalogLoading, setQuickCatalogLoading] = useState(false)
    const [quickCatalogResults, setQuickCatalogResults] = useState<CatalogMedicationSearchResult[]>([])
    const [quickSelectedMedication, setQuickSelectedMedication] = useState<CatalogMedicationSearchResult | null>(null)
    const [quickPresentations, setQuickPresentations] = useState<MedicationPresentationRecord[]>([])
    const [quickPresentationId, setQuickPresentationId] = useState('')
    const [quickMedicationName, setQuickMedicationName] = useState('')
    const [quickConcentrationValue, setQuickConcentrationValue] = useState('')
    const [quickConcentrationUnit, setQuickConcentrationUnit] = useState('mg/mL')
    const [quickDoseValue, setQuickDoseValue] = useState('')
    const [quickDoseUnit, setQuickDoseUnit] = useState('mg/kg')
    const [quickFrequencyPerDay, setQuickFrequencyPerDay] = useState('2')
    const [quickDurationDays, setQuickDurationDays] = useState('')
    const [quickContinuousUse, setQuickContinuousUse] = useState(false)
    const [quickRoute, setQuickRoute] = useState('VO')
    const [quickPharmaceuticalForm, setQuickPharmaceuticalForm] = useState('Comprimido')
    const [quickManualControlled, setQuickManualControlled] = useState(false)

    // D: Controle de inicialização do draft (só carrega uma vez por clinicId)
    const draftInitRef = useRef(false)
    const draftKey = getDraftKey(clinicId)

    // ==================== HELPERS ====================

    const updateState = useCallback((updater: (prev: NovaReceita2State) => NovaReceita2State) => {
        setState((prev) => ({
            ...updater(prev),
            updatedAt: new Date().toISOString(),
        }))
    }, [])

    const removeItem = useCallback((itemId: string) => {
        updateState((prev) => ({
            ...prev,
            items: prev.items.filter((i) => i.id !== itemId),
        }))
    }, [updateState])

    const handleAddItem = useCallback((item: PrescriptionItem) => {
        updateState((prev) => ({
            ...prev,
            items: [...prev.items, normalizePrescriptionItem(item, prev.defaultStartDate, prev.defaultStartHour)],
        }))
    }, [updateState])

    const toggleExam = useCallback((exam: string) => {
        updateState((prev) => {
            const has = prev.exams.includes(exam)
            return {
                ...prev,
                exams: has
                    ? prev.exams.filter((e) => e !== exam)
                    : [...prev.exams, exam],
            }
        })
    }, [updateState])

    const addCustomExam = useCallback(() => {
        const trimmed = customExamDraft.trim()
        if (!trimmed) return
        updateState((prev) => ({
            ...prev,
            exams: prev.exams.includes(trimmed) ? prev.exams : [...prev.exams, trimmed],
        }))
        setCustomExamDraft('')
    }, [customExamDraft, updateState])

    const updateItem = useCallback((itemId: string, updater: (item: PrescriptionItem, state: NovaReceita2State) => PrescriptionItem) => {
        updateState((prev) => ({
            ...prev,
            items: prev.items.map((item) => {
                if (item.id !== itemId) return item
                return normalizePrescriptionItem(updater(item, prev), prev.defaultStartDate, prev.defaultStartHour)
            }),
        }))
    }, [updateState])

    const recommendationLines = useMemo(
        () => state.recommendations.split('\n').map((line) => line.trim()).filter(Boolean),
        [state.recommendations]
    )
    const examsText = useMemo(() => state.exams.join('\n'), [state.exams])

    const quickMode = !!state.quickMode

    const resetQuickComposer = useCallback(() => {
        setQuickCatalogQuery('')
        setQuickCatalogResults([])
        setQuickSelectedMedication(null)
        setQuickPresentations([])
        setQuickPresentationId('')
        setQuickMedicationName('')
        setQuickConcentrationValue('')
        setQuickConcentrationUnit('mg/mL')
        setQuickDoseValue('')
        setQuickDoseUnit('mg/kg')
        setQuickFrequencyPerDay('2')
        setQuickDurationDays('')
        setQuickContinuousUse(false)
        setQuickRoute('VO')
        setQuickPharmaceuticalForm('Comprimido')
        setQuickManualControlled(false)
    }, [])

    const handleToggleQuickMode = useCallback(() => {
        updateState((prev) => {
            const nextQuickMode = !prev.quickMode
            const shouldCreateQuickPatient = nextQuickMode && !prev.patient
            const nextPatient = shouldCreateQuickPatient
                ? { id: `quick-patient-${prev.id}`, name: 'Paciente sem identificacao', species: 'Canina', weight_kg: '' }
                : prev.patient
            return { ...prev, quickMode: nextQuickMode, patient: nextPatient }
        })
        if (!quickMode) {
            setQuickAddExpanded(true)
            return
        }
        setQuickAddExpanded(false)
        resetQuickComposer()
    }, [quickMode, resetQuickComposer, updateState])

    const handleQuickWeightChange = useCallback((weight: string) => {
        updateState((prev) => ({
            ...prev,
            patient: prev.patient
                ? { ...prev.patient, weight_kg: weight }
                : { id: `quick-patient-${prev.id}`, name: 'Paciente sem identificacao', species: 'Canina', weight_kg: weight },
        }))
    }, [updateState])

    const selectedQuickPresentation = useMemo(() => {
        if (!quickPresentationId) return null
        return quickPresentations.find((entry) => entry.id === quickPresentationId) || null
    }, [quickPresentationId, quickPresentations])

    const canAddQuickMedication = useMemo(() => {
        const hasName = quickMedicationName.trim().length > 0
        const hasDose = quickDoseValue.trim().length > 0
        const hasDuration = quickContinuousUse || quickDurationDays.trim().length > 0
        if (!hasName || !hasDose || !hasDuration) return false
        if (quickEntryMode === 'catalog' && !quickSelectedMedication) return false
        return true
    }, [quickMedicationName, quickDoseValue, quickContinuousUse, quickDurationDays, quickEntryMode, quickSelectedMedication])

    const handleAddQuickMedication = useCallback(() => {
        if (!canAddQuickMedication) return
        const durationMode = quickContinuousUse ? 'continuous_use' : 'fixed_days'
        const duration = quickContinuousUse ? 'uso contínuo' : `${quickDurationDays.trim()} dias`
        const concentrationText = quickEntryMode === 'catalog'
            ? (buildPresentationConcentrationText(selectedQuickPresentation) || buildConcentrationText(quickConcentrationValue, quickConcentrationUnit))
            : buildConcentrationText(quickConcentrationValue, quickConcentrationUnit)
        const newItem: PrescriptionItem = {
            id: `item-${Date.now()}`,
            type: 'medication',
            isManual: quickEntryMode !== 'catalog',
            is_controlled: quickEntryMode === 'catalog' ? !!quickSelectedMedication?.is_controlled : quickManualControlled,
            catalog_source: quickEntryMode === 'catalog' ? (quickSelectedMedication?.source || 'clinic') : 'clinic',
            medication_id: quickEntryMode === 'catalog' ? quickSelectedMedication?.id : undefined,
            presentation_id: quickEntryMode === 'catalog' ? (quickPresentationId || undefined) : undefined,
            name: quickMedicationName.trim(),
            pharmaceutical_form: quickPharmaceuticalForm || undefined,
            concentration_text: concentrationText || undefined,
            commercial_name: selectedQuickPresentation?.commercial_name || undefined,
            value: selectedQuickPresentation?.value ?? undefined,
            value_unit: selectedQuickPresentation?.value_unit || undefined,
            per_value: selectedQuickPresentation?.per_value ?? undefined,
            per_unit: selectedQuickPresentation?.per_unit || undefined,
            package_quantity: selectedQuickPresentation?.package_quantity != null ? String(selectedQuickPresentation.package_quantity) : undefined,
            package_unit: selectedQuickPresentation?.package_unit || undefined,
            presentation_metadata: selectedQuickPresentation?.metadata || null,
            dose: `${quickDoseValue.trim()} ${quickDoseUnit}`.trim(),
            frequency: `${quickFrequencyPerDay}x ao dia`,
            route: quickRoute || 'VO',
            duration,
            durationMode,
            inheritStartFromPrescription: true,
            startDate: state.defaultStartDate,
            startHour: state.defaultStartHour,
            start_date: buildLegacyStartDate(state.defaultStartDate, state.defaultStartHour),
            instructions: '',
            cautions: [],
        }
        handleAddItem(newItem)
        resetQuickComposer()
    }, [canAddQuickMedication, quickContinuousUse, quickDurationDays, quickConcentrationValue, quickConcentrationUnit, quickEntryMode, quickSelectedMedication, quickManualControlled, quickPresentationId, quickMedicationName, quickPharmaceuticalForm, selectedQuickPresentation, quickDoseValue, quickDoseUnit, quickFrequencyPerDay, quickRoute, handleAddItem, resetQuickComposer, state.defaultStartDate, state.defaultStartHour])

    // ==================== EFFECTS ====================

    // Carregar payload de protocolo vindos via navigate state
    useEffect(() => {
        if (!location.state) return
        const payload = location.state as {
            items?: PrescriptionItem[]
            recommendations?: string
            sourceProtocol?: { id: string; name: string }
        }

        if (payload.items?.length) {
            updateState((prev) => ({
                ...prev,
                items: [...prev.items, ...payload.items!],
            }))
        }

        if (payload.recommendations?.trim()) {
            updateState((prev) => {
                const combined = prev.recommendations.trim()
                    ? `${prev.recommendations.trim()}\n\n${payload.recommendations!.trim()}`
                    : payload.recommendations!.trim()
                return { ...prev, recommendations: combined }
            })
        }

        window.history.replaceState({}, '')
    }, [location.state, updateState])

    // Carregar do Supabase se vier ID na URL
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const sId = params.get('prescriptionId')
        if (sId && clinicId) {
            getPrescriptionById(sId, clinicId).then(record => {
                if (record && record.content?.stateSnapshot) {
                    console.log('[Prescriptions] Loading from DB', sId)
                    const loaded = normalizeNovaReceita2State(record.content.stateSnapshot as NovaReceita2State)
                    setState({
                        ...loaded,
                        supabaseId: record.id // Garante que o link está ativo
                    })
                }
            }).catch(err => {
                console.error('[Prescriptions] Error loading', err)
            })
        }
    }, [location.search, clinicId])

    // Inicializar prescritor se estiver vazio
    useEffect(() => {
        if (!state.prescriber) {
            try {
                const db = loadRxDb()
                const { profile, id } = findProfileSettings(db)
                if (profile) {
                    updateState(prev => ({
                        ...prev,
                        prescriber: {
                            id: id || 'default',
                            name: profile.fullName || '',
                            crmv: profile.crmv || '',
                            phone: profile.clinicPhone || '',
                            address: profile.clinicAddress || '',
                            signatureDataUrl: profile.signatureDataUrl || ''
                        }
                    }))
                }
            } catch (err) {
                console.warn('[Prescriptions] Could not load profile defaults', err)
            }
        }
    }, [state.prescriber, updateState])

    // D1: Carregar rascunho local quando clinicId ficar disponível
    // Só carrega se não vier prescriptionId na URL e não vier items de protocolo
    useEffect(() => {
        if (!draftKey || draftInitRef.current) return
        draftInitRef.current = true

        const params = new URLSearchParams(location.search)
        if (params.get('prescriptionId')) return // Carregará do Supabase
        const draftId = params.get('draft')
        if (draftId) {
            const legacyDraft = loadRxDraftById(draftId)
            if (legacyDraft) {
                const migrated = normalizeNovaReceita2State({
                    id: legacyDraft.id,
                    prescriber: {
                        id: legacyDraft.prescriber.profileId || 'legacy',
                        name: legacyDraft.prescriber.name,
                        crmv: legacyDraft.prescriber.crmv,
                    },
                    tutor: {
                        id: legacyDraft.tutor.id || legacyDraft.tutor.tutorRecordId,
                        name: legacyDraft.tutor.name || legacyDraft.tutor.fullName || legacyDraft.tutor.full_name || '',
                        phone: legacyDraft.tutor.phone,
                        email: legacyDraft.tutor.email,
                        cpf: legacyDraft.tutor.cpf,
                        rg: legacyDraft.tutor.rg,
                        street: legacyDraft.tutor.street || legacyDraft.tutor.addressStreet,
                        number: legacyDraft.tutor.number || legacyDraft.tutor.addressNumber,
                        complement: legacyDraft.tutor.complement || legacyDraft.tutor.addressComplement,
                        neighborhood: legacyDraft.tutor.neighborhood || legacyDraft.tutor.addressDistrict,
                        city: legacyDraft.tutor.city || legacyDraft.tutor.addressCity,
                        state: legacyDraft.tutor.state || legacyDraft.tutor.addressState,
                        zipcode: legacyDraft.tutor.zipcode || legacyDraft.tutor.addressZip,
                        notes: legacyDraft.tutor.notes,
                    },
                    patient: {
                        id: legacyDraft.patient.id || legacyDraft.patient.patientRecordId,
                        name: legacyDraft.patient.name,
                        species: legacyDraft.patient.species,
                        breed: legacyDraft.patient.breed,
                        sex: legacyDraft.patient.sex,
                        age_text: legacyDraft.patient.ageText,
                        weight_kg: legacyDraft.patient.weightKg,
                        coat: legacyDraft.patient.coat,
                        reproductive_condition: legacyDraft.patient.reproductiveStatus,
                        microchipped: legacyDraft.patient.microchipped,
                        microchip_number: legacyDraft.patient.microchip,
                        anamnesis: legacyDraft.patient.anamnesis,
                        notes: legacyDraft.patient.notes,
                    },
                    printTemplateId: legacyDraft.recommendations.standardTemplateId || BUILTIN_TEMPLATES[0].id,
                    templateId: legacyDraft.recommendations.standardTemplateId || BUILTIN_TEMPLATES[0].id,
                    recommendations: legacyDraft.recommendations.bullets.join('\n'),
                    exams: [
                        ...legacyDraft.recommendations.exams,
                        ...legacyDraft.recommendations.customExams,
                    ],
                    items: legacyDraft.items.map((item) => ({
                        id: item.id,
                        type: 'medication',
                        is_controlled: item.controlled,
                        catalog_source: 'clinic',
                        medication_id: item.catalogDrugId || item.medication_id,
                        name: item.name,
                        presentation_label: item.presentation,
                        concentration_text: item.concentration,
                        commercial_name: item.commercialName,
                        value: item.presentationValue,
                        value_unit: item.presentationValueUnit,
                        per_value: item.presentationPerValue,
                        per_unit: item.presentationPerUnit,
                        presentation_metadata: item.presentationMetadata || null,
                        dose: [item.doseValue, item.doseUnit].filter(Boolean).join(' ').trim(),
                        frequency: item.frequencyType === 'everyHours'
                            ? `a cada ${item.everyHours} horas`
                            : (item.timesPerDay ? `${item.timesPerDay}x ao dia` : ''),
                        route: item.routeGroup,
                        duration: item.untilFinished
                            ? 'até terminar o medicamento'
                            : item.continuousUse
                                ? 'uso contínuo'
                                : (item.durationDays ? `${item.durationDays} dias` : ''),
                        durationMode: item.untilFinished
                            ? 'until_finished'
                            : item.continuousUse
                                ? 'continuous_use'
                                : item.durationDays
                                    ? 'fixed_days'
                                    : 'until_recheck',
                        inheritStartFromPrescription: !(item.startDate || item.startHour || item.start_date),
                        startDate: item.startDate || parseLegacyStart(item.start_date).startDate,
                        startHour: item.startHour || parseLegacyStart(item.start_date).startHour,
                        start_date: item.start_date,
                        instructions: item.manualEdited ? item.instruction : '',
                        cautions: item.cautions,
                        pharmaceutical_form: item.pharmaceuticalForm || item.presentation,
                    })),
                    createdAt: legacyDraft.updatedAt,
                    updatedAt: legacyDraft.updatedAt,
                })
                setState(migrated)
                setHasDraft(true)
                return
            }
        }

        const draft = loadLocalDraft(draftKey)
        if (!draft) {
            setHasDraft(false)
            return
        }

        setHasDraft(true)
        setState(draft)
        if (import.meta.env.DEV) console.log('[RxDraft] rascunho local carregado', draftKey)
    }, [draftKey]) // Só re-roda quando draftKey muda (i.e., clinicId ficou disponível)

    // D1: Autosave com debounce de 600ms quando autosave=true e clinicId disponível
    useEffect(() => {
        if (!autosave || !draftKey) return
        const t = setTimeout(() => {
            saveLocalDraft(draftKey, state)
            setHasDraft(true)
        }, 600)
        return () => clearTimeout(t)
    }, [state, autosave, draftKey])

    useEffect(() => {
        if (!quickMode || !quickAddExpanded || quickEntryMode !== 'catalog' || !clinicId) return
        const query = quickCatalogQuery.trim()
        const timer = setTimeout(async () => {
            try {
                setQuickCatalogLoading(true)
                const rows = await searchMedications(clinicId, query, query ? 30 : 15)
                setQuickCatalogResults(rows)
            } catch (err) {
                console.error('[QuickRx] Catalog search failed', err)
                setQuickCatalogResults([])
            } finally {
                setQuickCatalogLoading(false)
            }
        }, query ? 280 : 0)
        return () => clearTimeout(timer)
    }, [quickMode, quickAddExpanded, quickEntryMode, clinicId, quickCatalogQuery])

    useEffect(() => {
        if (!quickMode || quickEntryMode !== 'catalog' || !clinicId || !quickSelectedMedication) return
        const loadPresentations = async () => {
            try {
                const rows = await getMedicationPresentations(clinicId, quickSelectedMedication.id)
                setQuickPresentations(rows)
                if (!rows.length) return
                setQuickPresentationId(rows[0].id)
            } catch (err) {
                console.error('[QuickRx] Presentation load failed', err)
                setQuickPresentations([])
                setQuickPresentationId('')
            }
        }
        void loadPresentations()
    }, [quickMode, quickEntryMode, clinicId, quickSelectedMedication])

    useEffect(() => {
        if (!quickMode || quickEntryMode !== 'catalog') return
        const chosen = quickPresentations.find((entry) => entry.id === quickPresentationId) || null
        if (!chosen) return
        setQuickMedicationName((prev) => prev || quickSelectedMedication?.name || '')
        if (chosen.pharmaceutical_form) setQuickPharmaceuticalForm(chosen.pharmaceutical_form)
        const concentrationText = buildPresentationConcentrationText(chosen) || chosen.concentration_text
        if (concentrationText) {
            const parsed = parseConcentrationParts(concentrationText)
            setQuickConcentrationValue(parsed.value)
            setQuickConcentrationUnit(parsed.unit)
        }
    }, [quickMode, quickEntryMode, quickPresentations, quickPresentationId, quickSelectedMedication])

    // ==================== MEMO ====================

    const rxState = useMemo(() => buildPrescriptionStateFromNovaReceita2(state), [state])
    const itemDoseAnalysis = useMemo(() => {
        const analysis = new Map<string, ReturnType<typeof calculateMedicationQuantity>>()
        rxState.items.forEach((item) => {
            analysis.set(item.id, calculateMedicationQuantity(item, rxState))
        })
        return analysis
    }, [rxState])
    const printDocs = useMemo(() => {
        return buildPrintDocsFromNovaReceita2(state)
    }, [state])
    const primaryPrintDoc = printDocs[0]

    // F2: Unificar fonte de templates — BUILTIN_TEMPLATES + templates salvos no rxDb
    // Evita "templates fantasmas": o dropdown e a aba Templates usam a mesma base
    const allTemplates = useMemo((): RxTemplateStyle[] => {
        try {
            const db = loadRxDb()
            const dbTemplates: RxTemplateStyle[] = (db.templates as RxTemplateStyle[] | undefined) || []
            const builtinIds = new Set(BUILTIN_TEMPLATES.map((t) => t.id))
            // Templates customizados que não conflitam com os embutidos
            const custom = dbTemplates.filter((t) => !builtinIds.has(t.id))
            return [...BUILTIN_TEMPLATES, ...custom]
        } catch {
            return BUILTIN_TEMPLATES
        }
    }, [])

    const selectedTemplateObj = useMemo(() => {
        const id = state.printTemplateId || state.templateId || BUILTIN_TEMPLATES[0].id
        return allTemplates.find((t) => t.id === id) || allTemplates[0]
    }, [state.printTemplateId, state.templateId, allTemplates])

    // ==================== ACTIONS ====================

    // D1: Limpar rascunho local e reiniciar o estado
    const handleClearDraft = useCallback(() => {
        if (draftKey) clearLocalDraft(draftKey)
        setHasDraft(false)
        draftInitRef.current = false
        setState(createDefaultState())
    }, [draftKey])

    const handleReview = useCallback(() => {
        saveReviewSession(state)
        navigate('/receituario-vet/nova-receita-2-print?mode=review')
    }, [state, navigate])

    const handlePrint = useCallback(() => {
        saveReviewSession(state)
        navigate('/receituario-vet/nova-receita-2-print?mode=print')
    }, [state, navigate])

    const handleExportPdf = useCallback(() => {
        saveReviewSession(state)
        navigate('/receituario-vet/nova-receita-2-print?mode=pdf')
    }, [state, navigate])

    const handleSave = useCallback(async () => {
        if (!state.patient || !state.tutor) {
            if (state.quickMode) {
                alert('Receita rapida: para salvar no historico, preencha tutor e paciente completos.')
                return
            }
            alert('Selecione tutor e paciente antes de salvar.')
            return
        }

        setIsSaving(true)
        try {
            console.log('[Prescriptions] Saving...', state.supabaseId ? 'Update' : 'Insert')

            const payload = {
                id: state.supabaseId,
                patient_id: state.patient.id,
                tutor_id: state.tutor.id,
                clinic_id: clinicId || undefined,
                content: {
                    kind: selectedTemplateObj.documentKindTarget as any,
                    templateId: state.printTemplateId || state.templateId,
                    printDoc: primaryPrintDoc,
                    printDocs,
                    stateSnapshot: state, // Para reabertura total
                    createdAtLocal: new Date().toISOString(),
                    appVersion: '2.0.0-parity'
                }
            }

            const saved = await savePrescription(payload)

            updateState(prev => ({
                ...prev,
                supabaseId: saved.id
            }))

            alert('Receita salva com sucesso!')
        } catch (err: any) {
            console.error('[Prescriptions] Save failed', err)
            alert(`Erro ao salvar: ${err.message || 'Erro desconhecido'}`)
        } finally {
            setIsSaving(false)
        }
        }, [state, clinicId, primaryPrintDoc, printDocs, selectedTemplateObj, updateState])

    // ==================== RENDER ====================

    return (
        <ReceituarioChrome section="nova" title="Nova Receita 2.0">
            <div className="min-h-screen bg-gradient-to-br from-[#0a0f0a] via-[#0d130c] to-[#0a100a] pb-16">

                {/* ==================== TOPBAR ==================== */}
                <div className="sticky top-0 z-50 border-b border-slate-800/50 bg-black/80 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-xl font-black text-white uppercase italic tracking-tight sm:text-2xl">
                                Nova Receita 2.0
                            </h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                100% Catálogo 3.0
                            </p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <RxvToggle
                                checked={autosave}
                                onChange={setAutosave}
                                label="Autosave"
                            />

                            {/* D1: Limpar rascunho — visível quando há draft salvo */}
                            {hasDraft && (
                                <button
                                    type="button"
                                    className="rounded-lg border border-red-800/60 bg-red-900/20 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-900/40 transition-colors"
                                    onClick={handleClearDraft}
                                    title="Apaga o rascunho local e reinicia o editor"
                                >
                                    Limpar rascunho
                                </button>
                            )}

                            {/* Mobile: toggle preview */}
                            <button
                                type="button"
                                className="lg:hidden rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800"
                                onClick={() => setShowPreview((v) => !v)}
                            >
                                {showPreview ? 'Ocultar preview' : 'Ver preview'}
                            </button>

                            <RxvButton
                                variant="secondary"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : (state.supabaseId ? 'Atualizar' : 'Salvar')}
                            </RxvButton>
                            <RxvButton variant="secondary" onClick={handleReview}>
                                Revisar
                            </RxvButton>
                            <RxvButton variant="secondary" onClick={handlePrint}>
                                Imprimir
                            </RxvButton>
                            <RxvButton variant="primary" onClick={handleExportPdf}>
                                Exportar PDF
                            </RxvButton>
                        </div>
                    </div>
                </div>

                {/* ==================== LAYOUT 2 COLUNAS ==================== */}
                <div className="mx-auto max-w-[1880px] px-4 pt-6 sm:px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(640px,0.95fr)] xl:grid-cols-[minmax(0,1fr)_minmax(760px,1.05fr)]">

                        {/* ==================== COLUNA ESQUERDA: EDITOR ==================== */}
                        <div className="flex min-w-0 flex-col gap-5">

                            <RxvCard className={quickMode ? 'border border-[#39ff14]/40 shadow-[0_0_0_1px_rgba(57,255,20,0.2)]' : ''}>
                                <RxvSectionHeader
                                    icon="medical_information"
                                    title="A. Identificação / Peso do Paciente"
                                    subtitle={quickMode ? 'Bloco obrigatório em destaque no modo rápido' : 'Tutor, paciente e início padrão da receita'}
                                >
                                    <button
                                        type="button"
                                        onClick={handleToggleQuickMode}
                                        className={`rounded-xl border px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${quickMode
                                            ? 'border-[#39ff14]/70 bg-[#132611] text-[#9eff8f]'
                                            : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:border-[#39ff14]/40 hover:text-[#9eff8f]'
                                            }`}
                                    >
                                        {quickMode ? 'Modo rápido ativo' : 'Ativar modo rápido'}
                                    </button>
                                </RxvSectionHeader>

                                <div className="space-y-5">
                                    {quickMode ? (
                                        <div className="rounded-2xl border border-[#39ff14]/30 bg-[#0f1a0e] px-4 py-3 text-sm text-[#c9ffbf]">
                                            No modo rápido, este bloco concentra o mínimo obrigatório para manter a prescrição consistente.
                                        </div>
                                    ) : null}

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <RxvField label="Tutor / Responsável">
                                            <TutorLookup
                                                value={state.tutor}
                                                onChange={(tutor) => updateState((prev) => ({ ...prev, tutor }))}
                                            />
                                        </RxvField>
                                        <RxvField label="Paciente">
                                            <PatientLookup
                                                value={state.patient}
                                                onChange={(patient) => updateState((prev) => ({ ...prev, patient }))}
                                                tutorId={state.tutor?.id}
                                            />
                                        </RxvField>
                                        <RxvField label="Espécie">
                                            <RxvInput
                                                value={state.patient?.species || ''}
                                                onChange={(e) => updateState((prev) => ({
                                                    ...prev,
                                                    patient: prev.patient ? { ...prev.patient, species: e.target.value } : {
                                                        id: `quick-patient-${prev.id}`,
                                                        name: '',
                                                        species: e.target.value,
                                                    },
                                                }))}
                                                placeholder="Ex: Canina, Felina"
                                            />
                                        </RxvField>
                                        <RxvField label="Peso (kg)">
                                            <RxvInput
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={state.patient?.weight_kg || ''}
                                                onChange={(e) => handleQuickWeightChange(e.target.value)}
                                                placeholder="Ex: 12.4"
                                            />
                                        </RxvField>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <RxvField label="Data de início padrão da receita">
                                            <RxvInput
                                                type="date"
                                                value={state.defaultStartDate}
                                                onChange={(e) => updateState((prev) => ({ ...prev, defaultStartDate: e.target.value }))}
                                            />
                                        </RxvField>
                                        <RxvField label="Hora de início padrão da receita">
                                            <RxvSelect
                                                value={state.defaultStartHour}
                                                onChange={(e) => updateState((prev) => ({ ...prev, defaultStartHour: e.target.value }))}
                                                options={[{ value: '', label: 'Sem hora' }, ...START_HOUR_OPTIONS]}
                                            />
                                        </RxvField>
                                    </div>

                                    {state.patient?.id ? (
                                        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-black/20 px-4 py-3">
                                            <div className="text-xs text-slate-400">
                                                {state.patient.name ? <p>Paciente atual: <span className="font-semibold text-slate-200">{state.patient.name}</span></p> : null}
                                                {state.patient.weight_kg ? <p>Peso informado: <span className="font-semibold text-slate-200">{state.patient.weight_kg} kg</span></p> : null}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/receituario-vet/historico?patientId=${state.patient?.id}&patientName=${encodeURIComponent(state.patient?.name || '')}`)}
                                                className="text-[11px] font-bold text-[#39ff14] hover:underline"
                                            >
                                                Ver histórico
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </RxvCard>

                            {/* Itens da Receita */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="medication"
                                    title="B. Itens da Prescrição"
                                    subtitle="Medicamentos e produtos com início e duração estruturados"
                                >
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex gap-2">
                                            <RxvButton
                                                variant="secondary"
                                                onClick={() => setManualModalOpen(true)}
                                            >
                                                + Manual
                                            </RxvButton>
                                            <RxvButton
                                                variant="primary"
                                                onClick={() => setMedicationModalOpen(true)}
                                            >
                                                + Catálogo
                                            </RxvButton>
                                        </div>
                                        {quickMode && (
                                            <button
                                                type="button"
                                                onClick={() => setQuickAddExpanded((prev) => !prev)}
                                                className={`rounded-lg border px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors ${quickAddExpanded
                                                    ? 'border-[#39ff14]/60 bg-[#39ff14]/15 text-[#9eff8f]'
                                                    : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:border-[#39ff14]/40 hover:text-[#9eff8f]'
                                                    }`}
                                            >
                                                {quickAddExpanded ? 'Fechar adicao rapida' : 'Adicao rapida de farmacos'}
                                            </button>
                                        )}
                                    </div>
                                </RxvSectionHeader>

                                {quickMode && quickAddExpanded && (
                                    <div className="mb-4 space-y-4 rounded-2xl border border-[#39ff14]/30 bg-[#0f1a0e] p-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setQuickEntryMode('catalog')}
                                                className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${quickEntryMode === 'catalog'
                                                    ? 'border-[#39ff14]/60 bg-[#39ff14]/15 text-[#84ff6d]'
                                                    : 'border-slate-700 bg-black/30 text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                Catalogo rapido
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setQuickEntryMode('manual')
                                                    setQuickSelectedMedication(null)
                                                    setQuickPresentations([])
                                                    setQuickPresentationId('')
                                                }}
                                                className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${quickEntryMode === 'manual'
                                                    ? 'border-[#39ff14]/60 bg-[#39ff14]/15 text-[#84ff6d]'
                                                    : 'border-slate-700 bg-black/30 text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                Manual rapido
                                            </button>
                                        </div>

                                        {quickEntryMode === 'catalog' && (
                                            <div className="space-y-3">
                                                {!quickSelectedMedication ? (
                                                    <>
                                                        <RxvInput
                                                            value={quickCatalogQuery}
                                                            onChange={(e) => setQuickCatalogQuery(e.target.value)}
                                                            placeholder="Buscar medicamento para adicao rapida..."
                                                        />
                                                        <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                                                            {quickCatalogLoading ? (
                                                                <p className="text-xs text-slate-400">Buscando no catalogo...</p>
                                                            ) : quickCatalogResults.length ? (
                                                                quickCatalogResults.map((med) => (
                                                                    <button
                                                                        key={med.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setQuickSelectedMedication(med)
                                                                            setQuickMedicationName(med.name)
                                                                            setQuickRoute(med.default_route || 'VO')
                                                                        }}
                                                                        className="w-full rounded-lg border border-slate-700 bg-black/30 px-3 py-2 text-left hover:border-[#39ff14]/50"
                                                                    >
                                                                        <p className="text-sm font-semibold text-white">{med.name}</p>
                                                                    </button>
                                                                ))
                                                            ) : (
                                                                <p className="text-xs text-slate-500">Sem resultados.</p>
                                                            )}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between rounded-lg border border-[#39ff14]/40 bg-[#39ff14]/10 px-3 py-2">
                                                            <p className="text-sm font-semibold text-[#bfffaf]">{quickSelectedMedication.name}</p>
                                                            <button type="button" className="text-xs text-slate-300 hover:text-white" onClick={() => setQuickSelectedMedication(null)}>Trocar</button>
                                                        </div>
                                                        <RxvField label="Apresentacao">
                                                            <RxvSelect
                                                                value={quickPresentationId}
                                                                onChange={(e) => setQuickPresentationId(e.target.value)}
                                                                options={quickPresentations.map((entry) => ({
                                                                    value: entry.id,
                                                                    label: [entry.pharmaceutical_form || 'Sem forma', buildPresentationConcentrationText(entry) || entry.concentration_text || 'Sem concentracao'].join(' - '),
                                                                }))}
                                                            />
                                                        </RxvField>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {quickEntryMode === 'manual' && (
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                <RxvField label="Nome do farmaco">
                                                    <RxvInput value={quickMedicationName} onChange={(e) => setQuickMedicationName(e.target.value)} />
                                                </RxvField>
                                                <RxvField label="Controlado">
                                                    <RxvToggle checked={quickManualControlled} onChange={setQuickManualControlled} label="Medicamento controlado" />
                                                </RxvField>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            <RxvField label="Concentracao">
                                                <div className="grid grid-cols-[1fr_180px] gap-2">
                                                    <RxvInput value={quickConcentrationValue} onChange={(e) => setQuickConcentrationValue(e.target.value)} placeholder="Ex: 50" />
                                                    <RxvSelect value={quickConcentrationUnit} onChange={(e) => setQuickConcentrationUnit(e.target.value)} options={QUICK_CONCENTRATION_UNIT_OPTIONS.map((x) => ({ value: x, label: x }))} />
                                                </div>
                                            </RxvField>
                                            <RxvField label="Forma farmaceutica">
                                                <RxvSelect value={quickPharmaceuticalForm} onChange={(e) => setQuickPharmaceuticalForm(e.target.value)} options={QUICK_PHARMACEUTICAL_FORM_OPTIONS.map((x) => ({ value: x, label: x }))} />
                                            </RxvField>
                                            <RxvField label="Dose">
                                                <div className="grid grid-cols-[1fr_180px] gap-2">
                                                    <RxvInput value={quickDoseValue} onChange={(e) => setQuickDoseValue(e.target.value)} placeholder="Ex: 10" />
                                                    <RxvSelect value={quickDoseUnit} onChange={(e) => setQuickDoseUnit(e.target.value)} options={QUICK_DOSE_UNIT_OPTIONS.map((x) => ({ value: x, label: x }))} />
                                                </div>
                                            </RxvField>
                                            <RxvField label="Frequencia">
                                                <RxvSelect value={quickFrequencyPerDay} onChange={(e) => setQuickFrequencyPerDay(e.target.value)} options={QUICK_FREQUENCY_OPTIONS} />
                                            </RxvField>
                                            <RxvField label="Via">
                                                <RxvSelect value={quickRoute} onChange={(e) => setQuickRoute(e.target.value)} options={QUICK_ROUTE_OPTIONS} />
                                            </RxvField>
                                            <RxvField label="Duracao">
                                                <div className="space-y-2">
                                                    {!quickContinuousUse ? (
                                                        <RxvInput value={quickDurationDays} onChange={(e) => setQuickDurationDays(e.target.value)} placeholder="Ex: 7" />
                                                    ) : null}
                                                    <RxvToggle checked={quickContinuousUse} onChange={setQuickContinuousUse} label="Uso continuo" />
                                                </div>
                                            </RxvField>
                                        </div>

                                        <div className="flex justify-end">
                                            <RxvButton variant="primary" onClick={handleAddQuickMedication} disabled={!canAddQuickMedication}>
                                                Adicionar rapido
                                            </RxvButton>
                                        </div>
                                    </div>
                                )}

                                {state.items.length === 0 ? (
                                    <div className="rounded-xl border-2 border-dashed border-slate-800/50 bg-black/20 px-6 py-10 text-center">
                                        <span className="material-symbols-outlined text-slate-700 text-[40px]">
                                            inventory_2
                                        </span>
                                        <p className="mt-3 text-sm font-bold text-slate-600">
                                            Nenhum item adicionado
                                        </p>
                                        <p className="mt-1 text-xs text-slate-700">
                                            Use "Catálogo" para buscar no banco ou "Manual" para inserir dados livres.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {state.items.map((item, idx) => {
                                            const effectiveStart = resolveItemStart(item, state)
                                            const analysis = itemDoseAnalysis.get(item.id)
                                            const concentrationLabel = buildPresentationConcentrationText({
                                                concentration_text: item.concentration_text,
                                                value: item.value,
                                                value_unit: item.value_unit,
                                                per_value: item.per_value,
                                                per_unit: item.per_unit,
                                                metadata: item.presentation_metadata || undefined,
                                            })
                                            return (
                                                <div key={item.id} className="rounded-2xl border border-slate-800 bg-black/35 p-4">
                                                    <div className="mb-4 flex items-start justify-between gap-3">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] font-black text-slate-400">{idx + 1}</span>
                                                                {item.isManual ? <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Manual</span> : null}
                                                                {item.is_controlled ? <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Controlado</span> : null}
                                                                {item.catalog_source === 'global' ? <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Global</span> : null}
                                                            </div>
                                                            <p className="mt-2 text-base font-bold text-white">
                                                                {item.name || `Item ${idx + 1}`}
                                                                {concentrationLabel ? <span className="ml-1 font-normal text-slate-400">({concentrationLabel})</span> : null}
                                                            </p>
                                                            <p className="text-xs text-slate-500">
                                                                {[item.pharmaceutical_form, item.commercial_name].filter(Boolean).join(' • ') || 'Sem apresentação detalhada'}
                                                            </p>
                                                            {analysis?.label ? (
                                                                <p className="mt-2 text-xs text-slate-400">{analysis.label}</p>
                                                            ) : null}
                                                            {analysis?.warnings?.length ? (
                                                                <div className="mt-2 space-y-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                                                                    {analysis.warnings.map((warning, warningIdx) => (
                                                                        <p key={`${item.id}-warning-${warningIdx}`} className="text-xs font-semibold text-amber-200">
                                                                            {warning}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(item.id)}
                                                            className="shrink-0 rounded-lg border border-red-900/40 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-900/20"
                                                            title="Remover item"
                                                        >
                                                            Remover
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                                                        <RxvField label="Nome do fármaco">
                                                            <RxvInput value={item.name} onChange={(e) => updateItem(item.id, (current) => ({ ...current, name: e.target.value }))} />
                                                        </RxvField>
                                                        <RxvField label="Dose">
                                                            <RxvInput value={item.dose || ''} onChange={(e) => updateItem(item.id, (current) => ({ ...current, dose: e.target.value }))} placeholder="Ex: 7 gotas" />
                                                        </RxvField>
                                                        <RxvField label="Via">
                                                            <RxvSelect value={item.route || 'VO'} onChange={(e) => updateItem(item.id, (current) => ({ ...current, route: e.target.value }))} options={QUICK_ROUTE_OPTIONS} />
                                                        </RxvField>
                                                        <RxvField label="Frequência">
                                                            <RxvInput value={item.frequency || ''} onChange={(e) => updateItem(item.id, (current) => ({ ...current, frequency: e.target.value }))} placeholder="Ex: a cada 12 horas" />
                                                        </RxvField>
                                                    </div>

                                                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                                                        <RxvField label="Modo de duração">
                                                            <RxvSelect
                                                                value={item.durationMode || 'fixed_days'}
                                                                onChange={(e) => updateItem(item.id, (current) => ({ ...current, durationMode: e.target.value as PrescriptionItem['durationMode'] }))}
                                                                options={DURATION_MODE_OPTIONS}
                                                            />
                                                        </RxvField>
                                                        <RxvField label="Duração">
                                                            <RxvInput
                                                                value={item.durationMode === 'fixed_days' ? (item.duration || '') : ''}
                                                                onChange={(e) => updateItem(item.id, (current) => ({ ...current, duration: e.target.value }))}
                                                                placeholder="Ex: 7 dias"
                                                                disabled={item.durationMode !== 'fixed_days'}
                                                            />
                                                        </RxvField>
                                                        <RxvField label="Início do item">
                                                            <RxvToggle
                                                                checked={item.inheritStartFromPrescription !== false}
                                                                onChange={(checked) => updateItem(item.id, (current) => ({ ...current, inheritStartFromPrescription: checked }))}
                                                                label="Herdar início padrão"
                                                            />
                                                        </RxvField>
                                                        <div className="rounded-xl border border-slate-800 bg-black/20 px-3 py-3 text-xs text-slate-400">
                                                            <p className="font-semibold text-slate-200">Resumo</p>
                                                            <p>{formatDurationSummary(item)}</p>
                                                            <p>{!effectiveStart.startDate && !effectiveStart.startHour ? 'Sem início configurado' : `${effectiveStart.startDate || 'Sem data'} ${effectiveStart.startHour || 'Sem hora'}`.trim()}</p>
                                                        </div>
                                                    </div>

                                                    {item.inheritStartFromPrescription === false ? (
                                                        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                            <RxvField label="Data de início do item">
                                                                <RxvInput type="date" value={item.startDate || ''} onChange={(e) => updateItem(item.id, (current) => ({ ...current, startDate: e.target.value }))} />
                                                            </RxvField>
                                                            <RxvField label="Hora de início do item">
                                                                <RxvSelect
                                                                    value={item.startHour || ''}
                                                                    onChange={(e) => updateItem(item.id, (current) => ({ ...current, startHour: e.target.value }))}
                                                                    options={[{ value: '', label: 'Sem hora' }, ...START_HOUR_OPTIONS]}
                                                                />
                                                            </RxvField>
                                                        </div>
                                                    ) : null}

                                                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                        <RxvField label="Instrução livre (opcional)">
                                                            <RxvTextarea
                                                                value={item.instructions || ''}
                                                                onChange={(e) => updateItem(item.id, (current) => ({ ...current, instructions: e.target.value }))}
                                                                rows={3}
                                                                placeholder="Se preencher, substitui a instrução automática."
                                                            />
                                                        </RxvField>
                                                        <RxvField label="Observações adicionais">
                                                            <RxvTextarea
                                                                value={(item.cautions || []).join('\n')}
                                                                onChange={(e) => updateItem(item.id, (current) => ({
                                                                    ...current,
                                                                    cautions: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean),
                                                                }))}
                                                                rows={3}
                                                                placeholder="Uma observação por linha."
                                                            />
                                                        </RxvField>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </RxvCard>

                            <RxvCard>
                                <RxvSectionHeader
                                    icon="format_list_numbered"
                                    title="C. Recomendações"
                                    subtitle="Uma orientação por linha. A impressão numera automaticamente."
                                />
                                <RxvField label="Recomendações ao tutor">
                                    <RxvTextarea
                                        placeholder="Ex: Dar com alimento&#10;Retornar em 7 dias"
                                        value={state.recommendations}
                                        onChange={(e) => updateState((prev) => ({ ...prev, recommendations: e.target.value }))}
                                        rows={6}
                                    />
                                </RxvField>
                                {recommendationLines.length > 0 ? (
                                    <p className="text-xs text-slate-500">{recommendationLines.length} recomendação(ões) prontas para impressão.</p>
                                ) : null}
                            </RxvCard>

                            <RxvCard>
                                <RxvSectionHeader
                                    icon="lab_research"
                                    title="D. Exames"
                                    subtitle="Lista simples editável, com inserção rápida por atalho"
                                />
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {COMMON_EXAMS.map((exam) => {
                                            const selected = state.exams.includes(exam)
                                            return (
                                                <button
                                                    key={exam}
                                                    type="button"
                                                    onClick={() => toggleExam(exam)}
                                                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${selected
                                                        ? 'border-[#39ff14]/60 bg-[#39ff14]/10 text-[#39ff14]'
                                                        : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                                                        }`}
                                                >
                                                    {selected ? '✓ ' : ''}{exam}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <RxvField label="Exames solicitados">
                                        <RxvTextarea
                                            placeholder="Ex: Hemograma completo&#10;Bioquímica sérica"
                                            value={examsText}
                                            onChange={(e) => updateState((prev) => ({
                                                ...prev,
                                                exams: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean),
                                            }))}
                                            rows={6}
                                        />
                                    </RxvField>
                                </div>
                            </RxvCard>

                            <RxvCard>
                                <RxvSectionHeader
                                    icon="palette"
                                    title="E. Templates"
                                    subtitle="Template de impressão separado da futura camada de templates clínicos de conteúdo"
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_280px]">
                                    <RxvField label="Template de impressão">
                                        <RxvSelect
                                            value={state.printTemplateId || state.templateId || BUILTIN_TEMPLATES[0].id}
                                            onChange={(e) => updateState((prev) => ({
                                                ...prev,
                                                printTemplateId: e.target.value,
                                                templateId: prev.templateId || e.target.value,
                                            }))}
                                            options={allTemplates.map((t) => ({
                                                value: t.id,
                                                label: t.name,
                                            }))}
                                        />
                                    </RxvField>
                                    <div className="rounded-2xl border border-dashed border-slate-700 bg-black/20 px-4 py-4 text-sm text-slate-400">
                                        <p className="font-semibold text-slate-200">Próxima etapa</p>
                                        <p className="mt-2">A tela já separa template de impressão de futuros templates clínicos, evitando misturar apresentação visual com conteúdo terapêutico.</p>
                                    </div>
                                </div>
                            </RxvCard>
                        </div>

                        {/* ==================== COLUNA DIREITA: PREVIEW ==================== */}
                        <div className={`min-w-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto ${showPreview ? '' : 'hidden lg:block'}`}>
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="visibility"
                                    title="Visualização Prévia"
                                    subtitle="Preview em tempo real"
                                />

                                {/* Preview container com scroll próprio */}
                                <div className="rounded-xl overflow-hidden bg-white/5 border border-slate-800/50">
                                    {/* Toolbar do preview */}
                                    <div className="flex items-center justify-between border-b border-slate-800/50 px-3 py-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                                            {selectedTemplateObj.name}
                                        </span>
                                        <div className="flex gap-1.5">
                                            <button
                                                type="button"
                                                className="rounded border border-slate-700 px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-white"
                                                onClick={handleReview}
                                            >
                                                Revisar
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded border border-slate-700 px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-white"
                                                onClick={handlePrint}
                                            >
                                                Imprimir
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded border border-[#39ff14]/40 bg-[#39ff14]/10 px-2 py-1 text-[10px] font-bold text-[#39ff14] hover:bg-[#39ff14]/20"
                                                onClick={handleExportPdf}
                                            >
                                                PDF
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preview principal full-width com scroll vertical */}
                                    <div className="max-h-[78vh] overflow-y-auto overflow-x-hidden bg-slate-950/30">
                                        <div className="space-y-5 p-4 xl:p-6">
                                            {printDocs.map((doc, idx) => (
                                                <div key={`${doc.documentKind || 'standard'}-${idx}`} className="overflow-hidden rounded-lg border border-slate-800/60 bg-black/20">
                                                    {printDocs.length > 1 && (
                                                        <p className="px-4 pt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                            {doc.documentKind === 'special-control' ? 'Receita de controle especial' : 'Receita padrão'}
                                                        </p>
                                                    )}
                                                    <RxPrintView
                                                        doc={doc}
                                                        template={selectedTemplateObj}
                                                        fitToWidth={true}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </RxvCard>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== MODALS ==================== */}

            {/* Modal catálogo */}
            <AddMedicationModal2
                open={medicationModalOpen}
                onClose={() => setMedicationModalOpen(false)}
                onAdd={(item) => {
                    handleAddItem(item)
                    setMedicationModalOpen(false)
                }}
                clinicId={clinicId || ''}
                patient={state.patient}
                defaultStartDate={state.defaultStartDate}
                defaultStartHour={state.defaultStartHour}
                manualMode={false}
            />

            {/* Modal manual */}
            <AddMedicationModal2
                open={manualModalOpen}
                onClose={() => setManualModalOpen(false)}
                onAdd={(item) => {
                    handleAddItem(item)
                    setManualModalOpen(false)
                }}
                clinicId={clinicId || ''}
                patient={state.patient}
                defaultStartDate={state.defaultStartDate}
                defaultStartHour={state.defaultStartHour}
                manualMode={true}
            />
        </ReceituarioChrome>
    )
}
