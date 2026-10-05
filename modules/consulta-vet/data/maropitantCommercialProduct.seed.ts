import type { CommercialMedicationProduct } from '../types/commercialMedication';

const MAROPITANT_PRICE_SOURCE_DATE = '2026-10-04';

const MAROPITANT_PLUMBS_CONTEXT =
  'Plumb’s Veterinary Drug Handbook 10ª ed., monografia “Maropitant Citrate” (pp. 799–802 / PDF pp. 826–829): antagonista altamente seletivo dos receptores de neurocinina-1 (NK₁) que suprime a substância P no centro do vômito e no núcleo do trato solitário. Bloqueia tanto estímulos eméticos eméticos periféricos (vagal/GI) quanto de ação central (apomorfina, opioides, quimioterapia, cinetose). O BSAVA Small Animal Formulary 10ª ed. (pp. 244–245) e o Consenso iCatCare 2026 ratificam seu uso em cães e gatos para vômitos agudos e prevenção de náusea/êmese em afecções como pancreatite, quimioterapia e doença renal crônica felina (Quimby et al. 2015). Estudos de 2026 (Shin & Ambros) alertam que maropitant bloqueia de forma robusta o reflexo mecânico do vômito, mas náusea residual ainda pode persistir.';

const MAROPITANT_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E ADMINISTRAÇÃO: 1) DOR À APLICAÇÃO SUBCUTÂNEA (SC): a dissociação do maropitant do carreador sulfobutiléter-beta-ciclodextrina (SBECD) causa ardência. MANTENHA O FRASCO SOB REFRIGERAÇÃO (2°C a 8°C) E INJETE GELADO sem aquecimento manual para diminuir acentuadamente a dor. 2) VIA INTRAVENOSA (IV) ESTREITA: NUNCA administrar em bolus rápido devido ao risco de hipotensão arterial aguda transitória; administrar em infusão lenta de 1 a 2 minutos ininterruptos. 3) NÃO É ESTIMULANTE DE APETITE: maropitant reduz episódios de vômito, mas NÃO aumenta o apetite ou peso corporal (não é orexígeno; se necessário estímulo alimentar, associar mirtazapina). 4) SEPARAÇÃO DE DOSES PARA CINETOSE (8 mg/kg VO) VS VÔMITO AGUDO (2 mg/kg VO): a dose de cinetose é 4 vezes maior devido à farmacocinética não linear e deve ser administrada 2 horas antes da viagem (máximo 2 dias consecutivos). 5) INCOMPATIBILIDADE FÍSICA: precipitação imediata com pantoprazol sódico IV em mesma via ou equipo Y. 6) INSUFICIÊNCIA HEPÁTICA SEVERA: reduzir dose em 25% a 50% por extenso metabolismo microssomal (CYP2D15/CYP3A12). Não requer ajuste na Doença Renal Crônica (<1% renal).';

