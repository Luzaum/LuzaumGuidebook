import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './utils/theme'
import { AppLayout } from './layouts/AppLayout'
import { ProtectedRoute } from './src/components/ProtectedRoute'
import { ClinicProvider } from './src/components/ClinicProvider'
import { RequireClinic } from './src/components/RequireClinic'
import { AuthSessionProvider } from './src/components/AuthSessionProvider'

const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })))
const Hub = lazy(() => import('./pages/Hub').then((m) => ({ default: m.Hub })))
const ModuleIframe = lazy(() => import('./pages/ModuleIframe').then((m) => ({ default: m.ModuleIframe })))
const CalculadoraEnergeticaPage = lazy(() => import('./pages/CalculadoraEnergeticaPage').then((m) => ({ default: m.CalculadoraEnergeticaPage })))
const FluidoterapiaPage = lazy(() => import('./pages/FluidoterapiaPage').then((m) => ({ default: m.FluidoterapiaPage })))
const TransfusaoSanguineaPage = lazy(() => import('./pages/TransfusaoSanguineaPage').then((m) => ({ default: m.TransfusaoSanguineaPage })))
const HemogasometriaPage = lazy(() => import('./pages/HemogasometriaPage').then((m) => ({ default: m.HemogasometriaPage })))
const NeurologiaPage = lazy(() => import('./pages/NeurologiaPage').then((m) => ({ default: m.NeurologiaPage })))
const SupabaseTestPage = lazy(() => import('./pages/SupabaseTestPage').then((m) => ({ default: m.SupabaseTestPage })))
const EscalasDorPage = lazy(() => import('./modules/escalas-dor/App'))

const CrivetPage = lazy(() => import('./modules/crivet/pages/CrivetPage'))
const VeteletroliticoPage = lazy(() => import('./modules/veteletrolitico/App'))
const ReceituarioVetPage = lazy(() => import('./modules/receituario-vet/App'))
const ConsultaVetShell = lazy(() => import('./modules/consulta-vet/components/layout/ConsultaVetShell').then((m) => ({ default: m.ConsultaVetShell })))
const ConsultaVetHomePage = lazy(() => import('./modules/consulta-vet/pages/HomePage').then((m) => ({ default: m.HomePage })))
const ConsultaVetDiseasesPage = lazy(() => import('./modules/consulta-vet/pages/DiseasesPage').then((m) => ({ default: m.DiseasesPage })))
const ConsultaVetDiseaseDetailPage = lazy(() => import('./modules/consulta-vet/pages/DiseaseDetailPage').then((m) => ({ default: m.DiseaseDetailPage })))
const ConsultaVetMedicationsPage = lazy(() => import('./modules/consulta-vet/pages/MedicationsPage').then((m) => ({ default: m.MedicationsPage })))
const ConsultaVetMedicationDetailPage = lazy(() => import('./modules/consulta-vet/pages/MedicationDetailPage').then((m) => ({ default: m.MedicationDetailPage })))
const ConsultaVetConsensosPage = lazy(() => import('./modules/consulta-vet/pages/ConsensosPage').then((m) => ({ default: m.ConsensosPage })))
const ConsultaVetConsensoCreatePage = lazy(() => import('./modules/consulta-vet/pages/ConsensoCreatePage').then((m) => ({ default: m.ConsensoCreatePage })))
const ConsultaVetConsensoDetailPage = lazy(() => import('./modules/consulta-vet/pages/ConsensoDetailPage').then((m) => ({ default: m.ConsensoDetailPage })))
const ConsultaVetFavoritesPage = lazy(() => import('./modules/consulta-vet/pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage })))
const ConsultaVetRecentsPage = lazy(() => import('./modules/consulta-vet/pages/RecentsPage').then((m) => ({ default: m.RecentsPage })))
const ConsultaVetCategoriesPage = lazy(() => import('./modules/consulta-vet/pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })))
const ConsultaVetCategoryDetailPage = lazy(() => import('./modules/consulta-vet/pages/CategoryDetailPage').then((m) => ({ default: m.CategoryDetailPage })))
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

function LoadingScreen() {
  return <div className="p-6 text-center text-slate-500">Carregando...</div>
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
    <Route path="/dor" element={<EscalasDorPage />} />
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
    <Route path="/receituario-vet/configuracao" element={<ProtectedClinicRoute><ProfilePage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/configuração" element={<ProtectedClinicRoute><ProfilePage /></ProtectedClinicRoute>} />
    <Route path="/receituario-vet/clientes" element={<ProtectedClinicRoute><ClientesPage /></ProtectedClinicRoute>} />
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
    <Route path="/consulta-vet" element={<ConsultaVetShell />}>
      <Route index element={<ConsultaVetHomePage />} />
      <Route path="doencas" element={<ConsultaVetDiseasesPage />} />
      <Route path="doencas/:slug" element={<ConsultaVetDiseaseDetailPage />} />
      <Route path="medicamentos" element={<ConsultaVetMedicationsPage />} />
      <Route path="medicamentos/:slug" element={<ConsultaVetMedicationDetailPage />} />
      <Route path="consensos" element={<ConsultaVetConsensosPage />} />
      <Route path="consensos/novo" element={<ConsultaVetConsensoCreatePage />} />
      <Route path="consensos/:slug" element={<ConsultaVetConsensoDetailPage />} />
      <Route path="favoritos" element={<ConsultaVetFavoritesPage />} />
      <Route path="recentes" element={<ConsultaVetRecentsPage />} />
      <Route path="categorias" element={<ConsultaVetCategoriesPage />} />
      <Route path="categorias/:slug" element={<ConsultaVetCategoryDetailPage />} />
    </Route>
    <Route path="/rifa" element={<ModuleIframe />} />
    <Route path="/supabase-test" element={<SupabaseTestPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
)

function AppContent() {
  useEffect(() => {
    const prefetchCriticalRoutes = () => {
      void import('./pages/Hub')
      void import('./src/routes/Login')
      void import('./src/routes/Signup')
      void import('./pages/CalculadoraEnergeticaPage')
    }

    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof win.requestIdleCallback === 'function') {
      const idleId = win.requestIdleCallback(prefetchCriticalRoutes, { timeout: 2200 })
      return () => {
        if (typeof win.cancelIdleCallback === 'function') {
          win.cancelIdleCallback(idleId)
        }
      }
    }

    const timeoutId = window.setTimeout(prefetchCriticalRoutes, 1400)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthSessionProvider>
          <ClinicProvider>
            <Suspense fallback={<LoadingScreen />}>
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
