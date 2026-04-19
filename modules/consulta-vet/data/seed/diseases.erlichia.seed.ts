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
    'A erliquiose monocítica canina (CME) é riquetsiose sistêmica transmitida sobretudo pelo carrapato marrom Rhipicephalus sanguineus: Ehrlichia canis infecta monócitos, replica no sistema fagocítico mononuclear e evolui em três grandes fases — aguda (febre, linfadenomegalia, trombocitopenia marcada), subclínica (animal aparentemente saudável com laboratório oculto ou sorologia/PCR positivas) e crônica (pancitopenia, hemorragias, proteinúria, uveíte, poliartrite, sinais neurológicos). A trombocitopenia é o achado hematológico mais lembrado, mas o sangramento pode ser desproporcional à contagem por vasculite, disfunção plaquetária e hiperglobulinemia. O diagnóstico não se resume a um exame: integra contexto epidemiológico, hemograma seriado, visualização de mórulas (quando presente), sorologia com interpretação temporal e PCR em sangue antes do antibiótico. A doxiciclina 10 mg/kg SID VO por pelo menos 28 dias é tratamento de primeira linha com base em consenso ACVIM; cursos curtos podem melhorar a clínica sem eliminar o risco de persistência e transmissão vetorial. Suporte transfusional, controle de dor hemorrágica e triagem de doadores (sorologia e PCR) são medidas de segurança essenciais.',
  quickDecisionStrip: [
    'Cão com carrapato (ou histórico) + trombocitopenia: pense forte em erliquiose.',
    'Agudo: febre, apatia, anorexia, linfadenomegalia; crônico: pancitopenia, hemorragia, uveíte, proteinúria.',
    'Mórulas no esfregaco ajudam quando presentes, mas sensibilidade é baixa.',
    'PCR documenta infecção ativa; colher antes do antibiótico; pode negativar após terapia.',
    'Doxiciclina 10 mg/kg SID PO por ≥28 dias é a base; reavaliar em ~7 dias se não houver melhora clínica.',
  ],
  quickSummaryRich: {
    lead:
      'CME é doença do tempo: na primeira semana você pode ter PCR positiva e sorologia ainda negativa; meses depois, sorologia alta com PCR negativa não prova necessariamente cura sem contexto. O carrapato é o elo epidemiológico, mas transfusão e coinfecções mudam o roteiro terapêutico. O tratamento com doxiciclina é altamente eficaz na maioria dos agudos — a armadilha é parar cedo ou ignorar pancitopenia crônica que precisa de meses para remontar medula.',
    leadHighlights: ['fases', '28 dias', 'PCR', 'carrapato', 'pancitopenia'],
    pillars: [
      {
        title: 'Vetor e sangue',
        body:
          'R. sanguineus permanece o vetor clássico; ausência de carrapato no exame não exclui doença. Doadores devem ser PCR e sorologia negativos quando o banco adota esse padrão — erliquiose é transfusível.',
        highlights: ['transfusão', 'doador'],
      },
      {
        title: 'Plaquetas e sangramento',
        body:
          'Epistaxe com plaquetas “não tão baixas” é pista de vasculite ou disfunção plaquetária; não complacência só com contagem.',
        highlights: ['epistaxe', 'hiperglobulinemia'],
      },
      {
        title: 'Coinfecções',
        body:
          'Babesia, Anaplasma, Bartonella compartilham vetor ou geograficamente sobrepõem-se — se não melhorar como esperado, amplie painel molecular e revise carrapaticida.',
        highlights: ['Babesia', 'Anaplasma'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (consultório → laboratório)',
      steps: [
        {
          label: '1. Pré-teste probabilístico',
          detail:
            'Cão de área endêmica com febre, linfadenomegalia e plaquetas baixas = CME alta na lista; pancitopenia com hiperglobulinemia puxa fase crônica.',
        },
        {
          label: '2. Hemograma e esfregaco',
          detail:
            'Trombocitopenia é quase universal no agudo; mórulas em monócitos confirmam quando vistas — sensibilidade insuficiente para exclusão.',
        },
        {
          label: '3. Sorologia com calendário',
          detail:
            'IFAT/ELISA/rápidos: falso-negativo precoce; comparar títulos em 2–4 semanas se suspeita alta. Título persistente não igual a infecção ativa isolada.',
        },
        {
          label: '4. PCR pré-tratamento',
          detail:
            'Colher EDTA antes da primeira dose de doxiciclina quando possível; negativa não exclui se antibiótico prévio ou baixa carga.',
        },
        {
          label: '5. Integração e estágio',
          detail:
            'Classificar agudo vs subclínico vs crônico orienta prognóstico (medula deprimida recupera lentamente) e necessidade de suporte.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento, suporte e armadilhas',
      steps: [
        {
          label: 'Antibiótico de base',
          detail:
            'Doxiciclina 10 mg/kg SID VO ≥28 dias (ou 5 mg/kg BID); minociclina se indisponível; imidocarb reservado a protocolos específicos.',
        },
        {
          label: 'Reavaliação precoce',
          detail:
            'Febre e apetite costumam responder em 24–72 h; ausência de melhora em ~7 dias: revisite diagnóstico, dose e coinfecção.',
        },
        {
          label: 'Hemorragia e anemia',
          detail:
            'Transfusão quando indicado; fluidos com cautela se risco de sobrecarga ou proteinúria; antifibrinolíticos não substituem controle da infecção.',
        },
        {
          label: 'Corticoide',
          detail:
            'Prednisona curta só com IMHA/ITP dominante documentada — não “empacotar” todo erliquiose com esteroide.',
        },
        {
          label: 'Prevenção recidiva',
          detail:
            'Carrapaticida contínuo no paciente e contatos caninos; educação sobre persistência sorológica.',
        },
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
    'Fisiopatologia por fases: (1) Agudo (1–3 semanas pós-infecção): comportamento de riquetsiose com vasculite sistêmica — febre, anorexia, perda de peso, linfadenomegalia, hemorragias leves, serosidade ocular/nasal, trombocitopenia; carrapatos frequentemente evidentes (Merck; Nelson). (2) Subclínico: sem sinais evidentes, mas pode haver trombocitopenia discreta, hiperglobulinemia, neutropenia, linfocitose ou monocitose, sorologia/PCR positivas — pode prolongar-se. (3) Crônico: pancitopenia, palidez, emagrecimento, epistaxe, hemorragias retinianas, uveíte, esplenomegalia, proteinúria, glomerulonefrite, eventual neurológico/articular — mistura de falência medular, imunocomplexos e inflamação persistente.\n\n' +
    'Dica de estudo: decore a tríade temporal (agudo → subclínico → crônico) e ligue cada fase ao mecanismo dominante (vasculite/plaquetas → soroconversão discreta → pancitopenia/imunocomplexos).',
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
    ordemDePrioridade: [
      '1) Confirmar ou tratar empiricamente com alta suspeita + hemograma compatível — atrasar doxiciclina em agudo febril típico pode ser pior que iniciar e integrar exames depois.',
      '2) Doxiciclina 28 dias mínimo; explicar ao tutor que cursos curtos são biologicamente insuficientes para eliminação confiável.',
      '3) Hospitalizar se hemorragia ativa, anemia profunda ou necessidade de transfusão; estabilizar antes de alta ambulatorial precipitada.',
      '4) Repetir hemograma durante e após terapia — pancitopenia crônica pode exiguir semanas de observação.',
      '5) Carrapaticida e revisão ambiental; triagem de doadores se o animal participa de banco.',
    ],
    monitoramento: [
      'Plaquetas e hematócrito aos 7–14 dias e ao fim do tratamento.',
      'Proteinúria e creatinina se quadro prolongado ou uso de AINE prévio.',
      'Sinais oculares e articulares no crônico após controle da infecção.',
      'Recaída clínica: novo PCR/sorologia conforme protocolo.',
    ],
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
