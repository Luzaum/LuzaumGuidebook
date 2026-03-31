import { getDosageFormPreset, type ClinicalPharmacyStrategy } from '????./compoundedClinicalText'
import type { CompoundedMedicationV2, CompoundedV2Archetype, CompoundedV2Regimen } from '????./compoundedV2'

export interface OptionItem {
  value: string
  label: string
}

type VehiclePresetMap = Record<CompoundedV2Archetype, string[]>

export const SPECIES_SCOPE_OPTIONS: OptionItem[] = [
  { value: 'Canina', label: 'Cão' },
  { value: 'Felina', label: 'Gato' },
  { value: 'Ambos', label: 'Ambos' },
]

export const FORM_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, string[]> = {
  oral_liquido: ['Suspensão oral', 'Solução oral', 'Xarope', 'Emulsão oral', 'Pasta oral', 'Calda', 'Molho'],
  oral_unitario: ['Cápsula', 'Cápsula gastrorresistente', 'Comprimido', 'Comprimido palatável', 'Biscoito medicamentoso', 'Sachê', 'Filme oral', 'Tablete mastigável'],
  transdermico_dosado: ['Gel transdérmico', 'Creme transdérmico'],
  topico_livre: ['Pomada', 'Creme', 'Loção', 'Spray', 'Gel tópico', 'Shampoo', 'Condicionador', 'Banho seco', 'Lenço'],
  oto_oftalmico_local: ['Colírio', 'Solução otológica', 'Pó otológico', 'Gel dental', 'Creme dental', 'Enxaguatório', 'Solução irrigadora', 'Espuma bucal'],
  procedural_injetavel: ['Solução injetável'],
}

export const ALL_FORM_OPTIONS: OptionItem[] = Array????.from(
  new Set(Object????.values(FORM_OPTIONS_BY_ARCHETYPE)????.flat()),
)????.map((value) => ({ value, label: value }))

export const ADMINISTRATION_UNIT_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [
    { value: 'mL', label: 'mL' },
    { value: 'gota', label: 'gota' },
    { value: 'dose', label: 'dose' },
    { value: 'g', label: 'g' },
    { value: 'aplicação', label: 'aplicação' },
  ],
  oral_unitario: [
    { value: 'cápsula', label: 'cápsula' },
    { value: 'comprimido', label: 'comprimido' },
    { value: 'sachê', label: 'sachê' },
    { value: 'biscoito', label: 'biscoito' },
    { value: 'tablete', label: 'tablete' },
    { value: 'unidade', label: 'unidade' },
  ],
  transdermico_dosado: [
    { value: 'click', label: 'click' },
    { value: 'pump', label: 'pump' },
    { value: 'mL', label: 'mL' },
    { value: 'aplicação', label: 'aplicação' },
  ],
  topico_livre: [
    { value: 'aplicação', label: 'aplicação' },
    { value: 'jato', label: 'jato' },
    { value: 'mL', label: 'mL' },
    { value: 'g', label: 'g' },
    { value: 'unidade', label: 'unidade' },
  ],
  oto_oftalmico_local: [
    { value: 'gota', label: 'gota' },
    { value: 'aplicação', label: 'aplicação' },
    { value: 'jato', label: 'jato' },
    { value: 'mL', label: 'mL' },
    { value: 'filme', label: 'filme' },
    { value: 'unidade', label: 'unidade' },
  ],
  procedural_injetavel: [
    { value: 'mL', label: 'mL' },
    { value: 'ampola', label: 'ampola' },
    { value: 'dose', label: 'dose' },
    { value: 'unidade', label: 'unidade' },
  ],
}

export const PRIMARY_ROUTE_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [{ value: 'VO', label: 'Via oral' }],
  oral_unitario: [{ value: 'VO', label: 'Via oral' }],
  transdermico_dosado: [{ value: 'Transdérmica', label: 'Transdérmica' }],
  topico_livre: [{ value: 'Tópica', label: 'Tópica' }],
  oto_oftalmico_local: [
    { value: 'Oftálmica', label: 'Oftálmica' },
    { value: 'Otológica', label: 'Otológica' },
    { value: 'Bucal', label: 'Bucal local' },
  ],
  procedural_injetavel: [
    { value: 'SC', label: 'Subcutânea (SC)' },
    { value: 'IM', label: 'Intramuscular (IM)' },
    { value: 'IV', label: 'Intravenosa (IV)' },
  ],
}

