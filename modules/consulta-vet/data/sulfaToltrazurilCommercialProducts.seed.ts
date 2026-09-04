import type {
  CommercialMedicationDosageGuidance,
  CommercialMedicationPrice,
  CommercialMedicationProduct,
} from '../types/commercialMedication';

const SOURCE_DATE = '2026-08-31';

function priceRange(min: number, max: number, sourceNote: string): CommercialMedicationPrice {
  const avg = Math.round(((min + max) / 2) * 100) / 100;
  const brl = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return {
    averageLabel: `${brl(min)} – ${brl(max)} (preço médio ${brl(avg)})`,
    rangeLabel: sourceNote,
    sourceDate: SOURCE_DATE,
  };
}

const TOLTRAZURIL_PLUMBS_CONTEXT =
  'Plumb\'s 10ª ed., monografia Toltrazuril (pp. 1255–1257): toltrazuril é o composto-pai do ponazuril; não intercambiar doses. Descreve uso extrabula para coccidiose em cães e gatos.';

const TOLTRAZURIL_DOG_CAT_DOSAGE: CommercialMedicationDosageGuidance = {
  plumbs: {
    dog: [
      {
        title: 'Coccidiose — uso extrabula',
        dose: '10–30 mg/kg VO q24h por 1–3 dias.',
      },
    ],
    cat: [
      {
        title: 'Coccidiose — uso extrabula',
        dose: '20–30 mg/kg VO em dose única; repetir após 10 dias pode melhorar a eficácia.',
      },
      {
        title: 'Redução da eliminação de oocistos de Toxoplasma — uso extrabula',
        dose: '5–10 mg/kg VO q24h por 2 dias.',
      },
    ],
  },
  notes: [
    'Conversão toltrazuril 5% (50 mg/mL): volume (mL) = peso (kg) × dose (mg/kg) ÷ 50.',
    'Toltrazuril ≠ ponazuril. Apresentações brasileiras são rotuladas para suínos/bovinos; uso em cães/gatos é extrabula.',
  ],
};

const SMX_TMP_PLUMBS_CONTEXT =
  'Plumb\'s 10ª ed., monografia Sulfa-/Trimethoprim (pp. 1193–1197): doses da soma sulfametoxazol + trimetoprima; escolher esquema conforme indicação, gravidade e susceptibilidade.';

const SMX_TMP_DOG_CAT_DOSAGE: CommercialMedicationDosageGuidance = {
  plumbs: {
    dog: [
      {
        title: 'Infecção bacteriana sistêmica sensível',
        dose: '30 mg/kg da associação VO q24h.',
        note: 'Alternativa em infecção grave: 15 mg/kg VO q12h.',
      },
      {
        title: 'Foliculite bacteriana superficial — extrabula',
        dose: '15–30 mg/kg da associação VO q12h.',
      },
      {
        title: 'Cistite bacteriana — extrabula',
        dose: '15 mg/kg VO q12h (não complicada) ou 15–30 mg/kg VO q12h (complicada).',
      },
      {
        title: 'Coccidiose — extrabula',
        dose: '<4 kg: 15–30 mg/kg q12–24h; ≥4 kg: 30–60 mg/kg q24h.',
      },
      {
        title: 'Toxoplasmose — extrabula',
        dose: '15 mg/kg VO q12h por 4 semanas.',
      },
      {
        title: 'Neosporose — extrabula',
        dose: '15–20 mg/kg VO q12h por 4 semanas (+ pirimetamina conforme protocolo).',
      },
      {
        title: 'Pneumocistose — extrabula',
        dose: '15 mg/kg q8h × 3 sem OU 30 mg/kg q12h × 3 sem.',
      },
    ],
    cat: [
      {
        title: 'Cistite bacteriana — extrabula',
        dose: '15 mg/kg VO q12h (não complicada) ou 15–30 mg/kg VO q12h (complicada).',
      },
      {
        title: 'Coccidiose — extrabula',
        dose: '15–30 mg/kg VO q12–24h.',
      },
      {
        title: 'Toxoplasmose — extrabula',
        dose: '15 mg/kg VO q12h por 4 semanas.',
      },
    ],
  },
  notes: [
    'Todas as doses Plumb\'s referem-se à soma SMX + TMP.',
    'Monitorar Schirmer em cães em uso prolongado (risco de KCS). Manter hidratação.',
  ],
};

