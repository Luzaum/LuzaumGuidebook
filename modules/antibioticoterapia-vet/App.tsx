import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { AbvSidebar } from './components/layout/AbvSidebar'
import { AbvMobileDrawer, AbvMobileTopBar } from './components/layout/AbvMobileNav'
import {
  AbvTab,
  AbvInstitutionalFocus,
  AntibioticClass,
  DiseaseSystem,
  Species,
  LifeStageKey,
  ComorbidityState,
} from './types'
import type { SeverityTier } from './model/types'
import type { SyndromeId } from './model/ids'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const PatientGuide = lazy(() => import('./pages/PatientGuide'))
const AntibioticsGuide = lazy(() => import('./pages/AntibioticsGuide'))
const PathogenLibraryPage = lazy(() =>
  import('./pages/PathogenLibraryPage').then((m) => ({ default: m.PathogenLibraryPage })),
)
const HospitalStewardshipPage = lazy(() =>
  import('./pages/HospitalStewardshipPage').then((m) => ({ default: m.HospitalStewardshipPage })),
)
const ReferencesPage = lazy(() =>
  import('./pages/ReferencesPage').then((m) => ({ default: m.ReferencesPage })),
)
const PlaceholderSection = lazy(() => import('./pages/PlaceholderSection'))

function AbvRouteFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center p-8 text-sm"
      style={{ color: 'hsl(var(--muted-foreground))' }}
    >
      Carregando…
    </div>
  )
}

