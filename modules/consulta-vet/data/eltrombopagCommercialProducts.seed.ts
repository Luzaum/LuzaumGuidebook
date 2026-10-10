import type { CommercialMedicationProduct } from '../types/commercialMedication';

export const eltrombopagCommercialProductsSeed: CommercialMedicationProduct[] = [
  {
    id: 'revolade-eltrombopag-novartis',
    slug: 'revolade-eltrombopague',
    name: 'Revolade® (Eltrombopague)',
    manufacturer: 'Novartis',
    commercialClass: 'emergency',
    commercialSubclass: 'emergency_thrombopoietin',
    commercialSubclasses: ['emergency_thrombopoietin', 'oncologic_chemotherapy'],
    species: ['dog', 'cat'],
    presentations: [
      'Revolade 25 mg comprimidos revestidos — embalagem com 14 comprimidos revestidos',
      'Revolade 50 mg comprimidos revestidos — embalagem com 14 comprimidos revestidos',
    ],
    activeComponents: ['eltrombopague olamina 25 mg', 'eltrombopague olamina 50 mg'],
    searchAliases: [
      'eltrombopag',
      'eltrombopague',
      'eltrombopague olamina',
      'revolade',
      'remolaid',
      'novartis',
      'tpo',
      'trombopoetina',
      'agonista de trombopoietina',
      'pti canina',
      'pti felina',
      'trombocitopenia imunomediada',
      'plaquetopenia',
      'aplasia medular',
      'pancitopenia aplasica',
      'purpura trombocitopenica',
    ],
    labelCompositionSummary:
      'Cada comprimido revestido contém 25 mg ou 50 mg de eltrombopague (sob a forma de eltrombopague olamina). Agonista alostérico não-peptídico de pequenas moléculas do receptor de trombopoietina (TPO / c-Mpl). Medicamento humano de alta vigilância registrado na Anvisa sob nº 1.0068.1077 (Novartis Biociências S.A.). Uso humano formalmente indicado em PTI crônica e anemia aplásica grave, com relatos de uso experimental compassivo extra-bula na medicina veterinária.',
    labelDirections:
      'Bula humana Anvisa: dose inicial de 25 a 50 mg/dia VO. Uso veterinário extra-bula empírico e experimental (JAVMA 2023, JVIM): Cães: 1,25 mg/kg por via oral a cada 24 horas (q24h / SID), em jejum estrito (no mínimo 2 horas antes ou 4 horas após qualquer refeição, laticínio ou suplemento mineral com cálcio, ferro, magnésio ou alumínio). Gatos: dados extremamente escassos; relato de uso em caráter compassivo supervisionado a 1 a 1,25 mg/kg VO q24h. ATENÇÃO: Estudos controlados recentes demonstram falta de benefício estatístico em cães devido à espécie-especificidade molecular do receptor de TPO. Quando indicado agonista de TPO eficaz em pequenos animais, a literatura recomenda prioritariamente o Romiplostim (Nplate®).',
    dosageGuidance: {
      labelDose:
        'Cães: 1,25 mg/kg VO a cada 24 horas (uso experimental extra-bula sob jejum estrito). Bula humana: 25 a 50 mg/dia VO.',
      plumbs: {
        dog: [
          {
            title: 'Trombocitopenia Imunomediada (PTI) canina refratária e Pancitopenia Aplásica (Uso Experimental)',
            dose: '1,25 mg/kg VO a cada 24 horas (SID)',
            note: 'Administrar em jejum rigoroso (2 horas antes ou 4 horas após alimentos ou cátions polivalentes). Monitorar enzimas hepáticas (ALT, FA, bilirrubinas) a cada 2 a 4 semanas. Nota: ensaios clínicos controlados não confirmaram benefício adicional à imunossupressão padrão devido à divergência estrutural do receptor canino.',
          },
        ],
        cat: [
          {
            title: 'Trombocitopenia grave refratária felina (Uso Compassivo Especializado)',
            dose: '1 a 1,25 mg/kg VO a cada 24 horas (SID)',
            note: 'Evidência quase inexistente na espécie felina. Exige exclusão prévia de pseudotrombocitopenia em EDTA e monitoramento cerrado.',
          },
        ],
      },
      notes: [
        'QUELAÇÃO POR CÁTIONS: O eltrombopague quela intensamente com íons bivalentes e trivalentes (cálcio, magnésio, ferro, alumínio, selênio, zinco). Não administrar com ração, leite, laticínios ou protetores gástricos (sucralfato, antiácidos).',
        'ESPÉCIE-ESPECIFICIDADE DO RECEPTOR: O fármaco se liga à Histidina-499 na hélice transmembrana do receptor humano de TPO. Como o receptor canino e felino não possui essa histidina transmembrana conservada, a estimulação da trombopoiese é mínima ou ausente. Romiplostim (Nplate®) atua no domínio extracelular e é a molécula com eficácia comprovada em cães.',
        'HEPATOTOXICIDADE: Pode causar lesão hepática com aumento de ALT/AST e bilirrubina. Suspender se houver elevação severa (>3x o limite superior).',
      ],
    },
    plumbsContext:
      'O eltrombopag é um agonista oral sintético não-peptídico do receptor de trombopoietina (TPO). Diferente da trombopoietina endógena e do romiplostim (que se ligam ao domínio extracelular do receptor c-Mpl), o eltrombopag liga-se alostericamente à região transmembrana do receptor em humanos, especificamente dependente do resíduo de aminoácido Histidina-499 (His499). Devido a variações evolutivas na sequência primária do receptor de TPO de caninos e felinos, a ativação funcional da trombopoiese in vivo não replica os níveis observados em humanos, o que justifica a ausência de resposta terapêutica em ensaios controlados de PTI canina.',
    clinicalUse:
      'Uso experimental e compassivo em cães com Trombocitopenia Imunomediada (PTI) primária ou secundária refratária a imunossupressores múltiplos, e em casos selecionados de anemia/pancitopenia aplásica idiopática. Deve ser prescrito com pleno conhecimento de suas limitações farmacodinâmicas em pequenos animais.',
    reassessment:
      'Hemograma completo com contagem de plaquetas semanal nas primeiras 4 semanas de uso. Perfil bioquímico hepático (ALT, AST, fosfatase alcalina e bilirrubinas totais) prévio e quinzenal durante os primeiros dois meses de tratamento.',
    prescriptionExample:
      'Revolade 25 mg comprimidos revestidos (Novartis) — embalagem com 14 comprimidos: Administrar dose calculada de ___ mg (1,25 mg/kg) por via oral a cada 24 horas, em jejum obrigatório (2 horas antes ou 4 horas após qualquer alimento ou mineral).',
    safetyAlert:
      'ALERTA CRÍTICO DE EVIDÊNCIA CIENTÍFICA E BIOSSEGURANÇA: 1) FALTA DE EFICÁCIA COMPROVADA EM CÃES (ESPÉCIE-ESPECIFICIDADE): O eltrombopag depende da ligação à Histidina-499 transmembrana do receptor de TPO humano/chimpanzé. Cães e gatos não possuem essa sequência, e estudos clínicos controlados (JAVMA 2023) comprovaram que a adição de eltrombopag NÃO acelerou a recuperação plaquetária nem reduziu mortalidade em PTI canina. O padrão-ouro de evidência em cães é o Romiplostim (Nplate®); 2) QUELAÇÃO ALIMENTAR SEVERA: Deve ser administrado obrigatoriamente com o estômago vazio (jejum estrito de 2h antes e 4h após alimentos ou quelantes de cátions como cálcio, ferro, sucralfato ou antiácidos); 3) RISCO DE HEPATOTOXICIDADE: Exige monitoramento rigoroso de enzimas hepáticas e bilirrubina; 4) ALTO CUSTO FINANCEIRO COM BAIXO RENDIMENTO CLÍNICO EM PEQUENOS ANIMAIS.',
    price: {
      averageLabel: 'R$ 2.950,00 (25 mg) / R$ 5.600,00 (50 mg)',
      rangeLabel: 'Distribuidoras de alta complexidade / Drogasil / Droga Raia: R$ 2.600,00 a R$ 3.650,00 (25 mg c/ 14 comp); R$ 4.800,00 a R$ 6.800,00 (50 mg c/ 14 comp)',
      sourceDate: '10/2026',
      notes: 'Medicamento biológico oral de alto custo sob prescrição médica (tarja vermelha).',
    },
    evidenceLevel: 'Estudos JAVMA 2023 / Consensos ACVIM Hematologia / Farmacologia Molecular',
    imageUrl: 'https://product-data.raiadrogasil.io/images/16322963.webp',
    productPageUrl: 'https://www.novartis.com.br/',
  },
  {
    id: 'eltrombopag-manipulado-veterinario',
    slug: 'eltrombopague-manipulado-veterinario',
    name: 'Eltrombopague Cápsulas Veterinárias Manipuladas',
    manufacturer: 'Farmácia de Manipulação Veterinária Especializada',
    commercialClass: 'emergency',
    commercialSubclass: 'emergency_thrombopoietin',
    commercialSubclasses: ['emergency_thrombopoietin', 'oncologic_chemotherapy'],
    species: ['dog', 'cat'],
    presentations: [
      'Eltrombopague cápsulas orais sob medida (5 mg, 10 mg, 12,5 mg, 25 mg)',
      'Eltrombopague pasta oral em veículo lipofílico sem cátions polivalentes',
    ],
    activeComponents: ['Eltrombopag olamina', 'eltrombopague olamina magistral em dose individualizada'],
    searchAliases: [
      'eltrombopag',
      'eltrombopague',
      'eltrombopag manipulado',
      'eltrombopague manipulado',
      'revolade manipulado',
      'remolaid manipulado',
      'eltrombopague capsulas',
      'tpo manipulado',
    ],
    labelCompositionSummary:
      'Eltrombopague olamina grau farmacêutico fracionado em dosagens miligramadas sob medida por farmácias de manipulação veterinária habilitadas. Formulação isenta de excipientes com cátions bivalentes ou trivalentes (cálcio, magnésio, estearato de magnésio substituído ou minimizado) para evitar precipitação e quelação do princípio ativo.',
    labelDirections:
      'Administrar por via oral a dose exata prescrita (1,25 mg/kg VO a cada 24 horas), em jejum alimentar estrito de no mínimo 2 horas antes e 4 horas após a administração. Seguir monitoramento hematológico e hepático rigoroso.',
    dosageGuidance: {
      labelDose: 'Cães: 1,25 mg/kg VO a cada 24 horas em jejum estrito.',
      plumbs: {
        dog: [
          {
            title: 'Protocolo de titulação experimental em cães com PTI refratária',
            dose: '1,25 mg/kg VO q24h (SID)',
            note: 'Cápsula formulada para o peso exato do paciente, evitando quebra de comprimidos comerciais de alto custo.',
          },
        ],
      },
    },
    plumbsContext:
      'A manipulação personalizada possibilita a titulação exata do eltrombopague para animais de pequeno porte, garantindo ausência de excipientes quelantes que comprometam a já limitada biodisponibilidade e afinidade do fármaco na espécie canina.',
    clinicalUse:
      'Opção magistral de suporte em investigações acadêmicas e tratamentos compassivos de PTI canina refratária.',
    reassessment: 'Hemograma completo semanal e perfil bioquímico hepático quinzenal.',
    prescriptionExample:
      'Eltrombopague cápsulas sob medida — ___ mg (1,25 mg/kg): Administrar 1 cápsula por via oral a cada 24 horas, estritamente em jejum (2h antes e 4h após qualquer refeição).',
    safetyAlert:
      'ALERTA: Fármaco com fraca evidência de eficácia em cães devido à ausência do sítio de ligação transmembrana Histidina-499. Não administrar próximo a refeições ou compostos contendo minerais. Preferir Romiplostim (Nplate®) quando disponível.',
    price: {
      averageLabel: 'R$ 380,00 a R$ 850,00 (frasco com 14 a 30 cápsulas)',
      rangeLabel: 'Farmácias magistrais especializadas em oncologia e hematologia veterinária',
      sourceDate: '10/2026',
      notes: 'Medicamento magistral sob prescrição veterinária.',
    },
    evidenceLevel: 'Estudos JAVMA / Farmacologia Veterinária',
    imageUrl: '/assets/consulta-vet/commercial-products/eltrombopag-manipulado-veterinario.svg',
  },
];
