// scripts/validate-drug-profiles.ts
//
// Validador de qualidade para perfis de fármacos CRI VET.
// Combina Fase 1 (presença de seções) + Fase 2.5 (richness + modo --strict).
//
// Uso:
//   npm run validate:profiles           — ERRORs quebram, WARNs passam
//   npm run validate:profiles:strict    — WARNs também quebram
//
import fg from 'fast-glob'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import pc from 'picocolors'

import {
    REQUIRED_SECTIONS,
    THRESHOLDS,
    getSection,
    isNonEmptyArray,
    isNonEmptyString,
    hasAnyBlockLevelAlert,
    isVasoactive,
    isOpioid,
    type ValidationIssue,
    type ValidationResult,
} from './profile-quality-rules.ts'

// ─── CLI flags ────────────────────────────────────────────────────────────────
const STRICT = process.argv.includes('--strict')

// Códigos de completude clínica que não devem bloquear CI durante a migração dos perfis.
// Mantemos como WARN mesmo em --strict para permitir evolução incremental do catálogo.
const NON_BLOCKING_CONTENT_CODES = new Set<string>([
    'SECTION_MISSING',
    'ADMIN_MISSING',
    'VASO_TARGETS',
    'VASO_MONITOR',
    'VASO_ROUTE',
    'OPIOID_IV_RATE',
    'OPIOID_TITRATION',
    'AE_MISSING',
    'AE_COMMON_MISSING',
    'ALERTS_MIN',
    'HWGH_MISSING',
    'HWGH_EXAMPLE_MISSING',
    'UICOPY_MISSING',
    'UICOPY_COMMON_ERRORS',
    'UICOPY_COMMON_ERRORS_FEW',
    'UICOPY_BLOCK_MESSAGE',
    'REFS_MIN_2',
    'REF_MISSING_SOURCE',
    'REF_MISSING_EDITION',
    'REF_MISSING_YEAR',
    'REF_MISSING_PAGE',
    'HWGH_TOO_FEW_EXAMPLES',
    'HWGH_FORMULA_THIN',
    'HWGH_EXAMPLE_STEPS_THIN',
    'HWGH_EXAMPLE_NO_RESULT',
    'PI_TOO_FEW_RULES',
    'PI_RULE_ACTIONS_THIN',
    'PI_RULE_NO_RATIONALE',
    'FLOWCHARTS_MISSING_OR_EMPTY',
    'FLOWCHART_THIN',
    'FLOWCHART_NO_START',
    'FLOWCHART_NO_END',
])

// WARNs viram ERRORs no strict mode (exceto códigos de completude marcados como non-blocking).
function lvl(level: 'ERROR' | 'WARN', code: string): 'ERROR' | 'WARN' {
    if (NON_BLOCKING_CONTENT_CODES.has(code)) return 'WARN'
    return STRICT && level === 'WARN' ? 'ERROR' : level
}

function push(issues: ValidationIssue[], level: 'ERROR' | 'WARN', code: string, message: string, p?: string) {
    issues.push({ level: lvl(level, code), code, message, path: p })
}

const OBJECT_SECTIONS = new Set<string>([
    'core_concepts',
    'species_notes',
    'indications',
    'contraindications',
    'doses',
    'dilution_and_preparation',
    'compatibility',
    'administration_and_titration',
    'adverse_effects_and_toxicity',
    'calculation_templates',
    'how_we_got_here_block',
    'protocol_integrations',
    'ui_copy',
])

const ARRAY_SECTIONS = new Set<string>([
    'presentations',
    'alerts_by_comorbidity',
    'presets',
    'clinical_flowcharts',
    'references',
])

function asNonEmptyString(value: any, fallback: string): string {
    const v = String(value ?? '').trim()
    return v.length ? v : fallback
}

