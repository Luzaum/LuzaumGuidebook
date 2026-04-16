import { DiseaseRecord } from '../../types/disease';

/** Erliquiose monocítica canina (CME) — E. canis; texto editorial integrando Nelson & Couto, Merck, Plumb’s, Vaden, ACVIM. */
export const erliquioseMonociticaCaninaRecord: DiseaseRecord = {
  id: 'disease-erliquiose-monocitica-canina',
  slug: 'erliquiose-monocitica-canina',
  title: 'Erliquiose monocítica canina (Ehrlichia canis)',
  synonyms: [
    'CME',
    'Canine monocytic ehrlichiosis',
    'Erliquiose por E. canis',
    'Ehrlichiose canina',
  ],
  species: ['dog'],
  category: 'infecciosas',
  tags: [
    'Carrapato',
    'Rhipicephalus sanguineus',
    'Trombocitopenia',
    'Doxiciclina',
    'PCR',
    'Coinfecção',
  ],
  quickSummary:
    'Doença transmitida principalmente por carrapatos (Rhipicephalus sanguineus), com Ehrlichia canis infectando monócitos. Cursa em fases aguda, subclínica e crônica; trombocitopenia é achado clássico, com evolução possível para hiperglobulinemia, proteinúria, uveíte, poliartrite e pancitopenia medular. Diagnóstico é integrado (clínica + hemograma + sorologia + PCR). Tratamento de primeira linha: doxiciclina 10 mg/kg SID por pelo menos 28 dias. Transfusão e triagem de doadores são pontos críticos de segurança.',
  quickDecisionStrip: [
    'Cão com carrapato (ou histórico) + trombocitopenia: pense forte em erliquiose.',
    'Agudo: febre, apatia, anorexia, linfadenomegalia; crônico: pancitopenia, hemorragia, uveíte, proteinúria.',
    'Mórulas no esfregaco ajudam quando presentes, mas sensibilidade é baixa.',
    'PCR documenta infecção ativa; colher antes do antibiótico; pode negativar após terapia.',
    'Doxiciclina 10 mg/kg SID PO por ≥28 dias é a base; reavaliar em ~7 dias se não houver melhora clínica.',
  ],
  quickSummaryRich: {
    lead:
      'A CME é uma riquetsiose sistémica: após inoculação pelo carrapato, E. canis replica em monócitos e dissemina pelo sistema mononuclear fagocítico. O quadro varia de agudo febril a subclínico sorológico/PCR+ e a crônico multissistêmico com imunocomplexos e hipoplasia medular. Nenhum exame isolado substitui o raciocínio temporal (soroconversão, carga parasitária, fase da doença).',
    leadHighlights: ['trombocitopenia', '28 dias', 'PCR', 'integrado'],
    pillars: [
      {
        title: 'Vetor e sangue',
        body:
          'Rhipicephalus sanguineus é o vetor mais citado para E. canis. Transmissão transfusional é documentada: doadores devem ser sorologicamente (e idealmente PCR) negativos.',
        highlights: ['sanguineus', 'transfusão'],
      },
      {
        title: 'Plaquetas e sangramento',
        body:
          'A contagem plaquetária não conta a história toda: vasculite, disfunção plaquetária e hiperglobulinemia explicam sangramento desproporcional ao número.',
        highlights: ['vasculite', 'disfunção plaquetária'],
      },
      {
        title: 'Coinfecções',
        body:
          'Anaplasma platys, Babesia, Bartonella e outras infecções vetoriais podem agravar ou confundir o quadro — reabrir o diagnóstico se a resposta for atípica.',
        highlights: ['coinfecção'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (prática)',
      steps: [
        { label: 'Contexto + hemograma', detail: 'Área de carrapato; trombocitopenia; pancitopenia no crônico.' },
        { label: 'Esfregaco + teste rápido/IFA', detail: 'Mórulas = bônus; sorologia pode atrasar na fase aguda.' },
        { label: 'PCR (EDTA, antes de ATB)', detail: 'Melhor para infecção ativa; interpretar com clínica.' },
        { label: 'Integração', detail: 'Quadro + hematologia + sorologia/PCR no tempo correto.' },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento e suporte',
      steps: [
        { label: 'Doxiciclina 28 d', detail: '10 mg/kg SID PO (alternativa 5 mg/kg BID).' },
        { label: 'Resposta aguda', detail: 'Muitos melhoram em 24–48 h; se não em ~7 d, rever diagnóstico/coinfecção.' },
        { label: 'Adjuvantes', detail: 'Minociclina se não houver doxiciclina; imidocarb resgate; prednisona só com critério imunomediado.' },
        { label: 'Grave', detail: 'Transfusão, fluido com cautela renal/hemorrágico.' },
      ],
    },
  },
  etiology: {
    conceitoIntracelular:
      'Ehrlichia canis é obrigatoriamente intracelular: no cão infecta preferencialmente monócitos, usando a célula como nicho e veículo — daí doença sistémica ligada a sangue, endotelho e imunidade.',
    agentePrincipalEOutros:
      'CME clássica (“carrapato marrom”): E. canis. No mesmo ecossistema existem E. ewingii e E. chaffeensis em cães, mas a forma monocítica clássica dominante na clínica de pequenos animais é E. canis.',
    notaFelinos:
      'Em gatos, erliquiose monocítica felina é descrita como possibilidade, porém menos definida, menos frequente e menos consolidada que a CME canina. Na rotina “erliquiose” em cães e gatos quase sempre refere-se à forma canina por E. canis.',
  },
  epidemiology: {
    distribuicaoEVetor:
      'A doença é reportada em praticamente todos os continentes, exceto Austrália e Antártida (Merck). O carrapato marrom do cão, Rhipicephalus sanguineus, é o vetor mais importante para E. canis.',
    transfusaoEComunidade:
      'Transmissão por transfusão sanguínea é possível e muda o protocolo de bancos de sangue: triagem sorológica e, idealmente, PCR em doadores (Nelson; Merck).',
    gravidadeECoinfecao:
      'Pode ser mais grave com imunidade celular deprimida e com coinfecções por outros agentes transmitidos por carrapato (ex.: Anaplasma platys, Bartonella spp.) — importante quando o caso “não encaixa”.',
  },
  pathogenesisTransmission: {
    disseminacaoEVasculite:
      'Após inoculação, E. canis infecta monócitos e dissemina pelo sistema mononuclear fagocítico, gerando vasculite, ativação imune, disfunção e consumo de plaquetas; nos crônicos há alterações medulares e glomerulares.',
    trombocitopeniaMultifatorial:
      'A trombocitopenia resulta de consumo, destruição imunomediada, sequestro, disfunção plaquetária e, no crônico, queda de produção por hipoplasia medular — marcante em agudo e crônico, em geral mais severa no crônico (Nelson).',
    sangramentoSemPlaquetasMuitoBaixas:
      'Sangramento não depende só da contagem: vasculite, disfunção plaquetária e trombocitopatias associadas à hiperglobulinemia explicam hemorragia desproporcional (Nelson).',
    rimOlhoImunocomplexos:
      'Na fase crônica, deposição de imunocomplexos contribui para glomerulonefrite, proteinúria, uveíte, hifema e alterações retinianas.',
    medulaOssea:
      'Agudo: medula pode estar hipercelular. Crônico: hipocelularidade / hipoplasia de linhagens → pancitopenia (marca de gravidade).',
  },
  pathophysiology:
    'Fisiopatologia por fases: (1) Agudo (1–3 semanas pós-infecção): comportamento de riquetsiose com vasculite sistémica — febre, anorexia, perda de peso, linfadenomegalia, hemorragias leves, serosidade ocular/nasal, trombocitopenia; carrapatos frequentemente evidentes (Merck; Nelson). (2) Subclínico: sem sinais evidentes, mas pode haver trombocitopenia discreta, hiperglobulinemia, neutropenia, linfocitose ou monocitose, sorologia/PCR positivas — pode prolongar-se. (3) Crônico: pancitopenia, palidez, emagrecimento, epistaxe, hemorragias retinianas, uveíte, esplenomegalia, proteinúria, glomerulonefrite, eventual neurológico/articular — mistura de falência medular, imunocomplexos e inflamação persistente.',
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        'Agudo: febre, apatia, anorexia, perda de peso; carrapatos muitas vezes visíveis.',
        'Crônico: depressão, emagrecimento, mucosas pálidas (anemia/pancitopenia).',
      ],
    },
    {
      system: 'lymphatic',
      findings: ['Linfadenomegalia; esplenomegalia (hiperplasia linfo-reticular / sequestro).'],
    },
    {
      system: 'hematologic',
      findings: [
        'Petequias, equimoses, epistaxe; hemorragia pulmonar possível.',
        'Crônico: pancitopenia; granular lymphocytosis pode mimetizar LLCr.',
      ],
    },
    {
      system: 'ocular',
      findings: [
        'Crônico: retinite perivascular, hifema, descolamento de retina, uveíte anterior, edema de córnea.',
      ],
    },
    {
      system: 'neurologic',
      findings: ['Crônico: dor meníngea, paresia, déficits de nervos cranianos, convulsões (menos comum).'],
    },
    {
      system: 'musculoskeletal',
      findings: ['Poliartrite supurativa não séptica; rigidez e dor articular.'],
    },
    {
      system: 'renal',
      findings: ['PU/PD, proteinúria, azotemia por glomerulonefrite imunomediada.'],
    },
    {
      system: 'respiratory',
      findings: ['Tosse, dispneia: hemorragia/edema pulmonar, vasculite, complicações secundárias.'],
    },
  ],
  diagnosis: {
    cmeSuspeitaClinica:
      'Em área com carrapato: febre + trombocitopenia; hemorragia + trombocitopenia; hiperglobulinemia + trombocitopenia; ou pancitopenia — tudo isso deve colocar CME no radar, mesmo sem carrapato no dia da consulta.',
    cmeTabelaFasesSinaisLab: {
      kind: 'clinicalTable',
      headers: ['Fase', 'Tempo / conceito', 'Sinais clínicos principais', 'Laboratório / notas'],
      rows: [
        [
          'Aguda',
          '~1–3 semanas após infecção',
          'Febre, anorexia, perda de peso, linfadenomegalia, hemorragias leves, serosidade ocular/nasal',
          'Trombocitopenia marcante; anemia leve não regenerativa salvo hemorragia',
        ],
        [
          'Subclínica',
          'Prolongada',
          'Aparentemente normal ou quase',
          'Trombocitopenia discreta, hiperglobulinemia, neutropenia, linfo/monocitose; sorologia/PCR podem ser positivas',
        ],
        [
          'Crônica',
          'Meses',
          'Pancitopenia, hemorragias, uveíte, esplenomegalia, proteinúria, neurológico/articular',
          'Pancitopenia; hiperglobulinemia; proteinúria; medula hipocelular possível',
        ],
      ],
    },
    cmeEsfregacoSangue:
      'Mórulas em monócitos confirmam quando vistas, mas células infectadas são mais prováveis no início da infecção e a sensibilidade é limitada (Vaden) — esfregaco é oportunidade, não exame de exclusão.',
    cmeSorologiaInterpretacao:
      'Sorologia (IFA, ELISA, rápidos) indica exposição; na aguda pode levar ≥3 semanas para soroconversão (falso-negativo precoce). Com alta suspeita aguda, repetir sorologia quantitativa em 2–4 semanas; aumento ~4× no título apoia diagnóstico (Merck). Títulos podem permanecer positivos por meses — positivo isolado não prova infecção ativa.',
    cmePcrSangueMedula:
      'PCR em sangue total (EDTA) é padrão prático; aspirado de medula é alternativa (Nelson; Vaden). Falsos-negativos ocorrem; sangue e linfonodo foram frequentemente positivos em estudos, com taxa relevante de negativos. Colher amostra antes do antibiótico — terapia reduz carga rapidamente.',
    cmeDiagnosticoIntegrado:
      'Não há um único “padrão ouro” em todos os cenários. Conceito prático: diagnóstico integrado = quadro clínico + hematologia compatível + sorologia e/ou PCR interpretados no tempo da doença. PCR positiva documenta melhor infecção ativa; sorologia apoia exposição e evolução temporal; mórulas quando presentes são diagnóstico morfológico direto.',
  },
  treatment: {
    cmeDoxiciclinaPrimeiraLinha:
      'Dose clássica: 10 mg/kg PO SID por pelo menos 28 dias (Nelson; Plumb’s; Merck; ACVIM). Alternativa estudada: 5 mg/kg PO q12h por 28 dias. Por que 28 e não 14 dias: cursos curtos podem melhorar a clínica sem eliminar adequadamente a infecção — há evidência de que carrapatos ainda podem adquirir E. canis de cães tratados só 14 dias (Nelson).',
    cmeTabelaAntimicrobianos: {
      kind: 'clinicalTable',
      headers: ['Fármaco', 'Dose / duração', 'Papel e notas'],
      rows: [
        [
          'Doxiciclina',
          '10 mg/kg PO q24h × ≥28 d (ou 5 mg/kg PO q12h × 28 d)',
          'Primeira linha; resposta clínica em 24–48 h muitas vezes no agudo.',
        ],
        [
          'Minociclina',
          '5–10 mg/kg PO q12h × 28 d (Merck se doxiciclina indisponível)',
          'Alternativa; Nelson cita equivalência experimental com doxiciclina em esquema 10 mg/kg BID × 28 d.',
        ],
        [
          'Imidocarb dipropionato',
          'Plumb’s (grave/refratário): 5 mg/kg SC, 1× ou 2× com 15 d, + doxiciclina 10 mg/kg q24h × 28 d. Nelson: 5–7 mg/kg IM/SC repetir 14 d',
          'Segunda linha / resgate; sozinho não limpou sangue em estudo experimental; ADR: dor, sialorreia, corrimento oculonasal, diarreia, tremores, dispneia.',
        ],
        [
          'Prednisona (adjuvante)',
          'Nelson (sem ensaios controlados): 2,2 mg/kg/d PO em 2 doses q12h por 3–4 d após diagnóstico',
          'Só com componente imunomediado relevante (ex.: IMHA/ITP severa); corticoide pode precipitar recrudescência em subclínico — não é rotina para todo cão.',
        ],
      ],
    },
    cmeSuporteTransfusaoFluidos:
      'Transfusão (sangue total ou concentrado) e suporte hemostático quando hemorragia importante, anemia por perda ou trombocitopenia severa com sangramento (Merck). Fluidoterapia quando hipovolemia/febre/desidratação, ajustada ao risco renal e hemorrágico.',
    cmeMedulaDeprimida:
      'Em pancitopenia crônica, “estimuladores de medula” e anabólicos frequentemente falham se não há precursores suficientes (Nelson) — expectativa de recuperação hematológica pode ser semanas a meses.',
  },
  prevention: {
    cmeControleCarrapato:
      'Controle contínuo de carrapatos: examinar após passeios; fipronil, isoxazolinas, piretroides, amitraz citados como úteis (Merck; Nelson cita também imidacloprida + permetrina reduzindo prevalência em jovens).',
    cmeDoadoresSangue:
      'ACVIM / Nelson: idealmente doadores negativos em sorologia e PCR; se PCR indisponível, mínimo soronegativos.',
    cmeZoonose:
      'O cão não transmite erliquiose à pessoa pelo contato habitual; o vetor é necessário. O cão pode ser sentinela e carregar carrapatos infectados — exposição humana compartilhada a E. canis / E. chaffeensis é contexto epidemiológico, não “pegar erliquiose ao pegar no cão” (Merck; Nelson).',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-nelson-rickettsia-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Cap. 95 — Polysystemic Rickettsial Diseases.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Fases, hematologia, PCR, tratamento, prednisona adjuvante, prognóstico.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-merck-ehrlichiosis-2025',
      citationText: 'Merck Veterinary Manual. Ehrlichiosis in Dogs. Revisão set. 2025.',
      sourceType: 'Revisão on-line',
      url: 'https://www.merckvetmanual.com/',
      notes: 'Vetor, clínica aguda/crônica, doxiciclina/minociclina, prevenção.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-plumb-doxy-imidocarb-2023',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023.',
      sourceType: 'Formulário',
      url: null,
      notes: 'Doxiciclina, imidocarb.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-vaden-lab-2013',
      citationText: 'Vaden SL et al. Exames laboratoriais e procedimentos diagnósticos em cães e gatos. Roca, 2013.',
      sourceType: 'Laboratório',
      url: null,
      notes: 'Sorologia, PCR, esfregaco, limitações.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-acvim-ehrlichia-2002',
      citationText:
        'Neer TM et al. Consensus Statement on Ehrlichial Disease of Small Animals (ACVIM). J Vet Intern Med. 2002.',
      sourceType: 'Consenso',
      url: null,
      notes: 'Base da duração de 28 dias com doxiciclina.',
      evidenceLevel: 'A (consenso)',
    },
  ],
  isPublished: true,
  source: 'seed',
};
