import { medicationsSeed } from '../modules/consulta-vet/data/seed/medications.seed';
console.log(medicationsSeed.map(m=>m.slug+': '+(m.quickIndications??[]).map(i=>i.condition).join(' | ')).join('\n'));
