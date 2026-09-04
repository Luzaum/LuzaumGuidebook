import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calculator,
  ChevronRight,
  FileText,
  Fish,
  Home,
  Info,
  Stethoscope,
  Users,
  Utensils,
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import NewCalculation from './pages/NewCalculation';
import Patients from './pages/Patients';
import Foods from './pages/Foods';
import CommercialDietsPage from './pages/CommercialDietsPage';
import Reports from './pages/Reports';
import BcsGuide from './pages/BcsGuide';
import NaturalFoods from './pages/NaturalFoods';
import PatientHistoryDetail from './pages/PatientHistoryDetail';
import ReportDetail from './pages/ReportDetail';
import Hospitalized from './pages/Hospitalized';
import HumanOmega3Page from './pages/HumanOmega3Page';
import SupplementCatalogPage from './pages/SupplementCatalogPage';
import { cn } from './lib/utils';
import './index.css';

const BASE_ROUTE = '/calculadora-energetica';
const MODULE_NAME = 'NutriçãoVET';
const MODULE_LOGO = '/apps/nutricaovet.png';

const navigation = [
  { name: 'Visão geral', shortName: 'Início', path: '/', icon: Home },
  { name: 'Novo cálculo', shortName: 'Novo', path: '/new', icon: Calculator },
  { name: 'Rações comerciais', shortName: 'Rações', path: '/commercial', icon: Utensils },
  { name: 'Hospitalizados', shortName: 'Internados', path: '/hospitalized', icon: Stethoscope },
  { name: 'Pacientes', shortName: 'Pacientes', path: '/patients', icon: Users },
  { name: 'Base de alimentos', shortName: 'Alimentos', path: '/foods', icon: FileText },
  { name: 'Relatórios', shortName: 'Relatórios', path: '/reports', icon: FileText },
  { name: 'Guia de ECC', shortName: 'ECC', path: '/bcs', icon: Info },
];

function modulePath(path: string) {
  return path === '/' ? BASE_ROUTE : `${BASE_ROUTE}${path}`;
}

function isCurrentPath(pathname: string, path: string) {
  const href = modulePath(path);
  return pathname === href || (path !== '/' && pathname.startsWith(href));
}

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="energia-vet-sidebar hidden h-full min-h-0 w-[248px] shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="shrink-0 px-5 pb-5 pt-6">
        <Link
          to={modulePath('/')}
          className="energia-vet-sidebar-brand flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${MODULE_NAME} — ir para o início`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
            <img src={MODULE_LOGO} alt="" className="h-10 w-10 object-contain" width={40} height={40} decoding="async" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold tracking-tight text-foreground">{MODULE_NAME}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">Nutrição clínica</span>
          </span>
        </Link>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3" aria-label="Navegação do NutriçãoVET">
        {navigation.map((item) => {
          const Icon = item.icon;
          const href = modulePath(item.path);
          const isActive = isCurrentPath(location.pathname, item.path);

          return (
            <Link
              key={item.path}
              to={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.9} />
              <span className="flex-1">{item.name}</span>
              {isActive && <ChevronRight className="h-4 w-4 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      <div className="mx-5 mb-5 mt-4 shrink-0 border-t border-border pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Vetius Clinical Suite</p>
      </div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b border-border bg-card/95 px-4 backdrop-blur lg:hidden">
      <Link to={modulePath('/')} className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-primary/10">
          <img src={MODULE_LOGO} alt="" className="h-8 w-8 object-contain" />
        </span>
        <span>
          <span className="block text-sm font-semibold leading-none text-foreground">{MODULE_NAME}</span>
          <span className="mt-1 block text-[11px] leading-none text-muted-foreground">Nutrição clínica</span>
        </span>
      </Link>
    </header>
  );
}

function MobileNav() {
  const location = useLocation();
  const mobileItems = navigation;

  return (
    <nav className="energia-vet-mobile-nav fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-0.5 overflow-x-auto no-scrollbar">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const href = modulePath(item.path);
          const isActive = isCurrentPath(location.pathname, item.path);

          return (
            <Link
              key={item.path}
              to={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex min-h-12 min-w-[56px] flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1 text-[9px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:text-[10px]',
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="w-full truncate text-center">{item.shortName}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('energia-vet-shell flex h-full min-h-0 w-full flex-1 overflow-hidden bg-background')}>
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <MobileHeader />
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:py-9 lg:pb-10 xl:px-10">
          <div className="mx-auto w-full max-w-[1480px]">{children}</div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const pathSegment = location.pathname.replace(BASE_ROUTE, '').split('/').filter(Boolean)[0] || 'dashboard';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathSegment}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="new/*" element={<NewCalculation />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:patientKey" element={<PatientHistoryDetail />} />
          <Route path="commercial" element={<CommercialDietsPage />} />
          <Route path="racoes" element={<Navigate to={`${BASE_ROUTE}/commercial`} replace />} />
          <Route path="racoes-comerciais" element={<Navigate to={`${BASE_ROUTE}/commercial`} replace />} />
          <Route path="hospitalized" element={<Hospitalized />} />
          <Route path="internados" element={<Navigate to={`${BASE_ROUTE}/hospitalized`} replace />} />
          <Route path="omega3" element={<HumanOmega3Page />} />
          <Route path="suplementos" element={<SupplementCatalogPage />} />
          <Route path="bcs" element={<BcsGuide />} />
          <Route path="foods" element={<Foods />} />
          <Route path="foods/natural" element={<NaturalFoods />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:reportId" element={<ReportDetail />} />
          <Route path="*" element={<Navigate to={BASE_ROUTE} replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <Layout>
        <AnimatedRoutes />
      </Layout>
      <Toaster position="top-right" richColors />
    </>
  );
}
