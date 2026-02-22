import React, { useState } from 'react'
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
import { ProtectedRoute } from './src/components/ProtectedRoute'
import { ClinicProvider, useClinic } from './src/components/ClinicProvider'
import { RequireClinic } from './src/components/RequireClinic'
import { AuthSessionProvider } from './src/components/AuthSessionProvider'
import { supabase } from './src/lib/supabaseClient'

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

function AppArea() {
  const { clinicName, clinicId, role } = useClinic()
  const showRlsDebug = import.meta.env.DEV
  const [testingRls, setTestingRls] = useState(false)
  const [rlsError, setRlsError] = useState('')
  const [rlsSummary, setRlsSummary] = useState<{
    clinicsCount: number
    membershipsCount: number
  } | null>(null)

  const testRls = async () => {
    setTestingRls(true)
    setRlsError('')
    setRlsSummary(null)

    try {
      const clinics = await supabase.from('clinics').select('*')
      const memberships = await supabase.from('memberships').select('*')
      console.log('clinics', clinics)
      console.log('memberships', memberships)

      if (clinics.error) {
        throw clinics.error
      }
      if (memberships.error) {
        throw memberships.error
      }

      setRlsSummary({
        clinicsCount: clinics.data?.length || 0,
        membershipsCount: memberships.data?.length || 0,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao executar teste RLS.'
      setRlsError(message)
    } finally {
      setTestingRls(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Area logada do VETIUS</h1>
      <p className="mt-2 text-sm text-slate-600">
        Clinica ativa: <strong>{clinicName || '-'}</strong>
      </p>
      <p className="text-xs text-slate-500">clinic_id: {clinicId || '-'}</p>
      <p className="text-xs text-slate-500">perfil: {role || '-'}</p>
      {showRlsDebug ? (
        <>
          <div className="mt-4">
            <button
              type="button"
              className="rounded bg-slate-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60"
              onClick={testRls}
              disabled={testingRls}
            >
              {testingRls ? 'Testando RLS...' : 'Testar RLS (clinics/memberships)'}
            </button>
          </div>
          {rlsSummary ? (
            <div className="mt-3 text-sm text-slate-700">
              clinics: <strong>{rlsSummary.clinicsCount}</strong> | memberships: <strong>{rlsSummary.membershipsCount}</strong>
            </div>
          ) : null}
          {rlsError ? <div className="mt-2 text-sm text-red-600">{rlsError}</div> : null}
        </>
      ) : null}
    </div>
  )
}

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
              <Route
                path="/app"
                element={
                  <ProtectedClinicRoute>
                    <AppArea />
                  </ProtectedClinicRoute>
                }
              />
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
