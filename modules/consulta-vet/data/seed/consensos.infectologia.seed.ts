type ConsensusSeed = Record<string, unknown>;

/** Infectologia — diretrizes ABCD/AAFP de acesso aberto (DOI). */
export const infectologiaConsensosSeed: ConsensusSeed[] = [
  {
    id: 'con-aafp-retrovirus-2020',
    slug: 'aafp-retrovirus-felino-2020',
    title: 'Testagem e manejo de retrovírus felinos (FeLV/FIV)',
    shortTitle: 'Retrovirus felino — AAFP 2020',
    sourceOrganization: 'AAFP',
    year: 2020,
    species: 'cat',
    category: 'infectologia',
    tags: ['FeLV', 'FIV', 'Retrovirus', 'Testagem', 'Vacinação', 'Seguimento'],
    pdfUrl: 'https://doi.org/10.1177/1098612X19895940',
    pdfFileName: 'doi-10.1177-1098612X19895940',
    storagePath: 'external/doi-10.1177-1098612X19895940',
    summary:
      'Diretrizes AAFP 2020 para testagem, interpretação, manejo e prevenção de FeLV e FIV em gatos. Define quando testar, como confirmar resultados discordantes, vacinação contra FeLV, manejo de positivos e comunicação com cuidadores.',
    keyPointsText:
      '• Testar todos os gatos novos e em risco; repetir FeLV em positivos com ELISA após 30 dias.\n• FIV: anticorpos indicam exposição; gatos positivos assintomáticos exigem seguimento, não eutanásia automática.\n• FeLV: viremia persistente define prognóstico; confirmar com teste confirmatório (IFA/PCR).\n• Vacina FeLV apenas para gatos com risco documentado de exposição.\n• Evitar imunossupressão desnecessária; esterilizar positivos para reduzir transmissão.',
    practicalApplicationText:
      'Testar na admissão → confirmar discordâncias → estadiar com hemograma, bioquímica, urinálise → vacinar FeLV se indicado → plano de seguimento semestral/anual conforme status.',
    appNotesText:
      'VIGENTE — referência principal para FeLV/FIV no ConsultaVET. PDF via DOI (acesso aberto J Feline Med Surg).',
    references: [
      {
        id: 'ref-aafp-retrovirus-2020',
        citationText:
          'Little S, Levy J, Hartmann K, et al. 2020 AAFP Feline Retrovirus Testing and Management Guidelines. J Feline Med Surg. 2020;22(1):5–30.',
        sourceType: 'Diretriz AAFP',
        url: 'https://doi.org/10.1177/1098612X19895940',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['leucemia-viral-felina', 'imunodeficiencia-felina-fiv'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-abcd-fip-2023',
    slug: 'abcd-fip-2023',
    title: 'Peritonite infecciosa felina — diretrizes ABCD',
    shortTitle: 'PIF — ABCD 2023',
    sourceOrganization: 'ABCD Europe',
    year: 2023,
    species: 'cat',
    category: 'infectologia',
    tags: ['PIF', 'FIP', 'FCoV', 'GS-441524', 'Efusão', 'Mutação S'],
    pdfUrl: 'https://doi.org/10.3390/v15091847',
    pdfFileName: 'doi-10.3390-v15091847',
    storagePath: 'external/doi-10.3390-v15091847',
    summary:
      'Diretrizes ABCD 2023 sobre diagnóstico, estadiamento e manejo da PIF. Contextualiza FCoV endêmico vs mutação S, formas efusiva/não efusiva/neurológica/oculares, e papel dos antivirais (GS-441524 e análogos) no tratamento contemporâneo.',
    keyPointsText:
      '• FCoV endêmico ≠ PIF; mutação S (ou equivalente) correlaciona-se com doença.\n• Efusão com proteína alta e globulinas elevadas: citologia + coronavírus/PCR orientam suspeita.\n• Formas neurológicas/oculares exigem amostra do compartimento afetado quando possível.\n• Antivirais (GS-441524) alteraram prognóstico; duração e monitorização conforme diretriz vigente.\n• Controle ambiental de FCoV reduz pressão infecciosa em multi-gatos.',
    practicalApplicationText:
      'Integrar clínica, proteínas, efusão, imagem e PCR → classificar forma → iniciar antiviral quando indicado e disponível → monitorar olho/SNC/rim → orientar manejo do grupo felino.',
    appNotesText:
      'VIGENTE — complementar com ABCD 2026 (atualização terapêutica) e AAFP 2022 (diagnóstico). Artigos em Viruses (MDPI, acesso aberto).',
    references: [
      {
        id: 'ref-abcd-fip-2023',
        citationText:
          'Tasker S, Hosie MJ, Hartmann K, et al. Feline Infectious Peritonitis: European Advisory Board on Cat Diseases Guidelines. Viruses. 2023;15(9):1847.',
        sourceType: 'Diretriz ABCD',
        url: 'https://doi.org/10.3390/v15091847',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['peritonite-infecciosa-felina'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-abcd-fip-tratamento-2026',
    slug: 'abcd-fip-tratamento-2026',
    title: 'Atualização terapêutica da PIF — ABCD 2026',
    shortTitle: 'PIF tratamento — ABCD 2026',
    sourceOrganization: 'ABCD Europe',
    year: 2026,
    species: 'cat',
    category: 'infectologia',
    tags: ['PIF', 'GS-441524', 'Remdesivir', 'Duração', 'Recidiva'],
    pdfUrl: 'https://doi.org/10.3390/v18040452',
    pdfFileName: 'doi-10.3390-v18040452',
    storagePath: 'external/doi-10.3390-v18040452',
    summary:
      'Atualização ABCD 2026 sobre tratamento da PIF com antivirais, incluindo evidências sobre duração de tratamento, formas neurológicas/oculares e monitorização de resposta.',
    keyPointsText:
      '• GS-441524 (e análogos) permanecem base do tratamento antiviral.\n• Duração pode ser individualizada conforme forma clínica e resposta laboratorial.\n• Monitorar peso, apetite, efusão, olho e SNC serialmente.\n• Recidiva exige reavaliação diagnóstica e novo ciclo quando indicado.',
    practicalApplicationText:
      'Confirmar PIF → escolher via/forma farmacêutica disponível → tratar por curso completo → reavaliar em 2–4 semanas → estender ou ajustar conforme resposta clínica/laboratorial.',
    appNotesText:
      'VIGENTE — usar junto com ABCD 2023 e AAFP 2022 diagnóstico.',
    references: [
      {
        id: 'ref-abcd-fip-2026',
        citationText:
          'Tasker S, Spiri AM, Hartmann K, et al. Update on Treatment of Feline Infectious Peritonitis: European Advisory Board on Cat Diseases (ABCD) Guidelines. Viruses. 2026;18(4):452.',
        sourceType: 'Diretriz ABCD',
        url: 'https://doi.org/10.3390/v18040452',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['peritonite-infecciosa-felina'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-aafp-fip-diagnostico-2022',
    slug: 'aafp-fip-diagnostico-2022',
    title: 'Diagnóstico de PIF — AAFP/EveryCat 2022',
    shortTitle: 'PIF diagnóstico — AAFP 2022',
    sourceOrganization: 'AAFP / EveryCat',
    year: 2022,
    species: 'cat',
    category: 'infectologia',
    tags: ['PIF', 'Diagnóstico', 'Efusão', 'PCR', 'Coronavírus'],
    pdfUrl: 'https://doi.org/10.1177/1098612X221120011',
    pdfFileName: 'doi-10.1177-1098612X221120011',
    storagePath: 'external/doi-10.1177-1098612X221120011',
    summary:
      'Diretrizes AAFP/EveryCat 2022 para diagnóstico de PIF: critérios clínico-laboratoriais, papel de efusão, imagem, PCR e diferenciais em gatos com suspeita de coronavirose sistêmica.',
    keyPointsText:
      '• Não existe teste único confirmatório em vida para todas as formas.\n• Efusão com características clássicas + gato jovem + globulinas altas elevam probabilidade.\n• PCR em efusão/sangue deve ser interpretada com fenótipo clínico.\n• Excluir diferenciais (linfoma, toxoplasma, bactérias) antes de rotular definitivamente.',
    practicalApplicationText:
      'Triagem clínica → hemograma/proteínas → efusão (se presente) → imagem → PCR/mutacao S conforme disponibilidade → integrar achados antes de iniciar antiviral.',
    appNotesText:
      'VIGENTE — base diagnóstica; combinar com ABCD 2023/2026 para tratamento.',
    references: [
      {
        id: 'ref-aafp-fip-dx-2022',
        citationText:
          'Thayer V, Gogolski S, Felten S, et al. 2022 AAFP/EveryCat Feline Infectious Peritonitis Diagnosis Guidelines. J Feline Med Surg. 2022;24(9):905–933.',
        sourceType: 'Diretriz AAFP',
        url: 'https://doi.org/10.1177/1098612X221120011',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['peritonite-infecciosa-felina'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
];
