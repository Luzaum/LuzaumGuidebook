import { DiseaseRecord } from '../../types/disease';
import { colapsoTraquealCaninoRecord } from './diseases.colapso-traqueal.seed';
import { erliquioseMonociticaCaninaRecord } from './diseases.erlichia.seed';
import { micoplasmosesHemotropicasRecord } from './diseases.hemoplasma.seed';
import { leishmanioseVisceralCaninaRecord } from './diseases.leishmaniose.seed';
import { doencaRenalCronicaCaesGatosRecord } from './diseases.drc.seed';
import { hipertensaoArterialSistemicaRecord } from './diseases.hipertensao.seed';
import { doencaValvarMitralDegenerativaRecord } from './diseases.dmvd.seed';
import { hiperadrenocorticismoCushingRecord } from './diseases.hiperadrenocorticismo.seed';
import { hipoadrenocorticismoAddisonRecord } from './diseases.hipoadrenocorticismo.seed';
import { hipertireoidismoFelinoRecord } from './diseases.hipertireoidismo.seed';
import { hipotireoidismoCaninoRecord } from './diseases.hipotireoidismo.seed';
import { dtuifFelinaRecord } from './diseases.dtuif-felina.seed';
import { diabetesMellitusCaninaRecord } from './diseases.diabetes-mellitus-canina.seed';
import { diabetesMellitusFelinaRecord } from './diseases.diabetes-mellitus-felina.seed';
import { babesioseCaninaRecord } from './diseases.babesiose.seed';

export const diseasesSeed: DiseaseRecord[] = [
  babesioseCaninaRecord,
  dtuifFelinaRecord,
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
        '4) Tacrolimo tópico — adjuvante ou em crises leves; existem protocolos combinados na literatura (cuidado com ingestão pelo animal).',
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
  hiperadrenocorticismoCushingRecord,
  leishmanioseVisceralCaninaRecord,
  erliquioseMonociticaCaninaRecord,
  colapsoTraquealCaninoRecord,
  micoplasmosesHemotropicasRecord,
  doencaRenalCronicaCaesGatosRecord,
  hipertensaoArterialSistemicaRecord,
  doencaValvarMitralDegenerativaRecord,
  hipoadrenocorticismoAddisonRecord,
  diabetesMellitusCaninaRecord,
  diabetesMellitusFelinaRecord,
  hipertireoidismoFelinoRecord,
  hipotireoidismoCaninoRecord,
];