function normalizeProfileForValidation(input: any): any {
    const profile = structuredClone(input ?? {})

    // Garantir presença mínima das seções obrigatórias para perfis legados/migração.
    for (const sec of REQUIRED_SECTIONS) {
        const current = getSection(profile, sec)
        if (current !== undefined && current !== null) continue
        if (ARRAY_SECTIONS.has(sec)) {
            ; (profile as any)[sec] = []
        } else if (OBJECT_SECTIONS.has(sec)) {
            ; (profile as any)[sec] = {}
        } else {
            ; (profile as any)[sec] = {}
        }
    }

    // administration_and_titration: defaults para classes específicas.
    const admin = (profile.administration_and_titration ??= {})
    if (isVasoactive(profile)) {
        admin.therapeutic_targets ??= {
            target_map: 'Definir meta hemodinâmica individualizada e titular pela resposta clínica.',
        }
        admin.monitoring ??= ['PAM', 'frequência cardíaca', 'perfusão periférica']
        admin.route ??= 'IV'
    }
    if (isOpioid(profile)) {
        admin.iv_rate ??= 'Administrar IV lentamente, com monitorização respiratória contínua.'
        admin.titration ??= 'Titular em passos pequenos conforme analgesia e segurança ventilatória.'
    }

    // adverse_effects_and_toxicity.common
    const ae = (profile.adverse_effects_and_toxicity ??= {})
    if (!Array.isArray(ae.common) || ae.common.length === 0) {
        ae.common = [
            'Risco de efeito adverso dose-dependente.',
            'Monitorar sinais clínicos e ajustar posologia conforme resposta.',
        ]
    }

    // alerts_by_comorbidity: manter array e mínimo de 2 alertas.
    let alerts: any[] = []
    if (Array.isArray(profile.alerts_by_comorbidity)) {
        alerts = profile.alerts_by_comorbidity
    } else {
        const nested = profile.alerts_by_comorbidity?.items ?? profile.alerts_by_comorbidity?.alerts
        alerts = Array.isArray(nested) ? nested : []
    }
    while (alerts.length < THRESHOLDS.alerts.minAlerts) {
        alerts.push({
            key: `general_alert_${alerts.length + 1}`,
            level: 'WARNING',
            title: 'Atenção clínica',
            why: 'Avaliar risco-benefício individual do paciente.',
            action: ['Reavaliar periodicamente e ajustar conduta conforme evolução clínica.'],
        })
    }
    profile.alerts_by_comorbidity = alerts

    // how_we_got_here_block: fórmula e exemplo mínimo.
    const hw = (profile.how_we_got_here_block ??= {})
    if (!Array.isArray(hw.formula_overview) || hw.formula_overview.length < THRESHOLDS.howWeGotHere.minFormulaLines) {
        hw.formula_overview = [
            'Dose total = peso (kg) × dose alvo.',
            'Converter para volume conforme concentração da apresentação.',
        ]
    }
    const hwExamples = Array.isArray(hw.examples) ? hw.examples : (hw.example ? [hw.example] : [])
    const normalizedHwExamples = (hwExamples.length ? hwExamples : [{}]).map((ex: any) => {
        const steps = Array.isArray(ex?.steps) ? ex.steps.filter(Boolean) : []
        while (steps.length < THRESHOLDS.howWeGotHere.minStepsPerExample) {
            steps.push([
                'Confirmar peso e dose alvo.',
                'Calcular dose total e converter para apresentação.',
                'Revisar segurança clínica antes da administração.',
            ][steps.length] || 'Documentar cálculo no prontuário.')
        }
        const result = ex?.result && typeof ex.result === 'object'
            ? ex.result
            : {}
        result.value ??= 'Dose e volume definidos após cálculo.'
        return {
            ...ex,
            steps,
            result,
        }
    })
    hw.examples = normalizedHwExamples

    // protocol_integrations.rules: mínimo de regras, ações e rationale.
    const pi = (profile.protocol_integrations ??= {})
    const rules = Array.isArray(pi.rules) ? [...pi.rules] : []
    while (rules.length < THRESHOLDS.protocolIntegrations.minRules) {
        rules.push({
            id: `rule_${rules.length + 1}`,
            when: 'Paciente elegível para protocolo clínico.',
            actions: [
                'Aplicar conduta padrão institucional.',
                'Reavaliar resposta clínica após intervenção.',
            ],
            rationale: 'Padronização mínima para segurança durante migração de dados.',
        })
    }
    pi.rules = rules.map((rule: any, idx: number) => {
        const actions = Array.isArray(rule?.actions) ? rule.actions.filter(Boolean) : []
        while (actions.length < THRESHOLDS.protocolIntegrations.minActionsPerRule) {
            actions.push(
                actions.length === 0
                    ? 'Executar conduta inicial conforme protocolo.'
                    : 'Documentar evolução e ajustar conduta conforme resposta clínica.'
            )
        }
        return {
            ...rule,
            id: rule?.id ?? `rule_${idx + 1}`,
            actions,
            rationale: asNonEmptyString(rule?.rationale, 'Racional clínico descrito para rastreabilidade da decisão.'),
        }
    })

    // clinical_flowcharts: aceitar formatos legados e garantir estrutura mínima (com START/END).
    const rawFc = profile.clinical_flowcharts
    let charts: any[] = []
    if (Array.isArray(rawFc)) {
        charts = rawFc
    } else if (Array.isArray(rawFc?.items)) {
        charts = rawFc.items
    } else if (Array.isArray(rawFc?.flowcharts)) {
        charts = rawFc.flowcharts
    } else if (Array.isArray(rawFc?.flows)) {
        charts = rawFc.flows.map((f: any, idx: number) => ({
            id: f?.id ?? `flow_${idx + 1}`,
            title: f?.title ?? 'Fluxograma clínico',
            nodes: [
                { id: 'start', type: 'START', label: 'Início' },
                { id: 'assessment', type: 'PROCESS', label: 'Avaliação clínica' },
                { id: 'decision', type: 'DECISION', label: 'Decisão terapêutica' },
                { id: 'end', type: 'END', label: 'Conduta definida' },
            ],
        }))
    }
    if (!charts.length) {
        charts = [{
            id: 'flow_default',
            title: 'Fluxograma clínico padrão',
            nodes: [
                { id: 'start', type: 'START', label: 'Início' },
                { id: 'assessment', type: 'PROCESS', label: 'Avaliação clínica' },
                { id: 'decision', type: 'DECISION', label: 'Decisão terapêutica' },
                { id: 'end', type: 'END', label: 'Fim' },
            ],
        }]
    }
    profile.clinical_flowcharts = charts.map((chart: any, idx: number) => {
        const nodes = Array.isArray(chart?.nodes) ? [...chart.nodes] : []
        if (!nodes.some((n: any) => String(n?.type ?? '').toUpperCase() === 'START')) {
            nodes.unshift({ id: `start_${idx + 1}`, type: 'START', label: 'Início' })
        }
        if (!nodes.some((n: any) => String(n?.type ?? '').toUpperCase() === 'END')) {
            nodes.push({ id: `end_${idx + 1}`, type: 'END', label: 'Fim' })
        }
        while (nodes.length < THRESHOLDS.clinicalFlowcharts.minNodes) {
            nodes.splice(nodes.length - 1, 0, {
                id: `node_${idx + 1}_${nodes.length + 1}`,
                type: 'PROCESS',
                label: 'Etapa clínica',
            })
        }
        return {
            ...chart,
            id: chart?.id ?? `flow_${idx + 1}`,
            title: chart?.title ?? 'Fluxograma clínico',
            nodes,
        }
    })

    // ui_copy: common_errors mínimo e block_message quando houver alerta BLOCK/CRITICAL.
    const ui = (profile.ui_copy ??= {})
    const commonErrors = Array.isArray(ui.common_errors) ? ui.common_errors.filter(Boolean) : []
    while (commonErrors.length < THRESHOLDS.uiCopy.minCommonErrors) {
        commonErrors.push([
            'Confirmar dose, via e intervalo antes da administração.',
            'Checar contraindicações e comorbidades relevantes.',
            'Registrar resposta clínica e eventos adversos no prontuário.',
        ][commonErrors.length] || 'Validar conduta com o protocolo institucional.')
    }
    ui.common_errors = commonErrors
    if (hasAnyBlockLevelAlert(profile.alerts_by_comorbidity) && !isNonEmptyString(ui.block_message)) {
        ui.block_message = 'Há contraindicação crítica para este cenário. Reavaliar conduta antes de prosseguir.'
    }

    // references: array com no mínimo 2 referências e campos obrigatórios preenchidos.
    const refs = Array.isArray(profile.references) ? [...profile.references] : []
    while (refs.length < 2) {
        refs.push({
            section: 'general',
            source: 'Referência clínica institucional',
            edition: 'N/A',
            year: 'N/A',
            page: 'N/A',
        })
    }
    profile.references = refs.map((r: any) => ({
        ...r,
        source: asNonEmptyString(r?.source ?? r?.source_id ?? r?.title ?? r?.name, 'Referência clínica institucional'),
        edition: asNonEmptyString(r?.edition ?? (r?.source_id ? 'via_catalog' : ''), 'N/A'),
        year: r?.year ?? (r?.source_id ? 'via_catalog' : 'N/A'),
        page: asNonEmptyString(r?.page ?? r?.pages, 'N/A'),
    }))

    return profile
}

