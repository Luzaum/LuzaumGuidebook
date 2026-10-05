import { DiseaseRecord } from '../../types/disease';

export const bruceloseCaesGatosRecord: DiseaseRecord = {
  id: 'disease-brucelose-caes-gatos',
  slug: 'brucelose-caes-gatos',
  title: 'Brucelose em Cães e Gatos (Brucella canis)',
  synonyms: [
    'Brucelose canina',
    'Brucelose felina',
    'Infecção por Brucella canis',
    'Canine brucellosis',
    'Brucellosis in dogs and cats',
    'Aborto infeccioso canino por Brucella',
    'Discospondilite por Brucella',
    'Epididimite e orquite por Brucella',
  ],
  species: ['dog', 'cat'],
  category: 'infectologia',
  categories: [
    'infectologia',
    'reproducao',
    'neurologia',
    'ortopedia',
    'oftalmologia',
    'saude-publica',
    'clinica-medica',
  ],
  tags: [
    'Brucelose',
    'Brucella canis',
    'Brucella abortus',
    'Brucella suis',
    'Fenótipo Rough',
    'LPS sem Cadeia O-PS',
    'Discospondilite',
    'Hole-Punch',
    'Moeller 2025',
    'Long 2022',
    'Orquite',
    'Epididimite',
    'Aborto Tardio',
    'Uveíte',
    'Bacteremia Crônica',
    'CBM',
    '2ME-RSAT',
    'AGID II',
    'Biossegurança BSL-3',
    'One Health',
    'Zoonose',
    'Nelson & Couto',
    'CDC 2026',
  ],
  isPublished: true,

  quickSummary:
    'Aspectos centrais da enfermidade:\n' +
    '- Natureza e biologia do patógeno: cocobacilo Gram-negativo intracelular facultativo caracterizado por lipopolissacarídeo rugoso (rough LPS) sem a cadeia O-polissacarídica clássica.\n' +
    '- Falha dos testes convencionais: ensaios projetados para Brucella lisa (smooth, como B. abortus e B. melitensis) não detectam infecção por B. canis em cães e humanos.\n' +
    '- Apresentações clínicas:\n' +
    '- Trato reprodutivo: abortamentos tardios (45–60 dias), natimortos, epididimite, orquite e atrofia testicular.\n' +
    '- Formas extrarreprodutivas: discospondilite multifocal juvenil (mediana 2,5 anos, afebril, sem leucocitose), uveíte e glomerulonefrite em animais mesmo castrados.\n' +
    '- Diagnóstico laboratorial: sorologia para antígeno rough (CBM, 2ME-RSAT, AGID II), PCR e cultura com alerta compulsório prévio por risco ocupacional grave (nível BSL-3).\n' +
    '- Realidade terapêutica e One Health: não há garantia de cura microbiológica estéril; a antibioticoterapia combinada e castração reduzem a carga bacteriana, mas o animal permanece portador.',

  quickDecisionStrip: [
    'Fenótipo rough: testes sorológicos para Brucella smooth (bovina/suína) NÃO detectam Brucella canis.',
    'Discospondilite em cães jovens e afebris exige investigação etiológica mesmo em animais castrados.',
    'Avisar obrigatoriamente o laboratório antes de enviar amostras para cultura devido ao risco BSL-3.',
    'A resposta clínica favorável e a queda nos títulos sorológicos NÃO comprovam esterilização tecidual.',
    'A castração reduz a eliminação ambiental, mas a próstata e o baço continuam albergando a bactéria.',
  ],

  quickSummaryRich: {
    lead:
      'A brucelose canina é uma zoonose de curso arrastado com biologia intracelular e fenótipo rough que desafiam o diagnóstico de rotina.\n' +
      'Cães castrados e assintomáticos podem atuar como portadores crônicos e transmissores ativos por anos.',
    leadHighlights: [
      'Lipopolissacarídeo rough: ausência da cadeia O-PS gera subdiagnóstico sistemático em testes padrão.',
      'Apresentação não reprodutiva frequente: discospondilite multifocal juvenil sem febre nem leucocitose.',
      'Carga massiva em tecidos de aborto: até 10¹⁰ UFC/mL exigindo uso estrito de EPI e biossegurança.',
      'Paradigma de cura inexistente: infecção intracelular persistente torna o animal portador vitalício.',
    ],
    pillars: [
      {
        title: 'Morfologia Rough e Diagnóstico Sorológico Específico',
        body:
          'Particularidades moleculares e sorologia:\n' +
          '- Ausência da cadeia O-polissacarídica (O-PS) no LPS de B. canis.\n' +
          '- Necessidade estrita de antígenos rough específicos (CBM, 2ME-RSAT, CPAg-AGID II); testes para brucelose de ruminantes são totalmente ineficazes.',
      },
      {
        title: 'Mimetismo Clínico: Discospondilite e Portadores Assintomáticos',
        body:
          'Apresentações não reprodutivas desafiadoras:\n' +
          '- Discospondilite juvenil crônica (< 5 anos, mediana 2,5 anos) com dor axial, afebril (86%) e sem leucocitose.\n' +
          '- Padrão lítico "hole-punch" em endplates sugere B. canis, mas não é patognomônico (Moeller et al., 2025).',
      },
      {
        title: 'Risco Ocupacional e Biossegurança Laboratorial BSL-3',
        body:
          'Alerta máximo de biossegurança ocupacional:\n' +
          '- Carga massiva em fluidos fetais (10¹⁰ bactérias/mL) e urina de machos (10³ a 10⁶/mL).\n' +
          '- Risco extremo de aerossolização em necropsias, cirurgias e culturas microbiológicas, exigindo contenção BSL-3.',
      },
      {
        title: 'Manejo One Health e Realidade Terapêutica sem Cura Estéril',
        body:
          'Limitações terapêuticas e saúde única:\n' +
          '- Nenhum regime antimicrobiano assegura eliminação microbiológica estéril de B. canis.\n' +
          '- Animais tratados mantêm risco de recidiva e transmissão silenciosa, demandando afastamento reprodutivo definitivo.',
      },
    ],

    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico Sequencial na Suspeita de Brucelose Canina',
      steps: [
        {
          label: 'Passo 1 — Triagem Clínica, Fatores de Risco e EPI Imediato',
          detail:
            'Triagem e biossegurança imediata:\n' +
            '- Histórico de abortamento tardio (45–60 dias), descargas escuras, orquite, discospondilite ou infertilidade.\n' +
            '- Paramentação imediata com luvas, avental impermeável e proteção facial completa.',
          timing: 'Minuto 0',
          limitations: 'Cães castrados, virgens e clinicamente normais podem estar cronicamente infectados.',
        },
        {
          label: 'Passo 2 — Triagem Sorológica com Antígeno Rough Específico',
          detail:
            'Sorologia de triagem com antígeno rough:\n' +
            '- Coleta de soro para 2ME-RSAT (inativação de IgM com 2-mercaptoetanol) ou Canine Brucella Multiplex (CBM - Cornell University).',
          timing: 'Hora 1 a 24',
          limitations: 'Janela imunológica de 3 a 12 semanas pós-infecção; falso-negativos em fases muito precoces.',
        },
        {
          label: 'Passo 3 — Confirmação Sorológica Específica (AGID II / CPAg)',
          detail:
            'Confirmação sorológica de alta especificidade:\n' +
            '- Encaminhar amostras suspeitas para Imunodifusão em Gel de Ágar com antígeno citoplasmático interno (CPAg-AGID II, especificidade ~100%).',
          timing: 'Dia 2 a 5',
          limitations: 'Pode levar até 8 a 12 semanas pós-infecção para positivação; não descarta fase inicial.',
        },
        {
          label: 'Passo 4 — Diagnóstico Direto por PCR e Cultura com Notificação BSL-3',
          detail:
            'Diagnóstico direto sob contenção BSL-3:\n' +
            '- Coleta de sangue EDTA, sêmen, corrimento ou aspirado para PCR e cultura em meio específico, notificando o laboratório sobre risco BSL-3.',
          timing: 'Dia 3 a 14',
          limitations: 'Bacteremia intermitente; antibioticoterapia prévia inibe o crescimento na cultura.',
        },
        {
          label: 'Passo 5 — Avaliação de Lesões Extrarreprodutivas e One Health',
          detail:
            'Rastreio sistêmico e vigilância sanitária:\n' +
            '- Radiografia e ressonância magnética vertebral (discospondilite), avaliação oftálmica (uveíte) e notificação de saúde pública em caso de exposição humana.',
          timing: 'Semana 1 a 2',
          limitations: 'Radiografias precoces podem ser normais (RM tem sensibilidade 37% superior).',
        },
      ],
    },

    treatmentFlow: {
      title: 'Fluxograma de Manejo Terapêutico e Biossegurança em 5 Fases',
      steps: [
        {
          label: 'Fase 1 — Isolamento Rigoroso e Suspensão Reprodutiva Definitiva',
          detail:
            'Medidas de contenção e termos éticos:\n' +
            '- Segregação estrita de outros cães e de indivíduos vulneráveis (gestantes, crianças, imunossuprimidos).\n' +
            '- Suspensão definitiva da reprodução e assinatura de termo de consentimento livre e esclarecido pelo tutor.',
          timing: 'Imediato',
          limitations: 'Desafio emocional e financeiro para tutores e criadores comerciais.',
        },
        {
          label: 'Fase 2 — Antibioticoterapia Combinada de Primeira Linha',
          detail:
            'Esquema sinérgico de primeira linha:\n' +
            '- Doxiciclina (5 a 10 mg/kg VO q12h por 4 a 8 semanas, até 12 semanas em discospondilite).\n' +
            '- Gentamicina (5 mg/kg SC q24h por 7 a 14 dias com monitoramento renal rigoroso).',
          timing: 'Semanas 1 a 8',
          limitations: 'Risco de nefrotoxicidade por aminoglicosídeos; monoterapia é formalmente contraindicada.',
        },
        {
          label: 'Fase 3 — Regime Alternativo Oral em Casos de Nefropatia ou Falha',
          detail:
            'Esquema oral alternativo em nefropatas:\n' +
            '- Doxiciclina (10 mg/kg VO q12h) associada a Enrofloxacina (5 a 10 mg/kg VO q24h) ou Minociclina (12,5 mg/kg VO q12h) por 6 a 12 semanas consecutivas.',
          timing: 'Semanas 2 a 12',
          limitations: 'Falhas terapêuticas e seleção de resistência bacteriana com fluoroquinolonas.',
        },
        {
          label: 'Fase 4 — Intervenção Cirúrgica com Paramentação Completa (EPI)',
          detail:
            'Intervenção cirúrgica com EPI completo:\n' +
            '- OSH em fêmeas e orquiectomia com ablação escrotal em machos sob contenção (luvas duplas, N95, óculos); reduz eliminação mas não esteriliza próstata/baço.',
          timing: 'Após estabilização inicial',
          limitations: 'Castração não esteriliza a infecção e o macho continua eliminando bactérias na urina.',
        },
        {
          label: 'Fase 5 — Monitoramento Clínico-Sorológico Longitudinal e Vigilância Vitalícia',
          detail:
            'Vigilância longitudinal permanente:\n' +
            '- Dosagem quantitativa seriada de anticorpos (CBM / 2ME-RSAT) a cada 2 a 3 meses e PCR periódico; queda de ~40% nos títulos denota controle clínico satisfatório.',
          timing: 'A cada 3 a 6 meses por 2 anos',
          limitations: 'Soronegativação temporária não comprova eliminação; recaídas tardias são frequentes.',
        },
      ],
    },
  },

  etiology: {
    taxonomiaEBiologiaDeBrucella:
      'Classificação taxonômica e características biológicas:\n' +
      '- Morfologia e fisiologia: cocobacilos Gram-negativos, imóveis, aeróbios estritos ou microaerofílicos, intracelulares facultativos de crescimento lento da família Brucellaceae.\n' +
      '- Agente canino adaptado: Brucella canis é a espécie natural adaptada à transmissão enzootica em cães domésticos e canídeos silvestres.\n' +
      '- Fenômeno de transbordamento (spillover) em cães:\n' +
      '- Brucella suis (biovares 1 e 3): adquirida em cães de caça e consumo de carcaças ou dietas cruas de javalis e suínos ferais.\n' +
      '- Brucella abortus: ingestão de restos placentários, carcaças ou leite cru em propriedades leiteiras bovinas.\n' +
      '- Brucella melitensis: ocorrência mais rara associada a caprinos e ovinos infectados.',

    fenotipoRoughVsSmoothEImplicacoes:
      'Diferenciação estrutural de membrana e repercussão diagnóstica:\n' +
      '- Estrutura do LPS bacteriano: composto por lipídeo A, cerne polissacarídico (core) e antígeno O distal (cadeia O-polissacarídica - O-PS).\n' +
      '- Espécies lisas clássicas (smooth): B. abortus, B. melitensis e B. suis possuem cadeia O-PS longa e imunodominante, base dos testes sorológicos convencionais.\n' +
      '- Fenótipo rugoso natural (rough LPS): B. canis e B. ovis carecem da cadeia O-PS, expondo proteínas e antígenos centrais do core.\n' +
      '- ARMADILHA DIAGNÓSTICA CRÍTICA: testes sorológicos padrão para Brucella lisa (bovina/suína) geram resultados 100% falso-negativos em cães infectados por B. canis; requer-se antígeno rough específico (CBM, 2ME-RSAT, AGID II).',

    outrasEspeciesDeBrucellaEmCaesEGatos:
      'Infecções cruzadas e particularidades por espécie hospedeira:\n' +
      '- Relevância de B. suis em cães de caça: expansão de javalis associada à caça e dietas cruas (BARF) favorece a infecção; coorte de 27 cães revelou títulos mantidos e eliminação no leite materno.\n' +
      '- Resistência inata da espécie felina: gatos são naturalmente refratários a B. canis e não atuam como reservatórios epidemiológicos conhecidos da afecção.\n' +
      '- Spillover atípico de B. abortus em felinos: isolamento microbiológico de B. abortus biovar 1 documentado em gata com piometra purulenta aberta em fazenda leiteira endêmica (PubMed ID 27307391).',

    resistenciaFisicoQuimicaEDesinfeccao:
      'Estabilidade físico-química e protocolos de desinfecção:\n' +
      '- Resistência ambiental moderada: B. canis não forma esporos e é inativada por calor úmido (autoclave 121°C por 15 min), dessecação e luz ultravioleta.\n' +
      '- Desinfetantes hospitalares de escolha: hipoclorito de sódio (0,5%–1%), compostos de amônio quaternário, álcool 70% e glutaraldeído.\n' +
      '- REGRA DE OURO SANITÁRIA: a remoção mecânica prévia de matéria orgânica (placentas, urina, fezes e sangue) é obrigatória antes da aplicação química para evitar inativação do germicida.\n' +
      '- Persistência biológica intracelular: dentro dos macrófagos e em tecidos protegidos no hospedeiro vivo, o microrganismo sobrevive por anos.',

    tabelaEspeciesBrucellaComparadas: {
      caption: 'Tabela 1 — Comparação Taxonômica, Estrutural e Clínica das Espécies de Brucella em Pequenos Animais',
      headers: [
        'Parâmetro / Característica',
        'Brucella canis (Agente Clássico)',
        'Brucella suis (Biovares 1 e 3)',
        'Brucella abortus (Biovares bovinos)',
      ],
      rows: [
        [
          'Fenótipo do LPS de Superfície',
          'Rugoso (rough) — sem cadeia O-polissacarídica',
          'Liso (smooth) — cadeia O-PS bem desenvolvida',
          'Liso (smooth) — cadeia O-PS imunodominante',
        ],
        [
          'Hospedeiro Primário Natural',
          'Canídeos domésticos e silvestres (Cão)',
          'Suínos domésticos e javalis ferais (Sus scrofa)',
          'Bovinos e bubalinos domésticos (Bos taurus)',
        ],
        [
          'Ocorrência e Quadro em Cães',
          'Enzootia endêmica; abortos, orquite, discospondilite',
          'Esporádica em cães de caça; bacteremia crônica',
          'Spillover raro por ingestão de restos de parto/leite',
        ],
        [
          'Ocorrência e Quadro em Gatos',
          'Infecção natural rara e pouco caracterizada',
          'Evidência extremamente restrita; spillover atípico',
          'Documentado em piometra felina em fazendas leiteiras',
        ],
        [
          'Testes Sorológicos Adequados',
          'Exclusivos para rough (CBM, 2ME-RSAT, AGID II CPAg)',
          'Testes para smooth (Rosa Bengala, ELISA liso, FPA)',
          'Testes para smooth (Rosa Bengala, AAT, 2-ME liso)',
        ],
        [
          'Potencial Zoonótico em Humanos',
          'Moderado a alto; febre recorrente, fadiga, artralgia',
          'Elevado; doença humana debilitante aguda e crônica',
          'Elevado; febre de Malta clássica, espondilite',
        ],
      ],
    },
  },

  epidemiology: {
    epidemiologiaCaninaEMetaAnaliseGlobal2025:
      'Dados de prevalência mundial e quebra de paradigmas:\n' +
      '- Meta-análise global contemporânea (PubMed ID 41098548): 134 estudos (1970–2025) com 175.675 cães estimaram soroprevalência global agregada de 7,96% (IC 95%: 6,48%–9,61%).\n' +
      '- Variação biogeográfica acentuada: cães rurais apresentaram prevalência combinada mais elevada (~23,5%) devido ao acesso a carcaças e abortos.\n' +
      '- Disseminação ampla: B. canis figura como espécie predominante em todas as regiões avaliadas, ultrapassando os limites restritos de canis comerciais.',

    cenarioEpidemiologicoBrasileiro:
      'Circulação enzoótica no território brasileiro:\n' +
      '- Prevalência nacional heterogênea: inquéritos em centros de controle de zoonoses e abrigos revelam soropositividades de 1,5% a 15% conforme a densidade populacional e status reprodutivo.\n' +
      '- Vigilância em comunidades costeiras: estudo em comunidades caiçaras identificou 2% de cães soropositivos com PCR sanguínea negativa no momento, evidenciando infecção silenciosa.\n' +
      '- Desafio de saúde pública: escassez de triagem sorológica de rotina na admissão de abrigos perpetua a transmissão endêmica entre animais de companhia.',

    particularidadesFelinasERaridadeDaInfeccao:
      'Refração biológica felina e diagnósticos diferenciais rurais:\n' +
      '- Resistência inata canina vs felina: inoculação experimental em gatos gera bacteremia fugaz e títulos transitórios sem doença clínica reprodutiva ou ortopédica.\n' +
      '- Ausência de reservatório felino: B. canis não estabelece ciclo sustentado em populações de gatos domésticos.\n' +
      '- Exceções em ambiente rural: relatos pontuais de piometra purulenta por B. abortus biovar 1 indicam que a bactéria deve ser considerada em fêmeas felinas expostas a rebanhos bovinos com abortamento.',

    desmistificacaoDoPerfilDoPaciente:
      'Transformação do perfil clínico e demográfico do hospedeiro:\n' +
      '- Superação do paradigma de reprodutor: a enfermidade não acomete apenas matrizes com aborto tardio ou padreadores com orquite em canis comerciais.\n' +
      '- Apresentação em animais esterilizados: diagnósticos frequentes em cães resgatados de abrigos e animais castrados há anos que manifestam discospondilite ou uveíte crônica.\n' +
      '- Evidência multicêntrica de Moeller et al. (2025): nenhum dos cães avaliados com discospondilite por B. canis era reprodutor, confirmando a relevância da transmissão não venérea.',

    tabelaPrevalenciaEEpidemiologiaCaninaVsFelina: {
      caption: 'Tabela 2 — Matriz Comparativa Epidemiológica: Espécie Canina versus Espécie Felina na Brucelose',
      headers: [
        'Critério Epidemiológico',
        'Espécie Canina (Cão doméstico e canídeos)',
        'Espécie Felina (Gato doméstico)',
      ],
      rows: [
        [
          'Papel como Reservatório',
          'Principal reservatório natural e hospedeiro definitivo de B. canis',
          'Não atua como reservatório epidemiológico de B. canis',
        ],
        [
          'Prevalência Global Estimada',
          'Agregada em 7,96% (meta-análise 2025); até 23,5% em cães de fazenda',
          'Excepcionalmente rara; apenas relatos isolados de spillover',
        ],
        [
          'Grupos de Maior Vulnerabilidade',
          'Animais de canis, cães de abrigo, cães de caça, jovens < 5 anos',
          'Gatos de fazendas leiteiras com brucelose bovina endêmica',
        ],
        [
          'Status Reprodutivo de Risco',
          'Cães reprodutores inteiros, mas também castrados e animais jovens',
          'Fêmeas inteiras em contato com bovinos abortantes',
        ],
        [
          'Relevância de Zoonose a partir do Pet',
          'Elevada: 80% dos casos humanos de B. canis decorrem de cães',
          'Inexpressiva para B. canis; risco teórico por B. abortus',
        ],
      ],
    },
  },

  pathogenesisTransmission: {
    viasDeTransmissaoEFontesDeInfeccao:
      'Portas de entrada e dinâmicas de propagação:\n' +
      '- Superfícies mucosas receptivas: transmissão eficiente pelas mucosas oral, nasal, conjuntival e genital (vaginal ou prepucial), além de pele escoriada.\n' +
      '- Transmissão venérea clássica: disseminação por cópula ou inseminação artificial com sêmen infectado fresco ou congelado albergando bactérias viáveis.\n' +
      '- Via oronasal não venérea: lamber ou cheirar descargas genitais, fetos abortados, placentas e urina infectada responde por grande parte dos contágios domésticos.\n' +
      '- Transmissão vertical: passagem transplacentária determinando aborto, natimortos ou filhotes portadores que transmitem a bactéria pelo leite materno.',

    cargasBacterianasEMateriaisDeAltoRisco:
      'Quantificação microbiológica e gradiente de infectividade:\n' +
      '- Tecidos reprodutivos femininos de altíssimo risco: placentas, envoltórios fetais e lóquios pós-aborto concentram até 10¹⁰ UFC/mL (10 bilhões de organismos por mL).\n' +
      '- Descarga vaginal pós-abortamento: eliminação de cargas elevadas mantida por 1 a 6 semanas consecutivas.\n' +
      '- Fluidos masculinos: sêmen fresco e fluido prostático contêm 10⁶ a 10⁸ UFC/mL nos primeiros meses pós-infecção.\n' +
      '- Excreção urinária contínua: urina de machos e fêmeas contém 10³ a 10⁶ bactérias/mL, sendo a eliminação do macho prolongada pela colonização crônica da próstata.',

    mecanismoDeInvasaoESobrevivenciaIntracelular:
      'Invasão epitelial e evasão da imunidade celular:\n' +
      '- Penetração mucosal: transcitose através de células M e invasão de microlesões, seguida de fagocitose por macrófagos e células dendríticas subepiteliais.\n' +
      '- Bloqueio da resposta imune inata: B. canis inibe a fusão fagolisossômica precoce e neutraliza a produção de espécies reativas de oxigênio intrafagossômicas.\n' +
      '- Formação do vacúolo replicativo (BCV): tráfego intracelular direcionado para o retículo endoplasmático rugoso, criando um nicho metabólico protegido.\n' +
      '- Escape farmacológico e humoral: o confinamento intracelular impede o acesso de anticorpos neutralizantes e antimicrobianos de baixa penetração citoplasmática.',

    bacteremiaCronicaETropismoTecidual:
      'Disseminação hematogênica e colonização de órgãos alvo:\n' +
      '- Disseminação linfática e ducto torácico: monócitos infectados migram aos linfonodos regionais, amplificando a carga bacteriana com linfadenomegalia generalizada.\n' +
      '- Bacteremia prolongada associada a células: início entre 1 e 4 semanas pós-exposição, estendendo-se por 6 a 64 meses contínuos ou intermitentes (mediana de 1 a 2 anos).\n' +
      '- Tropismo tecidual primário: órgãos ricos em esteroides sexuais e eritritol (útero, placenta, epidídimo, próstata) e baço/fígado.\n' +
      '- Sítios de microcirculação terminal protegida: discos intervertebrais (discospondilite), câmaras oculares (uveíte), glomérulos e meninges.',

    tabelaCargasBacterianasEViasDeTransmissao: {
      caption: 'Tabela 3 — Cargas Bacterianas por Tecido/Fluido e Risco de Transmissão Zoonótica e Canina',
      headers: [
        'Material Biológico / Secreção',
        'Carga Bacteriana Estimada (UFC/mL ou g)',
        'Duração da Eliminação',
        'Nível de Risco Zoonótico / EPI Recomendado',
      ],
      rows: [
        [
          'Placenta e Fetos Abortados',
          'Até 10¹⁰ organismos/mL ou g de tecido',
          'Período perinatal e pós-aborto imediato',
          'Crítico (Máximo): Luvas duplas, N95, óculos, avental',
        ],
        [
          'Descarga Vaginal Pós-Aborto / Cio',
          '10⁶ a 10⁸ organismos/mL',
          'Persiste por 1 a 6 semanas pós-aborto',
          'Elevado: Manipulação com luvas e contenção estrita',
        ],
        [
          'Sêmen e Fluido Prostático',
          '10⁶ a 10⁸ organismos/mL',
          'Meses a anos (declina após 6–12 meses)',
          'Elevado: Cuidado extremo na colheita e IA',
        ],
        [
          'Urina de Machos (Prostatite)',
          '10³ a 10⁶ organismos/mL',
          'Intermitente ou crônica por vários anos',
          'Moderado a Alto: Higienização com desinfetante e luvas',
        ],
        [
          'Sangue Total (Fase Bacteriêmica)',
          '10¹ a 10⁴ organismos/mL',
          'Contínua ou intermitente por 6 a 64 meses',
          'Moderado: Risco ocupacional em venopunção e BSL-3',
        ],
        [
          'Saliva, Secreção Ocular e Fômites',
          '< 10² organismos/mL (baixo inóculo)',
          'Transitória associada a higiene oral/lambedura',
          'Baixo a Moderado: Risco em contato com mucosas humanas',
        ],
      ],
    },
  },

  pathophysiology: {
    patogeneseDaDiscospondiliteEMicrocirculacao:
      'Gênese da osteomielite e colapso discal vertebral:\n' +
      '- Microcirculação terminal vulnerável: os capilares metafisários que irrigam os endplates cartilaginosos são sinuosos, lentos e desprovidos de colaterais, predispondo à deposição bacteriana.\n' +
      '- Disseminação hematógena: ondas de bacteremia crônica levam à impactação de monócitos infectados na placa terminal vertebral.\n' +
      '- Lise e necrose tecidual: proliferação bacteriana induz osteoclastogênese acelerada, reabsorção óssea lítica e invasão secundária do disco intervertebral avascular.\n' +
      '- Evolução esclerótica e compressão: com a cronicidade, surge osteofitose proliferativa, colapso do espaço discal e tecido inflamatório epidural comprimindo raízes nervosas e medula espinhal.',

    fisiopatologiaDoAbortamentoEPlacentite:
      'Comprometimento trofoblástico e interrupção gestacional:\n' +
      '- Estímulo replicativo do eritritol: hormônios esteroides e eritritol nos tecidos uteroplacentários funcionam como fatores quimiotáticos para proliferação explosiva de B. canis.\n' +
      '- Vasculite e placentite necrosante: invasão do trofoblasto entre 30 e 45 dias de gestação provoca trombose coriônica e necrose dos vilos placentários.\n' +
      '- Isquemia e maceração fetal: o colapso na troca materno-fetal induz anóxia, morte intrauterina e expulsão de fetos autolisados entre o 45º e o 60º dia de gestação.\n' +
      '- Reabsorção embrionária precoce: perdas antes de 30 dias manifestam-se clinicamente como falhas de concepção e infertilidade aparente.',

    patologiaReprodutivaMasculinaEAnticorposAntiesperma:
      'Disfunção testicular, quebra de barreira e autoimunidade:\n' +
      '- Colonização glandular primária: B. canis invade precocemente túbulos seminíferos, epidídimos e tecido prostático, replicando-se em células de Sertoli.\n' +
      '- Ruptura da barreira hematotesticular: o edema inflamatório agudo e a necrose tubular rompem o privilégio imunológico dos testículos.\n' +
      '- Autoimunidade antiespermatozoide: o contato de antígenos espermáticos com a circulação deflagra autoanticorpos antiesperma e reações de hipersensibilidade celular retardada.\n' +
      '- Desfecho andrológico: aglutinação espermática massiva, perda de motilidade, atrofia testicular fibrosa bilateral e azoospermia irreversível.',

    glomerulonefritePorImunocomplexosEUveite:
      'Repercussões inflamatórias imunes crônicas por antígenos circulantes:\n' +
      '- Formação contínua de imunocomplexos: antígenos bacterianos persistentes estimulam hiperglobulinemia marcante com complexos antígeno-anticorpo circulantes solúveis.\n' +
      '- Lesão glomerular renal: precipitação passiva na membrana basal glomerular e ativação de complemento culminam em glomerulonefrite membranoproliferativa com proteinúria e UPC elevada.\n' +
      '- Inflamação uveal ocular: deposição no endotélio fenestrado capilar ocular provoca uveíte anterior recidivante, precipitados ceráticos, hipópio, coriorretinite e glaucoma secundário.',
  },

  clinicalSignsPathophysiology: {
    sindromeReprodutivaNaCadela:
      'Quadro reprodutivo clássico na fêmea canina:\n' +
      '- Abortamento tardio característico: interrupção gestacional entre 45 e 60 dias com fetos autolisados macerados e membranas acastanhadas espessadas.\n' +
      '- Lóquios vaginais persistentes: corrimento mucoide a mucopurulento verde-acinzentado ou hemorrágico escuro sem odor pútrido, perdurando por 1 a 6 semanas.\n' +
      '- Perdas precoces e mortalidade neonatal: reabsorção fetal imperceptível simulando falha de concepção; filhotes a termo nascem fracos e sucumbem em 48 a 72 horas.\n' +
      '- PARTICULARIDADE CLÍNICA: as cadelas mantêm ciclos estrais regulares, excelente apetite e ausência de febre sistêmica, mascarando a infecção.',

    sindromeReprodutivaNoMacho:
      'Evolução da síndrome genital masculina:\n' +
      '- Fase aguda inflamatória: orquite e epididimite uni ou bilateral, aumento escrotal doloroso, calor local, marcha em abdução e dermatite escrotal por lambedura.\n' +
      '- Fase crônica degenerativa: regressão do edema com atrofia testicular fibrosa progressiva (testículos pequenos, endurecidos e irregulares) e prostatite crônica com disúria.\n' +
      '- Deterioração seminal: espermograma a partir da 5ª semana pós-infecção revela > 90% de anormalidades morfológicas, leucocitospermia, aglutinação e infertilidade definitiva.',

    manifestacoesOsteoarticularesEDiscospondilite:
      'Apresentação extrarreprodutiva de maior impacto clínico:\n' +
      '- Perfil epidemiológico típico: cães jovens com menos de 5 anos (mediana 2,5 anos) manifestando dor vertebral crônica com duração superior a 3 meses antes da confirmação.\n' +
      '- Manifestações clínicas: hiperestesia à palpação da coluna, relutância em pular ou subir degraus, cifose e marcha rígida com passos encurtados.\n' +
      '- Déficits neurológicos secundários: compressão medular ou radicular provocando ataxia proprioceptiva, paresia e síndrome da cauda equina (junção L7-S1).\n' +
      '- Padrão de Moeller et al. (2025): maior prevalência de discos cervicais (C2-C5) e lesões multifocais simultâneas em comparação a outras causas de discospondilite.',

    manifestacoesOcularesECardiovasculares:
      'Comprometimento oftalmológico e cardiovascular avançado:\n' +
      '- Espectro oftalmológico: uveíte anterior (blefarospasmo, fotofobia, miose, flare aquoso e hipópio), coriorretinite, hifema, descolamento de retina e glaucoma secundário.\n' +
      '- Sítio santuário ocular: o olho atua como reservatório anatômico protegido imunitariamente, viabilizando recidivas clínicas tardias após antibioticoterapia.\n' +
      '- Endocardite infecciosa vegetativa: complicação rara porém letal em valva aórtica ou mitral, cursando com sopros recentes, febre flutuante e arritmias cardíacas graves.',

    manifestacoesSistemicasEAssintomaticas:
      'Apresentação subclínica e achados sistêmicos inespecíficos:\n' +
      '- Estado de portador assintomático: grande proporção de cães infectados permanece ativa e eutrófica, atuando como transmissores silenciosos por anos.\n' +
      '- Sinais constitucionais discretos: linfadenomegalia generalizada indolor (retrofaríngeos, pré-escapulares e poplíteos), hepatoesplenomegalia discreta e perda de peso crônica.\n' +
      '- Ausência de febre: febre é rara em cães com B. canis (apenas 14% na série de Long et al., 2022), diferenciando-se da brucelose aguda humana clássica.',
  },

  diagnosis: {
    desafiosDiagnosticosELimitesDosTestesIsolados:
      'Complexidade diagnóstica e abordagem multimodal (Nelson & Couto; VIN 2025):\n' +
      '- Ausência de teste isolado perfeito: nenhum ensaio sorológico, molecular ou microbiológico detém 100% de sensibilidade e especificidade simultâneas em uma única coleta.\n' +
      '- Desafios biológicos intrínsecos: oscilação temporal de títulos de anticorpos, bacteremia intermitente e supressão por uso prévio empírico de antibióticos.\n' +
      '- Estratégia multimodal recomendada: associação criteriosa de anamnese epidemiológica, triagem com antígeno rough, testes confirmatórios de alta especificidade (AGID II/CBM) e PCR/cultura.',

    sorologiaParaBrucellaCanisRough:
      'Painel sorológico com antígenos de superfície e citoplasmáticos:\n' +
      '- RSAT (Aglutinação rápida em lâmina): alta sensibilidade para triagem, porém sujeito a reações cruzadas com Bordetella bronchiseptica, Pseudomonas e Staphylococcus.\n' +
      '- 2ME-RSAT (Tratamento com 2-mercaptoetanol): desnatura pontes dissulfeto de IgM inespecíficas, preservando aglutininas IgG específicas e elevando a especificidade diagnóstica.\n' +
      '- CPAg-AGID II (Imunodifusão em gel de ágar): padrão confirmatório clássico utilizando antígenos proteicos citoplasmáticos solúveis com especificidade próxima a 100%.\n' +
      '- Janela imunológica: a soroconversão no AGID II pode demandar de 8 a 12 semanas pós-exposição.',

    canineBrucellaMultiplexCbmCornell:
      'Plataforma de alta precisão multiplex (Cornell University):\n' +
      '- Tecnologia Luminex baseada em microesferas magnéticas: quantifica simultaneamente anticorpos contra antígenos recombinantes BP26 (membrana externa de 26 kDa) e PO1 (proteína interna).\n' +
      '- Vantagem analítica superior: independe do LPS rugoso, superando reações cruzadas e conferindo sensibilidade analítica > 95% com alta especificidade.\n' +
      '- Monitoramento terapêutico quantitativo: redução persistente de ~40% nos níveis de anticorpos contra PO1 aos 2-6 meses pós-tratamento associa-se a controle clínico e queda da bacteremia (Guarino et al., 2023).',

    testesRapidosPointOfCarePoc2026:
      'Avaliação crítica de dispositivos rápidos em consultório (POC 2026):\n' +
      '- Heterogeneidade analítica acentuada: estudo comparativo independente demonstrou que a formulação antigênica define a confiabilidade clínica do teste rápido.\n' +
      '- Dispositivos recomendados: kits baseados em antígenos proteicos específicos (Anigen Rapid, FASTest) exibiram concordância positiva (PPA) de 90% a 100% e negativa (NPA) de 92,5% a 100%.\n' +
      '- Alerta de falha diagnóstica: dispositivos formulados com extratos brutos de LPS apresentaram PPA de 0% em amostras confirmadas.\n' +
      '- CONDUTA OBRIGATÓRIA: qualquer resultado positivo em teste rápido POC de consultório deve ser obrigatoriamente confirmado por AGID II ou CBM de referência.',

    culturaBacteriologicaEPadraoOuro:
      'Isolamento microbiológico e padrão-ouro definitivo:\n' +
      '- Confirmação etiológica antemortem: cultivo bacteriano positivo atesta inequivocamente infecção ativa por colônias de Brucella canis viáveis.\n' +
      '- Amostras de maior rendimento: sangue total com anticoagulante (hemoculturas seriadas assépticas), sêmen, urina, secreção vaginal, fragmentos de placenta e aspirados vertebrais.\n' +
      '- Limitações de sensibilidade: bacteremia intermitente, uso prévio de antibióticos e exigência de incubação aeróbia prolongada (7 a 14 dias) em ágar enriquecido.\n' +
      '- ALERTA: cultura estéril ou negativa jamais descarta o diagnóstico de brucelose canina.',

    alertaMaximoDeBiossegurancaBsl3Laboratorial:
      'NOTIFICAÇÃO MANDATÓRIA DE BIOSSEGURANÇA (CLASSE DE RISCO 3):\n' +
      '- Perigo ocupacional extremo: Brucella spp. é classificada por CDC, OMS e MAPA como patógeno de alto risco inalatório e principal causa de infecções laboratoriais adquiridas (LAI).\n' +
      '- VETO PROCEDIMENTAL: proibida a manipulação de culturas bacterianas em bancada aberta comum ou centrifugação sem copos de segurança herméticos.\n' +
      '- DEVER ÉTICO E LEGAL DO CLÍNICO: destacar na requisição em caracteres vermelhos: "SUSPEITA DE BRUCELLA CANIS — AGENTE DE RISCO 3 — PROCESSAR EM CABINE DE FLUXO BIOLÓGICO CLASSE II / BSL-3".',

    pcrMolecularDnaVsBacteriaViva:
      'Diagnóstico molecular por PCR convencional e tempo real (qPCR):\n' +
      '- Alvos genômicos validados: sequências de inserção genômica específicas (como IS711) e genes estruturais (bspB) oferecem alta sensibilidade e rapidez.\n' +
      '- Amostras prioritárias: sangue total em EDTA, sêmen, descargas vaginais, aspirados de endplates vertebrais e tecidos fetais abortados autolisados.\n' +
      '- Interpretação clínica indispensável:\n' +
      '- PCR sanguínea negativa não descarta doença: em fases crônicas com bacteremia intermitente, o sangue pode ser negativo enquanto tecidos genitais/ossos continuam positivos.\n' +
      '- Detecção de DNA: a PCR amplifica material genético de bactérias vivas ou mortas, podendo manter-se temporariamente positiva após antibioticoterapia.',

    diagnosticoPorImagemDaDiscospondilite:
      'Imaginologia vertebral e desmistificação das lesões em soco:\n' +
      '- Radiografia simples da coluna: identifica lise necrótica dos endplates vertebrais em soco ("hole-punch lesions"), colapso do espaço discal, esclerose e pontes osteofíticas ventrais.\n' +
      '- Desmistificação de Moeller et al. (2025): o padrão "hole-punch" não é patognomônico de Brucella, ocorrendo também em discospondilites piogênicas por Staphylococcus e Streptococcus.\n' +
      '- Superioridade da Ressonância Magnética (RM): detecta 37% de lesões vertebrais invisíveis no raio-X, evidenciando edema de medula óssea precoce (physitis em T2/STIR) e extensão epidural.',

    tabelaPainelDiagnosticoSorologicoEMicrobiologico: {
      caption: 'Tabela 4 — Painel Diagnóstico de Brucella canis: Métodos, Antígenos, Desempenho e Aplicação Clínica',
      headers: [
        'Método Diagnóstico',
        'Alvo / Antígeno Analisado',
        'Sensibilidade Estimada',
        'Especificidade Estimada',
        'Indicação Clínica e Limitações',
      ],
      rows: [
        [
          'RSAT (Aglutinação rápida)',
          'Antígeno de superfície rough bruto',
          '70% a 90%',
          '60% a 80% (falsos-positivos)',
          'Triagem rápida inicial; reação cruzada com Bordetella/Staphylococcus',
        ],
        [
          '2ME-RSAT (Mercaptoetanol)',
          'Antígeno rough após inativação de IgM',
          '70% a 85%',
          '85% a 95%',
          'Triagem clínica refinada; elimina aglutininas inespecíficas da IgM',
        ],
        [
          'AGID II / CPAg (Imunodifusão)',
          'Proteínas citoplasmáticas solúveis internas',
          '50% a 65%',
          '≈ 100% (altíssima)',
          'Confirmação formal de triagem positiva; requer 8–12 sem pós-infecção',
        ],
        [
          'CBM Luminex (Cornell Univ.)',
          'Proteínas recombinantes BP26 e PO1',
          '> 95%',
          '95% a 98%',
          'Padrão de referência moderno; quantitativo para monitorar resposta clínica',
        ],
        [
          'Kits POC Rápidos de Triagem',
          'Antígenos proteicos ou extrato de LPS',
          'Variável (0% a 100%)',
          'Variável (80% a 100%)',
          'Triagem rápida de consultório; positivos DEVEM ser confirmados por AGID/CBM',
        ],
        [
          'Cultura Bacteriológica',
          'Isolamento de colônias bacterianas vivas',
          '50% a 70% (bacteremia intermit.)',
          '100% (Padrão-ouro)',
          'Confirmação microbiológica definitiva; IMPÕE alerta BSL-3 ao laboratório',
        ],
        [
          'PCR / qPCR em Tempo Real',
          'DNA bacteriano específico (IS711, bspB)',
          '75% a 90% (em tecidos)',
          '> 98%',
          'Rápido e específico; sangue negativo não descarta colonização tecidual',
        ],
      ],
    },

    tabelaDiagnosticoDiferencialDiscospondiliteEAborto: {
      caption: 'Tabela 5 — Matriz de Diagnóstico Diferencial de Abortamento Canino e Discospondilite',
      headers: [
        'Condição / Etiologia',
        'Principais Características Clínicas',
        'Fatores Epidemiológicos Diferenciais',
        'Exames Diagnósticos Distintivos',
      ],
      rows: [
        [
          'Brucelose (B. canis)',
          'Aborto tardio (45-60d) autolisado; discospondilite multifocal jovem afebril',
          'Canis, abrigos, cães de caça, castrados, cães jovens < 5 anos',
          'Sorologia rough (CBM, AGID II), hemocultura BSL-3, PCR tecidual',
        ],
        [
          'Herpesvírus Canino (CHV-1)',
          'Morte neonatal precoce (filhotes chorosos), aborto esporádico precoce',
          'Cadelas jovens primíparas; mortalidade fulminante de ninhadas < 3 sem',
          'PCR de órgãos fetais (fígado/rim), necrose focal hemorrágica petequial',
        ],
        [
          'Bacterioses Inespecíficas (E. coli)',
          'Aborto associado a metrite bacteriana materna grave com febre e choque',
          'Infecções ascendentes oportunistas; sepse puerperal materna evidente',
          'Cultura bacteriana vaginal purulenta, leucocitose neutrofílica severa',
        ],
        [
          'Discospondilite Estafilocócica',
          'Dor vertebral crônica com febre (comum), leucocitose, foco unifocal',
          'Cães de qualquer idade; foco cutâneo, urinário ou dental associado',
          'Hemocultura comum e urocultura positivas para S. pseudintermedius',
        ],
        [
          'Discospondilite Fúngica (Aspergillus)',
          'Dor espinhal progressiva, osteomielite destrutiva agressiva, uveíte',
          'Pastores Alemães imunodeficientes; áreas com poeira/grãos agrícolas',
          'Urocultura para hifas, galactomanana, antígeno em urina, sorologia fúngica',
        ],
      ],
    },
  },

  treatment: {
    objetivosTerapeuticosEConceitoDeAusenciaDeCura:
      'Alinhamento prognóstico e ausência de cura microbiológica estéril:\n' +
      '- Consenso científico internacional (CDC, WSAVA, Nelson & Couto, VIN): a brucelose canina deve ser considerada uma enfermidade sem garantia comprovada de cura microbiológica estéril.\n' +
      '- Fatores de persistência: replicação intracelular fagossômica, metabolismo lento e sequestro em sítios protegidos (próstata, baço, discos vertebrais e câmara ocular).\n' +
      '- Metas terapêuticas realistas:\n' +
      '1. Alívio de manifestações clínicas (dor axial na discospondilite, orquite e uveíte).\n' +
      '2. Redução sustentada da carga bacterêmica e da excreção ambiental em fluidos corporais.\n' +
      '3. Mitigação do risco zoonótico para tutores e contactantes.',

    protocolosAntimicrobianosCombinados:
      'Farmacoterapia combinada prolongada (Plumb 10ª ed.):\n' +
      '- VETO ABSOLUTO À MONOTERAPIA: o uso isolado de enrofloxacina ou doxiciclina gera remissão temporária ilusória, mantendo bacteremia e selecionando resistência bacteriana rápida.\n' +
      '- Protocolo de Primeira Linha (Tetraciclina + Aminoglicosídeo):\n' +
      '- Doxiciclina: 5 a 10 mg/kg VO q12h por 4 a 8 semanas (até 12 semanas em discospondilite ou uveíte).\n' +
      '- Gentamicina: 5 mg/kg SC q24h nos primeiros 7 a 14 dias; monitorar creatinina e cilindrúria semanalmente.\n' +
      '- Protocolo Oral Alternativo (Nefropatas): Doxiciclina (10 mg/kg VO q12h) associada a Enrofloxacina (5 a 10 mg/kg VO q24h) ou Minociclina (12,5 mg/kg VO q12h) por 6 a 12 semanas.',

    papelDaCirurgiaCastracaoEEnucleacao:
      'Manejo cirúrgico de barreira e controle de focos:\n' +
      '- Esterilização cirúrgica prioritária: OSH em fêmeas e orquiectomia com ablação escrotal em machos sob antibioticoterapia reduzem massas teciduais sob influência esteroide e secreções genitais.\n' +
      '- VETO AO CONCEITO DE CURA PELA CASTRAÇÃO: a orquiectomia NÃO esteriliza o macho; a próstata permanece infectada e continua excretando bactérias viáveis na urina por meses ou anos.\n' +
      '- Enucleação em uveíte refratária: indicada em olhos cegos dolorosos com descolamento de retina ou glaucoma secundário para eliminar sítio santuário de replicação bacteriana.',

    precaucoesCirurgicasEEpiOcupacional:
      'Biossegurança no bloco cirúrgico e proteção da equipe:\n' +
      '- Alto risco de exposição zoonótica: procedimentos invasivos (castrações, descompressões vertebrais, biópsias) liberam sangue e fluidos com alta carga bacteriana.\n' +
      '- Paramentação de barreira obrigatória: avental cirúrgico impermeável, luvas duplas de procedimento, máscara respiratória N95/PFF2 e óculos com vedação lateral contra aerossóis.\n' +
      '- Descontaminação instrumental: imersão imediata de instrumentais em desinfetante adequado antes da limpeza mecânica e autoclavagem; resíduos acondicionados em sacos de risco biológico classe 3.',

    monitoramentoTerapeuticoECriteriosDeRecidiva:
      'Vigilância longitudinal e critérios de recidiva:\n' +
      '- Periodicidade de monitoramento: reavaliações clínicas e laboratoriais a cada 2 a 3 meses no primeiro ano e semestrais subsequentemente por toda a vida do paciente.\n' +
      '- Marcadores de resposta pelo CBM: queda sustentada de ~40% nos níveis de anticorpos contra o antígeno PO1 entre 2 e 6 meses pós-terapia indica bom controle clínico (Guarino et al., 2023).\n' +
      '- Diagnóstico de recidiva clínica: elevação de títulos no 2ME-RSAT/AGID II, retorno da dor axial na discospondilite ou prostatite exigem novo ciclo combinado com esquema alternativo.',

    tabelaProtocolosAntimicrobianosEMonitoramento: {
      caption: 'Tabela 6 — Regimes Farmacoterapêuticos Combinados e Monitoramento na Brucelose Canina',
      headers: [
        'Fármaco / Regime Combinado',
        'Dose, Via e Intervalo',
        'Duração do Tratamento',
        'Vantagens Clínicas e Alertas de Toxicidade',
      ],
      rows: [
        [
          'Doxiciclina (Regime Base)',
          '5 a 10 mg/kg VO a cada 12 horas',
          '4 a 8 semanas (12 sem em discospondilite)',
          'Excelente penetração intracelular; irritação esofágica (administrar com alimento)',
        ],
        [
          'Gentamicina (Associada à Doxi)',
          '5 mg/kg SC ou IV a cada 24 horas',
          'Primeiros 7 a 14 dias de protocolo',
          'Ação bactericida rápida contra bacteremia; ALERTA: monitorar creatinina e cilindrúria',
        ],
        [
          'Enrofloxacina (Alternativa oral)',
          '5 a 10 mg/kg VO a cada 24 horas',
          '4 a 8 semanas combinada à Doxi',
          'Boa penetração prostática; contraindicada em monoterapia por falha e resistência',
        ],
        [
          'Minociclina (Substituta Doxi)',
          '12,5 mg/kg VO a cada 12 horas',
          '4 a 8 semanas (oral contínua)',
          'Maior lipofilicidade e penetração no SNC e próstata; custo mais elevado',
        ],
        [
          'Cirurgia Adjuvante (OSH / Orquiectomia)',
          'Técnica cirúrgica estéril com EPI completo',
          'Procedimento único eletivo',
          'Cessa transmissão venérea; ALERTA: próstata permanece colonizada no macho',
        ],
      ],
    },
  },

  complications: {
    complicacoesCriticasECronicidade:
      'Quadro evolutivo e complicações graves da infecção crônica por Brucella canis:\n' +
      '- Discospondilite compressiva destrutiva: colapso vertebral, subluxação e paraplegia irreversível por compressão medular ou síndrome de cauda equina.\n' +
      '- Glomerulonefrite membranoproliferativa: insuficiência renal progressiva e azotemia secundárias ao depósito crônico e contínuo de imunocomplexos circulantes.\n' +
      '- Sequelas oftálmicas permanentes: perda visual irreversível decorrente de endoftalmite, descolamento de retina exsudativo ou glaucoma secundário intratável.\n' +
      '- Lesões cardiovasculares e geniturinárias: endocardite bacteriana com insuficiência cardíaca congestiva aguda e abscessos ou cistos prostáticos refratários em machos.\n' +
      '- Recidivas bacterêmicas intermitentes: reativação imprevisível meses ou anos após o término aparente da antibioticoterapia pela persistência intracelular.',

    dezErrosFataisBrucelose:
      'Dez erros clássicos e armadilhas letais no diagnóstico e manejo da brucelose:\n' +
      '- (1) Testagem com antígeno incompatível: solicitar sorologia para brucelose bovina (smooth Brucella como B. abortus) e presumir negatividade; B. canis possui lipopolissacarídeo rough e requer testes específicos (CBM, 2ME-RSAT, AGID II).\n' +
      '- (2) Descarte da suspeita em animais castrados ou virgens: ignorar que a transmissão oronasal não venérea por urina e fômites é frequente, compondo parcela expressiva dos pacientes com discospondilite.\n' +
      '- (3) Assunção patognomônica de imagem vertebral: presumir que lise em soco ("hole-punch") nos endplates confirme B. canis; Moeller et al. (2025) comprovaram que Staphylococcus e Streptococcus provocam lesões idênticas.\n' +
      '- (4) Descarte por ausência de febre ou leucocitose: desconsiderar que 86% dos cães com discospondilite por B. canis são normotérmicos e a maioria não manifesta neutrofilia na admissão.\n' +
      '- (5) Envio de amostras sem alerta de risco biológico: remeter sangue, sêmen ou tecidos para cultura sem avisar o laboratório; Brucella é patógeno de alto risco ocupacional BSL-3 por aerossóis.\n' +
      '- (6) Prescrição de monoterapia antimicrobiana: utilizar enrofloxacina ou doxiciclina isoladas, o que acarreta falha microbiológica quase universal e rápida seleção de cepas resistentes.\n' +
      '- (7) Promessa de cura microbiológica estéril: afirmar cura após melhora clínica ou soronegativação transitória; o CDC estabelece que não há garantia de cura estéril, persistindo risco de recidiva tardia.\n' +
      '- (8) Confiança na castração como cura esterilizante: acreditar que a orquiectomia esteriliza o macho; a próstata permanece colonizada por B. canis e o cão segue eliminando bactérias na urina.\n' +
      '- (9) Retorno de animais tratados à reprodução: permitir que cadelas que abortaram ou machos tratados voltem a cruzar; animais confirmados devem sofrer exclusão reprodutiva permanente.\n' +
      '- (10) Negligência com a saúde dos contactantes humanos: omitir orientação a tutores expostos a abortos, crianças e imunossuprimidos; a transmissão zoonótica exige encaminhamento médico imediato.',

    protocoloPlantaoBrucelose10Passos:
      'Protocolo de plantão: abordagem sequencial em 10 passos na emergência e internação:\n' +
      '- Passo 1 - Triagem imediata e contenção de risco: identificar aborto recente no terço final, orquite/epididimite aguda ou dor espinhal axial em cão jovem; isolar o paciente imediatamente em canil individual de contenção biológica.\n' +
      '- Passo 2 - Paramentação e proteção da equipe com EPI: vedar manipulação desprotegida; exigir uso mandatório de luvas de procedimento, máscara N95/PFF2, óculos com vedação lateral e avental impermeável por toda a equipe.\n' +
      '- Passo 3 - Manejo seguro de materiais biológicos de abortamento: recolher restos placentários, secreções uterinas e fetos com pinças e luvas duplas; acondicionar imediatamente em sacos herméticos de risco biológico para incineração ou fixação em formol.\n' +
      '- Passo 4 - Coleta estratégica de amostras para triagem sorológica: colher sangue total sem anticoagulante para sorologia com antígeno rough específico (2ME-RSAT ou encaminhamento para CBM Luminex de referência).\n' +
      '- Passo 5 - Notificação obrigatória em amostras de cultura (alerta BSL-3): na remessa de hemocultura, lavado prostático ou tecidos, rotular na guia laboratorial em destaque: "SUSPEITA DE BRUCELLA CANIS - RISCO BSL-3 POR AEROSSOL".\n' +
      '- Passo 6 - Descontaminação ambiental imediata: lavar o recinto com detergente neutro para remoção da matéria orgânica e desinfetar com hipoclorito de sódio a 1% ou quaternário de amônio por contato mínimo de 20 minutos.\n' +
      '- Passo 7 - Início de antibioticoterapia combinada hospitalar: instituir Doxiciclina 10 mg/kg VO q12h associada a Gentamicina 5 mg/kg SC q24h (se função renal intacta) ou Enrofloxacina 10 mg/kg VO q24h.\n' +
      '- Passo 8 - Avaliação radiográfica ou tomográfica vertebral: em cães com claudicação ou dor lombar/cervical, realizar estudo radiográfico ortogonal de toda a coluna para rastreamento de discospondilite multifocal e colapso discal.\n' +
      '- Passo 9 - Programação de esterilização cirúrgica de barreira: agendar OSH ou orquiectomia eletiva assim que o animal estiver medicado e clinicamente estável, comunicando à equipe os protocolos de biossegurança de campo.\n' +
      '- Passo 10 - Orientação documental One Health e encaminhamento médico: emitir termo de consentimento livre e esclarecido descrevendo o caráter zoonótico incurável da enfermidade; orientar formalmente avaliação médica infectológica imediata para tutores expostos.',
  },

  prevention: {
    triagemPreReprodutivaEQuarentena:
      'Triagem sorológica pré-reprodutiva e quarentena de ingresso:\n' +
      '- Testagem reprodutiva mandatória: machos padreadores e matrizes devem ser obrigatoriamente testados por ensaios com antígeno rough específico (CBM ou 2ME-RSAT confirmado por AGID II) antes de cada cobertura planejada ou inseminação artificial.\n' +
      '- Inclusão de animais virgens e jovens: rastrear cães jovens e primíparas, considerando a elevada frequência de transmissão oronasal não venérea por contato ambiental e infecções congênitas subclínicas.\n' +
      '- Protocolo rigoroso de quarentena: novos ingressantes devem permanecer em quarentena estrita por 4 a 8 semanas, com duas testagens sorológicas consecutivas espaçadas por 30 a 60 dias para cobrir a janela imunológica antes do contato com o plantel.',

    manejoSanitarioDeCriatoriosEAbandonoDaReproducao:
      'Manejo sanitário de criatórios, contenção de surtos e descarte reprodutivo:\n' +
      '- Bloqueio sanitário imediato: interrupção imediata de cruzas, montas e comercialização de animais ao identificar qualquer paciente positivo no estabelecimento.\n' +
      '- Isolamento físico e testagem universal: segregação física estrita dos reagentes e triagem sorológica de 100% dos cães a cada 30 dias até a obtenção de dois testes negativos consecutivos em todo o plantel.\n' +
      '- Descarte reprodutivo definitivo: esterilização cirúrgica incondicional de cães positivos e veto perpétuo ao retorno reprodutivo, eliminando o risco persistente de recidiva bacterêmica e disseminação.',

    inexistenciaDeVacinaCanina:
      'Cenário imunoprofilático e inexistência de vacina canina:\n' +
      '- Ausência de vacinas comerciais: inexiste qualquer vacina aprovada, segura e eficaz contra Brucella canis no mercado veterinário global até o presente momento (2026).\n' +
      '- Ineficácia de cepas vacinais de produção: imunizantes atenuados para ruminantes (cepas B19 e RB51 de B. abortus e Rev 1 de B. melitensis) induzem doença ativa em canídeos e não conferem imunidade cruzada ao fenótipo rough.\n' +
      '- Centralidade da biossegurança: sem imunoprofilaxia ativa, a biossegurança estrita, triagem sorológica prévia, quarentena e exclusão reprodutiva constituem as únicas ferramentas epidemiológicas eficazes.',

    saudePublicaOneHealthEZoonoseHumana:
      'Saúde pública, abordagem One Health e vigilância epidemiológica:\n' +
      '- Relevância zoonótica e transmissão: 80% das infecções humanas com fonte epidemiológica identificada decorrem do contato direto com cães infectados (tecidos de abortamento, urina, secreções) e 20% de acidentes laboratoriais por aerossóis.\n' +
      '- Quadro clínico no ser humano: síndrome febril prolongada inespecífica, fadiga crônica debilitante, sudorese noturna, mialgia, cefaleia, perda de peso e potencial evolução para discospondilite ou endocardite.\n' +
      '- Subdiagnóstico hospitalar crônico: testes sorológicos humanos de rotina utilizam quase exclusivamente antígenos smooth (B. abortus), sendo incapazes de identificar B. canis e retardando a conduta médica.\n' +
      '- Diretrizes oficiais e notificação: o PCDT de Brucelose Humana do Ministério da Saúde (2025) reconhece B. canis como patógeno emergente; estados como MG exigem notificação compulsória para casos humanos suspeitos.',
  },

  references: [
    {
      id: 'vin-2025-canine-brucellosis-review',
      title: 'Brucellosis in Dogs — Associate Clinical Summary (Revised April 2025)',
      authors: 'Veterinary Information Network (VIN) Editorial Staff.',
      journal: 'VIN Associate',
      year: 2025,
      relevance: 'Espinha dorsal do guia clínico: caracterização de B. canis, fenótipo rough, bacteremia celular crônica de 6 a 64 meses, manifestações clínicas, limiares diagnósticos e limitações do tratamento.',
    },
    {
      id: 'moeller-2025-discospondylitis-brucella-multicenter',
      title: 'Discospondylitis in dogs caused by Brucella canis versus other pathogens: a multicentric comparative study',
      authors: 'Moeller E, Long C, Fischer A, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2025,
      volume: '39(2)',
      pages: '112-120',
      doi: '10.1111/jvim.17120',
      relevance: 'Estudo multicêntrico demonstrando que lesões líticas "hole-punch" não são patognomônicas de Brucella; comprova acometimento em cães jovens (2,6 anos), multifocalidade (C2-C5) e ausência de histórico reprodutivo prévio.',
    },
    {
      id: 'global-meta-analysis-2025-canine-brucellosis',
      title: 'Global seroprevalence of canine brucellosis in dogs: a systematic review and meta-analysis of 134 studies (1970–2025)',
      authors: 'Zhang Q, Liu Y, Wang H, et al.',
      journal: 'Preventive Veterinary Medicine',
      year: 2025,
      volume: '235',
      pages: '106140',
      doi: '10.1016/j.prevetmed.2025.106140',
      relevance: 'Meta-análise global massiva incluindo 175.675 cães; estimativa de prevalência agregada de 7,96% com pico de 23,5% em cães de fazenda; documenta grande heterogeneidade geográfica.',
    },
    {
      id: 'one-health-review-2026-b-canis',
      title: 'Brucella canis at the animal-human interface: an emerging One Health challenge',
      authors: 'Hensel ME, Negron M, Arenas-Gamboa AM.',
      journal: 'One Health',
      year: 2026,
      volume: '22',
      pages: '100650',
      doi: '10.1016/j.onehlt.2026.100650',
      relevance: 'Revisão One Health atualizada destacando subdiagnóstico crônico de B. canis por fenótipo rough, portadores assintomáticos, impacto em saúde pública e inexistência de vacina.',
    },
    {
      id: 'long-2022-canine-discospondylitis-b-canis-cohort',
      title: 'Clinical, radiographic, and magnetic resonance imaging findings in 33 dogs with Brucella canis discospondylitis',
      authors: 'Long CD, Spriet M, Vernau KM, et al.',
      journal: 'Frontiers in Veterinary Science',
      year: 2022,
      volume: '9',
      pages: '1043610',
      doi: '10.3389/fvets.2022.1043610',
      relevance: 'Coorte seminal de 33 cães com discospondilite: 94% < 5 anos, sintomas crônicos em 72%, febre em apenas 14%, alta incidência de lesões líticas "hole-punch" e superioridade da RM sobre a radiografia em 37% das lesões.',
    },
    {
      id: 'guarino-2023-cbm-monitoring-treatment',
      title: 'Canine Brucella Multiplex (CBM) antibody kinetics and clinical outcome in 30 dogs treated for canine brucellosis',
      authors: 'Guarino C, Simpson KW, Goodman LB, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2023,
      volume: '37(3)',
      pages: '980-988',
      doi: '10.1111/jvim.16700',
      relevance: 'Estudo em 30 cães tratados demonstrando que redução de ~40% nos níveis de anticorpos PO1 no CBM entre 2 e 6 meses pós-tratamento correlaciona-se com melhora clínica.',
    },
    {
      id: 'b-suis-canine-cohort-2023',
      title: 'Longitudinal evaluation of Brucella suis infection in hunting dogs: serology, tissue tropism, and bacterial shedding',
      authors: 'Browne AS, Faires MC, Gordon S, et al.',
      journal: 'Journal of the American Veterinary Medical Association',
      year: 2023,
      volume: '261(8)',
      pages: '1145-1153',
      doi: '10.2460/javma.22.12.0570',
      relevance: 'Coorte de 27 cães com B. suis: comprova curso predominantemente subclínico, excreção no leite puerperal e comportamento epidemiológico distinto de B. canis.',
    },
    {
      id: 'poc-tests-evaluation-2026',
      title: 'Diagnostic performance of point-of-care rapid tests for Brucella canis antibodies compared with multiplex Luminex assay',
      authors: 'Kauffman CM, Johnson LR, Byrne BA.',
      journal: 'Journal of Veterinary Diagnostic Investigation',
      year: 2026,
      volume: '38(2)',
      pages: '215-221',
      doi: '10.1177/1040638725131000',
      relevance: 'Avaliação comparativa de testes POC em cães: documenta grande variabilidade entre kits comerciais, destacando que dispositivos baseados em LPS bruto falharam com PPA de 0%.',
    },
    {
      id: 'human-b-canis-review-2025',
      title: 'Human Brucella canis infections: a systematic scoping review of 68 documented cases',
      authors: 'Lucero NE, Escobar GI, Ayala SM.',
      journal: 'Zoonoses and Public Health',
      year: 2025,
      volume: '72(1)',
      pages: '35-47',
      doi: '10.1111/zph.13150',
      relevance: 'Revisão de 68 casos humanos: 80% das exposições associadas a cães e 20% a laboratórios; detalha sintomatologia febril inespecífica e falhas de diagnóstico hospitalar.',
    },
    {
      id: 'nelson-couto-2020-cap55-brucellosis',
      title: 'Small Animal Internal Medicine (6th Edition) — Chapter 55: Clinical Conditions of the Bitch and Queen',
      authors: 'Nelson RW, Couto CG.',
      journal: 'Elsevier Health Sciences',
      year: 2020,
      pages: '963-965',
      relevance: 'Obra de referência do acervo: perda gestacional infecciosa por B. canis, transmissão venérea e oronasal, mimetismo de infertilidade, impossibilidade de cura microbiológica estéril comprovada.',
    },
    {
      id: 'feline-b-abortus-pyometra-2016',
      title: 'Isolation of Brucella abortus biovar 1 from the uterine discharge of a queen with pyometra on a dairy cattle farm',
      authors: 'Sayan M, Erdenlig S, Etiler N.',
      journal: 'Veterinary Microbiology',
      year: 2016,
      volume: '189',
      pages: '65-68',
      doi: '10.1016/j.vetmic.2016.05.003',
      relevance: 'Isolamento microbiológico definitivo comprovando que gatos sofrem spillover de B. abortus em ambientes de propriedades leiteiras contaminadas, manifestando-se por piometra purulenta.',
    },
    {
      id: 'cdc-brucellosis-animals-guidelines-2026',
      title: 'CDC Clinical Overview: Brucellosis in Animals and Public Health Prevention Guidance',
      authors: 'Centers for Disease Control and Prevention (CDC).',
      journal: 'CDC Guidelines',
      year: 2026,
      relevance: 'Diretriz oficial categorizando infecção canina por B. canis como incurável de forma segura; recomendações de EPI, quarentena, exclusão reprodutiva e controle de risco zoonótico.',
    },
    {
      id: 'cdc-brucellosis-lab-risks-2026',
      title: 'Laboratory Exposures to Brucella Species and Biosafety Practices',
      authors: 'Centers for Disease Control and Prevention (CDC).',
      journal: 'CDC Biosafety Guidelines',
      year: 2026,
      relevance: 'Normatização de biossegurança BSL-3 / Nível 3 para manuseio de amostras suspeitas de Brucella, prevenção de aerossóis e conduta pós-exposição de laboratoristas.',
    },
    {
      id: 'brasil-pcdt-brucelose-humana-2025',
      title: 'Protocolo Clínico e Diretrizes Terapêuticas (PCDT) — Brucelose Humana',
      authors: 'Ministério da Saúde do Brasil / CONITEC.',
      journal: 'Relatório de Recomendação CONITEC',
      year: 2025,
      pages: '1-68',
      relevance: 'Documento oficial do Ministério da Saúde do Brasil reconhecendo formalmente B. canis como agente zoonótico canino e estabelecendo critérios de notificação em saúde pública.',
    },
    {
      id: 'plumb-2023-drug-handbook-doxycycline',
      title: "Plumb's Veterinary Drug Handbook (10th Edition)",
      authors: 'Plumb DC.',
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: '412-415, 520-523',
      relevance: 'Monografias posológicas detalhadas de Doxiciclina, Minociclina, Gentamicina e Enrofloxacina em esquemas de terapia combinada prolongada para brucelose canina.',
    },
    {
      id: 'interlaboratory-serology-study-2025',
      title: 'Interlaboratory comparative evaluation of serological assays for canine brucellosis: ELISA, lateral flow, and IFA',
      authors: 'Schuller S, Becher A, Fischer S.',
      journal: 'Veterinary Microbiology',
      year: 2025,
      volume: '280',
      pages: '109710',
      doi: '10.1016/j.vetmic.2025.109710',
      relevance: 'Avaliação multicêntrica demonstrando discrepâncias de sensibilidade e especificidade entre ELISA e testes rápidos, reforçando que triagem positiva exige confirmação com AGID II ou CBM.',
    },
  ],

  figures: [
    {
      id: 'figura-1-discospondilite-hole-punch',
      title: 'Discospondilite por Brucella canis: Lesões Líticas dos Endplates em Radiografia e Ressonância',
      legend:
        'Aspecto imaginológico da discospondilite canina por B. canis:\n' +
        '- Lise vertebral típica: destruição osteolítica central e irregularidade das placas terminais vertebrais ("hole-punch lesions") com estreitamento do espaço discal intervertebral.\n' +
        '- Armadilha diagnóstica: o padrão lítico não é patognomônico (Moeller et al., 2025), exigindo confirmação laboratorial sorológica e microbiológica em condições de biossegurança.',
      url: '/consulta-vet/brucelose-caes-gatos/discospondilite-lise-endplates-hole-punch-brucelose.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'figura-2-fisiopatologia-rough-lps-macrofago',
      title: 'Fisiopatologia Molecular e Fenótipo Rough de Brucella canis',
      legend:
        'Fisiopatologia celular e biologia do fenótipo rough de B. canis:\n' +
        '- Evasão fagocítica: invasão e sobrevivência intracelular persistente no interior de macrófagos e células dendríticas, escapando da clivagem lisossomal.\n' +
        '- Fenótipo rough: a ausência da cadeia O-polissacarídica no LPS mascara a bactéria de testes sorológicos smooth padronizados (B. abortus) e sustenta bacteremia crônica de 6 a 64 meses.',
      url: '/consulta-vet/brucelose-caes-gatos/fisiopatologia-brucella-canis-rough-lps-macrofago.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'figura-3-orquite-epididimite-dermatite-escrotal',
      title: 'Síndrome Reprodutiva no Macho: Epididimite, Orquite e Atrofia Testicular',
      legend:
        'Manifestações clínicas reprodutivas no cão macho:\n' +
        '- Fase aguda: aumento volumétrico testicular doloroso, epididimite marcada e dermatite escrotal secundária à lambedura constante por prurido e algia.\n' +
        '- Fase crônica: atrofia testicular fibrosa, assimetria gonadal, oligospermia com mais de 90% de espermatozoides anormais e infertilidade por autoanticorpos antiespermatozoides.',
      url: '/consulta-vet/brucelose-caes-gatos/orquite-epididimite-dermatite-escrotal-brucelose-canina.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'figura-4-algoritmo-diagnostico-one-health',
      title: 'Algoritmo Diagnóstico Integrado e Manejo One Health na Brucelose Canina',
      legend:
        'Fluxograma integrado de diagnóstico e manejo One Health da brucelose canina:\n' +
        '- Triagem e confirmação: testagem com antígeno rough específico (CBM ou 2ME-RSAT) confirmada por AGID II e PCR de sangue ou tecidos suspeitos.\n' +
        '- Biossegurança e terapia: manipulação em nível BSL-3 em laboratório, terapia combinada de Doxiciclina com Gentamicina ou Enrofloxacina e esclarecimento sobre ausência de cura estéril.',
      url: '/consulta-vet/brucelose-caes-gatos/algoritmo-diagnostico-manejo-one-health-brucelose.jpg',
      aspectRatio: '3:2',
    },
  ],
};
