/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConsultaVetShell } from './modules/consulta-veterinaria/components/layout/ConsultaVetShell';
import { HomePage } from './modules/consulta-veterinaria/pages/HomePage';
import { DiseasesPage } from './modules/consulta-veterinaria/pages/DiseasesPage';
import { DiseaseDetailPage } from './modules/consulta-veterinaria/pages/DiseaseDetailPage';
import { MedicationsPage } from './modules/consulta-veterinaria/pages/MedicationsPage';
import { MedicationDetailPage } from './modules/consulta-veterinaria/pages/MedicationDetailPage';
import { ConsensosPage } from './modules/consulta-veterinaria/pages/ConsensosPage';
import { ConsensoDetailPage } from './modules/consulta-veterinaria/pages/ConsensoDetailPage';
import { FavoritesPage } from './modules/consulta-veterinaria/pages/FavoritesPage';
import { RecentsPage } from './modules/consulta-veterinaria/pages/RecentsPage';
import { CategoriesPage } from './modules/consulta-veterinaria/pages/CategoriesPage';
import { CategoryDetailPage } from './modules/consulta-veterinaria/pages/CategoryDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/consulta-veterinaria" replace />} />
        
        <Route path="/consulta-veterinaria" element={<ConsultaVetShell />}>
          <Route index element={<HomePage />} />
          <Route path="doencas" element={<DiseasesPage />} />
          <Route path="doencas/:slug" element={<DiseaseDetailPage />} />
          <Route path="medicamentos" element={<MedicationsPage />} />
          <Route path="medicamentos/:slug" element={<MedicationDetailPage />} />
          <Route path="consensos" element={<ConsensosPage />} />
          <Route path="consensos/:slug" element={<ConsensoDetailPage />} />
          <Route path="favoritos" element={<FavoritesPage />} />
          <Route path="recentes" element={<RecentsPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="categorias/:slug" element={<CategoryDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
