import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './utils/theme'
import { AuthProvider } from './components/AuthProvider'
import { AUTH_ENABLED } from './config/features'
import { AppLayout } from './layouts/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { Hub } from './pages/Hub'
import { ModuleIframe } from './pages/ModuleIframe'
import { ModulePlanned } from './pages/ModulePlanned'
import { CalculadoraEnergeticaPage } from './pages/CalculadoraEnergeticaPage'
import { FluidoterapiaPage } from './pages/FluidoterapiaPage'
import { TransfusaoSanguineaPage } from './pages/TransfusaoSanguineaPage'
import { HemogasometriaPage } from './pages/HemogasometriaPage'
import { NeurologiaPage } from './pages/NeurologiaPage'
import CrivetPage from './modules/crivet/pages/CrivetPage'
import VeteletroliticoPage from './modules/veteletrolitico/App'
import ReceituarioVetPage from './modules/receituario-vet/App'
import NovaReceitaPage from './modules/receituario-vet/NovaReceitaPage'
import DraftsPage from './modules/receituario-vet/DraftsPage'
import RxPrintPage from './modules/receituario-vet/RxPrintPage'
import ProfilePage from './modules/receituario-vet/ProfilePage'
import ClientesPage from './modules/receituario-vet/ClientesPage'
import CatalogoPage from './modules/receituario-vet/CatalogoPage'
import ProtocolosPage from './modules/receituario-vet/ProtocolosPage'
import TemplatesPage from './modules/receituario-vet/TemplatesPage'
import SettingsPage from './modules/receituario-vet/SettingsPage'
import ControleEspecialPage from './modules/receituario-vet/ControleEspecialPage'
import LoginOrSignup from './components/LoginOrSignup'
import AAP2Module from './modules/aap2/index'

const appRoutes = (
  <Route element={<AppLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/hub" element={<Hub />} />
    <Route path="/calculadora-energetica" element={<CalculadoraEnergeticaPage />} />
    <Route path="/fluidoterapia" element={<FluidoterapiaPage />} />
    <Route path="/transfusao-sanguinea" element={<TransfusaoSanguineaPage />} />
    <Route path="/hemogasometria" element={<HemogasometriaPage />} />
    <Route path="/dor" element={<ModuleIframe />} />
    <Route path="/emergencias" element={<ModuleIframe />} />
    <Route path="/peconhentos" element={<AAP2Module />} />
    <Route path="/antibioticoterapia" element={<ModuleIframe />} />
    <Route path="/receituario-vet" element={<ReceituarioVetPage />} />
    <Route path="/receituario-vet/nova-receita" element={<NovaReceitaPage />} />
    <Route path="/receituario-vet/rascunhos" element={<DraftsPage />} />
    <Route path="/receituario-vet/configuracao" element={<ProfilePage />} />
    <Route path="/receituario-vet/clientes" element={<ClientesPage />} />
    <Route path="/receituario-vet/catalogo" element={<CatalogoPage />} />
    <Route path="/receituario-vet/protocolos" element={<ProtocolosPage />} />
    <Route path="/receituario-vet/controle-especial" element={<ControleEspecialPage />} />
    <Route path="/receituario-vet/templates" element={<TemplatesPage />} />
    <Route path="/receituario-vet/configuracoes" element={<SettingsPage />} />
    <Route path="/receituario-vet/rx/:id/print" element={<RxPrintPage />} />
    <Route path="/crivet" element={<CrivetPage />} />
    <Route path="/neurologia" element={<NeurologiaPage />} />
    <Route path="/veteletrolitico" element={<VeteletroliticoPage />} />
    <Route path="/rifa" element={<ModuleIframe />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
)

function AppContent() {
  // Se AUTH_ENABLED é false, vai direto para o app
  if (!AUTH_ENABLED) {
    return (
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            {appRoutes}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    )
  }

  // Se AUTH_ENABLED é true, mostra tela de login
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginOrSignup />} />
            {appRoutes}
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export function App() {
  return <AppContent />
}
