import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  CircleUserRound,
  Pill,
  Calculator,
  FileText,
  ChevronRight,
  Stethoscope,
} from 'lucide-react'
import PatientBlock from '../components/PatientBlock'
import DrugSelector from '../components/DrugSelector'
import InfusionCalculator from '../components/InfusionCalculator'
import { Comorbidity, PhysiologyState, Species } from '../types/patient'
import { Drug, drugs } from '../data/drugs'

const CRIVET_STORAGE_KEY = 'crivet:calculator-state:v1'
const SPECIES_VALUES: Species[] = ['dog', 'cat']
const PHYSIOLOGY_VALUES: PhysiologyState[] = ['Neonato', 'Filhote', 'Adulto', 'Idoso']
const COMORBIDITY_VALUES: Comorbidity[] = ['Cardiopata', 'Endocrinopata', 'Hepatopata', 'Renopata']

type PersistedCrivetState = {
  species: Species
  weight: string
  physiology: PhysiologyState
  comorbidities: Comorbidity[]
  selectedDrugId: string
}

type NavSection = {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_SECTIONS: NavSection[] = [
  { id: 'crivet-step-1', title: 'Paciente', icon: CircleUserRound },
  { id: 'crivet-step-2', title: 'Seleção de fármaco', icon: Pill },
  { id: 'crivet-step-3', title: 'Cálculo de infusão', icon: Calculator },
  { id: 'crivet-step-4', title: 'Explicação do cálculo', icon: FileText },
]

export default function CrivetPage() {
  const [species, setSpecies] = useState<Species>('dog')
  const [weight, setWeight] = useState('')
  const [physiology, setPhysiology] = useState<PhysiologyState>('Adulto')
  const [comorbidities, setComorbidities] = useState<Comorbidity[]>([])
  const [selectedDrugId, setSelectedDrugId] = useState<string>('lidocaina')
  const [activeSection, setActiveSection] = useState<string>('crivet-step-1')

  const selectedDrug = useMemo<Drug | null>(() => drugs.find((drug) => drug.id === selectedDrugId) || null, [selectedDrugId])

  const handleComorbidityToggle = useCallback(
    (value: Comorbidity) => {
      setComorbidities((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
    },
    [],
  )

  const handleDrugSelect = useCallback((drug: Drug) => setSelectedDrugId(drug.id), [])
  const hasValidWeight = Number(weight) > 0

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }, [])

  const handleLogoClick = useCallback(() => {
    scrollToSection('crivet-step-1')
  }, [scrollToSection])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CRIVET_STORAGE_KEY)
      if (!raw) return

      const parsed = JSON.parse(raw) as Partial<PersistedCrivetState>

      if (parsed.species && SPECIES_VALUES.includes(parsed.species)) {
        setSpecies(parsed.species)
      }

      if (typeof parsed.weight === 'string') {
        setWeight(parsed.weight)
      }

      if (parsed.physiology && PHYSIOLOGY_VALUES.includes(parsed.physiology)) {
        setPhysiology(parsed.physiology)
      }

      if (Array.isArray(parsed.comorbidities)) {
        const validComorbidities = parsed.comorbidities.filter((item): item is Comorbidity =>
          COMORBIDITY_VALUES.includes(item as Comorbidity),
        )
        setComorbidities(validComorbidities)
      }

      if (typeof parsed.selectedDrugId === 'string' && drugs.some((drug) => drug.id === parsed.selectedDrugId)) {
        setSelectedDrugId(parsed.selectedDrugId)
      }
    } catch {
      localStorage.removeItem(CRIVET_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const stateToPersist: PersistedCrivetState = {
      species,
      weight,
      physiology,
      comorbidities,
      selectedDrugId,
    }

    localStorage.setItem(CRIVET_STORAGE_KEY, JSON.stringify(stateToPersist))
  }, [species, weight, physiology, comorbidities, selectedDrugId])

  useEffect(() => {
    const updateActiveSection = () => {
      let candidate = NAV_SECTIONS[0].id
      for (const section of NAV_SECTIONS) {
        const node = document.getElementById(section.id)
        if (!node) continue
        const rect = node.getBoundingClientRect()
        if (rect.top <= 140) candidate = section.id
      }
      setActiveSection(candidate)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  return (
    <div className="crivet-page-root min-h-screen">
      <div className="crivet-ambient-bg" aria-hidden="true">
        <div className="crivet-ambient-orb crivet-ambient-orb-1" />
        <div className="crivet-ambient-orb crivet-ambient-orb-2" />
        <div className="crivet-ambient-orb crivet-ambient-orb-3" />
      </div>

      <div className="crivet-app-shell">
        <aside className="crivet-sidebar-nav" aria-label="Navegação do CRIVET">
          <button type="button" className="crivet-sidebar-logo" onClick={handleLogoClick} aria-label="Voltar ao início">
            <img src="/apps/CRIVET.png" alt="CRI VET" className="crivet-sidebar-logo-img" />
            <span className="crivet-sidebar-logo-text">CRI VET</span>
          </button>

          <nav className="crivet-sidebar-links">
            {NAV_SECTIONS.map((section, index) => {
              const Icon = section.icon
              const isActive = activeSection === section.id

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`crivet-sidebar-link ${isActive ? 'crivet-sidebar-link--active' : ''}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="crivet-sidebar-link-index">{index + 1}</span>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="crivet-sidebar-link-label">{section.title}</span>
                  <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                </button>
              )
            })}
          </nav>
        </aside>

        <main className="crivet-main-content">
          <header className="crivet-header">
            <div className="crivet-header-badge">
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
              CriVET
            </div>
            <h1 className="crivet-header-title">Calculadora de Infusão Veterinária</h1>
            <p className="crivet-header-subtitle">Interface clínica otimizada para cálculo de CRI com navegação guiada</p>
          </header>

          <section id="crivet-step-1" className="crivet-scroll-section">
            <PatientBlock
              species={species}
              physiology={physiology}
              comorbidities={comorbidities}
              weight={weight}
              onSpeciesChange={setSpecies}
              onPhysiologyChange={setPhysiology}
              onComorbidityToggle={handleComorbidityToggle}
              onWeightChange={setWeight}
            />
          </section>

          <section id="crivet-step-2" className="crivet-scroll-section">
            <DrugSelector selectedDrug={selectedDrug} onSelectDrug={handleDrugSelect} />
          </section>

          <section id="crivet-step-3" className="crivet-scroll-section">
            {!hasValidWeight && (
              <div className="crivet-required-weight-alert" role="alert" aria-live="assertive">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="crivet-required-weight-alert-title">Peso obrigatório para calcular a infusão</p>
                  <p className="crivet-required-weight-alert-text">
                    Você pode selecionar o fármaco e configurar preparo, mas o cálculo final só é liberado após informar o peso do paciente.
                  </p>
                </div>
              </div>
            )}

            <InfusionCalculator
              patientWeight={weight}
              selectedDrug={selectedDrug}
              species={species}
              physiology={physiology}
              comorbidities={comorbidities}
            />
          </section>

          <section id="crivet-step-4" className="crivet-scroll-section">
            <article className="crivet-card crivet-explain-card">
              <div className="crivet-card-header">
                <div className="crivet-step-badge">4</div>
                <h2 className="crivet-card-title">Explicação do cálculo</h2>
              </div>

              <div className="crivet-explain-grid">
                <div className="crivet-explain-item">
                  <h3>1. Defina a dose-alvo</h3>
                  <p>Escolha unidade e dose conforme a indicação clínica do fármaco selecionado.</p>
                </div>
                <div className="crivet-explain-item">
                  <h3>2. Configure concentração</h3>
                  <p>Use concentração comercial ou personalizada para refletir o frasco disponível.</p>
                </div>
                <div className="crivet-explain-item">
                  <h3>3. Configure o preparo</h3>
                  <p>Defina seringa/bolsa, volume, taxa da bomba e tipo de fluido para o protocolo da sua rotina.</p>
                </div>
                <div className="crivet-explain-item">
                  <h3>4. Valide o passo a passo</h3>
                  <p>No resultado, abra “Cálculo explicado” para auditar cada etapa e copiar as instruções.</p>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}
