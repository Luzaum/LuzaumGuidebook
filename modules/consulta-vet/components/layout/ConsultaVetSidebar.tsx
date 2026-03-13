import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Clock, FileText, Grid, Pill, ShieldCheck, Stethoscope, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { canManageConsultaVetEditorial } from '../../services/consultaVetEditorialPermissions';

interface ConsultaVetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultaVetSidebar({ isOpen, onClose }: ConsultaVetSidebarProps) {
  const location = useLocation();
  const [canManageEditorial, setCanManageEditorial] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      const next = await canManageConsultaVetEditorial();
      if (!isMounted) return;
      setCanManageEditorial(next);
    };

    void run();

    return () => {
      isMounted = false;
    };
  }, []);

  const links = useMemo(() => {
    const baseLinks = [
      { to: '/consulta-vet', label: 'Início', icon: Grid },
      { to: '/consulta-vet/doencas', label: 'Doenças', icon: Stethoscope },
      { to: '/consulta-vet/medicamentos', label: 'Medicamentos', icon: Pill },
      { to: '/consulta-vet/consensos', label: 'Consensos', icon: FileText },
      { to: '/consulta-vet/favoritos', label: 'Favoritos', icon: Bookmark },
      { to: '/consulta-vet/recentes', label: 'Recentes', icon: Clock },
    ];

    if (canManageEditorial) {
      baseLinks.push({ to: '/consulta-vet/editorial', label: 'Editorial', icon: ShieldCheck });
    }

    return baseLinks;
  }, [canManageEditorial]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      <aside
        className={cn(
          'consulta-vet-sidebar-panel fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
              <Stethoscope className="h-6 w-6 text-primary" />
              VETIUS
            </h1>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Consulta VET
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          {links.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.to !== '/consulta-vet' && location.pathname.startsWith(link.to));

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <link.icon
                  className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground')}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
