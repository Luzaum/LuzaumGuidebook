import React from 'react';
import {createRoot} from 'react-dom/client';
import '../index.css';
import {DiseaseSectionRenderer} from '../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
import {diseasesSeed} from '../modules/consulta-vet/data/seed/diseases.seed';
const figures:any[]=[];
function visit(v:any){if(!v||typeof v!=='object')return;if(v.kind==='imageModal')figures.push(v);else Object.values(v).forEach(visit);}
visit(diseasesSeed);
createRoot(document.getElementById('root')!).render(<main className="mx-auto max-w-5xl p-4"><DiseaseSectionRenderer id="figures" title="Figuras clínicas" data={figures}/></main>);
