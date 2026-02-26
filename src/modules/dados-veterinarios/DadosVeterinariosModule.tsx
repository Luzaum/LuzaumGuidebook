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
        <div className="dados-veterinarios-root">
          <Layout>
            <Routes>
              <Route path={dvPath("")} element={<Dashboard />} />
              <Route path={dvPath("patients")} element={<Patients />} />
              <Route path={dvPath("patients/:id")} element={<PatientDetails />} />
              <Route path={dvPath("tutors")} element={<Tutors />} />
              <Route path={dvPath("tutors/:id")} element={<TutorDetails />} />
              <Route path={dvPath("calendar")} element={<Calendar />} />
              <Route path={dvPath("financial")} element={<Financial />} />
              <Route path={dvPath("services")} element={<ServiceCatalog />} />
              <Route path={dvPath("analytics")} element={<Analytics />} />
              <Route path={dvPath("reports")} element={<Reports />} />
              <Route path={dvPath("settings")} element={<Settings />} />
              <Route path={dvPath("profile")} element={<Profile />} />
              <Route path={dvPath("*")} element={<Navigate to={dvPath("")} replace />} />
            </Routes>
          </Layout>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}
