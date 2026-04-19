import { DiseaseRecord } from '../../types/disease';
import { colapsoTraquealCaninoRecord } from './diseases.colapso-traqueal.seed';
import { erliquioseMonociticaCaninaRecord } from './diseases.erlichia.seed';
import { micoplasmosesHemotropicasRecord } from './diseases.hemoplasma.seed';
import { leishmanioseVisceralCaninaRecord } from './diseases.leishmaniose.seed';
import { doencaRenalCronicaCaesGatosRecord } from './diseases.drc.seed';
import { hipertensaoArterialSistemicaRecord } from './diseases.hipertensao.seed';
import { doencaValvarMitralDegenerativaRecord } from './diseases.dmvd.seed';

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
      'A furunculose anal / fístula perianal é doença imunomediada crônica da região perianal e pararretal em que a resposta inflamatória desregulada destrói a arquitetura tecidual normal, gerando ulcerações dolorosas, tratos fistulosos e, nos casos avançados, estenose ou incontinência. Classicamente sobredimensionada em Pastor Alemão, mas descrita em outros grandes; não é “abscesso de saco anal simples” — embora saculite possa coexistir ou mimetizar. O diagnóstico permanece fundamentalmente clínico: inspeção após tosa e limpeza, palpação digital e toque retal sob sedação/analgesia quando a dor impede exame consciente. Exames de imagem ou histopatologia entram em casos atípicos. O tratamento contemporâneo ancora-se na ciclosporina (consenso 2025 e estudos clássicos), com suporte local, analgesia multimodal, controle de infecção secundária quando documentada e dieta de eliminação em subset de pacientes com componente gastrointestinal. Cirurgia deixou de ser primeira linha e reserva-se a fibrose, estenose ou falha terapêutica documentada após curso médico adequado.',
    quickDecisionStrip: [
      'Dor perianal intensa com tratos drenantes = suspeita forte.',
      'Inspeção minuciosa e toque retal, muitas vezes com sedação.',
      'Pense em doença imunomediada, não só infecção.',
      'Ciclosporina é a base terapêutica atual de primeira linha.',
      'Cirurgia costuma ficar para caso residual, refratário ou com saco anal envolvido.',
    ],
    quickSummaryRich: {
      lead:
        'A furunculose perianal dói de verdade — muitos cães são eutanasiados cedo por mal controle da dor ou por confundir com “simples infecção de pele”. O eixo moderno é imunomediado: sem ciclosporina (ou equivalente terapêutico bem conduzido), antibiótico isolado falha. O exame adequado exige humildade clínica: sedar, ver todos os tratos, palpar sacos anais e documentar.',
      leadHighlights: ['imunomediada', 'Pastor Alemão', 'ciclosporina', 'inspeção', 'toque retal'],
      pillars: [
        {
          title: 'Definição',
          body:
            'Inflamação crônica da região perianal com ulcerações e tratos drenantes; o eixo central é imunomediado, com infecção secundária como agravante.',
          highlights: ['imunomediado'],
        },
        {
          title: 'População típica',
          body: 'Predomínio em Pastor Alemão adulto a idoso; outros cães grandes também podem ser acometidos.',
          highlights: ['Pastor Alemão'],
        },
        {
          title: 'Conduta imediata',
          body:
            'Inspeção com limpeza/tosa, toque retal quando seguro (sedar se dor), analgesia e planejar imunomodulação — na prática atual, ciclosporina como espinha dorsal.',
          highlights: ['toque retal', 'ciclosporina'],
        },
      ],
      diagnosticFlow: {
        title: 'Fluxo diagnóstico (consultório)',
        steps: [
          {
            label: '1. Triagem de compatibilidade',
            detail:
              'Dor perianal intensa, lambedura persistente, odor, tratos purulentos, tenesmo ou disquesia — soma sugestiva; ausência de prurido generalizado tipo alérgico.',
          },
          {
            label: '2. Exame direto',
            detail:
              'Tosa higiênica, limpeza suave, inspeção de todos os quadrantes perianais; digitalizar orifícios fistulosos quando seguro; toque retal para extensão pararretal, espessamento, massas e integridade dos sacos anais — sedar se necessário.',
          },
          {
            label: '3. Diferenciais obrigatórios',
            detail:
              'Sacos anais obstruídos ou abscesso, neoplasia anal/retal, fistula por corpo estranho, proctite ulcerativa, trauma — cada um muda prognóstico e cirurgia.',
          },
          {
            label: '4. Exames complementares',
            detail:
              'Citologia/cultura se secreção purulenta exuberante; colonoscopia se diarreia hemorrágica difusa; biópsia se idade atípica, lesão nodular ou falha terapêutica inesperada.',
          },
          {
            label: '5. Documentação',
            detail:
              'Fotografias seriadas (com consentimento) aceleram comparação objetiva sem depender de memória clínica.',
          },
        ],
      },
      treatmentFlow: {
        title: 'Fluxo terapêutico (linha geral)',
        steps: [
          {
            label: 'Camada 1 — Imunomodulação',
            detail:
              'Ciclosporina como espinha dorsal; expectativa de resposta em semanas a meses — combinar com monitorização de pressão arterial e função renal conforme protocolo.',
          },
          {
            label: 'Camada 2 — Dor e pele',
            detail:
              'Analgesia multimodal, higiene diária, banhos de assento/antissépticos diluídos; evitar irritantes.',
          },
          {
            label: 'Camada 3 — Trato gastrointestinal',
            detail:
              'Amolecedores fecais se dor à evacuação; dieta hidrolisada ou nova proteína se história compatível com sensibilidade alimentar.',
          },
          {
            label: 'Camada 4 — Corticoide ponte',
            detail:
              'Prednisolona em curso curto pode acelerar melhora inicial em protocolos selecionados — transparência com tutor sobre efeitos adversos.',
          },
          {
            label: 'Camada 5 — Cirurgia',
            detail:
              'Reservada a estenose sintomática, anatomia fistulosa que não fecha com imunomodulação prolongada ou suspeita neoplásica — nunca como atalho antes de ciclosporina adequada.',
          },
        ],
      },
    },
    etiology: {
      visaoGeral:
        'A etiologia exata não está totalmente fechada; na prática trata-se de doença inflamatória imunomediada crônica da região perianal (Nelson & Couto: inflamação crônica com ulcerações ao redor do ânus; abordagem médica superou a cirúrgica ao reconhecer o mecanismo imune subjacente).',
      fatores: [
        'Predisposição genética e imunológica: a alta frequência em pastor alemão sugere suscetibilidade; nessa raça concentra-se grande parte dos casos descritos na literatura, com hipótese fortemente imunomediada.',
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
        'Em linhas gerais, ocorre uma resposta imune desregulada na interface entre pele, mucosa e tecidos perianais no cão predisposto.',
        'A inflamação prolongada destrói a integridade da barreira: surgem ulcerações, tratos drenantes e cavidades fistulosas ao redor do ânus.',
        'Com a evolução, podem aparecer fibrose, estenose anal ou retal e, nos casos graves, incontinência fecal.',
        'Umidade, contato com fezes, lambedura e infecção secundária frequentemente perpetuam o processo, embora nem sempre sejam o evento inicial isolado.',
      ],
      infiltrado:
        'No infiltrado inflamatório costuma predominar participação de linfócitos T (imunidade celular), o que reforça o caráter imunomediado da doença — não apenas infeccioso (Nelson & Couto).',
      transmissao:
        'Não se transmite de um animal para outro como doença contagiosa “de contato”. O que determina o aparecimento da condição é sobretudo predisposição individual, regulação imune e fatores locais (anatomia, higiene, comorbidades).',
    },
    pathophysiology:
      'A região anal integra pele perianal, mucosa retal terminal, esfíncteres e sacos anais. Inflamação imune persistente na interface pele–mucosa–esfíncter destrói integridade, ulcera e drena de forma desorganizada.\n\n' +
      'Dor intensa — inervação rica; ulceração profunda.\n' +
      'Tenesmo/disquesia — dor à evacuação, edema, fibrose/estenose.\n' +
      'Hematochezia e secreção mucopurulenta — mucosa/ pele ulcerada + exsudato e contaminação local.\n' +
      'Fibrose e estenose — reparação desorganizada.\n' +
      'Lambedura/automutilação — dor, prurido inflamatório.\n' +
      'Perda de peso/hiporexia — dor crônica e inflamação (Nelson & Couto: letargia, inapetência, perda de peso nos casos dolorosos).\n\n' +
      'Dica de estudo: na prova, ligue “Pastor Alemão + tratos ulcerados perianais + ciclosporina” — é o triângulo mnemônico da furunculose atual.',
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
        '1) Imunomodulação de base — eixo principal. Consenso recente (2025): ciclosporina em primeira linha; dose inicial típica 5 mg/kg uma vez ao dia; a resposta pode levar até cerca de três meses — evite declarar falha precoce. Há relatos de esquema duas vezes ao dia e de associação com cetoconazol para reduzir a necessidade de ciclosporina (individualizar, monitorar e respeitar bula e legislação local).',
        '2) Controle local — higiene perianal diária ou frequente (Nelson & Couto); antissépticos tópicos (por exemplo clorexidina) quando houver infecção secundária relevante.',
        '3) Analgesia e conforto evacuatório — a dor é determinante de sofrimento; amolecedores fecais (por exemplo lactulose) podem reduzir trauma à evacuação.',
        '4) Tacrolimo tópico — adjuvante ou em casos leves; existem protocolos combinados na literatura (cuidado com ingestão pelo animal).',
        '5) Prednisolona ou prednisona — frequentemente como ponte ou adjuvante: efeito mais rápido, porém com perfil importante de efeitos adversos em uso prolongado; doses anti-inflamatórias ou imunossupressoras conforme o caso (consulte a monografia de prednisolona no aplicativo).',
        '6) Dieta com proteína nova ou hidrolisada — quando houver suspeita de componente alimentar ou sinais gastrointestinais associados; não é obrigatório em todos.',
        '7) Infecção secundária — tratar quando estiver documentada ou clinicamente evidente; não substitui a imunomodulação de base.',
        '8) Cirurgia — reservada a casos residuais ou refratários após terapia médica adequada, envolvimento importante de sacos anais, fibrose ou estenose, ou anatomia que impeça boa resposta clínica.',
      ],
      monitoramento: [
        'Dor à evacuação — observar se o animal continua tenso, resistente ou vocaliza ao defecar.',
        'Lesões locais — número e profundidade dos tratos, secreção e odor; fotos seriadas ajudam a acompanhar evolução.',
        'Toque retal — reavaliar periodicamente quando indicado e seguro (sedar se necessário).',
        'Função digestiva e estado geral — consistência fecal, peso, apetite e hidratação.',
        'Medicamentos — vigilância a efeitos adversos de ciclosporina, glicocorticoides e cetoconazol quando em uso.',
        'Expectativa de resposta — com ciclosporina, melhora costuma levar semanas a meses; evite conclusões precipitadas (alinhado ao consenso de 2025).',
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
      {
        id: 'ref-plumb-cyclosporine',
        citationText:
          'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — ciclosporina (doses, monitorização, interações).',
        sourceType: 'Formulário',
        url: null,
        notes: 'Base farmacológica da imunomodulação na furunculose.',
        evidenceLevel: 'Alta (referência prática)',
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
      'Cortisol em excesso crônico aumenta catabolismo proteico (fraqueza, atrofia abdominal, abdômen pendular), reduz síntese de colágeno e renovação cutânea (pele fina, comedões, alopecia endocrina, calcinosis cutis no cão; no gato “pele de papel”), antagoniza insulina (diabetes mellitus e resistência), favorece hepatopatia vacuolar e hepatomegalia, reduz capacidade de concentrar urina (poliúria e polidipsia), altera lipídios e predispõe a complicações tromboembólicas, hipertensão e infecções secundárias.',
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
        title: 'Confirmar que o quadro combina com hiperadrenocorticismo',
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
          'Não existe um único exame “padrão ouro” para todos os cenários. Hiperadrenocorticismo espontâneo no cão: história, clínica, banco mínimo compatível e teste de triagem apropriado. Diferenciação entre forma hipófise-dependente e adrenal dependente: imagem adrenal, ACTH endógeno (com teste de supressão com dexametasona em altas doses quando indicado; imagem hipofisária em casos selecionados). Gato: LDDST com dose felina, imagem e contexto (diabetes resistente, pele frágil).',
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
        'Primeira escolha médica na maioria dos cães (forma hipófise-dependente e muitos casos de forma adrenal dependente não operáveis). Mecanismo: inibe a enzima 3β-hidroxiesteroide desidrogenase, reduzindo de modo reversível a síntese de cortisol, aldosterona e andrógenos adrenais.\n\n' +
        'Doses: bula ou registro frequentemente indicam 2,2 a 6,7 mg/kg via oral a cada 24 horas com alimento; reavaliar em 10 a 14 dias com teste de estimulação com ACTH e bioquímica. Esquemas extra-label comuns em medicina interna: cerca de 1 mg/kg a cada 12 horas com alimento, ou 2 mg/kg a cada 24 horas, preferindo administração duas vezes ao dia; alguns animais necessitam três vezes ao dia. O Plumb descreve esquemas duas vezes ao dia com doses menores em cães pequenos e protocolos de baixa dose — individualizar sempre.\n\n' +
        'Monitoramento: primeiro retorno em 10 a 14 dias; após cada ajuste, novo controle em 10 a 14 dias; depois em 30 dias, 90 dias e aproximadamente a cada três meses. Incluir eletrólitos, função renal e hepática, urinálise e teste de estimulação com ACTH em horário padronizado após a cápsula (muitos serviços usam cerca de 4 a 6 horas após a dose; manter o mesmo critério no mesmo paciente). Metas de cortisol pós-ACTH variam entre autores (por exemplo Nelson cerca de 2 a 5 µg/dL; o Plumb aceita controle clínico com faixa mais ampla se o animal está bem). Efeitos adversos: letargia, anorexia, sinais gastrointestinais, alteração de eletrólitos, hipoadrenocorticismo iatrogênico; suspender e reavaliar se houver sinais compatíveis.',
      mitotanoNoCao:
        'Segunda linha ou alternativa quando o trilostano falha ou não é tolerado; fármaco adrenocorticolítico — exige vigilância maior. Indução clássica: cerca de 50 mg/kg por dia via oral divididos a cada 12 horas com alimento (reduzir se não houver polidipsia ou na presença de diabetes). Primeiro teste de estimulação com ACTH por volta de 5 a 7 dias; meta de cortisol pós-ACTH semelhante à literatura de controle. Manutenção: esquemas semanais fracionados (por exemplo Nelson cerca de 35 a 50 mg/kg por semana em duas ou três doses; existem protocolos mais ablativos). Prednisolona ou prednisona pode acompanhar a indução ou ficar disponível para emergência. Monitorar de perto; suspender diante de anorexia, letargia, vômito, diarreia ou fraqueza.',
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
  },
  leishmanioseVisceralCaninaRecord,
  erliquioseMonociticaCaninaRecord,
  colapsoTraquealCaninoRecord,
  micoplasmosesHemotropicasRecord,
  doencaRenalCronicaCaesGatosRecord,
  hipertensaoArterialSistemicaRecord,
  doencaValvarMitralDegenerativaRecord,
];
