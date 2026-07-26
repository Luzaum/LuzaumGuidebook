import { CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-07-08';

const INSULIN_GENERAL_ALERT =
  'Insulina exige dose individualizada por peso, sinais clinicos, apetite, glicemia/cetonas, curva glicemica ou CGM. Risco crítico de hipoglicemia. Nunca trocar concentração, seringa, caneta ou marca sem reavaliação veterinária.';

const U100_ALERT =
  'Insulina U100: usar apenas seringa U100 ou caneta/refil compatível. Não converter para seringa U40. Aplicar somente se o paciente estiver clinicamente apto e com plano claro para hipoglicemia.';

const HOSPITAL_ALERT =
  'Uso hospitalar/emergencial. Não cadastrar como manutenção domiciliar de rotina. Monitorar glicemia, potássio, fosforo, hidratação, cetonas e risco de hipoglicemia.';

const GLARGINE_U100_GUIDANCE = {
  labelDose:
    'Bula humana: dose individualizada. Uso veterinario extra-label: gatos geralmente 1 UI/gato SC q12h como ponto de partida; cães selecionados 0,25-0,5 UI/kg SC q12h.',
  plumbs: {
    dog: [
      {
        title: 'Diabetes mellitus canino selecionado',
        dose: '0,25-0,5 UI/kg SC q12h',
        note: 'Não e primeira escolha canina; considerar se lente/NPH tiverem resposta inadequada ou duração curta.',
      },
    ],
    cat: [
      {
        title: 'Diabetes mellitus felina',
        dose: '1 UI/gato SC q12h; ajustar por curva/CGM',
        note: 'Opção de primeira linha pratica em gatos, especialmente com dieta baixa em carboidrato.',
      },
    ],
  },
  notes: [
    'Glargina U100 costuma ser usada q12h em gatos, apesar de bula humana frequentemente orientar q24h.',
    'Não diluir nem misturar com outras insulinas; perfil depende do pH.',
  ],
};

const NPH_GUIDANCE = {
  labelDose:
    'Bula humana: dose individualizada. Uso veterinario extra-label: cães 0,25-0,5 UI/kg SC q12h; gatos geralmente evitar como escolha inicial por duração curta.',
  plumbs: {
    dog: [
      {
        title: 'Diabetes mellitus canino',
        dose: '0,25-0,5 UI/kg SC q12h',
        note: 'Boa opção de custo em cães; pode ter duração curta em alguns pacientes.',
      },
    ],
    cat: [
      {
        title: 'Gatos',
        dose: 'Evitar como rotina; se usado, individualizar e monitorar q12h',
        note: 'AAHA 2026 não recomenda NPH como escolha inicial felina pela duração curta.',
      },
    ],
  },
  notes: ['Suspensao: rolar suavemente antes de usar; não agitar de forma agressiva.'],
};

const REGULAR_GUIDANCE = {
  labelDose:
    'Uso hospitalar em DKA/hipercalemia. Protocolos descritos incluem 0,1-0,2 UI/kg IM inicial, depois 0,1 UI/kg q1-2h, ou CRI IV conforme internacao.',
  plumbs: {
    dog: [
      {
        title: 'DKA / controle emergencial',
        dose: '0,1-0,2 UI/kg IM inicial; depois 0,1 UI/kg q1-2h ou CRI IV',
        note: 'Meta não e queda rapida isolada da glicose; monitorar cetonas, eletrolitos e hidratação.',
      },
    ],
    cat: [
      {
        title: 'DKA / controle emergencial',
        dose: '0,1-0,2 UI/kg IM inicial; depois 0,1 UI/kg q1-2h ou CRI IV',
        note: 'Uso hospitalar com glicemia seriada e suporte eletrolitico.',
      },
    ],
  },
  notes: ['Não e insulina de manutenção domiciliar para cães e gatos.'],
};

const RAPID_ANALOG_GUIDANCE = {
  labelDose:
    'Bula humana: dose individualizada. Em cães/gatos, reservar para protocolos hospitalares de DKA/hiperglicemia emergencial com monitoramento intensivo.',
  plumbs: {
    dog: [
      {
        title: 'Uso hospitalar',
        dose: 'Dose por protocolo de internacao; monitorar glicemia em série',
        note: 'Não usar como basal/manutenção domiciliar.',
      },
    ],
    cat: [
      {
        title: 'Uso hospitalar',
        dose: 'Dose por protocolo de internacao; monitorar glicemia em série',
        note: 'Não usar como basal/manutenção domiciliar.',
      },
    ],
  },
  notes: ['Analogos ultrarrapidos podem ter ação curta demais para manutenção domiciliar.'],
};

export const insulinCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'lantus-glargina-u100-sanofi',
    slug: 'lantus-insulina-glargina-u100',
    name: 'Lantus',
    manufacturer: 'Sanofi',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina glargina U100 - frasco-ampola 10 mL', 'Refil 3 mL', 'Caneta SoloStar 3 mL'],
    activeComponents: ['insulina glargina 100 UI/mL'],
    labelCompositionSummary:
      'Insulina glargina 100 UI/mL. Produto humano; uso veterinario em cães/gatos e extra-label, com maior utilidade pratica em gatos.',
    labelDirections:
      'Uso SC. Em veterinária, aplicar no horario prescrito, geralmente q12h em gatos, sempre com seringa U100 ou caneta/refil compatível.',
    dosageGuidance: GLARGINE_U100_GUIDANCE,
    plumbsContext:
      'Glargina U100 e uma das principais opções para diabetes felina. Em cães, não costuma ser primeira linha, mas pode ser usada em casos selecionados.',
    clinicalUse:
      'Manutenção de diabetes mellitus, principalmente em gatos recem diagnosticados ou quando se busca insulina basal de perfil mais prolongado.',
    reassessment:
      'Gatos: reavaliar em 5-7 dias no inicio/troca. Cães: 7-14 dias ou antes se hipoglicemia, anorexia, vômitos, cetonas ou piora clínica.',
    prescriptionExample:
      'Lantus insulina glargina 100 UI/mL: aplicar ___ UI SC a cada 12 horas, com seringa U100 ou caneta compatível, conforme curva/CGM.',
    safetyAlert: U100_ALERT,
    price: {
      averageLabel: 'Frasco 10 mL em torno de R$ 358,52; SoloStar 3 mL em torno de R$ 88,49',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/lantus-100ui-ml-frasco-ampola-10ml-sem-aplicador.html',
    labelUrl: 'https://www.drogasil.com.br/bulas/lantus',
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/16942bc9a/lantus-100-ui-ml-solucao-injetavel-c-1-frasco-10-ml.jpg',
    evidenceLevel: 'Bula humana; uso veterinario extra-label. Preferencia felina: AAHA 2026 cita glargina U100 como escolha comum.',
  },
  {
    id: 'basaglar-glargina-u100-lilly',
    slug: 'basaglar-kwikpen-glargina-u100',
    name: 'Basaglar KwikPen',
    manufacturer: 'Eli Lilly',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina glargina U100 - caixa com 5 canetas KwikPen de 3 mL'],
    activeComponents: ['insulina glargina 100 UI/mL'],
    labelCompositionSummary:
      'Insulina glargina 100 UI/mL em caneta KwikPen. Alternativa comercial de glargina U100.',
    labelDirections:
      'Uso SC com caneta KwikPen. Em cães/gatos, aplicar conforme protocolo de glargina U100 e não trocar por Lantus sem nova orientação.',
    dosageGuidance: GLARGINE_U100_GUIDANCE,
    plumbsContext:
      'Usar o mesmo raciocinio clínico da glargina U100. Em gatos, pode ser alternativa quando Lantus estiver indisponivel ou caro.',
    clinicalUse: 'Diabetes mellitus, principalmente em gatos, como alternativa comercial de glargina U100.',
    reassessment: 'Reavaliar 5-7 dias em gatos no inicio/troca; antes se houver sinais de hipoglicemia ou cetonas.',
    prescriptionExample:
      'Basaglar KwikPen 100 UI/mL: aplicar ___ UI SC a cada 12 horas, somente com caneta/agulha compatível, conforme monitoramento.',
    safetyAlert: `${U100_ALERT} Não trocar Lantus por Basaglar, ou o inverso, sem nova orientação.`,
    price: {
      averageLabel: 'Caixa com 5 canetas em torno de R$ 229,99-256,99',
      rangeLabel: 'Pesquisa comercial em Pague Menos, Drogaria Sao Paulo e Droga Raia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.paguemenos.com.br/insulina-basaglar-kwikpen-100ui-ml-com-5-aplicadores-de-3ml-cada/p',
    labelUrl: 'https://www.drogasil.com.br/basaglar-100ui-5-frasco-ampola-3ml-cada-5-aplicadores.html',
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/77689c4ab/basaglar-100ui-ml-com-5-canetas-aplicadoras-solucao-injetavel-de-3ml-cada.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label como glargina U100.',
  },
  {
    id: 'toujeo-glargina-u300-sanofi',
    slug: 'toujeo-solostar-glargina-u300',
    name: 'Toujeo SoloStar',
    manufacturer: 'Sanofi',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina glargina U300 - caneta SoloStar 1,5 mL'],
    activeComponents: ['insulina glargina 300 UI/mL'],
    labelCompositionSummary:
      'Insulina glargina concentrada U300. Caneta preenchida; não aspirar com seringa comum e não converter diretamente de U100.',
    labelDirections:
      'Uso SC somente com a caneta original. Em gatos/cães selecionados, q12-24h conforme resposta clínica e monitoramento.',
    dosageGuidance: {
      labelDose:
        'Bula humana: dose individualizada. Literatura felina emergente: 0,5 UI/kg SC q12-24h ou 2 UI/gato q24h como pontos de partida descritos; ajustar por CGM/curva.',
      plumbs: {
        dog: [
          {
            title: 'Cães selecionados/refratarios',
            dose: 'Sem dose padrão; individualizar q12-24h',
            note: 'Usar apenas quando houver motivo clínico para U300 e monitoramento estreito.',
          },
        ],
        cat: [
          {
            title: 'Gatos selecionados',
            dose: '0,5 UI/kg SC q12-24h ou 2 UI/gato q24h',
            note: 'Opção emergente; glargina U100/PZI seguem escolhas mais usuais.',
          },
        ],
      },
      notes: ['U300 não e uma conversao linear simples de U100. Usar a caneta original.'],
    },
    plumbsContext:
      'Glargina U300 tem dados emergentes em gatos e cães selecionados; não e primeira escolha padrão. O principal risco pratico e erro de concentração.',
    clinicalUse:
      'Diabetes mellitus em pacientes selecionados quando glargina U100/PZI/NPH/lente não forem ideais ou houver necessidade de perfil diferente.',
    reassessment: 'Reavaliar rapidamente após inicio/troca, idealmente com CGM ou curva, e antes se hipoglicemia ou anorexia.',
    prescriptionExample:
      'Toujeo SoloStar glargina U300: aplicar ___ UI SC q12-24h, somente com a caneta original, conforme orientação veterinária.',
    safetyAlert:
      'ALERTA U300: não aspirar com seringa U100/U40, não converter manualmente e não tratar como 3x mais forte de forma linear. Risco grave de erro de dose.',
    price: {
      averageLabel: 'Caneta 1,5 mL em torno de R$ 253,91',
      rangeLabel: 'Pesquisa comercial em Drogarias Pacheco/Droga Raia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogariaspacheco.com.br/toujeo-solostar-solucao-injetavel-300u-ml-sanofi-1-5ml-caneta-preenchida/p',
    labelUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/TOUJEO.pdf',
    imageUrl: 'https://cdn.shop-apotheke.com/images/D11/732/580/D11732580-p10.jpg',
    evidenceLevel: 'Produto humano U300; uso veterinario extra-label, com evidencia felina emergente.',
  },
  {
    id: 'caninsulin-vetsulin-lente-u40-msd',
    slug: 'caninsulin-vetsulin-lente-u40',
    name: 'Caninsulin / Vetsulin',
    manufacturer: 'MSD / Merck Animal Health',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina lente suina U40 - frasco 2,5 mL', 'Insulina lente suina U40 - frasco 10 mL', 'Cartuchos VetPen em alguns mercados'],
    activeComponents: ['insulina suina zinco/lente 40 UI/mL'],
    labelCompositionSummary:
      'Insulina suina purificada U40; fonte oficial brasileira descreve 35% amorfa e 65% cristalina.',
    labelDirections:
      'Uso veterinario SC. Agitar ate suspensao leitosa homogenea. Usar obrigatoriamente seringa U40 ou VetPen apropriada.',
    dosageGuidance: {
      labelDose:
        'Rótulo: cães 0,5 UI/kg SC SID inicialmente; pratica frequente cães 0,25-0,5 UI/kg SC q12h. Gatos: 1-2 UI/gato SC q12h ou 0,25-0,5 UI/kg q12h.',
      plumbs: {
        dog: [
          {
            title: 'Diabetes mellitus canino',
            dose: '0,25-0,5 UI/kg SC q12h; rótulo pode iniciar 0,5 UI/kg SID',
            note: 'Muitos cães precisam BID; ajustar por curva e sinais clinicos.',
          },
        ],
        cat: [
          {
            title: 'Diabetes mellitus felina',
            dose: '1-2 UI/gato SC q12h ou 0,25-0,5 UI/kg SC q12h',
            note: 'Aprovada para gatos, mas glargina U100/PZI costumam ser preferidas para felinos.',
          },
        ],
      },
      notes: ['U40 = 40 UI/mL. Seringa U100 em Caninsulin causa erro grave de dose.'],
    },
    plumbsContext:
      'Insulina lente suina veterinária, primeira linha pratica para muitos cães. Em gatos e aprovada, mas pode ter duração menor que glargina/PZI.',
    clinicalUse: 'Tratamento de diabetes mellitus em cães e gatos, com maior preferencia pratica em cães.',
    reassessment: 'Reavaliar 7-14 dias após inicio/ajuste, ou imediatamente se hipoglicemia, anorexia, vômitos, cetonas ou prostracao.',
    prescriptionExample:
      'Caninsulin 40 UI/mL: aplicar ___ UI SC a cada 12 horas, com seringa U40, junto/após alimentacao, conforme curva glicemica.',
    safetyAlert:
      'U40 obrigatorio. Não usar seringa U100. Não usar IV e não escolher como única terapia em DKA grave sem protocolo hospitalar.',
    price: {
      averageLabel: '2,5 mL em torno de R$ 82,50; 10 mL em torno de R$ 251,90',
      rangeLabel: 'Pesquisa comercial veterinária',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/caninsulin/',
    labelUrl: 'https://www.caninsulin.com.br/caninsulin-datasheet/caninsulin-u40-vs-u100/',
    imageUrl: 'https://admin.casadoprodutor.com.br/media/catalog/product/m/e/medicamento-caninsulin-10-ml-casa-do-produtor_1.jpg',
    evidenceLevel: 'Produto veterinario registrado para diabetes mellitus em cães e gatos.',
  },
  {
    id: 'humulin-n-nph-u100-lilly',
    slug: 'humulin-n-nph-u100',
    name: 'Humulin N',
    manufacturer: 'Eli Lilly',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina NPH U100 - frasco-ampola 10 mL', 'Refil 3 mL conforme mercado'],
    activeComponents: ['insulina humana isofana/NPH 100 UI/mL'],
    labelCompositionSummary: 'Insulina humana isofana/NPH 100 UI/mL. Produto humano; uso veterinario extra-label.',
    labelDirections: 'Uso SC com seringa U100. Rolar suavemente antes do uso por ser suspensao.',
    dosageGuidance: NPH_GUIDANCE,
    plumbsContext: 'NPH e uma opção comum e acessível em cães. Em gatos, a duração costuma ser curta e não e escolha rotineira.',
    clinicalUse: 'Manutenção de diabetes mellitus em cães; alternativa quando lente U40 não for viavel.',
    reassessment: 'Curva/CGM e revisao de sinais em 7-14 dias ou antes se hipoglicemia/piora.',
    prescriptionExample: 'Humulin N 100 UI/mL: aplicar ___ UI SC a cada 12 horas, com seringa U100, conforme curva glicemica.',
    safetyAlert: U100_ALERT,
    price: {
      averageLabel: 'Frasco 10 mL em torno de R$ 59,39-75,99',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/humulin-100-ui-ampola-nph-insulina-1x10-ml.html',
    labelUrl: 'https://img.drogasil.com.br/raiadrogasil_bula/InsulinaHumulinN-EliLilly.pdf',
    imageUrl:
      'https://f.fcdn.app/imgs/693bf6/www.farmacenter.com.py/farmpy/38d5/webp/catalogo/10001639_10001639_1/1024-1024/humulin-n-nph-100-ui-fco-x-10-ml-frasco-unica.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label, mais util em cães que em gatos.',
  },
  {
    id: 'novolin-n-nph-u100-novo-nordisk',
    slug: 'novolin-n-nph-u100',
    name: 'Novolin N',
    manufacturer: 'Novo Nordisk',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina NPH U100 - frasco 10 mL', 'Penfill 5 refis de 3 mL'],
    activeComponents: ['insulina humana isofana/NPH 100 UI/mL'],
    labelCompositionSummary: 'Insulina humana isofana/NPH 100 UI/mL. Alternativa NPH U100 ao Humulin N.',
    labelDirections: 'Uso SC com seringa U100 ou sistema Penfill compatível. Rolar suavemente antes de aplicar.',
    dosageGuidance: NPH_GUIDANCE,
    plumbsContext: 'Mesmo raciocinio clínico da NPH: util em cães, pouco indicada como rotina em gatos.',
    clinicalUse: 'Manutenção de diabetes mellitus em cães; alternativa comercial de NPH U100.',
    reassessment: 'Reavaliar por curva/CGM, peso, PU/PD e sinais em 7-14 dias.',
    prescriptionExample:
      'Novolin N 100 UI/mL: aplicar ___ UI SC a cada 12 horas, com seringa U100 ou sistema Penfill compatível.',
    safetyAlert: U100_ALERT,
    price: {
      averageLabel: 'Frasco 10 mL em torno de R$ 32,99; Penfill 5x3 mL em torno de R$ 135,49',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/novolin-100-ui-ampola-nph-insulina-1x10-ml.html',
    labelUrl: 'https://www.novonordisk.com.br/content/dam/nncorp/br/pt/pdfs/bulas/patient/Novolin_N_Frasco_Bula_Paciente.pdf',
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/image/20159510f/novolin-n-insulina-100ui-suspensao-injetavel-com-10-ml.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label como NPH U100.',
  },
  {
    id: 'humulin-r-regular-u100-lilly',
    slug: 'humulin-r-regular-u100',
    name: 'Humulin R',
    manufacturer: 'Eli Lilly',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina regular U100 - frasco 10 mL', 'Refis 3 mL conforme mercado'],
    activeComponents: ['insulina humana regular 100 UI/mL'],
    labelCompositionSummary: 'Insulina humana regular/cristalina 100 UI/mL. Produto humano; uso hospitalar veterinario extra-label.',
    labelDirections: 'Uso hospitalar IV/IM/SC conforme protocolo. Não usar como manutenção domiciliar de rotina.',
    dosageGuidance: REGULAR_GUIDANCE,
    plumbsContext: 'Insulina regular e usada em DKA, hipercalemia e controle emergencial, com monitoramento intensivo.',
    clinicalUse: 'Emergência/UTI: DKA, hipercalemia e hiperglicemia hospitalar. Não e basal domiciliar.',
    reassessment: 'Glicemia e eletrolitos seriados durante internacao; ajustar conforme resposta e hidratação.',
    prescriptionExample:
      'Humulin R 100 UI/mL: uso hospitalar conforme protocolo de DKA/hipercalemia; não dispensar para manutenção domiciliar sem plano explicito.',
    safetyAlert: `${HOSPITAL_ALERT} ${U100_ALERT}`,
    price: {
      averageLabel: 'Frasco 10 mL em torno de R$ 59,39-75,99',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/humulin-100-ui-ampola-regular-insulina-1x10-ml.html',
    labelUrl: 'https://bulas-ecommerce.s3.sa-east-1.amazonaws.com/HUMULIN_R_3458806b-a482-4f61-9d5d-d6f8f668f1e9.pdf',
    imageUrl: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750108220800L.jpg',
    evidenceLevel: 'Produto humano; uso veterinario hospitalar extra-label.',
  },
  {
    id: 'novolin-r-regular-u100-novo-nordisk',
    slug: 'novolin-r-regular-u100',
    name: 'Novolin R',
    manufacturer: 'Novo Nordisk',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina regular U100 - frasco 10 mL', 'Penfill 5 refis de 3 mL'],
    activeComponents: ['insulina humana regular 100 UI/mL'],
    labelCompositionSummary: 'Insulina humana regular 100 UI/mL. Alternativa regular U100 ao Humulin R.',
    labelDirections: 'Uso hospitalar conforme protocolo. Não e opção de manutenção domiciliar.',
    dosageGuidance: REGULAR_GUIDANCE,
    plumbsContext: 'Mesmo papel clínico da insulina regular: emergência, DKA, hipercalemia e controle hospitalar.',
    clinicalUse: 'Emergência/UTI, principalmente DKA e hipercalemia com toxicidade miocardica conforme protocolo.',
    reassessment: 'Monitoramento seriado de glicemia, potássio/fosforo, cetonas e fluidoterapia.',
    prescriptionExample:
      'Novolin R 100 UI/mL: uso hospitalar conforme protocolo; não usar como insulina basal domiciliar.',
    safetyAlert: `${HOSPITAL_ALERT} ${U100_ALERT}`,
    price: {
      averageLabel: 'Frasco 10 mL em torno de R$ 32,99; Penfill conforme estoque',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/novolin-insulina-humana-regular-100ui-10ml-frasco-ampola.html',
    labelUrl: 'https://www.drogasil.com.br/bulas/novolin-r',
    imageUrl: 'https://www.benavides.com.mx/media/catalog/product/cache/0c86ac9ceb8c52098005cd0103eaf5ba/2/0/20240612_338281.jpg',
    evidenceLevel: 'Produto humano; uso veterinario hospitalar extra-label.',
  },
  {
    id: 'humalog-lispro-u100-lilly',
    slug: 'humalog-lispro-u100',
    name: 'Humalog',
    manufacturer: 'Eli Lilly',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina lispro U100 - KwikPen 3 mL', 'Frasco 10 mL', 'Refis 3 mL conforme mercado'],
    activeComponents: ['insulina lispro 100 UI/mL'],
    labelCompositionSummary: 'Analogo ultrarrapido de insulina lispro 100 UI/mL. Produto humano; uso veterinario hospitalar extra-label.',
    labelDirections: 'Reservar para protocolos hospitalares; não usar como insulina basal de manutenção.',
    dosageGuidance: RAPID_ANALOG_GUIDANCE,
    plumbsContext: 'Lispro e insulina de ação rapida/ultrarrapida, util em ambiente hospitalar, não como basal domiciliar.',
    clinicalUse: 'DKA/hiperglicemia hospitalar em protocolos selecionados.',
    reassessment: 'Monitoramento intensivo de glicemia e eletrolitos durante uso.',
    prescriptionExample: 'Humalog lispro 100 UI/mL: uso hospitalar conforme protocolo de emergência; não prescrever como basal domiciliar.',
    safetyAlert: HOSPITAL_ALERT,
    price: {
      averageLabel: 'KwikPen 3 mL em torno de R$ 46,39; frasco/refil conforme estoque',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogariasaopaulo.com.br/insulina-humalog-kwikpen-eli-lilly-1-caneta-descartavel-3ml/p',
    labelUrl: 'https://www.drogasil.com.br/bulas/humalog',
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/38375d87f/humalog-kwikpen-1x3ml.jpg',
    evidenceLevel: 'Produto humano; uso veterinario hospitalar extra-label.',
  },
  {
    id: 'novorapid-asparte-u100-novo-nordisk',
    slug: 'novorapid-asparte-u100',
    name: 'NovoRapid',
    manufacturer: 'Novo Nordisk',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina asparte U100 - FlexPen 3 mL', 'Penfill 5 refis de 3 mL'],
    activeComponents: ['insulina asparte 100 UI/mL'],
    labelCompositionSummary: 'Analogo ultrarrapido de insulina asparte 100 UI/mL. Produto humano; uso veterinario hospitalar extra-label.',
    labelDirections: 'Uso hospitalar conforme protocolo de DKA/hiperglicemia; não usar como manutenção domiciliar.',
    dosageGuidance: RAPID_ANALOG_GUIDANCE,
    plumbsContext: 'Asparte tem ação rapida e pode ser usada em protocolos hospitalares, com monitoramento seriado.',
    clinicalUse: 'DKA e controle emergencial em internacao, quando escolhido no protocolo da equipe.',
    reassessment: 'Monitorar glicemia, potássio, fosforo, cetonas e hidratação durante internacao.',
    prescriptionExample:
      'NovoRapid asparte 100 UI/mL: uso hospitalar conforme protocolo; não usar como insulina basal domiciliar.',
    safetyAlert: HOSPITAL_ALERT,
    price: {
      averageLabel: 'FlexPen 3 mL em torno de R$ 46,39-55,99; Penfill 5x3 mL conforme estoque',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/novorapid-flexpen-3-0ml.html',
    labelUrl: 'https://www.drogasil.com.br/bulas/novorapid-flexpen',
    imageUrl: 'https://maxxieconomica.com/storage/photos/1/Products/ean/7897705201831.jpg',
    evidenceLevel: 'Produto humano; uso veterinario hospitalar extra-label.',
  },
  {
    id: 'tresiba-degludeca-u100-novo-nordisk',
    slug: 'tresiba-degludeca-u100',
    name: 'Tresiba FlexTouch / Penfill',
    manufacturer: 'Novo Nordisk',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina degludeca U100 - FlexTouch', 'Penfill 100 UI/mL conforme mercado'],
    activeComponents: ['insulina degludeca 100 UI/mL'],
    labelCompositionSummary:
      'Insulina degludeca U100 de ação ultralonga. Produto humano; uso veterinario extra-label ainda menos consolidado que glargina/lente/NPH.',
    labelDirections: 'Uso SC com caneta/refil compatível; dose deve ser individualizada por endocrinologista/veterinario responsavel.',
    dosageGuidance: {
      labelDose:
        'Bula humana: dose individualizada. Estudos veterinarios sao emergentes; não usar como escolha inicial sem monitoramento e justificativa clínica.',
      plumbs: {
        dog: [
          {
            title: 'Cães selecionados',
            dose: 'Dose individualizada; iniciar apenas com plano de monitoramento',
            note: 'Considerar quando opções mais usuais falham ou não sao viaveis.',
          },
        ],
        cat: [
          {
            title: 'Gatos selecionados',
            dose: 'Dose individualizada; monitorar por curva/CGM',
            note: 'Não substituir glargina U100/PZI de rotina sem justificativa.',
          },
        ],
      },
      notes: ['Produto de ação muito prolongada; ajustes devem ser cautelosos.'],
    },
    plumbsContext:
      'Degludeca tem interesse por ação ultralonga, mas a experiência veterinária ainda e emergente e não substitui as escolhas mais tradicionais.',
    clinicalUse: 'Pacientes selecionados com diabetes mellitus, quando houver necessidade de perfil prolongado e monitoramento adequado.',
    reassessment: 'Reavaliar com curva/CGM e sinais clinicos; cuidado com hipoglicemia prolongada.',
    prescriptionExample:
      'Tresiba degludeca 100 UI/mL: aplicar ___ UI SC conforme protocolo individual, com caneta/refil compatível e monitoramento estreito.',
    safetyAlert: `${INSULIN_GENERAL_ALERT} Acao prolongada pode tornar hipoglicemia mais duradoura.`,
    price: {
      averageLabel: 'FlexTouch U100 conforme estoque; pesquisa local em torno de R$ 430,00-590,00 para caixas maiores',
      rangeLabel: 'Pesquisa comercial em redes de farmacia',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/tresiba-flextouch-100ui-ml-5-aplicacoes.html',
    labelUrl: 'https://www.novonordisk.com.br/content/dam/nncorp/br/pt/pdfs/bulas/hcp/Tresiba_Fle_Touch_100U_Bula_do_Profissional.pdf',
    imageUrl:
      'https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/c5b0e6136a6dd7f7d91d8b889ed40f35/image/497662012/tresiba-flextouch-100u-ml-c-3ml-de-insulina-degludeca-novo-nordisk.jpg',
    evidenceLevel: 'Produto humano; uso veterinario extra-label com literatura emergente.',
  },
  {
    id: 'levemir-detemir-u100-novo-nordisk',
    slug: 'levemir-detemir-u100',
    name: 'Levemir FlexPen / Penfill',
    manufacturer: 'Novo Nordisk',
    commercialClass: 'endocrine',
    commercialSubclass: 'endocrine_insulin',
    species: ['dog', 'cat'],
    presentations: ['Insulina detemir U100 - FlexPen', 'Penfill conforme mercado'],
    activeComponents: ['insulina detemir 100 UI/mL'],
    labelCompositionSummary:
      'Insulina detemir 100 UI/mL. Produto humano; uso veterinario extra-label, com potência clínica maior em cães do que algumas insulinas humanas.',
    labelDirections:
      'Uso SC com seringa U100/caneta compatível. Exige dose inicial conservadora e monitoramento estreito, especialmente em cães pequenos.',
    dosageGuidance: {
      labelDose:
        'Bula humana: dose individualizada. Em cães/gatos, dose deve ser individualizada; usar inicio conservador e curva/CGM por risco de hipoglicemia.',
      plumbs: {
        dog: [
          {
            title: 'Cães selecionados',
            dose: 'Individualizar; iniciar conservador q12h',
            note: 'Detemir pode ser potente em cães; evitar conversao direta de outras insulinas.',
          },
        ],
        cat: [
          {
            title: 'Gatos selecionados',
            dose: 'Individualizar q12h conforme curva/CGM',
            note: 'Glargina U100/PZI costumam ser alternativas felinas mais usuais.',
          },
        ],
      },
      notes: ['Não converter diretamente de NPH/lente/glargina sem reducao e monitoramento.'],
    },
    plumbsContext:
      'Detemir pode funcionar como basal em cães/gatos selecionados, mas requer cuidado por variacao de potência e risco de hipoglicemia.',
    clinicalUse: 'Diabetes mellitus em pacientes selecionados quando insulinas mais usuais não foram adequadas.',
    reassessment: 'Curva/CGM após inicio/troca e reavaliação imediata se hipoglicemia, anorexia ou letargia.',
    prescriptionExample:
      'Levemir detemir 100 UI/mL: aplicar ___ UI SC q12h conforme protocolo individual, usando seringa U100/caneta compatível.',
    safetyAlert: `${U100_ALERT} Detemir pode exigir dose inicial menor que outras insulinas em caes.`,
    price: {
      averageLabel: 'Preço confiável nacional não consolidado; produto pode ter disponibilidade irregular',
      rangeLabel: 'Pesquisa comercial com estoque variavel',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.drogasil.com.br/bulas/levemir-flexpen',
    labelUrl: 'https://www.novonordisk.com.br/content/dam/nncorp/br/pt/pdfs/bulas/hcp/hcpn/Levemir-FlexPen-Bula-do-Profissional.pdf',
    imageUrl:
      'https://openfarma.mx/cdn/shop/files/levemir_100ui_ml_3_mlx5_flexpen_cart_7503007822307_1_15b2dc9f-d73c-446e-ae42-3cebc9896138.jpg?v=1757128547',
    evidenceLevel: 'Produto humano; uso veterinario extra-label. Imagem usada de varejo internacional do mesmo produto/concentração.',
  },
];
