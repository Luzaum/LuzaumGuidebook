import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Step1PatientInfo } from '../../neurologia/components/Steps/Step1PatientInfo'
import { Step2ChiefComplaint } from '../../neurologia/components/Steps/Step2ChiefComplaint'
import { Step3NeuroExam } from '../../neurologia/components/Steps/Step3NeuroExam'
import { Step4Review } from '../../neurologia/components/Steps/Step4Review'
import { Step5Analysis } from '../../neurologia/components/Steps/Step5Analysis'
import { Modal } from '../../neurologia/components/UI/Modal'
import { Button } from '../../neurologia/components/UI/Button'
import { useCaseStore } from '../../neurologia/stores/caseStore'
import { NeuroMobileWizardNav } from '../../neurologia/components/NeuroMobileWizardNav'
import { NEURO_WIZARD_STEPS } from '../../neurologia/neuroWizardSteps'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'

export function NeuroMobileFullExamFlow() {
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

  return (
    <>
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Confirmar reinício do exame"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-white/90 text-sm">
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

      <div className="relative w-full space-y-4">
        {/* Reset Toolbar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <span className="text-xs text-muted-foreground">
            Exame estruturado veterinário
          </span>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1 text-[10px] font-bold text-red-400 border border-red-500/20 bg-red-500/5 px-2.5 py-1 rounded-lg active:bg-red-500/10 transition-all"
          >
            <RefreshCw className="h-3 w-3" />
            Novo Exame
          </button>
        </div>

        {/* Wizard Steps Navigation Header */}
        <div className="relative z-20">
          <NeuroMobileWizardNav
            steps={NEURO_WIZARD_STEPS}
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
          />
        </div>

        {/* Active Step Content */}
        <div className="relative z-10 w-full min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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
        </div>

        {/* Custom Mobile Inline Navigation Controls */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4 mt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex-1 nm-btn nm-btn-secondary text-xs h-10 gap-1.5 disabled:opacity-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar
            </button>
            <span className="text-[10px] font-bold text-muted-foreground w-12 text-center">
              Etapa {currentStep}/5
            </span>
            <button
              type="button"
              onClick={nextStep}
              className="flex-grow-[1.5] nm-btn nm-btn-primary text-xs h-10 gap-1.5"
            >
              {currentStep === 4 ? 'Análise IA' : 'Continuar'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
