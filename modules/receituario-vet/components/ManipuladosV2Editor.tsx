import React, { useMemo } from 'react'
import {
  RxvButton,
  RxvCard,
  RxvField,
  RxvInput,
  RxvSectionHeader,
  RxvSelect,
  RxvTextarea,
  RxvToggle,
} from '../../../src/components/receituario/RxvComponents'
import type {
  CompoundedMedicationV2,
  CompoundedV2Ingredient,
  CompoundedV2IngredientMode,
  CompoundedV2Regimen,
  SaleClassification,
} from '../compoundedV2'
import {
  ALL_FORM_OPTIONS,
  ARCHETYPE_OPTIONS,
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
  getFlavorOptions,
  getFormulaSpeciesScope,
  getPrimaryRouteOptions,
  getTutorCareOptions,
  getVehicleOptions,
  INTERVAL_HOUR_OPTIONS,
  PHARMACY_STRATEGY_OPTIONS,
  requiresConcentration,
  resolveExcipientSelection,
  resolveFlavorSelection,
  resolveVehicleSelection,
  SALE_CLASSIFICATION_OPTIONS,
  shouldShowExcipientBase,
  shouldShowFlavor,
  shouldShowVehicle,
  SPECIES_SCOPE_OPTIONS,
  speciesScopeToArray,
  syncFormulaPreset,
  TIMES_PER_DAY_OPTIONS,
} from '../compoundedV2Options'
import {
  getCompoundedBadgeMeta,
  getCompoundedCatalogSubtitle,
  renderCompoundedPharmacyInstructions,
  renderCompoundedPrescriptionLine,
  renderCompoundedRecommendations,
} from '../compoundedV2Render'

interface ManipuladosV2EditorProps {
  value: CompoundedMedicationV2
  onChange: (next: CompoundedMedicationV2) => void
  onSave: () => void
  onDelete?: () => void
  saving?: boolean
  selectedRegimenId: string
  onSelectRegimen: (id: string) => void
  legacyNotice?: string
  saveLabel?: string
}

const INGREDIENT_MODE_OPTIONS: Array<{ value: CompoundedV2IngredientMode; label: string }> = [
  { value: 'fixed_per_unit', label: 'Quantidade fixa por dose' },
  { value: 'fixed_total_formula', label: 'Quantidade fixa na fórmula toda' },
  { value: 'derived_from_regimen', label: 'Calculado pela dose do paciente' },
  { value: 'concentration_based', label: 'Calculado pela concentração final' },
  { value: 'vehicle_or_base', label: 'Base / veículo / q.s.p.' },
  { value: 'excipient', label: 'Excipiente / componente tecnológico' },
]

const INGREDIENT_ROLE_OPTIONS = [
  { value: 'active', label: 'Ativo' },
  { value: 'vehicle', label: 'Veículo' },
  { value: 'excipient', label: 'Excipiente' },
  { value: 'base', label: 'Base' },
]

const REGIMEN_SPECIES_OPTIONS = [
  { value: 'Canina', label: 'Cão' },
  { value: 'Felina', label: 'Gato' },
  { value: 'Ambos', label: 'Ambos' },
]

function patchFormula(value: CompoundedMedicationV2, patch: Partial<CompoundedMedicationV2['formula']>): CompoundedMedicationV2 {
  return { ...value, formula: { ...value.formula, ...patch } }
}

function patchIngredient(value: CompoundedMedicationV2, id: string, patch: Partial<CompoundedV2Ingredient>): CompoundedMedicationV2 {
  return { ...value, ingredients: value.ingredients.map((ingredient) => (ingredient.id === id ? { ...ingredient, ...patch } : ingredient)) }
}

function patchRegimen(value: CompoundedMedicationV2, id: string, patch: Partial<CompoundedV2Regimen>): CompoundedMedicationV2 {
  return { ...value, regimens: value.regimens.map((regimen) => (regimen.id === id ? { ...regimen, ...patch } : regimen)) }
}

function buildBlankIngredient(administrationUnit: string): CompoundedV2Ingredient {
  return {
    id: crypto.randomUUID(),
    name: '',
    role: 'active',
    amount: null,
    unit: 'mg',
    note: '',
    is_controlled: false,
    definition_mode: 'fixed_per_unit',
    target_unit: administrationUnit,
    calculation_basis: 'na',
    multiplier: null,
    concentration_value: null,
    concentration_unit: '',
    use_regimen_directly: false,
    follows_primary_regimen: false,
  }
}

function addIngredient(value: CompoundedMedicationV2): CompoundedMedicationV2 {
  return { ...value, ingredients: [...value.ingredients, buildBlankIngredient(value.formula.administration_unit)] }
}

