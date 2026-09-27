import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Síndromes Miastênicas Congênitas (CMS) em Cães e Gatos — Guia Clínico Editorial de Padrão Ouro.
 * Embasamento: Mignan et al. 2020 (Classification & Review) > Dewey & da Costa (Practical Guide to Canine and Feline Neurology 3ª ed.) >
 * Ettinger's Textbook of Vet Internal Med 9ª ed. 2024 > de Lahunta's Veterinary Neuroanatomy 5ª ed. >
 * Shelton 2010 (Neuromuscular Testing) > Plumb's 10ª ed.
 */
export const sindromesMiastenicasCongenitasRecord: DiseaseRecord = {
  id: 'disease-sindromes-miastenicas-congenitas',
  slug: 'sindromes-miastenicas-congenitas-caes-gatos',
  title: 'Síndromes miastênicas congênitas (cão e gato)',
  subtitle: 'Junctionopatias neuromusculares hereditárias não autoimunes: defeitos pré-sinápticos (CHAT), sinápticos (COLQ) e pós-sinápticos (CHRNE), anticorpos anti-AChR negativos, manejo com piridostigmina e 3,4-DAP',
  synonyms: [
    'CMS',
    'Congenital myasthenic syndromes',
    'Junctionopatias genéticas hereditárias',
    'Miastenia congênita não autoimune',
    'Deficiência congênita de receptores de acetilcolina'
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  categories: ['neurologia', 'pediatria', 'genetica', 'clinica-medica'],
  tags: [
    'JNM',
    'Juncao neuromuscular',
    'CMS',
    'CHAT',
    'COLQ',
    'CHRNE',
    'AChR negativo',
    'Piridostigmina',
    '3-4-diaminopiridina',
    'Jack Russell',
    'Devon Rex'
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindromes-miastenicas-congenitas-caes-gatos'],

  quickSummary:
    'As síndromes miastênicas congênitas (CMS) constituem um grupo heterogêneo de junctionopatias neuromusculares hereditárias monogênicas, decorrentes de mutações estruturais em proteínas essenciais da junção neuromuscular (JNM). Não possuem base autoimune e distinguem-se categoricamente da Miastenia Gravis adquirida clássica: os anticorpos circulantes anti-receptor de acetilcolina (AChR-Ab) são obrigatoriamente negativos e terapias imunossupressoras são totalmente ineficazes e contraindicadas. As mutações afetam sítios pré-sinápticos (síntese/liberação de acetilcolina — ex.: gene CHAT), sinápticos na fenda motora (ancoragem da acetilcolinesterase — ex.: gene COLQ) ou pós-sinápticos no sarcolema muscular (subunidades do receptor nicotínico de acetilcolina — ex.: gene CHRNE). Manifestam-se em filhotes jovens (entre 6 e 12 semanas de vida) através de fraqueza muscular esquelética flácida progressiva exacerbada pelo exercício (fadiga precoce, marcha em saltos de coelho/"bunny-hopping", tremores e colapso em decúbito esternal), ventroflexão cervical em gatos e, em linhagens específicas, megaesôfago com regurgitação. O diagnóstico definitivo é molecular por painel genético ou eletrofisiológico por estimulação nervosa repetitiva. O tratamento medicamentoso exige estrita estratificação pelo subtipo molecular: defeitos pós-sinápticos respondem à piridostigmina, ao passo que defeitos sinápticos por deficiência de acetilcolinesterase (COLQ) pioram com anticolinesterásicos e requerem moduladores adrenérgicos ou bloqueadores de canais de potássio (3,4-diaminopiridina).',

  quickDecisionStrip: [
    'Filhote entre 6 e 12 semanas com fraqueza muscular fatigável pós-exercício + recuperação com repouso = suspeita clínica maior de CMS.',
    'CMS NÃO é Miastenia Gravis de filhote: os autoanticorpos anti-AChR são NEGATIVOS porque a doença decorre de defeito genético estrutural de montagem da placa motora.',
    'Corticosteroides e imunossupressores (prednisona, azatioprina, ciclosporina) são FORMALMENTE CONTRAINDICADOS: não tratam a causa genética e causam miopatia e imunossupressão grave.',
    'Diferenciação molecular crucial: mutações no gene CHRNE (pós-sinápticas em Jack Russells e Fox Terriers) respondem à Piridostigmina; mutações no gene COLQ (sinápticas em Labradores, Sphynx e Devon Rex) PIORAM com piridostigmina (risco de crise colinérgica por acúmulo de ACh).',
    'O brometo de piridostigmina (0,5 a 1,5 mg/kg VO q8-12h) deve ser iniciado com teste terapêutico hospitalar monitorado e atropina imediatamente disponível.',
    '3,4-Diaminopiridina (3,4-DAP / Amifampridina, 0,2 a 0,5 mg/kg VO q8-12h) é o fármaco de escolha para defeitos pré-sinápticos de liberação quântica de acetilcolina.',
    'Algumas linhagens de Teckel Miniatura (Dachshund) apresentam melhora e remissão clínica espontânea parcial da fraqueza muscular por volta dos 6 meses de vida por maturação compensatória de receptores.',
    'Megaesôfago e pneumonia por aspiração são o principal risco de óbito precoce em linhagens com acometimento esofágico; alimentar em cadeira de Bailey verticalizada.',
    'Medicamentos bloqueadores neuromusculares são ESTRITAMENTE PROIBIDOS: aminoglicosídeos (gentamicina, amicacina), fluoroquinolonas, ampicilina, clindamicina, anestésicos locais e acepromazina deflagram paralisia respiratória aguda.',
    'Aconselhamento genético: identificar reprodutores e irmãos portadores heterozigotos por teste de DNA e eliminá-los permanentemente de programas de criação.'
  ],

  quickSummaryRich: {
    lead:
      'As síndromes miastênicas congênitas (CMS) representam falhas genéticas de hardware da transmissão neuromuscular. Sem autoanticorpos e sem indicação de corticoide, o manejo apoia-se no reconhecimento precoce da fatigabilidade e na seleção do fármaco correto guiado pelo defeito molecular exato.',
    leadHighlights: [
      'Junctionopatias hereditárias monogênicas não autoimunes',
      'Anticorpos anti-AChR circulantes estritamente negativos',
      'Três subtipos: Pré-sináptico (CHAT), Sináptico (COLQ) e Pós-sináptico (CHRNE)',
      'Início precoce próximo ao desmame (6 a 12 semanas)',
      'Piridostigmina eficaz em CHRNE, mas deletéria em COLQ',
      'Proibição estrita de antibióticos bloqueadores neuromusculares'
    ],
    pillars: [
      {
        title: 'Pilar 1: Três Compartimentos da Junção Neuromuscular',
        body: 'A transmissão depende de 3 etapas integradas: síntese e liberação pré-sináptica de acetilcolina pela colina acetiltransferase (CHAT); terminação e ancoragem sináptica da acetilcolinesterase pela cauda de colágeno Q (COLQ); e ativação pós-sináptica de canais iônicos nas subunidades do receptor nicotínico (CHRNE). Cada compartimento acometido dita um fenótipo e uma resposta terapêutica diametralmente oposta.',
        highlights: ['Pré-sináptico: liberação de ACh', 'Sináptico: acetilcolinesterase COLQ', 'Pós-sináptico: receptores CHRNE']
      },
      {
        title: 'Pilar 2: Diagnóstico Diferencial com Miastenia Gravis Adquirida',
        body: 'Na MG adquirida clássica (comum em cães adultos de 2-4 anos ou >8 anos), autoanticorpos destroem os receptores. Na CMS, a placa motora nasce estruturalmente anômala em filhotes jovens. Os títulos de anticorpos anti-AChR são normais/negativos (<0,6 nmol/L). O teste eletrodiagnóstico revela decrescimento de potenciais de ação compostos (CMAP) sob estimulação repetitiva.',
        highlights: ['Sorologia anti-AChR negativa', 'Início neonatal entre 6-12 semanas', 'Eletrodiagnóstico com decrescimento']
      },
      {
        title: 'Pilar 3: Terapêutica Racional por Subtipo Molecular',
        body: 'O uso cego de anticolinesterásicos é perigoso. Se o defeito for pós-sináptico (CHRNE), a piridostigmina prolonga a meia-vida da ACh e melhora a marcha. Se o defeito for de acetilcolinesterase (COLQ), a piridostigmina causa sobrecarga colinérgica, bloqueio despolarizante e morte por insuficiência respiratória; nesses casos, utilizam-se albuterol e 3,4-DAP.',
        highlights: ['Piridostigmina para CHRNE', 'Perigo colinérgico em mutações COLQ', '3,4-DAP para falhas de liberação']
      }
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial das Síndromes Miastênicas Congênitas',
      steps: [
        {
          label: 'Passo 1: Reconhecimento da Fatigabilidade Neuromuscular Precoce',
          detail: 'Filhote com idade entre 6 e 12 semanas (coincidindo com o aumento da atividade locomotora) apresentando fraqueza flácida que piora rapidamente após poucos minutos de caminhada ou brincadeira; passos encurtados, marcha rígida, corrida com membros pélvicos juntos (bunny-hopping), tremores musculares, colapso em decúbito esternal com recuperação após 5 a 10 minutos de repouso silencioso.'
        },
        {
          label: 'Passo 2: Exame Neurológico Completo e Exclusão de Mielopatias',
          detail: 'Reflexos espinhais inicialmente normais ou hiporreflexos após esforço repetido; tônus muscular preservado em repouso; ausência de déficits proprioceptivos primários e sensibilidade dolorosa normal. Em gatos e cães jovens: presença de ventroflexão cervical marcante por fadiga dos músculos extensores cervicais.'
        },
        {
          label: 'Passo 3: Titulação de Anticorpos Séricos Anti-Receptor de Acetilcolina (AChR-Ab)',
          detail: 'Ensaio de radioimunoprecipitação padrão-ouro em laboratório de referência especializado em neuromuscular. Resultado OBRIGATORIAMENTE normal ou negativo (<0,6 nmol/L em cães e <0,3 nmol/L em gatos), descartando Miastenia Gravis adquirida autoimune.'
        },
        {
          label: 'Passo 4: Eletrodiagnóstico por Estimulação Nervosa Repetitiva (RNS)',
          detail: 'Estimulação repetitiva de nervos periféricos motores (ex.: nervo ulnar, fibular ou ciático) a frequências baixas de 2 a 3 Hz e 5 Hz. Demonstração de padrão de decrescimento progressivo característico (>10% a 15% de queda na amplitude do potencial de ação muscular composto - CMAP entre o 1º e o 4º estímulo), confirmando disfunção funcional da JNM.'
        },
        {
          label: 'Passo 5: Teste Genético Molecular por Sequenciamento de DNA',
          detail: 'Padrão-ouro confirmatório (*isGoldStandard: true*). Painéis moleculares comerciais para mutações em CHRNE (Jack Russell Terrier, Smooth Fox Terrier, Parson Russell), COLQ (Labrador Retriever, Sphynx, Devon Rex) e CHAT. Confirmação do genótipo autossômico recessivo homozigoto.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico Estratificado por Subtipo',
      steps: [
        {
          label: 'Fase 1: Manejo de Emergência e Exclusão de Fármacos Proibidos',
          detail: 'Suspender imediatamente e vetar o uso de aminoglicosídeos, fluoroquinolonas, clindamicina, anestésicos locais e sedativos fenotiazínicos. Fornecer repouso absoluto em ambiente acolchoado e evitar exercícios estressantes.'
        },
        {
          label: 'Fase 2: Teste Terapêutico com Brometo de Piridostigmina',
          detail: 'Se suspeita de defeito pós-sináptico (CHRNE em Terriers): administrar dose teste de Brometo de Piridostigmina oral na dose de 0,25 a 0,5 mg/kg VO sob vigilância em ambiente hospitalar, mantendo Sulfato de Atropina (0,04 mg/kg SC) imediatamente disponível em seringa. Se houver melhora evidente da tolerância ao exercício sem hipersalivação, titular para 0,5 a 1,5 mg/kg VO a cada 8 a 12 horas.'
        },
        {
          label: 'Fase 3: Terapia com 3,4-Diaminopiridina (3,4-DAP) ou Agonistas Beta-2',
          detail: 'Se o defeito for sináptico com deficiência de acetilcolinesterase (COLQ) ou pré-sináptico com falha quântica: contraindicar a piridostigmina. Instituir 3,4-Diaminopiridina (0,2 a 0,5 mg/kg VO q8-12h) e/ou Sulfato de Salbutamol / Albuterol (0,05 mg/kg VO q8-12h) para estabilizar a transmissão e melhorar o ancoramento sináptico.'
        },
        {
          label: 'Fase 4: Manejo Nutricional e Prevenção de Aspiração (se Megaesôfago)',
          detail: 'Se radiografia torácica evidenciar megaesôfago: alimentação em plano estritamente verticalizado (cadeira de Bailey ou posição bípede apoiada nos membros pélvicos), mantendo o animal na posição vertical por 20 a 30 minutos pós-refeição com alimento em consistência pastosa homogênea ou almôndegas umedecidas.'
        },
        {
          label: 'Fase 5: Reavaliação Longitudinal do Crescimento e Maturação',
          detail: 'Reavaliar a cada 3 a 4 semanas. Em linhagens de Teckel Miniatura (Dachshund) portadoras de CMS, monitorar a força esquelética por volta dos 4 a 6 meses de idade: muitos cães dessa raça sofrem remissão clínica e toleram desmame progressivo da piridostigmina.'
        }
      ]
    }
  },

  etiology: {
    baseMolecular:
      'As síndromes miastênicas congênitas (CMS) são distúrbios genéticos monogênicos que afetam proteínas estruturais intrínsecas da junção neuromuscular esquelética. Não há infiltração linfocitária, lesão imune nem produção de autoanticorpos; a placa motora é estruturalmente imperfeita desde a embriogênese.',
    classificacaoCompartimental: {
      kind: 'clinicalTable',
      headers: ['Subtipo de CMS', 'Gene Mutado', 'Proteína Afetada', 'Raças Documentadas', 'Resposta Farmacológica'],
      rows: [
        [
          'Pós-Sináptica (Deficiência de AChR)',
          'CHRNE',
          'Subunidade Épsilon do receptor nicotínico de acetilcolina muscular',
          'Jack Russell Terrier, Parson Russell Terrier, Smooth Fox Terrier',
          'Excelente resposta ao Brometo de Piridostigmina oral'
        ],
        [
          'Sináptica (Deficiência de Acetilcolinesterase)',
          'COLQ',
          'Cauda de colágeno Q que ancora a enzima acetilcolinesterase na lâmina basal sináptica',
          'Labrador Retriever, Golden Retriever, gatos Sphynx e Devon Rex',
          'Piora grave com Piridostigmina; responde a Albuterol / 3,4-DAP'
        ],
        [
          'Pré-Sináptica (Defeito de Síntese de ACh)',
          'CHAT',
          'Colina acetiltransferase (enzima que catalisa a síntese de ACh a partir de colina e acetil-CoA)',
          'Cães com episódios de apneia e fadiga neuromuscular precoce',
          'Responde à 3,4-Diaminopiridina (estimulador de liberação vesicular)'
        ],
        [
          'Outras Junctionopatias Pós-Sinápticas',
          'DOK7, MUSK, AGRN',
          'Proteínas quinases sinalizadoras e agrina responsáveis pela ancoragem e agrupamento de AChR',
          'Cães de raças mistas e gatos',
          'Resposta variável a agonistas adrenérgicos (albuterol/efedrina)'
        ]
      ]
    },
    padraoDeHeranca:
      'A vasta maioria das formas caninas e felinas possui herança autossômica recessiva estrita. Pais clinicamente saudáveis heterozigotos transmitem a mutação com probabilidade de 25% de filhotes afetados homozigotos em cada gestação.'
  },

  epidemiology: {
    distribuicaoPorEspecie:
      'Descrita em cães e gatos em diversos países da Europa, América do Norte e América Latina. Em cães, as linhagens mais afetadas e estudadas incluem Jack Russell Terrier, Smooth Fox Terrier, Teckel Miniatura de pelo curto (Miniature Dachshund), Old Danish Pointing Dog e Labrador Retriever. Em felinos, afeta principalmente as raças Sphynx e Devon Rex, onde a mutação no gene COLQ produz a clássica síndrome da "miopatia hereditária espástica/miastênica do Devon Rex".',
    idadeDeApresentacao:
      'Os sinais clínicos tornam-se perceptíveis assim que os filhotes iniciam a marcha voluntária e tentam correr, com pico diagnóstico entre 6 e 12 semanas de vida. O animal é frequentemente considerado pelos tutores como o filhote "preguiçoso", "fraco" ou o "menor da ninhada".'
  },

  pathogenesisTransmission: {
    perdaDaMargemDeSeguranca:
      'Em uma junção neuromuscular fisiológica, cada potencial de ação que despolariza o axônio motor pré-sináptico induz a liberação de quantidades copiosas de acetilcolina (quanta de ACh). A ligação aos receptores AChR pós-sinápticos deflagra um potencial de placa terminal (EPP) cuja amplitude é 2 a 3 vezes superior ao limiar necessário para disparar o potencial de ação muscular, fenômeno fisiológico conhecido como "margem de segurança da transmissão neuromuscular". Nas CMS, seja pela baixa síntese de ACh (CHAT), ausência de receptores suficientes (CHRNE) ou degradação deficiente com despolarização contínua (COLQ), a margem de segurança é severamente deprimida. Nos primeiros estímulos, o músculo ainda contrai; sob esforço sustentado ou estímulos repetidos a frequências fisiológicas (10 a 20 Hz), o EPP cai abaixo do limiar de despolarização, ocorrendo falha da transmissão e colapso muscular imediato (fatigabilidade patológica).',
    diferencaEntreSubtiposEcolinose:
      'Na mutação de COLQ (deficiência de acetilcolinesterase sináptica), a acetilcolina liberada não é hidrolisada em colina e ácido acético, permanecendo na fenda sináptica e estimulando continuamente os receptores. Isso gera abertura prolongada de canais de cálcio, sobrecarga de cálcio intracelular e miopatia de placa terminal (endplate myopathy) com necrose focal das junções e bloqueio despolarizante crônico.',
    ausenciaDeDanoAutoimune:
      'Não há fixação de complemento nem destruição autoanticorpo-dependente mediada por células B ou plasmoblastos; o tecido linfoide do timo é histologicamente normal (ausência total de timomas ou hiperplasia tímica).'
  },

  pathophysiology: {
    fatigabilidadeFlacidaEMarcha:
      'A musculatura apendicular proximal (cinturas escapular e pélvica) sofre maior demanda energética durante a locomoção. O filhote inicia o trote de forma aceitável por 15 a 60 segundos; rapidamente, os passos tornam-se curtos, surge tremor muscular nos quatro membros e o animal adota marcha de salto de coelho (bunny hopping) para diminuir a carga excêntrica sobre os gastrocnêmios e quadríceps, culminando em colapso completo em decúbito esternal com incapacidade temporária de sustentar o peso da cabeça e tronco.',
    ventroflexaoCervical:
      'Os músculos extensores cervicais dorsais operam sob estresse mecânico contínuo para manter a cabeça erguida. Quando a margem de segurança esgota, a cabeça do animal pende passivamente em direção ao solo (ventroflexão do pescoço), sinal clássico em gatos afetados (especialmente Sphynx e Devon Rex).',
    acometimentoDoMusculoEsofagico:
      'O esôfago canino é constituído integralmente por musculatura estriada esquelética ao longo de toda a sua extensão, sendo vulnerável a falhas de transmissão da JNM. Em linhagens onde a mutação afeta os receptores esofágicos, ocorre hipotonia e dilatação passiva do corpo esofágico (megaesôfago congênito), estase de alimento e saliva, e regurgitação retrógrada passiva frequente.'
  },

  clinicalSignsPathophysiology: {
    sinaisLocomotoresENeurologicos: [
      'Fraqueza muscular flácida precoce (início entre 6 e 12 semanas) que se manifesta rapidamente após 1 a 2 minutos de esforço físico ou caminhada contínua.',
      'Marcha com passos curtos e rígidos, evoluindo para passadas sincrônicas com os membros pélvicos juntos (bunny hopping) e tremores de alta frequência nas extremidades.',
      'Colapso frequente em decúbito esternal com incapacidade de levantar-se; melhora notável após 5 a 15 minutos de repouso absoluto no piso.',
      'Ventroflexão cervical pronunciada (incapacidade de manter a cabeça erguida, com o queixo encostado no peito), especialmente conspícua em felinos.',
      'Déficit de abertura palpebral ou ptose palpebral e fraqueza dos músculos faciais da mastigação após mamar ou comer.',
      'Diminuição ou ausência progressiva do reflexo palpebral após testes repetidos de estímulo palpebral sucessivo (exaustão do reflexo palpebral).',
      'Reflexos espinhais patelares e flexores normais em repouso, mas que se tornam rapidamente deprimidos ou ausentes após indução de fadiga motora.'
    ],
    sinaisEsofagicosERespiratorios: [
      'Regurgitação passiva de alimento não digerido ou saliva espumosa minutos a horas após a refeição (em linhagens que desenvolvem megaesôfago associado).',
      'Tosse produtiva úmida, estertores crepitantes, febre alta e taquipneia ortopneica decorrentes de pneumonia por aspiração secundária.',
      'Episódios transitórios de apneia aguda ou colapso respiratório em filhotes com mutações no gene CHAT (pré-sinápticas) deflagrados por estresse ou choro prolongado.'
    ]
  },

  diagnosis: {
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Exame Clínico Pediátrico e Teste de Exercício Provocativo',
        purpose: 'Documentação objetiva da fatigabilidade muscular flácida induzida por esforço.',
        description:
          'Estimular o filhote a caminhar ou trotar por 2 a 3 minutos em ambiente calmo. Observar o surgimento de passos curtos, bunny-hopping, tremores e colapso esternal, seguido de recuperação espontânea pós-repouso.',
        interpretation: 'Confirma fraqueza de placa motora clássica; idade precoce (<3 meses) afasta causas autoimunes tardias.',
        limitations: 'Não diferencia o subtipo molecular da JNM.'
      },
      {
        stepNumber: 2,
        title: 'Dosagem de Anticorpos Anti-Receptor de Acetilcolina (AChR-Ab)',
        purpose: 'Exclusão categórica da Miastenia Gravis autoimune adquirida.',
        description:
          'Ensaio de radioimunoprecipitação com toxina alfa-bungarotoxina marcada em soro canino/felino.',
        interpretation:
          'Resultado OBRIGATORIAMENTE NEGATIVO (<0,6 nmol/L em cães e <0,3 nmol/L em gatos). Confirma que a doença decorre de falha congênita e não de autoimunidade adquirida mediada por células B.',
        limitations: 'Alguns laboratórios gerais não possuem o ensaio validado para títulos veterinários.'
      },
      {
        stepNumber: 3,
        title: 'Eletrodiagnóstico por Estimulação Nervosa Repetitiva (RNS)',
        purpose: 'Confirmação funcional do defeito de transmissão na junção neuromuscular.',
        description:
          'Sob anestesia geral suave e controle de temperatura (normotermia rigorosa), estimula-se nervo motor periférico (ex.: ulnar ou fibular) a 2 Hz, 3 Hz e 5 Hz com registro da resposta eletromiográfica nos músculos interósseos.',
        interpretation: 'Presença de decrescimento significativo (>10% a 15% na amplitude do CMAP do primeiro para o quarto estímulo) comprova perda da margem de segurança da placa motora.',
        limitations: 'Exige equipamento especializado de eletromiografia e operador experiente em neurologia veterinária.'
      },
      {
        stepNumber: 4,
        title: 'Testes Moleculares Genéticos Específicos por Raça (Padrão-Ouro)',
        purpose: 'Identificação da mutação causal, confirmação definitiva do subtipo e orientação terapêutica.',
        description:
          'Sequenciamento de DNA em sangue total ou swab bucal para mutações conhecidas: 1) Gene CHRNE (mutação c.470delC em Jack Russell Terrier e Parson Russell Terrier); 2) Gene COLQ (deleções em Labrador Retriever, Golden Retriever e raças felinas Sphynx e Devon Rex); 3) Gene CHAT.',
        interpretation: 'Padrão-ouro confirmatório (*isGoldStandard: true*). Positivo para mutação homozigota sela o diagnóstico etiológico exato e orienta a escolha ou contraindicação de piridostigmina.',
        limitations: 'Linhagens com mutações raras ou não mapeadas comercialmente podem ter teste genético inicial não conclusivo.',
        isGoldStandard: true
      },
      {
        stepNumber: 5,
        title: 'Radiografia Cervicotorácica com Contraste Negativo',
        purpose: 'Pesquisa de megaesôfago e triagem de pneumonia por aspiração.',
        description:
          'Projeções laterolaterais e ventrodorsais de tórax em decúbito suave.',
        interpretation: 'Avalia a presença de retenção aérea e dilatação esofágica generalizada e consolidações alveolares caudoventrais por broncoaspiração.',
        limitations: 'O megaesôfago pode ser intermitente nas fases iniciais.'
      }
    ]
  },

  treatment: {
    protocolosFarmacologicosEstratificados: [
      {
        drug: 'Brometo de Piridostigmina (Mestinon)',
        indication: 'Terapia de eleição EXCLUSIVAMENTE para CMS Pós-Sináptica por deficiência de receptores (mutações no gene CHRNE, como em Jack Russell e Smooth Fox Terrier).',
        dose: 'Dose inicial baixa: 0,25 a 0,5 mg/kg VO a cada 8 a 12 horas, titulada gradualmente até 1,0 a 1,5 mg/kg VO q8-12h com base na melhora da força motora.',
        mechanism: 'Inibidor reversível da enzima acetilcolinesterase na fenda sináptica, prolongando o tempo de permanência da acetilcolina liberada e maximizando a ligação com os receptores escassos remanescentes.',
        cautions: 'CONTRAINDICAÇÃO ABSOLUTA: NUNCA administrar em pacientes com suspeita ou confirmação de mutação no gene COLQ (deficiência congênita de acetilcolinesterase). Como esses animais já carecem da enzima para hidrolisar a ACh, a piridostigmina deflagra CRISE COLINÉRGICA GRAVE imediata com paralisia muscular despolarizante, broncoespasmo severo, sialorreia asfixiante e parada respiratória.',
        reassess: 'Manter sempre uma ampola de Sulfato de Atropina (0,04 mg/kg) pronta para uso emergencial em caso de sinais de intoxicação colinérgica (miose, diarreia, tremores, bradicardia).'
      },
      {
        drug: '3,4-Diaminopiridina (3,4-DAP / Amifampridina)',
        indication: 'Terapia de escolha para CMS Pré-Sináptica (mutações CHAT ou defeitos quânticos de liberação) e adjuvante em casos refratários.',
        dose: '0,2 a 0,5 mg/kg VO a cada 8 a 12 horas.',
        mechanism: 'Bloqueia seletivamente os canais de potássio voltagem-dependentes no terminal nervoso motor pré-sináptico, prolongando a duração da despolarização e aumentando o influxo de cálcio, o que multiplica o número de vesículas de acetilcolina liberadas por exocitose.',
        notes: 'Disponível em centros farmacêuticos especializados ou por importação regulamentada.'
      },
      {
        drug: 'Sulfato de Albuterol / Salbutamol (Agonista Beta-2 Adrenérgico)',
        indication: 'Terapia de escolha para CMS por mutação no gene COLQ ou DOK7.',
        dose: '0,05 mg/kg VO a cada 8 a 12 horas.',
        mechanism: 'A estimulação dos receptores beta-2 adrenérgicos no sarcolema muscular ativa a via da adenilil-ciclase e melhora a ancoragem dos complexos de receptores pós-sinápticos, reduzindo a miopatia de placa terminal sem aumentar a acetilcolina sináptica.'
      }
    ],
    contraindicacaoFormalDeImunossupressores:
      'Glicocorticoides (prednisona, prednisolona, dexametasona), azatioprina, ciclosporina e micofenolato de mofetila são RIGOROSAMENTE CONTRAINDICADOS no tratamento das síndromes miastênicas congênitas. Como a etiologia é monogênica e destituída de autoimunidade, a imunossupressão não traz nenhum benefício e agrava a perda muscular por catabolismo esteróide, além de expor o filhote ao risco iminente de sepse fulminante caso desenvolva pneumonia por aspiração.',
    medicamentosProibidosComAcaoBloqueadora: [
      'Antibióticos Aminoglicosídeos (Gentamicina, Amicacina, Neomicina, Estreptomicina): bloqueiam canais de cálcio pré-sinápticos e inibem a liberação de ACh.',
      'Fluoroquinolonas (Enrofloxacina, Marbofloxacina, Ciprofloxacina): agravam o bloqueio neuromuscular pós-sináptico.',
      'Ampicilina, Tetraciclinas e Clindamicina em doses elevadas.',
      'Anestésicos Locais (Lidocaína, Bupivacaína em infusão sistêmica).',
      'Sedativos Fenotiazínicos (Acepromazina) e Bloqueadores Neuromusculares (Atracúrio, Pancurônio).'
    ],
    manejoDoMegaesofago:
      'Em linhagens portadoras de megaesôfago concomitante: utilização obrigatória de Cadeira de Bailey (Bailey Chair) para manter o paciente em ângulo de 90 graus (vertical) durante e por 20 a 30 minutos após cada refeição; fornecimento de dieta úmida pastosa calórica ou em formato de almôndegas para facilitar o transporte gravitacional; e procinéticos gástricos se indicado.'
  },

  complications: {
    sequelasAgudasERiscoDeMorte: [
      'Pneumonia por Aspiração Fulminante: complicação mais comum e principal causa de mortalidade em cães jovens com CMS associada a megaesôfago. A inalação de conteúdo alimentar gástrico e saliva colonizada induz broncopneumonia bacteriana necrosante, colapso de lobos pulmonares e choque séptico.',
      'Crise Colinérgica por Superdosagem de Piridostigmina: acúmulo patológico de acetilcolina nos receptores nicotínicos e muscarínicos por superdosagem ou uso inadvertido em mutações COLQ. Manifesta-se pela síndrome mnemônica "SLUDDE" (Salivação copiosa, Lacrimejamento, Urinação, Defecação/diarreia, Desconforto gastrointestinal, Emese) associada a bradicardia severa, fasciculações musculares e paralisia respiratória por bloqueio despolarizante.',
      'Insuficiência Respiratória Aguda por Fadiga Diafragmática: esgotamento da transmissão neuromuscular nos músculos intercostais externos e no músculo diafragma deflagrado por estresse físico, choro ou esforço sustentado, culminando em hipoxemia grave, parada respiratória e óbito em poucos minutos.',
      'Atrofia Muscular por Desuso e Anquilose Articular: filhotes com fraqueza severa que permanecem em decúbito forçado contínuo desenvolvem atrofia muscular por desuso e contraturas articulares permanentes.',
      'Eutanásia Precoce por Diagnóstico Incorreto: desespero do tutor e falha diagnóstica do médico-veterinário ao confundir a doença com afecções neurológicas degenerativas intratáveis.'
    ],
    prognostico:
      'O prognóstico varia substancialmente conforme o gene mutado e a raça afetada. Em cães da raça Jack Russell Terrier com mutação CHRNE que não desenvolvem megaesôfago e respondem à piridostigmina, o prognóstico para sobrevida prolongada com excelente qualidade de vida é muito bom a excelente. Em Teckels Miniatura (Dachshunds), muitos filhotes sofrem melhora espontânea considerável com o desenvolvimento corporal e sobrevivem como cães ativos. Por outro lado, em animais que apresentam megaesôfago grave com episódios repetidos de pneumonia por aspiração ou em linhagens com mutações COLQ/CHAT refratárias, o prognóstico é reservado a desfavorável, exigindo manejo diário intensivo por parte da família.'
  },

  prevention: {
    aconselhamentoGeneticoEControleDeCanis:
      'A profilaxia primária é exclusivamente genética e populacional: submeter reprodutores das raças predispostas (Jack Russell, Smooth Fox Terrier, Labrador, Sphynx, Devon Rex) a testes de triagem molecular por DNA antes do acasalamento. Animais homozigotos afetados e heterozigotos carreadores (carriers) NÃO devem ser cruzados entre si, erradicando o nascimento de filhotes afetados.',
    cuidadosComAnimaisAfetados:
      'Manter os pacientes sob manejo ambiental controlado: passeios curtos em superfícies regulares, piso antiderrapante na residência, comedouros e bebedouros elevados e vigilância redobrada contra infecções respiratórias.',
    errosComuns: [
      'Prescrever corticosteroides (prednisona) ou imunossupressores para CMS, acreditando tratar-se de Miastenia Gravis adquirida.',
      'Administrar brometo de piridostigmina em animais com mutações do gene COLQ (deficiência de acetilcolinesterase), deflagrando crise colinérgica fatal.',
      'Prescrever antibióticos da classe dos aminoglicosídeos (gentamicina, amicacina) ou fluoroquinolonas para tratar pneumonia por aspiração em pacientes miastênicos, provocando colapso respiratório iatrogênico imediato.',
      'Acreditar que um teste sorológico de anticorpos anti-AChR negativo descarta o diagnóstico de doença da junção neuromuscular no filhote.',
      'Permitir que o animal se alimente no chão em presença de megaesôfago, facilitando a broncoaspiração.'
    ],
    redFlags: [
      'Tosse súbita associada a febre e respiração acelerada ruidosa (urgência de pneumonia por aspiração).',
      'Salivação profusa, miose em fenda, diarreia e fraqueza súbita após medicação anticolinesterásica (emergência de crise colinérgica).',
      'Respiração paradoxal abdominal com lábios cianóticos em repouso (paralisia diafragmática iminente).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'miastenia-gravis-caes-gatos'
  ],
  relatedMedicationSlugs: [
    'piridostigmina',
    'atropina',
    'neostigmina'
  ],
  references: [
    {
      id: 'ref-cms-mignan-2020',
      title: 'Classification of myasthenia gravis and congenital myasthenic syndromes in dogs and cats',
      citationText: 'Mignan T, Targett M, Lowrie M. Classification of myasthenia gravis and congenital myasthenic syndromes in dogs and cats. J Vet Intern Med. 2020;34(5):1707-1717.',
      authors: 'Mignan T, Targett M, Lowrie M.',
      year: 2020,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '34',
      pages: '1707-1717',
      sourceType: 'Artigo de Revisão e Classificação Consensual',
      url: 'https://doi.org/10.1111/jvim.15855',
      doi: '10.1111/jvim.15855',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cms-dewey-junction',
      title: 'A Practical Guide to Canine and Feline Neurology: Disorders of the Neuromuscular Junction',
      citationText: 'Penderis J, Martin-Vaquero P. Junctionopathies. In: Dewey CW, da Costa RC, eds. Practical Guide to Canine and Feline Neurology. 3rd ed. Ames: Wiley-Blackwell; 2016:455-472.',
      authors: 'Penderis J, Martin-Vaquero P.',
      year: 2016,
      journal: 'Practical Guide to Canine and Feline Neurology (3rd ed)',
      sourceType: 'Livro-texto Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cms-delahunta-2021',
      title: "de Lahunta's Veterinary Neuroanatomy and Clinical Neurology: The Motor Unit",
      citationText: 'de Lahunta A, Glass E, Kent M. de Lahunta\'s Veterinary Neuroanatomy and Clinical Neurology. 5th ed. St. Louis: Elsevier; 2021:115-135.',
      authors: 'de Lahunta A, Glass E, Kent M.',
      year: 2021,
      journal: "de Lahunta's Veterinary Neuroanatomy and Clinical Neurology",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cms-ettinger-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine: Diseases of the Neuromuscular Junction",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1450-1458.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cms-shelton-lab',
      title: 'Routine and specialized laboratory testing for neuromuscular diseases in dogs and cats',
      citationText: 'Shelton GD. Routine and specialized laboratory testing for neuromuscular diseases. Vet Clin Pathol. 2010;39(3):278-295.',
      authors: 'Shelton GD.',
      year: 2010,
      journal: 'Veterinary Clinical Pathology',
      volume: '39',
      pages: '278-295',
      sourceType: 'Artigo de Revisão Diagnóstica',
      doi: '10.1111/j.1939-165X.2010.00253.x',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-cms-plumb-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Pyridostigmine Bromide, Neostigmine, Atropine",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:864-866 (Pyridostigmine).",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    }
  ]
};
