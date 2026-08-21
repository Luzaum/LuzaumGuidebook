type ConsensusSeed = Record<string, any>;

export const sepseAhimConsensosSeed: ConsensusSeed[] = [
  {
    id: 'con-veccs-sepse-definicao-2026',
    slug: 'veccs-sepse-definicao-caes-gatos-2026',
    title: 'Sepse em cães e gatos — definição e critérios clínicos',
    shortTitle: 'Sepse — definição e diagnóstico',
    sourceOrganization: 'VECCS / JVECC',
    year: 2026,
    species: 'both',
    category: 'infectologia',
    tags: ['Sepse', 'Disfunção orgânica', 'Infecção', 'SIRS', 'Escore de gravidade'],
    pdfUrl: 'https://onlinelibrary.wiley.com/doi/10.1111/vec.70129',
    pdfFileName: 'doi-10.1111-vec.70129',
    storagePath: 'external/doi-10.1111-vec.70129',
    summary:
      'Consenso veterinário de 2026 que redefine sepse em cães e gatos como síndrome potencialmente fatal decorrente de resposta desregulada do hospedeiro à infecção, com disfunção orgânica. Infecção associada apenas a critérios de SIRS não basta para o diagnóstico.',
    articleSummaryRichText:
      '<p>O consenso aproxima a medicina veterinária do raciocínio contemporâneo da sepse: o diagnóstico requer <strong>infecção e disfunção orgânica</strong>. SIRS pode sinalizar inflamação e ajudar na triagem, mas não define sepse isoladamente. O documento recomenda avaliação formal de gravidade com escores estruturados e coleta dos parâmetros fisiológicos e laboratoriais necessários para reconhecer disfunção orgânica.</p>',
    keyPointsText:
      '• Sepse = resposta desregulada à infecção com disfunção orgânica potencialmente fatal.\n• Infecção + SIRS, sem disfunção orgânica, não é suficiente.\n• Procurar e documentar disfunção cardiovascular, respiratória, renal, neurológica, hepática, hematológica e de coagulação.\n• Usar avaliação estruturada de gravidade e repetir medidas, pois a condição é dinâmica.\n• A definição organiza reconhecimento e estratificação; não deve atrasar cultura, controle do foco ou estabilização.',
    practicalApplicationText:
      'No ConsultaVet, usar esta ficha como porta de entrada para o paciente com infecção suspeita ou confirmada: 1) identificar o foco e colher amostras quando isso não atrasar o tratamento; 2) avaliar perfusão, pressão, estado mental, oxigenação, diurese, hemograma, bioquímica, lactato e coagulação conforme o caso; 3) registrar a disfunção orgânica; 4) reavaliar em série; 5) relacionar a ficha da doença de base e o manejo emergencial. SIRS permanece alerta de triagem, não rótulo diagnóstico final.',
    appNotesText:
      'APLICAÇÃO NO APP\n- Substitui a equivalência antiga “SIRS + infecção = sepse”.\n- Deve aparecer relacionado a doenças infecciosas que podem evoluir com disfunção orgânica, como babesiose e mastite séptica.\n- Integrar com Manejo emergencial, antimicrobianos e monitorização; o consenso não substitui protocolo terapêutico individual.',
    references: [{
      id: 'ref-veccs-sepse-2026',
      citationText: 'Goggs R, Cortellini S, DeClue AE, et al. Sepsis in Dogs and Cats—Consensus Definition and Clinical Criteria. J Vet Emerg Crit Care. 2026. doi:10.1111/vec.70129.',
      sourceType: 'Consenso / revisão sistemática',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42438185/',
      notes: 'Definição e identificação clínica da sepse em cães e gatos.',
      evidenceLevel: 'Consenso de especialistas',
    }],
    relatedDiseaseSlugs: ['babesiose-canina', 'mastite-caes-gatos'],
    relatedMedicationSlugs: ['amoxicilina-clavulanato'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-veccs-choque-septico-2026',
    slug: 'veccs-choque-septico-prognostico-2026',
    title: 'Choque séptico e prognóstico em cães e gatos com sepse',
    shortTitle: 'Choque séptico e prognóstico',
    sourceOrganization: 'VECCS / JVECC',
    year: 2026,
    species: 'both',
    category: 'emergencia-terapia-intensiva',
    tags: ['Choque séptico', 'Hipotensão', 'Lactato', 'Hipoperfusão', 'MODS', 'Prognóstico'],
    pdfUrl: 'https://onlinelibrary.wiley.com/doi/10.1111/vec.70130',
    pdfFileName: 'doi-10.1111-vec.70130',
    storagePath: 'external/doi-10.1111-vec.70130',
    summary:
      'Documento complementar ao consenso de sepse de 2026. Define choque séptico como o subconjunto de maior mortalidade, marcado por disfunção cardiovascular e anormalidades metabólicas compatíveis com hipoperfusão apesar de ressuscitação volêmica adequada, e revisa variáveis prognósticas.',
    keyPointsText:
      '• Choque séptico é um subconjunto da sepse, associado a mortalidade maior.\n• Procurar hipotensão persistente, necessidade de suporte vasoativo, hiperlactatemia e progressão da disfunção orgânica após ressuscitação adequada.\n• Lactato deve ser interpretado em contexto e em tendência; valor isolado não resume perfusão nem prognóstico.\n• Hemograma, bioquímica, coagulação, cálcio ionizado, proteína C, antitrombina, citocinas e proteínas de fase aguda têm utilidade e limitações distintas.\n• Escores de gravidade e disfunção múltipla ajudam a estratificar risco, sem substituir julgamento clínico.',
    practicalApplicationText:
      'Após reconhecer sepse no ConsultaVet, abrir esta ficha quando houver instabilidade: documentar resposta a fluidos, pressão arterial, lactato seriado, perfusão periférica, diurese, estado mental, oxigenação e evolução das disfunções. Vincular ao módulo de Manejo emergencial para ressuscitação e monitorização. Hipotensão ou lactato elevado devem provocar reavaliação do foco, volume efetivo, necessidade de vasopressor e outras causas de hipoperfusão.',
    appNotesText:
      'APLICAÇÃO NO APP\n- Continuação obrigatória da ficha de definição de sepse.\n- Usar para estratificação, monitorização seriada e comunicação prognóstica.\n- Não transformar um único valor de lactato ou pressão em diagnóstico automático.',
    references: [{
      id: 'ref-veccs-choque-2026',
      citationText: 'Goggs R, Cortellini S, DeClue AE, et al. Septic Shock and Prognosis in Dogs and Cats With Sepsis—Consensus Definition and Clinical Criteria. J Vet Emerg Crit Care. 2026. doi:10.1111/vec.70130.',
      sourceType: 'Consenso / revisão sistemática',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42438321/',
      notes: 'Choque séptico, disfunção múltipla e marcadores prognósticos.',
      evidenceLevel: 'Consenso de especialistas',
    }],
    relatedDiseaseSlugs: ['babesiose-canina', 'mastite-caes-gatos'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-acvim-ahim-diagnostico-2019',
    slug: 'acvim-ahim-diagnostico-caes-gatos-2019',
    title: 'Diagnóstico da anemia hemolítica imunomediada em cães e gatos',
    shortTitle: 'AHIM — diagnóstico',
    sourceOrganization: 'ACVIM',
    year: 2019,
    species: 'both',
    category: 'hematologia-imunologia',
    tags: ['AHIM', 'IMHA', 'Hemólise', 'Esferócitos', 'Coombs', 'Autoaglutinação'],
    pdfUrl: 'https://onlinelibrary.wiley.com/doi/full/10.1111/jvim.15441',
    pdfFileName: 'doi-10.1111-jvim.15441',
    storagePath: 'external/doi-10.1111-jvim.15441',
    summary:
      'Consenso ACVIM vigente para diagnosticar AHIM em cães e gatos. O raciocínio combina confirmação de anemia, evidência de hemólise e evidência de destruição imunomediada, seguido de investigação de gatilhos infecciosos, neoplásicos, farmacológicos e inflamatórios.',
    keyPointsText:
      '• Confirmar anemia e classificar a resposta regenerativa.\n• Demonstrar hemólise por achados como hiperbilirrubinemia/bilirrubinúria, hemoglobinemia/hemoglobinúria e alterações compatíveis.\n• Demonstrar mecanismo imune com esferocitose, autoaglutinação persistente após lavagem, teste de antiglobulina direta/Coombs ou citometria, conforme o caso.\n• Teste de aglutinação salina deve ser tecnicamente adequado; rouleaux e aglutinação fraca podem confundir.\n• Investigar doença associada antes de classificar como não associativa: agentes infecciosos, neoplasia, fármacos, vacinação e inflamação.',
    practicalApplicationText:
      'No ConsultaVet, a ficha funciona como checklist diagnóstico: anemia → hemólise → imunomediação → busca de causa associada. Em babesiose e hemoplasmas, não atribuir automaticamente toda anemia regenerativa à AHIM primária; confirmar o agente e interpretar esferócitos, aglutinação e Coombs no contexto. Registrar força da evidência e exames pendentes.',
    appNotesText:
      'APLICAÇÃO NO APP\n- Relacionado às fichas de babesiose e micoplasmoses hemotrópicas, importantes diferenciais/gatilhos infecciosos.\n- O diagnóstico exige combinação de evidências; nenhum achado isolado deve fechar AHIM em todos os pacientes.\n- Abrange cães e gatos.',
    references: [{
      id: 'ref-acvim-ahim-dx-2019',
      citationText: 'Garden OA, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats. J Vet Intern Med. 2019;33:313-334. doi:10.1111/jvim.15441.',
      sourceType: 'Consenso ACVIM',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30806491/',
      notes: 'Critérios diagnósticos e investigação de causas associadas.',
      evidenceLevel: 'Consenso de especialistas',
    }],
    relatedDiseaseSlugs: ['babesiose-canina', 'micoplasmoses-hemotropicas'],
    relatedMedicationSlugs: ['prednisolona'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-acvim-ahim-tratamento-2019',
    slug: 'acvim-ahim-tratamento-canino-2019',
    title: 'Tratamento da anemia hemolítica imunomediada em cães',
    shortTitle: 'AHIM — tratamento canino',
    sourceOrganization: 'ACVIM',
    year: 2019,
    species: 'dog',
    category: 'hematologia-imunologia',
    tags: ['AHIM', 'Imunossupressão', 'Transfusão', 'Tromboprofilaxia', 'Desmame', 'Recaída'],
    pdfUrl: 'https://onlinelibrary.wiley.com/doi/full/10.1111/jvim.15463',
    pdfFileName: 'doi-10.1111-jvim.15463',
    storagePath: 'external/doi-10.1111-jvim.15463',
    summary:
      'Consenso ACVIM com 46 recomendações para tratamento da AHIM em cães. Abrange estabilização e transfusão, glicocorticoides, segundo imunossupressor, tromboprofilaxia, monitorização, redução gradual, recaída, efeitos adversos e terapias de resgate.',
    keyPointsText:
      '• Estabilizar e transfundir conforme sinais de hipóxia e necessidade clínica, não por um número isolado.\n• Prednisona/prednisolona é base frequente da imunossupressão; dexametasona pode ser usada quando a via oral não é apropriada.\n• Individualizar segundo imunossupressor (como ciclosporina, micofenolato, azatioprina ou leflunomida) pela gravidade, resposta e toxicidade.\n• Avaliar tromboprofilaxia, pois tromboembolismo é complicação importante; o consenso discute clopidogrel e anticoagulantes.\n• Monitorar resposta, infecção oportunista, mielossupressão e toxicidade; reduzir gradualmente após controle sustentado.\n• Separar recomendações fortes das sugestões apoiadas por evidência limitada.',
    practicalApplicationText:
      'No ConsultaVet, usar depois de confirmar AHIM e investigar causa associada. Vincular prednisolona e o módulo de transfusão; documentar hematócrito/PCV em tendência, reticulócitos, bilirrubina, sinais de hemólise, necessidade transfusional, tromboprofilaxia, eventos adversos e plano de desmame. Em AHIM secundária a infecção, tratar o gatilho e ponderar cuidadosamente a imunossupressão.',
    appNotesText:
      'APLICAÇÃO NO APP\n- Integrar com Transfusão sanguínea e ficha da prednisolona.\n- O consenso terapêutico é específico para cães; não extrapolar automaticamente doses e recomendações para gatos.\n- Destacar nível de força de cada recomendação e necessidade de individualização.',
    references: [{
      id: 'ref-acvim-ahim-tx-2019',
      citationText: 'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33:1141-1172. doi:10.1111/jvim.15463.',
      sourceType: 'Consenso ACVIM',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30847984/',
      notes: 'Tratamento, tromboprofilaxia, monitorização e recaída em cães.',
      evidenceLevel: 'Consenso de especialistas',
    }],
    relatedDiseaseSlugs: ['babesiose-canina'],
    relatedMedicationSlugs: ['prednisolona'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
];
