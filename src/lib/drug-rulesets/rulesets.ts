// src/lib/drug-rulesets/rulesets.ts

export type DrugClass = 'VASOACTIVE' | 'OPIOID' | 'INDUCTION' | 'ANTIBIOTIC' | 'OTHER'

export type RequiredElement = {
    key: string
    description: string
    check: (profile: any) => boolean
}

export type Ruleset = {
    class: DrugClass
    required: RequiredElement[]
}

function anyTextIncludes(obj: any, needle: string) {
    const s = JSON.stringify(obj ?? {}).toLowerCase()
    return s.includes(needle.toLowerCase())
}

export const RULESETS: Ruleset[] = [
    {
        class: 'VASOACTIVE',
        required: [
            {
                key: 'admin.targets',
                description: 'ter targets de titulação (PAM/perfusão/lactato/diurese)',
                check: (p) =>
                    anyTextIncludes(p.administration_and_titration, 'target') ||
                    anyTextIncludes(p.administration_and_titration, 'pam') ||
                    anyTextIncludes(p.administration_and_titration, 'perfusão'),
            },
            {
                key: 'admin.access',
                description: 'ter orientação de acesso/linha e extravasamento',
                check: (p) =>
                    anyTextIncludes(p.administration_and_titration, 'central') ||
                    anyTextIncludes(p.administration_and_titration, 'extravas'),
            },
            {
                key: 'flow.shock',
                description: 'ter 1 fluxograma de choque',
                check: (p) =>
                    anyTextIncludes(p.clinical_flowcharts, 'choque') ||
                    anyTextIncludes(p.clinical_flowcharts, 'shock'),
            },
            {
                key: 'ui.extravas',
                description: 'common_errors mencionar extravasamento/linha/periférico',
                check: (p) =>
                    anyTextIncludes(p.ui_copy?.common_errors, 'extravas') ||
                    anyTextIncludes(p.ui_copy?.common_errors, 'perif'),
            },
        ],
    },
    {
        class: 'OPIOID',
        required: [
            {
                key: 'admin.iv_rate',
                description: 'ter orientação explícita de IV lento/titulado',
                check: (p) =>
                    anyTextIncludes(p.administration_and_titration, 'lento') ||
                    anyTextIncludes(p.administration_and_titration, 'titula'),
            },
            {
                key: 'ae.resp',
                description: 'mencionar depressão respiratória/sedação',
                check: (p) =>
                    anyTextIncludes(p.adverse_effects_and_toxicity, 'resp') ||
                    anyTextIncludes(p.adverse_effects_and_toxicity, 'sed'),
            },
            {
                key: 'ui.fast_iv',
                description: 'common_errors mencionar IV rápido',
                check: (p) =>
                    anyTextIncludes(p.ui_copy?.common_errors, 'iv ráp') ||
                    anyTextIncludes(p.ui_copy?.common_errors, 'rápido'),
            },
        ],
    },
]
