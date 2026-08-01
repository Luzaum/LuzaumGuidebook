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
const EnergiaVetPage = lazy(() => import('./modules/energia-vet/App'))
const FluidoterapiaVetPage = lazy(() => import('./modules/fluidoterapia-vet'))
const AntibioticoterapiaVetPage = lazy(() => import('./modules/antibioticoterapia-vet'))
const TransfusaoSanguineaPage = lazy(() => import('./pages/TransfusaoSanguineaPage').then((m) => ({ default: m.TransfusaoSanguineaPage })))
const HemogasoVetPage = lazy(() => import('./modules/hemogasovet'))
const NeurologiaPage = lazy(() => import('./pages/NeurologiaPage').then((m) => ({ default: m.NeurologiaPage })))
const EscalasDorPage = lazy(() => import('./modules/escalas-dor/App'))
const EscalasDorMobilePage = lazy(() => import('./modules/escalas-dor-mobile/App'))
const NeurologiaMobilePage = lazy(() => import('./pages/NeurologiaMobilePage').then((m) => ({ default: m.NeurologiaMobilePage })))

const CrivetPage = lazy(() => import('./pages/Crivet').then((m) => ({ default: m.Crivet })))
const ConsultaVetShell = lazy(() => import('./modules/consulta-vet/components/layout/ConsultaVetShell').then((m) => ({ default: m.ConsultaVetShell })))
const ConsultaVetHomePage = lazy(() => import('./modules/consulta-vet/pages/HomePage').then((m) => ({ default: m.HomePage })))
const ConsultaVetDiseasesPage = lazy(() => import('./modules/consulta-vet/pages/DiseasesPage').then((m) => ({ default: m.DiseasesPage })))
const ConsultaVetDiseaseDetailPage = lazy(() => import('./modules/consulta-vet/pages/DiseaseDetailPage').then((m) => ({ default: m.DiseaseDetailPage })))
const ConsultaVetMedicationsPage = lazy(() => import('./modules/consulta-vet/pages/MedicationsPage').then((m) => ({ default: m.MedicationsPage })))
const ConsultaVetMedicationDetailPage = lazy(() => import('./modules/consulta-vet/pages/MedicationDetailPage').then((m) => ({ default: m.MedicationDetailPage })))
const ConsultaVetCommercialPresentationsPage = lazy(() => import('./modules/consulta-vet/pages/CommercialPresentationsPage').then((m) => ({ default: m.CommercialPresentationsPage })))
const ConsultaVetConsensosPage = lazy(() => import('./modules/consulta-vet/pages/ConsensosPage').then((m) => ({ default: m.ConsensosPage })))
const ConsultaVetConsensoCreatePage = lazy(() => import('./modules/consulta-vet/pages/ConsensoCreatePage').then((m) => ({ default: m.ConsensoCreatePage })))
const ConsultaVetConsensoDetailPage = lazy(() => import('./modules/consulta-vet/pages/ConsensoDetailPage').then((m) => ({ default: m.ConsensoDetailPage })))
const ConsultaVetFavoritesPage = lazy(() => import('./modules/consulta-vet/pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage })))
const ConsultaVetRecentsPage = lazy(() => import('./modules/consulta-vet/pages/RecentsPage').then((m) => ({ default: m.RecentsPage })))
const ConsultaVetCategoriesPage = lazy(() => import('./modules/consulta-vet/pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })))
const ConsultaVetCategoryDetailPage = lazy(() => import('./modules/consulta-vet/pages/CategoryDetailPage').then((m) => ({ default: m.CategoryDetailPage })))
const ConsultaVetEditorialDashboardPage = lazy(() => import('./modules/consulta-vet/pages/EditorialDashboardPage').then((m) => ({ default: m.EditorialDashboardPage })))
const ConsultaVetEditorialCategoriesPage = lazy(() => import('./modules/consulta-vet/pages/EditorialCategoriesPage').then((m) => ({ default: m.EditorialCategoriesPage })))
const ConsultaVetEditorialDiseasesPage = lazy(() => import('./modules/consulta-vet/pages/EditorialDiseasesPage').then((m) => ({ default: m.EditorialDiseasesPage })))
const ConsultaVetEditorialMedicationsPage = lazy(() => import('./modules/consulta-vet/pages/EditorialMedicationsPage').then((m) => ({ default: m.EditorialMedicationsPage })))
const ConsultaVetEditorialConsensosPage = lazy(() => import('./modules/consulta-vet/pages/EditorialConsensosPage').then((m) => ({ default: m.EditorialConsensosPage })))
const ConsultaVetEditorialImportPage = lazy(() => import('./modules/consulta-vet/pages/EditorialImportPage').then((m) => ({ default: m.EditorialImportPage })))
const ConsultaVetManejoEmergencialPage = lazy(() =>
  import('./modules/consulta-vet/pages/ManejoEmergencialPage').then((m) => ({ default: m.ManejoEmergencialPage }))
)
const ConsultaVetManejoEmergencialGuidePage = lazy(() =>
  import('./modules/consulta-vet/pages/ManejoEmergencialGuidePage').then((m) => ({ default: m.ManejoEmergencialGuidePage }))
)
const ConsultaVetClinicalQuickGuidesPage = lazy(() =>
  import('./modules/consulta-vet/pages/ClinicalQuickGuidesPage').then((m) => ({ default: m.ClinicalQuickGuidesPage }))
)
const ConsultaVetClinicalQuickGuideDetailPage = lazy(() =>
  import('./modules/consulta-vet/pages/ClinicalQuickGuideDetailPage').then((m) => ({ default: m.ClinicalQuickGuideDetailPage }))
)
const ConsultaVetReceituarioPage = lazy(() =>
  import('./modules/consulta-vet/pages/ReceituarioPage').then((m) => ({ default: m.ReceituarioPage }))
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
    <Route path="/calculadora-energetica/*" element={<EnergiaVetPage />} />
    <Route path="/fluidoterapia" element={<Navigate to="/fluidoterapia-vet" replace />} />
    <Route path="/fluidoterapia-vet" element={<FluidoterapiaVetPage />} />
    <Route path="/transfusao-sanguinea" element={<TransfusaoSanguineaPage />} />
    <Route path="/transfusão-sanguinea" element={<TransfusaoSanguineaPage />} />
    <Route path="/hemogasovet/*" element={<HemogasoVetPage />} />
    <Route path="/dor" element={<EscalasDorPage />} />
    <Route path="/dor-mobile" element={<EscalasDorMobilePage />} />
    <Route path="/neuro-mobile/*" element={<NeurologiaMobilePage />} />
    <Route path="/antibioticoterapia" element={<AntibioticoterapiaVetPage />} />
    <Route path="/crivet" element={<CrivetPage />} />
    <Route path="/neurologia/*" element={<NeurologiaPage />} />
    <Route path="/consulta-vet" element={<ConsultaVetShell />}>
      <Route index element={<ConsultaVetHomePage />} />
      <Route path="receituario" element={<ConsultaVetReceituarioPage />} />
      <Route path="doencas" element={<ConsultaVetDiseasesPage />} />
      <Route path="doencas/:slug" element={<ConsultaVetDiseaseDetailPage />} />
      <Route path="medicamentos" element={<ConsultaVetMedicationsPage />} />
      <Route path="medicamentos/:slug" element={<ConsultaVetMedicationDetailPage />} />
      <Route path="apresentacoes-comerciais" element={<ConsultaVetCommercialPresentationsPage />} />
      <Route path="consensos" element={<ConsultaVetConsensosPage />} />
      <Route path="consensos/novo" element={<ConsultaVetConsensoCreatePage />} />
      <Route path="consensos/:slug" element={<ConsultaVetConsensoDetailPage />} />
      <Route path="favoritos" element={<ConsultaVetFavoritesPage />} />
      <Route path="recentes" element={<ConsultaVetRecentsPage />} />
      <Route path="categorias" element={<ConsultaVetCategoriesPage />} />
      <Route path="categorias/:slug" element={<ConsultaVetCategoryDetailPage />} />
      <Route path="editorial" element={<ConsultaVetEditorialDashboardPage />} />
      <Route path="editorial/categorias" element={<ConsultaVetEditorialCategoriesPage />} />
      <Route path="editorial/doencas" element={<ConsultaVetEditorialDiseasesPage />} />
      <Route path="editorial/medicamentos" element={<ConsultaVetEditorialMedicationsPage />} />
      <Route path="editorial/consensos" element={<ConsultaVetEditorialConsensosPage />} />
      <Route path="editorial/importacao" element={<ConsultaVetEditorialImportPage />} />
      <Route path="manejo-emergencial" element={<ConsultaVetManejoEmergencialPage />} />
      <Route path="manejo-emergencial/:slug" element={<ConsultaVetManejoEmergencialGuidePage />} />
      <Route path="guias-rapidos" element={<ConsultaVetClinicalQuickGuidesPage />} />
      <Route path="guias-rapidos/:slug" element={<ConsultaVetClinicalQuickGuideDetailPage />} />
    </Route>
    <Route path="/rifa" element={<ModuleIframe />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
)

function AppContent() {
  useEffect(() => {
    const prefetchAuthRoutes = () => {
      const imports = [
        import('./src/routes/Login'),
        import('./src/routes/Signup'),
      ]
      void Promise.allSettled(imports)
    }

    const prefetchHubRoute = () => {
      void import('./pages/Hub')
    }

    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    let authTimeoutId: number | undefined
    let hubTimeoutId: number | undefined
    let idleId: number | undefined

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(() => {
        prefetchAuthRoutes()
        hubTimeoutId = window.setTimeout(prefetchHubRoute, 4000)
      }, { timeout: 2500 })
    } else {
      authTimeoutId = window.setTimeout(prefetchAuthRoutes, 1500)
      hubTimeoutId = window.setTimeout(prefetchHubRoute, 5500)
    }

    return () => {
      if (idleId !== undefined && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId)
      }
      if (authTimeoutId !== undefined) window.clearTimeout(authTimeoutId)
      if (hubTimeoutId !== undefined) window.clearTimeout(hubTimeoutId)
    }
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

