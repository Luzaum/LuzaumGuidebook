import {writeFileSync} from 'node:fs';
import {medicationsSeed} from '../modules/consulta-vet/data/seed/medications.seed';
writeFileSync('tmp/receituario-queries.json', JSON.stringify(medicationsSeed.map(m => ({id:m.id,title:m.title,query:m.title.split(/[—(]/)[0].trim()})),null,2));
