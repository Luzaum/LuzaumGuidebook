import { DiseaseRecord } from '../../types/disease';

export const diseasesSeed: DiseaseRecord[] = [
  {
    id: 'disease-fistula-perianal',
    slug: 'fistula-perianal-furunculose-anal',
    title: 'Fístula perianal / furunculose anal',
    synonyms: ['Furunculose anal', 'Fístulas perianais', 'Anal furunculosis', 'Perianal fistula'],
    species: ['dog'],
    category: 'dermatologia',
    tags: ['Períneo', 'Imunomediada', 'Pastor alemão', 'Disquesia', 'Ciclosporina'],
    quickSummary:
      'Doença inflamatória crônica e muito dolorosa em cães, com ulcerações e tratos drenantes perianais. Evidência atual forte para base imunomediada (não só infecciosa ou anatômica). Classicamente Pastor Alemão de meia-idade a idoso. Diagnóstico sobretudo clínico (inspeção minuciosa + toque retal, muitas vezes sob sedação). Tratamento moderno prioriza imunomodulação (ciclosporina em primeira linha), higiene local, analgesia, manejo intestinal/alimentar; cirurgia para casos selecionados.',
    quickDecisionStrip: [
      'Dor perianal intensa com tratos drenantes = suspeita forte.',
      'Inspeção minuciosa e toque retal, muitas vezes com sedação.',
      'Pense em doença imunomediada, não só infecção.',
      'Ciclosporina é a base terapêutica atual de primeira linha.',
      'Cirurgia costuma ficar para caso residual, refratário ou com saco anal envolvido.',
    ],
    etiology: {
      visaoGeral:
        'A etiologia exata não está totalmente fechada; na prática trata-se de doença inflamatória imunomediada crônica da região perianal (Nelson & Couto: inflamação crônica com ulcerações ao redor do ânus; abordagem médica superou a cirúrgica ao reconhecer o mecanismo imune subjacente).',
      fatores: [
        'Predisposição genética/imunológica — alta frequência em Pastor Alemão sugere suscetibilidade; em predisposições raciais, PA respondem por grande parte dos casos relatados, com hipótese imunomediada.',
        'Fatores locais perianais — cauda baixa, umidade, maceração fecal e anatomia sacular no passado eram valorizados; hoje são mais agravantes/perpetuadores do que causa primária (revisão clínica recente: hipótese conformacional isolada perdeu força).',
        'Microbiota e infecção secundária — podem coexistir e piorar odor/exsudato/dor; estudos de microbiota reforçam pistas fisiopatológicas, não substituem o eixo imunomodulador.',
        'Comorbidades intestinais e componente alimentar — colite/proctite ou sinais GI concomitantes; parte dos cães associa-se a reação adversa ao alimento; dietas de proteína nova ou hidrolisada podem ajudar alguns pacientes.',
      ],
    },
    epidemiology: {
      especiePrincipal:
        'Cão — classicamente adultos a idosos; predomínio marcante em Pastor Alemão (Nelson & Couto; livros de predisposição racial citam >80% dos casos em PA em algumas séries). Labradores e outros grandes também podem ser acometidos. Irish Setters aparecem em séries históricas (média etária ~5 anos em estudo citado).',
      notaFelinos:
        'Em gatos, a entidade clássica de fístula perianal canina não é descrita como doença típica no acervo habitual — o raciocínio costuma priorizar saculite/abscesso de saco anal, feridas penetrantes, neoplasias, proctite e doença perineal (Nelson & Couto apresenta a afecção como descrita em cães).',
      contextoGeografico:
        'Não é doença infecciosa regional “tropical” clássica; o contexto pesa mais por diagnóstico, reconhecimento clínico e perfil genético das populações caninas.',
    },
    pathogenesisTransmission: {
      patogenese: [
        'Resposta imune celular inadequada na região perianal no animal predisposto.',
        'Inflamação crônica lesa pele e mucosa → ulcerações → tratos drenantes e seios fistulosos.',
        'Fibrose, estenose anal/retal e incontinência fecal nos casos avançados.',
        'Fezes, umidade, trauma por lambedura e infecção secundária perpetuam, sem serem necessariamente o evento inicial.',
      ],
      infiltrado:
        'Nelson & Couto: infiltração inflamatória predominante por linfócitos T; PA com alterações de imunidade celular — reforça etiologia imunomediada.',
      transmissao:
        'Não é doença contagiosa clássica; não há transmissão horizontal reconhecida como em infecções. Depende de predisposição individual, imunorregulação e fatores locais.',
    },
    pathophysiology:
      'A região anal integra pele perianal, mucosa retal terminal, esfíncteres e sacos anais. Inflamação imune persistente na interface pele–mucosa–esfíncter destrói integridade, ulcera e drena de forma desorganizada.\n\n' +
      'Dor intensa — inervação rica; ulceração profunda.\n' +
      'Tenesmo/disquesia — dor à evacuação, edema, fibrose/estenose.\n' +
      'Hematochezia e secreção mucopurulenta — mucosa/ pele ulcerada + exsudato e contaminação local.\n' +
      'Fibrose e estenose — reparação desorganizada.\n' +
      'Lambedura/automutilação — dor, prurido inflamatório.\n' +
      'Perda de peso/hiporexia — dor crônica e inflamação (Nelson & Couto: letargia, inapetência, perda de peso nos casos dolorosos).',
    clinicalSignsPathophysiology: [
      {
        system: 'behavioral',
        findings: [
          'Lambedura perianal, automutilação — lesões ulceradas e drenantes dolorosas e inflamadas continuamente.',
        ],
      },
      {
        system: 'gastrointestinal',
        findings: [
          'Tenesmo e disquesia — dor ao evacuar, edema; nos crônicos, fibrose/estenose (BSAVA: pode coexistir componente obstrutivo).',
          'Hematochezia — mucosa/pele ulcerada sangra com facilidade.',
          'Secreção mucopurulenta e odor forte — exsudato + infecção secundária.',
          'Incontinência fecal — dor intensa, destruição tecidual ou remodelamento fibrótico.',
        ],
      },
      {
        system: 'general',
        findings: [
          'Letargia, hiporexia, perda de peso — efeitos sistêmicos de dor crônica e inflamação persistente.',
        ],
      },
    ],
    diagnosis: [
      {
        stepNumber: 1,
        title: 'Inspeção perianal minuciosa e toque retal cuidadoso',
        description:
          'Passo mais importante. Nelson & Couto: exame retal é central, muitas vezes com sedação pela dor; tratos ulcerados/drenantes na região perianal. BSAVA: furunculose anal pode passar despercebida sem limpeza e inspeção cuidadosa. Avalia úlceras, seios, profundidade, dor, espessamento, estenose, envolvimento retal e sacos anais.',
        isGoldStandard: true,
      },
      {
        stepNumber: 2,
        title: 'Diferenciais locais',
        description:
          'Excluir ou reconhecer saculite/abscesso de saco anal, neoplasias perianais/retais, hérnia perineal, estenose retal, corpo estranho, proctite/colite (BSAVA lista furunculose entre causas de disquesia/tenesmo junto a esses diferenciais).',
      },
      {
        stepNumber: 3,
        title: 'Proctoscopia e/ou colonoscopia (sinais GI associados)',
        description:
          'Se diarreia, constipação importante, alteração fecal ou suspeita de colite/proctite — Nelson & Couto recomenda avaliação endoscópica.',
      },
      {
        stepNumber: 4,
        title: 'Citologia, cultura e exames de material (quando indicado)',
        description:
          'Não são o centro do diagnóstico da entidade em si; úteis para abscesso de saco, infecção secundária exuberante ou guiar antimicrobiano.',
      },
      {
        stepNumber: 5,
        title: 'Biópsia (casos atípicos)',
        description:
          'Não rotineira quando lesões são clássicas. Indicada se atípico, raça não típica, massa, suspeita de neoplasia ou falha de resposta ao tratamento esperado.',
      },
      {
        stepNumber: 6,
        title: 'Recursos limitados — mínimo útil',
        description:
          'Inspeção com tosa e limpeza local; toque retal sob sedação se necessário; palpação/expressão dos sacos anais; busca de sinais intestinais; reavaliação seriada (fotos, profundidade dos tratos).',
      },
    ],
    treatment: {
      ordemDePrioridade: [
        '1) Imunomodulação de base — eixo principal. Consenso recente (2025): ciclosporina primeira linha, dose inicial típica 5 mg/kg SID; resposta pode levar até ~3 meses — não declarar falha precocemente. Literatura também cita esquemas BID e associação cetoconazol para poupar ciclosporina (sempre individualizar, monitorar e respeitar rótulo/legislação).',
        '2) Controle local — higiene perianal diária/frequente (Nelson & Couto); antissépticos tópicos (ex. clorexidina) se infecção secundária (revisão prática).',
        '3) Analgesia e conforto evacuatório — dor é determinante de sofrimento; amolecedores fecais (ex. lactulose) para reduzir trauma (acervo clínico).',
        '4) Tacrolimo tópico — adjuvante ou casos leves; literatura com protocolos combinados (cuidado com ingestão).',
        '5) Prednisolona/prednisona — frequentemente ponte ou adjuvante: ação mais rápida, mas perfil de efeitos adversos em uso prolongado; doses anti-inflamatórias/imunossupressoras conforme caso (ver monografia de prednisolona no app).',
        '6) Dieta proteína nova ou hidrolisada — quando suspeita de componente alimentar ou sinais GI; não universal obrigatório.',
        '7) Infecção secundária — tratar quando realmente presente; não substitui imunomodulação da base.',
        '8) Cirurgia — residual/refratário após terapia médica adequada, envolvimento importante de sacos anais, fibrose/estenose ou anatomia que impeça resolução aceitável.',
      ],
      monitoramento: [
        'Dor à evacuação, número/profundidade dos tratos, secreção e odor, toque retal, consistência fecal, peso e apetite.',
        'Efeitos adversos de ciclosporina, glicocorticoides e cetoconazol quando em uso.',
        'Consenso 2025: manter expectativa realista de tempo até resposta com ciclosporina (semanas a meses).',
      ],
    },
    prevention:
      'Sem vacina nem profilaxia específica. Foco em redução de recorrência e diagnóstico precoce: tratar cedo (antes de fibrose/estenose), higiene perianal, controlar comorbidades intestinais/alimentares, acompanhar raças predispostas (especialmente PA), manutenção individualizada após remissão com desmame muito gradual da imunomodulação (doença recorrente).',
    relatedMedicationSlugs: ['prednisolona'],
    relatedConsensusSlugs: [],
    references: [
      {
        id: 'ref-bruet-2025',
        citationText:
          'Bruet V. et al. Literature review and authors’ consensus recommendations for the medical management of perianal fistulae in dogs. Veterinary Dermatology, 2025.',
        sourceType: 'Revisão + consenso',
        url: 'https://doi.org/10.1111/vde.13354',
        notes: 'Síntese recente; heterogeneidade entre estudos.',
        evidenceLevel: 'B — moderada',
      },
      {
        id: 'ref-mathews-1997',
        citationText:
          'Mathews K.A. et al. Randomized controlled trial of cyclosporine for treatment of perianal fistulas in dogs. JAVMA, 1997;211(10):1249.',
        sourceType: 'Ensaio clínico randomizado',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        notes: 'Estudo-chave para ciclosporina; antigo, amostra limitada.',
        evidenceLevel: 'A/B — alta para contexto clínico veterinário',
      },
      {
        id: 'ref-pieper-2022',
        citationText: 'Pieper J.B. Perianal Fistulas in Dogs. Today’s Veterinary Practice, 2022.',
        sourceType: 'Revisão narrativa',
        url: 'https://todaysveterinarypractice.com/',
        notes: 'Resumo prático de manejo e papel da cirurgia.',
        evidenceLevel: 'C — moderada para prática',
      },
      {
        id: 'ref-nelson-couto',
        citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 (cap. imunomediadas e cap. fármacos).',
        sourceType: 'Livro-texto',
        url: null,
        notes: 'Quadro clínico, diagnóstico, ciclosporina.',
        evidenceLevel: 'Consenso clínico / referência secundária',
      },
      {
        id: 'ref-bsava-ge-2020',
        citationText: 'Hall EJ, Williams DA, Kathrani A. BSAVA Manual of Canine and Feline Gastroenterology, 3rd ed., 2020.',
        sourceType: 'Manual especializado',
        url: null,
        notes: 'Disquesia, exame perianal/retal, tacrolimo/ciclosporina em contexto GI.',
        evidenceLevel: 'Referência prática',
      },
    ],
    isPublished: true,
    source: 'seed',
  },
  {
    id: 'disease-hiperadrenocorticismo-cushing',
    slug: 'hiperadrenocorticismo-sindrome-cushing',
    title: 'Hiperadrenocorticismo (síndrome de Cushing)',
    synonyms: ['Síndrome de Cushing', 'HAC', 'Hipercortisolismo', 'Hyperadrenocorticism', 'Cushingoid'],
    species: ['dog', 'cat'],
    category: 'endocrinologia',
    tags: ['Cortisol', 'PDH', 'ADH', 'Trilostano', 'LDDST', 'ACTH', 'PU/PD', 'Diabetes felino'],
    quickSummary:
      'Síndrome por exposição crônica a excesso de cortisol: hipófise estimulando demais as adrenais (PDH), tumor adrenal autônomo (ADH) ou glicocorticoide exógeno em excesso. Em cães é relativamente comum (meia-idade a idosos; na maioria PDH). Em gatos é rara, costuma ser PDH e frequentemente coexiste com diabetes mellitus e pele extremamente frágil. O diagnóstico exige combinação de história, clínica, banco mínimo e teste endócrino apropriado, depois diferenciação PDH versus ADH. Tratamento moderno: trilostano como base em muitos casos, cirurgia selecionada e monitoramento cuidadoso para evitar hipocortisolismo iatrogênico.',
    quickDecisionStrip: [
      'Cão com PU/PD, polifagia, abdômen pendular, panting e alopecia simétrica: pense forte em Cushing.',
      'Gato diabético difícil de controlar + pele fina/frágil: pense forte em Cushing felino.',
      'Não peça teste endócrino só porque a fosfatase alcalina veio alta.',
      'Cão estável: LDDST costuma ser o melhor exame de triagem; com comorbidade importante ou suspeita iatrogênica, ACTH ganha valor.',
      'Trilostano é a base do tratamento médico atual na maioria dos cães (e muitos gatos), com reavaliações seriadas.',
    ],
    etiology: {
      conceitoEixoHPA:
        'O eixo hipófise–adrenal funciona como um termostato hormonal: hipotálamo → ACTH → cortisol; o cortisol deveria frear o sistema por retroalimentação negativa. No Cushing, esse freio falha ou fica irrelevante — exposição prolongada a cortisol alto altera metabolismo, pele, músculos, fígado, vasos, rim e imunidade.',
      formasNoCaes:
        'a) PDH (hipófise dependente): ~80–85% dos espontâneos — adenoma hipofisário secretor de ACTH → hiperplasia adrenal bilateral e excesso de cortisol.\n\n' +
        'b) ADH (adrenal dependente): ~15–20% — adenoma ou carcinoma funcional com secreção autônoma; adrenal doente cresce e a contralateral tende a atrofiar pela supressão de ACTH.\n\n' +
        'c) Iatrogênico: glicocorticoide exógeno prolongado → eixo suprimido e adrenais atróficas. Sempre perguntar na anamnese, inclusive tópico, oftálmico, otológico e injetável de depósito.',
      formasNosGatos:
        'Doença rara; na maioria PDH. O quadro costuma destacar diabetes mellitus difícil de controlar, emagrecimento/caquexia, fraqueza, má cicatrização, equimoses e fragilidade cutânea marcada — não apenas “cão em miniatura”.',
    },
    epidemiology: {
      especiesCaes:
        'Meia-idade a idosos (tipicamente ~7–12 anos). Raças frequentemente citadas em PDH: Poodle miniatura, Dachshund, Boxer, Boston Terrier, Beagle. Tumores adrenais mais comuns em cães maiores; alguns textos clássicos citam predileção por fêmeas em ADH.',
      especiesGatos:
        'Muito menos frequente que no cão; muitos casos >10 anos, sem padrão tão forte de raça/sexo. Epidemiologicamente relevante: a maioria dos gatos com HAC tem ou desenvolve diabetes mellitus — isso remodela apresentação e raciocínio diagnóstico.',
    },
    pathogenesisTransmission: {
      transmissao: 'Não é contagiosa; não há transmissão entre animais.',
      patogenesePDH:
        'Tumor hipofisário secreta ACTH em excesso → estimulação contínua da zona fasciculada → cortisol elevado; o tumor não responde adequadamente ao “freio” do cortisol.',
      patogeneseADH:
        'Adrenal tumoral produz cortisol independentemente de ACTH → supressão de ACTH e atrofia da adrenal contralateral (padrão útil na ultrassonografia).',
      patogeneseIatrogenica:
        'Glicocorticoide exógeno mimetiza hipercortisolismo crônico → eixo HPA suprimido e adrenal sem estímulo. Suspensão abrupta pode deixar o animal incapaz de produzir cortisol suficiente (insuficiência adrenal secundária).',
    },
    pathophysiology:
      'Cortisol em excesso crônico aumenta catabolismo proteico (fraqueza, atrofia abdominal, abdômen pendular), reduz síntese de colágeno e renovação cutânea (pele fina, comedões, alopecia endocrina, calcinosis cutis no cão; no gato “pele de papel”), antagoniza insulina (DM e resistência), favorece hepatopatia vacuolar e hepatomegalia, reduz concentração urinária (PU/PD), altera lipídios e predispõe a complicações tromboembólicas, hipertensão e infecções secundárias.',
    clinicalSignsPathophysiology: [
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
    diagnosis: [
      {
        stepNumber: 1,
        title: 'Confirmar que o quadro combina com HAC',
        description:
          'Não fazer triagem endócrina só porque a ALP subiu. Partir de sinais clínicos compatíveis e banco mínimo sugestivo (ACVIM 2012; prática clínica).',
      },
      {
        stepNumber: 2,
        title: 'Banco mínimo',
        description:
          'Cão: ALP elevada em grande parte dos casos (ALP normal reduz muito a suspeita, mas não zera); ALT, colesterol, triglicérides, glicose, BUN às vezes baixo, urina mal concentrada, proteinúria em alguns, trombocitose possível, achados infecciosos secundários.\n\n' +
          'Gato: alterações muitas vezes refletem mais o diabetes concomitante; hiperglicemia, glicosúria, colesterol, ALT discreta; ALP alta não é tão típica quanto no cão.',
      },
      {
        stepNumber: 3,
        title: 'Triagem do eixo adrenal',
        description:
          'Cão estável: LDDST em geral melhor triagem (alta sensibilidade; padrões podem sugerir PDH). ACTH stimulation: mais útil com suspeita iatrogênica ou doença concomitante relevante (maior especificidade em alguns cenários), porém menos sensível que LDDST para alguns ADH. UCCR: ótima para excluir se normal; alta isoladamente é inespecífica (estresse, doença não adrenal) — colher em casa.\n\n' +
          'Gato: LDDST com dose felina (0,1 mg/kg dexametasona IV, não a dose canina 0,01 mg/kg). ACTH tem baixa sensibilidade; não deve ser o principal exame de triagem (literatura: LDDST positivo na quase totalidade de uma série vs ACTH em minoria).',
      },
      {
        stepNumber: 4,
        title: 'Diferenciar PDH de ADH',
        description:
          'Ultrassom abdominal central: PDH — adrenais aumentadas ou não atróficas; ADH — uma adrenal grande e contralateral pequena/atrófica. ACTH endógeno: baixo/indetectável sugere ADH; alto/normal alto sugere PDH (manuseio lábil). HDDST pode auxiliar em cães. TC/RM de hipófise quando macroadenoma, radioterapia ou hipofisectomia forem cogitados (Nelson: discutir imagem hipofisária mesmo no PDH recém-diagnosticado se radioterapia for opção).',
      },
      {
        stepNumber: 5,
        title: 'Conjunto diagnóstico de referência (prática)',
        description:
          'Não existe um único exame “padrão ouro” para todos os cenários. HAC espontâneo no cão: história + clínica + banco mínimo compatível + teste de triagem apropriado. Diferenciação PDH/ADH: imagem adrenal + ACTH endógeno (± HDDST; imagem hipófise selecionados). Gato: LDDST dose felina + imagem + contexto (DM resistente, pele frágil).',
        isGoldStandard: true,
      },
      {
        stepNumber: 6,
        title: 'Recursos limitados — mínimo útil',
        description:
          'História e exame físico detalhados; banco mínimo; quando possível, um teste dinâmico (priorizar LDDST conforme espécie/estabilidade) e ultrassom; evitar conclusões só por um marcador isolado.',
      },
    ],
    treatment: {
      decisaoInicial:
        'Definir se o caso será manejado clinicamente, encaminhado para cirurgia especializada (adrenalectomia, hipofisectomia) ou radioterapia. Em pacientes debilitados, trilostano pré-operatório é comum para estabilização.',
      trilostanoNoCao:
        'Primeira escolha médica na maioria dos cães (PDH e muitos ADH não operáveis). Mecanismo: inibe 3β-hidroxiesteroide desidrogenase, reduzindo síntese de cortisol, aldosterona e andrógenos adrenais de forma reversível.\n\n' +
        'Doses: bula/label frequentemente 2,2–6,7 mg/kg VO q24h com alimento; reavaliar em 10–14 dias com ACTH e bioquímica. Esquema extra-label comum em internistas: ~1 mg/kg q12h com alimento ou 2 mg/kg q24h, preferindo BID; alguns precisam TID. Plumb descreve esquemas BID mais baixos em cães pequenos e protocolos de baixa dose — individualizar.\n\n' +
        'Monitoramento: primeiro recheck 10–14 dias; após cada ajuste, 10–14 dias; depois 30 d, 90 d e a cada ~3 meses. Incluir eletrólitos, função renal/hepática, urinálise e ACTH stimulation em horário padronizado após a cápsula (muitos usam ~4–6 h pós dose; consistência no mesmo paciente é crítica). Metas pós-ACTH: faixas variam (ex.: Nelson ~2–5 µg/dL; Plumb aceita controle clínico com faixa mais ampla se o animal está bem). Efeitos adversos: letargia, anorexia, GI, eletrólitos, hipoadrenocorticismo iatrogênico; suspender e reavaliar se sinais compatíveis.',
      mitotanoNoCao:
        'Segunda linha ou alternativa quando trilostano falha ou não é tolerado; adrenocorticolítico — exige vigilância maior. Indução clássica: ~50 mg/kg/dia VO dividido q12h com alimento (reduzir se sem polidipsia ou com diabetes). Primeiro ACTH ~5–7 dias; meta pós-ACTH semelhante à literatura de controle. Manutenção: esquemas semanais fracionados (ex.: Nelson ~35–50 mg/kg/semana em 2–3 doses; protocolos mais ablativos existem). Prednis(ol)ona pode acompanhar indução ou ficar disponível para emergência. Monitorar de perto; suspender com anorexia, letargia, vômito, diarreia ou fraqueza.',
      cetoconazolNoCao:
        'Não é primeira escolha; eficácia menos previsível, hepatotoxicidade e interações. Esquema típico: escalar de 5 mg/kg BID por 7 dias → 10 mg/kg BID por 14 dias → ACTH; se necessário até 15–20+ mg/kg BID. Uso em gatos é controverso (GI/hepatotoxicidade).',
      cirurgiaEspecializada:
        'Adrenalectomia: escolha para ADH operável (cão e gato). PDH felino: adrenalectomia bilateral pode funcionar, mas gera insuficiência adrenal permanente — compromisso com reposição e seguimento. Hipofisectomia: PDH, altamente especializada. Radioterapia hipofisária: macroadenoma, especialmente com sinais neurológicos — frequentemente ainda requer trilostano/mitotano para hipercortisolismo sistêmico.',
      tratamentoFelino:
        'Trilostano: escolha médica principal na maioria (ex.: Nelson ~30 mg/gato SID inicial, ajustar por clínica e monitorização). Pode melhorar sinais, tolerância e controle glicêmico. Hipofisectomia/radioterapia em casos selecionados. Metyrapone: literatura mais antiga (ex.: 30–70 mg/kg BID, titular), hoje menos usado que trilostano.',
      iatrogenicoManejo:
        'Tratamento = remover a causa (corticoide exógeno), não “tratar Cushing” com trilostano de rotina. Crítico: não cessar glicocorticoide crônico abruptamente — risco de insuficiência adrenal secundária. Desmame gradual e individualizado (fármaco, dose, via, tempo de uso, doença de base, clínica). Não há esquema universal em dias válido para todos.',
      ordemDePrioridade: [
        '1) Confirmar HAC espontâneo vs iatrogênico na anamnese.',
        '2) Cão: trilostano como base médica na maioria; mitotano/cetoconazol como alternativas.',
        '3) ADH operável: considerar adrenalectomia em serviço preparado; estabilizar com trilostano se necessário.',
        '4) PDH com macrotumor/neurológico: discutir radioterapia; frequentemente associação com terapia médica.',
        '5) Gato: trilostano + manejo agressivo do diabetes e da fragilidade cutânea.',
        '6) Iatrogênico: desmame supervisionado do corticoide com vigilância clínica.',
      ],
      monitoramento: [
        'PU/PD, apetite, peso, panting, pele, infecções secundárias, pressão arterial quando indicado.',
        'Bioquímica, eletrólitos, urinálise; ACTH stimulation em intervalos após ajustes (trilostano/mitotano).',
        'Gato: ênfase em fragilidade cutânea, glicemia e dose de insulina.',
      ],
      prognosticoResumo:
        'Cão PDH tratado clinicamente: em geral boa resposta e QOL. ADH operável: prognóstico pode ser muito bom se o pós-operatório transcorrer bem. Macroadenoma com neurológico: pior; radioterapia pode prolongar vida (séries citam sobrevidas maiores em irradiados vs não tratados). Gato: mais reservado — DM associada, caquexia e pele frágil; séries com trilostano mostram mediana de sobrevida limitada e prognóstico guarded sem tratamento definitivo e suporte adequado.',
    },
    prevention:
      'Espontâneo: sem vacina ou profilaxia ambiental; detecção precoce em predispostos; não banalizar PU/PD, panting crônico e alopecia endocrina; não fechar diagnóstico só por triagem positiva sem contexto. Iatrogênico: menor dose e menor tempo de glicocorticoide, evitar depósitos repetidos indiscriminados, revisar interações, desmame quando apropriado, educar o responsável.',
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
  },
  {
    id: 'disease-leishmaniose-canina-infantum',
    slug: 'leishmaniose-canina-leishmania-infantum',
    title: 'Leishmaniose canina (Leishmania infantum)',
    synonyms: [
      'Leishmaniose visceral canina',
      'LVC',
      'Canine leishmaniosis',
      'Leishmania infantum',
      'Calazar canino',
    ],
    species: ['dog'],
    category: 'parasitologia',
    tags: ['Brasileish 2025', 'Flebotomíneo', 'L. infantum', 'Citologia', 'PCR', 'Repelente', 'IRIS', 'Zoonose'],
    quickSummary:
      'Doença parasitária crônica e multissistêmica em cães, transmitida principalmente por flebotomíneos (L. infantum no foco desta ficha, alinhada ao Brasileish 2025). Apresentação heterogênea: desde assintomáticos até dermatopatia, nefropatia, alterações oculares e hematológicas com caquexia. Sorologia isolada indica exposição, não necessariamente doença ativa; citologia com amastigotas é método direto e definitivo para infecção. Tratamento no Brasil combina fármacos registrados (miltefosina, marbofloxacina), alopurinol e imunomodulação conforme estadiamento; objetivo usual é controle clínico e redução de carga/infectividade, não esterilização parasitológica. Prevenção: repelente/inseticida tópico como eixo central.',
    quickDecisionStrip: [
      'Cão de área endêmica com pele ruim, linfonodos, emagrecimento e rim alterado: coloque leishmaniose no radar.',
      'Não há sinal patognomônico; sorologia positiva sozinha não fecha “doença ativa”.',
      'Citologia com amastigota é a confirmação mais simples e definitiva da infecção (Brasileish 2025).',
      'Nefropatia piora muito prognóstico e muda o manejo (incluindo IRIS).',
      'No Brasil: tratamento por estadiamento com fármacos disponíveis; repelente tópico é central na prevenção, inclusive no cão já infectado.',
    ],
    etiology: {
      visaoGeral:
        'Leishmania são protozoários intracelulares: parte do ciclo no flebotomíneo (vetor) e parte no mamífero, sobretudo em macrófagos — o inseto funciona como veículo de inoculação e o parasita persiste “escondido” nas células fagocíticas.',
      especiesNasAmericas:
        'O Brasileish 2025 cita várias espécies já relatadas em cães nas Américas (ex.: L. amazonensis, L. braziliensis, L. guyanensis, L. infantum, L. mexicana, L. panamensis, L. peruviana, L. naiffi). As mais frequentemente relatadas em cães no continente são L. infantum e L. braziliensis. Esta ficha prioriza L. infantum, pela relevância clínica, zoonótica e pelo corpo de evidência em diagnóstico, tratamento e prevenção.',
      focoCaninoEgatos:
        'Cães e gatos podem ser acometidos, mas a diretriz Brasileish 2025 é voltada para leishmaniose canina. No acervo (Nelson & Couto), infecção felina existe e gatos podem integrar o cenário epidemiológico, porém o peso clínico e as evidências continuam predominantes em cães — por isso a espécie principal desta ficha é o cão.',
    },
    epidemiology: {
      distribuicaoAmericas:
        'Do Uruguai ao Canadá e EUA; o Brasileish destaca expansão geográfica contínua no continente.',
      magnitudesEVariacao:
        'No Brasil a doença está amplamente distribuída em todas as regiões, inclusive Sul (antes considerada livre em parte do tempo). Prevalência varia muito entre regiões e testes — exemplo citado: Sobral com soroprevalência média ~3,8% no município, com grande variação entre bairros e anos. Incidência anual pode ser alta em áreas de transmissão intensa (ex.: estudos brasileiros com ~19,6% em Goiana e ~43,8% em São Joaquim de Bicas, conforme documento).',
      saudePublicaInterface:
        'Leishmanioses associam-se a pobreza, desnutrição, mobilidade populacional e pressão antrópica — ecologia, vulnerabilidade social e interface humano–animal–ambiente, não só “doença do mosquito”.',
    },
    pathogenesisTransmission: {
      cicloVetorEMacrófago:
        'Fêmea do flebotomíneo ingere amastigotas no repasto em hospedeiro infectado; no inseto ocorre diferenciação e multiplicação até promastigotas metacíclicas infectantes, inoculadas na picada seguinte. No cão, formas entram em células fagocíticas e reconvertem em amastigotas intracelulares.',
      viasSecundariasTransmissao:
        'Transmissão principal: vetorial. O Brasileish cita para L. infantum em cães também vias secundárias (vertical, venérea, transfusão); filhotes assim infectados podem adoecer e infectar flebotomíneos. Nelson & Couto acrescenta que, em alguns contextos, briga, compartilhamento de agulhas e outras vias dog-to-dog podem ocorrer — a rota principal permanece vetorial.',
      patogeneseParasitaEImunidade:
        'Lesões resultam da soma de multiplicação parasitária e resposta imune humoral exacerbada (imunocomplexos), não só destruição direta pelo parasita. Parasitismo em órgãos linfoides e não linfoides leva a infiltrado com linfócitos B, histiócitos, macrófagos e plasmócitos — linfadenomegalia generalizada e hepatoesplenomegalia. Coinfecções (ex.: Ehrlichia canis) podem agravar o quadro.',
    },
    pathophysiology:
      'LCan comporta-se como inflamação parasitária crônica disseminada com hiperprodução de anticorpos e imunocomplexos.\n\n' +
      'Pele: parasitismo local + inflamação sistêmica → descamação, ulceração, hiperqueratose, alopecia, onicopatias (incluindo dermatite descamativa/furfurácea periocular e em saliências, formas ulcerativas, papulares, pustulares, nodulares, despigmentação nasal).\n\n' +
      'Rim: deposição de imunocomplexos → glomerulonefrite e nefrite intersticial progressiva → proteinúria, IRIS, falência renal (causa principal de óbito em muitos cães, segundo Brasileish).\n\n' +
      'Olho: conjuntivite, ceratite, uveíte, esclerite, CCS, coriorretinite, até panoftalmite.\n\n' +
      'Locomotor: polimiosite, poliartrite erosiva, osteomielite, osteólise, proliferação periosteal (imunocomplexos e inflamação).\n\n' +
      'Sangue: hiperglobulinemia (viscosidade), vasculite, trombocitopatias, epistaxe; anemia normocítica normocrômica, trombocitopenia, AHIM possíveis.\n\n' +
      'Outros: manifestações neurológicas, GI (colite granulomatosa erosiva/ulcerativa), cardíacas (miocardite, vasculite) — “camaleão clínico”.',
    clinicalSignsPathophysiology: [
      {
        system: 'lymphatic',
        findings: [
          'Linfadenomegalia generalizada — ativação do sistema mononuclear-fagocítico e hiperplasia linfoide.',
        ],
      },
      {
        system: 'hepatic',
        findings: [
          'Hepatoesplenomegalia — parasitismo e resposta inflamatória em fígado e baço.',
        ],
      },
      {
        system: 'dermatologic',
        findings: [
          'Dermatite descamativa, ulcerações, lesões perioculares, hiperqueratose nasal/digital, onicogrifose — parasitismo cutâneo + imunidade local e sistêmica.',
        ],
      },
      {
        system: 'general',
        findings: [
          'Emagrecimento, caquexia, atrofia muscular — inflamação crônica e comprometimento sistêmico/locomotor.',
        ],
      },
      {
        system: 'renal',
        findings: [
          'Proteinúria, azotemia, hematúria, USG reduzida, progressão para DRC — glomerulonefrite/nefrite por imunocomplexos e carga parasitária.',
        ],
      },
      {
        system: 'ocular',
        findings: [
          'Conjuntivite, ceratite, uveíte, CCS, glaucoma — inflamação ocular infecciosa/imunomediada.',
        ],
      },
      {
        system: 'musculoskeletal',
        findings: [
          'Poliartrite, miosite, claudicação, dor — imunocomplexos e inflamação musculoesquelética.',
        ],
      },
      {
        system: 'hematologic',
        findings: [
          'Epistaxe, petéquias, hiperviscosidade, anemia — hiperglobulinemia, vasculite, trombocitopatias.',
        ],
      },
      {
        system: 'gastrointestinal',
        findings: [
          'Diarreia crônica possível — colite granulomatosa erosiva/ulcerativa com parasito na mucosa do cólon.',
        ],
      },
      {
        system: 'neurologic',
        findings: [
          'Convulsões, ataxia, paresias/paralisias — manifestações menos frequentes, mas descritas.',
        ],
      },
    ],
    diagnosis: [
      {
        stepNumber: 1,
        title: 'Suspeita clínica + banco mínimo',
        description:
          'Diagnóstico se apoia em sinais e laboratório sugestivos; não há sinal patognomônico e alterações laboratoriais são inespecíficas. Cães dermatológicos, renais, oftálmicos ou hematológicos em área endêmica devem entrar no radar (Brasileish 2025).',
      },
      {
        stepNumber: 2,
        title: 'Citologia — pesquisa de amastigotas',
        description:
          'O Brasileish 2025 descreve a citologia como o exame mais simples e definitivo da infecção por Leishmania em cães. Melhores amostras: medula óssea, linfonodo e pele lesionada; sensibilidade depende de amostra e carga parasitária. Sangue pode mostrar amastigotas, mas não é ideal. Visualizar o parasita na lâmina confirma infecção.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'PCR e testes moleculares',
        description:
          'Boa sensibilidade/especificidade conforme protocolo e amostra; preferir medula, linfonodo e pele. Swab conjuntival e sangue são alternativas quando não há amostra mais invasiva, com menos DNA — PCR em tempo real preferível. qPCR útil para seguimento e carga parasitária (Nelson & Couto: PCR em sangue, medula, baço, linfonodo; qPCR para monitorar resposta).',
      },
      {
        stepNumber: 4,
        title: 'Sorologia — interpretação cuidadosa',
        description:
          'Indica exposição, nem sempre infecção ativa, principalmente em testes qualitativos rápidos. Titulações quantitativas têm mais valor clínico. Exemplo didático para RIFI (Brasileish): se corte 1:40 = positivo, então 1:40 sugere exposição, 1:160 infecção, 1:320 doença em cão clinicamente suspeito — sempre integrar com clínica, estadiamento, outros exames e carga parasitária.',
      },
      {
        stepNumber: 5,
        title: 'Estratégia global — “doença ativa” vs infectado assintomático',
        description:
          'Confirmação de infecção: demonstração direta do parasita (citologia) ou molecular forte. Fechamento da doença clínica ativa: quadro compatível + parasitológico/molecular + sorologia quantitativa contextualizada + estadiamento laboratorial — um cão pode estar exposto ou infectado sem estar “doente” no sentido clínico.',
        isGoldStandard: true,
      },
      {
        stepNumber: 6,
        title: 'Recursos limitados',
        description:
          'Sem medula/linfonodo no momento: swab conjuntival ou sangue para PCR, sabendo que a sensibilidade cai; preferir PCR mais sensível (tempo real). Em campo, sorologia ajuda na triagem populacional, mas não deve ser a única base para rotular cão como doente ativo por leishmaniose.',
      },
    ],
    treatment: {
      principiosFarmacologicosLCan:
        'O Brasileish 2025 agrupa fármacos em leishmanicidas, leishmaniostáticos e imunomoduladores — matar ou reduzir fortemente o parasita; frear multiplicação; modular resposta do hospedeiro. A escolha depende da confirmação da infecção e do estadiamento/gravidade.',
      objetivoTerapeuticoLCan:
        'Brasileish e Nelson & Couto: o tratamento costuma melhorar clínica, reduzir carga parasitária e infectividade, mas raramente elimina totalmente o parasita. Objetivo habitual é controle, não cura esterilizante — alinhar expectativa com o tutor.',
      miltefosina:
        'Brasileish 2025: 2 mg/kg SID VO por 28 dias. Efeitos adversos frequentes: vômito, diarreia, disorexia. Plumb’s: pode ser usada isolada ou com alopurinol, com melhor desempenho clínico na combinação; sinais podem melhorar nas primeiras 2 semanas; eventos GI costumam surgir ~5–7 dias, durando em média 1–2 dias. Administrar com alimento; contraindicada em gestação, lactação e reprodutores; cautela em hepatopatia grave ou ICC. Alternativa combinada citada: 2 mg/kg q24h 28 dias + alopurinol 5–20 mg/kg q12h ≥6 meses (extra-label).',
      marbofloxacina:
        'Brasileish 2025: 2 mg/kg SID por 28 dias. Atenção: risco de seleção de resistência bacteriana. Eficácia relatada inclusive em cães com nefropatia associada (ex.: Pineda et al. 2017 — segurança/eficácia em LCan + DRC). Nelson & Couto: eficácia in vitro e opção quando outros fármacos indisponíveis.',
      alopurinol:
        'Brasileish 2025: 10 mg/kg BID por 6–12 meses. Risco principal: urolitíase por xantina, mineralização renal, obstrução com hidronefrose e perda renal — monitorar urinálise/imagem em uso prolongado. Nelson & Couto cita esquemas clássicos com 15 mg/kg q12h, muitas vezes com antimoniais; associação antimonato + alopurinol historicamente superior a monoterapias. Para rotina brasileira atual, priorizar dose Brasileish; conhecer faixas internacionais para leitura de literatura.',
      domperidona:
        'Brasileish 2025: 0,5 mg/kg SID por 30 dias como imunomodulador; efeito adverso citado: galactorreia. Nelson & Couto menciona uso como agente único em alguns países. Não substitui base antiparasitária em doença moderada/grave, mas integra imunomodulação e suporte em protocolos combinados.',
      estadiamentoClinicoBrasileish:
        'I — Exposto: sorologia +, parasitológico/molecular −, sem clínica nem laboratório. Manejo: monitoramento ou imunomodulação. Prognóstico: bom.\n\n' +
        'II — Infectado sadio: parasitológico/molecular +, sorologia variável, sem clínica/laboratório. Manejo: monitoramento ou imunomodulação. Prognóstico: bom (falta de ensaios clínicos robustos para tratar “infectado sadio” — decisão individualizada).\n\n' +
        'III — Doença leve: linfadenopatia, dermatite papular, emagrecimento discreto, rim normal. Manejo: imunomodulação + leishmaniostático + leishmanicida. Prognóstico: bom.\n\n' +
        'IV — Moderada: lesões cutâneas difusas, onicogrifose, ulcerações, anorexia, emagrecimento, laboratório levemente alterado, possível nefropatia leve. Manejo: tríade de fármacos; se rim leve, seguir IRIS. Prognóstico: bom a reservado.\n\n' +
        'V — Grave: imunocomplexos (glomerulonefrite, uveíte), anemia, hipergamaglobulinemia, hipoalbuminemia, DRC IRIS 1–2. Manejo: mesma base + IRIS. Prognóstico: reservado a pobre.\n\n' +
        'VI — Muito grave: estágio V + TEP ou síndrome nefrótica/rim terminal, DRC IRIS 3–4 e/ou RPC muito elevada. Manejo: base + IRIS ± diálise. Prognóstico: pobre.',
      terapiasInternacionaisComplemento:
        'Antimoniais (meglumina antimonato): Plumb’s e Nelson descrevem associação com alopurinol com boa eficácia clínica (doses SC variando de ~50–100 mg/kg/dia fracionados por 4–8 semanas + alopurinol 10–15 mg/kg q12h por ≥6 meses). Brasileish 2025: no Brasil, fármacos registrados/autorizados enfatizados são miltefosina e marbofloxacina — uso de antimoniais depende de regulação, disponibilidade e serviço.\n\n' +
        'Anfotericina B lipossomal/lipídica: bons resultados em casos selecionados (centros especializados); recidivas possíveis.\n\n' +
        'Corticoides: Brasileish admite prednisona/prednisolona/dexametasona em alguns casos pela modulação imunossupressora de complicações — adjuvante situacional, não terapia antiparasitária central.\n\n' +
        'Alternativas (AHCC, nucleotídeos, betaglucanas, spirulina, etc.): promissoras no documento, evidência insuficiente para recomendação ampla.',
      ordemDePrioridade: [
        '1) Confirmar infecção (citologia/PCR) e estadiar clínica/laboratorial.',
        '2) Estágios III–VI: combinar leishmanicida + leishmaniostático + imunomodulador conforme Brasileish; ajustar a nefropatia pela IRIS.',
        '3) Miltefosina 28 dias + alopurinol prolongado é esquema central citado; marbofloxacina no protocolo brasileiro com cautela antibacteriana.',
        '4) Domperidona e outros imunomoduladores como peças do quebra-cabeça, não monoterapia em doença expressa.',
        '5) Corticoides apenas quando claramente indicados para componente imunomediado exuberante, com risco–benefício.',
        '6) Integrar prevenção vetorial contínua (repelente/inseticida) mesmo no cão em tratamento.',
      ],
      monitoramento: [
        'Cão infectado doente: após 1º mês, depois a cada 3–4 meses no 1º ano; quando clinicamente recuperado, a cada 6–12 meses.',
        'Cão infectado assintomático: a cada 6–12 meses.',
        'Parâmetros (Brasileish): exame físico; hemograma e bioquímica (fígado/rim); albumina, globulinas, relação A/G, PCR; urinálise e RPC; sorologia quantitativa; qPCR; US abdominal.',
        'Na prática: hidratação, apetite, peso, pele/unhas, linfonodos, olhos, dor locomotora, PA se nefropatia; imagem urinária com alopurinol crônico (xantinúria/cálculos).',
      ],
    },
    prevention:
      '1) Cães soropositivos não devem ser automaticamente encaminhados a abate como estratégia eficiente de controle da LV humana — o Brasileish destaca ineficiência dessa abordagem populacional.\n\n' +
      '2) Eixo central: reduzir contato com o vetor — inseticidas tópicos com propriedade repelente (coração da prevenção), inclusive no cão já infectado.\n\n' +
      '3) Produtos citados no documento incluem, entre outros: coleira deltametrina 4%; permetrina 8,5% + fipronil 4% + piriproxifen 4%; flumetrina 4,5% + imidacloprida 10%; pipetas permetrina 50% + imidacloprida 10%. Duração de ação varia por produto (ex.: até ~6 meses algumas coleiras de deltametrina; até ~8 meses algumas combinações flumetrina + imidacloprida).\n\n' +
      '4) Isoxazolinas: efeito inseticida predominante — auxiliares, não substituem repelentes tópicos.\n\n' +
      '5) Gatos em área endêmica: proteger; sensibilidade felina a piretróides — exceção destacada: flumetrina 4,5% + imidacloprida 10%.\n\n' +
      '6) Triagem, reprodução, hemotransfusão e trânsito: excluir infectados de doação de sangue e reprodução; monitorar movimento entre áreas endêmicas e não endêmicas; sorologia pré-viagem sugerida.\n\n' +
      '7) Vacinação: Brasileish 2025 — vacina contra LCan não disponível na América Latina na época da diretriz.\n\n' +
      '8) Abrigos: triagem na admissão, separação até confirmação, acompanhamento, tratamento por estágio, repelentes contínuos, pulverização residual por profissional (ciclos ~2×/ano; residual em paredes ~3 meses).\n\n' +
      'Evidência: revisão sistemática/meta-análise (Yimam & Mohebali, 2020) — coleiras inseticidas reduzem incidência de LCan por L. infantum.',
    relatedMedicationSlugs: ['prednisolona', 'alopurinol'],
    relatedConsensusSlugs: [],
    references: [
      {
        id: 'ref-brasileish-2025',
        citationText:
          'Brasileish. Diretrizes para o diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina, 2025.',
        sourceType: 'Diretriz técnica regional',
        url: 'https://www.brasileish.com.br/',
        notes: 'Âncora principal desta ficha; consultar versão integral publicada pelo grupo.',
        evidenceLevel: 'A — aplicação prática regional',
      },
      {
        id: 'ref-nelson-couto-leish',
        citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020 — leishmaniose (protozoários).',
        sourceType: 'Livro-texto',
        url: null,
        notes: 'Integração clínica, PCR, vias de transmissão, terapias.',
        evidenceLevel: 'B',
      },
      {
        id: 'ref-plumb-miltefosina-antimonio',
        citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — Miltefosine; Meglumine antimonate.',
        sourceType: 'Formulário',
        url: null,
        notes: 'Doses, precauções, combinações extra-label.',
        evidenceLevel: 'A — posologia e segurança',
      },
      {
        id: 'ref-leishvet',
        citationText: 'Solano-Gallego L et al. LeishVet guidelines / fact sheets (consenso internacional).',
        sourceType: 'Consenso especializado',
        url: 'https://www.leishvet.org/',
        notes: 'Estadiamento e manejo geral; ver documentos atualizados no site.',
        evidenceLevel: 'A',
      },
      {
        id: 'ref-nogueira-2019',
        citationText:
          'Nogueira FS et al. Use of miltefosine to treat canine visceral leishmaniasis caused by Leishmania infantum in Brazil. Parasites & Vectors, 2019;12:79.',
        sourceType: 'Estudo clínico',
        url: 'https://doi.org/10.1186/s13071-019-3323-0',
        notes: 'Miltefosina no Brasil — clínica e carga parasitária.',
        evidenceLevel: 'B',
      },
      {
        id: 'ref-pineda-2017',
        citationText:
          'Pineda C et al. Treatment of canine leishmaniasis with marbofloxacin in dogs with renal disease. PLoS One, 2017;12(10):e0185981.',
        sourceType: 'Estudo clínico',
        url: 'https://doi.org/10.1371/journal.pone.0185981',
        notes: 'Marbofloxacina + doença renal.',
        evidenceLevel: 'B',
      },
      {
        id: 'ref-yimam-2020',
        citationText:
          'Yimam Y, Mohebali M. Effectiveness of insecticide-impregnated dog collars in reducing incidence rate of canine visceral leishmaniasis: systematic review and meta-analysis. PLoS One, 2020;15(9):e0238601.',
        sourceType: 'Revisão sistemática / meta-análise',
        url: 'https://doi.org/10.1371/journal.pone.0238601',
        notes: 'Evidência para coleiras inseticidas na prevenção.',
        evidenceLevel: 'A — prevenção vetorial',
      },
    ],
    isPublished: true,
    source: 'seed',
  },
];
