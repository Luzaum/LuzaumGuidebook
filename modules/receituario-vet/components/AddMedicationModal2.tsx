// ✅ AddMedicationModal2 — Modal para adicionar medicamentos (100% Catálogo 3.0)
// Versão completa com todos os campos de apresentação do schema Supabase

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  RxvField,
  RxvInput,
  RxvSelect,
  RxvTextarea,
  RxvButton,
  RxvToggle,
  RxvModalShell,
} from '../../../src/components/receituario/RxvComponents'
import {
  searchMedications,
  getMedicationPresentations,
  getMedicationRecommendedDoses,
  type RecommendedDose,
  type MedicationPresentationRecord,
  type MedicationSearchResult,
} from '../../../src/lib/clinicRecords'
import {
  buildPresentationConcentrationText,
  findUniqueHomonymWithRecommendedDoses,
} from '../../../src/lib/medicationCatalog'
import type { PrescriptionItem, PatientInfo } from '../NovaReceita2Page'
import { 
  calculatePracticalEquivalent, 
  type PracticalEquivalentResult 
} from '../rxUiHelpers'
import {
  type AdministrationBasis,
  ADMINISTRATION_BASIS_OPTIONS,
  ADMINISTRATION_TARGET_OPTIONS,
  ADMINISTRATION_UNIT_OPTIONS,
  isApplicationSiteBasis,
  isCustomAdministrationBasis,
  normalizeAdministrationBasis,
  normalizeAdministrationTarget,
} from '../vetPosologyShared'

// ===================== ROUTE OPTIONS =====================
const ROUTE_OPTIONS = [
  { value: 'VO', label: 'Oral (VO)' },
  { value: 'SC', label: 'Subcutâneo (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenoso (IV)' },
  { value: 'Tópico', label: 'Tópico' },
  { value: 'Oftálmico', label: 'Oftálmico' },
  { value: 'Otológico', label: 'Otológico' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Retal', label: 'Retal' },
  { value: 'Inalatório', label: 'Inalatório' },
  { value: 'Transdérmico', label: 'Transdérmico' },
]

const START_HOUR_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
  const label = `${String(hour).padStart(2, '0')}:00`
  return { value: label, label }
})

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

const FREQUENCY_OPTIONS = [
  { value: '1', label: '1x ao dia (a cada 24 horas)' },
  { value: '2', label: '2x ao dia (a cada 12 horas)' },
  { value: '3', label: '3x ao dia (a cada 8 horas)' },
  { value: '4', label: '4x ao dia (a cada 6 horas)' },
  { value: '6', label: '6x ao dia (a cada 4 horas)' },
  { value: '8', label: '8x ao dia (a cada 3 horas)' },
  { value: '12', label: '12x ao dia (a cada 2 horas)' },
  { value: '24', label: '24x ao dia (a cada 1 hora)' },
]

type StructuredFrequencyMode = 'times_per_day' | 'every_x_hours' | 'single_dose' | 'repeat_interval'

const FREQUENCY_MODE_OPTIONS = [
  { value: 'times_per_day', label: 'Vezes por dia' },
  { value: 'every_x_hours', label: 'Intervalo em horas' },
  { value: 'single_dose', label: 'Dose única' },
  { value: 'repeat_interval', label: 'Repetir periodicamente' },
]

const RECURRENCE_UNIT_OPTIONS = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
  { value: 'meses', label: 'meses' },
]

// ===================== TYPES =====================
interface AddMedicationModal2Props {
  open: boolean
  onClose: () => void
  onAdd: (item: PrescriptionItem) => void
  clinicId: string
  patient: PatientInfo | null
  defaultStartDate?: string
  defaultStartHour?: string
  /** Se true, ignora busca no catálogo e exibe apenas o formulário manual */
  manualMode?: boolean
  /** Espécie do combobox na receita quando ainda não há paciente (evita cair só em ambos/primeira linha) */
  prescriptionSpeciesHint?: string | null
  storageScope?: string
  title?: string
  subtitle?: string
  confirmLabel?: string
  hideStartControls?: boolean
}

type PresentationRecord = MedicationPresentationRecord & {
  is_default?: boolean
}