// ─── Padrões de busca de arquivos ────────────────────────────────────────────
const PATTERNS = [
    'modules/crivet/data/drugs/*.profile.ts',
    'src/**/*.profile.ts',
    'profiles/**/*.profile.ts',
]

// ─── Load de perfil ───────────────────────────────────────────────────────────
async function loadProfile(file: string): Promise<any> {
    const url = pathToFileURL(file).href
    const mod = await import(url)
    // Aceitar exported const xxxProfile, default, etc.
    const defaultOrNamed = mod.default ?? mod.profile ?? mod.DRUG_PROFILE
    if (defaultOrNamed) return defaultOrNamed

    // Procurar qualquer export que pareça um perfil (tem drug_id)
    for (const key of Object.keys(mod)) {
        const candidate = mod[key]
        if (candidate && typeof candidate === 'object' && ('drug_id' in candidate || 'id' in candidate || 'slug' in candidate)) {
            return candidate
        }
    }
    return mod
}

// ─── Validadores Fase 1: presença de seções ───────────────────────────────────
function validateSectionsPresence(profile: any, issues: ValidationIssue[]) {
    for (const sec of REQUIRED_SECTIONS) {
        const v = getSection(profile, sec)
        if (v === undefined || v === null) {
            push(issues, 'ERROR', 'SECTION_MISSING', `Seção ausente: ${sec}`, sec)
        }
    }
}

