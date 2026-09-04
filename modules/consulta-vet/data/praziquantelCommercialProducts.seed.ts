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

const PZQ_PLUMBS_CONTEXT =
  'Plumb\'s 10ª ed., monografia Praziquantel (pp. 1053–1056): monodroga 5–10 mg/kg VO dose única para cestódeos; combinações Drontal/Duprantel entregam praziquantel + pirantel ± febantel conforme tabela de peso.';

const PZQ_MONODROGA_DOG_CAT: CommercialMedicationDosageGuidance = {
  plumbs: {
    dog: [
      {
        title: 'Cestódeos — monodroga VO',
        dose: '5 mg/kg VO dose única (tabelas Droncit/Drontal).',
      },
      {
        title: 'Cestódeos — monodroga IM/SC extrabula',
        dose: '5–7,5 mg/kg dose única quando VO impossível.',
      },
    ],
    cat: [
      {
        title: 'Cestódeos — monodroga VO extrabula',
        dose: '5–10 mg/kg VO dose única.',
      },
    ],
  },
  notes: [
    'No Brasil, praziquantel isolado é raro; produtos comerciais usam combinações com pirantel ± febantel.',
    'Para Dipylidium, controlar pulgas (hospedeiro intermediário).',
  ],
};

export const praziquantelCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'duprantel-gatos-duprat',
    slug: 'duprantel-gatos-praziquantel',
    name: 'Duprantel Gatos',
    manufacturer: 'Duprat',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_cat',
    commercialSubclasses: ['parasite_dewormer_cat'],
    species: ['cat'],
    presentations: ['Caixa com 4 comprimidos (340 mg cada)'],
    activeComponents: ['praziquantel', 'pamoato de pirantel'],
    searchAliases: ['duprantel', 'praziquantel gatos', 'duprat vermifugo'],
    labelCompositionSummary:
      'Cada comprimido: praziquantel 20 mg + pamoato de pirantel 230 mg. Equivalente de dose a Drontal Gatos (~5 mg/kg PZQ por 4 kg/cp).',
    labelDirections:
      'Administrar VO em dose única conforme peso: até 1 kg = 1/4 cp; 1–2 kg = 1/2 cp; 2–3 kg = 3/4 cp; 3–4 kg = 1 cp.',
    dosageGuidance: {
      labelDose: '1 comprimido trata até 4 kg (tabela por peso na bula).',
      plumbs: {
        cat: [
          {
            title: 'Nematódeos e cestódeos — combinação',
            dose: 'Mín. 5 mg/kg praziquantel + 20 mg/kg pirantel VO dose única (tabela por peso).',
          },
          ...PZQ_MONODROGA_DOG_CAT.plumbs!.cat!,
        ],
      },
      notes: PZQ_MONODROGA_DOG_CAT.notes,
    },
    plumbsContext: PZQ_PLUMBS_CONTEXT,
    clinicalUse: 'Vermifugação felina econômica para nematódeos e cestódeos conforme bula Duprat.',
    reassessment: 'Reavaliar reinfecção, pulgas (Dipylidium) e contactantes.',
    prescriptionExample:
      'Duprantel Gatos: administrar ___ comprimido(s) por via oral em dose única, conforme tabela de peso da bula.',
    safetyAlert:
      'Contraindicado em hipersensibilidade. Cautela em animais debilitados. Não confundir com apresentação canina.',
    price: priceRange(13.92, 24.69, 'Agropetweb R$ 14,90; Estância Pet R$ 14,13; Terra Zoo R$ 24,69 — caixa 4 cp'),
    evidenceLevel: 'Bula Duprat/Consulta Remédios + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://consultaremedios.com.br/duprantel/p',
    labelUrl: 'https://consultaremedios.com.br/duprantel/p',
    imageUrl:
      'https://agropetweb.com.br/wp-content/uploads/2021/11/vermifugo-duprantel-para-gatos-com-4-comprimidos.jpg',
    catalogMedicationId: 'editorial:praziquantel',
  },
  {
    id: 'duprantel-plus-caes-duprat',
    slug: 'duprantel-plus-caes-praziquantel',
    name: 'Duprantel Plus Cães',
    manufacturer: 'Duprat',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog'],
    species: ['dog'],
    presentations: ['Blíster com 2 comprimidos revestidos (660 mg cada)'],
    activeComponents: ['praziquantel', 'pamoato de pirantel', 'febantel'],
    searchAliases: ['duprantel plus', 'praziquantel caes duprat'],
    labelCompositionSummary:
      'Cada comprimido: praziquantel 50 mg + pamoato de pirantel 144 mg + febantel 150 mg (~1 cp/10 kg).',
    labelDirections:
      'Administrar VO em dose única: até 2 kg = 1/4 cp; 2–5 kg = 1/2 cp; 5–10 kg = 1 cp.',
    dosageGuidance: {
      labelDose: 'Tabela de peso Duprantel Plus: 1 cp para 5–10 kg em dose única.',
      plumbs: {
        dog: [
          {
            title: 'Nematódeos e cestódeos — Drontal Plus equivalente',
            dose: 'Mín. 5 mg/kg praziquantel + 25 mg/kg febantel + 5 mg/kg pirantel VO dose única (tabela por peso).',
          },
          ...PZQ_MONODROGA_DOG_CAT.plumbs!.dog!,
        ],
      },
      notes: PZQ_MONODROGA_DOG_CAT.notes,
    },
    plumbsContext: PZQ_PLUMBS_CONTEXT,
    clinicalUse: 'Vermifugação canina de amplo espectro (nematódeos + cestódeos) conforme bula Duprat.',
    reassessment: 'Reavaliar coproparasitológico, reinfecção ambiental e controle de pulgas se Dipylidium.',
    prescriptionExample:
      'Duprantel Plus Cães: administrar ___ comprimido(s) por via oral em dose única conforme peso.',
    safetyAlert:
      'Não usar em gatos. Contraindicado em hipersensibilidade; cautela em debilitados.',
    price: priceRange(15, 35, 'Varejo veterinário variável — blister 2 cp; confirmar apresentação'),
    evidenceLevel: 'Bula Duprat/Consulta Remédios + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://consultaremedios.com.br/duprantel/p',
    labelUrl: 'https://consultaremedios.com.br/duprantel/p',
    imageUrl:
      'https://agropetweb.com.br/wp-content/uploads/2021/11/vermifugo-duprantel-para-gatos-com-4-comprimidos.jpg',
    catalogMedicationId: 'editorial:praziquantel',
  },
  {
    id: 'drontal-plus-35kg-elanco',
    slug: 'drontal-plus-35kg-caes',
    name: 'Drontal Plus Mais Sabor 35 kg',
    manufacturer: 'Elanco',
    commercialClass: 'parasiticide',
    commercialSubclass: 'parasite_dewormer_dog',
    commercialSubclasses: ['parasite_dewormer_dog', 'parasite_giardia'],
    species: ['dog'],
    presentations: [
      'Comprimido palatável 2.718 mg — trata 35 kg/cp',
      'Cartucho com 2 comprimidos',
    ],
    activeComponents: ['praziquantel', 'pamoato de pirantel', 'febantel'],
    searchAliases: ['drontal plus 35', 'drontal grande porte'],
    labelCompositionSummary:
      'Cada comprimido de 2.718 mg trata 35 kg. Contém praziquantel + febantel + pamoato de pirantel em escala proporcional à apresentação 10 kg.',
    labelDirections:
      '15–17,5 kg: 1/2 cp; 17,6–35 kg: 1 cp; 35,1–52,5 kg: 1,5 cp; 52,6–70 kg: 2 cp. Verminoses: dose única. Giardia: q24h × 3 dias.',
    dosageGuidance: {
      labelDose: '1 comprimido/35 kg VO: dose única (vermes) ou q24h × 3 dias (Giardia).',
      plumbs: {
        dog: [
          {
            title: 'Nematódeos e cestódeos',
            dose: 'Usar tabela de peso da apresentação 35 kg em dose única.',
          },
          {
            title: 'Giardia spp.',
            dose: 'Mesma dose da tabela q24h por 3 dias + higiene ambiental.',
          },
          {
            title: 'Praziquantel monodroga (referência)',
            dose: '5 mg/kg VO dose única para cestódeos isolados.',
          },
        ],
      },
      notes: [
        'Apresentação para cães médios/grandes; não confundir com apresentação 10 kg.',
        'Giardia exige manejo ambiental e reavaliação coproparasitológica.',
      ],
    },
    plumbsContext: PZQ_PLUMBS_CONTEXT,
    clinicalUse: 'Verminoses e giardíase em cães de porte médio/grande conforme bula Elanco.',
    reassessment: 'Reavaliar fezes, resposta clínica e reinfecção. Em Giardia, revisar banho e limpeza ambiental.',
    prescriptionExample:
      'Drontal Plus 35 kg: administrar ___ comprimido(s) por via oral conforme peso; dose única ou q24h × 3 dias se Giardia.',
    safetyAlert:
      'Não usar em gatos. Filhotes <3 semanas ou <2 kg contraindicados. Cautela em gestação (primeiras 4 semanas), renal/hepática ou debilitados.',
    price: priceRange(101.71, 139.9, 'Caiuna Pet R$ 101,71; Cobasi R$ 116,55; Dog&Cat R$ 123,90 — 2 cp 35 kg'),
    evidenceLevel: 'Bula Elanco + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
    productPageUrl: 'https://www.cobasi.com.br/drontal-plus-mais-sabor-caes-35kg-31170236/p',
    labelUrl: 'https://vet.elanco.com/br/produtos/drontal',
    imageUrl:
      'https://cobasi.vtexassets.com/arquivos/ids/1077297/DrontalPlus-Sabor_10kg-2cps-1.webp?v=638862988851730000',
    catalogMedicationId: 'editorial:praziquantel',
  },
];

