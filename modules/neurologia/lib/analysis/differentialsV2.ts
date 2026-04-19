import type { Differential, NeuroAxis } from '../../types/analysis'
import {
  getDifferentialsFromLibrary,
  hasLibraryForAxis,
  convertToDifferential,
  type LoadedDifferential,
} from '../../data/differentials/loader'
import {
  ANALYSIS_DISEASE_CATALOG,
  type AnalysisDiseaseCatalogEntry,
} from '../../data/analysisDiseaseCatalog'
import { getComorbidityScoreBoost } from '../engine/comorbidityRules'

type PatientData = {
  species: 'dog' | 'cat' | null
  lifeStage: 'neonate' | 'pediatric' | 'adult' | 'geriatric' | null
  comorbidities: string[]
}

type HistoryData = {
  temporalPattern:
    | 'peragudo'
    | 'agudo'
    | 'subagudo'
    | 'cronico'
    | 'episodico'
    | 'insidioso'
    | 'oscilante'
    | 'recorrente'
    | null
  evolutionPattern:
    | 'melhorando'
    | 'melhora_parcial'
    | 'estático'
    | 'flutuante'
    | 'progressivo'
    | 'assintomatico_entre_episodios'
    | null
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
  evolutionPreference?: (
    | 'melhorando'
    | 'melhora_parcial'
    | 'estático'
    | 'flutuante'
    | 'progressivo'
    | 'assintomatico_entre_episodios'
  )[]
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
  {
    name: 'Epilepsia idiopática',
    category: 'IDIOPATICA',
    baseScore: 58,
    axes: ['PROSENCEFALO'],
    species: ['dog', 'cat'],
    lifeStages: ['pediatric', 'adult'],
    temporalPreference: ['episodico', 'agudo'],
    evolutionPreference: ['estático', 'assintomatico_entre_episodios', 'melhorando', 'melhora_parcial', 'flutuante'],
  },
  {
    name: 'Epilepsia estrutural (malformação ou massa encefálica)',
    category: 'COMPRESSIVA',
    baseScore: 46,
    axes: ['PROSENCEFALO'],
    temporalPreference: ['episodico', 'agudo', 'subagudo', 'cronico'],
    evolutionPreference: ['progressivo', 'flutuante', 'melhora_parcial'],
  },
  {
    name: 'Encefalopatia metabólica ou tóxica',
    category: 'TOXICO_METABOLICA',
    baseScore: 48,
    axes: ['PROSENCEFALO', 'MULTIFOCAL_OU_DIFUSA'],
    temporalPreference: ['peragudo', 'agudo', 'subagudo'],
    evolutionPreference: ['flutuante', 'progressivo', 'melhorando'],
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

function normalizeText(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)))
}

function hasComplaint(caseState: any, ...targets: string[]): boolean {
  const ids = Array.isArray(caseState?.complaint?.chiefComplaintIds) ? caseState.complaint.chiefComplaintIds : []
  return ids.some((item: string) => targets.includes(item))
}

function hasComorbidity(patient: PatientData, ...targets: string[]): boolean {
  const comorbidities = Array.isArray(patient.comorbidities) ? patient.comorbidities : []
  return comorbidities.some((item: any) => {
    const raw =
      typeof item === 'string'
        ? item
        : `${item?.key || ''} ${item?.label || ''} ${item?.notes || ''}`
    const normalized = normalizeText(raw)
    return targets.some((target) => normalized.includes(normalizeText(target)))
  })
}

