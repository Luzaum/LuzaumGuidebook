// ============================================================
// CONSTANTS — Opções de formulário
// ============================================================
import type { PatientSpecies, PatientStatus, Comorbidity } from '../types';

export const PATIENT_SPECIES: PatientSpecies[] = ['Canino', 'Felino'];

export const PATIENT_STATUS: PatientStatus[] = [
    'Adulto Saudável',
    'Filhote',
    'Idoso',
    'Gestante',
    'Lactante',
];

export const COMORBIDITIES: Comorbidity[] = [
    'Nenhuma',
    'Cardiopatia',
    'Hepatopatia',
    'Doença Renal Crônica (DRC)',
    'Endocrinopatia',
];

export const CLINICAL_SIGNS_CATEGORIZED: Record<string, string[]> = {
    'Sinais Locais/Cutâneos': [
        'Edema', 'Dor Intensa', 'Necrose', 'Ausência de Reação Local',
        'Bolhas', 'Equimose', 'Urticária', 'Angioedema',
    ],
    'Sinais Hemorrágicos': [
        'Gengivorragia', 'Epistaxe', 'Hematêmese', 'Melena', 'Hematúria',
    ],
    'Sinais Neurológicos': [
        'Ataxia', 'Paralisia Flácida', 'Convulsões', 'Tremores',
        'Fácies Miastênica', 'Midríase', 'Estupor', 'Coma',
        'Dor Espinhal', 'Priapismo',
    ],
    'Sinais Cardiovasculares': [
        'Hipotensão', 'Choque', 'Taquicardia', 'Bradicardia', 'Arritmias',
    ],
    'Sinais Respiratórios': [
        'Dispneia', 'Taquipneia', 'Paralisia Respiratória', 'Tosse',
    ],
    'Sinais Gastrintestinais': ['Sialorreia', 'Vômitos'],
    'Sinais Urinários': ['Urina Escura (avermelhada/marrom)'],
    'Sinais Gerais/Sistêmicos': ['Apatia'],
};

// Mapeamento de sinais da UI → palavras-chave nos dados dos animais
export const CLINICAL_SIGNS_KEYWORDS: Record<string, string[]> = {
    'Edema': ['edema'],
    'Dor Intensa': ['dor local intensa', 'dor excruciante', 'dor e queimação', 'dor intensa'],
    'Necrose': ['necrose'],
    'Ausência de Reação Local': ['sem reação local', 'indolor', 'dor local discreta'],
    'Bolhas': ['bolhas'],
    'Equimose': ['equimose', 'hematomas'],
    'Gengivorragia': ['gengivorragia', 'hemorragia'],
    'Epistaxe': ['epistaxe', 'hemorragia'],
    'Hematêmese': ['hematêmese', 'hemorragia'],
    'Melena': ['melena', 'hemorragia'],
    'Hematúria': ['hematúria', 'hemorragia'],
    'Ataxia': ['ataxia'],
    'Paralisia Flácida': ['paralisia flácida'],
    'Convulsões': ['convulsões'],
    'Tremores': ['tremores'],
    'Fácies Miastênica': ['fácies miastênica', 'ptose palpebral'],
    'Midríase': ['midríase'],
    'Estupor': ['estupor', 'apatia profunda'],
    'Coma': ['coma'],
    'Dor Espinhal': ['dor espinhal', 'hiperestesia'],
    'Hipotensão': ['hipotensão', 'choque'],
    'Choque': ['choque', 'hipotensão'],
    'Taquicardia': ['taquicardia'],
    'Bradicardia': ['bradicardia'],
    'Arritmias': ['arritmias', 'arritmias cardíacas'],
    'Dispneia': ['dispneia', 'insuficiência respiratória'],
    'Taquipneia': ['taquipneia'],
    'Paralisia Respiratória': ['paralisia respiratória'],
    'Tosse': ['tosse'],
    'Sialorreia': ['sialorreia', 'hipersalivação'],
    'Vômitos': ['vômitos', 'vômito'],
    'Apatia': ['apatia'],
    'Urina Escura (avermelhada/marrom)': ['urina escura', 'mioglobinúria', 'hemoglobinúria'],
    'Angioedema': ['angioedema', 'anafilática'],
    'Urticária': ['urticária', 'anafilática'],
    'Priapismo': ['priapismo'],
};

// Pontuação por nível de significância para o algoritmo de diagnóstico
export const SIGNIFICANCE_SCORES: Record<string, number> = {
    pathognomonic: 10,
    characteristic: 5,
    general: 1,
};