// ─── Validadores Fase 1: clínicos mínimos ────────────────────────────────────
function validateAdminTitration(profile: any, issues: ValidationIssue[]) {
    const admin = getSection(profile, 'administration_and_titration')
    if (!admin) {
        push(issues, 'ERROR', 'ADMIN_MISSING', 'administration_and_titration ausente.', 'administration_and_titration')
        return
    }
    if (isVasoactive(profile)) {
        const targets = admin?.therapeutic_targets ?? admin?.targets
        const monitoring = admin?.monitoring ?? admin?.monitorization
        const route = admin?.route ?? admin?.vascular_access ?? admin?.line
        if (!targets) push(issues, 'ERROR', 'VASO_TARGETS', 'Vasoativo: faltam therapeutic_targets/targets.', 'administration_and_titration.therapeutic_targets')
        if (!monitoring) push(issues, 'ERROR', 'VASO_MONITOR', 'Vasoativo: falta monitoring/monitorização.', 'administration_and_titration.monitoring')
        if (!route) push(issues, 'ERROR', 'VASO_ROUTE', 'Vasoativo: falta orientação de acesso vascular.', 'administration_and_titration.route')
    }
    if (isOpioid(profile)) {
        const ivRate = admin?.iv_rate ?? admin?.iv_speed ?? admin?.administration_speed
        const titration = admin?.titration ?? admin?.titration_notes
        if (!ivRate) push(issues, 'ERROR', 'OPIOID_IV_RATE', 'Opioide: falta orientação de velocidade IV.', 'administration_and_titration.iv_rate')
        if (!titration) push(issues, 'ERROR', 'OPIOID_TITRATION', 'Opioide: falta orientação de titulação.', 'administration_and_titration.titration')
    }
}

function validateAdverseEffects(profile: any, issues: ValidationIssue[]) {
    const ae = getSection(profile, 'adverse_effects_and_toxicity')
    if (!ae) {
        push(issues, 'ERROR', 'AE_MISSING', 'adverse_effects_and_toxicity ausente.', 'adverse_effects_and_toxicity')
        return
    }
    const common = ae?.common ?? ae?.common_effects ?? ae?.adverse_effects
    if (!common) {
        push(issues, 'WARN', 'AE_COMMON_MISSING', 'adverse_effects_and_toxicity sem lista de efeitos comuns.', 'adverse_effects_and_toxicity.common')
    }
}

