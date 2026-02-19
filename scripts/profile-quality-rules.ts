// scripts/profile-quality-rules.ts

export type ValidationLevel = 'ERROR' | 'WARN'

export type ValidationIssue = {
    level: ValidationLevel
    code: string
    message: string
    path?: string
}

export type ValidationResult = {
    file: string
    drugId?: string
    ok: boolean
    issues: ValidationIssue[]
}

export const REQUIRED_SECTIONS = [
    'core_concepts',
    'species_notes',
    'indications',
    'contraindications',
    'doses',
    'presentations',
    'dilution_and_preparation',
    'compatibility',
    'administration_and_titration',
    'adverse_effects_and_toxicity',
    'alerts_by_comorbidity',
    'presets',
    'calculation_templates',
    'how_we_got_here_block',
    'protocol_integrations',
    'clinical_flowcharts',
    'ui_copy',
    'references',
] as const

export const SECTION_ALIASES: Record<string, string[]> = {
    indications: ['indications', 'indications_and_contraindications', 'indicationsContraindications'],
    contraindications: ['contraindications', 'indications_and_contraindications', 'indicationsContraindications'],
    ui_copy: ['ui_copy', 'uiCopy'],
    clinical_flowcharts: ['clinical_flowcharts', 'clinicalFlowcharts'],
    protocol_integrations: ['protocol_integrations', 'protocolIntegrations'],
    how_we_got_here_block: ['how_we_got_here_block', 'howWeGotHereBlock'],
    dilution_and_preparation: ['dilution_and_preparation', 'dilutionAndPreparation'],
    adverse_effects_and_toxicity: ['adverse_effects_and_toxicity', 'adverseEffectsAndToxicity'],
    administration_and_titration: ['administration_and_titration', 'administrationAndTitration'],
    alerts_by_comorbidity: ['alerts_by_comorbidity', 'alertsByComorbidity'],
    calculation_templates: ['calculation_templates', 'calculationTemplates'],
}

export function getSection(profile: any, sectionKey: string): any {
    const keys = SECTION_ALIASES[sectionKey] ?? [sectionKey]
    for (const k of keys) {
        if (profile && Object.prototype.hasOwnProperty.call(profile, k)) return profile[k]
    }
    return undefined
}

export function isNonEmptyString(v: unknown): v is string {
    return typeof v === 'string' && v.trim().length > 0
}

export function isNonEmptyArray(v: unknown): v is any[] {
    return Array.isArray(v) && v.length > 0
}

export function hasAnyBlockLevelAlert(alerts: any): boolean {
    const arr = Array.isArray(alerts) ? alerts : (alerts?.items ?? alerts?.alerts ?? [])
    if (!Array.isArray(arr)) return false
    return arr.some((a) => {
        const lvl = String(a?.level ?? a?.severity ?? '').toUpperCase()
        return lvl === 'BLOCK' || lvl === 'CRITICAL'
    })
}

export function isVasoactive(profile: any): boolean {
    const id = String(profile?.drug_id ?? profile?.id ?? profile?.slug ?? '').toLowerCase()
    const name = String(profile?.name ?? profile?.display_name ?? '').toLowerCase()
    const fileHint = `${id} ${name}`
    const vaso = [
        'norepinefrina', 'noradrenalina', 'norepinephrine',
        'dopamina', 'dopamine',
        'dobutamina', 'dobutamine',
        'vasopressina', 'vasopressin',
        'nitroprussiato', 'nitroprusside',
        'epinefrina', 'adrenalina', 'epinephrine',
    ]
    return vaso.some((k) => fileHint.includes(k))
}

export function isOpioid(profile: any): boolean {
    const id = String(profile?.drug_id ?? profile?.id ?? profile?.slug ?? '').toLowerCase()
    const name = String(profile?.name ?? profile?.display_name ?? '').toLowerCase()
    const hint = `${id} ${name}`
    const opioids = [
        'morfina', 'morphine',
        'metadona', 'methadone',
        'fentanil', 'fentanyl',
        'remifentanil',
        'butorfanol', 'butorphanol',
        'buprenorfina', 'buprenorphine',
        'hidromorfona', 'hydromorphone',
    ]
    return opioids.some((k) => hint.includes(k))
}

// ─── FASE 2.5: Thresholds para richness validation ───────────────────────────

export const THRESHOLDS = {
    howWeGotHere: {
        minExamples: 1,
        minStepsPerExample: 3,
        minFormulaLines: 2,
    },
    protocolIntegrations: {
        minRules: 2,
        minActionsPerRule: 2,
    },
    clinicalFlowcharts: {
        minCharts: 1,
        minNodes: 4,
        requireStartAndEnd: true,
    },
    uiCopy: {
        minCommonErrors: 3,
    },
    alerts: {
        minAlerts: 2,
    },
} as const