function collectDiagnosisContext(
  diagnosisName: string,
  caseState: any,
  patient: PatientData,
  history: HistoryData,
  primaryAxis: NeuroAxis,
): { scoreDelta: number; reasons: string[] } {
  const name = normalizeText(diagnosisName)
  const reasons: string[] = []
  let scoreDelta = 0

  const seizures = hasComplaint(caseState, 'ConvulsaoFocal', 'ConvulsaoGeneralizada', 'ClusterConvulsoes')
  const circling = hasComplaint(caseState, 'AndarCirculos')
  const blindness = hasComplaint(caseState, 'Cegueira')
  const tremors = hasComplaint(caseState, 'Tremores')
  const weaknessComplaint = hasComplaint(caseState, 'Paresia', 'Tetraparesia', 'Paraparesia', 'FraquezaFlacida')
  const toxinExposure = Boolean(caseState?.complaint?.toxin || caseState?.complaint?.ectoparasiticideExposure)
  const fever = Boolean(caseState?.complaint?.fever)
  const cervicalPain = normalizeText(caseState?.neuroExam?.pain_cervical).includes('leve') || normalizeText(caseState?.neuroExam?.pain_cervical).includes('moder') || normalizeText(caseState?.neuroExam?.pain_cervical).includes('sever')
  const cranialDeficit =
    normalizeText(caseState?.neuroExam?.plr_left).includes('lent') ||
    normalizeText(caseState?.neuroExam?.plr_right).includes('lent') ||
    normalizeText(caseState?.neuroExam?.cn_facial_sensation).includes('diminu') ||
    normalizeText(caseState?.neuroExam?.cn_swallowing).includes('diminu')
  const allFourPosturals =
    ['proprioception_thoracic_left', 'proprioception_thoracic_right', 'proprioception_pelvic_left', 'proprioception_pelvic_right']
      .map((key) => normalizeText(caseState?.neuroExam?.[key]))
      .filter((value) => value.includes('diminu') || value.includes('ausent')).length >= 4
  const isGeriatric = patient.lifeStage === 'geriatric'

  if (
    name.includes('metabol') ||
    name.includes('urem') ||
    name.includes('hepat') ||
    name.includes('hipox') ||
    name.includes('hipoglic') ||
    name.includes('eletrol')
  ) {
    if (hasComorbidity(patient, 'reno', 'renal', 'hep', 'figad', 'pneumo', 'respirat', 'endocr')) {
      scoreDelta += 24
      reasons.push('Comorbidades sistemicas importantes aumentam a chance de encefalopatia metabolica.')
    }
    if (history.temporalPattern === 'episodico' || history.evolutionPattern === 'flutuante') {
      scoreDelta += 10
      reasons.push('Padrao episodico/flutuante conversa com descompensacao metabolica.')
    }
    if (seizures || blindness) {
      scoreDelta += 6
      reasons.push('Convulsoes e sinais encefalicos podem ocorrer em encefalopatias hepatica, uremica ou hipoxica.')
    }
    if (primaryAxis === 'MULTIFOCAL_OU_DIFUSA' && (cranialDeficit || allFourPosturals)) {
      scoreDelta += 6
      reasons.push('Processos metabolicos graves podem simular doenca multifocal quando combinam sinais prosencefalicos e deficits difusos.')
    }
    if (name.includes('encefalopatia hepat') && hasComorbidity(patient, 'hep', 'figad')) {
      scoreDelta += 12
      reasons.push('A hepatopatia registrada aumenta bastante a coerencia com encefalopatia hepatica.')
    }
    if (name.includes('eletrol')) {
      if (tremors || weaknessComplaint) {
        scoreDelta += 8
        reasons.push('Fraqueza, tremores ou componente neuromuscular tornam disturbio eletrolitico mais convincente.')
      } else {
        scoreDelta -= 12
        reasons.push('Sem tremores, fraqueza flacida ou contexto eletrolitico classico, disturbio eletrolitico perde prioridade relativa.')
      }
    }
    if (name.includes('hipoglic')) {
      if (history.temporalPattern === 'episodico') {
        scoreDelta += 6
        reasons.push('Crises em episodios sustentam hipoglicemia como mimetizador importante.')
      } else {
        scoreDelta -= 4
      }
    }
  }

  if (name.includes('muo') || name.includes('meningoencefal')) {
    if (primaryAxis === 'MULTIFOCAL_OU_DIFUSA' || cranialDeficit || allFourPosturals) {
      scoreDelta += 18
      reasons.push('A combinacao de prosencefalo, pares cranianos e deficits posturais sustenta doenca inflamatoria multifocal.')
    }
    if (history.evolutionPattern === 'progressivo' || cervicalPain) {
      scoreDelta += 10
      reasons.push('Progressao clinica e dor cervical aumentam suspeita de meningoencefalite.')
    }
  }

  if (name.includes('infecc')) {
    if (fever) {
      scoreDelta += 14
      reasons.push('Febre e contexto sistemico reforcam etiologia infecciosa.')
    }
    if (cranialDeficit && primaryAxis === 'MULTIFOCAL_OU_DIFUSA') {
      scoreDelta += 8
      reasons.push('Deficits multifocais podem ocorrer em encefalites infecciosas.')
    }
  }

  if (name.includes('neoplas')) {
    if (isGeriatric) {
      scoreDelta += 18
      reasons.push('Idade geriatrica aumenta a prioridade de neoplasia intracraniana.')
    }
    if (seizures || circling || blindness) {
      scoreDelta += 12
      reasons.push('Convulsoes, andar em circulos e alteracao visual central sao classicos de massa prosencefalica.')
    }
    if (history.evolutionPattern === 'progressivo') {
      scoreDelta += 8
      reasons.push('Curso progressivo e compativel com lesao expansiva.')
    }
    if (history.temporalPattern === 'episodico') {
      scoreDelta -= 6
      reasons.push('Curso muito episodico exige cuidado antes de assumir massa estrutural como explicacao principal.')
    }
    if (primaryAxis === 'MULTIFOCAL_OU_DIFUSA' && hasComorbidity(patient, 'reno', 'renal', 'hep', 'figad', 'pneumo', 'respirat')) {
      scoreDelta -= 6
      reasons.push('Comorbidades sistemicas fortes pedem excluir encefalopatia metabolica antes de consolidar neoplasia como primeira opcao.')
    }
  }

  if (name.includes('vascular') || name.includes('avc')) {
    if (history.temporalPattern === 'peragudo' || history.temporalPattern === 'agudo') {
      scoreDelta += 16
      reasons.push('Inicio agudo/peragudo favorece etiologia vascular.')
    } else if (history.temporalPattern) {
      scoreDelta -= 16
      reasons.push('Curso nao peragudo reduz a prioridade relativa de AVC.')
    }
    if (hasComorbidity(patient, 'renal', 'hipert', 'card', 'coagul', 'endocr')) {
      scoreDelta += 10
      reasons.push('Comorbidades vasculares ou hipertensivas sustentam evento cerebrovascular.')
    }
    if (history.evolutionPattern === 'progressivo') {
      scoreDelta -= 8
      reasons.push('Evolucao progressiva e menos confortavel para AVC isolado.')
    }
  }

  if (name.includes('intoxic')) {
    if (toxinExposure) {
      scoreDelta += 18
      reasons.push('Historico de exposicao toxica aumenta muito a plausibilidade.')
    } else if (history.temporalPattern && !['agudo', 'peragudo'].includes(history.temporalPattern)) {
      scoreDelta -= 10
      reasons.push('Sem exposicao clara e sem inicio agudo, intoxicacao perde prioridade.')
    }
  }

  if (name.includes('hidrocef') || name.includes('malform')) {
    if (patient.lifeStage === 'pediatric') {
      scoreDelta += 18
      reasons.push('Paciente jovem aumenta a chance de malformacao/hidrocefalia.')
    } else {
      scoreDelta -= 12
      reasons.push('Faixa etaria atual torna malformacao menos provavel como principal hipotese.')
    }
  }

  if (name.includes('tiamina') || name.includes('carencial')) {
    const notes = normalizeText(caseState?.complaint?.contextNotes)
    if (notes.includes('dieta') || notes.includes('anorex') || notes.includes('inapet') || notes.includes('vomit')) {
      scoreDelta += 10
      reasons.push('Historia nutricional ou de inapetencia aumenta suspeita de encefalopatia carencial.')
    } else {
      scoreDelta -= 14
      reasons.push('Sem contexto nutricional compatível, encefalopatia carencial perde prioridade relativa.')
    }
  }

  return {
    scoreDelta,
    reasons: unique(reasons),
  }
}

function canonicalDiagnosisName(name: string): string {
  const rawName = String(name || '').toLowerCase()
  if (/\bmuo\b/.test(rawName) || rawName.includes('meningoencefalite de origem desconhecida')) {
    return 'muo'
  }
  if (rawName.includes('encefalopatia metabolica')) {
    return 'encefalopatia metabolica'
  }

  let normalized = normalizeText(name)
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\bsuspeita clinica\b/g, ' ')
    .replace(/\bsindrome\b/g, ' ')
    .replace(/\bprovavel\b/g, ' ')
    .replace(/\bidiopatica\b/g, ' ')
    .replace(/\bde origem desconhecida\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (normalized.includes('avc') || normalized.includes('evento vascular')) {
    return 'evento vascular encefalico'
  }
  if (normalized.includes('neoplasia intracraniana') || normalized.includes('meningioma')) {
    return 'neoplasia intracraniana'
  }
  if (normalized.includes('glioma')) {
    return 'glioma'
  }
  if (normalized.includes('encefalopatia hepatica')) {
    return 'encefalopatia hepatica'
  }
  if (normalized.startsWith('encefalopatia metabolica')) {
    return 'encefalopatia metabolica'
  }
  if (normalized.includes('hipertensao intracraniana') || normalized.includes('herniacao')) {
    return 'hipertensao intracraniana'
  }
  if (
    normalized.includes('muo') ||
    normalized.includes('meningoencefalite de origem desconhecida') ||
    (normalized.includes('meningoencefalite') && normalized.includes('origem desconhecida'))
  ) {
    return 'muo'
  }

  return normalized
}

