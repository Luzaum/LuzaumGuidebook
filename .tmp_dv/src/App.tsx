import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { PatientDetails } from './pages/PatientDetails';
import { Tutors } from './pages/Tutors';
import { TutorDetails } from './pages/TutorDetails';
import { Financial } from './pages/Financial';
import { ServiceCatalog } from './pages/ServiceCatalog';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { Calendar } from './pages/Calendar';
import { Settings } from './pages/Settings';

import { Profile } from './pages/Profile';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/:id" element={<PatientDetails />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/tutors/:id" element={<TutorDetails />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/services" element={<ServiceCatalog />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}
