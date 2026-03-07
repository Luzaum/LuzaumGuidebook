import { QuizCase } from '../types/hemoTypes';

export function generateQuizCase(): QuizCase {
    return {
        id: "caso-1",
        description: "Cão de 8 anos com histórico de vômitos intensos por 3 dias, apresentando desidratação severa clínica.",
        inputs: {
            species: 'dog',
            declaredSampleType: 'venous',
            fio2: 21,
            ph: 7.52,
            pco2: 48,
            hco3: 38,
            po2: 40,
            temp: 38.5,
            na: 135,
            k: 2.8,
            cl: 90,
            albumin: 3.5,
            glucose: 110,
            lactate: 2.1,
            be: +12
        },
        correctAnswers: {
            primaryDisturbance: "Alcalose Metabólica",
            compensation: "Acidose Respiratória Compensatória",
            oxygenation: "Adequada para coleta venosa"
        }
    };
}
