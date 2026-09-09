import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const gardenalKeppraCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'gardenal-sanofi-100',
    slug: 'gardenal-sanofi',
    name: 'Gardenal® (Fenobarbital)',
    manufacturer: 'Sanofi-Aventis / Pharlab',
    commercialClass: 'neurologic',
    commercialSubclass: 'neuro_anticonvulsant',
    commercialSubclasses: ['neuro_anticonvulsant'],
    species: ['dog', 'cat'],
    presentations: [
      'Gardenal® 100 mg — caixa com 20 comprimidos sulcados',
      'Gardenal® 50 mg — caixa com 20 comprimidos sulcados',
      'Gardenal® Gotas 40 mg/mL (4%) — frasco com 20 mL (1 gota ≈ 1 mg)',
    ],
    activeComponents: [
      'fenobarbital 100 mg',
      'fenobarbital 50 mg',
      'fenobarbital 40 mg/mL',
    ],
    searchAliases: ['gardenal', 'fenobarbital', 'fenobarbitona', 'luminal'],
    labelCompositionSummary:
      'Gardenal® 100 mg: cada comprimido contém 100 mg de fenobarbital. Gardenal® 50 mg: cada comprimido contém 50 mg de fenobarbital. Gardenal® Gotas 40 mg/mL: cada 1 mL (40 gotas) contém 40 mg de fenobarbital (1 gota = 1 mg). Comprimidos com sulco para partição precisa.',
    labelDirections:
      'Bula humana: adultos 2 a 3 mg/kg/dia; crianças 3 a 4 mg/kg/dia. Doses veterinárias (Plumb\'s 10ª ed.): Cães: dose inicial 2,5 a 3 mg/kg VO q12h (manutenção 2 a 5 mg/kg q12h). Gatos: 1 a 3 mg/kg VO q12h (ou 7,5 a 15 mg/gato q12h). Uso contínuo; não suspender abruptamente.',
    dosageGuidance: {
      labelDose:
        'Bula humana: 2 a 3 mg/kg/dia VO. Dose inicial veterinária recomendada (Plumb\'s 10ª ed.): Cães 2,5 a 3 mg/kg VO q12h; Gatos 1 a 3 mg/kg VO q12h.',
      plumbs: {
        dog: [
          {
            title: 'Epilepsia idiopática / Manutenção crônica (Plumb\'s 10ª ed.)',
            dose: '2,5 a 3 mg/kg VO a cada 12 horas',
            note: 'Duração: Uso contínuo (vitalício na epilepsia crônica). Desmame gradual ao longo de 2 a 6 meses se ≥ 1 a 2 anos livre de crises. Faixas de manutenção usuais: 2 a 5 mg/kg VO q12h. Monitorar concentração sérica (alvo: 15 a 35 µg/mL) em 10–14 dias e após 6 semanas por autoindução.',
          },
          {
            title: 'Dose de ataque / Emergência (Status epilepticus / Crises em cluster)',
            dose: 'Até 16 a 24 mg/kg fracionados em 24 horas',
            note: 'Duração: Fase aguda de emergência com transição para manutenção a cada 12 horas. Monitorar estritamente depressão respiratória e sedação profunda.',
          },
        ],
        cat: [
          {
            title: 'Epilepsia / Controle de crises em felinos (Plumb\'s 10ª ed.)',
            dose: '1 a 3 mg/kg VO a cada 12 horas',
            note: 'Duração: Uso contínuo / vitalício na epilepsia crônica. Desmame lento em meses caso ocorra controle prolongado. Dose prática: 7,5 a 15 mg/gato VO q12h (ou ½ comp de 15 mg q12h). Felinos têm menor autoindução que cães, mas monitorar sedação e enzimas hepáticas.',
          },
        ],
      },
      notes: [
        'Duração do tratamento: Vitalício no controle de epilepsia idiopática crônica. Não suspender ou reduzir bruscamente pelo alto risco de status epilepticus e crise de abstinência barbitúrica.',
        'Monitoramento terapêutico sérico: Coletar nível sérico em 10–14 dias após início ou ajuste, 6 semanas (devido à autoindução microssomal hepática em cães) e a cada 6 meses com hemograma e perfil bioquímico hepático completo.',
      ],
    },
    plumbsContext:
      'Fenobarbital é o fármaco anticonvulsivante de primeira linha recomendado pelo ACVIM para cães e gatos. Atua potencializando a transmissão inibitória gabaérgica. Em cães, induz as próprias enzimas microssomais hepáticas (CYP450), o que encurta sua meia-vida nas primeiras 6 semanas de tratamento, exigindo monitoramento e eventual reajuste de dose. Gardenal® humano em comprimidos sulcados (50 mg e 100 mg) é historicamente uma das formulações mais utilizadas e acessíveis na rotina clínica veterinária.',
    clinicalUse:
      'Tratamento e controle de manutenção da epilepsia idiopática e crises estruturais em cães e gatos. Droga de primeira escolha para monoterapia crônica e adjuvante em casos refratários.',
    reassessment:
      'Dosagem da concentração sérica de fenobarbital (alvo terapêutico: 15 a 35 µg/mL) realizada após 10 a 14 dias do início ou de mudança de dose, repetida em aproximadamente 6 semanas (avaliação de autoindução em cães) e posteriormente a cada 6 meses com hemograma, ALT, FA, albumina e ácidos biliares.',
    prescriptionExample:
      'GARDENAL® 100 mg — caixa com 20 comprimidos sulcados. Administrar via oral ___ comprimido(s) a cada 12 horas, em horários rigorosamente fixos, de uso contínuo. Não suspender nem alterar a dosagem sem expressa orientação veterinária.',
    safetyAlert:
      'MEDICAMENTO CONTROLADO (Portaria 344/98 — Lista C1 / Receita de Controle Especial em duas vias). Contraindicado em hepatopatia avançada ou disfunção hepática prévia grave. Pode causar sedação, ataxia, polifagia, poliúria e polidipsia nas primeiras 2 a 4 semanas. Risco grave de crises em salva ou status epilepticus se interrompido abruptamente.',
    price: {
      averageLabel: 'R$ 12,50',
      rangeLabel:
        'Caixa 20 cp (100 mg): R$ 11,51 a R$ 15,20 | Caixa 20 cp (50 mg): R$ 7,50 a R$ 10,80 | Gotas 40 mg/mL: R$ 8,20 a R$ 12,00',
      sourceDate: '2026-09-06',
      notes:
        'Valores pesquisados em redes farmacêuticas humanas (Droga Raia, Drogasil, Ultrafarma, Pacheco) em 06/09/2026.',
    },
    evidenceLevel:
      'Consenso ACVIM Small Animal Consensus Statement on Seizure Management in Dogs (2016); Plumb\'s Veterinary Drug Handbook 10ª edição.',
    imageUrl:
      'https://sjdigital.vtexassets.com/arquivos/ids/944887/gardenal-100mg-20-comprimidos-1146_1.jpg',
    productPageUrl: 'https://consultaremedios.com.br/gardenal/p',
    labelUrl: 'https://consultaremedios.com.br/gardenal/bula',
    isControlled: true,
    catalogMedicationId: 'editorial:fenobarbital',
  },
  {
    id: 'keppra-250-ucb',
    slug: 'keppra-ucb',
    name: 'Keppra®',
    manufacturer: 'UCB Biopharma',
    commercialClass: 'neurologic',
    commercialSubclass: 'neuro_anticonvulsant',
    commercialSubclasses: ['neuro_anticonvulsant'],
    species: ['dog', 'cat'],
    presentations: [
      'Keppra® 250 mg — caixa com 30 comprimidos revestidos sulcados',
      'Keppra® 750 mg — caixa com 30 comprimidos revestidos sulcados',
      'Keppra® XR 500 mg — caixa com 60 comprimidos de liberação prolongada (não partir/triturar)',
      'Keppra® Solução Oral 100 mg/mL — frasco com 150 mL + seringa dosadora',
    ],
    activeComponents: [
      'levetiracetam 250 mg',
      'levetiracetam 750 mg',
      'levetiracetam 500 mg',
      'levetiracetam 100 mg/mL',
    ],
    searchAliases: ['keppra', 'levetiracetam', 'ucb', 'keppra xr'],
    labelCompositionSummary:
      'Keppra® 250 mg e 750 mg: comprimidos revestidos sulcados contendo 250 mg ou 750 mg de levetiracetam. Keppra® XR 500 mg: comprimidos de liberação prolongada com 500 mg de levetiracetam (engolir inteiro, não mastigar/partir). Keppra® Solução Oral: cada 1 mL contém 100 mg de levetiracetam acompanhado de seringa graduada.',
    labelDirections:
      'Bula humana: 500 mg VO BID, até 1500 mg BID. Doses veterinárias (Plumb\'s 10ª ed.): Cães: 20 a 30 mg/kg VO a cada 8 horas (ou formulação XR: 30 a 60 mg/kg VO a cada 12 horas). Gatos: 20 a 40 mg/kg VO a cada 8 horas (ou XR: 500 mg/gato VO q24h; FARS: 20 a 25 mg/kg VO q8h). Pulse therapy em crises em salva: 30–60 mg/kg dose de ataque, depois 30 mg/kg q8h por 24 a 72 horas.',
    dosageGuidance: {
      labelDose:
        'Bula humana: 500 mg VO BID a 1500 mg BID. Doses veterinárias segundo Plumb\'s 10ª ed.: Cães 20–30 mg/kg VO q8h (XR: 30–60 mg/kg q12h); Gatos 20–40 mg/kg VO q8h.',
      plumbs: {
        dog: [
          {
            title: 'Epilepsia crônica / Terapia adjuvante ou monoterapia (Plumb\'s 10ª ed.)',
            dose: '20 a 30 mg/kg VO a cada 8 horas',
            note: 'Duração: Uso contínuo (vitalício na epilepsia refratária). Pode ser titulado até 40–60 mg/kg q8h conforme necessidade. Meia-vida curta em cães (~3–4h), exigindo rigoroso intervalo q8h para a apresentação convencional.',
          },
          {
            title: 'Comprimidos de Liberação Prolongada (Keppra® XR)',
            dose: '30 a 60 mg/kg VO a cada 12 horas',
            note: 'Duração: Uso contínuo. ATENÇÃO: Os comprimidos XR devem ser deglutidos inteiros; NÃO partir, triturar nem mastigar, pois isso destrói a matriz de liberação prolongada.',
          },
          {
            title: 'Terapia pulsada (Pulse Therapy para crises em cluster / salva)',
            dose: '30 a 60 mg/kg VO ou IV inicial, seguido de 30 mg/kg a cada 8 horas',
            note: 'Duração: Manter por 24 a 72 horas após a última crise do cluster, descontinuando em seguida ou retornando à dose basal.',
          },
          {
            title: 'Prevenção pericirúrgica em Shunt Portossistêmico (PSS)',
            dose: '20 a 30 mg/kg VO a cada 8 horas',
            note: 'Duração: Iniciar 24 horas a 7 dias antes do procedimento cirúrgico e manter por 2 a 4 semanas no pós-operatório.',
          },
        ],
        cat: [
          {
            title: 'Epilepsia felina crônica / Adjuvante ou monoterapia (Plumb\'s 10ª ed.)',
            dose: '20 a 40 mg/kg VO a cada 8 horas',
            note: 'Duração: Uso contínuo / vitalício na epilepsia crônica. Não sofre metabolismo hepático significativo (excreção predominantemente renal), sendo excepcionalmente seguro para gatos com hepatopatia.',
          },
          {
            title: 'Síndrome de Crises Audiogênicas Reflexas Felinas (FARS)',
            dose: '20 a 25 mg/kg VO a cada 8 horas',
            note: 'Duração: Uso contínuo enquanto persistir suscetibilidade clínica aos estímulos sonoros de alta frequência.',
          },
          {
            title: 'Liberação Prolongada em felinos (Keppra® XR)',
            dose: '500 mg por gato dose fixa VO a cada 24 horas',
            note: 'Duração: Uso contínuo. Indicado apenas para gatos que aceitam o comprimido de 500 mg inteiro sem mastigação.',
          },
        ],
      },
      notes: [
        'Durações clínicas: Vitalício para epilepsia crônica refratária; 24 a 72 horas para pulse therapy de crises em cluster; 2 a 4 semanas pericirúrgico em shunt portossistêmico; mínimo de 6 meses sem crises antes de desmame gradual em crises secundárias corrigidas.',
        'Efeito de tolerância («lua de mel»): Cerca de 40% a 60% dos cães podem apresentar perda gradual de eficácia após 4 a 8 meses, exigindo incremento de dose ou rotação para outro fármaco adjuvante.',
      ],
    },
    plumbsContext:
      'O levetiracetam liga-se especificamente à proteína da vesícula sináptica SV2A, inibindo a exocitose de neurotransmissores excitatórios pré-sinápticos sem alterar os canais de sódio voltagem-dependentes ou a neurotransmissão GABAérgica direta. Possui amplo índice terapêutico e ausência de toxicidade hepática, sendo o fármaco adjuvante de escolha em pacientes com hepatopatia, shunt portossistêmico ou intolerância a outros anticonvulsivantes.',
    clinicalUse:
      'Adjuvante de primeira linha na epilepsia refratária canina e felina; monoterapia de escolha em pacientes com doença hepática ou shunt portossistêmico; controle agudo de crises em salva (pulse therapy); e tratamento de escolha na síndrome de crises reflexas audiogênicas felinas (FARS).',
    reassessment:
      'Monitorar frequência de crises por diário neurológico. Não requer dosagem sérica de rotina na mesma frequência que o fenobarbital, mas creatinina e ureia devem ser checadas em pacientes nefropatas (eliminação primariamente renal). Reavaliar após 4 a 8 meses para verificar possível tolerância crônica.',
    prescriptionExample:
      'KEPPRA® 250 mg — caixa com 30 comprimidos revestidos sulcados. Administrar via oral ___ comprimido(s) a cada 8 horas, continuamente, em horários rigorosamente controlados. Não interromper sem prévia orientação veterinária.',
    safetyAlert:
      'Medicamento de controle especial no Brasil (Portaria 344/98 — Lista C1 / Receita de Controle Especial em duas vias). Excelente segurança sistêmica, mas exige estrita pontualidade no intervalo de 8 horas para a formulação convencional para evitar crises por escape plasmático. Ajustar dose em insuficiência renal moderada a grave.',
    price: {
      averageLabel: 'R$ 78,00',
      rangeLabel:
        'Keppra 250 mg (30 cp): R$ 69,28 a R$ 87,25 | Keppra 750 mg (30 cp): R$ 180,00 a R$ 230,00 | Keppra XR 500 mg (60 cp): R$ 220,00 a R$ 280,00 | Solução oral 100 mg/mL (150 mL): R$ 110,00 a R$ 145,00',
      sourceDate: '2026-09-06',
      notes:
        'Valores pesquisados em redes farmacêuticas (Drogasil, Raia, Ultrafarma, Pacheco) em 06/09/2026.',
    },
    evidenceLevel:
      'Consenso ACVIM Small Animal Consensus Statement on Seizure Management in Dogs (2016); Plumb\'s Veterinary Drug Handbook 10ª edição.',
    imageUrl: 'https://product-data.raiadrogasil.io/images/14981920.webp',
    productPageUrl: 'https://consultaremedios.com.br/keppra/p',
    labelUrl: 'https://consultaremedios.com.br/keppra/bula',
    isControlled: true,
    catalogMedicationId: 'editorial:levetiracetam',
  },
  {
    id: 'levetiracetam-500-ems',
    slug: 'levetiracetam-generico',
    name: 'Levetiracetam (Genérico)',
    manufacturer: 'EMS / Eurofarma / Neo Química / Genéricos',
    commercialClass: 'neurologic',
    commercialSubclass: 'neuro_anticonvulsant',
    commercialSubclasses: ['neuro_anticonvulsant'],
    species: ['dog', 'cat'],
    presentations: [
      'Levetiracetam 250 mg — caixa com 30 comprimidos revestidos sulcados',
      'Levetiracetam 500 mg — caixa com 30 comprimidos revestidos sulcados',
      'Levetiracetam 750 mg — caixa com 30 comprimidos revestidos sulcados',
      'Levetiracetam 1000 mg — caixa com 30 comprimidos revestidos sulcados',
      'Levetiracetam Solução Oral 100 mg/mL — frasco com 100 mL ou 150 mL com seringa dosadora',
    ],
    activeComponents: [
      'levetiracetam 250 mg',
      'levetiracetam 500 mg',
      'levetiracetam 750 mg',
      'levetiracetam 1000 mg',
      'levetiracetam 100 mg/mL',
    ],
    searchAliases: ['levetiracetam', 'generico', 'ems', 'eurofarma', 'neo quimica'],
    labelCompositionSummary:
      'Levetiracetam genérico registrado pela Anvisa: comprimidos revestidos sulcados de 250 mg, 500 mg, 750 mg e 1000 mg; solução oral 100 mg/mL. Medicamento bioequivalente intercambiável de farmácia humana.',
    labelDirections:
      'Bula genérica humana: 500 mg VO a cada 12 horas, ajustável até 1500 mg BID. Doses veterinárias (Plumb\'s 10ª ed.): Cães: 20 a 30 mg/kg VO a cada 8 horas. Gatos: 20 a 40 mg/kg VO a cada 8 horas (FARS: 20 a 25 mg/kg q8h). Em crises em salva (pulse therapy): dose inicial 30 a 60 mg/kg, seguida de 30 mg/kg q8h por 24 a 72h.',
    dosageGuidance: {
      labelDose:
        'Bula genérica humana: 500 mg VO BID a 1500 mg BID. Doses veterinárias segundo Plumb\'s 10ª ed.: Cães 20–30 mg/kg VO q8h; Gatos 20–40 mg/kg VO q8h.',
      plumbs: {
        dog: [
          {
            title: 'Epilepsia crônica / Terapia adjuvante ou monoterapia (Plumb\'s 10ª ed.)',
            dose: '20 a 30 mg/kg VO a cada 8 horas',
            note: 'Duração: Uso contínuo (vitalício na epilepsia refratária). Pode ser titulado até 40–60 mg/kg q8h conforme necessidade. Meia-vida curta em cães (~3–4h), exigindo rigoroso intervalo q8h para a apresentação convencional.',
          },
          {
            title: 'Terapia pulsada (Pulse Therapy para crises em cluster / salva)',
            dose: '30 a 60 mg/kg VO ou IV inicial, seguido de 30 mg/kg a cada 8 horas',
            note: 'Duração: Manter por 24 a 72 horas após a última crise do cluster, descontinuando em seguida ou retornando à dose basal.',
          },
          {
            title: 'Prevenção pericirúrgica em Shunt Portossistêmico (PSS)',
            dose: '20 a 30 mg/kg VO a cada 8 horas',
            note: 'Duração: Iniciar 24 horas a 7 dias antes do procedimento cirúrgico e manter por 2 a 4 semanas no pós-operatório.',
          },
        ],
        cat: [
          {
            title: 'Epilepsia felina crônica / Adjuvante ou monoterapia (Plumb\'s 10ª ed.)',
            dose: '20 a 40 mg/kg VO a cada 8 horas',
            note: 'Duração: Uso contínuo / vitalício na epilepsia crônica. Não sofre metabolismo hepático significativo (excreção predominantemente renal), sendo excepcionalmente seguro para gatos com hepatopatia.',
          },
          {
            title: 'Síndrome de Crises Audiogênicas Reflexas Felinas (FARS)',
            dose: '20 a 25 mg/kg VO a cada 8 horas',
            note: 'Duração: Uso contínuo enquanto persistir suscetibilidade clínica aos estímulos sonoros de alta frequência.',
          },
        ],
      },
      notes: [
        'Durações clínicas: Vitalício para epilepsia crônica refratária; 24 a 72 horas para pulse therapy de crises em cluster; 2 a 4 semanas pericirúrgico em shunt portossistêmico; mínimo de 6 meses sem crises antes de desmame gradual em crises secundárias corrigidas.',
        'Efeito de tolerância («lua de mel»): Cerca de 40% a 60% dos cães podem apresentar perda gradual de eficácia após 4 a 8 meses, exigindo incremento de dose ou rotação para outro fármaco adjuvante.',
      ],
    },
    plumbsContext:
      'Bioequivalente ao medicamento de referência (Keppra®), o levetiracetam genérico oferece opção de alta acessibilidade com os mesmos parâmetros de dosagem, tolerabilidade e segurança preconizados pelo Plumb\'s 10ª ed. e ACVIM.',
    clinicalUse:
      'Opção de excelente custo-benefício para anticonvulsivante adjuvante em cães e gatos, monoterapia em nefropatas/hepatopatas, pulse therapy em crises em cluster e manejo de FARS em felinos.',
    reassessment:
      'Acompanhamento do diário de crises e função renal. Reavaliação de dosagem a cada 4–8 meses caso surja perda parcial de resposta clínica por tolerância farmacodinâmica.',
    prescriptionExample:
      'LEVETIRACETAM (Genérico) 500 mg — caixa com 30 comprimidos revestidos sulcados. Administrar via oral ___ comprimido(s) a cada 8 horas, pontualmente, continuamente.',
    safetyAlert:
      'MEDICAMENTO CONTROLADO (Portaria 344/98 — Lista C1 / Receita de Controle Especial em duas vias). Manter estrita adesão ao intervalo de 8 horas. Ajustar posologia na doença renal crônica.',
    price: {
      averageLabel: 'R$ 78,00',
      rangeLabel:
        '250 mg (30 cp): R$ 42,00 a R$ 65,00 | 500 mg (30 cp): R$ 78,00 a R$ 108,00 | 750 mg (30 cp): R$ 115,00 a R$ 155,00 | Solução oral 100 mg/mL (100 mL): R$ 65,00 a R$ 92,00',
      sourceDate: '2026-09-06',
      notes:
        'Pesquisa realizada em redes farmacêuticas (Drogasil, Raia, Ultrafarma, Pacheco, Qualidoc) em 06/09/2026.',
    },
    evidenceLevel:
      'Consenso ACVIM Small Animal Consensus Statement on Seizure Management in Dogs (2016); Plumb\'s Veterinary Drug Handbook 10ª edição.',
    imageUrl:
      'https://qualidoc-plataforma.s3.us-east-2.amazonaws.com/attachments/9cacbd08-35da-482d-b67e-a1098ad8f50c.jpeg',
    productPageUrl: 'https://consultaremedios.com.br/levetiracetam/p',
    labelUrl: 'https://consultaremedios.com.br/levetiracetam-ems/bula',
    isControlled: true,
    catalogMedicationId: 'editorial:levetiracetam',
  },
];
