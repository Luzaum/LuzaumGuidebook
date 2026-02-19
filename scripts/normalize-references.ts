// scripts/normalize-references.ts
//
// Migração automática de referências legado (sem source_id) para o novo formato.
// Usa heurística textual para detectar qual source_id usar.
// SEMPRE revisar o diff antes de commitar!
//
// Uso:
//   npm run normalize:refs
//
import fg from 'fast-glob'
import path from 'node:path'
import fs from 'node:fs/promises'
import pc from 'picocolors'

const PATTERNS = [
    'modules/crivet/data/drugs/*.profile.ts',
    'src/**/*.profile.ts',
    'profiles/**/*.profile.ts',
]

function detectSourceId(text: string): string | null {
    const t = text.toLowerCase()
    if (t.includes("plumb")) return 'plumbs_vdh_10'
    if (t.includes('lumb') || (t.includes('jones') && t.includes('veterinary'))) return 'lumb_jones_6'
    if (t.includes('bsava') && t.includes('critical')) return 'bsava_ecc_3'
    if (t.includes('nelson') || t.includes('couto')) return 'nelson_couto_6'
    return null
}

async function main() {
    const cwd = process.cwd()
    const files = await fg(PATTERNS, { cwd, absolute: true })

    if (!files.length) {
        console.error(pc.red('Nenhum *.profile.ts encontrado.'))
        process.exit(2)
    }

    let changed = 0

    for (const f of files) {
        const raw = await fs.readFile(f, 'utf8')

        if (raw.includes('source_id')) {
            // Já usa o novo formato (pelo menos parcialmente) — pular
            continue
        }

        const sid = detectSourceId(raw)
        if (!sid) continue

        // Heurística: inserir source_id em objetos dentro do array references
        // Funciona bem para a maioria dos casos; revisar diffs antes de commitar
        const patched = raw.replace(
            /(references\s*:\s*\[[\s\S]*?\])/g,
            (m) => {
                if (m.includes('source_id')) return m
                return m.replace(/\{\s*/g, `{ source_id: '${sid}', `)
            }
        )

        if (patched !== raw) {
            await fs.writeFile(f, patched, 'utf8')
            console.log(pc.yellow(`Normalizado: ${path.relative(cwd, f)}  (source_id: ${sid})`))
            changed++
        }
    }

    if (!changed) {
        console.log(pc.green('✓ Nenhum arquivo precisou de normalização.'))
    } else {
        console.log(pc.yellow(`\n→ ${changed} arquivo(s) modificado(s). REVISE OS DIFFS antes de commitar!`))
    }
}

main().catch((e) => {
    console.error(pc.red(e?.message ?? String(e)))
    process.exit(2)
})
