type RenalUrinaryConsensusSeed = Record<string, any>;

const CONSENSUS_DISCLAIMER =
  'Recomendação baseada em consenso ou guideline; adaptar ao paciente, à disponibilidade local, ao antibiograma e ao registro brasileiro do medicamento.';

export const nefrologiaUrologiaConsensosSeed: RenalUrinaryConsensusSeed[] = [
  {
    id: 'con-iris-lra-2026',
    slug: 'iris-lra-2026',
    title: 'Graduação da lesão renal aguda em cães e gatos',
    shortTitle: 'Lesão renal aguda — IRIS 2026',
    sourceOrganization: 'IRIS',
    year: 2026,
    species: 'both',
    category: 'nefrologia-urologia',
    tags: ['LRA', 'Lesão Renal Aguda', 'Graduação', 'Creatinina', 'Diurese', 'Terapia renal substitutiva'],
    pdfUrl: 'https://www.iris-kidney.com/iris-guidelines-1',
    pdfFileName: 'iris-lra-2026',
    storagePath: 'external/iris-lra-2026',
    summary:
      'Guideline IRIS 2026 para reconhecer e graduar lesão renal aguda em cães e gatos por creatinina, evolução clínica e produção urinária.',
    articleSummaryRichText:
      '<p>A graduação IRIS da LRA permite classificar desde lesão renal sem azotemia até falência renal grave. O grau descreve a gravidade no momento avaliado e pode mudar rapidamente; por isso, tendência da creatinina, diurese, hidratação e repercussões metabólicas devem ser acompanhadas em conjunto.</p>',
    keyPointsText:
      'GRADUAÇÃO\n- Grau I: paciente não azotêmico com evidência de lesão renal, como aumento agudo de creatinina dentro do intervalo de referência, oligúria ou achados de imagem/urina compatíveis.\n- Graus II–V: azotemia progressivamente mais intensa; o grau deve ser atualizado conforme a evolução.\n- Subclassificar pela produção urinária, pois oligúria/anúria persistente piora prognóstico e altera o manejo.\n- A creatinina deve ser interpretada após avaliar hidratação, perfusão, massa muscular, obstrução e tendência temporal.\n- LRA sobre DRC é possível; histórico, imagem e exames prévios ajudam a reconhecer o componente crônico.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Confirmar perfusão, volemia e patência do trato urinário; aliviar obstrução quando presente.\n2. Suspender ou revisar nefrotóxicos e investigar causas infecciosas, isquêmicas, tóxicas e inflamatórias.\n3. Registrar peso, balanço hídrico, débito urinário, creatinina, ureia, eletrólitos, fósforo, equilíbrio ácido-base e pressão arterial em série.\n4. Corrigir desidratação sem provocar sobrecarga; depois, igualar oferta à necessidade e às perdas medidas.\n5. Oligúria/anúria refratária, hipercalemia, acidose, sobrecarga volêmica ou uremia grave exigem avaliação precoce para terapia renal substitutiva.',
    appNotesText:
      `STATUS: VIGENTE — graduação de referência para LRA em cães e gatos.\n\nA graduação não substitui a busca etiológica nem autoriza fluidoterapia empírica ilimitada. Débito urinário e balanço hídrico devem ser medidos sempre que possível.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-iris-lra-2026',
        citationText: 'International Renal Interest Society. IRIS Grading of Acute Kidney Injury (AKI). 2026.',
        sourceType: 'Guideline',
        url: 'https://www.iris-kidney.com/s/IRIS-AKI-Grading_2026.pdf',
        notes: 'Graduação e subclassificação clínica da lesão renal aguda.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-iscaid-itu-caes-gatos-2019',
    slug: 'iscaid-itu-caes-gatos-2019',
    title: 'Infecções bacterianas do trato urinário em cães e gatos',
    shortTitle: 'Infecção urinária — ISCAID 2019',
    sourceOrganization: 'ISCAID',
    year: 2019,
    species: 'both',
    category: 'nefrologia-urologia',
    tags: ['ITU', 'Cistite bacteriana', 'Pielonefrite', 'Urocultura', 'Antimicrobianos'],
    pdfUrl: 'https://www.iscaid.org/guidelines',
    pdfFileName: 'iscaid-itu-caes-gatos-2019',
    storagePath: 'external/iscaid-itu-caes-gatos-2019',
    summary:
      'Guideline ISCAID 2019 para diagnóstico e uso responsável de antimicrobianos na cistite bacteriana, pielonefrite e bacteriúria subclínica de cães e gatos.',
    articleSummaryRichText:
      '<p>O documento diferencia cistite bacteriana esporádica, cistite recorrente, pielonefrite e bacteriúria subclínica. A urocultura quantitativa de amostra obtida por cistocentese é a base diagnóstica nos casos indicados; o tratamento deve considerar localização, gravidade, recorrência, cultura e fatores predisponentes.</p>',
    keyPointsText:
      'DIAGNÓSTICO E CLASSIFICAÇÃO\n- Sinais urinários baixos e piúria não confirmam infecção sem contexto e cultura apropriados.\n- Preferir cultura de urina obtida por cistocentese antes do antimicrobiano, especialmente em recorrência, complicação ou suspeita de pielonefrite.\n- Bacteriúria subclínica geralmente não deve ser tratada, salvo situações específicas de maior risco.\n- Em recorrência, distinguir reinfecção, recaída e persistência e procurar urolitíase, retenção, endocrinopatia, doença renal ou alteração anatômica.\n- Pielonefrite exige avaliação sistêmica, cultura e terapia com adequada penetração tecidual.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Documentar sinais, urinálise, densidade urinária e método de coleta.\n2. Colher cultura antes da primeira dose quando indicada; não interpretar isoladamente crescimento de amostras contamináveis.\n3. Na cistite esporádica estável, escolher antimicrobiano de primeira linha e duração curta conforme guideline e perfil local.\n4. Ajustar pela cultura quando houver resistência, falha ou quadro alto/sistêmico; não ampliar espectro sem necessidade.\n5. Em recorrência, investigar a causa predisponente em vez de repetir ciclos empíricos.\n6. Reavaliar rapidamente febre, dor renal, vômito, azotemia, sepse ou piora clínica.',
    appNotesText:
      `STATUS: VIGENTE — referência principal de stewardship para ITU bacteriana de cães e gatos.\n\nNão usar antimicrobiano para todo sedimento ativo ou bacteriúria sem sinais. Cultura, sítio da infecção, risco do paciente e resistência local orientam escolha e duração.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-iscaid-itu-2019',
        citationText:
          'Weese J. S. et al. International Society for Companion Animal Infectious Diseases (ISCAID) guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8–25.',
        sourceType: 'Guideline ISCAID',
        url: 'https://doi.org/10.1016/j.tvjl.2019.02.008',
        notes: 'Diagnóstico, classificação e uso responsável de antimicrobianos em ITU.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [],
    relatedMedicationSlugs: ['amoxicilina-clavulanato', 'sulfametoxazol-trimetoprima'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-acvim-urolitiase-caes-gatos-2016',
    slug: 'acvim-urolitiase-caes-gatos-2016',
    title: 'Tratamento e prevenção de urólitos em cães e gatos',
    shortTitle: 'Urolitíase — ACVIM 2016',
    sourceOrganization: 'ACVIM',
    year: 2016,
    species: 'both',
    category: 'nefrologia-urologia',
    tags: ['Urolitíase', 'Estruvita', 'Oxalato de cálcio', 'Dissolução', 'Prevenção'],
    pdfUrl: 'https://academic.oup.com/jvim/article/30/5/1564/8417232',
    pdfFileName: 'acvim-urolitiase-caes-gatos-2016',
    storagePath: 'external/acvim-urolitiase-caes-gatos-2016',
    summary:
      'Consenso ACVIM 2016 para tratamento minimamente invasivo, dissolução e prevenção de urólitos em cães e gatos.',
    articleSummaryRichText:
      '<p>O consenso recomenda remover ou dissolver cálculos apenas quando houver indicação clínica e priorizar métodos menos invasivos sempre que viáveis. Composição provável, localização, tamanho, obstrução, infecção e características do paciente determinam a estratégia; análise quantitativa do urólito é essencial para prevenção dirigida.</p>',
    keyPointsText:
      'DECISÕES CENTRAIS\n- Estruvita estéril ou associada à infecção pode ser dissolvida em pacientes selecionados; infecção concomitante precisa de cultura e controle adequado.\n- Oxalato de cálcio não é dissolvido clinicamente e exige remoção quando indicado, preferindo técnicas minimamente invasivas.\n- Urólitos assintomáticos podem ser monitorados em casos selecionados, desde que o risco de obstrução seja baixo.\n- Cristalúria não prediz sozinha composição nem obriga tratamento.\n- Enviar todo urólito recuperado para análise quantitativa; prevenção depende do tipo mineral e de fatores metabólicos.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Localizar e dimensionar os cálculos por imagem e avaliar obstrução, dor, infecção e função renal.\n2. Estimar a composição com espécie, raça, sexo, pH, radiopacidade, cultura e histórico, sem tratar essa estimativa como confirmação.\n3. Considerar dissolução, uro-hidropropulsão, litotripsia, cistoscopia ou cirurgia conforme o caso.\n4. Aumentar ingestão hídrica e usar dieta específica apenas quando compatível com o mineral provável/confirmado.\n5. Programar imagem e urinálise de controle; recorrência é comum e a prevenção deve ser individualizada.',
    appNotesText:
      `STATUS: VIGENTE — principal consenso ACVIM para abordagem e prevenção de urólitos.\n\nNão prescrever dieta de dissolução sem avaliar obstrução, provável composição e infecção. A prevenção deve ser revista após análise quantitativa do cálculo.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-urolitiase-2016',
        citationText:
          'Lulich J. P. et al. ACVIM Small Animal Consensus Recommendations on the Treatment and Prevention of Uroliths in Dogs and Cats. J Vet Intern Med. 2016;30:1564–1574.',
        sourceType: 'Consenso ACVIM',
        url: 'https://doi.org/10.1111/jvim.14559',
        notes: 'Tratamento, remoção minimamente invasiva, dissolução e prevenção de urólitos.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-acvim-incontinencia-urinaria-canina-2024',
    slug: 'acvim-incontinencia-urinaria-canina-2024',
    title: 'Incontinência urinária em cães',
    shortTitle: 'Incontinência urinária canina — ACVIM 2024',
    sourceOrganization: 'ACVIM',
    year: 2024,
    species: 'dog',
    category: 'nefrologia-urologia',
    tags: ['Incontinência urinária', 'USMI', 'Ureter ectópico', 'Retenção urinária', 'Urodinâmica'],
    pdfUrl: 'https://academic.oup.com/jvim/article/38/2/878/8448883',
    pdfFileName: 'acvim-incontinencia-urinaria-canina-2024',
    storagePath: 'external/acvim-incontinencia-urinaria-canina-2024',
    summary:
      'Consenso ACVIM 2024 para classificação, investigação e tratamento da incontinência urinária em cães.',
    articleSummaryRichText:
      '<p>A diretriz organiza a incontinência por mecanismo: falha de armazenamento, incompetência do mecanismo do esfíncter uretral, anomalias anatômicas, urgência/detrusor hiperativo, transbordamento por retenção e causas neurológicas. História miccional, exame neurológico, urinálise/cultura, imagem e testes direcionados evitam tratar todo escape como deficiência esfincteriana.</p>',
    keyPointsText:
      'CLASSIFICAÇÃO\n- Escape durante sono ou repouso em fêmea castrada é compatível com incompetência esfincteriana, mas não é diagnóstico por exclusão incompleta.\n- Gotejamento contínuo desde jovem aumenta suspeita de ureter ectópico ou outra anomalia.\n- Bexiga grande, resíduo pós-miccional elevado e fluxo fraco sugerem retenção/transbordamento.\n- Poliúria, ITU, urolitíase, doença neurológica e mobilidade reduzida podem causar ou agravar o quadro.\n- Casos refratários podem exigir cistoscopia, ultrassom especializado, tomografia, urodinâmica ou avaliação neurológica.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Distinguir micção consciente, marcação, polaciúria e verdadeiro escape involuntário.\n2. Registrar início, posição corporal, sono, volume, jato, esforço, sede, cirurgias e medicamentos.\n3. Fazer exame físico/neurológico, urinálise, cultura quando indicada, bioquímica e imagem.\n4. Direcionar terapia ao mecanismo: manejo da doença de base, fármacos uretrais, tratamento de urgência, esvaziamento adequado ou correção anatômica.\n5. Medir resposta, eventos adversos e resíduo pós-miccional; reclassificar falhas antes de combinar terapias.',
    appNotesText:
      `STATUS: VIGENTE — referência principal para incontinência urinária canina.\n\nNão iniciar simpatomimético ou estrógeno automaticamente sem descartar infecção, anomalia, retenção e doença neurológica. Monitorar pressão arterial e eventos adversos conforme a terapia.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-incontinencia-2024',
        citationText:
          'Byron J. K. et al. ACVIM consensus statement on diagnosis and management of urinary incontinence in dogs. J Vet Intern Med. 2024;38:878–903.',
        sourceType: 'Consenso ACVIM',
        url: 'https://doi.org/10.1111/jvim.16975',
        notes: 'Classificação mecanística, diagnóstico e opções terapêuticas.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-iris-doenca-glomerular-canina-2013',
    slug: 'iris-doenca-glomerular-canina-2013',
    title: 'Doença glomerular em cães',
    shortTitle: 'Doença glomerular canina — IRIS/ACVIM 2013',
    sourceOrganization: 'IRIS / ACVIM',
    year: 2013,
    species: 'dog',
    category: 'nefrologia-urologia',
    tags: ['Glomerulopatia', 'Proteinúria', 'RPCU', 'Biópsia renal', 'Trombose'],
    pdfUrl: 'https://academic.oup.com/jvim/issue/27/Supplement_S1',
    pdfFileName: 'iris-doenca-glomerular-canina-2013',
    storagePath: 'external/iris-doenca-glomerular-canina-2013',
    summary:
      'Série de consenso IRIS/ACVIM 2013 para reconhecimento, diagnóstico, tratamento e monitorização da doença glomerular canina.',
    articleSummaryRichText:
      '<p>A série estrutura a investigação da proteinúria persistente, a exclusão de causas pré e pós-renais, a busca de doenças sistêmicas, a indicação de biópsia e o tratamento padrão. Embora complementar, permanece uma referência organizada para glomerulopatias caninas e deve ser integrada às diretrizes IRIS atuais.</p>',
    keyPointsText:
      'DIAGNÓSTICO\n- Confirmar proteinúria persistente em amostras adequadas e interpretar RPCU junto ao sedimento urinário.\n- Excluir hemorragia/inflamação do trato urinário e causas funcionais antes de atribuir origem glomerular.\n- Investigar infecção, inflamação, neoplasia e outras doenças capazes de formar imunocomplexos.\n- Biópsia renal pode definir padrão e prognóstico quando o resultado mudar tratamento; exige avaliação de sangramento e processamento especializado.\n- Hipoalbuminemia, hipertensão, azotemia, edema/efusão e risco trombótico aumentam gravidade.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Repetir urinálise e RPCU e obter cultura quando indicada.\n2. Medir pressão arterial, creatinina/SDMA, albumina, colesterol e procurar doença sistêmica.\n3. Instituir bloqueio do sistema renina-angiotensina conforme diretrizes atuais, dieta/controle de sódio e manejo da hipertensão.\n4. Considerar tromboprofilaxia em síndrome nefrótica ou risco alto, ponderando sangramento.\n5. Reservar imunossupressão para contextos sustentados por diagnóstico, padrão histológico ou forte evidência; monitorar RPCU, albumina, função renal e pressão.',
    appNotesText:
      `STATUS: COMPLEMENTAR — série fundadora; integrar às recomendações IRIS 2026 e à evidência terapêutica mais recente.\n\nProteinúria não equivale automaticamente a glomerulonefrite imunomediada. Imunossupressão sem investigação etiológica e avaliação de risco pode causar dano.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-glomerular-diagnostico-2013',
        citationText:
          'Lees G. E. et al. Assessment and management of proteinuria in dogs and cats: 2004 ACVIM Forum Consensus Statement (context) and IRIS Canine Glomerular Disease Study Group diagnostic recommendations. J Vet Intern Med. 2013;27 Suppl 1.',
        sourceType: 'Série de consenso',
        url: 'https://doi.org/10.1111/jvim.12223',
        notes: 'Reconhecimento e abordagem diagnóstica de doença glomerular canina.',
        evidenceLevel: 'Consenso de especialistas',
      },
      {
        id: 'ref-glomerular-tratamento-2013',
        citationText:
          'Brown S. et al. Consensus recommendations for standard therapy of glomerular disease in dogs. J Vet Intern Med. 2013;27 Suppl 1:S27–S43.',
        sourceType: 'Consenso terapêutico',
        url: 'https://doi.org/10.1111/jvim.12230',
        notes: 'Terapia padrão, monitorização e suporte.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos'],
    relatedMedicationSlugs: ['benazepril'],
    isDemonstrative: false,
    warningLabel: 'Complementar',
  },
  {
    id: 'con-isfm-drc-felina-2016',
    slug: 'isfm-drc-felina-2016',
    title: 'Diagnóstico e manejo da doença renal crônica felina',
    shortTitle: 'DRC felina — ISFM 2016',
    sourceOrganization: 'ISFM',
    year: 2016,
    species: 'cat',
    category: 'nefrologia-urologia',
    tags: ['DRC felina', 'Diagnóstico', 'Dieta renal', 'Hidratação', 'Monitorização'],
    pdfUrl: 'https://pubmed.ncbi.nlm.nih.gov/26936494/',
    pdfFileName: 'isfm-drc-felina-2016',
    storagePath: 'external/isfm-drc-felina-2016',
    summary:
      'Diretriz clínica ISFM 2016 para diagnóstico, estadiamento e manejo prático da doença renal crônica em gatos.',
    articleSummaryRichText:
      '<p>A diretriz traduz o estadiamento renal em cuidados centrados no gato, com confirmação da cronicidade, dieta renal, hidratação, controle de fósforo, pressão e proteinúria, além de manejo de náusea, inapetência, hipocalemia, anemia e qualidade de vida. Hoje deve ser usada em complemento ao IRIS 2026.</p>',
    keyPointsText:
      'PONTOS PRÁTICOS\n- Confirmar cronicidade e estabilidade antes de estadiar; ultrassom, densidade urinária e exames anteriores ajudam.\n- Dieta renal é uma das intervenções com melhor suporte para gatos com DRC azotêmica, mas a transição deve preservar ingestão calórica.\n- Aumentar acesso à água e alimento úmido; fluidos subcutâneos não são automáticos para todo paciente.\n- Monitorar fósforo, potássio, bicarbonato, pressão, RPCU, hematócrito, peso e massa muscular.\n- Náusea, constipação, dor, doença dentária e comorbidades devem ser tratadas para manter ingestão e bem-estar.',
    practicalApplicationText:
      'FLUXO DE ACOMPANHAMENTO\n1. Estadiar pela versão IRIS vigente e registrar RPCU e pressão.\n2. Definir metas de fósforo e plano dietético sem transição abrupta em gato inapetente.\n3. Avaliar hidratação e ambiente doméstico; distribuir água, fontes e alimento úmido conforme preferência.\n4. Tratar complicações individualmente e acompanhar peso, escore muscular, apetite, vômito, fezes e atividade.\n5. Ajustar frequência de retorno à estabilidade e ao estágio; discutir antecipadamente qualidade de vida e sinais de descompensação.',
    appNotesText:
      `STATUS: COMPLEMENTAR — excelente orientação felina prática; usar o estadiamento e as metas IRIS 2026 como referência atual.\n\nEvitar restrição alimentar que leve à anorexia. Em gatos frágeis, ingestão calórica e transição tolerável têm prioridade sobre adesão imediata perfeita.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-isfm-drc-2016',
        citationText:
          'Sparkes A. H. et al. ISFM Consensus Guidelines on the Diagnosis and Management of Feline Chronic Kidney Disease. J Feline Med Surg. 2016;18:219–239.',
        sourceType: 'Guideline ISFM',
        url: 'https://doi.org/10.1177/1098612X16631234',
        notes: 'Manejo clínico da DRC felina e cuidados centrados no gato.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Complementar',
  },
  {
    id: 'con-terminologia-infeccoes-urinarias-2026',
    slug: 'terminologia-infeccoes-urinarias-2026',
    title: 'Terminologia das infecções do trato urinário em cães e gatos',
    shortTitle: 'Terminologia urinária — Consenso 2026',
    sourceOrganization: 'JSAP / painel internacional',
    year: 2026,
    species: 'both',
    category: 'nefrologia-urologia',
    tags: ['Terminologia', 'ITU', 'Bacteriúria', 'Cistite', 'Pielonefrite', 'Delphi'],
    pdfUrl: 'https://onlinelibrary.wiley.com/doi/10.1111/jsap.70127',
    pdfFileName: 'terminologia-infeccoes-urinarias-2026',
    storagePath: 'external/terminologia-infeccoes-urinarias-2026',
    summary:
      'Consenso internacional de 2026 que padroniza 29 termos usados nas infecções urinárias de cães e gatos.',
    articleSummaryRichText:
      '<p>Por método Delphi modificado, o painel harmonizou definições para comunicação clínica e científica em infecções do trato urinário. O documento esclarece termos como bacteriúria subclínica, cistite bacteriana, pielonefrite, recorrência, recaída e reinfecção, mas não é um guideline de escolha antimicrobiana.</p>',
    keyPointsText:
      'USO CORRETO\n- Aplicar termos definidos de forma consistente no prontuário, laudo, cultura e pesquisa.\n- Separar presença de bactéria, sinais clínicos e localização presumida da infecção.\n- Descrever recorrência conforme relação temporal e microbiológica com episódios anteriores.\n- Evitar usar “ITU” como rótulo inespecífico quando a localização e o quadro podem ser melhor descritos.\n- Terminologia padronizada melhora auditoria de antimicrobianos e comparação entre estudos.',
    practicalApplicationText:
      'No cadastro do episódio, registrar sinais, método de coleta, urinálise, cultura, espécie bacteriana, sensibilidade, localização provável, comorbidades e relação com episódios anteriores. Usar o consenso ISCAID ou guideline terapêutico atualizado para decidir se tratar, qual antimicrobiano selecionar e por quanto tempo.',
    appNotesText:
      `STATUS: TERMINOLOGIA — documento de definições, não protocolo terapêutico.\n\nNão transformar uma definição em indicação automática de antibiótico. Conduta depende de sinais, localização, risco, cultura e guideline clínico.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-terminologia-urinaria-2026',
        citationText:
          'International consensus terminology for urinary tract infections in dogs and cats. J Small Anim Pract. Published online 7 Apr 2026.',
        sourceType: 'Consenso terminológico',
        url: 'https://doi.org/10.1111/jsap.70127',
        notes: 'Definições consensuais de 29 termos por método Delphi modificado.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Terminologia',
  },
  {
    id: 'con-acvim-proteinuria-caes-gatos-2005',
    slug: 'acvim-proteinuria-caes-gatos-2005',
    title: 'Avaliação e manejo da proteinúria em cães e gatos',
    shortTitle: 'Proteinúria — ACVIM 2005',
    sourceOrganization: 'ACVIM',
    year: 2005,
    species: 'both',
    category: 'nefrologia-urologia',
    tags: ['Proteinúria', 'RPCU', 'Glomerular', 'Histórico', 'Monitorização'],
    pdfUrl: 'https://pubmed.ncbi.nlm.nih.gov/15954557/',
    pdfFileName: 'acvim-proteinuria-caes-gatos-2005',
    storagePath: 'external/acvim-proteinuria-caes-gatos-2005',
    summary: 'Consenso ACVIM 2005 sobre abordagem, localização e estadiamento da proteinúria em cães e gatos.',
    articleSummaryRichText:
      '<p>Documento fundador que consolidou o uso da relação proteína:creatinina urinária e a distinção entre proteinúria pré-renal, renal e pós-renal. Mantém valor histórico e conceitual, mas limiares e tratamento devem seguir IRIS e consensos mais recentes.</p>',
    keyPointsText:
      'CONCEITOS FUNDADORES\n- Confirmar persistência antes de rotular proteinúria renal crônica.\n- Interpretar RPCU somente com sedimento, método de coleta e contexto clínico.\n- Excluir causas pré-renais e pós-renais; sedimento ativo pode invalidar a atribuição renal.\n- Magnitude e tendência da RPCU ajudam no prognóstico e na avaliação de resposta.\n- Proteinúria persistente pode causar progressão renal e merece investigação mesmo sem azotemia.',
    practicalApplicationText:
      'Usar o documento para compreender o raciocínio diagnóstico e a evolução da nefrologia veterinária. Na prática atual, confirmar a proteinúria, classificar o paciente pela versão IRIS vigente, investigar causas sistêmicas e seguir recomendações contemporâneas para bloqueio do sistema renina-angiotensina, pressão, dieta e monitorização.',
    appNotesText:
      `STATUS: HISTÓRICO — substituído em parte por IRIS 2026 e consensos posteriores de doença glomerular.\n\nNão usar isoladamente para definir limiares ou terapia contemporânea; consultar a referência vigente.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-proteinuria-2005',
        citationText:
          'Lees G. E. et al. Assessment and management of proteinuria in dogs and cats: 2004 ACVIM Forum Consensus Statement. J Vet Intern Med. 2005;19:377–385.',
        sourceType: 'Consenso histórico ACVIM',
        url: 'https://doi.org/10.1892/0891-6640(2005)19[377:aamopi]2.0.co;2',
        notes: 'Base histórica para classificação e monitorização da proteinúria.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos'],
    relatedMedicationSlugs: ['benazepril'],
    isDemonstrative: false,
    warningLabel: 'Histórico',
  },
];
