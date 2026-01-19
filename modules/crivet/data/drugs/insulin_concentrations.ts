
export interface InsulinConcentrationOption {
    id: string
    insulin_type: 'regular' | 'glargine' | 'lente' | 'pzi' | 'nph'
    name_commercial: string
    species_focus: ('dog' | 'cat')[]
    concentration_label: string
    units_per_ml: number
    u_strength: 'U-40' | 'U-100' | 'U-200'
    mg_per_ml_if_known: number | null
    notes_syringe_match: string
}

export const INSULIN_CONCENTRATIONS: InsulinConcentrationOption[] = [
    {
        id: "regular_novolin_r_u100",
        insulin_type: "regular",
        name_commercial: "NOVOLIN R",
        species_focus: ["dog", "cat"],
        concentration_label: "NOVOLIN R — Regular — U-100 (100 UI/mL)",
        units_per_ml: 100,
        u_strength: "U-100",
        mg_per_ml_if_known: null,
        notes_syringe_match: "Usar seringa/caneta compatível com U-100."
    },
    {
        id: "regular_humulin_r_u100",
        insulin_type: "regular",
        name_commercial: "HUMULIN R",
        species_focus: ["dog", "cat"],
        concentration_label: "HUMULIN R — Regular — U-100 (100 UI/mL)",
        units_per_ml: 100,
        u_strength: "U-100",
        mg_per_ml_if_known: null,
        notes_syringe_match: "Usar seringa/caneta compatível com U-100."
    },
    {
        id: "glargine_lantus_u100",
        insulin_type: "glargine",
        name_commercial: "LANTUS",
        species_focus: ["dog", "cat"],
        concentration_label: "LANTUS — Glargina — U-100 (100 UI/mL) [≈3,64 mg/mL]",
        units_per_ml: 100,
        u_strength: "U-100",
        mg_per_ml_if_known: 3.64,
        notes_syringe_match: "Usar seringa/caneta compatível com U-100."
    },
    {
        id: "glargine_basaglar_u100",
        insulin_type: "glargine",
        name_commercial: "BASAGLAR",
        species_focus: ["dog", "cat"],
        concentration_label: "BASAGLAR — Glargina — U-100 (100 UI/mL)",
        units_per_ml: 100,
        u_strength: "U-100",
        mg_per_ml_if_known: null,
        notes_syringe_match: "Usar seringa/caneta compatível com U-100."
    },
    {
        id: "glargine_semglee_u100",
        insulin_type: "glargine",
        name_commercial: "SEMGLEE",
        species_focus: ["dog", "cat"],
        concentration_label: "SEMGLEE — Glargina — U-100 (100 UI/mL)",
        units_per_ml: 100,
        u_strength: "U-100",
        mg_per_ml_if_known: null,
        notes_syringe_match: "Usar seringa/caneta compatível com U-100."
    },
    {
        id: "lente_caninsulin_u40",
        insulin_type: "lente",
        name_commercial: "CANINSULIN",
        species_focus: ["dog", "cat"],
        concentration_label: "CANINSULIN — Lente (porcina) — U-40 (40 UI/mL)",
        units_per_ml: 40,
        u_strength: "U-40",
        mg_per_ml_if_known: null,
        notes_syringe_match: "⚠️ Exigir seringa U-40 (erro grave se usar U-100)."
    },
    {
        id: "lente_vetsulin_u40",
        insulin_type: "lente",
        name_commercial: "VETSULIN",
        species_focus: ["dog", "cat"],
        concentration_label: "VETSULIN — Lente (porcina) — U-40 (40 UI/mL)",
        units_per_ml: 40,
        u_strength: "U-40",
        mg_per_ml_if_known: null,
        notes_syringe_match: "⚠️ Exigir seringa U-40 (erro grave se usar U-100)."
    },
    {
        id: "pzi_prozinc_u40",
        insulin_type: "pzi",
        name_commercial: "PROZINC",
        species_focus: ["cat", "dog"],
        concentration_label: "PROZINC — PZI (humana recombinante) — U-40 (40 UI/mL)",
        units_per_ml: 40,
        u_strength: "U-40",
        mg_per_ml_if_known: null,
        notes_syringe_match: "⚠️ Exigir seringa U-40."
    },
    {
        id: "nph_novolin_n_u100",
        insulin_type: "nph",
        name_commercial: "NOVOLIN N",
        species_focus: ["dog", "cat"],
        concentration_label: "NOVOLIN N — NPH — U-100 (100 UI/mL)",
        units_per_ml: 100,
        u_strength: "U-100",
        mg_per_ml_if_known: null,
        notes_syringe_match: "Usar seringa/caneta compatível com U-100."
    },
    {
        id: "nph_humulin_n_u100",
        insulin_type: "nph",
        name_commercial: "HUMULIN N",
        species_focus: ["dog", "cat"],
        concentration_label: "HUMULIN N — NPH — U-100 (100 UI/mL)",
        units_per_ml: 100,
        u_strength: "U-100",
        mg_per_ml_if_known: null,
        notes_syringe_match: "Usar seringa/caneta compatível com U-100."
    }
];
