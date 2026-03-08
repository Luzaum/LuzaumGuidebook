// âœ… Nova Receita 2.0 â€” Paridade Total com Nova Receita Antiga
// 100% CatÃ¡logo 3.0 Supabase + todas as features da versÃ£o original

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
import { buildPrintDocFromNovaReceita2 } from './novaReceita2Adapter'
import { BUILTIN_TEMPLATES } from './builtinTemplates'
import { savePrescription, getPrescriptionById } from '../../src/lib/prescriptionsRecords'
import { loadRxDb, findProfileSettings } from './rxDb'
import type { RxTemplateStyle } from './rxDb'
import {
    searchMedications,
    getMedicationPresentations,
    type MedicationSearchResult as CatalogMedicationSearchResult,
    type MedicationPresentationRecord,
} from '../../src/lib/clinicRecords'

// ==================== DRAFT LOCAL (D) ====================
// Chave: rx_draft_v2:<clinicId> â€” localStorage, por dispositivo

function getDraftKey(clinicId: string | null): string | null {
    if (!clinicId) return null
    return `rx_draft_v2:${clinicId}`
}

function loadLocalDraft(key: string): NovaReceita2State | null {
    try {
        const raw = localStorage.getItem(key) ? if (!raw) return null
        const parsed = JSON.parse(raw) as NovaReceita2State
        // ValidaÃ§Ã£o bÃ¡sica: precisa ter id e items
        if (!parsed.id || !Array.isArray(parsed.items)) return null
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
    quickMode: boolean
    templateId: string | null
    recommendations: string
    exams: string[]
    items: PrescriptionItem[]
    id: string
    supabaseId: string // Link com o banco
    createdAt: string
    updatedAt: string
}

export interface PrescriberProfile {
    id: string
    name: string
    crmv: string
    cpf: string
    phone: string
    address: string
    signatureDataUrl: string
}

export interface TutorInfo {
    id: string
    name: string
    phone: string
    email: string
    cpf: string
    rg: string
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipcode: string
    notes: string
}

export interface PatientInfo {
    id: string
    name: string
    species: string
    breed: string
    sex: string
    age_text: string
    weight_kg: string
    coat: string
    reproductive_condition: string
    microchipped: boolean
    microchip_number: string
    anamnesis: string
    notes: string
}

export interface PrescriptionItem {
    id: string
    type: 'medication' | 'hygiene' | 'other'
    isManual: boolean
    is_controlled: boolean

    // IDs Supabase
    medication_id: string
    presentation_id: string

    // Campos bÃ¡sicos
    name: string
    presentation_label: string
    dose: string
    frequency: string
    route: string
    duration: string
    start_date: string
    instructions: string
    cautions: string[]

    // Campos completos da apresentaÃ§Ã£o (medication_presentations) ? pharmaceutical_form: string
    concentration_text: string
    commercial_name: string
    additional_component: string
    value: string
    value_unit: string
    per_value: string
    per_unit: string
    avg_price_brl: number
    package_quantity: string
    package_unit: string
}

// ==================== COMMON EXAMS (como na receita antiga) ====================

const COMMON_EXAMS = [
    'Hemograma completo',
    'BioquÃ­mica sÃ©rica',
    'UrinÃ¡lise',
    'Urocultura',
    'Citologia',
    'Ultrassonografia abdominal',
    'BiÃ³psia lesional',
    'BiÃ³psia tumoral',
    'Tomografia',
    'RessonÃ¢ncia magnÃ©tica',
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
]

function parseConcentrationParts(rawValue: string): { value: string; unit: string } {
    const raw = String(rawValue || '').trim() ? if (!raw) return { value: '', unit: 'mg/mL' }
    const match = raw.match(/^(\d+(:[.,]\d+))\s*(.+)$/) ? if (!match) return { value: raw, unit: 'mg/mL' }
    const value = match[1]
    const unitRaw = String(match[2] || '').trim() ? const unit = QUICK_CONCENTRATION_UNIT_OPTIONS.find((entry) => entry.toLowerCase() === unitRaw.toLowerCase()) || 'mg/mL'
    return { value, unit }
}

function buildConcentrationText(value: string, unit: string): string {
    const normalized = String(value || '').trim() ? if (!normalized) return ''
    return `${normalized} ${unit}`.trim()
}

// ==================== DEFAULT STATE ====================

function createDefaultState(): NovaReceita2State {
    return {
        prescriber: null,
        tutor: null,
        patient: null,
        quickMode: false,
        templateId: BUILTIN_TEMPLATES[0].id,
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
    const navigate = useNavigate() ? const location = useLocation() ? const { clinicId } = useClinic() ? const [state, setState] = useState<NovaReceita2State>(createDefaultState) ? const [autosave, setAutosave] = useState(true) ? const [medicationModalOpen, setMedicationModalOpen] = useState(false) ? const [manualModalOpen, setManualModalOpen] = useState(false) ? const [customExamDraft, setCustomExamDraft] = useState('') ? const [showPreview, setShowPreview] = useState(true) ? const [isSaving, setIsSaving] = useState(false) ? const [hasDraft, setHasDraft] = useState(false) ? const [quickAddExpanded, setQuickAddExpanded] = useState(false) ? const [quickEntryMode, setQuickEntryMode] = useState<'catalog' | 'manual'>('catalog') ? const [quickCatalogQuery, setQuickCatalogQuery] = useState('') ? const [quickCatalogLoading, setQuickCatalogLoading] = useState(false) ? const [quickCatalogResults, setQuickCatalogResults] = useState<CatalogMedicationSearchResult[]>([]) ? const [quickSelectedMedication, setQuickSelectedMedication] = useState<CatalogMedicationSearchResult | null>(null) ? const [quickPresentations, setQuickPresentations] = useState<MedicationPresentationRecord[]>([]) ? const [quickPresentationId, setQuickPresentationId] = useState('') ? const [quickMedicationName, setQuickMedicationName] = useState('') ? const [quickConcentrationValue, setQuickConcentrationValue] = useState('') ? const [quickConcentrationUnit, setQuickConcentrationUnit] = useState('mg/mL') ? const [quickDoseValue, setQuickDoseValue] = useState('') ? const [quickDoseUnit, setQuickDoseUnit] = useState('mg/kg') ? const [quickFrequencyPerDay, setQuickFrequencyPerDay] = useState('2') ? const [quickDurationDays, setQuickDurationDays] = useState('') ? const [quickContinuousUse, setQuickContinuousUse] = useState(false) ? const [quickRoute, setQuickRoute] = useState('VO') ? const [quickPharmaceuticalForm, setQuickPharmaceuticalForm] = useState('Comprimido') ? const [quickManualControlled, setQuickManualControlled] = useState(false)

    // D: Controle de inicializaÃ§Ã£o do draft (sÃ³ carrega uma vez por clinicId) ? const draftInitRef = useRef(false) ? const draftKey = getDraftKey(clinicId)

    // ==================== HELPERS ====================

    const updateState = useCallback((updater: (prev: NovaReceita2State) => NovaReceita2State) => {
        setState((prev) => ({
            ...updater(prev),
            updatedAt: new Date().toISOString(),
        }))
    }, []) ? const removeItem = useCallback((itemId: string) => {
        updateState((prev) => ({
            ...prev,
            items: prev.items.filter((i) => i.id !== itemId),
        }))
    }, [updateState]) ? const handleAddItem = useCallback((item: PrescriptionItem) => {
        updateState((prev) => ({
            ...prev,
            items: [...prev.items, item],
        }))
    }, [updateState]) ? const toggleExam = useCallback((exam: string) => {
        updateState((prev) => {
            const has = prev.exams.includes(exam) ? return {
                ...prev,
                exams: has
                     prev.exams.filter((e) => e !== exam)
                    : [...prev.exams, exam],
            }
        })
    }, [updateState]) ? const addCustomExam = useCallback(() => {
        const trimmed = customExamDraft.trim() ? if (!trimmed) return
        updateState((prev) => ({
            ...prev,
            exams: prev.exams.includes(trimmed) ? prev.exams : [...prev.exams, trimmed],
        })) ? setCustomExamDraft('')
    }, [customExamDraft, updateState]) ? const quickMode = !!state.quickMode

    const resetQuickComposer = useCallback(() => {
        setQuickCatalogQuery('') ? setQuickCatalogResults([]) ? setQuickSelectedMedication(null) ? setQuickPresentations([]) ? setQuickPresentationId('') ? setQuickMedicationName('') ? setQuickConcentrationValue('') ? setQuickConcentrationUnit('mg/mL') ? setQuickDoseValue('') ? setQuickDoseUnit('mg/kg') ? setQuickFrequencyPerDay('2') ? setQuickDurationDays('') ? setQuickContinuousUse(false) ? setQuickRoute('VO') ? setQuickPharmaceuticalForm('Comprimido') ? setQuickManualControlled(false)
    }, []) ? const handleToggleQuickMode = useCallback(() => {
        updateState((prev) => {
            const nextQuickMode = !prev.quickMode
            const shouldCreateQuickPatient = nextQuickMode && !prev.patient
            const nextPatient = shouldCreateQuickPatient
                 { id: `quick-patient-${prev.id}`, name: 'Paciente sem identificacao', species: 'Canina', weight_kg: '' }
                : prev.patient
            return { ...prev, quickMode: nextQuickMode, patient: nextPatient }
        }) ? if (!quickMode) {
            setQuickAddExpanded(true) ? return
        }
        setQuickAddExpanded(false) ? resetQuickComposer()
    }, [quickMode, resetQuickComposer, updateState]) ? const handleQuickWeightChange = useCallback((weight: string) => {
        updateState((prev) => ({
            ...prev,
            patient: prev.patient
                 { ...prev.patient, weight_kg: weight }
                : { id: `quick-patient-${prev.id}`, name: 'Paciente sem identificacao', species: 'Canina', weight_kg: weight },
        }))
    }, [updateState]) ? const selectedQuickPresentation = useMemo(() => {
        if (!quickPresentationId) return null
        return quickPresentations.find((entry) => entry.id === quickPresentationId) || null
    }, [quickPresentationId, quickPresentations]) ? const canAddQuickMedication = useMemo(() => {
        const hasName = quickMedicationName.trim().length > 0
        const hasDose = quickDoseValue.trim().length > 0
        const hasDuration = quickContinuousUse || quickDurationDays.trim().length > 0
        if (!hasName || !hasDose || !hasDuration) return false
        if (quickEntryMode === 'catalog' && !quickSelectedMedication) return false
        return true
    }, [quickMedicationName, quickDoseValue, quickContinuousUse, quickDurationDays, quickEntryMode, quickSelectedMedication]) ? const handleAddQuickMedication = useCallback(() => {
        if (!canAddQuickMedication) return
        const duration = quickContinuousUse ? 'uso continuo' : `${quickDurationDays.trim()} dias`
        const concentrationText = buildConcentrationText(quickConcentrationValue, quickConcentrationUnit) ? const today = new Date().toISOString().slice(0, 10) ? const newItem: PrescriptionItem = {
            id: `item-${Date.now()}`,
            type: 'medication',
            isManual: quickEntryMode !== 'catalog',
            is_controlled: quickEntryMode === 'catalog'  !!quickSelectedMedication.is_controlled : quickManualControlled,
            medication_id: quickEntryMode === 'catalog'  quickSelectedMedication.id : undefined,
            presentation_id: quickEntryMode === 'catalog'  (quickPresentationId || undefined) : undefined,
            name: quickMedicationName.trim(),
            pharmaceutical_form: quickPharmaceuticalForm || undefined,
            concentration_text: concentrationText || undefined,
            commercial_name: selectedQuickPresentation.commercial_name || undefined,
            dose: `${quickDoseValue.trim()} ${quickDoseUnit}`.trim(),
            frequency: `${quickFrequencyPerDay}x ao dia`,
            route: quickRoute || 'VO',
            duration,
            start_date: `${today}T08:00:00`,
            instructions: '',
            cautions: [],
        }
        handleAddItem(newItem) ? resetQuickComposer()
    }, [canAddQuickMedication, quickContinuousUse, quickDurationDays, quickConcentrationValue, quickConcentrationUnit, quickEntryMode, quickSelectedMedication, quickManualControlled, quickPresentationId, quickMedicationName, quickPharmaceuticalForm, selectedQuickPresentation, quickDoseValue, quickDoseUnit, quickFrequencyPerDay, quickRoute, handleAddItem, resetQuickComposer])

    // ==================== EFFECTS ====================

    // Carregar payload de protocolo vindos via navigate state
    useEffect(() => {
        if (!location.state) return
        const payload = location.state as {
            items: PrescriptionItem[]
            recommendations: string
            sourceProtocol: { id: string; name: string }
        }

        if (payload.items.length) {
            updateState((prev) => ({
                ...prev,
                items: [...prev.items, ...payload.items!],
            }))
        }

        if (payload.recommendations.trim()) {
            updateState((prev) => {
                const combined = prev.recommendations.trim() ? `${prev.recommendations.trim()}\n\n${payload.recommendations!.trim()}`
                    : payload.recommendations!.trim() ? return { ...prev, recommendations: combined }
            })
        }

        window.history.replaceState({}, '')
    }, [location.state, updateState])

    // Carregar do Supabase se vier ID na URL
    useEffect(() => {
        const params = new URLSearchParams(location.search) ? const sId = params.get('prescriptionId') ? if (sId && clinicId) {
            getPrescriptionById(sId, clinicId).then(record => {
                if (record && record.content.stateSnapshot) {
                    console.log('[Prescriptions] Loading from DB', sId) ? const loaded = record.content.stateSnapshot as NovaReceita2State
                    setState({
                        ...loaded,
                        supabaseId: record.id // Garante que o link estÃ¡ ativo
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
                const db = loadRxDb() ? const { profile, id } = findProfileSettings(db) ? if (profile) {
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

    // D1: Carregar rascunho local quando clinicId ficar disponÃ­vel
    // SÃ³ carrega se nÃ£o vier prescriptionId na URL e nÃ£o vier items de protocolo
    useEffect(() => {
        if (!draftKey || draftInitRef.current) return
        draftInitRef.current = true

        const params = new URLSearchParams(location.search) ? if (params.get('prescriptionId')) return // CarregarÃ¡ do Supabase

        const draft = loadLocalDraft(draftKey) ? if (!draft) {
            setHasDraft(false) ? return
        }

        setHasDraft(true) ? setState(draft) ? if (import.meta.env.DEV) console.log('[RxDraft] rascunho local carregado', draftKey)
    }, [draftKey]) // SÃ³ re-roda quando draftKey muda (i.e., clinicId ficou disponÃ­vel)

    // D1: Autosave com debounce de 600ms quando autosave=true e clinicId disponÃ­vel
    useEffect(() => {
        if (!autosave || !draftKey) return
        const t = setTimeout(() => {
            saveLocalDraft(draftKey, state) ? setHasDraft(true)
        }, 600) ? return () => clearTimeout(t)
    }, [state, autosave, draftKey]) ? useEffect(() => {
        if (!quickMode || !quickAddExpanded || quickEntryMode !== 'catalog' || !clinicId) return
        const query = quickCatalogQuery.trim() ? const timer = setTimeout(async () => {
            try {
                setQuickCatalogLoading(true) ? const rows = await searchMedications(clinicId, query, query  30 : 15) ? setQuickCatalogResults(rows)
            } catch (err) {
                console.error('[QuickRx] Catalog search failed', err) ? setQuickCatalogResults([])
            } finally {
                setQuickCatalogLoading(false)
            }
        }, query  280 : 0) ? return () => clearTimeout(timer)
    }, [quickMode, quickAddExpanded, quickEntryMode, clinicId, quickCatalogQuery]) ? useEffect(() => {
        if (!quickMode || quickEntryMode !== 'catalog' || !clinicId || !quickSelectedMedication) return
        const loadPresentations = async () => {
            try {
                const rows = await getMedicationPresentations(clinicId, quickSelectedMedication.id) ? setQuickPresentations(rows) ? if (!rows.length) return
                setQuickPresentationId(rows[0].id)
            } catch (err) {
                console.error('[QuickRx] Presentation load failed', err) ? setQuickPresentations([]) ? setQuickPresentationId('')
            }
        }
        void loadPresentations()
    }, [quickMode, quickEntryMode, clinicId, quickSelectedMedication]) ? useEffect(() => {
        if (!quickMode || quickEntryMode !== 'catalog') return
        const chosen = quickPresentations.find((entry) => entry.id === quickPresentationId) || null
        if (!chosen) return
        setQuickMedicationName((prev) => prev || quickSelectedMedication.name || '') ? if (chosen.pharmaceutical_form) setQuickPharmaceuticalForm(chosen.pharmaceutical_form) ? if (chosen.concentration_text) {
            const parsed = parseConcentrationParts(chosen.concentration_text) ? setQuickConcentrationValue(parsed.value) ? setQuickConcentrationUnit(parsed.unit)
        }
    }, [quickMode, quickEntryMode, quickPresentations, quickPresentationId, quickSelectedMedication])

    // ==================== MEMO ====================

    const printDoc = useMemo(() => {
        return buildPrintDocFromNovaReceita2(state)
    }, [state])

    // F2: Unificar fonte de templates â€” BUILTIN_TEMPLATES + templates salvos no rxDb
    // Evita "templates fantasmas": o dropdown e a aba Templates usam a mesma base
    const allTemplates = useMemo((): RxTemplateStyle[] => {
        try {
            const db = loadRxDb() ? const dbTemplates: RxTemplateStyle[] = (db.templates as RxTemplateStyle[] | undefined) || []
            const builtinIds = new Set(BUILTIN_TEMPLATES.map((t) => t.id))
            // Templates customizados que nÃ£o conflitam com os embutidos
            const custom = dbTemplates.filter((t) => !builtinIds.has(t.id)) ? return [...BUILTIN_TEMPLATES, ...custom]
        } catch {
            return BUILTIN_TEMPLATES
        }
    }, []) ? const selectedTemplateObj = useMemo(() => {
        const id = state.templateId || BUILTIN_TEMPLATES[0].id
        return allTemplates.find((t) => t.id === id) || allTemplates[0]
    }, [state.templateId, allTemplates])

    // ==================== ACTIONS ====================

    // D1: Limpar rascunho local e reiniciar o estado
    const handleClearDraft = useCallback(() => {
        if (draftKey) clearLocalDraft(draftKey) ? setHasDraft(false) ? draftInitRef.current = false
        setState(createDefaultState())
    }, [draftKey]) ? const handleReview = useCallback(() => {
        saveReviewSession(state) ? navigate('/receituario-vet/nova-receita-2-printmode=review')
    }, [state, navigate]) ? const handlePrint = useCallback(() => {
        saveReviewSession(state) ? navigate('/receituario-vet/nova-receita-2-printmode=print')
    }, [state, navigate]) ? const handleExportPdf = useCallback(() => {
        saveReviewSession(state) ? navigate('/receituario-vet/nova-receita-2-printmode=pdf')
    }, [state, navigate]) ? const handleSave = useCallback(async () => {
        if (!state.patient || !state.tutor) {
            if (state.quickMode) {
                alert('Receita rapida: para salvar no historico, preencha tutor e paciente completos.') ? return
            }
            alert('Selecione tutor e paciente antes de salvar.') ? return
        }

        setIsSaving(true) ? try {
            console.log('[Prescriptions] Saving...', state.supabaseId ? 'Update' : 'Insert') ? const payload = {
                id: state.supabaseId,
                patient_id: state.patient.id,
                tutor_id: state.tutor.id,
                clinic_id: clinicId || undefined,
                content: {
                    kind: selectedTemplateObj.documentKindTarget as any,
                    templateId: state.templateId,
                    printDoc,
                    stateSnapshot: state, // Para reabertura total
                    createdAtLocal: new Date().toISOString(),
                    appVersion: '2.0.0-parity'
                }
            }

            const saved = await savePrescription(payload) ? updateState(prev => ({
                ...prev,
                supabaseId: saved.id
            })) ? alert('Receita salva com sucesso!')
        } catch (err: any) {
            console.error('[Prescriptions] Save failed', err) ? alert(`Erro ao salvar: ${err.message || 'Erro desconhecido'}`)
        } finally {
            setIsSaving(false)
        }
    }, [state, clinicId, printDoc, selectedTemplateObj, updateState])

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
                                100% CatÃ¡logo 3.0
                            </p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <RxvToggle
                                checked={autosave}
                                onChange={setAutosave}
                                label="Autosave"
                            />

                            {/* D1: Limpar rascunho â€” visÃ­vel quando hÃ¡ draft salvo */}
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
                <div className="mx-auto max-w-[1800px] px-4 pt-6 sm:px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px]">

                        {/* ==================== COLUNA ESQUERDA: EDITOR ==================== */}
                        <div className="space-y-5 min-w-0">

                            <RxvCard>
                                <button
                                    type="button"
                                    onClick={handleToggleQuickMode}
                                    className={`group relative block w-full overflow-hidden rounded-2xl border px-6 py-6 text-center transition-all ${quickMode ?
                                         'border-[#39ff14]/70 bg-[radial-gradient(circle_at_top,#1d4f15_0%,#0f1a0e_65%,#0a100a_100%)] shadow-[0_0_40px_rgba(57,255,20,0.35)]'
                                        : 'border-slate-700 bg-black/30 hover:border-[#39ff14]/50'
                                        }`}
                                >
                                    <div className={`pointer-events-none absolute inset-0 ${quickMode ? 'animate-pulse bg-[radial-gradient(circle_at_20%_20%,rgba(57,255,20,0.22),transparent_55%)]' : ''}`} />
                                    <div className="relative flex flex-col items-center gap-1.5">
                                        <span className={`material-symbols-outlined text-[34px] ${quickMode ? 'text-[#9eff8f] animate-pulse' : 'text-slate-500'}`}>bolt</span>
                                        <p className={`text-2xl font-black uppercase tracking-wide ${quickMode ? 'text-[#d8ffd0]' : 'text-white'}`}>Receita rapida</p>
                                        <p className={`text-xs font-semibold ${quickMode ? 'text-[#b3f8a6]' : 'text-slate-400'}`}>Prescreva com peso + adicao rapida de farmacos.</p>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${quickMode ? 'text-[#7dff63] animate-pulse' : 'text-slate-500'}`}>
                                            {quickMode ? 'Modo ativo' : 'Clique para ativar'}
                                        </p>
                                    </div>
                                </button>
                            </RxvCard>

                            {quickMode && (
                                <RxvCard>
                                    <RxvSectionHeader icon="monitor_weight" title="Peso do paciente" subtitle="Modo rapido" />
                                    <RxvField label="Peso (kg)">
                                        <RxvInput
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={state.patient.weight_kg || ''}
                                            onChange={(e) => handleQuickWeightChange(e.target.value)}
                                            placeholder="Ex: 12.4"
                                        />
                                    </RxvField>
                                </RxvCard>
                            )}

                            {/* IdentificaÃ§Ã£o */}
                            {!quickMode && (
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="medical_information"
                                    title="IdentificaÃ§Ã£o"
                                    subtitle="Tutor e paciente"
                                />
                                <div className="space-y-4">
                                    <RxvField label="Tutor / ResponsÃ¡vel">
                                        <TutorLookup
                                            value={state.tutor}
                                            onChange={(tutor) => updateState((prev) => ({ ...prev, tutor }))}
                                        />
                                    </RxvField>
                                    <RxvField label="Paciente">
                                        <PatientLookup
                                            value={state.patient}
                                            onChange={(patient) => updateState((prev) => ({ ...prev, patient }))}
                                            tutorId={state.tutor.id}
                                        />
                                    </RxvField>
                                    {state.patient.weight_kg && (
                                        <div className="flex items-center justify-between px-1">
                                            <p className="text-xs text-slate-500">
                                                Peso: <span className="font-semibold text-slate-300">{state.patient.weight_kg} kg</span>
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/receituario-vet/historicopatientId=${state.patient.id}&patientName=${encodeURIComponent(state.patient.name || '')}`)}
                                                className="text-[10px] font-bold text-[#39ff14] hover:underline"
                                            >
                                                Ver HistÃ³rico â†’
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </RxvCard>
                            )}

                            {/* Template */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="palette"
                                    title="Template"
                                    subtitle="AparÃªncia do receituÃ¡rio"
                                />
                                <div className="flex gap-3 items-end">
                                    <div className="flex-1">
                                        <RxvField label="Selecione o template">
                                            <RxvSelect
                                                value={state.templateId || BUILTIN_TEMPLATES[0].id}
                                                onChange={(e) =>
                                                    updateState((prev) => ({ ...prev, templateId: e.target.value }))
                                                }
                                                options={allTemplates.map((t) => ({
                                                    value: t.id,
                                                    label: t.name,
                                                }))}
                                            />
                                        </RxvField>
                                    </div>
                                    <button
                                        type="button"
                                        className="shrink-0 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                                        onClick={() => navigate('/receituario-vet/templates')}
                                    >
                                        Editar templates
                                    </button>
                                </div>
                            </RxvCard>

                            {/* RecomendaÃ§Ãµes */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="chat"
                                    title="RecomendaÃ§Ãµes"
                                    subtitle="OrientaÃ§Ãµes ao tutor"
                                />
                                <RxvField label="RecomendaÃ§Ãµes gerais">
                                    <RxvTextarea
                                        placeholder="Digite orientaÃ§Ãµes gerais ao tutor..."
                                        value={state.recommendations}
                                        onChange={(e) =>
                                            updateState((prev) => ({ ...prev, recommendations: e.target.value }))
                                        }
                                        rows={4}
                                    />
                                </RxvField>
                            </RxvCard>

                            {/* Exames */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="lab_research"
                                    title="Exames"
                                    subtitle="SolicitaÃ§Ãµes de exames"
                                />

                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {COMMON_EXAMS.map((exam) => {
                                            const selected = state.exams.includes(exam) ? return (
                                                <button
                                                    key={exam}
                                                    type="button"
                                                    onClick={() => toggleExam(exam)}
                                                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${selected ?
                                                         'border-[#39ff14]/60 bg-[#39ff14]/10 text-[#39ff14]'
                                                        : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                                                        }`}
                                                >
                                                    {selected && 'âœ“ '}
                                                    {exam}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {/* Exame customizado */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 rounded-lg border border-slate-700 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-[#39ff14]/40 focus:outline-none"
                                            placeholder="Adicionar exame personalizado..."
                                            value={customExamDraft}
                                            onChange={(e) => setCustomExamDraft(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault() ? addCustomExam()
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 transition-colors"
                                            onClick={addCustomExam}
                                        >
                                            + Adicionar
                                        </button>
                                    </div>

                                    {/* Exames selecionados (custom) */}
                                    {state.exams.filter((e) => !COMMON_EXAMS.includes(e)).map((exam) => (
                                        <div key={exam} className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2">
                                            <span className="text-xs text-slate-300">{exam}</span>
                                            <button
                                                type="button"
                                                onClick={() => toggleExam(exam)}
                                                className="text-slate-600 hover:text-red-400"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">close</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </RxvCard>

                            {/* Itens da Receita */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="medication"
                                    title="Itens da PrescriÃ§Ã£o"
                                    subtitle="Medicamentos e produtos"
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
                                                + CatÃ¡logo
                                            </RxvButton>
                                        </div>
                                        {quickMode && (
                                            <button
                                                type="button"
                                                onClick={() => setQuickAddExpanded((prev) => !prev)}
                                                className={`rounded-lg border px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors ${quickAddExpanded ?
                                                     'border-[#39ff14]/60 bg-[#39ff14]/15 text-[#9eff8f]'
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
                                                className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${quickEntryMode === 'catalog' ?
                                                     'border-[#39ff14]/60 bg-[#39ff14]/15 text-[#84ff6d]'
                                                    : 'border-slate-700 bg-black/30 text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                Catalogo rapido
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setQuickEntryMode('manual') ? setQuickSelectedMedication(null) ? setQuickPresentations([]) ? setQuickPresentationId('')
                                                }}
                                                className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${quickEntryMode === 'manual' ?
                                                     'border-[#39ff14]/60 bg-[#39ff14]/15 text-[#84ff6d]'
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
                                                            ) : quickCatalogResults.length  (
                                                                quickCatalogResults.map((med) => (
                                                                    <button
                                                                        key={med.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setQuickSelectedMedication(med) ? setQuickMedicationName(med.name) ? setQuickRoute(med.default_route || 'VO')
                                                                        }}
                                                                        className="w-full rounded-lg border border-slate-700 bg-black/30 px-3 py-2 text-left hover:border-[#39ff14]/50"
                                                                    >
                                                                        <p className="text-sm font-semibold text-white">{med.name}</p>
                                                                    </button>
                                                                ))
                                                            ) ? (
                                                                <p className="text-xs text-slate-500">Sem resultados.</p>
                                                            )}
                                                        </div>
                                                    </>
                                                ) ? (
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
                                                                    label: [entry.pharmaceutical_form || 'Sem forma', entry.concentration_text || 'Sem concentracao'].join(' - '),
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
                                            Use "CatÃ¡logo" para buscar no banco ou "Manual" para inserir dados livres
                                        </p>
                                    </div>
                                ) ? (
                                    <div className="space-y-3">
                                        {state.items.map((item, idx) => (
                                            <div
                                                key={item.id}
                                                className="rounded-xl border border-slate-800 bg-black/40 p-4"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[10px] font-black text-slate-600">#{idx + 1}</span>
                                                            {item.isManual && (
                                                                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                                                    manual
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-sm font-bold text-white truncate">
                                                            {item.name}
                                                            {item.concentration_text && (
                                                                <span className="ml-1 font-normal text-slate-400">{item.concentration_text}</span>
                                                            )}
                                                            {item.commercial_name && (
                                                                <span className="ml-1 font-normal text-amber-400">({item.commercial_name})</span>
                                                            )}
                                                        </h3>
                                                        {item.pharmaceutical_form && (
                                                            <p className="text-xs text-slate-500 mt-0.5">{item.pharmaceutical_form}</p>
                                                        )}
                                                        <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] text-slate-500">
                                                            {item.dose && <span className="rounded bg-slate-800/80 px-1.5 py-0.5">Dose: {item.dose}</span>}
                                                            {item.route && <span className="rounded bg-slate-800/80 px-1.5 py-0.5">{item.route}</span>}
                                                            {item.frequency && <span className="rounded bg-slate-800/80 px-1.5 py-0.5">{item.frequency}</span>}
                                                            {item.duration && <span className="rounded bg-slate-800/80 px-1.5 py-0.5">{item.duration}</span>}
                                                            {item.avg_price_brl && item.avg_price_brl > 0 && (
                                                                <span className="rounded bg-emerald-900/30 px-1.5 py-0.5 text-emerald-500">
                                                                    R$ {item.avg_price_brl.toFixed(2)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {item.cautions && item.cautions.length > 0 && (
                                                            <p className="mt-1 text-[10px] text-red-400">
                                                                âš ï¸ {item.cautions.join(' | ')}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="shrink-0 rounded-lg p-1.5 text-slate-600 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                                                        title="Remover item"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </RxvCard>
                        </div>

                        {/* ==================== COLUNA DIREITA: PREVIEW ==================== */}
                        <div className={`lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto ${showPreview ? '' : 'hidden lg:block'}`}>
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="visibility"
                                    title="VisualizaÃ§Ã£o PrÃ©via"
                                    subtitle="Preview em tempo real"
                                />

                                {/* Preview container com scroll prÃ³prio */}
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

                                    {/* Preview escalado â€” container com scroll vertical */}
                                    <div
                                        className="overflow-y-auto overflow-x-hidden"
                                        style={{ maxHeight: '520px' }}
                                    >
                                        {/* O scale reduz visualmente sem alterar o layout box.
                                            Usamos transformOrigin top-left + width compensada
                                            para preencher a largura do container. */}
                                        <div
                                            style={{
                                                transform: 'scale(0.6)',
                                                transformOrigin: 'top left',
                                                width: `${(100 / 0.6).toFixed(2)}%`,
                                            }}
                                        >
                                            <RxPrintView
                                                doc={printDoc}
                                                template={selectedTemplateObj}
                                                compact={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </RxvCard>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== MODALS ==================== */}

            {/* Modal catÃ¡logo */}
            <AddMedicationModal2
                open={medicationModalOpen}
                onClose={() => setMedicationModalOpen(false)}
                onAdd={(item) => {
                    handleAddItem(item) ? setMedicationModalOpen(false)
                }}
                clinicId={clinicId || ''}
                patient={state.patient}
                manualMode={false}
            />

            {/* Modal manual */}
            <AddMedicationModal2
                open={manualModalOpen}
                onClose={() => setManualModalOpen(false)}
                onAdd={(item) => {
                    handleAddItem(item) ? setManualModalOpen(false)
                }}
                clinicId={clinicId || ''}
                patient={state.patient}
                manualMode={true}
            />
        </ReceituarioChrome>
    )
}
