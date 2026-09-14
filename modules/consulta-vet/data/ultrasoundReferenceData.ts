export type UltrasoundSpecies = 'dog' | 'cat';
export type UltrasoundLifeStage = 'adult' | 'young';

export type UltrasoundOrganId =
  | 'liver'
  | 'gallbladder'
  | 'spleen'
  | 'kidneys'
  | 'stomach'
  | 'small-intestine'
  | 'colon'
  | 'pancreas'
  | 'adrenals'
  | 'bladder'
  | 'prostate'
  | 'uterus'
  | 'ovaries';

export type UltrasoundSourceId = 'thrall-8e' | 'bsava-ultrasonography-1e';

export type UltrasoundReferenceValue = {
  id: string;
  species: UltrasoundSpecies;
  lifeStage: UltrasoundLifeStage;
  measurement: string;
  population: string;
  weightBand: string;
  value: string;
  unit: string;
  technique: string;
  sourceId: UltrasoundSourceId;
  sourcePage: string;
  caution?: string;
};

type EvidenceGapKey = `${UltrasoundSpecies}:${UltrasoundLifeStage}`;

export type UltrasoundOrgan = {
  id: UltrasoundOrganId;
  name: string;
  description: string;
  values: UltrasoundReferenceValue[];
  evidenceGaps?: Partial<Record<EvidenceGapKey, string>>;
  cautions: string[];
};

export const ULTRASOUND_SOURCES: Record<
  UltrasoundSourceId,
  {
    shortTitle: string;
    title: string;
    edition: string;
    year: number;
    authors: string;
    scope: string;
  }
> = {
  'thrall-8e': {
    shortTitle: 'Thrall, 8ª ed.',
    title: 'Thrall’s Textbook of Veterinary Diagnostic Radiology',
    edition: '8ª edição',
    year: 2025,
    authors: 'Gabriela S. Seiler e Donald E. Thrall',
    scope: 'Capítulos 39–47; a página impressa e a página do PDF aparecem em cada linha.',
  },
  'bsava-ultrasonography-1e': {
    shortTitle: 'BSAVA Ultrasonography, 1ª ed.',
    title: 'BSAVA Manual of Canine and Feline Ultrasonography',
    edition: '1ª edição',
    year: 2011,
    authors: 'Frances Barr e Lorrie Gaschen (editoras)',
    scope: 'Capítulo 13, glândulas adrenais, p. 149 (PDF p. 161).',
  },
};

const NO_PEDIATRIC_REFERENCE =
  'Os livros consultados não fornecem um intervalo pediátrico generalizável para esta combinação. Não extrapole automaticamente a faixa adulta.';

