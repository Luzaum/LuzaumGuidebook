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
    RxvModalShell,
} from '../../src/components/receituario/RxvComponents'
import { TutorLookup } from './components/TutorLookup'
import { PatientLookup } from './components/PatientLookup'
import { AddMedicationModal2 } from './components/AddMedicationModal2'
import { AddCompoundedMedicationModal } from './components/AddCompoundedMedicationModal'
import { RxPrintView } from './RxPrintView'
import { buildPrescriptionStateFromNovaReceita2, buildPrintDocsFromNovaReceita2 } from './novaReceita2Adapter'
import { BUILTIN_TEMPLATES, DEFAULT_NOVA_RECEITA_TEMPLATE_ID } from './builtinTemplates'
import { savePrescription, getPrescriptionById } from '../../src/lib/prescriptionsRecords'
import { loadRxDb, findProfileSettings, createPrescriberProfileFromSettings, type PrescriberProfile as StoredPrescriberProfile } from './rxDb'
import { loadRxDraftById } from './rxStorage'
import type { RxTemplateStyle } from './rxDb'
import { calculateMedicationQuantity } from './rxRenderer'
import {
    buildCompoundedCardSubtitle,
    buildCompoundedInstruction,
    buildCompoundedPharmacyInstruction,
    buildCompoundedRegimenSummary,
    getCompoundedActiveIngredients,
    getCompoundedAllowedRouteValues,
    getCompoundedCalculationSummary,
    getCompoundedCalculationWarnings,
    getCompoundedDurationSummary,
    getCompoundedFinalizationIssues,
    getCompoundedFrequencySummary,
    getCompoundedInternalNote,
} from './compoundedUi'
import { getClinicalFormulaMetadata, getDosageFamilyLabel, getFormulaTypeLabel, getUniversalFormulaType } from './compoundedClinicalText'
import {
    searchMedications,
    getMedicationPresentations,
    type MedicationSearchResult as CatalogMedicationSearchResult,
    type MedicationPresentationRecord,
} from '../../src/lib/clinicRecords'
import { buildPresentationConcentrationText } from '../../src/lib/medicationCatalog'
import type {
    CompoundedMedicationIngredientRecord,
    CompoundedMedicationRegimenRecord,
} from '../../src/lib/compoundedRecords'

// ==================== DRAFT LOCAL (D) ====================
// Chave: rx_draft_v2:<clinicId> — localStorage, por dispositivo

function getDraftKey(clinicId: string | null): string | null {
    if (!clinicId) return null
    return `rx_draft_v2:${clinicId}`
}

function getSelectedPrescriberProfileKey(clinicId: string | null): string | null {
    if (!clinicId) return null
    return `rxv:nova-receita-2:selected-prescriber-profile:${clinicId}`
}

function loadSelectedPrescriberProfileId(key: string): string | null {
    try {
        const raw = localStorage.getItem(key)
        const value = String(raw || '').trim()
        return value || null
    } catch {
        return null
    }
}

