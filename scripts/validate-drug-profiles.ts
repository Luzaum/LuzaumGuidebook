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

// WARNs viram ERRORs no strict mode
function lvl(level: 'ERROR' | 'WARN'): 'ERROR' | 'WARN' {
    return STRICT && level === 'WARN' ? 'ERROR' : level
}

function push(issues: ValidationIssue[], level: 'ERROR' | 'WARN', code: string, message: string, p?: string) {
    issues.push({ level: lvl(level), code, message, path: p })
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
