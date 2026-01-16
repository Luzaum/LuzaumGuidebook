import { Etiology } from '../types'

// Simplified mock library for the "AI" analysis
export const ETIOLOGIES: Etiology[] = [
  {
    name: 'Hérnia de Disco Intervertebral (Hansen I)',
    category: 'Degenerativa',
    confidence: 0,
    justification: 'Comum em cães condrodistróficos, início agudo, doloroso.',
  },
  {
    name: 'Meningoencefalite de Origem Desconhecida (MUE)',
    category: 'Inflamatória',
    confidence: 0,
    justification:
      'Comum em cães jovens/adultos de raças pequenas, sinais multifocais.',
  },
  {
    name: 'Embolia Fibrocartilaginosa (FCE)',
    category: 'Vascular',
    confidence: 0,
    justification: 'Início peragudo, não doloroso, muitas vezes assimétrico.',
  },
  {
    name: 'Neoplasia Intracraniana (Meningioma/Glioma)',
    category: 'Neoplasia',
    confidence: 0,
    justification: 'Pacientes idosos, curso progressivo, convulsões.',
  },
  {
    name: 'Discospondilite',
    category: 'Infecciosa',
    confidence: 0,
    justification:
      'Dor espinhal severa, sinais sistêmicos (febre, perda de peso).',
  },
  {
    name: 'Trauma Cranioencefálico',
    category: 'Trauma',
    confidence: 0,
    justification:
      'Histórico de trauma, início agudo, sinais de tronco ou córtex.',
  },
  {
    name: 'Síndrome Vestibular Idiopática',
    category: 'Idiopática',
    confidence: 0,
    justification: 'Cães idosos ou gatos, início agudo, melhora espontânea.',
  },
  {
    name: 'Otite Média/Interna',
    category: 'Infecciosa',
    confidence: 0,
    justification:
      'Sinais vestibulares periféricos, possível paralisia facial.',
  },
]
