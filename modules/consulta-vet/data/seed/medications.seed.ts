import { MedicationRecord } from '../../types/medication';

export const medicationsSeed: MedicationRecord[] = [
  {
    id: 'med-1',
    slug: 'miltefosina',
    title: 'Miltefosina',
    activeIngredient: 'Miltefosina',
    tradeNames: ['Milteforan'],
    pharmacologicClass: 'Leishmanicida',
    species: ['Cão'],
    category: 'infecciosas',
    tags: ['Leishmaniose', 'Oral', 'Controlado'],
    mechanismOfAction: 'A miltefosina é um análogo de fosfolipídeo que atua na membrana celular do parasita (Leishmania spp.), inibindo a biossíntese de fosfolipídeos e esfingolipídeos, além de interferir na sinalização celular, levando à apoptose do parasita.',
    indications: [
      'Tratamento da Leishmaniose Visceral Canina (LVC).',
    ],
    contraindications: [
      'Fêmeas gestantes ou lactantes (potencial teratogênico).',
      'Cães com hipersensibilidade conhecida ao princípio ativo.',
      'Uso em gatos (não aprovado, segurança não estabelecida).',
    ],
    cautions: [
      'Uso exclusivo veterinário. Manipular com luvas (risco para humanos, especialmente gestantes).',
      'Pode causar distúrbios gastrointestinais (vômito, diarreia). Administrar junto com o alimento para minimizar.',
      'Monitorar função renal e hepática durante o tratamento.',
    ],
    adverseEffects: [
      'Vômito e diarreia (mais comuns, geralmente transitórios).',
      'Letargia e anorexia.',
      'Elevação transitória de enzimas hepáticas.',
    ],
    doses: [
      {
        id: 'dose-milte-1',
        species: 'dog',
        indication: 'Leishmaniose Visceral Canina',
        doseMin: 2,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'SID (a cada 24h) por 28 dias.',
        calculatorEnabled: true,
      }
    ],
    presentations: [
      {
        id: 'pres-milte-1',
        label: 'Milteforan Solução Oral 20 mg/mL',
        form: 'Solução Oral',
        concentrationValue: 20,
        concentrationUnit: 'mg/mL',
      }
    ],
    adminNotesRichText: '<p>A miltefosina deve ser administrada <strong>sempre junto com o alimento</strong> (misturada na ração ou em um petisco) para reduzir a incidência de vômitos. O tratamento padrão dura 28 dias ininterruptos. No Brasil, é frequentemente associada ao Alopurinol (leishmaniostático) para melhor controle clínico e redução da carga parasitária.</p>',
    relatedDiseaseSlugs: ['leishmaniose-visceral-canina'],
    isDemonstrative: true,
    warningLabel: 'Demonstração',
  },
  {
    id: 'med-2',
    slug: 'alopurinol',
    title: 'Alopurinol',
    activeIngredient: 'Alopurinol',
    tradeNames: ['Zyloric', 'Genéricos'],
    pharmacologicClass: 'Leishmaniostático / Inibidor da Xantina Oxidase',
    species: ['Cão', 'Gato'],
    category: 'infecciosas',
    tags: ['Leishmaniose', 'Uratíase', 'Oral'],
    mechanismOfAction: 'Inibe a enzima xantina oxidase, responsável pela conversão de hipoxantina em xantina e de xantina em ácido úrico. Na Leishmania, atua como um análogo de purina, sendo incorporado ao RNA do parasita e inibindo sua síntese proteica (ação leishmaniostática).',
    indications: [
      'Tratamento adjuvante (leishmaniostático) da Leishmaniose Visceral Canina.',
      'Prevenção de urólitos de urato (ex: em Dálmatas ou cães com shunt portossistêmico).',
    ],
    contraindications: [
      'Cães com histórico de hipersensibilidade ao fármaco.',
      'Uso cauteloso em pacientes com insuficiência renal grave (ajuste de dose pode ser necessário).',
    ],
    cautions: [
      'O uso prolongado na LVC predispõe à formação de urólitos de xantina (xantinúria). Monitorar com urinálise e ultrassonografia.',
      'Pode causar reações cutâneas (erupções, prurido).',
    ],
    adverseEffects: [
      'Xantinúria e formação de cálculos de xantina (especialmente em cães tratados para LVC sem dieta restrita em purinas).',
      'Distúrbios gastrointestinais (vômito, diarreia).',
      'Reações de hipersensibilidade cutânea.',
    ],
    doses: [
      {
        id: 'dose-alo-1',
        species: 'dog',
        indication: 'Leishmaniose Visceral Canina',
        doseMin: 10,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'BID (a cada 12h) por tempo indeterminado (meses a anos).',
        calculatorEnabled: true,
      },
      {
        id: 'dose-alo-2',
        species: 'dog',
        indication: 'Prevenção de urólitos de urato',
        doseMin: 15,
        doseMax: 15,
        doseUnit: 'mg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'BID (a cada 12h).',
        calculatorEnabled: true,
      }
    ],
    presentations: [
      {
        id: 'pres-alo-1',
        label: 'Comprimido 100 mg',
        form: 'Comprimido',
        scoringInfo: 'Sulcado',
      },
      {
        id: 'pres-alo-2',
        label: 'Comprimido 300 mg',
        form: 'Comprimido',
        scoringInfo: 'Sulcado',
      }
    ],
    adminNotesRichText: '<p>Para cães em tratamento de LVC com alopurinol, é <strong>fortemente recomendado</strong> o uso de dietas restritas em purinas (dietas renais ou específicas para uratos) e o monitoramento periódico (a cada 3-6 meses) com ultrassonografia abdominal e urinálise para detectar a formação precoce de cálculos de xantina.</p>',
    relatedDiseaseSlugs: ['leishmaniose-visceral-canina'],
    isDemonstrative: true,
    warningLabel: 'Demonstração',
  }
];
