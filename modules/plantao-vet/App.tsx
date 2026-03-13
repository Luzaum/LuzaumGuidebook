import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useClinic } from '@/src/components/ClinicProvider';

import { PlantaoVetShell } from './components/PlantaoVetShell';
import { DashboardPage } from './pages/DashboardPage';
import { PatientDetailPage } from './pages/PatientDetailPage';
import { PatientsPage } from './pages/PatientsPage';
import { PendingTasksPage } from './pages/PendingTasksPage';
import { ShiftHandoverPage } from './pages/ShiftHandoverPage';
import { SmartImportPage } from './pages/SmartImportPage';
import { usePlantaoVetStore } from './store/usePlantaoVetStore';
import './styles.css';

export default function PlantaoVetApp() {
  const { clinicId } = useClinic();
  const ensureClinicScope = usePlantaoVetStore((state) => state.ensureClinicScope);

  useEffect(() => {
    ensureClinicScope(clinicId);
  }, [clinicId, ensureClinicScope]);

  return (
    <Routes>
      <Route element={<PlantaoVetShell />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="pacientes" element={<PatientsPage />} />
        <Route path="paciente/:patientId" element={<PatientDetailPage />} />
        <Route path="pendencias" element={<PendingTasksPage />} />
        <Route path="passagem" element={<ShiftHandoverPage />} />
        <Route path="importar" element={<SmartImportPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