export const ULTRASOUND_ORGANS: UltrasoundOrgan[] = [
  {
    id: 'liver',
    name: 'Fígado',
    description: 'Tamanho, margens e parênquima',
    values: [],
    evidenceGaps: {
      'dog:adult':
        'O tamanho hepático ao ultrassom é uma avaliação subjetiva, dependente da conformação, dos órgãos adjacentes e da experiência do operador; o capítulo não estabelece um corte linear universal.',
      'cat:adult':
        'O tamanho hepático ao ultrassom é uma avaliação subjetiva, dependente da conformação, dos órgãos adjacentes e da experiência do operador; o capítulo não estabelece um corte linear universal.',
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Avalie margens, ecotextura, vascularização e relação com órgãos adjacentes; uma medida isolada não define hepatomegalia.',
      'Fonte descritiva: Thrall, 8ª ed., Cap. 40, p. 812 (PDF p. 1019).',
    ],
  },
  {
    id: 'gallbladder',
    name: 'Vesícula biliar',
    description: 'Volume, parede e ducto biliar',
    values: [
      {
        id: 'dog-gallbladder-volume',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Volume da vesícula',
        population: 'Referência geral',
        weightBand: 'Indexado ao peso',
        value: '≤ 1',
        unit: 'mL/kg',
        technique: 'Fórmula elipsoide: comprimento × largura × altura × 0,52.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 812 (PDF p. 1019)',
      },
      {
        id: 'dog-gallbladder-wall',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Espessura da parede',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '1–2',
        unit: 'mm',
        technique: 'Parede fina e pouco distinta; medir perpendicularmente.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 814 (PDF p. 1021)',
        caution: 'Valor típico; o livro ressalta que uma faixa normal formal não foi estabelecida.',
      },
      {
        id: 'dog-common-bile-duct',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Ducto biliar comum',
        population: 'Quando visível',
        weightBand: 'Todos os pesos',
        value: '≤ 3',
        unit: 'mm',
        technique: 'Medir o diâmetro luminal em plano sem obliquidade.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 814 (PDF p. 1021)',
      },
      {
        id: 'cat-gallbladder-volume',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Volume da vesícula',
        population: 'Referência geral',
        weightBand: 'Sem associação aparente com peso',
        value: '≈ 2,4',
        unit: 'mL',
        technique: 'Volume estimado por medidas ortogonais.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 812 (PDF p. 1019)',
      },
      {
        id: 'cat-gallbladder-wall',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Espessura da parede',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '< 1',
        unit: 'mm',
        technique: 'Pode não ser visível; medir perpendicularmente quando definida.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 814 (PDF p. 1021)',
      },
      {
        id: 'cat-common-bile-duct',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Ducto biliar comum',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '≤ 4',
        unit: 'mm',
        technique: 'Seguir até a papila duodenal e evitar plano oblíquo.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 814 (PDF p. 1021)',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Jejum e anorexia podem distender a vesícula; tamanho e conteúdo devem ser interpretados com o contexto clínico.',
      'Lodo dependente pode ocorrer em animais sem sinais de doença biliar.',
    ],
  },
  {
    id: 'spleen',
    name: 'Baço',
    description: 'Altura e limites objetivos',
    values: [
      {
        id: 'cat-spleen-height-study-1',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Altura esplênica — estudo 1',
        population: 'Terço proximal, adjacente a veia esplênica',
        weightBand: 'Todos os pesos',
        value: '5,1–9,1 (média 7,1)',
        unit: 'mm',
        technique: 'Medir a altura no plano transversal no terço proximal.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 827 (PDF p. 1035)',
      },
      {
        id: 'cat-spleen-height-study-2',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Altura esplênica — estudo 2',
        population: 'Referência independente',
        weightBand: 'Todos os pesos',
        value: '5,3–11,1 (8,2 ± 1,4)',
        unit: 'mm',
        technique: 'Medida transversal comparável à altura esplênica.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 40, p. 827 (PDF p. 1035)',
      },
    ],
    evidenceGaps: {
      'dog:adult':
        'O baço canino não tem limite absoluto de tamanho no livro; posição, sedação, congestão e conformação alteram a aparência.',
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Os dois intervalos felinos vêm de estudos distintos e devem permanecer identificados, sem fundi-los em um único corte.',
      'Tamanho normal não exclui doença esplênica e nódulos incidentais podem ser benignos.',
    ],
  },
  {
    id: 'kidneys',
    name: 'Rins',
    description: 'Comprimento, pelve e Doppler',
    values: [
      {
        id: 'dog-kidney-length',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Comprimento renal máximo',
        population: 'Referência geral ampla',
        weightBand: 'Varia com peso e conformação',
        value: '3–10',
        unit: 'cm',
        technique: 'Maior polo a polo em plano sagital ou dorsal, sem obliquidade.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
        caution: 'Faixa ampla; a regra prática citada é 10 mm por 10 lb (≈4,5 kg). Não interpretar isoladamente.',
      },
      {
        id: 'dog-kidney-aorta-ratio',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Comprimento renal / diâmetro aórtico',
        population: 'Aorta medida no nível do rim',
        weightBand: 'Razão ajustada ao porte',
        value: '5,5–9,1',
        unit: 'razão',
        technique: 'Dividir o comprimento renal máximo pelo diâmetro luminal da aorta.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
      },
      {
        id: 'dog-renal-pelvis',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Líquido na pelve renal',
        population: 'Animal normal',
        weightBand: 'Todos os pesos',
        value: '≤ 2',
        unit: 'mm',
        technique: 'Avaliar em planos dorsal e transversal.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
        caution: 'Diurese, fluidoterapia e poliúria podem causar pielectasia discreta.',
      },
      {
        id: 'dog-renal-doppler',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Doppler renal — IR / IP',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: 'IR < 0,72 · IP < 1,52',
        unit: 'índices',
        technique: 'Amostragem Doppler intrarrenal com traçado adequado.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
      },
      {
        id: 'cat-kidney-length',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Comprimento renal máximo',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '3,0–4,3',
        unit: 'cm',
        technique: 'Maior polo a polo em plano sagital ou dorsal, sem obliquidade.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
      },
      {
        id: 'cat-renal-pelvis',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Líquido na pelve renal',
        population: 'Animal normal',
        weightBand: 'Todos os pesos',
        value: '≤ 2',
        unit: 'mm',
        technique: 'Avaliar em planos dorsal e transversal.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
        caution: 'Diurese, fluidoterapia e poliúria podem causar pielectasia discreta.',
      },
      {
        id: 'cat-renal-doppler',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Doppler renal — IR / IP',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: 'IR < 0,70 · IP < 1,29',
        unit: 'índices',
        technique: 'Amostragem Doppler intrarrenal com traçado adequado.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Comprimento renal tem grande sobreposição entre normalidade e doença; integre arquitetura, ecogenicidade e achados clínicos.',
    ],
  },
  {
    id: 'stomach',
    name: 'Estômago',
    description: 'Espessura total da parede',
    values: [
      {
        id: 'dog-stomach-wall',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Parede gástrica total',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '3–5',
        unit: 'mm',
        technique: 'Medir mucosa a serosa perpendicularmente; evitar pregas e contração.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 45, p. 946 (PDF p. 1192)',
      },
      {
        id: 'cat-stomach-wall',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Parede gástrica total',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '2–5',
        unit: 'mm',
        technique: 'Medir mucosa a serosa perpendicularmente; evitar pregas e contração.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 45, p. 946 (PDF p. 1192)',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Parede de estômago vazio e contraído pode parecer espessada; valores >6–7 mm foram propostos como anormais, mas não devem ser usados sem avaliar camadas e distensão.',
    ],
  },
  {
    id: 'small-intestine',
    name: 'Intestino delgado',
    description: 'Duodeno, jejuno e íleo',
    values: [
      ...[
        ['≤ 20 kg', '≤ 5,1', '≤ 4,1'],
        ['20–29,9 kg', '≤ 5,3', '≤ 4,4'],
        ['> 30 kg', '≤ 6,0', '≤ 4,7'],
      ].flatMap(([weightBand, duodenum, jejunum], index): UltrasoundReferenceValue[] => [
        {
          id: `dog-adult-duodenum-${index}`,
          species: 'dog',
          lifeStage: 'adult',
          measurement: 'Parede do duodeno',
          population: 'Cão adulto',
          weightBand,
          value: duodenum,
          unit: 'mm',
          technique: 'Mucosa a serosa, em segmento longitudinal para reduzir obliquidade.',
          sourceId: 'thrall-8e',
          sourcePage: 'Cap. 46, Tabela 46.2, p. 961 (PDF p. 1209)',
        },
        {
          id: `dog-adult-jejunum-${index}`,
          species: 'dog',
          lifeStage: 'adult',
          measurement: 'Parede do jejuno',
          population: 'Cão adulto',
          weightBand,
          value: jejunum,
          unit: 'mm',
          technique: 'Mucosa a serosa, em segmento longitudinal para reduzir obliquidade.',
          sourceId: 'thrall-8e',
          sourcePage: 'Cap. 46, Tabela 46.2, p. 961 (PDF p. 1209)',
        },
      ]),
      {
        id: 'dog-puppy-duodenum',
        species: 'dog',
        lifeStage: 'young',
        measurement: 'Parede do duodeno',
        population: 'Beagles, 7–12 semanas',
        weightBand: '2,3–5 kg',
        value: '3,8 ± 0,5 (3,2–4,8)',
        unit: 'mm',
        technique: 'Mucosa a serosa; referência pediátrica específica da amostra.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 46, Tabela 46.2, p. 961 (PDF p. 1209)',
        caution: 'Não generalizar automaticamente para outras raças, idades ou faixas de peso.',
      },
      {
        id: 'dog-puppy-jejunum',
        species: 'dog',
        lifeStage: 'young',
        measurement: 'Parede do jejuno',
        population: 'Beagles, 7–12 semanas',
        weightBand: '2,3–5 kg',
        value: '2,5 ± 0,5 (1,2–3,4)',
        unit: 'mm',
        technique: 'Mucosa a serosa; referência pediátrica específica da amostra.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 46, Tabela 46.2, p. 961 (PDF p. 1209)',
        caution: 'Não generalizar automaticamente para outras raças, idades ou faixas de peso.',
      },
      {
        id: 'cat-adult-duodenum',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Parede do duodeno',
        population: 'Gato adulto',
        weightBand: 'Todos os pesos',
        value: '1,78–2,51',
        unit: 'mm',
        technique: 'Mucosa a serosa; a espessura varia com a frequência do transdutor.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 46, Tabela 46.3, p. 961 (PDF p. 1209)',
      },
      {
        id: 'cat-adult-jejunum',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Parede do jejuno',
        population: 'Gato adulto',
        weightBand: 'Todos os pesos',
        value: '1,96–2,67',
        unit: 'mm',
        technique: 'Mucosa a serosa; a espessura varia com a frequência do transdutor.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 46, Tabela 46.3, p. 961 (PDF p. 1209)',
      },
      {
        id: 'cat-adult-ileum',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Parede do íleo',
        population: 'Gato adulto',
        weightBand: 'Todos os pesos',
        value: '2,50–3,59',
        unit: 'mm',
        technique: 'Mucosa a serosa; identificar a transição ileocólica.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 46, Tabela 46.3, p. 961 (PDF p. 1209)',
      },
    ],
    evidenceGaps: {
      'cat:young':
        'A tabela pediátrica localizada é exclusiva de cães Beagle de 7–12 semanas e 2,3–5 kg. Não foi encontrado intervalo equivalente para gatos jovens no capítulo.',
    },
    cautions: [
      'Preservação das camadas, motilidade e sinais clínicos importam tanto quanto a espessura total.',
      'Alimentação recente altera a ecogenicidade mucosa; o consenso citado pelo livro recomenda medida longitudinal.',
    ],
  },
  {
    id: 'colon',
    name: 'Cólon',
    description: 'Espessura da parede',
    values: (['dog', 'cat'] as const).map((species) => ({
      id: `${species}-colon-wall`,
      species,
      lifeStage: 'adult' as const,
      measurement: 'Parede do intestino grosso',
      population: 'Referência geral',
      weightBand: 'Todos os pesos',
      value: '1–2',
      unit: 'mm',
      technique: 'Medir perpendicularmente; o cólon vazio pode formar pregas.',
      sourceId: 'thrall-8e' as const,
      sourcePage: 'Cap. 47, p. 988 (PDF p. 1246)',
    })),
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: ['A parede do cólon é mais fina que a do intestino delgado; conteúdo e infolding podem dificultar a medida.'],
  },
  {
    id: 'pancreas',
    name: 'Pâncreas',
    description: 'Lobos e ducto pancreático',
    values: [
      {
        id: 'dog-pancreas-right-lobe',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Maior dimensão do lobo direito',
        population: 'Cães saudáveis',
        weightBand: 'Todos os pesos',
        value: '0,9–2,1',
        unit: 'cm',
        technique: 'Registrar o plano e o ponto exato da medida.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 39, p. 792 (PDF p. 992)',
        caution: 'O próprio livro informa que o plano da medida publicada não está claro.',
      },
      {
        id: 'cat-pancreas-left-body',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Lobo esquerdo e corpo — largura ventrodorsal',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '0,25–1,0',
        unit: 'cm',
        technique: 'Medir a dimensão ventrodorsal no plano de melhor definição.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 39, pp. 790–792 (PDF pp. 989–992)',
      },
      {
        id: 'cat-pancreas-right',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Lobo direito — largura',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '0,3–0,6',
        unit: 'cm',
        technique: 'Medir a dimensão ventrodorsal no plano de melhor definição.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 39, p. 792 (PDF p. 992)',
      },
      {
        id: 'cat-pancreatic-duct',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Ducto pancreático',
        population: 'Referência geral',
        weightBand: 'Todos os pesos',
        value: '< 0,25',
        unit: 'cm',
        technique: 'Medir a largura luminal em plano sem obliquidade.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 39, p. 792 (PDF p. 992)',
        caution: 'O ducto pode aumentar com a idade.',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Um pâncreas normal pode ser difícil de identificar, e exame ultrassonográfico normal não exclui doença pancreática, especialmente em gatos.',
    ],
  },
  {
    id: 'adrenals',
    name: 'Adrenais',
    description: 'Espessura por porte e lado',
    values: [
      {
        id: 'dog-small-adrenal-thickness',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Espessura máxima',
        population: 'Cão de porte pequeno',
        weightBand: 'Porte pequeno',
        value: '≤ 0,60',
        unit: 'cm',
        technique: 'Preferir medida transversal/espessura; comprimento varia mais com o peso.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 39, p. 797 (PDF p. 998)',
      },
      {
        id: 'dog-large-left-adrenal-thickness',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Espessura máxima — esquerda',
        population: 'Porte grande, meia-idade a idoso',
        weightBand: 'Porte grande',
        value: '≤ 0,74',
        unit: 'cm',
        technique: 'Medida transversal da glândula esquerda.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 39, p. 797 (PDF p. 998)',
      },
      {
        id: 'dog-large-right-adrenal-thickness',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Espessura máxima — direita',
        population: 'Porte grande, meia-idade a idoso',
        weightBand: 'Porte grande',
        value: '≤ 0,81',
        unit: 'cm',
        technique: 'Medida transversal da glândula direita.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 39, p. 797 (PDF p. 998)',
      },
      {
        id: 'cat-adrenal-short-axis',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Diâmetro curto',
        population: 'Gatos saudáveis e sem doença adrenal',
        weightBand: 'Todos os pesos',
        value: '2,8–5,5',
        unit: 'mm',
        technique: 'Medir o menor diâmetro em plano transversal adequado.',
        sourceId: 'bsava-ultrasonography-1e',
        sourcePage: 'Cap. 13, p. 149 (PDF p. 161)',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Medidas adrenais se sobrepõem entre animais normais e doentes. Forma, sinais clínicos e testes endócrinos devem acompanhar a interpretação.',
    ],
  },
  {
    id: 'bladder',
    name: 'Bexiga',
    description: 'Parede conforme distensão',
    values: [
      {
        id: 'dog-bladder-minimal',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Parede — distensão mínima',
        population: 'Referência média',
        weightBand: 'Varia com o peso',
        value: '2,3',
        unit: 'mm',
        technique: 'Medir perpendicularmente; repetir com distensão moderada se possível.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 42, p. 870 (PDF p. 1090)',
      },
      {
        id: 'dog-bladder-moderate',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Parede — distensão moderada',
        population: 'Referência média',
        weightBand: 'Varia com o peso',
        value: '1,4',
        unit: 'mm',
        technique: 'Medir perpendicularmente em bexiga moderadamente repleta.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 42, p. 870 (PDF p. 1090)',
      },
      {
        id: 'cat-bladder-wall',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Parede vesical',
        population: 'Gatos adultos normais',
        weightBand: 'Todos os pesos',
        value: '1,7 ± 0,6',
        unit: 'mm',
        technique: 'Medir perpendicularmente em bexiga moderadamente repleta.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 42, p. 870 (PDF p. 1090)',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'A distensão e o peso corporal alteram a espessura; bexiga quase vazia ou excessivamente cheia prejudica a avaliação.',
      'Aparência normal não exclui cistite leve/aguda ou doença idiopática do trato urinário inferior felino.',
    ],
  },
  {
    id: 'prostate',
    name: 'Próstata',
    description: 'Tamanho, idade e castração',
    values: [],
    evidenceGaps: {
      'dog:adult':
        'O tamanho prostático absoluto varia com idade, porte e estado reprodutivo. O capítulo não oferece um único corte ultrassonográfico normal aplicável a todos os cães.',
      'cat:adult':
        'A próstata felina normal é muito pequena e a doença clínica é rara; o capítulo não fornece um intervalo ultrassonográfico por peso.',
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'A ultrassonografia avalia simetria, ecotextura, uretra e lesões focais; nenhuma aparência isolada diferencia definitivamente hiperplasia, prostatite e neoplasia.',
      'Fonte descritiva: Thrall, 8ª ed., Cap. 43, pp. 884–889 (PDF pp. 1106–1114).',
    ],
  },
  {
    id: 'uterus',
    name: 'Útero',
    description: 'Cornos, corpo e cérvix',
    values: [
      ...[
        ['Cornu uterino', '0,5–1,0'],
        ['Corpo uterino', '0,8–1,0'],
        ['Cérvix', '0,8–1,0'],
      ].map(([measurement, value], index): UltrasoundReferenceValue => ({
        id: `dog-uterus-${index}`,
        species: 'dog',
        lifeStage: 'adult',
        measurement,
        population: 'Fêmea inteira; varia com ciclo e paridade',
        weightBand: 'Varia com o porte',
        value,
        unit: 'cm',
        technique: 'Medir o diâmetro no plano transversal, identificando o segmento anatômico.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 44, Tabela 44.1, p. 898 (PDF p. 1124)',
      })),
      {
        id: 'cat-uterine-horn',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Corno uterino',
        population: 'Fêmea inteira; varia com ciclo e paridade',
        weightBand: 'Todos os pesos',
        value: '1,0–5,8',
        unit: 'mm',
        technique: 'Medir o diâmetro no plano transversal.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 44, Tabela 44.1, p. 898 (PDF p. 1124)',
      },
      {
        id: 'cat-uterine-body',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Corpo uterino',
        population: 'Fêmea inteira; varia com ciclo e paridade',
        weightBand: 'Todos os pesos',
        value: '1,5–5,3',
        unit: 'mm',
        technique: 'Medir o diâmetro no plano transversal, dorsal à bexiga.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 44, Tabela 44.1, p. 898 (PDF p. 1124)',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Ciclo estral, gestações prévias e porte alteram as medidas; identifique o segmento e a fase reprodutiva no laudo.',
    ],
  },
  {
    id: 'ovaries',
    name: 'Ovários',
    description: 'Comprimento e folículos',
    values: [
      {
        id: 'dog-ovary-anestrus',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Comprimento ovariano — anestro',
        population: 'Fêmea inteira',
        weightBand: 'Varia com o porte',
        value: '1–2',
        unit: 'cm',
        technique: 'Maior eixo do ovário em plano longitudinal.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 44, Tabela 44.1, p. 897 (PDF p. 1123)',
      },
      {
        id: 'dog-ovary-follicles',
        species: 'dog',
        lifeStage: 'adult',
        measurement: 'Folículos — proestro/estro',
        population: 'Fêmea inteira',
        weightBand: 'Todos os portes',
        value: '4–11',
        unit: 'mm',
        technique: 'Diâmetro das estruturas císticas foliculares.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 44, Tabela 44.1, p. 897 (PDF p. 1123)',
      },
      {
        id: 'cat-ovary-anestrus',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Comprimento ovariano — anestro',
        population: 'Fêmea inteira',
        weightBand: 'Todos os pesos',
        value: '7,1–13,9',
        unit: 'mm',
        technique: 'Maior eixo do ovário em plano longitudinal.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 44, Tabela 44.1, p. 897 (PDF p. 1123)',
      },
      {
        id: 'cat-ovary-follicles',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Folículos — proestro/estro',
        population: 'Fêmea inteira',
        weightBand: 'Todos os pesos',
        value: '1–2,3',
        unit: 'mm',
        technique: 'Diâmetro das estruturas císticas foliculares.',
        sourceId: 'thrall-8e',
        sourcePage: 'Cap. 44, Tabela 44.1, p. 897 (PDF p. 1123)',
      },
    ],
    evidenceGaps: {
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: ['Forma, tamanho, folículos e corpos lúteos mudam ao longo do ciclo; registre a fase reprodutiva.'],
  },
];

export function getUltrasoundOrgan(organId: UltrasoundOrganId): UltrasoundOrgan {
  const organ = ULTRASOUND_ORGANS.find((candidate) => candidate.id === organId);

  if (!organ) {
    throw new Error(`Ultrasound organ not found: ${organId}`);
  }

  return organ;
}

export function getUltrasoundReferenceValues(
  organId: UltrasoundOrganId,
  species: UltrasoundSpecies,
  lifeStage: UltrasoundLifeStage
): UltrasoundReferenceValue[] {
  return getUltrasoundOrgan(organId).values.filter(
    (reference) => reference.species === species && reference.lifeStage === lifeStage
  );
}

export function getUltrasoundEvidenceGap(
  organId: UltrasoundOrganId,
  species: UltrasoundSpecies,
  lifeStage: UltrasoundLifeStage
): string | undefined {
  return getUltrasoundOrgan(organId).evidenceGaps?.[`${species}:${lifeStage}`];
}
