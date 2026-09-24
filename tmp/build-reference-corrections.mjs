import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('tmp/medication-review/pubmed-repairs.json','utf8'));
const mapping={
'fenobarbital':{'ref-ivetf-guidelines-2015':'26316233','ref-charalambous-meta-2014':'25338624','ref-boothe-comp-2012':'22515627','ref-thomas-epilepsy-2010':'19942062','ref-podell-status-2016':'26899355'},
'dipirona':{'ref-giorgi-2017':'29352476','ref-giorgi-2018':'29164623','ref-teixeira-2013':'26026350','ref-imagawa-2011':'21627755'},
'tramadol':{'ref-budsberg-2018-oa-dog':'29393744','ref-monteiro-2017-feline-oa':'28403198','ref-pypendop-ilkiw-2008-cat-pk':'18177319','ref-seddighi-2009-mac-tramadol':'19538570','ref-aaha-pain-guidelines':'35195712'}};
const ids=[...new Set(Object.values(mapping).flatMap(x=>Object.values(x)))];const data=await(await fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id='+ids.join(','))).json();
const corrections={};for(const [slug,entries]of Object.entries(mapping)){corrections[slug]={};for(const [id,pmid]of Object.entries(entries)){const r=data.result[pmid];corrections[slug][id]={id,citationText:`${r.authors.slice(0,3).map(a=>a.name).join(', ')}${r.authors.length>3?', et al.':''}. ${r.title} ${r.source}. ${r.pubdate};${r.volume}${r.issue?'('+r.issue+')':''}:${r.pages}.`,url:`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,sourceType:'Publicação indexada',notes:'Título e identificador conferidos no PubMed em 19/09/2026; resultados devem ser interpretados no contexto do estudo.'};}}
fs.writeFileSync('tmp/medication-review/verified-reference-corrections.json',JSON.stringify(corrections,null,2));
console.log(JSON.stringify(corrections,null,2));
