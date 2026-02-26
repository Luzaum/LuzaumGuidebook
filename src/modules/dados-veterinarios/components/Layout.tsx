import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useClinicAuth } from '../context/ClinicAuthContext';
import { dvPath } from '../DadosVeterinariosModule';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import {
  LayoutGrid,
  PawPrint,
  User,
  Calendar,
  DollarSign,
  PieChart,
  List,
  BarChart2,
  Settings,
  Search,
  Sun,
  Moon,
  BedDouble,
  Building2,
  Shield,
  ClipboardList,
} from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { clinics, currentUser, isAdmin, selectedClinicId, setSelectedClinicId } = useClinicAuth();

  const selectedClinicName = useMemo(() => {
    if (selectedClinicId === 'all') return 'Todas as unidades';
    return clinics.find((clinic) => clinic.id === selectedClinicId)?.name ?? 'Unidade';
  }, [clinics, selectedClinicId]);

  const menuItems = [
    { icon: <LayoutGrid className="h-5 w-5 flex-shrink-0" />, label: 'Visão Geral', href: dvPath('') },
    { icon: <PawPrint className="h-5 w-5 flex-shrink-0" />, label: 'Pacientes', href: dvPath('patients') },
    { icon: <User className="h-5 w-5 flex-shrink-0" />, label: 'Tutores', href: dvPath('tutors') },
    { icon: <Calendar className="h-5 w-5 flex-shrink-0" />, label: 'Agenda', href: dvPath('calendar') },
    { icon: <BedDouble className="h-5 w-5 flex-shrink-0" />, label: 'Internamento', href: dvPath('internment') },
    { icon: <ClipboardList className="h-5 w-5 flex-shrink-0" />, label: 'Mapa de Execução', href: dvPath('execution-map') },
    { icon: <List className="h-5 w-5 flex-shrink-0" />, label: 'Serviços', href: dvPath('services') },
    { icon: <DollarSign className="h-5 w-5 flex-shrink-0" />, label: 'Financeiro', href: dvPath('financial') },
    { icon: <PieChart className="h-5 w-5 flex-shrink-0" />, label: 'Análise', href: dvPath('analytics') },
    { icon: <BarChart2 className="h-5 w-5 flex-shrink-0" />, label: 'Relatórios', href: dvPath('reports') },
    ...(isAdmin ? [{ icon: <Building2 className="h-5 w-5 flex-shrink-0" />, label: 'Unidades', href: dvPath('units') }] : []),
    { icon: <Settings className="h-5 w-5 flex-shrink-0" />, label: 'Configurações', href: dvPath('settings') },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 overflow-hidden">
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen}>
        <SidebarBody className="justify-between gap-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-neutral-800">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex items-center gap-2 px-2 py-1">
              <img src="/apps/uapepet.png" alt="UPA PET" className="h-10 w-auto object-contain" />
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-lg text-gray-900 dark:text-white whitespace-pre">
                Dados Veterinários
              </motion.span>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {menuItems.map((item, idx) => (
                <SidebarLink key={idx} link={item} className={location.pathname === item.href ? 'text-primary' : undefined} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: currentUser.name,
                href: dvPath('profile'),
                icon: (
                  <div className="h-7 w-7 rounded-md bg-primary/20 text-primary flex items-center justify-center">
                    <Shield size={15} />
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        <header className="h-16 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 transition-colors duration-300 gap-4">
          <div className="flex-1 flex items-center gap-3">
            <div className="relative w-full max-w-md hidden md:block group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <Search size={18} />
              </div>
              <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-neutral-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-neutral-800 transition-all outline-none placeholder-gray-400 font-medium text-gray-900 dark:text-white" />
            </div>
            <select value={selectedClinicId} onChange={(e) => setSelectedClinicId(e.target.value)} className="max-w-[260px] px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 text-sm">
              <option value="all">Todas as unidades</option>
              {clinics.map((clinic) => <option key={clinic.id} value={clinic.id}>{clinic.name}</option>)}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
            <img src="/apps/uapepet.png" alt="UPA PET" className="h-10 w-auto object-contain" />
            <span>{selectedClinicName}</span>
          </div>

          <div className="flex-1 flex justify-end items-center gap-3">
            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">{currentUser.name}</span>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 md:p-6 scroll-smooth bg-gray-50/50 dark:bg-neutral-950">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