export const DOSE_UNIT_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'gota', label: 'gota' }, { value: 'UI', label: 'UI' }],
  oral_unitario: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'UI', label: 'UI' }, { value: 'cápsula', label: 'cápsula' }, { value: 'comprimido', label: 'comprimido' }, { value: 'biscoito', label: 'biscoito' }, { value: 'sachê', label: 'sachê' }, { value: 'unidade', label: 'unidade' }],
  transdermico_dosado: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'click', label: 'click' }, { value: 'pump', label: 'pump' }],
  topico_livre: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'g', label: 'g' }, { value: 'aplicação', label: 'aplicação' }],
  oto_oftalmico_local: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'gota', label: 'gota' }, { value: 'aplicação', label: 'aplicação' }],
  procedural_injetavel: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'UI', label: 'UI' }],
}

export const DOSE_BASIS_OPTIONS: OptionItem[] = [
  { value: 'kg', label: 'por kg' },
  { value: 'animal', label: 'por animal' },
  { value: 'unidade', label: 'por unidade' },
  { value: 'm2', label: 'por m²' },
  { value: 'na', label: 'não se aplica' },
]

export const CONCENTRATION_UNIT_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [{ value: 'mg/mL', label: 'mg/mL' }, { value: 'mcg/mL', label: 'mcg/mL' }, { value: 'UI/mL', label: 'UI/mL' }, { value: 'mg/gota', label: 'mg/gota' }],
  oral_unitario: [{ value: 'mg/cápsula', label: 'mg/cápsula' }, { value: 'mg/comprimido', label: 'mg/comprimido' }, { value: 'mg/biscoito', label: 'mg/biscoito' }, { value: 'mg/sachê', label: 'mg/sachê' }, { value: 'UI/unidade', label: 'UI/unidade' }],
  transdermico_dosado: [{ value: 'mg/click', label: 'mg/click' }, { value: 'mg/pump', label: 'mg/pump' }, { value: 'mg/mL', label: 'mg/mL' }],
  topico_livre: [{ value: 'mg/g', label: 'mg/g' }, { value: '%', label: '%' }, { value: 'mg/mL', label: 'mg/mL' }],
  oto_oftalmico_local: [{ value: 'mg/gota', label: 'mg/gota' }, { value: 'mg/mL', label: 'mg/mL' }, { value: '%', label: '%' }],
  procedural_injetavel: [{ value: 'mg/mL', label: 'mg/mL' }, { value: 'mcg/mL', label: 'mcg/mL' }, { value: 'UI/mL', label: 'UI/mL' }],
}

export const FREQUENCY_MODE_OPTIONS: OptionItem[] = [
  { value: 'times_per_day', label: 'vezes ao dia' },
  { value: 'interval_hours', label: 'intervalo em horas' },
  { value: 'alternate_days', label: 'dias alternados' },
  { value: 'weekly', label: 'semanal' },
  { value: 'guided', label: 'conforme orientação' },
]

export const TIMES_PER_DAY_OPTIONS: OptionItem[] = [
  { value: '1', label: '1x/dia' },
  { value: '2', label: '2x/dia' },
  { value: '3', label: '3x/dia' },
  { value: '4', label: '4x/dia' },
  { value: '6', label: '6x/dia' },
  { value: '8', label: '8x/dia' },
  { value: '12', label: '12x/dia' },
  { value: '24', label: '24x/dia' },
  { value: 'custom', label: 'personalizado' },
]

export const INTERVAL_HOUR_OPTIONS: OptionItem[] = [
  { value: '4', label: 'q4h' },
  { value: '6', label: 'q6h' },
  { value: '8', label: 'q8h' },
  { value: '12', label: 'q12h' },
  { value: '24', label: 'q24h' },
  { value: '48', label: 'q48h' },
  { value: '72', label: 'q72h' },
  { value: 'custom', label: 'personalizado' },
]

export const DURATION_KIND_OPTIONS: OptionItem[] = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
  { value: 'meses', label: 'meses' },
  { value: 'continuous', label: 'uso contínuo' },
  { value: 'recheck', label: 'até reavaliação' },
  { value: 'single', label: 'dose única' },
]

export const PHARMACY_STRATEGY_OPTIONS: OptionItem[] = [
  { value: 'dose_base_per_1ml', label: '1 dose = 1 mL' },
  { value: 'dose_base_per_custom_volume', label: '1 dose = volume fixo' },
  { value: 'dose_base_per_unit', label: '1 dose = 1 unidade' },
  { value: 'dose_base_per_click', label: '1 dose = 1 click/pump' },
  { value: 'qsp_x_doses', label: 'q????.s????.p????. em número de doses' },
  { value: 'adjustable_concentration', label: 'concentração ajustável' },
]