function saveSelectedPrescriberProfileId(key: string, profileId: string): void {
    try {
        localStorage.setItem(key, profileId)
    } catch (error) {
        if (import.meta.env.DEV) console.warn('[NovaReceita2] Failed to persist selected prescriber profile', error)
    }
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
    examJustification: string
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

export interface CompoundedIngredientSnapshot extends Pick<
    CompoundedMedicationIngredientRecord,
    'id' | 'ingredient_name' | 'ingredient_role' | 'quantity_value' | 'quantity_unit' | 'concentration_value' | 'concentration_unit' | 'per_value' | 'per_unit' | 'free_text' | 'is_controlled_ingredient' | 'notes'
> {}

export interface CompoundedRegimenSnapshot extends Pick<
    CompoundedMedicationRegimenRecord,
    'id' | 'regimen_name' | 'indication' | 'dosing_mode' | 'species' | 'route' | 'dose_min' | 'dose_max' | 'dose_unit' | 'per_weight_unit' | 'fixed_administration_value' | 'fixed_administration_unit' | 'concentration_value' | 'concentration_unit' | 'concentration_per_value' | 'concentration_per_unit' | 'frequency_value_min' | 'frequency_value_max' | 'frequency_unit' | 'frequency_label' | 'duration_mode' | 'duration_value' | 'duration_unit' | 'inherit_default_start' | 'notes' | 'allow_edit' | 'default_prepared_quantity_text' | 'default_administration_sig'
> {
    calculation_mode?: 'fixed_per_animal' | 'weight_based'
    applied_dose_text?: string
    applied_quantity_text?: string
    metadata?: Record<string, unknown> | null
}

export interface CompoundedMedicationSnapshot {
    medication_id?: string
    medication_name: string
    description?: string
    pharmaceutical_form: string
    default_route?: string
    is_controlled: boolean
    control_type?: string
    quantity_text?: string
    qsp_text?: string
    flavor?: string
    vehicle?: string
    excipient?: string
    notes?: string
    manipulation_instructions?: string
    ingredients: CompoundedIngredientSnapshot[]
    metadata?: Record<string, unknown> | null
}

export interface PrescriptionItemBase {
    id: string
    kind: 'standard' | 'compounded'
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
    frequencyMode?: 'times_per_day' | 'interval_hours'
    timesPerDay?: number
    intervalHours?: number
    route?: string
    duration?: string
    start_date?: string
    startDate?: string
    startHour?: string
    inheritStartFromPrescription?: boolean
    durationMode?: 'fixed_days' | 'until_recheck' | 'continuous_use' | 'until_finished' | 'continuous_until_recheck'
    durationValue?: number
    durationUnit?: string
    instructions?: string
    cautions?: string[]
    cautionsText?: string

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
    manualQuantity?: string
}

export interface StandardPrescriptionItem extends PrescriptionItemBase {
    kind: 'standard'
}

export interface CompoundedPrescriptionItem extends PrescriptionItemBase {
    kind: 'compounded'
    compounded_medication_id?: string
    compounded_regimen_id?: string
    compounded_snapshot: CompoundedMedicationSnapshot
    compounded_regimen_snapshot?: CompoundedRegimenSnapshot | null
    compounded_pharmacy_guidance?: string
    compounded_internal_note?: string
}

export type PrescriptionItem = StandardPrescriptionItem | CompoundedPrescriptionItem

function loadAvailablePrescriberProfiles(): StoredPrescriberProfile[] {
    const db = loadRxDb()
    if (Array.isArray(db.prescriberProfiles) && db.prescriberProfiles.length > 0) {
        return db.prescriberProfiles
    }
    return [createPrescriberProfileFromSettings(db.profile, 'Perfil padrão', 'default')]
}

function mapStoredPrescriberProfile(profileId: string, profile: {
    fullName?: string
    crmv?: string
    clinicPhone?: string
    clinicAddress?: string
    signatureDataUrl?: string
}): PrescriberProfile {
    return {
        id: profileId || 'default',
        name: profile.fullName || '',
        crmv: profile.crmv || '',
        phone: profile.clinicPhone || '',
        address: profile.clinicAddress || '',
        signatureDataUrl: profile.signatureDataUrl || '',
    }
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

const TIMES_PER_DAY_INTERVALS: Record<string, string> = {
    '1': '24',
    '2': '12',
    '3': '8',
    '4': '6',
    '6': '4',
    '8': '3',
    '12': '2',
    '24': '1',
}

const QUICK_FREQUENCY_OPTIONS = [
    { value: '1', label: '1x ao dia (a cada 24 horas)' },
    { value: '2', label: '2x ao dia (a cada 12 horas)' },
    { value: '3', label: '3x ao dia (a cada 8 horas)' },
    { value: '4', label: '4x ao dia (a cada 6 horas)' },
    { value: '6', label: '6x ao dia (a cada 4 horas)' },
    { value: '8', label: '8x ao dia (a cada 3 horas)' },
    { value: '12', label: '12x ao dia (a cada 2 horas)' },
    { value: '24', label: '24x ao dia (a cada 1 hora)' },
]

const ITEM_FREQUENCY_OPTIONS = [{ value: '', label: 'Selecionar frequência' }, ...QUICK_FREQUENCY_OPTIONS]

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
const QUICK_SPECIES_OPTIONS = [
    { value: 'cão', label: 'Cão' },
    { value: 'gato', label: 'Gato' },
]
const DURATION_MODE_OPTIONS = [
    { value: 'fixed_days', label: 'Duração fechada' },
    { value: 'continuous_until_recheck', label: 'Uso contínuo até reavaliação' },
    { value: 'until_recheck', label: 'Até reavaliação clínica' },
    { value: 'continuous_use', label: 'Uso contínuo' },
    { value: 'until_finished', label: 'Até terminar o medicamento' },
]
const DURATION_UNIT_OPTIONS = [
    { value: 'dias', label: 'dias' },
    { value: 'semanas', label: 'semanas' },
    { value: 'meses', label: 'meses' },
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

function parseTimesPerDayValue(raw?: string | number | null): string {
    const value = String(raw ?? '').trim().toLowerCase()
    if (!value) return ''

    const supportedValues = new Set(Object.keys(TIMES_PER_DAY_INTERVALS))
    if (supportedValues.has(value)) return value

    const timesMatch = value.match(/(\d+)\s*x\s*ao\s*dia|(\d+)\s*vez(?:es)?\s*(?:ao|por)\s*dia/)
    if (timesMatch) {
        const direct = timesMatch[1] || timesMatch[2] || ''
        return supportedValues.has(direct) ? direct : ''
    }

    const hoursMatch = value.match(/a cada\s*(\d+(?:[.,]\d+)?)\s*h/)
    if (hoursMatch) {
        const hours = Number(hoursMatch[1].replace(',', '.'))
        if (!hours || hours <= 0) return ''
        const times = 24 / hours
        if (!Number.isFinite(times) || Math.round(times) !== times) return ''
        const normalized = String(times)
        return supportedValues.has(normalized) ? normalized : ''
    }

    if (value.includes('uma vez') || value.includes('sid') || value.includes('q24')) return '1'
    if (value.includes('bid') || value.includes('q12')) return '2'
    if (value.includes('tid') || value.includes('q8')) return '3'
    if (value.includes('qid') || value.includes('q6')) return '4'

    return ''
}

function formatFrequencyValue(timesPerDay?: string | number | null): string {
    const normalized = parseTimesPerDayValue(timesPerDay)
    return normalized ? `${normalized}x ao dia` : ''
}

function parseIntervalHoursValue(raw?: string | number | null): number | undefined {
    if (raw == null || raw === '') return undefined
    const numeric = Number(String(raw).replace(',', '.'))
    return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined
}

function formatIntervalHoursValue(hours?: string | number | null): string {
    const parsed = parseIntervalHoursValue(hours)
    return parsed ? `a cada ${parsed} horas` : ''
}

function parseDurationValueAndUnit(raw?: string | null): { value?: number; unit?: string } {
    const value = String(raw || '').trim().toLowerCase()
    if (!value) return {}
    const match = value.match(/(\d+(?:[.,]\d+)?)\s*(dia|dias|semana|semanas|mes|meses)/)
    if (!match) return {}
    const amount = Number(match[1].replace(',', '.'))
    if (!Number.isFinite(amount) || amount <= 0) return {}
    const unitToken = match[2]
    const unit =
        unitToken.startsWith('semana') ? 'semanas'
            : unitToken.startsWith('mes') ? 'meses'
                : 'dias'
    return { value: amount, unit }
}

function formatStructuredDuration(value?: number, unit = 'dias'): string {
    if (!value || value <= 0) return ''
    return `${String(value).replace('.', ',')} ${unit}`.trim()
}

function normalizeCautionsText(rawText?: string | null, fallback?: string[] | null): string[] {
    const source = typeof rawText === 'string' ? rawText : Array.isArray(fallback) ? fallback.join('\n') : ''
    return source
        .split(/\r?\n/)
        .map((line) => line.replace(/\r/g, ''))
        .filter((line) => line.trim().length > 0)
}

function normalizePrescriptionItem(item: PrescriptionItem, defaultStartDate: string, defaultStartHour: string): PrescriptionItem {
    const parsedStart = parseLegacyStart(item.start_date)
    const startDate = item.startDate ?? parsedStart.startDate
    const startHour = item.startHour ?? parsedStart.startHour

    let durationMode = item.durationMode
    if (!durationMode) {
        const normalized = String(item.duration || '').trim().toLowerCase()
        if (normalized.includes('uso continuo') && normalized.includes('reavali')) durationMode = 'continuous_until_recheck'
        else if (normalized.includes('uso continuo')) durationMode = 'continuous_use'
        else if (normalized.includes('ate terminar') || normalized.includes('até terminar')) durationMode = 'until_finished'
        else if (normalized.includes('reavali')) durationMode = 'until_recheck'
        else durationMode = 'fixed_days'
    }

    const parsedIntervalHours = item.frequencyMode === 'interval_hours'
        ? parseIntervalHoursValue(item.intervalHours ?? item.frequency)
        : parseIntervalHoursValue(item.intervalHours)
    const normalizedTimesPerDay = item.frequencyMode === 'times_per_day'
        ? parseTimesPerDayValue(item.timesPerDay ?? item.frequency)
        : parseTimesPerDayValue(item.timesPerDay)
    const durationParts = item.durationValue && item.durationUnit
        ? { value: item.durationValue, unit: item.durationUnit }
        : parseDurationValueAndUnit(item.duration)
    const cautionsText = typeof item.cautionsText === 'string' && item.cautionsText.trim().length > 0
        ? item.cautionsText
        : item.kind === 'compounded' && item.compounded_regimen_snapshot?.default_administration_sig
            ? item.compounded_regimen_snapshot.default_administration_sig
        : Array.isArray(item.cautions)
            ? item.cautions.join('\n')
            : ''

    return {
        ...item,
        kind: item.kind === 'compounded' ? 'compounded' : 'standard',
        inheritStartFromPrescription: item.inheritStartFromPrescription ?? true,
        startDate,
        startHour,
        start_date: buildLegacyStartDate(startDate, startHour) || item.start_date,
        durationMode,
        frequencyMode: parsedIntervalHours ? 'interval_hours' : normalizedTimesPerDay ? 'times_per_day' : item.frequencyMode,
        timesPerDay: normalizedTimesPerDay ? Number(normalizedTimesPerDay) : item.timesPerDay,
        intervalHours: parsedIntervalHours ?? item.intervalHours,
        frequency: parsedIntervalHours
            ? formatIntervalHoursValue(parsedIntervalHours)
            : normalizedTimesPerDay
                ? formatFrequencyValue(normalizedTimesPerDay)
                : (item.frequency || ''),
        durationValue: durationParts.value ?? item.durationValue,
        durationUnit: durationParts.unit ?? item.durationUnit ?? 'dias',
        duration: durationMode === 'fixed_days'
            ? formatStructuredDuration(durationParts.value ?? item.durationValue, durationParts.unit ?? item.durationUnit ?? 'dias') || item.duration || ''
            : item.duration || '',
        cautionsText,
        cautions: normalizeCautionsText(cautionsText, item.cautions),
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
        examJustification: String(raw?.examJustification || ''),
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
    if (item.durationMode === 'continuous_until_recheck') return 'Uso contínuo até reavaliação clínica'
    if (item.durationMode === 'until_recheck') return 'Até reavaliação clínica'
    if (item.durationMode === 'continuous_use') return 'Uso contínuo'
    if (item.durationMode === 'until_finished') return 'Até terminar o medicamento'
    if (item.durationValue) return formatStructuredDuration(item.durationValue, item.durationUnit || 'dias')
    return item.duration || 'Sem duração definida'
}

function getDefaultNovaReceitaTemplateId(): string {
    return BUILTIN_TEMPLATES.find((template) => template.id === DEFAULT_NOVA_RECEITA_TEMPLATE_ID)?.id || BUILTIN_TEMPLATES[0].id
}

// ==================== DEFAULT STATE ====================

function createDefaultState(): NovaReceita2State {
    const defaultTemplateId = getDefaultNovaReceitaTemplateId()
    return {
        prescriber: null,
        tutor: null,
        patient: null,
        quickMode: false,
        templateId: defaultTemplateId,
        printTemplateId: defaultTemplateId,
        defaultStartDate: '',
        defaultStartHour: '',
        recommendations: '',
        examJustification: '',
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
    const availablePrescriberProfiles = useMemo(() => loadAvailablePrescriberProfiles(), [])
    const selectedPrescriberProfileKey = useMemo(
        () => getSelectedPrescriberProfileKey(clinicId),
        [clinicId]
    )
    const preferredPrescriberProfileId = useMemo(
        () => (selectedPrescriberProfileKey ? loadSelectedPrescriberProfileId(selectedPrescriberProfileKey) : null),
        [selectedPrescriberProfileKey]
    )

    const [state, setState] = useState<NovaReceita2State>(createDefaultState)
    const [autosave, setAutosave] = useState(true)
    const [medicationModalOpen, setMedicationModalOpen] = useState(false)
    const [manualModalOpen, setManualModalOpen] = useState(false)
    const [compoundedModalOpen, setCompoundedModalOpen] = useState(false)
    const [compoundedModalSession, setCompoundedModalSession] = useState(0)
    const [presentationPickerOpen, setPresentationPickerOpen] = useState(false)
    const [presentationPickerItemId, setPresentationPickerItemId] = useState<string | null>(null)
    const [presentationPickerItemName, setPresentationPickerItemName] = useState('')
    const [presentationPickerOptions, setPresentationPickerOptions] = useState<MedicationPresentationRecord[]>([])
    const [isLoadingPresentationPicker, setIsLoadingPresentationPicker] = useState(false)
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
    const modalStateStorageKey = useMemo(
        () => (clinicId ? `rxv:nova-receita-2:modal-state:${clinicId}` : null),
        [clinicId]
    )
    const selectedPrescriberOptionValue = useMemo(() => {
        if (state.prescriber?.id) {
            return state.prescriber.id
        }
        if (preferredPrescriberProfileId && availablePrescriberProfiles.some((entry) => entry.id === preferredPrescriberProfileId)) {
            return preferredPrescriberProfileId
        }
        return availablePrescriberProfiles[0]?.id || 'default'
    }, [availablePrescriberProfiles, preferredPrescriberProfileId, state.prescriber])
    const prescriberProfileOptions = useMemo(() => {
        const baseOptions = availablePrescriberProfiles.map((entry) => ({
            value: entry.id,
            label: `${entry.profileName} - ${entry.fullName || 'Sem nome'}`,
        }))

        if (state.prescriber?.id && !baseOptions.some((entry) => entry.value === state.prescriber?.id)) {
            return [
                {
                    value: state.prescriber.id,
                    label: `${state.prescriber.name || 'Perfil da receita'} - ${state.prescriber.crmv || 'Sem CRMV'}`,
                },
                ...baseOptions,
            ]
        }

        return baseOptions
    }, [availablePrescriberProfiles, state.prescriber])

    // D: Controle de inicialização do draft (só carrega uma vez por clinicId)
    const draftInitRef = useRef(false)
    const draftKey = getDraftKey(clinicId)

    useEffect(() => {
        if (!modalStateStorageKey) return
        try {
            const raw = sessionStorage.getItem(modalStateStorageKey)
            if (!raw) return
            const parsed = JSON.parse(raw) as { medicationModalOpen?: boolean; manualModalOpen?: boolean }
            setMedicationModalOpen(!!parsed.medicationModalOpen)
            setManualModalOpen(!!parsed.manualModalOpen)
        } catch (error) {
            console.warn('[NovaReceita2] Failed to restore modal state', error)
        }
    }, [modalStateStorageKey])

    useEffect(() => {
        if (!modalStateStorageKey) return
        try {
            if (!medicationModalOpen && !manualModalOpen) {
                sessionStorage.removeItem(modalStateStorageKey)
                return
            }
            sessionStorage.setItem(
                modalStateStorageKey,
                JSON.stringify({ medicationModalOpen, manualModalOpen })
            )
        } catch (error) {
            console.warn('[NovaReceita2] Failed to persist modal state', error)
        }
    }, [modalStateStorageKey, medicationModalOpen, manualModalOpen])

    // ==================== HELPERS ====================

    const updateState = useCallback((updater: (prev: NovaReceita2State) => NovaReceita2State) => {
        setState((prev) => ({
            ...updater(prev),
            updatedAt: new Date().toISOString(),
        }))
    }, [])

    const applyPrescriberProfile = useCallback((requestedProfileId: string) => {
        try {
            const db = loadRxDb()
            const { profile, id } = findProfileSettings(db, requestedProfileId || undefined)
            const nextPrescriber = mapStoredPrescriberProfile(id || requestedProfileId || 'default', profile)

            updateState((prev) => ({
                ...prev,
                prescriber: nextPrescriber,
            }))

            if (selectedPrescriberProfileKey) {
                saveSelectedPrescriberProfileId(selectedPrescriberProfileKey, nextPrescriber.id)
            }
        } catch (error) {
            console.warn('[NovaReceita2] Failed to apply prescriber profile', error)
        }
    }, [selectedPrescriberProfileKey, updateState])

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

    const closePresentationPicker = useCallback(() => {
        setPresentationPickerOpen(false)
        setPresentationPickerItemId(null)
        setPresentationPickerItemName('')
        setPresentationPickerOptions([])
    }, [])

    const openPresentationPicker = useCallback(async (item: PrescriptionItem) => {
        if (!clinicId || !item.medication_id) {
            alert('Este item não possui vínculo com um medicamento do catálogo.')
            return
        }

        try {
            setIsLoadingPresentationPicker(true)
            setPresentationPickerItemId(item.id)
            setPresentationPickerItemName(item.name || 'Medicamento')
            setPresentationPickerOpen(true)
            const rows = await getMedicationPresentations(clinicId, item.medication_id)
            setPresentationPickerOptions(rows)
        } catch (error) {
            console.error('[NovaReceita2] Failed to load presentation options', error)
            alert(`Não foi possível carregar as apresentações do catálogo.\n\n${error instanceof Error ? error.message : String(error)}`)
            closePresentationPicker()
        } finally {
            setIsLoadingPresentationPicker(false)
        }
    }, [clinicId, closePresentationPicker])

    const applyPresentationToItem = useCallback((presentation: MedicationPresentationRecord) => {
        if (!presentationPickerItemId) return

        updateItem(presentationPickerItemId, (current) => ({
            ...current,
            presentation_id: presentation.id,
            presentation_label: [presentation.pharmaceutical_form, presentation.commercial_name].filter(Boolean).join(' • ') || current.presentation_label,
            pharmaceutical_form: presentation.pharmaceutical_form || undefined,
            concentration_text: buildPresentationConcentrationText(presentation) || presentation.concentration_text || undefined,
            commercial_name: presentation.commercial_name || undefined,
            additional_component: presentation.additional_component || undefined,
            value: presentation.value ?? undefined,
            value_unit: presentation.value_unit || undefined,
            per_value: presentation.per_value ?? undefined,
            per_unit: presentation.per_unit || undefined,
            package_quantity: presentation.package_quantity != null ? String(presentation.package_quantity) : undefined,
            package_unit: presentation.package_unit || undefined,
            presentation_metadata: presentation.metadata || null,
        }))

        closePresentationPicker()
    }, [closePresentationPicker, presentationPickerItemId, updateItem])

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
                ? { id: `quick-patient-${prev.id}`, name: 'Paciente sem identificacao', species: 'cão', weight_kg: '' }
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
                : { id: `quick-patient-${prev.id}`, name: 'Paciente sem identificacao', species: 'cão', weight_kg: weight },
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
            kind: 'standard',
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
            frequency: formatFrequencyValue(quickFrequencyPerDay),
            frequencyMode: 'times_per_day',
            timesPerDay: Number(quickFrequencyPerDay),
            intervalHours: undefined,
            route: quickRoute || 'VO',
            duration,
            durationMode,
            durationValue: quickContinuousUse ? undefined : Number(quickDurationDays),
            durationUnit: 'dias',
            inheritStartFromPrescription: true,
            startDate: state.defaultStartDate,
            startHour: state.defaultStartHour,
            start_date: buildLegacyStartDate(state.defaultStartDate, state.defaultStartHour),
            instructions: '',
            cautions: [],
            cautionsText: '',
        }
        handleAddItem(newItem)
        resetQuickComposer()
    }, [canAddQuickMedication, quickContinuousUse, quickDurationDays, quickConcentrationValue, quickConcentrationUnit, quickEntryMode, quickSelectedMedication, quickManualControlled, quickPresentationId, quickMedicationName, quickPharmaceuticalForm, selectedQuickPresentation, quickDoseValue, quickDoseUnit, quickFrequencyPerDay, quickRoute, handleAddItem, resetQuickComposer, state.defaultStartDate, state.defaultStartHour])

    // ==================== EFFECTS ====================

    // Carregar payload de protocolo vindos via navigate state
    useEffect(() => {
        const payload = location.state as
            | {
                items?: PrescriptionItem[]
                recommendations?: string
                exams?: string[]
                examJustification?: string
                sourceProtocol?: { id: string; name: string }
            }
            | null

        console.log('[NovaReceita2] location.state recebido', payload)

        if (!payload) return

        updateState((prev) => {
            const freshState = createDefaultState()

            const baseState: NovaReceita2State = {
                ...freshState,
                prescriber: prev.prescriber,
                printTemplateId: prev.printTemplateId || freshState.printTemplateId,
                templateId: prev.templateId || freshState.templateId,
            }

            const normalizedItems = (payload.items || []).map((item, index) => {
                const normalized = normalizePrescriptionItem(
                    item,
                    baseState.defaultStartDate,
                    baseState.defaultStartHour
                )

                console.log('[NovaReceita2] item bruto', index, item)
                console.log('[NovaReceita2] item normalizado', index, normalized)

                return normalized
            })

            const nextState = {
                ...baseState,
                items: normalizedItems,
                recommendations: payload.recommendations?.trim() || '',
                examJustification: payload.examJustification || '',
                exams: (payload.exams || []).filter(Boolean),
            }

            console.log('[NovaReceita2] estado final aplicado', nextState)
            return nextState
        })

        // Limpar o state da history de forma segura para evitar re-hidratação acidental no F5
        navigate(location.pathname, { replace: true, state: null })
    }, [location.state, location.pathname, navigate, updateState])

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
                const { profile, id } = findProfileSettings(db, preferredPrescriberProfileId || undefined)
                if (profile) {
                    updateState(prev => ({
                        ...prev,
                        prescriber: mapStoredPrescriberProfile(id || preferredPrescriberProfileId || 'default', profile)
                    }))
                }
            } catch (err) {
                console.warn('[Prescriptions] Could not load profile defaults', err)
            }
        }
    }, [preferredPrescriberProfileId, state.prescriber, updateState])

    // D1: Carregar rascunho local quando clinicId ficar disponível
    // Só carrega se não vier prescriptionId na URL e não vier items de protocolo (location.state)
    useEffect(() => {
        if (!draftKey || draftInitRef.current) return
        draftInitRef.current = true

        const params = new URLSearchParams(location.search)
        if (params.get('prescriptionId') || location.state) return // Não sobrepor se está editando ou importando
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
                    printTemplateId: legacyDraft.recommendations.standardTemplateId || getDefaultNovaReceitaTemplateId(),
                    templateId: legacyDraft.recommendations.standardTemplateId || getDefaultNovaReceitaTemplateId(),
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
                        frequencyMode: item.timesPerDay ? 'times_per_day' : undefined,
                        timesPerDay: item.timesPerDay ? Number(item.timesPerDay) : undefined,
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
                        cautionsText: Array.isArray(item.cautions) ? item.cautions.join('\n') : '',
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
    const compoundedFinalizationIssues = useMemo(() => {
        return state.items
            .filter((item): item is CompoundedPrescriptionItem => item.kind === 'compounded')
            .flatMap((item) => getCompoundedFinalizationIssues(item, state.patient))
    }, [state.items, state.patient])
    const canFinalizeCompoundedDocs = compoundedFinalizationIssues.length === 0

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
        const fallbackTemplateId = getDefaultNovaReceitaTemplateId()
        const id = state.printTemplateId || state.templateId || fallbackTemplateId
        return allTemplates.find((t) => t.id === id) || allTemplates.find((t) => t.id === fallbackTemplateId) || allTemplates[0]
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
        if (!canFinalizeCompoundedDocs) {
            alert(`Rascunho incompleto — faltam parâmetros farmacotécnicos para emissão da receita final.\n\n${compoundedFinalizationIssues[0]}`)
            return
        }
        saveReviewSession(state)
        navigate('/receituario-vet/nova-receita-2-print?mode=review')
    }, [canFinalizeCompoundedDocs, compoundedFinalizationIssues, state, navigate])

    const handlePrint = useCallback(() => {
        if (!canFinalizeCompoundedDocs) {
            alert(`Rascunho incompleto — faltam parâmetros farmacotécnicos para emissão da receita final.\n\n${compoundedFinalizationIssues[0]}`)
            return
        }
        saveReviewSession(state)
        navigate('/receituario-vet/nova-receita-2-print?mode=print')
    }, [canFinalizeCompoundedDocs, compoundedFinalizationIssues, state, navigate])

    const handleExportPdf = useCallback(() => {
        if (!canFinalizeCompoundedDocs) {
            alert(`Rascunho incompleto — faltam parâmetros farmacotécnicos para emissão da receita final.\n\n${compoundedFinalizationIssues[0]}`)
            return
        }
        saveReviewSession(state)
        navigate('/receituario-vet/nova-receita-2-print?mode=pdf')
    }, [canFinalizeCompoundedDocs, compoundedFinalizationIssues, state, navigate])

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

    const openCompoundedModal = useCallback(() => {
        setCompoundedModalSession((prev) => prev + 1)
        setCompoundedModalOpen(true)
    }, [])

    const closeCompoundedModal = useCallback(() => {
        setCompoundedModalOpen(false)
        setCompoundedModalSession((prev) => prev + 1)
    }, [])

    // ==================== RENDER ====================

    return (
        <ReceituarioChrome section="nova" title="Nova Receita 2.0">
            <div className="min-h-screen bg-[color:var(--rxv-bg)] pb-16">

                {/* ==================== TOPBAR ==================== */}
                <div className="sticky top-0 z-50 border-b border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)]/90 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-xl font-black text-[color:var(--rxv-text)] uppercase italic tracking-tight sm:text-2xl">
                                Nova Receita 2.0
                            </h1>
                            <p className="text-[10px] font-bold text-[color:var(--rxv-muted)] uppercase tracking-widest">
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
                                className="lg:hidden rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/70 px-3 py-2 text-xs font-bold text-[color:var(--rxv-text)] hover:bg-[color:var(--rxv-surface-2)]"
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
                            <RxvButton variant="secondary" onClick={handleReview} disabled={!canFinalizeCompoundedDocs}>
                                Revisar
                            </RxvButton>
                            <RxvButton variant="secondary" onClick={handlePrint} disabled={!canFinalizeCompoundedDocs}>
                                Imprimir
                            </RxvButton>
                            <RxvButton variant="primary" onClick={handleExportPdf} disabled={!canFinalizeCompoundedDocs}>
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
                                            : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/80 text-[color:var(--rxv-text)] hover:border-[#39ff14]/40 hover:text-[#2fb011]'
                                            }`}
                                    >
                                        {quickMode ? 'Modo rápido ativo' : 'Ativar modo rápido'}
                                    </button>
                                </RxvSectionHeader>

                                <div className="space-y-5">
                                    {quickMode ? (
                                        <div className="rounded-2xl border border-[#39ff14]/30 bg-[color:var(--rxv-primary)]/10 px-4 py-3 text-sm text-[color:var(--rxv-text)]">
                                            No modo rápido, este bloco concentra o mínimo obrigatório para manter a prescrição consistente.
                                        </div>
                                    ) : null}

                                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                                        <RxvField label="Perfil do médico-veterinário">
                                            <RxvSelect
                                                value={selectedPrescriberOptionValue}
                                                onChange={(e) => applyPrescriberProfile(e.target.value)}
                                                options={prescriberProfileOptions}
                                            />
                                        </RxvField>
                                        <div className="rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/75 px-4 py-3">
                                            <p className="text-[11px] font-black uppercase tracking-widest text-[color:var(--rxv-muted)]">
                                                Perfil aplicado nesta receita
                                            </p>
                                            <p className="mt-2 text-sm font-semibold text-[color:var(--rxv-text)]">
                                                {state.prescriber?.name || 'Sem perfil selecionado'}
                                            </p>
                                            <p className="mt-1 text-xs text-[color:var(--rxv-muted)]">
                                                {state.prescriber?.crmv ? `CRMV: ${state.prescriber.crmv}` : 'CRMV não informado'}
                                            </p>
                                        </div>
                                    </div>

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
                                            <RxvSelect
                                                value={state.patient?.species || ''}
                                                onChange={(e) => updateState((prev) => ({
                                                    ...prev,
                                                    patient: prev.patient ? { ...prev.patient, species: e.target.value } : {
                                                        id: `quick-patient-${prev.id}`,
                                                        name: '',
                                                        species: e.target.value,
                                                    },
                                                }))}
                                                options={QUICK_SPECIES_OPTIONS}
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
                                        <div className="flex items-center justify-between rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/75 px-4 py-3">
                                            <div className="text-xs text-[color:var(--rxv-muted)]">
                                                {state.patient.name ? <p>Paciente atual: <span className="font-semibold text-[color:var(--rxv-text)]">{state.patient.name}</span></p> : null}
                                                {state.patient.weight_kg ? <p>Peso informado: <span className="font-semibold text-[color:var(--rxv-text)]">{state.patient.weight_kg} kg</span></p> : null}
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

                            <RxvCard>
                                <RxvSectionHeader
                                    icon="playlist_add_check"
                                    title="B. Protocolos"
                                    subtitle="Importe protocolos prontos antes de definir os itens da prescrição"
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_280px]">
                                    <div className="rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/75 px-4 py-4 text-sm text-[color:var(--rxv-text)]">
                                        <p className="font-semibold text-[color:var(--rxv-text)]">Fluxo recomendado</p>
                                        <p className="mt-2">
                                            Abra Protocolos 3.0, escolha um protocolo da clinica ou global e use a acao
                                            para enviar itens, recomendacoes, justificativa de exames e exames para esta receita.
                                        </p>
                                        {location.state && (location.state as any)?.sourceProtocol?.name ? (
                                            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#39ff14]">
                                                Protocolo atual: {(location.state as any).sourceProtocol.name}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <RxvButton
                                            variant="secondary"
                                            onClick={() => navigate('/receituario-vet/protocolos-3')}
                                            className="justify-center"
                                        >
                                            Abrir Protocolos 3.0
                                        </RxvButton>
                                        <div className="rounded-2xl border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/65 px-4 py-4 text-sm text-[color:var(--rxv-muted)]">
                                            A importacao reinicia a receita atual e aplica o protocolo por cima de um estado limpo.
                                        </div>
                                    </div>
                                </div>
                            </RxvCard>

                            {/* Itens da Receita */}
                            <RxvCard>
                                <RxvSectionHeader
                                    icon="medication"
                                    title="C. Itens da Prescrição"
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
                                                variant="secondary"
                                                onClick={openCompoundedModal}
                                                data-testid="nova-receita-add-compounded"
                                            >
                                                + Manipulado
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
                                                    : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/75 text-[color:var(--rxv-muted)] hover:text-[color:var(--rxv-text)]'
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
                                                    : 'border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/75 text-[color:var(--rxv-muted)] hover:text-[color:var(--rxv-text)]'
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
                                                                <p className="text-xs text-[color:var(--rxv-muted)]">Buscando no catalogo...</p>
                                                            ) : quickCatalogResults.length ? (
                                                                quickCatalogResults.map((med) => (
                                                                    <button
                                                                        key={med.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setQuickSelectedMedication(med)
                                                                            setQuickMedicationName(med.name)
                                                                            setQuickRoute(med.metadata?.default_route || 'VO')
                                                                        }}
                                                                        className="w-full rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/75 px-3 py-2 text-left hover:border-[#39ff14]/50"
                                                                    >
                                                                        <p className="text-sm font-semibold text-[color:var(--rxv-text)]">{med.name}</p>
                                                                    </button>
                                                                ))
                                                            ) : (
                                                                <p className="text-xs text-[color:var(--rxv-muted)]">Sem resultados.</p>
                                                            )}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between rounded-lg border border-[#39ff14]/40 bg-[#39ff14]/10 px-3 py-2">
                                                            <p className="text-sm font-semibold text-[#bfffaf]">{quickSelectedMedication.name}</p>
                                                            <button type="button" className="text-xs text-[color:var(--rxv-muted)] hover:text-[color:var(--rxv-text)]" onClick={() => setQuickSelectedMedication(null)}>Trocar</button>
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
                                    <div className="rounded-xl border-2 border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/65 px-6 py-10 text-center">
                                        <span className="material-symbols-outlined text-[color:var(--rxv-muted)] text-[40px]">
                                            inventory_2
                                        </span>
                                        <p className="mt-3 text-sm font-bold text-[color:var(--rxv-muted)]">
                                            Nenhum item adicionado
                                        </p>
                                        <p className="mt-1 text-xs text-[color:var(--rxv-muted)]">
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
                                            const compoundedCalculation = item.kind === 'compounded'
                                                ? getCompoundedCalculationSummary(item, state.patient)
                                                : null
                                            const compoundedFormula = item.kind === 'compounded'
                                                ? getClinicalFormulaMetadata(item.compounded_snapshot?.metadata || null)
                                                : null
                                            const isClinicalDoseOriented = item.kind === 'compounded'
                                                ? compoundedFormula?.formula_model === 'clinical_dose_oriented'
                                                : false
                                            const compoundedWarnings = item.kind === 'compounded'
                                                ? getCompoundedCalculationWarnings(item, state.patient)
                                                : []
                                            const compoundedRouteValues = item.kind === 'compounded'
                                                ? getCompoundedAllowedRouteValues(item)
                                                : []
                                            const compoundedRouteOptions = item.kind === 'compounded' && compoundedRouteValues.length
                                                ? QUICK_ROUTE_OPTIONS.filter((option) => compoundedRouteValues.includes(option.value))
                                                : QUICK_ROUTE_OPTIONS
                                            return (
                                                <div key={item.id} className="rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/80 p-4" data-testid={`rx-item-${item.id}`}>
                                                    <div className="mb-4 flex items-start justify-between gap-3">
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span className="rounded-full border border-[color:var(--rxv-border)] px-2 py-0.5 text-[10px] font-black text-[color:var(--rxv-muted)]">{idx + 1}</span>
                                                                {item.kind === 'compounded' ? <span className="rounded-full border border-[#39ff14]/25 bg-[#39ff14]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#78ff67]">Manipulado</span> : null}
                                                                {item.isManual ? <span className="rounded-full border border-[color:var(--rxv-border)] bg-black/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[color:var(--rxv-muted)]">Manual</span> : null}
                                                                {item.is_controlled ? <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-amber-300">Controlado</span> : null}
                                                                {item.kind === 'compounded' && compoundedFormula?.dosage_form_family ? (
                                                                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-300">
                                                                        {getDosageFamilyLabel(compoundedFormula.dosage_form_family)}
                                                                    </span>
                                                                ) : null}
                                                                {item.catalog_source === 'global' ? <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-300">Global</span> : null}
                                                            </div>
                                                            <p className="mt-2 text-base font-bold text-white">
                                                                {item.name || `Item ${idx + 1}`}
                                                                {item.kind !== 'compounded' && concentrationLabel ? <span className="ml-1 font-normal text-[color:var(--rxv-muted)]">({concentrationLabel})</span> : null}
                                                            </p>
                                                            <p className="text-xs text-[color:var(--rxv-muted)]">
                                                                {item.kind === 'compounded'
                                                                    ? buildCompoundedCardSubtitle(item, state.patient) || 'Manipulado sem resumo detalhado'
                                                                    : [item.pharmaceutical_form, item.commercial_name].filter(Boolean).join(' • ') || 'Sem apresentação detalhada'}
                                                            </p>
                                                            {item.kind === 'compounded' ? (
                                                                <p className="mt-1 text-[11px] font-semibold text-[#b8c3d9]">
                                                                    {getFormulaTypeLabel(getUniversalFormulaType(item.compounded_snapshot?.metadata || null))}
                                                                </p>
                                                            ) : null}
                                                            {item.kind === 'compounded' && item.compounded_snapshot?.ingredients?.length ? (
                                                                <div className="mt-2 flex flex-wrap gap-1">
                                                                    {getCompoundedActiveIngredients(item.compounded_snapshot).slice(0, 4).map((ingredient) => (
                                                                        <span key={ingredient} className="rounded-full border border-[#39ff14]/25 bg-[#39ff14]/8 px-2 py-0.5 text-[10px] font-semibold text-[#98f98e]">
                                                                            {ingredient}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            ) : null}
                                                            {item.kind === 'compounded' && item.compounded_regimen_snapshot?.regimen_name ? (
                                                                <div className="mt-3 rounded-xl border border-[#39ff14]/15 bg-[#112313]/70 px-3 py-2">
                                                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6dde66]">Regime selecionado</p>
                                                                    <p className="mt-1 text-[11px] font-semibold text-[#b5ffaf]">
                                                                        {item.compounded_regimen_snapshot.regimen_name} • {buildCompoundedRegimenSummary(item, state.patient) || `${getCompoundedFrequencySummary(item)} • ${getCompoundedDurationSummary(item)}`}
                                                                    </p>
                                                                </div>
                                                            ) : null}
                                                            {item.kind === 'compounded' && isClinicalDoseOriented && compoundedCalculation?.ingredientBreakdown?.length ? (
                                                                <div className="mt-3 rounded-xl border border-slate-800 bg-black/20 px-3 py-3">
                                                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Dose final por ingrediente</p>
                                                                    <div className="mt-2 space-y-1">
                                                                        {compoundedCalculation.ingredientBreakdown.map((entry) => (
                                                                            <p key={`${item.id}-${entry.ingredientName}-${entry.rawRuleText}`} className="text-xs text-slate-200">
                                                                                <span className="font-semibold text-white">{entry.ingredientName}:</span> {entry.selectedDoseText}
                                                                                {entry.rangeText ? <span className="text-slate-400"> • faixa {entry.rangeText}</span> : null}
                                                                            </p>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {item.kind === 'compounded' && compoundedCalculation ? (
                                                                <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
                                                                    <div className="rounded-xl border border-slate-800 bg-black/20 px-3 py-2">
                                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Total calculado</p>
                                                                        <p className="mt-1 text-xs font-semibold text-white">{compoundedCalculation.calculatedTotalText || 'Indisponível'}</p>
                                                                    </div>
                                                                    <div className="rounded-xl border border-slate-800 bg-black/20 px-3 py-2">
                                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Quantidade sugerida</p>
                                                                        <p className="mt-1 text-xs font-semibold text-white">{compoundedCalculation.estimatedTotalText || 'Indisponível'}</p>
                                                                    </div>
                                                                    <div className="rounded-xl border border-slate-800 bg-black/20 px-3 py-2">
                                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Quantidade final</p>
                                                                        <p className="mt-1 text-xs font-semibold text-white">{compoundedCalculation.finalQuantityText || 'Indisponível'}</p>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {item.medication_id ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => void openPresentationPicker(item)}
                                                                    className="mt-2 rounded-lg border border-slate-700 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-400/10"
                                                                >
                                                                    Escolher apresentação
                                                                </button>
                                                            ) : null}
                                                            {analysis?.label ? (
                                                                <p className="mt-2 text-xs text-[color:var(--rxv-muted)]">{analysis.label}</p>
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
                                                            {item.kind === 'compounded' && compoundedWarnings.length ? (
                                                                <div className="mt-2 space-y-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                                                                    {compoundedWarnings.map((warning, warningIdx) => (
                                                                        <p key={`${item.id}-comp-warning-${warningIdx}`} className="text-xs font-semibold text-amber-200">
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

                                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                                                        <RxvField label="Nome do fármaco">
                                                            <RxvInput value={item.name} onChange={(e) => updateItem(item.id, (current) => ({ ...current, name: e.target.value }))} />
                                                        </RxvField>
                                                        <RxvField label={item.kind === 'compounded' ? 'Dose final por administração' : 'Dose'}>
                                                            <RxvInput value={item.dose || ''} onChange={(e) => updateItem(item.id, (current) => ({ ...current, dose: e.target.value }))} placeholder={item.kind === 'compounded' ? 'Ex: 0,4 mL' : 'Ex: 7 gotas'} />
                                                        </RxvField>
                                                        <RxvField label="Via">
                                                            <RxvSelect value={item.route || 'VO'} onChange={(e) => updateItem(item.id, (current) => ({ ...current, route: e.target.value }))} options={compoundedRouteOptions} disabled={item.kind === 'compounded' && compoundedRouteOptions.length <= 1} />
                                                        </RxvField>
                                                        <RxvField label="Modo de frequência">
                                                            <RxvSelect
                                                                value={item.frequencyMode || 'times_per_day'}
                                                                onChange={(e) => updateItem(item.id, (current) => ({
                                                                    ...current,
                                                                    frequencyMode: e.target.value as PrescriptionItem['frequencyMode'],
                                                                    timesPerDay: e.target.value === 'times_per_day' ? (current.timesPerDay || 2) : undefined,
                                                                    intervalHours: e.target.value === 'interval_hours' ? (current.intervalHours || 12) : undefined,
                                                                    frequency: e.target.value === 'interval_hours'
                                                                        ? formatIntervalHoursValue(current.intervalHours || 12)
                                                                        : formatFrequencyValue(current.timesPerDay || 2),
                                                                }))}
                                                                options={[
                                                                    { value: 'times_per_day', label: 'Vezes por dia' },
                                                                    { value: 'interval_hours', label: 'Intervalo em horas' },
                                                                ]}
                                                            />
                                                        </RxvField>
                                                        <RxvField label={item.frequencyMode === 'interval_hours' ? 'Intervalo (horas)' : 'Frequência'}>
                                                            {item.frequencyMode === 'interval_hours' ? (
                                                                <RxvInput
                                                                    type="number"
                                                                    min="1"
                                                                    step="1"
                                                                    value={item.intervalHours ?? ''}
                                                                    onChange={(e) => updateItem(item.id, (current) => ({
                                                                        ...current,
                                                                        frequencyMode: 'interval_hours',
                                                                        intervalHours: e.target.value ? Number(e.target.value) : undefined,
                                                                        frequency: formatIntervalHoursValue(e.target.value),
                                                                    }))}
                                                                    placeholder="Ex: 12"
                                                                />
                                                            ) : (
                                                            <RxvSelect
                                                                value={item.timesPerDay ? String(item.timesPerDay) : ''}
                                                                onChange={(e) => updateItem(item.id, (current) => ({
                                                                    ...current,
                                                                    frequencyMode: e.target.value ? 'times_per_day' : undefined,
                                                                    timesPerDay: e.target.value ? Number(e.target.value) : undefined,
                                                                    intervalHours: undefined,
                                                                    frequency: formatFrequencyValue(e.target.value),
                                                                }))}
                                                                options={ITEM_FREQUENCY_OPTIONS}
                                                            />
                                                            )}
                                                        </RxvField>
                                                    </div>

                                                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                                                        <RxvField label="Modo de duração">
                                                            <RxvSelect
                                                                value={item.durationMode || 'fixed_days'}
                                                                onChange={(e) => updateItem(item.id, (current) => ({
                                                                    ...current,
                                                                    durationMode: e.target.value as PrescriptionItem['durationMode'],
                                                                    duration: e.target.value === 'fixed_days'
                                                                        ? formatStructuredDuration(current.durationValue, current.durationUnit || 'dias')
                                                                        : '',
                                                                }))}
                                                                options={DURATION_MODE_OPTIONS}
                                                            />
                                                        </RxvField>
                                                        <RxvField label="Valor da duração">
                                                            <RxvInput
                                                                type="number"
                                                                min="1"
                                                                step="1"
                                                                value={item.durationMode === 'fixed_days' ? (item.durationValue ?? '') : ''}
                                                                onChange={(e) => updateItem(item.id, (current) => ({
                                                                    ...current,
                                                                    durationValue: e.target.value ? Number(e.target.value) : undefined,
                                                                    duration: formatStructuredDuration(
                                                                        e.target.value ? Number(e.target.value) : undefined,
                                                                        current.durationUnit || 'dias',
                                                                    ),
                                                                }))}
                                                                placeholder="Ex: 7"
                                                                disabled={item.durationMode !== 'fixed_days'}
                                                            />
                                                        </RxvField>
                                                        <RxvField label="Unidade da duração">
                                                            <RxvSelect
                                                                value={item.durationUnit || 'dias'}
                                                                onChange={(e) => updateItem(item.id, (current) => ({
                                                                    ...current,
                                                                    durationUnit: e.target.value,
                                                                    duration: formatStructuredDuration(current.durationValue, e.target.value),
                                                                }))}
                                                                options={DURATION_UNIT_OPTIONS}
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
                                                        <div className="rounded-xl border border-slate-800 bg-black/20 px-3 py-3 text-xs text-[color:var(--rxv-muted)]">
                                                            <p className="font-semibold text-[color:var(--rxv-text)]">Resumo</p>
                                                            {item.kind === 'compounded' ? (
                                                        <>
                                                            <p>{buildCompoundedRegimenSummary(item, state.patient) || formatDurationSummary(item)}</p>
                                                            <p>{buildCompoundedInstruction(item, state.patient)}</p>
                                                                    {compoundedCalculation?.calculatedTotalText ? <p>Calculado: {compoundedCalculation.calculatedTotalText}</p> : null}
                                                                    {compoundedCalculation?.estimatedTotalText ? <p>Sugerido: {compoundedCalculation.estimatedTotalText}</p> : null}
                                                                    {compoundedCalculation?.finalQuantityText ? <p>Final: {compoundedCalculation.finalQuantityText}</p> : null}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p>{formatDurationSummary(item)}</p>
                                                                    <p>{item.frequency || 'Frequência livre'}</p>
                                                                </>
                                                            )}
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

                                                    {item.kind === 'compounded' ? (
                                                        <div className="mt-3 space-y-3">
                                                            {isClinicalDoseOriented ? (
                                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                                    <RxvField label="Estratégia para faixas de dose">
                                                                        <RxvSelect
                                                                            value={String(((item.compounded_regimen_snapshot?.metadata as Record<string, unknown> | null)?.doseSelectionStrategy as string) || 'min')}
                                                                            onChange={(e) => updateItem(item.id, (current) => ({
                                                                                ...current,
                                                                                compounded_snapshot: {
                                                                                    ...current.compounded_snapshot,
                                                                                    metadata: {
                                                                                        ...(current.compounded_snapshot.metadata || {}),
                                                                                        regimen_semantics: {
                                                                                            ...((((current.compounded_snapshot.metadata || {}) as Record<string, unknown>).regimen_semantics as Record<string, unknown>) || {}),
                                                                                            [String(current.compounded_regimen_snapshot?.id || current.compounded_regimen_id || '')]: {
                                                                                                ...((((((current.compounded_snapshot.metadata || {}) as Record<string, unknown>).regimen_semantics as Record<string, unknown>) || {})[String(current.compounded_regimen_snapshot?.id || current.compounded_regimen_id || '')] as Record<string, unknown>) || {}),
                                                                                                doseSelectionStrategy: e.target.value,
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                },
                                                                                compounded_regimen_snapshot: current.compounded_regimen_snapshot
                                                                                    ? {
                                                                                        ...current.compounded_regimen_snapshot,
                                                                                        metadata: {
                                                                                            ...(current.compounded_regimen_snapshot.metadata || {}),
                                                                                            doseSelectionStrategy: e.target.value,
                                                                                        },
                                                                                    }
                                                                                    : current.compounded_regimen_snapshot,
                                                                            }))}
                                                                            options={[
                                                                                { value: 'min', label: 'Dose mínima da faixa' },
                                                                                { value: 'mid', label: 'Ponto médio da faixa' },
                                                                                { value: 'max', label: 'Dose máxima da faixa' },
                                                                            ]}
                                                                        />
                                                                    </RxvField>
                                                                    <div className="rounded-xl border border-slate-800 bg-black/20 px-3 py-3 text-xs text-[color:var(--rxv-muted)]">
                                                                        <p className="font-semibold text-[color:var(--rxv-text)]">Cálculo clínico do paciente</p>
                                                                        <p className="mt-1">{state.patient?.weight_kg ? `Peso usado: ${state.patient.weight_kg} kg` : 'Peso não informado. O cálculo por ingrediente ficará pendente.'}</p>
                                                                        <p className="mt-1">{compoundedCalculation?.perAdministrationText ? `Administração base: ${compoundedCalculation.perAdministrationText}` : 'Administração base não definida.'}</p>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            <RxvField label="Quantidade final para manipular">
                                                                <RxvInput
                                                                    value={item.manualQuantity ?? ''}
                                                                    onChange={(e) => updateItem(item.id, (current) => ({
                                                                        ...current,
                                                                        manualQuantity: e.target.value,
                                                                        compounded_regimen_snapshot: current.compounded_regimen_snapshot
                                                                            ? {
                                                                                ...current.compounded_regimen_snapshot,
                                                                                applied_quantity_text: e.target.value,
                                                                            }
                                                                            : current.compounded_regimen_snapshot,
                                                                    }))}
                                                                    placeholder={compoundedCalculation?.estimatedTotalText || 'Ex: q.s.p. 10 mL'}
                                                                />
                                                            </RxvField>
                                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                                <RxvField label="Orientações ao tutor">
                                                                    <RxvTextarea
                                                                        value={item.cautionsText ?? ''}
                                                                        onChange={(e) => updateItem(item.id, (current) => ({
                                                                            ...current,
                                                                            cautionsText: e.target.value,
                                                                        }))}
                                                                        rows={4}
                                                                        placeholder="Ex: usar luvas, alternar pinna, administrar com alimento."
                                                                    />
                                                                </RxvField>
                                                                <RxvField label="Instrução para a farmácia">
                                                                    <RxvTextarea
                                                                        value={item.compounded_pharmacy_guidance ?? ''}
                                                                        onChange={(e) => updateItem(item.id, (current) => ({
                                                                            ...current,
                                                                            compounded_pharmacy_guidance: e.target.value,
                                                                        }))}
                                                                        rows={4}
                                                                        placeholder="Detalhes adicionais da manipulação além do texto automático."
                                                                    />
                                                                </RxvField>
                                                            </div>
                                                            <details className="rounded-xl border border-slate-800 bg-black/20 px-3 py-3">
                                                                <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">Nota clínica interna (não imprime)</summary>
                                                                <div className="mt-3 space-y-3">
                                                                    <p className="text-xs text-[color:var(--rxv-muted)]">{getCompoundedInternalNote(item) || 'Sem nota clínica interna neste item.'}</p>
                                                                    <RxvTextarea
                                                                        value={item.compounded_internal_note ?? ''}
                                                                        onChange={(e) => updateItem(item.id, (current) => ({
                                                                            ...current,
                                                                            compounded_internal_note: e.target.value,
                                                                        }))}
                                                                        rows={4}
                                                                        placeholder="Racional clínico, referência técnica ou alerta interno. Não imprime."
                                                                    />
                                                                </div>
                                                            </details>
                                                            <div className="rounded-xl border border-slate-800 bg-black/20 px-3 py-3 text-xs text-[color:var(--rxv-muted)]">
                                                                <p className="font-semibold text-[color:var(--rxv-text)]">Texto final da receita</p>
                                                                <p className="mt-2">{buildCompoundedInstruction(item, state.patient)}</p>
                                                                {item.cautionsText?.trim() ? <p className="mt-1">Orientações ao tutor: {item.cautionsText.trim()}</p> : null}
                                                                <p className="mt-1">{buildCompoundedPharmacyInstruction(item, state.patient)}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="mt-3 grid grid-cols-1 gap-3">
                                                            <RxvField label="Observações adicionais">
                                                                <RxvTextarea
                                                                    value={item.cautionsText ?? ''}
                                                                    onChange={(e) => updateItem(item.id, (current) => ({
                                                                        ...current,
                                                                        cautionsText: e.target.value,
                                                                    }))}
                                                                    rows={4}
                                                                    placeholder="Uma observação por linha."
                                                                />
                                                            </RxvField>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </RxvCard>

                            <RxvCard>
                                <RxvSectionHeader
                                    icon="format_list_numbered"
                                    title="D. Recomendações"
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
                                    <p className="text-xs text-[color:var(--rxv-muted)]">{recommendationLines.length} recomendação(ões) prontas para impressão.</p>
                                ) : null}
                            </RxvCard>

                            <RxvCard>
                                <RxvSectionHeader
                                    icon="lab_research"
                                    title="E. Exames"
                                    subtitle="Lista simples editável, com inserção rápida por atalho"
                                />
                                <div className="space-y-4">
                                    <RxvField label="Justificativa dos exames">
                                        <RxvTextarea
                                            placeholder="Ex: Ficam sugeridos os seguintes exames para avaliar a função dos rins e do fígado do paciente..."
                                            value={state.examJustification}
                                            onChange={(e) => updateState((prev) => ({ ...prev, examJustification: e.target.value }))}
                                            rows={4}
                                        />
                                    </RxvField>
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

                            {false && <RxvCard>
                                <RxvSectionHeader
                                    icon="playlist_add_check"
                                    title="E. Protocolos"
                                    subtitle="Importe protocolos prontos antes de definir o template final"
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_280px]">
                                    <div className="rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/75 px-4 py-4 text-sm text-[color:var(--rxv-text)]">
                                        <p className="font-semibold text-[color:var(--rxv-text)]">Fluxo recomendado</p>
                                        <p className="mt-2">
                                            Abra Protocolos 3.0, escolha um protocolo da clinica ou global e use a acao
                                            para enviar itens, recomendacoes e exames para esta receita.
                                        </p>
                                        {location.state && (location.state as any)?.sourceProtocol?.name ? (
                                            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#39ff14]">
                                                Protocolo atual: {(location.state as any).sourceProtocol.name}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <RxvButton
                                            variant="secondary"
                                            onClick={() => navigate('/receituario-vet/protocolos-3')}
                                            className="justify-center"
                                        >
                                            Abrir Protocolos 3.0
                                        </RxvButton>
                                        <div className="rounded-2xl border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/65 px-4 py-4 text-sm text-[color:var(--rxv-muted)]">
                                            A importacao mantem os medicamentos no fluxo atual da Nova Receita.
                                        </div>
                                    </div>
                                </div>
                            </RxvCard>}

                            <RxvCard>
                                <RxvSectionHeader
                                    icon="palette"
                                    title="F. Templates"
                                    subtitle="Template de impressão separado da futura camada de templates clínicos de conteúdo"
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_280px]">
                                    <RxvField label="Template de impressão">
                                        <RxvSelect
                                            value={state.printTemplateId || state.templateId || getDefaultNovaReceitaTemplateId()}
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
                                    <div className="rounded-2xl border border-dashed border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/65 px-4 py-4 text-sm text-[color:var(--rxv-muted)]">
                                        <p className="font-semibold text-[color:var(--rxv-text)]">Próxima etapa</p>
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
                                    title={canFinalizeCompoundedDocs ? 'Visualização Prévia Final' : 'Preview Interno'}
                                    subtitle={canFinalizeCompoundedDocs ? 'Preview em tempo real pronto para emissão' : 'Rascunho interno enquanto faltam parâmetros farmacotécnicos'}
                                />
                                {!canFinalizeCompoundedDocs ? (
                                    <div className="mb-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                                        <p className="font-semibold">Rascunho incompleto — faltam parâmetros farmacotécnicos para emissão da receita final.</p>
                                        <p className="mt-1 text-xs">{compoundedFinalizationIssues[0]}</p>
                                    </div>
                                ) : null}

                                {/* Preview container com scroll próprio */}
                                <div className="rounded-xl overflow-hidden bg-[color:var(--rxv-surface-2)]/55 border border-[color:var(--rxv-border)]">
                                    {/* Toolbar do preview */}
                                    <div className="flex items-center justify-between border-b border-[color:var(--rxv-border)] px-3 py-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                                            {selectedTemplateObj.name}
                                        </span>
                                        <div className="flex gap-1.5">
                                            <button
                                                type="button"
                                                className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-[10px] font-bold text-[color:var(--rxv-muted)] hover:text-[color:var(--rxv-text)] disabled:cursor-not-allowed disabled:opacity-40"
                                                onClick={handleReview}
                                                disabled={!canFinalizeCompoundedDocs}
                                            >
                                                Revisar
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded border border-[color:var(--rxv-border)] px-2 py-1 text-[10px] font-bold text-[color:var(--rxv-muted)] hover:text-[color:var(--rxv-text)] disabled:cursor-not-allowed disabled:opacity-40"
                                                onClick={handlePrint}
                                                disabled={!canFinalizeCompoundedDocs}
                                            >
                                                Imprimir
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded border border-[#39ff14]/40 bg-[#39ff14]/10 px-2 py-1 text-[10px] font-bold text-[#39ff14] hover:bg-[#39ff14]/20 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800/20 disabled:text-slate-500"
                                                onClick={handleExportPdf}
                                                disabled={!canFinalizeCompoundedDocs}
                                            >
                                                PDF
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preview principal full-width com scroll vertical */}
                                    <div className="max-h-[78vh] overflow-y-auto overflow-x-hidden bg-[color:var(--rxv-surface-2)]/40">
                                        <div className="space-y-5 p-4 xl:p-6">
                                            {printDocs.map((doc, idx) => (
                                                <div key={`${doc.documentKind || 'standard'}-${idx}`} className="overflow-hidden rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/70">
                                                    {printDocs.length > 1 && (
                                                        <p className="px-4 pt-4 text-[10px] font-black uppercase tracking-widest text-[color:var(--rxv-muted)]">
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
            {presentationPickerOpen && (
                <RxvModalShell zIndexClass="z-[100]" overlayClassName="bg-black/95 backdrop-blur-md">
                    <div className="mx-auto flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-cyan-400/30 bg-[color:var(--rxv-surface)] shadow-[0_0_80px_rgba(34,211,238,0.12)]">
                        <div className="flex items-center justify-between border-b border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/90 px-8 py-5">
                            <div>
                                <h2 className="text-lg font-black uppercase italic tracking-tight text-[color:var(--rxv-text)]">Escolher apresentação</h2>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">{presentationPickerItemName}</p>
                            </div>
                            <button
                                type="button"
                                onClick={closePresentationPicker}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--rxv-surface-2)] text-[color:var(--rxv-muted)] transition-colors hover:bg-[color:var(--rxv-surface-2)] hover:text-[color:var(--rxv-text)]"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                            {isLoadingPresentationPicker ? (
                                <div className="flex flex-col items-center justify-center py-10 opacity-50">
                                    <span className="material-symbols-outlined animate-spin text-cyan-300">sync</span>
                                    <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-[color:var(--rxv-muted)]">Carregando apresentações...</p>
                                </div>
                            ) : presentationPickerOptions.length === 0 ? (
                                <div className="py-10 text-center">
                                    <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--rxv-muted)]">Nenhuma apresentação encontrada</p>
                                </div>
                            ) : (
                                presentationPickerOptions.map((presentation) => {
                                    const concentration = buildPresentationConcentrationText(presentation) || presentation.concentration_text || 'Sem concentração'
                                    return (
                                        <button
                                            key={presentation.id}
                                            type="button"
                                            onClick={() => applyPresentationToItem(presentation)}
                                            className="w-full rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)]/85 p-4 text-left transition-all hover:border-cyan-400/40 hover:bg-[color:var(--rxv-surface-2)]"
                                        >
                                            <p className="text-sm font-black uppercase italic text-white">
                                                {[presentation.pharmaceutical_form || 'Apresentação', presentation.commercial_name || 'Sem nome comercial'].join(' • ')}
                                            </p>
                                            <p className="mt-2 text-xs text-[color:var(--rxv-muted)]">{concentration}</p>
                                        </button>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </RxvModalShell>
            )}

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

            <AddCompoundedMedicationModal
                key={compoundedModalSession}
                open={compoundedModalOpen}
                onClose={closeCompoundedModal}
                onAdd={(item) => {
                    handleAddItem(item)
                    closeCompoundedModal()
                }}
                clinicId={clinicId || ''}
                patient={state.patient}
                defaultStartDate={state.defaultStartDate}
                defaultStartHour={state.defaultStartHour}
            />
        </ReceituarioChrome>
    )
}
