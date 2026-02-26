import { BloodGasInputs, AnalysisResult } from '../types/hemoTypes';
import { HEMO_REF } from '../data/hemoData';

export function analyzeBloodGas(inputs: BloodGasInputs): AnalysisResult {
    const { species, ph, pco2, hco3, po2, temp, fio2, na, k, cl, albumin } = inputs;
    const results: Partial<AnalysisResult> = {};
    const currentRef = HEMO_REF[species];

    results.sampleCheck = checkSampleType(po2, temp);
    const probableSampleType = results.sampleCheck.probableType;

    if (ph < 7.35) results.phStatus = { state: 'Acidemia', emoji: '📉' };
    else if (ph > 7.45) results.phStatus = { state: 'Alcalemia', emoji: '📈' };
    else results.phStatus = { state: 'pH Normal', emoji: '👌' };

    results.primaryDisorder = identifyPrimaryDisorder(ph, pco2, hco3, currentRef);

    results.compensation = { status: "Não aplicável para gatos ou distúrbio simples.", expected: "N/A", isCompensated: "N/A", mixedDisorder: null };
    if (species === 'dog' && results.primaryDisorder.disorder !== 'Normal') {
        results.compensation = evaluateCompensation(pco2, hco3, results.primaryDisorder.disorder, { hco3: currentRef.hco3.ideal, pco2: currentRef.pco2_comp });
    }

    results.ventilationStatus = analyzeVentilation(pco2, currentRef, probableSampleType);
    results.oxygenation = analyzeOxygenation(po2, pco2, fio2, probableSampleType);
    results.electrolyteStatus = analyzeElectrolytes(na || null, k || null, cl || null, albumin || null, currentRef);

    results.anionGap = { value: 'Não calculado', correctedValue: 'Não calculado', interpretation: 'Eletrólitos não fornecidos.' };
    if (na && k && cl && hco3) {
        results.anionGap = calculateAnionGap(na, k, cl, hco3, albumin || null, species, currentRef);
    }

    results.differentials = getDifferentials(results.primaryDisorder.disorder, results.anionGap.interpretation);
    return results as AnalysisResult;
}

function checkSampleType(po2: number, temp?: number) {
    let probableType = 'indeterminado';
    let message = '';
    let emoji = '🤔';

    if (po2 > 80) {
        probableType = 'arterial';
        message = `A pO₂ de ${po2} mmHg é fortemente sugestiva de sangue arterial.`;
        emoji = '🩸';
    } else if (po2 < 60) {
        probableType = 'venous';
        message = `A pO₂ de ${po2} mmHg é fortemente sugestiva de sangue venoso.`;
        emoji = '🔵';
    } else {
        probableType = 'mista/indeterminada';
        message = `A pO₂ de ${po2} mmHg está em uma faixa ambígua. A interpretação deve ser cautelosa.`;
        emoji = '❓';
    }
    if (temp) {
        message += `<br><small class="text-muted-foreground">Nota: A análise assume que os valores foram corrigidos para a temperatura do paciente de ${temp}°C.</small>`;
    }
    return { probableType, message, emoji };
}

function identifyPrimaryDisorder(ph: number, pco2: number, hco3: number, currentRef: any) {
    const pco2_ref = currentRef.pco2_comp;
    const hco3_ref = currentRef.hco3.ideal;

    if (ph < 7.35) {
        if (pco2 > pco2_ref + 2) return { disorder: 'Acidose Respiratória', cause: 'pCO₂ alta', emoji: '💨⬆️' };
        if (hco3 < hco3_ref - 2) return { disorder: 'Acidose Metabólica', cause: 'HCO₃⁻ baixo', emoji: '🛡️⬇️' };
        return { disorder: 'Distúrbio Misto (Acidose)', cause: 'Ambos contribuem', emoji: '🔄' };
    } else if (ph > 7.45) {
        if (pco2 < pco2_ref - 2) return { disorder: 'Alcalose Respiratória', cause: 'pCO₂ baixa', emoji: '💨⬇️' };
        if (hco3 > hco3_ref + 2) return { disorder: 'Alcalose Metabólica', cause: 'HCO₃⁻ alto', emoji: '🛡️⬆️' };
        return { disorder: 'Distúrbio Misto (Alcalose)', cause: 'Ambos contribuem', emoji: '🔄' };
    } else {
        if ((pco2 > pco2_ref + 2 && hco3 > hco3_ref + 2) || (pco2 < pco2_ref - 2 && hco3 < hco3_ref - 2)) return { disorder: 'Distúrbio Misto Compensado', cause: 'Alterações opostas', emoji: '⚖️' };
        return { disorder: 'Normal', cause: 'Dentro dos limites da normalidade', emoji: '✅' };
    }
}

