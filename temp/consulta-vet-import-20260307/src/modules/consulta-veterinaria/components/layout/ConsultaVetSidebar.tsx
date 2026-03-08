import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Pill, FileText, Bookmark, Clock, Grid, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface ConsultaVetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultaVetSidebar({ isOpen, onClose }: ConsultaVetSidebarProps) {
  const location = useLocation();

  const links = [
    { to: '/consulta-veterinaria', label: 'Início', icon: Grid },
    { to: '/consulta-veterinaria/doencas', label: 'Doenças', icon: Stethoscope },
    { to: '/consulta-veterinaria/medicamentos', label: 'Medicamentos', icon: Pill },
    { to: '/consulta-veterinaria/consensos', label: 'Consensos', icon: FileText },
    { to: '/consulta-veterinaria/favoritos', label: 'Favoritos', icon: Bookmark },
    { to: '/consulta-veterinaria/recentes', label: 'Recentes', icon: Clock },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-primary" />
              VETIUS
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Consulta Veterinária</p>
          </div>
          <button onClick={onClose} className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = location.pathname === link.to || (link.to !== '/consulta-veterinaria' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <link.icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-muted-foreground')} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
