
import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider } from './components/theme-provider';
import Layout from './components/Layout';
import AppCard from './components/AppCard';
import { Calculator, Heart, BookOpen, Activity, Brain, TestTube, Stethoscope } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import HeroSection from './components/HeroSection';
import { AuthProvider, useAuth } from './components/AuthProvider';
import LoginCard from './components/LoginCard';

// Import existing apps
import Fluidoterapia from './Fluidoterapia';
import Hemogasometria from './Hemogasometria';
import CalculadoraEnergetica from './CalculadoraEnergetica';
import TransfusaoSanguinea from './TransfusaoSanguinea';
import EscalasDeDorScreen from './EscalasDeDorScreen';
import EmergenciasVet from './EmergenciasVet';

// --- APP DATA STRUCTURE --- //

interface AppItem {
  id: string;
  name: string;
  icon: ReactNode;
  implemented: boolean;
  description: string;
  category: string;
  color: string;
  component?: React.ComponentType<{ onBack: () => void }>;
  externalUrl?: string;
}

interface AppCategory {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  apps: AppItem[];
}

const appData: AppCategory[] = [
  {
    id: 'calculadoras',
    title: "Calculadoras",
    description: "Ferramentas de cálculo para fluidoterapia, transfusão e mais",
    icon: <Calculator className="h-5 w-5" />,
    apps: [
      {
        id: 'calculadora-energetica',
        name: "Calculadora Energética",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-energetica" alt="Calculadora Energética" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Cálculo de necessidades energéticas para cães e gatos",
        category: "Calculadoras",
        color: 'bg-primary/10',
        component: CalculadoraEnergetica
      },
      {
        id: 'fluidoterapia',
        name: "Calculadora de Fluidoterapia",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-fluidoterapia" alt="Fluidoterapia" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Cálculo de fluidoterapia com protocolos específicos",
        category: "Calculadoras",
        color: 'bg-primary/10',
        component: Fluidoterapia
      },
      {
        id: 'transfusao-sanguinea',
        name: "Calculadora de Transfusão Sanguínea",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/transfusao-sanguinea" alt="Transfusão Sanguínea" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Cálculo de transfusão sanguínea e compatibilidade",
        category: "Calculadoras",
        color: 'bg-primary/10',
        component: TransfusaoSanguinea
      },
      {
        id: 'calculadora-cri',
        name: "Calculadora CRI",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-infusao-continua" alt="CRI" className="h-8 w-8 object-contain" />,
        implemented: false,
        description: "Cálculo de infusão contínua de medicamentos",
        category: "Calculadoras",
        color: 'bg-muted'
      },
      {
        id: 'calculadora-toxicidade',
        name: "Calculadora de Toxicidade",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-toxicidade" alt="Toxicidade" className="h-8 w-8 object-contain" />,
        implemented: false,
        description: "Cálculo de doses tóxicas e antídotos",
        category: "Calculadoras",
        color: 'bg-muted'
      },
    ],
  },
  {
    id: 'emergencias',
    title: "Emergências",
    description: "Protocolos de emergência veterinária",
    icon: <Heart className="h-5 w-5" />,
    apps: [
      {
        id: 'emergencias-veterinarias',
        name: "Emergências Veterinárias",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto,e_make_transparent,co_white/logo/emergencias-veterinarias" alt="Emergências" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Protocolos de emergência e primeiros socorros",
        category: "Emergências",
        color: 'bg-primary/10',
        component: EmergenciasVet
      },
    ],
  },
  {
    id: 'guias',
    title: "Guias & Referências",
    description: "Guias de referência e formulários",
    icon: <BookOpen className="h-5 w-5" />,
    apps: [
      {
        id: 'guia-antibioticos',
        name: "Guia de Antibióticos",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/antibioticoterapia" alt="Antibióticos" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Guia completo de terapia antibiótica",
        category: "Guias",
        color: 'bg-muted',
        externalUrl: '/Antibioticoterapia'
      },
      {
        id: 'bulario-vet',
        name: "Bulário Veterinário",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo-bulario/app" alt="Bulário" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Formulário completo de medicamentos",
        category: "Guias",
        color: 'bg-muted',
        externalUrl: '/BularioVET'
      },
      {
        id: 'crivet',
        name: "CRIVET",
        icon: <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-semibold">CRV</span>,
        implemented: true,
        description: "Guia de compatibilidade de medicamentos",
        category: "Guias",
        color: 'bg-muted',
        externalUrl: '/CRIVET'
      },
    ],
  },
  {
    id: 'avaliacoes',
    title: "Avaliações & Escalas",
    description: "Escalas de dor e avaliações clínicas",
    icon: <Activity className="h-5 w-5" />,
    apps: [
      {
        id: 'escalas-dor',
        name: "Analgesia e Controle de Dor",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/escala-de-dor" alt="Escalas de Dor" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Escalas de dor e protocolos de analgesia",
        category: "Avaliações",
        color: 'bg-primary/10',
        component: EscalasDeDorScreen
      },
      {
        id: 'glasgow',
        name: "Escala de Coma Glasgow",
        icon: <Brain className="h-6 w-6 text-muted-foreground" />,
        implemented: false,
        description: "Avaliação do nível de consciência",
        category: "Avaliações",
        color: 'bg-muted'
      },
      {
        id: 'estadiamento-iris',
        name: "Estadiamento IRIS",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/estadiamento-iris" alt="IRIS" className="h-8 w-8 object-contain" />,
        implemented: false,
        description: "Estadiamento de doença renal",
        category: "Avaliações",
        color: 'bg-muted'
      },
    ],
  },
  {
    id: 'exames',
    title: "Interpretação de Exames",
    description: "Análise e interpretação de exames laboratoriais",
    icon: <TestTube className="h-5 w-5" />,
    apps: [
      {
        id: 'hemogasometria',
        name: "Análise de Hemogasometria",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/hemogasometria" alt="Hemogasometria" className="h-8 w-8 object-contain" />,
        implemented: true,
        description: "Interpretação de hemogasometria arterial e venosa",
        category: "Exames",
        color: 'bg-primary/10',
        component: Hemogasometria
      },
    ],
  },
  {
    id: 'quizzes',
    title: "Quizzes",
    description: "Testes e questionários para estudo",
    icon: <Stethoscope className="h-5 w-5" />,
    apps: [
      {
        id: 'quiz-residencia',
        name: "Quiz Residência Vet",
        icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/quiz-veterinaria" alt="Quiz" className="h-8 w-8 object-contain" />,
        implemented: false,
        description: "Questões de residência veterinária",
        category: "Quizzes",
        color: 'bg-muted',
        externalUrl: '/vetpro'
      },
    ],
  },
];

