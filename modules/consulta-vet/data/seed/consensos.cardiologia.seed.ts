type CardiologyConsensusSeed = Record<string, any>;

const CONSENSUS_DISCLAIMER =
  'Recomendação baseada em consenso ou revisão especializada; adaptar ao paciente, à disponibilidade local e ao registro brasileiro do medicamento.';

export const cardiologiaConsensosSeed: CardiologyConsensusSeed[] = [
  {
    id: 'con-acvim-mmvd-canina-2019',
    slug: 'acvim-mmvd-canina-2019',
    title: 'Doença valvar mitral mixomatosa canina',
    shortTitle: 'Doença valvar mitral — ACVIM 2019',
    sourceOrganization: 'ACVIM',
    year: 2019,
    species: 'dog',
    category: 'cardiologia',
    tags: ['MMVD', 'Valva mitral', 'Estadiamento', 'Pimobendan', 'Insuficiência cardíaca'],
    pdfUrl: 'https://academic.oup.com/jvim/article/33/3/1127/8448111',
    pdfFileName: 'acvim-mmvd-canina-2019',
    storagePath: 'external/acvim-mmvd-canina-2019',
    summary:
      'Consenso ACVIM 2019 para diagnóstico, estadiamento A–D e tratamento da doença valvar mitral mixomatosa em cães.',
    articleSummaryRichText:
      '<p>Referência cardiológica principal para diferenciar predisposição, doença pré-clínica sem remodelamento, estágio B2, insuficiência cardíaca congestiva e doença refratária.</p>',
    keyPointsText:
      'ESTADIAMENTO\n- A: predisposição sem doença estrutural; acompanhar, sem tratamento farmacológico.\n- B1: doença estrutural sem remodelamento suficiente para B2; não medicar rotineiramente e reavaliar.\n- B2: doença pré-clínica com remodelamento cardíaco relevante; pimobendan é a terapia principal para retardar a insuficiência cardíaca.\n- C: insuficiência cardíaca atual ou prévia; separar descompensação aguda do manejo crônico.\n- D: sinais refratários ao tratamento padrão; exige estratégia avançada e individualizada.\n\nCRITÉRIOS CLÁSSICOS DE B2\n- Sopro de regurgitação mitral ≥3/6.\n- LA/Ao ≥1,6 e LVIDDN ≥1,7.\n- VHS ajustado à raça >10,5; na ausência de ecocardiografia, cardiomegalia radiográfica inequívoca pode apoiar a classificação.\n- Idealmente, integrar todos os critérios. Um valor isolado limítrofe não deve transformar automaticamente o paciente em B2.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Confirmar que o sopro decorre de doença mitral e procurar comorbidades.\n2. Usar história, exame, radiografia, ecocardiograma e pressão arterial para definir o estágio.\n3. Em B1, programar imagem em 6–12 meses conforme gravidade e progressão.\n4. Em B2 confirmado, iniciar pimobendan e orientar monitorização de frequência respiratória durante o sono.\n5. Em C/D, documentar congestão, função renal, eletrólitos, pressão, apetite e resposta ao diurético; ajustar o protocolo ao fenótipo.\n6. Dispneia, síncope, aumento sustentado da frequência respiratória ou intolerância progressiva exigem reavaliação precoce.',
    appNotesText:
      `STATUS: VIGENTE — fonte principal para doença valvar mitral mixomatosa canina.\n\nA classificação depende do conjunto clínico e de imagem; não automatizar B2 com apenas LA/Ao, LVIDDN, VHS ou intensidade do sopro.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-mmvd-2019',
        citationText:
          'Keene B. W. et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33:1127–1140.',
        sourceType: 'Consenso',
        url: 'https://doi.org/10.1111/jvim.15488',
        notes: 'Estadiamento, diagnóstico e tratamento da MMVD canina.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['doenca-valvar-mitral-degenerativa-caes'],
    relatedMedicationSlugs: ['pimobendan', 'benazepril'],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-acvim-cardiomiopatias-felinas-2020',
    slug: 'acvim-cardiomiopatias-felinas-2020',
    title: 'Cardiomiopatias felinas',
    shortTitle: 'Cardiomiopatias felinas — ACVIM 2020',
    sourceOrganization: 'ACVIM',
    year: 2020,
    species: 'cat',
    category: 'cardiologia',
    tags: ['Cardiomiopatia', 'Fenótipo', 'Átrio esquerdo', 'Tromboembolismo', 'ICC'],
    pdfUrl: 'https://academic.oup.com/jvim/article/34/3/1062/8448248',
    pdfFileName: 'acvim-cardiomiopatias-felinas-2020',
    storagePath: 'external/acvim-cardiomiopatias-felinas-2020',
    summary:
      'Consenso ACVIM 2020 para classificação fenotípica, diagnóstico, estadiamento e manejo das cardiomiopatias em gatos.',
    articleSummaryRichText:
      '<p>Referência principal para cardiomiopatia hipertrófica, restritiva, dilatada, arritmogênica e fenótipos não específicos, com ênfase em risco de insuficiência cardíaca e tromboembolismo.</p>',
    keyPointsText:
      'CLASSIFICAÇÃO E EXCLUSÕES\n- Classificar pelo fenótipo cardíaco observado, sem presumir etiologia apenas pela morfologia.\n- Hipertrofia ventricular exige exclusão de hipertensão, hipertireoidismo, acromegalia e outras causas de sobrecarga.\n- Fenótipos principais: hipertrófico, restritivo, dilatado, arritmogênico do ventrículo direito e não específico.\n\nESTÁGIOS\n- A: predisposto, sem fenótipo detectável.\n- B1: cardiomiopatia subclínica com baixo risco imediato.\n- B2: subclínica com maior risco de ICC ou tromboembolismo, especialmente por aumento atrial importante, contraste espontâneo, trombo ou disfunção atrial.\n- C: ICC ou tromboembolismo atual/prévio.\n- D: doença refratária.\n\nMANEJO\n- Não há benefício demonstrado para tratar rotineiramente todo gato B1.\n- Em B2, avaliar tromboprofilaxia pelo risco individual; clopidogrel é a opção antiplaquetária mais estabelecida no contexto cardiogênico.\n- Dispneia felina deve ser estabilizada com mínima contenção antes de exames extensos.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Diante de sopro, galope, arritmia, síncope ou dispneia, definir estabilidade antes de conter o gato.\n2. Integrar ecocardiograma, pressão arterial, T4 e contexto sistêmico para classificar o fenótipo.\n3. Medir átrio esquerdo, procurar contraste espontâneo/trombo e documentar função sistólica e obstrução dinâmica.\n4. Em dispneia, diferenciar edema cardiogênico, efusão pleural e doença respiratória com abordagem de baixo estresse.\n5. Em tromboembolismo arterial, priorizar analgesia, perfusão, temperatura, função renal/eletrólitos e antitrombótico.\n6. Orientar frequência respiratória domiciliar, apetite, mobilidade e sinais de recorrência.',
    appNotesText:
      `STATUS: VIGENTE — fonte principal para cardiomiopatias felinas.\n\nHipertrofia ventricular esquerda não confirma cardiomiopatia hipertrófica primária sem excluir causas secundárias. Tromboprofilaxia deve refletir risco atrial e hemorrágico.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-cardiomiopatias-felinas-2020',
        citationText:
          'Luis Fuentes V. et al. ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats. J Vet Intern Med. 2020;34:1062–1077.',
        sourceType: 'Consenso',
        url: 'https://doi.org/10.1111/jvim.15745',
        notes: 'Classificação por fenótipo e manejo orientado por estágio.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [
      'cardiomiopatia-hipertrofica-caes-gatos',
      'cardiomiopatia-restritiva-felina',
      'cardiomiopatia-dilatada-caes-gatos',
    ],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-acvim-hipertensao-pulmonar-canina-2020',
    slug: 'acvim-hipertensao-pulmonar-canina-2020',
    title: 'Hipertensão pulmonar em cães',
    shortTitle: 'Hipertensão pulmonar — ACVIM 2020',
    sourceOrganization: 'ACVIM',
    year: 2020,
    species: 'dog',
    category: 'cardiologia',
    tags: ['Hipertensão pulmonar', 'Ecocardiografia', 'Síncope', 'Sildenafil', 'Tromboembolismo'],
    pdfUrl: 'https://academic.oup.com/jvim/article/34/2/549/8448421',
    pdfFileName: 'acvim-hipertensao-pulmonar-canina-2020',
    storagePath: 'external/acvim-hipertensao-pulmonar-canina-2020',
    summary:
      'Consenso ACVIM 2020 para probabilidade ecocardiográfica, classificação etiológica, tratamento e monitorização da hipertensão pulmonar canina.',
    articleSummaryRichText:
      '<p>Documento principal para interpretar sinais ecocardiográficos sem reduzir o diagnóstico à velocidade da regurgitação tricúspide e para tratar conforme a doença de base.</p>',
    keyPointsText:
      'DIAGNÓSTICO\n- O cateterismo cardíaco direito é o padrão de referência; na rotina, o ecocardiograma estima probabilidade, não confirma isoladamente.\n- Integrar velocidade da regurgitação tricúspide, sinais de sobrecarga direita, artéria pulmonar, septo, veia cava e quadro clínico.\n- Síncope, intolerância ao exercício, taquipneia, dispneia, cianose e insuficiência direita aumentam a relevância clínica.\n\nSEIS GRUPOS\n1. Hipertensão arterial pulmonar.\n2. Associada à doença cardíaca esquerda.\n3. Associada à doença respiratória ou hipóxia.\n4. Tromboembólica.\n5. Parasitária.\n6. Multifatorial ou de mecanismo incerto.\n\nTRATAMENTO\n- Tratar a causa de base e a congestão/hipoxemia quando presentes.\n- Inibidores de PDE5 podem ser considerados em pacientes sintomáticos selecionados.\n- Na doença cardíaca esquerda, vasodilatação pulmonar pode aumentar o fluxo para o átrio esquerdo e precipitar edema; usar com cautela e sem edema ativo.',
    practicalApplicationText:
      'FLUXO DE ATENDIMENTO\n1. Confirmar que síncope, dispneia ou intolerância não decorrem principalmente de arritmia, baixo débito, anemia ou doença respiratória não classificada.\n2. Estimar a probabilidade ecocardiográfica com múltiplos achados e buscar a etiologia.\n3. Radiografia, oximetria/gasometria, investigação respiratória, dirofilariose e tromboembolismo são direcionadas pelo grupo provável.\n4. Antes de sildenafil/tadalafil, avaliar edema pulmonar, pressão atrial esquerda, pressão sistêmica e função direita.\n5. Monitorar síncope, tolerância ao exercício, frequência respiratória, qualidade de vida, congestão direita e resposta ecocardiográfica.',
    appNotesText:
      `STATUS: VIGENTE — fonte principal para hipertensão pulmonar canina.\n\nVelocidade elevada de regurgitação tricúspide não confirma sozinha hipertensão pulmonar. Vasodilatador pulmonar sem classificação etiológica pode piorar pacientes com pressão atrial esquerda elevada.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-hipertensao-pulmonar-2020',
        citationText:
          'Reinero C. et al. ACVIM consensus statement guidelines for the diagnosis, classification, treatment, and monitoring of pulmonary hypertension in dogs. J Vet Intern Med. 2020;34:549–573.',
        sourceType: 'Consenso',
        url: 'https://doi.org/10.1111/jvim.15725',
        notes: 'Probabilidade ecocardiográfica e abordagem por grupo etiológico.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: [],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Vigente',
  },
  {
    id: 'con-esvc-dcm-canina-2003',
    slug: 'esvc-dcm-canina-2003',
    title: 'Diagnóstico da cardiomiopatia dilatada canina',
    shortTitle: 'DCM canina — ESVC 2003',
    sourceOrganization: 'ESVC',
    year: 2003,
    species: 'dog',
    category: 'cardiologia',
    tags: ['DCM', 'Diagnóstico', 'Ecocardiografia', 'Fase oculta', 'Critérios'],
    pdfUrl: 'https://www.esvcardio.org/disease-guidelines.pml',
    pdfFileName: 'esvc-dcm-canina-2003',
    storagePath: 'external/esvc-dcm-canina-2003',
    summary:
      'Documento fundador da ESVC para diagnóstico da cardiomiopatia dilatada idiopática canina e identificação da fase pré-clínica.',
    articleSummaryRichText:
      '<p>Guia complementar que sistematizou critérios maiores e menores e reforçou a exclusão ativa de causas secundárias para o fenótipo dilatado e hipocinético.</p>',
    keyPointsText:
      'FENÓTIPO MANIFESTO\n- Dilatação ventricular esquerda.\n- Redução da função sistólica.\n- Aumento da esfericidade ventricular.\n- Dilatação atrial, arritmias, insuficiência cardíaca ou baixo débito podem acompanhar.\n\nDIAGNÓSTICO DE EXCLUSÃO\n- Excluir doença valvar ou congênita hemodinamicamente relevante.\n- Excluir taquicardiomiopatia, deficiência nutricional, miocardite, toxinas, endocrinopatias e doença sistêmica.\n- Interpretar medidas ecocardiográficas conforme porte, raça e método.\n- Na fase oculta, combinar imagem, ritmo e evolução longitudinal; nenhum achado limítrofe isolado é definitivo.',
    practicalApplicationText:
      'Usar como base conceitual para o fenótipo DCM e como rastreabilidade histórica. Em cão de raça predisposta, registrar histórico familiar, dieta, medicamentos/toxinas, doença sistêmica, ECG/Holter e ecocardiografia. Se o exame for limítrofe, repetir medidas com método padronizado e comparar a tendência; investigar causas potencialmente reversíveis antes de rotular como DCM idiopática.',
    appNotesText:
      `STATUS: COMPLEMENTAR/FUNDADOR — critérios devem ser integrados a recomendações mais recentes e específicas por raça.\n\nO documento orienta diagnóstico, não substitui investigação etiológica nem define sozinho o tratamento contemporâneo.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-esvc-dcm-2003',
        citationText:
          'Dukes-McEwan J. et al. Proposed Guidelines for the Diagnosis of Canine Idiopathic Dilated Cardiomyopathy. J Vet Cardiol. 2003;5:7–19.',
        sourceType: 'Guideline complementar',
        url: 'https://doi.org/10.1016/S1760-2734(06)70047-9',
        notes: 'Critérios diagnósticos históricos da taskforce ESVC.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['cardiomiopatia-dilatada-caes-gatos'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Complementar',
  },
  {
    id: 'con-esvc-dcm-dobermann-2017',
    slug: 'esvc-dcm-dobermann-2017',
    title: 'Rastreamento de DCM em Dobermann',
    shortTitle: 'DCM em Dobermann — ESVC 2017',
    sourceOrganization: 'ESVC',
    year: 2017,
    species: 'dog',
    category: 'cardiologia',
    tags: ['Dobermann', 'DCM', 'Holter', 'Ecocardiografia', 'Rastreamento'],
    pdfUrl: 'https://livrepository.liverpool.ac.uk/3020158/',
    pdfFileName: 'esvc-dcm-dobermann-2017',
    storagePath: 'external/esvc-dcm-dobermann-2017',
    summary:
      'Guideline ESVC específico para rastreamento longitudinal da fase oculta da cardiomiopatia dilatada em Dobermann.',
    articleSummaryRichText:
      '<p>Protocolo complementar que combina Holter de 24 horas e ecocardiografia seriada, porque a doença pode começar com arritmia, disfunção sistólica ou ambas.</p>',
    keyPointsText:
      'RASTREAMENTO\n- Iniciar aproximadamente aos três anos e repetir anualmente por toda a vida.\n- Combinar Holter de 24 horas e ecocardiograma; ECG curto não substitui Holter.\n- Um exame normal não exclui desenvolvimento futuro.\n\nCLASSIFICAÇÃO PELO HOLTER\n- <50 VPCs isolados/24 h: geralmente compatível com normalidade no contexto adequado, embora qualquer VPC mereça atenção no Dobermann.\n- 50–300 VPCs/24 h: faixa intermediária; duas avaliações nessa faixa dentro de um ano sustentam DCM oculta.\n- >300 VPCs/24 h: sustenta diagnóstico de DCM oculta, independentemente do achado ecocardiográfico simultâneo.\n\nIMAGEM\n- Preferir medidas validadas para a raça e método de Simpson modificado quando disponível.\n- NT-proBNP e troponina podem apoiar triagem, mas não substituem Holter e ecocardiograma.',
    practicalApplicationText:
      'Criar agenda anual com Holter e ecocardiograma desde cerca de três anos. Registrar método, volumes, função sistólica e número/complexidade de VPCs para comparação longitudinal. Resultado limítrofe pede repetição em intervalo menor ou revisão por cardiologista; biomarcador alterado deve direcionar investigação, não fechar diagnóstico isoladamente.',
    appNotesText:
      `STATUS: COMPLEMENTAR — principal protocolo específico para Dobermann.\n\nOs limiares não devem ser extrapolados automaticamente para todas as raças. Tendência longitudinal e qualidade do registro são parte do diagnóstico.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-esvc-dcm-dobermann-2017',
        citationText:
          'Wess G. et al. European Society of Veterinary Cardiology screening guidelines for dilated cardiomyopathy in Doberman Pinschers. J Vet Cardiol. 2017;19:405–415.',
        sourceType: 'Guideline complementar',
        url: 'https://livrepository.liverpool.ac.uk/3020158/',
        notes: 'Rastreamento específico por Holter e ecocardiografia.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['cardiomiopatia-dilatada-caes-gatos'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Complementar',
  },
  {
    id: 'con-dcm-screening-caes-2022',
    slug: 'dcm-screening-caes-2022',
    title: 'Rastreamento de cardiomiopatia dilatada em cães',
    shortTitle: 'Rastreamento de DCM — revisão 2022',
    sourceOrganization: 'Journal of Veterinary Cardiology',
    year: 2022,
    species: 'dog',
    category: 'cardiologia',
    tags: ['DCM', 'Rastreamento', 'Raças predispostas', 'Holter', 'Biomarcadores'],
    pdfUrl: 'https://doi.org/10.1016/j.jvc.2021.09.004',
    pdfFileName: 'dcm-screening-caes-2022',
    storagePath: 'external/dcm-screening-caes-2022',
    summary:
      'Revisão prática de 2022 que atualiza métodos e recomendações de rastreamento de DCM em raças caninas predispostas.',
    articleSummaryRichText:
      '<p>Fonte complementar — não é consenso formal — útil para ampliar o rastreamento além do Dobermann e integrar ecocardiografia, Holter e biomarcadores.</p>',
    keyPointsText:
      'RASTREAMENTO PRÁTICO\n- A fase pré-clínica pode ser arrítmica, estrutural ou combinar ambas.\n- Considerar início por volta de três anos em raças predispostas e repetir anualmente; um exame único normal não exclui doença futura.\n- Holter é essencial em Dobermann e Boxer e pode ser útil em outras raças.\n- Em termos gerais, >100 VPCs/24 h aumenta a suspeita, mas limites específicos da raça prevalecem.\n- Ecocardiografia deve usar medidas consistentes, incluindo Simpson modificado quando apropriado.\n- NT-proBNP e troponina ajudam a selecionar risco, sem substituir Holter e imagem.',
    practicalApplicationText:
      'Usar esta revisão para desenhar programas de rastreamento por raça. Registrar idade inicial, intervalo, histórico familiar, dieta e método de imagem; escolher Holter conforme o fenótipo arrítmico esperado. Resultado discordante entre biomarcador, Holter e ecocardiograma pede repetição e interpretação especializada, não classificação automática.',
    appNotesText:
      `STATUS: COMPLEMENTAR — revisão especializada, não consenso formal.\n\nExibir como atualização prática e manter o tipo de evidência explícito para não confundir recomendação de revisão com consenso de sociedade.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-dcm-screening-2022',
        citationText:
          'Wess G. Screening for dilated cardiomyopathy in dogs. J Vet Cardiol. 2022;40:51–68.',
        sourceType: 'Revisão especializada',
        url: 'https://doi.org/10.1016/j.jvc.2021.09.004',
        notes: 'Atualização prática para rastreamento de raças predispostas.',
        evidenceLevel: 'Revisão narrativa',
      },
    ],
    relatedDiseaseSlugs: ['cardiomiopatia-dilatada-caes-gatos'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Complementar',
  },
  {
    id: 'con-curative-risco-trombotico-2022',
    slug: 'curative-risco-trombotico-2022',
    title: 'CURATIVE — populações sob risco de trombose',
    shortTitle: 'Risco trombótico — CURATIVE 2022',
    sourceOrganization: 'ACVECC CURATIVE',
    year: 2022,
    species: 'both',
    category: 'cardiologia',
    tags: ['Trombose', 'Risco', 'Tromboembolismo', 'Cardiomiopatia', 'Interdisciplinar'],
    pdfUrl: 'https://escholarship.org/uc/item/0ss8j8dd',
    pdfFileName: 'curative-risco-trombotico-2022',
    storagePath: 'external/curative-risco-trombotico-2022',
    summary:
      'Atualização CURATIVE 2022 para classificar populações e intervenções associadas a risco trombótico em cães e gatos.',
    articleSummaryRichText:
      '<p>Consenso interdisciplinar que sustenta a decisão de prescrever antitrombótico a partir do risco documentado, evitando tratar toda doença potencialmente pró-trombótica da mesma forma.</p>',
    keyPointsText:
      'APLICAÇÃO CARDIOLÓGICA\n- Avaliar cardiomiopatia felina com aumento atrial, contraste espontâneo, trombo intracardíaco ou tromboembolismo prévio.\n- Considerar tromboembolismo pulmonar, dirofilariose, cateteres, circuitos extracorpóreos e marca-passo transvenoso no contexto global.\n- Diferenciar associação observada, risco baixo/moderado/alto e benefício demonstrado de profilaxia.\n- Doença ou procedimento associado à trombose não significa indicação automática do mesmo fármaco para todos.\n- Função renal, sangramento, interações, viabilidade de administração e monitorização modificam a decisão.',
    practicalApplicationText:
      'Antes de prescrever, documentar o evento que se pretende prevenir, probabilidade e consequência da trombose, risco hemorrágico, rim/fígado, plaquetas/hematócrito e possibilidade de monitorização. Em gatos cardiopatas, combinar este domínio de risco com o consenso ACVIM 2020 e com o CURATIVE de protocolos para escolher o agente.',
    appNotesText:
      `STATUS: INTERDISCIPLINAR — usar para estratificação de risco, não como protocolo de dose isolado.\n\nA atualização amplia condições e intervenções avaliadas, mas também destaca lacunas importantes de evidência.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-curative-risco-2022',
        citationText:
          'deLaforcade A. et al. 2022 Update of the CURATIVE consensus, Domain 1: Defining populations at risk. J Vet Emerg Crit Care. 2022.',
        sourceType: 'Consenso interdisciplinar',
        url: 'https://doi.org/10.1111/vec.13204',
        notes: 'Estratificação de populações e intervenções associadas à trombose.',
        evidenceLevel: 'Consenso baseado em revisão sistemática',
      },
    ],
    relatedDiseaseSlugs: [
      'cardiomiopatia-hipertrofica-caes-gatos',
      'cardiomiopatia-restritiva-felina',
    ],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Interdisciplinar',
  },
  {
    id: 'con-curative-antitromboticos-2019',
    slug: 'curative-antitromboticos-2019',
    title: 'CURATIVE — protocolos antitrombóticos',
    shortTitle: 'Antitrombóticos — CURATIVE 2019',
    sourceOrganization: 'ACVECC CURATIVE',
    year: 2019,
    species: 'both',
    category: 'cardiologia',
    tags: ['Antitrombóticos', 'Clopidogrel', 'Anticoagulantes', 'Tromboembolismo', 'Interdisciplinar'],
    pdfUrl: 'https://doi.org/10.1111/vec.12795',
    pdfFileName: 'curative-antitromboticos-2019',
    storagePath: 'external/curative-antitromboticos-2019',
    summary:
      'Consenso CURATIVE 2019 sobre escolha e protocolos de antiplaquetários e anticoagulantes em cães e gatos sob risco de trombose.',
    articleSummaryRichText:
      '<p>Documento interdisciplinar para alinhar o fármaco ao mecanismo predominante, à evidência disponível e ao risco hemorrágico, com relevância direta para tromboembolismo cardiogênico felino.</p>',
    keyPointsText:
      'MECANISMO PREDOMINANTE\n- Trombo arterial, rico em plaquetas: favorece estratégia antiplaquetária; clopidogrel tem o suporte mais estabelecido no risco de tromboembolismo arterial cardiogênico felino.\n- Trombo venoso ou pulmonar, rico em fibrina: favorece anticoagulação, escolhida conforme indicação, espécie, função renal/hepática e possibilidade de monitorização.\n\nPRINCÍPIOS\n- Aspirina isolada não é recomendada como única prevenção em gatos com cardiomiopatia.\n- Combinações podem ser consideradas em risco excepcionalmente alto, mas aumentam a possibilidade de sangramento.\n- Para vários fármacos, a evidência de protocolo específico ainda é limitada; monitorização e individualização permanecem essenciais.\n- Interromper todo antitrombótico antes de procedimento não deve ser automático: comparar risco hemorrágico e trombótico.',
    practicalApplicationText:
      'Definir se a meta é prevenção primária, secundária ou tratamento de trombo visível. Classificar o evento como arterial ou venoso/pulmonar, revisar hemograma/plaquetas, rim, fígado, sangramento prévio, interações e adesão. Registrar agente, dose, frequência, duração, parâmetros de monitorização e plano perioperatório. Em cardiomiopatia felina, integrar risco atrial e histórico de ATE.',
    appNotesText:
      `STATUS: INTERDISCIPLINAR — referência de protocolos antitrombóticos.\n\nNão copiar uma dose sem conferir espécie, indicação, formulação, função renal/hepática e atualização da evidência. Combinações exigem justificativa e vigilância de sangramento.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-curative-antitromboticos-2019',
        citationText:
          'Blais M.-C. et al. CURATIVE: Domain 3—Defining antithrombotic protocols. J Vet Emerg Crit Care. 2019;29:60–74.',
        sourceType: 'Consenso interdisciplinar',
        url: 'https://doi.org/10.1111/vec.12795',
        notes: 'Protocolos de antiplaquetários e anticoagulantes.',
        evidenceLevel: 'Consenso baseado em revisão sistemática',
      },
    ],
    relatedDiseaseSlugs: [
      'cardiomiopatia-hipertrofica-caes-gatos',
      'cardiomiopatia-restritiva-felina',
    ],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Interdisciplinar',
  },
  {
    id: 'con-consenso-cardiorrenal-2015',
    slug: 'consenso-cardiorrenal-2015',
    title: 'Distúrbios do eixo cardiovascular–renal',
    shortTitle: 'Consenso cardiorrenal — 2015',
    sourceOrganization: 'CRS Consensus Group',
    year: 2015,
    species: 'both',
    category: 'cardiologia',
    tags: ['Cardiorrenal', 'Rim', 'Hemodinâmica', 'Diurético', 'Interdisciplinar'],
    pdfUrl: 'https://onlinelibrary.wiley.com/doi/10.1111/jsap.12387',
    pdfFileName: 'consenso-cardiorrenal-2015',
    storagePath: 'external/consenso-cardiorrenal-2015',
    summary:
      'Consenso veterinário sobre definição, classificação, diagnóstico e manejo das interações entre sistema cardiovascular e rins em cães e gatos.',
    articleSummaryRichText:
      '<p>Documento interdisciplinar para interpretar alterações renais durante doença cardíaca e alterações cardiovasculares durante doença renal a partir do estado hemodinâmico completo.</p>',
    keyPointsText:
      'EIXOS DE INTERAÇÃO\n- CvRD-H: doença cardiovascular causando lesão ou disfunção renal.\n- CvRD-K: doença renal causando alteração cardiovascular.\n- CvRD-O: doença, toxina ou fármaco afetando ambos os sistemas.\n- Cada apresentação deve ser classificada como estável ou instável.\n\nAVALIAÇÃO\n- Integrar congestão, perfusão, pressão arterial, hidratação, peso, diurese, eletrólitos, creatinina/ureia e tendência clínica.\n- A função renal modifica farmacocinética e risco de fármacos cardíacos.\n- Fluidos podem precipitar congestão ou crise hipertensiva; diurese excessiva pode causar hipovolemia e hipoperfusão.\n- Pequeno aumento de creatinina após descongestão não exige automaticamente suspender o diurético se o paciente continua congesto.',
    practicalApplicationText:
      'FLUXO CARDIORRENAL\n1. Definir se predomina congestão, baixo débito, hipertensão, desidratação ou doença renal primária.\n2. Registrar frequência respiratória, peso, ingestão, pressão, débito urinário, creatinina/ureia, eletrólitos e urinálise/UPC quando indicadas.\n3. Interpretar tendência, não um número isolado.\n4. Paciente ainda congesto pode precisar manter descongestão apesar de azotemia discreta; paciente hipotenso, desidratado e sem congestão pede redução ou reorganização.\n5. Reavaliar cedo após mudanças de diurético, bloqueio do RAAS, fluidoterapia ou anti-hipertensivo.',
    appNotesText:
      `STATUS: INTERDISCIPLINAR — integra cardiologia e nefrologia.\n\nCreatinina aumentada após diurético não significa automaticamente lesão renal que exige suspensão. A decisão depende de congestão, perfusão, pressão, hidratação e tendência.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-consenso-cardiorrenal-2015',
        citationText:
          'Pouchelon J. L. et al. Cardiovascular–renal axis disorders in the domestic dog and cat: a veterinary consensus statement. J Small Anim Pract. 2015;56:537–552.',
        sourceType: 'Consenso interdisciplinar',
        url: 'https://doi.org/10.1111/jsap.12387',
        notes: 'Definição e manejo inicial dos distúrbios cardiovasculares–renais.',
        evidenceLevel: 'Consenso Delphi',
      },
    ],
    relatedDiseaseSlugs: [
      'doenca-renal-cronica',
      'hipertensao-arterial-sistemica-caes-gatos',
      'doenca-valvar-mitral-degenerativa-caes',
    ],
    relatedMedicationSlugs: ['benazepril'],
    isDemonstrative: false,
    warningLabel: 'Interdisciplinar',
  },
  {
    id: 'con-acvim-valvular-canina-2009',
    slug: 'acvim-valvular-canina-2009',
    title: 'Doença valvar crônica canina',
    shortTitle: 'Doença valvar — ACVIM 2009',
    sourceOrganization: 'ACVIM',
    year: 2009,
    species: 'dog',
    category: 'cardiologia',
    tags: ['Doença valvar', 'MMVD', 'Histórico', 'Estadiamento'],
    pdfUrl: 'https://doi.org/10.1111/j.1939-1676.2009.0392.x',
    pdfFileName: 'acvim-valvular-canina-2009',
    storagePath: 'external/acvim-valvular-canina-2009',
    summary:
      'Consenso histórico ACVIM 2009 sobre doença valvar crônica canina, preservado para rastreabilidade e substituído pelo ACVIM 2019.',
    articleSummaryRichText:
      '<p>Documento que consolidou o estadiamento A–D e a abordagem por fase clínica, mas não deve orientar sozinho decisões atuais sobre B2 ou insuficiência cardíaca avançada.</p>',
    keyPointsText:
      'ESTADIAMENTO HISTÓRICO\n- A: cães sob risco, sem alteração estrutural identificada.\n- B1: doença valvar estrutural sem remodelamento cardíaco relevante.\n- B2: doença estrutural com remodelamento, ainda sem sinais de insuficiência cardíaca.\n- C: doença estrutural com sinais atuais ou prévios de insuficiência cardíaca.\n- D: insuficiência cardíaca refratária ao tratamento padrão.\n\nLIMITAÇÕES HISTÓRICAS\n- Publicado antes das evidências que sustentam pimobendan no B2 contemporâneo.\n- Critérios de remodelamento e recomendações terapêuticas foram revisados em 2019.\n- Não aplicar recomendações antigas sem confronto com o documento vigente.',
    practicalApplicationText:
      'Manter para comparação histórica, auditoria editorial e compreensão da evolução do estadiamento. Para classificar ou tratar um cão hoje, abrir primeiro o ACVIM 2019; usar este documento apenas quando for necessário rastrear a origem de uma recomendação antiga.',
    appNotesText:
      `STATUS: HISTÓRICO/SUBSTITUÍDO — não usar como fonte principal de decisão.\n\nO ACVIM 2019 revisou formalmente este consenso, especialmente o manejo pré-clínico e avançado.\n\n${CONSENSUS_DISCLAIMER}`,
    references: [
      {
        id: 'ref-acvim-valvular-2009',
        citationText:
          'Atkins C. et al. Guidelines for the diagnosis and treatment of canine chronic valvular heart disease. J Vet Intern Med. 2009;23:1142–1150.',
        sourceType: 'Consenso histórico',
        url: 'https://doi.org/10.1111/j.1939-1676.2009.0392.x',
        notes: 'Substituído como referência principal pelo ACVIM 2019.',
        evidenceLevel: 'Consenso de especialistas',
      },
    ],
    relatedDiseaseSlugs: ['doenca-valvar-mitral-degenerativa-caes'],
    relatedMedicationSlugs: [],
    isDemonstrative: false,
    warningLabel: 'Histórico',
  },
];
