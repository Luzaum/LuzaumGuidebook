import fs from 'node:fs';
import ts from 'typescript';
const root='modules/consulta-vet/data/seed/';
const rules=[
 [/\s*\(steady[- ]state\)/gi,''],
 [/\bsteady[- ]state\b/gi,'estado de equilíbrio'],
 [/\s*\(washout\)/gi,''],
 [/\bintervalo de washout\b/gi,'intervalo de suspensão'],
 [/\bperíodo de washout\b/gi,'período de suspensão'],
 [/\bwashout\b/gi,'intervalo de suspensão'],
 [/\bwound care\b/gi,'cuidados com feridas'],
 [/\bred flags\b/gi,'sinais de alerta'],
];
const changed=[];
for(const name of fs.readdirSync(root).filter(n=>/^(medications|diseases)\..*\.ts$/.test(n)&&!n.includes('legacy-archive'))){
 const file=root+name, source=fs.readFileSync(file,'utf8');
 const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true);
 const edits=[];
 function visit(node){
  if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)){
   let skip=false;
   for(let a=node.parent;a;a=a.parent)if(ts.isPropertyAssignment(a)){
    const key=a.name.getText(ast).replace(/['"]/g,'');
    if(/^(references|editorialReferences|citation|citationText|authors|authorsYear|journal|url|doi|id|referenceId|title)$/.test(key)){skip=true;break;}
   }
   if(!skip){const start=node.getStart(ast),raw=source.slice(start,node.end);let next=raw;for(const [pattern,replacement] of rules)next=next.replace(pattern,replacement);if(next!==raw)edits.push({start,end:node.end,next});}
  }
  ts.forEachChild(node,visit);
 }
 visit(ast);
 if(edits.length){
  const backup='tmp/editorial-fix-20261115/'+file.replaceAll('/','__');if(!fs.existsSync(backup))fs.writeFileSync(backup,source);
  let updated=source;for(const edit of edits.reverse())updated=updated.slice(0,edit.start)+edit.next+updated.slice(edit.end);
  fs.writeFileSync(file,updated);changed.push({file,edits:edits.length});
 }
}
console.log(JSON.stringify(changed,null,2));
