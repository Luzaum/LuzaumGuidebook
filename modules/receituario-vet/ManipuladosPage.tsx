import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReceituarioChrome from './ReceituarioChrome'
import {
  RxvButton,
  RxvCard,
  RxvChipsMultiSelect,
  RxvField,
  RxvInput,
  RxvPillToggle,
  RxvSectionHeader,
  RxvSelect,
  RxvTextarea,
  RxvToggle,
} from '../../src/components/receituario/RxvComponents'
import { useClinic } from '../../src/components/ClinicProvider'
import { supabase } from '../../src/lib/supabaseClient'
import {
  deleteCompoundedMedication,
  getCompoundedMedicationBundle,
  listCompoundedMedications,
  saveCompoundedMedicationBundle,
  summarizeCompoundedIngredient,
  type CompoundedIngredientRole,
  type CompoundedMedicationBundle,
  type CompoundedMedicationIngredientRecord,
  type CompoundedMedicationListItem,
  type CompoundedMedicationRecord,
  type CompoundedMedicationRegimenRecord,
} from '../../src/lib/compoundedRecords'
import {
  buildClinicalRuleSummary,
  DOSAGE_FORM_PRESETS,
  getClinicalFormulaMetadata,
  getClinicalRegimenSemantics,
  getDosageFamilyLabel,
  getFormulaTypeLabel,
  getUniversalFormulaType,
  inferAdministrationUnit,
  inferDosageFormFamily,
  normalizeClinicalPharmacyStrategy,
  parseClinicalTextImport,
  type ClinicalFormulaMetadata,
  type DosageFormFamily,
  type ClinicalPharmacyStrategy,
  type UniversalFormulaType,
} from './compoundedClinicalText'

const SPECIES_OPTIONS = ['Canina', 'Felina']
const PHARMACEUTICAL_FORM_OPTIONS = [
  'Suspensão oral',
  'Solução oral',
  'Xarope',
  'Emulsão oral',
  'Pasta oral',
  'Calda',
  'Molho',
  'Seringa dosadora',
  'Cápsula',
  'Cápsula gastrorresistente',
  'Comprimido',
  'Comprimido palatável',
  'Biscoito medicamentoso',
  'Sachê',
  'Filme oral',
  'Unidade mastigável',
  'Gel transdérmico',
  'Creme transdérmico',
  'Pump transdérmico',
  'Spray',
  'Mousse',
  'Espuma',
  'Pomada',
  'Creme',
  'Loção',
  'Gel tópico',
  'Solução tópica',
  'Unguento',
  'Pour-on',
  'Spot-on',
  'Shampoo',
  'Condicionador',
  'Banho seco',
  'Lenço',
  'Colírio',
  'Solução otológica',
  'Pó otológico',
  'Gel dental',
  'Creme dental',
  'Enxaguatório',
  'Solução irrigadora',
  'Espuma bucal',
  'Solução injetável',
]
const DOSAGE_FAMILY_OPTIONS: Array<{ value: DosageFormFamily; label: string }> = [
  { value: 'oral_liquid', label: 'Oral líquida / semilíquida' },
  { value: 'oral_unit', label: 'Oral unitizada' },
  { value: 'transdermal_measured', label: 'Transdérmica doseada' },
  { value: 'topical_free_application', label: 'Tópica de aplicação livre' },
  { value: 'otic_ophthalmic_local', label: 'Oto / oftálmica / bucal local' },
  { value: 'procedural_injectable', label: 'Procedimental / injetável' },
]
const UNIVERSAL_FORMULA_OPTIONS: Array<{ value: UniversalFormulaType; label: string }> = [
  { value: 'fixed_unit_formula', label: 'Concentração / unidade fixa' },
  { value: 'clinical_dose_oriented', label: 'Orientada por dose clínica' },
  { value: 'procedural_topical', label: 'Procedural / tópica livre' },
]
const PHARMACY_STRATEGY_OPTIONS: Array<{ value: ClinicalPharmacyStrategy; label: string }> = [
  { value: 'dose_base_per_1ml', label: 'Cada 1 mL corresponde a 1 dose' },
  { value: 'dose_base_per_custom_volume', label: 'Cada dose usa volume fixo editável' },
  { value: 'dose_base_per_unit', label: 'Cada unidade corresponde a 1 dose' },
  { value: 'dose_base_per_click', label: 'Cada click / pump corresponde a 1 dose' },
  { value: 'qsp_x_doses', label: 'Preparar q.s.p. X doses' },
  { value: 'adjustable_concentration', label: 'Concentração final ajustável na revisão' },
]
const ROUTE_OPTIONS = [
  { value: '', label: 'Selecionar via principal' },
  { value: 'VO', label: 'Via oral (VO)' },
  { value: 'SC', label: 'Subcutânea (SC)' },
  { value: 'IM', label: 'Intramuscular (IM)' },
  { value: 'IV', label: 'Intravenosa (IV)' },
  { value: 'Topica', label: 'Tópica' },
  { value: 'Oftalmica', label: 'Oftálmica' },
  { value: 'Otologica', label: 'Otológica' },
  { value: 'Intranasal', label: 'Intranasal' },
  { value: 'Transdermica', label: 'Transdérmica' },
]
const INGREDIENT_ROLE_OPTIONS: Array<{ value: CompoundedIngredientRole; label: string }> = [
  { value: 'active', label: 'Ativo' },
  { value: 'vehicle', label: 'Veículo' },
  { value: 'flavor', label: 'Sabor' },
  { value: 'excipient', label: 'Excipiente' },
  { value: 'other', label: 'Outro' },
]
const REGIMEN_SPECIES_OPTIONS = [
  { value: '', label: 'Selecionar espécie' },
  { value: 'Canina', label: 'Canina' },
  { value: 'Felina', label: 'Felina' },
]
const DURATION_MODE_OPTIONS = [
  { value: 'fixed_days', label: 'Duração fechada' },
  { value: 'continuous_until_recheck', label: 'Uso contínuo até reavaliação' },
]
const FREQUENCY_PRESET_OPTIONS = [
  { value: '', label: 'Selecionar frequência' },
  { value: 'q24h', label: 'SID • a cada 24 horas' },
  { value: 'q12h', label: 'BID • a cada 12 horas' },
  { value: 'q8h', label: 'TID • a cada 8 horas' },
  { value: 'q6h', label: 'QID • a cada 6 horas' },
]

type EditorIngredient = Partial<CompoundedMedicationIngredientRecord>
type EditorRegimen = Partial<CompoundedMedicationRegimenRecord>

type EditorState = {
  medication: Partial<CompoundedMedicationRecord> & { name: string; pharmaceutical_form: string }
  ingredients: EditorIngredient[]
  regimens: EditorRegimen[]
}

function createEmptyIngredient(): EditorIngredient {
  return {
    id: crypto.randomUUID(),
    ingredient_name: '',
    ingredient_role: 'active',
    free_text: '',
    notes: '',
  }
}

function createEmptyRegimen(): EditorRegimen {
  return {
    id: crypto.randomUUID(),
    regimen_name: '',
    indication: '',
    species: 'Canina',
    route: 'VO',
    dosing_mode: 'fixed_per_patient',
    fixed_administration_value: 1,
    fixed_administration_unit: 'mL',
    dose_min: 0.5,
    dose_unit: 'mg',
    per_weight_unit: 'kg',
    concentration_value: 2,
    concentration_unit: 'mg',
    concentration_per_value: 1,
    concentration_per_unit: 'mL',
    frequency_value_min: 12,
    frequency_unit: 'hours',
    frequency_label: 'a cada 12 horas',
    duration_mode: 'fixed_days',
    duration_value: 14,
    duration_unit: 'dias',
    inherit_default_start: true,
    allow_edit: true,
    notes: '',
    default_administration_sig: '',
    default_prepared_quantity_text: '',
  }
}

