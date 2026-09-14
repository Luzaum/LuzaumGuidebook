import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const lomustineCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'citostal-lomustina-bms',
    slug: 'citostal-lomustina',
    name: 'Citostal® (Lomustina)',
    manufacturer: 'Bristol-Myers Squibb',
    commercialClass: 'oncologic',
    commercialSubclass: 'oncologic_chemotherapy',
    commercialSubclasses: ['oncologic_chemotherapy'],
    isControlled: true,
    species: ['dog', 'cat'],
    presentations: [
      'Citostal 10 mg cápsulas gelatinosas duras — frasco com 5 cápsulas',
      'Citostal 40 mg cápsulas gelatinosas duras — frasco com 5 cápsulas',
    ],
    activeComponents: ['lomustina 10 mg', 'lomustina 40 mg'],
    searchAliases: [
      'lomustina',
      'lomustine',
      'ccnu',
      'citostal',
      'citostático',
      'quimioterapia canina',
      'quimioterapia felina',
      'mastocitoma',
      'linfoma cutaneo',
      'linfoma epiteliotropico',
      'histiocitose',
      'sarcoma histiocitico',
      'tumores snc',
      'quimioterapia oral',
      'alquilante',
      'nitrosoureia',
    ],
    labelCompositionSummary:
      'Cada cápsula contém 10 mg ou 40 mg de lomustina (CCNU). Agente antineoplásico lipofílico alquilante pertencente à classe das nitrosoureias (derivado da cloroetilnitrosoureia). Registro Anvisa nº 1.0180.0097. Produto de referência no mercado brasileiro.',
    labelDirections:
      'Bula humana Anvisa: 130 mg/m² por via oral em dose única a cada 6 semanas (100 mg/m² se associado a outros mielossupressores). Uso veterinário extra-label consagrado: Cães: 60 a 90 mg/m² (comum 60–70 mg/m²) VO a cada 3 a 4 semanas (q21–28d); em cães <10 kg utilizar dose ponderal de 1,5 a 2,0 mg/kg VO para evitar sobredose cumulativa. Gatos: 50 a 60 mg/m² (ou ~10 mg/gato) VO a cada 3 a 4 semanas (q21–28d). NUNCA abrir, cortar ou mastigar as cápsulas. Administrar preferencialmente à noite ou em jejum com antiemético prescrito.',
    dosageGuidance: {
      labelDose:
        'Cães: 60 a 90 mg/m² (comum 60–70 mg/m²) VO a cada 3 a 4 semanas; cães <10 kg: 1,5 a 2,0 mg/kg VO q3–4w. Gatos: 50 a 60 mg/m² (ou 10 mg/gato) VO a cada 3 a 4 semanas.',
      plumbs: {
        dog: [
          {
            title: 'Mastocitoma canino irressecável/metastático (grau II/III) e Linfoma Cutâneo Epiteliotrópico',
            dose: '60 a 70 mg/m² VO a cada 3 a 4 semanas (q21–28d)',
            note: 'Padrão ouro de resgate ou primeira linha. Em cães <10 kg, reduzir obrigatoriamente para 1,5–2,0 mg/kg VO para prevenir toxicidade acumulada grave. Associar obrigatoriamente SAMe (18–20 mg/kg/dia) + silibina/silimarina para hepatoproteção.',
          },
          {
            title: 'Linfoma multicêntrico canino recidivado / resgate (protocolos LOPP / LPP)',
            dose: '50 a 70 mg/m² VO a cada 3 semanas',
            note: 'Associar vincristina, procarbazina e prednisona conforme protocolo oncológico. Monitorar nadir leucocitário e plaquetário rigorosamente.',
          },
          {
            title: 'Sarcoma histiocítico canino e Neoplasias do SNC (gliomas, meningiomas)',
            dose: '60 a 80 mg/m² VO a cada 3 a 4 semanas',
            note: 'Alta lipossolubilidade com níveis liquóricos de 30% a 50% dos plasmáticos.',
          },
        ],
        cat: [
          {
            title: 'Linfoma felino resistente / Linfoma cutâneo',
            dose: '50 a 60 mg/m² VO a cada 3 a 4 semanas (ou ~10 mg/gato dose fixa)',
            note: 'Vigiar toxicidade pulmonar (risco de fibrose pulmonar irreversível felina). Fazer raio-x torácico basal e seriado.',
          },
          {
            title: 'Mastocitoma felino sistêmico / cutâneo recidivado',
            dose: '50 a 60 mg/m² VO a cada 3 a 4 semanas',
            note: 'Administrar cápsula inteira com pequena porção de alimento. Monitorar hemograma e ALT.',
          },
        ],
      },
      notes: [
        'NUNCA abrir, cortar ou esmagar as cápsulas: risco extremo de contaminação citotóxica mutagênica por aerossol. Administrar cápsulas inteiras.',
        'HEPATOPROTEÇÃO OBRIGATÓRIA: cães devem receber S-adenosilmetionina (SAMe 18–20 mg/kg/dia) associada a silibina/silimarina iniciando dias antes e mantido durante todo o tratamento (reduz significativamente hepatotoxicidade cumulativa; Skorupski et al. JVIM 2011).',
        'MONITORAMENTO HEMATOLÓGICO: nadir de neutrófilos aos 7–14 dias e de plaquetas aos 14–21 dias (mielossupressão tardia e cumulativa). Hemograma antes de CADA ciclo: exigir neutrófilos ≥2.000/μL e plaquetas ≥100.000/μL.',
        'CÃES PEQUENOS (<10 kg): a relação superfície corporal/peso causa superdosagem se calculado por m²; usar impreterivelmente 1,5 a 2,0 mg/kg.',
        'TUTOR: manipular com luvas descartáveis de nitrila. Gestantes e lactantes NÃO devem ter contato com o medicamento nem com dejetos do animal por 48 a 72 horas.',
      ],
    },
    plumbsContext:
      'Agente alquilante lipofílico do grupo das nitrosoureias (CCNU). Sofre biotransformação espontânea gerando intermediários carbamilantes e alquilantes que induzem ligações cruzadas (cross-links) inter e intrafitas no DNA e inibem processos enzimáticos celulares fundamentais. Por sua elevada lipofilicidade e baixa ionização em pH fisiológico, atravessa rápida e amplamente a barreira hematoencefálica (níveis liquóricos atingem 30% a 50% dos plasmáticos), conferindo eficácia terapêutica única em tumores do sistema nervoso central, linfoma cutâneo epiteliotrópico (taxas de resposta global de 80% a 83%) e mastocitomas caninos refratários.',
    clinicalUse:
      'Quimioterapia antineoplásica de resgate ou primeira linha em pequenos animais: mastocitoma cutâneo e visceral; linfoma cutâneo epiteliotrópico (micose fungoide canina); linfoma multicêntrico refratário a protocolos baseados em CHOP (protocolos LOPP/LPP); sarcoma histiocítico localizado e disseminado; tumores primários e metastáticos do SNC (gliomas, meningiomas); e timoma.',
    reassessment:
      'Hemograma completo obrigatório antes de CADA ciclo (a cada 21–28 dias) e no nadir esperado (7 a 14 dias pós-administração). Painel bioquímico hepático (ALT, FA, bilirrubina) e renal pré-ciclo. Radiografia torácica prévia e a cada 2 a 3 ciclos em felinos para vigiar pneumonite/fibrose pulmonar. Adiar dose se neutrófilos <2.000/μL, plaquetas <100.000/μL ou se houver elevação contínua de ALT.',
    prescriptionExample:
      'Citostal (lomustina) [10 mg ou 40 mg] — cápsulas duras: administrar ___ cápsula(s) por via oral em DOSE ÚNICA no dia __/__/____, fornecida(s) estritamente INTEIRA(S), sem abrir ou partir. Repetir somente após reavaliação clínica e laboratorial em 21 a 28 dias. REGRAS OBRIGATÓRIAS DE BIOSSEGURANÇA AO TUTOR: 1) Usar luvas descartáveis de nitrila para manusear; 2) NUNCA abrir ou partir a cápsula; 3) Mulheres grávidas ou lactantes NÃO devem manipular; 4) Coletar fezes e urina com luvas por 48 horas após a ingestão; 5) Realizar hemograma de controle aos 7–10 dias (nadir); 6) Administrar diariamente o hepatoprotetor prescrito (SAMe + Silimarina).',
    safetyAlert:
      'ALERTA BOXED WARNING / TARJA PRETA — QUIMIOTERÁPICO CITOTÓXICO DE ALTA VIGILÂNCIA. AGENTE MUTAGÊNICO, CARCINOGÊNICO E TERATOGÊNICO. 1) MIELOSSUPRESSÃO TARDIA E CUMULATIVA: neutropenia severa (nadir 7–14 dias) e trombocitopenia persistente (nadir 14–21 dias). Risco de sepse e hemorragias; 2) HEPATOTOXICIDADE CRÔNICA CUMULATIVA CANINA: pode ser irreversível e fatal. Coprescrição de SAMe + silimarina/silibina é indispensável (Skorupski 2011); 3) TOXICIDADE PULMONAR FELINA: causa pneumonite intersticial e fibrose pulmonar irreversível/letal em gatos; 4) CÃES PEQUENOS (<10 kg): exigem cálculo estrito por kg (1,5 a 2,0 mg/kg) para evitar sobredose mortal causada pelos tamanhos fixos de cápsulas; 5) NUNCA ABRIR OU PARTIR CÁPSULAS. Manipulação exclusivamente com luvas de nitrila.',
    price: {
      averageLabel: 'Em torno de R$ 120,00 a R$ 260,00 (frasco com 5 cápsulas)',
      rangeLabel: 'Farmácias especializadas em oncologia e distribuidores hospitalares no Brasil',
      sourceDate: '2026-09-13',
    },
    evidenceLevel:
      'Registro Anvisa 1.0180.0097. Consensos ACVIM de Oncologia e Hepatite (2019), Withrow & MacEwen 6ª ed., Skorupski et al. JVIM 2011.',
    productPageUrl: 'https://consultaremedios.com.br/citostal/p',
    labelUrl: 'https://consultaremedios.com.br/citostal/bula',
    imageUrl:
      'https://uploads.consultaremedios.com.br/product_images/full/193627c111a734df7b4cf2f16a07527ed6e65e78.png',
  },
  {
    id: 'lomustina-manipulada-veterinaria',
    slug: 'lomustina-manipulada',
    name: 'Lomustina Cápsulas Veterinárias Manipuladas',
    manufacturer: 'Farmácia de manipulação veterinária (oncologia)',
    commercialClass: 'oncologic',
    commercialSubclass: 'oncologic_chemotherapy',
    commercialSubclasses: ['oncologic_chemotherapy'],
    isControlled: true,
    species: ['dog', 'cat'],
    presentations: [
      'Cápsulas orais manipuladas em dose personalizada (5 mg, 10 mg, 12 mg, 15 mg, 25 mg, 35 mg, 50 mg conforme m² do paciente)',
    ],
    activeComponents: ['lomustina manipulada'],
    searchAliases: [
      'lomustina manipulada',
      'ccnu manipulado',
      'drogavet',
      'formula animal',
      'petformula',
      'singular',
      'capsula individualizada lomustina',
      'dose personalizada lomustina',
      'dose por m2',
    ],
    labelCompositionSummary:
      'Cápsulas orais magistrais preparadas sob prescrição veterinária em cabine de segurança biológica classe II B2 (específica para antineoplásicos citotóxicos). Permite individualizar a dose exata para a superfície corporal (m²) de cães e gatos, evitando o risco de sobredose ou subdose decorrente da impossibilidade de fracionar cápsulas industriais.',
    labelDirections:
      'Cães: 60 a 90 mg/m² (comum 60–70 mg/m²) VO a cada 3 a 4 semanas; em cães <10 kg, utilizar 1,5 a 2,0 mg/kg VO. Gatos: 50 a 60 mg/m² (ou ~10 mg/gato) VO a cada 3 a 4 semanas. Administrar cápsulas inteiras, com luvas descartáveis de nitrila.',
    dosageGuidance: {
      labelDose:
        'Cães: 60 a 90 mg/m² (comum 60–70 mg/m²) VO a cada 3 a 4 semanas; cães <10 kg: 1,5 a 2,0 mg/kg VO q3–4w. Gatos: 50 a 60 mg/m² (ou 10 mg/gato) VO a cada 3 a 4 semanas.',
      plumbs: {
        dog: [
          {
            title: 'Dose personalizada para mastocitoma / linfoma canino',
            dose: '60 a 70 mg/m² VO a cada 3 a 4 semanas (ou 1,5–2,0 mg/kg para cães <10 kg)',
            note: 'A manipulação veterinária permite cápsulas com dosagem exata (ex.: 12 mg, 18 mg, 35 mg), evitando subdose ou toxicidade fatal por arredondamento para cápsulas de 10 mg ou 40 mg.',
          },
        ],
        cat: [
          {
            title: 'Dose personalizada felina',
            dose: '50 a 60 mg/m² VO a cada 3 a 4 semanas',
            note: 'Permite formular cápsula com dosagem precisa para felinos (ex.: 8 mg, 11 mg, 13 mg).',
          },
        ],
      },
      notes: [
        'Exclusivo para manipulação em farmácias com cabine de segurança biológica de fluxo laminar e exaustão total (Classe II B2).',
        'NUNCA abrir a cápsula manipulada para misturar na comida. Administrar estritamente inteira.',
        'Associar obrigatoriamente SAMe (18–20 mg/kg/dia) + silibina/silimarina em cães.',
      ],
    },
    plumbsContext:
      'Formulação magistral veterinária de alta precisão para a nitrosoureia lomustina (CCNU). Indicada para suprir a lacuna das apresentações fixas industriais (10 mg e 40 mg), garantindo segurança em animais de pequeno porte e gatos que exigem frações milimétricas calculadas pela área de superfície corporal (m²).',
    clinicalUse:
      'Quimioterapia individualizada para mastocitomas, linfomas cutâneos e multicêntricos, sarcomas histiocíticos e tumores cerebrais em cães e gatos sob acompanhamento de especialista em oncologia veterinária.',
    reassessment:
      'Hemograma completo obrigatório antes de cada ciclo e aos 7–14 dias (nadir). Avaliação hepática (ALT, FA, bilirrubina) a cada ciclo.',
    prescriptionExample:
      'Lomustina manipulada ___ mg — cápsulas gastrorresistentes (q.s.p. 1 cápsula): administrar 1 cápsula por via oral em DOSE ÚNICA no dia __/__/____. Manipular com luvas de nitrila. Não abrir a cápsula. Realizar hemograma de controle aos 7–10 dias e manter SAMe + Silimarina diariamente.',
    safetyAlert:
      'QUIMIOTERÁPICO CITOTÓXICO MANIPULADO. NUNCA abrir a cápsula. Mielossupressão cumulativa (nadir de neutrófilos aos 7–14 dias e plaquetas aos 14–21 dias). Risco de hepatotoxicidade cumulativa severa em cães (indispensável associar SAMe + silimarina). Manuseio obrigatório com luvas de nitrila.',
    price: {
      averageLabel: 'Em torno de R$ 70,00 a R$ 180,00 (por cápsula individualizada)',
      rangeLabel: 'Varia conforme a dosagem em miligramas e a farmácia magistral veterinária habilitada',
      sourceDate: '2026-09-13',
    },
    evidenceLevel:
      'Prática clínica oncológica veterinária padrão no Brasil (Conselhos Regionais de Medicina Veterinária / Consensos ACVIM).',
    productPageUrl: 'https://drogavet.com.br',
    labelUrl: 'https://consultaremedios.com.br/citostal/bula',
    imageUrl:
      'https://uploads.consultaremedios.com.br/product_images/full/193627c111a734df7b4cf2f16a07527ed6e65e78.png',
  },
  {
    id: 'gleostine-lomustina-importado',
    slug: 'gleostine-lomustina',
    name: 'Gleostine® (Lomustina)',
    manufacturer: 'NextSource Biotechnology / Corden Pharma',
    commercialClass: 'oncologic',
    commercialSubclass: 'oncologic_chemotherapy',
    commercialSubclasses: ['oncologic_chemotherapy'],
    isControlled: true,
    species: ['dog', 'cat'],
    presentations: [
      'Gleostine 5 mg cápsulas duras — frasco com 5 cápsulas',
      'Gleostine 10 mg cápsulas duras — frasco com 5 cápsulas',
      'Gleostine 40 mg cápsulas duras — frasco com 5 cápsulas',
      'Gleostine 100 mg cápsulas duras — frasco com 5 cápsulas',
    ],
    activeComponents: ['lomustina 5 mg', 'lomustina 10 mg', 'lomustina 40 mg', 'lomustina 100 mg'],
    searchAliases: [
      'gleostine',
      'lomustina importada',
      'ccnu',
      'nextsource',
      'ceenu',
      'corden pharma',
      'lomustine 5mg',
      'lomustine 100mg',
      'quimioterapia importada',
    ],
    labelCompositionSummary:
      'Apresentação comercial aprovada pelo FDA e disponibilizada no mercado brasileiro via importadoras hospitalares oncológicas autorizadas pela Anvisa. Diferencia-se por disponibilizar frações de 5 mg e 100 mg, facilitando a combinação posológica para cães pequenos e gatos sem necessidade de violar a cápsula.',
    labelDirections:
      'Cães: 60 a 90 mg/m² (comum 60–70 mg/m²) VO a cada 3 a 4 semanas; cães <10 kg: 1,5 a 2,0 mg/kg VO q3–4w. Gatos: 50 a 60 mg/m² (ou 10 mg/gato) VO a cada 3 a 4 semanas. A apresentação de 5 mg é especialmente útil para felinos e cães de pequeno porte. NUNCA abrir ou partir cápsulas.',
    dosageGuidance: {
      labelDose:
        'Cães: 60 a 90 mg/m² (comum 60–70 mg/m²) VO a cada 3 a 4 semanas; cães <10 kg: 1,5 a 2,0 mg/kg VO q3–4w. Gatos: 50 a 60 mg/m² (ou 10 mg/gato) VO a cada 3 a 4 semanas.',
      plumbs: {
        dog: [
          {
            title: 'Protocolo oncológico canino',
            dose: '60 a 70 mg/m² VO a cada 3 a 4 semanas (ou 1,5–2,0 mg/kg para <10 kg)',
            note: 'Cápsulas de 5 mg e 10 mg permitem combinações mais exatas em cães pequenos. Associar SAMe + silimarina.',
          },
        ],
        cat: [
          {
            title: 'Protocolo oncológico felino',
            dose: '50 a 60 mg/m² VO a cada 3 a 4 semanas (ou 10 mg dose fixa)',
            note: 'Cápsula de 5 mg permite ajuste fino para gatos.',
          },
        ],
      },
      notes: [
        'Cápsulas devem ser administradas inteiras. Nunca abrir, quebrar ou mastigar.',
        'Hepatoproteção diária com SAMe e silimarina indispensável em cães.',
        'Monitorar nadir hematológico aos 7–14 dias.',
      ],
    },
    plumbsContext:
      'Nitrosoureia antineoplásica de referência internacional. Utilizada no Brasil por hospitais veterinários e serviços oncológicos especializados via importação especial/compassiva quando há desabastecimento de Citostal ou quando a dosagem exige a cápsula de 5 mg.',
    clinicalUse:
      'Tratamento antineoplásico de mastocitomas caninos e felinos, linfomas cutâneos e multicêntricos refratários, sarcomas histiocíticos e tumores encefálicos.',
    reassessment:
      'Hemograma pré-ciclo e no nadir (7–14 dias). Avaliação de enzimas hepáticas (ALT/FA) antes de cada ciclo.',
    prescriptionExample:
      'Gleostine (lomustina) [5 mg, 10 mg ou 40 mg] — cápsulas duras: administrar ___ cápsula(s) por via oral em DOSE ÚNICA no dia __/__/____, fornecida(s) estritamente INTEIRA(S). Manusear com luvas de nitrila. Retorno aos 7–10 dias para hemograma de controle. Associar SAMe + Silimarina diariamente.',
    safetyAlert:
      'ALERTA BOXED WARNING FDA / ANVISA — QUIMIOTERÁPICO CITOTÓXICO. Mielossupressão severa tardia e cumulativa (neutropenia e plaquetopenia). Hepatotoxicidade cumulativa em cães (obrigatório SAMe + silimarina). Pneumonite tóxica felina. NUNCA abrir as cápsulas. Manipulação restrita com luvas descartáveis.',
    price: {
      averageLabel: 'Sob cotação em distribuidoras de importação oncológica hospitalar',
      rangeLabel: 'Importação especial autorizada por paciente / farmácia hospitalar',
      sourceDate: '2026-09-13',
    },
    evidenceLevel:
      'Aprovado pelo FDA. Diretrizes ACVIM de Oncologia e Withrow & MacEwen 6ª ed.',
    productPageUrl:
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2a7a40b3-d533-4f04-89d5-83e87d4468f7',
    labelUrl:
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2a7a40b3-d533-4f04-89d5-83e87d4468f7',
    imageUrl:
      'https://uploads.consultaremedios.com.br/product_images/full/193627c111a734df7b4cf2f16a07527ed6e65e78.png',
  },
];
