import type { SupplementProduct, SupplementSku } from '../../lib/supplementCatalog/types'
import { buildProducts, mapNames } from './seedBuilder'

const avertVitaminas = mapNames('avert', [
  'Foli B',
  'Kalium Vet',
  'Kalium Vet Gatos',
  'Doss Vet',
  'Pet Protein',
  'Nutrapet',
  'Sarcopen Vet',
], {
  productClass: 'suplemento_vitaminico_mineral',
  primaryCategory: 'vitaminas_e_minerais',
})

const avertOmega = mapNames('avert', [
  'Ograx-3 500',
  'Ograx-3 1000',
  'Ograx-3 1500',
  'Ograx-3 500 com 30 cápsulas',
  'Ograx-3 500 com 90 cápsulas',
  'Ograx Plus 5',
  'Ograx Plus 15',
  'Ograx Baby',
  'Ograx Gatos',
  'Ograx Derme 10',
  'Ograx Derme 20',
  'Ograx Cell 5',
  'Ograx Cell 15',
  'Ograx Senior 5',
  'Ograx Senior 10',
  'Ograx Artro 5',
  'Ograx Artro 10',
  'Ograx Artro 20',
], {
  productClass: 'suplemento_acidos_graxos',
  primaryCategory: 'omega_3',
  notes: 'Confirmar rótulo: suplemento alimentar, não medicamento.',
})

const avertMicrobiota = mapNames('avert', [
  'Up Flora Mini',
  'Up Flora',
  'Babyflora',
  'Beneflora Vet',
  'Beneflora Gatos',
  'Beneflora Derme',
  'Beneflora Oro',
  'Probiotic Pet',
  'Sanus 100 mg',
  'Sanus 200 mg',
  'Vitecol',
], {
  productClass: 'probiotico',
  primaryCategory: 'microbiota',
})

const avertPele = mapNames('avert', [
  'Queranon cápsulas',
  'Queranon comprimidos',
  'Queranon pasta',
  "Queranon Stick's",
  'Queranon Small Size cápsulas',
  'Queranon Small Size comprimidos',
  'Queranon LB',
  'Refos Derme',
  'Refos Derme 30',
  'Dermapet',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'pele_pelagem',
})

const avertArticular = mapNames('avert', [
  'Condroplex 500 cápsulas',
  'Condroplex 1000 cápsulas',
  'Condroplex 500 comprimidos',
  'Condroplex 1000 comprimidos',
  'Condroplex pasta',
  "Condroplex Stick's",
  'Condroplex LB',
  "Condroplex Stick's LB",
  'Artrotabs pasta',
  'Artrotabs Vet',
  "Artrotabs Stick's",
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'articulacoes_nutricional',
  notes: 'Confirmar enquadramento alimentar no rótulo brasileiro.',
})

const avertImuno = mapNames('avert', [
  'Macrogard Pet',
  'Macrogard Pet Pasta',
  'Macrogard Pet Small Size',
  "Macrogard Pet Stick's",
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'imunonutricao',
})

const avertLongCare = mapNames('avert', [
  'LongCare Fit 50 g',
  'LongCare Fit 250 g',
  'LongCare Hypersensitive Hydrolyzed Protein 50 g',
  'LongCare Hypersensitive Hydrolyzed Protein 250 g',
  'LongCare Sensitive Lamb 50 g',
  'LongCare Sensitive Lamb 250 g',
  'LongCare Sensitive Salmon/Tilapia 50 g',
  'LongCare Sensitive Salmon/Tilapia 250 g',
  'LongCare Mobility 50 g',
  'LongCare Mobility 250 g',
  'LongCare Nutrimun 50 g',
  'LongCare Nutrimun 250 g',
  'LongCare Zen 50 g',
  'LongCare Zen 250 g',
], {
  productClass: 'petisco_funcional',
  primaryCategory: 'petisco_funcional',
})

const avertEnergia = mapNames('avert', [
  'Glicopet',
  'Hemolipet Comprimidos',
  'Hemolipet Suspensão',
  "Hemolipet Stick's",
  'Caninus Protein Bar',
], {
  productClass: 'suplemento_energetico',
  primaryCategory: 'hematopoiese_nutricional',
})