function createEmptyEditor(): EditorState {
  return {
    medication: {
      id: '',
      name: '',
      description: '',
      pharmaceutical_form: 'Suspensão oral',
      default_route: 'VO',
      species: ['Canina'],
      routes: ['VO'],
      is_controlled: false,
      control_type: 'venda_livre',
      is_active: true,
      default_quantity_text: '',
      default_qsp_text: '',
      default_flavor: '',
      default_vehicle: '',
      default_excipient: '',
      manipulation_instructions: '',
      notes: '',
      metadata: {
        continuous_use_default: false,
        control_document_target: 'standard',
        control_extra_rules: '',
        complement_text: '',
        source_type: 'structured',
        formula_model: 'fixed_concentration',
        formula_type: 'fixed_unit_formula',
        dosage_form_family: 'oral_liquid',
        dosage_form: 'Suspensão oral',
        administration_unit: 'mL',
      },
    },
    ingredients: [createEmptyIngredient()],
    regimens: [createEmptyRegimen()],
  }
}

function getClinicalMetadata(state: EditorState): ClinicalFormulaMetadata | null {
  return getClinicalFormulaMetadata(state.medication.metadata || null)
}

function getFormulaModel(state: EditorState): 'fixed_concentration' | 'clinical_dose_oriented' {
  return getClinicalMetadata(state)?.formula_model === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration'
}

function getUniversalType(state: EditorState): UniversalFormulaType {
  return getUniversalFormulaType(state.medication.metadata || null)
}

function getDosageFamily(state: EditorState): DosageFormFamily {
  const metadata = getClinicalMetadata(state)
  return metadata?.dosage_form_family || inferDosageFormFamily(state.medication.pharmaceutical_form)
}

function getAdministrationUnitLabel(state: EditorState): string {
  const metadata = getClinicalMetadata(state)
  return String(metadata?.administration_unit || inferAdministrationUnit(state.medication.pharmaceutical_form))
}

function getClinicalRegimenMeta(state: EditorState, regimenId?: string): ReturnType<typeof getClinicalRegimenSemantics> {
  return getClinicalRegimenSemantics(state.medication.metadata || null, regimenId)
}

function updateClinicalRegimenMeta(
  previousMetadata: Record<string, unknown> | null | undefined,
  regimenId: string,
  patch: Record<string, unknown>
): Record<string, unknown> {
  const current = getClinicalFormulaMetadata(previousMetadata || {}) || {
    source_type: 'clinical_text' as const,
    formula_model: 'clinical_dose_oriented' as const,
    parser_version: 1,
    regimen_semantics: {},
  }

  return {
    ...(previousMetadata || {}),
    ...current,
    source_type: 'clinical_text',
    formula_model: 'clinical_dose_oriented',
    regimen_semantics: {
      ...(current.regimen_semantics || {}),
      [regimenId]: {
        ...(current.regimen_semantics?.[regimenId] || {}),
        regimenId,
        ...patch,
      },
    },
  }
}

function normalizeText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function isCodexTestMedication(item: Pick<CompoundedMedicationListItem, 'name' | 'description'>): boolean {
  const haystack = normalizeText(`${item.name || ''} ${item.description || ''}`)
  return haystack.includes('codex remoto') || haystack.includes('validacao remota')
}

function boolFromMetadata(value: unknown): boolean {
  return value === true
}

function getMedicationMetadata(state: EditorState) {
  return (state.medication.metadata || {}) as Record<string, unknown>
}

function cloneEditorFromBundle(bundle: CompoundedMedicationBundle): EditorState {
  return {
    medication: {
      ...bundle.medication,
      metadata: {
        ...(bundle.medication.metadata || {}),
      },
    },
    ingredients: bundle.ingredients.length ? bundle.ingredients.map((item) => ({ ...item })) : [createEmptyIngredient()],
    regimens: bundle.regimens.length ? bundle.regimens.map((item) => ({ ...item })) : [createEmptyRegimen()],
  }
}

function buildFrequencyPreset(regimen: EditorRegimen): string {
  const hours = Number(regimen.frequency_value_min || 0)
  if (!regimen.frequency_unit || normalizeText(regimen.frequency_unit) !== 'hours') return ''
  if (hours === 24) return 'q24h'
  if (hours === 12) return 'q12h'
  if (hours === 8) return 'q8h'
  if (hours === 6) return 'q6h'
  return ''
}

function applyFrequencyPreset(regimen: EditorRegimen, preset: string): EditorRegimen {
  const next = { ...regimen }
  if (preset === 'q24h') return { ...next, frequency_value_min: 24, frequency_unit: 'hours', frequency_label: 'a cada 24 horas' }
  if (preset === 'q12h') return { ...next, frequency_value_min: 12, frequency_unit: 'hours', frequency_label: 'a cada 12 horas' }
  if (preset === 'q8h') return { ...next, frequency_value_min: 8, frequency_unit: 'hours', frequency_label: 'a cada 8 horas' }
  if (preset === 'q6h') return { ...next, frequency_value_min: 6, frequency_unit: 'hours', frequency_label: 'a cada 6 horas' }
  return next
}

function buildIngredientLine(ingredient: EditorIngredient): string {
  const free = String(ingredient.free_text || '').trim()
  if (free) return free
  return summarizeCompoundedIngredient(ingredient)
}

function buildFormulaSubtitle(state: EditorState) {
  const med = state.medication
  return [
    med.pharmaceutical_form,
    med.default_qsp_text || med.default_quantity_text || '',
    med.default_vehicle ? `Veículo ${med.default_vehicle}` : '',
    med.default_flavor ? `Sabor ${med.default_flavor}` : '',
  ]
    .filter(Boolean)
    .join(' • ')
}

function getFormsForFamily(family: DosageFormFamily): string[] {
  const fromPreset = DOSAGE_FORM_PRESETS.filter((entry) => entry.family === family).map((entry) => entry.value)
  const fromCatalog = PHARMACEUTICAL_FORM_OPTIONS.filter((entry) => inferDosageFormFamily(entry) === family)
  return Array.from(new Set([...fromPreset, ...fromCatalog]))
}

function buildClinicalImportSummary(metadata: ClinicalFormulaMetadata | null, controlled: boolean): string[] {
  if (!metadata) return []
  const rows = [
    `Família funcional: ${getDosageFamilyLabel(metadata.dosage_form_family) || 'Não identificada'}`,
    `Tipo da fórmula: ${getFormulaTypeLabel(getUniversalFormulaType(metadata))}`,
    metadata.dosage_form ? `Forma farmacêutica: ${metadata.dosage_form}` : '',
    metadata.administration_unit ? `Unidade de administração: ${metadata.administration_unit}` : '',
    controlled ? 'Fluxo documental: controle especial' : 'Fluxo documental: receita padrão',
  ]
  return rows.filter(Boolean)
}

