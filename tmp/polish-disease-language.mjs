import fs from 'node:fs';
const dir = 'modules/consulta-vet/data/seed/';
const replacements = [
 ['do depuração', 'da depuração'], ['o depuração', 'a depuração'],
 ['retroalimentação negativo', 'retroalimentação negativa'],
 ['retroalimentação positivo', 'retroalimentação positiva'],
 ['retroalimentação inadequado', 'retroalimentação inadequada'],
 ['retroalimentação hipofisário negativo', 'retroalimentação hipofisária negativa'],
 ['retroalimentação positiva (retroalimentação positiva)', 'retroalimentação positiva'],
 ['é o triagem preferencial', 'é o teste de triagem preferencial'],
 ['ALP isolada não diagnóstica', 'ALP isolada não confirma'],
 ['autolimpeza reduzido', 'autolimpeza reduzida'],
 ['respiração ofegante (respiração ofegante)', 'respiração ofegante'],
 ['é o respiração ofegante', 'é a respiração ofegante'],
 ['respiração ofegante taquipneico ruidoso', 'Respiração ofegante rápida e ruidosa'],
 ['respiração ofegante Extremo', 'Respiração Ofegante Extrema'],
 ['respiração ofegante ruidoso incessante', 'respiração ofegante ruidosa e incessante'],
 ['respiração ofegante crônico', 'respiração ofegante crônica'],
 ['em cãos de meia-idade', 'em cães de meia-idade'],
 ['em ambiente em ambiente domiciliar', 'em ambiente domiciliar'],
 ['em ambiente estritamente em ambiente domiciliar', 'em ambiente domiciliar'],
 [' (em ambiente domiciliar)', ''],
 [' (com acesso ao exterior)', ''],
 ['trombo em sela / trombo em sela', 'trombo em sela'],
 ['em estágio terminal "em fase terminal com remodelamento"', 'em fase terminal com remodelamento'],
 ['em fase final dilatada ("em fase terminal com remodelamento")', 'em fase terminal com remodelamento e dilatação'],
 ['"contraste ecocardiográfico espontâneo" (ecocontraste espontâneo)', 'contraste ecocardiográfico espontâneo'],
 ['inclinação da cabeça (inclinação da cabeça)', 'inclinação da cabeça'],
 ['Inclinação de cabeça (inclinação da cabeça)', 'Inclinação da cabeça'],
 [' (pressão da cabeça contra superfícies)', ''],
 ['Compartilhar pote de comida ou autolimpeza', 'Compartilhar potes de comida ou realizar lambedura mútua'],
 ['contato social prolongado (autolimpeza,', 'contato social prolongado (lambedura mútua,'],
 ['estabelecer baseline renal', 'estabelecer os valores renais basais'],
 ['baseline', 'valor basal'],
 ['chattering', 'movimentos repetitivos da mandíbula'],
 ['casas multicat', 'lares com vários gatos'],
 ['em multicat', 'em lares com vários gatos'],
 ['Manejo em ambiente domiciliar Exclusivo', 'Manejo Domiciliar Exclusivo'],
 ["'em ambiente domiciliar, dieta completa", "'Manter em ambiente domiciliar, oferecer dieta completa"],
 ["'em ambiente domiciliar; evitar", "'Manter em ambiente domiciliar; evitar"],
 ["'em ambiente domiciliar ou acesso", "'Manter em ambiente domiciliar ou com acesso"],
 ['suscetíveis; em ambiente domiciliar, castração', 'suscetíveis; manutenção em ambiente domiciliar, castração'],
 ["'triagem anual", "'Triagem anual"],
];
for (const file of fs.readdirSync(dir).filter(x => /^diseases\..*\.seed\.ts$/.test(x) || ['diseasePlainLanguage.ts', 'diseaseOverviewOverrides.ts'].includes(x))) {
 const name = dir + file; const original = fs.readFileSync(name, 'utf8'); let next = original;
 for (const [a,b] of replacements) next = next.replaceAll(a,b);
 if (next !== original) fs.writeFileSync(name,next);
}
