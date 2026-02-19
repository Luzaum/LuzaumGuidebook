// scripts/validate-references-catalog.ts
//
// Valida que todas as referências em perfis usam source_id do SOURCE_CATALOG
// e têm pages no formato esperado.
//
// Uso:
//   npm run validate:refs
//
import fg from 'fast-glob'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import pc from 'picocolors'

const PATTERNS = [
    'modules/crivet/data/drugs/*.profile.ts',
    'src/**/*.profile.ts',
    'profiles/**/*.profile.ts',
]

// Source IDs válidos (espelha catalog.ts, evita import circular no script)
const VALID_SOURCE_IDS = new Set([
    'plumbs_vdh_10',
    'lumb_jones_6',
    'bsava_ecc_3',
    'nelson_couto_6',
])

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

function isOkPages(p: any): boolean {
    if (typeof p !== 'string') return false
    return p.includes('p.') || p.includes('pp.') || /\d/.test(p)
}

async function main() {
    const cwd = process.cwd()
    const files = await fg(PATTERNS, { cwd, absolute: true })

    if (!files.length) {
        console.error(pc.red('Nenhum *.profile.ts encontrado.'))
        process.exit(2)
    }

    let err = 0
    let warn = 0
    const legacy: string[] = []

    for (const f of files) {
        let profile: any
        try {
            profile = await loadProfile(f)
        } catch {
            continue
        }

        const refs = profile?.references
        if (!Array.isArray(refs)) continue

        refs.forEach((r: any, idx: number) => {
            const rel = path.relative(cwd, f)
            const sid = r?.source_id

            if (sid) {
                // Usando novo formato com source_id
                if (!VALID_SOURCE_IDS.has(sid)) {
                    err++
                    console.log(pc.red(`ERROR: ${rel} references[${idx}] source_id inválido: "${sid}"`))
                    console.log(pc.dim(`       Válidos: ${[...VALID_SOURCE_IDS].join(', ')}`))
                }
                if (!isOkPages(r?.pages)) {
                    err++
                    console.log(pc.red(`ERROR: ${rel} references[${idx}] sem pages no formato esperado (ex: "p. 123").`))
                }
            } else {
                // Formato legado — apenas warn
                warn++
                if (!legacy.includes(rel)) legacy.push(rel)
            }
        })
    }

    if (legacy.length) {
        console.log('')
        console.log(pc.yellow(`WARN: ${legacy.length} arquivo(s) usando referências legado (sem source_id):`))
        legacy.forEach(l => console.log(pc.yellow(`  - ${l}`)))
        console.log(pc.dim('  → Execute: npm run normalize:refs  para migrar automaticamente.'))
    }

    if (err) {
        console.log('')
        process.exit(1)
    }

    console.log(pc.green(`\n✓ Referências OK (${warn > 0 ? `${warn} legado(s) para migrar` : 'todas no novo formato'}) ✅`))
}

main().catch((e) => {
    console.error(pc.red(e?.message ?? String(e)))
    process.exit(2)
})
