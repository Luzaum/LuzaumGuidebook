import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Síndrome de Cushing canina — síntese editorial Vetius.
 * ALIVE 2025 > AAHA/Behrend 2022–2023 > Nelson & Couto.
 */
export const sindromeCushingCaesRecord: DiseaseRecord = {
  id: 'disease-sindrome-cushing-caes',
  slug: 'sindrome-cushing-caes',
  title: 'Síndrome de Cushing — Cão',
  synonyms: [
    'Hiperadrenocorticismo',
    'HAC',
    'Hipercortisolismo',
    'PDH',
    'ADH',
    'Hyperadrenocorticism',
    'Cushingoid',
    'Doença de Cushing canina',
  ],
  species: ['dog'],
  category: 'endocrinologia',
  tags: [
    'Cortisol',
    'PDH',
    'ADH',
    'Trilostano',
    'LDDST',
    'ACTHST',
    'PU/PD',
    'ALIVE 2025',
    'AAHA 2023',
    'ALP',
    'Calcinose cutis',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-cushing-caes'],
  quickSummary:
    'Síndrome de Cushing canina: exposição crônica a cortisol em excesso por PDH (~80–85%), ADH (~15–20%), iatrogênia, ACTH ectópico ou receptores aberrantes. Diagnóstico exige ≥2 sinais clínicos + teste confirmatório (LDDST 0,01 mg/kg IV em cão estável; ACTHST se iatrogênia). Tratamento médico de rotina: trilostano 1 mg/kg q12h ou 2 mg/kg q24h com alimento; clínica guia ajuste. Mitotano é alternativa especializada. Hipofisectomia (Tanaka et al., 2025) e adrenalectomia (van Bokhorst et al., 2023) em casos selecionados (Niessen et al., 2025; Bugbee et al., 2023).',
  quickDecisionStrip: [
    'Fosfatase alcalina (ALP) elevada ≠ Cushing — não triar só por enzima hepática (Bugbee et al., 2023; Niessen et al., 2025).',
    'Solicitar teste endócrino apenas com ≥2 sinais clínicos compatíveis (AAHA/Behrend, 2022).',
    'Cão estável espontâneo: LDDST 0,01 mg/kg IV é triagem preferencial (Behrend, VIN 2022; Bugbee et al., 2023).',
    'Suspeita de iatrogênia ou comorbidade grave: ACTHST é o padrão-ouro para corticoide exógeno (Behrend, VIN 2022).',
    'UCCR: excelente para EXCLUIR, não para CONFIRMAR — urina domiciliar 2 dias após consulta (Behrend, VIN 2022).',
    'Cortisol basal NÃO é exame de triagem — baixa sensibilidade e especificidade (Bugbee et al., 2023).',
    '~35% dos PDH NÃO suprimem no LDDST (escape) — ausência de supressão não confirma ADH isoladamente (Behrend, VIN 2022).',
    'ACTHST falso-negativo até ~41% em ADH — não descarta hiperadrenocorticismo espontâneo (Bugbee et al., 2023).',
    'Washout glicocorticoide 2–4 semanas antes de testar espontâneo quando iatrogênia é possível (Behrend, VIN 2022).',
    'eACTH: plasma resfriado, centrifugar e congelar imediatamente — ACTH baixo favorece ADH (Bugbee et al., 2023).',
    'Tamanho da massa adrenal ≠ malignidade — carcinoma pode ser pequeno; adenoma pode ser grande (van Bokhorst et al., 2023).',
    'Trilostano: 1 mg/kg q12h OU 2 mg/kg q24h COM alimento — sinais clínicos guiam ajuste, não número isolado (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
    'NÃO aumentar trilostano automaticamente aos 14 dias se clínica já melhorou (BSAVA trilostane guidance; Macfarlane et al.).',
    'ACTHST monitoramento: 1 mcg/kg IV, cortisol 3–5 h pós-pílula — NÃO é teste diagnóstico inicial (Bugbee et al., 2023).',
    'Cortisol pré-pílula é auxiliar, não universal — não substitui clínica + ACTHST seriado (Macfarlane et al.).',
    'Red flags para suspender trilostano: anorexia, vômito, letargia, diarreia, colapso — risco de hipoadrenocorticismo iatrogênico (Plumb\'s, 10ª ed.).',
    'Mitotano é alternativa especializada, NÃO primeira linha de rotina (Bugbee et al., 2023).',
    'Selegilina e cetoconazol NÃO são tratamento de rotina atual (Bugbee et al., 2023).',
  ],
  quickSummaryRich: {
    lead:
      'Excesso crônico de cortisol com apresentação multissistêmica. ALIVE padroniza terminologia: título principal é Síndrome de Cushing; hiperadrenocorticismo é sinônimo de busca. O erro caro é testar sem clínica ou tratar sem diferenciar PDH, ADH e iatrogênia.',
    leadHighlights: ['PDH', 'ADH', 'LDDST', 'trilostano', 'ALIVE'],
    pillars: [
      {
        title: 'Classificação ALIVE',
        body:
          'PDH 80–85%, ADH 15–20%, iatrogênico, subdiagnóstico, ACTH ectópico e receptores aberrantes. Evitar rótulo “HAC atípico” — usar terminologia ALIVE (Niessen et al., 2025).',
        highlights: ['PDH', 'ADH', 'subdiagnóstico'],
      },
      {
        title: 'Triagem inteligente',
        body:
          'LDDST 0,01 mg/kg IV em cão estável; UCCR para excluir; ACTHST se iatrogênia; cortisol basal não tria (Bugbee et al., 2023; Behrend, VIN 2022).',
        highlights: ['LDDST', 'UCCR', 'ACTHST'],
      },
      {
        title: 'Tratamento guiado por clínica',
        body:
          'Trilostano com alimento; monitorar 10–14 d, 30 d, 90 d e q3–6 mo; ACTHST 3–5 h pós-dose só para monitoramento (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
        highlights: ['trilostano', 'clínica', 'monitoramento'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo diagnóstico',
      steps: [
        {
          label: 'Confirmar indicação clínica',
          timing: 'Primeira consulta',
          detail:
            '≥2 sinais AAHA: PU/PD, polifagia, abdômen pendular, alopecia simétrica, panting, fraqueza, pele fina, calcinose (8–15%) (Bugbee et al., 2023; Behrend, VIN 2022). ALP ≠ triagem isolada.',
        },
        {
          label: 'Excluir iatrogênia',
          timing: 'Antes de testar',
          detail:
            'Anamnese minuciosa: oral, tópico, otológico, oftálmico, injetável. Washout 2–4 semanas se possível. ACTHST confirma iatrogênia quando cortisol pós-ACTH suprimido (Behrend, VIN 2022).',
        },
        {
          label: 'Banco mínimo',
          detail:
            'Bioquímica, urinálise, hematologia; proteinúuria em >50% (Milenkovic et al., 2026); PAS se indicado. Investigar ITU subclínica (ISCAID).',
        },
        {
          label: 'Triagem endócrina',
          detail:
            'Cão estável: LDDST 0,01 mg/kg IV, cortisol basal, 4 h e 8 h. UCCR domiciliar para EXCLUIR. ACTHST se comorbidade ou iatrogênia (Bugbee et al., 2023).',
        },
        {
          label: 'Confirmar hipercortisolismo',
          detail:
            'LDDST: cortisol 8 h acima do ponto de corte confirma. ACTHST: resposta exagerada confirma espontâneo; supressão + clínica = iatrogênico (Behrend, VIN 2022).',
        },
        {
          label: 'Diferenciar PDH vs ADH',
          timing: 'Pós-confirmação',
          detail:
            'Supressão parcial LDDST favorece PDH (~60%), mas ~35% PDH não suprimem. eACTH alto/normal = PDH; baixo = ADH. US: bilateral simétrica vs unilateral + atrófia contralateral. HDDST limitado (Bugbee et al., 2023).',
        },
        {
          label: 'Imagem e estadiamento',
          detail:
            'US abdominal adrenais; RM/TC hipófise se macroadenoma/neurológico. Tamanho ≠ malignidade (van Bokhorst et al., 2023).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Algoritmo terapêutico',
      steps: [
        {
          label: 'Trilostano — dose inicial',
          dose: '1 mg/kg PO q12h OU 2 mg/kg PO q24h com alimento',
          duration: 'Reavaliar em 10–14 dias',
          detail:
            'Primeira linha médica na maioria dos PDH e ADH não operáveis (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
        },
        {
          label: 'Ajuste por clínica',
          reassess: 'PU/PD, apetite, panting, pele, infecções — Cushing Clinical Score ALIVE (0–15)',
          detail:
            'Sinais clínicos são primários para ajuste. NÃO aumentar automaticamente aos 14 dias se clínica já melhorou (BSAVA trilostane guidance; Macfarlane et al.).',
        },
        {
          label: 'Monitoramento laboratorial',
          timing: '10–14 d / 30 d / 90 d / q3–6 mo',
          detail:
            'ACTHST 1 mcg/kg IV, cortisol 3–5 h pós-pílula — só monitoramento, não diagnóstico. Cortisol pré-pílula auxiliar, não universal (Bugbee et al., 2023; Macfarlane et al.).',
        },
        {
          label: 'Red flags — suspender trilostano',
          detail:
            'Anorexia, vômito, letargia, diarreia, colapso, hiponatremia — suspender e ACTHST urgente; risco hipoadrenocorticismo iatrogênico (Plumb\'s, 10ª ed.).',
        },
        {
          label: 'Alternativas cirúrgicas/especializadas',
          detail:
            'Adrenalectomia ADH operável (van Bokhorst et al., 2023). Hipofisectomia PDH selecionado (Tanaka et al., 2025). Mitotano: alternativa experiente, não rotina. Selegilina/cetoconazol: não rotina (Bugbee et al., 2023).',
        },
        {
          label: 'Iatrogênico',
          detail:
            'Desmame gradual glicocorticoide; NÃO trilostano de rotina. Suporte insuficiência adrenal relativa (Behrend, VIN 2022).',
        },
      ],
    },
  },
  etiology: {
    classificacaoALIVE: {
      kind: 'clinicalTable' as const,
      title: 'Classificação ALIVE — formas de hiperadrenocorticismo canino',
      headers: ['Forma', 'Mecanismo', 'Frequência', 'Notas ALIVE'],
      rows: [
        ['PDH (hipófise-dependente)', 'Adenoma hipofisário → ACTH ↑ → cortisol', '~80–85% espontâneos', 'Termo preferido ALIVE; adrenais bilaterais hiperplásicas (Niessen et al., 2025)'],
        ['ADH (adrenal-dependente)', 'Tumor adrenal autônomo secreta cortisol', '~15–20% espontâneos', 'ACTH suprimido; adrenal unilateral aumentada (Niessen et al., 2025)'],
        ['Iatrogênico', 'Glicocorticoide exógeno crônico', 'Variável', 'Categoria aparte; desmame, não trilostano rotineiro (Behrend, VIN 2022)'],
        ['Subdiagnóstico', 'Hipercortisolismo bioquímico sem sinais completos', 'Incerto', 'Termo ALIVE; nem todo caso exige tratamento imediato (Niessen et al., 2025)'],
        ['ACTH ectópico', 'Secreção ACTH fora da hipófise', 'Raro', 'Neoplasia não hipofisária; prognóstico reservado (Bugbee et al., 2023)'],
        ['Receptores aberrantes', 'Estimulação adrenal por hormônios não-ACTH', 'Raro', 'Ex.: receptores de gonadotrofinas; investigar em casos atípicos (Niessen et al., 2025)'],
      ],
    },
    eixoHPA:
      'Eixo hipotálamo–hipófise–adrenal: CRH → ACTH → cortisol com retroalimentação negativa. No Cushing, o freio falha — por tumor hipofisário (PDH), adrenal autônomo (ADH) ou supressão iatrogênica do eixo (Cunningham, 6ª ed.; Nelson & Couto, 6ª ed.).',
    figuraEixoHPA: {
      kind: 'clinicalFigure' as const,
      src: '/assets/consulta-vet/diseases/sindrome-cushing-caes/eixo-hpa-animals-2024.png',
      alt: 'Esquema do eixo hipotálamo–hipófise–adrenal (HPA) e feedback negativo do cortisol',
      display: 'wide',
      caption:
        'Eixo HPA: CRH estimula ACTH; ACTH estimula síntese adrenal de cortisol; cortisol exerce feedback negativo sobre hipotálamo e hipófise. Fonte: Behavioral, Physiological, and Pathological Approaches of Cortisol in Dogs, Animals 2024, CC BY 4.0.',
    },
  },
  epidemiology: {
    prevalencia:
      'Endocrinopatia comum em cães de meia-idade a idosos (~7–12 anos). PDH predomina (~80–85%); ADH ~15–20% (Niessen et al., 2025; Bugbee et al., 2023).',
    racas:
      'PDH: Poodle miniatura, Dachshund, Boxer, Boston Terrier, Beagle citados. ADH: predileção relativa por cães maiores; algumas séries citam fêmeas em ADH (Nelson & Couto, 6ª ed.).',
    iatrogenico:
      'Proporção crescente conforme uso de glicocorticoides na população — incluir tópicos e otológicos na anamnese (Behrend, VIN 2022).',
  },
  pathogenesisTransmission: {
    transmissao: 'Não contagioso. Cada caso reflete neoplasia endócrina ou exposição a glicocorticoide (Niessen et al., 2025).',
    patogenesePDH: 'Adenoma hipofisário secreta ACTH → hiperplasia zona fasciculada → cortisol crônico elevado com feedback inadequado (Cunningham, 6ª ed.).',
    patogeneseADH: 'Tumor adrenal autônomo → cortisol ↑ → ACTH ↓ → adrenal contralateral atrófica (Nelson & Couto, 6ª ed.).',
    mucoceleAssociacao:
      'Associação estatística vesícula biliar/mucocele em Cushing — NÃO causal comprovada; monitorar ultrassom (Bugbee et al., 2023).',
  },
  pathophysiology: {
    metabolismo:
      'Cortisol crônico → catabolismo proteico (fraqueza, atrofia muscular, abdômen pendular), resistência insulínica, hiperlipidemia, hepatomegalia vacuolar (Cunningham, 6ª ed.).',
    renal:
      'Reduz sensibilidade a ADH → poliúuria/polidipsia; USG frequentemente <1,020 no cão (Nelson & Couto, 6ª ed.).',
    dermatologico:
      'Pele fina, alopecia simétrica, comedões, calcinosis cutis 8–15%, falha crescimento pós-tosa. ALP esteróide (isoforma induzida) em 85–95% (Bugbee et al., 2023).',
    renalProteinuria:
      'Proteinúria presente em >50% dos cães; monitorar UPC — Milenkovic et al. (2026) descrevem impacto prognóstico. Clopidogrel NÃO é recomendado universalmente (Milenkovic et al., 2026).',
    coagulacao:
      'Hipercoagulabilidade relativa descrita; tromboembolismo possível. Associação mucocele biliar — vigilância, não causalidade (Bugbee et al., 2023).',
    tabelaLDDST: {
      kind: 'clinicalTable' as const,
      title: 'Interpretação LDDST (0,01 mg/kg IV dexametasona)',
      headers: ['Resultado', 'Interpretação', 'Próximo passo'],
      rows: [
        ['Cortisol 8 h acima do corte', 'Confirma hiperadrenocorticismo', 'Diferenciar PDH vs ADH (eACTH, US, HDDST)'],
        ['Supressão parcial 4 h ou 8 h', 'Favorece PDH (~60%)', 'Confirmar com eACTH/US; ~35% PDH não suprimem'],
        ['Sem supressão', 'PDH ou ADH', 'eACTH + ultrassom abdominal (Behrend, VIN 2022)'],
        ['Normal', 'Exclui na maioria', 'Repetir se clínica persistente; considerar UCCR'],
      ],
    },
    tabelaACTHST: {
      kind: 'clinicalTable' as const,
      title: 'Interpretação ACTHST (5 µg/kg IV, máx. 250 µg)',
      headers: ['Contexto', 'Cortisol pós-ACTH', 'Interpretação'],
      rows: [
        ['Triagem espontâneo', 'Exagerado/acima corte', 'Confirma hiperadrenocorticismo (sensibilidade ~85% PDH)'],
        ['Triagem espontâneo', 'Normal', 'Falso-negativo possível até ~41% ADH — considerar LDDST (Bugbee et al., 2023)'],
        ['Suspeita iatrogênia', 'Suprimido/baixo + clínica', 'Confirma iatrogênico (padrão-ouro)'],
        ['Monitoramento trilostano', '3–5 h pós-pílula, 1 mcg/kg', 'Auxiliar ajuste — NÃO diagnóstico inicial (Bugbee et al., 2023)'],
      ],
    },
    tabelaCushingClinicalScore: {
      kind: 'clinicalTable' as const,
      title: 'Cushing Clinical Score (ALIVE) — 5 domínios, 0–3 cada, total 0–15',
      headers: ['Domínio', '0', '1', '2', '3'],
      rows: [
        ['PU/PD', 'Ausente', 'Leve', 'Moderado', 'Marcado'],
        ['Pele/pelagem', 'Normal', 'Alopecia leve', 'Alopecia moderada + pele fina', 'Calcinose/francamente alterada'],
        ['Abdômen/musculatura', 'Normal', 'Leve pendular', 'Moderado pendular/fraqueza', 'Atrofia marcada'],
        ['Apetite/panting', 'Normal', 'Polifagia ou panting ocasional', 'Polifagia + panting frequente', 'Polifagia extrema + panting constante'],
        ['Complicações', 'Nenhuma', 'ITU/piodermite leve', 'Proteinúuria/DM secundário', 'Tromboembolismo/crise'],
      ],
    },
  },
  clinicalSignsPathophysiology: [
    {
      system: 'renal',
      findings: [{
        finding: 'Poliúuria e polidipsia',
        mechanism: 'Cortisol antagoniza ADH renal → incapacidade de concentrar urina.',
        clinicalMeaning: 'USG <1,020 frequente; investigar ITU concomitante (ISCAID).',
        priority: 'common',
      }],
    },
    {
      system: 'metabolic',
      findings: [{
        finding: 'Polifagia e resistência insulínica',
        mechanism: 'Cortisol aumenta gliconeogênese e antagoniza insulina.',
        clinicalMeaning: 'Diabetes secundário possível; investigar comorbidades (Bugbee et al., 2023).',
        priority: 'common',
      }],
    },
    {
      system: 'dermatologic',
      findings: [
        {
          finding: 'Alopecia simétrica, pele fina, comedões',
          mechanism: 'Catabolismo de colágeno e telógeno prolongado.',
          clinicalMeaning: 'Falha pós-tosa reforça suspeita endócrina.',
          priority: 'common',
        },
        {
          finding: 'Calcinosis cutis (8–15%)',
          mechanism: 'Mineralização cutânea por alteração do metabolismo do cálcio.',
          clinicalMeaning: 'Quase exclusiva do cão; rara no gato (Niessen et al., 2025).',
          priority: 'common',
        },
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [{
        finding: 'Abdômen pendular, fraqueza, panting',
        mechanism: 'Catabolismo muscular + redistribuição adiposa abdominal.',
        clinicalMeaning: 'Tríade clássica com PU/PD e alopecia.',
        priority: 'common',
      }],
    },
    {
      system: 'hepatic',
      findings: [{
        finding: 'ALP marcadamente elevada (isoforma esteróide)',
        mechanism: 'Indução enzimática hepática por cortisol crônico.',
        clinicalMeaning: 'ALP ≠ diagnóstico isolado — requer clínica (Bugbee et al., 2023).',
        priority: 'common',
      }],
    },
    {
      system: 'renal',
      findings: [{
        finding: 'Proteinúria',
        mechanism: 'Glomerulopatia por hipercortisolismo crônico.',
        clinicalMeaning: 'UPC seriado; clopidogrel NÃO universal (Milenkovic et al., 2026).',
        priority: 'systemic',
      }],
    },
    {
      system: 'neurologic',
      findings: [{
        finding: 'Sinais neurológicos (macrotumor)',
        mechanism: 'Compressão do parênquima hipofisário por macroadenoma.',
        clinicalMeaning: 'Indica RM/TC hipófise; discutir RT ou hipofisectomia (Tanaka et al., 2025).',
        priority: 'emergency',
      }],
    },
  ],
  diagnosis: {
    abordagem:
      'Integrar história (≥2 sinais), exame físico e banco mínimo antes de testes endócrinos. Não testar por ALP isolada (Bugbee et al., 2023; Behrend, VIN 2022).',
    tabelaLDDST: {
      kind: 'clinicalTable' as const,
      title: 'LDDST — protocolo e interpretação',
      headers: ['Etapa', 'Detalhe'],
      rows: [
        ['Dose', 'Dexametasona 0,01 mg/kg IV (cão)'],
        ['Colheitas', 'Cortisol basal, 4 h e 8 h pós-dose'],
        ['Positivo', 'Cortisol 8 h acima do ponto de corte laboratorial'],
        ['Supressão parcial', 'Favorece PDH; ~35% PDH não suprimem (Behrend, VIN 2022)'],
        ['Limitação', 'Especificidade ~50%; doença não-adrenal e estresse interferem'],
      ],
    },
    tabelaACTHST: {
      kind: 'clinicalTable' as const,
      title: 'ACTHST — triagem e monitoramento',
      headers: ['Uso', 'Protocolo', 'Interpretação'],
      rows: [
        ['Iatrogênia', '5 µg/kg IV cosintropina; cortisol 60 min', 'Pós-ACTH suprimido = iatrogênico (padrão-ouro)'],
        ['Triagem espontâneo', 'Idem', 'Resposta exagerada confirma; FN até 41% ADH'],
        ['Monitoramento trilostano', '1 mcg/kg IV; cortisol 3–5 h pós-pílula', 'Auxiliar ajuste — NÃO diagnóstico (Bugbee et al., 2023)'],
      ],
    },
    tabelaEACTH: {
      kind: 'clinicalTable' as const,
      title: 'ACTH endógeno (eACTH)',
      headers: ['Resultado', 'Interpretação'],
      rows: [
        ['Normal ou elevado', 'PDH'],
        ['Baixo/indetectável', 'ADH'],
        ['Pré-analítico', 'Tubo EDTA resfriado; centrifugar e congelar imediatamente (Bugbee et al., 2023)'],
      ],
    },
    tabelaHDDST: {
      kind: 'clinicalTable' as const,
      title: 'HDDST — limites práticos',
      headers: ['Aspecto', 'Detalhe'],
      rows: [
        ['Dose', '0,1 mg/kg IV dexametasona'],
        ['Utilidade', 'Discriminar PDH vs ADH quando LDDST não suprime'],
        ['Limitação', 'Menos usado atualmente; ~25–30% PDH resistentes à supressão (Behrend, VIN 2022)'],
        ['Alternativa', 'eACTH + ultrassom abdominal preferidos (Bugbee et al., 2023)'],
      ],
    },
    imagem:
      'Ultrassom: adrenais bilaterais simétricas (PDH) vs unilateral + contralateral pequena (ADH). Tamanho da massa ≠ malignidade — carcinoma pode ser pequeno (van Bokhorst et al., 2023). RM/TC hipófise se macroadenoma ou neurológico.',
    washout:
      'Suspender glicocorticoide exógeno 2–4 semanas antes de testar espontâneo quando seguro clinicamente (Behrend, VIN 2022).',
  },
  treatment: {
    trilostano: {
      dose: '1 mg/kg PO q12h OU 2 mg/kg PO q24h COM alimento (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
      ajuste: 'Sinais clínicos primários; Cushing Clinical Score ALIVE (0–15). NÃO auto-aumentar aos 14 dias se clínica OK (Macfarlane et al.; BSAVA trilostane guidance).',
      monitoramento: [
        '10–14 dias após início/ajuste',
        '30 dias, 90 dias, depois q3–6 meses',
        'ACTHST 1 mcg/kg IV, cortisol 3–5 h pós-pílula',
        'Cortisol pré-pílula: auxiliar, não universal (Macfarlane et al.)',
        'Eletrólitos, bioquímica, urinálise seriados',
      ],
      redFlags: 'Anorexia, vômito, letargia, diarreia, colapso → suspender trilostano imediatamente (Plumb\'s, 10ª ed.).',
    },
    mitotano:
      'Alternativa especializada, NÃO rotina. Adrenocorticolítico — indução ~50 mg/kg/dia dividido q12h com alimento; manutenção semanal. Exige experiência e monitoramento intensivo (Bugbee et al., 2023; Plumb\'s, 10ª ed.).',
    selegilinaCetoconazol:
      'Selegilina e cetoconazol NÃO são tratamento de rotina atual — eficácia imprevisível e efeitos adversos (Bugbee et al., 2023).',
    cirurgia: {
      adrenalectomia:
        'ADH unilateral operável — primeira linha quando equipe preparada. Perioperatório: hipertensão, hipocalemia (van Bokhorst et al., 2023).',
      hipofisectomia:
        'PDH selecionado em centro especializado; evidência crescente (Tanaka et al., 2025). Frequentemente ainda requer trilostano transitório.',
      radioterapia:
        'Macroadenoma com sinais neurológicos — prolonga sobrevida; trilostano paralelo para controle sistêmico (Bugbee et al., 2023).',
      figuraHipofisectomia: {
        kind: 'clinicalFigure' as const,
        src: '/assets/consulta-vet/diseases/sindrome-cushing-caes/mri-hipofisectomia-tanaka-2025.jpg',
        alt: 'MRI pré-operatória para planejamento de hipofisectomia transesfenoidal em cão com PDH',
        display: 'wide',
        caption:
          'MRI utilizada para planejamento de hipofisectomia transesfenoidal em cães com hipercortisolismo hipófise-dependente (Tanaka et al., 2025). CC BY — Can Vet J 2025.',
      },
    },
    iatrogenico:
      'Desmame gradual glicocorticoide; suporte insuficiência adrenal relativa. NÃO trilostano de rotina (Behrend, VIN 2022).',
    metaAnalise2025:
      'Meta-análise 2025 (Hanson/Meij) confirma trilostano como base terapêutica com perfil favorável vs mitotano na maioria dos cenários.',
  },
  prevention: {
    deteccaoPrecoce:
      'Não banalizar PU/PD, panting crônico e alopecia simétrica em cãos de meia-idade. Forma espontânea não tem profilaxia; iatrogênia: menor dose eficaz e menor tempo de glicocorticoide (Bugbee et al., 2023).',
    errosComuns: [
      'ALP elevada = Cushing confirmado.',
      'Testar sem ≥2 sinais clínicos compatíveis.',
      'Usar cortisol basal como triagem.',
      'UCCR elevado = diagnóstico confirmado (UCCR exclui, não confirma).',
      'Confundir iatrogênico com espontâneo sem washout/anamnese.',
      'Ausência de supressão LDDST = ADH automaticamente (~35% PDH não suprimem).',
      'ACTHST normal exclui ADH (FN até 41%).',
      'Assumir malignidade adrenal pelo tamanho da massa.',
      'Iniciar trilostano antes de diferenciar PDH/ADH/iatrogênico.',
      'Aumentar trilostano automaticamente aos 14 dias sem avaliar clínica.',
      'Usar ACTHST diagnóstico como monitoramento ou vice-versa.',
      'Mitotano como primeira linha de rotina.',
      'Prescrever selegilina/cetoconazol como padrão.',
      'Clopidogrel universal em todo Cushing proteinúurico (Milenkovic et al., 2026).',
      'Ignorar red flags de hipocortisolismo medicamentoso.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'sindrome-cushing-gatos',
    'diabetes-mellitus-canina',
    'hipoadrenocorticismo-addison',
    'hipertensao-arterial-sistemica-caes-gatos',
  ],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
    { id: 'ref-cush-alive-2025', citationText: 'Niessen SJM et al. ALIVE: Cushing\'s Syndrome and Hypoadrenocorticism. Vet Sci. 2025;12:761.', sourceType: 'Consenso ALIVE', url: 'https://doi.org/10.3390/vetsci12080761', evidenceLevel: 'A — terminologia' },
    { id: 'ref-cush-behrend-vin-2022', citationText: 'Behrend EN. Diagnosis of canine hyperadrenocorticism (VIN, 2022).', sourceType: 'Revisão clínica VIN', evidenceLevel: 'A — diagnóstico' },
    { id: 'ref-cush-bugbee-aaha-2023', citationText: 'Bugbee A et al. 2023 AAHA Selected Endocrinopathies Guidelines. JAAHA. 2023;59.', sourceType: 'Diretriz AAHA', url: 'https://doi.org/10.5326/JAAHA-MS-7368', evidenceLevel: 'A' },
    { id: 'ref-cush-nelson-2020', citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 50.', sourceType: 'Livro-texto', evidenceLevel: 'Referência clínica' },
    { id: 'ref-cush-cunningham-2020', citationText: 'Klein BG. Cunningham\'s Textbook of Veterinary Physiology. 6th ed. 2020.', sourceType: 'Fisiologia', evidenceLevel: 'Base fisiológica' },
    { id: 'ref-cush-milenkovic-2026', citationText: 'Milenkovic D et al. Proteinuria in canine hyperadrenocorticism. J Vet Intern Med. 2026.', sourceType: 'Estudo clínico', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12968517/', evidenceLevel: 'B' },
    { id: 'ref-cush-iscaid', citationText: 'Weese JS et al. ISCAID guidelines — urinary tract infections in companion animals. Vet J. 2019.', sourceType: 'Diretriz ISCAID', url: 'https://doi.org/10.1016/j.tvjl.2019.01.005', evidenceLevel: 'B' },
    { id: 'ref-cush-vanbokhorst-2023', citationText: 'van Bokhorst KL et al. Laparoscopic vs open adrenalectomy in dogs with adrenal tumor. Front Vet Sci. 2023.', sourceType: 'Estudo clínico', url: 'https://doi.org/10.3389/fvets.2023.1156801', evidenceLevel: 'B' },
    { id: 'ref-cush-bsava-trilostane', citationText: 'BSAVA Manual — trilostane monitoring guidance.', sourceType: 'Manual BSAVA', evidenceLevel: 'Referência prática' },
    { id: 'ref-cush-plumb-2023', citationText: 'Plumb\'s Veterinary Drug Handbook. 10th ed. 2023. Trilostane, Mitotane.', sourceType: 'Formulário', evidenceLevel: 'Referência farmacológica' },
    { id: 'ref-cush-macfarlane', citationText: 'Macfarlane L et al. Pre-pill cortisol monitoring in trilostane-treated dogs. Vet Rec. 2016.', sourceType: 'Estudo clínico', url: 'https://doi.org/10.1136/vr.103692', evidenceLevel: 'B' },
    { id: 'ref-cush-meta-2025', citationText: 'Effectiveness of Medical Treatment on Survivability in Canine Cushing\'s Syndrome: meta-analysis. Animals. 2025;15:2954.', sourceType: 'Meta-análise', url: 'https://doi.org/10.3390/ani15202954', evidenceLevel: 'A' },
    { id: 'ref-cush-tanaka-2025', citationText: 'Tanaka H et al. Transsphenoidal hypophysectomy outcomes in canine PDH. Can Vet J. 2025;66:1094–1103.', sourceType: 'Estudo clínico', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12477731/', evidenceLevel: 'B' },
    { id: 'ref-cush-garcia-2022', citationText: 'García San José P et al. Survival of dogs with PDH treated with low-dose trilostane BID. Vet Rec. 2022.', sourceType: 'Estudo clínico', url: 'https://doi.org/10.1002/vetr.1630', evidenceLevel: 'B' },
    { id: 'ref-cush-hpa-figure-2024', citationText: 'Behavioral, Physiological, and Pathological Approaches of Cortisol in Dogs. Animals. 2024;14:3536.', sourceType: 'Figura open access', url: 'https://doi.org/10.3390/ani14233536', evidenceLevel: 'Ilustração CC BY 4.0' },
  ],
  isPublished: true,
  source: 'seed',
};
