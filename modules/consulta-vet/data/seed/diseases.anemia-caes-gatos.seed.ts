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

  quickSummary:
    'Síntese clínica e fisiopatológica da anemia em pequenos animais:\n' +
    '- Definição e oferta tecidual de oxigênio (DO2):\n' +
    '  - Síndrome decorrente da redução da massa de eritrócitos circulantes abaixo dos limites fisiológicos.\n' +
    '  - A gravidade clínica é ditada pela velocidade de instalação da hipóxia e pela equação de entrega de oxigênio: DO2 = Débito Cardíaco x Conteúdo Arterial de O2 (CaO2).\n' +
    '- Tríade fisiopatológica primária:\n' +
    '  - 1. Perda sanguínea: hemorragias agudas ou crônicas cavitárias, digestivas ou externas.\n' +
    '  - 2. Destruição acelerada: hemólise extravascular ou intravascular (imunomediada/IMHA, oxidativa, infecciosa ou microangiopática/CID).\n' +
    '  - 3. Produção diminuída ou ineficaz: anemia de inflamação mediada por hepcidina, nefropatia crônica (DRC), ferropenia absoluta ou aplasia medular.\n' +
    '- Padrão-ouro diagnóstico e terapêutico:\n' +
    '  - Contagem absoluta de reticulócitos e análise morfológica do esfregaço sanguíneo em objetiva de imersão.\n' +
    '  - Hemoterapia orientada por biomarcadores clínicos de hipóxia tecidual, com tipagem DEA 1 canina e tipagem estrita do sistema AB felino.\n' +
    '  - Atualizações consensuais IRIS 2026 com agentes estimuladores da eritropoiese (ESA) e inibidores de prolil-hidroxilase do HIF (HIF-PHI, molidustat).',

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
    lead:
      'Definição e conduta na síndrome anêmica:\n' +
      '- Conceito fisiopatológico:\n' +
      '  - Redução da massa de eritrócitos circulantes, comprometendo o conteúdo arterial (CaO2) e a oferta tecidual de oxigênio (DO2).\n' +
      '- Raciocínio etiopatogênico sequencial:\n' +
      '  - Investigação diferencial entre perda sanguínea, destruição hemolítica e produção ineficaz guiada pela contagem absoluta de reticulócitos.',
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
        body:
          'Fisiologia do transporte e oferta de oxigênio:\n' +
          '- Cinética do DO2:\n' +
          '  - A gravidade clínica é ditada pela velocidade de queda da hemoglobina e pela reserva cardiovascular basal.\n' +
          '- Equação fundamental:\n' +
          '  - DO2 = DC x [(1,34 x Hb x SaO2) + (0,003 x PaO2)].\n' +
          '- Limitação física:\n' +
          '  - O oxigênio dissolvido é desprezível (0,3 mL/dL), tornando a reposição celular via hemotransfusão a intervenção primária na hipóxia descompensada.',
        highlights: ['DO2 = DC x CaO2', 'Oxigênio dissolvido é desprezível (0,3 mL/dL)', 'Anemia aguda vs crônica compensada']
      },
      {
        title: 'Pilar 2: Eixo Medular e Cinética de Regeneração',
        body:
          'Avaliação funcional da medula óssea:\n' +
          '- Contagem absoluta de reticulócitos (ARC):\n' +
          '  - Define se a medula responde adequadamente à hipóxia tecidual e ao estímulo da eritropoietina (ARC = RBC x % reticulócitos).\n' +
          '- Janela de latência biológica:\n' +
          '  - A resposta regenerativa demanda de 48 a 96 horas para atingir o sangue periférico.\n' +
          '- Critério na espécie felina:\n' +
          '  - Distinção obrigatória dos reticulócitos agregados (regeneração ativa) dos reticulócitos punctates.',
        highlights: ['Contagem absoluta de reticulócitos (ARC)', 'Janela de retardo medular (48 a 96 h)', 'Gatos: agregados vs punctates']
      },
      {
        title: 'Pilar 3: As Três Vias Etiopatogênicas Fundamentais',
        body:
          'Três vias etiopatogênicas fundamentais:\n' +
          '- 1. Perda sanguínea (hemorragia):\n' +
          '  - Hemorragias externas, cavitárias ou perdas digestivas ocultas.\n' +
          '- 2. Destruição acelerada (hemólise):\n' +
          '  - Hemólise imune (IMHA), toxicose oxidativa, infecções ou microangiopatia mecânica (CID).\n' +
          '- 3. Produção diminuída ou ineficaz:\n' +
          '  - Anemia de inflamação mediada por hepcidina, DRC, ferropenia ou lesão medular primária.',
        highlights: ['Hemorragia (externa, cavitária, oculta)', 'Hemólise (imunomediada, oxidativa, infecciosa)', 'Produção ineficaz (hepcidina, DRC, medula)']
      },
      {
        title: 'Pilar 4: Hemoterapia e Conduta Farmacológica Racional',
        body:
          'Diretrizes de hemoterapia e farmacologia clínica:\n' +
          '- Gatilhos transfusionais objetivos:\n' +
          '  - Decisão apoiada em sinais clínicos e biomarcadores de hipóxia tecidual (lactato, deficit de base), nunca em corte numérico isolado de HCT.\n' +
          '- Segurança imunológica:\n' +
          '  - Tipagem DEA 1 e prova cruzada em cães; tipagem estrita do sistema AB em gatos; veto a anti-histamínicos pré-transfusionais rotineiros (TRACS 2021).\n' +
          '- Farmacologia específica:\n' +
          '  - Imunossupressão na IMHA, reposição criteriosa de ferro e agentes estimuladores (darbepoetina/molidustat) na DRC.',
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
          detail:
            'Avaliação da resposta medular:\n' +
            '- Classificação definitiva:\n' +
            '  - Regenerativa vs não regenerativa pela contagem absoluta de reticulócitos (ARC).\n' +
            '- Microscopia em objetiva de imersão (100x):\n' +
            '  - Pesquisa ativa de esferócitos, policromasia, corpos de Heinz, esquizócitos, rouleaux e hemoparasitas.'
        },
        {
          label: 'Etapa 4: Mapeamento de Foco Hemorrágico e Hemólise',
          timing: '2 a 4 horas',
          detail:
            'Rastreio de perdas ativas e destruição acelerada:\n' +
            '- Investigação em anemia regenerativa:\n' +
            '  - AFAST/TFAST seriado para hemoabdome ou hemotórax; triagem de melena e perdas ocultas.\n' +
            '- Confirmação de hemólise:\n' +
            '  - Avaliação de icterícia, bilirrubina, hemoglobinúria e testes imunomediados (SAT 4:1 ou 49:1 e Coombs/DAT).'
        },
        {
          label: 'Etapa 5: Investigação de Falha de Produção Extramedular e Intramedular',
          timing: 'Conforme estabilização clínica',
          detail:
            'Propedêutica da anemia não regenerativa persistente:\n' +
            '- Triagem sistêmica extramedular:\n' +
            '  - Perfil renal (creatinina, ureia, SDMA, urinálise), perfil de ferro (ferro, TIBC, ferritina), sorologias e PCR infecciosos.\n' +
            '- Avaliação medular invasiva:\n' +
            '  - Aspirado e biópsia de medula óssea se citopenias múltiplas ou ausência de causas extramedulares.'
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
          detail:
            'Indicação e seleção de hemocomponentes:\n' +
            '- Gatilhos clínicos:\n' +
            '  - Concentrado de hemácias (pRBC 6 a 10 mL/kg) ou sangue total (12 a 20 mL/kg) em acidose lática, taquicardia persistente ou colapso.\n' +
            '- Segurança transfusional:\n' +
            '  - Tipagem DEA 1 e crossmatch em cães transfundidos há mais de 4 dias; tipagem estrita AB prévia em gatos.'
        },
        {
          label: 'Fase 3: Terapia Farmacológica Etiológica Direcionada',
          timing: 'Início após confirmação diagnóstica',
          detail:
            'Protocolos etiológicos direcionados:\n' +
            '- Anemia imunomediada (IMHA):\n' +
            '  - Prednisona (2 mg/kg/dia) com segundo agente e tromboprofilaxia mandatória.\n' +
            '- Anemia renal (DRC):\n' +
            '  - Darbepoetina ou molidustat oral conforme diretrizes IRIS 2026.\n' +
            '- Deficiência ferropriva:\n' +
            '  - Sulfato ferroso oral ou ferro dextrano parenteral se carência comprovada.'
        },
        {
          label: 'Fase 4: Profilaxia e Manejo de Complicações Hospitalares',
          timing: 'Durante toda a internação',
          detail:
            'Prevenção de complicações em terapia intensiva:\n' +
            '- Vigilância de reações agudas:\n' +
            '  - Monitoramento contínuo para reações febris, hemolíticas, sobrecarga volêmica (TACO) e lesão pulmonar (TRALI).\n' +
            '- Mitigação da anemia iatrogênica por flebotomia:\n' +
            '  - Uso sistemático de microtubos pediátricos e limite de coleta a menos de 3% da volemia corporal.'
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
    definicaoConceitualERedutoresMassaEritrocitaria:
      'Definição conceitual e quantificação da massa eritrocitária:\n' +
      '- Conceito fisiopatológico central:\n' +
      '  - Redução da massa eritrocitária corporal total abaixo dos limites homeostáticos basais para a espécie, idade e raça do paciente.\n' +
      '- Métodos indiretos e grandezas de concentração:\n' +
      '  - Na rotina, a massa total não é aferida por diluição isotópica; avalia-se o hematócrito automatizado (HCT), o volume globular por microcentrifugação (PCV/VG), a hemoglobina sérica (Hb) e a contagem total de eritrócitos (RBC).\n' +
      '- Interferência da volemia plasmática (Nelson & Couto, 6ª ed.; Ettinger, 9ª ed.):\n' +
      '  - Esses marcadores refletem grandezas de concentração e sofrem interferência direta do volume hídrico intravascular circulante.',

    anemiaAbsolutaVsAnemiaDilucional:
      'Diferenciação crítica entre anemia absoluta e anemia dilucional:\n' +
      '- Anemia absoluta (verdadeira):\n' +
      '  - Contração real e efetiva do número total de eritrócitos circulantes por hemorragia, destruição hemolítica acelerada ou falência de síntese medular.\n' +
      '- Anemia relativa (dilucional):\n' +
      '  - A massa eritrocitária total permanece inalterada, mas o hematócrito e a hemoglobina caem por expansão do compartimento intravascular.\n' +
      '  - Decorre de fluidoterapia com cristaloides em excesso, retenção hidrossalina na insuficiência cardíaca congestiva, síndrome nefrótica ou hipoalbuminemia severa.\n' +
      '- Efeito mascarador da hemoconcentração:\n' +
      '  - Desidratação e choque hipovolêmico inicial concentram o sangue, camuflando perdas eritrocitárias graves sob valores temporariamente normais de hematócrito.',

    fisiologiaDoTransporteOxigenioDO2ECaO2:
      'Fisiologia do transporte e oferta tecidual de oxigênio (DO2 e CaO2):\n' +
      '- Equação de oferta tecidual de oxigênio:\n' +
      '  - DO2 = DC x CaO2 (Volume de O2 entregue aos leitos capilares por minuto = Débito Cardíaco multiplicado pelo Conteúdo Arterial de Oxigênio).\n' +
      '- Equação do conteúdo arterial de oxigênio:\n' +
      '  - CaO2 = (1,34 x Hb x SaO2) + (0,003 x PaO2).\n' +
      '- Fração ligada à hemoglobina versus fração dissolvida:\n' +
      '  - Cada grama de hemoglobina carreadora liga aproximadamente 1,34 mL de O2.\n' +
      '  - A constante de solubilidade plasmática do oxigênio é irrisória (0,003 mL/dL/mmHg).\n' +
      '  - Em animal hígido (Hb 15 g/dL e PaO2 100 mmHg): 19,7 mL/dL trafegam carreados pela hemoglobina e apenas 0,3 mL/dL dissolvidos no plasma.',

    oxigenioterapiaVsTransfusaoMassaEritrocitaria:
      'Oxigenioterapia versus reposição da massa eritrocitária na terapia intensiva:\n' +
      '- Limitação física da oxigenioterapia a 100%:\n' +
      '  - Em paciente crítico com Hb de 4 g/dL e SaO2 de 98%, elevar a PaO2 de 100 para 500 mmHg sob máscara a 100% acrescenta míseros 1,2 mL/dL de O2 dissolvido no plasma [(500 - 100) x 0,003].\n' +
      '- Ganho marginal versus demanda metabólica:\n' +
      '  - Esse pequeno incremento é incapaz de satisfazer o consumo metabólico celular dos órgãos vitais.\n' +
      '- Papel clínico integrado da intervenção:\n' +
      '  - O oxigênio inalatório garante saturação plena da hemoglobina residual remanescente e deve ser iniciado prontamente.\n' +
      '  - Contudo, a restauração genuína da capacidade de transporte e da oferta DO2 exige reposição de eritrócitos funcionais via hemotransfusão.',

    cineticaAdaptativaAnemiaAgudaVsCronica:
      'Cinética adaptativa e tolerância clínica: anemia aguda versus crônica:\n' +
      '- Anemia aguda fulminante:\n' +
      '  - Ocorre em minutos a poucas horas (ruptura de hemangiossarcoma esplênico, trauma vascular maciço).\n' +
      '  - Queda abrupta simultânea de pré-carga, volume sistólico e CaO2.\n' +
      '  - Culmina em colapso circulatório, hiperlactatemia severa e choque hipóxico mesmo com hematócrito em 20%.\n' +
      '- Anemia crônica insidiosa:\n' +
      '  - Desenvolve-se ao longo de semanas ou meses (perda digestiva oculta, parasitismo, nefropatia crônica).\n' +
      '- Mecanismos fisiológicos compensatórios ativados:\n' +
      '  - 1. Aumento do débito cardíaco por taquicardia e hipertrofia excêntrica miocárdica fisiológica.\n' +
      '  - 2. Síntese eritrocitária de 2,3-difosfoglicerato (2,3-DPG), desviando a curva de dissociação da hemoglobina para a direita e facilitando a entrega tecidual de O2.\n' +
      '  - 3. Vasodilatação microvascular periférica e redistribuição de fluxo para SNC e miocárdio.\n' +
      '- Plasticidade clínica surpreendente:\n' +
      '  - Cães e gatos compensados mantêm locomoção e alerta estáveis com hematócritos extremos de 8% a 12% (Nelson & Couto; Feline ECC).',

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

    metabolismoDoFerroHepcidinaEAnemiaDeInflamacao:
      'Homeostase do ferro, eixo da hepcidina e anemia de inflamação (AID):\n' +
      '- O papel central da hepcidina hepática:\n' +
      '  - Hormônio produzido pelo fígado sob estímulo direto de citocinas pró-inflamatórias (principalmente interleucina-6 / IL-6).\n' +
      '  - Atua como o modulador mestre negativo do trânsito sistêmico de ferro.\n' +
      '- Bloqueio da ferroportina e aprisionamento tecidual:\n' +
      '  - A hepcidina liga-se ao canal exportador ferroportina nos enterócitos duodenais e macrófagos espleno-hepáticos, induzindo sua internalização e degradação lisossômica.\n' +
      '  - Bloqueio da absorção entérica de ferro e retenção do ferro reciclado no interior dos macrófagos.\n' +
      '- Deficiência funcional de ferro versus carência absoluta:\n' +
      '  - Os estoques corporais totais de ferro são normais ou abundantes, porém biologicamente inacessíveis aos precursores eritroides medulares.\n' +
      '- Supressão eritroide direta (Nelson & Couto; Feline ECC):\n' +
      '  - Citocinas inflamatórias inibem a divisão dos eritroblastos e atenuam a resposta medular à EPO, produzindo o padrão clássico normocítico normocrômico não regenerativo.'
  },

  epidemiology: {
    prevalenciaHospitalarEEstudoDeLynch:
      'Prevalência epidemiológica hospitalar e evidência de Lynch et al.:\n' +
      '- Coorte multicêntrica pivotal em UTI (851 cães e gatos):\n' +
      '  - 32% dos pacientes já se encontravam anêmicos no momento da admissão hospitalar.\n' +
      '  - 56% dos pacientes desenvolveram anemia adquirida durante o período de internação.\n' +
      '- Cinética da queda mediana do hematócrito intra-hospitalar:\n' +
      '  - Cães: redução mediana de 42% na admissão para 34% durante a internação.\n' +
      '  - Gatos: redução mediana de 31% na admissão para 26% durante a internação.\n' +
      '- Impacto etiológico cumulativo:\n' +
      '  - Reflete a somatória da agressão da doença primária, supressão inflamatória da medula e perdas iatrogênicas.',

    anemiaIatrogenicaPorFlebotomiaEmUTI:
      'Flebotomia diagnóstica e anemia iatrogênica em terapia intensiva:\n' +
      '- Fator de risco iatrogênico crítico e evitável:\n' +
      '  - Coletas sanguíneas repetidas para exames laboratoriais seriados representam uma das maiores causas de queda do hematócrito em UTI.\n' +
      '- Limiar crítico de perda volêmica acumulada:\n' +
      '  - Perda cumulativa de sangue superior a 3% da volemia corporal total correlaciona-se com risco acentuado de anemia moderada a grave.\n' +
      '- Vulnerabilidade extrema em felinos e cães toy:\n' +
      '  - Em felino de 2,5 kg (volume sanguíneo total de aproximadamente 150 a 160 mL), tubos de 3 mL repetidos consomem parcelas críticas da massa eritrocitária.\n' +
      '- Diretriz institucional de segurança:\n' +
      '  - Protocolo de microcoletas em tubos pediátricos de 0,5 a 1,0 mL e agrupamento de exames.',

    particularidadesRaciaisCaninasSighthounds:
      'Particularidades fisiológicas em galgos e raças Sighthounds:\n' +
      '- Intervalos de referência fisiológicos elevados:\n' +
      '  - Cães Greyhound, Whippet, Saluki e afins possuem massa eritrocitária basal marcadamente superior às outras raças.\n' +
      '  - Hematócrito basal hígido situa-se habitualmente entre 55% e 65% (hemoglobina e contagem de hemácias correspondentemente elevadas).\n' +
      '- ARMADILHA DIAGNÓSTICA DE PLANTÃO:\n' +
      '  - Em um Greyhound, um hematócrito de 38% a 40%, embora pareça "normal" em intervalos genéricos de laboratório, configura anemia relativa ou absoluta de moderada a grave.\n' +
      '  - Exige investigação imediata de perdas ou patologias de base.',

    comorbidadesSistemicasAssociadas:
      'Comorbidades sistêmicas de alta morbimortalidade associadas à anemia:\n' +
      '- Doença Renal Crônica (DRC):\n' +
      '  - Prevalência crescente do estágio IRIS 2 ao estágio 4, acometendo a vasta maioria dos felinos em fase terminal por déficit de EPO.\n' +
      '- Neoplasias malignas caninas (ex.: hemangiossarcoma esplênico):\n' +
      '  - Tríade destrutiva: hemorragia aguda intracavitária, microangiopatia mecânica de consumo (CID) e aprisionamento de ferro por inflamação crônica.\n' +
      '- Endocrinopatias metabólicas (hipotireoidismo e hipoadrenocorticismo):\n' +
      '  - Anemia normocítica normocrômica não regenerativa discreta por diminuição do metabolismo celular basal e supressão da eritropoiese.'
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
    transmissao:
      'Etiologia vetorial e vias de transmissão de anemias infecciosas:\n' +
      '- Caráter sindrômico geral:\n' +
      '  - A anemia em pequenos animais é manifestação secundária multifatorial e não transmissível por contato direto casual.\n' +
      '- Transmissão vetorial por artrópodes hematófagos:\n' +
      '  - Carrapatos (Rhipicephalus sanguineus): transmitem Babesia vogeli, Babesia gibsoni, Ehrlichia canis e Anaplasma platys.\n' +
      '  - Pulgas (Ctenocephalides felis): vetores de Mycoplasma haemofelis, Candidatus M. haemominutum e Bartonella henselae em gatos.\n' +
      '  - Flebotomíneos (Lutzomyia longipalpis): transmissão de Leishmania infantum com glomerulonefrite e supressão medular.\n' +
      '- Outras vias de inoculação:\n' +
      '  - Transmissão iatrogênica por transfusão de sangue contaminado e transmissão transplacentária vertical ou neonatal.'
  },

  pathophysiology: {
    mecanismosMicrovascularesEDanoHipoxico:
      'Dano hipóxico celular e falência energética microvascular:\n' +
      '- Parada da cadeia respiratória mitocondrial:\n' +
      '  - A redução na oferta de oxigênio (DO2) deprime a fosforilação oxidativa mitocondrial nas células parenquimatosas.\n' +
      '  - Desvio forçado do metabolismo de piruvato para lactato via lactato desidrogenase, gerando acidose lática metabólica e hiperlactatemia.\n' +
      '- Falência da bomba de sódio-potássio (Na+/K+-ATPase):\n' +
      '  - Depleção de ATP inativa as bombas iônicas transmembrana, gerando influxo de sódio e água com edema intracelular e lise mitocondrial.\n' +
      '- Influxo citosólico maciço de cálcio:\n' +
      '  - Ativação descontrolada de proteases e fosfolipases intracelulares, culminando em morte celular necrótica ou apoptótica difusa.',

    marcadoresEritrocitariosMorfologicosNoEsfregaco:
      'Marcadores morfológicos eritrocitários no esfregaço de sangue periférico:\n' +
      '- 1. Policromasia:\n' +
      '  - Eritrócitos jovens anucleados com RNA residual corados em azul-acinzentado, indicando reticulocitose medular ativa.\n' +
      '- 2. Esferócitos caninos:\n' +
      '  - Hemácias pequenas, densas e sem palidez central decorrentes de fagocitose macrofágica parcial na IMHA.\n' +
      '- 3. Corpos de Heinz:\n' +
      '  - Precipitados redondos refráteis de hemoglobina oxidada na membrana, característicos de toxicose oxidativa (cebola, paracetamol, alho).\n' +
      '- 4. Esquizócitos:\n' +
      '  - Fragmentos mecânicos cortados por filamentos de fibrina na microvasculatura (CID, hemangiossarcoma, vasculite).\n' +
      '- 5. Acantócitos e codócitos (células em alvo):\n' +
      '  - Alterações da relação colesterol/fosfolipídios de membrana, observados em hepatopatias e hemangiossarcoma esplênico.',

    figurasClinicasIntegradas: 'As imagens a seguir ilustram as lesões morfológicas microscópicas e a avaliação medular indispensáveis para a elucidação do mecanismo da anemia em cães e gatos.'
  },

  figures: [
    {
      id: 'fig-anemia-01',
      title: 'Esfregaço Sanguíneo com Coloração Supravital de Novo Azul de Metileno (Reticulócitos)',
      url: '/consulta-vet/anemia/esfregaco-reticulocitos-novo-azul-metileno.jpg',
      legend:
        'Esfregaço de sangue periférico com coloração supravital de Novo Azul de Metileno (NBM):\n' +
        '- Identificação de reticulócitos agregados:\n' +
        '  - Evidencia eritrócitos jovens contendo precipitados reticulares azul-escuros de RNA ribossômico.\n' +
        '- Padrão-ouro medular:\n' +
        '  - A contagem absoluta de reticulócitos constitui o padrão-ouro funcional para avaliar a regeneração medular na anemia (Ajay Kumar Chaurasiya, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-anemia-02',
      title: 'Lesão Oxidativa Eritrocitária em Felino: Corpos de Heinz Conspícuos',
      url: '/consulta-vet/anemia/esfregaco-corpos-de-heinz-felino.jpg',
      legend:
        'Lesão oxidativa eritrocitária e corpos de Heinz em felino:\n' +
        '- Fisiopatologia da oxidação da hemoglobina felina:\n' +
        '  - Projeções refráteis globulares aderidas à membrana resultantes da desnaturação oxidativa da hemoglobina rica em sulfidrilas.\n' +
        '- Etiologias frequentes:\n' +
        '  - Exposição a paracetamol, cebola, alho, propilenoglicol e cetoacidose diabética (Ailuromancy, Domínio Público).',
      source: 'Wikimedia Commons (Public Domain)'
    },
    {
      id: 'fig-anemia-03',
      title: 'Anemia Ferropriva Absoluta: Microcitose e Hipocromia Marcada com Anulócitos',
      url: '/consulta-vet/anemia/esfregaco-anemia-ferropriva-microcitose-hipocromia.jpg',
      legend:
        'Anemia ferropriva absoluta crônica em sangue periférico:\n' +
        '- Alterações morfológicas clássicas:\n' +
        '  - Eritrócitos acentuadamente microcíticos e hipocrômicos com ampla palidez central e anel delgado de hemoglobina (anulócitos).\n' +
        '- Mecanismo etiológico:\n' +
        '  - Depleção severa dos estoques de ferro decorrente de perda sanguínea crônica contínua digestiva ou parasitária (Ed Uthman, MD, CC BY 2.0).',
      source: 'Flickr / Wikimedia Commons (CC BY 2.0)'
    },
    {
      id: 'fig-anemia-04',
      title: 'Anemia Hemolítica Imunomediada (IMHA): Esferócitos e Policromasia Marcada',
      url: '/consulta-vet/anemia/esfregaco-esferocitos-anemia-hemolitica-imunomediada.jpg',
      legend:
        'Anemia Hemolítica Imunomediada (IMHA) em cão:\n' +
        '- Achados citológicos cardinais:\n' +
        '  - Coexistência de numerosos esferócitos (células esféricas sem palidez central) e intensa policromasia regenerativa.\n' +
        '- Mecanismo imunopatológico:\n' +
        '  - Fagocitose parcial da membrana eritrocitária por macrófagos esplênicos opsonizada por IgG/complemento (Spicy, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-anemia-05',
      title: 'Citologia de Medula Óssea: Proliferação e Maturação da Linhagem Eritroide',
      url: '/consulta-vet/anemia/medula-ossea-citologia-linhagem-eritroide.png',
      legend:
        'Citologia aspirativa de medula óssea na avaliação eritroide:\n' +
        '- Cinética de proliferação e maturação:\n' +
        '  - Hiperplasia da linhagem eritroide com precursores em diferentes estágios (rubriblastos, prorrubrícitos, rubrícitos e metarrubrícitos).\n' +
        '- Aplicação no diagnóstico diferencial:\n' +
        '  - Distinção de aplasia pura de células vermelhas (PRCA), síndromes mielodisplásicas e mielofibrose (Yukari Sakurai et al., CC BY 4.0).',
      source: 'Wikimedia Commons / SciELO (CC BY 4.0)'
    }
  ],

  clinicalSignsPathophysiology: [
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Taquicardia compensatória persistente',
          mechanism:
            'Ativação adrenérgica reflexa e preservação da oferta tecidual:\n' +
            '- Estímulo por hipóxia tecidual:\n' +
            '  - A hipóxia tecidual periférica deflagra estímulo adrenérgico reflexo imediato mediado por barorreceptores e quimiorreceptores.\n' +
            '- Manutenção da oferta de oxigênio:\n' +
            '  - Elevação da frequência cardíaca para maximizar o débito cardíaco compensatório e preservar o DO2 (DO2 = DC x CaO2).',
          clinicalMeaning:
            'Significado clínico e monitoramento:\n' +
            '- Marcador precoce:\n' +
            '  - Achado mandatório de monitoramento contínuo no paciente anêmico.\n' +
            '- Risco de falência:\n' +
            '  - Em anemias agudas ou críticas, a taquicardia severa eleva o consumo miocárdico de oxigênio e prenuncia colapso cardiovascular.',
          priority: 'emergency',
          context: ['adrenérgica', 'compensação', 'monitoramento']
        },
        {
          finding: 'Sopro sistólico funcional de ejeção apical esquerdo (grau I a III/VI)',
          mechanism:
            'Hemodinâmica e turbilhonamento por viscosidade reduzida:\n' +
            '- Queda da viscosidade sanguínea:\n' +
            '  - A redução acentuada da concentração de eritrócitos diminui a viscosidade plasmática.\n' +
            '- Turbilhonamento valvar:\n' +
            '  - Aumento da velocidade linear do fluxo e turbilhonamento através dos tratos de saída e valvas atrioventriculares, gerando vibração acústica audível.',
          clinicalMeaning:
            'Interpretação semiológica:\n' +
            '- Natureza hemic:\n' +
            '  - Sopro puramente fisiológico secundário à anemia (sopro hemic funcional).\n' +
            '- Reversibilidade:\n' +
            '  - Desaparece completamente após restauração do hematócrito; não deve ser confundido com cardiopatia estrutural primária.',
          priority: 'common',
          context: ['ausculta', 'viscosidade', 'turbilhonamento']
        },
        {
          finding: 'Pulso arterial periférico hipercinético (pulso martelo d água)',
          mechanism:
            'Dinâmica circulatória do pulso hipercinético:\n' +
            '- Vasodilatação periférica compensatória:\n' +
            '  - Queda da resistência vascular periférica e da pressão diastólica.\n' +
            '- Ejeção sistólica rápida:\n' +
            '  - Ejeção ventricular veloz impulsionada por catecolaminas, gerando ampla pressão de pulso diferencial.',
          clinicalMeaning:
            'Interpretação e evolução clínica:\n' +
            '- Estado hiperdinâmico compensado:\n' +
            '  - Indicador de resposta circulatória compensatória ativa.\n' +
            '- Sinal de exaustão:\n' +
            '  - A transição para pulso filiforme indica esgotamento hemodinâmico ou colapso hipovolêmico descompensado.',
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
          mechanism:
            'Estímulo quimiorreceptor e drive respiratório:\n' +
            '- Ativação de quimiorreceptores:\n' +
            '  - A redução do CaO2 e a instalação de acidose lática hipóxica tecidual estimulam quimiorreceptores carotídeos e aórticos centrais.\n' +
            '- Compensação ventilatória:\n' +
            '  - Elevação do drive ventilatório para maximizar a troca alveolar de O2 e compensar a acidose metabólica por alcalose respiratória.',
          clinicalMeaning:
            'Conduta clínica e proteção:\n' +
            '- Taquipneia anêmica:\n' +
            '  - Sinal cardinal de estresse respiratório de origem não pulmonar.\n' +
            '- REGRA DE MANEJO:\n' +
            '  - Instalação imediata de oxigenioterapia e veto a estresse de contenção física.',
          priority: 'emergency',
          context: ['compensação', 'drive respiratório']
        },
        {
          finding: 'Dispneia verdadeira e postura ortopneica',
          mechanism:
            'Falência ventilatória e hipóxia central:\n' +
            '- Esgotamento da entrega de oxigênio:\n' +
            '  - Hipóxia celular crítica do centro respiratório e musculatura diafragmática fadigada.\n' +
            '- Agravantes concomitantes:\n' +
            '  - Tromboembolismo pulmonar concomitante na IMHA ou efusão pleural em hemotórax.',
          clinicalMeaning:
            'Alerta de emergência máxima:\n' +
            '- Risco iminente de óbito:\n' +
            '  - Demanda protocolo hands-off estrito e preparação imediata de hemocomponente.',
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
          mechanism:
            'Perfusão superficial e concentração de hemoglobina:\n' +
            '- Redução de hemoglobina oxigenada:\n' +
            '  - Redução absoluta do pigmento carreador nos capilares teciduais superficiais.\n' +
            '- Vasoconstrição simpática:\n' +
            '  - Vasoconstrição arteriolar periférica desviando o fluxo sanguíneo da pele e mucosas para órgãos nobres vitais.',
          clinicalMeaning:
            'Diagnóstico diferencial à beira do leito:\n' +
            '- ARMADILHA DIAGNÓSTICA:\n' +
            '  - A palidez não é sinônimo exclusivo de anemia: choque hipotensivo e vasoconstrição extrema também clareiam mucosas.\n' +
            '- Confirmação imediata:\n' +
            '  - Confirmação laboratorial imediata com microcentrifugação (PCV/VG) é mandatória.',
          priority: 'common',
          context: ['semiologia', 'mucosas']
        },
        {
          finding: 'Fraqueza muscular severa, letargia e intolerância ao exercício',
          mechanism:
            'Depleção bioenergética miocelular:\n' +
            '- Depressão da oferta muscular de oxigênio:\n' +
            '  - Queda crítica do DO2 muscular impedindo a fosforilação oxidativa mitocondrial.\n' +
            '- Glicólise anaeróbia forçada:\n' +
            '  - Esgotamento precoce de reservas energéticas de glicogênio com acidose lática local.',
          clinicalMeaning:
            'Gravidade funcional e suporte:\n' +
            '- Correlação funcional:\n' +
            '  - Correlaciona-se diretamente com o déficit funcional do paciente.\n' +
            '- Indicação transfusional:\n' +
            '  - Animais prostrados incapazes de sustentar estação possuem indicação formal de suporte hemoterápico.',
          priority: 'emergency',
          context: ['muscular', 'metabolismo']
        },
        {
          finding: 'Síncope ou colapso agudo pós-esforço',
          mechanism:
            'Hipóxia cerebral transitória isquêmica:\n' +
            '- Limitação do débito cardíaco:\n' +
            '  - Incapacidade miocárdica de elevar o DC durante pequenos esforços para suprir a demanda cerebral.\n' +
            '- Isquemia cortical súbita:\n' +
            '  - Hipoperfusão tecidual encefálica com perda transitória de consciência postural.',
          clinicalMeaning:
            'Alarme de descompensação crítica:\n' +
            '- Alerta hemodinâmico:\n' +
            '  - Sinal de alarme de anemia crítica descompensada.\n' +
            '- Manejo intensivo:\n' +
            '  - Requer internação em UTI e proibição absoluta de estresse mecânico ou físico.',
          priority: 'emergency',
          context: ['neurológico', 'descompensação']
        },
        {
          finding: 'Pica (apetite depravado por terra, reboco ou pedras)',
          mechanism:
            'Disfunção neuroquímica hipotalâmica:\n' +
            '- Depleção neuronal de ferro:\n' +
            '  - Carência crônica profunda de ferro afetando enzimas neuronais e receptores no centro hipotalâmico do apetite.',
          clinicalMeaning:
            'Indício de perda sanguínea crônica:\n' +
            '- Comportamento patognomônico:\n' +
            '  - Comportamento fortemente sugestivo de anemia ferropriva absoluta crônica por perda digestiva contínua oculta.',
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
          mechanism:
            'Degradação digestiva de hemoglobina intraluminal:\n' +
            '- Ação enzimática e bacteriana:\n' +
            '  - Digestão e degradação enzimática de hemoglobina pelas bactérias e proteases ao longo do estômago e intestino delgado superior.',
          clinicalMeaning:
            'Evidência de sangramento digestivo:\n' +
            '- Localização da perda:\n' +
            '  - Evidência inequívoca de perda hemorrágica gastrointestinal crônica ou aguda superior.\n' +
            '- Causa de ferropenia:\n' +
            '  - Uma das causas mais comuns de anemia ferropriva absoluta refratária.',
          priority: 'emergency',
          context: ['sangramento oculto', 'ferropenia']
        },
        {
          finding: 'Hematêmese e hematoquezia ativa',
          mechanism:
            'Extravasamento intraluminal profuso:\n' +
            '- Lesão vascular mucosa e transmural:\n' +
            '  - Sangramento intraluminal no trato digestivo por úlcera gastroduodenal severa, neoplasia ulcerada ou coagulopatia sistêmica.',
          clinicalMeaning:
            'Emergência hemorrágica ativa:\n' +
            '- Perda volêmica aguda visível:\n' +
            '  - Exige ressuscitação volêmica imediata, transfusão de hemocomponentes e terapia antiúlcera agressiva.',
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
          mechanism:
            'Degradação acelerada do heme e saturação hepática:\n' +
            '- Fagocitose macrofágica acelerada:\n' +
            '  - Destruição de eritrócitos pelo sistema mononuclear fagocitário gerando bilirrubina não conjugada em excesso.\n' +
            '- Saturação da conjugação:\n' +
            '  - A produção de bilirrubina excede a capacidade hepática de captação e conjugação.',
          clinicalMeaning:
            'Identificação de processo hemolítico:\n' +
            '- Destruição acelerada:\n' +
            '  - Forte indicador de anemia hemolítica ativa.\n' +
            '- Diagnóstico diferencial:\n' +
            '  - Deve ser diferenciada de hepatopatias primárias e obstruções biliares pós-hepáticas.',
          priority: 'common',
          context: ['hemólise', 'bilirrubina']
        },
        {
          finding: 'Hemoglobinúria (urina vermelho-escura ou cor de refrigerante de cola persistente pós-centrifugação)',
          mechanism:
            'Lise intravascular e filtração glomerular:\n' +
            '- Ruptura intravascular:\n' +
            '  - Hemólise com lise direta no leito vascular esgotando a haptoglobina plasmática circulante.\n' +
            '- Filtração glomerular do heme:\n' +
            '  - Dímeros livres de hemoglobina atravessam o glomérulo e tingem a urina.',
          clinicalMeaning:
            'Diferenciação e risco nefrovisceral:\n' +
            '- Caráter intravascular:\n' +
            '  - Diferencia a hemólise intravascular (emergência gravíssima) da extravascular pura.\n' +
            '- ALERTA NEFROTOXICIDADE:\n' +
            '  - Risco iminente de necrose tubular aguda (NTA) por precipitação do pigmento heme.',
          priority: 'emergency',
          context: ['hemólise intravascular', 'nefrotoxicidade']
        },
        {
          finding: 'Petéquias, equimoses e sangramentos de superfícies mucosas',
          mechanism:
            'Coexistência de falha na hemostasia primária:\n' +
            '- Trombocitopenia ou vasculite grave:\n' +
            '  - Destruição de plaquetas associada na Síndrome de Evans (IMHA + ITP) ou consumo difuso na Coagulação Intravascular Disseminada (CID).',
          clinicalMeaning:
            'Alerta de bicitopenia crítica:\n' +
            '- Sinal de alarme:\n' +
            '  - Alerta vermelho para bicitopenia imunomediada ou coagulopatia de consumo fulminante.',
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
      description:
        'Roteiro propedêutico imediato no ponto de atendimento:\n' +
        '- Mensuração imediata de PCV e TP:\n' +
        '  - Determinação do hematócrito por microcentrifugação (PCV/VG) e leitura da Proteína Plasmática Total (TP) em refratômetro óptico calibrado.\n' +
        '- Inspeção visual da coluna plasmática:\n' +
        '  - Avaliação de hemólise (avermelhada), icterícia (amarelo-ouro escuro) ou lipemia (esbranquiçada).\n' +
        '- Monitoramento hemodinâmico objetivo:\n' +
        '  - Frequência cardíaca, qualidade de pulso periférico, pressão arterial sistólica por Doppler e dosagem de lactato sérico.',
      interpretation:
        'Padrões de correlação entre hematócrito (PCV) e proteína plasmática (TP):\n' +
        '- Confirmação laboratorial de anemia:\n' +
        '  - PCV < 37% na espécie canina ou < 30% na espécie felina.\n' +
        '- Quatro perfis de interpretação combinada PCV / TP:\n' +
        '  - 1. PCV baixo com TP baixa: indica fortemente hemorragia aguda ou crônica ativa com perda simultânea de células e plasma.\n' +
        '  - 2. PCV baixo com TP normal ou alta: sugere destruição hemolítica acelerada ou falência de síntese medular primária.\n' +
        '  - 3. PCV normal com TP baixa: alerta para hemorragia aguda precoce pós-trauma antes da redistribuição volêmica compensatória.\n' +
        '  - 4. PCV baixo com TP muito baixa: aponta para hemodiluição iatrogênica pós-fluidoterapia maciça desproporcional.',
      limitations:
        'Fatores de interferência pré-analítica:\n' +
        '- Contração esplênica canina:\n' +
        '  - Dor ou catecolaminas podem elevar o hematócrito em 10 a 15 pontos percentuais transitoriamente.\n' +
        '- Artefatos de punção:\n' +
        '  - Amostras hemolisadas por punção traumática falseiam a leitura refratométrica da proteína plasmática.',
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: 'Contagem Absoluta de Reticulócitos e Revisão Microscópica do Esfregaço de Sangue Periférico',
      purpose: 'Determinar com precisão diagnóstica se a medula óssea responde ativamente à hipóxia (classificação regenerativa vs não regenerativa) e desvendar o mecanismo etiológico pelas alterações morfológicas eritrocitárias.',
      description:
        'Confecção e processamento laboratorial do esfregaço:\n' +
        '- Esfregaço de sangue periférico fresco:\n' +
        '  - Amostra sem anticoagulante ou em EDTA bem homogeneizado corada por Wright-Giemsa para avaliação citomorfológica.\n' +
        '- Coloração supravital com Novo Azul de Metileno (NBM):\n' +
        '  - Quantificação precisa de reticulócitos e cálculo da Contagem Absoluta de Reticulócitos (ARC):\n' +
        '  - ARC (/uL) = RBC (milhões/uL) x % reticulócitos x 10.000.\n' +
        '- Peculiaridade na espécie felina:\n' +
        '  - Quantificação isolada e obrigatória dos reticulócitos agregados.',
      interpretation:
        'PADRÃO OURO PARA AVALIAÇÃO DA REGENERAÇÃO MEDULAR:\n' +
        '- Limiares diagnósticos na espécie canina:\n' +
        '  - ARC > 100.000 a 110.000/uL: confirma regeneração ativa.\n' +
        '  - ARC > 200.000 a 300.000/uL: indica regeneração medular intensa.\n' +
        '  - ARC < 60.000/uL: resposta não regenerativa evidente.\n' +
        '- Limiares diagnósticos na espécie felina:\n' +
        '  - Reticulócitos agregados > 50.000 a 60.000/uL: regeneração ativa em tempo real.\n' +
        '- Achados morfológicos no esfregaço:\n' +
        '  - Esferócitos conspícuos em cães: apontam fortemente para IMHA.\n' +
        '  - Corpos de Heinz em felinos: confirmam toxicose oxidativa.\n' +
        '  - Esquizócitos: comprovam microangiopatia mecânica de consumo (CID, hemangiossarcoma).\n' +
        '  - Anulócitos microcíticos e hipocrômicos: confirmam deficiência crônica de ferro.\n' +
        '- ARMADILHA DOS ÍNDICES AUTOMATIZADOS (Estudo prospectivo 2024):\n' +
        '  - MCV elevado e MCHC reduzido possuem sensibilidade de apenas 9,8% para detectar regeneração; a contagem de reticulócitos é insubstituível.',
      limitations:
        'Janela fisiológica e armadilhas de contagem:\n' +
        '- Retardo na resposta medular (fase pré-regenerativa):\n' +
        '  - Hemorragias ou hemólises há menos de 48 a 96 horas apresentam contagem baixa de reticulócitos por atraso da proliferação celular.\n' +
        '- Confusão de reticulócitos em gatos:\n' +
        '  - A inclusão inadvertida de reticulócitos punctates simula falsa regeneração aguda imediata.',
      isGoldStandard: true
    },
    {
      stepNumber: 3,
      title: 'Perfil Bioquímico Sérico Abrangente, Avaliação Renal e Urinálise com Exame de Sedimento',
      purpose: 'Avaliar o envolvimento de disfunções orgânicas primárias como gatilho da anemia (doença renal, hepatopatias) e rastrear repercussões metabólicas da hemólise.',
      description:
        'Painel bioquímico e urinário completo pré-fluidoterapia:\n' +
        '- Função renal e perfil eletrolítico:\n' +
        '  - Dosagem de creatinina, ureia, SDMA, eletrólitos (sódio, potássio, cloreto e fósforo) e frações proteicas (albumina e globulinas).\n' +
        '- Perfil hepatobiliar e pigmentos:\n' +
        '  - Enzimas hepáticas (ALT, FA, GGT) e bilirrubina total e frações.\n' +
        '- Urinálise física, química e de sedimento:\n' +
        '  - Coleta preferencial prévia à hidratação, com centrifugação mandatória para caracterização de pigmentúria.',
      interpretation:
        'Raciocínio diagnóstico integrado no painel metabólico:\n' +
        '- Padrão da nefropatia crônica (DRC):\n' +
        '  - Azotemia renal (creatinina, ureia e SDMA elevados) com densidade inadequada (<1.030 em cães, <1.035 em gatos) e anemia normocítica normocrômica não regenerativa.\n' +
        '- Padrão hemolítico acelerado:\n' +
        '  - Hiperbilirrubinemia não conjugada e conjugada associada a bilirrubinúria precoce.\n' +
        '- Diferenciação de pigmentúria por centrifugação urinária:\n' +
        '  - Sobrenadante vermelho persistente pós-centrifugação: confirma hemoglobinúria ou mioglobinúria.\n' +
        '  - Sobrenadante límpido com botão sedimentado de eritrócitos: confirma hematúria (hemorragia urinária).',
      limitations:
        'Armadilhas diagnósticas na interpretação bioquímica:\n' +
        '- Azotemia pré-renal de desidratação:\n' +
        '  - Hipovolemia e choque elevam escórias nitrogenadas simulando lesão renal primária.\n' +
        '- Colestase funcional inflamatória:\n' +
        '  - Em sepse grave, a hiperbilirrubinemia pode refletir colestase induzida por citocinas e não hemólise pura.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Perfil Cinético do Metabolismo do Ferro e Marcadores Reticulocitários Avançados',
      purpose: 'Diferenciar com precisão a deficiência absoluta de ferro (anemia ferropriva por sangramento crônico) da deficiência funcional de ferro (anemia de inflamação / AID).',
      description:
        'Painel completo do metabolismo férrico e reticulocitário:\n' +
        '- Mensuração de biomarcadores séricos:\n' +
        '  - Ferro sérico, Capacidade Total de Ligação do Ferro (TIBC), Saturação de Transferrina (TSAT = [Ferro sérico / TIBC] x 100) e Ferritina sérica.\n' +
        '- Biomarcadores ópticos reticulocitários avançados:\n' +
        '  - Conteúdo de hemoglobina dos reticulócitos (CHr ou Ret-He) em analisadores hematológicos validados.',
      interpretation:
        'Diferenciação crítica entre deficiência absoluta e funcional de ferro:\n' +
        '- Perfil 1: Deficiência Absoluta de Ferro (anemia ferropriva crônica):\n' +
        '  - Ferro sérico baixo (< 60 ug/dL), TIBC normal ou elevado, TSAT marcadamente reduzida (< 15% a 20%), ferritina baixa e CHr/Ret-He suprimido.\n' +
        '- Perfil 2: Anemia de Inflamação / AID (bloqueio funcional por hepcidina):\n' +
        '  - Ferro sérico baixo, TIBC diminuído ou normal-baixo, TSAT discretamente reduzida ou normal, ferritina normal ou elevada e macrófagos medulares repletos de hemossiderina.\n' +
        '- EVIDÊNCIA CLÍNICA (Meta-análise Ahmadi-Hamedani et al. 2025):\n' +
        '  - O CHr/Ret-He possui altíssima acurácia para detecção precoce de restrição férrica medular, devendo-se utilizar os intervalos específicos do equipamento laboratorial utilizado.',
      limitations:
        'Interferência inflamatória nos marcadores:\n' +
        '- Comportamento da ferritina como reagente de fase aguda:\n' +
        '  - Inflamações sistêmicas, neoplasias e hepatopatias elevam os níveis séricos de ferritina, mascarando uma deficiência absoluta concomitante de ferro.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Triagem Imunológica e Painel Diagnóstico de Doenças Infecciosas / Vetoriais',
      purpose: 'Confirmar a mediação imunológica na hemólise conforme critérios estritos do consenso ACVIM 2019 e identificar agentes infecciosos causadores ou disparadores.',
      description:
        'Protocolo de testes imunológicos e moleculares integrados:\n' +
        '- Teste de aglutinação em salina (SAT):\n' +
        '  - Execução imediata em lâmina na proporção estrita de 4 partes de salina para 1 parte de sangue (4:1) ou em tubo (49:1), com lavagem prévia em salina para dispersar rouleaux.\n' +
        '- Teste de Antiglobulina Direto (DAT / Coombs):\n' +
        '  - Realizado sob temperaturas de 4 °C e 37 °C para anticorpos aglutinantes térmicos e a frio.\n' +
        '- Painel molecular (PCR em tempo real) e sorológico:\n' +
        '  - Pesquisa de Mycoplasma haemofelis, Candidatus M. haemominutum e sorologia FeLV/FIV em felinos.\n' +
        '  - Pesquisa de Babesia vogeli, Babesia gibsoni, Ehrlichia canis e Anaplasma platys em cães.',
      interpretation:
        'CRITÉRIOS DIAGNÓSTICOS DO CONSENSO ACVIM 2019 PARA IMHA:\n' +
        '- Regra diagnóstica definitiva:\n' +
        '  - Presença convergente de pelo menos dois marcadores de mecanismo imunomediado (SAT persistente, Coombs positivo ou esferocitose acentuada em cães).\n' +
        '  - Associada a pelo menos um marcador inequívoco de hemólise ativa (hiperbilirrubinemia, hemoglobinemia, hemoglobinúria ou ghost cells).\n' +
        '- Imperativo molecular felino:\n' +
        '  - A pesquisa por PCR de Mycoplasma haemofelis é mandatória, visto que a parasitemia observável em esfregaço é efêmera e cíclica.',
      limitations:
        'Limitações analíticas dos testes:\n' +
        '- Falsos positivos no SAT por diluição inadequada:\n' +
        '  - Proporções 1:1 não quebram o fenômeno de rouleaux gerando falso diagnóstico de autoaglutinação.\n' +
        '- Sensibilidade imperfeita do teste de Coombs:\n' +
        '  - Sensibilidade de 61% a 82%; resultado negativo não descarta IMHA se os outros critérios estiverem presentes.',
      isGoldStandard: false
    },
    {
      stepNumber: 6,
      title: 'Mapeamento Imaginológico Sistêmico (Ultrassonografia Point-of-Care e Radiografia)',
      purpose: 'Rastrear focos ocultos de hemorragia interna, neoplasias primárias com sangramento intracavitário e causas secundárias de hemólise ou inflamação crônica.',
      description:
        'Rastreamento ultrassonográfico point-of-care e imaginologia global:\n' +
        '- Protocolo POCUS imediato (AFAST e TFAST):\n' +
        '  - Busca de líquido livre cavitário nas quatro estações abdominais (bolsa hepatorrenal, esplenorrenal, cistocólica e linha média umbilical) e pesquisa de efusão pleural e pericárdica.\n' +
        '- Paracentese diagnóstica orientada:\n' +
        '  - Em presença de efusão livre, punção guiada imediata com mensuração do hematócrito (PCV) do líquido comparado ao PCV sanguíneo periférico.\n' +
        '- Mapeamento radiográfico e ultrassonográfico completo:\n' +
        '  - Radiografia de tórax em 3 projeções (pesquisa de metástases e hemotórax) e ultrassonografia abdominal completa de parênquimas (baço, fígado, linfonodos e trato gastrointestinal).',
      interpretation:
        'Caracterização de focos hemorrágicos e neoplásicos:\n' +
        '- Confirmação de hemoabdome / hemotórax:\n' +
        '  - Hematócrito do líquido cavitário igual ou superior ao hematócrito sistêmico periférico.\n' +
        '- Quadro patognomônico de hemangiossarcoma roto:\n' +
        '  - Cão idoso com massa esplênica heterogênea cavitária, hemoabdome agudo e esfregaço demonstrando anemia regenerativa com esquizócitos e acantócitos.',
      limitations:
        'Sensibilidade temporal das imagens:\n' +
        '- Sangramentos incipientes ou retroperitoneais:\n' +
        '  - Perdas hemorrágicas de pequeno volume ou lesões de mucosa gastrointestinal podem passar despercebidas no AFAST inicial, exigindo reavaliação seriada.',
      isGoldStandard: false
    },
    {
      stepNumber: 7,
      title: 'Avaliação Citológica e Histopatológica de Medula Óssea (Aspirado e Core Biopsy)',
      purpose: 'Investigar a falência primária da hematopoiese em anemias não regenerativas persistentes inexplicadas por causas extramedulares, citopenias múltiplas ou suspeita de malignidade hematológica.',
      description:
        'Protocolo invasivo estéril de amostragem medular:\n' +
        '- Punção aspirativa com agulha de Rosenthal ou Illinois:\n' +
        '  - Realizada sob sedação e bloqueio anestésico local na crista ilíaca, tuberosidade isquiática ou cabeça proximal do úmero para citologia (relação mieloide:eritroide e índice de maturação).\n' +
        '- Biópsia por agulha trepina de Jamshidi (Core Biopsy):\n' +
        '  - Coleta simultânea de cilindro ósseo fixado em formol para exame histopatológico da arquitetura celular, celularidade global, deposição de colágeno (mielofibrose) e mieloftise.',
      interpretation:
        'Diagnóstico diferencial nas anemias não regenerativas centrais:\n' +
        '- Aplasia Pura de Células Vermelhas (PRCA):\n' +
        '  - Relação mieloide:eritroide (M:E) severamente elevada com bloqueio ou ausência completa de precursores eritroides.\n' +
        '- Aplasia Medular Global (pancitopenia aplástica):\n' +
        '  - Hipocelularidade profunda de todas as linhagens hematopoieticas com substituição por tecido adiposo.\n' +
        '- Síndrome Mielodisplásica (MDS):\n' +
        '  - Displasia citomorfológica marcante em mais de 10% de uma ou mais linhagens com contagem de mieloblastos < 20%.\n' +
        '- Mielofibrose avançada:\n' +
        '  - Suspeitada na aspiração seca ("dry tap") e confirmada pela proliferação reticulínica/colágena na histopatologia.',
      limitations:
        'Riscos procedimentais e pré-requisitos:\n' +
        '- Invasividade e exigência anestésica:\n' +
        '  - Procedimento contraindicado em coagulopatias severas descompensadas antes de correção transfusional ou suporte hemostático prévio.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria:
      'Meta primária da abordagem terapêutica na anemia crítica:\n' +
      '- Foco fisiológico versus numérico:\n' +
      '  - O alvo não é a normalização cosmética do hematócrito numérico laboratorial, mas sim a estabilização rápida da oferta de oxigênio tecidual (DO2).\n' +
      '- Prevenção de falência orgânica (MODS):\n' +
      '  - Interromper a hipóxia celular antes da instalação de glicólise anaeróbia crônica e acidose lática.\n' +
      '- Preservação hemodinâmica e investigação:\n' +
      '  - Manter estabilidade cardiovascular e perfusão enquanto o mecanismo etiopatogênico causal é elucidado e tratado especificamente.',

    oxigenioterapiaERessuscitacaoInicial:
      'Oxigenioterapia inicial e ressuscitação volêmica prudente:\n' +
      '- Suporte ventilatório e enriquecimento de oxigênio:\n' +
      '  - Fornecer oxigênio suplementar em fluxo livre, máscara, cateter nasal duplo ou incubadora com FiO2 de 30% a 40% em pacientes com taquicardia desproporcional, taquipneia anêmica ou hiperlactatemia.\n' +
      '- Fluidoterapia em alíquotas conservadoras:\n' +
      '  - Indicada estritamente em hemorragias hipovolêmicas ativas com cristaloides balanceados (Ringer com Lactato ou Plasma-Lyte 148).\n' +
      '  - Bolus titulados de 10 a 20 mL/kg em cães e 5 a 10 mL/kg em gatos ao longo de 15 a 20 minutos.\n' +
      '- ALERTA EM ANEMIAS NORMOVOLÊMICAS (IMHA, DRC):\n' +
      '  - Veto à fluidoterapia vigorosa em anemias crônicas normovolêmicas.\n' +
      '  - Evita hemodiluição iatrogênica adicional e precipitação de edema pulmonar cardiogênico ou TACO.',

    hemoterapiaEIndicacoesTransfusionais:
      'Gatilhos clínicos transfusionais e seleção de hemocomponentes (ISFM 2021):\n' +
      '- Rejeição de gatilhos puramente numéricos de hematócrito:\n' +
      '  - A decisão transfusional é individualizada com base em sinais objetivos de hipóxia tecidual e descompensação celular, não em corte numérico arbitrário isolado.\n' +
      '- Gatilhos clínicos cardinais para indicação transfusional imediata:\n' +
      '  - 1. Letargia profunda, prostração sem sustentação de estação ou colapso estático.\n' +
      '  - 2. Taquicardia persistente refratária e pulso periférico filiforme.\n' +
      '  - 3. Taquipneia e esforço respiratório anêmico sem doença primária pulmonar.\n' +
      '  - 4. Hiperlactatemia persistente (>2,5 a 3,0 mmol/L) e deficit de base acentuado.\n' +
      '  - 5. Sangramento ativo contínuo profuso ou necessidade cirúrgica emergencial inadiável.\n' +
      '- Seleção criteriosa do hemocomponente ideal:\n' +
      '  - Concentrado de Hemácias (pRBC): padrão-ouro para anemias normovolêmicas (IMHA, DRC, aplasia medular), maximizando CaO2 (hematócrito da bolsa 60% a 80%) com mínima sobrecarga volêmica.\n' +
      '  - Sangue Total Fresco: indicado primordialmente em hemorragias maciças com perda simultânea de eritrócitos, volume plasmático e plaquetas.',

    calculoDeVolumeEAdministracaoHemoderivados:
      'Cálculo de dosagem e protocolo de infusão de hemoderivados:\n' +
      '- Fórmula padrão de cálculo transfusional:\n' +
      '  - Volume a infundir (mL) = Peso (kg) x Volemia (mL/kg) x [(PCV alvo - PCV atual) / PCV da bolsa].\n' +
      '  - Volemia estimada: 80 a 90 mL/kg em cães e 60 a 70 mL/kg em gatos.\n' +
      '- Regra prática de cabeceira:\n' +
      '  - 1 mL/kg de concentrado de hemácias (pRBC) eleva o PCV em ~1 ponto percentual (dose empírica: 6 a 10 mL/kg).\n' +
      '  - 2 mL/kg de sangue total elevam o PCV em ~1 ponto percentual (dose empírica: 12 a 20 mL/kg).\n' +
      '- Protocolo de administração e segurança do equipo:\n' +
      '  - Equipo estéril com filtro microagregado de 170 a 260 micrômetros.\n' +
      '  - Velocidade inicial ultra-lenta: 0,25 a 0,5 mL/kg/hora nos primeiros 15 a 30 minutos com aferição rigorosa de parâmetros vitais.\n' +
      '  - Concluir a infusão em tempo máximo de 4 horas para evitar proliferação bacteriana intra-bolsa.',

    compatibilidadeTransfusionalCaninaEFelina:
      'Compatibilidade e testes imunoematológicos caninos e felinos:\n' +
      '- Diretrizes na espécie canina (Sistema DEA):\n' +
      '  - Tipagem mandatória para DEA 1; receptores DEA 1 negativos devem receber exclusivamente concentrado DEA 1 negativo.\n' +
      '  - Cães virgens de transfusão (transfusion-naïve) podem prescindir de prova cruzada maior (major crossmatch) apenas em emergência extrema.\n' +
      '  - Regra dos 4 dias (consenso AVHTM TRACS 2021): se o paciente recebeu qualquer transfusão prévia há mais de 4 dias, o major crossmatch torna-se formalmente obrigatório pelo surgimento de aloanticorpos circulantes.\n' +
      '- Rigor absoluto na espécie felina (Sistema AB):\n' +
      '  - Presença de aloanticorpos naturais pré-formados desde o desmame; gatos tipo B possuem títulos altíssimos de anticorpos anti-A.\n' +
      '  - Transfusão de 1 mL de sangue tipo A em um gato tipo B deflagra reação hemolítica intravascular fulminante e óbito imediato.\n' +
      '  - Tipagem sanguínea AB e prova cruzada são pré-requisitos invioláveis em felinos.',

    rejeicaoDePreMedicacaoAntiHistaminicaRotineira:
      'Rejeição da pré-medicação anti-histamínica rotineira (Consenso AVHTM TRACS 2021):\n' +
      '- Prática histórica desmistificada:\n' +
      '  - O uso empírico de difenidramina, prometazina ou corticosteroides imediatamente antes da hemotransfusão é contraindicado formalmente.\n' +
      '- Ausência de eficácia profilática demonstrada:\n' +
      '  - Ensaios clínicos controlados provaram que anti-histamínicos não diminuem a incidência de reações transfusionais alérgicas ou febris.\n' +
      '- Efeito deletério de mascaramento clínico:\n' +
      '  - A pré-medicação amortece os sinais precoces de alarme (taquicardia, febre inicial, prurido e eritema), atrasando o reconhecimento crítico de reações hemolíticas agudas ou contaminações bacterianas graves.',

    terapiaFarmacologicaEtiologicaEspecifica:
      'Protocolos farmacológicos direcionados por mecanismo etiológico:\n' +
      '- 1. Anemia Hemolítica Imunomediada (IMHA — Consenso ACVIM Swann et al. 2019):\n' +
      '  - Corticoterapia imunossupressora: prednisona oral a 2 mg/kg/dia (ou prednisolona em gatos e cães hepatopatas; dexametasona 0,2 a 0,3 mg/kg IV na via parenteral).\n' +
      '  - Segundo agente imunossupressor: micofenolato de mofetila (10 mg/kg VO BID em cães) ou ciclosporina (5 a 10 mg/kg/dia VO em cães e gatos).\n' +
      '  - Tromboprofilaxia mandatória: rivaroxabana (1 a 2 mg/kg VO q24h) ou heparina de baixo peso molecular.\n' +
      '- 2. Anemia da Doença Renal Crônica (DRC — Diretrizes IRIS 2026):\n' +
      '  - Darbepoetina alfa: indução com 0,5 a 0,8 ug/kg SC semanal em cães e 1,0 ug/kg SC semanal em gatos; manutenção a cada 2 a 3 semanas com alvo HCT de 25-30% em gatos e 30-35% em cães.\n' +
      '  - Inibidores da prolil-hidroxilase do HIF (HIF-PHI): molidustat oral a 5 mg/kg VO q24h em gatos (Schmidt et al. 2026).\n' +
      '- 3. Anemia Ferropriva Absoluta por sangramento crônico:\n' +
      '  - Resolução primária do foco hemorrágico.\n' +
      '  - Sulfato ferroso oral: cães 100 a 600 mg do sal total VO q24h fracionado com alimento (325 mg do sal correspondem a ~65 mg de ferro elementar).\n' +
      '  - Ferro dextrano injetável: 10 a 20 mg/kg IM dose única em cães; 50 mg totais IM a cada 3 a 4 semanas em gatos (Plumb 10ª ed.; BSAVA Formulary).',

    reacoesTransfusionaisEManejoDeEmergencia:
      'Protocolo de intervenção em reações transfusionais agudas (TRACS 2021):\n' +
      '- Sinais de alerta durante ou logo após a transfusão:\n' +
      '  - Taquipneia súbita, febre (elevação térmica >1 °C), tremores musculares, angioedema, vômito agudo ou colapso circulatório.\n' +
      '- Passos de intervenção imediata de plantão:\n' +
      '- 1. Interrupção imediata:\n' +
      '  - Fechar o equipo de transfusão instantaneamente mantendo o acesso vascular permeável com salina estéril a 0,9%.\n' +
      '- 2. Suporte cardiorrespiratório e checagem:\n' +
      '  - Avaliar vias aéreas, perfusão e checar a rotulagem da bolsa em relação ao prontuário do paciente.\n' +
      '- 3. Diferenciação clínica e conduta estratificada:\n' +
      '  - Reações alérgicas simples (eritema/urticária): tratar com anti-histamínico e retomar infusão sob velocidade reduzida.\n' +
      '  - Hemólise aguda ou sepse bacteriana: choque, hemoglobinemia e CID; suporte intensivo e ressuscitação imediata.\n' +
      '  - Sobrecarga circulatória (TACO): hipertensão e edema pulmonar; suspender volume e administrar furosemida IV.\n' +
      '  - Lesão pulmonar aguda (TRALI): hipoxemia não cardiogênica; suporte ventilatório e refratariedade a diuréticos.'
  },

  complications: {
    hipoxiaCelularEInsuficienciaMultiplosOrgaos:
      'Falência orgânica múltipla secundária à hipóxia isquêmica (MODS):\n' +
      '- Consequências da persistência de HCT crítico:\n' +
      '  - Queda irreversível na oferta celular de oxigênio com depleção de fosfatos de alta energia (ATP).\n' +
      '- Lesões isquêmicas de órgãos-alvo:\n' +
      '  - Necrose tubular aguda (NTA) renal por isquemia do córtex e medula externa.\n' +
      '  - Necrose centrolobular hepática hipóxica e disfunção biliar.\n' +
      '  - Quebra da barreira mucosal gastrointestinal com translocação bacteriana entérica maciça, deflagrando sepse e síndrome de disfunção de múltiplos órgãos (MODS).',

    sobrecargaCirculatoriaEEdemaPulmonarTACO:
      'Sobrecarga Circulatória Associada à Transfusão (TACO):\n' +
      '- Fisiopatologia do edema cardiogênico agudo:\n' +
      '  - Infusão excessiva ou excessivamente rápida de hemocomponentes (especialmente sangue total ou plasma).\n' +
      '- Pacientes de alto risco:\n' +
      '  - Animais com cardiopatia oculta subclínica, insuficiência renal crônica oligoanúrica ou normovolemia prévia estrita.\n' +
      '- Desfecho clínico:\n' +
      '  - Elevação abrupta da pressão venosa e capilar pulmonar, culminando em edema alveolar fulminante e óbito por insuficiência respiratória hipoxêmica.',

    tromboembolismoPulmonarNaIMHA:
      'Tromboembolismo pulmonar na Anemia Hemolítica Imunomediada (IMHA):\n' +
      '- Estado de hipercoagulabilidade patológica extrema:\n' +
      '  - Deflagrado pela ativação plaquetária contínua, micropartículas eritrocitárias pró-coagulantes e liberação descontrolada de fator tecidual.\n' +
      '- Principal causa de mortalidade hospitalar:\n' +
      '  - O tromboembolismo pulmonar (TEP) é o desfecho fatal predominante em cães internados com IMHA ativa.\n' +
      '- Mandato profilático:\n' +
      '  - Justifica a instituição formal de tromboprofilaxia com anticoagulantes (rivaroxabana ou heparina) imediatamente na admissão.',

    sobrecargaCorporalEToxicidadePorFerro:
      'Hemossiderose e toxicidade tecidual por sobrecarga de ferro:\n' +
      '- Iatrogenia farmacológica por uso indiscriminado:\n' +
      '  - Administração de ferro oral ou injetável em pacientes com anemia de inflamação ou nefropatias sem deficiência ferropriva absoluta comprovada.\n' +
      '- Danos parenquimatosos celulares:\n' +
      '  - Saturação da capacidade da transferrina plasmática e depósito citotóxico de ferro livre e hemossiderina em macrófagos e parênquimas.\n' +
      '  - Estresse oxidativo por reações de Fenton com fibrose progressiva em fígado, miocárdio e pâncreas.'
  },

  prevention: {
    mitigacaoDeFlebotomiaIatrogenicaEmUTI:
      'Prevenção de anemia iatrogênica por flebotomias em terapia intensiva:\n' +
      '- Microcoletas sistemáticas:\n' +
      '  - Utilização estrita de microtubos pediátricos de 0,5 a 1,0 mL para exames laboratoriais na UTI.\n' +
      '- Racionalização diagnóstica:\n' +
      '  - Consolidação e agrupamento de coletas sanguíneas em horários pré-definidos.\n' +
      '  - Eliminação de exames repetitivos que não impliquem mudança na conduta clínica imediata.\n' +
      '- Controle rigoroso do volume acumulado:\n' +
      '  - Registro formal em prontuário do volume colhido em pacientes abaixo de 5 kg para não ultrapassar 3% da volemia corporal total.',

    rastreamentoParasitarioEQuimioprofilaxiaVetorial:
      'Controle integrado de ectoparasitas e quimioprofilaxia vetorial:\n' +
      '- Bloqueio contínuo de artrópodes transmissores:\n' +
      '  - Uso sistemático de isoxazolinas orais, coleiras inseticidas e repelentes tópicos contra carrapatos e pulgas.\n' +
      '- Prevenção de infecções hemotrópicas:\n' +
      '  - Interrupção da transmissão de Mycoplasma haemofelis em gatos e Babesia/Ehrlichia em cães.\n' +
      '- Desparasitação entérica periódica:\n' +
      '  - Controle de nematódeos hematófagos intestinais (Ancylostoma e Uncinaria) para prevenir perdas digestivas crônicas e ferropenia.',

    manejoProtetorNaPrescricaoDeAntiInflamatorios:
      'Segurança farmacológica na prescrição de anti-inflamatórios e corticoides:\n' +
      '- Veto formal a associações deletérias:\n' +
      '  - Proibição da prescrição concomitante de dois AINEs distintos ou de AINE associado a corticosteroides em cães e gatos.\n' +
      '- Proteção da barreira mucosal gástrica:\n' +
      '  - Utilização de gastroprotetores criteriosos quando indicado.\n' +
      '- Vigilância domiciliar ativa:\n' +
      '  - Orientar os tutores a monitorar as fezes para detecção precoce de perdas hemorrágicas ocultas (fezes pastosas escurecidas/melena).',

    monitoramentoRenalEIntervencaoPrecoceIRIS:
      'Monitoramento hematológico precoce na Doença Renal Crônica (IRIS):\n' +
      '- Vigilância seriada em pacientes renais:\n' +
      '  - Acompanhamento periódico do hematócrito a cada 3 a 6 meses a partir do estágio IRIS 2.\n' +
      '- Intervenção precoce contra a hipoeritropoietinemia:\n' +
      '  - Detecção oportuna de queda progressiva da massa eritrocitária antes da instalação de choque hipóxico crônico.\n' +
      '- Diretrizes consensuais IRIS 2026:\n' +
      '  - Aplicação de agentes estimuladores da eritropoiese (ESA) e inibidores de HIF-PHI antes da descompensação terminal.',

    cadastroETipagemPreviaDeDoadoresInstitucionais:
      'Manutenção de banco de sangue e doadores tipados institucionais:\n' +
      '- Cadastro prévio de doadores caninos:\n' +
      '  - Animais previamente tipados como DEA 1 negativos para garantir disponibilidade imediata na emergência.\n' +
      '- Triagem e banco de sangue felino:\n' +
      '  - Gatos doadores tipados pelo sistema AB e rastreados contra retroviroses (FeLV/FIV) e hemoplasmas.\n' +
      '- Segurança transfusional de urgência:\n' +
      '  - Disponibilidade de hemocomponentes testados que permitam transfusões rápidas e imunologicamente compatíveis.'
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
