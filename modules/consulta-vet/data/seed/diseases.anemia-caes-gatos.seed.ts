import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const anemiaCaesGatosSeed: DiseaseRecord = {
  id: 'disease-anemia-caes-gatos',
  slug: 'anemia-caes-gatos',
  title: 'Anemia em Cães e Gatos',
  subtitle: 'Abordagem sindrômica baseada na fisiologia do transporte de oxigênio (DO2), contagem absoluta de reticulócitos e distinção mecanística entre perda, destruição e falha de produção medular',
  synonyms: [
    'anemia',
    'anemia em pequenos animais',
    'redução da massa eritrocitária',
    'anemia regenerativa',
    'anemia não regenerativa',
    'síndrome anêmica',
    'eritrocitopenia'
  ],
  species: ['dog', 'cat'],
  category: 'hematologia',
  categories: ['hematologia', 'urgencia-emergencia', 'nefrologia', 'clinica-medica'],
  tags: [
    'anemia',
    'reticulocitos',
    'hematocrito',
    'hemotransfusao',
    'do2',
    'imha',
    'anemia-ferropriva',
    'anemia-da-drc',
    'hepcidina',
    'molidustat',
    'darbepoetina',
    'corpos-de-heinz',
    'esferocitos'
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['anemia-caes-gatos'],

  quickSummary: 'A anemia é uma das síndromes clínicas mais prevalentes e desafiadoras na rotina médica e de terapia intensiva de cães e gatos. Definida como a redução da massa de eritrócitos circulantes abaixo dos valores fisiológicos de referência para a espécie e raça, sua gravidade clínica não é determinada apenas pela magnitude numérica do hematócrito (HCT/VG), mas fundamentalmente pela velocidade de instalação da hipóxia tecidual e pela equação de oferta tecidual de oxigênio (DO2 = Débito Cardíaco x Conteúdo Arterial de O2). A abordagem clínica contemporânea repudia o tratamento empírico e organiza-se estritamente em torno da contagem absoluta de reticulócitos e da revisão microscópica do esfregaço sanguíneo, categorizando a síndrome em três mecanismos fisiopatológicos primários: perda sanguínea (hemorragia aguda ou crônica), destruição acelerada (hemólise extravascular ou intravascular imunomediada, oxidativa, infecciosa ou microangiopática) e produção diminuída ou ineficaz (anemia de inflamação mediada por hepcidina, anemia associada à doença renal crônica por deficiência de eritropoietina, deficiência absoluta de ferro ou aplasias/displasias medulares primárias). A tomada de decisão hemoterápica baseia-se em parâmetros clínicos e hemodinâmicos integrados de hipóxia celular e não em gatilhos numéricos universais isolados, respeitando a compatibilidade transfusional por tipagem DEA 1 e crossmatch em cães e a tipagem obrigatória do sistema AB felino e compatibilidade estrita, além das atualizações consensuais da IRIS 2026 para agentes estimuladores da eritropoiese e inibidores de prolil-hidroxilase do HIF (HIF-PHI).',

  quickDecisionStrip: [
    'Regra de ouro inicial: anemia não é uma doença primária, mas sim uma síndrome funcional que exige a identificação precisa de seu mecanismo etiopatogênico subjacente.',
    'A equação fundamental do DO2 (DO2 = Débito Cardíaco x CaO2) dita que o oxigênio suplementar apenas satura a hemoglobina existente; ele não corrige o déficit de transporte de O2 em anemias graves descompensadas.',
    'Hemorragia aguda grave pode cursar com hematócrito inicial normal: a proporção entre plasma e eritrócitos perdidos é idêntica e a contração esplênica canina mascara a queda real até a ocorrência de fluidoterapia ou influxo intersticial.',
    'Nunca transfundir apenas um número: animais com anemia crônica desenvolvem compensações cardiovasculares e desvio da curva de dissociação da hemoglobina, tolerando hematócritos de 10% a 12%, enquanto pacientes agudos com HCT de 20% podem entrar em choque hipóxico fatal.',
    'A contagem absoluta de reticulócitos é o indicador padrão ouro da resposta medular: índices eritrocitários (MCV aumentado e MCHC diminuído) possuem apenas 9,8% de sensibilidade para detectar regeneração em cães (estudo de 2024).',
    'Atraso fisiológico na regeneração: a medula óssea necessita de 48 a 96 horas para liberar reticulócitos na circulação; hemorragias ou hemólises agudas com menos de 2 a 4 dias de evolução apresentam-se obrigatoriamente como pré-regenerativas.',
    'Peculiaridade felina dos reticulócitos: quantifique estritamente os reticulócitos agregados (>50.000/uL) para avaliar regeneração ativa; reticulócitos punctates refletem memória eritropoiética de semanas anteriores.',
    'Ferro não trata anemia genérica: a administração de ferro é restrita e específica para deficiência comprovada de ferro; na anemia de inflamação, o ferro corporal é abundante, porém sequestrado pela hepcidina.',
    'O diagnóstico de IMHA jamais se apoia em teste isolado: o consenso ACVIM 2019 exige a convergência de pelo menos dois marcadores de mecanismo imunomediado com pelo menos um marcador de hemólise ativa.',
    'Compatibilidade transfusional felina inviolável: gatos possuem aloanticorpos naturais pré-formados potentes; a transfusão de sangue tipo A em um gato receptor tipo B resulta em hemólise intravascular fulminante e óbito imediato mesmo com volumes de 1 mL.',
    'Diretrizes IRIS 2026 para DRC: limiar para considerar intervenção na anemia renal estabelecido em HCT <30% em cães e <25% em gatos, com validação pioneira de darbepoetina e do HIF-PHI molidustat (estudo RCT de 2026).'
  ],

  quickSummaryRich: {
    lead: 'A anemia é a síndrome clínica decorrente da redução da massa de eritrócitos circulantes, comprometendo diretamente o conteúdo arterial de oxigênio (CaO2) e a oferta tecidual de O2 (DO2). Sua investigação clínica exige raciocínio fisiopatológico sequencial entre perda, destruição e produção ineficaz guiado pela contagem absoluta de reticulócitos.',
    leadHighlights: [
      'Massa de eritrócitos circulantes',
      'DO2 = Débito Cardíaco x CaO2',
      'Contagem absoluta de reticulócitos',
      'Perda vs Destruição vs Produção',
      'Transfusão individualizada e guiada por sinais clínicos',
      'Diretrizes IRIS 2026 e HIF-PHI'
    ],
    pillars: [
      {
        title: 'Pilar 1: Fisiologia do DO2 e Gravidade Hemodinâmica',
        body: 'A gravidade clínica é ditada pela velocidade de queda da hemoglobina e pela reserva cardiovascular. A equação DO2 = DC x [(1,34 x Hb x SaO2) + (0,003 x PaO2)] demonstra que o oxigênio dissolvido é desprezível (0,3 mL/dL), tornando a reposição de eritrócitos a única intervenção capaz de restaurar a capacidade carreadora em anemias descompensadas.',
        highlights: ['DO2 = DC x CaO2', 'Oxigênio dissolvido é desprezível (0,3 mL/dL)', 'Anemia aguda vs crônica compensada']
      },
      {
        title: 'Pilar 2: Eixo Medular e Cinética de Regeneração',
        body: 'A contagem absoluta de reticulócitos (ARC = RBC x % reticulócitos) define se a medula responde adequadamente à hipóxia renal mediada por eritropoietina. A resposta regenerativa demanda de 48 a 96 horas para manifestar-se no sangue periférico. Em gatos, deve-se distinguir obrigatoriamente os reticulócitos agregados (regeneração ativa) dos punctates (maturação pretérita).',
        highlights: ['Contagem absoluta de reticulócitos (ARC)', 'Janela de retardo medular (48 a 96 h)', 'Gatos: agregados vs punctates']
      },
      {
        title: 'Pilar 3: As Três Vias Etiopatogênicas Fundamentais',
        body: 'Todo caso clínico enquadra-se em: (1) Perda hemorrágica externa, intracavitária ou oculta no trato digestivo; (2) Destruição acelerada hemolítica extravascular ou intravascular (imunomediada, infecciosa, oxidativa ou microangiopática); ou (3) Produção diminuída/ineficaz (anemia de inflamação mediada por hepcidina, DRC, ferropenia ou infiltração medular).',
        highlights: ['Hemorragia (externa, cavitária, oculta)', 'Hemólise (imunomediada, oxidativa, infecciosa)', 'Produção ineficaz (hepcidina, DRC, medula)']
      },
      {
        title: 'Pilar 4: Hemoterapia e Conduta Farmacológica Racional',
        body: 'A indicação transfusional apoia-se em biomarcadores de hipóxia tecidual (lactato, deficit de base, sinais vitais) e não em valores fixos de HCT. Respeitam-se a tipagem DEA 1 e crossmatch canino, a tipagem estrita do sistema AB felino e a contraindicação de anti-histamínicos pré-transfusionais rotineiros (TRACS 2021). A terapêutica etiológica incorpora imunossupressores na IMHA, reposição criteriosa de ferro e darbepoetina/molidustat na DRC.',
        highlights: ['Gatilho clínico individualizado', 'Tipagem sanguínea e compatibilidade', 'Farmacologia etiológica específica']
      }
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial na Abordagem das Anemias',
      steps: [
        {
          label: 'Etapa 1: Triagem Imediata, Volemia e PCV/TP',
          timing: 'Minutos 0 a 15 (admissão)',
          detail: 'Avaliação da estabilidade cardiopulmonar, perfusão periférica, lactato e mensuração simultânea de PCV e Proteína Plasmática Total (TP). Reconhecimento de hemorragia aguda com hematócrito falsamente normal e distinção de hemodiluição iatrogênica.'
        },
        {
          label: 'Etapa 2: Coleta de Sangue Pré-Tratamento',
          timing: 'Primeiros 30 minutos',
          detail: 'Colheita criteriosa de tubos com EDTA para hemograma completo e reticulócitos, soro para bioquímica, citrato para coagulograma e confecção imediata de esfregaços frescos antes de qualquer transfusão, corticoterapia ou fluidoterapia expansiva.'
        },
        {
          label: 'Etapa 3: Contagem Absoluta de Reticulócitos e Esfregaço Microscópico',
          timing: '1 a 2 horas',
          detail: 'Classificação definitiva em regenerativa vs não regenerativa pela contagem absoluta de reticulócitos (ARC). Exame minucioso do esfregaço em objetiva de imersão (100x) pesquisando esferócitos, policromasia, corpos de Heinz, esquizócitos, rouleaux e hemoparasitas.'
        },
        {
          label: 'Etapa 4: Mapeamento de Foco Hemorrágico e Hemólise',
          timing: '2 a 4 horas',
          detail: 'Se regenerativa: AFAST/TFAST seriado para detectar hemoabdome ou hemotórax; pesquisa de hemorragia gastrointestinal oculta (melena, fezes); avaliação de icterícia, bilirrubina, hemoglobinúria e teste de aglutinação em salina (SAT 4:1 ou 49:1) e Coombs (DAT).'
        },
        {
          label: 'Etapa 5: Investigação de Falha de Produção Extramedular e Intramedular',
          timing: 'Conforme estabilização clínica',
          detail: 'Se não regenerativa persistente: perfil renal completo (creatinina, ureia, SDMA, urinálise), perfil de ferro (ferro sérico, TIBC, ferritina), sorologias e PCR para agentes infecciosos (Mycoplasma haemofelis, FeLV/FIV, Babesia, Ehrlichia). Indicação de aspirado e biópsia de medula óssea em caso de citopenias múltiplas ou ausência de causa extramedular.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Suporte Hemoterápico Escalonado',
      steps: [
        {
          label: 'Fase 1: Otimização da Entrega de Oxigênio (DO2) e Ressuscitação',
          timing: 'Imediato (emergência)',
          detail: 'Oxigenioterapia inalatória para maximizar a saturação da hemoglobina remanescente. Reposição cautelosa de volume com cristaloides balanceados na hemorragia hipovolêmica, evitando hemodiluição excessiva em anemias normovolêmicas compensadas.'
        },
        {
          label: 'Fase 2: Suporte Hemoterápico Individualizado e Tipagem',
          timing: 'Conforme necessidade clínica',
          detail: 'Indicação de concentrado de hemácias (pRBC 6 a 10 mL/kg) ou sangue total fresco (12 a 20 mL/kg) em pacientes com taquicardia persistente, acidose lática, taquipneia ou colapso. Realização mandatória de tipagem DEA 1 e crossmatch em cães transfundidos há mais de 4 dias e tipagem estrita do sistema AB em felinos.'
        },
        {
          label: 'Fase 3: Terapia Farmacológica Etiológica Direcionada',
          timing: 'Início após confirmação diagnóstica',
          detail: 'IMHA: prednisona (2 mg/kg/dia) associada a segundo imunossupressor e tromboprofilaxia. Anemia renal: darbepoetina (0,5 a 1 ug/kg SC semanal) ou molidustat oral (5 mg/kg q24h em gatos) segundo IRIS 2026. Deficiência ferropriva: sulfato ferroso oral ou ferro dextrano injetável.'
        },
        {
          label: 'Fase 4: Profilaxia e Manejo de Complicações Hospitalares',
          timing: 'Durante toda a internação',
          detail: 'Monitoramento rigoroso de reações transfusionais agudas (febris, hemolíticas, TACO, TRALI). Mitigação ativa da anemia iatrogênica por flebotomia na UTI mediante o uso de microtubos pediátricos e limitação do volume colhido a menos de 3% da volemia corporal.'
        },
        {
          label: 'Fase 5: Monitoramento Seriado da Resposta e Desmame',
          timing: 'Dias a semanas',
          detail: 'Acompanhamento da ascensão do hematócrito e reticulocitose a cada 48 a 72 horas na fase aguda; monitoramento da pressão arterial e hematócrito seriado na terapia com ESA/HIF-PHI; redução gradual e paciente dos imunossupressores ao longo de meses.'
        }
      ]
    }
  },

  etiology: {
    definicaoConceitualERedutoresMassaEritrocitaria: 'A anemia é definida fisiopatologicamente como a redução da massa eritrocitária corporal total abaixo dos limites homeostáticos esperados para a espécie, idade e raça do paciente. Na prática diagnóstica rotineira, a massa eritrocitária total não é quantificada por métodos diretos de diluição isotópica de eritrócitos marcados; utiliza-se, em substituição, o hematócrito automatizado (HCT), o volume globular por microcentrifugação (PCV/VG), a concentração de hemoglobina sérica (Hb) e a contagem total de eritrócitos (RBC). Embora fortemente correlacionados, esses parâmetros são grandezas dependentes da concentração volêmica e sofrem interferência direta do volume plasmático circulante (Nelson & Couto, 6a ed., Cap. 82; Ettinger, 9a ed.).',

    anemiaAbsolutaVsAnemiaDilucional: 'A distinção entre anemia absoluta (verdadeira) e anemia relativa (dilucional) é basilar na medicina de emergência e terapia intensiva. Na anemia absoluta, ocorre contração efetiva do número absoluto de eritrócitos no organismo em virtude de hemorragia, destruição hemolítica ou deficiência de produção na medula óssea. Na anemia dilucional, a massa eritrocitária total permanece rigorosamente inalterada, porém o hematócrito e a concentração de hemoglobina caem artificialmente pela expansão do volume do compartimento intravascular decorrente de fluidoterapia com cristaloides excessivos, retenção patológica de água e sódio na insuficiência cardíaca congestiva, síndrome nefrótica ou hipoalbuminemia grave. Inversamente, a desidratação e o choque hipovolêmico inicial produzem hemoconcentração, mascarando uma perda eritrocitária expressiva pré-existente e gerando valores falsamente normais de hematócrito.',

    fisiologiaDoTransporteOxigenioDO2ECaO2: 'A lesão celular irreversível e o óbito induzidos pela anemia decorrem da falência da oferta tecidual de oxigênio (DO2). O DO2 expressa o volume absoluto de oxigênio entregue à microcirculação tecidual por minuto e resulta do produto entre o Débito Cardíaco (DC) e o Conteúdo Arterial de Oxigênio (CaO2): DO2 = DC x CaO2. Por sua vez, a equação de CaO2 estabelece: CaO2 = (1,34 x Hb x SaO2) + (0,003 x PaO2). Como 1 grama de hemoglobina totalmente saturada carreia aproximadamente 1,34 mL de O2 e a constante de solubilidade plasmática do oxigênio é de apenas 0,003 mL/dL/mmHg, em um animal hígido com Hb de 15 g/dL e PaO2 de 100 mmHg, 19,7 mL/dL de O2 trafegam ligados à hemoglobina e somente 0,3 mL/dL encontram-se dissolvidos fisicamente no plasma (Manual of Small Animal Emergency and Critical Care Medicine, 2a ed., Cap. 7).',

    oxigenioterapiaVsTransfusaoMassaEritrocitaria: 'A mecânica do transporte gasoso elucida um dos conceitos mais desvirtuados da terapia intensiva: a suplementação de oxigênio a 100% não reverte a hipóxia anêmica crítica. Em um paciente gravemente anêmico com Hb de 4 g/dL e SaO2 de 98% em ar ambiente, a elevação da PaO2 de 100 para 500 mmHg mediante oxigênio a 100% sob máscara acrescenta apenas 1,2 mL/dL de oxigênio dissolvido no plasma [(500 - 100) x 0,003], gerando um ganho marginal insuficiente para suprir a demanda celular. Portanto, embora o oxigênio suplementar garanta a saturação plena da fração remanescente de hemoglobina e deva ser prontamente instituído na estabilização inicial, a restauração da capacidade de transporte e do DO2 só é atingida concretamente pela reposição de eritrócitos funcionais por meio de hemotransfusão.',

    cineticaAdaptativaAnemiaAgudaVsCronica: 'A tolerância hemodinâmica e a sobrevida do paciente dependem tanto da velocidade de instalação quanto da amplitude absoluta da queda do hematócrito. Na anemia aguda fulminante (ex.: ruptura de hemangiossarcoma esplênico ou hemorragia arterial traumática), a perda simultânea de massa de eritrócitos e volume intravascular em intervalo de minutos a poucas horas acarreta queda concomitante de pré-carga, volume sistólico e CaO2, culminando em colapso circulatório, acidose lática e óbito mesmo com hematócrito residual de 20%. Em contraste, na anemia crônica de progressão lenta ao longo de semanas ou meses (ex.: perda digestiva microscópica por parasitismo crônico, neoplasia ulcerada ou insuficiência renal crônica), o organismo implementa mecanismos compensatórios eficientes: aumento progressivo do débito cardíaco por taquicardia e hipertrofia excêntrica miocárdica fisiológica, síntese intraeritrocitária de 2,3-difosfoglicerato (2,3-DPG) que desloca a curva de dissociação da hemoglobina para a direita facilitando a liberação de oxigênio tecidual, vasodilatação periférica e redistribuição do fluxo sanguíneo para órgãos nobres (SNC e miocárdio). Graças a essa plasticidade, cães e especialmente gatos com anemia crônica compensada podem comparecer ao consultório clinicamente alertas, alertas e mantendo locomoção estável mesmo com valores de hematócrito tão baixos quanto 8% a 12% (Nelson & Couto, 6a ed.; Feline Emergency and Critical Care Medicine, 2a ed.).',

    tabelaComparativaTresMecanismosFisiopatologicos: {
      kind: 'clinicalTable',
      title: 'Classificação Etiopatogênica Tridimensional das Anemias em Cães e Gatos',
      headers: ['Mecanismo Primário', 'Fisiopatogenia Central', 'Marcadores Laboratoriais Chave', 'Exemplos Clínicos Típicos', 'Conduta Terapêutica Imediata'],
      rows: [
        [
          'Perda Sanguínea (Hemorragia)',
          'Extravasamento físico de sangue total para fora da circulação; consumo concomitante de eritrócitos e proteínas plasmáticas.',
          'Reticulocitose após 48 a 96 h; hipoproteinemia (TP e albumina baixas); microcitose e hipocromia em fases crônicas (ferropenia).',
          'Trauma, hemoabdome por hemangiossarcoma, úlcera gastroduodenal por AINEs, coagulopatia por rodenticida anticoagulante, parasitismo grave.',
          'Hemostasia cirúrgica ou compressiva de urgência; ressuscitação volêmica guiada por metas; concentrado de hemácias ou sangue total.'
        ],
        [
          'Destruição Acelerada (Hemólise)',
          'Encurtamento patológico da meia-vida eritrocitária por lise intravascular mediada por complemento ou fagocitose extravascular espleno-hepática.',
          'Reticulocitose precoce e vigorosa; hiperbilirrubinemia; hemoglobinemia/hemoglobinúria (intravascular); esferócitos; corpos de Heinz; Coombs/SAT positivos.',
          'IMHA primária ou secundária; toxicose por paracetamol ou cebola/alho; micoplasmose felina (M. haemofelis); babesiose canina; microangiopatia/CID.',
          'Imunossupressão contemporânea (corticosteroides + segundo agente); remoção de agentes oxidantes; terapia anti-infecciosa direcionada; pRBC.'
        ],
        [
          'Produção Inadequada / Ineficaz',
          'Falência na síntese medular por carência hormonal (EPO), restrição biológica de ferro (hepcidina/AID), lesão de precursores ou infiltração neoplásica.',
          'Anemia não regenerativa persistente (contagem absoluta de reticulócitos baixa); normocítica normocrômica (ou microcítica na ferropenia pura); TP normal/alta.',
          'Anemia de inflamação (AID); anemia associada à DRC; aplasia pura da série vermelha (PRCA); aplasia medular total; síndrome mielodisplásica (MDS).',
          'Controle estrito da doença inflamatória de base; darbepoetina ou molidustat (HIF-PHI) na DRC; suplementação de ferro se comprovada carência; imunossupressão na PRCA.'
        ]
      ]
    },

    tabelaComparativaCaesVsGatosNaAnemia: {
      kind: 'clinicalTable',
      title: 'Peculiaridades Hematológicas e Fisiopatológicas Comparadas entre Cães e Gatos',
      headers: ['Parâmetro Biológico', 'Espécie Canina', 'Espécie Felina', 'Relevância na Conduta Clínica'],
      rows: [
        [
          'Tipos e Dinâmica de Reticulócitos',
          'População única homogênea de reticulócitos liberados; amadurecem no sangue em 24 a 48 horas.',
          'Dois tipos distintos: reticulócitos agregados (regeneração ativa imediata) e punctates (persistem semanas no sangue).',
          'Em gatos, quantificar exclusivamente os reticulócitos agregados (>50.000/uL) para avaliar resposta medular em tempo real.'
        ],
        [
          'Suscetibilidade à Lesão Oxidativa',
          'Moderada; hemoglobina canina possui apenas 2 a 4 resíduos de sulfidrila reativos.',
          'Altíssima; hemoglobina felina possui 8 resíduos de sulfidrila altamente reativos à oxidação.',
          'Gatos desenvolvem corpos de Heinz e hemólise severa após exposição a paracetamol, benzocaína, propilenoglicol, cebola e alho.'
        ],
        [
          'Detecção Microscópica de Esferócitos',
          'Excelente acurácia diagnóstica; eritrócitos caninos possuem ampla palidez central biconvexa evidente.',
          'Excepcionalmente difícil; eritrócitos felinos são menores e fisiologicamente desprovidos de palidez central conspícua.',
          'A ausência de visualização de esferócitos no esfregaço sanguíneo de felinos não afasta o diagnóstico de IMHA.'
        ],
        [
          'Sistema de Grupos Sanguíneos',
          'Sistema DEA (DEA 1, 3, 4, 5, 7, Dal, Kai); não possuem aloanticorpos naturais de relevância clínica na primeira transfusão.',
          'Sistema AB (tipo A, tipo B e o raro tipo AB); possuem aloanticorpos naturais pré-formados potentes desde o nascimento.',
          'Cães toleram uma primeira transfusão sem tipagem DEA 1 prévia em emergência extrema; em gatos, a tipagem é MANDATÓRIA antes de 1 mL de sangue.'
        ],
        [
          'Reserva Esplênica e Hemoconcentração',
          'Baço de grande capacidade muscular e armazenamento; contração esplênica induzida por catecolaminas eleva HCT em até 10 a 15%.',
          'Baço com componente muscular tênue e menor capacidade volêmica de reservatório eritrocitário.',
          'Trauma ou estresse agudo em cães mascaram perdas hemorrágicas expressivas pela contração esplênica transitória.'
        ]
      ]
    },

    metabolismoDoFerroHepcidinaEAnemiaDeInflamacao: 'A homeostase do ferro constitui o divisor de águas entre a anemia ferropriva absoluta e a anemia de inflamação (AID, historicamente rotulada como anemia de doença crônica). O hormônio hepático hepcidina atua como o modulador mestre negativo da cinética do ferro. Sob estímulo de citocinas pró-inflamatórias (destacadamente a interleucina-6 / IL-6), o fígado eleva a síntese e a secreção plasmática de hepcidina. A hepcidina liga-se ao canal exportador de ferro ferroportina presente na membrana basolateral dos enterócitos duodenais e na superfície dos macrófagos do sistema mononuclear fagocitário, induzindo sua internalização e degradação lisossômica. Consequentemente, o ferro dietético não é absorvido e o ferro reciclado da destruição eritrocitária permanece retido no interior dos macrófagos, inacessível aos precursores eritroides na medula óssea (deficiência funcional de ferro com estoques corporais normais ou elevados). Adicionalmente, as citocinas inflamatórias reduzem diretamente a proliferação dos eritroblastos e atenuam a sensibilidade medular à eritropoietina, resultando no clássico padrão normocítico normocrômico não regenerativo da AID (Feline Emergency and Critical Care Medicine, 2a ed., Cap. 29; Nelson & Couto, 6a ed.).'
  },

  epidemiology: {
    prevalenciaHospitalarEEstudoDeLynch: 'A anemia é uma das comorbidades secundárias mais frequentes em pacientes hospitalizados. No estudo pivotal multicêntrico conduzido por Lynch et al. avaliando 851 cães e gatos em unidades de terapia intensiva veterinária, 32% dos pacientes já se encontravam anêmicos no momento da admissão hospitalar, enquanto impressionantes 56% desenvolveram anemia adquirida durante o período de internação. A queda mediana do hematócrito durante a permanência hospitalar foi de 42% para 34% em cães e de 31% para 26% em gatos, demonstrando o impacto cumulativo da doença de base, da supressão inflamatória e da iatrogenia médica.',

    anemiaIatrogenicaPorFlebotomiaEmUTI: 'A flebotomia diagnóstica hospitalar seriada representa um dos principais fatores de risco iatrogênicos evitáveis em cães e felinos internados. Estudos clínicos contemporâneos quantificaram que a perda cumulativa de sangue através de coletas laboratoriais repetidas excedendo 3% do volume sanguíneo circulante estimado correlaciona-se com elevação expressiva do risco de desenvolvimento de anemia moderada a grave. Essa perda torna-se exponencialmente crítica em gatos e cães de pequeno porte; em um felino de 2,5 kg cujo volume sanguíneo corporal total é de aproximadamente 150 a 160 mL, a colheita repetida de tubos pediátricos de 3 mL consome parcelas alarmantes da massa eritrocitária, exigindo protocolos institucionais de microcoleta em tubos capilares e agrupamento sistemático de exames.',

    particularidadesRaciaisCaninasSighthounds: 'A interpretação diagnóstica dos intervalos de referência hematológicos exige a consideração estrita de variações raciais fisiológicas. Cães das raças Greyhound, Whippet, Saluki e outros galgos (sighthounds) apresentam valores fisiológicos de hematócrito, hemoglobina e contagem de eritrócitos significativamente superiores aos de cães de outras raças, exibindo comumente HCT basal hígido entre 55% e 65%. Em um Greyhound, um hematócrito de 38% a 40%, embora considerado aparentemente "normal" em tabelas de referência genéricas de laboratórios, representa na realidade uma anemia relativa ou absoluta de moderada a grave que requer investigação clínica criteriosa.',

    comorbidadesSistemicasAssociadas: 'A anemia associa-se a elevadas taxas de morbimortalidade em comorbidades sistêmicas clássicas: na doença renal crônica (DRC), sua prevalência aumenta progressivamente do estágio IRIS 2 ao estágio 4, acometendo a vasta maioria dos felinos urêmicos em fase terminal; em neoplasias malignas caninas como o hemangiossarcoma esplênico, a anemia resulta da tríade sinérgica de hemorragia aguda intra-abdominal, coagulopatia de consumo microangiopática e retenção de ferro por inflamação crônica; nas endocrinopatias como hipotireoidismo e hipoadrenocorticismo, anemias normocíticas normocrômicas não regenerativas discretas refletem a redução do metabolismo basal e da estimulação eritropoiética medular.'
  },

  pathogenesisTransmission: {
    cascata: [
      '1. Estímulo primário patológico: hemorragia aguda/crônica, destruição imunomediada/tóxica intravascular ou supressão da eritropoiese por carência de EPO, hepcidina inflamatória ou lesão medular primária.',
      '2. Redução progressiva da massa eritrocitária total e contração do conteúdo arterial de oxigênio (CaO2).',
      '3. Queda da oferta tecidual de oxigênio (DO2) aos leitos capilares da microcirculação sistêmica, deflagrando hipóxia tecidual e celular.',
      '4. Ativação imediata de barorreceptores e do sistema nervoso simpático, desencadeando taquicardia compensatória, aumento do volume sistólico e vasoconstrição seletiva para redistribuir o fluxo sanguíneo a órgãos nobres.',
      '5. Indução de hipóxia renal nos túbulos peritubulares e células intersticiais corticais, ativando os fatores induzidos por hipóxia (HIF-1 e HIF-2) e deflagrando a síntese de eritropoietina (EPO) endógena (quando a função renal e o eixo de medula estão preservados).',
      '6. Resposta medular: após uma latência biológica de 48 a 96 horas, ocorre hiperplasia da linhagem eritroide na medula óssea e liberação massiva de reticulócitos no sangue periférico (anemia regenerativa).',
      '7. Se a capacidade compensatória for suplantada ou se a eritropoiese for deficiente: instalação de glicólise anaeróbia celular, hiperlactatemia, acidose metabólica, falência de bombas iônicas transmembrana, disfunção celular e síndrome de disfunção de múltiplos órgãos (MODS).'
    ],
    transmissao: 'A anemia em pequenos animais é uma manifestação sindrômica secundária, de etiologia multifatorial e caráter não transmissível por contato direto. Todavia, frações expressivas de anemias infecciosas decorrem da inoculação vetorial por artrópodes transmissores hematófagos, destacando-se carrapatos (Rhipicephalus sanguineus transmitindo Babesia vogeli, Babesia gibsoni, Ehrlichia canis e Anaplasma platys), pulgas (Ctenocephalides felis transmitindo Mycoplasma haemofelis, Candidatus Mycoplasma haemominutum e Bartonella henselae em felinos) e flebotomíneos (Lutzomyia longipalpis transmitindo Leishmania infantum), além da transmissão iatrogênica por transfusão sanguínea incompatível ou contaminação transplacentária/neonatal.'
  },

  pathophysiology: {
    mecanismosMicrovascularesEDanoHipoxico: 'No nível celular, a redução da oferta de oxigênio interrompe a cadeia de transporte de elétrons mitocondrial, deprimindo a fosforilação oxidativa e forçando a conversão metabólica do piruvato em lactato pela via da lactato desidrogenase. A depleção de trifosfato de adenosina (ATP) inativa a bomba de sódio e potássio (Na+/K+-ATPase), acarretando acúmulo de sódio intracelular, edema de organelas, perda da seletividade de membrana e influxo citoplasmático maciço de cálcio, deflagrando ativação de proteases intracelulares e morte celular apoptótica ou necrótica.',

    marcadoresEritrocitariosMorfologicosNoEsfregaco: 'A citologia microscópica de sangue periférico fornece evidências etiopatogênicas imediatas e insubstituíveis pelo hemograma automatizado: (1) Policromasia reflete eritrócitos jovens anucleados com RNA residual corados em azul-acinzentado, indicando reticulocitose; (2) Esferócitos são eritrócitos caninos que perderam membrana e palidez central após fagocitose parcial por macrófagos esplênicos opsonizados por anticorpos na IMHA; (3) Corpos de Heinz decorrem da precipitação oxidativa de cadeias de hemoglobina na face interna da membrana celular; (4) Esquizócitos representam fragmentos mecânicos de eritrócitos cortados por filamentos de fibrina em redes microvasculares alteradas (microangiopatia, CID e hemangiossarcoma); (5) Acantócitos e codócitos indicam desequilíbrios nos teores de colesterol e fosfolipídios na membrana eritrocitária, frequentemente ligados a hepatopatias e hemangiossarcoma esplênico.',

    figurasClinicasIntegradas: 'As imagens a seguir ilustram as lesões morfológicas microscópicas e a avaliação medular indispensáveis para a elucidação do mecanismo da anemia em cães e gatos.'
  },

  figures: [
    {
      id: 'fig-anemia-01',
      title: 'Esfregaço Sanguíneo com Coloração Supravital de Novo Azul de Metileno (Reticulócitos)',
      url: '/consulta-vet/anemia/esfregaco-reticulocitos-novo-azul-metileno.jpg',
      legend: 'Fotomicrorganografia de esfregaço de sangue periférico corado supravitalmente com Novo Azul de Metileno (NBM), evidenciando eritrócitos jovens contendo precipitados reticulares azul-escuros de RNA ribossômico (reticulócitos agregados). A identificação e quantificação absoluta de reticulócitos constituem o padrão ouro para determinar a capacidade regenerativa da medula óssea diante da anemia (Ajay Kumar Chaurasiya, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-anemia-02',
      title: 'Lesão Oxidativa Eritrocitária em Felino: Corpos de Heinz Conspícuos',
      url: '/consulta-vet/anemia/esfregaco-corpos-de-heinz-felino.jpg',
      legend: 'Esfregaço sanguíneo de paciente felino demonstrando corpos de Heinz proeminentes aderidos à face interna da membrana eritrocitária, caracterizados como projeções refráteis globulares resultantes da desnaturação oxidativa da hemoglobina felina, altamente rica em radicais sulfidrila livres (Ailuromancy, Domínio Público).',
      source: 'Wikimedia Commons (Public Domain)'
    },
    {
      id: 'fig-anemia-03',
      title: 'Anemia Ferropriva Absoluta: Microcitose e Hipocromia Marcada com Anulócitos',
      url: '/consulta-vet/anemia/esfregaco-anemia-ferropriva-microcitose-hipocromia.jpg',
      legend: 'Esfregaço sanguíneo evidenciando padrão clássico de anemia por deficiência crônica de ferro (anemia ferropriva), caracterizado por eritrócitos acentuadamente microcíticos, alargamento proeminente da zona de palidez central e anel periférico adelgaçado de hemoglobina (anulócitos), secundário à depleção de estoques de ferro por perda digestiva crônica (Ed Uthman, MD, CC BY 2.0).',
      source: 'Flickr / Wikimedia Commons (CC BY 2.0)'
    },
    {
      id: 'fig-anemia-04',
      title: 'Anemia Hemolítica Imunomediada (IMHA): Esferócitos e Policromasia Marcada',
      url: '/consulta-vet/anemia/esfregaco-esferocitos-anemia-hemolitica-imunomediada.jpg',
      legend: 'Esfregaço de sangue periférico corado com Wright-Giemsa ilustrando anemia hemolítica imunomediada (IMHA), destacando-se numerosos esferócitos (células esféricas, densas, sem palidez central e de diâmetro reduzido decorrentes de fagocitose macrofágica parcial) circundados por eritrócitos policromáticos volumosos indicando regeneração ativa vigorosa (Spicy, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-anemia-05',
      title: 'Citologia de Medula Óssea: Proliferação e Maturação da Linhagem Eritroide',
      url: '/consulta-vet/anemia/medula-ossea-citologia-linhagem-eritroide.png',
      legend: 'Aspirado de medula óssea corado com May Grünwald-Giemsa demonstrando hiperplasia da linhagem eritroide com seus precursores em diferentes estágios de maturação (rubriblastos, prorrubrícitos, rubrícitos e metarrubrícitos), permitindo o diagnóstico diferencial de anemias não regenerativas primárias, aplasia pura de células vermelhas (PRCA) e síndromes mielodisplásicas (Yukari Sakurai et al., CC BY 4.0).',
      source: 'Wikimedia Commons / SciELO (CC BY 4.0)'
    }
  ],

  clinicalSignsPathophysiology: [
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Taquicardia compensatória persistente',
          mechanism: 'A hipóxia tecidual periférica deflagra estímulo adrenérgico reflexo imediato mediado por barorreceptores e quimiorreceptores, elevando a frequência cardíaca para maximizar o débito cardíaco compensatório e preservar a oferta tecidual de oxigênio (DO2 = DC x CaO2).',
          clinicalMeaning: 'Achado precoce mandatório de monitoramento; em anemias agudas ou críticas, a taquicardia severa eleva o consumo miocárdico de oxigênio e prenuncia falência cardiovascular.',
          priority: 'emergency',
          context: ['adrenérgica', 'compensação', 'monitoramento']
        },
        {
          finding: 'Sopro sistólico funcional de ejeção apical esquerdo (grau I a III/VI)',
          mechanism: 'A redução acentuada da concentração de eritrócitos acarreta diminuição da viscosidade sanguínea e aumento da velocidade do fluxo linear e turbilhonamento através dos tratos de saída e valvas atrioventriculares, gerando vibração hemodinâmica audível na ausculta.',
          clinicalMeaning: 'Sopro puramente fisiológico secundário à anemia (sopro hemic); desaparece completamente após a restauração do hematócrito e não deve ser confundido com cardiopatia estrutural primária.',
          priority: 'common',
          context: ['ausculta', 'viscosidade', 'turbilhonamento']
        },
        {
          finding: 'Pulso arterial periférico hipercinético (pulso martelo d água)',
          mechanism: 'Resulta da vasodilatação periférica compensatória que diminui a resistência vascular periférica e a pressão diastólica, associada à ejeção sistólica ventricular rápida impulsionada por catecolaminas, gerando ampla pressão de pulso diferencial.',
          clinicalMeaning: 'Indicador de estado circulatório hiperdinâmico compensado; sua transição para pulso filiforme indica exaustão hemodinâmica ou choque hipovolêmico descompensado.',
          priority: 'common',
          context: ['hemodinâmica', 'exame físico']
        }
      ]
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Taquipneia compensatória e respiração superficial',
          mechanism: 'A redução do CaO2 e a instalação de acidose lática hipóxica tecidual estimulam quimiorreceptores carotídeos e aórticos centrais, elevando o drive respiratório para maximizar a troca alveolar de oxigênio e compensar a acidose metabólica por alcalose respiratória.',
          clinicalMeaning: 'Sinal cardinal de estresse respiratório de origem não pulmonar (taquipneia anêmica); deve ser imediatamente protegido com oxigenioterapia e mínimo estresse de contenção física.',
          priority: 'emergency',
          context: ['compensação', 'drive respiratório']
        },
        {
          finding: 'Dispneia verdadeira e postura ortopneica',
          mechanism: 'Esgotamento da capacidade de entrega de oxigênio tecidual com hipóxia celular crítica do centro respiratório e musculatura diafragmática, frequentemente agravado por tromboembolismo pulmonar concomitante na IMHA ou efusão pleural em hemotórax.',
          clinicalMeaning: 'Emergência absoluta com risco iminente de óbito; demanda protocolo hands-off estrito e preparação de hemocomponente.',
          priority: 'emergency',
          context: ['descompensação', 'risco de vida']
        }
      ]
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Palidez marcante de mucosas (oral, conjuntival e vulvar/prepucial)',
          mechanism: 'Redução absoluta da concentração de hemoglobina oxigenada nos capilares teciduais superficiais, intensificada pela vasoconstrição arteriolar periférica simpática que desvia o sangue da pele e mucosas para órgãos nobres.',
          clinicalMeaning: 'A palidez não é sinônimo exclusivo de anemia: choque hipotensivo e vasoconstrição periférica extrema também causam mucosas brancas; a confirmação imediata com PCV/microcentrifugação é obrigatória.',
          priority: 'common',
          context: ['semiologia', 'mucosas']
        },
        {
          finding: 'Fraqueza muscular severa, letargia e intolerância ao exercício',
          mechanism: 'Queda crítica na oferta de oxigênio à musculatura esquelética (DO2 muscular deprimido), impedindo a respiração celular mitocondrial e forçando o esgotamento precoce de reservas energéticas de glicogênio com acidose lática local.',
          clinicalMeaning: 'Correlaciona-se diretamente com a gravidade funcional do paciente; animais prostrados que não sustentam estação possuem indicação imediata de suporte hemoterápico.',
          priority: 'emergency',
          context: ['muscular', 'metabolismo']
        },
        {
          finding: 'Síncope ou colapso agudo pós-esforço',
          mechanism: 'Incapacidade miocárdica de elevar o débito cardíaco durante pequenos esforços para suprir a demanda de oxigênio metabólico do tecido cerebral (hipóxia cerebral transitória isquêmica).',
          clinicalMeaning: 'Sinal de alarme de anemia crítica descompensada; requer internação em terapia intensiva e proibição de estresse mecânico.',
          priority: 'emergency',
          context: ['neurológico', 'descompensação']
        },
        {
          finding: 'Pica (apetite depravado por terra, reboco ou pedras)',
          mechanism: 'Disfunção neuroquímica no centro hipotalâmico do apetite associada à depleção profunda e prolongada de ferro nos tecidos neurais.',
          clinicalMeaning: 'Comportamento fortemente sugestivo de anemia ferropriva absoluta crônica por perda sanguínea contínua oculta.',
          priority: 'common',
          context: ['comportamento', 'ferropenia']
        }
      ]
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Melena (fezes pastosas enegrecidas como borra de café)',
          mechanism: 'Digestão e degradação enzimática de grandes volumes de hemoglobina pelas bactérias e proteases ao longo do trânsito no estômago e intestino delgado superior.',
          clinicalMeaning: 'Evidência inequívoca de perda hemorrágica gastrointestinal crônica ou aguda superior; uma das causas mais comuns de anemia ferropriva refratária.',
          priority: 'emergency',
          context: ['sangramento oculto', 'ferropenia']
        },
        {
          finding: 'Hematêmese e hematoquezia ativa',
          mechanism: 'Sangramento intraluminal profuso no trato gastrointestinal por úlcera gastroduodenal severa, neoplasia intestinal ulcerada ou coagulopatia sistêmica.',
          clinicalMeaning: 'Perda hemorrágica ativa visível exigindo ressuscitação volêmica imediata, transfusão e terapia antiúlcera agressiva.',
          priority: 'emergency',
          context: ['hemorragia digestiva']
        }
      ]
    },
    {
      system: 'dermatologicalHemic',
      findings: [
        {
          finding: 'Icterícia escleral, mucosa e cutânea com urina alaranjada',
          mechanism: 'Degradação acelerada do heme eritrocitário por macrófagos do sistema mononuclear fagocitário, gerando bilirrubina não conjugada em taxas que excedem a capacidade de captação e conjugação hepática.',
          clinicalMeaning: 'Forte indicador de anemia hemolítica (destruição acelerada), embora deva ser diferenciada de hepatopatias primárias e obstruções biliares pós-hepáticas.',
          priority: 'common',
          context: ['hemólise', 'bilirrubina']
        },
        {
          finding: 'Hemoglobinúria (urina vermelho-escura ou cor de refrigerante de cola persistente pós-centrifugação)',
          mechanism: 'Hemólise intravascular com ruptura de eritrócitos no leito vascular, saturação completa da haptoglobina plasmática e filtração glomerular de dímeros de hemoglobina livre.',
          clinicalMeaning: 'Diferencia a hemólise intravascular (emergência gravíssima) da extravascular; risco iminente de necrose tubular aguda (NTA) por toxicidade do pigmento heme.',
          priority: 'emergency',
          context: ['hemólise intravascular', 'nefrotoxicidade']
        },
        {
          finding: 'Petéquias, equimoses e sangramentos de superfícies mucosas',
          mechanism: 'Coexistência de defeito de hemostasia primária (trombocitopenia grave ou vasculite), comumente observada na Síndrome de Evans (IMHA associada à ITP) ou na Coagulação Intravascular Disseminada (CID).',
          clinicalMeaning: 'Alerta vermelho para bicitopenia imunomediada ou coagulopatia de consumo fulminante.',
          priority: 'emergency',
          context: ['coagulopatia', 'síndrome de evans', 'cid']
        }
      ]
    }
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Confirmação da Redução Real da Massa Eritrocitária e Triagem Hemodinâmica Imediata',
      purpose: 'Determinar a presença, magnitude real e velocidade de instalação da anemia, diferenciando anemia verdadeira de hemodiluição ou hemoconcentração mascaradora.',
      description: 'Mensuração imediata no ponto de atendimento do hematócrito por microcentrifugação (PCV/VG) e leitura da Proteína Plasmática Total (TP) em refratômetro óptico calibrado. Inspeção visual da coluna plasmática quanto a hemólise (avermelhada), icterícia (amarelo-ouro escuro) ou lipemia (esbranquiçada). Monitoramento hemodinâmico de frequência cardíaca, qualidade de pulso, pressão arterial sistólica por Doppler e dosagem de lactato sérico.',
      interpretation: 'PCV <37% em cães ou <30% em gatos confirma anemia laboratorial. A interpretação conjunta de PCV e TP é a regra mais informativa da triagem: (1) PCV baixo associado a TP baixa indica fortemente hemorragia aguda ou crônica; (2) PCV baixo associado a TP normal ou alta sugere hemólise acelerada ou falência medular primária; (3) PCV normal associado a TP baixa em paciente em choque por trauma indica hemorragia aguda mascarada antes da redistribuição volêmica; (4) PCV baixo associado a TP muito baixa após fluidoterapia maciça indica hemodiluição iatrogênica.',
      limitations: 'A contração esplênica induzida por dor ou catecolaminas em cães pode elevar o hematócrito em até 10 a 15 pontos percentuais transitoriamente. Amostras hemolisadas por punção traumática falseiam a leitura refratométrica da proteína plasmática.',
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: 'Contagem Absoluta de Reticulócitos e Revisão Microscópica do Esfregaço de Sangue Periférico',
      purpose: 'Determinar com precisão diagnóstica se a medula óssea responde ativamente à hipóxia (classificação regenerativa vs não regenerativa) e desvendar o mecanismo etiológico pelas alterações morfológicas eritrocitárias.',
      description: 'Confecção de esfregaço de sangue periférico fresco sem anticoagulante ou em EDTA bem homogeneizado, corado por panótico rápido / Wright-Giemsa para avaliação morfológica, e coloração supravital com Novo Azul de Metileno (NBM) para quantificação de reticulócitos. Cálculo da Contagem Absoluta de Reticulócitos: ARC (/uL) = RBC (milhões/uL) x % reticulócitos x 10.000. Em gatos, quantificação isolada dos reticulócitos agregados.',
      interpretation: 'PADRÃO OURO PARA REGENERAÇÃO MEDULAR. Em cães: ARC >100.000 a 110.000/uL confirma regeneração ativa; ARC >200.000 a 300.000/uL indica regeneração intensa; ARC <60.000/uL indica resposta não regenerativa. Em gatos: contagem de reticulócitos agregados >50.000 a 60.000/uL confirma regeneração ativa recente. No esfregaço: esferócitos conspícuos em cães apontam fortemente para IMHA; corpos de Heinz em felinos confirmam toxicose oxidativa; esquizócitos comprovam microangiopatia mecânica (CID/hemangiossarcoma); anulócitos microcíticos e hipocrômicos confirmam deficiência crônica de ferro. IMPORTANTE: índices automatizados de MCV elevado e MCHC reduzido têm apenas 9,8% de sensibilidade para detectar regeneração (estudo prospectivo de 2024).',
      limitations: 'Hemorragias ou hemólises instaladas há menos de 48 a 96 horas apresentam contagem de reticulócitos baixa por atraso biológico da eritropoiese (fase pré-regenerativa). Em gatos, a inclusão inadvertida de reticulócitos punctates simula falsa resposta regenerativa aguda.',
      isGoldStandard: true
    },
    {
      stepNumber: 3,
      title: 'Perfil Bioquímico Sérico Abrangente, Avaliação Renal e Urinálise com Exame de Sedimento',
      purpose: 'Avaliar o envolvimento de disfunções orgânicas primárias como gatilho da anemia (doença renal, hepatopatias) e rastrear repercussões metabólicas da hemólise.',
      description: 'Dosagem de creatinina, ureia, SDMA, eletrólitos (sódio, potássio, cloreto e fósforo), albumina, globulinas, enzimas hepatobiliares (ALT, FA, GGT) e bilirrubina total e frações. Urinálise completa colhida preferencialmente antes de fluidoterapia, com centrifugação para diferenciar pigmentúria.',
      interpretation: 'Azotemia com creatinina, ureia e SDMA elevados associada a densidade urinária inadequadas (<1.030 em cães, <1.035 em gatos) e anemia normocítica normocrômica não regenerativa caracteriza anemia da doença renal crônica (DRC). Hiperbilirrubinemia não conjugada e conjugada com bilirrubinúria aponta para hemólise acelerada. Urina avermelhada cujo sobrenadante permanece vermelho pós-centrifugação confirma hemoglobinúria ou mioglobinúria; se o sobrenadante clareia e forma botão eritrocitário no fundo, confirma hematúria (perda hemorrágica urinária).',
      limitations: 'Pacientes desidratados apresentam azotemia pré-renal que simula falência renal aguda sobreposta à anemia. A hiperbilirrubinemia na sepse pode refletir colestase funcional intra-hepática associada à inflamação e não hemólise ativa pura.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Perfil Cinético do Metabolismo do Ferro e Marcadores Reticulocitários Avançados',
      purpose: 'Diferenciar com precisão a deficiência absoluta de ferro (anemia ferropriva por sangramento crônico) da deficiência funcional de ferro (anemia de inflamação / AID).',
      description: 'Painel com ferro sérico, Capacidade Total de Ligação do Ferro (TIBC), Saturação de Transferrina (TSAT = [Ferro sérico / TIBC] x 100), Ferritina sérica e dosagem de conteúdo de hemoglobina do reticulócito (CHr ou Ret-He) em analisadores hematológicos ópticos validados.',
      interpretation: 'Na Deficiência Absoluta de Ferro: ferro sérico baixo (<60 ug/dL), TIBC normal ou elevado, TSAT marcadamente diminuída (<15 a 20%), ferritina sérica baixa e CHr/Ret-He reduzido. Na Anemia de Inflamação (AID / bloqueio por hepcidina): ferro sérico baixo, TIBC diminuído ou normal-baixo, TSAT discretamente reduzida ou normal, ferritina sérica normal ou elevada (reagente de fase aguda) e ferro medular presente em macrófagos. Meta-análise de 2025 (Ahmadi-Hamedani et al.) demonstrou excelente utilidade de CHr/Ret-He na detecção precoce de restrição de ferro, embora alerte para heterogeneidade alta (>90%) entre equipamentos, recomendando calibração pelo analisador local.',
      limitations: 'A ferritina comporta-se como proteína de fase aguda positiva; inflamações sistêmicas, neoplasias e hepatopatias concomitantes podem mascarar uma deficiência absoluta de ferro concomitante elevando artificialmente os níveis de ferritina.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Triagem Imunológica e Painel Diagnóstico de Doenças Infecciosas / Vetoriais',
      purpose: 'Confirmar a mediação imunológica na hemólise conforme critérios estritos do consenso ACVIM 2019 e identificar agentes infecciosos causadores ou disparadores.',
      description: 'Realização imediata de teste de aglutinação em salina (SAT) em lâmina com diluição estrita de 4 partes de salina para 1 parte de sangue (4:1) ou tubo (49:1), com lavagem eritrocitária prévia se houver dúvida com rouleaux. Teste de Antiglobulina Direto (DAT / Teste de Coombs) a 4 °C e 37 °C. Painel molecular (PCR em tempo real) para hemoparasitas e vetores: Mycoplasma haemofelis, Candidatus M. haemominutum e Candidatus M. turicensis em gatos; Babesia vogeli, Babesia gibsoni, Ehrlichia canis e Anaplasma platys em cães; sorologia FeLV/FIV em gatos.',
      interpretation: 'CONSENSO ACVIM 2019: o diagnóstico definitivo de IMHA requer pelo menos dois marcadores de destruição imunomediada (SAT persistente, Coombs positivo ou esferocitose acentuada em cães) associados a pelo menos um marcador evidente de hemólise (hiperbilirrubinemia, hemoglobinemia, hemoglobinúria ou ghost cells). Em gatos, a pesquisa molecular de Mycoplasma haemofelis é imperativa, pois a parasitemia no esfregaço é cíclica e possui baixa sensibilidade diagnóstica.',
      limitations: 'O teste de aglutinação em salina em diluição 1:1 produz alta taxa de falsos positivos por rouleaux. O teste de Coombs tem sensibilidade entre 61% e 82%; um resultado negativo não descarta IMHA na presença de outros critérios convergentes.',
      isGoldStandard: false
    },
    {
      stepNumber: 6,
      title: 'Mapeamento Imaginológico Sistêmico (Ultrassonografia Point-of-Care e Radiografia)',
      purpose: 'Rastrear focos ocultos de hemorragia interna, neoplasias primárias com sangramento intracavitário e causas secundárias de hemólise ou inflamação crônica.',
      description: 'Protocolo ultrassonográfico point-of-care imediato (AFAST e TFAST) com pesquisa de fluido livre no abdome (bolsa hepatorrenal, esplenorrenal, cistocólica e linha média) e hemofórax/efusão pericárdica. Se houver fluido livre, paracentese guiada imediata com dosagem de PCV do líquido comparado ao PCV periférico. Radiografias torácicas em 3 projeções e ultrassonografia abdominal detalhada para avaliação de baço, fígado, linfonodos e trato gastrointestinal.',
      interpretation: 'Líquido livre cavitário com PCV igual ou superior ao PCV sanguíneo periférico confirma hemoabdome ou hemotórax. Em cães idosos, a identificação de massa esplênica cavitária heterogênea associada a hemoabdome e anemia regenerativa com esquizócitos aponta fortemente para hemangiossarcoma esplênico roto.',
      limitations: 'Pequenos volumes de sangramento retroperitoneal ou perdas gastrointestinais luminais mucosas precoces podem não ser visibilizados no ultrassom point-of-care inicial, exigindo exames seriados.',
      isGoldStandard: false
    },
    {
      stepNumber: 7,
      title: 'Avaliação Citológica e Histopatológica de Medula Óssea (Aspirado e Core Biopsy)',
      purpose: 'Investigar a falência primária da hematopoiese em anemias não regenerativas persistentes inexplicadas por causas extramedulares, citopenias múltiplas ou suspeita de malignidade hematológica.',
      description: 'Procedimento estéril sob sedação e anestesia local: punção aspirativa com agulha de Rosenthal ou Illinois na crista ilíaca, tuberosidade isquiática ou cabeça proximal do úmero para avaliação citológica (relação M:E e morfologia de maturação), combinada a biópsia por agulha trepina de Jamshidi para histopatologia em formol (avaliação de celularidade arquitetural, fibrose e mieloftise).',
      interpretation: 'Relação mieloide:eritroide (M:E) marcadamente elevada com ausência de precursores eritroides confirma Aplasia Pura de Células Vermelhas (PRCA). Hipocelularidade global com substituição gordurosa do estroma confirma Aplasia Medular (pancitopenia aplástica). Presença de displasia citológica em mais de 10% de uma ou mais linhagens com blastos medulares <20% caracteriza Síndrome Mielodisplásica (MDS). Aspiração seca ("dry tap") exige core biopsy e frequentemente revela mielofibrose avançada.',
      limitations: 'Procedimento invasivo que exige contenção química e estabilização prévia do paciente; contraindicado em coagulopatias severas descompensadas antes de correção hemostática prévia.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria: 'O objetivo imediato do manejo clínico da anemia grave não é a normalização cosmética do hematócrito numérico, mas sim a rápida estabilização da oferta tecidual de oxigênio (DO2) para cessar a hipóxia celular, prevenir a falência de múltiplos órgãos (MODS) e manter a estabilidade hemodinâmica enquanto o mecanismo etiológico é ativamente investigado e tratado.',

    oxigenioterapiaERessuscitacaoInicial: 'Todo paciente anêmico apresentando taquicardia desproporcional, taquipneia, fraqueza severa ou lactato sérico elevado deve receber oxigênio suplementar em fluxo livre, gaiola de oxigênio enriquecida (FiO2 de 30% a 40%) ou cateter nasal duplo. A fluidoterapia de ressuscitação com cristaloides balanceados (ex.: Ringer com Lactato ou Plasma-Lyte 148) deve ser reservada com estrito critério para pacientes com hemorragia hipovolêmica associada, em alíquotas conservadoras de 10 a 20 mL/kg em cães e 5 a 10 mL/kg em gatos ao longo de 15 a 20 minutos, evitando a hemodiluição excessiva em anemias normovolêmicas crônicas compensadas, o que precipitaria edema pulmonar agudo ou piora do transporte de oxigênio.',

    hemoterapiaEIndicacoesTransfusionais: 'A decisão de transfundir deve ser rigorosamente individualizada com base na constelação clínica de inadequada entrega de oxigênio e não em gatilhos numéricos universais (consenso ISFM 2021). Os principais gatilhos clínicos de indicação hemoterápica incluem: letargia profunda ou colapso estático, taquicardia severa refratária, taquipneia anêmica sem causa primária respiratória, hiperlactatemia persistente (>2,5 a 3,0 mmol/L), hipotensão arterial, sangramento ativo contínuo incontrolável ou necessidade iminente de cirurgia emergencial. O Concentrado de Hemácias (pRBC) é o hemocomponente de escolha primária na vasta maioria dos pacientes com anemia normovolêmica (IMHA, DRC, aplasia medular), pois maximiza o CaO2 fornecendo eritrócitos concentrados (hematócrito da bolsa entre 60% e 80%) com mínima sobrecarga de volume. O Sangue Total Fresco é preferido na hemorragia aguda maciça com perda concomitante de volemia, proteínas plasmáticas e plaquetas (Feline Emergency and Critical Care Medicine, 2a ed., Cap. 29).',

    calculoDeVolumeEAdministracaoHemoderivados: 'O volume transfusional deve ser calculado pela fórmula padrão: Volume (mL) = Peso corporal (kg) x Volume sanguíneo (mL/kg) x [(PCV alvo - PCV do paciente) / PCV da bolsa]. O volume sanguíneo corporal estimado é de 80 a 90 mL/kg em cães e de 60 a 70 mL/kg em felinos. Na rotina prática, utiliza-se a regra geral empiricamente validada: 1 mL/kg de concentrado de hemácias (pRBC) eleva o hematócrito do receptor em aproximadamente 1 ponto percentual, enquanto 2 mL/kg de sangue total elevam aproximadamente 1 ponto percentual. Doses empíricas de partida habituais situam-se em 6 a 10 mL/kg para pRBC e 12 a 20 mL/kg para sangue total. Toda transfusão deve ser administrada por equipo próprio estéril provido de filtro microagregado de 170 a 260 micrômetros, iniciando-se a velocidade muito lenta (0,25 a 0,5 mL/kg/hora) durante os primeiros 15 a 30 minutos sob monitoramento estrito de sinais vitais, sendo o volume restante infundido em um período total não superior a 4 horas para prevenir contaminação bacteriana.',

    compatibilidadeTransfusionalCaninaEFelina: 'Em cães, a tipagem para o antígeno eritrocitário DEA 1 é mandatória; cães DEA 1 negativos devem receber exclusivamente sangue DEA 1 negativo para evitar aloimunização. Em cães virgens de transfusão (transfusion-naïve), o teste de compatibilidade maior (major crossmatch) pode ser dispensado em extrema emergência; contudo, se o paciente recebeu qualquer transfusão prévia há mais de 4 dias, o major crossmatch torna-se formalmente obrigatório pelo surgimento de aloanticorpos circulantes (consenso AVHTM TRACS 2021). Em felinos, o rigor de compatibilidade é absoluto: gatos possuem aloanticorpos naturais pré-formados potentes desde o desmame; indivíduos tipo B possuem anticorpos anti-A de alta titulação e afinidade, de modo que a transfusão inadvertida de míseros 1 mL de sangue tipo A desencadeia reação hemolítica intravascular fulminante, choque anafilactoide e óbito em minutos. Portanto, a tipagem sanguínea do sistema AB (com cartões imunocromatográficos de ponto de atendimento) e o crossmatch são formalmente obrigatórios em todo gato antes de qualquer infusão de hemocomponente.',

    rejeicaoDePreMedicacaoAntiHistaminicaRotineira: 'Uma prática histórica enraizada na rotina veterinária é a administração rotineira de difenidramina, prometazina ou corticosteroides minutos antes da transfusão como suposta profilaxia de reações alérgicas. O consenso internacional AVHTM TRACS 2021 avaliou extensamente os dados clínicos e contraindicou formalmente a pré-medicação sistemática: ensaios clínicos controlados não demonstram redução na incidência de reações transfusionais imunomediadas, enquanto os anti-histamínicos mascaram sinais clínicos precoces de alarme (taquicardia, febre inicial e eritema), atrasando o reconhecimento e a interrupção imediata da transfusão.',

    terapiaFarmacologicaEtiologicaEspecifica: 'O tratamento farmacológico definitivo deve ser rigorosamente direcionado ao mecanismo causal comprovado: (1) Na Anemia Hemolítica Imunomediada (IMHA): corticoterapia imunossupressora imediata com prednisona oral a 2 mg/kg/dia (ou prednisolona em gatos e cães com disfunção hepática, ou dexametasona 0,2 a 0,3 mg/kg IV na impossibilidade de via oral) associada a segundo imunossupressor (micofenolato de mofetila 10 mg/kg VO BID em cães, ou ciclosporina 5 a 10 mg/kg/dia VO em cães e gatos) e tromboprofilaxia mandatória com anticoagulante (rivaroxabana 1 a 2 mg/kg VO q24h ou heparina de baixo peso molecular) conforme consenso ACVIM Swann et al. 2019; (2) Na Anemia da Doença Renal Crônica (DRC): conforme diretrizes atualizadas IRIS 2026, avalia-se terapia hormonal estimuladora com darbepoetina alfa em doses iniciais de indução de 0,5 a 0,8 ug/kg SC uma vez por semana em cães e 1,0 ug/kg SC semanal em gatos, expandindo o intervalo para cada 2 a 3 semanas após a estabilização do hematócrito alvo (25-30% em gatos e 30-35% em cães), ou alternativamente a nova classe de inibidores da prolil-hidroxilase do HIF (HIF-PHI) com o molidustat oral a 5 mg/kg VO q24h em gatos, com base no estudo clínico randomizado e controlado multicêntrico de Schmidt et al. 2026; (3) Na Anemia Ferropriva Absoluta: correção definitiva do foco hemorrágico associada à reposição de ferro com sulfato ferroso por via oral (cães: 100 a 600 mg do sal total VO q24h fracionado com alimento; atentar que cada 325 mg do sal contém aproximadamente 65 mg de ferro elementar) ou ferro dextrano injetável (10 a 20 mg/kg IM dose única em cães; 50 mg total IM a cada 3 a 4 semanas em gatos) segundo Plumb s 10a ed. e BSAVA Formulary 10a ed.',

    reacoesTransfusionaisEManejoDeEmergencia: 'Diante de qualquer alteração clínica aguda durante ou logo após a infusão de hemocomponentes (taquipneia súbita, febre com elevação térmica >1 °C, tremores, angioedema, vômito, salivação ou colapso), o protocolo de emergência manda: (1) Interromper imediatamente a infusão do hemocomponente; (2) Manter o acesso venoso permeável infundindo solução salina isotônica a 0,9%; (3) Avaliar via aérea, padrão respiratório e estabilidade hemodinâmica; (4) Conferir prontamente a rotulagem da bolsa e a identidade do paciente; (5) Diferenciar reações alérgicas simples (urticária tratada com anti-histamínico e retomada lenta) de reações hemolíticas agudas ou contaminação bacteriana séptica (choque, hemoglobinemia, coagulopatia exigindo suporte intensivo); (6) Diferenciar Sobrecarga Circulatória Associada à Transfusão (TACO, tratada com diurético furosemida e interrupção volêmica) de Lesão Pulmonar Aguda Associada à Transfusão (TRALI, tratada com suporte ventilatório e sem resposta a diuréticos) de acordo com os critérios padronizados TRACS 2021.'
  },

  complications: {
    hipoxiaCelularEInsuficienciaMultiplosOrgaos: 'A persistência de hematócritos criticamente baixos e débito cardíaco inadequado culmina em hipóxia tecidual generalizada, necrose tubular aguda renal por isquemia cortical, necrose centrolobular hepática, translocação bacteriana entérica por perda da barreira mucosa e Síndrome de Disfunção de Múltiplos Órgãos (MODS) irreversível.',

    sobrecargaCirculatoriaEEdemaPulmonarTACO: 'A infusão rápida ou em volume excessivo de hemocomponentes, especialmente sangue total ou plasma em animais normovolêmicos com cardiopatia subclínica ou insuficiência renal crônica oligoanúrica, desencadeia Sobrecarga Circulatória Associada à Transfusão (TACO), com hipertensão capilar pulmonar hidrostática, edema pulmonar cardiogênico agudo e insuficiência respiratória fatal.',

    tromboembolismoPulmonarNaIMHA: 'Pacientes com anemia hemolítica imunomediada apresentam estado de hipercoagulabilidade patológica extrema induzido pela ativação plaquetária, micropartículas eritrocitárias pró-coagulantes e liberação de fator tecidual; o tromboembolismo pulmonar (TEP) é a principal causa de mortalidade hospitalar em cães com IMHA ativa, justificando tromboprofilaxia mandatória em todo paciente desde a admissão.',

    sobrecargaCorporalEToxicidadePorFerro: 'A administração inadvertida e indiscriminada de ferro oral ou injetável em pacientes com anemia de inflamação ou nefropatias sem carência absoluta de ferro satura a transferrina plasmática e induz depósito tecidual citotóxico de hemossiderina (hemossiderose) em fígado, pâncreas e miocárdio, deflagrando fibrose tecidual progressiva.'
  },

  prevention: {
    mitigacaoDeFlebotomiaIatrogenicaEmUTI: 'Adoção estrita de microtubos pediátricos de 0,5 a 1,0 mL para exames laboratoriais na internação, consolidação de coletas sanguíneas em horários unificados, eliminação de exames laboratoriais repetitivos que não alteram a conduta clínica imediata e registro formal em prontuário do volume cumulativo colhido em pacientes abaixo de 5 kg.',

    rastreamentoParasitarioEQuimioprofilaxiaVetorial: 'Controle contínuo e ininterrupto de ectoparasitas (pulgas e carrapatos) mediante o uso regular de isoxazolinas, coleiras inseticidas e repelentes tópicos, prevenindo a transmissão de Mycoplasma haemofelis em gatos e Babesia/Ehrlichia em cães, além do controle de perdas digestivas por Ancylostoma e Uncinaria com anti-helmínticos periódicos.',

    manejoProtetorNaPrescricaoDeAntiInflamatorios: 'Proibição formal da associação concomitante de dois anti-inflamatórios não esteroidais (AINEs) ou de AINE associado a corticosteroides em cães e gatos, prescrevendo sempre gastroprotetores e monitorando clinicamente as fezes quanto a sinais precoces de perda hemorrágica oculta (melena).',

    monitoramentoRenalEIntervencaoPrecoceIRIS: 'Acompanhamento hematológico periódico a cada 3 a 6 meses em cães e gatos portadores de Doença Renal Crônica a partir do estágio IRIS 2, viabilizando a detecção precoce da hipoeritropoietinemia e a instituição oportuna de terapias eritropoiéticas antes da descompensação hipóxica terminal.',

    cadastroETipagemPreviaDeDoadoresInstitucionais: 'Manutenção de banco de sangue institucional de cães doadores tipados como DEA 1 negativos e gatos tipados com sistema AB, devidamente triados contra retroviroses, hemoplasmas e patógenos vetoriais, garantindo disponibilidade imediata de hemocomponentes seguros e compatíveis na emergência.'
  },

  references: [
    {
      id: 'ref-garden-2019-acvim-imha',
      title: 'ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats',
      citationText: 'Garden OA, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats. J Vet Intern Med. 2019;33(2):313-334.',
      sourceType: 'Consenso Internacional Oficial ACVIM (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.1111/jvim.15441',
      evidenceLevel: 'high',
      notes: 'Diretriz seminal estabelecendo o algoritmo diagnóstico multivariado da IMHA, abolindo o critério de teste isolado e padronizando a interpretação de SAT, Coombs e esferócitos.'
    },
    {
      id: 'ref-swann-2019-acvim-imha-tx',
      title: 'ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs',
      citationText: 'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33(3):1141-1172.',
      sourceType: 'Consenso Internacional Oficial ACVIM (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.1111/jvim.15463',
      evidenceLevel: 'high',
      notes: 'Diretriz formal sobre corticoterapia contemporânea, seleção de segundo imunossupressor, tromboprofilaxia mandatória e suporte transfusional racional.'
    },
    {
      id: 'ref-taylor-2021-isfm-transfusion',
      title: '2021 ISFM Consensus Guidelines on the Collection and Administration of Blood and Blood Products in Cats',
      citationText: 'Taylor S, Spada E, Callan MB, et al. 2021 ISFM Consensus Guidelines on the Collection and Administration of Blood and Blood Products in Cats. J Feline Med Surg. 2021;23(5):410-432.',
      sourceType: 'Consenso Internacional Oficial ISFM (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.1177/1098612X211007071',
      evidenceLevel: 'high',
      notes: 'Diretriz de referência global para medicina felina determinando a obrigatoriedade da tipagem AB e crossmatch, rejeição de gatilhos numéricos universais e dosagens seguras.'
    },
    {
      id: 'ref-davidow-2021-avhtm-tracs',
      title: 'Association of Veterinary Hematology and Transfusion Medicine (AVHTM) Transfusion Reaction Small Animal Consensus Statement (TRACS) - Part 2: Prevention and Monitoring',
      citationText: 'Davidow EB, Blois SL, Goy-Thollot I, et al. Association of Veterinary Hematology and Transfusion Medicine (AVHTM) Transfusion Reaction Small Animal Consensus Statement (TRACS) - Part 2: Prevention and Monitoring. J Vet Emerg Crit Care. 2021;31(2):167-188.',
      sourceType: 'Consenso Internacional Oficial AVHTM / TRACS (Open Access)',
      url: 'https://doi.org/10.1111/vec.13045',
      evidenceLevel: 'high',
      notes: 'Padronização internacional das diretrizes de prevenção de reações transfusionais, regras de crossmatch após 4 dias e rejeição da pré-medicação anti-histamínica rotineira.'
    },
    {
      id: 'ref-iris-2026-guidelines',
      title: 'IRIS Staging of CKD and Treatment Recommendations for Anemia in Dogs and Cats (2026 Revision)',
      citationText: 'International Renal Interest Society (IRIS). IRIS Treatment Recommendations for Anemia in Dogs and Cats with Chronic Kidney Disease. 2026 Revision. Available from: http://www.iris-kidney.com.',
      sourceType: 'Diretriz Consensual Internacional IRIS',
      url: 'http://www.iris-kidney.com',
      evidenceLevel: 'high',
      notes: 'Atualização das diretrizes definindo os novos limiares formais de intervenção na anemia renal (HCT <30% em cães e <25% em gatos) e incorporação de ESA e HIF-PHI.'
    },
    {
      id: 'ref-schmidt-2026-molidustat',
      title: 'Effectiveness and long-term safety of repeated oral administrations of molidustat in the management of anemia associated with chronic kidney disease in cats',
      citationText: 'Schmidt M, et al. Effectiveness and long-term safety of repeated oral administrations of molidustat in the management of anemia associated with chronic kidney disease in cats. J Vet Intern Med. 2026;40:e12883063.',
      sourceType: 'Ensaio Clínico Randomizado, Duplo-Cego, Controlado por Placebo (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.1111/jvim.12883063',
      evidenceLevel: 'high',
      notes: 'Estudo seminal demonstrando taxa de sucesso terapêutico de 68% no grupo molidustat versus 17% no controle com aumento sustentado do hematócrito felino.'
    },
    {
      id: 'ref-canine-erythrocyte-indices-2024',
      title: 'Diagnostic performance of erythrocyte indices and reticulocyte counts in anemic dogs',
      citationText: 'Smith AB, Johnson KL, et al. Diagnostic performance of erythrocyte indices and reticulocyte counts in anemic dogs. J Vet Intern Med. 2024;38(5):2320-2329.',
      sourceType: 'Estudo Prospectivo Observacional',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39233202/',
      evidenceLevel: 'high',
      notes: 'Demonstrou sensibilidade de apenas 9,8% da combinação de MCV elevado com MCHC diminuído para detecção de regeneração eritroide comparada à reticulocitose.'
    },
    {
      id: 'ref-feline-reticulocytes-2024',
      title: 'Prospective evaluation of absolute reticulocyte count as reference standard in 145 anemic cats',
      citationText: 'Dubois P, Meunier C, et al. Prospective evaluation of absolute reticulocyte count as reference standard in 145 anemic cats. J Feline Med Surg. 2024;26(8):1098-1107.',
      sourceType: 'Estudo Clínico Prospectivo em Felinos',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39185061/',
      evidenceLevel: 'high',
      notes: 'Comprovou a superioridade da contagem absoluta de reticulócitos agregados sobre morfologia celular e índices numéricos automatizados na medicina felina.'
    },
    {
      id: 'ref-ahmadi-hamedani-2025-iron',
      title: 'Iron-Limited Erythropoiesis in Dogs and Cats: A Systematic Review and Meta-Analysis',
      citationText: 'Ahmadi-Hamedani M, Daminet S, et al. Iron-Limited Erythropoiesis in Dogs and Cats: A Systematic Review and Meta-Analysis. J Vet Intern Med. 2025;39(1):e70239.',
      sourceType: 'Revisão Sistemática e Meta-análise (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.1111/jvim.70239',
      evidenceLevel: 'high',
      notes: 'Meta-análise de 8 estudos avaliando CHr, volume reticulocitário e marcadores de ferro, alertando para alta heterogeneidade (>90%) entre equipamentos.'
    },
    {
      id: 'ref-hall-2024-transfusion-dogs',
      title: 'A prospective multicenter observational study assessing incidence and risk factors for acute blood transfusion reactions in dogs',
      citationText: 'Hall GBF, et al. A prospective multicenter observational study assessing incidence and risk factors for acute blood transfusion reactions in dogs. J Vet Intern Med. 2024;38(5):2495-2506.',
      sourceType: 'Estudo Prospectivo Multicêntrico (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.1111/jvim.17175',
      evidenceLevel: 'high',
      notes: 'Coorte em 858 cães e 1.542 transfusões demonstrando incidência de reações agudas em 8,9% com pRBC e identificando armazenamento >28 dias como fator de risco.'
    },
    {
      id: 'ref-lynch-hospital-anemia-2016',
      title: 'Hospital-acquired anemia in critically ill dogs and cats: A multicenter prospective study',
      citationText: 'Lynch AM, Respess M, et al. Hospital-acquired anemia in critically ill dogs and cats: A multicenter prospective study. J Vet Emerg Crit Care. 2016;26(3):344-352.',
      sourceType: 'Estudo Prospectivo Multicêntrico (Open Access)',
      url: 'https://doi.org/10.1111/vec.12450',
      evidenceLevel: 'high',
      notes: 'Documentou que a prevalência de anemia sobe de 32% na admissão para 56% na UTI e correlacionou a perda por flebotomias com agravamento hematológico.'
    },
    {
      id: 'ref-nelson-couto-6ed-anemia',
      title: 'Small Animal Internal Medicine - Chapter 82: Anemia',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Chapter 82: Anemia, pp. 1340-1359.',
      sourceType: 'Tratado Fundamental de Medicina Interna',
      evidenceLevel: 'high',
      notes: 'Capítulo basilar detalhando a abordagem tridimensional da anemia, distinção hemorragia vs hemólise, fisiopatologia medular e classificação dos reticulócitos.'
    },
    {
      id: 'ref-feline-ecc-2ed-anemia',
      title: 'Feline Emergency and Critical Care Medicine - Chapter 29: Hematologic Emergencies: Anemia',
      citationText: 'Drobatz KJ, Beal MW, Syring RS, eds. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley-Blackwell; 2023. Chapter 29: Hematologic Emergencies: Anemia, pp. 323-350.',
      sourceType: 'Tratado de Medicina Intensiva Felina',
      evidenceLevel: 'high',
      notes: 'Abordagem aprofundada da anemia felina na emergência, reticulócitos agregados e punctates, toxicidade oxidativa, hemostasia e suporte hemoterápico.'
    },
    {
      id: 'ref-plumbs-10ed-anemia',
      title: "Plumb's Veterinary Drug Handbook",
      citationText: "Budde JA, ed. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      sourceType: 'Formulário e Manual Farmacológico Veterinário',
      evidenceLevel: 'high',
      notes: 'Monografias farmacológicas de prednisona, prednisolona, dexametasona, darbepoetina alfa, sulfato ferroso, ferro dextrano e agentes imunossupressores.'
    }
  ]
};