function removeIngredient(value: CompoundedMedicationV2, id: string): CompoundedMedicationV2 {
  const next = value.ingredients.filter((ingredient) => ingredient.id !== id)
  return { ...value, ingredients: next.length ? next : [buildBlankIngredient(value.formula.administration_unit)] }
}

function addRegimen(value: CompoundedMedicationV2): CompoundedMedicationV2 {
  const administrationUnit = value.formula.administration_unit || getAdministrationUnitOptions(value.formula.archetype)[0]?.value || 'mL'
  const blank: CompoundedV2Regimen = {
    id: crypto.randomUUID(),
    name: `Regime ${value.regimens.length + 1}`,
    species: getFormulaSpeciesScope(value.formula.species) === 'Ambos' ? 'Canina' : value.formula.species[0] || 'Canina',
    clinical_indication: '',
    scenario: '',
    dose_mode: value.formula.formula_type === 'clinical_dose_oriented' ? 'by_weight' : 'fixed',
    dose_min: 1,
    dose_max: null,
    dose_unit: getDoseUnitOptions(value.formula.archetype)[0]?.value || 'mg',
    dose_basis: value.formula.formula_type === 'clinical_dose_oriented' ? 'kg' : 'na',
    concentration_value: null,
    concentration_unit: '',
    administration_unit: administrationUnit,
    frequency_mode: 'interval_hours',
    frequency_min: 12,
    frequency_max: null,
    frequency_text: '',
    duration_mode: 'fixed',
    duration_value: 7,
    duration_unit: 'dias',
    duration_text: '',
    usage_instruction: '',
    tutor_observation: '',
    internal_note: '',
    pharmacy_note: '',
    pharmacy_strategy: getDefaultPharmacyStrategy(value.formula.archetype, administrationUnit),
    is_default: value.regimens.length === 0,
  }
  blank.usage_instruction = getDefaultUsageInstruction(value.formula, blank)
  return { ...value, regimens: [...value.regimens.map((entry) => ({ ...entry, is_default: false })), blank] }
}

function removeRegimen(value: CompoundedMedicationV2, id: string): CompoundedMedicationV2 {
  const next = value.regimens.filter((regimen) => regimen.id !== id)
  if (!next.length) return addRegimen({ ...value, regimens: [] })
  return { ...value, regimens: next.map((regimen, index) => ({ ...regimen, is_default: index === 0 ? true : regimen.is_default })) }
}

function toneClass(tone: string): string {
  if (tone === 'red') return 'border-red-500/30 bg-red-500/10 text-red-300'
  if (tone === 'blue') return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200'
  if (tone === 'green') return 'border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)] text-[color:color-mix(in_srgb,var(--rxv-primary)_72%,#e2e8f0)]'
  return 'border-slate-700 bg-slate-900/40 text-slate-300'
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-[11px] leading-5 text-slate-500">{children}</p>
}

