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
      'Hemoplasma não é “só anemia regenerativa”: é infecção eritrocitária com ciclo parasitário que pode oscilar no sangue periférico, imitando IMHA primária ou piorando coinfecções vetoriais. O PCR fecha o diagnóstico etiológico quando o esfregaco falha; a doxiciclina funciona, mas no gato a rota de administração importa tanto quanto a dose. O tutor precisa entender que PCR positivo persistente pode significar portador — nem todo animal exige antibiótico eterno.',
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
          'Doxiciclina em felino: água ou slurry após comprimido, ou formulação líquida; esofagite por pílula seca é complicação evitável e documentada (August’s; Plumb’s).',
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
      title: 'Diagnóstico (ordem racional)',
      steps: [
        {
          label: '1. Compatibilidade e risco',
          detail:
            'Anemia regenerativa com icterícia ou esplenomegalia; história de doação, brigas, rua (gato) ou asplenia/coinfecção (cão). Não atribua regeneração apenas a “parasita intestinal” sem excluir hemólise.',
        },
        {
          label: '2. Hemograma e morfologia',
          detail:
            'Reticulócitos/regeneração; esfregaco: anéis, bastonetes ou “stippling” sugestivos — sensibilidade baixa; repetir se suspeita alta.',
        },
        {
          label: '3. PCR (preferido)',
          detail:
            'Sangue EDTA antes de antibiótico prolongado; painéis diferenciam M. haemofelis, haemominutum, turicensis, haemocanis. Quantitativo ajuda seguimento em pesquisa/protocolos.',
        },
        {
          label: '4. FeLV/FIV no gato',
          detail:
            'Coinfecção altera prognóstico e intensidade de monitorização; não substitui PCR para hemoplasma.',
        },
        {
          label: '5. Diferencial IMHA',
          detail:
            'Coombs, aglutinação, spherócitos — hemoplasma pode coexistir ou precipitar IMHA; corticoide não é primeira linha sem critério.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento (camadas)',
      steps: [
        {
          label: 'Camada 0 — Oxigenação e perfusão',
          detail:
            'Oxigênio se dispneia; fluidoterapia criteriosa (hemólise + sobrecarga); transfusão se Ht muito baixo ou hipóxia — não “esperar só antibiótico”.',
        },
        {
          label: 'Camada 1 — Doxiciclina',
          detail:
            '10 mg/kg q24h ou 5 mg/kg q12h VO 2–4 semanas; 4 semanas se objetivo clearance; técnica felina obrigatória.',
        },
        {
          label: 'Camada 2 — Fluoroquinolonas',
          detail:
            'Marbofloxacina ou sequências ABCD se falha/intolerância; pradofloxacina reservada a cenários específicos; enrofloxacina: risco retiniano felino.',
        },
        {
          label: 'Camada 3 — Corticoide',
          detail:
            'Só se componente imunomediado dominante após antibiótico adequado — não rotina “por anemia”.',
        },
        {
          label: 'Camada 4 — Portador assintomático',
          detail:
            'PCR+ sem clínica: não tratar de rotina (ABCD/Merck); exceções: doador, imunodeprimido, multicat com animais naïf.',
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
      'Hemólise imunomediada extravascular predominante; possível Coombs+, aglutinação — pode confundir com IMHA primária (hemoplasma como gatilho).',
    hemoCiclico:
      'Parasitemia cíclica: hematócrito pode colapsar quando há muitos organismos no sangue periférico e subir quando desaparecem — esfregaco “oscilante”.',
    hemoTransmissao:
      'Transfusão iatrogênica documentada; agressões/contaminação com sangue plausíveis; vertical possível. Vetores: evidência variável — carrapato experimental em cão; pulgas em gato com evidência fraca no guideline ABCD. Resumo honesto: sangue é comprovado; vetores naturais ainda debatidos em felinos.',
  },
  pathophysiology:
    'Anemia hemolítica regenerativa → palidez, fraqueza, taquicardia/taquipneia; icterícia e esplenomegalia quando a hemólise é rápida ou intensa. Febre e letargia por inflamação sistêmica (agudo felino clássico com M. haemofelis).\n\n' +
    'Dica de estudo: diferencie na prova hemólise extracelular com esplenomegalia (hemoplasma) de IMHA sem parasita — o PCR resolve a dúvida no paciente suspeito.',
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: ['Letargia, anorexia, febre (felino agudo); perda de peso.'],
    },
    {
      system: 'hematologic',
      findings: ['Anemia regenerativa; em gatos M. haemofelis pode ser fulminante; em cães clínica quando quebra de imunidade.'],
    },
    {
      system: 'hepatic',
      findings: ['Icterícia possível com hemólise intensa.'],
    },
    {
      system: 'lymphatic',
      findings: ['Esplenomegalia (remoção aumentada de eritrócitos alterados).'],
    },
  ],
  diagnosis: {
    hemoSuspeitaContexto:
      'Gato: anemia regenerativa + letargia/febre. Cão: anemia regenerativa + asplenia ou imunossupressão ou coinfecção. Sempre considerar em candidatos a doação e receptores.',
    hemoHemogramaEsfregaco:
      'Anemia regenerativa comum. Esfregaco: cocci/bastonetes/anéis na superfície eritrocitária (Vaden). Sensibilidade baixa; artefatos (Howell-Jolly, pontilhado basofílico) confundem.',
    hemoPcrPreferido:
      'PCR em sangue: método preferido (ABCD; Merck; Vaden) — mais sensível e específico que esfregaco; ajuda a especiar.',
    hemoCoinfeccoesBase:
      'Gato: testar FeLV/FIV. Cão: investigar Ehrlichia, Babesia, sepse, outras coinfecções se não esplenectomizado.',
    hemoPadraoOuroResumo:
      'Padrão ouro prático atual: PCR específica/quantitativa em sangue; esfregaco complementar quando positivo.',
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
    ordemDePrioridade: [
      '1) Avaliar necessidade de transfusão e oxigenoterapia antes de “só iniciar doxiciclina” — anemia aguda felina pode deteriorar em horas.',
      '2) Iniciar doxiciclina com técnica segura (felino); definir duração (2–4 semanas) conforme espécie, gravidade e objetivo de clearance.',
      '3) Repetir hemograma e, se disponível, PCR quantitativo em pontos acordados — interpretar queda de carga vs portador.',
      '4) Se falha clínica ou intolerância: transicionar para marbofloxacina ou esquema combinado segundo ABCD/centro.',
      '5) Triagem de doadores e educação do tutor sobre recidiva, brigas e novas transfusões.',
    ],
    monitoramento: [
      'Hematócrito 24–48 h após início se grave; depois semanal até estabilizar.',
      'Apetite, icterícia, esplenomegalia ao toque (se cooperativo).',
      'Sinais de esofagite se doxiciclina oral em felino (salivação, regurgitação, dor).',
      'FeLV/FIV: reavaliar se novo declínio imunológico.',
    ],
    hemoEstabilizar:
      'Anemia grave com dispneia, prostração ou choque: suporte primeiro — transfusão quando indicada (Merck; ABCD). Eritrócitos transfundidos podem estar infectados; monitorizar.',
    hemoDoxiciclina: {
      kind: 'clinicalTable',
      headers: ['Espécie / situação', 'Dose', 'Duração'],
      rows: [
        [
          'Gato — M. haemofelis (Plumb’s / ABCD)',
          '10 mg/kg PO q24h ou 5 mg/kg PO q12h',
          '2–4 semanas; 4 semanas se objetivo maximizar clearance; casos simples podem responder em 2 semanas',
        ],
        [
          'Cão — hemoplasma',
          '10 mg/kg PO q24h ou 5 mg/kg PO q12h (Nelson para micoplasmas)',
          'Individualizar com PCR clínica; relatos com qPCR prolongando até negativação',
        ],
      ],
    },
    hemoAlternativasAbcd:
      'Se falha/intolerância: marbofloxacina 2,75 mg/kg q24h 14–28 d (Plumb’s); esquemas com 28 d doxiciclina seguidos de marbofloxacina 2 mg/kg q24h × 14 d se PCR persistente (ABCD; Plumb’s). Pradofloxacina: único ATB com clearance experimental documentada de M. haemofelis em estudo experimental citado no Plumb’s — reserva para refratários, uso criterioso de fluoroquinolona. Enrofloxacina: cautela por toxicidade retiniana felina.',
    hemoCorticoides:
      'ABCD: não recomendar corticoides salvo IMHA associada não responsiva ao ATB adequado. Merck: glicocorticoides podem reduzir eritrofagocitose em hemólise extrema — exceção, não rotina.',
    hemoPrevencaoPortador:
      'ABCD e Merck: não tratar rotineiramente PCR+ assintomático — esquemas não garantem eliminação e muitos permanecem portadores. Exceções: doadores, multicat com naïves, imunodeprimidos, casos graves/recorrentes.',
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
