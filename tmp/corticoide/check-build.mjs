import fs from 'node:fs';
for (const n of fs.readdirSync('dist/assets').filter(n=>n.endsWith('.js'))) {
 const s=fs.readFileSync('dist/assets/'+n,'utf8');
 if(s.includes('Da dose à equivalência')) {
 console.log(n, 'soft mask:',s.includes('maskUnits'), 'revision reset:', /\w+\(\w+=>\w+\+1\)/.test(s));
 const i=s.indexOf('from:'); console.log(s.slice(s.indexOf('species'),s.indexOf('species')+100));
 console.log(s.match(/key:\[[^\]]+\]\.join\("\|"\)/)?.[0]);
 }
}
