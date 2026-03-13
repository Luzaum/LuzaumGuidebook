import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare, 
  Repeat, 
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Pacientes', path: '/pacientes' },
  { icon: FileText, label: 'Importar Prontuário', path: '/importar' },
  { icon: CheckSquare, label: 'Pendências', path: '/pendencias' },
  { icon: Repeat, label: 'Passagem de Plantão', path: '/passagem' },
];

export function Sidebar() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <aside className="w-64 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent-purple)] flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl leading-none">V</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
          Plantão<span className="text-[var(--primary)]">VET</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-[var(--primary)]/10 text-[var(--primary)]" 
                  : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-main)]"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border)] space-y-2">
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-main)] transition-all duration-200"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {isDark ? 'Modo Claro' : 'Modo Escuro'}
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-main)] transition-all duration-200">
          <Settings className="w-5 h-5" />
          Configurações
        </button>
      </div>
    </aside>
  );
}
