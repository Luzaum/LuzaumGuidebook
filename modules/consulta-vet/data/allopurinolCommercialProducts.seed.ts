import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const allopurinolCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'zyloric-alopurinol-aspen',
    slug: 'zyloric-alopurinol',
    name: 'Zyloric® (Alopurinol)',
    manufacturer: 'Aspen Pharma',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_leishmaniasis',
    commercialSubclasses: ['infectious_leishmaniasis', 'uro_urinary_urate', 'renal_ckd_support'],
    species: ['dog', 'cat'],
    presentations: [
      'Zyloric 100 mg comprimidos sulcados — caixa com 30 comprimidos',
      'Zyloric 300 mg comprimidos sulcados — caixa com 30 comprimidos',
    ],
    activeComponents: ['alopurinol 100 mg', 'alopurinol 300 mg'],
    searchAliases: [
      'alopurinol',
      'allopurinol',
      'zyloric',
      'aspen',
      'leishmaniose',
      'leishmaniose visceral canina',
      'lvc',
      'leishmaniose canina',
      'leishmaniose felina',
      'leishmaniostatico',
      'leishmanicida',
      'xantina oxidase',
      'xantinuria',
      'urolitiase',
      'urato',
      'urato de amonio',
      'calculo de urato',
      'dalmata',
      'shunt portossistemico',
      'gota',
      'hiperuricemia',
      'purinas',
      'calazar',
    ],
    labelCompositionSummary:
      'Cada comprimido sulcado contém 100 mg ou 300 mg de alopurinol. Inibidor enzimático da xantina oxidase. Medicamento humano de referência no Brasil registrado na Anvisa sob nº 1.3764.0122 (Aspen Pharma Indústria Farmacêutica Ltda.). Uso humano com consagração extra-bula indispensável na rotina médica veterinária como agente leishmaniostático na Leishmaniose Visceral Canina (LVC) e agente antiurolítico na prevenção e dissolução de cálculos de urato de amônio.',
    labelDirections:
      'Bula humana Anvisa: 100 a 300 mg/dia VO para gota e hiperuricemia. Uso veterinário extra-bula consagrado (Consensos Brasileish 2020, LeishVet, WAVD 2025 e CLWG 2026 / Plumb’s 10ª ed.): LEISHMANIOSE VISCERAL CANINA (LVC): 10 mg/kg por via oral a cada 12 horas (q12h / BID), administrado preferencialmente com o alimento ou logo após a refeição para reduzir irritação gástrica, por no mínimo 6 a 12 meses ininterruptos (ou como terapia de manutenção longitudinal monitorada por sorologia, PCR, proteinúria e quadro clínico). UROLITÍASE POR URATO DE AMÔNIO (Dálmatas, Bulldogs, Shunt Portossistêmico): Dissolução médica: 15 mg/kg VO a cada 12 horas (q12h) associado obrigatoriamente a dieta terapêutica hipopurínica alcalinizante (meta de pH urinário 7,0 a 7,5); Prevenção / profilaxia de recidiva: 5 a 10 mg/kg VO a cada 12 horas (ou 10 mg/kg VO q24h) com dieta restrita em purinas. FELINOS: 10 mg/kg VO a cada 12 a 24 horas (q12–24h) para leishmaniose felina ou urólitos de urato, sob monitoramento renal e hepático estrito.',
    dosageGuidance: {
      labelDose:
        'Cães: 10 mg/kg VO a cada 12 horas (LVC); 10 a 15 mg/kg VO q12–24h (urólitos de urato). Gatos: 10 mg/kg VO a cada 12 a 24 horas.',
      plumbs: {
        dog: [
          {
            title: 'Leishmaniose Visceral Canina (LVC) — Terapia de manutenção leishmaniostática contínua',
            dose: '10 mg/kg VO a cada 12 horas (q12h / BID) por 6 a 12+ meses',
            note: 'Administrar com alimento. O alopurinol atua como análogo de purina no parasita leishmaniano (incorporado via enzima adenina fosforribosiltransferase), bloqueando a síntese proteica e inibindo a replicação celular leishmaniana. Associar obrigatoriamente a repelência vetorial (coleiras com deltametrina) e monitorar xantinúria com urinálise e US a cada 3 a 6 meses.',
          },
          {
            title: 'Dissolução de Urólitos de Urato de Amônio (Hiperuricosúria / Dálmatas / Shunt PSS)',
            dose: '15 mg/kg VO a cada 12 horas (q12h)',
            note: 'Obrigatória associação com dieta hipopurínica alcalinizante (meta pH 7,0 a 7,5; densidade < 1,020). NUNCA associar alopurinol a dieta com teor normal ou elevado de purinas (risco iminente de nefrolitíase e urolitíase obstrutiva por xantina).',
          },
          {
            title: 'Prevenção de Recidiva de Urólitos de Urato de Amônio',
            dose: '5 a 10 mg/kg VO a cada 12 horas (ou 10 mg/kg VO q24h)',
            note: 'Dose profilática titulada para manter o ácido úrico urinário reduzido sem deflagrar supersaturação de xantina.',
          },
        ],
        cat: [
          {
            title: 'Leishmaniose Felina e Urolitíase por Urato em Gatos',
            dose: '10 mg/kg VO a cada 12 a 24 horas (q12–24h)',
            note: 'Uso extra-bula com monitoramento de função renal e enzimas hepáticas. Para felinos de pequeno porte, priorizar apresentações manipuladas em cápsulas fracionadas ou suspensão oral para garantir precisão.',
          },
        ],
      },
      notes: [
        'Comprimidos de 100 mg e 300 mg possuem sulco para partição em metades (50 mg e 150 mg). Pacientes de pequeno porte (<5–10 kg) exigem formulação manipulada veterinária para prevenir sobredose acidental.',
        'O alopurinol e seu metabólito ativo (oxipurinol) sofrem depuração primariamente renal: reduzir a dose em 30% a 50% em pacientes com Doença Renal Crônica (DRC estágios IRIS 3 e 4).',
        'A suspensão abrupta do alopurinol na LVC está associada a recidiva clínica e elevação rápida da carga parasitária.',
      ],
    },
    plumbsContext:
      'O alopurinol inibe competitivamente a enzima xantina oxidase, impedindo a conversão de hipoxantina em xantina e de xantina em ácido úrico. Na Leishmania infantum — um protozoário auxotrófico incapaz de sintetizar purinas de novo —, o fármaco é fosforilado pela adenina fosforribosiltransferase do parasita e incorporado ao RNA como análogo de purina disfuncional, paralisando a tradução e replicação leishmaniana. Na urolitíase, diminui a excreção urinária de ácido úrico, prevenindo a precipitação de urato de amônio.',
    clinicalUse:
      'Tratamento leishmaniostático de manutenção longitudinal da Leishmaniose Visceral Canina (LVC), isolado ou em associação com leishmanicidas registrados no MAPA (miltefosina / Milteforan); dissolução e profilaxia médica de urólitos de urato de amônio em cães com defeito no transportador hepático SLC2A9 (Dálmatas, Bulldogs) ou portadores de shunt portossistêmico (PSS); e manejo de leishmaniose e urolitíase por urato em felinos.',
    reassessment:
      'Urinálise com análise minuciosa de sedimento urinário (pesquisa de cristais esféricos marrom-amarelados de xantina) e ultrassonografia abdominal a cada 3 a 6 meses. Na LVC, avaliar hemograma, creatinina, ureia, SDMA, relação proteína/creatinina urinária (UPC), eletroforese de proteínas séricas e titulação de anticorpos/PCR a cada 3 a 6 meses.',
    prescriptionExample:
      'Zyloric 100 mg comprimidos sulcados (Aspen Pharma) — caixa com 30 comprimidos: Administrar ___ comprimido(s) (dose calculada: 10 mg/kg) por via oral, a cada 12 horas, junto às refeições, por período prolongado de 6 a 12 meses, sob acompanhamento urinário periódico.',
    safetyAlert:
      'ALERTA DE SEGURANÇA E USO EXTRA-BULA: 1) XANTINÚRIA E URÓLITOS DE XANTINA (UROLITÍASE IATROGÊNICA): O bloqueio da xantina oxidase acarreta acúmulo de xantina, que é significativamente menos solúvel que o ácido úrico e forma cristais e cálculos radiotransparentes obstrutivos na bexiga e uretra; 2) DIETA HIPOPURÍNICA MANDATÓRIA: Pacientes em terapia prolongada com alopurinol devem ser mantidos em dietas com baixo teor de purinas (evitar vísceras, miúdos e carnes vermelhas; priorizar dietas terapêuticas renais ou urológicas); 3) MONITORAMENTO TRIMESTRAL: Urinálise seriada e ultrassom de vias urinárias a cada 3 a 6 meses; 4) AJUSTE OBRIGATÓRIO NA DRC (DOENÇA RENAL CRÔNICA): Reduzir a dose em 30% a 50% em pacientes nefropatas (estágios IRIS 3 e 4) devido à excreção renal do oxipurinol; 5) CONTRAINDICADO NA GESTAÇÃO E LACTAÇÃO.',
    price: {
      averageLabel: 'R$ 24,00 (100 mg) / R$ 46,00 (300 mg)',
      rangeLabel: 'Drogasil / Raia / Pacheco / Pague Menos: R$ 18,00 a R$ 29,00 (100 mg com 30 comp); R$ 38,00 a R$ 56,00 (300 mg com 30 comp)',
      sourceDate: '09/2026',
      notes: 'Medicamento humano de referência no Brasil sob prescrição médica (tarja vermelha).',
    },
    evidenceLevel: 'Consensos Brasileish 2020 / LeishVet / WAVD 2025 / ACVIM Urolitíase',
    imageUrl: 'https://product-data.raiadrogasil.io/images/14982036.webp',
    productPageUrl: 'https://www.aspenpharma.com.br/',
  },
  {
    id: 'alopurinol-generico-humano',
    slug: 'alopurinol-generico',
    name: 'Alopurinol Genérico',
    manufacturer: 'Medley / EMS / Eurofarma / Teuto',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_leishmaniasis',
    commercialSubclasses: ['infectious_leishmaniasis', 'uro_urinary_urate', 'renal_ckd_support'],
    species: ['dog', 'cat'],
    presentations: [
      'Alopurinol 100 mg comprimidos sulcados — caixa com 30 comprimidos',
      'Alopurinol 100 mg comprimidos sulcados — caixa com 60 comprimidos',
      'Alopurinol 300 mg comprimidos sulcados — caixa com 30 comprimidos',
    ],
    activeComponents: ['alopurinol 100 mg', 'alopurinol 300 mg'],
    searchAliases: [
      'alopurinol',
      'allopurinol',
      'generico',
      'medley',
      'ems',
      'eurofarma',
      'teuto',
      'sandoz',
      'leishmaniose',
      'lvc',
      'leishmaniose canina',
      'xantina oxidase',
      'xantinuria',
      'urato',
      'urato de amonio',
      'dalmata',
      'shunt portossistemico',
    ],
    labelCompositionSummary:
      'Cada comprimido sulcado contém 100 mg ou 300 mg de alopurinol genérico bioequivalente. Inibidor da xantina oxidase amplamente disponível no mercado farmacêutico brasileiro (Medley, EMS, Eurofarma, Teuto, Sandoz, Neo Química). Apresentação humana mais acessível e frequentemente prescrita na rotina veterinária extra-bula para tratamentos prolongados de leishmaniose visceral canina e prevenção de urolitíase por urato.',
    labelDirections:
      'Uso veterinário extra-bula consagrado: Cães: 10 mg/kg VO a cada 12 horas (q12h / BID) para Leishmaniose Visceral Canina por 6 a 12 meses; 10 a 15 mg/kg VO q12–24h para dissolução ou profilaxia de cálculos de urato associado a dieta hipopurínica. Gatos: 10 mg/kg VO q12–24h. Administrar com alimento para prevenir desconforto digestivo.',
    dosageGuidance: {
      labelDose:
        'Cães: 10 mg/kg VO a cada 12 horas (LVC); 10 a 15 mg/kg VO q12–24h (urólitos de urato). Gatos: 10 mg/kg VO a cada 12 a 24 horas.',
      plumbs: {
        dog: [
          {
            title: 'Leishmaniose Visceral Canina — Manutenção leishmaniostática',
            dose: '10 mg/kg VO a cada 12 horas (q12h) com alimento',
            note: 'Esquema de manutenção prolongada. Monitorar sedimento urinário para identificação precoce de cristais de xantina.',
          },
          {
            title: 'Manejo de Urólitos de Urato de Amônio',
            dose: '10 a 15 mg/kg VO q12h a q24h',
            note: 'Dieta de baixa purina mandatória para evitar precipitação de cálculos radiotransparentes de xantina.',
          },
        ],
        cat: [
          {
            title: 'Leishmaniose felina e uratos em gatos',
            dose: '10 mg/kg VO q12–24h',
            note: 'Monitorar perfil renal e hepático periodicamente.',
          },
        ],
      },
    },
    plumbsContext:
      'O alopurinol genérico possui equivalência farmacêutica e bioequivalência aos padrões de referência (Zyloric). Bloqueia a enzima xantina oxidase e, no parasita Leishmania, é convertido em ribonucleotídeos anômalos que paralisam a síntese proteica leishmaniana.',
    clinicalUse:
      'Terapia leishmaniostática de longa duração na LVC; profilaxia e tratamento de urolitíase por urato de amônio em cães e gatos predispostos.',
    reassessment:
      'Exame de urina com sedimento e ultrassonografia abdominal trimestral/semestral para rastreio de xantinúria e nefrolitíase; avaliação bioquímica renal e proteinúria (UPC).',
    prescriptionExample:
      'Alopurinol 100 mg comprimidos sulcados (Genérico) — caixa com 60 comprimidos: Administrar ___ comprimido(s) por via oral a cada 12 horas, misturado à refeição, de uso contínuo.',
    safetyAlert:
      'AVISO DE USO EXTRA-BULA: Risco de formação de cálculos de xantina (xantinúria iatrogênica). Exige dieta com baixo teor de purinas e monitoramento urinário e ultrassonográfico seriado. Ajustar dose em caso de nefropatia/azotemia.',
    price: {
      averageLabel: 'R$ 14,00 (100 mg) / R$ 28,00 (300 mg)',
      rangeLabel: 'Redes de drogarias e farmácias populares: R$ 9,00 a R$ 19,00 (100 mg 30 comp); R$ 22,00 a R$ 36,00 (300 mg 30 comp)',
      sourceDate: '09/2026',
      notes: 'Medicamento genérico humano sob prescrição (Lei dos Genéricos nº 9.787/1999).',
    },
    evidenceLevel: 'Consensos Brasileish / LeishVet / ACVIM',
    imageUrl: 'https://product-data.raiadrogasil.io/images/14982032.webp',
  },
  {
    id: 'alopurinol-manipulado-veterinario',
    slug: 'alopurinol-manipulado-veterinario',
    name: 'Alopurinol Cápsulas e Suspensão Veterinária Manipulada',
    manufacturer: 'Farmácia de Manipulação Veterinária (DrogaVET / Fórmula Animal)',
    commercialClass: 'infectious',
    commercialSubclass: 'infectious_leishmaniasis',
    commercialSubclasses: ['infectious_leishmaniasis', 'uro_urinary_urate', 'renal_ckd_support'],
    species: ['dog', 'cat'],
    presentations: [
      'Alopurinol cápsulas veterinárias orais sob medida (10 mg, 25 mg, 50 mg, 75 mg, 150 mg, 200 mg)',
      'Alopurinol suspensão oral palatável 50 mg/mL — frasco com 60 mL ou 100 mL',
      'Alopurinol biscoitos / pastas medicamentosas palatáveis veterinárias',
    ],
    activeComponents: ['alopurinol magistral em dose individualizada'],
    searchAliases: [
      'alopurinol manipulado',
      'alopurinol veterinario',
      'alopurinol capsulas',
      'alopurinol suspensao',
      'drogavet',
      'formula animal',
      'petformula',
      'leishmaniose manipulado',
      'leishmaniose caes pequenos',
      'leishmaniose gatos',
    ],
    labelCompositionSummary:
      'Alopurinol grau farmacêutico purificado aviado sob prescrição privativa do médico-veterinário em farmácias magistrais veterinárias autorizadas pelo MAPA. Apresentação indispensável na clínica de pequenos animais para pacientes que pesam menos de 10 kg e felinos, nos quais o fracionamento de comprimidos humanos de 100 mg ou 300 mg acarreta imprecisão posológica e risco elevado de sobredose ou xantinúria.',
    labelDirections:
      'Administrar por via oral a dose miligramada exata calculada para o peso corporal (10 mg/kg VO a cada 12 horas para leishmaniose; 10 a 15 mg/kg VO q12–24h para cálculos de urato), misturado à alimentação ou diretamente na cavidade oral com veículo palatável.',
    dosageGuidance: {
      labelDose:
        'Cães: 10 mg/kg VO a cada 12 horas (LVC); 10 a 15 mg/kg VO q12–24h (urólitos de urato). Gatos: 10 mg/kg VO a cada 12 a 24 horas.',
      plumbs: {
        dog: [
          {
            title: 'Leishmaniose Visceral Canina em cães pequenos e miniatura (<10 kg)',
            dose: '10 mg/kg VO a cada 12 horas em cápsula sob medida',
            note: 'Garante a dose exata para raças miniaturas (ex.: cão de 3 kg = cápsula de 30 mg), evitando subdosagem ineficaz ou sobredose causadora de nefrolitíase por xantina.',
          },
        ],
        cat: [
          {
            title: 'Leishmaniose felina e urólitos de urato em gatos',
            dose: '10 mg/kg VO q12–24h em pasta oral palatável ou cápsula',
            note: 'Facilita a administração e adesão prolongada em gatos difíceis de medicar.',
          },
        ],
      },
    },
    plumbsContext:
      'A manipulação veterinária permite o ajuste preciso do alopurinol em mg/kg para pacientes com ampla variação ponderal e nefropatas crônicos que necessitam de redução escalonada da dose em 30% a 50%.',
    clinicalUse:
      'Dosagem personalizada e palatável de alopurinol na LVC e na hiperuricosúria/urólitos de urato de cães e gatos.',
    reassessment:
      'Monitoramento trimestral com urinálise (cristais de xantina) e ultrassonografia de vias urinárias, além de bioquímica renal.',
    prescriptionExample:
      'Alopurinol manipulado veterinário — cápsulas de ___ mg: Administrar 1 cápsula por via oral a cada 12 horas, junto ao alimento, por 6 a 12 meses ininterruptos.',
    safetyAlert:
      'AVISO: Manter dieta restrita em purinas e acompanhamento urinário para prevenir formação de urólitos de xantina. Reajustar a concentração da cápsula sempre que o animal sofrer alteração ponderal significativa.',
    price: {
      averageLabel: 'R$ 45,00 a R$ 85,00 (frasco 60 cápsulas)',
      rangeLabel: 'Farmácias de manipulação veterinária especializadas: varia conforme a miligramagem e saborização',
      sourceDate: '09/2026',
      notes: 'Manipulação sob medida autorizada pelo MAPA.',
    },
    evidenceLevel: 'Consensos Brasileish / LeishVet / Farmacopeia Veterinária',
    imageUrl: '/assets/consulta-vet/commercial-products/alopurinol-manipulado-veterinario.svg',
  },
];
