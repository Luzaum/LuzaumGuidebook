import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { HemoSidebar } from './components/layout/HemoSidebar';
import { Button } from '../../components/ui/button';

// Pages
import InterpreterPage from './pages/InterpreterPage';
import HistoryPage from './pages/HistoryPage';
import QuizPage from './pages/QuizPage';
import GuidelinesPage from './pages/GuidelinesPage';
import ReferencesPage from './pages/ReferencesPage';
import ParameterGuidePage from './pages/ParameterGuidePage';

export default function HemoGasoVetModule() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background font-sans text-foreground lg:flex-row">
      {/* Barra compacta no mobile: menu + marca */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu de navegação"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
            <img src="/apps/hemogasovetzx.png" alt="" className="h-full w-full object-cover" />
          </div>
          <span className="truncate text-sm font-bold text-slate-900 dark:text-white">HemoGasoVet</span>
        </div>
        <div className="w-10 shrink-0" aria-hidden />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 flex w-[min(20rem,92vw)] flex-col border-r border-slate-200 bg-slate-50 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 px-3 dark:border-slate-800">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Navegação</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <HemoSidebar
                variant="drawer"
                omitHeader
                onLinkClick={() => setMobileOpen(false)}
                className="border-0"
              />
            </div>
          </aside>
        </div>
      )}

      <div className="hidden h-full min-h-0 shrink-0 lg:flex">
        <HemoSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <main className="min-h-full min-w-0 w-full">
          <div className="box-border w-full min-w-0 px-4 py-6 pb-10 sm:px-6 lg:px-8">
            <Routes>
              <Route index element={<InterpreterPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="quiz" element={<QuizPage />} />
              <Route path="guidelines" element={<GuidelinesPage />} />
              <Route path="references" element={<ReferencesPage />} />
              <Route path="parameter-guide" element={<ParameterGuidePage />} />
              <Route path="*" element={<Navigate to="/hemogasovet" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
