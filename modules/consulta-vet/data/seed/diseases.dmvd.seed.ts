import type { DiseaseRecord } from '../../types/disease';

/** Doença valvar mitral degenerativa (DMVD) / endocardiose mixomatosa — foco cão pequeno (ACVIM 2019, Nelson & Couto, EPIC, Plumb’s). */
export const doencaValvarMitralDegenerativaRecord: DiseaseRecord = {
  id: 'disease-dmvd-caes',
  slug: 'doenca-valvar-mitral-degenerativa-caes',
  title: 'Doença valvar mitral degenerativa (DMVD / endocardiose)',
  synonyms: [
    'DMVD',
    'Endocardiose degenerativa',
    'Doença da valva mitral',
    'Myxomatous mitral valve disease',
    'MMVD',
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
    'A DMVD (endocardiose mixomatosa da valva mitral) é a cardiopatia adquirida mais frequente em cães de pequeno porte: as folhetos mitrais tornam-se espessados, encurtados e incompetentes, permitindo regurgitação sistólica da câmara esquerda para o átrio esquerdo. Com o tempo, aumenta o volume regurgitante, a sobrecarga de volume do ventrículo esquerdo (VE) e a pressão no leito capilar pulmonar — primeiro com remodelação compensatória (hipertrofia excêntrica, aumento diastólico), depois com disfunção sistólica, taquiarritmias (especialmente fibrilação atrial) e insuficiência cardíaca congestiva (ICC). O sopro sistólico em foco mitral esquerdo é o achado mais comum, mas a intensidade do ruído não traduz de forma linear a gravidade hemodinâmica. O estadiamento ACVIM (A–D) integra presença de lesão, grau de remodelação ao ecocardiograma e presença de sinais de ICC; em B2, quando critérios ecocardiográficos de remodelação relevante são atingidos, há base de evidência e consenso para considerar pimobendan antes do aparecimento de ICC clínica (estudo EPIC e diretriz ACVIM). O tratamento da ICC congestiva combina diuréticos, inodilatação (pimobendan), modulação do sistema renina–angiotensina–aldosterona (RAAS) quando tolerado, controle de frequência em taquiarritmias e manejo de comorbidades; a monitorização de creatinina e eletrólitos é obrigatória ao associar IECA, diurético e baixo débito.',
  quickDecisionStrip: [
    'Sopro sistólico esquerdo em cão pequeno idoso: trate como DMVD provável até ecocardiografia — mas intensidade do soprinho não substitui medidas.',
    'Pimobendan: priorizar cápsulas/comprimidos de especialidade veterinária; evitar formulações líquidas ou géis manipulados com biodisponibilidade duvidosa — muitos serviços administram em jejum (~1 h antes da refeição).',
    'Ecocardiografia define grau de regurgitação, remodelação e função; radiografia apoia congestão, não “estádio” isolado.',
    'ACVIM B2 com critérios de remodelação: discuta pimobendan com base em evidência (EPIC) e no protocolo do seu serviço.',
    'ICC descompensada: congestão primeiro (diurético, oxigênio, estabilização); pimobendan; IECA se perfusão renal e pressão arteriais permitirem — vigiar azotemia.',
    'Fibrilação atrial rápida: frequência mal controlada piora sintomas e congestão — plano antiarrítmico ou controle de frequência conforme caso.',
    'Creatinina em ascenso com IECA + diurético: repense doses, hidratação e timing — ICC “resolvida” com rim sob estresse é cenário frequente.',
  ],
  quickSummaryRich: {
    lead:
      'A DMVD não é “só um soprinho”: é uma doença valvar progressiva em que a incompetência mitral aumenta o trabalho do VE e, por fim, o enchimento capilar pulmonar. O mesmo animal pode permanecer anos compensado com ruído audível, ou evoluir rapidamente para edema pulmonar e dispneia. Por isso o ecocardiograma e o estadiamento ACVIM não são luxo — são o que separam vigilância de tratamento com meta, e tratamento de emergência de manejo paliativo.',
    leadHighlights: ['DMVD', 'ACVIM', 'regurgitação', 'EPIC'],
    pillars: [
      {
        title: 'Por que o soprinho engana',
        body:
          'Grau de soprinho (I–VI) reflete turbulência audível, não necessariamente volume regurgitante, pressão atrial nem tempo de enchimento capilar. Soprinho suave com átrio esquerdo enorme pode ser mais grave que soprinho “forte” com pouca remodelação — só a imagem e o contexto clínico fecham o raciocínio.',
        highlights: ['turbulência', 'remodelação'],
      },
      {
        title: 'Estádios A–D: decisões diferentes',
        body:
          'A: predisposto sem lesão. B1: lesão sem remodelação significativa. B2: remodelação com critérios — ponto em que a literatura discute pimobendan pré-clínico. C: ICC atual ou prévia documentada. D: ICC refratária ao esquema habitual. Confundir B1 com B2 ou C com “tosse crônica” custa tempo e qualidade de vida.',
        highlights: ['B2', 'ICC'],
      },
      {
        title: 'Três eixos terapêuticos na prática',
        body:
          'Congestão (diuréticos e manejo de fluidos), contratilidade/vasodilatação com pimobendan onde indicado, e RAAS (IECA/BRA) com monitorização renal. Arritmias e hipertensão pulmonar secundária são complicadores que mudam prognóstico e doses.',
        highlights: ['pimobendan', 'RAAS'],
      },
    ],
    diagnosticFlow: {
      title: 'Diagnóstico e estadiamento (visão de fluxo)',
      steps: [
        {
          label: '1. Escuta e contexto',
          detail:
            'Localizar foco mitral; palpar pulso e frequência; buscar dispneia, intolerância ao exercício, síncope, tosse (nem sempre cardíaca). Documentar raça, idade e histórico vacinal/medicamentos.',
        },
        {
          label: '2. Ecocardiografia completa',
          detail:
            'Quantificar regurgitação, espessamento valvar, dimensões diastólicas do VE e do AE, função sistólica (fractional shortening ou Simpson conforme experiência), estimar pressão pulmonar se sinais sugerem hipertensão pulmonar.',
        },
        {
          label: '3. Classificar ACVIM',
          detail:
            'Registrar estágio A–D; em pré-clínico, verificar se critérios de B2 são atingidos segundo consenso vigente — isso altera conversa sobre pimobendan e intervalo de seguimento.',
        },
        {
          label: '4. Radiografia quando indicado',
          detail:
            'Útil para congestão, VHS e padrão bronquial; não substitui medidas ao eco para “B2”.',
        },
        {
          label: '5. Laboratório estratégico',
          detail:
            'Hemograma e bioquímica antes de instituir IECA + diurético contínuo; NT-proBNP pode ajudar em casos limítrofes ou seguimento, conforme disponibilidade.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento por fase (síntese)',
      steps: [
        {
          label: 'Pré-clínico B1',
          detail:
            'Observação periódica; controle de peso e exercício sensato; sem necessidade automática de “cóctel cardíaco”.',
        },
        {
          label: 'Pré-clínico B2',
          detail:
            'Se critérios ACVIM atendidos: considerar pimobendan conforme diretriz e discussão com tutor; seguimento eco seriado.',
        },
        {
          label: 'ICC estádio C',
          detail:
            'Diurético para congestão; pimobendan; IECA se tolerado; tratar desencadeantes (infecção, arritmia); internar se dispneia em repouso ou hipóxia.',
        },
        {
          label: 'Refratário D',
          detail:
            'Otimizar combinações com realismo; considerar espironolactona, hidralazina ou digoxina em protocolos selecionados; qualidade de vida e decisões éticas explícitas.',
        },
      ],
    },
  },
  etiology: {
    dmvdAnatomiaMixomatose:
      'A lesão primária é a degeneração mixomatosa dos folhetos valvares: acúmulo de glicosaminoglicanos e alteração do colágeno tornam a valva espessa, nodular e com aposição incompleta durante a sístole. O anel mitral pode dilatar secundariamente, piorando a incompetência. O processo é crônico e tipicamente bilateral no tempo: a valva tricúspide degenera em parte significativa dos casos avançados, contribuindo para sobrecarga de câmaras direitas e ascensão de pressões venosas sistêmicas.',
    dmvdPredisposicaoRacial:
      'Predomínio em raças pequenas e miniaturas (poodle, yorkshire, Cavalier King Charles Spaniel, chihuahua, entre outras). Há componente hereditário reconhecido em linhagens estudadas; o risco relativo por raça modula a frequência em populações de consultório, mas qualquer cão idoso pode desenvolver alteração valvar degenerativa.',
    dmvdValvaTricuspideNota:
      'Regurgitação tricúspide degenerativa frequentemente coexiste em estádios avançados. Quando acentuada, aumenta o retorno venoso hepático e pode mascarar ou somar sinais de congestão sistêmica; ao eco, integra a avaliação de hipertensão pulmonar e direita.',
    visaoGeral:
      'Em suma: DMVD não é infecciosa nem “inflamatória” no sentido clássico — é uma doença estrutural valvar progressiva, modulada por genética, envelhecimento e possivelmente fatores hemodinâmicos locais (cisalhamento, tensão nas cordas tendíneas). O fenótipo final comum é insuficiência mitral com tempo de evolução variável.',
  },
  epidemiology: {
    perfil:
      'É provavelmente a cardiopatia adquirida mais comum em cães em geral, com pico de impacto clínico em animais de porte reduzido e meia-idade a idosos. A progressão é altamente variável: há cães com soprinho estável por anos e outros que progridem para ICC em meses.',
    dmvdPrevalenciaEIdade:
      'Estudos de população e de raças predispostas mostram prevalência crescente com idade; em algumas linhagens, alterações ecocardiográficas subclínicas aparecem precocemente. Isso reforça o valor do rastreio auscultatório em reprodução e em programas de saúde geriátrica, sem transformar todo achado em tratamento imediato — o estádio ACVIM guia a intensidade.',
  },
  pathogenesisTransmission: {
    nota:
      'Não há transmissão entre animais. A evolução natural segue um ciclo de sobrecarga de volume: regurgitação mitral → aumento do volume diastólico final do VE → aumento do trabalho sistólico e da tensão parietal → remodelação excêntrica → com tempo, disfunção sistólica e elevação das pressões de enchimento esquerda → congestão pulmonar e, em fases tardias, baixo débito.',
    dmvdCicloHemodinamico:
      'O VE tenta compensar aumentando o volume de ejeção para manter débito sistêmico; o AE dilata para acomodar o volume regurgitante. Quando a função sistólica declina ou a regurgitação aumenta de forma descontrolada, eleva-se a pressão capilar pulmonar e desenvolve-se edema intersticial e alveolar.',
    dmvdNeurohumoralIcc:
      'Com a queda relativa de débito efetivo, ativam-se sistemas neuro-humorais (simpático, RAAS, vasopressina). A retenção de sódio e água pode ser adaptativa no início e maladaptativa na ICC estabelecida — daí o papel dos diuréticos e moduladores do RAAS, sempre com vigilância renal.',
    dmvdComplicacoesEletro:
      'Distúrbios de condução e taquiarritmias surgem por fibrose, distensão atrial e hipóxia. A fibrilação atrial com resposta ventricular rápida encurta o tempo diastólico de enchimento e pode precipitar descompensação congestiva mesmo com regurgitação de grau semelhante.',
  },
  pathophysiology: {
    dmvdSobrecargaVolumeRemodelacao:
      'A regurgitação crônica impõe ao VE uma pré-carga elevada repetidamente. Inicialmente prevalece remodelação excêntrica (aumento de volume diastólico). Com progressão, podem surgir fibrose miocárdica, alteração da relaxação e redução da contratilidade medida ao eco.',
    dmvdFuncaoSistolicaDescompensacao:
      'Quando a função sistólica cai, o sistema entra mais facilmente em baixo débito: hipoperfusão renal (ativação adicional do RAAS), fraqueza, piora do apetite e risco de azotemia iatrogênica ao se somarem diurético e IECA.',
    dmvdCirculacaoPulmonarEdema:
      'O edema pulmonar cardiogênico reflete aumento da pressão hidrostática capilar. O padrão radiográfico e a gravidade clínica nem sempre coincidem com o “grau” de soprinho — paciente com pouco ruído e muito edema já foi descrito em contextos de descompensação aguda.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'cardiovascular',
      findings: [
        'Sopro sistólico com máximo em foco mitral esquerdo (com radiação variável); frequência cardíaca pode estar elevada em descompensação ou taquiarritmia.',
        'Pulso pode ser fraco ou variável com arritmia; tempo de enchimento capilar prolongado sugere baixo débito.',
        'Pulsos paradoxais ou enfraquecidos exigem pensar em tamponamento ou outras causas — não são típicos da DMVD isolada.',
      ],
    },
    {
      system: 'respiratory',
      findings: [
        'Dispneia de esforço evoluindo para ortopneia ou dispneia em repouso; aumento do esforço abdominal respiratório.',
        'Tosse: pode existir em congestão, mas também em doença respiratória concomitante — não atribua tudo à DMVD sem critério.',
        'Crackles à ausculta pulmonar em edema alveolar; esforço inspiratório aumentado.',
      ],
    },
    {
      system: 'general',
      findings: [
        'Intolerância ao exercício, letargia, perda de massa muscular em ICC crônica.',
        'Síncope ou pré-síncope: reflexo neuromediado, arritmia ou, menos comum, baixo débito — correlacionar com ECG Holter se recorrente.',
      ],
    },
    {
      system: 'hepatic',
      findings: [
        'Hepatomegalia com congestão direita ou ascite em insuficiência direita avançada / hipertensão pulmonar secundária.',
      ],
    },
  ],
  diagnosis: {
    dmvdClinicaAusculta:
      'A ausculta é porta de entrada: soprinho sistólico em região mitral, frequentemente com irradiação dorsal. Batimentos extras ou ritmo irregular sugerem arritmia. Insuficiência valvar aguda não degenerativa (ex.: ruptura de corda) pode produzir murmúrio novo e descompensação fulminante — história e eco diferenciam. Palpação de pulso, frequência e qualidade do padrão respiratório completam o triângulo inicial.',
    dmvdEcocardiografiaPadraoOuro:
      'Ecocardiografia bidimensional e Doppler colorido são padrão para quantificar espessamento e prolapsamento valvar, extensão da regurgitação, volume do AE, dimensões diastólicas e sistólicas do VE, espessura parietal e estimativa de pressão de enchimento indireta. O Doppler contínuo ajuda a estimar pressão pulmonar quando há tricúspide insuficiente ou shunt fisiológico mínimo avaliável. Modos M e medidas lineares devem seguir o protocolo interno ou o consenso citado para comparabilidade seriada.',
    dmvdEstadiamentoAcvimTabela: {
      kind: 'clinicalTable',
      headers: ['Estágio ACVIM', 'Definição operacional (síntese clínica)'],
      rows: [
        [
          'A',
          'Predisposto — raça/risco sem lesão valvar detectável ao exame atual.',
        ],
        [
          'B1',
          'Lesão valvar documentada (sopro/regurgitação) sem remodelação cardíaca significativa segundo critérios do consenso.',
        ],
        [
          'B2',
          'Remodelação cardíaca com critérios ecocardiográficos de gravidade pré-clínica — ponto de decisão para pimobendan conforme diretriz e discussão informada.',
        ],
        [
          'C',
          'História ou sinais atuais de ICC (dispneia, edema pulmonar, congestão relevante documentada).',
        ],
        [
          'D',
          'ICC refratária ao tratamento padrão — necessidade de combinações adicionais e foco em qualidade de vida.',
        ],
      ],
    },
    dmvdRadiografiaTorax:
      'Radiografia lateral e dorsoventral: escore de coração (VHS), veias pulmonares distendidas, padrão intersticial ou alveolar em congestão, derrame pleural em casos selecionados. A radiografia apoia o manejo da ICC e a resposta ao diurético; não substitui o eco para medir AE/VE ou grau de regurgitação.\n\n' +
      'Na DMVD avançada, a silhueta cardíaca pode mostrar cardiomegalia com predomínio de câmaras esquerdas; em alguns casos o átrio esquerdo muito dilatado comprime o brônquio principal esquerdo — achado que ajuda a correlacionar imagem com tosse ou ruídos respiratórios. Na subsecção seguinte há um comparativo radiográfico lateral (tórax normal × cardiomegalia).',
    dmvdRadiografiaToraxNormalVsCardiomegalia: {
      kind: 'clinicalFigure',
      src: '/assets/consulta-vet/dmvd-rx-torax-normal-vs-cardiomegalia-ortocanis.png',
      alt:
        'Comparativo em duas radiografias laterais de tórax canino: painel esquerdo com tórax de aspecto normal; painel direito com cardiomegalia (coração ampliado, menor campo pulmonar visível, traqueia empurrada dorsalmente).',
      caption:
        'Esquerda: tórax normal. Direita: cardiomegalia — aumento da silhueta cardíaca em projeção lateral, com menos “espaço” pulmonar pericárdico e elevação dorsal da traqueia em relação ao padrão fisiológico. Fonte: Ortocanis.',
    },
    dmvdBiomarcadoresLaboratorio:
      'NT-proBNP (quando disponível) pode correlacionar com gravidade e ajudar em casos limítroficos ou em monitorização; não substitui imagem. Hemograma e bioquímica são basais antes de RAAS + diurético crônico; monitorar creatinina, ureia e eletrólitos após mudanças terapêuticas ou descompensação.',
    dmvdDiferenciaisDiagnosticos: {
      kind: 'clinicalTable',
      headers: ['Condição', 'Notas práticas'],
      rows: [
        [
          'Doença degenerativa da valva aórtica',
          'Sopro em base / irradiação diferente; eco diferencia.',
        ],
        [
          'Cardiomiopatia dilatada primária',
          'Padrão ecocardiográfico distinto; regurgitação mitral secundária pode coexistir.',
        ],
        [
          'Insuficiência mitral aguda (ruptura cordal)',
          'Descompensação abrupta; murmúrio pode mudar; emergência.',
        ],
        [
          'Doença respiratória crônica',
          'Tosse e dispneia sem cardiomegalia proporcional — radiografia e NT-proBNP auxiliam.',
        ],
      ],
    },
    dmvdSeguimentoMonitorizacao:
      'Intervalos de eco e consulta dependem do estádio: B1 pode ser anual ou mais espaçado; B2 e C exigem frequência maior. Documente peso, frequência em repouso, tempo de exercício e episódios de dispneia ou síncope. Reajuste de diurético após melhora radiográfica para evitar hipoperfusão renal iatrogênica.',
  },
  treatment: {
    ordemDePrioridade: [
      'Pimobendan: usar formulação sólida de confiança (cápsulas/comprimidos de especialidade veterinária registrada); evitar “pimobendan líquido”, géis ou manipulados com histórico de resposta fraca — titular em jejum (~1 h antes de comer) quando o protocolo do serviço adota essa prática.',
      'ICC congestiva com hipóxia ou dispneia em repouso: estabilizar primeiro (oxigenoterapia, posição confortável, diurético parenteral conforme protocolo hospitalar, consideração de sedação leve se indicado).',
      'Estabelecer inodilatação com pimobendan quando indicado (estágios B2 com critérios, C e D em geral).',
      'Introduzir ou otimizar IECA/BRA na ICC estável com monitorização de creatinina e potássio — evitar “pacote completo” no animal desidratado.',
      'Tratar taquiarritmias que comprometam débito (frequência ventricular elevada na fibrilação atrial, por exemplo).',
      'Reavaliar qualidade de vida e critérios de eutanásia com honestidade empática no estádio D.',
    ],
    monitoramento: [
      'Creatinina, ureia e eletrólitos 5–10 dias após iniciar ou aumentar IECA, espironolactona ou diurético de alça em esquemas combinados; depois conforme estabilidade.',
      'Peso corporal semanal em fase de titulação de diurético; desidratação pode piorar azotemia mesmo com “ICC controlada”.',
      'Radiografia ou telemedicina veterinária quando dispneia recorre — comparar com baseline.',
      'Seguimento ecocardiográfico seriado em B2/C para ajustar expectativa e detectar hipertensão pulmonar secundária.',
    ],
    farmacos: {
      kind: 'clinicalTable',
      headers: [
        'Fármaco / classe',
        'Papel na DMVD ou ICC',
        'Doses e protocolos (prática citada)',
        'Cautelas e notas',
      ],
      rows: [
        [
          'Pimobendan',
          'Inodilatação: B2 com critérios (EPIC / ACVIM), estádios C–D em geral.',
          'Frequentemente ~0,25–0,5 mg/kg BID ou TID; relatos de necessidade de fracionamentos maiores em sobrecarga grave (fora do textbook — consentimento e monitorização). Preferir cápsulas/comprimidos de especialidade veterinária (ex.: Vetmedin 1,25 e 5 mg; Cardisure 1,25, 5 e 10 mg). Muitos serviços: jejum ~1 h antes da refeição, comprimido intacto.',
          'Evitar líquidos/géis/manipulados com biodisponibilidade duvidosa. AE comuns: diarreia; vômito menos frequente. Não substitui diurético na congestão aguda.',
        ],
        [
          'Furosemida',
          'Alívio da congestão (aguda e manutenção).',
          'Emergência: bolus EV frequentemente ~2 mg/kg IV com repetições; alguns protocolos até ~8 mg/kg/d em frações conforme resposta. Após estabilização, ponte oral citada ~2 mg/kg TID por 3–5 dias → manutenção BID. Comprimidos humanos muitas vezes 40 mg — cães pequenos exigem planeamento (manipulação).',
          'Monitorar perfusão, PA, eletrólitos e creatinina; refratariedade → considerar torasemida ou bloqueio do néfron (ver linhas seguintes).',
        ],
        [
          'Torasemida',
          'Alternativa ao diurético de alça quando há refratariedade à furosemida.',
          'Ponto de partida: equivalência aproximada ~1:10 em relação à furosemida; titular com cautela até teto do serviço.',
          'Mesmos riscos de alça + azotemia; integrar com monitorização laboratorial.',
        ],
        [
          'Nitroprussiato de sódio',
          'Vasodilatação potente em ICC aguda grave — uso hospitalar.',
          'Infusão contínua; inícios citados ~0,5 mcg/kg/min com titulação; na prática sustentada raramente > ~4 mcg/kg/min. Janela comum até ~24 h (risco de cianeto).',
          'Exclusivamente com monitorização invasiva ou serial rigorosa da PA; não rotina ambulatorial.',
        ],
        [
          'Dobutamina',
          'Inotrópico de suporte em descompensação aguda — “ponte” até otimizar diurético e pimobendan.',
          'Ordens de grandeza citadas ~7 mcg/kg/min em esquemas de ICC aguda; desmame conforme estabilização.',
          'Hospital; integrar oxigenoterapia e causa desencadeante.',
        ],
        [
          'Isosorbida dinitrato (ex.: Isordil)',
          'Vasodilatador oral em ICC refratária (alguns protocolos).',
          'Faixas citadas ~0,25–0,5 mg/kg BID; titular por PA e congestão.',
          'Tolerância farmacológica com uso crônico pode reduzir efeito.',
        ],
        [
          'Espironolactona',
          'Antagonista mineralocorticoide; ICC avançada selecionada; componente do bloqueio sequencial do néfron.',
          'Frequentemente ~2–4 mg/kg/dia (SID ou fracionado). Em refratariedade máxima à alça: associar alça + tiazídico + espironolactona com vigilância intensa de creatinina, ureia e K⁺.',
          'Hipercalemia; interação com IECA e função renal. Azotemia “aceitável” em terminalidade exige transparência com o tutor.',
        ],
        [
          'IECA (benazepril, enalapril, etc.)',
          'Modulação do RAAS na ICC estável (após euvolemia relativa e creatinina de referência).',
          'Faixas citadas na prática ~0,25–2 mg/kg BID (intervalo largo). Benazepril: também via hepática; enalapril: mais dependente de rins — escolha conforme perfil e custo. Cápsulas manipuladas ajudam doses baixas; comprimidos humanos 10–20 mg são recurso comum.',
          'Repetir laboratório após início; hipotensão; interação com diurético; evitar “pacote completo” no desidratado.',
        ],
        [
          'Amlodipino',
          'Hipertensão sistémica e adjuvante vasodilatador em cenários selecionados.',
          'Frequentemente ~0,2–0,5 mg/kg (muitas vezes SID). Em hipertensão pulmonar documentada, alguns serviços iniciam mais baixo (ex.: ~0,15 mg/kg) com confirmação ao eco.',
          'No Brasil, apresentação Pressat citada por cardiologistas por consistência — seguir padrão de lote do hospital.',
        ],
        [
          'Digoxina (opcional)',
          'Controle de frequência em FA com resposta ventricular rápida e baixo débito relativo (casos selecionados).',
          'Dose conforme monografia e função renal; índice terapêutico estreito.',
          'Monitorar toxicidade; integrar com plano de FA e demais fármacos.',
        ],
        [
          '— Nota geral —',
          'Síntese para consulta rápida; o texto detalhado da ficha desenvolve cada linha.',
          'Titular sempre por paciente, estádio ACVIM, perfil renal e protocolo do serviço.',
          'ACVIM 2019, EPIC, Nelson & Couto, Plumb’s — ver referências ao fim da ficha.',
        ],
      ],
    },
    dmvdPimobendanFormaJeJumMarcas:
      'Forma farmacêutica importa: pimobendan industrializado em cápsula costuma incluir excipientes (ex.: sais de ácidos graxos) que estabilizam a matriz e padronizam a liberação. Formulações líquidas magistrais, géis ou “biscoitos” frequentemente apresentam biodisponibilidade imprevisível; em serviços de cardiologia é comum observar que doses baixas de especialidades veterinárias registradas superam clinicamente doses aparentemente altas de manipulados — documente a troca e não assuma equivalência miligrama a miligrama.\n\n' +
      'Preferir marcas veterinárias consolidadas em comprimido/cápsula (ex.: Vetmedin 1,25 mg e 5 mg; Cardisure 1,25 mg, 5 mg e 10 mg são amplamente utilizadas por consistência de lote). Relatos de insucesso com certas cadeias de manipulação reforçam o critério “confiar em droga veterinária industrializada quando possível”.\n\n' +
      'Administração: muitos cardiologistas administram em jejum, cerca de 1 hora antes da alimentação, sempre em cápsula/comprimido intacto (salvo orientação contrária de bula local).\n\n' +
      'Titulação prática citada em serviços latino-americanos: frequentemente ~0,25 a 0,5 mg/kg divididos em BID ou TID conforme resposta clínica, frequência cardíaca e tolerança — a escolha de BID vs TID não segue apenas o estágio ACVIM, e sim a hemodinâmica individual. Há relatos de animais com sobrecarga mitral muito grave que necessitam incrementos agressivos (ordem de até ~2 mg/kg/d fracionados) como experiência clínica isolada, sem ampla base em ensaios controlados; qualquer dose fora do textbook exige monitorização estreita e consentimento informado.\n\n' +
      'Efeitos adversos: diarreia é relativamente comum; vômito menos frequente — reavaliar excipientes, horário em relação à comida e interações.',
    dmvdFurosemidaAgudaCronicaTorasemida:
      'Furosemida EV na emergência (cardiopata com congestão aguda): protocolos hospitalares frequentemente iniciam com ~2 mg/kg IV e repetem bolus conforme resposta diurética, monitorização da pressão arterial, perfusão e eletrólitos; alguns serviços escalam até aproximadamente 8 mg/kg/dia em frações se necessário. Se, mesmo assim, não há alívio da congestão, reavalie diagnóstico (pneumonia não cardiogênica, tromboembolismo, obstrução) antes de apenas “subir mais dose”.\n\n' +
      'Transição oral: comprimidos humanos frequentemente 40 mg; cães pequenos dependem de manipulação — oriente o tutor a solicitar com antecedência (vários dias). Esquema de ponte citado na prática: cerca de 2 mg/kg TID por 3–5 dias após estabilização, depois manutenção BID conforme resposta radiográfica e clínica (individualizar).\n\n' +
      'Refratariedade ao diurético de alça: troca para torasemida usando equivalência aproximada 1:10 em relação à furosemida (ponto de partida) e titulação cuidadosa; ao atingir o máximo tolerado, considerar bloqueio sequencial do néfron (ver espironolactona + tiazídico).',
    dmvdUrgenciaHospitalarVasodilatadoresInotropicos:
      'Uso exclusivo em hospital com monitorização invasiva ou serial rigorosa da pressão arterial e equipe experiente — não prescreva como rotina ambulatorial.\n\n' +
      'Nitroprusseto de sódio: vasodilatador potente por infusão contínua; inícios citados em torno de 0,5 mcg/kg/min com titulação gradual; doses alvo raramente ultrapassam ~4 mcg/kg/min na prática sustentada. Risco acumulado de intoxicação por cianeto limita o uso prolongado — janela comum de até ~24 h. Indicado quando há congestão com perfusão/pressão que permitam vasodilatação controlada; acompanhar PA de perto.\n\n' +
      'Inotrópicos de suporte (ex.: dobutamina, a partir de ordens de grandeza ~7 mcg/kg/min em esquemas de ICC aguda): ponte até otimizar diurético e pimobendan; desmame conforme estabilização. Integrar com oxigenoterapia e tratamento do desencadeante.\n\n' +
      'Se nitroprussiato e diurético máximo não alteram o quadro, a hipótese alternativa deixa de ser “só ICC” — pense imagem pulmonar, coagulação e infecção.',
    dmvdIsosorbidaVasodilatadorOral:
      'Isosorbida (isossorbida dinitrato; exemplos comerciais como Isordil) é vasodilatador oral utilizado em ICC refratária em alguns protocolos. Tolerância farmacológica pode reduzir o efeito com uso crônico. Faixas citadas na prática aproximadamente 0,25 a 0,5 mg/kg BID — titular conforme pressão e congestão.',
    dmvdEspironolactonaBloqueioNefron:
      'Espironolactona é antagonista mineralocorticoide com papel cardioprotetor neuro-humoral: atenua ação da aldosterona e reduz perdas inapropriadas de potássio associadas a diuréticos de alça — o potássio é relevante para função miocárdica e electricamente.\n\n' +
      'Doses comuns na prática: ~2 a 4 mg/kg/dia (SID ou fracionado conforme serviço).\n\n' +
      'Bloqueio sequencial do néfron em casos refratários à furosemida em máximo TID: associar diurético de alça + tiazídico (ex.: hidroclorotiazida) + espironolactona com monitorização intensiva de creatinina, ureia e potássio. Espera-se maior risco de azotemia iatrogênica — às vezes aceitável para alívio de congestão terminal, com transparência ao tutor.\n\n' +
      'Após maximizar a torasemida (equivalência inicial ~1:10 em relação à furosemida, com titulação progressiva até o teto definido pelo serviço), o passo seguinte costuma ser esse bloqueio combinado, não apenas aumentar indefinidamente um único diurético.',
    dmvdIecaBenazeprilEnalapril:
      'IECA antagonizam o eixo renina-angiotensina-aldosterona, reduzindo vasoconstrição mediada por angiotensina II e atenuando retenção hídrica desadaptativa em ICC estável — introduzir quando o paciente está euvolêmico e com creatinina de referência, repetindo laboratório após início.\n\n' +
      'Enalapril e metabolitos dependem mais de eliminação renal; benazepril apresenta também metabolização/excreção hepática — a escolha pode considerar função hepatorrenal e custo (enalapril frequentemente mais barato).\n\n' +
      'Faixas citadas na prática para ICC/hipertensão: ~0,25 a 2 mg/kg BID (intervalo largo; titular por pressão, proteinúria e tolerança renal). Manipulação em cápsula facilita doses pequenas; comprimidos humanos de benazepril 10 ou 20 mg são recurso comum.',
    dmvdAnlodipinoHipertensao:
      'Amlodipino (bloqueador de canal de cálcio diidropiridínico) é espinha dorsal de muitos protocolos de hipertensão sistêmica e adjuvante vasodilatador em cenários selecionados.\n\n' +
      'Doses frequentes ~0,2 a 0,5 mg/kg (muitas vezes SID; ajustar por resposta pressórica). Em hipertensão pulmonar documentada, alguns serviços utilizam doses iniciais mais baixas (ex.: ~0,15 mg/kg) buscando vasodilatação seletiva com cautela — requer confirmação ecocardiográfica e seguimento.\n\n' +
      'No Brasil, a apresentação Pressat é citada por diversos cardiologistas veterinários como referência de consistência — siga o padrão de compra e lote do seu hospital.',
    dmvdEstrategiaPorEstagioAcvim:
      'Estágios A–B1: educação, controle ambiental e observação — não há indicação automática de polifarmácia. B2 com critérios de remodelação: discutir pimobendan com base no consenso ACVIM e no estudo EPIC; o tutor deve entender benefício potencial, custo e necessidade de seguimento. C–D: terapia combinada com metas claras (respirar melhor, comer, caminhar confortavelmente) e vigilância laboratorial.',
    dmvdIccAgudaHospitalar:
      'Na emergência, o alívio da congestão e da hipóxia prevalece sobre a titulação fina do IECA. Oxigênio, diurético e monitorização de frequência respiratória e esforço são centrais. Após estabilização, reintroduzir ou ajustar terapia oral com calendário definido.',
    dmvdArrhythmiasFrequenciaCardiaca:
      'Taquiarritmias frequentes na DMVD avançada. A fibrilação atrial pode exigir controle de frequência (digoxina, betabloqueador em casos selecionados, ou outros agentes conforme experiência) e anticoagulação em protocolos específicos de centro — decisão individualizada.',
    dmvdNotaCirurgicaValvar:
      'Cirurgia de reparo mitral (oclusão, aneloplastia) é realidade em poucos centros e seleciona casos por equipe, custo e prognóstico. Para a maioria das práticas, o manejo clínico permanece o pilar.',
    dmvdPrognosticoLongitudinal:
      'Prognóstico depende do estádio no diagnóstico, da presença de hipertensão pulmonar, da função renal sob tratamento e da adesão. ICC recorrente e azotemia progressiva marcam reserva menor. A comunicação franca com o tutor melhora adesão e timing de decisões.',
  },
  prevention:
    'Não existe prevenção primária amplamente aceita fora de programas de criação que selecionam contra linhagens com alta prevalência. Rastreio auscultatório anual em raças predispostas permite estadiamento precoce e decisões informadas.',
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['pimobendan', 'benazepril'],
  relatedDiseaseSlugs: ['hipertensao-arterial-sistemica-caes-gatos'],
  references: [
    {
      id: 'ref-nelson-cardio',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — acquired cardiac diseases, mitral regurgitation.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-acvim-mvd',
      citationText:
        'Keene BW et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019.',
      sourceType: 'Consenso',
      url: null,
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-epic-pimobendan',
      citationText:
        'Boswood A et al.; EPIC Study Group. Effect of pimobendan in dogs with preclinical myxomatous mitral valve disease and cardiomegaly: the EPIC study — a randomized clinical trial. J Vet Intern Med. 2016.',
      sourceType: 'Ensaio clínico',
      url: null,
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-plumb-cardio',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — pimobendan, benazepril, furosemida.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-cunningham-cardiac-output',
      citationText: 'Klein BG. Cunningham’s Textbook of Veterinary Physiology, 6th ed., 2020 — função cardíaca e débito.',
      sourceType: 'Fisiologia',
      url: null,
      evidenceLevel: 'Didático',
    },
  ],
  isPublished: true,
  source: 'seed',
};
