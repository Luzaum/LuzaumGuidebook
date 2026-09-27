import { anemiaHemoliticaImunomediadaCaninaRecord } from '../modules/consulta-vet/data/seed/diseases.ahim-canina.seed';

console.log('Imported successfully:');
console.log('Title:', anemiaHemoliticaImunomediadaCaninaRecord.title);
console.log('Slug:', anemiaHemoliticaImunomediadaCaninaRecord.slug);
console.log('Pillars count:', anemiaHemoliticaImunomediadaCaninaRecord.quickSummaryRich?.pillars?.length);
console.log('References count:', anemiaHemoliticaImunomediadaCaninaRecord.references?.length);
