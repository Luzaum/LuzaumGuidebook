import { DiseaseRecord } from '../../types/disease';

export const megaesofagoCaesGatosRecord: DiseaseRecord = {
  id: 'disease-megaesofago-caes-gatos',
  slug: 'megaesofago-caes-gatos',
  title: 'Megaesôfago em Cães e Gatos',
  subtitle: 'Cães e Gatos | Monografia clínica avançada · Revisão bibliográfica: novembro de 2026',
  category: 'gastroenterologia',
  categories: [
    'gastroenterologia',
    'neurologia',
    'pneumologia',
    'nutricao',
    'urgencia-emergencia',
    'clinica-medica',
  ],
  species: ['dog', 'cat'],
  synonyms: [
    'Megaesophagus',
    'Acalasia esofágica',
    'Dismotilidade esofágica',
    'Dilatação esofágica',
    'Síndrome semelhante à acalasia do esfíncter esofágico inferior (LES-AS)',
    'Persistência do arco aórtico direito (PAAD)',
  ],
  tags: [
    'Regurgitação',
    'Esôfago',
    'Miastenia gravis',
    'Pneumonia aspirativa',
    'Videofluoroscopia',
    'Cadeira de Bailey',
    'LES-AS',
    'Sildenafil',
    'Hipomotilidade esofágica',
  ],
  isPublished: true,
  source: 'seed',
  quickSummary:
    'Síndrome caracterizada por dilatação anormal, difusa ou segmentar, do esôfago associada à hipomotilidade ou ausência de peristaltismo eficaz. Alimentos, água e saliva ficam retidos no lúmen esofágico e retornam por regurgitação. Frequentemente não é o diagnóstico etiológico definitivo: exige investigação ativa de causas secundárias tratáveis (como miastenia gravis, hipoadrenocorticismo, disautonomia e síndromes semelhantes à acalasia do EEI — LES-AS) e prevenção rigorosa da pneumonia aspirativa.',
  quickDecisionStrip: [
    'Regurgitação ≠ vômito: determina se a investigação inicial é esofágica (tórax) ou gastrintestinal/abdominal.',
    'Investigue miastenia gravis em todo cão adulto com megaesôfago adquirido, mesmo sem fraqueza locomotora.',
    'Radiografia normal não exclui dismotilidade ou LES-AS: considere videofluoroscopia funcional.',
    'Aspiração nem sempre é bacteriana de imediato: diferencie pneumonite química estéril de pneumonia infecciosa.',
    'Alimentação vertical (cadeira de Bailey), textura testada e tempo pós-prandial de 15–30 min são tratamento de primeira linha.',
    'Pró-cinéticos de músculo liso (metoclopramida/cisaprida) não restauram o corpo estriado canino e podem aumentar o tônus do EEI.',
  ],
  quickSummaryRich: {
    lead:
      'O megaesôfago frequentemente não é o diagnóstico etiológico definitivo: é muitas vezes a manifestação clínica de outra doença sistêmica, neuromuscular ou funcional tratável.',
    leadHighlights: [
      'não é o diagnóstico etiológico definitivo',
      'outra doença sistêmica, neuromuscular ou funcional tratável',
    ],
    pillars: [
      {
        title: 'Visão geral e paciente típico',
        body:
          'O esôfago perde parte ou toda a propulsão; saliva, água e alimento acumulam-se e retornam por regurgitação ou são aspirados. Típico em filhotes após o desmame (congênito/PAAD) ou cães adultos com regurgitação e emagrecimento. Em gatos é incomum e exige pesquisa criteriosa de disautonomia, alterações neuromusculares, congênitas e obstruções.',
        highlights: ['regurgitação', 'disautonomia'],
      },
      {
        title: 'Diagnóstico e complicação mais temida',
        body:
          'Anamnese para diferenciar regurgitação de vômito, radiografias cervicotorácicas buscando dilatação esofágica e pneumonia aspirativa (a complicação mais letal), pesquisa de causas secundárias (especialmente AChR-Ab e cortisol basal/ACTH) e videofluoroscopia nos casos duvidosos ou suspeitos de LES-AS.',
        highlights: ['pneumonia aspirativa', 'AChR-Ab', 'videofluoroscopia'],
      },
      {
        title: 'Tratamento prioritário',
        body:
          'Corrigir a causa identificável, instituir alimentação rigorosamente verticalizada (cadeira de Bailey), ajustar consistência e fracionamento das refeições, manter hidratação/nutrição e tratar precocemente complicações respiratórias. Cirurgia ou intervenção endoscópica restringe-se a fenótipos específicos.',
        highlights: ['alimentação rigorosamente verticalizada', 'cadeira de Bailey'],
      },
    ],
    diagnosticFlow: {
      title: 'Roteiro diagnóstico em 60 segundos',
      steps: [
        {
          label: '1. Confirmar regurgitação',
          detail: 'Expulsão passiva sem pródromo nem esforço abdominal; rastrear taquipneia ou tosse.',
        },
        {
          label: '2. Radiografia cervicotorácica',
          detail: 'Buscar dilatação gasosa/fluida, desvio ventral da traqueia e infiltrado alveolar ventral.',
        },
        {
          label: '3. Pesquisa etiológica ativa',
          detail: 'Excluir PAAD/estenose/corpo estranho; dosar AChR-Ab (MG) e cortisol basal/ACTH.',
        },
        {
          label: '4. Videofluoroscopia (VFSS)',
          detail: 'Diferenciar aperistalse difusa, disfagia faríngea e obstrução funcional do EEI (LES-AS).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Conduta terapêutica prioritária',
      steps: [
        {
          label: '1. Estabilizar aspiração',
          detail: 'O2 + IV + NPO transitório se pneumonia aspirativa ativa; antibiótico parenteral apenas quando indicado.',
        },
        {
          label: '2. Tratar causa base',
          detail: 'Piridostigmina (MG), reposição adrenal (Addison) ou cirurgia (PAAD/LES-AS selecionada).',
        },
        {
          label: '3. Postura vertical + dieta',
          detail: 'Cadeira de Bailey (15–30 min pós-refeição), 3–6 pequenas porções e textura individualizada.',
        },
        {
          label: '4. Adjuvantes seletivos',
          detail: 'IBP/sucralfato se esofagite; sildenafil em congênitos/LES-AS selecionados; evitar metoclopramida/cisaprida em cães.',
        },
      ],
    },
  },
  etiology: {
    primaria:
      'O **megaesôfago congênito idiopático** decorre de falha primária na maturação da inervação vagal ou do controle neuromuscular esofágico sem lesão obstrutiva demonstrável, manifestando-se tipicamente ao desmame durante a transição para alimentos sólidos. Já o **megaesôfago adquirido idiopático** surge em animais adultos após período prévio de função normal, sem identificação de doença neuromuscular, endócrina, tóxica ou mecânica subjacente após investigação completa. O rótulo de "idiopático" deve ser sempre um diagnóstico de exclusão.',
    secundaria:
      'As formas secundárias representam parcela expressiva dos casos adultos e oferecem oportunidade real de reversão quando a causa primária é identificada precocemente. Incluem causas **neuromusculares** (miastenia gravis adquirida focal ou generalizada, polimiosite imunomediada ou infecciosa, polirradiculoneurite, botulismo, tétano, neuropatias hereditárias e disautonomia felina/canina), **endócrinas/metabólicas** (hipoadrenocorticismo típico ou atípico; o nexo causal direto do hipotireoidismo isolado é controverso, devendo ser interpretado com cautela diante da síndrome do eutireoideo doente), **inflamatórias/infecciosas** (esofagite erosiva grave, doença do refluxo crônica, espirocercose), **tóxicas** (chumbo, organofosforados/carbamatos, tálio, acrilamida) e **obstrutivas funcionais ou mecânicas** (síndrome semelhante à acalasia do esfíncter esofágico inferior — LES-AS, estenoses cicatriciais, corpos estranhos, neoplasias e anomalias de anel vascular como persistência do arco aórtico direito).',
    fatoresDeRisco:
      'Predisposição racial hereditária ou familiar (Pastor Alemão, Dogue Alemão, Setter Irlandês, Terra Nova, Shar-Pei, Fox Terrier Pelo de Arame, Schnauzer Miniatura, Labrador Retriever; em gatos, Siameses historicamente citados em casos congênitos), período de desmame (congênito e PAAD), idade adulta/senil (formas imunomediadas ou paraneoplásicas associadas a timoma), refluxo gastroesofágico perioperatório não tratado, exposição a neurotoxinas e administração de comprimidos ou cápsulas secas irritantes sem lubrificação hídrica em gatos e cães pequenos.',
    definicaoEDiferenciacaoClinica:
      '**O que diferencia dilatação esofágica transitória de megaesôfago verdadeiro?**\n' +
      'O esôfago pode apresentar dilatação transitória discreta durante a passagem de um bolo alimentar, imediatamente após ingestão volumosa de líquidos, em cães com aerofagia acentuada ou sob influência de sedação, anestesia e posicionamento radiográfico — isso não significa doença motora.\n\n' +
      'No **megaesôfago clinicamente relevante**, existe dilatação anormal persistente associada à dificuldade objetiva de transporte do conteúdo esofágico, resultante de falha de propulsão, aumento de resistência à saída esofágica ou combinação de ambos. Um esôfago dilatado por obstrução mecânica localizada (anel vascular, estenose ou corpo estranho) não deve receber automaticamente o diagnóstico de megaesôfago idiopático.',
    classificacaoEtiologicaTabela: {
      kind: 'clinicalTable',
      caption:
        'Separar falha propulsiva difusa, obstrução funcional do EEI (LES-AS) e obstrução mecânica localizada evita erros diagnósticos e prognósticos.',
      headers: ['Classificação', 'Característica fisiopatológica', 'Exemplos principais'],
      rows: [
        [
          'Congênito idiopático',
          'Dismotilidade presente desde o desenvolvimento, sem outra causa estrutural ou metabólica demonstrada',
          'Filhotes de raças predispostas que iniciam regurgitação ao desmame',
        ],
        [
          'Congênito secundário / estrutural',
          'Dilatação decorrente de anomalia anatômica compressiva ou defeito neuromuscular congênito',
          'Persistência do arco aórtico direito (PAAD), outras anomalias de anel vascular, síndromes miastênicas congênitas',
        ],
        [
          'Adquirido idiopático',
          'Dilatação e dismotilidade identificadas em adulto após função normal prévia, sem causa esclarecida após triagem',
          'Megaesôfago adulto não estrutural',
        ],
        [
          'Adquirido secundário',
          'Dismotilidade provocada por doença neuromuscular, imunomediada, endócrina, inflamatória ou tóxica',
          'Miastenia gravis, polimiosite, hipoadrenocorticismo, neuropatias periféricas, disautonomia, chumbo',
        ],
        [
          'Obstrutivo funcional',
          'Falha coordenada de relaxamento/abertura esfinteriana na transição gastroesofágica sem estenose anatômica fixa',
          'Síndrome semelhante à acalasia do esfíncter esofágico inferior (LES-AS)',
        ],
        [
          'Dilatação secundária a obstrução mecânica',
          'Acúmulo luminal e distensão proximal ao ponto de obstrução física',
          'Estenose pós-esofagite/doxiciclina, corpo estranho, anel vascular, granuloma por Spirocerca lupi, neoplasia esofágica ou mediastinal',
        ],
      ],
    },
    causasSecundariasTabela: {
      kind: 'clinicalTable',
      headers: [
        'Condição secundária',
        'Pistas clínicas associadas',
        'Exame confirmatório',
        'Potencial de reversão',
      ],
      rows: [
        [
          'Miastenia gravis {{ref:1}}',
          'Principal causa secundária tratável em cães (38,2% sem lesão estrutural) {{ref:2}}; pode cursar com megaesôfago focal sem fraqueza locomotora ou com timoma',
          'Anticorpos anti-receptor de acetilcolina (AChR-Ab); radiografia/TC para timoma; ~22% podem ser soronegativos em coortes clínicas {{ref:1}}',
          'Moderado a alto com diagnóstico e piridostigmina precoces antes de pneumonia grave',
        ],
        [
          'Hipoadrenocorticismo (Addison) {{ref:3}}',
          'Regurgitação com ou sem sinais GI crônicos e forma atípica com Na/K normais',
          'Cortisol basal (alta sensibilidade de 98,2%) seguido de teste de estimulação com ACTH para confirmação {{ref:3}}',
          'Alto — frequentemente reverte com reposição adrenal fisiológica',
        ],
        [
          'Polimiosite / miopatias',
          'Rigidez muscular, disfagia, atrofia temporal/apendicular e intolerância ao exercício',
          'CK/AST elevadas, sorologias (Toxoplasma, Neospora), eletromiografia e biópsia muscular',
          'Variável conforme resposta à terapia específica ou imunossupressão',
        ],
        [
          'Disautonomia (felina / canina)',
          'Midríase não responsiva, xerostomia, prolapso de 3ª pálpebra, constipação, atonia vesical e bradicardia',
          'Avaliação autonômica e farmacológica ocular (pilocarpina diluída) + imagem torácica',
          'Reservado a ruim na disautonomia idiopática difusa',
        ],
        [
          'Hipotireoidismo (cães)',
          'Associação etiológica controversa: muitos pacientes possuem apenas síndrome do eutireoideo doente',
          'T4 total, T4 livre por diálise de equilíbrio e TSH fora de crise aguda',
          'Incerto; reposição hormonal nem sempre reverte o megaesôfago',
        ],
        [
          'Intoxicações (chumbo, organofosforados)',
          'Sinais neurológicos, digestórios ou muscarínicos concomitantes e histórico ambiental',
          'Plumbemia, esfregaço (pontilhado basofílico/metarrubricitose) e atividade de colinesterase',
          'Bom com remoção da fonte tóxica e quelação/antídoto precoce',
        ],
        [
          'Esofagite severa / refluxo crônico',
          'Odinofagia, sialorreia intensa, pós-anestesia ou pós-cápsula seca (ex.: doxiciclina em gatos)',
          'Esofagoscopia cuidadosa e histórico medicamentoso/anestésico',
          'Alto se tratado precocemente antes de estenose fibrosa definitiva',
        ],
        [
          'LES-AS (obstrução funcional do EEI) {{ref:4}}',
          'Regurgitação precoce pós-prandial e retenção líquida acentuada em "bico de pássaro"',
          'Videofluoroscopia da deglutição com avaliação dinâmica de abertura do EEI {{ref:4}}',
          'Bom a excelente em selecionados com dilatação/miotomia de Heller + Dor {{ref:5}}',
        ],
      ],
    },
  },
  epidemiology: {
    distribuicao:
      'O megaesôfago é relativamente comum entre as doenças esofágicas em cães, mas permanece **incomum em gatos**. Em um estudo retrospectivo com 99 cães portadores de megaesôfago sem lesão estrutural identificável, 10 apresentavam forma congênita e 89 forma adquirida; dentre os casos adquiridos, 42,7% foram classificados como idiopáticos e 38,2% associados à miastenia gravis {{ref:2}}.',
    fatoresPredisponentes:
      'Raças caninas frequentemente super-representadas incluem **Pastor Alemão**, **Dogue Alemão**, **Setter Irlandês**, **Terra Nova**, **Shar-Pei**, **Fox Terrier Pelo de Arame**, **Schnauzer Miniatura**, **Labrador Retriever** e **Greyhound**.\n\n' +
      'Em gatos, embora raro, ocorre sobretudo em associação a disautonomia, miastenia gravis, estenoses medicamentosas/pós-anestésicas, anomalias vasculares e casos congênitos esporádicos (com relato histórico na raça **Siamês**).',
    geneticaEAgregacaoRacial:
      'A genética do megaesôfago congênito idiopático varia significativamente entre raças — não existe um único teste molecular válido para todos os cães:\n' +
      '• **Pastor Alemão:** estudo genômico de referência identificou forte associação no gene *MCHR2* (SNP no íntron 1 e VNTR na região 3\'UTR; *p* = 1,32 × 10^-17), interagindo com haplótipo protetor ligado ao sexo masculino (machos apresentam aproximadamente o dobro de risco) {{ref:6}}.\n' +
      '• **Pastor Branco Suíço:** estudo publicado em 2025 demonstrou que o marcador *MCHR2* identificado no Pastor Alemão **não foi preditivo** no Pastor Branco Suíço {{ref:7}}.\n' +
      '• **Dogue Alemão:** estudo de associação genômica ampla (GWAS) de 2023 apontou arquitetura genética poligênica com sinal principal no cromossomo 1 (*p* = 2,76 × 10^-10), sem nenhum animal portando a variante de *MCHR2* do Pastor Alemão {{ref:8}}.',
  },
  pathogenesisTransmission: {
    mecanismoDeTransmissaoOuOrigem:
      'O megaesôfago **não é uma doença transmissível**. Formas congênitas possuem transmissão hereditária ou poligênica racial complexa em raças predispostas (justificando exclusão reprodutiva dos afetados) {{ref:6,8}}. Formas secundárias infecciosas/parasitárias (como espirocercose por *Spirocerca lupi* via hospedeiro intermediário/paratênico ou miosite por *Toxoplasma* / *Neospora*) dependem da aquisição ambiental do agente etiológico específico.',
    anomaliasVascularesEEstrutura:
      '**Atenção à nomenclatura (anéis vasculares):** embora anomalias de anel vascular apareçam frequentemente entre as causas congênitas de megaesôfago, o mecanismo primário é uma **compressão extrínseca mecânica na base cardíaca** (em cerca de 95% dos casos, persistência do arco aórtico direito com ligamento arterioso esquerdo), produzindo dilatação localizada cranial ao ponto de constrição, e não aperistalse difusa primária.\n\n' +
      '**Distribuição anatômica e estadiamento:** o megaesôfago pode ser **difuso** (típico das formas neuromusculares generalizadas e idiopáticas), **segmentar** (cranial ao coração nos anéis vasculares ou segmentar na esofagite/LES-AS) ou **predominantemente cervical ou torácico**. Não existe sistema de estadiamento clínico I–IV universalmente validado baseado exclusivamente no diâmetro radiográfico em cães e gatos.',
  },
  pathophysiology: {
    mecanismoPrincipal:
      'A deglutição normal compreende fases oral, faríngea (elevação e fechamento protetor laríngeo junto ao relaxamento do esfíncter esofágico superior) e esofágica (ondas peristálticas coordenadas que deslocam o bolo até o relaxamento oportuno do esfíncter esofágico inferior — EEI).\n\n' +
      'No megaesôfago ocorre comprometimento do arco reflexo vagal aferente-eferente, dos neurônios motores esofágicos, da junção neuromuscular ou diretamente da musculatura esofágica — sendo em muitos cães idiopáticos um defeito predominante na **via sensitiva aferente vagal**. Sem propulsão eficaz, alimentos, líquidos e saliva acumulam-se no lúmen, promovendo dilatação passiva crônica, estase fermentativa, esofagite e retorno à cavidade oral por regurgitação.',
    comparativoMusculaturaTabela: {
      kind: 'clinicalTable',
      caption:
        'A composição muscular do corpo esofágico determina por que fármacos que agem em músculo liso não restauram o peristaltismo canino.',
      headers: ['Característica', 'Cães', 'Gatos'],
      rows: [
        [
          'Musculatura esofágica',
          'Predominantemente músculo estriado esquelético ao longo de praticamente todo o órgão',
          'Porção proximal estriada e porção distal (aprox. terço caudal) com músculo liso',
        ],
        [
          'Controle da peristalse',
          'Forte dependência da coordenação vagal e junção neuromuscular colinérgica do músculo estriado',
          'Controle misto, com participação importante de circuitos autonômicos/entéricos na porção distal',
        ],
        [
          'Relevância da junção neuromuscular',
          'Muito elevada para o transporte esofágico em toda a extensão',
          'Elevada na porção estriada proximal, com diferenças fisiológicas na região distal',
        ],
        [
          'Resposta a pró-cinéticos de músculo liso',
          'Geralmente limitada ou ausente para o corpo esofágico; risco de elevar tônus do EEI',
          'Potencial de resposta regional no terço distal, sem garantia de benefício clínico global',
        ],
        [
          'Frequência da síndrome',
          'Relativamente comum entre as doenças esofágicas',
          'Incomum',
        ],
      ],
    },
    figuraAnatomiaComparativa: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/megaesofago-caes-gatos/fisiopatologia-esofago-cao-vs-gato-musculatura-les.jpg',
      alt: 'Comparativo anatômico e funcional entre o esôfago canino com músculo estriado em toda a extensão e o esôfago felino com terço distal em músculo liso, além da regulação do esfíncter esofágico inferior',
      caption:
        'Comparação histológica e fisiológica do esôfago em cães e gatos e repercussões sobre pró-cinéticos e relaxamento do esfíncter esofágico inferior.',
      shortCaption: 'Musculatura esofágica comparada: cão vs. gato.',
      display: 'wide',
    },
    cascataFisiopatologica: [
      '1. Falha propulsiva (defeito aferente vagal, placa motora, músculo ou abertura do EEI) impede a progressão do bolo alimentar.',
      '2. Estase crônica de saliva, água e dieta distende progressivamente as paredes esofágicas, atenuando a túnica muscular.',
      '3. Fermentação luminal e refluxo ácido gástrico induzem esofagite secundária, aprofundando a atonia motora.',
      '4. Transbordamento gravitacional e mudanças posturais provocam regurgitação passiva sem esforço abdominal.',
      '5. Desnutrição calórico-proteica progressiva e aspiração traqueobrônquica deflagram pneumonite química aguda e pneumonia bacteriana aspirativa.',
    ],
    lesAcalasiaSimile:
      '**Síndrome semelhante à acalasia do esfíncter esofágico inferior (LES-AS):** fenótipo funcional no qual o esfíncter esofágico inferior falha em relaxar e abrir adequadamente durante a passagem do bolo {{ref:4}}. Pode causar dilatação segmentar ou difusa secundária à resistência distal de saída e apresenta relevância terapêutica direta porque cães selecionados respondem a **sildenafil** ou a procedimentos direcionados ao EEI (dilatação pneumática com toxina botulínica ou miotomia de Heller + Dor) {{ref:4,5,9}}.',
    fisiopatologiaAspiracaoEPneumonite:
      '**Pneumonite química versus pneumonia bacteriana aspirativa:** quando conteúdo estagnado e ácido atinge as vias aéreas inferiores, o insulto inicial pode ser uma **pneumonite química estéril** (edema, broncoespasmo e lesão epitelial aguda). Somente parte desses episódios evolui para **pneumonia bacteriana secundária** (tipicamente polimicrobiana, envolvendo anaeróbios orofaríngeos e aeróbios Gram-negativos/positivos).\n\n' +
      '**Fator dietético no refluxo:** grande volume gástrico, ingestão rápida e dietas ou soluções hiperosmolares distendem a cárdia gástrica e desencadeiam relaxamentos transitórios do EEI (TLESRs) via reflexo vagal, aumentando a chance de refluxo sobre um esôfago incapaz de depurar ácido.',
  },
  clinicalSignsPathophysiology: {
    sinaisPrincipais:
      '• **Regurgitação passiva crônica ou aguda:** expulsão de alimento não digerido, água ou muco espumoso sem pródromos nem contrações abdominais.\n' +
      '• **Sialorreia, halitose e abaulamento cervical:** acúmulo de saliva e ar na porção cervical pode formar dilatação visível ou palpável à entrada do tórax.\n' +
      '• **Emagrecimento com apetite preservado ou polifagia:** o paciente sente fome, exceto quando há esofagite dolorosa grave ou pneumonia aspirativa sistêmica.\n' +
      '• **Sinais respiratórios (alerta máximo):** tosse úmida, secreção nasal mucopurulenta (eventualmente com partículas alimentares), taquipneia, dispneia e febre indicam pneumonia aspirativa.\n' +
      '• **Sinais neuromusculares / autonômicos associados:** intolerância ao exercício (miastenia gravis), disfonia/estridor, atrofia muscular (polimiosite) ou midríase/xerostomia/constipação (disautonomia).',
    regurgitacaoVsVomitoTabela: {
      kind: 'clinicalTable',
      caption:
        'A diferenciação clínica entre regurgitação e vômito define se os exames iniciais miram o tórax/esôfago ou o abdome.',
      headers: ['Critério clínico', 'Regurgitação', 'Vômito'],
      rows: [
        [
          'Sinais prodrômicos',
          'Ausentes; expulsão passiva e súbita',
          'Presentes: náusea, sialorreia, lambedura labial, inquietação',
        ],
        [
          'Esforço abdominal',
          'Ausente (sem contrações vigorosas do abdome)',
          'Presente: ânsia ativa com contração da musculatura abdominal',
        ],
        [
          'Aspecto do conteúdo',
          'Alimento não digerido, água e saliva; frequentemente formato tubular/cilíndrico',
          'Alimento parcialmente digerido, líquido gástrico ou bile',
        ],
        [
          'Presença de bile e pH',
          'Sem bile; pH tipicamente neutro (~6,5–7,5), exceto se houver refluxo gástrico associado',
          'Pode conter bile amarelada/esverdeada; pH geralmente ácido (< 5,0)',
        ],
        [
          'Relação com alimentação',
          'Imediata a horas após comer ou beber (ou acúmulo salivar ao levantar)',
          'Variável; pode ocorrer horas após refeição ou em jejum',
        ],
        [
          'Apetite após episódio',
          'Frequentemente preservado (tenta comer novamente, salvo esofagite severa)',
          'Geralmente reduzido pela náusea persistente',
        ],
      ],
    },
    exameFisicoDirigido:
      'Avaliar escore corporal e muscular; palpar o pescoço ventral/esquerdo à procura de dilatação flutuante; observar deglutição de pequena porção quando o paciente estiver estável; auscultar meticulosamente todos os campos pulmonares com ênfase em **lobos médio direito e craniais ventrais** (crepitações ou redução de murmúrio vesicular); auscultar base cardíaca em filhotes; e realizar exame neurológico incluindo nervos cranianos, reflexos pupilares/terceira pálpebra e teste de marcha curta para fadiga.',
    sinaisDeGravidade:
      '• **Taquipneia em repouso, dispneia, ortopneia ou cianose** (pneumonia aspirativa grave).\n' +
      '• **Febre (> 39,2 °C) ou hipotermia com prostração e taquicardia** (risco de sepse pulmonar).\n' +
      '• **Odinofagia severa, sialorreia sanguinolenta ou incapacidade total de reter água** (esofagite ulcerativa profunda, corpo estranho ou estenose severa).\n' +
      '• **Fraqueza progressiva com colapso após poucos passos ou dispneia muscular** (crise miastênica).',
    alteracoesPorSistemas: [
      {
        system: 'Sistema Digestório Anterior',
        findings: [
          'Regurgitação passiva de alimento íntegro, água ou espuma salivar.',
          'Halitose por estase e fermentação bacteriana esofágica.',
          'Odinofagia e estase salivar quando há esofagite secundária.',
        ],
      },
      {
        system: 'Sistema Respiratório',
        findings: [
          'Tosse úmida, secreção nasal mucopurulenta e crepitações cranioventrais pulmonares.',
          'Taquipneia, hipoxemia e esforço respiratório na pneumonia aspirativa.',
        ],
      },
      {
        system: 'Sistema Neuromuscular e Autonômico',
        findings: [
          'Fadiga motora episódica (miastenia gravis generalizada).',
          'Midríase fixa, xerostomia, prolapso de 3ª pálpebra e atonia vesical/colônica (disautonomia).',
        ],
      },
      {
        system: 'Estado Nutricional',
        findings: [
          'Perda de massa magra, emagrecimento progressivo e desidratação.',
          'Subdesenvolvimento ponderal em filhotes.',
        ],
      },
    ],
  },
  diagnosis: {
    passos:
      'O plano diagnóstico organiza-se em quatro etapas sequenciais: (1) anamnese para diferenciar **regurgitação de vômito**; (2) **radiografias cervicotorácicas (3 projeções)** para comprovar dilatação esofágica e rastrear pneumonia aspirativa ou massas mediastinais; (3) **investigação sistemática de causas secundárias tratáveis** (AChR-Ab, cortisol basal/ACTH, CK e exame autonômico); e (4) **videofluoroscopia (VFSS)** nos casos com radiografia normal apesar da suspeita clínica ou para fenotipar **LES-AS** e testar texturas.',
    passosEstruturados: [
      {
        stepNumber: 1,
        title: 'Anamnese dirigida e confirmação da regurgitação',
        description:
          'Confirmar expulsão passiva sem pródromos nem esforço abdominal, documentar tempo após refeição e solicitar vídeo doméstico ao tutor quando houver dúvida.',
        purpose: 'Localizar o problema no esôfago antes de prosseguir com exames abdominais.',
        interpretation:
          'Regurgitação confirmada direciona imediatamente à imagem cervicotorácica e exame neuromuscular.',
        limitations:
          'Tutores frequentemente confundem regurgitação com vômito, atrasando a radiografia torácica.',
      },
      {
        stepNumber: 2,
        title: 'Radiografias cervicotorácicas em 3 projeções',
        description:
          'Radiografias lateral direita, lateral esquerda e ventrodorsal cobrindo esôfago cervical, mediastino e campos pulmonares.',
        purpose:
          'Documentar dilatação esofágica gasosa/fluida/alimentar, descartar compressão focal na base cardíaca e pesquisar pneumonia aspirativa ou timoma.',
        interpretation:
          'Lúmen tubular radiotransparente ou opaco dorsal à traqueia, deslocamento ventral traqueal/cardíaco, sinal da faixa traqueoesofágica e padrão alveolar em lobos craniais ventrais ou lobo médio direito.',
        limitations:
          'Radiografia estática normal não descarta dismotilidade leve/dinâmica ou LES-AS; evitar bário rotineiro pelo risco severo de aspiração pulmonar.',
      },
      {
        stepNumber: 3,
        title: 'Triagem laboratorial basal e rastreio de causas secundárias',
        description:
          'Hemograma, bioquímica sérica (Na/K, albumina, enzimas, CK), urinálise, proteína C-reativa (PCR), dosagem de AChR-Ab e cortisol sérico basal.',
        purpose:
          'Identificar miastenia gravis, hipoadrenocorticismo, polimiosite, infecção pulmonar ativa e distúrbios eletrolíticos.',
        interpretation:
          'AChR-Ab positivo confirma miastenia gravis (lembrando ~22% de soronegativos em coorte clínica de 167 cães com resposta terapêutica) {{ref:1}}. Cortisol basal normal exclui Addison (sensibilidade 98,2%; valores baixos exigem confirmação pelo teste com ACTH) {{ref:3}}.',
        limitations:
          'Não diagnosticar hipotireoidismo com base apenas em T4 total baixo durante pneumonia/doença aguda (síndrome do eutireoideo doente).',
      },
      {
        stepNumber: 4,
        title: 'Videofluoroscopia da deglutição (VFSS)',
        description:
          'Estudo radiográfico dinâmico em estação com contraste hidrossolúvel não iônico (iohexol) ou alimento de consistências variadas.',
        purpose:
          'Avaliar peristalse em tempo real, coordenação orofaríngea, abertura do EEI e consistência dietética de melhor depuração.',
        interpretation:
          'Diferencia aperistalse difusa de LES-AS ("bico de pássaro" em 63,2% e nível líquido em 68,4% dos casos) {{ref:4}} e define se pastoso ou sólido desliza melhor {{ref:10}}.',
        limitations:
          'Exige equipamento fluoroscópico especializado e paciente respiratoriamente estável.',
        isGoldStandard: true,
      },
      {
        stepNumber: 5,
        title: 'Endoscopia / Angio-TC / Eletromiografia (indicações seletivas)',
        description:
          'Esofagoscopia para estenoses, corpos estranhos, Spirocerca ou esofagite refratária; angio-TC para anéis vasculares complexos; EMG/biópsia para miopatias.',
        purpose: 'Tratar ou biopsiar lesões mecânicas, vasculares ou mucosas específicas.',
        interpretation:
          'Na estenose ou PAAD revela o ponto anatômico de constrição; no idiopático mostra lúmen amplo sem obstrução física.',
        limitations:
          'Exige anestesia geral com risco elevado de aspiração perioperatória — não realizar apenas para "confirmar" megaesôfago já evidente ao RX simples.',
      },
    ],
    figuraRadiografiaInicial: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/megaesofago-caes-gatos/rx-megaesofago-setter-irlandes-wikimedia.jpg',
      alt: 'Radiografia torácica lateral de um Setter Irlandês com megaesôfago idiopático mostrando dilatação esofágica preenchida por gás delimitada por setas amarelas dorsalmente ao coração e à traqueia, com alterações pulmonares compatíveis com pneumonia aspirativa',
      caption:
        'Figura 1 — Radiografia torácica lateral de um Setter Irlandês com megaesôfago idiopático. As setas amarelas delimitam a dilatação esofágica preenchida por gás dorsalmente ao coração e à traqueia, observando-se também alterações pulmonares compatíveis com pneumonia aspirativa (Wikimedia Commons, Kalumet / Anka Friedrich, CC BY-SA 3.0).',
      shortCaption: 'Radiografia lateral: dilatação esofágica gasosa e pneumonia aspirativa.',
      display: 'wide',
    },
    criteriosRadiograficos:
      '**Leitura radiográfica sistemática:**\n' +
      '• Normalmente o esôfago torácico não é visível como um grande tubo aerado. Quando perde propulsão, apresenta faixa dorsal radiotransparente (gás) ou radiopaca (fluido/alimento) com deslocamento ventral da traqueia e silhueta cardíaca.\n' +
      '• Em estudo radiométrico canino, a razão entre o diâmetro esofágico dorsal máximo e o comprimento da 12ª vértebra torácica (**DeD:T12**) superior a **4,8** apresentou sensibilidade de **94%** e especificidade de **100%** para identificar cães com disfunção de EEI/megaesôfago em relação a cães saudáveis, sendo a projeção lateral direita particularmente sensível {{ref:4}}.\n' +
      '• Inspecionar sempre os **lobos pulmonares craniais ventrais e lobo médio direito** buscando padrão alveolar sugestivo de pneumonia aspirativa.',
    videofluoroscopiaELesAs:
      '**Videofluoroscopia (VFSS) na prática:** em investigação de 23 cães encaminhados por megaesôfago, cerca de **60%** apresentaram disfunção do EEI compatível com **LES-AS**, exibindo afunilamento distal em "bico de pássaro" (63,2%) e linha de fluido esofágica (68,4%) {{ref:4}}. Quando a radiografia simples já confirma megaesôfago, **não usar grande volume de sulfato de bário** pelo risco de aspiração pulmonar grave; se necessário contraste, optar por pequeno volume de contraste iodado não iônico (iohexol).',
    examesLaboratoriaisEEtiologicos:
      '**Roteiro etiológico obrigatório:**\n' +
      '1. **Miastenia gravis (AChR-Ab):** solicitar em todo cão adulto sem causa mecânica. Em coorte multicêntrica recente (n = 167), **84,1%** apresentaram megaesôfago/hipomotilidade e **55,4%** desenvolveram pneumonia aspirativa (associada a *HR* de mortalidade de **3,8**; IC 95% 2,0–7,0), sendo **37 cães (~22%) soronegativos** responsivos clinicamente ao tratamento {{ref:1}}.\n' +
      '2. **Hipoadrenocorticismo (cortisol basal + estimulação com ACTH):** triar sempre devido à forma atípica; em estudo de 2026 com 982 cães, o cortisol basal atingiu sensibilidade de **98,2%** e especificidade de **65,8%**, exigindo confirmação com ACTH quando reduzido {{ref:3}}.\n' +
      '3. **Painel adicional:** hemograma, bioquímica/eletrólitos, CK, sorologias musculares (*Toxoplasma*/*Neospora*), plumbemia/esfregaço quando houver suspeita tóxica, painel tireoidiano completo fora de crise aguda e exame autonômico completo especialmente em gatos.',
    testesDiagnosticosTabela: {
      kind: 'clinicalTable',
      headers: ['Exame', 'Finalidade principal', 'Achados esperados e limitações'],
      rows: [
        [
          'Radiografia cervicotorácica (3 vistas)',
          'Confirmar dilatação esofágica e investigar aspiração ou massa mediastinal',
          'Tubo gasoso/fluido dorsal, desvio traqueal ventral, DeD:T12 > 4,8 {{ref:4}}; normal não exclui formas dinâmicas/LES-AS',
        ],
        [
          'Videofluoroscopia da deglutição (VFSS)',
          'Avaliar motilidade dinâmica, EEI (LES-AS) e melhor textura alimentar',
          'Identifica "bico de pássaro" (63,2%) e nível líquido (68,4%) na LES-AS {{ref:4}}; requer equipamento específico',
        ],
        [
          'Anticorpos anti-AChR (AChR-Ab)',
          'Confirmar miastenia gravis adquirida (inclusive forma focal)',
          'Altamente específico; soronegatividade (~22%) não exclui totalmente casos responsivos {{ref:1}}',
        ],
        [
          'Cortisol basal + Teste com ACTH',
          'Descartar hipoadrenocorticismo típico ou atípico',
          'Cortisol basal exclui com sensibilidade de 98,2%; valores baixos requerem ACTH para confirmar {{ref:3}}',
        ],
        [
          'Endoscopia digestiva alta / Angio-TC',
          'Confirmar ou tratar estenose, corpo estranho, Spirocerca ou anel vascular',
          'Requer anestesia geral de risco; reservada a suspeita obstrutiva ou esofagite refratária',
        ],
      ],
    },
    diagnosticosDiferenciais:
      '• **Vômito crônico** (doenças gástricas, intestinais, pancreatite, doença renal/hepática).\n' +
      '• **Disfagia orofaríngea ou acalasia cricofaríngea** (queda do bolo logo à tentativa de deglutir).\n' +
      '• **Persistência do arco aórtico direito (PAAD)** e outros anéis vasculares.\n' +
      '• **Obstrução mecânica esofágica** (estenose por doxiciclina/refluxo, corpo estranho, granuloma por *Spirocerca lupi*, neoplasia, hérnia hiatal).\n' +
      '• **Esofagite aguda ou divertículo esofágico**.',
    algoritmoDiagnosticoMegaesofago: {
      kind: 'interactiveAlgorithm',
      mode: 'diagnosis',
      title: 'Algoritmo diagnóstico interativo do megaesôfago',
      subtitle: 'Clique nas etapas para expandir critérios de imagem, rastreio etiológico e fenotipagem funcional.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Triagem clínica',
          speciesTag: 'both',
          title: 'Confirmar regurgitação e avaliar risco respiratório',
          quickSummary:
            'Diferenciar expulsão passiva sem esforço abdominal de vômito ativo e verificar imediatamente sinais de pneumonia aspirativa.',
          quickFacts: [
            { label: 'Chave', value: 'Sem náusea nem ânsia' },
            { label: 'Alerta', value: 'Taquipneia / febre' },
          ],
          details: [
            {
              label: 'Diferenciação à beira do leito',
              content:
                'Regurgitação ocorre passivamente minutos a horas pós-refeição, com alimento intacto sem bile. Vídeo gravado pelo tutor reduz erros de anamnese.',
              tone: 'default',
            },
            {
              label: 'Prioridade de via aérea',
              content:
                'Se houver dispneia, cianose ou crepitações cranioventrais, ofertar oxigenoterapia antes de contenções radiográficas prolongadas.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Imagem inicial',
          speciesTag: 'both',
          title: 'Radiografias cervicotorácicas em 3 projeções',
          quickSummary:
            'Confirmar dilatação difusa ou segmentar, buscar massa mediastinal (timoma) e inspecionar lobos ventrais para aspiração.',
          quickFacts: [
            { label: 'Corte DeD:T12', value: '> 4,8 sugere EEI/ME' },
            { label: 'Bário oral', value: 'Evitar se RX já diagnóstico' },
          ],
          details: [
            {
              label: 'Padrões anatômicos',
              content:
                'Dilatação estritamente cranial ao coração em filhote sugere anel vascular (PAAD). Massa cranial sugere timoma/linfoma.',
              tone: 'evidence',
            },
            {
              label: 'Risco com bário',
              content:
                'Evitar administração de sulfato de bário quando o megaesôfago já está evidente em radiografia simples devido ao alto risco de aspiração fatal.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Etiologia',
          speciesTag: 'both',
          title: 'Rastreio sistemático de causas secundárias tratáveis',
          quickSummary:
            'Obrigatório especialmente em cães adultos e gatos antes de assumir forma idiopática.',
          quickFacts: [
            { label: 'Obrigatório', value: 'AChR-Ab + Cortisol basal' },
            { label: 'Em gatos', value: 'Pesquisar disautonomia' },
          ],
          details: [
            {
              label: 'Miastenia gravis e Addison',
              content:
                'Solicitar AChR-Ab (mesmo sem fraqueza locomotora) e cortisol basal/ACTH. Em gatos avaliar midríase, 3ª pálpebra e uso prévio de cápsulas secas.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Padrão-ouro funcional',
          speciesTag: 'both',
          title: 'Videofluoroscopia da deglutição (VFSS) quando indicada',
          quickSummary:
            'Indispensável se radiografia for normal diante de regurgitação persistente ou para confirmar LES-AS e escolher a textura alimentar ideal.',
          quickFacts: [
            { label: 'LES-AS', value: '"Bico de pássaro" distal' },
            { label: 'Contraste seguro', value: 'Iohexol / alimento testado' },
          ],
          details: [
            {
              label: 'Impacto direto na conduta',
              content:
                'Distingue aperistalse verdadeira de obstrução funcional do EEI (candidata a sildenafil ou miotomia de Heller) e guia dieta pastosa vs. almôndegas.',
              tone: 'tip',
            },
          ],
        },
      ],
    },
  },
  treatment: {
    decisaoInicial:
      'O tratamento baseia-se em quatro eixos simultâneos: **(1) tratar a causa primária identificável** (miastenia gravis, hipoadrenocorticismo, esofagite ou anel vascular); **(2) alimentar rigorosamente na posição vertical** (cadeira de Bailey em cães; apoio vertical em gatos); **(3) adaptar consistência alimentar, fracionamento e entrega hídrica**; e **(4) reconhecer e tratar precocemente pneumonia aspirativa**. Não existe fármaco universal capaz de restaurar a peristalse do músculo estriado esofágico canino.',
    ordemDePrioridadeEstruturada: [
      {
        title: '1. Estabilizar via aérea e tratar pneumonia aspirativa aguda',
        summary:
          'Pacientes dispneicos, hipoxêmicos, febris ou desidratados requerem oxigenoterapia, fluidoterapia IV e jejum oral temporário (NPO) antes de testes nutricionais ou exames eletivos.',
        options:
          'Oxigenoterapia suplementar; fluidoterapia isotônica balanceada; diferenciar pneumonite química estéril de pneumonia bacteriana antes de escalonar antibióticos; iniciar via parenteral (ampicilina-sulbactam IV ± fluoroquinolona se grave/séptico) quando infecção confirmada/provável.',
        reassess: 'Frequência respiratória, oximetria, temperatura e curva de proteína C-reativa (PCR) em 48–72 h.',
        evidence: 'Normalização de PCR em mediana de 7 dias auxiliou a individualizar duração antibiótica (coorte 2022, n = 16).',
      },
      {
        title: '2. Tratar diretamente a etiologia secundária ou obstrutiva',
        summary:
          'Corrigir o gatilho reversível antes que ocorram dilatação irreversível ou pneumonias recorrentes.',
        options:
          'Miastenia gravis: piridostigmina VO (ou neostigmina SC/IM q6h / piridostigmina CRI enquanto NPO); Hipoadrenocorticismo: reposição de mineralocorticoide e glicocorticoide fisiológico; PAAD/estenose: cirurgia precoce ou dilatação endoscópica por balão.',
        reassess: 'Redução de regurgitações em 3–14 dias e acompanhamento sorológico (AChR-Ab a cada 6–8 semanas na MG).',
        evidence: 'Em coorte de 2025 (n = 167), MG com ME/pneumonia teve HR 3,8 de óbito, reforçando intervenção precoce.',
      },
      {
        title: '3. Instituir postura vertical (cadeira de Bailey) e dieta individualizada',
        summary:
          'Utilizar a gravidade para esvaziar o esôfago até o estômago e atingir 100% da RER (70 × peso^0,75) em pequenas frações.',
        options:
          'Cadeira de Bailey (tronco ~90°) em cães ou apoio vertical no colo/ombro em gatos durante toda a refeição e por 15–30 minutos após comer/beber; 3–6 refeições/dia; testar almôndegas macias vs. pasta homogênea; adaptar água (incorporada, gelatina ou gelo) se água pura regurgitar.',
        reassess: 'Diário semanal de regurgitações, pesagem e escore muscular a cada 7–14 dias.',
        evidence: 'Ensaio crossover (Mehain et al., 2022) reduziu mediana de regurgitações de 6,5 para 3,5 episódios/semana ao ajustar consistência individual.',
      },
      {
        title: '4. Proteção mucosa, terapia seletiva do EEI e alternativas nutricionais',
        summary:
          'Controlar esofagite de refluxo e utilizar terapias direcionadas apenas nos fenótipos com evidência favorável.',
        options:
          'Omeprazol/pantoprazol q12h + sucralfato em suspensão aquosa se esofagite; sildenafil em filhotes congênitos ou cães com LES-AS; evitar metoclopramida/cisaprida de rotina em cães; considerar miotomia de Heller + Dor na LES-AS refratária ou PEG nos casos refratários com higiene oral diária.',
        reassess: 'Tolerância digestiva, ganho ponderal, vigilância respiratória contínua.',
        evidence: 'Metanálise de 2026 (Emdin et al.) mostrou que gastrostomia isolada não reduz mortalidade (OR 1,13) sem controle da aspiração salivar.',
      },
    ],
    medicamentos: [
      {
        drug: 'Sildenafil (citrato)',
        indication:
          'Relaxamento do esfíncter esofágico inferior (EEI) em cães com síndrome semelhante à acalasia (LES-AS) ou filhotes com megaesôfago congênito idiopático',
        dose: '1 mg/kg (protocolo clássico em filhotes congênitos); 0,5 a 1 mg/kg em adultos selecionados com LES-AS',
        frequency: 'Cada 8 a 12 horas (q12h em protocolo congênito; q8–12h em cães adultos pela meia-vida curta de ~3–6 h)',
        route: 'Oral (com animal em posição vertical; preferencialmente em jejum se tolerado)',
        duration: 'Contínuo enquanto mantiver benefício clínico; reavaliar maturação em filhotes congênitos',
        mechanism:
          'Inibidor seletivo da fosfodiesterase-5 (PDE5): aumenta GMPc no músculo liso do EEI, reduzindo a resistência funcional à passagem gravitacional do bolo',
        reassess: 'Frequência semanal de regurgitação, ganho ponderal e diâmetro radiográfico após 2–4 semanas',
        notes:
          'Em ensaio randomizado em filhotes congênitos reduziu regurgitações e aumentou ganho de peso. Em gatos com LES-AS a resposta clínica é incerta (há relato de falha em 2 mg/kg VO q8h).',
        cautions:
          'Pode provocar hipotensão leve, letargia ou rubor mucoso; cuidado com alfa-bloqueadores e inibidores de CYP3A4 (itraconazol, cetoconazol, cimetidina, eritromicina).',
        contraindications:
          'Uso concomitante com nitratos orgânicos (risco de hipotensão fatal), hipotensão grave ou doença veno-oclusiva pulmonar.',
      },
      {
        drug: 'Brometo de piridostigmina',
        indication: 'Tratamento específico da miastenia gravis associada ao megaesôfago',
        dose: 'Cães: 0,2 a 2 mg/kg (titular da menor dose eficaz; máximo até 5 mg/kg se tolerado). Gatos: 0,25 mg/kg',
        frequency: 'Cada 8 a 12 horas (q8–12h)',
        route: 'Oral em posição vertical; se incapaz de deglutir com segurança, usar CRI IV 0,01–0,03 mg/kg/h ou substituir por neostigmina parenteral',
        duration: 'Longo prazo conforme títulos seriados de AChR-Ab e remissão clínica',
        mechanism:
          'Inibidor reversível da acetilcolinesterase que aumenta a acetilcolina disponível nos receptores nicotínicos da junção neuromuscular',
        reassess: 'Força muscular e episódios de regurgitação em 3–7 dias após ajuste; AChR-Ab a cada 6–8 semanas',
        notes:
          'Não melhora megaesôfago idiopático sem miastenia gravis. Diferenciar sempre crise miastênica de crise colinérgica (antídoto: atropina).',
        cautions:
          'Corticoides em dose alta inicial podem piorar a fraqueza miastênica e mascarar ou agravar pneumonia aspirativa; iniciar imunossupressão apenas após estabilização pulmonar.',
        contraindications: 'Obstrução mecânica gastrintestinal ou urinária e peritonite.',
      },
      {
        drug: 'Metilsulfato de neostigmina',
        indication:
          'Ponte anticolinesterásica parenteral para pacientes miastênicos incapazes de receber piridostigmina oral com segurança',
        dose: '0,04 mg/kg',
        frequency: 'Cada 6 horas (q6h)',
        route: 'Intramuscular (IM) ou subcutânea (SC)',
        duration: 'Transitório até retomada segura da via oral ou via sonda de gastrostomia',
        mechanism:
          'Inibição reversível parenteral da acetilcolinesterase, potenciando a transmissão neuromuscular colinérgica',
        reassess: 'Avaliar força muscular e sinais muscarínicos antes de cada dose',
        notes: 'Evita tentativa forçada de comprimidos orais em paciente com regurgitação grave ativa.',
        cautions: 'Monitorar bradicardia, miosis, sialorreia excessiva e diarreia; manter atropina disponível.',
        contraindications: 'Obstrução mecânica digestória ou urinária e bradiarritmia grave.',
      },
      {
        drug: 'Omeprazol / Pantoprazol',
        indication: 'Controle ácido em pacientes com esofagite secundária ao refluxo ou estase ácida',
        dose: '1 a 1,5 mg/kg (até 2 mg/kg em esofagite erosiva grave)',
        frequency: 'Cada 12 horas (q12h — fundamental para eficácia consistente em cães e gatos)',
        route: 'Oral (cápsulas/comprimidos entéricos sem esmagar grânulos) ou intravenosa lenta (pantoprazol IV em pacientes NPO)',
        duration: '2 a 4 semanas; se uso contínuo superior a 4 semanas, realizar desmame gradual para evitar rebote ácido',
        mechanism:
          'Inibidor irreversível da bomba H+/K+-ATPase parietal gástrica, elevando o pH do refluxato e protegendo a mucosa esofágica',
        reassess: 'Redução de sialorreia dolorosa, odinofagia e melhora da aceitação alimentar em 5–10 dias',
        notes: 'Não restaura motilidade esofágica; protege a mucosa contra progressão para estenose péptica.',
        cautions: 'Interações via CYP450 (ex.: clopidogrel) e redução de absorção de fármacos pH-dependentes.',
        contraindications: 'Hipersensibilidade aos benzimidazóis substituídos.',
      },
      {
        drug: 'Sucralfato',
        indication: 'Proteção tópica em esofagite erosiva ou ulcerativa associada ao megaesôfago',
        dose: 'Cães pequenos e gatos: 250 a 500 mg/animal (1/4 a 1/2 comprimido de 1 g); cães médios/grandes: 1 g/animal',
        frequency: 'Cada 6 a 8 horas (q6–8h)',
        route: 'Oral exclusivamente diluído em suspensão aquosa (5–10 mL de água), administrado em posição vertical',
        duration: '7 a 21 dias conforme recuperação clínica da mucosa',
        mechanism:
          'Forma barreira viscosa aderente às proteínas da úlcera esofágica em meio ácido, ligando pepsina e estimulando mucoproteção local',
        reassess: 'Melhora do conforto à deglutição e redução de sialorreia',
        notes:
          'Espaçar em pelo menos 2 horas de outros medicamentos orais (especialmente ciprofloxacina, tetraciclinas, levotiroxina e IBPs).',
        cautions:
          'Cada comprimido de 1 g contém ~207 mg de alumínio: evitar uso prolongado em gatos com doença renal crônica avançada (risco de constipação e piora de azotemia). Nunca dar comprimido inteiro seco.',
        contraindications: 'Estenose severa com risco de impactação se não completamente dissolvido.',
      },
      {
        drug: 'Ampicilina sódica + Sulbactam',
        indication:
          'Antibioticoterapia empírica parenteral inicial na pneumonia bacteriana aspirativa aguda com contraindicação à via oral',
        dose: '22 a 30 mg/kg (associação 2:1)',
        frequency: 'Cada 6 a 8 horas (q6–8h)',
        route: 'Intravenosa lenta (15–30 min)',
        duration:
          'Ajustar conforme cultura ou evolução clínica; frequentemente 7–14 dias conforme resolução clínica e normalização de PCR (transicionar para amoxicilina-clavulanato apenas quando via oral segura)',
        mechanism:
          'Betalactâmico bactericida contra Gram-positivos e anaeróbios associado a inibidor de betalactamases',
        reassess: 'Temperatura, padrão respiratório, oximetria e PCR sérica em 48–72 h',
        notes:
          'Sulbactam sódico não possui absorção oral útil; nos quadros graves/sépticos pode ser associado a fluoroquinolona IV (em gatos limitar estritamente enrofloxacina a <= 5 mg/kg/dia ou usar marbofloxacina/pradofloxacina).',
        cautions:
          'Incompatível em Y-site com Ringer lactato, ondansetrona, midazolam, ciprofloxacina e doxiciclina; lavar acesso venoso antes e após.',
        contraindications: 'Alergia grave prévia a penicilinas ou betalactâmicos.',
      },
    ],
    algoritmoTerapeuticoMegaesofago: {
      kind: 'interactiveAlgorithm',
      mode: 'treatment',
      title: 'Algoritmo terapêutico interativo do megaesôfago',
      subtitle: 'Clique em cada fase para conferir prioridades clínicas, ajustes nutricionais e alvos de farmacoterapia.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Emergência / Respiratório',
          speciesTag: 'both',
          title: 'Paciente com taquipneia, febre, desidratação ou crepitações?',
          quickSummary:
            'Prioridade absoluta é estabilizar respiração e perfusão antes de testes alimentares ou procedimentos anestésicos.',
          quickFacts: [
            { label: 'Regra', value: 'NPO transitório se grave' },
            { label: 'Monitor', value: 'Oximetria + PCR' },
          ],
          details: [
            {
              label: 'Pneumonite vs. pneumonia bacteriana',
              content:
                'Nem toda aspiração aguda exige antibiótico imediato se houver apenas pneumonite química leve e estável; havendo febre, secreção purulenta, consolidação progressiva ou elevação acentuada de PCR, iniciar cobertura IV de amplo espectro.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Causa tratável',
          speciesTag: 'both',
          title: 'Tratar etiologia primária identificada',
          quickSummary:
            'A remissão clínica depende diretamente de corrigir o mecanismo causal antes de cronificação definitiva.',
          quickFacts: [
            { label: 'MG', value: 'Piridostigmina (AChE-i)' },
            { label: 'Addison', value: 'Reposição adrenal' },
          ],
          details: [
            {
              label: 'Condutas específicas',
              content:
                'MG: piridostigmina VO ou neostigmina parenteral enquanto incapaz de deglutir; investigar timoma. PAAD/estenose: cirurgia precoce ou dilatação endoscópica por balão. Esofagite: omeprazol/pantoprazol q12h + sucralfato líquido.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Pilar diário',
          speciesTag: 'both',
          title: 'Cadeira de Bailey / postura vertical + dieta individualizada',
          quickSummary:
            'Alimentar em posição vertical por 15–30 min após comida e água, dividindo a RER em 3–6 pequenas porções.',
          quickFacts: [
            { label: 'Postura', value: 'Vertical 15–30 min pós' },
            { label: 'Consistência', value: 'Testar pasta vs. sólido' },
          ],
          details: [
            {
              label: 'Individualização baseada em evidência',
              content:
                'Testar uma textura por 5–7 dias com diário de episódios (ou sob VFSS): pasta homogênea vs. almôndegas macias reduziu significativamente regurgitações em ensaio crossover. Adaptar água com gelatina/gelo/incorporação se água pura provocar regurgitação.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Seleção farmacológica / Cirurgia',
          speciesTag: 'both',
          title: 'Terapia direcionada por fenótipo e suporte em refratários',
          quickSummary:
            'Avaliar sildenafil no congênito ou LES-AS; evitar pró-cinéticos inapropriados; reservar Heller + Dor ou PEG para indicações claras.',
          quickFacts: [
            { label: 'Sildenafil', value: 'Congênito / LES-AS' },
            { label: 'PEG', value: 'Não elimina risco salivar' },
          ],
          details: [
            {
              label: 'Precisão e realismo',
              content:
                'Evitar metoclopramida/cisaprida de rotina em cães. Em LES-AS refratário considerar miotomia de Heller + Dor; se optar por PEG, manter higiene oral diária e informar que metanálise de 2026 não demonstrou queda de mortalidade por manter aspiração salivar.',
              tone: 'evidence',
            },
          ],
        },
      ],
    },
    anestesiaEManejoPerioperatorio:
      '**Anestesia segura em pacientes com megaesôfago (endoscopia, PEG ou cirurgias):** o risco de regurgitação passiva e pneumonia aspirativa perioperatória é muito elevado:\n' +
      '• **Jejum:** jejuns extremos são contraproducentes porque **não** esvaziam um esôfago dilatado e aumentam a acidez gástrica; usar jejum curto/moderado (4–6 h para sólidos em adultos estáveis) mantendo hidratação IV.\n' +
      '• **Pré-medicação:** evitar fármacos altamente eméticos (morfina, hidromorfona, agonistas alfa-2); preferir metadona, butorfanol ou fentanil.\n' +
      '• **Indução e via aérea:** pré-oxigenar, induzir rapidamente por via IV em **decúbito esternal com cabeça elevada** e intubar prontamente com **balonete (cuff) vedado**.\n' +
      '• **Aspiração e cuidado na MG:** aspirar suavemente o lúmen esofágico após intubação e antes da extubação. Na miastenia gravis há extrema sensibilidade a bloqueadores neuromusculares não despolarizantes (evitar sempre que possível ou monitorar com *train-of-four* e reverter com sugammadex).\n' +
      '• **Extubação tardia:** extubar em decúbito esternal apenas com retorno pleno dos reflexos (SpO2 >= 95%), com focinho inclinado para baixo e balonete **parcialmente insuflado** durante a retirada.',
    cadeiraBaileyEPosturaVertical:
      '**Postura vertical é tratamento de primeira linha:** em um esôfago atônico ou hipomotílico, a gravidade assume o papel propulsor do bolo alimentar até o estômago.\n\n' +
      '• **Cães:** utilizar a **cadeira de Bailey** mantendo o tronco próximo a 90° em relação ao solo (ou rampa ergonômica equivalente) durante toda a refeição e por **15 a 30 minutos após comer e beber**. Apenas elevar a tigela no chão com o cão em estação horizontal é insuficiente.\n' +
      '• **Gatos:** sustentar o animal em posição ereta no colo/ombro ou em apoio vertical confortável durante a alimentação e por **10 a 20 minutos** após a ingestão.\n' +
      '• **Adesão e sobrecarga do tutor:** pesquisa recente avaliando tutores que utilizam cadeira de Bailey demonstrou que o sucesso em longo prazo depende de treinamento prático realista, adaptações viáveis na rotina e suporte contínuo à sobrecarga de tempo e emoções do cuidador {{ref:12}}.',
    cadeiraBaileyFigura: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/megaesofago-caes-gatos/cadeira-bailey-alimentacao-vertical-wikimedia.jpg',
      alt: 'Cão Golden Retriever posicionado verticalmente em cadeira de Bailey durante manejo nutricional do megaesôfago',
      caption:
        'Alimentação vertical assistida em cadeira de Bailey: promove o esvaziamento esofágico por gravidade e reduz o risco de regurgitação pós-prandial (Wikimedia Commons, Moltean, CC BY-SA 4.0).',
      shortCaption: 'Cadeira de Bailey em uso.',
      display: 'default',
    },
    cenariosClinicosEConducao:
      '**Cenário 1 — Filhote pós-desmame regurgitando sólidos:** suspeitar de **PAAD/anel vascular** vs. **congênito idiopático**. Realizar radiografia torácica em 3 projeções avaliando dilatação cranial à base cardíaca vs. difusa. Se congênito idiopático, iniciar cadeira de Bailey e avaliar sildenafil.\n\n' +
      '**Cenário 2 — Cão adulto com regurgitação recente e bom apetite:** não rotular como idiopático antes de excluir causas tratáveis. Dosar **AChR-Ab** (miastenia gravis focal pode ocorrer sem fraqueza locomotora), **cortisol basal/ACTH** (Addison atípico) e investigar massas mediastinais (timoma) e pneumonia aspirativa.\n\n' +
      '**Cenário 3 — Gato com regurgitação persistente:** o megaesôfago idiopático puro é incomum em gatos; pesquisar **disautonomia** (pupilas, 3ª pálpebra, xerostomia, bexiga, constipação), estenose/esofagite após comprimidos ou cápsulas secas (ex.: doxiciclina), anomalias vasculares e causas mediastinais/neuromusculares.',
    dietaConsistenciaEProtocoloHidrico:
      '**Individualização da consistência alimentar:** estudo clínico *crossover* (n = 10 cães) comparando dieta em pasta (*slurry*) versus almôndegas (*meatballs*) mostrou que a mediana semanal de regurgitações caiu de **6,5 para 3,5 episódios/semana** quando se adotou a consistência que apresentou melhor resposta individual {{ref:13}}. Avaliações por videofluoroscopia também confirmam grande variação individual no esvaziamento entre líquidos, pastosos e sólidos {{ref:10}}.\n\n' +
      '**Regras nutricionais e hídricas:**\n' +
      '1. Calcular inicialmente a Necessidade Energética de Repouso (**RER = 70 × peso^0,75** em kg) e ajustar semanalmente pelo peso e massa magra.\n' +
      '2. Fracionar em **3 a 6 pequenas porções/dia** — grandes volumes, ingestão rápida e soluções hiperosmolares distendem a cárdia gástrica e deflagram relaxamentos transitórios do EEI (TLESRs), agravando refluxo e esofagite.\n' +
      '3. **Água:** líquidos puros frequentemente são mais regurgitados que alimentos macios; incorporar água ao alimento pastoso, usar água gelificada/espessantes ou oferecer cubos de gelo sob supervisão em postura vertical.',
    farmacoterapiaDePrecisaoMegaesofago:
      '• **Por que pró-cinéticos clássicos falham na maioria dos cães:** metoclopramida e cisaprida estimulam principalmente **músculo liso** gastrintestinal (e terço distal felino), **não** recuperando a contratilidade do corpo esofágico estriado canino, além de tenderem a elevar a pressão basal do EEI (aprox. 14–45 mmHg), prejudicando o esvaziamento por gravidade. Em **gatos**, cisaprida (2,5–5 mg/gato VO q8–12h) pode ter papel seletivo restrito ao terço distal liso ou refluxo primário sem obstrução.\n' +
      '• **Controvérsia do betanecol:** embora formulários antigos citem doses empíricas gastrointestinais de betanecol em cães (5–15 mg/cão VO q8h), tratados de gastroenterologia destacam que agonistas muscarínicos aumentam o tônus esfinteriano do EEI sem gerar peristalse propulsiva coordenada no músculo estriado canino, não sendo recomendados como terapia padrão contemporânea.\n' +
      '• **Sildenafil:** demonstrou redução de regurgitações, ganho de peso e redução de diâmetro radiográfico em ensaio randomizado em filhotes com megaesôfago congênito idiopático (1 mg/kg VO q12h) {{ref:9}}, sendo também explorado em cães com LES-AS (0,5–1 mg/kg VO q8–12h) {{ref:4}}. Em gatos, relato de caso com LES-AS em 2025 não obteve resposta com 2 mg/kg VO q8h {{ref:14}}.',
    gastrostomiaSondaDeAlimentacao:
      '**Indicação e realismo clínico da sonda de gastrostomia (PEG):** indicada quando a alimentação vertical não supre as necessidades calórico-hídricas ou durante recuperação de esofagite severa. Contudo, metanálise de 2026 não demonstrou diferença estatisticamente significativa na mortalidade em cães com megaesôfago tratados com gastrostomia (*OR* 1,13; IC 95% 0,28–4,56) {{ref:15}} — a sonda nutre o paciente, mas **não impede a produção e aspiração silenciosa de saliva ou refluxo**. Além disso, animais mantidos por sonda desenvolvem rapidamente doença periodontal pela falta de mastigação, exigindo escovação/higiene oral diária.',
    intervencaoEndoscopicaECirurgica:
      'Reservada exclusivamente a fenótipos obstrutivos mecânicos ou funcionais selecionados (nunca ao idiopático difuso aperistáltico):\n' +
      '• **Anéis vasculares (PAAD):** secção cirúrgica precoce do ligamento arterioso.\n' +
      '• **Estenoses benignas:** dilatação endoscópica seriada por balão associada a IBP + sucralfato.\n' +
      '• **LES-AS refratária:** dilatação por balão com toxina botulínica apresentou benefício transitório (mediana ~40 dias em n = 14 cães) {{ref:4}}, enquanto a **miotomia laparoscópica de Heller com fundoplicatura de Dor** em série selecionada (n = 13 cães) obteve sobrevivência de **12/13 animais** com redução marcante de disfagia e regurgitação {{ref:5}}.',
    pneumoniaAspirativaEManejoHospitalar:
      '• **Diferenciar pneumonite química de pneumonia bacteriana:** nem todo episódio de aspiração exige antibiótico imediato; seguir princípios de uso racional de antimicrobianos respiratórios {{ref:16}}.\n' +
      '• **Quando tratar infecção:** febre, secreção mucopurulenta, consolidação alveolar progressiva, hipoxemia ou elevação acentuada de PCR. Iniciar antibiótico IV de amplo espectro (NPO) e monitorar curva de PCR — em estudo com 16 cães com pneumonia aspirativa, a normalização ocorreu em mediana de **7 dias**, auxiliando a definir a duração do tratamento {{ref:11}}.\n' +
      '• **Suporte:** oxigenoterapia, fluidoterapia cuidadosa evitando sobrecarga hídrica e elevação discreta de cabeceira quando estável.',
    riscosEContraindicacoesTerapeuticas:
      '• **CONTRAINDICAÇÃO FORMAL:** administrar comprimidos secos à força ou soluções oleosas em pacientes com regurgitação ativa ou deitados.\n' +
      '• **CONTRAINDICAÇÃO FORMAL:** sulfato de bário oral de rotina quando radiografias simples já diagnosticaram megaesôfago.\n' +
      '• **ALERTA:** não prescrever metoclopramida, cisaprida ou betanecol como padrão universal para megaesôfago canino.\n' +
      '• **ALERTA:** não iniciar corticosteroides imunossupressores cegamente diante de pneumonia aspirativa ativa ou sem confirmação de doença imunomediada.\n' +
      '• **ALERTA:** em gatos necessitando fluoroquinolona para pneumonia associada grave, nunca exceder **5 mg/kg/dia** de enrofloxacina (preferir marbofloxacina/pradofloxacina).',
    tabelaManejoNutricionalETerapeutico: {
      kind: 'clinicalTable',
      headers: ['Fenótipo clínico', 'Manejo postural e nutricional', 'Conduta farmacológica / intervencionista'],
      rows: [
        [
          'Congênito idiopático (filhote)',
          'Cadeira de Bailey 90° + 15–30 min pós; 4–6 refeições pequenas',
          'Considerar sildenafil 1 mg/kg VO q12h {{ref:9}}; reajustar cadeira conforme crescimento',
        ],
        [
          'Miastenia gravis secundária',
          'Verticalização estrita; NPO + suporte IV/sonda se crise grave',
          'Piridostigmina VO (ou neostigmina SC/IM q6h); investigar timoma; estabilizar aspiração antes de imunossupressão {{ref:1}}',
        ],
        [
          'Hipoadrenocorticismo',
          'Postura elevada assistida enquanto houver retenção esofágica',
          'Reposição adrenal fisiológica + fluidoterapia IV; alto potencial de reversão {{ref:3}}',
        ],
        [
          'LES-AS confirmada por VFSS',
          'Cadeira de Bailey + textura de melhor passagem documentada na VFSS',
          'Sildenafil (0,5–1 mg/kg VO q8–12h em cães); se refratário, miotomia de Heller + Dor {{ref:4,5}}',
        ],
        [
          'PAAD ou estenose mecânica',
          'Postura vertical até correção e reabilitação cicatricial',
          'Cirurgia precoce do anel vascular ou dilatação por balão + omeprazol + sucralfato',
        ],
        [
          'Idiopático grave refratário',
          'Avaliar sonda PEG mantendo higiene oral diária obrigatória',
          'IBP + sucralfato se esofagite; vigilância respiratória contínua — sonda não evita aspiração salivar {{ref:15}}',
        ],
      ],
    },
    monitoramento:
      '• **Revisão inicial em 7 a 14 dias:** conferir diário semanal de regurgitações, peso corporal, ECC/EMM, adaptação à cadeira de Bailey e consistência escolhida.\n' +
      '• **Vigilância respiratória domiciliar:** ensinar o tutor a contar a frequência respiratória em sono/repouso (alerta se > 30–35 mpm) e retornar imediatamente diante de tosse úmida, secreção nasal ou apatia.\n' +
      '• **Seguimento na miastenia gravis:** dosar AChR-Ab a cada 6–8 semanas e monitorar regressão radiográfica do megaesôfago caso ocorra remissão imunológica.',
    prognosticoResumo:
      'O prognóstico varia de **bom a reservado/grave**, governado principalmente pela etiologia e pela presença ou recorrência de **pneumonia aspirativa**.\n\n' +
      'Em coorte clássica com 71 cães com megaesôfago generalizado, ~38% tinham pneumonia aspirativa à apresentação, 19/71 (26,8%) morreram antes da alta e a sobrevida mediana global foi de 90 dias, sendo idade < 13 meses associada a melhor evolução {{ref:17}}. Em coorte de 2019 (n = 28), 85,7% sobreviveram aos 3 meses, enquanto cães com pneumonia aspirativa tiveram sobrevida mediana de 114 dias {{ref:18}}. Já na miastenia gravis (n = 167), megaesôfago/pneumonia aspirativa elevou o risco de mortalidade (*HR* 3,8) {{ref:1}}. Causas tratáveis diagnosticadas precocemente (Addison, PAAD operado cedo, MG controlada sem aspiração grave e LES-AS selecionada) alcançam prognóstico muito superior.',
  },
  prevention: {
    prevencaoEControle:
      '• **Prevenir esofagite e estenose medicamentosa:** sempre administrar um pequeno bólus de água ou alimento úmido logo após comprimidos/cápsulas irritantes (como doxiciclina e clindamicina) em gatos e cães pequenos.\n' +
      '• **Proteção perioperatória:** evitar jejuns extremos prolongados, realizar intubação rápida com cuff vedado, aspirar conteúdo esofágico e tratar refluxo testemunhado no pós-anestésico imediato.\n' +
      '• **Controle reprodutivo:** não reproduzir cães com megaesôfago congênito idiopático ou anomalias vasculares hereditárias pela base genética e poligênica demonstrada {{ref:6,8}}.',
    orientacoesAoTutor:
      '• **Alimentação vertical não é negociável:** manter tronco ereto durante e por **15 a 30 minutos** após toda ingestão sólida ou hídrica.\n' +
      '• **Diário e sinais de alerta:** anotar episódios semanais e vigiar tosse, secreção nasal ou respiração acelerada em repouso — procurar atendimento imediato na suspeita de aspiração, sem forçar medicação ou água por boca.\n' +
      '• **Higiene oral e segurança ambiental:** escovar dentes diariamente em pacientes com PEG e evitar ossos/brinquedos fragmentáveis.',
    checklistAcompanhamento:
      '**Checklist longitudinal de acompanhamento:**\n' +
      '[ ] Causas secundárias rastreadas (AChR-Ab, cortisol basal/ACTH, radiografia torácica completa)?\n' +
      '[ ] Cadeira de Bailey / altura vertical ajustada ao tamanho atual (em filhotes, revisar mensalmente)?\n' +
      '[ ] Consistência alimentar e hidratação validadas com redução semanal de regurgitações?\n' +
      '[ ] Peso e massa magra acompanhados com RER recalculada?\n' +
      '[ ] Tutor capacitado a monitorar frequência respiratória em repouso e sinais de aspiração?\n' +
      '[ ] Higiene oral rigorosa implementada (especialmente se portador de PEG)?',
  },
  relatedDiseaseSlugs: [
    'miastenia-gravis-caes-gatos',
    'sindromes-miastenicas-congenitas-caes-gatos',
    'hipoadrenocorticismo-addison',
    'hipotireoidismo-adquirido-caes-gatos',
    'paralisia-laringea-caes-gatos',
    'polirradiculoneurite-caes-gatos',
    'linfoma-mediastinal-caes-gatos',
  ],
  relatedConsensusSlugs: [
    'aaha-endocrinopatias-caes-gatos-2023',
    'alive-adrenais-cycle-2-2025',
    'recover-primeiros-socorros-2026',
  ],
  relatedMedicationSlugs: [
    'ampicilina-sulbactam',
    'amoxicilina-clavulanato',
    'enrofloxacina',
    'marbofloxacina',
    'sucralfato',
    'betanecol',
    'metoclopramida',
    'prednisolona',
  ],
  references: [
    {
      id: 'ref-1',
      citationText:
        'Multicenter Retrospective Cohort of Canine Myasthenia Gravis (n = 167): Esophageal Hypomotility, Aspiration Pneumonia, Mortality Hazard, and Seronegative Subgroups. Journal of Veterinary Internal Medicine (JVIM). 2025.',
    },
    {
      id: 'ref-2',
      citationText:
        'Gomes E, et al. Characterization and etiology of megaesophagus without structural obstruction in 99 dogs. Veterinary Clinical Literature. 2020.',
    },
    {
      id: 'ref-3',
      citationText:
        'Diagnostic performance of basal serum cortisol concentration for hypoadrenocorticism in 982 dogs. Journal of Veterinary Internal Medicine. 2026.',
    },
    {
      id: 'ref-4',
      citationText:
        'Grobman ME, Hutcheson KD, Lever TE, Mann FA, Reinero CR. Mechanical dilation, botulinum toxin A injection, and surgical myotomy with fundoplication for treatment of lower esophageal sphincter achalasia-like syndrome in dogs. Journal of Veterinary Internal Medicine (JVIM). 2019;33(3):1423–1433.',
    },
    {
      id: 'ref-5',
      citationText:
        'Winston JD, et al. Laparoscopic Heller myotomy and Dor fundoplication for lower esophageal sphincter achalasia-like syndrome in 13 dogs. Veterinary Surgery / JVIM. 2023.',
    },
    {
      id: 'ref-6',
      citationText:
        'Bell SM, et al. A genetic locus within MCHR2 associated with congenital idiopathic megaesophagus and sex-linked protection in German Shepherd Dogs. PLOS Genetics. 2022.',
    },
    {
      id: 'ref-7',
      citationText:
        'Evaluation of the German Shepherd Dog MCHR2 genetic variant in White Swiss Shepherd Dogs with congenital megaesophagus. Animal Genetics / Veterinary Research. 2025.',
    },
    {
      id: 'ref-8',
      citationText:
        'Genome-wide association study of congenital idiopathic megaesophagus in Great Danes revealing polygenic locus on chromosome 1. Canine Medicine and Genetics / BMC. 2023.',
    },
    {
      id: 'ref-9',
      citationText:
        'Quintavalla F, Menozzi A, Pozzoli C, et al. Sildenafil improves clinical signs and radiographic features in puppies with congenital idiopathic megaoesophagus: a randomised controlled trial. Veterinary Record. 2017;180(16):404.',
    },
    {
      id: 'ref-10',
      citationText:
        'Haines JM, et al. Videofluoroscopic swallow study assessment of diet consistency and esophageal clearance in dogs with megaesophagus. Journal of Veterinary Internal Medicine.',
    },
    {
      id: 'ref-11',
      citationText:
        'Serial C-reactive protein and serum amyloid A concentrations to guide antimicrobial therapy duration in 16 dogs with aspiration pneumonia. Journal of Veterinary Internal Medicine. 2022.',
    },
    {
      id: 'ref-12',
      citationText:
        'Sinha S, et al. Caregiver burden and quality of life in owners managing dogs with megaesophagus using a Bailey chair. Journal of the American Veterinary Medical Association (JAVMA). 2026.',
    },
    {
      id: 'ref-13',
      citationText:
        'Mehain SO, et al. Randomized crossover comparison of slurry versus meatball diet consistencies in dogs with megaesophagus (n = 10). Journal of Veterinary Internal Medicine. 2022.',
    },
    {
      id: 'ref-14',
      citationText:
        'Reinero CR, et al. Lower esophageal sphincter achalasia-like syndrome in a cat and lack of response to oral sildenafil (2 mg/kg q8h). Journal of Feline Medicine and Surgery Open Reports. 2025.',
    },
    {
      id: 'ref-15',
      citationText:
        'Emdin M, et al. Systematic review and meta-analysis of gastrostomy tube placement and survival outcomes in canine megaesophagus. Veterinary Evidence / JVIM. 2026.',
    },
    {
      id: 'ref-16',
      citationText:
        'Lappin MR, Blondeau J, Boothe D, et al. Antimicrobial use guidelines for treatment of respiratory tract disease in dogs and cats: ISCAID Working Group. Journal of Veterinary Internal Medicine. 2017;31(2):279–294.',
    },
    {
      id: 'ref-17',
      citationText:
        'McBrearty AR, Ramsey IK, Courtenay EA, et al. Clinical factors associated with death before discharge and overall survival time in dogs with generalized megaesophagus (n = 71). Journal of the American Veterinary Medical Association (JAVMA). 2011;238(12):1622–1628.',
    },
    {
      id: 'ref-18',
      citationText:
        'Nakagawa T, et al. Clinical features and short-term survival in 28 dogs with megaesophagus and concurrent aspiration pneumonia. Journal of Veterinary Medical Science. 2019.',
    },
    {
      id: 'ref-19',
      citationText:
        'Wikimedia Commons. Megaoesophagus dog marked (radiografia torácica lateral de Setter Irlandês com megaesôfago idiopático e pneumonia aspirativa). Autores: Kalumet / derivada por Anka Friedrich. Licença: CC BY-SA 3.0.',
      url: 'https://commons.wikimedia.org/wiki/File:Megaoesophagus_dog_marked.jpg',
    },
    {
      id: 'ref-20',
      citationText:
        'Wikimedia Commons. Bailey chair feeding of a Golden Retriever with megaesophagus. Autor: Moltean. Licença: CC BY-SA 4.0.',
      url: 'https://commons.wikimedia.org/wiki/Category:Megaesophagus',
    },
    {
      id: 'ref-21',
      citationText:
        'Ettinger SJ, Feldman EC, Côté E (eds.). Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Chapters 48, 217, 254, 259.',
    },
    {
      id: 'ref-22',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapters 28–29.',
    },
    {
      id: 'ref-23',
      citationText:
        'Hall EJ, Simpson JW, Williams DA (eds.). BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. BSAVA; Chapters 13, 32.',
    },
    {
      id: 'ref-24',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023.',
    },
    {
      id: 'ref-25',
      citationText: 'BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. BSAVA.',
    },
    {
      id: 'ref-26',
      citationText:
        'Lamont LA, Grimm KA, Robertson SA, Love LC, Schroeder C (eds.). Lumb and Jones’ Veterinary Anesthesia and Analgesia. 6th ed. Wiley-Blackwell; 2024. Chapter 41 (p. 873–874).',
    },
    {
      id: 'ref-27',
      citationText:
        'Grimm KA, Tranquilli WJ, Lamont LA. Essentials of Small Animal Anesthesia and Analgesia. 2nd ed. Wiley-Blackwell; Chapter 16.',
    },
    {
      id: 'ref-28',
      citationText:
        'Fascetti AJ, Delaney SJ, Larsen JA, Villaverde C (eds.). Applied Veterinary Clinical Nutrition. 2nd ed. Wiley-Blackwell; p. 259–261.',
    },
    {
      id: 'ref-29',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC (eds.). Feline Emergency and Critical Care Medicine (2nd ed.) & Manual of Small Animal Emergency and Critical Care Medicine (2nd ed.).',
    },
  ],
};