export const maropitantCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'cerenia-zoetis-inj-20ml',
    slug: 'cerenia-injetavel',
    name: 'Cerenia® 10 mg/mL Solução Injetável Frasco 20 mL (Zoetis)',
    manufacturer: 'Zoetis Saúde Animal Brasil',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic'],
    productPageUrl: 'https://www.zoetis.com.br/cerenia-solucao-injetavel.aspx',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/maropitant/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Cerenia® 10 mg/mL solução injetável estéril — frasco-ampola de vidro âmbar contendo 20 mL',
    ],
    activeComponents: [
      'citrato de maropitant monoidratado 10 mg/mL (equivalente a 1% m/v)',
      'sulfobutiléter-beta-ciclodextrina (SBECD) 63 mg/mL',
      'metacresol 3,3 mg/mL (conservante)',
    ],
    searchAliases: [
      'cerenia',
      'cerenia injetavel',
      'maropitant',
      'maropitante',
      'marovet',
      'antiemetico zoetis',
      'nk1',
      'substancia p',
      'antiemetico felino',
      'antiemetico cao',
    ],
    labelCompositionSummary:
      'Cada 1 mL da solução injetável contém 10 mg de citrato de maropitant, 63 mg de sulfobutiléter-beta-ciclodextrina, 3,3 mg de metacresol e água para injetáveis q.s.p. 1 mL. Frasco multidose com 20 mL de solução transparente incolor a ligeiramente amarelada.',
    labelDirections:
      'Bula oficial Zoetis Brasil / MAPA nº 9.544/2009: Administrar 1 mg/kg de peso corporal (equivalente a 0,1 mL/kg da solução 10 mg/mL) por via subcutânea (SC) ou intravenosa lenta (IV ao longo de 1 a 2 minutos), uma vez ao dia (a cada 24 horas), por até 5 dias consecutivos em cães e gatos. Para aplicação subcutânea indolor, manter o frasco refrigerado e injetar a solução gelada.',
    dosageGuidance: {
      labelDose:
        'Cães e gatos: 1 mg/kg SC ou IV lenta a cada 24 horas por até 5 dias consecutivos (0,1 mL/kg q24h).',
      plumbs: {
        dog: [
          {
            title: 'Tratamento e Prevenção de Vômitos Agudos em Cães (Plumb’s 10ª ed. / Bula Zoetis)',
            dose: '1 mg/kg SC ou IV lenta a cada 24 horas por até 5 dias consecutivos (0,1 mL/kg q24h)',
            note: 'Administrar SC refrigerado para reduzir a dor. Se IV, infundir em 1 a 2 minutos.',
          },
          {
            title: 'Prevenção de Êmese por Quimioterapia Emetogênica (Cisplatina / Doxorrubicina)',
            dose: '1 mg/kg SC ou IV lenta dose única administrada 45 a 60 minutos antes da quimioterapia',
            note: 'Vail et al. (2007) demonstraram 94,9% de bloqueio total de êmese frente à cisplatina.',
          },
        ],
        cat: [
          {
            title: 'Tratamento e Prevenção de Vômitos em Gatos (BSAVA 10ª ed. / iCatCare 2026)',
            dose: '1 mg/kg SC ou IV lenta a cada 24 horas por até 5 dias consecutivos (0,1 mL/kg q24h)',
            note: 'Eficácia validada em meta-análise felina de 2026 (Ersöz & Özkalipci: RR = 0,20; redução de 80% do vômito). Injetar gelado.',
          },
        ],
      },
      notes: [
        'Cálculo direto: 0,1 mL para cada 1 kg de peso corporal.',
        'Refrigeração mandatória: manter entre 2°C e 8°C para eliminar dor à punção SC.',
        'Não administrar em bolus rápido IV.',
        'Incompatível com pantoprazol sódico IV no mesmo equipo.',
      ],
    },
    plumbsContext: MAROPITANT_PLUMBS_CONTEXT,
    clinicalUse:
      'Antiemético de escolha para prevenção e controle de vômito agudo de qualquer etiologia em cães e gatos (gastroenterites, parvovirose, pancreatite, indiscreção alimentar, insuficiência renal e hepática, pré-anestesia com opioides e quimioterapia oncológica). Promove também antinocicepção visceral e redução de CAM de anestésicos.',
    reassessment:
      'Avaliar resolução do vômito e da hidratação nas primeiras 12 a 24 horas. Se persistir náusea (ptialismo, lambedura labial), considerar terapia combinada com antagonista 5-HT3 (ondansetrona).',
    prescriptionExample:
      'Cerenia (maropitant 10 mg/mL) solução injetável — Frasco com 20 mL. Administrar 1,0 mL (dose de 1 mg/kg para cão de 10 kg) por via subcutânea (gelado) ou intravenosa lenta, a cada 24 horas, durante 3 a 5 dias.',
    safetyAlert: MAROPITANT_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 335,00',
      rangeLabel: 'Frasco 20 mL: R$ 290,00 a R$ 380,00',
      sourceDate: MAROPITANT_PRICE_SOURCE_DATE,
      notes: 'Produto veterinário com registro MAPA nº 9.544/2009. Prescrição veterinária simples.',
    },
    evidenceLevel:
      'Nível 1a — Meta-análise sistemática Ersöz & Özkalipci (2026); Múltiplos ensaios clínicos randomizados duplo-cegos (Shin & Ambros 2026, Quimby 2015, Vail 2007); Diretriz de Consenso iCatCare (2026); Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:maropitant',
  },
  {
    id: 'cerenia-zoetis-comp',
    slug: 'cerenia-comprimidos',
    name: 'Cerenia® Comprimidos Ranhurados para Cães (Zoetis)',
    manufacturer: 'Zoetis Saúde Animal Brasil',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic'],
    productPageUrl: 'https://www.zoetis.com.br/cerenia-comprimidos.aspx',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/maropitant/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Cerenia® 16 mg — caixa com 4 comprimidos ranhurados',
      'Cerenia® 24 mg — caixa com 4 comprimidos ranhurados',
      'Cerenia® 60 mg — caixa com 4 comprimidos ranhurados',
      'Cerenia® 160 mg — caixa com 4 comprimidos ranhurados',
    ],
    activeComponents: [
      'citrato de maropitant monoidratado 16 mg, 24 mg, 60 mg ou 160 mg por comprimido',
    ],
    searchAliases: [
      'cerenia comprimido',
      'cerenia 16',
      'cerenia 24',
      'cerenia 60',
      'cerenia 160',
      'maropitant oral',
      'remedio cinetose cao',
      'enjoo de viagem cachorro',
    ],
    labelCompositionSummary:
      'Comprimidos orais ranhurados contendo 16 mg, 24 mg, 60 mg ou 160 mg de citrato de maropitant base em blisters aluminizados com 4 comprimidos. Fórmula ranhurada que facilita fracionamento em metades precisas.',
    labelDirections:
      'Bula oficial Zoetis Brasil: Para tratamento e prevenção de vômitos agudos em cães: administrar 2 mg/kg de peso corporal por via oral, uma vez ao dia (a cada 24 horas), por até 5 dias consecutivos. Para prevenção de vômitos induzidos por cinetose (enjoo de movimento/viagem) em cães: administrar 8 mg/kg de peso corporal por via oral, uma vez ao dia, exatamente 2 horas antes da viagem, acompanhado de pequeno agrado alimentar (recomenda-se jejum prévio de 1 hora de ração completa), por no máximo 2 dias consecutivos.',
    dosageGuidance: {
      labelDose:
        'Cães: vômito agudo 2 mg/kg VO q24h até 5 dias; cinetose 8 mg/kg VO q24h 2h antes da viagem (máx. 2 dias). Gatos (extra-bula/iCatCare 2026): 1 mg/kg VO q24h.',
      plumbs: {
        dog: [
          {
            title: 'Tratamento e Prevenção de Vômitos Agudos em Cães (Plumb’s 10ª ed. / Bula)',
            dose: '2 mg/kg VO a cada 24 horas por até 5 dias consecutivos',
            note: 'Biodisponibilidade oral em cães é de ~24% na dose de 2 mg/kg. Pode ser oferecido com pequeno pedaço de carne ou petisco.',
          },
          {
            title: 'Prevenção de Cinetose / Enjoo de Viagem em Cães (Plumb’s 10ª ed. / Bula)',
            dose: '8 mg/kg VO a cada 24 horas administrado 2 horas antes da viagem por até 2 dias consecutivos',
            note: 'Dose quadruplicada devido ao metabolismo não linear de saturação hepática (CYP2D15), garantindo alta saturação de receptores centrais. Jejum prévio de ração de 1 hora.',
          },
        ],
        cat: [
          {
            title: 'Vômitos e Náusea em Felinos / DRC (Consenso iCatCare 2026 / Quimby et al. 2015)',
            dose: '1 mg/kg VO a cada 24 horas (ou 4 mg fixo por gato q24h na DRC estágios 2 a 4)',
            note: 'Maior absorção oral felina (~50%) e menor clearance (~276 mL/kg/h) justificam dose de 1 mg/kg em gatos (metade da dose canina oral).',
          },
        ],
      },
      notes: [
        'Atenção estrita: nunca confundir a dose de cinetose (8 mg/kg) com a dose de vômito agudo (2 mg/kg).',
        'Comprimidos ranhurados para partição precisa.',
        'Oferecer com pequena quantidade de comida para evitar regurgitação imediata.',
      ],
    },
    plumbsContext: MAROPITANT_PLUMBS_CONTEXT,
    clinicalUse:
      'Controle e prevenção de vômitos agudos gastrointestinais em cães e gatos, e prevenção altamente eficaz de cinetose canina (enjoo de carro, barco e avião). Adjuvante no controle de vômitos urêmicos na DRC felina.',
    reassessment:
      'Em vômitos agudos, reavaliar em 24 a 48 horas se não houver melhora, investigando corpo estranho obstrutivo ou pancreatite aguda necrosante. Em cinetose, avaliar eficácia do transporte.',
    prescriptionExample:
      'Cerenia 24 mg — Caixa com 4 comprimidos ranhurados. Para cão de 12 kg com gastrite aguda: Administrar 1 comprimido (24 mg = 2 mg/kg) por via oral, a cada 24 horas, durante 3 a 5 dias.',
    safetyAlert: MAROPITANT_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 141,00',
      rangeLabel:
        '16 mg: R$ 115,00 a R$ 135,00 | 24 mg: R$ 130,00 a R$ 155,00 | 60 mg: R$ 165,00 a R$ 195,00 | 160 mg: R$ 250,00 a R$ 295,00',
      sourceDate: MAROPITANT_PRICE_SOURCE_DATE,
      notes: 'Caixas com 4 comprimidos ranhurados. Prescrição veterinária simples.',
    },
    evidenceLevel:
      'Nível 1b — Ensaios clínicos randomizados duplo-cegos multicêntricos (Sedlacek et al. 2008, Quimby et al. 2015); Bula Zoetis; Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:maropitant',
  },
  {
    id: 'marovet-botupharma-inj-20ml',
    slug: 'marovet-injetavel',
    name: 'Marovet® 10 mg/mL Solução Injetável Frasco 20 mL (Botupharma)',
    manufacturer: 'Botupharma PET Brasil',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic'],
    productPageUrl: 'https://botupharma.com.br/produtos/marovet',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/maropitant/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Marovet® 10 mg/mL solução injetável frasco-ampola com 20 mL',
    ],
    activeComponents: [
      'citrato de maropitant 10 mg/mL',
    ],
    searchAliases: [
      'marovet',
      'marovet botupharma',
      'maropitant botupharma',
      'maropitant generico',
      'antiemetico marovet',
    ],
    labelCompositionSummary:
      'Cada 1 mL da solução injetável contém 10 mg de citrato de maropitant em veículo injetável estéril q.s.p. 1 mL. Frasco-ampola contendo 20 mL.',
    labelDirections:
      'Bula oficial Botupharma / MAPA: Administrar 1 mg/kg de peso corporal (0,1 mL/kg da solução 10 mg/mL) por via subcutânea (SC) ou intravenosa lenta (IV), a cada 24 horas, durante até 5 dias consecutivos.',
    dosageGuidance: {
      labelDose:
        'Cães e gatos: 1 mg/kg SC ou IV lenta a cada 24 horas por até 5 dias consecutivos (0,1 mL/kg q24h).',
      plumbs: {
        dog: [
          {
            title: 'Tratamento de Vômito Agudo em Cães (Posologia Padrão)',
            dose: '1 mg/kg SC ou IV lenta a cada 24 horas por até 5 dias consecutivos (0,1 mL/kg q24h)',
            note: 'Conservar sob refrigeração para reduzir o ardor da injeção subcutânea.',
          },
        ],
        cat: [
          {
            title: 'Tratamento de Vômito em Felinos (Consenso iCatCare 2026)',
            dose: '1 mg/kg SC ou IV lenta a cada 24 horas por até 5 dias consecutivos (0,1 mL/kg q24h)',
            note: 'Administrar gelado por via SC. Infusão IV lenta em 1 a 2 minutos.',
          },
        ],
      },
      notes: [
        'Dose de 0,1 mL por kg de peso corporal.',
        'Armazenar frasco entre 2°C e 8°C para aplicação indolor.',
      ],
    },
    plumbsContext: MAROPITANT_PLUMBS_CONTEXT,
    clinicalUse:
      'Antiemético de amplo espectro para prevenção e tratamento de episódios eméticos agudos em cães e gatos.',
    reassessment:
      'Monitorar hidratação, cessação do vômito e investigar etiologia primária em 24 a 48 horas.',
    prescriptionExample:
      'Marovet (maropitant 10 mg/mL) injetável — 1 frasco de 20 mL. Administrar 0,5 mL (dose de 1 mg/kg para cão de 5 kg) por via subcutânea (gelado), a cada 24 horas, por 3 dias.',
    safetyAlert: MAROPITANT_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 275,00',
      rangeLabel: 'Frasco 20 mL: R$ 240,00 a R$ 310,00',
      sourceDate: MAROPITANT_PRICE_SOURCE_DATE,
      notes: 'Produto veterinário registrado no MAPA. Prescrição veterinária simples.',
    },
    evidenceLevel:
      'Nível 1a — Consensos internacionais, Plumb’s 10ª ed., BSAVA 10ª ed. e ensaios clínicos controlados.',
    isControlled: false,
    catalogMedicationId: 'editorial:maropitant',
  },
];
