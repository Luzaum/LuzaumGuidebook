import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './components/Layout/Header'
import { Stepper } from './components/Wizard/Stepper'
import { WizardNavigation } from './components/Wizard/WizardNavigation'
import { Step1PatientInfo } from './components/Steps/Step1PatientInfo'
import { Step2ChiefComplaint } from './components/Steps/Step2ChiefComplaint'
import { Step3NeuroExam } from './components/Steps/Step3NeuroExam'
import { Step4Review } from './components/Steps/Step4Review'
import { Step5Analysis } from './components/Steps/Step5Analysis'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useDarkMode } from './hooks/useDarkMode'
import { AppState, PatientProfile, AnalysisResult } from './types'
import { analyzeNeuroExam } from './lib/neuroEngine'
import { getDiagnosticPlan } from './lib/diagnosticPlanner'
import { ETIOLOGIES } from './lib/etiologyLibrary'

const INITIAL_STATE: AppState = {
  currentStep: 1,
  patient: {
    species: null,
    age: {
      years: 0,
      months: 0,
    },
    sex: null,
    physiologicState: [],
    weight: 0,
    comorbidities: [],
    medications: [],
    temporalPattern: null,
    course: null,
    redFlags: [],
  },
  chiefComplaints: [],
  exam: {
    findings: {},
    timestamp: new Date().toISOString(),
  },
  analysis: null,
  theme: 'dark',
}

export function NeurologiaApp() {
  const [state, setState] = useLocalStorage<AppState>(
    'vetneuro-app-state',
    INITIAL_STATE,
  )

  useDarkMode() // inicializa o hook de tema

  const handleReset = () => {
    if (
      confirm(
        'Deseja iniciar um novo exame? Todos os dados atuais serão perdidos.',
      )
    ) {
      setState(INITIAL_STATE)
    }
  }

  const nextStep = () => {
    if (state.currentStep === 4) {
      runAnalysis()
    }
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 5),
    }))
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }))
    window.scrollTo(0, 0)
  }

  const updatePatient = (data: Partial<PatientProfile>) => {
    setState((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        ...data,
      },
    }))
  }

  const toggleComplaint = (complaint: string) => {
    setState((prev) => {
      const current = prev.chiefComplaints
      const newComplaints = current.includes(complaint)
        ? current.filter((c) => c !== complaint)
        : [...current, complaint]
      return {
        ...prev,
        chiefComplaints: newComplaints,
      }
    })
  }

  const updateExam = (key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      exam: {
        ...prev.exam,
        findings: {
          ...prev.exam.findings,
          [key]: value,
        },
      },
    }))
  }

  const runAnalysis = () => {
    const localization = analyzeNeuroExam(state.exam, state.patient)
    const diagnostics = getDiagnosticPlan(localization, state.patient)
    const etiologies = ETIOLOGIES.slice(0, 5)
    const result: AnalysisResult = {
      localization,
      etiologies,
      diagnostics,
      alerts: state.patient.redFlags,
    }
    setState((prev) => ({
      ...prev,
      analysis: result,
    }))
  }

  const isNextDisabled = () => {
    if (state.currentStep === 1) {
      return !state.patient.species || !state.patient.temporalPattern
    }
    if (state.currentStep === 2) {
      return state.chiefComplaints.length === 0
    }
    return false
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold/30">
      <Header onReset={handleReset} />

      {state.currentStep < 5 && (
        <Stepper currentStep={state.currentStep} totalSteps={5} />
      )}

      <main className="container max-w-3xl mx-auto px-4 pt-32 pb-32 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {state.currentStep === 1 && (
              <Step1PatientInfo
                data={state.patient}
                updateData={updatePatient}
              />
            )}
            {state.currentStep === 2 && (
              <Step2ChiefComplaint
                selectedComplaints={state.chiefComplaints}
                toggleComplaint={toggleComplaint}
              />
            )}
            {state.currentStep === 3 && (
              <Step3NeuroExam exam={state.exam} updateExam={updateExam} />
            )}
            {state.currentStep === 4 && (
              <Step4Review
                state={state}
                onEditStep={(step) =>
                  setState((prev) => ({
                    ...prev,
                    currentStep: step,
                  }))
                }
              />
            )}
            {state.currentStep === 5 && (
              <Step5Analysis result={state.analysis} onRestart={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {state.currentStep < 5 && (
        <WizardNavigation
          currentStep={state.currentStep}
          totalSteps={5}
          onBack={prevStep}
          onNext={nextStep}
          isNextDisabled={isNextDisabled()}
          nextLabel={state.currentStep === 4 ? 'Analisar com IA' : 'Continuar'}
        />
      )}
    </div>
  )
}
