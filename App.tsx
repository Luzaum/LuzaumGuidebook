
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Fluidoterapia from './Fluidoterapia';
import Hemogasometria from './Hemogasometria';
import CalculadoraEnergetica from './CalculadoraEnergetica';
import TransfusaoSanguinea from './TransfusaoSanguinea';
import EscalasDeDorScreen from './EscalasDeDorScreen';
import EmergenciasVet from './EmergenciasVet';
import { useNotification } from './hooks/useNotification';
import Notification from './components/Notification';

// --- ICON COMPONENTS --- //

const GlasgowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>;

// --- DATA STRUCTURES --- //

interface AppItem {
  name: string;
  icon: ReactNode;
  implemented: boolean;
  color: string;
  hoverColor: string;
}

interface AppCategory {
  title: string;
  apps: AppItem[];
}

const appData: AppCategory[] = [
  {
    title: "Calculadoras",
    apps: [
      { name: "Calculadora Energética", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-energetica" alt="Logo do aplicativo de calculadora energética para cães e gatos, mostrando os animais ao lado de uma balança de precisão" className="h-10 w-10 object-contain" />, implemented: true, color: 'bg-green-100', hoverColor: 'hover:bg-green-200' },
      { name: "Calculadora de Fluidoterapia", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-fluidoterapia" alt="Ícone da Calculadora de Fluidoterapia, com um cão e um gato olhando para uma bolsa de fluido estilizada como uma calculadora" className="h-10 w-10 object-contain" />, implemented: true, color: 'bg-blue-100', hoverColor: 'hover:bg-blue-200' },
      { name: "Calculadora de Transfusão Sanguínea", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/transfusao-sanguinea" alt="Logo do aplicativo de banco de sangue veterinário, mostrando um cão e um gato dentro de uma gota de sangue com um eletrocardiograma" className="h-10 w-10 object-contain" />, implemented: true, color: 'bg-red-100', hoverColor: 'hover:bg-red-200' },
      { name: "Calculadora CRI", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-infusao-continua" alt="Logo do aplicativo de cálculo de infusão contínua (CRI), mostrando uma bolsa de fluido e uma calculadora" className="h-10 w-10 object-contain" />, implemented: false, color: 'bg-blue-100', hoverColor: 'hover:bg-blue-200' },
      { name: "Calculadora de Toxicidade", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/calculadora-toxicidade" alt="Ícone da Calculadora de Toxicidade, mostrando um cão e um gato assustados perto de uma barra de chocolate" className="h-10 w-10 object-contain" />, implemented: false, color: 'bg-yellow-100', hoverColor: 'hover:bg-yellow-200' },
    ],
  },
    {
    title: "Emergências",
    apps: [
        { name: "Emergências Veterinárias", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto,e_make_transparent,co_white/logo/emergencias-veterinarias" alt="Logo do aplicativo Emergências Veterinárias com um coração, pata, cão e gato dentro de um círculo vermelho e a cruz médica ao fundo" className="h-10 w-10 object-contain" />, implemented: true, color: 'bg-red-100', hoverColor: 'hover:bg-red-200' },
    ],
  },
  {
    title: "Guias & Referências",
    apps: [
      { name: "Guia de Antibióticos", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/antibioticoterapia" alt="Logo do aplicativo de terapia antibiótica veterinária, mostrando um escudo com uma pata e um frasco de erlenmeyer, simbolizando a proteção e a ciência" className="h-10 w-10 object-contain" />, implemented: false, color: 'bg-cyan-100', hoverColor: 'hover:bg-cyan-200' },
      { name: "Doses Plumb's", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo-bulario/app" alt="Logo do aplicativo de formulário de medicamentos veterinário, mostrando o bastão de Esculápio com asas e uma folha, simbolizando a farmacologia e a medicina natural" className="h-10 w-10 object-contain" />, implemented: false, color: 'bg-teal-100', hoverColor: 'hover:bg-teal-200' },
    ],
  },
  {
    title: "Avaliações & Escalas",
    apps: [
        { name: "Analgesia e controle de dor veterinária", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/escala-de-dor" alt="Ícone do aplicativo de Analgesia e controle de dor veterinária, mostrando um cão e um gato com uma pata no meio e faces indicando diferentes níveis de dor" className="h-10 w-10 object-contain" />, implemented: true, color: 'bg-orange-100', hoverColor: 'hover:bg-orange-200' },
        { name: "Escala de Coma Glasgow", icon: <GlasgowIcon />, implemented: false, color: 'bg-purple-100', hoverColor: 'hover:bg-purple-200' },
        { name: "Estadiamento IRIS", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/estadiamento-iris" alt="Ícone do aplicativo de Estadiamento de Doença Renal, com as silhuetas de um cão e um gato dentro de contornos de rins" className="h-10 w-10 object-contain" />, implemented: false, color: 'bg-sky-100', hoverColor: 'hover:bg-sky-200' },
    ],
  },
  {
    title: "Quizzes",
    apps: [
      { name: "Quiz Residência Vet", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/quiz-veterinaria" alt="Ícone do Quiz de Veterinária, mostrando um cão e um gato com um estetoscópio em forma de coração e um livro aberto com um ponto de interrogação" className="h-10 w-10 object-contain" />, implemented: false, color: 'bg-indigo-100', hoverColor: 'hover:bg-indigo-200' },
    ]
  },
  {
    title: "Interpretação de Exames",
    apps: [
        { name: "Análise de Hemogasometria", icon: <img src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/logo/hemogasometria" alt="Ícone do aplicativo de Hemogasometria Veterinária, com um cão, uma gota de sangue e uma fita de DNA" className="h-10 w-10 object-contain" />, implemented: true, color: 'bg-rose-100', hoverColor: 'hover:bg-rose-200' },
    ]
  }
];

const App = () => {
  const [page, setPage] = useState('home');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const { notifications, showNotification, removeNotification } = useNotification();

  const handleAppClick = (appName: string, isImplemented: boolean) => {
    if (isImplemented) {
        setActiveApp(appName);
    } else {
        showNotification('Este aplicativo ainda não foi implementado.', 'warning');
    }
  };

  const handleBackToApps = () => {
    setActiveApp(null);
  };
  
  const handleBackToHome = () => {
    setPage('home');
    setActiveApp(null); // Reset active app when going home
  };

  if (page === 'home') {
    return (
      <>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
        <img
          src="https://res.cloudinary.com/dwta1roq1/image/upload/w_300,q_auto/LOGOAPP"
          alt="Logo do aplicativo mostrando três gatos estilizados em preto, branco e preto com branco, com o texto 'LUZAUM'S GUIDEBOOK' sobreposto em letras verdes"
          style={{ maxWidth: '300px', height: 'auto' }}
        />
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Luzaum's Guidebook</h1>
        <p className="text-gray-900 mt-2 mb-8">Seu companheiro clínico, anestésico e cirúrgico</p>
        <button
          onClick={() => setPage('apps')}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          APPs
        </button>
      </div>
    );
  }

  if (activeApp === 'Calculadora Energética') {
      return <CalculadoraEnergetica onBack={handleBackToApps} />;
  }
  if (activeApp === 'Calculadora de Fluidoterapia') {
      return <Fluidoterapia onBack={handleBackToApps} />;
  }
  if (activeApp === 'Análise de Hemogasometria') {
      return <Hemogasometria onBack={handleBackToApps} />;
  }
  if (activeApp === 'Calculadora de Transfusão Sanguínea') {
      return <TransfusaoSanguinea onBack={handleBackToApps} />;
  }
  if (activeApp === 'Analgesia e controle de dor veterinária') {
      return <EscalasDeDorScreen onBack={handleBackToApps} />;
  }
  if (activeApp === 'Emergências Veterinárias') {
      return <EmergenciasVet onBack={handleBackToApps} />;
  }


  // App list view
  return (
    <>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
      <div className="bg-white min-h-screen p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
            <button onClick={handleBackToHome} className="mb-6 text-gray-900 hover:text-black font-semibold">
                &larr; Voltar para o Início
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Lista de Aplicativos</h1>
            {appData.map((category) => (
                <div key={category.title} className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-green-200 pb-2 mb-4">
                        {category.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.apps.map((app) => (
                            <div 
                                key={app.name} 
                                className={`flex items-center p-3 ${app.color} rounded-lg shadow-sm transition-all ${app.implemented ? `hover:shadow-md ${app.hoverColor} cursor-pointer` : 'opacity-50'}`}
                                onClick={() => handleAppClick(app.name, app.implemented)}
                                role="button"
                                tabIndex={app.implemented ? 0 : -1}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleAppClick(app.name, app.implemented)}}
                            >
                                <div className="flex-shrink-0">
                                    {app.icon}
                                </div>
                                <div className="ml-4">
                                    <p className="text-md font-semibold text-gray-900">{app.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
