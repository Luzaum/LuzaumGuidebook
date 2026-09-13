import React from 'react';
import {createRoot} from 'react-dom/client';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {ClinicalQuickGuideDetailPage} from '../../modules/consulta-vet/pages/ClinicalQuickGuideDetailPage';
import '../../index.css';
const slug = location.search.includes('medula') ? 'puncao-biopsia-medula-ossea-caes-gatos' : 'biopsia-incisional-caes-gatos';
createRoot(document.getElementById('root')!).render(<MemoryRouter initialEntries={['/consulta-vet/guias-rapidos/'+slug]}><Routes><Route path="/consulta-vet/guias-rapidos/:slug" element={<ClinicalQuickGuideDetailPage/>}/></Routes></MemoryRouter>);
