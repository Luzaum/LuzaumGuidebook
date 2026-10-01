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
    'ALERTA CRÍTICO DE EMERGÊNCIA — INTERMAÇÃO NÃO TERMINA QUANDO A TEMPERATURA NORMALIZA: Lesão Renal Aguda (LRA / AKI), Coagulação Intravascular Disseminada (CID), hepatopatia aguda, Síndrome do Desconforto Respiratório Agudo (ARDS), hipoglicemia fulminante e hemorragia gastrointestinal podem surgir ou sofrer deterioração catastrófica horas ou dias após o resfriamento. A intermação é uma emergência sistêmica potencialmente fatal decorrente do acúmulo patológico de calor corporal que sobrepuja a capacidade fisiológica de dissipação térmica, deflagrando desnaturação proteica maciça, citotoxicidade térmica direta, resposta inflamatória sistêmica desregulada (SIRS), colapso circulatório distributivo-hipovolêmico e lesão endotelial generalizada. Clinicamente, o heatstroke é tradicionalmente caracterizado por hipertermia corporal central extrema (tipicamente > 41°C) combinada com disfunção do sistema nervoso central e falência de múltiplos órgãos. Entretanto, a normotermia ou mesmo a hipotermia no momento do atendimento inicial não exclui o diagnóstico, visto que o paciente pode ter sofrido resfriamento prévio por tutores, ter sido retirado da fonte de calor há tempo prolongado ou ter entrado em colapso termorregulatório e circulatório terminal. As diretrizes internacionais RECOVER First Aid 2026 revolucionaram a abordagem pré-hospitalar ao recomendar o resfriamento ativo imediato com água corrente fresca sobre o tronco e abdome com circulação forçada de ar, superando a antiga contraindicação absoluta ao uso de água fria. O manejo intensivo exige diferenciação categórica entre intermação e febre, proibindo terminantemente antipiréticos e AINEs, além de reposição volêmica estrita segundo as diretrizes AAHA 2024 para evitar sobrecarga hídrica e edema pulmonar em um leito vascular já comprometido por endoteliopatia.',

  quickSummaryRich: {
    lead:
      'A intermação (heatstroke) representa o ápice crítico do espectro das doenças relacionadas ao calor, evoluindo de estresse térmico e exaustão térmica para uma síndrome de resposta inflamatória sistêmica (SIRS) e falência de múltiplos órgãos (MODS). A diretriz de consenso RECOVER First Aid 2026 estabelece que o resfriamento ativo pré-hospitalar não deve aguardar a confirmação termométrica quando o histórico e os sinais clínicos forem fortemente compatíveis. O dano celular não cessa com a queda da temperatura: a isquemia esplâncnica com translocação de endotoxinas e a endoteliopatia com consumo de fatores hemostáticos atingem seu nadir em uma janela oculta de 12 a 24 horas pós-insulto, demandando suporte avançado ininterrupto em UTI.',
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
        body: 'A proibição histórica de água fria por receio de vasoconstrição periférica foi superada pelo consenso RECOVER First Aid 2026. A prioridade absoluta é o resfriamento ativo pré-hospitalar imediato com água fresca corrente sobre o tronco e abdome associada a ventiladores. O resfriamento ativo deve ser cessado rigorosamente aos 39,7–40,0°C (ou 38,6°C se houver estridor de vias aéreas com melhora do esforço) para prevenir hipotermia rebote iatrogênica.',
        highlights: [
          'RECOVER First Aid 2026',
          'água fresca corrente sobre o tronco',
          '39,7–40,0°C',
          'prevenir hipotermia rebote',
        ],
      },
      {
        title: 'Pilar 2 — Fisiopatologia Térmico-Endotelial e MODS Dinâmico',
        body: 'O heatstroke comporta-se como uma endoteliopatia difusa somada a choque misto (hipovolêmico e distributivo). A hipertermia desnatura proteínas celulares e desarranja membranas mitocondriais. A vasoconstrição esplâncnica compensatória deflagra isquemia intestinal, quebra de junções oclusivas e translocação maciça de endotoxinas bacterianas, amplificando a tempestade inflamatória mesmo sem infecção bacteriana ativa prévia.',
        highlights: [
          'endoteliopatia difusa',
          'choque misto',
          'isquemia intestinal',
          'translocação maciça de endotoxinas',
        ],
      },
      {
        title: 'Pilar 3 — Ressuscitação Hemodinâmica Racional (AAHA 2024) e Vasopressores',
        body: 'A administração descontrolada de doses de choque de cristaloides é deletéria devido à perda de integridade vascular (capillary leak) e alto risco de ARDS. Recomenda-se alíquotas conservadoras de cristaloides isotônicos balanceados (cão: 15–20 mL/kg; gato: 5–10 mL/kg em 15–30 min) com reavaliação de perfusão. Se a hipotensão persistir após restauração volêmica, inicia-se prontamente infusão contínua de norepinefrina para meta de PAM >= 65 mmHg.',
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
        body: 'A gravidade hemostática e renal pode ser mascarada na admissão. Estudos contemporâneos com tromboelastometria (Yanai et al., 2024) e coagulograma seriado (Bruchim et al., 2017) comprovam que pacientes normocoaguláveis na entrada tornam-se profundamente hipocoaguláveis entre 12 e 24 horas. Da mesma forma, a creatinina inicial subestima a lesão renal aguda (Segev et al., 2015), exigindo monitoramento intensivo por 24 a 48 horas.',
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
            'Coleta de sangue imediata: hemograma completo com esfregaço sanguíneo minucioso para quantificação de hemácias nucleadas (nRBCs; corte prognóstico >= 18 nRBC/100 leucócitos), hematócrito, plaquetas, glicemia, lactato e eletrólitos com cálcio ionizado.',
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
      'A intermação decorre de uma falha termorreguladora aguda em que a taxa de ganho e produção interna de calor excede amplamente a capacidade fisiológica do organismo de eliminá-lo para o ambiente. Uma distinção biológica indispensável separa a intermação da febre infecciosa ou inflamatória: na febre, citocinas pirogênicas endógenas (como IL-1, IL-6 e TNF-alfa) estimulam a síntese de prostaglandina E2 (PGE2) no centro termorregulador do hipotálamo pré-óptico, elevando intencionalmente o ponto de ajuste térmico (set point) para um patamar mais alto (exemplo: 40°C). Nessa situação febril, o corpo busca ativamente reter calor e responde eficazmente a fármacos antipiréticos que inibem a cicloxigenase e a síntese de PGE2. Em nítido contraste, na intermação o set point hipotalâmico permanece estritamente inalterado e normal: o hipotálamo tenta desesperadamente deflagrar mecanismos de dissipação de calor (vasodilatação periférica máxima e taquipneia evaporativa), mas a sobrecarga calórica sobrepuja os limites físicos do sistema. Consequentemente, medicamentos antipiréticos tradicionais — como dipirona, anti-inflamatórios não esteroidais (AINEs) e paracetamol (acetaminofeno) — são absolutamente ineficazes no tratamento da intermação. Além de não possuírem alvo terapêutico na patologia, sua administração é nefasta: os AINEs potencializam a necrose tubular renal em rins com perfusão marginal e agravam a erosão da barreira gastrointestinal, enquanto o paracetamol acarreta toxicidade hepática fulminante e metemoglobinemia letal em felinos.',

    mecanismosBiofisicosPerdaCalorica:
      'A manutenção da temperatura corporal obedece ao balanço biofísico: Calor Produzido + Calor Absorvido = Calor Armazenado + Calor Eliminado. A perda de calor para o meio ambiente ocorre por quatro vias físicas principais: radiação (emissão eletromagnética de calor para superfícies distantes mais frias, sem contato físico direto), condução (transferência térmica direta por contato com superfícies mais frias, como o solo), convecção (remoção contínua da camada de ar ou água aquecida adjacente à pele por correntes gasosas ou líquidas) e evaporação (dissipação endotérmica de grande quantidade de energia térmica através da transformação da água em vapor). Em condições de repouso e temperaturas amenas, radiação e convecção respondem pela maior parte da perda de calor. Todavia, quando a temperatura do ambiente se eleva e se aproxima da temperatura da superfície cutânea (aproximadamente 32 a 35°C), o gradiente térmico para radiação e convecção praticamente desaparece. Nesse cenário crítico, a evaporação torna-se a única via biológica remanescente capaz de promover perda líquida de calor corporal. Cães e gatos possuem glândulas sudoríparas écrinas funcionais restritas quase exclusivamente aos coxins plantares, que desempenham papel insignificante na termorregulação sistêmica. Dessa forma, o principal mecanismo fisiológico de dissipação evaporativa em carnívoros domésticos é a respiração ofegante (panting), caracterizada por respiração superficial e rápida que movimenta expressivos volumes de ar sobre a mucosa ricamente vascularizada da cavidade oral, língua e trato respiratório superior.',

    vulnerabilidadeBraquicefalicaEAltaUmidade:
      'A eficiência da perda evaporativa através do panting depende criticamente do gradiente de pressão de vapor de água existente entre a superfície mucosa úmida e o ar ambiente. Quando a umidade relativa do ar atinge patamares elevados (superiores a 80%), o ar ambiente encontra-se saturado de vapor de água, reduzindo drasticamente a capacidade de evaporação da saliva e da umidade mucosa. Nessas condições de alta umidade, mesmo temperaturas ambientais moderadas (por volta de 28 a 32°C) podem precipitar intermação grave. Adicionalmente, cães braquicefálicos (como Buldogue Francês, Buldogue Inglês, Pug e Boxer) sofrem de uma desvantagem anatômica e biofísica extrema decorrente da Síndrome Obstrutiva das Vias Aéreas dos Braquicefálicos (BOAS): a estenose de narinas, o palato mole excessivamente alongado e espessado, a presença de cornetos nasais aberrantes e a redundância de tecidos orofaríngeos impõem uma resistência brutal ao fluxo aéreo. Para gerar ventilação respiratória, esses animais necessitam de pressões negativas intratorácicas monumentais, o que gera trabalho muscular extenuante e produz quantidades colossais de calor metabólico endógeno justamente enquanto tentam eliminar calor. Simultaneamente, a área de superfície mucosa viável para fluxo laminar e evaporação é deficiente. O esforço respiratório contínuo induz edema laríngeo agudo e eversão de sáculos laríngeos, estabelecendo um ciclo vicioso de retroalimentação positiva onde a obstrução mecânica e a retenção térmica progridem rapidamente para asfixia, colapso e morte térmica.',

    hipertermiaNaoAmbientalSecundaria:
      'Embora o heatstroke ambiental e por esforço represente a causa clássica, hipertermia extrema potencialmente fatal (temperatura central > 41°C) pode ser desencadeada por distúrbios que produzem aumento explosivo do metabolismo muscular esquelético ou desregulação neurológica primária, sem necessidade de exposição solar ou confinamento em ambiente aquecido. As principais causas incluem o status epilepticus convulsivo prolongado ou agrupamento de crises, nos quais a atividade motora contínua gera calor em velocidade superior à capacidade de perda; a tetania muscular por hipocalcemia; a síndrome da hipertermia maligna genética (mutação no receptor de rianodina RYR1 deflagrada por anestésicos inalatórios voláteis ou relaxantes musculares despolarizantes); e diversas intoxicações neurotóxicas graves. Entre as toxicoses clássicas associadas a tremores intensos e hipertermia grave destacam-se a intoxicação por metaldeído (moluscicida), micotoxinas tremorgênicas (penitrem A e roquefortina provenientes de alimentos mofados), estricnina, inseticidas organofosforados e carbamatos (via hiperatividade colinérgica e fasciculações musculares), piretroides em gatos e fármacos simpatomiméticos ou anfetaminas. Em felinos, o hipertireoidismo grave descompensado (tempestade tireoidiana) e a hipertermia disfuncional pós-administração de opioides (especialmente hidromorfona, buprenorfina e tramadol) integram a lista de diagnósticos diferenciais essenciais.',

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
      'A epidemiologia contemporânea da intermação canina foi substancialmente redefinida por grandes investigações populacionais britânicas. O estudo VetCompass de atenção primária liderado por Hall et al. (2020), avaliando uma coorte monumental de 905.543 cães sob cuidados veterinários primários no Reino Unido, identificou uma incidência anual estimada de 0,04% de doenças relacionadas ao calor, com taxa de letalidade global de 14,18%. O estudo comprovou que raças braquicefálicas apresentaram probabilidade substancialmente maior de desenvolver a doença quando comparadas a cães mesocefálicos, destacando-se o Bulldog Inglês (razão de chances 14,18), Bulldog Francês (6,48) e Dogue de Bordeaux (5,26). Além da conformação craniofacial, o excesso de peso corporal e a idade superior a 2 anos figuraram como fatores de risco independentes de alta relevância. Em contraste, dados de serviços terciários de emergência veterinária revelam um perfil de gravidade significativamente superior: um estudo multicêntrico conduzido em hospitais de emergência britânicos em 2022 com 167.751 cães atendidos encontrou incidência de 0,23% e letalidade hospitalar de 26,56%, com cães braquicefálicos exibindo odds ratio de 4,21. Já em séries clássicas de hospitais universitários e centros de referência terciária de medicina intensiva (como a série de Bruchim et al., 2006 em Israel), a mortalidade reportada atinge entre 30% e 50%. Essa disparidade flagrante nas estatísticas de mortalidade decorre do viés de encaminhamento (case mix): serviços de atenção primária recebem pacientes com exaustão térmica precoce, enquanto hospitais terciários admitem animais em coma profundo, com coagulação intravascular disseminada instalada, lesão renal aguda oligoanúrica e colapso circulatório.',

    particularidadesEpidemiologicasFelinas:
      'Em felinos domésticos, a ocorrência de intermação é consideravelmente mais rara quando comparada à população canina, mas carrega alta letalidade potencial e peculiaridades etiológicas marcantes. O estudo epidemiológico de vigilância no Reino Unido realizado por Hall, Radford e Carter (2022) identificou apenas 16 casos de doenças relacionadas ao calor em gatos ao longo de vários anos, confirmando a baixa frequência relativa da condição na espécie. A totalidade dos casos felinos documentados decorreu de exposição ambiental passiva ou confinamento acidental, não havendo registro de intermação precipitada por exercício físico extenuante. A maioria expressiva dos eventos concentrou-se nos meses mais quentes do ano (75% entre junho e julho no hemisfério norte). Um cenário epidemiológico felino emblemático e peculiar envolve o confinamento acidental em secadoras de roupas domésticas: gatos procuram o interior do tambor aquecido ou roupas recém-colocadas como refúgio acolhedor, sendo aprisionados e submetidos a ar quente forçado em espaço fechado e rotação mecânica contínua. Na série de Cudney, Wayne e Rozanski (2021), três gatos vítimas de intermação induzida por secadora apresentaram disfunção neurológica profunda, úlceras corneanas e de mucosas, queimaduras térmicas e rabdomiólise severa; todos sobreviveram graças à intervenção intensiva rápida. Diferentemente do cão, gatos com doenças respiratórias crônicas, sobrepeso e idade avançada são os mais suscetíveis ao estresse térmico dentro de residências mal ventiladas.',

    fatoresPredisponentesEConfinamento:
      'A gênese da intermação envolve a interação multifatorial entre produção metabólica de calor e incapacidade física de dissipação. Entre os fatores caninos predisponentes de maior magnitude clínica destacam-se a conformação braquicefálica (resistência de vias aéreas superiores, palato redundante e ineficiência mecânica do panting); a obesidade e sobrepeso (a camada de tecido adiposo atua como isolante térmico eficiente, aumenta a demanda de trabalho locomotor e deteriora a relação entre área de superfície corporal e volume); a presença de pneumopatias e afecções de vias aéreas superiores prévias (como paralisia laríngea adquirida do cão idoso, colapso de traqueia e estenose laringotraqueal); as afecções cardiovasculares descompensadas (incapacidade miocárdica de elevar o débito cardíaco necessário para redirecionar o fluxo sanguíneo do centro corporal para os leitos capilares cutâneos); a pelagem densa e escura; e a ausência de aclimatação física e térmica. A falta de aclimatação é notadamente perigosa nos primeiros dias quentes da primavera ou após a transferência abrupta de um animal para regiões de clima tropical. Cães com histórico anterior de intermação apresentam risco recidivante aumentado, possivelmente devido a alterações microvasculares residuais ou danos persistentes nos centros reguladores hipotalâmicos.',

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
      'A fisiopatologia da intermação é governada pelo produto entre a intensidade térmica e a duração da exposição celular ao calor (temperatura x tempo). A hipertermia extrema desnatura proteínas estruturais e enzimáticas, desestabiliza a bicamada lipídica das membranas celulares e colapsa a integridade mitocondrial, interrompendo a fosforilação oxidativa e a síntese de ATP. Sob condições normais de estresse térmico fisiológico, as células sintetizam proteínas de choque térmico (Heat-Shock Proteins - HSPs, notadamente HSP-70 e HSP-90), chaperonas moleculares que estabilizam proteínas desnaturadas, evitam a agregação citoplasmática tóxica e inibem vias precoces de apoptose. Contudo, na intermação grave, a carga térmica sobrepuja os mecanismos de defesa das HSPs. As células endoteliais, miócitos, neurônios e enterócitos entram em colapso necrótico e apoptótico, liberando quantidades massivas de Padrões Moleculares Associados ao Dano (DAMPs), como proteínas HMGB1 e DNA mitocondrial livre. Os DAMPs ligam-se a receptores do tipo Toll (TLRs) em macrófagos e neutrófilos, deflagrando a liberação descontrolada de citocinas pró-inflamatórias (TNF-alfa, IL-1beta, IL-6) e espécies reativas de oxigênio (ROS). Instala-se, dessa forma, uma Síndrome da Resposta Inflamatória Sistêmica (SIRS) destrutiva que perpetua a lesão celular mesmo após o resfriamento físico do paciente.',

    isquemiaEsplanicaEQuebraBarreiraIntestinal:
      'O trato gastrointestinal ocupa papel fisiopatológico fulcral na evolução sistêmica da intermação. Nas fases iniciais de estresse térmico, o sistema cardiovascular responde com vasodilatação periférica reflexa massiva nos leitos cutâneos para facilitar a irradiação e convecção calórica. Como contrapartida circulatória mandatória para preservar a pressão de perfusão central, ocorre vasoconstrição esplâncnica e renal reflexa de grande magnitude. Associada à hipovolemia por desidratação (perda de água via panting e hipersalivação), essa vasoconstrição provoca isquemia esplâncnica profunda e hipóxia celular dos enterócitos da mucosa intestinal. Privados de oxigênio e ATP, os enterócitos sofrem depleção energética e as junções de oclusão (tight junctions) perdem sua integridade funcional. A barreira mucosa intestinal desintegra-se, resultando em descamação epitelial com diarreia hemorrágica, hematêmese e melena. O evento crítico decorrente dessa quebra é a translocação maciça de bactérias gram-negativas intraluminares e de seus lipopolissacarídeos de parede (endotoxinas / PAMPs) diretamente para a circulação portal e vasos linfáticos mesentéricos. Ao atingirem a circulação sistêmica, as endotoxinas amplificam exponencialmente a tempestade de citocinas, provocando um estado fisiopatológico indistinguível do choque séptico refratário.',

    endoteliopatiaCascataCoagulacaoECID:
      'A intermação induz lesão endotelial direta por estresse térmico combinada à citotoxicidade indireta mediada por citocinas, DAMPs e endotoxemia. O desnudamento do glicocálix endotelial e a necrose das células do endotélio expõem o fator tecidual (FT) subendotelial aos componentes do plasma circulante, disparando a cascata extrínseca da coagulação de forma disseminada. Gera-se uma produção descontrolada de trombina, acompanhada de ativação e recrutamento plaquetário massivo. Simultaneamente, a inflamação deprime a síntese e a atividade dos anticoagulantes fisiológicos endógenos — ocorre perda drástica de antitrombina (AT) e redução expressiva da proteína C ativada, aliada à inibição da fibrinólise via liberação aumentada de PAI-1. Nas primeiras horas do insulto, instala-se uma fase protrombótica com deposição maciça de microtrombos de fibrina em arteríolas e capilares de leitos vitais (rins, pulmões, fígado e cérebro). À medida que a síndrome avança, o consumo acelerado e ininterrupto de plaquetas e de fatores plasmáticos da coagulação (fibrinogênio, fatores V, VIII e protrombina) esgota as reservas hemostáticas do paciente. A transição para uma fase de hipocoagulabilidade consuntiva e hiperfibrinólise culmina no quadro clássico e temido de Coagulação Intravascular Disseminada (CID), manifestado por petéquias, equimoses, sangramentos espontâneos em locais de venopunção e hemorragias viscerais incontroláveis.',

    mecanismosLraERabdomiolise:
      'A Lesão Renal Aguda (LRA / AKI) afeta uma proporção substancial de cães e gatos com intermação e constitui um dos preditores independentes mais robustos de mortalidade. A patogenia da lesão renal no heatstroke é multifatorial e envolve pelo menos seis mecanismos lesivos simultâneos: 1) Hipovolemia severa decorrente de perdas evaporativas extremas e perdas gastrointestinais líquidas; 2) Choque distributivo e hipotensão vasoplégica sistêmica, reduzindo a pressão efetiva de filtração glomerular; 3) Citotoxicidade térmica direta às células tubulares proximais e da alça de Henle; 4) SIRS e disfunção microcirculatória renal induzida por endoteliopatia e citocinas; 5) Microtrombose capilar glomerular e peritubular secundária à CID; e 6) Nefropatia por pigmentos associada à rabdomiólise muscular aguda. A destruição térmica e isquêmica de miócitos esqueléticos (rabdomiólise) libera quantidades colossais de mioglobina monomérica na circulação sanguínea. Ao atingir o lúmen dos túbulos renais, a mioglobina precipita em cilindros oclusivos, induz vasoconstrição da artéria renal via depleção de óxido nítrico e gera estresse oxidativo intraluminal acentuado através da reação de Fenton mediada por ferro heme livre.',

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
      'O parênquima cerebral é extraordinariamente vulnerável à agressão térmica direta e às oscilações metabólicas. A temperatura intracraniana crítica superior a 41,5°C desencadeia desnaturação de proteínas neuronais, disfunção mitocondrial e falência das bombas iônicas Na+/K+-ATPase da membrana celular, provocando influxo maciço de sódio e água para o espaço intracelular (edema cerebral citotóxico). Concomitantemente, a inflamação sistêmica e a endoteliopatia rompem a integridade da barreira hematoencefálica, permitindo o extravasamento de plasma e proteínas para o interstício encefálico (edema cerebral vasogênico). Esse processo culmina em elevação drástica da pressão intracraniana (PIC) e redução da pressão de perfusão cerebral (PPC = PAM - PIC). Isquemia cerebral, hemorragias petequiais multifocais e trombose microvascular completam o substrato patológico que se manifesta por ataxia, desorientação, cegueira cortical, estupor, coma e crises convulsivas generalizadas. As convulsões na intermação possuem um efeito sinérgico destrutivo: a contração muscular violenta gera calor endógeno em escala maciça, elevando ainda mais a temperatura corporal central e acelerando a necrose neuronal em um circuito de retroalimentação potencialmente fatal.',

    injuriaPulmonarEdemaNaoCardiogenicoEARDS:
      'O leito vascular pulmonar sofre agressão direta decorrente da circulação de citocinas inflamatórias, DAMPs e microtrombos de fibrina. A lesão e morte das células endoteliais dos capilares pulmonares rompem a barreira alvéolo-capilar, elevando de forma patológica a permeabilidade vascular (capillary leak). Ocorre inundação do interstício e dos espaços alveolares por um fluido exsudativo rico em proteínas plasmáticas e células inflamatórias, desprovido de elevação prévia na pressão de oclusão capilar pulmonar — configurando o Edema Pulmonar Não Cardiogênico e a Síndrome do Desconforto Respiratório Agudo (ALI / ARDS). Os alvéolos preenchidos por exsudato perdem a capacidade de troca gasosa, gerando shunt intrapulmonar direito-esquerdo, hipoxemia arterial refratária e perda acentuada de complacência pulmonar. Além do ARDS, o pulmão do paciente com intermação está sob risco contínuo de hemorragia alveolar difusa (secundária à CID) e de pneumonia por aspiração maciça, desencadeada pela perda do reflexo laringotraqueal protetor durante episódios de êmese em animais com depressão do sensório ou coma.',

    isquemiaMiocardicaEArritmiasVentrimulares:
      'O miocárdio é duplamente afetado durante a crise hipertérmica: de um lado, a demanda de oxigênio pelo miocárdio aumenta dramaticamente devido à taquicardia extrema e contratilidade aumentada na fase hiperdinâmica inicial; de outro, a oferta miocárdica de oxigênio cai de forma abrupta em decorrência da hipotensão, hipovolemia, encurtamento do tempo de enchimento coronário na diástole e microtrombose vascular coronariana. Essa discrepância severa entre demanda e suprimento gera isquemia subendocárdica e necrose focal de cardiomiócitos. A lesão isquêmica miocárdica, aliada à acidose metabólica grave, alterações eletrolíticas (hipercalemia e hipocalcemia) e citocinas inflamatórias circulantes, torna o miocárdio altamente instável do ponto de vista elétrico. Arritmias cardíacas acometem aproximadamente 20 a 25% dos pacientes caninos com intermação, destacando-se a presença de complexos ventriculares prematuros (VPCs) monomórficos ou polimórficos, taquicardia ventricular não sustentada e taquicardia ventricular sustentada com repercussão hemodinâmica. A identificação de arritmias ventriculares exige intervenção imediata para evitar degeneração em fibrilação ventricular ou colapso circulatório fatal.',

    lesaoHepatocelularEHipoglicemiaCritica:
      'A arquitetura hepática sofre necrose isquêmica centrolobular profunda em resposta à vasoconstrição esplâncnica e à hipoperfusão sistêmica, somadas ao dano térmico hepatocitário direto. O fígado perde rapidamente sua capacidade metabólica e funcional. A gliconeogênese hepática é paralisada e os estoques de glicogênio são exauridos com rapidez pelo consumo metabólico periférico hiperbólico, pela glicólise anaeróbia tecidual e pelo consumo anaeróbio por leucócitos ativados. Instala-se hipoglicemia severa (glicemia plasmática frequentemente inferior a 50 mg/dL), um preditor prognóstico amplamente reconhecido de mortalidade. Na série seminal de Bruchim et al. (2006), glicose inferior a 47 mg/dL na admissão associou-se fortemente ao óbito. Concomitantemente, a síntese de proteínas plasmáticas (especialmente albumina) e de fatores de coagulação vitamina K-dependentes é suspensa, e a depuração de bilirrubina e de toxinas circulantes fica prejudicada, resultando em elevação enzimática rápida de ALT e AST, hiperbilirrubinemia clínica (icterícia) e aprofundamento da hipoalbuminemia e da diátese hemorrágica.',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          sign: 'O Paradoxo Térmico da Admissão (Hipertermia vs Normotermia vs Hipotermia)',
          detail:
            'A apresentação clássica de temperatura corporal central > 41°C reflete a fase ativa do insulto térmico. Todavia, pacientes graves podem apresentar normotermia (38,0–39,2°C) decorrente de resfriamento prévio vigoroso por parte dos tutores ou transporte prolongado com ar-condicionado. De forma mais dramática, cães e gatos em choque descompensado terminal ou colapso circulatório frequentemente chegam em hipotermia (< 37,5°C), achado que indica exaustão energética, falência vasomotora e pior prognóstico reservado.',
        },
        {
          sign: 'Desidratação Severa e Choque Misto',
          detail:
            'Mucosas orais secas, perda pronunciada de turgor cutâneo, enoftalmia e retardo de preenchimento capilar. O choque na intermação combina componente hipovolêmico (perda evaporativa e gastrointestinal de fluidos) com componente distributivo-vasoplégico (vasodilatação cutânea persistente e liberação maciça de óxido nítrico endotelial).',
        },
      ],
    },
    {
      system: 'neurologic',
      findings: [
        {
          sign: 'Alterações Progressivas do Sensório e Consciência',
          detail:
            'Evolução contínua de desorientação espacial, hiporreatividade a estímulos, apatia profunda e ataxia motora vestibular ou proprioceptiva, progredindo rapidamente para estupor e coma não responsivo em decorrência de edema cerebral vasogênico/citotóxico, isquemia e neurotoxicidade térmica.',
        },
        {
          sign: 'Crises Convulsivas e Sinais de Herniação Encefálica',
          detail:
            'Convulsões motoras tônico-clônicas generalizadas refratárias, tremores musculares grosseiros, mioclonias faciais, anisocoria, midríase bilateral não responsiva à luz, cegueira cortical transitória e postura de descerebração ou descerebelação nas fases finais de hipertensão intracraniana crítica.',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          sign: 'Panting Extremo e Respiração de Boca Aberta em Gatos',
          detail:
            'Taquipneia respiratória superficial e rápida com salivação abundante viscosa em cães. Em felinos, o surgimento de respiração de boca aberta (open-mouth breathing) é um sinal de alarme crítico absoluto de falência ventilatória, edema laríngeo ou sofrimento respiratório agudo iminente.',
        },
        {
          sign: 'Estridor Laríngeo e Edema de Vias Aéreas Superiores',
          detail:
            'Ruídos inspiratórios estertorosos graves e estridor laríngeo audível sem estetoscópio, característicos de hiperemia inflamatória e edema agudo de tecidos moles orofaríngeos e pregas vocais, com risco de asfixia mecânica aguda em cães braquicefálicos.',
        },
        {
          sign: 'Estertores Crepitantes e Desconforto por ARDS',
          detail:
            'Ausculta de crepitações pulmonares finas bilaterais nos campos dependentes, taquipneia ortopneica e cianose de mucosas, refletindo exsudação de fluido proteico alveolar secundária à lesão endotelial alvéolo-capilar difusa (edema pulmonar não cardiogênico / ARDS).',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          sign: 'Fase Hiperdinâmica Inicial vs Hipodinâmica Tardia',
          detail:
            'Inicialmente, mucosas hiperêmicas de coloração vermelho-tijolo, taquicardia severa e pulsos femorais hipercinéticos saltatórios decorrentes do débito cardíaco elevado na tentativa de dissipação térmica. Conforme o choque se aprofunda, as mucosas tornam-se pálidas ou acinzentadas, o tempo de preenchimento capilar prolonga-se (> 2 segundos) e os pulsos femorais tornam-se filiformes e hipocinéticos.',
        },
        {
          sign: 'Arritmias Cardíacas Ventriculares e Hipotensão Vasoplégica',
          detail:
            'Presença de complexos ventriculares prematuros frequentes, taquicardia ventricular em salvas ou sustentada, desdobramentos de bulhas e hipotensão arterial sistêmica sustentada (Pressão Arterial Média - PAM < 65 mmHg) resistente a fluidos.',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          sign: 'Vômitos Profusos, Hematêmese e Sialorreia Espessa',
          detail:
            'Êmese repetida de conteúdo gástrico e bilioso que rapidamente evolui para hematêmese volumosa com sangue vivo ou borra de café, resultante da necrose isquêmica da mucosa gástrica e formação de úlceras agudas de estresse.',
        },
        {
          sign: 'Diarreia Hemorrágica Fulminante (Hematochezia e Melena)',
          detail:
            'Eliminação de fezes líquidas com sangue vivo abundante e pedaços de mucosa necrosada descamada (sloughing epitelial intestinal), frequentemente acompanhada de odor fétido cadavérico que mimetiza enterite por parvovírus.',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          sign: 'Oligúria, Anúria e Urina com Pigmentúria Acastanhada',
          detail:
            'Produção urinária acentuadamente deprimida (< 1,0 mL/kg/h em cães ou < 0,6 mL/kg/h em gatos) ou ausência completa de diurese apesar da ressuscitação volêmica. A urina coletada exibe coloração marrom-escura avermelhada (urina cor de coca-cola) devido à mioglobinúria maciça da rabdomiólise e hemoglobinúria associada a hemólise microangiopática.',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          sign: 'Diátese Hemorrágica Cutaneomucosa e Coagulopatia Tardia',
          detail:
            'Aparecimento de petéquias disseminadas na pele abdominal e gengiva, equimoses em áreas de atrito, hematomas espontâneos, epistaxe e sangramento incoagulável contínuo em locais de punção de veias ou cateterização, denunciando instalação de CID consuntiva.',
        },
      ],
    },
  ],

  diagnosis: {
    triagemClinicaEParadoxoTermico:
      'O diagnóstico da intermação baseia-se primordialmente no reconhecimento clínico tempestivo do histórico de exposição térmica ou exercício extenuante conjugado a achados de disfunção multissistêmica. A medição da temperatura corporal central é essencial, mas o clínico jamais deve subordinar o início do tratamento à constatação de temperatura > 41°C. Conforme ratificado pelo consenso internacional RECOVER First Aid 2026, atrasar a terapia de resfriamento aguardando a inserção de um termômetro em um paciente com sinais compatíveis é perigoso. Pacientes que chegam normotérmicos após resfriamento domiciliar ou hipotérmicos em choque terminal continuam sob processo fisiopatológico ativo de lesão de múltiplos órgãos. A triagem diagnóstica deve ser imediata, simultânea à estabilização física e oxigenoterapia.',

    esfregacoSanguineoEHemaciasNucleadas:
      'A realização imediata de um esfregaço de sangue periférico fresco à beira do leito corado por panótico rápido ou Wright-Giemsa fornece informações diagnósticas e prognósticas cruciais em minutos. O achado clássico de intermação é a presença marcante de hemácias nucleadas circulantes (nRBCs / eritroblastos ortocromáticos e policromatófilos) na ausência de anemia regenerativa proporcional. O estudo prospectivo seminal de Aroch et al. (2009) avaliou 40 cães com heatstroke espontâneo e encontrou nRBCs no sangue periférico em 90% dos pacientes (36/40). O dano térmico direto à barreira estromal endotelial da medula óssea, a hipóxia medular e a esplenocontração provocam a liberação prematura de precursores eritroides. O estudo estabeleceu que uma contagem igual ou superior a 18 nRBCs por 100 leucócitos na admissão exibiu sensibilidade de 91% e especificidade de 88% para predição de mortalidade na coorte. Esse exame de baixo custo e alta sensibilidade deve fazer parte da rotina de admissão em todos os pacientes.',

    cineticaLaboratorialERiscoOculto12a24h:
      'A avaliação laboratorial seriada representa a pedra angular do manejo de UTI. O hematócrito inicial costuma apresentar-se elevado (hemoconcentração por perda de volume plasmático); todavia, nas horas subsequentes à fluidoterapia e ao extravasamento vascular, o hematócrito pode despencar abruptamente devido à hemorragia gastrointestinal oculta, flebotomias repetidas e hemólise microangiopática da CID. A contagem de leucócitos pode exibir leucocitose neutrofílica por estresse e inflamação, mas a presença de neutropenia ou leucopenia pronunciada associa-se a consumo marginal intenso, endotoxemia fulminante e prognóstico sombrio. A trombocitopenia é extremamente prevalente (presente em mais de 80% dos casos graves durante a hospitalização). A glicemia deve ser verificada imediatamente na admissão: a hipoglicemia (< 47 mg/dL) constitui um indicador crítico de falência hepática e consumo metabólico excessivo, fortemente associado à mortalidade.',

    avaliacaoRenalBiomarcadoresEUrina:
      'A lesão renal aguda é universalmente subestimada pela creatinina sérica isolada na chegada do paciente. O estudo prospectivo de Segev et al. (2015), investigando 30 cães com intermação natural, demonstrou que a creatinina plasmática mediana na apresentação foi de apenas 1,69 mg/dL, apesar de a taxa de filtração glomerular (TFG) real estar reduzida para valores críticos (mediana de 0,60 mL/min/kg). Marcadores urinários precoces de lesão tubular e glomerular (como NGAL urinária, proteína ligadora de retinol - RBP e razão proteína:creatinina urinária - RPCU) estavam fortemente elevados em virtualmente todos os cães desde o primeiro momento. A fração de excreção de sódio (FeNa) apresentou acurácia diagnóstica superior (AUROC de 0,89) para discriminar dano tubular intrínseco. Na urinálise de rotina, a presença de glicosúria na vigência de glicemia plasmática normal atesta necrose tubular proximal aguda. A identificação de cilindros granulares e epiteliais grosseiros confirma a presença de necrose tubular aguda (NTA), e a urina sobrenadante pigmentada que não precipita à centrifugação confirma a presença de mioglobina livre oriunda de rabdomiólise intensa (corroborada por elevações estratosféricas de CK sérica, frequentemente > 10.000 a 50.000 UI/L).',

    pocusToracoAbdominalEImaginologia:
      'A ultrassonografia focada à beira do leito (POCUS) através dos protocolos TFAST e AFAST desempenha papel fundamental na monitorização dinâmica. O TFAST torácico deve rastrear especificamente a presença de linhas B coalescentes ou pulmão em raio-x nos campos dorsais e ventrais, indicando extravasamento fluido intersticial e alveolar precoce por edema pulmonar não cardiogênico (ARDS) antes de alterações audíveis à ausculta ou visíveis na radiografia simples. O AFAST permite estimar a volemia através do colapso inspiratório da veia cava caudal, além de detectar líquido livre peritoneal decorrente de peritonite bacteriana por translocação transmural ou necrose intestinal. A radiografia torácica é indicada em pacientes com esforço ventilatório aumentado ou hipoxemia para documentar consolidações alveolares caudodorsais (ARDS) ou infiltrados cranioventrais sugestivos de pneumonia aspirativa.',

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
      'A prioridade terapêutica zero da intermação é a dissipação imediata da carga térmica excessiva. O consenso internacional RECOVER First Aid 2026 (Mandell et al., 2026; Thawley et al., 2026) estabeleceu uma mudança paradigmática fundamental: o resfriamento ativo pré-hospitalar deve ser iniciado de imediato pelo tutor ou socorrista no local do evento, sem perda de tempo aguardando a chegada ao hospital veterinário ou a obtenção de um termômetro. O método padrão recomendado consiste em aplicar fluxo contínuo de água corrente fresca sobre o tronco, dorso e abdome ventral do animal, garantindo que a água penetre a pelagem e entre em contato direto com a derme, associada ao uso simultâneo de ventiladores ou fluxo de ar ativo (convecção e evaporação forçada). A antiga máxima que proibia peremptoriamente o uso de água fria sob a premissa de que a vasoconstrição periférica impediria a perda de calor foi formalmente desmistificada pela medicina baseada em evidências: embora banhos de gelo e imersão total com gelo continuem desaconselhados pelo risco de afogamento e calafrios intensos (tremores que produzem calor metabólico), a água fresca corrente é comprovadamente segura e superior à inação. Se houver termômetro retal disponível, o resfriamento ativo deve ser interrompido rigorosamente aos 39,7–40,0°C. Caso não seja possível mensurar a temperatura no ambiente pré-hospitalar, o RECOVER 2026 orienta realizar resfriamento ativo por aproximadamente 15 minutos e partir imediatamente para o hospital veterinário. Em pacientes com estridor de via aérea superior em que o panting arrefece com o resfriamento, a terapia térmica pode ser estendida até o limite de 38,6°C. Jamais se deve enrolar o animal em toalhas molhadas e deixá-las sobre o corpo, pois a toalha aquece rapidamente, aprisiona o ar e atua como uma barreira térmica isolante que impede a evaporação.',

    manejoViasAereasEABC:
      'Ao dar entrada no hospital veterinário, a abordagem da intermação segue a hierarquia emergencial do ABC: Airway (Vias Aéreas), Breathing (Respiração) e Circulation (Circulação). Vias Aéreas: pacientes braquicefálicos, animais com alteração do nível de consciência ou com edema laríngeo agudo demandam proteção imediata de via aérea. A presença de estridor inspiratório grave associado a cianose exige sedação leve titulada (exemplo: butorfanol 0,1 a 0,2 mg/kg IV) para abortar o espasmo laríngeo e o pânico respiratório; se a obstrução persistir, deve-se proceder à indução anestésica rápida e intubação orotraqueal imediata com tubo de diâmetro apropriado e cuff inflado, fornecendo oxigênio a 100%. Em situações excepcionais de obstrução anatômica orofaríngea intransponível, traqueostomia emergencial temporária está indicada. Respiração: fornecer oxigênio umidificado suplementar por cânula nasal ou fluxo livre sem estressar o paciente. Em felinos, o estresse da contenção pode precipitar parada cardiorrespiratória por edema pulmonar; portanto, priorizar gaiola de oxigênio com manipulação mínima. Circulação: estabelecer prontamente dois acessos venosos periféricos de grande calibre (cateteres 18G ou 20G em veias cefálicas ou jugulares) ou acesso intraósseo em pacientes com colapso venoso total.',

    ressuscitacaoVolemicaRacionalAaha2024:
      'A conduta contemporânea de fluidoterapia na intermação baseia-se nas diretrizes AAHA Fluid Therapy Guidelines 2024 e supera em definitivo a prática obsoleta de administrar doses de choque cegas de cristaloides (90 mL/kg em cães ou 60 mL/kg em gatos). O paciente com intermação sofre de grave endoteliopatia com aumento da permeabilidade capilar difusa (capillary leak); a infusão desmedida de grandes volumes de líquido intravascular resulta em extravasamento maciço de fluido para o interstício e parênquima pulmonar, precipitando edema pulmonar e piorando a oxigenação celular. A estratégia recomendada consiste na administração de pequenos bolus de cristaloides isotônicos balanceados tamponados (Ringer com Lactato ou Plasmalyte): para cães, administra-se 15 a 20 mL/kg IV em infusão rápida de 15 a 30 minutos; para gatos, alíquotas conservadoras de 5 a 10 mL/kg IV em 15 a 30 minutos. Após cada alíquota, reavaliam-se meticulosamente as metas de perfusão: frequência cardíaca, qualidade do pulso arterial femoral, coloração de mucosas, tempo de preenchimento capilar, temperatura periférica de extremidades, pressão arterial sistólica e média, níveis séricos de lactato e ausculta pulmonar para detecção de crepitações incipientes. Uma vez alcançada a estabilidade hemodinâmica básica, interrompe-se a sobrecarga volêmica.',

    suporteVasoativoNorepinefrina:
      'Se o paciente persistir hipotenso (Pressão Arterial Média - PAM < 65 mmHg ou Pressão Arterial Sistólica - PAS < 90 mmHg) após a restauração criteriosa da euvolemia intravascular, o mecanismo subjacente é a vasoplegia endotelial distributiva profunda mediada por citocinas e óxido nítrico endotelial. Nessa circunstância de choque distributivo refratário a volume, insistir em novos bolus de cristaloide é um erro grosseiro que apenas induz edema tecidual e agrava a LRA. O fármaco vasopressor de primeira escolha (Plumb 10ª ed.) é a Norepinefrina em infusão contínua (CRI). A dose inicial recomendada para cães e gatos é de 0,05 a 0,1 mcg/kg/min IV, titulada progressivamente a cada 10 a 15 minutos até atingir e sustentar a meta de PAM >= 65 mmHg, podendo atingir faixas de 0,5 a 2,0 mcg/kg/min em choque profundo. A norepinefrina restaura o tônus vascular arteriolar sistêmico através de potente agonismo alfa-1 adrenérgico, preservando o fluxo renal e esplâncnico sem induzir taquicardia excessiva.',

    correcaoHipoglicemiaEletrolitos:
      'A hipoglicemia é uma complicação metabólica frequente e de alta letalidade no heatstroke. Em animais com glicemia plasmática inferior a 60 mg/dL ou manifestações neurológicas de neuroglicopenia, administra-se imediatamente um bolus intravenoso de Glicose a 50% (Dextrose 50%) na dose de 0,5 a 1,0 mL/kg (equivalente a 0,25 a 0,5 g/kg de glicose), obrigatoriamente diluída na proporção de 1:2 a 1:4 em solução fisiológica ou ringer lactato para evitar flebite química osmótica, administrada lentamente em 5 a 10 minutos. Na sequência, mantém-se infusão contínua de glicose adicionando-se dextrose à solução cristaloide de manutenção na concentração de 2,5% a 5,0%, monitorando-se a glicemia horária. Distúrbios eletrolíticos devem ser corrigidos gradualmente: a hipercalemia inicial decorrente de lise celular e acidose pode alternar-se para hipocalemia severa após a ressuscitação e diurese, exigindo suplementação cautelosa de cloreto de potássio (KCl). Oscilações no sódio sérico (hipernatremia por perda pura de água ou hiponatremia por ingestão de água hipotônica) exigem reposição lenta para prevenir mielinólise pontina central ou edema cerebral.',

    terapiaAntiarrimicaCaninaVsFelina:
      'Arritmias ventriculares instáveis demandam intervenção farmacológica específica quando associadas a taquicardia ventricular sustentada com frequência > 180 bpm, complexos multiformes, fenômeno de R sobre T ou repercussão na pressão arterial e débito cardíaco. Em cães, a Lidocaína a 2% (sem vasoconstritor) é o fármaco antiarrítmico padrão-ouro: administra-se um bolus de 2 mg/kg IV lentamente em 2 minutos sob monitoramento eletrocardiográfico contínuo, podendo ser repetido até a dose cumulativa de 6 a 8 mg/kg; obtida a conversão do ritmo, instala-se infusão contínua (CRI) de lidocaína na taxa de 25 a 80 mcg/kg/min IV. Em felinos, o metabolismo hepático de conjugação da lidocaína é deficiente e a espécie apresenta sensibilidade extrema à cardiotoxicidade e neurotoxicidade induzida por anestésicos locais. Conforme preconizado pelo Plumb 10ª ed., a lidocaína em gatos deve ser utilizada com extrema parcimônia e apenas em arritmias ventriculares malignas refratárias: a dose de bolus em gatos é estritamente reduzida para 0,2 a 0,5 mg/kg IV muito lentamente em 5 a 10 minutos, com infusão contínua máxima de 10 a 20 mcg/kg/min sob vigilância ininterrupta de sinais de toxicidade (tremores, fasciculações, convulsões e bradiarritmias).',

    manejoRenalEstritoInsAndOuts:
      'A prevenção e o tratamento da Lesão Renal Aguda na intermação seguem os princípios contemporâneos do consenso IRIS AKI 2026. Em pacientes graves com instabilidade hemodinâmica, é mandatória a cateterização vesical com sonda de Foley de calibre compatível conectada a sistema coletor estéril fechado, permitindo a quantificação horária da diurese. Uma vez restabelecida a euvolemia, o volume de fluidoterapia intravenosa deve ser rigidamente calculado pela regra de entradas e saídas (Ins & Outs): Volume horário em mL/h = Débito Urinário da hora anterior em mL/h + Perdas Insensíveis (estimadas em 20 mL/kg/dia ou aproximadamente 0,8 mL/kg/h) + Perdas Extraordinárias em andamento (vômitos e diarreia mensurados). A administração empírica de furosemida para tentar forçar a produção de urina em rins isquemiados é uma conduta proscrita que não melhora a taxa de filtração glomerular nem reduz a mortalidade, atuando apenas como indutor de hipovolemia iatrogênica.',

    suporteHemostaticoEGastrointestinal:
      'A coagulopatia intravascular disseminada exige suporte hemostático individualizado. O uso profilático de Plasma Fresco Congelado (FFP) em pacientes que exibem apenas discreto alargamento laboratorial de tempos de coagulação sem sangramento ativo não é recomendado pelas diretrizes modernas. O FFP é formalmente indicado na presença de diátese hemorrágica clínica evidente (petéquias progressivas, hematomas, sangramento em cateteres ou hemorragia digestiva volumosa) associada a prolongamento de PT/aPTT superior a 1,5 vez o controle ou na vigência de procedimentos invasivos necessários, na dose de 10 a 20 mL/kg IV. Para proteção do trato gastrointestinal contra úlceras de estresse e perda de barreira mucosa, administra-se Pantoprazol (1 mg/kg IV q12–24h); o sucralfato (0,5 a 1 g VO q8h como suspensão aquosa) pode ser associado se o paciente não apresentar êmese ativa e com via aérea protegida.',

    stewardshipAntimicrobianoERestricoes:
      'Embora a quebra da barreira epitelial intestinal com translocação bacteriana e de endotoxinas seja um pilar fisiopatológico da intermação, as diretrizes clínicas contemporâneas recomendam expressamente não administrar antibioticoterapia profilática de rotina a todos os pacientes com heatstroke. Os antimicrobianos intravenosos devem ser reservados estritamente para animais com evidências concretas de infecção: choque circulatório persistente que mimetiza choque séptico descompensado, neutropenia importante (< 2.000/uL), perda maciça de barreira mucosa com fezes sanguinolentas necróticas graves, pneumonia por aspiração documentada ou focos infecciosos prévios confirmados. Quando indicada, a antibioticoterapia deve ser de amplo espectro por via parenteral cobrindo gram-negativos e anaeróbios entéricos (exemplo: Ampicilina com Sulbactam 30 mg/kg IV q8h isolada ou associada a Enrofloxacina ou Fluoroquinolona com dose ajustada à função renal, lembrando a contraindicação de fluoroquinolonas em doses plenas em felinos pelo risco de degeneração retiniana).',

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
      '1. Administrar dipirona, AINEs ou paracetamol: erro fatal decorrente da confusão entre febre e intermação. Como o ponto de ajuste hipotalâmico é normal, esses fármacos não possuem eficácia antipirética na intermação e provocam necrose tubular renal em rins com fluxo marginal, agravando úlceras gastrointestinais e, no caso do paracetamol, causando toxicidade letal em gatos.\n2. Atrasar o início do resfriamento ativo procurando um termômetro ou transportando sem resfriar: conforme o RECOVER 2026, o tempo de hipertermia é diretamente proporcional à mortalidade. O resfriamento ativo pré-hospitalar com água fresca deve ser iniciado no minuto zero.\n3. Enrolar o paciente em toalhas molhadas estagnadas: as toalhas rapidamente absorvem o calor da pele, aquecem-se e formam uma barreira isolante que impede a convecção e a evaporação, retendo calor no organismo.\n4. Resfriar até a temperatura normal (38,5°C) antes de parar a água: o fenômeno de overshoot térmico faz o animal continuar perdendo calor após a remoção do estímulo; continuar resfriando até 38°C empurra o paciente para hipotermia profunda (< 37°C), que paralisa a coagulação, induz arritmias e aumenta a mortalidade.\n5. Administrar doses cegas de choque de fluidos (90 mL/kg em cães ou 60 mL/kg em gatos): o leito vascular comprometido por endoteliopatia sofre de hiperpermeabilidade (capillary leak); excesso de volume transborda para o parênquima pulmonar, causando edema pulmonar não cardiogênico e morte por hipoxemia.\n6. Presumir que um coagulograma normal na admissão descarta CID: a transição fenotípica de normocoagulação para hipocoagulabilidade consuntiva e hiperfibrinólise atinge seu ápice entre 12 e 24 horas pós-admissão; a ausência de monitoramento hemostático seriado retarda a identificação de sangramentos letais.\n7. Acreditar que a creatinina sérica inicial normal exclui lesão renal: a TFG pode estar reduzida em mais de 70% mesmo com creatinina no intervalo de referência na chegada; não monitorar o débito urinário horário leva à sobrecarga hídrica desastrosa.\n8. Usar furosemida para tentar forçar o rim a produzir urina: forçar a diurese com diuréticos de alça em um paciente que precisa de reidratação tubular profunda agrava a hipovolemia e não recupera os néfrons lesados.\n9. Dar alta precoce porque a temperatura corporal normalizou e o animal voltou a andar: a intermação é uma doença bifásica; falência renal oligoanúrica, necrose hepática centrolobular, sepse por translocação e arritmias ventriculares tardias manifestam-se clinicamente 24 a 48 horas após a agressão inicial.\n10. Desconsiderar a hipersensibilidade extrema da espécie felina à lidocaína: administrar doses caninas de lidocaína (2 mg/kg) em gatos com arritmias desencadeia colapso cardiovascular agudo, bradicardia refratária e convulsões fatais.',

    protocoloPlantaoIntermacao10Passos:
      '1. Minuto 0: Reconhecimento imediato, interrupção de qualquer esforço/exposição e início de resfriamento ativo com água corrente fresca sobre tronco e abdome ventral sob ventilador forte.\n2. Minutos 0 a 5: Avaliação do ABC emergencial: inspecionar permeabilidade de vias aéreas, aspirar secreções orofaríngeas viscosas, administrar oxigênio suplementar a 100% por fluxo livre; se houver estridor severo em braquicefálico, sedar com butorfanol 0,1 mg/kg IV e intubar de imediato se necessário.\n3. Minuto 5: Instalação de dois acessos venosos calibrosos (cateter 18G ou 20G em veia cefálica) e mensuração simultânea de temperatura retal, glicemia periférica por fita e lactato sérico à beira do leito.\n4. Minuto 5 a 15: Coleta de sangue para painel crítico de admissão: hemograma completo com esfregaço imediato (avaliar nRBCs), plaquetas, PT, aPTT, fibrinogênio, ureia, creatinina, ALT, AST, CK, eletrólitos (Na, K, Cl, Ca ionizado) e gasometria venosa.\n5. Minuto 10 a 20: Iniciar ressuscitação volêmica prudente (AAHA 2024) com cristaloide isotônico balanceado (Ringer Lactato ou Plasmalyte) em alíquotas de 15–20 mL/kg em cães ou 5–10 mL/kg em gatos ao longo de 15 a 30 minutos.\n6. Ao atingir 39,7–40,0°C retal: Interromper rigorosamente todo o resfriamento ativo, secar a pele superficialmente e manter em ambiente climatizado ameno, evitando que a temperatura caia abaixo de 38,5°C.\n7. Minuto 30: Reavaliar pressão arterial sistêmica (alvo PAM >= 65 mmHg) e ausculta pulmonar: se o paciente mantiver PAM < 65 mmHg após restauração volêmica euvolêmica, iniciar imediatamente Norepinefrina em infusão contínua (0,05 a 0,1 mcg/kg/min IV).\n8. Minuto 45: Correção de emergências associadas: se glicemia < 60 mg/dL, administrar Glicose 50% 0,5 mL/kg IV diluída 1:2 em 5 min; se convulsões ativas, Midazolam 0,2 mg/kg IV; se arritmia ventricular instável no cão, Lidocaína 2 mg/kg IV lento.\n9. Hora 1 a 2: Sondagem vesical de demora em sistema fechado (Foley) para monitorização horária de débito urinário e início da regra de entradas e saídas (Ins & Outs: débito anterior + perdas insensíveis 20 mL/kg/dia + perdas GI); administrar Pantoprazol 1 mg/kg IV.\n10. Horas 12 e 24: Repetição mandatória de hemograma, plaquetas, coagulograma completo (PT/aPTT/fibrinogênio), creatinina, eletrólitos e ALT/AST, mantendo vigilância estrita de UTI por no mínimo 48 horas mesmo se houver melhora clínica inicial aparente.',

    sequelasTardiasENecroseCutanea:
      'Uma complicação tardia pouco lembrada no heatstroke é a necrose cutânea térmica dorsal isquêmica. Em decorrência do estresse calórico extremo na derme e da microtrombose microvascular disseminada, áreas extensas de pele dorsal podem sofrer infarto isquêmico silencioso. As lesões cutâneas frequentemente tornam-se clinicamente visíveis apenas entre o 3º e o 7º dia após o episódio de intermação, manifestando-se como placas duras endurecidas, ressecadas e enegrecidas que posteriormente sofrem descamação em esfacelo necrótico total, exigindo debridamento cirúrgico e cicatrização por segunda intenção. Além da necrose cutânea, sequelas neurológicas permanentes (déficits cognitivos, ataxia crônica e cegueira cortical definitiva) e progressão para doença renal crônica (DRC) secundária à perda irreversível de néfrons podem persistir a longo prazo.',
  },

  prevention: {
    orientacaoTutoresEPrimeirosSocorros:
      'A prevenção da intermação baseia-se na educação ativa dos tutores sobre a fisiologia térmica dos carnívoros domésticos. A orientação fundamental inclui nunca deixar animais confinados no interior de veículos automotores fechados ou com vidros semiabertos, mesmo na sombra ou por poucos minutos — o efeito estufa no habitáculo veicular eleva a temperatura de 25°C para mais de 45°C em menos de 15 minutos. Em dias de calor ou com umidade relativa superior a 70%, caminhadas e exercícios físicos devem ser transferidos estritamente para o início da manhã ou final da noite. Os tutores devem ser instruídos a reconhecer os sinais precoces de exaustão térmica (panting ruidoso incessante, salivação espessa, andar cambaleante e busca desesperada por sombra) e a aplicar primeiros socorros imediatos: molhar o cão ou gato imediatamente com água fresca corrente sobre o dorso e barriga e ligar o ar-condicionado veicular durante o deslocamento urgente ao pronto-socorro veterinário.',

    aclimatacaoEManejoBraquicefalicos:
      'Cães braquicefálicos requerem manejo ambiental e preventivo redobrado. Deve-se desaconselhar formalmente passeios vigorosos com essas raças em temperaturas superiores a 25°C ou dias úmidos. O uso de coleiras peitorais é obrigatório para evitar qualquer compressão mecânica sobre a traqueia ou laringe. Em animais com sinais evidentes de BOAS (ruídos respiratórios crônicos em repouso e intolerância ao exercício), a avaliação cirúrgica precoce para estafilectomia (alongamento de palato mole) e rinoplastia de narinas estenóticas é uma medida profilática salvadora que restaura a capacidade respiratória antes da ocorrência de um episódio térmico fatal. Para cães de trabalho, esportivos ou militares, preconiza-se um período de aclimatação gradual de no mínimo 14 a 21 dias antes da exposição a atividades intensas em climas mais quentes.',

    prevencaoAcidentesSecadorasFelinas:
      'Para a espécie felina, a prevenção de intermação foca-se na eliminação de armadilhas domésticas de confinamento. As portas das secadoras de roupas e máquinas de lavar com abertura frontal devem permanecer rigorosamente fechadas quando não estiverem em uso. Os tutores devem ser conscientizados a inspecionar cuidadosamente o interior do tambor da secadora e misturar as roupas antes de ligar o aparelho elétrico, pois gatos têm o hábito comportamental de se aninhar silenciosamente em roupas limpas e mornas. Em residências em dias de calor intenso, deve-se assegurar ventilação cruzada ou climatização artificial, garantindo múltiplos pontos de água limpa e fresca e acesso a pisos frios desimpedidos.',
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
        'Diretriz internacional de consenso que reformulou os primeiros socorros em cães e gatos. Recomenda fortemente o resfriamento ativo pré-hospitalar imediato com água corrente fresca sobre o tronco associado a fluxo de ar, sem esperar termometria se a história for compatível. Interromper resfriamento ativo aos 39,7–40,0°C para prevenir hipotermia rebote.',
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
        'Estudo prospectivo em 30 cães demonstrando que a creatinina sérica inicial (mediana 1,69 mg/dL) subestima severamente o colapso da TFG (mediana 0,60 mL/min/kg). Biomarcadores urinários (uNGAL, RBP) e FeNa (AUROC 0,89) comprovam LRA tubular em virtualmente todos os cães.',
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
        'Série histórica seminal de 54 cães de referência que comprovou a fisiopatologia do heatstroke como síndrome de disfunção multissistêmica (MODS). Identificou mortalidade de 50%, com CID, LRA, hipoglicemia < 47 mg/dL, convulsões e atraso no atendimento > 90 min como fatores de risco maiores.',
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
        'Micrografia óptica de esfregaço de sangue periférico de cão com intermação grave (Wright-Giemsa). Observa-se a presença expressiva de eritroblastos ortocromáticos / hemácias nucleadas (nRBCs). O estudo seminal de Aroch et al. (2009) demonstrou que a contagem elevada de nRBCs (corte >= 18 nRBC/100 leucócitos) reflete dano térmico direto à barreira estromal da medula óssea e hipóxia tecidual profunda, associando-se fortemente a MODS e mortalidade.',
      source: 'Aroch et al. (2009) / JVIM / Creative Commons Attribution License',
      url: '/consulta-vet/intermacao-caes-gatos/esfregaco-hemacias-nucleadas-nrbc-aroch.jpg',
      aspectRatio: '4:3',
    },
    {
      id: 'fig-resfriamento-recover-2026',
      title: 'Figura 2 — Algoritmo de Resfriamento Ativo Baseado em Evidências (RECOVER First Aid 2026)',
      legend:
        'Infográfico esquemático do protocolo de resfriamento ativo pré-hospitalar e intra-hospitalar segundo as diretrizes RECOVER First Aid 2026 (Mandell et al., 2026). A aplicação contínua de água fresca corrente sobre o tronco e abdome ventral associada a ventiladores (convecção forçada) otimiza a perda de calor sem fechar a vasculatura periférica. O resfriamento ativo deve ser interrompido rigorosamente aos 39,7–40,0°C para prevenir hipotermia rebote.',
      source: 'RECOVER Initiative (2026) / JVECC (CC BY 4.0)',
      url: '/consulta-vet/intermacao-caes-gatos/algoritmo-resfriamento-ativo-recover-2026.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-endoteliopatia-isquemia-mods',
      title: 'Figura 3 — Cascata Fisiopatológica: Isquemia Esplâncnica, Endoteliopatia e MODS',
      legend:
        'Representação esquemática da fisiopatologia celular da intermação. A vasodilatação cutânea extrema associada à desidratação deflagra isquemia esplâncnica profunda e desarranjo de tight junctions intestinais, permitindo a translocação de endotoxinas para a circulação sistêmica. A lesão térmica direta somada à tempestade inflamatória promove endoteliopatia difusa, consumo de fatores da coagulação (CID) e falência de múltiplos órgãos.',
      source: 'Journal of Cellular and Molecular Medicine / Wikimedia Commons (CC BY 4.0)',
      url: '/consulta-vet/intermacao-caes-gatos/fisiopatologia-endoteliopatia-mods-heatstroke.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-tromboelastometria-rotem-yanai',
      title: 'Figura 4 — Dinâmica Temporal Hemostática na Tromboelastometria (ROTEM)',
      legend:
        'Traçados representativos de tromboelastometria (ROTEM) demonstrando a evolução temporal da coagulopatia na intermação canina (Yanai et al., 2024; Bruchim et al., 2017). Na admissão hospitalar (0h), a maioria dos pacientes apresenta perfil normocoagulável; entretanto, a reavaliação seriada às 12–24 horas revela o surgimento de grave hipocoagulabilidade (alargamento do tempo de coagulação e redução acentuada da firmeza máxima do coágulo), confirmando a necessidade de coagulograma seriado.',
      source: 'Yanai et al. (2024) / JVIM / Open Access (CC BY 4.0)',
      url: '/consulta-vet/intermacao-caes-gatos/curva-hemostatica-tromboelastometria-rotem-yanai.jpg',
      aspectRatio: '16:9',
    },
  ],
};
