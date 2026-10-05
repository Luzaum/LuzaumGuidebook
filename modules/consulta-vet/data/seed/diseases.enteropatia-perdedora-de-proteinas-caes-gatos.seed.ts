import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Enteropatia Perdedora de Proteínas (PLE) em Cães e Gatos — Monografia Clínica Padrão Ouro.
 * Embasamento: ACVIM-endorsed statement 2026 (Heilmann et al.) > CURATIVE 2022 (deLaforcade et al.) >
 * Jablonski 2026 (PLE Review) > Jablonski 2022 (Intestinal Lymphangiectasia) > Oishi et al. 2025 (Angio-CT Thromboembolism) >
 * Marsilio et al. 2023 (ACVIM Feline CE) > Nelson & Couto 6ª ed. (cap. 27 e 31) >
 * Fluid, Electrolyte and Acid-Base Disorders in Small Animal Practice (caps. Cálcio e Expansão Plasmática) >
 * Withrow & MacEwen 6ª ed. (cap. 33) > Plumb's Veterinary Drug Handbook 10ª ed.
 */
export const enteropatiaPerdedoraDeProteinasRecord: DiseaseRecord = {
  id: 'disease-enteropatia-perdedora-de-proteinas-caes-gatos',
  slug: 'enteropatia-perdedora-de-proteinas-caes-gatos',
  title: 'Enteropatia perdedora de proteínas em cães e gatos (PLE)',
  subtitle:
    'Guia clínico integral: fisiopatologia linfática e inflamatória, fenótipos dietorresponsivos, restrição ultrabaixa de gordura, triagem hemostática e profilaxia antitrombótica (ACVIM 2026 / CURATIVE 2022)',
  synonyms: [
    'Enteropatia perdedora de proteínas',
    'Protein-losing enteropathy',
    'PLE canina e felina',
    'Linfangiectasia intestinal com perda proteica',
    'Enteropatia inflamatória crônica perdedora de proteínas',
    'Síndrome de má absorção e perda proteica enteral',
    'EPP em cães e gatos',
  ],
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  categories: [
    'gastroenterologia',
    'clinica-medica',
    'nutricao-clinica',
    'hematologia-hemostasia',
    'terapia-intensiva',
  ],
  tags: [
    'Enteropatia Perdedora de Proteínas',
    'PLE',
    'Linfangiectasia Intestinal',
    'Hipoalbuminemia',
    'CIE',
    'ACVIM 2026',
    'CURATIVE 2022',
    'Yorkshire Terrier',
    'Dieta Ultra-Low-Fat',
    'Trombose e Tromboembolismo',
    'Alfa-1 Proteinase Inhibitor',
    'Estriações Hiperecogênicas',
    'Cobalamina',
    'Nelson & Couto',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['enteropatia-perdedora-de-proteinas-caes-gatos'],

  quickSummary:
    'A enteropatia perdedora de proteínas (PLE) é uma síndrome gastrointestinal grave em que as proteínas plasmáticas atravessam a parede entérica em quantidade que supera a capacidade de síntese hepática:\n\n' +
    '- Natureza sindrômica: não constitui diagnóstico etiológico isolado, mas sim a via final comum de afecções linfáticas, inflamatórias, erosivas ou neoplásicas da mucosa intestinal.\n' +
    '- Etiologias prevalentes: em cães, resulta principalmente da sobreposição entre enteropatia inflamatória crônica (CIE) e linfangiectasia intestinal (LI); em gatos, a síndrome é rara e frequentemente associada a linfoma alimentar ou doença inflamatória grave.\n' +
    '- Apresentação atípica: até um terço dos cães não manifesta diarreia crônica, buscando atendimento por ascite progressiva, emaciação muscular ou dispneia decorrente de efusão pleural.\n' +
    '- Risco de tromboembolismo: classificada pelo CURATIVE 2022 como condição de alto risco trombótico por perda de antitrombina, ativação endotelial e hipercoagulabilidade (trombose em 13,6% dos cães com PLE por angio-TC, incluindo lesões subclínicas).\n' +
    '- Mudança de paradigma terapêutico: a nutrição e a restrição estrita de gordura (<2 g/100 kcal) reduzem o fluxo linfático e revertem casos previamente rotulados como córtico-resistentes, reservando imunomoduladores para falhas dietéticas.',

  quickDecisionStrip: [
    'Hipoalbuminemia em cão ou gato exige exclusão metódica de perda renal (urinálise e UPC) e falência de síntese hepática antes de assumir PLE.',
    'Ausência de diarreia NÃO exclui PLE: cerca de 30% dos cães com linfangiectasia apresentam apenas ascite, emaciação muscular e hipoalbuminemia grave.',
    'Estriações hiperecogênicas na mucosa ao ultrassom exibem especificidade de ~96% e sensibilidade de ~75% para linfangiectasia associada à PLE.',
    'Gordura da dieta aumenta o fluxo linfático e a pressão intralacteal: restrição lipídica (<2 g/100 kcal) é intervenção mecânica indispensável.',
    'Não rotule o paciente como corticoide-resistente sem antes otimizar a dieta para um teor ultrabaixo de gordura (Wennogle et al., 2021).',
    'Cães com PLE apresentam absorção oral de prednisolona preservada (Jablonski et al., 2025); falha clínica decorre da biologia da doença, não de má absorção.',
    'CURATIVE 2022 classifica PLE canina como alto risco trombótico: tromboprofilaxia deve ser ativamente indicada salvo contraindicações hemorrágicas.',
    'Meça cálcio ionizado (iCa) e magnésio sérico: hipocalcemia total reflete queda de albumina, mas hipocalcemia ionizada verdadeira decorre de má absorção e hipomagnesemia inibindo o PTH.',
    'Evite infusão rotineira de plasma fresco congelado ou albumina humana apenas para "subir números": a perda enteral contínua neutraliza o benefício transitório.',
    'Em gatos, PLE grave é excepcional: a diferenciação entre enterite linfoplasmocítica (LPE) e linfoma intestinal de baixo grau (LGITL) exige histologia, imuno-histoquímica e PARR integrados.',
  ],

  quickSummaryRich: {
    lead:
      'A enteropatia perdedora de proteínas representa um dos maiores desafios da gastroenterologia de pequenos animais:\n\n' +
      '- Desafio fisiopatológico: perda massiva de albumina e globulinas plasmáticas superando a síntese hepática compensatória.\n' +
      '- Virada de conduta: transição da imunossupressão precoce indiscriminada para a fenotipagem clínica, restrição lipídica profunda e tromboprofilaxia sistemática.',
    leadHighlights: [
      'Síndrome de perda proteica entérica que supera a síntese hepática',
      'Coexistência frequente de CIE e linfangiectasia intestinal',
      'Alto risco trombótico documentado pelo consenso CURATIVE 2022',
      'Restrição mecânica de gordura como terapia fisiopatológica central',
      'Raridade da apresentação em felinos e sobreposição LPE vs LGITL',
    ],
    pillars: [
      {
        title: 'Pilar 1: Conceito Sindrômico e Fenotipagem',
        body:
          'Diferenciação clara entre síndrome e diagnóstico etiológico definitivo:\n\n' +
          '- PLE como síndrome: indica aumento patológico da permeabilidade ou ruptura de vasos linfáticos na mucosa entérica.\n' +
          '- Doenças de base: enteropatias inflamatórias crônicas (CIE), linfangiectasia intestinal (primária ou secundária), lesões de criptas e neoplasias.',
        highlights: ['PLE é síndrome e não etiologia', 'CIE e linfangiectasia coexistem', 'Investigação em três etapas'],
      },
      {
        title: 'Pilar 2: Restrição Lipídica e Fisiologia Linfática',
        body:
          'Fundamentação mecânica da terapia nutricional no epitélio intestinal:\n\n' +
          '- Gorduras de cadeia longa: absorvidas como quilomícrons, ingressam nos lacteais e elevam o fluxo e a pressão linfática intraluminal.\n' +
          '- Ciclo de ruptura: a sobrecarga lipídica dilata os lacteais doentes, provocando ruptura mecânica, extravasamento de linfa e lipogranulomas.',
        highlights: ['Quilomícrons aumentam pressão linfática', 'Dieta low-fat (<2 g/100 kcal)', 'Respostas clínicas sem imunossupressores'],
      },
      {
        title: 'Pilar 3: Coagulopatia e Tromboembolismo Silencioso',
        body:
          'Tríade de Virchow e repercussões hemostáticas no paciente canino:\n\n' +
          '- Estado pró-trombótico: perda enteral de antitrombina, ativação endotelial inflamatória e trombocitose reativa.\n' +
          '- Evidência contemporânea: angio-TC documentou tromboembolismo em 13,6% dos cães com PLE inflamatória, com dois terços assintomáticos (Oishi et al., 2025).',
        highlights: ['Classificação de alto risco CURATIVE', 'Trombos pulmonares e portais subclínicos', 'Tromboprofilaxia recomendada'],
      },
      {
        title: 'Pilar 4: Particularidades Espécie-Específicas Felinas',
        body:
          'Divergências marcantes entre a clínica canina e a espécie felina:\n\n' +
          '- Raridade no gato: enteropatias inflamatórias felinas raramente cursam com hipoalbuminemia profunda e perda proteica massiva.\n' +
          '- Diagnóstico diferencial crítico: diante de perda proteica no gato, investigar ativamente neoplasias infiltrativas, especialmente linfoma intestinal.',
        highlights: ['PLE grave é rara no gato', 'Sobreposição LPE versus LGITL', 'Diagnóstico integrado histologia + IHQ + PARR'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Sequencial da PLE (ACVIM 2026)',
      steps: [
        {
          label: 'Passo 1: Confirmação da Hipoalbuminemia e Exclusão Renal e Hepática',
          detail:
            'Investigação laboratorial inicial obrigatória:\n\n' +
            '- Painel de exclusão: urinálise com relação proteína:creatinina urinária (UPC) para afastar PLN, associada a perfil bioquímico hepático e ácidos biliares.\n' +
            '- Perfil proteico: dosar albumina e globulinas (pan-hipoproteinemia sugere perda entérica não seletiva).',
        },
        {
          label: 'Passo 2: Avaliação Eletrolítica, Mineral e de Micronutrientes',
          detail:
            'Rastreio de complicações metabólicas secundárias à má absorção:\n\n' +
            '- Eletrólitos e minerais: dosar cálcio ionizado (iCa) e magnésio sérico (hipomagnesemia bloqueia secreção e ação do PTH).\n' +
            '- Vitaminas entéricas: mensurar cobalamina sérica (B12) e folato para diagnosticar má absorção ileal e proximal.',
        },
        {
          label: 'Passo 3: Ultrassonografia Abdominal e Marcadores Linfáticos',
          detail:
            'Exame de imagem de alta resolução em jejum:\n\n' +
            '- Sinais característicos: avaliar estriações hiperecogênicas mucosas (especificidade 96% para linfangiectasia), espessamento parietal e linfadenomegalia.\n' +
            '- Rastreio de líquido cavitário: POCUS abdominal (AFAST) e torácico (TFAST) para detecção precoce de ascite e derrame pleural.',
        },
        {
          label: 'Passo 4: Rastreio de Risco Trombótico e Doenças Infecciosas Regionais',
          detail:
            'Avaliação hemostática e diagnósticos etiológicos diferenciais:\n\n' +
            '- Coagulação e hemostasia: contagem plaquetária, tempos de coagulação (PT/aPTT), dímero D e estratificação CURATIVE.\n' +
            '- Exclusões infecciosas dirigidas: parasitológico seriado, coproantígenos e exclusão de hipoadrenocorticismo por cortisol basal.',
        },
        {
          label: 'Passo 5: Endoscopia Digestiva com Biópsias Múltiplas e Histopatologia',
          detail:
            'Confirmação tecidual da arquitetura mucosa e celularidade:\n\n' +
            '- Amostragem combinada: biópsias duodenais e ileais por via endoscópica inspecionando dilatação de lacteais (vilos brancos).\n' +
            '- Patologia avançada: H&E para linfangiectasia e inflamação, complementada por imuno-histoquímica e PARR em felinos para afastar linfoma.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Protocolo Terapêutico Escalonado e Fisiopatológico',
      steps: [
        {
          label: 'Fase 1: Estabilização Hemodinâmica e Manejo de Efusões Críticas',
          detail:
            'Condutas imediatas na admissão do paciente descompensado:\n\n' +
            '- Toracocentese de alívio: indicada prontamente se houver desconforto respiratório restritivo por derrame pleural.\n' +
            '- Fluidoterapia criteriosa: cristaloides balanceados guiados por perfusão e volemia efetiva, evitando sobrecarga hídrica em pacientes ascíticos.',
        },
        {
          label: 'Fase 2: Intervenção Nutricional Central com Restrição Estrita de Gordura',
          detail:
            'Pilar primordial do tratamento na linfangiectasia e CIE:\n\n' +
            '- Seleção dietética: introduzir dieta comercial low-fat (<2 g de gordura/100 kcal) ou formulação caseira ultra-low-fat balanceada por nutrólogo.\n' +
            '- Nutrição enteral precoce: instituição de sonda nasoesofágica ou esofágica em animais anoréxicos, prevenindo catabolismo proteico.',
        },
        {
          label: 'Fase 3: Suplementação Metabólica e Reposição de Cobalamina',
          detail:
            'Correção ativa de deficiências de absorção ileal e mineral:\n\n' +
            '- Protocolo de cobalamina: cianocobalamina 25 mcg/kg PO q24h por 84 dias (ACVIM 2026) ou protocolos parenterais seriados.\n' +
            '- Correção de magnésio e cálcio: reposição de sulfato de magnésio se houver hipocalcemia refratária sintomática.',
        },
        {
          label: 'Fase 4: Tromboprofilaxia Sistemática no Paciente Canino',
          detail:
            'Prevenção primária de eventos tromboembólicos fatais (CURATIVE 2022):\n\n' +
            '- Fármacos antitrombóticos: iniciar clopidogrel (1,1 a 2 mg/kg PO q24h) ou rivaroxabana (0,5 a 1 mg/kg PO q24h) na ausência de hemorragias ativas.\n' +
            '- Monitoramento vascular: manter profilaxia mesmo após melhora inicial da albumina sérica.',
        },
        {
          label: 'Fase 5: Imunomodulação Racional em Casos Inflamatórios Refratários',
          detail:
            'Indicação restrita a pacientes com falha dietética documentada:\n\n' +
            '- Primeira linha: prednisolona (1 a 2 mg/kg PO q24h) com desmame progressivo após 2 a 3 semanas de resposta clínica sustentada.\n' +
            '- Terapias de resgate: associação de clorambucil (2 a 4 mg/m² PO q24h) ou ciclosporina (3 a 5 mg/kg PO q12-24h) em casos inflamatórios graves.',
        },
      ],
    },
  },

  etiology: {
    definicaoConceitualSindromica:
      'A enteropatia perdedora de proteínas (PLE) não é um diagnóstico etiológico, mas uma síndrome clínica e laboratorial multissistêmica:\n\n' +
      '- Mecanismo hemodinâmico-enteral: perda contínua e patológica de proteínas plasmáticas (particularmente albumina e globulinas) para a luz do trato gastrointestinal.\n' +
      '- Desbalanço fisiológico: a taxa de espoliação proteica através da mucosa entérica supera a capacidade máxima de síntese hepática compensatória.\n' +
      '- Diferenciação essencial: PLE não é sinônimo de linfangiectasia, de CIE ou de hipoalbuminemia isolada, constituindo a via final de diversas doenças de base.',
    enteropatiasInflamatoriasCronicasCIE:
      'Enteropatias inflamatórias crônicas (CIE) representam a causa mais comum de PLE no cão (ACVIM 2026):\n\n' +
      '- Superação do termo IBD: o consenso ACVIM substituiu a designação clássica de doença inflamatória intestinal (IBD) por CIE, subdividida conforme a resposta terapêutica.\n' +
      '- PLE como fenótipo grave: a enteropatia inflamatória perdedora de proteínas é classificada atualmente como um fenótipo clínico de maior gravidade dentro do espectro das CIE.\n' +
      '- Inflamação e linfáticos: a infiltração linfoplasmocítica e eosinofílica severa gera edema da lâmina própria e distorção da drenagem linfática tecidual.',
    linfangiectasiaPrimariaESecundaria:
      'Dilatação patológica e disfunção dos vasos linfáticos intestinais:\n\n' +
      '- Forma primária: decorrente de displasia congênita ou anormalidades estruturais dos vasos linfáticos, frequente em certas raças puras.\n' +
      '- Forma secundária: qualquer processo que obstrua fisicamente o fluxo linfático, aumente a pressão venosa central ou gere linfangite inflamatória transmural.\n' +
      '- Coexistência clínica: a linfangiectasia intestinal secundária e a enterite linfoplasmocítica coexistem em ampla proporção dos cães com PLE.',
    doencasDeCriptasEYorkshire:
      'Lesões destrutivas de criptas intestinais com acentuada perda proteica:\n\n' +
      '- Fisiopatologia de criptas: dilatação cística de criptas, formação de abscessos luminais e necrose epitelial focal na mucosa intestinal.\n' +
      '- Predisposição no Yorkshire Terrier: Simmerson et al. (2014) documentaram que lesões de cripta e dilatação lacteal são marcas registradas da raça.',
    neoplasiasIntestinaisEOutras:
      'Infiltração neoplásica difusa ou focal da parede entérica e mesentério:\n\n' +
      '- Linfoma alimentar: principal diagnóstico diferencial neoplásico em cães e gatos, comprometendo a integridade epitelial e o fluxo linfático mesentérico.\n' +
      '- Outras neoplasias: adenocarcinomas mucinosos, leiomiossarcomas e tumores estromais gastrointestinais (GIST) ulcerados.',
    infeccoesEParasitosesRegionais:
      'Agentes infecciosos que destroem a barreira mucosa ou causam linfadenite obstrutiva:\n\n' +
      '- Parasitoses hematófagas: infestações maciças por Ancylostoma caninum ou Uncinaria stenocephala provocando espoliação proteica e hemorrágica contínua.\n' +
      '- Micoses e oomicetos profundos: Histoplasma capsulatum e Pythium insidiosum induzindo enterite granulomatosa transmural obstrutiva.\n' +
      '- Doenças granulomatosas: leishmaniose visceral (infiltração macrofágica entérica) e heterobilharziose em regiões endêmicas.',
    causasMecanicasEHemodinamicas:
      'Processos vasculares e obstrutivos que aumentam a pressão no sistema linfático entérico:\n\n' +
      '- Hipertensão venosa sistêmica: insuficiência cardíaca congestiva direita grave e efusões pericárdicas tamponantes que impedem a drenagem do ducto torácico.\n' +
      '- Hipertensão portal: cirrose hepática e trombose de veia porta que elevam a pressão hidrostática esplâncnica e linfática.\n' +
      '- Obstruções mecânicas focais: intussuscepção crônica ileocólica e volvo parcial causando estase linfática regional pronunciada.',
    predisposicoesGeneticasRaciais:
      'Linhagens caninas com susceptibilidade hereditária bem documentada:\n\n' +
      '- Soft-Coated Wheaten Terrier: afecção genética caracterizada pela manifestação de PLE, nefropatia perdedora de proteínas (PLN) ou síndrome mista concomitante.\n' +
      '- Norwegian Lundehund: gastroenteropatia hereditária associada a mutações recessivas no gene P3H2 (LEPREL1), com linfangiectasia e gastrite atrófica.\n' +
      '- Setter Irlandês: enteropatia crônica sensível ao glúten manifestando má absorção e perda proteica enteral.',
    tabelaComparativaEtiologias: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Classificação Etiológica e Mecanística da PLE em Cães e Gatos',
      headers: ['Categoria Etiológica', 'Entidades Principais', 'Mecanismo Predominante de Perda', 'Espécie Mais Afetada'],
      rows: [
        ['Inflamatória Crônica (CIE)', 'Enterite linfoplasmocítica, enterite eosinofílica grave', 'Aumento da permeabilidade paracelular por citocinas e lesão epitelial', 'Cão (frequente); Gato (incomum)'],
        ['Linfática (Linfangiectasia)', 'Linfangiectasia primária congênita ou secundária obstrutiva', 'Hipertensão linfática, ectasia e ruptura mecânica de lacteais', 'Cão (muito frequente); Gato (raro)'],
        ['Lesões de Cripta', 'Dilatação cística e abscessos de criptas intestinais', 'Necrose focal epitelial e exsudação luminal contínua', 'Cão (típico do Yorkshire Terrier)'],
        ['Neoplásica Infiltrativa', 'Linfoma alimentar (pequenas ou grandes células), adenocarcinoma', 'Destruição da arquitetura mucosa e invasão de linfonodos mesentéricos', 'Gato (predominante); Cão (relevante)'],
        ['Infecciosa / Granulomatosa', 'Histoplasmose, pitiose, ancilostomose severa, leishmaniose', 'Ulceração mucosa difusa, exsudação plasmática e obstrução linfática', 'Cão e Gato (conforme geografia)'],
        ['Hemodinâmica / Congestiva', 'Insuficiência cardíaca direita, pericardite constritiva, trombose portal', 'Aumento crônico da pressão venosa e linfática com extravasamento', 'Cão e Gato (secundário)'],
      ],
    },
  },

  epidemiology: {
    distribuicaoPorEspecie:
      'Discrepância epidemiológica expressiva entre caninos e felinos:\n\n' +
      '- Frequência no cão: a PLE é uma síndrome relativamente comum na rotina de gastroenterologia veterinária de centros de referência.\n' +
      '- Raridade no gato: conforme enfatizado pelo consenso ACVIM felino (Marsilio et al., 2023), enteropatias com perda proteica grave são excepcionais em gatos.\n' +
      '- Implicação prática felina: hipoalbuminemia severa com sinais digestivos no gato deve suscitar imediata suspeita de linfoma ou afecções extragastrointestinais.',
    predisposicoesRaciaisCaninas:
      'Raças com risco relativo aumentado para linfangiectasia e PLE:\n\n' +
      '- Yorkshire Terrier: raça prototípica de maior casuística, frequentemente associando dilatação lacteal, lesões de cripta e resposta favorável à dieta ultra-low-fat.\n' +
      '- Outras raças de alto risco: Soft-Coated Wheaten Terrier, Pastor Alemão, Rottweiler, Maltês, Shar-Pei e Doberman Pinscher.',
    faixaEtariaEDistribuicao:
      'Perfil demográfico e maturidade clínica dos pacientes:\n\n' +
      '- Idade ao diagnóstico: cães de meia-idade a idosos (mediana de 5 a 8 anos) predominam nas apresentações inflamatórias e neoplásicas.\n' +
      '- Apresentações precoces: animais jovens (<2 a 3 anos) podem manifestar linfangiectasia congênita primária ou enteropatias hereditárias.',
    ausenciaDeDiarreiaComoArmadilha:
      'Armadilha epidemiológica fundamental no reconhecimento de casos:\n\n' +
      '- Frequência de diarreia: cerca de 30% a 35% dos cães com PLE comprovada NÃO apresentam histórico de diarreia crônica na admissão (Simmerson et al., 2014).\n' +
      '- Queixas iniciais alternativas: distensão abdominal por ascite, perda muscular progressiva e tosse ou dispneia decorrentes de efusão pleural.',
  },

  pathogenesisTransmission: {
    dinamicaDosLacteaisEAbsorcaoLipidica:
      'Fisiologia do transporte lipídico na lâmina própria intestinal:\n\n' +
      '- Estrutura do vilo: cada vilo entérico contém uma arteríola, uma vênula e um vaso linfático central de fundo cego denominado lacteal central.\n' +
      '- Absorção de gorduras de cadeia longa: triglicerídeos sofrem lipólise, são absorvidos pelos enterócitos, reesterificados e empacotados em quilomícrons.\n' +
      '- Transporte linfático obrigatório: devido ao grande diâmetro molecular, os quilomícrons não penetram nos capilares sanguíneos, adentrando obrigatoriamente os lacteais.',
    mecanismoDoCicloViciosoLipidico:
      'O ciclo autoperpetuante de ruptura linfática desencadeado pela gordura da dieta (Jablonski, 2022):\n\n' +
      '- Sobrecarga intralacteal: ingestão de gordura gera formação massiva de quilomícrons, elevando a taxa de fluxo e a pressão hidrostática linfática.\n' +
      '- Dilatação e ruptura mecânica: vasos linfáticos doentes ou obstruídos não toleram o fluxo aumentado, dilatando-se e rompendo-se para a mucosa e a luz entérica.\n' +
      '- Perda de linfa rica em albumina: o extravasamento drena proteínas plasmáticas, quilomícrons e linfócitos diretamente para as fezes.\n' +
      '- Reação granulomatosa tecidual: lipídios livres no interstício estimulam infiltração de macrófagos e formação de lipogranulomas, que obstruem mais linfáticos.',
    rupturaDeBarreiraMucosaEPermeabilidade:
      'Alteração das junções de oclusão e perda de seletividade epitelial (ACVIM 2026):\n\n' +
      '- Cascatas inflamatórias: liberação local de TNF-alfa, IFN-gama e interleucinas pró-inflamatórias desestrutura as proteínas das tight junctions (claudinas e ocludina).\n' +
      '- Hiperpermeabilidade paracelular: macromoléculas plasmáticas (albumina e globulinas) fluem passivamente do leito vascular para o lúmen intestinal.',
    exsudacaoErosivaEPerdaSanguinea:
      'Perda direta por erosões, ulcerações e sangramento crônico:\n\n' +
      '- Exsudação transmucosa: áreas de ulceração profunda provocam perda contínua de plasma integral e eritrócitos para a luz entérica.\n' +
      '- Depleção crônica de ferro: sangramentos microscópicos ocultos culminam em anemia microcítica e hipocrômica, agravando a caquexia tecidual.',
  },

  pathophysiology: {
    dinamicaDaHipoalbuminemiaEAscite:
      'Queda da pressão oncótica plasmática e formação de efusões cavitárias:\n\n' +
      '- Pressão coloidosmótica (COP): a albumina é responsável por cerca de 75% a 80% da COP intravascular mantendo o equilíbrio de Starling capilar.\n' +
      '- Formação de transudato puro: quando a albumina sérica cai abaixo de 1,5 a 1,8 g/dL, a filtração capilar supera a reabsorção, gerando ascite e edema periférico.\n' +
      '- Compensação intersticial crônica: a hipoproteinemia prolongada reduz também a pressão oncótica intersticial, estabelecendo adaptação que limita o edema (Fluid, Electrolyte and Acid-Base Disorders).',
    paradoxoVolemicoAsciteEHipovolemia:
      'O estado hemodinâmico paradoxal do paciente hipoalbuminêmico grave:\n\n' +
      '- Expansão do volume extracelular total: paciente exibe ascite volumosa e edema subcutâneo evidente.\n' +
      '- Hipovolemia arterial efetiva: o extravasamento de plasma reduz o volume circulante intravascular que perfunde barorreceptores renais e carotídeos.\n' +
      '- Ativação neuro-humoral deletéria: deflagração secundária do sistema renina-angiotensina-aldosterona (SRAA) e ADH, retendo sódio e água que alimentam a ascite.',
    hemostasiaETriadeDeVirchow:
      'Fisiopatologia do tromboembolismo e classificação de alto risco CURATIVE 2022:\n\n' +
      '- Perda seletiva de anticoagulantes: a antitrombina (AT), de peso molecular semelhante à albumina (58-65 kDa), é perdida maciçamente nas fezes.\n' +
      '- Estado pró-coagulante multifatorial: inflamação sistêmica eleva fibrinogênio, ativa plaquetas e promove disfunção endotelial pró-trombótica.\n' +
      '- Evidência contemporânea de imagem (Oishi et al., 2025): angio-TC torácica e abdominal detectou tromboembolismo em 13,6% dos cães com PLE inflamatória (artéria ilíaca, artéria pulmonar e veia porta), sendo dois terços assintomáticos.\n' +
      '- Efeito pró-trombótico de fármacos: o uso de glicocorticoides em altas doses amplia a hipercoagulabilidade e a hipofibrinólise tecidual.',
    eixoMetabolicoMineralCaMgVitD:
      'Distúrbios complexos do cálcio ionizado, magnésio e colecalciferol:\n\n' +
      '- Armadilha do cálcio total: hipocalcemia total decorre primariamente da perda de sítios de ligação na albumina; a fração biologicamente ativa é o cálcio ionizado (iCa).\n' +
      '- Hipocalcemia ionizada verdadeira: resulta de má absorção de vitamina D lipossolúvel, saponificação de cálcio luminal por ácidos graxos livres e hipomagnesemia.\n' +
      '- Bloqueio funcional do PTH por hipomagnesemia: magnésio baixo inibe a secreção de paratormônio e induz resistência periférica em órgãos-alvo (Fluid, Electrolyte and Acid-Base Disorders, p. 168).\n' +
      '- Biomarcador de vitamina D: níveis séricos reduzidos de 25-hidroxivitamina D associam-se a pior sobrevida (Allenspach et al., 2017), funcionando como índice de gravidade.',
    metabolismoDaCobalaminaEAbsorcaoIleal:
      'Comprometimento da captação ileal de cobalamina (vitamina B12):\n\n' +
      '- Fisiologia do receptor CUBAM: a cobalamina ligada ao fator intrínseco requer receptores específicos na mucosa ileal íntegra para internalização enterocítica.\n' +
      '- Consequências da hipocobalaminemia: atrofia adicional de vilosidades, deficiência celular oculta com acúmulo de ácido metilmalônico e piora da resposta clínica.',
    papelDoTriptofanoECatabolismoIdo1:
      'Depleção de aminoácidos essenciais e ativação imunológica (Kathrani et al., 2018):\n\n' +
      '- Via das quinureninas: a enzima indolamina-2,3-dioxigenase-1 (IDO-1) é hiperexpressa na mucosa inflamada de cães com PLE, degradando triptofano aceleradamente.\n' +
      '- Correlação biológica: níveis séricos de triptofano correlacionam-se positivamente com a concentração de albumina, refletindo a intensidade do processo inflamatório.',
    particularidadesFisiopatologicasFelinas:
      'Diferenças fisiopatológicas da síndrome na espécie felina (Marsilio et al., 2023):\n\n' +
      '- Resistência relativa à perda proteica: gatos com enteropatias crônicas graves raramente manifestam a pan-hipoproteinemia observada em cães.\n' +
      '- Sobreposição neoplásica crítica: no felino idoso com perda de peso e espessamento muscular entérico, a distinção entre enterite linfoplasmocítica e linfoma alimentar de baixo grau (LGITL) é central.',
    tabelaComparacaoCaesVsGatos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Comparação Fisiopatológica e Clínica da PLE: Cães versus Gatos',
      headers: ['Característica Clínica / Fisiopatológica', 'Espécie Canina', 'Espécie Felina'],
      rows: [
        ['Prevalência na rotina gastroenterológica', 'Relativamente comum em centros de referência', 'Extremamente rara como síndrome primária'],
        ['Papel da linfangiectasia intestinal (LI)', 'Causa primordial e fenótipo estrutural central', 'Pouco documentada como entidade isolada'],
        ['Apresentação clássica sem diarreia', 'Presente em até 35% dos casos (ascite isolada)', 'Excepcional (predomínio de vômitos e perda de peso)'],
        ['Estriações mucosas ao ultrassom', 'Alta especificidade (96%) e sensibilidade (75%)', 'Evidência muito limitada e achado infrequente'],
        ['Risco de tromboembolismo vascular', 'Classificado formalmente como alto risco (CURATIVE)', 'Risco trombótico não caracterizado na PLE felina'],
        ['Impacto terapêutico da dieta ultra-low-fat', 'Intervenção fisiopatológica mecânica comprovada', 'Evidência limitada; resposta clínica incerta'],
        ['Linfoma alimentar como diferencial', 'Diferencial importante (linfoma multicêntrico/GI)', 'Diferencial mais provável na hipoalbuminemia GI severa'],
        ['Biomarcador alfa-1 proteinase inhibitor (α1PI)', 'Validado para triagem de perda entérica em fezes', 'Não validado comercialmente para rotina diagnóstica'],
      ],
    },
  },

  clinicalSignsPathophysiology: {
    sinaisGastrointestinais:
      'Manifestações decorrentes da disfunção de barreira e má absorção luminal:\n\n' +
      '- Diarreia crônica do intestino delgado: fezes aquosas a pastosas, volumosas, de coloração amarelada ou esteatorreica por má digestão lipídica.\n' +
      '- Vômitos intermitentes: secundários a gastrite uêmica associada, hipomotilidade entérica reflexa ou inflamação transmural.\n' +
      '- Borborigmos e distensão gasosa: fermentação bacteriana anormal de nutrientes não absorvidos na luz do cólon.\n' +
      '- Apetite variável: de polifagia compensatória inicial a hiporexia e anorexia profunda em fases avançadas.',
    sinaisHipoproteinemicos:
      'Manifestações clínicas da queda acentuada da pressão coloidosmótica plasmática:\n\n' +
      '- Ascite progressiva (barriga d’água): acúmulo de líquido peritoneal transudativo com distensão abdominal bilateral indolor e onda de choque líquida positiva.\n' +
      '- Edema subcutâneo periférico: tumefação compressível (com sinal de cacifo positivo) em membros pélvicos, períneo, região ventral do abdômen e prepúcio/escroto.\n' +
      '- Derrame pleural e dispneia restritiva: acúmulo de transudato no espaço pleural gerando respiração paradoxal abdominal rápida e abafamento de sons cardíacos.',
    fenotipoCatabolicoESarcopenia:
      'Sinais de desnutrição proteico-calórica severa e balanço nitrogenado negativo:\n\n' +
      '- Perda muscular acentuada (sarcopenia): escore de massa muscular (MCS) gravemente deprimido com atrofia epaxial, glútea e dos músculos temporais.\n' +
      '- Pelagem quebradiça e sem brilho: ressecamento piloso, tricotomia retardada e descamação epidérmica por carência de ácidos graxos e aminoácidos.\n' +
      '- Fraqueza e intolerância ao exercício: prostração decorrente de atrofia miopática, hipomagnesemia e déficit energético metabólico.',
    manifestacoesTromboembolicas:
      'Sinais clínicos agudos de eventos vasculares oclusivos (CURATIVE 2022):\n\n' +
      '- Tromboembolismo pulmonar (PTE): taquipneia aguda inexplicada, esforço respiratório, hipoxemia refratária e campos pulmonares limpos na ausculta.\n' +
      '- Tromboembolismo aórtico (ATE): paraplegia aguda extremamente dolorosa de membros pélvicos, ausência de pulsos femorais e extremidades frias/cianóticas.\n' +
      '- Trombose da veia porta: piora súbita e refratária da ascite, dor abdominal aguda intensa e rápida deterioração hemodinâmica.',
    achadosDoExameFisicoEstruturado:
      'Roteiro sistemático de palpação e semiologia à beira do leito:\n\n' +
      '- Parâmetros vitais e perfusão: mucosas pálidas, tempo de preenchimento capilar (TPC) discretamente prolongado e pulsos femorais fracos por hipovolemia relativa.\n' +
      '- Palpação cervical e torácica: ausculta abafada em campos ventrais sugerindo efusão pleural; linfonodos periféricos habitualmente normais a reativos.\n' +
      '- Palpação abdominal minuciosa: ondas líquidas de ascite, alças intestinais espessadas ou dolorosas e linfadenomegalia mesentérica palpável.',
  },

  diagnosis: {
    raciocinioEmTresPerguntas:
      'A abordagem diagnóstica racional da PLE fundamenta-se em três etapas lógicas obrigatórias:\n\n' +
      '- Pergunta 1 (Existe perda proteica relevante?): confirmação laboratorial de hipoalbuminemia e avaliação do perfil de globulinas.\n' +
      '- Pergunta 2 (A perda é comprovadamente gastrointestinal?): exclusão ativa de proteinúria renal (PLN) e insuficiência sintética hepática, confirmando sítio enteral.\n' +
      '- Pergunta 3 (Qual a doença intestinal de base?): caracterização histopatológica, fenotípica e de imagem para guiar a terapia direcionada.',
    tabelaDiagnosticoDiferencialHipoalbuminemia: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Diagnóstico Diferencial Metódico da Hipoalbuminemia em Cães e Gatos',
      headers: ['Causa de Hipoalbuminemia', 'Mecanismo Primário', 'Achados Laboratoriais Distintivos', 'Exame Confirmatório'],
      rows: [
        ['Enteropatia Perdedora de Proteínas (PLE)', 'Perda gastrointestinal excessiva por permeabilidade ou linfa', 'Pan-hipoproteinemia frequente, hipocolesterolemia, hipocobalaminemia', 'Ultrassom (estriações), α1PI fecal, endoscopia/biópsias'],
        ['Nefropatia Perdedora de Proteínas (PLN)', 'Perda glomerular seletiva de albumina na urina', 'Albumina muito baixa com globulinas normais a altas, proteinúria', 'Urinálise completa, sedimento inativo e UPC > 0,5'],
        ['Insuficiência Sintética Hepática', 'Falência na capacidade dos hepatócitos em sintetizar albumina', 'Hipoalbuminemia pura, ureia baixa, colesterol baixo, hipoglicemia', 'Ácidos biliares pré e pós-prandiais, amônia, ultrassom hepático'],
        ['Hemorragia Crônica Digestiva', 'Perda integral de sangue e plasma na luz entérica', 'Anemia regenerativa ou microcítica/hipocrômica (depleção de ferro)', 'Hemograma seriado, reticulócitos, sangue oculto fecal, endoscopia'],
        ['Exsudação em Terceiro Espaço', 'Extravasamento vascular em peritonites, pleurites ou queimaduras', 'Concentração proteica elevada no líquido cavitário ou lesão cutânea', 'Análise físico-química e citologia da efusão (exsudato)'],
        ['Hipoadrenocorticismo (Addison atípico)', 'Gastroenteropatia e colapso metabólico por deficiência de cortisol', 'Hipoalbuminemia com eletrólitos normais ou alterados, hipoglicemia', 'Cortisol basal (exclusão se >2 mcg/dL) e teste de estimulação com ACTH'],
      ],
    },
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Perfil Bioquímico Sérico e Painel Eletrolítico Ampliado',
        description:
          'Triagem quantitativa obrigatória da concentração de proteínas e eletrólitos:\n\n' +
          '- Frações proteicas: dosagem de albumina sérica e globulinas totais (pan-hipoproteinemia apoia perda entérica não seletiva).\n' +
          '- Painel metabólico: ureia, creatinina, fosfatase alcalina, ALT e colesterol (hipocolesterolemia favorece fortemente linfangiectasia).\n' +
          '- Eletrolitograma com cálcio ionizado: mensuração de Na+, K+, Cl-, fósforo, cálcio ionizado (iCa) e magnésio sérico.',
        purpose: 'Confirmar a magnitude da hipoproteinemia e identificar distúrbios minerais potencialmente fatais.',
        interpretation: 'Albumina <1,5 g/dL indica risco iminente de ascite e edema; iCa baixo com magnésio reduzido confirma hipocalcemia verdadeira funcional.',
        limitations: 'Não distingue o sítio anatômico da perda proteica (renal, enteral ou hepático).',
        isGoldStandard: false,
      },
      {
        stepNumber: 2,
        title: 'Urinálise Completa e Relação Proteína:Creatinina Urinária (UPC)',
        description:
          'Avaliação metódica de perda glomerular renal em amostra de urina colhida por cistocentese:\n\n' +
          '- Análise de fita e sedimento: descartar hematúria ativa, piúria ou inflamação que falseiem a proteinúria.\n' +
          '- Quantificação por UPC: mensuração laboratorial da relação proteína:creatinina urinária.',
        purpose: 'Excluir definitivamente a nefropatia perdedora de proteínas (PLN) ou diagnosticar síndrome mista (PLE + PLN).',
        interpretation: 'UPC <0,5 em cães (ou <0,4 em gatos) afasta perda renal significativa, consolidando a rota gastrointestinal; UPC elevado indica PLN associada.',
        limitations: 'Sedimento urinário inflamatório ativo invalida a mensuração isolada do UPC.',
        isGoldStandard: false,
      },
      {
        stepNumber: 3,
        title: 'Avaliação Funcional Hepática e Rastreio Adrenal',
        description:
          'Testes dinâmicos de capacidade funcional hepática e triagem endocrinológica:\n\n' +
          '- Provas de função sintética: dosagem de ácidos biliares séricos pré e pós-prandiais e mensuração de amônia plasmática.\n' +
          '- Exclusão de hipoadrenocorticismo: dosagem de cortisol sérico basal para triagem de Addison.',
        purpose: 'Descartar insuficiência hepatocelular sintética primária e afastar crise adrenocortical atípica.',
        interpretation: 'Ácidos biliares normais excluem insuficiência hepática; cortisol basal >2,0 mcg/dL afasta hipoadrenocorticismo com 99% de segurança.',
        limitations: 'Cortisol basal <2,0 mcg/dL não fecha Addison, exigindo teste confirmatório de estimulação com ACTH.',
        isGoldStandard: false,
      },
      {
        stepNumber: 4,
        title: 'Dosagem de Cobalamina (B12), Folato Sérico e Teste de α1-PI Fecal',
        description:
          'Painel de biomarcadores gastrointestinais de absorção e permeabilidade entérica:\n\n' +
          '- Cobalamina sérica: avaliação da integridade funcional dos enterócitos ileais e dos receptores CUBAM.\n' +
          '- Folato sérico: marcador de absorção do intestino proximal e indicador indireto de disbiose luminal.\n' +
          '- Inibidor de alfa-1 proteinase fecal (α1-PI): quantificação fecal de glicoproteína plasmática resistente à degradação digestiva.',
        purpose: 'Documentar deficiência de micronutrientes ileais e provar a perda de proteínas plasmáticas para o lúmen entérico.',
        interpretation: 'Cobalamina subnormal confirma afecção ileal; α1-PI fecal elevado comprova perda proteica gastrointestinal ativa antes da queda da albumina.',
        limitations: 'α1-PI requer coleta protocolada de três amostras fecais consecutivas sem contaminação sanguínea.',
        isGoldStandard: false,
      },
      {
        stepNumber: 5,
        title: 'Ultrassonografia Abdominal e Marcadores de Linfangiectasia',
        description:
          'Varredura ultrassonográfica minuciosa com transdutor linear de alta frequência:\n\n' +
          '- Estriações hiperecogênicas mucosas: linhas paralelas brilhantes na camada mucosa decorrentes de lacteais ectasiados repletos de linfa e lipídios.\n' +
          '- Parâmetros parietais: espessamento difuso ou segmentar de camadas intestinais, estratificação e speckles hiperecogênicos.\n' +
          '- Rastreio cavitário: detecção de transudato peritoneal (ascite) e avaliação de linfonodos mesentéricos.',
        purpose: 'Identificar padrões característicos de linfangiectasia, detectar neoplasias focais e avaliar efusões.',
        interpretation: 'Estriações hiperecogênicas exibem especificidade de ~96% e sensibilidade de ~75% para linfangiectasia intestinal associada a PLE (ACVIM 2026).',
        limitations: 'A ausência de estriações não exclui linfangiectasia (~25% de falsos-negativos por doença segmentar jejunal ou jejuno inacessível).',
        isGoldStandard: false,
      },
      {
        stepNumber: 6,
        title: 'Avaliação Hemostática Global e POCUS Cavitário',
        description:
          'Painel hemostático e ultrassonografia focada à beira do leito (POCUS):\n\n' +
          '- Hemostasia: contagem de plaquetas, PT, aPTT, dímero D e tromboelastografia (TEG/ROTEM) quando disponível.\n' +
          '- POCUS AFAST/TFAST: rastreio rápido de derrame pleural, ascite e avaliação de veias cavas.',
        purpose: 'Identificar estado hipercoagulável de alto risco (CURATIVE 2022) e guiar toracocentese emergencial.',
        interpretation: 'PT/aPTT normais não descartam hipercoagulabilidade; presença de dímero D elevado e TEG hiperdinâmico reforçam risco trombótico iminente.',
        limitations: 'A dosagem de antitrombina isolada não discrimina com precisão quem desenvolverá tromboembolismo clínico.',
        isGoldStandard: false,
      },
      {
        stepNumber: 7,
        title: 'Endoscopia Digestiva Alta e Baixa com Amostragem Duodenal e Ileal',
        description:
          'Inspeção videoendoscópica da mucosa com pinçamento de biópsias múltiplas:\n\n' +
          '- Sinais macroscópicos: visualização de vilosidades mucosas proeminentes esbranquiçadas (lacteais dilatados), aspecto em flocos de neve e linfa intraluminal.\n' +
          '- Protocolo de coleta: obtenção de pelo menos 10 a 15 fragmentos adequados do duodeno e progressão obrigatória para amostragem do íleo terminal.',
        purpose: 'Inspecionar a mucosa sob visão direta e obter fragmentos para análise histopatológica sem laparotomia invasiva.',
        interpretation: 'Mucosa com pontilhado branco é altamente sugestiva de linfangiectasia; biópsia isolada de duodeno pode perder lesões ileais.',
        limitations: 'Amostra exclusivamente a camada mucosa superficial, podendo subestimar linfangiectasia profunda submucosa ou linfoma muscular.',
        isGoldStandard: false,
      },
      {
        stepNumber: 8,
        title: 'Biópsia Cirúrgica de Espessura Total (Laparoscopia / Laparotomia)',
        description:
          'Obtenção cirúrgica de fragmentos com inclusão de todas as camadas intestinais (mucosa, submucosa, muscular e serosa):\n\n' +
          '- Sítios de coleta: amostras transmurais de duodeno, jejuno proximal e médio, íleo e linfonodos mesentéricos sob visão direta.\n' +
          '- Cuidados técnicos: sutura atraumática em plano contínuo ou pontos simples separados com fio monofilamentar absorvível sintético.',
        purpose: 'Amostragem profunda quando a endoscopia for inconclusiva, o jejuno estiver afetado ou houver suspeita de neoplasia transmural.',
        interpretation: 'Permite avaliação completa da arquitetura linfática profunda e das camadas musculares.',
        limitations: 'Procedimento invasivo sob anestesia geral; hipoalbuminemia severa (<1,5 g/dL) eleva o risco de deiscência de sutura e cicatrização retardada.',
        isGoldStandard: false,
      },
      {
        stepNumber: 9,
        title: 'Histopatologia Integrada, Imuno-histoquímica e Teste de Clonalidade (PARR)',
        description:
          'Painel anatomopatológico completo e de biologia molecular integrada (ACVIM 2023 / 2026):\n\n' +
          '- Histopatologia (H&E): quantificação da dilatação de lacteais, edema de lâmina própria, abscessos de criptas e infiltrado celular.\n' +
          '- Imuno-histoquímica (CD3 e CD20): caracterização fenotípica de linfócitos T intraepiteliais e células B da lâmina própria.\n' +
          '- Teste molecular PARR: pesquisa de rearranjos clonais de receptores TCR-gama e imunoglobulina IgH em casos felinos ambíguos.',
        purpose: 'Diagnóstico definitivo da doença de base e diferenciação categórica entre enterite inflamatória (LPE) e linfoma alimentar de baixo grau (LGITL).',
        interpretation: 'Lacteais dilatados com infiltrado linfoplasmocítico confirmam CIE associada a LI; em felinos, a clonalidade deve ser correlacionada com a morfologia e IHQ.',
        limitations: 'Clonalidade no PARR não é sinônimo absoluto de câncer, podendo ocorrer em processos reativos exuberantes.',
        isGoldStandard: true,
      },
    ],
  },

  treatment: {
    paradigmaTerapeuticoContemporaneo:
      'A revolução no manejo contemporâneo da PLE estabelece a terapia nutricional como eixo primário e central (ACVIM 2026):\n\n' +
      '- Abandono do reflexo esteroidal: durante décadas, a conduta inicial padrão consistia na prescrição imediata de doses agressivas de prednisona com escalonamento rápido de imunossupressores.\n' +
      '- Protagonismo dietético comprovado: estudos modernos demonstram que grande parcela dos cães rotulados como córtico-resistentes respondem à adequação do teor de gordura da dieta.\n' +
      '- Estratificação guiada por fenótipo: estabilizar hemodinâmica, alimentar com restrição mecânica de gordura, instituir tromboprofilaxia e modular a imunidade se houver resposta parcial.',
    terapiaNutricionalEixoCentral:
      'Fundamentação fisiopatológica e mecânica da restrição profunda de lipídios:\n\n' +
      '- Redução da pressão intralacteal: dietas com baixo teor de gordura diminuem a síntese de quilomícrons, reduzindo diretamente o fluxo e a pressão hidrostática linfática.\n' +
      '- Limiar de gordura na dieta: recomenda-se formalmente teor de gordura inferior a 2,0 g/100 kcal na matéria seca; casos graves ou refratários demandam teores <1,5 g/100 kcal.\n' +
      '- Cuidado com o rótulo comercial: dietas comerciais rotuladas como gastrointestinais podem conter teores moderados a altos de gordura, sendo inadequadas para linfangiectasia.',
    dietasComerciaisVsUltraLowFatCaseira:
      'Seleção entre formulações industrializadas e dietas caseiras formuladas:\n\n' +
      '- Formulações comerciais low-fat: rações terapêuticas industrializadas de baixo teor lipídico são equilibradas e de fácil manejo, devendo ser tentadas inicialmente.\n' +
      '- Formulações caseiras ultra-low-fat: peito de frango cozido com arroz ou batata e suplementação vitamínica balanceada por nutrólogo alcançam teores lipídicos mínimos.\n' +
      '- ALERTA NUTRICIONAL: dietas caseiras simplificadas são incompletas a longo prazo; sem suporte nutrológico especializado, induzem deficiências de cálcio, vitaminas e ácidos graxos essenciais.',
    evidenciasClinicasDaRespostaDietetica:
      'Estudos clínicos seminais que sustentam a intervenção dietética prioritária:\n\n' +
      '- Monoterapia dietética (Myers et al., 2023): em 14 cães com PLE e ultrassom compatível com LI tratados inicialmente apenas com dieta low-fat, 11 atingiram remissão clínica sustentada (6 responderam unicamente à dieta, sem corticoides).\n' +
      '- Resgate na córtico-resistência (Wennogle et al., 2021): 8 de 10 cães com PLE classificados como resistentes a esteroides alcançaram remissão completa apenas trocando a dieta para formulação com menor teor de gordura.\n' +
      '- Linfangiectasia refratária (Okanishi et al.): restrição profunda adicional de gordura resgatou 79% (19/24) dos cães que falharam à prednisolona ou recidivaram na redução.',
    nutricaoEnteralAssistida:
      'Importância da nutrição contínua e prevenção do colapso catabólico:\n\n' +
      '- Suporte enteral por sonda (Economu et al., 2021): cães com PLE recebendo suporte precoce por sonda nasoesofágica ou esofágica atingiram 76% de desfecho positivo versus jejum prolongado.\n' +
      '- Prevenção da síndrome de realimentação (Refeeding Syndrome): em pacientes cronicamente anoréxicos, reintroduzir calorias gradualmente monitorando fósforo, potássio e magnésio séricos.',
    tromboprofilaxiaCaninaCURATIVE:
      'Diretrizes de profilaxia antitrombótica fundamentadas no consenso CURATIVE 2022:\n\n' +
      '- Classificação de risco: PLE canina é enquadrada como afecção médica de alto risco para tromboembolismo venoso e arterial grave.\n' +
      '- Fármacos de escolha: antiagregantes plaquetários (Clopidogrel 1,1 a 2,0 mg/kg VO q24h) ou inibidores do fator Xa (Rivaroxabana 0,5 a 1,0 mg/kg VO q24h).\n' +
      '- Lacuna da literatura (ACVIM 2026): embora a tromboprofilaxia seja fortemente indicada no cão, o protocolo ótimo (fármaco, dose e duração) especificamente para PLE segue em consolidação investigativa.\n' +
      '- VETO A EXTRAPOLAÇÕES FELINAS: não há evidência científica suficiente que justifique tromboprofilaxia automática sistemática para gatos com PLE sem comorbidade cardíaca ou neoplásica associada.',
    suplementacaoDeCobalamina:
      'Protocolos contemporâneos de reposição de cobalamina (B12) baseados no ACVIM 2026:\n\n' +
      '- Reposição oral diária: cianocobalamina na dose de 25 mcg/kg VO a cada 24 horas por 84 dias consecutivos, sustentada por ensaios clínicos randomizados em cães.\n' +
      '- Reposição parenteral semanal: aplicações subcutâneas de hidroxocobalamina ou cianocobalamina conforme porte por 6 semanas, seguida de reavaliação sérica laboratorial.',
    terapiaImunomoduladoraRacional:
      'Imunossupressão protocolada conforme diretrizes do consenso ACVIM 2026:\n\n' +
      '- Prednisolona de primeira linha: 1 a 2 mg/kg VO q24h (ou 20 a 40 mg/m² q24h para cães >25 kg) por 2 a 3 semanas, seguida de desmame gradual monitorado pela albumina.\n' +
      '- Absorção comprovada (Jablonski et al., 2025): ensaio farmacocinético prospectivo comprovou que a exposição total à prednisolona oral em cães com PLE é idêntica a cães sadios, descartando a má absorção como causa rotineira de refratariedade.\n' +
      '- Budesonida como alternativa: 3 mg/m² VO q24h (ou 0,5 a 1 mg q24h em 3-7 kg; 1 a 2 mg em 7-15 kg; 2 a 3 mg em 15-30 kg; 3 a 5 mg em >30 kg); possui efeitos sistêmicos e supressão do eixo adrenal comprovados.\n' +
      '- Ciclosporina: 3 a 5 mg/kg VO q12h ou q24h por no mínimo 6 a 10 semanas; opção valiosa para resgate ou desmame de esteroides em enteropatias inflamatórias graves.\n' +
      '- Clorambucil: 2 a 4 mg/m² VO q24h associado à prednisolona; demonstrou taxas superiores de remissão e sobrevida em comparação à azatioprina em estudo de Dandrieux et al. (2013).\n' +
      '- VETO FORMAL A AZATIOPRINA EM GATOS: contraindicação toxicológica absoluta pelo risco iminente de aplasia medular fatal na espécie felina.',
    suporteEmergencialComMacromoleculas:
      'Critérios estritos para expansão oncótica emergencial e resgate com coloides:\n\n' +
      '- Albumina humana concentrada (HSA a 25%): restrita a casos críticos refratários em UTI; acarreta risco de anafilaxia imediata e doença do soro tardia (hipersensibilidade tipo III) por ser proteína heteróloga.\n' +
      '- Limitação do plasma fresco congelado (FFP): concentrações de albumina no plasma são insuficientes para restaurar a pressão oncótica de forma isolada sem grandes volumes, sendo prioritário para coagulopatias e fatores.\n' +
      '- Veto a coloides sintéticos: hidroxietilamidos não tratam a causa de base e elevam risco de lesão renal aguda e discrasias hemostáticas.',
    manejoDeEfusoesEDisturbiosEletroliticos:
      'Diretrizes fisiológicas para punções cavitárias e correção hidroeletrolítica:\n\n' +
      '- Toracocentese terapêutica imediata: drenagem pleural de alívio deve ser realizada precocemente perante desconforto respiratório restritivo evidente.\n' +
      '- Paracentese abdominal criteriosa: drenar ascite apenas quando houver compressão respiratória diafragmática severa ou dor por tensão capsular excessiva.\n' +
      '- Veto ao uso rotineiro de diuréticos: diuréticos de alça (furosemida) em ascite puramente oncótica reduzem o volume arterial efetivo, pioram a perfusão renal e deflagram choque hipovolêmico sem resolver o derrame.\n' +
      '- Correção mandatória de magnésio: repor sulfato de magnésio a 50% (0,3 a 0,5 mEq/kg/dia IV em infusão contínua lenta) para desbloquear a resposta do paratormônio e corrigir o cálcio ionizado.',
    terapiasDeResgateOctreotida:
      'Uso exploratório de análogos de somatostatina em linfangiectasia refratária:\n\n' +
      '- Mecanismo proposto: redução do fluxo sanguíneo esplâncnico, inibição de secreções gastrointestinais e diminuição da pressão linfática mesentérica.\n' +
      '- Evidência clínica e doses: doses empíricas relatadas de 4 a 39 mcg/kg/dia SC; estudos observacionais demonstraram benefício em metade dos cães refratários, devendo ser mantida como terapia de resgate de terceira linha.',
    terapiaEtiologicaEspecifica:
      'Tratamento direcionado à causa de base após confirmação etiológica:\n\n' +
      '- Desparasitação ampla: fenbendazol (50 mg/kg VO q24h por 3 a 5 dias) para erradicação empírica de nematódeos e protozoários.\n' +
      '- Terapia antifúngica: itraconazol ou anfotericina B em casos confirmados de histoplasmose ou pitiose entérica.\n' +
      '- Cirurgia oncológica ou resolutiva: ressecção cirúrgica com margem de neoplasias obstrutivas ou correção de intussuscepção.',
    particularidadesTerapeuticasFelinas:
      'Diretrizes de manejo para os raros casos diagnosticados na espécie felina:\n\n' +
      '- Inexistência de protocolo padrão de PLE: no gato, o tratamento é estritamente etiológico e direcionado à doença diagnosticada por biópsia.\n' +
      '- Manejo do LGITL felino: protocolo de prednisolona (1 a 2 mg/kg VO q24h) associada a clorambucil oral (2 mg/gato a cada 48-72 horas ou em pulsos), monitorando hemograma completo a cada 2 a 4 semanas.',
    tabelaResumoFarmacosDoses: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Protocolos Farmacológicos, Doses e Alertas na PLE em Cães e Gatos (ACVIM 2026)',
      headers: ['Fármaco / Modalidade', 'Indicação Primária na PLE', 'Esquema Posológico Recomendado', 'Alertas Toxicológicos e Cuidados'],
      rows: [
        ['Dieta Ultra-Low-Fat', 'Terapia primária obrigatória na linfangiectasia', 'Teor de gordura <2 g/100 kcal na matéria seca', 'Garantir aporte calórico e proteico; dieta caseira exige nutrólogo'],
        ['Clopidogrel', 'Tromboprofilaxia canina de rotina (CURATIVE)', '1,1 a 2,0 mg/kg VO a cada 24 horas', 'Monitorar sangramentos ocultos; evitar em hemorragias GI ativas'],
        ['Rivaroxabana', 'Tromboprofilaxia canina alternativa ao clopidogrel', '0,5 a 1,0 mg/kg VO a cada 24 horas', 'Inibidor seletivo do fator Xa; avaliar função renal e hepática'],
        ['Cianocobalamina', 'Reposição de B12 por má absorção ileal', '25 mcg/kg VO q24h por 84 dias (ACVIM 2026)', 'Seguro e desprovido de toxicidade; reavaliar níveis após o ciclo'],
        ['Prednisolona', 'Imunossupressão em CIE inflamatória refratária', '1 a 2 mg/kg VO q24h (20-40 mg/m² se >25 kg)', 'Agrava sarcopenia e hipercoagulabilidade; desmame após 2-3 semanas'],
        ['Budesonida', 'Alternativa com alta metabolização de primeira passagem', '3 mg/m² VO q24h (0,5 a 5 mg/gato conforme peso)', 'Não é isenta de efeitos sistêmicos; suprime o eixo hipotálamo-adrenal'],
        ['Ciclosporina', 'Segunda linha em CIE refratária a esteroides', '3 a 5 mg/kg VO a cada 12 a 24 horas', 'Monitorar vômitos, anorexia e hiperplasia gengival; seguro para desmame'],
        ['Clorambucil', 'Imunossupressor de resgate em PLE canina e LGITL felino', '2 a 4 mg/m² VO q24h (ou 2 mg/gato q48h em gatos)', 'Monitorar mielossupressão bissemanal; superior à azatioprina'],
        ['Sulfato de Magnésio', 'Correção de hipomagnesemia e tetania hipocalcêmica', '0,3 a 0,5 mEq/kg/dia IV em infusão contínua lenta', 'Infusão intravenosa lenta sob monitorização de eletrocardiograma'],
      ],
    },
    modalidadesPrincipais: [
      {
        drug: 'Clopidogrel',
        indication: 'Tromboprofilaxia primária em cães com PLE de alto risco (CURATIVE 2022).',
        dose: '1,1 a 2,0 mg/kg VO a cada 24 horas (iniciar com 2 mg/kg se risco iminente).',
        frequency: 'q24h',
        duration: 'Enquanto persistir hipoalbuminemia grave e risco pró-trombótico.',
        mechanism: 'Bloqueio irreversível dos receptores purinérgicos P2Y12 plaquetários, inibindo a agregação mediada por ADP.',
        cautions: 'Suspender 5 a 7 dias antes de biópsias cirúrgicas ou procedimentos invasivos planejados.',
        contraindications: 'Hemorragia gastrointestinal ativa macroscopicamente evidente.',
      },
      {
        drug: 'Prednisolona',
        indication: 'Imunossupressão de primeira linha em enteropatias inflamatórias com resposta parcial à dieta.',
        dose: '1 a 2 mg/kg VO a cada 24 horas (ou 20 a 40 mg/m² q24h em cães acima de 25 kg).',
        frequency: 'q24h',
        duration: 'Indução por 2 a 3 semanas; desmame gradual de 25% da dose a cada 2 a 4 semanas.',
        mechanism: 'Inibição da transcrição de citocinas inflamatórias (NF-kB), reduzindo permeabilidade e infiltrado celular da mucosa.',
        cautions: 'Acelera proteólise muscular e potencializa o estado pró-trombótico; absorção entérica comprovadamente preservada em PLE.',
        contraindications: 'Ulceração gastrointestinal ativa não tratada ou sepse sistêmica concomitante.',
      },
      {
        drug: 'Cianocobalamina (Vitamina B12)',
        indication: 'Tratamento de hipocobalaminemia secundária a má absorção ileal na PLE.',
        dose: '25 mcg/kg VO a cada 24 horas por 84 dias consecutivos (protocolo ACVIM 2026).',
        frequency: 'q24h',
        duration: '84 dias contínuos com reavaliação sérica posterior.',
        mechanism: 'Fornecimento de cofator celular para a metionina sintase e metilmalonil-CoA mutase, restaurando síntese de DNA e regeneração epitelial.',
        notes: 'Protocolo oral diário demonstrou eficácia equivalente a injeções em ensaios randomizados contemporâneos.',
      },
      {
        drug: 'Clorambucil',
        indication: 'Terapia imunossupressora de segunda linha em PLE canina refratária e padrão-ouro em LGITL felino.',
        dose: 'Cão: 2 a 4 mg/m² VO q24h; Gato: 2 mg/gato VO a cada 48 horas (ou esquemas em pulsos).',
        frequency: 'q24h (cão) ou q48h (gato)',
        duration: 'Contínuo sob monitoramento rigoroso até remissão estável.',
        mechanism: 'Agente alquilante bifuncional que forma ligações cruzadas no DNA, inibindo replicação celular e ativando apoptose de clones linfocíticos.',
        cautions: 'Exige monitoramento hematológico bissemanal por risco de mielossupressão (neutropenia e trombocitopenia).',
      },
    ],
  },

  complications: {
    tromboembolismoArterialEVenoso:
      'Complicação silenciosa de altíssima letalidade em cães com PLE:\n\n' +
      '- Localizações frequentes: tromboembolismo pulmonar (PTE), trombose de artéria aórtica distal e trombose da veia porta.\n' +
      '- Incidência oculta: Oishi et al. (2025) demonstraram que a maioria dos trombos em angio-TC é subclínica, podendo descompensar subitamente perante estresse ou cateterização.',
    desnutricaoSarcopeniaECaquexia:
      'Consumo catabólico extremo de massas magras e depleção nitrogenada:\n\n' +
      '- Sarcopenia avançada: atrofia muscular que deprime imunidade, prolonga internações e correlaciona-se diretamente com menor sobrevida.\n' +
      '- Subestimação do peso: a presença de ascite volumosa mascara a perda real de massa corporal magra na balança comum.',
    efusoesCavitariasDescompensadas:
      'Efusões volumosas que comprometem a mecânica ventilatória e abdominal:\n\n' +
      '- Derrame pleural compressivo: atelectasia pulmonar por compressão externa gerando insuficiência respiratória hipoxêmica aguda.\n' +
      '- Ascite sob tensão: elevação da pressão intra-abdominal que restringe a expansão do diafragma e compromete a perfusão esplâncnica.',
    disturbiosEletroliticosEEndocrinos:
      'Emergências minerais decorrentes de má absorção e carência de micronutrientes:\n\n' +
      '- Crise de hipocalcemia tetânica: tremores musculares generalizados, fasciculações faciais e convulsões disparadas por queda do cálcio ionizado.\n' +
      '- Hipomagnesemia refratária: bloqueio endócrino do PTH que impede a correção do cálcio sérico até que o magnésio seja restaurado.',
    imunodeficienciaSecundariaEInfeccoes:
      'Falência imunológica secundária à espoliação humoral e celular enteral:\n\n' +
      '- Perda de imunoglobulinas e linfócitos: extravasamento contínuo de linfa provoca hipogamaglobulinemia e linfopenia acentuada.\n' +
      '- Infecções oportunistas: sepse bacteriana de origem entérica e suscetibilidade aumentada a pneumonias hospitalares e bacteremias.',
    toxicidadeDeImunossupressores:
      'Eventos adversos iatrogênicos decorrentes da imunomodulação intensiva:\n\n' +
      '- Efeitos deletérios dos corticoides: hepatopatia esteroidal, atrofia cutânea, susceptibilidade a infecções do trato urinário e amplificação do risco trombótico.\n' +
      '- Mielotoxicidade por agentes alquilantes: neutropenia febril e trombocitopenia iatrogênica associadas ao uso de clorambucil.',
    prognosticoETempoDeSobrevida:
      'Heterogeneidade prognóstica marcante dependente do fenótipo de resposta clínica:\n\n' +
      '- Cães dietorresponsivos: prognóstico muito bom a excelente, com remissão clínica sustentada e normalização da sobrevida longitudinal.\n' +
      '- Populações hospitalizadas de centros terciários: mortalidade hospitalar de aproximadamente 21,5% em cães admitidos criticamente (Hawes & Kathrani, 2024).\n' +
      '- Impacto da resposta precoce no Yorkshire Terrier: cães respondedores à intervenção atingem sobrevida mediana de 44 meses versus apenas 12 meses nos não respondedores (Simmerson et al., 2014).\n' +
      '- Fatores prognósticos desfavoráveis: hipoalbuminemia grave persistente, hipovitaminose D (Allenspach et al., 2017), BUN elevado, sarcopenia grave e complicações trombóticas.',
  },

  prevention: {
    vigilanciaClinicaEDeteccaoPrecoce:
      'Estratégias de triagem clínica precoce e rastreamento de hipoalbuminemia:\n\n' +
      '- Avaliação de peso e escores corporais: acompanhamento longitudinal obrigatório do BCS e do escore de massa muscular (MCS) em toda consulta clínica.\n' +
      '- Triagem bioquímica geriátrica: inclusão sistemática de albumina e urinálise nos exames preventivos de cães de raças predispostas (Yorkie, Wheaten).\n' +
      '- Palpação de contornos corporais: busca precoce por atrofia muscular temporal e epaxial antes do desenvolvimento de ascite perceptível.',
    planoDomiciliarEInstrucaoDoTutor:
      'Orientações indispensáveis para o manejo domiciliar rigoroso pelo tutor:\n\n' +
      '- Aderência inegociável à dieta ultra-low-fat: explicar expressamente ao tutor que petiscos comuns, gorduras e restos de mesa descompensam a linfangiectasia em 24 a 48 horas.\n' +
      '- Monitoramento da Frequência Respiratória em Repouso (FRR): contagem semanal da respiração durante o sono (valores >30 mpm alertam para efusão pleural ou tromboembolismo).\n' +
      '- Pesagem semanal domiciliar: uso de balança digital para identificar perda de peso insidiosa antes da descompensação clínica.',
    errosComuns: [
      'Assumir que albumina baixa é sinônimo automático de PLE sem investigar sistematicamente perda renal (PLN) e insuficiência sintética hepática.',
      'Acreditar que a ausência de diarreia exclui o diagnóstico de PLE (até um terço dos cães manifesta apenas ascite e perda muscular).',
      'Confundir a síndrome de PLE com linfangiectasia intestinal: a linfangiectasia é uma causa ou fenótipo, mas não a totalidade da síndrome.',
      'Rotular o paciente como resistente a corticosteroides sem antes otimizar a dieta para teores estritamente baixos de gordura (<2 g/100 kcal).',
      'Prescrever rações gastrointestinais genéricas acreditando que são pobres em gordura (muitas contêm teores lipídicos moderados que alimentam a ectasia linfática).',
      'Acreditar que a prednisolona não é absorvida por via oral na PLE: a exposição e biodisponibilidade são comprovadamente normais (Jablonski et al., 2025).',
      'Administrar rotineiramente plasma fresco congelado ou albumina humana apenas para "corrigir a albumina" em paciente com perda enteral contínua ativa.',
      'Prescrever furosemida ou diuréticos em ascite puramente oncótica, induzindo hipovolemia, falência renal pré-renal e choque circulatório.',
      'Acreditar que tempos normais de coagulação (PT e aPTT) afastam o risco de tromboembolismo: eles não medem hipercoagulabilidade.',
      'Ignorar o cálcio ionizado e tratar apenas o cálcio total, ou tentar deduzir o iCa através de fórmulas matemáticas de correção da albumina.',
      'Suplementar vitamina D em altas doses apenas porque níveis séricos estão baixos, sem atentar para riscos graves de hipercalcemia e calcificação metastática.',
      'Interpretar clonalidade no teste molecular PARR em felinos como prova categórica de câncer, sem correlacionar com histopatologia e IHQ.',
      'Prescrever azatioprina em felinos, deflagrando mielossupressão fatal e aplasia medular iatrogênica irreversível.',
    ],
    redFlags: [
      'Dispneia aguda súbita, taquipneia em repouso e ortopneia (tromboembolismo pulmonar iminente ou derrame pleural massivo).',
      'Paraplegia aguda simétrica dolorosa com perda de pulso femoral e membros pélvicos frios (tromboembolismo aórtico agudo).',
      'Tremores musculares generalizados, fasciculações faciais e tetania (crise de hipocalcemia ionizada verdadeira por hipomagnesemia).',
      'Distensão abdominal tensa com desconforto respiratório diafragmático compressivo (ascite descompensada sob tensão).',
      'Deterioração clínica súbita com dor abdominal intensa e choque (trombose da veia porta ou perfuração intestinal).',
    ],
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
    'coagulacao-intravascular-disseminada-caes-gatos',
    'triade-felina',
    'hipoadrenocorticismo-addison',
    'linfoma-mediastinal-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'prednisolona',
    'clorambucil',
    'ciclosporina',
  ],

  references: [
    {
      id: 'ref-heilmann-acvim-2026',
      title: 'ACVIM-endorsed statement: consensus statement and systematic review on guidelines for the diagnosis and treatment of chronic inflammatory enteropathy in dogs',
      citationText: 'Heilmann RM, Jergens AE, Allenspach K, et al. ACVIM-endorsed statement: consensus statement and systematic review on guidelines for the diagnosis and treatment of chronic inflammatory enteropathy in dogs. Journal of Veterinary Internal Medicine. 2026;40(1):aalaf017.',
      authors: 'Heilmann RM, Jergens AE, Allenspach K, et al.',
      year: 2026,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '40',
      pages: 'aalaf017',
      sourceType: 'Consenso de Especialistas ACVIM',
      url: 'https://doi.org/10.1093/jvimsj/aalaf017',
      doi: '10.1093/jvimsj/aalaf017',
      evidenceLevel: 'A',
      notes: 'Consenso contemporâneo fundamental; estabelece CIE como termo preferencial, PLE como fenótipo de alta gravidade, protocolo de B12 por 84 dias e dieta antes de imunomoduladores.',
    },
    {
      id: 'ref-jablonski-ple-2026',
      title: 'Emerging Concepts in the Understanding and Treatment of Canine Protein-Losing Enteropathy',
      citationText: 'Jablonski SA. Emerging Concepts in the Understanding and Treatment of Canine Protein-Losing Enteropathy. Veterinary Clinics of North America: Small Animal Practice. 2026;56(3):715-729.',
      authors: 'Jablonski SA.',
      year: 2026,
      journal: 'Veterinary Clinics of North America: Small Animal Practice',
      volume: '56',
      pages: '715-729',
      sourceType: 'Revisão Temática',
      url: 'https://doi.org/10.1016/j.cvsm.2026.01.011',
      doi: '10.1016/j.cvsm.2026.01.011',
      evidenceLevel: 'A',
      notes: 'Revisão crítica e atualizada sobre PLE canina; destaca o resgate dietético em córtico-resistentes e novos biomarcadores.',
    },
    {
      id: 'ref-jablonski-lymphangiectasia-2022',
      title: 'Pathophysiology, Diagnosis, and Management of Canine Intestinal Lymphangiectasia: A Comparative Review',
      citationText: 'Jablonski SA. Pathophysiology, Diagnosis, and Management of Canine Intestinal Lymphangiectasia: A Comparative Review. Animals. 2022;12(20):2791.',
      authors: 'Jablonski SA.',
      year: 2022,
      journal: 'Animals',
      volume: '12',
      pages: '2791',
      sourceType: 'Revisão Comparativa Open Access',
      url: 'https://doi.org/10.3390/ani12202791',
      doi: '10.3390/ani12202791',
      evidenceLevel: 'A',
      notes: 'Revisão seminal detalhando anatomia dos lacteais, ciclo da gordura de cadeia longa, formação de lipogranulomas e dietas ultra-low-fat (CC BY 4.0).',
    },
    {
      id: 'ref-curative-delaforcade-2022',
      title: '2022 CURATIVE domain 1: Defining populations at risk for thrombosis',
      citationText: 'deLaforcade A, Blais MC, Goggs R, et al. 2022 CURATIVE domain 1: Defining populations at risk for thrombosis. Journal of Veterinary Emergency and Critical Care. 2022;32(2):165-179.',
      authors: 'deLaforcade A, Blais MC, Goggs R, et al.',
      year: 2022,
      journal: 'Journal of Veterinary Emergency and Critical Care',
      volume: '32',
      pages: '165-179',
      sourceType: 'Diretriz de Consenso CURATIVE',
      url: 'https://doi.org/10.1111/vec.13204',
      doi: '10.1111/vec.13204',
      evidenceLevel: 'A',
      notes: 'Classifica formalmente a enteropatia perdedora de proteínas canina como condição médica de alto risco trombótico exigindo tromboprofilaxia.',
    },
    {
      id: 'ref-oishi-thromboembolism-2025',
      title: 'Prospective Estimation of the Prevalence of Thromboembolism in Dogs With Inflammatory Protein-Losing Enteropathy Using Computed Tomography Angiography',
      citationText: 'Oishi N, et al. Prospective Estimation of the Prevalence of Thromboembolism in Dogs With Inflammatory Protein-Losing Enteropathy Using Computed Tomography Angiography. Journal of Veterinary Internal Medicine. 2025;39(2):e70098.',
      authors: 'Oishi N, et al.',
      year: 2025,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '39',
      pages: 'e70098',
      sourceType: 'Estudo Clínico Prospectivo',
      url: 'https://doi.org/10.1111/jvim.70098',
      doi: '10.1111/jvim.70098',
      evidenceLevel: 'B',
      notes: 'Avaliou 22 cães com PLE por angio-TC toracoabdominal; detectou tromboembolismo em 13,6% dos pacientes, a maioria assintomática.',
    },
    {
      id: 'ref-jablonski-prednisolone-pk-2025',
      title: 'Pharmacokinetics of oral prednisolone in dogs with protein-losing enteropathy compared to healthy controls',
      citationText: 'Jablonski SA, et al. Pharmacokinetics of oral prednisolone in dogs with protein-losing enteropathy compared to healthy controls. Journal of Veterinary Internal Medicine. 2025;39(1):e17277.',
      authors: 'Jablonski SA, et al.',
      year: 2025,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '39',
      pages: 'e17277',
      sourceType: 'Ensaio Farmacocinético Prospectivo',
      url: 'https://doi.org/10.1111/jvim.17277',
      doi: '10.1111/jvim.17277',
      evidenceLevel: 'B',
      notes: 'Demonstrou que a exposição sistêmica (AUC) e absorção oral de prednisolona não diferem entre cães com PLE e sadios, refutando a teoria de má absorção generalizada do corticoide.',
    },
    {
      id: 'ref-myers-lowfat-2023',
      title: 'Prospective Evaluation of Low-Fat Diet Monotherapy in Dogs with Presumptive Protein-Losing Enteropathy',
      citationText: 'Myers JA, et al. Prospective Evaluation of Low-Fat Diet Monotherapy in Dogs with Presumptive Protein-Losing Enteropathy. Journal of the American Animal Hospital Association. 2023;59(2):e7248.',
      authors: 'Myers JA, et al.',
      year: 2023,
      journal: 'Journal of the American Animal Hospital Association',
      volume: '59',
      pages: 'e7248',
      sourceType: 'Estudo Prospectivo',
      url: 'https://doi.org/10.5326/JAAHA-MS-7248',
      doi: '10.5326/JAAHA-MS-7248',
      evidenceLevel: 'B',
      notes: 'Avaliou monoterapia com dieta low-fat em cães com PLE e estriações ao ultrassom; 11 de 14 alcançaram remissão aos 6 meses, com rápida elevação de albumina.',
    },
    {
      id: 'ref-wennogle-steroid-resistant-2021',
      title: 'Prospective evaluation of a change in dietary therapy in dogs with steroid-resistant protein-losing enteropathy',
      citationText: 'Wennogle SA, et al. Prospective evaluation of a change in dietary therapy in dogs with steroid-resistant protein-losing enteropathy. Journal of Small Animal Practice. 2021;62(8):650-659.',
      authors: 'Wennogle SA, et al.',
      year: 2021,
      journal: 'Journal of Small Animal Practice',
      volume: '62',
      pages: '650-659',
      sourceType: 'Estudo Clínico Prospectivo',
      url: 'https://doi.org/10.1111/jsap.13334',
      doi: '10.1111/jsap.13334',
      evidenceLevel: 'B',
      notes: 'Comprovou que 8 de 10 cães com PLE refratária a esteroides entraram em remissão completa apenas trocando a dieta para menor teor lipídico.',
    },
    {
      id: 'ref-economu-enteral-2021',
      title: 'The effect of assisted enteral feeding on treatment outcome in dogs with inflammatory protein-losing enteropathy',
      citationText: 'Economu L, et al. The effect of assisted enteral feeding on treatment outcome in dogs with inflammatory protein-losing enteropathy. Journal of Veterinary Internal Medicine. 2021;35(4):1753-1761.',
      authors: 'Economu L, et al.',
      year: 2021,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '35',
      pages: '1753-1761',
      sourceType: 'Estudo Retrospectivo Coorte',
      url: 'https://doi.org/10.1111/jvim.16125',
      doi: '10.1111/jvim.16125',
      evidenceLevel: 'B',
      notes: 'Avaliou 57 cães com PLE inflamatória; suporte enteral precoce por sonda correlacionou-se a 76% de desfecho positivo.',
    },
    {
      id: 'ref-dandrieux-chlorambucil-2013',
      title: 'Chlorambucil-prednisolone versus azathioprine-prednisolone in chronic enteropathy with protein-losing enteropathy in dogs',
      citationText: 'Dandrieux JRS, et al. Chlorambucil-prednisolone versus azathioprine-prednisolone in chronic enteropathy with protein-losing enteropathy in dogs. Journal of the American Veterinary Medical Association. 2013;242(12):1705-1712.',
      authors: 'Dandrieux JRS, et al.',
      year: 2013,
      journal: 'JAVMA',
      volume: '242',
      pages: '1705-1712',
      sourceType: 'Estudo Comparativo de Coorte',
      url: 'https://doi.org/10.2460/javma.242.12.1705',
      doi: '10.2460/javma.242.12.1705',
      evidenceLevel: 'B',
      notes: 'Demonstrou sobrevida e recuperação de albumina significativamente superiores com clorambucil associado a prednisona versus azatioprina.',
    },
    {
      id: 'ref-allenspach-vitamind-2017',
      title: 'Hypovitaminosis D is associated with negative outcome in dogs with protein losing enteropathy',
      citationText: 'Allenspach K, et al. Hypovitaminosis D is associated with negative outcome in dogs with protein losing enteropathy: a retrospective study of 43 cases. BMC Veterinary Research. 2017;13(1):102.',
      authors: 'Allenspach K, et al.',
      year: 2017,
      journal: 'BMC Veterinary Research',
      volume: '13',
      pages: '102',
      sourceType: 'Estudo Retrospectivo',
      url: 'https://doi.org/10.1186/s12917-017-1022-7',
      doi: '10.1186/s12917-017-1022-7',
      evidenceLevel: 'B',
      notes: 'Demonstrou que 25-OH-vitamina D sérica reduzida correlaciona-se com prognóstico desfavorável na PLE canina.',
    },
    {
      id: 'ref-simmerson-yorkshire-2014',
      title: 'Clinical features, intestinal histopathology, and outcome in protein-losing enteropathy in Yorkshire Terriers',
      citationText: 'Simmerson SM, et al. Clinical features, intestinal histopathology, and outcome in protein-losing enteropathy in Yorkshire Terriers. Journal of Veterinary Internal Medicine. 2014;28(2):331-337.',
      authors: 'Simmerson SM, et al.',
      year: 2014,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '28',
      pages: '331-337',
      sourceType: 'Série de Casos e Coorte',
      url: 'https://doi.org/10.1111/jvim.12291',
      doi: '10.1111/jvim.12291',
      evidenceLevel: 'B',
      notes: 'Descreveu 30 Yorkies com PLE; destacou lesões de criptas e dilatação lacteal, ausência de diarreia em um terço dos casos e sobrevida de 44 vs 12 meses.',
    },
    {
      id: 'ref-heilmann-a1pi-2016',
      title: 'Serum and fecal canine α1-proteinase inhibitor concentrations reflect severity of intestinal crypt abscesses and lacteal dilation in dogs',
      citationText: 'Heilmann RM, et al. Serum and fecal canine α1-proteinase inhibitor concentrations reflect severity of intestinal crypt abscesses and lacteal dilation in dogs. The Veterinary Journal. 2016;207:98-105.',
      authors: 'Heilmann RM, et al.',
      year: 2016,
      journal: 'The Veterinary Journal',
      volume: '207',
      pages: '98-105',
      sourceType: 'Estudo de Validação Diagnóstica',
      url: 'https://doi.org/10.1016/j.tvjl.2015.10.042',
      doi: '10.1016/j.tvjl.2015.10.042',
      evidenceLevel: 'B',
      notes: 'Avaliou α1-PI em 120 cães biopsiados, demonstrando correlação direta entre concentrações fecais e gravidade de dilatação lacteal e lesões de cripta.',
    },
    {
      id: 'ref-marsilio-acvim-felino-2023',
      title: 'ACVIM consensus guidelines on distinguishing low-grade neoplastic from inflammatory lymphocytic chronic enteropathies in cats',
      citationText: 'Marsilio S, et al. ACVIM consensus guidelines on distinguishing low-grade neoplastic from inflammatory lymphocytic chronic enteropathies in cats. Journal of Veterinary Internal Medicine. 2023;37(3):802-816.',
      authors: 'Marsilio S, et al.',
      year: 2023,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '37',
      pages: '802-816',
      sourceType: 'Consenso de Especialistas ACVIM',
      url: 'https://doi.org/10.1111/jvim.16690',
      doi: '10.1111/jvim.16690',
      evidenceLevel: 'A',
      notes: 'Consenso de referência para a abordagem felina; destaca a raridade de PLE primária em gatos e o algoritmo para diferenciar LPE de LGITL.',
    },
    {
      id: 'ref-nelson-couto-2020-ple',
      title: 'Small Animal Internal Medicine (6ª ed.) — Capítulos 27 e 31: Distúrbios Intestinais e PLE',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6. ed. St. Louis: Elsevier, 2020. Cap. 27: Diagnostic Tests for the Alimentary Tract, p. 424; Cap. 31: Disorders of the Intestinal Tract, p. 495–497.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Elsevier',
      sourceType: 'Livro-texto de Referência',
      notes: 'Fundamenta etiologias de PLE, fisiopatologia da ruptura de lacteais, lipogranulomas, doença segmentar jejunal/ileal, estriações no ultrassom e dieta ultra-low-fat.',
    },
    {
      id: 'ref-fluid-disorders-2021-ple',
      title: 'Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice (5ª ed.) — Distúrbios do Cálcio e Expansão Plasmática',
      citationText: 'DiBartola SP. Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 5. ed. St. Louis: Saunders Elsevier, 2021. Cap. 7: Disorders of Calcium, p. 168; Cap. 26: Macromolecular Therapy, p. 656–657.',
      authors: 'DiBartola SP.',
      year: 2021,
      journal: 'Saunders Elsevier',
      sourceType: 'Livro-texto de Referência',
      notes: 'Descreve a discrepância entre cálcio total e ionizado na PLE, a inibição funcional do PTH por hipomagnesemia e a fisiologia da pressão oncótica intersticial.',
    },
    {
      id: 'ref-withrow-macewen-2020-ple',
      title: 'Withrow & MacEwen’s Small Animal Clinical Oncology (6ª ed.) — Capítulo 33: Tumores Hematopoiéticos e Linfoma Alimentar',
      citationText: 'Vail DM, Thamm DH, Liptak JM. Withrow & MacEwen’s Small Animal Clinical Oncology. 6. ed. St. Louis: Elsevier, 2020. Cap. 33: Hematopoietic Tumors, p. 719–721.',
      authors: 'Vail DM, Thamm DH, Liptak JM.',
      year: 2020,
      journal: 'Elsevier',
      sourceType: 'Livro-texto de Referência',
      notes: 'Referência oncológica para diferenciação entre enterite linfocítica e linfoma intestinal felino de baixo grau (LGITL).',
    },
  ],
};