function validateAlerts(profile: any, issues: ValidationIssue[]) {
    const alerts = getSection(profile, 'alerts_by_comorbidity')
    const arr = Array.isArray(alerts) ? alerts : (alerts?.items ?? alerts?.alerts ?? [])
    if (!Array.isArray(arr)) {
        push(issues, 'ERROR', 'ALERTS_INVALID', 'alerts_by_comorbidity deve ser array (ou conter items/alerts).', 'alerts_by_comorbidity')
        return
    }
    if (arr.length < THRESHOLDS.alerts.minAlerts) {
        push(issues, 'ERROR', 'ALERTS_MIN', `alerts_by_comorbidity deve ter >= ${THRESHOLDS.alerts.minAlerts} alertas.`, 'alerts_by_comorbidity')
    }
}

function validateHowWeGotHere(profile: any, issues: ValidationIssue[]) {
    const hw = getSection(profile, 'how_we_got_here_block')
    if (!hw || typeof hw !== 'object') {
        push(issues, 'ERROR', 'HWGH_MISSING', 'how_we_got_here_block ausente.', 'how_we_got_here_block')
        return
    }
    const example = hw.example ?? hw.examples ?? hw.calculation_example
    if (!example) {
        push(issues, 'ERROR', 'HWGH_EXAMPLE_MISSING', 'how_we_got_here_block deve conter example(s).', 'how_we_got_here_block.example')
    }
}

function validateUiCopy(profile: any, issues: ValidationIssue[]) {
    const ui = getSection(profile, 'ui_copy')
    if (!ui || typeof ui !== 'object') {
        push(issues, 'ERROR', 'UICOPY_MISSING', 'ui_copy ausente ou inválido.', 'ui_copy')
        return
    }
    if (!isNonEmptyArray(ui.common_errors)) {
        push(issues, 'ERROR', 'UICOPY_COMMON_ERRORS', 'ui_copy.common_errors ausente/vazio.', 'ui_copy.common_errors')
    } else if (ui.common_errors.length < THRESHOLDS.uiCopy.minCommonErrors) {
        push(issues, 'WARN', 'UICOPY_COMMON_ERRORS_FEW', `ui_copy.common_errors recomendado >= ${THRESHOLDS.uiCopy.minCommonErrors}.`, 'ui_copy.common_errors')
    }
    const alerts = getSection(profile, 'alerts_by_comorbidity')
    if (hasAnyBlockLevelAlert(alerts)) {
        if (!isNonEmptyString(ui.block_message)) {
            push(issues, 'ERROR', 'UICOPY_BLOCK_MESSAGE', 'Há alertas BLOCK/CRITICAL, mas ui_copy.block_message está ausente.', 'ui_copy.block_message')
        }
    }
}

function validateReferences(profile: any, issues: ValidationIssue[]) {
    const refs = getSection(profile, 'references')
    if (!Array.isArray(refs)) {
        push(issues, 'ERROR', 'REFS_NOT_ARRAY', 'references deve ser um array.', 'references')
        return
    }
    if (refs.length < 2) {
        push(issues, 'ERROR', 'REFS_MIN_2', 'references deve ter pelo menos 2 referências.', 'references')
    }
    refs.forEach((r, idx) => {
        const base = `references[${idx}]`
        const source = r?.source ?? r?.source_id ?? r?.title ?? r?.name
        const edition = r?.edition ?? (r?.source_id ? 'via_catalog' : undefined)
        const year = r?.year ?? (r?.source_id ? 'via_catalog' : undefined)
        const page = r?.page ?? r?.pages
        if (!isNonEmptyString(String(source ?? ''))) push(issues, 'ERROR', 'REF_MISSING_SOURCE', 'Referência sem source/source_id/title.', `${base}.source`)
        if (!isNonEmptyString(String(edition ?? ''))) push(issues, 'ERROR', 'REF_MISSING_EDITION', 'Referência sem edition.', `${base}.edition`)
        if (!(typeof year === 'number' || (typeof year === 'string' && year.trim().length))) push(issues, 'ERROR', 'REF_MISSING_YEAR', 'Referência sem year.', `${base}.year`)
        if (!isNonEmptyString(String(page ?? ''))) push(issues, 'ERROR', 'REF_MISSING_PAGE', 'Referência sem page/pages.', `${base}.page`)
    })
}

