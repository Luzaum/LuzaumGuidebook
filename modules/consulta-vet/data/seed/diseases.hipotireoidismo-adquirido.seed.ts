import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Hipotireoidismo adquirido (cão e gato) — síntese editorial Vetius.
 * AAHA 2023 > Nelson & Couto > Rothrock VIN 2025.
 */
export const hipotireoidismoAdquiridoRecord: DiseaseRecord = {
  id: 'disease-hipotireoidismo-adquirido-caes-gatos',
  slug: 'hipotireoidismo-adquirido-caes-gatos',
  title: 'Hipotireoidismo adquirido (cão e gato)',
  synonyms: [
    'Hipotireoidismo primário',
    'Tireoidite linfocítica',
    'Atrofia tireoidiana idiopática',
    'Síndrome da doença não tireoidiana',
    'NTIS',
    'Eutireoideo doente',
    'Hipotireoidismo iatrogênico felino',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  tags: [
    'Tireoide',
    'Levotiroxina',
    'T4 livre',
    'cTSH',
    'NTIS',
    'TgAA',
    'Alopecia',
    'Coma mixedematoso',
    'Iatrogênico felino',
    'AAHA 2023',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipotireoidismo-adquirido-caes-gatos'],
  quickSummary:
    'Hipotireoidismo adquirido é deficiência de hormônios tireoidianos com sinais compatíveis. Em cães, predomina destruição primária por tireoidite linfocítica ou atrofia idiopática. Em gatos, a maioria é iatrogênica após tratamento de hipertireoidismo (metimazol, I-131, tireoidectomia). T4 total baixo sozinho não diagnóstica: NTIS, fármacos e raça reduzem T4 em eutireoideos. Integrar clínica, TT4, fT4 por diálise (fT4ED) e cTSH; 20–40% dos hipotireóideos podem ter cTSH normal. TgAA marca tireoidite, não função. Cão: levotiroxina 0,02 mg/kg q12h, peso magro se obeso, T4 pós-pílula 4–6 h, reavaliação ~4 semanas. Gato: 0,05–0,10 mg/GATO q24h (não mg/kg); meta T4 ~1,0–2,5 µg/dL; vigiar rim pós-I-131 (Bugbee et al., 2023; Nelson & Couto, 6ª ed.; Rothrock, VIN 2025).',
  quickDecisionStrip: [
    'TT4 baixo ≠ diagnóstico de hipotireoidismo — NTIS e fármacos reduzem T4 em eutireoideos (Bugbee et al., 2023; Nelson & Couto, 6ª ed.).',
    'Paciente sistêmico doente: trate a causa da NTIS antes de rotular hipotireoidismo ou iniciar levotiroxina.',
    'fT4 por diálise (fT4ED) + cTSH elevado + clínica forte aumentam muito a probabilidade (Dixon & Mooney, 1999).',
    '20–40% dos cães hipotireóideos podem apresentar cTSH dentro do intervalo de referência (Bugbee et al., 2023).',
    'TgAA positivo indica tireoidite autoimune — NÃO mede função; eutireoideo TgAA+ não recebe levotiroxina automaticamente (Nelson & Couto, 6ª ed.).',
    'Cão: levotiroxina 0,02 mg/kg PO q12h; obeso — dose pelo peso magro ideal (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
    'Monitorar cão ~4 semanas após início/ajuste; colher TT4 4–6 h após a dose (Plumb\'s, 10ª ed.).',
    'Gato: 0,05–0,10 mg/GATO q24h — NÃO mg/kg; meta T4 ~1,0–2,5 µg/dL (Bugbee et al., 2023; Rothrock, VIN 2025).',
    'Hipotireoidismo felino espontâneo é raro — investigar iatrogenia pós-hipertireoidismo (metimazol, I-131, cirurgia).',
    'Pós-I-131: reavaliar função renal e T4 — hipotireoidismo pode unmask DRC (Cox et al., 2025; Geddes & Aguiar, 2022).',
    'Associação hipotireoidismo–CMD é controversa — Beier et al. (2015) não confirmaram causalidade direta.',
    'SDMA pode antecipar azotemia em hipotireoidismo canino — interpretar com creatinina (Di Paola et al., 2021).',
    'Sinais GI (vômito, diarreia) podem ser manifestação atípica — considerar painel tireoidiano (Gori et al., 2023).',
    'Coma mixedematoso: emergência — aquecimento, ventilação, glicose, sódio; levotiroxina IV titulada (Drobatz & DiBartola, 2019; Plumb\'s, 10ª ed.).',
  ],
  quickSummaryRich: {
    lead:
      'O hipotireoidismo verdadeiro é tratável; o erro caro é o rótulo errado. T4 cai em doença sistêmica, com glicocorticoide, fenobarbital e sulfonamida. Em gatos, a pergunta é frequentemente “foi iatrogênico?” após hipertireoidismo. Tratar bem exige clínica + painel, não um número isolado.',
    leadHighlights: ['rótulo errado', 'NTIS', 'iatrogênico', 'painel'],
    pillars: [
      {
        title: 'Deficiência hormonal primária',
        body:
          'Tireoidite linfocítica e atrofia idiopática destroem folículos em cães; em gatos, destruição iatrogênica após antitireoidiano, I-131 ou cirurgia predomina (Nelson & Couto, 6ª ed.; Bugbee et al., 2023).',
        highlights: ['tireoidite', 'iatrogênico'],
      },
      {
        title: 'NTIS não é hipotireoidismo',
        body:
          'Doença sistêmica reduz T4/T3 como adaptação metabólica. Tratar a causa de base é prioritário; levotiroxina não é indicada automaticamente (Nelson & Couto, 6ª ed.; Lumb & Constable, 2023).',
        highlights: ['NTIS', 'causa de base'],
      },
      {
        title: 'Painel probabilístico',
        body:
          'TT4 normal exclui na maioria; TT4 baixo abre investigação. fT4ED + cTSH + clínica definem probabilidade; TgAA apoia etiologia imune, não função (Bugbee et al., 2023; Panciera, 1997).',
        highlights: ['fT4ED', 'cTSH', 'TgAA'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Confirmar síndrome compatível',
          timing: 'Primeira consulta',
          detail:
            'Letargia, ganho de peso sem polifagia, intolerância ao frio, dermatopatia endócrina, bradicardia, hiperlipidemia; em gato, história de hipertireoidismo tratado (Bugbee et al., 2023; Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Excluir NTIS e interferentes',
          timing: 'Antes de confirmar',
          detail:
            'Doença sistêmica, glicocorticoide, fenobarbital, sulfonamida, clomipramina, AINE, raça com T4 fisiologicamente baixo (Bugbee et al., 2023; Nelson & Couto, 6ª ed.).',
          reassess: 'Adiar painel se possível em paciente gravemente doente; tratar NTIS primeiro.',
        },
        {
          label: 'Triagem TT4',
          timing: 'Após estabilização',
          detail:
            'Normal torna hipotireoidismo improvável; baixo não confirma — prosseguir com fT4ED e cTSH (Panciera, 1997).',
        },
        {
          label: 'Confirmação combinada',
          timing: 'TT4 baixo',
          detail:
            'fT4ED baixo + cTSH alto + clínica = alta probabilidade; discordância pede repetir ou teste terapêutico documentado (Dixon & Mooney, 1999; Bugbee et al., 2023).',
          reassess: 'cTSH normal ocorre em 20–40% — não excluir por TSH isolado.',
        },
        {
          label: 'TgAA (selecionado)',
          timing: 'Etiologia imune',
          detail:
            'Positivo apoia tireoidite linfocítica; não mede função atual nem indica tratamento isolado (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico',
      steps: [
        {
          label: 'Levotiroxina — cão',
          detail:
            '0,02 mg/kg PO q12h; obeso: dose pelo peso magro ideal; cardiopata: iniciar ~25% abaixo (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
          dose: '0,02 mg/kg q12h PO; máximo inicial frequente 0,8 mg/cão q12h.',
          duration: 'Vitalícia na maioria dos casos primários.',
          reassess: 'Administrar sempre da mesma forma em relação ao alimento.',
        },
        {
          label: 'Levotiroxina — gato',
          detail:
            '0,05–0,10 mg/GATO q24h (não mg/kg); meta T4 ~1,0–2,5 µg/dL; evitar hipotireoidismo iatrogênico prolongado (Bugbee et al., 2023; Rothrock, VIN 2025).',
          dose: '0,05–0,10 mg/gato q24h PO.',
          duration: 'Contínua se irreversível pós-I-131/cirurgia.',
          reassess: 'Reavaliar rim e PAS após eutireoidismo (Cox et al., 2025).',
        },
        {
          label: 'Reavaliação ~4 semanas',
          detail:
            'Clínica + TT4 4–6 h pós-dose; pele/pelagem levam 2–4 meses (Plumb\'s, 10ª ed.; Nelson & Couto, 6ª ed.).',
          duration: '4 semanas após início ou ajuste.',
          reassess: 'Energia melhora em 1–2 semanas; não aumentar dose só para normalizar cTSH se clínica OK.',
        },
        {
          label: 'Coma mixedematoso',
          detail:
            'Emergência: aquecimento passivo, ventilação, glicose, correção de sódio; levotiroxina IV 1–9 µg/kg q12h, mediana 5 µg/kg (Drobatz & DiBartola, 2019; Plumb\'s, 10ª ed.).',
          duration: 'Internação intensiva; transição oral após estabilização.',
        },
      ],
    },
  },
  etiology: {
    primaria:
      'Tireoidite linfocítica autoimune e atrofia tireoidiana idiopática respondem pela grande maioria dos casos adquiridos caninos. Na tireoidite, linfócitos destroem folículos; na atrofia, parênquima é substituído por tecido adiposo (Nelson & Couto, 6ª ed.).',
    felinaIatrogenica:
      'Em gatos, hipotireoidismo espontâneo é raro. A maioria é iatrogênica após metimazol/carbimazol prolongado, I-131, tireoidectomia ou dieta y/d exclusiva (Bugbee et al., 2023; Cox et al., 2025).',
    secundaria:
      'Hipotireoidismo secundário por deficiência de TSH é raro; cTSH pode não elevar-se. Sulfonamidas potencializadas inibem peroxidase tireoidiana reversivelmente (Feldman et al.; Nelson & Couto, 6ª ed.).',
    tgAA:
      'Anticorpo antitireoglobulina (TgAA) marca tireoidite autoimune em parte dos cães, mas pode ser positivo antes da perda funcional e negativo na doença terminal. Indica agressão imunológica, não capacidade de produzir hormônios (Nelson & Couto, 6ª ed.; Bugbee et al., 2023).',
  },
  epidemiology: {
    caes:
      'O\'Neill et al. (2022): em 905.553 cães de atenção primária no Reino Unido, prevalência anual de diagnóstico registrado 0,23% (~1 em 400) e incidência 0,04%. Maiores OR vs SRD: Doberman 17,02; Tibetan Terrier 11,25; Boxer 10,44. Idade média ao diagnóstico ~6–7 anos. Golden Retriever, Labrador, English Setter entre raças clássicas (Rothrock, VIN 2025; Bugbee et al., 2023).',
    gatos:
      'Espontâneo raro; iatrogênico crescente com tratamento ampliado de hipertireoidismo. Cox et al. (2025): em gatos pós-I-131, hipotireoidismo não azotêmico suplementado teve mediana de sobrevida ~1.037 dias vs ~768 dias sem suplementação no subgrupo não azotêmico — estudo observacional; monitorar T4, TSH e função renal.',
    cmdControversa:
      'Beier et al. (2015) não encontraram associação causal robusta entre hipotireoidismo e cardiomiopatia dilatada em cães Dobermann — correção de T4 não reverte CMD estabelecida. Tratar hipotireoidismo documentado, mas não assumir CMD secundária.',
  },
  pathogenesisTransmission: {
    eixo: [
      'Perda de tecido tireoidiano reduz T4 e T3 circulantes.',
      'Menor retroalimentação deveria elevar TSH; pulsatilidade, cronicidade e ensaio fazem cTSH normal em 20–40% dos casos (Bugbee et al., 2023).',
      'Menor sinal tireoidiano reduz termogênese, renovação cutânea, lipólise e atividade cardiovascular.',
      'Glicosaminoglicanos acumulam na derme → mixedema.',
    ],
    ntis:
      'Na síndrome da doença não tireoidiana (NTIS), tireoide estruturalmente funcional; citocinas e eixo hipotálamo–hipófise reduzem T4/T3 proporcionalmente à gravidade. Marcador de doença sistêmica, não indicação automática de reposição (Nelson & Couto, 6ª ed.; Lumb & Constable, 2023).',
    transmissao: 'Não é contagioso. Formas autoimunes podem ter predisposição familiar.',
  },
  pathophysiology: {
    notaCaudaRato:
      'Figura clínica “cauda de rato” (alopecia terminal preservada na ponta caudal): padrão clássico de dermatopatia hipotireoidiana canina. Imagem externa não incluída nesta ficha — descrição clínica suficiente para reconhecimento (Nelson & Couto, 6ª ed.; Rothrock, VIN 2025).',
    tabelaCombinacaoDiagnostica: {
      kind: 'clinicalTable' as const,
      title: 'Combinação TT4 / fT4ED / cTSH — interpretação prática',
      headers: ['TT4', 'fT4ED', 'cTSH', 'Interpretação provável'],
      rows: [
        ['Normal', '—', '—', 'Hipotireoidismo improvável (Panciera, 1997)'],
        ['Baixo', 'Baixo', 'Alto', 'Alta probabilidade de hipotireoidismo primário (Dixon & Mooney, 1999)'],
        ['Baixo', 'Baixo', 'Normal', 'Possível hipotireoidismo — 20–40% têm cTSH normal (Bugbee et al., 2023)'],
        ['Baixo', 'Normal', 'Normal', 'Provável NTIS ou interferência — tratar doença de base'],
        ['Baixo', 'Baixo', 'Baixo', 'Considerar hipotireoidismo central (raro) ou NTIS grave'],
        ['Normal', 'Baixo', 'Alto', 'Discordância — repetir, revisar autoanticorpos anti-T4'],
      ],
    },
    evidenciaBeierCMD: {
      kind: 'clinicalTable' as const,
      title: 'Evidência — hipotireoidismo e CMD (Beier et al., 2015)',
      headers: ['Achado', 'Implicação clínica'],
      rows: [
        ['Sem associação causal robusta em Dobermanns', 'Não rotular CMD como secundária a hipotireoidismo sem confirmação'],
        ['Correção de T4 não reverte CMD', 'Tratar hipotireoidismo documentado; CMD exige protocolo cardiológico próprio'],
        ['T4 baixo em doença sistêmica frequente', 'Reforça necessidade de painel, não TT4 isolado'],
      ],
    },
    sdmaRenal:
      'Di Paola et al. (2021): em 24 cães hipotireóideos, SDMA média 13,8 ± 3,1 µg/dL antes vs 11,7 ± 3,5 µg/dL em controles; após levotiroxina 11,83 ± 2,87 µg/dL. Hipotireoidismo pode modificar discretamente marcadores renais — não diagnosticar DRC só por SDMA limítrofe sem reavaliar após eutireoidismo.',
    giGori:
      'Gori et al. (2023): sinais GI em 44% dos cães hipotireóideos vs 24% eutireoideos (31 vs 79); constipação/diarreia frequentes; alterações de vesícula biliar mais comuns; melhora significativa após levotiroxina — apoia associação, mas não prova causalidade universal.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologic',
      findings: [
        {
          finding: 'Alopecia bilateral não pruriginosa, cauda de rato e falha de repilação',
          mechanism: 'Folículos em telógeno por redução do estímulo tireoidiano sobre queratinócitos.',
          clinicalMeaning: 'Padrão simétrico sem prurido; piodermite secundária pode causar prurido (Nelson & Couto, 6ª ed.).',
          priority: 'common',
        },
        {
          finding: 'Seborreia, comedões, hiperpigmentação e fácies mixedematosa',
          mechanism: 'Renovação epidérmica lenta + acúmulo de glicosaminoglicanos hidrofólicos.',
          clinicalMeaning: 'Mixedema facial sugere hipotireoidismo de longa data.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        {
          finding: 'Fraqueza, ataxia, paresia facial/vestibular, polineuropatia',
          mechanism: 'Desmielinização ou alteração axonal periférica; miopatia hipotireoidiana.',
          clinicalMeaning: 'Confirmar resposta à levotiroxina e excluir diferenciais neurológicos (Nelson & Couto, 6ª ed.).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Bradicardia, pulso fraco, ascite rara',
          mechanism: 'Redução de cronotropismo/inotropismo; associação CMD controversa (Beier et al., 2015).',
          clinicalMeaning: 'Bradicardia + pele seca reforçam suspeita; CMD exige eco independente.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          finding: 'SDMA elevado, creatinina limítrofe, PU/PD',
          mechanism: 'Hipotireoidismo reduz TFG; SDMA pode antecipar azotemia (Di Paola et al., 2021).',
          clinicalMeaning: 'Reavaliar rim após eutireoidismo; pós-I-131 felino: unmasking DRC (Cox et al., 2025).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Vômito, diarreia, dismotilidade esofágica',
          mechanism: 'Efeito direto hormonal sobre motilidade GI e metabolismo mucosa (Gori et al., 2023).',
          clinicalMeaning: 'Considerar painel tireoidiano em GI crônico atípico.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'reproductive',
      findings: [
        {
          finding: 'Infertilidade, anestro, libido reduzida, parto complicado',
          mechanism: 'Hormônios tireoidianos modulam eixo reprodutivo e ciclo estral.',
          clinicalMeaning: 'Investigar em reprodutor com falha reprodutiva inexplicada (Nelson & Couto, 6ª ed.).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia, ganho de peso sem polifagia, intolerância ao frio',
          mechanism: 'Queda de termogênese e metabolismo basal.',
          clinicalMeaning: 'Manifestações iniciais frequentes.',
          priority: 'common',
        },
        {
          finding: 'Anemia leve, hipercolesterolemia',
          mechanism: 'Menor demanda eritropoiética e depuração lipídica.',
          clinicalMeaning: 'Dislipidemia + sinais compatíveis apoiam investigação.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'critical',
      findings: [
        {
          finding: 'Coma mixedematoso: hipotermia, bradicardia, hipoventilação, hiponatremia',
          mechanism: 'Depressão central do drive respiratório + metabolismo muito baixo + distúrbios eletrolíticos.',
          clinicalMeaning: 'Emergência rara — estabilização intensiva antes de reposição hormonal plena (Drobatz & DiBartola, 2019).',
          priority: 'emergency',
        },
      ],
    },
  ],
  diagnosis: {
    principio:
      'Diagnóstico clínico-laboratorial integrado. TT4 baixo isolado não confirma. Histopatologia não é rotina (Bugbee et al., 2023; Nelson & Couto, 6ª ed.).',
    tabelaCombinacao: {
      kind: 'clinicalTable' as const,
      title: 'Painel TT4 / fT4ED / cTSH',
      headers: ['Teste', 'Papel', 'Limitação'],
      rows: [
        ['TT4', 'Triagem — normal exclui na maioria', 'Baixa especificidade; NTIS, fármacos, raça'],
        ['fT4ED', 'Melhor teste hormonal isolado', 'Doença grave também reduz; método analógico ≠ diálise'],
        ['cTSH', 'Alto + T4 baixo → especificidade >90%', 'Sensibilidade limitada: 20–40% normais'],
        ['TgAA', 'Marcador tireoidite, não função', 'Positivo em eutireoideo; negativo terminal'],
      ],
    },
    ntis:
      'NTIS: T4 baixo durante doença moderada/grave sem fenótipo clássico. Tratar doença de base e repetir painel após recuperação (Nelson & Couto, 6ª ed.).',
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Clínica + história',
        purpose: 'Definir probabilidade pré-teste.',
        description: 'Sinais compatíveis; em gato, história de hipertireoidismo/I-131/metimazol (Bugbee et al., 2023).',
        interpretation: 'Baixa probabilidade clínica + TT4 baixo → suspeitar NTIS.',
        limitations: 'Sinais inespecíficos isolados não confirmam.',
      },
      {
        stepNumber: 2,
        title: 'TT4 total',
        purpose: 'Triagem.',
        description: 'Exame inicial de rotina (Panciera, 1997).',
        interpretation: 'Normal exclui na maioria; baixo abre painel.',
        limitations: 'Não confirmatório isolado.',
      },
      {
        stepNumber: 3,
        title: 'fT4ED + cTSH',
        purpose: 'Confirmação probabilística.',
        description: 'Quando TT4 baixo e clínica compatível (Dixon & Mooney, 1999).',
        interpretation: 'fT4ED baixo + cTSH alto = alta probabilidade.',
        limitations: 'cTSH normal em 20–40% dos confirmados.',
        isGoldStandard: true,
      },
      {
        stepNumber: 4,
        title: 'TgAA (selecionado)',
        purpose: 'Etiologia imune.',
        description: 'Apoiar tireoidite linfocítica; não mede função (Nelson & Couto, 6ª ed.).',
        interpretation: 'Positivo = agressão imune; negativo não exclui atrofia idiopática.',
        limitations: 'Não guia tratamento isolado.',
      },
    ],
  },
  treatment: {
    levotiroxinaCao: [
      '0,02 mg/kg PO q12h (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
      'Obeso: dose pelo peso magro ideal, não peso atual.',
      'Cardiopata/fragil: iniciar ~25% abaixo e titular.',
      'Administrar sempre da mesma forma em relação ao alimento.',
    ],
    levotiroxinaGato: [
      '0,05–0,10 mg/GATO q24h — NÃO mg/kg (Bugbee et al., 2023; Rothrock, VIN 2025).',
      'Meta T4 ~1,0–2,5 µg/dL; evitar hipotireoidismo iatrogênico prolongado.',
      'Pós-I-131: monitorar T4 e função renal (Cox et al., 2025).',
    ],
    monitoramento: [
      'Reavaliar ~4 semanas após início/ajuste; TT4 4–6 h pós-dose (Plumb\'s, 10ª ed.).',
      'Energia 1–2 semanas; pele/pelagem 2–4 meses.',
      'Manutenção: clínica + TT4 a cada 6–12 meses.',
      'Tireotoxicose iatrogênica: polifagia + perda peso, panting, taquicardia — reduzir dose.',
    ],
    comaMixedematoso: {
      estabilizacao:
        'Aquecimento passivo cuidadoso, ventilação, glicose IV, correção de hiponatremia, tratar gatilho (infecção, fármacos) (Drobatz & DiBartola, 2019).',
      levotiroxinaIV:
        'Levotiroxina IV 1–9 µg/kg q12h, mediana 5 µg/kg; cardiopata: dose menor (Plumb\'s, 10ª ed.).',
      transicao: 'Transição para levotiroxina oral após estabilização clínica.',
    },
  },
  prevention: {
    primaria:
      'Evitar reprodução de cães com hipotireoidismo primário familiar; programas raciais TgAA com interpretação especializada (Bugbee et al., 2023).',
    iatrogenicaFelina:
      'Após I-131/metimazol/cirurgia: monitorar T4 para detectar hipotireoidismo iatrogênico e unmasking renal (Cox et al., 2025).',
    errosComuns: [
      'TT4 baixo = hipotireoidismo confirmado.',
      'Iniciar levotiroxina em paciente NTIS grave sem tratar doença de base.',
      'TgAA positivo = indicar tratamento imediato.',
      'cTSH normal exclui hipotireoidismo.',
      'Gato: dose levotiroxina em mg/kg como cão.',
      'Ignorar função renal pós-I-131.',
      'Assumir CMD secundária a hipotireoidismo sem evidência (Beier et al., 2015).',
      'Teste terapêutico sem documentar sinais/metas prévias.',
      'Aumentar dose só para normalizar cTSH com clínica já adequada.',
      'Confundir alopecia alérgica com dermatopatia endócrina.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'hipotireoidismo-congenito-caes-gatos',
    'hipertireoidismo-felino',
    'cardiomiopatia-dilatada-caes-gatos',
  ],
  relatedMedicationSlugs: ['sulfametoxazol-trimetoprima', 'levotiroxina-sodica'],
  references: [
    { id: 'ref-hypo-aaha-2023', citationText: 'Bugbee A, Rucinsky R, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. JAAHA. 2023;59.', sourceType: 'Diretriz AAHA', url: 'https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/', evidenceLevel: 'A' },
    { id: 'ref-hypo-nelson-2020', citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 48, Disorders of the Thyroid Gland.', sourceType: 'Livro-texto', evidenceLevel: 'Referência clínica' },
    { id: 'ref-hypo-cunningham-2020', citationText: 'Klein BG. Cunningham\'s Textbook of Veterinary Physiology. 6th ed. Elsevier; 2020.', sourceType: 'Livro-texto de fisiologia', evidenceLevel: 'Base fisiológica' },
    { id: 'ref-hypo-plumb-2023', citationText: 'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Levothyroxine.', sourceType: 'Formulário veterinário', evidenceLevel: 'Referência farmacológica' },
    { id: 'ref-hypo-lumb-2023', citationText: 'Lumb WV, Constable PD. Veterinary Medicine: A Textbook of the Diseases of Cattle, Horses, Sheep, Pigs and Goats. 2023.', sourceType: 'Livro-texto', evidenceLevel: 'Referência clínica' },
    { id: 'ref-hypo-rothrock-vin-2025', citationText: 'Rothrock K. Hypothyroidism in dogs and cats — clinical review (VIN, 2025). Paráfrase editorial Vetius.', sourceType: 'Revisão clínica VIN', evidenceLevel: 'Consenso prático' },
    { id: 'ref-hypo-panciera-1997', citationText: 'Panciera DL. Measurement of serum TT4, T3, fT4 and TSH for diagnosis of hypothyroidism in dogs. JAVMA. 1997.', sourceType: 'Estudo diagnóstico', url: 'https://pubmed.ncbi.nlm.nih.gov/9394888/', evidenceLevel: 'B' },
    { id: 'ref-hypo-dixon-1999', citationText: 'Dixon RM, Mooney CT. Evaluation of serum free thyroxine and thyrotropin concentrations in diagnosis of canine hypothyroidism. J Small Anim Pract. 1999.', sourceType: 'Estudo diagnóstico', url: 'https://pubmed.ncbi.nlm.nih.gov/10088086/', evidenceLevel: 'B' },
    { id: 'ref-hypo-oneill-2022', citationText: 'O\'Neill DG, et al. Hypothyroidism in dogs under primary veterinary care in the UK: prevalence and risk factors (VetCompass). Canine Med Genet. 2022.', sourceType: 'Estudo epidemiológico', evidenceLevel: 'B' },
    { id: 'ref-hypo-dipaola-2021', citationText: 'Di Paola AC, et al. SDMA in canine hypothyroidism. J Vet Intern Med. 2021.', sourceType: 'Estudo clínico', evidenceLevel: 'B' },
    { id: 'ref-hypo-gori-2023', citationText: 'Gori E, et al. Gastrointestinal manifestations of canine hypothyroidism. J Vet Intern Med. 2023.', sourceType: 'Estudo clínico', evidenceLevel: 'C' },
    { id: 'ref-hypo-beier-2015', citationText: 'Beier P, et al. Hypothyroidism and dilated cardiomyopathy in Doberman Pinschers. J Vet Intern Med. 2015.', sourceType: 'Estudo clínico', evidenceLevel: 'B' },
    { id: 'ref-hypo-mischke-2010', citationText: 'Mischke R, et al. Thyroid hormone monitoring in dogs. Tierarztl Prax Ausg K Kleintiere Heimtiere. 2010.', sourceType: 'Revisão', evidenceLevel: 'B' },
    { id: 'ref-hypo-cox-2025', citationText: 'Cox S, et al. Renal function and hypothyroidism after I-131 treatment in hyperthyroid cats. J Feline Med Surg. 2025.', sourceType: 'Estudo clínico', evidenceLevel: 'B' },
    { id: 'ref-hypo-corsini-2021', citationText: 'Corsini IU, et al. Canine hypothyroidism: diagnostic approach update. Vet Clin North Am Small Anim Pract. 2021.', sourceType: 'Revisão', evidenceLevel: 'B' },
    { id: 'ref-hypo-drobatz-2019', citationText: 'Drobatz KJ, Hopper K, Rozanski EA, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley Blackwell; 2019.', sourceType: 'Livro-texto de emergência', evidenceLevel: 'Referência clínica' },
    { id: 'ref-hypo-dibartola-2019', citationText: 'DiBartola SP, Willard MD. Fluid, Electrolyte, and Acid-Base Disorders. In: Drobatz KJ, et al. Textbook of Small Animal Emergency Medicine. 2019.', sourceType: 'Capítulo de emergência', evidenceLevel: 'Referência clínica' },
    { id: 'ref-hypo-golinelli-2022', citationText: 'Golinelli S, et al. Congenital hypothyroidism: early treatment outcomes. J Vet Intern Med. 2022.', sourceType: 'Estudo clínico', evidenceLevel: 'B' },
    { id: 'ref-hypo-vanpoucke-2022', citationText: 'Van Poucke M, et al. TPO mutations in feline congenital hypothyroidism. J Vet Intern Med. 2022.', sourceType: 'Estudo genético', evidenceLevel: 'B' },
    { id: 'ref-hypo-sanchez-2024', citationText: 'Sánchez González P, et al. MRI findings in congenital hypothyroid French Bulldog. Vet Radiol Ultrasound. 2024.', sourceType: 'Estudo por imagem', evidenceLevel: 'C' },
    { id: 'ref-hypo-abend-2014', citationText: 'Abend NS, Helfand SC. Iatrogenic hypothyroidism in cats. Compend Contin Educ Vet. 2014.', sourceType: 'Revisão', evidenceLevel: 'C' },
    { id: 'ref-hypo-abitbol-2026', citationText: 'Abitbol O, et al. Thyroglobulin variants in Rottweiler congenital hypothyroidism. J Vet Intern Med. 2026.', sourceType: 'Estudo genético', evidenceLevel: 'B' },
  ],
  isPublished: true,
  source: 'seed',
};
