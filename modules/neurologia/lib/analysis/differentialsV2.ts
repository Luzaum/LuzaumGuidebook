import type { Differential, NeuroAxis } from '../../types/analysis'
import {
  getDifferentialsFromLibrary,
  hasLibraryForAxis,
  convertToDifferential,
  type LoadedDifferential,
} from '../../data/differentials/loader'
import { getComorbidityScoreBoost } from '../engine/comorbidityRules'

type PatientData = {
  species: 'dog' | 'cat' | null
  lifeStage: 'neonate' | 'pediatric' | 'adult' | 'geriatric' | null
  comorbidities: string[]
}

type HistoryData = {
  temporalPattern: 'peragudo' | 'agudo' | 'subagudo' | 'cronico' | 'episodico' | null
  evolutionPattern: 'melhorando' | 'estatico' | 'flutuante' | 'progressivo' | null
  trauma: boolean
  toxin: boolean
  fever: boolean
  redFlags: string[]
}

type DifferentialCandidate = {
  name: string
  category: Differential['category']
  baseScore: number
  axes: NeuroAxis[]
  species?: ('dog' | 'cat')[]
  lifeStages?: ('neonate' | 'pediatric' | 'adult' | 'geriatric')[]
  temporalPreference?: ('peragudo' | 'agudo' | 'subagudo' | 'cronico' | 'episodico')[]
  evolutionPreference?: ('melhorando' | 'estatico' | 'flutuante' | 'progressivo')[]
  traumaBoost?: boolean
  comorbidityBoost?: string[]
}

