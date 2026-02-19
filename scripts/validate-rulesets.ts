// scripts/validate-rulesets.ts
//
// Valida que perfis de cada classe clínica têm o conteúdo específico exigido.
//
// Uso:
//   npm run validate:rulesets
//
import fg from 'fast-glob'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import pc from 'picocolors'
import { RULESETS, type DrugClass } from '../src/lib/drug-rulesets/rulesets.ts'

const PATTERNS = [
    'modules/crivet/data/drugs/*.profile.ts',
    'src/**/*.profile.ts',
    'profiles/**/*.profile.ts',
]

async function loadProfile(file: string): Promise<any> {
    const url = pathToFileURL(file).href
    const mod = await import(url)
    const d = mod.default ?? mod.profile ?? mod.DRUG_PROFILE
    if (d) return d
    for (const key of Object.keys(mod)) {
        const c = mod[key]
        if (c && typeof c === 'object' && ('drug_id' in c || 'id' in c || 'slug' in c)) return c
    }
    return mod
}

function classify(profile: any): DrugClass {
    const id = String(profile?.drug_id ?? profile?.id ?? profile?.slug ?? '').toLowerCase()
    const name = String(profile?.name_pt ?? profile?.name ?? profile?.display_name ?? '').toLowerCase()
    const s = `${id} ${name}`

    if (/(nore|norad|dopam|dobut|vasopress|nitropruss|epinef|adren)/.test(s)) return 'VASOACTIVE'
    if (/(morf|methad|fent|remi|butor|bupren|hydromorph)/.test(s)) return 'OPIOID'
    if (/(propof|ketam|etomid)/.test(s)) return 'INDUCTION'
    if (/(cef|mero|metro|clinda|enro|amoxi|doxy)/.test(s)) return 'ANTIBIOTIC'
    return 'OTHER'
}

async function main() {
    const cwd = process.cwd()
    const files = await fg(PATTERNS, { cwd, absolute: true })

    if (!files.length) {
        console.error(pc.red('Nenhum *.profile.ts encontrado.'))
        process.exit(2)
    }

    let errors = 0
    const skipped: string[] = []
    const classified: Record<string, string[]> = {}

    for (const f of files) {
        let profile: any
        try {
            profile = await loadProfile(f)
        } catch {
            continue
        }

        const cls = classify(profile)
        const rel = path.relative(cwd, f)

        if (!classified[cls]) classified[cls] = []
        classified[cls].push(rel)

        const ruleset = RULESETS.find(r => r.class === cls)
        if (!ruleset) {
            skipped.push(`${rel} (${cls} — sem ruleset definido)`)
            continue
        }

        const failed = ruleset.required.filter(req => !req.check(profile))
        if (failed.length) {
            errors++
            console.log(pc.red(`\nERROR: ${rel}`))
            console.log(pc.dim(`       Classe detectada: ${cls}`))
            failed.forEach(x => console.log(pc.red(`  ✗ ${x.description}  [${x.key}]`)))
        }
    }

    // Resumo de classificação
    console.log('')
    console.log(pc.bold('=== Classificação de Perfis ==='))
    for (const [cls, list] of Object.entries(classified)) {
        const hasRuleset = RULESETS.some(r => r.class === cls)
        const label = hasRuleset ? pc.green(cls) : pc.dim(cls)
        console.log(`  ${label}: ${list.length} perfil(is)`)
    }

    if (errors) {
        console.log('')
        process.exit(1)
    }

    console.log(pc.green('\n✓ Rulesets por classe OK ✅'))
}

main().catch((e) => {
    console.error(pc.red(e?.message ?? String(e)))
    process.exit(2)
})
