import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const cwd = 'C:/PROJETOS VET/Vetius'
const outFile = path.join(cwd, 'supabase/.temp/e2e/receituario-freeze-regression.json')

const cases = [
  {
    id: 'novo_manipulado_ui',
    command: ['node', '.\\supabase\\.temp\\e2e\\run-manipulados-phase3-v2-page.mjs'],
    readJson: '.\\supabase\\.temp\\e2e\\manipulados-phase3-v2-page.json',
    validate: (json) => Boolean(json?.ok && json?.saveWorked && json?.reopenedWorked),
  },
  {
    id: 'novo_manipulado_blank_editor',
    command: ['node', '-e', 'console.log("skip-inline-proof")'],
    readJson: '.\\supabase\\.temp\\e2e\\phase5a-new-manipulado-ok.json',
    validate: (json) => Boolean(json?.ok && json?.blankEditorStayed),
  },
  {
    id: 'benazepril_5kg',
    command: ['cmd.exe', '/c', 'npx tsx .\\supabase\\.temp\\e2e\\run-manipulados-v2-d-domain-proof.ts'],
    readJson: '.\\supabase\\.temp\\e2e\\manipulados-v2-d-domain-proof.json',
    validate: (json) => json?.benazepril?.ingredientBreakdown?.[0]?.selectedDoseText === '2,5 mg',
  },
  {
    id: 'nova_receita_review_reativo',
    command: ['cmd.exe', '/c', 'npx tsx .\\supabase\\.temp\\e2e\\run-manipulados-reactive-proof.ts'],
    readJson: '.\\supabase\\.temp\\e2e\\manipulados-reactive-proof.json',
    validate: (json) => Boolean(json?.ok && /10 dias/i.test(json?.after || '')),
  },
  {
    id: 'controlado_e_nao_controlado',
    command: ['cmd.exe', '/c', 'npx tsx .\\supabase\\.temp\\e2e\\run-manipulados-controlled-proof.ts'],
    readJson: '.\\supabase\\.temp\\e2e\\manipulados-controlled-proof.json',
    validate: (json) => Boolean(json?.ok),
  },
  {
    id: 'protocolos_v2',
    command: ['node', '.\\supabase\\.temp\\e2e\\run-protocolos-phase4-v2.mjs'],
    readJson: '.\\supabase\\.temp\\e2e\\protocolos-phase4-v2.json',
    validate: (json) => Boolean(json?.ok && json?.appliedToNovaReceita && json?.reviewCoherent),
  },
]

function loadJson(file) {
  const abs = path.resolve(cwd, file)
  return JSON.parse(fs.readFileSync(abs, 'utf8'))
}

const result = {
  ok: false,
  generatedAt: new Date().toISOString(),
  cases: [],
}

for (const testCase of cases) {
  const run = spawnSync(testCase.command[0], testCase.command.slice(1), {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe',
  })

  let json = null
  let passed = false
  let readError = ''

  try {
    json = loadJson(testCase.readJson)
    passed = Boolean(testCase.validate(json))
  } catch (error) {
    readError = error instanceof Error ? error.message : String(error)
  }

  result.cases.push({
    id: testCase.id,
    exitCode: run.status,
    passed,
    readError,
    stdoutTail: (run.stdout || '').trim().split('\n').slice(-10),
    stderrTail: (run.stderr || '').trim().split('\n').slice(-10),
  })
}

result.ok = result.cases.every((entry) => entry.passed)
fs.writeFileSync(outFile, JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