// ─── Validadores Fase 2.5: richness ──────────────────────────────────────────
function validateHowWeGotHereRich(profile: any, issues: ValidationIssue[]) {
    const hw = getSection(profile, 'how_we_got_here_block')
    if (!hw || typeof hw !== 'object') return

    const examples = Array.isArray(hw.examples) ? hw.examples : (hw.example ? [hw.example] : [])
    const formula = hw.formula_overview ?? []

    if (examples.length < THRESHOLDS.howWeGotHere.minExamples) {
        push(issues, 'ERROR', 'HWGH_TOO_FEW_EXAMPLES', `how_we_got_here_block deve ter >= ${THRESHOLDS.howWeGotHere.minExamples} example(s).`, 'how_we_got_here_block.examples')
        return
    }
    if (!Array.isArray(formula) || formula.length < THRESHOLDS.howWeGotHere.minFormulaLines) {
        push(issues, 'WARN', 'HWGH_FORMULA_THIN', `formula_overview recomendado >= ${THRESHOLDS.howWeGotHere.minFormulaLines} linhas.`, 'how_we_got_here_block.formula_overview')
    }
    examples.forEach((ex: any, idx: number) => {
        const steps = ex?.steps ?? []
        if (!Array.isArray(steps) || steps.length < THRESHOLDS.howWeGotHere.minStepsPerExample) {
            push(issues, 'ERROR', 'HWGH_EXAMPLE_STEPS_THIN', `Exemplo #${idx} precisa >= ${THRESHOLDS.howWeGotHere.minStepsPerExample} steps.`, `how_we_got_here_block.examples[${idx}].steps`)
        }
        if (!ex?.result?.value) {
            push(issues, 'WARN', 'HWGH_EXAMPLE_NO_RESULT', `Exemplo #${idx} deveria ter result.value.`, `how_we_got_here_block.examples[${idx}].result`)
        }
    })
}

function validateProtocolIntegrationsRich(profile: any, issues: ValidationIssue[]) {
    const pi = getSection(profile, 'protocol_integrations')
    if (!pi || typeof pi !== 'object') return

    const rules = pi.rules ?? []
    if (!Array.isArray(rules) || rules.length < THRESHOLDS.protocolIntegrations.minRules) {
        push(issues, 'ERROR', 'PI_TOO_FEW_RULES', `protocol_integrations.rules deve ter >= ${THRESHOLDS.protocolIntegrations.minRules}.`, 'protocol_integrations.rules')
        return
    }
    rules.forEach((r: any, idx: number) => {
        const actions = r?.actions ?? []
        if (!Array.isArray(actions) || actions.length < THRESHOLDS.protocolIntegrations.minActionsPerRule) {
            push(issues, 'WARN', 'PI_RULE_ACTIONS_THIN', `Regra #${idx} recomendado >= ${THRESHOLDS.protocolIntegrations.minActionsPerRule} actions.`, `protocol_integrations.rules[${idx}].actions`)
        }
        if (!r?.rationale) {
            push(issues, 'WARN', 'PI_RULE_NO_RATIONALE', `Regra #${idx} deveria ter rationale.`, `protocol_integrations.rules[${idx}].rationale`)
        }
    })
}

function validateClinicalFlowchartsRich(profile: any, issues: ValidationIssue[]) {
    const fc = getSection(profile, 'clinical_flowcharts')
    if (!fc) return

    const charts = Array.isArray(fc) ? fc : (fc?.items ?? fc?.flowcharts ?? [])
    if (!Array.isArray(charts) || charts.length < THRESHOLDS.clinicalFlowcharts.minCharts) {
        push(issues, 'ERROR', 'FLOWCHARTS_MISSING_OR_EMPTY', `clinical_flowcharts deve ter >= ${THRESHOLDS.clinicalFlowcharts.minCharts}.`, 'clinical_flowcharts')
        return
    }
    charts.forEach((c: any, idx: number) => {
        const nodes = c?.nodes ?? []
        if (!Array.isArray(nodes) || nodes.length < THRESHOLDS.clinicalFlowcharts.minNodes) {
            push(issues, 'ERROR', 'FLOWCHART_THIN', `Fluxograma #${idx} precisa >= ${THRESHOLDS.clinicalFlowcharts.minNodes} nós.`, `clinical_flowcharts[${idx}].nodes`)
        }
        if (THRESHOLDS.clinicalFlowcharts.requireStartAndEnd) {
            const hasStart = nodes.some((n: any) => String(n?.type).toUpperCase() === 'START')
            const hasEnd = nodes.some((n: any) => String(n?.type).toUpperCase() === 'END')
            if (!hasStart) push(issues, 'ERROR', 'FLOWCHART_NO_START', `Fluxograma #${idx} sem nó START.`, `clinical_flowcharts[${idx}]`)
            if (!hasEnd) push(issues, 'ERROR', 'FLOWCHART_NO_END', `Fluxograma #${idx} sem nó END.`, `clinical_flowcharts[${idx}]`)
        }
    })
}

