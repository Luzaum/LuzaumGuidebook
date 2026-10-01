import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import '../index.css';
import {UltrasoundReferencePage} from '../modules/consulta-vet/pages/quickReferences/UltrasoundReferencePage';
createRoot(document.getElementById('root')!).render(<BrowserRouter><UltrasoundReferencePage/></BrowserRouter>);
