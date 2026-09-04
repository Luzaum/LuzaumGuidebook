type ConsensusSeed = Record<string, unknown>;

/** Neurologia — consensos com link externo (DOI) quando PDF local ausente. */
export const neurologiaConsensosSeed: ConsensusSeed[] = [
  {
    id: 'con-acvim-ivdd-canina-2022',
    slug: 'acvim-ivdd-canina-2022',
    title: 'Doença do disco intervertebral toracolombar aguda — cães',
    shortTitle: 'DDIV toracolombar (ACVIM 2022)',
    sourceOrganization: 'ACVIM',
    year: 2022,
    species: 'dog',
    category: 'neurologia',
    tags: ['DDIV', 'IVDD', 'Hansen I', 'Hemilaminectomia', 'Nocicepção profunda', 'ANNPE'],
    pdfUrl: 'https://doi.org/10.1111/jvim.16480',
    pdfFileName: 'doi-10.1111-jvim-16480',
    storagePath: 'external/doi-10.1111-jvim-16480',
    summary:
      'Consenso ACVIM 2022 sobre diagnóstico e manejo da extrusão discal intervertebral toracolombar aguda (TL-IVDE) em cães. Define graduação neurológica, indicações de imagem (RM/TC), manejo conservador vs descompressão cirúrgica, analgesia multimodal e limitações do uso de corticoides. Reafirma que perda de nocicepção profunda por >24–48 h não contraindica cirurgia isoladamente.',
    articleSummaryRichText:
      '<p>O consenso organiza a <strong>extrusão discal toracolombar aguda</strong> em cães por grau neurológico, enfatiza <strong>RM ou TC</strong> para decisão terapêutica, proíbe combinação rotineira <strong>AINE + corticoide</strong> e desaconselha corticoides como neuroprotetores de rotina. A <strong>nocicepção profunda consciente</strong> permanece o principal marcador prognóstico, mas a ausência prolongada de dor profunda não elimina indicação cirúrgica.</p>',
    keyPointsText:
      '• Graduação neurológica (Graus 1–5) orienta conservador vs cirúrgico.\n• RM sensibilidade >98,5% para TL-IVDE; radiografia simples não substitui imagem avançada.\n• Restrição estrita 4–6 semanas + analgesia multimodal no conservador.\n• Hemilaminectomia/descompressão na piora, falha conservadora ou Graus 4–5 compressivos.\n• Não usar corticoides rotineiros como neuroprotetores; evitar AINE + corticoide concomitantes.\n• Perda de dor profunda >48 h: prognóstico reservado, mas cirurgia ainda pode ser indicada.',
    practicalApplicationText:
      '1) Exame neurológico seriado e neurolocalização. 2) RM/TC antes de cirurgia eletiva/urgente. 3) Grau 1: repouso + analgesia. 4) Graus 2–3: conservador ou cirurgia conforme evolução. 5) Graus 4–5 compressivos: descompressão urgente se indicada na imagem. 6) Monitorar mielomalácia (reflexo cutâneo do tronco ascendente). 7) Fisioterapia e controle de peso pós-alta.',
    appNotesText:
      'VIGENTE — referência principal para DDIV canina toracolombar aguda no ConsultaVET.\n\nNão extrapolar automaticamente para gatos ou DDIV cervical isolada. ANNPE/HNPE exigem interpretação de imagem específica.',
    references: [
      {
        id: 'ref-acvim-ivdd-2022',
        citationText:
          'Olby NJ, Moore SA, Brisson BA, et al. ACVIM consensus statement on diagnosis and management of acute canine thoracolumbar intervertebral disc extrusion. J Vet Intern Med. 2022;36(5):1570–1596.',
        sourceType: 'Consenso ACVIM',
        url: 'https://doi.org/10.1111/jvim.16480',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['doenca-do-disco-intervertebral-caes'],
    relatedMedicationSlugs: ['gabapentina', 'tramadol', 'metadona'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
];