function parseImportedEditor(raw: unknown): EditorState {
  const input = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}
  const bundleLike = input.medication || input.ingredients || input.regimens
  if (bundleLike) {
    const medication = ((input.medication as Record<string, unknown> | undefined) || {})
    const form = String(medication.pharmaceutical_form || 'Suspensão oral')
    const family = inferDosageFormFamily(form)
    const administrationUnit = inferAdministrationUnit(form, String(((medication.metadata as Record<string, unknown> | undefined)?.administration_unit) || ''))
    return {
      medication: {
        ...createEmptyEditor().medication,
        ...medication,
        metadata: {
          ...(createEmptyEditor().medication.metadata || {}),
          ...(((medication.metadata as Record<string, unknown> | undefined) || {})),
          formula_type: getUniversalFormulaType((medication.metadata as Record<string, unknown> | undefined) || {}),
          dosage_form_family: family,
          dosage_form: form,
          administration_unit: administrationUnit,
        },
      },
      ingredients: Array.isArray(input.ingredients) && input.ingredients.length ? (input.ingredients as EditorIngredient[]) : [createEmptyIngredient()],
      regimens: Array.isArray(input.regimens) && input.regimens.length ? (input.regimens as EditorRegimen[]) : [createEmptyRegimen()],
    }
  }

  const form = String(input.pharmaceutical_form || input.forma_farmaceutica || 'Suspensão oral')
  const family = inferDosageFormFamily(form)
  const administrationUnit = inferAdministrationUnit(form)
  const formulaType = getUniversalFormulaType({
    formula_model: input.formula_model,
    formula_type: input.formula_type,
  })

  return {
    medication: {
      ...createEmptyEditor().medication,
      name: String(input.name || ''),
      description: String(input.description || ''),
      pharmaceutical_form: form,
      default_route: String(input.default_route || input.via || 'VO'),
      species: Array.isArray(input.species) ? (input.species as string[]) : ['Canina'],
      routes: Array.isArray(input.routes) ? (input.routes as string[]) : [String(input.default_route || input.via || 'VO')],
      is_controlled: !!input.is_controlled,
      control_type: !!input.is_controlled ? 'controlado' : 'venda_livre',
      is_active: input.is_active !== false,
      default_quantity_text: String(input.default_quantity_text || input.quantidade || ''),
      default_qsp_text: String(input.default_qsp_text || input.qsp || ''),
      default_flavor: String(input.default_flavor || input.sabor || ''),
      default_vehicle: String(input.default_vehicle || input.veiculo || ''),
      default_excipient: String(input.default_excipient || input.excipiente || ''),
      manipulation_instructions: String(input.manipulation_instructions || input.texto_manipulacao || ''),
      notes: String(input.notes || input.observacoes || ''),
      metadata: {
        continuous_use_default: !!input.continuous_use_default,
        control_document_target: !!input.is_controlled ? 'controlled' : 'standard',
        control_extra_rules: String(input.control_extra_rules || ''),
        complement_text: String(input.complement_text || ''),
        formula_model: formulaType === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
        formula_type: formulaType,
        dosage_form_family: family,
        dosage_form: form,
        administration_unit: administrationUnit,
      },
    },
    ingredients: Array.isArray(input.ingredients) && input.ingredients.length ? (input.ingredients as EditorIngredient[]) : [createEmptyIngredient()],
    regimens: Array.isArray(input.regimens) && input.regimens.length ? (input.regimens as EditorRegimen[]) : [createEmptyRegimen()],
  }
}