const vetnil = [
  ...mapNames('vetnil', [
    'Aminomix Gold',
    'Aminomix Pet Pó',
    'Aminomix Pet Comprimidos',
    'Cal-d-mix',
    'Glicopan Gold',
    'Glicopan Pet',
    'Nutralife',
    'Geripet',
    'Vita-vet C',
  ], { productClass: 'suplemento_vitaminico_mineral', primaryCategory: 'vitaminas_e_minerais' }),
  ...mapNames('vetnil', [
    'Hemolitan Gold',
    'Hemolitan Pet Líquido',
    'Hemolitan Pet Comprimidos',
  ], { productClass: 'suplemento_alimentar', primaryCategory: 'hematopoiese_nutricional' }),
  ...mapNames('vetnil', [
    'Ômega 3+SE 550',
    'Ômega 3+SE 1100',
    'Pelo & Derme 750 DHA+EPA',
    'Pelo & Derme 1500 DHA+EPA',
    'Pelo & Derme Gold',
  ], { productClass: 'suplemento_acidos_graxos', primaryCategory: 'omega_3' }),
  ...mapNames('vetnil', [
    'Probiótico Vetnil Cães e Gatos',
    'ProbioUp Simbio',
    'ProbioUp Cat Imune',
    'ProbioUp Dog Imune',
    'Organew Pet',
    'Organew Pet Pasta',
  ], { productClass: 'simbiotico', primaryCategory: 'microbiota' }),
  ...mapNames('vetnil', ['Promater Pet Pó'], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'gestacao_lactacao',
  }),
  ...mapNames('vetnil', ['Pet Milk'], {
    productClass: 'substituto_do_leite',
    primaryCategory: 'substituto_do_leite',
    notes: 'Classificar como substituto do leite após rótulo.',
  }),
  ...mapNames('vetnil', ['Eletrolítico Pet'], {
    productClass: 'suplemento_eletrolitico',
    primaryCategory: 'eletrolitos_hidratacao',
  }),
  ...mapNames('vetnil', ['Condroton'], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'articulacoes_nutricional',
    notes: 'Confirmar classificação alimentar atual.',
  }),
]

const organnact = mapNames('organnact', [
  'Promun Defense Boost Cat',
  'Promun Defense Boost Dog',
  'Lactobac Dog Plus',
  'Glicol Pet',
  'Nutrifull Cat',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'imunonutricao',
  notes: 'Varredura oficial Organnact — cães/gatos apenas.',
})

const botupharmaPremixCao = mapNames('botupharma', [
  'Food Dog Transition',
  'Food Dog Basic',
  'Food Dog Filhote',
  'Food Dog Adulto',
  'Food Dog Sênior',
  'Food Dog Fit Fibras',
  'Food Dog Zero Proteína Animal',
  'Food Dog Baixo Fósforo',
  'Food Dog Dietas Hiperproteicas',
  'Food Dog Dietas Cruas sem Ossos',
  'Food Dog Dietas Cruas com Ossos',
], {
  productClass: 'premix_balanceador',
  primaryCategory: 'premix_dieta_caseira',
  species: ['dog'],
  notes: 'Premix exige receita alimentar associada — não prescrever isolado.',
})

const botupharmaPremixGato = mapNames('botupharma', ['Food Cat Adulto'], {
  productClass: 'premix_balanceador',
  primaryCategory: 'premix_dieta_caseira',
  species: ['cat'],
})

const botupharmaSuplementos = mapNames('botupharma', [
  'Food Pet Mix',
  'Artroplus Dog',
  'Ômega 3 Vet',
  'LactoFull Probiótico e Prebiótico',
  'Vitamina D3',
  'Condro Dog',
  'Energy Dog',
  'Encor Dog',
  'Red Up Dog',
  'Fit Dog',
  'Cistin Dog',
  'Epoclean Dog',
  'Entrin Dog',
  'Keratin Dog',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
  notes: 'Confirmar individualmente como suplemento alimentar.',
})

