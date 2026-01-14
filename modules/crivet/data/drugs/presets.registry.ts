import type { DosePreset } from '../../types/presets'
import { fentanylPresets } from './fentanyl.presets'
import { ketaminePresets } from './ketamine.presets'
import { midazolamPresets } from './midazolam.presets'
import { remifentanilPresets } from './remifentanil.presets'
import { dobutaminePresets } from './dobutamine.presets'
import { norepinephrinePresets } from './norepinephrine.presets'

/**
 * Registro central de presets por ID de droga.
 * Quando uma droga é selecionada, seus presets são carregados aqui.
 */
export const PRESETS_REGISTRY: Record<string, DosePreset[]> = {
  fentanil: fentanylPresets,
  cetamina: ketaminePresets,
  midazolam: midazolamPresets,
  remifentanil: remifentanilPresets,
  dobutamina: dobutaminePresets,
  norepinefrina: norepinephrinePresets,
}

/**
 * Obtém os presets para uma droga específica.
 * Retorna array vazio se não houver presets registrados.
 */
export function getPresetsForDrug(drugId: string): DosePreset[] {
  return PRESETS_REGISTRY[drugId] || []
}
