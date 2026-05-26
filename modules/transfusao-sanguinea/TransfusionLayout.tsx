import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransfusionSidebar } from './components/TransfusionSidebar';
import { TransfusionMobileNav } from './components/TransfusionMobileNav';
import { KnowledgeModal } from './components/KnowledgeModal';
import { titleForTransfusionPage, type TransfusionPage } from './navConfig';

// Importando as páginas internas
import CalculatorPage from './pages/CalculatorPage';
import PrepGuidePage from './pages/PrepGuidePage';
import CrossmatchPage from './pages/CrossmatchPage';
import ReactionsPage from './pages/ReactionsPage';
import DrugsPage from './pages/DrugsPage';

export const TransfusionLayout: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TransfusionPage>('calculator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalTerm, setModalTerm] = useState<string | null>(null);

  const handleNavigate = (page: TransfusionPage) => {
    setActiveTab(page);
    setMobileMenuOpen(false);
  };

  const handleBackToHub = () => {
    navigate('/hub');
  };

  // Renderização condicional de páginas
  const renderPageContent = () => {
    switch (activeTab) {
      case 'prep':
        return <PrepGuidePage onOpenModal={setModalTerm} />;
      case 'crossmatch':
        return <CrossmatchPage />;
      case 'reactions':
        return <ReactionsPage />;
      case 'drugs':
        return <DrugsPage />;
      case 'calculator':
      default:
        return <CalculatorPage onOpenModal={setModalTerm} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground animate-in fade-in duration-300">
      
      {/* Modal global de base de conhecimento (tooltips) */}
      <KnowledgeModal term={modalTerm} onClose={() => setModalTerm(null)} />

      {/* Sidebar Lateral para Desktop e Tablet */}
      <div className="hidden md:block h-full">
        <TransfusionSidebar
          activeKey={activeTab}
          onNavigate={handleNavigate}
          onBackToHub={handleBackToHub}
        />
      </div>

      {/* Sidebar Drawer para Mobile (Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 h-full animate-in slide-in-from-left duration-300">
            <TransfusionSidebar
              activeKey={activeTab}
              onNavigate={handleNavigate}
              onBackToHub={handleBackToHub}
              isMobile={true}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Área de Conteúdo Principal */}
      <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
        
        {/* Mobile Navigation Header */}
        <TransfusionMobileNav
          activeKey={activeTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Header Superior Premium (Oculto no mobile porque a nav mobile já tem título) */}
        <header className="hidden md:block border-b border-border/80 bg-card/60 backdrop-blur-sm px-8 py-5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-foreground bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
                {titleForTransfusionPage(activeTab)}
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Transfusão segura é aquela revisada e baseada em evidência.
              </p>
            </div>
            
            <div className="flex items-center gap-1 bg-red-500/10 text-red-500 border border-red-500/10 px-3 py-1.5 rounded-xl text-xs font-bold shadow-inner">
              <span className="animate-pulse">🩸</span> Hemoterapia Veterinária
            </div>
          </div>
        </header>

        {/* Viewport de Rolagem Principal */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 custom-scrollbar">
          <div className="w-full">
            {renderPageContent()}
          </div>
        </main>

      </div>

    </div>
  );
};

TransfusionLayout.displayName = 'TransfusionLayout';
export default TransfusionLayout;
