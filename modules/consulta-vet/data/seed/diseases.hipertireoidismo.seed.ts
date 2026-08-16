import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/** Hipertireoidismo felino - sintese editorial Vetius. AAHA 2023 > AAFP 2016 > Geddes 2022. */
export const hipertireoidismoFelinoRecord: DiseaseRecord = {
  id: 'disease-hipertireoidismo-felino',
  slug: 'hipertireoidismo-felino',
  title: 'Hipertireoidismo felino',
  synonyms: ['Hipertireoidismo', 'Feline hyperthyroidism', 'FHT', 'Tireotoxicose', 'B�cio felino'],
  species: ['cat'],
  category: 'endocrinologia',
  tags: ['Tire�ide', 'T4 total', 'T4 livre', 'TSH', 'Metimazol', 'I-131', 'Cintilografia', 'DRC mascarada', 'AAHA 2023'],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipertireoidismo-felino'],
  quickSummary:
    'Hipertireoidismo felino: endocrinopatia idosa por n�dulo tireoidiano funcional benigno (~1-3% carcinoma). TT4 elevada + cl�nica confirma maioria; TT4 normal n?o exclui (~5%). Mascara DRC - tratar para eutireoidismo, nunca manter T4 alta. I-131 curativo preferencial; metimazol/dieta controlam, n?o curam (Bugbee et al., 2023; Geddes & Aguiar, 2022).',
  quickDecisionStrip: [
    'Gato idoso emagrecendo apesar de comer muito + taquicardia + thyroid slip palp�vel = suspeita m�xima (Carney et al., 2016).',
    'TT4 elevada + sinais compat�veis geralmente confirma - usar intervalo de refer?ncia do laborat�rio (Bugbee et al., 2023).',
    'TT4 normal N?O exclui - ~5% podem ter doen�a inicial, flutua�?o ou NTI concomitante (Bugbee et al., 2023).',
    'fT4 elevada isolada N?O confirma - interpretar sempre com TT4 (Carney et al., 2016).',
    'TSH mensur�vel n?o exclui universalmente - depende do ensaio (Brassard et al., 2026).',
    'Hipertireoidismo mascara DRC - reavaliar rim ap�s eutireoidismo (Geddes & Aguiar, 2022).',
    'N?O manter gato hipertireoideo para proteger creatinina - objetivo � eutireoidismo (Geddes & Aguiar, 2022).',
    'Medir PAS no diagn�stico e ap�s tratamento - 27% PAS >=160 mmHg pr�-I-131 (Stammeleer et al., 2024).',
    'Metimazol N?O cura - dose por gato, n?o mg/kg (Carney et al., 2016; Bugbee et al., 2023).',
    'I-131 curativo preferencial - dose individualizada, n?o fixa (Peterson & Rishniw, 2021).',
    'Dieta y/d exige exclusividade absoluta - n?o substitui dieta renal se DRC azot?mica (Geddes & Aguiar, 2022).',
    'Doen�a progressiva - metimazol/dieta n?o interrompem crescimento nodular (Peterson et al., 2016).',
  ],
  quickSummaryRich: {
    lead:
      'Metabolismo acelerado permanente. Armadilha renal: creatinina baixa at� tratar. Forma ap�tica existe. Objetivo: eutireoidismo, n?o hipertireoidismo terap?utico.',
    leadHighlights: ['TFG', 'DRC mascarada', 'ap�tico', 'eutireoidismo', 'I-131'],
    pillars: [
      { title: 'Diagn�stico', body: 'TT4 primeira linha; lim�trofes: repetir TT4 + fT4; TSH conforme ensaio (Bugbee et al., 2023).', highlights: ['TT4', 'fT4'] },
      { title: 'Rim', body: 'Tratar mesmo com DRC; SDMA normal n?o garante aus?ncia de azotemia p�s-tratamento (Geddes & Aguiar, 2022).', highlights: ['unmasking'] },
      { title: 'Tratamento', body: 'I-131 curativo preferencial; metimazol/dieta = controle vital�cio (Peterson & Rishniw, 2021).', highlights: ['I-131'] },
    ],
    diagnosticFlow: { title: 'Diagn�stico', steps: [{ label: 'TT4', detail: 'Elevada + cl�nica confirma maioria (Bugbee et al., 2023).' }] },
    treatmentFlow: { title: 'Tratamento', steps: [{ label: 'I-131 ou controle', detail: 'Curativo vs metimazol/dieta (Bugbee et al., 2023).' }] },
  },
  etiology: {
    definicao: 'Secre�?o aut�noma excessiva de T4/T3 por tecido nodular hiperfuncional (Carney et al., 2016).',
    lesaoPredominante: 'Hiperplasia adenomatosa ou adenoma benigno; carcinoma ~1-3% (Bugbee et al., 2023).',
    naoGraves: 'N?o � doen�a de Graves felina (Peterson et al., 2016).',
    distribuicaoAnatomica: '62,9% bilateral, 31,7% unilateral, 3,8% ect�pico em s�rie de 2.096 gatos (Peterson et al., 2016).',
    progressao: 'Antitireoidiano/dieta controlam horm�nio, n?o removem n�dulo (Peterson et al., 2016).',
  },
  epidemiology: {
    idade: 'Mediana ~12-14 anos (Carney et al., 2016).',
    prevalencia: '~2-4% popula�?o geral; ~6-10% gatos >9 anos (Carney et al., 2016).',
    caoNota: 'C?o: raro espont�neo; presumir carcinoma ou tireotoxicose ex�gena (Broome et al., 2015).',
  },
  pathogenesisTransmission: {
    eixoHPT: ['N�dulo aut�nomo -> T4/T3 elevados -> TSH suprimido (Carney et al., 2016).'],
    mascaramentoDRC: 'TFG elevada + menor produ�?o de creatinina muscular -> DRC mascarada; unmasking ap�s tratamento (Geddes & Aguiar, 2022).',
  },
  pathophysiology: {
    tabelaFrequenciaSinais: {
      kind: 'clinicalTable' as const,
      title: 'Sinais cl�nicos - frequ?ncia aproximada',
      headers: ['Achado', 'Frequ?ncia'],
      rows: [
        ['Perda de peso', '~88-92%'],
        ['Tireoide palp�vel', '~80%'],
        ['Polifagia', '~49%'],
        ['Forma ap�tica', '<20%'],
      ],
    },
    hipertireoidismoApatico: 'Minor�a com hiporexia/letargia - n?o exclui diagn�stico (Carney et al., 2016).',
    tabelaComparacaoTratamentos: {
      kind: 'clinicalTable' as const,
      title: 'Modalidades terap?uticas',
      headers: ['Tratamento', 'Curativo?', 'Limita�?o'],
      rows: [
        ['I-131', 'Sim', 'Centro especializado'],
        ['Metimazol', 'N?o', 'Vital�cio; efeitos adversos'],
        ['Dieta y/d', 'N?o', 'Exclusividade absoluta'],
        ['Tireoidectomia', 'Potencial', 'Paratireoides; ect�pico'],
      ],
    },
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [{
        finding: 'Perda de peso com polifagia ou forma ap�tica',
        mechanism: 'Hipermetabolismo + catabolismo proteico.',
        clinicalMeaning: 'Tr�ade cl�ssica; ap�tico n?o exclui.',
        priority: 'common',
      }],
    },
    {
      system: 'renal',
      findings: [{
        finding: 'Creatinina normal com DRC oculta',
        mechanism: 'TFG elevada + sarcopenia.',
        clinicalMeaning: 'Reavaliar ap�s eutireoidismo (Geddes & Aguiar, 2022).',
        priority: 'common',
      }],
    },
  ],
  diagnosis: {
    diagnosticReasoning: 'TT4 + cl�nica na maioria; palpa�?o aumenta suspeita mas n?o confirma (Carney et al., 2016).',
    tt4: 'Primeira linha; ~5% normais; usar RI do laborat�rio (Bugbee et al., 2023).',
    ft4: 'Sens�vel, menos espec�fica - sempre com TT4 (Carney et al., 2016).',
    tsh: 'Interpreta�?o depende do ensaio - Brassard et al., 2026 atualiza TSH mensur�vel.',
    tabelaGruposAAHA: {
      kind: 'clinicalTable' as const,
      title: 'Grupos AAHA 2023',
      headers: ['Grupo', 'Conduta'],
      rows: [
        ['1 Cl�ssico', 'TT4 elevada + sinais -> tratar'],
        ['2 TT4 normal', 'Repetir TT4 + fT4 em 2-4 semanas'],
        ['5 Comorbidades', 'Tratar hipertireoidismo E comorbidade'],
        ['6 Triagem', 'TT4 repetidamente elevada -> tratar'],
      ],
    },
    planoDiagnostico: [
      { stepNumber: 1, title: 'TT4 total', purpose: 'Triagem', description: 'Exame inicial (Bugbee et al., 2023).', interpretation: 'Alta + cl�nica confirma.', limitations: 'Normal n?o exclui.' },
      { stepNumber: 2, title: 'Baseline renal/PA', purpose: 'Progn�stico', description: 'Creatinina, urin�lise, PAS (Geddes & Aguiar, 2022).', interpretation: 'DRC pode estar mascarada.', limitations: 'SDMA limitado.' },
    ],
  },
  treatment: {
    objetivos: ['Eutireoidismo sem hipotireoidismo iatrog?nico; manejar DRC revelada (Geddes & Aguiar, 2022).'],
    iodoRadioativo:
      'I-131 curativo preferencial >95%. Dose individualizada - mediana 1,90 mCi (0,95-10,6); N?O dose fixa universal (Peterson & Rishniw, 2021).',
    metimazol:
      'Inibe TPO; n?o destr�i n�dulo. Convencional: 1,25-2,5 mg/gato q12h. AAHA 2023: 1,25-2,5 mg q24h 1? semana -> 2,5-5 mg q12-24h; meta TT4 ~1,0-2,5 ?g/dL. Por gato, n?o mg/kg (Bugbee et al., 2023; Plumb\'s, 2023).',
    tabelaMetimazol: {
      kind: 'clinicalTable' as const,
      title: 'Metimazol',
      headers: ['Aspecto', 'Recomenda�?o'],
      rows: [
        ['Dose convencional', '1,25-2,5 mg/gato q12h'],
        ['AAHA conservador', '1,25-2,5 mg q24h semana 1 -> titular'],
        ['Monitoramento', 'TT4 + CBC + bioqu�mica 2-4 semanas'],
      ],
    },
    carbimazol: 'Pr�-f�rmaco do metimazol - n?o usar ap�s rea�?o grave ao metimazol (Plumb\'s, 2023).',
    dietaIodo: 'y/d exclusiva; falha poss�vel; n?o substitui dieta renal em DRC azot?mica (Geddes & Aguiar, 2022).',
    tireoidectomia: 'Potencialmente curativa; cintilografia pr�via ideal; monitorar c�lcio p�s-bilateral (Carney et al., 2016).',
    betabloqueadores: 'Sintom�tico apenas - n?o reduz T4 (Merck Veterinary Manual, 2024).',
    drcConcomitante: 'Nunca manter hipertireoidismo para proteger creatinina - tratar e individualizar (Geddes & Aguiar, 2022).',
    monitoramento: ['Reavaliar creatinina e PAS ap�s eutireoidismo (Stammeleer et al., 2024).'],
  },
  prevention: {
    errosComuns: [
      'TT4 normal exclui hipertireoidismo',
      'fT4 alta confirma sozinha',
      'Manter T4 alta para proteger o rim',
      'Metimazol cura a doen�a',
      'I-131 dose fixa para todos',
    ],
    redFlags: ['Cegueira aguda - medir PAS', 'Dispneia/ICC', 'Tempestade tireot�xica'],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['doenca-renal-cronica-caes-gatos', 'hipertensao-arterial-sistemica', 'diabetes-mellitus-felina', 'cardiomiopatia-hipertrofica', 'hipotireoidismo-adquirido-caes-gatos'],
  relatedMedicationSlugs: ['benazepril', 'metimazol', 'atenolol', 'propranolol'],
  references: [
    { id: 'ref-ht-aaha-2023', citationText: 'Bugbee A, et al. 2023 AAHA Selected Endocrinopathies Guidelines. JAAHA. 2023;59:113-135.', sourceType: 'Diretriz AAHA', url: 'https://doi.org/10.5326/JAAHA-MS-7297', evidenceLevel: 'A' },
    { id: 'ref-ht-aafp-2016', citationText: 'Carney HC, et al. 2016 AAFP Guidelines for Feline Hyperthyroidism. J Feline Med Surg. 2016;18:400-416.', sourceType: 'Diretriz AAFP', url: 'https://doi.org/10.1177/1098612X15627226', evidenceLevel: 'A' },
    { id: 'ref-ht-geddes-2022', citationText: 'Geddes R, Aguiar J. Hyperthyroidism and CKD. J Feline Med Surg. 2022;24:641-650.', sourceType: 'Revis?o', url: 'https://doi.org/10.1177/1098612X221090390', evidenceLevel: 'A' },
    { id: 'ref-ht-stammeleer-2024', citationText: 'Stammeleer L, et al. Blood pressure in hyperthyroid cats. J Vet Intern Med. 2024;38:1359-1369.', sourceType: 'Estudo', url: 'https://doi.org/10.1111/jvim.17032', evidenceLevel: 'B' },
    { id: 'ref-ht-brassard-2026', citationText: 'Brassard C, et al. TSH in hyperthyroid cats. J Feline Med Surg. 2026;28(1).', sourceType: 'Estudo', url: 'https://doi.org/10.1177/1098612X251398915', evidenceLevel: 'B' },
    { id: 'ref-ht-peterson-2016', citationText: 'Peterson ME, et al. Thyroid pathology vs duration. J Feline Med Surg. 2016;18:92-103.', sourceType: 'Estudo', evidenceLevel: 'B' },
    { id: 'ref-ht-peterson-i131-2021', citationText: 'Peterson ME, Rishniw M. Individualized I-131 dosing. J Vet Intern Med. 2021;35:2140-2151.', sourceType: 'Estudo', url: 'https://doi.org/10.1111/jvim.16228', evidenceLevel: 'B' },
    { id: 'ref-ht-stammeleer-scint-2025', citationText: 'Stammeleer L, et al. Thyroid scintigraphy in 234 cats. Animals. 2025;15:1495.', sourceType: 'Estudo', url: 'https://doi.org/10.3390/ani15101495', evidenceLevel: 'B' },
    { id: 'ref-ht-peterson-tsh-2015', citationText: 'Peterson ME, et al. TSH as diagnostic test. J Vet Intern Med. 2015;29:1327-1334.', sourceType: 'Estudo', evidenceLevel: 'B' },
    { id: 'ref-ht-nelson-2020', citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020.', sourceType: 'Livro-texto', evidenceLevel: 'Consenso' },
    { id: 'ref-ht-plumb-2023', citationText: 'Plumb\'s Veterinary Drug Handbook. 10th ed. 2023.', sourceType: 'Formul�rio', evidenceLevel: 'A' },
    { id: 'ref-ht-broome-2015', citationText: 'Broome MR, et al. Exogenous thyrotoxicosis in dogs. JAVMA. 2015;246:105-111.', sourceType: 'S�rie', evidenceLevel: 'C' },
  ],
  isPublished: true,
  source: 'seed',
};
