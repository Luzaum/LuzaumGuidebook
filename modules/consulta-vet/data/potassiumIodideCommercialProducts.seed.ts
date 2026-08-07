import { CommercialMedicationProduct } from '../types/commercialMedication';

const SOURCE_DATE = '2026-08-06';

const KI_SPOROTRICHOSIS_CONTEXT =
  'Antifúngico histórico e imunomodulador por via oral; mecanismo provável envolve modulação da resposta granulomatosa, não ação antifúngica direta como azóis. Em esporotricose felina, associa-se ao itraconazol em casos disseminados, refratários, nasais ou recorrentes; monoterapia tem eficácia inferior. CRMV-PR 2024: 2,5–5 mg/kg/dia VO em associação; Plumb\'s: iniciar 2,5 mg/kg/dia e titular até 20 mg/kg/dia conforme tolerância.';

const KI_CAT_DOSAGE = {
  labelDose:
    'Gatos — associação: iniciar 2,5 mg/kg VO q24h; alvo inicial 5 mg/kg/dia; titular em incrementos de 2,5 mg/kg somente com reavaliação; máximo 20 mg/kg/dia. Manter ≥60 dias após remissão clínica completa.',
  plumbs: {
    cat: [
      { title: 'Associação com itraconazol', dose: '2,5–20 mg/kg VO q24h', note: 'Iniciar 2,5 mg/kg; incrementos conforme resposta e tolerância.' },
      { title: 'Monoterapia alternativa', dose: '2,5 mg/kg VO q24h, titulando até 20 mg/kg/dia', note: 'Não é primeira escolha; eficácia inferior e iodismo frequente.' },
    ],
  },
  notes: [
    'Volume (mL) = dose em mg ÷ concentração em mg/mL. Nunca prescrever só em gotas sem fator documentado pela farmácia.',
    'Solução 40% (400 mg/mL) ≠ xarope 2% (20 mg/mL) ≠ SSKI (~1.000 mg/mL).',
    'Gatos: administrar junto ao alimento para reduzir náusea.',
  ],
};

const KI_DOG_DOSAGE = {
  labelDose: 'Cães — esporotricose: 40 mg/kg VO q12h, junto ao alimento. Dose canina não é transferível para gatos.',
  plumbs: {
    dog: [{ title: 'Esporotricose', dose: '40 mg/kg VO q12h com alimento', note: 'Itraconazol tende a ser mais previsível; iodeto como alternativa selecionada.' }],
  },
};

const KI_IODISM_ALERT =
  'Iodismo: vômitos, anorexia, diarreia, ptialismo, lacrimejamento, secreção nasal, tosse, descamação, tremores, alterações térmicas, hepatotoxicidade e cardiopatia. Gatos são mais suscetíveis. Suspender e reavaliar se sinais aparecerem.';

const KI_RENAL_POTASSIUM_ALERT =
  'Fornece carga de potássio. Cautela ou evitar em DRC, desidratação, hipercalemia, gestação, lactação, cardiopatia descompensada e hepatopatia importante. Monitorar interação com IECA, BRA, espironolactona, amilorida, triantereno e suplementos de potássio. Avaliar T4/TSH se doença tireoidiana suspeita.';

const KI_CONCENTRATION_ALERT =
  'ALERTA: confirmar concentração (mg/cápsula ou mg/mL), forma farmacêutica e via antes de calcular. Não substituir cápsula por solução, Lugol, suplemento nutricional ou produto injetável automaticamente.';

const KI_HUMAN_SYRUP_ALERT =
  'Xarope humano 2% (20 mg/mL): uso veterinário extra-label. Confirmar excipientes (xilitol, açúcar). Não usar dose da bula humana; calcular sempre em mg/kg. Volume 20× maior que solução a 40% para a mesma dose.';

const KI_INJECTABLE_ALERT =
  'PRODUTO INJETÁVEL — não converter automaticamente para terapia oral de esporotricose. Plumb\'s contraindica administração intramuscular de iodetos. Decisão parenteral exclusivamente veterinária; não equivalente às cápsulas ou soluções orais.';

const KI_LAQFA_ALERT =
  'Comprimido humano LAQFA 130 mg: indicação de profilaxia pós-exposição a iodo radioativo, não esporotricose. Concentração fixa dificulta titulação em gatos. Não cadastrar como equivalente terapêutico veterinário para micose.';

const KI_COMPOUNDING_ALERT =
  'Manipulação magistral: exige prescrição veterinária, confirmação de concentração no rótulo/laudo e validade após manipulação. Imagens de farmácias manipuladoras podem ser meramente ilustrativas.';