function evaluateCompensation(pco2: number, hco3: number, primaryDisorder: string, refValues: any) {
    let expected: any, status, isCompensated, mixedDisorder = null;
    const delta_hco3 = hco3 - refValues.hco3;
    const delta_pco2 = pco2 - refValues.pco2;

    switch (primaryDisorder) {
        case 'Acidose Metabólica':
            expected = { pco2: (refValues.pco2 + (delta_hco3 * 0.7)).toFixed(1) };
            isCompensated = Math.abs(pco2 - expected.pco2) <= 3;
            if (pco2 > expected.pco2 + 3) mixedDisorder = 'Acidose Respiratória Concomitante';
            if (pco2 < expected.pco2 - 3) mixedDisorder = 'Alcalose Respiratória Concomitante';
            break;
        case 'Alcalose Metabólica':
            expected = { pco2: (refValues.pco2 + (delta_hco3 * 0.5)).toFixed(1) };
            isCompensated = Math.abs(pco2 - expected.pco2) <= 3;
            if (pco2 < expected.pco2 - 3) mixedDisorder = 'Alcalose Respiratória Concomitante';
            if (pco2 > expected.pco2 + 3) mixedDisorder = 'Acidose Respiratória Concomitante';
            break;
        case 'Acidose Respiratória':
            expected = { hco3: (refValues.hco3 + ((delta_pco2 / 10) * 1)).toFixed(1) };
            isCompensated = Math.abs(hco3 - expected.hco3) <= 2;
            if (hco3 > expected.hco3 + 2) mixedDisorder = 'Alcalose Metabólica Concomitante';
            if (hco3 < expected.hco3 - 2) mixedDisorder = 'Acidose Metabólica Concomitante';
            break;
        case 'Alcalose Respiratória':
            expected = { hco3: (refValues.hco3 + ((delta_pco2 / 10) * 2)).toFixed(1) };
            isCompensated = Math.abs(hco3 - expected.hco3) <= 2;
            if (hco3 < expected.hco3 - 2) mixedDisorder = 'Acidose Metabólica Concomitante';
            if (hco3 > expected.hco3 + 2) mixedDisorder = 'Alcalose Metabólica Concomitante';
            break;
        default:
            return { status: "Não aplicável", expected: "N/A", isCompensated: "N/A", mixedDisorder: null };
    }
    status = isCompensated ? "Compensado" : "Descompensado (Distúrbio Misto)";
    return { status, expected, isCompensated, mixedDisorder };
}

function analyzeVentilation(pco2: number, currentRef: any, sampleType: string) {
    const pco2_ref = currentRef[sampleType]?.pco2 || currentRef.arterial.pco2;
    if (pco2 > pco2_ref.max) return { state: 'Hipoventilação (Hipercapnia)', emoji: '😮‍💨⬇️' };
    if (pco2 < pco2_ref.min) return { state: 'Hiperventilação (Hipocapnia)', emoji: '😮‍💨⬆️' };
    return { state: 'Ventilação Normal (Eucapnia)', emoji: '👍' };
}

function analyzeOxygenation(paO2: number, paCO2: number, fio2: number, probableSampleType: string) {
    if (probableSampleType !== 'arterial') {
        return { content: "Cálculo do Gradiente A-a não aplicável para amostras venosas ou indeterminadas.", emoji: '🚫' };
    }
    const Patm = 760, PH2O = 47, R = 0.8;
    const PAO2 = ((fio2 / 100) * (Patm - PH2O)) - (paCO2 / R);
    const AaGradient = PAO2 - paO2;

    let interpretation = AaGradient > 15
        ? 'Gradiente A-a alargado. Sugere hipoxemia por distúrbio de V/Q, shunt ou barreira de difusão.'
        : 'Gradiente A-a normal. Se houver hipoxemia, pode ser por hipoventilação ou baixa FiO₂.';

    const content = `Gradiente A-a: <strong>${AaGradient.toFixed(2)} mmHg</strong><br>
                     <small>(PAO₂: ${PAO2.toFixed(2)}, PaO₂: ${paO2})</small><br>
                     Interpretação: ${interpretation}`;
    return { content, emoji: '🫁' };
}

