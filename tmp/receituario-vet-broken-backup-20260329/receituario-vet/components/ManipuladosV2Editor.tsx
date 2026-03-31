import React, { useMemo, useState } from 'react'
import {
  RxvButton,
  RxvCard,
  RxvField,
  RxvInput,
  RxvSectionHeader,
  RxvSelect,
  RxvTextarea,
  RxvToggle,
} from '????.????./????.????./????.????./src/components/receituario/RxvComponents'
import type {
  CompoundedMedicationV2,
  CompoundedV2Ingredient,
  CompoundedV2IngredientMode,
  CompoundedV2Regimen,
  SaleClassification,
} from '????.????./compoundedV2'
import {
  applyDurationKind,
  ALL_FORM_OPTIONS,
  applyFrequencyModeUi,
  BASE_EXCIPIENT_OPTIONS,
  DOSE_BASIS_OPTIONS,
  DURATION_KIND_OPTIONS,
  FREQUENCY_MODE_OPTIONS,
  getAdministrationUnitOptions,
  getArchetypeLabel,
  getConcentrationUnitOptions,
  getDefaultPharmacyStrategy,
  getDefaultUsageInstruction,
  getDoseUnitOptions,
  getDurationKind,
  getFlavorOptions,
  getFormulaSpeciesScope,
  getFrequencyModeUi,
  getPrimaryRouteOptions,
  getTutorCareOptions,
  getVehicleOptions,
  INTERVAL_HOUR_OPTIONS,
  PHARMACY_STRATEGY_OPTIONS,
  resolveExcipientSelection,
  resolveFlavorSelection,
  resolveVehicleSelection,
  shouldShowExcipientBase,
  shouldShowFlavor,
  shouldShowVehicle,
  speciesScopeToArray,
  SPECIES_SCOPE_OPTIONS,
  syncFormulaPreset,
  TIMES_PER_DAY_OPTIONS,
  requiresConcentration,
} from '????.????./compoundedV2Options'
import {
  getCompoundedBadgeMeta,
  getCompoundedCatalogSubtitle,
  renderCompoundedPharmacyInstructions,
  renderCompoundedPrescriptionLine,
  renderCompoundedRecommendations,
} from '????.????./compoundedV2Render'

interface ManipuladosV2EditorProps {
  value: CompoundedMedicationV2
  onChange: (next: CompoundedMedicationV2) => void
  onSave: () => void
  onDelete?: () => void
  saving?: boolean
  selectedRegimenId: string
  onSelectRegimen: (id: string) => void
}

function patchFormula(value: CompoundedMedicationV2, patch: Partial<CompoundedMedicationV2['formula']>): CompoundedMedicationV2 {
  return { ????.????.????.value, formula: { ????.????.????.value????.formula, ????.????.????.patch } }
}

function patchIngredient(value: CompoundedMedicationV2, id: string, patch: Partial<CompoundedV2Ingredient>): CompoundedMedicationV2 {
  return {
    ????.????.????.value,
    ingredients: value????.ingredients????.map((ingredient) => ingredient????.id === id ? { ????.????.????.ingredient, ????.????.????.patch } : ingredient),
  }
}

function patchRegimen(value: CompoundedMedicationV2, id: string, patch: Partial<CompoundedV2Regimen>): CompoundedMedicationV2 {
  return {
    ????.????.????.value,
    regimens: value????.regimens????.map((regimen) => regimen????.id === id ? { ????.????.????.regimen, ????.????.????.patch } : regimen),
  }
}

function patchRegimens(value: CompoundedMedicationV2, patch: Partial<CompoundedV2Regimen>): CompoundedMedicationV2 {
  return {
    ????.????.????.value,
    regimens: value????.regimens????.map((regimen) => ({ ????.????.????.regimen, ????.????.????.patch })),
  }
}

function addIngredient(value: CompoundedMedicationV2): CompoundedMedicationV2 {
  return {
    ????.????.????.value,
    ingredients: [????.????.????.value????.ingredients, {
      id: crypto????.randomUUID(),
      name: '',
      role: 'active',
      amount: null,
      unit: 'mg',
      note: '',
      is_controlled: false,
      definition_mode: undefined,
      target_unit: value????.formula????.administration_unit || 'mL',
      calculation_basis: 'na',
      multiplier: null,
      concentration_value: null,
      concentration_unit: '',
      use_regimen_directly: false,
      follows_primary_regimen: false,
    }],
  }
}

function removeIngredient(value: CompoundedMedicationV2, id: string): CompoundedMedicationV2 {
  const remaining = value????.ingredients????.filter((ingredient) => ingredient????.id !== id)
  return {
    ????.????.????.value,
    ingredients: remaining????.length ? remaining : [{
      id: crypto????.randomUUID(),
      name: '',
      role: 'active',
      amount: null,
      unit: 'mg',
      note: '',
      is_controlled: false,
      definition_mode: undefined,
      target_unit: value????.formula????.administration_unit || 'mL',
      calculation_basis: 'na',
      multiplier: null,
      concentration_value: null,
      concentration_unit: '',
      use_regimen_directly: false,
      follows_primary_regimen: false,
    }],
  }
}

function addRegimen(value: CompoundedMedicationV2): CompoundedMedicationV2 {
  const administrationUnit = value????.formula????.administration_unit || getAdministrationUnitOptions(value????.formula????.archetype)[0]?????.value || 'mL'
  return {
    ????.????.????.value,
    regimens: [????.????.????.value????.regimens, {
      id: crypto????.randomUUID(),
      name: `Regime ${value????.regimens????.length + 1}`,
      species: getFormulaSpeciesScope(value????.formula????.species) === 'Ambos' ? 'Canina' : value????.formula????.species[0] || 'Canina',
      clinical_indication: '',
      scenario: '',
      dose_mode: value????.formula????.formula_type === 'clinical_dose_oriented' ? 'by_weight' : 'fixed',
      dose_min: 1,
      dose_max: null,
      dose_unit: getDoseUnitOptions(value????.formula????.archetype)[0]?????.value || 'mg',
      dose_basis: value????.formula????.formula_type === 'clinical_dose_oriented' ? 'kg' : 'na',
      concentration_value: null,
      concentration_unit: getConcentrationUnitOptions(value????.formula????.archetype)[0]?????.value || '',
      administration_unit: administrationUnit,
      frequency_mode: 'interval_hours',
      frequency_min: 12,
      frequency_max: null,
      frequency_text: '',
      duration_mode: 'fixed',
      duration_value: 14,
      duration_unit: 'dias',
      duration_text: '',
      usage_instruction: '',
      tutor_observation: '',
      internal_note: '',
      pharmacy_note: '',
      pharmacy_strategy: getDefaultPharmacyStrategy(value????.formula????.archetype, administrationUnit),
      is_default: value????.regimens????.length === 0,
    }],
  }
}

