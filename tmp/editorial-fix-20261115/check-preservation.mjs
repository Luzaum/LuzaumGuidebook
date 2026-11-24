import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const folder='tmp/editorial-fix-20261115/';
const snapshots=new Map(fs.readdirSync(folder).filter(n=>n.startsWith('modules__')&&n.endsWith('.ts')).map(n=>[path.resolve(n.replaceAll('__','/')),fs.readFileSync(folder+n,'utf8')]));
const imports=`import {medicationsSeed as m} from './modules/consulta-vet/data/seed/medications.seed'; import {diseasesSeed as d} from './modules/consulta-vet/data/seed/diseases.seed'; export {m,d};`;
async function catalog(before){const out=await build({stdin:{contents:imports,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',packages:'external',write:false,plugins:before?[{name:'before-editorial-fix',setup(b){b.onLoad({filter:/\.ts$/},args=>snapshots.has(args.path)?{contents:snapshots.get(args.path),loader:'ts',resolveDir:path.dirname(args.path)}:undefined);}}]:[]});const file=folder+(before?'catalog-before.mjs':'catalog-after.mjs');fs.writeFileSync(file,out.outputFiles[0].text);return import((await import('node:url')).pathToFileURL(path.resolve(file)).href);}
const before=await catalog(true),after=await catalog(false);
assert.equal(before.m.length,after.m.length);assert.equal(before.d.length,after.d.length);
for(const m of before.m){const n=after.m.find(x=>x.slug===m.slug);assert.ok(n);for(const field of ['doses','presentations','references'])assert.deepEqual(n[field],m[field],m.slug+': '+field);}
const slug='obstrucao-funcional-fluxo-urinario-caes';
assert.deepEqual(before.d.find(x=>x.slug===slug).epidemiology,after.d.find(x=>x.slug===slug).epidemiology);
for(const slug of ['cinomose-canina','obstrucao-funcional-fluxo-urinario-caes']){const b=before.d.find(x=>x.slug===slug),a=after.d.find(x=>x.slug===slug);assert.deepEqual(a.references,b.references);assert.deepEqual(a.treatment,b.treatment);}
console.log(JSON.stringify({medications:after.m.length,diseases:after.d.length,medicationDosesPresentationsReferences:'unchanged',diseaseTreatmentsReferences:'unchanged',urinaryEpidemiology:'unchanged',mannitolDoseCountBefore:before.m.find(x=>x.slug==='manitol').doses.length,mannitolDoseCountAfter:after.m.find(x=>x.slug==='manitol').doses.length}));

