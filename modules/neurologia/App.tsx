import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserRound, Stethoscope, Brain, ClipboardCheck, Sparkles } from 'lucide-react'
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
import { NeuroMobileWizardNav, type NeuroWizardStepItem } from './components/NeuroMobileWizardNav'

const NEURO_WIZARD_STEPS: NeuroWizardStepItem[] = [
  { step: 1, label: 'Paciente', desc: 'Dados básicos', icon: UserRound },
  { step: 2, label: 'Queixa', desc: 'História e contexto', icon: Stethoscope },
  { step: 3, label: 'Exame', desc: 'Exame neurológico', icon: Brain },
  { step: 4, label: 'Revisão', desc: 'Resumo dos achados', icon: ClipboardCheck },
  { step: 5, label: 'Análise IA', desc: 'Relatório final', icon: Sparkles },
]

export function NeurologiaApp() {
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

  const handleReset = () => {
    setShowResetModal(true)
  }

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
      <ThemeSync />
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

      <div className="min-h-[100dvh] bg-background text-foreground font-sans selection:bg-gold/30">
        <aside className="hidden lg:block fixed top-12 left-0 bottom-0 w-80 border-r border-border/70 bg-card/70 backdrop-blur-xl z-30">
          <div className="p-5 border-b border-border/70">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full flex flex-col items-center gap-2 rounded-2xl p-3 hover:bg-background/60 transition"
              aria-label="Voltar para o início da Neurologia"
            >
              <img
                src="/apps/NEURO.png"
                alt="NeuroVet"
                className="h-[84px] w-[84px] object-contain drop-shadow-[0_0_12px_rgba(245,197,66,0.35)]"
              />
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">NeuroVet</p>
                <p className="text-xs text-muted-foreground">Neurologia</p>
              </div>
            </button>
          </div>

          <nav className="p-5 space-y-2">
            <div className="rounded-xl border border-border bg-background/50 px-3 py-2 mb-2">
              <p className="text-xs font-semibold text-foreground">Barra de navegação</p>
            </div>
            {NEURO_WIZARD_STEPS.map((item) => {
              const isActive = item.step === currentStep
              const isDone = item.step < currentStep
              const Icon = item.icon
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setCurrentStep(item.step)}
                  aria-label={`Ir para etapa ${item.step}: ${item.label}`}
                  className={`group w-full text-left rounded-2xl border px-3 py-3 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border-gold/60 bg-gold/15 shadow-[0_8px_30px_rgba(245,197,66,0.15)]'
                      : isDone
                        ? 'border-emerald-400/30 bg-emerald-400/10 hover:border-emerald-400/50'
                        : 'border-border bg-background/60 hover:border-gold/40 hover:bg-card hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-2 ${isActive ? 'bg-gold/25 text-gold' : isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Etapa {item.step}: {item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </nav>
        </aside>

        <div className="w-full lg:pl-80">
          <main className="relative z-10 w-full px-4 pb-32 pt-6 lg:px-8 lg:pt-12 pointer-events-auto">
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
        </div>

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
