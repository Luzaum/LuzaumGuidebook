import type { IndicatedDose } from '../../types/drug'

export const butorphanolRecommendedUnit = 'mg/kg/h'
export const butorphanolRecommendedUnitWhy = [
    'CRI descrito em mg/kg/h no monógrafo; facilita preparo e evita erro de conversão.',
]

export const butorphanolIndicatedDoses: IndicatedDose[] = [
    // Bolus - Cão
    {
        mode: 'BOLUS',
        species: 'cao',
        unit: 'mg/kg',
        range: { min: 0.1, max: 0.5 },
        purpose: 'Analgesia leve/Sedação (extra-label)',
        routine_default: '0.2 mg/kg',
        note: 'Analgesia pode durar <1 h; sedação 2–4 h. Comum 0.2-0.4 mg/kg.',
    },
    // CRI - Cão
    {
        mode: 'CRI',
        species: 'cao',
        unit: 'mg/kg/h',
        range: { min: 0.1, max: 0.4 },
        purpose: 'Analgesia (extra-label)',
        routine_default: '0.15 mg/kg/h',
        note: 'LD 0.2 mg/kg IV antes. Taxas maiores tendem a sedar mais.',
    },
]