const VEHICLE_PRESETS: VehiclePresetMap = {
  oral_liquido: ['nenhum', 'veículo oral adequado', 'veículo oral aquoso', 'veículo oral oleoso', 'adicionar_manualmente'],
  oral_unitario: ['nenhum', 'padrão da forma', 'adicionar_manualmente'],
  transdermico_dosado: ['nenhum', 'base transdérmica tipo Lipoderm®', 'veículo aquoso siliconado', 'adicionar_manualmente'],
  topico_livre: ['nenhum', 'veículo aquoso siliconado', 'base cremosa adequada', 'base gel adequada', 'adicionar_manualmente'],
  oto_oftalmico_local: ['nenhum', 'veículo oftálmico adequado', 'veículo otológico adequado', 'adicionar_manualmente'],
  procedural_injetavel: ['nenhum', 'veículo injetável adequado', 'adicionar_manualmente'],
}

export const ORAL_FLAVOR_OPTIONS: OptionItem[] = [
  { value: 'nenhum', label: 'nenhum' },
  { value: 'bacon', label: 'bacon' },
  { value: 'frango', label: 'frango' },
  { value: 'queijo', label: 'queijo' },
  { value: 'peixe', label: 'peixe' },
  { value: 'carne', label: 'carne' },
  { value: 'baunilha', label: 'baunilha' },
  { value: 'chocolate', label: 'chocolate' },
  { value: 'framboesa', label: 'framboesa' },
  { value: 'a escolher', label: 'a escolher' },
  { value: 'adicionar_manualmente', label: 'adicionar manualmente' },
]

export const DERMATOLOGIC_FRAGRANCE_OPTIONS: OptionItem[] = [
  { value: 'nenhum', label: 'nenhum' },
  { value: 'erva-doce', label: 'erva-doce' },
  { value: 'panda', label: 'panda' },
  { value: 'mamãe & bebê', label: 'mamãe & bebê / maternidade' },
  { value: 'adicionar_manualmente', label: 'adicionar manualmente' },
]

export const BASE_EXCIPIENT_OPTIONS: OptionItem[] = [
  { value: 'nenhum', label: 'nenhum' },
  { value: 'padrão da forma', label: 'padrão da forma' },
  { value: 'adicionar_manualmente', label: 'adicionar manualmente' },
]

export const TUTOR_CARE_PRESETS_BY_ARCHETYPE: Record<CompoundedV2Archetype, string[]> = {
  oral_liquido: ['Agitar antes de usar????.', 'Utilizar seringa dosadora????.', 'Conservar conforme orientação da farmácia????.'],
  oral_unitario: ['Administrar junto com alimento, se orientado????.', 'Manter fora do alcance de crianças e outros animais????.'],
  transdermico_dosado: ['Usar luvas durante a aplicação????.', 'Alternar os lados da aplicação????.', 'Evitar lambedura logo após aplicar????.'],
  topico_livre: ['Evitar contato com olhos e mucosas????.', 'Não permitir lambedura logo após a aplicação????.'],
  oto_oftalmico_local: ['Lavar as mãos antes e após o uso????.', 'Usar apenas no local orientado pelo médico-veterinário????.'],
  procedural_injetavel: ['Usar apenas conforme orientação do médico-veterinário????.'],
}

export function getFormulaSpeciesScope(species: string[]): string {
  const hasCanine = species????.includes('Canina')
  const hasFeline = species????.includes('Felina')
  if (hasCanine && hasFeline) return 'Ambos'
  if (hasFeline) return 'Felina'
  return 'Canina'
}

export function speciesScopeToArray(value: string): string[] {
  if (value === 'Ambos') return ['Canina', 'Felina']
  return value === 'Felina' ? ['Felina'] : ['Canina']
}

export function getArchetypeLabel(archetype: CompoundedV2Archetype): string {
  if (archetype === 'oral_unitario') return 'oral unitário'
  if (archetype === 'oral_liquido') return 'oral líquido'
  if (archetype === 'transdermico_dosado') return 'transdérmico dosado'
  if (archetype === 'topico_livre') return 'tópico livre'
  if (archetype === 'oto_oftalmico_local') return 'oto/oftálmico local'
  return 'procedural/injetável'
}

export function getAdministrationUnitOptions(archetype: CompoundedV2Archetype): OptionItem[] {
  return ADMINISTRATION_UNIT_OPTIONS_BY_ARCHETYPE[archetype]
}

export function getDoseUnitOptions(archetype: CompoundedV2Archetype): OptionItem[] {
  return DOSE_UNIT_OPTIONS_BY_ARCHETYPE[archetype]
}

