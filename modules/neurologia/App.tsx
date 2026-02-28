import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, BrainCircuit, Activity } from 'lucide-react'
import { Header } from './components/Layout/Header'
import { SideNav } from './components/Layout/SideNav'
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
import { buildPatientSummary, buildHistorySummary, buildExamSummary } from './lib/analysis/report'
import { generateGeminiAnalysis } from './lib/analysis/geminiApi'
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

  // -- Gestão do Botão Voltar Nativo (Mobile) -- //
  useEffect(() => {
    // Quando o componente monta, garante que temos um estado inicial no history
    window.history.replaceState({ step: currentStep }, '')

    const handlePopState = (event: PopStateEvent) => {
      // Se o usuário clicar no botão voltar físico do celular,
      // nós interceptamos e voltamos um passo no wizard ao invés de fechar a página
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1)
        // Re-push o estado atual para que o usuário precise apertar voltar várias vezes até sair de fato
        window.history.pushState({ step: currentStep - 1 }, '')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentStep, setCurrentStep])

  const handleReset = () => {
    setShowResetModal(true)
  }

  const confirmReset = () => {
    resetCase()
    setShowResetModal(false)
  }

  const goHome = () => {
    setCurrentStep(1)
    window.history.pushState({ step: 1 }, '')
    window.scrollTo(0, 0)
  }

  const handleStepJump = (targetStep: number) => {
    // Não permite pular para passos futuros se o atual estiver bloqueado
    if (targetStep > currentStep && isNextDisabled()) return

    // Se for validar a IA, tem que passar pelo Next normal
    if (targetStep === 5 && currentStep < 4) return
    if (targetStep === 5 && currentStep === 4) {
      runAnalysis()
      return
    }

    setCurrentStep(targetStep)
    window.history.pushState({ step: targetStep }, '')
    window.scrollTo(0, 0)
  }

  const nextStep = () => {
    if (currentStep === 4) {
      runAnalysis()
    } else {
      const next = Math.min(currentStep + 1, 5)
      setCurrentStep(next)
      window.history.pushState({ step: next }, '')
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    const prev = Math.max(currentStep - 1, 1)
    setCurrentStep(prev)
    window.history.pushState({ step: prev }, '')
    window.scrollTo(0, 0)
  }

  const runAnalysis = async () => {
    // Feedback visual avançado
    setAnalysis({ status: 'running' })
    setCurrentStep(5)
    window.history.pushState({ step: 5 }, '')
    window.scrollTo(0, 0)

    try {
      const caseState = { patient, complaint, neuroExam }
      const patientSummary = buildPatientSummary(caseState)
      const historySummary = buildHistorySummary(caseState)
      const examSummary = buildExamSummary(caseState)

      const report = await generateGeminiAnalysis(
        patientSummary,
        historySummary,
        examSummary,
        caseState
      )

      if (report && report.neuroLocalization && report.differentials) {
        setAnalysis({ status: 'done', report })
      } else {
        setAnalysis({ status: 'insufficient_data', report })
      }
    } catch (error) {
      console.error("Failed AI generate", error)
      setAnalysis({ status: 'insufficient_data' })
      alert("Ocorreu um erro ao conectar com a IA. Tente novamente.")
    }
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
          <SideNav
            currentStep={currentStep}
            totalSteps={5}
            onChangeStep={handleStepJump}
          />
        )}

        <div className={`flex ${currentStep < 5 ? 'md:pl-64' : ''}`}>
          <main className="container max-w-4xl mx-auto px-2 sm:px-6 pt-24 pb-40 md:pb-32 relative z-10 pointer-events-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                  <Step5Analysis onRetryAnalysis={runAnalysis} />
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
      </div>
    </>
  )
}
