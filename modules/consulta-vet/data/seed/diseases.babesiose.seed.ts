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
  categories: ['parasitologia'],
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
    'A babesiose é uma hemoparasitose causada por protozoários do gênero *Babesia*, caracterizada por anemia hemolítica (direta e imunomediada secundária), trombocitopenia acentuada e, em casos graves, síndrome de resposta inflamatória sistêmica (SRIS) e falência de múltiplos órgãos. O diagnóstico é baseado na detecção de merozoítos piriformes em esfregaços sanguíneos (especialmente de ponta de orelha) ou por testes moleculares (PCR). O tratamento varia conforme o tamanho do parasita: babesias grandes (*B. vogeli/canis*) respondem bem ao dipropionato de imidocarb, enquanto babesias pequenas (*B. gibsoni*) exigem a associação de atovaquona e azitromicina.',
  quickDecisionStrip: [
    'Trombocitopenia + anemia hemolítica + febre = suspeita forte de babesiose.',
    'Diferencie o tamanho da Babesia: grandes usam imidocarb; pequenas usam atovaquona + azitromicina.',
    'Esfregaço de ponta de orelha (sangue capilar) aumenta muito a chance de ver o parasita.',
    'PCR de sangue total é o padrão ouro e ajuda na diferenciação das espécies.',
    'Em casos complicados, monitore a função renal (creatinina/fósforo) e pancreatite.'
  ],
  quickSummaryRich: {
    lead:
      'A babesiose canina destrói hemácias de duas formas: por invasão direta do parasita e por induzir uma hemólise imunomediada secundária (AHIM). O segredo clínico está em reconhecer o tamanho da Babesia (grande vs pequena) para definir o protocolo terapêutico correto e monitorar lesões em órgãos-alvo como rins e pâncreas.',
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
            'Sangue capilar periférico da margem interna da orelha para visualização de mórulas/merozoítos — sensibilidade limitada se parasitemia baixa (Nelson & Couto, 6ª ed.; BSAVA Emergency and Critical Care).',
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
      'Protozoário intracelular obrigatório pertencente à ordem Piroplasmida, família Babesiidae e gênero *Babesia*. Infectam e multiplicam-se no interior dos eritrócitos (hemácias).',
    classificacao: {
      kind: 'clinicalTable',
      headers: ['Grupo', 'Espécies importantes', 'Comentário clínico'],
      rows: [
        [
          'Babesias grandes',
          '*Babesia canis*, *Babesia vogeli*, *Babesia rossi*',
          'Têm tamanho de 2,5-5,0 µm. São tratadas preferencialmente com dipropionato de imidocarb ou diminazeno.'
        ],
        [
          'Babesias pequenas',
          '*Babesia gibsoni*, *Babesia conradae*, *Babesia vulpes*',
          'Têm tamanho de 1,0-2,5 µm. São refratárias ao imidocarb isolado e exigem atovaquona + azitromicina.'
        ]
      ]
    },
    fontesLivro:
      'Nelson & Couto (6ª ed., cap. 98) detalha as infecções por protozoários polissistêmicos, diferenciando a suscetibilidade e a apresentação clínica entre as espécies de *Babesia*.'
  },
  epidemiology: {
    vetor:
      'O principal vetor no Brasil é o carrapato-marrom-do-cão (*Rhipicephalus sanguineus*). A transmissão ocorre pela picada do carrapato infectado (inoculação de esporozoítos durante o repasto sanguíneo, o que requer cerca de 24-36h de fixação, embora transmissões mais rápidas tenham sido descritas).',
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
      'O hospedeiro desenvolve uma resposta imune humoral e celular contra os antígenos do protozoário que são expostos na membrana das hemácias. Isso faz com que eritrócitos não parasitados também sejam destruídos no baço e fígado (hemólise extravascular), simulando uma anemia hemolítica imunomediada (AHIM) secundária. Reticulocitose e esferócitos são frequentes.',
    trombocitopenia:
      'A redução plaquetária é constante e ocorre por sequestro esplênico, consumo inflamatório e destruição imunomediada mediada por anticorpos antiplaquetários.',
    sirs:
      'Em infecções agudas por B. rossi ou quadros graves de B. canis, a liberação massiva de mediadores inflamatórios desencadeia a Síndrome de Resposta Inflamatória Sistêmica (SRIS), culminando em choque, hipotensão, acidose láctica e disfunção renal/pancreática.',
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
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Febre, letargia, anorexia e esplenomegalia',
          mechanism:
            'A parasitemia libera citocinas pirogênicas e ativa resposta imune no baço, que sequestra eritrócitos parasitados e não parasitados.',
          clinicalMeaning: 'Forma aguda não complicada; esplenomegalia é achado frequente na palpação.',
          priority: 'common',
        },
        {
          finding: 'Mucosas pálidas, icterícia e urina escura (pigmentúria)',
          mechanism:
            'Hemólise intravascular e extravascular eleva bilirrubina e hemoglobina livre; a hemoglobinúria escurece a urina.',
          clinicalMeaning: 'Indica anemia hemolítica ativa; correlacionar com PCV e esfregaço.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Anemia regenerativa com reticulocitose e esferócitos',
          mechanism:
            'Destruição eritrocitária direta pelo parasita e hemólise imunomediada secundária (AHIM) destruem hemácias no baço e fígado.',
          clinicalMeaning: 'Trombocitopenia concomitante reforça suspeita de babesiose em área endêmica.',
          priority: 'common',
        },
        {
          finding: 'Trombocitopenia acentuada',
          mechanism:
            'Sequestro esplênico, consumo inflamatório e destruição imunomediada de plaquetas reduzem a contagem.',
          clinicalMeaning: 'Weingart et al. (2023) encontraram plaquetopenia em 100% dos 49 cães com B. canis avaliados.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'multisystemic',
      findings: [
        {
          finding: 'Colapso, hipotensão, dispneia, oligúria e hemorragias',
          mechanism:
            'SRIS desencadeia vasodilatação, coagulopatia (CIVD), lesão renal aguda e acidose metabólica; hipoglicemia pode complicar.',
          clinicalMeaning: 'Forma grave com prognóstico reservado; azotemia e hipoalbuminemia são marcadores de mortalidade.',
          priority: 'emergency',
        },
        {
          finding: 'Convulsões, ataxia ou alteração neurológica',
          mechanism:
            'Hipoxia cerebral, hipoglicemia ou lesão vascular cerebral secundária à coagulopatia e hipoperfusão.',
          clinicalMeaning: 'Exige estabilização imediata e investigação de complicações metabólicas.',
          priority: 'emergency',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem clínica e suspeita epidemiológica',
      purpose: 'Identificar combinação sugestiva de anemia hemolítica, trombocitopenia e exposição a carrapatos.',
      description:
        'Histórico de carrapatos, mucosas pálidas, febre, icterícia, pigmentúria e esplenomegalia. Associar hemograma com anemia regenerativa e plaquetopenia (Nelson & Couto, 6ª ed.; Dantas-Torres & Figueredo, 2006).',
      interpretation: 'Trombocitopenia + anemia hemolítica + febre em cão exposto a carrapatos coloca babesiose no topo dos diferenciais.',
      limitations: 'Ausência de relato de carrapatos não exclui doença; coinfecção com Ehrlichia ou Anaplasma é frequente.',
    },
    {
      stepNumber: 2,
      title: 'Esfregaço sanguíneo periférico (ponta de orelha)',
      purpose: 'Detectar merozoítos piriformes quando a parasitemia é detectável.',
      description:
        'Sangue capilar da margem interna da orelha aumenta sensibilidade. Visualiza mórulas/merozoítos em formato de pera (Nelson & Couto, 6ª ed.).',
      interpretation: 'Parasita visível confirma infecção ativa, mas a espécie nem sempre é distinguível morfologicamente.',
      limitations: 'Sensibilidade baixa em parasitemias baixas ou após tratamento parcial; esfregaço negativo não exclui.',
    },
    {
      stepNumber: 3,
      title: 'PCR em sangue total',
      purpose: 'Confirmar infecção ativa e diferenciar espécies grandes de pequenas antes de escolher esquema terapêutico.',
      description:
        'Colher sangue total antes de antiparasitários. PCR diferencia B. canis/vogeli (grande) de B. gibsoni (pequena) (Nelson & Couto, 6ª ed.).',
      interpretation: 'PCR positiva confirma infecção; espécie define imidocarb versus atovaquona + azitromicina.',
      limitations: 'Resultado negativo em fase muito precoce ou após uma dose de tratamento; repetir se suspeita alta.',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Bioquímica, urinálise e marcadores de gravidade',
      purpose: 'Estadiar complicações renais, hepáticas e prognóstico.',
      description:
        'Ureia, creatinina, bilirrubina, albumina, fósforo e urinálise com pesquisa de hemoglobinúria e proteinúria.',
      interpretation: 'Azotemia e hipoalbuminemia associam-se a maior mortalidade em casos graves (Weingart et al., 2023).',
      limitations: 'Alterações inespecíficas; pancreatite e LRA podem ter outras causas concomitantes.',
    },
    {
      stepNumber: 5,
      title: 'Sorologia (RIFI/ELISA)',
      purpose: 'Triagem epidemiológica e documentação de exposição prévia.',
      description:
        'Detecta anticorpos IgG/IgM; útil em vigilância e doadores de sangue.',
      interpretation: 'Título elevado com clínica compatível sustenta exposição; isolado não prova doença ativa.',
      limitations: 'Falso-negativo na fase aguda precoce; positivo pode persistir após cura clínica.',
    },
  ],
  treatment: {
    especifica: [
      'Nelson & Couto (6ª ed.) diferenciam babesias grandes (B. canis, B. vogeli, B. rossi) de pequenas (B. gibsoni). Conclusão: babesias grandes respondem a dipropionato de imidocarb 6,6 mg/kg IM/SC em duas doses com intervalo de 14 dias; atropina 0,02–0,04 mg/kg SC/IM 15–30 min antes reduz efeitos colinérgicos. Babesias pequenas exigem atovaquona 13,3 mg/kg VO q8h + azitromicina 10 mg/kg VO q24h por 10 dias, com atovaquona administrada com alimento gorduroso — imidocarb isolado é inadequado.',
      'Diminazeno aceturato (3,5 mg/kg IM dose única) permanece alternativa para babesias grandes, mas Budde e McCluskey (2023) alertam para toxicidade neurológica imprevisível (ataxia, convulsões). Conclusão: reservar para situações selecionadas com consentimento informado.',
    ],
    suporte: [
      'BSAVA Emergency and Critical Care recomenda transfusão de concentrado de hemácias ou sangue total quando PCV <15–18% com hipóxia tecidual. Conclusão: corrigir anemia antes de hemodiluição agressiva por fluidoterapia.',
      'Fluidoterapia criteriosa mantém perfusão renal sem hemodiluir excessivamente; monitorar creatinina, fósforo e sinais de pancreatite em casos graves.',
      'Corticoterapia (prednisolona) é controversa: indicar apenas em AHIM secundária grave confirmada, evitando uso indiscriminado que pode agravar parasitemia.',
    ],
    monitoramento: [
      'PCV, lactato e sinais de hipóxia a cada revisão na fase aguda.',
      'Creatinina, fósforo e função hepática em casos complicados.',
      'Repetir PCR ou esfregaço conforme resposta clínica e laboratorial.',
    ],
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