export function getConcentrationUnitOptions(archetype: CompoundedV2Archetype): OptionItem[] {
  return CONCENTRATION_UNIT_OPTIONS_BY_ARCHETYPE[archetype]
}

export function getPrimaryRouteOptions(archetype: CompoundedV2Archetype): OptionItem[] {
  return PRIMARY_ROUTE_OPTIONS_BY_ARCHETYPE[archetype]
}

export function getVehicleOptions(archetype: CompoundedV2Archetype): OptionItem[] {
  return VEHICLE_PRESETS[archetype]????.map((value) => ({
    value,
    label: value === 'adicionar_manualmente' ? 'adicionar manualmente' : value,
  }))
}

export function getFlavorOptions(archetype: CompoundedV2Archetype): OptionItem[] {
  const list = archetype === 'oral_liquido' || archetype === 'oral_unitario' ? ORAL_FLAVOR_OPTIONS : DERMATOLOGIC_FRAGRANCE_OPTIONS
  return list
}

export function getTutorCareOptions(archetype: CompoundedV2Archetype): string[] {
  return TUTOR_CARE_PRESETS_BY_ARCHETYPE[archetype]
}

export function shouldShowFlavor(archetype: CompoundedV2Archetype): boolean {
  return archetype !== 'procedural_injetavel'
}

export function shouldShowExcipientBase(archetype: CompoundedV2Archetype): boolean {
  return archetype === 'oral_unitario' || archetype === 'transdermico_dosado' || archetype === 'topico_livre'
}

export function requiresConcentration(formula: CompoundedMedicationV2['formula'], regimen: CompoundedV2Regimen): boolean {
  if (formula????.formula_type === 'procedural_topical') return false
  const unit = (formula????.administration_unit || '')????.toLowerCase()
  if (formula????.formula_type === 'fixed_unit_formula') {
    return ['ml', 'gota', 'click', 'pump', 'aplicação', 'jato']????.includes(unit)
  }
  if (regimen????.dose_mode === 'by_weight') {
    return ['ml', 'gota', 'click', 'pump', 'aplicação', 'jato']????.includes(unit)
  }
  return false
}

export function shouldShowVehicle(archetype: CompoundedV2Archetype): boolean {
  return archetype !== 'procedural_injetavel'
}

export function syncFormulaPreset(formula: CompoundedMedicationV2['formula'], pharmaceuticalForm: string): CompoundedMedicationV2['formula'] {
  const preset = getDosageFormPreset(pharmaceuticalForm)
  if (!preset) return { ????.????.????.formula, pharmaceutical_form: pharmaceuticalForm }
  return {
    ????.????.????.formula,
    pharmaceutical_form: pharmaceuticalForm,
    dosage_form_family: preset????.family,
    administration_unit: formula????.administration_unit || preset????.administrationUnit,
    archetype:
      preset????.family === 'oral_liquid' ? 'oral_liquido' :
      preset????.family === 'oral_unit' ? 'oral_unitario' :
      preset????.family === 'transdermal_measured' ? 'transdermico_dosado' :
      preset????.family === 'topical_free_application' ? 'topico_livre' :
      preset????.family === 'otic_ophthalmic_local' ? 'oto_oftalmico_local' :
      'procedural_injetavel',
    primary_route: formula????.primary_route || getPrimaryRouteOptions(
      preset????.family === 'oral_liquid' ? 'oral_liquido' :
      preset????.family === 'oral_unit' ? 'oral_unitario' :
      preset????.family === 'transdermal_measured' ? 'transdermico_dosado' :
      preset????.family === 'topical_free_application' ? 'topico_livre' :
      preset????.family === 'otic_ophthalmic_local' ? 'oto_oftalmico_local' :
      'procedural_injetavel',
    )[0]?????.value || '',
  }
}

export function resolveVehicleSelection(archetype: CompoundedV2Archetype, current: string): { selected: string; customValue: string } {
  const normalized = String(current || '')????.trim()
  if (!normalized) return { selected: 'nenhum', customValue: '' }
  const values = new Set(getVehicleOptions(archetype)????.map((entry) => entry????.value))
  if (values????.has(normalized)) return { selected: normalized, customValue: '' }
  return { selected: 'adicionar_manualmente', customValue: normalized }
}

export function resolveFlavorSelection(archetype: CompoundedV2Archetype, current: string): { selected: string; customValue: string } {
  const normalized = String(current || '')????.trim()
  if (!normalized) return { selected: 'nenhum', customValue: '' }
  const values = new Set(getFlavorOptions(archetype)????.map((entry) => entry????.value))
  if (values????.has(normalized)) return { selected: normalized, customValue: '' }
  return { selected: 'adicionar_manualmente', customValue: normalized }
}

