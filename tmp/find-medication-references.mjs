import fs from 'node:fs';
const queries={
 'phenobarbital-review':'Charalambous[Author] AND Brodbelt[Author] AND 2014[Date - Publication]',
 'phenobarbital-thomas':'Thomas WB[Author] AND epilepsy AND 2010[Date - Publication]',
 'phenobarbital-gizzi':'Gizzi[Author] AND phenobarbital',
 'phenobarbital-bailey':'Bailey KS[Author] AND epilepsy',
 'phenobarbital-podell':'Podell[Author] AND seizure AND 2016[Date - Publication]',
 'tramadol-budsberg':'Budsberg[Author] AND tramadol AND 2018[Date - Publication]',
 'tramadol-monteiro':'Monteiro[Author] AND tramadol AND 2017[Date - Publication]',
 'tramadol-pypendop':'Pypendop[Author] AND tramadol AND 2008[Date - Publication]',
 'tramadol-seddighi':'Seddighi[Author] AND tramadol AND 2009[Date - Publication]',
 'aaha':'2022 AAHA Pain Management Guidelines[Title]',
 'dipirona-giorgi':'Giorgi[Author] AND (metamizole OR dipyrone)',
 'dipirona-teixeira':'Teixeira[Author] AND (metamizole OR dipyrone)',
 'dipirona-ferreira':'Ferreira[Author] AND (metamizole OR dipyrone) AND cats',
 'dipirona-imagawa':'Imagawa[Author] AND metamizol',
};const out={};for(const [id,q] of Object.entries(queries)){await new Promise(r=>setTimeout(r,400));const d=await(await fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=12&term='+encodeURIComponent(q))).json();out[id]=d.esearchresult?.idlist??[];}
const ids=[...new Set(Object.values(out).flat())];const summaries=await(await fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id='+ids.join(','))).json();fs.writeFileSync('tmp/medication-review/pubmed-repairs.json',JSON.stringify({out,summaries},null,2));for(const [key,list] of Object.entries(out)){console.log(key);for(const id of list)console.log(id+' '+summaries.result?.[id]?.title);}
