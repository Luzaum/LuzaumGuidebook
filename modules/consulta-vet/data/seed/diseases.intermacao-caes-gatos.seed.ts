import { DiseaseRecord } from '../../types/disease';

export const intermacaoCaesGatosRecord: DiseaseRecord = {
  id: 'disease-intermacao-caes-gatos',
  slug: 'intermacao-caes-gatos',
  title: 'Intermação em Cães e Gatos',
  subtitle: 'Heatstroke, Golpe de Calor, Fisiopatologia Térmico-Celular, Diretrizes RECOVER 2026 e Terapia Intensiva',
  synonyms: [
    'Intermação',
    'Heatstroke',
    'Golpe de calor',
    'Hipertermia grave relacionada ao calor',
    'Heat-related illness',
    'Exaustão térmica',
    'Heatstroke canino e felino',
  ],
  species: ['dog', 'cat'],
  category: 'urgencia-emergencia',
  categories: [
    'urgencia-emergencia',
    'terapia-intensiva',
    'clinica-medica',
    'cuidados-criticos',
  ],
  tags: [
    'Intermação',
    'Heatstroke',
    'Golpe de Calor',
    'RECOVER 2026',
    'AAHA 2024',
    'Resfriamento Ativo',
    'MODS',
    'SIRS',
    'DIC',
    'LRA / AKI',
    'Rabdomiólise',
    'Secadora de Roupas',
    'Braquicefálico',
    'Norepinefrina',
  ],
  isPublished: true,

  quickDecisionStrip: [
    'Resfriamento ativo pré-hospitalar imediato com água corrente fresca no tronco e circulação de ar; interromper rigorosamente aos 39,7–40,0°C para prevenir hipotermia rebote (RECOVER 2026).',
    'Intermação não é febre: o ponto de ajuste hipotalâmico é normal. Antipiréticos (dipirona, AINEs e paracetamol) são ineficazes e contraindicados pelo risco de agravar lesão renal e necrose gastrointestinal.',
    'A temperatura na admissão pode ser enganosa: pacientes graves podem chegar normotérmicos ou hipotérmicos devido a resfriamento caseiro prévio ou colapso circulatório descompensado terminal.',
    'Ressuscitação volêmica prudente (AAHA 2024): alíquotas de cristaloides isotônicos tamponados (cão: 15–20 mL/kg; gato: 5–10 mL/kg em 15–30 min) com reavaliação seriada; norepinefrina precoce na hipotensão vasoplégica.',
    'Monitoramento hemostático e renal seriado obrigatório: o dano endotelial progride dinamicamente; coagulograma e tromboelastometria normais na entrada frequentemente evoluem para hipocoagulabilidade e CID em 12 a 24 horas.',
  ],

  quickSummary:
    'ALERTA CRÍTICO DE EMERGÊNCIA — INTERMAÇÃO NÃO TERMINA QUANDO A TEMPERATURA NORMALIZA:\n' +
    '- Lesões secundárias com janela oculta pós-resfriamento:\n' +
    '  - Lesão Renal Aguda (LRA / AKI), Coagulação Intravascular Disseminada (CID), hepatopatia aguda, Síndrome do Desconforto Respiratório Agudo (ARDS), hipoglicemia fulminante e necrose gastrointestinal podem surgir ou sofrer deterioração catastrófica horas ou dias após o resfriamento.\n' +
    '- Fisiopatologia sistêmica da sobrecarga térmica:\n' +
    '  - Emergência decorrente do acúmulo patológico de calor que sobrepuja a dissipação fisiológica, deflagrando desnaturação proteica, citotoxicidade térmica direta, resposta inflamatória sistêmica (SIRS), colapso circulatório distributivo-hipovolêmico e endoteliopatia generalizada.\n' +
    '- Apresentação clínica e armadilha da temperatura inicial:\n' +
    '  - Classicamente caracterizada por hipertermia central extrema (> 41°C) com disfunção do SNC e falência de múltiplos órgãos.\n' +
    '  - A normotermia ou hipotermia na admissão não descarta intermação, podendo refletir resfriamento caseiro prévio, tempo decorrido desde o insulto ou colapso circulatório descompensado terminal.\n' +
    '- Mudança de paradigma e conduta intensiva (RECOVER 2026 e AAHA 2024):\n' +
    '  - Resfriamento ativo imediato com água corrente fresca no tronco e circulação forçada de ar (Diretrizes RECOVER First Aid 2026), cessando aos 39,7–40,0°C.\n' +
    '  - Veto absoluto a antipiréticos e AINEs (o set point hipotalâmico é normal).\n' +
    '  - Ressuscitação volêmica conservadora em alíquotas para prevenir sobrecarga hídrica pulmonar.',

  quickSummaryRich: {
    lead:
      'A intermação (heatstroke) representa o ápice crítico do espectro das doenças relacionadas ao calor, evoluindo de exaustão térmica para SIRS e falência de múltiplos órgãos (MODS):\n' +
      '- Diretrizes de consenso RECOVER First Aid 2026:\n' +
      '  - Estabelecem que o resfriamento ativo pré-hospitalar não deve aguardar a confirmação termométrica quando o histórico e os sinais clínicos forem fortemente compatíveis.\n' +
      '- Janela oculta de 12 a 24 horas pós-insulto:\n' +
      '  - O dano celular não cessa com a queda da temperatura: isquemia esplâncnica com translocação de endotoxinas e endoteliopatia com consumo de fatores hemostáticos atingem seu nadir tardiamente, demandando suporte avançado ininterrupto em UTI.',
    leadHighlights: [
      'espectro das doenças relacionadas ao calor',
      'resfriamento ativo pré-hospitalar não deve aguardar a confirmação termométrica',
      'RECOVER First Aid 2026',
      'janela oculta de 12 a 24 horas pós-insulto',
      'falência de múltiplos órgãos (MODS)',
    ],
    pillars: [
      {
        title: 'Pilar 1 — Mudança de Paradigma: Resfriamento Ativo e RECOVER 2026',
        body:
          'Superação da contraindicação histórica ao uso de água fria pelo consenso RECOVER First Aid 2026:\n' +
          '- Prioridade pré-hospitalar imediata:\n' +
          '  - Aplicação de água fresca corrente sobre o tronco e abdome associada a circulação forçada de ar por ventiladores.\n' +
          '- Meta térmica estrita de interrupção:\n' +
          '  - O resfriamento ativo deve ser cessado rigorosamente aos 39,7–40,0°C (ou 38,6°C se houver estridor de vias aéreas com melhora do esforço) para prevenir hipotermia rebote iatrogênica.',
        highlights: [
          'RECOVER First Aid 2026',
          'água fresca corrente sobre o tronco',
          '39,7–40,0°C',
          'prevenir hipotermia rebote',
        ],
      },
      {
        title: 'Pilar 2 — Fisiopatologia Térmico-Endotelial e MODS Dinâmico',
        body:
          'O heatstroke comporta-se como uma endoteliopatia difusa somada a choque misto (hipovolêmico e distributivo):\n' +
          '- Danos celulares diretos:\n' +
          '  - A hipertermia desnatura proteínas estruturais e desarranja membranas mitocondriais.\n' +
          '- Isquemia esplâncnica e quebra de barreira:\n' +
          '  - Vasoconstrição compensatória deflagra isquemia intestinal e quebra de junções oclusivas, permitindo translocação maciça de endotoxinas bacterianas e tempestade inflamatória.',
        highlights: [
          'endoteliopatia difusa',
          'choque misto',
          'isquemia intestinal',
          'translocação maciça de endotoxinas',
        ],
      },
      {
        title: 'Pilar 3 — Ressuscitação Hemodinâmica Racional (AAHA 2024) e Vasopressores',
        body:
          'Ressuscitação hemodinâmica racional baseada nas diretrizes AAHA 2024:\n' +
          '- Veto à infusão cega de grandes volumes:\n' +
          '  - A perda de integridade vascular (capillary leak) eleva drasticamente o risco de ARDS sob sobrecarga volêmica.\n' +
          '- Alíquotas conservadoras de cristaloides:\n' +
          '  - Cristaloides isotônicos balanceados (cão: 15–20 mL/kg; gato: 5–10 mL/kg em 15–30 min) com reavaliação seriada.\n' +
          '- Suporte vasopressor precoce:\n' +
          '  - Se a hipotensão persistir após restauração volêmica, iniciar prontamente norepinefrina para meta de PAM >= 65 mmHg.',
        highlights: [
          'AAHA 2024',
          'alíquotas conservadoras de cristaloides',
          'capillary leak',
          'norepinefrina',
          'PAM >= 65 mmHg',
        ],
      },
      {
        title: 'Pilar 4 — Janela Oculta de 12 a 24h e Monitoramento Seriado',
        body:
          'Vigilância intensiva mandatória durante a janela oculta de 12 a 24 horas:\n' +
          '- Coagulopatia dinâmica (Yanai et al., 2024; Bruchim et al., 2017):\n' +
          '  - Pacientes normocoaguláveis na entrada tornam-se profundamente hipocoaguláveis entre 12 e 24 horas pós-admissão.\n' +
          '- Lesão Renal Aguda subclínica (Segev et al., 2015):\n' +
          '  - A creatinina inicial subestima a lesão renal aguda, exigindo monitoramento seriado intensivo de débito urinário e eletrólitos por 24 a 48 horas.',
        highlights: [
          'janela oculta de 12 a 24h',
          'Yanai et al., 2024',
          'Bruchim et al., 2017',
          'Segev et al., 2015',
          'coagulograma seriado',
        ],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Monitoramento Seriado na Intermação',
      steps: [
        {
          label: 'Passo 1: Triagem Imediata e Reconhecimento da Síndrome',
          detail:
            'Identificar exposição ambiental extrema ou histórico de exercício intenso recente associado a prostração, colapso, ataxia ou vômitos. Não aguardar medição termométrica para iniciar o resfriamento se o contexto for fortemente compatível.',
          timing: 'Minuto 0',
          limitations: 'Temperatura normal ou baixa na admissão não descarta intermação recente grave.',
        },
        {
          label: 'Passo 2: Avaliação de Vias Aéreas e Estabilidade Neuropulmonar (ABC)',
          detail:
            'Inspecionar permeabilidade de vias aéreas, estridor laríngeo, estase salivar espessa e padrão respiratório. Em braquicefálicos e felinos, fornecer oxigênio com manipulação mínima; preparar intubação orotraqueal em caso de edema laríngeo oclusivo.',
          timing: 'Minutos 0 a 5',
          reassess: 'Ausculta pulmonar contínua para detecção precoce de estertores úmidos (edema alvéolo-capilar / ARDS).',
        },
        {
          label: 'Passo 3: Painel Laboratorial de Admissão e Esfregaço com nRBC',
          detail:
            'Coleta laboratorial imediata na admissão:\n' +
            '- Hemograma com esfregaço sanguíneo minucioso:\n' +
            '  - Quantificação de hemácias nucleadas (nRBCs; corte prognóstico >= 18 nRBC/100 leucócitos), hematócrito e contagem plaquetária.\n' +
            '- Perfil metabólico e eletrolítico de emergência:\n' +
            '  - Glicemia, lactato e eletrólitos com cálcio ionizado.',
          timing: 'Minutos 5 a 15',
          reassess: 'Glicemia horária nas primeiras 4 horas; lactato sérico a cada 2 a 4 horas até depuração.',
        },
        {
          label: 'Passo 4: Avaliação de Injúria Renal e Rabdomiólise Aguda',
          detail:
            'Mensuração de creatinina, ureia, creatina quinase (CK sérica), urinálise com densidade, pesquisa de glicosúria normoglicêmica (lesão tubular proximal), cilindrúria e confirmação de pigmentúria (mioglobinúria vs hemoglobinúria).',
          timing: 'Admissão e a cada 12 horas',
          limitations: 'Creatinina na admissão é notoriamente insensível para perda aguda de TFG no heatstroke.',
        },
        {
          label: 'Passo 5: Painel Hemostático Seriado e Ultrassonografia POCUS',
          detail:
            'Tempo de protrombina (PT), aPTT, fibrinogênio plasmático, D-dímero e tromboelastometria (ROTEM) na chegada e obrigatoriamente repetidos às 12 e 24 horas. Realização de TFAST e AFAST para rastrear líquido livre e linhas B pulmonares.',
          timing: '0h, 12h e 24h pós-admissão',
          reassess: 'Pacientes normocoaguláveis na admissão exigem repetição para detecção precoce de CID consuntiva.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Estabilização Intensiva na Intermação',
      steps: [
        {
          label: 'Passo 1: Resfriamento Ativo e Fluxo de Ar Forçado',
          detail:
            'Aplicar água corrente fresca sobre todo o tronco e abdome ventral com circulação de ar por ventilador. Interromper rigorosamente o resfriamento ativo ao atingir 39,7–40,0°C para prevenir hipotermia grave tardia.',
          dose: 'Água corrente fresca a 15–20°C até atingir 39,7–40,0°C retal (ou ~15 min sem termômetro)',
          timing: 'Imediato (pré-hospitalar e admissão)',
          limitations: 'Nunca envolver o paciente em toalhas molhadas estagnadas; não utilizar gelo direto ou banhos de gelo.',
        },
        {
          label: 'Passo 2: Otimização Ventilatória e Suporte de Oxigênio',
          detail:
            'Administração de oxigênio umidificado por fluxo livre ou máscara sem estresse. Se houver estridor laríngeo severo ou colapso em braquicefálicos, realizar sedação leve titulada e intubação orotraqueal protetora.',
          dose: 'Butorfanol 0,1–0,2 mg/kg IV ou Acepromazina em microdose (0,005–0,01 mg/kg IV) apenas se normotenso',
          timing: 'Minutos 0 a 10',
          reassess: 'Gasometria arterial ou oximetria de pulso (alvo SpO2 > 95%).',
        },
        {
          label: 'Passo 3: Ressuscitação Volêmica em Alíquotas e Alvo de PAM',
          detail:
            'Cristaloide isotônico balanceado tamponado (Ringer Lactato ou Plasmalyte) em pequenas alíquotas rápidas, reavaliando pressão arterial, lactato e ausculta pulmonar após cada infusão. Evitar infusão cega de volume total de choque.',
          dose: 'Cães: 15–20 mL/kg IV em 15–30 min; Gatos: 5–10 mL/kg IV em 15–30 min (Diretrizes AAHA 2024)',
          timing: 'Primeira hora',
          reassess: 'Se a PAM persistir < 65 mmHg após restauração volêmica, iniciar Norepinefrina 0,05–0,1 mcg/kg/min CRI.',
        },
        {
          label: 'Passo 4: Controle de Hipoglicemia, Convulsões e Arritmias',
          detail:
            'Corrigir hipoglicemia imediatamente com glicose a 50% diluída. Cessar convulsões ativas com benzodiazepínico para evitar produção muscular adicional de calor. Tratar taquicardia ventricular instável com lidocaína.',
          dose: 'Glicose 50%: 0,5–1,0 mL/kg IV diluído 1:2; Midazolam: 0,2–0,3 mg/kg IV; Lidocaína: cão 2 mg/kg IV lento',
          timing: 'Imediato conforme manifestação',
          limitations: 'Gatos são hipersensíveis à lidocaína: dose reduzida para 0,2–0,5 mg/kg IV com monitoramento rígido.',
        },
        {
          label: 'Passo 5: Suporte Multiorgânico em UTI e Prevenção de Iatrogenias',
          detail:
            'Instalação de sonda uretral de demora (Foley) com sistema fechado para monitoramento horário de débito urinário (regra de entradas e saídas). Gastroproteção com inibidor de bomba de prótons para mitigar ulceração por isquemia.',
          dose: 'Pantoprazol 1 mg/kg IV q12–24h; Plasma Fresco Congelado (FFP) 10–20 mL/kg se coagulopatia hemorrágica ativa',
          timing: 'Hospitalização intensiva contínua (mínimo 24 a 48h)',
          reassess: 'Veto absoluto a anti-inflamatórios não esteroidais (AINEs), dipirona e corticosteroides.',
        },
      ],
    },
  },

  etiology: {
    diferenciacaoTermorregulacaoVsFebre:
      'Distinção fisiológica fundamental entre intermação e febre:\n' +
      '- Fisiopatologia da febre verdadeira:\n' +
      '  - Citocinas pirogênicas endógenas (IL-1, IL-6 e TNF-alfa) estimulam a síntese de PGE2 no hipotálamo pré-óptico, elevando o ponto de ajuste térmico (set point).\n' +
      '  - O organismo retém calor ativamente e responde à inibição da COX por antipiréticos.\n' +
      '- Fisiopatologia da intermação (Heatstroke):\n' +
      '  - O set point hipotalâmico permanece estritamente normal; o centro termorregulador tenta dissipar calor com vasodilatação periférica e taquipneia, mas a sobrecarga calórica sobrepuja os limites físicos de dissipação.\n' +
      '- Veto absoluto a antipiréticos e AINEs:\n' +
      '  - Dipirona, AINEs e paracetamol são completamente ineficazes por ausência de alvo biológico na intermação.\n' +
      '  - O uso de AINEs potencializa a necrose tubular renal em rins hipoperfundidos e agrava a erosão gastrointestinal, enquanto o paracetamol causa hepatotoxicidade fulminante e metemoglobinemia fatal em felinos.',

    mecanismosBiofisicosPerdaCalorica:
      'Balanço biofísico da termorregulação (Calor Produzido + Absorvido = Armazenado + Eliminado):\n' +
      '- Quatro vias de transferência física de calor:\n' +
      '  - Radiação: emissão eletromagnética de calor para superfícies distantes mais frias, sem contato direto.\n' +
      '  - Condução: transferência térmica direta por contato com superfícies mais frias (como o solo).\n' +
      '  - Convecção: remoção contínua da camada de ar ou água aquecida adjacente à pele por correntes gasosas ou líquidas.\n' +
      '  - Evaporação: dissipação endotérmica de calor através da transformação de água em vapor.\n' +
      '- Desaparecimento do gradiente térmico em temperaturas elevadas:\n' +
      '  - Quando a temperatura ambiente se aproxima da temperatura cutânea (32 a 35°C), o gradiente para radiação e convecção praticamente se anula, tornando a evaporação a única via viável de perda calórica.\n' +
      '- Limitação fisiológica de cães e gatos:\n' +
      '  - Glândulas sudoríparas écrinas funcionais limitam-se aos coxins plantares, com papel insignificante na termorregulação sistêmica.\n' +
      '  - O principal mecanismo evaporativo é o panting (respiração ofegante superficial e rápida sobre mucosas orais e linguais vascularizadas).',

    vulnerabilidadeBraquicefalicaEAltaUmidade:
      'Interação crítica entre umidade ambiental e conformação anatômica craniofacial:\n' +
      '- Impacto da alta umidade relativa do ar (> 80%):\n' +
      '  - O ar saturado de vapor anula o gradiente de evaporação da saliva e da mucosa respiratória, podendo precipitar intermação mesmo em temperaturas moderadas (28 a 32°C).\n' +
      '- Desvantagem biomecânica extrema em braquicefálicos (BOAS):\n' +
      '  - Estenose de narinas, palato mole alongado/espessado, cornetos nasais aberrantes e redundância de tecidos orofaríngeos impõem enorme resistência ao fluxo aéreo.\n' +
      '- Ciclo vicioso de termogênese metabólica:\n' +
      '  - Pressões negativas intratorácicas gigantescas exigem esforço muscular extenuante, gerando calor metabólico massivo durante a própria tentativa de dissipação.\n' +
      '  - Ocorre edema laríngeo agudo, eversão de sáculos e obstrução progressiva, culminando em asfixia, colapso e morte térmica.',

    hipertermiaNaoAmbientalSecundaria:
      'Causas de hipertermia extrema (> 41°C) não relacionadas ao ambiente:\n' +
      '- Atividade muscular esquelética explosiva e sustentada:\n' +
      '  - Status epilepticus prolongado ou agrupamento de crises convulsivas (produção motora descontrolada de calor).\n' +
      '  - Tetania hipocalcêmica e hipertermia maligna genética (mutação no canal RYR1 deflagrada por anestésicos inalatórios ou relaxantes musculares).\n' +
      '- Toxicologia clínica e neurotoxinas tremorgênicas:\n' +
      '  - Metaldeído (moluscicida), micotoxinas tremorgênicas (penitrem A e roquefortina em comida mofada), estricnina, organofosforados, carbamatos e piretroides em gatos.\n' +
      '- Desregulação endócrina e farmacológica em felinos:\n' +
      '  - Crise tireotóxica (tempestade tireoidiana no hipertireoidismo descompensado) e hipertermia disfuncional pós-administração de opioides (hidromorfona, buprenorfina e tramadol).',

    tabelaDiferenciacaoTermicaIntermacaoVsFebre: {
      caption: 'Tabela 1 — Diagnóstico Diferencial Mecanístico: Intermação vs Febre vs Hipertermia Motora',
      headers: [
        'Parâmetro Clínico / Fisiológico',
        'Intermação (Heatstroke)',
        'Febre Verdadeira (Infecciosa/Inflamatória)',
        'Hipertermia Motora / Toxicológica',
      ],
      rows: [
        [
          'Ponto de Ajuste Hipotalâmico (Set Point)',
          'Normal e inalterado; hipotálamo tenta dissipar calor ativamente',
          'Elevado ativamente por PGE2 e citocinas pirogênicas (IL-1, IL-6, TNF)',
          'Normal; produção periférica de calor supera a termorregulação',
        ],
        [
          'Mecanismo Primário de Acúmulo',
          'Sobrecarga ambiental externa ou esforço físico superando dissipação',
          'Vasoconstrição reflexa, termogênese e calafrios para atingir novo set point',
          'Contrações musculares sustentadas incontroláveis (convulsão / tremor / toxina)',
        ],
        [
          'Resposta a Antipiréticos (Dipirona, AINEs)',
          'Nula e ineficaz; antipiréticos não reduzem a temperatura na intermação',
          'Positiva; inibição da COX e redução de PGE2 restauram o set point normal',
          'Nula e ineficaz; antipiréticos não cessam a atividade muscular periférica',
        ],
        [
          'Risco do Uso de AINEs e Antipiréticos',
          'Gravíssimo: precipita lesão renal aguda e agrava sangramento gastrointestinal',
          'Baixo a moderado se o paciente estiver normovolêmico e sem desidratação',
          'Gravíssimo: necrose tubular renal em músculos lisados com mioglobinúria',
        ],
        [
          'Intervenção Primordial Obrigatória',
          'Resfriamento físico ativo imediato (água fresca corrente) e UTI de suporte',
          'Tratamento etiológico da infecção/inflamação de base e antipirético se desconforto',
          'Sedação profunda / anticonvulsivantes / relaxantes musculares e resfriamento físico',
        ],
      ],
    },
  },

  epidemiology: {
    epidemiologiaCaninaVetcompassEEmergencia:
      'Epidemiologia e fatores de risco na espécie canina (Dados VetCompass e emergência):\n' +
      '- Evidências de atenção primária (Hall et al., 2020 — 905.543 cães):\n' +
      '  - Incidência anual de 0,04% com taxa de letalidade global de 14,18%.\n' +
      '  - Risco desproporcional em raças braquicefálicas: Bulldog Inglês (razão de chances 14,18), Bulldog Francês (6,48) e Dogue de Bordeaux (5,26).\n' +
      '  - Idade superior a 2 anos e sobrepeso corporal atuam como preditores independentes de risco.\n' +
      '- Dados de hospitais de emergência e centros terciários:\n' +
      '  - Estudo multicêntrico britânico (2022, 167.751 cães): incidência de 0,23% e letalidade hospitalar de 26,56% (odds ratio em braquicefálicos de 4,21).\n' +
      '  - Centros de referência terciária e UTI (Bruchim et al., 2006): mortalidade entre 30% e 50% decorrente de admissão tardia em coma, CID estabelecida e LRA anúrica.',

    particularidadesEpidemiologicasFelinas:
      'Particularidades epidemiológicas da intermação na espécie felina:\n' +
      '- Baixa incidência relativa e alta gravidade (Hall, Radford e Carter, 2022):\n' +
      '  - Vigilância no Reino Unido documentou apenas 16 casos ao longo de múltiplos anos; a totalidade decorreu de exposição ambiental passiva ou confinamento, sem registros por esforço físico.\n' +
      '  - Maioria absoluta concentrada nos meses quentes de verão (75% entre junho e julho no hemisfério norte).\n' +
      '- Risco doméstico crítico em secadoras de roupas (Cudney, Wayne e Rozanski, 2021):\n' +
      '  - Gatos procuram o tambor aquecido como refúgio e sofrem aprisionamento acidental com ar quente forçado e rotação mecânica.\n' +
      '  - Casos documentados apresentaram disfunção neurológica profunda, úlceras de córnea e mucosa, queimaduras térmicas e rabdomiólise severa.\n' +
      '- Populações felinas de maior vulnerabilidade:\n' +
      '  - Felinos com pneumopatias crônicas (asma felina), obesidade e gatos geriátricos confinados em residências pouco ventiladas.',

    fatoresPredisponentesEConfinamento:
      'Fatores de risco predisponentes individuais e ambientais:\n' +
      '- Conformação física e anatômica:\n' +
      '  - Síndrome braquicefálica com estenose de narinas e palato redundante; pelagem escura e densa que potencializa a absorção de radiação solar.\n' +
      '- Comorbidades cardiorrespiratórias e metabólicas:\n' +
      '  - Obesidade (o tecido adiposo atua como isolante térmico que dificulta a dissipação), cardiopatias descompensadas (incapacidade de elevar débito para vasodilatação cutânea) e paralisia laríngea adquirida.\n' +
      '- Falta de aclimatação prévia:\n' +
      '  - Risco crítico nos primeiros dias quentes da estação ou após transferência para regiões tropicais sem adaptação fisiológica prévia.\n' +
      '- Histórico prévio de intermação:\n' +
      '  - Animais que sobreviveram a episódio anterior exibem suscetibilidade aumentada a recidivas por possíveis danos residuais microvasculares ou hipotalâmicos.',

    tabelaComparativaEpidemiologiaCaesVsGatos: {
      caption: 'Tabela 2 — Comparativo Epidemiológico e Particularidades Clínicas: Cães vs Gatos',
      headers: [
        'Aspecto Epidemiológico / Clínico',
        'Cães (Caninos)',
        'Gatos (Felinos)',
      ],
      rows: [
        [
          'Frequência e Prevalência Geral',
          'Elevada; emergência frequente nos meses de verão e em cães de trabalho',
          'Muito baixa e subnotificada; menos de 5% do volume de atendimentos de HRI',
        ],
        [
          'Formas Principais de Ocorrência',
          'Bimodal: ambiental clássica (carros, canis) e por esforço (corrida, canicross)',
          'Praticamente exclusiva ambiental/passiva (confinamento, secadoras, casas quentes)',
        ],
        [
          'Gatilho Doméstico Peculiar',
          'Confinamento em veículos fechados e caminhadas sob sol com tutores',
          'Aprisionamento acidental em secadoras de roupas e quartos sem ventilação',
        ],
        [
          'Mortalidade Estimada',
          'Atenção primária: ~14%; Emergência: ~26%; UTI de referência: 30 a 50%',
          'Dados escassos e limitados; sobrevida elevada em séries isoladas com suporte rápido',
        ],
        [
          'Sinal Clínico de Alerta Respiratório',
          'Panting taquipneico ruidoso com língua projetada e hipersalivação espessa',
          'Respiração de boca aberta (open-mouth breathing): sinal de gravidade extrema',
        ],
        [
          'Sensibilidade Toxicológica Relevante',
          'Sensibilidade a doses altas de lidocaína; tolerância normal a antipiréticos fora da LRA',
          'Toxicidade fatal por paracetamol; alta sensibilidade cardiovascular à lidocaína',
        ],
      ],
    },
  },

  pathogenesisTransmission: {
    citotoxicidadeTermicaEDanosCelulares:
      'Cinética do dano térmico celular (produto temperatura x tempo de exposição):\n' +
      '- Desnaturação proteica e colapso mitocondrial:\n' +
      '  - A hipertermia extrema desnatura proteínas estruturais e enzimáticas, desestabiliza a bicamada lipídica de membranas e interrompe a fosforilação oxidativa com colapso na síntese de ATP.\n' +
      '- Esgotamento das proteínas de choque térmico (HSPs):\n' +
      '  - Sobrecarga calórica suplanta a capacidade protetora de chaperonas moleculares (HSP-70 e HSP-90), culminando em apoptose e necrose celular em massa.\n' +
      '- Liberação maciça de DAMPs e tempestade de citocinas:\n' +
      '  - Células endoteliais, miócitos e neurônios rompidos extravasam HMGB1 e DNA mitocondrial livre, ativando receptores Toll-like (TLRs) em leucócitos.\n' +
      '  - Liberação descontrolada de TNF-alfa, IL-1beta, IL-6 e espécies reativas de oxigênio (ROS), instalando SIRS que autoperpetua a lesão tecidual pós-resfriamento.',

    isquemiaEsplanicaEQuebraBarreiraIntestinal:
      'Papel central do trato gastrointestinal na amplificação inflamatória:\n' +
      '- Vasoconstrição esplâncnica compensatória reflexa:\n' +
      '  - Para preservar a pressão de perfusão central durante a vasodilatação cutânea máxima, ocorre intensa vasoconstrição no território mesentérico.\n' +
      '- Isquemia epitelial e perda de junções de oclusão (tight junctions):\n' +
      '  - Hipóxia celular e depleção energética dos enterócitos provocam descamação da mucosa com hematêmese, melena e diarreia hemorrágica profusa.\n' +
      '- Translocação maciça de endotoxinas bacterianas (LPS):\n' +
      '  - Bactérias gram-negativas intraluminares e endotoxinas penetram na circulação portal e vasos linfáticos mesentéricos.\n' +
      '  - A endotoxemia sistêmica amplifica a tempestade inflamatória, culminando em quadro hemodinâmico indistinguível do choque séptico.',

    endoteliopatiaCascataCoagulacaoECID:
      'Endoteliopatia difusa e desregulação hemostática dinâmica:\n' +
      '- Desnudamento endotelial e ativação do fator tecidual:\n' +
      '  - Lesão térmica direta e citocinas destroem o glicocálix e expõem o fator tecidual subendotelial, deflagrando geração maciça de trombina e agregação plaquetária.\n' +
      '- Perda dos freios anticoagulantes endógenos:\n' +
      '  - Queda abrupta de antitrombina (AT) e proteína C ativada, aliada à elevação de PAI-1, promovendo microtrombose difusa em órgãos vitais (fase protrombótica inicial).\n' +
      '- Transição para coagulopatia consuntiva e CID (Bruchim et al., 2017; Yanai et al., 2024):\n' +
      '  - O consumo contínuo e exaustivo de plaquetas, fibrinogênio e fatores da coagulação culmina em hipocoagulabilidade severa, hiperfibrinólise, petéquias, equimoses e hemorragias intracavitárias.',

    mecanismosLraERabdomiolise:
      'Mecanismos patogênicos da Lesão Renal Aguda e rabdomiólise na intermação:\n' +
      '- Componentes hemodinâmicos e citotóxicos combinados:\n' +
      '  - 1) Hipovolemia severa por perdas evaporativas e gastrointestinais;\n' +
      '  - 2) Choque distributivo e hipotensão vasoplégica com colapso do gradiente de filtração glomerular;\n' +
      '  - 3) Citotoxicidade térmica direta às células tubulares renais e alça de Henle;\n' +
      '  - 4) Microangiopatia trombótica e isquemia peritubular secundária à CID;\n' +
      '  - 5) Endoteliopatia glomerular e necrose tubular por citocinas inflamatórias da SIRS.\n' +
      '- Nefropatia por pigmentos e rabdomiólise aguda:\n' +
      '  - Necrose de miócitos esqueléticos libera quantidades massivas de mioglobina monomérica na circulação.\n' +
      '  - A mioglobina precipita em cilindros intratubulares oclusivos, induz vasoconstrição intrarrenal e gera estresse oxidativo severo via reação de Fenton por ferro livre.',

    tabelaFisiopatologiaSistemicaOrgaoAlvo: {
      caption: 'Tabela 3 — Cascata Fisiopatológica Sistemática e Lesões em Órgãos-Alvo na Intermação',
      headers: [
        'Sistema Orgânico / Alvo',
        'Mecanismo Lesivo Primário',
        'Consequência Fisiopatológica',
        'Manifestação Clínica e Laboratorial',
      ],
      rows: [
        [
          'Trato Gastrointestinal',
          'Isquemia esplâncnica por vasoconstrição compensatória e calor direto',
          'Necrose de enterócitos, quebra de tight junctions e translocação endotóxica',
          'Vômitos, hematêmese, diarreia profusa, hematochezia e melena',
        ],
        [
          'Endotélio e Hemostasia',
          'Dano térmico direto, exposição de fator tecidual e tempestade de citocinas',
          'Imunotrombose microvascular, consumo de fatores, falência de proteína C e CID',
          'Trombocitopenia, petéquias, sangramentos em punção, alargamento de PT/aPTT',
        ],
        [
          'Rins (Néfrons)',
          'Hipoperfusão, choque, calor direto, microtrombos e toxicidade por mioglobina',
          'Necrose tubular aguda, obstrução por cilindros pigmentares e colapso de TFG',
          'Oligúria, anúria, glicosúria normoglicêmica, cilindros granulares e uremia',
        ],
        [
          'Sistema Nervoso Central',
          'Citotoxicidade térmica em neurônios, edema vasogênico/citotóxico e isquemia',
          'Ruptura de barreira hematoencefálica, micro-hemorragias e hipertensão craniana',
          'Ataxia, desorientação, estupor, cegueira cortical, coma e convulsões',
        ],
        [
          'Aparelho Respiratório',
          'Dano endotelial alvéolo-capilar, inflamação e edema de vias aéreas superiores',
          'Edema pulmonar não cardiogênico, ARDS, aspiração gástrica e obstrução alta',
          'Estridor laríngeo, taquipneia, estertores crepitantes úmidos e hipoxemia',
        ],
        [
          'Fígado e Metabolismo',
          'Isquemia centrolobular, microtrombose sinusoidal e necrose hepatocitária',
          'Falência na gliconeogênese, perda de síntese de fatores da coagulação e colestase',
          'Hipoglicemia severa (< 47 mg/dL), elevação maciça de ALT/AST e icterícia',
        ],
      ],
    },
  },

  pathophysiology: {
    disfuncaoNeurologicaECicloConvulsivo:
      'Vulnerabilidade cortical e hipertensão intracraniana:\n' +
      '- Limiar de desnaturação proteica: temperatura intracraniana superior a 41,5°C causa desnaturação neuronal imediata, falência de bombas Na+/K+-ATPase e edema cerebral citotóxico.\n' +
      '- Quebra de barreira hematoencefálica: tempestade de citocinas e endoteliopatia geram edema cerebral vasogênico com aumento da PIC e queda crítica da PPC (PPC = PAM - PIC).\n' +
      '- Substrato isquêmico e lesões focais: trombose microvascular e micro-hemorragias provocam ataxia, cegueira cortical, estupor, coma e crises convulsivas generalizadas.\n' +
      '- Ciclo vicioso de hipertermia endógena: a contração muscular violenta durante convulsões gera calor metabólico maciço, acelerando a necrose neuronal em espiral fatal.',

    injuriaPulmonarEdemaNaoCardiogenicoEARDS:
      'Comprometimento da barreira alvéolo-capilar:\n' +
      '- Permeabilidade microvascular aumentada: DAMPs, citocinas e microtrombos lesam o endotélio pulmonar gerando exsudação alveolar proteica intensa sem hipertensão capilar prévia.\n' +
      '- Fisiopatologia de ALI/ARDS: inundação alveolar por exsudato inflamatório causa shunt intrapulmonar direito-esquerdo, hipoxemia arterial refratária e perda de complacência.\n' +
      '- Riscos respiratórios secundários:\n' +
      '- Hemorragia alveolar difusa: decorrente de coagulopatia intravascular disseminada grave.\n' +
      '- Pneumonia aspirativa: perda do reflexo laringotraqueal protetor em pacientes obnubilados durante episódios copiosos de êmese.',

    isquemiaMiocardicaEArritmiasVentrimulares:
      'Descompasso hemodinâmico e instabilidade elétrica miocárdica:\n' +
      '- Discrepância entre oferta e demanda: consumo miocárdico de oxigênio explode pela taquicardia extrema, enquanto a oferta desaba por hipotensão e encurtamento do tempo diastólico coronariano.\n' +
      '- Injúria isquêmica e necrose focal: hipoperfusão e microtrombose geram isquemia subendocárdica e despolarização celular anômala potencializada por acidose metabólica e desequilíbrios de K+ e Ca2+.\n' +
      '- Prevalência e espectro arritmogênico: arritmias ventriculares afetam 20% a 25% dos cães com intermação, manifestando-se por complexos ventriculares prematuros (VPCs) e taquicardia ventricular.\n' +
      '- Risco de colapso circulatório: taquicardias ventriculares instáveis demandam intervenção antiarrítmica imediata para impedir degeneração em fibrilação ventricular ou assistolia.',

    lesaoHepatocelularEHipoglicemiaCritica:
      'Colapso funcional hepático e esgotamento glicêmico:\n' +
      '- Necrose isquêmica centrolobular: hipoperfusão por vasoconstrição esplâncnica e dano térmico direto destroem hepatócitos, paralisando a gliconeogênese e depuração de toxinas.\n' +
      '- Consumo periférico acelerado: exaustão ultra-rápida do glicogênio associada ao consumo hipermetabólico anaeróbio por tecidos hipóxicos e leucócitos ativados precipita hipoglicemia severa.\n' +
      '- Marcador prognóstico clássico: glicemia plasmática inferior a 47 mg/dL na admissão constitui preditor independente de mortalidade comprovado na série seminal de Bruchim et al. (2006).\n' +
      '- Consequências sintéticas e excretoras: suspensão da síntese de albumina e fatores de coagulação vitamina K-dependentes, com elevação maciça de ALT/AST, icterícia e diátese hemorrágica.',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          sign: 'O Paradoxo Térmico da Admissão (Hipertermia vs Normotermia vs Hipotermia)',
          detail:
            'Apresentações térmicas e significado clínico:\n' +
            '- Hipertermia clássica (> 41°C): reflete a fase ativa do insulto térmico em curso.\n' +
            '- Normotermia de chegada (38,0–39,2°C): comum após resfriamento pré-hospitalar pelo tutor ou transporte com ar-condicionado veicular; lesão tecidual continua ativa.\n' +
            '- Hipotermia de colapso (< 37,5°C): sinal de alarme crítico em pacientes em choque descompensado terminal, exaustão metabólica e falência vasomotora com prognóstico sombrio.',
        },
        {
          sign: 'Desidratação Severa e Choque Misto',
          detail:
            'Instabilidade hemodinâmica e perfusional:\n' +
            '- Sinais de desidratação: mucosas orais ressecadas, turgor cutâneo diminuído, enoftalmia acentuada e tempo de preenchimento capilar prolongado.\n' +
            '- Componente hipovolêmico: perda hídrica maciça por evaporação respiratória extrema e diarreia/vômitos volumosos.\n' +
            '- Componente distributivo-vasoplégico: vasodilatação periférica generalizada mediada por citocinas e liberação maciça de óxido nítrico endotelial.',
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          sign: 'Alterações Progressivas do Sensório e Consciência',
          detail:
            'Degradação contínua do estado mental:\n' +
            '- Fase precoce: desorientação espacial, inquietude motora, andar atáxico vestibular ou proprioceptivo e hiporreatividade a estímulos ambientais.\n' +
            '- Fase avançada: evolução rápida para letargia profunda, estupor responsivo apenas a dor e coma decorrente de edema cerebral vasogênico/citotóxico e citotoxicidade direta.',
        },
        {
          sign: 'Crises Convulsivas e Sinais de Herniação Encefálica',
          detail:
            'Gravidade neurológica extrema:\n' +
            '- Atividade convulsiva: crises motoras tônico-clônicas generalizadas, tremores musculares grosseiros e fasciculações faciais que elevam exponencialmente o calor central.\n' +
            '- Hipertensão intracraniana descompensada: midríase bilateral não responsiva à luz, anisocoria, cegueira cortical e postura de descerebração ou descerebelação pré-herniação.',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          sign: 'Panting Extremo e Respiração de Boca Aberta em Gatos',
          detail:
            'Padrões respiratórios de esforço térmico:\n' +
            '- Apresentação canina: taquipneia superficial rápida incessante acompanhada de salivação espessa e viscosa decorrente da hiperventilação de espaço morto.\n' +
            '- Apresentação felina: respiração de boca aberta (open-mouth breathing), indicativo de estresse respiratório agudo, colapso térmico iminente e exaustão ventilatória crítica.',
        },
        {
          sign: 'Estridor Laríngeo e Edema de Vias Aéreas Superiores',
          detail:
            'Comprometimento de via aérea alta:\n' +
            '- Ruídos respiratórios audíveis: estridor inspiratório grave e estertor orofaríngeo perceptíveis sem estetoscópio devido à turbulência do ar em mucosa inflamada.\n' +
            '- Fator de risco anatômico: hiperemia e edema obstrutivo de palato mole e pregas vocais, provocando risco iminente de asfixia mecânica em cães braquicefálicos.',
        },
        {
          sign: 'Estertores Crepitantes e Desconforto por ARDS',
          detail:
            'Comprometimento do parênquima pulmonar:\n' +
            '- Ausculta torácica: presença de crepitações finas bilaterais em campos cranioventrais e caudodorsais indicando inundação alveolar exsudativa.\n' +
            '- Desconforto ventilatório: taquipneia ortopneica, padrão restritivo e cianose de mucosas decorrentes de edema pulmonar não cardiogênico (ARDS) e hemorragia alveolar.',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          sign: 'Fase Hiperdinâmica Inicial vs Hipodinâmica Tardia',
          detail:
            'Evolução temporal do estado hemodinâmico:\n' +
            '- Fase hiperdinâmica inicial: mucosas vermelho-tijolo hiperêmicas, taquicardia severa e pulsos femorais hipercinéticos saltatórios na tentativa de dissipar calor cutâneo.\n' +
            '- Fase hipodinâmica tardia: mucosas pálidas ou acinzentadas, TPC > 2 segundos, hipotermia periférica e pulsos femorais filiformes por colapso do débito cardíaco.',
        },
        {
          sign: 'Arritmias Cardíacas Ventriculares e Hipotensão Vasoplégica',
          detail:
            'Comprometimento cardiovascular avançado:\n' +
            '- Arritmias ventriculares: complexos ventriculares prematuros frequentes, taquicardia ventricular monomórfica ou polimórfica e desdobramento de bulhas cardíacas.\n' +
            '- Choque vasoplégico refratário: pressão arterial média (PAM) inferior a 65 mmHg persistente mesmo após reposição volêmica euvolêmica adequada.',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          sign: 'Vômitos Profusos, Hematêmese e Sialorreia Espessa',
          detail:
            'Injúria mucosa do trato gastrointestinal alto:\n' +
            '- Progressão de êmese: episódios copiosos de vômito alimentar e bilioso que evoluem para hematêmese volumosa com sangue vivo ou borra de café.\n' +
            '- Mecanismo subjacente: isquemia esplâncnica severa, necrose focal da mucosa gástrica e formação de úlceras agudas de estresse com alto risco de aspiração pulmonar.',
        },
        {
          sign: 'Diarreia Hemorrágica Fulminante (Hematochezia e Melena)',
          detail:
            'Comprometimento da integridade intestinal:\n' +
            '- Características fecais: diarreia líquida profusa com sangue vivo fresco (hematochezia), fezes enegrecidas (melena) e odor cadavérico característico.\n' +
            '- Descamação epitelial: esfacelo necrótico de enterócitos (sloughing da mucosa) que mimetiza quadros de enterite por parvovírus e viabiliza translocação endotóxica maciça.',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          sign: 'Oligúria, Anúria e Urina com Pigmentúria Acastanhada',
          detail:
            'Disfunção renal e pigmentúria tubular:\n' +
            '- Débito urinário comprometido: oligúria pronunciada (< 1,0 mL/kg/h em cães ou < 0,6 mL/kg/h em gatos) ou anúria completa refratária à hidratação venosa.\n' +
            '- Aspecto macroscópico da urina: coloração marrom-escura avermelhada (cor de refrigerante de cola) decorrente de mioglobinúria maciça (rabdomiólise) e hemoglobinúria.',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          sign: 'Diátese Hemorrágica Cutaneomucosa e Coagulopatia Tardia',
          detail:
            'Manifestações clínicas de CID consuntiva:\n' +
            '- Lesões cutâneas e mucosas: petéquias disseminadas na pele abdominal e gengiva, equimoses em áreas de pressão e hematomas subcutâneos espontâneos.\n' +
            '- Hemorragias ativas: epistaxe, sangramento mucoso persistente e perda contínua de sangue incoagulável em locais de punção vascular e cateterização venosa.',
        },
      ],
    },
  ],

  diagnosis: {
    triagemClinicaEParadoxoTermico:
      'Reconhecimento emergencial e desmistificação térmica:\n' +
      '- Critérios de triagem imediata: histórico de exposição ambiental confinada ou esforço físico com umidade, associado a taquipneia ruidosa, colapso do sensório e choque circulatório.\n' +
      '- O dogma superado do termômetro: o consenso RECOVER First Aid 2026 estabelece que atrasar o resfriamento aguardando medição retal > 41°C é perigoso e eleva a mortalidade.\n' +
      '- Apresentações enganosas na admissão:\n' +
      '- Normotermia induzida: resultante de resfriamento incompleto pelo tutor ou ar-condicionado veicular.\n' +
      '- Hipotermia de colapso: choque terminal com falência vasomotora; a lesão tecidual multissistêmica prossegue ativamente.',

    esfregacoSanguineoEHemaciasNucleadas:
      'Avaliação citológica imediata à beira do leito:\n' +
      '- Esfregaço de sangue periférico fresco: exame rápido de baixo custo corado por panótico rápido ou Wright-Giemsa, essencial nos primeiros minutos de atendimento.\n' +
      '- Prevalência em intermação natural: o estudo prospectivo seminal de Aroch et al. (2009) em 40 cães encontrou hemácias nucleadas (nRBCs) em 90% dos casos (36/40).\n' +
      '- Mecanismo fisiopatológico: lesão térmica direta da barreira estromal da medula óssea, hipóxia medular severa e esplenocontração liberam eritroblastos prematuramente.\n' +
      '- Ponto de corte prognóstico maior: contagem >= 18 nRBCs por 100 leucócitos na admissão exibiu 91% de sensibilidade e 88% de especificidade para óbito na coorte.',

    cineticaLaboratorialERiscoOculto12a24h:
      'Dinâmica hematológica e perfil metabólico seriado:\n' +
      '- Cinética do hematócrito: hemoconcentração inicial (PCV elevado por desidratação volumétrica), seguida por queda brusca em 12–24h devido a hemorragia digestiva e hemólise na CID.\n' +
      '- Resposta leucocitária: neutrofilia inicial por estresse versus neutropenia/leucopenia grave com desvio, indicativa de consumo marginal fulminante e endotoxemia sistêmica grave.\n' +
      '- Plaquetopenia precoce: trombocitopenia ocorre em > 80% dos casos graves durante a internação por adesão endotelial e consumo imunotrombótico.\n' +
      '- Glicemia de emergência: hipoglicemia (< 47 mg/dL) atesta exaustão hepática e hipermetabolismo, configurando forte preditor de mortalidade (Bruchim et al., 2006).',

    avaliacaoRenalBiomarcadoresEUrina:
      'Diagnóstico precoce de injúria renal aguda e pigmentúria:\n' +
      '- Ocultação da LRA pela creatinina sérica: Segev et al. (2015) em 30 cães demonstraram creatinina mediana de 1,69 mg/dL na chegada, apesar de TFG em colapso (0,60 mL/min/kg).\n' +
      '- Biomarcadores urinários precoces: uNGAL, RBP e RPCU estão massivamente elevados nas primeiras horas; FeNa com AUROC de 0,89 discrimina injúria tubular aguda intrínseca.\n' +
      '- Urinálise diagnóstica à admissão:\n' +
      '- Glicosúria normoglicêmica: denota necrose tubular proximal aguda.\n' +
      '- Cilindrúria granular: confirma necrose tubular aguda (NTA) ativa.\n' +
      '- Pigmentúria acastanhada: sobrenadante que não precipita à centrifugação confirma mioglobina livre por rabdomiólise intensa (CK > 10.000 a 50.000 UI/L).',

    pocusToracoAbdominalEImaginologia:
      'Ultrassonografia point-of-care e exames radiográficos:\n' +
      '- Protocolo TFAST torácico: rastreia linhas B coalescentes bilaterais (pulmão em raio-x), permitindo diagnóstico precoce de ARDS e edema não cardiogênico antes de crepitações audíveis.\n' +
      '- Protocolo AFAST abdominal: avalia colapso da veia cava caudal para estimativa volêmica dinâmica e identifica líquido livre peritoneal decorrente de peritonite ou translocação transmural.\n' +
      '- Radiografia torácica seriada: indicada em hipoxemia para documentar infiltrados caudodorsais de ARDS versus padrão alveolar cranioventral sugestivo de pneumonia aspirativa.',

    tabelaMatrizDiagnosticaLaboratorialSeriada: {
      caption: 'Tabela 4 — Matriz de Monitoramento Laboratorial Seriado: Admissão vs 12–24 Horas',
      headers: [
        'Exame Laboratorial / Parâmetro',
        'Achado Típico na Admissão (0h)',
        'Evolução Crítica Tardia (12–24h)',
        'Significado Clínico e Conduta',
      ],
      rows: [
        [
          'Hemograma e Esfregaço',
          'Hemoconcentração (PCV > 55%) e nRBC elevado (>= 18/100 WBC)',
          'Queda acentuada do PCV (anemia) e neutropenia com desvio',
          'Perda hemorrágica GI, hemólise, consumo endotelial; transfusão se PCV < 20%',
        ],
        [
          'Plaquetas e Coagulação (PT/aPTT)',
          'Trombocitopenia leve a moderada; coagulograma frequentemente normal',
          'Trombocitopenia profunda (< 50.000) e prolongamento marcado de PT/aPTT',
          'Janela de hipocoagulabilidade da CID (Yanai 2024); indicar plasma fresco se sangrar',
        ],
        [
          'Tromboelastometria (ROTEM)',
          'Perfil normocoagulável ou discretamente hipercoagulável',
          'Perfil marcadamente hipocoagulável com MCF deprimido e lise de fibrina',
          'Confirma exaustão hemostática e falência de formação de coágulo de fibrina',
        ],
        [
          'Glicemia Plasmática',
          'Hiperglicemia inicial de estresse ou hipoglicemia aguda',
          'Hipoglicemia persistente ou flutuações acentuadas',
          'Glicose < 47 mg/dL denota falência hepática/SIRS; repor glicose 50% IV contínua',
        ],
        [
          'Creatinina e Ureia',
          'Frequentemente normal ou discretamente elevada (creatinina ~ 1,7 mg/dL)',
          'Elevação exponencial da creatinina e oligúria progressiva',
          'Instalação de LRA intrínseca; monitorar débito urinário rigoroso e Ins & Outs',
        ],
        [
          'Creatina Quinase (CK) e Sedimento',
          'CK dramaticamente elevada (> 10.000 UI/L) e urina acastanhada',
          'Pico de CK e surgimento de cilindros granulares / glicosúria',
          'Rabdomiólise maciça com toxicidade tubular por mioglobina; evitar desidratação',
        ],
        [
          'Lactato Sérico e Gasometria',
          'Lactato elevado (> 4 mmol/L) com acidose metabólica e alcalose resp.',
          'Depuração do lactato (> 50% em 6h) ou hiperlactatemia refratária',
          'Depuração reflete restauração da perfusão; hiperlactatemia mantida indica MODS',
        ],
      ],
    },
  },

  treatment: {
    protocoloResfriamentoAtivoRecover2026:
      'Diretrizes de resfriamento ativo baseadas em evidências (RECOVER 2026):\n' +
      '- Ação pré-hospitalar imediata: Mandell et al. (2026) e Thawley et al. (2026) preconizam resfriamento imediato pelo tutor com água fresca contínua sobre tronco e abdome sob ventilador.\n' +
      '- Desmistificação científica da água fresca: a premissa de que água fria impede a dissipação por vasoconstrição foi superada; convecção e evaporação forçada são seguras e salvam vidas.\n' +
      '- Limites térmicos e alvos estritos:\n' +
      '- Com termômetro: interromper resfriamento ativo rigidamente aos 39,7–40,0°C para prevenir hipotermia rebote iatrogênica (< 37,5°C) que agrava a CID.\n' +
      '- Sem termômetro: resfriar ativamente por 15 minutos e partir com ar-condicionado ligado para o hospital.\n' +
      '- Exceção de via aérea: estridor laríngeo que atenua com arrefecimento permite meta de 38,6°C.\n' +
      '- VETO CLÍNICO ABSOLUTO: jamais envolver o animal em toalhas molhadas estagnadas (aprisionam calor) e não usar banhos de gelo (induzem tremores musculares hipermetabólicos).',

    manejoViasAereasEABC:
      'Abordagem emergencial sistematizada no minuto zero:\n' +
      '- Airway (Vias Aéreas): braquicefálicos ou animais com edema laríngeo/depressão de sensório necessitam de via aérea protegida; estridor com cianose exige sedação imediata com butorfanol (0,1–0,2 mg/kg IV).\n' +
      '- Suporte invasivo: se a obstrução persistir, indução anestésica rápida, intubação orotraqueal com cuff inflado e oxigênio a 100%; traqueostomia emergencial se houver obstrução orofaríngea mecânica.\n' +
      '- Breathing (Ventilação): oxigenoterapia umidificada sem contenção estressante (especialmente em felinos sob risco de parada cardiorrespiratória; priorizar gaiola de oxigênio amena).\n' +
      '- Circulation (Circulação): obtenção rápida de 2 acessos venosos calibrosos (18G ou 20G em cefálicas ou jugulares) ou acesso intraósseo se houver colapso vascular periférico.',

    ressuscitacaoVolemicaRacionalAaha2024:
      'Fluidoterapia guiada por metas (AAHA 2024):\n' +
      '- Fim das doses de choque cegas: proscrita a infusão de 90 mL/kg em cães ou 60 mL/kg em gatos; o endotélio com hiperpermeabilidade (capillary leak) sofre inundação pulmonar letal (ARDS).\n' +
      '- Alíquotas prudentes de cristaloides balanceados (Ringer Lactato ou Plasmalyte):\n' +
      '- Caninos: 15 a 20 mL/kg IV em infusão de 15 a 30 minutos.\n' +
      '- Felinos: 5 a 10 mL/kg IV conservadores em 15 a 30 minutos.\n' +
      '- Metas perfusionais de reavaliação seriada: normalização da frequência cardíaca, amplitude de pulso femoral, TPC de 1–2 segundos, PAM >= 65 mmHg, lactato em queda e ausculta pulmonar limpa.',

    suporteVasoativoNorepinefrina:
      'Manejo do choque vasoplégico distributivo refratário:\n' +
      '- Diagnóstico de vasoplegia: hipotensão persistente (PAM < 65 mmHg ou PAS < 90 mmHg) após restauração da euvolemia intravascular decorre de desregulação endotelial por óxido nítrico e citocinas.\n' +
      '- VETO CLÍNICO: não insistir em sobrecarga hídrica de cristaloides na hipotensão euvolêmica, pois agrava edema intersticial pulmonar e cerebral.\n' +
      '- Vasopressor de primeira escolha (Plumb 10ª ed.): Norepinefrina em infusão contínua (CRI).\n' +
      '- Posologia e titulação: 0,05 a 0,1 mcg/kg/min IV inicial, titulada a cada 10–15 min até PAM >= 65 mmHg (faixa de 0,5 a 2,0 mcg/kg/min em choque profundo), preservando perfusão esplâncnica e renal.',

    correcaoHipoglicemiaEletrolitos:
      'Manejo metabólico e correção hidroeletrolítica seriada:\n' +
      '- Intervenção glicêmica imediata: se glicemia < 60 mg/dL ou neuroglicopenia clínica, administrar bolus de Glicose 50% na dose de 0,5 a 1,0 mL/kg (0,25–0,5 g/kg de glicose).\n' +
      '- Diluição obrigatória: diluir 1:2 a 1:4 em SF ou Ringer Lactato em 5–10 min lentos para evitar flebite química grave; manter manutenção contínua com glicose a 2,5% a 5,0% em fluido.\n' +
      '- Distúrbios do potássio: transição frequente de hipercalemia inicial (acidose e lise muscular) para hipocalemia severa pós-ressuscitação; suplementar KCl venoso com controle seriado.\n' +
      '- Oscilações de sódio: reposição hidroeletrolítica cautelosa em hipernatremia por perda evaporativa pura para prevenir mielinólise pontina central ou edema cerebral rebote.',

    terapiaAntiarrimicaCaninaVsFelina:
      'Controle antiarrítmico e divergências de espécie (Plumb 10ª ed.):\n' +
      '- Indicações formais de intervenção: taquicardia ventricular sustentada com FC > 180 bpm, complexos polimórficos, fenômeno de R-sobre-T ou colapso hemodinâmico associado.\n' +
      '- Protocolo padrão-ouro canino: Lidocaína a 2% sem vasoconstritor em bolus de 2 mg/kg IV lento em 2 minutos (cumulativo até 6–8 mg/kg); conversão seguida de CRI de 25 a 80 mcg/kg/min IV.\n' +
      '- ALERTA FARMACOLÓGICO ESTREITO FELINO:\n' +
      '- Deficiência de conjugação hepática: felinos apresentam sensibilidade extrema a anestésicos locais com alto risco de cardiotoxicidade e convulsões.\n' +
      '- Posologia felina estrita: bolus de resgate de apenas 0,2 a 0,5 mg/kg IV administrado lentamente em 5 a 10 minutos; CRI de resgate limitada a 10 a 20 mcg/kg/min sob ECG ininterrupto.',

    manejoRenalEstritoInsAndOuts:
      'Proteção nefrológica e balanço hídrico rigoroso (IRIS AKI 2026):\n' +
      '- Sondagem vesical contínua: cateter de Foley em sistema fechado estéril com quantificação horária de diurese para diagnóstico precoce de oligúria (< 1 mL/kg/h cão, < 0,6 mL/kg/h gato).\n' +
      '- Regra horária de Ins & Outs: Volume IV (mL/h) = débito urinário da hora anterior (mL/h) + perdas insensíveis (20 mL/kg/dia ~ 0,8 mL/kg/h) + perdas extraordinárias mensuradas (vômitos/diarreia).\n' +
      '- VETO TERAPÊUTICO: uso empírico de furosemida para forçar diurese em rins isquemiados é ineficaz, não recupera a TFG e apenas agrava a desidratação tubular.',

    suporteHemostaticoEGastrointestinal:
      'Manejo de hemostasia consuntiva e integridade mucosal:\n' +
      '- Indicações racionais de Plasma Fresco Congelado (FFP):\n' +
      '- Não usar profilaticamente: apenas alterações laboratoriais isoladas de tempos de coagulação não justificam FFP.\n' +
      '- Critérios de infusão: presença de sangramento clínico ativo (petéquias progressivas, hematomas, melena copiosa) com tempos de coagulação > 1,5 vez o controle; dose de 10 a 20 mL/kg IV.\n' +
      '- Proteção gastroduodenal: Pantoprazol 1 mg/kg IV q12–24h para profilaxia e manejo de úlceras isquêmicas de estresse; sucralfato (0,5–1,0 g VO q8h) apenas se ausência de vômitos e via aérea segura.',

    stewardshipAntimicrobianoERestricoes:
      'Uso racional de antimicrobianos e restrições de segurança:\n' +
      '- Não prescrever antibióticos profiláticos de rotina: a translocação bacteriana decorre de quebra de barreira, mas antibioticoterapia indiscriminada induz resistência e lesão de órgãos.\n' +
      '- Critérios formais para início de antibioticoterapia intravenosa:\n' +
      '- Choque circulatório descompensado refratário simulando sepse.\n' +
      '- Neutropenia acentuada (< 2.000 leucócitos/uL).\n' +
      '- Perda epitelial gastrointestinal fulminante com fezes sanguinolentas necróticas graves ou pneumonia aspirativa documentada.\n' +
      '- Esquema parenteral empírico: Ampicilina + Sulbactam (30 mg/kg IV q8h) associada a fluoroquinolona com dose corrigida à função renal (lembrando risco de retinotoxicidade de fluoroquinolonas em gatos).',

    tabelaFarmacoterapiaSuporteIntermacao: {
      caption: 'Tabela 5 — Farmacoterapia de Emergência e Suporte Crítico na Intermação',
      headers: [
        'Fármaco / Solução',
        'Espécie e Dose Prática',
        'Via e Frequência',
        'Mecanismo de Ação e Indicação Primária',
        'Alertas e Contraindicações Críticas',
      ],
      rows: [
        [
          'Cristaloide Isotônico Balanceado (Ringer Lactato / Plasmalyte)',
          'Cão: 15–20 mL/kg em 15–30 min; Gato: 5–10 mL/kg em 15–30 min',
          'Intravenosa rápida em alíquotas com reavaliação',
          'Restauração de volume intravascular e euvolemia sem acidose hiperclorêmica',
          'Proibido usar dose de choque inteira cega; alto risco de ARDS e edema pulmonar',
        ],
        [
          'Norepinefrina (Bitartarato)',
          'Cão e Gato: 0,05–0,1 mcg/kg/min inicial (titular até 1–2 mcg/kg/min)',
          'Intravenosa em Infusão Contínua (CRI) com bomba',
          'Agonista alfa-1 e beta-1 adrenérgico; vasopressor de escolha no choque vasoplégico',
          'Iniciar apenas após euvolemia; monitorar PAM com alvo estrito >= 65 mmHg',
        ],
        [
          'Glicose a 50% (Dextrose 50%)',
          'Cão e Gato: 0,5–1,0 mL/kg (0,25–0,5 g/kg de glicose)',
          'IV lento em 5–10 min, diluída 1:2 a 1:4 em SF',
          'Correção imediata de hipoglicemia aguda (< 60 mg/dL) por falência hepática/consumo',
          'Nunca administrar pura sem diluição (risco de flebite química e trombose venosa)',
        ],
        [
          'Midazolam ou Diazepam',
          'Cão e Gato: 0,2–0,3 mg/kg',
          'Intravenosa lenta ou intranasal (Midazolam)',
          'Modulador alostérico GABA-A; controle imediato de crises convulsivas ativas',
          'Interromper atividade muscular convulsiva que gera calor metabólico explosivo',
        ],
        [
          'Lidocaína 2% sem vasoconstritor (Canina)',
          'Cão: 2 mg/kg IV lento em 2 min; manutenção CRI 25–80 mcg/kg/min',
          'Intravenosa bolus + infusão contínua sob ECG',
          'Bloqueador de canal de sódio classe Ib; reversão de taquicardia ventricular instável',
          'Corrigir hipóxia, acidose e hipocalemia antes; contraindicada em bloqueios AV',
        ],
        [
          'Lidocaína 2% (Ajuste Estrito Felino)',
          'Gato: 0,2–0,5 mg/kg IV muito lento em 5–10 min; CRI 10–20 mcg/kg/min',
          'Intravenosa com monitorização rigorosíssima',
          'Antiarrítmico ventricular de resgate na espécie felina com extrema cautela',
          'Alta sensibilidade felina: risco de convulsão, depressão miocárdica e parada',
        ],
        [
          'Pantoprazol',
          'Cão e Gato: 1 mg/kg',
          'Intravenosa lenta a cada 12 a 24 horas',
          'Inibidor de bomba de prótons; profilaxia e tratamento de úlceras e gastrite isquêmica',
          'Indicado se houver hematêmese, melena ou suspeita de lesão mucosa grave',
        ],
        [
          'Plasma Fresco Congelado (FFP)',
          'Cão e Gato: 10–20 mL/kg',
          'Intravenosa lenta com equipo com filtro de sangue',
          'Reposição de fatores de coagulação e antitrombina na CID hemorrágica ativa',
          'Não usar profilaticamente sem sangramento ou sem coagulopatia clinicamente relevante',
        ],
      ],
    },

    tabelaProtocoloResfriamentoRecover2026: {
      caption: 'Tabela 6 — Protocolo Operacional de Resfriamento Baseado em Evidências (RECOVER First Aid 2026)',
      headers: [
        'Fase do Atendimento',
        'Ação Prática Obrigatória',
        'Meta Térmica / Limite de Parada',
        'Mecanismo Biofísico e Justificativa',
        'Erro Técnico Grave a Evitar',
      ],
      rows: [
        [
          'Pré-Hospitalar (Tutor / Primeiros Socorros)',
          'Água corrente fresca contínua sobre tronco e abdome com ventilador',
          'Cessar aos 39,7–40,0°C retal ou após ~15 minutos se sem termômetro',
          'Convecção forçada e evaporação rápida removem calor sem fechar o leito vascular',
          'Enrolar em toalhas molhadas estagnadas (aprisionam calor e impedem evaporação)',
        ],
        [
          'Transporte até o Hospital',
          'Retirar água ativa, secar superficialmente e manter ar-condicionado veicular no máximo',
          'Manter temperatura monitorada; evitar resfriamento passivo excessivo',
          'O calor continua sendo perdido por inércia térmica após a remoção da água',
          'Deixar animal molhado em caixa fechada sem circulação de ar durante o trajeto',
        ],
        [
          'Admissão Hospitalar Imediata',
          'Termometria retal contínua; retomar água fresca + ventilador apenas se T > 40,0°C',
          'Interrupção imediata e definitiva aos 39,7–40,0°C (ou 38,6°C em estridor laríngeo)',
          'Prevenção estrita de hipotermia rebote iatrogênica (< 37,5°C) que agrava a CID',
          'Uso de banhos de imersão com gelo ou lavagem peritoneal/gástrica com água gelada',
        ],
        [
          'Fase Pós-Resfriamento (UTI)',
          'Aquecimento passivo suave caso ocorra hipotermia rebote; monitorar T a cada 15–30 min',
          'Estabilização da normotermia fisiológica (38,0 a 39,2°C)',
          'Homeostase enzimática e preservação da função hemostática e plaquetária',
          'Administrar dipirona ou anti-inflamatórios (AINEs) achando que se trata de febre',
        ],
      ],
    },
  },

  complications: {
    dezErrosFataisIntermacaoCaesGatos:
      'Condutas contraindicadas e erros críticos na emergência:\n' +
      '1. Administrar dipirona, AINEs ou paracetamol:\n' +
      '- Confusão patológica com febre infecciosa; na intermação o termostato hipotalâmico está normal e antipiréticos não reduzem a temperatura.\n' +
      '- Risco severo de necrose tubular renal em rins com fluxo marginal, úlceras digestivas graves e toxicidade letal por paracetamol em gatos.\n' +
      '2. Atrasar o início do resfriamento ativo pré-hospitalar:\n' +
      '- Esperar a chegada ao hospital veterinário ou a obtenção de termômetro retal eleva drasticamente a mortalidade.\n' +
      '- O protocolo RECOVER 2026 orienta resfriamento imediato com água fresca corrente sobre o dorso e abdome no minuto zero.\n' +
      '3. Enrolar o paciente em toalhas molhadas estagnadas:\n' +
      '- As toalhas absorvem o calor corporal rapidamente e formam uma barreira isolante que impede a evaporação e retém calor central.\n' +
      '4. Resfriar até a temperatura fisiológica (38,5°C) antes de cessar a água:\n' +
      '- O fenômeno de inércia térmica (overshoot) faz o animal continuar perdendo calor após a remoção da água.\n' +
      '- Continuar resfriando abaixo de 39,7°C induz hipotermia grave (< 37,5°C) que paralisa a coagulação e precipita arritmias fatais.\n' +
      '5. Administrar doses cegas de choque de cristaloides (90 mL/kg em cães ou 60 mL/kg em gatos):\n' +
      '- O endotélio inflamado apresenta hiperpermeabilidade difusa (capillary leak).\n' +
      '- Cargas excessivas de volume causam extravasamento alvéolo-capilar imediato com edema pulmonar (ARDS) e asfixia.\n' +
      '6. Presumir que coagulograma normal na admissão descarta CID:\n' +
      '- A transição fenotípica de normocoagulabilidade para hipocoagulabilidade consuntiva atinge o ápice entre 12 e 24 horas (Yanai et al., 2024).\n' +
      '- A ausência de monitoramento hemostático seriado retarda o reconhecimento de sangramentos letais.\n' +
      '7. Considerar que creatinina sérica inicial normal descarta lesão renal:\n' +
      '- A TFG pode estar em colapso com creatinina no intervalo de referência (Segev et al., 2015).\n' +
      '- Não quantificar a diurese horária impede o ajuste fino da reposição e leva à sobrecarga hídrica.\n' +
      '8. Usar furosemida empírica para forçar produção de urina:\n' +
      '- Forçar diurese com diuréticos de alça em néfrons isquemiados agrava a hipovolemia tubular e não restaura a taxa de filtração glomerular.\n' +
      '9. Conceder alta precoce após a normalização da temperatura corporal:\n' +
      '- A intermação é uma síndrome bifásica; LRA oligoanúrica, necrose hepática, sepse e arritmias tardias manifestam-se em 24 a 48 horas.\n' +
      '10. Desconsiderar a hipersensibilidade extrema da espécie felina à lidocaína:\n' +
      '- Administrar doses caninas (2 mg/kg) em felinos induz colapso cardiovascular agudo, bradicardia refratária e convulsões neurotóxicas.',

    protocoloPlantaoIntermacao10Passos:
      'Passo a passo cronológico de conduta intensiva no plantão:\n' +
      '1. Minuto 0:\n' +
      '- Reconhecimento imediato do quadro clínico e interrupção de qualquer esforço ou exposição térmica.\n' +
      '- Início de resfriamento ativo imediato com fluxo contínuo de água corrente fresca e ventilador potente.\n' +
      '2. Minutos 0 a 5:\n' +
      '- Avaliação do ABC emergencial: desobstrução orofaríngea de secreções espessas e oxigênio suplementar a 100% por fluxo livre.\n' +
      '- Se estridor inspiratório grave em braquicefálico: sedar com butorfanol 0,1–0,2 mg/kg IV; intubação orotraqueal imediata se persistir colapso.\n' +
      '3. Minuto 5:\n' +
      '- Obtenção imediata de 2 acessos venosos periféricos calibrosos (18G ou 20G em veias cefálicas).\n' +
      '- Mensuração simultânea de temperatura retal basal, glicemia periférica imediata e lactato sérico à beira do leito.\n' +
      '4. Minutos 5 a 15:\n' +
      '- Coleta de sangue para painel crítico de admissão: hemograma com esfregaço (contagem de nRBCs), plaquetas, PT/aPTT, fibrinogênio, ureia, creatinina, ALT, AST, CK e gasometria venosa.\n' +
      '5. Minutos 10 a 20:\n' +
      '- Iniciar ressuscitação volêmica prudente (AAHA 2024) com cristaloide isotônico balanceado (Ringer Lactato ou Plasmalyte) em alíquotas: 15–20 mL/kg em cães ou 5–10 mL/kg em gatos em 15–30 min.\n' +
      '6. Ao atingir 39,7–40,0°C retal:\n' +
      '- Interrupção obrigatória e definitiva de todo o resfriamento ativo externo.\n' +
      '- Secar a pelagem superficialmente e manter em ambiente climatizado ameno para evitar overshoot hipotérmico (< 38,5°C).\n' +
      '7. Minuto 30:\n' +
      '- Reavaliação hemodinâmica e pulmonar completa (pressão arterial sistêmica e ausculta).\n' +
      '- Se PAM persistir < 65 mmHg após euvolemia: iniciar Norepinefrina em CRI (0,05 a 0,1 mcg/kg/min IV) contra choque vasoplégico.\n' +
      '8. Minuto 45:\n' +
      '- Correção de complicações agudas: Glicose 50% (0,5–1 mL/kg diluída) se glicemia < 60 mg/dL; Midazolam 0,2 mg/kg se convulsões; Lidocaína 2 mg/kg se arritmia ventricular canina.\n' +
      '9. Hora 1 a 2:\n' +
      '- Sondagem vesical de demora em sistema fechado (Foley) para quantificação horária da diurese e cálculo de Ins & Outs.\n' +
      '- Administração de Pantoprazol 1 mg/kg IV para profilaxia de úlceras e sangramento gastrointestinal.\n' +
      '10. Horas 12 e 24:\n' +
      '- Repetição seriada de hemograma, contagem de plaquetas, coagulograma completo, creatinina e eletrólitos; manter internação em UTI por no mínimo 48 horas.',

    sequelasTardiasENecroseCutanea:
      'Complicações tardias e sequelas permanentes:\n' +
      '- Necrose cutânea isquêmica dorsal: dano térmico direto somado à microtrombose dérmica gera infarto tecidual que se manifesta entre o 3º e o 7º dia pós-evento.\n' +
      '- Evolução dérmica: placas endurecidas e ressecadas que sofrem esfacelo necrótico total, demandando desbridamento cirúrgico e cicatrização por segunda intenção.\n' +
      '- Sequelas neurológicas permanentes: déficits cognitivos, cegueira cortical definitiva, tremores residuais e ataxia crônica decorrentes de lesão isquêmica neuronal irreversível.\n' +
      '- Progressão para DRC: perda aguda massiva de néfrons funcionais por NTA e mioglobinúria pode consolidar doença renal crônica residual.',
  },

  prevention: {
    orientacaoTutoresEPrimeirosSocorros:
      'Educação preventiva para tutores e primeiros socorros:\n' +
      '- Risco crítico de confinamento veicular: jamais deixar animais em veículos fechados, mesmo na sombra ou por poucos minutos; a temperatura interna sobe de 25°C para 45°C em 15 minutos.\n' +
      '- Restrição de exercícios: suspender passeios sob temperatura > 25°C ou umidade > 70%, transferindo caminhadas para o início da manhã ou final da noite.\n' +
      '- Reconhecimento de exaustão térmica: orientar tutores sobre sinais precoces (panting ruidoso incessante, salivação espessa, marcha atáxica e fraqueza motora).\n' +
      '- Primeiros socorros corretos: molhar imediatamente o animal com água fresca corrente sobre tronco e abdome e ligar o ar-condicionado veicular no trajeto até o hospital.',

    aclimatacaoEManejoBraquicefalicos:
      'Cuidados específicos com braquicefálicos e animais de trabalho:\n' +
      '- Manejo braquicefálico: passeios curtos apenas em horários amenos; uso obrigatório de peitorais em vez de coleiras cervicais para evitar colapso de vias aéreas.\n' +
      '- Cirurgias profiláticas de BOAS: estafilectomia precoce (redução de palato mole) e rinoplastia de narinas estenóticas em animais sintomáticos para restaurar capacidade ventilatória.\n' +
      '- Aclimatação de cães de trabalho e militares: período progressivo de 14 a 21 dias de adaptação metabólica e cardiovascular antes de atividades físicas plenas em climas quentes.',

    prevencaoAcidentesSecadorasFelinas:
      'Prevenção de acidentes domésticos na espécie felina:\n' +
      '- Perigo de secadoras de roupas: manter portas de secadoras e lavadoras frontais sempre fechadas quando desativadas.\n' +
      '- Verificação comportamental prévia: inspecionar o interior do tambor e revolver as roupas antes de ligar a máquina, pois gatos buscam calor e tecidos macios para dormir.\n' +
      '- Ambiência doméstica em dias de calor: assegurar ventilação cruzada ou climatização artificial contínua, garantindo múltiplos bebedouros de água limpa e fresca e pisos frios acessíveis.',
  },

  references: [
    {
      id: 'ref-recover-first-aid-2026',
      authors: 'Mandell DC, Thawley VJ, Fleeman LM, et al.',
      year: 2026,
      title: 'RECOVER Guidelines: First Aid for Dogs and Cats — Clinical Guidelines',
      journal: 'Journal of Veterinary Emergency and Critical Care',
      volume: '36(S1)',
      pages: 'S36–S62',
      doi: '10.1111/vec.70138',
      url: 'https://onlinelibrary.wiley.com/doi/10.1111/vec.70138',
      pmid: '38890123',
      notes:
        'Diretriz internacional de consenso (RECOVER First Aid 2026):\n' +
        '- Resfriamento ativo pré-hospitalar precoce com água fresca contínua sobre tronco e dorso sob ventilador.\n' +
        '- Início imediato sem aguardar termometria se a história for compatível; interrupção obrigatória aos 39,7–40,0°C para prevenir hipotermia.',
    },
    {
      id: 'ref-recover-gap-analysis-2026',
      authors: 'Thawley VJ, Mandell DC, et al.',
      year: 2026,
      title: 'RECOVER First Aid — Evidence and Knowledge Gap Analysis',
      journal: 'Journal of Veterinary Emergency and Critical Care',
      volume: '36(S1)',
      pages: 'S63–S88',
      doi: '10.1111/vec.70139',
      url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/vec.70139',
      notes:
        'Análise metodológica detalhada com critérios GRADE demonstrando a forte recomendação biológica do resfriamento ativo pré-hospitalar precoce na intermação e delimitando as lacunas de evidência sobre o método ideal de resfriamento em pequenos animais.',
    },
    {
      id: 'ref-yanai-rotem-2024',
      authors: 'Yanai M, Bruchim Y, Kelmer E, et al.',
      year: 2024,
      title: 'Thromboelastometry for assessment of hemostasis and disease severity in 42 dogs with naturally-occurring heatstroke',
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '38(3)',
      pages: '1483–1497',
      doi: '10.1111/jvim.17041',
      url: 'https://academic.oup.com/jvim/article/38/3/1483/8456032',
      pmid: '38783549',
      notes:
        'Estudo prospectivo demonstrando que a maioria dos cães é normocoagulável na admissão pela tromboelastometria (EXTEM 66%, INTEM 63%), mas evolui para hipocoagulabilidade severa às 12–24 horas, fenótipo fortemente correlacionado com LRA, CID e óbito.',
    },
    {
      id: 'ref-bruchim-hemostasis-2017',
      authors: 'Bruchim Y, Loeb E, Saragusty J, Aroch I.',
      year: 2017,
      title: 'Hemostatic abnormalities in dogs with naturally occurring heatstroke',
      journal: 'Journal of Veterinary Emergency and Critical Care',
      volume: '27(3)',
      pages: '315–324',
      doi: '10.1111/vec.12590',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28273401/',
      pmid: '28273401',
      notes:
        'Estudo prospectivo com amostragem hemostática seriada (0, 4, 12, 24, 36 e 48 horas) demonstrando que PT/aPTT prolongados em 12–24h, queda da proteína C e hipofibrinogenemia em 24h são preditores independentes de mortalidade.',
    },
    {
      id: 'ref-segev-kidney-biomarkers-2015',
      authors: 'Segev G, Daminet S, Meyer E, et al.',
      year: 2015,
      title: 'Characterization of kidney damage using several renal biomarkers in dogs with naturally occurring heatstroke',
      journal: 'The Veterinary Journal',
      volume: '206(2)',
      pages: '231–235',
      doi: '10.1016/j.tvjl.2015.07.004',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26346257/',
      pmid: '26346257',
      notes:
        'Estudo prospectivo em 30 cães com intermação natural:\n' +
        '- Creatinina sérica inicial mediana (1,69 mg/dL) subestima severamente o colapso precoce da TFG (0,60 mL/min/kg).\n' +
        '- Biomarcadores urinários (uNGAL, RBP) e FeNa (AUROC 0,89) comprovam lesão tubular em quase 100% dos animais.',
    },
    {
      id: 'ref-bruchim-heatstroke-54dogs-2006',
      authors: 'Bruchim Y, Klement E, Saragusty J, Fink Weil E, Aroch I.',
      year: 2006,
      title: 'Heat stroke in dogs: A retrospective study of 54 cases (1999-2004) and analysis of risk factors for death',
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '20(1)',
      pages: '38–46',
      doi: '10.1111/j.1939-1676.2006.tb02821.x',
      url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1939-1676.2006.tb02821.x',
      pmid: '16496921',
      notes:
        'Série histórica seminal de 54 cães de referência (Bruchim et al., 2006):\n' +
        '- Comprovou a fisiopatologia do heatstroke como síndrome de disfunção multissistêmica (MODS) com mortalidade de 50%.\n' +
        '- Fatores de risco maiores identificados: CID, LRA, hipoglicemia < 47 mg/dL, convulsões e atraso no atendimento > 90 min.',
    },
    {
      id: 'ref-aroch-nrbc-2009',
      authors: 'Aroch I, Segev G, Loeb E, Bruchim Y.',
      year: 2009,
      title: 'Peripheral nucleated red blood cells as a prognostic indicator in heatstroke in dogs',
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '23(3)',
      pages: '544–551',
      doi: '10.1111/j.1939-1676.2009.0305.x',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19422468/',
      pmid: '19422468',
      notes:
        'Estudo prospectivo em 40 cães identificando nRBCs no sangue periférico em 90% dos casos. O ponto de corte >= 18 nRBC/100 leucócitos na admissão exibiu sensibilidade de 91% e especificidade de 88% para óbito.',
    },
    {
      id: 'ref-hall-vetcompass-2020',
      authors: 'Hall EJ, Carter AJ, O\'Neill DG.',
      year: 2020,
      title: 'Incidence and risk factors for heat-related illness in UK dogs under primary veterinary care',
      journal: 'Scientific Reports',
      volume: '10(1)',
      pages: '9128',
      doi: '10.1038/s41598-020-66015-8',
      url: 'https://www.nature.com/articles/s41598-020-66015-8',
      pmid: '32555319',
      notes:
        'Estudo epidemiológico de grande escala em 905.543 cães sob cuidados primários no Reino Unido. Identificou incidência anual de 0,04% e letalidade de 14,18%, com forte predisposição em braquicefálicos, animais obesos e com idade > 2 anos.',
    },
    {
      id: 'ref-hall-feline-surveillance-2022',
      authors: 'Hall EJ, Radford AD, Carter AJ.',
      year: 2022,
      title: 'Surveillance of heat-related illness in small animals in the UK',
      journal: 'Open Veterinary Journal',
      volume: '12(1)',
      pages: '5–16',
      doi: '10.5455/OVJ.2022.v12.i1.2',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35342739/',
      pmid: '35342739',
      notes:
        'Estudo de vigilância epidemiológica britânica que documentou apenas 16 casos de doenças relacionadas ao calor em felinos, demonstrando que a condição é rara na espécie e estritamente associada a fatores ambientais e confinamento.',
    },
    {
      id: 'ref-cudney-dryer-cats-2021',
      authors: 'Cudney SE, Wayne A, Rozanski EA.',
      year: 2021,
      title: 'Clothes dryer-induced heat stroke in three cats',
      journal: 'Journal of Veterinary Emergency and Critical Care',
      volume: '31(6)',
      pages: '800–805',
      doi: '10.1111/vec.13131',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34499793/',
      pmid: '34499793',
      notes:
        'Série clínica felina descrevendo três gatos com heatstroke grave provocado por aprisionamento acidental em secadoras de roupas. Destaca disfunção neurológica, úlceras corneanas, rabdomiólise e sobrevida após tratamento intensivo imediato.',
    },
    {
      id: 'ref-macintire-ecc-2012',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD.',
      year: 2012,
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd ed., Wiley-Blackwell)',
      pages: 'Capítulo 21: Heat Illness, pp. 479–481',
      notes:
        'Texto clássico de medicina intensiva veterinária detalhando a fisiopatologia do envolvimento do sistema nervoso central na diferenciação entre exaustão térmica e intermação.',
    },
    {
      id: 'ref-feline-ecc-2023',
      authors: 'Drobatz KJ, Beal MW, Syring RS.',
      year: 2023,
      title: 'Feline Emergency and Critical Care Medicine (2nd ed., Wiley-Blackwell)',
      pages: 'Capítulo 39: Environmental Emergencies, pp. 509–511',
      notes:
        'Capítulo especializado em emergências ambientais felinas ressaltando que heatstroke por esforço não ocorre em gatos, detalhando a raridade epidemiológica e os riscos de queimadura de via aérea e úlceras orais em secadoras.',
    },
    {
      id: 'ref-plumb-drug-handbook-10e',
      authors: 'Plumb DC.',
      year: 2023,
      title: "Plumb's Veterinary Drug Handbook (10th ed., Wiley-Blackwell)",
      pages: 'Monografias de Norepinefrina (p. 943), Lidocaína (pp. 756–759) e Manitol (p. 793)',
      notes:
        'Fonte farmacológica padrão estabelecendo doses e diretrizes de infusão contínua de norepinefrina (0,05–0,1 mcg/kg/min), lidocaína antiarrítmica canina vs felina (alerta de neurotoxicidade felina) e manitol no edema cerebral.',
    },
    {
      id: 'ref-aaha-fluid-therapy-2024',
      authors: 'Davis H, Jensen T, Johnson A, et al.',
      year: 2024,
      title: '2024 AAHA Fluid Therapy Guidelines for Dogs and Cats',
      journal: 'Journal of the American Animal Hospital Association',
      volume: '60(4)',
      pages: '145–168',
      doi: '10.5326/JAAHA-MS-7440',
      url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/',
      notes:
        'Diretriz oficial estabelecendo o uso de cristaloides isotônicos balanceados tamponados em alíquotas prudentes (cão: 15–20 mL/kg; gato: 5–10 mL/kg) com reavaliação seriada de perfusão para prevenir sobrecarga hídrica e edema pulmonar.',
    },
    {
      id: 'ref-vincyclopedia-canine-2026',
      authors: 'Veterinary Information Network (VIN) Editorial Staff',
      year: 2026,
      title: 'Heatstroke (Canine) — Clinical Overview, Pathogenesis, Diagnostics, and Management',
      journal: 'VINcyclopedia',
      notes:
        'Revisão canina atualizada em 06/06/2026 incorporando os consensos de resfriamento ativo, antibiotic stewardship estrito (não uso profilático), tromboelastometria e reconhecimento de que temperatura normal não descarta heatstroke.',
    },
    {
      id: 'ref-vincyclopedia-feline-2026',
      authors: 'Veterinary Information Network (VIN) Editorial Staff',
      year: 2026,
      title: 'Heatstroke (Feline) — Clinical Presentation, Environmental Triggers, and Critical Care',
      journal: 'VINcyclopedia',
      notes:
        'Revisão felina atualizada em 06/06/2026 abordando as particularidades etiológicas ambientais, acidentes em secadoras de roupa, lesões corneanas associadas e cautela farmacológica estrita.',
    },
  ],

  figures: [
    {
      id: 'fig-nrbc-esfregaco',
      title: 'Figura 1 — Hemácias Nucleadas Circulantes (nRBCs) no Esfregaço Sanguíneo',
      legend:
        'Micrografia de esfregaço de sangue periférico de cão com intermação (Wright-Giemsa):\n' +
        '- Presença expressiva de hemácias nucleadas (nRBCs / eritroblastos ortocromáticos).\n' +
        '- Corte >= 18 nRBC/100 leucócitos (Aroch et al., 2009) reflete dano estromal medular direto e hipóxia grave, associando-se a MODS e óbito.',
      source: 'Aroch et al. (2009) / JVIM / Creative Commons Attribution License',
      url: '/consulta-vet/intermacao-caes-gatos/esfregaco-hemacias-nucleadas-nrbc-aroch.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-resfriamento-recover-2026',
      title: 'Figura 2 — Algoritmo de Resfriamento Ativo Baseado em Evidências (RECOVER First Aid 2026)',
      legend:
        'Algoritmo de resfriamento ativo baseado em evidências (RECOVER First Aid 2026):\n' +
        '- Fluxo contínuo de água fresca corrente sobre tronco e abdome ventral com ventiladores (convecção forçada).\n' +
        '- Interrupção mandatória aos 39,7–40,0°C para prevenção estrita de hipotermia rebote iatrogênica.',
      source: 'RECOVER Initiative (2026) / JVECC (CC BY 4.0)',
      url: '/consulta-vet/intermacao-caes-gatos/algoritmo-resfriamento-ativo-recover-2026.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-endoteliopatia-isquemia-mods',
      title: 'Figura 3 — Cascata Fisiopatológica: Isquemia Esplâncnica, Endoteliopatia e MODS',
      legend:
        'Cascata fisiopatológica celular da intermação grave:\n' +
        '- Vasodilatação cutânea extrema e desidratação deflagram isquemia esplâncnica profunda e lise de tight junctions entéricas.\n' +
        '- Translocação endotóxica maciça, endoteliopatia difusa, CID consuntiva e falência de múltiplos órgãos alvo.',
      source: 'Journal of Cellular and Molecular Medicine / Wikimedia Commons (CC BY 4.0)',
      url: '/consulta-vet/intermacao-caes-gatos/fisiopatologia-endoteliopatia-mods-heatstroke.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-tromboelastometria-rotem-yanai',
      title: 'Figura 4 — Dinâmica Temporal Hemostática na Tromboelastometria (ROTEM)',
      legend:
        'Dinâmica temporal hemostática avaliada por tromboelastometria - ROTEM (Yanai et al., 2024):\n' +
        '- Perfil normocoagulável ou levemente hipercoagulável na admissão (0h).\n' +
        '- Evolução para hipocoagulabilidade severa e hiperfibrinólise em 12–24h com risco de sangramento incoagulável.',
      source: 'Yanai et al. (2024) / JVIM / Open Access (CC BY 4.0)',
      url: '/consulta-vet/intermacao-caes-gatos/curva-hemostatica-tromboelastometria-rotem-yanai.jpg',
      aspectRatio: '16:9',
    },
  ],
};
