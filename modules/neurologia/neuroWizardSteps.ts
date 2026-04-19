import { UserRound, Stethoscope, Brain, ClipboardCheck, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NeuroWizardStepItem = {
  step: number
  label: string
  desc: string
  icon: LucideIcon
}

export const NEURO_WIZARD_STEPS: NeuroWizardStepItem[] = [
  { step: 1, label: 'Paciente', desc: 'Dados básicos', icon: UserRound },
  { step: 2, label: 'Queixa', desc: 'História e contexto', icon: Stethoscope },
  { step: 3, label: 'Exame', desc: 'Exame neurológico', icon: Brain },
  { step: 4, label: 'Revisão', desc: 'Resumo dos achados', icon: ClipboardCheck },
  { step: 5, label: 'Análise IA', desc: 'Relatório final', icon: Sparkles },
]
