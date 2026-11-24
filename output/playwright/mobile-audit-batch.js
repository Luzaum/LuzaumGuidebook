async (page) => {
 const routes=['/consulta-vet','/consulta-vet/doencas','/consulta-vet/doencas/cistite-idiopatica-felina','/consulta-vet/medicamentos','/consulta-vet/medicamentos/fenobarbital','/consulta-vet/apresentacoes-comerciais','/consulta-vet/consensos','/consulta-vet/consensos/hipertensao-sistemica','/consulta-vet/favoritos','/consulta-vet/recentes','/consulta-vet/categorias','/consulta-vet/categorias/cardiologia','/consulta-vet/manejo-emergencial','/consulta-vet/manejo-emergencial/cetoacidose-diabetica','/consulta-vet/guias-rapidos','/consulta-vet/guias-rapidos/biopsia-incisional-caes-gatos','/consulta-vet/referencias-rapidas',...['oncologia','vhs','ultrassom','apple','sara'].map(s=>'/consulta-vet/referencias-rapidas/'+s),'/fluidoterapia-vet','/transfusao-sanguinea','/antibioticoterapia','/dor','/neurologia',...['exame','base-dados','exame-rapido','exame-rapido/paciente','historico','glasgow'].map(s=>'/neurologia/'+s),'/calculadora-energetica',...['new','patients','commercial','hospitalized','omega3','suplementos','bcs','foods','foods/natural','reports'].map(s=>'/calculadora-energetica/'+s),'/conta/perfil','/conta/configuracoes','/conta/clinica','/login','/signup','/reset-password'];
 const report=[];
 for(const route of routes.slice(0, 12)){ try {
 await page.goto('http://localhost:5173'+route, {waitUntil:'domcontentloaded', timeout:20000}); await page.waitForTimeout(900);
 const data=await page.evaluate(()=>{
 const bad=[]; for(const el of document.querySelectorAll('main *,header *')){
 const r=el.getBoundingClientRect(); if(!r.width||!r.height||r.bottom<0||getComputedStyle(el).visibility==='hidden')continue;
 if(r.right>innerWidth+2||r.left< -2){
 let p=el.parentElement,scroll=false;while(p){if(['auto','scroll'].includes(getComputedStyle(p).overflowX)&&p.scrollWidth>p.clientWidth+2){scroll=true;break;}p=p.parentElement;}
 if(!scroll && !el.closest('aside') && bad.length<8)bad.push({tag:el.tagName,text:(el.textContent||'').trim().slice(0,65),x:Math.round(r.x),w:Math.round(r.width),cls:String(el.className).slice(0,150)});
 }}
 return {width:innerWidth,body:document.documentElement.scrollWidth,bad,head:document.querySelector('h1')?.textContent,buttons:document.querySelectorAll('button').length};});
 report.push({route,...data}); } catch(error) {report.push({route,error:String(error)});}
 }
 console.log(JSON.stringify(report));
}


