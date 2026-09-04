type ConsensusSeed = Record<string, unknown>;

/** Dermatologia — diretrizes ICADA com link externo (DOI). */
export const dermatologiaConsensosSeed: ConsensusSeed[] = [
  {
    id: 'con-icada-dac-2015',
    slug: 'icada-dermatite-atopica-canina-2015',
    title: 'Dermatite atópica canina — diretrizes de diagnóstico e tratamento',
    shortTitle: 'DAC — ICADA 2015',
    sourceOrganization: 'ICADA / WSAVA',
    year: 2015,
    species: 'dog',
    category: 'dermatologia',
    tags: ['DAC', 'CAD', 'Prurido', 'ASIT', 'Exclusão', 'Favrot'],
    pdfUrl: '/documents/consulta-vet/consensos/icada-dermatite-atopica-canina-2015.pdf',
    pdfFileName: 'icada-dermatite-atopica-canina-2015.pdf',
    storagePath: 'documents/consulta-vet/consensos/icada-dermatite-atopica-canina-2015.pdf',
    summary:
      'Diretrizes ICADA 2015 para dermatite atópica canina (DAC): diagnóstico de exclusão após ectoparasitas e alergia alimentar; testes alérgicos (TID/IgE) apenas para imunoterapia; manejo multimodal com controle de barreira, tratamento de infecções secundárias e imunomodulação.',
    keyPointsText:
      '• DAC = diagnóstico clínico de exclusão; IgE/TID não diagnosticam.\n• Excluir pulgas (DAPP), ectoparasitas e alergia alimentar antes de rotular atopia.\n• Critérios de Favrot apoiam suspeita, não confirmam isoladamente.\n• Tratar infecções secundárias (Staphylococcus, Malassezia) antes de escalar antipruriginosos.\n• ASIT após seleção de alérgenos; ciclosporina e glucocorticoides para controle sintomático.',
    practicalApplicationText:
      'Seguir exclusões → confirmar clinicamente → citologia se exacerbação → crise (antipruriginoso ± tópico) → manutenção (barreira + ASIT/imunomodulador). Reavaliar otite e infecção secundária em toda recidiva.',
    appNotesText:
      'VIGENTE — base para ficha de dermatite atópica canina. Complementar com ISCAID Pyoderma 2025 para infecções secundárias.',
    references: [
      {
        id: 'ref-icada-dac-2015',
        citationText:
          'Olivry T, DeBoer DJ, Favrot C, et al. Treatment of canine atopic dermatitis: 2015 updated guidelines from the International Committee on Allergic Diseases of Animals (ICADA). BMC Vet Res. 2015;11:210.',
        sourceType: 'Diretriz ICADA',
        url: 'https://doi.org/10.1186/s12917-015-0514-6',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['dermatite-atopica-canina'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-icada-fass-2021',
    slug: 'icada-sindrome-cutanea-atopica-felina-2021',
    title: 'Síndrome cutânea atópica felina — consenso ICADA',
    shortTitle: 'FASS — ICADA 2021',
    sourceOrganization: 'ICADA',
    year: 2021,
    species: 'cat',
    category: 'dermatologia',
    tags: ['FASS', 'FAS', 'Alopecia autoinduzida', 'Granuloma eosinofílico', 'Ciclosporina'],
    pdfUrl: 'https://onlinelibrary.wiley.com/doi/10.1111/vde.12977',
    pdfFileName: 'doi-10.1111-vde-12977',
    storagePath: 'external/doi-10.1111-vde-12977',
    summary:
      'Consenso ICADA 2021 para síndrome cutânea atópica felina (FASS): nomenclatura, quatro padrões reacionais, diagnóstico de exclusão, prednisolona na crise e ciclosporina modificada na manutenção. Enfatiza que Lokivetmab canino não deve ser usado em gatos.',
    keyPointsText:
      '• FASS = manifestação cutânea da síndrome atópica felina (FAS).\n• Quatro padrões: alopecia autoinduzida, dermatite miliar, granuloma eosinofílico, cabeça/pescoço.\n• Excluir DAPP, Demodex gatoi, dermatofitose e alergia alimentar.\n• Crise: prednisolona oral (não prednisona).\n• Manutenção: ciclosporina 7 mg/kg com desmame gradual.\n• Cytopoint/lokivetmab contraindicado em felinos.',
    practicalApplicationText:
      'Exclusões rigorosas → tricograma → prednisolona na crise → ciclosporina na manutenção → FeLV/FIV/Toxoplasma antes de imunossupressor crônico.',
    appNotesText:
      'VIGENTE — referência principal para FASS no ConsultaVET.',
    references: [
      {
        id: 'ref-icada-fass-2021',
        citationText:
          'Halliwell REW, Pucheu-Haston CM, Olivry T, et al. Feline allergic skin disease: introduction and proposed nomenclature. Vet Dermatol. 2021;32(1):8-e3.',
        sourceType: 'Consenso ICADA',
        url: 'https://doi.org/10.1111/vde.12977',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['sindrome-cutanea-atopica-felina'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
];