export function enrichPraziquantelCommercialProduct(
  product: CommercialMedicationProduct,
): CommercialMedicationProduct {
  if (product.slug === 'drontal-gatos-comprimidos') {
    return {
      ...product,
      catalogMedicationId: 'editorial:praziquantel',
      labelCompositionSummary:
        'Cada comprimido (339 mg): praziquantel 20 mg + pamoato de pirantel 230 mg. 1 comprimido trata 4 kg (~5 mg/kg PZQ).',
      dosageGuidance: {
        labelDose: '1 comprimido/4 kg VO dose única (tabela por peso na bula).',
        plumbs: {
          cat: [
            {
              title: 'Nematódeos e cestódeos — Drontal Gatos',
              dose: 'Mín. 5 mg/kg praziquantel + 20 mg/kg pirantel VO dose única (1 cp/4 kg).',
            },
            {
              title: 'Cestódeos — monodroga extrabula',
              dose: '5–10 mg/kg VO dose única.',
            },
          ],
        },
        notes: [
          'Controlar pulgas para prevenir reinfecção por Dipylidium caninum.',
          'Comprimidos podem ser fracionados conforme tabela de peso.',
        ],
      },
      plumbsContext: PZQ_PLUMBS_CONTEXT,
      price: priceRange(53.99, 73.17, 'Curral Vet R$ 53,99; Cobasi R$ 55,50; Estância Pet R$ 73,17 — 4 cp'),
      evidenceLevel: 'Bula Elanco/Consulta Remédios + Plumb\'s Veterinary Drug Handbook, 10ª ed.',
      labelUrl: 'https://consultaremedios.com.br/drontal-gatos/bula',
    };
  }

  if (product.slug === 'drontal-plus-caes') {
    return {
      ...product,
      catalogMedicationId: 'editorial:praziquantel',
      dosageGuidance: {
        ...product.dosageGuidance,
        plumbs: {
          dog: [
            ...(product.dosageGuidance?.plumbs?.dog || []),
            {
              title: 'Praziquantel monodroga (referência Plumb\'s)',
              dose: '5 mg/kg VO dose única para cestódeos isolados.',
            },
            {
              title: 'Praziquantel IM/SC extrabula',
              dose: '5–7,5 mg/kg dose única quando VO impossível.',
            },
          ],
        },
      },
      plumbsContext: PZQ_PLUMBS_CONTEXT,
      price: priceRange(45, 130, 'Variável por apresentação 10 kg vs 35 kg — confirmar embalagem'),
    };
  }

  return product;
}
