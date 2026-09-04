import fs from 'node:fs'

const path = 'modules/consulta-vet/data/seed/diseases.seed.ts'
let src = fs.readFileSync(path, 'utf8')

if (!src.includes("from './diseases.fistula-perianal.seed'")) {
  src = src.replace(
    "import { doencaDoDiscoIntervertebralGatosRecord } from './diseases.doenca-do-disco-intervertebral-gatos.seed';",
    "import { doencaDoDiscoIntervertebralGatosRecord } from './diseases.doenca-do-disco-intervertebral-gatos.seed';\nimport { fistulaPerianalFurunculoseAnalRecord } from './diseases.fistula-perianal.seed';",
  )
}

const idIdx = src.indexOf("    id: 'disease-fistula-perianal',")
const start = src.lastIndexOf('  {', idIdx)
const tail = src.slice(idIdx)
const endMatch = tail.match(/  \},\r?\n  sindromeCushingCaesRecord/)
if (!endMatch) throw new Error('end not found')
const afterBlock = idIdx + endMatch.index + endMatch[0].indexOf('sindromeCushingCaesRecord')

src = src.slice(0, start) + '  fistulaPerianalFurunculoseAnalRecord,\n  ' + src.slice(afterBlock)

fs.writeFileSync(path, src, 'utf8')
console.log('diseases.seed.ts updated')
