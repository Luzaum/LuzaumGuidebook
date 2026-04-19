import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
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
  Disease,
} from './types'
import { safeList } from './utils/dataUtils'
import {
  clearAllAbvSessionStorage,
  loadAbvAppPersist,
  saveAbvAppPersist,
  type AbvAppPersistV1,
} from './utils/abvSessionPersistence'

const VALID_ABV_TABS: AbvTab[] = [
  'home',
  'syndrome',
  'diseases',
  'antibiotics',
  'pathogens',
  'perioperative',
  'patient-context',
  'references',
]

const LIFE_KEYS: LifeStageKey[] = ['filhote', 'adulto', 'gestante', 'lactante', 'idoso']

function readInitialAbvShell(): Omit<AbvAppPersistV1, 'v' | 'chosenDiseaseName'> & { chosenDiseaseName: string | null } {
  const p = loadAbvAppPersist()
  const activeTab =
    p.activeTab && VALID_ABV_TABS.includes(p.activeTab) ? p.activeTab : 'home'
  const step = typeof p.step === 'number' ? Math.min(4, Math.max(1, Math.round(p.step))) : 1
  const species = p.species === 'Cão' || p.species === 'Gato' ? p.species : null
  const life = p.life && LIFE_KEYS.includes(p.life) ? p.life : null
  const co: ComorbidityState = {
    renal: !!p.co?.renal,
    hepatic: !!p.co?.hepatic,
    septic: !!p.co?.septic,
    cardiac: !!p.co?.cardiac,
    neurological: !!p.co?.neurological,
  }
  return {
    activeTab,
    step,
    species,
    life,
    co,
    chosenDiseaseName: typeof p.chosenDiseaseName === 'string' ? p.chosenDiseaseName : null,
    focusDrug: typeof p.focusDrug === 'string' ? p.focusDrug : null,
    sourcePage: p.sourcePage && VALID_ABV_TABS.includes(p.sourcePage) ? p.sourcePage : null,
    institutionalFocus: p.institutionalFocus ?? null,
  }
}

const INITIAL_ABV = readInitialAbvShell()

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const PatientGuide = lazy(() => import('./pages/PatientGuide'))
const AntibioticsGuide = lazy(() => import('./pages/AntibioticsGuide'))
const PathogenLibraryPage = lazy(() =>
  import('./pages/PathogenLibraryPage').then((m) => ({ default: m.PathogenLibraryPage })),
)
const ReferencesPage = lazy(() =>
  import('./pages/ReferencesPage').then((m) => ({ default: m.ReferencesPage })),
)
const PlaceholderSection = lazy(() => import('./pages/PlaceholderSection'))
const DiseasesBySystemPage = lazy(() => import('./pages/DiseasesBySystemPage'))
const PerioperativePage = lazy(() => import('./pages/PerioperativePage'))

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

function findDiseaseByName(dzDict: DiseaseSystem, diseaseName: string): Disease | null {
  for (const sys of Object.keys(dzDict)) {
    const found = safeList(dzDict[sys]).find((d) => d.name === diseaseName)
    if (found) return found
  }
  return null
}

