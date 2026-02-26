import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./dados-veterinarios.css";

import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { Layout } from "./components/Layout";

import { Dashboard } from "./pages/Dashboard";
import { Patients } from "./pages/Patients";
import { PatientDetails } from "./pages/PatientDetails";
import { Tutors } from "./pages/Tutors";
import { TutorDetails } from "./pages/TutorDetails";
import { Calendar } from "./pages/Calendar";
import { Financial } from "./pages/Financial";
import { ServiceCatalog } from "./pages/ServiceCatalog";
import { Analytics } from "./pages/Analytics";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";

const BASE = "/dados-veterinarios";

export function dvPath(path: string) {
  if (!path) return BASE;
  if (path.startsWith("/")) return `${BASE}${path}`;
  return `${BASE}/${path}`;
}

export default function DadosVeterinariosModule() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Layout>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetails />} />
            <Route path="tutors" element={<Tutors />} />
            <Route path="tutors/:id" element={<TutorDetails />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="financial" element={<Financial />} />
            <Route path="services" element={<ServiceCatalog />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to={dvPath("")} replace />} />
          </Routes>
        </Layout>
      </DataProvider>
    </ThemeProvider>
  );
}
