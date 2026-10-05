import type { CommercialMedicationProduct } from '../types/commercialMedication';

const ONDANSETRONA_PRICE_SOURCE_DATE = '2026-10-04';

const ONDANSETRONA_PLUMBS_CONTEXT =
  'Plumb’s Veterinary Drug Handbook 10ª ed., monografia “Ondansetron” (pp. 956–957 / PDF pp. 983–984): antagonista altamente seletivo dos receptores 5-HT₃ que bloqueia a neurotransmissão sensorial emética e nauseogênica tanto em aferentes vagais do trato gastrointestinal quanto no tronco encefálico (área postrema e núcleo do trato solitário). BSAVA Small Animal Formulary 10ª ed. (p. 293), Consenso ISFM 2022 e Consenso iCatCare 2026 destacam sua indicação para náusea moderada a grave, êmese por quimioterapia citotóxica (cisplatina), parvovirose e doença renal crônica felina. Estudos de 2026 comprovaram biodisponibilidade oral canina muito baixa (~5,2%), enquanto a via subcutânea atinge 84,6% no cão, tornando-se a via de escolha na ausência de acesso venoso.';

const ONDANSETRONA_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E ADMINISTRAÇÃO: 1) INFUSÃO INTRAVENOSA SEMPRE LENTA: administrar ao longo de 2 a 5 minutos ininterruptos (~0,1 a 0,25 mg/kg/min). NUNCA administrar em bolus rápido pelo risco de vasodilatação aguda, hipotensão e prolongamento dose-dependente do intervalo QTc. 2) RISCO DE PROLONGAMENTO DO QTc: cautela redobrada em pacientes com hipocalemia, hipomagnesemia, cardiopatias ou sob uso de outros fármacos arritmogênicos (sotalol, amiodarona, metadona, cisaprida, azólicos). 3) IMPREVISIBILIDADE DA VIA ORAL EM CÃES: biodisponibilidade de apenas ~5,2% (Garrick et al. 2026) e níveis indetectáveis em 25% dos cães doentes; priorizar estritamente as vias SC ou IV. 4) NÃO REDUZIR DOSE EM DRC FELINA POR IRIS: depuração é hepática (<5% renal inalterada); o Consenso iCatCare 2026 mantém 0,1 a 1 mg/kg q6–12h sem corte por estágio IRIS. Cautela em hepatopatias severas (clearance reduzido e AUC duplicada). 5) CONTRAINDICAÇÃO COM APOMORFINA: não administrar antes da indução de êmese em intoxicações (anula a apomorfina e há risco de colapso hemodinâmico). 6) INTERAÇÃO COM TRAMADOL: pode reduzir a eficácia analgésica do tramadol por antagonismo de receptores 5-HT3 espinhais.';

