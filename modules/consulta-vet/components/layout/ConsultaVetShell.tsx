import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ConsultaVetSidebar } from './ConsultaVetSidebar';
import { ConsultaVetErrorBoundary } from './ConsultaVetErrorBoundary';
import { AuroraBackground } from '../../../../components/ui/aurora-background';
import '../../theme.css';

export function ConsultaVetShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuroraBackground
      as="div"
      fullScreen={false}
      variant="solid"
      className="consulta-vet-theme relative flex h-full min-h-0 flex-1 w-full items-stretch justify-start overflow-hidden text-foreground"
    >
      <div className="relative z-10 flex h-full min-h-0 w-full flex-1">
        <ConsultaVetSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="consulta-vet-content-panel relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-background/90 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-muted md:hidden"
            aria-label="Abrir menu lateral"
          >
            <Menu className="h-5 w-5" />
          </button>
          <main className="consulta-vet-main-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto">
            <ConsultaVetErrorBoundary>
              <Outlet />
            </ConsultaVetErrorBoundary>
          </main>
        </div>
      </div>
    </AuroraBackground>
  );
}
