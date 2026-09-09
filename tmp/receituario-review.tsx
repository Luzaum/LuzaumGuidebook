import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import '../index.css';
import {SEEDED_TEMPLATES} from '../modules/consulta-vet/data/receituarioSeed';
import {ClinicalTemplateConfigurator} from '../modules/consulta-vet/components/receituario/ClinicalTemplateConfigurator';
import {ClinicalMedicationDosePanel} from '../modules/consulta-vet/components/receituario/ClinicalMedicationDosePanel';
import {PrescriptionMedicationComposer} from '../modules/consulta-vet/components/receituario/PrescriptionMedicationComposer';
import {PrintPreviewA4} from '../modules/consulta-vet/components/receituario/PrintPreviewA4';
import {stripPrescriptionTechnicalDetails} from '../modules/consulta-vet/utils/receituarioTemplateCalculator';
import {getDefaultClinicalOptionKeys} from '../modules/consulta-vet/utils/receituarioClinicalModels';
import type {ClinicalMedicationOverride} from '../modules/consulta-vet/types/receituario';
const templates=SEEDED_TEMPLATES.filter(t=>t.structured_defaults?.clinical_model);
function App(){
 const [id,setId]=useState('seed-pancreatite-gato'); const template=templates.find(t=>t.id===id)!;
 const model=template.structured_defaults!.clinical_model!;
 const [weight,setWeight]=useState('4');const [species,setSpecies]=useState('gato');
 const [keys,setKeys]=useState<string[]>([]);const [alts,setAlts]=useState({});const [overrides,setOverrides]=useState<Record<string,ClinicalMedicationOverride>>({});
 const [body,setBody]=useState('');const [added,setAdded]=useState('');
 const doc={title:'RECEITA DE TESTE — NÃO UTILIZAR',documentType:'recipe' as const,identification:{patientName:'Paciente fictício',responsibleName:'Tutor fictício',responsibleCpf:'',species,breed:'SRD',sex:'fêmea',age:'5 anos',weightKg:weight,veterinarianName:'Teste',crmv:'TESTE'},header:{clinicName:'Vetius — validação local',veterinarianName:'Teste técnico',crmv:'TESTE',documentDate:'07/09/2026'},bodyPlainText:stripPrescriptionTechnicalDetails(body+'\n\n'+added)};
 return <main className="bg-background text-foreground p-5"><h1>Validação isolada dos componentes reais — dados fictícios</h1><label>Modelo<select aria-label="Modelo" value={id} onChange={e=>{setId(e.target.value);setOverrides({});setAlts({});setKeys(getDefaultClinicalOptionKeys(templates.find(t=>t.id===e.target.value)!.structured_defaults!.clinical_model!));setAdded('');}}>{templates.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></label><label>Espécie<select aria-label="Espécie" value={species} onChange={e=>setSpecies(e.target.value)}><option>gato</option><option>cão</option></select></label><label>Peso<input aria-label="Peso" value={weight} onChange={e=>setWeight(e.target.value)}/></label><div style={{display:'grid',gridTemplateColumns:'minmax(400px,1fr) minmax(820px,1fr)',gap:16}}><section><ClinicalTemplateConfigurator model={model} weightKg={weight} species={species} selectedKeys={keys} onSelectedKeysChange={setKeys} doseAlternativeKeys={alts} onDoseAlternativeKeysChange={setAlts} medicationOverrides={overrides} onMedicationOverridesChange={setOverrides} onBodyChange={setBody}/><ClinicalMedicationDosePanel medications={model.options.filter(o=>keys.includes(o.key)).flatMap(o=>o.medications||[])} species={species} weightKg={weight} overrides={overrides} onOverridesChange={setOverrides} doseAlternativeKeys={alts}/><PrescriptionMedicationComposer species={species} weightKg={weight} onInsert={block=>setAdded(block)}/></section><div><output data-testid="added-prescription" hidden>{added}</output><pre data-testid="overrides" hidden>{JSON.stringify(overrides)}</pre><PrintPreviewA4 document={doc}/></div></div></main>;
}
createRoot(document.getElementById('root')!).render(<BrowserRouter><App/></BrowserRouter>);