const DIFFERENTIAL_CANDIDATES: DifferentialCandidate[] = [
  // PROSENCEFALO
  {
    name: 'Meningoencefalite',
    category: 'INFLAMATORIA',
    baseScore: 50,
    axes: ['PROSENCEFALO'],
    species: ['dog'],
    lifeStages: ['pediatric', 'adult'],
    temporalPreference: ['agudo', 'subagudo'],
    evolutionPreference: ['progressivo'],
  },
  {
    name: 'Neoplasia intracraniana',
    category: 'NEOPLASICA',
    baseScore: 45,
    axes: ['PROSENCEFALO'],
    temporalPreference: ['cronico', 'subagudo'],
    evolutionPreference: ['progressivo'],
  },
  {
    name: 'Acidente vascular cerebral (AVC)',
    category: 'VASCULAR',
    baseScore: 40,
    axes: ['PROSENCEFALO'],
    temporalPreference: ['peragudo'],
    comorbidityBoost: ['cardiac', 'hypertension'],
  },
  {
    name: 'Intoxicação (metais pesados, organofosforados)',
    category: 'TOXICO_METABOLICA',
    baseScore: 35,
    axes: ['PROSENCEFALO'],
    temporalPreference: ['peragudo', 'agudo'],
  },

  // TRONCO_ENCEFALICO
  {
    name: 'Encefalite de tronco',
    category: 'INFLAMATORIA',
    baseScore: 50,
    axes: ['TRONCO_ENCEFALICO'],
    species: ['dog'],
    temporalPreference: ['agudo', 'subagudo'],
  },
  {
    name: 'Neoplasia de tronco encefálico',
    category: 'NEOPLASICA',
    baseScore: 45,
    axes: ['TRONCO_ENCEFALICO'],
    temporalPreference: ['cronico', 'subagudo'],
  },
  {
    name: 'Infarto de tronco (FCE)',
    category: 'VASCULAR',
    baseScore: 40,
    axes: ['TRONCO_ENCEFALICO'],
    temporalPreference: ['peragudo'],
  },

  // VESTIBULAR_PERIFERICO
  {
    name: 'Otite média/interna',
    category: 'INFECCIOSA',
    baseScore: 60,
    axes: ['VESTIBULAR_PERIFERICO'],
    temporalPreference: ['agudo', 'subagudo'],
  },
  {
    name: 'Doença vestibular idiopática',
    category: 'IDIOPATICA',
    baseScore: 55,
    axes: ['VESTIBULAR_PERIFERICO'],
    species: ['dog'],
    lifeStages: ['geriatric'],
    temporalPreference: ['peragudo', 'agudo'],
    evolutionPreference: ['melhorando'],
  },
  {
    name: 'Pólipo nasofaríngeo (gato)',
    category: 'NEOPLASICA',
    baseScore: 50,
    axes: ['VESTIBULAR_PERIFERICO'],
    species: ['cat'],
    lifeStages: ['pediatric', 'adult'],
  },
  {
    name: 'Hipotireoidismo (cão)',
    category: 'ENDOCRINA',
    baseScore: 40,
    axes: ['VESTIBULAR_PERIFERICO'],
    species: ['dog'],
    comorbidityBoost: ['endocrine'],
  },
  {
    name: 'Ototoxicidade',
    category: 'TOXICO_METABOLICA',
    baseScore: 35,
    axes: ['VESTIBULAR_PERIFERICO'],
    temporalPreference: ['peragudo', 'agudo'],
  },

  // VESTIBULAR_CENTRAL
  {
    name: 'Infarto vestibular central (FCE)',
    category: 'VASCULAR',
    baseScore: 50,
    axes: ['VESTIBULAR_CENTRAL'],
    temporalPreference: ['peragudo'],
  },
  {
    name: 'Encefalite vestibular',
    category: 'INFLAMATORIA',
    baseScore: 45,
    axes: ['VESTIBULAR_CENTRAL'],
    temporalPreference: ['agudo'],
  },
  {
    name: 'Neoplasia vestibular central',
    category: 'NEOPLASICA',
    baseScore: 40,
    axes: ['VESTIBULAR_CENTRAL'],
    temporalPreference: ['cronico'],
  },

  // CEREBELO
  {
    name: 'Abiotrofia cerebelar',
    category: 'DEGENERATIVA',
    baseScore: 50,
    axes: ['CEREBELO'],
    species: ['dog'],
    lifeStages: ['pediatric', 'adult'],
    temporalPreference: ['cronico'],
    evolutionPreference: ['progressivo'],
  },
  {
    name: 'Neoplasia cerebelar',
    category: 'NEOPLASICA',
    baseScore: 45,
    axes: ['CEREBELO'],
    temporalPreference: ['cronico', 'subagudo'],
  },
  {
    name: 'Inflamação cerebelar',
    category: 'INFLAMATORIA',
    baseScore: 40,
    axes: ['CEREBELO'],
    temporalPreference: ['agudo'],
  },
  {
    name: 'Intoxicação (metronidazol, outras)',
    category: 'TOXICO_METABOLICA',
    baseScore: 35,
    axes: ['CEREBELO'],
    temporalPreference: ['agudo'],
  },

  // MEDULA C1-C5, C6-T2, T3-L3, L4-S3
  {
    name: 'Hérnia de disco intervertebral (IVDD)',
    category: 'COMPRESSIVA',
    baseScore: 70,
    axes: ['MEDULA_C1_C5', 'MEDULA_C6_T2', 'MEDULA_T3_L3', 'MEDULA_L4_S3'],
    species: ['dog'],
    temporalPreference: ['peragudo', 'agudo'],
  },
  {
    name: 'Trauma espinhal',
    category: 'TRAUMATICA',
    baseScore: 65,
    axes: ['MEDULA_C1_C5', 'MEDULA_C6_T2', 'MEDULA_T3_L3', 'MEDULA_L4_S3'],
    temporalPreference: ['peragudo'],
    traumaBoost: true,
  },
  {
    name: 'Mielite (inflamatória/infecciosa)',
    category: 'INFLAMATORIA',
    baseScore: 50,
    axes: ['MEDULA_C1_C5', 'MEDULA_C6_T2', 'MEDULA_T3_L3', 'MEDULA_L4_S3'],
    temporalPreference: ['agudo', 'subagudo'],
  },
  {
    name: 'Neoplasia espinhal',
    category: 'NEOPLASICA',
    baseScore: 45,
    axes: ['MEDULA_C1_C5', 'MEDULA_C6_T2', 'MEDULA_T3_L3', 'MEDULA_L4_S3'],
    temporalPreference: ['cronico', 'subagudo'],
  },
  {
    name: 'Infarto fibrocartilaginoso (FCE)',
    category: 'VASCULAR',
    baseScore: 40,
    axes: ['MEDULA_C1_C5', 'MEDULA_C6_T2', 'MEDULA_T3_L3'],
    temporalPreference: ['peragudo'],
  },

  // CAUDA_EQUINA
  {
    name: 'Estenose lombossacra/cauda equina',
    category: 'COMPRESSIVA',
    baseScore: 60,
    axes: ['CAUDA_EQUINA'],
    species: ['dog'],
    lifeStages: ['adult', 'geriatric'],
    temporalPreference: ['cronico'],
  },
  {
    name: 'IVDD lombossacra',
    category: 'COMPRESSIVA',
    baseScore: 55,
    axes: ['CAUDA_EQUINA'],
    species: ['dog'],
    temporalPreference: ['peragudo', 'agudo'],
  },
  {
    name: 'Discospondilite',
    category: 'INFECCIOSA',
    baseScore: 45,
    axes: ['CAUDA_EQUINA'],
    temporalPreference: ['subagudo', 'cronico'],
  },

  // NEUROMUSCULAR
  {
    name: 'Miastenia gravis',
    category: 'IDIOPATICA',
    baseScore: 60,
    axes: ['NEUROMUSCULAR'],
    temporalPreference: ['episodico'],
    evolutionPreference: ['flutuante'],
  },
  {
    name: 'Polirradiculoneurite (síndrome de Coonhound)',
    category: 'INFLAMATORIA',
    baseScore: 55,
    axes: ['NEUROMUSCULAR'],
    species: ['dog'],
    temporalPreference: ['agudo'],
    evolutionPreference: ['progressivo'],
  },
  {
    name: 'Botulismo',
    category: 'TOXICO_METABOLICA',
    baseScore: 50,
    axes: ['NEUROMUSCULAR'],
    temporalPreference: ['peragudo', 'agudo'],
  },
  {
    name: 'Miopatia inflamatória',
    category: 'INFLAMATORIA',
    baseScore: 45,
    axes: ['NEUROMUSCULAR'],
    temporalPreference: ['agudo', 'subagudo'],
  },
]

