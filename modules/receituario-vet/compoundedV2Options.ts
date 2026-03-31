import type { ClinicalPharmacyStrategy } from './compoundedClinicalText'
import type { CompoundedMedicationV2, CompoundedV2Archetype, CompoundedV2Regimen } from './compoundedV2'

export interface OptionItem {
  value: string
  label: string
}

export const SPECIES_SCOPE_OPTIONS: OptionItem[] = [
  { value: 'Canina', label: 'Cão' },
  { value: 'Felina', label: 'Gato' },
  { value: 'Ambos', label: 'Ambos' },
]

export const ARCHETYPE_OPTIONS: Array<{ value: CompoundedV2Archetype; label: string }> = [
  { value: 'oral_liquido', label: 'Oral líquido' },
  { value: 'oral_unitario', label: 'Oral unitário' },
  { value: 'transdermico_dosado', label: 'Transdérmico dosado' },
  { value: 'topico_livre', label: 'Tópico livre' },
  { value: 'oto_oftalmico_local', label: 'Oto/Oftálmico local' },
  { value: 'procedural_injetavel', label: 'Procedural/Injetável' },
]

export const SALE_CLASSIFICATION_OPTIONS: OptionItem[] = [
  { value: 'free', label: 'Não controlado' },
  { value: 'controlled', label: 'Controlado' },
]

const FORM_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, string[]> = {
  oral_liquido: ['Suspensão oral', 'Solução oral', 'Xarope', 'Emulsão oral', 'Pasta oral', 'Calda', 'Molho'],
  oral_unitario: ['Cápsula', 'Cápsula gastrorresistente', 'Comprimido', 'Comprimido palatável', 'Biscoito medicamentoso', 'Sachê', 'Filme oral', 'Tablete mastigável'],
  transdermico_dosado: ['Gel transdérmico', 'Creme transdérmico'],
  topico_livre: ['Pomada', 'Creme', 'Loção', 'Spray', 'Gel tópico', 'Shampoo', 'Condicionador', 'Banho seco', 'Lenço'],
  oto_oftalmico_local: ['Colírio', 'Solução otológica', 'Pó otológico', 'Gel dental', 'Creme dental', 'Enxaguatório', 'Solução irrigadora', 'Espuma bucal'],
  procedural_injetavel: ['Solução injetável'],
}

export const ALL_FORM_OPTIONS: OptionItem[] = Array.from(
  new Set(Object.values(FORM_OPTIONS_BY_ARCHETYPE).flat()),
)
  .sort((a, b) => a.localeCompare(b, 'pt-BR'))
  .map((value) => ({ value, label: value }))

const ADMINISTRATION_UNIT_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [{ value: 'mL', label: 'mL' }, { value: 'gota', label: 'gota' }, { value: 'dose', label: 'dose' }, { value: 'g', label: 'g' }],
  oral_unitario: [{ value: 'cápsula', label: 'cápsula' }, { value: 'comprimido', label: 'comprimido' }, { value: 'sachê', label: 'sachê' }, { value: 'biscoito', label: 'biscoito' }, { value: 'tablete', label: 'tablete' }, { value: 'unidade', label: 'unidade' }],
  transdermico_dosado: [{ value: 'click', label: 'click' }, { value: 'pump', label: 'pump' }, { value: 'mL', label: 'mL' }, { value: 'aplicação', label: 'aplicação' }],
  topico_livre: [{ value: 'aplicação', label: 'aplicação' }, { value: 'jato', label: 'jato' }, { value: 'mL', label: 'mL' }, { value: 'g', label: 'g' }, { value: 'unidade', label: 'unidade' }],
  oto_oftalmico_local: [{ value: 'gota', label: 'gota' }, { value: 'aplicação', label: 'aplicação' }, { value: 'jato', label: 'jato' }, { value: 'mL', label: 'mL' }, { value: 'filme', label: 'filme' }],
  procedural_injetavel: [{ value: 'mL', label: 'mL' }, { value: 'dose', label: 'dose' }, { value: 'unidade', label: 'unidade' }],
}

const PRIMARY_ROUTE_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [{ value: 'VO', label: 'Via oral' }],
  oral_unitario: [{ value: 'VO', label: 'Via oral' }],
  transdermico_dosado: [{ value: 'Transdérmica', label: 'Transdérmica' }],
  topico_livre: [{ value: 'Tópica', label: 'Tópica' }],
  oto_oftalmico_local: [{ value: 'Oftálmica', label: 'Oftálmica' }, { value: 'Otológica', label: 'Otológica' }, { value: 'Bucal', label: 'Bucal local' }],
  procedural_injetavel: [{ value: 'SC', label: 'Subcutânea (SC)' }, { value: 'IM', label: 'Intramuscular (IM)' }, { value: 'IV', label: 'Intravenosa (IV)' }],
}

