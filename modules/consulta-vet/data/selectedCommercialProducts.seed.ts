import { CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-07-21';

const OPHTHALMIC_STEROID_ALERT =
  'ALERTA VERMELHO: corticosteroide oftalmico. Confirmar fluoresceina negativa e excluir ulcera, ceratomalacia, perfuração, infeccao fungica/viral e infeccao bacteriana não controlada antes da prescricao.';

const TOBRAMYCIN_ALERT =
  'Antibiotico aminoglicosideo oftalmico. Em ulcera infiltrada, profunda, malacica ou de evolucao rapida, realizar citologia/cultura e considerar solução fortificada sob avaliação oftalmologica.';

const ALUMINUM_ALERT =
  'Para quelar fosforo, administrar misturado a todas as refeicoes. Separar de outros medicamentos por pelo menos 2 horas; separar 4 horas de fluoroquinolonas. Monitorar constipacao e fosforo/cálcio.';

const RIVAROXABAN_ALERT =
  'ALERTA VERMELHO: anticoagulante. Avaliar hemorragia ativa, plaquetas, função renal/hepática e medicamentos concomitantes. Associação com clopidogrel, AINE, heparina, AAS ou outro anticoagulante aumenta risco de sangramento.';

const PREDNISOLONE_OPHTHALMIC_DOSAGE = {
  labelDose:
    "Bula humana: 1-2 gotas no olho afetado 2-4x/dia; nas primeiras 24-48 h pode intensificar sob prescricao. Plumb's: cães/gatos, 1 gota no olho afetado q6h para conjuntivite/ceratite/uveite não ulcerativas.",
  plumbs: {
    dog: [
      {
        title: 'Inflamacao ocular não ulcerativa',
        dose: '1 gota no olho afetado q6h',
        note: 'Reduzir gradualmente após melhora; exigir fluoresceina negativa e monitorar PIO.',
      },
    ],
    cat: [
      {
        title: 'Inflamacao ocular não ulcerativa',
        dose: '1 gota no olho afetado q6h',
        note: 'Cautela adicional se houver suspeita de herpesvirus felino; exigir fluoresceina negativa.',
      },
    ],
  },
  notes: [
    'Ster 1% e Ster MD 0,12% não sao intercambiaveis mL por mL; Ster MD tem concentração muito menor.',
    'Agitar a suspensao antes de usar e separar colirios por pelo menos 5 minutos.',
  ],
};

const TOBRAMYCIN_OPHTHALMIC_DOSAGE = {
  labelDose:
    "Bula humana: leve a moderada, 1-2 gotas q4h; grave, 2 gotas q1h e reduzir conforme resposta. Plumb's: cães/gatos, 1 gota 4-6x/dia; grave, 1 gota q30-60 min inicialmente.",
  plumbs: {
    dog: [
      {
        title: 'Infeccao ocular bacteriana suscetivel',
        dose: '1 gota no olho afetado 4-6x/dia',
        note: 'Em ceratite grave/infectada, iniciar q30-60 min sob acompanhamento e reduzir conforme resposta.',
      },
    ],
    cat: [
      {
        title: 'Infeccao ocular bacteriana suscetivel',
        dose: '1 gota no olho afetado 4-6x/dia',
        note: 'Muitas conjuntivites felinas sao virais/Chlamydia/Mycoplasma; não tratar causa primária com tobramicina isolada.',
      },
    ],
  },
  notes: [
    'Não confundir tobramicina pura com Tobradex, Tobracin D ou Tobracort, que contem corticosteroide.',
    'Separar colirios por pelo menos 5 minutos e evitar contaminacao do bico aplicador.',
  ],
};

const ALUMINUM_HYDROXIDE_DOSAGE = {
  labelDose:
    "Hiperfosfatemia/DRC: Plumb's cães/gatos, 30-100 mg/kg/dia VO, dividido e misturado com todas as refeicoes. Suspensao 60 mg/mL: 0,50-1,67 mL/kg/dia total.",
  plumbs: {
    dog: [
      {
        title: 'Quelante de fosforo na DRC',
        dose: '30-100 mg/kg/dia VO dividido em todas as refeicoes',
        note: 'Ajustar pela fosfatemia, dieta renal e tolerancia gastrointestinal.',
      },
    ],
    cat: [
      {
        title: 'Quelante de fosforo na DRC',
        dose: '30-100 mg/kg/dia VO dividido em todas as refeicoes',
        note: 'Misturar uniformemente ao alimento; monitorar constipacao e adesao.',
      },
    ],
  },
  notes: [
    'Suspensao 61,5 mg/mL: 30 mg/kg/dia = 0,49 mL/kg/dia; 100 mg/kg/dia = 1,63 mL/kg/dia.',
    'Suspensao manipulada 90 mg/mL: 30 mg/kg/dia = 0,33 mL/kg/dia; 100 mg/kg/dia = 1,11 mL/kg/dia.',
    'Dose antiacida humana não deve ser transposta para cães/gatos com DRC.',
  ],
};

const RIVAROXABAN_DOSAGE = {
  labelDose:
    "Bula humana não deve ser transposta. Plumb's: cães 0,5-1 mg/kg VO q24h; alguns protocolos 1-2 mg/kg q24h. Gatos 0,5-1 mg/kg VO q12-24h ou doses praticas 1,25-5 mg/gato q24h.",
  plumbs: {
    dog: [
      {
        title: 'Anticoagulacao / tromboprofilaxia',
        dose: '0,5-1 mg/kg VO q24h',
        note: 'Alguns protocolos usam 1-2 mg/kg q24h; individualizar por indicação e risco hemorragico.',
      },
    ],
    cat: [
      {
        title: 'Anticoagulacao / tromboprofilaxia',
        dose: '0,5-1 mg/kg VO q12-24h',
        note: 'Doses praticas descritas incluem 1,25 mg/gato q24h ou 2,5-5 mg/gato q24h.',
      },
    ],
  },
  notes: [
    'TP/TTPA normais não excluem efeito anticoagulante; considerar anti-fator Xa calibrado quando disponível.',
    'Monitorar sangramento oculto/manifesta, hemograma, plaquetas, função renal e hepática.',
  ],
};

function ophthalmicSteroidProduct(product: {
  id: string;
  slug: string;
  name: string;
  presentations: string[];
  activeComponents: string[];
  labelCompositionSummary: string;
  clinicalUse: string;
  price: CommercialMedicationProduct['price'];
  productPageUrl: string;
  labelUrl: string;
  imageUrl: string;
  evidenceLevel: string;
}): CommercialMedicationProduct {
  return {
    ...product,
    manufacturer: 'Uniao Quimica / Genom',
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_corticosteroid',
    species: ['dog', 'cat'],
    labelDirections:
      'Uso humano oftalmico. Em cães e gatos, uso extra-label apenas após exame oftalmico, fluoresceina negativa e exclusao de infeccao ativa não controlada.',
    dosageGuidance: PREDNISOLONE_OPHTHALMIC_DOSAGE,
    plumbsContext:
      'Prednisolona oftalmica e corticosteroide para inflamacao ocular não ulcerativa, conjuntivite/ceratite inflamatoria e uveite anterior. Deve ser reduzida gradualmente após melhora.',
    reassessment:
      'Uveite moderada/intensa: 24-72 h. Doença corneana: 24-48 h. Casos estaveis: 5-7 dias. Retornar imediatamente se dor, blefaroespasmo, edema corneano, secrecao purulenta ou perda visual.',
    prescriptionExample:
      `${product.name}: instilar 1 gota no olho afetado a cada 6 horas por ___ dias. Agitar antes de usar. Reavaliar antes de reduzir ou suspender.`,
    safetyAlert: OPHTHALMIC_STEROID_ALERT,
  };
}

function tobramycinProduct(product: {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  price: CommercialMedicationProduct['price'];
  productPageUrl: string;
  labelUrl?: string;
  imageUrl: string;
  evidenceLevel: string;
}): CommercialMedicationProduct {
  return {
    ...product,
    commercialClass: 'ophthalmologic',
    commercialSubclass: 'ophthalmic_antibiotic',
    species: ['dog', 'cat'],
    presentations: ['Solução oftalmica esteril 3 mg/mL (0,3%) - frasco 5 mL'],
    activeComponents: ['tobramicina 3 mg/mL (0,3%)'],
    labelCompositionSummary:
      'Tobramicina 3 mg/mL em solução oftalmica esteril. Antibiotico aminoglicosideo humano; uso veterinario extra-label.',
    labelDirections:
      'Uso exclusivamente oftalmico. Bula humana: 1-2 gotas q4h em infeccoes leves a moderadas; graves podem iniciar com frequencia horaria e reduzir conforme resposta.',
    dosageGuidance: TOBRAMYCIN_OPHTHALMIC_DOSAGE,
    plumbsContext:
      'Tobramicina oftalmica tem utilidade contra bacterias suscetiveis, especialmente bacilos Gram-negativos aerobios, incluindo Pseudomonas. Não cobre virus, fungos ou anaerobios.',
    clinicalUse:
      'Conjuntivite bacteriana documentada, blefaroconjuntivite, infeccao secundaria de superficie ocular, ceratite bacteriana e ulcera corneana infectada dentro de manejo completo da ulcera.',
    reassessment:
      'Reavaliar em 24-72 h conforme gravidade; imediatamente se dor piorar, ulcera aprofundar, houver malacia, secrecao intensa ou perda visual.',
    prescriptionExample:
      `${product.name}: instilar 1 gota no olho afetado a cada 4-6 horas por ___ dias. Separar outros colirios por pelo menos 5 minutos.`,
    safetyAlert: TOBRAMYCIN_ALERT,
  };
}

function aluminumHydroxideProduct(product: {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  presentations: string[];
  activeComponents: string[];
  labelCompositionSummary: string;
  price: CommercialMedicationProduct['price'];
  productPageUrl?: string;
  labelUrl?: string;
  imageUrl?: string;
  evidenceLevel: string;
}): CommercialMedicationProduct {
  return {
    ...product,
    commercialClass: 'renal',
    commercialSubclass: 'renal_ckd_support',
    commercialSubclasses: ['renal_ckd_support', 'gi_gastric_protector'],
    species: ['dog', 'cat'],
    labelDirections:
      'Uso humano como antiacido; em cães/gatos com DRC, uso extra-label como quelante de fosforo misturado as refeicoes.',
    dosageGuidance: ALUMINUM_HYDROXIDE_DOSAGE,
    plumbsContext:
      'Hidroxido de aluminio reduz absorcao intestinal de fosforo quando administrado junto ao alimento. Não substitui dieta renal, controle de DRC e monitoramento seriado.',
    clinicalUse:
      'Quelante de fosforo em hiperfosfatemia associada a DRC em cães e gatos; tambem pode ter uso antiacido, mas a dose antiacida humana não deve ser copiada para DRC.',
    reassessment:
      'Reavaliar fosforo, cálcio, produto cálcio x fosforo, creatinina/ureia, apetite e constipacao em 2-4 semanas após inicio/ajuste.',
    prescriptionExample:
      `${product.name}: administrar dose calculada de hidroxido de aluminio misturada a cada refeicao, totalizando ___ mg/kg/dia, conforme fosfatemia.`,
    safetyAlert: ALUMINUM_ALERT,
  };
}

export const selectedCommercialProductsSeed: CommercialMedicationProduct[] = [
  ophthalmicSteroidProduct({
    id: 'ster-prednisolona-1-uniao-quimica',
    slug: 'ster-acetato-prednisolona-1',
    name: 'Ster',
    presentations: ['Suspensao oftalmica esteril 10 mg/mL (1%) - frasco 5 mL'],
    activeComponents: ['acetato de prednisolona 10 mg/mL (1%)'],
    labelCompositionSummary:
      'Acetato de prednisolona 10 mg/mL, equivalente a 1%. Suspensao oftalmica esteril humana.',
    clinicalUse:
      'Uveite anterior, conjuntivite/ceratite não ulcerativa, pannus e inflamacao ocular pos-operatoria quando não ha ulcera/infeccao ativa não controlada.',
    price: {
      averageLabel: 'R$ 31,11',
      rangeLabel: 'Drogasil R$ 31,99; Drogaria Sao Paulo R$ 32,75; Drogarias Pacheco R$ 28,59',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.uniaoquimica.com.br/produtos/genom/saude-ocular/ster/',
    labelUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/2024.08_STER_STER-MD_1.-Bula-Paciente.pdf',
    imageUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/Ster.png',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Foto oficial do fabricante.',
  }),
  ophthalmicSteroidProduct({
    id: 'ster-md-prednisolona-012-uniao-quimica',
    slug: 'ster-md-acetato-prednisolona-012',
    name: 'Ster MD',
    presentations: ['Suspensao oftalmica esteril 1,2 mg/mL (0,12%) - frasco 10 mL'],
    activeComponents: ['acetato de prednisolona 1,2 mg/mL (0,12%)'],
    labelCompositionSummary:
      'Acetato de prednisolona 1,2 mg/mL, equivalente a 0,12%. Concentração cerca de 8,3 vezes menor que Ster 1%.',
    clinicalUse:
      'Inflamacao ocular não ulcerativa mais leve ou quando o oftalmologista escolhe corticosteroide em concentração menor. Não substituir automaticamente por Ster 1%.',
    price: {
      averageLabel: 'R$ 51,77',
      rangeLabel: 'Drogasil R$ 52,59; Raia R$ 54,41; Drogaria Sao Paulo R$ 53,87; Pacheco R$ 46,19',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.uniaoquimica.com.br/produtos/genom/saude-ocular/ster-md/',
    labelUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/2024.08_STER-MD_2.-Bula-Profissional.pdf',
    imageUrl: 'https://www.uniaoquimica.com.br/wp-content/uploads/2020/01/Ster-MD.png',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Foto oficial do fabricante.',
  }),
  tobramycinProduct({
    id: 'tobrex-tobramicina-alcon',
    slug: 'tobrex-tobramicina-03',
    name: 'Tobrex',
    manufacturer: 'Novartis / Alcon',
    price: {
      averageLabel: 'R$ 40,32',
      rangeLabel: 'Drogasil R$ 42,17; Drogarias Pacheco R$ 38,46',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://portal.novartis.com.br/medicamentos/tobrex/',
    labelUrl: 'https://portal.novartis.com.br/medicamentos/wp-content/uploads/2021/10/Bula-TOBREX-Solucao-Oftalmica-Esteril-Medico.pdf',
    imageUrl: 'https://www.farmaciasahumada.cl/dw/image/v2/BJVH_PRD/on/demandware.static/-/Sites-ahumada-master-catalog/default/dw4cb14e76/images/products/7987/7987.jpg?sh=1050&sm=fit&sw=1050',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Imagem de varejo do mesmo produto 0,3% 5 mL.',
  }),
  tobramycinProduct({
    id: 'tobracin-tobramicina-cristalia',
    slug: 'tobracin-tobramicina-03',
    name: 'Tobracin',
    manufacturer: 'Cristalia / Latinofarma',
    price: {
      averageLabel: 'R$ 26,12',
      rangeLabel: 'Pacheco R$ 24,00; Drogaria Sao Paulo R$ 27,05; Drogasil R$ 27,32',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.cristalia.com.br/produto/tobracina%C2%AE_solucao-oftalmologica-esteril-3mgml',
    imageUrl: 'https://images.tcdn.com.br/img/img_prod/1408954/tobracin_colirio_3mg_ml_5ml_27201_1_e48242515106812ac69078ec298cba89.png',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Imagem de varejo com embalagem Tobracin 0,3% 5 mL.',
  }),
  tobramycinProduct({
    id: 'tobramicina-geolab-oftalmica',
    slug: 'tobramicina-geolab-oftalmica-03',
    name: 'Tobramicina Geolab',
    manufacturer: 'Geolab',
    price: {
      averageLabel: 'Não consolidado',
      rangeLabel: 'Pagina comercial localizada, mas preço instavel/inconsistente na consulta',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.geolab.com.br/produtos/tobramicina/',
    labelUrl: 'https://www.geolab.com.br/wp-content/uploads/2023/09/TOBRAMICINA-Bula-Profissional.pdf',
    imageUrl: 'https://irapurupetcenter.com.br/wp-content/uploads/2021/01/tobramicina-geolab.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Foto corresponde a Geolab 3 mg/mL 5 mL.',
  }),
  tobramycinProduct({
    id: 'tobracular-legrand-tobramicina',
    slug: 'tobracular-legrand-tobramicina-03',
    name: 'Tobracular / Tobramicina Legrand',
    manufacturer: 'Legrand',
    price: {
      averageLabel: 'R$ 12,58',
      rangeLabel: 'Drogarias Pacheco: Tobramicina Legrand 3 mg/mL 5 mL',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogariaspacheco.com.br/tobramicina-3mg-ml-generico-legrand-1-frasco-com-5ml/p',
    imageUrl: 'https://cliniguia.com/media/2023/03/24103449/Tobramicina-3mg-03-Col%C3%ADrio-Com-5ml-Germed-Gen%C3%A9rico.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Imagem identifica embalagem Tobracular/Legrand 3 mg/mL 5 mL.',
  }),
  tobramycinProduct({
    id: 'tobramicina-germed-oftalmica',
    slug: 'tobramicina-germed-oftalmica-03',
    name: 'Tobramicina Germed',
    manufacturer: 'Germed',
    price: {
      averageLabel: 'R$ 18,68-19,49',
      rangeLabel: 'Drogaria Sao Paulo/Raia em torno de R$ 19,09-19,49; pesquisa citava R$ 18,68',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://germedpharma.com.br/produto/tobramicina/',
    labelUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/TobramicinaGermed.pdf',
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/9636760a2/tobramicina-3mg-ml-solucao-oftalmica-5ml-generico-germed.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Imagem de varejo identifica Germed 3 mg/mL 5 mL.',
  }),
  tobramycinProduct({
    id: 'tobramicina-neo-quimica-oftalmica',
    slug: 'tobramicina-neo-quimica-oftalmica-03',
    name: 'Tobramicina Neo Quimica',
    manufacturer: 'Neo Quimica / Hypera',
    price: {
      averageLabel: 'Não consolidado',
      rangeLabel: 'Pagina comercial localizada, mas preço estavel não consolidado',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/tobramicina-3mg-ml-colirio-nova-quimica-genericos-5ml.html',
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/6503096e4/tobramicina-3mg-ml-5ml-generico-nova-quimica.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Imagem de varejo identifica Neo Quimica 3 mg/mL 5 mL.',
  }),
  aluminumHydroxideProduct({
    id: 'hidroxido-aluminio-ems-615',
    slug: 'hidroxido-aluminio-ems-615',
    name: 'Hidroxido de Aluminio EMS',
    manufacturer: 'EMS',
    presentations: ['Suspensao oral 61,5 mg/mL - frasco 240 mL'],
    activeComponents: ['hidroxido de aluminio 61,5 mg/mL'],
    labelCompositionSummary:
      'Suspensao oral humana 61,5 mg/mL, sabor hortela, sem acucar, frasco 240 mL.',
    price: {
      averageLabel: 'Preço variavel',
      rangeLabel: 'Produto oficial EMS localizado; consultar varejo conforme estoque/CEP',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.ems.com.br/medicamentos/hidroxido-de-aluminio/',
    imageUrl: 'https://bandshop.vtexassets.com/arquivos/ids/267821/image-4096946d5c27408dbb1b2bcc956c4b3e.jpg?v=638826677110630000',
    evidenceLevel: 'Produto humano; uso veterinario extra-label como quelante de fosforo.',
  }),
  aluminumHydroxideProduct({
    id: 'hidroxido-aluminio-airela-60',
    slug: 'hidroxido-aluminio-airela-60',
    name: 'Hidroxido de Aluminio Airela',
    manufacturer: 'Airela',
    presentations: ['Suspensao oral 60 mg/mL (6%) - frasco 100 mL ou 150 mL'],
    activeComponents: ['hidroxido de aluminio 60 mg/mL (6%)'],
    labelCompositionSummary:
      'Suspensao oral humana 6%, sabor hortela, apresentacoes de 100 mL e 150 mL conforme bula/pagina comercial.',
    price: {
      averageLabel: 'Conforme varejo',
      rangeLabel: 'Fonte comercial Farmais para 150 mL; preço varia por CEP/estoque',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.farmais.com.br/hidroxido-de-aluminio-6--suspensao-de-uso-oral-sabor-hortela-frasco-150ml-24906/p',
    labelUrl: 'https://airela.com.br/wp-content/uploads/2022/12/Hidroxido_De_aluminio_bula-10x15-cm.pdf',
    imageUrl: 'https://novafarmais.vtexassets.com/arquivos/ids/507269/7894164006762-1730148477618___3e8f6ef218febed8ccb9f623f7266183.jpg?v=638862377717130000',
    evidenceLevel: 'Produto humano; uso veterinario extra-label como quelante de fosforo. Foto corresponde a Airela 6% 150 mL.',
  }),
  aluminumHydroxideProduct({
    id: 'alumimax-natulab-60',
    slug: 'alumimax-hidroxido-aluminio-60',
    name: 'Alumimax',
    manufacturer: 'Natulab',
    presentations: ['Suspensao oral 60 mg/mL - frasco 100 mL'],
    activeComponents: ['hidroxido de aluminio 60 mg/mL'],
    labelCompositionSummary:
      'Suspensao oral humana 60 mg/mL, frasco 100 mL. Agitar antes de usar.',
    price: {
      averageLabel: 'R$ 12,70 aprox.',
      rangeLabel: 'Bemol Farma: Alumimax 60 mg/mL 100 mL',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.bemolfarma.com.br/alumimax-60mg-ml-solucao-oral-100ml/p',
    imageUrl: 'https://bemolfarma.vtexassets.com/arquivos/ids/158702/4012941.jpg?v=639021334951800000',
    evidenceLevel: 'Produto humano; uso veterinario extra-label como quelante de fosforo.',
  }),
  aluminumHydroxideProduct({
    id: 'pepsamar-sanofi-230',
    slug: 'pepsamar-hidroxido-aluminio-230',
    name: 'Pepsamar',
    manufacturer: 'Sanofi',
    presentations: ['Comprimidos mastigaveis 230 mg - envelope/caixa com 10 comprimidos', 'Comprimidos mastigaveis 230 mg - caixa com 50 comprimidos'],
    activeComponents: ['hidroxido de aluminio 230 mg/comprimido'],
    labelCompositionSummary:
      'Comprimido mastigavel humano com hidroxido de aluminio 230 mg. Pode ser pouco pratico para gatos e cães pequenos por fracionamento impreciso.',
    price: {
      averageLabel: 'R$ 9,90 a R$ 39,49',
      rangeLabel: 'Raia 10 comprimidos R$ 9,90; Drogaria Sao Paulo 50 comprimidos conforme pesquisa',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.paguemenos.com.br/pepsamar-envelope-com-10-comprimidos/p',
    labelUrl: 'https://www.drogaraia.com.br/bulas/pepsamar',
    imageUrl: 'https://paguemenos.vtexassets.com/arquivos/ids/1118630/7896714292137-Anti_cido_Pepsamar_Menta_10_Comprimidos_Mastig_veis-Anti_cido-Pepsamar--1-.jpg?v=639029785944070000',
    evidenceLevel: 'Produto humano; para DRC, po puro ou suspensao manipulada costuma permitir mistura mais uniforme a refeicao.',
  }),
  aluminumHydroxideProduct({
    id: 'hidroxido-aluminio-manipulado',
    slug: 'hidroxido-aluminio-manipulado',
    name: 'Hidroxido de Aluminio Manipulado',
    manufacturer: 'Manipulado veterinario',
    presentations: ['Po USP', 'Suspensao manipulada 60, 80, 90 ou 100 mg/mL', 'Capsulas/saches conforme prescricao'],
    activeComponents: ['hidroxido de aluminio em concentração manipulada'],
    labelCompositionSummary:
      'Fórmula manipulada sob prescricao. O po USP e descrito como apresentacao pratica por ser relativamente insipido e permitir mistura direta ao alimento.',
    price: {
      averageLabel: 'Variavel',
      rangeLabel: 'Depende de concentração, forma farmaceutica e farmacia de manipulacao',
      sourceDate: SOURCE_DATE,
    },
    evidenceLevel: 'Produto manipulado; sem imagem comercial única confiável.',
  }),
  {
    id: 'xarelto-rivaroxabana-bayer',
    slug: 'xarelto-rivaroxabana',
    name: 'Xarelto',
    manufacturer: 'Bayer',
    commercialClass: 'cardiologic',
    commercialSubclass: 'cardio_antithrombotic',
    species: ['dog', 'cat'],
    presentations: [
      'Comprimidos revestidos 2,5 mg - 28, 30, 56 ou 60 comprimidos',
      'Comprimidos revestidos 10 mg - 10 ou 30 comprimidos',
      'Comprimidos revestidos 15 mg - 14 ou 28 comprimidos',
      'Comprimidos revestidos 20 mg - 14 ou 28 comprimidos',
    ],
    activeComponents: ['rivaroxabana 2,5 mg', 'rivaroxabana 10 mg', 'rivaroxabana 15 mg', 'rivaroxabana 20 mg'],
    labelCompositionSummary:
      'Rivaroxabana em comprimidos revestidos humanos. As apresentacoes humanas existem em 2,5, 10, 15 e 20 mg; escolher SKU conforme dose calculada e possibilidade de fracionamento.',
    labelDirections:
      'Bula humana tem esquemas por indicação humana e não deve ser transposta para cães/gatos. Em veterinária, uso extra-label antitrombotico/anticoagulante com monitoramento.',
    dosageGuidance: RIVAROXABAN_DOSAGE,
    plumbsContext:
      'Rivaroxabana e inibidor direto do fator Xa. Não e equivalente ao clopidogrel, que e antiplaquetario; combinacao aumenta risco de sangramento e deve ser reservada a casos selecionados.',
    clinicalUse:
      'Cães: trombose venosa, tromboembolismo pulmonar, tromboprofilaxia em IMHA, proteinuria/doença glomerular e estados hipercoagulaveis. Gatos: tromboembolismo arterial, trombo intracardiaco/smoke atrial e prevencao secundaria.',
    reassessment:
      'Inicio: 7-14 dias. Alto risco ou associação com clopidogrel: 3-7 dias. Estavel: 1-3 meses. Imediato se sangramento, melena, hematuria, palidez, sincope, dispneia, paresia aguda ou dor intensa.',
    prescriptionExample:
      'Rivaroxabana ___ mg: administrar ___ mg por via oral a cada ___ horas, conforme indicação antitrombotica individual. Não associar AINEs/anticoagulantes sem orientação.',
    safetyAlert: RIVAROXABAN_ALERT,
    price: {
      averageLabel: '2,5 mg: R$ 111,49-288,40; 10 mg 30 comp: R$ 306,56; 15/20 mg 28 comp: R$ 293,44',
      rangeLabel:
        'Pesquisa comercial com variacao por quantidade: 2,5 mg 28/30/56/60 comp; 10 mg 10/30 comp; 15 e 20 mg 28 comp',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogariasaopaulo.com.br/xarelto-rivaroxabana-2-5mg-28-comprimidos/p',
    labelUrl: 'https://uploads.consultaremedios.com.br/drug_leaflet/pro/Bula-Xarelto-Profissional-Consulta-Remedios.pdf',
    imageUrl: 'https://drogariasp.vteximg.com.br/arquivos/ids/1457806-1000-1000/904740---Xarelto-Rivaroxabana-2-5mg-28-Comprimidos-1.jpg?v=638980649887930000',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Foto corresponde ao Xarelto Bayer 2,5 mg 28 comprimidos.',
  },
];
