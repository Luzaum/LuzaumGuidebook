import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { InterpretationResult, Scale, Species } from './types';
import { DOG_SCALES } from './data/dog-scales';
import { CAT_SCALES } from './data/cat-scales';
import HomeScreen from './screens/HomeScreen';
import ScaleSelectionScreen from './screens/ScaleSelectionScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import ResultScreen from './screens/ResultScreen';
import GuideScreen from './screens/GuideScreen';
import RescueScreen from './screens/RescueScreen';
import ReferencesScreen from './screens/ReferencesScreen';
import PainNavigation, { type PainNavigationTarget } from './components/PainNavigation';
import './theme.css';

type Screen = PainNavigationTarget | 'assessment' | 'result';

const ALL_SCALES = [...DOG_SCALES, ...CAT_SCALES];

function screenFromPath(pathname: string): Screen {
  if (pathname.startsWith('/dor/avaliacao/')) return 'assessment';
  if (pathname === '/dor/avaliacao') return 'scaleSelect';
  if (pathname === '/dor/resultado') return 'result';
  if (pathname === '/dor/guia') return 'guide';
  if (pathname === '/dor/resgate') return 'rescue';
  if (pathname === '/dor/referencias') return 'references';
  return 'home';
}

const pathForScreen: Record<PainNavigationTarget | 'result', string> = {
  home: '/dor',
  scaleSelect: '/dor/avaliacao',
  guide: '/dor/guia',
  rescue: '/dor/resgate',
  references: '/dor/referencias',
  result: '/dor/resultado',
};

