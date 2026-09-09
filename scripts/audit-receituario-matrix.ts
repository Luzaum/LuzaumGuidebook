import { mkdirSync, writeFileSync } from 'node:fs';
import { SEEDED_TEMPLATES } from '../modules/consulta-vet/data/receituarioSeed';
import { medicationsSeed } from '../modules/consulta-vet/data/seed/medications.seed';
import { getEditorialPresentations, mapEditorialDoseToRecommended, buildClinicalMedicationOverridesMap, evaluateClinicalMedicationCatalogStatus } from '../modules/consulta-vet/utils/clinicalMedicationCatalogBridge';
import { calculateReceituarioDose } from '../modules/consulta-vet/utils/receituarioDoseEngine';
import { renderClinicalRecipe } from '../modules/consulta-vet/utils/receituarioClinicalModels';
import type { ClinicalMedicationDefinition } from '../modules/consulta-vet/types/receituario';

let cases=0; let successful=0; let blocked=0; let confirmations=0;
const errors: string[]=[]; const blockedReasons: Record<string,number>={};
const definition: ClinicalMedicationDefinition={key:'audit',name:'audit',canonicalLookupName:'audit',dose:{min:1,unit:'mg/kg',basis:'weight',route:'oral',frequency:'a cada 24 horas',duration:'1 dia'},doseSourceLabel:'Modelo clínico do ConsultaVet',sourceReviewStatus:'Revisão de fonte pendente',prescriptionText:''};
for(const medication of medicationsSeed){
 const presentations=getEditorialPresentations(medication,definition);
 for(const record of medication.doses){
  if(!record.calculatorEnabled) continue;
  const dose=mapEditorialDoseToRecommended(record,medication);
  for(const species of (record.species==='both'?['dog','cat']:[record.species]) as ('dog'|'cat')[]){
   for(const weight of species==='cat'?[1,4,8]:[1,5,20,40]){
    for(const presentation of presentations){
     for(const value of [...new Set([record.doseMin,record.doseMax??record.doseMin])]){
      cases++;
      const result=calculateReceituarioDose({species,weightKg:weight,dose,selectedDoseValue:value,presentation});
      if(result.blockedReason){blocked++;blockedReasons[result.blockedReason]=(blockedReasons[result.blockedReason]||0)+1;continue;}
      successful++; if(result.requiresConfirmation)confirmations++;
      for(const key of ['totalDose','exactAmount','practicalAmount','actualTotalDose'] as const){if(result[key]!=null&&(!Number.isFinite(result[key])||result[key]!<=0))errors.push(`${medication.id}/${record.id}/${presentation.id}/${species}/${weight}/${value}: ${key}=${result[key]}`);}
      if(result.administrationUnit==='jato'&&!Number.isInteger(result.practicalAmount))errors.push(`${medication.id}: jato fracionado`);
     }
    }
   }
  }
 }
}
const models=SEEDED_TEMPLATES.filter(t=>t.structured_defaults?.clinical_model).map(template=>{
 const model=template.structured_defaults!.clinical_model!; const species=template.species==='gato'?'gato':'cão';
 const options=model.options.map(option=>{
  const meds=option.medications||[]; const weight=species==='gato'?4:10;
  const overrides=buildClinicalMedicationOverridesMap(meds,species,{}, {},weight);
  const body=renderClinicalRecipe(model,[option.key],weight,null,'cápsula',{},overrides,species);
  if(/\bNaN\b|\bInfinity\b/.test(body))errors.push(`${template.id}/${option.key}: valor não finito na receita`);
  return {key:option.key,medications:meds.map(m=>({name:m.name,...evaluateClinicalMedicationCatalogStatus(m,species)})),requiresCompletion:/A PREENCHER|APRESENTAÇÃO A SELECIONAR|ERRO DE DOSE/.test(body)};
 });
 return {id:template.id,title:template.title,options};
});
const report={generatedAt:new Date().toISOString(),scope:'Matriz automatizada do catálogo editorial e de todos os blocos de modelos. Não equivale a revisão bibliográfica de todas as doses nem a teste manual da interface.',medications:medicationsSeed.length,models:models.length,cases,successful,blocked,confirmations,errors,blockedReasons,modelResults:models};
mkdirSync('docs',{recursive:true});writeFileSync('docs/receituario-matrix-2026-09-07.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({medications:report.medications,models:models.length,cases,successful,blocked,confirmations,errors:errors.slice(0,20),errorCount:errors.length},null,2));
if(errors.length)process.exitCode=1;
