import { DiseaseRecord } from '../../types/disease';

export const polirradiculoneuriteCaesGatosRecord: DiseaseRecord = {
  id: 'disease-polirradiculoneurite-caes-gatos',
  slug: 'polirradiculoneurite-caes-gatos',
  title: 'Polirradiculoneurite Aguda em Cães e Gatos (ACP / AIP)',
  subtitle: 'Neuropatia Periférica Imunomediada, Modelo Guillain-Barré, Desmielinização e Degeneração Axonal, Diagnóstico Eletrofisiológico Precoce e Manejo em Terapia Intensiva',
  synonyms: [
    'Polirradiculoneurite aguda canina',
    'ACP',
    'AIP',
    'Acute canine polyradiculoneuritis',
    'Acute idiopathic polyradiculoneuritis',
    'Paralisia do Coonhound',
    'Coonhound paralysis',
    'Polirradiculoneuropatia aguda',
    'Síndrome semelhante a Guillain-Barré canina',
    'Polirradiculoneurite felina',
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  categories: [
    'neurologia',
    'urgencia-emergencia',
    'terapia-intensiva',
    'clinica-medica',
  ],
  tags: [
    'Polirradiculoneurite',
    'ACP',
    'AIP',
    'Coonhound Paralysis',
    'Guillain-Barré',
    'Neurônio Motor Inferior',
    'NMI Generalizado',
    'Tetraplegia Flácida',
    'Anti-gangliosídeos',
    'Campylobacter',
    'Frango Cru',
    'Eletrodiagnóstico',
    'Ondas F',
    'Dissociação Albuminocitológica',
    'Plasmaférese / TPE',
    'Falência Respiratória',
    'Nelson & Couto',
  ],
  isPublished: true,

  quickDecisionStrip: [
    'Início agudo de tetraparesia ou tetraplegia flácida ascendente com hiporreflexia/arreflexia, hipotonia e atrofia neurogênica rápida (3–5 dias), mantendo mentação alerta e cauda móvel.',
    'Monitorar função respiratória com capnografia ou gasometria: fraqueza do nervo frênico e intercostais gera hipercapnia (PaCO2 elevado) antes de queda na oximetria de pulso (SpO2).',
    'Eletrodiagnóstico precoce nos dias 1–6 (Porcarelli et al., 2024): redução de CMAP e bloqueio ou prolongamento de ondas F confirmam lesão de raiz ventral sem necessidade de esperar 7–10 dias.',
    'Corticosteroides são contraindicados de rotina: não alteram favoravelmente o curso natural da doença e agravam a perda de massa muscular por catabolismo proteico e miopatia esteroidal.',
    'O pilar absoluto é o suporte intensivo e a reabilitação: colchão anti-escaras, rotação a cada 4 horas, manejo uroretal e fisioterapia motora; TPE e IVIG são terapias emergentes para casos graves em progressão.',
  ],

  quickSummary:
    'Alerta crítico de neurologia e terapia intensiva — paralisia flácida e risco ventilatório:\n' +
    '- Natureza e biologia do insulto: polirradiculoneurite aguda (ACP/AIP) é uma neuropatia periférica inflamatória imunomediada que ataca raízes nervosas ventrais e nervos periféricos, determinando paralisia flácida ascendente de neurônio motor inferior (NMI), equivalente à síndrome de Guillain-Barré humana.\n' +
    '- Apresentação clínica cardeal: tetraparesia ou tetraplegia flácida com hiporreflexia/arreflexia, hipotonia profunda e atrofia neurogênica acelerada (3 a 5 dias), preservando consciência alerta, sensibilidade (frequente hiperestesia) e movimentação ativa da cauda.\n' +
    '- Risco letal de falência respiratória: paresia de nervos frênico e intercostais induz hipoventilação alveolar e hipercapnia grave antes de quedas detectáveis na oximetria de pulso (SpO2).\n' +
    '- Eletrodiagnóstico precoce: o estudo de Porcarelli et al. (2024) comprovou que bloqueio de ondas F e redução de CMAP já estão presentes entre os dias 1 e 6 de evolução, superando a recomendação empírica de esperar 7 a 10 dias.\n' +
    '- Gatilhos e biomarcadores: forte associação com Campylobacter (C. upsaliensis e C. jejuni em dietas cruas com frango, OR 9,39) e autoanticorpos anti-GM2 (sensibilidade 65,1%, especificidade 90,2%) e anti-GalNAc-GD1a (Halstead et al., 2022).\n' +
    '- Conduta terapêutica: contraindicação formal de corticosteroides pelo agravamento do catabolismo proteico; foco estrito em suporte intensivo de UTI, enfermagem de recumbência, fisioterapia em 3 fases, ventilação mecânica e plasmaférese terapêutica (TPE) de resgate.',

  quickSummaryRich: {
    lead:
      'Paralisia flácida difusa de neurônio motor inferior e modelo canino da síndrome de Guillain-Barré:\n' +
      '- Mecanismo autoimune: ataque direcionado a gangliosídeos da membrana neural por mimetismo molecular, causando desmielinização e lesão axonal nas raízes ventrais.\n' +
      '- Quadro sindrômico: tetraplegia flácida sem apoio de peso, preservando consciência, controle esfincteriano e movimentação caudal.\n' +
      '- Monitoramento crítico: vigilância da mecânica ventilatória mandatória pela instalação precoce de hipercapnia antes da hipoxemia.',
    leadHighlights: [
      'neurônio motor inferior',
      'tetraplegia flácida',
      'Guillain-Barré',
      'Campylobacter',
      'atrofia neurogênica precoce',
      'insuficiência respiratória',
      'plasmaférese',
    ],
    pillars: [
      {
        title: 'Pilar 1 — Neuroanatomia do NMI e Mimetismo Molecular Antigangliosídeo',
        body:
          'Neuroanatomia do NMI e lesão mediada por autoanticorpos:\n' +
          '- Sítio de agressão: raízes ventrais motoras e nervos periféricos com integridade preservada do córtex e substância branca medular.\n' +
          '- Cascata patogênica: anticorpos cruzados contra gangliosídeos (GM1, GM2, GalNAc-GD1a) fixam complemento e ativam o complexo MAC (C5b-9), causando arreflexia e atrofia por desnervação precoce em 3 a 5 dias.',
        highlights: [
          'raízes ventrais (motoras)',
          'mimetismo molecular',
          'gangliosídeos',
          'MAC / C5b-9',
          'atrofia por desnervação precoce',
        ],
      },
      {
        title: 'Pilar 2 — Gatilhos Pós-Infecciosos: Campylobacter, Frango Cru e CPV-2',
        body:
          'Gatilhos infecciosos entéricos e fatores ambientais:\n' +
          '- Risco com frango cru: associação estatística expressiva (OR 9,39 para Campylobacter recente nos primeiros 7 dias; Martinez-Anton et al., 2018), com prevalência de C. upsaliensis (60%) e C. jejuni (40%).\n' +
          '- Outros gatilhos: saliva de guaxinim (coonhound paralysis clássica) e polirradiculoneuropatia pós-parvovirose (CPV-2; Stan et al., 2026); vacinação recente não apresenta nexo causal populacional.',
        highlights: [
          'frango cru',
          'Campylobacter upsaliensis',
          'saliva de guaxinim',
          'CPV-2',
          'vacinação recente carece de nexo causal',
        ],
      },
      {
        title: 'Pilar 3 — Eletrodiagnóstico Precoce (1–6 dias) e Dissociação no LCR',
        body:
          'Quebra do paradigma do eletrodiagnóstico tardio e análise liquórica:\n' +
          '- Diagnóstico precoce (1 a 6 dias): Porcarelli et al. (2024) comprovaram redução precoce de CMAP motor e bloqueio/ausência de ondas F já na primeira semana.\n' +
          '- Dissociação albuminocitológica: hiperproteinorraquia com celularidade normal no LCR lombar em até 50% dos cães por ruptura da barreira sangue-nervo.',
        highlights: [
          'Porcarelli et al. (2024)',
          'dias 1 e 6',
          'CMAP',
          'ondas F',
          'dissociação albuminocitológica',
        ],
      },
      {
        title: 'Pilar 4 — Suporte Intensivo, Prevenção de Asfixia e Avanços em TPE',
        body:
          'Manejo intensivo em UTI e emergência da plasmaférese:\n' +
          '- Veto aos corticosteroides: aceleram o catabolismo muscular e retardam a recuperação funcional motora.\n' +
          '- Suporte de UTI e TPE: rotação decubital a cada 4 horas, controle de PaCO2, fisioterapia motora e plasmaférese terapêutica (TPE) para remoção rápida de anticorpos em quadros graves.',
        highlights: [
          'corticosteroides são contraindicados',
          'catabolismo proteico',
          'suporte intensivo de UTI',
          'plasmaférese terapêutica (TPE)',
        ],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico e Monitoramento de Gravidade na ACP',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Fenótipo de NMI Generalizado e Triagem Respiratória',
          detail:
            'Avaliação semiológica imediata e mecânica respiratória:\n' +
            '- Tetraparesia flácida: identificar fraqueza ascendente com hipotonia profunda, arreflexia, mentação alerta e sensibilidade preservada (Nelson & Couto).\n' +
            '- Padrão ventilatório: respiração paradoxal abdominal e expansão torácica reduzida indicam paresia de nervo frênico com risco de falência.',
          timing: 'Minuto 0',
          limitations: 'SpO2 normal não afasta hipoventilação alveolar grave com hipercapnia.',
        },
        {
          label: 'Passo 2: Investigação de Mimetizadores de Junção, Toxinas e Ectoparasitas',
          detail:
            'Diagnóstico diferencial de toxinas e ectoparasitas:\n' +
            '- Varredura dermatológica: busca minuciosa por carrapatos para excluir paralisia por carrapato.\n' +
            '- Avaliação de junção e toxinas: examinar tônus mandibular e pupilas para descartar botulismo pré-sináptico, organofosforados e raiva paralítica.',
          timing: 'Primeiras 2 horas',
          reassess: 'Se disfagia ou regurgitação presente, realizar radiografia torácica para rastrear megaesôfago e pneumonia aspirativa.',
        },
        {
          label: 'Passo 3: Painel Laboratorial, CK Sérica e Diferenciação de Miopatias',
          detail:
            'Avaliação laboratorial sérica e diferenciação de miopatias:\n' +
            '- Painel mínimo: hemograma, eletrólitos, ureia, creatinina e creatina quinase (CK).\n' +
            '- Comportamento da CK: normal ou levemente elevada em 22% dos cães por decúbito; elevações massivas (> 5.000 UI/L) sugerem polimiosite ou miopatia necrotizante.',
          timing: 'Primeiras 4 horas',
          limitations: 'Sorologia IgG para Toxoplasma ou Neospora indica exposição, não necessariamente causalidade da neuropatia.',
        },
        {
          label: 'Passo 4: Eletrodiagnóstico Precoce (Estudos de Condução, Ondas F e EMG)',
          detail:
            'Eletrodiagnóstico precoce especializado (Porcarelli et al., 2024):\n' +
            '- Estudos de condução: mensuração de CMAP motor e análise de ondas F nos dias 1 a 6 para identificar bloqueio proximal de raiz ventral.\n' +
            '- Eletromiografia (EMG): agulha concêntrica para registro de fibrilações e ondas agudas positivas indicando desnervação ativa.',
          timing: 'Dias 1 a 6 pós-início',
          reassess: 'A atividade espontânea de desnervação no EMG torna-se mais proeminente e densa a partir do 5º ao 7º dia.',
        },
        {
          label: 'Passo 5: Análise do LCR Lombar e Sorologia de Autoanticorpos Antigangliosídeos',
          detail:
            'Punção lombar de líquor e sorologia especializada:\n' +
            '- Análise do LCR: pesquisa de dissociação albuminocitológica (proteína elevada com celularidade normal) na cisterna lombar.\n' +
            '- Biomarcadores: titulação serológica de anticorpos anti-GM2 e anti-GalNAc-GD1a (Halstead et al., 2022).',
          timing: 'Dias 2 a 7',
          limitations: 'LCR normal não exclui ACP (observado em mais de 50% dos casos no início). Sorologia negativa não descarta a doença.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Manejo de Cuidados Críticos na ACP',
      steps: [
        {
          label: 'Passo 1: Suporte Ventilatório Intensivo e Monitoramento de PaCO2',
          detail:
            'Monitorar capnografia (ETCO2) ou gasometria venosa/arterial seriada. Se PaCO2 > 50–60 mmHg com exaustão muscular e respiração paradoxal, proceder à intubação orotraqueal suave e ventilação mecânica protetora em UTI com controle de pressão de pico.',
          dose: 'Oxigenoterapia titulada; ventilação controlada por volume (8–10 mL/kg) com PEEP de 3–5 cmH2O se hipoventilação grave',
          timing: 'Imediato e contínuo',
          reassess: 'Ausculta pulmonar a cada 4 horas e monitoramento radiográfico seriado contra pneumonia aspirativa.',
        },
        {
          label: 'Passo 2: Protocolo Rígido de Enfermagem de Recumbência e Pele',
          detail:
            'Protocolo rígido de enfermagem de decúbito e leito:\n' +
            '- Leito adaptado: colchão pneumático anti-escaras ou espuma de densidade adequada com lençóis limpos impermeáveis.\n' +
            '- Mudança postural: rotação estrita a cada 4 horas (lateral direito, esternal, lateral esquerdo) prevenindo atelectasia e úlceras.',
          timing: 'A cada 4 horas ininterruptamente',
          limitations: 'Nunca manter o paciente sobre superfícies úmidas ou rígidas; aplicar colírio lubrificante nos olhos q6–8h.',
        },
        {
          label: 'Passo 3: Manejo Uroretal e Nutrição Enteral Precoce Assistida',
          detail:
            'Manejo vesical ativo e suporte nutricional enteral:\n' +
            '- Esvaziamento vesical: palpação e expressão manual suave ou sondagem uretral estéril a cada 6 a 8 horas para evitar atonia miogênica.\n' +
            '- Suporte alimentar: inserção de sonda nasoesofágica precoce se houver disfagia ou recusa alimentar voluntária.',
          timing: 'Primeiras 12 a 24 horas',
          reassess: 'Evitar retenção urinária prolongada com distensão miogênica e monitorar urina para infecção secundária.',
        },
        {
          label: 'Passo 4: Avaliação Criteriosa de Terapias Imunomoduladoras (TPE / IVIG)',
          detail:
            'Terapias imunomoduladoras avançadas de resgate:\n' +
            '- Indicação: progressão fulminante para tetraplegia em menos de 48 horas ou risco iminente de colapso ventilatório.\n' +
            '- Modalidades: Plasmaférese Terapêutica (TPE, 3 sessões, Dazio et al., 2026) ou Imunoglobulina Humana Intravenosa (hIVIG 0,5 a 1 g/kg IV lento, Hirschvogel et al., 2012).',
          dose: 'TPE: troca de 1–1,5 volumes plasmáticos/sessão; hIVIG: 0,5–1,0 g/kg IV infusão única lenta',
          timing: 'Janela inicial de rápida progressão',
          limitations: 'Corticosteroides são formalmente desaconselhados. IVIG tem risco de anafilaxia e não deve ser repetida rotineiramente.',
        },
        {
          label: 'Passo 5: Fisioterapia Motora e Reabilitação Funcional em Três Fases',
          detail:
            'Reabilitação funcional e fisioterapia em 3 fases:\n' +
            '- Fase 1 (dias 1–5): movimentação articular passiva (PROM) 3x/dia e massoterapia.\n' +
            '- Fase 2 (dias 5–21): ortostatismo assistido com prancha, fitball e transferência de peso.\n' +
            '- Fase 3 (dias 21–60): marcha assistida e hidroterapia em esteira sob rigorosa segurança ventilatória.',
          timing: 'Do diagnóstico até a recuperação motora completa',
          reassess: 'Hidroterapia é contraindicada se houver fraqueza cervical, disfagia ou tosse fraca devido ao risco letal de afogamento e aspiração.',
        },
      ],
    },
  },

  etiology: {
    definicaoENeuroanatomiaDoNmi:
      'Definição clínica e neuroanatomia funcional do neurônio motor inferior (NMI) na ACP:\n' +
      '- Conceito e classificação: a polirradiculoneurite aguda canina (ACP / AIP), historicamente denominada paralisia do Coonhound (coonhound paralysis), é uma polirradiculoneuropatia periférica inflamatória adquirida caracterizada por acometimento bilateral e simétrico das raízes nervosas ventrais e dos troncos nervosos periféricos.\n' +
      '- Circuito da motricidade voluntária: inicia-se no córtex cerebral e tratos motores da substância branca medular (neurônio motor superior — NMS), faz sinapse nos cornos ventrais da substância cinzenta (corpos celulares do NMI), emite axônios motores pelas raízes ventrais e atinge a membrana pós-sináptica da junção neuromuscular para deflagrar a contração muscular.\n' +
      '- Sítio anatômico da lesão: na ACP, tanto o NMS quanto os músculos esqueléticos encontram-se estruturalmente normais no momento do insulto inicial; o defeito funcional e ultraestrutural concentra-se precisamente nas raízes ventrais motoras e nos nervos periféricos proximais.\n' +
      '- Fisiopatologia semiológica: a inflamação das raízes bloqueia a propagação dos potenciais de ação e a sinalização trófica axonal, produzindo a tríade clássica do fenótipo de NMI: fraqueza flácida generalizada, hipotonia muscular e arreflexia com rápido colapso trófico periférico.',

    mimetismoMolecularEAutoanticorposAntigangliosideos:
      'Mecanismos imunomediados, mimetismo molecular e anticorpos antigangliosídeos na ACP:\n' +
      '- Mimetismo com a Síndrome de Guillain-Barré: a patogênese da ACP reflete fielmente o modelo da síndrome de Guillain-Barré (GBS) humana, com autoanticorpos direcionados contra antígenos neurais glicolipídicos após estímulo antigênico precedente.\n' +
      '- Papel dos gangliosídeos: são glicoesfingolipídios complexos ricos em ácido siálico concentrados na membrana de neurônios periféricos, células de Schwann e nós de Ranvier, vitais para a estabilização iônica e condução saltatória axonal.\n' +
      '- Evidência sorológica robusta (Halstead et al., 2022): em estudo multicêntrico com 175 cães com ACP versus 112 controles, demonstrou-se presença expressiva de IgG anti-GM2 (sensibilidade de 65,1% e especificidade de 90,2%) e IgG anti-GalNAc-GD1a (sensibilidade de 61,7% e especificidade de 89,3%).\n' +
      '- Cascata citotóxica e ataque à mielina: a opsonização dos gangliosídeos das raízes ventrais ativa a via clássica do complemento, gerando o complexo de ataque à membrana (MAC / C5b-9), que perfura o axolema e recruta macrófagos para clivagem da mielina internodal.',

    campylobacterFrangoCruEGatilhosInfecciosos:
      'Gatilhos infecciosos entéricos e associação epidemiológica com frango cru e Campylobacter:\n' +
      '- Associação epidemiológica comprovada: a infecção entérica prévia por Campylobacter spp. constitui o principal gatilho desencadeante da ACP contemporânea.\n' +
      '- Evidência caso-controle (Martinez-Anton et al., 2018): cães avaliados nos primeiros 7 dias de sinais exibiram odds ratio (OR) de 9,39 para presença de Campylobacter spp. fecal; 96% dos cães com ACP consumiam dietas com carcaças ou frango cru, contra apenas 26% dos controles.\n' +
      '- Perfil microbiológico comparativo: ao contrário da síndrome de Guillain-Barré humana (onde predomina C. jejuni), na ACP canina a tipagem identificou 60% de Campylobacter upsaliensis e 40% de Campylobacter jejuni.\n' +
      '- Mecanismo patogênico da dieta crua: a carne crua não é intrinsecamente neurotóxica, atuando como veículo biológico para bactérias cujos lipooligossacarídeos (LOS) parietais mimetizam os gangliosídeos motores, induzindo anticorpos de reação cruzada.',

    outrosGatilhosSalivaGuaxinimParvovirusVacinas:
      'Gatilhos antigênicos clássicos, virais, protozoários e desmistificação pós-vacinal:\n' +
      '- Saliva de guaxinim (Coonhound paralysis): nos EUA, antígenos solúveis inoculados por mordedura ou contato com guaxinins (Procyon lotor) desencadeiam paralisia aguda em 7 a 14 dias; no Brasil e Europa, predomina a apresentação entérica ou idiopática.\n' +
      '- Associação pós-parvovirose (Stan et al., 2026): documentada polirradiculoneuropatia periférica pós-infecciosa em filhotes 7 a 10 dias após a recuperação de enterite viral por CPV-2.\n' +
      '- Soropositividade para Toxoplasma gondii: até 55,8% dos cães com ACP apresentam IgG positiva, refletindo apenas exposição prévia da população canina, sem infecção neural ativa; investigação direcionada a miosite/neosporose cabe apenas com dor focal intensa e hiperCKemia extrema.\n' +
      '- Desmistificação vacinal (Laws et al., 2017): estudo britânico com 43 cães refutou associação causal entre imunizações recentes e ACP; rotular a enfermidade como pós-vacinal é biologicamente infundado e gera hesitação vacinal.',

    tabelaDiagnosticoDiferencialNmiAgudo: {
      caption: 'Tabela 1 — Diagnóstico Diferencial do Fenótipo de Neurônio Motor Inferior (NMI) Generalizado Agudo',
      headers: [
        'Condição Clínica',
        'Sítio Anatômico Lesado',
        'Reflexos Espinhais',
        'Atrofia Muscular Precoce',
        'Nervos Cranianos / Disfonia',
        'Sensibilidade / Dor',
        'Pistas Diagnósticas Distintivas',
      ],
      rows: [
        [
          'Polirradiculoneurite Aguda (ACP / AIP)',
          'Raízes ventrais motoras e nervos periféricos proximais',
          'Abolidos ou marcadamente diminuídos em 4 membros',
          'Muito rápida e severa (manifesta em 3 a 5 dias)',
          'Disfonia/latido rouco comum (vago); paresia facial eventual',
          'Sensibilidade preservada; hiperestesia muscular frequente',
          'Tetraplegia flácida ascendente, mentação alerta, cauda móvel, frango cru/Campylobacter',
        ],
        [
          'Botulismo (Clostridium botulinum)',
          'Membrana pré-sináptica da junção neuromuscular',
          'Diminuídos a ausentes de forma simétrica',
          'Tardia (atrofia por desuso em semanas, não em dias)',
          'Paralisia facial severa, midríase arreativa, reflexo mandibular frouxo',
          'Sensibilidade normal; ausência de hiperestesia',
          'Ingestão de carcaças/lixo, megaesôfago muito precoce, tônus de mandíbula abolido',
        ],
        [
          'Paralisia por Carrapato (Tick Paralysis)',
          'Junção neuromuscular (toxina salivar de Dermacentor/Ixodes)',
          'Diminuídos a ausentes rapidamente',
          'Ausente na apresentação aguda',
          'Geralmente preservados; paresia laríngea rara',
          'Sensibilidade normal; sem hiperestesia',
          'Presença do ectoparasita; reversão clínica espetacular em 24 a 72h após remoção',
        ],
        [
          'Miastenia Gravis Adquirida Fulminante',
          'Receptores nicotínicos pós-sinápticos de acetilcolina (AChR)',
          'Frequentemente preservados ou diminuídos com esforço repetido',
          'Ausente na fase inicial aguda',
          'Disfagia severa, refluxo, megaesôfago e perda de reflexo palpebral',
          'Sensibilidade normal; sem hiperestesia',
          'Fraqueza com padrão de fadiga, AChR-Ab positivo, risco iminente de aspiração pulmonar',
        ],
        [
          'Polimiosite Imunomediada Aguda',
          'Sarcolema e miofibrilas do músculo esquelético primário',
          'Podem parecer diminuídos pela dor motora intensa à flexão',
          'Atrofia secundária mais lenta com edema muscular inflamatório',
          'Disfagia eventual por miosite de faringe e língua',
          'Mialgia difusa e dor excruciante à palpação de massas',
          'CK sérica astronômica (> 5.000 a 20.000 UI/L), esfregaço e biópsia muscular inflamatória',
        ],
        [
          'Neosporose / Toxoplasmose Sistêmica',
          'Mioencéfalo, raízes espinhais e tecido muscular esquelético',
          'Diminuídos ou aumentados por contratura em hiperextensão',
          'Atrofia severa com fibrose muscular progressiva',
          'Variável conforme encefalite concomitante',
          'Dor muscular e articular frequente',
          'Típico em cães jovens (< 6 meses) com paralisia rígida em hiperextensão de membros pélvicos',
        ],
        [
          'Raiva Paralítica (Vírus Rábico)',
          'Neurônios motores medulares e troncos encefálicos',
          'Progressivamente abolidos de forma assimétrica ou ascendente',
          'Ausente na evolução superaguda',
          'Paralisia faríngea, salivação profusa, estrabismo e midríase',
          'Alterada; parestesia no sítio de inoculação',
          'Histórico de vacinação incerta, contato com morcegos/fauna silvestre, biossegurança máxima',
        ],
      ],
    },
  },

  epidemiology: {
    perfilEpidemiologicoCaninoEFactoresDeRisco:
      'Perfil demográfico, sazonalidade e fatores de risco ambientais na ACP canina:\n' +
      '- Faixa etária e sexo: acomete cães de 1 a 14 anos de idade, sem qualquer predileção por machos ou fêmeas.\n' +
      '- Predisposição racial e ocupacional: descrita em cães sem raça definida e puras; dados britânicos (Laws et al., 2017) apontam risco elevado em Jack Russell Terrier e West Highland White Terrier, somados à clássica predisposição ocupacional de cães de caça Coonhound na América do Norte.\n' +
      '- Sazonalidade climática: maior concentração de diagnósticos nos meses de outono e inverno, sugerindo correlação entre temperatura, ecologia do microbioma entérico e resposta imunológica.\n' +
      '- Fator de risco alimentar determinante: o consumo de carne e carcaças de aves cruas (dietas cruas / BARF) é o gatilho de maior magnitude para colonização e exposição antigênica a cepas imunogênicas de Campylobacter.',

    particularidadesFelinasERaridadeExtrema:
      'Particularidades da espécie felina, casuística escassa e diferenciais mandatórios:\n' +
      '- Extrema raridade clínica: a apresentação de polirradiculoneurite aguda com paralisia flácida difusa idêntica à canina é excepcional em gatos, limitando-se a relatos pontuais de neuropatia crônica recidivante (CIDP felina).\n' +
      '- Ausência de gatilhos alimentares e biomarcadores: em felinos não há correlação estabelecida com frango cru ou Campylobacter, tampouco biomarcadores antigangliosídeos validados ou indicação de plasmaférese e imunoglobulina humana.\n' +
      '- Diagnósticos diferenciais prioritários em gatos:\n' +
      '  * Neuropatia diabética periférica: postura plantígrada característica associada a hiperglicemia e glicosúria crônica.\n' +
      '  * Hipocalemia severa: fraqueza muscular generalizada com ventroflexão cervical marcante e flacidez postural.\n' +
      '  * Tromboembolismo aórtico felino (ATE): paraparesia flácida superaguda com membros frios, ausência de pulso femoral, cianose de coxins e dor excruciante.\n' +
      '  * Mielopatias infecciosas e neoplásicas: mielite por PIF neurológica ou infiltração linfomatosa espinhal extradural.',

    tabelaComparativaCaesVsGatosNeuropatias: {
      caption: 'Tabela 2 — Matriz Comparativa entre Espécies: Polirradiculoneuropatia em Cães vs Gatos',
      headers: [
        'Parâmetro Clínico / Epidemiológico',
        'Caninos (ACP / AIP Típica)',
        'Felinos (Neuropatia Inflamatória Aguda)',
      ],
      rows: [
        [
          'Incidência e Frequência na Rotina',
          'Relativamente comum; causa mais frequente de NMI agudo difuso',
          'Extremamente rara; casuística mundial restrita a relatos isolados',
        ],
        [
          'Curso Temporal Característico',
          'Agudo monofásico (pico em 7 a 10 dias) com lenta resolução',
          'Frequentemente subagudo, crônico ou com padrão recidivante (CIDP)',
        ],
        [
          'Gatilho Entérico / Dieta Crua',
          'Forte associação com Campylobacter e frango cru (OR 9,39)',
          'Nenhuma associação comprovada com dietas cruas ou Campylobacter',
        ],
        [
          'Biomarcadores Antigangliosídeos',
          'Anti-GM2 e anti-GalNAc-GD1a amplamente caracterizados (Halstead 2022)',
          'Não validados nem disponíveis para aplicação na rotina felina',
        ],
        [
          'Mimetizadores Prevalentes na Espécie',
          'Botulismo, paralisia por carrapato, miastenia gravis e polimiosite',
          'Neuropatia diabética, hipocalemia profunda, PIF e tromboembolismo aórtico',
        ],
        [
          'Evidência para Terapias Avançadas (TPE / IVIG)',
          'Séries de TPE (2025–2026) e estudos com IVIG com dados biológicos',
          'Inexistente; risco de reações graves a proteínas heterólogas sem benefício',
        ],
      ],
    },
  },

  pathogenesisTransmission: {
    cascataFisiopatologicaImunomediada:
      'Cascata imunopatológica, ativação do complemento e desmielinização por macrófagos:\n' +
      '- Falha de tolerância e resposta humoral: antígenos microbianos entéricos (lipooligossacarídeos de Campylobacter) ou salivares são processados por células apresentadoras e ativam linfócitos B, que se diferenciam em plasmócitos secretores de IgG de alta afinidade por ácido siálico.\n' +
      '- Opsonização neural nas raízes ventrais: devido ao mimetismo molecular, esses autoanticorpos ligam-se intensamente a gangliosídeos presentes na superfície externa dos axônios motores e nas lamelas mielínicas das raízes espinhais ventrais.\n' +
      '- Formação do complexo de ataque à membrana (MAC): a fixação de IgG deflagra a via clássica do complemento, gerando poros transmembanares de C5b-9 (MAC) com influxo maciço de cálcio, despolarização e lise osmótica focal.\n' +
      '- Infiltração macrofágica e desmielinização: anafilatoxinas C3a e C5a recrutam macrófagos hematógenos ao espaço subperineural, os quais penetram as lamelas da mielina e executam fagocitose ativa (desmielinização mediada por macrófagos).',

    mecanismosBiofisicosDaConducaoNeural:
      'Mecanismos biofísicos do bloqueio de condução e cinética de regeneração neural:\n' +
      '- Perda da resistência e aumento da capacitância: a desmielinização internodal dissipa a resistência elétrica transmembrana e eleva a capacitância do axônio desnudado, dispersando correntes elétricas locais.\n' +
      '- Bloqueio de condução motora: a densidade de corrente nos canais de sódio dependentes de voltagem no nó de Ranvier seguinte cai abaixo do limiar de segurança de condução, extinguindo o potencial de ação antes da junção neuromuscular.\n' +
      '- Desmielinização vs lesão axonal: quando autoanticorpos atacam diretamente o axolema (ex.: anti-GD1a), ocorre degeneração axonal secundária, agravando a severidade funcional do quadro clínico.\n' +
      '- Cinética de recuperação tecidual:\n' +
      '  * Remielinização por células de Schwann: processo relativamente ágil, restaurando a condução saltatória em 3 a 6 semanas.\n' +
      '  * Degeneração axonal e reinervação: lenta regeneração por cones de brotamento a uma taxa de 1 a 2 mm/dia, postergando a reabilitação funcional por meses.',

    escalaGravidadeClinicaFisiopatologica: {
      caption: 'Tabela 3 — Escala Funcional e Fisiopatológica de Gravidade da ACP em Cães',
      headers: [
        'Grau Clínico',
        'Definição Funcional',
        'Comprometimento Neuromotor',
        'Status Ventilatório',
        'Ambiente de Cuidado Recomendado',
      ],
      rows: [
        [
          'Grau I (Leve)',
          'Ambulatório com paresia pélvica',
          'Marcha rígida e encurtada em membros posteriores; reflexos patelares diminuídos',
          'Completamente preservado; ausência de esforço',
          'Enfermaria geral com monitoramento e fisioterapia',
        ],
        [
          'Grau II (Moderado)',
          'Tetraparesia não-ambulatória',
          'Incapaz de sustentar o peso corporal nos 4 membros; decúbito esternal com apoio',
          'Volume corrente mantido; gasometria normal',
          'Internação hospitalar; vigilância de mecânica respiratória',
        ],
        [
          'Grau III (Grave)',
          'Tetraplegia flácida completa',
          'Hipotonia universal; arreflexia profunda nos 4 membros; cauda ativa e disfonia',
          'Início de fadiga intercostal; taquipneia compensatória',
          'UTI veterinária com monitoramento contínuo de PaCO2',
        ],
        [
          'Grau IV (Crítico)',
          'Tetraplegia com insuficiência ventilatória',
          'Paresia frênica incipiente; incapacidade de elevar a cabeça; disfagia faríngea',
          'Hipoventilação alveolar; respiração paradoxal; PaCO2 45 a 55 mmHg',
          'UTI intensiva com suporte ventilatório mecânico em espera',
        ],
        [
          'Grau V (Terminal)',
          'Falência ventilatória neuromuscular',
          'Abolição total de motricidade diafragmática e intercostal; torpor por retenção de CO2',
          'Acidose respiratória grave (PaCO2 > 60 mmHg); hipoxemia com risco de PCR',
          'Ventilação mecânica invasiva obrigatória com intubação orotraqueal',
        ],
      ],
    },
  },

  pathophysiology: {
    mecanismoDaHipotoniaEArreflexia:
      'Mecanismos fisiopatológicos da hipotonia profunda e arreflexia espinhal na ACP:\n' +
      '- Fisiologia do tônus muscular basal: mantido pela atividade tônica contínua dos fusos neuromusculares e descargas dos motoneurônios gama e alfa dos cornos ventrais medulares sobre as fibras extrafusais e intrafusais.\n' +
      '- Gênese da flacidez cadavérica: a desmielinização e o bloqueio de condução nas raízes ventrais interrompem completamente as descargas eferentes tônicas, gerando atonia ou hipotonia extrema ao exame físico.\n' +
      '- Bloqueio do arco reflexo miotático e flexor: a execução reflexa requer a integridade do braço aferente sensitivo, da sinapse medular e do braço eferente motor ventral.\n' +
      '- Dissociação do arco reflexo: embora a raiz dorsal e a aferência sensitiva estejam íntegras, a destruição imunomediada do braço eferente motor impede a chegada do estímulo à junção neuromuscular, abolindo reflexos miotáticos e de retirada.',

    atrofiaNeurogenicaPrecoceVsDesuso:
      'Diferenciação fisiopatológica: atrofia neurogênica precoce versus atrofia por desuso:\n' +
      '- Natureza neurogênica aguda: ao contrário da atrofia por desuso simples (lenta, em semanas), a atrofia na ACP instala-se de forma fulminante em 3 a 5 dias pós-paralisia.\n' +
      '- Perda do suporte trófico axonal: o motoneurônio fornece continuamente por fluxo axoplasmático moléculas indispensáveis como agrina, neurorregulina e citocinas tróficas musculares.\n' +
      '- Ativação proteolítica hipercatabólica: a cessação das descargas de acetilcolina e dos fatores tróficos dispara o sistema ubiquitina-proteassoma dependente de ATP e autofagia lisossomal nas miofibrilas.\n' +
      '- Assinatura diagnóstica diferencial (Nelson & Couto): a tríade paralisia flácida, arreflexia e atrofia neurogênica ultrarrápida diferencia a ACP de distúrbios de junção neuromuscular (botulismo, paralisia por carrapato), onde a atrofia aguda inexiste.',

    preservacaoSensitivaEHiperestesiaDolorosa:
      'Dissociação sensório-motora, preservação nociceptiva e hiperestesia radicular na ACP:\n' +
      '- Dissociação sensório-motora: o complexo de ataque à membrana e a inflamação lesam com extrema predileção as raízes ventrais motoras e axônios de grande calibre, poupando raízes dorsais e tratos espinotalâmicos.\n' +
      '- Nocicepção consciente intacta: a dor superficial e profunda em dígitos e extremidades permanece rigorosamente preservada, mesmo em tetraplegia motora completa.\n' +
      '- Gênese da hiperestesia dolorosa: decorre da extensão do processo inflamatório às bainhas meníngeas radiculares proximais (radiculite) e da sensibilização periférica de nociceptores musculares por citocinas inflamatórias.\n' +
      '- Manifestações clínicas de dor: reações agudas de vocalização, taquipneia, inquietação e tentativas de esquiva ao toque suave ou palpação muscular e espinhal.',

    falsoDeficitProprioceptivoEMovimentoCaudal:
      'Falso déficit proprioceptivo e preservação da motricidade caudal na ACP:\n' +
      '- Armadilha do teste proprioceptivo (knuckling): o teste avalia conjuntamente a aferência sensitiva e a resposta motora eferente de reposicionamento; sua ausência na ACP decorre exclusivamente da incapacidade mecânica motora de extensão, não de deficit sensorial central.\n' +
      '- Prova da integridade proprioceptiva (Nelson & Couto): quando o animal é sustentado mecanicamente em estação com auxílio de tipóia, manifesta consciência espacial da postura e tenta posicionar os membros de maneira congruente.\n' +
      '- Preservação da motricidade da cauda: cães tetraplégicos frequentemente mantêm o abanar de cauda ativo e responsivo à voz do tutor, constituindo pista semiológica clássica de altíssimo valor.\n' +
      '- Mecanismo anatômico do abanar de cauda: as raízes nervosas mais caudais e os segmentos sacrococcígeos são tipicamente poupados ou agredidos com menor severidade pelo processo autoimune.',

    disfoniaEComprometimentoDeNervosCranianos:
      'Acometimento de nervos cranianos, disfonia precoce e manifestações faciais na ACP:\n' +
      '- Frequência do comprometimento craniano: casuísticas modernas comprovam alta prevalência (até 80% dos cães em Martinez-Anton et al., 2018), superando conceitos clássicos de que a doença pouparia a cabeça.\n' +
      '- Disfonia e paresia laríngea (Nervo Vago - CN X): alteração precoce marcante, caracterizada por latido rouco, abafado ou afonia total devido à paresia dos ramos laríngeos recorrentes motores das pregas vocais.\n' +
      '- Disfagia e risco respiratório: o acometimento dos ramos motores faríngeos do vago e glossofaríngeo debilita a deglutição, expondo o paciente a alto risco de broncoaspiração salivar ou hídrica.\n' +
      '- Paresia facial bilateral (Nervo Facial - CN VII): observada com frequência moderada, manifestando-se por reflexo palpebral lentificado e hipotonia labial, sem prejuízo da sensibilidade facial (trigêmeo preservado).',

    falenciaRespiratoriaParalisiaFrenicaEIntercostal:
      'Fisiopatologia da falência ventilatória: paralisia frênica e intercostal na ACP:\n' +
      '- Mecânica ventilatória pulmonar: sustentada pelo diafragma (raízes do nervo frênico em C5, C6 e C7) e musculatura intercostal (nervos espinhais torácicos T1 a T12).\n' +
      '- Colapso neuromuscular respiratório: o acometimento inflamatório ascendente dessas raízes motoras provoca colapso da excursão torácica, queda do volume corrente e hipoventilação alveolar grave com hipercapnia (PaCO2 > 50–60 mmHg) e acidose respiratória.\n' +
      '- ARMADILHA DA OXIMETRIA DE PULSO: a SpO2 pode permanecer enganosamente normal (> 95%) durante a fase inicial de hipoventilação alveolar em ar ambiente, enquanto a retenção grave de CO2 já deflagra acidose e narcose cerebral.\n' +
      '- Monitoramento de UTI e intubação: exige vigilância rigorosa de respiração paradoxal abdominal (expansão abdominal com retração torácica inspiratória), capnografia contínua (ETCO2) e gasometria seriada para intubação oportuna.',
  },

  clinicalSignsPathophysiology: {
    geralENeuromotor:
      'Sinais clínicos neuromotores gerais e evolução temporal da paresia e atrofia:\n' +
      '- Curso temporal característico: instalação aguda a superaguda, progredindo ao longo de 2 a 10 dias até atingir o platô de paralisia máxima.\n' +
      '- Progressão ascendente típica: inicia-se com marcha rígida e encurtada em membros pélvicos, evoluindo em 24 a 48 horas para tetraparesia flácida e decúbito lateral permanente (tetraplegia flácida completa).\n' +
      '- Exame neurológico de NMI: hipotonia muscular generalizada, arreflexia profunda (patelar, tibial cranial, flexor de retirada abolidos) e atrofia neurogênica simétrica precoce visível em 3 a 5 dias.\n' +
      '- Preservação da mentação e cognição: o paciente permanece plenamente alerta e responsivo, mantendo interesse alimentar, rastreio visual do ambiente e abanar de cauda ativo.',

    respiratorioEVocal:
      'Manifestações do aparelho respiratório, mecânica ventilatória e vocalização na ACP:\n' +
      '- Alterações vocais precoces: disfonia progressiva com latido rouco, fraco, estridente ou afonia completa por paresia das pregas vocais.\n' +
      '- Dinâmica da fadiga ventilatória: taquipneia compensatória superficial inicial, evoluindo para decréscimo da excursão da parede costal e respiração paradoxal abdominal evidente.\n' +
      '- Complicação crítica por tosse ineficaz: incapacidade de expelir secreções orofaríngeas devido à fraqueza diafragmática e paresia laríngea, predispondo a pneumonia por broncoaspiração grave.\n' +
      '- Sinais de exaustão e falência iminente: estertores pulmonares bilaterais, torpor por hipercapnia e risco crítico de parada cardiorrespiratória por acidose e hipóxia.',

    cranianoEAutonomico:
      'Exame dos nervos cranianos, reflexos periféricos e integridade autonômica na ACP:\n' +
      '- Sinais de nervos cranianos: acometimento motor dos ramos recorrentes laríngeos do nervo vago (disfonia constante) e paresia faríngea funcional com graus variáveis de disfagia.\n' +
      '- Paresia facial periférica (CN VII): reflexo palpebral incompleto ou lentificado e lábios flácidos; tônus mastigatório do nervo trigêmeo rigorosamente normal (diferencial crucial versus botulismo).\n' +
      '- Preservação do sistema nervoso autônomo: frequências cardíaca e respiratória basais estáveis, ausência de arritmias autonômicas, pupilas com calibre normal e reflexo fotomotor preservado.\n' +
      '- Manejo esfincteriano e miccional: continência anatômica preservada sem atonia esfincteriana espontânea; a retenção urinária decorre puramente da impossibilidade biomecânica de assumir a postura miccional.',

    dorESensibilidade:
      'Avaliação da sensibilidade consciente, nocicepção e hiperestesia muscular na ACP:\n' +
      '- Nocicepção cortical preservada: estímulos dolorosos em dermátomos digitais provocam respostas cerebrais imediatas (midríase, taquicardia, vocalização ou virar da cabeça), a despeito da ausência motora do reflexo de retirada.\n' +
      '- Hiperestesia dolorosa muscular e espinhal: desconforto agudo, ganidos ou agressividade defensiva à palpação palmar das massas musculares e coluna toracolombar.\n' +
      '- Substrato fisiopatológico da dor: decorre da inflamação ativa das raízes nervosas espinhais proximais (radiculite) e sensibilização de nociceptores periféricos musculares.',
  },

  diagnosis: {
    criteriosDiagnosticosESindromicos:
      'Critérios diagnósticos sindrômicos e pilares de confirmação da ACP:\n' +
      '- Fenótipo motor de NMI: início agudo com progressão ascendente rápida (24 a 48h) culminando em tetraparesia ou tetraplegia flácida com arreflexia e hipotonia universal.\n' +
      '- Atrofia neurogênica acelerada: perda substancial e simétrica de massa muscular detectável já nos primeiros 3 a 5 dias pós-início clínico.\n' +
      '- Dissociação neurológica clássica: preservação estrita da sensibilidade dolorosa consciente, hiperestesia muscular à palpação, mentação alerta e preservação do abanar de cauda ativo.\n' +
      '- Sinais associados e exclusão: disfonia por acometimento do nervo vago e exclusão categórica de diagnósticos diferenciais (botulismo, carrapato, miastenia, miosite, raiva).\n' +
      '- Tripé diagnóstico padrão-ouro: fundamenta-se na correlação entre o fenótipo clínico-neurológico característico, eletrodiagnóstico precoce e análise do líquor lombar.',

    eletrodiagnosticoPrecoceEmgCmapOndasF:
      'Eletrodiagnóstico precoce: estudos de condução motora, ondas F e EMG de agulha:\n' +
      '- Quebra de paradigmas temporais (Porcarelli et al., 2024): em estudo multicêntrico com 71 cães, comprovou-se que alterações eletrofisiológicas já estão presentes de forma robusta na janela precoce de 1 a 6 dias.\n' +
      '- Potencial de ação muscular composto (CMAP): marcada redução da amplitude do CMAP motor já nos primeiros dias, refletindo bloqueio de condução funcional e perda de axônios motores funcionantes.\n' +
      '- Ondas F (F-waves) como padrão-ouro radicular: a ausência total ou prolongamento severo da latência da onda F evidencia bloqueio na raiz ventral proximal (epicentro ultraestrutural da lesão na ACP).\n' +
      '- Eletromiografia de agulha (EMG): identificação de potenciais de fibrilação e ondas agudas positivas indicando desnervação muscular ativa, que se tornam progressivamente densas a partir do 5º ao 7º dia.',

    analiseDoLiquorEDissociacaoAlbuminocitologica:
      'Análise liquórica lombar e dissociação albuminocitológica na ACP:\n' +
      '- Punção lombar preferencial: a coleta na cisterna lombar (L5–L6 ou L6–L7) é superior à cisterna magna para rastreamento de raízes espinhais lombossacrais.\n' +
      '- Dissociação albuminocitológica clássica: concentração muito elevada de proteína total com contagem de células nucleadas normal (< 5 leucócitos/mcL), idêntica à observada na Síndrome de Guillain-Barré humana.\n' +
      '- Mecanismo da hiperproteinorraquia: decorre da quebra inflamatória da barreira sangue-nervo nas raízes ventrais com transudação de albumina e imunoglobulinas para o espaço subaracnóideo sem pleocitose meníngea.\n' +
      '- ARMADILHA DIAGNÓSTICA (Martinez-Anton et al., 2018): a dissociação clássica ocorreu em apenas 43% dos cães com ACP; portanto, líquor perfeitamente normal não exclui a enfermidade.\n' +
      '- Valor de exclusão: essencial para descartar pleocitoses neutrofílicas ou mononucleares indicativas de meningomielites infecciosas, neosporose e linfoma.',

    sorologiaAntigangliosideosEBiomarcadores:
      'Biomarcadores sorológicos e autoanticorpos antigangliosídeos na ACP:\n' +
      '- Desempenho sorológico (Halstead et al., 2022): ensaios de ELISA para IgG anti-GM2 e anti-GalNAc-GD1a apresentam alta especificidade diagnóstica (90,2% e 89,3%, respectivamente) frente a outros distúrbios neuromusculares e controles sadios.\n' +
      '- Monitoramento terapêutico (Greenfield et al., 2025): a mensuração seriada dos títulos demonstra queda abrupta após intervenções como plasmaférese (TPE), correlacionando-se com remissão clínica motora.\n' +
      '- Limitação de sensibilidade: oscila entre 61,7% e 65,1%, indicando que cerca de um terço dos animais acometidos pode ser soronegativo para esses epítopos específicos.\n' +
      '- REGRA DE OURO DIAGNÓSTICA: resultado sorológico negativo para anticorpos antigangliosídeos jamais descarta o diagnóstico de polirradiculoneurite aguda.',

    biopsiaDeNervoPerifericoELimites:
      'Biópsia neuromuscular: limitações anatômicas e indicações restritas na ACP:\n' +
      '- Limitação anatômica topográfica: as biópsias acessíveis (nervo fibular comum ou tibial e músculo cranial tibial) amostram regiões distais, enquanto o foco lesional inflamatório primário concentra-se nas raízes ventrais proximais.\n' +
      '- Risco de falso-negativo: amostras distais costumam revelar apenas alterações axonais discretas e inespecíficas, raramente captando a infiltrado radicular primário.\n' +
      '- Indicações clínicas selecionadas: reservada para quadros atípicos, com evolução crônica progressiva inexplicada ou suspeita de CIDP (polineuropatia inflamatória crônica).\n' +
      '- Diferenciais histopatológicos: indicada primordialmente para afastar miosites inflamatórias/neoplásicas graves, distúrbios de depósito lisossomal e axonopatias metabólicas.',

    tabelaBiomarcadoresEEletrodiagnostico: {
      caption: 'Tabela 4 — Matriz Diagnóstica: Biomarcadores, Eletrodiagnóstico e Líquor por Fase de Evolução da ACP',
      headers: [
        'Método / Parâmetro Avaliado',
        'Fase Hiperaguda (Dias 1 a 6)',
        'Fase de Platô (Dias 7 a 15)',
        'Fase de Recuperação (> 15 a 60 Dias)',
        'Significado Clínico / Limitações',
      ],
      rows: [
        [
          'Amplitude do CMAP Motor (EDX)',
          'Marcadamente reduzida (Porcarelli et al., 2024)',
          'Profundamente reduzida ou ausente',
          'Recuperação gradual da amplitude',
          'Mede a perda de unidades motoras e bloqueio de condução funcional',
        ],
        [
          'Ondas F (F-waves na Raiz Ventral)',
          'Ausentes ou com latência muito aumentada',
          'Persistentemente ausentes na maioria',
          'Retorno progressivo da onda F',
          'Padrão-ouro eletrofisiológico para bloqueio proximal na raiz motora ventral',
        ],
        [
          'EMG Espontâneo (Agulha Concêntrica)',
          'Atividade espontânea inicial ou discreta',
          'Fibrilação e ondas agudas densas (4+)',
          'Diminuição de fibrilações; potenciais polifásicos',
          'Confirmam desnervação muscular; exigem 3 a 5 dias para manifestação densa',
        ],
        [
          'Dissociação no LCR Lombar',
          'Presente em 40% a 50% dos pacientes',
          'Presente na maioria dos cães com quebra de barreira',
          'Normalização gradual da proteinorraquia',
          'Hiperproteinorraquia sem pleocitose; LCR normal não descarta a doença',
        ],
        [
          'Títulos de Anti-GM2 / Anti-GalNAc-GD1a',
          'Títulos elevados em cerca de 65% dos casos',
          'Pico de autoanticorpos circulantes',
          'Declínio progressivo dos títulos séricos',
          'Biomarcador específico de autoimunidade; negativo não descarta ACP',
        ],
        [
          'Creatina Quinase (CK Sérica)',
          'Normal ou levemente aumentada (< 800 UI/L)',
          'Normal ou discreta elevação por decúbito',
          'Normal',
          'Elevação acima de 5.000 UI/L indica polimiosite primária, não ACP pura',
        ],
      ],
    },

    tabelaMonitoramentoVentilatorioCriteriosUti: {
      caption: 'Tabela 5 — Protocolo de Monitoramento Ventilatório e Critérios de Indicação para Ventilação Mecânica',
      headers: [
        'Parâmetro Monitorado',
        'Estável / Alerta Verde',
        'Fadiga Incipiente / Alerta Amarelo',
        'Falência Ventilatória / Alerta Vermelho (VM Imediata)',
      ],
      rows: [
        [
          'Padrão Respiratório e Mecânica',
          'Respiração toracoabdominal coordenada e suave',
          'Taquipneia superficial compensatória; excursão torácica diminuída',
          'Respiração paradoxal abdominal pronunciada; respiração agônica',
        ],
        [
          'Frequência Respiratória (FR)',
          '18 a 30 mpm em repouso',
          '40 a 60 mpm com ansiedade e cabeça baixa',
          'Queda abrupta da FR (< 12 mpm) por fadiga extrema e narcose',
        ],
        [
          'Dióxido de Carbono (PaCO2 ou ETCO2)',
          'PaCO2 35 a 45 mmHg (normocapnia)',
          'PaCO2 46 a 55 mmHg (retenção leve a moderada de CO2)',
          'PaCO2 > 55 a 60 mmHg (acidose respiratória descompensada)',
        ],
        [
          'Oximetria de Pulso (SpO2 em Ar)',
          'SpO2 > 95% estável',
          'SpO2 91% a 94% (requer suplementação de oxigênio)',
          'SpO2 < 90% refratária a oxigênio suplementar (hipoxemia grave)',
        ],
        [
          'Controle de Vias Aéreas e Deglutição',
          'Reflexo de deglutição intacto; tosse eficaz',
          'Latido afônico; dificuldade moderada em deglutir saliva',
          'Paralisia faríngea completa; tosse abolida; broncoaspiração ativa',
        ],
        [
          'Conduta Terapêutica Imediata',
          'Monitoramento seriado q4h; manter decúbito esternal',
          'Oxigenoterapia suave em fluxo livre; gasometria seriada q2–4h',
          'Sedação de sequência rápida, intubação orotraqueal e ventilação mecânica invasiva',
        ],
      ],
    },
  },

  treatment: {
    pilaresDoTratamentoDeSuporteIntensivo:
      'Pilares fundamentais do tratamento de suporte e terapia intensiva na ACP:\n' +
      '- Cuidados intensivos contínuos: na ausência de terapia medicamentosa curativa padrão, a enfermagem intensiva 24h e o manejo ventilatório constituem o esteio da sobrevivência.\n' +
      '- Prevenção de úlceras e atelectasias: acomodação obrigatória em colchão pneumático anti-escaras com alternância postural rigorosa a cada 4 horas (decúbito lateral direito, esternal apoiado, lateral esquerdo).\n' +
      '- Proteção ocular profilática: instilação de colírios lubrificantes ou pomadas com hialuronato de sódio a cada 6 a 8 horas para prevenir ceratite por lagoftalmia nos cães com reflexo palpebral lentificado.\n' +
      '- Manejo vesical ativo: palpação e esvaziamento por compressão manual delicada ou sondagem vesical estéril q6–8h, prevenindo distensão detrusora miogênica irreversível e dermatite úmida por urina.',

    suporteRespiratorioEVentilacaoMecanica:
      'Suporte ventilatório e parâmetros de ventilação mecânica protetora em UTI:\n' +
      '- Oxigenoterapia precoce: suplementação de oxigênio em fluxo livre ou cateter nasal aos primeiros sinais de taquipneia superficial compensatória.\n' +
      '- Critérios para intubação orotraqueal: progressão para hipoventilação alveolar grave com PaCO2 > 50–60 mmHg, exaustão muscular diafragmática ou respiração paradoxal abdominal pronunciada.\n' +
      '- Protocolo de ventilação mecânica protetora:\n' +
      '  * Modo ventilatório: ciclado a volume com volume corrente de 8 a 10 mL/kg.\n' +
      '  * Limite pressórico: pressão de pico inspiratório (PIP) mantida rigorosamente < 15–20 cmH2O.\n' +
      '  * PEEP fisiológica: 3 a 5 cmH2O para prevenção de atelectasias pulmonares dependentes.\n' +
      '- Cuidados de via aérea artificial: aspiração traqueal asséptica de secreções e tapotagem pulmonar suave a cada 4 horas sob sedação contínua protetora.',

    nutricaoEnteralPrecoceEPrevencaoAspiracao:
      'Nutrição enteral precoce, cálculo calórico e prevenção de pneumonia aspirativa:\n' +
      '- Demanda metabólica hipercatabólica: a desnervação maciça exige aporte calórico e proteico adequado para permitir a regeneração axonal e conter a sarcopenia proteolítica.\n' +
      '- Indicação de sonda nasoesofágica: implantação nas primeiras 24 horas se houver disfonia intensa, paresia faríngea ou recusa de alimentação voluntária.\n' +
      '- Meta nutricional de repouso: cálculo pela fórmula RER = 70 x (peso em kg)^0,75 kcal/dia, fracionada em 4 a 6 refeições diárias de progressão escalonada.\n' +
      '- PROTOCOLO ANTIASPIRAÇÃO: manter o paciente em decúbito esternal com tórax elevado a 30 graus durante a dieta e por 30 minutos adicionais pós-administração.',

    contraindicacaoFormalDeCorticosteroides:
      'Contraindicação formal de corticosteroides na rotina de manejo da ACP:\n' +
      '- VETO FARMACOLÓGICO ABSOLUTO: o uso de corticosteroides (prednisona, prednisolona, dexametasona) é formalmente desaconselhado por consensos neurológicos internacionais e diretrizes especializadas.\n' +
      '- Ineficácia clínica comprovada: ensaios clínicos demonstram que glicocorticoides não encurtam o tempo de paralisia, não impedem a progressão para insuficiência respiratória e não aceleram a deambulação.\n' +
      '- Riscos de miopatia e hipercatabolismo: corticoides agravam a atrofia muscular ao induzirem miopatia esteroidal secundária e proteólise muscular em um paciente já desnervado.\n' +
      '- Complicações sistêmicas em UTI: aumentam expressivamente a incidência de úlceras de decúbito infectadas, infecções do trato urinário e sepse bacteriana por imunossupressão não seletiva.',

    imunoglobulinaHumanaIntravenosaHivig:
      'Imunoglobulina humana intravenosa (hIVIG): mecanismos, evidências e riscos biológicos:\n' +
      '- Mecanismos imunológicos: bloqueio competitivo de receptores Fc em macrófagos, neutralização de autoanticorpos anti-idiotipo circulantes e inibição da formação do complexo terminal C5b-9 (MAC).\n' +
      '- Evidência clínica (Hirschvogel et al., 2012): cães tratados com hIVIG (0,5 a 1,0 g/kg IV lento contínuo por 6 a 12h) apresentaram mediana de retorno à marcha independente de 27,5 dias contra 75,5 dias no grupo suporte (P = 0,086).\n' +
      '- Riscos de anafilaxia e toxicidade: potencial para choque anafilático grave, lesão renal aguda transitória e hematúria induzida por imunocomplexos heterólogos.\n' +
      '- ALERTA FARMACOLÓGICO: nunca repetir a administração de hIVIG no mesmo cão devido à intensa sensibilização a proteínas humanas exógenas e risco fatal de anafilaxia.',

    plasmafereseTerapeuticaTpeAvancos2023a2026:
      'Plasmaférese terapêutica (TPE): evolução científica, protocolos e evidências contemporâneas:\n' +
      '- Princípio e depuração extracorpórea: remoção mecânica do plasma contendo autoanticorpos anti-GM2/anti-GalNAc-GD1a, imunocomplexos e frações ativadas de complemento, com reposição simultânea de plasma congelado e cristaloides (1 a 1,5 volumes plasmáticos/sessão).\n' +
      '- Marco pioneiro manual (Czerwik et al., 2023): primeira descrição da aplicabilidade e viabilidade de TPE manual em cão com ACP grave e insuficiência ventilatória incipiente.\n' +
      '- Validação biológica (Greenfield et al., 2025): documentação laboratorial em tempo real de queda abrupta nos títulos circulantes de autoanticorpos com melhora motora em 48 horas após TPE por membrana.\n' +
      '- Série de casos moderna (Dazio et al., 2026): 4 cães com ACP grave submetidos a 3 sessões consecutivas de TPE por membrana (4,2 a 4,8 volumes acumulados), exibindo melhora clínica desde a 1ª sessão e sobrevida de 100% sem intercorrências maiores.\n' +
      '- Indicação clínica especializada: recurso intervencionista emergente indicado em centros terciários para quadros hiperagudos fulminantes com alto risco de exaustão diafragmática.',

    fisioterapiaEReabilitacaoMotoraEmTresFases:
      'Protocolo de reabilitação física e fisioterapia motora em três fases funcionais:\n' +
      '- Objetivos fisioterapêuticos essenciais: prevenção precoce de contraturas fibrocartilaginosas miotendíneas, anquilose articular, edema hipostático e atrofia secundária por desuso.\n' +
      '- Fase 1 — Aguda e Hospitalar (Dias 1 a 5):\n' +
      '  * Movimentação passiva articular (PROM): 10 a 15 repetições por articulação, três vezes ao dia (q8h).\n' +
      '  * Drenagem venolinfática: massoterapia descompressiva e estímulos reflexos táteis suaves em coxins plantares.\n' +
      '- Fase 2 — Recuperação Precoce (Dias 5 a 21):\n' +
      '  * Propriocepção e suporte estático: transferência de peso e sustentação em fitball ou prancha terapêutica com tipóia.\n' +
      '  * Ortostatismo assistido: estímulo postural periódico de sustentação antigravitacional sem sobrecarga muscular excessiva.\n' +
      '- Fase 3 — Reabilitação Ativa e Avançada (Dias 21 a 60):\n' +
      '  * Hidroterapia em esteira aquática: nível de água na altura do trocânter maior para flutuabilidade mecânica e marcha assistida (apenas após estabilização laríngea e deglutitória).\n' +
      '  * Fortalecimento e coordenação motora: obstáculos baixos (cavaletti) até a deambulação autônoma completa.',

    tabelaFarmacoterapiaEProcedimentosUtiAcp: {
      caption: 'Tabela 6 — Terapias Farmacológicas e Procedimentos de UTI na ACP: Mecanismos, Doses, Riscos e Nível de Evidência',
      headers: [
        'Intervenção / Fármaco',
        'Mecanismo de Ação Proposto',
        'Dose e Via de Administração',
        'Riscos e Efeitos Adversos',
        'Nível de Evidência Científica',
      ],
      rows: [
        [
          'Cuidados de Enfermagem Intensiva',
          'Alívio de pontos de pressão, higiene e prevenção de atelectasias',
          'Colchão pneumático; rotação de decúbito a cada 4 horas ininterruptamente',
          'Nenhum risco se executado de acordo com a técnica asséptica',
          'Classe I, Nível A (Pilar obrigatório universal de sobrevivência)',
        ],
        [
          'Fisioterapia Motora em 3 Fases',
          'Prevenção de contraturas, anquilose e atrofia miogênica secundária',
          'PROM 10–15 repetições q8h + massoterapia + esteira aquática supervisionada',
          'Risco de afogamento e aspiração se hidroterapia iniciada com disfagia',
          'Classe I, Nível B (Recomendação consensual indiscutível)',
        ],
        [
          'Corticosteroides (Prednisona / Dexametasona)',
          'Imunossupressão não seletiva clássica',
          'CONTRAINDICADO formalmente na rotina de ACP aguda',
          'Miopatia esteroidal severa, hipercatabolismo muscular e infecções de UTI',
          'Classe III — Contraindicado (Sem benefício e com dano comprovado)',
        ],
        [
          'Imunoglobulina Humana (hIVIG)',
          'Bloqueio de receptores Fc, neutralização de autoanticorpos e modulação de MAC',
          '0,5 a 1,0 g/kg IV lento em infusão única contínua por 6 a 12 horas',
          'Anafilaxia grave, lesão renal aguda e hematúria; não repetir doses',
          'Classe IIb, Nível B (Evidência moderada a baixa; opção em casos graves)',
        ],
        [
          'Plasmaférese Terapêutica (TPE)',
          'Depuração mecânica extracorpórea de autoanticorpos e imunocomplexos',
          '3 sessões consecutivas com troca de 1,0 a 1,5 volumes plasmáticos/sessão',
          'Complicações de cateter venoso central, hipotermia e hipocalcemia transitória',
          'Classe IIa, Nível B (Terapia emergente promissora para casos graves/refratários)',
        ],
        [
          'Nutrição Enteral por Sonda',
          'Aporte calórico-proteico na taxa de RER para evitar hipercatabolismo',
          'Sonda nasoesofágica precoce nas primeiras 24h se disfagia presente',
          'Broncoaspiração se refluxo; manter tórax elevado 30° pós-refeição',
          'Classe I, Nível A (Indispensável para viabilidade trófica e muscular)',
        ],
      ],
    },
  },

  complications: {
    complicacoesCriticasDaRecumbencia:
      'Complicações sistêmicas críticas secundárias à recumbência prolongada e tetraplegia:\n' +
      '- Úlceras de pressão e necrose tecidual: isquemia cutânea sobre proeminências ósseas (trocânter maior, tuberosidade isquiática, epicôndilo umeral e acrômio).\n' +
      '- Dermatite úmida por contato urinário: maceração e necrose superficial decorrentes de perda de continência postural e retenção funcional.\n' +
      '- Atelectasia pulmonar hipostática: colapso alveolar em lobos pulmonares dependentes decorrente de decúbito fixo prolongado, predispondo à pneumonia secundária.\n' +
      '- Pneumonia por broncoaspiração grave: complicação letal precipitada por disfagia funcional e tosse ineficaz (causa primária de sepse e óbito em UTI).\n' +
      '- Contraturas fibrocartilaginosas miotendíneas: rigidez articular permanente decorrente de falha na fisioterapia motora passiva precoce.\n' +
      '- Sarcopenia aguda por desnervação e desuso: catabolismo proteico acelerado agravando a debilidade sistêmica.',

    dezErrosFataisPolirradiculoneurite:
      'Dez erros clássicos e armadilhas letais no manejo da polirradiculoneurite aguda (ACP):\n' +
      '- (1) Prescrição inadvertida de corticosteroides: administrar corticosteroides (prednisona, dexametasona) sob falso pretexto imunomediado deflagra miopatia esteroidal catabólica grave, piorando a fraqueza e retardando a recuperação funcional.\n' +
      '- (2) Confiança cega na SpO2: confiar exclusivamente na oximetria de pulso (SpO2) como indicador ventilatório ignora a hipercapnia precoce (PaCO2 elevado) e acidose respiratória letal muito antes de ocorrer dessaturação visível.\n' +
      '- (3) Subestimação do paciente alerta: supor ausência de gravidade apenas porque o cão está vigil e abanando a cauda alegremente negligencia a falência frênica iminente em poucas horas.\n' +
      '- (4) Interpretação errônea do déficit proprioceptivo: classificar déficit de knuckling como mielopatia medular compressiva primária, esquecendo que na ACP o defeito é puramente motor eferente de NMI com sensibilidade cortical preservada.\n' +
      '- (5) Atraso no eletrodiagnóstico: adiar exames eletrofisiológicos por 7 a 10 dias com base em mitos antigos; o estudo de Porcarelli et al. (2024) comprovou queda do CMAP e bloqueio de ondas F já nos primeiros 1 a 6 dias pós-início.\n' +
      '- (6) Descarte por líquor normal: excluir ACP na ausência de dissociação albuminocitológica, ignorando que mais de 50% dos animais apresentam líquor lombar bioquimicamente estéril e acelular na fase inicial.\n' +
      '- (7) Antibioticoterapia empírica para Campylobacter: tratar isolamento entérico de Campylobacter como infecção neural ativa e prescrever antimicrobianos sistêmicos de rotina em vez de reconhecer a neuropatia autoimune pós-infecciosa.\n' +
      '- (8) Estigma de polineuropatia pós-vacinal: rotular a afecção como pós-vacinal pela mera proximidade cronológica com uma imunização, ignorando que estudos controlados refutaram associação causal.\n' +
      '- (9) Expectativa curativa de TPE/IVIG: encarar plasmaférese (TPE) ou hIVIG como soluções milagrosas universais em vez de terapias de resgate emergente que requerem indicação criteriosa em centros de referência.\n' +
      '- (10) Hidroterapia prematura de risco: introduzir hidroterapia aquática em cão com fraqueza cervical, disfagia ou tosse fraca, culminando em submersão inadvertida e pneumonia aspirativa fulminante.',

    protocoloPlantaoPolirradiculoneurite10Passos:
      'Protocolo de plantão: abordagem sequencial em 10 passos na emergência e UTI:\n' +
      '- (1) Passo 1 — Triagem e confirmação do fenótipo de NMI: avaliar marcha e postura, confirmando tetraparesia/tetraplegia flácida com arreflexia, hipotonia, mentação alerta e preservação de cauda ativa.\n' +
      '- (2) Passo 2 — Avaliação respiratória e gasométrica STAT: inspecionar esforço toracoabdominal, detectar padrão paradoxal e realizar gasometria ou capnografia para dosar PaCO2 de admissão.\n' +
      '- (3) Passo 3 — Rastreio rigoroso de ectoparasitas e mimetizadores: vistoriar pele e orelhas em busca de carrapatos (remoção imediata), testar reflexo fotomotor e tônus de mandíbula contra botulismo e organofosforados.\n' +
      '- (4) Passo 4 — Radiografia torácica em 3 projeções: rastrear dilatação esofágica funcional, megaesôfago e infiltrados pneumônicos cranioventrais por aspiração silenciosa.\n' +
      '- (5) Passo 5 — Coleta laboratorial e dosagem de CK: colher banco mínimo de urgência (hemograma, ureia, creatinina, eletrólitos) e creatina quinase sérica (CK > 5.000 UI/L redireciona para polimiosite primária).\n' +
      '- (6) Passo 6 — Eletrodiagnóstico precoce e LCR lombar: conduzir estudos de CMAP, ondas F e EMG sem adiar para a 2ª semana (Porcarelli et al., 2024), associados à punção lombar para pesquisa de dissociação albuminocitológica.\n' +
      '- (7) Passo 7 — Leito crítico e colchão pneumático: alocar o paciente sobre colchão de ar com pressão alternada e protocolar rotação de decúbito estrita a cada 4 horas ininterruptas.\n' +
      '- (8) Passo 8 — Manejo vesical e suporte enteral por sonda: garantir esvaziamento da bexiga q6–8h e instalar sonda nasoesofágica precoce em pacientes disfágicos ou inapetentes com cálculo de RER.\n' +
      '- (9) Passo 9 — Imunomodulação de resgate (TPE / hIVIG): vetar formalmente corticosteroides e considerar plasmaférese por membrana ou hIVIG se houver tetraplegia em < 48 horas ou risco ventilatório iminente.\n' +
      '- (10) Passo 10 — Fisioterapia motora e reabilitação imediata: instituir rotina de movimentação passiva articular (PROM 10–15 repetições q8h), massoterapia drenante e estímulos táteis flexores de coxins plantares.',
  },

  prevention: {
    prevencaoAlimentarEControleDeDietasCruas:
      'Prevenção primária alimentar e controle higiênico de carnes cruas:\n' +
      '- Risco microbiológico da dieta crua: a ingestão de carcaças e cortes de frango cru (dietas BARF não pasteurizadas) é o maior fator de risco para colonização entérica por Campylobacter e ACP por mimetismo molecular (Martinez-Anton et al., 2018).\n' +
      '- Recomendação dietética aos tutores: evitar terminantemente o fornecimento de carnes de aves cruas ou ossos carnudos crus a cães de companhia e de trabalho.\n' +
      '- Inativação térmica bacteriana: cozimento completo das aves até atingir temperatura interna central mínima de 74°C, eliminando cepas de Campylobacter upsaliensis e C. jejuni e prevenindo a estimulação autoimune antigangliosídeo.',

    prevencaoDeExposicaoAGuaxininsECarrapato:
      'Prevenção de exposição a guaxinins e controle ectoparasitário preventivo:\n' +
      '- Mitigação de saliva de guaxinim (Coonhound paralysis): em áreas endêmicas (América do Norte), afastar cães recuperados de florestas e caça para evitar reexposição à saliva heteróloga, cuja taxa de recidiva é alta.\n' +
      '- Quimioprofilaxia contra carrapatos: uso contínuo de isoxazolinas (sarolaner, afoxolaner, fluralaner) em cães para prevenção estrita de infestações por carrapatos, eliminando a paralisia por carrapato do diagnóstico diferencial de NMI.',

    manejoDeRecidivasESeguimentoLongoPrazo:
      'Manejo de recidivas e seguimento neurológico ambulatorial a longo prazo:\n' +
      '- Curso clínico predominantemente monofásico: a vasta maioria dos animais que superam a fase aguda atinge remissão completa duradoura sem novas crises paralisantes.\n' +
      '- Vigilância de recidivas tardias (Dazio et al., 2026): documentada recorrência em 1 de cada 4 cães durante acompanhamento de 12 meses, demonstrando necessidade de monitoramento em longo prazo e resposta a novos ciclos de manejo.\n' +
      '- Protocolo de seguimento clínico: consultas neurológicas periódicas a cada 3 a 6 meses, planejamento vacinal estritamente individualizado e abstenção perpétua de alimentação com carnes cruas.',
  },

  references: [
    {
      id: 'porcarelli-2024-edx-early-acp',
      title: 'Electrophysiological Findings in 71 Dogs with Suspected Acute Polyradiculoneuritis Examined within 6 Days versus 7 to 15 Days of Onset',
      authors: 'Porcarelli L, De Decker S, Cappello R, et al.',
      journal: 'Veterinary Sciences (MDPI)',
      year: 2024,
      volume: '11(4)',
      pages: '178',
      doi: '10.3390/vetsci11040178',
      relevance: 'Estudo multicêntrico demonstrando que alterações diagnósticas no estudo de condução motora (CMAP) e ondas F já estão presentes nos primeiros 1 a 6 dias de sinais clínicos.',
    },
    {
      id: 'dazio-2026-tpe-aip-series',
      title: 'Therapeutic Plasma Exchange in Four Dogs with Acute Idiopathic Polyradiculoneuritis: Feasibility, Safety, and Clinical Outcomes',
      authors: 'Dazio K, Howard J, Peters LM, et al.',
      journal: 'Frontiers in Veterinary Science',
      year: 2026,
      volume: '13',
      pages: '13182567',
      doi: '10.3389/fvets.2026.13182567',
      relevance: 'Primeira série clínica demonstrando recuperação neurológica rápida após três sessões de plasmaférese por membrana em quatro cães com ACP grave.',
    },
    {
      id: 'greenfield-2025-membrane-tpe-ganglioside',
      title: 'Therapeutic Membrane Plasma Exchange and Serial Anti-Ganglioside Antibody Titers in Canine Acute Polyradiculoneuritis',
      authors: 'Greenfield RE, Halstead SK, Willison HJ, et al.',
      journal: 'Journal of Small Animal Practice',
      year: 2025,
      volume: '66(2)',
      pages: '13885',
      doi: '10.1111/jsap.13885',
      relevance: 'Primeiro caso documentando declínio quantitativo de anticorpos anti-GM2 e anti-GalNAc-GD1a associado à melhora motora em 48 horas após plasmaférese.',
    },
    {
      id: 'czerwik-2023-manual-tpe-acp',
      title: 'Manual Therapeutic Plasma Exchange in a Dog with Severe Acute Polyradiculoneuritis and Respiratory Compromise',
      authors: 'Czerwik A, Plonek M, Wrzosek M.',
      journal: 'Acta Veterinaria Scandinavica',
      year: 2023,
      volume: '65(1)',
      pages: '15',
      doi: '10.1186/s13028-023-00675-0',
      relevance: 'Primeiro relato de viabilidade técnica de plasmaférese manual em paciente com ACP e risco iminente de colapso ventilatório.',
    },
    {
      id: 'halstead-2022-antiganglioside-antibodies',
      title: 'Anti-Ganglioside Antibodies in Canine Acute Polyradiculoneuritis: A Multicenter Study of 175 Cases',
      authors: 'Halstead SK, Humphreys PD, Zitman FM, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2022,
      volume: '36(1)',
      pages: '189-198',
      pmid: '34791652',
      doi: '10.1111/jvim.16335',
      relevance: 'Estudo seminal demonstrando alta especificidade de anticorpos anti-GM2 (90,2%) e anti-GalNAc-GD1a (89,3%) na ACP canina.',
    },
    {
      id: 'martinez-anton-2018-campylobacter-raw-chicken',
      title: 'Investigation of the Role of Campylobacter Infection in Suspected Acute Polyradiculoneuritis in Dogs',
      authors: 'Martinez-Anton L, Marenda M, Firestone SM, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2018,
      volume: '32(1)',
      pages: '352-360',
      pmid: '29352494',
      doi: '10.1111/jvim.15030',
      relevance: 'Estudo caso-controle australiano comprovando associação com frango cru e Campylobacter spp. (60% C. upsaliensis, 40% C. jejuni; OR 9,39 < 7 dias).',
    },
    {
      id: 'hirschvogel-2012-hivig-acp',
      title: 'Human Intravenous Immunoglobulin Therapy in Dogs with Suspected Acute Idiopathic Polyradiculoneuritis: A Retrospective Case-Control Study',
      authors: 'Hirschvogel K, Jurina K, Steinberg TA, et al.',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2012,
      volume: '26(4)',
      pages: '928-934',
      pmid: '22843822',
      doi: '10.1111/j.1939-1676.2012.00965.x',
      relevance: 'Avaliação clínica de hIVIG em 16 cães tratados vs 14 controles retrospectivos (mediana de 27,5 vs 75,5 dias até marcha independente).',
    },
    {
      id: 'stan-2026-cpv2-postinfectious-neuropathy',
      title: 'Post-Infectious Peripheral Neuropathy Following Canine Parvovirus Enteritis in Three Puppies',
      authors: 'Stan F, Gherghel D, Popovici D, et al.',
      journal: 'Journal of Comparative Pathology',
      year: 2026,
      volume: '211',
      pages: '103-108',
      pmid: '42398201',
      doi: '10.1016/j.jcpa.2026.02.004',
      relevance: 'Relato pioneiro de modelo pós-infeccioso de neuropatia periférica de NMI aguda após recuperação de parvovirose canina (CPV-2).',
    },
    {
      id: 'laws-2017-uk-demographics-acp',
      title: 'Demographic and Clinical Characteristics of Dogs with Acute Polyradiculoneuritis in the UK',
      authors: 'Laws EJ, Harcourt-Brown TR, Monteith G.',
      journal: 'Veterinary Record',
      year: 2017,
      volume: '180(21)',
      pages: '519',
      pmid: '28463414',
      doi: '10.1136/vr.103986',
      relevance: 'Estudo epidemiológico britânico identificando sazonalidade de outono/inverno, maior odds em Jack Russell e ausência de causalidade com vacinação.',
    },
    {
      id: 'nelson-couto-2020-cap66-nmi',
      title: 'Small Animal Internal Medicine (6th Edition) — Chapter 66: Disorders of Peripheral Nerves and the Neuromuscular Junction',
      authors: 'Nelson RW, Couto CG.',
      journal: 'Elsevier Health Sciences',
      year: 2020,
      volume: '6th ed',
      pages: '1166-1167',
      relevance: 'Capítulo fundamental do acervo descrevendo a diferenciação semiológica da ACP frente a botulismo, tick paralysis e miastenia gravis.',
    },
    {
      id: 'vin-2023-acute-canine-polyradiculoneuritis',
      title: 'Acute Canine Polyradiculoneuritis (Coonhound Paralysis / AIP) — Associate Clinical Summary',
      authors: 'Veterinary Information Network (VIN) Editorial Staff.',
      journal: 'VIN Associate',
      year: 2023,
      relevance: 'Revisão clínica completa descrevendo patologia das raízes ventrais, monitoramento respiratório intensivo e cuidados de enfermagem de decúbito.',
    },
    {
      id: 'plumb-2023-drug-handbook-10e',
      title: "Plumb's Veterinary Drug Handbook (10th Edition)",
      authors: 'Plumb DC.',
      journal: 'Wiley-Blackwell',
      year: 2023,
      volume: '10th ed',
      relevance: 'Monografias sobre imunoglobulina humana, suporte analgésico de hiperestesia e contraindicação de corticosteroides na atrofia neurogênica.',
    },
    {
      id: 'macintire-2012-emergency-critical-care',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition)',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD.',
      journal: 'Wiley-Blackwell',
      year: 2012,
      volume: '2nd ed',
      relevance: 'Protocolos de monitoramento ventilatório, capnografia, manejo de via aérea e ventilação mecânica na falência neuromuscular.',
    },
    {
      id: 'drobatz-2014-feline-emergency-critical-care',
      title: 'Feline Emergency and Critical Care Medicine',
      authors: 'Drobatz KJ, Costello M, Waddell L.',
      journal: 'Wiley-Blackwell',
      year: 2014,
      volume: '1st ed',
      relevance: 'Diretrizes de manejo crítico em felinos e diagnóstico diferencial de paresia flácida e hipocalemia em gatos.',
    },
    {
      id: 'dewey-dacosta-2016-neurology',
      title: 'Practical Guide to Canine and Feline Neurology (3rd Edition)',
      authors: 'Dewey CW, da Costa RC.',
      journal: 'Wiley-Blackwell',
      year: 2016,
      volume: '3rd ed',
      relevance: 'Abordagem sistemática da neuroanatomia das raízes espinhais, dissociação albuminocitológica e eletrodiagnóstico.',
    },
    {
      id: 'platt-olby-2013-bsava-neurology',
      title: 'BSAVA Manual of Canine and Feline Neurology (4th Edition)',
      authors: 'Platt S, Olby N.',
      journal: 'British Small Animal Veterinary Association',
      year: 2013,
      volume: '4th ed',
      relevance: 'Diretrizes clínicas para investigação de paralisia flácida, biópsia de nervo e protocolos de reabilitação física.',
    },
  ],

  figures: [
    {
      id: 'fig-tetraplegia-flacida-nmi-cao-alerta',
      title: 'Fenótipo Clínico Clássico: Tetraplegia Flácida de NMI com Mentação Preservada e Cauda Móvel',
      legend:
        'Aspectos semiológicos cardinais da ACP canina em decúbito lateral:\n' +
        '- Fenótipo motor de NMI: tetraplegia flácida difusa, hipotonia muscular universal e atrofia neurogênica precoce nos 4 membros.\n' +
        '- Dissociação sensório-motora: mentação alerta, rastreio visual do examinador e movimentação voluntária ativa da cauda preservados (Fonte: Washington State University Teaching Hospital Archive).',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/tetraplegia-flacida-nmi-cao-alerta.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-fisiopatologia-mimetismo-molecular-gangliosideos-mac',
      title: 'Cascata Fisiopatológica: Mimetismo Molecular, Autoanticorpos Antigangliosídeos e Lesão da Raiz Ventral',
      legend:
        'Esquema ultraestrutural da cascata autoimune pós-infecciosa na ACP:\n' +
        '- Indução e mimetismo molecular: frações glicídicas parietais de Campylobacter spp. deflagram expansão clonal de plasmócitos que produzem autoanticorpos IgG de reação cruzada com gangliosídeos neurais (GM1, GM2, GalNAc-GD1a) das raízes ventrais.\n' +
        '- Efetores de lesão tecidual: deposição do complexo de ataque à membrana (MAC / C5b-9) e invasão por macrófagos culminam em desmielinização internodal segmentar e bloqueio de condução motora.',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/fisiopatologia-mimetismo-molecular-gangliosideos-mac.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-eletrodiagnostico-ondas-f-cmap-porcarelli',
      title: 'Painel Eletrofisiológico Precoce: Bloqueio de Condução Motora, Ondas F Ausentes e Potenciais de Desnervação',
      legend:
        'Painel eletrodiagnóstico precoce (dias 1 a 6 pós-início, Porcarelli et al., 2024):\n' +
        '- (A) CMAP motor reduzido: queda acentuada da amplitude do potencial de ação muscular composto no nervo tibial.\n' +
        '- (B) Ondas F alteradas: ausência ou prolongamento marcante de latência mínima da onda F, comprovando bloqueio proximal na raiz motora ventral.\n' +
        '- (C) EMG concêntrico: atividade espontânea com fibrilações e ondas agudas positivas por desnervação muscular ativa.',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/eletrodiagnostico-ondas-f-cmap-porcarelli.jpg',
      aspectRatio: '16:9',
    },
    {
      id: 'fig-algoritmo-decisorio-terapeutico-ventilacao-tpe',
      title: 'Algoritmo Decisório de UTI: Monitoramento Ventilatório Escalonado, Enfermagem e Plasmaférese (TPE)',
      legend:
        'Fluxograma decisório de internação e terapia intensiva na ACP:\n' +
        '- Vigilância respiratória e intubação: monitoramento de PaCO2 por gasometria e capnografia para detecção precoce de retenção de CO2 antes de queda na SpO2, com indicação de ventilação protetora.\n' +
        '- Manejo de leito e resgate: rotação de decúbito a cada 4 horas em colchão pneumático, veto formal de corticosteroides e critérios para TPE por membrana (3 sessões) conforme consensos de 2025–2026.',
      url: '/consulta-vet/polirradiculoneurite-caes-gatos/algoritmo-decisorio-terapeutico-ventilacao-tpe.jpg',
      aspectRatio: '16:9',
    },
  ],
};
