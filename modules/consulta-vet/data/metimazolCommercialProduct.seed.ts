import type { CommercialMedicationProduct } from '../types/commercialMedication';

const METIMAZOL_PRICE_SOURCE_DATE = '2026-10-06';

const METIMAZOL_PLUMBS_CONTEXT =
  'Plumb’s Veterinary Drug Handbook 10ª ed., monografia “Methimazole” (pp. 849–851 / PDF pp. 876–878): tionamida antitireoidiana que inibe reversivelmente a tireoperoxidase (TPO), bloqueando a síntese de T4 e T3. Indicação padrão-ouro no hipertireoidismo felino (dose inicial de 2,5 mg/gato VO q12h; conservador: 1,25 mg q12h; transdérmico lipofílico: 2,5 a 5 mg q12h). Diretrizes AAHA 2023 e AAFP reforçam o alvo de TT4 na metade inferior do intervalo de referência (1,0 a 2,5 µg/dL). Destaca-se que o metimazol controla a produção hormonal mas não erradica o adenoma tireoidiano, o qual continua progredindo morfologicamente com os anos (Peterson et al. 2016). Cautela vital com o hipotireoidismo iatrogênico, o qual induz queda de TFG e azotemia em 57% dos gatos (Williams et al. 2010).';

const METIMAZOL_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E ADMINISTRAÇÃO: 1) NÃO CURA A DOENÇA: o metimazol não destrói o adenoma tireoidiano nem impede o crescimento volumétrico do tecido nodular ao longo dos anos; o tratamento curativo definitivo é o Iodo Radioativo (¹³¹I); 2) NÃO SUBTRATAR HIPERTIREOIDISMO PARA PROTEGER CREATININA: a subida de creatinina pós-tratamento decorre da reversão da hiperfiltração e desmascaramento da DRC real; 3) EVITAR HIPOTIREOIDISMO IATROGÊNICO: superdosagem deprime o fluxo renal, precipita azotemia em 57% dos gatos e reduz a sobrevida mediana de 905 para 456 dias; 4) MONITORIZAÇÃO HEMATOLÓGICA PRECOCE: realizar hemograma nas primeiras semanas (suspender se agranulocitose, neutropenia profunda ou trombocitopenia); 5) SUSPENDER SE PRURIDO FACIAL OU HEPATOPATIA: prurido intenso com automutilação em face/pescoço ou icterícia/hepatotoxicidade exigem suspensão imediata e definitiva; 6) SEGURANÇA OCUPACIONAL: teratogênico (aplasia cutis e atresia de coanas); mulheres grávidas ou tentando engravidar não devem manipular comprimidos partidos nem o gel transdérmico sem luvas protetoras.';

