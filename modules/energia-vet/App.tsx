import React, { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Calculator, FileText, Home, Info, Settings, Stethoscope, Users, Utensils } from 'lucide-react';

import Dashboard from './pages/Dashboard';
import NewCalculation from './pages/NewCalculation';
import Patients from './pages/Patients';
import Foods from './pages/Foods';
import Hospitalized from './pages/Hospitalized';
import Reports from './pages/Reports';
import BcsGuide from './pages/BcsGuide';
import NaturalFoods from './pages/NaturalFoods';
import { cn } from './lib/utils';
import './index.css';

const BASE_ROUTE = '/calculadora-energetica';
const LEGACY_STORAGE_KEYS = ['vetius-nutricao-history-v1', 'vetius-nutricao-draft-v1'];
const MODULE_NAME = 'NutriçãoVET';
const MODULE_LOGO = '/apps/nutricaovet.png';

function modulePath(path: string) {
  return path === '/' ? BASE_ROUTE : `${BASE_ROUTE}${path}`;
}

function Sidebar() {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Novo Cálculo', path: '/new', icon: Calculator },
    { name: 'Pacientes', path: '/patients', icon: Users },
    { name: 'Guia BCS', path: '/bcs', icon: Info },
    { name: 'Alimentos', path: '/foods', icon: Utensils },
    { name: 'Hospitalizado', path: '/hospitalized', icon: Stethoscope },
    { name: 'Relatórios', path: '/reports', icon: FileText },
  ];

  return (
    <aside className="energia-vet-sidebar hidden w-72 shrink-0 border-r border-border/70 bg-card/95 lg:flex lg:flex-col">
      <div className="border-b border-border/60 p-6">
        <div className="flex items-center gap-3">
          <img src={MODULE_LOGO} alt={MODULE_NAME} className="h-14 w-14 rounded-2xl bg-white/70 p-1 object-contain shadow-sm" />
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">{MODULE_NAME}</p>
            <p className="text-sm text-muted-foreground">Nutrição clínica veterinária</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-5">
        {links.map((link) => {
          const Icon = link.icon;
          const href = modulePath(link.path);
          const isActive = location.pathname === href || (link.path !== '/' && location.pathname.startsWith(`${href}`));

          return (
            <Link
              key={link.path}
              to={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border/60 p-4">
        <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground">
          <Settings className="h-5 w-5" />
          Configurações
        </div>
      </div>
    </aside>
  );
}

function MobileNav() {
  const links = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Novo', path: '/new', icon: Calculator },
    { name: 'Pacientes', path: '/patients', icon: Users },
    { name: 'Alimentos', path: '/foods', icon: Utensils },
    { name: 'Relatórios', path: '/reports', icon: FileText },
  ];
  const location = useLocation();

  return (
    <nav className="energia-vet-mobile-nav fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-card/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const href = modulePath(link.path);
          const isActive = location.pathname === href || (link.path !== '/' && location.pathname.startsWith(`${href}`));

          return (
            <Link
              key={link.path}
              to={href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium',
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="energia-vet-shell flex min-h-dvh bg-background">
      <Sidebar />
      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-10 lg:py-10">
          <div className="w-full max-w-none">
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    for (const key of LEGACY_STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="new/*" element={<NewCalculation />} />
          <Route path="patients" element={<Patients />} />
          <Route path="bcs" element={<BcsGuide />} />
          <Route path="foods" element={<Foods />} />
          <Route path="foods/natural" element={<NaturalFoods />} />
          <Route path="hospitalized" element={<Hospitalized />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to={BASE_ROUTE} replace />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </>
  );
}
