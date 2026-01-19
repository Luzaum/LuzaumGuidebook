import type { DosePreset } from './presets'

export type MultiDrugPreset = {
    id: string
    label: string
    clinical_target: string
    components: {
        drugId: string
        dose: number
        unit: string
    }[]
    linked_alerts?: string[]
}

export const MLK_LOW_DOSE_PRESET: MultiDrugPreset = {
    id: 'mlk_low_dose',
    label: 'MLK low-dose (redução MAC)',
    clinical_target: 'Analgesia balanceada / redução MAC (cão)',
    components: [
        { drugId: 'morfina', dose: 3.3, unit: 'mcg/kg/min' },
        { drugId: 'lidocaina', dose: 50, unit: 'mcg/kg/min' },
        { drugId: 'cetamina', dose: 10, unit: 'mcg/kg/min' },
    ],
    linked_alerts: ['monitor_hemodynamics', 'ensure_ventilation_if_needed'],
}
