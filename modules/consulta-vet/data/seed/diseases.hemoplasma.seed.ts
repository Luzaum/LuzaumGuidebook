import { DiseaseRecord } from '../../types/disease';

/** Micoplasmas hemotróficos (hemoplasmas); foco clínico felino (M. haemofelis etc.) com bloco canino; + nota M. felis respiratório/oculor. */
export const micoplasmosesHemotropicasRecord: DiseaseRecord = {
  id: 'disease-micoplasmoses-hemotropicas',
  slug: 'micoplasmoses-hemotropicas',
  title: 'Micoplasmoses hemotrópicas (hemoplasmas) em pequenos animais',
  synonyms: [
    'Hemoplasma',
    'Hemoplasmosis',
    'Mycoplasma haemofelis',
    'Mycoplasma haemocanis',
    'Anemia infecciosa felina',
  ],
  species: ['cat', 'dog'],
  category: 'infecciosas',
  tags: [
    'PCR',
    'Doxiciclina',
    'Anemia hemolítica',
    'Transfusão',
    'Doador',
    'FeLV',
    'FIV',
  ],
  quickSummary:
    'Os hemoplasmas (micoplasmas hemotrópicos) são bactérias sem parede que aderem à membrana eritrocitária e alteram o destino da hemácia no baço e no fígado: predomina hemólise extravascular com anemia regenerativa, esplenomegalia e, no gato com Mycoplasma haemofelis, quadro agudo potencialmente fulminante (febre, icterícia, queda rápida do hematócrito). Candidatus M. haemominutum e Candidatus M. turicensis costumam ser menos dramáticos. No cão, M. haemocanis e agentes relacionados frequentemente permanecem subclínicos enquanto o baço remove parasitados “silenciosamente”; a doença franca aparece com asplenia congênica ou cirúrgica, imunossupressão, coinfecções (babesiose, erliquiose) ou iatrogenia transfusional. O diagnóstico contemporâneo privilegia PCR em sangue (EDTA), pois o esfregaco tem sensibilidade limitada e a parasitemia oscila. O tratamento de primeira linha é doxiciclina com técnica segura em felinos (evitar pílula “seca”); alternativas incluem marbofloxacina ou esquemas com pradofloxacina em refratários. Transfusão quando há hipóxia ou anemia vitalmente baixa; triagem PCR de doadores é pilar de biossegurança.',
  quickDecisionStrip: [
    'Gato anêmico regenerativo + febre/letargia: hemoplasmose no radar; M. haemofelis é o mais agressivo.',
    'Cão com anemia hemolítica exuberante: pensar asplenia, imunossupressão, babesiose/erliquiose.',
    'Esfregaco positivo ajuda; sensibilidade ruim — PCR é preferido.',
    'Nunca “dry pill” de doxiciclina em gato: água/suspensão/slurry pós-dose.',
    'Não tratar portador PCR+ assintomático de rotina (ABCD; Merck), exceto cenários especiais (doador, multicat, imunodeprimido).',
  ],
  quickSummaryRich: {
    lead:
      'Hemoplasma não é “só anemia regenerativa”: é infecção eritrocitária com ciclo parasitário que pode oscilar no sangue periférico, imitando AHIM primária ou piorando coinfecções vetoriais. O PCR fecha o diagnóstico etiológico quando o esfregaco falha; a doxiciclina funciona, mas no gato a rota de administração importa tanto quanto a dose. O tutor precisa entender que PCR positivo persistente pode significar portador — nem todo animal exige antibiótico eterno.',
    leadHighlights: ['PCR', 'hemólise', 'doxiciclina', 'ciclo', 'portador'],
    pillars: [
      {
        title: 'Gato vs cão',
        body:
          'Felino: M. haemofelis domina a gravidade aguda; FeLV/FIV pioram desfecho. Canino: pense hemoplasma quando há anemia hemolítica em cão esplenectomizado, politransfundido ou doente sistêmico — o baço competente mascara clínica.',
        highlights: ['FeLV', 'asplenia'],
      },
      {
        title: 'Segurança medicamentosa',
        body:
          'Doxiciclina em felino: água ou slurry após comprimido, ou fórmulação líquida; esofagite por pílula seca é complicação evitável e documentada (August’s; Plumb’s).',
        highlights: ['esofagite', 'slurry'],
      },
      {
        title: 'Banco de sangue e iatrogenia',
        body:
          'Doador PCR-negativo (e sorologia quando protocolo exige) reduz surtos nosocomiais. Documente lote e data de transfusão se anemia surge dias depois.',
        highlights: ['doador', 'transfusão'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Compatibilidade e risco',
          timing: 'Primeira consulta',
          detail:
            'Anemia regenerativa com icterícia ou esplenomegalia; história de doação, brigas, rua (gato) ou asplenia/coinfecção (cão). Não atribua regeneração apenas a parasita intestinal sem excluir hemólise (Nelson & Couto, 6ª ed.; ABCD/Merck).',
        },
        {
          label: 'Hemograma e morfologia',
          detail:
            'Reticulócitos/regeneração; esfregaço: anéis, bastonetes ou stippling sugestivos — sensibilidade baixa; repetir se suspeita alta (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'PCR (preferido)',
          detail:
            'Sangue EDTA antes de antibiótico prolongado; painéis diferenciam M. haemofelis, haemominutum, turicensis, haemocanis. Quantitativo ajuda seguimento (Nelson & Couto, 6ª ed.; ABCD/Merck).',
        },
        {
          label: 'FeLV/FIV no gato',
          detail:
            'Coinfecção altera prognóstico e intensidade de monitorização; não substitui PCR para hemoplasma (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Diferencial AHIM',
          timing: 'Anemia hemolítica com esferócitos/Coombs',
          detail:
            'Coombs, aglutinação, esferócitos — hemoplasma pode coexistir ou precipitar AHIM; corticoide não é primeira linha sem critério (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Oxigenação e perfusão',
          timing: 'Após estabilização',
          detail:
            'Oxigênio se dispneia; fluidoterapia criteriosa (hemólise + sobrecarga); transfusão se Ht muito baixo ou hipóxia — não esperar só antibiótico (Nelson & Couto, 6ª ed.; Merck).',
        },
        {
          label: 'Doxiciclina',
          dose: '10 mg/kg q24h ou 5 mg/kg q12h VO',
          duration: '2–4 semanas (4 semanas se objetivo clearance)',
          reassess: 'Hemograma e PCR conforme evolução',
          detail:
            'Primeira linha; técnica felina obrigatória — água/slurry após comprimido (Plumb\'s, 10ª ed.; ABCD/Merck).',
        },
        {
          label: 'Fluoroquinolonas',
          detail:
            'Marbofloxacina 2,75 mg/kg q24h 14–28 d ou sequências ABCD se falha/intolerância; pradofloxacina reservada a refratários; enrofloxacina: risco retiniano felino (ABCD/Merck; Plumb\'s, 10ª ed.).',
        },
        {
          label: 'Corticoide',
          detail:
            'Só se componente imunomediado dominante após antibiótico adequado — não rotina por anemia (Nelson & Couto, 6ª ed.; ABCD/Merck).',
        },
        {
          label: 'Portador assintomático',
          detail:
            'PCR+ sem clínica: não tratar de rotina; exceções: doador, imunodeprimido, multicat com animais naïf (ABCD/Merck).',
        },
      ],
    },
  },
  etiology: {
    hemoConceito:
      'Bactérias muito pequenas sem parede celular aderidas à hemácia — beta-lactâmicos classicamente inadequados. A hemácia torna-se alvo imunológico → hemólise (muitas vezes extravascular).',
    hemoEspeciesFelinas:
      'Gatos: Mycoplasma haemofelis (mais patogênico), Candidatus Mycoplasma haemominutum (frequentemente subclínico), Candidatus M. turicensis (patogenicidade menos clara).',
    hemoEspeciesCaninas:
      'Cães: Mycoplasma haemocanis clássico; também Candidatus Mycoplasma haematoparvum. Infecção frequentemente silenciosa em saudável; doença franca com asplenia/imunossupressão/coinfecção.',
  },
  epidemiology: {
    hemoGatos:
      'Guideline ABCD: maior risco em machos SRD, idosos, acesso à rua; coinfecção FeLV/FIV aumenta risco de doença clínica severa.',
    hemoCaes:
      'Doença clínica menos frequente que em gatos; Vaden e Merck alinham: clínica em asplenia/imunocomprometidos.',
  },
  pathogenesisTransmission: {
    hemoImunohemolise:
      'Hemólise imunomediada extravascular predominante; possível Coombs+, aglutinação — pode confundir com AHIM primária (hemoplasma como gatilho).',
    hemoCiclico:
      'Parasitemia cíclica: hematócrito pode colapsar quando há muitos organismos no sangue periférico e subir quando desaparecem — esfregaco “oscilante”.',
    hemoTransmissao:
      'Transfusão iatrogênica documentada; agressões/contaminação com sangue plausíveis; vertical possível. Vetores: evidência variável — carrapato experimental em cão; pulgas em gato com evidência fraca no guideline ABCD. Resumo honesto: sangue é comprovado; vetores naturais ainda debatidos em felinos.',
  },
  pathophysiology:
    'Anemia hemolítica regenerativa → palidez, fraqueza, taquicardia/taquipneia; icterícia e esplenomegalia quando a hemólise é rápida ou intensa. Febre e letargia por inflamação sistêmica (agudo felino clássico com M. haemofelis).',
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia, anorexia, febre e perda de peso',
          mechanism:
            'Citocinas inflamatórias e anemia reduzem reserva energética; M. haemofelis em gatos pode causar quadro agudo fulminante.',
          clinicalMeaning: 'Gato jovem ou adulto com anemia regenerativa + febre = suspeita alta.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Anemia regenerativa com palidez, taquicardia e taquipneia',
          mechanism:
            'Hemoplasmas aderem à membrana eritrocitária e desencadeiam destruição esplênica; ciclo parasitário cíclico pode causar picos de hemólise.',
          clinicalMeaning: 'Em cães, clínica costuma aparecer com asplenia ou imunossupressão.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'hepatic',
      findings: [
        {
          finding: 'Icterícia',
          mechanism:
            'Hemólise rápida eleva bilirrubina indirecta quando a destruição eritrocitária excede capacidade hepática de conjugação.',
          clinicalMeaning: 'Indica hemólise intensa; correlacionar com PCV e esfregaço.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'lymphatic',
      findings: [
        {
          finding: 'Esplenomegalia',
          mechanism:
            'Baço aumenta clearance de eritrócitos parasitados e alterados pela imunidade.',
          clinicalMeaning: 'Achado de suporte na palpação abdominal.',
          priority: 'uncommon',
        },
      ],
    },
  ],
  diagnosis: {
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Suspeita no contexto clínico',
        purpose: 'Identificar anemia regenerativa com sinais compatíveis e fatores de risco.',
        description:
          'Gato: anemia regenerativa + letargia/febre. Cão: anemia + asplenia, imunossupressão ou coinfecção. Considerar em doadores e receptores (Tasker et al., ABCD 2018).',
        interpretation: 'Anemia regenerativa isolada em gato de risco elevado suspeita hemoplasma.',
        limitations: 'Anemia tem múltiplas causas; não iniciar tratamento sem confirmação quando possível.',
      },
      {
        stepNumber: 2,
        title: 'Hemograma e esfregaço sanguíneo',
        purpose: 'Documentar anemia e buscar organismos na superfície eritrocitária.',
        description:
          'Anemia regenerativa comum. Esfregaço pode mostrar cocci/bastonetes/anéis (Vaden, 2013).',
        interpretation: 'Organismo visível confirma, mas sensibilidade é baixa.',
        limitations: 'Artefatos (Howell-Jolly, pontilhado basofílico) confundem; esfregaço negativo não exclui.',
      },
      {
        stepNumber: 3,
        title: 'PCR em sangue',
        purpose: 'Confirmar infecção e identificar espécie.',
        description:
          'Método preferido (ABCD; Merck; Vaden) — mais sensível e específico que esfregaço; permite especiar.',
        interpretation: 'PCR positiva confirma infecção ativa ou portador detectável.',
        limitations: 'Carga parasitária cíclica pode gerar falso-negativo pontual.',
        isGoldStandard: true,
      },
      {
        stepNumber: 4,
        title: 'Triagem de coinfecções',
        purpose: 'Identificar comorbidades que alteram prognóstico e tratamento.',
        description:
          'Gato: FeLV/FIV. Cão: Ehrlichia, Babesia, sepse conforme epidemiologia.',
        interpretation: 'Coinfecção explica resposta lenta ou quadro grave.',
        limitations: 'Testes adicionais aumentam custo; priorizar conforme exposição.',
      },
    ],
    hemoTabelaDoxiciclinaGatoAlerta: {
      kind: 'clinicalTable',
      headers: ['Cuidado (felino)', 'Porquê', 'Como fazer'],
      rows: [
        [
          'Nunca comprimido/cápsula “seco”',
          'Risco de esofagite e estenose esofágica',
          'Administrar com ≥5 mL água após pílula ou usar suspensão/slurry (Plumb’s; August’s)',
        ],
        [
          'Monitorar deglutição e apetite',
          'Detecção precoce de disfagia/dor',
          'Se sinais esofágicos, reavaliar com veterinário',
        ],
      ],
    },
  },
  treatment: {
    especifica: [
      'Tasker et al. (2018), nas diretrizes ABCD, recomendam doxiciclina como tratamento de primeira linha: 10 mg/kg VO q24h ou 5 mg/kg VO q12h por 2–4 semanas em gatos com M. haemofelis. Conclusão: em felinos, administrar com ≥5 mL de água após comprimido ou usar suspensão para evitar esofagite (Plumb\'s, 10ª ed.).',
      'Tasker et al. (2018) indicam marbofloxacina 2,75 mg/kg q24h por 14–28 dias como alternativa se falha ou intolerância à doxiciclina. Conclusão: reservar fluoroquinolona para casos selecionados.',
    ],
    suporte: [
      'Merck Veterinary Manual recomenda transfusão quando anemia grave com dispneia ou prostração — estabilizar antes de antibiótico isolado.',
      'ABCD desaconselha corticoides de rotina; reservar para AHIM associada não responsiva ao antibiótico adequado.',
    ],
    portador:
      'ABCD e Merck: não tratar rotineiramente PCR+ assintomático — esquemas não garantem eliminação e muitos permanecem portadores. Exceções: doadores, imunodeprimidos, casos graves/recorrentes.',
    monitoramento: [
      'Hematócrito 24–48 h após início se grave; depois semanal até estabilizar.',
      'Apetite, icterícia e sinais de esofagite se doxiciclina oral em felino.',
      'Repetir PCR quantitativo conforme objetivo de clearance versus manejo de portador.',
    ],
  },
  prevention: {
    hemoDoadoresPcr:
      'Triagem periódica de doadores por PCR (Vaden; Merck; ABCD).',
    hemoIatrogeniaVetores:
      'Material estéril, sem reuso indevido de agulhas; controle de ectoparasitas prudente; reduzir brigas/exposição a sangue em gatos de rua.',
    hemoMicoplasmaFelisRespiratorio:
      'Micoplasmose não hemotrópica: Mycoplasma felis pode associar-se a conjuntivite, rinite, traqueobronquite, pneumonia. August’s: micoplasmas podem ser comensais do trato superior — PCR/cultura positiva não igual a doença sem contexto; mais forte em vias inferiores, cultura pura ou resposta terapêutica. Tratamento típico: doxiciclina 10 mg/kg q24h ou 5 mg/kg q12h; alternativas marbofloxacina, pradofloxacina, azitromicina; duração prolongada (4–6 sem) para tecidos profundos/articulações conforme caso.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-abcd-hemo-2018',
      citationText:
        'Tasker S et al. Haemoplasmosis in cats: European guidelines from the ABCD on prevention and management. J Feline Med Surg. 2018.',
      sourceType: 'Guideline',
      url: 'https://journals.sagepub.com/home/jfm',
      notes: 'PCR preferido, doxiciclina, marbofloxacina, não tratar portador saudável.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-merck-hemotropic',
      citationText: 'Merck Veterinary Manual. Hemotropic Mycoplasma Infections in Animals.',
      sourceType: 'Revisão',
      url: 'https://www.merckvetmanual.com/',
      notes: 'Clínica felina vs canina, prognóstico, suporte.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-vaden-hemoplasma-2013',
      citationText: 'Vaden SL et al. Exames laboratoriais… Roca, 2013 — micoplasmas hemotróficos.',
      sourceType: 'Laboratório',
      url: null,
      notes: 'Esfregaco, ciclicidade, PCR.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-plumb-hemo-2023',
      citationText: 'Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — doxiciclina, marbofloxacina, pradofloxacina.',
      sourceType: 'Formulário',
      url: null,
      notes: 'Doses felinas e cuidados de administração.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-pitorri-haemocanis-2012',
      citationText: 'Pitorri F et al. Vet Clin Pathol. 2012. DOI 10.1111/vcp.12002 — doxiciclina e qPCR em cão.',
      sourceType: 'Caso clínico',
      url: null,
      notes: 'Monitorização molecular canina.',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-august-feline-mycoplasma',
      citationText: "August's Consultations in Feline Internal Medicine, Vol. 7 — infecções micoplasmicas respiratórias/oculares.",
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Colonização vs doença; terapia prolongada.',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
