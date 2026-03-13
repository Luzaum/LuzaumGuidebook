import React from 'react';
import { ArrowLeft, CheckSquare2, FileText, LayoutDashboard, Repeat, Users, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { Button } from './ui/Button';

const navItems = [
  {
    to: '/plantao-vet/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    to: '/plantao-vet/pacientes',
    label: 'Pacientes',
    icon: Users,
  },
  {
    to: '/plantao-vet/pendencias',
    label: 'Pendencias',
    icon: CheckSquare2,
  },
  {
    to: '/plantao-vet/passagem',
    label: 'Passagem',
    icon: Repeat,
  },
  {
    to: '/plantao-vet/importar',
    label: 'Importar prontuario',
    icon: FileText,
  },
];

interface PlantaoVetSidebarProps {
  clinicName: string | null;
  open: boolean;
  onClose: () => void;
}

export function PlantaoVetSidebar({ clinicName, open, onClose }: PlantaoVetSidebarProps) {
  return (
    <aside className="plantao-vet-sidebar flex h-dvh flex-col" data-open={open}>
      <div className="flex items-center justify-between border-b border-[var(--pv-border)] px-6 py-5 lg:hidden">
        <span className="text-sm font-semibold text-[var(--pv-text-main)]">PlantaoVET</span>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar menu">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--pv-border)] bg-white p-1.5">
            <img src="/apps/plantao-vet.png" alt="PlantaoVET" className="h-8 w-8 object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-[var(--pv-text-main)]">
              Plantao<span className="text-[var(--pv-primary)]">VET</span>
            </h1>
            <p className="text-sm text-[var(--pv-text-muted)]">Internacao, pendencias e passagem</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => cn('plantao-vet-nav-link', isActive && 'active')}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--pv-surface-hover)] text-[var(--pv-primary)]">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.label}</p>
              </div>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-[var(--pv-border)] px-4 py-4">
        <div className="mb-3 rounded-2xl border border-[var(--pv-border)] bg-[var(--pv-bg)] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pv-text-muted)]">
            Clinica ativa
          </p>
          <p className="mt-1 truncate text-sm font-medium text-[var(--pv-text-main)]">
            {clinicName || 'Nao identificada'}
          </p>
        </div>
        <Link to="/hub" className="block" onClick={onClose}>
          <Button variant="outline" className="w-full justify-between">
            Voltar ao hub
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </aside>
  );
}