export const ondansetronaCommercialProductSeed: CommercialMedicationProduct[] = [
  {
    id: 'nausedron-cristalia-inj-2ml',
    slug: 'nausedron-injetavel-2ml',
    name: 'Nausedron® 2 mg/mL Solução Injetável Frasco-Ampola 2 mL (Cristália)',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos Ltda.',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic'],
    productPageUrl: 'https://www.cristalia.com.br/produto/solucao-injetavel-2-mgml',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ondansetron/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Nausedron® 2 mg/mL solução injetável estéril límpida — frasco-ampola com 2 mL (4 mg de ondansetrona base)',
    ],
    activeComponents: [
      'cloridrato de ondansetrona di-hidratado equivalente a 2 mg/mL de ondansetrona base',
    ],
    searchAliases: [
      'nausedron',
      'nausedron injetavel',
      'ondansetrona',
      'ondansetron',
      'zofran',
      'antiemetico 5-ht3',
      'antinausea',
      'cristalia',
    ],
    labelCompositionSummary:
      'Cada 1 mL de solução injetável contém 2,5 mg de cloridrato de ondansetrona di-hidratado (equivalente a 2,0 mg de ondansetrona base), cloreto de sódio, ácido cítrico monoidratado, citrato de sódio di-hidratado e água para injetáveis q.s.p. 1 mL. Frasco-ampola contendo 2 mL (4 mg de ondansetrona).',
    labelDirections:
      'Uso veterinário extra-bula (extralabel): Administrar 0,5 mg/kg de peso corporal (equivalente a 0,25 mL/kg da solução 2 mg/mL) por via intravenosa estritamente lenta (ao longo de 2 a 5 minutos) ou por via subcutânea, a cada 8 a 12 horas em cães e gatos. Em quimioterapia emetogênica (cisplatina), administrar 0,3 a 0,5 mg/kg IV lenta 30 a 60 minutos antes da infusão.',
    dosageGuidance: {
      labelDose:
        'Cães e gatos: 0,5 mg/kg IV lenta (2–5 min) ou SC a cada 8 a 12 horas (0,25 mL/kg q8–12h). Na quimioterapia: 0,3 a 0,5 mg/kg IV 30 min antes.',
      plumbs: {
        dog: [
          {
            title: 'Náusea e Vômito em Cães Hospitalizados (Sotelo et al. 2022 / Plumb’s 10ª ed.)',
            dose: '0,5 mg/kg IV lenta (2 a 5 minutos) ou SC a cada 8 horas (0,25 mL/kg q8h)',
            note: 'Em cães, a via SC atinge 84,6% de biodisponibilidade (Landau et al. 2026), sendo muito superior à via oral (F ~5%). Administrar IV sempre lentamente.',
          },
          {
            title: 'Quimioterapia Emetogênica (Cisplatina / Doxorrubicina)',
            dose: '0,3 a 0,5 mg/kg IV lenta dose única 30 a 60 minutos antes da quimioterapia',
            note: 'Kenward et al. (2017) comprovaram eliminação de 100% dos vômitos e redução de 90% da náusea aguda.',
          },
          {
            title: 'Síndrome Vestibular Aguda Canina (Henze et al. 2022)',
            dose: '0,5 mg/kg IV lenta em dose única ou q8–12h',
            note: 'Promove melhora clínica da náusea em cerca de 1 hora pós-infusão.',
          },
        ],
        cat: [
          {
            title: 'Náusea e Vômito em Gatos / DRC (Consenso ISFM 2022 / iCatCare 2026)',
            dose: '0,5 mg/kg SC ou IV lenta a cada 8 a 12 horas (faixa: 0,1 a 1 mg/kg q6–12h)',
            note: 'Em felinos, a via SC atinge 75% de biodisponibilidade com absorção prolongada. Não exige corte de dose por estágio IRIS (depuração hepática).',
          },
        ],
      },
      notes: [
        'Cálculo padrão: 0,25 mL para cada 1 kg de peso corporal (para a dose de 0,5 mg/kg).',
        'Injeção IV deve durar de 2 a 5 minutos; nunca fazer bolus rápido.',
        'Compatível com SF 0,9%, SG 5% e Ringer com Lactato.',
        'Incompatível na mesma via com ampicilina, anfotericina B e soluções alcalinas.',
      ],
    },
    plumbsContext: ONDANSETRONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Antiemético e potente antináusea de escolha para controle de náusea severa de origem visceral (pancreatite, gastroenterite, uremia), quimioterapia citotóxica, parvovirose e síndrome vestibular patológica canina. Excelente adjuvante ao maropitant quando o paciente para de vomitar mas mantém aversão alimentar, salivação e náusea.',
    reassessment:
      'Reavaliar escores de náusea (lip licking, ptialismo e postura) e retorno do apetite voluntário em 12 a 24 horas. Corrigir hipocalemia e desidratação.',
    prescriptionExample:
      'Nausedron (ondansetrona 2 mg/mL) solução injetável — Frasco-ampola com 2 mL. Para cão de 8 kg: Administrar 2,0 mL (dose de 0,5 mg/kg = 4,0 mg) por via intravenosa lenta (ao longo de 2 a 5 minutos) ou por via subcutânea, a cada 8 horas, por 3 dias.',
    safetyAlert: ONDANSETRONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 17,00',
      rangeLabel: 'Frasco-ampola 2 mL (4 mg): R$ 12,00 a R$ 22,00',
      sourceDate: ONDANSETRONA_PRICE_SOURCE_DATE,
      notes: 'Medicamento registrado na ANVISA para uso humano. Prescrição veterinária simples.',
    },
    evidenceLevel:
      'Nível 1a — Consensos Internacionais ISFM (2022) e iCatCare (2026); Ensaios clínicos controlados duplo-cegos (Henze 2022, Kenward 2017, Sotelo 2022, Landau 2026); Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:ondansetrona',
  },
  {
    id: 'nausedron-cristalia-inj-4ml',
    slug: 'nausedron-injetavel-4ml',
    name: 'Nausedron® 2 mg/mL Solução Injetável Frasco-Ampola 4 mL (Cristália)',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos Ltda.',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic'],
    productPageUrl: 'https://www.cristalia.com.br/produto/solucao-injetavel-2-mgml',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ondansetron/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Nausedron® 2 mg/mL solução injetável estéril límpida — frasco-ampola com 4 mL (8 mg de ondansetrona base)',
    ],
    activeComponents: [
      'cloridrato de ondansetrona di-hidratado equivalente a 2 mg/mL de ondansetrona base',
    ],
    searchAliases: [
      'nausedron 4ml',
      'nausedron 8mg injetavel',
      'ondansetrona 4ml',
      'ondansetrona cristalia',
    ],
    labelCompositionSummary:
      'Solução injetável contendo 2 mg/mL de ondansetrona base em ampolas com 4 mL (total de 8 mg de princípio ativo).',
    labelDirections:
      'Administrar 0,5 mg/kg (0,25 mL/kg) IV lenta ao longo de 2 a 5 minutos ou SC a cada 8 a 12 horas. Apresentação vantajosa para cães de porte médio a grande (15 a 30 kg).',
    dosageGuidance: {
      labelDose:
        'Cães e gatos: 0,5 mg/kg IV lenta ou SC a cada 8 a 12 horas (0,25 mL/kg q8–12h).',
      plumbs: {
        dog: [
          {
            title: 'Náusea e Vômito em Cães Médios e Grandes (Plumb’s 10ª ed.)',
            dose: '0,5 mg/kg IV lenta ou SC a cada 8 horas (0,25 mL/kg q8h)',
            note: 'Em cão de 16 kg: exatamente 4,0 mL (1 ampola de 4 mL). Administrar IV lenta em 3 minutos.',
          },
        ],
        cat: [
          {
            title: 'Uso Hospitalar Felino (Consenso iCatCare 2026)',
            dose: '0,5 mg/kg SC ou IV lenta a cada 8 a 12 horas',
            note: 'Fracionar a ampola para múltiplos pacientes ou doses com assepsia rigorosa.',
          },
        ],
      },
      notes: [
        'Excelente para cães de 16 a 32 kg.',
        'Infusão IV lenta e monitoramento eletrolítico.',
      ],
    },
    plumbsContext: ONDANSETRONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Apresentação hospitalar de maior volume para cães de porte médio a grande com náusea severa, quimioterapia citotóxica ou parvovirose.',
    reassessment:
      'Avaliar cessação da náusea e tolerância gastrointestinal.',
    prescriptionExample:
      'Nausedron 2 mg/mL solução injetável — Ampola com 4 mL. Para cão de 16 kg: Administrar 4,0 mL (dose de 0,5 mg/kg = 8,0 mg) por via intravenosa lenta (3 minutos) ou por via subcutânea, a cada 8 horas, por 3 dias.',
    safetyAlert: ONDANSETRONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 25,00',
      rangeLabel: 'Ampola 4 mL (8 mg): R$ 18,00 a R$ 32,00',
      sourceDate: ONDANSETRONA_PRICE_SOURCE_DATE,
      notes: 'Prescrição veterinária simples. Registro ANVISA.',
    },
    evidenceLevel:
      'Nível 1a — Consensos Internacionais e ensaios clínicos controlados.',
    isControlled: false,
    catalogMedicationId: 'editorial:ondansetrona',
  },
  {
    id: 'vonau-flash-biolab-comp',
    slug: 'vonau-flash-comprimidos',
    name: 'Vonau Flash® 4 mg e 8 mg Comprimidos Orodispersíveis (Biolab)',
    manufacturer: 'Biolab Sanus Farmacêutica Ltda.',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic'],
    productPageUrl: 'https://www.biolabfarma.com.br/produtos/vonau-flash',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ondansetron/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Vonau Flash® 4 mg — caixa com 10 comprimidos de desintegração oral (orodispersíveis)',
      'Vonau Flash® 8 mg — caixa com 10 comprimidos de desintegração oral (orodispersíveis)',
    ],
    activeComponents: [
      'ondansetrona base 4 mg ou 8 mg por comprimido de desintegração oral',
    ],
    searchAliases: [
      'vonau flash',
      'vonau 4mg',
      'vonau 8mg',
      'ondansetrona orodispersivel',
      'ondansetrona que derrete na boca',
      'vonau gato',
      'vonau cao',
    ],
    labelCompositionSummary:
      'Cada comprimido orodispersível contém 4 mg ou 8 mg de ondansetrona base com tecnologia Flash de dissolução instantânea na mucosa oral em contato com a saliva, sem necessidade de ingestão prévia de água.',
    labelDirections:
      'Uso oral: Em gatos, administrar 0,5 a 1 mg/kg VO a cada 8 a 12 horas (biodisponibilidade felina ~32%). Em cães, a via oral possui biodisponibilidade extremamente baixa (~5,2%, Garrick et al. 2026), recomendando-se doses de 0,5 a 1 mg/kg q8–12h apenas em casos ambulatoriais selecionados, ciente da imprevisibilidade farmacocinética.',
    dosageGuidance: {
      labelDose:
        'Gatos: 0,5 a 1 mg/kg VO q8–12h (F ~32%). Cães: 0,5 a 1 mg/kg VO q8–12h (alerta de baixa absorção canina F ~5%).',
      plumbs: {
        dog: [
          {
            title: 'Uso Ambulatorial Canino com Alerta Farmacocinético (Garrick et al. 2026)',
            dose: '0,5 a 1 mg/kg VO a cada 8 a 12 horas',
            note: 'Alerta crucial: biodisponibilidade oral no cão é de apenas 5,2%. Não confiar em náuseas graves ou quimioterapia.',
          },
        ],
        cat: [
          {
            title: 'Controle de Náusea em Gatos e DRC (ISFM 2022 / iCatCare 2026)',
            dose: '0,5 a 1 mg/kg VO a cada 8 a 12 horas (ex.: 1 comp de 4 mg para gato de 4 a 8 kg)',
            note: 'A tecnologia orodispersível dissolve rapidamente na mucosa bucal, reduzindo o estresse da deglutição.',
          },
        ],
      },
      notes: [
        'Colocar delicadamente sobre a língua ou fundo da bochecha.',
        'Não tentar fracionar em partes desiguais (comprimido orodispersível frágil).',
      ],
    },
    plumbsContext: ONDANSETRONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Tratamento oral ambulatorial da náusea e vômito em gatos (pancreatite crônica, enteropatia crônica, DRC) e alternativa domiciliar em cães.',
    reassessment:
      'Avaliar persistência de salivação e retorno da alimentação em 24 a 48 horas.',
    prescriptionExample:
      'Vonau Flash 4 mg — Caixa com 10 comprimidos orodispersíveis. Para gato de 4 kg com náusea na DRC: Administrar 1 comprimido (4 mg = 1 mg/kg) por via oral, a cada 12 horas, enquanto houver recusa alimentar ou náusea.',
    safetyAlert: ONDANSETRONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 43,50',
      rangeLabel: '4 mg (cx 10): R$ 35,00 a R$ 52,00 | 8 mg (cx 10): R$ 55,00 a R$ 85,00',
      sourceDate: ONDANSETRONA_PRICE_SOURCE_DATE,
      notes: 'Prescrição simples. Registro ANVISA.',
    },
    evidenceLevel:
      'Nível 1a — Consensos Internacionais felinos e dados de biodisponibilidade.',
    isControlled: false,
    catalogMedicationId: 'editorial:ondansetrona',
  },
  {
    id: 'nausedron-cristalia-comp-8mg',
    slug: 'nausedron-comprimidos-8mg',
    name: 'Nausedron® 8 mg Comprimidos Revestidos (Cristália)',
    manufacturer: 'Cristália Produtos Químicos Farmacêuticos Ltda.',
    commercialClass: 'gastrointestinal',
    commercialSubclass: 'gi_antiemetic',
    commercialSubclasses: ['gi_antiemetic'],
    productPageUrl: 'https://www.cristalia.com.br/produto/comprimidos-revestidos-8-mg',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/ondansetron/PNG',
    species: ['dog', 'cat'],
    presentations: [
      'Nausedron® 8 mg — caixa com 10 comprimidos revestidos',
    ],
    activeComponents: [
      'cloridrato de ondansetrona di-hidratado equivalente a 8 mg de ondansetrona base por comprimido',
    ],
    searchAliases: [
      'nausedron comprimido',
      'nausedron 8mg',
      'ondansetrona comprimido 8mg',
    ],
    labelCompositionSummary:
      'Cada comprimido revestido contém 10 mg de cloridrato de ondansetrona di-hidratado (equivalente a 8 mg de ondansetrona base).',
    labelDirections:
      'Administrar por via oral a cada 8 a 12 horas conforme prescrição médico-veterinária.',
    dosageGuidance: {
      labelDose:
        'Cães e gatos: 0,5 a 1 mg/kg VO a cada 8 a 12 horas (com alerta de biodisponibilidade canina de ~5%).',
      plumbs: {
        dog: [
          {
            title: 'Dose Oral Ambulatorial Canina (Plumb’s 10ª ed.)',
            dose: '0,5 a 1 mg/kg VO a cada 8 a 12 horas',
            note: 'Para cão de 16 kg: 1 comprimido de 8 mg (0,5 mg/kg) VO q8–12h.',
          },
        ],
        cat: [
          {
            title: 'Dose Oral Felina (Consenso iCatCare 2026)',
            dose: '0,5 a 1 mg/kg VO a cada 8 a 12 horas',
            note: 'Fracionamento de comprimidos revestidos pode ser amargo; preferir apresentações líquidas ou orodispersíveis.',
          },
        ],
      },
      notes: [
        'Comprimido revestido que protege do amargor.',
      ],
    },
    plumbsContext: ONDANSETRONA_PLUMBS_CONTEXT,
    clinicalUse:
      'Controle oral ambulatorial da náusea e vômitos em cães médios e grandes.',
    reassessment:
      'Reavaliar resposta clínica e apetite em 24 a 48 horas.',
    prescriptionExample:
      'Nausedron 8 mg — Caixa com 10 comprimidos. Para cão de 16 kg: Administrar 1 comprimido por via oral, a cada 12 horas, por 3 a 5 dias.',
    safetyAlert: ONDANSETRONA_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 48,00',
      rangeLabel: 'Caixa com 10 comprimidos de 8 mg: R$ 38,00 a R$ 58,00',
      sourceDate: ONDANSETRONA_PRICE_SOURCE_DATE,
      notes: 'Prescrição simples. Registro ANVISA.',
    },
    evidenceLevel: 'Nível 1b — Literatura farmacológica veterinária e Plumb’s 10ª ed.',
    isControlled: false,
    catalogMedicationId: 'editorial:ondansetrona',
  },
];
