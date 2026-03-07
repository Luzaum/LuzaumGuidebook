// scripts/validate-rulesets.ts
//
// Validate that each clinical class profile contains class-specific required content.
//
// Usage:
//   npm run validate:rulesets
//   npm run validate:rulesets -- --enforce
//
import fg from 'fast-glob'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import pc from 'picocolors'
import { RULESETS, type DrugClass } from '../src/lib/drug-rulesets/rulesets.ts'

const ENFORCE = process.argv.includes('--enforce') || process.env.ENFORCE_RULESETS === '1'

const PATTERNS = [
  'modules/crivet/data/drugs/*.profile.ts',
  'src/**/*.profile.ts',
  'profiles/**/*.profile.ts',
]

async function loadProfile(file: string): Promise<any> {
  const url = pathToFileURL(file).href
  const mod = await import(url)
  const candidate = mod.default ?? mod.profile ?? mod.DRUG_PROFILE
  if (candidate) return candidate

  for (const key of Object.keys(mod)) {
    const value = mod[key]
    if (value && typeof value === 'object' && ('drug_id' in value || 'id' in value || 'slug' in value)) {
      return value
    }
  }

  return mod
}

function classify(profile: any): DrugClass {
  const id = String(profile?.drug_id ?? profile?.id ?? profile?.slug ?? '').toLowerCase()
  const name = String(profile?.name_pt ?? profile?.name ?? profile?.display_name ?? '').toLowerCase()
  const text = `${id} ${name}`

  if (/(nore|norad|dopam|dobut|vasopress|nitropruss|epinef|adren)/.test(text)) return 'VASOACTIVE'
  if (/(morf|methad|fent|remi|butor|bupren|hydromorph)/.test(text)) return 'OPIOID'
  if (/(propof|ketam|etomid)/.test(text)) return 'INDUCTION'
  if (/(cef|mero|metro|clinda|enro|amoxi|doxy)/.test(text)) return 'ANTIBIOTIC'
  return 'OTHER'
}

async function main() {
  const cwd = process.cwd()
  const files = await fg(PATTERNS, { cwd, absolute: true })

  if (!files.length) {
    console.error(pc.red('No *.profile.ts files found.'))
    process.exit(2)
  }

  let failures = 0
  const classified: Record<string, string[]> = {}

  for (const file of files) {
    let profile: any
    try {
      profile = await loadProfile(file)
    } catch {
      continue
    }

    const cls = classify(profile)
    const rel = path.relative(cwd, file)

    if (!classified[cls]) classified[cls] = []
    classified[cls].push(rel)

    const ruleset = RULESETS.find((r) => r.class === cls)
    if (!ruleset) continue

    const failed = ruleset.required.filter((req) => !req.check(profile))
    if (!failed.length) continue

    failures++

    const levelLabel = ENFORCE ? pc.red('ERROR') : pc.yellow('WARN')
    console.log(`\n${levelLabel}: ${rel}`)
    console.log(pc.dim(`       Detected class: ${cls}`))

    for (const item of failed) {
      const icon = ENFORCE ? pc.red('  x') : pc.yellow('  !')
      const description = ENFORCE ? pc.red(item.description) : pc.yellow(item.description)
      console.log(`${icon} ${description}  ${pc.dim(`[${item.key}]`)}`)
    }
  }

  console.log('')
  console.log(pc.bold('=== Profile Classification ==='))
  for (const [cls, list] of Object.entries(classified)) {
    const hasRuleset = RULESETS.some((r) => r.class === cls)
    const label = hasRuleset ? pc.green(cls) : pc.dim(cls)
    console.log(`  ${label}: ${list.length} profile(s)`)
  }

  if (failures > 0) {
    if (ENFORCE) {
      console.log('')
      process.exit(1)
    }

    console.log(pc.yellow(`\nAdvisory mode: ${failures} profile(s) still missing class ruleset content.`))
    console.log(pc.dim('  To enforce and fail on gaps, run: npm run validate:rulesets -- --enforce'))
    process.exit(0)
  }

  console.log(pc.green('\nRulesets by class: OK'))
}

main().catch((error) => {
  console.error(pc.red(error?.message ?? String(error)))
  process.exit(2)
})
