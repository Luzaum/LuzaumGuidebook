import fs from 'node:fs';
import ts from 'typescript';
const dir = 'modules/consulta-vet/data/seed/';
const files = fs.readdirSync(dir).filter(x => /^diseases\..*\.seed\.ts$/.test(x) || ['diseasePlainLanguage.ts', 'diseaseOverviewOverrides.ts'].includes(x));
const replacements = [
  [/\boff-label\b/gi, 'fora das indicações de bula'], [/\bextra-label\b/gi, 'fora das indicações de bula'],
  [/\bclearance\b/gi, 'depuração'], [/\bfeedback\b/gi, 'retroalimentação'],
  [/\boutcomes\b/gi, 'desfechos'], [/\boutcome\b/gi, 'desfecho'],
  [/\bcut-off\b/gi, 'ponto de corte'], [/\bgold-standard\b/gi, 'padrão-ouro'],
  [/\bscreening\b/gi, 'triagem'], [/\bendpoints\b/gi, 'desfechos'], [/\bendpoint\b/gi, 'desfecho'],
  [/\bfollow[- ]up\b/gi, 'acompanhamento'], [/\bwork[- ]?up\b/gi, 'investigação diagnóstica'],
  [/\bwashout\b/gi, 'intervalo de suspensão do medicamento'], [/\bpitfalls\b/gi, 'armadilhas diagnósticas'],
  [/\bred flags\b/gi, 'sinais de alerta'], [/\bgold standard\b/gi, 'padrão-ouro'],
  [/\bindoor\b/gi, 'em ambiente domiciliar'], [/\boutdoor\b/gi, 'com acesso ao exterior'],
  [/\bpanting\b/gi, 'respiração ofegante'], [/\bgrooming\b/gi, 'autolimpeza'],
  [/\bhead tilt\b/gi, 'inclinação da cabeça'], [/\bhead pressing\b/gi, 'pressão da cabeça contra superfícies'],
  [/\bburned-out\b/gi, 'em fase terminal com remodelamento'],
  [/\bsmoke\b/gi, 'contraste ecocardiográfico espontâneo'],
  [/\bsaddle thrombus\b/gi, 'trombo em sela'],
  [/\s*\(\*isGoldStandard: true\*\)/g, ''],
  [/DESPERTA RESPEITO DE NEUROLOCALIZAÇÃO/g, 'ATENÇÃO À NEUROLOCALIZAÇÃO'],
  [/causabilidade/g, 'relação causal'],
];
const skip = new Set(['references', 'editorialReferences', 'citation', 'citationText', 'url', 'src', 'id', 'slug', 'synonyms', 'relatedDiseaseSlugs', 'relatedMedicationSlugs', 'relatedConsensusSlugs']);
const editsLog = [];
for (const file of files) {
  const filename = dir + file;
  const source = fs.readFileSync(filename, 'utf8');
  const root = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const edits = [];
  function walk(node, excluded = false) {
    if (ts.isPropertyAssignment(node)) {
      const key = node.name.getText(root).replace(/^['"]|['"]$/g, '');
      walk(node.initializer, excluded || skip.has(key));
      return;
    }
    if (!excluded && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))) {
      const original = node.getText(root);
      if (/^['"`]https?:/.test(original)) return;
      let next = original;
      for (const [pattern, replacement] of replacements) next = next.replace(pattern, replacement);
      if (next !== original) { edits.push({ start: node.getStart(root), end: node.end, next }); editsLog.push({ file, original, next }); }
    }
    ts.forEachChild(node, child => walk(child, excluded));
  }
  walk(root);
  let result = source;
  for (const edit of edits.reverse()) result = result.slice(0, edit.start) + edit.next + result.slice(edit.end);
  if (edits.length) fs.writeFileSync(filename, result);
}
fs.writeFileSync('tmp/disease-language-edits.json', JSON.stringify(editsLog, null, 2));
console.log(`${editsLog.length} textos corrigidos em ${new Set(editsLog.map(x => x.file)).size} arquivos.`);