export function analyzeElectrolytes(na: number | null, k: number | null, cl: number | null, albumin: number | null, currentRef: any) {
    const results = [];
    const ref_species = currentRef;

    if (na !== null && !isNaN(na)) {
        let status = 'Normal'; let alert = '';
        if (na < ref_species.na.min) { status = 'Hiponatremia'; alert = 'Nível de Sódio baixo. Investigar balanço hídrico.'; }
        if (na > ref_species.na.max) { status = 'Hipernatremia'; alert = 'Nível de Sódio alto. Investigar desidratação ou perda de água livre.'; }
        results.push({ name: 'Sódio (Na⁺)', value: na, unit: 'mEq/L', status, alert, ref: `${ref_species.na.min}-${ref_species.na.max}` });
    }
    if (k !== null && !isNaN(k)) {
        let status = 'Normal'; let alert = '';
        if (k < ref_species.k.min) { status = 'Hipocalemia'; alert = 'Nível de Potássio baixo. Considerar reposição de potássio.'; }
        if (k > ref_species.k.max) { status = 'Hipercalemia'; alert = 'Nível de Potássio alto. Risco de arritmias cardíacas.'; }
        results.push({ name: 'Potássio (K⁺)', value: k, unit: 'mEq/L', status, alert, ref: `${ref_species.k.min}-${ref_species.k.max}` });
    }
    if (cl !== null && !isNaN(cl)) {
        let status = 'Normal'; let alert = '';
        if (cl < ref_species.cl.min) { status = 'Hipocloremia'; alert = 'Nível de Cloro baixo. Frequentemente associado a alcalose metabólica.'; }
        if (cl > ref_species.cl.max) { status = 'Hipercloremia'; alert = 'Nível de Cloro alto. Frequentemente associado a acidose metabólica.'; }
        results.push({ name: 'Cloro (Cl⁻)', value: cl, unit: 'mEq/L', status, alert, ref: `${ref_species.cl.min}-${ref_species.cl.max}` });
    }
    if (albumin !== null && !isNaN(albumin)) {
        let status = 'Normal'; let alert = '';
        if (albumin < ref_species.albumin.min) { status = 'Hipoalbuminemia'; alert = 'Nível de Albumina baixo. Afeta a pressão oncótica e o cálculo do Anion Gap.'; }
        if (albumin > ref_species.albumin.max) { status = 'Hiperalbuminemia'; alert = 'Nível de Albumina alto. Geralmente associado a desidratação hemoconcentração.'; }
        results.push({ name: 'Albumina', value: albumin, unit: 'g/dL', status, alert, ref: `${ref_species.albumin.min}-${ref_species.albumin.max}` });
    }
    return results;
}

function calculateAnionGap(na: number, k: number, cl: number, hco3: number, albumin: number | null, species: string, currentRef: any) {
    const ag = (na + k) - (cl + hco3);
    let ag_corrected = ag;
    const ag_ref = currentRef.anionGap;
    const albumin_ideal = currentRef.albumin.ideal;

    if (albumin !== null && !isNaN(albumin)) {
        ag_corrected = ag + (species === 'dog' ? 0.42 : 0.41) * (albumin_ideal - albumin);
    }

    let interpretation = 'Baixo Anion Gap';
    if (ag_corrected > ag_ref.max) interpretation = 'Alto Anion Gap (Normoclorêmico)';
    else if (ag_corrected >= ag_ref.min) interpretation = 'Anion Gap Normal (Hiperclorêmico)';

    return { value: ag.toFixed(2), correctedValue: ag_corrected.toFixed(2), interpretation };
}

function getDifferentials(disorder: string, agInterpretation: string) {
    const diffs: any = {
        'Acidose Metabólica': {
            'Alto Anion Gap (Normoclorêmico)': ["Cetoacidose Diabética", "Acidose Lática", "Insuficiência Renal", "Intoxicações"],
            'Anion Gap Normal (Hiperclorêmico)': ["Diarreia", "Acidose Tubular Renal", "Acidose Dilucional", "Hipoaldosteronismo"]
        },
        'Alcalose Metabólica': ["Vômito Crônico", "Uso de Diuréticos", "Hiperaldosteronismo", "Terapia com álcalis"],
        'Acidose Respiratória': ["Obstrução de Vias Aéreas", "Doença do Espaço Pleural", "Depressão do SNC", "Doença Parenquimatosa"],
        'Alcalose Respiratória': ["Hipoxemia", "Dor, Ansiedade, Estresse", "Sepse, Febre", "Ventilação Mecânica Excessiva"]
    };
    if (disorder === 'Acidose Metabólica') return diffs[disorder][agInterpretation] || ["Causa indeterminada sem AG."];
    return diffs[disorder] || ["Sem diferenciais específicos."];
}