function toneClass(tone: string): string {
  if (tone === 'red') return 'border-red-500/30 bg-red-500/10 text-red-300'
  if (tone === 'blue') return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200'
  if (tone === 'green') return 'border-[#39ff14]/30 bg-[#39ff14]/10 text-[#98f98e]'
  return 'border-slate-700 bg-slate-900/40 text-slate-300'
}

function FieldHint({ children }: { children: React????.ReactNode }) {
  return <p className="mt-1 text-[11px] leading-5 text-slate-500">{children}</p>
}

function normalizeTutorRecommendations(raw: string): string[] {
  return String(raw || '')
    ????.split(/\r?\n/)
    ????.map((line) => line????.replace(/^\s*-\s*/, '')????.trim())
    ????.filter(Boolean)
}

function joinTutorRecommendations(items: string[]): string {
  return items????.filter(Boolean)????.join('\n')
}

function normalizeOptionKey(value: string): string {
  return String(value || '')????.trim()????.normalize('NFD')????.replace(/[\u0300-\u036f]/g, '')????.toLowerCase()
}

function mergeOptionItems(base: Array<{ value: string; label: string }>, extras: string[]) {
  const seen = new Set<string>()
  const merged: Array<{ value: string; label: string }> = []
  ;[????.????.????.base, ????.????.????.extras????.map((value) => ({ value, label: value }))]????.forEach((entry) => {
    const key = normalizeOptionKey(entry????.value)
    if (!key || seen????.has(key)) return
    seen????.add(key)
    merged????.push(entry)
  })
  return merged
}

function getVehicleExtras(form: string): string[] {
  const key = normalizeOptionKey(form)
  if (key????.includes('suspensao')) return ['veículo para suspensóo oral', 'veículo oral palatável']
  if (key????.includes('solucao oral')) return ['veículo oral sem açúcar']
  if (key????.includes('xarope')) return ['veículo xarope']
  if (key????.includes('emulsao')) return ['veículo emulsão oral']
  if (key????.includes('gel transdermico')) return ['base transdérmica tipo PLO']
  if (key????.includes('creme transdermico')) return ['base transdérmica tipo PLO']
  if (key????.includes('pomada')) return ['base pomada adequada']
  if (key????.includes('locao')) return ['veículo loção dermatológica']
  if (key????.includes('spray')) return ['veículo spray dermatológico']
  if (key????.includes('shampoo')) return ['base shampoo adequada']
  if (key????.includes('condicionador')) return ['base condicionador adequada']
  if (key????.includes('colirio')) return ['veículo estéril oftálmico']
  if (key????.includes('otologica')) return ['veículo otológico com secagem rápida']
  return []
}

function getFlavorExtras(form: string): string[] {
  const key = normalizeOptionKey(form)
  if (key????.includes('suspensao')) return ['bacon', 'frango', 'peixe', 'a escolher']
  if (key????.includes('solucao oral')) return ['frango', 'baunilha', 'a escolher']
  if (key????.includes('xarope')) return ['queijo', 'baunilha', 'framboesa']
  if (key????.includes('emulsao')) return ['carne', 'peixe', 'a escolher']
  if (key????.includes('gel transdermico')) return ['camomila', 'neutro suave']
  if (key????.includes('creme transdermico')) return ['mamãe & bebê', 'neutro suave']
  if (key????.includes('pomada')) return ['camomila', 'neutro suave']
  if (key????.includes('creme')) return ['mamãe & bebê', 'camomila']
  if (key????.includes('locao')) return ['erva-doce', 'neutro suave']
  if (key????.includes('shampoo')) return ['mamãe & bebê', 'erva-doce']
  return []
}

function getExcipientExtras(form: string): string[] {
  const key = normalizeOptionKey(form)
  if (key????.includes('capsula')) return ['diluente farmacêutico', 'excipiente q????.s????.p????.']
  if (key????.includes('comprimido')) return ['diluente farmacêutico', 'excipiente q????.s????.p????.']
  if (key????.includes('sache')) return ['diluente farmacêutico', 'excipiente q????.s????.p????.']
  if (key????.includes('gel transdermico')) return ['base gel neutra']
  if (key????.includes('creme transdermico')) return ['base cremosa neutra']
  if (key????.includes('pomada') || key????.includes('creme')) return ['base cremosa neutra']
  return []
}

const INGREDIENT_DEFINITION_OPTIONS: Array<{ value: CompoundedV2IngredientMode; label: string }> = [
  { value: 'fixed_per_unit', label: 'Quantidade fixa por dose' },
  { value: 'fixed_total_formula', label: 'Quantidade fixa na fórmula toda' },
  { value: 'derived_from_regimen', label: 'Calculado pela dose do paciente' },
  { value: 'concentration_based', label: 'Calculado pela concentração final' },
  { value: 'vehicle_or_base', label: 'Base / veículo / q????.s????.p????.' },
  { value: 'excipient', label: 'Excipiente / componente tecnológico' },
]

const INGREDIENT_CALCULATION_BASIS_OPTIONS = [
  { value: 'kg', label: 'por kg' },
  { value: 'animal', label: 'por animal' },
  { value: 'unit', label: 'por dose' },
  { value: 'm2', label: 'por m²' },
  { value: 'na', label: 'não se aplica' },
]

