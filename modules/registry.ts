import {
  Heart,
  Cat,
  TestTube,
  Syringe,
  Pill,
  Brain,
  LucideIcon,
  Activity,
  Stethoscope,
} from 'lucide-react'

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
    id: 'energia-vet',
    title: 'NutriçãoVET',
    description: 'Fluxo nutricional veterinário com cálculo, pacientes, dietas e relatórios.',
    route: '/calculadora-energetica',
    status: 'internal',
    icon: Activity,
    iconImage: '/apps/nutricaovet.png',
  },
  {
    id: 'fluidoterapia-vet',
    title: 'Fluidoterapia Vet',
    description: 'Cálculos e protocolos clínicos de fluidoterapia veterinária.',
    route: '/fluidoterapia-vet',
    status: 'internal',
    icon: Activity,
    iconImage: '/apps/fluidoterapia.png',
  },
  {
    id: 'transfusão-sanguinea',
    title: 'Transfusão Sanguínea',
    description: 'Cálculo de transfusão sanguínea e compatibilidade',
    route: '/transfusão-sanguinea',
    status: 'internal',
    icon: Heart,
    iconImage: '/apps/transfusao.png',
  },
  {
    id: 'hemogasovet',
    title: 'HemoGasoVet',
    description: 'Interpretação de hemogasometria arterial e venosa',
    route: '/hemogasovet',
    status: 'internal',
    icon: TestTube,
    iconImage: '/apps/hemogasovetzx.png',
  },
  {
    id: 'escalas-dor',
    title: 'Escalas de Dor',
    description: 'Escalas de dor e protocolos de analgesia',
    route: '/dor',
    status: 'internal',
    icon: Cat,
    iconImage: '/apps/dor.png',
  },
  {
    id: 'escalas-dor-mobile',
    title: 'Escalas de Dor MOBILE',
    description: 'Escalas de dor adaptadas para dispositivos móveis.',
    route: '/dor-mobile',
    status: 'internal',
    icon: Cat,
    iconImage: '/apps/dor.png',
  },
  {
    id: 'antibioticoterapia',
    title: 'Antibioticoterapia Vet',
    description: 'Escolha guiada e racional de antimicrobianos (protocolos, doses e condutas)',
    route: '/antibioticoterapia',
    status: 'internal',
    icon: Pill,
    iconImage: '/apps/ATB.png',
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
    id: 'neuro-mobile',
    title: 'Neuro Mobile',
    description: 'Exame neurológico adaptado para dispositivos móveis.',
    route: '/neuro-mobile',
    status: 'internal',
    icon: Brain,
    iconImage: '/apps/NEURO.png',
  },
  {
    id: 'consulta-vet',
    title: 'ConsultaVET',
    description: 'Base clínica com doenças, medicamentos, consensos, favoritos e retomada de leitura.',
    route: '/consulta-vet',
    status: 'internal',
    icon: Stethoscope,
    iconImage: '/apps/consulta-vet-logo.png',
  },

]

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}

export function getModuleByRoute(route: string): Module | undefined {
  return modules.find((m) => m.route === route)
}