const DOSE_UNIT_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'gota', label: 'gota' }, { value: 'UI', label: 'UI' }],
  oral_unitario: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'UI', label: 'UI' }, { value: 'cápsula', label: 'cápsula' }, { value: 'comprimido', label: 'comprimido' }, { value: 'biscoito', label: 'biscoito' }, { value: 'sachê', label: 'sachê' }, { value: 'unidade', label: 'unidade' }],
  transdermico_dosado: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'click', label: 'click' }, { value: 'pump', label: 'pump' }],
  topico_livre: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'g', label: 'g' }, { value: 'mL', label: 'mL' }, { value: 'aplicação', label: 'aplicação' }],
  oto_oftalmico_local: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'gota', label: 'gota' }, { value: 'aplicação', label: 'aplicação' }],
  procedural_injetavel: [{ value: 'mg', label: 'mg' }, { value: 'mcg', label: 'mcg' }, { value: 'mL', label: 'mL' }, { value: 'UI', label: 'UI' }],
}

const CONCENTRATION_UNIT_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, OptionItem[]> = {
  oral_liquido: [{ value: 'mg/mL', label: 'mg/mL' }, { value: 'mcg/mL', label: 'mcg/mL' }, { value: 'UI/mL', label: 'UI/mL' }, { value: 'mg/gota', label: 'mg/gota' }],
  oral_unitario: [{ value: 'mg/cápsula', label: 'mg/cápsula' }, { value: 'mg/comprimido', label: 'mg/comprimido' }, { value: 'mg/biscoito', label: 'mg/biscoito' }, { value: 'mg/sachê', label: 'mg/sachê' }],
  transdermico_dosado: [{ value: 'mg/click', label: 'mg/click' }, { value: 'mg/pump', label: 'mg/pump' }, { value: 'mg/mL', label: 'mg/mL' }],
  topico_livre: [{ value: 'mg/g', label: 'mg/g' }, { value: '%', label: '%' }, { value: 'mg/mL', label: 'mg/mL' }],
  oto_oftalmico_local: [{ value: 'mg/gota', label: 'mg/gota' }, { value: 'mg/mL', label: 'mg/mL' }, { value: '%', label: '%' }],
  procedural_injetavel: [{ value: 'mg/mL', label: 'mg/mL' }, { value: 'mcg/mL', label: 'mcg/mL' }, { value: 'UI/mL', label: 'UI/mL' }],
}

export const DOSE_BASIS_OPTIONS: OptionItem[] = [
  { value: 'kg', label: 'por kg' },
  { value: 'animal', label: 'por animal' },
  { value: 'unit', label: 'por dose' },
  { value: 'm2', label: 'por m²' },
  { value: 'na', label: 'não se aplica' },
]

export const FREQUENCY_MODE_OPTIONS: OptionItem[] = [
  { value: 'times_per_day', label: 'Vezes ao dia' },
  { value: 'interval_hours', label: 'Intervalo em horas' },
  { value: 'free_text', label: 'Texto livre' },
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
]

export const INTERVAL_HOUR_OPTIONS: OptionItem[] = [
  { value: '4', label: 'q4h' },
  { value: '6', label: 'q6h' },
  { value: '8', label: 'q8h' },
  { value: '12', label: 'q12h' },
  { value: '24', label: 'q24h' },
  { value: '48', label: 'q48h' },
  { value: '72', label: 'q72h' },
]

export const DURATION_KIND_OPTIONS: OptionItem[] = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
  { value: 'meses', label: 'meses' },
  { value: 'continuous', label: 'uso contínuo' },
  { value: 'recheck', label: 'até reavaliação' },
  { value: 'single', label: 'dose única' },
]

export const PHARMACY_STRATEGY_OPTIONS: Array<{ value: ClinicalPharmacyStrategy; label: string }> = [
  { value: 'dose_base_per_1ml', label: '1 dose = 1 mL' },
  { value: 'dose_base_per_custom_volume', label: '1 dose = volume fixo' },
  { value: 'dose_base_per_unit', label: '1 dose = 1 unidade' },
  { value: 'dose_base_per_click', label: '1 dose = 1 click/pump' },
  { value: 'qsp_x_doses', label: 'Q.S.P. em número de doses' },
  { value: 'adjustable_concentration', label: 'Concentração ajustável' },
]