function normalizeTutorRecommendations(raw: string): string[] {
  return String(raw || '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
}

function joinTutorRecommendations(items: string[]): string {
  return items.filter(Boolean).join('\n')
}

function effectiveIngredientMode(mode?: CompoundedV2IngredientMode): CompoundedV2IngredientMode {
  return mode === 'derived_from_regimen_with_multiplier' ? 'derived_from_regimen' : mode || 'fixed_per_unit'
}

function getIngredientHint(mode: CompoundedV2IngredientMode): string {
  if (mode === 'fixed_per_unit') return 'Use quando cada cápsula, biscoito, click ou gota já tem uma quantidade fixa.'
  if (mode === 'fixed_total_formula') return 'Use quando o ingrediente é definido na fórmula inteira, e não por dose.'
  if (mode === 'derived_from_regimen') return 'O valor será resolvido automaticamente a partir da dose clínica do paciente.'
  if (mode === 'concentration_based') return 'Use quando a farmácia define o ingrediente por mg/mL, mg/click, mg/gota ou %.'
  if (mode === 'vehicle_or_base') return 'Base, veículo ou q.s.p.; não entra como ativo calculado.'
  return 'Use para componentes tecnológicos opcionais da formulação.'
}

function buildIngredientTargetOptions(administrationUnit: string) {
  const base = ['cápsula', 'comprimido', 'biscoito', 'sachê', 'click', 'pump', 'gota', 'mL', 'unidade']
  return Array.from(new Set([administrationUnit, ...base].filter(Boolean))).map((value) => ({ value, label: `1 ${value}` }))
}

function handleFormulaArchetypeChange(value: CompoundedMedicationV2, nextArchetype: CompoundedMedicationV2['formula']['archetype']): CompoundedMedicationV2 {
  const administrationUnit = getAdministrationUnitOptions(nextArchetype)[0]?.value || value.formula.administration_unit
  const primaryRoute = getPrimaryRouteOptions(nextArchetype)[0]?.value || value.formula.primary_route
  const nextFormula = { ...value.formula, archetype: nextArchetype, administration_unit: administrationUnit, primary_route: primaryRoute }
  return {
    ...value,
    formula: nextFormula,
    regimens: value.regimens.map((regimen) => ({
      ...regimen,
      administration_unit: administrationUnit,
      dose_unit: regimen.dose_unit || getDoseUnitOptions(nextArchetype)[0]?.value || 'mg',
      concentration_unit: regimen.concentration_unit || getConcentrationUnitOptions(nextArchetype)[0]?.value || '',
      pharmacy_strategy: regimen.pharmacy_strategy || getDefaultPharmacyStrategy(nextArchetype, administrationUnit),
      usage_instruction: regimen.usage_instruction || getDefaultUsageInstruction(nextFormula, regimen),
    })),
    ingredients: value.ingredients.map((ingredient) => ({ ...ingredient, target_unit: ingredient.target_unit || administrationUnit })),
  }
}

export function ManipuladosV2Editor(props: ManipuladosV2EditorProps) {
  const { value, onChange, onSave, onDelete, saving = false, selectedRegimenId, onSelectRegimen, legacyNotice = '', saveLabel = 'Salvar catálogo' } = props
  const activeRegimen = value.regimens.find((regimen) => regimen.id === selectedRegimenId) || value.regimens[0]
  const badges = getCompoundedBadgeMeta(value)
  const speciesScope = getFormulaSpeciesScope(value.formula.species)
  const administrationUnitOptions = getAdministrationUnitOptions(value.formula.archetype)
  const primaryRouteOptions = getPrimaryRouteOptions(value.formula.archetype)
  const doseUnitOptions = getDoseUnitOptions(value.formula.archetype)
  const concentrationUnitOptions = getConcentrationUnitOptions(value.formula.archetype)
  const vehicleSelection = resolveVehicleSelection(value.formula.archetype, value.formula.vehicle)
  const flavorSelection = resolveFlavorSelection(value.formula.archetype, value.formula.flavor)
  const excipientSelection = resolveExcipientSelection(value.formula.excipient_base)
  const needsConcentration = activeRegimen ? requiresConcentration(value.formula, activeRegimen) : false
  const recommendations = renderCompoundedRecommendations(value, activeRegimen?.id)
  const tutorCareOptions = getTutorCareOptions(value.formula.archetype)

  const previewSummary = useMemo(
    () => ({
      subtitle: getCompoundedCatalogSubtitle(value),
      tutor: renderCompoundedPrescriptionLine(value, null, activeRegimen?.id),
      pharmacy: renderCompoundedPharmacyInstructions(value, null, activeRegimen?.id),
    }),
    [value, activeRegimen?.id],
  )

  const recommendationChips = Array.from(new Set([...tutorCareOptions, ...recommendations])).filter(Boolean)

  return (
    <div className="space-y-5">
      <RxvCard className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <RxvSectionHeader icon="science" title={value.formula.name || 'Manipulado V2'} subtitle={previewSummary.subtitle || `${getArchetypeLabel(value.formula.archetype)} • editor clínico do catálogo magistral`} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span key={badge.label} className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${toneClass(badge.tone)}`}>{badge.label}</span>
              ))}
            </div>
            {legacyNotice ? <p className="mt-3 text-xs font-semibold text-amber-300">{legacyNotice}</p> : null}
          </div>
          <div className="flex gap-2">
            {onDelete ? <RxvButton variant="danger" onClick={onDelete}>Excluir</RxvButton> : null}
            <RxvButton variant="primary" onClick={onSave} loading={saving}>{saveLabel}</RxvButton>
          </div>
        </div>
      </RxvCard>

      <RxvCard className="p-6">
        <RxvSectionHeader icon="badge" title="Bloco 1 • Identidade" subtitle="O que aparece no catálogo e guia a prescrição clínica." />
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-2">
          <RxvField label="Nome da fórmula">
            <RxvInput value={value.formula.name} onChange={(event) => onChange(patchFormula(value, { name: event.target.value }))} placeholder="Ex.: Benazepril biscoito palatável" />
          </RxvField>
          <RxvField label="Resumo curto">
            <RxvInput value={value.formula.short_description} onChange={(event) => onChange(patchFormula(value, { short_description: event.target.value }))} placeholder="Resumo clínico curto para lista e seleção." />
          </RxvField>
          <RxvField label="Arquétipo">
            <RxvSelect value={value.formula.archetype} onChange={(event) => onChange(handleFormulaArchetypeChange(value, event.target.value as CompoundedMedicationV2['formula']['archetype']))} options={ARCHETYPE_OPTIONS} />
          </RxvField>
          <RxvField label="Forma farmacêutica">
            <RxvSelect value={value.formula.pharmaceutical_form} onChange={(event) => onChange(patchFormula(value, syncFormulaPreset(value.formula, event.target.value)))} options={ALL_FORM_OPTIONS} />
          </RxvField>
          <RxvField label="Espécies-alvo">
            <RxvSelect value={speciesScope} onChange={(event) => onChange(patchFormula(value, { species: speciesScopeToArray(event.target.value) }))} options={SPECIES_SCOPE_OPTIONS} />
          </RxvField>
          <RxvField label="Unidade de administração">
            <RxvSelect
              value={value.formula.administration_unit}
              onChange={(event) =>
                onChange({
                  ...patchFormula(value, { administration_unit: event.target.value }),
                  regimens: value.regimens.map((regimen) => ({ ...regimen, administration_unit: event.target.value })),
                })
              }
              options={administrationUnitOptions}
            />
          </RxvField>
          <RxvField label="Via principal">
            <RxvSelect value={value.formula.primary_route} onChange={(event) => onChange(patchFormula(value, { primary_route: event.target.value }))} options={primaryRouteOptions} />
          </RxvField>
          <RxvField label="Classificação de venda">
            <RxvSelect value={value.formula.sale_classification} onChange={(event) => onChange(patchFormula(value, { sale_classification: event.target.value as SaleClassification }))} options={SALE_CLASSIFICATION_OPTIONS} />
          </RxvField>
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <RxvToggle checked={value.formula.is_active} onChange={(checked) => onChange(patchFormula(value, { is_active: checked }))} label="Ativo no catálogo" />
          <RxvToggle checked={value.formula.is_continuous_use} onChange={(checked) => onChange(patchFormula(value, { is_continuous_use: checked }))} label="Uso contínuo" />
        </div>
      </RxvCard>

      <RxvCard className="p-6">
        <RxvSectionHeader icon="medication" title="Bloco 2 • Como esse item é prescrito" subtitle="Regime clínico com leitura imediata do que vai para a receita." />
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-[220px_minmax(0,1fr)]">
          <div className="space-y-2 xl:sticky xl:top-6 xl:self-start">
            {value.regimens.map((regimen) => (
              <button
                key={regimen.id}
                type="button"
                onClick={() => onSelectRegimen(regimen.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  activeRegimen?.id === regimen.id ? 'border-[color:color-mix(in_srgb,var(--rxv-primary)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,var(--rxv-surface))]' : 'border-slate-800 bg-black/20 hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_20%,transparent)]'
                }`}
              >
                <p className="text-sm font-black text-white">{regimen.name || 'Regime sem nome'}</p>
                <p className="mt-1 text-xs text-slate-400">{regimen.clinical_indication || 'Sem indicação clínica definida.'}</p>
              </button>
            ))}
            <RxvButton variant="secondary" className="w-full justify-center" onClick={() => onChange(addRegimen(value))}>Novo regime</RxvButton>
          </div>

          {activeRegimen ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
                <div className="xl:col-span-8 2xl:col-span-9">
                  <RxvField label="Nome do regime">
                    <RxvInput value={activeRegimen.name} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { name: event.target.value }))} placeholder="Ex.: Controle pressórico canino" />
                  </RxvField>
                </div>
                <div className="xl:col-span-4 2xl:col-span-3">
                  <RxvField label="Espécie do regime">
                    <RxvSelect value={activeRegimen.species} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { species: event.target.value }))} options={REGIMEN_SPECIES_OPTIONS} />
                  </RxvField>
                </div>
                <div className="xl:col-span-12">
                  <RxvField label="Indicação clínica">
                    <RxvInput value={activeRegimen.clinical_indication} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { clinical_indication: event.target.value }))} placeholder="Quando esse regime costuma ser usado." />
                  </RxvField>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
                <div className="rounded-2xl border border-slate-800 bg-black/20 p-6 xl:col-span-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Posologia principal</p>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
                    <RxvField label="Tipo de dose" className="xl:col-span-4">
                      <RxvSelect
                        value={activeRegimen.dose_mode}
                        onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { dose_mode: event.target.value as CompoundedV2Regimen['dose_mode'] }))}
                        options={[{ value: 'fixed', label: 'Dose fixa por unidade' }, { value: 'by_weight', label: 'Dose calculada por peso' }]}
                      />
                    </RxvField>
                    <RxvField label="Dose" className="xl:col-span-2">
                      <RxvInput value={activeRegimen.dose_min ?? ''} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { dose_min: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} placeholder="Ex.: 0,5" />
                    </RxvField>
                    <RxvField label="Unidade da dose" className="xl:col-span-2">
                      <RxvSelect value={activeRegimen.dose_unit} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { dose_unit: event.target.value }))} options={doseUnitOptions} />
                    </RxvField>
                    <RxvField label="Como a dose é calculada" className="xl:col-span-3">
                      <RxvSelect value={activeRegimen.dose_basis} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { dose_basis: event.target.value }))} options={DOSE_BASIS_OPTIONS} />
                    </RxvField>
                  </div>
                  {needsConcentration ? (
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
                      <RxvField label="Concentração da formulação" className="xl:col-span-5">
                        <RxvInput value={activeRegimen.concentration_value ?? ''} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { concentration_value: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} placeholder="Ex.: 100" />
                      </RxvField>
                      <RxvField label="Unidade da concentração" className="xl:col-span-7">
                        <RxvSelect value={activeRegimen.concentration_unit} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { concentration_unit: event.target.value }))} options={concentrationUnitOptions} />
                      </RxvField>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-slate-800 bg-black/20 p-6 xl:col-span-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Frequência e duração</p>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
                    <RxvField label="Frequência" className="xl:col-span-4">
                      <RxvSelect value={activeRegimen.frequency_mode} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { frequency_mode: event.target.value as CompoundedV2Regimen['frequency_mode'] }))} options={FREQUENCY_MODE_OPTIONS} />
                    </RxvField>
                    <RxvField label={activeRegimen.frequency_mode === 'times_per_day' ? 'Vezes ao dia' : activeRegimen.frequency_mode === 'interval_hours' ? 'Intervalo' : 'Texto livre'} className="xl:col-span-4">
                      {activeRegimen.frequency_mode === 'times_per_day' ? (
                        <RxvSelect value={String(activeRegimen.frequency_min ?? 1)} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { frequency_min: Number(event.target.value), frequency_text: `${event.target.value}x/dia` }))} options={TIMES_PER_DAY_OPTIONS} />
                      ) : activeRegimen.frequency_mode === 'interval_hours' ? (
                        <RxvSelect value={String(activeRegimen.frequency_min ?? 12)} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { frequency_min: Number(event.target.value), frequency_text: `a cada ${event.target.value} horas` }))} options={INTERVAL_HOUR_OPTIONS} />
                      ) : (
                        <RxvInput value={activeRegimen.frequency_text} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { frequency_text: event.target.value }))} placeholder="Ex.: conforme orientação" />
                      )}
                    </RxvField>
                    <RxvField label="Duração" className="xl:col-span-2">
                      <RxvInput value={activeRegimen.duration_value ?? ''} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { duration_value: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} placeholder="Ex.: 14" disabled={activeRegimen.duration_mode !== 'fixed'} />
                    </RxvField>
                    <RxvField label="Unidade da duração" className="xl:col-span-2">
                      <RxvSelect
                        value={activeRegimen.duration_mode === 'fixed' ? activeRegimen.duration_unit : activeRegimen.duration_mode === 'continuous_until_recheck' ? 'recheck' : 'continuous'}
                        onChange={(event) => {
                          const kind = event.target.value
                          if (kind === 'continuous') return onChange(patchRegimen(value, activeRegimen.id, { duration_mode: 'continuous_until_recheck', duration_value: null, duration_unit: 'dias', duration_text: 'uso contínuo' }))
                          if (kind === 'recheck') return onChange(patchRegimen(value, activeRegimen.id, { duration_mode: 'continuous_until_recheck', duration_value: null, duration_unit: 'dias', duration_text: 'até reavaliação' }))
                          if (kind === 'single') return onChange(patchRegimen(value, activeRegimen.id, { duration_mode: 'free_text', duration_value: 1, duration_unit: 'dose', duration_text: 'dose única' }))
                          onChange(patchRegimen(value, activeRegimen.id, { duration_mode: 'fixed', duration_unit: kind, duration_text: '' }))
                        }}
                        options={DURATION_KIND_OPTIONS}
                      />
                    </RxvField>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
                <RxvField label="Orientação base de uso" className="xl:col-span-7">
                  <RxvTextarea value={activeRegimen.usage_instruction} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { usage_instruction: event.target.value }))} placeholder="Texto principal da posologia que o tutor verá." />
                </RxvField>
                <RxvField label="Cuidados e recomendações ao tutor" className="xl:col-span-5">
                  <div className="space-y-3">
                    <RxvTextarea value={activeRegimen.tutor_observation} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { tutor_observation: event.target.value }))} placeholder="Cada linha vira uma recomendação separada no preview e no PDF." />
                    <div className="flex flex-wrap gap-2">
                      {recommendationChips.map((entry) => {
                        const isActive = normalizeTutorRecommendations(activeRegimen.tutor_observation).includes(entry)
                        return (
                          <button
                            key={entry}
                            type="button"
                            onClick={() => {
                              const current = normalizeTutorRecommendations(activeRegimen.tutor_observation)
                              const next = isActive ? current.filter((line) => line !== entry) : [...current, entry]
                              onChange(patchRegimen(value, activeRegimen.id, { tutor_observation: joinTutorRecommendations(next) }))
                            }}
                            className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                              isActive ? 'border-[color:color-mix(in_srgb,var(--rxv-primary)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_10%,transparent)] text-[color:color-mix(in_srgb,var(--rxv-primary)_72%,#e2e8f0)]' : 'border-slate-700 bg-slate-900/40 text-slate-400'
                            }`}
                          >
                            {entry}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </RxvField>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[linear-gradient(180deg,rgba(59, 130, 246,0.08),rgba(0,0,0,0.12))] p-6 xl:col-span-12">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Preview imediato</p>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  <div className="rounded-2xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_18%,transparent)] bg-black/30 px-4 py-4">
                    <div className="flex items-end gap-3">
                      <p className="min-w-0 flex-none text-base font-black text-white">{value.formula.name || 'Fórmula sem nome'}</p>
                      <div className="hidden h-px flex-1 bg-[radial-gradient(circle,rgba(148,163,184,0.75)_1px,transparent_1.5px)] bg-[length:10px_1px] bg-repeat-x xl:block" />
                      <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{previewSummary.subtitle || 'Sem apresentação'}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{previewSummary.tutor || 'A posologia final aparecerá aqui conforme o regime.'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-black/20 px-4 py-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Manipulação</p>
                    <p className="mt-2 leading-7">{previewSummary.pharmacy || 'A instrução de manipulação aparecerá aqui conforme a fórmula.'}</p>
                  </div>
                  {recommendations.length ? (
                    <ul className="list-disc space-y-1.5 pl-5 leading-6">
                      {recommendations.map((entry) => <li key={entry}>{entry}</li>)}
                    </ul>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <RxvButton variant="danger" onClick={() => onChange(removeRegimen(value, activeRegimen.id))} disabled={value.regimens.length <= 1}>Excluir regime</RxvButton>
                <RxvButton variant="secondary" onClick={() => onChange(patchRegimen(value, activeRegimen.id, { is_default: true }))}>Tornar padrão</RxvButton>
              </div>
            </div>
          ) : null}
        </div>
      </RxvCard>

      <RxvCard className="p-5 2xl:p-6">
        <RxvSectionHeader icon="science" title="Bloco 3 • Como a farmácia manipula" subtitle="Estruture a fórmula sem contaminar o texto final do tutor." />
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
          <RxvField label="Q.S.P." className="xl:col-span-6">
            <RxvInput value={value.formula.qsp_text} onChange={(event) => onChange(patchFormula(value, { qsp_text: event.target.value }))} placeholder="Ex.: 30 unidades, 60 mL, 10 mL" />
            <FieldHint>Use o alvo final da manipulação. Se o Q.S.P. já resolve, ele basta.</FieldHint>
          </RxvField>
          <RxvField label="Apresentação final" className="xl:col-span-5">
            <RxvInput value={value.formula.total_quantity_text} onChange={(event) => onChange(patchFormula(value, { total_quantity_text: event.target.value }))} placeholder="Ex.: 30 biscoitos, 60 mL, 20 cápsulas" />
            <FieldHint>Resumo útil para catálogo e card da receita.</FieldHint>
          </RxvField>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 xl:grid-cols-12">
          {shouldShowVehicle(value.formula.archetype) ? (
            <RxvField label="Veículo" className="xl:col-span-4">
              <RxvSelect value={vehicleSelection.selected} onChange={(event) => onChange(patchFormula(value, { vehicle: event.target.value === 'nenhum' ? '' : event.target.value === 'adicionar_manualmente' ? vehicleSelection.customValue : event.target.value }))} options={getVehicleOptions(value.formula.archetype)} />
              {vehicleSelection.selected === 'adicionar_manualmente' ? <RxvInput className="mt-2" value={vehicleSelection.customValue} onChange={(event) => onChange(patchFormula(value, { vehicle: event.target.value }))} placeholder="Descreva o veículo manualmente" /> : null}
            </RxvField>
          ) : null}
          {shouldShowFlavor(value.formula.archetype) ? (
            <RxvField label="Sabor / fragrância" className="xl:col-span-4">
              <RxvSelect value={flavorSelection.selected} onChange={(event) => onChange(patchFormula(value, { flavor: event.target.value === 'nenhum' ? '' : event.target.value === 'adicionar_manualmente' ? flavorSelection.customValue : event.target.value }))} options={getFlavorOptions(value.formula.archetype)} />
              {flavorSelection.selected === 'adicionar_manualmente' ? <RxvInput className="mt-2" value={flavorSelection.customValue} onChange={(event) => onChange(patchFormula(value, { flavor: event.target.value }))} placeholder="Descreva o sabor ou fragrância" /> : null}
            </RxvField>
          ) : null}
          {shouldShowExcipientBase(value.formula.archetype) ? (
            <RxvField label="Base / excipiente farmacêutico" className="xl:col-span-4">
              <RxvSelect value={excipientSelection.selected} onChange={(event) => onChange(patchFormula(value, { excipient_base: event.target.value === 'nenhum' ? '' : event.target.value === 'adicionar_manualmente' ? excipientSelection.customValue : event.target.value }))} options={[...BASE_EXCIPIENT_OPTIONS, { value: 'adicionar_manualmente', label: 'adicionar manualmente' }]} />
              {excipientSelection.selected === 'adicionar_manualmente' ? <RxvInput className="mt-2" value={excipientSelection.customValue} onChange={(event) => onChange(patchFormula(value, { excipient_base: event.target.value }))} placeholder="Descreva a base ou excipiente" /> : null}
            </RxvField>
          ) : null}
        </div>

        <div className="mt-5 space-y-4">
          {value.ingredients.map((ingredient, index) => {
            const mode = effectiveIngredientMode(ingredient.definition_mode)
            const targetOptions = buildIngredientTargetOptions(value.formula.administration_unit)
            return (
              <div key={ingredient.id} className="rounded-2xl border border-slate-800 bg-black/20 p-5">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-12">
                  <div className="xl:col-span-5">
                    <RxvField label={`Ingrediente ${index + 1}`}>
                      <RxvInput value={ingredient.name} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { name: event.target.value }))} placeholder="Nome do ingrediente" />
                    </RxvField>
                  </div>
                  <div className="xl:col-span-3 2xl:col-span-2">
                    <RxvField label="Função">
                      <RxvSelect value={ingredient.role} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { role: event.target.value as CompoundedV2Ingredient['role'] }))} options={INGREDIENT_ROLE_OPTIONS} />
                    </RxvField>
                  </div>
                  <div className="xl:col-span-4">
                    <RxvField label="Como esse ingrediente entra na fórmula?">
                      <RxvSelect value={mode} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { definition_mode: event.target.value as CompoundedV2IngredientMode }))} options={INGREDIENT_MODE_OPTIONS} />
                      <FieldHint>{getIngredientHint(mode)}</FieldHint>
                    </RxvField>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-12">
                  {mode === 'fixed_per_unit' ? (
                    <>
                      <div className="xl:col-span-3">
                        <RxvField label="Quantidade">
                          <RxvInput value={ingredient.amount ?? ''} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { amount: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} />
                        </RxvField>
                      </div>
                      <div className="xl:col-span-3">
                        <RxvField label="Unidade">
                          <RxvSelect value={ingredient.unit || 'mg'} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { unit: event.target.value }))} options={doseUnitOptions} />
                        </RxvField>
                      </div>
                      <div className="xl:col-span-6">
                        <RxvField label="Cada dose corresponde a">
                          <RxvSelect value={ingredient.target_unit || value.formula.administration_unit} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { target_unit: event.target.value }))} options={targetOptions} />
                        </RxvField>
                      </div>
                    </>
                  ) : null}

                  {mode === 'fixed_total_formula' ? (
                    <>
                      <div className="xl:col-span-3">
                        <RxvField label="Quantidade total">
                          <RxvInput value={ingredient.amount ?? ''} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { amount: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} />
                        </RxvField>
                      </div>
                      <div className="xl:col-span-3">
                        <RxvField label="Unidade">
                          <RxvSelect value={ingredient.unit || 'mg'} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { unit: event.target.value }))} options={doseUnitOptions} />
                        </RxvField>
                      </div>
                    </>
                  ) : null}

                  {mode === 'derived_from_regimen' ? (
                    <>
                      <div className="xl:col-span-4">
                        <RxvField label="Esse ingrediente acompanha a dose principal do regime?">
                          <RxvSelect value={ingredient.follows_primary_regimen ? 'sim' : 'nao'} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { follows_primary_regimen: event.target.value === 'sim' }))} options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]} />
                        </RxvField>
                      </div>
                      <div className="xl:col-span-4">
                        <RxvField label="Cada dose corresponde a">
                          <RxvSelect value={ingredient.target_unit || value.formula.administration_unit} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { target_unit: event.target.value }))} options={targetOptions} />
                        </RxvField>
                      </div>
                      <div className="xl:col-span-4">
                        <RxvField label="Usar a dose clínica exatamente como está no regime?">
                          <RxvSelect value={ingredient.use_regimen_directly ? 'sim' : 'nao'} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { use_regimen_directly: event.target.value === 'sim' }))} options={[{ value: 'sim', label: 'Sim, usar direto' }, { value: 'nao', label: 'Não, aplicar ajuste' }]} />
                        </RxvField>
                      </div>
                      {!ingredient.use_regimen_directly ? (
                        <>
                          <div className="xl:col-span-3">
                            <RxvField label="Dose base">
                              <RxvInput value={ingredient.amount ?? ''} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { amount: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} />
                              <FieldHint>Use só quando este ingrediente não acompanhar automaticamente a dose principal do regime.</FieldHint>
                            </RxvField>
                          </div>
                          <div className="xl:col-span-3">
                            <RxvField label="Unidade">
                              <RxvSelect value={ingredient.unit || activeRegimen?.dose_unit || 'mg'} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { unit: event.target.value }))} options={doseUnitOptions} />
                            </RxvField>
                          </div>
                          <div className="xl:col-span-3">
                            <RxvField label="Base do cálculo">
                              <RxvSelect value={ingredient.calculation_basis || 'na'} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { calculation_basis: event.target.value as CompoundedV2Ingredient['calculation_basis'] }))} options={DOSE_BASIS_OPTIONS} />
                            </RxvField>
                          </div>
                          <div className="xl:col-span-3">
                            <RxvField label="Multiplicador">
                              <RxvInput value={ingredient.multiplier ?? ''} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { multiplier: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} placeholder="Ex.: 1, 0,5, 2" />
                            </RxvField>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}

                  {mode === 'concentration_based' ? (
                    <>
                      <div className="xl:col-span-4">
                        <RxvField label="Concentração-alvo">
                          <RxvInput value={ingredient.concentration_value ?? ''} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { concentration_value: event.target.value === '' ? null : Number(String(event.target.value).replace(',', '.')) }))} />
                        </RxvField>
                      </div>
                      <div className="xl:col-span-4">
                        <RxvField label="Unidade da concentração">
                          <RxvSelect value={ingredient.concentration_unit || concentrationUnitOptions[0]?.value || ''} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { concentration_unit: event.target.value }))} options={concentrationUnitOptions} />
                        </RxvField>
                      </div>
                    </>
                  ) : null}

                  {mode === 'vehicle_or_base' ? (
                    <div className="xl:col-span-12">
                      <FieldHint>Esse ingrediente é base/veículo/q.s.p. e não entra como ativo calculado. Use a observação técnica para detalhar a farmácia quando necessário.</FieldHint>
                    </div>
                  ) : null}

                  <div className="xl:col-span-12">
                    <RxvField label="Observação técnica">
                      <RxvTextarea value={ingredient.note} onChange={(event) => onChange(patchIngredient(value, ingredient.id, { note: event.target.value }))} placeholder="Detalhes técnicos opcionais para a farmácia ou para o catálogo." />
                    </RxvField>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <RxvToggle checked={ingredient.is_controlled} onChange={(checked) => onChange(patchIngredient(value, ingredient.id, { is_controlled: checked }))} label="Ingrediente controlado" />
                  <RxvButton variant="danger" onClick={() => onChange(removeIngredient(value, ingredient.id))}>Excluir ingrediente</RxvButton>
                </div>
              </div>
            )
          })}
          <RxvButton variant="secondary" onClick={() => onChange(addIngredient(value))}>Adicionar ingrediente</RxvButton>
        </div>

        {activeRegimen ? (
          <div className="mt-5 rounded-2xl border border-slate-800 bg-black/20 p-5 2xl:p-6">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Detalhes farmacotécnicos do regime</p>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <RxvField label="Como a farmácia ajusta a formulação">
                <RxvSelect value={activeRegimen.pharmacy_strategy} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { pharmacy_strategy: event.target.value as CompoundedV2Regimen['pharmacy_strategy'] }))} options={PHARMACY_STRATEGY_OPTIONS} />
              </RxvField>
              <RxvField label="Instrução para a farmácia">
                <RxvTextarea value={activeRegimen.pharmacy_note} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { pharmacy_note: event.target.value }))} placeholder="Observação farmacotécnica complementar." />
              </RxvField>
              <RxvField label="Nota clínica interna">
                <RxvTextarea value={activeRegimen.internal_note} onChange={(event) => onChange(patchRegimen(value, activeRegimen.id, { internal_note: event.target.value }))} placeholder="Nota interna. Não imprime na receita." />
              </RxvField>
            </div>
          </div>
        ) : null}
      </RxvCard>
    </div>
  )
}

export default ManipuladosV2Editor
