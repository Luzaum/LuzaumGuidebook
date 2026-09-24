import fs from 'node:fs';const p=JSON.parse(fs.readFileSync('tmp/medication-review/bsava-pages.json','utf8'));
for(const i of [29,30,40,41,43,44,69,72,107,244,270,330,332,351,352,355,356,426,404,405]) console.log('\nPDF PAGE '+i+'\n'+p[i-1]);