const VEHICLE_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, string[]> = {
  oral_liquido: ['nenhum', 'veículo oral adequado', 'veículo oral aquoso', 'veículo oral oleoso', 'veículo oral palatável'],
  oral_unitario: ['nenhum', 'padrão da forma'],
  transdermico_dosado: ['nenhum', 'base transdérmica tipo Lipoderm®', 'veículo aquoso siliconado'],
  topico_livre: ['nenhum', 'base cremosa adequada', 'base gel adequada', 'veículo aquoso siliconado'],
  oto_oftalmico_local: ['nenhum', 'veículo oftálmico adequado', 'veículo otológico adequado'],
  procedural_injetavel: ['nenhum', 'veículo injetável adequado'],
}

const FLAVOR_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, string[]> = {
  oral_liquido: ['nenhum', 'bacon', 'frango', 'queijo', 'peixe', 'carne', 'baunilha', 'chocolate', 'framboesa', 'a escolher'],
  oral_unitario: ['nenhum', 'bacon', 'frango', 'queijo', 'peixe', 'carne', 'a escolher'],
  transdermico_dosado: ['nenhum', 'erva-doce', 'mamãe & bebê', 'panda'],
  topico_livre: ['nenhum', 'erva-doce', 'mamãe & bebê', 'panda'],
  oto_oftalmico_local: ['nenhum'],
  procedural_injetavel: ['nenhum'],
}

export const BASE_EXCIPIENT_OPTIONS: OptionItem[] = [
  { value: 'nenhum', label: 'nenhum' },
  { value: 'padrão da forma', label: 'padrão da forma' },
]

const TUTOR_CARE_OPTIONS_BY_ARCHETYPE: Record<CompoundedV2Archetype, string[]> = {
  oral_liquido: ['Agitar antes de usar.', 'Utilizar seringa dosadora.', 'Conservar conforme orientação da farmácia.'],
  oral_unitario: ['Administrar preferencialmente no mesmo horário.', 'Manter fora do alcance de crianças e outros animais.'],
  transdermico_dosado: ['Usar luvas durante a aplicação.', 'Alternar os lados da aplicação.', 'Evitar lambedura logo após aplicar.'],
  topico_livre: ['Evitar contato com olhos e mucosas.', 'Não permitir lambedura logo após a aplicação.'],
  oto_oftalmico_local: ['Lavar as mãos antes e após o uso.', 'Usar apenas no local orientado pelo médico-veterinário.'],
  procedural_injetavel: ['Usar apenas conforme orientação do médico-veterinário.'],
}

