import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './utils/theme'
import { ProtectedRoute } from './src/components/ProtectedRoute'
import { ClinicProvider } from './src/components/ClinicProvider'
import { RequireClinic } from './src/components/RequireClinic'
import { AuthSessionProvider } from './src/components/AuthSessionProvider'

const AppLayout = lazy(() =>
  import('./layouts/AppLayout').then((mod) => ({ default: mod.AppLayout }))
)
const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((mod) => ({ default: mod.LandingPage }))
)
const Hub = lazy(() => import('./pages/Hub').then((mod) => ({ default: mod.Hub })))
const ModuleIframe = lazy(() =>
  import('./pages/ModuleIframe').then((mod) => ({ default: mod.ModuleIframe }))
)
const CalculadoraEnergeticaPage = lazy(() =>
  import('./pages/CalculadoraEnergeticaPage').then((mod) => ({ default: mod.CalculadoraEnergeticaPage }))
)
const FluidoterapiaPage = lazy(() =>
  import('./pages/FluidoterapiaPage').then((mod) => ({ default: mod.FluidoterapiaPage }))
)
const TransfusaoSanguineaPage = lazy(() =>
  import('./pages/TransfusaoSanguineaPage').then((mod) => ({ default: mod.TransfusaoSanguineaPage }))
)
const HemogasometriaPage = lazy(() =>
  import('./pages/HemogasometriaPage').then((mod) => ({ default: mod.HemogasometriaPage }))
)
const NeurologiaPage = lazy(() =>
  import('./pages/NeurologiaPage').then((mod) => ({ default: mod.NeurologiaPage }))
)
const CrivetPage = lazy(() => import('./modules/crivet/pages/CrivetPage'))
const VeteletroliticoPage = lazy(() => import('./modules/veteletrolitico/App'))
const ReceituarioVetPage = lazy(() => import('./modules/receituario-vet/App'))
const NovaReceitaPage = lazy(() => import('./modules/receituario-vet/NovaReceitaPage'))
const NovaReceita2Page = lazy(() => import('./modules/receituario-vet/NovaReceita2Page'))
const NovaReceita2PrintPage = lazy(() => import('./modules/receituario-vet/NovaReceita2PrintPage'))
const DraftsPage = lazy(() => import('./modules/receituario-vet/DraftsPage'))
const RxPrintPage = lazy(() => import('./modules/receituario-vet/RxPrintPage'))
const HistoricoReceitasPage = lazy(() => import('./modules/receituario-vet/HistoricoReceitasPage'))
const ProfilePage = lazy(() => import('./modules/receituario-vet/ProfilePage'))
const ClientesPage = lazy(() => import('./modules/receituario-vet/ClientesPage'))
const Catalogo3Page = lazy(() => import('./modules/receituario-vet/Catalogo3Page'))
const ProtocolosPage = lazy(() => import('./modules/receituario-vet/ProtocolosPage'))
const Protocolos3Page = lazy(() => import('./modules/receituario-vet/Protocolos3Page'))
const TemplatesPage = lazy(() => import('./modules/receituario-vet/TemplatesPage'))
const SettingsPage = lazy(() => import('./modules/receituario-vet/SettingsPage'))
const ControleEspecialPage = lazy(() => import('./modules/receituario-vet/ControleEspecialPage'))
const DevelopmentPage = lazy(() => import('./modules/receituario-vet/DevelopmentPage'))
const AAP2Module = lazy(() => import('./modules/aap2/index'))
const SupabaseTestPage = lazy(() =>
  import('./pages/SupabaseTestPage').then((mod) => ({ default: mod.SupabaseTestPage }))
)
const Login = lazy(() => import('./src/routes/Login'))
const Signup = lazy(() => import('./src/routes/Signup'))
const AuthCallback = lazy(() => import('./src/routes/AuthCallback'))
const ClinicSetup = lazy(() => import('./src/routes/ClinicSetup'))
const ResetPassword = lazy(() => import('./src/routes/ResetPassword'))
const AccountHome = lazy(() => import('./src/routes/account/AccountHome'))
const AccountProfile = lazy(() => import('./src/routes/account/AccountProfile'))
const AccountSettings = lazy(() => import('./src/routes/account/AccountSettings'))
const AccountClinic = lazy(() => import('./src/routes/account/AccountClinic'))

function ProtectedClinicRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RequireClinic>{children}</RequireClinic>
    </ProtectedRoute>
  )
}

function RouteFallback() {
  return <div className="p-6">Carregando...</div>
}

const appRoutes = (
  <Route element={<AppLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/hub" element={<Hub />} />
    <Route path="/app" element={<ProtectedClinicRoute><AccountHome /></ProtectedClinicRoute>} />
    <Route path="/conta" element={<ProtectedRoute><Navigate to="/app" replace /></ProtectedRoute>} />
    <Route path="/conta/perfil" element={<ProtectedRoute><AccountProfile /></ProtectedRoute>} />
    <Route path="/conta/configuracoes" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
    <Route path="/conta/configurações" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
    <Route path="/conta/clinica" element={<ProtectedRoute><AccountClinic /></ProtectedRoute>} />
    <Route path="/conta/clínica" element={<ProtectedRoute><AccountClinic /></ProtectedRoute>} />

    <Route path="/calculadora-energetica" element={<CalculadoraEnergeticaPage />} />
    <Route path="/fluidoterapia" element={<FluidoterapiaPage />} />
    <Route path="/transfusao-sanguinea" element={<TransfusaoSanguineaPage />} />
    <Route path="/transfusão-sanguinea" element={<TransfusaoSanguineaPage />} />
    <Route path="/hemogasometria" element={<HemogasometriaPage />} />
    <Route path="/dor" element={<ModuleIframe />} />
    <Route path="/emergencias" element={<ModuleIframe />} />
    <Route path="/emergências" element={<ModuleIframe />} />
    <Route path="/peconhentos" element={<AAP2Module />} />
    <Route path="/antibioticoterapia" element={<ModuleIframe />} />

    <Route path="/receituario-vet" element={<ProtectedClinicRoute><ReceituarioVetPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/nova-receita" element={<ProtectedClinicRoute><NovaReceitaPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/nova-receita-2" element={<ProtectedClinicRoute><NovaReceita2Page /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/nova-receita-2-print" element={<ProtectedClinicRoute><NovaReceita2PrintPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/rascunhos" element={<ProtectedClinicRoute><DraftsPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/historico" element={<ProtectedClinicRoute><HistoricoReceitasPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/config" element={<ProtectedClinicRoute><Navigate to="/receituario-vet/configuracao" replace /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/configuracao" element={<ProtectedClinicRoute><ProfilePage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/configuração" element={<ProtectedClinicRoute><ProfilePage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/clientes" element={<ProtectedClinicRoute><ClientesPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/catalogo" element={<ProtectedClinicRoute><Catalogo3Page /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/catalogo-3" element={<ProtectedClinicRoute><Catalogo3Page /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/catalogo2" element={<ProtectedClinicRoute><Catalogo3Page /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/catalogo3" element={<ProtectedClinicRoute><Catalogo3Page /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/protocolos" element={<ProtectedClinicRoute><ProtocolosPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/protocolos-3" element={<ProtectedClinicRoute><Protocolos3Page /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/controle-especial" element={<ProtectedClinicRoute><ControleEspecialPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/templates" element={<ProtectedClinicRoute><TemplatesPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/configuracoes" element={<ProtectedClinicRoute><SettingsPage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/configurações" element={<ProtectedClinicRoute><SettingsPage /></ProtectedClinicRoute>} />
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
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/clinic/setup" element={<ProtectedRoute><ClinicSetup /></ProtectedRoute>} />
                {appRoutes}
              </Routes>
            </Suspense>
          </ClinicProvider>
        </AuthSessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export function App() {
  return <AppContent />
}