export function App() {
  const [activeTab, setActiveTab] = useState<AbvTab>(() => INITIAL_ABV.activeTab)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const [legacyDicts, setLegacyDicts] = useState<{ ab: AntibioticClass; dz: DiseaseSystem } | null>(null)
  const [focusDrug, setFocusDrug] = useState<string | null>(() => INITIAL_ABV.focusDrug)
  const [diseasesFocusDiseaseName, setDiseasesFocusDiseaseName] = useState<string | null>(null)
  const [sourcePage, setSourcePage] = useState<AbvTab | null>(() => INITIAL_ABV.sourcePage)
  const [antibioticsSearchSeed, setAntibioticsSearchSeed] = useState<string | undefined>(undefined)
  const [unifiedSearchSeed, setUnifiedSearchSeed] = useState<string | undefined>(undefined)
  const [institutionalFocus, setInstitutionalFocus] = useState<AbvInstitutionalFocus | null>(
    () => INITIAL_ABV.institutionalFocus,
  )

  const [step, setStep] = useState(() => INITIAL_ABV.step)
  const [species, setSpecies] = useState<Species | null>(() => INITIAL_ABV.species)
  const [life, setLife] = useState<LifeStageKey | null>(() => INITIAL_ABV.life)
  const [co, setCo] = useState<ComorbidityState>(() => INITIAL_ABV.co)
  const [chosen, setChosen] = useState<Disease | null>(null)
  const chosenHydratedRef = useRef(false)

  const needsLegacySeeds =
    activeTab === 'syndrome' || activeTab === 'antibiotics' || activeTab === 'diseases' || activeTab === 'perioperative'

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

  /** Reidrata condição escolhida no assistente após carregar catálogo (F5). */
  useEffect(() => {
    if (!legacyDicts || chosenHydratedRef.current) return
    const name = INITIAL_ABV.chosenDiseaseName
    if (name) {
      const found = findDiseaseByName(legacyDicts.dz, name)
      if (found) setChosen(found)
    }
    chosenHydratedRef.current = true
  }, [legacyDicts])

  /** Persiste estado do shell após recarregar a página (mesma aba do navegador). */
  useEffect(() => {
    const id = window.setTimeout(() => {
      const payload: AbvAppPersistV1 = {
        v: 1,
        activeTab,
        step,
        species,
        life,
        co,
        chosenDiseaseName: chosen?.name ?? null,
        focusDrug,
        sourcePage,
        institutionalFocus,
      }
      saveAbvAppPersist(payload)
    }, 250)
    return () => window.clearTimeout(id)
  }, [activeTab, step, species, life, co, chosen, focusDrug, sourcePage, institutionalFocus])

  const consumeAntibioticsSearchSeed = useCallback(() => setAntibioticsSearchSeed(undefined), [])
  const consumeUnifiedSearchSeed = useCallback(() => setUnifiedSearchSeed(undefined), [])

  const onDeepLinkDrug = (drugName: string) => {
    setAntibioticsSearchSeed(undefined)
    setUnifiedSearchSeed(undefined)
    setFocusDrug(drugName)
    setSourcePage(activeTab)
    setActiveTab('antibiotics')
  }

  const onNavigateInstitutional = useCallback((target: AbvInstitutionalFocus) => {
    setInstitutionalFocus(target)
    if (target.kind === 'pathogen' || target.kind === 'resistance') setActiveTab('pathogens')
    else setActiveTab('references')
  }, [])

  const onOpenLegacyDisease = useCallback((diseaseName: string) => {
    if (!legacyDicts) return
    const found = findDiseaseByName(legacyDicts.dz, diseaseName)
    if (!found) return
    setFocusDrug(null)
    setAntibioticsSearchSeed(undefined)
    setUnifiedSearchSeed(undefined)
    setDiseasesFocusDiseaseName(diseaseName)
    setActiveTab('diseases')
  }, [legacyDicts])

  const clearDiseasesFocusDisease = useCallback(() => setDiseasesFocusDiseaseName(null), [])

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
    setChosen(null)
  }

  const onResetPatientFlow = () => {
    clearAllAbvSessionStorage()
    chosenHydratedRef.current = true
    setFocusDrug(null)
    setSourcePage(null)
    resetWizard()
    setActiveTab('home')
  }

  const onHomeSearch = (query: string) => {
    setUnifiedSearchSeed(query)
    setAntibioticsSearchSeed(undefined)
    setFocusDrug(null)
    setSourcePage(null)
    setActiveTab('diseases')
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
            chosen={chosen}
            setChosen={setChosen}
            dzDict={dzDict}
            abDict={abDict}
          />
        )
      }
      case 'diseases': {
        const { ab: abDict, dz: dzDict } = legacyDicts!
        return (
          <DiseasesBySystemPage
            setPage={setActiveTab}
            abDict={abDict}
            dzDict={dzDict}
            unifiedSearchSeed={unifiedSearchSeed}
            onUnifiedSearchSeedConsumed={consumeUnifiedSearchSeed}
            onNavigateInstitutional={onNavigateInstitutional}
            onDeepLinkDrug={onDeepLinkDrug}
            focusDiseaseName={diseasesFocusDiseaseName}
            onClearFocusDisease={clearDiseasesFocusDisease}
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
            sourcePage={sourcePage}
            searchSeed={antibioticsSearchSeed}
            onSearchSeedConsumed={consumeAntibioticsSearchSeed}
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
      case 'references':
        return (
          <ReferencesPage
            setPage={setActiveTab}
            institutionalFocus={institutionalFocus}
            onConsumedInstitutionalFocus={clearInstitutionalFocus}
          />
        )
      case 'perioperative': {
        const { ab: abDict, dz: dzDict } = legacyDicts!
        return <PerioperativePage setPage={setActiveTab} abDict={abDict} dzDict={dzDict} onDeepLinkDrug={onDeepLinkDrug} />
      }
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
