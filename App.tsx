
import React, { useState } from 'react'
import { ThemeProvider } from './utils/theme'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { MiniAppGrid } from './components/MiniAppGrid'
import { HowVetiusHelps } from './components/HowVetiusHelps'
import { Footer } from './components/Footer'

// Import existing apps
import Fluidoterapia from './Fluidoterapia'
import Hemogasometria from './Hemogasometria'
import CalculadoraEnergetica from './CalculadoraEnergetica'
import TransfusaoSanguinea from './TransfusaoSanguinea'
import EscalasDeDorScreen from './EscalasDeDorScreen'
import EmergenciasVet from './EmergenciasVet'

type View = 'home' | 'apps' | 'app'

interface AppData {
  id: string
  title: string
  component: React.ComponentType<{ onBack: () => void }>
}

const apps: Record<string, AppData> = {
  'calculadora-energetica': {
    id: 'calculadora-energetica',
    title: 'Calculadora Energética',
    component: CalculadoraEnergetica
  },
  'fluidoterapia': {
    id: 'fluidoterapia',
    title: 'Fluidoterapia',
    component: Fluidoterapia
  },
  'transfusao-sanguinea': {
    id: 'transfusao-sanguinea',
    title: 'Transfusão Sanguínea',
    component: TransfusaoSanguinea
  },
  'emergencias-veterinarias': {
    id: 'emergencias-veterinarias',
    title: 'Emergências Veterinárias',
    component: EmergenciasVet
  },
  'escalas-dor': {
    id: 'escalas-dor',
    title: 'Escalas de Dor',
    component: EscalasDeDorScreen
  },
  'hemogasometria': {
    id: 'hemogasometria',
    title: 'Hemogasometria',
    component: Hemogasometria
  }
}

export function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [currentApp, setCurrentApp] = useState<string | null>(null)

  const handleAppClick = (appId: string) => {
    if (apps[appId]) {
      setCurrentApp(appId)
      setCurrentView('app')
    }
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setCurrentApp(null)
  }

  const handleBackToApps = () => {
    setCurrentView('apps')
    setCurrentApp(null)
  }

  const handleExploreApps = () => {
    setCurrentView('apps')
  }

  const handleNavbarAppClick = () => {
    setCurrentView('apps')
  }

  // Render specific app
  if (currentView === 'app' && currentApp && apps[currentApp]) {
    const AppComponent = apps[currentApp].component
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar onAppClick={handleNavbarAppClick} />
          <main className="flex-grow pt-20">
            <div className="container mx-auto px-4">
              <div className="mb-6">
                <button
                  onClick={handleBackToApps}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar aos aplicativos
                </button>
                <h1 className="text-3xl font-bold mt-4">{apps[currentApp].title}</h1>
              </div>
              <AppComponent onBack={handleBackToApps} />
            </div>
          </main>
        </div>
      </ThemeProvider>
    )
  }

  // Render apps list
  if (currentView === 'apps') {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar onAppClick={handleNavbarAppClick} />
          <main className="flex-grow pt-20">
            <MiniAppGrid onAppClick={handleAppClick} />
            <HowVetiusHelps />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }

  // Render home
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar onAppClick={handleNavbarAppClick} />
        <main className="flex-grow">
          <Hero onExploreApps={handleExploreApps} />
          <MiniAppGrid onAppClick={handleAppClick} />
          <HowVetiusHelps />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
