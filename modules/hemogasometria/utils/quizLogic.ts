import { BloodGasInputs, QuizCase } from '../types/hemoTypes';
import { HEMO_REF, QUIZ_THERAPY_OPTIONS } from '../data/hemoData';
import { analyzeBloodGas, analyzeElectrolytes } from './bloodGasLogic';

function generateRandomValue(min: number, max: number, decimals = 1) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

export function generateQuizCase(): QuizCase {
    const species = Math.random() < 0.5 ? 'dog' : 'cat';
    const currentRef = HEMO_REF[species];
    const disorders = ['Acidose Metabólica', 'Alcalose Metabólica', 'Acidose Respiratória', 'Alcalose Respiratória'];
    const primaryDisorder = disorders[Math.floor(Math.random() * disorders.length)];

    let ph: number = 7.4, pco2: number = 40, hco3: number = 24, po2: number = 95, na: number = 145, k: number = 4, cl: number = 110, albumin: number = 3, temp: number = 38.5;
    const sampleType = (Math.random() < 0.7 ? 'arterial' : 'venous') as 'arterial' | 'venous';

    switch (primaryDisorder) {
        case 'Acidose Metabólica':
            ph = generateRandomValue(7.15, 7.34, 2); hco3 = generateRandomValue(currentRef.hco3.min - 12, currentRef.hco3.min - 3, 1);
            pco2 = generateRandomValue(currentRef.pco2_comp - 15, currentRef.pco2_comp - 5, 1);
            break;
        case 'Alcalose Metabólica':
            ph = generateRandomValue(7.46, 7.60, 2); hco3 = generateRandomValue(currentRef.hco3.max + 5, currentRef.hco3.max + 15, 1);
            pco2 = generateRandomValue(currentRef.pco2_comp + 3, currentRef.pco2_comp + 8, 1);
            break;
        case 'Acidose Respiratória':
            ph = generateRandomValue(7.15, 7.34, 2); pco2 = generateRandomValue(currentRef.pco2_comp + 10, currentRef.pco2_comp + 30, 1);
            hco3 = generateRandomValue(currentRef.hco3.ideal + 1, currentRef.hco3.ideal + 4, 1);
            break;
        case 'Alcalose Respiratória':
            ph = generateRandomValue(7.46, 7.60, 2); pco2 = generateRandomValue(currentRef.pco2_comp - 20, currentRef.pco2_comp - 5, 1);
            hco3 = generateRandomValue(currentRef.hco3.ideal - 4, currentRef.hco3.ideal - 1, 1);
            break;
    }

    if (sampleType === 'arterial') po2 = generateRandomValue(currentRef.arterial.po2.min, currentRef.arterial.po2.max);
    else { po2 = generateRandomValue(currentRef.venous.po2.min, currentRef.venous.po2.max); pco2 += generateRandomValue(3, 5); }

    const forceDisorder = Math.random();
    if (forceDisorder < 0.15) na = generateRandomValue(currentRef.na.max + 1, currentRef.na.max + 10);
    else if (forceDisorder < 0.3) na = generateRandomValue(currentRef.na.min - 10, currentRef.na.min - 1);
    else na = generateRandomValue(currentRef.na.min, currentRef.na.max);

    if (forceDisorder > 0.85) k = generateRandomValue(currentRef.k.max + 0.5, currentRef.k.max + 2);
    else if (forceDisorder > 0.7) k = generateRandomValue(currentRef.k.min - 1, currentRef.k.min - 0.1);
    else k = generateRandomValue(currentRef.k.min, currentRef.k.max);

    if (forceDisorder < 0.2) cl = generateRandomValue(currentRef.cl.min - 10, currentRef.cl.min - 1);
    else cl = generateRandomValue(currentRef.cl.min, currentRef.cl.max);

    if (forceDisorder > 0.8) albumin = generateRandomValue(currentRef.albumin.min - 1, currentRef.albumin.min - 0.1);
    else albumin = generateRandomValue(currentRef.albumin.min, currentRef.albumin.max);

    if (forceDisorder < 0.1) temp = generateRandomValue(currentRef.temp.max + 0.5, currentRef.temp.max + 2);
    else if (forceDisorder < 0.2) temp = generateRandomValue(currentRef.temp.min - 2, currentRef.temp.min - 0.5);
    else temp = generateRandomValue(currentRef.temp.min, currentRef.temp.max);

    const inputs: BloodGasInputs = { species, ph, pco2, hco3, po2, na, k, cl, albumin, fio2: 21, temp, declaredSampleType: sampleType };
    const correctAnswers: any = {};

    const analysis = analyzeBloodGas(inputs);
    correctAnswers.sampleType = analysis.sampleCheck.probableType;
    correctAnswers.diagnosis = analysis.primaryDisorder.disorder;
    correctAnswers.compensation = analysis.compensation.status;

    const electrolyteAnalysis = analyzeElectrolytes(na, k, cl, albumin, currentRef);
    correctAnswers.na_status = electrolyteAnalysis.find((e:any) => e.name.includes('Sódio'))?.status;
    correctAnswers.k_status = electrolyteAnalysis.find((e:any) => e.name.includes('Potássio'))?.status;
    correctAnswers.cl_status = electrolyteAnalysis.find((e:any) => e.name.includes('Cloro'))?.status;
    correctAnswers.albumin_status = electrolyteAnalysis.find((e:any) => e.name.includes('Albumina'))?.status;

    if (temp < currentRef.temp.min) correctAnswers.temp_status = 'Hipotermia';
    else if (temp > currentRef.temp.max) correctAnswers.temp_status = 'Hipertermia';
    else correctAnswers.temp_status = 'Normotermia';

    Object.keys(QUIZ_THERAPY_OPTIONS).forEach(disorderKey => {
        const therapy = (QUIZ_THERAPY_OPTIONS as any)[disorderKey];
        if (analysis.electrolyteStatus.some((e:any) => e.status.toLowerCase() === disorderKey) ||
            (correctAnswers.temp_status && correctAnswers.temp_status.toLowerCase() === disorderKey)) {
            correctAnswers[disorderKey] = therapy.correct;
        }
    });

    return { inputs, correctAnswers };
}
