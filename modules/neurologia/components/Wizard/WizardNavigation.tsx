import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../UI/Button'

interface WizardNavigationProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  isNextDisabled?: boolean
  nextLabel?: string
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled = false,
  nextLabel = 'Continuar',
}: WizardNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <div className="w-full lg:pl-80">
      <div className="flex w-full flex-wrap items-center justify-center gap-2 px-3 py-3 sm:justify-between sm:px-4 lg:px-8 lg:py-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={currentStep === 1}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="min-w-0 flex-1 sm:min-w-[120px] sm:flex-initial"
        >
          Voltar
        </Button>

        <div className="w-full text-center text-xs text-white/60 max-sm:order-first sm:order-none sm:w-auto sm:text-sm">
          Passo {currentStep} de {totalSteps}
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={onNext}
          disabled={isNextDisabled || currentStep === totalSteps}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="min-w-0 flex-1 sm:min-w-[140px] sm:flex-initial"
        >
          {nextLabel}
        </Button>
      </div>
      </div>
    </div>
  )
}

