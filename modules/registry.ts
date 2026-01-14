import {
  Calculator,
  Heart,
  Droplets,
  Zap,
  Cat,
  TestTube,
  Syringe,
  Scissors,
  Pill,
  Brain,
  AlertTriangle,
  Worm,
  LucideIcon,
} from 'lucide-react'

export type ModuleStatus = 'internal' | 'iframe' | 'planned'

export interface Module {
  id: string
  title: string
  description: string
  route: string
  status: ModuleStatus
  icon: LucideIcon
  iframeUrl?: string
}

export const modules: Module[] = [
  {
    id: 'calculadora-energetica',
    title: 'Calculadora Energética',
    description: 'Cálculo de necessidades energéticas para cães e gatos',
    route: '/calculadora-energetica',
    status: 'internal',
    icon: Calculator,
  },
  {
    id: 'fluidoterapia',
    title: 'Fluidoterapia',
    description: 'Cálculo de fluidoterapia com protocolos específicos',
    route: '/fluidoterapia',
    status: 'internal',
    icon: Droplets,
  },
  {
    id: 'transfusao-sanguinea',
    title: 'Transfusão Sanguínea',
    description: 'Cálculo de transfusão sanguínea e compatibilidade',
    route: '/transfusao-sanguinea',
    status: 'internal',
    icon: Heart,
  },
  {
    id: 'hemogasometria',
    title: 'Hemogasometria',
    description: 'Interpretação de hemogasometria arterial e venosa',
    route: '/hemogasometria',
    status: 'internal',
    icon: TestTube,
  },
  {
    id: 'escalas-dor',
    title: 'Escalas de Dor',
    description: 'Escalas de dor e protocolos de analgesia',
    route: '/dor',
    status: 'iframe',
    icon: Cat,
    iframeUrl: 'https://analgesiavet.netlify.app',
  },
  {
    id: 'emergencias-veterinarias',
    title: 'Emergências Veterinárias',
    description: 'Protocolos de emergência e primeiros socorros',
    route: '/emergencias',
    status: 'iframe',
    icon: Zap,
    iframeUrl: 'https://emergencias-vet.netlify.app',
  },
  {
    id: 'peconhentos',
    title: 'Animais Peçonhentos',
    description: 'Condutas em acidentes por serpentes, aranhas, escorpiões e outros animais peçonhentos',
    route: '/peconhentos',
    status: 'iframe',
    icon: Worm,
    iframeUrl: 'https://aapvet.netlify.app',
  },
  {
    id: 'antibioticoterapia',
    title: 'Antibioticoterapia',
    description: 'Escolha guiada e racional de antimicrobianos (protocolos, doses e condutas)',
    route: '/antibioticoterapia',
    status: 'iframe',
    icon: Pill,
    iframeUrl: 'https://antibioticoterapia.netlify.app',
  },
  {
    id: 'crivet',
    title: 'CRIVET 2.0',
    description: 'Calculadora auditável de CRI veterinário',
    route: '/crivet',
    status: 'internal',
    icon: Syringe,
  },
  {
    id: 'neurologia',
    title: 'Neurologia',
    description: 'Localização didática',
    route: '/neurologia',
    status: 'planned',
    icon: Brain,
  },
]

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}

export function getModuleByRoute(route: string): Module | undefined {
  return modules.find((m) => m.route === route)
}
