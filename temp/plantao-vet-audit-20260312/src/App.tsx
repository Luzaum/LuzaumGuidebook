/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { SmartImport } from './pages/SmartImport';
import { PatientDetail } from './pages/PatientDetail';
import { Patients } from './pages/Patients';
import { PendingTasks } from './pages/PendingTasks';
import { ShiftHandover } from './pages/ShiftHandover';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="importar" element={<SmartImport />} />
          <Route path="paciente/:id" element={<PatientDetail />} />
          <Route path="pacientes" element={<Patients />} />
          <Route path="pendencias" element={<PendingTasks />} />
          <Route path="passagem" element={<ShiftHandover />} />
        </Route>
      </Routes>
    </Router>
  );
}
