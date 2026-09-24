import { medicationsSeed } from '../modules/consulta-vet/data/seed/medications.seed';
for(const m of medicationsSeed) {
 console.log(m.slug,JSON.stringify({quick:m.quickIndications?.length,detail:m.detailedIndications?.length,pk:!!m.pharmacokineticsData,attention:m.attentionData?.precautions.length,classification:!!m.generalInfoData?.pharmacologicalClassification,routes:m.generalInfoData?.routesDetailed?.length,species:m.generalInfoData?.speciesPeculiarities?.length,interactions:m.attentionData?.drugInteractionsDetailed?.length,adverse:m.attentionData?.adverseEffectsDetailed?.length,dilution:!!(m.attentionData?.dilutionGuide||m.generalInfoData?.dilutionGuide),refs:m.references?.length}));
}
