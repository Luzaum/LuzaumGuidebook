import React from 'react';
import {createRoot} from 'react-dom/client';
import '../index.css';
import '../modules/consulta-vet/theme.css';
import {DiseaseSectionRenderer} from '../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
import {anemiaCaesGatosSeed} from '../modules/consulta-vet/data/seed/diseases.anemia-caes-gatos.seed';
const assets:any[]=[];
function visit(v:any){if(!v||typeof v!=='object')return;if(v.kind==='clinicalTable'||v.kind==='clinicalFigure'||v.kind==='imageModal')assets.push(v);else Object.values(v).forEach(visit);}
visit(anemiaCaesGatosSeed); assets.push({kind:'clinicalFigure',src:'/consulta-vet/brucelose-caes-gatos/algoritmo-diagnostico-manejo-one-health-brucelose.jpg',alt:'Algoritmo de diagnóstico e manejo',display:'full',caption:'Algoritmo clínico completo'});
createRoot(document.getElementById('root')!).render(<main className="consulta-vet-theme"><div className="consulta-vet-main-scroll mx-auto max-w-5xl p-4"><h1>Tabelas e figuras — Anemia</h1>{assets.map((v,i)=><DiseaseSectionRenderer key={i} id={`figure-${i}`} title={v.title||v.caption||'Figura clínica'} data={v}/>)}</div></main>);