export const sulfaToltrazurilCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'powerzuril-toltrazuril-msd',
    slug: 'powerzuril-toltrazuril',
    name: 'Powerzuril (toltrazuril 5%)',
    manufacturer: 'MSD Saúde Animal',
    commercialClass: 'parasiticide',
    commercialSubclass: 'gi_antiprotozoal',
    commercialSubclasses: ['gi_antiprotozoal'],
    species: ['dog', 'cat'],
    presentations: [
      'Suspensão oral 5% (50 mg/mL) — frasco 250 mL',
      'Suspensão oral 5% (50 mg/mL) — frasco 500 mL',
      'Suspensão oral 5% (50 mg/mL) — frasco 1 L',
    ],
    activeComponents: ['toltrazuril'],
    searchAliases: ['power zuril', 'toltrazurila msd'],
    labelCompositionSummary:
      'Toltrazuril 5% (50 mg/mL). Bula brasileira indicada para coccidiose suína (*Cystoisospora suis*).',
    labelDirections:
      'Suínos (bula): 0,4 mL/kg VO dose única (= 25 mg/kg), preferencialmente no 3º–4º dia de vida; ou 1 mL/leitão (~2,5 kg). Não aplicar dose suína a cães/gatos.',
    dosageGuidance: {
      labelDose: 'Leitões (bula): 0,4 mL/kg VO dose única (25 mg/kg de toltrazuril).',
      ...TOLTRAZURIL_DOG_CAT_DOSAGE,
    },
    plumbsContext: TOLTRAZURIL_PLUMBS_CONTEXT,
    clinicalUse:
      'Alternativa comercial de toltrazuril 5% para protocolos extrabula em pequenos animais. Indicação oficial: prevenção/tratamento de coccidiose em leitões.',
    reassessment:
      'Reavaliar sinais clínicos e coproparasitológico; corrigir higiene ambiental. Em filhotes debilitados, considerar suporte e diagnósticos diferenciais.',
    prescriptionExample:
      'Uso extrabula em cão/gato: Powerzuril 5% (50 mg/mL), calcular volume = peso × dose (mg/kg) ÷ 50. Registrar apresentação suína no receituário.',
    safetyAlert:
      'Não confundir com ponazuril. Não usar dose de leitão em cães/gatos sem cálculo mg/kg. Agitar antes de usar; frasco aberto válido por até 180 dias (bula).',
    price: {
      averageLabel: 'Consultar distribuidor agropecuário',
      rangeLabel: 'Sem faixa estável em varejo pet; MSD Saúde Animal — frascos 250 mL a 1 L',
      sourceDate: SOURCE_DATE,
    },
    evidenceLevel: 'Página oficial MSD Saúde Animal + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://www.msd-saude-animal.com.br/produto/powerzuril/',
    labelUrl: 'https://www.msd-saude-animal.com.br/produto/powerzuril/',
  },
  {
    id: 'farmacox-toltrazuril-farmabase',
    slug: 'farmacox-toltrazuril',
    name: 'Farmacox (toltrazuril 5%)',
    manufacturer: 'Farmabase',
    commercialClass: 'parasiticide',
    commercialSubclass: 'gi_antiprotozoal',
    commercialSubclasses: ['gi_antiprotozoal'],
    species: ['dog', 'cat'],
    presentations: [
      'Suspensão oral 5% (50 mg/mL) — frasco 100 mL com dosador',
      'Suspensão oral 5% (50 mg/mL) — frasco 1 L',
    ],
    activeComponents: ['toltrazuril'],
    searchAliases: ['farma cox'],
    labelCompositionSummary:
      'Cada 100 mL contém 5 g de toltrazuril (50 mg/mL). Indicado para coccidiose por *Cystoisospora suis* em leitões.',
    labelDirections:
      'Suínos (bula): 1 mL/leitão no 3º dia de vida (≈20–35 mg/kg para leitão de 1,5–2,5 kg), dose única. Agitar antes de usar.',
    dosageGuidance: {
      labelDose: 'Leitões (bula): 1 mL/leitão VO dose única no terço inicial da vida.',
      ...TOLTRAZURIL_DOG_CAT_DOSAGE,
    },
    plumbsContext: TOLTRAZURIL_PLUMBS_CONTEXT,
    clinicalUse:
      'Anticoccidiano de toltrazuril 5% para suínos; referência comercial alternativa ao Baycox para uso extrabula em pequenos animais.',
    reassessment:
      'Reavaliar diarreia, hidratação e exame coproparasitológico; reforçar controle ambiental contra reinfecção.',
    prescriptionExample:
      'Uso extrabula: Farmacox 5%, administrar toltrazuril na dose mg/kg definida. Volume = peso × dose ÷ 50.',
    safetyAlert:
      'Apresentação suína. Não confundir dose fixa por leitão com mg/kg em cães/gatos. Carência suína abate: 77 dias.',
    price: priceRange(52.72, 55.49, 'AgroMercadoVet — frasco 100 mL (31/08/2026)'),
    evidenceLevel: 'Página oficial Farmabase + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://farmabase.com/produtos/farmacox/',
    labelUrl: 'https://farmabase.com/produtos/farmacox/',
  },
  {
    id: 'agecox-neo-toltrazuril-agener',
    slug: 'agecox-neo-toltrazuril',
    name: 'Agecox Neo (toltrazuril 5%)',
    manufacturer: 'Agener União Química',
    commercialClass: 'parasiticide',
    commercialSubclass: 'gi_antiprotozoal',
    commercialSubclasses: ['gi_antiprotozoal'],
    species: ['dog', 'cat'],
    presentations: [
      'Suspensão oral 50 mg/mL — frasco 100 mL',
      'Suspensão oral 50 mg/mL — frasco 1 L',
    ],
    activeComponents: ['toltrazuril'],
    searchAliases: ['agecox', 'age cox neo'],
    labelCompositionSummary:
      'Toltrazuril 50 mg/mL. Indicado para prevenção e tratamento de coccidiose (*Isospora suis*) em leitões a partir de 1 dia.',
    labelDirections:
      'Suínos (bula): 1 mL/1,25 kg VO dose única. Não extrapolar tabela suína para cães/gatos.',
    dosageGuidance: {
      labelDose: 'Leitões (bula): 1 mL para cada 1,25 kg VO em dose única.',
      ...TOLTRAZURIL_DOG_CAT_DOSAGE,
    },
    plumbsContext: TOLTRAZURIL_PLUMBS_CONTEXT,
    clinicalUse:
      'Coccidicida de toltrazuril para suínos; alternativa comercial para protocolos extrabula em pequenos animais quando disponível.',
    reassessment:
      'Reavaliar resposta clínica e coproparasitológica; higiene ambiental é parte do tratamento.',
    prescriptionExample:
      'Uso extrabula em pequenos animais: calcular mg/kg de toltrazuril e converter para mL (÷50).',
    safetyAlert:
      'Carência suína abate: 65 dias. Uso em cães/gatos é extrabula; confirmar concentração 50 mg/mL.',
    price: priceRange(67.88, 88.9, 'Avipec R$ 88,90; Isophos ~R$ 67,88 — frasco 100 mL'),
    evidenceLevel: 'Página oficial Agener + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://agener.com.br/produtos/grandes-animais/especialidades/agecox-neo/',
    labelUrl: 'https://agener.com.br/produtos/grandes-animais/especialidades/agecox-neo/',
  },
  {
    id: 'afectrim-suspensao-duprat',
    slug: 'afectrim-sulfametoxazol-trimetoprima',
    name: 'Afectrim Suspensão Oral',
    manufacturer: 'Duprat',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    commercialSubclasses: ['infectious_antibiotic', 'gi_antiprotozoal'],
    species: ['dog', 'cat'],
    presentations: ['Frasco 100 mL — sulfametoxazol 40 mg/mL + trimetoprima 8 mg/mL (48 mg/mL da associação)'],
    activeComponents: ['sulfametoxazol', 'trimetoprima'],
    searchAliases: ['afect trim', 'sulfa trimetoprima suspensão'],
    labelCompositionSummary:
      'Cada 100 mL: sulfametoxazol 4,0 g + trimetoprima 0,8 g (48 mg/mL da associação total).',
    labelDirections:
      'Cães e gatos: 1 mL/kg VO q24h OU 0,5 mL/kg VO q12h por 3–5 dias. Agitar antes de usar; pode administrar puro, na água ou no alimento.',
    dosageGuidance: {
      labelDose: '1 mL/kg q24h ou 0,5 mL/kg q12h por 3–5 dias (= 48 mg/kg/dia da associação).',
      ...SMX_TMP_DOG_CAT_DOSAGE,
      notes: [
        ...(SMX_TMP_DOG_CAT_DOSAGE.notes || []),
        'Bula veterinária orienta q24h ou q12h; Plumb\'s pode indicar esquemas distintos — manter fonte visível.',
      ],
    },
    plumbsContext: SMX_TMP_PLUMBS_CONTEXT,
    clinicalUse:
      'Antimicrobiano potencializado para infecções respiratórias, urinárias, gastrointestinais e dermatológicas em cães e gatos; bula inclui isosporose e toxoplasmose.',
    reassessment:
      'Reavaliar em 48–72 h. Uso >7 dias: hemograma, perfil hepatorrenal; Schirmer basal em cães.',
    prescriptionExample:
      'Afectrim 100 mL: administrar ___ mL/kg VO q12h ou q24h por ___ dias, conforme diagnóstico e bula.',
    safetyAlert:
      'Contraindicado em gestantes/recém-nascidos, lesão hepática/renal e hipersensibilidade a sulfas. Não associar com cálcio, antiácidos ou anticoagulantes.',
    price: priceRange(56.9, 56.9, 'Cobasi — frasco 100 mL (fonte única consultada)'),
    evidenceLevel: 'Bula Duprat/Bulário Veterinário + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://www.cobasi.com.br/afectrim-solucao-oral-100-ml-duprat-3940500/p',
    labelUrl: 'https://www.bulario.vet.br/2016/06/bula-afectrim-laboratorios-duprat-ltda.html',
    catalogMedicationId: 'editorial:sulfametoxazol-trimetoprima',
  },
  {
    id: 'sultrim-suspensao-jofadel',
    slug: 'sultrim-sulfametoxazol-trimetoprima',
    name: 'Sultrim Suspensão Oral',
    manufacturer: 'Jofadel',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    commercialSubclasses: ['infectious_antibiotic', 'gi_antiprotozoal'],
    species: ['dog', 'cat'],
    presentations: ['Frasco 100 mL — sulfametoxazol 40 mg/mL + trimetoprima 8 mg/mL'],
    activeComponents: ['sulfametoxazol', 'trimetoprima'],
    searchAliases: ['sul trim', 'jofadel sultrim'],
    labelCompositionSummary:
      'Cada 100 mL: sulfametoxazol 4,0 g + trimetoprima 0,8 g. Antibacteriano e antiprotozoário de amplo espectro.',
    labelDirections:
      'Cães e gatos: 1 mL/kg VO q12h por 4–5 dias. Cães >20 kg: 30 mL q12h conforme bula.',
    dosageGuidance: {
      labelDose: '1 mL/kg VO q12h por 4–5 dias (= 48 mg/kg/dia da associação, dividido q12h).',
      ...SMX_TMP_DOG_CAT_DOSAGE,
    },
    plumbsContext: SMX_TMP_PLUMBS_CONTEXT,
    clinicalUse:
      'Associação SMX+TMP em suspensão para infecções gastrointestinais, respiratórias e urinárias sensíveis em cães e gatos.',
    reassessment:
      'Reavaliar resposta clínica; monitorar hidratação, função renal e sinais de hipersensibilidade.',
    prescriptionExample:
      'Sultrim 100 mL: administrar 1 mL/kg VO a cada 12 horas por 4–5 dias (ajustar em cães >20 kg conforme bula).',
    safetyAlert:
      'Manter água disponível. Cautela em doença renal/hepática. Risco de KCS em cães em uso prolongado (Plumb\'s).',
    price: priceRange(13.7, 36.5, 'Pet Online BH R$ 13,70; Casa do Compadre R$ 36,50 — frasco 100 mL'),
    evidenceLevel: 'Bula Jofadel/Vetsmart + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://vetsmart.com.br/cg/produto/459/sultrim-suspensao-oral',
    labelUrl: 'https://vetsmart.com.br/cg/produto/459/sultrim-suspensao-oral',
    catalogMedicationId: 'editorial:sulfametoxazol-trimetoprima',
  },
  {
    id: 'bactrim-f-roche',
    slug: 'bactrim-sulfametoxazol-trimetoprima',
    name: 'Bactrim F',
    manufacturer: 'Roche / genéricos',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_antibiotic',
    commercialSubclasses: ['infectious_antibiotic'],
    species: ['dog', 'cat'],
    presentations: [
      'Comprimido — sulfametoxazol 800 mg + trimetoprima 160 mg (associação 960 mg)',
      'Comprimido — sulfametoxazol 400 mg + trimetoprima 80 mg (associação 480 mg)',
      'Suspensão oral 200 mg + 40 mg/5 mL (associação 240 mg/5 mL)',
    ],
    activeComponents: ['sulfametoxazol', 'trimetoprima'],
    searchAliases: ['bactrim', 'tmp-smx humano', 'sulfametoxazol trimetoprima roche'],
    labelCompositionSummary:
      'Medicamento humano. Bactrim F: 800 mg SMX + 160 mg TMP por comprimido. Proporção fixa 5:1 entre SMX e TMP.',
    labelDirections:
      'Posologia humana conforme bula Anvisa. Uso veterinário é extrabula; calcular mg/kg da associação total, não apenas de um componente.',
    dosageGuidance: {
      labelDose: 'Humano: conforme bula Roche/Anvisa por indicação e peso do paciente.',
      ...SMX_TMP_DOG_CAT_DOSAGE,
      notes: [
        ...(SMX_TMP_DOG_CAT_DOSAGE.notes || []),
        'Produto humano — preferir apresentações veterinárias (Sulfaprim, Afectrim, Sultrim) quando disponíveis.',
        'Fracionar comprimidos exige cálculo cuidadoso; suspensão pode facilitar ajuste em filhotes.',
      ],
    },
    plumbsContext: SMX_TMP_PLUMBS_CONTEXT,
    clinicalUse:
      'Referência extrabula econômica de SMX+TMP quando apresentação veterinária indisponível. Reservar a indicações sustentadas por cultura, susceptibilidade ou diretriz.',
    reassessment:
      'Reavaliar em 48–72 h. Schirmer em cães se uso >7 dias. Hemograma se tratamento prolongado.',
    prescriptionExample:
      'Uso extrabula veterinário: sulfametoxazol + trimetoprima ___ mg/kg (associação total) VO q12h ou q24h por ___ dias. Produto humano Bactrim F — registrar no receituário.',
    safetyAlert:
      'Medicamento humano extrabula. Risco de KCS, discrasias, hepatotoxicidade e hipersensibilidade. Contraindicado se alergia a sulfas. Manter hidratação.',
    price: priceRange(18.9, 42.5, 'Consulta Remédios / drogarias — caixa 10–20 comprimidos 400+80 mg (varia por genérico)'),
    evidenceLevel: 'Bula humana Roche/Anvisa + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://consultaremedios.com.br/bactrim-f/p',
    labelUrl: 'https://consultaremedios.com.br/bactrim-f/bula',
    catalogMedicationId: 'editorial:sulfametoxazol-trimetoprima',
  },
];
