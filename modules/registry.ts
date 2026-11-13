import {
  Heart,
  Cat,
  Pill,
  Brain,
  LucideIcon,
  Activity,
} from 'lucide-react'

export type ModuleStatus = 'internal' | 'iframe' | 'planned'

export const fluidoterapiaIcon = '/consulta-vet/reference-apps/thumbnails/fluidoterapia-vet-gota.webp'
export const transfusaoIcon = '/consulta-vet/reference-apps/thumbnails/transfusao-sanguinea-gota.webp'

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
    description: 'Avalie necessidades energéticas, organize dietas e acompanhe pacientes nutricionais.',
    route: '/calculadora-energetica',
    status: 'internal',
    icon: Activity,
    iconImage: '/apps/nutricaovet.png',
  },
  {
    id: 'fluidoterapia-vet',
    title: 'Fluidoterapia Vet',
    description: 'Calcule reposição, manutenção e perdas para estruturar a fluidoterapia do paciente.',
    route: '/fluidoterapia-vet',
    status: 'internal',
    icon: Activity,
    iconImage: fluidoterapiaIcon,
  },
  {
    id: 'transfusão-sanguinea',
    title: 'Transfusão Sanguínea',
    description: 'Planeje transfusões com volume, compatibilidade, produtos sanguíneos e monitorização.',
    route: '/transfusao-sanguinea',
    status: 'internal',
    icon: Heart,
    iconImage: transfusaoIcon,
  },
  {
    id: 'escalas-dor',
    title: 'Escalas de Dor',
    description: 'Aplique escalas de dor e estruture a analgesia conforme espécie e contexto clínico.',
    route: '/dor',
    status: 'internal',
    icon: Cat,
    iconImage: '/consulta-vet/reference-apps/escalas-dor.png',
  },
  {
    id: 'antibioticoterapia',
    title: 'Antibioticoterapia Vet',
    description: 'Escolha antimicrobianos por síndrome, espectro, dose, cultura e uso responsável.',
    route: '/antibioticoterapia',
    status: 'internal',
    icon: Pill,
    iconImage: '/apps/ATB.png',
  },
  {
    id: 'neurologia',
    title: 'Neurologia',
    description: 'Conduza o exame neurológico, localize a lesão e aplique a escala MGCS.',
    route: '/neurologia',
    status: 'internal',
    icon: Brain,
    iconImage: '/apps/NEURO.png',
  },

]

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}

export function getModuleByRoute(route: string): Module | undefined {
  return modules.find((m) => m.route === route)
}

