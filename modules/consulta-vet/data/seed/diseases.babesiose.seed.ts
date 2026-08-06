import { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet';

export const babesioseCaninaRecord: DiseaseRecord = {
  id: 'disease-babesiose-canina',
  slug: 'babesiose-canina',
  title: 'Babesiose canina',
  synonyms: [
    'Babesiosis',
    'Nambiuvú',
    'Febre do carrapato',
    'Anemia hemolítica por Babesia',
    'Piroplasmose canina'
  ],
  species: ['dog'],
  category: 'infectologia',
  tags: [
    'Carrapato',
    'Rhipicephalus sanguineus',
    'Babesia canis',
    'Babesia vogeli',
    'Babesia gibsoni',
    'Anemia Hemolítica',
    'Imidocarb',
    'Atovaquona',
    'Trombocitopenia'
  ],
  quickSummary:
    'A babesiose é uma hemoparasitose causada por protozoários do gênero Babesia, caracterizada por anemia hemolítica (direta e imunomediada secundária), trombocitopenia acentuada e, em casos graves, síndrome de resposta inflamatória sistêmica (SIRS) e falência de múltiplos órgãos. O diagnóstico é baseado na detecção de merozoítos piriformes em esfregaços sanguíneos (especialmente de ponta de orelha) ou por testes moleculares (PCR). O tratamento varia conforme o tamanho do parasita: babesias grandes (B. vogeli/canis) respondem bem ao dipropionato de imidocarb, enquanto babesias pequenas (B. gibsoni) exigem a associação de atovaquona e azitromicina.',
  quickDecisionStrip: [
    'Trombocitopenia + anemia hemolítica + febre = suspeita forte de babesiose.',
    'Diferencie o tamanho da Babesia: grandes usam imidocarb; pequenas usam atovaquona + azitromicina.',
    'Esfregaço de ponta de orelha (sangue capilar) aumenta muito a chance de ver o parasita.',
    'PCR de sangue total é o padrão ouro e ajuda na diferenciação das espécies.',
    'Em casos complicados, monitore a função renal (creatinina/fósforo) e pancreatite.'
  ],
  quickSummaryRich: {
    lead:
      'A babesiose canina destrói hemácias de duas formas: por invasão direta do parasita e por induzir uma hemólise imunomediada secundária (IMHA). O segredo clínico está em reconhecer o tamanho da Babesia (grande vs pequena) para definir o protocolo terapêutico correto e monitorar lesões em órgãos-alvo como rins e pâncreas.',
    leadHighlights: ['hemólise imunomediada secundária', 'grande vs pequena', 'rins e pâncreas'],
    pillars: [
      {
        title: 'Hemólise Imunomediada',
        body:
          'A infecção altera a membrana dos eritrócitos, fazendo o corpo destruí-los no baço/fígado. Pode causar autoaglutinação e teste de Coombs positivo.',
        highlights: ['autoaglutinação', 'Coombs positivo'],
      },
      {
        title: 'Eixo Terapêutico',
        body:
          'Babesias grandes usam dipropionato de imidocarb (2 doses). Babesias pequenas (B. gibsoni) usam atovaquona (com refeição gordurosa) + azitromicina.',
        highlights: ['imidocarb', 'atovaquona', 'azitromicina'],
      },
      {
        title: 'Complicações Graves',
        body:
          'CIVD, pancreatite e lesão renal aguda são complicações de prognóstico reservado. A azotemia e hipoalbuminemia são fortes marcadores de mortalidade.',
        highlights: ['CIVD', 'lesão renal aguda', 'azotemia'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Triagem e suspeita',
          timing: 'Primeira consulta',
          detail:
            'Histórico de carrapatos, mucosas pálidas, febre, icterícia e urina escura (pigmentúria) — trombocitopenia + anemia hemolítica reforçam suspeita (Nelson & Couto, 6ª ed.; Dantas-Torres & Figueredo, 2006).',
        },
        {
          label: 'Esfregaço de ponta de orelha',
          timing: 'Na admissão',
          detail:
            'Sangue capilar periférico da margem interna da orelha para visualização de morulas/merozoítos — sensibilidade limitada se parasitemia baixa (Nelson & Couto, 6ª ed.; BSAVA Emergency and Critical Care).',
        },
        {
          label: 'Hemograma e triagem bioquímica',
          timing: 'Paralelo ao esfregaço',
          detail:
            'Anemia regenerativa, trombocitopenia grave, hiperbilirrubinemia, azotemia e hipoalbuminemia — azotemia e hipoalbuminemia são marcadores de gravidade (Weingart et al., 2023).',
        },
        {
          label: 'Confirmação por PCR',
          timing: 'Antes de escolher esquema terapêutico',
          detail:
            'Sangue total para PCR diferenciando espécie grande vs pequena — orienta imidocarb vs atovaquona + azitromicina (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Definir espécie e tratar parasita',
          detail:
            'Babesia grande: imidocarb dipropionato. Babesia pequena (B. gibsoni): atovaquona + azitromicina — nunca usar imidocarb isolado para pequenas (Nelson & Couto, 6ª ed.; Plumb\'s, 10ª ed.).',
          dose: 'Imidocarb 6,6 mg/kg IM/SC, 2 doses com intervalo de 14 dias; atropina 0,02–0,04 mg/kg SC/IM 15–30 min antes. Atovaquona 13,3 mg/kg q8h + azitromicina 10 mg/kg q24h VO × 10 dias (atovaquona com alimento gorduroso).',
          duration: 'Imidocarb: 2 aplicações. Atovaquona/azitromicina: 10 dias.',
          reassess: 'Repetir PCR ou esfregaço conforme resposta clínica e laboratorial.',
        },
        {
          label: 'Suporte renal e hidratação',
          detail:
            'Fluidoterapia criteriosa para perfusão renal sem hemodiluir excessivamente a anemia (BSAVA Emergency and Critical Care; Nelson & Couto, 6ª ed.).',
          duration: 'Até estabilização hemodinâmica e função renal.',
          reassess: 'Monitorar creatinina, fósforo e sinais de pancreatite em casos graves.',
        },
        {
          label: 'Suporte de oxigênio/transfusão',
          detail:
            'Transfusão de concentrado de hemácias ou sangue total se PCV <15–18% com hipóxia tecidual (BSAVA Emergency and Critical Care).',
          dose: 'Concentrado de hemácias ou sangue total conforme protocolo transfusional local.',
          duration: 'Dose(s) conforme resposta do hematócrito e clínica.',
          reassess: 'PCV, lactato e sinais de hipóxia a cada revisão na fase aguda.',
        },
      ],
    },
  },
  etiology: {
    agente:
      'Protozoário intracelular obrigatório pertencente à ordem Piroplasmida, família Babesiidae e gênero Babesia. Infectam e multiplicam-se no interior dos eritrócitos (hemácias).',
    classificacao: {
      kind: 'clinicalTable',
      headers: ['Grupo', 'Espécies importantes', 'Comentário clínico'],
      rows: [
        [
          'Babesias grandes',
          'Babesia canis, Babesia vogeli, Babesia rossi',
          'Têm tamanho de 2,5-5,0 µm. São tratadas preferencialmente com dipropionato de imidocarb ou diminazeno.'
        ],
        [
          'Babesias pequenas',
          'Babesia gibsoni, Babesia conradae, Babesia vulpes',
          'Têm tamanho de 1,0-2,5 µm. São refratárias ao imidocarb isolado e exigem atovaquona + azitromicina.'
        ]
      ]
    },
    fontesLivro:
      'Nelson & Couto (6ª ed., cap. 98) detalha as infecções por protozoários polissistêmicos, diferenciando a suscetibilidade e a apresentação clínica entre as espécies de Babesia.'
  },
  epidemiology: {
    vetor:
      'O principal vetor no Brasil é o carrapato-marrom-do-cão (Rhipicephalus sanguineus). A transmissão ocorre pela picada do carrapato infectado (inoculação de esporozoítos durante o repasto sanguíneo, o que requer cerca de 24-36h de fixação, embora transmissões mais rápidas tenham sido descritas).',
    figuraVetor: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/diseases/babesiose/rhipicephalus-sanguineus-female-male.jpg`,
      alt: 'Macho e fêmea de Rhipicephalus sanguineus em vista dorsal',
      display: 'wide',
      caption:
        'Rhipicephalus sanguineus, carrapato-marrom-do-cão. Imagem de Daktaridudu/Wikimedia Commons (CC BY-SA 4.0), ?til para reconhecer o vetor associado a B. vogeli no contexto brasileiro.'
    },
    outrasVias:
      'Transfusão sanguínea (doadores assintomáticos), brigas com ferimentos/mordeduras (especialmente B. gibsoni em Pit Bulls) e transmissão transplacentária.',
    contextoNacional:
      'No Brasil, a prevalência do complexo Babesia canis/vogeli é elevada. Conforme a revisão de Dantas-Torres & Figueredo, a endemicidade está ligada ao clima favorável ao vetor Rhipicephalus sanguineus.'
  },
  pathogenesisTransmission: {
    mecanismoEntrada:
      'O parasita invade as hemácias ativamente por endocitose induzida, se multiplica por fissão binária e rompe a célula para infectar novos eritrócitos. Isso leva a uma anemia por hemólise intravascular direta.',
    hemoliseImunomediada:
      'O hospedeiro desenvolve uma resposta imune humoral e celular contra os antígenos do protozoário que são expostos na membrana das hemácias. Isso faz com que eritrócitos não parasitados também sejam destruídos no baço e fígado (hemólise extravascular), simulando uma anemia hemolítica imunomediada (IMHA) secundária. Reticulocitose e esferócitos são frequentes.',
    trombocitopenia:
      'A redução plaquetária é constante e ocorre por sequestro esplênico, consumo inflamatório e destruição imunomediada mediada por anticorpos antiplaquetários.',
    sirs:
      'Em infecções agudas por B. rossi ou quadros graves de B. canis, a liberação massiva de mediadores inflamatórios desencadeia a Síndrome de Resposta Inflamatória Sistêmica (SIRS), culminando em choque, hipotensão, acidose láctica e disfunção renal/pancreática.'
  },
  pathophysiology: {
    microscopiaMerozoitos: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/diseases/babesiose/babesia-canis-dog-walker.jpg`,
      alt: 'Microscopia de esfregaço de sangue periférico com Babesia canis',
      display: 'wide',
      caption:
        'Esfregaco sanguineo canino corado por Giemsa com formas piroplasmaticas de Babesia canis em hemacias. Imagem de Alan R. Walker/Wikimedia Commons (CC BY-SA 3.0).'
    },
    consequenciasSistemicas:
      'A destruição eritrocitária gera hemoglobinemia e hemoglobinúria. A sobrecarga de bilirrubina decorrente da hemólise extravascular resulta em icterícia acentuada. A hipóxia tecidual e a deposição de imunocomplexos no glomérulo renal causam proteinúria e propensão à lesão renal aguda (LRA).'
  },
  clinicalSignsPathophysiology: {
    classificacaoSinais: {
      kind: 'clinicalTable',
      headers: ['Apresentação', 'Sinais Clínicos Comuns', 'Alterações Fisiopatológicas'],
      rows: [
        [
          'Forma aguda não complicada',
          'Febre, letargia, mucosas pálidas, icterícia, anorexia, esplenomegalia e urina cor de chá/escura (pigmentúria).',
          'Vasculite leve, hemólise extravascular ativa e liberação de citocinas pirogênicas.'
        ],
        [
          'Forma grave complicada',
          'Colapso circulatório, hipotensão, dispneia grave, oligúria/anúria, hemorragias (petéquias/epistaxe), convulsões e ataxia.',
          'SIRS, coagulação intravascular disseminada (CIVD), lesão renal aguda grave, acidose metabólica e hipoglicemia.'
        ]
      ]
    },
    dadosEstudos:
      'Estudo de Weingart et al. (2023) avaliando 49 cães com B. canis na Alemanha encontrou: Letargia (100%), Anemia (85%), Plaquetopenia (100%), Pigmentúria (52%) e Febre (50%). Outro estudo com 60 cães infectados por B. gibsoni (Liu et al., 2022) demonstrou anemia em 81,7% dos cães, com 49% destes apresentando anemia severa (PCV < 20%).'
  },
  diagnosis: {
    metodosDiagnostico:
      'O diagnóstico requer a associação de sinais clínicos compatíveis, alterações laboratoriais (anemia hemolítica regenerativa e trombocitopenia) e confirmação do patógeno.',
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Exame de Esfregaço Sanguíneo Periférico',
        description:
          'Utilizar sangue capilar obtido da ponta de orelha (ear stick) para aumentar a sensibilidade. Permite visualização direta de merozoítos em formato de pera (piriformes). Possui sensibilidade limitada em parasitemias baixas.',
      },
      {
        stepNumber: 2,
        title: 'PCR (Reação em Cadeia da Polimerase)',
        description:
          'Padrão ouro para diagnóstico de infecção ativa. Identifica e diferencia espécies grandes de pequenas (B. canis vs B. gibsoni), definindo o tratamento. Deve ser colhido antes da administração de antiparasitários.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Bioquímica e Urinálise de Suporte',
        description:
          'Avaliação de ureia, creatinina, bilirrubina total e frações, albumina, fósforo e urinálise com pesquisa de hemoglobinúria, proteinúria e cilindros urinários.'
      },
      {
        stepNumber: 4,
        title: 'Sorologia (RIFI / ELISA)',
        description:
          'Detecta anticorpos (IgG/IgM). Útil para triagem epidemiológica, mas pode apresentar resultados falso-negativos em fases agudas precoces ou falso-positivos por exposição prévia.'
      }
    ]
  },
  treatment: {
    protocolosFarmacos: [
      {
        drug: 'Imidocarb dipropionato',
        indication: 'Babesias Grandes (B. vogeli / B. canis / B. rossi)',
        dose: '6,6 mg/kg',
        route: 'IM ou SC',
        frequency: 'Intervalo de 14 dias',
        duration: '2 aplicações',
        cautions: 'NÃO administrar por via intravenosa (IV). Pode causar reações colinérgicas (salivação, vômito, diarreia).'
      },
      {
        drug: 'Atropina (sulfato)',
        indication: 'Prevenção de efeitos colinérgicos do Imidocarb',
        dose: '0,02 - 0,04 mg/kg',
        route: 'SC ou IM',
        frequency: '15-30 minutos antes do Imidocarb',
        duration: 'Dose única',
        notes: 'Reduz significativamente salivação e desconforto.'
      },
      {
        drug: 'Atovaquona + Azitromicina',
        indication: 'Babesias Pequenas (B. gibsoni / B. conradae)',
        dose: 'Atovaquona: 13,3 mg/kg q8h | Azitromicina: 10 mg/kg q24h',
        route: 'VO (Via Oral)',
        frequency: 'Conforme dose',
        duration: '10 dias',
        cautions: 'A atovaquona DEVE ser administrada junto com alimento gorduroso para garantir a absorção intestinal adequada.'
      },
      {
        drug: 'Diminazeno aceturato',
        indication: 'Babesia spp. (Tratamento alternativo)',
        dose: '3,5 mg/kg',
        route: 'IM',
        frequency: 'Dose única',
        contraindications: 'Toxicidade neurológica imprevisível em cães (ataxia, convulsões, óbito). Usar com extrema cautela.'
      },
      {
        drug: 'Clindamicina + Diminazeno + Imidocarb',
        indication: 'B. gibsoni resistente (Protocolo de Resgate)',
        dose: 'Clindamicina 30 mg/kg VO BID (10d) + Diminazeno 3,5 mg/kg IM (D0) + Imidocarb 6 mg/kg SC (D1)',
        route: 'Mistas',
        frequency: 'Conforme protocolo',
        duration: 'Variável',
        notes: 'Protocolo de resgate para cepas mutantes com resistência à atovaquona.'
      }
    ],
    terapiaSuporte:
      'Transfusão: Indicada se anemia grave com sinais clínicos de hipóxia tecidual (fraqueza extrema, taquicardia, lactato aumentado, PCV < 15-18%). Usar concentrado de hemácias ou sangue total. Fluidoterapia: Criteriosa para manter perfusão renal e combater azotemia, evitando hemodiluição excessiva. Corticoterapia: O uso de imunossupressores (prednisolona) é controverso; indicado apenas em casos confirmados de hemólise imunomediada secundária (IMHA) grave ou trombocitopenia grave imune, evitando-se o uso indiscriminado pois pode agravar a parasitemia.'
  },
  prevention: {
    controleVetores:
      'Controle rigoroso e contínuo de carrapatos no cão e no ambiente com ectoparasiticidas modernos (como isoxazolinas orais/topicas, coleiras repelentes). Evitar áreas infestadas.',
    doadoresSangue:
      'Triagem rigorosa de doadores de sangue por meio de exames moleculares (PCR) antes da inclusão no programa de doação.'
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['imidocarb', 'azitromicina', 'atropina', 'clindamicina', 'doxiciclina'],
  references: [
    {
      citationText: 'Nelson & Couto. Veterinary Internal Medicine, 6ª ed., Cap. 98: Polysystemic Protozoal Infections, p. 1514–1516.',
    },
    {
      citationText: 'BSAVA Manual of Canine and Feline Emergency and Critical Care, Cap. 13: Haematological emergencies, p. 218.',
    },
    {
      citationText: 'Plumb’s Veterinary Drug Handbook, 10ª ed., monografias: Imidocarb, Diminazene, Atovaquone/Azithromycin.',
    },
    {
      citationText: 'Weingart et al. Autochthonous Babesia canis infections in 49 dogs in Germany. Journal of Veterinary Internal Medicine, 2023.',
      url: 'https://doi.org/10.1111/jvim.16812'
    },
    {
      citationText: 'Dantas-Torres, F. & Figueredo, L. A. Canine babesiosis: a Brazilian perspective. Veterinary Parasitology, 2006.',
      url: 'https://doi.org/10.1016/j.vetpar.2006.07.026'
    }
  ],
  isPublished: true
};