export function App() {
  const [activeTab, setActiveTab] = useState<AbvTab>('home')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const [legacyDicts, setLegacyDicts] = useState<{ ab: AntibioticClass; dz: DiseaseSystem } | null>(null)
  const [focusDrug, setFocusDrug] = useState<string | null>(null)
  const [focusDiseaseName, setFocusDiseaseName] = useState<string | null>(null)
  const [sourcePage, setSourcePage] = useState<AbvTab | null>(null)
  const [antibioticsSearchSeed, setAntibioticsSearchSeed] = useState<string | undefined>(undefined)
  const [unifiedSearchSeed, setUnifiedSearchSeed] = useState<string | undefined>(undefined)
  const [institutionalFocus, setInstitutionalFocus] = useState<AbvInstitutionalFocus | null>(null)

  const [step, setStep] = useState(1)
  const [species, setSpecies] = useState<Species | null>(null)
  const [life, setLife] = useState<LifeStageKey | null>(null)
  const [co, setCo] = useState<ComorbidityState>({
    renal: false,
    hepatic: false,
    septic: false,
    cardiac: false,
    neurological: false,
  })
  const [severity, setSeverity] = useState<SeverityTier>('ambulatory_stable')
  const [chosenV2, setChosenV2] = useState<SyndromeId | null>(null)

  const needsLegacySeeds = activeTab === 'syndrome' || activeTab === 'antibiotics'

  useEffect(() => {
    if (!needsLegacySeeds || legacyDicts) return
    let cancelled = false
    void Promise.all([
      import('./data/antibiotics').then((m) => m.AB_SEED),
      import('./data/diseases').then((m) => m.DZ_SEED),
    ]).then(([ab, dz]) => {
      if (!cancelled) setLegacyDicts({ ab, dz })
    })
    return () => {
      cancelled = true
    }
  }, [needsLegacySeeds, legacyDicts])

  const consumeAntibioticsSearchSeed = useCallback(() => setAntibioticsSearchSeed(undefined), [])
  const consumeUnifiedSearchSeed = useCallback(() => setUnifiedSearchSeed(undefined), [])

  const onDeepLinkDrug = (drugName: string) => {
    setAntibioticsSearchSeed(undefined)
    setUnifiedSearchSeed(undefined)
    setFocusDiseaseName(null)
    setFocusDrug(drugName)
    setSourcePage(activeTab)
    setActiveTab('antibiotics')
  }

  const onNavigateSyndromeV2 = useCallback((id: SyndromeId) => {
    setChosenV2(id)
    setStep(3)
    setActiveTab('syndrome')
  }, [])

  const onNavigateInstitutional = useCallback((target: AbvInstitutionalFocus) => {
    setInstitutionalFocus(target)
    if (target.kind === 'pathogen' || target.kind === 'resistance') setActiveTab('pathogens')
    else if (target.kind === 'hospital') setActiveTab('hospital')
    else setActiveTab('references')
  }, [])

  const onOpenLegacyDisease = useCallback((diseaseName: string) => {
    setFocusDrug(null)
    setAntibioticsSearchSeed(undefined)
    setUnifiedSearchSeed(undefined)
    setFocusDiseaseName(diseaseName)
    setActiveTab('antibiotics')
  }, [])

  const clearFocusDisease = useCallback(() => setFocusDiseaseName(null), [])

  const clearInstitutionalFocus = useCallback(() => setInstitutionalFocus(null), [])

  const resetWizard = () => {
    setStep(1)
    setSpecies(null)
    setLife(null)
    setCo({
      renal: false,
      hepatic: false,
      septic: false,
      cardiac: false,
      neurological: false,
    })
    setSeverity('ambulatory_stable')
    setChosenV2(null)
  }

  const onResetPatientFlow = () => {
    setFocusDrug(null)
    setSourcePage(null)
    resetWizard()
    setActiveTab('home')
  }

  const onHomeSearch = (query: string) => {
    setUnifiedSearchSeed(query)
    setAntibioticsSearchSeed(undefined)
    setFocusDrug(null)
    setFocusDiseaseName(null)
    setSourcePage(null)
    setActiveTab('antibiotics')
  }

  const renderMain = () => {
    if (needsLegacySeeds && !legacyDicts) {
      return <AbvRouteFallback />
    }

    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} onSearch={onHomeSearch} />
      case 'syndrome': {
        const { ab: abDict, dz: dzDict } = legacyDicts!
        return (
          <PatientGuide
            setPage={setActiveTab}
            dzDict={dzDict}
            abDict={abDict}
            onDeepLinkDrug={onDeepLinkDrug}
            onReset={onResetPatientFlow}
            step={step}
            setStep={setStep}
            species={species}
            setSpecies={setSpecies}
            life={life}
            setLife={setLife}
            co={co}
            setCo={setCo}
            severity={severity}
            setSeverity={setSeverity}
            chosenV2={chosenV2}
            setChosenV2={setChosenV2}
          />
        )
      }
      case 'antibiotics': {
        const { ab: abDict, dz: dzDict } = legacyDicts!
        return (
          <AntibioticsGuide
            setPage={setActiveTab}
            abDict={abDict}
            dzDict={dzDict}
            focusDrug={focusDrug}
            focusDiseaseName={focusDiseaseName}
            onClearFocusDisease={clearFocusDisease}
            sourcePage={sourcePage}
            searchSeed={antibioticsSearchSeed}
            unifiedSearchSeed={unifiedSearchSeed}
            onSearchSeedConsumed={consumeAntibioticsSearchSeed}
            onUnifiedSearchSeedConsumed={consumeUnifiedSearchSeed}
            onNavigateSyndromeV2={onNavigateSyndromeV2}
            onNavigateInstitutional={onNavigateInstitutional}
            onOpenLegacyDisease={onOpenLegacyDisease}
          />
        )
      }
      case 'pathogens':
        return (
          <PathogenLibraryPage
            setPage={setActiveTab}
            institutionalFocus={institutionalFocus}
            onConsumedInstitutionalFocus={clearInstitutionalFocus}
          />
        )
      case 'hospital':
        return (
          <HospitalStewardshipPage
            setPage={setActiveTab}
            institutionalFocus={institutionalFocus}
            onConsumedInstitutionalFocus={clearInstitutionalFocus}
          />
        )
      case 'references':
        return (
          <ReferencesPage
            setPage={setActiveTab}
            institutionalFocus={institutionalFocus}
            onConsumedInstitutionalFocus={clearInstitutionalFocus}
          />
        )
      case 'perioperative':
      case 'patient-context':
        return <PlaceholderSection tab={activeTab} />
      default:
        return null
    }
  }

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <AbvSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <AbvMobileTopBar onOpenMenu={() => setMobileNavOpen(true)} activeTab={activeTab} />
        <main className="abv-main-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Suspense fallback={<AbvRouteFallback />}>{renderMain()}</Suspense>
        </main>
      </div>
      <AbvMobileDrawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  )
}
