/**
 * Shared constants and helpers for posology/admin editing across:
 * Catalogo, Manipulados and Protocolos.
 */

export const SHARED_FREQUENCY_MODE_OPTIONS = [
  { value: 'times_per_day', label: 'Vezes por dia' },
  { value: 'interval_hours', label: 'Intervalo em horas' },
  { value: 'single_dose', label: 'Dose unica' },
  { value: 'repeat_interval', label: 'Dose unica com repeticao periodica' },
] as const

export type SharedFrequencyMode = typeof SHARED_FREQUENCY_MODE_OPTIONS[number]['value']

export const SHARED_TIMES_PER_DAY_OPTIONS = [
  { value: '', label: 'Selecionar frequencia' },
  { value: '1', label: '1x ao dia (a cada 24 horas)' },
  { value: '2', label: '2x ao dia (a cada 12 horas)' },
  { value: '3', label: '3x ao dia (a cada 8 horas)' },
  { value: '4', label: '4x ao dia (a cada 6 horas)' },
  { value: '6', label: '6x ao dia (a cada 4 horas)' },
] as const

export const SHARED_REPEAT_UNIT_OPTIONS = [
  { value: 'dias', label: 'dias' },
  { value: 'semanas', label: 'semanas' },
  { value: 'meses', label: 'meses' },
] as const

export const SHARED_DURATION_MODE_OPTIONS = [
  { value: 'fixed_days', label: 'Periodo fixo' },
  { value: 'until_recheck', label: 'Ate reavaliacao clinica' },
  { value: 'continuous_use', label: 'Uso continuo' },
  { value: 'until_finished', label: 'Ate terminar o medicamento' },
] as const

export const TOOLTIP = {
  via_administracao: 'Via pela qual o medicamento e administrado. Ex.: VO, SC, IM, IV, Topico.',
  unidade_medida: 'Unidade da dose prescrita. Pode ser por peso (mg/kg) ou absoluta (mg, mL, UI).',
  dose_farmacologica: 'Unidade farmacologica da dose (ex.: mg/kg, mg/m2, mg, mL, UI).',
  unidade_administracao: 'Unidade pratica aplicada pelo tutor (ex.: comprimido, pipeta, sache, gota, click).',
  aplicacao_por_animal: 'Use quando a prescricao e por unidade por animal, sem calculo por peso.',
  aplicacao_por_local: 'Use quando a prescricao depende de sitio anatomico (ouvido, olho, narina, lesao).',
  dose_unica: 'Marque quando o medicamento deve ser administrado apenas uma vez.',
  repetir_periodicamente: 'Apos dose unica, repetir no intervalo definido (ex.: a cada 12 semanas).',
  modo_frequencia: 'Define como a frequencia e expressa: vezes por dia, intervalo em horas, dose unica ou repeticao.',
  intervalo_horas: 'Numero de horas entre administracoes.',
  vezes_por_dia: 'Numero de administracoes por dia.',
  modo_duracao: 'Define por quanto tempo o tratamento deve durar.',
  quantidade_final: 'Quantidade total a manipular/dispensar (ex.: q.s.p. 30 unidades, 100 mL).',
  dose_final_administracao: 'Quantidade final por administracao calculada para o paciente.',
  indicacao_clinica: 'Situacao clinica para a qual o item e indicado.',
  especie: 'Especie-alvo do item.',
  observacoes_uso: 'Orientacoes adicionais para tutor ou farmacia.',
  dose_min: 'Valor minimo da faixa terapeutica.',
  dose_max: 'Valor maximo da faixa terapeutica.',
} as const

export type AdministrationBasis =
  | 'weight_based'
  | 'weight_band'
  | 'per_animal'
  | 'per_application_site'

export type AdministrationBasisLegacy =
  | 'unit_per_animal'
  | 'application_per_site'

export type AdministrationBasisAny =
  | AdministrationBasis
  | AdministrationBasisLegacy
  | string
  | null
  | undefined

export const ADMINISTRATION_BASIS_OPTIONS = [
  { value: 'weight_based', label: 'Dose classica (mg/kg ou dose fixa)' },
  { value: 'weight_band', label: 'Faixa de peso' },
  { value: 'per_animal', label: 'Por unidade por animal' },
  { value: 'per_application_site', label: 'Por aplicacao por sitio anatomico' },
] as const

export const ADMINISTRATION_UNIT_OPTIONS = [
  { value: 'comprimido', label: 'comprimido(s)' },
  { value: 'capsula', label: 'capsula(s)' },
  { value: 'tablete', label: 'tablete(s)' },
  { value: 'pipeta', label: 'pipeta(s)' },
  { value: 'sache', label: 'sache(s)' },
  { value: 'flaconete', label: 'flaconete(s)' },
  { value: 'mL', label: 'mL' },
  { value: 'gota', label: 'gota(s)' },
  { value: 'borrifada', label: 'borrifada(s)' },
  { value: 'click', label: 'click(s)' },
  { value: 'pump', label: 'pump(s)' },
  { value: 'aplicacao', label: 'aplicacao(oes)' },
  { value: 'unidade', label: 'unidade(s)' },
] as const

export const ADMINISTRATION_TARGET_OPTIONS = [
  { value: 'por animal', label: 'por animal' },
  { value: 'em cada ouvido', label: 'em cada ouvido' },
  { value: 'no ouvido afetado', label: 'no ouvido afetado' },
  { value: 'em cada olho', label: 'em cada olho' },
  { value: 'no olho afetado', label: 'no olho afetado' },
  { value: 'em cada narina', label: 'em cada narina' },
  { value: 'sobre a lesao', label: 'sobre a lesao' },
  { value: 'na pele afetada', label: 'na pele afetada' },
] as const

