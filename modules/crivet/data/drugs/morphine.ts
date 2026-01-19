import type { IndicatedDose } from '../../types/drug'

export const morphineRecommendedUnit = 'mg/kg/h'
export const morphineRecommendedUnitWhy = [
    'CRI em mg/kg/h é o padrão em monógrafos.',
    'Reduz confusão com mcg/kg/min (que aparece em MLK).',
]

export const morphineIndicatedDoses: IndicatedDose[] = [
    // Bolus - Cão
    {
        mode: 'BOLUS',
        species: 'cao',
        unit: 'mg/kg',
        range: { min: 0.5, max: 1.0 },
        purpose: 'Analgesia (intermitente)',
        routine_default: '0.5 mg/kg',
        note: 'IV lento, IM ou SC. Redosar frequentemente em ~2 h conforme resposta.',
    },
    // CRI - Cão
    {
        mode: 'CRI',
        species: 'cao',
        unit: 'mg/kg/h',
        range: { min: 0.1, max: 1.0 },
        purpose: 'Analgesia (CRI)',
        routine_default: '0.2 mg/kg/h',
        note: 'LD 0.3–0.5 mg/kg IM/IV lento antes. Taxas mais altas ↑ risco de efeitos adversos.',
    },
    // Bolus - Gato
    {
        mode: 'BOLUS',
        species: 'gato',
        unit: 'mg/kg',
        range: { min: 0.1, max: 0.25 },
        purpose: 'Analgesia (intermitente)',
        routine_default: '0.1 mg/kg',
        note: 'IV/IM/SC a cada 2–4 h se necessário.',
    },
    // CRI - Gato
    {
        mode: 'CRI',
        species: 'gato',
        unit: 'mg/kg/h',
        range: { min: 0.05, max: 0.1 },
        purpose: 'Analgesia (CRI)',
        routine_default: '0.05 mg/kg/h',
    },
]