export const metimazolCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'felimazole-dechra-comp-2-5mg',
    slug: 'felimazole-2-5mg',
    name: 'Felimazole® 2,5 mg Comprimidos Revestidos (Dechra)',
    manufacturer: 'Dechra Brasil Produtos Veterinários Ltda.',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_thyroid',
    commercialSubclasses: ['endocrine_thyroid'],
    productPageUrl: 'https://www.dechra.com.br/produtos/felimazole',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/methimazole/PNG',
    species: ['cat'],
    presentations: [
      'Felimazole® 2,5 mg comprimidos revestidos redondos vermelhos pequenos — frasco plástico de segurança contendo 100 comprimidos (Registro MAPA PR 000007-8.000011)',
    ],
    activeComponents: [
      'tiamazol (metimazol) 2,5 mg por comprimido revestido',
    ],
    searchAliases: [
      'felimazole',
      'felimazole 2.5',
      'felimazole 2,5mg',
      'metimazol',
      'tiamazol',
      'methimazole',
      'dechra',
      'hipertireoidismo felino',
    ],
    labelCompositionSummary:
      'Cada comprimido revestido de 2,5 mg contém: Tiamazol (Metimazol) 2,5 mg; excipientes q.s.p. 1 comprimido (óxido de ferro vermelho, dióxido de titânio, lactose e polímeros de revestimento). Frasco com tampa de segurança resistente a crianças contendo 100 comprimidos.',
    labelDirections:
      'Uso oral exclusivo em felinos. Dose inicial recomendada: 2,5 mg por gato por via oral a cada 12 horas (q12h). Administrar o comprimido inteiro, sem mastigar, partir ou esmagar. Reavaliar o T4 total sérico, hemograma, função renal e hepática em 2 a 3 semanas.',
    dosageGuidance: {
      labelDose:
        'Gatos: 2,5 mg por gato VO a cada 12 horas (q12h). Em pacientes idosos ou frágeis, considerar 1,25 mg q12h.',
      plumbs: {
        cat: [
          {
            title: 'Hipertireoidismo Felino Inicial — Protocolo Padrão Ouro BID (Trepanier et al. 2003 / Plumb’s 10ª ed.)',
            dose: '2,5 mg por gato VO a cada 12 horas (q12h)',
            note: 'Administração q12h produz eutireoidismo em 87% vs 54% com q24h. Reavaliar em 2 a 3 semanas.',
          },
          {
            title: 'Introdução Conservadora / Pacientes com DRC Limítrofe (Consenso AAHA 2023)',
            dose: '1,25 mg por gato VO a cada 12 horas (ou 1,25–2,5 mg q24h na 1ª semana)',
            note: 'Minimiza quedas abruptas de filtração glomerular em gatos nefropatas limítrofes ou geriátricos.',
          },
          {
            title: 'Estabilização Pré-Operatória (Pré-Tireoidectomia)',
            dose: '2,5 mg por gato VO a cada 12 horas por 2 a 4 semanas',
            note: 'Restaura eutireoidismo antes da cirurgia para minimizar arritmias e colapso cardíaco.',
          },
        ],
      },
      notes: [
        'Nunca partir o comprimido revestido: risco de subdosagem e absorção dérmica pelo tutor.',
        'Pode ser administrado com pequena porção de comida para mitigar náusea e gosto amargo.',
        'Reavaliar TT4, hemograma completo, perfil renal e hepático a cada 2 a 4 semanas na titulação.',
        'Mulheres grávidas não devem manusear os comprimidos nem a bandeja sanitária.',
      ],
    },
    plumbsContext: METIMAZOL_PLUMBS_CONTEXT,
    clinicalUse:
      'Medicamento veterinário padrão-ouro com registro específico no MAPA para tratamento de longa duração do hipertireoidismo felino e estabilização pré-operatória antes da tireoidectomia cirúrgica.',
    reassessment:
      'Reavaliar T4 total sérico, hemograma completo com contagem de plaquetas, creatinina, ureia e enzimas hepáticas às 2 a 3 semanas pós-início, repetindo nas semanas 6, 10 e 20.',
    prescriptionExample:
      'Felimazole 2,5 mg (tiamazol/metimazol) — Frasco com 100 comprimidos revestidos. Administrar 1 comprimido por via oral a cada 12 horas continuamente. Não partir.',
    safetyAlert: METIMAZOL_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 385,00',
      rangeLabel: 'R$ 366,61 a R$ 407,34 (frasco com 100 comprimidos)',
      sourceDate: METIMAZOL_PRICE_SOURCE_DATE,
      notes: 'Preço verificado no varejo veterinário oficial / Minha Dechra Brasil (outubro/2026).',
    },
    evidenceLevel:
      'Nível 1a — Ensaio clínico randomizado (Trepanier 2003), Bula MAPA Felimazole®, Plumb’s 10ª ed. e BSAVA 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:metimazol',
  },
  {
    id: 'felimazole-dechra-comp-5mg',
    slug: 'felimazole-5mg',
    name: 'Felimazole® 5 mg Comprimidos Revestidos (Dechra)',
    manufacturer: 'Dechra Brasil Produtos Veterinários Ltda.',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_thyroid',
    commercialSubclasses: ['endocrine_thyroid'],
    productPageUrl: 'https://www.dechra.com.br/produtos/felimazole',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/methimazole/PNG',
    species: ['cat'],
    presentations: [
      'Felimazole® 5 mg comprimidos revestidos redondos laranjas — frasco plástico de segurança contendo 100 comprimidos (Registro MAPA PR 000007-8.000012)',
    ],
    activeComponents: [
      'tiamazol (metimazol) 5,0 mg por comprimido revestido',
    ],
    searchAliases: [
      'felimazole 5mg',
      'felimazole 5',
      'metimazol 5mg',
      'tiamazol 5mg',
      'dechra 5mg',
      'hipertireoidismo felino severo',
    ],
    labelCompositionSummary:
      'Cada comprimido revestido de 5 mg contém: Tiamazol (Metimazol) 5,0 mg; excipientes q.s.p. 1 comprimido (óxido de ferro amarelo, dióxido de titânio, lactose e polímeros de revestimento). Frasco contendo 100 comprimidos.',
    labelDirections:
      'Uso oral exclusivo em felinos com hipertireoidismo que necessitam de doses maiores para controle da tireotoxicose. Administrar 5 mg por gato VO a cada 12 horas ou conforme titulação laboratorial. Não partir os comprimidos.',
    dosageGuidance: {
      labelDose:
        'Gatos com hipertireoidismo refratário ou T4 muito alto: 5 mg por gato VO q12h. Dose máxima diária de bula: 20 mg/gato/dia.',
      plumbs: {
        cat: [
          {
            title: 'Hipertireoidismo Felino Severo com T4 Extremamente Alto (>15–20 µg/dL)',
            dose: '3,75 a 5,0 mg por gato VO a cada 12 horas (q12h)',
            note: 'Monitorar hemograma e função renal rigorosamente. Se doses progressivas falharem, indicar ¹³¹I.',
          },
        ],
      },
      notes: [
        'Dose máxima de bula: 20 mg/gato/dia (nunca ultrapassar 10 mg por administração individual).',
        'Se a necessidade de dose for crescente (>10–15 mg/dia), investigar tecido ectópico intratorácico ou carcinoma.',
      ],
    },
    plumbsContext: METIMAZOL_PLUMBS_CONTEXT,
    clinicalUse:
      'Formulação veterinária de concentração dobrada, indicada para pacientes felinos com níveis maciços de T4 sérico ou que necessitam de aumento progressivo de dose durante o tratamento prolongado.',
    reassessment:
      'Reavaliar TT4 a cada 2 a 3 semanas até controle da tireotoxicose. Investigar neoplasia invasiva se TT4 persistir elevado.',
    prescriptionExample:
      'Felimazole 5 mg (tiamazol/metimazol) — Frasco com 100 comprimidos revestidos. Administrar 1 comprimido por via oral a cada 12 horas. Não partir.',
    safetyAlert: METIMAZOL_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 630,00',
      rangeLabel: 'R$ 580,00 a R$ 680,00 (frasco com 100 comprimidos)',
      sourceDate: METIMAZOL_PRICE_SOURCE_DATE,
      notes: 'Preço médio de mercado verificado em distribuidores veterinários especializados (outubro/2026).',
    },
    evidenceLevel: 'Nível 2 — Plumb’s 10ª ed., BSAVA 10ª ed. e Bula Felimazole® Dechra',
    isControlled: false,
    catalogMedicationId: 'editorial:metimazol',
  },
  {
    id: 'tapazol-aspen-biolab-comp-5mg',
    slug: 'tapazol-5mg',
    name: 'Tapazol® 5 mg Comprimidos (Biolab Sanus / Aspen)',
    manufacturer: 'Aspen Pharma / Biolab Sanus Farmacêutica Ltda.',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_thyroid',
    commercialSubclasses: ['endocrine_thyroid'],
    productPageUrl: 'https://bula.com.br/original/tapazol',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/methimazole/PNG',
    species: ['cat', 'dog'],
    presentations: [
      'Tapazol® 5 mg comprimidos simples — caixa contendo 100 comprimidos (linha humana / uso veterinário extralabel)',
    ],
    activeComponents: [
      'tiamazol (metimazol) 5,0 mg por comprimido',
    ],
    searchAliases: [
      'tapazol',
      'tapazol 5mg',
      'metimazol humano',
      'tiamazol humano',
      'biolab',
      'aspen',
    ],
    labelCompositionSummary:
      'Cada comprimido contém 5,0 mg de tiamazol. Excipientes: amido, lactose monoidratada, estearato de magnésio e talco. Caixa com 100 comprimidos.',
    labelDirections:
      'Uso veterinário extra-bula (extralabel): Em gatos, administrar 2,5 mg a 5 mg VO a cada 12 horas. Em cães com neoplasia funcional da tireoide, administrar 0,1 mg/kg VO a cada 12 horas.',
    dosageGuidance: {
      labelDose:
        'Gatos: 2,5 mg (1/2 comprimido se permitir partição estrita) a 5 mg VO q12h. Cães: 0,1 mg/kg VO q12h.',
      plumbs: {
        cat: [
          {
            title: 'Hipertireoidismo Felino (Extralabel Humano)',
            dose: '2,5 mg VO q12h (iniciar com 1,25–2,5 mg q12h)',
            note: 'Opção de menor custo quando a formulação veterinária Felimazole® não estiver acessível.',
          },
        ],
        dog: [
          {
            title: 'Carcinoma Tireoidiano Funcional Canino (Ponte Estabilizadora)',
            dose: '0,1 mg/kg VO a cada 12 horas (q12h) [faixa de 2,5 a 5 mg total por cão]',
            note: 'Usado como ponte para tireoidectomia ou ablação com ¹³¹I. Não cura o tumor primário.',
          },
        ],
      },
      notes: [
        'Atenção ao fracionamento manual do comprimido humano: risco de variações de dose e contaminação do ambiente doméstico.',
        'Prescrição sob receita simples veterinária.',
      ],
    },
    plumbsContext: METIMAZOL_PLUMBS_CONTEXT,
    clinicalUse:
      'Apresentação farmacêutica humana prescrita extralabel para pequenos animais em casos de necessidade de menor custo ou indisponibilidade temporária de produtos veterinários específicos.',
    reassessment:
      'Reavaliar TT4 e exames laboratoriais a cada 2 a 4 semanas. Cautela com pó residual durante fracionamento.',
    prescriptionExample:
      'Tapazol 5 mg (tiamazol) — Caixa com 100 comprimidos. Para gato: Administrar meio (1/2) comprimido por via oral a cada 12 horas.',
    safetyAlert: METIMAZOL_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 62,00',
      rangeLabel: 'R$ 50,00 a R$ 75,00 (caixa com 100 comprimidos)',
      sourceDate: METIMAZOL_PRICE_SOURCE_DATE,
      notes: 'Preço verificado em drogarias e farmácias comerciais humanas brasileiras (outubro/2026).',
    },
    evidenceLevel: 'Nível 2 — Plumb’s 10ª ed. e BSAVA 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:metimazol',
  },
  {
    id: 'metimazol-gel-transdermico-magistral',
    slug: 'metimazol-gel-transdermico',
    name: 'Metimazol Gel Lipofílico Transdérmico 25 mg/mL (Manipulação Veterinária)',
    manufacturer: 'Farmácias Magistrais Veterinárias Especializadas',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_thyroid',
    commercialSubclasses: ['endocrine_thyroid'],
    productPageUrl: 'https://vetsmart.com.br/cg/produto/6192/metimazol-ligvet',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/methimazole/PNG',
    species: ['cat'],
    presentations: [
      'Gel lipofílico transdérmico 25 mg/mL (ou 50 mg/mL) em frasco dosador tipo caneta aplicadora (Click) ou seringa dosadora sem agulha de 1 mL com graduações de 0,1 mL (0,1 mL = 2,5 mg)',
    ],
    activeComponents: [
      'metimazol 25 mg/mL veiculado em base transdérmica lipofílica de alta penetração cutânea',
    ],
    searchAliases: [
      'metimazol transdermico',
      'metimazol gel',
      'metimazol orelha',
      'metimazol manipulado',
      'tiamazol transdermico',
      'gel lipofilico metimazol',
    ],
    labelCompositionSummary:
      'Metimazol ativo micronizado a 2,5% (25 mg/mL) incorporado em base dérmica lipofílica de permeação transcutânea otimizada. Frasco aplicador de 30 mL ou seringas dosadoras individuais.',
    labelDirections:
      'Uso tópico exclusivo na face interna do pavilhão auricular (pina) de felinos. Aplicar 0,1 mL (2,5 mg de metimazol) a cada 12 horas na orelha limpa e sem pelos, alternando os lados a cada administração. Uso obrigatório de luvas protetoras.',
    dosageGuidance: {
      labelDose:
        'Gatos: 2,5 mg (0,1 mL da solução 25 mg/mL) transdérmico na orelha a cada 12 horas. Titular até 5 mg q12h conforme T4.',
      plumbs: {
        cat: [
          {
            title: 'Hipertireoidismo Felino com Intolerância Digestiva (Sartor et al. 2004 / Plumb’s 10ª ed.)',
            dose: '2,5 a 5,0 mg por gato transdérmico na face interna da pina q12h',
            note: 'Reduz náusea e vômitos de 24% para apenas 4%. Eficácia em 4 semanas é equivalente à via oral.',
          },
        ],
      },
      notes: [
        'Exige veículo lipofílico moderno de alta permeação (evitar formulações arcaicas em PLO com absorção errática de ~11%).',
        'Alternar rigorosamente a pina esquerda e direita em cada dose para prevenir dermatite de contato e eritema.',
        'Limpar resíduos do gel anterior com gaze embebida em água morna antes de nova aplicação.',
        'Uso obrigatório de luvas descartáveis pelo tutor para impedir absorção cutânea e intoxicação humana.',
      ],
    },
    plumbsContext: METIMAZOL_PLUMBS_CONTEXT,
    clinicalUse:
      'Alternativa magistral de eleição para gatos com refratariedade à administração oral ou que desenvolvem vômitos e anorexia com os comprimidos.',
    reassessment:
      'Reavaliar pina auricular quanto a eritema/dermatite e dosar TT4 às 2 a 4 semanas. Titular a dose conforme resposta.',
    prescriptionExample:
      'Metimazol gel lipofílico transdérmico 25 mg/mL — Frasco aplicador dosador. Aplicar 0,1 mL (2,5 mg) na face interna da pina auricular a cada 12 horas, com luvas descartáveis.',
    safetyAlert: METIMAZOL_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 110,00',
      rangeLabel: 'R$ 85,00 a R$ 140,00 (frasco aplicador de 30 mL a 25 mg/mL)',
      sourceDate: METIMAZOL_PRICE_SOURCE_DATE,
      notes: 'Preço médio praticado por farmácias magistrais veterinárias com controle de qualidade analítico (outubro/2026).',
    },
    evidenceLevel: 'Nível 1b — Ensaio clínico prospectivo randomizado (Sartor et al. 2004)',
    isControlled: false,
    catalogMedicationId: 'editorial:metimazol',
  },
];
