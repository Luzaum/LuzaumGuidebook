import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './components/Layout/Header'
import { Stepper } from './components/Wizard/Stepper'
import { WizardNavigation } from './components/Wizard/WizardNavigation'
import { Step1PatientInfo } from './components/Steps/Step1PatientInfo'
import { Step2ChiefComplaint } from './components/Steps/Step2ChiefComplaint'
import { Step3NeuroExam } from './components/Steps/Step3NeuroExam'
import { Step4Review } from './components/Steps/Step4Review'
import { Step5Analysis } from './components/Steps/Step5Analysis'
import { ThemeSync } from './components/ThemeSync'
import { Modal } from './components/UI/Modal'
import { Button } from './components/UI/Button'
import { useCaseStore } from './stores/caseStore'
import { useUiStore } from './stores/uiStore'
import { analyzeNeuroExam } from './lib/neuroEngine'
import { getDiagnosticPlan } from './lib/diagnosticPlanner'
import { ETIOLOGIES } from './lib/etiologyLibrary'
import type { AnalysisResult, PatientProfile as LegacyPatientProfile } from './types'

export function NeurologiaApp() {
  const [showResetModal, setShowResetModal] = useState(false)
  const currentStep = useCaseStore((s) => s.currentStep)
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)
  const analysis = useCaseStore((s) => s.analysis)
  const setCurrentStep = useCaseStore((s) => s.setCurrentStep)
  const setPatient = useCaseStore((s) => s.setPatient)
  const setComplaint = useCaseStore((s) => s.setComplaint)
  const setNeuroExam = useCaseStore((s) => s.setNeuroExam)
  const setAnalysis = useCaseStore((s) => s.setAnalysis)
  const resetCase = useCaseStore((s) => s.resetCase)

  const handleReset = () => {
    setShowResetModal(true)
  }

  const confirmReset = () => {
    resetCase()
    setShowResetModal(false)
  }

  const goHome = () => {
    setCurrentStep(1)
    window.scrollTo(0, 0)
  }

  const nextStep = () => {
    if (currentStep === 4) {
      runAnalysis()
    }
    setCurrentStep(Math.min(currentStep + 1, 5))
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1))
    window.scrollTo(0, 0)
  }

  const runAnalysis = () => {
    // Converter patient do caseStore para formato legado temporariamente
    const legacyPatient: LegacyPatientProfile = {
      species: (patient.species === 'dog' ? 'Dog' : 'Cat') as any,
      age: {
        years: patient.ageYears || 0,
        months: patient.ageMonths || 0,
      },
      sex: (patient.sex === 'male' ? 'M' : 'F') as any,
      physiologicState: [
        ...(patient.reproStatus === 'neutered' ? ['Castrado'] : []),
        ...(patient.reproStatus === 'intact' ? ['Inteiro'] : []),
        ...(patient.pregnant ? ['Gestante'] : []),
        ...(patient.lactating ? ['Lactante'] : []),
        ...(patient.lifeStage === 'pediatric' ? ['Pediátrico'] : []),
        ...(patient.lifeStage === 'geriatric' ? ['Geriátrico'] : []),
      ] as any[],
      weight: patient.weightKg || 0,
      comorbidities: patient.comorbidities.map(c => c.label),
      medications: [],
      temporalPattern: complaint.temporalPattern as any,
      course: complaint.evolutionPattern as any,
      redFlags: complaint.redFlags,
    }

    const legacyExam = {
      findings: neuroExam,
      timestamp: new Date().toISOString(),
    }

    const localization = analyzeNeuroExam(legacyExam, legacyPatient)
    const diagnostics = getDiagnosticPlan(localization, legacyPatient)
    const etiologies = ETIOLOGIES.slice(0, 5)
    const result: AnalysisResult = {
      localization,
      etiologies,
      diagnostics,
      alerts: complaint.redFlags,
    }
    setAnalysis({ status: 'done', report: result })
  }

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !patient.species
    }
    if (currentStep === 2) {
      return complaint.chiefComplaintIds.length === 0 || !complaint.temporalPattern
    }
    return false
  }

  return (
    <>
      <ThemeSync />
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Confirmar Reinício do Exame"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-white/90">
            Deseja iniciar um novo exame? Todos os dados atuais serão perdidos.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowResetModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmReset}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
      <div className="min-h-[100dvh] bg-background text-foreground font-sans selection:bg-gold/30">
        <Header
          onReset={handleReset}
          onGoHome={goHome}
          onBack={prevStep}
          showBack={currentStep > 1}
        />

        {currentStep < 5 && (
          <Stepper currentStep={currentStep} totalSteps={5} />
        )}

        <main className="container max-w-3xl mx-auto px-2 sm:px-4 pt-28 pb-32 relative z-10 pointer-events-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
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
              {currentStep === 1 && (
                <Step1PatientInfo
                  patient={patient}
                  setPatient={setPatient}
                />
              )}
              {currentStep === 2 && (
                <Step2ChiefComplaint
                  complaint={complaint}
                  setComplaint={setComplaint}
                />
              )}
              {currentStep === 3 && (
                <Step3NeuroExam exam={neuroExam} updateExam={setNeuroExam} />
              )}
              {currentStep === 4 && (
                <Step4Review
                  patient={patient}
                  complaint={complaint}
                  exam={neuroExam}
                  onEditStep={(step) => setCurrentStep(step)}
                />
              )}
              {currentStep === 5 && (
                <Step5Analysis />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {currentStep < 5 && (
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={5}
            onBack={prevStep}
            onNext={nextStep}
            isNextDisabled={isNextDisabled()}
            nextLabel={currentStep === 4 ? 'Analisar com IA' : 'Continuar'}
          />
        )}
      </div>
    </>
  )
}