export function generateDifferentials(
  caseState: any,
  neuroLocalization: { primary: NeuroAxis; secondary?: NeuroAxis[] },
): Differential[] {
  const patient: PatientData = {
    species: caseState.patient?.species || null,
    lifeStage: caseState.patient?.lifeStage || null,
    comorbidities: caseState.patient?.comorbidities || [],
  }

  const history: HistoryData = {
    temporalPattern: caseState.complaint?.temporalPattern || null,
    evolutionPattern: caseState.complaint?.evolutionPattern || null,
    trauma: caseState.complaint?.trauma || false,
    toxin: caseState.complaint?.toxin || false,
    fever: caseState.complaint?.fever || false,
    redFlags: caseState.complaint?.redFlags || [],
  }

  const axesToMatch = [neuroLocalization.primary, ...(neuroLocalization.secondary || [])]

  const results: Differential[] = []

  // PASSO 1: Tentar carregar da biblioteca JSON se disponível
  if (hasLibraryForAxis(neuroLocalization.primary)) {
    const libraryDifferentials = getDifferentialsFromLibrary(neuroLocalization.primary)

    // Calcular scores para diferenciais da biblioteca
    const scoredLibrary = libraryDifferentials.map((loaded) => {
      let score = 70 // Base score para diferenciais da biblioteca

      // Match de curso temporal
      if (
        history.temporalPattern &&
        loaded.rules.course.map((c) => c.toLowerCase()).includes(history.temporalPattern.toLowerCase())
      ) {
        score *= 1.3
      }

      // Match de espécie
      if (
        patient.species &&
        loaded.rules.species.map((s) => s.toLowerCase()).includes(patient.species.toUpperCase().substring(0, 3))
      ) {
        score *= 1.2
      }

      // Match de life stage
      if (
        patient.lifeStage &&
        loaded.rules.ageStages.map((a) => a.toLowerCase()).includes(patient.lifeStage.toLowerCase())
      ) {
        score *= 1.15
      }

      // Boost por red flags
      if (history.redFlags.length > 0) {
        const matchingRedFlags = loaded.rules.redFlagsBoost.filter((rf) =>
          history.redFlags.some((h) => h.toLowerCase().includes(rf.toLowerCase())),
        )
        if (matchingRedFlags.length > 0) {
          score *= 1.2
        }
      }

      // Boost por trauma
      if (history.trauma && loaded.rules.redFlagsBoost.includes('inicio_agudo')) {
        score *= 1.3
      }

      // Boost por comorbidades
      const comorbidityBoost = getComorbidityScoreBoost(patient.comorbidities, loaded.name)
      score += comorbidityBoost

      return {
        loaded,
        score,
      }
    })

    // Ordenar e pegar os melhores da biblioteca
    const topLibrary = scoredLibrary
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item) => {
        const dx = convertToDifferential(item.loaded, patient, history)
        return {
          ...dx,
          likelihood: Math.min(100, Math.round(item.score)),
        }
      })

    results.push(...topLibrary.map((dx) => {
      // Garantir que tem ID (convertToDifferential já gera, mas garantir compatibilidade)
      if (!dx.id) {
        const ddxId = dx.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/\s+/g, '_').replace(/_+/g, '_')
        return { ...dx, id: ddxId }
      }
      return dx
    }))
  }

  // PASSO 2: Se não tiver 5 diferenciais, completar com candidatos hardcoded
  if (results.length < 5) {
    const compatibleCandidates = DIFFERENTIAL_CANDIDATES.filter((candidate) =>
      candidate.axes.some((axis) => axesToMatch.includes(axis)),
    )

    // Calcular scores para candidatos hardcoded
    const scored = compatibleCandidates.map((candidate) => {
      let score = candidate.baseScore

      // Ajustes por eixo
      if (candidate.axes.includes(neuroLocalization.primary)) {
        score *= 1.2
      }

      // Ajustes por espécie
      if (candidate.species && patient.species && !candidate.species.includes(patient.species)) {
        score *= 0.7
      }

      // Ajustes por life stage
      if (candidate.lifeStages && patient.lifeStage && !candidate.lifeStages.includes(patient.lifeStage)) {
        score *= 0.8
      }

      // Ajustes por padrão temporal
      if (candidate.temporalPreference && history.temporalPattern && candidate.temporalPreference.includes(history.temporalPattern)) {
        score *= 1.3
      } else if (candidate.temporalPreference && history.temporalPattern) {
        score *= 0.9
      }

      // Ajustes por evolução
      if (candidate.evolutionPreference && history.evolutionPattern && candidate.evolutionPreference.includes(history.evolutionPattern)) {
        score *= 1.2
      }

      // Boost por trauma
      if (candidate.traumaBoost && history.trauma) {
        score *= 1.5
      }

      // Boost por comorbidades (sistema antigo para compatibilidade)
      if (candidate.comorbidityBoost && candidate.comorbidityBoost.some((c) => patient.comorbidities.includes(c))) {
        score *= 1.3
      }

      // Boost por comorbidades (novo sistema baseado em regras)
      // Aplicar boost para qualquer DDx que se beneficie das comorbidades do paciente
      // Usar nome do candidato como ID aproximado (pode ser melhorado com mapeamento específico)
      const comorbidityBoost = getComorbidityScoreBoost(patient.comorbidities, candidate.name.toLowerCase().replace(/[^a-z0-9]/g, '_'))
      score += comorbidityBoost

      return { candidate, score }
    })

    // Adicionar candidatos hardcoded (evitando duplicatas por nome)
    const existingNames = new Set(results.map((r) => r.name.toLowerCase()))
    const additional = scored
      .sort((a, b) => b.score - a.score)
      .filter((item) => !existingNames.has(item.candidate.name.toLowerCase()))
      .slice(0, 5 - results.length)
      .map((item) => buildDifferential(item.candidate, item.score, patient, history, neuroLocalization))

    results.push(...additional)
  }

  // PASSO 3: Completar até 5 com diferenciais genéricos se necessário
  while (results.length < 5) {
    const generic = buildGenericDifferential(results.length + 1, neuroLocalization.primary)
    results.push(generic)
  }

  // PASSO 4: Normalizar likelihood (0-100) mantendo top 5
  const top5 = results.slice(0, 5)
  const maxScore = top5[0]?.likelihood || 100
  return top5.map((dx) => ({
    ...dx,
    likelihood: Math.min(100, Math.max(10, Math.round((dx.likelihood / maxScore) * 100))),
  }))
}

