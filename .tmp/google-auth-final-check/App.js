// App.tsx
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./utils/theme";
import { AppLayout } from "./layouts/AppLayout";
import { ProtectedRoute } from "./src/components/ProtectedRoute";
import { ClinicProvider } from "./src/components/ClinicProvider";
import { RequireClinic } from "./src/components/RequireClinic";
import { AuthSessionProvider } from "./src/components/AuthSessionProvider";
import { jsx, jsxs } from "react/jsx-runtime";
var LandingPage = lazy(() => import("./pages/LandingPage").then((m) => ({ default: m.LandingPage })));
var Hub = lazy(() => import("./pages/Hub").then((m) => ({ default: m.Hub })));
var ModuleIframe = lazy(() => import("./pages/ModuleIframe").then((m) => ({ default: m.ModuleIframe })));
var EnergiaVetPage = lazy(() => import("./modules/energia-vet/App"));
var FluidoterapiaVetPage = lazy(() => import("./modules/fluidoterapia-vet"));
var AntibioticoterapiaVetPage = lazy(() => import("./modules/antibioticoterapia-vet"));
var TransfusaoSanguineaPage = lazy(() => import("./pages/TransfusaoSanguineaPage").then((m) => ({ default: m.TransfusaoSanguineaPage })));
var HemogasoVetPage = lazy(() => import("./modules/hemogasovet"));
var NeurologiaPage = lazy(() => import("./pages/NeurologiaPage").then((m) => ({ default: m.NeurologiaPage })));
var EscalasDorPage = lazy(() => import("./modules/escalas-dor/App"));
var CrivetPage = lazy(() => import("./pages/Crivet").then((m) => ({ default: m.Crivet })));
var ConsultaVetShell = lazy(() => import("./modules/consulta-vet/components/layout/ConsultaVetShell").then((m) => ({ default: m.ConsultaVetShell })));
var ConsultaVetHomePage = lazy(() => import("./modules/consulta-vet/pages/HomePage").then((m) => ({ default: m.HomePage })));
var ConsultaVetDiseasesPage = lazy(() => import("./modules/consulta-vet/pages/DiseasesPage").then((m) => ({ default: m.DiseasesPage })));
var ConsultaVetDiseaseDetailPage = lazy(() => import("./modules/consulta-vet/pages/DiseaseDetailPage").then((m) => ({ default: m.DiseaseDetailPage })));
var ConsultaVetMedicationsPage = lazy(() => import("./modules/consulta-vet/pages/MedicationsPage").then((m) => ({ default: m.MedicationsPage })));
var ConsultaVetMedicationDetailPage = lazy(() => import("./modules/consulta-vet/pages/MedicationDetailPage").then((m) => ({ default: m.MedicationDetailPage })));
var ConsultaVetCommercialPresentationsPage = lazy(() => import("./modules/consulta-vet/pages/CommercialPresentationsPage").then((m) => ({ default: m.CommercialPresentationsPage })));
var ConsultaVetConsensosPage = lazy(() => import("./modules/consulta-vet/pages/ConsensosPage").then((m) => ({ default: m.ConsensosPage })));
var ConsultaVetConsensoCreatePage = lazy(() => import("./modules/consulta-vet/pages/ConsensoCreatePage").then((m) => ({ default: m.ConsensoCreatePage })));
var ConsultaVetConsensoDetailPage = lazy(() => import("./modules/consulta-vet/pages/ConsensoDetailPage").then((m) => ({ default: m.ConsensoDetailPage })));
var ConsultaVetFavoritesPage = lazy(() => import("./modules/consulta-vet/pages/FavoritesPage").then((m) => ({ default: m.FavoritesPage })));
var ConsultaVetRecentsPage = lazy(() => import("./modules/consulta-vet/pages/RecentsPage").then((m) => ({ default: m.RecentsPage })));
var ConsultaVetCategoriesPage = lazy(() => import("./modules/consulta-vet/pages/CategoriesPage").then((m) => ({ default: m.CategoriesPage })));
var ConsultaVetCategoryDetailPage = lazy(() => import("./modules/consulta-vet/pages/CategoryDetailPage").then((m) => ({ default: m.CategoryDetailPage })));
var ConsultaVetEditorialDashboardPage = lazy(() => import("./modules/consulta-vet/pages/EditorialDashboardPage").then((m) => ({ default: m.EditorialDashboardPage })));
var ConsultaVetEditorialCategoriesPage = lazy(() => import("./modules/consulta-vet/pages/EditorialCategoriesPage").then((m) => ({ default: m.EditorialCategoriesPage })));
var ConsultaVetEditorialDiseasesPage = lazy(() => import("./modules/consulta-vet/pages/EditorialDiseasesPage").then((m) => ({ default: m.EditorialDiseasesPage })));
var ConsultaVetEditorialMedicationsPage = lazy(() => import("./modules/consulta-vet/pages/EditorialMedicationsPage").then((m) => ({ default: m.EditorialMedicationsPage })));
var ConsultaVetEditorialConsensosPage = lazy(() => import("./modules/consulta-vet/pages/EditorialConsensosPage").then((m) => ({ default: m.EditorialConsensosPage })));
var ConsultaVetEditorialImportPage = lazy(() => import("./modules/consulta-vet/pages/EditorialImportPage").then((m) => ({ default: m.EditorialImportPage })));
var ConsultaVetManejoEmergencialPage = lazy(
  () => import("./modules/consulta-vet/pages/ManejoEmergencialPage").then((m) => ({ default: m.ManejoEmergencialPage }))
);
var ConsultaVetManejoEmergencialGuidePage = lazy(
  () => import("./modules/consulta-vet/pages/ManejoEmergencialGuidePage").then((m) => ({ default: m.ManejoEmergencialGuidePage }))
);
var ConsultaVetClinicalQuickGuidesPage = lazy(
  () => import("./modules/consulta-vet/pages/ClinicalQuickGuidesPage").then((m) => ({ default: m.ClinicalQuickGuidesPage }))
);
var ConsultaVetClinicalQuickGuideDetailPage = lazy(
  () => import("./modules/consulta-vet/pages/ClinicalQuickGuideDetailPage").then((m) => ({ default: m.ClinicalQuickGuideDetailPage }))
);
var ConsultaVetReceituarioPage = lazy(
  () => import("./modules/consulta-vet/pages/ReceituarioPage").then((m) => ({ default: m.ReceituarioPage }))
);
var Login = lazy(() => import("./src/routes/Login"));
var Signup = lazy(() => import("./src/routes/Signup"));
var AuthCallback = lazy(() => import("./src/routes/AuthCallback"));
var ClinicSetup = lazy(() => import("./src/routes/ClinicSetup"));
var ResetPassword = lazy(() => import("./src/routes/ResetPassword"));
var AccountHome = lazy(() => import("./src/routes/account/AccountHome"));
var AccountProfile = lazy(() => import("./src/routes/account/AccountProfile"));
var AccountSettings = lazy(() => import("./src/routes/account/AccountSettings"));
var AccountClinic = lazy(() => import("./src/routes/account/AccountClinic"));
function ProtectedClinicRoute({ children }) {
  return /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(RequireClinic, { children }) });
}
function LoadingScreen() {
  return /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-slate-500", children: "Carregando..." });
}
function LegacyNeuroMobileRedirect() {
  const { pathname, search, hash } = useLocation();
  const suffix = pathname.replace(/^\/neuro-mobile\/?/, "");
  const target = suffix ? `/neurologia/${suffix}` : "/neurologia";
  return /* @__PURE__ */ jsx(Navigate, { to: `${target}${search}${hash}`, replace: true });
}
var appRoutes = /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(AppLayout, {}), children: [
  /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(LandingPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/hub", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Hub, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/app", element: /* @__PURE__ */ jsx(ProtectedClinicRoute, { children: /* @__PURE__ */ jsx(AccountHome, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/conta", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Navigate, { to: "/app", replace: true }) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/conta/perfil", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(AccountProfile, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/conta/configuracoes", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(AccountSettings, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/conta/configura\xE7\xF5es", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(AccountSettings, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/conta/clinica", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(AccountClinic, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/calculadora-energetica/*", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(EnergiaVetPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/nutricaovet/*", element: /* @__PURE__ */ jsx(Navigate, { to: "/calculadora-energetica", replace: true }) }),
  /* @__PURE__ */ jsx(Route, { path: "/nutricao-vet/*", element: /* @__PURE__ */ jsx(Navigate, { to: "/calculadora-energetica", replace: true }) }),
  /* @__PURE__ */ jsx(Route, { path: "/nutricao/*", element: /* @__PURE__ */ jsx(Navigate, { to: "/calculadora-energetica", replace: true }) }),
  /* @__PURE__ */ jsx(Route, { path: "/energia-vet/*", element: /* @__PURE__ */ jsx(Navigate, { to: "/calculadora-energetica", replace: true }) }),
  /* @__PURE__ */ jsx(Route, { path: "/fluidoterapia", element: /* @__PURE__ */ jsx(Navigate, { to: "/fluidoterapia-vet", replace: true }) }),
  /* @__PURE__ */ jsx(Route, { path: "/fluidoterapia-vet", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(FluidoterapiaVetPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/transfusao-sanguinea", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(TransfusaoSanguineaPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/transfus\xE3o-sanguinea", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(TransfusaoSanguineaPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/hemogasovet/*", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(HemogasoVetPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/dor/*", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(EscalasDorPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/dor-mobile", element: /* @__PURE__ */ jsx(Navigate, { to: "/dor", replace: true }) }),
  /* @__PURE__ */ jsx(Route, { path: "/neuro-mobile/*", element: /* @__PURE__ */ jsx(LegacyNeuroMobileRedirect, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/antibioticoterapia", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(AntibioticoterapiaVetPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/crivet", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(CrivetPage, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "/neurologia/*", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(NeurologiaPage, {}) }) }),
  /* @__PURE__ */ jsxs(Route, { path: "/consulta-vet", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(ConsultaVetShell, {}) }), children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(ConsultaVetHomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "receituario", element: /* @__PURE__ */ jsx(ConsultaVetReceituarioPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "doencas", element: /* @__PURE__ */ jsx(ConsultaVetDiseasesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "doencas/:slug", element: /* @__PURE__ */ jsx(ConsultaVetDiseaseDetailPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "medicamentos", element: /* @__PURE__ */ jsx(ConsultaVetMedicationsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "medicamentos/:slug", element: /* @__PURE__ */ jsx(ConsultaVetMedicationDetailPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "apresentacoes-comerciais", element: /* @__PURE__ */ jsx(ConsultaVetCommercialPresentationsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "consensos", element: /* @__PURE__ */ jsx(ConsultaVetConsensosPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "consensos/novo", element: /* @__PURE__ */ jsx(ConsultaVetConsensoCreatePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "consensos/:slug", element: /* @__PURE__ */ jsx(ConsultaVetConsensoDetailPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "favoritos", element: /* @__PURE__ */ jsx(ConsultaVetFavoritesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "recentes", element: /* @__PURE__ */ jsx(ConsultaVetRecentsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "categorias", element: /* @__PURE__ */ jsx(ConsultaVetCategoriesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "categorias/:slug", element: /* @__PURE__ */ jsx(ConsultaVetCategoryDetailPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "editorial", element: /* @__PURE__ */ jsx(ConsultaVetEditorialDashboardPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "editorial/categorias", element: /* @__PURE__ */ jsx(ConsultaVetEditorialCategoriesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "editorial/doencas", element: /* @__PURE__ */ jsx(ConsultaVetEditorialDiseasesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "editorial/medicamentos", element: /* @__PURE__ */ jsx(ConsultaVetEditorialMedicationsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "editorial/consensos", element: /* @__PURE__ */ jsx(ConsultaVetEditorialConsensosPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "editorial/importacao", element: /* @__PURE__ */ jsx(ConsultaVetEditorialImportPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "manejo-emergencial", element: /* @__PURE__ */ jsx(ConsultaVetManejoEmergencialPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "manejo-emergencial/:slug", element: /* @__PURE__ */ jsx(ConsultaVetManejoEmergencialGuidePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "guias-rapidos", element: /* @__PURE__ */ jsx(ConsultaVetClinicalQuickGuidesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "guias-rapidos/:slug", element: /* @__PURE__ */ jsx(ConsultaVetClinicalQuickGuideDetailPage, {}) })
  ] }),
  /* @__PURE__ */ jsx(Route, { path: "/rifa", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(ModuleIframe, {}) }) }),
  /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) })
] });
function AppContent() {
  useEffect(() => {
    const prefetchAuthRoutes = () => {
      const imports = [
        import("./src/routes/Login"),
        import("./src/routes/Signup")
      ];
      void Promise.allSettled(imports);
    };
    const prefetchHubRoute = () => {
      void import("./pages/Hub");
    };
    const win = window;
    let authTimeoutId;
    let hubTimeoutId;
    let idleId;
    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(() => {
        prefetchAuthRoutes();
        hubTimeoutId = window.setTimeout(prefetchHubRoute, 4e3);
      }, { timeout: 2500 });
    } else {
      authTimeoutId = window.setTimeout(prefetchAuthRoutes, 1500);
      hubTimeoutId = window.setTimeout(prefetchHubRoute, 5500);
    }
    return () => {
      if (idleId !== void 0 && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (authTimeoutId !== void 0) window.clearTimeout(authTimeoutId);
      if (hubTimeoutId !== void 0) window.clearTimeout(hubTimeoutId);
    };
  }, []);
  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(AuthSessionProvider, { children: /* @__PURE__ */ jsx(ClinicProvider, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(LoadingScreen, {}), children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(Login, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/signup", element: /* @__PURE__ */ jsx(Signup, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/auth/callback", element: /* @__PURE__ */ jsx(AuthCallback, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/reset-password", element: /* @__PURE__ */ jsx(ResetPassword, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/clinic/setup", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(ClinicSetup, {}) }) }),
    appRoutes
  ] }) }) }) }) }) });
}
function App() {
  return /* @__PURE__ */ jsx(AppContent, {});
}
export {
  App
};