function normalizeKey(value: string): string {
  return String(value || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function getFormulaSpeciesScope(species: string[]): string {
  const hasCanina = species.includes('Canina')
  const hasFelina = species.includes('Felina')
  if (hasCanina && hasFelina) return 'Ambos'
  if (hasFelina) return 'Felina'
  return 'Canina'
}

export function speciesScopeToArray(value: string): string[] {
  if (value === 'Ambos') return ['Canina', 'Felina']
  if (value === 'Felina') return ['Felina']
  return ['Canina']
}

export function getArchetypeLabel(archetype: CompoundedV2Archetype): string {
  return ARCHETYPE_OPTIONS.find((entry) => entry.value === archetype)?.label || archetype
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
  return [...VEHICLE_OPTIONS_BY_ARCHETYPE[archetype], 'adicionar_manualmente'].map((value) => ({
    value,
    label: value === 'adicionar_manualmente' ? 'adicionar manualmente' : value,
  }))
}

export function getFlavorOptions(archetype: CompoundedV2Archetype): OptionItem[] {
  return [...FLAVOR_OPTIONS_BY_ARCHETYPE[archetype], 'adicionar_manualmente'].map((value) => ({
    value,
    label: value === 'adicionar_manualmente' ? 'adicionar manualmente' : value,
  }))
}

export function getTutorCareOptions(archetype: CompoundedV2Archetype): string[] {
  return TUTOR_CARE_OPTIONS_BY_ARCHETYPE[archetype]
}

export function shouldShowVehicle(archetype: CompoundedV2Archetype): boolean {
  return archetype !== 'procedural_injetavel'
}

export function shouldShowFlavor(archetype: CompoundedV2Archetype): boolean {
  return archetype !== 'procedural_injetavel' && archetype !== 'oto_oftalmico_local'
}

export function shouldShowExcipientBase(archetype: CompoundedV2Archetype): boolean {
  return archetype === 'oral_unitario' || archetype === 'transdermico_dosado' || archetype === 'topico_livre'
}

export function requiresConcentration(formula: CompoundedMedicationV2['formula'], regimen: CompoundedV2Regimen): boolean {
  const unit = normalizeKey(formula.administration_unit)
  if (formula.formula_type === 'procedural_topical') return false
  if (formula.formula_type === 'fixed_unit_formula') {
    return ['ml', 'gota', 'click', 'pump', 'aplicacao', 'jato'].includes(unit)
  }
  if (regimen.dose_mode === 'by_weight') {
    return ['ml', 'gota', 'click', 'pump', 'aplicacao', 'jato'].includes(unit)
  }
  return false
}

export function getDefaultPharmacyStrategy(archetype: CompoundedV2Archetype, administrationUnit: string): ClinicalPharmacyStrategy {
  const unit = normalizeKey(administrationUnit)
  if (archetype === 'transdermico_dosado') return unit === 'click' || unit === 'pump' ? 'dose_base_per_click' : 'dose_base_per_custom_volume'
  if (archetype === 'oral_unitario') return 'dose_base_per_unit'
  if (archetype === 'oral_liquido') return 'dose_base_per_1ml'
  return 'qsp_x_doses'
}

export function getDefaultUsageInstruction(formula: CompoundedMedicationV2['formula'], regimen: CompoundedV2Regimen): string {
  const unit = regimen.administration_unit || formula.administration_unit || 'dose'
  const route = formula.primary_route ? ` por via ${formula.primary_route}` : ''
  if (regimen.frequency_mode === 'interval_hours' && regimen.frequency_min) {
    return `Administrar 1 ${unit}${route}, a cada ${regimen.frequency_min} horas.`
  }
  if (regimen.frequency_mode === 'times_per_day' && regimen.frequency_min) {
    return `Administrar 1 ${unit}${route}, ${regimen.frequency_min} vez(es) ao dia.`
  }
  return `Administrar 1 ${unit}${route}.`
}

export function resolveVehicleSelection(archetype: CompoundedV2Archetype, current: string): { selected: string; customValue: string } {
  const normalized = String(current || '').trim()
  if (!normalized) return { selected: 'nenhum', customValue: '' }
  const options = new Set(getVehicleOptions(archetype).map((entry) => entry.value))
  if (options.has(normalized)) return { selected: normalized, customValue: '' }
  return { selected: 'adicionar_manualmente', customValue: normalized }
}

export function resolveFlavorSelection(archetype: CompoundedV2Archetype, current: string): { selected: string; customValue: string } {
  const normalized = String(current || '').trim()
  if (!normalized) return { selected: 'nenhum', customValue: '' }
  const options = new Set(getFlavorOptions(archetype).map((entry) => entry.value))
  if (options.has(normalized)) return { selected: normalized, customValue: '' }
  return { selected: 'adicionar_manualmente', customValue: normalized }
}

export function resolveExcipientSelection(current: string): { selected: string; customValue: string } {
  const normalized = String(current || '').trim()
  if (!normalized) return { selected: 'nenhum', customValue: '' }
  const options = new Set(BASE_EXCIPIENT_OPTIONS.map((entry) => entry.value))
  if (options.has(normalized)) return { selected: normalized, customValue: '' }
  return { selected: 'adicionar_manualmente', customValue: normalized }
}

export function syncFormulaPreset(formula: CompoundedMedicationV2['formula'], pharmaceuticalForm: string): CompoundedMedicationV2['formula'] {
  const normalizedForm = pharmaceuticalForm.trim()
  const nextArchetype = ARCHETYPE_OPTIONS.find((entry) =>
    FORM_OPTIONS_BY_ARCHETYPE[entry.value].some((option) => normalizeKey(option) === normalizeKey(normalizedForm))
  )?.value || formula.archetype

  const defaultAdministrationUnit = getAdministrationUnitOptions(nextArchetype)[0]?.value || formula.administration_unit
  const defaultRoute = getPrimaryRouteOptions(nextArchetype)[0]?.value || formula.primary_route

  return {
    ...formula,
    pharmaceutical_form: normalizedForm,
    archetype: nextArchetype,
    administration_unit: formula.administration_unit || defaultAdministrationUnit,
    primary_route: formula.primary_route || defaultRoute,
  }
}