const nutripharme = [
  ...mapNames('nutripharme', [
    'Globion Pet',
    'Globion 500',
    'Ferrofood',
    'Calcific',
    'Vita Energy Líquido',
    'VitaEnergy Comprimidos',
    'Geriátrico 500',
    'Geriátrico 1000',
  ], { productClass: 'suplemento_vitaminico_mineral', primaryCategory: 'vitaminas_e_minerais' }),
  ...mapNames('nutripharme', ['Imderme Pump', 'Imderme 500', 'Imderme 1000'], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'pele_pelagem',
  }),
  ...mapNames('nutripharme', ['Nutricart', 'Nutricart Expert'], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'articulacoes_nutricional',
  }),
  ...mapNames('nutripharme', ['Poligyn 10', 'Poligyn 25', 'VitaEnergy Lactação'], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'gestacao_lactacao',
  }),
  ...mapNames('nutripharme', ['Renafil 500', 'Renafil 1000'], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'suporte_renal_nutricional',
    notes: 'Suporte nutricional renal — não tratar doença.',
  }),
  ...mapNames('nutripharme', ['Support Renafil'], {
    productClass: 'alimento_enteral_complementar',
    primaryCategory: 'suporte_renal_nutricional',
  }),
  ...mapNames('nutripharme', [
    'Support First Milk',
    'Support Milk Cat',
    'Support Milk Dog',
    'Support Papinha Dog',
    'Support Papinha Cat',
    'Support AIG Dog',
    'Support AIG Cat',
  ], {
    productClass: 'alimento_especifico',
    primaryCategory: 'neonatal',
    notes: 'Classificar conforme rótulo: substituto do leite ou enteral.',
  }),
]

const softCare = mapNames('soft-care', [
  'Mobility Collagen',
  'Derma Skin PEA',
  'Vitality Eye & Mind',
  'Bioflora Pet Tabs',
  'Serenity Pet Tabs',
  'SAMe Complex Pet Tabs',
  'Immunity Pet Tabs',
  'Dental Pet Tabs',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
  notes: 'SAMe e Dental: confirmar classificação alimentar antes de liberar.',
}).map((item) =>
  item.commercialName === 'Dental Pet Tabs'
    ? { ...item, productClass: 'petisco_funcional' as const, primaryCategory: 'petisco_funcional' as const }
    : item.commercialName === 'SAMe Complex Pet Tabs'
      ? { ...item, medicineStatus: 'unknown' as const, notes: 'Confirmar suplemento alimentar vs medicamento antes de liberar.' }
      : item,
)

const syntec = mapNames('syntec', [
  'Nutrepack Fácil',
  'Condrotec Pet Fácil',
  'Silitec Fácil',
  'Supre Gatos',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
})

const agener = mapNames('agener-uniao', [
  'Hidrapet Omega',
  'Lacri Caps Pet',
  'Mega Mater Pet',
  'OmegaTop 3 500 mg',
  'OmegaTop 3 1000 mg',
  'Pro Cart',
  'Pro Cart 25',
  'Procart Flex',
  'Q Pelo Pet',
  'Revimax',
  'Revipel',
  'Ball Free',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'omega_3',
  notes: 'Ball Free: auxílio nutricional bolas de pelo conforme rótulo.',
})

const ourofino = mapNames('ourofino', [
  'Ativi',
  'Biocanis',
  'Condromax Pet',
  'Energy Pet',
  'Imunees Ourofino Snacks',
  'Kardio',
  'Longil Cães',
  'Longil Snacks',
  'Metacell Pet',
  'Plenipil',
  'Rennaiz Snacks',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
  notes: 'Snacks como petisco_funcional após rótulo.',
}).map((item) =>
  /snack/i.test(item.commercialName)
    ? { ...item, productClass: 'petisco_funcional' as const, primaryCategory: 'petisco_funcional' as const }
    : item,
)

const virbac = mapNames('virbac', [
  'Complederm',
  'Movoflex',
  'Pronefra',
  'Feluro',
  'Nutri-plus Gel',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'pele_pelagem',
  notes: 'Confirmar rótulo brasileiro antes de liberar prescrição.',
}).map((item) =>
  item.commercialName === 'Nutri-plus Gel'
    ? { ...item, productClass: 'alimento_enteral_complementar' as const }
    : item.commercialName === 'Complederm'
      ? { ...item, productClass: 'suplemento_acidos_graxos' as const, primaryCategory: 'omega_3' as const }
      : item,
)

const coveli = mapNames('coveli', [
  'Bulvitan Probiótico',
  'Bulvitan Plus',
  'Bulvitan Derme',
  'Condroivet 1000',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'microbiota',
})

const coveliStaging = mapNames('coveli', [
  'Calmindog',
  'Calminvet',
  'Silimavet',
  'Previn ATX',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'intestinal',
  medicineStatus: 'unknown',
  marketStatus: 'pending_confirmation',
  notes: 'Staging regulatório — confirmar suplemento alimentar vs medicamento/fitoterápico.',
})

