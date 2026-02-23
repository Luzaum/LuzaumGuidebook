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
  FileText,
  Brain,
  AlertTriangle,
  Worm,
  LucideIcon,
  Activity,
  Ticket,
} from 'lucide-react'
import calcEnergeticaLogo from '@/assets/logos/logo-calculadora-energetica.png'

export type ModuleStatus = 'internal' | 'iframe' | 'planned'

export interface Module {
  id: string
  title: string
  description: string
  route: string
  status: ModuleStatus
  icon: LucideIcon
  iconImage?: string // URL da imagem para substituir o ícone
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
    iconImage: calcEnergeticaLogo,
  },
  {
    id: 'fluidoterapia',
    title: 'Fluidoterapia',
    description: 'Cálculo de fluidoterapia com protocolos específicos',
    route: '/fluidoterapia',
    status: 'internal',
    icon: Droplets,
    iconImage: '/apps/fluido.png',
  },
  {
    id: 'transfusão-sanguinea',
    title: 'Transfusão Sanguínea',
    description: 'Cálculo de transfusão sanguínea e compatibilidade',
    route: '/transfusão-sanguinea',
    status: 'internal',
    icon: Heart,
    iconImage: '/apps/transfusão.png',
  },
  {
    id: 'hemogasometria',
    title: 'Hemogasometria',
    description: 'Interpretação de hemogasometria arterial e venosa',
    route: '/hemogasometria',
    status: 'internal',
    icon: TestTube,
    iconImage: '/apps/HEMOGASO.png',
  },
  {
    id: 'escalas-dor',
    title: 'Escalas de Dor',
    description: 'Escalas de dor e protocolos de analgesia',
    route: '/dor',
    status: 'iframe',
    icon: Cat,
    iframeUrl: 'https://analgesiavet.netlify.app',
    iconImage: '/apps/dor.png',
  },
  {
    id: 'emergências-veterinarias',
    title: 'Emergências Veterinárias',
    description: 'Protocolos de emergência e primeiros socorros',
    route: '/emergências',
    status: 'iframe',
    icon: Zap,
    iframeUrl: 'https://emergências-vet.netlify.app',
    iconImage: '/apps/emergência.png',
  },
  {
    id: 'peconhentos',
    title: 'Animais Peçonhentos',
    description: 'Condutas em acidentes por serpentes, aranhas, escorpiões e outros animais peçonhentos',
    route: '/peconhentos',
    status: 'internal',
    icon: Worm,
    iconImage: '/apps/aap.png',
  },
  {
    id: 'antibioticoterapia',
    title: 'Antibioticoterapia',
    description: 'Escolha guiada e racional de antimicrobianos (protocolos, doses e condutas)',
    route: '/antibioticoterapia',
    status: 'iframe',
    icon: Pill,
    iframeUrl: 'https://antibioticoterapia.netlify.app',
    iconImage: '/apps/ATB.png',
  },
  {
    id: 'receituario-vet',
    title: 'Receituário Vet',
    description: 'Painel inicial do receituário veterinário com fluxo clínico e prescrições',
    route: '/receituario-vet',
    status: 'internal',
    icon: FileText,
    iconImage: '/images/receituario-vet/reeceita.png',
  },
  {
    id: 'crivet',
    title: 'CRI VET',
    description: 'Calculadora auditável de CRI veterinário',
    route: '/crivet',
    status: 'internal',
    icon: Syringe,
    iconImage: '/apps/CRIVET.png',
  },
  {
    id: 'neurologia',
    title: 'Neurologia',
    description: 'Localização didática',
    route: '/neurologia',
    status: 'internal',
    icon: Brain,
    iconImage: '/apps/NEURO.png',
  },
  {
    id: 'veteletrolitico',
    title: 'VetEletrolítico',
    description: 'Cálculo e reposição de eletrólitos (K+, Na+, Mg2+, etc.)',
    route: '/veteletrolitico',
    status: 'internal',
    icon: Activity,
  },
  {
    id: 'rifa-luis',
    title: 'Rifa do Residente Luis',
    description: 'Gestor de Rifa Profissional - Controle Financeiro',
    route: '/rifa',
    status: 'iframe',
    icon: Ticket,
    iframeUrl: '/apps/rifa/index.html',
    iconImage: '/apps/CESTAS.png',
  },
]

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}

export function getModuleByRoute(route: string): Module | undefined {
  return modules.find((m) => m.route === route)
}