function buildDifferential(
  candidate: DifferentialCandidate,
  score: number,
  patient: PatientData,
  history: HistoryData,
  localization: { primary: NeuroAxis; secondary?: NeuroAxis[] },
): Differential {
  const why: string[] = []
  why.push(`Compatível com localização em ${getAxisLabel(localization.primary)}`)
  if (history.temporalPattern) {
    why.push(`Curso ${history.temporalPattern} compatível`)
  }
  if (patient.species) {
    why.push(`Espécie: ${patient.species === 'dog' ? 'cão' : 'gato'}`)
  }
  if (patient.comorbidities.length > 0) {
    const comorbLabels = Array.isArray(patient.comorbidities)
      ? patient.comorbidities.map((c: any) => (typeof c === 'string' ? c : c.label || c.key)).join(', ')
      : ''
    if (comorbLabels) {
      why.push(`Comorbidades: ${comorbLabels}`)
    }
  }

  const diagnostics = getDiagnosticsForCategory(candidate.category, localization.primary)
  const treatment = getTreatmentForCategory(candidate.category, patient.comorbidities)

  // Gerar ID único baseado no nome
  const ddxId = candidate.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/\s+/g, '_').replace(/_+/g, '_')

  return {
    id: ddxId,
    name: candidate.name,
    category: candidate.category,
    likelihood: Math.min(100, Math.round(score)),
    why,
    diagnostics,
    treatment,
  }
}

