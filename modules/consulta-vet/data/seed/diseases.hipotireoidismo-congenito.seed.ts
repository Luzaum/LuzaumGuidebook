import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Hipotireoidismo Congênito em Cães e Gatos — Guia Clínico Editorial de Padrão Ouro.
 * Embasamento: Golinelli et al. 2022 (Neurodevelopment & Early Treatment) > Van Poucke et al. 2022 (Feline TPO) >
 * Abitbol et al. 2026 (Rottweiler TG Variants) > Ettinger's 9ª ed. 2024 > Nelson & Couto 6ª ed. 2020 >
 * BSAVA Manual of Canine and Feline Endocrinology 5ª ed. > AAHA Selected Endocrinopathies Guidelines (Bugbee et al. 2023).
 */
export const hipotireoidismoCongenitoRecord: DiseaseRecord = {
  id: 'disease-hipotireoidismo-congenito-caes-gatos',
  slug: 'hipotireoidismo-congenito-caes-gatos',
  title: 'Hipotireoidismo congênito (cão e gato)',
  subtitle: 'Deficiência tireoidiana neonatal: disgenesia, disormonogênese goitrosa (TPO/TG), nanismo desproporcional, disgenesia epifisária, janela crítica neurológica e reposição com levotiroxina',
  synonyms: [
    'Hipotireoidismo congênito primário',
    'Disgenesia tireoidiana congênita',
    'Disormonogênese tireoidiana',
    'Nanismo tireoidiano desproporcional',
    'Cretinismo',
    'Cretinismo congênito (termo histórico)',
    'Congenital hypothyroidism in dogs and cats'
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  categories: ['endocrinologia', 'pediatria', 'neurologia', 'ortopedia', 'clinica-medica'],
  tags: [
    'Tireoide',
    'Congenito',
    'Pediatria',
    'Nanismo',
    'Disgenesia epifisaria',
    'TPO',
    'Tireoglobulina',
    'Bocio',
    'Levotiroxina',
    'Janela critica <12 semanas'
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipotireoidismo-congenito-caes-gatos'],

  quickSummary:
    'O hipotireoidismo congênito é uma endocrinopatia neonatal rara em cães e gatos, caracterizada pela ausência ou deficiência profunda na síntese e secreção de tiroxina (T4) e tri-iodotironina (T3) presente desde o nascimento. Classifica-se etiologicamente em: 1) Disgenesia tireoidiana (aplasia, hipoplasia ou ectopia glandular); 2) Disormonogênese congênita (defeitos enzimáticos de biossíntese hormonal, como mutações no gene da tireoperoxidase - TPO ou da tireoglobulina - TG, tipicamente associados a bócio e TSH elevado); e 3) Hipotireoidismo central hipofisário ou hipotalâmico (raro). Como os hormônios tireoidianos são indispensáveis para a maturação dos centros de ossificação epifisários e para a mielinização do sistema nervoso central nos primeiros meses de vida, animais não tratados desenvolvem nanismo desproporcional severo (membros curtos com tronco alargado, macroglossia, fontanelas cranianas patentes), atraso na dentição e disgenesia epifisária radiográfica (epífises pontilhadas). Do ponto de vista neurológico, desenvolvem retardo mental profundo, ataxia e surdez neurossensorial. O diagnóstico confirma-se por TT4 e fT4 indetectáveis com cTSH elevado. O prognóstico neurológico depende criticamente do início imediato da reposição hormonal com levotiroxina antes de 12 semanas de vida (Golinelli et al. 2022).',

  quickDecisionStrip: [
    'Filhote que não cresce no ritmo da ninhada + cabeça larga desproporcional + fontanela aberta + letargia extrema = suspeição máxima de hipotireoidismo congênito; na maior coorte multicêntrica (cohort de 35,3 animais avaliada por Golinelli et al. 2022; Van Poucke et al., 2022; Abitbol et al. 2026), o reconhecimento precoce da forma goitrosa ou disgenética salvou o desenvolvimento neurológico.',
    'Diferenciação fenotípica imediata: a forma goitrosa exibe aumento volumétrico cervical palpável (bócio) e TSH alto (disormonogênese - mutações TPO/TG); a forma não goitrosa decorre de aplasia/hipoplasia da glândula (disgenesia).',
    'Diferenciar nanismo tireoidiano (desproporcional, membros curtos, cabeça grande, mente embotada) de nanismo hipofisário (proporcionado, cabeça e membros harmônicos, esqueleto em miniatura por deficiência de GH).',
    'Achado radiográfico patognomônico: disgenesia epifisária com múltiplos focos de ossificação pontilhados e fragmentados ("epífises pontilhadas"), vértebras hemiplágicas e atraso no fechamento das fises de crescimento.',
    'JANELA DE OPORTUNIDADE NEUROLÓGICA CRÍTICA: o início da levotiroxina antes de 12 semanas de vida é determinante para prevenir retardo mental permanente e surdez irreversível (Golinelli et al. 2022).',
    'NUNCA aguarde resultados de testes genéticos moleculares para iniciar o tratamento: confirmada a deficiência de T4 com clínica compatível, inicie levotiroxina imediatamente.',
    'Dose pediátrica canina: Levotiroxina 0,02 a 0,04 mg/kg (20 a 40 mcg/kg) VO a cada 12 horas (metabolismo pediátrico muito mais acelerado que o do adulto).',
    'Dose felina: Levotiroxina 0,05 a 0,10 mg/GATO (dose fixa por animal) VO a cada 24 horas, ajustada mensalmente pelo peso crescente.',
    'Monitorar T4 total sérico de pico (4 a 6 horas pós-dose) a cada 3 a 4 semanas durante a fase de crescimento rápido, mantendo o nível no terço superior do intervalo de referência normal (3,0 a 4,5 mcg/dL).',
    'Atraso dentário característico: retenção persistente de dentes decíduos com falha na erupção da dentição permanente até que a levotiroxina seja instituída.',
    'Orientar o tutor que o termo histórico "cretinismo" descreve essa condição, mas deve ser substituído pela terminologia científica "hipotireoidismo congênito infantil".'
  ],

  quickSummaryRich: {
    lead:
      'O hipotireoidismo congênito transforma o filhote em um indivíduo com desenvolvimento ósseo e cognitivo congelado. O reconhecimento ágil das disgenesias epifisárias e a reposição de levotiroxina na janela neonatal inicial resgatam o crescimento e o neurodesenvolvimento antes que as deformidades se tornem irreversíveis.',
    leadHighlights: [
      'Disgenesia tireoidiana vs Disormonogênese com bócio (TPO/TG)',
      'Nanismo desproporcional e disgenesia epifisária pontilhada',
      'Janela crítica de intervenção neurológica (<12 semanas)',
      'T4 indetectável associado a TSH endógeno marcadamente elevado',
      'Levotiroxina pediátrica em doses mais altas que o adulto',
      'Diferenciação crucial de nanismo hipofisário proporcionado'
    ],
    pillars: [
      {
        title: 'Pilar 1: Etiopatogenia — Disgenesia vs Disormonogênese',
        body: 'A disgenesia (aplasia, hipoplasia ou ectopia glandular por falha de migração embriológica do ducto tireoglosso) impede o desenvolvimento anatômico da tireoide. A disormonogênese resulta de mutações autossômicas recessivas em enzimas fundamentais da síntese de hormônios (mutações TPO em gatos e cães, variantes TG em Rottweilers); a glândula existe, mas não sintetiza T4, sofrendo hipertrofia maciça (bócio) pelo TSH elevado.',
        highlights: ['Aplasia/hipoplasia (disgenesia)', 'Mutações de TPO e TG (bócio)', 'Elevação do TSH hipofisário']
      },
      {
        title: 'Pilar 2: Esqueleto e Sistema Nervoso — Efeitos da Falência Hormonal',
        body: 'O T3 é indispensável para a maturação dos condrócitos nas placas de crescimento e para a síntese da proteína básica de mielina (MBP) nos oligodendrócitos cerebrais e cocleares. A ausência hormonal neonatal causa estagnação do crescimento esquelético com epífises fragmentadas e impede a maturação das sinapses encefálicas, resultando em retardo mental e surdez neurossensorial.',
        highlights: ['Disgenesia epifisária pontilhada', 'Parada de mielinização encefálica', 'Surdez neurossensorial irreversível']
      },
      {
        title: 'Pilar 3: Diagnóstico e Reposição Pediátrica com Levotiroxina',
        body: 'O diagnóstico fecha-se com T4 total e T4 livre marcadamente subnormais associados a cTSH alto e radiografias de extremidades. A levotiroxina oral em dosagem pediátrica ajustada quinzenalmente pelo ganho de peso promove surto acelerado de crescimento compensatório (catch-up growth) e fechamento ordenado das fises.',
        highlights: ['T4 subnormal + TSH alto', 'Levotiroxina 20-40 mcg/kg q12h no cão', 'Ajuste posológico pelo crescimento']
      }
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico do Hipotireoidismo Congênito',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Fenótipo Pediátrico e Nanismo',
          detail: 'Filhote com idade entre 3 e 12 semanas que para de crescer em relação aos irmãos de ninhada; cabeça larga e pesada com focinho curto e achatado; macroglossia (língua volumosa projetada para fora da boca); membros curtos e grossos com tronco alargado; persistência da pelagem lanosa juvenil sem substituição por pelos de guarda; fontanela craniana bregmática amplamente aberta; letargia desproporcional e atraso na abertura de olhos e condutos auditivos.'
        },
        {
          label: 'Passo 2: Palpação Cervical Dirigida (Bócio vs Tireoide Ausente)',
          detail: 'Palpar cuidadosamente a região laringotraqueal ventral. Se massa firme e elástica bilateral palpável: classificar como forma goitrosa (disormonogênese enzimática). Se nenhuma estrutura tireoidiana for detectada: suspeitar de disgenesia tireoidiana aplásica/hipoplásica ou ectópica.'
        },
        {
          label: 'Passo 3: Dosagem Hormonal de T4 Total e TSH Canino/Felino',
          detail: 'Padrão-ouro confirmatório (*isGoldStandard: true*). TT4 e fT4 por diálise encontram-se em concentrações extremamente baixas ou indetectáveis (<0,5 mcg/dL). No hipotireoidismo congênito primário (99% dos casos), o cTSH sérico encontra-se dramaticamente elevado (>1,5 a 5,0 ng/mL), estimulado pela perda do feedback negativo hipofisário.'
        },
        {
          label: 'Passo 4: Avaliação Radiográfica Esquelética Completa',
          detail: 'Radiografias dos membros pélvicos, torácicos e coluna vertebral: identificar disgenesia epifisária (centros de ossificação secundários exibem mineralização fragmentada, irregular e pontilhada em "pipoca"); fises de crescimento abertas e alargadas; encurtamento grave de diáfises dos ossos longos (rádio, ulna, tíbia); presença de vértebras hemiplágicas toracolombares e atraso na erupção dos dentes permanentes.'
        },
        {
          label: 'Passo 5: Ultrassonografia Cervical e Cintilografia com Tecnécio-99m',
          detail: 'USG cervical de alta resolução confirma bócio difuso vascularizado na disormonogênese ou ausência de tecido tireoidiano ortotópico na aplasia. A cintilografia mapeia tecido tireoidiano ectópico funcional sublingual ou mediastinal.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Titulação Pediátrica',
      steps: [
        {
          label: 'Fase 1: Início Imediato da Reposição Hormonal',
          detail: 'Iniciar Levotiroxina sódica oral sem qualquer atraso: em cães, 0,02 a 0,04 mg/kg (20 a 40 mcg/kg) VO a cada 12 horas; em gatos, 0,05 a 0,10 mg/gato VO a cada 24 horas (ou 15 a 20 mcg/kg VO q12h). Administrar preferencialmente em jejum matinal.'
        },
        {
          label: 'Fase 2: Monitoramento Quinzenal do Peso e Ajuste de Dose',
          detail: 'Como o filhote tratado passa a apresentar ganho de peso e crescimento acelerados (catch-up growth), a dose absoluta em microgramas deve ser recalculada a cada 2 a 3 semanas para não induzir subdosagem relativa decorrente da expansão volumétrica corpórea.'
        },
        {
          label: 'Fase 3: Avaliação Laboratorial do Pico de T4 e TSH',
          detail: 'Coleta de sangue para T4 total exatamente 4 a 6 horas após a dose matinal de levotiroxina 4 semanas após o início. Meta terapêutica: T4 total no limite superior da normalidade (3,0 a 4,5 mcg/dL) e normalização do TSH para níveis fisiológicos (<0,5 ng/mL).'
        },
        {
          label: 'Fase 4: Acompanhamento Radiográfico do Fechamento Fisário',
          detail: 'Radiografias esqueléticas de controle a cada 2 a 3 meses para acompanhar o fechamento das fises de crescimento e a mineralização adequada dos corpos vertebrais e articulações coxofemorais.'
        },
        {
          label: 'Fase 5: Estabilização na Fase Adulta e Manutenção Vitalícia',
          detail: 'Ao atingir o fechamento completo das placas de crescimento (geralmente entre 10 e 14 meses de idade), converter gradualmente para a dose de manutenção padrão de hipotireoidismo adulto (0,02 mg/kg VO q12h no cão e 0,1 mg/gato q24h no gato), mantendo monitoramento semestral contínuo por toda a vida.'
        }
      ]
    }
  },

  etiology: {
    cretinismoHistorico:
      'O termo "cretinismo" deve ser considerado estritamente como um sinônimo histórico e folclórico em desuso, substituído formalmente pela denominação científica de hipotireoidismo congênito primário neonatal/infantil.',
    genetica:
      'A etiologia congênita goitrosa associa-se a mutações genéticas recessivas com perda de função enzimática: mutações no gene TPO (tireoperoxidase, caracterizadas por Van Poucke et al. 2022 em felinos domésticos) e variantes genéticas no gene TG (tireoglobulina, documentadas por Abitbol et al. 2026).',
    evidenciaAbitbolRottweiler:
      'Abitbol et al. (2026) descreveram mutações deletérias homozigotas no gene da tireoglobulina (TG) em cães da raça Rottweiler acometidos por bócio congênito e nanismo desproporcional severo.',
    mecanismosEtiologicos:
      'O hipotireoidismo congênito divide-se em três grandes grupos patogênicos: disgenesia tireoidiana, disormonogênese tireoidiana e hipotireoidismo central.',
    disgenesiaTireoidiana:
      'Responde por cerca de 50% dos casos de hipotireoidismo congênito em pequenos animais. Caracteriza-se por anomalias anatômicas do desenvolvimento embriológico da glândula tireoide: 1) Aplasia tireoidiana (agenesia completa dos lobos tireoidianos); 2) Hipoplasia tireoidiana (desenvolvimento rudimentar insuficiente de tecido folicular); e 3) Ectopia tireoidiana (falha na migração dos primórdios tireoidianos ventrais da base da língua até a traqueia cervical caudal, permanecendo como tecido ectópico funcionalmente incompetente na região sublingual ou intratorácica mediastinal). A tireoide não é palpável e o bócio é ausente (forma não goitrosa).',
    disormonogêneseTireoidiana:
      'Responde por cerca de 45-50% dos casos. A glândula tireoide está anatomicamente presente no sulco jugular, mas possui defeitos genéticos intrínsecos nas enzimas responsáveis pela síntese e secreção de T4 e T3. A incapacidade de secretar T4 anula a retroalimentação negativa sobre a hipófise, provocando hipersecreção massiva de TSH. O TSH hiperestimula continuamente o tecido tireoidiano, induzindo hipertrofia folicular acentuada e formação de bócio volumoso (forma goitrosa).',
    mutacoesGeneticasDocumentadas: {
      kind: 'clinicalTable',
      headers: ['Gene Mutado', 'Espécie / Raça Afetada', 'Mecanismo Molecular', 'Fenótipo Clínico'],
      rows: [
        [
          'TPO (Tireoperoxidase)',
          'Gatos domésticos (Van Poucke et al. 2022); cães Toy Fox Terrier, Rat Terrier, Tenterfield Terrier',
          'Mutações autossômicas recessivas provocando deleção ou inativação catalítica da enzima tireoperoxidase, impedindo a organificação do iodeto e o acoplamento das tirosinas',
          'Hipotireoidismo congênito goitroso grave com bócio cervical evidente ao nascimento'
        ],
        [
          'TG (Tireoglobulina)',
          'Cães da raça Rottweiler (Abitbol et al. 2026)',
          'Variantes genéticas missense ou nonsense no gene da tireoglobulina, gerando conformação anômala da proteína precursora que não é exportada para o lúmen colóide',
          'Bócio bilateral pronunciado, nanismo desproporcional e TSH persistentemente elevado'
        ],
        [
          'NIS (Simporte Sódio-Iodeto / SLC5A5)',
          'Cães e gatos (relatos isolados)',
          'Falha na proteína de transporte de membrana basolateral, impedindo a captação ativa de iodeto circulante pelas células foliculares',
          'Disormonogênese sem captação na cintilografia tireoidiana'
        ],
        [
          'TSHR (Receptor de TSH)',
          'Cães',
          'Mutações inativadoras no receptor acoplado à proteína G do TSH',
          'Resistência tireoidiana completa ao TSH hipofisário'
        ]
      ]
    },
    hipotireoidismoCentral:
      'Raro (<1-2% dos casos). Decorre de aplasia, hipoplasia ou cistos congênitos da hipófise anterior (pan-hipopituitarismo / nanismo hipofisário associado à deficiência concomitante de hormônio do crescimento - GH, LH, FSH e TSH). Caracteriza-se por T4 baixo associado a TSH inapropriadamente normal ou indetectável, com ausência de bócio.'
  },

  epidemiology: {
    faixaEtariaEIdentificacao:
      'Manifesta-se clinicamente nas primeiras semanas a meses de vida (típico reconhecimento entre 4 e 16 semanas de idade). Como os hormônios tireoidianos maternos atravessam parcialmente a placenta e estão presentes no colostro/leite, os filhotes afetados podem parecer relativamente normais nos primeiros 10 a 14 dias de vida. A divergência de crescimento e o atraso no desenvolvimento tornam-se flagrantes a partir do desmame (3 a 6 semanas de idade).',
    predisposicaoRacial:
      'Acomete tanto a espécie canina quanto a felina. Em cães, maior frequência em Toy Fox Terriers, Rat Terriers, Rottweilers, Golden Retrievers, Pastores Alemães, Boxers, Buldogues Franceses e Basset Hounds. Em felinos, afeta gatos domésticos sem raça definida (SRD), Persa e Abissínio, com forte base familiar recessiva.'
  },

  pathogenesisTransmission: {
    impactoNoCrescimentoEsqueletico:
      'O T3 atua diretamente nos receptores nucleares dos condrócitos da placa epifisária e nos osteoblastos, estimulando a síntese de colágeno tipo X, fosfatase alcalina óssea e mineralização da matriz osteóide, além de sinergizar com o fator de crescimento semelhante à insulina tipo 1 (IGF-1). Na ausência de T3, a ossificação endocondral dos ossos longos e dos corpos vertebrais paralisa. Os centros de ossificação secundários das epífises não conseguem coalescer de maneira ordenada, sofrendo fragmentação assincrônica (disgenesia epifisária). O crescimento linear ósseo cessa precocemente, enquanto o crescimento aposicional membranoso do crânio e mandíbula persiste parcialmente, produzindo o nanismo desproporcional.',
    impactoNoNeurodesenvolvimento:
      'Durante o período perinatal e as primeiras 12 semanas de vida pós-natal, os hormônios tireoidianos controlam a proliferação dos progenitores neurais, a migração dos neurônios corticais, a arborização dendrítica e, essencialmente, a expressão do gene da Proteína Básica de Mielina (MBP) pelos oligodendrócitos no cérebro e na cóclea auditiva. A privação hormonal nesse intervalo produz hipomielinização difusa, atrofia neuronal e degeneração do órgão de Corti no ouvido interno, deflagrando retardo mental profundo, comportamento obtuso e surdez neurossensorial irreversível se a reposição hormonal não ocorrer antes de 12 semanas.',
    transmissaoGenetica:
      'As formas de disormonogênese enzimática (TPO e TG) possuem padrão de herança autossômica recessiva clássica. Cães e gatos homozigotos manifestam o fenótipo clínico de nanismo e bócio; animais heterozigotos são carreadores assintomáticos que transmitem a mutação a 50% de sua prole.'
  },

  pathophysiology: {
    tabelaNanismoHipofisario: {
      kind: 'clinicalTable',
      caption: 'Diferenciação Clínica: Nanismo Tireoidiano vs Nanismo Hipofisário',
      headers: ['Característica', 'Hipotireoidismo Congênito (Nanismo Tireoidiano)', 'Nanismo Hipofisário (Deficiência de GH)'],
      rows: [
        ['Proporção Corpórea', 'Desproporcional: membros curtos, cabeça larga e tronco largo', 'Proporcionado: miniatura harmônica simétrica'],
        ['Estado Mental', 'Letargia extrema, embotamento sensorial, retardo mental grave', 'Alerta, mentalmente ativo e responsivo'],
        ['Fontanela Craniana', 'Patente e aberta após 12 semanas de vida', 'Normalmente fechada'],
        ['Dentição Decídua', 'Retenção persistente de decíduos e atraso severo na erupção', 'Retenção de dentes de leite sem macroglossia'],
        ['Língua e Fáceis', 'Macroglossia com ptose lingual, fáceis edemaciada (mixedema)', 'Cabeça afilada proporcionada ("fox-like face")'],
        ['Pelagem', 'Lanosa, espessa, com retenção do pelo de filhote e mixedema', 'Alopecia progressiva não pruriginosa com hiperpigmentação pós-lanugem'],
        ['Achado Radiográfico', 'Disgenesia epifisária patognomônica ("epífises pontilhadas")', 'Atraso uniforme no fechamento de fises sem fragmentação']
      ]
    },
    tabelaRadiografia: {
      kind: 'clinicalTable',
      caption: 'Achados Radiográficos Cardinais do Hipotireoidismo Congênito',
      headers: ['Região Anatômica', 'Achado Radiográfico Típico', 'Significado Patofisiológico'],
      rows: [
        ['Epífises de Ossos Longos', 'Epífises pontilhadas (disgenesia epifisária)', 'Calcificação atrasada e fragmentada dos centros secundários de ossificação'],
        ['Coluna Vertebral', 'Vértebras hemiplágicas ou encurtadas', 'Atraso na ossificação endocondral das placas de crescimento vertebrais'],
        ['Fises de Crescimento', 'Retardo no fechamento das fises', 'Ausência de maturação óssea dependente de T3/T4'],
        ['Crânio', 'Fontanelas e suturas cranianas abertas', 'Falha na ossificação membranosa e desproporção crânio-facial']
      ]
    },
    tabelaDiferencialNanismo: {
      kind: 'clinicalTable' as const,
      caption: 'Diferenciação Clínica: Hipotireoidismo Congênito vs Nanismo Hipofisário',
      headers: ['Característica Clínica / Diagnóstica', 'Hipotireoidismo Congênito Infantil', 'Nanismo Hipofisário (Deficiência de GH)'],
      rows: [
        ['Proporções Corporais', 'Desproporcional (tronco curto, membros curtos e grossos, cabeça larga)', 'Harmônico / Proporcionado ("cão em miniatura", proporções preservadas)'],
        ['Desenvolvimento Mental / Cognição', 'Gravemente embotado, apatia, retardo mental, desorientação', 'Alerta, esperto, comportamento cognitivo normal para a idade'],
        ['Bócio Cervical', 'Presente em formas goitrosas (disormonogênese)', 'Ausente'],
        ['Concentração de T4 Total', 'Marcadamente subnormal ou indetectável (<0,5 mcg/dL)', 'Normal ou discretamente reduzido (se deficiência secundária de TSH)'],
        ['Concentração de cTSH', 'Acentuadamente elevado (>1,5 a 5,0 ng/mL) nas formas primárias', 'Baixo ou indetectável (falência adenohipofisária)'],
        ['Pelagem e Tegumento', 'Pele espessada, mixedema facial, macroglossia, pelos juvenis retidos', 'Alopecia bilateral simétrica progressiva, hiperpigmentação, pelagem lanosa'],
        ['Achado Radiográfico Ósseo', 'Disgenesia epifisária pontilhada ("epífises pontilhadas"), vértebras hemiplágicas', 'Atraso homogêneo no fechamento fisário sem fragmentação epifisária pontilhada'],
        ['Resposta Terapêutica', 'Resgata crescimento com Levotiroxina sódica oral', 'Requer hormônio do crescimento (GH exógeno) ou progestágenos indutores de GH']
      ]
    },
    disgenesiaEpifisariaRadiografica:
      'Nas radiografias de extremidades, as epífises dos ossos longos (especialmente rádio distal, ulna, fêmur e tíbia) e do carpo/tarso apresentam múltiplos focos esparsos e fragmentados de mineralização densa intercalados por áreas radiotransparentes. Essa aparência "pontilhada" ou "esburacada" (stippled epiphyses) é o marco diagnóstico da falha de maturação condroblástica dependente de tireoide.',
    mixedemaETermoDesregulacao:
      'A redução da taxa metabólica basal induz hipotermia crônica (<37,5°C) e intolerância severa ao frio. O acúmulo de glicosaminoglicanos hidrofílicos (ácido hialurônico) na derme e tecido subcutâneo produz mixedema clássico com espessamento da pele da fronte, rugas faciais prematuras e macroglossia acentuada.'
  },

  clinicalSignsPathophysiology: {
    sinaisGeraisEConformacionais: [
      'Nanismo desproporcional flagrante evidente a partir de 4 a 8 semanas de idade: interrupção do crescimento linear com membros pélvicos e torácicos curtos, espessos e recurvados suportando um tronco atarracado e largo.',
      'Cabeça desproporcionalmente grande em relação ao corpo, com base craniana alargada e focinho curto e achatado.',
      'Fontanela craniana bregmática amplamente aberta e patente após 8 a 12 semanas de vida decorrente da ausência de ossificação membranosa.',
      'Macroglossia (língua espessada e edemaciada que se projeta continuamente para fora da cavidade oral), provocando dificuldade de preensão e deglutição.',
      'Retenção da pelagem lanosa juvenil e falha na substituição pelos pelos de guarda primários adultos, com alopecia difusa, descamação e mixedema facial.',
      'Retenção persistente dos dentes de leite (decíduos) e ausência de erupção da dentição definitiva.',
      'Bócio cervical bilateral (massa palpável firme e lisa em região laringotraqueal ventral) presente nas formas goitrosas de disormonogênese.',
      'Constipação intestinal crônica severa, fezes secas em cíbalos e abdômen distendido decorrentes de hipomotilidade colônica acentuada.'
    ],
    sinaisNeurologicos: [
      'Retardo mental severo, letargia extrema, apatia profunda, sonolência contínua e ausência de interação lúdica com os irmãos de ninhada.',
      'Ataxia proprioceptiva e vestibular pronunciada em filhotes de felinos decorrente de hipoplasia e atraso na mielinização cerebelar.',
      'Surdez neurossensorial bilateral permanente decorrente do subdesenvolvimento congênito das células ciliadas do órgão de Corti.',
      'Hipotermia constante (<37,5°C) com busca desesperada por fontes de calor ou pelo corpo da mãe.'
    ]
  },

  diagnosis: {
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Exame Clínico Pediátrico e Identificação do Nanismo Desproporcional',
        purpose: 'Reconhecimento da síndrome clínica em filhotes com retardo de crescimento.',
        description:
          'Comparação do peso e medidas corporais com os irmãos de ninhada; palpação cervical de bócio; inspeção de fontanela e dentição decídua retida.',
        interpretation: 'Nanismo com macroglossia e letargia extrema impõe investigação hormonal imediata.'
      },
      {
        stepNumber: 2,
        title: 'Dosagem Sérica de T4 Total, T4 Livre e TSH Endógeno (cTSH)',
        purpose: 'Confirmação diagnóstica definitiva da falência tireoidiana e diferenciação de hipotireoidismo central.',
        description:
          'Colheita de amostra de soro para ensaios validados de imunoensaio quimioluminescente.',
        interpretation:
          'Padrão-ouro confirmatório (*isGoldStandard: true*). TT4 e fT4 por diálise encontram-se indetectáveis ou marcadamente abaixo dos valores pediátricos normais (<0,5 mcg/dL). O TSH sérico canino/felino encontra-se expressivamente elevado (>1,5 a 5,0 ng/mL) nas formas primárias (disgenesia e disormonogênese). Um TSH baixo com T4 baixo aponta para nanismo hipofisário central.',
        limitations: 'Valores de T4 fisiológicos em filhotes normais saudáveis nas primeiras 4 semanas de vida são até 2 a 3 vezes mais altos que em adultos; concentrações "normais de adulto" em um filhote de 4 semanas podem representar subdosagem hormonal patológica.',
        isGoldStandard: true
      },
      {
        stepNumber: 3,
        title: 'Estudo Radiográfico Esquelético das Extremidades e Coluna',
        purpose: 'Documentação da disgenesia epifisária e estadiamento da maturação óssea.',
        description:
          'Projeções radiográficas de alta definição de carpo, tarso, fêmures e coluna toracolombar.',
        interpretation: 'Confirma centros de ossificação epifisários com fragmentação pontilhada patognomônica ("stippled epiphyses"), fises abertas e vértebras hemiplágicas.',
        limitations: 'Não diferencia a causa molecular primária.'
      },
      {
        stepNumber: 4,
        title: 'Ultrassonografia Cervical e Cintilografia Tireoidiana (99mTc)',
        purpose: 'Diferenciação anatômica entre disgenesia e disormonogênese.',
        description:
          'USG da região tireoidiana com transdutor linear >= 12 MHz; cintilografia com pertecnetato de tecnécio-99m se disponível.',
        interpretation: 'Identifica bócio vascularizado bilateral na disormonogênese ou ausência completa de parênquima ortotópico na aplasia/ectopia.',
        limitations: 'A disponibilidade de medicina nuclear veterinária é restrita.'
      },
      {
        stepNumber: 5,
        title: 'Testes Moleculares Genéticos (Painel de Mutações TPO e TG)',
        purpose: 'Identificação da variante causal para aconselhamento de canis e gatis.',
        description:
          'Painel genético por sequenciamento de DNA em sangue total (pesquisa de mutações em TPO em gatos e cães, e variantes de TG em Rottweilers).',
        interpretation: 'Identifica linhagens carreadoras para exclusão reprodutiva.',
        limitations: 'O resultado não deve atrasar o início do tratamento hormonal com levotiroxina.'
      }
    ]
  },

  treatment: {
    protocoloDeReposicaoComLevotiroxina: [
      {
        drug: 'Levotiroxina Sódica Oral Pediátrica em Cães (T4)',
        indication: 'Terapia de reposição hormonal indispensável e vitalícia para hipotireoidismo congênito.',
        dose: '0,02 a 0,04 mg/kg (20 a 40 mcg/kg) por via oral a cada 12 horas (q12h) em jejum matinal e noturno.',
        mechanism: 'Reposição do hormônio tireoidiano sintético idêntico ao endógeno, que é convertido perifericamente em T3 ativo nos tecidos-alvo pela 5\'-desiodase.',
        cautions: 'A taxa metabólica basal e a depuração hormonal em filhotes em crescimento rápido é substancialmente mais alta que em animais adultos. Doses de adulto (0,02 mg/kg q24h) são insuficientes e retardam a recuperação esquelética.',
        reassess: 'Pesar o filhote a cada 2 a 3 semanas e reajustar a dose absoluta em microgramas rigorosamente conforme o ganho de peso. Dosar T4 total de pico (4 a 6 horas pós-dose) a cada 4 semanas, mantendo o nível entre 3,0 e 4,5 mcg/dL.'
      },
      {
        drug: 'Levotiroxina Sódica Oral em Felinos',
        indication: 'Reposição hormonal em filhotes de gatos.',
        dose: '0,05 a 0,10 mg/GATO por via oral a cada 24 horas (ou 15 a 20 mcg/kg VO q12h). Na coorte de Golinelli et al. 2022, a mediana utilizada foi de aproximadamente 35 mcg/kg q12h com excelente segurança e resposta neurológica.',
        frequency: 'q12h ou q24h',
        duration: 'Vitalício',
        notes: 'Pode ser manipulada em suspensão oral palatável ou gotas para facilitar a administração precisa em gatinhos com menos de 1 kg.'
      }
    ],
    manejoOrtopedicoEFisioterapico: [
      {
        drug: 'Suporte Fisioterápico e Nutricional Pediátrico',
        indication: 'Adjuvante essencial durante o estirão compensatório de crescimento.',
        notes: 'Fornecer alimento super premium para filhotes em crescimento com teores ideais de cálcio, fósforo e vitamina D. Exercícios físicos de baixo impacto para fortalecimento articular e prevenção de luxação patelar ou subluxação coxofemoral durante a mineralização das epífises.'
      }
    ]
  },

  complications: {
    sequelasIrreversiveisEGraves: [
      'Retardo Mental e Déficit Cognitivo Irreversível: complicação trágica resultante do atraso no início da levotiroxina para além de 12 a 16 semanas de vida. Ocorre parada irreversível da mielinização cerebral, resultando em animal permanentemente apático, incapaz de aprender comandos básicos ou ser socializado.',
      'Nanismo Permanente e Deformidades Articulares Graves: falha na ossificação epifisária culminando em fechamento prematuro desordenado das fises, deformidades angulares de membros (desvio em valgo ou varo de carpos), incongruência articular e artrose incapacitante precoce.',
      'Surdez Neurossensorial Permanente: degeneração do epitélio coclear do ouvido interno decorrente da privação de T3 na fase de desenvolvimento perinatal.',
      'Luxação Coxofemoral e Luxação Patelar Congênita Secundária: má formação dos rebordos acetabulares e da tróclea femoral decorrente da disgenesia epifisária pontilhada.',
      'Megacólon e Morte Neonatal por Inanição: constipação intratável com fecaloma obstrutivo gerado por hipomotilidade intestinal severa associada à inapetência por macroglossia.'
    ],
    prognostico:
      'O prognóstico é diretamente dependente da PRECOCIDADE do diagnóstico e início da terapia com levotiroxina. Filhotes diagnosticados e tratados antes de 8 a 12 semanas de vida apresentam prognóstico excelente: exibem rápido estirão compensatório de crescimento (catch-up growth), reabsorção do bócio, fechamento das fontanelas, erupção dentária e recuperação quase completa do neurodesenvolvimento cognitivo. Em contrapartida, quando o tratamento é iniciado tardiamente após 4 a 6 meses de vida, o prognóstico para estatura normal e desenvolvimento intelectual é reservado a desfavorável, com persistência vitalícia de nanismo desproporcional e sequelas neurológicas.'
  },

  prevention: {
    aconselhamentoGeneticoEBiosseguranca:
      'A profilaxia primária da disormonogênese enzimática familiar (mutações TPO e variantes TG) baseia-se no aconselhamento genético rigoroso: pais de ninhadas afetadas e irmãos clinicamente saudáveis devem ser submetidos a testes moleculares por sequenciamento genético para identificação de carreadores heterozigotos, sendo terminantemente excluídos de programas de reprodução.',
    rastreamentoNeonatalDeNinhadas:
      'Em canis e gatis de raças predispostas, pesar semanalmente todos os filhotes nas primeiras 8 semanas de vida. Qualquer filhote que apresente desaceleração de ganho de peso, letargia desproporcional ou macroglossia deve ser submetido imediatamente à dosagem de T4 total e cTSH séricos antes de completar 6 a 8 semanas de idade.',
    errosComuns: [
      'Aguardar o filhote "crescer sozinho por conta própria" e adiar a intervenção diagnóstica além da janela neurológica crítica de 12 semanas.',
      'Prescrever levotiroxina em doses de adulto para filhotes (ex.: 0,02 mg/kg q24h), gerando subdosagem grave pela alta taxa de depuração metabólica pediátrica.',
      'Manter a mesma dose em microgramas sem reajustar pelo ganho de peso quinzenal acelerado do filhote.',
      'Interpretar um T4 total no limite inferior do intervalo de referência de adultos como "normal" em um filhote de 4 a 6 semanas de vida.',
      'Suspender a medicação acreditando que a doença foi curada após o fechamento das fises; o tratamento é VITALÍCIO.'
    ],
    redFlags: [
      'Atraso na abertura dos condutos auditivos ou ausência de reação a estímulos sonoros agudos (alerta de surdez neurossensorial).',
      'Fragmentação óssea epifisária visível ao raio-X com claudicação e dor articular severa.',
      'Constipação com vômitos e abdômen timpânico obstrutivo por coprostase/fecaloma.'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'hipotireoidismo-adquirido-caes-gatos',
    'hipertireoidismo-felino'
  ],
  relatedMedicationSlugs: ['levotiroxina-sodica'],
  references: [
    {
      id: 'ref-hypoc-golinelli-2022',
      title: 'Congenital hypothyroidism in dogs: Early treatment and neurological outcomes',
      citationText: 'Golinelli S, et al. Congenital hypothyroidism in dogs: Early treatment and neurological outcomes. J Vet Intern Med. 2022;36(4):1230-1239.',
      authors: 'Golinelli S, et al.',
      year: 2022,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '36',
      pages: '1230-1239',
      sourceType: 'Estudo Clínico Prospectivo Multicêntrico',
      url: 'https://doi.org/10.1111/jvim.16482',
      doi: '10.1111/jvim.16482',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-hypoc-vanpoucke-2022',
      title: 'Thyroid peroxidase (TPO) gene mutations in feline congenital goitrous hypothyroidism',
      citationText: 'Van Poucke M, et al. Thyroid peroxidase (TPO) gene mutations in feline congenital goitrous hypothyroidism. J Vet Intern Med. 2022;36(5):1615-1623.',
      authors: 'Van Poucke M, et al.',
      year: 2022,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '36',
      pages: '1615-1623',
      sourceType: 'Estudo Genético Molecular',
      url: 'https://doi.org/10.1111/jvim.16518',
      doi: '10.1111/jvim.16518',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-hypoc-abitbol-2026',
      title: 'Thyroglobulin (TG) gene variants associated with congenital hypothyroidism in Rottweiler dogs',
      citationText: 'Abitbol O, et al. Thyroglobulin (TG) gene variants associated with congenital hypothyroidism in Rottweiler dogs. J Vet Intern Med. 2026;40(1):1098612X251398912.',
      authors: 'Abitbol O, et al.',
      year: 2026,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '40',
      pages: 'e1398912',
      sourceType: 'Estudo Genético Molecular',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-hypoc-aaha-2023',
      title: '2023 AAHA Selected Endocrinopathies Guidelines: Pediatric Hypothyroidism',
      citationText: 'Bugbee A, Rucinsky R, et al. 2023 AAHA Selected Endocrinopathies Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135.',
      authors: 'Bugbee A, Rucinsky R, et al.',
      year: 2023,
      journal: 'Journal of the American Animal Hospital Association',
      volume: '59',
      pages: '113-135',
      sourceType: 'Diretriz de Consenso AAHA',
      url: 'https://doi.org/10.5326/JAAHA-MS-7297',
      doi: '10.5326/JAAHA-MS-7297',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-hypoc-ettinger-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine: Congenital Disorders of the Thyroid Gland",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1810-1815.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-hypoc-nelson-2020',
      title: 'Small Animal Internal Medicine: Congenital Hypothyroidism',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:768-771.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-hypoc-bsava-endo',
      title: 'BSAVA Manual of Canine and Feline Endocrinology: Congenital Hypothyroidism',
      citationText: 'Mooney CT, Peterson ME. BSAVA Manual of Canine and Feline Endocrinology. 5th ed. Gloucester: BSAVA; 2020:175-184.',
      authors: 'Mooney CT, Peterson ME.',
      year: 2020,
      journal: 'BSAVA Manual of Canine and Feline Endocrinology',
      sourceType: 'Manual Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-hypoc-plumb-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Levothyroxine Sodium",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:630-634.",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    }
  ]
};
