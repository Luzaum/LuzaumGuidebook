/**
 * Catálogo técnico de alimentos úmidos — Brasil (auditoria 2026-08-03).
 * Exporta definições de produto para merge-brazil-wet-foods.mjs
 */

const PREMIER = {
  manufacturer: 'PremieRpet',
  brand: 'PremieR',
  officialBase: 'https://premierpet.com.br',
}

const RC = {
  manufacturer: 'Royal Canin',
  brand: 'Royal Canin',
  officialBase: 'https://www.royalcanin.com/br',
}

const HILLS = {
  manufacturer: "Hill's Pet Nutrition",
  brand: "Hill's",
  officialBase: 'https://www.hillspet.com.br',
}

const FARMINA = {
  manufacturer: 'Farmina',
  brand: 'Farmina',
  officialBase: 'https://www.farmina.com/br',
}

const GUABI = {
  manufacturer: 'Guabi Natural',
  brand: 'Guabi Natural',
  officialBase: 'https://www.guabinatural.com.br',
}

function premierNC(idSuffix, name, speciesScope, grams, guaranteed, extra = {}) {
  return {
    id: `premier-nc-${idSuffix}-${grams}g`,
    name: `PremieR Nutrição Clínica Úmido — ${name}`,
    category: 'Sachê',
    speciesScope,
    foodType: 'commercial',
    presentation: `Sachê ${grams} g`,
    packageGrams: grams,
    format: 'sachet',
    completenessClass: 'coadjuvant_complete',
    nutrientBasis: 'as_fed_guaranteed',
    manufacturer: PREMIER.manufacturer,
    brand: PREMIER.brand,
    line: 'Nutrição Clínica Úmidos',
    energyKcalKg: guaranteed.energyKcalKg,
    guaranteed,
    officialSourceUrl: extra.url ?? `${PREMIER.officialBase}/produto/premier-nutricao-clinica-umidos-${idSuffix}/`,
    ingredientsRaw: extra.ingredients,
    manufacturerIndications: extra.indications,
    extraNotes: extra.notes,
  }
}

function rcVet(id, name, speciesScope, grams, guaranteed, extra = {}) {
  return {
    id,
    name: `Royal Canin Veterinary — ${name}`,
    category: grams >= 200 ? 'Lata' : 'Sachê',
    speciesScope,
    foodType: 'commercial',
    presentation: extra.presentation ?? `${grams} g`,
    packageGrams: grams,
    format: extra.format ?? 'pate',
    completenessClass: 'coadjuvant_complete',
    nutrientBasis: 'as_fed_guaranteed',
    manufacturer: RC.manufacturer,
    brand: RC.brand,
    line: 'Veterinary',
    energyKcalKg: guaranteed.energyKcalKg,
    energyKcalKgAlt: extra.energyKcalKgAlt,
    energyQualityIssue: extra.energyKcalKgAlt != null ? 'conflicting_energy_values' : undefined,
    guaranteed,
    officialSourceUrl: extra.url,
    manufacturerIndications: extra.indications,
    extraNotes: extra.notes,
  }
}

function nameOnly({
  id,
  name,
  category,
  speciesScope,
  presentation,
  packageGrams,
  format,
  completenessClass,
  manufacturer,
  brand,
  line,
  officialSourceUrl,
  verificationStatus = 'official_page_verified',
  extraNotes = [],
}) {
  return {
    id,
    name,
    category,
    speciesScope,
    foodType: 'commercial',
    presentation,
    packageGrams,
    format,
    completenessClass,
    nutrientBasis: 'as_fed_guaranteed',
    manufacturer,
    brand,
    line,
    officialSourceUrl,
    verificationStatus,
    extraNotes: ['nutrient_levels=pending_label_review', ...extraNotes],
  }
}

