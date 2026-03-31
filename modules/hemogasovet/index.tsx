import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HemoSidebar } from './components/layout/HemoSidebar';

// Pages
import InterpreterPage from './pages/InterpreterPage';
import HistoryPage from './pages/HistoryPage';
import QuizPage from './pages/QuizPage';
import GuidelinesPage from './pages/GuidelinesPage';
import ReferencesPage from './pages/ReferencesPage';
import ParameterGuidePage from './pages/ParameterGuidePage';

export default function HemoGasoVetModule() {
  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Sidebar Navigation */}
      <HemoSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 bg-slate-50 dark:bg-slate-950 overflow-auto">
        <main className="h-full">
          <Routes>
            <Route index element={<InterpreterPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="guidelines" element={<GuidelinesPage />} />
            <Route path="references" element={<ReferencesPage />} />
            <Route path="parameter-guide" element={<ParameterGuidePage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/hemogasovet" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
