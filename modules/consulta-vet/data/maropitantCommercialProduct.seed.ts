import type { CommercialMedicationProduct } from '../types/commercialMedication';

const MAROPITANT_PRICE_SOURCE_DATE = '2026-11-13';

const MAROPITANT_CONTEXT =
  'Antagonista seletivo dos receptores de neurocinina-1 (NK₁) que impede a ação da substância P no complexo vagal dorsal (núcleo do trato solitário e área postrema) e em vias aferentes periféricas. Controla êmese de múltiplos gatilhos (gastroenterites, pancreatite, quimioterapia, opioides, cinetose e uremia), mas não é procinético nem orexígeno, não substitui analgesia convencional e não resolve isoladamente a náusea residual em todos os cenários.';

const MAROPITANT_SAFETY_ALERT =
  'ALERTAS CRÍTICOS DE SEGURANÇA E ADMINISTRAÇÃO: 1) VÔMITO CONTROLADO NÃO EXCLUI ABDOME CIRÚRGICO: o bloqueio NK₁ pode suprimir a êmese mesmo na obstrução mecânica ou perfuração GI, atrasando o diagnóstico; não administrar antes de decidir indução de êmese por toxina recente. 2) DOR À INJEÇÃO SC: formulações com SBECD + metacresol dissociam o complexo acima de 20 °C; a aplicação refrigerada (2–8 °C) reduz a dor quando compatível com a bula do produto. 3) VIA IV E REGISTRO: a bula FDA aprova 1 mg/kg IV lenta (1–2 min) para cães e gatos ≥4 meses, mas a aprovação brasileira varia por marca e bula (Cerenia® BR descreve SC em cães; Marovet® indica SC em cães). Monitorar PA sob anestesia/acepromazina. 4) INCOMPATIBILIDADE FÍSICA: precipita com pantoprazol na mesma linha IV; não misturar na mesma seringa. 5) HEPATOPATIA E CARDIOPATIA: depuração hepática predominante (individualizar sem corte automático fixo de -50%); cautela com bloqueadores de canais de Ca²⁺ (advertência europeia) e fármacos que prolongam QT.';

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
      'Cerenia® 10 mg/mL solução injetável estéril — frasco-ampola multidose de 20 mL (expresso em equivalentes de maropitant ativo)',
    ],
    activeComponents: [
      'citrato de maropitant monoidratado equivalente a 10 mg/mL de maropitant ativo',
      'sulfobutiléter-beta-ciclodextrina (SBECD) 63 mg/mL',
      'metacresol 3,3 mg/mL (conservante)',
    ],
    searchAliases: [
      'cerenia',
      'cerenia injetavel',
      'maropitant',
      'maropitante',
      'antiemetico zoetis',
      'nk1',
      'substancia p',
      'antiemetico felino',
      'antiemetico cao',
    ],
    labelCompositionSummary:
      'Cada 1 mL contém citrato de maropitant equivalente a 10 mg de maropitant base ativo (não converter novamente a dose pelo peso do sal), 63 mg de sulfobutiléter-beta-ciclodextrina (SBECD) e 3,3 mg de metacresol.',
    labelDirections:
      'Brasil (página técnica Zoetis Brasil): indicado para prevenção e tratamento de vômito agudo em cães por via subcutânea (1 mg/kg = 0,1 mL/kg q24h; referência técnica brasileira cita até 56 dias após primeira punção). Bula FDA (EUA): aprovado para cães ≥2 meses (SC) e ≥4 meses (SC ou IV em 1–2 min) e para tratamento de vômito em gatos ≥4 meses (1 mg/kg SC ou IV em 1–2 min q24h, até 5 dias; nos EUA, após punção conservar a 2–8 °C por até 90 dias, máx. 25 perfurações).',
    dosageGuidance: {
      labelDose:
        'Cães (BR/FDA): 1 mg/kg (0,1 mL/kg) SC q24h até 5 dias (IV lenta em 1–2 min conforme registro FDA). Gatos (FDA ≥4 meses / extrabula conforme registro nacional): 1 mg/kg SC ou IV lenta q24h até 5 dias.',
      plumbs: {
        dog: [
          {
            title: 'Tratamento e Prevenção de Vômitos Agudos em Cães',
            dose: '1 mg/kg (0,1 mL/kg) SC ou IV lenta (1–2 min) q24h por até 5 dias consecutivos',
            note: 'A página brasileira consultada descreve via SC em cães; a via IV lenta (≥4 meses) consta na bula FDA.',
          },
          {
            title: 'Prevenção de Êmese Induzida por Quimioterápicos ou Opioides',
            dose: '1 mg/kg SC ou IV lenta (1–2 min) 45–60 min antes do estímulo emético (bula FDA ≥4 meses)',
            note: 'Administração simultânea com opioides (ex.: hidromorfona/morfina) reduz drasticamente a eficácia preventiva.',
          },
        ],
        cat: [
          {
            title: 'Tratamento de Vômito em Gatos ≥4 meses (Bula FDA; uso extrabula se fora de registro nacional)',
            dose: '1 mg/kg (0,1 mL/kg) SC ou IV lenta (1–2 min) q24h por até 5 dias',
            note: 'Reação dolorosa à aplicação SC ocorre em ~33,9% dos gatos; aplicar o produto refrigerado reduz o desconforto.',
          },
        ],
      },
      notes: [
        'Regra prática: 0,1 mL/kg da solução 10 mg/mL (não aplicar o regime oral de 2 ou 8 mg/kg por via injetável).',
        'Não confundir prazos pós-abertura: 56 dias (referência BR Cerenia) vs 90 dias a 2–8 °C (bula FDA) vs 60 dias a 15–30 °C (Marovet).',
        'Nunca administrar na mesma linha IV com pantoprazol (risco de precipitação).',
      ],
    },
    plumbsContext: MAROPITANT_CONTEXT,
    clinicalUse:
      'Antiemético parenteral de amplo espectro para cães (vômito agudo, parvovirose, pancreatite, uremia, quimioterapia e pré-anestesia) e gatos (bula FDA / suporte hospitalar conforme registro local).',
    reassessment:
      'Reavaliar hidratação, cessação de vômitos e presença de dor abdominal ou obstrução em 24–48 h. Se persistir sialorreia/lambedura labial (náusea sem êmese), considerar associação de ondansetrona.',
    prescriptionExample:
      'Cerenia® 10 mg/mL injetável — Para canino de 10 kg com vômito agudo: administrar 1,0 mL (10 mg = 1 mg/kg) por via SC, q24h, por até 5 dias conforme evolução clínica.',
    safetyAlert: MAROPITANT_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 335,00',
      rangeLabel: 'Frasco 20 mL: R$ 290,00 a R$ 380,00',
      sourceDate: MAROPITANT_PRICE_SOURCE_DATE,
      notes: 'Prescrição veterinária simples no Brasil (sem retenção de receita).',
    },
    evidenceLevel:
      'Alta para controle do vômito agudo em cães e gatos (ensaios controlados e metanálise felina 2026); atenção às diferenças de registro entre Brasil e FDA.',
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
      'citrato de maropitant monoidratado equivalente a 16 mg, 24 mg, 60 mg ou 160 mg por comprimido',
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
      'Comprimidos ranhurados contendo 16 mg, 24 mg, 60 mg ou 160 mg de maropitant ativo em blisters aluminizados protetores de umidade (4 comprimidos por blister).',
    labelDirections:
      'Bula Zoetis Brasil (Cães): Vômito agudo (cães ≥2 meses): mínimo de 2 mg/kg VO q24h (até 5 dias em cães de 2–7 meses; até cessar o vômito em >7 meses). Cinetose / enjoo de viagem (cães ≥4 meses): mínimo de 8 mg/kg VO q24h por até 2 dias consecutivos, administrado ~2 h antes da viagem com pequena porção de alimento (evitar refeição completa antes de viajar). Gatos: uso oral extrabula no Brasil.',
    dosageGuidance: {
      labelDose:
        'Cães (bula BR/FDA): vômito agudo ≥2 mg/kg VO q24h; cinetose ≥8 mg/kg VO q24h (máx. 2 dias). Gatos (extrabula): 1 mg/kg VO q24h (formulários) ou 4 mg/gato VO q24h × 14d (ensaio DRC IRIS 2–3).',
      plumbs: {
        dog: [
          {
            title: 'Prevenção e Tratamento Oral de Vômitos Agudos em Cães (Bula)',
            dose: 'Mínimo de 2 mg/kg VO a cada 24 horas',
            note: 'Biodisponibilidade oral canina de ~24% a 2 mg/kg devido ao metabolismo de primeira passagem. Não arredondar abaixo da dose mínima.',
          },
          {
            title: 'Prevenção de Cinetose / Enjoo de Movimento em Cães (Bula)',
            dose: 'Mínimo de 8 mg/kg VO q24h (~2 horas antes da viagem), por até 2 dias consecutivos',
            note: 'Farmacocinética não linear eleva biodisponibilidade oral para ~37% a 8 mg/kg. Não controla ansiedade ou medo de viagem.',
          },
        ],
        cat: [
          {
            title: 'Vômito em Gatos — Uso Oral Extrabula (Formulários / DRC IRIS 2–3)',
            dose: '1 mg/kg VO q24h (formulários/prevenção pré-operatória) ou 4 mg fixos/gato VO q24h × 14 dias (DRC IRIS 2–3, Quimby et al. 2015)',
            note: 'O comprimido é registrado apenas para cães; em gatos, respeitar a dose fixa de 4 mg/gato no protocolo de DRC e não extrapolar como estimulante de apetite.',
          },
        ],
      },
      notes: [
        'Não presumir divisão segura em 1/4 ou 1/8 fora da ranhura prevista em bula; metade de comprimido retirada do blister deve ser envolvida em alumínio e usada segundo estabilidade (48 h descrita).',
        'Não envolver firmemente em massa densa de petisco que impeça a desagregação gástrica.',
        'Em cão de 5 kg (alvo 10 mg), 1 comprimido de 16 mg fornece 3,2 mg/kg dentro da faixa de bula (não arredondar para baixo).',
      ],
    },
    plumbsContext: MAROPITANT_CONTEXT,
    clinicalUse:
      'Manutenção oral pós-estabilização parenteral do vômito agudo e profilaxia da cinetose em cães. Uso oral extrabula em gatos sob prescrição individualizada.',
    reassessment:
      'No vômito agudo, reavaliar se persistir além de 48 horas ou houver prostração/dor abdominal. Em viagens, distinguir cinetose vestibular de ansiedade comportamental.',
    prescriptionExample:
      'Cerenia® 24 mg comprimidos — Para cão de 10 kg com vômito agudo estabilizado: 1 comprimido (24 mg = 2,4 mg/kg) VO a cada 24 horas, com pequena porção de alimento, por 3 dias.',
    safetyAlert: MAROPITANT_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 141,00',
      rangeLabel:
        '16 mg: R$ 115,00 a R$ 135,00 | 24 mg: R$ 130,00 a R$ 155,00 | 60 mg: R$ 165,00 a R$ 195,00 | 160 mg: R$ 250,00 a R$ 295,00',
      sourceDate: MAROPITANT_PRICE_SOURCE_DATE,
      notes: 'Blisters com 4 comprimidos ranhurados protegidos de umidade. Prescrição simples.',
    },
    evidenceLevel:
      'Alta para êmese aguda e cinetose em cães (bula e ensaios clínicos); moderada/extrabula para uso oral contínuo em DRC felina IRIS 2–3.',
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
    species: ['dog'],
    presentations: [
      'Marovet® 10 mg/mL solução injetável — frasco-ampola de vidro âmbar com 20 mL',
    ],
    activeComponents: [
      'citrato de maropitant equivalente a 10 mg/mL de maropitant ativo',
    ],
    searchAliases: [
      'marovet',
      'marovet botupharma',
      'maropitant botupharma',
      'maropitant generico',
      'antiemetico marovet',
    ],
    labelCompositionSummary:
      'Cada 1 mL contém citrato de maropitant equivalente a 10 mg de maropitant ativo em frasco-ampola âmbar de 20 mL.',
    labelDirections:
      'Bula Botupharma (Brasil): indicado para cães por via subcutânea (SC) na dose de 1 mg/kg (0,1 mL/kg) q24h. Conservar em temperatura ambiente (15–30 °C), protegido da luz, e utilizar em até 60 dias após a abertura.',
    dosageGuidance: {
      labelDose:
        'Cães (bula Botupharma): 1 mg/kg (0,1 mL/kg) por via subcutânea (SC) a cada 24 horas.',
      plumbs: {
        dog: [
          {
            title: 'Tratamento e Prevenção de Vômito Agudo em Cães (Bula Marovet®)',
            dose: '1 mg/kg (0,1 mL/kg) SC a cada 24 horas',
            note: 'Seguir idade mínima, via (SC) e condições de armazenamento da bula própria (15–30 °C ao abrigo da luz; 60 dias após abertura).',
          },
        ],
      },
      notes: [
        'Prazo pós-abertura de 60 dias em 15–30 °C (não aplicar automaticamente regras de armazenamento ou via IV de formulações estrangeiras).',
        'A utilização por via IV ou em gatos com esta apresentação específica caracteriza uso extrabula no Brasil.',
      ],
    },
    plumbsContext: MAROPITANT_CONTEXT,
    clinicalUse:
      'Apresentação veterinária nacional registrada para prevenção e controle de vômito agudo em cães por via subcutânea.',
    reassessment:
      'Acompanhar hidratação, frequência de vômitos, dor no local de aplicação e sinais de abdome cirúrgico nas primeiras 24–48 h.',
    prescriptionExample:
      'Marovet® 10 mg/mL injetável — Para canino de 5 kg com vômito agudo: administrar 0,5 mL (5 mg = 1 mg/kg) por via subcutânea (SC), a cada 24 horas, conforme evolução clínica.',
    safetyAlert: MAROPITANT_SAFETY_ALERT,
    price: {
      averageLabel: 'R$ 275,00',
      rangeLabel: 'Frasco 20 mL: R$ 240,00 a R$ 310,00',
      sourceDate: MAROPITANT_PRICE_SOURCE_DATE,
      notes: 'Produto veterinário nacional sob prescrição simples. Uso em até 60 dias após abertura.',
    },
    evidenceLevel:
      'Alta para antiemese canina por via SC com o princípio ativo; seguir estritamente as restrições da bula nacional do produto.',
    isControlled: false,
    catalogMedicationId: 'editorial:maropitant',
  },
];
