import { DiseaseRecord } from '../../types/disease';

export const obstrucaoFuncionalFluxoUrinarioRecord: DiseaseRecord = {
  id: 'disease-obstrucao-funcional-fluxo-urinario-caes',
  slug: 'obstrucao-funcional-fluxo-urinario-caes',
  title: 'Obstrução Funcional do Fluxo Urinário em Cães (FOO)',
  subtitle: 'Consenso ACVIM 2024, Neurofisiologia da Micção, Diagnóstico de Exclusão Anatômica e Manejo Farmacológico',
  synonyms: [
    'Obstrução funcional do fluxo urinário (FOO)',
    'FOO idiopática canina',
    'Dissinergia reflexa',
    'Dissinergia detrusor-uretral (DUD)',
    'Dissinergia vesicouretral',
    'Functional outflow obstruction',
    'Detrusor urethral dyssynergy',
    'Spastic bladder-sphincter dyssynergia',
  ],
  species: ['dog'],
  category: 'nefrologia-urologia',
  categories: [
    'nefrologia-urologia',
    'urgencia-emergencia',
    'neurologia',
    'clinica-medica',
  ],
  tags: [
    'FOO',
    'Obstrução Funcional',
    'Dissinergia Reflexa',
    'ACVIM 2024',
    'PVRV',
    'Tamsulosina',
    'Prazosina',
    'Diazepam',
    'Betanecol',
    'Cistostomia Percutânea',
    'Greenfield 2025',
    'Picón 2024',
    'Nelson & Couto',
    'Retenção Urinária',
    'Incontinência por Transbordamento',
  ],
  quickSummary:
    'A Obstrução Funcional do Fluxo Urinário (FOO) em cães — historicamente denominada dissinergia reflexa ou dissinergia detrusor-uretral — foi formalmente reclassificada pelo Consenso de Incontinência Urinária do ACVIM 2024 como um distúrbio da fase de esvaziamento caracterizado pelo aumento funcional da resistência uretral na ausência de lesão anatômica obstrutiva mecânica ou afecção neurológica central demonstrável. O distúrbio afeta predominantemente cães machos de raças grandes e meia-idade, exibindo o padrão miccional clássico e patognomônico de início com fluxo relativamente aceitável que rapidamente se afunila, sofre interrupções sucessivas (spurts) e culmina em esforço improdutivo com retenção urinária e elevado volume residual pós-miccional (PVRV > 3 mL/kg). O diagnóstico apoia-se obrigatoriamente na exclusão de causas mecânicas intraluminais ou murais (cálculos, neoplasias, estenoses) e de neuropatias suprassacrais (MNS), ressaltando-se que a passagem facilitada de cateter uretral não descarta estenoses parciais. O manejo terapêutico contemporâneo consiste no bloqueio alfa-1 adrenérgico (tamsulosina ou prazosina) para reduzir o tônus da musculatura lisa uretral, associação criteriosa de relaxantes de músculo estriado (diazepam) para o esfíncter externo, proteção mecânica do detrusor contra atonia por superdistensão crônica e contraindicação formal e absoluta ao uso de betanecol enquanto a resistência uretral de saída não estiver adequadamente reduzida.',

  quickSummaryRich: {
    lead:
      'A Obstrução Funcional do Fluxo Urinário (FOO) em cães é a falha involuntária no relaxamento da uretra durante a contração ativa do detrusor, gerando jato urinário interrompido e retenção patológica. Em 2024, o consenso ACVIM estabelece o termo FOO idiopática em substituição à nomenclatura histórica dissinergia reflexa para cães sem lesão neurológica central identificável.',
    leadHighlights: [
      'FOO idiopática (ACVIM 2024)',
      'dissinergia reflexa termo histórico',
      'PVRV > 3 mL/kg patológico',
      'tamsulosina + diazepam',
      'veto formal ao betanecol precoce',
    ],
    pillars: [
      {
        title: 'Virada Terminológica do Consenso ACVIM 2024',
        body:
          'O termo dissinergia reflexa implica estritamente doença do sistema nervoso central na medicina comparada e sua comprovação definitiva exige estudos urodinâmicos complexos. O ACVIM 2024 preconiza a designação Functional Outflow Obstruction (FOO), preferencialmente FOO idiopática quando causas mecânicas e neurológicas foram descartadas.',
        highlights: ['Kendall et al., 2024', 'FOO idiopática', 'dissinergia neurogênica secundária'],
      },
      {
        title: 'Assinatura Miccional e PVRV > 3 mL/kg',
        body:
          'O paciente inicia a micção com jato de calibre aceitável por gradiente pressórico inicial, mas rapidamente o fluxo afunila, interrompe-se em jatos esparsos (spurts) e progride para esforço improdutivo. O volume residual pós-miccional (PVRV) acima de 3 mL/kg confirma retenção urinária patológica.',
        highlights: ['jato inicial bom seguido de spurts', 'PVRV > 3 mL/kg', 'retenção patológica'],
      },
      {
        title: 'Diagnóstico de Exclusão Anatômica e Neurológica',
        body:
          'FOO é um diagnóstico essencialmente funcional de exclusão. A passagem desimpedida de sonda uretral NÃO descarta estenoses ou massas parciais. Cistouretrografia retrógrada positiva ou uretrocistoscopia são fundamentais, somadas a exame neurológico seriado para afastar lesão medular suprassacral.',
        highlights: ['sonda passar não descarta lesão parcial', 'cistouretrografia retrógrada', 'neurocheck seriado'],
      },
      {
        title: 'Farmacoterapia Direcionada e Proteção do Detrusor',
        body:
          'Redução da resistência de saída com alfa-1 antagonista (tamsulosina ou prazosina) associado a relaxante do esfíncter estriado (diazepam). O betanecol é formalmente contraindicado enquanto a uretra permanecer hipertônica. A descompressão vesical precoce previne atonia miogênica irreversível por superdistensão.',
        highlights: ['tamsulosina primeira linha', 'diazepam esfíncter externo', 'veto ao betanecol precoce'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial da FOO Canina (ACVIM 2024)',
      steps: [
        {
          label: 'Avaliação do Padrão Miccional e Palpação',
          detail:
            'Obtenção de vídeo domiciliar da micção registrado pelo tutor; observação beira-leito do padrão de fluxo (jato inicial normal que afunila e vira spurts); palpação vesical pré e pós-micção (bexiga grande, firme e de difícil expressão); palpação retal prostática e da uretra peniana no os penis.',
        },
        {
          label: 'Quantificação do Volume Residual Pós-Miccional (PVRV)',
          detail:
            'Aferição ultrassonográfica 2D não invasiva do volume vesical em até 10 minutos após a micção voluntária (Volume = comprimento x largura x altura x 0,52). Normal: 0,2 a 1,0 mL/kg; Zona cinzenta: 1,0 a 3,0 mL/kg; Retenção urinária patológica: > 3,0 mL/kg.',
        },
        {
          label: 'Exclusão Rigorosa de Obstruções Mecânicas',
          detail:
            'Radiografia simples pélvica/abdominal para urólitos radiopacos; ultrassonografia abdominal de rins, bexiga e próstata; cistouretrografia retrógrada positiva com contraste iodado hidrossolúvel ou uretrocistoscopia direta para excluir estenoses, carcinoma urotelial e uretrite proliferativa.',
        },
        {
          label: 'Rastreio Neurológico Completo e Urodinâmica',
          detail:
            'Exame neurológico detalhado de marcha, propriocepção, reflexo perineal, tônus anal e sensibilidade dolorosa espinhal para afastar lesão medular suprassacral (MNS). Estudo urodinâmico (perfil de pressão uretral / UPP) reservado primariamente para casos refratários devido à interferência anestésica.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico Escalonado da FOO Canina',
      steps: [
        {
          label: 'Descompressão Vesical Emergencial',
          detail:
            'Avaliação de eletrólitos (risco de hipercalemia e azotemia pós-renal em retenção total). Esvaziamento vesical imediato via cateterização uretral intermitente suave ou cistocentese descompressiva com agulha fina para aliviar tensão nos sarcômeros e prevenir atonia.',
        },
        {
          label: 'Bloqueio Alfa-1 Adrenérgico de Musculatura Lisa',
          detail:
            'Iniciar alfa-1 antagonista de primeira linha: Tamsulosina (0,4 a 0,8 mg/cão PO q24h) ou Prazosina (0,5 a 3,0 mg/cão PO q8-12h). Monitorar pressão arterial sistêmica para prevenir hipotensão.',
        },
        {
          label: 'Relaxamento de Esfíncter Estriado Adjuvante',
          detail:
            'Se a resposta ao alfa-bloqueador isolado for incompleta ou houver forte componente de esfíncter externo, associar Diazepam (0,04 a 0,8 mg/kg/dia dividido q8-12h), administrado preferencialmente 30 minutos antes do passeio ou tentativa de micção.',
        },
        {
          label: 'Aferição Seriada da Eficácia e do PVRV',
          detail:
            'Reavaliar qualidade do jato urinário e medir PVRV seriadomente em 7 a 14 dias. A meta clínica é obter fluxo contínuo e PVRV < 1,0 a 1,5 mL/kg sem episódios de incontinência por transbordamento.',
        },
        {
          label: 'Manejo de Casos Refratários e Salvamento',
          detail:
            'Se o cão mantiver retenção severa apesar da dose plena combinada por 7 a 14 dias: colocação de tubo de cistostomia percutânea locking-loop pigtail como ponte terapêutica (Greenfield et al., 2025) ou realização de uretrostomia perineal de salvamento (Picón et al., 2024).',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      title: 'Tabela de Decisão Clínica Rápida — Diferenciação de Padrões Miccionais e Retenção',
      columns: ['Parâmetro Clínico', 'Cão Normal', 'FOO Idiopática Canina', 'Obstrução Mecânica Uretral', 'Bexiga Neurogênica (MNS)'],
      rows: [
        [
          'Padrão do Jato Urinário',
          'Fluxo contínuo, vigoroso, sustentado até esvaziamento completo',
          'Início com jato normal que rapidamente afunila e vira jatos interrompidos (spurts)',
          'Jato persistentemente fino, gotejamento contínuo ou anúria súbita desde o início',
          'Jato interrompido por espasmo esfinctérico sem controle voluntário de micção',
        ],
        [
          'Volume Residual Pós-Miccional (PVRV)',
          '0,2 a 1,0 mL/kg (bexiga vazia ou quase indetectável)',
          '> 3,0 mL/kg (retenção crônica volumosa documentada)',
          '> 3,0 mL/kg a extremamente aumentado até alívio físico',
          '> 3,0 mL/kg com bexiga persistentemente distendida',
        ],
        [
          'Palpação Vesical e Expressão Manual',
          'Bexiga flácida e pequena; fácil expressão manual sob relaxamento',
          'Bexiga volumosa, tensa e de difícil expressão manual contra uretra fechada',
          'Bexiga extremamente distendida, túrgida e dolorosa; IMPOSSÍVEL expressar',
          'Bexiga distendida, túrgida; esfíncter hipertônico com difícil expressão',
        ],
        [
          'Passagem de Cateter Uretral',
          'Passa facilmente sem resistência',
          'Passa facilmente na grande maioria dos casos (resistência é funcional)',
          'Encontra obstrução mecânica intransponível (cálculo) ou atrito rugoso/estenótico',
          'Passa facilmente pela uretra até a bexiga',
        ],
        [
          'Exame Neurológico',
          'Completamente normal',
          'Completamente normal (definição obrigatória de FOO idiopática)',
          'Completamente normal',
          'Déficits motores/proprioceptivos em membros pélvicos, reflexos espinhais anormais',
        ],
        [
          'Conduta Terapêutica Primária',
          'Nenhuma intervenção necessária',
          'Alfa-1 bloqueador (tamsulosina/prazosina) + diazepam + descompressão',
          'Desobstrução mecânica imediata (hidropropulsão, cistotomia, cirurgia)',
          'Tratamento da mielopatia de base (cirurgia descompressiva, fisioterapia)',
        ],
      ],
    },
  },

  quickDecisionStrip: [
    'Padrão miccional patognomônico: jato inicial normal que afunila, fragmenta em spurts e termina em esforço com bexiga cheia.',
    'Volume residual pós-miccional: PVRV > 3,0 mL/kg indica retenção patológica segundo o Consenso ACVIM 2024 (normal 0,2–1,0 mL/kg).',
    'Diagnóstico de exclusão: excluir urólito, neoplasia e estenose; cateter passar NÃO exclui lesão mecânica parcial.',
    'Tratamento de 1ª linha: Tamsulosina 0,4–0,8 mg/cão PO q24h ou Prazosina ± Diazepam 30 min pré-micção para tônus estriado.',
    'Veto absoluto ao Betanecol precoce: proscrito enquanto a uretra mantiver resistência elevada; risco de ruptura vesical e refluxo.',
  ],

  etiology: {
    explicacaoDidaticaPortaAutomatica:
      'Para compreender a fisiopatologia da Obstrução Funcional do Fluxo Urinário (FOO), utiliza-se a analogia didática da porta automática conectada a uma bomba centrífuga: na micção saudável, no momento exato em que a bomba (músculo detrusor vesical) começa a empurrar o fluido, a porta automática (lúmen e esfíncteres uretrais) abre-se completamente e permanece aberta até o esgotamento do reservatório. Na FOO canina, ocorre uma falha na automação neuromuscular: a bexiga contrai com força normal ou aumentada, mas a porta uretral abre apenas parcialmente ou volta a se fechar no meio do ciclo miccional enquanto o detrusor ainda está empurrando. Em consequência, o cão inicia a micção com um jato razoável porque a pressão vesical acumulada vence a resistência de saída inicial; contudo, à medida que o volume vesical diminui ligeiramente e a resistência uretral permanece patologicamente elevada ou aumenta, o fluxo enfraquece bruscamente, afunila, fragmenta-se em pequenos jatos e cessa antes que a bexiga esteja vazia.',
    atualizacaoTerminologicaAcvim2024:
      'A medicina veterinária vivenciou em 2024 uma profunda reformulação taxonômica formalizada pelo Consenso ACVIM sobre Incontinência Urinária e Distúrbios Miccionais em Cães (Kendall et al., 2024). Historicamente, a literatura e materiais de referência como o VIN utilizavam o termo "dissinergia reflexa" (reflex dyssynergia) ou "dissinergia detrusor-uretral" (DUD). Todavia, na medicina humana e na neuro-urologia comparada, o termo dissinergia detrusor-esfíncter (DSD) implica expressamente uma lesão neurológica anatômica do sistema nervoso central suprassacral (como trauma raquimedular toracolombar ou doença desmielinizante) e requer documentação simultânea por eletromiografia esfinctérica e cistometria urodinâmica formal. Como a vasta maioria dos cães atendidos na clínica médica não possui lesão neurológica central detectável, o Consenso ACVIM recomenda abandonar o termo dissinergia reflexa e adotar formalmente Functional Outflow Obstruction (FOO), preferencialmente FOO idiopática quando obstruções mecânicas e neuropatias identificáveis tiverem sido rigorosamente excluídas, estabelecendo a afecção como um autêntico diagnóstico de exclusão.',
    neuroanatomiaControleMiccao:
      'O controle neurológico da micção canina é orquestrado pela integração precisa entre três vias neurais distintas descritas detalhadamente no tratado de Nelson & Couto (6ª ed., Cap. 45) e no Consenso ACVIM 2024: 1. Nervo Hipogástrico (Sistema Nervoso Simpático, raízes L1-L4): responsável primordial pela fase de ARMAZENAMENTO urinário. Libera noradrenalina que atua em receptores beta-3 adrenérgicos no corpo vesical (promovendo relaxamento da musculatura lisa do detrusor para permitir o enchimento sem elevação da pressão intravesical) e em receptores alfa-1 adrenérgicos no trígono, colo vesical e uretra proximal (promovendo contração tônica da musculatura lisa uretral para manter a saída fechada); 2. Nervo Pélvico (Sistema Nervoso Parassimpático, raízes S1-S3): responsável pela fase de ESVAZIAMENTO. Fibras aferentes mecânicas A-delta sinalizam a repleção vesical ao centro pontino da micção (região M do tronco encefálico); o centro pontino dispara eferências sacrais colinérgicas que liberam acetilcolina em receptores muscarínicos M3 no detrusor, provocando contração vigorosa e sustentada da bexiga; 3. Nervo Pudendo (Sistema Nervoso Somático, raízes S1-S3 / núcleo motor de Onuf): controla a musculatura estriada esquelética do esfíncter uretral externo através de receptores colinérgicos nicotínicos, mantendo continência voluntária durante o armazenamento e relaxando de forma coordenada durante a micção normal.',
    tabelaComparativaInervacaoMiccao: {
      title: 'Tabela 1 — Inervação Autonômica e Somática das Fases de Armazenamento e Esvaziamento Canino',
      columns: ['Componente Neural', 'Origem Medular', 'Divisão do SNA', 'Neurotransmissor e Receptores', 'Ação no Armazenamento', 'Ação no Esvaziamento (Micção)'],
      rows: [
        [
          'Nervo Hipogástrico',
          'Segmentos L1 a L4',
          'Simpático',
          'Noradrenalina em receptores beta-3 (detrusor) e alfa-1A (uretra lisa)',
          'ATIVO: relaxa o músculo detrusor e contrai a musculatura lisa uretral',
          'INIBIDO: cessa o tônus alfa-1 para permitir queda da resistência uretral lisa',
        ],
        [
          'Nervo Pélvico',
          'Segmentos S1 a S3',
          'Parassimpático',
          'Acetilcolina em receptores muscarínicos M3 (detrusor)',
          'INIBIDO: mantém o detrusor em repouso elástico sem contrações involuntárias',
          'ATIVO: dispara contração muscular coordenada e vigorosa de todo o detrusor',
        ],
        [
          'Nervo Pudendo',
          'Segmentos S1 a S3 (Núcleo de Onuf)',
          'Somático',
          'Acetilcolina em receptores nicotínicos (esfíncter estriado)',
          'ATIVO: contrai o esfíncter uretral externo de músculo esquelético',
          'INIBIDO: relaxa voluntariamente o esfíncter estriado para passagem livre da urina',
        ],
      ],
    },
    etiologiaIdiopaticaEHipoteses:
      'A etiologia exata da FOO canina permanece classificada cientificamente como idiopática. Várias hipóteses fisiopatológicas foram formuladas na literatura contemporânea (Mathews et al., 2023; Stilwell et al., 2021): A. Hipótese Neural Central/Periférica: sugere-se uma falha dos tratos inibitórios reticuloespinais descendentes ou hiperexcitabilidade dos motoneurônios do núcleo de Onuf e do gânglio mesentérico caudal, impedindo a supressão adequada dos nervos pudendo e hipogástrico durante a fase miccional; B. Hipótese Miogênica e Receptorial: desbalanço local na densidade ou responsividade dos receptores alfa-1 adrenérgicos uretrais, produzindo hipertonia autônoma de músculo liso mesmo sem estímulo neural excessivo; C. Hipótese Hormonal Masculina: a expressiva predominância de cães machos gerou suspeitas sobre o papel da conformação uretral masculina e andrógenos, porém a vasta maioria dos pacientes afetados em séries modernas (77% no estudo de Mathews) é composta por machos castrados, afastando a testosterona como causa única.',
    epidemiologiaPerfilPredisposicao:
      'A FOO canina é uma afecção incomum, mas de reconhecimento crescente na rotina urológica especializada. As séries de casos mais robustas publicadas até o momento traçam um perfil clínico nítido: no estudo multicêntrico de Stilwell et al. (2021, 35 cães), a idade mediana na apresentação foi de 6 anos (intervalo de 1 a 12 anos), com 88,6% de machos (sendo a quase totalidade machos castrados) e representação predominante de raças grandes e gigantes, com destaque para Labrador Retriever (22,9%), Golden Retriever (14,3%) e cães sem raça definida de grande porte (14,3%). No estudo de Mathews et al. (2023, 31 cães), 77% eram machos castrados, 16% machos inteiros e apenas 6% fêmeas, com Labrador, Golden Retriever e Pastor Alemão fortemente sobrerrepresentados em relação à população hospitalar basal.',
    diferenciacaoCriticaCaesVsGatos:
      'É um erro clínico grave tentar extrapolar a entidade FOO idiopática canina para a espécie felina. Na medicina de felinos, a síndrome idiopática crônica primária com esse fenótipo é extraordinariamente rara. O gato macho que apresenta dificuldade miccional ou estrangúria quase invariavelmente sofre de Doença do Trato Urinário Inferior Felino (FLUTD / FIC), espasmo uretral pós-desobstrução mecânica recente por plug uretral/urólito, edema inflamatório transmural ou atonia vesical secundária à superdistensão prévia. Tratar um gato pós-obstrução como se fosse um cão com FOO idiopática — inclusive prescrevendo prazosina de rotina — é contraindicado pelas diretrizes recentes (Plumb 10ª ed.), que apontam ausência de benefício em ensaios clínicos randomizados e risco aumentado de reobstrução e hipotensão em felinos.',
    tabelaComparativaCaesVsGatosFoo: {
      title: 'Tabela 2 — Diferenciação Clínica: FOO Canina Idiopática versus Espasmo Pós-Obstrutivo Felino',
      columns: ['Característica Clínica', '🐶 Cães (FOO Idiopática Canina)', '🐱 Gatos (Espasmo Uretral Pós-Obstrutivo / FIC)'],
      rows: [
        [
          'Entidade Patológica Primária',
          'FOO idiopática verdadeira: distúrbio funcional primário crônico da resistência uretral',
          'Quadro secundário a tampão mucoide, urólitos, cateterismo traumático ou cistite idiopática',
        ],
        [
          'Perfil do Paciente',
          'Machos castrados de raças grandes e gigantes, meia-idade (Labrador, Golden, Pastor)',
          'Gatos machos jovens a meia-idade, qualquer raça (frequente em DSH/DLH), estresse ambiental',
        ],
        [
          'Padrão Miccional',
          'Jato inicial aceitável que afunila bruscamente e se fragmenta em jatos curtos e gotas',
          'Estrangúria aguda, vocalização, periúria em locais incomuns, postura sem saída de urina',
        ],
        [
          'Base de Evidências',
          'Séries de 31 a 35 casos específicos e diretrizes de consenso ACVIM 2024',
          'Literatura focada em UO felina/FIC; FOO idiopática análoga não é validada em gatos',
        ],
        [
          'Bloqueio Alfa-1 Adrenérgico',
          'Terapia de primeira linha recomendada pelo ACVIM (Tamsulosina ou Prazosina)',
          'Prazosina controversa: ensaios placebo-controlados não demonstraram benefício consistente',
        ],
        [
          'Histórico Prévio Típico',
          'Semanas a meses de micção prolongada, múltiplas posturas e incontinência por transbordamento',
          'Episódio agudo de obstrução uretral desobstruído nas últimas 24 a 72 horas com cateter de demora',
        ],
      ],
    },
    figuraCistostomiaPercutaneaPigtail: {
      title: 'Figura 1 — Radiografia de Cateter de Cistostomia Locking-Loop Pigtail na Bexiga Canina',
      description:
        'Exame radiográfico lateral demonstrando posicionamento intravesical de cateter percutâneo tipo pigtail com trava (locking-loop), permitindo descompressão vesical contínua e preservação do detrusor (Frontiers in Veterinary Science, CC BY 4.0).',
      url: '/consulta-vet/obstrucao-funcional-fluxo-urinario-caes/cistostomia-percutanea-pigtail-radiografia.webp',
      aspectRatio: '16:9',
    },
    figuraCistouretrografiaRetrograda: {
      title: 'Figura 2 — Cistouretrografia Retrógrada sob Fluoroscopia',
      description:
        'Cistouretrograma retrógrado com contraste iodado hidrossolúvel demonstrando patência intraluminal uretral completa e ausência de cálculos, massas ou estenoses mecânicas anatômicas, confirmando natureza funcional da obstrução (Frontiers in Veterinary Science, CC BY 4.0).',
      url: '/consulta-vet/obstrucao-funcional-fluxo-urinario-caes/cistouretrografia-retrograda-fluoroscopia.webp',
      aspectRatio: '16:9',
    },
    figuraPosicionamentoFluoroscopia: {
      title: 'Figura 3 — Guiamento Fluoroscópico para Derivação Urinária e Cateterismo Vesical',
      description:
        'Imagem fluoroscópica em tempo real ilustrando a progressão de fio-guia e cateterismo para alívio de retenção urinária e controle do detrusor em cão com distúrbio de esvaziamento (Frontiers in Veterinary Science, CC BY 4.0).',
      url: '/consulta-vet/obstrucao-funcional-fluxo-urinario-caes/posicionamento-cateter-cistostomia-fluoroscopia.webp',
      aspectRatio: '16:9',
    },
    figuraAnatomiaTratoUrinarioCateter: {
      title: 'Figura 4 — Anatomia Contrastada do Colo Vesical e Uretra Peniana Canina',
      description:
        'Estudo anatômico radiográfico contrastado do trato urinário inferior de cão macho, evidenciando o trajeto desde o colo vesical trigonal, uretra prostática, membranosa e peniana até o os penis (Frontiers in Veterinary Science, CC BY 4.0).',
      url: '/consulta-vet/obstrucao-funcional-fluxo-urinario-caes/anatomia-trato-urinario-cateter-bexiga.webp',
      aspectRatio: '16:9',
    },
  },

  epidemiology: {
    epidemiologiaPerfilPredisposicao:
      'A FOO canina é uma afecção incomum, mas de reconhecimento crescente na rotina urológica especializada. As séries de casos mais robustas publicadas até o momento traçam um perfil clínico nítido: no estudo multicêntrico de Stilwell et al. (2021, 35 cães), a idade mediana na apresentação foi de 6 anos (intervalo de 1 a 12 anos), com 88,6% de machos (sendo a quase totalidade machos castrados) e representação predominante de raças grandes e gigantes, com destaque para Labrador Retriever (22,9%), Golden Retriever (14,3%) e cães sem raça definida de grande porte (14,3%). No estudo de Mathews et al. (2023, 31 cães), 77% eram machos castrados, 16% machos inteiros e apenas 6% fêmeas, com Labrador, Golden Retriever e Pastor Alemão fortemente sobrerrepresentados em relação à população hospitalar basal.',
    diferenciacaoCriticaCaesVsGatos:
      'É um erro clínico grave tentar extrapolar a entidade FOO idiopática canina para a espécie felina. Na medicina de felinos, a síndrome idiopática crônica primária com esse fenótipo é extraordinariamente rara. O gato macho que apresenta dificuldade miccional ou estrangúria quase invariavelmente sofre de Doença do Trato Urinário Inferior Felino (FLUTD / FIC), espasmo uretral pós-desobstrução mecânica recente por plug uretral/urólito, edema inflamatório transmural ou atonia vesical secundária à superdistensão prévia. Tratar um gato pós-obstrução como se fosse um cão com FOO idiopática — inclusive prescrevendo prazosina de rotina — é contraindicado pelas diretrizes recentes (Plumb 10ª ed.), que apontam ausência de benefício em ensaios clínicos randomizados e risco aumentado de reobstrução e hipotensão em felinos.',
  },

  pathogenesisTransmission: {
    transmissaoInfecciosaInexistente:
      'A obstrução funcional do fluxo urinário (FOO) em cães não possui caráter transmissível ou infeccioso. Trata-se de uma desordem exclusivamente neuromuscular e funcional do tônus uretral e da coordenação miccional. Não há envolvimento de agentes bacterianos, virais ou parasitários na etiologia primária da síndrome funcional.',
    patogeneseDescoordenacaoVesicoesfincterica:
      'A patogênese primária fundamenta-se na falha funcional de abertura ou no fechamento precoce e inadequado do canal uretral enquanto o músculo detrusor vesical mantém contração ativa gerada pelo influxo parassimpático sacral (nervo pélvico). A persistência de tônus simpático alfa-1 no colo vesical (nervo hipogástrico) ou hiperatividade somática no esfíncter uretral estriado (nervo pudendo) gera resistência hidrostática superior à pressão propulsiva vesical, precipitando retenção progressiva.',
  },

  pathophysiology: {
    mecanismoFisiopatologicoResistenciaUretral:
      'Na micção normal, o disparo do reflexo parassimpático sacral é acompanhado da inibição recíproca dos centros simpático (L1-L4) e somático (núcleo de Onuf, S1-S3), promovendo abertura luminal livre. Na FOO, a falha inibitória impede a queda da resistência uretral, transformando a tentativa de micção em um padrão característico de ejeção inicial com rápido afunilamento em spurts intermitentes e gotas.',
    cascataDeSuperdistensaoEAtonia:
      'A incapacidade de esvaziar a bexiga eleva o volume residual pós-miccional (PVRV > 3,0 mL/kg). A superdistensão vesical crônica promove estiramento excessivo das miofibrilas do detrusor com perda das pontes cruzadas de actina-miosina, isquemia capilar intramural por compressão hidrostática e progressão silenciosa para atonia vesical arrefléxica e incontinência por transbordamento (overflow).',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'urinary',
      title: 'Achados do Trato Urinário Inferior e Padrão Miccional',
      findings: [
        {
          name: 'Jato inicial normal seguido de interrupção em spurts',
          frequency: 'cardinal',
          description:
            'A assinatura fisiológica da FOO canina: o cão assume a postura miccional normal, inicia a micção com um jato de calibre razoável gerado pela pressão intravesical acumulada e relaxamento parcial momentâneo; contudo, após 2 a 5 segundos, o fluxo afunila bruscamente, transforma-se em jatos finos e intermitentes (spurts) e progride para gotejamento improdutivo com esforço sustentado.',
        },
        {
          name: 'Strangúria funcional e micção prolongada',
          frequency: 'common',
          description:
            'O cão permanece na postura de micção por períodos prolongados (muitas vezes vários minutos) realizando esforços abdominais intensos na tentativa involuntária de forçar o esvaziamento contra a alta resistência uretral, assumindo múltiplas posturas sucessivas durante o mesmo passeio.',
        },
        {
          name: 'Bexiga volumosa, tensa e de difícil expressão manual',
          frequency: 'common',
          description:
            'À palpação abdominal beira-leito, a bexiga apresenta-se moderada a acentuadamente distendida e firme mesmo imediatamente após o cão ter tentado urinar. A tentativa de expressão manual é infrutífera ou requer pressões perigosamente elevadas devido ao tônus uretral fechado.',
        },
        {
          name: 'Incontinência urinária por transbordamento (overflow)',
          frequency: 'common',
          description:
            'Ocorre escape involuntário de urina em repouso ou ao caminhar (dripping). Esse fenômeno não decorre de incompetência esfinctérica (USMI), mas sim da pressão intravesical que sobe progressivamente com a superdistensão até superar mecanicamente a resistência uretral estática, provocando vazamento episódico.',
        },
        {
          name: 'Atonia miogênica detrusora secundária',
          frequency: 'frequent',
          description:
            'A retenção crônica e a superdistensão vesical prolongada geram estiramento excessivo das miofibrilas do detrusor além de seu comprimento ótimo de sobreposição actina-miosina, rompendo junções comunicantes intercelulares e provocando perda da contratilidade e atonia miogênica secundária.',
        },
      ],
    },
    {
      system: 'systemic',
      title: 'Repercussões Sistêmicas e Metabólicas Obstrutivas',
      findings: [
        {
          name: 'Azotemia pós-renal e hipercalemia emergencial',
          frequency: 'rare',
          description:
            'Em episódios de retenção funcional quase total ou prolongada, a elevação da pressão hidrostática intravesical retrocede pelos ureteres aos rins, colapsando a taxa de filtração glomerular (TFG) e desencadeando azotemia pós-renal com retenção de potássio, acidose metabólica e risco iminente de arritmias cardíacas fatais.',
        },
        {
          name: 'Cistite inflamatória e estase urinária',
          frequency: 'common',
          description:
            'A permanência de grande volume residual pós-miccional abole o efeito mecânico de lavagem bacteriana (flushing), predispondo à proliferação bacteriana secundária, hematúria microscópica e piúria inflamatória mesmo na ausência de infecção ativa verdadeira.',
        },
      ],
    },
    {
      system: 'neurologic',
      title: 'Avaliação Neurológica e Diferencial de MNS',
      findings: [
        {
          name: 'Exame neurológico geral estritamente normal',
          frequency: 'cardinal',
          description:
            'Por definição do Consenso ACVIM 2024, a FOO idiopática ocorre em cães com locomoção normal, ausência de déficits proprioceptivos, reflexos segmentares patelares e tibiais normais, reflexo perineal e tônus esfinctérico anal íntegros e ausência de dor espinhal toracolombar ou lombossacra.',
        },
      ],
    },
  ],

  diagnosis: {
    avaliacaoPadraoMiccionalEPalpacao:
      'A observação direta do paciente urinando é indispensável. O clínico deve solicitar ao tutor vídeos domiciliares em ambiente não estressante. Avalia-se o tempo de latência até o início do jato, o calibre inicial, a ocorrência de afunilamento (tapering), interrupções em jatos curtos e a quantidade de posturas. Realiza-se palpação vesical bimanual pré e pós-micção, exame retal digital para avaliar simetria e consistência da próstata e palpação do trajeto uretral peniano até a base do os penis.',
    afericaoPvrvUltrassom:
      'O PVRV é o parâmetro quantitativo central para documentar distúrbio de esvaziamento. A técnica de escolha preconizada pelo Consenso ACVIM 2024 é a ultrassonografia 2D realizada dentro de 10 minutos após a micção espontânea (calculando o volume elipsoide: comprimento x largura x altura x 0,52 em centímetros, equivalente a mL de urina). O volume é dividido pelo peso corporal em kg. Normal: 0,2 a 1,0 mL/kg; Zona cinzenta: 1,0 a 3,0 mL/kg; Retenção patológica: > 3,0 mL/kg. Deve-se permitir ao cão macho tempo hábil para marcar território múltiplas vezes antes de aferir o resíduo final.',
    exclusaoObstrucoesMecanicasCistouretrografia:
      'Como a FOO é uma afecção funcional, a confirmação diagnóstica exige afastar com segurança qualquer obstrução anatômica mecânica. A passagem desimpedida de sonda uretral flexível NÃO descarta estenoses parciais, massas murais ou uretrite proliferativa. Os métodos confirmatórios padrão ouro são a Cistouretrografia Retrógrada com contraste iodado hidrossolúvel sob fluoroscopia/radiografia seriada (BSAVA Procedures 3ª ed.) ou a Uretrocistoscopia endoscópica direta, que atestam a integridade e patência do lúmen uretral.',
    exameNeurologicoEUrodinamica:
      'Avaliação neurológica minuciosa dos membros pélvicos, reflexos espinhais e tônus perineal para diferenciar FOO idiopática de bexiga de neurônio motor superior (MNS). O estudo urodinâmico formal (perfil de pressão uretral / UPP e cistometrograma) não é obrigatório na rotina inicial conforme o ACVIM 2024 devido à interferência da anestesia sobre a pressão de oclusão uretral, ficando reservado para casos refratários ou centros terciários especializados.',
    tabelaTestesDiagnosticosComparados: {
      title: 'Tabela 3 — Matriz de Utilidade e Limitações dos Testes Diagnósticos na FOO Canina',
      columns: ['Modalidade Diagnóstica', 'Achado Típico Esperado', 'Utilidade Clínica Central', 'Limitações e Armadilhas'],
      rows: [
        [
          'Vídeo / Observação da Micção',
          'Jato inicial normal que rapidamente se afunila e vira jatos intermitentes e gotas',
          'Identifica a assinatura patognomônica da falha de relaxamento uretral',
          'Subjetivo; exige cooperação do cão e registro em passeio sem estresse',
        ],
        [
          'PVRV por Ultrassonografia 2D',
          'Volume residual > 3,0 mL/kg pós-micção voluntária em cão relaxado',
          'Confirmação quantitativa objetiva de retenção urinária sem invasividade',
          'Fórmula elipsoide tem margem de erro geométrica; cateterismo invasivo tem risco de ITU',
        ],
        [
          'Palpação Vesical Pós-Micção',
          'Bexiga moderada a grandemente distendida e firme; difícil expressão manual',
          'Triagem física rápida de retenção urinária beira-leito',
          'Difícil palpação em cães obesos, com dor abdominal aguda ou parede muito tensa',
        ],
        [
          'Passagem de Cateter Uretral',
          'Passa facilmente sem resistência mecânica até a cavidade vesical',
          'Alívio descompressivo e diferenciação inicial de cálculos obstrutivos impactados',
          'PASSAGEM NÃO EXCLUI estenose parcial, massa não oclusiva ou compressão extramural',
        ],
        [
          'Radiografia Simples',
          'Bexiga volumosa; ausência de cálculos radiopacos em uretra ou bexiga',
          'Exclusão de litíase radiopaca e megabexiga estrutural',
          'Uretra com obstrução funcional apresenta radiografia simples perfeitamente normal',
        ],
        [
          'Cistouretrografia Retrógrada',
          'Coluna de contraste contínua sem estenoses, defeitos de enchimento ou divertículos',
          'Padrão ouro radiológico para exclusão de lesão anatômica intraluminal/mural',
          'Técnica-dependente; requer sedação/anestesia e infusão sob pressão suave de contraste',
        ],
        [
          'Uretrocistoscopia',
          'Mucosa uretral anatomicamente íntegra sem pólipos, tumores ou septos estenóticos',
          'Visualização direta da mucosa e oportunidade de biópsia se houver suspeita',
          'Exige anestesia geral, equipamento endoscópico delicado e equipe especializada',
        ],
        [
          'Exame Neurológico Focado',
          'Marcha, propriocepção, reflexo perineal e sensibilidade sem déficits',
          'Obrigatório para definir FOO idiopática e afastar bexiga neurogênica de MNS',
          'Déficits neurológicos sutis podem passar despercebidos no atendimento inicial',
        ],
      ],
    },
    tabelaDiagnosticoDiferencialObstrutivo: {
      title: 'Tabela 4 — Diagnóstico Diferencial das Síndromes Obstrutivas do Trato Urinário Inferior',
      columns: ['Condição Clínica', 'Mecanismo Fisiopatológico', 'Achado Distintivo', 'Exame Mais Discriminativo'],
      rows: [
        [
          'Uretrólito Impactado',
          'Obstrução mecânica física intraluminal por cálculo urinário',
          'Súbito bloqueio com resistência mecânica intransponível à passagem de cateter',
          'Radiografia simples / contrastada ou ultrassonografia peniana',
        ],
        [
          'Estenose Uretral Cicatricial',
          'Estreitamento luminal fibrótico por trauma, cateterismo prévio ou cirurgia',
          'Jato persistentemente fino desde o início da micção; atrito à passagem de sonda',
          'Cistouretrografia retrógrada positiva demonstrando afunilamento focal fixo',
        ],
        [
          'Carcinoma Urotelial (TCC)',
          'Neoplasia infiltrativa no colo vesical, trígono ou uretra prostática',
          'Idade avançada, hematúria persistente, espessamento irregular de parede',
          'Ultrassom com Doppler, teste BRAF na urina ou uretrocistoscopia com biópsia',
        ],
        [
          'Afecções Prostáticas (HBP/Cisto)',
          'Compressão extramural da uretra prostática por prostatomegalia em machos',
          'Toque retal com próstata aumentada, assimetria, prostatite dolorosa',
          'Toque retal digital, ultrassonografia prostática e resposta à orquiectomia',
        ],
        [
          'Bexiga Neurogênica (MNS)',
          'Perda da inibição supraespinhal por lesão medular toracolombar (L1-S1)',
          'Presença de paraparesia, ataxia, propriocepção ausente e hiper-reflexia patelar',
          'Exame neurológico detalhado e ressonância magnética da coluna vertebral',
        ],
        [
          'Incompetência Esfinctérica (USMI)',
          'Fraqueza do esfíncter uretral interno com vazamento durante repouso',
          'Micção voluntária com fluxo normal; PVRV normal (< 1,0 mL/kg); cães fêmeas',
          'História de vazamento dormindo com bexiga vazia e PVRV rigorosamente normal',
        ],
      ],
    },
  },

  treatment: {
    pilaresTerapeuticosConsensuaisFoo:
      'A abordagem terapêutica da FOO canina estrutura-se em quatro pilares fundamentais e interdependentes: 1. Redução da Resistência Muscular Lisa Uretral: bloqueio competitivo dos receptores alfa-1 adrenérgicos no colo vesical e uretra proximal com tamsulosina ou prazosina; 2. Redução do Tônus do Esfíncter Uretral Estriado: relaxamento do músculo esquelético do esfíncter externo com benzodiazepínicos (diazepam) quando há componente somático ou resposta parcial ao alfa-bloqueador isolado; 3. Proteção Ativa Contra Superdistensão e Atonia Vesical: esvaziamento mecânico regular da bexiga (cateterização intermitente ou derivação por tubo de cistostomia) para manter o detrusor descomprometido enquanto os fármacos atingem concentração de equilíbrio; 4. Estimulação Seletiva da Contratilidade: uso restrito de parassimpatomiméticos (betanecol) apenas se houver atonia detrusora residual comprovada e APÓS a redução inequívoca da resistência uretral de saída.',
    alfa1BloqueadoresTamsulosinaVsPrazosina:
      'Os antagonistas alfa-1 adrenérgicos constituem a espinha dorsal do tratamento da FOO canina. O Consenso ACVIM 2024 relata preferência de especialistas pela TAMSULOSINA devido à sua maior seletividade uroespecífica pelos subtipos de receptores alfa-1A e alfa-1D do trato urinário, menor propensão à vasodilatação periférica com hipotensão e comodidade posológica de administração q24h. A dose recomendada pelo ACVIM 2024 é de 0,4 a 0,8 mg/cão PO a cada 24 horas (com doses tituladas a q12h descritas em refratários em centros especializados; diretrizes BSAVA indicam 10 mcg/kg PO q24h, teto 0,4 mg/cão). A PRAZOSINA permanece como opção clássica de ampla experiência na dose de 0,5 a 3,0 mg/cão PO q8-12h (VIN indica 1 mg para <15 kg e 2 mg para >15 kg q8-12h). A hipotensão postural, fraqueza, letargia e síncope são potenciais efeitos adversos de ambas as drogas, exigindo aferição prévia da pressão arterial e titulação cuidadosa. A FENOXIBENZAMINA (bloqueador alfa não seletivo irreversível, 0,25 a 1,0 mg/kg PO q8-24h) caiu em desuso relativo devido ao início de ação lento (5 a 7 dias para efeito pleno) e risco superior de efeitos adversos cardiovasculares.',
    relaxantesDeMusculoEstriadoDiazepam:
      'Quando o componente de resistência do esfíncter uretral externo estriado (inervado pelo nervo pudendo) contribui significativamente para o bloqueio do fluxo, o alfa-bloqueador isolado é insuficiente. O fármaco de escolha para relaxamento do esfíncter estriado é o DIAZEPAM na dose de 0,04 a 0,8 mg/kg/dia PO dividido a cada 8 a 12 horas (doses empíricas de 2 a 10 mg/cão PO q8h). Uma estratégia clínica de alta eficácia consiste em administrar o diazepam cerca de 30 minutos antes do passeio programado para micção, permitindo que o pico de relaxamento coincida com a postura miccional. Outros relaxantes incluem o LORAZEPAM (0,02 a 0,2 mg/kg PO q8-12h) e o DANTROLENO (relaxante periférico por bloqueio da liberação de cálcio no retículo sarcoplasmático, 1 a 5 mg/kg PO q8-12h; uso restrito devido ao risco de hepatotoxicidade e sedação).',
    tabelaGuiaFarmacologicoFoo: {
      title: 'Tabela 5 — Farmacoterapia Completa da FOO Canina: Doses, Vias, Alvos e Efeitos Adversos',
      columns: ['Fármaco', 'Alvo Farmacológico', 'Dose e Frequência Canina', 'Principais Efeitos Adversos', 'Recomendações Clínicas'],
      rows: [
        [
          'Tamsulosina',
          'Antagonista seletivo alfa-1A/alfa-1D uretral',
          '0,4 a 0,8 mg/CÃO PO q24h (BSAVA: 10 mcg/kg q24h, máx 0,4 mg)',
          'Hipotensão postural leve, fraqueza, letargia transitória',
          'Primeira escolha no ACVIM 2024; q24h facilita adesão; titular dose se refratário',
        ],
        [
          'Prazosina',
          'Antagonista alfa-1 competitivo de musculatura lisa',
          '0,5 a 3,0 mg/CÃO PO q8-12h (VIN: 1 mg <15 kg; 2 mg >15 kg)',
          'Hipotensão sistêmica, síncope, hipotermia, anorexia',
          'Excelente experiência histórica; custo acessível; medir pressão arterial antes de titular',
        ],
        [
          'Diazepam',
          'Modulador GABA-A no SNC; reduz tônus do esfíncter estriado',
          '0,04 a 0,8 mg/kg/DIA dividido q8-12h (empírico: 2 a 10 mg/cão)',
          'Sedação, ataxia transitória, aumento de apetite',
          'Administrar 30 minutos antes do passeio para coincidir com a postura miccional',
        ],
        [
          'Fenoxibenzamina',
          'Antagonista alfa-1 e alfa-2 irreversível e não seletivo',
          '0,25 a 1,0 mg/kg PO q8-24h (mínimo de 5 a 7 dias)',
          'Hipotensão arterial sustentada, taquicardia reflexa, náusea',
          'Início de ação lento; reservada para falha ou indisponibilidade de tamsulosina/prazosina',
        ],
        [
          'Betanecol',
          'Agonista colinérgico muscarínico M3 no detrusor',
          '2,5 a 25 mg/CÃO PO q8-12h (Plumb 10ª ed.)',
          'Salivação profusa, vômito, diarreia, cólica, bradicardia',
          'CONTRAINDICADO na presença de resistência uretral elevada; usar só com uretra aberta',
        ],
      ],
    },
    alertaMaximoContraindicacaoBetanecolPrecoce:
      'ALERTA TOXICOLÓGICO E MECÂNICO MÁXIMO: A administração precipitada de Betanecol em um cão com FOO cuja uretra ainda não foi adequadamente relaxada é um erro grave de conduta. O betanecol estimula quimicamente os receptores muscarínicos M3 no detrusor, gerando contrações vesicais forçadas contra um conduto de saída fechado e resistente. Isso eleva perigosamente a pressão hidrostática intravesical, causa dor abdominal paroxística intensa, precipita refluxo vesicoureteral com risco de pielonefrite ascendente e pode provocar ruptura vesical iatrogênica em bexigas cronicamente fragilizadas. O Plumb (10ª ed.) adverte explicitamente que o betanecol deve ser prescrito SOMENTE quando a uretra estiver comprovadamente patente e desobstruída por alívio farmacológico prévio.',
    cateterizacaoIntermitenteVsCateterPermanente:
      'A proteção do detrusor contra a superdistensão durante a fase de indução medicamentosa é vital. O Consenso ACVIM 2024 recomenda formalmente a cateterização uretral intermitente suave e estéril (a cada 6 a 8 horas conforme a taxa de enchimento) como conduta de primeira linha, em detrimento da manutenção de cateter de demora em sistema fechado. Sondas de demora permanentes induzem uretrite inflamatória por corpo estranho, espasmo muscular reflexo contínuo (paradoxalmente agravando o tônus que se deseja relaxar) e elevam o risco de infecção bacteriana do trato urinário associada a cateter (CAUTI) para 8% a 32% dos casos.',
    descompressaoPorTuboDeCistostomiaGreenfield2025:
      'Em casos com retenção severa ou refratários ao tratamento oral inicial, a colocação de um tubo de cistostomia percutânea locking-loop pigtail sob fluoroscopia ou ultrassom surge como uma intervenção moderna de resgate. O estudo pioneiro de Greenfield et al., 2025 (JVIM, 12 cães machos) comprovou que a derivação temporária via cistostomia percutânea proporciona descompressão vesical completa e contínua sem manipular a uretra, permitindo que as miofibrilas do detrusor se recuperem do dano miofibrilar enquanto a terapia farmacológica com alfa-bloqueadores atinge níveis terapêuticos plenos. No estudo, 71% (5/7) dos cães tratados com tubo de cistostomia alcançaram desfechos bons ou excelentes, comparados a apenas 20% no grupo sem tubo. Embora complicações mecânicas locais e infecções sejam frequentes, o tubo de cistostomia constitui a melhor ponte terapêutica não destrutiva para preservar a bexiga.',
    uretrostomiaPerinealDeSalvamentoPicon2024:
      'Para pacientes com FOO verdadeiramente refratária a doses máximas combinadas de tamsulosina, diazepam e descompressão temporária, a uretrostomia perineal surge como procedimento cirúrgico de salvamento. Picón et al., 2024 (Vet Rec Case Rep) documentaram uma série de três cães com FOO refratária crônica submetidos à uretrostomia perineal, obtendo normalização imediata do calibre e da continuidade do jato miccional já na primeira micção pós-operatória, sem complicações maiores ou recidiva no seguimento. O procedimento reduz drasticamente a resistência do fluxo de saída ao contornar o segmento uretral peniano e esfinctérico distal, criando um estoma perineal amplo de baixa resistência.',
    tabelaManejoEscalonadoUti: {
      title: 'Tabela 6 — Protocolo Escalonado de Manejo: da Abordagem Ambulatorial ao Paciente Refratário',
      columns: ['Fase / Gravidade', 'Critério Clínico', 'Intervenção Farmacológica', 'Manejo Descompressivo Vesical'],
      rows: [
        [
          'Fase 1: Inicial / Estável',
          'Cão miccionando com jato interrompido; PVRV 3 a 5 mL/kg; sem azotemia',
          'Tamsulosina 0,4 a 0,8 mg PO q24h em monoterapia',
          'Passeios frequentes e monitoramento do resíduo pós-miccional',
        ],
        [
          'Fase 2: Resposta Parcial',
          'Persistência de esforço e PVRV > 3 mL/kg após 7 dias de alfa-bloqueador',
          'Manter Tamsulosina + associar Diazepam 30 min antes dos passeios',
          'Cateterização uretral intermitente estéril q8-12h se houver bexiga grande',
        ],
        [
          'Fase 3: Atonia Residual',
          'Uretra relaxada e patente, mas PVRV persiste elevado por fraqueza do detrusor',
          'Manter alfa-bloqueador + adicionar Betanecol (2,5 a 10 mg PO q8h)',
          'Cateterização intermitente regular até recuperação da contratilidade vesical',
        ],
        [
          'Fase 4: Refratário / Crise',
          'Incapacidade miccional mantida por > 14 dias em dose plena combinada',
          'Otimização posológica máxima (tamsulosina q12h em centros terciários)',
          'Tubo de cistostomia percutânea locking-loop (Greenfield 2025) ou Uretrostomia (Picón 2024)',
        ],
      ],
    },
  },

  complications: {
    atoniaDetrusoraIrreversivel:
      'A atonia detrusora irreversível (perda irreversível da contratilidade miogênica do detrusor) representa a complicação crônica mais incapacitante da FOO. Ocorre quando a retenção urinária é negligenciada e a bexiga permanece em superdistensão extrema por semanas, resultando em estiramento miofibrilar crônico, necrose isquêmica focal da muscular própria vesical e substituição do tecido muscular contrátil por fibrose densa de colágeno. Nesses estágios terminais, mesmo que a uretra venha a ser desobstruída ou relaxada farmacologicamente, a bexiga torna-se uma megabexiga flácida arrefléxica incapaz de gerar pressão de ejeção, impondo cateterização manual ou derivação permanente pelo restante da vida do paciente.',
    ituSecundariaERupturaUretralIatrogenica:
      'O ambiente de estase urinária crônica somado à necessidade repetida de sondagens uretrais abre uma porta para infecções do trato urinário bacterianas recorrentes e pielonefrite ascendente. Além disso, tentativas forçadas ou traumáticas de passagem de sondas rígidas em uma uretra com hipertonia esfinctérica podem causar laceração mucosa, divertículos adquiridos, falsas passagens e ruptura uretral iatrogênica com uroabdômen ou flegmão perineal.',
    dezErrosMataisManejoFoo:
      'Dez erros críticos e armadilhas letais a evitar no manejo da FOO canina: 1. Diagnosticar dissinergia ou FOO sem excluir rigorosamente obstrução mecânica por cistouretrografia ou cistoscopia; 2. Acreditar que a passagem facilitada de cateter uretral exclui obstrução mecânica (estenoses parciais e massas murais permitem passagem de sonda); 3. Administrar Betanecol antes da redução comprovada da resistência de saída uretral, provocando dor severa e risco de ruptura vesical; 4. Tratar bacteriúria ou piúria isolada com antibióticos acreditando que a infecção seja a causa primária da retenção funcional; 5. Confundir incontinência por transbordamento (overflow) com incompetência esfinctérica (USMI) e prescrever fenilpropanolamina (que agrava a obstrução alfa-1); 6. Deixar de realizar exame neurológico focado completo na admissão e nos retornos seriados; 7. Permitir que a bexiga permaneça superdistendida por dias aguardando o efeito medicamentoso pleno, gerando atonia irreversível; 8. Prescrever corticosteroides ou AINEs de rotina para FOO idiopática na ausência de uretrite inflamatória comprovada; 9. Considerar falha terapêutica definitiva com apenas 24 a 48 horas de medicação (a melhora clínica pode requerer 1 a 2 semanas); 10. Extrapolar o protocolo e diagnóstico de FOO canina para gatos machos com obstrução pós-FLUTD.',
  },

  prevention: {
    protocoloPlantaoFoo10Passos:
      'Protocolo de plantão: conduta clínica sequencial em 10 passos para o cão em retenção urinária: 1. Triagem e Estabilização Emergencial: avaliar estado geral, frequência cardíaca e palpar bexiga (avaliar repleção extrema e dor); 2. Avaliação Eletrolítica e Renal Imediata: dosar creatinina, ureia e potássio sérico (identificar azotemia pós-renal e hipercalemia com risco arrítmico); 3. Descompressão Inicial Suave: passar cateter uretral flexível bem lubrificado sob técnica estéril para esvaziar a bexiga lentamente; se houver obstrução intransponível, cistocentese descompressiva com agulha fina; 4. Análise Laboratorial Básica: colher urina para urinálise completa e urocultura com antibiograma antes de iniciar antimicrobianos; 5. Exame Físico Focado e Rastreio Neurológico: palpar próstata por toque retal, uretra peniana no os penis e testar propriocepção, marcha e reflexo perineal; 6. Avaliação Imaginológica de Exclusão: realizar radiografia pélvica/abdominal simples e ultrassonografia do trato urinário para pesquisar litíase e massas; 7. Aferição do PVRV Pós-Micção: após remoção da sonda e micção voluntária, calcular PVRV por ultrassom 2D em até 10 minutos (verificar se > 3 mL/kg); 8. Início da Terapia Farmacológica Dirigida: prescrever Tamsulosina (0,4 a 0,8 mg/cão PO q24h) ou Prazosina; associar Diazepam (30 min pré-micção) se houver suspeita de hipertonia do esfíncter estriado; 9. Plano de Proteção Vesical Domiciliar: orientar tutor sobre passeios calmos e regulares; se PVRV persistir elevado, instituir cateterização intermitente estéril q8h; 10. Retorno Estruturado em 7 a 14 Dias: avaliar novo vídeo da micção, palpar bexiga e quantificar novamente o PVRV para ajustar doses ou indicar cistostomia.',
    monitoramentoSeriadoEDesmameGradual:
      'O monitoramento da FOO canina é predominantemente clínico e quantitativo. Os melhores marcadores objetivos de resposta terapêutica são: A. Qualidade e Calibre do Jato: jato uniforme, sustentado e com diminuição progressiva de jatos interrompidos (spurts); B. Tempo de Postura: diminuição do tempo total em esforço miccional; C. Normalização do PVRV: redução do resíduo pós-miccional para valores basais aceitáveis (< 1,0 a 1,5 mL/kg); D. Resolução do Dripping: cessação completa dos episódios de incontinência por transbordamento. Em relação ao prognóstico a longo prazo, Stilwell et al. (2021) demonstraram que a doença não é invariavelmente vitalícia: embora alguns cães necessitem de terapia contínua prolongada, 55% dos pacientes com boa resposta clínica conseguiram o desmame completo dos medicamentos sem recidiva imediata. O desmame farmacológico só deve ser tentado após pelo menos 4 a 8 semanas de estabilidade clínica completa com PVRV rigorosamente normalizado, reduzindo a dose ou aumentando o intervalo posológico de forma lenta e monitorada.',
  },

  references: [
    {
      id: 'ref-kendall-acvim-2024',
      citationText:
        'Kendall A, et al. ACVIM consensus statement on diagnosis and management of urinary incontinence in dogs. Journal of Veterinary Internal Medicine. 2024;38(3):878–903. doi:10.1111/jvim.16975.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.16975',
      notes: 'Diretriz internacional fundamental que formalizou a transição de dissinergia reflexa para FOO idiopática e estabeleceu limiares de PVRV.',
      evidenceLevel: 'Consenso de especialistas / Delphi',
    },
    {
      id: 'ref-greenfield-jvim-2025',
      citationText:
        'Greenfield ZP, Berent AC, Weisse CW. The use of a percutaneous cystostomy tube as an adjunctive treatment option for dogs with idiopathic functional outflow tract obstruction. Journal of Veterinary Internal Medicine. 2025;39(1):e17275. doi:10.1111/jvim.17275.',
      sourceType: 'Estudo clínico retrospectivo',
      url: 'https://doi.org/10.1111/jvim.17275',
      notes: 'Evidência moderna comprovando eficácia do tubo de cistostomia percutânea locking-loop pigtail como ponte terapêutica em FOO canina.',
      evidenceLevel: 'Série de casos',
    },
    {
      id: 'ref-picon-vrcr-2024',
      citationText:
        'Picón SR, et al. Management of medically unresponsive detrusor urethral dyssynergia in three dogs by perineal urethrostomy. Veterinary Record Case Reports. 2024;12(2):e793. doi:10.1002/vrc2.793.',
      sourceType: 'Série de casos cirúrgicos',
      url: 'https://doi.org/10.1002/vrc2.793',
      notes: 'Descrição cirúrgica do emprego de uretrostomia perineal como salvamento em cães com FOO refratária grave.',
      evidenceLevel: 'Série de casos',
    },
    {
      id: 'ref-mathews-jvim-2023',
      citationText:
        'Mathews K, et al. Idiopathic functional urinary outflow tract obstruction in dogs, a retrospective case series (2010–2021): 31 cases. Journal of Veterinary Internal Medicine. 2023;37(6):2211–2218. doi:10.1111/jvim.16843.',
      sourceType: 'Estudo clínico multicêntrico retrospectivo',
      url: 'https://doi.org/10.1111/jvim.16843',
      notes: 'Caracterização fenotípica de 31 cães com FOO, demonstrando taxa de 45% de overflow e relevância de neurochecks seriados.',
      evidenceLevel: 'Série de casos multicêntrica',
    },
    {
      id: 'ref-stilwell-jsap-2021',
      citationText:
        'Stilwell C, et al. Detrusor urethral dyssynergy in dogs: 35 cases (2007–2019). Journal of Small Animal Practice. 2021;62(6):468–477. doi:10.1111/jsap.13286.',
      sourceType: 'Estudo clínico retrospectivo',
      url: 'https://doi.org/10.1111/jsap.13286',
      notes: 'Série de 35 cães avaliando perfil racial (Labrador/Golden), tempo mediano de resposta de 11 dias e taxa de desmame farmacológico.',
      evidenceLevel: 'Série de casos',
    },
    {
      id: 'ref-nelson-couto-6ed-cap45',
      citationText:
        'Nelson RW, Couto CG. Disorders of Micturition. In: Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. p. 730–737.',
      sourceType: 'Tratado clássico',
      notes: 'Descrição detalhada dos circuitos neurais hipogástrico, pélvico e pudendo, farmacoterapia e proteção contra atonia detrusora.',
      evidenceLevel: 'Tratado de referência',
    },
    {
      id: 'ref-plumb-10ed-prazosin-bethanechol',
      citationText:
        'Plumb DC. Prazosin Hydrochloride / Bethanechol Chloride. In: Plumb’s Veterinary Drug Handbook. 10th ed. Tulsa: Educational Publishers; 2023. p. 131–132, 1057–1058.',
      sourceType: 'Formulário farmacológico',
      notes: 'Posologias, mecanismos e contraindicações rigorosas do betanecol na presença de tônus de saída aumentado.',
      evidenceLevel: 'Formulário oficial',
    },
    {
      id: 'ref-bsava-formulary-10ed-tamsulosin',
      citationText:
        'Ramsey I, editor. BSAVA Small Animal Formulary. Part A: Canine and Feline. 10th ed. Gloucester: British Small Animal Veterinary Association; 2020. p. 317–318, 391.',
      sourceType: 'Formulário veterinário',
      notes: 'Recomendações e posologias para Tamsulosina e Fenoxibenzamina em afecções de retenção funcional canina.',
      evidenceLevel: 'Formulário oficial',
    },
    {
      id: 'ref-bsava-procedures-3ed-2024',
      citationText:
        'BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. Gloucester: British Small Animal Veterinary Association; 2024. p. 139–140, 245–246, 284–292.',
      sourceType: 'Guia de procedimentos',
      notes: 'Procedimentos de cistouretrografia retrógrada positiva, cateterização uretral atraumática e manejo de tubo de cistostomia.',
      evidenceLevel: 'Guia procedimental',
    },
  ],

  relatedConsensusSlugs: ['acvim-incontinencia-foo-caes-2024'],
  relatedMedicationSlugs: ['betanecol', 'diazepam'],
  isPublished: true,
};