const nutrisana = mapNames('nutrisana', [
  'Nutrisana Sênior',
  'Nutrisana Hep',
  'Nutrisana Hep Plus',
  'Nutrisana Glutamina',
  'Nutrisana Omex 3',
  'Nutrisana Vitamina B12',
  'Nutrisana Immunity',
  'Nutrisana NeoComplex',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
})

const happyMed = mapNames('happy-med', [
  'Happy Bones',
  'Happy Days',
  'Happy Zen',
  'Happy Glow',
  'Happy Flora Comprimidos',
  'Happy Flora Pasta',
  'Happy Flora Gatos',
  'Happy Days Renalis',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
  marketStatus: 'active_recent_launch',
  requiresSixMonthReaudit: true,
  clinicalRecommendationEnabled: false,
  notes: 'Lançamento 2026 — staging até rótulo integral.',
})

const buddy = mapNames('buddy-nutrition', [
  'Digestão & Flora Intestinal',
  'Pele & Pelagem',
  'Ossos & Articulações',
  'Multi Funcional',
  'Tranquilidade',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
  duplicateActivesCheckRequired: true,
  notes: 'Produtos individuais — kits não são produto.',
})

const inovet = [
  ...mapNames('inovet', ['Aquálitus Blue', 'Eletrorade'], {
    productClass: 'suplemento_eletrolitico',
    primaryCategory: 'eletrolitos_hidratacao',
  }),
  ...mapNames('inovet', ['Pancrezyme Cápsulas', 'Pancrezyme Sachês'], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'intestinal',
    medicineStatus: 'unknown',
    notes: 'Incluir somente se rótulo confirmar suplemento/alimento complementar.',
  }),
  ...mapNames('inovet', [
    'Glutamax',
    'Hemocare',
    'Targimax10',
    'Captor',
    "Angels' Eyes",
    'Pet Zentrum A-Z',
    'Omegaderm',
    'EOff',
    'PlaqueOff',
    'Micro-Lac',
  ], {
    productClass: 'suplemento_alimentar',
    primaryCategory: 'vitaminas_e_minerais',
    marketStatus: 'historical',
    notes: 'Produto histórico — oculto até reconfirmação.',
  }),
]

const bioctal = mapNames('bioctal', [
  'Florentero ACT',
  'Nuxcell Plus',
  'Nuxcell Fel Biosyn',
], {
  productClass: 'simbiotico',
  primaryCategory: 'microbiota',
  notes: 'Staging até rótulo e classificação MAPA.',
})

const fortiflora = mapNames('purina-fortiflora', ['FortiFlora Canine', 'FortiFlora Feline'], {
  productClass: 'probiotico',
  primaryCategory: 'microbiota',
  marketStatus: 'imported_pending_confirmation',
  clinicalRecommendationEnabled: false,
  notes: 'Aguardar rótulo nacional, cepa, UFC/sachê e importador.',
})

const petz = mapNames('petz-private-label', [
  'Petz Pre & Probiotic Cães',
  'Petz Articular Cães',
  'Petz Relax Cães',
], {
  productClass: 'suplemento_alimentar',
  primaryCategory: 'vitaminas_e_minerais',
  notes: 'Exigir fabricante industrial, CNPJ e composição — varejo não confirma sozinho.',
})

const ALL_INPUTS = [
  ...avertVitaminas,
  ...avertOmega,
  ...avertMicrobiota,
  ...avertPele,
  ...avertArticular,
  ...avertImuno,
  ...avertLongCare,
  ...avertEnergia,
  ...vetnil,
  ...organnact,
  ...botupharmaPremixCao,
  ...botupharmaPremixGato,
  ...botupharmaSuplementos,
  ...nutripharme,
  ...softCare,
  ...syntec,
  ...agener,
  ...ourofino,
  ...virbac,
  ...coveli,
  ...coveliStaging,
  ...nutrisana,
  ...happyMed,
  ...buddy,
  ...inovet,
  ...bioctal,
  ...fortiflora,
  ...petz,
]

const built = buildProducts(ALL_INPUTS)

export const supplementProductsSeed: SupplementProduct[] = built.products
export const supplementSkusSeed: SupplementSku[] = built.skus

export const supplementProductBySlug = Object.fromEntries(
  supplementProductsSeed.map((p) => [p.slug, p]),
) as Record<string, SupplementProduct>
