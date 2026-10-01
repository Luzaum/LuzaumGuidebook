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
    'A brucelose canina é uma enfermidade infecciosa zoonótica, crônica e insidiosa provocada predominantemente por Brucella canis, um cocobacilo Gram-negativo intracelular facultativo caracterizado por um fenótipo de lipopolissacarídeo rugoso (rough LPS) sem a cadeia O-polissacarídica clássica. Essa particularidade estrutural determina que os testes sorológicos convencionais projetados para Brucella lisa (smooth, como B. abortus e B. melitensis) falhem em identificar a infecção em cães e humanos. Embora classicamente reconhecida como causa de abortamentos no terço final da gestação (45 a 60 dias), natimortos, epididimite, orquite e atrofia testicular, B. canis frequentemente acomete animais sem histórico reprodutivo, castrados e virgens. A discospondilite — tipicamente multifocal, em cães jovens (mediana 2,5 anos) e sem febre ou leucocitose — representa a manifestação extra-reprodutiva mais comum. Estudos recentes (Moeller et al., 2025) desmistificaram o padrão radiográfico de lesões em soco ("hole-punch"), comprovando que ele não é patognomônico de Brucella. O diagnóstico requer a combinação de sorologia específica para antígeno rough (CBM, 2ME-RSAT, AGID II), PCR e cultura bacteriológica, sendo imperativo notificar o laboratório previamente devido ao elevado risco de infecção ocupacional por aerossol (nível de biossegurança BSL-3). O CDC e diretrizes internacionais ressaltam que não existe protocolo terapêutico que garanta cura microbiológica estéril: a terapia combinada (Doxiciclina associada a Gentamicina ou Enrofloxacina) e a castração controlam os sinais clínicos e diminuem a bacteremia, porém o microrganismo persiste em sítios protegidos (próstata, baço, osso e olho), impondo quarentena permanente, afastamento definitivo da reprodução e vigilância One Health contínua.',

  quickDecisionStrip: [
    'Fenótipo rough: testes sorológicos para Brucella smooth (bovina/suína) NÃO detectam Brucella canis.',
    'Discospondilite em cães jovens e afebris exige investigação etiológica mesmo em animais castrados.',
    'Avisar obrigatoriamente o laboratório antes de enviar amostras para cultura devido ao risco BSL-3.',
    'A resposta clínica favorável e a queda nos títulos sorológicos NÃO comprovam esterilização tecidual.',
    'A castração reduz a eliminação ambiental, mas a próstata e o baço continuam albergando a bactéria.',
  ],

  quickSummaryRich: {
    lead:
      'A brucelose canina é uma zoonose bacteriana de curso arrastado cuja biologia intracelular e fenótipo rough desafiam o diagnóstico laboratorial comum. Cães castrados e assintomáticos podem atuar como portadores crônicos e transmissores ativos por anos.',
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
          'B. canis carece da cadeia O-polissacarídica (O-PS) do LPS presente nas espécies smooth (B. abortus, B. suis, B. melitensis). Ensaios sorológicos exigem antígenos rough específicos (CBM, 2ME-RSAT, CPAg-AGID II). Testes para brucelose de ruminantes são inúteis.',
      },
      {
        title: 'Mimetismo Clínico: Discospondilite e Portadores Assintomáticos',
        body:
          'A discospondilite canina afeta cães jovens (< 5 anos, mediana de 2,5 anos) com curso crônico (> 3 meses de dor axial), em sua maioria afebris (86%) e sem leucocitose. O padrão lítico "hole-punch" em endplates sugere B. canis, mas ocorre em outras infecções (Moeller et al., 2025).',
      },
      {
        title: 'Risco Ocupacional e Biossegurança Laboratorial BSL-3',
        body:
          'A manipulação de fluidos fetais (10¹⁰ bactérias/mL), urina de machos (10³ a 10⁶/mL) e culturas microbiológicas oferece risco extremo de aerossolização para médicos-veterinários e microbiologistas. O envio de amostras requer alerta prévio compulsório ao laboratório.',
      },
      {
        title: 'Manejo One Health e Realidade Terapêutica sem Cura Estéril',
        body:
          'O CDC e os consensos internacionais estabelecem que nenhum regime antimicrobiano elimina com segurança B. canis do organismo. Cães tratados permanecem sob risco de recidiva e transmissão silenciosa, exigindo exclusão reprodutiva definitiva e cautela com humanos imunocomprometidos.',
      },
    ],

    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico Sequencial na Suspeita de Brucelose Canina',
      steps: [
        {
          label: 'Passo 1 — Triagem Clínica, Fatores de Risco e EPI Imediato',
          detail:
            'Identificar histórico de abortamento tardio (45-60 dias), descargas vaginais escuras, epididimite/orquite, discospondilite juvenil multifocal ou infertilidade em canis. Adotar imediatamente luvas, avental e proteção facial completa.',
          timing: 'Minuto 0',
          limitations: 'Cães castrados, virgens e clinicamente normais podem estar cronicamente infectados.',
        },
        {
          label: 'Passo 2 — Triagem Sorológica com Antígeno Rough Específico',
          detail:
            'Colher soro e realizar triagem rápida específica para B. canis via 2ME-RSAT (soro tratado com 2-mercaptoetanol para inativar IgM inespecífica) ou Canine Brucella Multiplex (CBM - Cornell University).',
          timing: 'Hora 1 a 24',
          limitations: 'Janela imunológica de 3 a 12 semanas pós-infecção; falso-negativos em fases muito precoces.',
        },
        {
          label: 'Passo 3 — Confirmação Sorológica Específica (AGID II / CPAg)',
          detail:
            'Amostras reagentes ou suspeitas na triagem devem ser obrigatoriamente submetidas à Imunodifusão em Gel de Ágar utilizando antígeno citoplasmático interno (CPAg-AGID II), método de altíssima especificidade (~100%).',
          timing: 'Dia 2 a 5',
          limitations: 'Pode levar até 8 a 12 semanas pós-infecção para positivação; não descarta fase inicial.',
        },
        {
          label: 'Passo 4 — Diagnóstico Direto por PCR e Cultura com Notificação BSL-3',
          detail:
            'Coletar sangue total com EDTA, sêmen, raspado vaginal, tecido abortado ou aspirado de endplate para PCR e cultura em ágar Brucella/sangue. Notificar o laboratório em destaque vermelho: "SUSPEITA DE BRUCELLA — RISCO BSL-3".',
          timing: 'Dia 3 a 14',
          limitations: 'Bacteremia intermitente; antibioticoterapia prévia inibe o crescimento na cultura.',
        },
        {
          label: 'Passo 5 — Avaliação de Lesões Extrarreprodutivas e One Health',
          detail:
            'Realizar radiografias vertebrais e ressonância magnética nos cães com dor axial (pesquisa de discospondilite multifocal), exame oftálmico com lâmpada de fenda (rastreio de uveíte) e notificar a vigilância em saúde se houver exposição humana.',
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
            'Segregar imediatamente o animal infectado de outros cães e de indivíduos vulneráveis (gestantes, crianças, imunossuprimidos). Cancelar coberturas e emitir termo de ciência ao tutor sobre o caráter zoonótico e a ausência de cura microbiológica estéril garantida.',
          timing: 'Imediato',
          limitations: 'Desafio emocional e financeiro para tutores e criadores comerciais.',
        },
        {
          label: 'Fase 2 — Antibioticoterapia Combinada de Primeira Linha',
          detail:
            'Iniciar regime sinérgico: Doxiciclina (5 a 10 mg/kg VO a cada 12 horas por 4 a 8 semanas, podendo atingir 12 semanas em discospondilite) associada à Gentamicina (5 mg/kg SC a cada 24 horas por 7 a 14 dias com monitoramento de função renal e urinálise).',
          timing: 'Semanas 1 a 8',
          limitations: 'Risco de nefrotoxicidade por aminoglicosídeos; monoterapia é formalmente contraindicada.',
        },
        {
          label: 'Fase 3 — Regime Alternativo Oral em Casos de Nefropatia ou Falha',
          detail:
            'Quando aminoglicosídeos forem inviáveis por azotemia ou idade: Doxiciclina (10 mg/kg VO q12h) associada a Enrofloxacina (5 a 10 mg/kg VO q24h) ou Minociclina (12,5 mg/kg VO q12h) por 6 a 12 semanas consecutivas.',
          timing: 'Semanas 2 a 12',
          limitations: 'Falhas terapêuticas e seleção de resistência bacteriana com fluoroquinolonas.',
        },
        {
          label: 'Fase 4 — Intervenção Cirúrgica com Paramentação Completa (EPI)',
          detail:
            'Proceder à esterilização cirúrgica (OSH em fêmeas e orquiectomia em machos) sob condições de máxima biossegurança (luvas duplas, máscara N95 e óculos). A cirurgia remove fontes importantes de secreção genital, embora não elimine a colonização da próstata ou baço.',
          timing: 'Após estabilização inicial',
          limitations: 'Castração não esteriliza a infecção e o macho continua eliminando bactérias na urina.',
        },
        {
          label: 'Fase 5 — Monitoramento Clínico-Sorológico Longitudinal e Vigilância Vitalícia',
          detail:
            'Reavaliar clinicamente, realizar dosagem quantitativa de anticorpos (CBM / 2ME-RSAT) a cada 2 a 3 meses e repetir PCR. Considera-se melhora clínica satisfatória a redução de ~40% nos títulos de CBM PO1 aos 2-6 meses pós-tratamento, mantendo testagem periódica.',
          timing: 'A cada 3 a 6 meses por 2 anos',
          limitations: 'Soronegativação temporária não comprova eliminação; recaídas tardias são frequentes.',
        },
      ],
    },
  },

  etiology: {
    taxonomiaEBiologiaDeBrucella:
      'O gênero Brucella pertence à família Brucellaceae (ordem Hyphomicrobiales, classe Alphaproteobacteria) e é constituído por pequenos cocobacilos Gram-negativos, imóveis, não esporulados, não capsulados, aeróbios estritos ou microaerofílicos, intracelulares facultativos de crescimento relativamente lento em meios convencionais. Na espécie canina, o principal agente etiológico adaptado e amplamente disseminado é a Brucella canis. Contudo, os cães são suscetíveis à infecção cruzada (spillover) por outras espécies clássicas do gênero, particularmente Brucella suis (biovares 1 e 3, frequente em cães de caça e animais com acesso a carcaças de javalis e suínos ferais), Brucella abortus (adquirida em propriedades leiteiras pela ingestão de leite cru, restos placentários e carcaças bovinas) e, mais raramente, Brucella melitensis (associada a caprinos e ovinos). Essa diversidade etiológica evidencia que o termo clínico "brucelose canina" não é taxonomicamente restrito a B. canis, influenciando de maneira direta a escolha dos testes diagnósticos laboratoriais.',

    fenotipoRoughVsSmoothEImplicacoes:
      'A membrana externa das bactérias Gram-negativas possui em sua superfície o lipopolissacarídeo (LPS), molécula constituída pelo lipídeo A, um cerne polissacarídico (core) e uma cadeia distal denominada antígeno O ou cadeia O-polissacarídica (O-PS). As espécies clássicas do gênero (B. abortus, B. melitensis e B. suis) expressam um LPS fenotipicamente liso (smooth), provido de cadeia O-PS longa e imunodominante, contra a qual se desenvolvem os principais anticorpos neutralizantes e os testes sorológicos padronizados em humanos e animais de produção. Em marcante contraste, a Brucella canis (juntamente com B. ovis em ovinos) possui um fenótipo natural permanentemente rugoso (rough LPS), caracterizado pela ausência quase completa da cadeia O-PS, expondo proteínas de membrana externa e antígenos centrais do core lipopolissacarídico. Essa discrepância molecular tem repercussões clínicas e diagnósticas profundas: os testes sorológicos convencionais formulados com antígenos lisos de B. abortus falham categoricamente em detectar anticorpos contra B. canis, gerando resultados falso-negativos sistemáticos. Ensaios específicos baseados em antígenos rugosos (CBM, 2ME-RSAT, AGID II com CPAg) são indispensáveis para o rastreio da afecção canina.',

    outrasEspeciesDeBrucellaEmCaesEGatos:
      'A infecção de cães por Brucella suis tem despertado atenção sanitária crescente em decorrência da expansão global das populações de suínos ferais (javalis e javaporcos) e da popularização da caça esportiva e de dietas cruas (BARF) à base de carne suína não inspecionada. Uma coorte longitudinal publicada em 2023 acompanhou 27 cães de caça soropositivos para B. suis: a maioria permaneceu assintomática durante todo o seguimento, com manifestações clínicas intermitentes em apenas 10 animais, persistência de títulos sorológicos elevados por longos períodos e detecção da bactéria no leite de fêmeas lactantes ao redor do parto. Em relação aos felinos domésticos, a literatura médica confirma que o gato é naturalmente refratário à Brucella canis, não constituindo reservatório epidemiológico conhecido da doença. Entretanto, infecções ocasionais por spillover de Brucella abortus foram inequivocamente documentadas, destacando-se o isolamento microbiológico de B. abortus biovar 1 a partir do corrimento uterino de uma gata apresentando piometra aberta em propriedade rural leiteira contaminada (PubMed ID 27307391).',

    resistenciaFisicoQuimicaEDesinfeccao:
      'Diferentemente de bactérias ambientais esporuladas como Clostridium tetani, os microrganismos do gênero Brucella apresentam resistência física e ambiental moderada. B. canis é prontamente inativada pelo calor úmido (autoclavagem a 121°C por 15 minutos), calor seco (160°C por 1 hora), radiação ultravioleta e exposição à dessecação e luz solar direta. Os desinfetantes químicos hospitalares e de uso veterinário comuns — incluindo hipoclorito de sódio a 0,5%–1%, compostos de amônio quaternário, álcool etílico a 70%, iodóforos e soluções de glutaraldeído — são altamente eficazes para descontaminação de superfícies inanimadas e canis, desde que haja prévia remoção mecânica exaustiva de matéria orgânica (sangue, urina, fezes e placentas), cuja presença protege as bactérias e neutraliza a ação química germicida. No entanto, dentro dos macrófagos do hospedeiro mamífero e em tecidos protegidos, a bactéria exibe longevidade biológica formidável.',

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
      'A percepção histórica de que a brucelose canina constituía uma afecção restrita a canis comerciais de reprodução foi completamente refutada pela literatura epidemiológica moderna. Em vasta revisão sistemática e meta-análise global reunindo 134 estudos publicados entre 1970 e 2025 com uma amostragem acumulada de 175.675 cães (PubMed ID 41098548), estimou-se uma soroprevalência global agregada de 7,96% (IC 95%: 6,48%–9,61%). Os autores ressaltaram, contudo, a existência de extrema heterogeneidade metodológica, geográfica e temporal entre os estudos incluídos, enfatizando que esse percentual agregado não reflete a prevalência pontual de uma clínica específica. Cães domiciliados em áreas rurais ou em propriedades agrícolas apresentaram prevalência combinada expressivamente mais elevada (cerca de 23,5%), atribuída ao contato íntimo com carcaças, abortamentos animais e manejo sanitário precário. B. canis figurou como a espécie predominante em todas as regiões biogeográficas pesquisadas.',

    cenarioEpidemiologicoBrasileiro:
      'No Brasil, Brucella canis circula ativamente em populações caninas urbanas e rurais, embora não haja um inquérito epidemiológico sorológico nacional contemporâneo unificado que permita estabelecer uma taxa de prevalência fidedigna para os animais de companhia. Levantamentos seccionais em centros de controle de zoonoses, abrigos de resgate e comunidades litorâneas ou periurbanas revelam soropositividades variáveis entre 1,5% e 15%, na dependência direta da densidade populacional, do status reprodutivo dos animais e dos métodos sorológicos empregados. Estudo recente conduzido em comunidades caiçaras brasileiras identificou anticorpos anti-B. canis em 2% dos cães avaliados (3/148), todos com PCR sanguínea negativa no momento da colheita, demonstrando a presença silenciosa do agente e o risco constante de transmissão ocupacional e doméstica.',

    particularidadesFelinasERaridadeDaInfeccao:
      'A espécie felina possui resistência inata acentuada à colonização por Brucella canis. Ensaios experimentais antigos demonstraram que gatos inoculados por vias parenterais ou orais desenvolvem títulos baixos e transitórios de anticorpos, com bacteremia fugaz e sem manifestação de doença reprodutiva ou ortopédica clinicamente aparente. Na rotina clínica global, a brucelose natural por B. canis em gatos não configura uma entidade sindrômica estabelecida. Entretanto, infecções por outras espécies do gênero via contaminação ambiental massiva ocorrem esporadicamente: o isolamento microbiológico de Brucella abortus biovar 1 em gata com piometra purulenta (descrito por pesquisadores em propriedade com histórico de abortamento bovino) ilustra que, diante de gatas com piometra ou peritonite em áreas rurais endêmicas para brucelose bovina, a etiologia por Brucella deve figurar no diagnóstico diferencial.',

    desmistificacaoDoPerfilDoPaciente:
      'O perfil clínico dos pacientes caninos acometidos por brucelose sofreu uma transformação radical nas últimas décadas. Anteriormente suspeitada apenas em matrizes reprodutoras com histórico de aborto tardio ou padreadores com orquite, B. canis é atualmente diagnosticada com frequência crescente em cães resgatados de abrigos, animais de companhia esterilizados (castrados cirurgicamente há meses ou anos) e cães jovens sem qualquer histórico de atividade reprodutiva prévia. O estudo multicêntrico de Moeller et al. (2025) avaliando cães com discospondilite por B. canis demonstrou que nenhum dos animais examinados havia sido utilizado para reprodução ou habitava canil comercial, evidenciando que a transmissão não venérea (oronasal por urina, fômites ou infecção congênita subclínica) responde por uma parcela substancial dos casos clínicos atendidos na rotina hospitalar.',

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
      'A transmissão de Brucella canis ocorre por múltiplas vias biológicas, não se limitando ao contato sexual durante a cópula. As principais portas de entrada no hospedeiro suscetível são as mucosas oral, nasal, conjuntival e genital (vaginal ou prepucial), além de soluções de continuidade cutâneas e abrasões. A transmissão venérea permanece altamente eficiente através da penetração de microrganismos viáveis presentes no fluido seminal e secreções prostáticas durante o coito ou por inseminação artificial com sêmen fresco ou congelado infectado. Contudo, a via oronasal não venérea assume papel determinante na disseminação populacional: cães sadios adquirem a infecção ao lamber ou cheirar genitálias de animais infectados, fetos abortados, placentas, lóquios puerperais e urina contaminada. A transmissão vertical transplacentária é comum, resultando em abortamento, natimortos ou nascimento de filhotes bacteriêmicos que transmitem a infecção através da amamentação pelo leite materno.',

    cargasBacterianasEMateriaisDeAltoRisco:
      'A concentração bacteriana varia drasticamente conforme o tecido ou secreção biológica envolvida, ditando o nível de risco ocupacional e zoonótico. Os materiais associados à reprodução feminina contêm a carga bacteriana mais devastadora: a placenta, os envoltórios fetais, os tecidos dos conceptos abortados e as descargas vaginais pós-aborto atingem concentrações massivas de até 10¹⁰ organismos viáveis por mililitro (10 bilhões de bactérias/mL), persistindo a eliminação vaginal por 1 a 6 semanas após o evento obstétrico. No macho, o ejaculado seminal fresco e as secreções prostáticas albergam entre 10⁶ e 10⁸ bactérias/mL nos primeiros meses pós-infecção. A urina de machos e fêmeas infectados constitui uma fonte contínua de contaminação ambiental, contendo entre 10³ e 10⁶ organismos/mL, sendo a eliminação urinária do macho particularmente persistente em virtude da colonização crônica da glândula prostática.',

    mecanismoDeInvasaoESobrevivenciaIntracelular:
      'Após o contato com a superfície mucosal, B. canis penetra a barreira epitelial através de transcitose por células M ou através de microlesões, sendo imediatamente fagocitada por macrófagos residentes e células dendríticas subepiteliais. Ao contrário da maioria das bactérias piogênicas, Brucella canis possui mecanismos moleculares especializados de evasão imune intracelular: ela impede a fusão fagolisossômica precoce, neutraliza o estresse oxidativo intrafagossômico e direciona o vacúolo contendo a bactéria (Brucella-containing vacuole - BCV) para o retículo endoplasmático rugoso celular, convertendo-o em um nicho replicativo protegido. Essa sobrevivência no interior dos macrófagos e monócitos protege o microrganismo da ação de anticorpos séricos circulantes, do sistema complemento e de antimicrobianos hidrofílicos que apresentam baixa penetração intracelular.',

    bacteremiaCronicaETropismoTecidual:
      'A partir dos sítios de invasão primária, os monócitos infectados migram através dos vasos linfáticos aferentes até os linfonodos regionais, onde ocorre proliferação bacteriana e consequente linfadenomegalia. Subsequentemente, o microrganismo ganha o ducto torácico e a corrente circulatória, deflagrando uma bacteremia associada a leucócitos que se inicia entre 1 e 4 semanas após a infecção e persiste de forma contínua ou intermitente por períodos prolongados, variando de 6 a 64 meses (mediana de 1 a 2 anos). Durante essa fase bacteriêmica persistente, a bactéria dissemina-se para órgãos do sistema mononuclear fagocitário (baço e fígado) e exibe tropismo acentuado por tecidos ricos em esteroides sexuais e eritritol (útero, placenta, epidídimo, testículo e próstata) e sítios anatômicos com circulação terminal (discos intervertebrais, câmaras oculares, glomérulos renais e meninges).',

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
      'A discospondilite representa a complicação extra-reprodutiva mais destrutiva da infecção por Brucella canis. Sua gênese decorre da semeadura hematógena durante as ondas de bacteremia crônica: os capilares metafisários que irrigam as placas terminais cartilaginosas vertebrais (endplates) apresentam microarquitetura vascular terminal e sinuosa, caracterizada por fluxo sanguíneo lento e desprovida de colaterais anastomóticas robustas. Esse leito capilar predispõe à impactação de monócitos infectados e microtrombos bacterianos. A proliferação bacteriana local desencadeia osteomielite focal, reabsorção óssea osteoclástica e lise necrótica dos endplates vertebrais com invasão secundária do disco intervertebral avascular adjacente. Com a cronificação do processo, ocorre esclerose óssea reativa marginal, proliferação osteofítica vertebral compensatória e colapso do espaço discal, podendo haver proliferação inflamatória do tecido mole epidural e compressão mecânica de raízes nervosas e da medula espinhal.',

    fisiopatologiaDoAbortamentoEPlacentite:
      'Nas fêmeas gestantes, a presença de eritritol e hormônios esteroides nos tecidos uteroplacentários atua como potente quimiotático e fator estimulante de replicação para B. canis. Entre o 30º e o 45º dia de gestação, a invasão maciça do trofoblasto placentário induz vasculite necrosante, trombose dos vasos coriônicos e placentite exsudativa difusa. A necrose dos vilos placentários compromete o intercâmbio de oxigênio e nutrientes entre a mãe e os fetos, deflagrando isquemia fetal, hipóxia grave e morte fetal intrauterina. Como resultado, os conceptos sofrem autólise asséptica e maceração antes da expulsão, sendo expelidos tipicamente entre o 45º e o 60º dia de gestação, acompanhados de membranas fetais espessadas, acastanhadas e friáveis. Perdas embrionárias antes do 30º dia manifestam-se clinicamente como reabsorção fetal assintomática, mimetizando falhas de concepção.',

    patologiaReprodutivaMasculinaEAnticorposAntiesperma:
      'No macho reprodutor, B. canis coloniza precocemente os túbulos seminíferos, epidídimos e glândulas prostáticas. A replicação bacteriana nas células de Sertoli e no epitélio tubular deflagra orquite e epididimite necrosante com infiltrado linfo-histiocitário intenso. O edema tecidual agudo e o aumento da pressão intratesticular provocam isquemia, degeneração tubular e ruptura da barreira hematotesticular imunologicamente privilegiada. O extravasamento de antígenos espermáticos maduros para o estroma vascular expõe essas proteínas ao reconhecimento pelo sistema imunológico do cão, deflagrando a síntese de autoanticorpos antiespermatozoides e reações de hipersensibilidade celular retardada. Esse processo autoimune secundário agrava a aglutinação espermática, a perda de motilidade e a destruição celular, culminando em atrofia testicular bilateral fibrótica e azoospermia irreversível.',

    glomerulonefritePorImunocomplexosEUveite:
      'A persistência prolongada de antígenos bacterianos na circulação sanguínea durante os meses ou anos de bacteremia crônica estimula a síntese contínua de imunoglobulinas, gerando hiperglobulinemia marcante e a formação crônica de imunocomplexos circulantes solúveis (antígeno B. canis-anticorpo IgG/IgM). Esses complexos macromoleculares precipitam-se passivamente na membrana basal glomerular renal e no endotélio fenestrado dos capilares do trato uveal ocular. No rim, a fixação de complemento promove glomerulonefrite membranoproliferativa por imunocomplexos, manifestada clinicamente por proteinúria persistente, elevação da razão proteína:creatinina urinária (UPC) e risco de progressão para doença renal crônica. No globo ocular, a deposição inflamatória e a vasculite imune provocam uveíte anterior recidivante, infiltração celular da câmara anterior, precipitados ceráticos, coriorretinite e glaucoma secundário.',
  },

  clinicalSignsPathophysiology: {
    sindromeReprodutivaNaCadela:
      'Na fêmea canina, o abortamento espontâneo entre 45 e 60 dias de gestação (terço final) constitui o sinal clássico e mais conspícuo da enfermidade. Os fetos abortados apresentam-se caracteristicamente autolisados, macerados e envolvidos por membranas placentárias verde-escuras ou acastanhadas. O aborto é invariavelmente seguido por uma descarga vaginal persistente, mucoide a mucopurulenta, de coloração verde-acinzentada ou hemorrágica escura, que perdura por 1 a 6 semanas sem odor fétido pronunciado. Perdas gestacionais mais precoces manifestam-se clinicamente como morte embrionária e reabsorção fetal, levando o tutor a relatar apenas "falha de concepção" ou infertilidade aparente. Filhotes que sobrevivem a termo frequentemente nascem mortos (natimortos) ou debilitados, sucumbindo nas primeiras 48 a 72 horas de vida com bacteremia fulminante. Ponto clínico crucial: as cadelas acometidas mantêm ciclos estrais perfeitamente regulares e conservam apetite e atitude normais, não apresentando febre ou toxicidade sistêmica na maioria dos casos.',

    sindromeReprodutivaNoMacho:
      'No macho, a fase inicial da afecção manifesta-se por epididimite e orquite agudas, unilaterais ou bilaterais, acompanhadas de aumento volumétrico escrotal doloroso, calor local, marcha rígida em abdução e dermatite escrotal úmida severa induzida por lambedura incessante pelo animal. Com a evolução subaguda e crônica (semanas a meses pós-infecção), a inflamação cede e os testículos sofrem degeneração fibrosa progressiva, tornando-se pequenos, firmes, irregulares e atróficos. A prostatite crônica bacteriana é frequente, podendo ser assintomática ou provocar disúria, tenesmo fecal e hematúria intermitente. O espermograma revela deterioração drástica da qualidade seminal a partir da 5ª semana pós-infecção, com > 90% de anomalias morfológicas (cabeças destacadas, caudas dobradas, gotas citoplasmáticas), presença de leucócitos no ejaculado e aglutinação espermática massiva por autoanticorpos, culminando em infertilidade permanente.',

    manifestacoesOsteoarticularesEDiscospondilite:
      'A discospondilite representa a apresentação não reprodutiva mais comum e desafiadora de B. canis, afetando predominantemente cães jovens com menos de 5 anos de idade (mediana de 2,5 anos). Os pacientes manifestam dor axial vertebral crônica e progressiva (duração média superior a 3 meses antes do diagnóstico), hiperestesia severa à palpação da coluna espinhal, relutância em pular, subir escadas ou levantar-se, postura cifótica e marcha em passos curtos e rígidos. Se houver compressão medular ou de raízes nervosas por osteófitos, colapso de vértebras ou tecido de granulação, surgem déficits neurológicos proprioceptivos, paresia ambulatória ou não ambulatória e síndrome da cauda equina (quando acomete a junção L7-S1). O envolvimento dos espaços discais cervicais (C2-C5) e a multiplicidade de focos vertebrais são significativamente mais frequentes na discospondilite por B. canis do que em outras etiologias bacterianas (Moeller et al., 2025). Artrite séptica não erosiva e osteomielite de ossos longos também podem ocorrer.',

    manifestacoesOcularesECardiovasculares:
      'As repercussões oculares surgem por invasão direta de bactérias viáveis ou pela deposição de imunocomplexos circulantes no trato uveal, podendo atuar como sítio santuário para recidivas tardias pós-tratamento. Os achados incluem uveíte anterior (blefarospasmo, fotofobia, hiperemia conjuntival, miose, flare aquoso e hipópio), coriorretinite focal ou difusa, precipitados ceráticos em vidro despolido, hifema espontâneo, descolamento seroso de retina, neurite óptica e desenvolvimento de glaucoma secundário doloroso com buftalmia. No aparelho cardiovascular, a endocardite infecciosa bacteriana é uma complicação rara, porém fatal, instalando-se preferencialmente sobre a valva aórtica ou mitral em cães com bacteremia crônica prolongada, caracterizada por sopros cardíacos de início recente, febre flutuante e arritmias, cujas hemoculturas laboratoriais de rotina costumam resultar falsamente estéreis se o microbiologista não for avisado para cultivar Brucella.',

    manifestacoesSistemicasEAssintomaticas:
      'Uma proporção expressiva de cães infectados por B. canis permanece assintomática ou oligossintomática por longos períodos de tempo, mantendo-se perfeitamente alertas, ativos e eutróficos enquanto disseminam ativamente o microrganismo para o ambiente e para outros animais. Quando presentes, os sinais sistêmicos são inespecíficos e insidiosos: linfadenomegalia generalizada indolor (com predileção pelos linfonodos retrofaríngeos, pré-escapulares e poplíteos), hepatoesplenomegalia discreta a moderada, perda de peso crônica, letargia moderada e relutância ao exercício. Febre verdadeira é marcadamente infrequente na brucelose canina (presente em apenas 14% dos cães com discospondilite no estudo de Long et al., 2022), contrastando com a apresentação clássica da brucelose aguda em seres humanos.',
  },

  diagnosis: {
    desafiosDiagnosticosELimitesDosTestesIsolados:
      'O diagnóstico da brucelose canina é amplamente reconhecido como um dos mais complexos da infectologia de pequenos animais. A literatura contemporânea (Nelson & Couto 6ª ed.; VIN 2025) e as diretrizes internacionais enfatizam que nenhum teste diagnóstico isolado (sorológico, molecular ou microbiológico) detém acurácia perfeita capaz de descartar ou confirmar a afecção com 100% de sensibilidade e especificidade em uma única colheita. Os títulos de anticorpos oscilam significativamente ao longo das fases de cronicidade; a bacteremia é intermitente; o uso prévio de antimicrobianos suprime a carga bacteriana circulante; e diferentes metodologias diagnósticas detectam antígenos e imunoglobulinas distintos. Dessa forma, a investigação clínica exige uma abordagem multimodal articulando anamnese epidemiológica, triagem sorológica com antígeno rough, testes confirmatórios de alta especificidade e pesquisa direta por PCR e cultura bacteriana.',

    sorologiaParaBrucellaCanisRough:
      'A sorologia constitui o pilar primário de triagem populacional e clínica. O teste rápido de aglutinação em lâmina (RSAT - Rapid Slide Agglutination Test) é uma ferramenta rápida e acessível, porém vulnerável a reações cruzadas e resultados falso-positivos em decorrência de anticorpos inespecíficos direcionados contra Bordetella bronchiseptica, Pseudomonas aeruginosa e Staphylococcus spp. Para elevar sua especificidade, desenvolveu-se o 2ME-RSAT, no qual o soro é tratado previamente com 2-mercaptoetanol para desnaturar as pontes dissulfeto de IgM inespecíficas, preservando apenas as aglutininas IgG específicas. O teste de Imunodifusão em Gel de Ágar com antígeno proteico citoplasmático solúvel (CPAg-AGID II) representa o ensaio confirmatório de escolha: sua especificidade aproxima-se de 100%, pois o antígeno citoplasmático é compartilhado entre Brucella spp., mas não reage com os anticorpos cruzados de membrana de outras bactérias; contudo, sua sensibilidade é moderada (~50%–60%) e a soroconversão pode demandar de 8 a 12 semanas pós-infecção.',

    canineBrucellaMultiplexCbmCornell:
      'O Canine Brucella Multiplex (CBM), padronizado e validado pelo Animal Health Diagnostic Center da Cornell University, desponta atualmente como o teste sorológico de maior refinamento tecnológico para B. canis. O CBM emprega tecnologia de microesferas fluorescentes magnéticas (Luminex) para detectar simultaneamente anticorpos contra dois antígenos proteicos recombinantes altamente específicos: BP26 (proteína de membrana externa de 26 kDa) e PO1 (proteína bacteriana interna). Essa formulação supera a dependência clássica do LPS rugoso, conferindo sensibilidade analítica superior a 95% e alta especificidade. Além de sua acurácia diagnóstica inicial, o CBM é quantitativo: o monitoramento seriado dos níveis de anticorpos contra PO1 revela que uma redução de aproximadamente 40% nas intensidades de fluorescência entre 2 e 6 meses pós-tratamento associa-se intimamente com remissão clínica e redução de carga bacterêmica (Guarino et al., 2023).',

    testesRapidosPointOfCarePoc2026:
      'A utilização de dispositivos de fluxo lateral rápidos point-of-care (POC) em clínicas e abrigos veterinários expandiu-se intensamente nos últimos anos. No entanto, estudo comparativo independente publicado em 2026 avaliando kits comerciais frente a amostras confirmadas por cultura e CBM demonstrou que a escolha da plataforma é determinante para a segurança clínica. Dispositivos baseados em antígenos proteicos ou preparações celulares específicas (como Anigen Rapid C. Brucella Ab e FASTest Brucella canis) demonstraram excelente concordância percentual positiva (PPA de 90% a 100%) e negativa (NPA de 92,5% a 100%). Em contrapartida, um teste comercial avaliado baseado em extrato bruto de LPS apresentou PPA de 0% (falhou em identificar todos os cães infectados da amostra). Os autores ressaltam que os resultados de testes POC positivos de triagem nunca devem ser considerados definitivos, exigindo confirmação por ensaios de referência (AGID II ou CBM).',

    culturaBacteriologicaEPadraoOuro:
      'O isolamento microbiológico de Brucella canis através de cultura bacteriana representa o padrão-ouro definitivo de confirmação etiológica antemortem. As amostras biológicas de maior rendimento dependem do fenótipo do paciente: sangue total com anticoagulante (hemocultura seriada colhida com técnica asséptica estrita), sêmen fresco e urina em machos; secreção vaginal, fragmentos de placenta e tecidos fetais autolisados (estômago e pulmão fetal) em fêmeas abortantes; aspirados ósseos ou discos vertebrais em discospondilite; e aspirados de linfonodos. No entanto, uma cultura estéril ou negativa não descarta a doença, devido ao caráter intermitente da bacteremia, ao uso empírico prévio de antibióticos e à natureza fastidiosa do microrganismo, que exige incubação aeróbia prolongada (7 a 14 dias) em ágar Brucella enriquecido ou ágar sangue sob estrita vigilância microbiológica.',

    alertaMaximoDeBiossegurancaBsl3Laboratorial:
      'ALERTA OBRIGATÓRIO DE BIOSSEGURANÇA: Brucella spp. é classificada globalmente pelo CDC, OMS e MAPA como um dos agentes infecciosos de maior risco ocupacional para médicos-veterinários e técnicos de laboratório, sendo uma das principais causas de infecção laboratorial acidental no mundo (Laboratory-Acquired Infections - LAI). O processamento de amostras biológicas suspeitas sem conhecimento prévio — especialmente a manipulação de placas de cultura na bancada aberta, centrifugação de tubos sem vedação aerossol e procedimentos que geram gotículas e aerossóis — provoca infecção inalatória humana grave. Por conseguinte, é dever ético e legal indeclinável do médico-veterinário alertar de forma explícita e em destaque no formulário de encaminhamento: "SUSPEITA DE BRUCELLA CANIS — AGENTE DE CLASSE DE RISCO 3 — PROCESSAR EM CABINE DE FLUXO BIOLÓGICO CLASSE II / NÍVEL DE BIOSSEGURANÇA BSL-3".',

    pcrMolecularDnaVsBacteriaViva:
      'Os ensaios de reação em cadeia da polimerase (PCR) convencional e em tempo real (qPCR) direcionados a sequências de inserção genômicas específicas (como IS711) ou genes estruturais (bspB) oferecem alta sensibilidade e rapidez diagnóstica, detectando quantidades ínfimas de DNA bacteriano em sangue total com EDTA, sêmen, secreções vaginais e tecidos lesados. A PCR é particularmente vantajosa em amostras contaminadas ou autolisadas nas quais a cultura é inviabilizada por sobrecrescimento de bactérias secundárias. Contudo, duas ressalvas clínicas fundamentais devem ser dominadas: (1) A PCR em sangue periférico depende da presença de bacteremia; em fases crônicas sem bacteremia, a PCR sanguínea resulta negativa enquanto o sêmen ou tecidos genitais continuam fortemente positivos; (2) A PCR detecta DNA e não microrganismos vivos viáveis, podendo permanecer positiva temporariamente após a morte bacteriana pós-antimicrobianos.',

    diagnosticoPorImagemDaDiscospondilite:
      'A investigação imaginológica é mandatória diante de dor axial em cães jovens ou suspeita de discospondilite. O exame radiográfico simples da coluna vertebral revela, em estágios estabelecidos, o clássico padrão de lise necrótica dos endplates vertebrais em soco ("hole-punch lesions"), acompanhado de colapso do espaço discal intervertebral, esclerose óssea reativa perilesional e pontes osteofíticas ventrais em múltiplos espaços discais (particularmente em C2-C5, T13-L1 e L7-S1). Não obstante, estudo multicêntrico de Moeller et al. (2025) demonstrou que o padrão "hole-punch" não é exclusivo de Brucella, ocorrendo também em infecções piogênicas comuns. A Ressonância Magnética (RM) supera amplamente a radiografia na detecção precoce (identificando 37% de lesões vertebrais ocultas no raio-X convencional), exibindo hipointensidade em T1 e hiperintensidade em T2/STIR compatíveis com edema ósseo metafisário precoce (physitis) e infiltração de tecidos moles paravertebrais.',

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
      'Antes de estabelecer qualquer plano farmacológico para um paciente canino infectado por Brucella canis, o médico-veterinário deve alinhar de maneira transparente e documental as expectativas com os tutores. O Centro de Controle e Prevenção de Doenças dos Estados Unidos (CDC), as diretrizes da World Small Animal Veterinary Association (WSAVA) e as referências do acervo (Nelson & Couto; VIN) estabelecem de modo consensual que a infecção canina por B. canis deve ser considerada uma enfermidade sem garantia comprovada de cura microbiológica estéril. A localização estritamente intracelular do microrganismo nos fagossomos dos macrófagos, seu crescimento lento e o sequestro anatômico em tecidos com barreira biológica restrita (glândula prostática, disco intervertebral, tecido ósseo e câmara anterior do olho) impedem que os antibióticos erradiquem 100% da população bacteriana. Portanto, os objetivos reais da terapia consistem em: (1) Suprimir os sinais clínicos (alívio da dor na discospondilite e inflamação testicular); (2) Reduzir a carga bacterêmica; (3) Diminuir temporariamente a eliminação bacteriana em secreções; e (4) Mitigar o risco zoonótico imediato.',

    protocolosAntimicrobianosCombinados:
      'A monoterapia antimicrobiana (especialmente com fluoroquinolonas ou tetraciclinas isoladas) é formalmente condenada: ensaios clínicos demonstraram que o uso isolado de enrofloxacina promove remissão clínica temporária, mas a quase totalidade dos animais permanece bacteriêmica e culture-positive, além de selecionar rapidamente cepas mutantes resistentes. Os regimes contemporâneos recomendam obrigatoriamente a terapia combinada e prolongada: (1) Protocolo de Primeira Linha (Tetraciclina + Aminoglicosídeo): Doxiciclina na dose de 5 a 10 mg/kg por via oral a cada 12 horas durante 4 a 8 semanas consecutivas (podendo estender-se por 12 semanas em cães com discospondilite ou uveíte), associada à Gentamicina na dose de 5 mg/kg por via subcutânea a cada 24 horas durante os primeiros 7 a 14 dias de tratamento. O uso de aminoglicosídeos exige monitoramento semanal rigoroso da função renal (creatinina sérica e urinálise para pesquisa de cilindros granulosos nefrotóxicos); (2) Protocolo Alternativo Oral: Doxiciclina (10 mg/kg VO q12h) associada a Enrofloxacina (5 a 10 mg/kg VO q24h) ou Marbofloxacina (2 a 4 mg/kg VO q24h) por 6 a 12 semanas consecutivas, indicado para animais nefropatas ou em situações onde a internação para injeções diárias é inviável; (3) Minociclina (12,5 mg/kg VO q12h) figura como excelente substituta da doxiciclina por alcançar níveis teciduais prostáticos superiores.',

    papelDaCirurgiaCastracaoEEnucleacao:
      'A esterilização cirúrgica (orquiectomia bilateral com ablação escrotal em machos e ovariohisterectomia em fêmeas) constitui uma medida terapêutica adjuvante fundamental, devendo ser executada assim que o paciente estiver clinicamente estável sob cobertura antimicrobiana. A cirurgia remove as principais massas de tecido sob influência hormonal esteroide que sustentam a multiplicação massiva de B. canis, interrompe em definitivo a via de transmissão venérea e obstétrica e reduz drasticamente o volume de secreções genitais e descargas vaginais contaminantes. ALERTA CRÍTICO: a castração NÃO cura a brucelose. No cão macho, a próstata permanece infectada e atua como reservatório crônico contínuo, mantendo a eliminação bacteriana viável na urina por meses ou anos. Em casos de uveíte refratária unilateral severa com dor intratável, descolamento de retina ou glaucoma secundário cego, a enucleação cirúrgica do olho afetado deve ser considerada para controle do foco persistente de replicação bacteriana.',

    precaucoesCirurgicasEEpiOcupacional:
      'Qualquer procedimento cirúrgico executado em um paciente infectado por Brucella (incluindo castrações, biópsias ósseas, cirurgias espinhais de descompressão ou enucleações) impõe a adoção imediata de protocolos rigorosos de biossegurança ocupacional pela equipe veterinária. O contato inadvertido com sangue contaminado, secreções prostáticas ou tecidos reprodutivos representa uma rota frequente de transmissão zoonótica para cirurgiões e assistentes. Todo o corpo clínico deve utilizar Equipamentos de Proteção Individual (EPI) completos: avental cirúrgico impermeável, luvas duplas de procedimento, máscara de proteção respiratória com filtro de partículas de alta eficiência (N95 ou PFF2) e óculos de proteção facial com vedação lateral para evitar respingos em mucosa conjuntival. Todos os instrumentais cirúrgicos e campos devem ser imersos em solução desinfetante apropriada antes da lavagem e autoclavagem, e o material biológico extirpado deve ser acondicionado em recipientes herméticos identificados como risco biológico classe 3.',

    monitoramentoTerapeuticoECriteriosDeRecidiva:
      'O acompanhamento longitudinal pós-tratamento deve estender-se por toda a vida do paciente, com reavaliações clínicas e laboratoriais estruturadas a cada 2 a 3 meses no primeiro ano e semestrais subsequentemente. A melhora dos sinais clínicos e a regressão da dor vertebral na discospondilite não devem ser interpretadas isoladamente como erradicação do agente. Nos centros diagnósticos que dispõem do Canine Brucella Multiplex (CBM), uma redução persistente de cerca de 40% nos níveis de anticorpos contra o antígeno PO1 entre 2 e 6 meses pós-terapia correlaciona-se com bom controle clínico e redução da carga de bacteremia (Guarino et al., 2023). Testes como 2ME-RSAT e AGID II devem ser repetidos periodicamente. Se o cão voltar a apresentar elevação nos títulos sorológicos, piora da proteinúria, retorno da dor axial ou sinais de prostatite, considera-se instalada a recidiva bacteriológica, impondo a instituição de novo ciclo antimicrobiano com regime combinado alternativo.',

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
      'As complicações clínicas decorrentes da infecção crônica por Brucella canis manifestam-se pela incapacidade do sistema imune de debelar o foco infeccioso intracelular: (1) Discospondilite compressiva destrutiva com colapso vertebral, subluxação e paraplegia irreversível por compressão medular ou síndrome de cauda equina; (2) Insuficiência renal progressiva e azotemia secundárias a glomerulonefrite membranoproliferativa crônica induzida pelo depósito contínuo de imunocomplexos; (3) Perda permanente da visão por endoftalmite, descolamento de retina exsudativo ou glaucoma secundário intratável; (4) Endocardite bacteriana com insuficiência cardíaca congestiva aguda; (5) Formação de abscessos e cistos prostáticos refratários em cães machos; (6) Recidivas bacterêmicas intermitentes imprevisíveis meses ou anos após o término aparente da terapia antimicrobiana.',

    dezErrosFataisBrucelose:
      'DEZ ERROS CLÁSSICOS E ARMADILHAS LETAIS NO DIAGNÓSTICO E MANEJO DA BRUCELOSE EM CÃES E GATOS: (1) Solicitar testes sorológicos de rotina para brucelose bovina (smooth Brucella como B. abortus) e concluir falsamente que o cão está livre da doença: Brucella canis possui lipopolissacarídeo rough e exige testes formulados com antígenos rough específicos (CBM, 2ME-RSAT, AGID II); (2) Descartar a suspeita de brucelose canina pelo fato de o animal ser castrado ou virgem: a transmissão oronasal não venérea por urina, fômites e aerossol é frequente, e animais castrados representam parcela expressiva dos pacientes com discospondilite; (3) Assumir que lesões em soco ("hole-punch") nos endplates vertebrais confirmam patognomonicamente B. canis: o estudo multicêntrico de Moeller et al. (2025) comprovou que Staphylococcus e Streptococcus provocam aspecto radiográfico idêntico, exigindo confirmação laboratorial; (4) Descartar discospondilite bacteriana pela ausência de febre ou leucocitose: 86% dos cães com discospondilite por B. canis são normotérmicos e a maioria não apresenta neutrofilia na admissão; (5) Enviar amostras de sangue, sêmen ou tecidos para cultura microbiológica sem alertar ostensivamente o laboratório: Brucella é um patógeno de alto risco ocupacional BSL-3 por aerossóis, expondo a equipe técnica a infecções laboratoriais graves se manipulado em bancada comum; (6) Prescrever monoterapia antimicrobiana com enrofloxacina ou doxiciclina isoladas: monoterapia resulta em falha microbiológica quase universal e rápida seleção de cepas resistentes; (7) Afirmar ao tutor que o cão está "curado" após a melhora clínica ou soronegativação pós-antibióticos: o CDC estabelece que não existe garantia de cura microbiológica estéril, mantendo-se o risco de recidiva tardia e transmissão; (8) Acreditar que a orquiectomia esteriliza o cão macho: a próstata permanece colonizada por B. canis e o animal continua eliminando microrganismos na urina; (9) Liberar cadelas que abortaram ou machos tratados para retorno à atividade reprodutiva: cães que tiveram brucelose confirmada devem ser excluídos permanentemente da procriação; (10) Negligenciar a investigação e a orientação de contactantes humanos: tutores expostos a abortamentos, crianças pequenas e imunossuprimidos correm risco de contrair a zoonose, devendo ser formalmente orientados a buscar avaliação médica.',

    protocoloPlantaoBrucelose10Passos:
      'PROTOCOLO DE PLANTÃO: ABORDAGEM SEQUENCIAL EM 10 PASSOS DA BRUCELOSE NA EMERGÊNCIA E INTERNAÇÃO: (1) Passo 1 - Triagem Imediata e Reconhecimento de Risco: Identificar aborto recente no terço final, orquite/epididimite aguda ou dor espinhal axial em cão jovem; isolar o paciente imediatamente em canil individual de contenção biológica; (2) Passo 2 - Paramentação e Proteção da Equipe com EPI Completo: Proibir manipulação desprotegida; exigir uso mandatório de luvas de procedimento, máscara N95/PFF2, óculos com vedação lateral e avental impermeável por toda a equipe; (3) Passo 3 - Manejo Seguro de Materiais Biológicos de Abortamento: Recolher restos placentários, secreções uterinas e fetos com luvas duplas e pinças; acondicionar imediatamente em sacos de risco biológico herméticos para incineração ou fixação em formol se for solicitada necropsia; (4) Passo 4 - Coleta Estratégica de Amostras para Triagem Sorológica: Colher sangue total em tubo sem anticoagulante para obtenção de soro; solicitar imediatamente teste de aglutinação específico para antígeno rough (2ME-RSAT ou encaminhamento para CBM Luminex); (5) Passo 5 - Notificação Obrigatória em Amostras de Cultura (Alerta BSL-3): Se forem colhidas hemoculturas, raspado vaginal ou sêmen, escrever na guia laboratorial em letras garrafais vermelhas: "SUSPEITA DE BRUCELLA CANIS - RISCO BSL-3 POR AEROSSOL"; (6) Passo 6 - Descontaminação Ambiental Rigorosa: Lavar o ambiente com detergente neutro para remoção de toda a matéria orgânica e desinfetar com hipoclorito de sódio a 1% ou quaternário de amônio por no mínimo 20 minutos de contato; (7) Passo 7 - Início de Antibioticoterapia Combinada Hospitalar: Instituir Doxiciclina 10 mg/kg VO q12h associada a Gentamicina 5 mg/kg SC q24h (se função renal intacta) ou Enrofloxacina 10 mg/kg VO q24h; (8) Passo 8 - Avaliação Radiográfica ou Tomográfica Vertebral: Em cães com claudicação ou dor lombar/cervical, realizar estudo radiográfico ortogonal de toda a coluna para rastreamento de discospondilite multifocal e colapso discal; (9) Passo 9 - Programação de Esterilização Cirúrgica de Barreira: Agendar OSH ou orquiectomia eletiva assim que o animal estiver medicado e estável, comunicando à equipe cirúrgica os protocolos de biossegurança de campo; (10) Passo 10 - Orientação Documental One Health e Encaminhamento Médico: Emitir termo de consentimento livre e esclarecido ao tutor descrevendo o caráter zoonótico incurável da enfermidade; se houver histórico de exposição humana direta a tecidos de aborto ou secreções, orientar formalmente avaliação médica infectológica imediata.',
  },

  prevention: {
    triagemPreReprodutivaEQuarentena:
      'A prevenção primária da brucelose canina depende intrinsecamente de programas estruturados de triagem sorológica pré-reprodutiva. Machos padreadores e fêmeas matrizes devem ser obrigatoriamente testados através de ensaios com antígeno rough específico (CBM ou 2ME-RSAT confirmado por AGID II) no período que antecede cada cobertura planejada ou procedimento de inseminação artificial. O rastreamento deve incluir cães virgens e primíparas, uma vez que a transmissão oronasal não venérea por contato ambiental e a infecção congênita subclínica são frequentes. Todo animal recém-adquirido ou proveniente de outros criatórios, abrigos ou estados deve permanecer em quarentena estrita por no mínimo 4 a 8 semanas, sendo submetido a duas testagens sorológicas consecutivas espaçadas por 30 a 60 dias para cobrir integralmente a janela imunológica de soroconversão antes de sua introdução ao plantel.',

    manejoSanitarioDeCriatoriosEAbandonoDaReproducao:
      'A detecção de um único animal positivo para B. canis em um canil comercial ou abrigo não representa um caso isolado, mas sim uma emergência sanitária de rebanho. O protocolo de contenção exige: (1) Interrupção imediata de todas as cruzas, montas e vendas de filhotes no estabelecimento; (2) Isolamento físico e espacial rigoroso de todos os animais reagentes e suspeitos; (3) Testagem sorológica universal de 100% dos cães do canil com repetição a cada 30 dias até que todo o plantel permaneça soronegativo por dois testes consecutivos; (4) Descarte reprodutivo definitivo e esterilização cirúrgica incondicional de todos os cães diagnosticados como positivos; (5) Cães confirmados para brucelose JAMAIS devem retornar à reprodução, mesmo após aparente remissão clínica ou redução de títulos sorológicos, devido ao risco perpétuo de recidiva bacterêmica e disseminação.',

    inexistenciaDeVacinaCanina:
      'Até o presente momento (setembro de 2026), NÃO existe qualquer vacina comercialmente aprovada, segura e eficaz contra a Brucella canis no mercado veterinário mundial. As vacinas atenuadas utilizadas em animais de produção contra B. abortus (cepa B19 ou RB51) e B. melitensis (cepa Rev 1) são formuladas para espécies lisas, induzem virulência excessiva e doença ativa em canídeos, e não conferem imunidade cruzada protetora contra o fenótipo rough de B. canis. A imunoprofilaxia ativa em cães permanece como uma lacuna tecnológica global crítica (Revisão One Health, 2026), tornando a biossegurança de manejo, a quarentena e a eutanásia ou segregação de animais positivos as únicas estratégias epidemiológicas efetivas de controle populacional.',

    saudePublicaOneHealthEZoonoseHumana:
      'A Brucella canis é uma zoonose de notória relevância em Saúde Pública e One Health. Embora historicamente considerada "menos virulenta" para o ser humano que B. melitensis ou B. abortus, revisão sistemática publicada em 2025 avaliando casos humanos confirmados demonstrou que 80% das infecções humanas com fonte epidemiológica identificada decorreram de contato direto com cães domésticos infectados, enquanto 20% foram infecções ocupacionais de técnicos de laboratório. Nos seres humanos, a brucelose por B. canis manifesta-se por síndrome febril prolongada inespecífica, fadiga crônica debilitante, cefaleia, sudorese noturna, mialgia, artralgia, perda de peso e potencial evolução para discospondilite ou endocardite. O subdiagnóstico em medicina humana é alarmante, pois os hospitais e laboratórios clínicos utilizam quase exclusivamente testes sorológicos para Brucella smooth, incapazes de identificar B. canis. No Brasil, o Protocolo Clínico e Diretrizes Terapêuticas (PCDT) de Brucelose Humana aprovado pelo Ministério da Saúde em 2025 reconhece explicitamente B. canis como patógeno zoonótico emergente. Estados como Minas Gerais instituíram notificação compulsória para casos suspeitos de brucelose humana. No âmbito da saúde animal federal (Instrução Normativa MAPA nº 50/2013), B. canis não consta nominalmente na lista compulsória direta de notificação como B. suis e B. abortus, devendo o clínico consultar exigências estaduais específicas e notificar a vigilância sanitária local diante de surtos populacionais ou exposição humana comprovada.',
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
        'Aspecto imaginológico clássico da discospondilite canina por B. canis exibindo lise central e irregularidade das placas terminais vertebrais ("hole-punch lesions") e estreitamento do espaço intervertebral. Conforme alertado por Moeller et al. (2025), o padrão lítico não é patognomônico e requer confirmação etiológica laboratorial sob isolamento de biossegurança.',
      url: '/consulta-vet/brucelose-caes-gatos/discospondilite-lise-endplates-hole-punch-brucelose.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'figura-2-fisiopatologia-rough-lps-macrofago',
      title: 'Fisiopatologia Molecular e Fenótipo Rough de Brucella canis',
      legend:
        'Esquema demonstrativo da infecção intracelular de B. canis em macrófagos e células dendríticas. A ausência da cadeia O-polissacarídica no lipopolissacarídeo (fenótipo rough) confere escape à imunidade inata e impede a detecção por testes sorológicos padronizados para Brucella smooth (B. abortus/B. melitensis), perpetuando bacteremia crônica de 6 a 64 meses.',
      url: '/consulta-vet/brucelose-caes-gatos/fisiopatologia-brucella-canis-rough-lps-macrofago.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'figura-3-orquite-epididimite-dermatite-escrotal',
      title: 'Síndrome Reprodutiva no Macho: Epididimite, Orquite e Atrofia Testicular',
      legend:
        'Manifestações clínicas no trato reprodutor do cão macho: aumento volumétrico doloroso e dermatite escrotal aguda por automutilação, evoluindo cronicamente para atrofia testicular fibrosa, espermatozoides anormais (>90%) e infertilidade por autoanticorpos antiespermatozoides.',
      url: '/consulta-vet/brucelose-caes-gatos/orquite-epididimite-dermatite-escrotal-brucelose-canina.jpg',
      aspectRatio: '3:2',
    },
    {
      id: 'figura-4-algoritmo-diagnostico-one-health',
      title: 'Algoritmo Diagnóstico Integrado e Manejo One Health na Brucelose Canina',
      legend:
        'Fluxograma para abordagem clínica da suspeita de B. canis: triagem sorológica com antígeno rough (CBM/RSAT 2-ME), confirmação por AGID II / PCR, precauções máximas de biossegurança ocupacional (BSL-3 em laboratório), protocolo terapêutico combinado (Doxiciclina + Aminoglicosídeo/Enrofloxacina) e conscientização sobre a ausência de garantia de cura microbiológica.',
      url: '/consulta-vet/brucelose-caes-gatos/algoritmo-diagnostico-manejo-one-health-brucelose.jpg',
      aspectRatio: '3:2',
    },
  ],
};
