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
import { Home, BookOpen, AlertTriangle, Bookmark, ArrowLeft, Award } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PAIN_GUIDE_SECTIONS } from './data/pain-guide';
import './theme-mobile.css';

type Screen = 'home' | 'scaleSelect' | 'assessment' | 'result' | 'guide' | 'rescue' | 'references';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const screen = (searchParams.get('screen') as Screen) || 'home';

  const [species, setSpecies] = useState<Species | null>(null);
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [result, setResult] = useState<InterpretationResult | null>(null);

  // Lifted states for tabs to preserve user reading state
  const [lastAssessmentScreen, setLastAssessmentScreen] = useState<Screen>('home');
  const [activeGuideTabId, setActiveGuideTabId] = useState<string>(() => PAIN_GUIDE_SECTIONS[0].id);

  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDark = document.documentElement.classList.contains('dark');
    setThemeMode(isDark ? 'dark' : 'light');

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

  // Update last active assessment screen
  useEffect(() => {
    if (['home', 'scaleSelect', 'assessment', 'result'].includes(screen)) {
      setLastAssessmentScreen(screen);
    }
  }, [screen]);

  // Clean species and scales when going back/re-routing
  useEffect(() => {
    if (screen === 'home') {
      setSpecies(null);
      setSelectedScale(null);
      setResult(null);
    } else if (screen === 'scaleSelect') {
      setSelectedScale(null);
      setResult(null);
    } else if (screen === 'assessment') {
      setResult(null);
    }
  }, [screen]);

  const handleSelectSpecies = useCallback((selectedSp: Species) => {
    setSpecies(selectedSp);
    setSearchParams({ screen: 'scaleSelect' });
  }, [setSearchParams]);

  const handleSelectScale = useCallback((scale: Scale) => {
    setSelectedScale(scale);
    setSearchParams({ screen: 'assessment' });
  }, [setSearchParams]);

  const handleAssessmentSubmit = useCallback((answers: Record<string, number | string>) => {
    if (!selectedScale) return;
    const calcResult = selectedScale.interpretation(answers);
    setResult(calcResult);
    setSearchParams({ screen: 'result' });
  }, [selectedScale, setSearchParams]);

  const handleRestart = useCallback(() => {
    setResult(null);
    setSearchParams({ screen: 'assessment' });
  }, [setSearchParams]);

  const handleNewAssessment = useCallback(() => {
    setResult(null);
    setSelectedScale(null);
    setSearchParams({ screen: 'scaleSelect' });
  }, [setSearchParams]);

  const handleShowGuide = useCallback(() => {
    setSearchParams({ screen: 'guide' });
  }, [setSearchParams]);

  const handleBackToHome = useCallback(() => {
    setSearchParams({ screen: 'home' });
  }, [setSearchParams]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleAvaliarTabClick = useCallback(() => {
    if (['home', 'scaleSelect', 'assessment', 'result'].includes(screen)) {
      setSearchParams({ screen: 'home' });
    } else {
      setSearchParams({ screen: lastAssessmentScreen });
    }
  }, [screen, lastAssessmentScreen, setSearchParams]);

  const getHeaderTitle = () => {
    switch (screen) {
      case 'home': return 'Analgesia VET';
      case 'scaleSelect': return 'Selecionar Escala';
      case 'assessment': return selectedScale?.name || 'Avaliação';
      case 'result': return 'Resultado';
      case 'guide': return 'Guia de Manejo';
      case 'rescue': return 'Resgate Analgésico';
      case 'references': return 'Referências';
      default: return 'Escalas de Dor';
    }
  };

  const isMainTab = screen === 'home' || screen === 'guide' || screen === 'rescue' || screen === 'references';

  return (
    <div className={`dorvet-mobile-shell flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 ${themeMode === 'dark' ? 'dark' : ''}`}>
      
      {/* NATIVE APP BAR */}
      <header className="flex-shrink-0 sticky top-0 z-40 w-full bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="w-10">
            {!isMainTab && (
              <button
                onClick={handleBack}
                className="p-2 -ml-2 rounded-full text-slate-600 dark:text-slate-300 active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <h1 className="text-base font-bold text-slate-800 dark:text-white truncate flex-1 text-center">
            {getHeaderTitle()}
          </h1>
          
          <div className="w-10 flex justify-end">
             {/* Espaço reservado para alinhar o título no centro */}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-slate-50 dark:bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="min-h-full pb-20"
          >
            {screen === 'home' && (
              <HomeScreen
                selectedSpecies={species}
                onSelectSpecies={handleSelectSpecies}
                onNavigate={(scr) => setSearchParams({ screen: scr })}
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
                onBack={() => setSearchParams({ screen: 'scaleSelect' })}
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
              <GuideScreen
                activeTabId={activeGuideTabId}
                setActiveTabId={setActiveGuideTabId}
                onBack={handleBackToHome}
              />
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

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around items-center h-16 pb-safe">
        <button
          onClick={handleAvaliarTabClick}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            ['home', 'scaleSelect', 'assessment', 'result'].includes(screen)
              ? 'text-teal-600 dark:text-teal-400'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Award className="h-5 w-5" />
          <span className="text-[10px] font-medium">Avaliar</span>
        </button>

        <button
          onClick={() => setSearchParams({ screen: 'guide' })}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            screen === 'guide' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px] font-medium">Guia</span>
        </button>

        <button
          onClick={() => setSearchParams({ screen: 'rescue' })}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            screen === 'rescue' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="text-[10px] font-medium">Resgate</span>
        </button>

        <button
          onClick={() => setSearchParams({ screen: 'references' })}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            screen === 'references' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Bookmark className="h-5 w-5" />
          <span className="text-[10px] font-medium">Fontes</span>
        </button>
      </nav>
    </div>
  );
}
