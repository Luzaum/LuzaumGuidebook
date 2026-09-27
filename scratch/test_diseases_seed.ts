import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';

console.log('Total diseases loaded:', diseasesSeed.length);
const ahim = diseasesSeed.find(d => d.slug === 'anemia-hemolitica-imunomediada-canina');

if (!ahim) {
  console.error('ERROR: AHIM not found in diseasesSeed!');
  process.exit(1);
}

console.log('Found AHIM:');
console.log('Title:', ahim.title);
console.log('Plain language whatIsIt:', ahim.plainLanguage?.whatIsIt?.slice(0, 100));
console.log('Consensus slugs:', ahim.relatedConsensusSlugs);
console.log('Figures count (modal/clinical):', Object.keys(ahim.diagnosis).filter(k => k.startsWith('figura')).length);
