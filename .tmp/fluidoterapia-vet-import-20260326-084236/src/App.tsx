import { useState } from 'react';
import { FluidSidebar, Tab } from './components/layout/FluidSidebar';
import { CalculatorPage } from './components/calculator/CalculatorPage';
import { ResuscitationPage } from './components/resuscitation/ResuscitationPage';
import { OsmotherapyPage } from './components/osmotherapy/OsmotherapyPage';
import { GuidePage } from './components/guide/GuidePage';
import { ProtocolsPage } from './components/protocols/ProtocolsPage';
import { DilutionsPage } from './components/dilutions/DilutionsPage';
import { MonitoringPage } from './components/monitoring/MonitoringPage';
import { SettingsPage } from './components/settings/SettingsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100">
      <FluidSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 h-full overflow-hidden">
        {activeTab === 'calculator' && <CalculatorPage />}
        {activeTab === 'resuscitation' && <ResuscitationPage />}
        {activeTab === 'osmotherapy' && <OsmotherapyPage />}
        {activeTab === 'guide' && <GuidePage />}
        {activeTab === 'protocols' && <ProtocolsPage />}
        {activeTab === 'dilutions' && <DilutionsPage />}
        {activeTab === 'monitoring' && <MonitoringPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}
