import React from 'react'
import { motion } from 'framer-motion'
import { User, ClipboardList, Stethoscope, Search, BrainCircuit } from 'lucide-react'
import { cn } from '../../../../lib/utils'

interface SideNavProps {
    currentStep: number
    totalSteps: number
    onChangeStep: (step: number) => void
}

const steps = [
    { id: 1, label: 'Paciente', icon: User },
    { id: 2, label: 'Queixa', icon: ClipboardList },
    { id: 3, label: 'Exame', icon: Stethoscope },
    { id: 4, label: 'Revisão', icon: Search },
    { id: 5, label: 'Análise', icon: BrainCircuit },
]

export function SideNav({ currentStep, totalSteps, onChangeStep }: SideNavProps) {
    return (
        <>
            {/* Desktop Sidebar (Left) */}
            <nav className="hidden md:flex flex-col w-64 fixed left-0 top-[144px] bottom-0 bg-muted/30 backdrop-blur-xl border-r border-border/40 z-30 p-4">
                <div className="space-y-2 mt-4">
                    {steps.map((step) => {
                        const isActive = step.id === currentStep
                        const isCompleted = step.id < currentStep
                        const Icon = step.icon

                        return (
                            <button
                                key={step.id}
                                onClick={() => onChangeStep(step.id)}
                                className={cn(
                                    'w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300',
                                    isActive
                                        ? 'bg-gold text-neutral-deep shadow-[0_4px_12px_rgba(245,197,66,0.3)] font-semibold'
                                        : isCompleted
                                            ? 'text-foreground hover:bg-foreground/10'
                                            : 'text-muted-foreground hover:bg-foreground/5'
                                )}
                            >
                                <div className={cn(
                                    'p-2 rounded-lg transition-colors',
                                    isActive ? 'bg-neutral-deep/10 text-neutral-deep' : isCompleted ? 'bg-gold/20 text-gold' : 'bg-muted text-muted-foreground'
                                )}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-sm">{step.label}</span>
                                {isCompleted && !isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-auto w-2 h-2 rounded-full bg-gold"
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            </nav>

            {/* Mobile Bottom Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border/40 z-50 pb-safe">
                <div className="flex items-center justify-around px-2 py-3">
                    {steps.map((step) => {
                        const isActive = step.id === currentStep
                        const isCompleted = step.id < currentStep
                        const Icon = step.icon

                        return (
                            <button
                                key={step.id}
                                onClick={() => onChangeStep(step.id)}
                                className="flex flex-col items-center gap-1 min-w-[60px]"
                            >
                                <div className={cn(
                                    'p-2 rounded-full transition-all duration-300',
                                    isActive
                                        ? 'bg-gold text-neutral-deep shadow-[0_4px_12px_rgba(245,197,66,0.4)] scale-110'
                                        : isCompleted
                                            ? 'bg-gold/20 text-gold'
                                            : 'bg-transparent text-muted-foreground'
                                )}>
                                    <Icon size={isActive ? 20 : 18} />
                                </div>
                                <span className={cn(
                                    'text-[10px] font-medium transition-colors',
                                    isActive ? 'text-gold' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                )}>
                                    {step.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </nav>
        </>
    )
}
