export interface DifferentialDiagnosis {
  id: string
  name: string
  category: 'DAMNIT-V'
  weight: number
  agePreference: ('pediatric' | 'adult' | 'geriatric')[]
  speciesPreference: ('dog' | 'cat')[]
  coursePreference: (
    | 'peracute'
    | 'acute'
    | 'subacute'
    | 'chronic'
    | 'progressive'
    | 'episodic'
  )[]
  painExpected: boolean
  diagnostics: {
    firstLine: string[]
    advanced: string[]
    notes: string
  }
  treatment: {
    immediate: string[]
    definitive: string[]
    contraindications: string[]
  }
  prognosis: {
    withTreatment: string
    withoutTreatment: string
    factors: string[]
  }
  finalScore?: number
}

const baseDiagnostics = {
  firstLine: ['Exame neurológico completo', 'Hemograma e bioquímica'],
  advanced: ['Ressonância magnética', 'Líquor'],
  notes: 'Ajustar exames conforme disponibilidade e estabilidade do paciente.',
}

const baseTreatment = {
  immediate: ['Analgesia multimodal', 'Estabilização e suporte'],
  definitive: ['Tratar causa base conforme diagnóstico'],
  contraindications: ['Evitar AINEs em insuficiência renal'],
}

export const differentialsByLocation: Record<string, DifferentialDiagnosis[]> =
  {
    'Medula espinhal T3-L3': [
      {
        id: 'ivdd_hansen_i',
        name: 'Hérnia de Disco Hansen Tipo I',
        category: 'DAMNIT-V',
        weight: 0.4,
        agePreference: ['adult'],
        speciesPreference: ['dog'],
        coursePreference: ['peracute', 'acute'],
        painExpected: true,
        diagnostics: {
          ...baseDiagnostics,
          firstLine: [
            'Ressonância magnética (preferencial)',
            'Tomografia computadorizada',
            'Radiografias simples',
          ],
        },
        treatment: {
          ...baseTreatment,
          immediate: [
            'Restrição de movimento',
            'Analgesia potente',
            'Avaliar necessidade cirúrgica',
          ],
          definitive: ['Descompressão cirúrgica se indicado'],
        },
        prognosis: {
          withTreatment: 'Bom se dor profunda presente e cirurgia precoce.',
          withoutTreatment: 'Risco de progressão para plegia.',
          factors: ['Dor profunda', 'Tempo até intervenção'],
        },
      },
      {
        id: 'fce',
        name: 'Infarto Fibrocartilaginoso (FCE)',
        category: 'DAMNIT-V',
        weight: 0.2,
        agePreference: ['adult'],
        speciesPreference: ['dog'],
        coursePreference: ['peracute'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: {
          ...baseTreatment,
          immediate: ['Suporte e fisioterapia precoce'],
          definitive: ['Reabilitação neurológica'],
        },
        prognosis: {
          withTreatment: 'Variável; melhora nas primeiras semanas.',
          withoutTreatment: 'Recuperação parcial possível.',
          factors: ['Extensão da lesão', 'Fisioterapia precoce'],
        },
      },
    ],
    'Medula espinhal L4-S3': [
      {
        id: 'lmndisease',
        name: 'Lesão LMN Lombossacra',
        category: 'DAMNIT-V',
        weight: 0.3,
        agePreference: ['adult', 'geriatric'],
        speciesPreference: ['dog', 'cat'],
        coursePreference: ['acute', 'subacute'],
        painExpected: true,
        diagnostics: baseDiagnostics,
        treatment: baseTreatment,
        prognosis: {
          withTreatment: 'Reservado a bom conforme causa.',
          withoutTreatment: 'Progressão possível.',
          factors: ['Dor profunda', 'Etiologia'],
        },
      },
    ],
    'Sistema vestibular periférico': [
      {
        id: 'idiopathic_vestibular',
        name: 'Síndrome Vestibular Idiopática',
        category: 'DAMNIT-V',
        weight: 0.4,
        agePreference: ['geriatric'],
        speciesPreference: ['dog', 'cat'],
        coursePreference: ['acute'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: {
          ...baseTreatment,
          immediate: ['Anti-emético', 'Suporte', 'Hidratação'],
        },
        prognosis: {
          withTreatment: 'Bom, geralmente autolimitado.',
          withoutTreatment: 'Melhora espontânea comum.',
          factors: ['Idade', 'Comorbidades'],
        },
      },
    ],
    'Sistema vestibular central': [
      {
        id: 'central_vestibular',
        name: 'Doença Vestibular Central',
        category: 'DAMNIT-V',
        weight: 0.35,
        agePreference: ['adult', 'geriatric'],
        speciesPreference: ['dog', 'cat'],
        coursePreference: ['acute', 'subacute'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: baseTreatment,
        prognosis: {
          withTreatment: 'Reservado conforme etiologia.',
          withoutTreatment: 'Risco de progressão.',
          factors: ['Lesão de tronco encefálico'],
        },
      },
    ],
    Prosencéfalo: [
      {
        id: 'forebrain_neoplasia',
        name: 'Neoplasia intracraniana',
        category: 'DAMNIT-V',
        weight: 0.3,
        agePreference: ['geriatric'],
        speciesPreference: ['dog', 'cat'],
        coursePreference: ['chronic', 'progressive'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: baseTreatment,
        prognosis: {
          withTreatment: 'Reservado a bom dependendo do tipo tumoral.',
          withoutTreatment: 'Progressivo.',
          factors: ['Tipo tumoral', 'Localização'],
        },
      },
    ],
    'Tronco encefálico': [
      {
        id: 'brainstem_inflammatory',
        name: 'Encefalite/Inflamatória',
        category: 'DAMNIT-V',
        weight: 0.3,
        agePreference: ['adult'],
        speciesPreference: ['dog'],
        coursePreference: ['acute', 'subacute'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: baseTreatment,
        prognosis: {
          withTreatment: 'Variável.',
          withoutTreatment: 'Reservado.',
          factors: ['Resposta ao tratamento'],
        },
      },
    ],
    Cerebelo: [
      {
        id: 'cerebellar_degeneration',
        name: 'Degeneração Cerebelar',
        category: 'DAMNIT-V',
        weight: 0.2,
        agePreference: ['adult', 'geriatric'],
        speciesPreference: ['dog', 'cat'],
        coursePreference: ['chronic', 'progressive'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: baseTreatment,
        prognosis: {
          withTreatment: 'Reservado.',
          withoutTreatment: 'Progressivo.',
          factors: ['Progressão lenta'],
        },
      },
    ],
    'Nervos periféricos': [
      {
        id: 'polyneuropathy',
        name: 'Polineuropatia',
        category: 'DAMNIT-V',
        weight: 0.25,
        agePreference: ['adult', 'geriatric'],
        speciesPreference: ['dog', 'cat'],
        coursePreference: ['subacute', 'chronic'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: baseTreatment,
        prognosis: {
          withTreatment: 'Variável.',
          withoutTreatment: 'Progressivo.',
          factors: ['Etiologia de base'],
        },
      },
    ],
    'Multifocal/Difuso': [
      {
        id: 'multifocal',
        name: 'Doença Multifocal',
        category: 'DAMNIT-V',
        weight: 0.2,
        agePreference: ['adult', 'geriatric'],
        speciesPreference: ['dog', 'cat'],
        coursePreference: ['subacute', 'chronic'],
        painExpected: false,
        diagnostics: baseDiagnostics,
        treatment: baseTreatment,
        prognosis: {
          withTreatment: 'Variável.',
          withoutTreatment: 'Reservado.',
          factors: ['Causa sistêmica'],
        },
      },
    ],
  }

export function getDifferentialDiagnoses(
  location: string,
  species: 'dog' | 'cat',
  ageYears: number,
  course: DifferentialDiagnosis['coursePreference'][number],
  painPresent: boolean,
): (DifferentialDiagnosis & { finalScore?: number })[] {
  const list = differentialsByLocation[location] || []
  return list
    .map((dx) => {
      let score = dx.weight
      if (!dx.speciesPreference.includes(species)) score *= 0.6
      const ageGroup =
        ageYears < 1 ? 'pediatric' : ageYears > 8 ? 'geriatric' : 'adult'
      if (!dx.agePreference.includes(ageGroup)) score *= 0.7
      if (!dx.coursePreference.includes(course)) score *= 0.7
      if (dx.painExpected === painPresent) score *= 1.1
      return { ...dx, finalScore: score }
    })
    .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0))
}
