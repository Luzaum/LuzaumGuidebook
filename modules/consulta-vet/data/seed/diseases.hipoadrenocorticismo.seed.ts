import { DiseaseRecord } from '../../types/disease';

/** Hipoadrenocorticismo (Doença de Addison) canino; texto editorial integrando ACVIM, MSD e Nelson & Couto. */
export const hipoadrenocorticismoAddisonRecord: DiseaseRecord = {
  id: 'disease-hipoadrenocorticismo-addison',
  slug: 'hipoadrenocorticismo-addison',
  title: 'Hipoadrenocorticismo (Doença de Addison)',
  synonyms: [
    'Doença de Addison',
    'Addison canino',
    'Insuficiência adrenal primária',
    'Hypoadrenocorticism',
    'Addisonian crisis',
  ],
  species: ['dog'],
  category: 'endocrinologia',
  tags: [
    'Adrenal',
    'Aldosterona',
    'Cortisol',
    'DOCP',
    'ACTH',
    'Hipercalemia',
    'Hiponatremia',
    'Fludrocortisona',
  ],
  quickSummary:
    'O hipoadrenocorticismo (doença de Addison) é uma síndrome multissistêmica caracterizada pela produção deficiente de hormônios adrenocorticais (glicocorticoides e/ou mineralocorticoides). A forma primária (destruição autoimune de ~90% do córtex adrenal) é a mais comum em cães, afetando tanto o cortisol quanto a aldosterona. A deficiência de aldosterona leva a graves desvios eletrolíticos (hipercalemia, hiponatremia, hipocloratemia) com colapso circulatório, hipovolemia e bradicardia ameaçadora à vida (Crise Addisoniana). A deficiência de cortisol provoca distúrbios gastrointestinais intermitentes, hipoglicemia e incapacidade absoluta de responder ao estresse. O diagnóstico definitivo baseia-se na ausência de resposta no teste de estimulação com ACTH. O tratamento inicial da crise aguda é emergência médica e exige expansão rápida de volume com NaCl 0.9% e Dexametasona, enquanto a manutenção é realizada com DOCP e baixas doses diárias de Prednisona/Prednisolona.',
  quickDecisionStrip: [
    'Cão jovem a meia-idade com vômitos e diarreia intermitentes, letargia profunda, bradicardia injustificada e choque hipovolêmico: pense em Addison.',
    'Relação Sódio:Potássio (Na:K) abaixo de 27 (e principalmente <24) é uma forte pista laboratorial em animais azotêmicos.',
    'Não use prednisolona antes de realizar o teste com ACTH; use Dexametasona na emergência, pois ela não cruza com os ensaios de cortisol.',
    'Cortisol basal > 2,0 µg/dL praticamente descarta a doença; valores menores exigem confirmação com o teste de estimulação com ACTH.',
    'DOCP (injetável a cada 25 dias) substitui com segurança a aldosterona, mas necessita de Prednisona/Prednisolona oral diária como suporte de glicocorticoide.',
  ],
  quickSummaryRich: {
    lead:
      'A doença de Addison é a grande "mimetizadora" da clínica de pequenos animais: simula perfeitamente gastrenterite hemorrágica, insuficiência renal ou doença neuromuscular. A armadilha clássica é declarar falência renal ou cardiopatia (pela bradicardia) sem medir eletrólitos. O diagnóstico depende da confirmação de reserva adrenal nula via teste dinâmico com ACTH; o tratamento de manutenção garante vida normal e excelente prognóstico.',
    leadHighlights: ['mimetizadora', 'eletrólitos', 'ACTH', 'bradicardia', 'Na:K'],
    pillars: [
      {
        title: 'Mecanismo primário',
        body:
          'Destruição imunomediada ou idiopática de todas as zonas do córtex adrenal, levando à perda combinada de aldosterona e cortisol. Formas atípicas podem perder apenas glicocorticoides inicialmente.',
        highlights: ['aldosterona', 'cortisol'],
      },
      {
        title: 'Tríade de emergência',
        body: 'Bradiarritmia marcada (apesar da hipovolemia profunda), colapso circulatório responsivo a fluidoterapia agressiva e distúrbios de eletrólitos (K+ alto, Na+ baixo).',
        highlights: ['bradiarritmia', 'K+ alto', 'Na+ baixo'],
      },
      {
        title: 'Desafio diagnóstico',
        body: 'Excluir outras causas de hipocortisolismo relativo (como suspensão abrupta de corticoterapia ou superdosagem de trilostano/mitotano) antes de rotular como primário espontâneo.',
        highlights: ['hipocortisolismo', 'trilostano', 'mitotano'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (consultório → laboratório)',
      steps: [
        {
          label: '1. Pistas clínicas e triagem de rotina',
          detail:
            'Pacientes com fraqueza muscular, tremores, vômitos/diarreia crônicos e intermitentes, desidratação e bradicardia severa no exame físico.',
        },
        {
          label: '2. Eletrólitos e Na:K',
          detail:
            'Achar hipercalemia e hiponatremia marcantes. Calcular a relação Sódio/Potássio: valores < 27 acendem o alerta; < 24 são altamente sugestivos no cão azotêmico.',
        },
        {
          label: '3. Cortisol basal como triagem',
          detail:
            'Colher sangue para cortisol basal. Se > 2,0 µg/dL, o diagnóstico é descartado com >99% de confiança. Se < 2,0 µg/dL, o teste com ACTH torna-se obrigatório.',
        },
        {
          label: '4. Teste de estimulação com ACTH',
          detail:
            'Padrão ouro: dosar cortisol pré e 1 hora pós-aplicação de ACTH sintético (Cosintropina 5 µg/kg IV/IM ou 250 µg/cão). Cortisol pós-ACTH < 2,0 µg/dL (normalmente < 1,0 µg/dL) é diagnóstico.',
        },
        {
          label: '5. Diferenciação etiológica',
          detail:
            'Ultrassonografia abdominal revelando adrenais bilaterais atróficas/minúsculas. Avaliar histórico de uso recente de glicocorticoides.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico (emergência e manutenção)',
      steps: [
        {
          label: 'Fase 1: Crise Addisoniana (Emergência)',
          detail:
            'Expansão rápida com NaCl 0.9% (ou Ringer Lactato com cautela) a 20–40 mL/kg nas primeiras 1–2h. Corrigir hipercalemia e fornecer suporte de glicocorticoide imediato.',
        },
        {
          label: 'Fase 2: Escolha do Glicocorticoide emergencial',
          detail:
            'Dexametasona (0.1–0.2 mg/kg IV) preferível por não cruzar com os ensaios analíticos de cortisol, permitindo realizar o teste de ACTH após estabilização.',
        },
        {
          label: 'Fase 3: Manutenção Mineralocorticoide',
          detail:
            'DOCP (Pivalato de Desoxacorticosterona) 2,2 mg/kg IM/SC a cada 25–30 dias (clinicamente 1.1–1.5 mg/kg é muito comum e eficaz), ou Fludrocortisone oral diário.',
        },
        {
          label: 'Fase 4: Manutenção Glicocorticoide',
          detail:
            'Todos os animais tratados com DOCP exigem suplementação diária com Prednisona ou Prednisolona (0.1–0.2 mg/kg/dia VO). Ajustar a dose para o dobro em situações de estresse (viagens, banho, cirurgias).',
        },
        {
          label: 'Fase 5: Monitoramento contínuo',
          detail:
            'Dosar eletrólitos (Na e K) no dia 14 (pico de ação do DOCP) e no dia 25 (duração de intervalo) após a primeira dose; ajustar posologia baseado nestes dados.',
        },
      ],
    },
  },
  etiology: {
    visaoGeral:
      'A doença de Addison primária resulta da destruição progressiva imunomediada (adrenalite linfocítica) de todas as três zonas do córtex adrenal. Cerca de 90% da massa cortical precisa ser perdida antes que os sinais clínicos de deficiência hormonal fiquem evidentes.',
    fatores: [
      'Destruição autoimune primária (adrenalite autoimune): causa de base na imensa maioria dos casos de aparecimento espontâneo.',
      'Atrofia adrenal idiopática bilateral: perda generalizada de células corticais com substituição fibrosa.',
      'Iatrogenia: superdosagem proposital ou acidental de fármacos adrenolíticos (mitotano) ou inibidores enzimáticos (trilostano).',
      'Causas secundárias: tumores hipofisários ou hipotalâmicos bloqueando a secreção de ACTH (rara; afeta somente a secreção de cortisol, mantendo a aldosterona normal).',
      'Desmame abrupto de terapia prolongada com corticoides exógenos: atrofia por desuso da adrenal cortical, provocando crise de insuficiência adrenal aguda.',
    ],
  },
  epidemiology: {
    especiePrincipal:
      'Cão — afeta tipicamente animais jovens a de meia-idade (mediana de 4 anos; faixas comuns de 1 a 7 anos). Fêmeas inteiras ou castradas representam cerca de 60-70% dos casos espontâneos na maioria das casuísticas.',
    notaFelinos:
      'O hipoadrenocorticismo felino é considerado uma entidade extremamente rara na rotina de pequenos animais. A clínica costuma destacar letargia, inapetência crônica, desidratação e azotemia, porém a baixa suspeita diagnóstica na espécie felina muitas vezes atrasa a investigação laboratorial dinâmica.',
    breedPredisposition:
      'Predisposição racial marcada em Doberman Pinscher, Standard Poodle, Great Dane, West Highland White Terrier, Bearded Collie, Cão d\'Água Português, e Nova Scotia Duck Tolling Retriever. Nesses cães, a base hereditária/genética é fortemente considerada.',
  },
  pathogenesisTransmission: {
    patogenese: [
      'Perda de aldosterona (zona glomerulosa): impede a reabsorção tubular renal de sódio e cloro, e a excreção de potássio e hidrogênio.',
      'Resulta em perda maciça de água urinária por arraste osmótico: desidratação crônica profunda, hipovolemia, queda do débito cardíaco, hipotensão severa e azotemia pré-renal progressiva.',
      'A retenção de potássio (hipercalemia) e íons hidrogênio causa acidose metabólica moderada a grave e afeta a condução elétrica miocárdica (bloqueios, bradicardia).',
      'Perda de cortisol (zonas fasciculada e reticular): compromete o tônus vascular, reduz a gliconeogênese (hipoglicemia severa em filhotes e cães toy), enfraquece a barreira mucosa intestinal (gerando erosão, hemorragia intestinal difusa, vômito e diarreia) e deixa o animal suscetível ao colapso absoluto frente a estressores mínimos.',
    ],
    transmissao:
      'Não se trata de uma doença contagiosa ou infecciosa de transmissão horizontal; reflete puramente um processo autoimune de predisposição genética individual ou uma consequência iatrogênica medicamentosa.',
  },
  pathophysiology:
    'A deficiência hormonal crônica afeta todo o metabolismo. Na ausência de aldosterona, o rim perde o controle de sódio e potássio, levando a choque hipovolêmico e desidratação profunda. A hipercalemia deprime a despolarização das fibras miocárdicas, causando bradicardia atrial e prolongamento do intervalo PR, que evolui para parada sinusal na crise grave. Sem o cortisol, o cão perde a integridade endotelial gastrointestinal e entra em anorexia marcada, inabilidade absoluta de manter a homeostase de glicose e colapso pressórico sob estresse.',
  clinicalSignsPathophysiology: [
    {
      system: 'renal',
      findings: [
        'Poliúria e polidipsia iniciais compensatórias; anúria/oligúria na fase terminal de choque hipovolêmico profundo.',
        'Azotemia pré-renal severa decorrente da hipoperfusão glomerular; densidade urinária frequentemente baixa/isostenúrica (1,008 a 1,020) que pode mimetizar nefropatia primária crônica.',
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        'Vômitos e diarreias aquosas ou hemorrágicas severas (por erosão da mucosa secundária à falta de cortisol).',
        'Inapetência flutuante e dor abdominal inespecífica que costuma melhorar temporariamente com fluidoterapia inespecífica.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Bradicardia marcada (frequência cardíaca de 50–70 bpm em cães em choque, onde se esperaria taquicardia compensatória).',
        'Pulso femoral extremamente fraco ou filiforme, mucosas pálidas e tempo de preenchimento capilar prolongado.',
        'Hipotensão arterial sistólica severa (< 90 mmHg) secundária à hipovolemia e perda do tônus induzido por cortisol.',
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        'Letargia profunda, fraqueza muscular episódica crônica ou colapso repentino após excitação/estresse.',
        'Tremores musculares generalizados intermitentes.',
      ],
    },
  ],
  diagnosis: {
    figuraFisiopatologiaCrise: {
      kind: 'clinicalFigure' as const,
      src: '/consulta-vet/clinical-guides/addison-clinical.png',
      alt: 'Infográfico Clínico da Crise Addisoniana: representação visual da desregulação eletrolítica, hipercalemia, hiponatremia, bradicardia secundária, colapso circulatório e hipovolemia em cães com Hipoadrenocorticismo primário.',
      caption:
        'Fisiopatologia da Crise Addisoniana: A perda bilateral de córtex adrenal (autoimune) resulta em deficiência de aldosterona e cortisol. A falta de aldosterona impede a reabsorção renal de sódio (hiponatremia) e excreção de potássio (hipercalemia), promovendo desidratação grave, hipovolemia, choque e bradicardia severa.',
    },
    cmeSuspeitaClinica:
      'Qualquer cão azotêmico com relação sódio:potássio baixa (< 27) e bradicardia sinusal deve ser considerado addisoniano até que se prove o contrário. Lembrar que a ausência de desvios eletrolíticos não exclui a forma "atípica" (deficiência apenas de glicocorticoides).',
    cmeTabelaFasesSinaisLab: {
      kind: 'clinicalTable' as const,
      headers: ['Marcador', 'Comportamento no Addison', 'Significado clínico / Mecanismo'],
      rows: [
        [
          'Potássio (K+)',
          'Elevado (Hipercalemia > 5.5 mEq/L; frequentemente > 7.0 mEq/L)',
          'Falta de excreção tubular distal por ausência de aldosterona. Causa bradicardia e bloqueios.',
        ],
        [
          'Sódio (Na+)',
          'Diminuído (Hiponatremia < 140 mEq/L)',
          'Perda urinária maciça por incapacidade de reabsorção tubular renal.',
        ],
        [
          'Relação Na:K',
          'Baixa (< 27 de triagem; < 24 muito específica)',
          'Cálculo matemático simples. Muito útil para diferenciar de outras gastroenterites.',
        ],
        [
          'Glicose',
          'Diminuída (Hipoglicemia leve a grave)',
          'Falta de cortisol reduz a gliconeogênese e aumenta a sensibilidade tecidual à insulina.',
        ],
        [
          'Hemograma',
          'Ausência de leucograma de estresse em animal doente ("leucograma reverso")',
          'Linfocitose e eosinofilia na presença de doença grave (cortisol alto deveria provocar eosinopenia e linfopenia).',
        ],
      ],
    },
    cmeSorologiaInterpretacao:
      'Cortisol basal como teste de exclusão (screening): se medido em animal sem glicocorticoides prévios e o resultado for maior que 2,0 µg/dL, a doença de Addison pode ser descartada com extrema segurança. Valores menores que 2,0 µg/dL necessitam obrigatoriamente do teste de estimulação com ACTH para confirmação diagnóstica.',
    cmePcrSangueMedula:
      'Teste de estimulação com ACTH: colher sangue antes, injetar Cosintropina (5 µg/kg IV ou IM; máximo 250 µg por cão) e colher nova amostra 1 hora após. A incapacidade absoluta do córtex adrenal em responder ao estímulo (cortisol pós-ACTH < 2.0 µg/dL, tipicamente indetectável ou < 1.0 µg/dL) sela o diagnóstico de hipoadrenocorticismo.',
  },
  treatment: {
    ordemDePrioridade: [
      '1) Tratar a Crise Addisoniana aguda: expansão agressiva de volume com NaCl 0.9% para restabelecer a perfusão tecidual e reduzir a hipercalemia por diluição e excreção.',
      '2) Suporte de glicocorticoide imediato na emergência: utilizar Dexametasona IV para não interferir nos ensaios de dosagem de cortisol.',
      '3) Corrigir hipercalemia severa ameaçadora se a fluidoterapia isolada falhar: utilizar Gluconato de Cálcio a 10% para proteção miocárdica e/ou insulina com dextrose.',
      '4) Iniciar terapia mineralocorticoide de manutenção após estabilização hemodinâmica do paciente.',
      '5) Associar terapia glicocorticoide oral crônica diária de manutenção.',
      '6) Monitorar eletrólitos séricos nos dias 14 e 25 pós-primeira aplicação de DOCP para ajuste fino posológico.',
    ],
    monitoramento: [
      'Sódio e Potássio aos 14 dias: avalia o pico de ação do DOCP. Se o potássio estiver alto, a dose de DOCP está baixa. Se estiver muito baixo, a dose está excessiva.',
      'Sódio e Potássio aos 25 dias: avalia a duração do efeito do DOCP. Se o potássio subiu precocemente, o intervalo deve ser encurtado (ex: 21–23 dias). Se continuar normal-baixo, o intervalo pode ser estendido (ex: 28–30 dias).',
      'Função renal (Ureia e Creatinina): observar a resolução completa da azotemia pré-renal após hidratação adequada.',
      'Sinais clínicos gastrointestinais: letargia, diarreia e vômitos devem desaparecer em 24-48h de manutenção.',
    ],
    cmeDoxiciclinaPrimeiraLinha:
      'Suporte emergencial: Fluidoterapia agressiva com Cloreto de Sódio 0,9% (20–40 mL/kg nas primeiras 1 a 2 horas, repetindo conforme monitorização pressórica e cardíaca). O Ringer Lactato pode ser considerado com cautela; embora contenha potássio (4 mEq/L), essa concentração é inferior à do sangue do paciente addisoniano e o lactato atua como tampão da acidose metabólica.',
    cmeTabelaAntimicrobianos: {
      kind: 'clinicalTable' as const,
      headers: ['Fármaco / Medida', 'Posologia na emergência / manutenção', 'Papel clínico e observações obrigatórias'],
      rows: [
        [
          'NaCl 0.9% (Fluidos)',
          '20–40 mL/kg IV em 1–2 horas (choque); depois 2–4 mL/kg/h após estabilizar.',
          'Expansão de volume, diluição do potássio plasmático e melhora da taxa de filtração glomerular renal.',
        ],
        [
          'Dexametasona (Fosfato)',
          '0,1–0,2 mg/kg IV ou IM dose única na crise.',
          'Glicocorticoide de escolha na crise; não interfere no ensaio de cortisol do teste de ACTH. Não tem efeito mineralocorticoide.',
        ],
        [
          'DOCP (Pivalato de Desoxacorticosterona)',
          '1,1–2,2 mg/kg SC ou IM a cada 25–30 dias.',
          'Substituição de mineralocorticoide puro (longa ação). Sem efeito de glicocorticoide. Ajustar posologia via eletrólitos séricos.',
        ],
        [
          'Fludrocortisona (Acetato)',
          '0,01–0,02 mg/kg/dia VO (dividido BID ou SID).',
          'Alternativa oral diária. Possui efeito duplo (mineralo e glicocorticoide). Requer monitoramento mais frequente; eficácia menos estável em alguns cães.',
        ],
        [
          'Prednisona / Prednisolona',
          '0,1–0,2 mg/kg/dia VO diário na manutenção.',
          'Suplementação diária essencial se o animal recebe DOCP. Ajustar dose para o dobro/triplo sob estresse físico ou psicológico.',
        ],
        [
          'Gluconato de Cálcio 10%',
          '0,5–1,0 mL/kg IV lento (10–15 minutos) com monitoramento eletrocardiográfico constante.',
          'Cardioprotetor emergencial contra hipercalemia grave (> 8.0 mEq/L). Estabiliza o potencial de membrana miocárdica sem reduzir o potássio.',
        ],
      ],
    },
    cmeSuporteTransfusaoFluidos:
      'Manejo de Hipercalemia Severa Refratária: além da fluidoterapia e gluconato de cálcio, pode-se usar Dextrose 5% (1–2 mL/kg) combinada com Insulina Regular (0,25–0,5 UI/kg IV) para forçar o potássio de volta ao ambiente intracelular. Monitorar rigorosamente a glicemia capilar para evitar hipocortisolismo com hipoglicemia iatrogênica.',
    cmeMedulaDeprimida:
      'Suporte a longo prazo e estresse: tutores devem ser instruídos sobre a incapacidade fisiológica de resposta ao estresse. Viagens, consultas veterinárias, banhos ou doenças concomitantes exigem aumento temporário da dose de Prednisona/Prednisolona de manutenção (ex: 2x a dose normal por 2–3 dias).',
  },
  prevention:
    'A doença primária espontânea é autoimune e não tem prevenção vacinal ou ambiental. Para evitar o Addison iatrogênico secundário, nunca suspenda de forma abrupta corticoides em cães sob terapia crônica prolongada — elabore sempre um desmame gradual monitorado. Em cães sob tratamento para Cushing (trilostano ou mitotano), realize monitoramento periódico com testes bioquímicos e clínicos para prevenir superdosagem.',
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    {
      id: 'ref-nelson-couto-addison-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Cap. 50 — Disorders of the Adrenal Gland.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Fisiopatologia da crise, Na:K, testes diagnósticos e protocolos com DOCP.',
      evidenceLevel: 'Consenso editorial',
    },
    {
      id: 'ref-behrend-adrenal-2013',
      citationText:
        'Behrend EN et al. Diagnosis of spontaneous canine hyperadrenocorticism: 2012 ACVIM Consensus Statement. Journal of Veterinary Internal Medicine, 2013 (seção de monitorização e atrofia).',
      sourceType: 'Consenso ACVIM',
      url: null,
      notes: 'Nota sobre dosagem de ACTH e adrenais.',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-plumb-addison-2023',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023 — Desoxycorticosterone Pivalate, Fludrocortisone, Dexamethasone.',
      sourceType: 'Formulário',
      url: null,
      notes: 'Protocolos de dose emergencial e de manutenção crônica.',
      evidenceLevel: 'A — referência prática',
    },
  ],
  isPublished: true,
  source: 'seed',
};
