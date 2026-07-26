import type { DiseaseRecord } from '../../types/disease';

export const hipotireoidismoCaninoRecord: DiseaseRecord = {
  id: 'disease-hipotireoidismo-canino',
  slug: 'hipotireoidismo-canino',
  title: 'Hipotireoidismo canino',
  synonyms: [
    'Hipotireoidismo',
    'Tireoidite linfocítica',
    'Atrofia tireoidiana idiopática',
    'Síndrome do eutireoideo doente',
    'Doença não tireoidiana',
  ],
  species: ['dog'],
  category: 'endocrinologia',
  tags: ['Tireoide', 'Levotiroxina', 'T4 livre', 'cTSH', 'NTIS', 'Eutireoideo doente', 'Alopecia'],
  quickSummary:
    'Hipotireoidismo é deficiência de hormônios tireoidianos com sinais clínicos compatíveis, quase sempre por destruição primária da tireoide por tireoidite linfocítica ou atrofia idiopática. O metabolismo desacelera e surgem letargia, ganho de peso sem polifagia, intolerância ao frio, alopecia não pruriginosa, seborreia, piodermite e, menos frequentemente, neuropatia ou mixedema. O maior desafio é diagnóstico: doença sistêmica e vários fármacos reduzem T4 em cães eutireoideos, quadro chamado síndrome da doença não tireoidiana (NTIS, antigo “eutireoideo doente”). T4 total baixo sozinho não confirma hipotireoidismo. A decisão integra clínica, hemograma/bioquímica, T4 total, T4 livre por diálise e cTSH; resultados discordantes pedem revisão de doença, medicamentos e raça ou repetição posterior. Levotiroxina é eficaz e geralmente vitalícia, mas a dose atual deve ser ajustada ao produto, alimento, resposta e monitoramento.',
  quickDecisionStrip: [
    'T4 total baixo sozinho não diagnostica hipotireoidismo.',
    'Paciente sistêmico doente: adie painel tireoidiano se possível e trate a causa da NTIS.',
    'fT4 por diálise baixo + cTSH alto fortalece muito o diagnóstico, mas nenhum teste isolado é perfeito.',
    'cTSH normal ocorre em 20–40% dos cães hipotireóideos em algumas séries.',
    'TgAA indica tireoidite, não função; cão eutireoideo TgAA positivo não deve receber levotiroxina automaticamente.',
    'Levotiroxina: administrar sempre do mesmo modo em relação à comida e monitorar por clínica + T4.',
  ],
  quickSummaryRich: {
    lead:
      'O hipotireoidismo verdadeiro é tratável; o problema é o rótulo errado. T4 cai em quase toda doença importante, com glicocorticoide, fenobarbital e sulfonamida, e naturalmente é mais baixo em algumas raças. Quando um valor baixo vira diagnóstico sem contexto, o cão recebe terapia vitalícia para uma tireoide normal e a doença real fica para trás.',
    leadHighlights: ['rótulo errado', 'T4 cai', 'sem contexto', 'doença real'],
    pillars: [
      {
        title: 'Deficiência hormonal verdadeira',
        body:
          'A maior parte é primária: tireoidite linfocítica destrói folículos ou atrofia idiopática substitui parênquima por gordura.',
        highlights: ['tireoidite linfocítica', 'atrofia idiopática'],
      },
      {
        title: 'NTIS não é hipotireoidismo',
        body:
          'Doença sistêmica reduz TSH, síntese, ligação, conversão e depuração de hormônios como adaptação. Tratar a causa de base é prioritário; levotiroxina não é indicada automaticamente.',
        highlights: ['NTIS não é hipotireoidismo', 'não é recomendado'],
      },
      {
        title: 'Painel é uma probabilidade',
        body:
          'T4 total normal costuma excluir; T4 baixo abre investigação. T4 livre por diálise e TSH canino mudam a probabilidade, mas a clínica continua obrigatória.',
        highlights: ['probabilidade', 'clínica continua obrigatória'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico sem atalhos',
      steps: [
        {
          label: '1. Confirme que há síndrome compatível',
          detail:
            'Letargia, ganho de peso sem polifagia, intolerância ao frio, dermatopatia endócrina, neuropatia e hipercolesterolemia coerentes.',
        },
        {
          label: '2. Procure interferentes',
          detail:
            'Doença sistêmica, glicocorticoide, fenobarbital, sulfonamida, clomipramina, AINE e raça com T4 fisiologicamente baixo.',
        },
        {
          label: '3. Triagem com T4 total',
          detail:
            'Normal torna hipotireoidismo improvável; baixo não confirma e deve ser interpretado com fT4ED e cTSH.',
        },
        {
          label: '4. Confirmação probabilística',
          detail:
            'fT4 por diálise baixo + cTSH alto + clínica forte = alta probabilidade. Discordância pede repetir após recuperação ou aprofundar.',
        },
        {
          label: '5. Teste terapêutico somente selecionado',
          detail:
            'Se testes permanecem inconclusivos e suspeita é alta, documentar sinais/metas, tratar por tempo suficiente e interromper se resposta objetiva não ocorrer.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Reposição e acompanhamento',
      steps: [
        {
          label: 'Início',
          detail:
            'Levotiroxina veterinária com dose baseada no produto; reduzir em cardiopata, idoso frágil ou doença grave.',
        },
        {
          label: '4–8 semanas',
          detail:
            'Avaliar energia, peso, pele e T4 de 4–6 horas após a dose; colher uma amostra imediatamente antes da dose quando a administração for uma vez ao dia ou a resposta for duvidosa.',
        },
        {
          label: 'Ajuste',
          detail:
            'Checar adesão, relação com alimento e produto antes de aumentar dose. Ajustar por clínica e laboratório, não por um número isolado.',
        },
        {
          label: 'Manutenção',
          detail:
            'Após estabilização, reavaliar a cada 6–12 meses e sempre que produto, dieta, dose ou doença concomitante mudar.',
        },
      ],
    },
  },
  etiology: {
    primaria:
      'Tireoidite linfocítica autoimune e atrofia tireoidiana idiopática respondem pela grande maioria dos casos adquiridos. Na tireoidite, linfócitos e plasmócitos destroem folículos; na atrofia, o parênquima é substituído por tecido adiposo e conjuntivo.',
    rara: [
      'Hipotireoidismo secundário por doença hipofisária/deficiência de TSH é raro e pode cursar com cTSH não elevado.',
      'Hipotireoidismo congênito por disgenesia ou disormonogênese causa atraso mental, nanismo desproporcional, retenção de dentes e atraso de ossificação.',
      'Iatrogênico após tireoidectomia, radioiodo, radiação cervical ou fármacos antitireoidianos.',
      'Sulfonamidas potencializadas podem inibir a peroxidase tireoidiana e produzir alterações reversíveis após a suspensão.',
    ],
    tgAA:
      'O anticorpo antitireoglobulina (TgAA) marca tireoidite autoimune em parte dos cães, mas pode ser positivo antes da perda funcional e negativo na doença terminal. Ele indica agressão imunológica contra a tireoide; não mede a capacidade atual de produzir hormônios.',
  },
  epidemiology: {
    perfil:
      'Afeta principalmente cães adultos de meia-idade; os sinais aparecem depois que grande parte da reserva glandular foi perdida. A frequência varia conforme população e critérios diagnósticos, e o sobrediagnóstico é comum.',
    racas:
      'Beagle, Golden Retriever, Dobermann e Dogue Alemão aparecem entre os predispostos na diretriz de Bugbee et al. (2023). Lebréis e algumas raças nórdicas podem ter T4 fisiologicamente baixo e exigem intervalo específico, não presunção de doença.',
    felinos:
      'Hipotireoidismo espontâneo felino é raro; a maioria dos casos é iatrogênica após tratamento de hipertireoidismo. Esta ficha concentra-se no cão.',
  },
  pathogenesisTransmission: {
    eixo: [
      'Perda de tecido tireoidiano reduz T4 e T3 circulantes.',
      'Menor retroalimentação deveria elevar TSH, mas pulsatividade, cronicidade, doença e ensaio fazem cTSH permanecer normal em parte dos casos.',
      'Menor sinal tireoidiano reduz consumo de oxigênio, termogênese, renovação cutânea, lipólise e atividade cardiovascular.',
      'Glicosaminoglicanos acumulam na derme e retêm água, formando mixedema.',
    ],
    ntis:
      'Na síndrome da doença não tireoidiana (NTIS), a tireoide é estruturalmente funcional. Citocinas e alterações do eixo hipotálamo–hipófise, proteínas carreadoras, deiodinação e depuração reduzem T4 e T3 proporcionalmente à gravidade. É um marcador de doença sistêmica, não indicação automática de reposição.',
    transmissao:
      'Não é contagioso. Formas autoimunes e congênitas podem ter predisposição familiar.',
  },
  pathophysiology:
    'Hormônios tireoidianos regulam expressão enzimática, mitocôndrias, receptores adrenérgicos e renovação dos tecidos. Sua falta reduz a taxa metabólica basal e a termogênese, explicando letargia, intolerância ao frio e ganho de peso. Folículos pilosos permanecem em telógeno e a epiderme se renova lentamente, causando alopecia e seborreia. A menor depuração de LDL e a menor atividade lipolítica elevam colesterol e triglicerídeos. O menor estímulo cardíaco reduz frequência e contratilidade; nervos periféricos podem sofrer desmielinização ou alteração axonal. O mixedema resulta do acúmulo de glicosaminoglicanos hidrofílicos na derme.',
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        'Letargia, sonolência e intolerância ao exercício: menor metabolismo e débito cardiovascular.',
        'Ganho de peso sem polifagia: gasto energético cai mais que ingestão.',
        'Busca por calor/intolerância ao frio: menor termogênese.',
      ],
    },
    {
      system: 'dermatologic',
      findings: [
        'Alopecia bilateral não pruriginosa, cauda de rato e falha de repilação: folículo fica em telógeno.',
        'Seborreia, comedões e hiperpigmentação: renovação epidérmica lenta e inflamação crônica.',
        'Piodermite e otite recorrentes: barreira cutânea e imunidade local prejudicadas; prurido costuma vir da infecção/alergia associada, não do hormônio baixo em si.',
        'Fácies trágica/mixedema: glicosaminoglicanos retêm água na derme facial.',
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        'Fraqueza, ataxia, paresia, paralisia facial ou vestibular periférica: neuropatia/miopatia; relação causal deve ser confirmada por resposta e exclusão de diferenciais.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Bradicardia e pulso fraco: menor cronotropismo/inotropismo.',
        'Disfunção sistólica leve pode ocorrer; cardiomiopatia grave isolada exige buscar outra causa.',
      ],
    },
    {
      system: 'hematologic',
      findings: [
        'Anemia normocítica normocrômica não regenerativa leve: menor demanda de oxigênio e estímulo eritropoiético.',
        'Hipercolesterolemia/hipertrigliceridemia: depuração lipídica reduzida.',
      ],
    },
    {
      system: 'critical',
      findings: [
        'Coma mixedematoso: hipotermia, bradicardia, hipoventilação, hiponatremia e alteração do estado mental; é raro e constitui emergência.',
      ],
    },
  ],
  diagnosis: {
    principio:
      'Não existe um padrão ouro simples disponível na rotina. O diagnóstico é clínico-laboratorial integrado. Histopatologia da tireoide não é indicada rotineiramente e a resposta à levotiroxina pode ser inespecífica.',
    testes: {
      kind: 'clinicalTable',
      headers: ['Teste', 'Força', 'Limitação prática'],
      rows: [
        [
          'T4 total (TT4)',
          'Boa triagem para excluir: valor normal geralmente torna hipotireoidismo improvável.',
          'Baixa especificidade quando baixo; cai com NTIS, fármacos e raça. Autoanticorpo anti-T4 pode falsamente elevar.',
        ],
        [
          'T4 livre por diálise (fT4ED)',
          'Menos influenciado por proteínas e autoanticorpos; melhor teste hormonal isolado em estudos.',
          'Doença grave também pode reduzir; método analógico não equivale à diálise.',
        ],
        [
          'cTSH',
          'Alto junto com TT4/fT4 baixos aumenta muito a especificidade (>90% em séries).',
          'Sensibilidade limitada: cerca de 20–40% dos cães hipotireóideos podem apresentar TSH canino dentro do intervalo de referência.',
        ],
        [
          'TgAA',
          'Apoia tireoidite linfocítica.',
          'Não mede função; positivo em eutireoideo e negativo em doença terminal.',
        ],
        [
          'TSH stimulation',
          'Avalia reserva funcional e pode resolver casos difíceis.',
          'Caro, pouco disponível e depende de rhTSH; não é rotina.',
        ],
      ],
    },
    desempenho:
      'Panciera (1997) avaliou 54 cães hipotireóideos e encontrou sensibilidade de 98% e especificidade de 93% para o T4 livre; para o T4 total, os valores foram 89% e 82%. Dixon e Mooney (1999) observaram que combinar T4 livre e TSH canino aumenta a especificidade, mas reduz a sensibilidade. Esses números dependem da população, do método laboratorial e do padrão de referência.',
    aaHaCategorias: [
      'Bugbee et al. (2023), na diretriz da AAHA, propuseram integrar a probabilidade clínica ao painel hormonal: sinais clássicos com T4 total baixo justificam medir T4 livre e TSH canino antes de confirmar e tratar.',
      'Sem sinais clínicos e com T4 total baixo: revisar doença sistêmica, medicamentos e raça; repetir depois, em vez de suplementar por um resultado isolado.',
      'Com sinais possíveis e T4 total normal: procurar outros diagnósticos; se a suspeita continuar forte, T4 livre por diálise, TSH canino e anticorpos anti-T4 podem esclarecer a discordância.',
    ],
    ntis:
      'A síndrome da doença não tireoidiana deve ser considerada quando T4 baixo ocorre durante doença moderada ou grave sem fenótipo clássico. Quanto mais grave a doença, maior a chance de T4 total e até T4 livre baixos. Trate a doença de base e repita o painel após a recuperação; não use levotiroxina apenas para corrigir os números.',
    interferentes:
      'Glicocorticoides, fenobarbital e sulfonamidas são interferentes principais; outros fármacos também podem alterar resultados. O intervalo necessário após a suspensão depende do fármaco, da dose e da duração, podendo chegar a 8–12 semanas para sulfonamidas. Não interrompa anticonvulsivante ou corticoide essencial apenas para testar sem um plano seguro.',
    imagem:
      'Ultrassom tireoidiano pode apoiar atrofia/tireoidite em mãos experientes, mas há sobreposição e não substitui painel. Cintilografia e biópsia ficam para casos raros.',
  },
  treatment: {
    levotiroxina: [
      'Budde e McCluskey (2023), na monografia da levotiroxina do Plumb’s, apresentam dose inicial rotulada total de 0,022 mg/kg/dia por via oral, em uma ou duas tomadas, com ajuste individual. Também descrevem uso extra-bula de 0,01–0,02 mg/kg a cada 12–24 horas e máximo inicial frequente de 0,8 mg por cão a cada 12 horas.',
      'Administre sempre da mesma forma em relação ao alimento. O jejum aumenta e estabiliza a absorção em muitos produtos, mas uma rotina consistente com alimento é melhor do que alternar; qualquer mudança exige novo controle.',
      'Em cardiopata, paciente muito idoso, frágil ou gravemente doente, considere iniciar cerca de 25% abaixo e titular, porque o aumento abrupto da demanda metabólica pode descompensar o paciente.',
      'Não associar liotironina rotineiramente. Falha de conversão T4→T3 é rara; primeiro revisar diagnóstico, produto, adesão, alimento, má absorção e doença concomitante.',
    ],
    resposta: [
      'Energia e alerta costumam melhorar em 1–2 semanas; lipídios e peso, ao longo de semanas; pele e pelagem podem levar 2–4 meses e inicialmente parecer piores pela troca de pelos.',
      'Ausência de resposta objetiva com T4 terapêutico exige reabrir diagnóstico. Dermatite alérgica, demodicose e piodermite podem coexistir.',
    ],
    monitoramento: [
      'Reavaliar 4–8 semanas após início ou ajuste. Colher T4 total 4–6 horas após a dose; em administração uma vez ao dia, considerar também amostra imediatamente antes da dose quando a resposta for duvidosa.',
      'Interpretar alvo pelo método/laboratório e sinais. Não elevar dose apenas para “normalizar” cTSH se o cão está clinicamente bem e TT4 adequado.',
      'Após estabilização: clínica, peso, TT4 e, quando útil, cTSH a cada 6–12 meses.',
      'Tireotoxicose iatrogênica: polifagia com perda de peso, hiperatividade, panting, PU/PD, taquicardia e hipertensão; reduzir/interromper conforme gravidade e medir hormônios.',
    ],
    comaMixedematoso:
      'Emergência com aquecimento passivo cuidadoso, ventilação, correção de glicose e sódio e tratamento do gatilho. Budde e McCluskey (2023) reúnem relatos com levotiroxina intravenosa de 1–9 µg/kg, mediana de 5 µg/kg a cada 12 horas, usando dose menor no cardiopata. Exige internação intensiva e transição oral após estabilização.',
  },
  prevention: {
    primaria:
      'Não há vacina nem prevenção comprovada para tireoidite/atrofia. Evitar reprodução de animais com hipotireoidismo primário familiar e usar programas raciais de TgAA/função com interpretação especializada.',
    iatrogenica:
      'Usar sulfonamidas potencializadas pelo menor tempo eficaz e reconhecer interferência; monitorar pacientes após terapia tireoidiana destrutiva.',
    sobrediagnostico:
      'A prevenção mais importante é evitar diagnóstico em paciente doente ou por TT4 isolado. Documentar sinais e metas antes de qualquer teste terapêutico.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['cardiomiopatia-dilatada-caes-gatos'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-nelson-couto-hypothyroidism',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 48, Disorders of the Thyroid Gland; PDF anexado, pp. 797–815.',
      sourceType: 'Livro-texto',
      notes: 'Inclui seção detalhada de Nonthyroidal Illness Syndrome.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-plumbs-levothyroxine',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023. Levothyroxine, pp. 749–752.',
      sourceType: 'Formulário veterinário',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-aaha-endocrine-2023',
      citationText:
        'Bugbee A, Rucinsky R, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. JAAHA. 2023;59.',
      sourceType: 'Diretriz clínica',
      url: 'https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/',
      evidenceLevel: 'Consenso baseado em evidência',
    },
    {
      id: 'ref-panciera-thyroid-tests',
      citationText:
        'Panciera DL. Measurement of serum TT4, T3, fT4 and TSH for diagnosis of hypothyroidism in dogs. JAVMA. 1997.',
      sourceType: 'Estudo diagnóstico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9394888/',
      notes: 'Desempenho diagnóstico depende do ensaio e população.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-dixon-mooney',
      citationText:
        'Dixon RM, Mooney CT. Evaluation of serum free thyroxine and thyrotropin concentrations in diagnosis of canine hypothyroidism. J Small Anim Pract. 1999.',
      sourceType: 'Estudo diagnóstico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/10088086/',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
