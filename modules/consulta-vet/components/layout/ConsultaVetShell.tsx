import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ConsultaVetHeader } from './ConsultaVetHeader';
import { ConsultaVetSidebar } from './ConsultaVetSidebar';
import { ConsultaVetErrorBoundary } from './ConsultaVetErrorBoundary';
import { AuroraBackground } from '../../../../components/ui/aurora-background';
import '../../theme.css';

export function ConsultaVetShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuroraBackground className="consulta-vet-theme relative flex h-full min-h-full w-full items-stretch justify-start overflow-hidden text-foreground">
      <div className="relative z-10 flex h-full min-h-0 w-full">
        <ConsultaVetSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="consulta-vet-content-panel flex min-h-0 flex-1 flex-col overflow-hidden">
          <ConsultaVetHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="relative flex-1 overflow-y-auto">
            <ConsultaVetErrorBoundary>
              <Outlet />
            </ConsultaVetErrorBoundary>
          </main>
        </div>
      </div>
    </AuroraBackground>
  );
}
