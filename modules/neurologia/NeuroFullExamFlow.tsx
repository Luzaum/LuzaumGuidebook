import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WizardNavigation } from './components/Wizard/WizardNavigation'
import { Step1PatientInfo } from './components/Steps/Step1PatientInfo'
import { Step2ChiefComplaint } from './components/Steps/Step2ChiefComplaint'
import { Step3NeuroExam } from './components/Steps/Step3NeuroExam'
import { Step4Review } from './components/Steps/Step4Review'
import { Step5Analysis } from './components/Steps/Step5Analysis'
import { Modal } from './components/UI/Modal'
import { Button } from './components/UI/Button'
import { useCaseStore } from './stores/caseStore'
import { NeuroMobileWizardNav } from './components/NeuroMobileWizardNav'
import { NEURO_WIZARD_STEPS } from './neuroWizardSteps'

export function NeuroFullExamFlow() {
  const [showResetModal, setShowResetModal] = useState(false)
  const currentStep = useCaseStore((s) => s.currentStep)
  const patient = useCaseStore((s) => s.patient)
  const complaint = useCaseStore((s) => s.complaint)
  const neuroExam = useCaseStore((s) => s.neuroExam)
  const setCurrentStep = useCaseStore((s) => s.setCurrentStep)
  const setPatient = useCaseStore((s) => s.setPatient)
  const setComplaint = useCaseStore((s) => s.setComplaint)
  const setNeuroExam = useCaseStore((s) => s.setNeuroExam)
  const resetCase = useCaseStore((s) => s.resetCase)

  const confirmReset = () => {
    resetCase()
    setShowResetModal(false)
  }

  const nextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, 5))
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1))
    window.scrollTo(0, 0)
  }

  const isNextDisabled = () => false

  return (
    <>
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Confirmar reinício do exame"
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

      <div className="relative w-full">
        <div className="mb-3 flex items-center justify-end gap-2">
          <Button variant="secondary" type="button" onClick={() => setShowResetModal(true)}>
            Novo exame
          </Button>
        </div>

        <main className="relative z-10 w-full px-0 pb-32 pt-0 lg:pb-32 pointer-events-auto">
          <NeuroMobileWizardNav
            steps={NEURO_WIZARD_STEPS}
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <Step1PatientInfo patient={patient} setPatient={setPatient} />}
              {currentStep === 2 && <Step2ChiefComplaint complaint={complaint} setComplaint={setComplaint} />}
              {currentStep === 3 && <Step3NeuroExam exam={neuroExam} updateExam={setNeuroExam} />}
              {currentStep === 4 && (
                <Step4Review
                  patient={patient}
                  complaint={complaint}
                  exam={neuroExam}
                  onEditStep={(step) => setCurrentStep(step)}
                />
              )}
              {currentStep === 5 && <Step5Analysis />}
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
            nextLabel={currentStep === 4 ? 'Ir para Análise IA' : 'Continuar'}
          />
        )}
      </div>
    </>
  )
}
