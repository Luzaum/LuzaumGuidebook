import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/** Hipertireoidismo felino — síntese editorial Vetius. AAHA 2023 > AAFP 2016 > Geddes 2022 > Ettinger 9ª ed. */
export const hipertireoidismoFelinoRecord: DiseaseRecord = {
  id: 'disease-hipertireoidismo-felino',
  slug: 'hipertireoidismo-felino',
  title: 'Hipertireoidismo felino',
  synonyms: ['Hipertireoidismo', 'Tireotoxicose', 'Bócio felino', 'Hipertireoidismo em gatos'],
  species: ['cat'],
  category: 'endocrinologia',
  tags: [
    'Tireoide',
    'T4 total',
    'T4 livre',
    'TSH',
    'Metimazol',
    'I-131',
    'Cintilografia',
    'DRC mascarada',
    'AAHA 2023',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipertireoidismo-felino'],
  quickSummary:
    'Hipertireoidismo felino: endocrinopatia idosa por nódulo tireoidiano funcional benigno (~1–3% carcinoma). T4 total elevada + clínica confirma a maioria; T4 normal não exclui (~5%). Mascara doença renal crônica — tratar para eutireoidismo, nunca manter T4 alta. Radioiodo (I-131) curativo preferencial; metimazol/dieta y/d controlam, não curam (Bugbee et al., 2023; Geddes & Aguiar, 2022).',
  quickDecisionStrip: [
    'Gato idoso emagrecendo apesar de comer muito + taquicardia + tireoide palpável = suspeita máxima (Carney et al., 2016).',
    'T4 total elevada + sinais compatíveis geralmente confirma — usar intervalo de referência do laboratório (Bugbee et al., 2023).',
    'T4 total normal NÃO exclui — ~5% podem ter doença inicial, flutuação ou doença não tireoidiana concomitante (Bugbee et al., 2023).',
    'T4 livre elevada isolada NÃO confirma — interpretar sempre com T4 total (Carney et al., 2016).',
    'TSH mensurável não exclui universalmente — depende do ensaio (Brassard et al., 2026).',
    'Hipertireoidismo mascara DRC — reavaliar rim após eutireoidismo (Geddes & Aguiar, 2022).',
    'NÃO manter gato hipertireoideo para proteger creatinina — objetivo é eutireoidismo (Geddes & Aguiar, 2022).',
    'Medir pressão arterial no diagnóstico e após tratamento — 27% PAS ≥160 mmHg pré-I-131 (Stammeleer et al., 2024).',
    'Metimazol NÃO cura — dose por gato, não mg/kg (Carney et al., 2016; Bugbee et al., 2023).',
    'I-131 curativo preferencial — dose individualizada, não fixa (Peterson & Rishniw, 2021).',
    'Dieta y/d exige exclusividade absoluta — não substitui dieta renal se DRC azotêmica (Geddes & Aguiar, 2022).',
    'Doença progressiva — metimazol/dieta não interrompem crescimento nodular (Peterson et al., 2016).',
  ],
  quickSummaryRich: {
    lead:
      'Metabolismo acelerado permanente por secreção autônoma de hormônios tireoidianos. Armadilha renal: creatinina baixa até tratar (desmascaramento da DRC). Forma apática existe. Objetivo: eutireoidismo, não hipertireoidismo terapêutico.',
    leadHighlights: ['TFG', 'DRC mascarada', 'apático', 'eutireoidismo', 'I-131'],
    pillars: [
      {
        title: 'Diagnóstico',
        body: 'T4 total é primeira linha; valores limítrofes: repetir T4 total + T4 livre; TSH conforme ensaio (Bugbee et al., 2023).',
        highlights: ['T4 total', 'T4 livre'],
      },
      {
        title: 'Rim',
        body: 'Tratar mesmo com DRC; SDMA normal não garante ausência de azotemia pós-tratamento (Geddes & Aguiar, 2022).',
        highlights: ['desmascaramento renal'],
      },
      {
        title: 'Tratamento',
        body: 'I-131 curativo preferencial; metimazol/dieta y/d = controle vitalício (Peterson & Rishniw, 2021).',
        highlights: ['I-131'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico',
      steps: [
        {
          label: '1. Suspeita clínica',
          detail:
            'Perda de peso com polifagia, taquicardia, hiperatividade ou forma apática; palpar tireoide deslizante (aumenta suspeita, não confirma).',
        },
        {
          label: '2. T4 total',
          detail:
            'Exame inicial. Elevada + clínica compatível confirma na maioria. Usar intervalo de referência do laboratório (Bugbee et al., 2023).',
          limitations: 'Normal em ~5% (doença inicial, doença não tireoidiana, flutuação).',
        },
        {
          label: '3. T4 total + T4 livre se limítrofe',
          detail:
            'Repetir em 2–4 semanas se T4 normal com clínica forte ou T4 limítrofe. T4 livre isolada não confirma (Carney et al., 2016).',
        },
        {
          label: '4. Baseline renal e pressão arterial',
          detail:
            'Creatinina, urinálise, SDMA se disponível, pressão arterial — antes de iniciar tratamento (Geddes & Aguiar, 2022; Stammeleer et al., 2024).',
        },
        {
          label: '5. Cintilografia / ecografia (opcional)',
          detail:
            'Caracterizar nódulo, localização ectópica ou carcinoma suspeito; útil antes de tireoidectomia ou planejamento de I-131.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico',
      steps: [
        {
          label: '1. Escolher modalidade',
          detail:
            'I-131 curativo preferencial se disponível; metimazol ou dieta y/d quando I-131/cirurgia inviáveis (Bugbee et al., 2023).',
        },
        {
          label: '2. Metimazol — titulação',
          detail:
            'Início 1,25–2,5 mg/gato q12h ou esquema conservador AAHA; meta T4 ~1,0–2,5 µg/dL. Dose por gato, não mg/kg (Plumb\'s 10ª ed.).',
          reassess: 'T4 + hemograma + bioquímica em 2–4 semanas após cada ajuste.',
        },
        {
          label: '3. Dieta y/d (alternativa)',
          detail:
            'Exclusividade absoluta; não substitui dieta renal se azotemia manifesta (Geddes & Aguiar, 2022).',
        },
        {
          label: '4. Reavaliar rim e PA',
          detail:
            'Creatinina e pressão arterial 2–4 semanas após eutireoidismo — esperar possível desmascaramento de DRC.',
        },
        {
          label: '5. Manutenção',
          detail:
            'Metimazol/dieta vitalícios ou cura após I-131; monitorar T4, peso, apetite e função renal semestralmente.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Secreção autônoma excessiva de T4/T3 por tecido nodular hiperfuncional (Carney et al., 2016).',
    lesaoPredominante:
      'Hiperplasia adenomatosa ou adenoma benigno; carcinoma ~1–3% (Bugbee et al., 2023).',
    naoGraves: 'Não é doença de Graves felina (Peterson et al., 2016).',
    distribuicaoAnatomica:
      '62,9% bilateral, 31,7% unilateral, 3,8% ectópico em série de 2.096 gatos (Peterson et al., 2016).',
    progressao:
      'Antitireoidiano/dieta controlam hormônio, não removem nódulo (Peterson et al., 2016).',
  },
  epidemiology: {
    idade: 'Mediana ~12–14 anos (Carney et al., 2016).',
    prevalencia: '~2–4% população geral; ~6–10% gatos >9 anos (Carney et al., 2016).',
    caoNota:
      'Cão: raro espontâneo; presumir carcinoma ou tireotoxicose exógena (Broome et al., 2015).',
  },
  pathogenesisTransmission: {
    eixoHPT: ['Nódulo autônomo → T4/T3 elevados → TSH suprimido (Carney et al., 2016).'],
    mascaramentoDRC:
      'TFG elevada + menor produção de creatinina muscular → DRC mascarada; desmascaramento após tratamento (Geddes & Aguiar, 2022).',
  },
  pathophysiology: {
    tabelaFrequenciaSinais: {
      kind: 'clinicalTable' as const,
      title: 'Sinais clínicos — frequência aproximada',
      headers: ['Achado', 'Frequência'],
      rows: [
        ['Perda de peso', '~88–92%'],
        ['Tireoide palpável', '~80%'],
        ['Polifagia', '~49%'],
        ['Forma apática', '<20%'],
      ],
    },
    hipertireoidismoApatico:
      'Minoria com hiporexia/letargia — não exclui diagnóstico (Carney et al., 2016).',
    tabelaComparacaoTratamentos: {
      kind: 'clinicalTable' as const,
      title: 'Modalidades terapêuticas',
      headers: ['Tratamento', 'Curativo?', 'Limitação'],
      rows: [
        ['I-131', 'Sim', 'Centro especializado'],
        ['Metimazol', 'Não', 'Vitalício; efeitos adversos'],
        ['Dieta y/d', 'Não', 'Exclusividade absoluta'],
        ['Tireoidectomia', 'Potencial', 'Paratireoides; ectópico'],
      ],
    },
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Perda de peso com polifagia ou forma apática',
          mechanism: 'Hipermetabolismo + catabolismo proteico.',
          clinicalMeaning: 'Tríade clássica; apático não exclui.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          finding: 'Creatinina normal com DRC oculta',
          mechanism: 'TFG elevada + sarcopenia.',
          clinicalMeaning: 'Reavaliar após eutireoidismo (Geddes & Aguiar, 2022).',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticReasoning:
      'T4 total + clínica na maioria; palpação aumenta suspeita mas não confirma (Carney et al., 2016).',
    tt4: 'Primeira linha; ~5% normais; usar RI do laboratório (Bugbee et al., 2023).',
    ft4: 'Sensível, menos específica — sempre com T4 total (Carney et al., 2016).',
    tsh: 'Interpretação depende do ensaio — Brassard et al., 2026 atualiza TSH mensurável.',
    tabelaGruposAAHA: {
      kind: 'clinicalTable' as const,
      title: 'Grupos AAHA 2023',
      headers: ['Grupo', 'Conduta'],
      rows: [
        ['1 Clássico', 'T4 elevada + sinais → tratar'],
        ['2 T4 normal', 'Repetir T4 + T4 livre em 2–4 semanas'],
        ['5 Comorbidades', 'Tratar hipertireoidismo E comorbidade'],
        ['6 Triagem', 'T4 repetidamente elevada → tratar'],
      ],
    },
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'T4 total',
        purpose: 'Triagem',
        description: 'Exame inicial (Bugbee et al., 2023).',
        interpretation: 'Alta + clínica confirma.',
        limitations: 'Normal não exclui.',
      },
      {
        stepNumber: 2,
        title: 'Baseline renal/PA',
        purpose: 'Prognóstico',
        description: 'Creatinina, urinálise, PAS (Geddes & Aguiar, 2022).',
        interpretation: 'DRC pode estar mascarada.',
        limitations: 'SDMA limitado.',
      },
    ],
  },
  treatment: {
    objetivos: [
      'Eutireoidismo sem hipotireoidismo iatrogênico; manejar DRC revelada (Geddes & Aguiar, 2022).',
    ],
    iodoRadioativo:
      'I-131 curativo preferencial >95%. Dose individualizada — mediana 1,90 mCi (0,95–10,6); NÃO dose fixa universal (Peterson & Rishniw, 2021).',
    metimazol:
      "Inibe peroxidase tireoidiana; não destrói nódulo. Convencional: 1,25–2,5 mg/gato q12h. AAHA 2023: titular para meta T4 ~1,0–2,5 µg/dL. Por gato, não mg/kg (Bugbee et al., 2023; Plumb's 10ª ed.).",
    tabelaMetimazol: {
      kind: 'clinicalTable' as const,
      title: 'Metimazol',
      headers: ['Aspecto', 'Recomendação'],
      rows: [
        ['Dose convencional', '1,25–2,5 mg/gato q12h'],
        ['AAHA conservador', '1,25–2,5 mg q24h semana 1 → titular'],
        ['Monitoramento', 'T4 + hemograma + bioquímica 2–4 semanas'],
      ],
    },
    carbimazol:
      "Pró-fármaco do metimazol — não usar após reação grave ao metimazol (Plumb's 10ª ed.).",
    dietaIodo:
      'y/d exclusiva; falha possível; não substitui dieta renal em DRC azotêmica (Geddes & Aguiar, 2022).',
    tireoidectomia:
      'Potencialmente curativa; cintilografia prévia ideal; monitorar cálcio pós-bilateral (Carney et al., 2016).',
    betabloqueadores:
      'Sintomático apenas — não reduz T4 (Merck Veterinary Manual, 2024).',
    drcConcomitante:
      'Nunca manter hipertireoidismo para proteger creatinina — tratar e individualizar (Geddes & Aguiar, 2022).',
    monitoramento: ['Reavaliar creatinina e PAS após eutireoidismo (Stammeleer et al., 2024).'],
  },
  prevention: {
    errosComuns: [
      'T4 normal exclui hipertireoidismo',
      'T4 livre alta confirma sozinha',
      'Manter T4 alta para proteger o rim',
      'Metimazol cura a doença',
      'I-131 dose fixa para todos',
    ],
    redFlags: ['Cegueira aguda — medir PAS', 'Dispneia/ICC', 'Tempestade tireotóxica'],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-renal-cronica-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
    'diabetes-mellitus-felina',
    'cardiomiopatia-hipertrofica-caes-gatos',
    'hipotireoidismo-adquirido-caes-gatos',
  ],
  relatedMedicationSlugs: ['benazepril', 'metimazol', 'atenolol', 'propranolol'],
  references: [
    {
      id: 'ref-ht-aaha-2023',
      citationText:
        'Bugbee A, et al. 2023 AAHA Selected Endocrinopathies Guidelines. JAAHA. 2023;59:113-135.',
      sourceType: 'Diretriz AAHA',
      url: 'https://doi.org/10.5326/JAAHA-MS-7297',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ht-aafp-2016',
      citationText:
        'Carney HC, et al. 2016 AAFP Guidelines for Feline Hyperthyroidism. J Feline Med Surg. 2016;18:400-416.',
      sourceType: 'Diretriz AAFP',
      url: 'https://doi.org/10.1177/1098612X15627226',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ht-geddes-2022',
      citationText:
        'Geddes R, Aguiar J. Hyperthyroidism and CKD. J Feline Med Surg. 2022;24:641-650.',
      sourceType: 'Revisão',
      url: 'https://doi.org/10.1177/1098612X221090390',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ht-stammeleer-2024',
      citationText:
        'Stammeleer L, et al. Blood pressure in hyperthyroid cats. J Vet Intern Med. 2024;38:1359-1369.',
      sourceType: 'Estudo',
      url: 'https://doi.org/10.1111/jvim.17032',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ht-brassard-2026',
      citationText:
        'Brassard C, et al. TSH in hyperthyroid cats. J Feline Med Surg. 2026;28(1).',
      sourceType: 'Estudo',
      url: 'https://doi.org/10.1177/1098612X251398915',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ht-peterson-2016',
      citationText:
        'Peterson ME, et al. Thyroid pathology vs duration. J Feline Med Surg. 2016;18:92-103.',
      sourceType: 'Estudo',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ht-peterson-i131-2021',
      citationText:
        'Peterson ME, Rishniw M. Individualized I-131 dosing. J Vet Intern Med. 2021;35:2140-2151.',
      sourceType: 'Estudo',
      url: 'https://doi.org/10.1111/jvim.16228',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-ht-plumb-2023',
      citationText: "Plumb's Veterinary Drug Handbook. 10th ed. 2023.",
      sourceType: 'Formulário',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ht-peterson-2020',
      citationText: 'Peterson ME, Broome MR. Feline hyperthyroidism. Vet Clin North Am Small Anim Pract. 2020;50(5):1065-1084.',
      sourceType: 'Revisão',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-ht-ettinger-2024',
      citationText: "Ettinger's Textbook of Veterinary Internal Medicine. 9th ed. 2024.",
      sourceType: 'Livro-texto',
      evidenceLevel: 'Consenso',
    },
  ],
  isPublished: true,
  source: 'seed',
};