/** Extrai um campo de PresentationRecord, com fallback no metadata JSON */
function extractPresentationField(pres: PresentationRecord, field: string): string | undefined {
  const direct = (pres as Record<string, unknown>)[field]
  if (direct != null && direct !== '') return String(direct)
  const fromMeta = pres.metadata?.[field]
  if (fromMeta != null && fromMeta !== '') return String(fromMeta)
  return undefined
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

function formatEveryHoursValue(hours?: string | number | null): string {
  const value = Number(String(hours ?? '').replace(',', '.'))
  return Number.isFinite(value) && value > 0 ? `a cada ${value} horas` : ''
}

function formatPeriodicFrequency(mode: StructuredFrequencyMode, params: {
  timesPerDay?: string | number | null
  everyHours?: string | number | null
  recurrenceValue?: string | number | null
  recurrenceUnit?: string | null
}): string {
  if (mode === 'single_dose') return 'em dose única'
  if (mode === 'repeat_interval') {
    const recurrenceValue = Number(String(params.recurrenceValue ?? '').replace(',', '.'))
    const recurrenceUnit = String(params.recurrenceUnit || '').trim()
    return Number.isFinite(recurrenceValue) && recurrenceValue > 0 && recurrenceUnit
      ? `repetir a cada ${recurrenceValue} ${recurrenceUnit}`
      : ''
  }
  if (mode === 'every_x_hours') return formatEveryHoursValue(params.everyHours)
  return formatFrequencyValue(params.timesPerDay)
}

/** Alinha nomes legados (ex.: interval_hours) ao modo estruturado deste modal */
function normalizeFrequencyModeForModal(raw?: string | null): StructuredFrequencyMode {
  const m = String(raw || '').trim()
  if (m === 'interval_hours' || m === 'every_x_hours') return 'every_x_hours'
  if (m === 'single_dose' || m === 'repeat_interval' || m === 'times_per_day') return m
  return 'times_per_day'
}

function isStructuredNonDefaultFrequencyMode(mode: StructuredFrequencyMode): boolean {
  return mode !== 'times_per_day'
}

/** N vezes/dia regular quando frequency_min veio vazio mas o texto tem "2x ao dia" etc. */
function catalogRegularTimesPerDayN(d: RecommendedDose): number {
  const nFromMin = Number(d.frequency_min)
  if (Number.isFinite(nFromMin) && nFromMin > 0) return nFromMin
  const nFromText = Number(parseTimesPerDayValue(d.frequency || d.frequency_text || ''))
  return Number.isFinite(nFromText) && nFromText > 0 ? nFromText : 0
}

/** Paridade com o catálogo: usa flags + texto quando frequency_mode está legado ou inconsistente */
function resolvedCatalogFrequencyMode(d: RecommendedDose): StructuredFrequencyMode {
  const fm = String(d.frequency_mode || '').trim().toLowerCase()
  const blob = `${d.frequency || ''} ${d.frequency_text || ''}`.toLowerCase()
  if (fm === 'repeat_interval' || d.repeat_periodically) return 'repeat_interval'
  if (fm === 'single_dose' || (d.is_single_dose && !d.repeat_periodically)) return 'single_dose'
  if (fm === 'every_x_hours' || fm === 'interval_hours') return 'every_x_hours'
  if (fm === 'custom') {
    if (/\ba\s*cada\s*\d+/.test(blob)) return 'every_x_hours'
    return 'times_per_day'
  }
  // Catálogo 3 grava "a cada N horas" em frequency; se o modo coluna/metadata faltar ou for legado, inferir.
  if (/\ba\s*cada\s*\d+(?:[.,]\d+)?(?:\s*a\s*\d+(?:[.,]\d+)?)?\s*horas\b/i.test(blob)) return 'every_x_hours'
  if (/\ba\s*cada\s*\d+(?:[.,]\d+)?\s*h\b/i.test(blob)) return 'every_x_hours'
  // Legado: só N vezes/dia (sem texto de intervalo) — espaçamento regular ⇒ a cada 24/N horas
  const nDay = catalogRegularTimesPerDayN(d)
  if (
    !d.repeat_periodically &&
    !d.is_single_dose &&
    nDay > 0 &&
    24 % nDay === 0 &&
    (fm === 'times_per_day' || fm === '')
  ) {
    return 'every_x_hours'
  }
  return normalizeFrequencyModeForModal(d.frequency_mode)
}

function resolveEveryHoursFromCatalog(d: RecommendedDose): string {
  const ih = d.interval_hours
  if (ih != null && Number(ih) > 0) return String(Number(ih))
  const fm = String(d.frequency_mode || '').trim().toLowerCase()
  const nCol = Number(d.frequency_min)
  if (fm === 'every_x_hours' || fm === 'interval_hours') {
    if (Number.isFinite(nCol) && nCol > 0) return String(nCol)
  }
  const n = catalogRegularTimesPerDayN(d)
  if (n > 0 && 24 % n === 0) {
    return String(24 / n)
  }
  const blob = `${d.frequency || ''} ${d.frequency_text || ''}`
  const m = blob.match(/a\s*cada\s*(\d+(?:[.,]\d+)?)\s*h/i)
  if (m) return String(Number(m[1].replace(',', '.')))
  return ''
}

/** Catálogo e legados podem usar capitalização ou sinónimos */
function normalizeCatalogSpecies(raw: string | null | undefined): 'cão' | 'gato' | 'ambos' | null {
  const s = String(raw || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
  if (!s) return null
  if (s === 'ambos' || s === 'both') return 'ambos'
  if (s === 'gato' || s === 'felino' || s.includes('gata')) return 'gato'
  if (s === 'cao' || s === 'cão' || s === 'dog' || s.includes('canino')) return 'cão'
  return null
}

/** Paridade catálogo → modal: se a linha da espécie for só x/dia mas "ambos" tiver intervalo/repetição, usar ambos */
function pickBestRecommendedDose(
  doses: RecommendedDose[],
  patientSpecies: 'cão' | 'gato' | null,
): RecommendedDose | undefined {
  if (!doses.length) return undefined
  const speciesMatches =
    patientSpecies != null
      ? doses.filter((d) => normalizeCatalogSpecies(d.species) === patientSpecies)
      : []
  /** Várias linhas cão/gato: preferir a que já tem posologia estruturada (não a primeira só x/dia) */
  const bySpecies =
    speciesMatches.length === 0
      ? undefined
      : speciesMatches.find((d) =>
            isStructuredNonDefaultFrequencyMode(resolvedCatalogFrequencyMode(d)),
          ) || speciesMatches[0]
  const byAmbos = doses.find((d) => normalizeCatalogSpecies(d.species) === 'ambos')
  const firstStructured = doses.find((d) =>
    isStructuredNonDefaultFrequencyMode(resolvedCatalogFrequencyMode(d)),
  )
  if (
    bySpecies &&
    byAmbos &&
    isStructuredNonDefaultFrequencyMode(resolvedCatalogFrequencyMode(byAmbos)) &&
    !isStructuredNonDefaultFrequencyMode(resolvedCatalogFrequencyMode(bySpecies))
  ) {
    return byAmbos
  }
  if (!bySpecies && !byAmbos && firstStructured) return firstStructured
  return bySpecies || byAmbos || firstStructured || doses[0]
}

function canonicalRecommendedDoseUnit(
  doseUnit?: string | null,
  perWeightUnit?: string | null,
): string {
  const baseUnit = String(doseUnit || '').trim()
  const suffix = String(perWeightUnit || '').trim()
  if (!baseUnit) return ''
  if (!suffix) return baseUnit
  const normalizedBase = baseUnit.toLowerCase()
  const normalizedSuffix = suffix.toLowerCase()
  if (normalizedBase.endsWith(`/${normalizedSuffix}`) || normalizedBase.includes(`/${normalizedSuffix} `)) {
    return baseUnit
  }
  return `${baseUnit}/${suffix}`
}

function normalizeCautionsText(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.replace(/\r/g, ''))
    .filter((line) => line.trim().length > 0)
}

// ===================== COMPONENT =====================
export function AddMedicationModal2({
  open,
  onClose,
  onAdd,
  clinicId,
  patient,
  defaultStartDate = '',
  defaultStartHour = '',
  manualMode = false,
  prescriptionSpeciesHint,
  storageScope = 'recipe',
  title,
  subtitle,
  confirmLabel,
  hideStartControls = false,
}: AddMedicationModal2Props) {
  const storageKey = useMemo(
    () => (clinicId ? `rxv:add-medication-modal:${storageScope}:${clinicId}:${manualMode ? 'manual' : 'catalog'}` : null),
    [clinicId, manualMode, storageScope]
  )

  // Catalog state
  const [searchQuery, setSearchQuery] = useState('')
  const [medications, setMedications] = useState<MedicationSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<MedicationSearchResult | null>(null)
  const [presentations, setPresentations] = useState<PresentationRecord[]>([])
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null)
  const [recommendedDoses, setRecommendedDoses] = useState<RecommendedDose[]>([])

  // Form state
  const [dose, setDose] = useState('')
  const [frequencyMode, setFrequencyMode] = useState<StructuredFrequencyMode>('times_per_day')
  const [timesPerDay, setTimesPerDay] = useState('2')
  const [everyHours, setEveryHours] = useState('')
  const [recurrenceValue, setRecurrenceValue] = useState('')
  const [recurrenceUnit, setRecurrenceUnit] = useState('semanas')
  const [route, setRoute] = useState('VO')
  const [administrationBasis, setAdministrationBasis] = useState<AdministrationBasis>('weight_based')
  const [administrationAmount, setAdministrationAmount] = useState('1')
  const [administrationUnit, setAdministrationUnit] = useState('')
  const [administrationTarget, setAdministrationTarget] = useState('')
  const [duration, setDuration] = useState('')
  const [durationMode, setDurationMode] = useState<'fixed_days' | 'until_recheck' | 'continuous_use' | 'until_finished' | 'continuous_until_recheck'>('fixed_days')
  const [inheritStartFromPrescription, setInheritStartFromPrescription] = useState(true)
  const [itemStartDate, setItemStartDate] = useState('')
  const [itemStartHour, setItemStartHour] = useState('')
  const [cautions, setCautions] = useState('')

  // Manual mode only: extra fields
  const [manualName, setManualName] = useState('')
  const [manualConcentration, setManualConcentration] = useState('')
  const [manualForm, setManualForm] = useState('')
  const [manualCommercialName, setManualCommercialName] = useState('')
  const [manualControlled, setManualControlled] = useState(false)

  // Range selector state for recommended doses
  const [expandedDoseId, setExpandedDoseId] = useState<string | null>(null)
  const [rangeDoseValue, setRangeDoseValue] = useState<number | null>(null)
  const [rangeFreqValue, setRangeFreqValue] = useState<number | null>(null)
  const [rangeSpecies, setRangeSpecies] = useState<string | null>(null)

  // Practical Equivalent State
  const [practicalResult, setPracticalResult] = useState<PracticalEquivalentResult | null>(null)

  /** Evita re-hidratar posologia em loop; chave muda com medicamento, doses ou espécie do paciente */
  const catalogHydrationKeyRef = useRef<string>('')
  /** Evita auto-selecionar o homônimo com doses mais de uma vez para o mesmo termo de busca */
  const autoHomonymPickRef = useRef<string>('')

  useEffect(() => {
    if (open && !manualMode) catalogHydrationKeyRef.current = ''
  }, [open, manualMode])

  useEffect(() => {
    if (!open) autoHomonymPickRef.current = ''
  }, [open])

  const clearPersistedDraft = useCallback(() => {
    if (!storageKey) return
    sessionStorage.removeItem(storageKey)
  }, [storageKey])

  const handleClose = useCallback(() => {
    clearPersistedDraft()
    onClose()
  }, [clearPersistedDraft, onClose])

  // ==================== EFFECTS ====================

  useEffect(() => {
    if (!open) return
    const onEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open, handleClose])

  useEffect(() => {
    if (!open || !storageKey) return
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as Record<string, any>
      setSearchQuery(String(parsed.searchQuery || ''))
      setMedications(Array.isArray(parsed.medications) ? parsed.medications : [])
      setIsSearching(false)
      setSelectedMedication(parsed.selectedMedication || null)
      setPresentations(Array.isArray(parsed.presentations) ? parsed.presentations : [])
      setSelectedPresentationId(parsed.selectedPresentationId || null)
      const restoredDoses = Array.isArray(parsed.recommendedDoses) ? parsed.recommendedDoses : []
      setRecommendedDoses(restoredDoses)
      setDose(String(parsed.dose || ''))
      const skipFreqRestore = restoredDoses.length > 0 && !!parsed.selectedMedication
      if (skipFreqRestore) {
        catalogHydrationKeyRef.current = ''
      } else {
        setFrequencyMode((parsed.frequencyMode as StructuredFrequencyMode) || 'times_per_day')
        setTimesPerDay(parseTimesPerDayValue(parsed.timesPerDay) || '2')
        setEveryHours(String(parsed.everyHours || ''))
        setRecurrenceValue(String(parsed.recurrenceValue || ''))
        setRecurrenceUnit(String(parsed.recurrenceUnit || 'semanas'))
      }
      setRoute(String(parsed.route || 'VO'))
      setAdministrationBasis(normalizeAdministrationBasis(parsed.administrationBasis))
      setAdministrationAmount(String(parsed.administrationAmount || '1'))
      setAdministrationUnit(String(parsed.administrationUnit || ''))
      setAdministrationTarget(String(parsed.administrationTarget || ''))
      setDuration(String(parsed.duration || ''))
      setDurationMode(parsed.durationMode || 'fixed_days')
      setInheritStartFromPrescription(parsed.inheritStartFromPrescription !== false)
      setItemStartDate(String(parsed.itemStartDate ?? defaultStartDate ?? '').trim())
      setItemStartHour(String(parsed.itemStartHour ?? defaultStartHour ?? '').trim())
      setCautions(String(parsed.cautions || ''))
      setManualName(String(parsed.manualName || ''))
      setManualConcentration(String(parsed.manualConcentration || ''))
      setManualForm(String(parsed.manualForm || ''))
      setManualCommercialName(String(parsed.manualCommercialName || ''))
      setManualControlled(!!parsed.manualControlled)
    } catch (error) {
      console.warn('[AddMedicationModal2] Failed to restore modal draft', error)
    }
  }, [open, storageKey, defaultStartDate, defaultStartHour])

  // --- Practical Equivalent Calculation ---
  useEffect(() => {
    if (!open || !dose) {
      setPracticalResult(null)
      return
    }

    const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)
    if (!selectedPresentation) {
      setPracticalResult(null)
      return
    }

    // Parse weight
    const weightVal = parseFloat(String(patient?.weight_kg || '').replace(',', '.'))
    
    // Parse dose (extract numeric part if it's like "10 mg/kg" or just "10")
    // Simple extraction for the helper
    const doseMatch = dose.match(/(\d+(?:[.,]\d+)?)/)
    const doseVal = doseMatch ? parseFloat(doseMatch[1].replace(',', '.')) : 0
    const doseUnit = dose.replace(doseMatch ? doseMatch[0] : '', '').trim().split('/')[0] || 'mg'

    const isPerKg = dose.toLowerCase().includes('/kg')

    if (!doseVal || isNaN(doseVal)) {
      setPracticalResult(null)
      return
    }

    const totalDosePerAdmin = isPerKg ? (weightVal ? doseVal * weightVal : 0) : doseVal

    if (totalDosePerAdmin <= 0) {
      setPracticalResult(null)
      return
    }

    // Map PresentationRecord to Presentation expected by helper
    const result = calculatePracticalEquivalent({
      presentation: {
        ...selectedPresentation,
        // Ensure numeric fields
        value: selectedPresentation.value != null ? Number(selectedPresentation.value) : undefined,
        per_value: selectedPresentation.per_value != null ? Number(selectedPresentation.per_value) : undefined,
      } as any,
      totalDosePerAdmin,
      doseUnit,
    })

    setPracticalResult(result)
  }, [open, dose, selectedPresentationId, presentations, patient?.weight_kg])

  useEffect(() => {
    if (!open || !storageKey) return
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          searchQuery,
          medications,
          selectedMedication,
          presentations,
          selectedPresentationId,
          recommendedDoses,
          dose,
          frequencyMode,
          timesPerDay,
          everyHours,
          recurrenceValue,
          recurrenceUnit,
          route,
          administrationBasis,
          administrationAmount,
          administrationUnit,
          administrationTarget,
          duration,
          durationMode,
          inheritStartFromPrescription,
          itemStartDate,
          itemStartHour,
          cautions,
          manualName,
          manualConcentration,
          manualForm,
          manualCommercialName,
          manualControlled,
        })
      )
    } catch (error) {
      console.warn('[AddMedicationModal2] Failed to persist modal draft', error)
    }
  }, [
    open,
    storageKey,
    searchQuery,
    medications,
    selectedMedication,
    presentations,
    selectedPresentationId,
    recommendedDoses,
    dose,
    frequencyMode,
    timesPerDay,
    everyHours,
    recurrenceValue,
    recurrenceUnit,
    route,
    administrationBasis,
    administrationAmount,
    administrationUnit,
    administrationTarget,
    duration,
    durationMode,
    inheritStartFromPrescription,
    itemStartDate,
    itemStartHour,
    cautions,
    manualName,
    manualConcentration,
    manualForm,
    manualCommercialName,
    manualControlled,
  ])

  // Auto-search on open
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

  // Reset on close
  useEffect(() => {
    if (!open) {
      catalogHydrationKeyRef.current = ''
      setSelectedMedication(null)
      setPresentations([])
      setSelectedPresentationId(null)
      setRecommendedDoses([])
      setSearchQuery('')
      setDose('')
      setFrequencyMode('times_per_day')
      setTimesPerDay('2')
      setEveryHours('')
      setRecurrenceValue('')
      setRecurrenceUnit('semanas')
      setRoute('VO')
      setAdministrationBasis('weight_based')
      setAdministrationAmount('1')
      setAdministrationUnit('')
      setAdministrationTarget('')
      setDuration('')
      setDurationMode('fixed_days')
      setInheritStartFromPrescription(true)
      setItemStartDate(String(defaultStartDate || '').trim())
      setItemStartHour(String(defaultStartHour || '').trim())
      setCautions('')
      setManualName('')
      setManualConcentration('')
      setManualForm('')
      setManualCommercialName('')
      setManualControlled(false)
    }
  }, [open, defaultStartDate, defaultStartHour])

  // ==================== HANDLERS ====================

  const applyAdministrationFromRecommendedDose = useCallback((recommendedDose: any) => {
    const basisRaw = String(
      recommendedDose?.administration_basis
      || recommendedDose?.metadata?.administration_basis
      || 'weight_based'
    ).trim()
    const normalizedBasis = normalizeAdministrationBasis(basisRaw)

    const amountRaw = recommendedDose?.administration_amount ?? recommendedDose?.metadata?.administration_amount
    const unitRaw = String(recommendedDose?.administration_unit || recommendedDose?.metadata?.administration_unit || '').trim()
    const targetRaw = normalizeAdministrationTarget(recommendedDose?.administration_target || recommendedDose?.metadata?.administration_target || '')

    setAdministrationBasis(normalizedBasis)
    if (isCustomAdministrationBasis(normalizedBasis)) {
      setAdministrationAmount(amountRaw != null && amountRaw !== '' ? String(amountRaw) : '1')
      setAdministrationUnit(unitRaw || '')
      setAdministrationTarget(targetRaw || (isApplicationSiteBasis(normalizedBasis) ? 'sobre a lesao' : 'por animal'))
      setDose(`${amountRaw != null && amountRaw !== '' ? String(amountRaw) : '1'} ${unitRaw || 'unidade'}`)
      return
    }
    setAdministrationAmount('1')
    setAdministrationUnit('')
    setAdministrationTarget('')
  }, [])

  const applyCatalogRecommendedHydration = useCallback(
    (doses: RecommendedDose[]) => {
      const patientSpecies = patient
        ? (patient.species || '').toLowerCase().includes('felin')
          ? 'gato'
          : 'cão'
        : (() => {
            const h = normalizeCatalogSpecies(prescriptionSpeciesHint || 'cão')
            if (h === 'gato') return 'gato'
            if (h === 'cão') return 'cão'
            return null
          })()
      const bestDose = pickBestRecommendedDose(doses, patientSpecies)
      if (import.meta.env.DEV) {
        console.log('[AddMedicationModal2] catalog dose picker', {
          doseCount: doses.length,
          patientSpecies,
          resolvedMode: bestDose ? resolvedCatalogFrequencyMode(bestDose) : null,
          picked: bestDose
            ? {
                id: bestDose.id,
                species: bestDose.species,
                route: bestDose.route,
                frequency_mode: bestDose.frequency_mode,
                interval_hours: bestDose.interval_hours,
                is_single_dose: (bestDose as any).is_single_dose,
                repeat_periodically: (bestDose as any).repeat_periodically,
                recurrence_value: bestDose.recurrence_value,
                recurrence_unit: bestDose.recurrence_unit,
              }
            : null,
          rows: doses.map((d) => ({
            id: d.id,
            species: d.species,
            frequency_mode: d.frequency_mode,
            resolved: resolvedCatalogFrequencyMode(d),
          })),
        })
      }
      if (!bestDose) return

      const bestBasisRaw = (bestDose as any).administration_basis
      const bestIsCustom = isCustomAdministrationBasis(String(bestBasisRaw || 'weight_based'))
      if (!bestIsCustom) setDose(`${bestDose.dose_value} ${bestDose.dose_unit}`)
      setRoute(bestDose.route || 'VO')
      const nextMode = resolvedCatalogFrequencyMode(bestDose)
      setFrequencyMode(nextMode)
      setTimesPerDay(parseTimesPerDayValue(bestDose.frequency) || '2')
      setEveryHours(nextMode === 'every_x_hours' ? resolveEveryHoursFromCatalog(bestDose) : '')
      setRecurrenceValue(nextMode === 'repeat_interval' ? String(bestDose.recurrence_value || '') : '')
      setRecurrenceUnit(nextMode === 'repeat_interval' ? String(bestDose.recurrence_unit || 'semanas') : 'semanas')
      if ((bestDose as any).is_single_dose) {
        setDurationMode('until_finished')
      } else if ((bestDose as any).repeat_periodically) {
        // repeat_interval não impõe modo de duração
      }
      applyAdministrationFromRecommendedDose(bestDose)
    },
    [patient, prescriptionSpeciesHint, applyAdministrationFromRecommendedDose]
  )

  /** Paridade catálogo → modal após fetch ou após restore do sessionStorage */
  useEffect(() => {
    if (!open || !selectedMedication || recommendedDoses.length === 0) return
    const key = `${selectedMedication.id}:${recommendedDoses.map((d) => d.id || '').join(',')}:${patient?.species || ''}:${prescriptionSpeciesHint || ''}`
    if (catalogHydrationKeyRef.current === key) return
    catalogHydrationKeyRef.current = key
    applyCatalogRecommendedHydration(recommendedDoses)
  }, [open, selectedMedication?.id, recommendedDoses, patient?.species, prescriptionSpeciesHint, applyCatalogRecommendedHydration])

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
        // Nova resposta da API deve sempre re-hidratar (evita skip quando a chave era igual à sessão anterior)
        catalogHydrationKeyRef.current = ''
        setRecommendedDoses(dosesData)
        setAdministrationBasis('weight_based')
        setAdministrationAmount('1')
        setAdministrationUnit('')
        setAdministrationTarget('')

        setSearchQuery('')
      } catch (err) {
        console.error('[AddMedicationModal2] Error loading medication details', err)
      }
    },
    [clinicId, patient, applyAdministrationFromRecommendedDose]
  )

  // Homônimos na clínica: se só um registo com o mesmo nome tem doses, abre direto (sem depender da ordem do clique).
  useEffect(() => {
    if (!open || manualMode || selectedMedication || isSearching) return
    const q = searchQuery.trim()
    if (!q) return
    const pick = findUniqueHomonymWithRecommendedDoses(medications)
    if (!pick) return
    const sig = `${q}:::${pick.id}`
    if (autoHomonymPickRef.current === sig) return
    autoHomonymPickRef.current = sig
    void handleMedicationSelect(pick)
  }, [
    open,
    manualMode,
    selectedMedication,
    isSearching,
    searchQuery,
    medications,
    handleMedicationSelect,
  ])

  const handleAdd = useCallback(() => {
    const safeDefaultStartDate = String(defaultStartDate || '').trim()
    const safeDefaultStartHour = String(defaultStartHour || '').trim()
    const safeStartDate = inheritStartFromPrescription
      ? safeDefaultStartDate
      : String(itemStartDate || '').trim()
    const safeStartHour = inheritStartFromPrescription
      ? safeDefaultStartHour
      : String(itemStartHour || '').trim()
    const legacyStart =
      safeStartDate && safeStartHour
        ? `${safeStartDate}T${safeStartHour}:00`
        : safeStartDate || safeStartHour || undefined
    const resolvedDuration =
      durationMode === 'continuous_until_recheck'
        ? 'uso contínuo até reavaliação clínica'
        : durationMode === 'continuous_use'
          ? 'uso contínuo'
          : durationMode === 'until_finished'
            ? 'até terminar o medicamento'
            : durationMode === 'until_recheck'
              ? 'até reavaliação clínica'
              : duration

    if (manualMode) {
      // Modo manual: nome é obrigatório
      if (!manualName.trim()) return

      const newItem: PrescriptionItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        kind: 'standard',
        type: 'medication',
        isManual: true,
        is_controlled: manualControlled,
        catalog_source: 'clinic',
        name: manualName.trim(),
        pharmaceutical_form: manualForm || undefined,
        concentration_text: manualConcentration || undefined,
        commercial_name: manualCommercialName.trim() || undefined,
        dose,
        frequency: formatPeriodicFrequency(frequencyMode, { timesPerDay, everyHours, recurrenceValue, recurrenceUnit }),
        frequencyMode: frequencyMode === 'every_x_hours' ? 'interval_hours' : frequencyMode,
        timesPerDay: frequencyMode === 'times_per_day' ? Number(timesPerDay) : undefined,
        intervalHours: frequencyMode === 'every_x_hours' ? Number(everyHours) : undefined,
        repeatEveryValue: frequencyMode === 'repeat_interval' ? String(recurrenceValue) : undefined,
        repeatEveryUnit: frequencyMode === 'repeat_interval' ? recurrenceUnit : undefined,
        administrationBasis,
        administrationAmount: isCustomAdministrationBasis(administrationBasis)
          ? (administrationAmount ? Number(administrationAmount) : 1)
          : undefined,
        administrationUnit: isCustomAdministrationBasis(administrationBasis)
          ? (administrationUnit || undefined)
          : undefined,
        administrationTarget: administrationBasis === 'per_animal'
          ? 'por animal'
          : administrationBasis === 'per_application_site'
            ? (administrationTarget || 'sobre a lesao')
            : undefined,
        route,
        duration: resolvedDuration,
        durationMode,
        inheritStartFromPrescription,
        startDate: safeStartDate,
        startHour: safeStartHour,
        start_date: legacyStart,
        instructions: '',
        cautions: normalizeCautionsText(cautions),
        cautionsText: cautions,
        presentation_metadata: null,
      }

      onAdd(newItem)
      clearPersistedDraft()
      onClose()
      return
    }

    if (!selectedMedication) return

    const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)

    // label legível para exibição na lista do editor
    const presentationLabel =
      selectedPresentation
        ? [selectedPresentation.pharmaceutical_form, buildPresentationConcentrationText(selectedPresentation) || selectedPresentation.concentration_text]
          .filter(Boolean)
          .join(' - ')
        : undefined

    const newItem: PrescriptionItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      kind: 'standard',
      type: 'medication',
      isManual: false,
      is_controlled: !!selectedMedication.is_controlled,
      catalog_source: selectedMedication.source || 'clinic',
      medication_id: selectedMedication.id,
      presentation_id: selectedPresentationId || undefined,

      // Nome base
      name: selectedMedication.name,
      presentation_label: presentationLabel,

      // ✅ Todos os campos da apresentação (para adapter construir title/subtitle completos)
      pharmaceutical_form: selectedPresentation?.pharmaceutical_form || undefined,
      concentration_text: buildPresentationConcentrationText(selectedPresentation) || selectedPresentation?.concentration_text || undefined,
      commercial_name: selectedPresentation?.commercial_name || undefined,
      additional_component: selectedPresentation?.additional_component || undefined,
      value: selectedPresentation?.value || undefined,
      value_unit: selectedPresentation?.value_unit || undefined,
      per_value: selectedPresentation?.per_value || undefined,
      per_unit: selectedPresentation?.per_unit || undefined,
      avg_price_brl: selectedPresentation?.avg_price_brl ?? undefined,
      package_quantity: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_quantity') : undefined,
      package_unit: selectedPresentation ? extractPresentationField(selectedPresentation, 'package_unit') : undefined,
      presentation_metadata: selectedPresentation?.metadata || null,

      // Campos de dosagem
      dose,
      frequency: formatPeriodicFrequency(frequencyMode, { timesPerDay, everyHours, recurrenceValue, recurrenceUnit }),
      frequencyMode: frequencyMode === 'every_x_hours' ? 'interval_hours' : frequencyMode,
      timesPerDay: frequencyMode === 'times_per_day' ? Number(timesPerDay) : undefined,
      intervalHours: frequencyMode === 'every_x_hours' ? Number(everyHours) : undefined,
      repeatEveryValue: frequencyMode === 'repeat_interval' ? String(recurrenceValue) : undefined,
      repeatEveryUnit: frequencyMode === 'repeat_interval' ? recurrenceUnit : undefined,
      administrationBasis,
      administrationAmount: isCustomAdministrationBasis(administrationBasis)
        ? (administrationAmount ? Number(administrationAmount) : 1)
        : undefined,
      administrationUnit: isCustomAdministrationBasis(administrationBasis)
        ? (administrationUnit || undefined)
        : undefined,
      administrationTarget: administrationBasis === 'per_animal'
        ? 'por animal'
        : administrationBasis === 'per_application_site'
          ? (administrationTarget || 'sobre a lesao')
          : undefined,
      route,
      duration: resolvedDuration,
      durationMode,
      inheritStartFromPrescription,
      startDate: safeStartDate,
      startHour: safeStartHour,
      start_date: legacyStart,
      instructions: '',
      cautions: normalizeCautionsText(cautions),
      cautionsText: cautions,
    }

    onAdd(newItem)
    clearPersistedDraft()
    onClose()
  }, [
    manualMode,
    manualName,
    manualForm,
    manualConcentration,
    manualCommercialName,
    manualControlled,
    selectedMedication,
    presentations,
    selectedPresentationId,
    dose,
    frequencyMode,
    timesPerDay,
    everyHours,
    recurrenceValue,
    recurrenceUnit,
    administrationBasis,
    administrationAmount,
    administrationUnit,
    administrationTarget,
    route,
    duration,
    durationMode,
    inheritStartFromPrescription,
    itemStartDate,
    itemStartHour,
    cautions,
    onAdd,
    onClose,
    clearPersistedDraft,
    applyAdministrationFromRecommendedDose,
    defaultStartDate,
    defaultStartHour,
  ])

  if (!open) return null

  const selectedPresentation = presentations.find((p) => p.id === selectedPresentationId)
  const canAdd = manualMode ? !!manualName.trim() : !!selectedMedication
  const resolvedTitle =
    title || (manualMode ? 'Adicionar Medicamento Manual' : 'Adicionar Medicamento do Catálogo')
  const resolvedSubtitle =
    subtitle || (manualMode
      ? 'Preencha os dados do medicamento manualmente'
      : 'Busque no Catálogo 3.0 e adicione à receita')
  const resolvedConfirmLabel = confirmLabel || 'Adicionar à Receita'

  return (
    <RxvModalShell zIndexClass="z-[90]" overlayClassName="bg-black/80 backdrop-blur-sm">
      <div className="mx-auto max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2f5b25] bg-[#0a0f0a] text-slate-100 shadow-[0_0_60px_rgba(57,255,20,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-black/60 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              {resolvedTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {resolvedSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RxvButton variant="secondary" onClick={handleClose}>
              Cancelar
            </RxvButton>
            <RxvButton variant="primary" onClick={handleAdd} disabled={!canAdd}>
              {resolvedConfirmLabel}
            </RxvButton>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[calc(92vh-80px)] overflow-y-auto p-6 space-y-6">


          {/* ==================== MODO CATÁLOGO ==================== */}
          {!manualMode && (
            <>
              {/* Busca */}
              {!selectedMedication && (
                <div className="space-y-3">
                  <RxvField label="Buscar medicamento">
                    <div className="relative">
                      <RxvInput
                        placeholder="Digite para buscar ou veja a lista abaixo..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {isSearching && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined animate-spin text-[#39ff14] text-[18px]">
                          sync
                        </span>
                      )}
                    </div>
                  </RxvField>

                  {!isSearching && medications.length === 0 && !searchQuery && (
                    <p className="text-xs text-slate-500 italic text-center py-4">
                      Carregando medicamentos da clínica...
                    </p>
                  )}
                  {!isSearching && medications.length === 0 && searchQuery && (
                    <p className="text-xs text-slate-500 text-center py-4">
                      Nenhum medicamento encontrado para "{searchQuery}"
                    </p>
                  )}
                  {medications.length > 0 && (
                    <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                      {medications.map((med) => {
                        const clinicRow = med.source !== 'global' && med.scope !== 'global'
                        const doseCount =
                          typeof med.recommended_dose_count === 'number' ? med.recommended_dose_count : null
                        return (
                        <button
                          key={med.id}
                          type="button"
                          className="w-full rounded-xl border border-slate-800 bg-black/40 px-4 py-3 text-left hover:border-[#39ff14]/50 hover:bg-[#39ff14]/5 transition-all"
                          onClick={() => handleMedicationSelect(med)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-bold text-white">{med.name}</p>
                            {clinicRow && doseCount !== null && (
                              <span
                                className={
                                  doseCount > 0
                                    ? 'shrink-0 rounded-md border border-[#39ff14]/40 bg-[#39ff14]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#39ff14]'
                                    : 'shrink-0 rounded-md border border-slate-600 bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400'
                                }
                              >
                                {doseCount > 0 ? 'Com doses do catálogo' : 'Sem doses do catálogo'}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {med.source === 'global' ? 'Catálogo global' : (med.pharmacy_origin || 'Catálogo da clínica')}
                            {med.is_controlled && ' • Controlado'}
                          </p>
                        </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Medicamento selecionado */}
              {selectedMedication && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 px-4 py-3">
                    <div>
                      <p className="text-base font-bold text-white">{selectedMedication.name}</p>
                      <p className="text-xs text-slate-500">{selectedMedication.source === 'global' ? 'Catálogo global' : (selectedMedication.pharmacy_origin || 'Catálogo da clínica')}</p>
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
                              buildPresentationConcentrationText(p) || p.concentration_text,
                              p.is_default ? '(Padrão)' : undefined,
                            ].filter(Boolean).join(' - '),
                          }))}
                        />
                      </RxvField>

                      {/* Preview da apresentação selecionada */}
                      {selectedPresentation && (
                        <div className="rounded-xl border border-slate-800 bg-black/30 px-4 py-3 space-y-1 text-xs text-slate-400">
                          {(buildPresentationConcentrationText(selectedPresentation) || selectedPresentation.concentration_text) && (
                            <p>Concentração: <span className="text-white">{buildPresentationConcentrationText(selectedPresentation) || selectedPresentation.concentration_text}</span></p>
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
                        {recommendedDoses.map((rd, idx) => {
                          const rdAny = rd as any
                          const doseKey = rd.id || `rd-${idx}`
                          const hasDoseRange = rdAny.dose_max != null && rdAny.dose_max > rd.dose_value
                          const hasFreqRange = rdAny.frequency_max != null && rdAny.frequency_min != null && rdAny.frequency_max > rdAny.frequency_min
                          const needsSpeciesChoice = (rd.species || '').toLowerCase() === 'ambos' || (rd.species || '').toLowerCase() === 'both'
                          const needsInteraction = hasDoseRange || hasFreqRange || needsSpeciesChoice
                          const isExpanded = expandedDoseId === doseKey
                          const canonicalDoseUnit = canonicalRecommendedDoseUnit(rd.dose_unit, rdAny.per_weight_unit)
                          const isCustomBasis = isCustomAdministrationBasis(rdAny.administration_basis)
                          const doseLabel = isCustomBasis
                            ? `${rdAny.administration_amount ?? 1} ${rdAny.administration_unit || 'unidade'}${rdAny.administration_target ? ' ' + rdAny.administration_target : ' por animal'}`
                            : hasDoseRange
                              ? `${rd.dose_value}–${rdAny.dose_max} ${canonicalDoseUnit}`
                              : `${rd.dose_value} ${canonicalDoseUnit}`
                          const doseLabelResolved = isCustomBasis
                            ? doseLabel
                            : hasDoseRange
                              ? `${rd.dose_value}–${rdAny.dose_max} ${canonicalDoseUnit}`
                              : `${rd.dose_value} ${canonicalDoseUnit}`
                          const freqMode = rdAny.frequency_mode || 'times_per_day'
                          const freqLabel = freqMode === 'repeat_interval' && (rdAny.recurrence_value || rdAny.recurrence_unit)
                            ? `a cada ${rdAny.recurrence_value ?? '?'} ${rdAny.recurrence_unit || 'semanas'}`
                            : hasFreqRange
                              ? `${rdAny.frequency_min}–${rdAny.frequency_max}x/dia`
                              : rd.frequency || ''
                          const freqModeLabel = freqMode === 'every_x_hours' ? 'a cada Xh' : freqMode === 'repeat_interval' ? 'periódico' : freqMode === 'custom' ? 'personalizado' : 'x ao dia'

                          const handleExpand = () => {
                            if (isExpanded) {
                              setExpandedDoseId(null)
                              return
                            }
                            setExpandedDoseId(doseKey)
                            setRangeDoseValue(rdAny.calculator_default_dose ?? rd.dose_value)
                            setRangeFreqValue(rdAny.calculator_default_frequency ?? rdAny.frequency_min ?? (parseTimesPerDayValue(rd.frequency) ? Number(parseTimesPerDayValue(rd.frequency)) : null))
                            setRangeSpecies(needsSpeciesChoice ? null : rd.species)
                          }

                          const handleApplyDirect = () => {
                            if (!isCustomBasis) setDose(`${rd.dose_value} ${canonicalDoseUnit}`)
                            setRoute(rd.route || 'VO')
                            const nextMode = normalizeFrequencyModeForModal(rd.frequency_mode)
                            setFrequencyMode(nextMode)
                            setTimesPerDay(parseTimesPerDayValue(rd.frequency) || '2')
                            setEveryHours(nextMode === 'every_x_hours' ? String(rd.frequency_min || '') : '')
                            setRecurrenceValue(nextMode === 'repeat_interval' ? String(rd.recurrence_value || '') : '')
                            setRecurrenceUnit(nextMode === 'repeat_interval' ? String(rd.recurrence_unit || 'semanas') : 'semanas')
                            applyAdministrationFromRecommendedDose(rd)
                          }

                          const handleApplyRange = () => {
                            if (needsSpeciesChoice && !rangeSpecies) return
                            const finalDose = rangeDoseValue ?? rd.dose_value
                            const finalFreq = rangeFreqValue
                            if (!isCustomBasis) setDose(`${finalDose} ${canonicalDoseUnit}`)
                            setRoute(rd.route || 'VO')
                            const nextMode = normalizeFrequencyModeForModal(rd.frequency_mode)
                            setFrequencyMode(nextMode)
                            setTimesPerDay(finalFreq ? String(finalFreq) : (parseTimesPerDayValue(rd.frequency) || '2'))
                            setEveryHours(nextMode === 'every_x_hours' ? String(finalFreq || rd.frequency_min || '') : '')
                            setRecurrenceValue(nextMode === 'repeat_interval' ? String(rd.recurrence_value || '') : '')
                            setRecurrenceUnit(nextMode === 'repeat_interval' ? String(rd.recurrence_unit || 'semanas') : 'semanas')
                            applyAdministrationFromRecommendedDose(rd)
                            setExpandedDoseId(null)
                          }

                          return (
                            <div key={doseKey} className="rounded-lg bg-black/40 border border-transparent hover:border-amber-500/30 transition-all overflow-hidden">
                              {/* Header row */}
                              <button
                                type="button"
                                className="flex w-full items-center justify-between px-3 py-3 text-left group"
                                onClick={needsInteraction ? handleExpand : handleApplyDirect}
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold border border-emerald-500/20">
                                      {needsSpeciesChoice ? 'cão/gato' : rd.species}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold border border-blue-500/20">
                                      {rd.route || 'VO'}
                                    </span>
                                    {rdAny.indication && (
                                      <span className="text-[10px] text-slate-400 italic">{rdAny.indication}</span>
                                    )}
                                  </div>
                                  <p className="text-xs font-bold text-amber-200">
                                    {doseLabelResolved}
                                  </p>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                    {freqLabel && <span>{freqLabel} <span className="text-slate-600">({freqModeLabel})</span></span>}
                                    {rdAny.duration && <span>• {rdAny.duration}</span>}
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  {needsInteraction ? (
                                    <>
                                      <span className="material-symbols-outlined text-amber-500 text-[18px] group-hover:text-amber-300 transition-colors">
                                        {isExpanded ? 'expand_less' : 'tune'}
                                      </span>
                                      <span className="text-[9px] text-amber-500/60 uppercase font-bold">
                                        {isExpanded ? 'Fechar' : 'Configurar'}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-[10px] text-amber-500 font-bold group-hover:text-amber-300 transition-colors">APLICAR</span>
                                  )}
                                </div>
                              </button>

                              {/* Expanded range selector */}
                              {isExpanded && (
                                <div className="px-4 pb-4 pt-2 border-t border-amber-500/10 space-y-4">
                                  {/* Species choice when ambos/both */}
                                  {needsSpeciesChoice && (
                                    <div>
                                      <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                                        Espécie do paciente *
                                      </p>
                                      <div className="flex gap-2">
                                        {[{value: 'cão', label: 'Cão'}, {value: 'gato', label: 'Gato'}].map(sp => (
                                          <button
                                            key={sp.value}
                                            type="button"
                                            className={`flex-1 rounded-lg py-2.5 px-4 text-sm font-bold border transition-all ${
                                              rangeSpecies === sp.value
                                                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                                                : 'bg-black/30 border-slate-700 text-slate-400 hover:border-amber-500/30'
                                            }`}
                                            onClick={() => setRangeSpecies(sp.value)}
                                          >
                                            {sp.label}
                                          </button>
                                        ))}
                                      </div>
                                      {!rangeSpecies && (
                                        <p className="text-[9px] text-red-400 mt-1 font-bold">Selecione a espécie para continuar</p>
                                      )}
                                    </div>
                                  )}

                                  {/* Dose range selector */}
                                  {hasDoseRange && (
                                    <div>
                                      <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                                        Dose: {rd.dose_value}–{rdAny.dose_max} {canonicalDoseUnit}
                                      </p>
                                      <div className="flex items-center gap-3">
                                        <input
                                          type="range"
                                          min={rd.dose_value}
                                          max={rdAny.dose_max}
                                          step={0.5}
                                          value={rangeDoseValue ?? rd.dose_value}
                                          onChange={(e) => setRangeDoseValue(Number(e.target.value))}
                                          className="flex-1 h-2 appearance-none bg-slate-700 rounded-full cursor-pointer"
                                          style={{'accentColor': '#f59e0b'} as any}
                                        />
                                        <div className="flex items-center gap-1.5 bg-black/40 rounded-lg px-3 py-1.5 border border-amber-500/20">
                                          <input
                                            type="number"
                                            min={rd.dose_value}
                                            max={rdAny.dose_max}
                                            step={0.5}
                                            value={rangeDoseValue ?? rd.dose_value}
                                            onChange={(e) => setRangeDoseValue(Number(e.target.value))}
                                            className="w-16 bg-transparent text-amber-200 text-sm font-bold text-center outline-none"
                                          />
                                          <span className="text-[10px] text-slate-500">{canonicalDoseUnit}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Frequency range selector */}
                                  {hasFreqRange && (
                                    <div>
                                      <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                                        Frequência: {rdAny.frequency_min}–{rdAny.frequency_max} {freqModeLabel}
                                      </p>
                                      <div className="flex gap-2">
                                        {Array.from(
                                          { length: rdAny.frequency_max - rdAny.frequency_min + 1 },
                                          (_, i) => rdAny.frequency_min + i
                                        ).map((freq: number) => (
                                          <button
                                            key={freq}
                                            type="button"
                                            className={`flex-1 rounded-lg py-2 px-3 text-center font-bold text-sm border transition-all ${
                                              rangeFreqValue === freq
                                                ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                                                : 'bg-black/30 border-slate-700 text-slate-400 hover:border-purple-500/30'
                                            }`}
                                            onClick={() => setRangeFreqValue(freq)}
                                          >
                                            {freqMode === 'every_x_hours' ? `q${Math.round(24/freq)}h` : `${freq}x`}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Notes/duration hint */}
                                  {(rdAny.duration || rd.notes) && (
                                    <div className="text-[10px] text-slate-500 bg-black/20 rounded-lg px-3 py-2 border border-slate-800">
                                      {rdAny.duration && <p><strong className="text-slate-400">Duração:</strong> {rdAny.duration}</p>}
                                      {rd.notes && <p className="mt-1"><strong className="text-slate-400">Obs:</strong> {rd.notes}</p>}
                                    </div>
                                  )}

                                  {/* Confirm button */}
                                  <button
                                    type="button"
                                    disabled={needsSpeciesChoice && !rangeSpecies}
                                    className="w-full rounded-xl py-2.5 text-sm font-black uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500/25 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] active:scale-[0.98]"
                                    onClick={handleApplyRange}
                                  >
                                    <span className="flex items-center justify-center gap-2">
                                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                      Confirmar: {isCustomBasis ? doseLabel : `${rangeDoseValue ?? rd.dose_value} ${canonicalDoseUnit}`} • {freqMode === 'repeat_interval' ? freqLabel : freqMode === 'single_dose' ? 'dose única' : `${rangeFreqValue ?? '?'}x/dia`}
                                    </span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )
                        })}
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
                <RxvField label="Controlado">
                  <RxvToggle
                    checked={manualControlled}
                    onChange={setManualControlled}
                    label="Medicamento controlado"
                  />
                </RxvField>
              </div>

            </div>
          )}

          {/* ==================== CAMPOS COMUNS (dose/freq/duração) ==================== */}
          {(selectedMedication || manualMode) && (
            <div className="space-y-4">
              <div className="h-px bg-slate-800/60" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RxvField label="Dose">
                  <RxvInput
                    placeholder="Ex: 10 mg/kg"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                  />
                </RxvField>

                <RxvField label="Base de administração">
                  <RxvSelect
                    value={administrationBasis}
                    onChange={(e) => {
                      const next = normalizeAdministrationBasis(e.target.value)
                      setAdministrationBasis(next)
                      if (next === 'per_animal') {
                        setAdministrationTarget('por animal')
                      } else if (next === 'per_application_site') {
                        setAdministrationTarget((current) => normalizeAdministrationTarget(current) || 'sobre a lesao')
                      } else {
                        setAdministrationUnit('')
                        setAdministrationTarget('')
                        setAdministrationAmount('1')
                      }
                    }}
                    options={ADMINISTRATION_BASIS_OPTIONS.map((entry) => ({
                      value: entry.value,
                      label: entry.label,
                    }))}
                  />
                </RxvField>

                {isCustomAdministrationBasis(administrationBasis) ? (
                  <>
                    <RxvField label="Quantidade por administração">
                      <RxvInput
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={administrationAmount}
                        onChange={(e) => setAdministrationAmount(e.target.value)}
                        placeholder="Ex: 1"
                      />
                    </RxvField>
                    <RxvField label="Unidade administrável">
                      <RxvSelect
                        value={administrationUnit}
                        onChange={(e) => setAdministrationUnit(e.target.value)}
                        options={ADMINISTRATION_UNIT_OPTIONS.map((entry) => ({
                          value: entry.value,
                          label: entry.label,
                        }))}
                      />
                    </RxvField>
                    <RxvField label={isApplicationSiteBasis(administrationBasis) ? 'Sitio de aplicacao' : 'Alvo'}>
                      <RxvSelect
                        value={administrationTarget || (isApplicationSiteBasis(administrationBasis) ? 'sobre a lesao' : 'por animal')}
                        onChange={(e) => setAdministrationTarget(e.target.value)}
                        options={isApplicationSiteBasis(administrationBasis)
                          ? ADMINISTRATION_TARGET_OPTIONS.filter((entry) => entry.value !== 'por animal').map((entry) => ({
                            value: entry.value,
                            label: entry.label,
                          }))
                          : [{ value: 'por animal', label: 'por animal' }]}
                      />
                    </RxvField>
                  </>
                ) : null}

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
                  <div className="space-y-2">
                    <RxvSelect
                      value={frequencyMode}
                      onChange={(e) => setFrequencyMode(e.target.value as StructuredFrequencyMode)}
                      options={FREQUENCY_MODE_OPTIONS}
                    />
                    {frequencyMode === 'times_per_day' ? (
                      <RxvSelect
                        value={timesPerDay}
                        onChange={(e) => setTimesPerDay(e.target.value)}
                        options={FREQUENCY_OPTIONS}
                      />
                    ) : null}
                    {frequencyMode === 'every_x_hours' ? (
                      <RxvInput
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Ex: 12"
                        value={everyHours}
                        onChange={(e) => setEveryHours(e.target.value)}
                      />
                    ) : null}
                    {frequencyMode === 'repeat_interval' ? (
                      <div className="grid grid-cols-2 gap-2">
                        <RxvInput
                          type="number"
                          min="1"
                          step="1"
                          placeholder="Ex: 12"
                          value={recurrenceValue}
                          onChange={(e) => setRecurrenceValue(e.target.value)}
                        />
                        <RxvSelect
                          value={recurrenceUnit}
                          onChange={(e) => setRecurrenceUnit(e.target.value)}
                          options={RECURRENCE_UNIT_OPTIONS}
                        />
                      </div>
                    ) : null}
                    {frequencyMode === 'single_dose' ? (
                      <div className="rounded-xl border border-slate-800 bg-black/30 px-3 py-2 text-xs text-slate-300">
                        Em dose única.
                      </div>
                    ) : null}
                  </div>
                </RxvField>

                <RxvField label="Duração">
                  <div className="space-y-2">
                    <RxvSelect
                      value={durationMode}
                      onChange={(e) => setDurationMode(e.target.value as typeof durationMode)}
                      options={[
                        { value: 'fixed_days', label: 'Duração fechada' },
                        { value: 'until_recheck', label: 'Até reavaliação clínica' },
                        { value: 'continuous_use', label: 'Uso contínuo' },
                        { value: 'continuous_until_recheck', label: 'Uso contínuo até reavaliação clínica' },
                        { value: 'until_finished', label: 'Até terminar o medicamento' },
                      ]}
                    />
                    {durationMode === 'fixed_days' ? (
                      <RxvInput
                        placeholder="Ex: 7 dias"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    ) : null}
                  </div>
                </RxvField>
              </div>

              {/* ✅ EQUIVALENTE PRÁTICO DISPLAY */}
              {practicalResult && practicalResult.success && (
                <div className="rounded-2xl border border-[#39ff14]/20 bg-[#39ff14]/[0.03] p-5 space-y-4 shadow-[0_0_20px_rgba(57,255,20,0.05)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#39ff14]/70 mb-1">Equivalente Prático</p>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {practicalResult.label}
                      </h3>
                      {practicalResult.pharmacyLabel && (
                        <p className="text-[10px] mt-1 text-slate-500 uppercase font-bold tracking-wider">
                          Origem: <span className="text-slate-300">{practicalResult.pharmacyLabel}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#39ff14]/10 text-[#39ff14]">
                      <span className="material-symbols-outlined">calculate</span>
                    </div>
                  </div>

                  {practicalResult.alert && (
                    <div className={`flex items-start gap-3 rounded-xl border p-3 text-xs leading-relaxed ${
                      practicalResult.alertSeverity === 'danger' 
                        ? 'border-red-500/30 bg-red-500/10 text-red-200'
                        : practicalResult.alertSeverity === 'warning'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
                        : 'border-blue-500/30 bg-blue-500/10 text-blue-200'
                    }`}>
                      <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                        {practicalResult.alertSeverity === 'danger' ? 'error' : practicalResult.alertSeverity === 'warning' ? 'warning' : 'info'}
                      </span>
                      <p>{practicalResult.alert}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Erros de cálculo */}
              {practicalResult && !practicalResult.success && dose && selectedPresentationId && (
                <div className="rounded-xl border border-slate-800 bg-black/40 p-3 flex items-center gap-3 text-xs text-slate-500 italic">
                  <span className="material-symbols-outlined text-[16px]">help</span>
                  <p>Não foi possível calcular o equivalente prático: {practicalResult.failReason}</p>
                </div>
              )}

              {!hideStartControls && (
                <div className="rounded-2xl border border-slate-800/80 bg-black/20 p-4 space-y-3">
                  <div>
                    <p className="text-sm font-bold text-white">Início do tratamento</p>
                    <p className="text-xs text-slate-400">Cada item pode herdar o início padrão da receita ou usar data e hora próprias.</p>
                  </div>

                  <RxvToggle
                    checked={inheritStartFromPrescription}
                    onChange={setInheritStartFromPrescription}
                    label="Usar início padrão da receita"
                  />

                  {!inheritStartFromPrescription ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <RxvField label="Data de início do item">
                        <RxvInput
                          type="date"
                          value={itemStartDate}
                          onChange={(e) => setItemStartDate(e.target.value)}
                        />
                      </RxvField>
                      <RxvField label="Hora de início do item">
                        <RxvSelect
                          value={itemStartHour}
                          onChange={(e) => setItemStartHour(e.target.value)}
                          options={[{ value: '', label: 'Sem hora' }, ...START_HOUR_OPTIONS]}
                        />
                      </RxvField>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-slate-800 bg-black/30 px-3 py-2 text-xs text-slate-400">
                      {defaultStartDate || defaultStartHour
                        ? `Este item herdará ${defaultStartDate || 'sem data'}${defaultStartHour ? ` às ${defaultStartHour}` : ''}.`
                        : 'Nenhum início padrão definido. O item será impresso sem trecho de início.'}
                    </div>
                  )}
                </div>
              )}

              <RxvField label="Observações adicionais (uma por linha)">
                <RxvTextarea
                  placeholder="Ex: Dar com alimento&#10;Monitorar função renal"
                  value={cautions}
                  onChange={(e) => setCautions(e.target.value)}
                  rows={4}
                />
              </RxvField>
            </div>
          )}
        </div>
      </div>
    </RxvModalShell>
  )
}