function buildGenericDifferential(index: number, axis: NeuroAxis): Differential {
  const name = `Diferencial amplo ${index} - ${getAxisLabel(axis)}`
  const ddxId = `diferencial_amplo_${index}_${axis.toLowerCase()}`

  return {
    id: ddxId,
    name,
    category: 'IDIOPATICA',
    likelihood: Math.max(20, 100 - index * 15),
    why: ['Diferencial amplo baseado na localização', 'Requer investigação adicional'],
    diagnostics: [
      {
        test: 'Exame neurológico completo',
        priority: 'ALTA',
        whatItAdds: 'Avaliação detalhada do sistema nervoso',
        expectedFindings: 'Achados variáveis',
        limitations: 'Depende da experiência do examinador',
      },
      {
        test: 'Hemograma e bioquímica sérica',
        priority: 'ALTA',
        whatItAdds: 'Avaliação sistêmica e metabólica',
        expectedFindings: 'Possíveis alterações sistêmicas',
        limitations: 'Podem ser normais em doenças focais',
      },
    ],
    treatment: [
      {
        phase: '0-6H',
        plan: ['Estabilização e suporte', 'Monitorização neurológica', 'Analgesia se indicada'],
        cautions: ['Evitar sedação excessiva', 'Monitorar função respiratória'],
      },
      {
        phase: 'DEFINITIVO',
        plan: ['Tratar conforme diagnóstico específico', 'Reabilitação neurológica', 'Monitorização contínua'],
        cautions: [],
      },
    ],
  }
}

function getAxisLabel(axis: NeuroAxis): string {
  const labels: Record<NeuroAxis, string> = {
    PROSENCEFALO: 'prosencéfalo',
    TRONCO_ENCEFALICO: 'tronco encefálico',
    CEREBELO: 'cerebelo',
    VESTIBULAR_PERIFERICO: 'vestibular periférico',
    VESTIBULAR_CENTRAL: 'vestibular central',
    MEDULA_C1_C5: 'medula cervical (C1-C5)',
    MEDULA_C6_T2: 'medula cervicotorácica (C6-T2)',
    MEDULA_T3_L3: 'medula toracolombar (T3-L3)',
    MEDULA_L4_S3: 'medula lombossacra (L4-S3)',
    CAUDA_EQUINA: 'cauda equina',
    NEUROMUSCULAR: 'neuromuscular',
    MULTIFOCAL_OU_DIFUSA: 'multifocal/difusa',
    INDETERMINADO: 'indeterminado',
  }
  return labels[axis]
}