function overlapsWithAnyAxis(entryAxes: NeuroAxis[], axesToMatch: NeuroAxis[]): boolean {
  return entryAxes.some((axis) => axesToMatch.includes(axis))
}

function scoreTemporalMatch(
  onset: string,
  course: string,
  temporalPattern: HistoryData['temporalPattern'],
  evolutionPattern: HistoryData['evolutionPattern'],
): number {
  const onsetText = normalizeText(onset)
  const courseText = normalizeText(course)
  let score = 0

  if (temporalPattern) {
    const temporal = normalizeText(temporalPattern)
    if (
      (temporal === 'peragudo' && /peracute|acute/.test(onsetText)) ||
      (temporal === 'agudo' && /acute|subacute/.test(onsetText)) ||
      (temporal === 'subagudo' && /subacute|acute_or_subacute/.test(onsetText)) ||
      (temporal === 'cronico' && /chronic|young_or_adult|acute_or_chronic/.test(onsetText)) ||
      (temporal === 'episodico' && /episodic|variable/.test(onsetText))
    ) {
      score += 10
    } else if (!/variable/.test(onsetText)) {
      score -= 5
    }
  }

  if (evolutionPattern) {
    const evolution = normalizeText(evolutionPattern)
    if (
      (evolution === 'progressivo' && /progressive/.test(courseText)) ||
      (evolution === 'flutuante' && /fluctuating|intermittent|progressive_or_intermittent/.test(courseText)) ||
      (evolution === 'melhorando' && /improving|improving_with_treatment|non_progressive/.test(courseText)) ||
      (evolution === 'melhora_parcial' && /improving|intermittent|non_progressive/.test(courseText)) ||
      (evolution === 'estatico' && /static|non_progressive/.test(courseText)) ||
      (evolution === 'assintomatico_entre_episodios' &&
        /intermittent|episodic|variable|non_progressive/.test(courseText))
    ) {
      score += 8
    } else if (!/variable/.test(courseText)) {
      score -= 4
    }
  }

  return score
}

function scoreKeyFeatureMatch(entry: AnalysisDiseaseCatalogEntry, caseState: any, patient: PatientData): { scoreDelta: number; reasons: string[] } {
  const reasons: string[] = []
  let scoreDelta = 0

  const seizures = hasComplaint(caseState, 'ConvulsaoFocal', 'ConvulsaoGeneralizada', 'ClusterConvulsoes')
  const circling = hasComplaint(caseState, 'AndarCirculos')
  const blindness = hasComplaint(caseState, 'Cegueira')
  const alteredMentation = hasComplaint(caseState, 'AlteracaoConsciencia', 'Comportamento')
  const vestibular = hasComplaint(caseState, 'HeadTilt', 'Vertigem', 'Nistagmo')
  const weakness = hasComplaint(caseState, 'Paresia', 'Tetraparesia', 'Paraparesia', 'FraquezaFlacida')
  const dysphagia = hasComplaint(caseState, 'Disfagia', 'Disfonia')
  const facial = hasComplaint(caseState, 'DisfuncaoFacial')
  const cervicalPain = normalizeText(caseState?.neuroExam?.pain_cervical)
  const thoracolumbarPain = normalizeText(caseState?.neuroExam?.pain_thoracolumbar)
  const notAmbulatory = normalizeText(caseState?.neuroExam?.ambulation).includes('nao ambulatorio')
  const featureBlob = normalizeText(entry.keyFeatures.join(' '))

  if (seizures && /convuls|crises/.test(featureBlob)) {
    scoreDelta += 10
    reasons.push('O padrao de crises do caso coincide com os achados classicos descritos para essa doenca.')
  }
  if (circling && /circul|head pressing|comportament/.test(featureBlob)) {
    scoreDelta += 8
    reasons.push('Andar em circulos ou alteracao comportamental reforca o encaixe sindromico.')
  }
  if (blindness && /cegueira|ameaca|visual/.test(featureBlob)) {
    scoreDelta += 8
    reasons.push('Sinal visual central compativel com a apresentacao descrita para essa hipotese.')
  }
  if (alteredMentation && /menta|conscien|depress/.test(featureBlob)) {
    scoreDelta += 7
    reasons.push('A alteracao de mentacao/comportamento conversa com o fenotipo esperado.')
  }
  if (vestibular && /vestib|nistagm|head tilt|vertigem/.test(featureBlob)) {
    scoreDelta += 7
    reasons.push('Os sinais vestibulares registrados aproximam o caso desse diferencial.')
  }
  if (weakness && /fraquez|pares|pleg|ataxia/.test(featureBlob)) {
    scoreDelta += 6
    reasons.push('Fraqueza, paresia ou ataxia presentes no exame sustentam essa possibilidade.')
  }
  if ((dysphagia || facial) && /disfagia|regurg|facial|mandibula|megaesof|bulbar/.test(featureBlob)) {
    scoreDelta += 7
    reasons.push('Disfuncao bulbar ou de nervos cranianos aumenta a compatibilidade clinica.')
  }
  if (cervicalPain && /dor cervical|cervical/.test(featureBlob)) {
    scoreDelta += 7
    reasons.push('Dor cervical e um achado de apoio para essa etiologia.')
  }
  if (thoracolumbarPain && /dor|disco|mielo|espinhal/.test(featureBlob)) {
    scoreDelta += 5
    reasons.push('Dor espinhal registrada deve ser ponderada a favor dessa hipotese.')
  }
  if (notAmbulatory && /nao ambul|tetrap|parapares|fraquez/.test(featureBlob)) {
    scoreDelta += 5
    reasons.push('A perda de ambulatoriedade aumenta a urgencia e a plausibilidade desse quadro.')
  }
  if (patient.lifeStage === 'geriatric' && /idoso|geriatr/.test(featureBlob)) {
    scoreDelta += 5
    reasons.push('A faixa etaria geriatrica entra no perfil epidemiologico descrito.')
  }
  if (patient.lifeStage === 'pediatric' && /jovem|filhote|congen|young/.test(featureBlob)) {
    scoreDelta += 5
    reasons.push('A idade jovem favorece essa doenca dentre os diferenciais cadastrados.')
  }

  return { scoreDelta, reasons: unique(reasons) }
}

