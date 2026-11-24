import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const leptospiroseCaesGatosRecord: DiseaseRecord = {
  id: 'disease-leptospirose-caes-gatos',
  slug: 'leptospirose-caes-gatos',
  title: 'Leptospirose em cães e gatos',
  subtitle:
    'Doença infecciosa bacteriana, sistêmica e zoonótica causada por espiroquetas patogênicas do gênero Leptospira. Em cães varia de infecção subclínica a lesão renal aguda, hepatopatia colestática, hemorragia pulmonar e disfunção de múltiplos órgãos; em gatos, a infecção e eliminação urinária estão documentadas, mas a doença clínica é menos caracterizada.',
  synonyms: [
    'Leptospirosis',
    'Leptospirose canina',
    'Leptospirose felina',
    'Infecção por Leptospira spp.',
    'Doença de Weil veterinária',
    'Síndrome de hemorragia pulmonar leptospírica (LPHS)',
  ],
  species: ['dog', 'cat'],
  category: 'infectologia',
  categories: [
    'infectologia',
    'nefrologia',
    'gastroenterologia',
    'emergencia',
    'clinica-medica',
    'saude-publica',
  ],
  tags: ['Cães e Gatos'],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['leptospirose-caes-gatos'],

  quickSummary:
    'Infecção bacteriana sistêmica e zoonótica causada por espiroquetas patogênicas (principalmente Leptospira interrogans, L. kirschneri e L. borgpetersenii), transmitida pelo contato mucoso ou cutâneo com urina, água ou solo contaminados. Suspeite em todo cão com doença sistêmica aguda, azotemia, alterações tubulares ou hepatobiliares, trombocitopenia ou dispneia — mesmo sem febre, icterícia ou histórico de enchentes. Combine PCR de sangue e urina (antes do antibiótico) com MAT pareado (7–14 dias), mas inicie tratamento imediatamente (doxiciclina 5 mg/kg VO q12h por 14 dias em cães, ou betalactâmico IV inicial se vômitos, seguido de doxiciclina) e preserve perfusão orgânica sem sobrecarga hídrica.',

  quickDecisionStrip: [
    'LRA sem icterícia: o comprometimento renal pode predominar completamente sem hiperbilirrubinemia; nunca exija icterícia para suspeitar.',
    'PCR negativa não afasta infecção: a sensibilidade cai após uso prévio de antibióticos ou fora da janela de leptospiremia/excreção urinária.',
    'MAT inicial negativo não descarta leptospirose: pode refletir apenas coleta precoce anterior à soroconversão (repetir em 7–14 dias no mesmo laboratório).',
    'PCR urinária positiva isolada demonstra DNA leptospírico, mas sozinha não separa doença clínica aguda de eliminação assintomática.',
    'Hemorragia pulmonar leptospírica (LPHS) pode ocorrer sem hemoptise e com exames convencionais de coagulação (TP/TTPa) preservados.',
    'Fluidoterapia excessiva agrava rapidamente a insuficiência respiratória, sobretudo na oligúria/anúria — corrija hipoperfusão e perdas reais sem diurese forçada.',
    'Regra central do plantão: suspeita clínica consistente justifica coleta diagnóstica e início imediato de antimicrobiano e suporte, sem aguardar laudos.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'A regra central na leptospirose é que uma suspeita clínica consistente justifica coleta diagnóstica e tratamento imediato, sem aguardar a confirmação laboratorial. A doença é potencialmente reversível mesmo diante de lesão renal aguda grave, mas o prognóstico piora rapidamente quando disfunção renal, síndrome de hemorragia pulmonar, sobrecarga hídrica e distúrbios hemostáticos progridem antes da estabilização. As recomendações terapêuticas caninas seguem principalmente o consenso ACVIM 2023 e as diretrizes IRIS 2024, enquanto particularidades felinas seguem a diretriz ABCD 2026 — sem extrapolar automaticamente doses caninas aos gatos.',
    leadHighlights: [
      'suspeita clínica consistente justifica coleta diagnóstica e tratamento imediato, sem aguardar a confirmação laboratorial',
      'potencialmente reversível mesmo diante de lesão renal aguda grave',
      'sem extrapolar automaticamente doses caninas aos gatos',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico — Da Suspeita à Confirmação Pareada',
      steps: [
        {
          label: '1. Suspeita clínica e avaliação imediata de gravidade',
          timing: 'Admissão',
          detail:
            'Realizar hemograma, bioquímica, eletrólitos, urinálise, pressão arterial, avaliação da diurese, oxigenação e radiografia torácica (mesmo sem dispneia) para detectar LRA, colestase e LPHS.',
        },
        {
          label: '2. Coletas etiológicas antes do antimicrobiano',
          timing: 'Pré-antibiótico',
          detail:
            'Colher simultaneamente sangue total em EDTA (nunca heparina) e urina para PCR, além de soro para MAT agudo; registrar início dos sinais, histórico vacinal e uso prévio de antibióticos.',
        },
        {
          label: '3. Iniciar tratamento sem aguardar resultados',
          timing: 'Imediato',
          detail:
            'Diante de suspeita consistente, iniciar terapia antimicrobiana e suporte orgânico logo após as coletas viáveis, aplicando precauções de contato com urina.',
        },
        {
          label: '4. Interpretar exames em conjunto durante a internação',
          timing: 'Evolução hospitalar',
          detail:
            'Integrar janela temporal, amostra testada, uso prévio de antibióticos, critérios ACVIM 2023 (caso provável vs. confirmado) e diagnósticos diferenciais.',
        },
        {
          label: '5. Repetir sorologia MAT na convalescença',
          timing: '7 a 14 dias',
          detail:
            'Enviar segunda amostra preferencialmente ao mesmo laboratório para documentar soroconversão ou aumento de pelo menos quatro vezes no título (critério confirmatório).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico — Estabilização, Antimicrobianos e Suporte Intensivo',
      steps: [
        {
          label: '1. Estabilização ABCDE e biossegurança urinária',
          timing: 'Primeiros minutos',
          detail:
            'Garantir oxigenação sem estresse, avaliar perfusão, pulso, PA, glicemia e diurese; usar luvas, proteção ocular contra respingos e descartar resíduos com segurança (atenção especial nas primeiras 48 h).',
        },
        {
          label: '2. Antimicrobiano em duas fases (cães)',
          timing: 'Início imediato',
          detail:
            'Doxiciclina 5 mg/kg VO q12h por 14 dias. Se vômitos ou prostração impedirem VO, iniciar betalactâmico IV (ampicilina 20–30 mg/kg IV q6–8h, dobrando o intervalo em LRA IRIS IV / Cr > 5 mg/dL) e transicionar para 14 dias de doxiciclina assim que tolerado.',
        },
        {
          label: '3. Fluidoterapia guiada por perfusão e balanço hídrico',
          timing: 'Monitorização contínua',
          detail:
            'Distinguir hipoperfusão (bolus cristaloides balanceados individualizados com reavaliação), desidratação e perdas contínuas; pesar seriamente e mensurar diurese para evitar sobrecarga hídrica.',
        },
        {
          label: '4. Eletrólitos, analgesia, antieméticos, nutrição e LPHS',
          timing: 'Suporte orgânico',
          detail:
            'Corrigir hipo ou hipercalemia conforme diurese, evitar AINEs, iniciar dieta altamente digestível com proteína adequada na fase aguda, ofertar oxigenoterapia/ventilação na LPHS e usar hemocomponentes apenas se clinicamente indicados.',
        },
        {
          label: '5. Discussão precoce de hemodiálise e seguimento',
          timing: 'LRA grave / pós-alta',
          detail:
            'Considerar encaminhamento precoce para suporte renal extracorpóreo na LRA IRIS grau IV, anúria persistente, hipercalemia refratária ou sobrecarga hídrica; reavaliar clinicamente e laboratorialmente em até 7 dias após a alta.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Consulta rápida em 60 segundos: conduta essencial na leptospirose',
      headers: ['Eixo clínico', 'Diretriz prática imediata'],
      rows: [
        [
          'Agente e transmissão',
          'Espiroquetas patogênicas (principalmente L. interrogans, L. kirschneri e L. borgpetersenii). Transmissão por exposição de mucosas ou pele macerada/lesionada à urina, água ou solo contaminados.',
        ],
        [
          'Quando suspeitar',
          'Cão com doença sistêmica aguda, apatia, vômitos, PU/PD, azotemia, colestase, trombocitopenia ou dispneia. Ausência de febre, icterícia ou contato com enchentes não exclui a doença.',
        ],
        [
          'Diagnóstico recomendado',
          'Combinar PCR de sangue (EDTA) e urina antes do antibiótico com sorologia MAT aguda e convalescente (7–14 dias no mesmo laboratório), interpretando com evolução clínica e histórico vacinal (ACVIM 2023).',
        ],
        [
          'Tratamento etiológico — cães',
          'Doxiciclina 5 mg/kg VO q12h por 14 dias. Se VO não tolerada, iniciar betalactâmico IV (ex.: ampicilina 20–30 mg/kg IV q6–8h, ajustando intervalo na disfunção renal grave) e passar para doxiciclina assim que possível.',
        ],
        [
          'Prioridade na internação',
          'Preservar perfusão e função orgânica sem provocar sobrecarga hídrica. Monitorar débito urinário, peso, eletrólitos, pressão arterial, creatinina, bilirrubina e padrão respiratório; considerar diálise precocemente na LRA grave.',
        ],
        [
          'Zoonose e prevenção',
          'Precauções de contato com urina desde a suspeita (atenção redobrada nas primeiras 48 h). A ACVIM 2023 e a AAHA 2024 recomendam vacinação anual para todos os cães com formulações compatíveis aos sorogrupos relevantes; sem vacina licenciada para gatos.',
        ],
      ],
    },
  },

  etiology: {
    leptoAgenteMicrobiologiaETaxonomia:
      'As leptospiras são bactérias Gram-negativas atípicas do filo Spirochaetes (gênero *Leptospira*), extremamente finas, flexíveis, alongadas e helicoidais, com extremidades curvadas em gancho — característica que originou sua nomenclatura (*leptos* = fino; *spira* = espiral; *interrogans* = formato de ponto de interrogação). Medem aproximadamente ==6 a 20 µm de comprimento por 0,1 a 0,2 µm de diâmetro==, motivo pelo qual ficam abaixo do limite de resolução da microscopia óptica convencional de rotina.\n\n' +
      '- ==Ultraestrutura e motilidade em saca-rolhas==: apresentam membrana dupla (membrana citoplasmática e membrana externa separadas por espaço periplásmico) contendo dois endoflagelos inseridos subterminalmente e enrolados ao redor do cilindro protoplasmático. Essa arquitetura produz um movimento helicoidal ativo semelhante ao de um saca-rolhas, essencial para atravessar meios viscosos, interagir com superfícies celulares e invadir rapidamente tecidos vasculares e intersticiais {{ref:ref-putz-2020}}.\n' +
      '- ==Componentes antigênicos de superfície==: a membrana externa contém lipopolissacarídeo (LPS) — principal determinante da diversidade antigênica de sorovares — além de lipoproteínas antigênicas como `LipL21`, `LipL32` (restrita a espécies patogênicas e usada como alvo de PCR e ensaios sorológicos), `LipL36`, `LipL41`, porina `OmpL1` e secretina `GspD`.\n' +
      '- ==Taxonomia moderna==: a antiga divisão simplificada entre *L. interrogans* (patogênica) e *L. biflexa* (saprofítica) foi superada por análises genômicas de 16S rRNA e sequenciamento completo, que distinguem linhagens ==patogênicas (grupo I)== — com destaque clínico em cães para *L. interrogans*, *L. kirschneri* e *L. borgpetersenii* —, linhagens intermediárias e espécies saprofíticas (que crescem em temperaturas mais baixas, 11–13 °C, enquanto patogênicas têm crescimento ótimo em 28–30 °C). Como sorovares pertencentes a espécies genômicas diferentes podem compartilhar antígenos de LPS semelhantes (ex.: sorovares do sorogrupo Grippotyphosa existem tanto em *L. interrogans* quanto em *L. kirschneri*), ==identificar a espécie não determina automaticamente o sorovar==.\n' +
      '- ==Erro clássico de interpretação sorológica==: observar o maior título no MAT contra *Icterohaemorrhagiae* e afirmar que esse foi o sorovar infectante. A intensa reatividade cruzada entre sorogrupos e o fenômeno de reatividade paradoxal (quando o maior título agudo direciona-se a um sorogrupo diferente do infectante) impedem essa inferência sem isolamento bacteriano ou tipagem molecular específica {{ref:ref-sykes-acvim-2023}}.',

    leptoTabelaTaxonomiaESorogrupos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Por que espécie, sorogrupo, sorovar e genótipo não são sinônimos',
      headers: ['Nível classificatório', 'O que representa', 'Relevância clínica e epidemiológica'],
      rows: [
        [
          'Espécie',
          'Classificação filogenética e genômica (ex.: L. interrogans, L. kirschneri, L. borgpetersenii)',
          'Identificação molecular e microbiológica; não define automaticamente o sorovar nem a cobertura vacinal.',
        ],
        [
          'Sorogrupo',
          'Conjunto de sorovares antigenicamente relacionados que geram reatividade cruzada',
          'Base prática para vigilância epidemiológica, imunidade protetora e composição de vacinas.',
        ],
        [
          'Sorovar',
          'Variante antigênica definida sobretudo pelas características estruturais do LPS de superfície (>250 sorovares descritos)',
          'Estudos de cadeias de transmissão, identificação de hospedeiros reservatórios e tipagem fina.',
        ],
        [
          'Genótipo / Sequence Type (ST)',
          'Caracterização por sequenciamento (MLST, VNTR ou genoma completo)',
          'Investigações epidemiológicas de alta precisão e rastreamento direto entre reservatórios, cães e humanos.',
        ],
      ],
    },

    leptoFiguraMicroscopiaPutz: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/leptospirose-caes-gatos/fig1-leptospira-em-putz-2020.webp',
      fallbackSrc: 'https://www.frontiersin.org/files/Articles/562538/xml-images/fmicb-11-02005-g001.webp',
      alt: 'Microscopia eletrônica de varredura mostrando espiroquetas helicoidais de Leptospira aderidas a uma superfície tecidual',
      shortCaption: 'Fig. 1 — Microscopia eletrônica de Leptospira aderida à superfície celular (Putz & Nally, 2020).',
      caption:
        'Figura 1 — Espiroquetas de *Leptospira* aderidas a uma superfície tecidual observadas por microscopia eletrônica de varredura. Evidencia a morfologia fina, alongada e helicoidal em saca-rolhas e o contato físico direto entre a bactéria e o hospedeiro durante a colonização. Fonte: Putz EJ, Nally JE (2020), *Frontiers in Microbiology*, Figura 1 (DOI: 10.3389/fmicb.2020.02005). Licença: CC BY 4.0.',
      display: 'default',
    },

    leptoReservatoriosEHospedeiros:
      'A ecologia da leptospirose organiza-se em dois polos epidemiológicos distintos, que influenciam diretamente a gravidade da doença e a duração da eliminação urinária:\n\n' +
      '- ==Hospedeiro de manutenção (reservatório)==: espécie na qual determinado sorovar apresenta elevada adaptação coevolutiva. As leptospiras colonizam persistentemente o lúmen dos túbulos renais — um sítio imunoprivilegiado — e são eliminadas na urina por meses ou anos, com poucos ou nenhum sinal clínico. Pequenos roedores (como ratos para *Icterohaemorrhagiae* e camundongos para *Ballum*) constituem os reservatórios mais importantes mundialmente, mas praticamente qualquer mamífero silvestre ou doméstico (incluindo o próprio cão para sorovares como *Canicola*) pode atuar como reservatório.\n' +
      '- ==Hospedeiro incidental==: infectado por uma linhagem para a qual não há adaptação coevolutiva estável. Tende a apresentar rápida disseminação hematogênica, intensa resposta inflamatória sistêmica, lesão orgânica grave (renal, hepática, pulmonar e vascular) e eliminação urinária mais curta quando sobrevive sem tratamento.\n' +
      '- ==Distinção não absoluta==: um cão pode desenvolver doença clínica grave mesmo por um sorovar classicamente adaptado à espécie canina; o desfecho depende da interação entre virulência da cepa, carga infectante, idade e imunidade prévia do hospedeiro. Quanto à carga ambiental, roedores eliminam concentrações altíssimas por mililitro de urina (mediana próxima de 5,7 × 10⁶ células/mL), enquanto mamíferos de maior porte eliminam maior volume total diário.',
  },

  epidemiology: {
    leptoTransmissaoESobrevivenciaAmbiental:
      'A via principal de transmissão é o contato direto ou indireto com ==urina contendo leptospiras viáveis== — seja por água doce estagnada ou corrente, lama, solo úmido, fômites contaminados, ingestão de tecidos durante predação de roedores ou, menos frequentemente, contato venéreo, mordeduras ou via transplacentária.\n\n' +
      '- ==Por que não usar o termo "vetor"==: a leptospirose não depende de carrapatos, pulgas ou mosquitos para seu ciclo principal; água e solo atuam como veículos ambientais de transmissão, enquanto roedores e mamíferos infectados são reservatórios.\n' +
      '- ==Sobrevivência ambiental condicionada==: leptospiras patogênicas ==não se multiplicam no ambiente== e são rapidamente inativadas por dessecação, calor excessivo, radiação ultravioleta, congelamento e desinfetantes comuns. Em urina canina não diluída e ácida (pH ~5,8), a viabilidade pode cair drasticamente em minutos; em contrapartida, quando diluídas em água ou depositadas em solo saturado de umidade com pH neutro a levemente alcalino e temperatura amena a quente, podem sobreviver por ==semanas a meses==.\n' +
      '- ==Sazonalidade e cenário urbano==: chuvas intensas, enchentes e temperaturas mais altas elevam o número de casos ao dispersar urina contaminada pelo ambiente, porém a doença ocorre durante todo o ano e em áreas totalmente urbanas. Cães de pequeno porte e de apartamento que passeiam em calçadas, parques ou quintais com circulação de roedores também adoecem — muitas vezes em proporção expressiva por receberem menor cobertura vacinal sob a falsa percepção de "baixo risco".',

    leptoTabelaFatoresPredisponentes: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Fatores predisponentes e interpretação epidemiológica no consultório',
      headers: ['Fator avaliado', 'Interpretação epidemiológica prática'],
      rows: [
        [
          'Acesso a ambientes externos',
          'Aumenta a exposição a poças, água parada, lama, grama úmida e urina de reservatórios urbanos ou periurbanos.',
        ],
        [
          'Roedores e fauna silvestre',
          'Presença de reservatórios primários em quintais, depósitos, praças, parques, córregos e zonas de transição.',
        ],
        [
          'Chuvas intensas e enchentes',
          'Dispersam urina contaminada no solo e na água, elevando o risco de surtos sazonais (sem restringir casos a esses períodos).',
        ],
        [
          'Abrigos e alta densidade populacional',
          'Maior compartilhamento de ambientes úmidos e circulação de cepas entre cães e roedores sinantrópicos.',
        ],
        [
          'Vacinação ausente ou incompleta',
          'Reduz a proteção contra os sorogrupos presentes na formulação vacinal (lembrando que vacinas não conferem proteção universal absoluta).',
        ],
        [
          'Moradia estritamente urbana',
          'Não é fator protetor: roedores urbanos e água contaminada mantêm a transmissão ativa dentro das cidades.',
        ],
        [
          'Idade, raça e porte',
          'Qualquer cão pode adoecer; cães de pequeno porte também apresentam risco relevante (especialmente se não vacinados).',
        ],
      ],
    },

    leptoRealidadeBrasileiraEGatos:
      'Os dados epidemiológicos brasileiros confirmam circulação ampla e heterogênea de *Leptospira* spp. tanto em áreas urbanas quanto rurais, exigindo leitura crítica da diferença entre sorologia populacional e isolamento bacteriano:\n\n' +
      '- ==Revisão sistemática e meta-análise brasileira (Esteves et al., 2023)==: ao reunir 61 estudos sobre distribuição de sorogrupos e fatores de risco em cães no Brasil, encontrou positividade sorológica agregada de ==19,7%==, com destaque sorológico para *Canicola*, *Icterohaemorrhagiae* e *Autumnalis*. Entre os 28 registros com isolamento e caracterização efetiva de cepas, predominaram amplamente *Canicola* (56 isolados) e *Icterohaemorrhagiae* (37 isolados), seguidos por *Pomona* (2), *Australis* (1) e *Sejroe* (1). ==Alerta interpretativo==: 19,7% de soropositividade agregada não significa que 19,7% dos cães brasileiros têm leptospirose clínica ativa, pois engloba exposição prévia, painéis antigênicos diversos e diferentes históricos vacinais {{ref:ref-esteves-2023}}.\n' +
      '- ==Caracterização microbiológica em São Paulo (2021)==: em 31 cães clinicamente suspeitos atendidos em região endêmica, 20/31 apresentaram anticorpos no MAT e 11/31 preencheram critérios de infecção aguda; o isolamento de leptospiras viáveis foi obtido em 4 cães — ==3 isolados do sorogrupo Icterohaemorrhagiae e 1 do sorogrupo Canicola== — reforçando a diferença entre inferência sorológica e confirmação microbiológica direta {{ref:ref-sp-bmc-2021}}.\n' +
      '- ==Coorte longitudinal em Lavras, Minas Gerais (2025)==: avaliando 329 cães de abrigo na primeira coleta e 325 na segunda, documentou ==soroincidência de 9,24% pelo MAT== (com predomínio sorológico de *Canicola* e *Autumnalis*), porém ==nenhuma amostra positiva na PCR urinária utilizada==. O achado comprova que exposição sorológica e eliminação detectável de DNA na urina são fenômenos distintos — uma PCR negativa pontual não apaga exposição epidemiológica real {{ref:ref-lavras-2025}}.\n' +
      '- ==Epidemiologia felina (Andityas et al., 2024; ABCD 2026; revisão 2026)==: gatos infectam-se sobretudo pela predação de roedores ou exposição ambiental, produzem anticorpos e podem eliminar leptospiras pela urina. Meta-análise global citando gatos domésticos estimou prevalência agregada de anticorpos de ==9,95% (IC 95%: 7,60–12,54%)== e detecção de DNA de ==4,62% (IC 95%: 2,10–7,83%)== em conjuntos heterogêneos de estudos {{ref:ref-andityas-2024}} {{ref:ref-abcd-2026}}. Esses valores não equivalem à frequência de doença clínica felina (que é muito menos reconhecida do que no cão), e a relação causal entre infecção persistente e doença renal crônica em gatos permanece insuficientemente demonstrada {{ref:ref-pathogens-cats-2026}}.',

    leptoTabelaIsoladosBrasilEsteves2023: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Sorogrupos isolados e caracterizados em cães no Brasil (Esteves et al., 2023)',
      headers: ['Sorogrupo isolado', 'Número de isolados caracterizados', 'Observação epidemiológica'],
      rows: [
        ['Canicola', '56', 'Mais frequentemente isolado em cães no Brasil; o próprio cão pode atuar como hospedeiro de manutenção.'],
        ['Icterohaemorrhagiae', '37', 'Fortemente associado a roedores urbanos (Rattus spp.) e quadros clínicos agudos graves.'],
        ['Pomona', '2', 'Associado frequentemente a suínos, bovinos e fauna silvestre.'],
        ['Australis', '1', 'Circulação documentada em isolados caninos; também relevante em debates sobre formulações vacinais.'],
        ['Sejroe', '1', 'Inclui linhagens como L. santarosai já amplificadas em estudos brasileiros em cães.'],
        ['Autumnalis (evidência sorológica)', 'Detectado por MAT (não entre os isolados acima)', 'Frequentemente reativo em estudos sorológicos brasileiros (incluindo Lavras/MG 2025); exige cautela quanto a reações cruzadas.'],
      ],
    },
  },

  pathogenesisTransmission: {
    leptoCadeiaCausalEVirulenciaMolecular:
      'A progressão da infecção segue uma cadeia causal dinâmica que combina invasão bacteriana ativa, evasão imune inicial e dano tecidual direto e inflamatório:\n\n' +
      '- ==1. Penetração e adaptação térmica==: após contato com urina, água ou solo contaminados, as espiroquetas penetram através de ==mucosas íntegras== (oral, nasal, conjuntival ou genital) ou ==pele macerada/escoriada==. Ao ingressar na temperatura corporal do mamífero, desencadeiam alterações transcricionais que aumentam a expressão de fatores de virulência.\n' +
      '- ==2. Leptospiremia e baixa potência endotóxica do LPS==: as bactérias ganham rapidamente a corrente sanguínea e disseminam-se para rins, fígado, pulmões, baço, pâncreas, trato gastrointestinal, olhos, sistema nervoso central e trato genital (período de incubação típico ao redor de ==7 dias==, variável conforme inóculo e imunidade). Diferentemente de enterobactérias Gram-negativas clássicas, o LPS leptospírico possui ==baixa potência endotóxica==, explicando por que a maioria dos cães não evolui com choque séptico endotóxico fulminante nas primeiras horas de bacteremia.\n' +
      '- ==3. Adesão, evasão imunológica e tempestade inflamatória==: proteínas de superfície (incluindo adesinas da família *Lig*) ancoram a bactéria a componentes da matriz extracelular. As linhagens patogênicas interferem na cascata do complemento e inibem a atividade da mieloperoxidase neutrofílica, resistindo à eliminação sanguínea inicial. Em paralelo, componentes bacterianos (PAMPs) ativam receptores de reconhecimento de padrões — sobretudo ==TLR2 e receptores NOD-like (NLRs)== — desencadeando liberação de citocinas inflamatórias (com destaque para ==TNF-α e IL-10== nos quadros graves), ativação endotelial e recrutamento leucocitário; o mediador ==TGF-β1== tem sido associado à transição para lesão e fibrose renal em hospedeiros incidentais.\n' +
      '- ==4. Eliminação sanguínea versus persistência em sítios imunoprivilegiados==: quando o hospedeiro monta resposta imune humoral adquirida (geralmente após a primeira semana), as bactérias são depuradas do sangue e da maioria dos órgãos, mas podem persistir no lúmen dos ==túbulos renais== e no ==olho==. ==Rigor translacional==: grande parte dos mecanismos moleculares foi demonstrada em modelos experimentais ou culturas celulares, nem sempre correspondendo a alvos terapêuticos validados na clínica canina.',
  },

  pathophysiology: {
    leptoFisiopatologiaRenalTubularEGlomerular:
      'Para compreender por que a leptospirose pode produzir simultaneamente azotemia, poliúria, glicosúria com glicemia normal e hipocalemia paradoxal, é necessário partir da fisiologia básica do néfron: o ==glomérulo== filtra o plasma, o ==túbulo proximal== reabsorve a maior parte da água, sódio, glicose, bicarbonato e proteínas de baixo peso molecular, e os segmentos ==distais e ductos coletores== ajustam a concentração final da urina sob ação de aldosterona e vasopressina (ADH). Por isso, uma injúria tubular intensa compromete a homeostase antes mesmo de zerar a filtração glomerular.\n\n' +
      '- ==Etapa 1 — Colonização e nefrite tubulointersticial aguda==: após chegada hematogênica, as leptospiras atravessam os capilares peritubulares, atingem o interstício e o epitélio tubular e desencadeiam degeneração, apoptose e necrose tubular aguda, associadas a edema intersticial e infiltrado inflamatório misto que comprometem a microcirculação renal.\n' +
      '- ==Etapa 2 — Falência da reabsorção tubular e poliúria azotêmica==: a lesão do epitélio proximal reduz a expressão de transportadores de sódio; a menor reabsorção proximal aumenta a oferta distal de sódio e promove ==perda urinária de potássio== (explicando por que cães com LRA leptospírica — inclusive oligúricos em fases iniciais — podem exibir hipocalemia ou normocalemia paradoxal). A falha proximal também impede a recuperação de glicose (gerando ==glicosúria normoglicêmica==) e de pequenas proteínas (proteinúria tubular). Somada à redução da resposta dos ductos coletores medulares internos à vasopressina (==diabetes insípido nefrogênico adquirido==), a urina permanece isostenúrica ou hipostenúrica mesmo diante de desidratação e azotemia.\n' +
      '- ==Etapa 3 — Queda acentuada da filtração glomerular (TFG)==: à medida que edema intersticial, obstrução tubular por cilindros celulares, vasoconstrição arteriolar e lesão endotelial progridem, ocorre queda abrupta da TFG → retenção de ureia, creatinina, fósforo e ácidos orgânicos → síndrome urêmica (anorexia, vômitos, depressão). Na LRA grave, ==oligúria ou anúria== substituem a poliúria, fazendo emergir hipercalemia ameaçadora, acidose metabólica e alto risco de sobrecarga hídrica.\n' +
      '- ==Etapa 4 — Acometimento glomerular concomitante==: embora o modelo clássico enfatize lesão tubulointersticial, estudos anatomopatológicos e eletroforese urinária demonstram que ==lesão glomerular (incluindo glomerulonefrite exsudativa e perda de proteínas de alto peso molecular)== também ocorre em parcela relevante dos cães {{ref:ref-sykes-acvim-2023}} {{ref:ref-hilbe-2024}}. Assim, presença de proteinúria significativa não exclui leptospirose nem obriga a assumir glomerulopatia primária isolada.',

    leptoFisiopatologiaHepaticaColestatica:
      'Uma dúvida frequente no plantão é por que tantos cães com leptospirose ficam intensamente ictéricos com elevação apenas discreta a moderada de ALT.\n\n' +
      '- ==Mecanismo colestático predominante==: diferentemente de hepatites primariamente necrosantes (que destroem grande massa de hepatócitos e liberam concentrações altíssimas de aminotransferases), na leptospirose as espiroquetas invadem o espaço intercelular, reduzem moléculas de adesão como a ==E-caderina== e causam ==desorganização da arquitetura das placas hepatocelulares e das junções canaliculares==. A sequência resultante é: disfunção das junções intercelulares e dos canalículos biliares → bloqueio funcional do transporte e excreção de bile → retenção de bilirrubina conjugada → hiperbilirrubinemia e icterícia desproporcionais ao grau de necrose hepatocelular.\n' +
      '- ==Fatores amplificadores e alerta diagnóstico==: inflamação sistêmica e ==pancreatite concomitante== agravam a colestase e elevam ainda mais a bilirrubina sérica. Portanto, hiperbilirrubinemia marcante na leptospirose não equivale automaticamente a necrose hepática irreversível. Por outro lado, cães com ALT na casa dos milhares acompanhada de sinais francos de falência sintética hepática (hipoglicemia persistente, hipocolesterolemia severa e coagulopatia por deficiência de síntese) têm menor probabilidade de apresentar leptospirose como causa isolada e devem ser avaliados para outras hepatopatias agudas.',

    leptoFisiopatologiaPulmonarLphs:
      'A ==síndrome de hemorragia pulmonar leptospírica (LPHS)== representa uma das manifestações de maior letalidade na espécie canina.\n\n' +
      '- ==Quebra da barreira alvéolo-capilar==: em condições fisiológicas, a membrana alvéolo-capilar permite troca gasosa eficiente mantendo eritrócitos restritos ao leito capilar. Na LPHS, uma combinação multifatorial de injúria endotelial, mediadores inflamatórios, mecanismos imunomediados e fatores bacterianos rompe a integridade dessa barreira — curiosamente com ==escassez de espiroquetas no parênquima pulmonar e ausência de infiltrado inflamatório exuberante ou vasculite necrosante predominante== na histopatologia.\n' +
      '- ==Shunt intrapulmonar e hipoxemia==: o extravasamento de sangue para o interior dos alvéolos preenche unidades pulmonares que continuam perfundidas, porém sem ventilação eficaz, gerando ==shunt intrapulmonar== e hipoxemia rapidamente progressiva (frequentemente pouco responsiva apenas a suplementação simples de oxigênio nos casos graves).\n' +
      '- ==Duas armadilhas fatais no plantão==: (1) a ==hemoptise pode estar completamente ausente== mesmo diante de hemorragia alveolar extensa; e (2) a LPHS ==pode ocorrer sem trombocitopenia profunda e com TP e TTPa normais== — exames convencionais de coagulação normais jamais descartam LPHS {{ref:ref-sykes-acvim-2023}}.',

    leptoHemostasiaTromboinflamacaoEOutrosOrgaos:
      'A inflamação microvascular sistêmica explica o amplo espectro extrarrenal da doença:\n\n' +
      '- ==Hemostasia e tromboinflamação==: a ativação endotelial eleva mediadores pró-coagulantes e promove ativação, adesão e consumo plaquetário (além de possível fagocitose por células de Kupffer, destruição imunomediada ou sequestro esplênico), produzindo ==trombocitopenia== — cuja intensidade se correlaciona em coortes caninas com gravidade pulmonar e maior mortalidade. O fibrinogênio frequentemente eleva-se inicialmente como proteína de fase aguda, mas quadros graves evoluem para coagulopatia de consumo e ==coagulação intravascular disseminada (CID)== (prolongamento de TP/TTPa, queda de antitrombina e fibrinogênio, elevação de D-dímero).\n' +
      '- ==Outros órgãos-alvo==: vasculite (edema periférico e efusões cavitárias discretas), ==miosite== (dor muscular generalizada, relutância em caminhar e aumento de CK), ==lesão miocárdica/miocardite== (arritmias ventriculares e aumento de troponina I cardíaca), ==uveíte anterior== (com possível extravasamento de bilirrubina sérica para o humor aquoso) e hemorragias retinianas, ==pancreatite aguda==, enterite/íleo paralítico (com relatos raros de ==intussuscepção intestinal== secundária) e relatos isolados de calcificação cutânea ou sistêmica em cães jovens.',
  },

  clinicalSignsPathophysiology: {
    leptoEvolucaoTemporalEApresentacoes:
      'A apresentação clínica é altamente variável e depende da carga infectante, virulência da cepa, idade e resposta imune do animal. Embora didaticamente se descreva uma fase inicial leptospirêmica inespecífica (febre, tremores, apatia, hiporexia e hiperestesia muscular — antes da soroconversão), seguida pela fase de expressão orgânica (renal, hepatobiliar, pulmonar e hemostática) e posterior convalescença com recuperação completa ou lesão renal residual, ==não se deve encarar essa sequência como cronologia rígida==: formas hiperagudas fulminantes podem evoluir rapidamente para choque, hemorragia ou insuficiência respiratória antes mesmo de icterícia ou azotemia avançada.\n\n' +
      '- ==Sobreposição multissistêmica real==: em grande coorte europeia de 298 cães com leptospirose aguda, o envolvimento renal esteve presente em 99,7% dos animais (com oligúria/anúria em 30%), alterações pulmonares em 68,8%, hiperbilirrubinemia hepática em 35,4% e sinais compatíveis com CID em 18,4% — sendo o acometimento simultâneo de dois ou mais sistemas a regra (~75% dos pacientes).',

    leptoTabelaSinaisPorSistema: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Sinais clínicos por sistema orgânico, mecanismo e implicação prática',
      headers: ['Sistema', 'Manifestações clínicas', 'Mecanismo fisiopatológico e implicação'],
      rows: [
        [
          'Sistêmico',
          'Febre (geralmente precoce), apatia, tremores, depressão mental',
          'Resposta inflamatória sistêmica, uremia e distúrbios metabólicos; temperatura normal ou baixa não exclui leptospirose.',
        ],
        [
          'Muscular',
          'Dor muscular difusa, rigidez, relutância para caminhar',
          'Miosite e inflamação sistêmica; investigar elevação de creatina quinase (CK) e oferecer analgesia segura (opioides).',
        ],
        [
          'Renal inicial',
          'Poliúria e polidipsia (PU/PD), às vezes como sinal inicial predominante',
          'Disfunção tubular proximal e resistência medular à vasopressina (diabetes insípido nefrogênico adquirido).',
        ],
        [
          'Renal avançado',
          'Oligúria, anúria, vômitos, úlceras orais, prostração profunda',
          'Queda grave da TFG e síndrome urêmica; risco elevado de hipercalemia e sobrecarga hídrica — avaliar diálise precocemente.',
        ],
        [
          'Hepatobiliar',
          'Icterícia de mucosas/esclera, hiporexia, vômitos',
          'Desarranjo de placas hepatocelulares e colestase canalicular, frequentemente amplificada por pancreatite.',
        ],
        [
          'Respiratório',
          'Taquipneia, aumento do esforço respiratório, tosse, hipoxemia (hemoptise nem sempre presente)',
          'Hemorragia intra-alveolar (LPHS), edema por sobrecarga hídrica, pneumonia aspirativa ou acidose; diferenciar a causa antes de usar diuréticos.',
        ],
        [
          'Hemostático',
          'Petéquias, equimoses, melena, hematoquezia, epistaxe, hematúria',
          'Trombocitopenia, dano endotelial e/ou coagulopatia de consumo/CID.',
        ],
        [
          'Cardiovascular',
          'Taquicardia, arritmias ventriculares, sinais de hipoperfusão',
          'Miocardite/lesão miocárdica, hipercalemia, hipovolemia ou choque sistêmico; solicitar ECG e troponina conforme sinais.',
        ],
        [
          'Gastrointestinal',
          'Vômitos, diarreia, dor abdominal, eventual íleo/intussuscepção',
          'Uremia, gastroenterite, pancreatite concomitante e dismotilidade.',
        ],
        [
          'Ocular',
          'Conjuntivite, injeção escleral, uveíte anterior, hemorragias retinianas',
          'Inflamação intraocular, persistência bacteriana em sítio imunoprivilegiado e lesão vascular.',
        ],
        [
          'Reprodutivo',
          'Abortamento, natimortos ou infertilidade',
          'Descrito em cadelas reprodutoras, porém incomum na rotina de pequenos animais.',
        ],
      ],
    },

    findingsBySystem: [
      {
        system: 'renal',
        findings: [
          {
            finding: 'Poliúria/polidipsia precoce evoluindo ou não para oligúria/anúria e dor à palpação renal',
            mechanism: 'Nefrite tubulointersticial aguda, resistência à vasopressina e queda progressiva da filtração glomerular.',
            clinicalMeaning: 'Todo cão com LRA sem causa óbvia deve ter leptospirose investigada; a produção urinária dita toda a estratégia de fluidos e a indicação de diálise {{ref:ref-sykes-acvim-2023}}.',
          },
        ],
      },
      {
        system: 'gastrointestinal',
        findings: [
          {
            finding: 'Icterícia, vômitos, anorexia, dor abdominal e diarreia (eventualmente melena)',
            mechanism: 'Colestase canalicular intra-hepática, síndrome urêmica, pancreatite concomitante e vasculite/enterite.',
            clinicalMeaning: 'Icterícia desproporcional à ALT sugere colestase leptospírica; vômitos impedem doxiciclina VO e exigem betalactâmico IV inicial.',
          },
        ],
      },
      {
        system: 'respiratory',
        findings: [
          {
            finding: 'Taquipneia silenciosa ou esforço respiratório progressivo, com ou sem hemoptise',
            mechanism: 'Hemorragia intra-alveolar (LPHS) com shunt intrapulmonar, podendo coexistir com edema hidrostático por sobrecarga hídrica.',
            clinicalMeaning: 'Ausculta normal não exclui LPHS inicial — solicitar radiografia torácica na admissão e vigiar a tendência da frequência respiratória {{ref:ref-sykes-acvim-2023}}.',
          },
        ],
      },
      {
        system: 'hematologic',
        findings: [
          {
            finding: 'Petéquias, equimoses, epistaxe, hematúria ou melena',
            mechanism: 'Ativação/consumo plaquetário, injúria endotelial e eventual progressão para CID.',
            clinicalMeaning: 'Trombocitopenia eleva a suspeita clínica em cães com LRA e se correlaciona com maior gravidade pulmonar.',
          },
        ],
      },
      {
        system: 'musculoskeletal',
        findings: [
          {
            finding: 'Hiperestesia muscular generalizada, rigidez e relutância para se movimentar',
            mechanism: 'Miosite inflamatória/necrótica associada à infecção sistêmica.',
            clinicalMeaning: 'Frequente na fase aguda; dosar CK e utilizar analgesia com opioides (nunca AINEs).',
          },
        ],
      },
      {
        system: 'ocular',
        findings: [
          {
            finding: 'Injeção escleral, conjuntivite, uveíte anterior ou hemorragias retinianas',
            mechanism: 'Dano vascular inflamatório e persistência de espiroquetas no olho.',
            clinicalMeaning: 'Exige exame oftálmico dirigido, podendo haver coloração amarelada do humor aquoso em pacientes ictéricos.',
          },
        ],
      },
    ],

    physicalExamFindings: [
      'Perfusão e balanço inicial: registrar peso corporal exato (referência indispensável para vigiar ganho hídrico), temperatura (febre costuma ser precoce e pode já ter cedido), FC, qualidade de pulso, TPC, pressão arterial sistêmica, turgor/mucosas e estado mental.',
      'Respiratório seriado: acompanhar a tendência da frequência respiratória e do esforço inspiratório/expiratório; a piora discreta e progressiva frequentemente precede hipoxemia franca, e ausculta normal não afasta LPHS precoce.',
      'Abdome e rins: palpar suavemente em busca de renomegalia/dor renal, desconforto cranial sugestivo de pancreatite, distensão gástrica ou alças dolorosas (atentando para raros casos de intussuscepção).',
      'Mucosas, pele, olhos e músculos: inspecionar escleras e frênulo lingual para icterícia discreta, pele/mucosas para petéquias ou equimoses, avaliação oftálmica para uveíte/hemorragia retiniana, ausculta/ECG para arritmias e palpação muscular para mialgia.',
    ],

    particularidadesCaninasEFelinas:
      '- Cães: principal espécie com doença clínica bem definida — a associação de doença sistêmica aguda, poliúria/oligúria e azotemia (com ou sem icterícia, trombocitopenia ou sinais respiratórios) é altamente sugestiva mesmo com temperatura normal, em qualquer porte, idade ou ambiente urbano {{ref:ref-sykes-acvim-2023}}.\n' +
      '- Gatos: são relativamente resistentes à doença clínica grave, porém podem infectar-se (sobretudo após caçar roedores), soroconverter e eliminar leptospiras viáveis na urina {{ref:ref-andityas-2024}} {{ref:ref-abcd-2026}}. Quando adoecem, o quadro tende a ser inespecífico (letargia, anorexia, PU/PD, LRA sem icterícia proeminente ou ocasionalmente doença efusiva). A leptospirose deve entrar no diferencial de LRA felina sem causa evidente com histórico de caça/acesso externo, mas os critérios confirmatórios caninos da ACVIM não devem ser aplicados automaticamente aos felinos {{ref:ref-pathogens-cats-2026}}.',
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico passo a passo — Investigação na emergência e internação',
      subtitle: 'Expanda cada etapa para alinhar critérios ACVIM 2023, coleta pré-antibiótico, PCR, MAT pareado e imagem.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Admissão · Triagem de gravidade',
          speciesTag: 'both',
          title: 'Reconhecer a suspeita e mapear lesão orgânica imediatamente',
          quickSummary:
            'Investigue leptospirose em todo cão com LRA sem causa óbvia e em doenças febris agudas com risco epidemiológico, solicitando painel basal completo e radiografia torácica.',
          quickFacts: [
            { label: 'Creatinina inicial', value: 'Pode estar normal na fase febril precoce' },
            { label: 'Tórax na admissão', value: 'Radiografar mesmo sem dispneia' },
          ],
          details: [
            {
              label: 'Atenção à fase pré-azotêmica',
              content:
                'Em cães com doença febril aguda e exposição compatível, a creatinina pode ainda estar dentro da referência no dia 1; repita bioquímica e urinálise em intervalo curto se o quadro persistir {{ref:ref-sykes-acvim-2023}}.',
              tone: 'warning',
            },
            {
              label: 'Padrão clinicopatológico de alta suspeita',
              content:
                'Azotemia + hipocalemia + glicosúria normoglicêmica + trombocitopenia + hiperbilirrubinemia aumentam fortemente a probabilidade pré-teste, mas não dispensam testes etiológicos nem exclusão de coinfecções.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Pré-antibiótico · Coleta dupla',
          speciesTag: 'both',
          title: 'Colher PCR de sangue (EDTA) + PCR de urina + soro para MAT agudo',
          quickSummary:
            'Como o momento exato da infecção raramente é conhecido na clínica natural, enviar sangue e urina simultaneamente antes do antibiótico maximiza a detecção molecular.',
          quickFacts: [
            { label: 'Anticoagulante PCR', value: 'Usar EDTA (heparina inibe PCR)' },
            { label: 'Vacinação recente', value: 'Não positiva PCR sanguínea (Midence 2012)' },
          ],
          details: [
            {
              label: 'Janela temporal complementar sangue vs. urina',
              content:
                'O sangue é mais sensível na fase leptospirêmica inicial (primeira semana), enquanto a urina torna-se positiva após a colonização renal (com excreção intermitente). Coletar ambas as amostras antes do antibiótico reduz falsos negativos {{ref:ref-sykes-acvim-2023}}.',
              tone: 'evidence',
            },
            {
              label: 'Quando a coleta não pode atrasar o tratamento',
              content:
                'Em paciente instável (choque, LPHS grave, hipercalemia), priorize estabilização e inicie o antimicrobiano logo após coletar o que for seguro — jamais atrase ressuscitação esperando cistocentese.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Internação · Critérios ACVIM 2023',
          speciesTag: 'dog',
          title: 'Classificar corretamente em Caso Provável versus Caso Confirmado',
          quickSummary:
            'Aplique os critérios padronizados ACVIM 2023 (doença sistêmica ≤ 2 semanas + ≥ 2 alterações clinicopatológicas) antes de interpretar resultados microbiológicos ou sorológicos.',
          quickFacts: [
            { label: 'Caso provável', value: 'MAT ≥ 1:800, IgM+ ou PCR urina+' },
            { label: 'Caso confirmado', value: 'MAT ≥ 4× pareado, PCR sangue+ ou cultura+' },
          ],
          details: [
            {
              label: 'Por que PCR urinária positiva é "caso provável" e não "confirmado"',
              content:
                'Cães clinicamente saudáveis podem eliminar DNA leptospírico na urina de forma assintomática (relatos entre 1,5% e >10% em abrigos). Portanto, em um cão doente compatível, a PCR urinária oferece forte apoio, mas não prova isoladamente causalidade {{ref:ref-sykes-acvim-2023}}.',
              tone: 'warning',
            },
            {
              label: 'Armadilha da vacinação no MAT e testes rápidos',
              content:
                'Vacinas podem elevar títulos MAT (até ≥1:6400 por ~15 semanas ou até 12 meses em pequena parcela) e positivar testes rápidos IgM por até 12 semanas; sempre registre a data e o tipo da última vacina.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Imagem · Tórax e Abdome',
          speciesTag: 'both',
          title: 'Integrar radiografia torácica e ultrassonografia abdominal',
          quickSummary:
            'Radiografias torácicas rastreiam LPHS subclínica, enquanto a ultrassonografia avalia parênquima renal, líquido perirrenal, pâncreas, fígado e descarta obstrução urinária.',
          quickFacts: [
            { label: 'LPHS inicial', value: 'Opacidades intersticiais caudodorsais' },
            { label: 'Ultrassom renal', value: 'Não é patognomônico; exclui obstrução' },
          ],
          details: [
            {
              label: 'Dinâmica pulmonar e papel da TC',
              content:
                'Série prospectiva em 10 cães (JVIM 2026) com gasometria e TC seriadas (dias 1, 4 e 8) mostrou hipoxemia em 50% (PaO₂ mediana ~56,6 mmHg) e evolução dinâmica das lesões — reforçando vigilância seriada, embora a radiografia siga como exame de primeira linha {{ref:ref-jvim-pulmonary-2026}}.',
              tone: 'evidence',
            },
            {
              label: 'Achados abdominais associados',
              content:
                'Renomegalia discreta, hiperecogenicidade cortical, banda medular hiperecogênica, perda de definição corticomedular, pielectasia discreta, fluido perirrenal e sinais de pancreatite apoiam a suspeita, mas ocorrem em outras causas de LRA.',
              tone: 'default',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: '7–14 dias · Convalescença',
          speciesTag: 'dog',
          title: 'Repetir sorologia MAT no mesmo laboratório para confirmar soroconversão',
          quickSummary:
            'Se o MAT agudo foi negativo ou inconclusivo, colete amostra convalescente 7 a 14 dias depois (preferencialmente na alta ou primeiro retorno) enviando ao mesmo laboratório.',
          quickFacts: [
            { label: 'Critério confirmatório', value: 'Aumento ≥ 4 vezes (ex.: 1:200 → 1:800)' },
            { label: 'Atenuação possível', value: 'Antibiótico precoce pode reduzir o pico' },
          ],
          details: [
            {
              label: 'Por que enviar ao mesmo laboratório e não esperar > 2 semanas',
              content:
                'Há variação interlaboratorial na leitura e no painel de antígenos vivos do MAT; além disso, aguardar muito além de 14 dias pode perder o pico ascendente de anticorpos.',
              tone: 'tip',
            },
            {
              label: 'Conduta específica em gatos',
              content:
                'Nos felinos com LRA inexplicada e histórico de caça, PCR urinária/sanguínea e MAT podem apoiar a investigação, mas ainda faltam pontos de corte validados equivalentes aos do cão {{ref:ref-abcd-2026}}.',
              tone: 'default',
            },
          ],
        },
      ],
    },

    leptoCriteriosAcvim2023:
      'O consenso ACVIM 2023 padronizou critérios clínicos e laboratoriais para classificar cães suspeitos em ==caso provável== ou ==caso confirmado== {{ref:ref-sykes-acvim-2023}}. Para aplicar a classificação etiológica, o cão deve primeiro cumprir ==ambos os critérios clínicos (A + B)==:\n\n' +
      '- ==Critério A (apresentação aguda)==: início de doença sistêmica nas últimas ==2 semanas==, manifestada por febre, letargia, poliúria, polidipsia, anorexia ou combinação desses sinais, com ou sem manifestações gastrointestinais, pulmonares, oculares, hemorrágicas, renais ou ictéricas.\n' +
      '- ==Critério B (pelo menos 2 alterações clinicopatológicas ou de imagem)==: (1) leucocitose neutrofílica, com ou sem desvio à esquerda; (2) trombocitopenia; (3) evidência bioquímica de LRA; (4) hepatopatia colestática; (5) evidência bioquímica de pancreatite; (6) elevação de creatina quinase (CK); (7) glicosúria normoglicêmica; (8) piúria ou cilindros granulosos na urinálise; (9) radiografia torácica compatível com LPHS; (10) ultrassonografia abdominal compatível com lesão renal, pancreática ou fluido perirrenal; ou (11) arritmia documentada ou elevação de troponina cardíaca.',

    leptoTabelaCriteriosAcvim: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Classificação padronizada ACVIM 2023 para leptospirose canina (atendidos os critérios clínicos A + B)',
      headers: ['Classificação', 'Evidência microbiológica ou sorológica exigida', 'Interpretação clínica crítica'],
      rows: [
        [
          'Caso provável',
          'MAT ≥ 1:800 em amostra única de soro; OU teste rápido IgM agudo positivo; OU PCR positiva em urina; OU visualização por microscopia em campo escuro em laboratório de referência',
          'Fornece forte respaldo para manter tratamento e biossegurança, mas isoladamente não exclui reatividade vacinal, exposição prévia ou eliminação urinária assintomática.',
        ],
        [
          'Caso confirmado',
          'Aumento ≥ 4 vezes no título MAT entre amostras pareadas (7–14 dias) no mesmo laboratório; OU PCR positiva em sangue; OU isolamento de Leptospira por cultura em laboratório de referência',
          'Documenta infecção aguda ativa; ainda assim, o início da terapia nunca deve aguardar o preenchimento destes critérios.',
        ],
      ],
    },

    leptoPcrMatETestesRapidos:
      'Nenhum teste etiológico isolado apresenta 100% de sensibilidade e especificidade em todas as fases da doença. A interpretação precisa alinhar método, momento da doença e probabilidade pré-teste:\n\n' +
      '- ==PCR (reação em cadeia da polimerase)==: amplifica alvos específicos de espécies patogênicas (como o gene `lipL32` ou segmentos `16S`/`23S rRNA`). O ==sangue em EDTA== (evitar heparina, que inibe a polimerase) tem maior rendimento na fase leptospirêmica inicial; a ==urina== ganha sensibilidade após colonização renal, mas sofre com excreção intermitente e degradação de DNA em urina ácida. Antibióticos prévios reduzem rapidamente a positividade. A vacinação com bacterinas inativadas ==não gera PCR positiva== no sangue {{ref:ref-midence-2012}}. Nos estudos compilados pela ACVIM, a sensibilidade variou amplamente (por exemplo, 25% no sangue e 69% na urina com especificidade de 100% em uma casuística; ~21% em outro ensaio), refletindo diferenças de protocolo, tempo de coleta e método de referência — e não um número fixo universal {{ref:ref-sykes-acvim-2023}}. Além disso, PCR positiva indica DNA, não necessariamente bactéria viável.\n' +
      '- ==MAT (teste de aglutinação microscópica)==: mede a maior diluição sérica capaz de aglutinar ≥ 50% de antígenos vivos de um painel regional de sorovares (detecta IgM e IgG). Um MAT agudo único com corte > 1:800 apresentou sensibilidade estimada de apenas ==~50%== nos dados da ACVIM porque muitos cães ainda não soroconverteram na admissão. Exemplo confirmatório: título inicial `1:200` subindo para `1:800` em 7–14 dias no mesmo laboratório representa aumento de quatro vezes (duas diluições consecutivas). Limitações críticas: títulos pós-vacinais podem atingir ≥ 1:6400 (geralmente caem em ~15 semanas, mas podem persistir por até 12 meses em minoria), início precoce de antibiótico pode atenuar a elevação e a reatividade cruzada/paradoxal impede identificar o sorovar infectante.\n' +
      '- ==Testes rápidos de anticorpos (point-of-care)==: ensaios de fluxo lateral como `WITNESS Lepto` (baseado em IgM) e `SNAP Lepto` (LipL32, IgG/IgM) oferecem triagem rápida, mas têm desempenho variável por região geográfica e ainda podem permanecer positivos por até 12 semanas após vacinação em parcela dos cães. A ACVIM recomenda cautela antes de substituir o MAT pareado por testes rápidos, especialmente fora dos países onde foram validados {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Entendendo VPP, VPN e razões de verossimilhança (ilustração matemática)==: tomando apenas como exemplo numérico o estudo alemão do `WITNESS` (sensibilidade 76%, especificidade 98,3%), obtém-se `LR+ ≈ 44,7` e `LR− ≈ 0,24`. Numa população com prevalência pré-teste de ==5%==, esse desempenho produziria `VPP ≈ 70%` e `VPN ≈ 98,7%`; porém, se aplicado em população de baixa suspeita com prevalência de ==1%==, o `VPP` despencaria para ==~31%== (maioria de falsos positivos apesar da alta especificidade). Esses cálculos são demonstrações matemáticas do impacto da prevalência, e não validações prospectivas do kit no Brasil.',

    leptoTabelaTestesRapidosAcvim: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Desempenho clínico observado de testes rápidos de anticorpos em cães (compilação ACVIM 2023)',
      headers: ['Região do estudo', 'Teste avaliado', 'Sensibilidade observada', 'Especificidade observada'],
      rows: [
        ['Nordeste dos EUA', 'SNAP Lepto', '68%', '85%'],
        ['Alemanha', 'WITNESS Lepto', '76%', '98,3%'],
        ['Itália', 'WITNESS Lepto', '71%', '100%'],
        ['Itália', 'SNAP Lepto', '79%', '72%'],
        ['Suíça', 'WITNESS Lepto', '76%', '100%'],
      ],
    },

    leptoTabelaComparativaTestes: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Síntese comparativa dos métodos diagnósticos etiológicos',
      headers: ['Método', 'Melhor janela / aplicação', 'Significado do positivo', 'Principal armadilha'],
      rows: [
        [
          'PCR de sangue (EDTA)',
          'Fase leptospirêmica inicial, antes do antibiótico',
          'DNA leptospírico circulante; confirmatório (ACVIM) se critérios clínicos presentes',
          'Sensibilidade cai rapidamente após 1ª semana ou uso de antimicrobianos; heparina inibe o ensaio.',
        ],
        [
          'PCR de urina',
          'Pesquisa de colonização e eliminação renal',
          'Forte apoio diagnóstico (caso provável); pode indicar eliminação assintomática',
          'Excreção intermitente, antibiótico prévio e degradação de DNA; não diferencia portador de doente isoladamente.',
        ],
        [
          'MAT agudo único',
          'Sorologia basal na admissão',
          'Apoio conforme título (≥1:800 = caso provável) e contexto vacinal',
          'Sensibilidade precoce ~50%; títulos pós-vacinais ou exposição prévia; reatividade cruzada.',
        ],
        [
          'MAT pareado (7–14 d)',
          'Documentar infecção aguda recente',
          'Aumento ≥ 4 vezes no título é confirmatório',
          'Exige mesma instituição laboratorial; antibiótico precoce pode atenuar a resposta.',
        ],
        [
          'Teste rápido (IgM / LipL32)',
          'Apoio clínico inicial rápido',
          'Evidência de resposta humoral anti-Leptospira',
          'Reatividade pós-vacinal (até ~12 semanas), variação geográfica e falsos negativos precoces.',
        ],
        [
          'Cultura (meio EMJH/HAN)',
          'Isolamento e tipagem epidemiológica de sorovar',
          'Demonstra organismo viável (confirmatório)',
          'Lenta (semanas), tecnicamente exigente, risco biológico e baixa sensibilidade na rotina clínica.',
        ],
        [
          'Microscopia campo escuro',
          'Apenas em laboratórios altamente especializados',
          'Visualização direta de espiroquetas móveis',
          'Artefatos fibrinosos/celulares geram falsos positivos e baixa sensibilidade; altamente operador-dependente.',
        ],
        [
          'Histopatologia / Warthin–Starry / IHQ',
          'Biópsia selecionada ou necropsia',
          'Evidência direta de lesão renal/pulmonar e antígeno ou espiroquetas teciduais',
          'Não é exame inicial de rotina; carga tecidual cai drasticamente após antibióticos.',
        ],
      ],
    },

    leptoPerfilLaboratorialExplicado:
      'Os exames laboratoriais gerais revelam o padrão de injúria multiorgânica e orientam diretamente a estabilização antes de qualquer laudo microbiológico:\n\n' +
      '- ==Hemograma e esfregaço sanguíneo==: a ==leucocitose neutrofílica== (com ou sem desvio à esquerda e monocitose) reflete inflamação aguda, embora fases hiperagudas possam apresentar leucopenia transitória e casos raros exibam reações leucemoides (>80 × 10⁹/L). A ==trombocitopenia== decorre de ativação/consumo endotelial e não confirma CID sozinha, mas sua gravidade correlaciona-se com risco pulmonar. A ==anemia discreta a moderada== costuma ser não regenerativa (doença inflamatória/renal), podendo tornar-se hemorrágica em sangramentos gastrointestinais ou LPHS (hemólise direta por toxinas leptospíricas é rara em cães). Na compilação da ACVIM, neutrofilia ocorreu em 27–94%, trombocitopenia em 14–73% e anemia em 18–92% — faixas amplas que espelham a heterogeneidade das populações e não a sensibilidade diagnóstica isolada {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Urinálise explicada==: é o exame que expõe a ==disfunção tubular== por trás da azotemia. Espere ==densidade urinária inadequadamente baixa== (isostenúria ou hipostenúria) frente à azotemia, ==glicosúria normoglicêmica== (defeito proximal altamente sugestivo no cão), ==cilindros granulosos== (degeneração epitelial tubular), ==proteinúria== (tipicamente mista tubular e glomerular à eletroforese, com UPC geralmente menor que na nefrite de Lyme), bilirubinúria, piúria e hematúria variáveis. ==Atenção==: leptospiras não são visíveis no sedimento urinário sob microscopia óptica convencional de rotina; ausência de bacteriúria no sedimento não exclui leptospirose.',

    leptoTabelaBioquimicaEEletrolitos: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Bioquímica sérica e eletrólitos: explicação fisiopatológica e conduta',
      headers: ['Alteração laboratorial', 'Explicação fisiopatológica', 'Interpretação clínica'],
      rows: [
        [
          'Creatinina e ureia elevadas',
          'Queda da taxa de filtração glomerular (presente em >80–90% dos cães em muitas séries, mas ausente em fases muito iniciais)',
          'Define e gradua a LRA (IRIS); acompanhar tendência seriada, nunca um ponto isolado.',
        ],
        [
          'SDMA elevada',
          'Redução da função excretora renal',
          'Complementa a detecção precoce de queda de TFG, mas não identifica a etiologia.',
        ],
        [
          'Hiperfosfatemia',
          'Menor excreção renal de fósforo com queda da TFG',
          'Proporcional à gravidade da disfunção renal; orienta suporte e acompanhamento nutricional posterior.',
        ],
        [
          'Hiponatremia e hipocloremia',
          'Menor expressão de transportadores proximais de Na⁺ e perdas gastrointestinais',
          'Frequentes na LRA leptospírica; evitar correção abrupta em hiponatremia sustentada.',
        ],
        [
          'Hipocalemia (paradoxal)',
          'Perda renal tubular pelo aumento de oferta distal de sódio somada a vômitos/anorexia',
          'Comum na LRA poliúrica e possível mesmo no início de oligúria; repor com cautela monitorando diurese.',
        ],
        [
          'Hipercalemia',
          'Excreção renal insuficiente de K⁺ na oligúria/anúria e acidose metabólica',
          'Emergência arrítmica: realizar ECG, estabilizar miocárdio e avaliar hemodiálise se refratária.',
        ],
        [
          'Acidose metabólica',
          'Retenção de ácidos fixos e perda tubular de bicarbonato',
          'Agrava hipercalemia e função cardiovascular; monitorar hemogasometria/bicarbonato.',
        ],
        [
          'Bilirrubina elevada',
          'Desarranjo das junções canaliculares biliares (colestase intra-hepática) ± pancreatite',
          'Pode ser intensa com ALT modesta; valores ≥ 0,6 mg/dL associaram-se a maior risco em coorte prognóstica.',
        ],
        [
          'ALT / AST / ALP / GGT elevadas',
          'Padrão predominantemente colestático (ALP/bilirrubina) com injúria hepatocelular leve a moderada; AST também eleva-se na miosite',
          'Correlacionar AST com CK; ALT nos milhares com falência sintética franca sugere outra hepatopatia.',
        ],
        [
          'Albumina reduzida',
          'Proteína de fase aguda negativa, vasculite/perdas renais ou entéricas e hemodiluição',
          'Achado multifatorial — não significa automaticamente insuficiência hepática.',
        ],
        [
          'CK e troponina I elevadas',
          'Miosite (CK) e injúria miocárdica inflamatória/isquêmica (troponina)',
          'Justificam analgesia apropriada, monitorização eletrocardiográfica e cautela hemodinâmica.',
        ],
        [
          'Lipase pancreática (cPLI) elevada',
          'Pancreatite concomitante e/ou redução da depuração renal',
          'Interpretar junto a ultrassonografia e sinais abdominais; influencia controle de náusea e dor.',
        ],
      ],
    },

    leptoImagemToracicaEAbdominal:
      'A avaliação por imagem complementa a estratificação de risco na admissão e ajuda a descartar emergências cirúrgicas ou obstrutivas:\n\n' +
      '- ==Radiografia torácica (mesmo sem dispneia)==: recomendada pela ACVIM na avaliação inicial de cães suspeitos porque alterações parenquimatosas frequentemente precedem a falência respiratória clínica {{ref:ref-sykes-acvim-2023}}. Na LPHS, o padrão típico inicia com ==opacidades intersticiais bilaterais nos lobos caudodorsais==, podendo progredir para padrão ==reticulonodular/micronodular== e infiltrados ==alveolares difusos== (ocasionalmente acompanhados de discreta efusão pleural). Nenhum padrão é patognomônico, exigindo diferenciação frente a edema por sobrecarga hídrica, pneumonia aspirativa ou insuficiência cardíaca.\n' +
      '- ==Tomografia computadorizada (TC) torácica==: revela alterações mais extensas que a radiografia convencional. Em série prospectiva avaliando 10 cães com leptospirose por gasometria arterial e TC seriada nos dias 1, 4 e 8, metade desenvolveu hipoxemia (PaO₂ mediana ~56,6 mmHg entre os hipoxêmicos), com um óbito por LPHS e mudanças dinâmicas à densitometria {{ref:ref-jvim-pulmonary-2026}}. Ainda assim, a TC não é necessária rotineiramente e depende de estabilidade clínica.\n' +
      '- ==Ultrassonografia abdominal==: pode mostrar renomegalia leve, espessamento e hiperecogenicidade cortical, banda medular hiperecogênica, perda de diferenciação corticomedular, pielectasia discreta e ==líquido perirrenal==, além de hepatomegalia/esplenomegalia mosqueada, sinais de ==pancreatite== (pâncreas aumentado e hipoecogênico) e espessamento gástrico/intestinal. Esses achados não são específicos de leptospirose, mas são indispensáveis para ==descartar obstrução ureteral/uretral== e avaliar comorbidades abdominais.',

    leptoFiguraRadiografiaLphsSykes: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/leptospirose-caes-gatos/fig2-lphs-radiographs-sykes-2023.jpg',
      fallbackSrc: 'https://cdn.ncbi.nlm.nih.gov/pmc/blobs/ab91/10658540/2824ee647259/JVIM-37-1966-g001.jpg',
      alt: 'Radiografias torácicas laterais de dois cães com síndrome de hemorragia pulmonar leptospírica confirmada',
      shortCaption: 'Fig. 2 — Radiografias torácicas de LPHS: padrão broncointersticial-alveolar difuso (esq.) e micronodular (dir.) (ACVIM 2023).',
      caption:
        'Figura 2 — Radiografias torácicas de dois cães com síndrome de hemorragia pulmonar leptospírica (LPHS) confirmada. À esquerda: padrão broncointersticial-alveolar difuso; à direita: padrão micronodular/reticulonodular. Ilustra por que a radiografia torácica deve ser obtida precocemente mesmo antes de hemoptise franca, sempre diferenciando hemorragia alveolar de edema por sobrecarga hídrica. Fonte: Sykes JE et al. (2023), *Updated ACVIM consensus statement on leptospirosis in dogs*, *Journal of Veterinary Internal Medicine*, 37:1966–1982, Figura 1 (DOI: 10.1111/jvim.16903). Licença do artigo: CC BY-NC-ND 4.0 (uso comercial e adaptações requerem autorização específica).',
      display: 'default',
    },

    leptoAnatomopatologiaRenal:
      'A anatomopatologia ajuda a compreender os achados laboratoriais e a evolução crônica: macroscopicamente, cães com quadro agudo exibem icterícia variável, petéquias/equimoses, pulmões pesados, úmidos e vermelho-escuros na LPHS e rins levemente aumentados e pálidos ou moteados; sobreviventes com sequela crônica podem desenvolver rins retraídos e irregulares com fibrose intersticial.\n\n' +
      '- ==Além da nefrite tubulointersticial (Hilbe et al., 2024)==: em estudo anatomopatológico de 37 cães selecionados com ==glomerulonefrite exsudativa== associada à leptospirose aguda (com preenchimento do espaço glomerular por fibrina e eritrócitos), ==32/37== exibiam necrose tubular aguda concomitante, ==29/37== nefrite intersticial e ==27/30== dos casos com pulmões avaliados apresentavam hemorragia pulmonar {{ref:ref-hilbe-2024}}. Como a amostra foi selecionada pela presença de lesão glomerular, o estudo não mede a prevalência de glomerulonefrite em todos os cães com leptospirose, mas consolida a existência de dano glomerular direto ao lado da lesão tubular.',

    leptoFiguraHistopatologiaHilbe: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/leptospirose-caes-gatos/fig3-glomerulonephritis-hilbe-2024.jpg',
      fallbackSrc: 'https://journals.sagepub.com/cms/10.1177/03009858231207020/asset/0cc4cd58-25ce-415f-b770-3907a9a7d0d6/assets/images/large/10.1177_03009858231207020-fig1.jpg',
      alt: 'Painéis histopatológicos de rim canino com leptospirose mostrando glomerulonefrite exsudativa em HE, espiroquetas em Warthin-Starry e positividade em imuno-histoquímica',
      shortCaption: 'Fig. 3 — Glomerulonefrite exsudativa, Warthin–Starry e imuno-histoquímica renal na leptospirose canina (Hilbe et al., 2024).',
      caption:
        'Figura 3 — Lesões glomerulares e identificação tecidual de *Leptospira* spp. em cães com leptospirose aguda: painéis em hematoxilina-eosina (a, d) demonstrando glomérulos preenchidos por eritrócitos e fibrina com necrose tubular adjacente; coloração de prata de Warthin–Starry (b, e) evidenciando espiroquetas helicoidais (círculos); e imuno-histoquímica positiva (c, f) localizando antígenos leptospíricos no parênquima renal. Fonte: Hilbe M et al. (2024), *Veterinary Pathology*, 61:453–461, Figura 1 (DOI: 10.1177/03009858231207020). Licença: CC BY 4.0.',
      display: 'default',
    },

    leptoTabelaDiferenciaisPlantao: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Diagnósticos diferenciais prioritários no plantão',
      headers: ['Diagnóstico diferencial', 'Por que confunde na admissão', 'O que ajuda a diferenciar'],
      rows: [
        [
          'Pielonefrite bacteriana',
          'Febre, LRA, dor renal, neutrofilia e piúria',
          'Urocultura quantitativa com antibiograma, ultrassonografia (pielectasia/ecogenicidade pélvica) e investigação etiológica paralela.',
        ],
        [
          'Intoxicação por etilenoglicol',
          'LRA fulminante, acidose metabólica grave e oligúria/anúria',
          'Histórico de exposição, gap osmolar/aniônico acentuado, cristalúria de oxalato de cálcio monoidratado, hipocalcemia e teste específico quando disponível.',
        ],
        [
          'Nefrotoxicidade por AINEs / aminoglicosídeos / uvas e passas',
          'Azotemia aguda, vômitos, cilindrúria e possível oligúria',
          'Anamnese medicamentosa/dietética minuciosa e ausência de colestase/LPHS típicas (embora investigação etiológica possa ser necessária se dúvida).',
        ],
        [
          'Obstrução ureteral ou uretral',
          'Azotemia aguda, hipercalemia e anúria',
          'Ultrassonografia abdominal (hidronefrose, hidroureter, urolitíase) e avaliação vesical/uretral imediata.',
        ],
        [
          'Erliquiose, anaplasmose e babesiose',
          'Febre, apatia, trombocitopenia e possível lesão renal ou icterícia (e podem coexistir)',
          'Esfregaço sanguíneo capilar/venoso, PCR/sorologia específicos para hemoparasitos e avaliação de hemólise ativa.',
        ],
        [
          'Hepatite infecciosa canina (CAV-1)',
          'Hepatopatia aguda, febre, coagulopatia e alterações oculares',
          'Histórico vacinal, padrão predominantemente hepatocelular intenso e testes moleculares para adenovírus canino tipo 1.',
        ],
        [
          'Colangite, obstrução biliar extra-hepática e pancreatite primária',
          'Icterícia, dor abdominal e vômitos',
          'Ultrassonografia hepatobiliar/pancreática (dilatação de ductos/vesícula), cPLI e exclusão de azotemia tubular típica.',
        ],
        [
          'Sepse de outra origem',
          'Inflamação sistêmica, trombocitopenia, icterícia e disfunção multiorgânica',
          'Busca ativa de foco infeccioso (piometra, peritonite, pneumonia, endocardite) e culturas microbiológicas direcionadas.',
        ],
        [
          'Hemorragia pulmonar não leptospírica / edema pulmonar',
          'Hipoxemia aguda e infiltrados intersticiais/alveolares',
          'Avaliação de rodenticidas anticoagulantes, hemostasia completa, ecocardiografia/POCUS torácico e exclusão de trauma ou tromboembolismo.',
        ],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo terapêutico interativo — Estabilização, antimicrobianos e UTI',
      subtitle: 'Expanda cada etapa para revisar fluidoterapia individualizada, doses auditadas, eletrólitos, LPHS e indicação de diálise.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Primeiros minutos · ABCDE + EPI',
          speciesTag: 'both',
          title: 'Estabilizar via aérea, oxigenação e circulação com proteção de contato',
          quickSummary:
            'Corrija hipóxia e choque antes de procedimentos eletivos, reduzindo estresse em dispneicos e instituindo luvas e proteção ocular no manejo de urina.',
          quickFacts: [
            { label: 'Prioridade absoluta', value: 'Perfusão + O₂ sem sobrecarga' },
            { label: 'Biossegurança', value: 'Atenção máxima nas 1ªs 48 h' },
          ],
          details: [
            {
              label: 'Três frentes simultâneas do tratamento',
              content:
                'Erradicar a bactéria (impedindo multiplicação e persistência renal), preservar perfusão e equilíbrio hidroeletrolítico sem afogar o pulmão, e sustentar os órgãos até a regeneração tubular — melhora microbiológica ocorre bem antes da recuperação renal.',
              tone: 'tip',
            },
            {
              label: 'AINEs estritamente proibidos',
              content:
                'Nunca administre anti-inflamatórios não esteroidais (mesmo diante de febre ou dor muscular intensa): eles reduzem a vasodilatação aferente mediada por prostaglandinas e agravam dramaticamente a LRA e sangramentos gastrointestinais.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Antimicrobianos · Duas fases',
          speciesTag: 'both',
          title: 'Iniciar doxiciclina VO ou betalactâmico IV com transição obrigatória',
          quickSummary:
            'Em cães, use doxiciclina 5 mg/kg VO q12h por 14 dias; se houver vômitos ou intolerância oral, inicie ampicilina IV (ajustada na LRA grave) e mude para doxiciclina assim que tolerado.',
          quickFacts: [
            { label: 'Cães (ACVIM 2023)', value: 'Doxiciclina 5 mg/kg VO q12h × 14 d' },
            { label: 'Gatos (ABCD 2026)', value: 'Doxiciclina 5 mg/kg VO q12h × 21 d*' },
          ],
          details: [
            {
              label: 'Por que penicilina isolada não basta',
              content:
                'Betalactâmicos controlam rapidamente a leptospiremia sistêmica, mas têm eficácia inferior para erradicar o estado portador nos túbulos renais; completar 14 dias de doxiciclina em cães é essencial {{ref:ref-sykes-acvim-2023}}.',
              tone: 'evidence',
            },
            {
              label: 'Ajuste de penicilinas na LRA IRIS grau IV e cuidados em gatos',
              content:
                'Em cães com LRA IRIS grau IV ou superior (creatinina > 5 mg/dL), duplique o intervalo das penicilinas (ex.: q6–8h → q12–16h); a doxiciclina não exige essa redução por eliminação predominantemente intestinal. Em gatos, nunca administrar comprimido a seco (oferecer alimento ou ≥ 5 mL de água) e lembrar que o protocolo ABCD de 21 dias baseia-se em evidência felina limitada {{ref:ref-abcd-2026}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Fluidos · Precisão volumétrica',
          speciesTag: 'both',
          title: 'Individualizar fluidoterapia sem "diurese forçada"',
          quickSummary:
            'Diferencie hipoperfusão, desidratação e perdas contínuas; calcule o balanço hídrico real (incluindo flushes, fármacos e nutrição) e vigie peso e diurese a cada poucas horas.',
          quickFacts: [
            { label: 'Bolus choque (IRIS 2024)', value: 'Cães 10–20 mL/kg · Gatos 5–10 mL/kg' },
            { label: 'Sobrecarga hídrica', value: 'Risco máximo em oligúria/anúria e LPHS' },
          ],
          details: [
            {
              label: 'Dois extremos opostos na mesma doença',
              content:
                'Enquanto cães francamente poliúricos podem perder grandes volumes e exigir altas taxas de reposição de perdas medidas (excepcionalmente > 20 mL/kg/h em perdas maciças comprovadas), cães anúricos acumulam fluido mesmo em taxas convencionais {{ref:ref-sykes-acvim-2023}} {{ref:ref-iris-aki-2024}}.',
              tone: 'warning',
            },
            {
              label: 'Não confundir LPHS com sobrecarga — nem agravar uma com a outra',
              content:
                'Aumento de peso corporal, edema subcutâneo, congestão venosa e taquipneia sinalizam sobrecarga; porém, piora respiratória sem hipervolemia pode ser progressão da LPHS (onde furosemida rotineira não é indicada).',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Eletrólitos · Nutrição · Dor',
          speciesTag: 'both',
          title: 'Corrigir potássio conforme diurese e instituir nutrição precoce',
          quickSummary:
            'Reponha potássio com teto habitual de 0,5 mEq/kg/h na hipocalemia poliúrica; trate hipercalemia ameaçadora com cálcio + insulina/glicose; controle vômitos/dor e alimente precocemente.',
          quickFacts: [
            { label: 'Teto K⁺ IV (AAHA)', value: '≤ 0,5 mEq/kg/h (suspender se oligúria)' },
            { label: 'Dieta aguda (ACVIM)', value: 'Alta digestibilidade, proteína normal a alta' },
          ],
          details: [
            {
              label: 'Emergência de hipercalemia (IRIS 2024)',
              content:
                'Diante de alterações eletrocardiográficas ou K⁺ grave: (1) gluconato de cálcio para estabilizar o miocárdio (não reduz K⁺ sérico); (2) insulina regular 0,25–0,5 UI/kg IV associada a ~1 g de glicose por UI (com monitorização glicêmica seriada e infusão complementar de glicose); (3) restaurar excreção ou encaminhar para diálise {{ref:ref-iris-aki-2024}}.',
              tone: 'danger',
            },
            {
              label: 'Por que evitar dieta renal hipoproteica automática na fase aguda',
              content:
                'Na LRA aguda altamente catabólica, a ACVIM 2023 recomenda dieta altamente digestível com aporte energético e proteico normal a elevado para limitar perda muscular e apoiar reparo tecidual — reavaliando restrição proteica apenas se persistir DRC após a fase aguda {{ref:ref-sykes-acvim-2023}}.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'LPHS · Hemostasia',
          speciesTag: 'both',
          title: 'Conduzir suporte respiratório e hemoterapia guiados por fisiologia',
          quickSummary:
            'Oferte oxigênio suplementar (e ventilação mecânica se falência respiratória) e reserve hemocomponentes para anemia sintomática ou sangramento ativo com coagulopatia.',
          quickFacts: [
            { label: 'Concentrado hemácias', value: 'Anemia grave / déficit de transporte de O₂' },
            { label: 'Plasma fresco (PFC)', value: 'Sangramento + déficit de fatores (não repõe plaquetas)' },
          ],
          details: [
            {
              label: 'Trombocitopenia isolada não indica plasma nem transfusão automática',
              content:
                'Individualize cada transfusão considerando hematócrito evolutivo, oxigenação, sangramento ativo e risco de sobrecarga volêmica; vitamina K não corrige rotineiramente a coagulopatia leptospírica {{ref:ref-sykes-acvim-2023}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 6,
          phaseBadge: 'Terapia avançada · Encaminhamento',
          speciesTag: 'both',
          title: 'Discutir hemodiálise precocemente e evitar terapias sem comprovação',
          quickSummary:
            'Encaminhe cedo na LRA IRIS grau IV (Cr > 5 mg/dL), anúria, hipercalemia refratária ou sobrecarga hídrica — não espere falência multiorgânica irreversível.',
          quickFacts: [
            { label: 'Recuperação com diálise', value: '> 80% em séries selecionadas' },
            { label: 'Evitar de rotina', value: 'Corticoides, UDCA e furosemida "para o rim"' },
          ],
          details: [
            {
              label: 'Janela de reversibilidade renal',
              content:
                'A hemodiálise não elimina a bactéria, mas mantém o paciente vivo e equilibrado enquanto o epitélio tubular se regenera; séries de cães com leptospirose submetidos a suporte extracorpóreo relatam recuperação superior a 80% {{ref:ref-sykes-acvim-2023}}.',
              tone: 'evidence',
            },
          ],
        },
      ],
    },

    leptoEstabilizacaoEFluidoterapia:
      'O manejo bem-sucedido atua em ==três objetivos simultâneos==: (1) eliminar a infecção sistêmica e renal; (2) restaurar perfusão e homeostase hidroeletrolítica/ácido-base sem desencadear edema ou agravar LPHS; e (3) sustentar os órgãos afetados enquanto ocorre regeneração celular (que frequentemente leva dias a semanas após o controle microbiológico).\n\n' +
      '- ==Estabilização inicial (ABCDE)==: assegure patência das vias aéreas, avalie frequência/esforço respiratório e SpO₂ (minimizando estresse em dispneicos), examine perfusão/pulsos/PA, cheque glicemia e nível de consciência e institua imediatamente precauções de contato com urina. A coleta etiológica deve preceder o antibiótico sempre que possível, mas ==nunca deve atrasar ressuscitação circulatória ou suporte ventilatório==.\n' +
      '- ==Fluidoterapia — corrigir hipovolemia não significa forçar diurese==: a leptospirose pode gerar dois extremos fisiológicos (paciente poliúrico hipovolêmico vs. paciente oligúrico/anúrico hipervolêmico). Aplicar taxas altas padronizadas a todos é perigoso:\n' +
      '  • *Etapa A — Hipoperfusão*: diante de choque hipovolêmico, utilize cristaloides isotônicos balanceados em bolus individualizados com reavaliação imediata (diretriz IRIS 2024 e AAHA: ==10–20 mL/kg em cães== e ==5–10 mL/kg em gatos== — valores de ressuscitação, jamais taxas de manutenção) {{ref:ref-iris-aki-2024}}. Na suspeita de LPHS ou anúria, pondere o risco de sobrecarga desde o primeiro bolus.\n' +
      '  • *Etapa B — Desidratação*: representa déficit intersticial/intracelular de água (distinto da hipoperfusão); planeje sua reposição conforme estado cardiovascular, eletrólitos e capacidade renal de excreção.\n' +
      '  • *Etapa C — Balanço hídrico real ("ins and outs")*: calcule `fluido necessário = manutenção individualizada + déficit restante + perdas contínuas mensuradas (urina, vômito, diarreia) − água já administrada por outras vias` (medicamentos, flushes, nutrição enteral e hemocomponentes). A ACVIM observa que raros cães com poliúria extrema exigem taxas superiores a 20 mL/kg/h para evitar hipovolemia quando perdas maciças estão comprovadas, enquanto um cão anúrico entra em sobrecarga mesmo sob infusão dita "convencional" {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Reconhecendo sobrecarga hídrica==: ganho de peso corporal desproporcional, taquipneia crescente, queda de SpO₂, secreção respiratória serosa, edema periférico/quemose ou linhas B/congestão à ultrassonografia pulmonar. Lembre-se de sempre diferenciar sobrecarga hídrica da progressão da LPHS.',

    leptoTabelaAntimicrobianosESuporte: {
      kind: 'clinicalTable',
      caption: 'Tabela 11 — Protocolos antimicrobianos e suporte antihipertensivo auditados (ACVIM 2023 · ABCD 2026)',
      headers: ['Fármaco', 'Espécie', 'Dose e via', 'Intervalo e duração', 'Indicação e observações clínicas'],
      rows: [
        [
          'Doxiciclina',
          'Cães',
          '5 mg/kg VO',
          'A cada 12 h por 14 dias',
          'Primeira escolha (ACVIM 2023); trata infecção sistêmica e visa eliminar persistência tubular renal.',
        ],
        [
          'Ampicilina',
          'Cães',
          '20–30 mg/kg IV',
          'A cada 6–8 h (temporariamente)',
          'Alternativa parenteral inicial quando vômitos ou prostração impedem VO; duplicar intervalo na LRA IRIS grau IV (Cr > 5 mg/dL) e transicionar para doxiciclina VO.',
        ],
        [
          'Amoxicilina IV',
          'Cães',
          '20–30 mg/kg IV',
          'A cada 6–8 h (temporariamente)',
          'Alternativa parenteral quando formulação IV estiver disponível; aplicar ajuste renal e transição para doxiciclina.',
        ],
        [
          'Penicilina G',
          'Cães',
          '25.000–40.000 UI/kg IV',
          'A cada 6–8 h (temporariamente)',
          'Alternativa parenteral inicial; ajustar intervalo na disfunção renal grave e completar fase com doxiciclina.',
        ],
        [
          'Doxiciclina',
          'Gatos',
          '5 mg/kg VO',
          'A cada 12 h por 21 dias',
          'Recomendação ABCD 2026 (evidência felina menos robusta que a canina); NUNCA administrar comprimido a seco — oferecer alimento ou ≥ 5 mL de água.',
        ],
        [
          'Ampicilina',
          'Gatos',
          '20 mg/kg IV',
          'A cada 8 h (inicialmente)',
          'Alternativa inicial se VO não tolerada (ABCD 2026); transicionar para doxiciclina assim que tolerado.',
        ],
        [
          'Amoxicilina IV',
          'Gatos',
          '20 mg/kg IV',
          'A cada 12 h (inicialmente)',
          'Alternativa parenteral segundo ABCD 2026, quando disponível.',
        ],
        [
          'Amlodipina',
          'Cães',
          '0,25–0,75 mg/kg/dia VO',
          'Dose diária individualizada',
          'Hipertensão arterial sistêmica persistente após correção de dor e volume; terapia adjuvante (não trata a infecção).',
        ],
      ],
    },

    leptoFarmacologiaDoxiciclinaEAjusteRenal:
      '- ==Auditoria posológica — por que 5 mg/kg q12h e não 10 mg/kg q24h==: embora formulários gerais citem 10 mg/kg VO q24h para infecções variadas em cães e gatos, o ==consenso específico ACVIM 2023 recomenda 5 mg/kg VO a cada 12 horas por 14 dias== para leptospirose canina (mesma dose diária total, com fracionamento que melhora a tolerância gastrointestinal e mantém exposição estável) {{ref:ref-sykes-acvim-2023}}. Na ficha da doença, a diretriz etiológica específica prevalece.\n' +
      '- ==Racional da terapia em duas fases (betalactâmico IV → doxiciclina VO)==: penicilinas IV controlam rapidamente a bacteremia quando o paciente vomita, porém apresentam menor capacidade de erradicar leptospiras dos túbulos renais. Encerrar o tratamento apenas com ampicilina durante a internação sem concluir o ciclo de doxiciclina favorece persistência renal e eliminação urinária prolongada.\n' +
      '- ==Farmacologia aplicada da doxiciclina==: tetraciclina lipossolúvel bacteriostática tempo-dependente que bloqueia reversivelmente a subunidade ribossomal 30S (volume de distribuição ~1,5 L/kg e meia-vida ~10–12 h em cães). Seu grande diferencial na LRA é a ==eliminação predominantemente não renal== (~75% inativada por quelação e excretada pelas fezes por via intestinal não biliar, ~25% renal e <5% biliar), motivo pelo qual ==não se acumula na insuficiência renal== nem exige redução automática pela azotemia.\n' +
      '- ==Segurança, interações e manipulação na internação==:\n' +
      '  • *Esofagite e escolha do sal*: o risco de ulceração e estenose esofágica é particularmente crítico em gatos; ==nunca administrar comprimido ou cápsula a seco== (ofertar alimento úmido ou ≥ 5 mL de água logo após). O sal monoidratado é menos ácido e tende a ser menos irritante que o hiclato, mas a regra de oferecer água/alimento aplica-se a todos os sais.\n' +
      '  • *Interações farmacológicas frequentes na UTI*: o ==sucralfato== reduz drasticamente o pico e a biodisponibilidade da doxiciclina se administrados juntos — administrar o sucralfato apenas ==2 horas depois== da doxiciclina. Produtos orais contendo cátions divalentes/trivalentes (`Al³⁺`, `Ca²⁺`, `Mg²⁺`, `Zn²⁺`, subsalicilato de bismuto) exigem intervalo mínimo de 1–2 horas (e sais de ferro, 3 h antes ou 2 h depois); inibidores de bomba de prótons (omeprazol/pantoprazol) podem reduzir a absorção oral, e fenobarbital acelera sua depuração.\n' +
      '  • *Via intravenosa e estabilidade*: se a doxiciclina IV precisar ser usada como exceção (nunca IM ou SC por necrose local), infundir lentamente ao longo de ≥ 1 hora e ==nunca misturar em linha Y== com ampicilina, penicilina G, furosemida, dexametasona, diazepam, heparina ou bicarbonato de sódio (incompatibilidade física). Suspensões aquosas manipuladas perdem potência rapidamente (>10% em 24 h quando misturadas a água/comida e estabilidade incerta após 7–14 dias refrigeradas); preferir formulações comerciais estáveis sempre que disponíveis.\n' +
      '  • *Fígado e gestação*: elevações leves a moderadas de ALT/ALP ocorrem em até ~40% dos cães e ~19% dos gatos sob doxiciclina (geralmente sem repercussão clínica severa, porém exigem vigilância em hepatopatia avançada); evitar na gestação/lactação salvo quando o benefício materno superar claramente o risco.\n' +
      '- ==Ajuste renal dos betalactâmicos==: diferentemente da doxiciclina, ampicilina e penicilina G dependem fortemente de excreção renal. Em cães com ==LRA IRIS grau IV ou superior (creatinina > 5 mg/dL)==, a ACVIM 2023 propõe ==duplicar o intervalo entre doses== das penicilinas, preservando o pico individual e evitando toxicidade por acúmulo {{ref:ref-sykes-acvim-2023}}.',

    leptoSuporteEletroliticoNutricionalLphsEHemoterapia:
      '- ==Controle de vômitos, dor e suporte nutricional==: utilize antieméticos (como maropitant e/ou ondansetrona) e analgesia preferencialmente com ==opioides== (como metadona ou buprenorfina), evitando estritamente AINEs. Assim que o paciente estiver hemodinamicamente estável, inicie ==nutrição enteral precoce== (oral ou por sonda se anorexia persistir). A ACVIM 2023 recomenda dieta altamente digestível com ==conteúdo proteico normal a elevado== e aporte calórico adequado para frear o catabolismo na fase aguda — dietas renais hipoproteicas tradicionais não são a escolha automática inicial e devem ser reavaliadas apenas se persistir DRC após a recuperação aguda {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Manejo de hipocalemia (paciente poliúrico)==: suplementar cloreto de potássio conforme concentração sérica, função renal e diurese, respeitando o teto habitual da AAHA de ==0,5 mEq/kg/h IV==. Reavalie frequentemente, pois um mesmo paciente pode transitar rapidamente da poliúria hipocalêmica para oligúria hipercalêmica, exigindo redução ou suspensão imediata do potássio.\n' +
      '- ==Manejo de hipercalemia (paciente oligúrico/anúrico)==: conduzir em três frentes distintas: (1) ==estabilizar a membrana miocárdica== com gluconato de cálcio diante de cardiotoxicidade ao ECG (não reduz o K⁺ sérico); (2) ==deslocar K⁺ para o intracelular== com insulina regular ==0,25–0,5 UI/kg IV== associada a ==~1 g de glicose por unidade de insulina== (seguida de monitorização rigorosa da glicemia e frequentemente infusão de glicose nas horas subsequentes, conforme diretriz IRIS 2024) {{ref:ref-iris-aki-2024}}; e (3) ==eliminar potássio do organismo== restaurando a diurese ou instituindo terapia renal substitutiva.\n' +
      '- ==Manejo da LPHS==: iniciar pela definição do mecanismo dominante da dispneia. Na hemorragia alveolar pura ==sem hipervolemia==, furosemida não é automaticamente indicada (pois a causa não é edema hidrostático). Se houver sobrecarga hídrica associada, o controle rigoroso do volume (ou ultrafiltração dialítica) torna-se prioritário. Oferte oxigenoterapia suplementar com mínimo estresse e considere ventilação mecânica protetora diante de hipoxemia refratária ou fadiga ventilatória.\n' +
      '- ==Hemoterapia e hemostasia racional==: não transfunda apenas pela contagem plaquetária isolada. Indique ==concentrado de hemácias== em anemia grave/hemorragia comprometendo entrega de oxigênio; ==plasma fresco congelado (PFC)== em hemorragia clinicamente relevante associada a deficiência ou consumo de fatores de coagulação (lembrando que PFC não repõe plaquetas); ==plaquetas== (quando disponíveis) em sangramento grave associado à trombocitopenia severa; e evite vitamina K automática sem evidência de deficiência de fatores dependentes de vitamina K — sempre vigiando sobrecarga de volume durante a infusão {{ref:ref-sykes-acvim-2023}}.',

    leptoHemodialiseETerapiasControversas:
      'A ==hemodiálise / terapia renal substitutiva extracorpórea== não mata a bactéria, mas substitui temporariamente a depuração de toxinas, o controle de eletrólitos/ácido-base e a remoção de excesso hídrico enquanto os túbulos renais recuperáveis se regeneram.\n\n' +
      '- ==Indicações clínicas prioritárias==: hipercalemia persistente ou recorrente, acidose metabólica grave refratária, sobrecarga hídrica não controlável, manifestações graves de uremia, oligúria/anúria persistente com deterioração metabólica e LRA rapidamente progressiva.\n' +
      '- ==Encaminhamento precoce (ACVIM 2023)==: discutir transferência para centro com suporte extracorpóreo já diante de ==LRA IRIS grau IV (especialmente creatinina > 5 mg/dL)== — não esperar falência completa do manejo conservador. Em série clínica de 36 cães com leptospirose e LRA grave tratados com terapia renal extracorpórea, a recuperação superou ==80%==, ilustrando o excelente potencial de reversibilidade quando há acesso oportuno ao suporte {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Rigor contra terapias não comprovadas==: a gravidade da leptospirose não justifica acrescentar imunomoduladores, diuréticos forçados ou hepatoprotetores sem demonstração de benefício clínico.',

    leptoTabelaTerapiasControversas: {
      kind: 'clinicalTable',
      caption: 'Tabela 12 — Intervenções controversas ou sem comprovação suficiente na leptospirose',
      headers: ['Intervenção', 'Posição clínica atual baseada em evidências'],
      rows: [
        [
          'Corticoides sistêmicos rotineiros',
          'Não recomendados de forma indiscriminada; benefício de sobrevida na LPHS canina não está demonstrado de modo consistente.',
        ],
        [
          'Plasmaférese terapêutica',
          'Possível interesse em casos críticos selecionados de LPHS/imunopatologia, porém evidência insuficiente para recomendação rotineira.',
        ],
        [
          'Hemoperfusão / adsorção de citocinas',
          'Estratégia especializada/experimental sem benefício clínico definitivo estabelecido.',
        ],
        [
          'Furosemida para "fazer o rim voltar a funcionar"',
          'Pode elevar o volume urinário sem recuperar a TFG ou a função renal; não trata a LRA e pode agravar desidratação se usada sem hipervolemia.',
        ],
        [
          'Ácido ursodesoxicólico (UDCA)',
          'Não é indicado rotineiramente para colestase leptospírica; a ACVIM 2023 alerta para potencial dano conforme o mecanismo da doença.',
        ],
        [
          'SAMe, silimarina e vitamina E',
          'Suporte antioxidante teórico, porém sem ensaios clínicos específicos robustos demonstrando benefício na leptospirose canina.',
        ],
        [
          'Fluoroquinolonas como monoterapia',
          'Não são primeira escolha porque têm eficácia inferior para erradicação da colonização tubular renal.',
        ],
        [
          'Antibioticoterapia profilática em todos os contactantes',
          'Não é recomendação universal; deve depender de avaliação epidemiológica e risco específico de exposição.',
        ],
      ],
    },
  },

  prevention: {
    leptoVacinacaoCaninaEFelina:
      'As principais diretrizes internacionais convergem para ampla proteção vacinal canina, alinhada à realidade epidemiológica urbana e rural do Brasil:\n\n' +
      '- ==Protocolo canino recomendado==: o consenso ==ACVIM 2023== recomenda vacinar ==todos os cães== independentemente do estilo de vida, a partir de ~12 semanas de idade (com alguns protocolos iniciando entre 8 e 12 semanas conforme bula), com ==duas doses iniciais separadas por 4 semanas (2–4 semanas)== e ==reforços anuais== {{ref:ref-sykes-acvim-2023}}. Em 2024, a ==AAHA== passou a classificar a vacina contra leptospirose como ==essencial (core)== para cães {{ref:ref-aaha-2024}}, e a ==WSAVA 2024== a considera essencial sempre que a doença for endêmica, os sorogrupos relevantes forem conhecidos e houver formulações adequadas disponíveis {{ref:ref-wsava-2024}}.\n' +
      '- ==Limites e segurança vacinal==: a proteção é predominantemente sorogrupo-específica e não é absoluta (portanto, ==cães vacinados ainda podem adoecer==, sobretudo por sorogrupos não contidos na vacina). Formulações comerciais não são automaticamente intercambiáveis apenas pelo número de sorovares declarados. Reações de hipersensibilidade às vacinas modernas quadrivalentes são incomuns e geralmente leves/transitórias (estimativa de ~6,5 eventos a cada 10.000 cães vacinados em grande coorte avaliada por Yao et al., 2015) {{ref:ref-yao-2015}}. A vacinação em curso não substitui o tratamento de uma infecção ativa, e ==cães recuperados de leptospirose devem retomar a vacinação anual==, pois a infecção natural não garante imunidade vitalícia contra outros sorogrupos.\n' +
      '- ==Espécie felina==: ==não existe vacina licenciada contra leptospirose para gatos==, e a aplicação extrabula de bacterinas caninas em felinos não é recomendada {{ref:ref-abcd-2026}}.',

    leptoBiossegurancaHospitalarETutores:
      'O risco de transmissão ocupacional de um cão internado para a equipe veterinária é considerado relativamente baixo quando precauções adequadas são aplicadas com rigor, mas ==não é nulo==.\n\n' +
      '- ==Biossegurança hospitalar (ACVIM 2023)==: atenção máxima nas ==primeiras 48 horas de terapia antimicrobiana== (período de maior risco de eliminação viável). Medidas essenciais: luvas descartáveis em todo manejo do paciente, urina e superfícies; proteção ocular/facial quando houver risco de respingos (ex.: limpeza, drenagem de cateter urinário ou lavagem); descarte seguro de resíduos; limpeza mecânica prévia seguida de desinfetante eficaz (leptospiras são sensíveis a desinfetantes comuns); identificação clara do leito; e ==evitar manejo direto por gestantes==, adotando cuidados adicionais para profissionais imunocomprometidos. Importante: a ACVIM ==não exige isolamento estrutural obrigatório== se isso privar o paciente crítico dos recursos de uma UTI — uma UTI equipada com precauções consistentes de contato oferece assistência superior {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Orientações práticas aos tutores==: evitar contato direto com urina do animal suspeito ou confirmado, usar luvas para limpeza seguida de lavagem rigorosa das mãos, higienizar superfícies contaminadas e restringir acesso do animal a áreas compartilhadas até orientação veterinária. Caso algum morador apresente exposição relevante ou sintomas febris/compatíveis, orientar avaliação médica humana (sem recomendar profilaxia antibiótica humana indiscriminada sem critério médico). A prevenção domiciliar completa-se com controle de roedores, eliminação de acesso a águas estagnadas/lama e vacinação canina anual em dia.',
  },

  complications: {
    leptoComplicacoesMortalidadeEMarcadores:
      'Na leptospirose, o prognóstico é determinado pela ==extensão e evolução da disfunção orgânica== — e não pela magnitude do título sorológico no MAT. Mesmo após o início eficaz do antibiótico, a deterioração renal ou pulmonar pode prosseguir nos primeiros dias.\n\n' +
      '- ==Mortalidade real em diferentes cenários (evitar número único)==:\n' +
      '  • *Cães críticos em UTI com LRA (Vernaccini et al., novembro de 2026)*: coorte retrospectiva em dois centros de terapia intensiva (2020–2025) avaliando ==63 cães== registrou mortalidade hospitalar (óbito ou eutanásia) de ==56% (35/63)==, subindo de 31% em cães com até 1 ano para 67% em cães com ≥ 7 anos (==OR 1,16 por ano adicional de idade==, IC 95%: 1,02–1,32; associação atenuada ao excluir eutanásias) {{ref:ref-vernaccini-2026}}. A diferença de mortalidade conforme vacinação (OR 0,35; IC 95%: 0,12–1,07; p = 0,067) não atingiu significância estatística — o que ==não demonstra falta de eficácia vacinal==, dado o forte viés de seleção de analisar apenas animais já doentes o suficiente para exigir UTI.\n' +
      '  • *LPHS grave*: coortes de cães com síndrome de hemorragia pulmonar grave relatam mortalidade de até ==~70%== (não generalizável a cães sem acometimento pulmonar).\n' +
      '  • *LRA grave submetida à hemodiálise*: séries selecionadas em centros de referência mostram ==recuperação renal superior a 80%==, reforçando o grande potencial reversível da lesão tubular quando há suporte adequado {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Marcadores prognósticos úteis (e seus limites)==: em coorte de 254 cães citada pela ACVIM, ==bilirrubina sérica ≥ 0,6 mg/dL (≥ 10 µmol/L)== associou-se fortemente a morte ou eutanásia (==OR 16,4==) — trata-se de indicador de gravidade sistêmica, jamais de critério isolado para eutanásia. Anúria persistente, deterioração respiratória progressiva e sangramento ativo/CID são sinais de alto risco, sendo a ==tendência seriada== (creatinina, K⁺, bilirrubina, peso, diurese e PaO₂/SpO₂) muito mais informativa do que qualquer resultado isolado.\n' +
      '- ==Recuperação e sequelas pós-alta==: com tratamento bem-sucedido, plaquetas costumam melhorar já na primeira semana e ureia, creatinina e SDMA frequentemente retornam à referência em ==10 a 14 dias== (a bilirrubina tende a cair mais lentamente que algumas enzimas hepáticas), mas a remodelação renal pode continuar por semanas a meses. A ACVIM recomenda ==reavaliação em até 7 dias após a alta== (hemograma, bioquímica e densidade urinária), acompanhando possível evolução para doença renal crônica residual. Em gatos, ainda faltam séries robustas para estimar mortalidade ou risco atribuível de DRC.',

    leptoTabelaComplicacoesUti: {
      kind: 'clinicalTable',
      caption: 'Tabela 13 — Complicações que mais ameaçam a sobrevida na emergência e UTI',
      headers: ['Complicação', 'Mecanismo e sinal de alerta', 'Conduta imediata', 'Implicação prognóstica'],
      rows: [
        [
          'LRA oligúrica / anúrica',
          'Queda acentuada da TFG com retenção de solutos e incapacidade de excretar água',
          'Avaliar perfusão, mensurar diurese horária, ajustar balanço hídrico e discutir hemodiálise precocemente',
          'Eleva complexidade assistencial, mas mantém alto potencial de recuperação com suporte dialítico.',
        ],
        [
          'Hipercalemia grave',
          'Excreção renal insuficiente causando instabilidade elétrica miocárdica (bradicardia, ondas T apiculadas, ausência de onda P)',
          'ECG contínuo, gluconato de cálcio IV, insulina regular + glicose (IRIS 2024) e remoção renal/dialítica',
          'Risco iminente de parada cardíaca se não reconhecida e corrigida.',
        ],
        [
          'Hemorragia pulmonar (LPHS)',
          'Quebra da barreira alvéolo-capilar com shunt intrapulmonar, taquipneia crescente e hipoxemia (com ou sem hemoptise)',
          'Oxigenoterapia sem estresse, imagem torácica, gasometria/SpO₂, controle rigoroso de volume e ventilação mecânica se falência',
          'Uma das complicações associadas à maior taxa de mortalidade (até ~70% nas formas graves).',
        ],
        [
          'Sobrecarga hídrica',
          'Acúmulo de fluido em paciente com excreção renal reduzida (ganho de peso, taquipneia, edema, congestão)',
          'Reavaliar infusões e flushes, recalcular balanço real, avaliar diurético apenas se hipervolemia ou ultrafiltração dialítica',
          'Agrava rapidamente a insuficiência respiratória e a congestão intersticial renal.',
        ],
        [
          'Coagulopatia / CID',
          'Ativação endotelial sistêmica, consumo plaquetário e de fatores de coagulação com sangramento ativo',
          'Hemograma, plaquetas e coagulograma seriados; hemoterapia individualizada (hemácias/PFC conforme sangramento)',
          'Marcador de doença multissistêmica severa.',
        ],
        [
          'Hepatopatia colestática grave',
          'Desarranjo canalicular intenso, hiperbilirrubinemia progressiva e possível pancreatite/disfunção sintética',
          'Monitorar bilirrubina, glicemia, coagulação e suporte nutricional; evitar fármacos hepatotóxicos ou UDCA automático',
          'Hiperbilirrubinemia associa-se a pior desfecho em coortes hospitalares.',
        ],
        [
          'Arritmias cardíacas',
          'Hipercalemia, hipoxemia, acidose ou miocardite/lesão miocárdica (troponina elevada)',
          'ECG, correção eletrolítica/oxigenação e manejo antiarrítmico dirigido à causa',
          'Podem provocar descompensação hemodinâmica súbita.',
        ],
        [
          'Disfunção de múltiplos órgãos (MODS)',
          'Sobreposição de LRA, LPHS, colestase, coagulopatia e hipoperfusão sistêmica',
          'Suporte intensivo multidisciplinar integrado e comunicação prognóstica transparente com o tutor',
          'Eleva substancialmente mortalidade e necessidade de terapias avançadas.',
        ],
      ],
    },

    leptoMudancasParadigmaControversiasEEstudos:
      'A abordagem moderna da leptospirose superou diversos dogmas antigos, ao mesmo tempo em que mantém controvérsias científicas abertas e incorpora novas ferramentas de apoio:\n\n' +
      '- ==Controvérsia 1 — Leptospirose e doença renal crônica (DRC)==: existe plausibilidade biológica clara (a nefrite tubulointersticial pode evoluir para atrofia tubular e fibrose). Contudo, encontrar anticorpos ou DNA urinário de *Leptospira* em um animal com DRC — especialmente em gatos — ==não comprova causalidade==; faltam coortes longitudinais controladas para quantificar o risco atribuível {{ref:ref-pathogens-cats-2026}}.\n' +
      '- ==Controvérsia 2 — Imunomodulação na LPHS==: embora hipóteses inflamatórias e imunomediadas participem da fisiopatogenia da hemorragia alveolar, plausibilidade biológica não prova benefício clínico — corticoides sistêmicos rotineiros, plasmaférese e adsorção de citocinas ainda carecem de evidência robusta de melhora de sobrevida.\n' +
      '- ==Aprendizado de máquina e escores prognósticos==: modelos de aprendizado de máquina treinados com hemograma, bioquímica e urinálise de rotina (Reagan et al., 2022) alcançaram especificidade próxima de ==91%== (e ==~93%== quando combinados ao MAT) em hospital universitário de referência, mas sua acurácia varia entre hospitais com prevalências diferentes e eles ==não substituem a confirmação etiológica== {{ref:ref-reagan-2022}}. Da mesma forma, o modelo prognóstico de Segev para cães com LRA em terapia extracorpórea (ponto de corte 19,9 citado na ACVIM) foi derivado de população específica e ==nunca deve ser usado como regra rígida para indicar ou negar diálise== {{ref:ref-sykes-acvim-2023}}.\n' +
      '- ==Síntese crítica das evidências-chave (2020–2026)==:\n' +
      '  • *Consenso ACVIM (Sykes et al., 2023)*: principal referência canina (método Delphi), padronizou caso provável/confirmado, coleta combinada PCR + MAT, doxiciclina 14 dias, encaminhamento precoce para diálise e vacinação universal em cães (algumas recomendações ainda repousam em estudos observacionais e consenso especializado) {{ref:ref-sykes-acvim-2023}}.\n' +
      '  • *Epidemiologia brasileira (Esteves et al., 2023; São Paulo 2021; Lavras/MG 2025)*: consolidam o predomínio de *Canicola* e *Icterohaemorrhagiae* entre isolados caninos no país (além de sinais sorológicos de *Autumnalis* e isolados pontuais de *Pomona*, *Australis* e *Sejroe*) e reforçam o descompasso entre soroprevalência populacional, exposição longitudinal e detecção pontual por PCR urinária {{ref:ref-esteves-2023}} {{ref:ref-sp-bmc-2021}} {{ref:ref-lavras-2025}}.\n' +
      '  • *Patologia renal, pulmão e UTI (Hilbe et al., 2024; JVIM pulmonar 2026; Vernaccini et al., 2026)*: ampliam a fisiopatogenia para glomerulonefrite exsudativa ao lado da necrose tubular {{ref:ref-hilbe-2024}}, confirmam evolução pulmonar dinâmica com hipoxemia frequente em exames seriados {{ref:ref-jvim-pulmonary-2026}} e dimensionam a gravidade em UTI (56% de mortalidade hospitalar em 63 cães com LRA, maior em idosos) {{ref:ref-vernaccini-2026}}.\n' +
      '  • *Evidência felina (Andityas et al., 2024; ABCD 2026; Pathogens 2026)*: confirmam exposição (9,95% anticorpos) e detecção de DNA (4,62%) em gatos domésticos mundialmente, mantendo cautela contra extrapolações automáticas dos protocolos caninos {{ref:ref-andityas-2024}} {{ref:ref-abcd-2026}} {{ref:ref-pathogens-cats-2026}}.',

    leptoTabelaMudancasPratica: {
      kind: 'clinicalTable',
      caption: 'Tabela 14 — O que mudou na prática veterinária moderna sobre leptospirose',
      headers: ['Conceito tradicional superado', 'Orientação atual baseada em evidências', 'Consequência prática no plantão'],
      rows: [
        [
          'Doença restrita a cães grandes e rurais',
          'Cães urbanos, de pequeno porte e de todas as idades adoecem',
          'Nunca descartar pela raça, porte ou endereço urbano.',
        ],
        [
          'Exigir icterícia e azotemia para suspeitar',
          'Fase inicial pode ser febril inespecífica e a LRA pode cursar sem icterícia',
          'Investigar e reavaliar precocemente quadros agudos compatíveis.',
        ],
        [
          'Um único MAT define o diagnóstico e o sorovar',
          'MAT pareado (7–14 d) combinado a PCR de sangue e urina é muito mais confiável',
          'Não confiar em título único negativo nem inferir sorovar pelo maior título agudo.',
        ],
        [
          'PCR negativa exclui leptospirose',
          'Sensibilidade depende da fase, tipo de amostra e uso prévio de antibióticos',
          'Manter investigação pareada e tratamento diante de suspeita forte.',
        ],
        [
          'A lesão renal é exclusivamente tubular',
          'Glomerulonefrite exsudativa e perda de proteínas de alto peso podem coexistir (Hilbe 2024; ACVIM 2023)',
          'Interpretar proteinúria de forma ampla sem excluir leptospirose.',
        ],
        [
          'Tratar LRA leptospírica com "diurese forçada"',
          'Sobrecarga hídrica aumenta morbidade respiratória e renal (IRIS 2024)',
          'Guiar fluidos por perfusão, perdas reais mensuradas e peso corporal.',
        ],
        [
          'Prescrever ácido ursodesoxicólico para toda icterícia',
          'Sem benefício comprovado e com alerta de potencial dano pela ACVIM 2023',
          'Evitar prescrição automática de UDCA na colestase leptospírica.',
        ],
        [
          'Leptospirose em gatos não existe',
          'Infecção, soroconversão e eliminação urinária estão comprovadas (ABCD 2026)',
          'Considerar em casos selecionados de LRA felina com exposição a roedores.',
        ],
        [
          'Vacinar apenas cães de alto risco rural',
          'ACVIM 2023 e AAHA 2024 recomendam vacinação ampla/core para cães; WSAVA 2024 a considera essencial onde endêmica',
          'Revisar protocolos preventivos anuais de todos os cães.',
        ],
        [
          'Necessidade de diálise equivale a prognóstico sem esperança',
          'Séries em centros de referência mostram recuperação renal > 80%',
          'Encaminhar cedo (LRA IRIS grau IV), antes de complicações irreversíveis.',
        ],
      ],
    },
  },

  relatedConsensusSlugs: ['iris-drc-2023'],
  relatedDiseaseSlugs: [
    'lesao-renal-aguda-canina',
    'lesao-renal-aguda-felina',
    'pielonefrite-caes-gatos',
    'erliquiose-monocitica-canina',
    'babesiose-caes-gatos',
    'coagulacao-intravascular-disseminada-caes-gatos',
    'sepse-canina',
  ],
  relatedMedicationSlugs: [
    'ampicilina-sulbactam',
    'amoxicilina-clavulanato',
    'ceftriaxona',
    'maropitant',
    'ondansetrona',
    'metadona',
    'buprenorfina',
    'sucralfato',
  ],

  references: [
    {
      id: 'ref-sykes-acvim-2023',
      authors: 'Sykes JE, Francey T, Schuller S, Stoddard RA, Cowgill LD, Moore GE',
      title: 'Updated ACVIM consensus statement on leptospirosis in dogs (incl. Figura 1, CC BY-NC-ND 4.0)',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2023,
      volume: '37',
      pages: '1966–1982',
      doi: '10.1111/jvim.16903',
      url: 'https://doi.org/10.1111/jvim.16903',
      sourceType: 'Consenso ACVIM (referência principal)',
    },
    {
      id: 'ref-iris-aki-2024',
      authors: 'Segev G, Cortellini S, Foster JD, Francey T, Langston C, Londoño L, Schweighauser A, Jepson RE',
      title: 'International Renal Interest Society best practice consensus guidelines for the diagnosis and management of acute kidney injury in cats and dogs',
      journal: 'The Veterinary Journal',
      year: 2024,
      doi: '10.1016/j.tvjl.2024.106068',
      url: 'https://doi.org/10.1016/j.tvjl.2024.106068',
      sourceType: 'Consenso IRIS (LRA)',
    },
    {
      id: 'ref-wsava-2024',
      authors: 'WSAVA Vaccination Guidelines Group (Squires RA, Crawford C, Marcondes M, Whitley N)',
      title: '2024 guidelines for the vaccination of dogs and cats — compiled by the Vaccination Guidelines Group (VGG) of the World Small Animal Veterinary Association (WSAVA)',
      journal: 'Journal of Small Animal Practice',
      year: 2024,
      doi: '10.1111/jsap.13718',
      url: 'https://doi.org/10.1111/jsap.13718',
      sourceType: 'Diretriz WSAVA (vacinação)',
    },
    {
      id: 'ref-abcd-2026',
      authors: 'European Advisory Board on Cat Diseases (ABCD)',
      title: 'Guideline for Leptospira spp. infection in cats (atualização de maio de 2026)',
      journal: 'ABCD Cats & Vets',
      year: 2026,
      url: 'https://www.abcdcatsvets.org/guideline-for-leptospira-spp-infection-in-cats/',
      sourceType: 'Diretriz felina ABCD',
    },
    {
      id: 'ref-aaha-2024',
      authors: 'American Animal Hospital Association (AAHA)',
      title: 'Canine Vaccination Guidelines (atualização de leptospirose como vacina essencial em 2024) e AAHA Fluid Therapy Guidelines',
      journal: 'AAHA',
      year: 2024,
      url: 'https://www.aaha.org/resources/2022-aaHA-canine-vaccination-guidelines/',
      sourceType: 'Diretriz clínica AAHA',
    },
    {
      id: 'ref-esteves-2023',
      authors: 'Esteves SB, Santos CM, Silva BCS, Salgado FF, Guilloux AGA, Cortez A, Lucco RC, Miotto BA',
      title: 'Time for change? A systematic review with meta-analysis of leptospires infecting dogs to assess vaccine compatibility in Brazil',
      journal: 'Preventive Veterinary Medicine',
      year: 2023,
      volume: '213',
      pages: '105869',
      doi: '10.1016/j.prevetmed.2023.105869',
      url: 'https://doi.org/10.1016/j.prevetmed.2023.105869',
      sourceType: 'Revisão sistemática e meta-análise brasileira',
    },
    {
      id: 'ref-hilbe-2024',
      authors: 'Hilbe M, et al.',
      title: 'Exudative glomerulonephritis associated with acute leptospirosis in dogs (incl. Figura 1, CC BY 4.0)',
      journal: 'Veterinary Pathology',
      year: 2024,
      volume: '61',
      pages: '453–461',
      doi: '10.1177/03009858231207020',
      url: 'https://doi.org/10.1177/03009858231207020',
      sourceType: 'Estudo anatomopatológico (n = 37 · CC BY 4.0)',
    },
    {
      id: 'ref-andityas-2024',
      authors: 'Andityas M, et al.',
      title: 'Feline leptospirosis prevalence worldwide: A systematic review and meta-analysis of diagnostic approaches',
      journal: 'Veterinary World',
      year: 2024,
      volume: '17',
      pages: '255–272',
      doi: '10.14202/vetworld.2024.255-272',
      url: 'https://doi.org/10.14202/vetworld.2024.255-272',
      sourceType: 'Revisão sistemática e meta-análise felina',
    },
    {
      id: 'ref-reagan-2022',
      authors: 'Reagan KL, Deng S, Sheng J, Sebastian J, Wang Z, Huebner SN, et al.',
      title: 'Use of machine-learning algorithms to aid in the early detection of leptospirosis in dogs',
      journal: 'Journal of Veterinary Diagnostic Investigation',
      year: 2022,
      doi: '10.1177/10406387221096781',
      url: 'https://doi.org/10.1177/10406387221096781',
      sourceType: 'Estudo diagnóstico (machine learning)',
    },
    {
      id: 'ref-vernaccini-2026',
      authors: 'Vernaccini M, et al.',
      title: 'Outcomes and Clinicopathological Findings in Vaccinated and Unvaccinated Dogs with Leptospirosis-Associated Acute Kidney Injury Admitted to Intensive Care',
      journal: 'Veterinary Sciences',
      year: 2026,
      volume: '13',
      pages: '1218',
      doi: '10.3390/vetsci13111218',
      url: 'https://doi.org/10.3390/vetsci13111218',
      sourceType: 'Coorte retrospectiva em UTI (n = 63, nov/2026)',
    },
    {
      id: 'ref-jvim-pulmonary-2026',
      authors: 'Journal of Veterinary Internal Medicine',
      title: 'Serial evaluation of clinical, functional, and structural pulmonary changes in 10 dogs with leptospirosis',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2026,
      volume: '40',
      doi: '10.1093/jvimsj/aalag101',
      url: 'https://doi.org/10.1093/jvimsj/aalag101',
      sourceType: 'Série prospectiva pulmonar (n = 10)',
    },
    {
      id: 'ref-putz-2020',
      authors: 'Putz EJ, Nally JE',
      title: 'Investigating the Immunological and Biological Equilibrium of Reservoir Hosts and Pathogenic Leptospira: Balancing the Solution to an Acute Problem? (incl. Figura 1, CC BY 4.0)',
      journal: 'Frontiers in Microbiology',
      year: 2020,
      volume: '11',
      pages: '2005',
      doi: '10.3389/fmicb.2020.02005',
      url: 'https://doi.org/10.3389/fmicb.2020.02005',
      sourceType: 'Artigo científico (CC BY 4.0 · Fig. 1)',
    },
    {
      id: 'ref-sp-bmc-2021',
      authors: 'Miotto BA, et al.',
      title: 'Molecular and serological characterization of pathogenic Leptospira spp. isolated from symptomatic dogs in a highly endemic area, Brazil',
      journal: 'BMC Veterinary Research',
      year: 2021,
      doi: '10.1186/s12917-021-02930-w',
      url: 'https://doi.org/10.1186/s12917-021-02930-w',
      sourceType: 'Estudo microbiológico brasileiro (São Paulo)',
    },
    {
      id: 'ref-lavras-2025',
      authors: 'Ciência Rural (Lavras, Minas Gerais)',
      title: 'Prospective study of leptospirosis and brucellosis in dogs from a public shelter in the municipality of Lavras, Minas Gerais State, Brazil',
      journal: 'Ciência Rural',
      year: 2025,
      volume: '55',
      doi: '10.1590/0103-8478cr20230552',
      url: 'https://doi.org/10.1590/0103-8478cr20230552',
      sourceType: 'Estudo prospectivo brasileiro (MG)',
    },
    {
      id: 'ref-pathogens-cats-2026',
      authors: 'Pathogens',
      title: 'Leptospira Infections in Cats—What Do We Know?',
      journal: 'Pathogens',
      year: 2026,
      volume: '15',
      pages: '506',
      doi: '10.3390/pathogens15050506',
      url: 'https://doi.org/10.3390/pathogens15050506',
      sourceType: 'Revisão sobre leptospirose felina (2026)',
    },
    {
      id: 'ref-midence-2012',
      authors: 'Midence JN, Leutenegger CM, Chandler AM, Goldstein RE',
      title: 'Effects of recent Leptospira vaccination on whole blood real-time PCR testing in healthy client-owned dogs',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2012,
      volume: '26',
      pages: '149–152',
      sourceType: 'Estudo diagnóstico (interferência vacinal em PCR)',
    },
    {
      id: 'ref-yao-2015',
      authors: 'Yao PJ, Stephenson N, Foley JE, Toussieng CR, Farver TB, Sykes JE, et al.',
      title: 'Incidence rates and risk factors for owner-reported adverse events following vaccination of dogs that did or did not receive a Leptospira vaccine',
      journal: 'Journal of the American Veterinary Medical Association',
      year: 2015,
      volume: '247',
      pages: '1139–1145',
      sourceType: 'Estudo de segurança vacinal',
    },
    {
      id: 'ref-greene-5ed-ch68',
      authors: 'Schuller S, Moore GE, Sykes JE',
      title: "Greene's Infectious Diseases of the Dog and Cat (5th Edition) — Chapter 68: Leptospirosis",
      journal: 'Elsevier',
      year: 2023,
      pages: 'pp. 802–823',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-nelson-couto-6ed',
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine (6th Edition) — Cap. 94 (Leptospirosis, pp. 1461–1464), Cap. 41 (AKI/CKD, pp. 686+) e Cap. 87 (Disorders of Hemostasis, pp. 1387+)',
      journal: 'Elsevier',
      year: 2020,
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-ettinger-9ed',
      authors: 'Ettinger SJ, Feldman EC, Côté É',
      title: "Textbook of Veterinary Internal Medicine (9th Edition) — Cap. 185 (Companion Animal Vaccinations) e Cap. 192 (Leptospirosis)",
      journal: 'Elsevier',
      year: 2024,
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-plumbs-10ed-doxy',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition) — Monografia de Doxycycline",
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'pp. 433–437',
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
    {
      id: 'ref-bsava-10ed-doxy',
      authors: 'Allerton F (ed.)',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition) — Monografia de Doxycycline',
      journal: 'BSAVA',
      year: 2020,
      pages: 'pp. 140–141',
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
    {
      id: 'ref-macintire-ecc-2ed',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition) — Cap. 4, 6 e 7 (Choque, fluidoterapia e monitorização)',
      journal: 'Wiley-Blackwell',
      year: 2012,
      pages: 'pp. 30–40; 63–84; 85+',
      sourceType: 'Livro-texto de emergência (acervo local)',
    },
    {
      id: 'ref-feline-ecc-2ed',
      authors: 'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC (eds.)',
      title: 'Feline Emergency and Critical Care Medicine (2nd Edition) — Cap. 3 e 8 (Choque e fluidoterapia em felinos)',
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'pp. 19+; 75+',
      sourceType: 'Livro-texto de emergência felina (acervo local)',
    },
    {
      id: 'ref-bsava-procedures-3ed',
      authors: 'Bexfield N, Lee K (eds.)',
      title: 'BSAVA Guide to Procedures in Small Animal Practice (3rd Edition) — Urinálise, cateterização urinária e POCUS',
      journal: 'BSAVA',
      year: 2024,
      pages: 'pp. 229+; 284+',
      sourceType: 'Manual de procedimentos (acervo local)',
    },
    {
      id: 'ref-dibartola-4ed',
      authors: 'DiBartola SP (ed.)',
      title: 'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (4th Edition) — Equilíbrio hídrico, disfunção renal e terapia dialítica',
      journal: 'Elsevier Saunders',
      year: 2012,
      sourceType: 'Livro-texto de nefrologia/fluidoterapia (acervo local)',
    },
  ],
};
