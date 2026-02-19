// src/lib/drug-profile-templates/howWeGotHere.ts
import { badge, hl, u } from './textMarkup'

export type HowWeGotHereExample = {
    title: string
    patient: { species?: 'dog' | 'cat'; weightKg: number }
    inputs: Record<string, string | number>
    steps: string[]
    result: { label: string; value: string }
    quickChecks?: string[]
}

export type HowWeGotHereBlock = {
    purpose: string
    formula_overview: string[]
    examples: HowWeGotHereExample[]
    notes?: string[]
}

export function buildBolusHowWeGotHere(params: {
    drugName: string
    concentrationMgPerMl: number
    exampleDoseMgPerKg: number
    exampleWeightKg?: number
    species?: 'dog' | 'cat'
}): HowWeGotHereBlock {
    const w = params.exampleWeightKg ?? 10
    const mgTotal = params.exampleDoseMgPerKg * w
    const ml = mgTotal / params.concentrationMgPerMl

    return {
        purpose:
            `Explicar e auditar o cálculo do ${u('bolus IV')} (dose → mg totais → mL pela concentração).`,
        formula_overview: [
            `${badge('INFO', 'FÓRMULA')} mg totais = dose (mg/kg) × peso (kg)`,
            `${badge('INFO', 'FÓRMULA')} mL = mg totais ÷ concentração (mg/mL)`,
            `${hl('yellow', 'Dica')} Se o volume parecer "gigante", quase sempre é unidade errada (mg vs mcg) ou concentração errada.`,
        ],
        examples: [
            {
                title: `${params.drugName} — bolus (exemplo)`,
                patient: { species: params.species, weightKg: w },
                inputs: {
                    'dose_mg_per_kg': params.exampleDoseMgPerKg,
                    'peso_kg': w,
                    'concentracao_mg_per_ml': params.concentrationMgPerMl,
                },
                steps: [
                    `1) mg totais = ${params.exampleDoseMgPerKg} mg/kg × ${w} kg = ${mgTotal.toFixed(2)} mg`,
                    `2) mL = ${mgTotal.toFixed(2)} mg ÷ ${params.concentrationMgPerMl} mg/mL = ${ml.toFixed(2)} mL`,
                    `3) Administrar ${u('titulado')} conforme efeito e segurança hemodinâmica/ventilatória.`,
                ],
                result: { label: 'Volume a aspirar', value: `${ml.toFixed(2)} mL` },
                quickChecks: [
                    `${badge('WARN', 'CHECAGEM')} Confirme a concentração do frasco/ampola (mg/mL).`,
                    `${badge('WARN', 'CHECAGEM')} Confirme a unidade da dose (mg/kg vs mcg/kg).`,
                ],
            },
        ],
        notes: [
            `${hl('orange', 'Segurança')} bolus deve ser titulado e adaptado ao estado volêmico/PA/ventilação.`,
        ],
    }
}

export function buildCRIHowWeGotHere(params: {
    drugName: string
    doseMcgPerKgMin: number
    weightKg: number
    preparedConcentrationMgPerMl: number
    species?: 'dog' | 'cat'
}): HowWeGotHereBlock {
    const mgPerMin = (params.doseMcgPerKgMin * params.weightKg) / 1000
    const mgPerH = mgPerMin * 60
    const mlPerH = mgPerH / params.preparedConcentrationMgPerMl

    return {
        purpose:
            `Explicar e auditar o cálculo da ${u('CRI')} (mcg/kg/min → mg/h → mL/h pela concentração preparada).`,
        formula_overview: [
            `${badge('INFO', 'FÓRMULA')} mg/min = (dose mcg/kg/min × peso kg) ÷ 1000`,
            `${badge('INFO', 'FÓRMULA')} mg/h = mg/min × 60`,
            `${badge('INFO', 'FÓRMULA')} mL/h = mg/h ÷ concentração preparada (mg/mL)`,
            `${hl('yellow', 'Dica')} A concentração usada aqui é a do "preparo da seringa/bolsa", não a do frasco original.`,
        ],
        examples: [
            {
                title: `${params.drugName} — CRI (exemplo)`,
                patient: { species: params.species, weightKg: params.weightKg },
                inputs: {
                    'dose_mcg_per_kg_min': params.doseMcgPerKgMin,
                    'peso_kg': params.weightKg,
                    'conc_preparada_mg_per_ml': params.preparedConcentrationMgPerMl,
                },
                steps: [
                    `1) mg/min = (${params.doseMcgPerKgMin} × ${params.weightKg}) ÷ 1000 = ${mgPerMin.toFixed(4)} mg/min`,
                    `2) mg/h = ${mgPerMin.toFixed(4)} × 60 = ${mgPerH.toFixed(3)} mg/h`,
                    `3) mL/h = ${mgPerH.toFixed(3)} ÷ ${params.preparedConcentrationMgPerMl} = ${mlPerH.toFixed(2)} mL/h`,
                    `4) Titular por alvo (ex.: PAM/perfusão) e reavaliar a cada ajuste.`,
                ],
                result: { label: 'Velocidade da bomba', value: `${mlPerH.toFixed(2)} mL/h` },
                quickChecks: [
                    `${badge('WARN', 'CHECAGEM')} mcg ↔ mg: dividir por 1000 é a falha #1.`,
                    `${badge('WARN', 'CHECAGEM')} Confirme que "conc_preparada" é a do preparo final.`,
                ],
            },
        ],
        notes: [
            `${hl('orange', 'Segurança')} Sempre documentar alvo clínico e resposta após cada titulação.`,
        ],
    }
}
