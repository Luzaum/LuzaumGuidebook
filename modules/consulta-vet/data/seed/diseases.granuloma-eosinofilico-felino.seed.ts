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
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Reconhecimento morfológico',
          timing: 'Primeira consulta',
          detail:
            'Identificar qual(is) das três apresentações clássicas — úlcera indolente labial, placa eosinofílica ventral/inguinal ou granuloma linear em coxa/coxim/cavidade oral (Power & Ihrke, 1995; Buckley & Nuttall, 2012).',
        },
        {
          label: 'Citologia da lesão',
          timing: 'Na primeira avaliação',
          detail:
            'Impressão ou aspirado revela eosinófilos predominantes, por vezes com mastócitos — sustenta o padrão de reação sem definir a causa (Taglinger et al., 2007; BSAVA Manual of Dermatology, 4ª ed.).',
        },
        {
          label: 'Investigação da causa de base',
          timing: 'Antes de rotular idiopático',
          detail:
            'Controle terapêutico de pulgas por 6–8 semanas em todos os animais do domicílio; se não resolver, dieta de eliminação estrita por 8 semanas com proteína nova/hidrolisada; considerar atopia se ambas forem negativas (Buckley & Nuttall, 2012; Nelson & Couto, 6ª ed.).',
          reassess: 'Não concluir componente alimentar antes de completar 8 semanas de dieta estrita.',
        },
        {
          label: 'Biópsia (casos atípicos)',
          timing: 'Lesão refratária ou atípica',
          detail:
            'Reservada a lesões que não respondem ao tratamento esperado, apresentação atípica, idade incomum ou suspeita neoplásica (carcinoma espinocelular em úlceras labiais crônicas) (Power & Ihrke, 1995; BSAVA Manual of Dermatology, 4ª ed.).',
        },
        {
          label: 'Diferenciais obrigatórios',
          timing: 'Antes de fechar diagnóstico',
          detail:
            'Neoplasia cutânea/oral, infecção fúngica profunda, herpesvirose felina com componente cutâneo, outras dermatites eosinofílicas (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Controle de pulgas',
          detail:
            'Adulticida de ação rápida e residual em todos os animais do domicílio, inclusive assintomáticos — base obrigatória de qualquer protocolo, mesmo sem prova direta de pulicose (Buckley & Nuttall, 2012).',
          duration: 'Contínuo; manter 6–8 semanas mínimo antes de concluir falha.',
          reassess: 'Adesão e eficácia do controle em todos os animais — falha aqui é causa comum de recidiva.',
        },
        {
          label: 'Controle agudo da lesão',
          detail:
            'Glicocorticoide sistêmico (prednisolona) em dose anti-inflamatória a imunossupressora conforme extensão e gravidade, enquanto investiga causa de base (BSAVA Manual of Dermatology, 4ª ed.; Nelson & Couto, 6ª ed.).',
          dose: 'Prednisolona VO — preferir sobre prednisona em gatos; dose anti-inflamatória a imunossupressora conforme gravidade, com desmame gradual.',
          duration: 'Semanas até controle clínico; desmame gradual após resposta.',
          reassess: 'Extensão, aspecto e prurido a cada revisão; fotos seriadas quando possível.',
        },
        {
          label: 'Investigação alimentar e ambiental',
          detail:
            'Dieta de eliminação estrita por 8 semanas com proteína nova ou hidrolisada quando pulgas controladas não resolvem; testes de atopia se ambas investigações negativas (Buckley & Nuttall, 2012).',
          duration: 'Mínimo 8 semanas de dieta estrita sem contaminação cruzada.',
          reassess: 'Reavaliar lesão e prurido ao final do período antes de concluir ausência de componente alimentar.',
        },
        {
          label: 'Manutenção crônica ou refratariedade',
          detail:
            'Ciclosporina como alternativa eficaz para casos recorrentes, crônicos ou intolerantes a corticoide prolongado; resposta pode levar semanas (BSAVA Manual of Dermatology, 4ª ed.).',
          duration: 'Manutenção conforme resposta; monitorar função renal e hemograma.',
          reassess: 'Hemograma e função renal periódicos sob ciclosporina.',
        },
        {
          label: 'Casos refratários graves',
          detail:
            'Clorambucila ou outros imunomoduladores em casos selecionados após falha das medidas anteriores; atenção especial a granuloma oral/faríngeo com estridor ou disfagia (BSAVA Manual of Dermatology, 4ª ed.).',
          reassess: 'Monitorização hematológica próxima — risco de mielossupressão.',
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
        {
          finding: 'Úlcera indolente: lesão ulcerada no lábio superior, tipicamente não dolorosa',
          mechanism:
            'Degranulação de eosinófilos libera proteína básica principal e outros mediadores citotóxicos que causam necrose colagenolítica focal na mucosa labial.',
          clinicalMeaning: 'Morfologia clássica — aparência alarmante, mas dor tipicamente ausente; diferenciar de neoplasia.',
          priority: 'common',
        },
        {
          finding: 'Placa eosinofílica: placa exsudativa pruriginosa em abdome ventral ou face medial de coxas',
          mechanism:
            'Infiltrado eosinofílico cutâneo com hiperemia e exsudação; prurido de base (pulga, alimento, atopia) leva a lambedura que perpetua lesão.',
          clinicalMeaning: 'Intensamente pruriginosa — controle de pulgas é obrigatório mesmo sem prova direta.',
          priority: 'common',
        },
        {
          finding: 'Granuloma linear/eosinofílico: cordões firmes amarelo-rosados em coxa, coxim ou lábios',
          mechanism:
            'Reação granulomatosa organizada ao infiltrado eosinofílico crônico na derme/subcutâneo.',
          clinicalMeaning: 'Pode coexistir com outras morfologias no mesmo paciente.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'oral',
      findings: [
        {
          finding: 'Granuloma oral/faríngeo com halitose, disfagia, sialorreia ou estridor',
          mechanism:
            'Infiltrado eosinofílico extenso em língua, palato ou faringe reduz lúmen de via aérea superior e dificulta deglutição.',
          clinicalMeaning: 'Variante clinicamente relevante — risco de obstrução parcial; não retardar tratamento sistêmico.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'behavioral',
      findings: [
        {
          finding: 'Lambedura e automutilação',
          mechanism:
            'Prurido da hipersensibilidade de base leva a trauma mecânico repetido, especialmente em placa eosinofílica acessível.',
          clinicalMeaning: 'Tratar causa alérgica de base; corticoide alivia lesão mas não substitui controle de pulgas/alimento.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticPlanStepByStep: [
      {
        stepNumber: 1,
        title: 'Reconhecimento morfológico',
        purpose: 'Identificar padrão de reação eosinofílica cutaneomucosa.',
        description:
          'Úlcera indolente labial, placa eosinofílica ventral/inguinal ou granuloma linear em coxa/coxim/cavidade oral (Power & Ihrke, 1995; Buckley & Nuttall, 2012).',
        interpretation: 'Morfologia clássica direciona fortemente diagnóstico presuntivo.',
        limitations: 'EGC é padrão de reação, não diagnóstico etiológico final.',
      },
      {
        stepNumber: 2,
        title: 'Citologia da lesão',
        purpose: 'Confirmar infiltrado eosinofílico.',
        description:
          'Impressão ou aspirado revela eosinófilos predominantes, por vezes com mastócitos (Taglinger et al., 2007; BSAVA Manual of Dermatology, 4ª ed.).',
        interpretation: 'Eosinofilia sustenta padrão de reação sem definir causa subjacente.',
        limitations: 'Citologia normal não exclui EGC em lesão superficialmente cicatrizada.',
      },
      {
        stepNumber: 3,
        title: 'Investigação da causa de base',
        purpose: 'Evitar recidiva tratando apenas a lesão.',
        description:
          'Controle terapêutico de pulgas 6–8 semanas em todos os animais do domicílio; se não resolver, dieta de eliminação 8 semanas; considerar atopia se ambas negativas (Buckley & Nuttall, 2012).',
        interpretation: 'DAPP é gatilho mais comum; resposta a dieta confirma componente alimentar.',
        limitations: 'Não concluir ausência de componente alimentar antes de 8 semanas de dieta estrita.',
      },
      {
        stepNumber: 4,
        title: 'Biópsia (casos atípicos)',
        purpose: 'Excluir neoplasia ou diferencial histológico.',
        description:
          'Reservada a lesões refratárias, atípicas ou com suspeita neoplásica (carcinoma espinocelular em úlcera labial crônica) (Power & Ihrke, 1995).',
        interpretation: 'Histopatologia mostra infiltrado eosinofílico com "flame figures".',
        limitations: 'Não necessária na maioria dos casos morfologicamente típicos.',
      },
      {
        stepNumber: 5,
        title: 'Diferenciais obrigatórios',
        purpose: 'Excluir condições que mimetizam EGC.',
        description:
          'Neoplasia cutânea/oral, infecção fúngica profunda, herpesvirose felina com componente cutâneo (Nelson & Couto, 6ª ed.).',
        interpretation: 'Lesão labial crônica refratária exige citologia/biópsia para excluir carcinoma.',
        limitations: 'Aparência clássica reduz necessidade de biópsia, mas não elimina diferenciais neoplásicos.',
      },
    ],
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
    cronica: [
      'Buckley & Nuttall (2012), em revisão sobre complexo do granuloma eosinofílico felino, concluem que controle rigoroso de pulgas em todos os animais do domicílio é obrigatório em todo caso, mesmo sem prova direta de pulicose — falha aqui é causa comum de recidiva aparente.',
      'BSAVA Manual of Dermatology (4ª ed., 2021) descreve prednisolona oral em dose anti-inflamatória a imunossupressora conforme extensão da lesão, com desmame gradual — preferir prednisolona sobre prednisona em gatos.',
      'Buckley & Nuttall (2012) recomendam dieta de eliminação estrita por mínimo 8 semanas com proteína nova ou hidrolisada quando pulgas controladas não resolvem — evitar contaminação cruzada que invalida o teste.',
      'BSAVA Manual of Dermatology (4ª ed., 2021) cita ciclosporina como alternativa eficaz para manutenção crônica, casos recorrentes ou intolerância a corticoide prolongado; resposta pode levar semanas — monitorar função renal e hemograma.',
    ],
    aguda: [
      'Granuloma oral/faríngeo extenso com estridor ou disfagia: iniciar glicocorticoide sistêmico sem retardar enquanto investiga causa de base; considerar encaminhamento especializado para suporte de via aérea (BSAVA Manual of Dermatology, 4ª ed.).',
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
  relatedMedicationSlugs: ['prednisolona', 'clorambucil'],
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