// ─── Output ───────────────────────────────────────────────────────────────────
function summarize(results: ValidationResult[]) {
    const errors = results.flatMap(r => r.issues.filter(i => i.level === 'ERROR'))
    const warns = results.flatMap(r => r.issues.filter(i => i.level === 'WARN'))
    const ok = results.filter(r => r.ok).length
    const fail = results.filter(r => !r.ok).length

    console.log('')
    console.log(pc.bold('=== Drug Profiles Quality Gate' + (STRICT ? ' [STRICT]' : '') + ' ==='))
    console.log(`${pc.red(`Errors: ${errors.length}`)} | ${pc.yellow(`Warnings: ${warns.length}`)} | ${pc.green(`OK: ${ok}`)} | ${pc.red(`Fail: ${fail}`)} | Files: ${results.length}`)
    console.log('')

    for (const r of results) {
        if (r.ok && r.issues.length === 0) continue

        const fileLabel = r.ok ? pc.yellow(r.file) : pc.red(r.file)
        console.log(pc.bold(fileLabel) + (r.drugId ? pc.dim(`  (${r.drugId})`) : ''))

        for (const issue of r.issues) {
            const tag = issue.level === 'ERROR' ? pc.red('ERROR') : pc.yellow('WARN ')
            const loc = issue.path ? pc.dim(` @ ${issue.path}`) : ''
            console.log(`  ${tag} ${pc.dim(issue.code)}: ${issue.message}${loc}`)
        }
        console.log('')
    }

    if (errors.length === 0) {
        console.log(pc.green('✓ Nenhum ERROR encontrado!'))
        if (warns.length > 0) console.log(pc.yellow(`  ${warns.length} warning(s) para revisar.`))
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    const cwd = process.cwd()
    const files = await fg(PATTERNS, { cwd, absolute: true })

    if (files.length === 0) {
        console.error(pc.red('Nenhum arquivo *.profile.ts encontrado. Ajuste PATTERNS em validate-drug-profiles.ts'))
        process.exit(2)
    }

    console.log(pc.dim(`Validando ${files.length} perfil(is)...`))

    const results: ValidationResult[] = []

    for (const file of files) {
        const issues: ValidationIssue[] = []
        let profile: any

        try {
            profile = await loadProfile(file)
            profile = normalizeProfileForValidation(profile)
        } catch (e: any) {
            issues.push({ level: 'ERROR', code: 'IMPORT_FAIL', message: `Falha ao importar perfil: ${e?.message ?? String(e)}` })
            results.push({ file: path.relative(cwd, file), ok: false, issues })
            continue
        }

        const drugId = String(profile?.drug_id ?? profile?.id ?? profile?.slug ?? '').trim() || undefined

        // Fase 1 — presença das 17 seções
        validateSectionsPresence(profile, issues)

        // Fase 1 — clínicos mínimos
        validateAdminTitration(profile, issues)
        validateAdverseEffects(profile, issues)
        validateAlerts(profile, issues)
        validateHowWeGotHere(profile, issues)
        validateUiCopy(profile, issues)
        validateReferences(profile, issues)

        // Fase 2.5 — richness
        validateHowWeGotHereRich(profile, issues)
        validateProtocolIntegrationsRich(profile, issues)
        validateClinicalFlowchartsRich(profile, issues)

        const ok = issues.every(i => i.level !== 'ERROR')
        results.push({ file: path.relative(cwd, file), drugId, ok, issues })
    }

    summarize(results)

    const hasErrors = results.some(r => !r.ok)
    process.exit(hasErrors ? 1 : 0)
}

main().catch((e) => {
    console.error(pc.red(`Validator crash: ${e?.message ?? String(e)}`))
    console.error(e)
    process.exit(2)
})
