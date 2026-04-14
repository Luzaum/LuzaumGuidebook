import {
  Heart,
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
  Stethoscope,
  Clock3,
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
    description: 'Modulo clinico de fluidoterapia veterinaria integrado ao Vetius.',
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
    description: 'Interpretacao de hemogasometria arterial e venosa',
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
    id: 'emergências-veterinarias',
    title: 'Emergências Veterinárias',
    description: 'Protocolos de emergência e primeiros socorros',
    route: '/emergências',
    status: 'iframe',
    icon: Zap,
    iframeUrl: 'https://emergências-vet.netlify.app',
    iconImage: '/apps/emergencia.png',
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
    title: 'Antibioticoterapia Vet',
    description: 'Escolha guiada e racional de antimicrobianos (protocolos, doses e condutas)',
    route: '/antibioticoterapia',
    status: 'internal',
    icon: Pill,
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
    id: 'plantao-vet',
    title: 'PlantaoVET',
    description: 'Internacao por plantao, pacientes, pendencias e passagem do turno.',
    route: '/plantao-vet',
    status: 'internal',
    icon: Clock3,
    iconImage: '/apps/plantao-vet.png',
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
    title: 'Hidroeletrovet',
    description: 'Cálculo e reposição de eletrólitos (K+, Na+, Mg2+, etc.)',
    route: '/veteletrolitico',
    status: 'internal',
    icon: Activity,
    iconImage: '/apps/hidroeletro.png',
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