function getIngredientDefinitionHint(mode: CompoundedV2IngredientMode): string {
  if (mode === 'fixed_per_unit') return 'Use quando cada cápsula, biscoito, click ou gota já tem uma quantidade fixa????.'
  if (mode === 'fixed_total_formula') return 'Use para conservantes ou componentes definidos na fórmula inteira????.'
  if (mode === 'derived_from_regimen') return 'O valor será resolvido na receita conforme peso, dose ou unidade do paciente????.'
  if (mode === 'derived_from_regimen_with_multiplier') return 'Acompanha a dose clínica, aplicando um multiplicador configurável????.'
  if (mode === 'concentration_based') return 'Use quando o ingrediente é definido por mg/mL, mg/click, mg/gota ou %????.'
  if (mode === 'vehicle_or_base') return 'Base, veículo ou q????.s????.p????.; não entra como ativo calculado????.'
  return 'Componente tecnológico opcional da formulação????.'
}

function upsertTutorRecommendation(regimen: CompoundedV2Regimen, text: string): Partial<CompoundedV2Regimen> {
  const current = normalizeTutorRecommendations(regimen????.tutor_observation)
  if (current????.includes(text)) return { tutor_observation: joinTutorRecommendations(current????.filter((entry) => entry !== text)) }
  return { tutor_observation: joinTutorRecommendations([????.????.????.current, text]) }
}

