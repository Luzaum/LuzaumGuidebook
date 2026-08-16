type EndocrinologyConsensusSeed = Record<string, any>;

const CONSENSUS_DISCLAIMER =
  'Recomendação baseada em consenso; adaptar ao paciente, à disponibilidade local e ao registro brasileiro do medicamento.';

export const endocrinologiaConsensosSeed: EndocrinologyConsensusSeed[] = [
  {
    id: 'con-aaha-diabetes-felino-2026',
    slug: 'aaha-diabetes-felino-2026',
    title: 'Diabetes mellitus felino',
    shortTitle: 'Diabetes felino — AAHA 2026',
    sourceOrganization: 'AAHA',
    year: 2026,
    species: 'cat',
    category: 'endocrinologia',
    tags: ['Diabetes mellitus', 'SGLT2', 'Insulina', 'CGM', 'CAD euglicêmica', 'Remissão'],
    pdfUrl: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/',
    pdfFileName: '2026-aaha-diabetes-management-guidelines-for-cats',
    storagePath: 'external/aaha-diabetes-felino-2026',
    summary:
      'Guideline AAHA 2026 para diagnóstico, seleção entre insulina e inibidor de SGLT2, monitorização, remissão e manejo de CAD euglicêmica em gatos.',
    articleSummaryRichText:
      '<p>Diretriz prática principal para o manejo contemporâneo do diabetes mellitus felino.</p>',
    keyPointsText:
      'DIAGNÓSTICO E ESCOLHA TERAPÊUTICA\n- Confirmar hiperglicemia persistente com sinais compatíveis e descartar hiperglicemia de estresse.\n- Pesquisar comorbidades e causas de resistência insulínica antes de classificar o paciente como não regulado.\n- Inibidor de SGLT2 é opção apenas para gato recém-diagnosticado, estável, hidratado, alimentando-se e sem cetose relevante.\n- Gato doente, hiporéxico, desidratado ou cetótico deve ser avaliado para insulinoterapia e complicações.\n\nMONITORIZAÇÃO\n- Com SGLT2, concentrar reavaliações nos dias 2–3, 7, 14 e 30; depois, em geral, a cada três meses.\n- Beta-hidroxibutirato sanguíneo é preferível à cetonúria para detectar cetose precocemente.\n- CGM e curvas domiciliares são preferíveis às curvas hospitalares em gatos.\n- Monitorar sinais, peso, alimentação e qualidade de vida, não apenas números.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Confirmar diabetes e avaliar hidratação, alimentação, cetonas, peso e comorbidades.\n2. Separar o gato estável candidato a SGLT2 daquele que necessita de insulina ou internação.\n3. Se usar SGLT2, orientar o tutor a interromper a medicação e procurar atendimento diante de inapetência, vômito, letargia, desidratação ou cetonas.\n4. Se usar insulina, definir metas clínicas, plano de hipoglicemia, dieta viável e monitorização domiciliar.\n5. Reavaliar remissão quando a necessidade de insulina cair, sem buscar uma curva perfeita às custas de hipoglicemia.',
    appNotesText:
      `STATUS: VIGENTE — fonte prática principal para diabetes felino.\n\nO maior risco específico dos inibidores de SGLT2 é cetose/CAD euglicêmica, que pode ocorrer sem hiperglicemia acentuada. Conferir bula, contraindicações e registro do produto utilizado no Brasil.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-aaha-diabetes-felino-2026',
        citationText: 'American Animal Hospital Association. 2026 AAHA Diabetes Management Guidelines for Cats.',
        sourceType: 'Guideline',
        url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/',
        notes: 'Fonte oficial com seções, algoritmos e materiais de apoio.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['diabetes-mellitus-felina'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-icatcare-diabetes-felino-2025',
    slug: 'icatcare-diabetes-felino-2025',
    title: 'Diabetes mellitus felino — casos simples e complexos',
    shortTitle: 'Diabetes felino — iCatCare 2025',
    sourceOrganization: 'iCatCare',
    year: 2025,
    species: 'cat',
    category: 'endocrinologia',
    tags: ['Diabetes mellitus', 'Hipersomatotropismo', 'Remissão', 'SGLT2', 'Insulina', 'Comorbidades'],
    pdfUrl: 'https://doi.org/10.1177/1098612X251399103',
    pdfFileName: 'icatcare-diabetes-felino-2025',
    storagePath: 'external/icatcare-diabetes-felino-2025',
    summary:
      'Consenso iCatCare 2025 aprofundado sobre fisiopatologia, insulinorresistência, hipersomatotropismo, tratamento, monitorização, remissão e recaída do diabetes felino.',
    articleSummaryRichText:
      '<p>Referência aprofundada para diabetes felino rotineiro e complexo, com forte ênfase em comorbidades, fisiopatologia e viabilidade do plano para o cuidador.</p>',
    keyPointsText:
      'FENÓTIPO E COMORBIDADES\n- A maioria dos gatos apresenta fenótipo semelhante ao diabetes tipo 2 humano; hipersomatotropismo é causa relevante de insulinorresistência.\n- Considerar hipersomatotropismo diante de controle difícil, necessidade crescente de insulina, ganho de peso, organomegalia, estridor ou alterações cardiovasculares.\n- Dose de insulina não muito elevada não exclui hipersomatotropismo; IGF-1 deve ser interpretado no contexto clínico e laboratorial.\n\nREMISSÃO E MONITORIZAÇÃO\n- Remissão: ausência de necessidade de insulina exógena por pelo menos quatro semanas, sem manifestações clínicas.\n- Controle glicêmico precoce, redução de glicotoxicidade, dieta apropriada e tratamento da insulinorresistência favorecem remissão.\n- Frutosamina reflete exposição recente; HbA1c, período mais longo. Nenhuma identifica adequadamente hipoglicemia breve.\n- CGM, peso, sinais clínicos, massa muscular e rotina do tutor devem orientar ajustes.',
    practicalApplicationText:
      'Usar este consenso quando o caso exigir investigação além do algoritmo inicial: documentar fenótipo, tempo desde o diagnóstico, resposta à insulina, dieta, peso/músculo, comorbidades, medicamentos e capacidade do tutor. Em controle difícil, revisar técnica e adesão antes de escalar dose; depois pesquisar pancreatite, DRC, infecção, doença dentária e endocrinopatias, especialmente hipersomatotropismo.',
    appNotesText:
      `STATUS: VIGENTE — referência aprofundada e complementar ao AAHA 2026.\n\nO melhor protocolo biológico pode falhar se não for viável para o tutor. Registrar objetivo terapêutico individual, capacidade de monitorização e impacto na qualidade de vida.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-icatcare-diabetes-felino-2025',
        citationText: 'Taylor S. et al. iCatCare 2025 consensus guidelines on the diagnosis and management of diabetes mellitus in cats. J Feline Med Surg. 2025;27:1–37.',
        sourceType: 'Consenso',
        url: 'https://doi.org/10.1177/1098612X251399103',
        notes: 'Consenso internacional para casos rotineiros e complexos.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['diabetes-mellitus-felina'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-aaha-endocrinopatias-caes-gatos-2023',
    slug: 'aaha-endocrinopatias-caes-gatos-2023',
    title: 'Endocrinopatias selecionadas de cães e gatos',
    shortTitle: 'Endocrinopatias — AAHA 2023',
    sourceOrganization: 'AAHA',
    year: 2023,
    species: 'both',
    category: 'endocrinologia',
    tags: ['Hipotireoidismo', 'Cushing', 'Addison', 'Hipertireoidismo', 'Hiperaldosteronismo'],
    pdfUrl: 'https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/resources/aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines.pdf',
    pdfFileName: 'aaha-selected-endocrinopathies-2023.pdf',
    storagePath: 'external/aaha-selected-endocrinopathies-2023.pdf',
    summary:
      'Guideline AAHA 2023 com algoritmos para hipotireoidismo, hipercortisolismo e hipoadrenocorticismo caninos e hipertireoidismo felino, além de endocrinopatias felinas menos comuns.',
    articleSummaryRichText:
      '<p>Referência geral prática para sete endocrinopatias, estruturada por apresentação clínica, confirmação diagnóstica, tratamento e monitorização.</p>',
    keyPointsText:
      'CÃES\n- Hipotireoidismo: T4 baixo isolado não confirma; integrar sinais, doença não tireoidiana, medicamentos, T4 livre e TSH.\n- Hipercortisolismo: testar somente com suspeita clínica; confirmar antes de definir origem e tratamento.\n- Hipoadrenocorticismo: cortisol basal >2 µg/dL torna o diagnóstico muito improvável; valor baixo exige teste de estimulação com ACTH.\n\nGATOS\n- Hipertireoidismo: tratar todo gato comprovadamente hipertireoideo e monitorar T4, rim, pressão, peso e massa muscular.\n- Hiperaldosteronismo: suspeitar diante de hipocalemia, fraqueza/ventroflexão e hipertensão; integrar aldosterona e imagem adrenal.\n- Hipotireoidismo e hipercortisolismo felinos são abordados de forma resumida e exigem correlação cuidadosa.',
    practicalApplicationText:
      'Usar os algoritmos por apresentação, evitando diagnóstico baseado em um único hormônio. Em cães, separar síndrome clínica, confirmação e etiologia. Em gatos hipertireoideos, planejar tratamento sem ignorar DRC mascarada ou hipotireoidismo iatrogênico. Registrar pressão arterial, função renal e comorbidades quando houver doença adrenal ou tireoidiana.',
    appNotesText:
      `STATUS: VIGENTE — principal referência prática geral para as endocrinopatias cobertas; diabetes possui guidelines próprios.\n\nEvitar rótulos automáticos como “HAC atípico”. Resultado hormonal deve ser interpretado com probabilidade pré-teste, doença concomitante, fármacos e método laboratorial.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-aaha-endocrinopatias-2023',
        citationText: 'Bugbee A. et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59:113–135.',
        sourceType: 'Guideline',
        url: 'https://doi.org/10.5326/JAAHA-MS-7368',
        notes: 'Algoritmos para quatro endocrinopatias principais e síntese de três endocrinopatias felinas menos comuns.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [
      'hipotireoidismo-adquirido-caes-gatos',
      'hipotireoidismo-congenito-caes-gatos',
      'sindrome-cushing-caes',
      'sindrome-cushing-gatos',
      'hipoadrenocorticismo-addison',
      'hipertireoidismo-felino',
    ],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-aaha-diabetes-caes-gatos-2018-2022',
    slug: 'aaha-diabetes-caes-gatos-2018-2022',
    title: 'Diabetes mellitus em cães e gatos',
    shortTitle: 'Diabetes — AAHA 2018/2022',
    sourceOrganization: 'AAHA',
    year: 2022,
    species: 'both',
    category: 'endocrinologia',
    tags: ['Diabetes mellitus', 'Insulina', 'CGM', 'Cães', 'Gatos'],
    pdfUrl: 'https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/diabetes/2018-aaha-diabetes-management-guidelines-2022-update.pdf',
    pdfFileName: '2018-aaha-diabetes-management-guidelines-2022-update.pdf',
    storagePath: 'external/2018-aaha-diabetes-management-guidelines-2022-update.pdf',
    summary:
      'Guideline AAHA 2018 atualizado em 2022, ainda central para diabetes canino e mantido como referência histórica/complementar para gatos.',
    articleSummaryRichText:
      '<p>Diretriz prática para diagnóstico, insulinoterapia, dieta, monitorização e investigação do paciente diabético não regulado.</p>',
    keyPointsText:
      'DIABETES CANINO\n- Diabetes clínico em cães geralmente exige insulinoterapia permanente; remissão é incomum.\n- Insulina lente suína em torno de 0,25 U/kg a cada 12 horas é a recomendação clássica de primeira linha, com ajuste individual.\n- Cadelas inteiras devem ser castradas devido à resistência insulínica do diestro.\n- Antes de investigar resistência verdadeira, revisar seringa, concentração, homogeneização, armazenamento, aplicação, horários, dieta e duplicação/omissão de doses.\n\nMONITORIZAÇÃO\n- Priorizar sinais clínicos, peso, ingestão de água, hipoglicemia e dados domiciliares/CGM.\n- Pesquisar hipercortisolismo, pancreatite, infecção, obesidade, doença periodontal, doença renal e medicamentos quando persistir desregulação.',
    practicalApplicationText:
      'No cão não regulado, tornar obrigatória a sequência: confirmar técnica e produto; revisar rotina e dieta; avaliar curva/CGM junto dos sinais; somente então pesquisar insulinorresistência e ajustar dose. Em cadela inteira, incluir estado reprodutivo e castração no plano. Para gatos, usar preferencialmente AAHA 2026 e iCatCare 2025.',
    appNotesText:
      `STATUS: VIGENTE para o componente canino; HISTÓRICO/SUBSTITUÍDO para o componente felino.\n\nA atualização de 2022 incorporou CGM e dados adicionais sobre PZI. Não transportar automaticamente doses, metas ou escolhas de insulina entre espécies.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-aaha-diabetes-2018-2022',
        citationText: 'Rucinsky R. et al. 2018 AAHA Diabetes Management Guidelines for Dogs and Cats, updated 2022.',
        sourceType: 'Guideline',
        url: 'https://www.aaha.org/resources/2018-aaha-diabetes-management-guideline-for-dogs-and-cats/',
        notes: 'A página oficial informa as atualizações incorporadas em 2022.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['diabetes-mellitus-canina', 'diabetes-mellitus-felina'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente em cães',
  },
  {
    id: 'con-aafp-hipertireoidismo-felino-2016',
    slug: 'aafp-hipertireoidismo-felino-2016',
    title: 'Hipertireoidismo felino',
    shortTitle: 'Hipertireoidismo — AAFP 2016',
    sourceOrganization: 'AAFP / FelineVMA',
    year: 2016,
    species: 'cat',
    category: 'endocrinologia',
    tags: ['Hipertireoidismo', 'T4', 'Radioiodo', 'Metimazol', 'DRC'],
    pdfUrl: 'https://doi.org/10.1177/1098612X16643252',
    pdfFileName: 'aafp-hipertireoidismo-felino-2016',
    storagePath: 'external/aafp-hipertireoidismo-felino-2016',
    summary:
      'Guideline AAFP 2016 que classifica gatos suspeitos em seis grupos clínico-laboratoriais e compara radioiodo, antitireoidianos, cirurgia e dieta restrita em iodo.',
    articleSummaryRichText:
      '<p>Referência complementar para reduzir falsos negativos em doença inicial e falsos positivos por T4 livre em gatos eutireoideos doentes.</p>',
    keyPointsText:
      'SEIS GRUPOS DIAGNÓSTICOS\n- Grupo 1 — doença clínica clássica: sinais compatíveis, T4 elevado e nenhuma doença concorrente identificada; tratar o hipertireoidismo.\n- Grupo 2 — possível hipertireoidismo com provável doença não tireoidiana: sinais compatíveis e T4 dentro do intervalo; repetir T4 e T4 livre em 2–4 semanas e investigar diferenciais.\n- Grupo 3 — tireoide aumentada sem doença clínica: sem sinais, T4 dentro do intervalo e glândula aumentada; acompanhar sinais e repetir T4 em 6 meses.\n- Grupo 4 — hipertireoidismo subclínico: sem sinais evidentes, T4 elevado e alguns achados físicos sugestivos; repetir T4 em 1–2 semanas e tratar se permanecer elevado.\n- Grupo 5 — doença clínica com comorbidade confirmada: sinais e T4 elevado com uma ou mais doenças concorrentes; tratar o hipertireoidismo e manejar as comorbidades.\n- Grupo 6 — clinicamente normal: sem sinais ou nódulo palpável, mas com T4 elevado no rastreamento; confirmar T4 e tratar se a elevação persistir.\n\nINTERPRETAÇÃO E SEGUIMENTO\n- T4 livre aumenta sensibilidade, mas pode perder especificidade; não diagnosticar apenas por T4 livre elevado.\n- Repetição do T4, TSH, cintilografia ou testes adicionais podem ser necessários quando clínica e T4 divergem.\n- Recomenda tratar todo gato comprovadamente hipertireoideo, inclusive com comorbidades.\n- Monitorar tireotoxicose cardiovascular, pressão, função renal e hipotireoidismo iatrogênico.',
    practicalApplicationText:
      'Classificar o paciente no grupo clínico-laboratorial antes de avançar. Confirmar doença quando a apresentação for discordante; depois escolher entre terapia definitiva e controle reversível conforme comorbidades, disponibilidade e preferência do tutor. Reavaliar T4, TSH quando disponível, creatinina/SDMA, pressão, peso e massa muscular.',
    appNotesText:
      `STATUS: COMPLEMENTAR — cruzar recomendações terapêuticas com AAHA 2023 e terminologia ALIVE Cycle 3.\n\nO risco de revelar DRC após tratamento não justifica manter o gato tireotóxico. Evitar hipotireoidismo iatrogênico persistente, especialmente no paciente azotêmico.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-aafp-hipertireoidismo-2016',
        citationText: 'Carney H. C. et al. 2016 AAFP Guidelines for the Management of Feline Hyperthyroidism. J Feline Med Surg. 2016;18:400–416.',
        sourceType: 'Guideline',
        url: 'https://doi.org/10.1177/1098612X16643252',
        notes: 'Classificação clínica em seis grupos e comparação das modalidades terapêuticas.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['hipertireoidismo-felino'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Complementar',
  },
  {
    id: 'con-acvim-hipercortisolismo-canino-2012',
    slug: 'acvim-hipercortisolismo-canino-2012',
    title: 'Diagnóstico do hipercortisolismo canino espontâneo',
    shortTitle: 'Hipercortisolismo — ACVIM 2012',
    sourceOrganization: 'ACVIM',
    year: 2012,
    species: 'dog',
    category: 'endocrinologia',
    tags: ['Cushing', 'LDDST', 'ACTH', 'UCCR', 'Incidentaloma adrenal'],
    pdfUrl: 'https://doi.org/10.1111/jvim.12192',
    pdfFileName: 'acvim-hipercortisolismo-canino-2012',
    storagePath: 'external/acvim-hipercortisolismo-canino-2012',
    summary:
      'Consenso ACVIM focado na indicação e interpretação dos testes para hipercortisolismo canino espontâneo e na diferenciação de origem após confirmação.',
    articleSummaryRichText:
      '<p>Documento diagnóstico complementar que enfatiza probabilidade pré-teste, limitações dos testes e impacto de doença não adrenal.</p>',
    keyPointsText:
      'QUANDO TESTAR\n- Testar somente diante de suspeita clínica consistente; FA elevada ou massa adrenal incidental, isoladamente, não confirmam a síndrome.\n- Doença aguda, dor, estresse, hospitalização, hepatopatia e diabetes descontrolado podem produzir resultados enganosos.\n\nESCOLHA DO TESTE\n- LDDST: alta sensibilidade e bom teste inicial em muitos pacientes.\n- ACTHST: menor sensibilidade para doença espontânea, mas útil na forma iatrogênica e para avaliar reserva adrenal.\n- UCCR: resultado normal ajuda a excluir; resultado alto tem baixa especificidade e não confirma sozinho.\n- ACTH endógeno e imagem auxiliam a definir origem somente depois da confirmação.',
    practicalApplicationText:
      'Aplicar uma sequência obrigatória: 1) confirmar manifestações compatíveis; 2) estabilizar doença concomitante quando possível; 3) escolher o teste de triagem de acordo com o caso; 4) interpretar junto da probabilidade pré-teste; 5) somente após confirmar, diferenciar origem com ACTH endógeno e imagem. Em incidentaloma, caracterizar massa, invasão, adrenal contralateral, produção hormonal e risco cirúrgico.',
    appNotesText:
      `STATUS: COMPLEMENTAR — usar com AAHA 2023 e ALIVE Cycle 2.\n\nÉ um consenso de diagnóstico, não de tratamento. Nenhum teste é perfeito e nenhum resultado deve substituir o contexto clínico.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-hac-2012',
        citationText: 'Behrend E. N. et al. Diagnosis of Spontaneous Canine Hyperadrenocorticism: 2012 ACVIM Consensus Statement. J Vet Intern Med. 2013;27:1292–1304.',
        sourceType: 'Consenso',
        url: 'https://doi.org/10.1111/jvim.12192',
        notes: 'Publicado no periódico em 2013; o consenso é identificado pelo fórum de 2012.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['sindrome-cushing-caes', 'sindrome-cushing-gatos'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Complementar',
  },
  {
    id: 'con-alive-diabetes-cycle-1-2022',
    slug: 'alive-diabetes-cycle-1-2022',
    title: 'ALIVE Cycle 1 — terminologia do diabetes mellitus',
    shortTitle: 'ALIVE 1 — Diabetes',
    sourceOrganization: 'ESVE / SCE',
    year: 2022,
    species: 'both',
    category: 'endocrinologia',
    tags: ['ALIVE', 'Terminologia', 'Diabetes', 'Remissão', 'Insulinorresistência'],
    pdfUrl: 'https://doi.org/10.1016/j.tvjl.2022.105910',
    pdfFileName: 'alive-diabetes-cycle-1-2022',
    storagePath: 'external/alive-diabetes-cycle-1-2022',
    summary:
      'Consenso ALIVE Cycle 1 que padroniza definições, critérios diagnósticos e caracterização do diabetes mellitus em cães e gatos.',
    articleSummaryRichText:
      '<p>Documento de linguagem padronizada para registro clínico, pesquisa e comparação de desfechos; não é protocolo terapêutico.</p>',
    keyPointsText:
      'DEFINIÇÕES PADRONIZADAS\n- Diabetes mellitus, diabetes clínico e apresentações sem sinais clássicos.\n- Critérios diagnósticos específicos para cães e gatos.\n- Deficiência de insulina, resistência insulínica e classificação etiológica.\n- Controle glicêmico, remissão, recaída e fatores que alteram resposta.\n\nCARACTERIZAÇÃO\n- Recomenda checklists no diagnóstico para registrar sinais, hiperglicemia, glicosúria, cetose, tratamento, comorbidades e fatores diabetogênicos.\n- Distingue presença da doença, manifestação clínica e estado terapêutico.',
    practicalApplicationText:
      'No ConsultaVet, evitar um único campo “diabetes: sim/não”. Registrar espécie, sinais, persistência da hiperglicemia, glicosúria, cetose, tratamento, necessidade insulínica, suspeita de resistência, remissão, recaída e doença causadora/agravante. Usar as definições como vocabulário de dados; a conduta deve vir dos guidelines terapêuticos atuais.',
    appNotesText:
      `STATUS: TERMINOLOGIA — não prescreve medicamento nem substitui guideline terapêutico.\n\nQuando houver conflito de definição sobre cetose, CAD, CAD euglicêmica ou remissão, consultar também as atualizações do ALIVE Cycle 3.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-alive-cycle-1',
        citationText: 'Niessen S. J. M. et al. Agreeing Language in Veterinary Endocrinology (ALIVE): Diabetes mellitus. Vet J. 2022;289:105910.',
        sourceType: 'Consenso de terminologia',
        url: 'https://doi.org/10.1016/j.tvjl.2022.105910',
        notes: 'Definições por método Delphi modificado.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['diabetes-mellitus-canina', 'diabetes-mellitus-felina'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Terminologia',
  },
  {
    id: 'con-alive-adrenais-cycle-2-2025',
    slug: 'alive-adrenais-cycle-2-2025',
    title: 'ALIVE Cycle 2 — Cushing e hipoadrenocorticismo',
    shortTitle: 'ALIVE 2 — Adrenais',
    sourceOrganization: 'ESVE / SCE',
    year: 2025,
    species: 'both',
    category: 'endocrinologia',
    tags: ['ALIVE', 'Terminologia', 'Cushing', 'Hipoadrenocorticismo', 'Crise adrenal'],
    pdfUrl: 'https://doi.org/10.3390/vetsci12080761',
    pdfFileName: 'alive-adrenais-cycle-2-2025',
    storagePath: 'external/alive-adrenais-cycle-2-2025',
    summary:
      'Consenso ALIVE Cycle 2 que padroniza 35 conceitos de síndrome de Cushing, hipercortisolismo, hipoadrenocorticismo e crise adrenal.',
    articleSummaryRichText:
      '<p>Vocabulário estruturado para separar síndrome clínica, etiologia, critérios diagnósticos e estado terapêutico das doenças adrenais.</p>',
    keyPointsText:
      'CUSHING\n- Síndrome de Cushing é o termo guarda-chuva para manifestações por excesso crônico de atividade glicocorticoide.\n- Separar origem hipofisária, adrenal, iatrogênica e outras classificações definidas pelo consenso.\n- Não usar “doença de Cushing” como sinônimo universal da síndrome.\n\nHIPOADRENOCORTICISMO\n- Distinguir primário, central/secundário, deficiência glicocorticoide e deficiência mineralocorticoide.\n- Registrar estado eletrolítico e crise adrenal separadamente.\n- O consenso inclui critérios diagnósticos, definições de testes e sistema de classificação.',
    practicalApplicationText:
      'Estruturar o registro em campos independentes: síndrome clínica, etiologia, teste confirmatório, estado eletrolítico, necessidade de glicocorticoide, necessidade de mineralocorticoide, crise atual e controle terapêutico. Usar o vocabulário para evitar que “Cushing”, “HAC” e “doença de Cushing” sejam tratados como sinônimos perfeitos.',
    appNotesText:
      `STATUS: TERMINOLOGIA — não é protocolo de tratamento.\n\nAs definições aumentam consistência clínica e qualidade dos dados, mas a escolha de teste, dose e monitorização deve seguir guidelines clínicos e o contexto do paciente.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-alive-cycle-2',
        citationText: 'Niessen S. J. M. et al. Agreeing Language in Veterinary Endocrinology (ALIVE): Cushing’s Syndrome and Hypoadrenocorticism. Vet Sci. 2025;12:761.',
        sourceType: 'Consenso de terminologia',
        url: 'https://doi.org/10.3390/vetsci12080761',
        notes: '35 definições adrenais produzidas por método Delphi modificado.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['sindrome-cushing-caes', 'sindrome-cushing-gatos', 'hipoadrenocorticismo-addison'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Terminologia',
  },
  {
    id: 'con-alive-tireoide-cycle-3-2026',
    slug: 'alive-tireoide-cycle-3-2026',
    title: 'ALIVE Cycle 3 — tireoide, cetose/CAD e remissão',
    shortTitle: 'ALIVE 3 — Tireoide e diabetes',
    sourceOrganization: 'ESVE / SCE',
    year: 2026,
    species: 'both',
    category: 'endocrinologia',
    tags: ['ALIVE', 'Terminologia', 'Tireoide', 'CAD', 'CAD euglicêmica', 'Remissão'],
    pdfUrl: 'https://doi.org/10.3390/vetsci13010035',
    pdfFileName: 'alive-tireoide-cycle-3-2026',
    storagePath: 'external/alive-tireoide-cycle-3-2026',
    summary:
      'Consenso ALIVE Cycle 3 com 78 definições tireoidianas e atualizações para cetose diabética, CAD, CAD euglicêmica e remissão.',
    articleSummaryRichText:
      '<p>Documento de terminologia para tireoide em cães e gatos e atualização de definições críticas do diabetes.</p>',
    keyPointsText:
      'TIREOIDE\n- Padroniza eutireoidismo, hipertireoidismo e hipotireoidismo manifestos e subclínicos.\n- Diferencia doença primária, central, congênita e iatrogênica.\n- Define síndrome da doença não tireoidiana e interferência medicamentosa.\n- No sucesso terapêutico, prioriza reversão clínica e clinicopatológica, não um número hormonal isolado.\n\nDIABETES\n- Atualiza definições de cetose diabética, CAD e CAD euglicêmica.\n- Padroniza remissão diabética e estados relacionados.\n- CAD euglicêmica pode ocorrer sem hiperglicemia marcada, especialmente em contexto de SGLT2.',
    practicalApplicationText:
      'Usar as definições nos campos de diagnóstico e desfecho: etiologia, estado manifesto/subclínico, doença não tireoidiana, tratamento bem-sucedido, cetose, acidose, euglicemia e remissão. Em emergência, não excluir CAD porque a glicemia está abaixo de 250 mg/dL quando há uso de SGLT2, sinais clínicos e cetonemia.',
    appNotesText:
      `STATUS: TERMINOLOGIA — aplicar junto dos guidelines clínicos AAHA/iCatCare.\n\nO documento atualiza cinco definições do Cycle 1. Para cetose/CAD e remissão, preferir a formulação mais recente do Cycle 3.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-alive-cycle-3',
        citationText: 'Niessen S. J. M. et al. Agreeing Language in Veterinary Endocrinology (ALIVE): Hypothyroidism, Hyperthyroidism, (Euglycaemic) Diabetic Ketosis/Ketoacidosis, and Diabetic Remission. Vet Sci. 2026;13:35.',
        sourceType: 'Consenso de terminologia',
        url: 'https://doi.org/10.3390/vetsci13010035',
        notes: '78 definições tireoidianas e cinco atualizações relacionadas ao diabetes.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [
      'hipotireoidismo-adquirido-caes-gatos',
      'hipotireoidismo-congenito-caes-gatos',
      'hipertireoidismo-felino',
      'diabetes-mellitus-canina',
      'diabetes-mellitus-felina',
    ],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Terminologia',
  },
  {
    id: 'con-hipertensao-sistemica',
    slug: 'hipertensao-sistemica',
    title: 'Hipertensão sistêmica em cães e gatos',
    shortTitle: 'Hipertensão sistêmica — ACVIM 2018',
    sourceOrganization: 'ACVIM',
    year: 2018,
    species: 'both',
    category: 'cardiologia',
    tags: ['Hipertensão', 'Pressão arterial', 'Órgão-alvo', 'Amlodipina'],
    pdfUrl: 'https://doi.org/10.1111/jvim.15331',
    pdfFileName: 'acvim-hipertensao-sistemica-2018',
    storagePath: 'external/acvim-hipertensao-sistemica-2018',
    summary:
      'Consenso ACVIM 2018 para mensuração, classificação de risco, pesquisa de lesão em órgão-alvo e manejo da hipertensão em cães e gatos.',
    articleSummaryRichText:
      '<p>Consenso vigente e interdisciplinar para hipertensão sistêmica, indispensável na cardiologia e nas endocrinopatias associadas a dano ocular, renal, neurológico ou cardiovascular.</p>',
    keyPointsText:
      'CLASSIFICAÇÃO PELA PRESSÃO SISTÓLICA\n- <140 mmHg: normotenso, risco mínimo.\n- 140–159 mmHg: pré-hipertenso, risco baixo.\n- 160–179 mmHg: hipertenso, risco moderado.\n- ≥180 mmHg: hipertensão grave, risco alto.\n\nDIAGNÓSTICO\n- Padronizar ambiente, aclimatação, manguito, posição e repetição das medidas.\n- Procurar lesão em retina/coroide, cérebro, rins, coração e vasos.\n- Lesão compatível pode justificar tratamento após uma sessão confiável.\n- Investigar hipertireoidismo, hipercortisolismo, hiperaldosteronismo e outras causas secundárias.',
    practicalApplicationText:
      'Registrar protocolo de medida e média final, classificar risco e pesquisar órgão-alvo. Em pacientes com doença tireoidiana ou adrenal, incluir pressão arterial e fundo de olho no fluxo. Tratar a causa de base quando possível e monitorar resposta pressórica sem reduzir a pressão de forma abrupta.',
    appNotesText:
      `STATUS: VIGENTE — fonte principal para identificação, avaliação e manejo da hipertensão sistêmica.\n\nUma massa adrenal ou endocrinopatia suspeita não substitui mensuração confiável nem avaliação de órgão-alvo.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-hipertensao-2018',
        citationText: 'Acierno M. J. et al. ACVIM consensus statement: Guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats. J Vet Intern Med. 2018;32:1803–1822.',
        sourceType: 'Consenso',
        url: 'https://doi.org/10.1111/jvim.15331',
        notes: 'Classificação pressórica, lesão em órgão-alvo e manejo.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [
      'hipertensao-arterial-sistemica-caes-gatos',
      'hipertireoidismo-felino',
      'sindrome-cushing-caes',
      'sindrome-cushing-gatos',
    ],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-isfm-diabetes-felino-2015',
    slug: 'isfm-diabetes-felino-2015',
    title: 'Manejo prático do diabetes mellitus felino',
    shortTitle: 'Diabetes felino — ISFM 2015',
    sourceOrganization: 'ISFM / iCatCare',
    year: 2015,
    species: 'cat',
    category: 'endocrinologia',
    tags: ['Diabetes mellitus', 'Insulina', 'Dieta', 'Remissão', 'Histórico'],
    pdfUrl: 'https://doi.org/10.1177/1098612X15571880',
    pdfFileName: 'isfm-diabetes-felino-2015',
    storagePath: 'external/isfm-diabetes-felino-2015',
    summary:
      'Consenso histórico ISFM 2015 sobre manejo prático do diabetes felino, preservado para rastreabilidade e não como primeira referência terapêutica.',
    articleSummaryRichText:
      '<p>Documento que consolidou controle clínico, prevenção de hipoglicemia, insulina de ação prolongada, dieta com menos carboidrato, monitorização domiciliar e busca de remissão.</p>',
    keyPointsText:
      'PRINCÍPIOS QUE PERMANECEM ÚTEIS\n- Controlar manifestações clínicas é mais importante que buscar euglicemia perfeita.\n- Evitar hipoglicemia e usar protocolo viável para o tutor.\n- Priorizar monitorização em casa e avaliar peso, alimentação e sinais.\n- Investigar comorbidades e resistência insulínica.\n- Buscar remissão quando biologicamente possível.\n\nLIMITAÇÕES HISTÓRICAS\n- Publicado antes do uso atual de SGLT2, CGM rotineiro, reconhecimento amplo de CAD euglicêmica e terminologia ALIVE.\n- Evidências e protocolos foram atualizados por iCatCare 2025 e AAHA 2026.',
    practicalApplicationText:
      'Manter para comparação histórica e para princípios gerais ainda válidos. Diante de decisão terapêutica atual, migrar para AAHA 2026 e iCatCare 2025; usar ALIVE Cycle 3 para definições de CAD, CAD euglicêmica e remissão.',
    appNotesText:
      `STATUS: HISTÓRICO/SUBSTITUÍDO — não usar como fonte terapêutica principal em 2026.\n\nConteúdo preservado para rastreabilidade editorial. Não aplicar recomendações antigas sem conferência em guideline vigente.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-isfm-diabetes-2015',
        citationText: 'Sparkes A. H. et al. ISFM Consensus Guidelines on the Practical Management of Diabetes Mellitus in Cats. J Feline Med Surg. 2015;17:235–250.',
        sourceType: 'Consenso histórico',
        url: 'https://doi.org/10.1177/1098612X15571880',
        notes: 'Substituído como referência principal por iCatCare 2025 e AAHA 2026.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['diabetes-mellitus-felina'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Histórico',
  },
];
