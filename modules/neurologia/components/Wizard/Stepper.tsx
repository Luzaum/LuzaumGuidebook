import React from 'react'
import { cn } from '../../../../lib/utils'

interface StepperProps {
  currentStep: number
  totalSteps: number
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between sm:justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-0 pb-1 sm:pb-0">
          {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1
            const isActive = step === currentStep
            const isCompleted = step < currentStep

            return (
              <div key={step} className="flex items-center flex-1 min-w-fit sm:min-w-0">
                <div className="flex flex-col items-center relative group">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all shrink-0',
                      isActive
                        ? 'bg-gold text-neutral-deep scale-110'
                        : isCompleted
                          ? 'bg-gold/30 text-gold'
                          : 'bg-white/10 text-white/40',
                    )}
                  >
                    {step}
                  </div>
                  <span
                    className={cn(
                      'text-xs mt-1 text-center absolute top-full left-1/2 -translate-x-1/2 w-max',
                      'hidden sm:block', // Hide on mobile, show on desktop
                      isActive
                        ? 'text-gold font-medium'
                        : 'text-white/40',
                    )}
                  >
                    {step === 1 && 'Paciente'}
                    {step === 2 && 'Queixa'}
                    {step === 3 && 'Exame'}
                    {step === 4 && 'Revisão'}
                    {step === 5 && 'Análise'}
                  </span>
                </div>
                {step < totalSteps && (
                  <div className="flex-1 mx-2 sm:mx-4 min-w-[30px] sm:min-w-0">
                    <div
                      className={cn(
                        'h-0.5 rounded-full transition-all',
                        isCompleted ? 'bg-gold/50' : 'bg-white/10',
                      )}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