function getDiagnosticsForCategory(
  category: Differential['category'],
  axis: NeuroAxis,
): Differential['diagnostics'] {
  const base = [
    {
      test: 'Exame neurológico completo',
      priority: 'ALTA' as const,
      whatItAdds: 'Avaliação detalhada do sistema nervoso',
      expectedFindings: 'Achados compatíveis com a localização',
      limitations: 'Depende da experiência do examinador',
    },
    {
      test: 'Hemograma e bioquímica sérica',
      priority: 'ALTA' as const,
      whatItAdds: 'Avaliação sistêmica e metabólica',
      expectedFindings: 'Possíveis alterações sistêmicas',
      limitations: 'Podem ser normais em doenças focais',
    },
  ]

  if (axis.startsWith('MEDULA_') || axis === 'CAUDA_EQUINA') {
    return [
      ...base,
      {
        test: 'Ressonância magnética (preferencial)',
        priority: 'ALTA' as const,
        whatItAdds: 'Visualização detalhada da medula espinhal',
        expectedFindings: 'Compressão, lesão ou sinal alterado',
        limitations: 'Disponibilidade e necessidade de anestesia',
      },
      {
        test: 'Tomografia computadorizada',
        priority: 'MEDIA' as const,
        whatItAdds: 'Visualização de estruturas ósseas e compressão',
        expectedFindings: 'Alterações ósseas ou compressão',
        limitations: 'Menor resolução para tecidos moles',
      },
    ]
  }

  if (axis === 'PROSENCEFALO' || axis === 'TRONCO_ENCEFALICO' || axis === 'CEREBELO') {
    return [
      ...base,
      {
        test: 'Ressonância magnética',
        priority: 'ALTA' as const,
        whatItAdds: 'Visualização detalhada do encéfalo',
        expectedFindings: 'Lesões, massas ou alterações de sinal',
        limitations: 'Disponibilidade e necessidade de anestesia',
      },
      {
        test: 'Análise de líquor',
        priority: 'MEDIA' as const,
        whatItAdds: 'Avaliação inflamatória e infecciosa',
        expectedFindings: 'Pleocitose, proteinorraquia ou agentes',
        limitations: 'Risco de herniação em pressão intracraniana elevada',
      },
    ]
  }

  if (axis === 'VESTIBULAR_PERIFERICO') {
    return [
      ...base,
      {
        test: 'Exame otoscópico e otológico',
        priority: 'ALTA' as const,
        whatItAdds: 'Avaliação de orelha média/interna',
        expectedFindings: 'Otite, massa ou alterações estruturais',
        limitations: 'Pode requerer anestesia',
      },
      {
        test: 'Imagem (TC/RM) de cabeça',
        priority: 'MEDIA' as const,
        whatItAdds: 'Visualização de estruturas do ouvido interno',
        expectedFindings: 'Massa, inflamação ou alterações',
        limitations: 'Disponibilidade e custo',
      },
    ]
  }

  return base
}

function getTreatmentForCategory(
  category: Differential['category'],
  comorbidities: any[],
): Differential['treatment'] {
  const cautions: string[] = []

  // Extrair keys de comorbidades (suporta string[] ou ComorbidityItem[])
  const comorbKeys = Array.isArray(comorbidities)
    ? comorbidities.map((c: any) => (typeof c === 'string' ? c : c.key || c)).filter(Boolean)
    : []

  if (comorbKeys.includes('renal') || comorbKeys.includes('hepatica')) {
    cautions.push('Ajustar doses conforme função renal/hepática')
  }
  if (comorbidities.includes('hepatic')) {
    cautions.push('Ajustar metabolização hepática de fármacos')
  }
  if (comorbidities.includes('cardiac')) {
    cautions.push('Monitorar função cardiovascular')
  }

  const baseTreatment: Differential['treatment'] = [
    {
      phase: '0-6H',
      plan: ['Estabilização e suporte', 'Monitorização neurológica', 'Analgesia multimodal se indicada'],
      cautions,
    },
    {
      phase: 'DEFINITIVO',
      plan: ['Tratar conforme diagnóstico específico', 'Reabilitação neurológica', 'Monitorização contínua'],
      cautions: [],
    },
  ]

  if (category === 'COMPRESSIVA') {
    baseTreatment[1].plan.unshift('Avaliar necessidade de descompressão cirúrgica')
  }

  if (category === 'INFLAMATORIA' || category === 'INFECCIOSA') {
    baseTreatment[1].plan.unshift('Terapia anti-inflamatória/antimicrobiana conforme indicação')
  }

  if (category === 'TOXICO_METABOLICA') {
    baseTreatment[0].plan.unshift('Remoção/suporte para toxina')
    baseTreatment[1].plan.unshift('Correção de distúrbio metabólico se presente')
  }

  return baseTreatment
}