export const PHARMACOLOGICAL_DOSE_UNIT_OPTIONS = [
  { value: 'mcg/kg', label: 'mcg/kg' },
  { value: 'mg/kg', label: 'mg/kg' },
  { value: 'g/kg', label: 'g/kg' },
  { value: 'mL/kg', label: 'mL/kg' },
  { value: 'UI/kg', label: 'UI/kg' },
  { value: 'mg/m2', label: 'mg/m2' },
  { value: 'mL/m2', label: 'mL/m2' },
  { value: 'UI/m2', label: 'UI/m2' },
  { value: 'mcg', label: 'mcg' },
  { value: 'mg', label: 'mg' },
  { value: 'g', label: 'g' },
  { value: 'mL', label: 'mL' },
  { value: 'UI', label: 'UI' },
] as const

const APPLY_VERBS = new Set(['gota', 'borrifada', 'click', 'pump', 'aplicacao', 'pipeta'])

const ADMINISTRATION_UNIT_PLURALS: Record<string, string> = {
  comprimido: 'comprimidos',
  capsula: 'capsulas',
  tablete: 'tabletes',
  pipeta: 'pipetas',
  flaconete: 'flaconetes',
  sache: 'saches',
  ml: 'mL',
  gota: 'gotas',
  borrifada: 'borrifadas',
  click: 'clicks',
  pump: 'pumps',
  aplicacao: 'aplicacoes',
  unidade: 'unidades',
}

function normalizeAscii(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function normalizeAdministrationBasis(value: AdministrationBasisAny): AdministrationBasis {
  const raw = normalizeAscii(String(value || '')).toLowerCase()
  if (raw === 'weight_band') return 'weight_band'
  if (raw === 'per_animal' || raw === 'unit_per_animal') return 'per_animal'
  if (raw === 'per_application_site' || raw === 'application_per_site') return 'per_application_site'
  return 'weight_based'
}

export function isCustomAdministrationBasis(value: AdministrationBasisAny): boolean {
  const basis = normalizeAdministrationBasis(value)
  return basis === 'per_animal' || basis === 'per_application_site'
}

export function isApplicationSiteBasis(value: AdministrationBasisAny): boolean {
  return normalizeAdministrationBasis(value) === 'per_application_site'
}

export function normalizeAdministrationUnit(value: string | null | undefined): string {
  const normalized = normalizeAscii(String(value || '')).toLowerCase()
  if (!normalized) return ''
  const alias: Record<string, string> = {
    capsula: 'capsula',
    capsule: 'capsula',
    sache: 'sache',
    saches: 'sache',
    aplicacao: 'aplicacao',
    aplicacoes: 'aplicacao',
  }
  return alias[normalized] || normalized
}

export function normalizeAdministrationTarget(value: string | null | undefined): string {
  const raw = normalizeAscii(String(value || '')).toLowerCase()
  if (!raw) return ''
  if (raw === 'sobre a lesao') return 'sobre a lesao'
  return String(value || '').trim()
}

export function isPharmacologicalDoseUnit(value: string): boolean {
  const normalized = String(value || '').trim().toLowerCase()
  if (!normalized) return false
  return PHARMACOLOGICAL_DOSE_UNIT_OPTIONS.some((entry) => entry.value.toLowerCase() === normalized)
}

function resolveAdministrationUnitLabel(rawUnit: string, rawAmount: string): string {
  const normalizedUnit = String(rawUnit || '').trim()
  if (!normalizedUnit) return 'unidade'
  const amount = Number(String(rawAmount || '').replace(',', '.'))
  if (!Number.isFinite(amount) || amount <= 1) return normalizedUnit
  const normalizedKey = normalizeAdministrationUnit(normalizedUnit)
  return ADMINISTRATION_UNIT_PLURALS[normalizedKey] || normalizedUnit
}

export function buildSharedAdministrationText(params: {
  administrationBasis?: AdministrationBasisAny
  administrationAmount?: number | string | null
  administrationUnit?: string | null
  administrationTarget?: string | null
}): string {
  const basis = normalizeAdministrationBasis(params.administrationBasis)
  if (basis === 'weight_based' || basis === 'weight_band') return ''

  const amount = params.administrationAmount != null ? String(params.administrationAmount) : '1'
  const unit = normalizeAdministrationUnit(params.administrationUnit || 'unidade') || 'unidade'
  const target = normalizeAdministrationTarget(params.administrationTarget)
    || (basis === 'per_application_site' ? 'sobre a lesao' : 'por animal')

  const verb = APPLY_VERBS.has(unit) ? 'Aplicar' : 'Administrar'
  const displayUnit = resolveAdministrationUnitLabel(unit, amount)
  return `${verb} ${amount} ${displayUnit} ${target}`.trim()
}

export function buildSharedFrequencyText(params: {
  frequencyMode: string
  timesPerDay?: number | string | null
  intervalHours?: number | string | null
  repeatEveryValue?: number | string | null
  repeatEveryUnit?: string | null
  fallback?: string
}): string {
  if (params.frequencyMode === 'single_dose') return 'em dose unica'
  if (params.frequencyMode === 'repeat_interval') {
    const value = params.repeatEveryValue
    const unit = params.repeatEveryUnit || 'dias'
    if (value) return `em dose unica, repetir a cada ${value} ${unit}`
    return 'em dose unica, repetir periodicamente'
  }
  if (params.frequencyMode === 'interval_hours') {
    const hours = Number(params.intervalHours)
    if (hours > 0) return `a cada ${hours} horas`
  }
  if (params.frequencyMode === 'times_per_day') {
    const times = Number(params.timesPerDay)
    if (times > 0) {
      const interval = 24 / times
      if (Number.isInteger(interval)) return `a cada ${interval} horas`
      return `${times}x ao dia`
    }
  }
  return params.fallback || ''
}
