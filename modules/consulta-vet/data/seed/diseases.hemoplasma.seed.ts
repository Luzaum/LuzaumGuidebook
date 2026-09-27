import { DiseaseRecord } from '../../types/disease';

/**
 * Micoplasmoses Hemotrópicas (Hemoplasmas) — Guia Clínico Editorial de Padrão Ouro.
 * Embasamento: ABCD Feline Guidelines (Tasker et al. 2018) > Greene's Infectious Diseases 5ª ed. 2023 >
 * Ettinger's 9ª ed. 2024 > Nelson & Couto 6ª ed. > Plumb's 10ª ed.
 */
export const micoplasmosesHemotropicasRecord: DiseaseRecord = {
  id: 'disease-micoplasmoses-hemotropicas',
  slug: 'micoplasmoses-hemotropicas',
  title: 'Micoplasmoses hemotrópicas (hemoplasmas) em pequenos animais',
  subtitle: 'Infecções intraeritrocitárias por bactérias anucleadas desprovidas de parede: anemia hemolítica extravascular, ciclo parasitário, diferenciação de espécies felinas e caninas, PCR e manejo seguro da doxiciclina',
  synonyms: [
    'Hemoplasmose felina e canina',
    'Anemia infecciosa felina (AIF)',
    'Hemobartonelose',
    'Mycoplasma haemofelis',
    'Mycoplasma haemocanis',
    'Micoplasmas hemotrópicos'
  ],
  species: ['cat', 'dog'],
  category: 'infectologia',
  categories: ['infectologia', 'parasitologia', 'hematologia', 'medicina-felina', 'clinica-medica'],
  tags: [
    'Hemoplasma',
    'Mycoplasma haemofelis',
    'Mycoplasma haemocanis',
    'Anemia Hemolitica',
    'PCR',
    'Doxiciclina',
    'Pradofloxacina',
    'Esofagite estenosante',
    'FeLV',
    'FIV',
    'Asplenia'
  ],
  isPublished: true,
  source: 'seed',

  quickSummary:
    'As micoplasmoses hemotrópicas (hemoplasmoses) são causadas por bactérias pleomórficas diminutas, destituídas de parede celular, que aderem à superfície externa dos eritrócitos. Em gatos, o Mycoplasma haemofelis é o agente mais patogênico e virulento, deflagrando anemia hemolítica extravascular aguda severa, febre alta, icterícia e esplenomegalia; Candidatus M. haemominutum e Candidatus M. turicensis causam quadros mais brandos ou subclínicos, tornando-se ameaçadores na vigência de coinfecção por FeLV/FIV ou estresse intenso. Em cães, Mycoplasma haemocanis e Candidatus M. haematoparvum permanecem silenciosos em animais hígidos com baço competente, mas provocam colapso hemolítico fulminante em pacientes esplenectomizados ou imunocomprometidos. O diagnóstico definitivo baseia-se na qPCR em sangue total, pois a citologia de esfregaço possui baixa sensibilidade (<35%) e alta taxa de falsos-positivos por artefatos. O tratamento de primeira escolha é a doxiciclina por 14 a 28 dias, exigindo técnica de administração segura com água ou veículo líquido em felinos para evitar esofagite necrosante e estenose esofágica. Alternativas incluem marbofloxacina ou pradofloxacina. Animais curados clinicamente costumam persistir como carreadores assintomáticos.',

  quickDecisionStrip: [
    'Gato febril (>40°C) + anemia regenerativa acentuada + mucosas pálidas ou ictéricas = forte suspeição de Mycoplasma haemofelis.',
    'Cão com hemólise aguda pós-esplenectomia ou imunossuprimido = suspeitar de Mycoplasma haemocanis; cão com baço intacto raramente desenvolve doença clínica severa isolada.',
    'A parasitemia é fortemente cíclica e as bactérias desprendem-se das hemácias em poucas horas no tubo com EDTA: esfregaço sanguíneo negativo NÃO descarta hemoplasmose.',
    'qPCR (PCR em tempo real) em sangue total é o padrão-ouro de diagnóstico, diferenciação de espécies e monitoramento de carga bacteriana.',
    'NUNCA administrar doxiciclina em comprimido "seco" em felinos: risco crítico de retenção esofágica, esofagite química transmural e estenose esofágica cicatricial irreversível; administrar sempre com >= 5-10 mL de água ou alimento pastoso.',
    'Testar FeLV e FIV em todo gato diagnosticado com hemoplasmose: a coinfecção por FeLV suprime a eritropoiese, piora drasticamente o prognóstico e impede regeneração medular.',
    'Evitar o uso rotineiro de enrofloxacina em gatos: doses superiores a 5 mg/kg/dia causam toxicidade retiniana aguda irreversível com degeneração de fotorreceptores e cegueira midriática bilateral permanente; preferir Pradofloxacina.',
    'Não tratar portadores assintomáticos PCR-positivos de rotina: a antibioticoterapia convencional não garante esterilização parasitológica e a maioria dos gatos convive em equilíbrio imunológico com o agente.',
    'Transfusão de concentrado de hemácias ou sangue total fresco é prioritária se hematócrito <12-15% ou em vigência de hipóxia clínica descompensada.',
    'Triagem por PCR em doadores de sangue caninos e felinos é indispensável para evitar transmissão iatrogênica transfusional.'
  ],

  quickSummaryRich: {
    lead:
      'As hemoplasmoses são infecções bacterianas eritrocitárias crônicas caracterizadas por destruição esplênica de hemácias mediada por fagocitose imune. A gravidade varia drasticamente entre espécies bacterianas e estados imunológicos, exigindo diagnóstico molecular sensível e antibioticoterapia com cautela esofágica estrita.',
    leadHighlights: [
      'Bactérias sem parede celular aderidas à membrana eritrocitária',
      'M. haemofelis como causa maior de anemia severa em gatos',
      'Doença clínica em cães associada a esplenectomia prévia',
      'Parasitemia cíclica e baixa sensibilidade do esfregaço',
      'qPCR em sangue total como padrão-ouro confirmatório',
      'Risco severo de estenose esofágica por doxiciclina seca em gatos'
    ],
    pillars: [
      {
        title: 'Pilar 1: Patogenicidade Diferenciada entre Espécies',
        body: 'Em felinos, Mycoplasma haemofelis é o mais patogênico, induzindo lise eritrocitária maciça mesmo em animais jovens e imunocompetentes. Candidatus M. haemominutum e Candidatus M. turicensis são menos agressivos, manifestando-se clinicamente quando associados a FeLV, FIV ou neoplasias. Em caninos, Mycoplasma haemocanis forma cadeias delgadas sobre as hemácias, sendo mantido sob controle subclínico pelo baço competente; a remoção cirúrgica do baço desencadeia colapso hemolítico grave.',
        highlights: ['M. haemofelis virulento', 'Associação crucial com FeLV/FIV', 'Asplenia em cães']
      },
      {
        title: 'Pilar 2: Diagnóstico Molecular vs Limitações da Citologia',
        body: 'A visualização citológica de hemoplasmas em esfregaços sanguíneos periféricos tem sensibilidade inferior a 35%, pois os micoplasmas sofrem ciclos rápidos de fixação e desprendimento das hemácias e soltam-se da membrana após algumas horas de contato com anticoagulante EDTA. Além disso, precipitados de corante, corpúsculos de Howell-Jolly e pontilhado basofílico geram frequentes falsos-positivos. A qPCR em sangue total é o único método confiável para confirmar a espécie e orientar a conduta.',
        highlights: ['Parasitemia cíclica', 'Falhas do esfregaço comum', 'qPCR confirmatório']
      },
      {
        title: 'Pilar 3: Terapêutica Racional e Biossegurança Esofágica',
        body: 'A doxiciclina é o antimicrobiano de primeira escolha devido à sua excelente penetração celular e eficácia contra bactérias sem parede. Todavia, em felinos, o formato do comprimido de hiclato de doxiciclina gera aderência na mucosa esofágica distal, causando ulceração e estenose cicatricial estenosante. O uso de formulações líquidas, suspensões orais ou a oferta forçada de 5 a 10 mL de água/alimento líquido pós-dose é mandatório. Alternativas modernas incluem a pradofloxacina.',
        highlights: ['Doxiciclina com água obrigatória', 'Pradofloxacina como alternativa segura', 'Transfusão de suporte']
      }
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial das Micoplasmoses Hemotrópicas',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Perfil Clínico e Fatores de Risco',
          detail: 'Gato com apatia súbita, hiporexia, febre de origem indeterminada (>39,8°C), taquipneia, palidez de mucosas, desidratação e icterícia; histórico de briga com outros gatos, infestação por pulgas ou acesso irrestrito à rua. Em cães: anemia regenerativa que se manifesta semanas ou meses após cirurgia de esplenectomia ou quimioterapia.'
        },
        {
          label: 'Passo 2: Hemograma Completo e Avaliação da Regeneração Eritróide',
          detail: 'Hematócrito reduzido (frequentemente <20%, podendo atingir <10% em crises agudas), reticulocitose intensa (>60.000 a 100.000/µL em cães; reticulócitos agregados >50.000/µL em gatos), anisocitose, policromasia e corpúsculos de Howell-Jolly. A contagem de plaquetas pode estar normal ou discretamente reduzida por consumo/sequestro.'
        },
        {
          label: 'Passo 3: Esfregaço Sanguíneo Fresco sem EDTA (Triagem Inicial)',
          detail: 'Confeccionar esfregaço imediatamente a partir de sangue capilar fresco de ponta de orelha ou gota direta da agulha sem contato prolongado com EDTA. Corar e inspecionar sob imersão de 1000x: estruturas cocóides, bacilares ou anelares diminutas (0,3 a 0,8 µm) basofílicas na borda dos eritrócitos. Positivo sugere infecção, mas negativo NUNCA exclui o diagnóstico.'
        },
        {
          label: 'Passo 4: qPCR em Sangue Total (Padrão-Ouro Indispensável)',
          detail: 'Colher 1 mL de sangue total em EDTA e refrigerar imediatamente para envio laboratorial. A qPCR convencional ou multiplex identifica a espécie exata (M. haemofelis vs M. haemominutum vs M. turicensis vs M. haemocanis) e quantifica a carga de cópias de DNA bacteriano por mL de sangue, diferenciando infecções agudas com alta bacteremia de portadores com carga residual.'
        },
        {
          label: 'Passo 5: Triagem Sorológica e Molecular de Coinfecções Retrovirais (FeLV/FIV)',
          detail: 'Em felinos, realizar teste imunocromatográfico (ELISA ou qPCR) para Vírus da Leucemia Felina (FeLV) e Vírus da Imunodeficiência Felina (FIV). A presença de FeLV transforma uma infecção por M. haemominutum em doença potencialmente fatal e compromete a regeneração medular.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Cuidados Críticos',
      steps: [
        {
          label: 'Fase 1: Estabilização de Emergência e Suporte Transfusional',
          detail: 'Avaliar a tolerância clínica à anemia. Se hematócrito <12-14% com dispneia, taquicardia em repouso, fraqueza extrema ou lactato elevado: instituir suporte de oxigênio em fluxo livre ou gaiola e realizar transfusão imediata de Concentrado de Hemácias felino compatível (10 a 15 mL/kg) ou Sangue Total (20 mL/kg) após tipagem sanguínea (sistema AB felino).'
        },
        {
          label: 'Fase 2: Terapia Antimicrobiana de Primeira Escolha (Doxiciclina)',
          detail: 'Prescrever Doxiciclina na dose de 10 mg/kg VO a cada 24 horas (ou 5 mg/kg VO a cada 12 horas) por 14 a 28 dias. Em gatos, utilizar impreterivelmente formulação manipulada líquida/suspensão oral ou fornecer no mínimo 5 a 10 mL de água morna ou alimento úmido líquido via seringa logo após o comprimido para forçar a descida imediata ao estômago.'
        },
        {
          label: 'Fase 3: Terapia Antimicrobiana Alternativa (Fluoroquinolonas)',
          detail: 'Em caso de vômitos incoercíveis à doxiciclina, refratariedade ou intolerância: Pradofloxacina (Veraflox) 7,5 mg/kg VO a cada 24 horas por 14 dias; ou Marbofloxacina 2,75 a 5,0 mg/kg VO a cada 24 horas. Evitar enrofloxacina em felinos.'
        },
        {
          label: 'Fase 4: Imunomodulação em Casos de Autoaglutinação Severa',
          detail: 'Se houver anemia hemolítica fulminante com forte componente autoimune (autoaglutinação em lâmina macroscópica ou teste de Coombs fortemente positivo persistente): associar Prednisolona 1,0 a 2,0 mg/kg VO a cada 24 horas por período curto (3 a 5 dias), efetuando desmame progressivo à medida que o antimicrobiano reduz a carga bacteriana.'
        },
        {
          label: 'Fase 5: Acompanhamento Longitudinal e Manejo de Portador',
          detail: 'Reavaliar hematócrito e reticulócitos aos 3, 7, 14 e 28 dias. Esclarecer ao tutor que o tratamento elimina os sinais clínicos e a parasitemia circulante, mas raramente atinge esterilização biológica completa. Evitar estresse e prevenir infestações por pulgas para impedir recrudescências.'
        }
      ]
    }
  },

  etiology: {
    caracteristicasGerais:
      'Os hemoplasmas são bactérias diminutas, pleomórficas (cocóides, em anel ou bacilares), desprovidas de parede celular (pertencentes à classe Mollicutes e família Mycoplasmataceae). Não crescem em meios de cultura microbiológicos acelulares comuns (não cultiváveis in vitro). Possuem genoma reduzido e dependem metabolicamente dos eritrócitos do hospedeiro, aderindo intimamente à superfície externa da membrana celular.',
    especiesFelinas: {
      kind: 'clinicalTable',
      headers: ['Espécie Felina', 'Prevalência', 'Patogenicidade Clínica', 'Risco com FeLV'],
      rows: [
        [
          'Mycoplasma haemofelis',
          'Menor prevalência geral (5-10%), mas maior em gatos anêmicos doentes',
          'Alta patogenicidade primária; causa anemia hemolítica grave, febre alta e óbito agudo em gatos jovens imunocompetentes',
          'Letalidade muito elevada se associado a FeLV'
        ],
        [
          'Candidatus Mycoplasma haemominutum',
          'Alta prevalência (20-40% dos gatos saudáveis e de rua)',
          'Baixa a moderada patogenicidade; geralmente subclínico em gatos hígidos; causa queda discreta do PCV',
          'Torna-se clinicamente grave e descompensado quando associado a FeLV, FIV ou neoplasias'
        ],
        [
          'Candidatus Mycoplasma turicensis',
          'Prevalência intermediária (3-10%)',
          'Patogenicidade intermediária; pode provocar anemia clínica moderada durante imunossupressão ou coinfecção',
          'Potencializa anemia quando coinfectando com M. haemominutum'
        ]
      ]
    },
    especiesCaninas:
      'Em cães, a espécie predominante é o Mycoplasma haemocanis (antiga Haemobartonella canis), caracterizada por formar cadeias lineares de cocos atravessando a superfície do eritrócito. A segunda espécie canina é o Candidatus Mycoplasma haematoparvum. Ambas provocam infecções clinicamente inaparentes em cães imunocompetentes com baço íntegro; tornam-se altamente destrutivas desencadeando crises hemolíticas graves em cães esplenectomizados cirurgicamente ou cães com mielossupressão/quimioterapia.',
    notaMicoplasmaRespiratorioNaoHemotropico:
      'É fundamental não confundir os hemoplasmas com micoplasmas não hemotrópicos, como o Mycoplasma felis, bactéria que coloniza mucosas e está implicada em afecções respiratórias superiores (conjuntivite, rinite, sinusite) e pneumonias em gatos, sem causar infecção eritrocitária ou anemia hemolítica.'
  },

  epidemiology: {
    viasDeTransmissao:
      'A transmissão exata entre felinos envolve múltiplos mecanismos: transmissão direta por brigas territoriais com arranhaduras e mordeduras inoculando sangue contaminado (o que explica a maior prevalência em machos adultos não castrados com acesso à rua); transmissão iatrogênica por transfusão de sangue de doadores carreadores assintomáticos; transmissão transplacentária vertical ou via leite materno de gatas infectadas para os filhotes; e transmissão potencial por vetores artrópodes como a pulga do gato (Ctenocephalides felis), embora a replicação biológica na pulga ainda seja alvo de debate.',
    fatoresDeRisco:
      'Gatos machos, adultos a idosos, não castrados, com acesso livre à rua, histórico de brigas, infestações maciças por ectoparasitas e status positivo para FeLV ou FIV apresentam risco exponencialmente maior de desenvolver doença clínica grave. Em cães, o principal fator deflagrador de doença clínica é o histórico prévio de esplenectomia (por trauma ou tumor esplênico) ou imunossupressão com doses altas de corticosteroides.'
  },

  pathogenesisTransmission: {
    adesaoEAlteracaoDaMembrana:
      'Os hemoplasmas aderem firmemente à face externa da membrana celular das hemácias através de adesinas proteicas específicas. A fixação bacteriana distorce a plasticidade da membrana, altera as bombas iônicas transmembrana e induz dano oxidativo lipídico e proteico direto.',
    mecanismoDeHemoliseExtravascular:
      'A presença das bactérias na superfície celular expõe antígenos crípticos normais e recobre a hemácia com antígenos bacterianos. O sistema imune produz anticorpos da classe IgM (frequentemente com atividade de crioaglutininas) e IgG contra os complexos hemácia-parasita, ativando a cascata do complemento. À medida que esses eritrócitos circulam pelos cordões esplênicos e sinusoides hepáticos, são capturados e fagocitados por macrófagos teciduais (hemólise extravascular). Ocorre remoção precoce da hemácia da circulação, gerando anemia hemolítica severa, esplenomegalia e hiperbilirrubinemia.',
    parasitemiaCiclicaEVariacaoAntigenica:
      'A parasitemia por M. haemofelis é caracterizada por flutuações cíclicas agudas e dramáticas: em um intervalo de 12 a 24 horas, o número de hemácias parasitadas na circulação pode cair de 80% para quase 0%, coincidindo com a liberação de novos reticulócitos e sequestro temporário de hemácias no baço, para então subir novamente dias depois. Essa variação antigênica e sequestro esplênico explicam por que um esfregaço sanguíneo pode ser intensamente positivo pela manhã e negativo no final da tarde.',
    mimetismoComAHIMPrimaria:
      'Devido à expressiva produção de autoanticorpos anti-hemácia desencadeada pelo parasita, até 40% a 50% dos gatos com infecção aguda por M. haemofelis apresentam teste de Coombs direto (DAT) positivo e autoaglutinação em lâmina visível, sendo frequentemente diagnosticados de forma errônea como portadores de Anemia Hemolítica Imunomediada (AHIM) primária.'
  },

  pathophysiology: {
    anemiaHemoliticaRegenerativa:
      'A destruição maciça e acelerada de eritrócitos deflagra hipóxia tecidual generalizada, levando à palidez de mucosas, taquicardia sinusal compensatória, sopro cardíaco carotídeo sistólico e taquipneia. A medula óssea hígida responde liberando grandes quantidades de reticulócitos (resposta regenerativa marcante com policromasia, anisocitose e corpúsculos de Howell-Jolly). Se o paciente for portador de FeLV ou estiver em fase pré-regenerativa inicial (<3 dias), a anemia pode apresentar-se transitoriamente não regenerativa.',
    esplenomegaliaEIctericia:
      'A retenção maciça de eritrócitos danificados e a proliferação celular de macrófagos esplênicos causam esplenomegalia congestiva e hiperplásica acentuada. A degradação do heme da hemoglobina fagocitada pelos macrófagos gera quantidades copiosas de bilirrubina livre (não conjugada). Quando a velocidade de hemólise ultrapassa a capacidade de conjugação e excreção dos hepatócitos, desenvolve-se hiperbilirrubinemia pré-hepática mista, resultando em icterícia visível.',
    sindromeFebrilAguda:
      'A ativação de macrófagos e a liberação de citocinas pirogênicas endógenas (IL-1, TNF-alfa) produzem picos febris agudos (>40,0°C) que coincidem com os momentos de parasitemia máxima no sangue periférico.'
  },

  clinicalSignsPathophysiology: {
    sinaisClassicos: [
      'Febre alta e intermitente (39,8°C a 41,5°C) que oscila em sincronia com os picos de parasitemia no sangue periférico.',
      'Palidez extrema de mucosas (porcelana) decorrente da queda rápida do hematócrito secundária à hemólise extravascular esplênica.',
      'Apatia profunda, letargia, depressão sensorial e anorexia completa com adipsia.',
      'Taquipneia, respiração superficial e taquicardia com sopro sistólico funcional gerado pela anemia grave e menor viscosidade sanguínea.',
      'Esplenomegalia pronunciada e indolor identificada na palpação abdominal em mais de 60% dos pacientes com quadro agudo.',
      'Icterícia generalizada em esclera, mucosa oral e pele abdominal em casos de hemólise rápida e intensa.',
      'Pica (ingestão de terra, pedras, areia de caixa sanitária) manifestada por gatos com anemia severa crônica.',
      'Perda de peso progressiva e pelagem opaca, eriçada e desidratada.'
    ],
    sinaisCaninosAsplenicos: [
      'Colapso hemodinâmico agudo, letargia profunda e choque hipóxico em cães submetidos a esplenectomia recente.',
      'Hemoglobinúria e palidez severa com hematócrito caindo abaixo de 15% em cão sob quimioterapia ou imunossupressão.'
    ]
  },

  diagnosis: {
    estrategiaGeral:
      'A confirmação etiológica rápida é vital para diferenciar a hemoplasmose de outras causas de anemia regenerativa e instituir terapia antimicrobiana direcionada antes que o paciente atinja colapso anêmico fatal.',
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Hemograma Completo e Índices Eritrocitários',
        description:
          'Avaliação quantitativa da série vermelha e pesquisa de reticulocitose.',
        purpose: 'Caracterização da anemia hemolítica regenerativa e exclusão de causas não regenerativas.',
        interpretation:
          'Hematócrito tipicamente <20% (podendo atingir 8-12% em crises agudas de M. haemofelis). Reticulocitose intensa (reticulócitos agregados >50.000/µL em felinos; >100.000/µL em cães), policromasia marcante e anisocitose confirmam anemia regenerativa hemolítica. Trombocitopenia leve a moderada pode ocorrer concomitantemente por sequestro esplênico.',
        limitations: 'Em fases hiperagudas precoces (<48 horas do início da lise) ou em animais coinfectados com FeLV, a resposta reticulocitária pode estar ausente ou deprimida.'
      },
      {
        stepNumber: 2,
        title: 'Citologia de Esfregaço Sanguíneo Fresco (Gota Direta)',
        description:
          'Inspeção microscópica imediata de esfregaço fino confeccionado a partir de sangue capilar periférico sem EDTA.',
        purpose: 'Triagem rápida à beira do leito para visualização direta do parasita.',
        interpretation:
          'Visualização de diminutas estruturas basofílicas (0,3 a 0,8 µm) em formato de cocos individuais, anéis ou bastonetes aderidos à margem das hemácias sugere hemoplasmose. M. haemocanis frequentemente exibe cadeias ramificadas características.',
        limitations:
          'Baixíssima sensibilidade analítica (<35%): a parasitemia oscila a cada poucas horas e os micoplasmas desprendem-se espontaneamente da membrana celular após 1 a 2 horas no tubo com EDTA. Elevada taxa de falsos-positivos por precipitação de corante Romanowsky, corpúsculos de Howell-Jolly e pontilhado basofílico. Um esfregaço negativo JAMAIS descarta a doença.',
        isGoldStandard: false
      },
      {
        stepNumber: 3,
        title: 'Reação em Cadeia da Polimerase em Tempo Real (qPCR em Sangue Total)',
        description:
          'Ensaio molecular de alta especificidade e sensibilidade que amplifica sequências conservadas do gene do RNA ribossômico 16S de hemoplasmas.',
        purpose: 'Confirmação inequívoca da infecção, diferenciação de espécies e mensuração da carga bacteriana.',
        interpretation:
          'Padrão-ouro (*isGoldStandard: true*). Detecta até 1 cópia de DNA bacteriano por reação. Diferencia inequivocamente Mycoplasma haemofelis de Candidatus M. haemominutum e Candidatus M. turicensis em gatos, e M. haemocanis de Candidatus M. haematoparvum em cães. Fundamental para definir prognóstico e monitorar a resposta ao tratamento.',
        limitations: 'Pode demorar alguns dias para envio laboratorial; o tratamento empírico deve ser iniciado imediatamente se a suspeita clínica for alta em paciente instável.',
        isGoldStandard: true
      },
      {
        stepNumber: 4,
        title: 'Triagem Sorológica e Molecular de FeLV e FIV em Felinos',
        description:
          'Teste imunocromatográfico (ELISA) ou qPCR para detecção de antígeno p27 de FeLV e anticorpos anti-FIV.',
        purpose: 'Identificação de comorbidades retrovirais que alteram drasticamente o prognóstico.',
        interpretation:
          'Gatos FeLV-positivos coinfectados com hemoplasmas (mesmo M. haemominutum) apresentam anemias severas, risco elevado de aplasia medular e sobrevida significativamente menor.',
        limitations: 'Falso-negativo para FeLV em fases de infecção regressiva ou focal.'
      },
      {
        stepNumber: 5,
        title: 'Painel Bioquímico Hepático, Renal e Urinálise',
        purpose: 'Avaliação do grau de hemólise e sobrecarga de órgãos de excreção.',
        interpretation:
          'Hiperbilirrubinemia total com predomínio de bilirrubina indireta (não conjugada); elevação leve a moderada de ALT por hipóxia hepática centrolobular; urinálise exibindo bilirrubinúria acentuada.',
        limitations: 'Alterações inespecíficas que refletem a destruição de hemácias.'
      }
    ]
  },

  treatment: {
    protocolosAntimicrobianos: [
      {
        drug: 'Doxiciclina (Primeira Linha de Escolha)',
        indication: 'Tratamento etiológico padrão de primeira linha para hemoplasmose felina e canina.',
        dose: '10 mg/kg VO a cada 24 horas, ou 5 mg/kg VO a cada 12 horas, durante 14 a 28 dias consecutivos.',
        mechanism: 'Inibe a síntese proteica bacteriana por ligação reversível à subunidade ribossômica 30S. Altamente eficaz contra bactérias anucleadas sem parede celular.',
        cautions: 'ALERTA MÁXIMO EM FELINOS (Esofagite e Estenose Esofágica): os comprimidos de hiclato de doxiciclina possuem pH ácido corrosivo e formato que adere facilmente à mucosa esofágica do gato. A retenção do comprimido no esôfago provoca esofagite necrosante transmural e estenose cicatricial estenosante com disfagia e regurgitação permanente. É OBRIGATÓRIO fornecer a medicação na forma de suspensão oral manipulada ou administrar imediatamente após o comprimido pelo menos 5 a 10 mL de água morna ou alimento úmido líquido com seringa para garantir sua descida ao estômago.',
        reassess: 'Hemograma completo semanal durante o tratamento até estabilização do hematócrito.'
      },
      {
        drug: 'Pradofloxacina (Veraflox — Fluoroquinolona de Terceira Geração)',
        indication: 'Alternativa de eleição de segunda linha em gatos intolerantes à doxiciclina, refratários ou com aversão a comprimidos.',
        dose: '7,5 mg/kg VO a cada 24 horas por 14 a 21 dias (apresentação líquida palatável).',
        mechanism: 'Inibição dupla das enzimas DNA-girase e topoisomerase IV bacterianas, exercendo rápida ação bactericida.',
        notes: 'Diferentemente da enrofloxacina, a pradofloxacina demonstrou segurança ocular comprovada em gatos na dose recomendada, sem risco de retinotoxicidade.',
        contraindications: 'Filhotes em crescimento rápido (risco potencial de artropatia cartilaginosa).'
      },
      {
        drug: 'Marbofloxacina',
        indication: 'Fluoroquinolona alternativa para felinos e caninos.',
        dose: '2,75 a 5,0 mg/kg VO a cada 24 horas por 14 a 28 dias.',
        mechanism: 'Inibição bactericida da DNA-girase bacteriana.'
      },
      {
        drug: 'Enrofloxacina (AVISO DE TOXICIDADE RETINIANA EM GATOS)',
        indication: 'Segura em cães (5 mg/kg VO q24h), mas com RISCO SEVERO em gatos.',
        dose: 'Em cães: 5 mg/kg VO q24h. Em gatos: EVITAR. Se indispensável, NUNCA ultrapassar 5,0 mg/kg VO a cada 24 horas.',
        cautions: 'Em gatos, a enrofloxacina acumula-se na retina e induz degeneração fototóxica aguda e irreversível dos fotorreceptores da retina, provocando cegueira midriática bilateral permanente. Deve ser substituída por pradofloxacina ou doxiciclina.'
      }
    ],
    terapiaDeSuporteEImunossupressao: [
      {
        drug: 'Transfusão de Concentrado de Hemácias ou Sangue Total',
        indication: 'Indicada de emergência se hematócrito <12-14% com sinais de descompensação hipóxica (taquipneia, pulso fraco, hipotermia, letargia profunda).',
        dose: 'Concentrado de hemácias felino: 10 a 15 mL/kg IV lento em 2 a 4 horas; ou Sangue total: 20 mL/kg IV. OBRIGATÓRIA tipagem sanguínea felina prévia (sistema AB) para prevenir reações transfusionais hemolíticas hiperagudas fatais.',
        notes: 'A transfusão garante suporte de oxigenação enquanto a antibioticoterapia elimina a carga bacteriana circulante.'
      },
      {
        drug: 'Prednisolona (Uso Restrito e Temporário)',
        dose: '1,0 a 2,0 mg/kg VO a cada 24 horas por período curto de 3 a 5 dias, seguido de desmame rápido.',
        indication: 'Restrita aos pacientes com anemia hemolítica autoimune secundária fulminante, evidenciada por autoaglutinação intensa em lâmina ou teste de Coombs fortemente positivo, para frear a fagocitose esplênica acelerada.',
        contraindications: 'O uso de rotina prolongado é desaconselhado, pois a imunossupressão retarda o controle bacteriano definitivo.'
      }
    ],
    manejoDoEstadoDeCarreador:
      'As diretrizes internacionais do ABCD (Advisory Board on Cat Diseases) estabelecem claramente que nenhum dos protocolos antimicrobianos atualmente disponíveis (doxiciclina ou fluoroquinolonas) garante a esterilização microbiológica completa e definitiva do organismo. A maioria dos pacientes tratados com sucesso atinge cura clínica e redução da carga de DNA abaixo do limite de detecção, mas permanece como carreador assintomático crônico com parasitas residentes em reservatórios teciduais. Por esse motivo, gatos saudáveis assintomáticos com qPCR positiva acidental NÃO devem ser tratados com antibióticos de rotina, exceto se forem candidatos a doadores de sangue.'
  },

  complications: {
    sequelasClinicasETerapeuticas: [
      'Óbito por Anemia Hipóxica Severa Fulminante: em infecções agudas por M. haemofelis, o hematócrito pode desabar para valores inferiores a 8-10% em menos de 48 horas, resultando em choque anóxico, acidose lática severa e parada cardiorrespiratória se a transfusão não for instituída a tempo.',
      'Estenose Esofágica Cicatricial Iatrogênica por Doxiciclina em Felinos: a administração de comprimidos de doxiciclina sem oferta subsequente de água provoca retenção esofágica, esofagite química necrosante e formação de anel cicatricial estenosante no esôfago distal, causando regurgitação crônica, disfagia e desnutrição grave que exige dilatações esofágicas por balão sob endoscopia.',
      'Degeneração Retiniana Aguda e Cegueira por Enrofloxacina: uso de doses elevadas ou acúmulo da droga em felinos provocando atrofia total de retina e perda permanente e irreversível da visão.',
      'Mielossupressão Atingindo Pancitopenia em Gatos FeLV-Positivos: a coinfeção com o vírus da leucemia felina bloqueia a regeneração da medula óssea, evoluindo com anemia não regenerativa persistente e leucopenia severa com septicemia secundária.',
      'Recrudescência da Anemia por Reativação do Estado de Carreador: qualquer evento imunossupressor futuro (cirurgias, quimioterapia, corticoterapia, estresse em gatis ou gestação) pode provocar retorno dos picos de parasitemia com nova crise hemolítica.'
    ],
    prognostico:
      'Em gatos imunocompetentes sem coinfecção por FeLV/FIV, o prognóstico com diagnóstico precoce e antibioticoterapia adequada associada à transfusão é bom a excelente, com rápida remissão da febre em 24-48 horas e recuperação do hematócrito em 2 a 3 semanas. Todavia, em gatos coinfectados por FeLV ou portadores de mielodisplasia associada, o prognóstico é reservado a grave. Em cães esplenectomizados, o prognóstico depende da rapidez do suporte transfusional e do controle de infecções oportunistas associadas.'
  },

  prevention: {
    controleDeEctoparasitas:
      'Instituir controle permanente, metódico e contínuo de pulgas (*Ctenocephalides felis*) e carrapatos em todos os animais contactantes do domicílio com o uso mensal de isoxazolinas ou ectoparasiticidas tópicos/orais modernos, minimizando a transmissão vetorial.',
    prevencaoDeBrigasEConfinamento:
      'Manter os felinos em regime estritamente domiciliado (indoor) com telas em janelas e promover a castração precoce para erradicar brigas territoriais e cópula, bloqueando a inoculação direta de sangue contaminado por mordeduras.',
    biossegurancaTransfusional:
      'Exigir teste obrigatório de qPCR em sangue total para Mycoplasma haemofelis, M. haemominutum, M. turicensis e M. haemocanis em todos os cães e gatos candidatos a doadores de sangue. Animais positivos na qPCR devem ser excluídos de forma permanente dos programas de doação hemoterápica.',
    cuidadosNaAdministracaoDeDoxiciclina:
      'Orientar detalhadamente os tutores sobre o risco de estenose esofágica felina: fornecer sempre o medicamento com seringa de água (mínimo de 5 mL) ou preferir formulações líquidas manipuladas.',
    errosComuns: [
      'Prescrever comprimido seco de doxiciclina para gatos sem orientação estrita de flush com água ou alimento pastoso.',
      'Descartar o diagnóstico de hemoplasmose com base em um único esfregaço de sangue periférico negativo.',
      'Tratar exaustivamente com antibióticos gatos clinicamente sadios que apresentaram PCR positivo incidental em triagens.',
      'Usar enrofloxacina em doses superiores a 5 mg/kg/dia em felinos, expondo-os a cegueira retiniana irreversível.',
      'Omitir o teste de FeLV e FIV em gatos anêmicos diagnosticados com hemoplasma.'
    ],
    redFlags: [
      'Hematócrito abaixo de 12% com respiração agônica e prostração (urgência transfusional absoluta).',
      'Início de regurgitação frequente pós-alimentação após tratamento prévio com doxiciclina (suspeita de estenose esofágica iatrogênica).',
      'Midríase arreativa súbita bilateral e desorientação visual em gato em uso de enrofloxacina (retinotoxicidade aguda).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'anemia-caes-gatos',
    'leucemia-viral-felina',
    'imunodeficiencia-felina-fiv',
    'babesiose-canina'
  ],
  relatedMedicationSlugs: [
    'doxiciclina',
    'marbofloxacina',
    'pradofloxacina',
    'enrofloxacina',
    'prednisolona'
  ],
  references: [
    {
      id: 'ref-abcd-hemo-2018',
      title: 'Haemoplasmosis in cats: European guidelines from the ABCD on prevention and management',
      citationText: 'Tasker S, Hofmann-Lehmann R, Belák S, et al. Haemoplasmosis in cats: European guidelines from the ABCD on prevention and management. J Feline Med Surg. 2018;20(3):256-261.',
      authors: 'Tasker S, Hofmann-Lehmann R, Belák S, et al.',
      year: 2018,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '20',
      pages: '256-261',
      sourceType: 'Diretrizes de Consenso Europeu ABCD',
      url: 'https://doi.org/10.1177/1098612X18758594',
      doi: '10.1177/1098612X18758594',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-greene-hemoplasma-2023',
      title: "Greene's Infectious Diseases of the Dog and Cat: Hemotropic Mycoplasmas",
      citationText: 'Tasker S, Lappin MR. Hemotropic Mycoplasma Infections. In: Sykes JE, ed. Greene\'s Infectious Diseases of the Dog and Cat. 5th ed. St. Louis: Elsevier; 2023:415-430.',
      authors: 'Tasker S, Lappin MR.',
      year: 2023,
      journal: "Greene's Infectious Diseases of the Dog and Cat (5th ed)",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ettinger-hemoplasma-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine: Hemotropic Mycoplasmas",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1072-1076.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-nelson-couto-hemoplasma-2020',
      title: 'Small Animal Internal Medicine: Erythrocyte Parasites (Hemoplasmas)',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:1342-1345.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-plumb-hemoplasma-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Doxycycline, Pradofloxacin, Marbofloxacin",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:384-388 (Doxycycline), 820-822 (Pradofloxacin).",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-tasker-diagnosis-2010',
      title: 'Haemotropic mycoplasmas: What is their role in feline disease?',
      citationText: 'Tasker S. Haemotropic mycoplasmas: What is their role in feline disease? J Feline Med Surg. 2010;12(5):385-394.',
      authors: 'Tasker S.',
      year: 2010,
      journal: 'Journal of Feline Medicine and Surgery',
      volume: '12',
      pages: '385-394',
      sourceType: 'Artigo de Revisão',
      doi: '10.1016/j.jfms.2010.03.011',
      evidenceLevel: 'B'
    }
  ]
};