function mapPriorityTestToDiagnostic(
  testCode: string,
  axis: NeuroAxis,
  diagnosisName: string,
  index: number,
): Differential['diagnostics'][number] {
  const priority: 'ALTA' | 'MEDIA' | 'BAIXA' =
    index === 0 || ['stabilize_first', 'public_health_protocol', 'clinical_monitoring'].includes(testCode) ? 'ALTA' : index <= 2 ? 'MEDIA' : 'BAIXA'

  const defaults = {
    test: testCode.replace(/_/g, ' '),
    whatItAdds: `Ajuda a confirmar ou refutar ${diagnosisName}`,
    expectedFindings: 'Achados dependem do estagio clinico e do eixo neurologico envolvido',
    limitations: 'Interpretacao depende do contexto clinico e pode exigir correlacao com imagem ou reavaliacao seriada',
  }

  const mapped: Record<string, Omit<Differential['diagnostics'][number], 'priority'>> = {
    bloodwork: {
      test: 'Hemograma e bioquimica serica completa',
      whatItAdds: 'Pesquisa inflamacoes sistemicas, funcao renal/hepatica e pistas metabolicas que mudam conduta no plantao',
      expectedFindings: 'Pode revelar azotemia, hepatopatia, inflamacoes, proteinas alteradas ou marcadores de doenca sistemica',
      limitations: 'Pode ser pouco especifico para definir a etiologia neurologica isoladamente',
    },
    electrolytes: {
      test: 'Painel de eletrolitos e calcio ionizado',
      whatItAdds: 'Identifica disturbios de sodio, potassio ou calcio que explicam crises, fraqueza ou alteracao de mentacao',
      expectedFindings: 'Hipo ou hipernatremia, hipocalcemia ou hipocalemia em graus compatveis com o quadro',
      limitations: 'Alteracoes discretas nem sempre justificam todos os deficits neurologicos',
    },
    glucose: {
      test: 'Glicemia imediata e seriada',
      whatItAdds: 'Confirma ou afasta hipoglicemia como causa de crise, colapso ou rebaixamento',
      expectedFindings: 'Hipoglicemia ou flutuacao glicemica relevante',
      limitations: 'Normalizacao apos suporte pode mascarar o disturbiometabolico inicial',
    },
    MRI: {
      test: axis.startsWith('MEDULA_') || axis === 'CAUDA_EQUINA' ? 'Ressonancia magnetica da coluna' : 'Ressonancia magnetica do encefalo',
      whatItAdds: 'Melhor exame para definir topografia, extensao e padrao de lesao neurologica',
      expectedFindings: 'Lesao expansiva, inflamatoria, vascular, compressiva ou infiltrativa conforme a hipotese',
      limitations: 'Requer anestesia, disponibilidade e estabilidade clinica para transporte',
    },
    MRI_if_atypical: {
      test: 'Ressonancia magnetica se apresentacao atipica',
      whatItAdds: 'Busca lesoes estruturais quando a evolucao nao segue o padrao classico',
      expectedFindings: 'Imagem normal ou achados estruturais que redirecionam o diagnostico',
      limitations: 'Nem sempre e o primeiro exame a mudar conduta no plantao',
    },
    CT: {
      test: 'Tomografia computadorizada',
      whatItAdds: 'Ajuda a detectar lesoes osseas, hemorragia, mineralizacao discal ou massa intracraniana',
      expectedFindings: 'Compressao ossea, fratura, massa ou hemorragia mais grosseira',
      limitations: 'Inferior a RM para parenquima e medula espinhal',
    },
    CSF: {
      test: 'Analise do liquido cefalorraquidiano',
      whatItAdds: 'Pesquisa inflamacao, infeccao, aumento proteico e ajuda a diferenciar encefalites ou meningites',
      expectedFindings: 'Pleocitose, hiperproteinorraquia ou achados compativeis com processo inflamatorio/infeccioso',
      limitations: 'Exige cautela se houver risco de hipertensao intracraniana ou herniacao',
    },
    bile_acids: {
      test: 'Acidos biliares e perfil hepatico',
      whatItAdds: 'Fortalece suspeita de encefalopatia hepatica ou shunt portossistemico',
      expectedFindings: 'Acidos biliares elevados e alteracoes bioquimicas hepato-biliares',
      limitations: 'Pode sofrer influencia de dieta, amostragem e estabilidade clinica',
    },
    history_exposure: {
      test: 'Investigacao de exposicao toxica e medicamentosa',
      whatItAdds: 'Muitas intoxicacoes sao presumidas por historia e evolucao temporal',
      expectedFindings: 'Contato com ectoparasiticidas, moluscicidas, alimentos ou farmacos neurotoxicos',
      limitations: 'Depende da qualidade da anamnese e da percepcao do tutor',
    },
    blood_pressure: {
      test: 'Pressao arterial sistemica seriada',
      whatItAdds: 'Esclarece risco vascular e encefalopatia hipertensiva, alem de guiar tratamento seguro',
      expectedFindings: 'Hipertensao sustentada ou labilidade relevante',
      limitations: 'Dor, estresse e tecnica podem interferir no resultado',
    },
    coagulation: {
      test: 'Coagulograma',
      whatItAdds: 'Avalia risco de hemorragia, trombose e coagulopatias associadas a mielo ou encefalopatia vascular',
      expectedFindings: 'Alteracoes de TP, TTPA, fibrinogenio ou plaquetas compativeis com coagulopatia',
      limitations: 'Nao localiza a lesao neurologica por si so',
    },
    radiography: {
      test: 'Radiografias direcionadas',
      whatItAdds: 'Triagem de fratura, disco mineralizado, discospondilite, massas ou alteracoes toracicas associadas',
      expectedFindings: 'Alteracoes osseas, espacos discais anormais ou sinais de doenca sistemica associada',
      limitations: 'Baixa sensibilidade para tecido neural e lesoes parenquimatosas',
    },
    imaging: {
      test: 'Imagem avancada (TC ou RM)',
      whatItAdds: 'Define se ha lesao estrutural e orienta coleta de LCR ou cirurgia',
      expectedFindings: 'Achado estrutural ou ausencia de lesao grosseira que redireciona o caso',
      limitations: 'Escolha do metodo depende de disponibilidade e da principal suspeita',
    },
    imaging_if_needed: {
      test: 'Imagem se a evolucao nao for tipica ou houver deficit assimetrico importante',
      whatItAdds: 'Ajuda a separar lesao estrutural de doenca periferica presumida',
      expectedFindings: 'Pode confirmar massa, compressao ou lesao plexual/radicular',
      limitations: 'Nem sempre muda a primeira conduta do plantao',
    },
    otoscopy: {
      test: 'Otoscopia detalhada e avaliacao otologica',
      whatItAdds: 'Pesquisa otite media/interna, polipo ou causa otogenica do vestibular/facial',
      expectedFindings: 'Alteracoes de canal, membrana timpanica, secrecao ou dor otica',
      limitations: 'Pode exigir sedacao e nao avalia toda a bula timpanica',
    },
    rule_out_otitis: {
      test: 'Triagem para excluir otite media/interna',
      whatItAdds: 'Separa sindrome vestibular idiopatica de causa otogenica tratavel',
      expectedFindings: 'Otoscopia normal e ausencia de dor otica favorecem quadro idiopatico',
      limitations: 'Exclusao incompleta sem imagem quando a suspeita persiste',
    },
    chest_xray: {
      test: 'Radiografia toracica',
      whatItAdds: 'Pesquisa aspiracao, megaesofago, timoma ou metastases que mudam anestesia e tratamento',
      expectedFindings: 'Megaesofago, padrao aspirativo, massa mediastinal ou metastase',
      limitations: 'Nao explica sozinho a topografia neurologica',
    },
    thoracic_radiograph: {
      test: 'Radiografia toracica',
      whatItAdds: 'Importante em doencas neuromusculares para megaesofago, aspiracao e timoma',
      expectedFindings: 'Megaesofago, pneumonia aspirativa ou massa mediastinal',
      limitations: 'Pode ser normal em fases iniciais',
    },
    thoracic_radiograph_if_needed: {
      test: 'Radiografia toracica se houver fraqueza respiratoria ou suspeita de aspiracao',
      whatItAdds: 'Documenta complicacoes toracicas e ajuda a estratificar risco anestesico',
      expectedFindings: 'Pneumonia aspirativa ou alteracoes ventilatorias',
      limitations: 'Baixo rendimento se o exame respiratorio for completamente normal',
    },
    AChR_Ab: {
      test: 'Anticorpo anti-receptor de acetilcolina',
      whatItAdds: 'Exame de maior especificidade para miastenia gravis adquirida',
      expectedFindings: 'Titulo elevado compativel com miastenia',
      limitations: 'Pode haver falso-negativo precoce e o resultado nao e imediato',
    },
    EMG: {
      test: 'Eletromiografia',
      whatItAdds: 'Diferencia neuropatia, miopatia e disturbo de juncao neuromuscular',
      expectedFindings: 'Atividade espontanea anormal ou padrao compativel com doenca periferica',
      limitations: 'Requer anestesia e especialista',
    },
    nerve_conduction: {
      test: 'Estudo de conducao nervosa',
      whatItAdds: 'Quantifica comprometimento de nervo periferico e polirradiculoneuropatias',
      expectedFindings: 'Reducao de velocidade, amplitude ou bloqueio de conducao',
      limitations: 'Disponibilidade limitada e interpretacao especializada',
    },
    CK: {
      test: 'Creatina quinase (CK)',
      whatItAdds: 'Ajuda a detectar dano muscular e sustenta miopatias inflamatórias ou iatrogênicas',
      expectedFindings: 'CK elevada em miopatia ativa ou miosite',
      limitations: 'Pode ser normal em fases cronicas ou subir por contencao e injeccao IM',
    },
    muscle_biopsy: {
      test: 'Biopsia muscular',
      whatItAdds: 'Define miopatia inflamatoria, distrofica ou necrotizante',
      expectedFindings: 'Inflamacao, necrose, fibrose ou alteracoes estruturais especificas',
      limitations: 'Invasiva, exige local adequado e interpretacao histopatologica',
    },
    biopsy_if_needed: {
      test: 'Biopsia direcionada se os exames iniciais mantiverem alta suspeita',
      whatItAdds: 'Confirma processos musculares ou infiltrativos quando exames menos invasivos nao fecham o caso',
      expectedFindings: 'Achados histopatologicos compativeis com a doenca suspeita',
      limitations: 'Nao costuma ser o primeiro passo no plantao',
    },
    neurologic_exam: {
      test: 'Exame neurologico seriado e lateralizacao detalhada',
      whatItAdds: 'Muitos quadros perifericos/radiculares sao firmados pela distribuicao do deficit',
      expectedFindings: 'Assimetria, dor radicular, padrao LMN ou piora localizada',
      limitations: 'Depende da experiencia do examinador e da colaboracao do paciente',
    },
    infectious_panel: {
      test: 'Painel infeccioso dirigido',
      whatItAdds: 'Ajuda a separar etiologias inflamatórias estereis de agentes infecciosos trataveis',
      expectedFindings: 'Sorologia, PCR ou antigenemia compativeis com infeccao ativa',
      limitations: 'Nem sempre diferencia exposicao previa de doenca ativa',
    },
    serology_pcr: {
      test: 'Sorologia e/ou PCR para agentes neuroinfecciosos',
      whatItAdds: 'Pesquisa Toxoplasma, Neospora, Ehrlichia e outros agentes conforme regiao e especie',
      expectedFindings: 'Titulos altos, PCR positivo ou perfil compativel com infeccao ativa',
      limitations: 'Resultados podem exigir correlacao com LCR, imagem e quadro clinico',
    },
    antigen_test: {
      test: 'Teste antigenico especifico',
      whatItAdds: 'Pode oferecer forte evidencia etiologica em micoses ou infeccoes selecionadas',
      expectedFindings: 'Antigenemia positiva compativel com o agente suspeito',
      limitations: 'A sensibilidade varia com carga fúngica, local da amostra e doenca em questao',
    },
    culture: {
      test: 'Cultura e amostras microbiologicas',
      whatItAdds: 'Direciona antibiótico e confirma discospondilite ou meningomielite infecciosa',
      expectedFindings: 'Isolamento bacteriano/fungico ou inflamação supurativa compatível',
      limitations: 'Tempo de resultado maior e baixa sensibilidade apos antibiótico previo',
    },
    fundoscopy: {
      test: 'Fundoscopia',
      whatItAdds: 'Pesquisa retinopatia hipertensiva e dano de orgao alvo em suspeita vascular',
      expectedFindings: 'Hemorragias, descolamento de retina ou tortuosidade vascular',
      limitations: 'Exame normal nao exclui encefalopatia hipertensiva',
    },
    tick_search: {
      test: 'Busca sistematica por carrapatos e ectoparasitas',
      whatItAdds: 'Pode praticamente resolver o diagnostico em paralisia por carrapato',
      expectedFindings: 'Carrapato aderido em regioes pouco examinadas',
      limitations: 'Resultado negativo nao exclui se houve remocao recente',
    },
    T4: {
      test: 'T4 total ou livre',
      whatItAdds: 'Ajuda a avaliar hipotireoidismo em neuropatias periféricas de caes',
      expectedFindings: 'T4 reduzido em contexto compativel',
      limitations: 'Doenca nao tireoidiana e medicamentos interferem no resultado',
    },
    TSH: {
      test: 'TSH canino',
      whatItAdds: 'Complementa investigacao de hipotireoidismo quando associado ao T4',
      expectedFindings: 'TSH elevado em parte dos pacientes hipotireoideos',
      limitations: 'Sensibilidade moderada; pode ser normal mesmo na doenca',
    },
    fructosamine: {
      test: 'Frutosamina',
      whatItAdds: 'Ajuda a documentar controle glicemico cronico em suspeita de neuropatia diabetica',
      expectedFindings: 'Valor elevado em hiperglicemia sustentada',
      limitations: 'Nao substitui correlacao com clinica e glicemias seriadas',
    },
    genetic_test_if_needed: {
      test: 'Teste genetico se o contexto epidemiologico justificar',
      whatItAdds: 'Pode apoiar mielopatia degenerativa em racas predispostas apos excluir compressao',
      expectedFindings: 'Genotipo de risco ou predisposicao',
      limitations: 'Nao confirma sozinho a causa dos deficits neurologicos',
    },
    special_testing: {
      test: 'Teste especializado',
      whatItAdds: 'Necessario para doencas congenitas ou raras quando o padrao clinico for muito sugestivo',
      expectedFindings: 'Achado confirmatorio especifico da sindrome',
      limitations: 'Baixa disponibilidade e pouco impacto na conduta inicial do plantao',
    },
    specialist_testing: {
      test: 'Teste especializado',
      whatItAdds: 'Necessario para doencas congenitas ou raras quando o padrao clinico for muito sugestivo',
      expectedFindings: 'Achado confirmatorio especifico da sindrome',
      limitations: 'Baixa disponibilidade e pouco impacto na conduta inicial do plantao',
    },
    clinical_monitoring: {
      test: 'Monitorizacao neurologica e respiratoria seriada',
      whatItAdds: 'Fundamental em sindromes que pioram rapidamente e podem subir no neuroeixo',
      expectedFindings: 'Progressao cranial de reflexos, dor, sensibilidade ou ventilacao',
      limitations: 'Nao substitui imagem quando a decisao cirurgica esta em jogo',
    },
    stabilize_first: {
      test: 'Estabilizar antes de aprofundar a investigacao',
      whatItAdds: 'Algumas emergencias exigem controle de perfusao, ventilacao e PIC antes da etiologia definitiva',
      expectedFindings: 'Melhora ou estabilizacao clinica suficiente para seguir com imagem',
      limitations: 'Nao fornece etiologia final; e uma etapa de seguranca',
    },
    public_health_protocol: {
      test: 'Acionar protocolo de saude publica e biosseguranca',
      whatItAdds: 'Essencial quando ha risco zoonotico e necessidade de fluxo institucional especifico',
      expectedFindings: 'Encaminhamento e medidas legais/sanitarias adequadas',
      limitations: 'Nao substitui confirmacao laboratorial oficial',
    },
    rule_out_other: {
      test: 'Exclusao sistematica de causas estruturais e metabolicas',
      whatItAdds: 'Necessaria quando o diagnostico e de exclusao ou sindromico',
      expectedFindings: 'Ausencia de achados que expliquem melhor o quadro',
      limitations: 'Exige sequencia logica de exames e reavaliacao',
    },
    rule_out_toxins: {
      test: 'Triagem para toxicos e iatrogenias',
      whatItAdds: 'Diferencia polineuropatias inflamatórias de toxicos ou exposicoes reversiveis',
      expectedFindings: 'Historia negativa ou positiva que reposiciona o ranking',
      limitations: 'Depende de anamnese detalhada e do ambiente do paciente',
    },
    basic_workup: {
      test: 'Triagem clinico-laboratorial basica',
      whatItAdds: 'Ajuda a descartar doenca sistemica antes de assumir quadro idiopatico',
      expectedFindings: 'Exames basicos sem alteracao clinicamente relevante',
      limitations: 'Nao substitui imagem quando ha sinais centrais associados',
    },
    '2M_antibody': {
      test: 'Anticorpo anti-fibras 2M',
      whatItAdds: 'Exame de maior apoio para miosite dos musculos mastigatorios',
      expectedFindings: 'Titulo positivo compativel com MMM',
      limitations: 'Pode ser negativo em fases muito iniciais ou cronicas',
    },
    history_medications: {
      test: 'Revisao detalhada de medicacoes em uso',
      whatItAdds: 'Identifica neuropatia ou miopatia iatrogenica por corticoide e outros fármacos',
      expectedFindings: 'Uso prolongado ou recente de medicacoes potencialmente neurotoxico-musculares',
      limitations: 'Depende de historia fidedigna e cronologia correta',
    },
  }

  return {
    priority,
    ...(mapped[testCode] || defaults),
  }
}

