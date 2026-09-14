import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const pronefraNplateCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'pronefra-virbac',
    slug: 'pronefra-virbac',
    name: 'Pronefra® (Suporte Renal)',
    manufacturer: 'Virbac',
    commercialClass: 'renal',
    commercialSubclass: 'renal_ckd_support',
    commercialSubclasses: ['renal_ckd_support', 'nutra_general_support'],
    species: ['cat', 'dog'],
    presentations: [
      'Pronefra suspensão oral palatável — frasco com 60 mL com adaptador e seringa dosadora graduada em kg',
      'Pronefra suspensão oral palatável — frasco com 180 mL com adaptador e seringa dosadora graduada em kg',
    ],
    activeComponents: [
      'carbonato de cálcio',
      'carbonato de magnésio',
      'quitosana (quitosano purificado)',
      'hidrolisado de peixe (oligopeptídeos marinhos)',
      'extrato de Astragalus membranaceus (polissacarídeos)',
    ],
    searchAliases: [
      'pronefra',
      'virbac',
      'suporte renal',
      'quelante de fosforo',
      'quelante renal',
      'quitosana',
      'chitosan',
      'drc felina',
      'drc canina',
      'doença renal cronica',
      'doenca renal cronica',
      'insuficiencia renal',
      'toxinas uremicas',
      'astragalus',
      'carbonato de calcio',
      'carbonato de magnesio',
    ],
    labelCompositionSummary:
      'Suspensão oral palatável à base de triglicerídeos de cadeia média (óleo vegetal). Cada mL fornece carbonato de cálcio e carbonato de magnésio (quelantes entéricos de fósforo que limitam sua absorção intestinal), quitosana/quitosano purificado (adsorvente entérico de toxinas urêmicas como indoxil sulfato e p-cresil sulfato), hidrolisado de peixe (oligopeptídeos bioativos que auxiliam na modulação pressórica e tônus vascular renal) e extrato de Astragalus membranaceus rico em polissacarídeos (suporte à arquitetura e integridade do parênquima nefronal). Suplemento alimentar palatável de alta aceitação para cães e gatos com Doença Renal Crônica.',
    labelDirections:
      'Administrar por via oral duas vezes ao dia (a cada 12 horas), misturado ao alimento úmido/seco ou diretamente na boca logo antes ou após a refeição, utilizando a seringa dosadora graduada em kg: Gatos: 1 mL para cada 4 kg de peso corporal VO a cada 12 horas (BID); Cães: 1 mL para cada 5 kg de peso corporal VO a cada 12 horas (BID). Agitar vigorosamente o frasco antes de cada utilização para ressuspender eventuais sedimentos naturais. Manter sempre água fresca e limpa à disposição.',
    dosageGuidance: {
      labelDose:
        'Gatos: 1 mL / 4 kg VO a cada 12 horas (BID); Cães: 1 mL / 5 kg VO a cada 12 horas (BID), misturado ao alimento ou logo após as refeições.',
      plumbs: {
        cat: [
          {
            title: 'Doença Renal Crônica (DRC estágios IRIS 2 a 4) — Quelante e suporte nefroprotetor',
            dose: '1 mL / 4 kg VO q12h (BID) administrado com o alimento',
            note: 'Dose prática na seringa dosadora graduada em kg felino. Pode ser misturado à dieta renal úmida ou pastosa para favorecer a adesão. Monitorar fósforo sérico e cálcio iônico a cada 4 a 8 semanas.',
          },
        ],
        dog: [
          {
            title: 'Doença Renal Crônica (DRC estágios IRIS 2 a 4) — Quelante e suporte nefroprotetor',
            dose: '1 mL / 5 kg VO q12h (BID) administrado com o alimento',
            note: 'Dose prática na seringa dosadora graduada em kg canino. O carbonato de cálcio e o carbonato de magnésio atuam no lúmen intestinal ligando-se ao fósforo dietético antes da sua absorção sistêmica.',
          },
        ],
      },
      notes: [
        'A administração estritamente associada às refeições é mandatória para máxima eficácia quelante de fósforo.',
        'Em animais com regurgitação ou emese inicial, reduzir temporariamente a dose pela metade durante 3 a 5 dias e readaptar gradualmente.',
        'Não substitui a dieta renal terapêutica, fluidoterapia ou o manejo anti-hipertensivo e antiproteinúrico.',
      ],
    },
    plumbsContext:
      'O Pronefra associa quelantes entéricos clássicos (carbonato de cálcio e magnésio) a adsorventes biológicos de toxinas urêmicas (quitosana) e peptídeos vasoativos. As diretrizes IRIS (International Renal Interest Society) recomendam o controle rigoroso da hiperfosfatemia como pilar para conter a progressão da DRC e o hiperparatireoidismo secundário renal.',
    clinicalUse:
      'Coadjuvante no manejo da Doença Renal Crônica (DRC) em gatos e cães (estágios IRIS 2, 3 e 4). Indicado para redução da hiperfosfatemia alimentar, diminuição da sobrecarga de solutos nitrogenados e toxinas urêmicas circulantes, e suporte vascular e nefronal.',
    reassessment:
      'Reavaliar fósforo sérico, cálcio total e ionizado, produto cálcio x fósforo (Ca x P < 55 mg²/dL²), creatinina, ureia, SDMA e eletrólitos após 4 semanas do início ou ajuste. Em pacientes estáveis, monitorar a cada 2 a 3 meses.',
    prescriptionExample:
      'Pronefra suspensão oral palatável (Virbac) — frasco de 60 mL: Administrar ___ mL por via oral, a cada 12 horas, misturado à refeição ou logo após alimentar o paciente, de forma contínua.',
    safetyAlert:
      'Cautela em pacientes com histórico de hipercalcemia iônica idiopática felina ou nefrocalcinose (devido ao carbonato de cálcio). Evitar associar com outros quelantes cálcicos sem monitoramento do produto Ca x P. Se ocorrer regurgitação ou fezes amolecidas, diminuir a dose pela metade por 3 a 5 dias.',
    price: {
      averageLabel: 'R$ 175,00 (60 mL) / R$ 345,00 (180 mL)',
      rangeLabel: 'Petlove / Cobasi / Petz: R$ 159,00 a R$ 195,00 (60 mL); R$ 310,00 a R$ 389,00 (180 mL)',
      sourceDate: '09/2026',
      notes: 'Suplemento veterinário importado registrado pela Virbac Saúde Animal.',
    },
    evidenceLevel: 'Consensos IRIS / Estudos Clínicos Virbac (Bernachon et al.)',
    imageUrl: 'https://br.virbac.com/files/live/sites/virbac-br/files/everydaycare/Feluro/401130_Packshot_Pronefra_60ml_face.png',
    productPageUrl: 'https://br.virbac.com/',
  },
  {
    id: 'nplate-romiplostim-amgen',
    slug: 'nplate-romiplostim',
    name: 'Nplate® (Romiplostim)',
    manufacturer: 'Amgen',
    commercialClass: 'emergency',
    commercialSubclass: 'emergency_thrombopoietin',
    commercialSubclasses: ['emergency_thrombopoietin', 'oncologic_chemotherapy'],
    isControlled: false,
    species: ['dog', 'cat'],
    presentations: [
      'Nplate 250 mcg pó liofilizado para solução injetável — embalagem com 1 frasco-ampola + 1 ampola com 0,72 mL de diluente (água para injetáveis)',
      'Nplate 500 mcg pó liofilizado para solução injetável — embalagem com 1 frasco-ampola + 1 ampola com 1,2 mL de diluente (água para injetáveis)',
    ],
    activeComponents: ['romiplostim 250 mcg', 'romiplostim 500 mcg'],
    searchAliases: [
      'nplate',
      'n-plate',
      'romiplostim',
      'romiplostima',
      'tpo',
      'trombopoetina',
      'agonista de trombopoietina',
      'peptibody',
      'amgen',
      'trombocitopenia imunomediada',
      'pti canina',
      'pti felina',
      'pti refrataria',
      'plaquetopenia grave',
      'hipoplasia megacariocitica',
      'estimulador plaquetario',
    ],
    labelCompositionSummary:
      'Cada frasco-ampola de dose única contém 250 mcg ou 500 mcg de romiplostim formulado como pó liofilizado estéril para reconstituição parenteral. O romiplostim é uma proteína de fusão terapêutica (peptibody) produzida por tecnologia de DNA recombinante em Escherichia coli, composta pelo domínio Fc de imunoglobulina IgG1 humana ligado a peptídeos que se ligam e ativam o receptor de trombopoietina (TPO / c-Mpl). Estimula a proliferação e diferenciação de megacariócitos na medula óssea, aumentando de forma robusta a produção de plaquetas. Registro Anvisa nº 1.0244.0004 (Amgen Brasil).',
    labelDirections:
      'USO HOSPITALAR EXCLUSIVO SOB PRESCRIÇÃO E SUPERVISÃO VETERINÁRIA ESPECIALIZADA. Bula humana Anvisa: dose inicial de 1 mcg/kg SC semanalmente, ajustada por titulação de 1 mcg/kg até contagem de plaquetas ≥ 50.000/µL. Uso veterinário extra-label consagrado (JVIM / consensos de PTI refratária): Cães: 3 a 5 mcg/kg (faixa relatada de 1 a 10 mcg/kg, dose mediana comumente empregada de 5 mcg/kg) por via subcutânea (SC) em injeção única semanal (q7d). Gatos: 1 a 3 mcg/kg SC semanal (q7d) em caráter excepcional. RECONSTITUIÇÃO: Reconstituir o frasco de 250 mcg com 0,72 mL de água para injetáveis estéril (ou o frasco de 500 mcg com 1,2 mL), injetando lentamente pela parede interna do frasco. Girar o frasco suavemente em movimentos circulares sem agitar vigorosamente ou chacoalhar (risco de desnaturação proteica e perda de eficácia). A concentração final reconstituída entregue é de 500 mcg/mL. Aspirar o volume calculado com seringa de insulina (100 UI = 1 mL) ou seringa de 1 mL para assegurar dosagem precisa em centésimos de mililitro (ex.: cão de 10 kg a 5 mcg/kg = 50 mcg = 0,1 mL).',
    dosageGuidance: {
      labelDose:
        'Cães: 3 a 5 mcg/kg SC a cada 7 dias (semanal); Gatos: 1 a 3 mcg/kg SC a cada 7 dias (semanal), ajustando conforme resposta plaquetária.',
      plumbs: {
        dog: [
          {
            title: 'Trombocitopenia Imunomediada (PTI) canina refratária / recidivante grave',
            dose: '3 a 5 mcg/kg SC em dose única a cada 7 dias (semanal)',
            note: 'Terapia de resgate para cães que falharam à imunossupressão convencional de primeira e segunda linha (glicocorticoides, azatioprina, ciclosporina, micofenolato, vincristina). Monitorar hemograma completo com contagem de plaquetas a cada 7 dias antes de cada aplicação. Resposta plaquetária costuma ser observada entre o 5º e o 10º dia pós-aplicação.',
          },
          {
            title: 'Trombocitopenia amegacariocítica / hipoplasia de megacariócitos e mielossupressão',
            dose: '5 mcg/kg SC semanalmente',
            note: 'Indicado quando o mielograma revela ausência ou escassez de megacariócitos na medula óssea. Espaçar ou descontinuar assim que a contagem de plaquetas atingir patamares hemostáticos seguros (>50.000 a 100.000/µL).',
          },
        ],
        cat: [
          {
            title: 'Trombocitopenia refratária grave felina (uso compassivo / especialista)',
            dose: '1 a 3 mcg/kg SC em dose única semanal',
            note: 'Uso restrito e com monitoramento hematológico cerrado. Confirmar previamente que a plaquetopenia não seja artefato pré-analítico por agregação (pseudotrombocitopenia felina em EDTA).',
          },
        ],
      },
      notes: [
        'A dose é calculada rigorosamente em microgramas por quilo (mcg/kg), NUNCA em miligramas.',
        'Utilizar seringa de insulina (onde 100 UI = 1 mL = 500 mcg de romiplostim reconstituído; 1 UI = 5 mcg) ou seringa tuberculina de 1 mL com graduação centesimal.',
        'Suspender a administração quando as plaquetas superarem 200.000 a 400.000/µL para evitar trombocitose rebote e acidentes tromboembólicos.',
      ],
    },
    plumbsContext:
      'O romiplostim é um agonista peptídico do receptor de trombopoietina (TPO-RA). Em cães com PTI refratária grave, estudos recentes (JVIM / Veterinary Internal Medicine 2024) demonstraram que a estimulação da trombopoiese associada à imunossupressão pode induzir remissão hematológica e elevar a contagem plaquetária acima do limiar hemorrágico em cerca de 80% a 90% dos casos antes intratáveis.',
    clinicalUse:
      'Trombocitopenia Imunomediada (PTI) canina e felina primária ou secundária refratária ao tratamento imunossupressor padrão; trombocitopenia amegacariocítica adquirida; aplasia/hipoplasia de série megacariocítica medular; e suporte trombopoiético em mielossupressão grave com sangramento ativo e risco de vida.',
    reassessment:
      'Hemograma completo e contagem automatizada/manual de plaquetas semanalmente antes de cada nova aplicação. Após estabilização da contagem (>50.000 a 100.000/µL), titular a dose ou espaçar o intervalo para cada 14 a 21 dias antes do desmame final.',
    prescriptionExample:
      'USO HOSPITALAR / AMBULATORIAL: Nplate 250 mcg pó liofilizado (Amgen): Reconstituir com 0,72 mL de água estéril (concentração de 500 mcg/mL). Administrar ___ mcg (___ mL) por via subcutânea, em dose única semanal, sob monitoramento prévio do hemograma.',
    safetyAlert:
      'ALERTA DE ALTA VIGILÂNCIA — MEDICAMENTO HOSPITALAR BIOLÓGICO DE ALTO CUSTO. 1) RISCO DE ANTICORPOS NEUTRALIZANTES: Por ser uma proteína heteróloga humana, o uso repetido ou prolongado (>4 a 8 semanas) pode induzir anticorpos neutralizantes que reagem cruzadamente contra a trombopoietina endógena do cão/gato, provocando trombocitopenia refratária permanente e letal; 2) RISCO DE TROMBOSE: Trombocitose rebote excessiva (>400.000/µL) aumenta o risco de tromboembolismo arterial e venoso; 3) PRECISÃO DE CÁLCULO: Dose expressa em MICROGRAMAS (mcg/kg). Erros de unidade podem ser fatais; 4) RECONSTITUIÇÃO SUAVE: Nunca agitar o frasco (desnaturação de peptídeos). 5) MEDICAMENTO PARENTERAL EXCLUSIVO (não indicado para administração domiciliar pelo tutor).',
    price: {
      averageLabel: 'R$ 3.200,00 (250 mcg) / R$ 6.100,00 (500 mcg)',
      rangeLabel: 'Distribuidoras hospitalares / Oncomed / Farmácias especializadas: R$ 2.800,00 a R$ 3.900,00 (250 mcg); R$ 5.400,00 a R$ 7.300,00 (500 mcg)',
      sourceDate: '09/2026',
      notes: 'Medicamento biológico de alta complexidade com registro Anvisa nº 1.0244.0004.',
    },
    evidenceLevel: 'Estudos Clínicos JVIM / Consensos ACVIM de PTI',
    imageUrl: 'https://www.drugs.com/images/pills/custom/pill32728-1/nplate-250-mcg-lyophilized-powder-for-injection-medicine-114383.jpeg',
    productPageUrl: 'https://www.amgen.com.br/',
  },
];
