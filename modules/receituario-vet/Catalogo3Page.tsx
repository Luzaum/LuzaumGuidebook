import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ReceituarioChrome from './ReceituarioChrome'
import { useClinic } from '../../src/components/ClinicProvider'
import {
    listMedications,
    getMedicationDetails,
    getMedicationPresentations,
    saveMedication,
    deleteMedication,
    pickMedicationFields,
    pickPresentationFields,
    getMedicationRecommendedDoses,
    saveMedicationRecommendedDoses,
    type RecommendedDose
} from '../../src/lib/clinicRecords'

import {
    RxvCard,
    RxvSectionHeader,
    RxvField,
    RxvInput,
    RxvSelect,
    RxvTextarea,
    RxvToggle,
    RxvChipsMultiSelect,
    RxvPillToggle,
    RxvButton
} from '../../src/components/receituario/RxvComponents'

// ==================== TIPOS ====================

interface Medication {
    id: string
    name: string
    is_controlled: boolean
    notes: string | null
    species: string[] | null // ✅ CORRETO: 'species' é o nome da coluna no Supabase (não species_targets!)
    routes: string[] | null // ✅ CORRETO: 'routes' é o nome da coluna no Supabase (não route_group!)
    is_active: boolean
    metadata?: any
    created_at?: string
}

interface Presentation {
    id?: string
    medication_id?: string
    pharmaceutical_form: string
    commercial_name: string | null
    value: number | null
    value_unit: string
    per_value: number
    per_unit: string
    avg_price_brl: number | null
    pharmacy_veterinary: boolean
    pharmacy_human: boolean
    pharmacy_compounding: boolean
    metadata?: {
        manufacturer?: string
        administration_routes?: string[]
        obs?: string
    }
    _tempId?: string
}

interface RecommendedDoseUI {
    id?: string // se existir no DB
    client_id: string // UUID estável para React keys
    species: string
    route: string
    dose_value: number | null
    dose_unit: string
    frequency: string | null
    notes: string | null
}

interface MedicationWithPresentations extends Medication {
    presentations: Presentation[]
    recommended_doses?: RecommendedDoseUI[]
}

// ==================== CONSTANTES ====================

const PHARMACEUTICAL_FORMS = [
    'Comprimido', 'Cápsula', 'Solução oral', 'Suspensão oral', 'Injetável',
    'Pomada/creme', 'Colírio', 'Otológico', 'Shampoo', 'Spray',
    'Transdérmico', 'Implante', 'Outros'
]

const VALUE_UNITS = ['mg', 'g', 'mcg', 'mg/mL', 'mcg/mL', '%', 'UI/mL', 'mEq/mL']

const PER_UNITS = ['comprimido', 'mL', 'dose', 'cápsula', 'gota', 'spray', 'bisnaga', 'ampola', 'patch']

const CLINICAL_TAGS_OPTIONS = [
    'AINE', 'Antibiótico', 'Antiemético', 'Sedativo', 'Cardioativo',
    'Antiparasitário', 'Antifúngico', 'Corticoide', 'Analgésico', 'Outros'
]

const ROUTES_OPTIONS = ['VO', 'IV', 'IM', 'SC', 'Tópica', 'Ocular', 'Otológica', 'Inalatória', 'Outras']

const SPECIES_OPTIONS = ['cão', 'gato', 'ambos'] // ✅ TAREFA B: adicionar "ambos"

const DOSE_UNITS = ['mg/kg', 'mg', 'mL/kg', 'mL', 'UI/kg', 'UI', 'mcg/kg', 'mcg', 'g/kg']

const FREQUENCY_OPTIONS = [
    '1x ao dia',
    '2x ao dia',
    '3x ao dia',
    '4x ao dia',
    '6x ao dia',
    '8x ao dia',
    '12x ao dia',
    '24x ao dia'
] // ✅ TAREFA B: frequências padronizadas

// ==================== HELPERS ====================

/**
 * Normaliza valor numérico: converte string → number, NaN → null
 * @param value - Valor a normalizar
 * @param allowNull - Se true, permite null; se false, retorna 0 para null/NaN
 * @returns Number ou null
 */
function normalizeNumber(value: any, allowNull = true): number | null {
    if (value === null || value === undefined || value === '') {
        return allowNull ? null : 0
    }
    const num = Number(value)
    if (isNaN(num)) {
        return allowNull ? null : 0
    }
    return num
}

function createEmptyPresentation(): Presentation {
    return {
        _tempId: crypto.randomUUID(),
        pharmaceutical_form: 'Comprimido',
        commercial_name: '',
        value: null,
        value_unit: 'mg',
        per_value: 1,
        per_unit: 'comprimido',
        avg_price_brl: null,
        pharmacy_veterinary: true,
        pharmacy_human: false,
        pharmacy_compounding: false,
        metadata: {
            manufacturer: '',
            administration_routes: [],
            obs: ''
        }
    }
}

function createEmptyRecommendedDose(): RecommendedDoseUI {
    return {
        client_id: crypto.randomUUID(),
        species: 'cão',
        route: 'VO',
        dose_value: null,
        dose_unit: 'mg/kg',
        frequency: null,
        notes: null
    }
}

