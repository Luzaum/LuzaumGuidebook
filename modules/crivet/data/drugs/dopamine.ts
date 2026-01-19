import type { IndicatedDose } from '../../types/drug'

export const dopaminePresentations = [
    { label: 'Dopamina 5 mg/mL (revital)', mgPerMl: 5 },
]

export const dopamineDoses = {
    criDoseDependent: {
        min: 2,
        max: 15,
        unit: 'mcg/kg/min' as const,
        note: '2-5 renal/splanchnic?; 5-10 beta1; >10 alpha1',
    },
}

export const dopamineRecommendedUnit = 'mcg/kg/min'
export const dopamineRecommendedUnitWhy = [
    'Vasoativo clássico com titulação por minuto; dose-dependente, mas a faixa "comum" deve ser a principal.',
]

export const dopamineIndicatedDoses: IndicatedDose[] = [
    {
        mode: 'CRI',
        species: 'ambos',
        unit: 'mcg/kg/min',
        range: { min: 5, max: 20 },
        purpose: 'Vasoativo/inotrópico',
        routine_default: '5 mcg/kg/min',
        note: 'Dose-dependente β/α. Norepinefrina é preferível para choque vasodilatado.',
    },
]
