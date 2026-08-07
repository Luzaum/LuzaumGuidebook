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
import { cardiomiopatiaHipertroficaRecord } from './diseases.cardiomiopatia-hipertrofica.seed';
import { cardiomiopatiaDilatadaRecord } from './diseases.cardiomiopatia-dilatada.seed';
import { cardiomiopatiaRestritivaRecord } from './diseases.cardiomiopatia-restritiva.seed';
import { tumoresMamariosRecord } from './diseases.tumores-mamarios.seed';
import { mastiteRecord } from './diseases.mastite.seed';
import { asmaFelinaRecord } from './diseases.asma-felina.seed';
import { bronquiteCronicaRecord } from './diseases.bronquite-cronica.seed';
import { granulomaEosinofilicoFelinoRecord } from './diseases.granuloma-eosinofilico-felino.seed';
import { miasteniaGravisCaesGatosRecord } from './diseases.miastenia-gravis.seed';
import { sindromesMiastenicasCongenitasRecord } from './diseases.sindromes-miastenicas-congenitas.seed';
import { leucemiaViralFelinaRecord } from './diseases.leucemia-viral-felina.seed';
import { peritoniteInfecciosaFelinaRecord } from './diseases.peritonite-infecciosa-felina.seed';
import { imunodeficienciaFelinaFivRecord } from './diseases.imunodeficiencia-felina-fiv.seed';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

function withPlainLanguage(record: DiseaseRecord): DiseaseRecord {
  return {
    ...record,
    plainLanguage: record.plainLanguage ?? DISEASE_PLAIN_LANGUAGE[record.slug],
  };
}

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
      mecanismoImune:
        'Inflamação crônica imunomediada na interface pele–mucosa–esfíncter perianal destrói arquitetura tecidual normal, gerando ulcerações e tratos fistulosos (Nelson & Couto, 6ª ed.).',
      genetica:
        'Predisposição marcante em Pastor Alemão; linhagens familiares sugerem suscetibilidade imunológica.',
  fatoresAgravantes: [
    'Umidade, maceração fecal e infecção secundária perpetuam dor e inflamação.',
    'Comorbidades intestinais e componente alimentar podem coexistir em subset de pacientes.',
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
      'Perda de peso/hiporexia — dor crônica e inflamação (Nelson & Couto: letargia, inapetência, perda de peso nos casos dolorosos).',
    clinicalSignsPathophysiology: [
      {
        system: 'behavioral',
        findings: [
          {
            finding: 'Lambedura perianal persistente e automutilação',
            mechanism:
              'Ulcerações drenantes e inflamação local provocam dor e prurido inflamatório contínuos.',
            clinicalMeaning: 'Sinal frequente e subestimado; exige inspeção minuciosa após tosa.',
            priority: 'common',
          },
        ],
      },
      {
        system: 'gastrointestinal',
        findings: [
          {
            finding: 'Tenesmo, disquesia e hematochezia',
            mechanism:
              'Dor ao evacuar e ulceração mucosa/cutânea sangram com facilidade; fibrose crônica estreita canal.',
            clinicalMeaning: 'Diferenciar de obstipação primária e proctite isolada.',
            priority: 'common',
          },
          {
            finding: 'Secreção mucopurulenta e odor forte',
            mechanism:
              'Exsudato inflamatório e infecção secundária bacteriana no leito fistuloso.',
            clinicalMeaning: 'Infecção secundária agrava mas não substitui imunomodulação de base.',
            priority: 'common',
          },
        ],
      },
      {
        system: 'general',
        findings: [
          {
            finding: 'Letargia, hiporexia e perda de peso',
            mechanism:
              'Dor crônica e inflamação sistêmica sustentam estado catabólico.',
            clinicalMeaning: 'Caquexia indica doença avançada mal controlada.',
            priority: 'systemic',
          },
        ],
      },
    ],
    diagnosis: [
      {
        stepNumber: 1,
        title: 'Inspeção perianal e toque retal',
        purpose: 'Confirmar tratos fistulosos e avaliar extensão pararretal.',
        description:
          'Tosa higiênica, inspeção de todos os quadrantes, digitalização de orifícios e toque retal — sedar se dor impede exame (Nelson & Couto, 6ª ed.; BSAVA Gastroenterology, 3ª ed.).',
        interpretation: 'Tratos ulcerados/drenantes clássicos confirmam suspeita forte.',
        limitations: 'Exame incompleto por dor é causa frequente de subestadiamento.',
        isGoldStandard: true,
      },
      {
        stepNumber: 2,
        title: 'Diferenciais locais',
        purpose: 'Excluir condições que mudam prognóstico e cirurgia.',
        description:
          'Sacos anais obstruídos, neoplasia anal/retal, proctite, trauma e corpo estranho.',
        interpretation: 'Abscesso de saco anal isolado não é furunculose clássica.',
        limitations: 'Lesões podem coexistir — documentar cada achado.',
      },
      {
        stepNumber: 3,
        title: 'Endoscopia e biópsia selecionadas',
        purpose: 'Investigar componente gastrointestinal ou atipia.',
        description:
          'Proctoscopia/colonoscopia se diarreia ou constipação importante; biópsia se massa, raça atípica ou falha terapêutica.',
        interpretation: 'Colite associada pode exigir dieta de eliminação adjuvante.',
        limitations: 'Biópsia não é rotina quando lesões são clássicas.',
      },
    ],
    treatment: {
      imunomodulacao: [
        'Mathews et al. (1997), em ensaio randomizado com 16 cães, demonstraram resposta clínica superior da ciclosporina versus placebo na furunculose perianal. Conclusão: ciclosporina 5 mg/kg VO q24h como primeira linha; resposta pode levar até 3 meses (Bruet et al., 2025).',
        'Bruet et al. (2025) reforçam consenso atual: imunomodulação médica substitui cirurgia de rotina; antibiótico isolado falha sem ciclosporina ou equivalente.',
      ],
      suporteLocal: [
        'Nelson & Couto (6ª ed.) recomendam higiene perianal diária e antissépticos tópicos quando infecção secundária relevante.',
        'Analgesia multimodal e amolecedores fecais reduzem trauma à evacuação.',
      ],
      cirurgia:
        'Reservada a fibrose, estenose ou falha após curso médico adequado de imunomodulação — nunca atalho antes de ciclosporina bem conduzida (Pieper, 2022).',
      monitoramento: [
        'Dor à evacuação, número/profundidade de tratos e fotos seriadas.',
        'Função renal e pressão arterial com ciclosporina prolongada.',
        'Expectativa de melhora em semanas a meses — evitar conclusão precoce de falha.',
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
  asmaFelinaRecord,
  bronquiteCronicaRecord,
  granulomaEosinofilicoFelinoRecord,
  micoplasmosesHemotropicasRecord,
  doencaRenalCronicaCaesGatosRecord,
  hipertensaoArterialSistemicaRecord,
  doencaValvarMitralDegenerativaRecord,
  cardiomiopatiaHipertroficaRecord,
  cardiomiopatiaDilatadaRecord,
  cardiomiopatiaRestritivaRecord,
  hipoadrenocorticismoAddisonRecord,
  diabetesMellitusCaninaRecord,
  diabetesMellitusFelinaRecord,
  hipertireoidismoFelinoRecord,
  hipotireoidismoCaninoRecord,
  tumoresMamariosRecord,
  mastiteRecord,
  miasteniaGravisCaesGatosRecord,
  sindromesMiastenicasCongenitasRecord,
  leucemiaViralFelinaRecord,
  peritoniteInfecciosaFelinaRecord,
  imunodeficienciaFelinaFivRecord,
].map(withPlainLanguage);