function kiOralProduct(
  product: Pick<
    CommercialMedicationProduct,
    | 'id'
    | 'slug'
    | 'name'
    | 'manufacturer'
    | 'presentations'
    | 'activeComponents'
    | 'labelCompositionSummary'
    | 'labelDirections'
    | 'clinicalUse'
    | 'prescriptionExample'
    | 'safetyAlert'
    | 'price'
    | 'productPageUrl'
    | 'labelUrl'
    | 'imageUrl'
    | 'evidenceLevel'
  > & { extraDosageNotes?: string[] },
): CommercialMedicationProduct {
  const { extraDosageNotes, ...rest } = product;
  return {
    ...rest,
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antifungal',
    commercialSubclasses: ['infectious_antifungal'],
    species: ['dog', 'cat'],
    dosageGuidance: {
      labelDose: `${KI_CAT_DOSAGE.labelDose} ${KI_DOG_DOSAGE.labelDose}`,
      plumbs: {
        cat: KI_CAT_DOSAGE.plumbs!.cat,
        dog: KI_DOG_DOSAGE.plumbs!.dog,
      },
      notes: [...(KI_CAT_DOSAGE.notes || []), ...(extraDosageNotes || [])],
    },
    plumbsContext: KI_SPOROTRICHOSIS_CONTEXT,
    reassessment:
      'Reavaliar em 7–14 dias após início ou antes se efeitos adversos. Monitorar peso, apetite, lesões, sinais respiratórios/nasais, ALT/AST, creatinina, potássio e adesão. Titular dose somente com boa tolerância e resposta insuficiente.',
    evidenceLevel: product.evidenceLevel ?? 'Uso veterinário extra-label na maioria das apresentações; pesquisa comercial 06/08/2026.',
  };
}

