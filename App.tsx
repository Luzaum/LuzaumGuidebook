import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './utils/theme'
import { AppLayout } from './layouts/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { Hub } from './pages/Hub'
import { ModuleIframe } from './pages/ModuleIframe'
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
import DevelopmentPage from './modules/receituario-vet/DevelopmentPage'
import AAP2Module from './modules/aap2/index'
import SupabaseTestPage from './pages/SupabaseTestPage'
import Login from './src/routes/Login'
import Signup from './src/routes/Signup'
import AuthCallback from './src/routes/AuthCallback'
import ClinicSetup from './src/routes/ClinicSetup'
import ResetPassword from './src/routes/ResetPassword'
import AccountHome from './src/routes/account/AccountHome'
import AccountProfile from './src/routes/account/AccountProfile'
import AccountSettings from './src/routes/account/AccountSettings'
import AccountClinic from './src/routes/account/AccountClinic'
import { ProtectedRoute } from './src/components/ProtectedRoute'
import { ClinicProvider } from './src/components/ClinicProvider'
import { RequireClinic } from './src/components/RequireClinic'
import { AuthSessionProvider } from './src/components/AuthSessionProvider'

function ProtectedClinicRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RequireClinic>{children}</RequireClinic>
    </ProtectedRoute>
  )
}

const appRoutes = (
  <Route element={<AppLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/hub" element={<Hub />} />
    <Route path="/app" element={<ProtectedClinicRoute><AccountHome /></ProtectedClinicRoute>} />
    <Route path="/conta" element={<ProtectedRoute><Navigate to="/app" replace /></ProtectedRoute>} />
    <Route path="/conta/perfil" element={<ProtectedRoute><AccountProfile /></ProtectedRoute>} />
    <Route path="/conta/configuracoes" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
    <Route path="/conta/clinica" element={<ProtectedRoute><AccountClinic /></ProtectedRoute>} />
    <Route path="/calculadora-energetica" element={<CalculadoraEnergeticaPage />} />
    <Route path="/fluidoterapia" element={<FluidoterapiaPage />} />
    <Route path="/transfusao-sanguinea" element={<TransfusaoSanguineaPage />} />
    <Route path="/hemogasometria" element={<HemogasometriaPage />} />
    <Route path="/dor" element={<ModuleIframe />} />
    <Route path="/emergencias" element={<ModuleIframe />} />
    <Route path="/peconhentos" element={<AAP2Module />} />
    <Route path="/antibioticoterapia" element={<ModuleIframe />} />
    <Route path="/receituario-vet" element={<ProtectedClinicRoute><ReceituarioVetPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/nova-receita" element={<ProtectedClinicRoute><NovaReceitaPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/rascunhos" element={<ProtectedClinicRoute><DraftsPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/configuracao" element={<ProtectedClinicRoute><ProfilePage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/clientes" element={<ProtectedClinicRoute><ClientesPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/catalogo" element={<ProtectedClinicRoute><CatalogoPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/protocolos" element={<ProtectedClinicRoute><ProtocolosPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/controle-especial" element={<ProtectedClinicRoute><ControleEspecialPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/templates" element={<ProtectedClinicRoute><TemplatesPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/configuracoes" element={<ProtectedClinicRoute><SettingsPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/desenvolvimento" element={<ProtectedClinicRoute><DevelopmentPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/rx/:id/print" element={<ProtectedClinicRoute><RxPrintPage /></ProtectedClinicRoute>} />
    <Route path="/crivet" element={<CrivetPage />} />
    <Route path="/neurologia" element={<NeurologiaPage />} />
    <Route path="/veteletrolitico" element={<VeteletroliticoPage />} />
    <Route path="/rifa" element={<ModuleIframe />} />
    <Route path="/supabase-test" element={<SupabaseTestPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
)

function AppContent() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthSessionProvider>
          <ClinicProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/clinic/setup" element={<ProtectedRoute><ClinicSetup /></ProtectedRoute>} />
              {appRoutes}
            </Routes>
          </ClinicProvider>
        </AuthSessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export function App() {
  return <AppContent />
}
