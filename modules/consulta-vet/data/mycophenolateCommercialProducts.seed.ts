import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const mycophenolateCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'cellcept-micofenolato-mofetila-roche',
    slug: 'cellcept-micofenolato-mofetila',
    name: 'CellCept® (Micofenolato de Mofetila 500 mg)',
    manufacturer: 'Roche',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'systemic_immunosuppressive',
    commercialSubclasses: [
      'systemic_immunosuppressive',
      'neuro_immunosuppressive',
      'renal_ckd_support',
      'emergency_thrombopoietin',
      'oncologic_chemotherapy',
    ],
    species: ['dog', 'cat'],
    presentations: [
      'CellCept 500 mg comprimidos revestidos — caixa com 50 comprimidos',
      'CellCept 500 mg comprimidos revestidos — caixa com 100 comprimidos',
    ],
    activeComponents: ['micofenolato de mofetila 500 mg'],
    searchAliases: [
      'cellcept',
      'cellcept 500',
      'micofenolato',
      'micofenolato de mofetila',
      'micofenolato mofetila',
      'mmf',
      'mofetil',
      'mfoetila',
      'morfetila',
      'acido micofenolico',
      'mpa',
      'roche',
      'imunossupressor',
      'mue',
      'muo',
      'encefalite canina',
      'glomerulopatia',
      'glomerulonefrite',
      'itp',
      'pti canina',
      'penfigo',
      'penfigo foliaceo',
      'ahim',
      'imha',
      'miastenia gravis',
      'plumbs',
      'bsava',
    ],
    labelCompositionSummary:
      'Cada comprimido revestido contém 500 mg de micofenolato de mofetila (MMF), pró-fármaco éster 2-morfolinoetílico do ácido micofenólico (MPA). Registro Anvisa MS nº 1.0100.0543 (Produtos Roche Químicos e Farmacêuticos S.A.). Medicamento de referência humana imunossupressor antiproliferativo seletivo via inibição potente e reversível da IMPDH tipo II.',
    labelDirections:
      'Bula humana Anvisa: 1.000 a 1.500 mg duas vezes ao dia (a cada 12 horas). Posologia veterinária extra-bula consagrada (Plumb’s Veterinary Drug Handbook 10ª ed., BSAVA Small Animal Formulary 10ª ed., Consensos IRIS e ACVIM): Cães: 8 a 12 mg/kg (frequentemente 10 mg/kg) por via oral a cada 12 horas (q12h / BID) como imunossupressor geral ou poupador de corticoides. Indicações específicas em cães: 1) Meningoencefalomielite de etiologia desconhecida (MUE / MUO): 10 a 20 mg/kg VO q12h (iniciar preferencialmente com 10 a 15 mg/kg q12h para minimizar toxicidade entérica); 2) Glomerulopatias imunomediadas (Consenso IRIS): 10 mg/kg VO q12h; 3) Trombocitopenia imunomediada (ITP / PTI refratária): 7 a 10 mg/kg VO q12h; 4) Dermatopatias autoimunes e pênfigo foliáceo: 10 a 15 mg/kg VO q12h (ou 7 a 13 mg/kg VO a cada 8 horas segundo protocolo BSAVA, ciente de que regimes q8h elevam o risco de diarreia); 5) Anemia hemolítica imunomediada (IMHA): 8 a 12 mg/kg VO q12h sob rigoroso monitoramento (ensaio de Agnoli 2024 registrou maior cautela e preferência por ciclosporina). Gatos: 10 mg/kg VO a cada 12 horas (q12h) administrado rigorosamente com alimentos (dados clínicos limitados; monitorar êmese e hiporexia). BIOSSEGURANÇA: NUNCA partir, quebrar ou triturar comprimidos (fármaco perigoso NIOSH teratogênico). Manipular sempre com luvas.',
    dosageGuidance: {
      labelDose: 'Cães: 8 a 12 mg/kg (comum 10 mg/kg) VO a cada 12h. Gatos: 10 mg/kg VO a cada 12h com alimento (Plumb’s e BSAVA).',
      plumbs: {
        dog: [
          {
            title: 'Imunossupressão Geral & Poupador de Corticoides (Plumb’s 10ª ed. / BSAVA 10ª ed.)',
            dose: '8 a 12 mg/kg VO a cada 12 horas (q12h / BID); dose padrão de 10 mg/kg q12h',
            note: 'Dose inicial de escolha para minimizar a taxa de enterite e diarreia dose-dependente. Administrar com ou sem alimento; se houver vômito, fornecer pequena porção de comida.',
          },
          {
            title: 'Meningoencefalomielite de Etiologia Desconhecida (MUE / MUO Canina)',
            dose: '10 a 20 mg/kg VO a cada 12 horas (iniciar tipicamente com 10 a 15 mg/kg q12h)',
            note: 'Associar a prednisona/prednisolona em dose imunossupressora. Resposta clínica global expressiva (>85%) descrita na literatura neurológica (Song et al.).',
          },
          {
            title: 'Glomerulopatias Imunomediadas e Síndrome Nefrótica (Consenso IRIS / Plumb’s)',
            dose: '10 mg/kg VO a cada 12 horas (q12h)',
            note: 'Imunossupressor de primeira linha não esteroidal recomendado pelo IRIS para reduzir deposição de imunocomplexos sem agravar proteinúria por efeito esteroidal.',
          },
          {
            title: 'Trombocitopenia Imunomediada (ITP / PTI Refratária — Consenso ACVIM 2024)',
            dose: '7 a 10 mg/kg VO a cada 12 horas (q12h)',
            note: 'Opção de segundo agente imunossupressor quando há resposta incompleta a corticosteroides ou efeitos colaterais esteroidais intoleráveis.',
          },
          {
            title: 'Dermatopatias Autoimunes e Pênfigo Foliáceo (Ackermann / BSAVA 10ª ed.)',
            dose: '10 a 15 mg/kg VO a cada 12 horas (ou 7 a 13 mg/kg VO q8h segundo BSAVA)',
            note: 'Dose média eficaz de 14,7 mg/kg q12h descrita por Ackermann (2017). Protocolos q8h do BSAVA aumentam a incidência de diarreia profusa; iniciar preferencialmente com 10 mg/kg q12h.',
          },
          {
            title: 'Anemia Hemolítica Imunomediada (IMHA Canina — ACVIM 2019 / Agnoli 2024)',
            dose: '8 a 12 mg/kg VO a cada 12 horas (q12h)',
            note: 'Uso selecionado de resgate. Ensaio clínico randomizado de 2024 (Agnoli et al.) recomenda cautela e priorização de ciclosporina devido a dados desfavoráveis de mortalidade.',
          },
        ],
        cat: [
          {
            title: 'Doenças Imunomediadas Felinas Selecionadas (Plumb’s 10ª ed. / Slovak et al.)',
            dose: '10 mg/kg VO a cada 12 horas (q12h) obrigatoriamente junto à alimentação',
            note: 'Felinos ativam o MMF em MPA por glicosidação, mas a farmacocinética é individualmente variável e a tolerabilidade digestiva exige vigilância clínica rigorosa.',
          },
        ],
      },
      notes: [
        'TOXICIDADE GASTROINTESTINAL DOSE-LIMITANTE: Diarreia profusa, mucoide ou hemorrágica ocorre em aproximadamente 25% dos cães. Se surgir enterocolite, suspender temporariamente por 48-72h e reintroduzir com redução posológica de 25% a 50%.',
        'FÁRMACO PERIGOSO NIOSH 2024 (TERATOGÊNICO): Proibido partir, macerar ou abrir comprimidos. Manusear com luvas de nitrila. Mulheres grávidas ou lactantes não devem manipular o produto.',
        'NÃO INTERCAMBIÁVEL COM MYFORTIC®: O micofenolato de sódio gastrorresistente (EC-MPS) NÃO é bioequivalente ao MMF em pequenos animais; causou diarreia significativamente mais intensa e enterite grave em cães.',
        'INTERAÇÃO COM CICLOSPORINA: A ciclosporina inibe a proteína de transporte biliar MRP2 e REDUZ a exposição plasmática ao MPA em 30% a 50%, embora mantenham sinergismo terapêutico aditivo.',
        'INTERAÇÃO COM ANTIBIÓTICOS: Antimicrobianos de amplo espectro (amoxicilina-clavulanato, fluorquinolonas) suprimem bactérias intestinais produtoras de beta-glucuronidase, derrubando a recirculação entero-hepática do MPA em até 40%.',
        'QUELANTES E ANTIÁCIDOS: Hidróxido de alumínio/magnésio e ferro reduzem a absorção do micofenolato. Administrar com intervalo mínimo de 2 a 4 horas.',
      ],
    },
    plumbsContext:
      'O micofenolato de mofetila (MMF) é um pró-fármaco que, após absorção oral, é rapidamente hidrolisado por carboxilesterases teciduais e hepáticas no metabólito ativo ácido micofenólico (MPA). O MPA atua como um inibidor potente, não competitivo e reversível da enzima inosina-monofosfato-desidrogenase (IMPDH), especificamente com seletividade 5 vezes superior para a isoforma IMPDH-II expressa constitutivamente em linfócitos B e T ativados. Como os linfócitos dependem quase que com exclusividade da síntese de novo de purinas para a replicação do DNA (ao contrário de outros tipos celulares que utilizam vias de resgate), o MMF bloqueia seletivamente a proliferação linfocitária e a síntese de autoanticorpos de maneira citostática, sem provocar mielossupressão intensa como os agentes alquilantes clássicos.',
    clinicalUse:
      'Imunossupressor seletivo de segunda linha e agente poupador de glicocorticoides de alta relevância clínica para cães com Meningoencefalomielite de Etiologia Desconhecida (MUE / MUO), Glomerulopatias Imunomediadas por imunocomplexos (Consenso IRIS), Trombocitopenia Imunomediada (ITP / PTI refratária), Pênfigo Foliáceo e dermatopatias autoimunes, e em casos selecionados de Miastenia Gravis ou IMHA sob estrito monitoramento.',
    reassessment:
      'Hemograma completo quinzenal no primeiro mês e mensal subsequente (vigilância de neutropenia/leucopenia). Avaliação seriada da função renal e razão proteína:creatinina urinária (UPC) em glomerulopatias. Monitoramento semanal do escore fecal e peso corporal para detecção precoce de enterocolite dose-dependente.',
    prescriptionExample:
      'CellCept 500 mg comprimidos revestidos (Roche) — caixa com 50 comprimidos: Administrar ___ comprimido(s) (dose calculada a 10 mg/kg) por via oral a cada 12 horas. ATENÇÃO: Não partir nem esmagar os comprimidos. Manusear obrigatoriamente com luvas de procedimento.',
    safetyAlert:
      'ALERTA CRÍTICO DE BIOSSEGURANÇA E CONDUTA CLÍNICA: 1) TOXICIDADE GASTROINTESTINAL DOSE-LIMITANTE: Cerca de 25% dos cães desenvolvem diarreia aguda profusa, fezes com muco e sangue vivo (enterite hemorrágica) e anorexia após 7 a 14 dias de terapia. Doses superiores a 15 mg/kg elevam drasticamente essa toxicidade. Em caso de diarreia grave, suspender o fármaco por 48 horas e reduzir a dose em 25% a 50%; 2) MEDICAMENTO PERIGOSO (LISTA NIOSH 2024 — TERATOGÊNICO SEVERO): Potencial teratogênico e embriotóxico comprovado. É expressamente proibido partir, cortar ou pulverizar os comprimidos. Uso obrigatório de luvas de proteção; mulheres gestantes não devem manusear; 3) NÃO SUBSTITUIR POR MYFORTIC®: O micofenolato sódico gastrorresistente não é bioequivalente ao MMF em cães e gerou diarreia muito mais severa em ensaios clínicos; 4) RECIRCULAÇÃO ENTERO-HEPÁTICA E INTERAÇÕES: Antibióticos de amplo espectro erradicam a microbiota que recicla o MPA e reduzem sua eficácia; a ciclosporina diminui a concentração plasmática de MPA em 30 a 50%; antiácidos e quelantes de ferro/alumínio reduzem a absorção oral (espaçar por 2 a 4 horas).',
    price: {
      averageLabel: 'R$ 480,00 (50 comp) / R$ 890,00 (100 comp)',
      rangeLabel: 'Drogarias humanas e distribuidoras hospitalares: R$ 420,00 a R$ 1.050,00',
      sourceDate: '10/2026',
      notes: 'Medicamento humano de referência sob prescrição médica (tarja vermelha / receita simples).',
    },
    evidenceLevel: 'Consensos IRIS Glomerulopatias / ACVIM ITP 2024 / Plumb’s 10ª ed. / BSAVA 10ª ed.',
    imageUrl: 'https://product-data.raiadrogasil.io/images/15317780.webp',
    productPageUrl: 'https://www.roche.com.br/',
    catalogMedicationId: 'med-micofenolato-mofetila',
  },
  {
    id: 'micofenolato-mofetila-generico-humano',
    slug: 'micofenolato-mofetila-generico',
    name: 'Micofenolato de Mofetila 500 mg Genérico (EMS / Eurofarma / Cristália)',
    manufacturer: 'EMS / Eurofarma / Cristália / Accord',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'systemic_immunosuppressive',
    commercialSubclasses: [
      'systemic_immunosuppressive',
      'neuro_immunosuppressive',
      'renal_ckd_support',
      'emergency_thrombopoietin',
      'oncologic_chemotherapy',
    ],
    species: ['dog', 'cat'],
    presentations: [
      'Micofenolato de Mofetila 500 mg comprimidos revestidos — caixa com 50 comprimidos',
      'Micofenolato de Mofetila 500 mg comprimidos revestidos — caixa com 100 comprimidos',
    ],
    activeComponents: ['micofenolato de mofetila 500 mg'],
    searchAliases: [
      'micofenolato generico',
      'micofenolato mofetila generico',
      'micofenolato de mofetila generico',
      'micofenolato ems',
      'micofenolato eurofarma',
      'micofenolato cristalia',
      'micofenolato accord',
      'micofenolato sandoz',
      'mmf generico',
      'cellcept generico',
      'mfoetila generico',
      'morfetila generico',
      'imunossupressor generico',
      'plumbs',
      'bsava',
    ],
    labelCompositionSummary:
      'Comprimidos revestidos de 500 mg de micofenolato de mofetila genérico intercambiável. Registros Anvisa oficiais: MS 1.0235.0927 (EMS S/A), MS 1.0043.1066 (Eurofarma Laboratórios S.A.), MS 1.0298.0372 (Cristália Produtos Químicos Farmacêuticos Ltda.), MS 1.5537.0016 (Accord Farmacêutica). Bioequivalente comprovado ao medicamento de referência CellCept®.',
    labelDirections:
      'Posologia extra-bula veterinária padronizada (Plumb’s Veterinary Drug Handbook 10ª ed., BSAVA Small Animal Formulary 10ª ed.): Cães: 8 a 12 mg/kg VO a cada 12 horas (q12h / BID), dose usual de 10 mg/kg q12h. MUE canina: 10 a 20 mg/kg VO q12h; Glomerulopatias (IRIS): 10 mg/kg VO q12h; ITP (ACVIM 2024): 7 a 10 mg/kg VO q12h; Pênfigo foliáceo: 10 a 15 mg/kg VO q12h (ou 7 a 13 mg/kg VO q8h pelo BSAVA). Gatos: 10 mg/kg VO q12h junto com alimento. ADVERTÊNCIA DE BIOSSEGURANÇA: Não partir nem macerar comprimidos revestidos. Manusear com luvas.',
    dosageGuidance: {
      labelDose: 'Cães: 8 a 12 mg/kg (padrão 10 mg/kg) VO q12h. Gatos: 10 mg/kg VO q12h com alimento (Plumb’s e BSAVA).',
      plumbs: {
        dog: [
          {
            title: 'Imunossupressão Sistêmica & Poupador de Corticoides (Plumb’s 10ª ed. / BSAVA)',
            dose: '8 a 12 mg/kg VO a cada 12 horas (q12h / BID)',
            note: 'Dose rotineira de 10 mg/kg q12h. Administrar com ou sem alimento; reduzir dose em 25-50% se surgir diarreia.',
          },
          {
            title: 'Meningoencefalomielite de Etiologia Desconhecida (MUE / MUO)',
            dose: '10 a 20 mg/kg VO a cada 12 horas (iniciar com 10 a 15 mg/kg q12h)',
            note: 'Terapia imunossupressora contínua associada a glicocorticoides.',
          },
          {
            title: 'Glomerulopatias Imunomediadas (Consenso IRIS)',
            dose: '10 mg/kg VO a cada 12 horas',
            note: 'Agente não esteroidal de primeira linha para redução sustentada da proteinúria.',
          },
          {
            title: 'Trombocitopenia Imunomediada (ITP / PTI Refratária)',
            dose: '7 a 10 mg/kg VO a cada 12 horas',
            note: 'Segundo agente imunossupressor no protocolo do Consenso ACVIM 2024.',
          },
        ],
        cat: [
          {
            title: 'Doenças Imunomediadas Felinas Selecionadas',
            dose: '10 mg/kg VO a cada 12 horas com alimento',
            note: 'Supervisionar apetite, peso e função gastrointestinal.',
          },
        ],
      },
      notes: [
        'Diarreia dose-dependente em cerca de 25% dos cães; suspender e reduzir dose se houver fezes líquidas ou hematoquezia.',
        'Classificado como fármaco perigoso NIOSH (teratogênico). Proibido partir ou mastigar comprimidos. Usar luvas.',
        'Não intercambiável com micofenolato de sódio (Myfortic®) em pequenos animais.',
        'Interação com ciclosporina (reduz níveis de MPA em 30-50%) e antibióticos de amplo espectro.',
      ],
    },
    plumbsContext:
      'Versão genérica bioequivalente do micofenolato de mofetila, mantendo o mesmo perfil farmacocinético do medicamento de referência: rápida conversão pré-sistêmica em ácido micofenólico ativo (MPA), inibição seletiva da IMPDH tipo II e bloqueio da síntese de novo de nucleotídeos de guanina em clones linfocitários B e T.',
    clinicalUse:
      'Alternativa de ampla disponibilidade e custo reduzido para o tratamento imunossupressor crônico de MUE, glomerulonefrites imunomediadas, PTI refratária e dermatopatias autoimunes em cães de porte médio a grande.',
    reassessment:
      'Hemograma a cada 15 a 30 dias. Monitoramento estrito de consistência fecal, vômitos e peso corporal. Titulação de proteinúria (UPC) e albumina em nefropatas.',
    prescriptionExample:
      'Micofenolato de Mofetila 500 mg comprimidos revestidos genéricos (EMS / Eurofarma) — caixa com 50 comprimidos: Administrar dose de ___ comprimido(s) (10 mg/kg) por via oral a cada 12 horas. Não partir os comprimidos.',
    safetyAlert:
      'ALERTA DE SEGURANÇA: Apresentação genérica com idênticos riscos de toxicidade gastrointestinal dose-limitante (diarreia profusa/enterocolite em até 25% dos cães) e teratogenicidade ocupacional grave (NIOSH 2024). Proibido cortar comprimidos; obrigatório o uso de luvas de proteção. Não substituir por Myfortic®.',
    price: {
      averageLabel: 'R$ 220,00 (50 comp) / R$ 420,00 (100 comp)',
      rangeLabel: 'Rede de farmácias comerciais / distribuidoras: R$ 180,00 a R$ 490,00',
      sourceDate: '10/2026',
      notes: 'Medicamento genérico humano sob prescrição médica (receita branca comum).',
    },
    evidenceLevel: 'Bioequivalência Anvisa / Consensos IRIS / ACVIM ITP 2024 / Plumb’s 10ª ed.',
    imageUrl: 'https://product-data.raiadrogasil.io/images/16723049.webp',
    productPageUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    catalogMedicationId: 'med-micofenolato-mofetila',
  },
  {
    id: 'micofenolato-mofetila-manipulado-veterinario',
    slug: 'micofenolato-mofetila-manipulado-veterinario',
    name: 'Micofenolato de Mofetila Cápsulas e Suspensão Veterinária Manipulada',
    manufacturer: 'Farmácia de Manipulação Veterinária Especializada',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'systemic_immunosuppressive',
    commercialSubclasses: [
      'systemic_immunosuppressive',
      'neuro_immunosuppressive',
      'renal_ckd_support',
      'emergency_thrombopoietin',
      'oncologic_chemotherapy',
    ],
    species: ['dog', 'cat'],
    presentations: [
      'Micofenolato de Mofetila cápsulas orais sob medida (25 mg, 50 mg, 75 mg, 100 mg, 150 mg, 200 mg, 250 mg)',
      'Micofenolato de Mofetila suspensão oral palatável 50 mg/mL ou 100 mg/mL (veículo oral estéril sem cátions)',
      'Micofenolato de Mofetila pasta oral lipofílica dosadora personalizada',
    ],
    activeComponents: ['micofenolato de mofetila grau farmacêutico sob medida'],
    searchAliases: [
      'micofenolato manipulado',
      'micofenolato mofetila manipulado',
      'micofenolato de mofetila manipulado',
      'mmf manipulado',
      'cellcept manipulado',
      'micofenolato suspensao',
      'micofenolato capsulas',
      'micofenolato xarope',
      'mfoetila manipulado',
      'morfetila manipulado',
      'drogavet micofenolato',
      'formula animal micofenolato',
      'plumbs manipulado',
      'bsava manipulado',
    ],
    labelCompositionSummary:
      'Micofenolato de mofetila matéria-prima de grau farmacêutico fracionada em dosagens miligramadas sob medida em cápsulas gelatinosas ou suspensão líquida em veículos palatáveis isentos de cátions polivalentes por farmácias magistrais veterinárias especializadas (DrogaVET, Fórmula Animal, PetFarma). Permite atender com exatidão a faixa de 8 a 12 mg/kg recomendada por Plumb’s e BSAVA para cães de pequeno porte e gatos sem cortar comprimidos humanos perigosos.',
    labelDirections:
      'Administrar por via oral a dose exata prescrita (8 a 12 mg/kg, comumente 10 mg/kg em cães; 10 mg/kg com alimento em gatos) a cada 12 horas (q12h / BID). Agitar vigorosamente a suspensão oral antes do uso. Administrar cápsulas intactas sem abrir. Seguir monitoramento clínico estrito.',
    dosageGuidance: {
      labelDose: 'Cães: 8 a 12 mg/kg (dose alvo 10 mg/kg) VO q12h. Gatos: 10 mg/kg VO q12h com alimento (Plumb’s e BSAVA).',
      plumbs: {
        dog: [
          {
            title: 'Dose Individualizada de Imunossupressão (Plumb’s 10ª ed. / BSAVA)',
            dose: '8 a 12 mg/kg VO a cada 12 horas (dose padrão 10 mg/kg q12h)',
            note: 'Formulação sob medida permite evitar subdosagem ou sobredosagem tóxica em cães < 20 kg que não toleram os comprimidos fixos de 500 mg.',
          },
          {
            title: 'MUE Canina em Cães Pequenos / Toy (Plumb’s)',
            dose: '10 a 15 mg/kg VO a cada 12 horas em cápsulas sob medida',
            note: 'Essencial para raças miniaturas (Pug, Maltês, Yorkshire, Spitz) com neuroinflamação encefálica.',
          },
          {
            title: 'Dermatopatias Autoimunes e Pênfigo (BSAVA 10ª ed.)',
            dose: '10 a 15 mg/kg VO q12h (ou 7 a 13 mg/kg VO q8h)',
            note: 'Possibilita fracionamento preciso para controle de crostas e lesões pustulosas.',
          },
        ],
        cat: [
          {
            title: 'Doenças Imunomediadas Felinas em Suspensão ou Minilodis (Plumb’s / Slovak)',
            dose: '10 mg/kg VO a cada 12 horas junto à ração',
            note: 'Apresentação em suspensão ou cápsula mini viabiliza administração em gatos sem estresse e sem partições grosseiras.',
          },
        ],
      },
      notes: [
        'A manipulação veterinária elimina a necessidade perigosa de partir comprimidos revestidos de 500 mg, protegendo o tutor contra a inalação de partículas citostáticas teratogênicas.',
        'Veículo oral líquido deve ser formulado sem cátions polivalentes (cálcio, magnésio, ferro, alumínio) para não prejudicar a absorção.',
        'Se houver diarreia, suspender por 48h e reintroduzir com ajuste de 25% a 50% na dose calculada.',
      ],
    },
    plumbsContext:
      'A disponibilidade do micofenolato de mofetila manipulado veterinário sob medida resolve o principal desafio de segurança e precisão na rotina de pequenos animais: a impossibilidade de dosar acuradamente pacientes de até 20 kg com comprimidos humanos inteiros de 500 mg sem incorrer em corte de comprimidos proibido pelas normas de biossegurança ocupacional NIOSH.',
    clinicalUse:
      'Tratamento individualizado de MUE, glomerulopatias imunomediadas, pênfigo foliáceo, PTI refratária e doenças autoimunes em cães pequenos, médios e felinos.',
    reassessment:
      'Hemograma a cada 15 a 30 dias. Monitoramento semanal do escore de fezes e tolerabilidade gastrointestinal.',
    prescriptionExample:
      'Micofenolato de mofetila ___ mg (dose calculada a 10 mg/kg) cápsulas orais magistrais veterinárias — frasco com 60 cápsulas: Administrar 1 cápsula por via oral a cada 12 horas. Não abrir as cápsulas.',
    safetyAlert:
      'ALERTA DE MANIPULAÇÃO E SEGURANÇA: Fármaco perigoso NIOSH 2024 teratogênico. A farmácia deve manipular em capela de exaustão com EPI completo. O tutor deve ministrar a cápsula ou seringa dosadora com luvas, sem abrir a cápsula nem gerar aerossóis. Suspender se houver diarreia severa.',
    price: {
      averageLabel: 'R$ 130,00 a R$ 260,00 (frasco com 60 cápsulas ou suspensão 60 mL)',
      rangeLabel: 'Farmácias de manipulação veterinária homologadas: R$ 95,00 a R$ 320,00 dependendo da dosagem miligramada',
      sourceDate: '10/2026',
      notes: 'Formulação magistral veterinária personalizada sob prescrição do médico-veterinário.',
    },
    evidenceLevel: 'Diretrizes Farmacêuticas Magistrais / Consensos ACVIM / Plumb’s 10ª ed. / BSAVA',
    imageUrl: '/assets/consulta-vet/commercial-products/micofenolato-mofetila-manipulado-veterinario.svg',
    productPageUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    catalogMedicationId: 'med-micofenolato-mofetila',
  },
  {
    id: 'myfortic-micofenolato-sodio-novartis',
    slug: 'myfortic-micofenolato-sodio',
    name: 'Myfortic® (Micofenolato de Sódio 180 mg e 360 mg) [NÃO INTERCAMBIÁVEL COM MMF]',
    manufacturer: 'Novartis',
    commercialClass: 'antiinflammatory',
    commercialSubclass: 'systemic_immunosuppressive',
    commercialSubclasses: [
      'systemic_immunosuppressive',
      'renal_ckd_support',
      'oncologic_chemotherapy',
    ],
    species: ['dog', 'cat'],
    presentations: [
      'Myfortic 180 mg comprimidos gastrorresistentes — caixa com 120 comprimidos',
      'Myfortic 360 mg comprimidos gastrorresistentes — caixa com 120 comprimidos',
    ],
    activeComponents: [
      'micofenolato sódico 180 mg (equivalente a 192,4 mg de sal sódico)',
      'micofenolato sódico 360 mg (equivalente a 384,8 mg de sal sódico)',
    ],
    searchAliases: [
      'myfortic',
      'myfortic 180',
      'myfortic 360',
      'micofenolato de sodio',
      'micofenolato sodio',
      'ec-mps',
      'novartis',
      'imunossupressor sodio',
      'mfoetila',
      'plumbs',
    ],
    labelCompositionSummary:
      'Cada comprimido gastrorresistente contém 192,4 mg de micofenolato de sódio (equivalente a 180 mg de ácido micofenólico livre) ou 384,8 mg de micofenolato de sódio (equivalente a 360 mg de MPA). Registro Anvisa MS nº 1.0068.0898 (Novartis Biociências S.A.). Comprimidos com revestimento entérico formulados para liberação colônica em humanos.',
    labelDirections:
      'Bula humana Anvisa: 720 mg VO duas vezes ao dia (a cada 12 horas). ADVERTÊNCIA EXPRESSA DE USO VETERINÁRIO: O micofenolato sódico gastrorresistente (EC-MPS, Myfortic®) NÃO É EQUIVALENTE NEM INTERCAMBIÁVEL COM O MICOFENOLATO DE MOFETILA (MMF / CellCept®) EM CÃES E GATOS. Ensaios em cães Beagles demonstraram que a formulação sódica gastrorresistente causou diarreia significativamente mais grave, enterite severa e emaciação quando comparada ao MMF. Não substituir sem orientação estrita de especialista.',
    dosageGuidance: {
      labelDose: 'Uso geralmente desaconselhado em pequenos animais; não intercambiável com MMF. Em caso excepcional supervisionado: ~7 a 10 mg/kg VO q12h.',
      plumbs: {
        dog: [
          {
            title: 'Alerta de Não-Intercambialidade (Plumb’s 10ª ed.)',
            dose: 'Não intercambiável mg por mg com MMF; uso restrito e desaconselhado',
            note: 'A formulação gastrorresistente humana provoca absorção errática e lesão da mucosa entérica exacerbada em caninos comparada ao éster mofetila.',
          },
        ],
      },
      notes: [
        'AVISO CRÍTICO: Não substituir prescrição de CellCept ou MMF por Myfortic. O sal sódico gastrorresistente provocou maior morbidade gastrointestinal em cães.',
        'Comprimidos gastrorresistentes nunca devem ser partidos ou mastigados.',
      ],
    },
    plumbsContext:
      'O micofenolato sódico com revestimento entérico (EC-MPS) foi desenvolvido na medicina humana para mitigar queixas de dispepsia gástrica alta. Contudo, em medicina veterinária de cães, a dissolução distal dependente de pH produziu maior toxicidade sobre enterócitos e cólon, resultando em incidência substancialmente superior de diarreia grave e colite em comparação com o MMF tradicional.',
    clinicalUse:
      'Cadastrado no catálogo com finalidade informativa e de alerta regulatório/farmacológico para evitar trocas inadvertidas de receituário entre MMF (CellCept®) e micofenolato de sódio (Myfortic®) na rotina veterinária.',
    reassessment:
      'Caso administrado de forma excepcional, monitorar rigorosamente o trânsito intestinal e hemograma seriado.',
    prescriptionExample:
      'ATENÇÃO: Produto cadastrado com alerta de não-intercambiabilidade. Recomenda-se prescrever preferencialmente Micofenolato de Mofetila (MMF / CellCept®).',
    safetyAlert:
      'ALERTA GRAVE DE NÃO-INTERCAMBIABILIDADE VETERINÁRIA: O Myfortic® (micofenolato de sódio gastrorresistente) NÃO deve ser usado como substituto direto do Micofenolato de Mofetila (MMF / CellCept®). Estudos em cães comprovaram maior frequência e gravidade de diarreia, enterite e perda de peso com a formulação de sal sódico entérico. Além disso, mantém os riscos ocupacionais de fármaco teratogênico da lista NIOSH 2024.',
    price: {
      averageLabel: 'R$ 750,00 (180 mg c/ 120 comp) / R$ 1.480,00 (360 mg c/ 120 comp)',
      rangeLabel: 'Drogarias de alto custo: R$ 680,00 a R$ 1.700,00',
      sourceDate: '10/2026',
      notes: 'Medicamento biológico humano sob prescrição médica (tarja vermelha).',
    },
    evidenceLevel: 'Estudos Farmacocinéticos Comparativos em Cães / Monografia Plumb’s 10ª ed.',
    imageUrl: 'https://product-data.raiadrogasil.io/images/14981926.webp',
    productPageUrl: 'https://www.novartis.com.br/',
    catalogMedicationId: 'med-micofenolato-mofetila',
  },
];