export function resolveExcipientSelection(current: string): { selected: string; customValue: string } {
  const normalized = String(current || '')????.trim()
  if (!normalized) return { selected: 'nenhum', customValue: '' }
  const values = new Set(BASE_EXCIPIENT_OPTIONS????.map((entry) => entry????.value))
  if (values????.has(normalized)) return { selected: normalized, customValue: '' }
  return { selected: 'adicionar_manualmente', customValue: normalized }
}

export function getDurationKind(regimen: CompoundedV2Regimen): string {
  const text = String(regimen????.duration_text || '')????.trim()????.toLowerCase()
  if (text === 'dose única' || text === 'dose unica') return 'single'
  if (text????.includes('uso contínuo') || text????.includes('uso continuo')) return 'continuous'
  if (text????.includes('reavaliação') || text????.includes('reavaliacao')) return 'recheck'
  if (regimen????.duration_mode === 'continuous_until_recheck') return 'recheck'
  return regimen????.duration_unit || 'dias'
}

export function applyDurationKind(regimen: CompoundedV2Regimen, kind: string): Partial<CompoundedV2Regimen> {
  if (kind === 'continuous') {
    return {
      duration_mode: 'continuous_until_recheck',
      duration_value: null,
      duration_unit: '',
      duration_text: 'uso contínuo',
    }
  }
  if (kind === 'recheck') {
    return {
      duration_mode: 'continuous_until_recheck',
      duration_value: null,
      duration_unit: '',
      duration_text: 'até reavaliação',
    }
  }
  if (kind === 'single') {
    return {
      duration_mode: 'free_text',
      duration_value: null,
      duration_unit: '',
      duration_text: 'dose única',
    }
  }
  return {
    duration_mode: 'fixed',
    duration_unit: kind,
    duration_text: '',
    duration_value: regimen????.duration_value ?? 14,
  }
}

export function getFrequencyModeUi(regimen: CompoundedV2Regimen): string {
  const text = String(regimen????.frequency_text || '')????.trim()????.toLowerCase()
  if (text????.includes('dias alternados')) return 'alternate_days'
  if (text????.includes('semanal')) return 'weekly'
  if (text????.includes('conforme orientação') || text????.includes('conforme orientacao')) return 'guided'
  return regimen????.frequency_mode
}

export function applyFrequencyModeUi(mode: string, current: CompoundedV2Regimen): Partial<CompoundedV2Regimen> {
  if (mode === 'alternate_days') {
    return { frequency_mode: 'free_text', frequency_text: 'em dias alternados', frequency_min: null, frequency_max: null }
  }
  if (mode === 'weekly') {
    return { frequency_mode: 'free_text', frequency_text: 'semanal', frequency_min: null, frequency_max: null }
  }
  if (mode === 'guided') {
    return { frequency_mode: 'free_text', frequency_text: 'conforme orientação médica', frequency_min: null, frequency_max: null }
  }
  return {
    frequency_mode: mode as CompoundedV2Regimen['frequency_mode'],
    frequency_text: mode === 'times_per_day' || mode === 'interval_hours' ? '' : current????.frequency_text,
    frequency_min: current????.frequency_min ?? (mode === 'times_per_day' ? 2 : 12),
    frequency_max: current????.frequency_max,
  }
}

export function getDefaultUsageInstruction(archetype: CompoundedV2Archetype, regimen: CompoundedV2Regimen, routeLabel?: string): string {
  const unit = regimen????.administration_unit || 'unidade'
  if (archetype === 'transdermico_dosado') return `Aplicar ${regimen????.dose_min || 1} ${unit} por via transdérmica conforme a frequência definida????.`
  if (archetype === 'topico_livre') return 'Aplicar no local orientado conforme a frequência definida????.'
  if (archetype === 'oto_oftalmico_local') return `Aplicar ${regimen????.dose_min || 1} ${unit} no local indicado conforme a frequência definida????.`
  return `Administrar ${regimen????.dose_min || 1} ${unit}${routeLabel ? ` por ${routeLabel}` : ''} conforme a frequência definida????.`
}

export function getDefaultPharmacyStrategy(archetype: CompoundedV2Archetype, administrationUnit: string): ClinicalPharmacyStrategy {
  if (archetype === 'transdermico_dosado') return administrationUnit === 'click' || administrationUnit === 'pump' ? 'dose_base_per_click' : 'dose_base_per_custom_volume'
  if (archetype === 'oral_unitario') return 'dose_base_per_unit'
  if (archetype === 'oral_liquido') return 'dose_base_per_1ml'
  return 'qsp_x_doses'
}
