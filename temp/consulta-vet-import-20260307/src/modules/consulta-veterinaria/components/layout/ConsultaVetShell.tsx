import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ConsultaVetHeader } from './ConsultaVetHeader';
import { ConsultaVetSidebar } from './ConsultaVetSidebar';
import { AuroraBackground } from '../../../../components/ui/aurora-background';

export function ConsultaVetShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuroraBackground className="flex h-screen w-full text-foreground overflow-hidden font-sans p-0 m-0 !h-screen !w-screen !max-w-none">
      <div className="flex h-full w-full absolute inset-0 z-10">
        <ConsultaVetSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background/50 backdrop-blur-sm dark:bg-background/80">
          <ConsultaVetHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto w-full relative">
            <Outlet />
          </main>
        </div>
      </div>
    </AuroraBackground>
  );
}
