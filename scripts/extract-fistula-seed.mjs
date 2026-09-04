import fs from 'node:fs'

const src = fs.readFileSync('modules/consulta-vet/data/seed/diseases.seed.ts', 'utf8')
const idMarker = "    id: 'disease-fistula-perianal',"
const idIdx = src.indexOf(idMarker)
if (idIdx < 0) throw new Error('marker not found')
const start = src.lastIndexOf('  {', idIdx)
const tail = src.slice(idIdx)
const endMatch = tail.match(/  \},\r?\n  sindromeCushingCaesRecord/)
if (!endMatch) throw new Error('end marker not found')
const end = idIdx + endMatch.index + '  },'.length
if (start < 0) throw new Error(`start not found: ${start}`)

const objBody = src.slice(start, end + '  },'.length)
let record = objBody.replace(/^  /, '')
record = record.replace(
  "category: 'dermatologia',",
  "category: 'dermatologia',\n  categories: ['imunologia', 'gastroenterologia'],",
)

const out = `import type { DiseaseRecord } from '../../types/disease';

/** Fístula perianal / furunculose anal — síntese editorial Vetius. Bruet et al. 2025; Mathews et al. 1997. */
export const fistulaPerianalFurunculoseAnalRecord: DiseaseRecord = ${record};
`

fs.writeFileSync('modules/consulta-vet/data/seed/diseases.fistula-perianal.seed.ts', out, 'utf8')
console.log('OK', out.length, 'chars')
