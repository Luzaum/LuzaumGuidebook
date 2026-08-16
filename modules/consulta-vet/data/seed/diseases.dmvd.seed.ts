import type { DiseaseRecord } from '../../types/disease';

/** Doença valvar mitral degenerativa (DMVD / MMVD) — cão. Fontes: ACVIM 2019, EPIC 2016, Nelson & Couto 6ª ed., Plumb’s 10ª ed. */
export const doencaValvarMitralDegenerativaRecord: DiseaseRecord = {
  id: 'disease-dmvd-caes',
  slug: 'doenca-valvar-mitral-degenerativa-caes',
  title: 'Doença valvar mitral degenerativa (DMVD / endocardiose)',
  synonyms: [
    'DMVD',
    'MMVD',
    'Endocardiose degenerativa',
    'Doença da valva mitral',
    'Myxomatous mitral valve disease',
    'Insuficiência mitral degenerativa',
  ],
  species: ['dog'],
  category: 'cardiologia',
  tags: [
    'Murmúrio',
    'Regurgitação mitral',
    'Pimobendan',
    'IECA',
    'ACVIM',
    'Cão pequeno',
    'Arritmia',
  ],
  quickSummary:
    'A DMVD (endocardiose mixomatosa da valva mitral) é a cardiopatia adquirida mais frequente em cães de pequeno porte: os folhetos mitrais tornam-se espessados e incompetentes, permitindo regurgitação sistólica para o átrio esquerdo. O sopro é o achado clássico, mas a intensidade não traduz gravidade hemodinâmica. O estadiamento ACVIM (A–D) separa predisposição, lesão sem remodelação (B1), remodelação pré-clínica (B2), ICC (C) e doença refratária (D). Em B2 com critérios de imagem, pimobendan tem evidência para retardar a descompensação (EPIC; Keene et al., 2019). Na ICC, o eixo é congestão (diurético), inodilatação (pimobendan) e SRAA quando a perfusão renal permitir, com creatinina e eletrólitos obrigatórios (Nelson & Couto, 6ª ed.; Plumb’s, 10ª ed.).',
  quickDecisionStrip: [
    'Sopro sistólico esquerdo em cão pequeno idoso: DMVD até prova em contrário — a intensidade do sopro não substitui o eco.',
    'Estadiar ACVIM antes de medicar: B1 observa; B2 discute pimobendan; C/D tratam congestão.',
    'B2 não é um número isolado: sopro ≥3/6 + LA/Ao ≥1,6 + LVIDDN ≥1,7 + VHS ajustado — integrar o conjunto (Keene et al., 2019).',
    'Tosse isolada com frequência respiratória de sono normal não autoriza diurético — pode ser compressão brônquica ou doença respiratória.',
    'Frequência respiratória durante o sono é o melhor “alarme” do tutor: subida persistente pede reavaliação.',
    'ICC descompensada: oxigênio e diurético primeiro; pimobendan; IECA só com euvolemia relativa e creatinina de referência.',
    'Pimobendan: preferir comprimido/cápsula veterinária; jejum ~1 h; não equivaler manipulado líquido miligrama a miligrama.',
    'Fibrilação atrial rápida piora congestão mesmo com o mesmo grau de regurgitação — controlar frequência.',
    'Creatinina em ascenso com IECA + diurético: revisar dose, hidratação e timing — rim sob estresse é cenário frequente.',
  ],
  quickSummaryRich: {
    lead:
      'A DMVD não é “só um soprinho”: é uma doença valvar progressiva em que a incompetência mitral aumenta o trabalho do ventrículo esquerdo e, por fim, a pressão capilar pulmonar. O mesmo cão pode permanecer anos compensado ou evoluir para edema e dispneia. Eco e estadiamento ACVIM separam vigilância, tratamento com meta e emergência.',
    leadHighlights: ['sopro', 'ACVIM', 'eco', 'edema'],
    pillars: [
      {
        title: 'Por que o sopro engana',
        body:
          'Grau I–VI reflete turbulência audível, não volume regurgitante nem pressão atrial. Sopro suave com átrio enorme pode ser mais grave que sopro “forte” com pouca remodelação.',
        highlights: ['turbulência', 'átrio'],
      },
      {
        title: 'Estádios A–D decidem a conduta',
        body:
          'A: predisposto sem lesão. B1: lesão sem remodelação relevante. B2: remodelação pré-clínica — ponto do pimobendan. C: ICC atual ou prévia. D: ICC refratária. Confundir B1 com B2 ou tosse crônica com C custa tempo e qualidade de vida.',
        highlights: ['B2', 'ICC'],
      },
      {
        title: 'Três eixos na prática',
        body:
          'Congestão (diurético), inodilatação (pimobendan onde indicado) e SRAA (IECA/espironolactona) com vigilância renal. Arritmia e hipertensão pulmonar mudam prognóstico e doses.',
        highlights: ['diurético', 'pimobendan', 'SRAA'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Estabilidade e ausculta',
          timing: 'Primeira consulta',
          detail:
            'Localizar foco mitral; pulso, frequência, dispneia, síncope, tosse e frequência respiratória de sono. Dispneia em repouso: oxigênio antes de exames demorados (Nelson & Couto, 6ª ed.; Keene et al., 2019).',
        },
        {
          label: 'Ecocardiografia completa',
          timing: 'Padrão ouro',
          detail:
            'Espessamento valvar, regurgitação, LA/Ao, LVIDDN, função sistólica e estimativa de pressão pulmonar — define B1 versus B2 (Keene et al., 2019).',
        },
        {
          label: 'Classificar ACVIM A–D',
          timing: 'Antes de prescrever',
          detail:
            'Registrar estágio. Em pré-clínico, conferir se o conjunto de critérios de B2 foi atingido — isso muda pimobendan e intervalo de seguimento (Keene et al., 2019; Boswood et al., 2016).',
        },
        {
          label: 'Radiografia quando houver dúvida de congestão',
          detail:
            'VHS, veias pulmonares e padrão intersticial/alveolar. Apoia ICC; não substitui o eco para B2 (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'ECG e laboratório',
          detail:
            'ECG se irregularidade, síncope ou taquicardia. Creatinina, ureia e eletrólitos antes de IECA + diurético; NT-proBNP só em casos limítrofes (Keene et al., 2019).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'A e B1 — observar',
          detail:
            'Sem polifarmácia automática. Peso, exercício sensato, rastreio auscultatório e imagem periódica (Keene et al., 2019).',
          duration: 'Reavaliação típica em 6–12 meses, mais cedo se o sopro sobe ou surgem sinais.',
          reassess: 'Novo eco se progressão clínica ou aumento do sopro.',
        },
        {
          label: 'B2 — pimobendan pré-clínico',
          dose: 'Pimobendan ~0,25–0,3 mg/kg VO q12h (faixa prática ~0,25–0,5 mg/kg BID/TID)',
          duration: 'Contínuo, com eco seriado',
          reassess: 'Frequência respiratória de sono em casa; eco e clínica no intervalo do serviço',
          detail:
            'Quando os critérios ACVIM de remodelação estão reunidos, pimobendan retardou ICC ou morte cardíaca no EPIC (Boswood et al., 2016; Keene et al., 2019).',
        },
        {
          label: 'C — ICC',
          dose: 'Furosemida titulada; pimobendan; IECA ~0,25–0,5 mg/kg VO q12–24h se tolerado',
          duration: 'Ajuste contínuo à menor dose que mantém conforto respiratório',
          reassess: 'Creatinina e eletrólitos 5–10 dias após iniciar IECA + diurético',
          detail:
            'Diurético para congestão; internar se dispneia em repouso ou hipóxia; tratar infecção e arritmia desencadeantes (Keene et al., 2019; Plumb’s, 10ª ed.).',
        },
        {
          label: 'D — refratário',
          detail:
            'Otimizar diurético (torasemida, bloqueio do néfron), vasodilatação e qualidade de vida; cirurgia valvar só em centros selecionados (Keene et al., 2019).',
          reassess: 'Azotemia, apetite e conforto respiratório guiam até onde intensificar.',
        },
      ],
    },
  },
  etiology: {
    pontosChave: [
      'Sopro ≠ gravidade: a intensidade não mede volume regurgitante nem congestão (Nelson & Couto, 6ª ed.).',
      'Estadiar ACVIM A–D antes de abrir o “cóctel cardíaco” (Keene et al., 2019).',
      'B2 exige conjunto de critérios (sopro, LA/Ao, LVIDDN, VHS) — um número isolado não basta.',
      'Tosse pode ser compressão do brônquio esquerdo pelo átrio, sem edema pulmonar.',
      'Pimobendan trata remodelação/ICC; diurético trata congestão — não são intercambiáveis.',
    ],
    definicao:
      'DMVD (também MMVD) é degeneração mixomatosa crônica dos folhetos da valva mitral: acúmulo de glicosaminoglicanos e desorganização do colágeno tornam a valva espessa, nodular e incompetente na sístole. Não é infecciosa nem “endocardite”. O fenótipo final é insuficiência mitral com tempo de evolução variável (Nelson & Couto, 6ª ed.; Keene et al., 2019).',
    dmvdAnatomiaMixomatose:
      'A lesão primária está nos folhetos e, com o tempo, nas cordas tendíneas. O anel mitral pode dilatar secundariamente e piorar a incompetência. Ruptura de corda produz regurgitação aguda e edema súbito — emergência distinta da progressão lenta habitual.',
    etiologiaMultifatorial:
      'Há forte predisposição racial e componente hereditário em linhagens estudadas (especialmente Cavalier King Charles Spaniel), somados a envelhecimento e tensão hemodinâmica local sobre cordas e folhetos. Qualquer cão idoso pode desenvolver a lesão; genética não equivale a teste diagnóstico de rotina (Nelson & Couto, 6ª ed.).',
    dmvdValvaTricuspideNota:
      'A valva tricúspide degenera em parte significativa dos casos avançados. Regurgitação tricúspide acentuada eleva pressão venosa sistêmica (hepatomegalia, ascite) e entra na avaliação de hipertensão pulmonar — não tratar como “outro diagnóstico” isolado sem olhar o lado esquerdo.',
  },
  epidemiology: {
    perfil:
      'Cardiopatia adquirida mais comum em cães, com impacto clínico maior em porte pequeno/miniatura e meia-idade a idosos. Machos e fêmeas são afetados; a progressão é altamente variável.',
    dmvdPredisposicaoRacial:
      'Poodle, Yorkshire Terrier, Cavalier King Charles Spaniel, Chihuahua, Maltês, Dachshund e outras raças toy/miniatura. Cavalier pode apresentar lesão mais precoce. Cães grandes também desenvolvem DMVD, mas o diagnóstico diferencial com cardiomiopatia dilatada torna-se mais importante (Nelson & Couto, 6ª ed.).',
    dmvdPrevalenciaEIdade:
      'A prevalência cresce com a idade. Alterações subclínicas ao eco podem preceder o sopro “óbvio”. Isso justifica rastreio auscultatório geriátrico e em reprodução de raças de risco, sem transformar todo sopro em tratamento imediato — o estágio ACVIM define a intensidade da conduta.',
    historiaNatural:
      'Há cães com sopro estável por anos e outros que progridem para ICC em meses. Fatores associados a evolução mais rápida incluem remodelação já documentada (B2), hipertensão pulmonar, fibrilação atrial e rupturas cordais. O tutor deve monitorar frequência respiratória de sono porque a descompensação congestiva costuma anunciar-se ali antes da dispneia franca (Keene et al., 2019).',
  },
  pathogenesisTransmission: {
    transmissao:
      'Não há contágio entre animais. Formas familiares justificam orientação reprodutiva em linhagens de alta prevalência, não isolamento sanitário.',
    cascata: [
      'Folhetos mixomatosos não coaptam → regurgitação sistólica para o átrio esquerdo.',
      'O volume regurgitante aumenta o volume diastólico final do ventrículo esquerdo (sobrecarga de volume).',
      'O ventrículo remodela de forma excêntrica para manter débito sistêmico; o átrio dilata para acomodar o refluxo.',
      'Com o tempo, elevam-se as pressões de enchimento esquerdas → congestão venosa pulmonar e edema.',
      'Queda do débito efetivo ativa simpático, SRAA e vasopressina → retenção de sódio e água (adaptativa no início, maladaptativa na ICC).',
      'Distensão atrial e fibrose criam substrato para fibrilação atrial; taquicardia encurta a diástole e precipita descompensação.',
    ],
    dmvdNeurohumoralIcc:
      'A ativação neuro-humoral explica o papel dos diuréticos (volume) e dos moduladores do SRAA (IECA, espironolactona) na ICC estabelecida — sempre com vigilância de creatinina, potássio e hidratação (Keene et al., 2019; Nelson & Couto, 6ª ed.).',
    dmvdComplicacoesEletro:
      'Fibrilação atrial com resposta ventricular rápida é a taquiarritmia mais relevante: reduz enchimento, piora congestão e pode descompensar um cão que estava “estável” com o mesmo grau de regurgitação. Déficit de pulso pede ECG, não só aumento de diurético.',
  },
  pathophysiology: {
    dmvdSobrecargaVolumeRemodelacao:
      'A regurgitação crônica impõe pré-carga elevada a cada ciclo. Inicialmente prevalece remodelação excêntrica (aumento do volume diastólico). Depois podem surgir fibrose, piora do relaxamento e queda da contratilidade medida ao eco — o ventrículo “ainda se mexe”, mas o volume efetivo para a aorta diminui.',
    dmvdFuncaoSistolicaDescompensacao:
      'Quando a função sistólica cai, aparece o fenótipo de baixo débito: fraqueza, hiporexia, hipoperfusão renal e azotemia mais fácil ao somar diurético e IECA. Esse é o momento em que “ICC resolvida no pulmão” pode coexistir com rim sob estresse.',
    dmvdCirculacaoPulmonarEdema:
      'Edema cardiogênico reflete pressão hidrostática capilar elevada, não “grau de sopro”. Paciente com pouco ruído e muito edema ocorre em descompensação aguda (ruptura de corda, FA rápida). Compressão do brônquio principal esquerdo pelo átrio dilatado produz tosse sem necessariamente haver líquido alveolar (Nelson & Couto, 6ª ed.).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Sopro sistólico com máximo em foco mitral esquerdo',
          mechanism:
            'Regurgitação mitral na sístole gera fluxo turbulento do ventrículo esquerdo para o átrio esquerdo; a intensidade mede turbulência audível, não o volume regurgitante.',
          clinicalMeaning: 'Porta de entrada para o eco. Sopro suave com átrio enorme pode ser mais grave que sopro “forte”.',
          priority: 'common',
        },
        {
          finding: 'Pulso fraco ou variável; tempo de enchimento capilar prolongado',
          mechanism: 'Queda do volume sistólico efetivo e ectopia geram déficit de pulso e pior perfusão periférica.',
          clinicalMeaning: 'Sugere baixo débito ou arritmia — solicitar ECG.',
          priority: 'low-output',
        },
        {
          finding: 'Taquicardia ou ritmo irregular',
          mechanism:
            'Simpático compensa queda de débito; fibrilação atrial encurta a diástole e piora o enchimento.',
          clinicalMeaning: 'Controlar frequência pode melhorar congestão sem mudar o grau de regurgitação.',
          priority: 'arrhythmia',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Frequência respiratória elevada durante o sono',
          mechanism:
            'Aumento da pressão capilar pulmonar reduz complacência e acelera a ventilação mesmo em repouso, antes da dispneia franca.',
          clinicalMeaning:
            'Melhor sinal de casa para descompensação. Subida persistente (muitos serviços usam limiar em torno de 30 rpm) pede reavaliação — não esperar ortopneia (Keene et al., 2019).',
          priority: 'heart-failure',
        },
        {
          finding: 'Dispneia de esforço evoluindo para ortopneia ou dispneia em repouso',
          mechanism: 'Extravasamento de líquido para interstício e alvéolos por hipertensão capilar pulmonar.',
          clinicalMeaning: 'ICC esquerda (C ou descompensação) — oxigênio e mínima manipulação antes de exames longos.',
          priority: 'heart-failure',
        },
        {
          finding: 'Tosse, com ou sem crepitações',
          mechanism:
            'Pode ser edema alveolar ou compressão do brônquio esquerdo por átrio dilatado. Crepitações sugerem líquido; tosse seca isolada não confirma ICC.',
          clinicalMeaning: 'Correlacionar com FR de sono, radiografia e eco. Não iniciar diurético só pela tosse.',
          priority: 'heart-failure',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Intolerância ao exercício, letargia, perda de massa muscular',
          mechanism: 'Baixo débito crônico e estado catabólico neuro-hormonal.',
          clinicalMeaning: 'ICC avançada ou descompensação — reavaliar estágio, apetite e função renal.',
          priority: 'systemic',
        },
        {
          finding: 'Síncope ou pré-síncope',
          mechanism: 'Arritmia, reflexo neuromediado ou queda transitória de débito.',
          clinicalMeaning: 'ECG imediato; Holter se recorrente. Não atribuir automaticamente a “tosse intensa”.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'hepatic',
      findings: [
        {
          finding: 'Hepatomegalia ou ascite',
          mechanism:
            'Regurgitação tricúspide associada ou hipertensão pulmonar secundária elevam pressão venosa sistêmica.',
          clinicalMeaning: 'ICC direita ou biventricular — olhar o lado esquerdo e a pressão pulmonar ao eco.',
          priority: 'heart-failure',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticPlanStepByStep: [
      {
        stepNumber: 1,
        title: 'Ausculta, história e estabilidade',
        purpose: 'Identificar sopro mitral, sinais de congestão e necessidade de emergência.',
        description:
          'Foco mitral esquerdo, irradiação, pulso, frequência, FR de sono relatada pelo tutor, tosse, síncope, dispneia. Se dispneia em repouso: oxigênio primeiro (Nelson & Couto, 6ª ed.; Keene et al., 2019).',
        interpretation: 'Sopro sistólico esquerdo em cão pequeno idoso = DMVD até o eco.',
        limitations: 'Intensidade do sopro não substitui medidas ecocardiográficas.',
      },
      {
        stepNumber: 2,
        title: 'Ecocardiografia completa',
        purpose: 'Confirmar a lesão, quantificar regurgitação e decidir B1 versus B2.',
        description:
          'Espessamento/prolapso, jato regurgitante, LA/Ao, LVIDDN, função sistólica, tricúspide e estimativa de pressão pulmonar (Keene et al., 2019).',
        interpretation: 'Critérios de B2 dependem de medidas normalizadas — comparar com o consenso, não com “impressão”.',
        limitations: 'Eco normal hoje não exclui progressão futura.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Estadiamento ACVIM A–D',
        purpose: 'Transformar imagem e clínica em conduta.',
        description:
          'A: risco sem lesão. B1: lesão sem remodelação relevante. B2: remodelação pré-clínica com critérios. C: ICC atual ou prévia. D: refratário ao padrão de C (Keene et al., 2019).',
        interpretation: 'B2 abre pimobendan pré-clínico; C/D exigem terapia congestiva.',
        limitations: 'Estadiar só pela radiografia ou só pelo sopro superestima ou subestima gravidade.',
      },
      {
        stepNumber: 4,
        title: 'Radiografia torácica',
        purpose: 'Documentar congestão, VHS e compressão de vias aéreas.',
        description:
          'Veias pulmonares, padrão intersticial/alveolar, derrame pleural, silhueta cardíaca (Nelson & Couto, 6ª ed.).',
        interpretation: 'Edema confirma descompensação congestiva. Cardiomegalia sem edema não é ICC.',
        limitations: 'Não substitui o eco para quantificar regurgitação nem para B2.',
      },
      {
        stepNumber: 5,
        title: 'ECG e laboratório',
        purpose: 'Ritmo, basal renal e apoio em casos limítrofes.',
        description:
          'ECG se irregularidade, taquicardia ou síncope. Hemograma e bioquímica antes de SRAA + diurético. NT-proBNP auxiliar, não substitui imagem (Keene et al., 2019).',
        interpretation: 'Creatinina basal orienta introdução segura de IECA. FA rápida explica descompensação súbita.',
        limitations: 'BNP isolado não define estágio.',
      },
    ],
    dmvdClinicaAusculta:
      'O sopro típico é sistólico, em foco mitral (ápice esquerdo), podendo irradiar dorsalmente. Palpar pulso simultâneo à ausculta ajuda a detectar déficit. Ortopneia, cianose ou FR muito alta = estabilizar antes de insistir em ausculta prolongada. Documentar raça, idade, medicamentos e se a tosse começa com honking/coleira (respiratório) ou com taquipneia de sono (congestão) (Nelson & Couto, 6ª ed.).',
    dmvdEcocardiografiaPadraoOuro:
      'O eco confirma que o sopro é mitral, mede remodelação e detecta complicações (ruptura de corda, hipertensão pulmonar, disfunção sistólica, trombo atrial raro). Para B2, o consenso privilegia LA/Ao ≥1,6 e LVIDDN ≥1,7 no contexto de sopro ≥3/6 — não um “AE um pouco aumentado” isolado (Keene et al., 2019).',
    dmvdEstadiamentoAcvimTabela: {
      kind: 'clinicalTable',
      title: 'Estadiamento ACVIM — o que muda na conduta',
      headers: ['Estágio', 'O que é', 'Conduta típica'],
      rows: [
        ['A', 'Raça/risco sem lesão valvar atual', 'Educação e rastreio; sem fármaco cardíaco'],
        ['B1', 'Lesão (sopro/regurgitação) sem remodelação que cumpra B2', 'Observar; imagem em 6–12 meses'],
        ['B2', 'Pré-clínico com remodelação hemodinamicamente relevante', 'Pimobendan; FR de sono; seguimento mais estreito'],
        ['C', 'ICC atual ou prévia atribuível à DMVD', 'Diurético + pimobendan ± SRAA; internar se dispneia em repouso'],
        ['D', 'ICC refratária ao tratamento padrão de C', 'Estratégia avançada, qualidade de vida, referência'],
      ],
    },
    dmvdCriteriosB2Tabela: {
      kind: 'clinicalTable',
      title: 'Critérios clássicos de B2 (ACVIM 2019) — usar em conjunto',
      headers: ['Critério', 'Referência operacional'],
      rows: [
        ['Sopro de regurgitação mitral', '≥ 3/6'],
        ['Relação átrio esquerdo / aorta (LA/Ao)', '≥ 1,6 (eixo curto direito, 2D)'],
        ['Diâmetro interno diastólico do VE normalizado (LVIDDN)', '≥ 1,7'],
        ['VHS ajustado à raça', '> 10,5; cardiomegalia radiográfica inequívoca pode apoiar se não houver eco'],
        ['Como decidir', 'Integrar o conjunto. Valor isolado limítrofe não transforma automaticamente em B2'],
      ],
    },
    dmvdRadiografiaTorax:
      'Papel: congestão, resposta ao diurético, VHS e, em AE muito dilatado, compressão do brônquio principal esquerdo (tosse). Limite: fotografia estática — não mede regurgitação nem decide B2 sozinha. Veias pulmonares distendidas e padrão intersticial/alveolar sustentam ICC esquerda; silhueta grande sem edema = remodelação, não crise congestiva.',
    dmvdRadiografiaToraxNormalVsCardiomegalia: {
      kind: 'clinicalFigure',
      src: '/assets/consulta-vet/dmvd-rx-torax-normal-vs-cardiomegalia-ortocanis.png',
      alt:
        'Comparativo em duas radiografias laterais de tórax canino: painel esquerdo com tórax de aspecto normal; painel direito com cardiomegalia (coração ampliado, menor campo pulmonar visível, traqueia empurrada dorsalmente).',
      caption:
        'Esquerda: tórax normal. Direita: cardiomegalia — aumento da silhueta cardíaca em projeção lateral, com menos espaço pulmonar e elevação dorsal da traqueia. Fonte: Ortocanis. Cardiomegalia ≠ edema pulmonar.',
    },
    dmvdEletrocardiograma:
      'ECG de consultório captura o ritmo do momento (FA, ectopia, bloqueios). Não rastreia ectopia intermitente — Holter se síncope recorrente. FA com resposta rápida é causa tratável de descompensação: não subir só o diurético.',
    dmvdBiomarcadoresLaboratorio:
      'NT-proBNP pode ajudar em tosse/dispneia limítrofe (cardíaco versus respiratório), mas não substitui imagem nem define estágio. Hemograma e bioquímica são basais antes de SRAA + diurético. Repetir creatinina, ureia e eletrólitos após mudanças terapêuticas ou descompensação (Keene et al., 2019).',
    dmvdTosseCardiacaVsRespiratoria: {
      kind: 'clinicalTable',
      title: 'Tosse na DMVD — nem sempre é edema',
      headers: ['Quadro', 'Como pensar', 'Conduta'],
      rows: [
        [
          'Tosse + FR de sono normal + radiografia sem congestão',
          'Compressão brônquica por AE ou doença respiratória concomitante',
          'Não iniciar diurético só pela tosse; tratar via aérea / peso / irritantes',
        ],
        [
          'Tosse + FR de sono alta + veias pulmonares / edema',
          'ICC esquerda até prova em contrário',
          'Estabilizar congestão; depois reestadiar',
        ],
        [
          'Tosse honking + coleira + raça toy',
          'Colapso traqueal pode coexistir com DMVD',
          'Não atribuir toda tosse ao sopro nem toda tosse à traqueia',
        ],
      ],
    },
    dmvdDiferenciaisDiagnosticos: {
      kind: 'clinicalTable',
      title: 'Diagnósticos diferenciais essenciais',
      headers: ['Condição', 'Dica prática'],
      rows: [
        ['Cardiomiopatia dilatada', 'Cão grande, disfunção sistólica primária; regurgitação mitral pode ser funcional'],
        ['Ruptura de corda tendínea', 'Edema agudo, sopro que muda, emergência'],
        ['Endocardite infecciosa', 'Febre, sopro novo, sinais sistêmicos — não é DMVD'],
        ['Doença respiratória crônica / colapso traqueal', 'Tosse sem cardiomegalia proporcional; FR de sono e NT-proBNP auxiliam'],
        ['ICC por outra causa (HAS, DMA)', 'Eco e contexto separam; não assumir que todo sopro é mixomatoso'],
      ],
    },
    dmvdSeguimentoMonitorizacao:
      'B1: reavaliação clínica/imagem em geral a cada 6–12 meses. B2 e C: intervalos menores, combinando peso, FR de sono, apetite, esforço e laboratório renal. Após diurese agressiva, reduzir para a menor dose que mantém conforto — hipoperfusão renal iatrogênica é comum. Reestadiar se surgir FA, síncope ou tosse nova.',
  },
  treatment: {
    dmvdEstrategiaPorEstagioAcvim:
      'A conduta segue o estágio, não o “tamanho do sopro”. A/B1: educação, peso, exercício sensato e observação. B2 com critérios reunidos: pimobendan (EPIC/ACVIM) e monitorização da FR de sono. C: tratar congestão primeiro, depois o pacote oral (pimobendan + diurético ± IECA/espironolactona). D: intensificar com realismo, qualidade de vida e referência. O consenso ACVIM 2019 é a âncora; o ACVIM 2009 permanece só como documento histórico (Keene et al., 2019).',
    preclinica: [
      'Keene et al. (2019), nas diretrizes ACVIM, não recomendam polifarmácia em B1 — observar e reavaliar.',
      'Boswood et al. (2016), no ensaio EPIC (cães com DMVD pré-clínica e cardiomegalia = B2), mostraram que pimobendan retardou ICC ou morte cardíaca versus placebo. Dose de referência ~0,25–0,3 mg/kg VO q12h, em formulação sólida veterinária.',
    ],
    aguda: [
      'Keene et al. (2019): na ICC aguda com hipóxia ou dispneia em repouso, oxigênio e diurético parenteral prevalecem sobre titulação fina de IECA. Furosemida EV frequentemente ~2 mg/kg IV, repetida conforme resposta. Nitroprussiato só em hospital com monitorização de pressão.',
    ],
    cronica: [
      'Keene et al. (2019): pimobendan em B2 (critérios), C e D; IECA quando perfusão e pressão permitem, com laboratório 5–10 dias após o início.',
      'Budde e McCluskey (2023), no Plumb’s (10ª ed.): furosemida na menor dose eficaz após estabilização; torasemida com equivalência aproximada 1:10 se refratariedade.',
      'Keene et al. (2019): espironolactona ~2–4 mg/kg/dia como adjuvante em ICC avançada selecionada, com vigilância de potássio e rim.',
    ],
    dmvdIccAgudaHospitalar:
      'Ordem prática: (1) mínima manipulação e oxigênio; (2) diurético EV titulado à FR e ao esforço; (3) pimobendan assim que a via oral for segura; (4) ECG se ritmo irregular; (5) IECA só depois de euvolemia relativa e creatinina de referência. Se diurético máximo não muda o quadro, pensar pneumonia, tromboembolismo ou obstrução — não “só subir a furosemida”.',
    farmacos: {
      kind: 'clinicalTable',
      title: 'Consulta rápida de fármacos — DMVD / ICC',
      headers: ['Fármaco', 'Papel', 'Dose prática citada', 'Cautela'],
      rows: [
        [
          'Pimobendan',
          'Inodilatação: B2 com critérios, C e D',
          '~0,25–0,5 mg/kg BID ou TID; referência ACVIM/EPIC ~0,25–0,3 mg/kg q12h. Comprimido/cápsula veterinária (Vetmedin, Cardisure). Jejum ~1 h.',
          'Não equivaler líquido manipulado. Não substitui diurético na congestão aguda.',
        ],
        [
          'Furosemida',
          'Congestão aguda e manutenção',
          'Emergência: ~2 mg/kg IV, repetir conforme resposta (alguns protocolos até ~8 mg/kg/d). Manutenção: menor dose oral eficaz (ponte ~2 mg/kg TID 3–5 dias → BID).',
          'Eletrólitos, creatinina, hidratação. Tosse sem edema ≠ indicação.',
        ],
        [
          'Torasemida',
          'Diurético de alça se refratariedade à furosemida',
          'Partida ~1:10 em relação à furosemida; titular',
          'Mesmo risco de alça + azotemia',
        ],
        [
          'Espironolactona',
          'Antagonista da aldosterona; ICC avançada / bloqueio do néfron',
          '~2–4 mg/kg/dia',
          'Hipercalemia com IECA; rim',
        ],
        [
          'IECA (benazepril, enalapril)',
          'SRAA na ICC estável (após euvolemia)',
          'Faixa ampla ~0,25–0,5 mg/kg q12–24h (prática até ~2 mg/kg BID em titulação); benazepril também via hepática',
          'Laboratório 5–10 dias; hipotensão; não no desidratado',
        ],
        [
          'Nitroprussiato / dobutamina',
          'Hospital: vasodilatação / inotropismo na ICC grave',
          'Nitroprussiato ~0,5 mcg/kg/min titulado (raramente >~4); dobutamina ordem ~5–10 mcg/kg/min',
          'PA invasiva ou serial; nitroprussiato ~24 h (cianeto)',
        ],
        [
          'Isosorbida dinitrato',
          'Vasodilatador oral em alguns protocolos de D',
          '~0,25–0,5 mg/kg BID',
          'Tolerância com uso crônico',
        ],
        [
          'Amlodipino',
          'HAS sistêmica; adjuvante selecionado',
          '~0,2–0,5 mg/kg SID (inícios mais baixos se HP)',
          'Confirmar pressão; hipotensão',
        ],
        [
          'Digoxina (opcional)',
          'Controle de frequência em FA selecionada',
          'Conforme monografia e função renal',
          'Índice terapêutico estreito',
        ],
      ],
    },
    dmvdPimobendanFormaJeJumMarcas:
      'Forma farmacêutica importa: especialidade veterinária em comprimido/cápsula padroniza a exposição. Líquidos, géis ou “biscoitos” magistrais têm biodisponibilidade imprevisível — não assumir equivalência mg a mg.\n\n' +
      'Marcas consolidadas (Vetmedin 1,25 e 5 mg; Cardisure 1,25, 5 e 10 mg) são preferidas por consistência de lote. Muitos serviços administram em jejum, ~1 h antes da refeição, comprimido intacto.\n\n' +
      'Titulação: a âncora é ~0,25–0,3 mg/kg q12h (EPIC/ACVIM). Na prática, ~0,25–0,5 mg/kg BID ou TID conforme resposta. Incrementos agressivos (relatos até ~2 mg/kg/d) são experiência isolada, fora do textbook — só com monitorização e consentimento.\n\n' +
      'Efeitos adversos: diarreia é a mais comum; vômito menos frequente.',
    dmvdFurosemidaAgudaCronicaTorasemida:
      'Emergência: ~2 mg/kg IV, repetir conforme FR, esforço, PA e diurese. Se não há alívio, reavalie o diagnóstico (não cardiogênico) antes de só subir a dose.\n\n' +
      'Transição oral: cães pequenos frequentemente precisam de manipulação (comprimido humano 40 mg). Ponte citada: ~2 mg/kg TID por 3–5 dias, depois BID na menor dose eficaz.\n\n' +
      'Refratariedade: torasemida (partida ~1:10) e, no teto, bloqueio sequencial do néfron (alça + tiazídico + espironolactona) com laboratório intenso.',
    dmvdEspironolactonaBloqueioNefron:
      'Espironolactona atenua aldosterona e poupa potássio. Dose comum ~2–4 mg/kg/dia.\n\n' +
      'Bloqueio do néfron (alça + tiazídico + espironolactona) é reserva de ICC refratária: espera-se mais azotemia — às vezes aceitável para conforto terminal, com transparência ao tutor. Não é o primeiro passo em B2 ou C estável.',
    dmvdIecaBenazeprilEnalapril:
      'Introduzir IECA na ICC estável, euvolêmico, com creatinina de referência — não no desidratado da emergência. Enalapril depende mais de rim; benazepril também tem via hepática. Repetir laboratório 5–10 dias após o início (Keene et al., 2019; Plumb’s, 10ª ed.).',
    dmvdIsosorbidaVasodilatadorOral:
      'Isosorbida dinitrato aparece em alguns protocolos de ICC refratária (~0,25–0,5 mg/kg BID). Tolerância farmacológica pode reduzir o efeito crônico. Titular por PA e congestão — não é rotina de B2.',
    dmvdAnlodipinoHipertensao:
      'Amlodipino trata hipertensão sistêmica e pode ser adjuvante vasodilatador. Doses frequentes ~0,2–0,5 mg/kg SID. Hipertensão pulmonar exige confirmação ao eco; não confundir com “abrir a mitral”.',
    dmvdUrgenciaHospitalarVasodilatadoresInotropicos:
      'Exclusivo de hospital com monitorização de PA.\n\n' +
      'Nitroprussiato: infusão a partir de ~0,5 mcg/kg/min; raramente >~4 mcg/kg/min de forma sustentada; janela comum até ~24 h (cianeto).\n\n' +
      'Dobutamina: ponte inotrópica (~5–10 mcg/kg/min) até otimizar diurético e pimobendan. Se vasodilatação + diurético máximo falham, a hipótese deixa de ser “só ICC”.',
    dmvdArrhythmiasFrequenciaCardiaca:
      'FA com resposta ventricular rápida é o complicador mais comum na DMVD avançada. Controle de frequência (digoxina ou outros agentes conforme experiência e rim) pode valer mais do que mais um diurético. Anticoagulação não é rotina canina como no humano — decisão de centro. Holter se síncope sem ritmo documentado.',
    errosComuns: [
      'Tratar B1 com “cóctel cardíaco” porque há sopro — o consenso reserva fármaco para B2/C/D.',
      'Chamar de B2 um único LA/Ao ou VHS limítrofe, sem o conjunto de critérios.',
      'Prescrever furosemida para tosse com FR de sono normal e radiografia sem congestão.',
      'Iniciar IECA no paciente desidratado da emergência, antes da euvolemia.',
      'Equivaler pimobendan líquido manipulado ao comprimido veterinário.',
      'Atribuir toda tosse do cão pequeno idoso ao sopro (ou toda tosse ao colapso traqueal) sem eco e FR de sono.',
      'Ignorar FA rápida como causa de descompensação.',
      'Manter diurético alto depois que o edema saiu, gerando azotemia iatrogênica.',
    ],
    dmvdNotaCirurgicaValvar:
      'Reparo mitral (anuloplastia, cordas, clip) existe em poucos centros, com seleção rigorosa de caso, custo e equipe. Para a maioria das práticas, o pilar permanece clínico (Keene et al., 2019).',
    dmvdPrognosticoLongitudinal:
      'Doença estruturalmente progressiva, mas muitos cães em B1/B2 vivem anos com boa qualidade de vida. Pioram o prognóstico: ICC recorrente, hipertensão pulmonar, FA, azotemia progressiva e ruptura de corda. Objetivo com o tutor: conforto respiratório e apetite — não “abolir o sopro”.',
    monitoramento: [
      'Tutor: frequência respiratória durante o sono, esforço, tosse, síncope, apetite e peso.',
      'Creatinina, ureia e eletrólitos 5–10 dias após iniciar ou aumentar IECA, espironolactona ou diurético de alça; depois conforme estabilidade.',
      'Peso semanal na titulação de diurético — desidratação piora azotemia mesmo com “ICC controlada”.',
      'Radiografia quando a dispneia recorre, comparando com o baseline.',
      'Eco seriado em B2/C para ajustar expectativa e detectar hipertensão pulmonar ou queda da função sistólica.',
    ],
  },
  prevention: {
    rastreio:
      'Ausculta anual (ou a cada consulta geriátrica) em raças predispostas. Sopro novo → eco para estadiar, não receita automática (Keene et al., 2019).',
    tutor:
      'Ensinar a contar a frequência respiratória durante o sono. Subida persistente, esforço em repouso, síncope ou tosse noturna crescente = retorno antecipado.',
    pesoExercicio:
      'Obesidade aumenta trabalho respiratório e mascara progressão. Exercício: permitir o que o cão tolera sem taquipneia prolongada; evitar calor e excitação extrema na ICC.',
    reproducao:
      'Não há prevenção primária populacional além de programas de criação que evitam linhagens com alta prevalência precoce (especialmente Cavalier). Não existe vacina nem “suplemento que endurece a valva”.',
  },
  relatedConsensusSlugs: ['acvim-mmvd-canina-2019', 'consenso-cardiorrenal-2015'],
  relatedMedicationSlugs: ['pimobendan', 'benazepril', 'diltiazem', 'digoxina'],
  relatedDiseaseSlugs: ['hipertensao-arterial-sistemica-caes-gatos', 'cardiomiopatia-dilatada-caes-gatos', 'colapso-traqueal-canino'],
  references: [
    {
      id: 'ref-acvim-mvd',
      citationText:
        'Keene BW, Atkins CE, Bonagura JD, et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33:1127–1140.',
      sourceType: 'Consenso',
      url: 'https://doi.org/10.1111/jvim.15488',
      evidenceLevel: 'Alta',
      notes: 'Fonte-âncora de estadiamento A–D, critérios de B2 e tratamento por fase.',
    },
    {
      id: 'ref-epic-pimobendan',
      citationText:
        'Boswood A, Häggström J, Gordon SG, et al. Effect of pimobendan in dogs with preclinical myxomatous mitral valve disease and cardiomegaly: the EPIC study. J Vet Intern Med. 2016;30:1765–1779.',
      sourceType: 'Ensaio clínico',
      url: 'https://doi.org/10.1111/jvim.14586',
      evidenceLevel: 'Alta',
      notes: 'Pimobendan em B2 retarda ICC ou morte cardíaca.',
    },
    {
      id: 'ref-nelson-cardio',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020 — acquired cardiac diseases, mitral regurgitation.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Clínica, imagem, tosse versus congestão, história natural.',
    },
    {
      id: 'ref-plumb-cardio',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023 — pimobendan, benazepril, furosemida, espironolactona.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-cunningham-cardiac-output',
      citationText:
        'Klein BG. Cunningham’s Textbook of Veterinary Physiology. 6th ed. 2020 — função cardíaca, débito e sobrecarga de volume.',
      sourceType: 'Fisiologia',
      url: null,
      evidenceLevel: 'Didático',
    },
  ],
  isPublished: true,
  source: 'seed',
};
