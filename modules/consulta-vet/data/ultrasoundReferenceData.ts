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
  | 'ovaries'
  | 'lymph-nodes'
  | 'ureters'
  | 'testes'
  | 'eyes'
  | 'thyroid'
  | 'parathyroids'
  | 'heart';

export type UltrasoundSourceId = 'thrall-8e' | 'bsava-ultrasonography-1e' | 'pocus-2e';

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

export type UltrasoundQualitativeFinding = {
  id: string;
  species: UltrasoundSpecies;
  lifeStage: UltrasoundLifeStage;
  label: string;
  finding: string;
  sourceId: UltrasoundSourceId;
  sourcePage: string;
};

type EvidenceGapKey = `${UltrasoundSpecies}:${UltrasoundLifeStage}`;

export type UltrasoundOrgan = {
  id: UltrasoundOrganId;
  name: string;
  description: string;
  values: UltrasoundReferenceValue[];
  qualitativeFindings?: UltrasoundQualitativeFinding[];
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
    scope: 'Capítulo 1 (física da imagem) e capítulos 6–19 (órgãos): medidas, padrões de alterações e diferenciais. Página impressa e página do PDF indicadas nas referências.',
  },
  'pocus-2e': {
    shortTitle: 'Point-of-Care Ultrasound, 2ª ed.',
    title: 'Point-of-Care Ultrasound Techniques for the Small Animal Practitioner',
    edition: '2ª edição',
    year: 2021,
    authors: 'Gregory R. Lisciandro (editor)',
    scope: 'Capítulo 9, avaliação focal do baço; páginas indicadas nas referências.',
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
    qualitativeFindings: (['dog', 'cat'] as const).map((species): UltrasoundQualitativeFinding => ({
      id: `${species}-liver-parenchyma`, species, lifeStage: 'adult',
      label: 'Parênquima e vasos normais',
      finding: 'Parênquima uniforme, em geral mais escuro e de textura mais grosseira que o baço. Veias porta têm paredes ecogênicas; veias hepáticas não mostram a mesma parede.',
      sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 8, p. 87 (PDF p. 99)',
    })),
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
    description: 'Altura felina e avaliação canina',
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
        caution: 'Intervalo de um estudo específico; não fundir com a segunda amostra nem com a regra POCUS.',
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
        caution: 'Segundo estudo independente; interpretar separadamente do primeiro.',
      },
      {
        id: 'cat-spleen-pocus-thickness',
        species: 'cat',
        lifeStage: 'adult',
        measurement: 'Espessura esplênica — regra prática POCUS',
        population: 'Avaliação focal; método próprio do livro POCUS',
        weightBand: 'Sem estratificação de peso',
        value: '< 10',
        unit: 'mm',
        technique: 'Medir a espessura no plano transversal; interpretar junto à forma e ao parênquima.',
        sourceId: 'pocus-2e',
        sourcePage: 'Cap. 9, pp. 175 e 177 (PDF pp. 198 e 200)',
        caution: 'Regra prática do exame focal; não fundir com os dois intervalos de altura do Thrall.',
      },
    ],
    qualitativeFindings: [
      {
        id: 'dog-spleen-normal-parenchyma', species: 'dog', lifeStage: 'adult',
        label: 'Aspecto habitual',
        finding: 'Parênquima homogêneo e finamente granular, com cápsula fina e ecogênica. Em muitos cães o baço é mais ecogênico que o fígado; a relação pode variar.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 9, p. 102 (PDF p. 114)',
      },
      {
        id: 'dog-spleen-enlargement-clues', species: 'dog', lifeStage: 'adult',
        label: 'Sinais de aumento acentuado',
        finding: 'A cauda pode dobrar-se e aparecer medial ao rim esquerdo ou alcançar uma bexiga pequena a média. São pistas de aumento, não medidas de corte.',
        sourceId: 'pocus-2e', sourcePage: 'Cap. 9, p. 177 (PDF p. 200)',
      },
      {
        id: 'dog-spleen-assessment', species: 'dog', lifeStage: 'adult',
        label: 'O que registrar no exame',
        finding: 'Percorrer cabeça, corpo e cauda; descrever tamanho subjetivo, ecotextura, nódulos ou massas e vasos esplênicos.',
        sourceId: 'pocus-2e', sourcePage: 'Cap. 9, pp. 174–176 (PDF pp. 197–199)',
      },
      {
        id: 'cat-spleen-fold', species: 'cat', lifeStage: 'adult',
        label: 'Forma do baço',
        finding: 'Um baço dobrado é sinal de esplenomegalia no exame focal e pede investigação adicional.',
        sourceId: 'pocus-2e', sourcePage: 'Cap. 9, pp. 175 e 177 (PDF pp. 198 e 200)',
      },
    ],
    evidenceGaps: {
      'dog:adult':
        'O baço canino não tem limite absoluto de tamanho no livro; posição, sedação, congestão e conformação alteram a aparência.',
      'dog:young': NO_PEDIATRIC_REFERENCE,
      'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Sedação e anestesia podem aumentar o baço canino; aspecto e tamanho normais não excluem doença esplênica.',
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
        ['≤ 20 kg', '≤ 5,1'],
        ['20–29,9 kg', '≤ 5,3'],
        ['> 30 kg', '≤ 6,0'],
      ].map(([weightBand, duodenum], index): UltrasoundReferenceValue => ({
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
      })),
      ...[
        ['≤ 20 kg', '≤ 4,1'],
        ['20–39,9 kg', '≤ 4,4'],
        ['≥ 40 kg', '≤ 4,7'],
      ].map(([weightBand, jejunum], index): UltrasoundReferenceValue => ({
          id: `dog-adult-jejunum-${index}`,
          species: 'dog',
          lifeStage: 'adult',
          measurement: 'Parede do jejuno',
          population: 'Cão adulto',
          weightBand,
          value: jejunum,
          unit: 'mm',
          technique: 'Mucosa a serosa, em segmento longitudinal para reduzir obliquidade.',
          sourceId: 'bsava-ultrasonography-1e',
          sourcePage: 'Cap. 11, p. 132 (PDF p. 144)',
      })),
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
    qualitativeFindings: [
      {
        id: 'dog-prostate-normal', species: 'dog', lifeStage: 'adult',
        label: 'Aspecto normal',
        finding: 'Glândula ovoide no eixo sagital e bilobada no transversal, envolvendo a uretra proximal. O parênquima normal é homogêneo e finamente pontilhado.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 15, p. 166 (PDF p. 178)',
      },
      {
        id: 'dog-prostate-age-status', species: 'dog', lifeStage: 'adult',
        label: 'Idade e castração',
        finding: 'O tamanho aumenta com a idade e diminui após castração. Em cães jovens ou castrados, a próstata costuma ser menor e hipoecogênica; em machos inteiros mais velhos, costuma ser mais ecogênica.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 15, p. 166 (PDF p. 178)',
      },
      {
        id: 'cat-prostate-normal', species: 'cat', lifeStage: 'adult',
        label: 'Anatomia felina',
        finding: 'A próstata felina é bilobada e recobre a uretra apenas pelas faces dorsal e lateral, em posição mais caudal que a canina.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 15, p. 167 (PDF p. 179)',
      },
    ],
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
        id: 'dog-ovary-three-axes',
        species: 'dog', lifeStage: 'adult',
        measurement: 'Dimensões ovarianas aproximadas — C × L × A',
        population: 'Cadelas; descrição geral do capítulo',
        weightBand: 'Sem estratificação de peso',
        value: '1,5 × 0,7 × 0,5', unit: 'cm (aprox.)',
        technique: 'Medir os eixos do ovário identificado caudal e ventral ao rim ipsilateral.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 17, p. 177 (PDF p. 189)',
        caution: 'Dimensões descritivas aproximadas; ciclo estral e porte modificam o tamanho.',
      },
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
  {
    id: 'lymph-nodes',
    name: 'Linfonodos',
    description: 'Forma e linfonodos jejunais',
    values: [
      {
        id: 'dog-node-short-long-ratio', species: 'dog', lifeStage: 'adult',
        measurement: 'Eixo curto / eixo longo', population: 'Linfonodos abdominais normais',
        weightBand: 'Sem estratificação de peso', value: '< 0,5', unit: 'razão',
        technique: 'Medir os eixos no maior plano do linfonodo; avaliar também contorno, hilo e vascularização.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 7, p. 75 (PDF p. 87)',
        caution: 'Forma isolada não exclui doença ou reatividade.',
      },
      {
        id: 'dog-jejunal-node-height-median', species: 'dog', lifeStage: 'adult',
        measurement: 'Altura máxima do linfonodo jejunal — mediana', population: 'Estudo citado por Agthe et al.; ampla variação',
        weightBand: 'Correlaciona-se com peso e idade', value: '3,9', unit: 'mm (mediana)',
        technique: 'Identificar junto aos vasos mesentéricos; medir o eixo curto.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 7, p. 75 (PDF p. 87)',
        caution: 'Mediana da amostra, não limite superior de normalidade.',
      },
      {
        id: 'dog-jejunal-node-width-median', species: 'dog', lifeStage: 'adult',
        measurement: 'Largura máxima do linfonodo jejunal — mediana', population: 'Estudo citado por Agthe et al.; ampla variação',
        weightBand: 'Correlaciona-se com peso e idade', value: '7,5', unit: 'mm (mediana)',
        technique: 'Identificar junto aos vasos mesentéricos; comparar os dois lados.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 7, p. 75 (PDF p. 87)',
        caution: 'Mediana da amostra, não limite superior de normalidade.',
      },
    ],
    qualitativeFindings: [
      {
        id: 'cat-abdominal-nodes', species: 'cat', lifeStage: 'adult',
        label: 'Aspecto e localização',
        finding: 'Linfonodos normais têm contorno liso, formato oval ou fusiforme e ecotextura uniforme. Os cólicos, próximos à junção ileocólica, são mais facilmente vistos em gatos.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 7, pp. 75–76 (PDF pp. 87–88)',
      },
    ],
    evidenceGaps: {
      'cat:adult': 'O capítulo descreve os linfonodos felinos, mas não fornece um intervalo dimensional geral para eles.',
      'dog:young': NO_PEDIATRIC_REFERENCE, 'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: ['Nos cães, as dimensões dos linfonodos jejunais aumentam com peso e idade; não use as medianas como pontos de corte.'],
  },
  {
    id: 'ureters',
    name: 'Ureteres',
    description: 'Visualização do lúmen',
    values: [],
    qualitativeFindings: (['dog', 'cat'] as const).map((species): UltrasoundQualitativeFinding => ({
      id: `${species}-ureter-appearance`, species, lifeStage: 'adult',
      label: 'Visualização normal',
      finding: 'Com equipamento de alta resolução e condições favoráveis, o ureter pode mostrar paredes finas ecogênicas e peristalse com pequenos bolos de urina; em muitos exames o lúmen não se distingue.',
      sourceId: 'thrall-8e', sourcePage: 'Cap. 41, p. 839 (PDF p. 1047)',
    })),
    evidenceGaps: {
      'dog:adult': 'O ureter normal pode ser visível apenas com transdutor de alta resolução e condições ideais; os capítulos não fornecem um diâmetro universal seguro.',
      'cat:adult': 'O ureter normal pode ser visível apenas com transdutor de alta resolução e condições ideais; os capítulos não fornecem um diâmetro universal seguro.',
      'dog:young': NO_PEDIATRIC_REFERENCE, 'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Um pequeno bolo de urina pode aparecer durante a peristalse; correlacione qualquer dilatação com pelve renal e bexiga.',
      'Fonte descritiva: Thrall, 8ª ed., Cap. 41, p. 839 (PDF p. 1047); BSAVA, Cap. 10, p. 114 (PDF p. 126).',
    ],
  },
  {
    id: 'testes',
    name: 'Testículos',
    description: 'Parênquima e mediastino',
    values: [],
    qualitativeFindings: (['dog', 'cat'] as const).map((species): UltrasoundQualitativeFinding => ({
      id: `${species}-testis-normal`, species, lifeStage: 'adult',
      label: 'Arquitetura normal',
      finding: 'Mediastino central ecogênico, linear no plano sagital, parênquima de ecogenicidade média e túnica fina ecogênica. O epidídimo envolve a face dorsal; sua cauda é mais hipoecogênica.',
      sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 17, p. 179 (PDF p. 191)',
    })),
    evidenceGaps: {
      'dog:adult': 'O capítulo consultado descreve o aspecto normal, mas não publica intervalo de tamanho ajustado a peso, raça ou idade.',
      'cat:adult': 'O capítulo consultado descreve o aspecto normal, mas não publica intervalo de tamanho ajustado a peso, raça ou idade.',
      'dog:young': NO_PEDIATRIC_REFERENCE, 'cat:young': NO_PEDIATRIC_REFERENCE,
    },
    cautions: [
      'Compare os dois testículos, a ecotextura, o mediastino ecogênico central e o fluxo ao Doppler.',
      'Fonte descritiva: BSAVA Ultrasonography, Cap. 17, p. 179 (PDF p. 191).',
    ],
  },
  {
    id: 'eyes',
    name: 'Olhos',
    description: 'Diâmetro do globo ocular',
    values: (['dog', 'cat'] as const).map((species): UltrasoundReferenceValue => ({
      id: `${species}-eye-diameter`, species, lifeStage: 'adult',
      measurement: 'Diâmetro do globo ocular', population: 'Varia conforme a raça',
      weightBand: 'Sem estratificação de peso', value: '18–23', unit: 'mm',
      technique: 'Medir o globo em plano que passe pelo seu maior diâmetro, sem comprimir o olho.',
      sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 18, p. 184 (PDF p. 196)',
      caution: 'Faixa descritiva para cães e gatos; não constitui intervalo específico de cada raça.',
    })),
    evidenceGaps: { 'dog:young': NO_PEDIATRIC_REFERENCE, 'cat:young': NO_PEDIATRIC_REFERENCE },
    cautions: ['O livro assinala dependência da raça; compare com o olho contralateral e o contexto clínico.'],
  },
  {
    id: 'thyroid',
    name: 'Tireoide',
    description: 'Dimensões dos lobos',
    values: [
      {
        id: 'dog-beagle-thyroid', species: 'dog', lifeStage: 'adult',
        measurement: 'Lobo tireoidiano — C × L × A', population: 'Beagles; tamanho médio observado',
        weightBand: 'Raça específica; porte influencia', value: '2,5 × 0,5 × 0,6', unit: 'cm (médias)',
        technique: 'Medir os três eixos do lobo; manter pressão mínima do transdutor.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 19, p. 194 (PDF p. 206)',
        caution: 'Média de Beagles, não intervalo normal de todas as raças.',
      },
      {
        id: 'cat-thyroid', species: 'cat', lifeStage: 'adult',
        measurement: 'Lobo tireoidiano — C × L × A', population: 'Gatos; tamanho aproximado',
        weightBand: 'Sem estratificação de peso', value: '2,0 × 0,2 × 0,3', unit: 'cm (aprox.)',
        technique: 'Medir os três eixos do lobo em planos ortogonais.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 19, p. 194 (PDF p. 206)',
        caution: 'Valor aproximado, não intervalo de referência.',
      },
    ],
    evidenceGaps: { 'dog:young': NO_PEDIATRIC_REFERENCE, 'cat:young': NO_PEDIATRIC_REFERENCE },
    cautions: ['O tamanho acompanha o porte; avalie também simetria, ecogenicidade e contorno.'],
  },
  {
    id: 'parathyroids',
    name: 'Paratireoides',
    description: 'Diâmetro glandular',
    values: (['dog', 'cat'] as const).map((species): UltrasoundReferenceValue => ({
      id: `${species}-parathyroid-size`, species, lifeStage: 'adult',
      measurement: 'Tamanho da glândula', population: 'Glândulas visíveis ao ultrassom',
      weightBand: 'Sem estratificação de peso', value: '2–3', unit: 'mm',
      technique: 'Localizar junto à tireoide e diferenciar de vasos com Doppler colorido.',
      sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 19, p. 194 (PDF p. 206)',
      caution: 'Número e posição variam; o achado é descritivo, não limite diagnóstico.',
    })),
    evidenceGaps: { 'dog:young': NO_PEDIATRIC_REFERENCE, 'cat:young': NO_PEDIATRIC_REFERENCE },
    cautions: ['Glândulas internas podem confundir-se com pequenos cistos tireoidianos.'],
  },
  {
    id: 'heart',
    name: 'Coração',
    description: 'Ecocardiografia e peso',
    values: [
      ...[
        ['Diâmetro interno do VE — diástole', '1,53 × peso^0,294'],
        ['Diâmetro interno do VE — sístole', '0,95 × peso^0,315'],
        ['Septo interventricular — diástole', '0,41 × peso^0,241'],
        ['Septo interventricular — sístole', '0,58 × peso^0,240'],
        ['Parede livre do VE — diástole', '0,42 × peso^0,232'],
        ['Parede livre do VE — sístole', '0,64 × peso^0,222'],
      ].map(([measurement, value], index): UltrasoundReferenceValue => ({
        id: `dog-heart-allometry-${index}`, species: 'dog', lifeStage: 'adult', measurement,
        population: 'Cães normais; média prevista por alometria', weightBand: 'Peso em kg na fórmula',
        value, unit: 'cm (média)',
        technique: 'Modo M ou 2D, eixo curto paraesternal direito ao nível das cordas tendíneas.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 6, p. 43 (PDF p. 55)',
        caution: 'Equação de média prevista, não limite de normalidade; raça e técnica influenciam.',
      })),
      {
        id: 'dog-heart-la-ao', species: 'dog', lifeStage: 'adult',
        measurement: 'Átrio esquerdo / aorta', population: 'Cães normais; eixo curto paraesternal direito',
        weightBand: 'Razão independente do peso', value: '1,3–1,5', unit: 'razão',
        technique: 'Medir no primeiro quadro após o fechamento da valva aórtica.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 6, p. 46 (PDF p. 58)',
        caution: 'O livro informa que geralmente não supera 1,6; método e população importam.',
      },
      {
        id: 'dog-heart-fs', species: 'dog', lifeStage: 'adult',
        measurement: 'Fração de encurtamento', population: 'Cães normais no laboratório do autor',
        weightBand: 'Raças grandes podem ter 22–25%', value: '25–45', unit: '%',
        technique: '(Diâmetro diastólico − sistólico) ÷ diastólico × 100.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 6, p. 44 (PDF p. 56)',
        caution: 'Depende de pré-carga, pós-carga e contratilidade; não é medida isolada de função.',
      },
      {
        id: 'cat-heart-fs', species: 'cat', lifeStage: 'adult',
        measurement: 'Fração de encurtamento — valor aproximado', population: 'Gatos normais; descrição do autor',
        weightBand: 'Sem estratificação de peso', value: '≈ 40', unit: '%',
        technique: '(Diâmetro diastólico − sistólico) ÷ diastólico × 100.',
        sourceId: 'bsava-ultrasonography-1e', sourcePage: 'Cap. 6, p. 44 (PDF p. 56)',
        caution: 'Valor aproximado, não intervalo de referência felino.',
      },
    ],
    evidenceGaps: { 'dog:young': NO_PEDIATRIC_REFERENCE, 'cat:young': NO_PEDIATRIC_REFERENCE },
    cautions: ['As equações caninas estimam médias e não limites. Faça avaliação ecocardiográfica completa com raça, idade, técnica e quadro clínico.'],
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

export function getUltrasoundQualitativeFindings(
  organId: UltrasoundOrganId,
  species: UltrasoundSpecies,
  lifeStage: UltrasoundLifeStage
): UltrasoundQualitativeFinding[] {
  return getUltrasoundOrgan(organId).qualitativeFindings?.filter(
    (finding) => finding.species === species && finding.lifeStage === lifeStage
  ) ?? [];
}

export function getUltrasoundEvidenceGap(
  organId: UltrasoundOrganId,
  species: UltrasoundSpecies,
  lifeStage: UltrasoundLifeStage
): string | undefined {
  return getUltrasoundOrgan(organId).evidenceGaps?.[`${species}:${lifeStage}`];
}

const DOG_HEART_ALLOMETRY: ReadonlyArray<readonly [number, number]> = [
  [1.53, 0.294], [0.95, 0.315], [0.41, 0.241],
  [0.58, 0.240], [0.42, 0.232], [0.64, 0.222],
];

/** Média prevista em cm; a equação publicada não define limites de normalidade. */
export function getDogHeartPredictedMean(referenceId: string, weightKg: number): number | undefined {
  const match = /^dog-heart-allometry-([0-5])$/.exec(referenceId);
  if (!match || !Number.isFinite(weightKg) || weightKg <= 0) return undefined;
  const [coefficient, exponent] = DOG_HEART_ALLOMETRY[Number(match[1])];
  return coefficient * weightKg ** exponent;
}