export function ManipuladosV2Editor({
  value,
  onChange,
  onSave,
  onDelete,
  saving = false,
  selectedRegimenId,
  onSelectRegimen,
}: ManipuladosV2EditorProps) {
  const [showDoseRange, setShowDoseRange] = useState(false)
  const [showAdvancedRegimen, setShowAdvancedRegimen] = useState(false)
  const [showAdvancedPharmacy, setShowAdvancedPharmacy] = useState(false)

  const activeRegimen = value????.regimens????.find((regimen) => regimen????.id === selectedRegimenId) || value????.regimens[0]
  const badges = getCompoundedBadgeMeta(value)
  const activePrinciples = useMemo(
    () => value????.ingredients????.filter((ingredient) => ingredient????.role === 'active' && ingredient????.name)????.map((ingredient) => ingredient????.name),
    [value????.ingredients],
  )
  const speciesScope = getFormulaSpeciesScope(value????.formula????.species)
  const administrationUnitOptions = getAdministrationUnitOptions(value????.formula????.archetype)
  const primaryRouteOptions = getPrimaryRouteOptions(value????.formula????.archetype)
  const doseUnitOptions = getDoseUnitOptions(value????.formula????.archetype)
  const concentrationUnitOptions = getConcentrationUnitOptions(value????.formula????.archetype)
  const vehicleOptions = useMemo(
    () => mergeOptionItems(getVehicleOptions(value????.formula????.archetype), getVehicleExtras(value????.formula????.pharmaceutical_form)),
    [value????.formula????.archetype, value????.formula????.pharmaceutical_form],
  )
  const flavorOptions = useMemo(
    () => mergeOptionItems(getFlavorOptions(value????.formula????.archetype), getFlavorExtras(value????.formula????.pharmaceutical_form)),
    [value????.formula????.archetype, value????.formula????.pharmaceutical_form],
  )
  const excipientOptions = useMemo(
    () => mergeOptionItems(BASE_EXCIPIENT_OPTIONS, getExcipientExtras(value????.formula????.pharmaceutical_form)),
    [value????.formula????.pharmaceutical_form],
  )
  const vehicleSelection = vehicleOptions????.some((entry) => entry????.value === (value????.formula????.vehicle || '')????.trim())
    ? { selected: (value????.formula????.vehicle || '')????.trim() || 'nenhum', customValue: '' }
    : resolveVehicleSelection(value????.formula????.archetype, value????.formula????.vehicle)
  const flavorSelection = flavorOptions????.some((entry) => entry????.value === (value????.formula????.flavor || '')????.trim())
    ? { selected: (value????.formula????.flavor || '')????.trim() || 'nenhum', customValue: '' }
    : resolveFlavorSelection(value????.formula????.archetype, value????.formula????.flavor)
  const excipientSelection = excipientOptions????.some((entry) => entry????.value === (value????.formula????.excipient_base || '')????.trim())
    ? { selected: (value????.formula????.excipient_base || '')????.trim() || 'nenhum', customValue: '' }
    : resolveExcipientSelection(value????.formula????.excipient_base)
  const recommendations = renderCompoundedRecommendations(value, activeRegimen?????.id)
  const needsConcentration = activeRegimen ? requiresConcentration(value????.formula, activeRegimen) : false
  const frequencyModeUi = activeRegimen ? getFrequencyModeUi(activeRegimen) : 'interval_hours'
  const durationKind = activeRegimen ? getDurationKind(activeRegimen) : 'dias'

  return (
    <div className="rxv-manipulados-v2-editor space-y-5">
      <RxvCard className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <RxvSectionHeader
              icon="science"
              title={value????.formula????.name || 'Manipulado V2'}
              subtitle={getCompoundedCatalogSubtitle(value) || 'Editor clínico enxuto para catálogo, receita e farmácia????.'}
            />
            <div className="mt-3 flex flex-wrap gap-1????.5">
              {badges????.map((badge) => (
                <span key={badge????.label} className={`rounded-full border px-2????.5 py-1 text-[10px] font-black uppercase tracking-widest ${toneClass(badge????.tone)}`}>
                  {badge????.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {onDelete ? <RxvButton variant="danger" onClick={onDelete}>Excluir</RxvButton> : null}
            <RxvButton variant="primary" onClick={onSave} loading={saving}>Salvar catálogo</RxvButton>
          </div>
        </div>
      </RxvCard>

      <RxvCard className="p-5">
        <RxvSectionHeader icon="badge" title="Bloco 1 • Identidade" subtitle="O que aparece no catálogo e guia a prescrição clínica????." />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <RxvField label="Nome da fórmula">
            <RxvInput value={value????.formula????.name} onChange={(event) => onChange(patchFormula(value, { name: event????.target????.value }))} placeholder="Ex: Gabapentina gel transdérmico" />
          </RxvField>
          <RxvField label="Forma farmacêutica">
            <RxvSelect
              value={value????.formula????.pharmaceutical_form}
              onChange={(event) => {
                const nextFormula = syncFormulaPreset(value????.formula, event????.target????.value)
                const next = patchFormula(value, nextFormula)
                onChange(patchRegimens(next, {
                  administration_unit: nextFormula????.administration_unit,
                  pharmacy_strategy: getDefaultPharmacyStrategy(nextFormula????.archetype, nextFormula????.administration_unit),
                }))
              }}
              options={ALL_FORM_OPTIONS}
            />
          </RxvField>
          <RxvField label="Espécies-alvo">
            <RxvSelect
              value={speciesScope}
              onChange={(event) => onChange(patchFormula(value, { species: speciesScopeToArray(event????.target????.value) }))}
              options={SPECIES_SCOPE_OPTIONS}
            />
            <FieldHint>Escolha se a fórmula é voltada para cão, gato ou ambos????.</FieldHint>
          </RxvField>
          <RxvField label="Via principal">
            <RxvSelect value={value????.formula????.primary_route} onChange={(event) => onChange(patchFormula(value, { primary_route: event????.target????.value }))} options={primaryRouteOptions} />
          </RxvField>
          <RxvField label="Unidade de administração">
            <RxvSelect
              value={value????.formula????.administration_unit}
              onChange={(event) => {
                const next = patchFormula(value, { administration_unit: event????.target????.value })
                onChange(patchRegimens(next, { administration_unit: event????.target????.value }))
              }}
              options={administrationUnitOptions}
            />
            <FieldHint>Unidade real que o tutor vai administrar: cápsula, mL, click, gota ou equivalente????.</FieldHint>
          </RxvField>
          <div className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Leitura clínica rápida</p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Arquétipo</p>
                <p className="mt-1 text-sm text-white">{getArchetypeLabel(value????.formula????.archetype)}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Ativos principais</p>
                <p className="mt-1 text-sm text-white">{activePrinciples????.join(' • ') || 'Defina os ativos da fórmula'}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-800/90 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-white">Controlado</p>
                <p className="mt-1 text-xs text-slate-500">Define filtros, badges e fluxo documental especial????.</p>
              </div>
              <RxvToggle checked={value????.formula????.sale_classification === 'controlled'} onChange={(checked) => onChange(patchFormula(value, { sale_classification: (checked ? 'controlled' : 'free') as SaleClassification }))} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-white">Uso contínuo</p>
                <p className="mt-1 text-xs text-slate-500">Marque quando a fórmula costuma ser de manutenção????.</p>
              </div>
              <RxvToggle checked={value????.formula????.is_continuous_use} onChange={(checked) => onChange(patchFormula(value, { is_continuous_use: checked }))} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-white">Ativo no catálogo</p>
                <p className="mt-1 text-xs text-slate-500">Permite ocultar da busca sem perder histórico????.</p>
              </div>
              <RxvToggle checked={value????.formula????.is_active} onChange={(checked) => onChange(patchFormula(value, { is_active: checked }))} />
            </div>
          </div>
          <div className="xl:col-span-2">
            <RxvField label="Resumo curto">
              <RxvTextarea value={value????.formula????.short_description} onChange={(event) => onChange(patchFormula(value, { short_description: event????.target????.value }))} className="min-h-[92px]" placeholder="Resumo clínico curto para reconhecer rapidamente no catálogo????." />
            </RxvField>
          </div>
        </div>
      </RxvCard>

      <RxvCard className="p-5">
        <RxvSectionHeader icon="medication" title="Bloco 2 • Como esse item é prescrito" subtitle="Regime clínico simples na frente, faixas e ajustes no avançado????." />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[210px_minmax(0,1fr)] 2xl:grid-cols-[224px_minmax(0,1fr)]">
          <div className="space-y-3 self-start">
            {value????.regimens????.map((regimen) => (
              <button key={regimen????.id} type="button" onClick={() => onSelectRegimen(regimen????.id)} className={`w-full rounded-2xl border px-4 py-4 text-left transition ${activeRegimen?????.id === regimen????.id ? 'border-[#39ff14]/40 bg-[#143118]' : 'border-slate-800/90 bg-black/25 hover:border-[#39ff14]/20'}`}>
                <p className="text-sm font-black leading-5 text-white">{regimen????.name || 'Regime'}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{regimen????.clinical_indication || 'Sem indicação clínica definida'}</p>
              </button>
            ))}
            <RxvButton variant="secondary" onClick={() => onChange(addRegimen(value))}>Novo regime</RxvButton>
          </div>

          {!activeRegimen ? null : (
            <div className="min-w-0 space-y-5 rounded-3xl border border-slate-800/90 bg-black/20 p-5 xl:p-6">
              <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                <div className="col-span-12 xl:col-span-7 2xl:col-span-8">
                  <RxvField label="Nome do regime">
                  <RxvInput value={activeRegimen????.name} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { name: event????.target????.value }))} />
                  </RxvField>
                </div>
                <div className="col-span-12 xl:col-span-5 2xl:col-span-4">
                  <RxvField label="Espécie do regime">
                    <RxvSelect value={activeRegimen????.species || 'Canina'} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { species: event????.target????.value }))} options={SPECIES_SCOPE_OPTIONS} />
                  </RxvField>
                </div>
                <div className="col-span-12">
                  <RxvField label="Indicação clínica">
                    <RxvInput value={activeRegimen????.clinical_indication} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { clinical_indication: event????.target????.value }))} placeholder="Ex: analgesia, controle de tosse, ansiedade" />
                  </RxvField>
                </div>

                <div className="col-span-12 min-[1780px]:col-span-7">
                <div className="min-w-0 rounded-2xl border border-slate-800/90 bg-black/25 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Posologia principal</p>
                  <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <RxvField label="Tipo de dose">
                      <RxvSelect value={activeRegimen????.dose_mode} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { dose_mode: event????.target????.value as CompoundedV2Regimen['dose_mode'], dose_basis: event????.target????.value === 'by_weight' ? (activeRegimen????.dose_basis === 'na' ? 'kg' : activeRegimen????.dose_basis) : (activeRegimen????.dose_basis || 'na') }))} options={[
                        { value: 'fixed', label: 'dose fixa por unidade' },
                        { value: 'by_weight', label: 'dose por peso' },
                      ]} />
                    </RxvField>
                    <RxvField label="Dose">
                      <RxvInput type="number" step="0????.01" value={String(activeRegimen????.dose_min ?? '')} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { dose_min: event????.target????.value ? Number(event????.target????.value) : null, dose_max: showDoseRange ? activeRegimen????.dose_max : null }))} />
                    </RxvField>
                    <RxvField label="Unidade da dose">
                      <RxvSelect value={activeRegimen????.dose_unit} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { dose_unit: event????.target????.value }))} options={doseUnitOptions} />
                    </RxvField>
                    <RxvField label="Como a dose é calculada">
                      <RxvSelect value={activeRegimen????.dose_basis || (activeRegimen????.dose_mode === 'by_weight' ? 'kg' : 'na')} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { dose_basis: event????.target????.value }))} options={DOSE_BASIS_OPTIONS} />
                    </RxvField>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-800/90 bg-black/30 px-4 py-3">
                    <div>
                      <p className="text-sm font-black text-white">Usar faixa de dose</p>
                      <p className="mt-1 text-xs text-slate-500">Ative só quando a dose clínica realmente for uma faixa????.</p>
                    </div>
                    <RxvToggle checked={showDoseRange || (activeRegimen????.dose_max != null && activeRegimen????.dose_max !== activeRegimen????.dose_min)} onChange={(checked) => {
                      setShowDoseRange(checked)
                      if (!checked) onChange(patchRegimen(value, activeRegimen????.id, { dose_max: null }))
                    }} />
                  </div>
                  {showDoseRange || (activeRegimen????.dose_max != null && activeRegimen????.dose_max !== activeRegimen????.dose_min) ? (
                    <div className="mt-3 grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <RxvField label="Dose mínima">
                        <RxvInput type="number" step="0????.01" value={String(activeRegimen????.dose_min ?? '')} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { dose_min: event????.target????.value ? Number(event????.target????.value) : null }))} />
                      </RxvField>
                      <RxvField label="Dose máxima">
                        <RxvInput type="number" step="0????.01" value={String(activeRegimen????.dose_max ?? '')} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { dose_max: event????.target????.value ? Number(event????.target????.value) : null }))} />
                      </RxvField>
                    </div>
                  ) : null}
                  {needsConcentration ? (
                    <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(220px,0????.42fr)_minmax(0,0????.58fr)]">
                      <RxvField label="Concentração da formulação">
                        <RxvInput type="number" step="0????.01" value={String(activeRegimen????.concentration_value ?? '')} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { concentration_value: event????.target????.value ? Number(event????.target????.value) : null }))} placeholder="Ex: 100" />
                      </RxvField>
                      <RxvField label="Unidade da concentração">
                        <RxvSelect value={activeRegimen????.concentration_unit} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { concentration_unit: event????.target????.value }))} options={concentrationUnitOptions} />
                      <FieldHint>Preencha só quando a conversão da dose para mL, click, gota ou pump depender da concentração????.</FieldHint>
                      </RxvField>
                    </div>
                  ) : null}
                </div>
                </div>

                <div className="col-span-12 min-[1780px]:col-span-5">
                <div className="min-w-0 rounded-2xl border border-slate-800/90 bg-black/25 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Frequência e duração</p>
                  <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <RxvField label="Frequência">
                      <RxvSelect value={frequencyModeUi} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, applyFrequencyModeUi(event????.target????.value, activeRegimen)))} options={FREQUENCY_MODE_OPTIONS} />
                    </RxvField>
                    {frequencyModeUi === 'times_per_day' ? (
                      <RxvField label="Vezes ao dia">
                        <RxvSelect
                          value={activeRegimen????.frequency_min ? String(activeRegimen????.frequency_min) : '2'}
                          onChange={(event) => {
                            if (event????.target????.value === 'custom') return
                            onChange(patchRegimen(value, activeRegimen????.id, { frequency_min: Number(event????.target????.value), frequency_text: '' }))
                          }}
                          options={TIMES_PER_DAY_OPTIONS}
                        />
                      </RxvField>
                    ) : null}
                    {frequencyModeUi === 'interval_hours' ? (
                      <RxvField label="Intervalo">
                        <RxvSelect
                          value={activeRegimen????.frequency_min ? String(activeRegimen????.frequency_min) : '12'}
                          onChange={(event) => {
                            if (event????.target????.value === 'custom') return
                            onChange(patchRegimen(value, activeRegimen????.id, { frequency_min: Number(event????.target????.value), frequency_text: '' }))
                          }}
                          options={INTERVAL_HOUR_OPTIONS}
                        />
                      </RxvField>
                    ) : null}
                    {(frequencyModeUi === 'guided' || frequencyModeUi === 'alternate_days' || frequencyModeUi === 'weekly') ? (
                    <RxvField label="Texto da frequência">
                        <RxvInput value={activeRegimen????.frequency_text} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { frequency_text: event????.target????.value }))} placeholder="Ex: em dias alternados, semanal, conforme orientação médica" />
                      </RxvField>
                    ) : null}
                    <RxvField label="Duração">
                      <RxvInput
                        type="number"
                        step="1"
                        value={['continuous', 'recheck', 'single']????.includes(durationKind) ? '' : String(activeRegimen????.duration_value ?? '')}
                        onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { duration_value: event????.target????.value ? Number(event????.target????.value) : null }))}
                        disabled={['continuous', 'recheck', 'single']????.includes(durationKind)}
                        placeholder={['continuous', 'recheck', 'single']????.includes(durationKind) ? 'não se aplica' : '14'}
                      />
                    </RxvField>
                    <RxvField label="Unidade da duração">
                      <RxvSelect value={durationKind} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, applyDurationKind(activeRegimen, event????.target????.value)))} options={DURATION_KIND_OPTIONS} />
                    </RxvField>
                  </div>
                </div>
                </div>

                <div className="col-span-12 min-[1680px]:col-span-6">
                <RxvField label="Orientação base de uso">
                  <RxvTextarea value={activeRegimen????.usage_instruction} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { usage_instruction: event????.target????.value }))} className="min-h-[92px]" placeholder={getDefaultUsageInstruction(value????.formula????.archetype, activeRegimen, value????.formula????.primary_route)} />
                  <div className="mt-2 flex justify-end">
                    <RxvButton variant="secondary" onClick={() => onChange(patchRegimen(value, activeRegimen????.id, { usage_instruction: getDefaultUsageInstruction(value????.formula????.archetype, activeRegimen, value????.formula????.primary_route) }))}>
                      Sugerir texto
                    </RxvButton>
                  </div>
                </RxvField>
                </div>
                <div className="col-span-12 min-[1680px]:col-span-6">
                <RxvField label="Cuidados e recomendações ao tutor">
                  <RxvTextarea value={activeRegimen????.tutor_observation} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { tutor_observation: event????.target????.value }))} className="min-h-[92px]" placeholder="Cada linha vira uma recomendação separada no preview e no PDF????." />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getTutorCareOptions(value????.formula????.archetype)????.map((care) => {
                      const selected = normalizeTutorRecommendations(activeRegimen????.tutor_observation)????.includes(care)
                      return (
                        <button
                          key={care}
                          type="button"
                          onClick={() => onChange(patchRegimen(value, activeRegimen????.id, upsertTutorRecommendation(activeRegimen, care)))}
                          className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest transition ${selected ? 'border-[#39ff14]/30 bg-[#39ff14]/10 text-[#98f98e]' : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600'}`}
                        >
                          {care}
                        </button>
                      )
                    })}
                  </div>
                </RxvField>
                </div>

                <div className="col-span-12">
              <details className="rounded-2xl border border-slate-800/90 bg-black/20 p-4" open={showAdvancedRegimen} onToggle={(event) => setShowAdvancedRegimen((event????.target as HTMLDetailsElement)????.open)}>
                <summary className="cursor-pointer text-sm font-black uppercase tracking-widest text-slate-300">Avançado do regime</summary>
                <div className="mt-4 grid grid-cols-1 gap-4 2xl:grid-cols-2">
                  <RxvField label="Tags / cenário clínico">
                    <RxvInput value={activeRegimen????.scenario} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { scenario: event????.target????.value }))} placeholder="Ex: agudo, manutenção, crise????. Não imprime por padrão????." />
                  </RxvField>
                  <RxvField label="Como a farmácia ajusta a formulação">
                    <RxvSelect value={activeRegimen????.pharmacy_strategy} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { pharmacy_strategy: event????.target????.value as CompoundedV2Regimen['pharmacy_strategy'] }))} options={PHARMACY_STRATEGY_OPTIONS} />
                  </RxvField>
                </div>
              </details>
                </div>

                <div className="col-span-12">
              <div className="rounded-2xl border border-[#39ff14]/20 bg-[#081208] p-5">
                <p className="text-[11px] font-black uppercase tracking-[0????.24em] text-[#8ef986]">Como esse regime vai sair</p>
                <div className="mt-3 space-y-3 text-sm text-slate-300">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Texto do item</p>
                    <p className="mt-1 font-semibold text-white">{renderCompoundedPrescriptionLine(value, null, activeRegimen????.id) || 'A orientação final aparecerá aqui????.'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Manipulação para a farmácia</p>
                    <p className="mt-1">{renderCompoundedPharmacyInstructions(value, null, activeRegimen????.id) || 'A instrução farmacotécnica será montada automaticamente????.'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Recomendações ao tutor</p>
                    {recommendations????.length ? (
                      <ul className="mt-1 list-disc space-y-1 pl-5">
                        {recommendations????.map((entry) => <li key={entry}>{entry}</li>)}
                      </ul>
                    ) : (
                      <p className="mt-1 text-slate-500">Sem recomendações adicionais????.</p>
                    )}
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </RxvCard>

      <RxvCard className="p-5">
        <RxvSectionHeader icon="inventory_2" title="Bloco 3 • Como a farmácia manipula" subtitle="Composição estruturada, q????.s????.p????. e preparo separados do texto prescritivo????." />
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {value????.ingredients????.map((ingredient) => (
              <div key={ingredient????.id} className="rounded-2xl border border-slate-800/90 bg-black/25 p-4">
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1????.3fr)_160px_auto]">
                  <RxvField label="Ingrediente / insumo">
                    <RxvInput value={ingredient????.name} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { name: event????.target????.value }))} placeholder="Ex: benazepril, Lipoderm®, aroma bacon" />
                  </RxvField>
                  <RxvField label="Tipo">
                    <RxvSelect value={ingredient????.role} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { role: event????.target????.value as CompoundedV2Ingredient['role'] }))} options={[
                      { value: 'active', label: 'ativo' },
                      { value: 'vehicle', label: 'veículo' },
                      { value: 'excipient', label: 'excipiente' },
                      { value: 'base', label: 'base' },
                    ]} />
                  </RxvField>
                  <div className="flex items-end xl:justify-end">
                    <RxvButton variant="danger" onClick={() => onChange(removeIngredient(value, ingredient????.id))}>Remover</RxvButton>
                  </div>
                </div>

                <div className="mt-4">
                  <RxvField label="Como esse ingrediente entra na fórmula?">
                    <RxvSelect
                      value={ingredient????.definition_mode || ''}
                      onChange={(event) => {
                        const nextMode = event????.target????.value as CompoundedV2IngredientMode
                        onChange(patchIngredient(value, ingredient????.id, {
                          definition_mode: nextMode,
                          target_unit: nextMode === 'fixed_per_unit' || nextMode === 'derived_from_regimen'
                            ? (ingredient????.target_unit || value????.formula????.administration_unit)
                            : ingredient????.target_unit || '',
                          calculation_basis: nextMode === 'derived_from_regimen'
                            ? (ingredient????.calculation_basis || 'kg')
                            : nextMode === 'fixed_per_unit'
                              ? 'unit'
                              : 'na',
                        }))
                      }}
                      options={[
                        { value: '', label: 'Selecione como o ingrediente entra na fórmula' },
                        ????.????.????.INGREDIENT_DEFINITION_OPTIONS,
                      ]}
                    />
                    <FieldHint>{ingredient????.definition_mode ? getIngredientDefinitionHint(ingredient????.definition_mode) : 'Primeiro escolha o tipo do ingrediente????. O formulário abaixo se adapta automaticamente????.'}</FieldHint>
                  </RxvField>
                </div>

                {ingredient????.definition_mode === 'fixed_per_unit' ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                    <RxvField label="Quantidade">
                      <RxvInput type="number" step="0????.01" value={String(ingredient????.amount ?? '')} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { amount: event????.target????.value ? Number(event????.target????.value) : null }))} />
                    </RxvField>
                    <RxvField label="Unidade">
                      <RxvSelect value={ingredient????.unit || 'mg'} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { unit: event????.target????.value }))} options={doseUnitOptions} />
                    </RxvField>
                    <RxvField label="Cada dose corresponde a">
                      <RxvSelect value={ingredient????.target_unit || value????.formula????.administration_unit} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { target_unit: event????.target????.value }))} options={administrationUnitOptions} />
                    </RxvField>
                  </div>
                ) : null}

                {ingredient????.definition_mode === 'fixed_total_formula' ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <RxvField label="Quantidade total">
                      <RxvInput type="number" step="0????.01" value={String(ingredient????.amount ?? '')} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { amount: event????.target????.value ? Number(event????.target????.value) : null }))} />
                    </RxvField>
                    <RxvField label="Unidade">
                      <RxvSelect value={ingredient????.unit || 'mg'} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { unit: event????.target????.value }))} options={doseUnitOptions} />
                    </RxvField>
                  </div>
                ) : null}

                {ingredient????.definition_mode === 'derived_from_regimen' ? (
                  <div className="mt-4 space-y-4">
                    <div className="rounded-xl border border-slate-800/90 bg-black/30 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-white">Esse ingrediente acompanha a dose principal do regime?</p>
                          <p className="mt-1 text-xs text-slate-500">Use Sim quando este ingrediente deve acompanhar automaticamente a dose clínica do paciente????.</p>
                        </div>
                        <RxvToggle checked={!!ingredient????.follows_primary_regimen} onChange={(checked) => onChange(patchIngredient(value, ingredient????.id, { follows_primary_regimen: checked, use_regimen_directly: checked ? ingredient????.use_regimen_directly : false }))} />
                      </div>
                    </div>

                    {ingredient????.follows_primary_regimen ? (
                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <RxvField label="Cada dose corresponde a">
                          <RxvSelect value={ingredient????.target_unit || value????.formula????.administration_unit} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { target_unit: event????.target????.value }))} options={administrationUnitOptions} />
                        </RxvField>
                        <div className="rounded-xl border border-slate-800/90 bg-black/30 px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-black text-white">Esse cálculo usa a dose clínica exatamente como está no regime?</p>
                              <p className="mt-1 text-xs text-slate-500">Se marcar Não, o sistema aplica ajuste pelo multiplicador????.</p>
                            </div>
                            <RxvToggle checked={!!ingredient????.use_regimen_directly} onChange={(checked) => onChange(patchIngredient(value, ingredient????.id, { use_regimen_directly: checked }))} />
                          </div>
                        </div>
                        {!ingredient????.use_regimen_directly ? (
                          <>
                            <RxvField label="Multiplicador">
                              <RxvInput type="number" step="0????.01" value={String(ingredient????.multiplier ?? 1)} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { multiplier: event????.target????.value ? Number(event????.target????.value) : 1 }))} />
                            </RxvField>
                            <RxvField label="Observação técnica">
                              <RxvInput value={ingredient????.note} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { note: event????.target????.value }))} placeholder="Ex: acompanha 50% da dose principal????." />
                            </RxvField>
                          </>
                        ) : null}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
                        <RxvField label="Dose base">
                          <RxvInput type="number" step="0????.01" value={String(ingredient????.amount ?? '')} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { amount: event????.target????.value ? Number(event????.target????.value) : null }))} placeholder="Ex: 0,5" />
                          <FieldHint>Use só quando este ingrediente não acompanhar automaticamente a dose principal do regime????.</FieldHint>
                        </RxvField>
                        <RxvField label="Unidade da dose">
                          <RxvSelect value={ingredient????.unit || activeRegimen?????.dose_unit || 'mg'} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { unit: event????.target????.value }))} options={doseUnitOptions} />
                        </RxvField>
                        <RxvField label="Base do cálculo">
                          <RxvSelect value={ingredient????.calculation_basis || 'kg'} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { calculation_basis: event????.target????.value as CompoundedV2Ingredient['calculation_basis'] }))} options={INGREDIENT_CALCULATION_BASIS_OPTIONS} />
                        </RxvField>
                        <RxvField label="Cada dose corresponde a">
                          <RxvSelect value={ingredient????.target_unit || value????.formula????.administration_unit} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { target_unit: event????.target????.value }))} options={administrationUnitOptions} />
                        </RxvField>
                      </div>
                    )}
                  </div>
                ) : null}

                {ingredient????.definition_mode === 'concentration_based' ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                    <RxvField label="Concentração-alvo">
                      <RxvInput type="number" step="0????.01" value={String(ingredient????.concentration_value ?? ingredient????.amount ?? '')} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { concentration_value: event????.target????.value ? Number(event????.target????.value) : null, amount: event????.target????.value ? Number(event????.target????.value) : null }))} />
                    </RxvField>
                    <RxvField label="Unidade da concentração">
                      <RxvSelect value={ingredient????.concentration_unit || activeRegimen?????.concentration_unit || concentrationUnitOptions[0]?????.value || 'mg/mL'} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { concentration_unit: event????.target????.value, unit: event????.target????.value }))} options={concentrationUnitOptions} />
                    </RxvField>
                    <RxvField label="Unidade-alvo">
                      <RxvSelect value={ingredient????.target_unit || value????.formula????.administration_unit} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { target_unit: event????.target????.value }))} options={administrationUnitOptions} />
                    </RxvField>
                  </div>
                ) : null}

                {ingredient????.definition_mode === 'vehicle_or_base' || ingredient????.definition_mode === 'excipient' ? (
                  <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <RxvField label={ingredient????.definition_mode === 'vehicle_or_base' ? 'Q????.S????.P????.' : 'Quantidade opcional'}>
                      <RxvInput type="number" step="0????.01" value={String(ingredient????.amount ?? '')} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { amount: event????.target????.value ? Number(event????.target????.value) : null }))} placeholder={ingredient????.definition_mode === 'vehicle_or_base' ? 'Opcional' : 'Ex: 5'} />
                    </RxvField>
                    <RxvField label={ingredient????.definition_mode === 'vehicle_or_base' ? 'Veículo / base' : 'Unidade'}>
                      <RxvSelect value={ingredient????.unit || value????.formula????.administration_unit || 'mL'} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { unit: event????.target????.value }))} options={[????.????.????.administrationUnitOptions, ????.????.????.doseUnitOptions]????.filter((entry, index, arr) => arr????.findIndex((candidate) => candidate????.value === entry????.value) === index)} />
                    </RxvField>
                  </div>
                ) : null}

                {(ingredient????.definition_mode && ingredient????.definition_mode !== 'derived_from_regimen') ? (
                  <div className="mt-4">
                    <RxvField label="Observação do ingrediente">
                      <RxvInput value={ingredient????.note} onChange={(event) => onChange(patchIngredient(value, ingredient????.id, { note: event????.target????.value }))} placeholder="Detalhe técnico opcional; não vira texto do tutor????." />
                    </RxvField>
                  </div>
                ) : null}
              </div>
            ))}
            <RxvButton variant="secondary" onClick={() => onChange(addIngredient(value))}>Adicionar ingrediente</RxvButton>
          </div>

          <div className="space-y-4">
            <RxvField label="Q????.S????.P????.">
              <RxvInput value={value????.formula????.qsp_text} onChange={(event) => onChange(patchFormula(value, { qsp_text: event????.target????.value }))} placeholder="Ex: 30 mL, 30 cápsulas, 28 doses" />
              <FieldHint>Total que a farmácia deverá produzir/dispensar????. Se o q????.s????.p????. resolve, ele já aparece sozinho na receita????.</FieldHint>
            </RxvField>

            {shouldShowVehicle(value????.formula????.archetype) ? (
              <RxvField label="Veículo">
                <RxvSelect
                  value={vehicleSelection????.selected}
                  onChange={(event) => onChange(patchFormula(value, { vehicle: event????.target????.value === 'nenhum' ? '' : event????.target????.value === 'adicionar_manualmente' ? vehicleSelection????.customValue : event????.target????.value }))}
                  options={vehicleOptions}
                />
                <FieldHint>Base líquida/semissólida usada para carregar a fórmula????.</FieldHint>
                {vehicleSelection????.selected === 'adicionar_manualmente' ? (
                  <div className="mt-2">
                    <RxvInput value={vehicleSelection????.customValue} onChange={(event) => onChange(patchFormula(value, { vehicle: event????.target????.value }))} placeholder="Descreva o veículo manualmente" />
                  </div>
                ) : null}
              </RxvField>
            ) : null}

            {shouldShowFlavor(value????.formula????.archetype) ? (
              <RxvField label={value????.formula????.archetype === 'topico_livre' || value????.formula????.archetype === 'transdermico_dosado' ? 'Fragrância' : 'Sabor'}>
                <RxvSelect
                  value={flavorSelection????.selected}
                  onChange={(event) => onChange(patchFormula(value, { flavor: event????.target????.value === 'nenhum' ? '' : event????.target????.value === 'adicionar_manualmente' ? flavorSelection????.customValue : event????.target????.value }))}
                  options={flavorOptions}
                />
                <FieldHint>{value????.formula????.archetype === 'topico_livre' || value????.formula????.archetype === 'transdermico_dosado' ? 'Escolha fragrância compatível com uso dermatológico????.' : 'Use apenas sabores compatíveis com formas orais????.'}</FieldHint>
                {flavorSelection????.selected === 'adicionar_manualmente' ? (
                  <div className="mt-2">
                    <RxvInput value={flavorSelection????.customValue} onChange={(event) => onChange(patchFormula(value, { flavor: event????.target????.value }))} placeholder="Descreva o sabor ou a fragrância" />
                  </div>
                ) : null}
              </RxvField>
            ) : null}

            {shouldShowExcipientBase(value????.formula????.archetype) ? (
              <RxvField label="Base / excipiente farmacêutico">
                <RxvSelect
                  value={excipientSelection????.selected}
                  onChange={(event) => onChange(patchFormula(value, { excipient_base: event????.target????.value === 'nenhum' ? '' : event????.target????.value === 'adicionar_manualmente' ? excipientSelection????.customValue : event????.target????.value }))}
                  options={excipientOptions}
                />
                <FieldHint>Componente tecnológico de suporte; opcional em muitas fórmulas????.</FieldHint>
                {excipientSelection????.selected === 'adicionar_manualmente' ? (
                  <div className="mt-2">
                    <RxvInput value={excipientSelection????.customValue} onChange={(event) => onChange(patchFormula(value, { excipient_base: event????.target????.value }))} placeholder="Descreva a base/excipiente" />
                  </div>
                ) : null}
              </RxvField>
            ) : null}

            {activeRegimen ? (
              <>
                <RxvField label="Instrução para a farmácia">
                  <RxvTextarea value={activeRegimen????.pharmacy_note || ''} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { pharmacy_note: event????.target????.value }))} className="min-h-[100px]" placeholder="Complemento farmacotécnico opcional; a frase principal é gerada automaticamente????." />
                </RxvField>
                <details className="rounded-2xl border border-slate-800/90 bg-black/20 p-4" open={showAdvancedPharmacy} onToggle={(event) => setShowAdvancedPharmacy((event????.target as HTMLDetailsElement)????.open)}>
                  <summary className="cursor-pointer text-sm font-black uppercase tracking-widest text-slate-300">Avançado farmacotécnico</summary>
                  <div className="mt-4 space-y-4">
                    <RxvField label="Nota interna (não imprime)">
                      <RxvTextarea value={activeRegimen????.internal_note || ''} onChange={(event) => onChange(patchRegimen(value, activeRegimen????.id, { internal_note: event????.target????.value }))} className="min-h-[92px]" placeholder="Racional clínico e observações internas????." />
                    </RxvField>
                  </div>
                </details>
              </>
            ) : null}
          </div>
        </div>
      </RxvCard>
    </div>
  )
}

export default ManipuladosV2Editor
