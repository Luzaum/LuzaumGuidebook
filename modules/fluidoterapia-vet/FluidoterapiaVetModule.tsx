import { useState } from 'react'

import { CalculatorPage } from './components/calculator/CalculatorPage'
import { DilutionsPage } from './components/dilutions/DilutionsPage'
import { GuidePage } from './components/guide/GuidePage'
import { FluidSidebar, Tab } from './components/layout/FluidSidebar'
import { MonitoringPage } from './components/monitoring/MonitoringPage'
import { OsmotherapyPage } from './components/osmotherapy/OsmotherapyPage'
import { ProtocolsPage } from './components/protocols/ProtocolsPage'
import { ResuscitationPage } from './components/resuscitation/ResuscitationPage'
import { SettingsPage } from './components/settings/SettingsPage'
import './fluidoterapia-vet.css'

export function FluidoterapiaVetModule() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator')

  return (
    <div className="fluidoterapia-vet-root flex h-full min-h-0 w-full overflow-hidden bg-background text-foreground">
      <FluidSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 min-h-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {activeTab === 'calculator' && <CalculatorPage />}
        {activeTab === 'resuscitation' && <ResuscitationPage />}
        {activeTab === 'osmotherapy' && <OsmotherapyPage onNavigate={setActiveTab} />}
        {activeTab === 'guide' && <GuidePage />}
        {activeTab === 'protocols' && <ProtocolsPage />}
        {activeTab === 'dilutions' && <DilutionsPage />}
        {activeTab === 'monitoring' && <MonitoringPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}

export default FluidoterapiaVetModule
