import React, { useState, useEffect, useCallback } from 'react';
import { Species, PainType, Scale, InterpretationResult } from './types';
import HomeScreen from './screens/HomeScreen';
import ScaleSelectionScreen from './screens/ScaleSelectionScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import ResultScreen from './screens/ResultScreen';
import GuideScreen from './screens/GuideScreen';
import RescueScreen from './screens/RescueScreen';
import ReferencesScreen from './screens/ReferencesScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, AlertTriangle, Bookmark, ArrowLeft, Menu, X, Activity, ShieldAlert, Award } from 'lucide-react';
import './theme.css';

type Screen = 'home' | 'scaleSelect' | 'assessment' | 'result' | 'guide' | 'rescue' | 'references';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [species, setSpecies] = useState<Species | null>(null);
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [result, setResult] = useState<InterpretationResult | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sincronização automatizada com o tema global do Vetius (classe .dark na tag html)
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Verificação inicial do tema
    const isDark = document.documentElement.classList.contains('dark');
    setThemeMode(isDark ? 'dark' : 'light');

    // MutationObserver para detectar quando o tutor/veterinário troca o tema no cabeçalho global do Vetius
    const observer = new MutationObserver(() => {
      const currentIsDark = document.documentElement.classList.contains('dark');
      setThemeMode(currentIsDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Fechar menu mobile ao trocar de tela
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [screen]);

  // Ações de navegação
  const handleSelectSpecies = useCallback((selectedSp: Species) => {
    setSpecies(selectedSp);
    setScreen('scaleSelect');
  }, []);

  const handleSelectScale = useCallback((scale: Scale) => {
    setSelectedScale(scale);
    setScreen('assessment');
  }, []);

  const handleAssessmentSubmit = useCallback((answers: Record<string, number | string>) => {
    if (!selectedScale) return;
    const calcResult = selectedScale.interpretation(answers);
    setResult(calcResult);
    setScreen('result');
  }, [selectedScale]);

  const handleRestart = useCallback(() => {
    setScreen('assessment');
    setResult(null);
  }, []);

  const handleNewAssessment = useCallback(() => {
    setScreen('scaleSelect');
    setResult(null);
    setSelectedScale(null);
  }, []);

  const handleShowGuide = useCallback(() => {
    setScreen('guide');
  }, []);

  const handleBackToHome = useCallback(() => {
    setScreen('home');
    setSpecies(null);
    setSelectedScale(null);
    setResult(null);
  }, []);

  // Renderizador do Conteúdo Interno do Menu Lateral
  const renderSidebarContent = () => (
    <>
      {/* Brand Header */}
      <div className="dorvet-sidebar-header">
        <div className="dorvet-sidebar-logo">
          <Activity className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h2 className="dorvet-sidebar-title text-slate-800 dark:text-teal-50">
            Analgesia VET
          </h2>
          <span className="dorvet-sidebar-subtitle">
            Escalas e Manejo de Dor
          </span>
        </div>
      </div>

      {/* Navigation list items */}
      <nav className="dorvet-sidebar-nav mt-4 flex-1">
        <button
          onClick={() => setScreen('home')}
          className={`dorvet-nav-item ${screen === 'home' ? 'dorvet-nav-item-active' : ''}`}
        >
          <Home className="h-4 w-4 shrink-0" />
          <span>Início</span>
        </button>

        <button
          onClick={() => {
            if (species) {
              setScreen('scaleSelect');
            } else {
              setScreen('home');
            }
          }}
          className={`dorvet-nav-item ${
            screen === 'scaleSelect' || screen === 'assessment' || screen === 'result'
              ? 'dorvet-nav-item-active'
              : ''
          }`}
        >
          <Award className="h-4 w-4 shrink-0" />
          <span>Avaliação de Dor</span>
        </button>

        <button
          onClick={() => setScreen('guide')}
          className={`dorvet-nav-item ${screen === 'guide' ? 'dorvet-nav-item-active' : ''}`}
        >
          <BookOpen className="h-4 w-4 shrink-0" />
          <span>Guia de Manejo</span>
        </button>

        <button
          onClick={() => setScreen('rescue')}
          className={`dorvet-nav-item ${screen === 'rescue' ? 'dorvet-nav-item-active' : ''}`}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Resgate Analgésico</span>
        </button>

        <button
          onClick={() => setScreen('references')}
          className={`dorvet-nav-item ${screen === 'references' ? 'dorvet-nav-item-active' : ''}`}
        >
          <Bookmark className="h-4 w-4 shrink-0" />
          <span>Referências</span>
        </button>
      </nav>

      {/* Footer credits inside sidebar */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-850 text-center">
        <span className="text-[9px] font-black tracking-widest text-slate-400 dark:text-slate-600 block uppercase">
          Baseado em animalpain.org
        </span>
      </div>
    </>
  );

  return (
    <div className={`dorvet-shell ${themeMode === 'dark' ? 'dorvet-dark dark' : 'dorvet-light'}`}>
      {/* Aurora Ambient Background Pattern */}
      <div className="dorvet-aurora" />

      {/* DESKTOP SIDEBAR: Hidden on mobile, Flex on desktop */}
      <aside className="dorvet-sidebar hidden lg:flex">
        {renderSidebarContent()}
      </aside>

      {/* MOBILE DRAWER: slide-in panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="dorvet-drawer-overlay border-0 outline-none w-full h-full text-left"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="dorvet-drawer-panel relative"
            >
              {/* Close Button on Mobile Drawer */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-3.5 top-3.5 rounded-full border border-slate-200 dark:border-slate-800 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-4 w-4" />
              </button>

              {renderSidebarContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STICKY HEADER FOR MOBILE & BACK NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/75 dark:border-slate-800/60 dark:bg-slate-950/75 backdrop-blur-md px-4 sm:px-6">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden rounded-lg p-1.5 text-slate-550 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>

            {screen !== 'home' && (
              <button
                onClick={handleBackToHome}
                className="rounded-lg p-1.5 text-slate-550 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 transition-colors"
                aria-label="Voltar para o início"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <span className="text-sm font-black uppercase tracking-widest text-teal-650 dark:text-teal-400">
              VETIUS ANAGESIA
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Home action */}
            <button
              onClick={() => setScreen('home')}
              className={`rounded-lg p-2 text-slate-555 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 transition-colors ${
                screen === 'home' ? 'bg-slate-100 dark:bg-slate-800 text-teal-500' : ''
              }`}
              title="Tela Inicial"
            >
              <Home className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT BODY WRAPPER: .dorvet-content-wrap handles responsive sidebar padding */}
      <div className="dorvet-content-wrap">
        <main className="mx-auto max-w-6xl py-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {screen === 'home' && (
                <HomeScreen
                  selectedSpecies={species}
                  onSelectSpecies={handleSelectSpecies}
                  onNavigate={(scr) => setScreen(scr as Screen)}
                />
              )}

              {screen === 'scaleSelect' && species && (
                <ScaleSelectionScreen
                  species={species}
                  onSelectScale={handleSelectScale}
                  onBack={handleBackToHome}
                />
              )}

              {screen === 'assessment' && selectedScale && (
                <AssessmentScreen
                  scale={selectedScale}
                  onSubmit={handleAssessmentSubmit}
                  onBack={() => setScreen('scaleSelect')}
                />
              )}

              {screen === 'result' && result && (
                <ResultScreen
                  result={result}
                  scaleName={selectedScale?.name || ''}
                  species={species}
                  onRestart={handleRestart}
                  onNewAssessment={handleNewAssessment}
                  onShowGuide={handleShowGuide}
                />
              )}

              {screen === 'guide' && (
                <GuideScreen onBack={handleBackToHome} />
              )}

              {screen === 'rescue' && (
                <RescueScreen onBack={handleBackToHome} />
              )}

              {screen === 'references' && (
                <ReferencesScreen onBack={handleBackToHome} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