function getSpeciesFromSearch(search: string): Species | null {
  const value = new URLSearchParams(search).get('species');
  return value === 'dog' || value === 'cat' ? value : null;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const screen = useMemo(() => screenFromPath(location.pathname), [location.pathname]);
  const searchSpecies = useMemo(() => getSpeciesFromSearch(location.search), [location.search]);
  const [species, setSpecies] = useState<Species | null>(searchSpecies);
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [result, setResult] = useState<InterpretationResult | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() =>
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );

  const navigateWithSpecies = useCallback((path: string, nextSpecies = species, replace = false) => {
    const suffix = nextSpecies ? `?species=${nextSpecies}` : '';
    navigate(`${path}${suffix}`, { replace });
  }, [navigate, species]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (searchSpecies && searchSpecies !== species) setSpecies(searchSpecies);
  }, [searchSpecies, species]);

  useEffect(() => {
    if (screen === 'assessment') {
      const scaleId = decodeURIComponent(location.pathname.slice('/dor/avaliacao/'.length));
      const routeScale = ALL_SCALES.find((item) => item.id === scaleId);
      if (!routeScale) {
        navigateWithSpecies('/dor/avaliacao', species, true);
        return;
      }
      if (selectedScale?.id !== routeScale.id) {
        setSelectedScale(routeScale);
        setSpecies(routeScale.species);
        setAnswers({});
        setResult(null);
      }
    }

    if (screen === 'scaleSelect' && !species && !searchSpecies) {
      navigate('/dor', { replace: true });
    }

    if (screen === 'result' && (!result || !selectedScale)) {
      navigateWithSpecies(selectedScale ? `/dor/avaliacao/${selectedScale.id}` : '/dor/avaliacao', species, true);
    }
  }, [location.pathname, navigate, navigateWithSpecies, result, screen, searchSpecies, selectedScale, species]);

  useEffect(() => {
    shellRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen, selectedScale?.id]);

  const resetAssessment = useCallback(() => {
    setSelectedScale(null);
    setResult(null);
    setAnswers({});
  }, []);

  const handleSelectSpecies = useCallback((nextSpecies: Species) => {
    setSpecies(nextSpecies);
    resetAssessment();
    navigateWithSpecies('/dor/avaliacao', nextSpecies);
  }, [navigateWithSpecies, resetAssessment]);

  const handleSelectScale = useCallback((scale: Scale) => {
    setSpecies(scale.species);
    setSelectedScale(scale);
    setResult(null);
    setAnswers({});
    navigateWithSpecies(`/dor/avaliacao/${scale.id}`, scale.species);
  }, [navigateWithSpecies]);

  const handleSubmit = useCallback((submittedAnswers: Record<string, number | string>) => {
    if (!selectedScale) return;
    setAnswers(submittedAnswers);
    setResult(selectedScale.interpretation(submittedAnswers));
    navigateWithSpecies(pathForScreen.result, selectedScale.species);
  }, [navigateWithSpecies, selectedScale]);

  const handleNavigate = useCallback((target: PainNavigationTarget) => {
    if (target === 'home') {
      resetAssessment();
      navigate(pathForScreen.home);
      return;
    }
    if (target === 'scaleSelect') {
      if (!species) {
        navigate('/dor');
        return;
      }
      setSelectedScale(null);
      setResult(null);
      setAnswers({});
      navigateWithSpecies(pathForScreen.scaleSelect);
      return;
    }
    navigateWithSpecies(pathForScreen[target]);
  }, [navigate, navigateWithSpecies, resetAssessment, species]);

  const handleBack = useCallback(() => {
    if (screen === 'assessment') {
      setSelectedScale(null);
      setAnswers({});
      navigateWithSpecies(pathForScreen.scaleSelect);
      return;
    }
    if (screen === 'result' && selectedScale) {
      setResult(null);
      navigateWithSpecies(`/dor/avaliacao/${selectedScale.id}`);
      return;
    }
    navigate(pathForScreen.home);
  }, [navigate, navigateWithSpecies, screen, selectedScale]);

  const contextLabel = screen === 'assessment' || screen === 'result'
    ? selectedScale?.name
    : screen === 'scaleSelect'
      ? species === 'dog' ? 'Escalas caninas' : 'Escalas felinas'
      : screen === 'guide'
        ? 'Guia de manejo'
        : screen === 'rescue'
          ? 'Resgate analgésico'
          : screen === 'references'
            ? 'Referências científicas'
            : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <div ref={shellRef} className={`dorvet-shell dorvet-shell-immersive ${themeMode === 'dark' ? 'dorvet-dark dark' : 'dorvet-light'}`}>
        <div className="dorvet-aurora" />
        <PainNavigation
          active={screen}
          species={species}
          contextLabel={contextLabel}
          canGoBack={screen !== 'home'}
          onBack={handleBack}
          onNavigate={handleNavigate}
          onHub={() => navigate('/hub')}
        />

        <div className="dorvet-content-wrap">
          <main className="relative mx-auto max-w-6xl py-5 sm:py-7 lg:py-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${screen}-${selectedScale?.id ?? ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {screen === 'home' && <HomeScreen selectedSpecies={species} onSelectSpecies={handleSelectSpecies} onNavigate={(target) => handleNavigate(target as PainNavigationTarget)} />}
                {screen === 'scaleSelect' && species && <ScaleSelectionScreen species={species} onSelectScale={handleSelectScale} onBack={handleBack} />}
                {screen === 'assessment' && selectedScale && <AssessmentScreen key={selectedScale.id} scale={selectedScale} answers={answers} onAnswersChange={setAnswers} onSubmit={handleSubmit} onBack={handleBack} />}
                {screen === 'result' && result && selectedScale && (
                  <ResultScreen
                    result={result}
                    scaleName={selectedScale.name}
                    species={species}
                    onRestart={() => { setAnswers({}); setResult(null); navigateWithSpecies(`/dor/avaliacao/${selectedScale.id}`); }}
                    onNewAssessment={() => handleNavigate('scaleSelect')}
                    onShowGuide={() => handleNavigate('guide')}
                  />
                )}
                {screen === 'guide' && <GuideScreen onBack={handleBack} />}
                {screen === 'rescue' && <RescueScreen onBack={handleBack} />}
                {screen === 'references' && <ReferencesScreen onBack={handleBack} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
