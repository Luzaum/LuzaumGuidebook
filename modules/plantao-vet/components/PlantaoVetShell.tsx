import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useClinic } from '@/src/components/ClinicProvider';

import { PlantaoVetSidebar } from './PlantaoVetSidebar';
import { PlantaoVetTopBar } from './PlantaoVetTopBar';

export function PlantaoVetShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { clinicName } = useClinic();

  return (
    <div className="plantao-vet-theme">
      {sidebarOpen ? (
        <button className="plantao-vet-backdrop lg:hidden" onClick={() => setSidebarOpen(false)} />
      ) : null}
      <div className="plantao-vet-shell">
        <PlantaoVetSidebar clinicName={clinicName} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="plantao-vet-main">
          <PlantaoVetTopBar clinicName={clinicName} onMenuClick={() => setSidebarOpen(true)} />
          <main className="plantao-vet-content flex-1 py-6 md:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