function createEmptyMedication(): MedicationWithPresentations {
    return {
        id: '',
        name: '',
        notes: '',
        species: ['cão', 'gato'], // ✅ text[] no Supabase
        routes: [], // ✅ text[] no Supabase
        is_active: true,
        is_controlled: false,
        metadata: {
            active_ingredient: '',
            therapeutic_class: '',
            clinical_tags: []
        },
        presentations: [createEmptyPresentation()],
        recommended_doses: [] // ✅ Doses recomendadas
    }
}

// ==================== COMPONENTE PRINCIPAL ====================

export default function Catalogo3Page() {
    const navigate = useNavigate()
    const { loading: clinicLoading, clinicId } = useClinic()
    const [currentUser, setCurrentUser] = useState<any>(null)

    // Estados principais
    const [medications, setMedications] = useState<Medication[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [draft, setDraft] = useState<MedicationWithPresentations>(createEmptyMedication())
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isDirty, setIsDirty] = useState(false)
    const [showUnsavedModal, setShowUnsavedModal] = useState<{ nextId: string | null } | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState<{ title: string, msg: string } | null>(null)

    useEffect(() => {
        const rawUser = localStorage.getItem('luzaum-user')
        if (rawUser) setCurrentUser(JSON.parse(rawUser))
    }, [])

    useEffect(() => {
        if (!clinicLoading && clinicId) {
            loadMedicationsList()
        }
    }, [clinicLoading, clinicId])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault()
                handleSave()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [draft, isDirty, isSaving])

    async function loadMedicationsList() {
        try {
            setLoading(true)
            if (!clinicId) return
            const data = await listMedications(clinicId)
            setMedications(data)
            setLoading(false)
        } catch (error) {
            console.error('[Catalogo3] Error loading medications:', error)
            setLoading(false)
        }
    }

    const loadSelectedItem = useCallback(async (id: string) => {
        try {
            if (!clinicId) return
            setLoading(true)
            const details = await getMedicationDetails(clinicId, id)
            const presentations = await getMedicationPresentations(clinicId, id)
            const doses = await getMedicationRecommendedDoses(clinicId, id) // ✨ Carregar doses

            if (details) {
                // Normalizar metadados
                const medMetadata = details.metadata || {}

                const fullMed: MedicationWithPresentations = {
                    ...details,
                    is_active: details.is_active ?? true,
                    species: details.species || ['cão', 'gato'], // ✅ text[] do Supabase
                    routes: details.routes || [], // ✅ text[] do Supabase
                    metadata: {
                        active_ingredient: medMetadata.active_ingredient || (details as any).active_ingredient || '',
                        therapeutic_class: medMetadata.therapeutic_class || '',
                        clinical_tags: medMetadata.clinical_tags || []
                    },
                    presentations: presentations.map(p => {
                        const pMetadata = p.metadata || {}
                        return {
                            ...p,
                            _tempId: p.id,
                            metadata: {
                                manufacturer: pMetadata.manufacturer || '',
                                administration_routes: pMetadata.administration_routes || [],
                                obs: pMetadata.obs || ''
                            }
                        }
                    }),
                    recommended_doses: doses.map(d => ({ // ✨ Mapear doses
                        id: d.id,
                        client_id: d.id || crypto.randomUUID(),
                        species: d.species,
                        route: d.route,
                        dose_value: d.dose_value,
                        dose_unit: d.dose_unit,
                        frequency: d.frequency,
                        notes: d.notes
                    }))
                }
                setDraft(fullMed)
                setSelectedId(id)
                setIsDirty(false)
                setValidationErrors({})
            }
            setLoading(false)
        } catch (error) {
            console.error('[Catalogo3] Error loading details:', error)
            setLoading(false)
        }
    }, [clinicId])

    const handleSelectMedication = (id: string) => {
        if (id === selectedId) return
        if (isDirty) {
            setShowUnsavedModal({ nextId: id })
        } else {
            loadSelectedItem(id)
        }
    }

    const handleCreateNew = () => {
        if (isDirty) {
            setShowUnsavedModal({ nextId: '' })
        } else {
            setDraft(createEmptyMedication())
            setSelectedId(null)
            setIsDirty(false)
            setValidationErrors({})
        }
    }

    const handleDiscardChanges = () => {
        const nextTarget = showUnsavedModal?.nextId
        setShowUnsavedModal(null)
        if (nextTarget === '') {
            setDraft(createEmptyMedication())
            setSelectedId(null)
            setIsDirty(false)
        } else if (nextTarget) {
            loadSelectedItem(nextTarget)
        }
    }

    const handleSaveAndSwitch = async () => {
        const success = await handleSave()
        if (success) {
            const nextTarget = showUnsavedModal?.nextId
            setShowUnsavedModal(null)
            if (nextTarget === '') {
                setDraft(createEmptyMedication())
                setSelectedId(null)
            } else if (nextTarget) {
                loadSelectedItem(nextTarget)
            }
        }
    }

    const updateDraft = (updates: Partial<MedicationWithPresentations>) => {
        setDraft(prev => ({ ...prev, ...updates }))
        setIsDirty(true)
    }

    const updateMetadata = (updates: Partial<Medication['metadata']>) => {
        setDraft(prev => ({
            ...prev,
            metadata: { ...prev.metadata, ...updates }
        }))
        setIsDirty(true)
    }

    const updatePresentation = (tempId: string, updates: Partial<Presentation>) => {
        setDraft(prev => ({
            ...prev,
            presentations: prev.presentations.map(p => p._tempId === tempId ? { ...p, ...updates } : p)
        }))
        setIsDirty(true)
    }

    const updatePresentationMetadata = (tempId: string, updates: Partial<Presentation['metadata']>) => {
        setDraft(prev => ({
            ...prev,
            presentations: prev.presentations.map(p =>
                p._tempId === tempId ? { ...p, metadata: { ...p.metadata, ...updates } } : p
            )
        }))
        setIsDirty(true)
    }

    const addPresentation = () => {
        const newPres = createEmptyPresentation()
        setDraft(prev => ({
            ...prev,
            presentations: [...prev.presentations, newPres]
        }))
        setIsDirty(true)
    }

    const removePresentation = (tempId: string) => {
        if (draft.presentations.length <= 1) return
        setDraft(prev => ({
            ...prev,
            presentations: prev.presentations.filter(p => p._tempId !== tempId)
        }))
        setIsDirty(true)
    }

    // ==================== HANDLERS - DOSES RECOMENDADAS ====================

    const addRecommendedDose = () => {
        const newDose = createEmptyRecommendedDose()
        setDraft(prev => ({
            ...prev,
            recommended_doses: [...(prev.recommended_doses || []), newDose]
        }))
        setIsDirty(true)
    }

    const removeRecommendedDose = (client_id: string) => {
        setDraft(prev => ({
            ...prev,
            recommended_doses: prev.recommended_doses?.filter(d => d.client_id !== client_id)
        }))
        setIsDirty(true)
    }

    const updateRecommendedDose = (client_id: string, updates: Partial<RecommendedDoseUI>) => {
        setDraft(prev => ({
            ...prev,
            recommended_doses: prev.recommended_doses?.map(d =>
                d.client_id === client_id ? { ...d, ...updates } : d
            )
        }))
        setIsDirty(true)
    }

    const showValidationWarning = (title: string, msg: string) => {
        console.warn('[Catalogo3] VALIDATION BLOCK:', { title, msg })
        setErrorToast({ title, msg })
        setTimeout(() => setErrorToast(null), 5000)
    }

    const validate = (): boolean => {
        const errors: Record<string, string> = {}
        let firstErrorField: string | null = null

        if (!draft.name?.trim()) {
            errors['name'] = 'Nome obrigatório'
            if (!firstErrorField) firstErrorField = 'Nome do Medicamento'
        } else if (draft.name.trim().length < 2) {
            errors['name'] = 'Mínimo 2 caracteres'
            if (!firstErrorField) firstErrorField = 'Nome do Medicamento'
        }

        draft.presentations.forEach((p, idx) => {
            const prefix = `pres_${p._tempId}`
            if (!p.pharmaceutical_form) {
                errors[`${prefix}_form`] = 'Obrigatório'
                if (!firstErrorField) firstErrorField = `Forma na apresentação ${idx + 1}`
            }
            if (p.value === null || p.value <= 0) {
                errors[`${prefix}_value`] = 'Inválido'
                if (!firstErrorField) firstErrorField = `Valor na apresentação ${idx + 1}`
            }
            if (!p.pharmacy_veterinary && !p.pharmacy_human && !p.pharmacy_compounding) {
                errors[`${prefix}_pharmacy`] = 'Obrigatório'
                if (!firstErrorField) firstErrorField = `Farmácia na apresentação ${idx + 1}`
            }
        })

        setValidationErrors(errors)

        if (Object.keys(errors).length > 0) {
            showValidationWarning('Dados Incompletos', `Verifique os campos em destaque. Ex: ${firstErrorField}`)
            return false
        }

        return true
    }

    async function handleSave(): Promise<boolean> {
        console.log('[Catalogo3] SAVE CLICKED', new Date().toISOString())

        if (!isDirty) {
            showValidationWarning('Nada para salvar', 'Nenhuma alteração foi detectada.')
            return false
        }

        if (!validate()) return false

        try {
            setIsSaving(true)
            if (!clinicId || !currentUser?.id) {
                showValidationWarning('Erro de Acesso', 'Não foi possível identificar a clínica ou usuário logado.')
                setIsSaving(false)
                return false
            }

            const medicationPayload = {
                name: draft.name.trim(),
                notes: draft.notes,
                is_controlled: !!draft.is_controlled,
                species: draft.species,
                routes: draft.routes,
                is_active: !!draft.is_active,
                metadata: {
                    active_ingredient: draft.metadata?.active_ingredient || '',
                    therapeutic_class: draft.metadata?.therapeutic_class || '',
                    clinical_tags: draft.metadata?.clinical_tags || []
                }
            }

            const presentationsPayload = draft.presentations.map(p => ({
                pharmaceutical_form: p.pharmaceutical_form,
                commercial_name: p.commercial_name?.trim() || null,
                value: normalizeNumber(p.value, false) || 1,
                value_unit: p.value_unit,
                per_value: normalizeNumber(p.per_value, false) || 1,
                per_unit: p.per_unit,
                avg_price_brl: normalizeNumber(p.avg_price_brl, true),
                pharmacy_veterinary: !!p.pharmacy_veterinary,
                pharmacy_human: !!p.pharmacy_human,
                pharmacy_compounding: !!p.pharmacy_compounding,
                metadata: {
                    manufacturer: p.metadata?.manufacturer || '',
                    administration_routes: p.metadata?.administration_routes || [],
                    obs: p.metadata?.obs
                }
            }))

            const cleanMedicationPayload = pickMedicationFields(medicationPayload)
            const cleanPresentationsPayload = presentationsPayload.map(p => pickPresentationFields(p))

            console.log('[Catalogo3] ========== SAVING PAYLOAD ==========')
            console.log('[Catalogo3] Med:', cleanMedicationPayload)
            console.log('[Catalogo3] Pres:', cleanPresentationsPayload)

            const result = await saveMedication({
                clinicId,
                userId: currentUser.id,
                medication: cleanMedicationPayload,
                medicationId: selectedId || undefined,
                presentations: cleanPresentationsPayload as any
            })

            console.log('[Catalogo3] ✅ Saved med id:', result.medication.id)

            // ✨ SALVAR DOSES RECOMENDADAS
            if (draft.recommended_doses && draft.recommended_doses.length > 0) {
                const dosesPayload = draft.recommended_doses.map(d => ({
                    id: d.id,
                    species: d.species,
                    route: d.route,
                    dose_value: normalizeNumber(d.dose_value, false) || 0,
                    dose_unit: d.dose_unit,
                    frequency: d.frequency,
                    notes: d.notes
                }))

                console.log('[Catalogo3] Saving doses...', dosesPayload)
                await saveMedicationRecommendedDoses(
                    clinicId,
                    result.medication.id,
                    dosesPayload
                )
            } else {
                await saveMedicationRecommendedDoses(clinicId, result.medication.id, [])
            }

            setSuccessToast(true)
            setTimeout(() => setSuccessToast(false), 3000)
            setIsDirty(false)
            loadMedicationsList()
            setSelectedId(result.medication.id)
            setIsSaving(false)
            return true
        } catch (error) {
            console.error('[Catalogo3] Save error:', error)
            showValidationWarning('Erro no Servidor', 'Ocorreu uma falha ao salvar os dados.')
            setIsSaving(false)
            return false
        }
    }

    const filteredMedications = useMemo(() => {
        return medications.filter(m =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.metadata?.active_ingredient?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [medications, searchTerm])

    const toggleClinicalTag = (tag: string) => {
        const current = draft.metadata?.clinical_tags || []
        const next = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag]
        updateMetadata({ clinical_tags: next })
    }

    const toggleAdminRoute = (tempId: string, route: string) => {
        const pres = draft.presentations.find(p => p._tempId === tempId)
        if (!pres) return
        const current = pres.metadata?.administration_routes || []
        const next = current.includes(route) ? current.filter(r => r !== route) : [...current, route]
        updatePresentationMetadata(tempId, { administration_routes: next })
    }

    // ==================== DELETE MEDICATION ====================

    const handleDelete = () => {
        const presCount = draft.presentations.length
        if (presCount > 1) {
            setShowDeleteModal(true)
            return
        }

        // Só 1 apresentação, confirmar diretamente
        if (!confirm(`Excluir medicamento "${draft.name}"?`)) return
        executeDelete()
    }

    const executeDelete = async () => {
        try {
            setIsSaving(true)
            if (!clinicId || !selectedId) throw new Error('Contexto inválido')

            console.log('[Catalogo3] ========== DELETE ==========')
            console.log('[Catalogo3] Deleting medication:', selectedId)

            await deleteMedication(clinicId, selectedId)

            console.log('[Catalogo3] ✅ DELETE SUCCESS')

            // Toast + reload
            setSuccessToast(true)
            setTimeout(() => setSuccessToast(false), 3000)

            loadMedicationsList()
            setDraft(createEmptyMedication())
            setSelectedId(null)
            setShowDeleteModal(false)
            setIsSaving(false)
        } catch (error: any) {
            console.error('[Catalogo3] ========== DELETE ERROR ==========')
            console.error('[Catalogo3] Error:', error)
            showValidationWarning('Erro ao Excluir', error?.message || String(error))
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-black">
            <ReceituarioChrome
                section="catalogo3"
                title="Catálogo"
                subtitle="Gerenciamento avançado de fármacos e apresentações comerciais."
                actions={
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCreateNew}
                            className="rxv-btn-secondary flex items-center gap-2 px-4 py-2 text-sm font-bold"
                        >
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            Novo Medicamento
                        </button>
                        {selectedId && (
                            <button
                                onClick={handleDelete}
                                disabled={isSaving}
                                className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 ring-1 ring-red-500/30 hover:bg-red-500/20 disabled:opacity-40 disabled:pointer-events-none transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                Excluir
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={!isDirty || isSaving}
                            className={`rxv-btn-primary flex items-center gap-2 px-6 py-2 text-sm font-black uppercase tracking-widest transition-all ${(!isDirty || isSaving) ? 'opacity-40 grayscale pointer-events-none' : 'shadow-[0_0_20px_rgba(57,255,20,0.4)]'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{isSaving ? 'sync' : 'save'}</span>
                            {isSaving ? 'Gravando...' : 'Salvar Dados'}
                        </button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                    {/* PAINEL LATERAL - LISTA */}
                    <aside className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="sticky top-6 flex flex-col gap-4"
                        >
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-600 transition-colors group-focus-within:text-[#39ff14]">search</span>
                                <input
                                    type="text"
                                    placeholder="Filtrar catálogo..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-800 bg-black/40 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:border-[#39ff14]/40 focus:ring-1 focus:ring-[#39ff14]/30"
                                />
                            </div>

                            <div className="rxv-card max-h-[70vh] overflow-y-auto p-1.5 custom-scrollbar bg-[#0a140a]/80">
                                <div className="px-3 py-3 border-b border-slate-800/50 mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Medicamentos ({medications.length})</span>
                                </div>
                                <AnimatePresence mode="popLayout">
                                    {filteredMedications.map((med, idx) => (
                                        <motion.button
                                            key={med.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.03 }}
                                            onClick={() => handleSelectMedication(med.id)}
                                            className={`group relative flex w-full flex-col gap-1 rounded-xl px-4 py-3 text-left transition-all ${selectedId === med.id
                                                ? 'bg-[#39ff14]/10 shadow-[inset_0_0_20px_rgba(57,255,20,0.05)] border border-[#39ff14]/30'
                                                : 'hover:bg-slate-800/30 border border-transparent'
                                                }`}
                                        >
                                            {selectedId === med.id && (
                                                <motion.div layoutId="active-pill" className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-full bg-[#39ff14]" />
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className={`text-sm font-black truncate ${selectedId === med.id ? 'text-[#39ff14]' : 'text-slate-300 group-hover:text-white'}`}>
                                                    {med.name}
                                                </span>
                                                {med.is_controlled && (
                                                    <span className="flex items-center justify-center rounded-md border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-black text-amber-500">CONTROL</span>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-tight truncate">
                                                Ativo: {med.metadata?.active_ingredient || 'Não informado'}
                                            </span>
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </aside>

                    {/* EDITOR PRINCIPAL */}
                    <main className="lg:col-span-9 space-y-8">

                        {/* 1. DADOS DO MEDICAMENTO */}
                        <RxvCard className="p-8 bg-[#0a140a]/60">
                            <RxvSectionHeader
                                icon="medication"
                                title="DADOS DO MEDICAMENTO"
                                subtitle="Informações genéricas e classificação"
                            >
                                <RxvPillToggle
                                    value={draft.is_active}
                                    labels={['CATÁLOGO ATIVO', 'RASCUNHO / INATIVO']}
                                    onToggle={() => updateDraft({ is_active: !draft.is_active })}
                                />
                            </RxvSectionHeader>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                                <RxvField label="Nome comercial / Nome do item *" error={validationErrors.name}>
                                    <RxvInput
                                        placeholder="Ex: Carbamazepina"
                                        value={draft.name ?? ''}
                                        onChange={e => updateDraft({ name: e.target.value })}
                                        error={!!validationErrors.name}
                                    />
                                </RxvField>

                                <RxvField label="Fármaco / Princípio Ativo">
                                    <RxvInput
                                        placeholder="..."
                                        value={draft.metadata?.active_ingredient ?? ''}
                                        onChange={e => updateMetadata({ active_ingredient: e.target.value })}
                                    />
                                </RxvField>

                                <RxvField label="Tags de Classificação Clínica" className="md:col-span-2">
                                    <RxvChipsMultiSelect
                                        options={CLINICAL_TAGS_OPTIONS}
                                        selected={draft.metadata?.clinical_tags || []}
                                        onToggle={toggleClinicalTag}
                                    />
                                </RxvField>

                                <RxvField label="Uso Controlado?">
                                    <div className="flex items-center gap-4 h-[52px]">
                                        <RxvToggle
                                            checked={!!draft.is_controlled}
                                            onChange={val => updateDraft({ is_controlled: val })}
                                            label={draft.is_controlled ? 'CONTROLADO' : 'VENDA LIVRE'}
                                        />
                                    </div>
                                </RxvField>

                                <RxvField label="Espécies Alvo Indicadas">
                                    <RxvChipsMultiSelect
                                        options={SPECIES_OPTIONS}
                                        selected={draft.species || []}
                                        onToggle={sp => {
                                            const next = draft.species?.includes(sp) ? draft.species.filter(s => s !== sp) : [...(draft.species || []), sp]
                                            updateDraft({ species: next })
                                        }}
                                    />
                                </RxvField>

                                <RxvField label="Anotações Gerais / Bula Simplificada" className="md:col-span-2">
                                    <RxvTextarea
                                        placeholder="Informações relevantes para o clínico..."
                                        value={draft.notes ?? ''}
                                        onChange={e => updateDraft({ notes: e.target.value })}
                                    />
                                </RxvField>
                            </div>
                        </RxvCard>

                        {/* 2. DOSES RECOMENDADAS */}
                        <RxvCard className="p-8 bg-[#0a140a]/60">
                            <RxvSectionHeader
                                icon="clinical_notes"
                                title="DOSES E PROTOCOLOS INDICADOS"
                                subtitle="Sugestões automáticas baseadas na espécie e via"
                            >
                                <button
                                    onClick={addRecommendedDose}
                                    className="flex items-center gap-2 rounded-xl bg-[#39ff14]/5 px-4 py-2 text-xs font-black text-[#39ff14] ring-1 ring-[#39ff14]/30 hover:bg-[#39ff14]/10 transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    ADICIONAR DOSE
                                </button>
                            </RxvSectionHeader>

                            {(!draft.recommended_doses || draft.recommended_doses.length === 0) ? (
                                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-black/20">
                                    <span className="material-symbols-outlined text-slate-700 text-[48px] mb-4">info</span>
                                    <p className="text-slate-500 font-bold text-sm">Nenhuma dose recomendada cadastrada.</p>
                                    <p className="text-[10px] text-slate-600 uppercase mt-1">Crie sugestões para agilizar a prescrição clínica.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {draft.recommended_doses.map((dose, idx) => (
                                        <div key={dose.client_id} className="relative group p-6 bg-black/40 border border-slate-800 rounded-2xl hover:border-[#39ff14]/20 transition-all">
                                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-full bg-slate-800 group-hover:bg-[#39ff14]/40" />
                                            <button
                                                onClick={() => removeRecommendedDose(dose.client_id)}
                                                className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                <RxvField label="Espécie" className="md:col-span-2">
                                                    <RxvSelect
                                                        options={SPECIES_OPTIONS}
                                                        value={dose.species}
                                                        onChange={(e) => updateRecommendedDose(dose.client_id, { species: e.target.value })}
                                                    />
                                                </RxvField>

                                                <RxvField label="Via" className="md:col-span-2">
                                                    <RxvSelect
                                                        options={ROUTES_OPTIONS}
                                                        value={dose.route}
                                                        onChange={(e) => updateRecommendedDose(dose.client_id, { route: e.target.value })}
                                                    />
                                                </RxvField>

                                                <RxvField label="Dose" className="md:col-span-2">
                                                    <RxvInput
                                                        type="number"
                                                        value={dose.dose_value ?? ''}
                                                        onChange={(e) => updateRecommendedDose(dose.client_id, { dose_value: e.target.value === '' ? null : Number(e.target.value) })}
                                                        placeholder="10"
                                                    />
                                                </RxvField>

                                                <RxvField label="Unidade" className="md:col-span-2">
                                                    <RxvSelect
                                                        options={DOSE_UNITS}
                                                        value={dose.dose_unit}
                                                        onChange={(e) => updateRecommendedDose(dose.client_id, { dose_unit: e.target.value })}
                                                    />
                                                </RxvField>

                                                <RxvField label="Frequência" className="md:col-span-4">
                                                    <RxvSelect
                                                        options={FREQUENCY_OPTIONS}
                                                        value={dose.frequency ?? ''}
                                                        onChange={(e) => updateRecommendedDose(dose.client_id, { frequency: e.target.value })}
                                                    />
                                                </RxvField>

                                                <RxvField label="Observações de Uso" className="md:col-span-12">
                                                    <RxvInput
                                                        value={dose.notes ?? ''}
                                                        onChange={(e) => updateRecommendedDose(dose.client_id, { notes: e.target.value })}
                                                        placeholder="Ex: Ajustar dose conforme peso/idade..."
                                                    />
                                                </RxvField>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </RxvCard>

                        {/* 3. LISTA DE APRESENTAÇÕES */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-1 bg-[#39ff14] rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                                    <div>
                                        <h2 className="text-lg font-black text-white italic tracking-tight uppercase">APRESENTAÇÕES COMERCIAIS</h2>
                                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Formas, concentrações e especificações técnicas</p>
                                    </div>
                                </div>
                                <button
                                    onClick={addPresentation}
                                    className="flex items-center gap-2 rounded-xl bg-[#39ff14]/5 px-4 py-2 text-xs font-black text-[#39ff14] ring-1 ring-[#39ff14]/30 hover:bg-[#39ff14]/10 transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add_task</span>
                                    ADICIONAR LINHA
                                </button>
                            </div>

                            <AnimatePresence>
                                {draft.presentations.map((pres, idx) => {
                                    const prefix = `pres_${pres._tempId}`
                                    const hasPharmacyError = validationErrors[`${prefix}_pharmacy`]
                                    const hasFormError = validationErrors[`${prefix}_form`]

                                    return (
                                        <RxvCard key={pres._tempId} className="bg-[#0a140a]/40">
                                            <div className="absolute -left-1.5 top-8 h-8 w-1 rounded-full bg-slate-800 group-hover:bg-[#39ff14]/50 transition-colors" />

                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                                {/* BASIC INFO */}
                                                <RxvField label="Forma Farmacêutica *" error={hasFormError} className="md:col-span-3">
                                                    <RxvSelect
                                                        options={PHARMACEUTICAL_FORMS}
                                                        value={pres.pharmaceutical_form ?? ''}
                                                        onChange={e => updatePresentation(pres._tempId!, { pharmaceutical_form: e.target.value })}
                                                        error={!!hasFormError}
                                                    />
                                                </RxvField>

                                                <RxvField label="Nome comercial / Identificador" className="md:col-span-6">
                                                    <RxvInput
                                                        placeholder="Ex: Lab X, Medicamento Genérico..."
                                                        value={pres.commercial_name ?? ''}
                                                        onChange={e => updatePresentation(pres._tempId!, { commercial_name: e.target.value })}
                                                    />
                                                </RxvField>

                                                <RxvField label="Laboratório (Fabricante)" className="md:col-span-3">
                                                    <RxvInput
                                                        placeholder="..."
                                                        value={pres.metadata?.manufacturer ?? ''}
                                                        onChange={e => updatePresentationMetadata(pres._tempId!, { manufacturer: e.target.value })}
                                                    />
                                                </RxvField>

                                                {/* CONCENTRAÇÃO / COMPOSIÇÃO */}
                                                <div className="md:col-span-12">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="h-[1px] flex-1 bg-slate-800/60" />
                                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] italic">Composição e Força</span>
                                                        <div className="h-[1px] flex-1 bg-slate-800/60" />
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-black/40 p-4 border border-slate-800/50">
                                                        <div className="w-28 space-y-1">
                                                            <label className="text-[8px] font-black text-slate-500 uppercase pl-1">Concentração</label>
                                                            <RxvInput
                                                                type="number"
                                                                className="text-center font-black text-[#39ff14]"
                                                                value={pres.value === null ? '' : pres.value}
                                                                onChange={e => updatePresentation(pres._tempId!, { value: e.target.value === '' ? null : Number(e.target.value) })}
                                                            />
                                                        </div>
                                                        <div className="w-28 space-y-1">
                                                            <label className="text-[8px] font-black text-slate-500 uppercase pl-1">Unidade</label>
                                                            <RxvSelect
                                                                options={VALUE_UNITS}
                                                                value={pres.value_unit ?? ''}
                                                                onChange={e => updatePresentation(pres._tempId!, { value_unit: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="mt-4 px-2 text-[11px] font-black text-slate-600 uppercase italic">por</div>

                                                        <div className="w-20 space-y-1">
                                                            <label className="text-[8px] font-black text-slate-500 uppercase pl-1">Quantidade</label>
                                                            <RxvInput
                                                                type="number"
                                                                className="text-center"
                                                                value={pres.per_value ?? ''}
                                                                onChange={e => updatePresentation(pres._tempId!, { per_value: Number(e.target.value) })}
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-[140px] space-y-1">
                                                            <label className="text-[8px] font-black text-slate-500 uppercase pl-1">Unidade por Quantidade</label>
                                                            <RxvSelect
                                                                options={PER_UNITS}
                                                                value={pres.per_unit ?? ''}
                                                                onChange={e => updatePresentation(pres._tempId!, { per_unit: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="flex flex-col items-center justify-center bg-[#39ff14]/5 rounded-xl px-6 py-2 border border-[#39ff14]/30 min-w-[150px]">
                                                            <span className="text-[8px] font-black text-[#39ff14]/60 uppercase tracking-tighter mb-0.5">RESUMO DA LINHA</span>
                                                            <span className="text-sm font-black text-[#39ff14] italic">
                                                                {pres.value || '0'} {pres.value_unit} / {pres.per_value} {pres.per_unit}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* EMBALAGEM E VIAS */}
                                                {/* Embalagem removida do Supabase por enquanto */}
                                                <RxvField label="Vias de Administração Sugeridas" className="md:col-span-8">
                                                    <RxvChipsMultiSelect
                                                        options={ROUTES_OPTIONS}
                                                        selected={pres.metadata?.administration_routes || []}
                                                        onToggle={route => toggleAdminRoute(pres._tempId!, route)}
                                                    />
                                                </RxvField>

                                                {/* FARMÁCIA E CUSTO */}
                                                <RxvField
                                                    label="Origem da Farmácia * (Selecione pelo menos um)"
                                                    error={hasPharmacyError}
                                                    className="md:col-span-6"
                                                >
                                                    <div className="flex items-center gap-2 pt-1">
                                                        {[
                                                            { key: 'pharmacy_veterinary', label: 'VET', icon: 'pets' },
                                                            { key: 'pharmacy_human', label: 'HUM', icon: 'person' },
                                                            { key: 'pharmacy_compounding', label: 'MANIP', icon: 'science' },
                                                        ].map(ph => (
                                                            <button
                                                                key={ph.key}
                                                                type="button"
                                                                onClick={() => updatePresentation(pres._tempId!, { [ph.key]: !pres[ph.key as keyof Presentation] })}
                                                                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-[10px] font-black uppercase transition-all ${pres[ph.key as keyof Presentation]
                                                                    ? 'bg-[#39ff14]/20 border-[#39ff14]/60 text-[#39ff14]'
                                                                    : 'bg-slate-950 border-slate-900 text-slate-700'
                                                                    } ${hasPharmacyError ? 'border-red-500/50' : ''}`}
                                                            >
                                                                <span className="material-symbols-outlined text-[16px]">{ph.icon}</span>
                                                                {ph.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </RxvField>

                                                <RxvField label="Preço Médio (R$)" className="md:col-span-4">
                                                    <RxvInput
                                                        type="number" step="0.01"
                                                        value={pres.avg_price_brl ?? ''}
                                                        onChange={e => updatePresentation(pres._tempId!, { avg_price_brl: e.target.value ? Number(e.target.value) : null })}
                                                        placeholder="0,00"
                                                    />
                                                </RxvField>

                                                <div className="md:col-span-2 flex items-end justify-end">
                                                    <button
                                                        onClick={() => removePresentation(pres._tempId!)}
                                                        className="group/del flex h-14 w-full md:w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 text-red-500/50 hover:bg-red-500/40 hover:text-white transition-all shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                                    >
                                                        <span className="material-symbols-outlined text-[24px]">delete_forever</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </RxvCard>
                                    )
                                })}
                            </AnimatePresence>

                            <div className="flex justify-center p-8">
                                <button
                                    onClick={addPresentation}
                                    className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-slate-700 bg-slate-900/40 text-slate-600 group-hover:border-[#39ff14]/50 group-hover:text-[#39ff14] group-hover:shadow-[0_0_40px_rgba(57,255,20,0.2)] transition-all">
                                        <span className="material-symbols-outlined text-[36px]">add</span>
                                    </div>
                                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em] group-hover:text-[#39ff14]">Nova Apresentação</span>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </ReceituarioChrome>

            {/* TOASTS & MODALS */}
            <AnimatePresence>
                {successToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, x: '-50%' }}
                        className="fixed bottom-10 left-1/2 z-[500] flex items-center gap-4 rounded-2xl bg-[#091509] border border-[#39ff14]/40 px-6 py-4 shadow-2xl"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#39ff14] text-black">
                            <span className="material-symbols-outlined font-black">verified</span>
                        </div>
                        <div>
                            <p className="text-sm font-black text-white italic">SUCESSO!</p>
                            <p className="text-[10px] font-bold text-[#39ff14] uppercase tracking-widest">Medicamento salvo e atualizado.</p>
                        </div>
                    </motion.div>
                )}

                {errorToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, x: '-50%' }}
                        className="fixed bottom-10 left-1/2 z-[500] flex items-center gap-4 rounded-2xl bg-[#1a0505] border border-red-500/40 px-6 py-4 shadow-2xl"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
                            <span className="material-symbols-outlined font-black">report</span>
                        </div>
                        <div>
                            <p className="text-sm font-black text-white italic uppercase">{errorToast.title}</p>
                            <p className="text-[10px] font-bold text-red-200 uppercase tracking-tight">{errorToast.msg}</p>
                        </div>
                    </motion.div>
                )}

                {showUnsavedModal && (
                    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md rounded-3xl bg-[#0a140a] border border-slate-800 p-8 shadow-2xl relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                                    <span className="material-symbols-outlined text-[48px]">warning</span>
                                </div>
                                <h3 className="text-2xl font-black text-white italic mb-2 tracking-tight">DADOS NÃO SALVOS</h3>
                                <p className="text-sm text-slate-400 font-medium px-4 mb-8">Deseja gravar as alterações feitas ou descartar?</p>

                                <div className="flex flex-col w-full gap-3">
                                    <button
                                        onClick={handleSaveAndSwitch}
                                        className="w-full rounded-2xl bg-amber-500 py-4 text-xs font-black uppercase tracking-[0.2em] text-black hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
                                    >
                                        Salvar e Continuar
                                    </button>
                                    <button
                                        onClick={handleDiscardChanges}
                                        className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 py-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-red-500/10 hover:border-red-500/40 transition-all"
                                    >
                                        Descartar Alterações
                                    </button>
                                    <button
                                        onClick={() => setShowUnsavedModal(null)}
                                        className="mt-2 text-[11px] font-black text-slate-600 uppercase tracking-widest"
                                    >
                                        Voltar ao editor
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* DELETE MODAL */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md rounded-3xl bg-[#0a140a] border border-red-500/40 p-8 shadow-2xl relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                    <span className="material-symbols-outlined text-[48px]">warning</span>
                                </div>
                                <h3 className="text-2xl font-black text-white italic mb-2 tracking-tight">EXCLUIR MEDICAMENTO?</h3>
                                <p className="text-sm text-white font-bold mb-2">Medicamento: <span className="text-[#39ff14]">{draft.name}</span></p>
                                <p className="text-sm text-slate-400 font-medium px-4 mb-8">
                                    Possui {draft.presentations.length} apresentações. Esta ação não pode ser desfeita.
                                </p>

                                <div className="flex flex-col w-full gap-3">
                                    <button
                                        onClick={executeDelete}
                                        disabled={isSaving}
                                        className="w-full rounded-2xl bg-red-600 py-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:opacity-40 disabled:pointer-events-none transition-all"
                                    >
                                        {isSaving ? 'Excluindo...' : 'Sim, Excluir Permanentemente'}
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        disabled={isSaving}
                                        className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 py-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
