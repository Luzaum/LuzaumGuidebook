import fs from 'node:fs';
import ts from 'typescript';
for(const [file,section,keys] of [
 ['modules/consulta-vet/data/seed/diseases.cinomose-canina.seed.ts','clinicalSignsPathophysiology',['findingsBySystem']],
 ['modules/consulta-vet/data/seed/diseases.obstrucao-funcional-fluxo-urinario-caes.seed.ts','etiology',['epidemiologiaPerfilPredisposicao','diferenciacaoCriticaCaesVsGatos']],
]) {
 const text=fs.readFileSync(file,'utf8'), ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true), removals=[];
 function visit(n){if(ts.isPropertyAssignment(n)&&n.name.getText(ast)===section&&ts.isObjectLiteralExpression(n.initializer))for(const prop of n.initializer.properties){if(!keys.includes(prop.name?.getText(ast)))continue;let end=prop.end;if(text[end]===',')end++;removals.push([prop.getFullStart(),end]);}ts.forEachChild(n,visit);}
 visit(ast);if(removals.length!==keys.length)throw Error('Unexpected field count '+file);
 let result=text;for(const [start,end]of removals.sort((a,b)=>b[0]-a[0]))result=result.slice(0,start)+result.slice(end);
 fs.writeFileSync(file,result);console.log(file,removals.length);
}