// --- MAIN APP COMPONENT --- //

const AppContent = () => {
  const [currentView, setCurrentView] = useState<'splash' | 'home' | 'apps' | 'app'>('splash');
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const { isAuthenticated, openExternalApp } = useAuth();

  const handleGetStarted = () => {
    setCurrentView('apps');
  };

  const handleAppClick = (app: AppItem) => {
    if (!app.implemented) {
      alert('Este aplicativo ainda não foi implementado.');
      return;
    }

    if (app.externalUrl) {
      openExternalApp(app.externalUrl);
      return;
    }

    if (app.component) {
      setActiveApp(app);
      setCurrentView('app');
    }
  };

  const handleBackToApps = () => {
    setActiveApp(null);
    setCurrentView('apps');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setActiveApp(null);
  };

  // Render active app
  if (currentView === 'app' && activeApp?.component) {
    const AppComponent = activeApp.component;
    return (
      <Layout onBack={handleBackToApps} title={activeApp.name} showHeader={true}>
        <AppComponent onBack={handleBackToApps} />
      </Layout>
    );
  }

  // Render apps list
  if (currentView === 'home') {
    return (
      <Layout showHeader={true}>
        <HeroSection onGetStarted={() => setCurrentView('apps')} />
      </Layout>
    );
  }

  if (currentView === 'apps') {
    return (
      <Layout title="Aplicativos" showHeader={true}>
        {!isAuthenticated && (
          <div className="mb-8">
            <LoginCard />
          </div>
        )}
        <div className="space-y-8">
          {appData.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.apps.map((app) => (
                  <AppCard
                    key={app.id}
                    name={app.name}
                    icon={app.icon}
                    implemented={app.implemented}
                    description={app.description}
                    category={app.category}
                    onClick={() => handleAppClick(app)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  // Splash screen as initial view, pré-carregando ícones usados na grade
  return (
    <SplashScreen
      onComplete={() => setCurrentView('home')}
      assetsToPreload={[
        "https://res.cloudinary.com/dwta1roq1/image/upload/w_120,q_auto/LOGOAPP",
        "https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-energetica",
        "https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-fluidoterapia",
        "https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/transfusao-sanguinea",
        "https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/escala-de-dor",
        "https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/hemogasometria"
      ]}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="luzaum-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
