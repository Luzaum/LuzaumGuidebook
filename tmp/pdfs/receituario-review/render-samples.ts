import {writeFileSync} from 'node:fs';
import {SEEDED_TEMPLATES} from '../../../modules/consulta-vet/data/receituarioSeed';
import {renderClinicalRecipe} from '../../../modules/consulta-vet/utils/receituarioClinicalModels';
import {buildClinicalMedicationOverridesMap} from '../../../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import {stripPrescriptionTechnicalDetails} from '../../../modules/consulta-vet/utils/receituarioTemplateCalculator';
import {createReceituarioPdf} from '../../../modules/consulta-vet/utils/receituarioPdf';
const cases=[
 {id:'seed-asma-felina-protocolo',keys:['prednisolone','fluticasone','salbutamol'],species:'gato',weight:4,alts:{'fluticasone-asthma-cat':'severe'}},
 {id:'seed-colapso-traqueia-cao',keys:['hydrocodone'],species:'cão',weight:10},
 {id:'seed-pancreatite-cao',keys:['ondansetron'],species:'cão',weight:10},
 {id:'seed-pancreatite-gato',keys:['ondansetron','buprenorphine'],species:'gato',weight:4},
 {id:'seed-triade-felina',keys:['buprenorphine','ursodiol'],species:'gato',weight:4},
];
for(const entry of cases){
 const model=SEEDED_TEMPLATES.find(t=>t.id===entry.id)!.structured_defaults!.clinical_model!;
 const meds=model.options.filter(o=>entry.keys.includes(o.key)).flatMap(o=>o.medications||[]);
 const overrides=buildClinicalMedicationOverridesMap(meds,entry.species,entry.alts||{});
 if(overrides['fluticasone-asthma-cat'])overrides['fluticasone-asthma-cat'].presentationId='pres-flixotide-250';
 if(overrides['ursodiol-triaditis-cat'])overrides['ursodiol-triaditis-cat'].selectedDoseValue=12.5;
 const body=stripPrescriptionTechnicalDetails(renderClinicalRecipe(model,entry.keys,entry.weight,null,'cápsula',entry.alts||{},overrides,entry.species));
 const pdf=createReceituarioPdf({title:'TESTE TÉCNICO — NÃO UTILIZAR',documentType:'recipe',identification:{patientName:'Paciente fictício',responsibleName:'Tutor fictício',species:entry.species,breed:'SRD',sex:'fêmea',age:'5 anos',weightKg:String(entry.weight)},header:{clinicName:'Vetius — validação local',veterinarianName:'Veterinário de teste',crmv:'TESTE',documentDate:'07/09/2026',location:'Teste',time:'12:00'},bodyPlainText:body});
 writeFileSync(`tmp/pdfs/receituario-review/${entry.id}.pdf`,Buffer.from(pdf.output('arraybuffer')));
 console.log(entry.id,pdf.getNumberOfPages(),/A PREENCHER|ERRO DE DOSE/.test(body)?'REQUIRES_COMPLETION':'rendered');
}
