import { DiseaseRecord } from '../../types/disease';

/** Hiperadrenocorticismo (síndrome de Cushing) — cães e gatos; texto editorial integrando ACVIM, MSD, AAFP. */
export const hiperadrenocorticismoCushingRecord: DiseaseRecord = {
  id: 'disease-hiperadrenocorticismo-cushing',
  slug: 'hiperadrenocorticismo-sindrome-cushing',
  title: 'Hiperadrenocorticismo (síndrome de Cushing)',
  synonyms: ['Síndrome de Cushing', 'HAC', 'Hipercortisolismo', 'Hyperadrenocorticism', 'Cushingoid'],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  tags: ['Cortisol', 'PDH', 'ADH', 'Trilostano', 'LDDST', 'ACTH', 'PU/PD', 'Diabetes felino'],
  quickSummary:
    'Síndrome por exposição crônica a excesso de cortisol: hipófise estimulando demais as adrenais (forma hipófise-dependente, PDH), tumor adrenal autônomo (forma adrenal dependente, ADH) ou glicocorticoide exógeno em excesso. Em cães é relativamente comum (meia-idade a idosos; na maioria a forma hipófise-dependente). Em gatos é rara, costuma ser hipófise-dependente e frequentemente coexiste com diabetes mellitus e pele extremamente frágil. O diagnóstico exige combinação de história, clínica, banco mínimo e teste endócrino apropriado, depois diferenciação entre PDH e ADH. Tratamento moderno: trilostano como base em muitos casos, cirurgia selecionada e monitoramento cuidadoso para evitar hipocortisolismo iatrogênico.',
  quickDecisionStrip: [
    'Cão com poliúria e polidipsia, polifagia, abdômen pendular, ofegação e alopecia simétrica: pense forte em hiperadrenocorticismo.',
    'Gato diabético difícil de controlar e pele fina ou frágil: pense forte em hiperadrenocorticismo felino.',
    'Não peça teste endócrino só porque a fosfatase alcalina veio alta.',
    'Cão estável: o teste de supressão com dexametasona em baixa dose (LDDST) costuma ser o melhor exame de triagem; com comorbidade importante ou suspeita iatrogênica, o teste de estimulação com ACTH ganha valor.',
    'Trilostano é a base do tratamento médico atual na maioria dos cães (e muitos gatos), com reavaliações seriadas.',
  ],
  quickSummaryRich: {
    lead:
      'Excesso crônico de cortisol: forma hipófise-dependente (PDH), adrenal dependente (ADH) ou iatrogênica por glicocorticoide exógeno. Em cães é relativamente comum; em gatos é rara e frequentemente associa-se a diabetes e pele frágil. O raciocínio combina história, clínica, triagem laboratorial e testes de supressão ou estímulo; depois diferencia hipófise-dependente de adrenal dependente para definir conduta.',
    leadHighlights: ['PDH', 'ADH', 'cortisol', 'trilostano'],
    pillars: [
      {
        title: 'Formas principais',
        body:
          'PDH estimula as adrenais via ACTH; ADH produz cortisol de modo autônomo; a forma iatrogênica ocorre com prednisolona/prednisona ou outros glicocorticoides em excesso (inclusive tópicos/oto).',
        highlights: ['PDH', 'ADH', 'prednisolona'],
      },
      {
        title: 'Sinais que puxam o diagnóstico',
        body: 'Poliúria e polidipsia, polifagia, abdômen pendular, alterações de pele e fraqueza; no gato, diabetes mal controlada e fragilidade cutânea marcada.',
        highlights: ['poliúria', 'polidipsia'],
      },
      {
        title: 'Próximo passo lógico',
        body: 'Confirmar hipercortisolismo com teste adequado ao cenário; em seguida discriminar PDH vs ADH e planejar tratamento com metas de segurança.',
        highlights: ['hipercortisolismo'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (simplificado)',
      steps: [
        {
          label: '1. Decidir se há indicação de testar',
          detail:
            'PU/PD, polifagia, abdômen pendular, dermatopatia endócrina, fraqueza — ou gato diabético com pele de papel; não triar só por fosfatase alcalina isolada.',
        },
        {
          label: '2. Banco mínimo contextual',
          detail:
            'Bioquímica, urinálise, pressão arterial se possível; identificar diabetes, hipertensão ou doença renal que modulam interpretação.',
        },
        {
          label: '3. Confirmar hipercortisolismo',
          detail:
            'Cão estável: LDDST frequentemente primeira escolha; ACTH stim se iatrogenia suspeita ou comorbidade que invalida supressão; UCCR para triagem/exclusão com colheita domiciliar.',
        },
        {
          label: '4. Diferenciar PDH, ADH e iatrogenia',
          detail:
            'Ultrassom adrenal (assimetria), ACTH endógeno, história minuciosa de corticoide tópico/ótico/injetável; erro aqui leva a cirurgia errada ou trilostano desnecessário.',
        },
        {
          label: '5. Imagem hipofisária selecionada',
          detail:
            'Macrotumor neurológico ou candidato a radioterapia/hipofisectomia — planejar antes de prometer apenas trilostano vitalício.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Linhas de tratamento (visão geral)',
      steps: [
        {
          label: '1. Terapia médica (maioria)',
          detail:
            'Trilostano: ajuste por teste de estimulação com ACTH e clínica; mitotano se intolerância ou segunda linha experiente.',
        },
        {
          label: '2. Cirurgia adrenal',
          detail:
            'ADH unilateral operável com equipe preparada para manejo perioperatório de hipertensão e hipocalemia.',
        },
        {
          label: '3. Iatrogenia',
          detail:
            'Mapa de desmame do glicocorticoide exógeno; suporte se insuficiência adrenal relativa — não “somar trilostano” sem critério.',
        },
        {
          label: '4. Felino',
          detail:
            'Trilostano + controle agressivo de glicemia e fragilidade cutânea; discutir radioterapia/hipofisectomia em centros.',
        },
        {
          label: '5. Segurança contínua',
          detail:
            'Sinais de hipocortisolismo medicamentoso (anorexia, vômito, colapso) são emergência — tutor deve reconhecer.',
        },
      ],
    },
  },
  etiology: {
    conceitoEixoHPA:
      'O eixo hipófise–adrenal funciona como um termostato hormonal: hipotálamo → ACTH → cortisol; o cortisol deveria frear o sistema por retroalimentação negativa. No Cushing, esse freio falha ou fica irrelevante — exposição prolongada a cortisol alto altera metabolismo, pele, músculos, fígado, vasos, rim e imunidade.',
    comparacaoTiposHAC: {
      kind: 'clinicalTable' as const,
      headers: [
        'Tipo',
        'Mecanismo central',
        'Frequência no cão (espontâneo)',
        'Eixo ACTH e adrenais',
        'Tratamento típico (visão geral)',
      ],
      rows: [
        [
          'Hipófise-dependente (PDH)',
          'Adenoma hipofisário secreta ACTH em excesso → estímulo contínuo das adrenais → hipercortisolismo.',
          'Cerca de 80 a 85% dos casos espontâneos no cão.',
          'ACTH alto ou inadequadamente “normal”; adrenais bilaterais hiperplásicas ou simétricas ao ultrassom.',
          'Trilostano como base; mitotano em alternativa; radioterapia hipofisária ou hipofisectomia em casos selecionados; considerar neurológico se macrotumor.',
        ],
        [
          'Adrenal dependente (ADH)',
          'Adenoma ou carcinoma adrenal produz cortisol de forma autônoma, sem dependência fisiológica de ACTH.',
          'Cerca de 15 a 20% dos casos espontâneos no cão.',
          'ACTH baixo ou suprimido; uma adrenal aumentada e contralateral pequena ou atrófica ao ultrassom.',
          'Adrenalectomia quando operável e clinicamente estável; trilostano se não operável ou como ponte.',
        ],
        [
          'Iatrogênico',
          'Uso prolongado de glicocorticoide exógeno (oral, tópico, oftálmico, otológico ou injetável de depósito) suprime o eixo hipófise–adrenal.',
          'Proporção variável conforme prescrição na população — não entra na mesma conta dos casos “espontâneos” acima.',
          'ACTH baixo; adrenais atróficas por falta de estímulo.',
          'Desmame gradual supervisionado do corticoide e suporte clínico; não confundir com PDH ou ADH nem induzir trilostano “por rotina”.',
        ],
      ],
    },
    formasNoCaes:
      'Na prática do cão espontâneo, PDH e ADH concentram a quase totalidade dos casos; o iatrogênico é uma categoria aparte, definida pelo uso de corticoide exógeno. Confirme sempre na anamnese medicamentos, inclusive tópicos e injetáveis de depósito, antes de fechar o diagnóstico etiológico.',
    formasNosGatos:
      'Doença rara; na maioria PDH. O quadro costuma destacar diabetes mellitus difícil de controlar, emagrecimento ou caquexia, fraqueza, má cicatrização, equimoses e fragilidade cutânea marcada — não apenas “cão em miniatura”.',
  },
  epidemiology: {
    especiesCaes:
      'Meia-idade a idosos (tipicamente ~7–12 anos). Raças frequentemente citadas em PDH: Poodle miniatura, Dachshund, Boxer, Boston Terrier, Beagle. Tumores adrenais mais comuns em cães maiores; alguns textos clássicos citam predileção por fêmeas em ADH.',
    especiesGatos:
      'Muito menos frequente que no cão; muitos casos com mais de 10 anos, sem padrão tão forte de raça ou sexo. Epidemiologicamente relevante: a maioria dos gatos com hiperadrenocorticismo tem ou desenvolve diabetes mellitus — isso remodela apresentação e raciocínio diagnóstico.',
  },
  pathogenesisTransmission: {
    transmissao:
      'Não é doença contagiosa entre animais nem zoonose típica: cada caso reflete tumor hipofisário ou adrenal, uso de glicocorticoide ou, mais raramente, outras causas — não “pega de um paciente para outro”.',
    patogenesePDH:
      'Tumor hipofisário secreta ACTH em excesso → estimulação contínua da zona fasciculada → cortisol elevado; o tumor não responde adequadamente ao “freio” do cortisol.',
    patogeneseADH:
      'Adrenal tumoral produz cortisol independentemente de ACTH → supressão de ACTH e atrofia da adrenal contralateral (padrão útil na ultrassonografia).',
    patogeneseIatrogenica:
      'Glicocorticoide exógeno mimetiza hipercortisolismo crônico → eixo hipófise–adrenal suprimido e adrenal sem estímulo adequado. Suspensão abrupta pode deixar o animal incapaz de produzir cortisol suficiente (insuficiência adrenal secundária).',
  },
  pathophysiology:
    'Cortisol em excesso crônico aumenta catabolismo proteico (fraqueza, atrofia abdominal, abdômen pendular), reduz síntese de colágeno e renovação cutânea (pele fina, comedões, alopecia endócrina, calcinosis cutis no cão; no gato “pele de papel”), antagoniza insulina (diabetes mellitus e resistência), favorece hepatopatia vacuolar e hepatomegalia, reduz capacidade de concentrar urina (poliúria e polidipsia), altera lipídios e predispõe a complicações tromboembólicas, hipertensão e infecções secundárias.',
  clinicalSignsPathophysiology: {
    sinaisPorSistema: [
      {
        system: 'renal',
        findings: [
          'Poliúria e polidipsia — perda de capacidade de concentrar urina; no cão USG <1,020 é frequente, mas nem todos ficam tão hipostenúricos.',
        ],
      },
      {
        system: 'metabolic',
        findings: [
          'Polifagia — cortisol aumenta apetite.',
          'Resistência insulínica/hiperglicemia — especialmente relevante no gato com DM associada.',
        ],
      },
      {
        system: 'dermatologic',
        findings: [
          'Cão: alopecia simétrica, pele fina, comedões, hiperpigmentação, calcinosis cutis, falha de crescimento pós-tosa.',
          'Gato: pele extremamente fina/frágil, alopecia, má cicatrização, hematomas; coat ruim.',
        ],
      },
      {
        system: 'musculoskeletal',
        findings: [
          'Panting, intolerância ao exercício, fraqueza e atrofia muscular — catabolismo e aumento abdominal.',
          'Abdômen pendular — hepatomegalia + musculatura abdominal fina + redistribuição de gordura.',
        ],
      },
      {
        system: 'immune',
        findings: [
          'Infecção urinária, piodermite, demodicose secundária — imunomodulação pelo cortisol.',
        ],
      },
      {
        system: 'neurologic',
        findings: [
          'Sinais centrais possíveis com macrotumor hipofisário (ex.: círculos, ataxia, alteração comportamental, estupor).',
        ],
      },
      {
        system: 'multisystemic',
        findings: [
          'Gato: tríade marcante — diabetes de difícil controle, emagrecimento/caquexia e fraqueza, pele extremamente frágil; apresentação pode ser sutil até o DM permanecer mal controlado apesar de insulinoterapia agressiva.',
        ],
      },
    ],
    cushFiguraFrenchieAbdomen: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/cush-frenchie-abdomen.png',
      alt: 'Bulldog Francês com abdômen penduloso',
      caption:
        'Bulldog Francês apresentando abdômen penduloso (pot-bellied) característico de hiperadrenocorticismo devido ao catabolismo muscular induzido por cortisol e redistribuição de gordura.',
    },
    cushFiguraAlopeciaAbdomen: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/cush-alopecia-abdomen.png',
      alt: 'Cão com abdômen penduloso e alopecia simétrica bilateral',
      caption:
        'Cão apresentando abdômen penduloso associado à alopecia simétrica bilateral endocrinopática, com pele fina e atrófica.',
    },
  },
  diagnosis: {
    cushDiagnosticoAbordagem:
      'A suspeita de Cushing baseia-se na história clínica (PU/PD, polifagia, ofegação, letargia) e no exame físico (abdômen penduloso, alopecia simétrica bilateral, pele fina, comedões, calcinose cutânea). Exames laboratoriais iniciais (banco mínimo de triagem) mostram comumente: leucograma de estresse (neutrofilia, linfopenia, eosinopenia), FA (fosfatase alcalina) marcadamente elevada (85-95% dos cães por isoenzima induzida), ALT aumentada, hipercolesterolemia, hipertrigliceridemia, densidade urinária diminuída (<1,020 ou hipostenúrica) e proteinúria (em >50% dos cães). Nenhum teste de triagem endócrina deve ser solicitado sem sinais clínicos compatíveis.',
    cushDiagnosticoTriagem:
      'Para confirmar ou excluir a suspeita de Cushing espontâneo, são empregados três principais exames de triagem endócrina:\n\n' +
      '1) Teste de Supressão com Dexametasona em Baixa Dose (LDDST): Considerado o teste de triagem de escolha pela diretriz ACVIM (sensibilidade de 90-95% em PDH, especificidade de ~50% afetada por estresse/doença). Protocolo: Dosagem de cortisol sérico antes (basal), 4 horas e 8 horas após administração de dexametasona (0.01-0.015 mg/kg IV). Interpretação: Cortisol em 8h acima do ponto de corte laboratorial (ex: >1.4 µg/dL ou >40 nmol/L) confirma Cushing espontâneo.\n\n' +
      '2) Teste de Estimulação com ACTH: O único padrão ouro para o diagnóstico de Cushing Iatrogênico. Avalia a reserva cortical. Sensibilidade menor (85% em PDH), mas muito menos afetado por comorbidades não-adrenais e estresse. Protocolo: Dosagem de cortisol sérico antes e 1 a 2 horas após injeção de ACTH sintético (Cosintropina). Interpretação: Cortisol pós-ACTH excessivo/exagerado confirma Cushing; cortisol pós-ACTH suprimido/baixo associado a sinais compatíveis confirma Cushing Iatrogênico.\n\n' +
      '3) Razão Cortisol:Creatinina Urinária (UCCR): Excelente teste de exclusão (sensibilidade de 75-100%, baixíssima especificidade). A urina deve ser coletada em casa pelo tutor por 2 dias seguidos (no mínimo 2 dias após visita clínica para evitar estresse). Interpretação: UCCR normal descarta Cushing com alta confiabilidade; UCCR elevado NÃO é diagnóstico, exigindo confirmação por LDDST ou ACTH.',
    cushDiagnosticoDiferenciacao:
      'Após a confirmação diagnóstica do Cushing, realiza-se a diferenciação entre Cushing Hipófise-Dependente (PDH) e Cushing Adrenal-Dependente (ADH / Tumor de Adrenal) para definir a conduta:\n\n' +
      '1) Critérios de Supressão no LDDST: Em ~60% dos cães com PDH, ocorre supressão temporária do cortisol no LDDST. Critérios de supressão: Cortisol às 4h < limite do lab ou <50% do valor basal, ou às 8h <50% do valor basal. Se preencher qualquer um desses critérios no teste de triagem LDDST, o diagnóstico de PDH está confirmado. Se não suprimir, pode ser PDH ou ADH, requerendo HDDST, dosagem de ACTH endógeno ou ultrassonografia.\n\n' +
      '2) Teste de Supressão com Dexametasona em Alta Dose (HDDST): Protocolo idêntico ao LDDST, mas com dose elevada de dexametasona (0.1 mg/kg IV). Supressão (<50% do basal ou <1.4 µg/dL às 4h ou 8h) confirma PDH. A ausência de supressão indica ADH (tumor autônomo) ou ~25-30% de casos de PDH resistentes a supressão.\n\n' +
      '3) Dosagem de ACTH Endógeno (eACTH): Método direto muito confiável. Coleta exige cuidados críticos (tubo de plástico com EDTA previamente resfriado, centrifugar rápido e congelar imediatamente o plasma). Interpretação: eACTH normal ou elevado indica PDH; eACTH suprimido/indetectável indica ADH (tumor adrenal secreta cortisol autônomo que inibe o ACTH hipofisário).\n\n' +
      '4) Ultrassonografia Abdominal: Permite visualizar diretamente ambas as glândulas adrenais. Em cães com PDH, observa-se aumento bilateral simétrico/assimétrico (hiperplasia) com manutenção do formato de feijão (largura >0.6-0.75 cm conforme o porte). Em cães com ADH, detecta-se aumento unilateral com massa/nódulo na adrenal afetada e atrofia contralateral (zona glomerulosa atrófica devido à supressão do ACTH).',
  },
  treatment: {
    decisaoInicial:
      'Definir se o caso será manejado clinicamente, encaminhado para cirurgia especializada (adrenalectomia, hipofisectomia) ou radioterapia. Em pacientes debilitados, trilostano pré-operatório é comum para estabilização.',
    trilostanoNoCao:
      'Primeira escolha médica na maioria dos cães (forma hipófise-dependente e muitos casos de forma adrenal dependente não operáveis). Mecanismo: inibe a enzima 3β-hidroxiesteroide desidrogenase, reduzindo de modo reversível a síntese de cortisol, aldosterona e andrógenos adrenais.\n\n' +
      'Doses: bula ou registro frequentemente indicam 2,2 a 6,7 mg/kg via oral a cada 24 horas com alimento; reavaliar em 10 a 14 dias com teste de estimulação com ACTH e bioquímica. Esquemas extra-label comuns em medicina interna: cerca de 1 mg/kg a cada 12 horas com alimento, ou 2 mg/kg a cada 24 horas, preferindo administração duas vezes ao dia; alguns animais necessitam três vezes ao dia. O Plumb descreve esquemas duas vezes ao dia com doses menores em cães pequenos e protocolos de baixa dose — individualizar sempre.\n\n' +
      'Monitoramento: primeiro retorno em 10 a 14 dias; após cada ajuste, novo controle em 10 a 14 dias; depois em 30 dias, 90 dias e aproximadamente a cada três meses. Incluir eletrólitos, função renal e hepática, urinálise e teste de estimulação com ACTH em horário padronizado após a cápsula (muitos serviços usam cerca de 4 a 6 horas após a dose; manter o mesmo critério no mesmo paciente). Metas de cortisol pós-ACTH variam entre autores (por exemplo Nelson cerca de 2 a 5 µg/dL; o Plumb aceita controle clínico com faixa mais ampla se o animal está bem). Efeitos adversos: letargia, anorexia, sinais gastrointestinais, alteração de eletrólitos, hipoadrenocorticismo iatrogênico; suspender e reavaliar se houver sinais compatíveis.',
    mitotanoNoCao:
      'Segunda linha ou alternativa quando o trilostano falha ou não é tolerado; fármaco adrenocorticolítico — exige vigilância maior. Indução clássica: cerca de 50 mg/kg por dia via oral divididos a cada 12 horas com alimento (reduzir se não houver polidipsia ou na presença de diabetes). Primeiro teste de estimulação com ACTH por volta de 5 a 7 dias; meta de cortisol pós-ACTH semelhante à literatura de controle. Manutenção: esquemas semanais fracionados (por exemplo Nelson cerca de 35 a 50 mg/kg por semana in duas ou três doses; existem protocolos mais ablativos). Prednisolona ou prednisona pode acompanhar a indução ou ficar disponível para emergência. Monitorar de perto; suspender diante de anorexia, letargia, vômito, diarreia ou fraqueza.',
    cetoconazolNoCao:
      'Não é primeira escolha; eficácia menos previsível, hepatotoxicidade e interações medicamentosas. Esquema típico: escalar de 5 mg/kg duas vezes ao dia por 7 dias, depois 10 mg/kg duas vezes ao dia por 14 dias, então repetir o teste com ACTH; se necessário até 15 a 20 mg/kg ou mais duas vezes ao dia. Uso em gatos é controverso (risco gastrointestinal e hepatotoxicidade).',
    cirurgiaEspecializada:
      'Adrenalectomia: escolha para ADH operável (cão e gato). PDH felino: adrenalectomia bilateral pode funcionar, mas gera insuficiência adrenal permanente — compromisso com reposição e seguimento. Hipofisectomia: PDH, altamente especializada. Radioterapia hipofisária: macroadenoma, especialmente com sinais neurológicos — frequentemente ainda requer trilostano/mitotano para hipercortisolismo sistêmico.',
    tratamentoFelino:
      'Trilostano: escolha médica principal na maioria (por exemplo Nelson cerca de 30 mg por gato uma vez ao dia no início, ajustar conforme clínica e monitorização). Pode melhorar sinais, tolerância e controle glicêmico. Hipofisectomia ou radioterapia em casos selecionados. Metirapona: literatura mais antiga (por exemplo 30 a 70 mg/kg duas vezes ao dia, titulando), hoje menos usada que o trilostano.',
    iatrogenicoManejo:
      'Tratamento = remover a causa (corticoide exógeno), não “tratar Cushing” com trilostano de rotina. Crítico: não cessar glicocorticoide crônico abruptamente — risco de insuficiência adrenal secundária. Desmame gradual e individualizado (fármaco, dose, via, tempo de uso, doença de base, clínica). Não há esquema universal em dias válido para todos.',
    ordemDePrioridade: [
      '1) Confirmar na anamnese se o quadro é hiperadrenocorticismo espontâneo ou iatrogênico por glicocorticoide.',
      '2) Cão — trilostano como base médica na maioria; mitotano ou cetoconazol como alternativas em cenários selecionados.',
      '3) Forma adrenal dependente operável — considerar adrenalectomia em serviço preparado; estabilizar com trilostano quando necessário.',
      '4) Forma hipófise-dependente com macroadenoma ou sinais neurológicos — discutir radioterapia; frequentemente associa-se terapia médica.',
      '5) Gato — trilostano e manejo cuidadoso do diabetes mellitus e da fragilidade cutânea.',
      '6) Iatrogênico — desmame supervisionado do glicocorticoide com vigilância clínica e laboratorial.',
    ],
    monitoramento: [
      'Sinais clínicos — poliúria e polidipsia, apetite, peso, ofegação, pele, infecções secundárias; pressão arterial quando indicado.',
      'Exames laboratoriais — bioquímica, eletrólitos, urinálise; teste de estimulação com ACTH em intervalos após ajustes de trilostano ou mitotano.',
      'Gato — atenção especial à fragilidade cutânea, à glicemia e ao ajuste da dose de insulina.',
    ],
    prognosticoResumo:
      'Cão com forma hipófise-dependente tratado clinicamente: em geral boa resposta e qualidade de vida. Forma adrenal dependente operável: prognóstico pode ser muito bom se o pós-operatório transcorrer bem. Macroadenoma com sinais neurológicos: prognóstico mais reservado; a radioterapia pode prolongar a vida (estudos citam sobrevida maior em irradiados versus não tratados). Gato: cenário mais reservado — diabetes associada, caquexia e pele frágil; séries com trilostano mostram mediana de sobrevida limitada e prognóstico reservado sem tratamento adequado e suporte intensivo.',
  },
  prevention:
    'Forma espontânea: não há vacina nem profilaxia ambiental específica; vale detecção precoce em animais predispostos; não banalizar poliúria e polidipsia, ofegação crônica e alopecia endócrina; não fechar diagnóstico só por exame de triagem positivo sem contexto clínico. Forma iatrogênica: usar a menor dose eficaz e o menor tempo possível de glicocorticoide, evitar injetáveis de depósito repetidos sem critério, revisar interações medicamentosas, planejar desmame quando apropriado e educar o responsável.',
  relatedMedicationSlugs: ['prednisolona'],
  relatedConsensusSlugs: [],
  references: [
    {
      id: 'ref-behrend-acvim-2013',
      citationText:
        'Behrend EN et al. Diagnosis of spontaneous canine hyperadrenocorticism: 2012 ACVIM Consensus Statement. Journal of Veterinary Internal Medicine, 2013.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.12192',
      notes: 'Referência central para diagnóstico canino.',
      evidenceLevel: 'A — orientação especializada',
    },
    {
      id: 'ref-msd-cushing-2024',
      citationText: 'Manual MSD Veterinária. Cushing Disease (Pituitary-Dependent Hyperadrenocorticism) in Animals, 2024.',
      sourceType: 'Revisão clínica',
      url: 'https://www.msdvetmanual.com/endocrine-system/the-pituitary-gland/cushing-disease-pituitary-dependent-hyperadrenocorticism-in-animals',
      notes: 'Algoritmo e papel de LDDST, ACTH e UCCR.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-cook-evans-jfms-2021',
      citationText:
        'Cook AK, Evans JB. Recognition, diagnosis and management of the cushingoid diabetic. Journal of Feline Medicine and Surgery, 2021.',
      sourceType: 'Revisão narrativa',
      url: 'https://doi.org/10.1177/1098612X20979507',
      notes: 'DM felino e comorbidades endócrinas.',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-keith-jvim-2013',
      citationText:
        'Keith AMM et al. Trilostane therapy for treatment of spontaneous hyperadrenocorticism in cats. Journal of Veterinary Internal Medicine, 2013.',
      sourceType: 'Estudo clínico multicêntrico',
      url: 'https://doi.org/10.1111/jvim.12178',
      notes: 'Trilostano em gatos; melhora clínica e diabetes em parte dos casos.',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-valentin-jvim-2014',
      citationText:
        'Valentin SY et al. Clinical Findings, Diagnostic Test Results, and Treatment Outcome in Cats with Spontaneous Hyperadrenocorticism: 30 Cases. JVIM, 2014.',
      sourceType: 'Série retrospectiva',
      url: 'https://doi.org/10.1111/jvim.12298',
      notes: 'LDDST vs ACTH em gatos.',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-boland-jfms-2017',
      citationText: 'Boland LA et al. Peculiarities of feline hyperadrenocorticism. JFMS, 2017.',
      sourceType: 'Revisão temática',
      url: 'https://doi.org/10.1177/1098612X17723245',
      notes: 'Apresentação felina, pele frágil e DM.',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-nelson-couto-hac',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Cap. 50, Disorders of the Adrenal Gland (pp. 857–884).',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Etiologia, testes, tratamento, HAC felino.',
      evidenceLevel: 'Referência secundária',
    },
    {
      id: 'ref-feldman-endocrinology',
      citationText:
        'Feldman EC, Nelson RW, Reusch CE, Scott-Moncrieff JCR. Canine and Feline Endocrinology, 4th ed., 2015. Caps. 10–11, 14.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Cão, gato e terapia com glicocorticoide / iatrogênico.',
      evidenceLevel: 'Referência secundária',
    },
    {
      id: 'ref-plumb-2023',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 (Trilostane, Mitotane, Dexamethasone, Ketoconazole).',
      sourceType: 'Formulário',
      url: null,
      notes: 'Doses, monitoramento e eventos adversos.',
      evidenceLevel: 'Referência prática',
    },
    {
      id: 'ref-klein-cunningham',
      citationText: 'Klein BG. Cunningham’s Textbook of Veterinary Physiology, 6th ed., 2020 — endocrinologia, eixo HPA.',
      sourceType: 'Fisiologia',
      url: null,
      notes: 'Base fisiológica do cortisol.',
      evidenceLevel: 'Didático',
    },
    {
      id: 'ref-bsava-nu-2017',
      citationText: 'BSAVA Manual of Canine and Feline Nephrology and Urology, 2017 — PU/PD e urinálise em HAC.',
      sourceType: 'Manual',
      url: null,
      notes: 'Contexto urinário.',
      evidenceLevel: 'Referência prática',
    },
  ],
  isPublished: true,
  source: 'seed',
};
