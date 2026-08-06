import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ConsultaVetSidebar } from './ConsultaVetSidebar';
import { ConsultaVetErrorBoundary } from './ConsultaVetErrorBoundary';
import { AuroraBackground } from '../../../../components/ui/aurora-background';
import { prefetchConsultaVetEditorialSeeds } from '../../data/seed/editorialSeedLazy';
import '../../theme.css';

export function ConsultaVetShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    prefetchConsultaVetEditorialSeeds();
  }, []);

  return (
    <AuroraBackground
      as="div"
      fullScreen={false}
      variant="solid"
      className="consulta-vet-theme relative flex h-full min-h-0 flex-1 w-full items-stretch justify-start overflow-hidden text-foreground"
    >
      <div className="relative z-10 flex h-full min-h-0 w-full flex-1">
        <ConsultaVetSidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={() => setIsSidebarOpen(false)}
          onToggleCollapsed={() => setIsSidebarCollapsed((value) => !value)}
        />
        <div className="consulta-vet-content-panel relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border/70 bg-background/90 px-2 backdrop-blur-md md:hidden">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground shadow-sm transition-colors hover:bg-muted"
              aria-label="Abrir menu lateral"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-foreground">Menu do ConsultaVet</span>
          </div>
          <main className="consulta-vet-main-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
            <ConsultaVetErrorBoundary>
              <Outlet />
            </ConsultaVetErrorBoundary>
          </main>
        </div>
      </div>
    </AuroraBackground>
  );
}
