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
    'Infecção por micoplasmas sem parede que aderem à superfície das hemácias → hemólise principalmente extravascular (esplenomegalia, regeneração). Em gatos, Mycoplasma haemofelis é o mais patogênico; Candidatus M. haemominutum costuma ser subclínico. Em cães, M. haemocanis é frequentemente assintomático até haver asplenia, imunossupressão ou coinfecção. Diagnóstico moderno: PCR em sangue. Tratamento: doxiciclina (atenção crítica à administração em gatos); marbofloxacina/pradofloxacina em esquemas selecionados; transfusão quando anemia ameaça vida. Triagem de doadores por PCR.',
  quickDecisionStrip: [
    'Gato anêmico regenerativo + febre/letargia: hemoplasmose no radar; M. haemofelis é o mais agressivo.',
    'Cão com anemia hemolítica exuberante: pensar asplenia, imunossupressão, babesiose/erliquiose.',
    'Esfregaco positivo ajuda; sensibilidade ruim — PCR é preferido.',
    'Nunca “dry pill” de doxiciclina em gato: água/suspensão/slurry pós-dose.',
    'Não tratar portador PCR+ assintomático de rotina (ABCD; Merck), exceto cenários especiais (doador, multicat, imunodeprimido).',
  ],
  quickSummaryRich: {
    lead:
      'Os hemoplasmas induzem remoção acelerada de eritrócitos “marcados” pelo parasitismo superficial e resposta imune. A parasitemia pode ser cíclica — hematócrito e esfregaco variam rapidamente. O manejo integra suporte (transfusão), antimicrobiano e decisão informada sobre tentativa de clearance vs portador crônico.',
    leadHighlights: ['PCR', 'hemólise', 'doxiciclina', 'gato'],
    pillars: [
      {
        title: 'Gato vs cão',
        body:
          'Felino: doença clássica e guideline ABCD robusto. Canino: clínica mais rara em imunocompetente com baço; investigar causa de imunocomprometimento e coinfecções.',
        highlights: ['ABCD', 'baço'],
      },
      {
        title: 'Segurança medicamentosa',
        body:
          'Doxiciclina em felino exige técnica que evite esofagite/estenose (August’s; Plumb’s).',
        highlights: ['esofagite'],
      },
      {
        title: 'Banco de sangue',
        body:
          'Doadores devem ser rastreados por PCR periodicamente — medida preventiva mais sólida em hospital.',
        highlights: ['PCR', 'doador'],
      },
    ],
    diagnosticFlow: {
      title: 'Diagnóstico',
      steps: [
        { label: 'Contexto', detail: 'Anemia regenerativa; exposição; doador; asplenia (cão).' },
        { label: 'Hemograma + esfregaco', detail: 'Regeneração; organismos se sorte.' },
        { label: 'PCR sangue', detail: 'Preferido; diferencia espécies.' },
        { label: 'FeLV/FIV (gato)', detail: 'Muda gravidade e prognóstico.' },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento',
      steps: [
        { label: 'Estabilizar', detail: 'Oxigénio, fluido criterioso, transfusão se grave.' },
        { label: 'Doxiciclina 2–4 sem', detail: '10 mg/kg q24h ou 5 mg/kg q12h; prolongar se objetivo clearance.' },
        { label: 'Persistência PCR+', detail: 'Estratégias com marbofloxacina (ABCD/Plumb’s).' },
        { label: 'Corticoide', detail: 'Não de base; exceção se IMHA dominante não responsiva ao ATB.' },
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
    'Anemia hemolítica regenerativa → palidez, fraqueza, taquicardia/taquipneia; icterícia e esplenomegalia quando hemólise rápida/intensa. Febre e letargia por inflamação sistémica (agudo felino clássico com M. haemofelis).',
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
          'Deteção precoce de disfagia/pain',
          'Se sinais esofágicos, reavaliar com veterinário',
        ],
      ],
    },
  },
  treatment: {
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
