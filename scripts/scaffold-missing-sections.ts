// scripts/scaffold-missing-sections.ts
//
// Gera snippets TypeScript coláveis para perfis com seções críticas faltantes.
//
// Uso:
//   npm run scaffold:profiles
//
import fg from 'fast-glob'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import pc from 'picocolors'

import { getSection, isVasoactive, isOpioid } from './profile-quality-rules.ts'

const PATTERNS = [
    'modules/crivet/data/drugs/*.profile.ts',
    'src/**/*.profile.ts',
    'profiles/**/*.profile.ts',
]

const CRITICAL_KEYS = [
    'how_we_got_here_block',
    'protocol_integrations',
    'clinical_flowcharts',
    'ui_copy',
    'administration_and_titration',
    'adverse_effects_and_toxicity',
] as const

async function loadProfile(file: string): Promise<any> {
    const url = pathToFileURL(file).href
    const mod = await import(url)
    const defaultOrNamed = mod.default ?? mod.profile ?? mod.DRUG_PROFILE
    if (defaultOrNamed) return defaultOrNamed
    for (const key of Object.keys(mod)) {
        const c = mod[key]
        if (c && typeof c === 'object' && ('drug_id' in c || 'id' in c || 'slug' in c)) return c
    }
    return mod
}

function missingKeys(profile: any): string[] {
    return CRITICAL_KEYS.filter((k) => !getSection(profile, k))
}

function makeSnippet(profile: any): string {
    const drugName = String(profile?.name_pt ?? profile?.name ?? profile?.display_name ?? profile?.drug_id ?? 'Fármaco')
    const drugId = String(profile?.drug_id ?? profile?.id ?? profile?.slug ?? 'drug')
    const vaso = isVasoactive(profile)
    const opioid = isOpioid(profile)

    const exampleWeight = opioid ? 10 : 15
    const exampleConcMgMl = 1
    const exampleDoseMcgKgMin = vaso ? 5 : 1
    const exampleBolusDoseMgKg = 2
    const exampleBolusConcMgMl = 10

    const how = vaso
        ? `buildCRIHowWeGotHere({
    drugName: '${drugName}',
    doseMcgPerKgMin: ${exampleDoseMcgKgMin},
    weightKg: ${exampleWeight},
    preparedConcentrationMgPerMl: ${exampleConcMgMl}, // ← AJUSTAR: concentração da seringa/bolsa preparada
  })`
        : `buildBolusHowWeGotHere({
    drugName: '${drugName}',
    concentrationMgPerMl: ${exampleBolusConcMgMl}, // ← AJUSTAR: concentração do frasco
    exampleDoseMgPerKg: ${exampleBolusDoseMgKg},    // ← AJUSTAR: dose do exemplo
  })`

    const flow = vaso
        ? `[
    buildShockVasopressorFlow({ id: '${drugId}-shock', drugName: '${drugName}' }),
  ]`
        : `[
    buildSafeInductionFlow({ id: '${drugId}-induction', drugName: '${drugName}' }),
  ]`

    const commonErrorsExtra = vaso
        ? `[
    'Iniciar vasopressor sem checar volemia/perfusão.',
    'Usar via periférica pequena e ignorar sinais de extravasamento.',
    'Titular sem alvo definido (PAM/perfusão/lactato).',
  ]`
        : opioid
            ? `[
    'Administrar IV rápido (piora vômito/instabilidade hemodinâmica).',
    'Não titular ao efeito e superdosar paciente frágil/gato.',
    'Esquecer antiemético pré-medicação quando indicado.',
  ]`
            : `[
    // ← ADICIONAR erros comuns específicos do fármaco
  ]`

    const blockMessage = vaso
        ? `buildBlockMessage('Não iniciar/titular agressivamente sem volemia abordada e monitorização contínua.')`
        : `undefined // ← definir se houver alertas BLOCK/CRITICAL no perfil`

    return `
// ╔══════════════════════════════════════════════════════════════════╗
// ║  SNIPPET GERADO PELO SCAFFOLDER — cole no perfil e ajuste       ║
// ╚══════════════════════════════════════════════════════════════════╝

import {
  buildBolusHowWeGotHere,
  buildCRIHowWeGotHere,
  buildBasicIntegrations,
  ruleBlockHypovolemia,
  buildSafeInductionFlow,
  buildShockVasopressorFlow,
  buildBaseUiCopy,
  buildBlockMessage,
} from '@/lib/drug-profile-templates'

// ── Seção 13: how_we_got_here_block ─────────────────────────────────
how_we_got_here_block: ${how},

// ── Seção 14: protocol_integrations ─────────────────────────────────
protocol_integrations: buildBasicIntegrations({
  drugName: '${drugName}',
  defaultRules: [
    ruleBlockHypovolemia('${drugName}'),
    // ← ADICIONAR mais regras específicas do fármaco
  ],
}),

// ── Seção 15: clinical_flowcharts ────────────────────────────────────
clinical_flowcharts: ${flow},

// ── Seção 16: ui_copy ────────────────────────────────────────────────
ui_copy: {
  ...buildBaseUiCopy({
    drugName: '${drugName}',
    commonErrors: [
      ...buildBaseUiCopy({ drugName: '${drugName}' }).common_errors,
      ...${commonErrorsExtra},
    ],
  }),
  block_message: ${blockMessage},
},
`.trim()
}

async function main() {
    const cwd = process.cwd()
    const files = await fg(PATTERNS, { cwd, absolute: true })

    if (!files.length) {
        console.error(pc.red('Nenhum *.profile.ts encontrado. Ajuste PATTERNS em scaffold-missing-sections.ts'))
        process.exit(2)
    }

    let printed = 0

    for (const file of files) {
        let profile: any
        try {
            profile = await loadProfile(file)
        } catch (e: any) {
            console.log(pc.red(`Erro ao importar ${path.relative(cwd, file)}: ${e?.message}`))
            continue
        }

        const miss = missingKeys(profile)
        if (!miss.length) continue

        const rel = path.relative(cwd, file)
        const id = String(profile?.drug_id ?? profile?.id ?? profile?.slug ?? '')
        const drugName = String(profile?.name_pt ?? profile?.name ?? id)

        console.log(pc.bold(pc.white(`\n${'─'.repeat(70)}`)))
        console.log(pc.bold(pc.white(`📄 ${rel}`)) + (id ? pc.dim(`  (${drugName})`) : ''))
        console.log(pc.yellow(`   Seções faltando: ${miss.join(', ')}`))
        console.log(pc.dim('   ↓ Cole no arquivo de perfil e ajuste os valores marcados com ←'))
        console.log('')
        console.log(makeSnippet(profile))
        console.log('')
        printed++
    }

    if (!printed) {
        console.log(pc.green('\n✓ Nenhum perfil com seções críticas faltantes! 🎉'))
    } else {
        console.log(pc.dim(`\n→ Snippets gerados para ${printed} arquivo(s). Ajuste os valores ← antes de usar.`))
    }
}

main().catch((e) => {
    console.error(pc.red(`Scaffolder crash: ${e?.message ?? String(e)}`))
    process.exit(2)
})