export const potassiumIodideCommercialProductsSeed: CommercialMedicationProduct[] = [
  kiOralProduct({
    id: 'iodeto-potassio-capsulas-floravet',
    slug: 'iodeto-potassio-capsulas-floravet',
    name: 'Iodeto de Potássio — Cápsulas Floravet',
    manufacturer: 'Floravet / Farmacell',
    presentations: [
      '10 mg — 60 cápsulas',
      '15 mg — 30, 60 ou 90 cápsulas',
      '20 mg — 60 ou 90 cápsulas',
      '25 mg — 60 ou 90 cápsulas',
      '40 mg — 90 cápsulas',
      '50 mg — 60, 90 ou 120 cápsulas',
    ],
    activeComponents: ['iodeto de potássio'],
    labelCompositionSummary:
      'Cápsulas manipuladas veterinárias em concentrações de 10 a 50 mg de iodeto de potássio por cápsula. Validade divulgada: 6 meses. Exige prescrição veterinária.',
    labelDirections:
      'Forma preferível para gatos pela precisão de dose e menor rejeição ao sabor. Administrar junto ao alimento. Selecionar concentração conforme dose mg/kg calculada.',
    clinicalUse:
      'Esporotricose felina (associação ao itraconazol ou monoterapia selecionada), titulação por peso em cápsulas personalizadas.',
    prescriptionExample:
      'Iodeto de potássio ___ mg — cápsulas: administrar 2,5 mg/kg VO q24h junto ao alimento; titular conforme resposta e tolerância, até máximo de 20 mg/kg/dia em gatos.',
    safetyAlert: `${KI_CONCENTRATION_ALERT} ${KI_COMPOUNDING_ALERT} ${KI_IODISM_ALERT} ${KI_RENAL_POTASSIUM_ALERT}`,
    price: {
      averageLabel: '10 mg/60 caps: R$ 61,60 • 25 mg/60 caps: R$ 70,70 • 50 mg/60 caps: R$ 86,00',
      rangeLabel: '10 mg/60: R$ 61,60; 15 mg/60: R$ 64,70; 20 mg/60: R$ 67,80; 25 mg/60: R$ 70,70; 50 mg/90: R$ 120,30',
      sourceDate: SOURCE_DATE,
      notes: 'Preços Floravet 06/08/2026; variam por concentração, quantidade e excipiente.',
    },
    productPageUrl:
      'https://farmaciafloravet.com.br/iodeto-de-potassio-10mg-pote-60-capsulas-uso-veterinario-floravet-pet-pets-manipulado-manipulacao-veterinaria-generico-farmacia-farmaciademanipulacao-manipulacaoveterinaria-cao-gato-caes-gatos-felino-lugol-dog-cat',
  }),
  kiOralProduct({
    id: 'iodeto-potassio-efarmapet-10mg-60',
    slug: 'iodeto-potassio-efarmapet-10mg',
    name: 'Iodeto de Potássio 10 mg — eFarmaPet',
    manufacturer: 'eFarmaPet',
    presentations: ['10 mg — 60 cápsulas'],
    activeComponents: ['iodeto de potássio 10 mg/cápsula'],
    labelCompositionSummary: 'Cápsula manipulada veterinária com 10 mg de iodeto de potássio por cápsula.',
    labelDirections: 'Administrar dose calculada em mg/kg por via oral, junto ao alimento. Prescrição veterinária necessária.',
    clinicalUse: 'Titulação fina em gatos pequenos para esporotricose e associação ao itraconazol.',
    prescriptionExample:
      'Iodeto de potássio 10 mg — cápsulas: administrar ___ cápsula(s) VO q24h, correspondendo a ___ mg/kg, junto ao alimento.',
    safetyAlert: `${KI_CONCENTRATION_ALERT} ${KI_COMPOUNDING_ALERT} ${KI_IODISM_ALERT} ${KI_RENAL_POTASSIUM_ALERT}`,
    price: {
      averageLabel: 'R$ 45,08',
      rangeLabel: 'R$ 28,55 (eFarmaPet) a R$ 61,60 (Floravet) — 10 mg/60 cápsulas',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.efarmapet.com.br/iodeto-de-potassio-10mg-60-capsulas-uso-veterinario/',
  }),
  kiOralProduct({
    id: 'iodeto-potassio-efarmapet-25mg-60',
    slug: 'iodeto-potassio-efarmapet-25mg',
    name: 'Iodeto de Potássio 25 mg — eFarmaPet',
    manufacturer: 'eFarmaPet',
    presentations: ['25 mg — 60 cápsulas'],
    activeComponents: ['iodeto de potássio 25 mg/cápsula'],
    labelCompositionSummary: 'Cápsula manipulada veterinária com 25 mg de iodeto de potássio por cápsula.',
    labelDirections: 'Administrar dose calculada em mg/kg por via oral, junto ao alimento.',
    clinicalUse: 'Esporotricose felina em cápsulas de concentração intermediária.',
    prescriptionExample:
      'Iodeto de potássio 25 mg — cápsulas: administrar ___ cápsula(s) VO q24h, correspondendo a ___ mg/kg, junto ao alimento.',
    safetyAlert: `${KI_CONCENTRATION_ALERT} ${KI_COMPOUNDING_ALERT} ${KI_IODISM_ALERT} ${KI_RENAL_POTASSIUM_ALERT}`,
    price: {
      averageLabel: 'R$ 56,64',
      rangeLabel: 'R$ 42,57 (eFarmaPet) a R$ 70,70 (Floravet) — 25 mg/60 cápsulas',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.efarmapet.com.br/iodeto-de-potassio-25mg-60-capsulas-uso-veterinario/',
  }),
  kiOralProduct({
    id: 'iodeto-potassio-solucao-40-manipulada',
    slug: 'iodeto-potassio-solucao-40',
    name: 'Iodeto de Potássio 40% — Solução Oral Manipulada',
    manufacturer: 'Farmácia de manipulação veterinária',
    presentations: ['Solução oral 400 mg/mL — frasco 30 a 60 mL'],
    activeComponents: ['iodeto de potássio 400 mg/mL'],
    labelCompositionSummary:
      'Solução oral a 40% = 400 mg de iodeto de potássio por mL. Não equivale a xarope 2% (20 mg/mL) nem a SSKI (~1.000 mg/mL). Bula industrial inexistente; seguir laudo da farmácia.',
    labelDirections:
      'Administrar volume calculado em mL com seringa oral graduada: volume (mL) = dose (mg) ÷ 400. DrogaVET cita gota = 20 mg apenas para gotejador calibrado específico — preferir mL.',
    clinicalUse:
      'Esporotricose quando cápsula não é aceita; titulação por peso com volume pequeno. Sabor metálico e risco de erro decimal.',
    prescriptionExample:
      'Iodeto de potássio 400 mg/mL — solução oral: administrar ___ mL VO q24h, correspondendo a ___ mg/kg, junto ao alimento. Fornecer seringa graduada.',
    safetyAlert: `${KI_CONCENTRATION_ALERT} ALTA CONCENTRAÇÃO — 400 mg/mL. Confirmar cálculo e seringa oral. ${KI_IODISM_ALERT} ${KI_RENAL_POTASSIUM_ALERT}`,
    extraDosageNotes: [
      'DrogaVET (solução 400 mg/mL): cães 40 mg/kg q8–12h; gatos 20 mg/kg q12–24h ou faixa Plumb\'s 2,5–20 mg/kg q24h.',
    ],
    price: {
      averageLabel: 'Variável',
      rangeLabel: 'Preço não padronizado publicamente em 06/08/2026',
      sourceDate: SOURCE_DATE,
    },
  }),
  kiOralProduct({
    id: 'iodeto-potassio-fluidelan-2',
    slug: 'iodeto-potassio-fluidelan',
    name: 'Fluidelan',
    manufacturer: 'Belfar',
    presentations: ['Xarope 20 mg/mL — frasco 100 mL'],
    activeComponents: ['iodeto de potássio 20 mg/mL'],
    labelCompositionSummary:
      'Iodeto de potássio 2% — 20 mg/mL. Xarope humano registrado como mucolítico/expectorante; iodeto puro, sem outros princípios ativos.',
    labelDirections:
      'Uso veterinário extra-label. Volume (mL) = dose (mg) ÷ 20. Bula humana (5–10 mL q6h) não se aplica a animais.',
    clinicalUse:
      'Fonte de iodeto de potássio puro de baixa concentração; volume elevado para doses antifúngicas. Confirmar excipientes do lote.',
    prescriptionExample:
      'Fluidelan (20 mg/mL): administrar ___ mL VO q24h, correspondendo a ___ mg/kg, junto ao alimento.',
    safetyAlert: `${KI_HUMAN_SYRUP_ALERT} ${KI_CONCENTRATION_ALERT} ${KI_IODISM_ALERT} ${KI_RENAL_POTASSIUM_ALERT}`,
    price: {
      averageLabel: 'R$ 14,29',
      rangeLabel: 'A partir de R$ 14,29 em varejo farmacêutico',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://consultaremedios.com.br/fluidelan/p',
    labelUrl: 'https://bula.com.br/fluidelan',
    imageUrl:
      'https://cdn.awsli.com.br/2500x2500/490/490111/produto/200690990/tmpfluidelan100ml-9307d90c68.jpg',
  }),
  kiOralProduct({
    id: 'iodeto-potassio-iodeton-2',
    slug: 'iodeto-potassio-iodeton',
    name: 'Iodeton',
    manufacturer: 'Cazi Química Farmacêutica',
    presentations: ['Xarope 20 mg/mL — frasco 100 mL'],
    activeComponents: ['iodeto de potássio 20 mg/mL'],
    labelCompositionSummary: 'Iodeto de potássio 2% — 20 mg/mL. Xarope humano mucolítico/expectorante; iodeto puro.',
    labelDirections:
      'Uso veterinário extra-label. Bula humana: 15 mL VO 2×/dia — não usar como referência veterinária. Calcular em mg/kg.',
    clinicalUse: 'Alternativa de xarope 2% puro para iodeto de potássio oral em uso selecionado.',
    prescriptionExample:
      'Iodeton (20 mg/mL): administrar ___ mL VO conforme prescrição, correspondendo a ___ mg/kg, junto ao alimento.',
    safetyAlert: `${KI_HUMAN_SYRUP_ALERT} Bula humana contraindica gestação, crianças, distúrbios tireoidianos e diabetes — avaliar risco/benefício veterinário. ${KI_IODISM_ALERT}`,
    price: {
      averageLabel: 'R$ 17,34',
      rangeLabel: 'Aproximadamente R$ 17,34 em farmácia ativa',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://consultaremedios.com.br/iodeton/p',
    labelUrl: 'https://consultaremedios.com.br/iodeton/bula',
    imageUrl: 'https://www.drogarianovaesperanca.com.br/imagens/600x600/iodeton-20mg-xarope-100ml-00896631bf.jpg',
  }),
  kiOralProduct({
    id: 'iodeto-potassio-iodenax-2',
    slug: 'iodeto-potassio-iodenax',
    name: 'Iodenax',
    manufacturer: 'Natulab',
    presentations: ['Xarope 20 mg/mL — frasco 100 mL'],
    activeComponents: ['iodeto de potássio 20 mg/mL'],
    labelCompositionSummary:
      'Iodeto de potássio 20 mg/mL. Excipientes incluem sacarose, metilparabeno, propilparabeno, sacarina e ciclamato — contém açúcar.',
    labelDirections: 'Bula humana: 15 mL 2×/dia. Uso veterinário extra-label com cálculo em mg/kg.',
    clinicalUse: 'Xarope 2% puro; disponibilidade comercial incerta em 06/08/2026.',
    prescriptionExample:
      'Iodenax (20 mg/mL): administrar ___ mL VO conforme prescrição, correspondendo a ___ mg/kg.',
    safetyAlert: `${KI_HUMAN_SYRUP_ALERT} Contém açúcar. Confirmar estoque antes de prescrever. ${KI_IODISM_ALERT}`,
    price: {
      averageLabel: 'Indisponível',
      rangeLabel: 'Listado como indisponível no varejo consultado em 06/08/2026',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://consultaremedios.com.br/iodenax/p',
  }),
  kiOralProduct({
    id: 'iodeto-potassio-manipulavet-solucao',
    slug: 'iodeto-potassio-manipulavet',
    name: 'Iodeto de Potássio — ManipulaVet',
    manufacturer: 'ManipulaVet',
    presentations: ['Solução oral — frasco 30 mL (concentração conforme laudo)'],
    activeComponents: ['iodeto de potássio'],
    labelCompositionSummary:
      'Solução oral manipulada veterinária. Confirmar concentração em mg/mL no rótulo/laudo antes de calcular volume.',
    labelDirections: 'Administrar volume em mL calculado a partir da concentração declarada pela farmácia.',
    clinicalUse: 'Manipulação veterinária para esporotricose quando cápsula não é viável.',
    prescriptionExample:
      'Iodeto de potássio ___ mg/mL — solução ManipulaVet: administrar ___ mL VO q24h, correspondendo a ___ mg/kg.',
    safetyAlert: `${KI_CONCENTRATION_ALERT} ${KI_COMPOUNDING_ALERT} ${KI_IODISM_ALERT}`,
    price: {
      averageLabel: 'Confirmar farmácia',
      rangeLabel: 'Preço variável conforme concentração e volume',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www.manipulavet.com.br/',
    imageUrl:
      'https://images.tcdn.com.br/img/img_prod/1211273/iodeto_de_potassio_20mg_722_4_b5d4b66b6758485afe47ea6adc98cdd0.jpg',
  }),
  kiOralProduct({
    id: 'kit-itraconazol-iodeto-floravet',
    slug: 'kit-itraconazol-iodeto-floravet',
    name: 'Kit Itraconazol 25 mg + Iodeto de Potássio 15 mg — Floravet',
    manufacturer: 'Floravet / Farmacell',
    presentations: [
      'Itraconazol 25 mg — 90 cápsulas + iodeto de potássio 15 mg — 90 cápsulas',
    ],
    activeComponents: ['itraconazol 25 mg/cápsula', 'iodeto de potássio 15 mg/cápsula'],
    labelCompositionSummary:
      'Kit com doses fixas de itraconazol 25 mg e iodeto 15 mg. CRMV-PR recomenda itraconazol em pellets; doses fixas podem não atender todos os pesos.',
    labelDirections:
      'Calcular individualmente mg de itraconazol e mg/kg de iodeto por paciente; kit pode não corresponder à dose ideal sem manipulação personalizada.',
    clinicalUse:
      'Conveniência comercial para associação esporotricose; verificar adequação por peso antes de prescrever.',
    prescriptionExample:
      'Confirmar que as cápsulas do kit correspondem à dose calculada de itraconazol e iodeto para o paciente; ajustar concentração se necessário.',
    safetyAlert: `${KI_COMPOUNDING_ALERT} Doses fixas — recalcular mg/kg antes de prescrever. ${KI_IODISM_ALERT} Itraconazol: administrar com alimento; monitorar hepático.`,
    price: {
      averageLabel: 'R$ 158,90',
      rangeLabel: 'Kit 90+90 cápsulas — Farmácia Ffarma/Floravet',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl:
      'https://www.farmaciaffarma.com.br/veterinaria/kit-itraconazol-25mg-pote-90-capsulas-iodeto-de-potassio-15mg-pote-90-capsulas-uso-veterinario',
  }),
  {
    id: 'iodeto-potassio-prado-10-injetavel',
    slug: 'iodeto-potassio-prado-injetavel',
    name: 'Iodeto de Potássio 10% — Injetável Prado',
    manufacturer: 'Prado',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antifungal',
    species: ['dog', 'cat'],
    presentations: ['Solução injetável 100 mg/mL — frasco 50 mL'],
    activeComponents: ['iodeto de potássio 10% (100 mg/mL)'],
    labelCompositionSummary:
      'Solução injetável 10 g/100 mL (100 mg/mL). Produto distinto das formulações orais; cadastro comercial cita IM e IV.',
    labelDirections:
      'Cadastro de produto: 0,2–2 mL por animal (cães e gatos). Não converter volume injetável para dose oral.',
    dosageGuidance: {
      labelDose: 'Cadastro comercial: 0,2–2 mL/animal IM ou IV — decisão veterinária exclusiva.',
      notes: [
        'Plumb\'s: iodetos não devem ser administrados por via intramuscular.',
        'Não usar como equivalente automático às cápsulas ou soluções orais para esporotricose.',
      ],
    },
    plumbsContext:
      'Formulação parenteral distinta; Plumb\'s contraindica IM de iodetos e exige cautela em aplicação IV lenta.',
    clinicalUse:
      'Produto injetável veterinário cadastrado; não substituto automático da terapia oral de esporotricose em pequenos animais.',
    reassessment: 'Monitoramento intensivo se uso parenteral for considerado; preferir formulações orais para esporotricose.',
    prescriptionExample: 'Não prescrever conversão automática do injetável para uso oral.',
    safetyAlert: KI_INJECTABLE_ALERT,
    price: {
      averageLabel: 'Indisponível',
      rangeLabel: 'Indisponível ou sem preço estável em 06/08/2026',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://vetsmart.com.br/cg/produto/527/iodeto-de-potassio-10',
    imageUrl:
      'https://cdn.awsli.com.br/64x50/2420/2420132/produto/166765617/8aba6a7733.jpg',
    evidenceLevel: 'Produto injetável distinto; não equivalente às apresentações orais.',
  },
  {
    id: 'iodeto-potassio-laqfa-130mg',
    slug: 'iodeto-potassio-laqfa',
    name: 'LAQFA — Iodeto de Potássio 130 mg',
    manufacturer: 'Laboratório Químico-Farmacêutico da Aeronáutica',
    commercialClass: 'emergency',
    commercialSubclass: 'infectious_antifungal',
    species: ['dog', 'cat'],
    presentations: ['Comprimido 130 mg — embalagem hospitalar 500 comprimidos'],
    activeComponents: ['iodeto de potássio 130 mg/comprimido'],
    labelCompositionSummary:
      '130 mg de iodeto de potássio por comprimido (100 mg de iodo). Indicação humana: profilaxia de câncer de tireoide após exposição a iodo radioativo.',
    labelDirections:
      'Bula de emergência nuclear: adultos 130 mg; doses pediátricas fracionadas. Não indicado para esporotricose veterinária.',
    dosageGuidance: {
      labelDose: 'Indicação humana de emergência nuclear — não aplicar dose veterinária antifúngica.',
      notes: ['130 mg/comprimido dificulta titulação segura em gatos para esporotricose.'],
    },
    plumbsContext: 'Produto humano de emergência; não monografia veterinária para esporotricose.',
    clinicalUse:
      'Antídoto/profilaxia tireoidiana em exposição a iodo radioativo (uso humano). Não apresentar como opção veterinária comercial para esporotricose.',
    reassessment: 'Não aplicável ao uso antifúngico veterinário.',
    prescriptionExample: 'Não prescrever para esporotricose felina ou canina.',
    safetyAlert: KI_LAQFA_ALERT,
    price: {
      averageLabel: 'Sem varejo ativo',
      rangeLabel: 'Embalagem hospitalar; sem vendedores ativos localizados em 06/08/2026',
      sourceDate: SOURCE_DATE,
    },
    productPageUrl: 'https://www2.fab.mil.br/laqfa/index.php/produtos/iodeto-de-potassio',
    labelUrl:
      'https://magistralbr.caldic.com/storage/product-files/Lcn289PzaIqsntWTH956dGfY81ea6BtpGnElRNTw.pdf',
    evidenceLevel: 'Indicação incompatível com esporotricose; cadastro apenas para referência de mercado.',
  },
];

/** Apresentações orais elegíveis para esporotricose (exclui injetável Prado e LAQFA). */
export const POTASSIUM_IODIDE_ORAL_PRODUCTS = potassiumIodideCommercialProductsSeed
  .filter((product) =>
    !['iodeto-potassio-prado-10-injetavel', 'iodeto-potassio-laqfa-130mg'].includes(product.id),
  )
  .map((product) => product.id);