function buildCatalogDiagnostics(
  entry: AnalysisDiseaseCatalogEntry,
  localization: { primary: NeuroAxis; secondary?: NeuroAxis[] },
): Differential['diagnostics'] {
  const axis = entry.axes.includes(localization.primary) ? localization.primary : entry.axes[0] || localization.primary
  const diagnostics = entry.priorityTests
    .slice(0, 4)
    .map((testCode, index) => mapPriorityTestToDiagnostic(testCode, axis, entry.name, index))

  if (diagnostics.length === 0) {
    return getDiagnosticsForCategory(entry.category, localization.primary)
  }

  return diagnostics
}

function buildCatalogDifferential(
  entry: AnalysisDiseaseCatalogEntry,
  score: number,
  patient: PatientData,
  localization: { primary: NeuroAxis; secondary?: NeuroAxis[] },
  reasons: string[],
): Differential {
  const why = unique([
    ...reasons,
    ...entry.keyFeatures.slice(0, 3).map((feature) => `Achado classico descrito para a doenca: ${feature}`),
    `Topografia compativel com ${getAxisLabel(localization.primary)}`,
    entry.evidenceLevel === 'ADVANCED_REQUIRED'
      ? 'Costuma exigir confirmacao por imagem, LCR ou teste especifico.'
      : 'Pode ser fortemente sustentada por exame clinico e exames basicos bem hierarquizados.',
  ]).slice(0, 6)

  return {
    id: entry.id,
    name: entry.name,
    category: entry.category,
    likelihood: Math.max(1, Math.round(score)),
    why,
    diagnostics: buildCatalogDiagnostics(entry, localization),
    treatment: getTreatmentForCategory(entry.category, patient.comorbidities, entry.name),
  }
}

