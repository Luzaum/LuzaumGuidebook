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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="container max-w-3xl mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentStep === 1}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="min-w-[90px] px-2 sm:px-4 sm:min-w-[120px] text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Voltar</span>
          <span className="sm:hidden">Voltar</span>
        </Button>

        <div className="text-xs sm:text-sm text-white/60 text-center flex-1">
          Passo {currentStep} de {totalSteps}
        </div>

        <Button
          variant="primary"
          onClick={onNext}
          disabled={isNextDisabled || currentStep === totalSteps}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="min-w-[100px] px-2 sm:px-4 sm:min-w-[140px] text-xs sm:text-sm"
        >
          <span className="truncate">{nextLabel}</span>
        </Button>
      </div>
    </div>
  )
}
