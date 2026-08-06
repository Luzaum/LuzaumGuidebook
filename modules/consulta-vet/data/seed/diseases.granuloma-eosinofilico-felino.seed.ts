import { DiseaseRecord } from '../../types/disease';

/** Complexo do granuloma eosinofílico felino; síntese Buckley & Nuttall 2012 (I e II), Power & Ihrke 1995, Nelson & Couto, BSAVA dermatologia. */
export const granulomaEosinofilicoFelinoRecord: DiseaseRecord = {
  id: 'disease-granuloma-eosinofilico-felino',
  slug: 'granuloma-eosinofilico-felino',
  title: 'Complexo do granuloma eosinofílico felino',
  synonyms: [
    'Feline eosinophilic granuloma complex',
    'EGC',
    'Úlcera indolente',
    'Placa eosinofílica',
    'Granuloma linear felino',
    'Granuloma eosinofílico oral/labial',
  ],
  species: ['cat'],
  category: 'dermatologia',
  tags: [
    'Eosinófilos',
    'Alergia',
    'Úlcera indolente',
    'Placa eosinofílica',
    'Granuloma linear',
    'Ciclosporina',
  ],
  quickSummary:
    'O complexo do granuloma eosinofílico felino (EGC) não é uma doença única, mas um padrão de reação cutaneomucosa a eosinófilos ativados que se expressa em três morfologias clássicas — úlcera indolente (lábio superior), placa eosinofílica (abdome ventral, face medial de coxas) e granuloma linear/eosinofílico (face caudal de coxas, coxim, cavidade oral/faringe) — que podem coexistir no mesmo paciente ou aparecer isoladamente. Na quase totalidade dos casos, o EGC é secundário a hipersensibilidade subjacente: dermatite alérgica à picada de pulga, hipersensibilidade alimentar ou dermatite atópica felina são os gatilhos mais reconhecidos, embora uma minoria permaneça idiopática mesmo após investigação completa (Buckley & Nuttall, 2012). O diagnóstico morfológico costuma ser evidente à inspeção, mas a citologia (eosinófilos ± mastócitos, às vezes com infiltrado misto) apoia, e a biópsia é reservada a lesões atípicas, refratárias ou com suspeita neoplásica. O ponto crítico de manejo é que tratar apenas a lesão cutânea sem buscar e controlar a causa alérgica de base condena o paciente à recorrência: controle rigoroso de pulgas é obrigatório em todo caso, mesmo sem prova direta de pulicose, seguido por investigação alimentar e ambiental quando indicado. O tratamento sintomático da lesão ativa usa glicocorticoides para controle rápido e ciclosporina para manutenção crônica ou casos refratários/intolerantes a corticoide; granulomas orofaríngeos extensos podem comprometer a via aérea e exigem atenção especial em gatos com estridor ou dificuldade de deglutição.',
  quickDecisionStrip: [
    'EGC é padrão de reação cutânea eosinofílica, não diagnóstico etiológico final — sempre procure a causa de base.',
    'Três apresentações clássicas: úlcera indolente (lábio), placa eosinofílica e granuloma linear/eosinofílico.',
    'Controle de pulgas rigoroso é obrigatório em todo caso, mesmo sem prova direta de pulicose.',
    'Investigar hipersensibilidade alimentar e atopia quando o controle de pulgas isolado não resolve.',
    'Citologia (eosinófilos ± mastócitos) apoia o diagnóstico; biópsia é reservada a casos atípicos ou refratários.',
    'Corticoide controla a crise; ciclosporina é opção eficaz para manutenção crônica ou refratariedade.',
    'Granuloma oral/faríngeo pode comprometer via aérea — atenção redobrada em gatos com estridor ou disfagia.',
  ],
  quickSummaryRich: {
    lead:
      'EGC é o clássico "trate a causa, não só a lesão" da dermatologia felina — a morfologia (úlcera, placa ou granuloma linear) só te diz onde olhar, não por que aconteceu. Na prática, todo caso começa com controle de pulgas de verdade, mesmo que o tutor jure que "não tem pulga em casa"; sem isso, corticoide e ciclosporina só compram tempo até a próxima recidiva.',
    leadHighlights: ['padrão de reação', 'pulgas', 'ciclosporina', 'recidiva'],
    pillars: [
      {
        title: 'Definição',
        body:
          'Padrão de reação cutaneomucosa eosinofílica com três morfologias (úlcera indolente, placa eosinofílica, granuloma linear/eosinofílico), quase sempre secundário a hipersensibilidade de base.',
        highlights: ['padrão de reação', 'hipersensibilidade'],
      },
      {
        title: 'Causa mais comum',
        body:
          'Dermatite alérgica à picada de pulga é o gatilho mais frequentemente identificado, seguida por hipersensibilidade alimentar e dermatite atópica felina.',
        highlights: ['pulgas', 'alimentar', 'atopia'],
      },
      {
        title: 'Conduta imediata',
        body:
          'Controle de pulgas rigoroso em todos os animais do domicílio, citologia da lesão, corticoide para controle agudo enquanto se investiga a causa de base.',
        highlights: ['controle de pulgas', 'citologia'],
      },
    ],
    diagnosticFlow: {
      title: 'Diagnóstico (ordem prática)',
      steps: [
        {
          label: '1. Reconhecimento morfológico',
          detail:
            'Identificar qual(is) das três apresentações clássicas está presente — úlcera indolente labial, placa eosinofílica ventral/inguinal ou granuloma linear em coxa/coxim/cavidade oral.',
        },
        {
          label: '2. Citologia da lesão',
          detail:
            'Impressão ou aspirado revela eosinófilos predominantes, por vezes com mastócitos — sustenta o padrão de reação sem definir a causa.',
        },
        {
          label: '3. Investigação da causa de base',
          detail:
            'Controle terapêutico de pulgas por 6-8 semanas em todos os animais do domicílio; se não resolver, dieta de eliminação de 8 semanas com proteína nova/hidrolisada para hipersensibilidade alimentar; considerar atopia se ambas forem negativas.',
        },
        {
          label: '4. Biópsia (casos atípicos)',
          detail:
            'Reservada a lesões que não respondem ao tratamento esperado, apresentação atípica, idade incomum ou suspeita de diferencial neoplásico (carcinoma espinocelular em úlceras labiais crônicas, por exemplo).',
        },
        {
          label: '5. Diferenciais obrigatórios',
          detail:
            'Neoplasia cutânea/oral, infecção fúngica profunda, herpesvirose felina com componente cutâneo, outras dermatites eosinofílicas.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento (prioridades)',
      steps: [
        {
          label: 'Camada 1 — Controle de pulgas',
          detail:
            'Adulticida de ação rápida e residual em todos os animais do domicílio, independentemente de haver prova direta de infestação — base obrigatória de qualquer protocolo.',
        },
        {
          label: 'Camada 2 — Controle agudo da lesão',
          detail:
            'Glicocorticoide sistêmico (prednisolona) em dose anti-inflamatória a imunossupressora conforme extensão e gravidade, com desmame gradual.',
        },
        {
          label: 'Camada 3 — Investigação alimentar/ambiental',
          detail:
            'Dieta de eliminação estrita por 8 semanas quando pulgas controladas não resolvem; considerar testes de atopia se ambas as investigações forem negativas.',
        },
        {
          label: 'Camada 4 — Manutenção crônica ou refratariedade',
          detail:
            'Ciclosporina como alternativa eficaz para casos recorrentes, crônicos ou com intolerância/contraindicação a corticoide prolongado.',
        },
        {
          label: 'Camada 5 — Casos refratários graves',
          detail:
            'Clorambucila ou outras opções imunomoduladoras em casos selecionados e refratários, sempre com monitorização hematológica próxima.',
        },
      ],
    },
  },
  etiology: {
    tcPadraoDeReacao:
      'O EGC representa um padrão histopatológico de reação eosinofílica cutaneomucosa, não uma doença de causa única. Três morfologias clássicas — úlcera indolente, placa eosinofílica e granuloma linear/eosinofílico — podem se sobrepor no mesmo paciente (Buckley & Nuttall, 2012).',
    tcCausasSubjacentes: [
      'Dermatite alérgica à picada de pulga (DAPP) — gatilho mais comumente identificado nas séries clínicas.',
      'Hipersensibilidade alimentar — subset relevante de casos responde a dieta de eliminação.',
      'Dermatite atópica felina — considerada quando pulgas e alimentação foram adequadamente excluídas.',
      'Casos idiopáticos permanecem em minoria mesmo após investigação completa; alguns relatos descrevem componente genético em determinadas linhagens.',
    ],
    tcMecanismoImune:
      'Ativação de eosinófilos e liberação de seu conteúdo citotóxico (proteína básica principal, entre outros) na pele e mucosa gera necrose colagenolítica característica ("flame figures" na histopatologia), formando as lesões ulceradas, em placa ou granulomatosas observadas clinicamente.',
  },
  epidemiology: {
    tcPerfilPopulacional:
      'Ocorre em gatos de qualquer idade, sexo ou raça, embora fêmeas apareçam sobrerrepresentadas em algumas séries para úlcera indolente. Não há sazonalidade rígida, mas casos associados a pulicose podem acompanhar picos regionais do vetor.',
    tcApresentacaoOral:
      'O granuloma eosinofílico pode acometer língua, palato e faringe — variante menos comum, porém clinicamente relevante por risco de obstrução de via aérea superior ou disfagia em lesões extensas.',
  },
  pathogenesisTransmission: {
    tcCascataInflamatoria:
      'Exposição ao alérgeno (picada de pulga, antígeno alimentar ou ambiental) ativa resposta Th2 com recrutamento e degranulação de eosinófilos na pele/mucosa; o conteúdo citotóxico liberado provoca necrose colagenolítica focal, gerando as lesões características observadas clinicamente e à histopatologia.',
    tcAutotraumatismo:
      'Prurido associado à hipersensibilidade de base leva a lambedura e automutilação, que podem perpetuar e agravar as lesões, sobretudo na placa eosinofílica.',
    tcTransmissao:
      'Não é doença contagiosa nem transmissível entre animais; determinantes são a hipersensibilidade individual e a exposição a alérgenos (pulga, alimento, ambiente).',
  },
  pathophysiology:
    'Cada morfologia reflete a mesma resposta eosinofílica de base expressa em diferentes contextos anatômicos e cronológicos. A úlcera indolente no lábio superior tipicamente não é dolorosa apesar da aparência ("indolente" no nome), característica que ajuda a diferenciá-la de lesões neoplásicas ou traumáticas mais sensíveis. A placa eosinofílica é intensamente pruriginosa, redonda a oval, exsudativa, geralmente em abdome ventral ou face medial de coxas — área de fácil acesso à lambedura. O granuloma linear/eosinofífico forma placas ou cordões lineares firmes, amarelo-rosados, tipicamente na face caudal das coxas, coxins ou cavidade oral, refletindo reação granulomatosa mais organizada ao infiltrado eosinofílico crônico.',
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologic',
      findings: [
        'Úlcera indolente: lesão ulcerada, bem demarcada, geralmente unilateral no lábio superior próximo ao filtro, tipicamente não dolorosa.',
        'Placa eosinofílica: placa redonda a oval, elevada, exsudativa, eritematosa e intensamente pruriginosa, mais comum em abdome ventral e face medial de coxas.',
        'Granuloma linear/eosinofílico: cordões ou placas lineares firmes, amarelo-rosados, na face caudal de coxas, coxins ou lábios; forma nodular no coxim plantar também descrita.',
      ],
    },
    {
      system: 'oral',
      findings: [
        'Granuloma eosinofílico oral pode acometer língua, palato mole e faringe, causando halitose, disfagia, sialorreia e, em casos extensos, estridor ou dificuldade respiratória por obstrução parcial de via aérea superior.',
      ],
    },
    {
      system: 'behavioral',
      findings: ['Lambedura e automutilação associadas ao prurido de base, especialmente na placa eosinofílica.'],
    },
  ],
  diagnosis: {
    tcInspecaoMorfologica:
      'O reconhecimento da morfologia clássica (úlcera indolente, placa eosinofílica, granuloma linear) já direciona fortemente o diagnóstico presuntivo; a localização típica de cada apresentação reforça a suspeita.',
    tcCitologia:
      'Impressão ou aspirado por agulha fina da lesão tipicamente revela eosinófilos predominantes, por vezes com mastócitos associados — apoia o diagnóstico de padrão de reação sem, por si só, identificar a causa subjacente.',
    tcBiopsia:
      'Reservada a lesões atípicas, refratárias ao tratamento esperado, de aparência nodular/infiltrativa incomum, ou quando há suspeita de diferencial neoplásico (por exemplo, carcinoma espinocelular em úlcera labial crônica não responsiva). Histopatologia mostra infiltrado eosinofílico com áreas de necrose colagenolítica ("flame figures").',
    tcInvestigacaoCausaBase: {
      kind: 'clinicalTable',
      headers: ['Etapa', 'Objetivo'],
      rows: [
        ['Controle terapêutico de pulgas (6-8 semanas, todos os animais do domicílio)', 'Excluir/confirmar dermatite alérgica à picada de pulga como gatilho principal.'],
        ['Dieta de eliminação estrita (8 semanas, proteína nova ou hidrolisada)', 'Investigar hipersensibilidade alimentar quando pulgas controladas não resolvem.'],
        ['Testes intradérmicos ou sorológicos de alergia', 'Considerar dermatite atópica felina quando as duas investigações anteriores forem negativas.'],
      ],
    },
    tcDiagnosticosDiferenciais:
      'Neoplasia cutânea ou oral (carcinoma espinocelular, especialmente em lesões labiais crônicas refratárias), infecção fúngica profunda, complexo de herpesvirose felina com manifestação cutânea, outras dermatites eosinofílicas menos comuns, mastocitoma cutâneo.',
  },
  treatment: {
    ordemDePrioridade: [
      '1) Controle de pulgas rigoroso e imediato em todos os animais do domicílio com adulticida de ação rápida e residual comprovada — base obrigatória de qualquer protocolo, mesmo sem prova direta de pulicose (Buckley & Nuttall, 2012).',
      '2) Glicocorticoide sistêmico (prednisolona) em dose anti-inflamatória a imunossupressora conforme extensão e gravidade da lesão, para controle agudo enquanto a causa de base é investigada.',
      '3) Dieta de eliminação estrita por 8 semanas com proteína nova ou hidrolisada quando o controle de pulgas isolado não resolve — evitar conclusões precipitadas antes de completar o período de teste.',
      '4) Ciclosporina como alternativa eficaz para manutenção crônica, casos recorrentes ou pacientes com intolerância/contraindicação a corticoide prolongado; resposta pode levar semanas.',
      '5) Investigação de atopia (testes intradérmicos ou sorológicos) quando pulgas e alimentação foram adequadamente excluídas como causa isolada.',
      '6) Antimicrobiano tópico ou sistêmico apenas se houver infecção secundária documentada por citologia/cultura — não é tratamento primário do EGC.',
      '7) Opções refratárias (clorambucila, outros imunomoduladores) reservadas a casos graves e persistentes após falha das medidas anteriores, com monitorização hematológica próxima.',
      '8) Atenção especial e eventual encaminhamento especializado em granuloma oral/faríngeo extenso com sinais de comprometimento de via aérea (estridor, dispneia, disfagia importante).',
    ],
    monitoramento: [
      'Extensão, aspecto e sinais de prurido/dor da lesão a cada revisão, com fotos seriadas quando possível.',
      'Adesão e eficácia do controle de pulgas em todos os animais do domicílio — falha aqui é causa comum de recidiva aparente.',
      'Efeitos adversos de corticoide sistêmico prolongado (poliúria/polidipsia, ganho de peso, predisposição a infecção secundária).',
      'Função renal e hemograma periódicos em pacientes sob ciclosporina ou imunomoduladores mais potentes.',
      'Sinais respiratórios ou de deglutição em casos com componente oral/faríngeo.',
    ],
    tcControleDePulgas:
      'Adulticida sistêmico ou tópico de ação rápida e efeito residual, aplicado em todos os animais do domicílio (incluindo assintomáticos), mantido de forma contínua — não apenas durante a crise. É a medida isolada de maior impacto e menor risco no manejo do EGC.',
    tcGlicocorticoides:
      'Prednisolona oral em dose anti-inflamatória a imunossupressora conforme gravidade e extensão da lesão, com desmame gradual após controle clínico. Preferir prednisolona a prednisona em gatos pela conversão hepática menos eficiente desta última.',
    tcCiclosporina:
      'Opção terapêutica bem estabelecida para casos crônicos, recorrentes ou refratários a corticoide, e para pacientes com comorbidades que contraindicam corticoide prolongado (por exemplo, diabetes mellitus concomitante). Resposta clínica pode levar de semanas a poucos meses; monitorar função renal e hemograma.',
    tcDietaDeEliminacao:
      'Proteína nova ou hidrolisada por período mínimo de 8 semanas, com controle ambiental rigoroso para evitar contaminação alimentar cruzada — essencial para não invalidar o teste e concluir erroneamente que não há componente alimentar.',
    tcCasosRefratarios:
      'Clorambucila ou outros agentes imunomoduladores podem ser considerados em casos graves e persistentes após falha das medidas de primeira e segunda linha, sempre com monitorização hematológica próxima devido ao risco de mielossupressão.',
    tcGranulomaOralExtenso:
      'Lesões orofaríngeas extensas podem exigir suporte adicional (analgesia, suporte nutricional, eventual encaminhamento especializado) quando há comprometimento de via aérea ou deglutição — não retardar o início do tratamento sistêmico nesses casos.',
  },
  prevention: {
    tcPrevencaoDeRecidiva:
      'Manutenção contínua e rigorosa do controle de pulgas em todos os animais do domicílio é a medida preventiva mais eficaz. Quando há componente alimentar identificado, manter a dieta de eliminação a longo prazo evita recidivas; em casos atópicos, o manejo é individualizado e frequentemente contínuo.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-buckley-nuttall-2012-i',
      citationText:
        'Buckley L, Nuttall T. Feline eosinophilic granuloma complex(ities): some clinical clarification. J Feline Med Surg. 2012;14(7):471-481.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1177/1098612X12451549',
      notes: 'Classificação clínica, causas subjacentes e algoritmo diagnóstico-terapêutico.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-power-ihrke-1995',
      citationText: 'Power HT, Ihrke PJ. Selected feline eosinophilic skin diseases. Vet Clin North Am Small Anim Pract. 1995;25(4):833-850.',
      sourceType: 'Revisão',
      url: null,
      notes: 'Descrição clássica das três morfologias e diferenciais.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-nelson-couto-2020-egc',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — Diseases of the Skin (dermatoses eosinofílicas felinas).',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Contexto clínico geral, associação com hipersensibilidades.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-bsava-dermatologia',
      citationText: 'Jackson H, Marsella R (eds). BSAVA Manual of Canine and Feline Dermatology, 4th ed., 2021 — cap. dermatoses eosinofílicas felinas.',
      sourceType: 'Manual especializado',
      url: null,
      notes: 'Protocolos diagnósticos e terapêuticos práticos, incluindo ciclosporina.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-taglinger-2007',
      citationText:
        'Taglinger K, Day MJ, Foster AP. Characterization of inflammatory cell infiltration in feline allergic skin disease. J Comp Pathol. 2007;137(4):211-223.',
      sourceType: 'Estudo histopatológico',
      url: 'https://doi.org/10.1016/j.jcpa.2007.08.001',
      notes: 'Caracterização do infiltrado eosinofílico/mastocitário nas dermatoses alérgicas felinas.',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