function getAxisMatchScore(entryAxes: NeuroAxis[], primaryAxis: NeuroAxis, secondaryAxes: NeuroAxis[]): number {
  if (entryAxes.includes(primaryAxis)) {
    return 24
  }
  if (
    primaryAxis === 'MULTIFOCAL_OU_DIFUSA' &&
    secondaryAxes.length > 0 &&
    entryAxes.some((axis) => secondaryAxes.includes(axis))
  ) {
    return 18
  }
  if (entryAxes.includes('MULTIFOCAL_OU_DIFUSA') && secondaryAxes.length > 0) {
    return 16
  }
  if (entryAxes.some((axis) => secondaryAxes.includes(axis))) {
    return 14
  }
  return 0
}

function addOrReplaceDifferential(results: Differential[], candidate: Differential): void {
  const key = canonicalDiagnosisName(candidate.name)
  const index = results.findIndex((item) => canonicalDiagnosisName(item.name) === key)

  if (index < 0) {
    results.push(candidate)
    return
  }

  const existing = results[index]
  const existingBroad = existing.id.startsWith('ddx_syn_')
  const candidateBroad = candidate.id.startsWith('ddx_syn_')

  if (
    candidate.likelihood > existing.likelihood + 3 ||
    (existingBroad && !candidateBroad) ||
    existing.id.startsWith('diferencial_amplo_')
  ) {
    results[index] = candidate
  }
}

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

  const secondaryAxes = neuroLocalization.secondary || []
  const axesToMatch = unique([neuroLocalization.primary, ...secondaryAxes]) as NeuroAxis[]
  const results: Differential[] = []

  const libraryAxes = axesToMatch.filter((axis) => hasLibraryForAxis(axis))
  if (libraryAxes.length > 0) {
    const libraryDifferentials = libraryAxes.flatMap((axis) =>
      getDifferentialsFromLibrary(axis).map((loaded) => ({ loaded, sourceAxis: axis })),
    )

    const scoredLibrary = libraryDifferentials.map(({ loaded, sourceAxis }) => {
      let score = 64
      score += getAxisMatchScore(loaded.compatibleAxes, neuroLocalization.primary, secondaryAxes)

      if (
        history.temporalPattern &&
        loaded.rules.course.map((c) => c.toLowerCase()).includes(history.temporalPattern.toLowerCase())
      ) {
        score += 10
      }

      if (
        patient.species &&
        loaded.rules.species.map((s) => s.toLowerCase()).includes(patient.species.toUpperCase().substring(0, 3))
      ) {
        score += 8
      } else if (patient.species && loaded.rules.species.length > 0) {
        score -= 8
      }

      if (
        patient.lifeStage &&
        loaded.rules.ageStages.map((a) => a.toLowerCase()).includes(patient.lifeStage.toLowerCase())
      ) {
        score += 6
      }

      if (history.redFlags.length > 0) {
        const matchingRedFlags = loaded.rules.redFlagsBoost.filter((rf) =>
          history.redFlags.some((h) => h.toLowerCase().includes(rf.toLowerCase())),
        )
        score += matchingRedFlags.length * 3
      }

      if (history.trauma && loaded.rules.redFlagsBoost.includes('inicio_agudo')) {
        score += 8
      }

      score += getComorbidityScoreBoost(patient.comorbidities, loaded.name)

      const clinicalContext = collectDiagnosisContext(
        loaded.name,
        caseState,
        patient,
        history,
        neuroLocalization.primary,
      )
      score += clinicalContext.scoreDelta

      if (sourceAxis !== neuroLocalization.primary) {
        score += 3
      }

      return {
        loaded,
        score,
        contextReasons: clinicalContext.reasons,
      }
    })

    scoredLibrary
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .forEach((item) => {
        const dx = convertToDifferential(item.loaded, patient, history)
        addOrReplaceDifferential(results, {
          ...dx,
          id:
            dx.id ||
            dx.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/\s+/g, '_').replace(/_+/g, '_'),
          why: unique([...item.contextReasons, ...dx.why]).slice(0, 6),
          likelihood: Math.max(1, Math.round(item.score)),
        })
      })
  }

  const catalogCandidates = ANALYSIS_DISEASE_CATALOG.filter((entry) => overlapsWithAnyAxis(entry.axes, axesToMatch))
  if (catalogCandidates.length > 0) {
    const scoredCatalog = catalogCandidates.map((entry) => {
      let score = entry.broadSyndrome ? 48 : 56
      score += getAxisMatchScore(entry.axes, neuroLocalization.primary, secondaryAxes)

      if (patient.species && entry.species.length > 0) {
        if (entry.species.includes(patient.species)) {
          score += 8
        } else {
          score -= 18
        }
      }

      score += scoreTemporalMatch(entry.onset, entry.course, history.temporalPattern, history.evolutionPattern)

      const featureContext = scoreKeyFeatureMatch(entry, caseState, patient)
      const clinicalContext = collectDiagnosisContext(
        entry.name,
        caseState,
        patient,
        history,
        neuroLocalization.primary,
      )

      score += featureContext.scoreDelta
      score += clinicalContext.scoreDelta
      score += getComorbidityScoreBoost(patient.comorbidities, entry.id)

      if (entry.evidenceLevel === 'CLINICAL_ONLY') score += 2
      if (entry.evidenceLevel === 'ADVANCED_REQUIRED') score -= 1

      return {
        entry,
        score,
        reasons: unique([...featureContext.reasons, ...clinicalContext.reasons]),
      }
    })

    scoredCatalog
      .sort((a, b) => b.score - a.score)
      .slice(0, 16)
      .forEach((item) => {
        addOrReplaceDifferential(
          results,
          buildCatalogDifferential(item.entry, item.score, patient, neuroLocalization, item.reasons),
        )
      })
  }

  if (results.length < 8) {
    const compatibleCandidates = DIFFERENTIAL_CANDIDATES.filter((candidate) =>
      candidate.axes.some((axis) => axesToMatch.includes(axis)),
    )

    const scored = compatibleCandidates.map((candidate) => {
      let score = candidate.baseScore

      if (candidate.axes.includes(neuroLocalization.primary)) {
        score *= 1.2
      }

      if (candidate.species && patient.species && !candidate.species.includes(patient.species)) {
        score *= 0.7
      }

      if (candidate.lifeStages && patient.lifeStage && !candidate.lifeStages.includes(patient.lifeStage)) {
        score *= 0.8
      }

      if (
        candidate.temporalPreference &&
        history.temporalPattern &&
        candidate.temporalPreference.includes(history.temporalPattern)
      ) {
        score *= 1.3
      } else if (candidate.temporalPreference && history.temporalPattern) {
        score *= 0.9
      }

      if (
        candidate.evolutionPreference &&
        history.evolutionPattern &&
        candidate.evolutionPreference.includes(history.evolutionPattern)
      ) {
        score *= 1.2
      }

      if (candidate.traumaBoost && history.trauma) {
        score *= 1.5
      }

      if (candidate.comorbidityBoost && candidate.comorbidityBoost.some((c) => patient.comorbidities.includes(c))) {
        score *= 1.3
      }

      score += getComorbidityScoreBoost(
        patient.comorbidities,
        candidate.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      )

      const clinicalContext = collectDiagnosisContext(
        candidate.name,
        caseState,
        patient,
        history,
        neuroLocalization.primary,
      )
      score += clinicalContext.scoreDelta

      return { candidate, score, contextReasons: clinicalContext.reasons }
    })

    const existingNames = new Set(results.map((r) => canonicalDiagnosisName(r.name)))
    const additional = scored
      .sort((a, b) => b.score - a.score)
      .filter((item) => !existingNames.has(canonicalDiagnosisName(item.candidate.name)))
      .slice(0, Math.max(0, 8 - results.length))
      .map((item) => {
        const dx = buildDifferential(item.candidate, item.score, patient, history, neuroLocalization)
        dx.why = unique([...item.contextReasons, ...dx.why]).slice(0, 5)
        return dx
      })

    additional.forEach((item) => addOrReplaceDifferential(results, item))
  }

  while (results.length < 5) {
    addOrReplaceDifferential(results, buildGenericDifferential(results.length + 1, neuroLocalization.primary))
  }

  const dedupedResults: Differential[] = []
  ;[...results]
    .sort((a, b) => b.likelihood - a.likelihood)
    .forEach((item) => addOrReplaceDifferential(dedupedResults, item))

  const rankedResults = [...dedupedResults].sort((a, b) => b.likelihood - a.likelihood)
  const topResults = rankedResults.slice(0, 12)
  const maxScore = topResults[0]?.likelihood || 100
  const minScore = topResults[topResults.length - 1]?.likelihood || 0
  const spread = Math.max(1, maxScore - minScore)

  return topResults.map((dx, index) => {
    const scaled =
      maxScore === minScore
        ? Math.max(40, 100 - index * 4)
        : Math.round(35 + ((dx.likelihood - minScore) / spread) * 65)

    return {
      ...dx,
      likelihood: Math.min(100, Math.max(10, scaled)),
    }
  })
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
    likelihood: Math.max(1, Math.round(score)),
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
  diagnosisName?: string,
): Differential['treatment'] {
  const cautions: string[] = []
  const normalizedDiagnosis = normalizeText(diagnosisName)

  const comorbKeys = Array.isArray(comorbidities)
    ? comorbidities.map((c: any) => normalizeText(typeof c === 'string' ? c : c.key || c)).filter(Boolean)
    : []

  if (
    comorbKeys.includes('renal') ||
    comorbKeys.includes('renopata') ||
    comorbKeys.includes('hepatica') ||
    comorbKeys.includes('hepatopata')
  ) {
    cautions.push('Ajustar doses conforme funcao renal e hepatica antes de escalar sedativos, anticonvulsivantes ou contraste.')
  }
  if (comorbKeys.includes('hepatic') || comorbKeys.includes('hepatica')) {
    cautions.push('Rever metabolizacao hepatica dos farmacos e evitar sobrecarga de sedacao em hepatopatas.')
  }
  if (comorbKeys.includes('cardiac') || comorbKeys.includes('hipertensao')) {
    cautions.push('Monitorar perfusao, pressao arterial e funcao cardiovascular durante estabilizacao e anestesia.')
  }
  if (comorbKeys.includes('pneumopata') || comorbKeys.includes('respiratoria')) {
    cautions.push('Reduzir risco de aspiracao e depressao respiratoria ao planejar analgesia, anticonvulsivantes e exames sob sedacao.')
  }

  const baseTreatment: Differential['treatment'] = [
    {
      phase: '0-6H',
      plan: ['Estabilizacao ABC e suporte clinico', 'Monitorizacao neurologica seriada', 'Analgesia multimodal se indicada'],
      cautions,
    },
    {
      phase: 'DEFINITIVO',
      plan: ['Tratar conforme diagnostico especifico', 'Reabilitacao neurologica e enfermagem direcionada', 'Monitorizacao continua e reavaliacao do prognostico'],
      cautions: [],
    },
  ]

  if (category === 'COMPRESSIVA') {
    baseTreatment[0].plan.unshift('Restringir manipulacao excessiva e proteger transporte ate definir necessidade de imagem ou cirurgia.')
    baseTreatment[1].plan.unshift('Avaliar necessidade de descompressao cirurgica ou intervencao mecanica.')
  }

  if (category === 'INFLAMATORIA' || category === 'INFECCIOSA') {
    baseTreatment[0].plan.unshift('Colher exames basicos e decidir imagem ou LCR antes de iniciar terapias que possam mascarar infeccao, quando o paciente estiver estavel.')
    baseTreatment[1].plan.unshift('Instituir terapia anti-inflamatoria, imunossupressora ou antimicrobiana conforme a causa mais sustentada.')
  }

  if (category === 'TOXICO_METABOLICA') {
    baseTreatment[0].plan.unshift('Corrigir glicose, eletrolitos, perfusao, oxigenacao e exposicoes toxicas nas primeiras horas.')
    baseTreatment[1].plan.unshift('Controlar a doenca sistemica primaria e prevenir novas descompensacoes metabolicas.')
  }

  if (category === 'VASCULAR') {
    baseTreatment[0].plan.unshift('Controlar pressao arterial, perfusao, oxigenacao e complicacoes secundarias enquanto define se ha evento vascular ou hemorragico.')
  }

  if (normalizedDiagnosis.includes('encefalopatia hepat')) {
    baseTreatment[0].plan.unshift('Priorizar correcao de precipitantes, lactulose quando indicada e escolha de anticonvulsivante com perfil mais seguro para hepatopatia.')
  }
  if (normalizedDiagnosis.includes('hipoglic')) {
    baseTreatment[0].plan.unshift('Tratar hipoglicemia imediatamente e instituir monitorizacao glicemica seriada.')
  }
  if (normalizedDiagnosis.includes('muo') || normalizedDiagnosis.includes('meningoencefalite')) {
    baseTreatment[1].plan.unshift('Se a infeccao estiver razoavelmente excluida, considerar imunossupressao protocolada e reavaliacao precoce da resposta clinica.')
  }
  if (
    normalizedDiagnosis.includes('neoplasia intracraniana') ||
    normalizedDiagnosis.includes('glioma') ||
    normalizedDiagnosis.includes('meningioma')
  ) {
    baseTreatment[0].plan.unshift('Se houver suspeita de hipertensao intracraniana, priorizar cabeceira elevada, oxigenacao e controle de crises enquanto organiza imagem.')
    baseTreatment[1].plan.unshift('Definir se o caso se beneficia de cirurgia, radioterapia, corticoterapia ou manejo paliativo estruturado.')
  }

  return baseTreatment
}
