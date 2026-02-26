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
import { buildPrintDocFromNovaReceita2 } from './novaReceita2Adapter'
import { BUILTIN_TEMPLATES } from './builtinTemplates'
import { savePrescription, getPrescriptionById } from '../../src/lib/prescriptionsRecords'
import { loadRxDb, findProfileSettings } from './rxDb'
import type { RxTemplateStyle } from './rxDb'

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
        const parsed = JSON.parse(raw) as NovaReceita2State
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
    templateId: string | null
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
    instructions?: string
    cautions?: string[]

    // Campos completos da apresentação (medication_presentations)
    pharmaceutical_form?: string
    concentration_text?: string
    commercial_name?: string
    additional_component?: string
    value?: string
    value_unit?: string
    per_value?: string
    per_unit?: string
    avg_price_brl?: number
    package_quantity?: string
    package_unit?: string
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

// ==================== DEFAULT STATE ====================

function createDefaultState(): NovaReceita2State {
    return {
        prescriber: null,
        tutor: null,
        patient: null,
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
                    const loaded = record.content.stateSnapshot as NovaReceita2State
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

    // ==================== MEMO ====================

    const printDoc = useMemo(() => {
        return buildPrintDocFromNovaReceita2(state)
    }, [state])

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
        const id = state.templateId || BUILTIN_TEMPLATES[0].id
        return allTemplates.find((t) => t.id === id) || allTemplates[0]
    }, [state.templateId, allTemplates])

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
                    templateId: state.templateId,
                    printDoc,
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
                <div className="mx-auto max-w-[1800px] px-4 pt-6 sm:px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px]">

                        {/* ==================== COLUNA ESQUERDA: EDITOR ==================== */}
                        <div className="space-y-5 min-w-0">

                            {/* Identificação */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="medical_information"
                                    title="Identificação"
                                    subtitle="Tutor e paciente"
                                />
                                <div className="space-y-4">
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
                                    {state.patient?.weight_kg && (
                                        <div className="flex items-center justify-between px-1">
                                            <p className="text-xs text-slate-500">
                                                Peso: <span className="font-semibold text-slate-300">{state.patient.weight_kg} kg</span>
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/receituario-vet/historico?patientId=${state.patient?.id}&patientName=${encodeURIComponent(state.patient?.name || '')}`)}
                                                className="text-[10px] font-bold text-[#39ff14] hover:underline"
                                            >
                                                Ver Histórico →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </RxvCard>

                            {/* Template */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="palette"
                                    title="Template"
                                    subtitle="Aparência do receituário"
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

                            {/* Recomendações */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="chat"
                                    title="Recomendações"
                                    subtitle="Orientações ao tutor"
                                />
                                <RxvField label="Recomendações gerais">
                                    <RxvTextarea
                                        placeholder="Digite orientações gerais ao tutor..."
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
                                    subtitle="Solicitações de exames"
                                />

                                <div className="space-y-3">
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
                                                    {selected && '✓ '}
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
                                                    e.preventDefault()
                                                    addCustomExam()
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
                                    title="Itens da Prescrição"
                                    subtitle="Medicamentos e produtos"
                                >
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
                                </RxvSectionHeader>

                                {state.items.length === 0 ? (
                                    <div className="rounded-xl border-2 border-dashed border-slate-800/50 bg-black/20 px-6 py-10 text-center">
                                        <span className="material-symbols-outlined text-slate-700 text-[40px]">
                                            inventory_2
                                        </span>
                                        <p className="mt-3 text-sm font-bold text-slate-600">
                                            Nenhum item adicionado
                                        </p>
                                        <p className="mt-1 text-xs text-slate-700">
                                            Use "Catálogo" para buscar no banco ou "Manual" para inserir dados livres
                                        </p>
                                    </div>
                                ) : (
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
                                                                ⚠️ {item.cautions.join(' | ')}
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

                                    {/* Preview escalado — container com scroll vertical */}
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

            {/* Modal catálogo */}
            <AddMedicationModal2
                open={medicationModalOpen}
                onClose={() => setMedicationModalOpen(false)}
                onAdd={(item) => {
                    updateState((prev) => ({
                        ...prev,
                        items: [...prev.items, item],
                    }))
                    setMedicationModalOpen(false)
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
                    updateState((prev) => ({
                        ...prev,
                        items: [...prev.items, item],
                    }))
                    setManualModalOpen(false)
                }}
                clinicId={clinicId || ''}
                patient={state.patient}
                manualMode={true}
            />
        </ReceituarioChrome>
    )
}
