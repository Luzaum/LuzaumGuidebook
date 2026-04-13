import { useState } from 'react'

import { CalculatorPage } from './components/calculator/CalculatorPage'
import { DilutionsPage } from './components/dilutions/DilutionsPage'
import { GuidePage } from './components/guide/GuidePage'
import { FluidMobileNav } from './components/layout/FluidMobileNav'
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
    <div className="fluidoterapia-vet-root flex h-full min-h-0 w-full flex-col overflow-hidden bg-background text-foreground lg:flex-row">
      <div className="hidden h-full min-h-0 shrink-0 lg:block">
        <FluidSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-slate-50 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] dark:bg-slate-950 lg:pb-0">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {activeTab === 'calculator' && <CalculatorPage />}
          {activeTab === 'resuscitation' && <ResuscitationPage />}
          {activeTab === 'osmotherapy' && <OsmotherapyPage onNavigate={setActiveTab} />}
          {activeTab === 'guide' && <GuidePage />}
          {activeTab === 'protocols' && <ProtocolsPage />}
          {activeTab === 'dilutions' && <DilutionsPage />}
          {activeTab === 'monitoring' && <MonitoringPage />}
          {activeTab === 'settings' && <SettingsPage />}
        </div>
      </main>
      <FluidMobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default FluidoterapiaVetModule