export function getBrazilWetFoodProducts() {
  const products = []

  // ── 1. CRITICAL CARE / RECOVERY ──────────────────────────────────────────

  products.push({
    id: 'hills-prescription-ad-urgent-care-156g',
    replaceLegacyId: 'pate-a-d-hills',
    name: "Hill's Prescription Diet a/d Urgent Care",
    category: 'Patê',
    speciesScope: 'both',
    foodType: 'commercial',
    presentation: 'Lata 156 g',
    packageGrams: 156,
    format: 'pate',
    completenessClass: 'intermittent_or_supplemental',
    nutrientBasis: 'average_dry_matter',
    manufacturer: HILLS.manufacturer,
    brand: HILLS.brand,
    line: 'Prescription Diet',
    moisturePctEstimated: 78,
    dryMatterAverages: { protein: 44, fat: 33, carb: 13.1, fiber: 0.1, calcium: 1.26 },
    officialSourceUrl: 'https://www.hillspet.com.br/dog-food/prescription-diet-ad-urgent-care-canned',
    ingredientsRaw:
      'Água; fígado e coração de peru emulsificados; fígado suíno; carne mecanicamente separada de frango; farinha de milho; farinha de torresmo; óleo de peixe; carbonato de cálcio; hidrolisado de fígado de frango; ovo em pó; tripolifosfato de sódio; cloreto de potássio; fosfato bicálcico; goma guar; taurina; vitaminas; citrato de potássio; cloreto de colina; minerais; óxido de magnésio e betacaroteno.',
    manufacturerIndications: [
      'Recuperação de cirurgia, doença ou lesão',
      'Alimentação intermitente ou suplementar',
      'Não recomendado por mais de seis meses',
    ],
    extraNotes: [
      'value_kind=average_dry_matter_not_guaranteed',
      'sabor=Frango',
      'conversao=156g≈150mL',
    ],
  })

  products.push({
    ...rcVet(
      'royal-canin-vet-recovery-mousse-195g',
      'Recovery Mousse',
      'both',
      195,
      {
        moistureMax: 74.4,
        proteinMin: 10.7,
        fatMin: 4.4,
        fiberMax: 3.7,
        ashMax: 2.8,
        calciumMin: 0.31,
        calciumMax: 0.57,
        phosphorusMin: 0.22,
        sodiumMin: 0.13,
        chlorideMin: 0.14,
        potassiumMin: 0.14,
        magnesiumMin: 0.02,
        taurineMinMgKg: 1050,
        methionineMinMgKg: 1960,
        energyKcalKg: 1125,
      },
      {
        format: 'mousse',
        presentation: 'Lata 195 g',
        energyKcalKgAlt: 1266,
        url: 'https://www.royalcanin.com/br/dogs/products/vet-products/recovery-4055',
        indications: ['Recuperação nutricional', 'Convalescença', 'Lipidose hepática felina'],
        notes: ['textura=seringa_ou_sonda'],
      },
    ),
    replaceLegacyId: 'pate-royal-canin-recovery',
    name: 'Royal Canin Recovery Mousse',
  })

  products.push(
    premierNC(
      'caes-e-gatos-recuperacao',
      'Recuperação (cães e gatos)',
      'both',
      85,
      {
        moistureMax: 88,
        proteinMin: 11.0,
        fatMin: 9.0,
        ashMax: 3.0,
        fiberMax: 2.8,
        calciumMin: 0.33,
        calciumMax: 0.5,
        phosphorusMin: 0.25,
        potassiumMin: 0.4,
        magnesiumMax: 0.055,
        taurineMinMgKg: 950,
        energyKcalKg: 1300,
      },
      {
        url: 'https://premierpet.com.br/produto/premier-nutricao-clinica-umidos-caes-e-gatos-recuperacao/',
        ingredients:
          'Água, frango, carne mecanicamente separada de frango, fígado de frango, pele de aves, plasma suíno, gordura de aves, óleo de peixe, minerais, dextrose, fosfatidilcolina, prebióticos e taurina.',
        indications: ['Alta densidade energética e proteica', 'EPA+DHA', 'Baixa ingestão'],
        notes: ['epaDhaMinMgKg=2300', 'betaglucanasMgKg=450', 'fosMgKg=360', 'gosMgKg=216'],
      },
    ),
  )

  // ── 2. PREMIER NUTRIÇÃO CLÍNICA (5 produtos) ─────────────────────────────

  products.push(
    premierNC(
      'caes-diabetes',
      'Diabetes (cães)',
      'dog',
      85,
      {
        moistureMax: 88,
        proteinMin: 8.0,
        fatMin: 2.8,
        ashMax: 2.5,
        fiberMax: 2.6,
        calciumMin: 0.19,
        calciumMax: 0.35,
        phosphorusMin: 0.18,
        potassiumMin: 0.15,
        omega6MinPct: 0.48,
        taurineMinMgKg: 240,
        energyKcalKg: 780,
      },
      {
        url: 'https://premierpet.com.br/produto/premier-nutricao-clinica-umidos-caes-diabetes/',
        indications: ['Controle glicêmico', 'Modificação de carboidratos', 'Maior teor de fibras'],
        notes: ['lCarnitinaMinMgKg=160', 'epaDhaMinMgKg=700', 'fibraDieteticaTotalMaxPct=3.8'],
      },
    ),
    premierNC(
      'caes-obesidade',
      'Obesidade (cães)',
      'dog',
      85,
      {
        moistureMax: 88,
        proteinMin: 8.0,
        fatMin: 2.0,
        ashMax: 1.8,
        fiberMax: 3.5,
        calciumMin: 0.15,
        calciumMax: 0.25,
        phosphorusMin: 0.15,
        potassiumMin: 0.2,
        omega6MinPct: 0.6,
        taurineMinMgKg: 350,
        energyKcalKg: 700,
      },
      {
        url: 'https://premierpet.com.br/produto/premier-nutricao-clinica-umidos-caes-obesidade/',
        indications: ['Manejo de obesidade', 'Saciedade', 'L-carnitina'],
        notes: ['lCarnitinaMinMgKg=53', 'epaDhaMinMgKg=650', 'fibraDieteticaTotalMaxPct=4.5'],
      },
    ),
    premierNC(
      'gatos-urinario',
      'Urinário (gatos)',
      'cat',
      70,
      {
        moistureMax: 88,
        proteinMin: 7.2,
        fatMin: 4.0,
        ashMax: 1.8,
        fiberMax: 2.0,
        calciumMin: 0.2,
        calciumMax: 0.4,
        phosphorusMin: 0.18,
        potassiumMin: 0.18,
        magnesiumMax: 0.02,
        omega6MinPct: 0.8,
        taurineMinMgKg: 570,
        energyKcalKg: 850,
      },
      {
        url: 'https://premierpet.com.br/produto/premier-nutricao-clinica-umidos-gatos-urinario/',
        indications: ['Manejo de estruvita', 'pH urinário-alvo 6,2'],
        notes: [
          'dlMetioninaMinMgKg=1500',
          'glucosaminaMinMgKg=200',
          'epaDhaMinMgKg=700',
          'packageGrams_historical=85g',
        ],
      },
    ),
    premierNC(
      'gatos-obesidade',
      'Obesidade (gatos)',
      'cat',
      70,
      {
        moistureMax: 88,
        proteinMin: 8.5,
        fatMin: 2.5,
        ashMax: 2.5,
        fiberMax: 5.0,
        calciumMin: 0.15,
        calciumMax: 0.3,
        phosphorusMin: 0.15,
        potassiumMin: 0.21,
        omega6MinPct: 0.6,
        taurineMinMgKg: 600,
        energyKcalKg: 730,
      },
      {
        url: 'https://premierpet.com.br/produto/premier-nutricao-clinica-umidos-gatos-obesidade/',
        notes: ['lCarnitinaMinMgKg=100', 'epaDhaMinMgKg=1200', 'fibraDieteticaTotalMaxPct=7.0'],
      },
    ),
  )

  // ── 3. PREMIER FORMULA / NATTU / GOURMET / ORGÂNICO ──────────────────────

  for (const [id, name, species] of [
    ['caes-adultos-pequeno-carne', 'Adultos Porte Pequeno — Carne, Brócolis e Cenoura', 'dog'],
    ['caes-adultos-pequeno-frango', 'Adultos Porte Pequeno — Frango, Brócolis e Cenoura', 'dog'],
    ['gatos-castrados-frango', 'Adultos Castrados — Frango, Brócolis e Cenoura', 'cat'],
    ['gatos-castrados-atum', 'Adultos Castrados — Atum, Brócolis e Cenoura', 'cat'],
  ]) {
    products.push(
      nameOnly({
        id: `premier-formula-umido-${id}`,
        name: `PremieR Formula Úmido — ${name}`,
        category: 'Sachê',
        speciesScope: species,
        presentation: species === 'dog' ? 'Sachê 85 g' : 'Sachê 70 g',
        packageGrams: species === 'dog' ? 85 : 70,
        format: 'sachet',
        completenessClass: 'complete',
        ...PREMIER,
        line: 'Formula Úmidos',
        officialSourceUrl: 'https://premierpet.com.br/linha/premier-formula-umidos-caes/',
      }),
    )
  }

  for (const [id, name, species] of [
    ['caes-filhotes', 'Filhotes — Frango, Abóbora, Brócolis e Quinoa', 'dog'],
    ['caes-adultos-pequeno-quinoa', 'Adultos Porte Pequeno — Frango, Abóbora, Brócolis e Quinoa', 'dog'],
    ['caes-adultos-linhaca', 'Adultos Porte Pequeno — Frango, Batata-doce, Espinafre e Linhaça', 'dog'],
    ['gatos-filhotes', 'Filhotes — Frango, Abóbora, Brócolis e Quinoa', 'cat'],
    ['gatos-castrados-quinoa', 'Castrados — Frango, Abóbora, Brócolis e Quinoa', 'cat'],
    ['gatos-castrados-linhaca', 'Castrados — Frango, Batata-doce, Espinafre e Linhaça', 'cat'],
  ]) {
    const isLinhaca = id.includes('linhaca')
    products.push({
      id: `premier-nattu-umido-${id}`,
      name: `PremieR Nattu Úmido — ${name}`,
      category: 'Sachê',
      speciesScope: species,
      foodType: 'commercial',
      presentation: species === 'dog' ? 'Sachê 85 g' : 'Sachê 70 g',
      packageGrams: species === 'dog' ? 85 : 70,
      format: 'sachet',
      completenessClass: 'complementary',
      nutrientBasis: 'as_fed_guaranteed',
      manufacturer: PREMIER.manufacturer,
      brand: PREMIER.brand,
      line: 'Nattu Úmidos',
      officialSourceUrl: 'https://premierpet.com.br/produto/premier-nattu-umidos-caes-adultos-porte-pequeno-frango-batata-doce-espinafre-e-linhaca/',
      ...(isLinhaca && species === 'dog'
        ? {
            guaranteed: {
              moistureMax: 88,
              proteinMin: 7.0,
              fatMin: 1.5,
              fiberMax: 0.7,
              ashMax: 0.6,
              calciumMin: 0.01,
              calciumMax: 0.06,
              phosphorusMin: 0.03,
              energyKcalKg: 683,
            },
            verificationStatus: 'official_page_verified',
            extraNotes: ['energiaPorSacheKcal≈58'],
          }
        : {
            verificationStatus: 'official_page_verified',
            extraNotes: ['nutrient_levels=pending_label_review'],
          }),
    })
  }

  for (const [id, name, species] of [
    ['caes-filhotes-frango', 'Filhotes — Peito de frango, batata-doce e brócolis', 'dog'],
    ['caes-adultos-carne', 'Adultos Porte Pequeno — Carne, batata-doce e brócolis', 'dog'],
    ['caes-adultos-salmao', 'Adultos Porte Pequeno — Salmão e arroz integral', 'dog'],
    ['gatos-adultos-carne', 'Adultos — Carne, espinafre e arroz integral', 'cat'],
    ['gatos-castrados-atum', 'Castrados — Atum e arroz integral', 'cat'],
    ['gatos-castrados-frango', 'Castrados — Peito de frango e arroz integral', 'cat'],
  ]) {
    products.push(
      nameOnly({
        id: `premier-gourmet-umido-${id}`,
        name: `PremieR Gourmet — ${name}`,
        category: 'Sachê',
        speciesScope: species,
        presentation: species === 'dog' ? 'Sachê 85 g' : 'Sachê 70 g',
        packageGrams: species === 'dog' ? 85 : 70,
        format: 'sachet',
        completenessClass: 'complementary',
        ...PREMIER,
        line: 'Gourmet',
        officialSourceUrl: 'https://premierpet.com.br/produto/premier-gourmet-caes-filhotes-sabor-peito-de-frango-batata-doce-e-brocolis/',
      }),
    )
  }

  products.push({
    id: 'premier-organico-caes-frango-chia-quinoa-85g',
    name: 'PremieR Orgânico — Cão Adulto Pequeno Frango, Chia e Quinoa',
    category: 'Sachê',
    speciesScope: 'dog',
    foodType: 'commercial',
    presentation: 'Sachê 85 g',
    packageGrams: 85,
    format: 'sachet',
    completenessClass: 'complete',
    manufacturer: PREMIER.manufacturer,
    brand: PREMIER.brand,
    line: 'Orgânico',
    officialSourceUrl: 'https://premierpet.com.br/produto/premier-organico-gatos-adultos-frango-chia-e-quinoa/',
    extraNotes: ['nutrient_levels=pending_label_review'],
  })

  products.push({
    id: 'premier-organico-gatos-frango-chia-quinoa-70g',
    name: 'PremieR Orgânico — Gato Adulto Frango, Chia e Quinoa',
    category: 'Sachê',
    speciesScope: 'cat',
    foodType: 'commercial',
    presentation: 'Sachê 70 g',
    packageGrams: 70,
    format: 'sachet',
    completenessClass: 'complete',
    nutrientBasis: 'as_fed_guaranteed',
    manufacturer: PREMIER.manufacturer,
    brand: PREMIER.brand,
    line: 'Orgânico',
    guaranteed: {
      moistureMax: 88,
      proteinMin: 7.0,
      fatMin: 1.5,
      taurineMinMgKg: 150,
      energyKcalKg: 637,
    },
    officialSourceUrl: 'https://premierpet.com.br/produto/premier-organico-gatos-adultos-frango-chia-e-quinoa/',
    extraNotes: ['energiaPorSacheKcal≈44.6'],
  })

  // ── 4. ROYAL CANIN VETERINARY ÚMIDA ──────────────────────────────────────

  const rcVetTable = [
    ['hypoallergenic-canine-pate', 'Hypoallergenic Canine Pâté', 'dog', 400, { moistureMax: 77.3, proteinMin: 5.0, fatMin: 1.5, fiberMax: 3.7, ashMax: 2.6, calciumMin: 0.24, calciumMax: 0.44, phosphorusMin: 0.18, sodiumMin: 0.12, magnesiumMin: 0.01 }],
    ['renal-feline', 'Renal Feline', 'cat', 85, { moistureMax: 78.5, proteinMin: 5.8, fatMin: 6.0, fiberMax: 1.5, ashMax: 1.4, calciumMin: 0.075, calciumMax: 0.55, phosphorusMin: 0.045, sodiumMin: 0.055, magnesiumMin: 0.009, energyKcalKg: 1271, taurineMinMgKg: 1120, epaMinMgKg: 600, dhaMinMgKg: 300 }],
    ['urinary-so-feline-molho', 'Urinary S/O Feline Molho', 'cat', 85, { moistureMax: 82.5, proteinMin: 8.0, fatMin: 1.5, fiberMax: 2.8, ashMax: 2.31, calciumMin: 0.21, calciumMax: 0.39, phosphorusMin: 0.17, sodiumMin: 0.17, magnesiumMin: 0.01, energyKcalKg: 901, taurineMinMgKg: 700, methionineMinMgKg: 1400 }],
    ['gastrointestinal-canine', 'Gastrointestinal Canine', 'dog', 400, { moistureMax: 75.5, proteinMin: 6.9, fatMin: 3.9, fiberMax: 2.2, ashMax: 2.6, calciumMin: 0.175, calciumMax: 0.75, phosphorusMin: 0.15, sodiumMin: 0.135, magnesiumMin: 0.015, energyKcalKg: 1179 }],
    ['gastrointestinal-feline-so', 'Gastrointestinal Feline S/O', 'cat', 85, { moistureMax: 81.5, proteinMin: 6.0, fatMin: 3.6, fiberMax: 1.2, ashMax: 2.0, calciumMin: 0.15, calciumMax: 0.7, phosphorusMin: 0.12, sodiumMin: 0.06, magnesiumMin: 0.01, energyKcalKg: 1031 }],
    ['cardiac-canine-pate', 'Cardiac Canine Pâté', 'dog', 410, { moistureMax: 75.7, proteinMin: 6.1, fatMin: 5.1, fiberMax: 2.8, ashMax: 1.5, calciumMin: 0.18, calciumMax: 0.33, phosphorusMin: 0.13, sodiumMin: 0.04, sodiumMax: 0.08, magnesiumMin: 0.02, taurineMinMgKg: 1300, epaMinMgKg: 1200, dhaMinMgKg: 600 }],
    ['hepatic-canine', 'Hepatic Canine', 'dog', 420, { moistureMax: 66.0, proteinMin: 4.5, fatMin: 2.0, fiberMax: 2.0, ashMax: 1.9, calciumMin: 0.145, calciumMax: 0.69, phosphorusMin: 0.13, sodiumMin: 0.04, magnesiumMin: 0.016, energyKcalKg: 1466, taurineMinMgKg: 1190 }],
    ['renal-canine-pate', 'Renal Canine Pâté', 'dog', 410, { moistureMax: 68.2, proteinMin: 3.4, fatMin: 6.9, fiberMax: 3.0, ashMax: 1.9, calciumMin: 0.12, calciumMax: 0.22, phosphorusMin: 0.08, sodiumMin: 0.1, magnesiumMin: 0.02, energyKcalKg: 1546, taurineMinMgKg: 1200, methionineMinMgKg: 600 }],
    ['satiety-canine', 'Satiety Canine', 'dog', 410, { moistureMax: 84.5, proteinMin: 6.0, fatMin: 0.5, fiberMax: 3.0, ashMax: 1.1, calciumMin: 0.07, calciumMax: 0.54, phosphorusMin: 0.06, sodiumMin: 0.06, magnesiumMin: 0.01, energyKcalKg: 617, taurineMinMgKg: 500 }],
    ['gastrointestinal-low-fat-canine', 'Gastrointestinal Low Fat Canine', 'dog', 410, { moistureMax: 77.0, proteinMin: 6.0, fatMin: 0.5, fatMax: 3.7, fiberMax: 3.4, ashMax: 2.09, calciumMin: 0.12, calciumMax: 0.3, phosphorusMin: 0.1, sodiumMin: 0.096, magnesiumMin: 0.0186, taurineMinMgKg: 280, epaMinMgKg: 130, dhaMinMgKg: 70 }],
    ['diabetic-special-low-carb-canine', 'Diabetic Special Low Carb Canine', 'dog', 410, { moistureMax: 80.5, proteinMin: 7.0, fatMin: 2.0, fiberMax: 3.4, ashMax: 1.7, calciumMin: 0.14, calciumMax: 0.68, phosphorusMin: 0.11, sodiumMin: 0.05, magnesiumMin: 0.01, energyKcalKg: 817, taurineMinMgKg: 800 }],
    ['satiety-feline-molho', 'Satiety Feline Molho', 'cat', 85, { moistureMax: 86.0, proteinMin: 5.6, fatMin: 0.3, fiberMax: 3.1, ashMax: 1.87, calciumMin: 0.19, calciumMax: 0.29, phosphorusMin: 0.16, sodiumMin: 0.114, magnesiumMin: 0.006, energyKcalKg: 659, taurineMinMgKg: 560, methionineMinMgKg: 1050 }],
  ]

  for (const [slug, displayName, species, grams, g] of rcVetTable) {
    const extra = {}
    if (slug === 'renal-canine-pate') extra.energyKcalKgAlt = 1662
    products.push(
      rcVet(`royal-canin-vet-${slug}-${grams}g`, displayName, species, grams, g, {
        url: `${RC.officialBase}/dogs/products/vet-products/`,
        ...extra,
      }),
    )
  }

  // ── 5. ROYAL CANIN RETAIL ÚMIDA ──────────────────────────────────────────

  for (const [slug, name, format] of [
    ['sterilised-pate', 'Sterilised Pâté', 'pate'],
    ['sterilised-molho', 'Sterilised Molho', 'chunks_gravy'],
    ['ageing-12-molho', 'Ageing 12+ Molho', 'chunks_gravy'],
    ['instinctive-7-molho', 'Instinctive 7+ Molho', 'chunks_gravy'],
    ['light-weight-care-molho', 'Light Weight Care Molho', 'chunks_gravy'],
    ['digestive-care-pate', 'Digestive Care Pâté', 'pate'],
  ]) {
    products.push(
      nameOnly({
        id: `royal-canin-retail-gatos-${slug}-85g`,
        name: `Royal Canin ${name}`,
        category: 'Sachê',
        speciesScope: 'cat',
        presentation: 'Sachê 85 g',
        packageGrams: 85,
        format,
        completenessClass: 'complete',
        ...RC,
        line: 'Retail Feline',
        officialSourceUrl: 'https://www.royalcanin.com/br/cats/products/retail-products/sterilised-loaf-4147',
      }),
    )
  }

  for (const [slug, name, grams] of [
    ['medium-adult', 'Medium Adult', 140],
    ['light-weight-care', 'Light Weight Care', 85],
    ['mini-ageing', 'Mini Ageing', 85],
    ['digestive-care', 'Digestive Care', 85],
    ['mini-puppy', 'Mini Puppy', 85],
    ['yorkshire-terrier', 'Yorkshire Terrier', 85],
    ['maxi-puppy', 'Maxi Puppy', 140],
    ['medium-puppy', 'Medium Puppy', 140],
  ]) {
    const isMediumAdult = slug === 'medium-adult'
    products.push({
      id: `royal-canin-retail-caes-${slug}-${grams}g`,
      name: `Royal Canin ${name}`,
      category: 'Sachê',
      speciesScope: 'dog',
      foodType: 'commercial',
      presentation: `Sachê ${grams} g`,
      packageGrams: grams,
      format: 'sachet',
      completenessClass: 'complete',
      manufacturer: RC.manufacturer,
      brand: RC.brand,
      line: 'Retail Canine',
      officialSourceUrl: 'https://www.royalcanin.com/br/dogs/products/retail-products/medium-adult---pouch-1095',
      ...(isMediumAdult
        ? {
            guaranteed: {
              moistureMax: 83.2,
              proteinMin: 5.5,
              fatMin: 3.5,
              fiberMax: 2.9,
              ashMax: 1.98,
              calciumMin: 0.18,
              calciumMax: 0.34,
              phosphorusMin: 0.12,
              sodiumPct: 0.114,
              magnesiumPct: 0.013,
              taurineMinMgKg: 210,
              epaMinMgKg: 300,
              dhaMinMgKg: 150,
            },
            nutrientBasis: 'as_fed_guaranteed',
            extraNotes: ['omega3MinMgKg=400'],
          }
        : { extraNotes: ['nutrient_levels=pending_label_review'] }),
    })
  }

  // ── 6. HILL'S ÚMIDA ──────────────────────────────────────────────────────

  const hillsPD = [
    ['id-digestive-care-peru', 'i/d Digestive Care Peru', 'dog', 'Lata moída 370 g', 370, 1013],
    ['id-frango-vegetais-stew', 'i/d Frango e Vegetais Stew', 'dog', 'Ensopado 156 g', 156, 782],
    ['id-frango-vegetais-gatos', 'i/d Frango e Vegetais', 'cat', 'Ensopado', null, null],
    ['kd-kidney-care-frango', 'k/d Kidney Care Frango', 'dog', 'Lata 370 g', 370, null],
    ['kd-frango-vegetais-gatos', 'k/d Frango e Vegetais', 'cat', 'Ensopado', null, null],
    ['kd-atum-vegetais-gatos', 'k/d Atum e Vegetais', 'cat', 'Ensopado 82 g', 82, 955],
    ['zd-food-sensitivities-caes', 'z/d Food Sensitivities', 'dog', 'Lata 370 g', 370, 965],
    ['zd-food-sensitivities-gatos', 'z/d Food Sensitivities', 'cat', 'Lata 156 g', 156, 1109],
    ['wd-multi-benefit', 'w/d Multi-Benefit', 'dog', 'Lata 370 g', 370, null],
    ['ud-urinary-care', 'u/d Urinary Care', 'dog', 'Lata 370 g', 370, null],
    ['metabolic-weight-management', 'Metabolic Weight Management', 'dog', 'Lata 370 g', 370, 888],
    ['metabolic-mobility', 'Metabolic + Mobility', 'dog', 'Ensopado', null, null],
    ['cd-multicare-frango-vegetais', 'c/d Multicare Frango e Vegetais', 'dog', 'Ensopado', null, null],
    ['onc-care-frango-vegetais', 'ONC Care Frango e Vegetais', 'dog', 'Ensopado 82/354 g', 82, 909],
  ]

  for (const [slug, displayName, species, presentation, grams, energy] of hillsPD) {
    products.push({
      id: `hills-prescription-${slug}`,
      name: `Hill's Prescription Diet ${displayName}`,
      category: presentation.includes('Ensopado') ? 'Ensopado' : 'Lata',
      speciesScope: species,
      foodType: 'commercial',
      presentation,
      packageGrams: grams,
      format: presentation.includes('Ensopado') ? 'stew' : 'canned',
      completenessClass: 'coadjuvant_complete',
      manufacturer: HILLS.manufacturer,
      brand: HILLS.brand,
      line: 'Prescription Diet',
      energyKcalKg: energy,
      officialSourceUrl: 'https://www.hillspet.com.br/dog-food/prescription-diet-ad-urgent-care-canned',
      extraNotes: energy == null ? ['nutrient_levels=pending_label_review'] : [],
    })
  }

  const hillsSD = [
    ['perfect-digestion-frango-vegetais-arroz', 'Perfect Digestion — Frango, Vegetais e Arroz', 'dog', 'Ensopado 82/363 g'],
    ['perfect-weight-frango-vegetais-caes', 'Perfect Weight — Frango e Vegetais', 'dog', 'Ensopado'],
    ['perfect-weight-frango-vegetais-gatos', 'Perfect Weight — Frango e Vegetais', 'cat', 'Ensopado 82 g'],
    ['sensitive-stomach-peru-arroz', 'Sensitive Stomach & Skin — Peru e Arroz', 'dog', 'Ensopado 354 g'],
    ['sensitive-stomach-frango-vegetais-gatos', 'Sensitive Stomach & Skin — Frango e Vegetais', 'cat', 'Úmido 82 g'],
    ['urinary-hairball-control', 'Urinary & Hairball Control', 'cat', 'Úmido 82 g'],
    ['senior-vitality-7-frango-vegetais', 'Senior Vitality 7+ — Frango e Vegetais', 'dog', 'Ensopado 354 g'],
  ]

  for (const [slug, displayName, species, presentation] of hillsSD) {
    products.push(
      nameOnly({
        id: `hills-science-diet-${slug}`,
        name: `Hill's Science Diet ${displayName}`,
        category: 'Ensopado',
        speciesScope: species,
        presentation,
        packageGrams: presentation.match(/(\d+)\s*g/)?.[1] ? Number(presentation.match(/(\d+)\s*g/)[1]) : null,
        format: 'stew',
        completenessClass: 'complete',
        ...HILLS,
        line: 'Science Diet',
        officialSourceUrl: 'https://www.hillspet.com.br/dog-food/science-diet-adult-perfect-digestion-chicken-vegetable-rice-stew-canned',
      }),
    )
  }

  // ── 7. FARMINA N&D ÚMIDA ─────────────────────────────────────────────────

  for (const [line, slug, name] of [
    ['Prime', 'puppy-chicken-pomegranate', 'Puppy Chicken & Pomegranate'],
    ['Prime', 'adult-chicken-pomegranate', 'Adult Chicken & Pomegranate'],
    ['Prime', 'adult-boar-apple', 'Adult Boar & Apple'],
    ['Prime', 'adult-lamb-blueberry', 'Adult Lamb & Blueberry'],
    ['Pumpkin', 'adult-lamb-blueberry', 'Adult Lamb & Blueberry'],
    ['Quinoa', 'digestive-care', 'Digestive Care'],
    ['Quinoa', 'weight-management', 'Weight Management'],
    ['Quinoa', 'skin-coat-duck', 'Skin & Coat Duck'],
    ['Quinoa', 'skin-coat-fish', 'Skin & Coat Fish'],
  ]) {
    const isPrimeAdultChicken = slug === 'adult-chicken-pomegranate'
    products.push({
      id: `farmina-nd-${line.toLowerCase()}-caes-${slug}-140g`,
      name: `Farmina N&D ${line} — ${name}`,
      category: 'Lata',
      speciesScope: 'dog',
      foodType: 'commercial',
      presentation: 'Lata 140 g',
      packageGrams: 140,
      format: 'canned',
      completenessClass: 'complete',
      manufacturer: FARMINA.manufacturer,
      brand: FARMINA.brand,
      line: `N&D ${line}`,
      officialSourceUrl: 'https://www.farmina.com/br/eshop/alimentos-para-c%C3%A3es/n%26d-prime-canine/604-frango-%26-rom%C3%A3-adult-wet-food.html',
      ...(isPrimeAdultChicken
        ? {
            guaranteed: {
              moistureMax: 78,
              proteinMin: 11.5,
              fatMin: 5.5,
              fiberMax: 0.8,
              ashMax: 1.8,
              calciumMin: 0.13,
              calciumMax: 0.23,
              phosphorusMin: 0.11,
              energyKcalKg: 1116,
              taurineMinMgKg: 500,
              methionineMinMgKg: 1000,
            },
            ingredientsRaw: 'Frango mínimo de 40%, arenque, batata-doce, ovo, óleo de peixe, romã mínima de 2% e FOS.',
            extraNotes: ['fosMinMgKg=1800', 'lCarnitinaMinMgKg=50', 'energiaPorLataKcal≈156'],
          }
        : { extraNotes: ['nutrient_levels=pending_label_review'] }),
    })
  }

  for (const [line, slug, name, grams, completeness] of [
    ['Prime', 'adult-chicken-pomegranate', 'Adult Chicken & Pomegranate', 70, 'complete'],
    ['Prime', 'kitten-chicken-pomegranate', 'Kitten Chicken & Pomegranate', 70, 'complete'],
    ['Prime', 'lamb-blueberry', 'Lamb & Blueberry', 70, 'complete'],
    ['Ocean', 'tuna-salmon', 'Tuna & Salmon', 70, 'complete'],
    ['Ocean', 'tuna-sardine-shrimp', 'Tuna, Sardine & Shrimp', 70, 'complete'],
    ['Ocean', 'tuna-shrimp', 'Tuna & Shrimp', 70, 'complete'],
    ['Natural', 'tuna', 'Tuna', 70, 'complementary'],
    ['Natural', 'tuna-chicken', 'Tuna & Chicken', 70, 'complementary'],
    ['Quinoa', 'digestive-care', 'Digestive Care', 80, 'complete'],
    ['Quinoa', 'weight-management', 'Weight Management', 80, 'complete'],
    ['Quinoa', 'urinary', 'Urinary', 80, 'complete'],
  ]) {
    const isQuinoaDigestive = line === 'Quinoa' && slug === 'digestive-care'
    products.push({
      id: `farmina-nd-${line.toLowerCase()}-gatos-${slug}-${grams}g`,
      name: `Farmina N&D ${line} — ${name}`,
      category: 'Lata',
      speciesScope: 'cat',
      foodType: 'commercial',
      presentation: `Lata ${grams} g`,
      packageGrams: grams,
      format: 'canned',
      completenessClass: completeness,
      manufacturer: FARMINA.manufacturer,
      brand: FARMINA.brand,
      line: `N&D ${line}`,
      officialSourceUrl: 'https://www.farmina.com/br/eshop/alimentos-para-gatos/n%26d-quinoa-feline/620-cuidado-digestivo-wet-food.html',
      ...(isQuinoaDigestive
        ? {
            guaranteed: {
              moistureMax: 78,
              proteinMin: 12,
              fatMin: 3.8,
              fiberMax: 0.8,
              ashMax: 3.3,
              calciumMin: 0.17,
              calciumMax: 0.31,
              phosphorusMin: 0.14,
              energyKcalKg: 999,
              taurineMinMgKg: 800,
              methionineMinMgKg: 1500,
            },
            ingredientsRaw: 'Cordeiro mínimo de 45%, proteína de peixe hidrolisada, quinoa mínima de 5%, óleo de peixe, alcachofra, funcho e FOS.',
            extraNotes: ['fosMinMgKg=1800', 'omega6MinMgKg=7000', 'omega3MinMgKg=2500', 'energiaPorLataKcal≈80'],
          }
        : {
            extraNotes: completeness === 'complementary' ? ['verify_completeness_per_sku'] : ['nutrient_levels=pending_label_review'],
          }),
    })
  }

  // ── 8. FARMINA VET LIFE ÚMIDA ────────────────────────────────────────────

  for (const [slug, name] of [
    ['hepatic', 'Hepatic'],
    ['gastrointestinal', 'Gastrointestinal'],
    ['hypoallergenic-pork-potato', 'Hypoallergenic Pork & Potato'],
    ['obesity', 'Obesity'],
    ['convalescence', 'Convalescence'],
  ]) {
    const isHepatic = slug === 'hepatic'
    products.push({
      id: `farmina-vet-life-gatos-${slug}`,
      name: `Farmina Vet Life Feline — ${name}`,
      category: 'Lata',
      speciesScope: 'cat',
      foodType: 'commercial',
      presentation: 'Conforme SKU',
      format: 'canned',
      completenessClass: 'coadjuvant_complete',
      manufacturer: FARMINA.manufacturer,
      brand: FARMINA.brand,
      line: 'Vet Life',
      officialSourceUrl: 'https://www.farmina.com/br/eshop/alimentos-para-gatos/farmina-vet-life-feline/973-hepatic-wet-food-feline.html',
      ...(isHepatic
        ? {
            guaranteed: {
              moistureMax: 80,
              proteinMin: 6.0,
              fatMin: 3.8,
              fiberMax: 0.5,
              ashMax: 2.3,
              calciumMin: 0.1,
              calciumMax: 0.3,
              phosphorusMin: 0.1,
              sodiumMin: 0.1,
              potassiumMin: 0.2,
              methionineMinMgKg: 800,
              taurineMinMgKg: 1300,
              energyKcalKg: 979,
            },
            extraNotes: [
              'sodioMgKg=1000',
              'potassioMgKg=2000',
              'lCarnitinaMinMgKg=40',
              'mosMinMgKg=1000',
              'fosMinMgKg=1500',
              'omega6MinMgKg=8000',
              'omega3MinMgKg=3500',
              'epaMinMgKg=1000',
              'dhaMinMgKg=1000',
            ],
          }
        : { extraNotes: ['nutrient_levels=pending_label_review'] }),
    })
  }

  for (const [slug, name] of [
    ['ultrahypo', 'UltraHypo'],
    ['struvite', 'Struvite'],
    ['hypoallergenic-fish-potato', 'Hypoallergenic Fish & Potato'],
    ['gastrointestinal', 'Gastrointestinal'],
    ['convalescence', 'Convalescence'],
    ['diabetic', 'Diabetic'],
  ]) {
    products.push(
      nameOnly({
        id: `farmina-vet-life-caes-${slug}`,
        name: `Farmina Vet Life Canine — ${name}`,
        category: 'Lata',
        speciesScope: 'dog',
        presentation: 'Conforme SKU',
        format: 'canned',
        completenessClass: 'coadjuvant_complete',
        ...FARMINA,
        line: 'Vet Life',
        officialSourceUrl: 'https://www.farmina.com/br/eshop/alimentos-para-gatos/farmina-vet-life-feline/973-hepatic-wet-food-feline.html',
      }),
    )
  }

  // ── 9. GUABI NATURAL SACHÊS ───────────────────────────────────────────────

  const guabiCatSacheNutrition = {
    moistureMax: 94.5,
    proteinMin: 4.0,
    fatMin: 0.5,
    fiberMax: 0.35,
    ashMax: 0.5,
    calciumMin: 0.015,
    calciumMax: 0.045,
    phosphorusMin: 0.015,
    sodiumMin: 0.015,
    energyKcalKg: 212,
  }

  for (const [slug, name] of [
    ['frango-cereais-vegetais', 'Frango, cereais integrais e vegetais'],
    ['frango-salmao-cereais-vegetais', 'Frango, salmão, cereais integrais e vegetais'],
    ['frango-salmao-vegetais', 'Sabor frango, salmão e vegetais'],
  ]) {
    products.push({
      id: `guabi-natural-sache-gatos-${slug}-85g`,
      name: `Guabi Natural Sachê Gato — ${name}`,
      category: 'Sachê',
      speciesScope: 'cat',
      foodType: 'commercial',
      presentation: 'Sachê 85 g',
      packageGrams: 85,
      format: 'sachet',
      completenessClass: 'complementary',
      manufacturer: GUABI.manufacturer,
      brand: GUABI.brand,
      line: 'Sachês',
      guaranteed: guabiCatSacheNutrition,
      officialSourceUrl: 'https://www.guabinatural.com.br/pt/gatos/sache-gato-frango-cereais-integrais-e-vegetais',
      extraNotes: ['energiaPorSacheKcal≈18', 'nao_usar_como_dieta_completa'],
    })
  }

  for (const [slug, name] of [
    ['frango-cereais-vegetais', 'Frango, cereais integrais e vegetais'],
    ['frango-salmao-cereais-vegetais', 'Frango, salmão, cereais integrais e vegetais'],
    ['frango-salmao-vegetais', 'Frango, salmão e vegetais'],
  ]) {
    products.push(
      nameOnly({
        id: `guabi-natural-sache-caes-${slug}-100g`,
        name: `Guabi Natural Sachê Cão — ${name}`,
        category: 'Sachê',
        speciesScope: 'dog',
        presentation: 'Sachê 100 g',
        packageGrams: 100,
        format: 'sachet',
        completenessClass: 'complementary',
        ...GUABI,
        line: 'Sachês',
        officialSourceUrl: 'https://guabinatural.com.br/faq',
        extraNotes: ['nao_usar_como_dieta_completa'],
      }),
    )
  }

  // ── 10. GUABI NATURAL SECOS ───────────────────────────────────────────────

  const guabiDryDogs = [
    ['adulto-medio-cordeiro-aveia', 'Adulto Médio — Cordeiro e Aveia', { proteinMin: 28, fatMin: 17, fiberMax: 3, ashMax: null, calciumMin: 0.9, calciumMax: 1.4, phosphorusMin: 0.7, energyKcalKg: 4150 }],
    ['adulto-medio-frango-arroz', 'Adulto Médio — Frango e Arroz Integral', { proteinMin: 28, fatMin: 17, fiberMax: 3, calciumMin: 0.9, calciumMax: 1.4, phosphorusMin: 0.7, energyKcalKg: 4150 }],
    ['senior-medio-grande-frango-arroz', 'Sênior Médio/Grande — Frango e Arroz', { proteinMin: 26, fatMin: 13, fiberMax: 4.5, calciumMin: 0.7, calciumMax: 1.3, phosphorusMin: 0.5, energyKcalKg: 3850 }],
    ['adulto-grande-cordeiro-aveia', 'Adulto Grande/Gigante — Cordeiro e Aveia', { proteinMin: 28, fatMin: 16, fiberMax: 3.5, calciumMin: 0.9, calciumMax: 1.4, phosphorusMin: 0.7, energyKcalKg: 4050 }],
    ['adulto-medio-grain-free-frango-lentilha', 'Adulto Médio Grain Free — Frango e Lentilha', { proteinMin: 29, fatMin: 17, fiberMax: 3, calciumMin: 0.9, calciumMax: 1.5, phosphorusMin: 0.7, energyKcalKg: 4400 }],
    ['adulto-mini-grain-free-frango-lentilha', 'Adulto Mini/Pequeno Grain Free — Frango e Lentilha', { proteinMin: 31, fatMin: 18, fiberMax: 3, calciumMin: 0.9, calciumMax: 1.5, phosphorusMin: 0.7, energyKcalKg: null }],
  ]

  for (const [slug, name, g] of guabiDryDogs) {
    products.push({
      id: `guabi-natural-racao-caes-${slug}`,
      name: `Guabi Natural ${name}`,
      category: 'Ração',
      categoryNormalized: 'Ração',
      speciesScope: 'dog',
      foodType: 'commercial',
      presentation: 'Ração seca',
      format: 'dry',
      completenessClass: 'complete',
      nutrientBasis: 'as_fed_guaranteed',
      manufacturer: GUABI.manufacturer,
      brand: GUABI.brand,
      line: 'Ração seca',
      moisturePct: 9,
      guaranteed: { ...g, moistureMax: 9 },
      energyKcalKg: g.energyKcalKg,
      officialSourceUrl: 'https://guabinatural.com.br/pt/caes/cao-adulto-medio-cordeiro-e-aveia',
      extraNotes: g.energyKcalKg == null ? ['energy_not_confirmed'] : [],
    })
  }

  const guabiDryCats = [
    ['filhotes-frango-arroz', 'Filhotes — Frango e Arroz Integral', { proteinMin: 38, fatMin: 18, fiberMax: 2.5, calciumMin: 0.95, calciumMax: 1.5, phosphorusMin: 0.95, energyKcalKg: 4300 }],
    ['senior-castrado-frango-arroz', 'Sênior Castrado — Frango e Arroz Integral', { proteinMin: 38, fatMin: 15, fiberMax: 4, calciumMin: 0.7, calciumMax: 1.4, phosphorusMin: 0.65, energyKcalKg: 4100 }],
    ['adulto-castrado-frango-arroz', 'Adulto Castrado — Frango e Arroz Integral', { proteinMin: 36, fatMin: 12, fiberMax: 5, calciumMin: 0.8, calciumMax: 1.6, phosphorusMin: 0.8, energyKcalKg: null }],
    ['adulto-castrado-salmao-cevada', 'Adulto Castrado — Salmão e Cevada', { proteinMin: 36, fatMin: 12, fiberMax: 5, calciumMin: 0.8, calciumMax: 1.6, phosphorusMin: 0.8, energyKcalKg: null }],
    ['adulto-castrado-cordeiro-aveia', 'Adulto Castrado — Cordeiro e Aveia', { proteinMin: 36, fatMin: 12, fiberMax: 5, calciumMin: 0.8, calciumMax: 1.6, phosphorusMin: 0.8, energyKcalKg: null }],
    ['adulto-castrado-grain-free-salmao-lentilha', 'Adulto Castrado Grain Free — Salmão e Lentilha', { proteinMin: 37, fatMin: 12, fiberMax: 5, calciumMin: 0.8, calciumMax: 1.7, phosphorusMin: 0.8, energyKcalKg: null }],
  ]

  for (const [slug, name, g] of guabiDryCats) {
    products.push({
      id: `guabi-natural-racao-gatos-${slug}`,
      name: `Guabi Natural ${name}`,
      category: 'Ração',
      categoryNormalized: 'Ração',
      speciesScope: 'cat',
      foodType: 'commercial',
      presentation: 'Ração seca',
      format: 'dry',
      completenessClass: 'complete',
      nutrientBasis: 'as_fed_guaranteed',
      manufacturer: GUABI.manufacturer,
      brand: GUABI.brand,
      line: 'Ração seca',
      moisturePct: 9,
      guaranteed: { ...g, moistureMax: 9 },
      energyKcalKg: g.energyKcalKg,
      officialSourceUrl: 'https://guabinatural.com.br/pt/gatos/gato-filhote-frango-e-arroz-integral',
      extraNotes: g.energyKcalKg == null ? ['energy_not_confirmed'] : [],
    })
  }

  return products
}
