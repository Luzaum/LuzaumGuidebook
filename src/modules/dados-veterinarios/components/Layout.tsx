import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '../context/ThemeContext';
import { dvPath } from '../DadosVeterinariosModule';
import { Logo } from './Logo';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import { 
  LayoutGrid, 
  PawPrint, 
  User,
  Calendar, 
  FileText, 
  DollarSign, 
  PieChart, 
  List, 
  BarChart2, 
  Settings, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Plus,
  LogOut
} from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: <LayoutGrid className="h-5 w-5 flex-shrink-0" />, label: 'Visão Geral', href: dvPath('') },
    { icon: <PawPrint className="h-5 w-5 flex-shrink-0" />, label: 'Pacientes', href: dvPath('patients') },
    { icon: <User className="h-5 w-5 flex-shrink-0" />, label: 'Tutores', href: dvPath('tutors') },
    { icon: <Calendar className="h-5 w-5 flex-shrink-0" />, label: 'Agenda', href: dvPath('calendar') },
    { icon: <DollarSign className="h-5 w-5 flex-shrink-0" />, label: 'Financeiro', href: dvPath('financial') },
    { icon: <PieChart className="h-5 w-5 flex-shrink-0" />, label: 'Análise', href: dvPath('analytics') },
    { icon: <List className="h-5 w-5 flex-shrink-0" />, label: 'Serviços', href: dvPath('services') },
    { icon: <BarChart2 className="h-5 w-5 flex-shrink-0" />, label: 'Relatórios', href: dvPath('reports') },
    { icon: <Settings className="h-5 w-5 flex-shrink-0" />, label: 'Configurações', href: dvPath('settings') },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 overflow-hidden">
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen}>
        <SidebarBody className="justify-between gap-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-neutral-800">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                V
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl text-gray-900 dark:text-white whitespace-pre"
              >
                Vetius
              </motion.span>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {menuItems.map((item, idx) => (
                <SidebarLink key={idx} link={item} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Dr. Ricardo",
                href: dvPath('profile'),
                icon: (
                  <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocIq8dD8_i2lE7_yO2_n7_h8_r9_w0_k1_l2_m3_n4_o5=s96-c"
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between px-6 sticky top-0 z-20 transition-colors duration-300">
          <div className="flex-1 flex items-center">
             {/* Search Bar */}
             <div className="relative w-full max-w-md hidden md:block group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-neutral-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-neutral-800 transition-all outline-none placeholder-gray-400 font-medium text-gray-900 dark:text-white"
                />
             </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2">
               <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                V
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Vetius</span>
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-sm font-bold active:scale-95">
              <Plus size={18} />
              <span>Novo</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-gray-50/50 dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