export default function ManipuladosPage() {
  const { clinicId } = useClinic()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const cleanupRef = useRef(false)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<CompoundedMedicationListItem[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [editor, setEditor] = useState<EditorState>(createEmptyEditor)
  const [loadingList, setLoadingList] = useState(false)
  const [loadingBundle, setLoadingBundle] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [activeRegimenId, setActiveRegimenId] = useState('')
  const [loadedBundle, setLoadedBundle] = useState<CompoundedMedicationBundle | null>(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [showClinicalImport, setShowClinicalImport] = useState(false)
  const [clinicalImportText, setClinicalImportText] = useState('')

  const refreshList = useCallback(async (preferredId?: string, options?: { silent?: boolean }) => {
    if (!clinicId) return
    const silent = options?.silent === true && items.length > 0
    if (!silent) setLoadingList(true)
    try {
      let rows = await listCompoundedMedications(clinicId, {
        search,
      })
      if (!cleanupRef.current) {
        cleanupRef.current = true
        const testRows = rows.filter(isCodexTestMedication)
        if (testRows.length) {
          await Promise.allSettled(
            testRows.map((entry) => deleteCompoundedMedication(clinicId, entry.id, { hardDelete: true }))
          )
          rows = await listCompoundedMedications(clinicId, {
            search,
          })
        }
      }
      setItems(rows)
      const nextSelectedId = preferredId && rows.some((entry) => entry.id === preferredId)
        ? preferredId
        : isCreatingNew && !selectedId
          ? ''
          : rows.some((entry) => entry.id === selectedId)
            ? selectedId
            : rows[0]?.id || ''
      setSelectedId(nextSelectedId)
    } finally {
      if (!silent) setLoadingList(false)
    }
  }, [clinicId, isCreatingNew, items.length, search, selectedId])

  useEffect(() => {
    void refreshList()
  }, [refreshList])

  useEffect(() => {
    if (!clinicId || !selectedId) {
      setLoadingBundle(false)
      setLoadedBundle(null)
      return
    }
    let cancelled = false
    setLoadingBundle(true)
    getCompoundedMedicationBundle(clinicId, selectedId)
      .then((bundle) => {
        if (cancelled) return
        setLoadedBundle(bundle)
        if (bundle) {
          setIsCreatingNew(false)
          const nextEditor = cloneEditorFromBundle(bundle)
          setEditor(nextEditor)
          setActiveRegimenId(nextEditor.regimens[0]?.id ? String(nextEditor.regimens[0]?.id) : '')
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingBundle(false)
      })
    return () => {
      cancelled = true
    }
  }, [clinicId, selectedId])

  const activeRegimen = useMemo(
    () => editor.regimens.find((entry) => String(entry.id) === activeRegimenId) || editor.regimens[0] || null,
    [activeRegimenId, editor.regimens]
  )

  const activeIngredients = useMemo(
    () => editor.ingredients.filter((item) => normalizeText(String(item.ingredient_role || '')) === 'active' && String(item.ingredient_name || '').trim()),
    [editor.ingredients]
  )
  const formulaModel = useMemo(() => getFormulaModel(editor), [editor])
  const universalFormulaType = useMemo(() => getUniversalType(editor), [editor])
  const dosageFamily = useMemo(() => getDosageFamily(editor), [editor])
  const administrationUnit = useMemo(() => getAdministrationUnitLabel(editor), [editor])
  const familyFormOptions = useMemo(() => getFormsForFamily(dosageFamily), [dosageFamily])
  const activeClinicalRegimen = useMemo(
    () => getClinicalRegimenMeta(editor, String(activeRegimen?.id || '')),
    [activeRegimen, editor]
  )
  const importSummary = useMemo(
    () => buildClinicalImportSummary(getClinicalMetadata(editor), !!editor.medication.is_controlled),
    [editor]
  )

  const handleNew = useCallback(() => {
    setIsCreatingNew(true)
    setSelectedId('')
    setLoadedBundle(null)
    setShowClinicalImport(false)
    setClinicalImportText('')
    const next = createEmptyEditor()
    setEditor(next)
    setActiveRegimenId(String(next.regimens[0].id))
    setStatus('Novo manipulado pronto para cadastro.')
  }, [])

  const updateMedication = useCallback((patch: Partial<EditorState['medication']>) => {
    setEditor((prev) => ({
      ...prev,
      medication: {
        ...prev.medication,
        ...patch,
      },
    }))
  }, [])

  const updateMedicationMetadata = useCallback((patch: Record<string, unknown>) => {
    setEditor((prev) => ({
      ...prev,
      medication: {
        ...prev.medication,
        metadata: {
          ...(prev.medication.metadata || {}),
          ...patch,
        },
      },
    }))
  }, [])

  const applyFamilyAndForm = useCallback((family: DosageFormFamily, form: string, type?: UniversalFormulaType) => {
    const nextAdministrationUnit = inferAdministrationUnit(form)
    const nextType = type || universalFormulaType
    updateMedication({ pharmaceutical_form: form })
    updateMedicationMetadata({
      dosage_form_family: family,
      dosage_form: form,
      administration_unit: nextAdministrationUnit,
      formula_type: nextType,
      formula_model: nextType === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
    })
  }, [universalFormulaType, updateMedication, updateMedicationMetadata])

  const updateIngredient = useCallback((ingredientId: string, patch: Partial<EditorIngredient>) => {
    setEditor((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item) => String(item.id) === ingredientId ? { ...item, ...patch } : item),
    }))
  }, [])

  const updateRegimen = useCallback((regimenId: string, patch: Partial<EditorRegimen>) => {
    setEditor((prev) => ({
      ...prev,
      regimens: prev.regimens.map((item) => String(item.id) === regimenId ? { ...item, ...patch } : item),
    }))
  }, [])

  const handleImportJson = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      const imported = parseImportedEditor(parsed)
      setIsCreatingNew(true)
      setSelectedId('')
      setLoadedBundle(null)
      setEditor(imported)
      setActiveRegimenId(String(imported.regimens[0]?.id || ''))
      setShowClinicalImport(false)
      setStatus(`JSON importado: ${imported.medication.name || 'fórmula sem nome'}.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Não foi possível importar o JSON.')
    } finally {
      event.target.value = ''
    }
  }, [])

  const handleImportClinicalText = useCallback(() => {
    if (!clinicalImportText.trim()) {
      setStatus('Cole o texto clínico antes de importar.')
      return
    }
    try {
      const parsed = parseClinicalTextImport(clinicalImportText)
      const imported = {
        medication: {
          ...createEmptyEditor().medication,
          ...parsed.medication,
          metadata: {
            ...(parsed.medication.metadata || {}),
            source_type: 'clinical_text',
            formula_model: 'clinical_dose_oriented',
          },
        },
        ingredients: parsed.ingredients.length ? parsed.ingredients : [createEmptyIngredient()],
        regimens: parsed.regimens.length ? parsed.regimens : [createEmptyRegimen()],
      } satisfies EditorState
      setIsCreatingNew(true)
      setSelectedId('')
      setLoadedBundle(null)
      setEditor(imported)
      setActiveRegimenId(String(imported.regimens[0]?.id || ''))
      setStatus(
        parsed.warnings.length
          ? `Texto clínico importado com revisão pendente: ${parsed.warnings.join(' ')}`
          : `Texto clínico importado: ${imported.medication.name || 'fórmula sem nome'}. Revise os regimes antes de salvar.`
      )
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Não foi possível interpretar o texto clínico.')
    }
  }, [clinicalImportText])

  const handleSave = useCallback(async () => {
    if (!clinicId) {
      setStatus('Nenhuma clínica ativa.')
      return
    }
    if (loadingBundle) {
      setStatus('Aguarde a fórmula terminar de carregar antes de salvar.')
      return
    }
    if (!editor.medication.name.trim()) {
      setStatus('Informe o nome da fórmula antes de salvar.')
      return
    }
    if (!editor.medication.pharmaceutical_form.trim()) {
      setStatus('Informe a forma farmacêutica.')
      return
    }

    setSaving(true)
    setStatus('')
    try {
      const { data } = await supabase.auth.getUser()
      const userId = data.user?.id || 'unknown-user'
      const fallbackSpecies = Array.isArray(editor.medication.species) && editor.medication.species.length === 1
        ? String(editor.medication.species[0] || '').trim()
        : ''
      const normalizedRegimens = editor.regimens.map((entry) => ({
        ...entry,
        species: String(entry.species || '').trim() || fallbackSpecies,
        route: String(entry.route || '').trim() || String(editor.medication.default_route || '').trim() || 'VO',
      }))
      if (!normalizedRegimens.some((entry) => String(entry.species || '').trim())) {
        setStatus('Defina a espécie de pelo menos um regime antes de salvar.')
        return
      }
      const payload = {
        ...editor.medication,
        control_type: editor.medication.is_controlled ? 'controlado' : 'venda_livre',
        routes: Array.from(new Set([editor.medication.default_route, ...(editor.medication.routes || [])].filter(Boolean) as string[])),
      }
      const bundle = await saveCompoundedMedicationBundle({
        clinicId,
        userId,
        medication: payload,
        ingredients: editor.ingredients,
        regimens: normalizedRegimens,
        allowLocalFallback: false,
      })
      setIsCreatingNew(false)
      setLoadedBundle(bundle)
      setEditor(cloneEditorFromBundle(bundle))
      setActiveRegimenId(String(bundle.regimens[0]?.id || ''))
      setItems((prev) => {
        const nextItem: CompoundedMedicationListItem = {
          id: String(bundle.medication.id),
          name: String(bundle.medication.name || ''),
          description: String(bundle.medication.description || ''),
          pharmaceutical_form: String(bundle.medication.pharmaceutical_form || ''),
          default_route: String(bundle.medication.default_route || ''),
          default_quantity_text: String(bundle.medication.default_quantity_text || ''),
          default_qsp_text: String(bundle.medication.default_qsp_text || ''),
          default_flavor: String(bundle.medication.default_flavor || ''),
          default_vehicle: String(bundle.medication.default_vehicle || ''),
          is_controlled: !!bundle.medication.is_controlled,
          is_active: bundle.medication.is_active !== false,
          updated_at: String(bundle.medication.updated_at || new Date().toISOString()),
          metadata: bundle.medication.metadata || null,
        }
        const withoutCurrent = prev.filter((entry) => entry.id !== nextItem.id)
        return [nextItem, ...withoutCurrent]
      })
      setSelectedId(String(bundle.medication.id))
      const persistenceSource = String((bundle.medication.metadata || {}).persistence_source || 'supabase')
      setStatus(
        persistenceSource === 'local_fallback'
          ? 'Falha ao persistir no catálogo remoto. Revise a conexão e tente salvar novamente.'
          : 'Manipulado salvo no catálogo.'
      )
      await refreshList(String(bundle.medication.id), { silent: true })
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Falha ao salvar manipulado.')
    } finally {
      setSaving(false)
    }
  }, [clinicId, editor, loadingBundle, refreshList])

  const handleDelete = useCallback(async () => {
    if (!clinicId || !selectedId) return
    const confirmed = window.confirm('Deseja excluir este manipulado do catálogo? Esta ação remove a fórmula da clínica.')
    if (!confirmed) return
    await deleteCompoundedMedication(clinicId, selectedId, { hardDelete: true })
    setSelectedId('')
    setLoadedBundle(null)
    setItems((prev) => prev.filter((entry) => entry.id !== selectedId))
    const next = createEmptyEditor()
    setEditor(next)
    setActiveRegimenId(String(next.regimens[0].id))
    setIsCreatingNew(true)
    setStatus('Manipulado excluído do catálogo.')
    await refreshList(undefined, { silent: true })
  }, [clinicId, refreshList, selectedId])

  const sidebarCards = useMemo(() => items.map((item) => {
    const active = item.id === selectedId
    const metadata = getClinicalFormulaMetadata(item.metadata || null)
    const itemFamily = metadata?.dosage_form_family || inferDosageFormFamily(item.pharmaceutical_form)
    const itemType = getUniversalFormulaType(item.metadata || null)
    const subtitle = [
      item.pharmaceutical_form,
      item.default_qsp_text || item.default_quantity_text || '',
    ].filter(Boolean).join(' • ')
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          setIsCreatingNew(false)
          setSelectedId(item.id)
        }}
        className={`w-full rounded-[22px] border px-4 py-3.5 text-left transition ${
          active
            ? 'border-[#39ff14]/45 bg-[linear-gradient(180deg,rgba(20,60,24,0.95),rgba(13,38,16,0.95))] shadow-[0_0_22px_rgba(57,255,20,0.10)]'
            : 'border-slate-800/90 bg-[linear-gradient(180deg,rgba(8,11,8,0.92),rgba(7,8,7,0.78))] hover:border-[#39ff14]/25'
        }`}
        data-testid={`manipulado-list-item-${item.id}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="line-clamp-3 text-[12px] font-black uppercase italic leading-5 text-white">{item.name}</p>
            <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">{subtitle || 'Sem resumo farmacotécnico'}</p>
            <p className="mt-1 line-clamp-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {getDosageFamilyLabel(itemFamily)} • {getFormulaTypeLabel(itemType)}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-1">
            <span className="rounded-full border border-[#39ff14]/25 bg-[#39ff14]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#93f784]">
              Manipulado
            </span>
            {item.is_controlled ? (
              <span className="rounded-full border border-red-500/25 bg-red-500/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-red-300">
                Controlado
              </span>
            ) : null}
          </div>
        </div>
      </button>
    )
  }), [items, selectedId])

  return (
    <ReceituarioChrome
      section="manipulados"
      title="Manipulados"
      subtitle="Catálogo magistral da clínica, integrado com Nova Receita, controle especial e protocolos."
      actions={
        <>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportJson} />
          <RxvButton variant="secondary" onClick={() => fileInputRef.current?.click()}>
            <span className="material-symbols-outlined text-[18px]">file_open</span>
            Importar JSON
          </RxvButton>
          <RxvButton variant="secondary" onClick={() => setShowClinicalImport((prev) => !prev)}>
            <span className="material-symbols-outlined text-[18px]">notes</span>
            Importar texto clínico
          </RxvButton>
          <RxvButton variant="secondary" onClick={handleNew} data-testid="manipulados-new-button">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Novo manipulado
          </RxvButton>
          {selectedId ? (
            <RxvButton variant="danger" onClick={handleDelete}>
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Excluir manipulado
            </RxvButton>
          ) : null}
          <RxvButton variant="primary" onClick={handleSave} loading={saving} disabled={saving || loadingBundle} data-testid="manipulados-save-button">
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar catálogo
          </RxvButton>
        </>
      }
    >
      <div className="space-y-5">
        {showClinicalImport ? (
          <RxvCard className="p-5">
            <RxvSectionHeader icon="notes" title="Importar de Texto Clínico" subtitle="Cole o texto semiestruturado, gere a fórmula revisável e só então salve no catálogo" />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.2fr)_360px]">
              <div className="space-y-4">
                <RxvField label="Texto clínico semiestruturado">
                  <RxvTextarea
                    value={clinicalImportText}
                    onChange={(event) => setClinicalImportText(event.target.value)}
                    className="min-h-[260px]"
                    placeholder="Cole aqui blocos como: cenário clínico, ingredientes com mg/kg/dose, q.s.p., modo de uso e observações de controlado."
                  />
                </RxvField>
                <div className="flex flex-wrap gap-3">
                  <RxvButton variant="primary" onClick={handleImportClinicalText}>
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                    Interpretar texto
                  </RxvButton>
                  <RxvButton variant="secondary" onClick={() => setShowClinicalImport(false)}>
                    Fechar importação
                  </RxvButton>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/90 bg-black/25 p-4 text-sm text-slate-300">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Como o parser lê este texto</p>
                <div className="mt-3 space-y-2">
                  <p>Cenários viram regimes clínicos separados.</p>
                  <p>Linhas como <span className="font-semibold text-white">15 mg/kg/dose/VO</span> viram regras posológicas, não concentração fixa.</p>
                  <p>Q.S.P., forma farmacêutica e modo de uso entram como base farmacotécnica do regime.</p>
                  <p>Faixas de dose ficam preservadas para seleção explícita depois na receita.</p>
                  <p>Se houver ingrediente ou observação controlada, a fórmula entra no fluxo especial.</p>
                </div>
                {importSummary.length ? (
                  <div className="mt-4 rounded-2xl border border-slate-800/90 bg-[#071007] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8ef986]">Prévia estruturada atual</p>
                    <div className="mt-3 space-y-2 text-xs text-slate-300">
                      {importSummary.map((row) => <p key={row}>{row}</p>)}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </RxvCard>
        ) : null}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
        <RxvCard className="p-4 xl:sticky xl:top-5 xl:h-[calc(100vh-180px)] xl:overflow-hidden">
          <RxvSectionHeader icon="science" title="Catálogo Magistral" subtitle="Fórmulas ativas da clínica" bgClass="bg-[#39ff14]/12" colorClass="text-[#8ef986]" shadowClass="shadow-[0_0_24px_rgba(57,255,20,0.14)]" />
          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-800/90 bg-[linear-gradient(135deg,rgba(18,45,18,0.85),rgba(8,10,8,0.92))] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8ef986]">Lista da clínica</p>
              <p className="mt-2 text-sm font-semibold text-white">Busque, revise e organize suas fórmulas magistrais com leitura clínica mais limpa.</p>
              <p className="mt-3 text-xs text-slate-400">{items.length} fórmula(s) disponível(is)</p>
            </div>

            <RxvField label="Buscar fórmula">
              <RxvInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nome, descrição, forma, veículo ou sabor" />
            </RxvField>
            {status ? <div className="rounded-2xl border border-slate-800/90 bg-black/30 px-3 py-3 text-xs text-slate-200">{status}</div> : null}

            <div className="space-y-2 overflow-y-auto pr-2 xl:max-h-[calc(100vh-355px)] [scrollbar-color:#39ff14_#071007] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#39ff14]/35 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#071007] [&::-webkit-scrollbar]:w-2.5">
              {loadingList ? (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">Carregando catálogo...</div>
              ) : sidebarCards.length ? sidebarCards : (
                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">Nenhuma fórmula encontrada com os filtros atuais.</div>
              )}
            </div>
          </div>
        </RxvCard>

        <div className="space-y-5">
          <RxvCard className="overflow-hidden p-0">
            <div className="border-b border-slate-800/90 bg-[linear-gradient(120deg,rgba(57,255,20,0.12),rgba(7,11,7,0.88)_45%,rgba(7,11,7,1)_100%)] px-5 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#39ff14]/30 bg-[#39ff14]/10 text-[#8ef986] shadow-[0_0_18px_rgba(57,255,20,0.12)]">
                      <span className="material-symbols-outlined text-[22px]">biotech</span>
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#8ef986]">Editor clínico</p>
                      <h2 className="text-2xl font-black italic tracking-tight text-white">{editor.medication.name || 'Nova fórmula magistral'}</h2>
                    </div>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm text-slate-300">
                    {buildFormulaSubtitle(editor) || 'Defina identidade, composição, regimes clínicos e o destino documental da fórmula.'}
                  </p>
                </div>

                <div className="grid min-w-[240px] gap-2 text-sm">
                  <div className="rounded-2xl border border-slate-800/90 bg-black/30 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Documento</p>
                    <p className="mt-1 font-semibold text-white">{editor.medication.is_controlled ? 'Controle especial' : 'Receita padrão'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800/90 bg-black/30 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Ativos principais</p>
                    <p className="mt-1 font-semibold text-white">{activeIngredients.slice(0, 3).map((item) => item.ingredient_name).join(' • ') || 'Sem ativos destacados'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <RxvCard className="p-5">
                <RxvSectionHeader icon="badge" title="Identidade da Fórmula" subtitle="Nome, família funcional, forma farmacêutica e flags clínicas" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <RxvField label="Nome da fórmula">
                    <RxvInput value={editor.medication.name} onChange={(event) => updateMedication({ name: event.target.value })} placeholder="Ex: Gabapentina magistral para dor neuropática" />
                  </RxvField>
                  <RxvField label="Família funcional">
                    <RxvSelect
                      value={dosageFamily}
                      onChange={(event) => {
                        const nextFamily = event.target.value as DosageFormFamily
                        const nextForm = getFormsForFamily(nextFamily)[0] || editor.medication.pharmaceutical_form || 'Suspensão oral'
                        applyFamilyAndForm(nextFamily, nextForm)
                      }}
                      options={DOSAGE_FAMILY_OPTIONS}
                    />
                  </RxvField>
                  <RxvField label="Forma farmacêutica">
                    <RxvSelect
                      value={editor.medication.pharmaceutical_form}
                      onChange={(event) => applyFamilyAndForm(inferDosageFormFamily(event.target.value), event.target.value)}
                      options={familyFormOptions}
                    />
                  </RxvField>
                  <RxvField label="Tipo da fórmula">
                    <RxvSelect
                      value={universalFormulaType}
                      onChange={(event) => {
                        const nextType = event.target.value as UniversalFormulaType
                        updateMedicationMetadata({
                          formula_type: nextType,
                          formula_model: nextType === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
                        })
                      }}
                      options={UNIVERSAL_FORMULA_OPTIONS}
                    />
                  </RxvField>
                  <RxvField label="Unidade principal de administração">
                    <RxvInput
                      value={administrationUnit}
                      onChange={(event) => updateMedicationMetadata({ administration_unit: event.target.value })}
                      placeholder="mL, cápsula, biscoito, click, gota..."
                    />
                  </RxvField>
                  <RxvField label="Descrição breve" className="lg:col-span-2">
                    <RxvTextarea value={String(editor.medication.description || '')} onChange={(event) => updateMedication({ description: event.target.value })} placeholder="Quando usar esta fórmula e o racional clínico principal." className="min-h-[92px]" />
                  </RxvField>
                  <div className="lg:col-span-2">
                    <RxvChipsMultiSelect label="Espécies-alvo" options={SPECIES_OPTIONS} selected={editor.medication.species || []} onToggle={(option) => {
                      const current = editor.medication.species || []
                      const next = current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
                      updateMedication({ species: next })
                    }} />
                  </div>
                  <RxvField label="Via principal sugerida">
                    <RxvSelect value={String(editor.medication.default_route || '')} onChange={(event) => updateMedication({ default_route: event.target.value })} options={ROUTE_OPTIONS} />
                  </RxvField>
                  <div className="rounded-2xl border border-slate-800/90 bg-[#071007] px-4 py-3 text-sm text-slate-300">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Leitura universal</p>
                    <p className="mt-2 font-semibold text-white">{getDosageFamilyLabel(dosageFamily)}</p>
                    <p className="mt-1">{getFormulaTypeLabel(universalFormulaType)}</p>
                    <p className="mt-1 text-slate-400">Administração principal: {administrationUnit || 'não definida'}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Modo de cálculo</p>
                      <div className="mt-3">
                        <RxvPillToggle
                          value={universalFormulaType !== 'fixed_unit_formula'}
                          labels={['Dose clínica / procedural', 'Concentração fixa']}
                          onToggle={() => {
                            const nextType = universalFormulaType === 'fixed_unit_formula'
                              ? (dosageFamily === 'topical_free_application' || dosageFamily === 'otic_ophthalmic_local' ? 'procedural_topical' : 'clinical_dose_oriented')
                              : 'fixed_unit_formula'
                            updateMedicationMetadata({
                              source_type: nextType === 'fixed_unit_formula' ? 'structured' : 'clinical_text',
                              formula_model: nextType === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
                              formula_type: nextType,
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Classificação</p>
                      <div className="mt-3">
                        <RxvPillToggle value={!!editor.medication.is_controlled} labels={['Controlado', 'Venda livre']} onToggle={() => {
                          const next = !editor.medication.is_controlled
                          updateMedication({ is_controlled: next, control_type: next ? 'controlado' : 'venda_livre' })
                          updateMedicationMetadata({ control_document_target: next ? 'controlled' : 'standard' })
                        }} colorClass="text-red-300" />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status no catálogo</p>
                      <div className="mt-3">
                        <RxvPillToggle value={editor.medication.is_active !== false} labels={['Ativa', 'Inativa']} onToggle={() => updateMedication({ is_active: !(editor.medication.is_active !== false) })} />
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Perfil de uso</p>
                      <div className="mt-3">
                        <RxvPillToggle value={boolFromMetadata(getMedicationMetadata(editor).continuous_use_default)} labels={['Uso contínuo', 'Uso não contínuo']} onToggle={() => updateMedicationMetadata({ continuous_use_default: !boolFromMetadata(getMedicationMetadata(editor).continuous_use_default) })} />
                      </div>
                    </div>
                  </div>
                </div>
              </RxvCard>

              <RxvCard className="p-5">
                <RxvSectionHeader icon="medication" title="Composição" subtitle="Ingredientes, q.s.p., veículo e sabor" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="space-y-3">
                    {editor.ingredients.map((ingredient, index) => (
                      <div key={String(ingredient.id)} className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.4fr)_170px_minmax(0,1fr)_auto]">
                          <RxvField label={`Ingrediente ${index + 1}`}>
                            <RxvInput value={String(ingredient.ingredient_name || '')} onChange={(event) => updateIngredient(String(ingredient.id), { ingredient_name: event.target.value })} placeholder="Gabapentina, veículo, aroma, excipiente..." />
                          </RxvField>
                          <RxvField label="Tipo">
                            <RxvSelect value={String(ingredient.ingredient_role || 'active')} onChange={(event) => updateIngredient(String(ingredient.id), { ingredient_role: event.target.value as CompoundedIngredientRole })} options={INGREDIENT_ROLE_OPTIONS} />
                          </RxvField>
                          <RxvField label="Concentração ou quantidade">
                            <RxvInput value={String(ingredient.free_text || '')} onChange={(event) => updateIngredient(String(ingredient.id), { free_text: event.target.value })} placeholder="Ex: 50 mg/mL ou 120 mg" />
                          </RxvField>
                          <div className="flex items-end">
                            <button type="button" className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-slate-700 bg-black/30 text-slate-400 transition hover:border-red-500/40 hover:text-red-300" onClick={() => setEditor((prev) => ({ ...prev, ingredients: prev.ingredients.length === 1 ? [createEmptyIngredient()] : prev.ingredients.filter((item) => String(item.id) !== String(ingredient.id)) }))} title="Remover ingrediente">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <RxvField label="Observação opcional">
                            <RxvInput value={String(ingredient.notes || '')} onChange={(event) => updateIngredient(String(ingredient.id), { notes: event.target.value })} placeholder="Ex: evitar sacarose, sabor palatável, protegido de luz." />
                          </RxvField>
                        </div>
                      </div>
                    ))}

                    <RxvButton variant="secondary" onClick={() => setEditor((prev) => ({ ...prev, ingredients: [...prev.ingredients, createEmptyIngredient()] }))}>
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Adicionar ingrediente
                    </RxvButton>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Parâmetros da preparação</p>
                      <div className="space-y-3">
                        <RxvField label="Quantidade total">
                          <RxvInput value={String(editor.medication.default_quantity_text || '')} onChange={(event) => updateMedication({ default_quantity_text: event.target.value })} placeholder="Ex: 30 cápsulas" />
                        </RxvField>
                        <RxvField label="Q.S.P.">
                          <RxvInput value={String(editor.medication.default_qsp_text || '')} onChange={(event) => updateMedication({ default_qsp_text: event.target.value })} placeholder="Ex: q.s.p. 30 mL" />
                        </RxvField>
                        <RxvField label="Veículo base">
                          <RxvInput value={String(editor.medication.default_vehicle || '')} onChange={(event) => updateMedication({ default_vehicle: event.target.value })} placeholder="Ex: suspensão oral palatável" />
                        </RxvField>
                        <RxvField label="Sabor">
                          <RxvInput value={String(editor.medication.default_flavor || '')} onChange={(event) => updateMedication({ default_flavor: event.target.value })} placeholder="Ex: carne, frango, bacon" />
                        </RxvField>
                        <RxvField label="Excipiente base">
                          <RxvInput value={String(editor.medication.default_excipient || '')} onChange={(event) => updateMedication({ default_excipient: event.target.value })} placeholder="Opcional" />
                        </RxvField>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Resumo rápido</p>
                      <div className="mt-3 space-y-2 text-sm text-slate-300">
                        <p>{buildFormulaSubtitle(editor) || 'Sem resumo farmacotécnico ainda'}</p>
                        <p>{editor.ingredients.filter((item) => item.ingredient_name).slice(0, 3).map((item) => buildIngredientLine(item)).join(' • ') || 'Nenhum ingrediente informado'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </RxvCard>

              <RxvCard className="p-5">
                <RxvSectionHeader icon="clinical_notes" title="Regimes de Uso" subtitle="Escolha claramente entre dose fixa do regime ou cálculo automático pelo peso" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
                  <div className="space-y-2">
                    {editor.regimens.map((regimen, index) => {
                      const active = String(regimen.id) === String(activeRegimenId || editor.regimens[0]?.id || '')
                      return (
                        <button key={String(regimen.id)} type="button" onClick={() => setActiveRegimenId(String(regimen.id))} className={`w-full rounded-2xl border px-4 py-3 text-left transition ${active ? 'border-[#39ff14]/40 bg-[#133018]' : 'border-slate-800/90 bg-black/25 hover:border-[#39ff14]/20'}`}>
                          <p className="text-sm font-black uppercase italic text-white">{regimen.regimen_name || `Regime ${index + 1}`}</p>
                          <p className="mt-1 text-[11px] text-slate-400">{regimen.dosing_mode === 'calculated' ? 'Calculado pelo peso do paciente' : 'Dose fixa do regime'}</p>
                        </button>
                      )
                    })}
                    <RxvButton variant="secondary" onClick={() => {
                      const next = createEmptyRegimen()
                      setEditor((prev) => ({ ...prev, regimens: [...prev.regimens, next] }))
                      setActiveRegimenId(String(next.id))
                    }}>
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Novo regime
                    </RxvButton>
                  </div>

                  {!activeRegimen ? (
                    <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-10 text-sm text-slate-500">Selecione um regime para editar.</div>
                  ) : (
                    <div className="space-y-4 rounded-3xl border border-slate-800/90 bg-black/20 p-4">
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <RxvField label="Nome do regime">
                          <RxvInput value={String(activeRegimen.regimen_name || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { regimen_name: event.target.value })} placeholder="Ex: Dose inicial dor neuropática" />
                        </RxvField>
                        <RxvField label="Espécie">
                          <RxvSelect value={String(activeRegimen.species || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { species: event.target.value })} options={REGIMEN_SPECIES_OPTIONS} />
                        </RxvField>
                        <RxvField label="Indicação clínica" className="lg:col-span-2">
                          <RxvInput value={String(activeRegimen.indication || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { indication: event.target.value })} placeholder="Ex: dor neuropática, prurido, cistite recorrente..." />
                        </RxvField>
                        <RxvField label="Via">
                          <RxvSelect value={String(activeRegimen.route || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { route: event.target.value })} options={ROUTE_OPTIONS} />
                        </RxvField>
                        <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Modo de cálculo</p>
                          <div className="mt-3 grid gap-2">
                            <button type="button" onClick={() => updateRegimen(String(activeRegimen.id), { dosing_mode: 'fixed_per_patient' })} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${activeRegimen.dosing_mode === 'fixed_per_patient' ? 'border-[#39ff14]/40 bg-[#133018] text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>
                              <span className="block font-black uppercase tracking-[0.14em]">Dose fixa por animal/regime</span>
                              <span className="mt-1 block text-xs text-slate-400">O item entra pronto, sem recalcular pelo peso.</span>
                            </button>
                            <button type="button" onClick={() => updateRegimen(String(activeRegimen.id), { dosing_mode: 'calculated' })} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${activeRegimen.dosing_mode === 'calculated' ? 'border-[#39ff14]/40 bg-[#133018] text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>
                              <span className="block font-black uppercase tracking-[0.14em]">Dose calculada pelo peso</span>
                              <span className="mt-1 block text-xs text-slate-400">O sistema calcula a dose final conforme peso e concentração.</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {formulaModel === 'clinical_dose_oriented' ? (
                        <div className="space-y-4 rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                            <RxvField label="Forma farmacotécnica do regime">
                              <RxvInput
                                value={String(activeClinicalRegimen?.pharmaceuticalForm || editor.medication.pharmaceutical_form || '')}
                                onChange={(event) => updateMedicationMetadata(updateClinicalRegimenMeta(editor.medication.metadata as Record<string, unknown>, String(activeRegimen.id), {
                                  pharmaceuticalForm: event.target.value,
                                  dosageFormFamily: inferDosageFormFamily(event.target.value),
                                }))}
                                placeholder="Ex: Suspensão oral, biscoito, gel transdérmico"
                              />
                            </RxvField>
                            <RxvField label="Quantidade total a manipular">
                              <RxvInput
                                value={String(activeClinicalRegimen?.totalQuantityText || activeRegimen.default_prepared_quantity_text || editor.medication.default_quantity_text || '')}
                                onChange={(event) => {
                                  updateRegimen(String(activeRegimen.id), { default_prepared_quantity_text: event.target.value })
                                  updateMedicationMetadata(updateClinicalRegimenMeta(editor.medication.metadata as Record<string, unknown>, String(activeRegimen.id), { totalQuantityText: event.target.value }))
                                }}
                                placeholder="Ex: 100 mL ou 30 biscoitos"
                              />
                            </RxvField>
                            <RxvField label="Unidade de administração">
                              <RxvInput
                                value={String(activeClinicalRegimen?.administrationUnitLabel || 'dose')}
                                onChange={(event) => updateMedicationMetadata(updateClinicalRegimenMeta(editor.medication.metadata as Record<string, unknown>, String(activeRegimen.id), { administrationUnitLabel: event.target.value }))}
                                placeholder="dose, biscoito, cápsula"
                              />
                            </RxvField>
                            <RxvField label="Estratégia farmacotécnica">
                              <RxvSelect
                                value={normalizeClinicalPharmacyStrategy(String(activeClinicalRegimen?.pharmacyStrategy || 'qsp_x_doses'))}
                                onChange={(event) => updateMedicationMetadata(updateClinicalRegimenMeta(editor.medication.metadata as Record<string, unknown>, String(activeRegimen.id), { pharmacyStrategy: event.target.value as ClinicalPharmacyStrategy }))}
                                options={PHARMACY_STRATEGY_OPTIONS}
                              />
                            </RxvField>
                          </div>

                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            <RxvField label="Estratégia para faixas de dose">
                              <RxvSelect
                                value={String(activeClinicalRegimen?.doseSelectionStrategy || 'min')}
                                onChange={(event) => updateMedicationMetadata(updateClinicalRegimenMeta(editor.medication.metadata as Record<string, unknown>, String(activeRegimen.id), { doseSelectionStrategy: event.target.value }))}
                                options={[
                                  { value: 'min', label: 'Usar dose mínima por padrão' },
                                  { value: 'mid', label: 'Usar ponto médio da faixa' },
                                  { value: 'max', label: 'Usar dose máxima por padrão' },
                                ]}
                              />
                            </RxvField>
                            <div className="rounded-2xl border border-slate-800/90 bg-[#081208] px-4 py-3 text-sm text-slate-300">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Família do regime</p>
                              <p className="mt-2 font-semibold text-white">{getDosageFamilyLabel(activeClinicalRegimen?.dosageFormFamily || dosageFamily)}</p>
                              <p className="mt-1 text-slate-400">{getFormulaTypeLabel(activeClinicalRegimen?.formulaType || universalFormulaType)}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-800/90 bg-[#081208] px-4 py-3 text-sm text-slate-300">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Leitura do regime importado</p>
                              <p className="mt-2">
                                {activeClinicalRegimen?.scenarioTitle || activeRegimen.regimen_name || 'Sem título clínico'}
                              </p>
                              <p className="mt-1 text-slate-400">
                                {activeClinicalRegimen?.reductionNote || 'As faixas de dose ficam preservadas para revisão do veterinário na receita.'}
                              </p>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-slate-800/90 bg-[#081208] p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Regras posológicas por ingrediente</p>
                            <div className="mt-3 space-y-2">
                              {(activeClinicalRegimen?.ingredientRules || []).length ? activeClinicalRegimen?.ingredientRules.map((rule) => (
                                <div key={`${activeRegimen.id}-${rule.ingredientName}-${rule.rawText}`} className="rounded-2xl border border-slate-800/90 bg-black/25 px-3 py-3 text-sm text-slate-200">
                                  <p className="font-semibold text-white">{rule.ingredientName}</p>
                                  <p className="mt-1 text-slate-300">{buildClinicalRuleSummary(rule)}</p>
                                  {rule.weightTiers?.length ? (
                                    <p className="mt-1 text-xs text-slate-400">{rule.weightTiers.map((tier) => tier.label).join(' • ')}</p>
                                  ) : null}
                                </div>
                              )) : (
                                <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">
                                  Este regime ainda não tem regras clínicas estruturadas. Use “Importar texto clínico” para preenchimento automático.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : activeRegimen.dosing_mode === 'calculated' ? (
                        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-800/90 bg-black/25 p-4 lg:grid-cols-4">
                          <RxvField label="Dose por kg">
                            <RxvInput type="number" step="0.01" value={String(activeRegimen.dose_min ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { dose_min: event.target.value ? Number(event.target.value) : null })} />
                          </RxvField>
                          <RxvField label="Unidade da dose">
                            <RxvInput value={String(activeRegimen.dose_unit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { dose_unit: event.target.value })} placeholder="mg" />
                          </RxvField>
                          <RxvField label="Por unidade de peso">
                            <RxvInput value={String(activeRegimen.per_weight_unit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { per_weight_unit: event.target.value })} placeholder="kg" />
                          </RxvField>
                          <RxvField label="Concentração final da fórmula">
                            <RxvInput type="number" step="0.01" value={String(activeRegimen.concentration_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_value: event.target.value ? Number(event.target.value) : null })} placeholder="Ex: 100" />
                          </RxvField>
                          <RxvField label="Unidade da concentração">
                            <RxvInput value={String(activeRegimen.concentration_unit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_unit: event.target.value })} placeholder="mg" />
                          </RxvField>
                          <RxvField label="A cada">
                            <RxvInput type="number" step="0.01" value={String(activeRegimen.concentration_per_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_per_value: event.target.value ? Number(event.target.value) : null })} placeholder="1" />
                          </RxvField>
                          <RxvField label="Unidade de administração">
                            <RxvInput value={String(activeRegimen.concentration_per_unit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { concentration_per_unit: event.target.value })} placeholder="mL, cápsula, gota" />
                          </RxvField>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-800/90 bg-black/25 p-4 lg:grid-cols-3">
                          <RxvField label="Dose final por administração">
                            <RxvInput type="number" step="0.01" value={String(activeRegimen.fixed_administration_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { fixed_administration_value: event.target.value ? Number(event.target.value) : null })} />
                          </RxvField>
                          <RxvField label="Unidade da dose">
                            <RxvInput value={String(activeRegimen.fixed_administration_unit || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { fixed_administration_unit: event.target.value })} placeholder="mL, cápsula, comprimido" />
                          </RxvField>
                          <RxvField label="Preparação sugerida">
                            <RxvInput value={String(activeRegimen.default_prepared_quantity_text || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { default_prepared_quantity_text: event.target.value })} placeholder="Ex: Preparar 30 mL" />
                          </RxvField>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <RxvField label="Frequência">
                          <RxvSelect value={buildFrequencyPreset(activeRegimen)} onChange={(event) => updateRegimen(String(activeRegimen.id), applyFrequencyPreset(activeRegimen, event.target.value))} options={FREQUENCY_PRESET_OPTIONS} />
                        </RxvField>
                        <RxvField label="Duração">
                          <RxvSelect value={String(activeRegimen.duration_mode || 'fixed_days')} onChange={(event) => updateRegimen(String(activeRegimen.id), { duration_mode: event.target.value })} options={DURATION_MODE_OPTIONS} />
                        </RxvField>
                        {String(activeRegimen.duration_mode || 'fixed_days') === 'fixed_days' ? (
                          <RxvField label="Número de dias">
                            <RxvInput type="number" min="1" value={String(activeRegimen.duration_value ?? '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { duration_value: event.target.value ? Number(event.target.value) : null, duration_unit: 'dias' })} />
                          </RxvField>
                        ) : (
                          <div className="rounded-2xl border border-slate-800/90 bg-black/25 px-4 py-3 text-sm text-slate-400">O item entra como uso contínuo até reavaliação clínica.</div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <RxvField label="Orientações ao tutor">
                          <RxvTextarea value={String(activeRegimen.default_administration_sig || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { default_administration_sig: event.target.value })} className="min-h-[84px]" placeholder="Ex: usar luvas, alternar pinna, administrar após alimento." />
                        </RxvField>
                        <RxvField label="Texto complementar para a farmácia">
                          <RxvTextarea value={String(activeRegimen.default_prepared_quantity_text || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { default_prepared_quantity_text: event.target.value })} className="min-h-[84px]" placeholder="Ex: usar base transdérmica Lipoderm®, q.s.p. 10 mL." />
                        </RxvField>
                      </div>

                      <details className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                        <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.24em] text-slate-400">Nota clínica interna (não imprime)</summary>
                        <div className="mt-4">
                          <RxvTextarea value={String(activeRegimen.notes || '')} onChange={(event) => updateRegimen(String(activeRegimen.id), { notes: event.target.value })} className="min-h-[84px]" placeholder="Racional clínico, literatura, alertas internos e observações do prescritor. Não imprime na receita." />
                        </div>
                      </details>

                      <details className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                        <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.24em] text-slate-400">Avançado do regime</summary>
                        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                          <RxvField label="Permitir edição na receita">
                            <RxvToggle checked={activeRegimen.allow_edit !== false} onChange={(value) => updateRegimen(String(activeRegimen.id), { allow_edit: value })} />
                          </RxvField>
                          <RxvField label="Herdar início padrão">
                            <RxvToggle checked={activeRegimen.inherit_default_start !== false} onChange={(value) => updateRegimen(String(activeRegimen.id), { inherit_default_start: value })} />
                          </RxvField>
                          <div className="flex items-end justify-end">
                            <RxvButton variant="danger" onClick={() => {
                              setEditor((prev) => {
                                const nextRegimens = prev.regimens.length === 1 ? [createEmptyRegimen()] : prev.regimens.filter((item) => String(item.id) !== String(activeRegimen.id))
                                return { ...prev, regimens: nextRegimens }
                              })
                              setActiveRegimenId((prev) => prev === String(activeRegimen.id) ? '' : prev)
                            }}>
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                              Remover regime
                            </RxvButton>
                          </div>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </RxvCard>

              <RxvCard className="p-5">
                <RxvSectionHeader icon="description" title="Documento e Controle" subtitle="Destino do item e orientação final para farmácia e controle especial" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Fluxo do documento</p>
                    <div className="mt-3 grid gap-2">
                      <button type="button" onClick={() => {
                        updateMedication({ is_controlled: false, control_type: 'venda_livre' })
                        updateMedicationMetadata({ control_document_target: 'standard' })
                      }} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${!editor.medication.is_controlled ? 'border-[#39ff14]/40 bg-[#133018] text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>Receita padrão</button>
                      <button type="button" onClick={() => {
                        updateMedication({ is_controlled: true, control_type: 'controlado' })
                        updateMedicationMetadata({ control_document_target: 'controlled' })
                      }} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${editor.medication.is_controlled ? 'border-red-500/35 bg-red-500/10 text-white' : 'border-slate-800/90 bg-black/25 text-slate-300'}`}>Controle especial</button>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Quando marcado como controlado, o item entra no documento especial e exige os dados extras do tutor/comprador.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Prévia clínica</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      <p className="font-semibold text-white">{editor.medication.name || 'Nome da fórmula'}</p>
                      <p>{buildFormulaSubtitle(editor) || 'Forma farmacêutica, quantidade, q.s.p., veículo e sabor aparecerão aqui.'}</p>
                      <p>{activeRegimen ? `${activeRegimen.dosing_mode === 'calculated' ? 'Dose calculada pelo peso' : 'Dose pronta'} • ${activeRegimen.frequency_label || 'frequência livre'} • ${activeRegimen.duration_mode === 'continuous_until_recheck' ? 'até reavaliação clínica' : `${activeRegimen.duration_value || ''} dias`.trim()}` : 'Sem regime ativo'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <RxvField label="Observações para farmácia">
                    <RxvTextarea value={String(editor.medication.manipulation_instructions || '')} onChange={(event) => updateMedication({ manipulation_instructions: event.target.value })} className="min-h-[92px]" placeholder="Ex: homogeneizar antes do uso, manter sob refrigeração, preparar sem açúcar." />
                  </RxvField>
                  <RxvField label="Texto complementar / observações clínicas">
                    <RxvTextarea value={String(editor.medication.notes || '')} onChange={(event) => updateMedication({ notes: event.target.value })} className="min-h-[92px]" placeholder="O que deve aparecer como orientação clínica complementar na receita." />
                  </RxvField>
                </div>

                <details className="mt-4 rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                  <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.24em] text-slate-400">Avançado</summary>
                  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <RxvField label="Regras extras do controlado">
                      <RxvTextarea value={String(getMedicationMetadata(editor).control_extra_rules || '')} onChange={(event) => updateMedicationMetadata({ control_extra_rules: event.target.value })} className="min-h-[84px]" placeholder="Ex: exigir CPF do tutor, endereço completo, quantidade por extenso." />
                    </RxvField>
                    <RxvField label="Texto padrão complementar">
                      <RxvTextarea value={String(getMedicationMetadata(editor).complement_text || '')} onChange={(event) => updateMedicationMetadata({ complement_text: event.target.value })} className="min-h-[84px]" placeholder="Texto opcional para enriquecer preview/importação." />
                    </RxvField>
                  </div>
                </details>

                {selectedId ? (
                  <div className="mt-4 flex justify-end">
                    <RxvButton variant="danger" onClick={handleDelete}>
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Excluir manipulado
                    </RxvButton>
                  </div>
                ) : null}
              </RxvCard>
            </div>
          </RxvCard>

          {loadingBundle ? <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-500">Carregando fórmula selecionada...</div> : null}
        </div>
        </div>
      </div>
    </ReceituarioChrome>
  )
}






