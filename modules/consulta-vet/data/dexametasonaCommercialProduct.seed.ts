import type { CommercialMedicationProduct } from '../types/commercialMedication';

const DEXAMETASONA_PRICE_SOURCE_DATE = '2026-10-05';

const DEXAMETASONA_PLUMBS_CONTEXT =
  'Plumb’s Veterinary Drug Handbook 10ª ed., monografia “Dexamethasone” (pp. 361–366 / PDF pp. 388–393): glicocorticoide sintético fluorado de longa duração (~30 vezes mais potente que hidrocortisona, sem retenção mineralocorticoide). Meia-vida plasmática curta (2–5 h em cães), mas reprogramação celular e duração biológica estendida (24 a 48+ h). BSAVA Small Animal Formulary 10ª ed. (pp. 114–115), Nelson & Couto 6ª ed., Diretrizes ACVIM (IMHA 2019 e IVDE 2022) e Diretrizes RECOVER (Ressuscitação 2024 e Choque Anafilático 2026) fornecem a base terapêutica para controle inflamatório agudo, imunossupressão parenteral inicial, testes endócrinos de supressão (LDDST e HDDST) e choque com edema cerebral peritumoral.';

const DEXAMETASONA_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E ADMINISTRAÇÃO: 1) CONTRAINDICAÇÃO ABSOLUTA COM AINEs: NUNCA associar dexametasona com anti-inflamatórios não esteroidais (meloxicam, carprofeno, firocoxib, etc.). Risco gravíssimo de úlcera péptica, enterite hemorrágica e perfuração gastrointestinal fatal. Respeitar período de washout mínimo de 3 a 7 dias na troca de classes. 2) CONTRAINDICADO EM TCE E TRAUMA MEDULAR AGUDO (IVDD): contraindicado no traumatismo cranioencefálico (TCE) e herniação de disco aguda (ACVIM 2022); não confere neuroproteção e aumenta morbimortalidade e hiperglicemia. O uso em edema vasogênico peritumoral cerebral, todavia, permanece com evidência consolidada (Poirier et al. 2025). 3) ANAFILAXIA AGUDA (RECOVER 2026): corticoides NÃO salvam vidas de forma imediata no colapso anafilático agudo hospitalar; a intervenção prioritária e salvadora é EPINEFRINA (Adrenalina) IM/IV. Corticoides atuam via transcrição genômica (latência de horas) e podem ser adjuvantes tardios contra reações bifásicas. 4) CRISE ADDISONIANA (AAHA 2023): fármaco de escolha pré-teste de estimulação por ACTH porque o fosfato de dexametasona NÃO interfere no imunoensaio de cortisol sérico (diferente da hidrocortisona e prednisolona). 5) EXCLUSIVIDADE PARENTERAL: administrar exclusivamente FOSFATO DISSÓDICO por via intravenosa; NUNCA administrar ésteres de acetato ou formulações insolúveis por via IV. 6) GATOS: espécie vulnerável a indução de diabetes mellitus secundário e suscetível a edema pulmonar por retenção de volume caso haja cardiopatia oculta.';

