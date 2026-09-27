import { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet';

/**
 * Babesiose Canina — Guia Clínico e Terapêutico de Padrão Ouro.
 * Embasamento: Greene's Infectious Diseases of the Dog and Cat 5ª ed. 2023 > Ettinger's 9ª ed. 2024 >
 * Nelson & Couto 6ª ed. > BSAVA Emergency and Critical Care 3ª ed. > Plumb's 10ª ed. > Weingart et al. 2023.
 */
export const babesioseCaninaRecord: DiseaseRecord = {
  id: 'disease-babesiose-canina',
  slug: 'babesiose-canina',
  title: 'Babesiose canina',
  subtitle: 'Hemoparasitose por piroplasmas: anemia hemolítica intravascular e imunomediada, diferenciação de espécies grandes vs pequenas, protocolos de imidocarb e atovaquona-azitromicina, e manejo de sepse/CIVD',
  synonyms: [
    'Babesiosis',
    'Nambiuvú',
    'Febre do carrapato canina',
    'Piroplasmose canina',
    'Anemia hemolítica por Babesia'
  ],
  species: ['dog'],
  category: 'infectologia',
  categories: ['infectologia', 'parasitologia', 'hematologia', 'urgencia-emergencia', 'clinica-medica'],
  tags: [
    'Carrapato',
    'Rhipicephalus sanguineus',
    'Babesia canis',
    'Babesia vogeli',
    'Babesia gibsoni',
    'Anemia Hemolitica',
    'AHIM secundaria',
    'Trombocitopenia',
    'Imidocarb',
    'Atovaquona',
    'Azitromicina',
    'SIRS',
    'CIVD'
  ],
  isPublished: true,

  quickSummary:
    'A babesiose canina é uma grave hemoparasitose polissistêmica causada por protozoários intraeritrocitários do gênero Babesia, transmitida pelo carrapato Rhipicephalus sanguineus, transfusões sanguíneas ou mordeduras (em B. gibsoni). O parasita induz destruição de eritrócitos por lise intravascular direta e, fundamentalmente, por anemia hemolítica imunomediada (AHIM) extravascular secundária, acompanhada de trombocitopenia acentuada em praticamente 100% dos animais. Casos graves evoluem com Síndrome de Resposta Inflamatória Sistêmica (SRIS/SIRS), Lesão Renal Aguda pigmentar, choque hipotensivo e Coagulação Intravascular Disseminada (CIVD). O diagnóstico rápido baseia-se na citologia de esfregaço de sangue capilar (ponta de orelha) e confirmação definitiva por PCR em sangue total. O tratamento farmacológico exige estrita diferenciação etiológica: babesias grandes (B. vogeli, B. canis) respondem ao dipropionato de imidocarb com atropinização prévia, ao passo que babesias pequenas (B. gibsoni) são refratárias ao imidocarb e requerem a associação de atovaquona com alimento gorduroso e azitromicina.',

  quickDecisionStrip: [
    'Anemia regenerativa rápida + trombocitopenia grave + febre + esplenomegalia = suspeita clínica máxima de babesiose.',
    'Diferenciação mandatória do parasita: babesias grandes (B. vogeli/canis) usam Imidocarb; babesias pequenas (B. gibsoni) exigem Atovaquona + Azitromicina (o imidocarb isolado FALHA em B. gibsoni).',
    'Colheita de sangue capilar de ponta de orelha (punção periférica com agulha 25G) aumenta sensivelmente a chance de visualizar os merozoítos piriformes pareados.',
    'PCR de sangue total em EDTA é o padrão-ouro confirmatório e deve ser colhido idealmente ANTES da primeira dose de antiparasitário.',
    'Atropina (0,02 a 0,04 mg/kg SC) deve ser administrada 15 a 30 minutos antes do imidocarb para prevenir sialorreia, vômitos, cólicas e bradicardia colinérgica.',
    'Atovaquona DEVE ser administrada obrigatoriamente junto a uma refeição rica em gordura para elevar sua biodisponibilidade em até 300%.',
    'Monitorar creatinina, ureia, urinálise e lactato seriados: a hemoglobinúria e a hipóxia renal deflagram Lesão Renal Aguda tubular isquêmica/pigmentar.',
    'Indicar transfusão de concentrado de hemácias se hematócrito (PCV) <15-18% associado a sinais de hipóxia tecidual (taquicardia, pulso fraco, letargia, lactato >3,0 mmol/L).',
    'Corticoterapia imunossupressora (prednisona 2 mg/kg/dia) é restrita a casos com AHIM secundária comprovadamente autoaglutinante e hiperaguda, devendo ser desmamada rapidamente para evitar persistência parasitária.',
    'Babesia gibsoni apresenta transmissão direta por mordeduras e brigas: triar rigorosamente cães da raça American Pit Bull Terrier e American Staffordshire Terrier.'
  ],

  quickSummaryRich: {
    lead:
      'A babesiose canina destrói a massa de eritrócitos através de um mecanismo duplo de lise mecânica direta e autoimunidade secundária esplênica. A letalidade clínica correlaciona-se à intensidade da resposta inflamatória sistêmica (SIRS) e à presença de dano renal ou neurológico. O sucesso terapêutico depende da seleção farmacológica rigorosa guiada pelo tamanho e espécie do piroplasma.',
    leadHighlights: [
      'Destruição mecânica direta e imunomediada (AHIM)',
      'Trombocitopenia em até 100% dos pacientes',
      'Babesia grande (Imidocarb) vs Pequena (Atovaquona/Azitro)',
      'Esfregaço capilar de ponta de orelha',
      'PCR em sangue total como padrão-ouro',
      'Risco de Lesão Renal Aguda e CIVD'
    ],
    pillars: [
      {
        title: 'Pilar 1: Duplo Mecanismo de Hemólise e Trombocitopenia',
        body: 'O merozoíto penetra no eritrócito e provoca lise intravascular. Simultaneamente, antígenos parasitários e do hospedeiro expostos na membrana celular atraem anticorpos IgG/IgM e complemento, desencadeando intensa fagocitose por macrófagos no baço e fígado (hemólise extravascular). Isso gera esferocitose, reticulocitose e teste de Coombs positivo, simulando AHIM primária. O sequestro esplênico e anticorpos antiplaquetários geram trombocitopenia profunda.',
        highlights: ['Hemólise intravascular e extravascular', 'Mimetismo com AHIM primária', 'Plaquetopenia severa por consumo e destruição']
      },
      {
        title: 'Pilar 2: Estratificação Morfológica e Terapêutica Guiada por Espécie',
        body: 'A abordagem farmacológica divide-se de acordo com o tamanho do protozoário: babesias grandes (B. canis, B. vogeli, B. rossi) medem 2,5-5,0 µm e são eliminadas ou controladas com dipropionato de imidocarb. Babesias pequenas (B. gibsoni, B. conradae, B. vulpes) medem 1,0-2,5 µm, não respondem ao imidocarb isolado e exigem a combinação de atovaquona e azitromicina por 10 dias.',
        highlights: ['B. vogeli/canis: Imidocarb com atropina prévia', 'B. gibsoni: Atovaquona + Azitromicina', 'Evitar uso empírico inadequado']
      },
      {
        title: 'Pilar 3: Monitoramento de Órgãos-Alvo e Complicações Sistêmicas',
        body: 'A liberação de hemoglobina livre associada à hipotensão e endotoxemia lesa os túbulos renais (nefropatia pigmentar isquêmica). A ativação da cascata de coagulação por citocinas pró-inflamatórias favorece CIVD. Hipotermia, acidose láctica, azotemia e hipoalbuminemia são marcadores laboratoriais objetivos de mau prognóstico e exigem suporte em UTI.',
        highlights: ['Nefropatia por hemoglobina e hipóxia', 'Triagem para CIVD e marcadores de SIRS', 'Fluidoterapia e suporte transfusional']
      }
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Sequencial da Babesiose Canina',
      steps: [
        {
          label: 'Passo 1: Reconhecimento Clínico e Triagem Epidemiológica',
          detail: 'Cão com histórico de carrapatos, histórico de brigas/mordeduras (em terriers) ou transfusão prévia, apresentando palidez de mucosas, febre (39,5 a 41°C), icterícia, urina cor de coca-cola (hemoglobinúria/bilirrubinúria), apatia profunda e esplenomegalia à palpação abdominal.'
        },
        {
          label: 'Passo 2: Esfregaço Sanguíneo Capilar de Ponta de Orelha',
          detail: 'Realizar antissepsia da margem da orelha, puncionar capilar periférico com agulha fina 25G ou lanceta, confeccionar esfregaço imediato em lâmina de vidro e corar com Giemsa, Wright ou Panótico Rápido. Inspecionar sob imersão (1000x): pesquisar merozoítos piriformes (em gota ou lágrima) dentro das hemácias, frequentemente unidos pelas extremidades afiladas.'
        },
        {
          label: 'Passo 3: Hemograma Completo e Avaliação de Reticulócitos',
          detail: 'Identificar grau de anemia (hematócrito <30% até <15%), verificar se regenerativa (reticulócitos >60.000-100.000/µL, policromasia, anisocitose), presença de esferócitos, leucograma inflamatório com desvio à esquerda e contagem plaquetária (geralmente trombocitopenia marcante <50.000/µL).'
        },
        {
          label: 'Passo 4: PCR em Sangue Total (Padrão-Ouro de Identificação)',
          detail: 'Colher 1 a 2 mL de sangue total em EDTA e enviar para laboratório de referência para ensaio de PCR convencional ou em tempo real (qPCR). O teste é mandatório para diferenciar B. vogeli de B. gibsoni, confirmar infecções com baixa parasitemia onde a microscopia é negativa e monitorar a eliminação parasitária pós-terapia.'
        },
        {
          label: 'Passo 5: Painel Bioquímico Renal, Hepático e Gasometria/Lactato',
          detail: 'Dosagem de creatinina, ureia, bilirrubinas totais e frações, alanina aminotransferase (ALT), fosfatase alcalina (FA), albumina sérica, urinálise e mensuração de lactato venoso. Avaliar se há azotemia (lesão renal aguda tubular), hiperbilirrubinemia mista e hiperlactatemia tecidual.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Manejo Crítico',
      steps: [
        {
          label: 'Fase 1: Terapia Etiológica Antimicrobiana Estratificada',
          detail: 'Se Babesia grande (B. vogeli / B. canis): administrar Atropina (0,02 a 0,04 mg/kg SC) e após 15 a 30 minutos injetar Dipropionato de Imidocarb (6,6 mg/kg IM ou SC profunda); repetir a segunda dose exatamente 14 dias depois. Se Babesia pequena (B. gibsoni): prescrever Atovaquona (13,3 mg/kg VO a cada 8 horas administrada rigorosamente junto com alimento gorduroso) + Azitromicina (10 mg/kg VO a cada 24 horas) por 10 dias consecutivos.'
        },
        {
          label: 'Fase 2: Suporte Transfusional Imediato',
          detail: 'Se hematócrito (PCV) < 15-18% com manifestações de hipóxia grave, hipotensão, letargia profunda ou lactato > 3,0 mmol/L: transfundir Concentrado de Hemácias (10 a 15 mL/kg) ou Sangue Total fresco (20 mL/kg) com filtro de transfusão padrão em 2 a 4 horas. Realizar prova de compatibilidade cruzada (crossmatch) antes da infusão.'
        },
        {
          label: 'Fase 3: Ressuscitação Volêmica e Nefroproteção',
          detail: 'Fluidoterapia com cristaloides balanceados (Ringer Lactato ou Plasmalyte) ajustada para restaurar a volemia e garantir débito urinário >= 1 a 2 mL/kg/h, prevenindo a precipitação de cilindros de hemoglobina nos túbulos renais. Evitar sobrecarga hídrica caso haja oligúria instalada.'
        },
        {
          label: 'Fase 4: Controle de Complicações Graves (SIRS / LRA / CIVD)',
          detail: 'Monitorar pressão arterial sistêmica (alvo PAM >= 70-80 mmHg), débito urinário, eletrólitos, gasometria e tempo de coagulação (TP e TTPA). Se choque séptico/SIRS: suporte vasopressor (norepinefrina 0,1 a 1 mcg/kg/min) se hipotensão refratária a fluidos. Se sinais de tromboembolismo ou CIVD inicial: heparina de baixo peso molecular (enoxaparina 0,8 a 1,0 mg/kg SC q8-12h).'
        },
        {
          label: 'Fase 5: Acompanhamento Pós-Tratamento e Cura Parasitológica',
          detail: 'Reavaliar hematócrito e plaquetas no 3º, 7º, 14º e 30º dia. Em B. gibsoni, realizar novo PCR em sangue total aos 30 e 60 dias pós-tratamento para confirmar ausência de estado de carreador assintomático crônico ou recidiva.'
        }
      ]
    }
  },

  etiology: {
    agente:
      'Protozoários hemoparasitas intracelulares obrigatórios da ordem Piroplasmida, família Babesiidae e gênero Babesia. Infectam preferencialmente os eritrócitos maduros de canídeos domésticos e silvestres, multiplicando-se por fissão binária e esquizogonia intraeritrocitária.',
    classificacao: {
      kind: 'clinicalTable',
      headers: ['Grupo Morfológico', 'Espécies Caninas', 'Vetor / Transmissão', 'Resposta Terapêutica'],
      rows: [
        [
          'Babesias Grandes (2,5 a 5,0 µm)',
          'Babesia vogeli (global, prevalente no Brasil), Babesia canis (Europa), Babesia rossi (África do Sul, hipervirulenta)',
          'Rhipicephalus sanguineus (carrapato-marrom-do-cão), transfusão de sangue',
          'Altamente sensíveis ao Dipropionato de Imidocarb e ao Diminazeno aceturato'
        ],
        [
          'Babesias Pequenas (1,0 a 2,5 µm)',
          'Babesia gibsoni (Ásia, EUA, Brasil), Babesia vulpes (antiga B. microti-like), Babesia conradae (Califórnia)',
          'Mordeduras/brigas entre cães (Pit Bulls), transfusão, transplacentária, carrapatos (Haemaphysalis, Rhipicephalus)',
          'Refratárias ao imidocarb isolado; respondem à Atovaquona + Azitromicina ou Buparvaquona'
        ]
      ]
    },
    caracteristicasMorfologicas:
      'Ao exame microscópico sob imersão com coloração tipo Romanowsky (Giemsa ou Panótico), as babesias grandes apresentam formato característico piriforme (em gota), frequentemente encontradas aos pares unidas pela extremidade afilada formando um ângulo agudo no interior da hemácia. As babesias pequenas apresentam formas arredondadas, anelares ou ovóides pleomórficas, medindo cerca de um terço do diâmetro da hemácia, sendo facilmente confundidas com precipitados de corante, corpúsculos de Howell-Jolly ou Mycoplasma se o analista for inexperiente.'
  },

  epidemiology: {
    vetorETransmissao:
      'No Brasil e na América Latina, o vetor biológico primordial é o carrapato-marrom-do-cão (*Rhipicephalus sanguineus sensu lato*). A transmissão dos esporozoítos ocorre pela saliva do carrapato durante o repasto sanguíneo na pele do cão. Tradicionalmente requer de 24 a 48 horas de fixação para que o esporozoíto atinja a forma infectante nas glândulas salivares do carrapato, embora inoculações mais rápidas tenham sido descritas. Ocorre transmissão transestadial e transovariana no carrapato fêmea.',
    figuraVetor: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/diseases/babesiose/rhipicephalus-sanguineus-female-male.jpg`,
      alt: 'Macho e fêmea de Rhipicephalus sanguineus em vista dorsal',
      display: 'wide',
      caption:
        'Rhipicephalus sanguineus, carrapato-marrom-do-cão. Vetor biológico primordial de Babesia vogeli em áreas urbanas e periurbanas no Brasil.'
    },
    outrasViasDeTransmissao:
      'Transmissão mecânica direta através de transfusão de sangue e hemoderivados colhidos de doadores caninos subclínicos carreadores sem triagem molecular por PCR; transmissão transplacentária vertical de cadelas infectadas para os fetos; e transmissão horizontal direta por mordeduras, brigas com laceração gengival e inoculação direta de sangue contaminado, rota amplamente documentada para *Babesia gibsoni* em populações de cães de combate (American Pit Bull Terrier, Staffordshire Bull Terrier).',
    distribuicaoSazonalEGeografica:
      'Endêmica em todo o território brasileiro em razão do clima tropical e subtropical favorável à proliferação contínua do vetor carrapato durante todo o ano, com picos de infecção nos meses de primavera e verão. Cães filhotes, idosos, esplenectomizados ou imunossuprimidos exibem maior risco de manifestações fulminantes.'
  },

  pathogenesisTransmission: {
    invasaoEHemoliseIntravascular:
      'O esporozoíto inoculado liga-se a receptores específicos na membrana do eritrócito maduro, induzindo invaginação e endocitose ativa. No interior da hemácia, liberta-se do vacúolo parasitóforo e divide-se repetidamente por fissão binária, formando merozoítos. Ao romperem a membrana eritrocitária para infectar novas hemácias, liberam hemoglobina livre, fosfolipídios e proteases no plasma, configurando a hemólise intravascular direta.',
    hemoliseExtravascularEAHIMSecundaria:
      'Durante a replicação, o parasita incorpora antígenos estranhos à superfície da hemácia e altera a conformação de proteínas da membrana, expondo antígenos crípticos normais do hospedeiro. O sistema imunológico reconhece essas hemácias como não-próprias, produzindo autoanticorpos (IgG e IgM) e ativando o sistema complemento. Eritrócitos mesmo não parasitados são opsonizados e sofrem remoção precoce e fagocitose pelo sistema monocítico-macrofágico esplênico e hepático (hemólise extravascular). Isso deflagra um quadro idêntico à Anemia Hemolítica Imunomediada (AHIM) primária, com presença conspícua de esferócitos, reticulocitose intensa e teste de Coombs (DAT) positivo.',
    trombocitopeniaPatogenese:
      'A plaquetopenia é praticamente universal (>98% dos casos). Decorre de sequestro esplênico em um baço massivamente reativo e congestivo, consumo plaquetário em focos de microtrombose inflamatória induzida pelo dano endotelial e destruição imunomediada por anticorpos antiplaquetários secundários que reduzem a meia-vida plaquetária para poucas horas.',
    cascataDeSIRSAChoque:
      'A lise de eritrócitos libera substâncias DAMPs (Damage-Associated Molecular Patterns), como heme livre e DNA livre, associadas a glicofosfatidilinositol (GPI) parasitário. Isso ativa macrófagos e neutrófilos através de receptores Toll-like (TLR-2 e TLR-4), gerando liberação em massa de citocinas pró-inflamatórias (TNF-alfa, IL-1, IL-6, IFN-gama) e óxido nítrico sintase induzível (iNOS). A vasodilatação patológica sistêmica, a permeabilidade capilar acentuada e o dano oxidativo endotelial produzem hipotensão refratária, colapso hemodinâmico, hipoxemia tecidual e disfunção de múltiplos órgãos (MODS).'
  },

  pathophysiology: {
    microscopiaMerozoitos: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/diseases/babesiose/babesia-canis-dog-walker.jpg`,
      alt: 'Microscopia de esfregaço de sangue periférico com Babesia canis',
      display: 'wide',
      caption:
        'Esfregaço sanguíneo canino corado por Giemsa exibindo merozoítos piriformes pareados de Babesia canis no interior de eritrócitos. Imagem de Alan R. Walker/Wikimedia Commons (CC BY-SA 3.0).'
    },
    consequenciasRenais:
      'A hemoglobina livre extravasada no plasma ultrapassa a capacidade de ligação da haptoglobina circulante, filtrando-se livremente pelos glomérulos renais (hemoglobinúria). No lúmen dos túbulos contorcidos distais e coletores, sob pH urinário ácido e fluxo lento, a hemoglobina precipita-se formando cilindros densos que obstruem o fluxo tubular. Além disso, o heme livre exerce toxicidade citotóxica oxidativa direta sobre as células epiteliais tubulares e induz vasoconstrição da arteríola aferente renal por depleção de óxido nítrico, culminando em Necrose Tubular Aguda (NTA) isquêmica e nefropatia pigmentar grave com anúria ou oligúria.',
    comprometimentoHepatoBiliar:
      'A fagocitose maciça de eritrócitos sobrecarrega os macrófagos esplênicos e as células de Kupffer hepáticas, gerando hiperbilirrubinemia não conjugada (indireta). À medida que o fígado sofre hipóxia centrolobular decorrente da anemia severa e do choque inflamatório, a capacidade de conjugação e excreção biliar colapsa, resultando em hiperbilirrubinemia mista com icterícia visível em mucosas, esclera e pele abdominal.',
    coagulopatiaECIVD:
      'A lesão das células endoteliais expõe o fator tecidual subendotelial, deflagrando a ativação descontrolada da via extrínseca da coagulação. Microtrombos de fibrina depositam-se na microcirculação de rins, pulmões, pâncreas e cérebro, exacerbando a hipóxia tecidual. Com a exaustão progressiva dos fatores de coagulação e das plaquetas (coagulopatia de consumo), o paciente transita para a fase hemorrágica da Coagulação Intravascular Disseminada (CIVD), com petéquias, sufusões, epistaxe e hemorragias intracavitárias.'
  },

  clinicalSignsPathophysiology: {
    sinaisGeraisEAgudos: [
      'Febre alta e remitente (39,5°C a 41,0°C) acompanhada de prostração, anorexia profunda e adipsia decorrentes da liberação maciça de pirógenos endógenos (IL-1, TNF-alfa).',
      'Palidez acentuada de mucosas orais, conjuntivais e genitais refletindo queda vertiginosa do hematócrito secundária à hemólise intravascular e extravascular.',
      'Icterícia generalizada em esclera, mucosa jugal, palato e pele decorrente do acúmulo de bilirrubina tecidual pela sobrecarga hemolítica.',
      'Urina cor de café ou vinho tinto (pigmentúria por hemoglobinúria e bilirrubinúria acentuadas).',
      'Esplenomegalia pronunciada e indolor à palpação abdominal decorrente de congestão vascular e hiperplasia reativa do sistema reticuloendotelial do baço.',
      'Linfoadenomegalia reativa periférica generalizada (linfonodos submandibulares, pré-escapulares e poplíteos).'
    ],
    sinaisComplicadosEEmergenciais: [
      'Taquicardia severa e sopro sistólico carotídeo/mitral inocente grau II-IV/VI por diminuição da viscosidade sanguínea e hiperdinamismo compensatório.',
      'Taquipneia, respiração agônica e dispneia restritiva por anemia hipóxica severa, acidose metabólica lática compensatória ou Síndrome do Desconforto Respiratório Agudo (SDRA / choque pulmonar).',
      'Hipotermia (<37,5°C), pulso femoral filiforme ou ausente, tempo de preenchimento capilar (TPC) > 2,5 segundos e extremidades frias na transição para choque séptico descompensado.',
      'Petéquias, equimoses, sufusões cutâneas e epistaxe decorrentes da trombocitopenia profunda associada à CIVD de consumo.',
      'Sinais Neurológicos (Babesiose Cerebral): depressão mental estuporosa, ataxia, opistótono, paresia, desvio de cabeça e convulsões secundárias a microêmbolos cerebrais, hipoglicemia e hipóxia.',
      'Vômitos incoercíveis, dor abdominal cranial e diarreia hemorrágica por pancreatite aguda isquêmica secundária à microtrombose mesentérica.'
    ]
  },

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem Clínica, Hematológica e Suspeita Epidemiológica',
      purpose: 'Identificar a tríade clássica de anemia hemolítica regenerativa + trombocitopenia + febre.',
      description:
        'Histórico minucioso de contato com carrapatos, procedência de áreas endêmicas, raças de combate ou histórico de transfusão. Confirmar no hemograma anemia marcante, reticulocitose (>100.000/µL), macrocitose, hipocromia e trombocitopenia acentuada (<50.000/µL).',
      interpretation: 'A coexistência de anemia regenerativa e plaquetopenia grave coloca a babesiose no topo dos diferenciais em áreas tropicais.',
      limitations: 'Em fases hiperagudas precoces (<48 horas da lise), a anemia pode apresentar-se transitoriamente não regenerativa até que a medula óssea responda.'
    },
    {
      stepNumber: 2,
      title: 'Citologia de Sangue Capilar Periférico (Ponta de Orelha)',
      purpose: 'Visualização microscópica rápida e de baixo custo dos piroplasmas intraeritrocitários.',
      description:
        'Realizar assepsia da margem da pina auricular, efetuar punção com agulha fina 25G para obter sangue capilar lento, estender esfregaço em lâmina de vidro e corar por Giemsa ou Panótico Rápido. Inspecionar sob objetiva de imersão de 1000x nas bordas do esfregaço onde as hemácias encontram-se em camada única.',
      interpretation: 'Merozoítos piriformes pareados confirmam o diagnóstico de babesiose ativa. O tamanho permite distinção morfológica provisória entre babesias grandes (ocupam >metade do raio da hemácia) e pequenas.',
      limitations: 'Sensibilidade analítica limitada em parasitemias muito baixas (<0,1% das hemácias), em infecções crônicas ou após tratamentos prévios empíricos incompletos. Um esfregaço negativo NÃO exclui a doença.'
    },
    {
      stepNumber: 3,
      title: 'Reação em Cadeia da Polimerase (PCR em Sangue Total)',
      purpose: 'Identificação molecular de alta sensibilidade e especificidade com distinção exata da espécie.',
      description:
        'Colheita de 1 a 2 mL de sangue total em tubo com EDTA antes da administração de qualquer antiprotozoário. Amplifica sequências conservadas do gene do RNA ribossômico 18S de Babesia spp.',
      interpretation: 'Padrão-ouro (*isGoldStandard: true*). Positivo confirma infecção ativa mesmo em parasitemias mínimas. Diferencia inequivocamente *B. vogeli* e *B. canis* de *B. gibsoni*, sendo o exame que dita se a escolha medicamentosa deve ser Imidocarb ou Atovaquona + Azitromicina.',
      limitations: 'Pode demorar de 24 a 72 horas para resultado em rotinas laboratoriais de envio externo; não deve atrasar o início do suporte emergencial e antiparasitário em cães instáveis.',
      isGoldStandard: true
    },
    {
      stepNumber: 4,
      title: 'Painel Bioquímico Renal, Hepático e Avaliação Urinária',
      purpose: 'Estadiamento de lesões em órgãos-alvo (LRA, hepatopatia, pancreatite) e marcadores prognósticos.',
      description:
        'Dosagem sérica de creatinina, ureia, albumina, fósforo, ALT, FA, bilirrubina total/fração e urinálise completa por cistocentese com pesquisa de proteinúria, cilindros granulosos e hemoglobinúria.',
      interpretation: 'Azotemia com densidade urinária isostenúrica confirma Lesão Renal Aguda intrínseca por hemoglobinúria e hipoperfusão. Hipoalbuminemia (<2,0 g/dL) e azotemia correlacionam-se diretamente com maior mortalidade.',
      limitations: 'Disfunções são secundárias ao choque inflamatório e hipóxia; não substituem a identificação direta do agente.'
    },
    {
      stepNumber: 5,
      title: 'Sorologia (Imunofluorescência Indireta - RIFI ou ELISA)',
      purpose: 'Avaliação de títulos de anticorpos IgG/IgM em triagem de doadores ou inquéritos epidemiológicos.',
      description:
        'Detecção de anticorpos circulantes anti-Babesia no soro.',
      interpretation: 'Títulos elevados (>1:80 na RIFI) comprovam contato prévio ou infecção crônica. Em doadores de sangue, qualquer positividade desqualifica o animal.',
      limitations: 'Falso-negativo frequente nos primeiros 7 a 14 dias da fase hiperaguda (janela imunológica). Não diferencia cura clínica de infecção subclínica persistente.'
    }
  ],

  treatment: {
    protocolosEtiologicos: [
      {
        drug: 'Dipropionato de Imidocarb (para Babesias Grandes: B. vogeli / B. canis)',
        dose: '6,6 mg/kg por via intramuscular (IM profunda) ou subcutânea (SC). Administrar duas aplicações com intervalo estrito de 14 dias entre elas.',
        mechanism: 'Interfere na síntese de DNA e no metabolismo de poliaminas dos piroplasmas, provocando rápida degeneração vacolar e lise dos merozoítos.',
        cautions: 'Potente inibidor reversível da acetilcolinesterase. Efeitos adversos colinérgicos imediatos são comuns: sialorreia abundante, náusea, vômitos, cólicas abdominais, diarreia, tremores musculares e dor intensa no sítio de injeção. Para prevenir esses efeitos, DEVE-SE administrar Sulfato de Atropina (0,02 a 0,04 mg/kg SC) 15 a 30 minutos ANTES da aplicação do imidocarb.',
        contraindications: 'NÃO utilizar para Babesia gibsoni (ineficaz, não elimina o parasita e induz resistência). Contraindicado em pacientes com insuficiência hepática terminal pré-existente ou intoxicações colinérgicas.'
      },
      {
        drug: 'Atovaquona + Azitromicina (Padrão-Ouro para Babesia Pequena: B. gibsoni)',
        dose: 'Atovaquona: 13,3 mg/kg VO a cada 8 horas + Azitromicina: 10 mg/kg VO a cada 24 horas, ambos por 10 dias consecutivos.',
        mechanism: 'A atovaquona inibe seletivamente o complexo mitocondrial bc1 dos protozoários, bloqueando o transporte de elétrons e a síntese de ATP; a azitromicina inibe a tradução proteica ribosomal no apicoplasto parasitário. Ação sinérgica altamente curativa.',
        cautions: 'A atovaquona é altamente lipofílica e tem absorção enteral extremamente pobre se administrada em jejum. É OBRIGATÓRIO oferecê-la imediatamente após ou misturada a uma refeição úmida com alto teor de lipídios (ex.: ração recovery ou alimento rico em gordura) para multiplicar sua biodisponibilidade em até 3 vezes.',
        contraindications: 'Hipersensibilidade conhecida aos compostos macrolídeos ou hidroxinaftoquinonas.'
      },
      {
        drug: 'Buparvaquona (Alternativa para B. gibsoni)',
        dose: '5,0 mg/kg IM profunda, administrada em 2 doses com intervalo de 48 horas.',
        mechanism: 'Análogo sintético da parvaquona com ação sobre a respiração celular mitocondrial do parasita.',
        notes: 'Opção comprovada quando a atovaquona não está disponível ou há recusa enteral persistente.'
      },
      {
        drug: 'Diaceturato de Diminazeno (Opção Alternativa para Babesias Grandes)',
        dose: '3,5 mg/kg IM em dose única estrita.',
        mechanism: 'Ligação irreversível ao DNA circular do parasita e inibição da glicólise aeróbia.',
        cautions: 'Possui margem de segurança extremamente estreita. Superdosagens acidentais ou sensibilidade individual provocam toxicidade neurológica central fulminante e irreversível (hemorragias cerebelares e pontinas, ataxia, opistótono e convulsões). Requer termo de consentimento.'
      }
    ],
    suporteHemodinamicoETransfusional: [
      {
        drug: 'Transfusão de Concentrado de Hemácias ou Sangue Total',
        indication: 'Indicada de imediato se PCV <15-18% em anemia aguda, ou PCV <20% associado a letargia severa, dispneia hipóxica, pulso débil ou lactato sérico persistentemente >3,0 mmol/L.',
        dose: 'Concentrado de Hemácias: 10 a 15 mL/kg IV em 2 a 4 horas; ou Sangue Total fresco: 20 mL/kg IV. Realizar prova de compatibilidade (crossmatch) antes.',
        notes: 'O objetivo não é normalizar o hematócrito para 40%, mas sim restaurar a oxigenação tecidual periférica e a volemia crítica para um PCV seguro de 22-25%.'
      },
      {
        drug: 'Fluidoterapia Balanceada e Nefroproteção',
        indication: 'Restauração da volemia e prevenção da precipitação tubular de hemoglobina.',
        dose: 'Ringer Lactato ou Solução Balanceada (Plasmalyte) em taxas de manutenção + correção do déficit de desidratação (ex.: 3 a 5 mL/kg/h inicialmente, monitorando débito urinário >= 1-2 mL/kg/h).',
        cautions: 'Evitar hemodiluição agressiva desenfreada em pacientes que aguardam sangue, para não precipitar queda ainda maior do PCV.'
      },
      {
        drug: 'Prednisona / Prednisolona (Uso Cauteloso e Restrito)',
        dose: '1,0 a 2,0 mg/kg VO ou SC a cada 24 horas por período curto (3 a 5 dias), seguido de desmame rápido.',
        indication: 'Apenas em casos com evidência irrefutável de Anemia Hemolítica Imunomediada (AHIM) autoaglutinante maciça com teste de Coombs positivo persistente que perpetua a lise após a primeira dose de antiparasitário.',
        contraindications: 'O uso rotineiro profilático de corticosteroides é formalmente CONTRAINDICADO, pois a imunossupressão exacerba a replicação parasitária descontrolada e mascara a resposta clínica.'
      }
    ]
  },

  complications: {
    disfuncoesOrganicasAgudas: [
      'Lesão Renal Aguda Pigmentar e Isquêmica (LRA): induzida pela necrose tubular aguda resultante da filtração maciça de cilindros densos de hemoglobina, hipoperfusão renal cortical e vasoconstrição arteriolar. Manifesta-se por oligúria (<1 mL/kg/h), hipercalemia, azotemia progressiva e acidose metabólica.',
      'Síndrome da Resposta Inflamatória Sistêmica (SIRS) e Choque Séptico: tempestade de citocinas (TNF, IL-1, IL-6) deflagrando hipotensão arterial refratária, colapso microvascular periférico, acidose lática grave e permeabilidade capilar difusa.',
      'Coagulação Intravascular Disseminada (CIVD): consumo fulminante de fatores de coagulação e plaquetas decorrente de lesão endotelial disseminada, evoluindo de microtrombos iniciais para hemorragias cutâneas, sangramentos gastrointestinais profusos e cavitários.',
      'Babesiose Cerebral: microtrombose isquêmica dos vasos capilares encefálicos, adesão de hemácias parasitadas ao endotélio cerebral e hipóxia severa, provocando convulsões, opistótono, ataxia vestibular, coma e óbito agudo.',
      'Síndrome do Desconforto Respiratório Agudo (SDRA / Shock Lung): aumento súbito da permeabilidade da membrana alvéolo-capilar por mediadores inflamatórios, gerando edema pulmonar não cardiogênico exsudativo com hipoxemia refratária à oxigenoterapia.'
    ],
    portadorCronicoERecidiva:
      'Mesmo após o desaparecimento completo dos sinais clínicos, a eliminação total e definitiva do parasita (cura parasitológica esterilizante) é rara, especialmente em infecções por *Babesia gibsoni*. A maioria dos animais permanece como carreador assintomático crônico, com parasitas albergados no baço e medula óssea. Qualquer evento de imunossupressão futura (corticoterapia, quimioterapia, cirurgias, infecções concomitantes por Ehrlichia ou parvovirose) pode desencadear recrudescência da anemia e da trombocitopenia.',
    prognostico:
      'Em casos não complicados de infecção por *Babesia vogeli* em cães adultos hígidos tratados precocemente com dipropionato de imidocarb, o prognóstico é excelente, com remissão da febre em 24-48 horas e normalização do hematócrito em 2 a 3 semanas. Todavia, em casos complicados com Síndrome de Resposta Inflamatória Sistêmica (SIRS), Lesão Renal Aguda anúrica, sinais neurológicos ou CIVD instalada, o prognóstico torna-se reservado a grave, com mortalidade que pode atingir 30% a 50% mesmo com terapia intensiva.'
  },

  prevention: {
    controleDeVetores:
      'A profilaxia primária reside no combate rigoroso, metódico e ininterrupto às infestações por carrapatos *Rhipicephalus sanguineus*: administração mensal ou trimestral de ectoparasiticidas modernos da classe das isoxazolinas (Fluralaner, Sarolaner, Afoxolaner) associados ao uso contínuo de coleiras com ação repelente e acaricida de liberação lenta (contendo Deltametrina ou Flumetrina) para evitar a fixação e a inoculação salivar de esporozoítos.',
    manejoDeDoadoresDeSangue:
      'É OBRIGATÓRIO submeter todo cão candidato a doador de sangue a triagem molecular periódica por PCR em sangue total para *Babesia* spp., *Ehrlichia* spp., *Anaplasma* spp. e *Leishmania*. O teste de esfregaço sanguíneo e a sorologia isolada são totalmente insuficientes para garantir a biossegurança hemoterápica de doadores assintomáticos carreadores.',
    prevencaoHorizontal:
      'Em canis e residências com cães das raças American Pit Bull Terrier e American Staffordshire Terrier, evitar categoricamente brigas, mordeduras e acasalamentos sem triagem prévia por PCR para *Babesia gibsoni*, que possui via de infecção direta oral-sanguínea independente de carrapatos.',
    errosComuns: [
      'Prescrever Dipropionato de Imidocarb isolado para infecções confirmadas ou suspeitas por *Babesia gibsoni*, conduta comprovadamente ineficaz que gera falha terapêutica.',
      'Omitir a pré-medicação com Atropina antes do Imidocarb, expondo o paciente a reações colinérgicas graves e sofrimento desnecessário.',
      'Administrar Atovaquona em jejum absoluto, o que impede a absorção farmacológica da molécula e inviabiliza o tratamento de *B. gibsoni*.',
      'Descartar babesiose com base em um único esfregaço de sangue venoso negativo com baixa parasitemia.',
      'Instituir corticoterapia imunossupressora em doses altas sem indicação estrita de AHIM autoaglutinante secundária comprovada.'
    ],
    redFlags: [
      'Oligúria persistente (<1 mL/kg/h) e urina escura após restauração da volemia (alerta de Lesão Renal Aguda tubular necrosante por pigmentos).',
      'Surgimento de convulsões, desorientação ou estupor (alerta de Babesiose Cerebral emergencial).',
      'Hipotermia progressiva associada a sangramentos petequiais e bradicardia (choque séptico terminal com CIVD).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'anemia-caes-gatos',
    'trombocitopenia-caes-gatos',
    'erliquiose-monocitica-canina',
    'coagulacao-intravascular-disseminada'
  ],
  relatedMedicationSlugs: [
    'imidocarb',
    'azitromicina',
    'atropina',
    'clindamicina',
    'doxiciclina',
    'prednisolona'
  ],
  references: [
    {
      id: 'ref-greene-babesia-2023',
      title: "Greene's Infectious Diseases of the Dog and Cat: Canine Babesiosis",
      citationText: 'Sykes JE, Baneth G. Babesiosis and other piroplasmoses. In: Sykes JE, ed. Greene\'s Infectious Diseases of the Dog and Cat. 5th ed. St. Louis: Elsevier; 2023:955-972.',
      authors: 'Sykes JE, Baneth G.',
      year: 2023,
      journal: "Greene's Infectious Diseases of the Dog and Cat (5th ed)",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ettinger-babesia-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine: Canine Babesiosis and Related Piroplasms",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1085-1093.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-nelson-couto-babesia-2020',
      title: 'Small Animal Internal Medicine: Polysystemic Protozoal Infections (Canine Babesiosis)',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:1514-1518.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-bsava-ecc-babesia',
      title: 'BSAVA Manual of Canine and Feline Emergency and Critical Care: Haematological Emergencies',
      citationText: 'King LG, Boag A. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. Gloucester: BSAVA; 2018:215-225.',
      authors: 'King LG, Boag A.',
      year: 2018,
      journal: 'BSAVA Manual of Canine and Feline Emergency and Critical Care',
      sourceType: 'Manual Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-plumb-babesia-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Imidocarb, Atovaquone, Azithromycin",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:558-560 (Imidocarb), 108-110 (Atovaquone).",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-weingart-babesia-2023',
      title: 'Autochthonous Babesia canis infections in 49 dogs in Germany: Clinical presentation, laboratory findings, and outcome',
      citationText: 'Weingart C, et al. Autochthonous Babesia canis infections in 49 dogs in Germany: Clinical presentation, laboratory findings, and outcome. J Vet Intern Med. 2023;37(5):1745-1754.',
      authors: 'Weingart C, et al.',
      year: 2023,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '37',
      pages: '1745-1754',
      sourceType: 'Estudo Clínico Prospectivo',
      url: 'https://doi.org/10.1111/jvim.16812',
      doi: '10.1111/jvim.16812',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-dantas-torres-2006',
      title: 'Canine babesiosis: A Brazilian perspective',
      citationText: 'Dantas-Torres F, Figueredo LA. Canine babesiosis: A Brazilian perspective. Vet Parasitol. 2006;141(3-4):197-203.',
      authors: 'Dantas-Torres F, Figueredo LA.',
      year: 2006,
      journal: 'Veterinary Parasitology',
      volume: '141',
      pages: '197-203',
      sourceType: 'Artigo de Revisão Epidemiológica',
      url: 'https://doi.org/10.1016/j.vetpar.2006.07.026',
      doi: '10.1016/j.vetpar.2006.07.026',
      evidenceLevel: 'B'
    }
  ]
};
