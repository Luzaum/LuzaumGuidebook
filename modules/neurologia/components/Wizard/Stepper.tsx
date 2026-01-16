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
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1
            const isActive = step === currentStep
            const isCompleted = step < currentStep

            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
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
                      'text-xs mt-1 text-center hidden sm:block',
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
                  <div className="flex-1 mx-2">
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
