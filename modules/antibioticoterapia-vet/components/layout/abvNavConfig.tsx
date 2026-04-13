import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BookOpen,
  Home,
  Hospital,
  Microscope,
  Pill,
  Scissors,
  Stethoscope,
} from 'lucide-react'
import type { AbvTab } from '../../types'

export const ABV_NAV_ITEMS: { id: AbvTab; label: string; Icon: LucideIcon }[] = [
  { id: 'home', label: 'Início', Icon: Home },
  { id: 'syndrome', label: 'Guia por suspeita clínica', Icon: Stethoscope },
  { id: 'antibiotics', label: 'Guia de antimicrobianos', Icon: Pill },
  { id: 'pathogens', label: 'Microrganismos e resistência', Icon: Microscope },
  { id: 'perioperative', label: 'Perioperatório', Icon: Scissors },
  { id: 'hospital', label: 'Hospital / controle de infecção', Icon: Hospital },
  { id: 'patient-context', label: 'Alertas por paciente', Icon: AlertTriangle },
  { id: 'references', label: 'Referências', Icon: BookOpen },
]