export const dexametasonaCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'azium-msd-solucao-inj-2mg',
    slug: 'azium-solucao-injetavel-2mg-10ml',
    name: 'Azium® Solução Injetável 2 mg/mL Frasco 10 mL (MSD Saúde Animal)',
    manufacturer: 'MSD Saúde Animal (Merck Animal Health)',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'ortho_antiinflammatory',
    commercialSubclasses: ['ortho_antiinflammatory', 'endocrine_adrenal', 'endocrine_diagnostic'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produtos/azium-solucao/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dexamethasone/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Azium® Solução Injetável 2 mg/mL frasco-ampola com 10 mL (dexametasona base como fosfato dissódico)',
    ],
    activeComponents: [
      'dexametasona base 2,0 mg/mL (sob forma de fosfato dissódico de dexametasona)',
    ],
    searchAliases: [
      'azium injetavel',
      'azium 2mg',
      'dexametasona injetavel',
      'dexamethasone inj',
      'azium msd',
      'corticoide injetavel',
    ],
    labelCompositionSummary:
      'Cada 1 mL contém 2,0 mg de dexametasona base (como fosfato dissódico de dexametasona), veículo aquoso estéril q.s.p. 1 mL. Frasco-ampola de vidro âmbar contendo 10 mL.',
    labelDirections:
      'Administrar por via intravenosa (IV lenta), intramuscular (IM) ou subcutânea (SC) conforme prescrição e indicação clínica veterinária. Doses variam conforme o objetivo: anti-inflamatório (0,07 a 0,14 mg/kg), imunossupressor (0,2 a 0,4 mg/kg IV lenta q24h) ou teste diagnóstico endócrino.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,07 a 0,14 mg/kg IV/IM q24h (0,035 a 0,07 mL/kg). Gatos: 0,14 a 0,28 mg/kg IV/IM q24h (0,07 a 0,14 mL/kg). Imunossupressão inicial: 0,2 a 0,4 mg/kg IV lenta q24h.',
      plumbs: {
        dog: [
          {
            title: 'Anti-inflamatório Sistêmico de Curta Duração (Plumb’s 10ª ed. / BSAVA 10ª ed.)',
            dose: '0,07 a 0,14 mg/kg IV, IM ou SC a cada 24 a 48 horas (0,035 a 0,07 mL/kg da solução 2 mg/mL)',
            note: 'Duração biológica de 24 a 48h. Transicionar precocemente para prednisolona oral se terapia prolongada.',
          },
          {
            title: 'Crise Hemolítica Imunomediada (IMHA) — ACVIM 2019 Consensus',
            dose: '0,2 a 0,4 mg/kg IV lenta a cada 24 horas (0,1 a 0,2 mL/kg da solução 2 mg/mL)',
            note: 'Indicado em cães hospitalizados com intolerância oral aguda, transicionando para prednisolona 2 mg/kg VO q24h assim que estabilizados.',
          },
          {
            title: 'Emergência da Crise Addisoniana Pré-Teste de ACTH (AAHA 2023 / Nelson & Couto)',
            dose: '0,1 a 0,2 mg/kg IV lenta em dose única (0,05 a 0,1 mL/kg da solução 2 mg/mL)',
            note: 'Fármaco de escolha porque NÃO interfere na dosagem de cortisol sérico no teste de estimulação por ACTH.',
          },
          {
            title: 'Edema Vasogênico Peritumoral Cerebral (Poirier et al. 2025 / Plumb’s 10ª ed.)',
            dose: '0,1 a 0,3 mg/kg IV lenta ou SC a cada 12 a 24 horas',
            note: 'Comprovada redução volumétrica de edema intracraniano neoplásico de 0,83 para 0,40 cm³. NÃO usar em TCE.',
          },
          {
            title: 'Teste de Supressão por Dexametasona em Baixa Dose — LDDST (Greco et al. 1993 / Feldman)',
            dose: '0,01 a 0,015 mg/kg IV lenta em bolus (requer diluição para precisão volumétrica)',
            note: 'Coletar cortisol sérico basal T0, T4h e T8h pós-administração para diagnóstico de hiperadrenocorticismo.',
          },
          {
            title: 'Teste de Supressão por Dexametasona em Alta Dose — HDDST Diferencial (AAHA 2023)',
            dose: '0,1 mg/kg IV lenta em bolus (0,05 mL/kg da solução 2 mg/mL)',
            note: 'Diferenciação entre HAC hipófise-dependente e tumor adrenal.',
          },
        ],
        cat: [
          {
            title: 'Anti-inflamatório Agudo Felino (BSAVA 10ª ed. / Plumb’s 10ª ed.)',
            dose: '0,14 a 0,28 mg/kg IV, IM ou SC a cada 24 a 48 horas (0,07 a 0,14 mL/kg da solução 2 mg/mL)',
            note: 'Gatos requerem doses anti-inflamatórias discretamente maiores devido a menor densidade de receptores hepáticos.',
          },
          {
            title: 'Crise Addisoniana Aguda Felina Pré-ACTH (AAHA 2023 / Plumb’s 10ª ed.)',
            dose: '0,1 a 0,2 mg/kg IV lenta ou IM dose única (0,05 a 0,1 mL/kg)',
            note: 'Estabilização de emergência concomitante à expansão fluídica agressiva com NaCl 0,9%.',
          },
          {
            title: 'Teste de Supressão por Baixa Dose Felino — LDDST (Feldman & Nelson 6ª ed.)',
            dose: '0,1 mg/kg IV lenta em bolus (dose 10 vezes maior que a canina)',
            note: 'Gatos têm resistência fisiológica de feedback hipofisário; usar 0,1 mg/kg IV e coletar basais, 4h e 8h.',
          },
          {
            title: 'Teste de Supressão por Alta Dose Felino — HDDST (Feldman & Nelson 6ª ed.)',
            dose: '1,0 mg/kg IV lenta em bolus (0,5 mL/kg da solução 2 mg/mL)',
            note: 'Diferenciação de hiperadrenocorticismo dependente de hipófise vs tumor de adrenal em felinos.',
          },
        ],
      },
      notes: [
        'Administração IV deve ser sempre lenta ao longo de pelo menos 1 a 2 minutos.',
        'Em cães de pequeno porte e gatos, para o teste LDDST (0,01 mg/kg), recomenda-se diluição 1:10 em NaCl 0,9% para acurácia de aspiração na seringa.',
      ],
    },
    plumbsContext: DEXAMETASONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Glicocorticoide parenteral de alta potência para crises inflamatórias agudas, estabilização imunossupressora parenteral inicial, manejo de edema vasogênico cerebral neoplásico e execução de testes funcionais endócrinos do eixo HPA.',
    reassessment:
      'Avaliar glicemia, pressão arterial e resposta clínica em 12 a 24 horas. Evitar pulsos parenterais repetidos que excedam 3 a 5 dias.',
    prescriptionExample:
      'Azium Solução Injetável 2 mg/mL — Frasco 10 mL. Para cão de 20 kg (protocolo IMHA ACVIM): Administrar 3,0 mL (0,3 mg/kg = 6 mg) por via intravenosa estritamente lenta, uma vez ao dia, por no máximo 48 horas até tolerância à prednisolona oral.',
    safetyAlert: DEXAMETASONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 28,00',
      rangeLabel: 'Frasco-ampola de 10 mL: R$ 22,00 a R$ 36,00',
      sourceDate: DEXAMETASONA_PRICE_SOURCE_DATE,
      notes: 'Medicamento de uso veterinário registrado no MAPA.',
    },
    evidenceLevel: 'Nível 1a — Consensos ACVIM, RECOVER, AAHA e Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:dexametasona',
  },
  {
    id: 'azium-msd-comp-0-5mg',
    slug: 'azium-comprimidos-0-5mg',
    name: 'Azium® 0,5 mg Comprimidos Blister com 20 comp (MSD Saúde Animal)',
    manufacturer: 'MSD Saúde Animal (Merck Animal Health)',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'ortho_antiinflammatory',
    commercialSubclasses: ['ortho_antiinflammatory'],
    productPageUrl: 'https://www.msd-saude-animal.com.br/produtos/azium-comprimidos/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dexamethasone/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Azium® 0,5 mg — caixa contendo 20 comprimidos birsulcados de dexametasona',
    ],
    activeComponents: [
      'dexametasona base 0,5 mg por comprimido',
    ],
    searchAliases: [
      'azium comprimido',
      'azium comp 0.5mg',
      'dexametasona comprimido cao',
      'dexametasona comprimido gato',
      'azium msd comprimido',
    ],
    labelCompositionSummary:
      'Cada comprimido birsulcado contém 0,5 mg de dexametasona base e excipientes q.s.p. 1 comprimido. Apresentação em cartucho com 20 comprimidos.',
    labelDirections:
      'Administrar por via oral, preferencialmente junto ao alimento pela manhã em cães (respeitando o pico fisiológico do cortisol) ou no período noturno em gatos. Doses anti-inflamatórias: 0,07 a 0,14 mg/kg em cães e 0,14 a 0,28 mg/kg em gatos.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,07 a 0,14 mg/kg VO q24–48h. Gatos: 0,14 a 0,28 mg/kg VO q24–48h. Duração recomendada: 3 a 5 dias.',
      plumbs: {
        dog: [
          {
            title: 'Anti-inflamatório Oral de Curto Prazo (Plumb’s 10ª ed.)',
            dose: '0,07 a 0,14 mg/kg VO a cada 24 a 48 horas',
            note: 'Para cão de 5 kg: 1 comprimido de 0,5 mg (0,10 mg/kg) VO q24h. Para cão de 10 kg: 2 comprimidos (0,10 mg/kg) VO q24h por 3 a 5 dias.',
          },
        ],
        cat: [
          {
            title: 'Anti-inflamatório Oral Felino (BSAVA 10ª ed.)',
            dose: '0,14 a 0,28 mg/kg VO a cada 24 a 48 horas',
            note: 'Para gato de 3,5 kg: 1 comprimido de 0,5 mg (0,14 mg/kg) VO q24h por 3 dias.',
          },
        ],
      },
      notes: [
        'Comprimidos birsulcados facilitam o fracionamento em metades ou quartos.',
        'Não exceder 5 a 7 dias contínuos sem desmame gradual.',
      ],
    },
    plumbsContext: DEXAMETASONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Controle anti-inflamatório oral de curta duração em afecções alérgicas cutâneas, prurido agudo, processos osteoarticulares edematosos e como terapia ponte.',
    reassessment:
      'Reavaliar sinais clínicos e tolerância digestiva em 48 a 72 horas. Monitorar poliúria, polidipsia e apetite.',
    prescriptionExample:
      'Azium 0,5 mg — Cartucho com 20 comprimidos. Para cão de 7,5 kg: Administrar 1 comprimido e meio (0,75 mg = 0,10 mg/kg) por via oral, uma vez ao dia pela manhã, por 4 dias.',
    safetyAlert: DEXAMETASONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 22,00',
      rangeLabel: 'Caixa com 20 comprimidos de 0,5 mg: R$ 18,00 a R$ 28,00',
      sourceDate: DEXAMETASONA_PRICE_SOURCE_DATE,
      notes: 'Uso veterinário. Venda sob prescrição.',
    },
    evidenceLevel: 'Nível 1b — Farmacologia Veterinária Consolidada e Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:dexametasona',
  },
  {
    id: 'dexagard-pearson-comp-0-5mg',
    slug: 'dexagard-comprimidos-0-5mg',
    name: 'Dexagard® 0,5 mg Comprimidos Caixa com 20 comp (Pearson Saúde Animal)',
    manufacturer: 'Pearson Saúde Animal / Eurofarma',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'ortho_antiinflammatory',
    commercialSubclasses: ['ortho_antiinflammatory'],
    productPageUrl: 'https://pearsonveterinaria.com.br/produtos/dexagard/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dexamethasone/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Dexagard® 0,5 mg — cartucho com 20 comprimidos sulcados de dexametasona',
    ],
    activeComponents: [
      'dexametasona base 0,5 mg por comprimido',
    ],
    searchAliases: [
      'dexagard',
      'dexagard 0.5mg',
      'dexagard pearson',
      'dexametasona pearson',
      'corticoide dexagard',
    ],
    labelCompositionSummary:
      'Cada comprimido contém 0,5 mg de dexametasona base e veículo q.s.p. 1 comprimido. Cartucho contendo 2 blisters com 10 comprimidos cada.',
    labelDirections:
      'Administrar por via oral na dose de 0,07 a 0,14 mg/kg para cães e 0,14 a 0,28 mg/kg para gatos, em dose única diária ou dividida em dias alternados, por período máximo recomendado de 5 a 7 dias.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,07 a 0,14 mg/kg VO q24–48h. Gatos: 0,14 a 0,28 mg/kg VO q24–48h.',
      plumbs: {
        dog: [
          {
            title: 'Dose Anti-inflamatória Ambulatorial Canina (Plumb’s 10ª ed.)',
            dose: '0,07 a 0,14 mg/kg VO a cada 24 a 48 horas',
            note: 'Cão de 5 kg: 1 comprimido q24h. Cão de 10 kg: 2 comprimidos q24h.',
          },
        ],
        cat: [
          {
            title: 'Dose Anti-inflamatória Ambulatorial Felina (BSAVA 10ª ed.)',
            dose: '0,14 a 0,28 mg/kg VO a cada 24 a 48 horas',
            note: 'Gato de 4 kg: 1 a 2 comprimidos q24–48h.',
          },
        ],
      },
      notes: [
        'Comprimido sulcado de fácil partição.',
        'Administrar sempre com alimentos para reduzir desconforto gástrico.',
      ],
    },
    plumbsContext: DEXAMETASONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Controle sintomático rápido de hipersensibilidades agudas, urticária, prurido alérgico inflamatório e afecções inflamatórias músculo-esqueléticas.',
    reassessment:
      'Reavaliar resposta clínica após 3 dias; planejar desmame ou troca para prednisolona oral se a patologia for crônica.',
    prescriptionExample:
      'Dexagard 0,5 mg — Cartucho com 20 comprimidos. Para cão de 10 kg: Administrar 2 comprimidos (1,0 mg = 0,10 mg/kg) por via oral pela manhã durante 3 dias consecutivos, seguidos de 1 comprimido pela manhã em dias alternados por mais 2 administrações.',
    safetyAlert: DEXAMETASONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 19,00',
      rangeLabel: 'Caixa com 20 comprimidos: R$ 15,00 a R$ 25,00',
      sourceDate: DEXAMETASONA_PRICE_SOURCE_DATE,
      notes: 'Uso veterinário. MAPA n° 6.278.',
    },
    evidenceLevel: 'Nível 1b — Literatura veterinária padrão e Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:dexametasona',
  },
  {
    id: 'decadron-ache-inj-2mg-1ml',
    slug: 'decadron-injetavel-2mg-1ml',
    name: 'Decadron® 2 mg/mL Solução Injetável Ampola 1 mL (Aché)',
    manufacturer: 'Aché Laboratórios Farmacêuticos S.A.',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'ortho_antiinflammatory',
    commercialSubclasses: ['ortho_antiinflammatory', 'endocrine_adrenal', 'endocrine_diagnostic'],
    productPageUrl: 'https://www.ache.com.br/produtos/decadron-injetavel/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dexamethasone/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Decadron® 2 mg/mL — ampola com 1 mL de solução injetável (fosfato dissódico de dexametasona)',
    ],
    activeComponents: [
      'fosfato dissódico de dexametasona equivalente a 2,0 mg/mL de dexametasona fosfato',
    ],
    searchAliases: [
      'decadron',
      'decadron injetavel',
      'decadron 2mg',
      'dexametasona humana injetavel',
      'dexametasona ache',
    ],
    labelCompositionSummary:
      'Cada 1 mL de solução injetável contém fosfato dissódico de dexametasona equivalente a 2,0 mg de dexametasona fosfato, veículo estéril com bissulfito de sódio, citrato de sódio, edetato dissódico e água para injetáveis. Ampola de 1 mL.',
    labelDirections:
      'Uso hospitalar e ambulatorial sob supervisão médica/veterinária. Administrar por via intravenosa estritamente lenta (ao longo de 2 minutos) ou intramuscular profunda.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,07 a 0,14 mg/kg IV lenta/IM q24h. Gatos: 0,14 a 0,28 mg/kg IV lenta/IM q24h. IMHA canina: 0,2 a 0,4 mg/kg IV q24h. LDDST canino: 0,01 mg/kg IV.',
      plumbs: {
        dog: [
          {
            title: 'Crise Addisoniana Pré-ACTH (AAHA 2023)',
            dose: '0,1 a 0,2 mg/kg IV lenta em dose única (0,05 a 0,1 mL/kg)',
            note: 'Formulação pura em fosfato dissódico; compatível com imunoensaio de cortisol sérico.',
          },
          {
            title: 'Protocolo IMHA ACVIM 2019 (Hospitalar)',
            dose: '0,2 a 0,4 mg/kg IV lenta a cada 24 horas',
            note: 'Administrar IV lenta. Não misturar na mesma seringa com outros medicamentos.',
          },
        ],
        cat: [
          {
            title: 'Emergência Inflamatória / Addison Felina (AAHA / BSAVA)',
            dose: '0,1 a 0,2 mg/kg IV lenta ou IM dose única',
            note: 'Permite coleta de cortisol basal e pós-estimulação sem interferência analítica.',
          },
        ],
      },
      notes: [
        'Uso humano consagrado em ambiente hospitalar veterinário.',
        'Ampola de vidro de dose única.',
      ],
    },
    plumbsContext: DEXAMETASONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Administração parenteral hospitalar para emergências inflamatórias, protocolo ACVIM de IMHA e realização de testes de estimulação por ACTH e supressão adrenal.',
    reassessment:
      'Monitorar estabilização hemodinâmica, glicemia e parâmetros eritrocitários a cada 12 a 24 horas.',
    prescriptionExample:
      'Decadron Injetável 2 mg/mL — 1 Ampola de 1 mL. Para cão de 10 kg (Crise Addisoniana Pré-ACTH): Administrar 0,75 mL (1,5 mg = 0,15 mg/kg) por via intravenosa lenta imediatamente antes ou após a coleta basal de cortisol, prosseguindo com o teste de ACTH sintético.',
    safetyAlert: DEXAMETASONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 14,00',
      rangeLabel: 'Ampola de 1 mL: R$ 11,00 a R$ 18,00',
      sourceDate: DEXAMETASONA_PRICE_SOURCE_DATE,
      notes: 'Uso hospitalar / farmácia comunitária. Registro ANVISA n° 1.0573.0003.',
    },
    evidenceLevel: 'Nível 1a — Farmacopeia e Consensos Veterinários Especializados',
    isControlled: false,
    catalogMedicationId: 'editorial:dexametasona',
  },
  {
    id: 'decadron-ache-inj-4mg-2-5ml',
    slug: 'decadron-injetavel-4mg-2-5ml',
    name: 'Decadron® 4 mg/mL Solução Injetável Frasco-Ampola 2,5 mL (Aché)',
    manufacturer: 'Aché Laboratórios Farmacêuticos S.A.',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'ortho_antiinflammatory',
    commercialSubclasses: ['ortho_antiinflammatory', 'endocrine_adrenal', 'endocrine_diagnostic'],
    productPageUrl: 'https://www.ache.com.br/produtos/decadron-injetavel-4mg/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dexamethasone/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Decadron® 4 mg/mL — frasco-ampola com 2,5 mL contendo 10 mg de dexametasona fosfato',
    ],
    activeComponents: [
      'fosfato dissódico de dexametasona equivalente a 4,0 mg/mL de dexametasona fosfato',
    ],
    searchAliases: [
      'decadron 4mg',
      'decadron 10mg',
      'decadron frasco ampola',
      'dexametasona 4mg ml',
      'decadron alta concentracao',
    ],
    labelCompositionSummary:
      'Cada 1 mL contém 4,0 mg de dexametasona fosfato (sob forma de fosfato dissódico de dexametasona). Frasco-ampola contendo 2,5 mL (10 mg totais de dexametasona).',
    labelDirections:
      'Uso hospitalar por via intravenosa estritamente lenta ou intramuscular profunda. A concentração de 4 mg/mL requer atenção redobrada no cálculo do volume para evitar sobredosagem acidental.',
    dosageGuidance: {
      labelDose:
        'Cães: 0,07 a 0,14 mg/kg IV lenta q24h (0,0175 a 0,035 mL/kg da solução 4 mg/mL). IMHA canina: 0,2 a 0,4 mg/kg IV q24h (0,05 a 0,1 mL/kg). Gatos: 0,14 a 0,28 mg/kg IV lenta q24h.',
      plumbs: {
        dog: [
          {
            title: 'Protocolo Hospitalar ACVIM IMHA para Grandes Cães',
            dose: '0,2 a 0,4 mg/kg IV lenta a cada 24 horas (0,05 a 0,1 mL/kg da solução 4 mg/mL)',
            note: 'Para cão de 30 kg: administrar 1,5 a 2,25 mL (6 a 9 mg de dexametasona) IV lenta.',
          },
          {
            title: 'Edema Vasogênico Cerebral Tumoral em Grandes Cães',
            dose: '0,1 a 0,3 mg/kg IV lenta a cada 12 a 24 horas',
            note: 'Administração IV em bolus lento ao longo de 2 a 3 minutos.',
          },
        ],
        cat: [
          {
            title: 'Teste HDDST Felino Diferencial (Feldman & Nelson 6ª ed.)',
            dose: '1,0 mg/kg IV lenta em bolus (0,25 mL/kg da solução 4 mg/mL)',
            note: 'Concentração de 4 mg/mL é ideal para aplicar volumes reduzidos no HDDST felino (ex: gato de 4 kg recebe 1,0 mL IV).',
          },
        ],
      },
      notes: [
        'Atenção ao cálculo volumétrico: cada 1 mL contém o DOBRO da concentração do Azium 2 mg/mL.',
        'Não administrar rapidamente em bólus IV.',
      ],
    },
    plumbsContext: DEXAMETASONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Concentração hospitalar de alta densidade farmacológica para pacientes de médio e grande porte, teste HDDST felino e controle de edema cerebral neoplásico severo.',
    reassessment:
      'Monitoração estrita de glicemia, débito urinário, pressão arterial e sinais gastrointestinais.',
    prescriptionExample:
      'Decadron Injetável 4 mg/mL — Frasco-ampola com 2,5 mL. Para cão de 25 kg (Edema Peritumoral Encefálico): Administrar 1,25 mL (5 mg = 0,2 mg/kg) por via intravenosa estritamente lenta a cada 24 horas por 48 horas.',
    safetyAlert: DEXAMETASONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 25,00',
      rangeLabel: 'Frasco-ampola de 2,5 mL (10 mg): R$ 20,00 a R$ 32,00',
      sourceDate: DEXAMETASONA_PRICE_SOURCE_DATE,
      notes: 'Uso hospitalar / farmácia comunitária. Registro ANVISA.',
    },
    evidenceLevel: 'Nível 1a — Consensos ACVIM, AAHA e Farmacopeia Veterinária',
    isControlled: false,
    catalogMedicationId: 'editorial:dexametasona',
  },
];
