import fs from 'node:fs';
import { medicationsSeed } from '../modules/consulta-vet/data/seed/medications.seed';
import { MEDICATION_BOOK_FOUNDATIONS, applyMedicationBookFoundations } from '../modules/consulta-vet/data/medicationBookFoundations';
import { MEDICATION_EVIDENCE_ADDITIONS } from '../modules/consulta-vet/data/medicationEvidenceAdditions';
import { PLUMBS_10_MONOGRAPH_AUDIT } from '../modules/consulta-vet/data/plumbs10MedicationAudit';
import { CONSULTA_VET_PUBLIC_MEDICATION_SLUGS } from '../modules/consulta-vet/constants/publicCatalog';
fs.mkdirSync('tmp/medication-audit-20261001',{recursive:true});
fs.writeFileSync('tmp/medication-audit-20261001/catalog.json',JSON.stringify({medications:medicationsSeed,books:MEDICATION_BOOK_FOUNDATIONS,plumbs:PLUMBS_10_MONOGRAPH_AUDIT,publicSlugs:CONSULTA_VET_PUBLIC_MEDICATION_SLUGS},null,2));
console.log(medicationsSeed.map(m=>({slug:m.slug,doses:m.doses.length,detail:m.detailedIndications?.length,quick:m.quickIndications?.length,refs:m.references?.length,pk:!!m.pharmacokineticsData,studies:m.clinicalStudiesCommented?.length,foundation:m.clinicalFoundationsData?.length}))); 
const env=fs.readFileSync('.env.local','utf8');
const get=(name:string)=>env.match(new RegExp('^'+name+'=(.*)$','m'))?.[1]?.trim().replace(/^['"]|['"]$/g,'');
const url=get('VITE_SUPABASE_URL'),key=get('VITE_SUPABASE_ANON_KEY');
if(url&&key){try{const r=await fetch(url+'/rest/v1/consulta_vet_medications?select=*&is_published=eq.true',{headers:{apikey:key,Authorization:'Bearer '+key},signal:AbortSignal.timeout(20000)});const data=await r.json();fs.writeFileSync('tmp/medication-audit-20261001/remote.json',JSON.stringify({status:r.status,data},null,2)); console.log('Remote status',r.status,'rows',Array.isArray(data)?data.length:0);}catch(e){console.log('Remote unavailable',String(e));}}else console.log('Remote env unavailable');
const remote=JSON.parse(fs.readFileSync('tmp/medication-audit-20261001/remote.json','utf8')).data;
// Reproduce only the read mapper; never instantiate a writing repository.
const mapped=remote.map((r:any)=>{
 const refs=(r.references||[]).filter((x:any)=>x&&typeof x==='object').map((x:any)=>({id:x.id,citationText:x.citationText||x.citation||x.label,sourceType:x.sourceType,url:x.url,notes:x.notes,evidenceLevel:x.evidenceLevel||x.evidence_level})).filter((x:any)=>x.citationText);
 const ids=new Set(refs.map((r:any)=>r.id));
 const amount=Number(r.price_reference_amount_brl);
 const priceReference=Number.isFinite(amount)&&amount>=0&&r.price_reference_label&&r.price_reference_presentation&&r.price_reference_source_name&&r.price_reference_source_url&&r.price_reference_checked_at?{amountBrl:amount,label:r.price_reference_label,presentation:r.price_reference_presentation,sourceName:r.price_reference_source_name,sourceUrl:r.price_reference_source_url,checkedAt:r.price_reference_checked_at,notes:r.price_reference_notes||null}:null;
 return applyMedicationBookFoundations({id:r.id,slug:r.slug,title:r.title,activeIngredient:r.active_ingredient,isControlled:!!r.is_controlled,tradeNames:r.trade_names||[],officialSiteUrl:r.official_site_url,leafletUrl:r.leaflet_url,imageUrl:r.image_url,priceReference,pharmacologicClass:r.pharmacologic_class,species:r.species||[],category:r.category_id,tags:r.tags||[],mechanismOfAction:r.mechanism_of_action,plainLanguageSummary:r.plain_language_summary,indications:r.indications||[],contraindications:r.contraindications||[],cautions:r.cautions||[],adverseEffects:r.adverse_effects||[],interactions:r.interactions||[],routes:r.routes||[],doses:r.doses||[],presentations:(r.presentations||[]).map((p:any)=>({...p,channel:p.channel||'veterinary'})),clinicalNotesRichText:r.clinical_notes_rich_text,clinicalStructuredBlocks:r.clinical_structured_blocks,adminNotesText:r.admin_notes_text,relatedDiseaseSlugs:[],references:[...refs,...(MEDICATION_EVIDENCE_ADDITIONS[r.slug]||[]).filter(x=>!ids.has(x.id))],isPublished:r.is_published,source:'supabase',createdAt:r.created_at,updatedAt:r.updated_at});
});
const merged=new Map(medicationsSeed.map(m=>[m.slug,m])); mapped.forEach((m:any)=>merged.set(m.slug,m));
fs.writeFileSync('tmp/medication-audit-20261001/effective.json',JSON.stringify([...merged.values()].filter(m=>(CONSULTA_VET_PUBLIC_MEDICATION_SLUGS as readonly string[]).includes(m.slug)),null,2));
fs.writeFileSync('tmp/medication-audit-20261001/remote-nonpublic.json',JSON.stringify(mapped.filter((m:any)=>!(CONSULTA_VET_PUBLIC_MEDICATION_SLUGS as readonly string[]).includes(m.slug)),null,2));
