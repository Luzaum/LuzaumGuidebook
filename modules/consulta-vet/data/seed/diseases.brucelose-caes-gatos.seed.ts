import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const bruceloseCaesGatosRecord: DiseaseRecord = {
  id: 'disease-brucelose-caes-gatos',
  slug: 'brucelose-caes-gatos',
  title: 'Brucelose em cães e gatos',
  subtitle:
    'Doença bacteriana infecciosa, sistêmica, crônica e zoonótica causada em cães sobretudo por Brucella canis (associada a infertilidade, abortamento, epididimite, uveíte e discospondilite), sendo a infecção natural em gatos excepcional e ainda pouco caracterizada.',
  synonyms: [
    'Brucelose canina',
    'Brucelose felina',
    'Infecção por Brucella canis',
    'Aborto infeccioso por Brucella',
    'Discospondilite por Brucella canis',
    'Epididimite e orquite por Brucella',
  ],
  species: ['dog', 'cat'],
  category: 'infectologia',
  categories: [
    'infectologia',
    'reproducao',
    'neurologia',
    'ortopedia',
    'oftalmologia',
    'saude-publica',
    'clinica-medica',
  ],
  tags: [
    'Cães e Gatos',
    'Brucella canis',
    'Zoonose',
    'LPS Rugoso',
    'Discospondilite',
    'Abortamento',
    'Epididimite',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['brucelose-caes-gatos'],

  quickSummary:
    'Infecção bacteriana intracelular e zoonótica causada principalmente por Brucella canis em cães, capaz de persistir em órgãos reprodutivos, próstata, olhos, linfonodos e coluna vertebral mesmo sem febre ou alterações no hemograma. O diagnóstico exige sorologia específica para antígeno rugoso (testes bovinos comuns falham), PCR e cultura com aviso de risco biológico ao laboratório; não há garantia de cura microbiológica completa mesmo com castração e antibióticos.',

  quickDecisionStrip: [
    'Castrados também adoecem: ausência de histórico reprodutivo não exclui brucelose, especialmente diante de discospondilite ou uveíte.',
    'Febre e alteração de hemograma frequentemente estão ausentes na infecção crônica.',
    'Sorologia negativa não descarta o quadro: existe janela imunológica (2–12 semanas) e testes para brucelas lisas (bovinas) falham em B. canis.',
    'Cultura ou PCR negativas não provam cura: a presença bacteriana no sangue e a eliminação são intermitentes.',
    'É uma zoonose relevante: sêmen, secreções genitais e restos de abortamento exigem EPI e notificação ao laboratório antes do cultivo.',
    'O gato é diferente: infecção natural é excepcional — não extrapole automaticamente a doença canina aos felinos.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'Na condução clínica da brucelose, o conceito central é distinguir quatro desfechos que não se equivalem: ==melhora dos sinais clínicos, negativação de PCR, queda de títulos sorológicos e cura bacteriológica estéril==. Orientações de agências sanitárias internacionais e revisões veterinárias reforçam que ==a infecção canina pode persistir após antibióticos e castração==, tornando obrigatória a gestão contínua do risco zoonótico {{ref:ref-cdc-2024}} {{ref:ref-apha-2025}} {{ref:ref-santos-2021}}.',
    leadHighlights: [
      'melhora dos sinais clínicos, negativação de PCR, queda de títulos sorológicos e cura bacteriológica estéril',
      'a infecção canina pode persistir após antibióticos e castração',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico — Suspeita de Brucelose',
      steps: [
        {
          label: '1. Suspeita clínica e biossegurança imediata',
          timing: 'Na admissão',
          detail:
            'Investigar abortamento, infertilidade, aumento epididimário, dor vertebral crônica ou uveíte, sem excluir cães castrados; instituir luvas, avental e proteção ocular antes de manipular secreções.',
        },
        {
          label: '2. Sorologia específica para Brucella canis (LPS rugoso)',
          timing: 'Triagem inicial',
          detail:
            'Solicitar sorologia específica (como 2ME-RSAT, imunodifusão AGID II ou multiplex/ELISA validado); jamais usar testes padrão de brucelose bovina (LPS liso) para descartar B. canis.',
        },
        {
          label: '3. Confirmação e repetição na janela imunológica',
          timing: '3 a 4 semanas (se negativo recente)',
          detail:
            'Confirmar toda triagem positiva com teste de maior especificidade; diante de exposição recente ou forte suspeita clínica com resultado negativo inicial, repetir em 3–4 semanas.',
        },
        {
          label: '4. PCR, cultura habilitada e avaliação de órgãos-alvo',
          timing: 'Apoio etiológico e imagem',
          detail:
            'Associar PCR e cultura (avisando expressamente o laboratório sobre suspeita de Brucella), radiografia/RM da coluna em dor axial ou ultrassonografia reprodutiva conforme o quadro.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico e Sanitário',
      steps: [
        {
          label: '1. Interrupção imediata da transmissão',
          timing: 'Conduta prioritária',
          detail:
            'Proibir reprodução definitivamente, separar de outros cães, controlar resíduos/secreções infectantes, rastrear contactantes e orientar a família sobre riscos zoonóticos.',
        },
        {
          label: '2. Manejo dirigido ao órgão afetado',
          timing: 'Conforme apresentação',
          detail:
            'Analgesia e avaliação neurológica na discospondilite; manejo oftalmológico prioritário na uveíte; investigar metrite/retenção uterina em abortamento complicado; corrigir perfusão somente se houver instabilidade real.',
        },
        {
          label: '3. Esterilização cirúrgica e discussão crítica de antibióticos',
          timing: 'Decisão individualizada',
          detail:
            'Castração (com EPI completo na cirurgia) reduz fontes genitais de eliminação bacteriana, mas não garante esterilização de próstata/baço/osso; antibióticos combinados exigem monitoramento renal e hepático.',
        },
        {
          label: '4. Vigilância vitalícia e comunicação sanitária',
          timing: 'Seguimento contínuo',
          detail:
            'Acompanhar separadamente resposta clínica, imagem e exames microbiológicos seriados, comunicando serviços de saúde/defesa sanitária conforme normas vigentes.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Consulta rápida (60 segundos) — Pontos decisivos na brucelose',
      headers: ['Pergunta clínica', 'Conduta objetiva baseada em evidência'],
      rows: [
        [
          'Teste bovino negativo exclui B. canis?',
          '==Não.== *B. canis* possui parede celular rugosa (sem cadeia O típica) e escapa dos testes de antígeno liso usados em bovinos {{ref:ref-santos-2021}}.',
        ],
        [
          'Cão jovem castrado com dor cervical pode ter?',
          '==Sim.== Cães com discospondilite por *B. canis* costumam ser jovens, sem histórico reprodutivo, frequentemente sem febre nem neutrofilia {{ref:ref-moeller-2025}}.',
        ],
        [
          'Sorologia ou hemocultura negativas descartam?',
          '==Não isoladamente.== Anticorpos demoram 2 a 12 semanas para surgir e a bactéria no sangue é intermitente; repetir em 3–4 semanas se suspeita alta.',
        ],
        [
          'Antibiótico e castração curam?',
          'Reduzem carga bacteriana e sinais clínicos, mas ==não garantem erradicação microbiológica== — manter cuidados sanitários contínuos {{ref:ref-cdc-2024}} {{ref:ref-apha-2025}}.',
        ],
        [
          'E nos gatos?',
          'Infecção é excepcional e sem protocolo específico validado; investigar causas comuns primeiro e considerar *Brucella* em exposições rurais diretas {{ref:ref-wareth-2017}}.',
        ],
      ],
    },
  },

  etiology: {
    brucAgentesELpsRugoso:
      'As bactérias do gênero *Brucella* são ==cocobacilos Gram-negativos pequenos, imóveis, aeróbios e intracelulares facultativos== (família *Brucellaceae*). A capacidade de sobreviver e se multiplicar dentro de células do próprio sistema imune explica sua evolução arrastada, a resistência à erradicação completa por antibióticos e a frequência de exames sanguíneos negativos mesmo com infecção ativa.\n\n' +
      '- ==Lipopolissacarídeo (LPS) rugoso de *B. canis*==: na membrana externa das Gram-negativas, espécies como *B. abortus* e *B. melitensis* exibem uma longa cadeia externa de açúcar chamada **antígeno O (LPS liso)**. Já *Brucella canis* e *B. ovis* são naturalmente **rugosas**, pois não possuem essa cadeia O externa. Como testes rotineiros de brucelose bovina detectam anticorpos contra o antígeno O liso, ==cães infectados por *B. canis* dão resultado negativo nesses testes convencionais== {{ref:ref-santos-2021}}.',
    brucTabelaEspeciesBrucella: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Principais espécies de Brucella e relevância em cães e gatos',
      headers: ['Espécie', 'Hospedeiro preferencial', 'Relevância clínica em cães e gatos'],
      rows: [
        [
          'Brucella canis',
          'Cães e outros canídeos',
          'Principal agente da brucelose canina (LPS rugoso).',
        ],
        [
          'Brucella abortus',
          'Bovinos',
          'Infecção ocasional em cães em áreas rurais; já isolada também em gata em propriedade leiteira {{ref:ref-wareth-2017}}.',
        ],
        [
          'Brucella suis',
          'Suínos',
          'Infecção canina associada sobretudo a contato ou caça envolvendo suínos e seus tecidos.',
        ],
        [
          'Brucella melitensis',
          'Ovinos e caprinos',
          'Infecções raras em cães com convívio próximo a pequenos ruminantes.',
        ],
        [
          'Brucella ovis',
          'Ovinos',
          'Relevante em estudos antigênicos e pesquisa vacinal experimental, não como causa habitual em cães.',
        ],
      ],
    },
    brucFiguraCulturaCdc: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/brucelose-caes-gatos/cdc-phil-17125-brucella-canis.jpg',
      alt: 'Colônias bacterianas de Brucella canis cultivadas em placa de ágar chocolate',
      shortCaption: 'Fig. 1 — Colônias de Brucella canis em ágar chocolate (CDC PHIL #17125).',
      caption:
        'Figura 1 — Crescimento colonial de *Brucella canis* em meio ágar chocolate após incubação laboratorial. Permite reconhecer o aspecto macroscópico das colônias sem confirmar isoladamente a espécie. Alerta: o cultivo de *Brucella* exige laboratório devidamente habilitado e informado previamente; não deve ser improvisado em rotina clínica comum pelo alto risco de infecção laboratorial por aerossóis. Fonte: Centers for Disease Control and Prevention (CDC), Public Health Image Library #17125 (Todd Parker, Domínio público).',
      display: 'default',
    },
  },

  epidemiology: {
    brucDistribuicaoMetaAnaliseEFatores:
      'A brucelose canina tem distribuição mundial, inclusive no Brasil. Em meta-análise global de 2025 avaliando 175.675 amostras caninas (134 estudos), Dadar et al. estimaram prevalência combinada de ==7,96% (IC 95%: 7,03–8,94%)==, mas com heterogeneidade extrema (*I²* > 96%) por diferenças de população, critério diagnóstico e método empregado — portanto, ==esse percentual não representa a prevalência em qualquer hospital ou município brasileiro== {{ref:ref-dadar-2025}}.\n\n' +
      'Não existe predisposição racial genética confirmada, e ==a castração prévia não confere proteção absoluta contra aquisição ou persistência da doença==.',
    brucTabelaFatoresRisco: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Fatores associados à exposição e risco epidemiológico',
      headers: ['Fator de exposição', 'Mecanismo de risco'],
      rows: [
        [
          'Acasalamento sem triagem sanitária',
          'Exposição direta a sêmen e secreções genitais contaminadas.',
        ],
        [
          'Canis, criatórios e abrigos superlotados',
          'Aumento de contato contínuo com secreções e aerossóis ambientais.',
        ],
        [
          'Cães errantes ou introdução sem quarentena',
          'Entrada silenciosa de portadores assintomáticos em grupos suscetíveis.',
        ],
        [
          'Contato com material de parto ou abortamento',
          'Exposição à maior concentração bacteriana da doença.',
        ],
        [
          'Circulação regional/internacional de cães',
          'Introdução do agente em populações antes livres.',
        ],
        [
          'Ambiente rural e contato com rebanhos',
          'Amplia risco de infecção por B. abortus, B. suis ou B. melitensis.',
        ],
      ],
    },
    brucCenarioBrasileiroEGatos:
      '- ==Brasil (separar brucelose canina de bovina)==: o Programa Nacional de Controle e Erradicação da Brucelose e Tuberculose Animal (PNCEBT) volta-se a bovinos e bubalinos com testes para *B. abortus* (LPS liso), que ==não devem ser transpostos para descartar *B. canis*==. Diante de suspeita em cães, consultar órgãos estaduais de defesa sanitária e vigilância em saúde para conduta de notificação e investigação de contactantes {{ref:ref-mapa-pncebt}} {{ref:ref-conitec-pcdt-2025}}.\n' +
      '- ==Brucelose felina — equilíbrio científico==: deve-se evitar tanto afirmar que gatos nunca se infectam quanto presumir doença idêntica à do cão. Em São Paulo, Larsson et al. (1984) testaram 134 gatos e encontraram sororreatividade em 4 animais (3%), sem nenhum isolamento bacteriano {{ref:ref-larsson-1984}}. Já Wareth et al. (2017) isolaram ==*Brucella abortus* biovar 1== em secreção uterina de uma cadela e uma gata em propriedade leiteira {{ref:ref-wareth-2017}}. Logo, gatos podem sofrer infecção ocasional (sobretudo em exposição rural a *B. abortus*), mas não possuem síndrome endêmica documentada por *B. canis*.',
  },

  pathogenesisTransmission: {
    brucViasTransmissao:
      'As principais rotas de entrada ocorrem pelas mucosas ==oronasal, conjuntival e genital== (além da via transplacentária), mediante contato com sêmen, secreções vaginais pós-aborto, placenta, fetos, urina, leite e outras secreções contaminadas. Embora a transmissão sexual seja clássica, o contato não sexual com urina e secreções explica casos em cães virgens e castrados.\n\n' +
      'A brucelose ==não depende de vetores artrópodes== (não é transmitida habitualmente por pulgas, carrapatos ou mosquitos). Em gatos, a transmissão natural de *B. canis* permanece mal caracterizada, predominando o risco de exposição a espécies de rebanho em áreas rurais.',
  },

  pathophysiology: {
    brucFisiologiaReprodutivaNormal:
      'Para entender as lesões clássicas, vale recordar o trajeto reprodutivo normal:\n\n' +
      '- ==No macho==: os espermatozoides nascem nos túbulos seminíferos dos testículos, amadurecem e ganham capacidade de fertilização ao longo do ==epidídimo== (dividido em cabeça, corpo e cauda) e, na ejaculação, seguem pelo ducto deferente recebendo secreções da próstata. Por isso, inflamação no epidídimo compromete a fertilidade antes mesmo de destruir os testículos.\n' +
      '- ==Na fêmea==: a gestação depende do útero saudável, da troca materno-fetal através da placenta zonária canina e da progesterona produzida pelos corpos lúteos; inflamação e necrose placentária cortam oxigênio e nutrientes ao feto, levando à morte embrionária ou abortamento.',
    brucFisiopatogeniaMolecular:
      'Após contato oral, nasal, conjuntival, genital ou por solução de continuidade, a bactéria atravessa a mucosa provocando reação inflamatória inicial branda.\n\n' +
      '- ==Sobrevivência dentro dos macrófagos==: normalmente, quando um macrófago engloba uma bactéria, a vesícula digestiva (fagossomo) acidifica e funde-se ao lisossomo para destruí-la. Espécies de *Brucella* utilizam um ==sistema de secreção do tipo IV (codificado pelo operon *virB*)== para redirecionar o tráfego intracelular e criar um nicho protegido próximo ao retículo endoplasmático, evitando a destruição (parte desse detalhamento molecular provém de estudos em outras espécies do gênero, conforme revisado por Santos et al., 2021) {{ref:ref-santos-2021}}.\n' +
      '- ==Disseminação linfática e bacteremia intermitente==: da porta de entrada, a bactéria alcança linfonodos regionais e cai na circulação sanguínea por períodos prolongados ou intermitentes, colonizando próstata, epidídimos, testículos, útero, placenta, baço, discos vertebrais e olhos.\n' +
      '- ==Consequência prática==: o microrganismo permanece vivo mesmo sem bacteremia detectável no momento da coleta e em locais onde nem todos os antibióticos alcançam concentração esterilizante, gerando recaídas após o término do tratamento.',
    brucFisiopatologiaFemeaMachoEDiscospondilite:
      '- ==Na cadela (abortamento e perdas)==: após bacteremia e invasão da placenta, ocorrem necrose e déficit vascular materno-fetal — frequentemente entre ==45 e 59 dias de gestação==, embora perdas precoces causem morte embrionária e reabsorção confundidas com infertilidade. A cadela comumente ==não apresenta febre== porque a inflamação concentra-se na unidade uteroplacentária, eliminando grande carga bacteriana na secreção vaginal por 4 a 6 semanas após o abortamento.\n' +
      '- ==No cão macho (epididimite, orquite e prostatite)==: a inflamação epididimária causa dor, edema e fibrose obstrutiva; com a ruptura da barreira sangue-testículo, formam-se anticorpos antiespermatozoides que agravam a infertilidade mesmo após redução da fase aguda. Surgem dermatite escrotal por lambedura, ==piospermia (3 a 4 meses pós-infecção)==, pico de eliminação no sêmen aos 2–3 meses e eliminação urinária prolongada pela proximidade com a próstata infectada, culminando em atrofia testicular crônica (fotografias clínicas históricas do aparelho reprodutor encontram-se listadas nas referências externas finais {{ref:ref-drost-shille}}).\n' +
      '- ==Na coluna vertebral (discospondilite)==: a infecção chega pelo sangue ao disco intervertebral e às placas terminais dos corpos vertebrais adjacentes, causando reabsorção óssea e inflamação local. Déficits neurológicos só aparecem se houver extensão epidural ou compressão medular, explicando por que cães podem sentir dor cervical ou lombar por meses preservando a marcha.',
  },

  clinicalSignsPathophysiology: {
    brucFormasClinicas:
      'Embora útil para raciocínio clínico (sem constituir estadiamento formal validado), a apresentação divide-se em: ==infecção inicial== (bacteremia e linfonodos aumentados com sinais discretos), ==subclínica== (animal aparentemente normal mantendo eliminação), ==reprodutiva== (perdas gestacionais, epididimite e prostatite), ==crônica focal== (dor na coluna, claudicação ou uveíte muito tempo após a exposição) e ==complicada== (déficit neurológico, ameaça à visão ou metrite pós-aborto).',
    brucTabelaSinaisPorSistema: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Sinais clínicos por sistema acometido e mecanismos',
      headers: ['Sistema', 'Achados clínicos', 'Mecanismo e relevância'],
      rows: [
        [
          'Reprodutivo (fêmea)',
          'Falha de concepção aparente, reabsorção embrionária, abortamento tardio e natimortos',
          'Placentite e prejuízo vascular materno-fetal; frequentemente sem febre.',
        ],
        [
          'Reprodutivo (macho)',
          'Epididimite, dor testicular, dermatite escrotal por lambedura e atrofia testicular crônica',
          'Inflamação ductal, lesão espermática e anticorpos antiespermatozoides.',
        ],
        [
          'Próstata e urinário',
          'Prostatite e eliminação urinária intermitente',
          'Colonização prostática persistente mesmo em animais fora da cobertura.',
        ],
        [
          'Osteoarticular e neurológico',
          'Dor cervical, toracolombar ou lombossacra; paresia ou ataxia em casos complicados',
          'Inflamação e destruição óssea das placas terminais vertebrais e discos (discospondilite).',
        ],
        [
          'Ocular',
          'Uveíte anterior, coriorretinite, dor ocular e cegueira secundária',
          'Colonização intraocular ou inflamação imunomediada.',
        ],
        [
          'Linforreticular e sistêmico',
          'Aumento de linfonodos e baço, apatia e perda de peso discreta',
          'Persistência intracelular em tecidos linfoides; febre costuma faltar.',
        ],
        [
          'Neonatal',
          'Filhotes fracos e mortalidade perinatal',
          'Infecção intrauterina disseminada e insuficiência placentária {{ref:ref-desouza-2018}}.',
        ],
      ],
    },
    brucFiguraDiscospondiliteBuhmann: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/brucelose-caes-gatos/buhmann-2019-discospondilite-cervical.webp',
      alt: 'Radiografia lateral e ressonância magnética sagital T2 da coluna cervical de cão com discospondilite por Brucella canis',
      shortCaption: 'Fig. 2 — Discospondilite cervical (C4–C5 e C5–C6) por B. canis em radiografia e RM (Buhmann et al., 2019).',
      caption:
        'Figura 2 — Discospondilite cervical associada a *Brucella canis*: na radiografia lateral (A) observam-se destruição das placas terminais vertebrais de C4–C5 e neoformação óssea periférica; na ressonância magnética ponderada em T2 (B), nota-se hipersinal inflamatório nos espaços C4–C5 e C5–C6 com estreitamento discal. A imagem localiza a discospondilite, mas não identifica o agente causal isoladamente, exigindo pesquisa etiológica específica. Fonte: Buhmann et al. (2019), Frontiers in Veterinary Science 6:151 (CC BY 4.0).',
      display: 'default',
    },
    brucAchadoRecenteMoeller2025:
      'Um achado clínico fundamental do estudo caso-controle multicêntrico de Moeller et al. (2025) comparando 15 cães com discospondilite por *B. canis* e 25 controles com outras causas mudou a triagem no consultório:\n\n' +
      '- ==Cães mais jovens e sem sinais sistêmicos==: a idade mediana foi significativamente menor (2,6 vs. 5,7 anos), com maior chance de lesão cervical alta C2–C5 (OR 13,0) e multifocal (OR 12,0), porém ==chance muito menor de déficits neurológicos (OR 0,03) e de neutrofilia no hemograma (OR 0,11)== {{ref:ref-moeller-2025}}.\n' +
      '- ==Implicação prática==: um cão jovem (inclusive castrado), afebril, sem alteração leucocitária e apenas com dor vertebral crônica merece investigação para *B. canis*.',
    findingsBySystem: [
      {
        system: 'reproductive',
        findings: [
          {
            finding: 'Abortamento entre 45–59 dias, reabsorção embrionária, secreção vaginal prolongada, epididimite e atrofia testicular',
            mechanism: 'Placentite bacteriana e inflamação epididimária granulomatosa com autoanticorpos.',
            clinicalMeaning: 'Sinal clássico de alerta reprodutivo; material abortado oferece altíssimo risco zoonótico.',
          },
        ],
      },
      {
        system: 'musculoskeletal',
        findings: [
          {
            finding: 'Dor cervical ou lombossacra crônica e claudicação (frequentemente sem febre)',
            mechanism: 'Colonização hematógena das placas terminais vertebrais e discos intervertebrais.',
            clinicalMeaning: 'Investigar discospondilite por B. canis inclusive em cães jovens castrados {{ref:ref-long-2022}} {{ref:ref-moeller-2025}}.',
          },
        ],
      },
      {
        system: 'ocular',
        findings: [
          {
            finding: 'Uveíte anterior, coriorretinite e risco de glaucoma secundário',
            mechanism: 'Persistência bacteriana intraocular e reação inflamatória mediada por imunocomplexos.',
            clinicalMeaning: 'Exige avaliação oftálmica rápida para preservar visão e investigação sorológica específica.',
          },
        ],
      },
      {
        system: 'neurologic',
        findings: [
          {
            finding: 'Déficits proprioceptivos, paresia ou ataxia em discospondilite complicada',
            mechanism: 'Extensão inflamatória epidural, instabilidade ou compressão medular.',
            clinicalMeaning: 'Indica avaliação neurológica seriada e ressonância magnética para decidir conduta descompressiva.',
          },
        ],
      },
    ],
    physicalExamFindings: [
      'Reprodutivo masculino: palpar separadamente epidídimo (cabeça, corpo e cauda em busca de aumento e dor) e testículos (consistência e simetria), além de avaliar próstata quando indicado.',
      'Reprodutivo feminino: checar presença de secreção vaginal, sinais de retenção fetal pós-aborto e histórico completo de perdas precoces.',
      'Coluna e neurológico: palpação segmentar cuidadosa da coluna cervical, toracolombar e lombossacra, somada a avaliação de marcha, reações posturais e reflexos espinhais.',
      'Ocular e geral: buscar vermelhidão ocular, sensibilidade à luz, opacidade intraocular, linfonodos aumentados e temperatura (lembrando que ausência de febre é comum).',
    ],
    particularidadesCaninasEFelinas:
      '- Cães: principal hospedeiro clínico de *B. canis*, desenvolvendo doença reprodutiva, osteoarticular (discospondilite), ocular ou estado portador assintomático persistente.\n' +
      '- Gatos: casos naturais são raros e insuficientemente caracterizados para definir uma síndrome felina clássica por *B. canis*; em cenários rurais próximos a bovinos, considerar possibilidade rara de infecção por *B. abortus* antes de extrapolar condutas caninas {{ref:ref-larsson-1984}} {{ref:ref-wareth-2017}}.',
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico passo a passo — Da suspeita à investigação segura',
      subtitle: 'Expanda cada etapa para alinhar escolhas sorológicas, janela imunológica, PCR, cultura e imagem.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Admissão · Suspeita e EPI',
          speciesTag: 'both',
          title: 'Reconhecer a suspeita e instituir biossegurança antes da coleta',
          quickSummary:
            'Considere brucelose diante de abortamento, epididimite, uveíte ou discospondilite — inclusive em cães castrados — e vista luvas, avental e proteção ocular antes de coletar materiais.',
          quickFacts: [
            { label: 'Perfil frequente', value: 'Cão jovem, afebril e sem leucocitose' },
            { label: 'Proteção imediata', value: 'Evitar contato mucoso e aerossóis' },
          ],
          details: [
            {
              label: 'Armadilha da castração prévia',
              content:
                'Excluir brucelose apenas porque o paciente é castrado ou nunca cruzou atrasa frequentemente o diagnóstico da discospondilite por B. canis {{ref:ref-moeller-2025}}.',
              tone: 'danger',
            },
            {
              label: 'Proteção da equipe e de contactantes',
              content:
                'Restrinja circulação de secreções, identifique outros cães e pessoas expostas e sinalize suspeita no prontuário antes de enviar amostras {{ref:ref-cdc-2024}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Triagem · Sorologia específica',
          speciesTag: 'dog',
          title: 'Solicitar sorologia direcionada a B. canis (antígeno rugoso)',
          quickSummary:
            'Escolha ensaios validados para antígeno rugoso (como 2ME-RSAT, multiplex ou ELISA validado), evitando testes de triagem bovina desenhados para brucelas lisas.',
          quickFacts: [
            { label: 'Teste bovino liso', value: 'Não detecta B. canis' },
            { label: 'Triagem rápida', value: 'Desempenho varia muito entre kits' },
          ],
          details: [
            {
              label: 'Diferença dramática entre testes rápidos',
              content:
                'Comparação publicada em 2026 mostrou que alguns testes rápidos tiveram boa concordância positiva (90–100%), enquanto outro kit falhou em reconhecer todos os soros positivos testados (0%) — confira a validação do kit antes de confiar no resultado {{ref:ref-atkins-2026}}.',
              tone: 'evidence',
            },
            {
              label: 'Reações cruzadas e valor preditivo',
              content:
                'Na triagem em populações com baixa prevalência (ex.: 1%), até um bom teste gera maioria de positivos falsos (VPP ~15% apesar de VPN ~99,9%); toda triagem positiva precisa de confirmação {{ref:ref-guarino-2025}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Confirmação · Janela imunológica',
          speciesTag: 'dog',
          title: 'Confirmar resultados positivos e repetir negativos suspeitos',
          quickSummary:
            'Confirme triagens positivas com métodos mais específicos (como imunodifusão AGID II com antígeno citoplasmático ou painel multiplex validado) e repita testes negativos precoces.',
          quickFacts: [
            { label: 'Janela de anticorpos', value: '2 a 12 semanas após infecção' },
            { label: 'Intervalo de repetição', value: '3 a 4 semanas' },
          ],
          details: [
            {
              label: 'Nunca decida conduta irreversível com triagem única',
              content:
                'Resultados positivos em testes de aglutinação simples podem ocorrer por reação cruzada com outras bactérias; confirme sempre antes de decisões definitivas.',
              tone: 'danger',
            },
            {
              label: 'Negativo recente em cão exposto',
              content:
                'Como os anticorpos levam semanas para se elevar, um exame negativo logo após o contato exige repetição em 3–4 semanas ou combinação com pesquisa direta.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Pesquisa direta · Risco laboratorial',
          speciesTag: 'both',
          title: 'Combinar PCR e cultura apenas com aviso obrigatório ao laboratório',
          quickSummary:
            'PCR detecta DNA bacteriano (mesmo morto) e cultura recupera bactérias viáveis — mas toda remessa para cultura exige notificação prévia da suspeita de Brucella.',
          quickFacts: [
            { label: 'Hemocultura negativa', value: 'Não exclui (bacteremia intermitente)' },
            { label: 'Biossegurança', value: 'Não cultivar em rotina comum' },
          ],
          details: [
            {
              label: 'Prevenção de exposição ocupacional no laboratório',
              content:
                'Cultivo inadvertido sem câmara de contenção adequada é causa conhecida de brucelose humana adquirida em laboratório; avise expressamente o laboratório receptor {{ref:ref-cdc-2024}} {{ref:ref-apha-2025}}.',
              tone: 'danger',
            },
            {
              label: 'Limites da PCR negativa',
              content:
                'Amostragem de tecido sem eliminação momentânea, baixa concentração bacteriana ou inibidores podem gerar falso negativo; combine múltiplas amostras quando indicado.',
              tone: 'default',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Órgãos-alvo · Imagem',
          speciesTag: 'both',
          title: 'Localizar lesões vertebrais ou reprodutivas por imagem e integrar achados',
          quickSummary:
            'Em dor vertebral, obtenha radiografias de toda a coluna (e TC/RM se necessário), sabendo que a imagem aponta discospondilite mas não define sozinha o agente.',
          quickFacts: [
            { label: 'Radiografia vertebral', value: 'Pode atrasar semanas frente à dor' },
            { label: 'Padrão lítico', value: 'Não exclusivo de B. canis' },
          ],
          details: [
            {
              label: 'Lesões multifocais e atraso radiográfico',
              content:
                'Como múltiplos discos frequentemente são afetados e alterações ósseas levam semanas para aparecer no raio X, considere estudo completo da coluna e ressonância magnética precoce diante de dor intensa ou déficit neurológico {{ref:ref-long-2022}} {{ref:ref-moeller-2025}}.',
              tone: 'evidence',
            },
            {
              label: 'Conduta diferenciada em gatos',
              content:
                'Nos felinos, investigue primeiramente agentes comuns de abortamento, dor vertebral ou uveíte; reserve investigação específica de Brucella para exposição rural relevante ou isolamento sugestivo {{ref:ref-wareth-2017}}.',
              tone: 'tip',
            },
          ],
        },
      ],
    },
    brucSorologiaDesempenhoEPreditivos:
      'A investigação tem um desafio central: ==nenhum exame isolado tem sensibilidade e especificidade perfeitas em todas as fases==. Sorologia mede anticorpos, PCR detecta DNA e cultura demonstra bactéria viva — cada método responde a uma pergunta diferente.\n\n' +
      '- ==Principais técnicas sorológicas==: o teste rápido de aglutinação em placa (**RSAT**) é simples, porém sujeito a falsos positivos por reação cruzada; adicionar **2-mercaptoetanol (2ME-RSAT)** degrada parte da IgM inespecífica e melhora a especificidade. A imunodifusão em ágar com antígenos citoplasmáticos (**AGID II**) oferece alta especificidade para confirmar positivos. Ensaios **ELISA**, imunofluorescência indireta (**IFA**) e **multiplex** (como antígenos específicos BP26 e Omp31) ampliaram as opções, mas variam conforme o fabricante.\n' +
      '- ==Janela imunológica (2 a 12 semanas)==: após a infecção, anticorpos podem demorar semanas para ficar detectáveis; cães expostos recentemente com sorologia negativa devem repetir o exame em **3 a 4 semanas**.\n' +
      '- ==Entendendo o Valor Preditivo Positivo (VPP)==: em exercício ilustrativo com sensibilidade de 91,6% e especificidade de 94,9% aplicado em população com apenas 1% de prevalência (10.000 cães), haveria ~92 positivos verdadeiros e ~505 falsos positivos (`VPP ≈ 15,4%`, `VPN ≈ 99,9%`). Em contrapartida, em cão com sinais compatíveis e contato confirmado, a probabilidade pré-teste sobe drasticamente — reforçando por que triagens positivas em baixa suspeita precisam de confirmação.',
    brucTabelaDesempenhoSorologico: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Desempenho publicado de testes sorológicos e rápidos para B. canis (2025–2026)',
      headers: ['Estudo e método avaliado', 'Concordância / Sensibilidade', 'Concordância / Especificidade', 'Limitação principal'],
      rows: [
        [
          'Guarino et al., 2025 — Multiplex de dois antígenos (BP26 + Omp31)',
          '91,6% (estimada)',
          '94,9% (estimada)',
          'Estimativa por modelo estatístico bayesiano em amostras diagnósticas e de exportação {{ref:ref-guarino-2025}}.',
        ],
        [
          'LeCuyer et al., 2025 — ELISA (vs. 2ME-RSAT)',
          '96,8%',
          '79,3%',
          'Painel de 56 soros em 12 laboratórios; referência comparadora imperfeita {{ref:ref-lecuyer-2025}}.',
        ],
        [
          'LeCuyer et al., 2025 — Fluxo lateral (vs. 2ME-RSAT)',
          '90,6%',
          '95,8%',
          'Desempenho varia conforme o teste escolhido como referência {{ref:ref-lecuyer-2025}}.',
        ],
        [
          'LeCuyer et al., 2025 — Imunofluorescência indireta (IFA)',
          '87,5%',
          '97,5%',
          'Amostra pequena e pré-selecionada {{ref:ref-lecuyer-2025}}.',
        ],
        [
          'Atkins et al., 2026 — Anigen Rapid C.Brucella Ab',
          '90% PPA',
          '100% NPA',
          'Apenas 10 positivos e 40 controles saudáveis (PPA/NPA não equivalem à sensibilidade clínica geral) {{ref:ref-atkins-2026}}.',
        ],
        [
          'Atkins et al., 2026 — FASTest BRUCELLA canis',
          '100% PPA',
          '92,5% NPA',
          'Mesma amostra reduzida (n = 50) {{ref:ref-atkins-2026}}.',
        ],
        [
          'Atkins et al., 2026 — Canine Brucella LPS Antibody Rapid Test',
          '0% PPA',
          '97,5% NPA',
          'Não detectou nenhum dos 10 soros positivos avaliados — kits rápidos não são intercambiáveis {{ref:ref-atkins-2026}}.',
        ],
      ],
    },
    brucPcrCulturaBiossegurancaELab:
      '- ==PCR (detecção de DNA)==: um resultado positivo em amostra adequada apoia fortemente a presença de DNA de *Brucella*, mas não prova bactéria viva; já um negativo ocorre facilmente por baixa carga local, coleta fora do período de eliminação, tecido não acometido ou inibidores da reação.\n' +
      '- ==Cultura bacteriana e risco ocupacional==: recuperar bactéria viável é confirmação microbiológica robusta, porém a bacteremia é intermitente (hemocultura negativa não descarta). ==Avise expressamente o laboratório antes do envio==: o cultivo acidental sem contenção biológica expõe profissionais a infecção grave por aerossóis {{ref:ref-cdc-2024}} {{ref:ref-apha-2025}}.\n' +
      '- ==Hemograma==: frequentemente ==completamente normal==. Pode haver anemia discreta de doença inflamatória (por retenção de ferro mediada por hepcidina em quadros crônicos, achado inespecífico). Na discospondilite por *B. canis*, neutrofilia costuma ser menos provável do que em causas estafilocócicas {{ref:ref-moeller-2025}}, e trombocitopenia sugere comorbidade concomitante.',
    brucTabelaAmostrasDiagn: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Seleção de amostras por apresentação clínica e alerta de biossegurança',
      headers: ['Apresentação clínica', 'Amostras prioritárias'],
      rows: [
        [
          'Suspeita sistêmica',
          'Sorologia específica + sangue total para PCR/cultura (com aviso prévio ao laboratório).',
        ],
        [
          'Abortamento',
          'Placenta, conteúdo fetal e secreção vaginal sob protocolo de proteção biológica rigoroso.',
        ],
        [
          'Epididimite / Orquite',
          'Sêmen (quando aplicável com segurança), sorologia e material cirúrgico em caso de orquiectomia.',
        ],
        [
          'Prostatite',
          'Sêmen/fluido prostático ou urina definidos com laboratório e avaliação urológica.',
        ],
        [
          'Discospondilite',
          'Sorologia específica + múltiplas hemoculturas/PCR e, em casos selecionados, material discal guiado.',
        ],
        [
          'Contactante sem sintomas',
          'Sorologia com confirmação e repetição após 3–4 semanas conforme exposição.',
        ],
      ],
    },
    brucTabelaBioquimicaEUrinalise: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Achados bioquímicos, urinálise e gasometria na investigação de comorbidades',
      headers: ['Exame', 'Achado possível', 'Explicação e limitação clínica'],
      rows: [
        [
          'Albumina / Globulinas',
          'Albumina normal ou baixa; globulinas normais ou elevadas',
          'Resposta antigênica crônica pode elevar globulinas; alterações são inespecíficas.',
        ],
        [
          'Ureia e creatinina',
          'Geralmente normais',
          'Basal obrigatória antes de cogitar qualquer aminoglicosídeo potencialmente nefrotóxico.',
        ],
        [
          'ALT / AST / FA',
          'Frequentemente normais',
          'Alterações exigem pesquisar hepatopatia concomitante ou monitorar toxicidade medicamentosa (como rifampicina).',
        ],
        [
          'Urinálise e proteinúria',
          'Normal ou alterações inespecíficas (proteinúria possível)',
          'Investigar causas renais ou infecção urinária; soropositividade não prova que toda alteração renal venha da brucelose.',
        ],
        [
          'Proteína C-reativa e gasometria',
          'Variável (PCR sérica pode ser normal em focos localizados)',
          'Gasometria só indicada por choque, dispneia ou distúrbio metabólico associado.',
        ],
      ],
    },
    brucImagemVertebralEReprodutiva:
      '- ==Radiografia, TC e RM vertebrais==: a discospondilite mostra destruição das placas terminais vertebrais, irregularidade, esclerose reacional, estreitamento do espaço discal e proliferação óssea crônica. Como lesões múltiplas são comuns e sinais radiográficos levam ==várias semanas para se tornarem visíveis após início da dor==, recomenda-se radiografar toda a coluna e recorrer à ==tomografia computadorizada (TC)== (detalha erosões ósseas sutis) ou ==ressonância magnética (RM)== (avalia discos, medula espinhal, espaço epidural e tecidos vizinhos) diante de dor grave ou déficit neurológico {{ref:ref-long-2022}}. Contudo, Moeller et al. (2025) mostraram que ==a aparência radiográfica não diferencia *B. canis* de outras bactérias== {{ref:ref-moeller-2025}}.\n' +
      '- ==Ultrassonografia escrotal e uterina==: no macho evidencia epidídimo aumentado/heterogêneo, hipervascularização aguda ou fibrose crônica; na fêmea detecta conteúdo uterino, morte fetal ou retenção placentária — localizam a lesão, mas não identificam *Brucella* sem exames específicos.\n' +
      '- ==Histopatologia e imuno-histoquímica==: estudo em tecidos escrotais (Camargo-Castañeda et al., 2021) encontrou epididimite em todos os 8 cães avaliados contra orquite em apenas 3, reforçando que aumento escrotal não significa apenas orquite (figura científica listada apenas como referência externa por não possuir licença comercial aberta) {{ref:ref-camargo-2021}}.',
    brucFiguraLong2022Imagem: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/brucelose-caes-gatos/long-2022-discospondilite-rx-tc-rm.webp',
      alt: 'Comparação entre radiografia, tomografia computadorizada e ressonância magnética em cão com discospondilite por Brucella canis',
      shortCaption: 'Fig. 3 — Discospondilite por B. canis comparada em radiografia, TC e RM (Long et al., 2022).',
      caption:
        'Figura 3 — Comparação multimodal (radiografia, tomografia computadorizada e ressonância magnética) de discospondilite associada a *Brucella canis*. Evidencia a maior sensibilidade da TC e da RM para caracterizar erosões de placas terminais e comprometimento discal/epidural precoces — lembrando que tais padrões não definem o agente sem sorologia ou microbiologia. Fonte: Long et al. (2022), Frontiers in Veterinary Science 9:1043610, Fig. 5 (CC BY 4.0).',
      display: 'default',
    },
    brucFiguraGraham2022Rm: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/brucelose-caes-gatos/graham-2022-rm-discospondilite.webp',
      alt: 'Ressonância magnética cervical evidenciando discospondilite em C6–C7 em fêmea jovem castrada com brucelose canina',
      shortCaption: 'Fig. 4 — Ressonância magnética em discospondilite cervical C6–C7 de cão castrado (Graham et al., 2022).',
      caption:
        'Figura 4 — Ressonância magnética em cadela Labrador castrada (~2 anos) com dor cervical e discospondilite C6–C7 confirmada por hemocultura e PCR para *B. canis*, pertencente a um grupo familiar de três irmãos (um deles totalmente assintomático). Após um ano de tratamento combinado com doxiciclina e marbofloxacina, houve recidiva dos sinais clínicos cerca de dois anos após o diagnóstico. Fonte: Graham et al. (2022), Frontiers in Veterinary Science 9:958390, Fig. 1 (CC BY 4.0).',
      display: 'default',
    },
    brucTabelaDiferenciaisPlantao: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Diagnósticos diferenciais prioritários no plantão',
      headers: ['Apresentação clínica', 'Principais diferenciais', 'Como diferenciar'],
      rows: [
        [
          'Abortamento',
          'Herpesvírus canino, metrite/infecções oportunistas, hipoluteoidismo, anomalias fetais',
          'Histórico gestacional, ultrassom, exame do material fetal/placenta e sorologia/PCR.',
        ],
        [
          'Epididimite / Orquite',
          'Escherichia coli e outras bactérias, trauma, torção testicular, neoplasia',
          'Palpação diferenciando epidídimo vs. testículo, ultrassonografia, cultura e testes de B. canis.',
        ],
        [
          'Dor vertebral',
          'Discospondilite por Staphylococcus/outras bactérias/fungos, hérnia de disco, neoplasia',
          'Exame neurológico, imagem da coluna (RX/TC/RM), hemocultura, urocultura e sorologia específica {{ref:ref-donoghue-2024}}.',
        ],
        [
          'Uveíte',
          'Leishmaniose, erliquiose, outras infecções sistêmicas e uveíte imunomediada',
          'Exame oftálmico e painel sorológico/molecular conforme região epidemiológica.',
        ],
        [
          'Linfonodos aumentados / Letargia',
          'Leishmaniose, linfoma, infecções fúngicas ou sistêmicas crônicas',
          'Citologia, perfil hematológico/bioquímico e triagem etiológica ampla.',
        ],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo de manejo terapêutico e controle sanitário',
      subtitle: 'Expanda cada etapa para conferir prioridades de biossegurança, limites da antibioticoterapia e monitoramento.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Imediato · Controle sanitário',
          speciesTag: 'both',
          title: 'Bloquear reprodução, isolar contactantes e esclarecer ausência de cura garantida',
          quickSummary:
            'Interrompa qualquer atividade reprodutiva, separe o paciente de outros cães, controle secreções e alinhe expectativas claras com o tutor sobre persistência bacteriana.',
          quickFacts: [
            { label: 'Posição sanitária', value: 'Sem cura microbiológica confiável' },
            { label: 'Reprodução', value: 'Proibição permanente' },
          ],
          details: [
            {
              label: 'Por que antibiótico não substitui controle sanitário?',
              content:
                'Diretrizes do CDC e da agência veterinária britânica reforçam que B. canis sobrevive em nichos intracelulares (próstata, baço, osso) mesmo após melhora clínica ou negativação temporária de testes {{ref:ref-cdc-2024}} {{ref:ref-apha-2025}}.',
              tone: 'danger',
            },
            {
              label: 'Eutanásia vs. manutenção supervisionada',
              content:
                'Alguns protocolos sanitários internacionais (como o guia californiano) recomendam fortemente eutanásia pelo risco zoonótico persistente; no Brasil, a decisão exige confirmação diagnóstica sólida, cumprimento de normas locais, avaliação de pessoas vulneráveis na residência e consentimento informado {{ref:ref-cdph-2023}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Suporte · Por síndrome',
          speciesTag: 'dog',
          title: 'Tratar complicações específicas (dor axial, olho ou pós-aborto)',
          quickSummary:
            'A maioria dos cães não requer terapia intensiva; direcione analgesia na discospondilite, proteção visual na uveíte e avaliação de metrite em abortamento complicado.',
          quickFacts: [
            { label: 'Fluids IV', value: 'Somente se houver hipoperfusão real' },
            { label: 'Déficit medular', value: 'Avaliação neurológica/RM urgente' },
          ],
          details: [
            {
              label: 'Discospondilite com déficit progressivo',
              content:
                'Paresia progressiva ou perda de controle urinário exigem analgesia controlada, repouso estrito e RM para avaliar necessidade cirúrgica de descompressão — sabendo que a cirurgia não erradica a infecção sistêmica.',
              tone: 'warning',
            },
            {
              label: 'Abortamento com sinais sistêmicos',
              content:
                'Fêmeas prostradas pós-aborto precisam de ultrassom abdominal e avaliação laboratorial rápida para descartar retenção fetal, metrite supurativa, hemorragia ou sepse concomitante.',
              tone: 'default',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Cirurgia e fármacos · Individualizado',
          speciesTag: 'both',
          title: 'Avaliar castração cirúrgica e riscos de regimes antimicrobianos combinados',
          quickSummary:
            'Ovariohisterectomia ou orquiectomia reduzem drasticamente secreções genitais infectantes (com EPI completo na cirurgia), mas não eliminam focos prostáticos, esplênicos ou ósseos.',
          quickFacts: [
            { label: 'Esterilização', value: 'Reduz eliminação, não cura sozinha' },
            { label: 'Esquemas publicados', value: 'Históricos e potencialmente tóxicos' },
          ],
          details: [
            {
              label: 'Riscos dos esquemas combinados prolongados',
              content:
                'Esquemas históricos publicados empregaram altas doses de tetraciclinas, enrofloxacina ou combinações com aminoglicosídeos (risco renal e ototoxidade) e rifampicina (risco hepático) — nenhum com cura garantida e todos exigindo acompanhamento especializado e monitoramento laboratorial prévio {{ref:ref-santos-2021}} {{ref:ref-wanke-2006}}.',
              tone: 'evidence',
            },
            {
              label: 'Particularidade em gatos',
              content:
                'Inexiste posologia ou protocolo validado para brucelose felina; nunca extrapolar enrofloxacina em alta dose (risco retiniano felino) ou comprimidos secos de doxiciclina sem água (estenose esofágica).',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Seguimento · Três dimensões',
          speciesTag: 'dog',
          title: 'Monitorar resposta clínica, imagem e persistência microbiológica em separado',
          quickSummary:
            'Acompanhe melhora de dor/sinais, regressão lenta de imagem óssea e exames seriados de sorologia, PCR e hemocultura — sem confundir silêncio clínico com cura.',
          quickFacts: [
            { label: 'Vigilância seriada', value: 'Hemoculturas repetidas se tratado' },
            { label: 'Recidiva tardia', value: 'Possível mesmo após meses de melhora' },
          ],
          details: [
            {
              label: 'Limites da negativação após antibiótico',
              content:
                'Mesmo protocolos de vigilância que acompanham animais tratados com três hemoculturas mensais negativas reconhecem explicitamente que a bactéria pode permanecer latente em tecidos profundos {{ref:ref-cdph-2023}} {{ref:ref-graham-2022}}.',
              tone: 'evidence',
            },
            {
              label: 'Vigilância de toxicidade durante terapia',
              content:
                'Avalie creatinina, ureia e urinálise antes e durante uso de aminoglicosídeos, além de transaminases e bilirrubina se utilizar rifampicina, antes mesmo do surgimento de sinais clínicos adversos.',
              tone: 'tip',
            },
          ],
        },
      ],
    },
    brucDilemaTerapeuticoEControleSanitario:
      'Diferentemente de muitas infecções bacterianas comuns, ==não existe protocolo antimicrobiano com eficácia suficientemente comprovada para garantir a cura bacteriológica de *B. canis* em cães naturalmente infectados== {{ref:ref-cdc-2024}} {{ref:ref-apha-2025}} {{ref:ref-santos-2021}}. A sobrevivência dentro dos macrófagos e em tecidos pouco permeáveis (próstata, discos vertebrais e baço) permite recrudescimento mesmo após meses de terapia, como ilustrado no caso de Graham et al. (2022), em que a dor cervical retornou dois anos após um ano de tratamento combinado {{ref:ref-graham-2022}}.\n\n' +
      '- ==Castração cirúrgica==: ovariohisterectomia e orquiectomia removem fontes maciças de secreções genitais contaminantes (realizando a cirurgia com EPI completo e descontaminação rigorosa), mas ==não esterilizam o paciente== nem impedem eliminação prostática/urinária residual.\n' +
      '- ==Decisão sanitária e legislação==: a decisão entre manutenção estritamente isolada sob vigilância ou eutanásia (recomendada em guias sanitários específicos como o documento da Califórnia {{ref:ref-cdph-2023}}) deve basear-se em confirmação diagnóstica, presença de pessoas vulneráveis (gestantes, crianças e imunossuprimidos), capacidade real de isolamento vitalício e normas sanitárias brasileiras vigentes.',
    brucFarmacologiaEAuditoriaDoses:
      'Quando, após discussão com especialista e consentimento esclarecido, opta-se por tentativa de controle clínico com antimicrobianos:\n\n' +
      '- ==Classes e riscos principais==: **doxiciclina/minociclina** penetram tecidos intracelulares (mas em gatos comprimidos sem água/alimento causam esofagite e estenose); **aminoglicosídeos (gentamicina/estreptomicina)** são bactericidas, porém acumulam-se nos túbulos renais causando nefrotoxicidade e ototoxicidade (exigem função renal basal e monitoramento); **rifampicina** atinge alta penetração intracelular, mas induz hepatotoxicidade, enzimas hepáticas e interações medicamentosas (nunca usar isoladamente); **enrofloxacina** apresenta risco de lesão cartilaginosa em cães em crescimento e degeneração retiniana em gatos.\n' +
      '- ==O que mostram os estudos de combinação==: a revisão de Santos et al. (2021) aponta que interações observadas em laboratório variam (incluindo relatos experimentais de antagonismo entre doxiciclina e rifampicina e sinergismo entre enrofloxacina e estreptomicina), sem que nenhuma combinação tenha provado cura estéril consistente em cães naturalmente doentes {{ref:ref-santos-2021}}.',
    brucTabelaRegimesPublicados: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Auditoria de esquemas antimicrobianos publicados (não usar como prescrição automática)',
      headers: ['Esquema documentado', 'Espécie', 'Dose e via relatadas', 'Duração relatada', 'Evidência e alerta crítico'],
      rows: [
        [
          'Wanke et al., 2006 (enrofloxacina)',
          'Cães',
          '5 mg/kg VO a cada 12 h',
          '30 dias (cursos extras em fêmeas)',
          'Estudo pequeno e não controlado (n = 12): reduziu abortamentos, mas não eliminou a infecção {{ref:ref-wanke-2006}}.',
        ],
        [
          'Regime histórico tetraciclina + aminoglicosídeo',
          'Cães',
          'Doxiciclina ou minociclina 25 mg/kg VO q12h + di-hidroestreptomicina (10–20 mg/kg) ou gentamicina (2,5 mg/kg) IM/SC q12h',
          'Tetraciclina 4 semanas; aminoglicosídeo nas semanas 1 e 4',
          '==Regime histórico de dose muito elevada== (não usar 25 mg/kg q12h como dose usual de doxiciclina); alto custo/risco renal e sem cura garantida.',
        ],
        [
          'Regime histórico triplo com rifampicina',
          'Cães',
          'Rifampicina 5 mg/kg VO q24h + doxiciclina 10 mg/kg VO q12h + gentamicina 5 mg/kg SC q24h',
          '3 meses no esquema publicado',
          '==Uso fora de bula com exposição diária prolongada a gentamicina== (alto risco de nefrotoxicidade e hepatotoxicidade); não validado como padrão curativo.',
        ],
        [
          'Brucelose felina',
          'Gatos',
          'Não estabelecida',
          'Não estabelecida',
          'Evidência insuficiente para recomendar dose; conduzir individualmente com especialista e laboratório de referência.',
        ],
      ],
    },
    brucTabelaMonitoramentoFarmacologico: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Monitoramento laboratorial de toxicidade e acompanhamento da resposta em três dimensões',
      headers: ['Fármaco / Dimensão', 'O que monitorar antes e durante o manejo'],
      rows: [
        [
          'Doxiciclina / Minociclina',
          'Vômitos, apetite e tolerância digestiva (em gatos, sempre dar água/alimento pastoso após comprimidos).',
        ],
        [
          'Gentamicina / Estreptomicina',
          'Creatinina, ureia, urinálise (cilindrúria/densidade), hidratação e evitar outros nefrotóxicos — sem esperar sinais clínicos.',
        ],
        [
          'Rifampicina',
          'ALT, AST, bilirrubina, sinais digestivos e revisão rigorosa de interações medicamentosas.',
        ],
        [
          'Enrofloxacina',
          'Adequação à idade/espécie (risco cartilaginoso em filhotes; risco retiniano em gatos).',
        ],
        [
          'Resposta em 3 dimensões',
          '(1) Clínica (dor, marcha, olho); (2) Órgão-alvo (imagem óssea demora mais a regredir que a dor); (3) Microbiologia (cultura/PCR negativas não provam erradicação).',
        ],
      ],
    },
  },

  prevention: {
    brucBiossegurancaOcupacionalEDomiciliar:
      '- ==Prevenção em canis e ausência de vacina==: não existe vacina comercial eficaz disponível para *Brucella canis* (pesquisas experimentais não equivalem a disponibilidade clínica) {{ref:ref-santos-2021}} {{ref:ref-tamanna-2026}}. A prevenção depende de triagem sorológica pré-acasalamento, quarentena antes de introduzir novos cães e interrupção imediata da reprodução diante de abortamentos.\n' +
      '- ==Proteção da equipe veterinária==: partos, abortamentos, cirurgias reprodutivas, coleta de secreções e manipulação laboratorial exigem luvas, avental descartável, proteção ocular/facial e respirador N95 diante de risco de aerossóis ou respingos {{ref:ref-cdc-2024}} {{ref:ref-apha-2025}}. Limpar primeiro a matéria orgânica antes de desinfetar, descartar resíduos como material infectante e, em caso de acidente ou respingo em mucosa, buscar avaliação médica informando expressamente suspeita de *Brucella canis* (nunca fazer automedicação).\n' +
      '- ==Aconselhamento equilibrado ao tutor==: contato casual com um cão infectado não implica transmissão automática, pois o contágio depende do contato com secreções de alta carga bacteriana e da suscetibilidade humana. Para cães mantidos sob vigilância em casa, orientar luvas ao limpar urina/secreções, desinfecção rigorosa, higiene das mãos, separação de outros cães, proibição de reprodução e atenção especial caso residam gestantes, crianças pequenas ou imunossuprimidos.',
  },

  complications: {
    brucComplicacoesDisseminacaoFetalEPrognostico:
      'Embora a mortalidade aguda em cães adultos seja baixa, complicações focais podem ameaçar função neurológica, visão e saúde neonatal:\n\n' +
      '- ==Disseminação fetal e neonatal (estudo UFMG)==: de Souza et al. (2018) investigaram 200 filhotes e identificaram 21% positivos por PCR (com 9 isolamentos bacterianos); em 13 filhotes avaliados por imuno-histoquímica, a bactéria distribuía-se por múltiplos órgãos (trato digestório, rins, sistema nervoso e cordão umbilical), demonstrando infecção sistêmica perinatal grave (o índice de 21% refere-se às amostras estudadas, e não à população geral) {{ref:ref-desouza-2018}}.\n' +
      '- ==Prognóstico em 3 dimensões==: no cão adulto, a mortalidade é geralmente baixa, mas deve-se explicar o prognóstico considerando (1) qualidade de vida e dor, (2) recuperação das lesões oculares ou vertebrais e (3) persistência do risco infeccioso e reprodutivo (evitando citar uma única taxa global de cura). Em gatos, faltam dados robustos para estimar mortalidade ou taxa de cura.',
    brucFiguraDeSouza2018Neonato: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/brucelose-caes-gatos/desouza-2018-ihq-neonato-bcanis.jpg',
      alt: 'Marcação imuno-histoquímica demonstrando distribuição tecidual de Brucella canis em múltiplos órgãos de filhote canino naturalmente infectado',
      shortCaption: 'Fig. 5 — Marcação imuno-histoquímica de B. canis em tecidos de filhote infectado (de Souza et al., 2018).',
      caption:
        'Figura 5 — Marcação imuno-histoquímica evidenciando antígenos de *Brucella canis* em células teciduais de filhote naturalmente infectado, demonstrando o caráter sistêmico da infecção congênita/neonatal além da placenta — o que fundamenta precauções máximas ao manipular neonatos inviáveis, placentas e materiais de parto. Fonte: de Souza et al. (2018), Scientific Reports 8:7203, Fig. 6 (CC BY 4.0).',
      display: 'default',
    },
    brucTabelaComplicacoesPlantao: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Complicações graves, sinais de alerta e prioridade no atendimento',
      headers: ['Complicação', 'Sinais de alerta', 'Prioridade imediata', 'Impacto prognóstico'],
      rows: [
        [
          'Compressão ou inflamação neural na discospondilite',
          'Fraqueza progressiva de membros, dor intensa e perda de controle urinário',
          'Exame neurológico seriado, analgesia e ressonância magnética',
          'Reservado se houver déficit motor grave ou compressão medular.',
        ],
        [
          'Uveíte intensa / Endoftalmite',
          'Dor ocular, opacidade, queda visual e alteração da pressão intraocular',
          'Avaliação oftálmica prioritária e controle anti-inflamatório ponderado',
          'Risco de glaucoma secundário e perda irreversível da visão.',
        ],
        [
          'Metrite ou complicação pós-aborto',
          'Febre ou hipotermia, prostração, secreção anormal e má perfusão',
          'Estabilização, ultrassonografia uterina e tratamento de sepse/retenção',
          'Depende da gravidade e rapidez da intervenção.',
        ],
        [
          'Infecção neonatal grave',
          'Baixa vitalidade, incapacidade de mamar e óbito perinatal',
          'Suporte neonatal e biossegurança reforçada para a equipe',
          'Desfavorável em neonatos com disseminação sistêmica.',
        ],
        [
          'Toxicidade medicamentosa (terapia prolongada)',
          'Elevação de creatinina, alterações urinárias, vômitos ou elevação hepática',
          'Suspender ou ajustar fármacos e instituir suporte orgânico',
          'Frequentemente limita ou impede continuidade do esquema.',
        ],
      ],
    },
    brucControversiasEAtualizacoes2026:
      '- ==8 erros comuns que atrasam o diagnóstico==: investigar apenas cães inteiros/reprodutores; descartar por falta de febre ou leucocitose; usar teste bovino de antígeno liso para descartar *B. canis*; confirmar diagnóstico definitivo com teste rápido único; interpretar PCR ou hemocultura negativa como exclusão; presumir cura apenas porque a dor passou; enviar material para cultura sem avisar o laboratório; e atribuir toda discospondilite a *Staphylococcus* sem sorologia específica.\n' +
      '- ==Controvérsia da imagem vertebral==: embora Long et al. (2022) tenham descrito lesões arredondadas frequentes ("em saca-bocados") nas placas terminais de cães com *B. canis* (25/29 radiografias; 94% dos 33 cães tinham menos de 5 anos) {{ref:ref-long-2022}}, Moeller et al. (2025) mostraram ausência de diferença radiográfica significativa frente a outras causas de discospondilite — logo, a radiografia detecta a lesão, mas não identifica o agente {{ref:ref-moeller-2025}}.\n' +
      '- ==Panorama One Health (2020–2026)==: revisão de 2026 sobre *B. canis* como zoonose subdiagnosticada ressaltou que o LPS rugoso também dificulta o diagnóstico médico humano (em 68 casos humanos identificados com exposição conhecida, ~80% envolviam contato próximo com cães — proporção da origem entre casos diagnosticados, não taxa de ataque por contato) {{ref:ref-storoni-2026}}; já revisão de setembro de 2026 reforçou mecanismos intracelulares e lacunas vacinais globais {{ref:ref-tamanna-2026}}. Não há consenso institucional formal da ACVIM definindo protocolo curativo para brucelose canina.',
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'prostatite-caes-gatos',
    'doenca-do-disco-intervertebral-caes',
    'leishmaniose-caes-gatos',
    'erliquiose-monocitica-canina',
  ],
  relatedMedicationSlugs: ['enrofloxacina', 'marbofloxacina'],

  references: [
    {
      id: 'ref-santos-2021',
      authors: 'Santos RL, Souza TD, Mol JPS, Eckstein C, Paíxão TA',
      title: 'Canine Brucellosis: An Update',
      journal: 'Frontiers in Veterinary Science',
      year: 2021,
      volume: '8',
      pages: '594291',
      doi: '10.3389/fvets.2021.594291',
      url: 'https://doi.org/10.3389/fvets.2021.594291',
      sourceType: 'Revisão especializada (UFMG)',
    },
    {
      id: 'ref-guarino-2025',
      authors: 'Guarino C, et al.',
      title: 'Development and Bayesian latent class evaluation of a multiplex serological assay for Brucella canis antibodies',
      journal: 'Frontiers in Microbiology',
      year: 2025,
      volume: '16',
      pages: '1655877',
      doi: '10.3389/fmicb.2025.1655877',
      url: 'https://doi.org/10.3389/fmicb.2025.1655877',
      sourceType: 'Estudo diagnóstico (n = 1.582 amostras)',
    },
    {
      id: 'ref-lecuyer-2025',
      authors: 'LeCuyer TE, et al.',
      title: 'Multicenter comparison of serological diagnostic assays for Brucella canis antibodies',
      journal: 'Frontiers in Veterinary Science',
      year: 2025,
      volume: '12',
      pages: '1556965',
      doi: '10.3389/fvets.2025.1556965',
      url: 'https://doi.org/10.3389/fvets.2025.1556965',
      sourceType: 'Estudo multicêntrico (56 soros / 12 laboratórios)',
    },
    {
      id: 'ref-atkins-2026',
      authors: 'Atkins R, et al.',
      title: 'Evaluation of three point-of-care rapid antibody tests for Brucella canis compared with a multiplex assay',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2026,
      volume: '40',
      pages: 'aalag073',
      doi: '10.1093/jvimsj/aalag073',
      url: 'https://doi.org/10.1093/jvimsj/aalag073',
      sourceType: 'Estudo diagnóstico comparativo (n = 50)',
    },
    {
      id: 'ref-long-2022',
      authors: 'Long C, et al.',
      title: 'Brucella canis discospondylitis in 33 dogs',
      journal: 'Frontiers in Veterinary Science',
      year: 2022,
      volume: '9',
      pages: '1043610',
      doi: '10.3389/fvets.2022.1043610',
      url: 'https://doi.org/10.3389/fvets.2022.1043610',
      sourceType: 'Série retrospectiva multicêntrica (CC BY 4.0 · Fig. 3)',
    },
    {
      id: 'ref-moeller-2025',
      authors: 'Moeller SL, et al.',
      title: 'Comparison of clinical, hematological, and radiographic findings in dogs with Brucella canis versus non-Brucella discospondylitis',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2025,
      volume: '39',
      pages: 'e70112',
      doi: '10.1111/jvim.70112',
      url: 'https://doi.org/10.1111/jvim.70112',
      sourceType: 'Estudo caso-controle multicêntrico (n = 40)',
    },
    {
      id: 'ref-donoghue-2024',
      authors: 'Donoghue E, et al.',
      title: 'Etiological investigation of canine discospondylitis in a Brucella canis-endemic region',
      journal: 'Veterinary Sciences',
      year: 2024,
      volume: '11',
      pages: '279',
      doi: '10.3390/vetsci11060279',
      url: 'https://doi.org/10.3390/vetsci11060279',
      sourceType: 'Estudo retrospectivo (n = 117)',
    },
    {
      id: 'ref-graham-2022',
      authors: 'Graham LT, et al.',
      title: 'Canine brucellosis in three littermates, case report',
      journal: 'Frontiers in Veterinary Science',
      year: 2022,
      volume: '9',
      pages: '958390',
      doi: '10.3389/fvets.2022.958390',
      url: 'https://doi.org/10.3389/fvets.2022.958390',
      sourceType: 'Relato clínico (CC BY 4.0 · Fig. 4)',
    },
    {
      id: 'ref-buhmann-2019',
      authors: 'Buhmann G, Paul F, Herbst W, Melzer F, Wolf G, Hartmann K, Fischer A',
      title: 'Canine Brucellosis: Insights Into the Epidemiologic Situation in Europe',
      journal: 'Frontiers in Veterinary Science',
      year: 2019,
      volume: '6',
      pages: '151',
      doi: '10.3389/fvets.2019.00151',
      url: 'https://doi.org/10.3389/fvets.2019.00151',
      sourceType: 'Artigo original e relato europeu (CC BY 4.0 · Fig. 2)',
    },
    {
      id: 'ref-camargo-2021',
      authors: 'Camargo-Castañeda AM, Stranahan LW, Edwards JF, et al.',
      title: 'Characterization of epididymal and testicular histologic lesions and use of immunohistochemistry and PCR on formalin-fixed tissues to detect Brucella canis in male dogs',
      journal: 'Journal of Veterinary Diagnostic Investigation',
      year: 2021,
      doi: '10.1177/1040638720986883',
      url: 'https://doi.org/10.1177/1040638720986883',
      sourceType: 'Série anatomopatológica / referência externa visual',
    },
    {
      id: 'ref-wanke-2006',
      authors: 'Wanke MM, Delpino MV, Baldi PC',
      title: 'Use of enrofloxacin in the treatment of canine brucellosis in a dog kennel (clinical trial)',
      journal: 'Theriogenology',
      year: 2006,
      volume: '66',
      pages: '1573–1578',
      doi: '10.1016/j.theriogenology.2006.01.034',
      url: 'https://doi.org/10.1016/j.theriogenology.2006.01.034',
      sourceType: 'Ensaio clínico não controlado (n = 12)',
    },
    {
      id: 'ref-desouza-2018',
      authors: 'de Souza TD, de Carvalho TF, Mol JPS, Lopes JVM, Silva MF, da Paixão TA, Santos RL',
      title: 'Tissue distribution and cell tropism of Brucella canis in naturally infected canine foetuses and neonates',
      journal: 'Scientific Reports',
      year: 2018,
      volume: '8',
      pages: '7203',
      doi: '10.1038/s41598-018-25651-x',
      url: 'https://doi.org/10.1038/s41598-018-25651-x',
      sourceType: 'Estudo anatomopatológico UFMG (CC BY 4.0 · Fig. 5)',
    },
    {
      id: 'ref-dadar-2025',
      authors: 'Dadar M, et al.',
      title: 'Global seroprevalence and epidemiological risk factors of canine brucellosis: systematic review and meta-analysis',
      journal: 'One Health',
      year: 2025,
      volume: '21',
      pages: '101225',
      doi: '10.1016/j.onehlt.2025.101225',
      url: 'https://doi.org/10.1016/j.onehlt.2025.101225',
      sourceType: 'Revisão sistemática e meta-análise (175.675 amostras)',
    },
    {
      id: 'ref-larsson-1984',
      authors: 'Larsson CE, Larsson MH, Mirandola RM, Yassuda PH, Grutolla G',
      title: 'Anti-Brucella canis antibodies and attempts to isolate the microorganism in stray and pet cats in São Paulo, Brazil',
      journal: 'Revista de Saúde Pública',
      year: 1984,
      volume: '18',
      pages: '47–50',
      doi: '10.1590/S0034-89101984000100005',
      url: 'https://doi.org/10.1590/S0034-89101984000100005',
      sourceType: 'Inquérito brasileiro em felinos (n = 134)',
    },
    {
      id: 'ref-wareth-2017',
      authors: 'Wareth G, et al.',
      title: 'Isolation of Brucella abortus biovar 1 from uterine discharge of a bitch and a queen on a dairy farm',
      journal: 'Transboundary and Emerging Diseases',
      year: 2017,
      volume: '64',
      pages: 'e27–e30',
      doi: '10.1111/tbed.12535',
      url: 'https://doi.org/10.1111/tbed.12535',
      sourceType: 'Investigação microbiológica',
    },
    {
      id: 'ref-storoni-2026',
      authors: 'Storoni C, Colognato R, Attili AR, Preziuso S, Li Y, Cuteri V',
      title: 'Brucella canis in dogs: An underrecognized zoonotic pathogen requiring a one health response',
      journal: 'One Health',
      year: 2026,
      pages: '101506',
      doi: '10.1016/j.onehlt.2026.101506',
      url: 'https://doi.org/10.1016/j.onehlt.2026.101506',
      sourceType: 'Revisão One Health (2026)',
    },
    {
      id: 'ref-tamanna-2026',
      authors: 'Tamanna S, Kim DM, Lee B, Kim CM, Lee YM',
      title: 'Re-emergence of Brucella species: epidemiology and pathogenesis',
      journal: 'Clinical Microbiology Reviews',
      year: 2026,
      doi: '10.1128/cmr.00139-26',
      url: 'https://doi.org/10.1128/cmr.00139-26',
      sourceType: 'Revisão científica (2026)',
    },
    {
      id: 'ref-cdc-2024',
      authors: 'Centers for Disease Control and Prevention (CDC)',
      title: 'Veterinary Guidance for Brucellosis',
      journal: 'CDC',
      year: 2024,
      url: 'https://www.cdc.gov/brucellosis/hcp/animals/index.html',
      sourceType: 'Diretriz oficial de saúde pública',
    },
    {
      id: 'ref-apha-2025',
      authors: 'Animal and Plant Health Agency (APHA) / UK Government',
      title: 'Canine brucellosis: general information and Brucella canis risks and control measures in veterinary practices',
      journal: 'GOV.UK',
      year: 2025,
      url: 'https://www.gov.uk/government/publications/canine-brucellosis-summary-information-sheet-for-veterinary-staff/canine-brucellosis-summary-information-sheet-for-veterinary-staff',
      sourceType: 'Diretriz oficial de biossegurança',
    },
    {
      id: 'ref-cdph-2023',
      authors: 'California Department of Public Health (CDPH)',
      title: 'Guidance for Canine Brucellosis',
      journal: 'CDPH',
      year: 2023,
      url: 'https://www.cdph.ca.gov/Programs/CID/DCDC/CDPH%20Document%20Library/IDBGuidanceforCALHJs-CanineBrucellosis.pdf',
      sourceType: 'Diretriz sanitária regional',
    },
    {
      id: 'ref-cornell-multiplex',
      authors: 'Cornell University Animal Health Diagnostic Center',
      title: 'Brucella Multiplex Testing for Dogs',
      journal: 'Cornell AHDC',
      year: 2024,
      url: 'https://www.vet.cornell.edu/animal-health-diagnostic-center/testing/testing-protocols-interpretations/brucella-multiplex-testing-dogs',
      sourceType: 'Protocolo diagnóstico laboratorial',
    },
    {
      id: 'ref-mapa-pncebt',
      authors: 'Ministério da Agricultura e Pecuária (MAPA)',
      title: 'Programa Nacional de Controle e Erradicação da Brucelose e da Tuberculose Animal (PNCEBT)',
      journal: 'Governo Federal do Brasil',
      sourceType: 'Normativa sanitária nacional',
    },
    {
      id: 'ref-conitec-pcdt-2025',
      authors: 'Ministério da Saúde do Brasil / CONITEC',
      title: 'Protocolo Clínico e Diretrizes Terapêuticas — Brucelose Humana',
      journal: 'CONITEC',
      year: 2025,
      sourceType: 'Diretriz clínica nacional de saúde pública',
    },
    {
      id: 'ref-drost-shille',
      authors: 'Shille VM (1980) — Drost Project',
      title: 'The Visual Guide to Canine Reproduction: Infectious Causes (orchitis, epididymitis and scrotal dermatitis)',
      journal: 'University of Florida',
      url: 'https://visgar.vetmed.ufl.edu/en_canrep/infectious-causes/infectious-causes.html',
      sourceType: 'Referência externa visual (reprodução canina)',
    },
    {
      id: 'ref-nelson-couto-6ed',
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine (6th Edition) — Cap. 55 (pp. 963–965), Cap. 56 (pp. 1000–1001), Cap. 65 (p. 1143), Cap. 92 (pp. 1441–1446) e Cap. 99 (p. 1543)',
      journal: 'Elsevier',
      year: 2020,
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-plumbs-10ed-rifampin',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition) — Monografia de Rifampicina e esquema descrito para brucelose canina",
      journal: 'Wiley-Blackwell',
      year: 2023,
      pages: 'pp. 1118–1120',
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
  ],
};
